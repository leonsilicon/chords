// @bun
// node_modules/.pnpm/bplist-parser-pure@0.0.1/node_modules/bplist-parser-pure/dist/bplist-parser.mjs
function _define_property(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, { value, enumerable: true, configurable: true, writable: true });
  } else {
    obj[key] = value;
  }
  return obj;
}
var maxObjectSize = 100 * 1000 * 1000;
var maxObjectCount = 32768;
var EPOCH = 978307200000;

class UID {
  constructor(UID2) {
    _define_property(this, "UID", undefined);
    this.UID = UID2;
  }
}
var parseBuffer = function(_buffer) {
  const buffer = new Uint8Array(_buffer);
  const view = new DataView(_buffer);
  const header = String.fromCharCode(...buffer.slice(0, "bplist".length));
  if (header !== "bplist") {
    throw new Error("Invalid binary plist. Expected 'bplist' at offset 0.");
  }
  const trailerOffset = buffer.byteLength - 32;
  const offsetSize = view.getUint8(trailerOffset + 6);
  const objectRefSize = view.getUint8(trailerOffset + 7);
  const numObjects = readUInt64BE(view, trailerOffset + 8);
  const topObject = readUInt64BE(view, trailerOffset + 16);
  const offsetTableOffset = readUInt64BE(view, trailerOffset + 24);
  if (numObjects > maxObjectCount) {
    throw new Error("maxObjectCount exceeded");
  }
  const offsetTable = [];
  for (let i = 0;i < numObjects; i++) {
    const offset = offsetTableOffset + i * offsetSize;
    switch (offsetSize) {
      case 1:
        offsetTable.push(view.getUint8(offset));
        break;
      case 2:
        offsetTable.push(view.getUint16(offset));
        break;
      case 4:
        offsetTable.push(view.getUint32(offset));
        break;
      case 8:
        offsetTable.push(Number(view.getBigUint64(offset)));
        break;
    }
  }
  function parseObject(tableOffset) {
    const offset = offsetTable[tableOffset];
    const type = view.getUint8(offset);
    const objType = (type & 240) >> 4;
    const objInfo = type & 15;
    switch (objType) {
      case 0:
        return parseSimple();
      case 1:
        return parseInteger();
      case 2:
        return parseReal();
      case 3:
        return parseDate();
      case 4:
        return parseData();
      case 5:
        return parsePlistString();
      case 6:
        return parsePlistString(1);
      case 8:
        return parseUID();
      case 10:
        return parseArray();
      case 13:
        return parseDictionary();
      default:
        throw new Error("Unhandled type 0x" + objType.toString(16));
    }
    function parseSimple() {
      switch (objInfo) {
        case 0:
          return null;
        case 8:
          return false;
        case 9:
          return true;
        case 15:
          return null;
        default:
          throw new Error("Unhandled simple type 0x" + objType.toString(16));
      }
    }
    function bufferToHexString(buffer2) {
      let str = "";
      let i;
      for (i = 0;i < buffer2.length; i++) {
        if (buffer2[i] != 0) {
          break;
        }
      }
      for (;i < buffer2.length; i++) {
        const part = "00" + buffer2[i].toString(16);
        str += part.substring(part.length - 2);
      }
      return str;
    }
    function parseInteger() {
      const length = 1 << objInfo;
      switch (length) {
        case 1:
          return view.getInt8(offset + 1);
        case 2:
          return view.getInt16(offset + 1);
        case 4:
          return view.getInt32(offset + 1);
        case 8:
          return Number(view.getBigInt64(offset + 1));
        case 16:
          return BigInt(`0x${bufferToHexString(buffer.slice(offset + 1, offset + 1 + length))}`);
        default:
          throw new Error("Too little heap space available! Wanted to read " + length + " bytes, but only " + maxObjectSize + " are available.");
      }
    }
    function parseUID() {
      const length = objInfo + 1;
      if (length < maxObjectSize) {
        return new UID(readUInt(buffer.slice(offset + 1, offset + 1 + length)));
      }
      throw new Error("Too little heap space available! Wanted to read " + length + " bytes, but only " + maxObjectSize + " are available.");
    }
    function parseReal() {
      const length = Math.pow(2, objInfo);
      switch (length) {
        case 4:
          return view.getFloat32(offset + 1);
        case 8:
          return view.getFloat64(offset + 1);
        default:
          throw new Error("Too little heap space available! Wanted to read " + length + " bytes, but only " + maxObjectSize + " are available.");
      }
    }
    function parseDate() {
      if (objInfo != 3) {
        console.error("Unknown date type :" + objInfo + ". Parsing anyway...");
      }
      const timestamp = view.getFloat64(offset + 1);
      return new Date(EPOCH + 1000 * timestamp);
    }
    function parseData() {
      let dataOffset = 1;
      let length = objInfo;
      if (objInfo == 15) {
        const int_type = buffer[offset + 1];
        const intType = (int_type & 240) / 16;
        if (intType != 1) {
          console.error("0x4: UNEXPECTED LENGTH-INT TYPE! " + intType);
        }
        const intInfo = int_type & 15;
        const intLength = Math.pow(2, intInfo);
        dataOffset = 2 + intLength;
        length = readUInt(buffer.slice(offset + 2, offset + 2 + intLength));
      }
      if (length < maxObjectSize) {
        return buffer.slice(offset + dataOffset, offset + dataOffset + length);
      }
      throw new Error("Too little heap space available! Wanted to read " + length + " bytes, but only " + maxObjectSize + " are available.");
    }
    function parsePlistString(isUtf16 = 0) {
      let length = objInfo;
      let strOffset = 1;
      if (objInfo == 15) {
        const int_type = buffer[offset + 1];
        const intType = (int_type & 240) / 16;
        if (intType != 1) {
          console.error("UNEXPECTED LENGTH-INT TYPE! " + intType);
        }
        const intInfo = int_type & 15;
        const intLength = Math.pow(2, intInfo);
        strOffset = 2 + intLength;
        length = readUInt(buffer.slice(offset + 2, offset + 2 + intLength));
      }
      const byteLength = isUtf16 ? length * 2 : length;
      if (byteLength >= maxObjectSize) {
        throw new Error("Too little heap space available! Wanted to read " + byteLength + " bytes, but only " + maxObjectSize + " are available.");
      }
      const bytes = buffer.slice(offset + strOffset, offset + strOffset + byteLength);
      return isUtf16 ? decodeUtf16BE(bytes) : decodeAscii(bytes);
    }
    function parseArray() {
      let length = objInfo;
      let arrayOffset = 1;
      if (objInfo == 15) {
        const int_type = buffer[offset + 1];
        const intType = (int_type & 240) / 16;
        if (intType != 1) {
          console.error("0xa: UNEXPECTED LENGTH-INT TYPE! " + intType);
        }
        const intInfo = int_type & 15;
        const intLength = Math.pow(2, intInfo);
        arrayOffset = 2 + intLength;
        length = readUInt(buffer.slice(offset + 2, offset + 2 + intLength));
      }
      if (length * objectRefSize > maxObjectSize) {
        throw new Error("Too little heap space available!");
      }
      const array = [];
      for (let i = 0;i < length; i++) {
        const objRef = readUInt(buffer.slice(offset + arrayOffset + i * objectRefSize, offset + arrayOffset + (i + 1) * objectRefSize));
        array[i] = parseObject(objRef);
      }
      return array;
    }
    function parseDictionary() {
      let length = objInfo;
      let dictOffset = 1;
      if (objInfo == 15) {
        const int_type = buffer[offset + 1];
        const intType = (int_type & 240) / 16;
        if (intType != 1) {
          console.error("0xD: UNEXPECTED LENGTH-INT TYPE! " + intType);
        }
        const intInfo = int_type & 15;
        const intLength = Math.pow(2, intInfo);
        dictOffset = 2 + intLength;
        length = readUInt(buffer.slice(offset + 2, offset + 2 + intLength));
      }
      if (length * 2 * objectRefSize > maxObjectSize) {
        throw new Error("Too little heap space available!");
      }
      const dict = {};
      for (let i = 0;i < length; i++) {
        const keyRef = readUInt(buffer.slice(offset + dictOffset + i * objectRefSize, offset + dictOffset + (i + 1) * objectRefSize));
        const valRef = readUInt(buffer.slice(offset + dictOffset + length * objectRefSize + i * objectRefSize, offset + dictOffset + length * objectRefSize + (i + 1) * objectRefSize));
        const key = parseObject(keyRef);
        const val = parseObject(valRef);
        dict[key] = val;
        if (key === "flags" && typeof val === "number") {
          dict[key] = parseRunTimeFlags(val);
        }
      }
      return dict;
    }
  }
  return [parseObject(topObject)];
};
function readUInt(buffer, start = 0) {
  let l = 0;
  for (let i = start;i < buffer.byteLength; i++) {
    l <<= 8;
    l |= buffer[i] & 255;
  }
  return l;
}
function readUInt64BE(view, start) {
  return view.getUint32(start + 4);
}
function decodeAscii(bytes) {
  let result = "";
  const chunkSize = 32768;
  for (let i = 0;i < bytes.length; i += chunkSize) {
    result += String.fromCharCode(...bytes.subarray(i, i + chunkSize));
  }
  return result;
}
function decodeUtf16BE(bytes) {
  if (bytes.length % 2 !== 0) {
    throw new Error("Invalid UTF-16BE string length");
  }
  let result = "";
  const chunkSize = 16384;
  for (let i = 0;i < bytes.length; i += chunkSize * 2) {
    const end = Math.min(i + chunkSize * 2, bytes.length);
    const codeUnits = [];
    for (let j = i;j < end; j += 2) {
      codeUnits.push(bytes[j] << 8 | bytes[j + 1]);
    }
    result += String.fromCharCode(...codeUnits);
  }
  return result;
}
function parseRunTimeFlags(value) {
  const flagDefinitions = { 0: "Valid", 1: "Has been rounded", 2: "Positive infinity", 3: "Negative infinity", 4: "Indefinite" };
  for (let bit = 0;bit <= 4; bit++) {
    if (value & 1 << bit) {
      return flagDefinitions[bit];
    }
  }
}

