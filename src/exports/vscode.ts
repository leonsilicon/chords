import { run } from "#/utils/exec.ts";
import { writeFileSync, rmSync, statSync } from "fs";
import { exists } from "#/utils/file.ts";

export async function createCommand() {
  let uid: string;

  try {
    uid = await run("id", ["-u"]);
  } catch {
    return () => false;
  }

  if (!uid) {
    return () => false;
  }

  const tmp = process.env.TMPDIR ?? "/tmp";
  const dir = `${tmp}/vscode-command-server-${uid}`;

  return function command(cmd: string) {
    if (!exists(dir)) {
      return false;
    }

    const requestPath = `${dir}/request.json`;
    const responsePath = `${dir}/response.json`;

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
  };
}
