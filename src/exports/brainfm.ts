#!/usr/bin/env bun
import type { BuildHandler } from "#/types/handler.ts";
import spawn from "nano-spawn-compat";
import path from "path";

export default (function createBrainfmHandler() {
  const brainfmBinpath = path.join(__dirname, "bin/brainfm.js");
  return async function (code: string) {
    await spawn(brainfmBinpath, [code]);
  };
} satisfies BuildHandler);