// src/exports/wiheads.ts
import fs from "fs";

// src/utils/mac-keycode.ts
var CARBON_MODIFIERS = [
  { string: "cmd", mask: 1048576 },
  { string: "shift", mask: 131072 },
  { string: "alt", mask: 524288 },
  { string: "ctrl", mask: 262144 },
  { string: "caps_lock", mask: 65536 }
];
var MODERN_MODIFIERS = [
  { string: "caps_lock", mask: 1 << 16 },
  { string: "shift", mask: 1 << 17 },
  { string: "ctrl", mask: 1 << 18 },
  { string: "alt", mask: 1 << 19 },
  { string: "cmd", mask: 1 << 20 },
  { string: "numeric_pad", mask: 1 << 21 },
  { string: "help", mask: 1 << 22 },
  { string: "fn", mask: 1 << 23 }
];
function modifiersToStrings(mask) {
  const result = [];
  for (const modifier of MODERN_MODIFIERS) {
    if ((mask & modifier.mask) !== 0) {
      result.push(modifier.string);
    }
  }
  return result;
}
function carbonModifiersToStrings(mask) {
  const result = [];
  for (const modifier of CARBON_MODIFIERS) {
    if ((mask & modifier.mask) !== 0) {
      result.push(modifier.string);
    }
  }
  return result;
}

