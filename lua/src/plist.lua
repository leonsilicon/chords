local M = {}

local json = require("lunajson")
local file = require("pl.file")
local path = require("pl.path")
local parse = require("bplist_parser").parseBuffer

function M.parse(filepath)
  local plist_path = path.expanduser(filepath)
  local bplist = file.read(plist_path)
  return parse(bplist)[1]
end

function M.make_shortcut(filepath)
  local plist = parse(filepath)

  return function (property)
    local globalHotkey = json.decode(plist[1][property])
    tap(carbon_shortcut_to_string(hotkey.carbonKey, hotkey.carbonModifiers))
  end
end

return M
