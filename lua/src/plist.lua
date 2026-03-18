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


return M