// node_modules/.pnpm/os-keycode@1.0.0/node_modules/os-keycode/index.js
var keys = {
  up: { linux: 103, macOS: 126, windows: 20 },
  down: { linux: 108, macOS: 125, windows: 28 },
  left: { linux: 105, macOS: 123, windows: 25 },
  right: { linux: 106, macOS: 124, windows: 27 },
  backspace: { linux: 14, macOS: 117, windows: 8 },
  enter: { linux: 28, macOS: 76, windows: "*" },
  home: { linux: 102, macOS: 115, windows: 36 },
  end: { linux: 107, macOS: 119, windows: 35 },
  pageDown: { linux: 109, macOS: 121, windows: 34 },
  pageUp: { linux: 104, macOS: 116, windows: 33 },
  return: { linux: "*", macOS: 36, windows: 13 },
  delete: { linux: 111, macOS: 51, windows: 46 },
  tab: { linux: 15, macOS: 48, windows: 9 },
  spacebar: { linux: 57, macOS: 49, windows: 20 },
  shift: { linux: "*", macOS: 56, windows: 10 },
  shiftRight: { linux: "*", macOS: 60, windows: "*" },
  control: { linux: "*", macOS: 59, windows: 11 },
  menu: { linux: 139, macOS: 58, windows: 18 },
  printScreen: { linux: 210, macOS: "*", windows: 42 },
  escape: { linux: 1, macOS: 53, windows: 27 },
  capsLock: { linux: 58, macOS: 57, windows: 20 },
  help: { linux: 138, macOS: 114, windows: 47 },
  f1: { linux: 59, macOS: 122, windows: 112 },
  f2: { linux: 60, macOS: 120, windows: 113 },
  f3: { linux: 61, macOS: 99, windows: 114 },
  f4: { linux: 62, macOS: 118, windows: 115 },
  f5: { linux: 63, macOS: 96, windows: 116 },
  f6: { linux: 64, macOS: 97, windows: 117 },
  f7: { linux: 65, macOS: 98, windows: 118 },
  f8: { linux: 66, macOS: 100, windows: 119 },
  f9: { linux: 67, macOS: 101, windows: 120 },
  f10: { linux: 68, macOS: 109, windows: 121 },
  f11: { linux: 87, macOS: 103, windows: 122 },
  f12: { linux: 88, macOS: 111, windows: 123 },
  macFn: { linux: "*", macOS: 63, windows: "*" },
  macOption: { linux: "*", macOS: 58, windows: "*" },
  macCommand: { linux: "*", macOS: 55, windows: "*" },
  macOptionRight: { linux: "*", macOS: 61, windows: "*" },
  macCommandRight: { linux: "*", macOS: 54, windows: "*" },
  winLeftWindow: { linux: "*", macOS: "*", windows: 91 },
  winRightWindow: { linux: "*", macOS: "*", windows: 92 },
  winApplication: { linux: "*", macOS: 110, windows: 93 },
  q: { linux: 16, macOS: 12, windows: 81 },
  w: { linux: 17, macOS: 13, windows: 87 },
  e: { linux: 18, macOS: 14, windows: 69 },
  r: { linux: 19, macOS: 15, windows: 82 },
  t: { linux: 20, macOS: 17, windows: 84 },
  y: { linux: 21, macOS: 16, windows: 89 },
  u: { linux: 22, macOS: 32, windows: 85 },
  i: { linux: 23, macOS: 34, windows: 73 },
  o: { linux: 24, macOS: 31, windows: 79 },
  p: { linux: 25, macOS: 35, windows: 80 },
  a: { linux: 30, macOS: "*", windows: 65 },
  s: { linux: 31, macOS: 1, windows: 83 },
  d: { linux: 32, macOS: 2, windows: 68 },
  f: { linux: 33, macOS: 3, windows: 70 },
  g: { linux: 34, macOS: 5, windows: 71 },
  h: { linux: 35, macOS: 4, windows: 72 },
  j: { linux: 36, macOS: 38, windows: 74 },
  k: { linux: 37, macOS: 40, windows: 75 },
  l: { linux: 38, macOS: 37, windows: 76 },
  z: { linux: 44, macOS: 6, windows: 90 },
  x: { linux: 45, macOS: 7, windows: 88 },
  c: { linux: 46, macOS: 8, windows: 67 },
  v: { linux: 47, macOS: 9, windows: 86 },
  b: { linux: 48, macOS: 11, windows: 66 },
  n: { linux: 49, macOS: 45, windows: 78 },
  m: { linux: 50, macOS: 46, windows: 77 },
  0: { linux: 11, macOS: 29, windows: 48 },
  1: { linux: 2, macOS: 18, windows: 49 },
  2: { linux: 3, macOS: 19, windows: 50 },
  3: { linux: 4, macOS: 20, windows: 51 },
  4: { linux: 5, macOS: 21, windows: 52 },
  5: { linux: 6, macOS: 23, windows: 53 },
  6: { linux: 7, macOS: 22, windows: 54 },
  7: { linux: 8, macOS: 26, windows: 55 },
  8: { linux: 9, macOS: 28, windows: 56 },
  9: { linux: 10, macOS: 25, windows: 57 },
  period: { linux: 52, macOS: 47, windows: 190 },
  comma: { linux: 51, macOS: 43, windows: 188 },
  slash: { linux: 53, macOS: 44, windows: 191 },
  num0: { linux: 82, macOS: 82, windows: 96 },
  num1: { linux: 79, macOS: 83, windows: 97 },
  num2: { linux: 80, macOS: 84, windows: 98 },
  num3: { linux: 81, macOS: 85, windows: 99 },
  num4: { linux: 75, macOS: 86, windows: 100 },
  num5: { linux: 76, macOS: 87, windows: 101 },
  num6: { linux: 77, macOS: 88, windows: 102 },
  num7: { linux: 71, macOS: 89, windows: 103 },
  num8: { linux: 72, macOS: 91, windows: 104 },
  num9: { linux: 73, macOS: 92, windows: 105 },
  multiply: { linux: 55, macOS: 67, windows: 106 },
  add: { linux: 78, macOS: 69, windows: 107 },
  subtract: { linux: 74, macOS: 78, windows: 109 },
  divide: { linux: 98, macOS: 75, windows: 111 },
  decimal: { linux: 83, macOS: 65, windows: 110 },
  numEqual: { linux: 117, macOS: 81, windows: "*" }
};
var platform = "linux";
if (process.platform === "win32") {
  platform = "windows";
}
if (process.platform === "darwin") {
  platform = "macOS";
}
var platformKeys = {};
Object.keys(keys).forEach((key) => {
  const possibleKey = keys[key][platform];
  let platformKey = platformKeys[possibleKey];
  if (!platformKey) {
    platformKeys[possibleKey] = platformKey = {};
  }
  if (possibleKey === "*") {
    if (platformKey.keys) {
      platformKey.keys.push(key);
    } else {
      platformKey.keys = [key];
      platformKey.code = possibleKey;
      delete platformKey.key;
    }
  } else {
    platformKey.code = keys[key][platform];
    platformKey.key = key;
    platformKey.keys = [key];
  }
});
var $keyname = (keycode) => keycode === 0 ? platformKeys["*"] : platformKeys[keycode];

