local path = require("pl.path")
local file = require("pl.file")
local pretty = require("pl.pretty")
local json = require("lunajson")

local plist_path = path.expanduser("~/Library/Preferences/com.wiheads.paste-setapp.plist")
local bplist = file.read(plist_path)
local parsed = require("bplist_parser").parseBuffer(bplist)
pretty.dump(parsed)

