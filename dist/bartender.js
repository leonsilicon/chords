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

// node_modules/.pnpm/@stdlib+utils-noop@0.2.3/node_modules/@stdlib/utils-noop/lib/main.js
var require_main = __commonJS((exports, module) => {
  function noop() {}
  module.exports = noop;
});

// node_modules/.pnpm/@stdlib+utils-noop@0.2.3/node_modules/@stdlib/utils-noop/lib/index.js
var require_lib = __commonJS((exports, module) => {
  var main = require_main();
  module.exports = main;
});

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

// src/utils/plist.ts
import { Buffer as Buffer2 } from "buffer";
import fs from "fs";

// src/utils/mac-keycode.ts
var CARBON_MODIFIERS = [
  { string: "MetaLeft", mask: 1 << 8 },
  { string: "ShiftLeft", mask: 1 << 9 },
  { string: "AltLeft", mask: 1 << 11 },
  { string: "ControlLeft", mask: 1 << 12 },
  { string: "CapsLock", mask: 1 << 10 }
];
var MODERN_MODIFIERS = [
  { string: "CapsLock", mask: 1 << 16 },
  { string: "ShiftLeft", mask: 1 << 17 },
  { string: "ControlLeft", mask: 1 << 18 },
  { string: "AltLeft", mask: 1 << 19 },
  { string: "MetaLeft", mask: 1 << 20 },
  { string: "Numpad", mask: 1 << 21 },
  { string: "Help", mask: 1 << 22 },
  { string: "Function", mask: 1 << 23 }
];
function modifiersToKeystrings(mask) {
  const result = [];
  for (const modifier of MODERN_MODIFIERS) {
    if ((mask & modifier.mask) !== 0) {
      result.push(modifier.string);
    }
  }
  return result;
}
function carbonModifiersToKeystrings(mask) {
  const result = [];
  for (const modifier of CARBON_MODIFIERS) {
    if ((mask & modifier.mask) !== 0) {
      result.push(modifier.string);
    }
  }
  return result;
}
function keystringsToMask(keystrings, modifiers) {
  let mask = 0;
  for (const keystring of keystrings) {
    const modifier = modifiers.find((m) => m.string === keystring);
    if (modifier) {
      mask |= modifier.mask;
    }
  }
  return mask;
}
function keystringsToModifierMask(keystrings) {
  return keystringsToMask(keystrings, MODERN_MODIFIERS);
}
function keystringsToCarbonModifierMask(keystrings) {
  return keystringsToMask(keystrings, CARBON_MODIFIERS);
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
var keycode = (keyname) => {
  const key = keys[keyname];
  if (!key) {
    return `Keyname ${keyname} not found`;
  }
  const platformKey = key[platform];
  return platformKey === "*" ? 0 : platformKey;
};
var $keyname = (keycode2) => keycode2 === 0 ? platformKeys["*"] : platformKeys[keycode2];
var $keycode = keycode;

// src/utils/plist.ts
import { tap } from "chordsapp";

// node_modules/.pnpm/bplist-creator-pure@0.2.0/node_modules/bplist-creator-pure/index.js
class WritableStreamBuffer {
  constructor() {
    this._chunks = [];
    this._size = 0;
  }
  write(chunk, encoding) {
    let buf;
    if (typeof chunk === "number") {
      buf = Buffer.from([chunk & 255]);
    } else if (Buffer.isBuffer(chunk)) {
      buf = Buffer.from(chunk);
    } else if (chunk instanceof Uint8Array) {
      buf = Buffer.from(chunk);
    } else if (typeof chunk === "string") {
      buf = Buffer.from(chunk, encoding);
    } else {
      throw new TypeError("Unsupported chunk type passed to write()");
    }
    this._chunks.push(buf);
    this._size += buf.length;
    return true;
  }
  size() {
    return this._size;
  }
  getContents() {
    if (this._size === 0) {
      return false;
    }
    return Buffer.concat(this._chunks, this._size);
  }
}
function Real(value) {
  this.value = value;
}
function bplist(dicts) {
  var buffer = new WritableStreamBuffer;
  buffer.write(Buffer.from("bplist00"));
  if (dicts instanceof Array && dicts.length === 1) {
    dicts = dicts[0];
  }
  var entries = toEntries(dicts);
  var idSizeInBytes = computeIdSizeInBytes(entries.length);
  var offsets = [];
  var offsetSizeInBytes;
  var offsetTableOffset;
  updateEntryIds();
  entries.forEach(function(entry, entryIdx) {
    offsets[entryIdx] = buffer.size();
    if (!entry) {
      buffer.write(0);
    } else {
      write(entry);
    }
  });
  writeOffsetTable();
  writeTrailer();
  return buffer.getContents();
  function updateEntryIds() {
    var strings = {};
    var entryId = 0;
    entries.forEach(function(entry) {
      if (entry.id) {
        return;
      }
      if (entry.type === "string") {
        if (!entry.bplistOverride && strings.hasOwnProperty(entry.value)) {
          entry.type = "stringref";
          entry.id = strings[entry.value];
        } else {
          strings[entry.value] = entry.id = entryId++;
        }
      } else {
        entry.id = entryId++;
      }
    });
    entries = entries.filter(function(entry) {
      return entry.type !== "stringref";
    });
  }
  function writeTrailer() {
    buffer.write(Buffer.from([0, 0, 0, 0, 0, 0]));
    writeByte(offsetSizeInBytes);
    writeByte(idSizeInBytes);
    writeLong(entries.length);
    writeLong(0);
    writeLong(offsetTableOffset);
  }
  function writeOffsetTable() {
    offsetTableOffset = buffer.size();
    offsetSizeInBytes = computeOffsetSizeInBytes(offsetTableOffset);
    offsets.forEach(function(offset) {
      writeBytes(offset, offsetSizeInBytes);
    });
  }
  function write(entry) {
    switch (entry.type) {
      case "dict":
        writeDict(entry);
        break;
      case "number":
      case "double":
        writeNumber(entry);
        break;
      case "UID":
        writeUID(entry);
        break;
      case "array":
        writeArray(entry);
        break;
      case "boolean":
        writeBoolean(entry);
        break;
      case "string":
      case "string-utf16":
        writeString(entry);
        break;
      case "date":
        writeDate(entry);
        break;
      case "data":
        writeData(entry);
        break;
      default:
        throw new Error("unhandled entry type: " + entry.type);
    }
  }
  function writeDate(entry) {
    writeByte(51);
    var date = Date.parse(entry.value) / 1000 - 978307200;
    writeDouble(date);
  }
  function writeDict(entry) {
    writeIntHeader(13, entry.entryKeys.length);
    entry.entryKeys.forEach(function(entry2) {
      writeID(entry2.id);
    });
    entry.entryValues.forEach(function(entry2) {
      writeID(entry2.id);
    });
  }
  function writeNumber(entry) {
    if (typeof entry.value === "bigint") {
      var width = 16;
      var hex = entry.value.toString(width);
      var buf = Buffer.from(hex.padStart(width * 2, "0").slice(0, width * 2), "hex");
      writeByte(20);
      buffer.write(buf);
    } else if (entry.type !== "double" && parseFloat(entry.value).toFixed() == entry.value) {
      if (entry.value < 0) {
        writeByte(19);
        writeBytes(entry.value, 8, true);
      } else if (entry.value <= 255) {
        writeByte(16);
        writeBytes(entry.value, 1);
      } else if (entry.value <= 65535) {
        writeByte(17);
        writeBytes(entry.value, 2);
      } else if (entry.value <= 4294967295) {
        writeByte(18);
        writeBytes(entry.value, 4);
      } else {
        writeByte(19);
        writeBytes(entry.value, 8);
      }
    } else {
      writeByte(35);
      writeDouble(entry.value);
    }
  }
  function writeUID(entry) {
    writeIntHeader(8, 0);
    writeID(entry.value);
  }
  function writeArray(entry) {
    writeIntHeader(10, entry.entries.length);
    entry.entries.forEach(function(e) {
      writeID(e.id);
    });
  }
  function writeBoolean(entry) {
    writeByte(entry.value ? 9 : 8);
  }
  function writeString(entry) {
    if (entry.type === "string-utf16" || mustBeUtf16(entry.value)) {
      var utf16 = Buffer.from(entry.value, "ucs2");
      writeIntHeader(6, utf16.length / 2);
      for (var i = 0;i < utf16.length; i += 2) {
        var t = utf16[i + 0];
        utf16[i + 0] = utf16[i + 1];
        utf16[i + 1] = t;
      }
      buffer.write(utf16);
    } else {
      var utf8 = Buffer.from(entry.value, "ascii");
      writeIntHeader(5, utf8.length);
      buffer.write(utf8);
    }
  }
  function writeData(entry) {
    writeIntHeader(4, entry.value.length);
    buffer.write(entry.value);
  }
  function writeLong(l) {
    writeBytes(l, 8);
  }
  function writeByte(b) {
    buffer.write(Buffer.from([b]));
  }
  function writeDouble(v) {
    var buf = Buffer.alloc(8);
    buf.writeDoubleBE(v, 0);
    buffer.write(buf);
  }
  function writeIntHeader(kind, value) {
    if (value < 15) {
      writeByte((kind << 4) + value);
    } else if (value < 256) {
      writeByte((kind << 4) + 15);
      writeByte(16);
      writeBytes(value, 1);
    } else if (value < 65536) {
      writeByte((kind << 4) + 15);
      writeByte(17);
      writeBytes(value, 2);
    } else {
      writeByte((kind << 4) + 15);
      writeByte(18);
      writeBytes(value, 4);
    }
  }
  function writeID(id) {
    writeBytes(id, idSizeInBytes);
  }
  function writeBytes(value, bytes, is_signedint) {
    var buf = Buffer.alloc(bytes);
    var z = 0;
    while (bytes > 4) {
      buf[z++] = is_signedint ? 255 : 0;
      bytes--;
    }
    for (var i = bytes - 1;i >= 0; i--) {
      buf[z++] = value >> 8 * i;
    }
    buffer.write(buf);
  }
  function mustBeUtf16(string) {
    return Buffer.byteLength(string, "utf8") != string.length;
  }
}
function toEntries(dicts) {
  if (dicts.bplistOverride) {
    return [dicts];
  }
  if (dicts instanceof Array) {
    return toEntriesArray(dicts);
  } else if (dicts instanceof Buffer) {
    return [
      {
        type: "data",
        value: dicts
      }
    ];
  } else if (dicts instanceof Real) {
    return [
      {
        type: "double",
        value: dicts.value
      }
    ];
  } else if (typeof dicts === "object") {
    if (dicts instanceof Date) {
      return [
        {
          type: "date",
          value: dicts
        }
      ];
    } else if (Object.keys(dicts).length == 1 && typeof dicts.UID === "number") {
      return [
        {
          type: "UID",
          value: dicts.UID
        }
      ];
    } else {
      return toEntriesObject(dicts);
    }
  } else if (typeof dicts === "string") {
    return [
      {
        type: "string",
        value: dicts
      }
    ];
  } else if (typeof dicts === "number") {
    return [
      {
        type: "number",
        value: dicts
      }
    ];
  } else if (typeof dicts === "boolean") {
    return [
      {
        type: "boolean",
        value: dicts
      }
    ];
  } else if (typeof dicts === "bigint") {
    return [
      {
        type: "number",
        value: dicts
      }
    ];
  } else {
    throw new Error("unhandled entry: " + dicts);
  }
}
function toEntriesArray(arr) {
  var results = [
    {
      type: "array",
      entries: []
    }
  ];
  arr.forEach(function(v) {
    var entry = toEntries(v);
    results[0].entries.push(entry[0]);
    results = results.concat(entry);
  });
  return results;
}
function toEntriesObject(dict) {
  var results = [
    {
      type: "dict",
      entryKeys: [],
      entryValues: []
    }
  ];
  Object.keys(dict).forEach(function(key) {
    var entryKey = toEntries(key);
    results[0].entryKeys.push(entryKey[0]);
    results = results.concat(entryKey[0]);
  });
  Object.keys(dict).forEach(function(key) {
    var entryValue = toEntries(dict[key]);
    results[0].entryValues.push(entryValue[0]);
    results = results.concat(entryValue);
  });
  return results;
}
function computeOffsetSizeInBytes(maxOffset) {
  if (maxOffset < 256) {
    return 1;
  }
  if (maxOffset < 65536) {
    return 2;
  }
  if (maxOffset < 4294967296) {
    return 4;
  }
  return 8;
}
function computeIdSizeInBytes(numberOfIds) {
  if (numberOfIds < 256) {
    return 1;
  }
  if (numberOfIds < 65536) {
    return 2;
  }
  return 4;
}

// node_modules/.pnpm/fast-is-equal@1.2.6/node_modules/fast-is-equal/dist/index.js
var TYPEOF_OBJECT = "object";
var TYPEOF_FUNCTION = "function";
var TYPEOF_NUMBER = "number";
var TYPEOF_STRING = "string";
var TYPEOF_BOOLEAN = "boolean";
var TYPEOF_SYMBOL = "symbol";
var TYPEOF_BIGINT = "bigint";
var isNaN = Number.isNaN;
var dateConstructor = Date;
var regExpConstructor = RegExp;
var mapConstructor = Map;
var setConstructor = Set;
var arrayBufferConstructor = ArrayBuffer;
var promiseConstructor = Promise;
var errorConstructor = Error;
var dataViewConstructor = DataView;
function fastIsEqual(a, b) {
  if (a === b)
    return true;
  if (a == null || b == null)
    return false;
  const typeA = typeof a;
  if (typeA === TYPEOF_NUMBER) {
    return typeof b === TYPEOF_NUMBER && isNaN(a) && isNaN(b);
  }
  if (typeA === TYPEOF_STRING || typeA === TYPEOF_BOOLEAN || typeA === TYPEOF_FUNCTION || typeA === TYPEOF_SYMBOL || typeA === TYPEOF_BIGINT) {
    return false;
  }
  if (typeof b !== TYPEOF_OBJECT)
    return false;
  const aIsArray = Array.isArray(a);
  if (aIsArray !== Array.isArray(b))
    return false;
  const aCtor = a.constructor;
  if (aCtor !== b.constructor)
    return false;
  if (aIsArray) {
    const len = a.length;
    if (len !== b.length)
      return false;
    if (len === 0)
      return true;
    if (len < 8) {
      for (let i = 0;i < len; i++) {
        const hasA = i in a;
        if (hasA !== i in b)
          return false;
        if (!hasA)
          continue;
        const elemA = a[i];
        const elemB = b[i];
        if (elemA === elemB)
          continue;
        if (elemA == null || elemB == null)
          return false;
        const elemTypeA = typeof elemA;
        if (elemTypeA !== typeof elemB)
          return false;
        if (elemTypeA === TYPEOF_NUMBER) {
          if (!(isNaN(elemA) && isNaN(elemB)))
            return false;
          continue;
        }
        if (elemTypeA !== TYPEOF_OBJECT && elemTypeA !== TYPEOF_FUNCTION) {
          return false;
        }
        if (!deepEqual(elemA, elemB, new Map))
          return false;
      }
      return true;
    }
    return deepEqual(a, b, new Map);
  }
  if (aCtor === dateConstructor) {
    return a.getTime() === b.getTime();
  }
  if (aCtor === regExpConstructor) {
    return a.source === b.source && a.flags === b.flags;
  }
  return deepEqual(a, b, new Map);
}
function deepEqual(valA, valB, visited) {
  if (valA === valB)
    return true;
  if (valA == null || valB == null)
    return false;
  const typeA = typeof valA;
  if (typeA !== typeof valB)
    return false;
  if (typeA === TYPEOF_NUMBER) {
    return isNaN(valA) && isNaN(valB);
  }
  if (typeA !== TYPEOF_OBJECT && typeA !== TYPEOF_FUNCTION) {
    return false;
  }
  const visitedVal = visited.get(valA);
  if (visitedVal !== undefined)
    return visitedVal === valB;
  if (visited.has(valB))
    return false;
  const ctorA = valA.constructor;
  if (ctorA !== valB.constructor)
    return false;
  if (ctorA === dateConstructor) {
    return valA.getTime() === valB.getTime();
  }
  if (ctorA === regExpConstructor) {
    return valA.source === valB.source && valA.flags === valB.flags;
  }
  if (ctorA === promiseConstructor || ctorA === errorConstructor) {
    return false;
  }
  if (Array.isArray(valA)) {
    const len = valA.length;
    if (len !== valB.length)
      return false;
    visited.set(valA, valB);
    visited.set(valB, valA);
    if (len === 0)
      return true;
    for (let i = 0;i < len; i++) {
      const hasA = i in valA;
      if (hasA !== i in valB)
        return false;
      if (!hasA)
        continue;
      const elemA = valA[i];
      const elemB = valB[i];
      if (elemA !== elemB && !deepEqual(elemA, elemB, visited)) {
        return false;
      }
    }
    return true;
  }
  if (ctorA === mapConstructor) {
    const mapA = valA;
    const mapB = valB;
    if (mapA.size !== mapB.size)
      return false;
    if (mapA.size === 0)
      return true;
    visited.set(valA, valB);
    visited.set(valB, valA);
    for (const [key, valueA] of mapA) {
      const keyType = typeof key;
      if (keyType !== TYPEOF_OBJECT && keyType !== TYPEOF_FUNCTION) {
        if (!mapB.has(key))
          return false;
        const valueB = mapB.get(key);
        if (valueA !== valueB && !deepEqual(valueA, valueB, visited)) {
          return false;
        }
      } else {
        let found = false;
        for (const [keyB, valueB] of mapB) {
          if (deepEqual(key, keyB, visited) && deepEqual(valueA, valueB, visited)) {
            found = true;
            break;
          }
        }
        if (!found)
          return false;
      }
    }
    return true;
  }
  if (ctorA === setConstructor) {
    const setA = valA;
    const setB = valB;
    if (setA.size !== setB.size)
      return false;
    if (setA.size === 0)
      return true;
    visited.set(valA, valB);
    visited.set(valB, valA);
    let hasPrimitives = false;
    let hasObjects = false;
    for (const val of setA) {
      const valType = typeof val;
      if (valType === TYPEOF_OBJECT || valType === TYPEOF_FUNCTION) {
        hasObjects = true;
      } else {
        hasPrimitives = true;
        if (!setB.has(val))
          return false;
      }
    }
    if (!hasObjects)
      return true;
    const objectsA = [];
    const objectsB = [];
    for (const val of setA) {
      const valType = typeof val;
      if (valType === TYPEOF_OBJECT || valType === TYPEOF_FUNCTION) {
        objectsA.push(val);
      }
    }
    for (const val of setB) {
      const valType = typeof val;
      if (valType === TYPEOF_OBJECT || valType === TYPEOF_FUNCTION) {
        objectsB.push(val);
      }
    }
    const used = new Uint8Array(objectsB.length);
    for (const valA2 of objectsA) {
      let found = false;
      for (let j = 0;j < objectsB.length; j++) {
        if (!used[j]) {
          const newVisited = new Map(visited);
          if (deepEqual(valA2, objectsB[j], newVisited)) {
            used[j] = 1;
            found = true;
            break;
          }
        }
      }
      if (!found)
        return false;
    }
    return true;
  }
  if (ctorA === arrayBufferConstructor) {
    const bufA = valA;
    const bufB = valB;
    const byteLength = bufA.byteLength;
    if (byteLength !== bufB.byteLength)
      return false;
    const viewA = new Uint8Array(bufA);
    const viewB = new Uint8Array(bufB);
    let i = 0;
    const unrollEnd = byteLength - 7;
    for (;i < unrollEnd; i += 8) {
      if (viewA[i] !== viewB[i] || viewA[i + 1] !== viewB[i + 1] || viewA[i + 2] !== viewB[i + 2] || viewA[i + 3] !== viewB[i + 3] || viewA[i + 4] !== viewB[i + 4] || viewA[i + 5] !== viewB[i + 5] || viewA[i + 6] !== viewB[i + 6] || viewA[i + 7] !== viewB[i + 7]) {
        return false;
      }
    }
    for (;i < byteLength; i++) {
      if (viewA[i] !== viewB[i])
        return false;
    }
    return true;
  }
  if (ctorA === dataViewConstructor) {
    const viewA = valA;
    const viewB = valB;
    if (viewA.byteLength !== viewB.byteLength || viewA.byteOffset !== viewB.byteOffset) {
      return false;
    }
    for (let i = 0;i < viewA.byteLength; i++) {
      if (viewA.getUint8(i) !== viewB.getUint8(i))
        return false;
    }
    return true;
  }
  if (ArrayBuffer.isView(valA)) {
    const arrA = valA;
    const arrB = valB;
    const len = arrA.length;
    if (len !== arrB.length)
      return false;
    if (len < 16) {
      for (let i2 = 0;i2 < len; i2++) {
        if (arrA[i2] !== arrB[i2])
          return false;
      }
      return true;
    }
    let i = 0;
    const unrollLen = len - 3;
    for (;i < unrollLen; i += 4) {
      if (arrA[i] !== arrB[i] || arrA[i + 1] !== arrB[i + 1] || arrA[i + 2] !== arrB[i + 2] || arrA[i + 3] !== arrB[i + 3]) {
        return false;
      }
    }
    for (;i < len; i++) {
      if (arrA[i] !== arrB[i])
        return false;
    }
    return true;
  }
  visited.set(valA, valB);
  visited.set(valB, valA);
  const keysA = Object.keys(valA);
  const keysALen = keysA.length;
  if (keysALen !== Object.keys(valB).length)
    return false;
  if (keysALen === 0) {
    const checkSymbols2 = Object.getOwnPropertySymbols !== undefined;
    if (checkSymbols2) {
      const symbolsA = Object.getOwnPropertySymbols(valA);
      if (symbolsA.length !== Object.getOwnPropertySymbols(valB).length) {
        return false;
      }
      for (let i = 0;i < symbolsA.length; i++) {
        const sym = symbolsA[i];
        if (!(sym in valB) || !deepEqual(valA[sym], valB[sym], visited)) {
          return false;
        }
      }
    }
    return true;
  }
  for (let i = 0;i < keysALen; i++) {
    const key = keysA[i];
    if (!(key in valB))
      return false;
    const propA = valA[key];
    const propB = valB[key];
    if (propA !== propB) {
      const propTypeA = typeof propA;
      if (propTypeA === TYPEOF_OBJECT || propTypeA === TYPEOF_FUNCTION) {
        if (!deepEqual(propA, propB, visited))
          return false;
      } else if (propTypeA === TYPEOF_NUMBER) {
        if (!(isNaN(propA) && isNaN(propB)))
          return false;
      } else {
        return false;
      }
    }
  }
  const checkSymbols = Object.getOwnPropertySymbols !== undefined;
  if (checkSymbols) {
    const symbolsA = Object.getOwnPropertySymbols(valA);
    if (symbolsA.length > 0) {
      if (symbolsA.length !== Object.getOwnPropertySymbols(valB).length) {
        return false;
      }
      for (let i = 0;i < symbolsA.length; i++) {
        const sym = symbolsA[i];
        if (!(sym in valB) || !deepEqual(valA[sym], valB[sym], visited)) {
          return false;
        }
      }
    }
  }
  return true;
}

// src/utils/plist.ts
function plistValueToString(rawValue) {
  const valueString = rawValue instanceof Uint8Array ? Buffer2.from(rawValue).toString("utf8") : String(rawValue);
  return valueString;
}
function getPlistShortcutUtils({
  plistPath,
  modifierMaskKey,
  modifierType,
  keycodeKey
}) {
  function readPlist() {
    const plist = parseBuffer(fs.readFileSync(plistPath).buffer);
    return plist;
  }
  function writeShortcuts(writes) {
    let plistNeedsUpdates = false;
    const plist = readPlist();
    const root = plist[0];
    if (!root) {
      throw new Error("plist root is not an object");
    }
    for (const { shortcut, property, propertyType } of writes) {
      const parts = shortcut.split("+");
      const key = parts.at(-1);
      const modifiers = parts.slice(0, -1);
      const mask = modifierType === "carbon" ? keystringsToCarbonModifierMask(modifiers) : keystringsToModifierMask(modifiers);
      const object = {
        [modifierMaskKey]: mask,
        [keycodeKey]: $keycode(key.toLowerCase())
      };
      if (fastIsEqual(root[property], object)) {
        continue;
      }
      const stringValue = JSON.stringify(object);
      const value = propertyType === "string" ? stringValue : new Uint8Array(Buffer2.from(stringValue, "utf8"));
      root[property] = value;
    }
    if (plistNeedsUpdates) {
      fs.writeFileSync(plistPath, bplist(plist));
    }
    return plistNeedsUpdates;
  }
  function buildHandler() {
    const plist = readPlist();
    return function handler(property) {
      const rawValue = plist[0]?.[property];
      if (!rawValue) {
        return false;
      }
      const value = JSON.parse(plistValueToString(rawValue));
      const keys2 = modifierType === "carbon" ? carbonModifiersToKeystrings(value[modifierMaskKey]) : modifiersToKeystrings(value[modifierMaskKey]);
      const keyInfo = $keyname(value[keycodeKey]);
      if (!keyInfo || !("key" in keyInfo)) {
        return false;
      }
      keys2.push(keyInfo.key);
      tap(keys2.join("+"));
      return true;
    };
  }
  return {
    writeShortcuts,
    buildHandler,
    readPlist
  };
}

// src/utils/global.ts
import { getGlobalHotkey, registerGlobalHotkey } from "chordsapp";
function ensureGlobalHotkeys(globalChords, {
  bundleId,
  getHotkeyId
}) {
  return Object.entries(globalChords).flatMap(([sequence, chord]) => {
    if (!chord) {
      return [];
    }
    const hotkeyId = getHotkeyId(chord);
    const shortcut = getGlobalHotkey(bundleId, hotkeyId) ?? registerGlobalHotkey(bundleId, hotkeyId);
    if (shortcut === undefined) {
      console.warn(`Failed to register global hotkey for ${bundleId} ${hotkeyId}`);
      return [];
    }
    return [{
      chord,
      sequence,
      shortcut
    }];
  });
}

// node_modules/.pnpm/filter-obj@6.1.0/node_modules/filter-obj/index.js
var isSet = (input) => Object.prototype.toString.call(input) === "[object Set]";
function includeKeys(object, predicate) {
  const result = {};
  if (Array.isArray(predicate) || isSet(predicate)) {
    for (const key of predicate) {
      const descriptor = Object.getOwnPropertyDescriptor(object, key);
      if (!descriptor?.enumerable) {
        continue;
      }
      Object.defineProperty(result, key, descriptor);
    }
  } else {
    for (const key of Reflect.ownKeys(object)) {
      const descriptor = Object.getOwnPropertyDescriptor(object, key);
      if (!descriptor?.enumerable) {
        continue;
      }
      const value = object[key];
      if (predicate(key, value, object)) {
        Object.defineProperty(result, key, descriptor);
      }
    }
  }
  return result;
}

// node_modules/.pnpm/nullthrows-es@1.0.1/node_modules/nullthrows-es/build/nullthrows.js
function nullthrows(value, message) {
  if (value != null) {
    return value;
  }
  throw new TypeError(message !== null && message !== undefined ? message : `Expected value not to be null or undefined but got ${value}`);
}

// src/utils/file.ts
import fs2 from "fs";
function exists(path) {
  try {
    fs2.statSync(path);
    return true;
  } catch (err) {
    return false;
  }
}

// src/exports/bartender.ts
var import_utils_noop = __toESM(require_lib(), 1);
import { Buffer as Buffer3 } from "buffer";
import fs3 from "fs";
var buildBartenderHandler = function buildBartenderHandler(meta, tildepath) {
  const plistPath = untildify(tildepath);
  if (!exists(plistPath)) {
    return import_utils_noop.default;
  }
  const globalHotkeys = ensureGlobalHotkeys(includeKeys(meta.chords, (sequence) => sequence.startsWith("/") || sequence.startsWith("-")), {
    bundleId: meta.bundleId,
    getHotkeyId: (chord) => nullthrows(chord.args?.[0])
  });
  const { writeShortcuts, buildHandler, readPlist } = getPlistShortcutUtils({
    plistPath,
    modifierType: "carbon",
    modifierMaskKey: "carbonModifiers",
    keycodeKey: "carbonKeyCode"
  });
  writeShortcuts(globalHotkeys.map(({ chord, shortcut }) => ({
    property: nullthrows(chord.args?.[1]),
    propertyType: "string",
    shortcut
  })));
  {
    const plist2 = readPlist();
    const root = plist2[0];
    const rawValue = plistValueToString(root["per-item-hotkeys"]) ?? "[]";
    const perItemHotkeyList = JSON.parse(rawValue);
    for (const { chord } of globalHotkeys) {
      const appBundleIdentifier = chord.args?.[1];
      const keyName = chord.args?.[2];
      const appName = chord.args?.[3];
      if (!appBundleIdentifier || !keyName || !appName) {
        continue;
      }
      if (perItemHotkeyList.some((item2) => item2.keyName === keyName)) {
        continue;
      }
      const item = {
        appName,
        appBundleIdentifier,
        keyName
      };
      perItemHotkeyList.push(item);
    }
    root["per-item-hotkeys"] = new Uint8Array(Buffer3.from(JSON.stringify(perItemHotkeyList), "utf8"));
    fs3.writeFileSync(plistPath, bplist(plist2));
  }
  const plistHandler = buildHandler();
  const plist = readPlist();
  function itemHandler(itemId, keyName, appName) {
    const rawValue = plist[0]?.["per-item-hotkeys"];
    const value = JSON.parse(plistValueToString(rawValue));
    const item = value.find((item2) => item2.appBundleIdentifier === itemId);
    if (item === undefined) {
      return false;
    }
    const property = `KeyboardShortcuts_${item.keyName}`;
    return plistHandler(property);
  }
  function shortcutHandler(property) {
    return plistHandler(property);
  }
  function handler(...args) {
    if (args[0] === "shortcut") {
      const [type, property] = args;
      return shortcutHandler(property);
    } else {
      const [type, appBundleIdentifier, keyName, appName] = args;
      return itemHandler(appBundleIdentifier, keyName, appName);
    }
  }
  return handler;
};
export {
  buildBartenderHandler as default
};
