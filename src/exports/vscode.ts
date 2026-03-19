import { run } from "#/utils/exec.ts";
import fs from "fs";
import { exists } from "#/utils/file.ts";
import path from 'path'

// TODO: make this work for Cursor
export async function createCommand() {
  const uid = await run("id", ["-u"]);

  return async function command(cmd: string) {
    const tmp = process.env.TMPDIR ?? "/tmp";
    const dir = path.join(tmp, `vscode-command-server-${uid}`);

    if (!exists(dir)) {
      return false;
    }

    const requestPath = path.join(dir, "request.json");
    const responsePath = path.join(dir, "response.json");

    const payload = JSON.stringify({
      commandId: cmd,
      args: [],
    });

    fs.writeFileSync(requestPath, payload);
    // We need to remove the previous response.json before continuing
    fs.rmSync(responsePath, { force: true });
    tap("cmd+shift+f17");

    return true;
  }
}