// node_modules/.pnpm/untildify@6.0.0/node_modules/untildify/index.js
import os from "os";
var homeDirectory;
var currentUser;
function untildify(pathWithTilde) {
  if (typeof pathWithTilde !== "string") {
    throw new TypeError(`Expected a string, got ${typeof pathWithTilde}`);
  }
  if (homeDirectory === undefined) {
    homeDirectory = os.homedir();
  }
  if (homeDirectory && /^~(?=$|\/|\\)/.test(pathWithTilde)) {
    return pathWithTilde.replace(/^~/, homeDirectory);
  }
  const userMatch = pathWithTilde.match(/^~([^/\\]+)(.*)/);
  if (userMatch) {
    if (currentUser === undefined) {
      currentUser = os.userInfo().username;
    }
    if (currentUser) {
      const username = userMatch[1];
      const rest = userMatch[2];
      if (username === currentUser) {
        return homeDirectory + rest;
      }
    }
  }
  return pathWithTilde;
}

// src/exports/wiheads.ts
import { Buffer } from "buffer";
function makeShortcut(tildepath) {
  const filepath = untildify(tildepath);
  const plist = fs.readFileSync(filepath);
  return function shortcut(property) {
    const data = parseBuffer(plist.buffer);
    const rawValue = data[0]?.[property];
    if (!rawValue) {
      return false;
    }
    const valueString = rawValue instanceof Uint8Array ? Buffer.from(rawValue).toString("utf8") : String(rawValue);
    const value = JSON.parse(valueString);
    const keys2 = modifiersToStrings(value.internalModifiers);
    const keyInfo = $keyname(value.carbonKey);
    if (!keyInfo || !("key" in keyInfo)) {
      return false;
    }
    keys2.push(keyInfo.key);
    tap(keys2.join("+"));
  };
}
export {
  makeShortcut
};
