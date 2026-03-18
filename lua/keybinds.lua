local brace_expansion = require('brace_expansion')

function generate_synthetic_keybinds(commands, patterns)
  local available_keybinds = {}

  -- expand all patterns
  for _, pattern in ipairs(patterns) do
    local expansions = brace_expansion.expand(pattern)

    for _, keybind in ipairs(expansions) do
      table.insert(available_keybinds, keybind)
    end
  end

  -- assign keybinds to commands
  local result = {}

  for _, command in ipairs(commands) do
    local keybind = table.remove(available_keybinds) -- pop last
    result[command] = keybind -- map command → keybind (nil if exhausted)
  end

  return result
end