local M = {}

local file = require("pl.file")
local utils = require("pl.utils")
local json = require("lunajson")

-- This function makes it possible to programmatically execute IntelliJ commands
local GROOVY_TEMPLATE = [[
import com.intellij.openapi.actionSystem.ActionManager

def actionManager = ActionManager.getInstance()
def resultFile = new File(%s)

IDE.application.invokeAndWait {
  try {
    def action = actionManager.getAction(%s)
    if (action == null) {
      resultFile.text = "0"
      return
    }

    def result = actionManager.tryToExecute(action, null, null, null, false)
    resultFile.text = result.rejected ? "0" : "1"
  } catch (Throwable ignored) {
    resultFile.text = "0"
  }
}
]]

function M.create_action(bin_path)
  local ide = tostring(bin_path)

  return function(command_name)
    local tmp = os.getenv("TMPDIR") or "/tmp"
    local id = tostring(os.time()) .. "_" .. tostring(math.random(100000, 999999))

    local script_path = tmp .. "/jetbrains_action_" .. id .. ".groovy"
    local result_path = tmp .. "/jetbrains_action_" .. id .. ".txt"

    local script = GROOVY_TEMPLATE:format(
      json.encode(result_path),
      json.encode(command_name)
    )

    if not file.write(script_path, script) then
      return false
    end

    utils.execute(
      utils.quote_arg {
        ide,
        'ideScript',
        script_path
      }
    )

    local result = file.read(result_path) or ""

    os.remove(script_path)
    os.remove(result_path)

    return result == "1"
  end
end

return M