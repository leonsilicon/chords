local M = {}

-- escape Lua pattern characters so markers are treated literally
local function escape_pattern(s)
  return s:gsub("([^%w])", "%%%1")
end

-- read entire file (nil if not exists)
function M.read(path)
  local f = io.open(path, "r")
  if not f then return nil end
  local content = f:read("*a")
  f:close()
  return content
end

-- atomic write (best effort)
function M.write(path, content)
  local tmp_path = path
    .. ".tmp."
    .. tostring(os.time())
    .. "."
    .. tostring(math.random(100000, 999999))

  local f = io.open(tmp_path, "w")
  if not f then return nil, "open failed" end

  local ok = f:write(content)
  f:close()

  if not ok then
    os.remove(tmp_path)
    return nil, "write failed"
  end

  if os.rename(tmp_path, path) == nil then
    os.remove(tmp_path)
    return nil, "rename failed"
  end

  return true
end

-- upsert block between markers
function M.upsert_block(path, new_content, start_marker, end_marker)
  start_marker = start_marker or "# START"
  end_marker = end_marker or "# END"

  local existing = M.read(path) or ""

  local block = start_marker .. "\n"
    .. new_content .. "\n"
    .. end_marker

  local updated

  local has_start = existing:find(start_marker, 1, true)
  local has_end = existing:find(end_marker, 1, true)

  if has_start and has_end then
    -- replace existing block (safe pattern)
    local pattern =
      escape_pattern(start_marker)
      .. ".-"
      .. escape_pattern(end_marker)

    updated = existing:gsub(pattern, block)
  else
    -- append block
    if existing ~= "" and not existing:match("\n$") then
      existing = existing .. "\n"
    end

    updated = existing .. "\n" .. block .. "\n"
  end

  return M.write(path, updated)
end

function M.touch(path)
  local f = io.open(path, "a")
  if not f then return nil, "open failed" end
  f:close()
  return true
end

return M

