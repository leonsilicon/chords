#!/usr/bin/env bun
import type { BuildHandler } from "#/types/handler.ts";
import spawn from "nano-spawn-compat";
import { join } from "desm";

export default (function createBrainfmHandler() {
  const brainfmBinpath = join(import.meta.url, "bin/brainfm");
  return async function (code: string) {
    await spawn(brainfmBinpath, { stdin: { string: code } });
  };
} satisfies BuildHandler);
