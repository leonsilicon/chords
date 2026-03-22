#!/usr/bin/env bun
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

// node_modules/.pnpm/nano-spawn-compat@2.0.6/node_modules/nano-spawn-compat/source/context.js
import process from "node:process";

// node_modules/.pnpm/ansi-regex@6.2.2/node_modules/ansi-regex/index.js
function ansiRegex({ onlyFirst = false } = {}) {
  const ST = "(?:\\u0007|\\u001B\\u005C|\\u009C)";
  const osc = `(?:\\u001B\\][\\s\\S]*?${ST})`;
  const csi = "[\\u001B\\u009B][[\\]()#;?]*(?:\\d{1,4}(?:[;:]\\d{0,4})*)?[\\dA-PR-TZcf-nq-uy=><~]";
  const pattern = `${osc}|${csi}`;
  return new RegExp(pattern, onlyFirst ? undefined : "g");
}

// node_modules/.pnpm/strip-ansi@7.2.0/node_modules/strip-ansi/index.js
var regex = ansiRegex();
function stripAnsi(string) {
  if (typeof string !== "string") {
    throw new TypeError(`Expected a \`string\`, got \`${typeof string}\``);
  }
  if (!string.includes("\x1B") && !string.includes("")) {
    return string;
  }
  return string.replace(regex, "");
}

// node_modules/.pnpm/nano-spawn-compat@2.0.6/node_modules/nano-spawn-compat/source/context.js
var getContext = (raw) => ({
  start: process.hrtime.bigint(),
  command: raw.map((part) => getCommandPart(stripAnsi(part))).join(" "),
  state: {
    stdout: "",
    stderr: "",
    output: "",
    isIterating: {},
    nonIterable: [false, false]
  }
});
var getCommandPart = (part) => /[^\w./-]/.test(part) ? `'${part.replaceAll("'", "'\\''")}'` : part;

// node_modules/.pnpm/nano-spawn-compat@2.0.6/node_modules/nano-spawn-compat/source/options.js
import path from "node:path";
import { fileURLToPath } from "node:url";
import process2 from "node:process";
var getOptions = ({
  stdin,
  stdout,
  stderr,
  stdio = [stdin, stdout, stderr],
  env: envOption,
  preferLocal,
  cwd: cwdOption = ".",
  ...options
}) => {
  const cwd = cwdOption instanceof URL ? fileURLToPath(cwdOption) : path.resolve(cwdOption);
  const env = envOption ? { ...process2.env, ...envOption } : undefined;
  const input = stdio[0]?.string;
  return {
    ...options,
    input,
    stdio: input === undefined ? stdio : ["pipe", ...stdio.slice(1)],
    env: preferLocal ? addLocalPath(env ?? process2.env, cwd) : env,
    cwd
  };
};
var addLocalPath = ({ Path = "", PATH = Path, ...env }, cwd) => {
  const pathParts = PATH.split(path.delimiter);
  const localPaths = getLocalPaths([], path.resolve(cwd)).map((localPath) => path.join(localPath, "node_modules/.bin")).filter((localPath) => !pathParts.includes(localPath));
  return { ...env, PATH: [...localPaths, PATH].filter(Boolean).join(path.delimiter) };
};
var getLocalPaths = (localPaths, localPath) => localPaths.at(-1) === localPath ? localPaths : getLocalPaths([...localPaths, localPath], path.resolve(localPath, ".."));

// node_modules/.pnpm/nano-spawn-compat@2.0.6/node_modules/nano-spawn-compat/source/spawn.js
import { spawn } from "node:child_process";

