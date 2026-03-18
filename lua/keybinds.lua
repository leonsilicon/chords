local M = {}

local brace_expansion = require('brace_expansion')

local function sorted_unique(list)
  local seen = {}
  local out = {}

  for _, v in ipairs(list) do
    if not seen[v] then
      seen[v] = true
      table.insert(out, v)
    end
  end

  table.sort(out)
  return out
end

function M.generate_synthetic_keybinds(commands, patterns)
  local available_keybinds = {}

  -- expand all patterns (order doesn't matter anymore)
  for _, pattern in ipairs(patterns) do
    local expansions = brace_expansion.expand(pattern)

    for _, keybind in ipairs(expansions) do
      table.insert(available_keybinds, keybind)
    end
  end

  -- normalize both sides
  local keybinds = sorted_unique(available_keybinds)
  local cmds = sorted_unique(commands)

  -- deterministic mapping
  local result = {}
  for i, command in ipairs(cmds) do
    result[command] = keybinds[i] -- nil if exhausted
  end

  return result
end

return M