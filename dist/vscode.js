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
import { writeFileSync as writeFileSync2, rmSync, statSync as statSync2 } from "fs";

// src/utils/file.ts
import { readFileSync, writeFileSync, statSync } from "fs";
function exists(path) {
  try {
    statSync(path);
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
    writeFileSync2(requestPath, payload);
    tap("cmd+shift+f17");
    if (statSync2(responsePath)) {
      rmSync(responsePath);
    }
    return true;
  };
}
export {
  createCommand
};
