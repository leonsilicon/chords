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

// node_modules/.pnpm/jxa-run-compat@1.5.0/node_modules/jxa-run-compat/lib/run.js
var require_run = __commonJS((exports) => {
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.run = exports.runJXACode = undefined;
  var child_process_1 = __require("child_process");
  function runJXACode(jxaCode) {
    return executeInOsa(jxaCode, []);
  }
  exports.runJXACode = runJXACode;
  function run(jxaCodeFunction) {
    var args = [];
    for (var _i = 1;_i < arguments.length; _i++) {
      args[_i - 1] = arguments[_i];
    }
    var code = `
ObjC.import('stdlib');
var args = JSON.parse($.getenv('OSA_ARGS'));
var fn   = (`.concat(jxaCodeFunction.toString(), `);
var out  = fn.apply(null, args);
JSON.stringify({ result: out });
`);
    return executeInOsa(code, args);
  }
  exports.run = run;
  var DEFAULT_MAX_BUFFER = 1000 * 1000 * 100;
  function executeInOsa(code, args) {
    return new Promise(function(resolve, reject) {
      var child = (0, child_process_1.spawn)("/usr/bin/osascript", ["-l", "JavaScript"], {
        env: {
          OSA_ARGS: JSON.stringify(args)
        },
        stdio: ["pipe", "pipe", "pipe"]
      });
      var stdoutBuffers = [];
      var stderrBuffers = [];
      var stdoutLength = 0;
      var stderrLength = 0;
      var done = false;
      function finishError(err) {
        if (done)
          return;
        done = true;
        reject(err);
      }
      function onData(chunk, buffers, currentLength, streamName) {
        var nextLength = currentLength + chunk.length;
        if (nextLength > DEFAULT_MAX_BUFFER) {
          child.kill();
          finishError(new Error("".concat(streamName, " maxBuffer length exceeded")));
          return currentLength;
        }
        buffers.push(chunk);
        return nextLength;
      }
      child.stdout.on("data", function(chunk) {
        stdoutLength = onData(chunk, stdoutBuffers, stdoutLength, "stdout");
      });
      child.stderr.on("data", function(chunk) {
        stderrLength = onData(chunk, stderrBuffers, stderrLength, "stderr");
      });
      child.on("error", function(err) {
        finishError(err);
      });
      child.on("close", function() {
        if (done)
          return;
        var stdout = Buffer.concat(stdoutBuffers);
        var stderr = Buffer.concat(stderrBuffers);
        if (stderr.length) {
          console.error(stderr.toString());
        }
        if (!stdout.length) {
          done = true;
          resolve(undefined);
        }
        try {
          var result = JSON.parse(stdout.toString().trim()).result;
          done = true;
          resolve(result);
        } catch (errorOutput) {
          done = true;
          resolve(stdout.toString().trim());
        }
      });
      child.stdin.write(code);
      child.stdin.end();
    });
  }
});

// src/exports/menu.ts
var import_jxa_run_compat = __toESM(require_run(), 1);
async function buildMenuHandler(processName) {
  return function menu(menuBarItem, menuItems) {
    return import_jxa_run_compat.run((processName2, menuBarItem2, menuItems2) => {
      const se = Application("System Events");
      const am = Application(processName2);
      am.activate();
      const proc = se.processes[processName2];
      let current = proc.menuBars[0].menuBarItems[menuBarItem2];
      for (let i = 0;i < menuItems2.length; i++) {
        const name = menuItems2[i];
        const next = current.menus[0].menuItems[name];
        if (i === menuItems2.length - 1) {
          next.click();
        } else {
          current = next;
        }
      }
    }, processName, menuBarItem, menuItems);
  };
}
export {
  buildMenuHandler
};
