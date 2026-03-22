#!/usr/bin/env bun
import type { BuildHandler } from "#/types/handler.ts";
import spawn from "nano-spawn-compat";
import { join } from "desm";

export default (function createBrainfmHandler() {
  const brainfmBinpath = join(import.meta.url, "bin/brainfm");
  return async function (code: string) {
    const subprocess = spawn(brainfmBinpath, {
      stdout: "inherit",
      stderr: "inherit",
      stdin: "pipe",
    });
    const nodeSubprocess = await subprocess.nodeChildProcess;
    nodeSubprocess.stdin?.write(code);
    nodeSubprocess.stdin?.end();
    await subprocess;
  };
} satisfies BuildHandler);
