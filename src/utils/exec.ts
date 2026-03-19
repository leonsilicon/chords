import { spawn } from "child_process";

// helper to run a command and collect stdout
export function run(cmd: string, args: string[] = []): Promise<string> {
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
