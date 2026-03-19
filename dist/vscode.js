// @bun
// src/exports/vscode.ts
import * as os from "os";
import * as std from "std";
function createCommand() {
  const f = std.popen("id -u", std.openFileFlags.r);
  if (!f) {
    return () => false;
  }
  const uid = f.readAsString().trim();
  f.close();
  if (!uid) {
    return () => false;
  }
  const tmp = std.getenv("TMPDIR") ?? "/tmp";
  const dir = `${tmp}/vscode-command-server-${uid}`;
  return function command(cmd) {
    const [stat2, err] = os.stat(dir);
    if (err) {
      return false;
    }
    const requestPath = `${dir}/request.json`;
    const responsePath = `${dir}/response.json`;
    const payload = JSON.stringify({
      commandId: cmd,
      args: []
    });
    std.writeFile(requestPath, payload);
    tap("cmd+shift+f17");
    os.remove(responsePath);
    return true;
  };
}
export {
  createCommand
};
