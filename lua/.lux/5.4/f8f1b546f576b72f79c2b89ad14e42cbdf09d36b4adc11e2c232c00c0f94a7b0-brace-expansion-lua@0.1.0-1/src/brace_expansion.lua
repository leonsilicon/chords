local balanced_mod = require("balanced_match")
local balanced = balanced_mod.balanced or balanced_mod

local M = {}

M.EXPANSION_MAX = 100000

local uid = tostring({})
uid = uid:gsub("%s+", "_")

local esc_slash = "__BE_SLASH_" .. uid .. "__"
local esc_open = "__BE_OPEN_" .. uid .. "__"
local esc_close = "__BE_CLOSE_" .. uid .. "__"
local esc_comma = "__BE_COMMA_" .. uid .. "__"
local esc_period = "__BE_PERIOD_" .. uid .. "__"

local function replace_all_plain(str, needle, repl)
  if needle == "" then
    return str
  end

  local out = {}
  local start = 1

  while true do
    local i = str:find(needle, start, true)
    if not i then
      out[#out + 1] = str:sub(start)
      break
    end

    out[#out + 1] = str:sub(start, i - 1)
    out[#out + 1] = repl
    start = i + #needle
  end

  return table.concat(out)
end

local function split_plain(str, sep)
  local parts = {}
  local start = 1

  while true do
    local i = str:find(sep, start, true)
    if not i then
      parts[#parts + 1] = str:sub(start)
      break
    end

    parts[#parts + 1] = str:sub(start, i - 1)
    start = i + #sep
  end

  return parts
end

local function numeric(str)
  local n = tonumber(str)
  if n ~= nil then
    return n
  end

  return assert(str:byte(1))
end

local function escape_braces(str)
  str = replace_all_plain(str, "\\\\", esc_slash)
  str = replace_all_plain(str, "\\{", esc_open)
  str = replace_all_plain(str, "\\}", esc_close)
  str = replace_all_plain(str, "\\,", esc_comma)
  str = replace_all_plain(str, "\\.", esc_period)
  return str
end

local function unescape_braces(str)
  str = replace_all_plain(str, esc_slash, "\\")
  str = replace_all_plain(str, esc_open, "{")
  str = replace_all_plain(str, esc_close, "}")
  str = replace_all_plain(str, esc_comma, ",")
  str = replace_all_plain(str, esc_period, ".")
  return str
end

local function parse_comma_parts(str)
  if str == "" then
    return { "" }
  end

  local m = balanced("{", "}", str)
  if not m then
    return split_plain(str, ",")
  end

  local parts = split_plain(m.pre, ",")
  parts[#parts] = parts[#parts] .. "{" .. m.body .. "}"

  local post_parts = parse_comma_parts(m.post)
  if m.post ~= "" then
    parts[#parts] = parts[#parts] .. table.remove(post_parts, 1)
    for i = 1, #post_parts do
      parts[#parts + 1] = post_parts[i]
    end
  end

  return parts
end

local function embrace(str)
  return "{" .. str .. "}"
end

local function is_padded(str)
  return str:match("^%-?0%d") ~= nil
end

local function is_numeric_sequence(str)
  return str:match("^%-?%d+%.%.%-?%d+$") ~= nil
    or str:match("^%-?%d+%.%.%-?%d+%.%.%-?%d+$") ~= nil
end

local function is_alpha_sequence(str)
  return str:match("^[A-Za-z]%.%.[A-Za-z]$") ~= nil
    or str:match("^[A-Za-z]%.%.[A-Za-z]%.%.%-?%d+$") ~= nil
end

local function has_comma_then_close(str)
  local i = 1

  while true do
    local comma = str:find(",", i, true)
    if not comma then
      return false
    end

    if str:sub(comma + 1, comma + 1) ~= "," and str:find("}", comma + 1, true) then
      return true
    end

    i = comma + 1
  end
end

local function expand_(str, max, is_top)
  local expansions = {}

  local m = balanced("{", "}", str)
  if not m then
    return { str }
  end

  local pre = m.pre
  local post = (m.post ~= "") and expand_(m.post, max, false) or { "" }

  if pre:match("%$$") then
    for k = 1, #post do
      if #expansions >= max then
        break
      end
      expansions[#expansions + 1] = pre .. "{" .. m.body .. "}" .. post[k]
    end
    return expansions
  end

  local numeric_sequence = is_numeric_sequence(m.body)
  local alpha_sequence = is_alpha_sequence(m.body)
  local is_sequence = numeric_sequence or alpha_sequence
  local is_options = m.body:find(",", 1, true) ~= nil

  if not is_sequence and not is_options then
    if has_comma_then_close(m.post) then
      local rewritten = m.pre .. "{" .. m.body .. esc_close .. m.post
      return expand_(rewritten, max, true)
    end

    return { str }
  end

  local n

  if is_sequence then
    n = split_plain(m.body, "..")
  else
    n = parse_comma_parts(m.body)

    if #n == 1 then
      local expanded = expand_(n[1], max, false)
      n = {}

      for i = 1, #expanded do
        n[#n + 1] = embrace(expanded[i])
      end

      if #n == 1 then
        local out = {}
        for i = 1, #post do
          out[#out + 1] = m.pre .. n[1] .. post[i]
        end
        return out
      end
    end
  end

  local N = {}

  if is_sequence and n[1] ~= nil and n[2] ~= nil then
    local x = numeric(n[1])
    local y = numeric(n[2])
    local width = math.max(#n[1], #n[2])
    local incr = (n[3] ~= nil) and math.abs(numeric(n[3])) or 1
    local forward = x <= y

    if not forward then
      incr = -incr
    end

    local pad = false
    for i = 1, #n do
      if is_padded(n[i]) then
        pad = true
        break
      end
    end

    local i = x
    while (forward and i <= y) or ((not forward) and i >= y) do
      local c

      if alpha_sequence then
        c = string.char(i)
        if c == "\\" then
          c = ""
        end
      else
        c = tostring(i)
        if pad then
          local need = width - #c
          if need > 0 then
            local z = string.rep("0", need)
            if i < 0 then
              c = "-" .. z .. c:sub(2)
            else
              c = z .. c
            end
          end
        end
      end

      N[#N + 1] = c
      i = i + incr
    end
  else
    for i = 1, #n do
      local expanded = expand_(n[i], max, false)
      for j = 1, #expanded do
        N[#N + 1] = expanded[j]
      end
    end
  end

  for j = 1, #N do
    for k = 1, #post do
      if #expansions >= max then
        break
      end

      local expansion = pre .. N[j] .. post[k]
      if not is_top or is_sequence or expansion ~= "" then
        expansions[#expansions + 1] = expansion
      end
    end

    if #expansions >= max then
      break
    end
  end

  return expansions
end

function M.expand(str, options)
  if type(str) ~= "string" or str == "" then
    return {}
  end

  options = options or {}
  local max = options.max or M.EXPANSION_MAX

  if str:sub(1, 2) == "{}" then
    str = "\\{\\}" .. str:sub(3)
  end

  local expanded = expand_(escape_braces(str), max, true)
  for i = 1, #expanded do
    expanded[i] = unescape_braces(expanded[i])
  end

  return expanded
end

return M