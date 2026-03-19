import { run } from "#/utils/exec.ts";
import { writeFileSync, rmSync, existsSync } from "fs";

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
    if (!fs.existsSync(dir)) {
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

    if (existsSync(responsePath)) {
      rmSync(responsePath);
    }

    return true;
  };
}