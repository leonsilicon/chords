// @bun
// src/utils/exec.ts
import { spawn } from "child_process";
function run(cmd, args = []) {
  return new Promise((resolve, reject) => {
    const child = spawn(cmd, args);
    let stdout = "";
    let stderr = "";
    child.stdout.on("data", (data) => {
      stdout += data.toString();
    });
    child.stderr.on("data", (data) => {
      stderr += data.toString();
    });
    child.on("close", (code) => {
      if (code === 0) {
        resolve(stdout.trim());
      } else {
        reject(new Error(stderr || `Process exited with code ${code}`));
      }
    });
  });
}

// src/exports/vscode.ts
import fs2 from "fs";

// src/utils/file.ts
import fs from "fs";
function exists(path) {
  try {
    fs.statSync(path);
    return true;
  } catch (err) {
    return false;
  }
}

// src/exports/vscode.ts
import path from "path";
async function createCommand() {
  const uid = await run("id", ["-u"]);
  return async function command(cmd) {
    const tmp = process.env.TMPDIR ?? "/tmp";
    const dir = path.join(tmp, `vscode-command-server-${uid}`);
    if (!exists(dir)) {
      return false;
    }
    const requestPath = path.join(dir, "request.json");
    const responsePath = path.join(dir, "response.json");
    const payload = JSON.stringify({
      commandId: cmd,
      args: []
    });
    fs2.writeFileSync(requestPath, payload);
    tap("cmd+shift+f17");
    fs2.rmSync(responsePath, { force: true });
    return true;
  };
}
export {
  createCommand
};
