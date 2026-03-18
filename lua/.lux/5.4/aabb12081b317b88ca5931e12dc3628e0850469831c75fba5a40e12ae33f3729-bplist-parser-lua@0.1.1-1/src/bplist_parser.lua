local M = {}

local debug = false

local maxObjectSize = 100 * 1000 * 1000 -- 100 MB
local maxObjectCount = 32768
local EPOCH = 978307200000 -- 2001-01-01T00:00:00Z in Unix ms

-- Lua cannot store nil inside tables as a real value, so preserve plist nulls explicitly.
M.NULL = {}

local function dbg(...)
  if debug then
    print(...)
  end
end

local function byte_at(buffer, offset0)
  return string.byte(buffer, offset0 + 1)
end

local function bytes_at(buffer, offset0, length)
  return string.sub(buffer, offset0 + 1, offset0 + length)
end

local function starts_with_bplist(buffer)
  return string.sub(buffer, 1, 6) == "bplist"
end

local function read_uint_be(buffer, offset0, length)
  local value = 0
  for i = 0, length - 1 do
    value = value * 256 + byte_at(buffer, offset0 + i)
  end
  return value
end

local function read_int8(buffer, offset0)
  local n = byte_at(buffer, offset0)
  if n >= 0x80 then
    return n - 0x100
  end
  return n
end

local function read_int16_be(buffer, offset0)
  local n = read_uint_be(buffer, offset0, 2)
  if n >= 0x8000 then
    return n - 0x10000
  end
  return n
end

local function read_int32_be(buffer, offset0)
  local n = read_uint_be(buffer, offset0, 4)
  if n >= 0x80000000 then
    return n - 0x100000000
  end
  return n
end

