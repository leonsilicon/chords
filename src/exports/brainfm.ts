#!/usr/bin/env bun
import type { BuildHandler } from "#/types/handler.ts";
import spawn from "nano-spawn-compat";
import { join } from "desm";
import { onAppLaunch, onAppTerminate } from "chordsapp";
import getPort from "get-port";

export default (function createBrainfmHandler() {
  const brainfmAppPath = "/Applications/Brain.fm.app";
  let isPendingRestart = false;
  let remoteDebuggingPort: number | null = null;

  onAppLaunch(async (app) => {
    const { stdout } = await spawn("ps", ["-p", app.pid.toString(), "-o", "command="]);
    if (!stdout.includes("remote-debugging-port")) {
      isPendingRestart = true;
      await spawn("kill", ["-9", app.pid.toString()]);
    }
  });

  onAppTerminate(async () => {
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
} satisfies BuildHandler);