// node_modules/.pnpm/nano-spawn-compat@2.0.6/node_modules/nano-spawn-compat/source/windows.js
import fs from "node:fs/promises";
import path2 from "node:path";
import process3 from "node:process";
var applyForceShell = async (file, commandArguments, options) => await shouldForceShell(file, options) ? [escapeFile(file), commandArguments.map((argument) => escapeArgument(argument)), { ...options, shell: true }] : [file, commandArguments, options];
var shouldForceShell = async (file, { shell, cwd, env = process3.env }) => process3.platform === "win32" && !shell && !await isExe(file, cwd, env);
var isExe = (file, cwd, { Path = "", PATH = Path }) => exeExtensions.some((extension) => file.toLowerCase().endsWith(extension)) || mIsExe(file, cwd, PATH);
var EXE_MEMO = {};
var memoize = (function_) => (...arguments_) => EXE_MEMO[arguments_.join("\x00")] ??= function_(...arguments_);
var access = memoize(fs.access);
var mIsExe = memoize(async (file, cwd, PATH) => {
  const parts = PATH.split(path2.delimiter).filter(Boolean).map((part) => part.replace(/^"(.*)"$/, "$1"));
  try {
    await Promise.any([cwd, ...parts].flatMap((part) => exeExtensions.map((extension) => access(`${path2.resolve(part, file)}${extension}`))));
  } catch {
    return false;
  }
  return true;
});
var exeExtensions = [".exe", ".com"];
var escapeArgument = (argument) => escapeFile(escapeFile(`"${argument.replaceAll(/(\\*)"/g, "$1$1\\\"").replace(/(\\*)$/, "$1$1")}"`));
var escapeFile = (file) => file.replaceAll(/([()\][%!^"`<>&|;, *?])/g, "^$1");

// node_modules/.pnpm/nano-spawn-compat@2.0.6/node_modules/nano-spawn-compat/source/result.js
import process4 from "node:process";

// node_modules/.pnpm/nano-spawn-compat@2.0.6/node_modules/nano-spawn-compat/source/once.js
function once(emitter, event) {
  return new Promise((resolve, reject) => {
    function onEvent(...arguments_) {
      cleanup();
      resolve(arguments_);
    }
    function onError(error) {
      cleanup();
      reject(error);
    }
    function cleanup() {
      if (emitter.off) {
        emitter.off(event, onEvent);
        emitter.off("error", onError);
      }
      if (emitter.removeListener) {
        emitter.removeListener(event, onEvent);
        emitter.removeListener("error", onError);
      }
    }
    emitter.on(event, onEvent);
    if (event !== "error") {
      emitter.on("error", onError);
    }
  });
}

// node_modules/.pnpm/nano-spawn-compat@2.0.6/node_modules/nano-spawn-compat/source/result.js
var getResult = async (nodeChildProcess, { input }, context) => {
  const instance = await nodeChildProcess;
  if (input !== undefined) {
    instance.stdin.write(input);
    instance.stdin.end();
  }
  const onClose = once(instance, "close");
  try {
    await Promise.race([
      onClose,
      ...[instance.stdin, instance.stdout, instance.stderr].filter(Boolean).map((stream) => onStreamError(stream))
    ]);
    checkFailure(context, getErrorOutput(instance));
    return getOutputs(context);
  } catch (error) {
    await Promise.allSettled([onClose]);
    throw getResultError(error, instance, context);
  }
};
var onStreamError = (stream) => new Promise((_resolve, reject) => {
  stream.on("error", (error) => {
    if (!["ERR_STREAM_PREMATURE_CLOSE", "EPIPE"].includes(error?.code)) {
      reject(error);
    }
  });
});
var checkFailure = ({ command }, { exitCode, signalName }) => {
  if (signalName !== undefined) {
    throw new SubprocessError(`Command was terminated with ${signalName}: ${command}`);
  }
  if (exitCode !== undefined) {
    throw new SubprocessError(`Command failed with exit code ${exitCode}: ${command}`);
  }
};
var getResultError = (error, instance, context) => Object.assign(getErrorInstance(error, context), getErrorOutput(instance), getOutputs(context));
var getErrorInstance = (error, { command }) => error instanceof SubprocessError ? error : new SubprocessError(`Command failed: ${command}`, { cause: error });

class SubprocessError extends Error {
  name = "SubprocessError";
}
var getErrorOutput = ({ exitCode, signalCode }) => ({
  ...exitCode < 1 ? {} : { exitCode },
  ...signalCode === null ? {} : { signalName: signalCode }
});
var getOutputs = ({ state: { stdout, stderr, output }, command, start }) => ({
  stdout: getOutput(stdout),
  stderr: getOutput(stderr),
  output: getOutput(output),
  command,
  durationMs: Number(process4.hrtime.bigint() - start) / 1e6
});
var getOutput = (output) => output.at(-1) === `
` ? output.slice(0, output.at(-2) === "\r" ? -2 : -1) : output;

// node_modules/.pnpm/nano-spawn-compat@2.0.6/node_modules/nano-spawn-compat/source/spawn.js
var spawnSubprocess = async (file, commandArguments, options, context) => {
  try {
    [file, commandArguments, options] = await applyForceShell(file, commandArguments, options);
    [file, commandArguments, options] = concatenateShell(file, commandArguments, options);
    const instance = spawn(file, commandArguments, options);
    bufferOutput(instance.stdout, context, "stdout");
    bufferOutput(instance.stderr, context, "stderr");
    instance.once("error", () => {});
    return instance;
  } catch (error) {
    throw getResultError(error, {}, context);
  }
};
var concatenateShell = (file, commandArguments, options) => options.shell && commandArguments.length > 0 ? [[file, ...commandArguments].join(" "), [], options] : [file, commandArguments, options];
var bufferOutput = (stream, { state }, streamName) => {
  if (stream) {
    stream.setEncoding?.("utf8");
    if (!state.isIterating[streamName]) {
      state.isIterating[streamName] = false;
      stream.on("data", (chunk) => {
        state[streamName] += chunk;
        state.output += chunk;
      });
    }
  }
};

// node_modules/.pnpm/nano-spawn-compat@2.0.6/node_modules/nano-spawn-compat/source/pipe.js
import { pipeline } from "node:stream/promises";
var handlePipe = async (subprocesses) => {
  const [[from, to]] = await Promise.all([Promise.allSettled(subprocesses), pipeStreams(subprocesses)]);
  if (to.reason) {
    to.reason.pipedFrom = from.reason ?? from.value;
    throw to.reason;
  }
  if (from.reason) {
    throw from.reason;
  }
  return { ...to.value, pipedFrom: from.value };
};
var pipeStreams = async (subprocesses) => {
  try {
    const [{ stdout }, { stdin }] = await Promise.all(subprocesses.map(({ nodeChildProcess }) => nodeChildProcess));
    if (stdin === null) {
      throw new Error('The "stdin" option must be set on the first "spawn()" call in the pipeline.');
    }
    if (stdout === null) {
      throw new Error('The "stdout" option must be set on the last "spawn()" call in the pipeline.');
    }
    pipeline(stdout, stdin).catch(() => {});
  } catch (error) {
    await Promise.allSettled(subprocesses.map(({ nodeChildProcess }) => closeStdin(nodeChildProcess)));
    throw error;
  }
};
var closeStdin = async (nodeChildProcess) => {
  const { stdin } = await nodeChildProcess;
  stdin.end();
};

// node_modules/.pnpm/nano-spawn-compat@2.0.6/node_modules/nano-spawn-compat/source/iterable.js
var lineIterator = async function* (subprocess, { state }, streamName, index) {
  if (state.isIterating[streamName] === false) {
    throw new Error(`The subprocess must be iterated right away, for example:
	for await (const line of spawn(...)) { ... }`);
  }
  state.isIterating[streamName] = true;
  try {
    const { [streamName]: stream } = await subprocess.nodeChildProcess;
    if (!stream) {
      state.nonIterable[index] = true;
      const message = state.nonIterable.every(Boolean) ? "either the option `stdout` or `stderr`" : `the option \`${streamName}\``;
      throw new TypeError(`The subprocess cannot be iterated unless ${message} is 'pipe'.`);
    }
    handleErrors(subprocess);
    let buffer = "";
    for await (const chunk of stream.iterator({ destroyOnReturn: false })) {
      const lines = `${buffer}${chunk}`.split(/\r?\n/);
      buffer = lines.pop();
      yield* lines;
    }
    if (buffer) {
      yield buffer;
    }
  } finally {
    await subprocess;
  }
};
var handleErrors = async (subprocess) => {
  try {
    await subprocess;
  } catch {}
};
var combineAsyncIterators = async function* ({ state }, ...iterators) {
  try {
    let promises = [];
    while (iterators.length > 0) {
      promises = iterators.map((iterator2, index2) => promises[index2] ?? getNext(iterator2, index2, state));
      const [{ value, done }, index] = await Promise.race(promises.map((promise, index2) => Promise.all([promise, index2])));
      const [iterator] = iterators.splice(index, 1);
      promises.splice(index, 1);
      if (!done) {
        iterators.push(iterator);
        yield value;
      }
    }
  } finally {
    await Promise.all(iterators.map((iterator) => iterator.return()));
  }
};
var getNext = async (iterator, index, { nonIterable }) => {
  try {
    return await iterator.next();
  } catch (error) {
    return shouldIgnoreError(nonIterable, index) ? iterator.return() : iterator.throw(error);
  }
};
var shouldIgnoreError = (nonIterable, index) => nonIterable.every(Boolean) ? index !== nonIterable.length - 1 : nonIterable[index];

// node_modules/.pnpm/nano-spawn-compat@2.0.6/node_modules/nano-spawn-compat/source/index.js
function spawn2(file, second, third, previous) {
  const [commandArguments = [], options = {}] = Array.isArray(second) ? [second, third] : [[], second];
  const context = getContext([file, ...commandArguments]);
  const spawnOptions = getOptions(options);
  const nodeChildProcess = spawnSubprocess(file, commandArguments, spawnOptions, context);
  let subprocess = getResult(nodeChildProcess, spawnOptions, context);
  Object.assign(subprocess, { nodeChildProcess });
  subprocess = previous ? handlePipe([previous, subprocess]) : subprocess;
  const stdout = lineIterator(subprocess, context, "stdout", 0);
  const stderr = lineIterator(subprocess, context, "stderr", 1);
  return Object.assign(subprocess, {
    nodeChildProcess,
    stdout,
    stderr,
    [Symbol.asyncIterator]: () => combineAsyncIterators(context, stdout, stderr),
    pipe: (file2, second2, third2) => spawn2(file2, second2, third2, subprocess)
  });
}

// node_modules/.pnpm/desm@1.3.1/node_modules/desm/index.js
import { fileURLToPath as fileURLToPath2 } from "url";
import { dirname, join } from "path";
function urlDirname(url) {
  return dirname(fileURLToPath2(url));
}
function urlJoin(url, ...str) {
  return join(urlDirname(url), ...str);
}

// src/exports/brainfm.ts
import { onAppLaunch, onAppTerminate } from "chordsapp";

// node_modules/.pnpm/get-port@7.2.0/node_modules/get-port/index.js
import net from "node:net";
import os from "node:os";

class Locked extends Error {
  constructor(port) {
    super(`${port} is locked`);
  }
}
var lockedPorts = {
  old: new Set,
  young: new Set
};
var releaseOldLockedPortsIntervalMs = 1000 * 15;
var reservedPorts = new Set;
var timeout;
var getLocalHosts = () => {
  const interfaces = os.networkInterfaces();
  const results = new Set([undefined, "0.0.0.0"]);
  for (const _interface of Object.values(interfaces)) {
    for (const config of _interface) {
      results.add(config.address);
    }
  }
  return results;
};
var checkAvailablePort = (options) => new Promise((resolve, reject) => {
  const server = net.createServer();
  server.unref();
  server.on("error", reject);
  server.listen(options, () => {
    const { port } = server.address();
    server.close(() => {
      resolve(port);
    });
  });
});
var getAvailablePort = async (options, hosts) => {
  if (options.host || options.port === 0) {
    return checkAvailablePort(options);
  }
  for (const host of hosts) {
    try {
      await checkAvailablePort({ port: options.port, host });
    } catch (error) {
      if (!["EADDRNOTAVAIL", "EINVAL"].includes(error.code)) {
        throw error;
      }
    }
  }
  return options.port;
};
var isLockedPort = (port) => lockedPorts.old.has(port) || lockedPorts.young.has(port) || reservedPorts.has(port);
var portCheckSequence = function* (ports) {
  if (ports) {
    yield* ports;
  }
  yield 0;
};
async function getPorts(options) {
  let ports;
  let exclude = new Set;
  if (options) {
    if (options.port) {
      ports = typeof options.port === "number" ? [options.port] : options.port;
    }
    if (options.exclude) {
      const excludeIterable = options.exclude;
      if (typeof excludeIterable[Symbol.iterator] !== "function") {
        throw new TypeError("The `exclude` option must be an iterable.");
      }
      for (const element of excludeIterable) {
        if (typeof element !== "number") {
          throw new TypeError("Each item in the `exclude` option must be a number corresponding to the port you want excluded.");
        }
        if (!Number.isSafeInteger(element)) {
          throw new TypeError(`Number ${element} in the exclude option is not a safe integer and can't be used`);
        }
      }
      exclude = new Set(excludeIterable);
    }
  }
  const { reserve, ...netOptions } = options ?? {};
  if (timeout === undefined) {
    timeout = setTimeout(() => {
      timeout = undefined;
      lockedPorts.old = lockedPorts.young;
      lockedPorts.young = new Set;
    }, releaseOldLockedPortsIntervalMs);
    if (timeout.unref) {
      timeout.unref();
    }
  }
  const hosts = getLocalHosts();
  for (const port of portCheckSequence(ports)) {
    try {
      if (exclude.has(port)) {
        continue;
      }
      let availablePort = await getAvailablePort({ ...netOptions, port }, hosts);
      while (isLockedPort(availablePort)) {
        if (port !== 0) {
          throw new Locked(port);
        }
        availablePort = await getAvailablePort({ ...netOptions, port }, hosts);
      }
      if (reserve) {
        reservedPorts.add(availablePort);
      } else {
        lockedPorts.young.add(availablePort);
      }
      return availablePort;
    } catch (error) {
      if (!["EADDRINUSE", "EACCES"].includes(error.code) && !(error instanceof Locked)) {
        throw error;
      }
    }
  }
  throw new Error("No available ports found");
}

// src/exports/brainfm.ts
var createBrainfmHandler = function createBrainfmHandler() {
  const brainfmAppPath = "/Applications/Brain.fm.app";
  let isPendingRestart = false;
  let remoteDebuggingPort = null;
  onAppLaunch(async (app) => {
    const { stdout } = await spawn2("ps", ["-p", app.pid.toString(), "-o", "command="]);
    if (!stdout.includes("remote-debugging-port")) {
      isPendingRestart = true;
      await spawn2("kill", ["-9", app.pid.toString()]);
    }
  });
  onAppTerminate(async () => {
    if (isPendingRestart) {
      isPendingRestart = false;
      remoteDebuggingPort = await getPorts();
      await spawn2("open", [
        "-na",
        brainfmAppPath,
        "--args",
        `--remote-debugging-port=${remoteDebuggingPort}`
      ]);
    }
  });
  const brainfmBinpath = urlJoin(import.meta.url, "bin/brainfm");
  return async function(code) {
    if (!remoteDebuggingPort) {
      return false;
    }
    await spawn2(brainfmBinpath, [remoteDebuggingPort.toString()], { stdin: { string: code } });
  };
};
export {
  createBrainfmHandler as default
};
