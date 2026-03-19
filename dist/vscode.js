// @bun
// src/utils/exec.ts
import { spawn } from "child_process";
function run(cmd, args = []) {
  return new Promise((resolve, reject) => {
    console.log("Running spawn with cmd:", cmd, "args:", args);
    const child = spawn(cmd, args);
    let stdout = "";
    let stderr = "";
    child.stdout.on("data", (data) => {
      console.log("Received data:", data);
      stdout += data.toString();
    });
    child.stderr.on("data", (data) => {
      stderr += data.toString();
    });
    child.on("close", (code) => {
      console.log("Process closed with code:", code);
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
    return false;
  }
}

// node_modules/.pnpm/mimic-function@5.0.1/node_modules/mimic-function/index.js
var copyProperty = (to, from, property, ignoreNonConfigurable) => {
  if (property === "length" || property === "prototype") {
    return;
  }
  if (property === "arguments" || property === "caller") {
    return;
  }
  const toDescriptor = Object.getOwnPropertyDescriptor(to, property);
  const fromDescriptor = Object.getOwnPropertyDescriptor(from, property);
  if (!canCopyProperty(toDescriptor, fromDescriptor) && ignoreNonConfigurable) {
    return;
  }
  Object.defineProperty(to, property, fromDescriptor);
};
var canCopyProperty = function(toDescriptor, fromDescriptor) {
  return toDescriptor === undefined || toDescriptor.configurable || toDescriptor.writable === fromDescriptor.writable && toDescriptor.enumerable === fromDescriptor.enumerable && toDescriptor.configurable === fromDescriptor.configurable && (toDescriptor.writable || toDescriptor.value === fromDescriptor.value);
};
var changePrototype = (to, from) => {
  const fromPrototype = Object.getPrototypeOf(from);
  if (fromPrototype === Object.getPrototypeOf(to)) {
    return;
  }
  Object.setPrototypeOf(to, fromPrototype);
};
var wrappedToString = (withName, fromBody) => `/* Wrapped ${withName}*/
${fromBody}`;
var toStringDescriptor = Object.getOwnPropertyDescriptor(Function.prototype, "toString");
var toStringName = Object.getOwnPropertyDescriptor(Function.prototype.toString, "name");
var changeToString = (to, from, name) => {
  const withName = name === "" ? "" : `with ${name.trim()}() `;
  const newToString = wrappedToString.bind(null, withName, from.toString());
  Object.defineProperty(newToString, "name", toStringName);
  const { writable, enumerable, configurable } = toStringDescriptor;
  Object.defineProperty(to, "toString", { value: newToString, writable, enumerable, configurable });
};
function mimicFunction(to, from, { ignoreNonConfigurable = false } = {}) {
  const { name } = to;
  for (const property of Reflect.ownKeys(from)) {
    copyProperty(to, from, property, ignoreNonConfigurable);
  }
  changePrototype(to, from);
  changeToString(to, from, name);
  return to;
}

// node_modules/.pnpm/onetime@8.0.0/node_modules/onetime/index.js
var calledFunctions = new WeakMap;
var onetime = (function_, options = {}) => {
  if (typeof function_ !== "function") {
    throw new TypeError("Expected a function");
  }
  let returnValue;
  let callCount = 0;
  const functionName = function_.displayName || function_.name || "<anonymous>";
  const onetime2 = function(...arguments_) {
    calledFunctions.set(onetime2, ++callCount);
    if (function_) {
      returnValue = function_.apply(this, arguments_);
      function_ = undefined;
    } else if (options.throw === true) {
      throw new Error(`Function \`${functionName}\` can only be called once`);
    }
    return returnValue;
  };
  mimicFunction(onetime2, function_);
  calledFunctions.set(onetime2, callCount);
  return onetime2;
};
onetime.callCount = (function_) => {
  if (!calledFunctions.has(function_)) {
    throw new Error(`The given function \`${function_.name}\` is not wrapped by the \`onetime\` package`);
  }
  return calledFunctions.get(function_);
};
var onetime_default = onetime;

// src/exports/vscode.ts
import path from "path";
var getUid = onetime_default(async () => {
  console.log("Running id -u...");
  const uid = await run("id", ["-u"]);
  console.log("UID:", uid);
  return uid;
});
function createCommand() {
  return async function command(cmd) {
    console.log("cmd:", cmd);
    const uid = await getUid();
    console.log("resolved UID:", uid);
    const tmp = process.env.TMPDIR ?? "/tmp";
    const dir = path.join(tmp, `vscode-command-server-${uid}`);
    if (!exists(dir)) {
      return false;
    }
    const requestPath = path.join(dir, "request.json");
    const responsePath = path.join(dir, "response.json");
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
