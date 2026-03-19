import { execSync } from "child_process"
import fs from 'fs'

// This script allows us to execute VSCode commands directly via
// https://marketplace.visualstudio.com/items?itemName=pokey.command-server
// if it's active, and otherwise falls back to built-in shortcuts.
export function createCommand() {
  const uid = execSync("id -u", { stdio: "pipe" }).toString();
  if (!uid) {
    return () => false
  }

  const tmp = process.env.TMPDIR ?? "/tmp"
  const dir = `${tmp}/vscode-command-server-${uid}`

  return function command(cmd: string) {
    if (!fs.existsSync(dir)) {
      return false
    }

    const requestPath = `${dir}/request.json`
    const responsePath = `${dir}/response.json`

    const payload = JSON.stringify({
      commandId: cmd,
      args: []
    });

    fs.writeFileSync(requestPath, payload);
    tap('cmd+shift+f17')

    fs.unlinkSync(responsePath)

    return true
  }
}
