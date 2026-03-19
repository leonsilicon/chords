import * as fs from "fs"
import * as process from "process";
import { spawn } from 'child_process';
import { outdent } from "outdent";

// This function makes it possible to programmatically execute IntelliJ commands
export function createAction(ideBinPath: string) {
  return async function action(commandId: string) {
    const tmp = process.env.TMPDIR ?? '/tmp'
    const id = Math.random()
    const scriptPath = `${tmp}/jetbrains_action_${id}.groovy`
    const resultPath = `${tmp}/jetbrains_action_${id}.txt`

    const script = outdent`
    import com.intellij.openapi.actionSystem.ActionManager

    def actionManager = ActionManager.getInstance()
    def resultFile = new File(${JSON.stringify(resultPath)})

    IDE.application.invokeAndWait {
      try {
        def action = actionManager.getAction(${JSON.stringify(commandId)})
        if (action == null) {
          resultFile.text = "0"
          return
        }

        def result = actionManager.tryToExecute(action, null, null, null, false)
        resultFile.text = result.rejected ? "0" : "1"
      } catch (Throwable ignored) {
        resultFile.text = "0"
      }
    }`

    fs.writeFileSync(scriptPath, script)
    await spawn(ideBinPath, ['ideScript', scriptPath]);
    const result = fs.readFileSync(resultPath, 'utf8')

    fs.unlinkSync(scriptPath)
    fs.unlinkSync(resultPath)

    return result == "1"
  }
}
