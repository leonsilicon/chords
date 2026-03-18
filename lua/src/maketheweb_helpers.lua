local M = {}

local mac_keycode = require('mac_keycode')
local json = require("lunajson")
local plist = require("plist")

function M.make_shortcut(filepath)
  local data = plist.parse_file(filepath)

  return function (property)
    local value = json.decode(data[1][property])
    local keys = mac_keycode.carbon_modifiers_to_strings(payload.carbonModifiers)
    table.insert(keys, mac_keycode.keycode_to_string(payload.carbonKey))
    tap(table.concat(keys, "+"))
  end
end

return M
