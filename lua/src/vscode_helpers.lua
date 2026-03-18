local M = {}

local file = require("pl.file")
local json = require("lunajson")

local function get_uid()
  local h = io.popen("id -u")
  if not h then return nil end

  local uid = h:read("*a")
  h:close()

  if not uid then return nil end
  return uid:gsub("%s+", "")
end

-- This script allows us to execute VSCode commands directly via
-- https://marketplace.visualstudio.com/items?itemName=pokey.command-server
-- if it's active, and otherwise falls back to built-in shortcuts.
function M.create_command()
  local uid = get_uid()
  if not uid then
    return function() return false end
  end

  local tmp = os.getenv("TMPDIR") or "/tmp"
  local dir = tmp .. "/vscode-command-server-" .. uid

  return function(cmd)
    -- ensure server dir exists
    if os.rename(dir, dir) == nil then
      return false
    end

    local request_path = dir .. "/request.json"
    local response_path = dir .. "/response.json"

    local payload = json.encode({
      commandId = cmd,
      args = { [0] = 0 }
    })

    if not file.write(request_path, payload) then
      return false
    end

    -- remove stale response BEFORE triggering
    os.remove(response_path)

    -- trigger VSCode command server
    tap("cmd+shift+f17")

    return true
  end
end

return M