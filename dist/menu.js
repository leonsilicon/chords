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
var buildMenuHandler = async function buildMenuHandler(meta, processName) {
  return function menu(menuBarItem, menuItems) {
    return import_jxa_run_compat.run((processName2, menuBarItem2, menuItemsCommaJoined) => {
      const menuItems2 = menuItemsCommaJoined.split(",");
      const log = (...args) => {
        console.log("[JXA]", ...args);
      };
      const normalize = (s) => s.replace(/[\u200B-\u200F\uFEFF\u202A-\u202E]/g, "").trim();
      const findByName = (collection, target, label) => {
        const normTarget = normalize(target);
        const items = collection();
        for (let i = 0;i < items.length; i++) {
          try {
            const raw = items[i].name();
            const norm = normalize(raw);
            if (norm === normTarget) {
              log(`Matched ${label}:`, `"${raw}"`);
              return items[i];
            }
          } catch {}
        }
        log(`❌ Available ${label}s:`);
        for (let i = 0;i < items.length; i++) {
          try {
            log("-", `"${items[i].name()}"`);
          } catch {}
        }
        throw new Error(`Missing: ${label} "${target}"`);
      };
      const assertExists = (obj, label) => {
        if (!obj)
          throw new Error(`❌ Failed at: ${label}`);
        log("OK:", label);
        return obj;
      };
      if (!Array.isArray(menuItems2)) {
        throw new Error(`Expected menuItems to be an array, got: ${typeof menuItems2}`);
      }
      console.log(menuItems2);
      const se = Application("System Events");
      const app = Application(processName2);
      log("Activating app:", processName2);
      app.activate();
      delay(0.1);
      const proc = assertExists(se.processes.whose({ frontmost: true })[0], "frontmost process");
      log("Frontmost process:", proc.name());
      const menuBar = assertExists(proc.menuBars[0], "menuBars[0]");
      const menuBarItemRef = findByName(menuBar.menuBarItems, menuBarItem2, "menuBarItem");
      let current = menuBarItemRef;
      for (let i = 0;i < menuItems2.length; i++) {
        const name = menuItems2[i];
        log(`Traversing -> "${name}"`);
        const menu2 = assertExists(current.menus[0], `menus[0] for "${name}"`);
        const next = findByName(menu2.menuItems, name, "menuItem");
        if (i === menuItems2.length - 1) {
          log(`Clicking "${name}"`);
          next.click();
        } else {
          current = next;
        }
      }
      log("Done");
    }, processName, menuBarItem, menuItems.join(","));
  };
};
export {
  buildMenuHandler as default
};
