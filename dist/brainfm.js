import { createRequire } from "node:module";
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
var __require = /* @__PURE__ */ createRequire(import.meta.url);

// node_modules/.pnpm/tinyspawn@1.5.6/node_modules/tinyspawn/src/index.js
var require_src = __commonJS((exports, module) => {
  var { spawn } = __require("child_process");
  var { EOL } = __require("os");
  var EE_PROPS = Object.getOwnPropertyNames(__require("events").EventEmitter.prototype).filter((name) => !name.startsWith("_")).concat(["kill", "ref", "unref"]);
  var eos = (stream, listener, buffer = []) => stream[listener] ? stream[listener].on("data", (data) => buffer.push(data)) && buffer : buffer;
  var createChildProcessError = ({ cmd, cmdArgs, childProcess }) => {
    const command = `${cmd} ${cmdArgs.join(" ")}`;
    let message = `The command spawned as:${EOL}${EOL}`;
    message += `  \`${command}\`${EOL}${EOL}`;
    message += `exited with:${EOL}${EOL}`;
    message += `  \`{ signal: '${childProcess.signalCode}', code: ${childProcess.exitCode} }\` ${EOL}${EOL}`;
    message += `with the following trace:${EOL}`;
    const error = new Error(message);
    error.command = command;
    error.name = "ChildProcessError";
    Object.keys(childProcess).filter((key) => !key.startsWith("_") && !["stdio", "stdin"].includes(key)).forEach((key) => {
      error[key] = childProcess[key];
    });
    return error;
  };
  var clean = (str) => str.trim().replace(/\n$/, "");
  var parse = (buffer, { json } = {}) => (encoding, start, end) => {
    const data = clean(Buffer.concat(buffer).toString(encoding, start, end));
    return json ? JSON.parse(data) : data;
  };
  var extend = (defaults) => (input, args, options) => {
    if (!(args instanceof Array)) {
      options = args;
      args = [];
    }
    const [cmd, ...cmdArgs] = input.split(" ").concat(args).filter(Boolean);
    let childProcess;
    const promise = new Promise((resolve, reject) => {
      const opts = { ...defaults, ...options };
      childProcess = spawn(cmd, cmdArgs, opts);
      const stdout = eos(childProcess, "stdout");
      const stderr = eos(childProcess, "stderr");
      childProcess.on("error", reject).on("exit", (exitCode) => {
        Object.defineProperty(childProcess, "stdout", {
          get: parse(stdout, opts)
        });
        Object.defineProperty(childProcess, "stderr", { get: parse(stderr) });
        if (exitCode !== 0) {
          const error = createChildProcessError({ cmd, cmdArgs, childProcess });
          if (opts.reject !== false)
            return reject(error);
          childProcess.error = error;
        }
        return resolve(childProcess);
      });
    });
    const subprocess = Object.assign(promise, childProcess);
    if (childProcess) {
      EE_PROPS.forEach((name) => subprocess[name] = childProcess[name].bind(childProcess));
    }
    return subprocess;
  };
  var $ = extend();
  $.extend = extend;
  $.json = $.extend({ json: true });
  module.exports = $;
});

// src/exports/brainfm.ts
var import_tinyspawn = __toESM(require_src(), 1);

// node_modules/.pnpm/desm@1.3.1/node_modules/desm/index.js
import { fileURLToPath } from "url";
import { dirname, join } from "path";
function urlDirname(url) {
  return dirname(fileURLToPath(url));
}
function urlJoin(url, ...str) {
  return join(urlDirname(url), ...str);
}

// src/exports/brainfm.ts
import { Readable } from "stream";
var createBrainfmHandler = function createBrainfmHandler() {
  const brainfmBinpath = urlJoin(import.meta.url, "bin/brainfm");
  return async function(code) {
    const subprocess = import_tinyspawn.default(brainfmBinpath);
    Readable.from(code).pipe(subprocess.stdin);
    const { stdout } = await subprocess;
  };
};
export {
  createBrainfmHandler as default
};
