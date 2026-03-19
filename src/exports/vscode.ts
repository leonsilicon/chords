import { run } from "#/utils/exec.ts";
import fs from "fs";

export default async function createCommand() {
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

    fs.writeFileSync(requestPath, payload);

    tap("cmd+shift+f17");

    if (fs.existsSync(responsePath)) {
      fs.unlinkSync(responsePath);
    }

    return true;
  };
}