local M = {}

local brace = require("brace_expansion")

local function dedup(list)
  local seen = {}
  local out = {}

  for i = 1, #list do
    local v = list[i]
    if not seen[v] then
      seen[v] = true
      out[#out + 1] = v
    end
  end

  return out
end

function M.expand_all(patterns, opts)
  opts = opts or {}

  -- default: dedup = true
  local should_dedup = opts.dedup ~= false

  local result = {}

  for i = 1, #patterns do
    local expanded = brace.expand(patterns[i], opts)

    for j = 1, #expanded do
      result[#result + 1] = expanded[j]
    end
  end

  if should_dedup then
    result = dedup(result)
  end

  return result
end

return M