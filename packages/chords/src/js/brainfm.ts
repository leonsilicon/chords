import spawn from "nano-spawn-compat";
import { join } from "desm";
import { onAppLaunch, onAppTerminate, setAppNeedsRelaunch } from "chord";
import getPort from "get-port";

export default async function createBrainfmHandler(this: any) {
  const brainfmAppPath = "/Applications/Brain.fm.app";
  let isPendingRestart = false;
  let remoteDebuggingPort: number | null = null;

  // TODO: check
  setAppNeedsRelaunch(this.bundleId, true);

  const hasRemoteDebuggingPort = async (pid: number) => {
    const { stdout } = await spawn("ps", ["-p", pid.toString(), "-o", "command="]);
    return stdout.includes("remote-debugging-port");
  };

  // Ensures the app is launched with remote debugging
  onAppLaunch(this.bundleId, async (app) => {
    if (!(await hasRemoteDebuggingPort(app.pid))) {
      isPendingRestart = true;
      await spawn("kill", ["-9", app.pid.toString()]);
    }
  });

  onAppTerminate(this.bundleId, async () => {
    if (isPendingRestart) {
      isPendingRestart = false;
      remoteDebuggingPort = await getPort();
      await spawn("open", [
        "-na",
        brainfmAppPath,
        "--args",
        `--remote-debugging-port=${remoteDebuggingPort}`,
      ]);
    }
  });

  const brainfmBinpath = join(import.meta.url, "bin/brainfm");
  return async function (code: string) {
    if (!remoteDebuggingPort) {
      return false;
    }

    await spawn(brainfmBinpath, [remoteDebuggingPort.toString()], { stdin: { string: code } });
  };
}
