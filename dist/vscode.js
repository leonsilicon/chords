// @bun
var __create = Object.create;
var __getProtoOf = Object.getPrototypeOf;
var __defProp = Object.defineProperty;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
function __accessProp(key) {
  return this[key];
}
var __toESMCache_node;
var __toESMCache_esm;
var __toESM = (mod, isNodeMode, target) => {
  var canCache = mod != null && typeof mod === "object";
  if (canCache) {
    var cache = isNodeMode ? __toESMCache_node ??= new WeakMap : __toESMCache_esm ??= new WeakMap;
    var cached = cache.get(mod);
    if (cached)
      return cached;
  }
  target = mod != null ? __create(__getProtoOf(mod)) : {};
  const to = isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target;
  for (let key of __getOwnPropNames(mod))
    if (!__hasOwnProp.call(to, key))
      __defProp(to, key, {
        get: __accessProp.bind(mod, key),
        enumerable: true
      });
  if (canCache)
    cache.set(mod, to);
  return to;
};
var __commonJS = (cb, mod) => () => (mod || cb((mod = { exports: {} }).exports, mod), mod.exports);
var __require = import.meta.require;

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
    if (err.code === "ENOENT")
      return false;
    throw err;
  }
}

// src/exports/vscode.ts
async function createCommand() {
  let uid;
  try {
    uid = await run("id", ["-u"]);
  } catch {
    return () => false;
  }
  if (!uid) {
    return () => false;
  }
  const tmp = process.env.TMPDIR ?? "/tmp";
  const dir = `${tmp}/vscode-command-server-${uid}`;
  return function command(cmd) {
    if (!exists(dir)) {
      return false;
    }
    const requestPath = `${dir}/request.json`;
    const responsePath = `${dir}/response.json`;
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