local function bytes_to_decimal_string(bytes)
  local digits = { 0 } -- least-significant digit first

  for i = 1, #bytes do
    local carry = string.byte(bytes, i)

    for j = 1, #digits do
      local v = digits[j] * 256 + carry
      digits[j] = v % 10
      carry = math.floor(v / 10)
    end

    while carry > 0 do
      digits[#digits + 1] = carry % 10
      carry = math.floor(carry / 10)
    end
  end

  local i = #digits
  while i > 1 and digits[i] == 0 do
    i = i - 1
  end

  local out = {}
  for j = i, 1, -1 do
    out[#out + 1] = tostring(digits[j])
  end

  return table.concat(out)
end

local function twos_complement_abs(bytes)
  local out = {}
  local carry = 1

  for i = #bytes, 1, -1 do
    local b = 0xFF - string.byte(bytes, i) + carry
    if b >= 0x100 then
      b = b - 0x100
      carry = 1
    else
      carry = 0
    end
    out[i] = string.char(b)
  end

  return table.concat(out)
end

local MAX_SAFE_INTEGER = 9007199254740991 -- 2^53 - 1

local function read_int64_lossless(buffer, offset0)
  local bytes = bytes_at(buffer, offset0, 8)
  local negative = string.byte(bytes, 1) >= 0x80

  if not negative then
    local hi = read_uint_be(buffer, offset0, 4)
    local lo = read_uint_be(buffer, offset0 + 4, 4)
    local num = hi * 4294967296 + lo

    if num <= MAX_SAFE_INTEGER then
      return num
    end

    return bytes_to_decimal_string(bytes)
  end

  local magnitude_bytes = twos_complement_abs(bytes)
  local hi = read_uint_be(magnitude_bytes, 0, 4)
  local lo = read_uint_be(magnitude_bytes, 4, 4)
  local num = hi * 4294967296 + lo

  if num <= MAX_SAFE_INTEGER then
    return -num
  end

  return "-" .. bytes_to_decimal_string(magnitude_bytes)
end

local function read_float32_be(buffer, offset0)
  local b1 = byte_at(buffer, offset0)
  local b2 = byte_at(buffer, offset0 + 1)
  local b3 = byte_at(buffer, offset0 + 2)
  local b4 = byte_at(buffer, offset0 + 3)

  local sign = (b1 >= 0x80) and -1 or 1
  local exponent = (b1 % 0x80) * 2 + math.floor(b2 / 0x80)
  local mantissa = (b2 % 0x80) * 65536 + b3 * 256 + b4

  if exponent == 0 then
    if mantissa == 0 then
      return sign * 0.0
    end
    return sign * (mantissa / 2^23) * 2^(-126)
  end

  if exponent == 0xFF then
    if mantissa == 0 then
      return sign * math.huge
    end
    return 0 / 0
  end

  return sign * (1 + mantissa / 2^23) * 2^(exponent - 127)
end

local function read_float64_be(buffer, offset0)
  local b1 = byte_at(buffer, offset0)
  local b2 = byte_at(buffer, offset0 + 1)
  local b3 = byte_at(buffer, offset0 + 2)
  local b4 = byte_at(buffer, offset0 + 3)
  local b5 = byte_at(buffer, offset0 + 4)
  local b6 = byte_at(buffer, offset0 + 5)
  local b7 = byte_at(buffer, offset0 + 6)
  local b8 = byte_at(buffer, offset0 + 7)

  local sign = (b1 >= 0x80) and -1 or 1
  local exponent = (b1 % 0x80) * 16 + math.floor(b2 / 16)
  local mantissa =
    (b2 % 16) * 2^48 +
    b3 * 2^40 +
    b4 * 2^32 +
    b5 * 2^24 +
    b6 * 2^16 +
    b7 * 2^8 +
    b8

  if exponent == 0 then
    if mantissa == 0 then
      return sign * 0.0
    end
    return sign * (mantissa / 2^52) * 2^(-1022)
  end

  if exponent == 0x7FF then
    if mantissa == 0 then
      return sign * math.huge
    end
    return 0 / 0
  end

  return sign * (1 + mantissa / 2^52) * 2^(exponent - 1023)
end

local function codepoint_to_utf8(cp)
  if cp <= 0x7F then
    return string.char(cp)
  elseif cp <= 0x7FF then
    local b1 = 0xC0 + math.floor(cp / 0x40)
    local b2 = 0x80 + (cp % 0x40)
    return string.char(b1, b2)
  elseif cp <= 0xFFFF then
    local b1 = 0xE0 + math.floor(cp / 0x1000)
    local b2 = 0x80 + (math.floor(cp / 0x40) % 0x40)
    local b3 = 0x80 + (cp % 0x40)
    return string.char(b1, b2, b3)
  else
    local b1 = 0xF0 + math.floor(cp / 0x40000)
    local b2 = 0x80 + (math.floor(cp / 0x1000) % 0x40)
    local b3 = 0x80 + (math.floor(cp / 0x40) % 0x40)
    local b4 = 0x80 + (cp % 0x40)
    return string.char(b1, b2, b3, b4)
  end
end

local function utf16be_to_utf8(bytes)
  local out = {}
  local i = 1

  while i <= #bytes do
    local hi = string.byte(bytes, i) or 0
    local lo = string.byte(bytes, i + 1) or 0
    local unit = hi * 256 + lo
    i = i + 2

    if unit >= 0xD800 and unit <= 0xDBFF and i <= #bytes then
      local hi2 = string.byte(bytes, i) or 0
      local lo2 = string.byte(bytes, i + 1) or 0
      local unit2 = hi2 * 256 + lo2

      if unit2 >= 0xDC00 and unit2 <= 0xDFFF then
        i = i + 2
        local cp = 0x10000 + ((unit - 0xD800) * 0x400) + (unit2 - 0xDC00)
        out[#out + 1] = codepoint_to_utf8(cp)
      else
        out[#out + 1] = codepoint_to_utf8(unit)
      end
    else
      out[#out + 1] = codepoint_to_utf8(unit)
    end
  end

  return table.concat(out)
end

local function parse_runtime_flags(value)
  local flag_definitions = {
    [0] = "Valid",
    [1] = "Has been rounded",
    [2] = "Positive infinity",
    [3] = "Negative infinity",
    [4] = "Indefinite",
  }

  for bit = 0, 4 do
    local mask = 2 ^ bit
    if value % (mask * 2) >= mask then
      return flag_definitions[bit]
    end
  end
end

local function make_uid(value)
  return { UID = value }
end

function M.parseBuffer(buffer)
  assert(type(buffer) == "string", "parseBuffer expects a raw binary Lua string")

  if not starts_with_bplist(buffer) then
    error("Invalid binary plist. Expected 'bplist' at offset 0.")
  end

  local trailerOffset = #buffer - 32

  local offsetSize = byte_at(buffer, trailerOffset + 6)
  dbg("offsetSize:", offsetSize)

  local objectRefSize = byte_at(buffer, trailerOffset + 7)
  dbg("objectRefSize:", objectRefSize)

  local numObjects = read_uint_be(buffer, trailerOffset + 8, 8)
  dbg("numObjects:", numObjects)

  local topObject = read_uint_be(buffer, trailerOffset + 16, 8)
  dbg("topObject:", topObject)

  local offsetTableOffset = read_uint_be(buffer, trailerOffset + 24, 8)
  dbg("offsetTableOffset:", offsetTableOffset)

  if numObjects > maxObjectCount then
    error("maxObjectCount exceeded")
  end

  local offsetTable = {}
  for i = 0, numObjects - 1 do
    local offset = offsetTableOffset + i * offsetSize
    local objectOffset = read_uint_be(buffer, offset, offsetSize)
    offsetTable[i] = objectOffset

    dbg(
      "Offset for Object #" .. i .. " is " .. objectOffset ..
      " [" .. string.format("%x", objectOffset) .. "]"
    )
  end

  local parseObject

  local function read_extended_length(offset0, objInfo)
    if objInfo ~= 0xF then
      return objInfo, 1
    end

    local int_type = byte_at(buffer, offset0 + 1)
    local intType = math.floor(int_type / 0x10)
    if intType ~= 0x1 then
      io.stderr:write("UNEXPECTED LENGTH-INT TYPE! ", tostring(intType), "\n")
    end

    local intInfo = int_type % 0x10
    local intLength = 2 ^ intInfo
    local length = read_uint_be(buffer, offset0 + 2, intLength)
    return length, 2 + intLength
  end

  local function parseSimple(objInfo)
    if objInfo == 0x0 then
      return M.NULL
    elseif objInfo == 0x8 then
      return false
    elseif objInfo == 0x9 then
      return true
    elseif objInfo == 0xF then
      return M.NULL
    end

    error("Unhandled simple type 0x0")
  end

  local function parseInteger(offset0, objInfo)
    local length = 2 ^ objInfo

    if length == 1 then
      return read_int8(buffer, offset0 + 1)
    elseif length == 2 then
      return read_int16_be(buffer, offset0 + 1)
    elseif length == 4 then
      return read_int32_be(buffer, offset0 + 1)
    elseif length == 8 then
      return read_int64_lossless(buffer, offset0 + 1)
    elseif length == 16 then
      return bytes_to_decimal_string(bytes_at(buffer, offset0 + 1, 16))
    end

    error(
      "Too little heap space available! Wanted to read " ..
      tostring(length) .. " bytes, but only " ..
      tostring(maxObjectSize) .. " are available."
    )
  end

  local function parseUID(offset0, objInfo)
    local length = objInfo + 1
    if length >= maxObjectSize then
      error(
        "Too little heap space available! Wanted to read " ..
        tostring(length) .. " bytes, but only " ..
        tostring(maxObjectSize) .. " are available."
      )
    end

    return make_uid(read_uint_be(buffer, offset0 + 1, length))
  end

  local function parseReal(offset0, objInfo)
    local length = 2 ^ objInfo

    if length == 4 then
      return read_float32_be(buffer, offset0 + 1)
    elseif length == 8 then
      return read_float64_be(buffer, offset0 + 1)
    end

    error(
      "Too little heap space available! Wanted to read " ..
      tostring(length) .. " bytes, but only " ..
      tostring(maxObjectSize) .. " are available."
    )
  end

  local function parseDate(offset0, objInfo)
    if objInfo ~= 0x3 then
      io.stderr:write("Unknown date type: ", tostring(objInfo), ". Parsing anyway...\n")
    end

    local timestamp = read_float64_be(buffer, offset0 + 1)
    return EPOCH + 1000 * timestamp
  end

  local function parseData(offset0, objInfo)
    local length, dataOffset = read_extended_length(offset0, objInfo)

    if length >= maxObjectSize then
      error(
        "Too little heap space available! Wanted to read " ..
        tostring(length) .. " bytes, but only " ..
        tostring(maxObjectSize) .. " are available."
      )
    end

    return bytes_at(buffer, offset0 + dataOffset, length)
  end

  local function parsePlistString(offset0, objInfo, isUtf16)
    local length, strOffset = read_extended_length(offset0, objInfo)

    if isUtf16 then
      length = length * 2
    end

    if length >= maxObjectSize then
      error(
        "Too little heap space available! Wanted to read " ..
        tostring(length) .. " bytes, but only " ..
        tostring(maxObjectSize) .. " are available."
      )
    end

    local raw = bytes_at(buffer, offset0 + strOffset, length)

    if isUtf16 then
      return utf16be_to_utf8(raw)
    end

    -- Type 0x5 is ASCII, so returning the raw substring is correct.
    return raw
  end

  local function parseArray(offset0, objInfo)
    local length, arrayOffset = read_extended_length(offset0, objInfo)

    if length * objectRefSize > maxObjectSize then
      error("Too little heap space available!")
    end

    local array = {}
    for i = 0, length - 1 do
      local objRef = read_uint_be(
        buffer,
        offset0 + arrayOffset + i * objectRefSize,
        objectRefSize
      )
      array[#array + 1] = parseObject(objRef)
    end

    return array
  end

  local function parseDictionary(tableOffset, offset0, objInfo)
    local length, dictOffset = read_extended_length(offset0, objInfo)

    if length * 2 * objectRefSize > maxObjectSize then
      error("Too little heap space available!")
    end

    dbg("Parsing dictionary #" .. tostring(tableOffset))

    local dict = {}

    for i = 0, length - 1 do
      local keyRef = read_uint_be(
        buffer,
        offset0 + dictOffset + i * objectRefSize,
        objectRefSize
      )

      local valRef = read_uint_be(
        buffer,
        offset0 + dictOffset + length * objectRefSize + i * objectRefSize,
        objectRefSize
      )

      local key = parseObject(keyRef)
      local val = parseObject(valRef)

      if debug then
        print("  DICT #" .. tostring(tableOffset) .. ": Mapped " .. tostring(key) .. " to " .. tostring(val))
      end

      if key == "flags" and type(val) == "number" then
        local parsed_flag = parse_runtime_flags(val)
        if parsed_flag ~= nil then
          val = parsed_flag
        end
      end

      dict[key] = val
    end

    return dict
  end

  function parseObject(tableOffset)
    local offset0 = offsetTable[tableOffset]
    local typeByte = byte_at(buffer, offset0)
    local objType = math.floor(typeByte / 0x10)
    local objInfo = typeByte % 0x10

    if objType == 0x0 then
      return parseSimple(objInfo)
    elseif objType == 0x1 then
      return parseInteger(offset0, objInfo)
    elseif objType == 0x2 then
      return parseReal(offset0, objInfo)
    elseif objType == 0x3 then
      return parseDate(offset0, objInfo)
    elseif objType == 0x4 then
      return parseData(offset0, objInfo)
    elseif objType == 0x5 then
      return parsePlistString(offset0, objInfo, false)
    elseif objType == 0x6 then
      return parsePlistString(offset0, objInfo, true)
    elseif objType == 0x8 then
      return parseUID(offset0, objInfo)
    elseif objType == 0xA then
      return parseArray(offset0, objInfo)
    elseif objType == 0xD then
      return parseDictionary(tableOffset, offset0, objInfo)
    end

    error("Unhandled type 0x" .. string.format("%x", objType))
  end

  return { parseObject(topObject) }
end

return M