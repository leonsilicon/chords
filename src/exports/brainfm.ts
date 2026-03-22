import type { BuildHandler } from "#/types/handler.ts";
import spawn from "tinyspawn";
import { join } from "desm";
import { Readable } from "stream";

export default (function createBrainfmHandler() {
  const brainfmBinpath = join(import.meta.url, "bin/brainfm");
  return async function (code: string) {
    const subprocess = spawn(brainfmBinpath);
    Readable.from(code).pipe(subprocess.stdin);
    const { stdout } = await subprocess;
  };
} satisfies BuildHandler);
