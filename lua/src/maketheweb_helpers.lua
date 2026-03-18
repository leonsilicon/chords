local M = {}

local mac_keycode = require('mac_keycode')
local json = require("lunajson")
local parse = require("plist").parse;

function M.make_shortcut(filepath)
  local plist = parse(filepath)

  return function (property)
    local value = json.decode(plist[1][property])
    local keys = mac_keycode.carbon_modifiers_to_strings(payload.carbonModifiers)
    table.insert(keys, mac_keycode.keycode_to_string(payload.carbonKey))
    tap(table.concat(keys, "+"))
  end
end

return M
