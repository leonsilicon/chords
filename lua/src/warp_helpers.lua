local M = {}

local file = require("pl.file")
local generate_synthetic_keybinds = require("keybinds").generate_synthetic_keybinds
local expand_all = require("brace_expansion_helpers").expand_all

-- Extract commands from chords
local function extract_commands(chords)
  local result = {}

  for _, chord in pairs(chords) do
    if chord.lua and not chord.shortcut then
      local cmd = chord.lua:match("command%(['\"](.-)['\"]%)")
      if cmd then
        table.insert(result, cmd)
      end
    end
  end

  return result
end

local function normalize_keybind(k)
  return k:gsub("%+", "-")
end

local function quote(str)
  return '"' .. str:gsub('"', '\\"') .. '"'
end

-- Factory
-- This works by modifying keybindings.yaml
function M.create_command(chords)
  -- 1. extract + generate once
  local commands = extract_commands(chords)

  local synthetic_keybinds = generate_synthetic_keybinds(
    commands,
    expand_all({
      "opt+{0..9}",
      "opt+cmd+{0..9}",
      "opt+cmd+ctrl+{0..9}",
      "opt+cmd+ctrl+shift+{0..9}",
      "cmd+ctrl+{0..9}",
      "cmd+ctrl+shift+{0..9}",
      "ctrl+shift+{0..9}",
      "opt+shift+{0..9}",
      "cmd+shift+{0..9}",
    })
  )

  -- 2. write YAML using upsert_block
  do
    local sorted_commands = {}
    for cmd in pairs(synthetic_keybinds) do
      sorted_commands[#sorted_commands + 1] = cmd
    end
    table.sort(sorted_commands)

    local keybindings_yaml = ""

    for _, cmd in ipairs(sorted_commands) do
      local keybind = synthetic_keybinds[cmd]
      keybindings_yaml = keybindings_yaml
        .. string.format("%s: %s\n", quote(cmd), normalize_keybind(keybind))
    end

    local home = os.getenv("HOME") or "~"
    local path = home .. "/.warp/keybindings.yaml"

    if not file.exists(path) then
      file.write(path, "")
    end

    file.upsert_block(
      path,
      keybindings_yaml,
      "# >>> chords:auto:start",
      "# >>> chords:auto:end"
    )
  end

  -- 3. build reverse lookup: command -> keybind
  local command_to_key = {}
  for cmd, key in pairs(synthetic_keybinds) do
    command_to_key[cmd] = normalize_keybind(key)
  end

  -- 4. return executor
  return function(cmd)
    local keybind = command_to_key[cmd]
    if not keybind then
      return false
    end

    -- Warp stores keybinds using -, but we use +
    tap(keybind:gsub("%-", "+"))

    return true
  end
end

return M