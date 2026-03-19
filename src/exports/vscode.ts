import { run } from "#/utils/exec.ts";
import { writeFileSync, rmSync, statSync } from "fs";
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

    writeFileSync(requestPath, payload);

    tap("cmd+shift+f17");

    if (statSync(responsePath)) {
      rmSync(responsePath);
    }

    return true;
  }
}