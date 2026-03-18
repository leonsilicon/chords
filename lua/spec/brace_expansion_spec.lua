local brace_expand = require("brace_expansion")

local cases = {
	"a{b,c}d",
	"a{1..3}d",
	"a{b,c{d,e},f}z",
	[[\{a,b\}]],
	"{a,b}{1,2}",
}

for _, input in ipairs(cases) do
	print("INPUT: " .. input)
	local out = brace_expand.expand(input)
	for i, v in ipairs(out) do
		print("  " .. i .. ": " .. v)
	end
	print()
end
