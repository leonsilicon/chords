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
import os from "node:os";
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

// src/exports/1password.ts
var import_utils_noop = __toESM(require_lib(), 1);

// src/utils/file.ts
import fs from "fs";
function exists(path) {
  try {
    fs.statSync(path);
    return true;
  } catch (err) {
    return false;
  }
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
    return [
      {
        chord,
        sequence,
        shortcut
      }
    ];
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

// node_modules/.pnpm/@humanwhocodes+momoa@3.3.10/node_modules/@humanwhocodes/momoa/dist/momoa.js
var CHAR_0 = 48;
var CHAR_1 = 49;
var CHAR_9 = 57;
var CHAR_BACKSLASH = 92;
var CHAR_DOLLAR = 36;
var CHAR_DOT = 46;
var CHAR_DOUBLE_QUOTE = 34;
var CHAR_LOWER_A = 97;
var CHAR_LOWER_E = 101;
var CHAR_LOWER_F = 102;
var CHAR_LOWER_N = 110;
var CHAR_LOWER_T = 116;
var CHAR_LOWER_U = 117;
var CHAR_LOWER_X = 120;
var CHAR_LOWER_Z = 122;
var CHAR_MINUS = 45;
var CHAR_NEWLINE = 10;
var CHAR_PLUS = 43;
var CHAR_RETURN = 13;
var CHAR_SINGLE_QUOTE = 39;
var CHAR_SLASH = 47;
var CHAR_SPACE = 32;
var CHAR_TAB = 9;
var CHAR_UNDERSCORE = 95;
var CHAR_UPPER_A = 65;
var CHAR_UPPER_E = 69;
var CHAR_UPPER_F = 70;
var CHAR_UPPER_N = 78;
var CHAR_UPPER_X = 88;
var CHAR_UPPER_Z = 90;
var CHAR_LOWER_B = 98;
var CHAR_LOWER_R = 114;
var CHAR_LOWER_V = 118;
var CHAR_LINE_SEPARATOR = 8232;
var CHAR_PARAGRAPH_SEPARATOR = 8233;
var CHAR_UPPER_I = 73;
var CHAR_STAR = 42;
var CHAR_VTAB = 11;
var CHAR_FORM_FEED = 12;
var CHAR_NBSP = 160;
var CHAR_BOM = 65279;
var CHAR_NON_BREAKING_SPACE = 160;
var CHAR_EN_QUAD = 8192;
var CHAR_EM_QUAD = 8193;
var CHAR_EN_SPACE = 8194;
var CHAR_EM_SPACE = 8195;
var CHAR_THREE_PER_EM_SPACE = 8196;
var CHAR_FOUR_PER_EM_SPACE = 8197;
var CHAR_SIX_PER_EM_SPACE = 8198;
var CHAR_FIGURE_SPACE = 8199;
var CHAR_PUNCTUATION_SPACE = 8200;
var CHAR_THIN_SPACE = 8201;
var CHAR_HAIR_SPACE = 8202;
var CHAR_NARROW_NO_BREAK_SPACE = 8239;
var CHAR_MEDIUM_MATHEMATICAL_SPACE = 8287;
var CHAR_IDEOGRAPHIC_SPACE = 12288;
var LBRACKET = "[";
var RBRACKET = "]";
var LBRACE = "{";
var RBRACE = "}";
var COLON = ":";
var COMMA = ",";
var TRUE = "true";
var FALSE = "false";
var NULL = "null";
var NAN$1 = "NaN";
var INFINITY$1 = "Infinity";
var QUOTE = '"';
var escapeToChar = new Map([
  [CHAR_DOUBLE_QUOTE, QUOTE],
  [CHAR_BACKSLASH, "\\"],
  [CHAR_SLASH, "/"],
  [CHAR_LOWER_B, "\b"],
  [CHAR_LOWER_N, `
`],
  [CHAR_LOWER_F, "\f"],
  [CHAR_LOWER_R, "\r"],
  [CHAR_LOWER_T, "\t"]
]);
var json5EscapeToChar = new Map([
  ...escapeToChar,
  [CHAR_LOWER_V, "\v"],
  [CHAR_0, "\x00"]
]);
var charToEscape = new Map([
  [QUOTE, QUOTE],
  ["\\", "\\"],
  ["/", "/"],
  ["\b", "b"],
  [`
`, "n"],
  ["\f", "f"],
  ["\r", "r"],
  ["\t", "t"]
]);
var json5CharToEscape = new Map([
  ...charToEscape,
  ["\v", "v"],
  ["\x00", "0"],
  ["\u2028", "u2028"],
  ["\u2029", "u2029"]
]);
var knownTokenTypes = new Map([
  [LBRACKET, "LBracket"],
  [RBRACKET, "RBracket"],
  [LBRACE, "LBrace"],
  [RBRACE, "RBrace"],
  [COLON, "Colon"],
  [COMMA, "Comma"],
  [TRUE, "Boolean"],
  [FALSE, "Boolean"],
  [NULL, "Null"]
]);
var knownJSON5TokenTypes = new Map([
  ...knownTokenTypes,
  [NAN$1, "Number"],
  [INFINITY$1, "Number"]
]);
var json5LineTerminators = new Set([
  CHAR_NEWLINE,
  CHAR_RETURN,
  CHAR_LINE_SEPARATOR,
  CHAR_PARAGRAPH_SEPARATOR
]);

class ErrorWithLocation extends Error {
  constructor(message, { line, column, offset }) {
    super(`${message} (${line}:${column})`);
    this.line = line;
    this.column = column;
    this.offset = offset;
  }
}

class UnexpectedChar extends ErrorWithLocation {
  constructor(unexpected, loc) {
    super(`Unexpected character '${String.fromCharCode(unexpected)}' found.`, loc);
  }
}

class UnexpectedIdentifier extends ErrorWithLocation {
  constructor(unexpected, loc) {
    super(`Unexpected identifier '${unexpected}' found.`, loc);
  }
}

class UnexpectedToken extends ErrorWithLocation {
  constructor(token) {
    super(`Unexpected token ${token.type} found.`, token.loc.start);
  }
}

class UnexpectedEOF extends ErrorWithLocation {
  constructor(loc) {
    super("Unexpected end of input found.", loc);
  }
}
var ID_Start = /[\xAA\xB5\xBA\xC0-\xD6\xD8-\xF6\xF8-\u02C1\u02C6-\u02D1\u02E0-\u02E4\u02EC\u02EE\u0370-\u0374\u0376\u0377\u037A-\u037D\u037F\u0386\u0388-\u038A\u038C\u038E-\u03A1\u03A3-\u03F5\u03F7-\u0481\u048A-\u052F\u0531-\u0556\u0559\u0561-\u0587\u05D0-\u05EA\u05F0-\u05F2\u0620-\u064A\u066E\u066F\u0671-\u06D3\u06D5\u06E5\u06E6\u06EE\u06EF\u06FA-\u06FC\u06FF\u0710\u0712-\u072F\u074D-\u07A5\u07B1\u07CA-\u07EA\u07F4\u07F5\u07FA\u0800-\u0815\u081A\u0824\u0828\u0840-\u0858\u0860-\u086A\u08A0-\u08B4\u08B6-\u08BD\u0904-\u0939\u093D\u0950\u0958-\u0961\u0971-\u0980\u0985-\u098C\u098F\u0990\u0993-\u09A8\u09AA-\u09B0\u09B2\u09B6-\u09B9\u09BD\u09CE\u09DC\u09DD\u09DF-\u09E1\u09F0\u09F1\u09FC\u0A05-\u0A0A\u0A0F\u0A10\u0A13-\u0A28\u0A2A-\u0A30\u0A32\u0A33\u0A35\u0A36\u0A38\u0A39\u0A59-\u0A5C\u0A5E\u0A72-\u0A74\u0A85-\u0A8D\u0A8F-\u0A91\u0A93-\u0AA8\u0AAA-\u0AB0\u0AB2\u0AB3\u0AB5-\u0AB9\u0ABD\u0AD0\u0AE0\u0AE1\u0AF9\u0B05-\u0B0C\u0B0F\u0B10\u0B13-\u0B28\u0B2A-\u0B30\u0B32\u0B33\u0B35-\u0B39\u0B3D\u0B5C\u0B5D\u0B5F-\u0B61\u0B71\u0B83\u0B85-\u0B8A\u0B8E-\u0B90\u0B92-\u0B95\u0B99\u0B9A\u0B9C\u0B9E\u0B9F\u0BA3\u0BA4\u0BA8-\u0BAA\u0BAE-\u0BB9\u0BD0\u0C05-\u0C0C\u0C0E-\u0C10\u0C12-\u0C28\u0C2A-\u0C39\u0C3D\u0C58-\u0C5A\u0C60\u0C61\u0C80\u0C85-\u0C8C\u0C8E-\u0C90\u0C92-\u0CA8\u0CAA-\u0CB3\u0CB5-\u0CB9\u0CBD\u0CDE\u0CE0\u0CE1\u0CF1\u0CF2\u0D05-\u0D0C\u0D0E-\u0D10\u0D12-\u0D3A\u0D3D\u0D4E\u0D54-\u0D56\u0D5F-\u0D61\u0D7A-\u0D7F\u0D85-\u0D96\u0D9A-\u0DB1\u0DB3-\u0DBB\u0DBD\u0DC0-\u0DC6\u0E01-\u0E30\u0E32\u0E33\u0E40-\u0E46\u0E81\u0E82\u0E84\u0E87\u0E88\u0E8A\u0E8D\u0E94-\u0E97\u0E99-\u0E9F\u0EA1-\u0EA3\u0EA5\u0EA7\u0EAA\u0EAB\u0EAD-\u0EB0\u0EB2\u0EB3\u0EBD\u0EC0-\u0EC4\u0EC6\u0EDC-\u0EDF\u0F00\u0F40-\u0F47\u0F49-\u0F6C\u0F88-\u0F8C\u1000-\u102A\u103F\u1050-\u1055\u105A-\u105D\u1061\u1065\u1066\u106E-\u1070\u1075-\u1081\u108E\u10A0-\u10C5\u10C7\u10CD\u10D0-\u10FA\u10FC-\u1248\u124A-\u124D\u1250-\u1256\u1258\u125A-\u125D\u1260-\u1288\u128A-\u128D\u1290-\u12B0\u12B2-\u12B5\u12B8-\u12BE\u12C0\u12C2-\u12C5\u12C8-\u12D6\u12D8-\u1310\u1312-\u1315\u1318-\u135A\u1380-\u138F\u13A0-\u13F5\u13F8-\u13FD\u1401-\u166C\u166F-\u167F\u1681-\u169A\u16A0-\u16EA\u16EE-\u16F8\u1700-\u170C\u170E-\u1711\u1720-\u1731\u1740-\u1751\u1760-\u176C\u176E-\u1770\u1780-\u17B3\u17D7\u17DC\u1820-\u1877\u1880-\u1884\u1887-\u18A8\u18AA\u18B0-\u18F5\u1900-\u191E\u1950-\u196D\u1970-\u1974\u1980-\u19AB\u19B0-\u19C9\u1A00-\u1A16\u1A20-\u1A54\u1AA7\u1B05-\u1B33\u1B45-\u1B4B\u1B83-\u1BA0\u1BAE\u1BAF\u1BBA-\u1BE5\u1C00-\u1C23\u1C4D-\u1C4F\u1C5A-\u1C7D\u1C80-\u1C88\u1CE9-\u1CEC\u1CEE-\u1CF1\u1CF5\u1CF6\u1D00-\u1DBF\u1E00-\u1F15\u1F18-\u1F1D\u1F20-\u1F45\u1F48-\u1F4D\u1F50-\u1F57\u1F59\u1F5B\u1F5D\u1F5F-\u1F7D\u1F80-\u1FB4\u1FB6-\u1FBC\u1FBE\u1FC2-\u1FC4\u1FC6-\u1FCC\u1FD0-\u1FD3\u1FD6-\u1FDB\u1FE0-\u1FEC\u1FF2-\u1FF4\u1FF6-\u1FFC\u2071\u207F\u2090-\u209C\u2102\u2107\u210A-\u2113\u2115\u2119-\u211D\u2124\u2126\u2128\u212A-\u212D\u212F-\u2139\u213C-\u213F\u2145-\u2149\u214E\u2160-\u2188\u2C00-\u2C2E\u2C30-\u2C5E\u2C60-\u2CE4\u2CEB-\u2CEE\u2CF2\u2CF3\u2D00-\u2D25\u2D27\u2D2D\u2D30-\u2D67\u2D6F\u2D80-\u2D96\u2DA0-\u2DA6\u2DA8-\u2DAE\u2DB0-\u2DB6\u2DB8-\u2DBE\u2DC0-\u2DC6\u2DC8-\u2DCE\u2DD0-\u2DD6\u2DD8-\u2DDE\u2E2F\u3005-\u3007\u3021-\u3029\u3031-\u3035\u3038-\u303C\u3041-\u3096\u309D-\u309F\u30A1-\u30FA\u30FC-\u30FF\u3105-\u312E\u3131-\u318E\u31A0-\u31BA\u31F0-\u31FF\u3400-\u4DB5\u4E00-\u9FEA\uA000-\uA48C\uA4D0-\uA4FD\uA500-\uA60C\uA610-\uA61F\uA62A\uA62B\uA640-\uA66E\uA67F-\uA69D\uA6A0-\uA6EF\uA717-\uA71F\uA722-\uA788\uA78B-\uA7AE\uA7B0-\uA7B7\uA7F7-\uA801\uA803-\uA805\uA807-\uA80A\uA80C-\uA822\uA840-\uA873\uA882-\uA8B3\uA8F2-\uA8F7\uA8FB\uA8FD\uA90A-\uA925\uA930-\uA946\uA960-\uA97C\uA984-\uA9B2\uA9CF\uA9E0-\uA9E4\uA9E6-\uA9EF\uA9FA-\uA9FE\uAA00-\uAA28\uAA40-\uAA42\uAA44-\uAA4B\uAA60-\uAA76\uAA7A\uAA7E-\uAAAF\uAAB1\uAAB5\uAAB6\uAAB9-\uAABD\uAAC0\uAAC2\uAADB-\uAADD\uAAE0-\uAAEA\uAAF2-\uAAF4\uAB01-\uAB06\uAB09-\uAB0E\uAB11-\uAB16\uAB20-\uAB26\uAB28-\uAB2E\uAB30-\uAB5A\uAB5C-\uAB65\uAB70-\uABE2\uAC00-\uD7A3\uD7B0-\uD7C6\uD7CB-\uD7FB\uF900-\uFA6D\uFA70-\uFAD9\uFB00-\uFB06\uFB13-\uFB17\uFB1D\uFB1F-\uFB28\uFB2A-\uFB36\uFB38-\uFB3C\uFB3E\uFB40\uFB41\uFB43\uFB44\uFB46-\uFBB1\uFBD3-\uFD3D\uFD50-\uFD8F\uFD92-\uFDC7\uFDF0-\uFDFB\uFE70-\uFE74\uFE76-\uFEFC\uFF21-\uFF3A\uFF41-\uFF5A\uFF66-\uFFBE\uFFC2-\uFFC7\uFFCA-\uFFCF\uFFD2-\uFFD7\uFFDA-\uFFDC]|\uD800[\uDC00-\uDC0B\uDC0D-\uDC26\uDC28-\uDC3A\uDC3C\uDC3D\uDC3F-\uDC4D\uDC50-\uDC5D\uDC80-\uDCFA\uDD40-\uDD74\uDE80-\uDE9C\uDEA0-\uDED0\uDF00-\uDF1F\uDF2D-\uDF4A\uDF50-\uDF75\uDF80-\uDF9D\uDFA0-\uDFC3\uDFC8-\uDFCF\uDFD1-\uDFD5]|\uD801[\uDC00-\uDC9D\uDCB0-\uDCD3\uDCD8-\uDCFB\uDD00-\uDD27\uDD30-\uDD63\uDE00-\uDF36\uDF40-\uDF55\uDF60-\uDF67]|\uD802[\uDC00-\uDC05\uDC08\uDC0A-\uDC35\uDC37\uDC38\uDC3C\uDC3F-\uDC55\uDC60-\uDC76\uDC80-\uDC9E\uDCE0-\uDCF2\uDCF4\uDCF5\uDD00-\uDD15\uDD20-\uDD39\uDD80-\uDDB7\uDDBE\uDDBF\uDE00\uDE10-\uDE13\uDE15-\uDE17\uDE19-\uDE33\uDE60-\uDE7C\uDE80-\uDE9C\uDEC0-\uDEC7\uDEC9-\uDEE4\uDF00-\uDF35\uDF40-\uDF55\uDF60-\uDF72\uDF80-\uDF91]|\uD803[\uDC00-\uDC48\uDC80-\uDCB2\uDCC0-\uDCF2]|\uD804[\uDC03-\uDC37\uDC83-\uDCAF\uDCD0-\uDCE8\uDD03-\uDD26\uDD50-\uDD72\uDD76\uDD83-\uDDB2\uDDC1-\uDDC4\uDDDA\uDDDC\uDE00-\uDE11\uDE13-\uDE2B\uDE80-\uDE86\uDE88\uDE8A-\uDE8D\uDE8F-\uDE9D\uDE9F-\uDEA8\uDEB0-\uDEDE\uDF05-\uDF0C\uDF0F\uDF10\uDF13-\uDF28\uDF2A-\uDF30\uDF32\uDF33\uDF35-\uDF39\uDF3D\uDF50\uDF5D-\uDF61]|\uD805[\uDC00-\uDC34\uDC47-\uDC4A\uDC80-\uDCAF\uDCC4\uDCC5\uDCC7\uDD80-\uDDAE\uDDD8-\uDDDB\uDE00-\uDE2F\uDE44\uDE80-\uDEAA\uDF00-\uDF19]|\uD806[\uDCA0-\uDCDF\uDCFF\uDE00\uDE0B-\uDE32\uDE3A\uDE50\uDE5C-\uDE83\uDE86-\uDE89\uDEC0-\uDEF8]|\uD807[\uDC00-\uDC08\uDC0A-\uDC2E\uDC40\uDC72-\uDC8F\uDD00-\uDD06\uDD08\uDD09\uDD0B-\uDD30\uDD46]|\uD808[\uDC00-\uDF99]|\uD809[\uDC00-\uDC6E\uDC80-\uDD43]|[\uD80C\uD81C-\uD820\uD840-\uD868\uD86A-\uD86C\uD86F-\uD872\uD874-\uD879][\uDC00-\uDFFF]|\uD80D[\uDC00-\uDC2E]|\uD811[\uDC00-\uDE46]|\uD81A[\uDC00-\uDE38\uDE40-\uDE5E\uDED0-\uDEED\uDF00-\uDF2F\uDF40-\uDF43\uDF63-\uDF77\uDF7D-\uDF8F]|\uD81B[\uDF00-\uDF44\uDF50\uDF93-\uDF9F\uDFE0\uDFE1]|\uD821[\uDC00-\uDFEC]|\uD822[\uDC00-\uDEF2]|\uD82C[\uDC00-\uDD1E\uDD70-\uDEFB]|\uD82F[\uDC00-\uDC6A\uDC70-\uDC7C\uDC80-\uDC88\uDC90-\uDC99]|\uD835[\uDC00-\uDC54\uDC56-\uDC9C\uDC9E\uDC9F\uDCA2\uDCA5\uDCA6\uDCA9-\uDCAC\uDCAE-\uDCB9\uDCBB\uDCBD-\uDCC3\uDCC5-\uDD05\uDD07-\uDD0A\uDD0D-\uDD14\uDD16-\uDD1C\uDD1E-\uDD39\uDD3B-\uDD3E\uDD40-\uDD44\uDD46\uDD4A-\uDD50\uDD52-\uDEA5\uDEA8-\uDEC0\uDEC2-\uDEDA\uDEDC-\uDEFA\uDEFC-\uDF14\uDF16-\uDF34\uDF36-\uDF4E\uDF50-\uDF6E\uDF70-\uDF88\uDF8A-\uDFA8\uDFAA-\uDFC2\uDFC4-\uDFCB]|\uD83A[\uDC00-\uDCC4\uDD00-\uDD43]|\uD83B[\uDE00-\uDE03\uDE05-\uDE1F\uDE21\uDE22\uDE24\uDE27\uDE29-\uDE32\uDE34-\uDE37\uDE39\uDE3B\uDE42\uDE47\uDE49\uDE4B\uDE4D-\uDE4F\uDE51\uDE52\uDE54\uDE57\uDE59\uDE5B\uDE5D\uDE5F\uDE61\uDE62\uDE64\uDE67-\uDE6A\uDE6C-\uDE72\uDE74-\uDE77\uDE79-\uDE7C\uDE7E\uDE80-\uDE89\uDE8B-\uDE9B\uDEA1-\uDEA3\uDEA5-\uDEA9\uDEAB-\uDEBB]|\uD869[\uDC00-\uDED6\uDF00-\uDFFF]|\uD86D[\uDC00-\uDF34\uDF40-\uDFFF]|\uD86E[\uDC00-\uDC1D\uDC20-\uDFFF]|\uD873[\uDC00-\uDEA1\uDEB0-\uDFFF]|\uD87A[\uDC00-\uDFE0]|\uD87E[\uDC00-\uDE1D]/;
var ID_Continue = /[\xAA\xB5\xBA\xC0-\xD6\xD8-\xF6\xF8-\u02C1\u02C6-\u02D1\u02E0-\u02E4\u02EC\u02EE\u0300-\u0374\u0376\u0377\u037A-\u037D\u037F\u0386\u0388-\u038A\u038C\u038E-\u03A1\u03A3-\u03F5\u03F7-\u0481\u0483-\u0487\u048A-\u052F\u0531-\u0556\u0559\u0561-\u0587\u0591-\u05BD\u05BF\u05C1\u05C2\u05C4\u05C5\u05C7\u05D0-\u05EA\u05F0-\u05F2\u0610-\u061A\u0620-\u0669\u066E-\u06D3\u06D5-\u06DC\u06DF-\u06E8\u06EA-\u06FC\u06FF\u0710-\u074A\u074D-\u07B1\u07C0-\u07F5\u07FA\u0800-\u082D\u0840-\u085B\u0860-\u086A\u08A0-\u08B4\u08B6-\u08BD\u08D4-\u08E1\u08E3-\u0963\u0966-\u096F\u0971-\u0983\u0985-\u098C\u098F\u0990\u0993-\u09A8\u09AA-\u09B0\u09B2\u09B6-\u09B9\u09BC-\u09C4\u09C7\u09C8\u09CB-\u09CE\u09D7\u09DC\u09DD\u09DF-\u09E3\u09E6-\u09F1\u09FC\u0A01-\u0A03\u0A05-\u0A0A\u0A0F\u0A10\u0A13-\u0A28\u0A2A-\u0A30\u0A32\u0A33\u0A35\u0A36\u0A38\u0A39\u0A3C\u0A3E-\u0A42\u0A47\u0A48\u0A4B-\u0A4D\u0A51\u0A59-\u0A5C\u0A5E\u0A66-\u0A75\u0A81-\u0A83\u0A85-\u0A8D\u0A8F-\u0A91\u0A93-\u0AA8\u0AAA-\u0AB0\u0AB2\u0AB3\u0AB5-\u0AB9\u0ABC-\u0AC5\u0AC7-\u0AC9\u0ACB-\u0ACD\u0AD0\u0AE0-\u0AE3\u0AE6-\u0AEF\u0AF9-\u0AFF\u0B01-\u0B03\u0B05-\u0B0C\u0B0F\u0B10\u0B13-\u0B28\u0B2A-\u0B30\u0B32\u0B33\u0B35-\u0B39\u0B3C-\u0B44\u0B47\u0B48\u0B4B-\u0B4D\u0B56\u0B57\u0B5C\u0B5D\u0B5F-\u0B63\u0B66-\u0B6F\u0B71\u0B82\u0B83\u0B85-\u0B8A\u0B8E-\u0B90\u0B92-\u0B95\u0B99\u0B9A\u0B9C\u0B9E\u0B9F\u0BA3\u0BA4\u0BA8-\u0BAA\u0BAE-\u0BB9\u0BBE-\u0BC2\u0BC6-\u0BC8\u0BCA-\u0BCD\u0BD0\u0BD7\u0BE6-\u0BEF\u0C00-\u0C03\u0C05-\u0C0C\u0C0E-\u0C10\u0C12-\u0C28\u0C2A-\u0C39\u0C3D-\u0C44\u0C46-\u0C48\u0C4A-\u0C4D\u0C55\u0C56\u0C58-\u0C5A\u0C60-\u0C63\u0C66-\u0C6F\u0C80-\u0C83\u0C85-\u0C8C\u0C8E-\u0C90\u0C92-\u0CA8\u0CAA-\u0CB3\u0CB5-\u0CB9\u0CBC-\u0CC4\u0CC6-\u0CC8\u0CCA-\u0CCD\u0CD5\u0CD6\u0CDE\u0CE0-\u0CE3\u0CE6-\u0CEF\u0CF1\u0CF2\u0D00-\u0D03\u0D05-\u0D0C\u0D0E-\u0D10\u0D12-\u0D44\u0D46-\u0D48\u0D4A-\u0D4E\u0D54-\u0D57\u0D5F-\u0D63\u0D66-\u0D6F\u0D7A-\u0D7F\u0D82\u0D83\u0D85-\u0D96\u0D9A-\u0DB1\u0DB3-\u0DBB\u0DBD\u0DC0-\u0DC6\u0DCA\u0DCF-\u0DD4\u0DD6\u0DD8-\u0DDF\u0DE6-\u0DEF\u0DF2\u0DF3\u0E01-\u0E3A\u0E40-\u0E4E\u0E50-\u0E59\u0E81\u0E82\u0E84\u0E87\u0E88\u0E8A\u0E8D\u0E94-\u0E97\u0E99-\u0E9F\u0EA1-\u0EA3\u0EA5\u0EA7\u0EAA\u0EAB\u0EAD-\u0EB9\u0EBB-\u0EBD\u0EC0-\u0EC4\u0EC6\u0EC8-\u0ECD\u0ED0-\u0ED9\u0EDC-\u0EDF\u0F00\u0F18\u0F19\u0F20-\u0F29\u0F35\u0F37\u0F39\u0F3E-\u0F47\u0F49-\u0F6C\u0F71-\u0F84\u0F86-\u0F97\u0F99-\u0FBC\u0FC6\u1000-\u1049\u1050-\u109D\u10A0-\u10C5\u10C7\u10CD\u10D0-\u10FA\u10FC-\u1248\u124A-\u124D\u1250-\u1256\u1258\u125A-\u125D\u1260-\u1288\u128A-\u128D\u1290-\u12B0\u12B2-\u12B5\u12B8-\u12BE\u12C0\u12C2-\u12C5\u12C8-\u12D6\u12D8-\u1310\u1312-\u1315\u1318-\u135A\u135D-\u135F\u1380-\u138F\u13A0-\u13F5\u13F8-\u13FD\u1401-\u166C\u166F-\u167F\u1681-\u169A\u16A0-\u16EA\u16EE-\u16F8\u1700-\u170C\u170E-\u1714\u1720-\u1734\u1740-\u1753\u1760-\u176C\u176E-\u1770\u1772\u1773\u1780-\u17D3\u17D7\u17DC\u17DD\u17E0-\u17E9\u180B-\u180D\u1810-\u1819\u1820-\u1877\u1880-\u18AA\u18B0-\u18F5\u1900-\u191E\u1920-\u192B\u1930-\u193B\u1946-\u196D\u1970-\u1974\u1980-\u19AB\u19B0-\u19C9\u19D0-\u19D9\u1A00-\u1A1B\u1A20-\u1A5E\u1A60-\u1A7C\u1A7F-\u1A89\u1A90-\u1A99\u1AA7\u1AB0-\u1ABD\u1B00-\u1B4B\u1B50-\u1B59\u1B6B-\u1B73\u1B80-\u1BF3\u1C00-\u1C37\u1C40-\u1C49\u1C4D-\u1C7D\u1C80-\u1C88\u1CD0-\u1CD2\u1CD4-\u1CF9\u1D00-\u1DF9\u1DFB-\u1F15\u1F18-\u1F1D\u1F20-\u1F45\u1F48-\u1F4D\u1F50-\u1F57\u1F59\u1F5B\u1F5D\u1F5F-\u1F7D\u1F80-\u1FB4\u1FB6-\u1FBC\u1FBE\u1FC2-\u1FC4\u1FC6-\u1FCC\u1FD0-\u1FD3\u1FD6-\u1FDB\u1FE0-\u1FEC\u1FF2-\u1FF4\u1FF6-\u1FFC\u203F\u2040\u2054\u2071\u207F\u2090-\u209C\u20D0-\u20DC\u20E1\u20E5-\u20F0\u2102\u2107\u210A-\u2113\u2115\u2119-\u211D\u2124\u2126\u2128\u212A-\u212D\u212F-\u2139\u213C-\u213F\u2145-\u2149\u214E\u2160-\u2188\u2C00-\u2C2E\u2C30-\u2C5E\u2C60-\u2CE4\u2CEB-\u2CF3\u2D00-\u2D25\u2D27\u2D2D\u2D30-\u2D67\u2D6F\u2D7F-\u2D96\u2DA0-\u2DA6\u2DA8-\u2DAE\u2DB0-\u2DB6\u2DB8-\u2DBE\u2DC0-\u2DC6\u2DC8-\u2DCE\u2DD0-\u2DD6\u2DD8-\u2DDE\u2DE0-\u2DFF\u2E2F\u3005-\u3007\u3021-\u302F\u3031-\u3035\u3038-\u303C\u3041-\u3096\u3099\u309A\u309D-\u309F\u30A1-\u30FA\u30FC-\u30FF\u3105-\u312E\u3131-\u318E\u31A0-\u31BA\u31F0-\u31FF\u3400-\u4DB5\u4E00-\u9FEA\uA000-\uA48C\uA4D0-\uA4FD\uA500-\uA60C\uA610-\uA62B\uA640-\uA66F\uA674-\uA67D\uA67F-\uA6F1\uA717-\uA71F\uA722-\uA788\uA78B-\uA7AE\uA7B0-\uA7B7\uA7F7-\uA827\uA840-\uA873\uA880-\uA8C5\uA8D0-\uA8D9\uA8E0-\uA8F7\uA8FB\uA8FD\uA900-\uA92D\uA930-\uA953\uA960-\uA97C\uA980-\uA9C0\uA9CF-\uA9D9\uA9E0-\uA9FE\uAA00-\uAA36\uAA40-\uAA4D\uAA50-\uAA59\uAA60-\uAA76\uAA7A-\uAAC2\uAADB-\uAADD\uAAE0-\uAAEF\uAAF2-\uAAF6\uAB01-\uAB06\uAB09-\uAB0E\uAB11-\uAB16\uAB20-\uAB26\uAB28-\uAB2E\uAB30-\uAB5A\uAB5C-\uAB65\uAB70-\uABEA\uABEC\uABED\uABF0-\uABF9\uAC00-\uD7A3\uD7B0-\uD7C6\uD7CB-\uD7FB\uF900-\uFA6D\uFA70-\uFAD9\uFB00-\uFB06\uFB13-\uFB17\uFB1D-\uFB28\uFB2A-\uFB36\uFB38-\uFB3C\uFB3E\uFB40\uFB41\uFB43\uFB44\uFB46-\uFBB1\uFBD3-\uFD3D\uFD50-\uFD8F\uFD92-\uFDC7\uFDF0-\uFDFB\uFE00-\uFE0F\uFE20-\uFE2F\uFE33\uFE34\uFE4D-\uFE4F\uFE70-\uFE74\uFE76-\uFEFC\uFF10-\uFF19\uFF21-\uFF3A\uFF3F\uFF41-\uFF5A\uFF66-\uFFBE\uFFC2-\uFFC7\uFFCA-\uFFCF\uFFD2-\uFFD7\uFFDA-\uFFDC]|\uD800[\uDC00-\uDC0B\uDC0D-\uDC26\uDC28-\uDC3A\uDC3C\uDC3D\uDC3F-\uDC4D\uDC50-\uDC5D\uDC80-\uDCFA\uDD40-\uDD74\uDDFD\uDE80-\uDE9C\uDEA0-\uDED0\uDEE0\uDF00-\uDF1F\uDF2D-\uDF4A\uDF50-\uDF7A\uDF80-\uDF9D\uDFA0-\uDFC3\uDFC8-\uDFCF\uDFD1-\uDFD5]|\uD801[\uDC00-\uDC9D\uDCA0-\uDCA9\uDCB0-\uDCD3\uDCD8-\uDCFB\uDD00-\uDD27\uDD30-\uDD63\uDE00-\uDF36\uDF40-\uDF55\uDF60-\uDF67]|\uD802[\uDC00-\uDC05\uDC08\uDC0A-\uDC35\uDC37\uDC38\uDC3C\uDC3F-\uDC55\uDC60-\uDC76\uDC80-\uDC9E\uDCE0-\uDCF2\uDCF4\uDCF5\uDD00-\uDD15\uDD20-\uDD39\uDD80-\uDDB7\uDDBE\uDDBF\uDE00-\uDE03\uDE05\uDE06\uDE0C-\uDE13\uDE15-\uDE17\uDE19-\uDE33\uDE38-\uDE3A\uDE3F\uDE60-\uDE7C\uDE80-\uDE9C\uDEC0-\uDEC7\uDEC9-\uDEE6\uDF00-\uDF35\uDF40-\uDF55\uDF60-\uDF72\uDF80-\uDF91]|\uD803[\uDC00-\uDC48\uDC80-\uDCB2\uDCC0-\uDCF2]|\uD804[\uDC00-\uDC46\uDC66-\uDC6F\uDC7F-\uDCBA\uDCD0-\uDCE8\uDCF0-\uDCF9\uDD00-\uDD34\uDD36-\uDD3F\uDD50-\uDD73\uDD76\uDD80-\uDDC4\uDDCA-\uDDCC\uDDD0-\uDDDA\uDDDC\uDE00-\uDE11\uDE13-\uDE37\uDE3E\uDE80-\uDE86\uDE88\uDE8A-\uDE8D\uDE8F-\uDE9D\uDE9F-\uDEA8\uDEB0-\uDEEA\uDEF0-\uDEF9\uDF00-\uDF03\uDF05-\uDF0C\uDF0F\uDF10\uDF13-\uDF28\uDF2A-\uDF30\uDF32\uDF33\uDF35-\uDF39\uDF3C-\uDF44\uDF47\uDF48\uDF4B-\uDF4D\uDF50\uDF57\uDF5D-\uDF63\uDF66-\uDF6C\uDF70-\uDF74]|\uD805[\uDC00-\uDC4A\uDC50-\uDC59\uDC80-\uDCC5\uDCC7\uDCD0-\uDCD9\uDD80-\uDDB5\uDDB8-\uDDC0\uDDD8-\uDDDD\uDE00-\uDE40\uDE44\uDE50-\uDE59\uDE80-\uDEB7\uDEC0-\uDEC9\uDF00-\uDF19\uDF1D-\uDF2B\uDF30-\uDF39]|\uD806[\uDCA0-\uDCE9\uDCFF\uDE00-\uDE3E\uDE47\uDE50-\uDE83\uDE86-\uDE99\uDEC0-\uDEF8]|\uD807[\uDC00-\uDC08\uDC0A-\uDC36\uDC38-\uDC40\uDC50-\uDC59\uDC72-\uDC8F\uDC92-\uDCA7\uDCA9-\uDCB6\uDD00-\uDD06\uDD08\uDD09\uDD0B-\uDD36\uDD3A\uDD3C\uDD3D\uDD3F-\uDD47\uDD50-\uDD59]|\uD808[\uDC00-\uDF99]|\uD809[\uDC00-\uDC6E\uDC80-\uDD43]|[\uD80C\uD81C-\uD820\uD840-\uD868\uD86A-\uD86C\uD86F-\uD872\uD874-\uD879][\uDC00-\uDFFF]|\uD80D[\uDC00-\uDC2E]|\uD811[\uDC00-\uDE46]|\uD81A[\uDC00-\uDE38\uDE40-\uDE5E\uDE60-\uDE69\uDED0-\uDEED\uDEF0-\uDEF4\uDF00-\uDF36\uDF40-\uDF43\uDF50-\uDF59\uDF63-\uDF77\uDF7D-\uDF8F]|\uD81B[\uDF00-\uDF44\uDF50-\uDF7E\uDF8F-\uDF9F\uDFE0\uDFE1]|\uD821[\uDC00-\uDFEC]|\uD822[\uDC00-\uDEF2]|\uD82C[\uDC00-\uDD1E\uDD70-\uDEFB]|\uD82F[\uDC00-\uDC6A\uDC70-\uDC7C\uDC80-\uDC88\uDC90-\uDC99\uDC9D\uDC9E]|\uD834[\uDD65-\uDD69\uDD6D-\uDD72\uDD7B-\uDD82\uDD85-\uDD8B\uDDAA-\uDDAD\uDE42-\uDE44]|\uD835[\uDC00-\uDC54\uDC56-\uDC9C\uDC9E\uDC9F\uDCA2\uDCA5\uDCA6\uDCA9-\uDCAC\uDCAE-\uDCB9\uDCBB\uDCBD-\uDCC3\uDCC5-\uDD05\uDD07-\uDD0A\uDD0D-\uDD14\uDD16-\uDD1C\uDD1E-\uDD39\uDD3B-\uDD3E\uDD40-\uDD44\uDD46\uDD4A-\uDD50\uDD52-\uDEA5\uDEA8-\uDEC0\uDEC2-\uDEDA\uDEDC-\uDEFA\uDEFC-\uDF14\uDF16-\uDF34\uDF36-\uDF4E\uDF50-\uDF6E\uDF70-\uDF88\uDF8A-\uDFA8\uDFAA-\uDFC2\uDFC4-\uDFCB\uDFCE-\uDFFF]|\uD836[\uDE00-\uDE36\uDE3B-\uDE6C\uDE75\uDE84\uDE9B-\uDE9F\uDEA1-\uDEAF]|\uD838[\uDC00-\uDC06\uDC08-\uDC18\uDC1B-\uDC21\uDC23\uDC24\uDC26-\uDC2A]|\uD83A[\uDC00-\uDCC4\uDCD0-\uDCD6\uDD00-\uDD4A\uDD50-\uDD59]|\uD83B[\uDE00-\uDE03\uDE05-\uDE1F\uDE21\uDE22\uDE24\uDE27\uDE29-\uDE32\uDE34-\uDE37\uDE39\uDE3B\uDE42\uDE47\uDE49\uDE4B\uDE4D-\uDE4F\uDE51\uDE52\uDE54\uDE57\uDE59\uDE5B\uDE5D\uDE5F\uDE61\uDE62\uDE64\uDE67-\uDE6A\uDE6C-\uDE72\uDE74-\uDE77\uDE79-\uDE7C\uDE7E\uDE80-\uDE89\uDE8B-\uDE9B\uDEA1-\uDEA3\uDEA5-\uDEA9\uDEAB-\uDEBB]|\uD869[\uDC00-\uDED6\uDF00-\uDFFF]|\uD86D[\uDC00-\uDF34\uDF40-\uDFFF]|\uD86E[\uDC00-\uDC1D\uDC20-\uDFFF]|\uD873[\uDC00-\uDEA1\uDEB0-\uDFFF]|\uD87A[\uDC00-\uDFE0]|\uD87E[\uDC00-\uDE1D]|\uDB40[\uDD00-\uDDEF]/;
var CHAR_CR = 13;
var CHAR_LF = 10;

class CharCodeReader {
  #text = "";
  #line = 1;
  #column = 0;
  #offset = -1;
  #newLine = false;
  #last = -1;
  #ended = false;
  constructor(text) {
    this.#text = text;
  }
  #end() {
    if (this.#ended) {
      return;
    }
    this.#column++;
    this.#offset++;
    this.#last = -1;
    this.#ended = true;
  }
  locate() {
    return {
      line: this.#line,
      column: this.#column,
      offset: this.#offset
    };
  }
  next() {
    if (this.#offset >= this.#text.length - 1) {
      this.#end();
      return -1;
    }
    this.#offset++;
    const charCode = this.#text.charCodeAt(this.#offset);
    if (this.#newLine) {
      this.#line++;
      this.#column = 1;
      this.#newLine = false;
    } else {
      this.#column++;
    }
    if (charCode === CHAR_CR) {
      this.#newLine = true;
      if (this.peek() === CHAR_LF) {
        this.#offset++;
      }
    } else if (charCode === CHAR_LF) {
      this.#newLine = true;
    }
    this.#last = charCode;
    return charCode;
  }
  peek() {
    if (this.#offset === this.#text.length - 1) {
      return -1;
    }
    return this.#text.charCodeAt(this.#offset + 1);
  }
  match(fn) {
    if (fn(this.peek())) {
      this.next();
      return true;
    }
    return false;
  }
  current() {
    return this.#last;
  }
}
var INFINITY = "Infinity";
var NAN = "NaN";
var keywordStarts = new Set([CHAR_LOWER_T, CHAR_LOWER_F, CHAR_LOWER_N]);
var whitespace = new Set([CHAR_SPACE, CHAR_TAB, CHAR_NEWLINE, CHAR_RETURN]);
var json5Whitespace = new Set([
  ...whitespace,
  CHAR_VTAB,
  CHAR_FORM_FEED,
  CHAR_NBSP,
  CHAR_LINE_SEPARATOR,
  CHAR_PARAGRAPH_SEPARATOR,
  CHAR_BOM,
  CHAR_NON_BREAKING_SPACE,
  CHAR_EN_QUAD,
  CHAR_EM_QUAD,
  CHAR_EN_SPACE,
  CHAR_EM_SPACE,
  CHAR_THREE_PER_EM_SPACE,
  CHAR_FOUR_PER_EM_SPACE,
  CHAR_SIX_PER_EM_SPACE,
  CHAR_FIGURE_SPACE,
  CHAR_PUNCTUATION_SPACE,
  CHAR_THIN_SPACE,
  CHAR_HAIR_SPACE,
  CHAR_NARROW_NO_BREAK_SPACE,
  CHAR_MEDIUM_MATHEMATICAL_SPACE,
  CHAR_IDEOGRAPHIC_SPACE
]);
var DEFAULT_OPTIONS$1 = {
  mode: "json",
  ranges: false
};
var jsonKeywords = new Set(["true", "false", "null"]);
var tt = {
  EOF: 0,
  Number: 1,
  String: 2,
  Boolean: 3,
  Null: 4,
  NaN: 5,
  Infinity: 6,
  Identifier: 7,
  Colon: 20,
  LBrace: 21,
  RBrace: 22,
  LBracket: 23,
  RBracket: 24,
  Comma: 25,
  LineComment: 40,
  BlockComment: 41
};
function isDigit(c) {
  return c >= CHAR_0 && c <= CHAR_9;
}
function isHexDigit(c) {
  return isDigit(c) || c >= CHAR_UPPER_A && c <= CHAR_UPPER_F || c >= CHAR_LOWER_A && c <= CHAR_LOWER_F;
}
function isPositiveDigit(c) {
  return c >= CHAR_1 && c <= CHAR_9;
}
function isKeywordStart(c) {
  return keywordStarts.has(c);
}
function isNumberStart(c) {
  return isDigit(c) || c === CHAR_DOT || c === CHAR_MINUS;
}
function isJSON5NumberStart(c) {
  return isNumberStart(c) || c === CHAR_PLUS;
}
function isStringStart(c, json5) {
  return c === CHAR_DOUBLE_QUOTE || json5 && c === CHAR_SINGLE_QUOTE;
}
function isJSON5IdentifierStart(c) {
  if (c === CHAR_DOLLAR || c === CHAR_UNDERSCORE || c === CHAR_BACKSLASH) {
    return true;
  }
  if (c >= CHAR_LOWER_A && c <= CHAR_LOWER_Z || c >= CHAR_UPPER_A && c <= CHAR_UPPER_Z) {
    return true;
  }
  if (c === 8204 || c === 8205) {
    return true;
  }
  const ct = String.fromCharCode(c);
  return ID_Start.test(ct);
}
function isJSON5IdentifierPart(c) {
  if (isJSON5IdentifierStart(c) || isDigit(c)) {
    return true;
  }
  const ct = String.fromCharCode(c);
  return ID_Continue.test(ct);
}

class Tokenizer {
  #options;
  #text;
  #reader;
  #json5;
  #allowComments;
  #ranges;
  #token;
  #isEscapedCharacter;
  #isJSON5LineTerminator;
  #isJSON5HexEscape;
  #isWhitespace;
  constructor(text, options) {
    this.#text = text;
    this.#options = {
      ...DEFAULT_OPTIONS$1,
      ...options
    };
    this.#reader = new CharCodeReader(text);
    this.#json5 = this.#options.mode === "json5";
    this.#allowComments = this.#options.mode !== "json";
    this.#ranges = this.#options.ranges;
    this.#isEscapedCharacter = this.#json5 ? json5EscapeToChar.has.bind(json5EscapeToChar) : escapeToChar.has.bind(escapeToChar);
    this.#isJSON5LineTerminator = this.#json5 ? json5LineTerminators.has.bind(json5LineTerminators) : () => false;
    this.#isJSON5HexEscape = this.#json5 ? (c) => c === CHAR_LOWER_X : () => false;
    this.#isWhitespace = this.#json5 ? json5Whitespace.has.bind(json5Whitespace) : whitespace.has.bind(whitespace);
  }
  #unexpected(c, loc = this.#reader.locate()) {
    throw new UnexpectedChar(c, loc);
  }
  #unexpectedIdentifier(identifier, loc = this.#reader.locate()) {
    throw new UnexpectedIdentifier(identifier, loc);
  }
  #unexpectedEOF() {
    throw new UnexpectedEOF(this.#reader.locate());
  }
  #createToken(tokenType, length, startLoc, endLoc) {
    const endOffset = startLoc.offset + length;
    let range = this.#options.ranges ? {
      range: [startLoc.offset, endOffset]
    } : undefined;
    return {
      type: tokenType,
      loc: {
        start: startLoc,
        end: endLoc || {
          line: startLoc.line,
          column: startLoc.column + length,
          offset: endOffset
        }
      },
      ...range
    };
  }
  #readHexDigits(count) {
    let value = "";
    let c;
    for (let i = 0;i < count; i++) {
      c = this.#reader.peek();
      if (isHexDigit(c)) {
        this.#reader.next();
        value += String.fromCharCode(c);
        continue;
      }
      this.#unexpected(c);
    }
    return value;
  }
  #readIdentifier(c) {
    let value = "";
    do {
      value += String.fromCharCode(c);
      if (c === CHAR_BACKSLASH) {
        c = this.#reader.next();
        if (c !== CHAR_LOWER_U) {
          this.#unexpected(c);
        }
        value += String.fromCharCode(c);
        const hexDigits = this.#readHexDigits(4);
        const charCode = parseInt(hexDigits, 16);
        if (value.length === 2 && !isJSON5IdentifierStart(charCode)) {
          const loc = this.#reader.locate();
          this.#unexpected(CHAR_BACKSLASH, { line: loc.line, column: loc.column - 5, offset: loc.offset - 5 });
        } else if (!isJSON5IdentifierPart(charCode)) {
          const loc = this.#reader.locate();
          this.#unexpected(charCode, { line: loc.line, column: loc.column - 5, offset: loc.offset - 5 });
        }
        value += hexDigits;
      }
      c = this.#reader.peek();
      if (!isJSON5IdentifierPart(c)) {
        break;
      }
      this.#reader.next();
    } while (true);
    return value;
  }
  #readString(c) {
    const delimiter = c;
    let length = 1;
    c = this.#reader.peek();
    while (c !== -1 && c !== delimiter) {
      this.#reader.next();
      length++;
      if (c === CHAR_BACKSLASH) {
        c = this.#reader.peek();
        if (this.#isEscapedCharacter(c) || this.#isJSON5LineTerminator(c)) {
          this.#reader.next();
          length++;
        } else if (c === CHAR_LOWER_U) {
          this.#reader.next();
          length++;
          const result = this.#readHexDigits(4);
          length += result.length;
        } else if (this.#isJSON5HexEscape(c)) {
          this.#reader.next();
          length++;
          const result = this.#readHexDigits(2);
          length += result.length;
        } else if (this.#json5) {
          this.#reader.next();
          length++;
        } else {
          this.#unexpected(c);
        }
      }
      c = this.#reader.peek();
    }
    if (c === -1) {
      this.#reader.next();
      this.#unexpectedEOF();
    }
    this.#reader.next();
    length++;
    return length;
  }
  #readNumber(c) {
    let length = 1;
    if (c === CHAR_MINUS || this.#json5 && c === CHAR_PLUS) {
      c = this.#reader.peek();
      if (this.#json5) {
        if (c === CHAR_UPPER_I || c === CHAR_UPPER_N) {
          this.#reader.next();
          const identifier = this.#readIdentifier(c);
          if (identifier !== INFINITY && identifier !== NAN) {
            this.#unexpected(c);
          }
          return length + identifier.length;
        }
      }
      if (!isDigit(c)) {
        this.#unexpected(c);
      }
      this.#reader.next();
      length++;
    }
    if (c === CHAR_0) {
      c = this.#reader.peek();
      if (this.#json5 && (c === CHAR_LOWER_X || c === CHAR_UPPER_X)) {
        this.#reader.next();
        length++;
        c = this.#reader.peek();
        if (!isHexDigit(c)) {
          this.#reader.next();
          this.#unexpected(c);
        }
        do {
          this.#reader.next();
          length++;
          c = this.#reader.peek();
        } while (isHexDigit(c));
      } else if (isDigit(c)) {
        this.#unexpected(c);
      }
    } else {
      if (!this.#json5 || c !== CHAR_DOT) {
        if (!isPositiveDigit(c)) {
          this.#unexpected(c);
        }
        c = this.#reader.peek();
        while (isDigit(c)) {
          this.#reader.next();
          length++;
          c = this.#reader.peek();
        }
      }
    }
    if (c === CHAR_DOT) {
      let digitCount = -1;
      this.#reader.next();
      length++;
      digitCount++;
      c = this.#reader.peek();
      while (isDigit(c)) {
        this.#reader.next();
        length++;
        digitCount++;
        c = this.#reader.peek();
      }
      if (!this.#json5 && digitCount === 0) {
        this.#reader.next();
        if (c) {
          this.#unexpected(c);
        } else {
          this.#unexpectedEOF();
        }
      }
    }
    if (c === CHAR_LOWER_E || c === CHAR_UPPER_E) {
      this.#reader.next();
      length++;
      c = this.#reader.peek();
      if (c === CHAR_PLUS || c === CHAR_MINUS) {
        this.#reader.next();
        length++;
        c = this.#reader.peek();
      }
      if (c === -1) {
        this.#reader.next();
        this.#unexpectedEOF();
      }
      if (!isDigit(c)) {
        this.#reader.next();
        this.#unexpected(c);
      }
      while (isDigit(c)) {
        this.#reader.next();
        length++;
        c = this.#reader.peek();
      }
    }
    return length;
  }
  #readComment(c) {
    let length = 1;
    c = this.#reader.peek();
    if (c === CHAR_SLASH) {
      do {
        this.#reader.next();
        length += 1;
        c = this.#reader.peek();
      } while (c > -1 && c !== CHAR_RETURN && c !== CHAR_NEWLINE);
      return { length, multiline: false };
    }
    if (c === CHAR_STAR) {
      this.#reader.next();
      length += 1;
      while (c > -1) {
        c = this.#reader.peek();
        if (c === CHAR_STAR) {
          this.#reader.next();
          length += 1;
          c = this.#reader.peek();
          if (c === CHAR_SLASH) {
            this.#reader.next();
            length += 1;
            return { length, multiline: true };
          }
        } else {
          this.#reader.next();
          length += 1;
        }
      }
      this.#reader.next();
      this.#unexpectedEOF();
    }
    this.#reader.next();
    this.#unexpected(c);
  }
  next() {
    let c = this.#reader.next();
    while (this.#isWhitespace(c)) {
      c = this.#reader.next();
    }
    if (c === -1) {
      return tt.EOF;
    }
    const start = this.#reader.locate();
    const ct = String.fromCharCode(c);
    if (this.#json5) {
      if (knownJSON5TokenTypes.has(ct)) {
        this.#token = this.#createToken(knownJSON5TokenTypes.get(ct), 1, start);
      } else if (isJSON5IdentifierStart(c)) {
        const value = this.#readIdentifier(c);
        if (knownJSON5TokenTypes.has(value)) {
          this.#token = this.#createToken(knownJSON5TokenTypes.get(value), value.length, start);
        } else {
          this.#token = this.#createToken("Identifier", value.length, start);
        }
      } else if (isJSON5NumberStart(c)) {
        const result = this.#readNumber(c);
        this.#token = this.#createToken("Number", result, start);
      } else if (isStringStart(c, this.#json5)) {
        const result = this.#readString(c);
        const lastCharLoc = this.#reader.locate();
        this.#token = this.#createToken("String", result, start, {
          line: lastCharLoc.line,
          column: lastCharLoc.column + 1,
          offset: lastCharLoc.offset + 1
        });
      } else if (c === CHAR_SLASH && this.#allowComments) {
        const result = this.#readComment(c);
        const lastCharLoc = this.#reader.locate();
        this.#token = this.#createToken(!result.multiline ? "LineComment" : "BlockComment", result.length, start, {
          line: lastCharLoc.line,
          column: lastCharLoc.column + 1,
          offset: lastCharLoc.offset + 1
        });
      } else {
        this.#unexpected(c);
      }
    } else {
      if (knownTokenTypes.has(ct)) {
        this.#token = this.#createToken(knownTokenTypes.get(ct), 1, start);
      } else if (isKeywordStart(c)) {
        const value = this.#readIdentifier(c);
        if (!jsonKeywords.has(value)) {
          this.#unexpectedIdentifier(value, start);
        }
        this.#token = this.#createToken(knownTokenTypes.get(value), value.length, start);
      } else if (isNumberStart(c)) {
        const result = this.#readNumber(c);
        this.#token = this.#createToken("Number", result, start);
      } else if (isStringStart(c, this.#json5)) {
        const result = this.#readString(c);
        this.#token = this.#createToken("String", result, start);
      } else if (c === CHAR_SLASH && this.#allowComments) {
        const result = this.#readComment(c);
        const lastCharLoc = this.#reader.locate();
        this.#token = this.#createToken(!result.multiline ? "LineComment" : "BlockComment", result.length, start, {
          line: lastCharLoc.line,
          column: lastCharLoc.column + 1,
          offset: lastCharLoc.offset + 1
        });
      } else {
        this.#unexpected(c);
      }
    }
    return tt[this.#token.type];
  }
  get token() {
    return this.#token;
  }
}
var types = {
  document(body, parts = {}) {
    return {
      type: "Document",
      body,
      loc: parts.loc,
      ...parts
    };
  },
  string(value, parts = {}) {
    return {
      type: "String",
      value,
      loc: parts.loc,
      ...parts
    };
  },
  number(value, parts = {}) {
    return {
      type: "Number",
      value,
      loc: parts.loc,
      ...parts
    };
  },
  boolean(value, parts = {}) {
    return {
      type: "Boolean",
      value,
      loc: parts.loc,
      ...parts
    };
  },
  null(parts = {}) {
    return {
      type: "Null",
      loc: parts.loc,
      ...parts
    };
  },
  array(elements, parts = {}) {
    return {
      type: "Array",
      elements,
      loc: parts.loc,
      ...parts
    };
  },
  element(value, parts = {}) {
    return {
      type: "Element",
      value,
      loc: parts.loc,
      ...parts
    };
  },
  object(members, parts = {}) {
    return {
      type: "Object",
      members,
      loc: parts.loc,
      ...parts
    };
  },
  member(name, value, parts = {}) {
    return {
      type: "Member",
      name,
      value,
      loc: parts.loc,
      ...parts
    };
  },
  identifier(name, parts = {}) {
    return {
      type: "Identifier",
      name,
      loc: parts.loc,
      ...parts
    };
  },
  nan(sign = "", parts = {}) {
    return {
      type: "NaN",
      sign,
      loc: parts.loc,
      ...parts
    };
  },
  infinity(sign = "", parts = {}) {
    return {
      type: "Infinity",
      sign,
      loc: parts.loc,
      ...parts
    };
  }
};
var DEFAULT_OPTIONS = {
  mode: "json",
  ranges: false,
  tokens: false,
  allowTrailingCommas: false
};
var UNICODE_SEQUENCE = /\\u[\da-fA-F]{4}/gu;
function normalizeIdentifier(identifier) {
  return identifier.replace(UNICODE_SEQUENCE, (unicodeEscape) => {
    return String.fromCharCode(parseInt(unicodeEscape.slice(2), 16));
  });
}
function getEndLocation(text) {
  let line = 1;
  let column = 1;
  for (let i = 0;i < text.length; i++) {
    const char = text[i];
    if (char === `
`) {
      line++;
      column = 1;
    } else if (char === "\r") {
      if (text[i + 1] === `
`) {
        i++;
      }
      line++;
      column = 1;
    } else {
      column++;
    }
  }
  return {
    line,
    column,
    offset: text.length
  };
}
function getStringValue(value, token, json5 = false) {
  let result = "";
  let escapeIndex = value.indexOf("\\");
  let lastIndex = 0;
  while (escapeIndex >= 0) {
    result += value.slice(lastIndex, escapeIndex);
    const escapeChar = value.charAt(escapeIndex + 1);
    const escapeCharCode = escapeChar.charCodeAt(0);
    if (json5 && json5EscapeToChar.has(escapeCharCode)) {
      result += json5EscapeToChar.get(escapeCharCode);
      lastIndex = escapeIndex + 2;
    } else if (escapeToChar.has(escapeCharCode)) {
      result += escapeToChar.get(escapeCharCode);
      lastIndex = escapeIndex + 2;
    } else if (escapeChar === "u") {
      const hexCode = value.slice(escapeIndex + 2, escapeIndex + 6);
      if (hexCode.length < 4 || /[^0-9a-f]/i.test(hexCode)) {
        throw new ErrorWithLocation(`Invalid unicode escape \\u${hexCode}.`, {
          line: token.loc.start.line,
          column: token.loc.start.column + escapeIndex,
          offset: token.loc.start.offset + escapeIndex
        });
      }
      result += String.fromCharCode(parseInt(hexCode, 16));
      lastIndex = escapeIndex + 6;
    } else if (json5 && escapeChar === "x") {
      const hexCode = value.slice(escapeIndex + 2, escapeIndex + 4);
      if (hexCode.length < 2 || /[^0-9a-f]/i.test(hexCode)) {
        throw new ErrorWithLocation(`Invalid hex escape \\x${hexCode}.`, {
          line: token.loc.start.line,
          column: token.loc.start.column + escapeIndex,
          offset: token.loc.start.offset + escapeIndex
        });
      }
      result += String.fromCharCode(parseInt(hexCode, 16));
      lastIndex = escapeIndex + 4;
    } else if (json5 && json5LineTerminators.has(escapeCharCode)) {
      lastIndex = escapeIndex + 2;
      if (escapeChar === "\r" && value.charAt(lastIndex) === `
`) {
        lastIndex++;
      }
    } else {
      if (json5) {
        result += escapeChar;
        lastIndex = escapeIndex + 2;
      } else {
        throw new ErrorWithLocation(`Invalid escape \\${escapeChar}.`, {
          line: token.loc.start.line,
          column: token.loc.start.column + escapeIndex,
          offset: token.loc.start.offset + escapeIndex
        });
      }
    }
    escapeIndex = value.indexOf("\\", lastIndex);
  }
  result += value.slice(lastIndex);
  return result;
}
function getLiteralValue(value, token, json5 = false) {
  switch (token.type) {
    case "Boolean":
      return value === "true";
    case "Number":
      if (json5) {
        if (value.charCodeAt(0) === 45) {
          return -Number(value.slice(1));
        }
        if (value.charCodeAt(0) === 43) {
          return Number(value.slice(1));
        }
      }
      return Number(value);
    case "String":
      return getStringValue(value.slice(1, -1), token, json5);
    default:
      throw new TypeError(`Unknown token type "${token.type}.`);
  }
}
function parse(text, options) {
  options = Object.freeze({
    ...DEFAULT_OPTIONS,
    ...options
  });
  const tokens = [];
  const tokenizer = new Tokenizer(text, {
    mode: options.mode,
    ranges: options.ranges
  });
  const json5 = options.mode === "json5";
  const allowTrailingCommas = options.allowTrailingCommas || json5;
  function nextNoComments() {
    const nextType = tokenizer.next();
    if (nextType && options.tokens) {
      tokens.push(tokenizer.token);
    }
    return nextType;
  }
  function nextSkipComments() {
    const nextType = tokenizer.next();
    if (nextType && options.tokens) {
      tokens.push(tokenizer.token);
    }
    if (nextType >= tt.LineComment) {
      return nextSkipComments();
    }
    return nextType;
  }
  const next = options.mode === "json" ? nextNoComments : nextSkipComments;
  function assertTokenType(token, type) {
    if (token !== type) {
      throw new UnexpectedToken(tokenizer.token);
    }
  }
  function assertTokenTypes(token, types2) {
    if (!types2.includes(token)) {
      throw new UnexpectedToken(tokenizer.token);
    }
  }
  function createRange(start, end) {
    return options.ranges ? {
      range: [start.offset, end.offset]
    } : undefined;
  }
  function createLiteralNode(tokenType) {
    const token = tokenizer.token;
    const range = createRange(token.loc.start, token.loc.end);
    const value = getLiteralValue(text.slice(token.loc.start.offset, token.loc.end.offset), token, json5);
    const loc = {
      start: {
        ...token.loc.start
      },
      end: {
        ...token.loc.end
      }
    };
    const parts = { loc, ...range };
    switch (tokenType) {
      case tt.String:
        return types.string(value, parts);
      case tt.Number:
        return types.number(value, parts);
      case tt.Boolean:
        return types.boolean(value, parts);
      default:
        throw new TypeError(`Unknown token type ${token.type}.`);
    }
  }
  function createJSON5IdentifierNode(token) {
    const range = createRange(token.loc.start, token.loc.end);
    const identifier = text.slice(token.loc.start.offset, token.loc.end.offset);
    const loc = {
      start: {
        ...token.loc.start
      },
      end: {
        ...token.loc.end
      }
    };
    const parts = { loc, ...range };
    if (token.type !== "Identifier") {
      let sign = "";
      if (identifier[0] === "+" || identifier[0] === "-") {
        sign = identifier[0];
      }
      return types[identifier.includes("NaN") ? "nan" : "infinity"](sign, parts);
    }
    return types.identifier(normalizeIdentifier(identifier), parts);
  }
  function createNullNode(token) {
    const range = createRange(token.loc.start, token.loc.end);
    return types.null({
      loc: {
        start: {
          ...token.loc.start
        },
        end: {
          ...token.loc.end
        }
      },
      ...range
    });
  }
  function parseProperty(tokenType) {
    if (json5) {
      assertTokenTypes(tokenType, [tt.String, tt.Identifier, tt.Number]);
    } else {
      assertTokenType(tokenType, tt.String);
    }
    const token = tokenizer.token;
    if (json5 && tokenType === tt.Number && /[+\-0-9]/.test(text[token.loc.start.offset])) {
      throw new UnexpectedToken(token);
    }
    let key = tokenType === tt.String ? createLiteralNode(tokenType) : createJSON5IdentifierNode(token);
    if (json5 && (key.type === "NaN" || key.type === "Infinity")) {
      if (key.sign !== "") {
        throw new UnexpectedToken(tokenizer.token);
      }
      key = types.identifier(key.type, { loc: key.loc, ...createRange(key.loc.start, key.loc.end) });
    }
    tokenType = next();
    assertTokenType(tokenType, tt.Colon);
    const value = parseValue();
    const range = createRange(key.loc.start, value.loc.end);
    return types.member(key, value, {
      loc: {
        start: {
          ...key.loc.start
        },
        end: {
          ...value.loc.end
        }
      },
      ...range
    });
  }
  function parseObject(firstTokenType) {
    assertTokenType(firstTokenType, tt.LBrace);
    const firstToken = tokenizer.token;
    const members = [];
    let tokenType = next();
    if (tokenType !== tt.RBrace) {
      do {
        members.push(parseProperty(tokenType));
        tokenType = next();
        if (!tokenType) {
          throw new UnexpectedEOF(members[members.length - 1].loc.end);
        }
        if (tokenType === tt.Comma) {
          tokenType = next();
          if (allowTrailingCommas && tokenType === tt.RBrace) {
            break;
          }
        } else {
          break;
        }
      } while (tokenType);
    }
    assertTokenType(tokenType, tt.RBrace);
    const lastToken = tokenizer.token;
    const range = createRange(firstToken.loc.start, lastToken.loc.end);
    return types.object(members, {
      loc: {
        start: {
          ...firstToken.loc.start
        },
        end: {
          ...lastToken.loc.end
        }
      },
      ...range
    });
  }
  function parseArray(firstTokenType) {
    assertTokenType(firstTokenType, tt.LBracket);
    const firstToken = tokenizer.token;
    const elements = [];
    let tokenType = next();
    if (tokenType !== tt.RBracket) {
      do {
        const value = parseValue(tokenType);
        elements.push(types.element(value, { loc: value.loc }));
        tokenType = next();
        if (tokenType === tt.Comma) {
          tokenType = next();
          if (allowTrailingCommas && tokenType === tt.RBracket) {
            break;
          }
        } else {
          break;
        }
      } while (tokenType);
    }
    assertTokenType(tokenType, tt.RBracket);
    const lastToken = tokenizer.token;
    const range = createRange(firstToken.loc.start, lastToken.loc.end);
    return types.array(elements, {
      loc: {
        start: {
          ...firstToken.loc.start
        },
        end: {
          ...lastToken.loc.end
        }
      },
      ...range
    });
  }
  function parseValue(tokenType) {
    tokenType = tokenType ?? next();
    const token = tokenizer.token;
    switch (tokenType) {
      case tt.String:
      case tt.Boolean:
        return createLiteralNode(tokenType);
      case tt.Number:
        if (json5) {
          let tokenText = text.slice(token.loc.start.offset, token.loc.end.offset);
          if (tokenText[0] === "+" || tokenText[0] === "-") {
            tokenText = tokenText.slice(1);
          }
          if (tokenText === "NaN" || tokenText === "Infinity") {
            return createJSON5IdentifierNode(token);
          }
        }
        return createLiteralNode(tokenType);
      case tt.Null:
        return createNullNode(token);
      case tt.LBrace:
        return parseObject(tokenType);
      case tt.LBracket:
        return parseArray(tokenType);
      default:
        throw new UnexpectedToken(token);
    }
  }
  const docBody = parseValue();
  const unexpectedToken = next();
  if (unexpectedToken) {
    throw new UnexpectedToken(tokenizer.token);
  }
  const textEndLocation = getEndLocation(text);
  const docParts = {
    loc: {
      start: {
        line: 1,
        column: 1,
        offset: 0
      },
      end: {
        ...textEndLocation
      }
    }
  };
  if (options.tokens) {
    docParts.tokens = tokens;
  }
  if (options.ranges) {
    docParts.range = [
      docParts.loc.start.offset,
      docParts.loc.end.offset
    ];
  }
  return types.document(docBody, docParts);
}
var childKeys = new Map([
  ["Document", ["body"]],
  ["Object", ["members"]],
  ["Member", ["name", "value"]],
  ["Element", ["value"]],
  ["Array", ["elements"]],
  ["String", []],
  ["Number", []],
  ["Boolean", []],
  ["Null", []],
  ["NaN", []],
  ["Infinity", []],
  ["Identifier", []]
]);

// node_modules/.pnpm/doctor-json@1.0.0/node_modules/doctor-json/dist/index.mjs
var createDocument = (text) => {
  let _text = text;
  let _ast = null;
  return {
    get text() {
      return _text;
    },
    set text(value) {
      _text = value;
      _ast = null;
    },
    get ast() {
      if (!_ast) {
        _ast = parse(_text, {
          mode: "jsonc",
          ranges: true,
          tokens: true,
          allowTrailingCommas: true
        });
      }
      return _ast;
    }
  };
};
var findTokenIndex = (tokens, offset) => {
  let low = 0;
  let high = tokens.length - 1;
  while (low <= high) {
    const mid = low + high >>> 1;
    if (tokens[mid].loc.start.offset < offset) {
      low = mid + 1;
    } else {
      high = mid - 1;
    }
  }
  return low;
};
var isCommentToken = (token) => token.type === "LineComment" || token.type === "BlockComment";
var blankLinePattern = /\n[\t\r ]*\n/;
var getMemberKeyStart = (member) => member.type === "Member" ? member.name.loc.start.offset : member.value.loc.start.offset;
var computeSemanticStart = (member, tokens, text) => {
  const keyStart = getMemberKeyStart(member);
  let semanticStart = keyStart;
  let nextBoundary = keyStart;
  let tokenIndex = findTokenIndex(tokens, keyStart) - 1;
  let stoppedAtBlankLine = false;
  while (tokenIndex >= 0) {
    const token = tokens[tokenIndex];
    if (!isCommentToken(token)) {
      break;
    }
    const textBetween = text.slice(token.loc.end.offset, nextBoundary);
    if (blankLinePattern.test(textBetween)) {
      stoppedAtBlankLine = true;
      break;
    }
    semanticStart = token.loc.start.offset;
    nextBoundary = token.loc.start.offset;
    tokenIndex -= 1;
    if (tokenIndex >= 0) {
      const previousToken = tokens[tokenIndex];
      if (previousToken.type === "Comma" || previousToken.type === "LBrace" || previousToken.type === "LBracket") {
        break;
      }
    }
  }
  return {
    semanticStart,
    stoppedAtBlankLine
  };
};
var computeTrailingEnd = (member, tokens) => {
  const valueEndOffset = member.value.loc.end.offset;
  const valueEndLine = member.value.loc.end.line;
  let semanticEnd = valueEndOffset;
  let commaOffset = null;
  let afterIndex = findTokenIndex(tokens, valueEndOffset);
  while (afterIndex < tokens.length) {
    const token = tokens[afterIndex];
    if (token.type === "Comma") {
      commaOffset = token.loc.start.offset;
      afterIndex += 1;
      continue;
    }
    if (isCommentToken(token) && token.loc.start.line === valueEndLine) {
      semanticEnd = token.loc.end.offset;
      afterIndex += 1;
      continue;
    }
    break;
  }
  return {
    semanticEnd,
    commaOffset
  };
};
var getMemberRanges = (container, text, tokens) => {
  const members = container.type === "Object" ? container.members : container.elements;
  if (members.length === 0) {
    return [];
  }
  const ranges = [];
  const openBraceOffset = container.loc.start.offset;
  for (let memberIndex = 0;memberIndex < members.length; memberIndex += 1) {
    const member = members[memberIndex];
    const { semanticStart, stoppedAtBlankLine } = computeSemanticStart(member, tokens, text);
    const { semanticEnd, commaOffset } = computeTrailingEnd(member, tokens);
    let start;
    if (memberIndex === 0) {
      if (stoppedAtBlankLine) {
        start = semanticStart;
      } else {
        start = openBraceOffset + 1;
      }
    } else {
      const previousRange = ranges[memberIndex - 1];
      const afterComma = previousRange.commaOffset === null ? 0 : previousRange.commaOffset + 1;
      start = Math.max(afterComma, previousRange.end);
    }
    ranges.push({
      member,
      start,
      end: semanticEnd,
      commaOffset
    });
  }
  return ranges;
};
var getMemberName = (member) => member.name.type === "String" ? member.name.value : member.name.name;
var findNodeAtPath = (ast, segments) => {
  let current = ast.body;
  let parentContainer;
  for (const segment of segments) {
    if (typeof segment === "number") {
      if (current.type !== "Array") {
        return;
      }
      const element = current.elements[segment];
      if (!element) {
        return;
      }
      parentContainer = element;
      current = element.value;
    } else {
      if (current.type !== "Object") {
        return;
      }
      const member = current.members.findLast((m) => getMemberName(m) === segment);
      if (!member) {
        return;
      }
      parentContainer = member;
      current = member.value;
    }
  }
  return {
    node: current,
    parent: parentContainer
  };
};
var findObjectAtPath = (ast, segments) => {
  if (segments.length === 0) {
    return ast.body.type === "Object" ? ast.body : undefined;
  }
  const result = findNodeAtPath(ast, segments);
  if (!result || result.node.type !== "Object") {
    return;
  }
  return result.node;
};
var evaluate = (node) => {
  switch (node.type) {
    case "Object": {
      const object = {};
      for (const member of node.members) {
        const key = member.name.type === "String" ? member.name.value : member.name.name;
        const value = evaluate(member.value);
        if (key === "__proto__") {
          Object.defineProperty(object, key, {
            value,
            writable: true,
            enumerable: true,
            configurable: true
          });
        } else {
          object[key] = value;
        }
      }
      return object;
    }
    case "Array": {
      return node.elements.map((element) => evaluate(element.value));
    }
    case "String":
    case "Number":
    case "Boolean": {
      return node.value;
    }
    case "Null": {
      return null;
    }
    default: {
      return;
    }
  }
};
var documentSort = (document, pathOrComparator, comparatorOrOptions, options) => {
  let segments;
  let cmp;
  let useGroups = true;
  if (typeof pathOrComparator === "function") {
    segments = [];
    cmp = pathOrComparator;
    if (typeof comparatorOrOptions === "object" && comparatorOrOptions !== null) {
      useGroups = comparatorOrOptions.groups !== false;
    }
  } else {
    segments = pathOrComparator ?? [];
    if (typeof comparatorOrOptions === "function") {
      cmp = comparatorOrOptions;
      if (options) {
        useGroups = options.groups !== false;
      }
    } else if (typeof comparatorOrOptions === "object" && comparatorOrOptions !== null) {
      useGroups = comparatorOrOptions.groups !== false;
    }
  }
  const { ast } = document;
  let targetNode;
  if (segments.length === 0) {
    if (ast.body.type !== "Object" && ast.body.type !== "Array") {
      return;
    }
    targetNode = ast.body;
  } else {
    const result = findNodeAtPath(ast, segments);
    if (!result || result.node.type !== "Object" && result.node.type !== "Array") {
      return;
    }
    targetNode = result.node;
  }
  const tokens = ast.tokens;
  const ranges = getMemberRanges(targetNode, document.text, tokens);
  if (ranges.length <= 1) {
    return;
  }
  const members = targetNode.type === "Object" ? targetNode.members : targetNode.elements;
  const entries = ranges.map((_range, i) => {
    const member = members[i];
    if (targetNode.type === "Object") {
      const m = member;
      const key = getMemberName(m);
      const value2 = evaluate(m.value);
      return {
        index: i,
        entry: {
          key,
          value: value2
        }
      };
    }
    const element = member;
    const value = evaluate(element.value);
    return {
      index: i,
      entry: {
        key: i,
        value
      }
    };
  });
  const compare = cmp ?? (() => {
    if (typeof entries[0].entry.key === "number") {
      const allStrings = entries.every((entry) => typeof entry.entry.value === "string");
      if (allStrings) {
        return (a, b) => {
          const av = a.value;
          const bv = b.value;
          return av < bv ? -1 : av > bv ? 1 : 0;
        };
      }
      const allNumbers = entries.every((entry) => typeof entry.entry.value === "number");
      if (allNumbers) {
        return (a, b) => a.value - b.value;
      }
      return () => 0;
    }
    return (a, b) => {
      const ak = String(a.key);
      const bk = String(b.key);
      return ak < bk ? -1 : ak > bk ? 1 : 0;
    };
  })();
  const groups = [];
  if (useGroups) {
    let groupStart = 0;
    for (let i = 0;i < ranges.length - 1; i += 1) {
      const { commaOffset } = ranges[i];
      const afterComma = commaOffset === null ? 0 : commaOffset + 1;
      const gapStart = Math.max(afterComma, ranges[i].end);
      const gapEnd = getMemberKeyStart(ranges[i + 1].member);
      const gap = document.text.slice(gapStart, gapEnd);
      if (/\n\s*\n/.test(gap)) {
        groups.push({
          startIdx: groupStart,
          endIdx: i + 1
        });
        groupStart = i + 1;
      }
    }
    groups.push({
      startIdx: groupStart,
      endIdx: ranges.length
    });
  } else {
    groups.push({
      startIdx: 0,
      endIdx: ranges.length
    });
  }
  const sorted = [];
  for (const group of groups) {
    const groupEntries = entries.slice(group.startIdx, group.endIdx);
    groupEntries.sort((a, b) => compare(a.entry, b.entry));
    sorted.push(...groupEntries);
  }
  const isAlreadySorted = sorted.every((s, i) => s.index === i);
  if (isAlreadySorted) {
    return;
  }
  const groupFirstIndices = new Set(groups.filter((_, gi) => gi > 0).map((g) => g.startIdx));
  const semanticStarts = ranges.map((range, i) => {
    if (groupFirstIndices.has(i)) {
      return getMemberKeyStart(range.member);
    }
    let contentStart = range.start;
    while (contentStart < range.end && `
\r	 `.includes(document.text[contentStart])) {
      contentStart += 1;
    }
    return contentStart;
  });
  const memberContents = ranges.map((range, i) => {
    const contentStart = semanticStarts[i];
    const valueEnd = range.member.value.loc.end.offset;
    const core = document.text.slice(contentStart, valueEnd);
    const afterValue = document.text.slice(valueEnd, range.end);
    const comma = range.commaOffset;
    let trailing;
    if (comma !== null && comma >= valueEnd && comma < range.end) {
      const commaRelative = comma - valueEnd;
      trailing = afterValue.slice(0, commaRelative) + afterValue.slice(commaRelative + 1);
    } else {
      trailing = afterValue;
    }
    return {
      core,
      trailing
    };
  });
  const slotHasInternalComma = ranges.map((r) => {
    if (r.commaOffset === null) {
      return false;
    }
    const valueEnd = r.member.value.loc.end.offset;
    return r.commaOffset >= valueEnd && r.commaOffset < r.end;
  });
  const paddings = ranges.map((range, i) => document.text.slice(range.start, semanticStarts[i]));
  const delimiters = [];
  for (let i = 0;i < ranges.length - 1; i += 1) {
    delimiters.push(document.text.slice(ranges[i].end, ranges[i + 1].start));
  }
  const openOffset = targetNode.loc.start.offset;
  const prefix = document.text.slice(openOffset + 1, ranges[0].start);
  const closeOffset = targetNode.loc.end.offset;
  const suffix = document.text.slice(ranges.at(-1).end, closeOffset);
  const chunks = [prefix];
  for (let i = 0;i < sorted.length; i += 1) {
    const content = memberContents[sorted[i].index];
    chunks.push(paddings[i], content.core, slotHasInternalComma[i] ? "," : "", content.trailing);
    if (i < delimiters.length) {
      chunks.push(delimiters[i]);
    }
  }
  chunks.push(suffix);
  const reconstructed = chunks.join("");
  document.text = document.text.slice(0, openOffset + 1) + reconstructed + document.text.slice(closeOffset);
};
var documentRename = (document, path, newKey) => {
  if (path.length === 0) {
    return;
  }
  const { ast } = document;
  const existing = findNodeAtPath(ast, path);
  if (!existing?.parent || existing.parent.type !== "Member") {
    return;
  }
  const parentPath = path.slice(0, -1);
  const parentObject = parentPath.length === 0 ? ast.body.type === "Object" ? ast.body : undefined : findObjectAtPath(ast, parentPath);
  if (parentObject) {
    const keyExists = parentObject.members.some((m) => getMemberName(m) === newKey);
    if (keyExists) {
      return;
    }
  }
  const nameNode = existing.parent.name;
  const start = nameNode.loc.start.offset;
  const end = nameNode.loc.end.offset;
  document.text = document.text.slice(0, start) + JSON.stringify(newKey) + document.text.slice(end);
};
var serializeValue = (value, baseIndent, indentUnit, colonSeparator = indentUnit ? ": " : ":", eol = `
`) => {
  const json = JSON.stringify(value) ?? "null";
  if (!indentUnit && colonSeparator === ":") {
    return json;
  }
  if (indentUnit && colonSeparator === ": ") {
    let result = JSON.stringify(JSON.parse(json), null, indentUnit);
    if (baseIndent) {
      result = result.replaceAll(`
`, `
${baseIndent}`);
    }
    if (eol !== `
`) {
      result = result.replaceAll(`
`, eol);
    }
    return result;
  }
  const clean = JSON.parse(json);
  return formatInlineSpaced(clean);
};
var formatInlineSpaced = (value) => {
  if (typeof value !== "object" || value === null) {
    return JSON.stringify(value);
  }
  if (Array.isArray(value)) {
    if (value.length === 0) {
      return "[]";
    }
    return `[${value.map(formatInlineSpaced).join(", ")}]`;
  }
  const entries = Object.entries(value);
  if (entries.length === 0) {
    return "{}";
  }
  return `{${entries.map(([k, v]) => `${JSON.stringify(k)}: ${formatInlineSpaced(v)}`).join(", ")}}`;
};
var detectIndent = (text) => {
  const match = /\n([ \t]+)/.exec(text);
  if (!match) {
    return "";
  }
  const whitespace2 = match[1];
  if (whitespace2[0] === "\t") {
    return "\t";
  }
  return whitespace2;
};
var detectLocalIndent = (node, text, fallbackIndent) => {
  const members = node.type === "Object" ? node.members : node.elements;
  if (members.length > 0) {
    const firstMember = members[0];
    const nlBefore = text.lastIndexOf(`
`, firstMember.loc.start.offset - 1);
    if (nlBefore === -1) {
      return null;
    }
    const memberIndent = text.slice(nlBefore + 1, firstMember.loc.start.offset);
    const closingOffset2 = node.loc.end.offset - 1;
    const nlBeforeClose2 = text.lastIndexOf(`
`, closingOffset2 - 1);
    const braceIndent2 = nlBeforeClose2 === -1 ? "" : text.slice(nlBeforeClose2 + 1, closingOffset2);
    const indentUnit = memberIndent.slice(braceIndent2.length) || fallbackIndent;
    return {
      memberIndent,
      indentUnit
    };
  }
  const closingOffset = node.loc.end.offset - 1;
  const nlBeforeClose = text.lastIndexOf(`
`, closingOffset - 1);
  if (nlBeforeClose === -1 || !fallbackIndent) {
    return null;
  }
  const braceIndent = text.slice(nlBeforeClose + 1, closingOffset);
  return {
    memberIndent: braceIndent + fallbackIndent,
    indentUnit: fallbackIndent
  };
};
var detectEol = (text) => text.includes(`\r
`) ? `\r
` : `
`;
var getColonSeparator = (object, text, fallbackIndent) => {
  if (object.members.length === 0) {
    return fallbackIndent ? ": " : ":";
  }
  const member = object.members[0];
  const between = text.slice(member.name.loc.end.offset, member.value.loc.start.offset);
  let i = 0;
  while (i < between.length) {
    if (between[i] === "/" && between[i + 1] === "*") {
      const end = between.indexOf("*/", i + 2);
      i = end === -1 ? between.length : end + 2;
    } else if (between[i] === "/" && between[i + 1] === "/") {
      const end = between.indexOf(`
`, i + 2);
      i = end === -1 ? between.length : end + 1;
    } else if (between[i] === ":") {
      return between[i + 1] === " " ? ": " : ":";
    } else {
      i += 1;
    }
  }
  return ": ";
};
var isNodeInline = (node, text) => {
  const nodeText = text.slice(node.loc.start.offset, node.loc.end.offset);
  return !nodeText.includes(`
`);
};
var shouldSerializeValueInline = (container, value, text) => {
  if (typeof value !== "object" || value === null) {
    return false;
  }
  const isArray = Array.isArray(value);
  const children = container.type === "Object" ? container.members : container.elements;
  for (const child of children) {
    if (!child) {
      continue;
    }
    const childValue = child.value;
    const matchesType = isArray ? childValue.type === "Array" : childValue.type === "Object";
    if (matchesType) {
      return isNodeInline(childValue, text);
    }
  }
  return false;
};
var validateJsonValues = (values) => {
  for (const value of values) {
    serializeValue(value, "", "", ": ");
  }
};
var insertIntoEmptyContainer = (document, closingOffset, newContent, eol) => {
  const nlBeforeClose = document.text.lastIndexOf(`
`, closingOffset - 1);
  const baseIndent = nlBeforeClose === -1 ? "" : document.text.slice(nlBeforeClose + 1, closingOffset);
  const insertAt = nlBeforeClose === -1 ? closingOffset : nlBeforeClose + 1;
  document.text = document.text.slice(0, insertAt) + newContent + eol + baseIndent + document.text.slice(closingOffset);
};
var appendAfterLast = (document, container, tokens, content, gap) => {
  const ranges = getMemberRanges(container, document.text, tokens);
  const lastRange = ranges.at(-1);
  const valueEnd = lastRange.member.value.loc.end.offset;
  if (lastRange.commaOffset === null) {
    const afterValue = document.text.slice(valueEnd, lastRange.end);
    const tail = document.text.slice(lastRange.end);
    document.text = `${document.text.slice(0, valueEnd)},${afterValue}${gap}${content}${tail}`;
  } else {
    const insertAt = Math.max(lastRange.commaOffset + 1, lastRange.end);
    const before = document.text.slice(0, insertAt);
    const after = document.text.slice(insertAt);
    document.text = `${before}${gap}${content},${after}`;
  }
};
var detectColonSeparator = (document, ast, segments, globalIndent) => {
  const parentPath = segments.slice(0, -1);
  const parentObject = parentPath.length === 0 ? ast.body.type === "Object" ? ast.body : undefined : findObjectAtPath(ast, parentPath);
  return parentObject ? getColonSeparator(parentObject, document.text, globalIndent) : globalIndent ? ": " : ":";
};
var detectArraySeparator = (document, arrayNode, colonSeparator) => {
  let separator = colonSeparator === ": " ? ", " : ",";
  if (arrayNode.elements.length >= 2) {
    const firstEnd = arrayNode.elements[0].value.loc.end.offset;
    const secondStart = arrayNode.elements[1].value.loc.start.offset;
    const gap = document.text.slice(firstEnd, secondStart);
    separator = gap.includes(" ") ? ", " : ",";
  }
  return separator;
};
var insertMember = (document, object, key, value, globalIndent) => {
  const objectIsInline = isNodeInline(object, document.text);
  const colonSeparator = getColonSeparator(object, document.text, globalIndent);
  const hasMembers = object.members.length > 0;
  if (objectIsInline) {
    const serializedValue2 = serializeValue(value, "", "", colonSeparator);
    const newMember2 = `${JSON.stringify(key)}${colonSeparator}${serializedValue2}`;
    if (hasMembers) {
      let memberSeparator = colonSeparator === ": " ? " " : "";
      if (object.members.length >= 2) {
        const firstEnd = object.members[0].loc.end.offset;
        const secondStart = object.members[1].loc.start.offset;
        const between = document.text.slice(firstEnd, secondStart);
        const commaIndex = between.indexOf(",");
        if (commaIndex !== -1) {
          memberSeparator = between[commaIndex + 1] === " " ? " " : "";
        }
      }
      appendAfterLast(document, object, document.ast.tokens, newMember2, memberSeparator);
    } else {
      const closingBrace = object.loc.end.offset - 1;
      document.text = document.text.slice(0, closingBrace) + newMember2 + document.text.slice(closingBrace);
    }
    return;
  }
  const eol = detectEol(document.text);
  const local = detectLocalIndent(object, document.text, globalIndent);
  const memberIndent = local?.memberIndent ?? globalIndent;
  const indentUnit = local?.indentUnit ?? globalIndent;
  const valueInline = shouldSerializeValueInline(object, value, document.text);
  const serializedValue = valueInline ? serializeValue(value, "", "", colonSeparator, eol) : serializeValue(value, memberIndent, indentUnit, colonSeparator, eol);
  const newMember = `${memberIndent}${JSON.stringify(key)}${colonSeparator}${serializedValue}`;
  if (hasMembers) {
    appendAfterLast(document, object, document.ast.tokens, newMember, eol);
  } else {
    insertIntoEmptyContainer(document, object.loc.end.offset - 1, newMember, eol);
  }
};
var insertAtPath = (document, segments, value, globalIndent, ast) => {
  let deepestExistingDepth = 0;
  for (let i = segments.length - 1;i >= 0; i -= 1) {
    const parentPath2 = segments.slice(0, i);
    const parentNode = parentPath2.length === 0 ? ast.body.type === "Object" ? ast.body : undefined : findObjectAtPath(ast, parentPath2);
    if (parentNode) {
      deepestExistingDepth = i;
      break;
    }
  }
  let builtValue = value;
  for (let i = segments.length - 1;i > deepestExistingDepth; i -= 1) {
    const segment = segments[i];
    if (typeof segment === "string") {
      builtValue = { [segment]: builtValue };
    } else {
      return;
    }
  }
  const key = segments[deepestExistingDepth];
  if (typeof key !== "string") {
    return;
  }
  const parentPath = segments.slice(0, deepestExistingDepth);
  const parentObject = parentPath.length === 0 ? ast.body.type === "Object" ? ast.body : undefined : findObjectAtPath(ast, parentPath);
  if (!parentObject) {
    return;
  }
  const keyExists = parentObject.members.some((m) => getMemberName(m) === key);
  if (keyExists) {
    return;
  }
  insertMember(document, parentObject, key, builtValue, globalIndent);
};
var documentSet = (document, path, value) => {
  if (path.length === 0) {
    return;
  }
  const { ast } = document;
  const globalIndent = detectIndent(document.text);
  const eol = detectEol(document.text);
  const existing = findNodeAtPath(ast, path);
  if (existing?.parent && (existing.parent.type === "Member" || existing.parent.type === "Element")) {
    const valueNode = existing.node;
    const start = valueNode.loc.start.offset;
    const end = valueNode.loc.end.offset;
    const colonSeparator = detectColonSeparator(document, ast, path, globalIndent);
    const oldIsInline = isNodeInline(valueNode, document.text);
    if (oldIsInline) {
      const serialized = serializeValue(value, "", "", colonSeparator, eol);
      document.text = document.text.slice(0, start) + serialized + document.text.slice(end);
    } else {
      const isContainer = valueNode.type === "Object" || valueNode.type === "Array";
      const local = isContainer ? detectLocalIndent(valueNode, document.text, globalIndent) : null;
      const baseIndent = local ? local.memberIndent.slice(0, local.memberIndent.length - local.indentUnit.length) : "";
      const indentUnit = local?.indentUnit ?? globalIndent;
      const serialized = serializeValue(value, baseIndent, indentUnit, colonSeparator, eol);
      document.text = document.text.slice(0, start) + serialized + document.text.slice(end);
    }
    return;
  }
  insertAtPath(document, path, value, globalIndent, ast);
};
var removeByRanges = (document, ranges, index, container) => {
  const range = ranges[index];
  const isOnly = ranges.length === 1;
  const isLast = index === ranges.length - 1;
  if (isOnly) {
    const hasContainerHeader = range.start > container.loc.start.offset + 1;
    if (hasContainerHeader) {
      let headerEnd = range.start;
      while (headerEnd > container.loc.start.offset + 1 && " \t".includes(document.text[headerEnd - 1])) {
        headerEnd -= 1;
      }
      const afterComma = range.commaOffset === null ? 0 : range.commaOffset + 1;
      const removeEnd = Math.max(afterComma, range.end);
      document.text = document.text.slice(0, headerEnd) + document.text.slice(removeEnd, container.loc.end.offset - 1) + document.text.slice(container.loc.end.offset - 1);
    } else {
      document.text = document.text.slice(0, container.loc.start.offset + 1) + document.text.slice(container.loc.end.offset - 1);
    }
    return;
  }
  if (isLast) {
    const previousRange = ranges[index - 1];
    const removeStart = previousRange.commaOffset ?? range.start;
    const afterComma = range.commaOffset === null ? 0 : range.commaOffset + 1;
    const removeEnd = Math.max(afterComma, range.end);
    document.text = document.text.slice(0, removeStart) + document.text.slice(removeEnd);
  } else {
    const nextRange = ranges[index + 1];
    let resumeOffset = nextRange.start;
    if (index === 0 && !document.text.slice(container.loc.start.offset, container.loc.end.offset).includes(`
`)) {
      while (resumeOffset < container.loc.end.offset && document.text[resumeOffset] === " ") {
        resumeOffset += 1;
      }
    }
    document.text = document.text.slice(0, range.start) + document.text.slice(resumeOffset);
  }
};
var removeMember = (document, object, memberIndex, tokens) => {
  const ranges = getMemberRanges(object, document.text, tokens);
  removeByRanges(document, ranges, memberIndex, object);
};
var removeArrayElement = (document, array, index, tokens) => {
  if (!array.elements[index]) {
    return;
  }
  const ranges = getMemberRanges(array, document.text, tokens);
  removeByRanges(document, ranges, index, array);
};
var documentRemove = (document, path) => {
  if (path.length === 0) {
    return;
  }
  const { ast } = document;
  const parentPath = path.slice(0, -1);
  const key = path.at(-1);
  if (typeof key === "number") {
    const parentResult = parentPath.length === 0 ? { node: ast.body } : findNodeAtPath(ast, parentPath);
    if (!parentResult || parentResult.node.type !== "Array") {
      return;
    }
    removeArrayElement(document, parentResult.node, key, ast.tokens);
    return;
  }
  const parentObject = parentPath.length === 0 ? ast.body.type === "Object" ? ast.body : undefined : findObjectAtPath(ast, parentPath);
  if (!parentObject) {
    return;
  }
  const memberIndex = parentObject.members.findLastIndex((m) => getMemberName(m) === key);
  if (memberIndex === -1) {
    return;
  }
  removeMember(document, parentObject, memberIndex, ast.tokens);
};
var documentPush = (document, path, ...values) => {
  if (values.length === 0) {
    return;
  }
  {
    const { ast: ast2 } = document;
    if (path.length === 0) {
      if (ast2.body.type !== "Array") {
        return;
      }
    } else {
      const result = findNodeAtPath(ast2, path);
      if (result) {
        if (result.node.type !== "Array") {
          return;
        }
      } else {
        if (path.length >= 2) {
          const parentPath = path.slice(0, -1);
          const parentResult = findNodeAtPath(ast2, parentPath);
          if (!parentResult || parentResult.node.type !== "Object") {
            return;
          }
        }
        validateJsonValues(values);
        documentSet(document, path, values);
        return;
      }
    }
  }
  validateJsonValues(values);
  const { ast } = document;
  const globalIndent = detectIndent(document.text);
  let arrayNode;
  if (path.length === 0) {
    arrayNode = ast.body;
  } else {
    arrayNode = findNodeAtPath(ast, path).node;
  }
  const inline = isNodeInline(arrayNode, document.text);
  const hasElements = arrayNode.elements.length > 0;
  const colonSeparator = detectColonSeparator(document, ast, path, globalIndent);
  if (inline) {
    const separator = detectArraySeparator(document, arrayNode, colonSeparator);
    const batchContent = values.map((v) => serializeValue(v, "", "", colonSeparator)).join(separator);
    if (hasElements) {
      const gap = separator === ", " ? " " : "";
      appendAfterLast(document, arrayNode, ast.tokens, batchContent, gap);
    } else {
      const closingBracket = arrayNode.loc.end.offset - 1;
      document.text = document.text.slice(0, closingBracket) + batchContent + document.text.slice(closingBracket);
    }
  } else {
    const eol = detectEol(document.text);
    const local = detectLocalIndent(arrayNode, document.text, globalIndent);
    const memberIndent = local?.memberIndent ?? globalIndent;
    const indentUnit = local?.indentUnit ?? globalIndent;
    const batchContent = values.map((value) => {
      const valueInline = shouldSerializeValueInline(arrayNode, value, document.text);
      return valueInline ? serializeValue(value, "", "", colonSeparator, eol) : serializeValue(value, memberIndent, indentUnit, colonSeparator, eol);
    }).join(`,${eol}${memberIndent}`);
    const newElementBlock = `${memberIndent}${batchContent}`;
    if (hasElements) {
      appendAfterLast(document, arrayNode, ast.tokens, newElementBlock, eol);
    } else {
      insertIntoEmptyContainer(document, arrayNode.loc.end.offset - 1, newElementBlock, eol);
    }
  }
};
var originalIndex = /* @__PURE__ */ new WeakMap;
var isPlainObject = (v) => {
  if (typeof v !== "object" || v === null || Array.isArray(v)) {
    return false;
  }
  const proto = Object.getPrototypeOf(v);
  return proto === Object.prototype || proto === null;
};
var detectPermutation = (original, current) => {
  const consumed = /* @__PURE__ */ new Set;
  const permutation = [];
  const originalStrings = original.map((element) => JSON.stringify(element));
  const currentStrings = current.map((element) => JSON.stringify(element));
  for (let ci = 0;ci < current.length; ci += 1) {
    const element = current[ci];
    let foundIndex = -1;
    if (typeof element === "object" && element !== null) {
      const origIndex = originalIndex.get(element);
      if (origIndex !== undefined && !consumed.has(origIndex) && origIndex < original.length) {
        foundIndex = origIndex;
      }
    }
    if (foundIndex === -1) {
      for (let i = 0;i < original.length; i += 1) {
        if (!consumed.has(i) && originalStrings[i] === currentStrings[ci]) {
          foundIndex = i;
          break;
        }
      }
    }
    if (foundIndex === -1) {
      return;
    }
    consumed.add(foundIndex);
    permutation.push(foundIndex);
  }
  if (permutation.every((value, index) => value === index)) {
    return;
  }
  for (let i = 0;i < permutation.length; i += 1) {
    if (currentStrings[i] !== originalStrings[permutation[i]]) {
      return;
    }
  }
  return permutation;
};
var reconcile = (document, original, current, path) => {
  if (JSON.stringify(original) === JSON.stringify(current)) {
    return;
  }
  if (isPlainObject(original) && isPlainObject(current)) {
    const omittedKeys = new Set(Object.keys(current).filter((k) => JSON.stringify(current[k]) === undefined));
    for (const key of Object.keys(original).reverse()) {
      if (!(key in current) || omittedKeys.has(key)) {
        documentRemove(document, [...path, key]);
      }
    }
    for (const key of Object.keys(original)) {
      if (key in current && !omittedKeys.has(key)) {
        reconcile(document, original[key], current[key], [...path, key]);
      }
    }
    for (const key of Object.keys(current)) {
      if (!(key in original) && !omittedKeys.has(key)) {
        documentSet(document, [...path, key], current[key]);
      }
    }
    const desiredOrder = Object.keys(current).filter((k) => !omittedKeys.has(k));
    const documentOrder = [
      ...Object.keys(original).filter((k) => (k in current) && !omittedKeys.has(k)),
      ...Object.keys(current).filter((k) => !(k in original) && !omittedKeys.has(k))
    ];
    if (desiredOrder.length > 1 && desiredOrder.some((k, i) => k !== documentOrder[i])) {
      const positionMap = new Map(desiredOrder.map((k, i) => [k, i]));
      documentSort(document, path, (a, b) => (positionMap.get(a.key) ?? 0) - (positionMap.get(b.key) ?? 0), { groups: false });
    }
    return;
  }
  if (Array.isArray(original) && Array.isArray(current)) {
    if (original.length === current.length && original.length > 1) {
      const permutation = detectPermutation(original, current);
      if (permutation) {
        const targetMap = /* @__PURE__ */ new Map;
        for (let i = 0;i < permutation.length; i += 1) {
          targetMap.set(permutation[i], i);
        }
        documentSort(document, path, (a, b) => (targetMap.get(a.key) ?? 0) - (targetMap.get(b.key) ?? 0), { groups: false });
        return;
      }
    }
    for (let i = original.length - 1;i >= current.length; i -= 1) {
      documentRemove(document, [...path, i]);
    }
    const minLength = Math.min(original.length, current.length);
    for (let i = 0;i < minLength; i += 1) {
      reconcile(document, original[i], current[i], [...path, i]);
    }
    if (current.length > original.length) {
      documentPush(document, path, ...current.slice(original.length));
    }
    return;
  }
  documentSet(document, path, current);
};
var originals = /* @__PURE__ */ new WeakMap;
var nestedToRoot = /* @__PURE__ */ new WeakMap;
var knownRoots = /* @__PURE__ */ new Set;
var rootCleanup = new FinalizationRegistry((ref) => {
  knownRoots.delete(ref);
});
var createSnapshot = (value) => {
  const json = JSON.stringify(value);
  if (json === undefined) {
    return;
  }
  return JSON.parse(json);
};
var walkTree = (node, root) => {
  if (typeof node !== "object" || node === null) {
    return;
  }
  if (root) {
    nestedToRoot.set(node, root);
  }
  if (Array.isArray(node)) {
    for (let i = 0;i < node.length; i += 1) {
      const child = node[i];
      if (typeof child === "object" && child !== null) {
        originalIndex.set(child, i);
        walkTree(child, root);
      }
    }
  } else {
    for (const child of Object.values(node)) {
      if (typeof child === "object" && child !== null) {
        walkTree(child, root);
      }
    }
  }
};
var applySort = (document, operation) => {
  if (operation.path.length === 0) {
    documentSort(document, operation.comparator);
  } else {
    documentSort(document, operation.path, operation.comparator);
  }
};
var parse2 = (text) => {
  const document = createDocument(text);
  const value = evaluate(document.ast.body);
  if (typeof value === "object" && value !== null) {
    const root = value;
    originals.set(root, {
      doc: document,
      snapshot: createSnapshot(value),
      operations: []
    });
    walkTree(root, root);
    const ref = new WeakRef(root);
    knownRoots.add(ref);
    rootCleanup.register(root, ref);
  }
  return value;
};
var stringify = (object) => {
  const orig = originals.get(object);
  if (!orig) {
    throw new TypeError("stringify() requires a drjson-parsed object");
  }
  const operations = [...orig.operations];
  orig.operations.length = 0;
  if (operations.length > 0) {
    for (const op of operations) {
      if (op.type === "rename") {
        documentRename(orig.doc, [...op.path, op.oldKey], op.newKey);
      }
      if (op.type === "sort") {
        applySort(orig.doc, op);
      }
    }
    orig.snapshot = createSnapshot(evaluate(orig.doc.ast.body));
  }
  if (JSON.stringify(object) === JSON.stringify(orig.snapshot)) {
    return orig.doc.text;
  }
  reconcile(orig.doc, orig.snapshot, object, []);
  orig.snapshot = createSnapshot(object);
  walkTree(object, object);
  return orig.doc.text;
};

// src/exports/1password.ts
import fs2 from "fs";

// node_modules/.pnpm/keycode-ts2@0.1.0/node_modules/keycode-ts2/dist/generated.js
var KeyMappingCode = {
  Hyper: "Hyper",
  Super: "Super",
  Fn: "Fn",
  FnLock: "FnLock",
  Suspend: "Suspend",
  Resume: "Resume",
  Turbo: "Turbo",
  Sleep: "Sleep",
  WakeUp: "WakeUp",
  DisplayToggleIntExt: "DisplayToggleIntExt",
  KeyA: "KeyA",
  KeyB: "KeyB",
  KeyC: "KeyC",
  KeyD: "KeyD",
  KeyE: "KeyE",
  KeyF: "KeyF",
  KeyG: "KeyG",
  KeyH: "KeyH",
  KeyI: "KeyI",
  KeyJ: "KeyJ",
  KeyK: "KeyK",
  KeyL: "KeyL",
  KeyM: "KeyM",
  KeyN: "KeyN",
  KeyO: "KeyO",
  KeyP: "KeyP",
  KeyQ: "KeyQ",
  KeyR: "KeyR",
  KeyS: "KeyS",
  KeyT: "KeyT",
  KeyU: "KeyU",
  KeyV: "KeyV",
  KeyW: "KeyW",
  KeyX: "KeyX",
  KeyY: "KeyY",
  KeyZ: "KeyZ",
  Digit1: "Digit1",
  Digit2: "Digit2",
  Digit3: "Digit3",
  Digit4: "Digit4",
  Digit5: "Digit5",
  Digit6: "Digit6",
  Digit7: "Digit7",
  Digit8: "Digit8",
  Digit9: "Digit9",
  Digit0: "Digit0",
  Enter: "Enter",
  Escape: "Escape",
  Backspace: "Backspace",
  Tab: "Tab",
  Space: "Space",
  Minus: "Minus",
  Equal: "Equal",
  BracketLeft: "BracketLeft",
  BracketRight: "BracketRight",
  Backslash: "Backslash",
  IntlHash: "IntlHash",
  Semicolon: "Semicolon",
  Quote: "Quote",
  Backquote: "Backquote",
  Comma: "Comma",
  Period: "Period",
  Slash: "Slash",
  CapsLock: "CapsLock",
  F1: "F1",
  F2: "F2",
  F3: "F3",
  F4: "F4",
  F5: "F5",
  F6: "F6",
  F7: "F7",
  F8: "F8",
  F9: "F9",
  F10: "F10",
  F11: "F11",
  F12: "F12",
  PrintScreen: "PrintScreen",
  ScrollLock: "ScrollLock",
  Pause: "Pause",
  Insert: "Insert",
  Home: "Home",
  PageUp: "PageUp",
  Delete: "Delete",
  End: "End",
  PageDown: "PageDown",
  ArrowRight: "ArrowRight",
  ArrowLeft: "ArrowLeft",
  ArrowDown: "ArrowDown",
  ArrowUp: "ArrowUp",
  NumLock: "NumLock",
  NumpadDivide: "NumpadDivide",
  NumpadMultiply: "NumpadMultiply",
  NumpadSubtract: "NumpadSubtract",
  NumpadAdd: "NumpadAdd",
  NumpadEnter: "NumpadEnter",
  Numpad1: "Numpad1",
  Numpad2: "Numpad2",
  Numpad3: "Numpad3",
  Numpad4: "Numpad4",
  Numpad5: "Numpad5",
  Numpad6: "Numpad6",
  Numpad7: "Numpad7",
  Numpad8: "Numpad8",
  Numpad9: "Numpad9",
  Numpad0: "Numpad0",
  NumpadDecimal: "NumpadDecimal",
  IntlBackslash: "IntlBackslash",
  ContextMenu: "ContextMenu",
  Power: "Power",
  NumpadEqual: "NumpadEqual",
  F13: "F13",
  F14: "F14",
  F15: "F15",
  F16: "F16",
  F17: "F17",
  F18: "F18",
  F19: "F19",
  F20: "F20",
  F21: "F21",
  F22: "F22",
  F23: "F23",
  F24: "F24",
  Open: "Open",
  Help: "Help",
  Select: "Select",
  Again: "Again",
  Undo: "Undo",
  Cut: "Cut",
  Copy: "Copy",
  Paste: "Paste",
  Find: "Find",
  AudioVolumeMute: "AudioVolumeMute",
  AudioVolumeUp: "AudioVolumeUp",
  AudioVolumeDown: "AudioVolumeDown",
  NumpadComma: "NumpadComma",
  IntlRo: "IntlRo",
  KanaMode: "KanaMode",
  IntlYen: "IntlYen",
  Convert: "Convert",
  NonConvert: "NonConvert",
  Lang1: "Lang1",
  Lang2: "Lang2",
  Lang3: "Lang3",
  Lang4: "Lang4",
  Lang5: "Lang5",
  Abort: "Abort",
  Props: "Props",
  NumpadParenLeft: "NumpadParenLeft",
  NumpadParenRight: "NumpadParenRight",
  NumpadBackspace: "NumpadBackspace",
  NumpadMemoryStore: "NumpadMemoryStore",
  NumpadMemoryRecall: "NumpadMemoryRecall",
  NumpadMemoryClear: "NumpadMemoryClear",
  NumpadMemoryAdd: "NumpadMemoryAdd",
  NumpadMemorySubtract: "NumpadMemorySubtract",
  NumpadClear: "NumpadClear",
  NumpadClearEntry: "NumpadClearEntry",
  ControlLeft: "ControlLeft",
  ShiftLeft: "ShiftLeft",
  AltLeft: "AltLeft",
  MetaLeft: "MetaLeft",
  ControlRight: "ControlRight",
  ShiftRight: "ShiftRight",
  AltRight: "AltRight",
  MetaRight: "MetaRight",
  BrightnessUp: "BrightnessUp",
  BrightnessDown: "BrightnessDown",
  MediaPlay: "MediaPlay",
  MediaRecord: "MediaRecord",
  MediaFastForward: "MediaFastForward",
  MediaRewind: "MediaRewind",
  MediaTrackNext: "MediaTrackNext",
  MediaTrackPrevious: "MediaTrackPrevious",
  MediaStop: "MediaStop",
  Eject: "Eject",
  MediaPlayPause: "MediaPlayPause",
  MediaSelect: "MediaSelect",
  LaunchMail: "LaunchMail",
  LaunchApp2: "LaunchApp2",
  LaunchApp1: "LaunchApp1",
  LaunchControlPanel: "LaunchControlPanel",
  SelectTask: "SelectTask",
  LaunchScreenSaver: "LaunchScreenSaver",
  LaunchAssistant: "LaunchAssistant",
  BrowserSearch: "BrowserSearch",
  BrowserHome: "BrowserHome",
  BrowserBack: "BrowserBack",
  BrowserForward: "BrowserForward",
  BrowserStop: "BrowserStop",
  BrowserRefresh: "BrowserRefresh",
  BrowserFavorites: "BrowserFavorites",
  ZoomToggle: "ZoomToggle",
  MailReply: "MailReply",
  MailForward: "MailForward",
  MailSend: "MailSend",
  KeyboardLayoutSelect: "KeyboardLayoutSelect",
  ShowAllWindows: "ShowAllWindows"
};
var keyMaps = {
  None: {
    usbPage: 0,
    usb: 0,
    evdev: 0,
    xkb: 0,
    win: 0,
    mac: 65535,
    code: null,
    id: "None",
    modifier: null
  },
  Hyper: {
    usbPage: 0,
    usb: 16,
    evdev: 0,
    xkb: 0,
    win: 0,
    mac: 65535,
    code: "Hyper",
    id: "Hyper",
    modifier: null
  },
  Super: {
    usbPage: 0,
    usb: 17,
    evdev: 0,
    xkb: 0,
    win: 0,
    mac: 65535,
    code: "Super",
    id: "Super",
    modifier: null
  },
  Fn: {
    usbPage: 0,
    usb: 18,
    evdev: 0,
    xkb: 0,
    win: 0,
    mac: 65535,
    code: "Fn",
    id: "Fn",
    modifier: null
  },
  FnLock: {
    usbPage: 0,
    usb: 19,
    evdev: 0,
    xkb: 0,
    win: 0,
    mac: 65535,
    code: "FnLock",
    id: "FnLock",
    modifier: null
  },
  Suspend: {
    usbPage: 0,
    usb: 20,
    evdev: 0,
    xkb: 0,
    win: 0,
    mac: 65535,
    code: "Suspend",
    id: "Suspend",
    modifier: null
  },
  Resume: {
    usbPage: 0,
    usb: 21,
    evdev: 0,
    xkb: 0,
    win: 0,
    mac: 65535,
    code: "Resume",
    id: "Resume",
    modifier: null
  },
  Turbo: {
    usbPage: 0,
    usb: 22,
    evdev: 0,
    xkb: 0,
    win: 0,
    mac: 65535,
    code: "Turbo",
    id: "Turbo",
    modifier: null
  },
  Sleep: {
    usbPage: 1,
    usb: 130,
    evdev: 142,
    xkb: 150,
    win: 57439,
    mac: 65535,
    code: "Sleep",
    id: "Sleep",
    modifier: null
  },
  WakeUp: {
    usbPage: 1,
    usb: 131,
    evdev: 143,
    xkb: 151,
    win: 57443,
    mac: 65535,
    code: "WakeUp",
    id: "WakeUp",
    modifier: null
  },
  DisplayToggleIntExt: {
    usbPage: 1,
    usb: 181,
    evdev: 227,
    xkb: 235,
    win: 0,
    mac: 65535,
    code: "DisplayToggleIntExt",
    id: "DisplayToggleIntExt",
    modifier: null
  },
  UsbReserved: {
    usbPage: 7,
    usb: 0,
    evdev: 0,
    xkb: 0,
    win: 0,
    mac: 65535,
    code: null,
    id: "UsbReserved",
    modifier: null
  },
  UsbErrorRollOver: {
    usbPage: 7,
    usb: 1,
    evdev: 0,
    xkb: 0,
    win: 255,
    mac: 65535,
    code: null,
    id: "UsbErrorRollOver",
    modifier: null
  },
  UsbPostFail: {
    usbPage: 7,
    usb: 2,
    evdev: 0,
    xkb: 0,
    win: 252,
    mac: 65535,
    code: null,
    id: "UsbPostFail",
    modifier: null
  },
  UsbErrorUndefined: {
    usbPage: 7,
    usb: 3,
    evdev: 0,
    xkb: 0,
    win: 0,
    mac: 65535,
    code: null,
    id: "UsbErrorUndefined",
    modifier: null
  },
  UsA: {
    usbPage: 7,
    usb: 4,
    evdev: 30,
    xkb: 38,
    win: 30,
    mac: 0,
    code: "KeyA",
    id: "UsA",
    modifier: null
  },
  UsB: {
    usbPage: 7,
    usb: 5,
    evdev: 48,
    xkb: 56,
    win: 48,
    mac: 11,
    code: "KeyB",
    id: "UsB",
    modifier: null
  },
  UsC: {
    usbPage: 7,
    usb: 6,
    evdev: 46,
    xkb: 54,
    win: 46,
    mac: 8,
    code: "KeyC",
    id: "UsC",
    modifier: null
  },
  UsD: {
    usbPage: 7,
    usb: 7,
    evdev: 32,
    xkb: 40,
    win: 32,
    mac: 2,
    code: "KeyD",
    id: "UsD",
    modifier: null
  },
  UsE: {
    usbPage: 7,
    usb: 8,
    evdev: 18,
    xkb: 26,
    win: 18,
    mac: 14,
    code: "KeyE",
    id: "UsE",
    modifier: null
  },
  UsF: {
    usbPage: 7,
    usb: 9,
    evdev: 33,
    xkb: 41,
    win: 33,
    mac: 3,
    code: "KeyF",
    id: "UsF",
    modifier: null
  },
  UsG: {
    usbPage: 7,
    usb: 10,
    evdev: 34,
    xkb: 42,
    win: 34,
    mac: 5,
    code: "KeyG",
    id: "UsG",
    modifier: null
  },
  UsH: {
    usbPage: 7,
    usb: 11,
    evdev: 35,
    xkb: 43,
    win: 35,
    mac: 4,
    code: "KeyH",
    id: "UsH",
    modifier: null
  },
  UsI: {
    usbPage: 7,
    usb: 12,
    evdev: 23,
    xkb: 31,
    win: 23,
    mac: 34,
    code: "KeyI",
    id: "UsI",
    modifier: null
  },
  UsJ: {
    usbPage: 7,
    usb: 13,
    evdev: 36,
    xkb: 44,
    win: 36,
    mac: 38,
    code: "KeyJ",
    id: "UsJ",
    modifier: null
  },
  UsK: {
    usbPage: 7,
    usb: 14,
    evdev: 37,
    xkb: 45,
    win: 37,
    mac: 40,
    code: "KeyK",
    id: "UsK",
    modifier: null
  },
  UsL: {
    usbPage: 7,
    usb: 15,
    evdev: 38,
    xkb: 46,
    win: 38,
    mac: 37,
    code: "KeyL",
    id: "UsL",
    modifier: null
  },
  UsM: {
    usbPage: 7,
    usb: 16,
    evdev: 50,
    xkb: 58,
    win: 50,
    mac: 46,
    code: "KeyM",
    id: "UsM",
    modifier: null
  },
  UsN: {
    usbPage: 7,
    usb: 17,
    evdev: 49,
    xkb: 57,
    win: 49,
    mac: 45,
    code: "KeyN",
    id: "UsN",
    modifier: null
  },
  UsO: {
    usbPage: 7,
    usb: 18,
    evdev: 24,
    xkb: 32,
    win: 24,
    mac: 31,
    code: "KeyO",
    id: "UsO",
    modifier: null
  },
  UsP: {
    usbPage: 7,
    usb: 19,
    evdev: 25,
    xkb: 33,
    win: 25,
    mac: 35,
    code: "KeyP",
    id: "UsP",
    modifier: null
  },
  UsQ: {
    usbPage: 7,
    usb: 20,
    evdev: 16,
    xkb: 24,
    win: 16,
    mac: 12,
    code: "KeyQ",
    id: "UsQ",
    modifier: null
  },
  UsR: {
    usbPage: 7,
    usb: 21,
    evdev: 19,
    xkb: 27,
    win: 19,
    mac: 15,
    code: "KeyR",
    id: "UsR",
    modifier: null
  },
  UsS: {
    usbPage: 7,
    usb: 22,
    evdev: 31,
    xkb: 39,
    win: 31,
    mac: 1,
    code: "KeyS",
    id: "UsS",
    modifier: null
  },
  UsT: {
    usbPage: 7,
    usb: 23,
    evdev: 20,
    xkb: 28,
    win: 20,
    mac: 17,
    code: "KeyT",
    id: "UsT",
    modifier: null
  },
  UsU: {
    usbPage: 7,
    usb: 24,
    evdev: 22,
    xkb: 30,
    win: 22,
    mac: 32,
    code: "KeyU",
    id: "UsU",
    modifier: null
  },
  UsV: {
    usbPage: 7,
    usb: 25,
    evdev: 47,
    xkb: 55,
    win: 47,
    mac: 9,
    code: "KeyV",
    id: "UsV",
    modifier: null
  },
  UsW: {
    usbPage: 7,
    usb: 26,
    evdev: 17,
    xkb: 25,
    win: 17,
    mac: 13,
    code: "KeyW",
    id: "UsW",
    modifier: null
  },
  UsX: {
    usbPage: 7,
    usb: 27,
    evdev: 45,
    xkb: 53,
    win: 45,
    mac: 7,
    code: "KeyX",
    id: "UsX",
    modifier: null
  },
  UsY: {
    usbPage: 7,
    usb: 28,
    evdev: 21,
    xkb: 29,
    win: 21,
    mac: 16,
    code: "KeyY",
    id: "UsY",
    modifier: null
  },
  UsZ: {
    usbPage: 7,
    usb: 29,
    evdev: 44,
    xkb: 52,
    win: 44,
    mac: 6,
    code: "KeyZ",
    id: "UsZ",
    modifier: null
  },
  Digit1: {
    usbPage: 7,
    usb: 30,
    evdev: 2,
    xkb: 10,
    win: 2,
    mac: 18,
    code: "Digit1",
    id: "Digit1",
    modifier: null
  },
  Digit2: {
    usbPage: 7,
    usb: 31,
    evdev: 3,
    xkb: 11,
    win: 3,
    mac: 19,
    code: "Digit2",
    id: "Digit2",
    modifier: null
  },
  Digit3: {
    usbPage: 7,
    usb: 32,
    evdev: 4,
    xkb: 12,
    win: 4,
    mac: 20,
    code: "Digit3",
    id: "Digit3",
    modifier: null
  },
  Digit4: {
    usbPage: 7,
    usb: 33,
    evdev: 5,
    xkb: 13,
    win: 5,
    mac: 21,
    code: "Digit4",
    id: "Digit4",
    modifier: null
  },
  Digit5: {
    usbPage: 7,
    usb: 34,
    evdev: 6,
    xkb: 14,
    win: 6,
    mac: 23,
    code: "Digit5",
    id: "Digit5",
    modifier: null
  },
  Digit6: {
    usbPage: 7,
    usb: 35,
    evdev: 7,
    xkb: 15,
    win: 7,
    mac: 22,
    code: "Digit6",
    id: "Digit6",
    modifier: null
  },
  Digit7: {
    usbPage: 7,
    usb: 36,
    evdev: 8,
    xkb: 16,
    win: 8,
    mac: 26,
    code: "Digit7",
    id: "Digit7",
    modifier: null
  },
  Digit8: {
    usbPage: 7,
    usb: 37,
    evdev: 9,
    xkb: 17,
    win: 9,
    mac: 28,
    code: "Digit8",
    id: "Digit8",
    modifier: null
  },
  Digit9: {
    usbPage: 7,
    usb: 38,
    evdev: 10,
    xkb: 18,
    win: 10,
    mac: 25,
    code: "Digit9",
    id: "Digit9",
    modifier: null
  },
  Digit0: {
    usbPage: 7,
    usb: 39,
    evdev: 11,
    xkb: 19,
    win: 11,
    mac: 29,
    code: "Digit0",
    id: "Digit0",
    modifier: null
  },
  Enter: {
    usbPage: 7,
    usb: 40,
    evdev: 28,
    xkb: 36,
    win: 28,
    mac: 36,
    code: "Enter",
    id: "Enter",
    modifier: null
  },
  Escape: {
    usbPage: 7,
    usb: 41,
    evdev: 1,
    xkb: 9,
    win: 1,
    mac: 53,
    code: "Escape",
    id: "Escape",
    modifier: null
  },
  Backspace: {
    usbPage: 7,
    usb: 42,
    evdev: 14,
    xkb: 22,
    win: 14,
    mac: 51,
    code: "Backspace",
    id: "Backspace",
    modifier: null
  },
  Tab: {
    usbPage: 7,
    usb: 43,
    evdev: 15,
    xkb: 23,
    win: 15,
    mac: 48,
    code: "Tab",
    id: "Tab",
    modifier: null
  },
  Space: {
    usbPage: 7,
    usb: 44,
    evdev: 57,
    xkb: 65,
    win: 57,
    mac: 49,
    code: "Space",
    id: "Space",
    modifier: null
  },
  Minus: {
    usbPage: 7,
    usb: 45,
    evdev: 12,
    xkb: 20,
    win: 12,
    mac: 27,
    code: "Minus",
    id: "Minus",
    modifier: null
  },
  Equal: {
    usbPage: 7,
    usb: 46,
    evdev: 13,
    xkb: 21,
    win: 13,
    mac: 24,
    code: "Equal",
    id: "Equal",
    modifier: null
  },
  BracketLeft: {
    usbPage: 7,
    usb: 47,
    evdev: 26,
    xkb: 34,
    win: 26,
    mac: 33,
    code: "BracketLeft",
    id: "BracketLeft",
    modifier: null
  },
  BracketRight: {
    usbPage: 7,
    usb: 48,
    evdev: 27,
    xkb: 35,
    win: 27,
    mac: 30,
    code: "BracketRight",
    id: "BracketRight",
    modifier: null
  },
  Backslash: {
    usbPage: 7,
    usb: 49,
    evdev: 43,
    xkb: 51,
    win: 43,
    mac: 42,
    code: "Backslash",
    id: "Backslash",
    modifier: null
  },
  IntlHash: {
    usbPage: 7,
    usb: 50,
    evdev: 0,
    xkb: 0,
    win: 0,
    mac: 65535,
    code: "IntlHash",
    id: "IntlHash",
    modifier: null
  },
  Semicolon: {
    usbPage: 7,
    usb: 51,
    evdev: 39,
    xkb: 47,
    win: 39,
    mac: 41,
    code: "Semicolon",
    id: "Semicolon",
    modifier: null
  },
  Quote: {
    usbPage: 7,
    usb: 52,
    evdev: 40,
    xkb: 48,
    win: 40,
    mac: 39,
    code: "Quote",
    id: "Quote",
    modifier: null
  },
  Backquote: {
    usbPage: 7,
    usb: 53,
    evdev: 41,
    xkb: 49,
    win: 41,
    mac: 50,
    code: "Backquote",
    id: "Backquote",
    modifier: null
  },
  Comma: {
    usbPage: 7,
    usb: 54,
    evdev: 51,
    xkb: 59,
    win: 51,
    mac: 43,
    code: "Comma",
    id: "Comma",
    modifier: null
  },
  Period: {
    usbPage: 7,
    usb: 55,
    evdev: 52,
    xkb: 60,
    win: 52,
    mac: 47,
    code: "Period",
    id: "Period",
    modifier: null
  },
  Slash: {
    usbPage: 7,
    usb: 56,
    evdev: 53,
    xkb: 61,
    win: 53,
    mac: 44,
    code: "Slash",
    id: "Slash",
    modifier: null
  },
  CapsLock: {
    usbPage: 7,
    usb: 57,
    evdev: 58,
    xkb: 66,
    win: 58,
    mac: 57,
    code: "CapsLock",
    id: "CapsLock",
    modifier: null
  },
  F1: {
    usbPage: 7,
    usb: 58,
    evdev: 59,
    xkb: 67,
    win: 59,
    mac: 122,
    code: "F1",
    id: "F1",
    modifier: null
  },
  F2: {
    usbPage: 7,
    usb: 59,
    evdev: 60,
    xkb: 68,
    win: 60,
    mac: 120,
    code: "F2",
    id: "F2",
    modifier: null
  },
  F3: {
    usbPage: 7,
    usb: 60,
    evdev: 61,
    xkb: 69,
    win: 61,
    mac: 99,
    code: "F3",
    id: "F3",
    modifier: null
  },
  F4: {
    usbPage: 7,
    usb: 61,
    evdev: 62,
    xkb: 70,
    win: 62,
    mac: 118,
    code: "F4",
    id: "F4",
    modifier: null
  },
  F5: {
    usbPage: 7,
    usb: 62,
    evdev: 63,
    xkb: 71,
    win: 63,
    mac: 96,
    code: "F5",
    id: "F5",
    modifier: null
  },
  F6: {
    usbPage: 7,
    usb: 63,
    evdev: 64,
    xkb: 72,
    win: 64,
    mac: 97,
    code: "F6",
    id: "F6",
    modifier: null
  },
  F7: {
    usbPage: 7,
    usb: 64,
    evdev: 65,
    xkb: 73,
    win: 65,
    mac: 98,
    code: "F7",
    id: "F7",
    modifier: null
  },
  F8: {
    usbPage: 7,
    usb: 65,
    evdev: 66,
    xkb: 74,
    win: 66,
    mac: 100,
    code: "F8",
    id: "F8",
    modifier: null
  },
  F9: {
    usbPage: 7,
    usb: 66,
    evdev: 67,
    xkb: 75,
    win: 67,
    mac: 101,
    code: "F9",
    id: "F9",
    modifier: null
  },
  F10: {
    usbPage: 7,
    usb: 67,
    evdev: 68,
    xkb: 76,
    win: 68,
    mac: 109,
    code: "F10",
    id: "F10",
    modifier: null
  },
  F11: {
    usbPage: 7,
    usb: 68,
    evdev: 87,
    xkb: 95,
    win: 87,
    mac: 103,
    code: "F11",
    id: "F11",
    modifier: null
  },
  F12: {
    usbPage: 7,
    usb: 69,
    evdev: 88,
    xkb: 96,
    win: 88,
    mac: 111,
    code: "F12",
    id: "F12",
    modifier: null
  },
  PrintScreen: {
    usbPage: 7,
    usb: 70,
    evdev: 99,
    xkb: 107,
    win: 57399,
    mac: 65535,
    code: "PrintScreen",
    id: "PrintScreen",
    modifier: null
  },
  ScrollLock: {
    usbPage: 7,
    usb: 71,
    evdev: 70,
    xkb: 78,
    win: 70,
    mac: 65535,
    code: "ScrollLock",
    id: "ScrollLock",
    modifier: null
  },
  Pause: {
    usbPage: 7,
    usb: 72,
    evdev: 119,
    xkb: 127,
    win: 69,
    mac: 65535,
    code: "Pause",
    id: "Pause",
    modifier: null
  },
  Insert: {
    usbPage: 7,
    usb: 73,
    evdev: 110,
    xkb: 118,
    win: 57426,
    mac: 114,
    code: "Insert",
    id: "Insert",
    modifier: null
  },
  Home: {
    usbPage: 7,
    usb: 74,
    evdev: 102,
    xkb: 110,
    win: 57415,
    mac: 115,
    code: "Home",
    id: "Home",
    modifier: null
  },
  PageUp: {
    usbPage: 7,
    usb: 75,
    evdev: 104,
    xkb: 112,
    win: 57417,
    mac: 116,
    code: "PageUp",
    id: "PageUp",
    modifier: null
  },
  Del: {
    usbPage: 7,
    usb: 76,
    evdev: 111,
    xkb: 119,
    win: 57427,
    mac: 117,
    code: "Delete",
    id: "Del",
    modifier: null
  },
  End: {
    usbPage: 7,
    usb: 77,
    evdev: 107,
    xkb: 115,
    win: 57423,
    mac: 119,
    code: "End",
    id: "End",
    modifier: null
  },
  PageDown: {
    usbPage: 7,
    usb: 78,
    evdev: 109,
    xkb: 117,
    win: 57425,
    mac: 121,
    code: "PageDown",
    id: "PageDown",
    modifier: null
  },
  ArrowRight: {
    usbPage: 7,
    usb: 79,
    evdev: 106,
    xkb: 114,
    win: 57421,
    mac: 124,
    code: "ArrowRight",
    id: "ArrowRight",
    modifier: null
  },
  ArrowLeft: {
    usbPage: 7,
    usb: 80,
    evdev: 105,
    xkb: 113,
    win: 57419,
    mac: 123,
    code: "ArrowLeft",
    id: "ArrowLeft",
    modifier: null
  },
  ArrowDown: {
    usbPage: 7,
    usb: 81,
    evdev: 108,
    xkb: 116,
    win: 57424,
    mac: 125,
    code: "ArrowDown",
    id: "ArrowDown",
    modifier: null
  },
  ArrowUp: {
    usbPage: 7,
    usb: 82,
    evdev: 103,
    xkb: 111,
    win: 57416,
    mac: 126,
    code: "ArrowUp",
    id: "ArrowUp",
    modifier: null
  },
  NumLock: {
    usbPage: 7,
    usb: 83,
    evdev: 69,
    xkb: 77,
    win: 57413,
    mac: 71,
    code: "NumLock",
    id: "NumLock",
    modifier: null
  },
  NumpadDivide: {
    usbPage: 7,
    usb: 84,
    evdev: 98,
    xkb: 106,
    win: 57397,
    mac: 75,
    code: "NumpadDivide",
    id: "NumpadDivide",
    modifier: null
  },
  NumpadMultiply: {
    usbPage: 7,
    usb: 85,
    evdev: 55,
    xkb: 63,
    win: 55,
    mac: 67,
    code: "NumpadMultiply",
    id: "NumpadMultiply",
    modifier: null
  },
  NumpadSubtract: {
    usbPage: 7,
    usb: 86,
    evdev: 74,
    xkb: 82,
    win: 74,
    mac: 78,
    code: "NumpadSubtract",
    id: "NumpadSubtract",
    modifier: null
  },
  NumpadAdd: {
    usbPage: 7,
    usb: 87,
    evdev: 78,
    xkb: 86,
    win: 78,
    mac: 69,
    code: "NumpadAdd",
    id: "NumpadAdd",
    modifier: null
  },
  NumpadEnter: {
    usbPage: 7,
    usb: 88,
    evdev: 96,
    xkb: 104,
    win: 57372,
    mac: 76,
    code: "NumpadEnter",
    id: "NumpadEnter",
    modifier: null
  },
  Numpad1: {
    usbPage: 7,
    usb: 89,
    evdev: 79,
    xkb: 87,
    win: 79,
    mac: 83,
    code: "Numpad1",
    id: "Numpad1",
    modifier: null
  },
  Numpad2: {
    usbPage: 7,
    usb: 90,
    evdev: 80,
    xkb: 88,
    win: 80,
    mac: 84,
    code: "Numpad2",
    id: "Numpad2",
    modifier: null
  },
  Numpad3: {
    usbPage: 7,
    usb: 91,
    evdev: 81,
    xkb: 89,
    win: 81,
    mac: 85,
    code: "Numpad3",
    id: "Numpad3",
    modifier: null
  },
  Numpad4: {
    usbPage: 7,
    usb: 92,
    evdev: 75,
    xkb: 83,
    win: 75,
    mac: 86,
    code: "Numpad4",
    id: "Numpad4",
    modifier: null
  },
  Numpad5: {
    usbPage: 7,
    usb: 93,
    evdev: 76,
    xkb: 84,
    win: 76,
    mac: 87,
    code: "Numpad5",
    id: "Numpad5",
    modifier: null
  },
  Numpad6: {
    usbPage: 7,
    usb: 94,
    evdev: 77,
    xkb: 85,
    win: 77,
    mac: 88,
    code: "Numpad6",
    id: "Numpad6",
    modifier: null
  },
  Numpad7: {
    usbPage: 7,
    usb: 95,
    evdev: 71,
    xkb: 79,
    win: 71,
    mac: 89,
    code: "Numpad7",
    id: "Numpad7",
    modifier: null
  },
  Numpad8: {
    usbPage: 7,
    usb: 96,
    evdev: 72,
    xkb: 80,
    win: 72,
    mac: 91,
    code: "Numpad8",
    id: "Numpad8",
    modifier: null
  },
  Numpad9: {
    usbPage: 7,
    usb: 97,
    evdev: 73,
    xkb: 81,
    win: 73,
    mac: 92,
    code: "Numpad9",
    id: "Numpad9",
    modifier: null
  },
  Numpad0: {
    usbPage: 7,
    usb: 98,
    evdev: 82,
    xkb: 90,
    win: 82,
    mac: 82,
    code: "Numpad0",
    id: "Numpad0",
    modifier: null
  },
  NumpadDecimal: {
    usbPage: 7,
    usb: 99,
    evdev: 83,
    xkb: 91,
    win: 83,
    mac: 65,
    code: "NumpadDecimal",
    id: "NumpadDecimal",
    modifier: null
  },
  IntlBackslash: {
    usbPage: 7,
    usb: 100,
    evdev: 86,
    xkb: 94,
    win: 86,
    mac: 10,
    code: "IntlBackslash",
    id: "IntlBackslash",
    modifier: null
  },
  ContextMenu: {
    usbPage: 7,
    usb: 101,
    evdev: 127,
    xkb: 135,
    win: 57437,
    mac: 110,
    code: "ContextMenu",
    id: "ContextMenu",
    modifier: null
  },
  Power: {
    usbPage: 7,
    usb: 102,
    evdev: 116,
    xkb: 124,
    win: 57438,
    mac: 65535,
    code: "Power",
    id: "Power",
    modifier: null
  },
  NumpadEqual: {
    usbPage: 7,
    usb: 103,
    evdev: 117,
    xkb: 125,
    win: 89,
    mac: 81,
    code: "NumpadEqual",
    id: "NumpadEqual",
    modifier: null
  },
  F13: {
    usbPage: 7,
    usb: 104,
    evdev: 183,
    xkb: 191,
    win: 100,
    mac: 105,
    code: "F13",
    id: "F13",
    modifier: null
  },
  F14: {
    usbPage: 7,
    usb: 105,
    evdev: 184,
    xkb: 192,
    win: 101,
    mac: 107,
    code: "F14",
    id: "F14",
    modifier: null
  },
  F15: {
    usbPage: 7,
    usb: 106,
    evdev: 185,
    xkb: 193,
    win: 102,
    mac: 113,
    code: "F15",
    id: "F15",
    modifier: null
  },
  F16: {
    usbPage: 7,
    usb: 107,
    evdev: 186,
    xkb: 194,
    win: 103,
    mac: 106,
    code: "F16",
    id: "F16",
    modifier: null
  },
  F17: {
    usbPage: 7,
    usb: 108,
    evdev: 187,
    xkb: 195,
    win: 104,
    mac: 64,
    code: "F17",
    id: "F17",
    modifier: null
  },
  F18: {
    usbPage: 7,
    usb: 109,
    evdev: 188,
    xkb: 196,
    win: 105,
    mac: 79,
    code: "F18",
    id: "F18",
    modifier: null
  },
  F19: {
    usbPage: 7,
    usb: 110,
    evdev: 189,
    xkb: 197,
    win: 106,
    mac: 80,
    code: "F19",
    id: "F19",
    modifier: null
  },
  F20: {
    usbPage: 7,
    usb: 111,
    evdev: 190,
    xkb: 198,
    win: 107,
    mac: 90,
    code: "F20",
    id: "F20",
    modifier: null
  },
  F21: {
    usbPage: 7,
    usb: 112,
    evdev: 191,
    xkb: 199,
    win: 108,
    mac: 65535,
    code: "F21",
    id: "F21",
    modifier: null
  },
  F22: {
    usbPage: 7,
    usb: 113,
    evdev: 192,
    xkb: 200,
    win: 109,
    mac: 65535,
    code: "F22",
    id: "F22",
    modifier: null
  },
  F23: {
    usbPage: 7,
    usb: 114,
    evdev: 193,
    xkb: 201,
    win: 110,
    mac: 65535,
    code: "F23",
    id: "F23",
    modifier: null
  },
  F24: {
    usbPage: 7,
    usb: 115,
    evdev: 194,
    xkb: 202,
    win: 118,
    mac: 65535,
    code: "F24",
    id: "F24",
    modifier: null
  },
  Open: {
    usbPage: 7,
    usb: 116,
    evdev: 134,
    xkb: 142,
    win: 0,
    mac: 65535,
    code: "Open",
    id: "Open",
    modifier: null
  },
  Help: {
    usbPage: 7,
    usb: 117,
    evdev: 138,
    xkb: 146,
    win: 57403,
    mac: 65535,
    code: "Help",
    id: "Help",
    modifier: null
  },
  Select: {
    usbPage: 7,
    usb: 119,
    evdev: 132,
    xkb: 140,
    win: 0,
    mac: 65535,
    code: "Select",
    id: "Select",
    modifier: null
  },
  Again: {
    usbPage: 7,
    usb: 121,
    evdev: 129,
    xkb: 137,
    win: 0,
    mac: 65535,
    code: "Again",
    id: "Again",
    modifier: null
  },
  Undo: {
    usbPage: 7,
    usb: 122,
    evdev: 131,
    xkb: 139,
    win: 57352,
    mac: 65535,
    code: "Undo",
    id: "Undo",
    modifier: null
  },
  Cut: {
    usbPage: 7,
    usb: 123,
    evdev: 137,
    xkb: 145,
    win: 57367,
    mac: 65535,
    code: "Cut",
    id: "Cut",
    modifier: null
  },
  Copy: {
    usbPage: 7,
    usb: 124,
    evdev: 133,
    xkb: 141,
    win: 57368,
    mac: 65535,
    code: "Copy",
    id: "Copy",
    modifier: null
  },
  Paste: {
    usbPage: 7,
    usb: 125,
    evdev: 135,
    xkb: 143,
    win: 57354,
    mac: 65535,
    code: "Paste",
    id: "Paste",
    modifier: null
  },
  Find: {
    usbPage: 7,
    usb: 126,
    evdev: 136,
    xkb: 144,
    win: 0,
    mac: 65535,
    code: "Find",
    id: "Find",
    modifier: null
  },
  VolumeMute: {
    usbPage: 7,
    usb: 127,
    evdev: 113,
    xkb: 121,
    win: 57376,
    mac: 74,
    code: "AudioVolumeMute",
    id: "VolumeMute",
    modifier: null
  },
  VolumeUp: {
    usbPage: 7,
    usb: 128,
    evdev: 115,
    xkb: 123,
    win: 57392,
    mac: 72,
    code: "AudioVolumeUp",
    id: "VolumeUp",
    modifier: null
  },
  VolumeDown: {
    usbPage: 7,
    usb: 129,
    evdev: 114,
    xkb: 122,
    win: 57390,
    mac: 73,
    code: "AudioVolumeDown",
    id: "VolumeDown",
    modifier: null
  },
  NumpadComma: {
    usbPage: 7,
    usb: 133,
    evdev: 121,
    xkb: 129,
    win: 126,
    mac: 95,
    code: "NumpadComma",
    id: "NumpadComma",
    modifier: null
  },
  IntlRo: {
    usbPage: 7,
    usb: 135,
    evdev: 89,
    xkb: 97,
    win: 115,
    mac: 94,
    code: "IntlRo",
    id: "IntlRo",
    modifier: null
  },
  KanaMode: {
    usbPage: 7,
    usb: 136,
    evdev: 93,
    xkb: 101,
    win: 112,
    mac: 104,
    code: "KanaMode",
    id: "KanaMode",
    modifier: null
  },
  IntlYen: {
    usbPage: 7,
    usb: 137,
    evdev: 124,
    xkb: 132,
    win: 125,
    mac: 93,
    code: "IntlYen",
    id: "IntlYen",
    modifier: null
  },
  Convert: {
    usbPage: 7,
    usb: 138,
    evdev: 92,
    xkb: 100,
    win: 121,
    mac: 65535,
    code: "Convert",
    id: "Convert",
    modifier: null
  },
  NonConvert: {
    usbPage: 7,
    usb: 139,
    evdev: 94,
    xkb: 102,
    win: 123,
    mac: 65535,
    code: "NonConvert",
    id: "NonConvert",
    modifier: null
  },
  Lang1: {
    usbPage: 7,
    usb: 144,
    evdev: 122,
    xkb: 130,
    win: 114,
    mac: 65535,
    code: "Lang1",
    id: "Lang1",
    modifier: null
  },
  Lang2: {
    usbPage: 7,
    usb: 145,
    evdev: 123,
    xkb: 131,
    win: 113,
    mac: 65535,
    code: "Lang2",
    id: "Lang2",
    modifier: null
  },
  Lang3: {
    usbPage: 7,
    usb: 146,
    evdev: 90,
    xkb: 98,
    win: 120,
    mac: 65535,
    code: "Lang3",
    id: "Lang3",
    modifier: null
  },
  Lang4: {
    usbPage: 7,
    usb: 147,
    evdev: 91,
    xkb: 99,
    win: 119,
    mac: 65535,
    code: "Lang4",
    id: "Lang4",
    modifier: null
  },
  Lang5: {
    usbPage: 7,
    usb: 148,
    evdev: 85,
    xkb: 93,
    win: 0,
    mac: 65535,
    code: "Lang5",
    id: "Lang5",
    modifier: null
  },
  Abort: {
    usbPage: 7,
    usb: 155,
    evdev: 0,
    xkb: 0,
    win: 0,
    mac: 65535,
    code: "Abort",
    id: "Abort",
    modifier: null
  },
  Props: {
    usbPage: 7,
    usb: 163,
    evdev: 0,
    xkb: 0,
    win: 0,
    mac: 65535,
    code: "Props",
    id: "Props",
    modifier: null
  },
  NumpadParenLeft: {
    usbPage: 7,
    usb: 182,
    evdev: 179,
    xkb: 187,
    win: 0,
    mac: 65535,
    code: "NumpadParenLeft",
    id: "NumpadParenLeft",
    modifier: null
  },
  NumpadParenRight: {
    usbPage: 7,
    usb: 183,
    evdev: 180,
    xkb: 188,
    win: 0,
    mac: 65535,
    code: "NumpadParenRight",
    id: "NumpadParenRight",
    modifier: null
  },
  NumpadBackspace: {
    usbPage: 7,
    usb: 187,
    evdev: 0,
    xkb: 0,
    win: 0,
    mac: 65535,
    code: "NumpadBackspace",
    id: "NumpadBackspace",
    modifier: null
  },
  NumpadMemoryStore: {
    usbPage: 7,
    usb: 208,
    evdev: 0,
    xkb: 0,
    win: 0,
    mac: 65535,
    code: "NumpadMemoryStore",
    id: "NumpadMemoryStore",
    modifier: null
  },
  NumpadMemoryRecall: {
    usbPage: 7,
    usb: 209,
    evdev: 0,
    xkb: 0,
    win: 0,
    mac: 65535,
    code: "NumpadMemoryRecall",
    id: "NumpadMemoryRecall",
    modifier: null
  },
  NumpadMemoryClear: {
    usbPage: 7,
    usb: 210,
    evdev: 0,
    xkb: 0,
    win: 0,
    mac: 65535,
    code: "NumpadMemoryClear",
    id: "NumpadMemoryClear",
    modifier: null
  },
  NumpadMemoryAdd: {
    usbPage: 7,
    usb: 211,
    evdev: 0,
    xkb: 0,
    win: 0,
    mac: 65535,
    code: "NumpadMemoryAdd",
    id: "NumpadMemoryAdd",
    modifier: null
  },
  NumpadMemorySubtract: {
    usbPage: 7,
    usb: 212,
    evdev: 0,
    xkb: 0,
    win: 0,
    mac: 65535,
    code: "NumpadMemorySubtract",
    id: "NumpadMemorySubtract",
    modifier: null
  },
  NumpadSignChange: {
    usbPage: 7,
    usb: 215,
    evdev: 118,
    xkb: 126,
    win: 0,
    mac: 65535,
    code: null,
    id: "NumpadSignChange",
    modifier: null
  },
  NumpadClear: {
    usbPage: 7,
    usb: 216,
    evdev: 0,
    xkb: 0,
    win: 0,
    mac: 65535,
    code: "NumpadClear",
    id: "NumpadClear",
    modifier: null
  },
  NumpadClearEntry: {
    usbPage: 7,
    usb: 217,
    evdev: 0,
    xkb: 0,
    win: 0,
    mac: 65535,
    code: "NumpadClearEntry",
    id: "NumpadClearEntry",
    modifier: null
  },
  ControlLeft: {
    usbPage: 7,
    usb: 224,
    evdev: 29,
    xkb: 37,
    win: 29,
    mac: 59,
    code: "ControlLeft",
    id: "ControlLeft",
    modifier: 1
  },
  ShiftLeft: {
    usbPage: 7,
    usb: 225,
    evdev: 42,
    xkb: 50,
    win: 42,
    mac: 56,
    code: "ShiftLeft",
    id: "ShiftLeft",
    modifier: 2
  },
  AltLeft: {
    usbPage: 7,
    usb: 226,
    evdev: 56,
    xkb: 64,
    win: 56,
    mac: 58,
    code: "AltLeft",
    id: "AltLeft",
    modifier: 4
  },
  MetaLeft: {
    usbPage: 7,
    usb: 227,
    evdev: 125,
    xkb: 133,
    win: 57435,
    mac: 55,
    code: "MetaLeft",
    id: "MetaLeft",
    modifier: 8
  },
  ControlRight: {
    usbPage: 7,
    usb: 228,
    evdev: 97,
    xkb: 105,
    win: 57373,
    mac: 62,
    code: "ControlRight",
    id: "ControlRight",
    modifier: 16
  },
  ShiftRight: {
    usbPage: 7,
    usb: 229,
    evdev: 54,
    xkb: 62,
    win: 54,
    mac: 60,
    code: "ShiftRight",
    id: "ShiftRight",
    modifier: 32
  },
  AltRight: {
    usbPage: 7,
    usb: 230,
    evdev: 100,
    xkb: 108,
    win: 57400,
    mac: 61,
    code: "AltRight",
    id: "AltRight",
    modifier: 64
  },
  MetaRight: {
    usbPage: 7,
    usb: 231,
    evdev: 126,
    xkb: 134,
    win: 57436,
    mac: 54,
    code: "MetaRight",
    id: "MetaRight",
    modifier: 128
  },
  Info: {
    usbPage: 12,
    usb: 96,
    evdev: 358,
    xkb: 366,
    win: 0,
    mac: 65535,
    code: null,
    id: "Info",
    modifier: null
  },
  ClosedCaptionToggle: {
    usbPage: 12,
    usb: 97,
    evdev: 370,
    xkb: 378,
    win: 0,
    mac: 65535,
    code: null,
    id: "ClosedCaptionToggle",
    modifier: null
  },
  BrightnessUp: {
    usbPage: 12,
    usb: 111,
    evdev: 225,
    xkb: 233,
    win: 0,
    mac: 65535,
    code: "BrightnessUp",
    id: "BrightnessUp",
    modifier: null
  },
  BrightnessDown: {
    usbPage: 12,
    usb: 112,
    evdev: 224,
    xkb: 232,
    win: 0,
    mac: 65535,
    code: "BrightnessDown",
    id: "BrightnessDown",
    modifier: null
  },
  BrightnessToggle: {
    usbPage: 12,
    usb: 114,
    evdev: 431,
    xkb: 439,
    win: 0,
    mac: 65535,
    code: null,
    id: "BrightnessToggle",
    modifier: null
  },
  BrightnessMinimium: {
    usbPage: 12,
    usb: 115,
    evdev: 592,
    xkb: 600,
    win: 0,
    mac: 65535,
    code: null,
    id: "BrightnessMinimium",
    modifier: null
  },
  BrightnessMaximum: {
    usbPage: 12,
    usb: 116,
    evdev: 593,
    xkb: 601,
    win: 0,
    mac: 65535,
    code: null,
    id: "BrightnessMaximum",
    modifier: null
  },
  BrightnessAuto: {
    usbPage: 12,
    usb: 117,
    evdev: 244,
    xkb: 252,
    win: 0,
    mac: 65535,
    code: null,
    id: "BrightnessAuto",
    modifier: null
  },
  MediaLast: {
    usbPage: 12,
    usb: 131,
    evdev: 405,
    xkb: 413,
    win: 0,
    mac: 65535,
    code: null,
    id: "MediaLast",
    modifier: null
  },
  LaunchPhone: {
    usbPage: 12,
    usb: 140,
    evdev: 169,
    xkb: 177,
    win: 0,
    mac: 65535,
    code: null,
    id: "LaunchPhone",
    modifier: null
  },
  ProgramGuide: {
    usbPage: 12,
    usb: 141,
    evdev: 362,
    xkb: 370,
    win: 0,
    mac: 65535,
    code: null,
    id: "ProgramGuide",
    modifier: null
  },
  Exit: {
    usbPage: 12,
    usb: 148,
    evdev: 174,
    xkb: 182,
    win: 0,
    mac: 65535,
    code: null,
    id: "Exit",
    modifier: null
  },
  ChannelUp: {
    usbPage: 12,
    usb: 156,
    evdev: 410,
    xkb: 418,
    win: 0,
    mac: 65535,
    code: null,
    id: "ChannelUp",
    modifier: null
  },
  ChannelDown: {
    usbPage: 12,
    usb: 157,
    evdev: 411,
    xkb: 419,
    win: 0,
    mac: 65535,
    code: null,
    id: "ChannelDown",
    modifier: null
  },
  MediaPlay: {
    usbPage: 12,
    usb: 176,
    evdev: 207,
    xkb: 215,
    win: 0,
    mac: 65535,
    code: "MediaPlay",
    id: "MediaPlay",
    modifier: null
  },
  MediaRecord: {
    usbPage: 12,
    usb: 178,
    evdev: 167,
    xkb: 175,
    win: 0,
    mac: 65535,
    code: "MediaRecord",
    id: "MediaRecord",
    modifier: null
  },
  MediaFastForward: {
    usbPage: 12,
    usb: 179,
    evdev: 208,
    xkb: 216,
    win: 0,
    mac: 65535,
    code: "MediaFastForward",
    id: "MediaFastForward",
    modifier: null
  },
  MediaRewind: {
    usbPage: 12,
    usb: 180,
    evdev: 168,
    xkb: 176,
    win: 0,
    mac: 65535,
    code: "MediaRewind",
    id: "MediaRewind",
    modifier: null
  },
  MediaTrackNext: {
    usbPage: 12,
    usb: 181,
    evdev: 163,
    xkb: 171,
    win: 57369,
    mac: 65535,
    code: "MediaTrackNext",
    id: "MediaTrackNext",
    modifier: null
  },
  MediaTrackPrevious: {
    usbPage: 12,
    usb: 182,
    evdev: 165,
    xkb: 173,
    win: 57360,
    mac: 65535,
    code: "MediaTrackPrevious",
    id: "MediaTrackPrevious",
    modifier: null
  },
  MediaStop: {
    usbPage: 12,
    usb: 183,
    evdev: 166,
    xkb: 174,
    win: 57380,
    mac: 65535,
    code: "MediaStop",
    id: "MediaStop",
    modifier: null
  },
  Eject: {
    usbPage: 12,
    usb: 184,
    evdev: 161,
    xkb: 169,
    win: 57388,
    mac: 65535,
    code: "Eject",
    id: "Eject",
    modifier: null
  },
  MediaPlayPause: {
    usbPage: 12,
    usb: 205,
    evdev: 164,
    xkb: 172,
    win: 57378,
    mac: 65535,
    code: "MediaPlayPause",
    id: "MediaPlayPause",
    modifier: null
  },
  SpeechInputToggle: {
    usbPage: 12,
    usb: 207,
    evdev: 582,
    xkb: 590,
    win: 0,
    mac: 65535,
    code: null,
    id: "SpeechInputToggle",
    modifier: null
  },
  BassBoost: {
    usbPage: 12,
    usb: 229,
    evdev: 209,
    xkb: 217,
    win: 0,
    mac: 65535,
    code: null,
    id: "BassBoost",
    modifier: null
  },
  MediaSelect: {
    usbPage: 12,
    usb: 387,
    evdev: 171,
    xkb: 179,
    win: 57453,
    mac: 65535,
    code: "MediaSelect",
    id: "MediaSelect",
    modifier: null
  },
  LaunchWordProcessor: {
    usbPage: 12,
    usb: 388,
    evdev: 421,
    xkb: 429,
    win: 0,
    mac: 65535,
    code: null,
    id: "LaunchWordProcessor",
    modifier: null
  },
  LaunchSpreadsheet: {
    usbPage: 12,
    usb: 390,
    evdev: 423,
    xkb: 431,
    win: 0,
    mac: 65535,
    code: null,
    id: "LaunchSpreadsheet",
    modifier: null
  },
  LaunchMail: {
    usbPage: 12,
    usb: 394,
    evdev: 155,
    xkb: 163,
    win: 57452,
    mac: 65535,
    code: "LaunchMail",
    id: "LaunchMail",
    modifier: null
  },
  LaunchContacts: {
    usbPage: 12,
    usb: 397,
    evdev: 429,
    xkb: 437,
    win: 0,
    mac: 65535,
    code: null,
    id: "LaunchContacts",
    modifier: null
  },
  LaunchCalendar: {
    usbPage: 12,
    usb: 398,
    evdev: 397,
    xkb: 405,
    win: 0,
    mac: 65535,
    code: null,
    id: "LaunchCalendar",
    modifier: null
  },
  LaunchApp2: {
    usbPage: 12,
    usb: 402,
    evdev: 140,
    xkb: 148,
    win: 57377,
    mac: 65535,
    code: "LaunchApp2",
    id: "LaunchApp2",
    modifier: null
  },
  LaunchApp1: {
    usbPage: 12,
    usb: 404,
    evdev: 144,
    xkb: 152,
    win: 57451,
    mac: 65535,
    code: "LaunchApp1",
    id: "LaunchApp1",
    modifier: null
  },
  LaunchInternetBrowser: {
    usbPage: 12,
    usb: 406,
    evdev: 150,
    xkb: 158,
    win: 0,
    mac: 65535,
    code: null,
    id: "LaunchInternetBrowser",
    modifier: null
  },
  LogOff: {
    usbPage: 12,
    usb: 412,
    evdev: 433,
    xkb: 441,
    win: 0,
    mac: 65535,
    code: null,
    id: "LogOff",
    modifier: null
  },
  LockScreen: {
    usbPage: 12,
    usb: 414,
    evdev: 152,
    xkb: 160,
    win: 0,
    mac: 65535,
    code: null,
    id: "LockScreen",
    modifier: null
  },
  LaunchControlPanel: {
    usbPage: 12,
    usb: 415,
    evdev: 579,
    xkb: 587,
    win: 0,
    mac: 65535,
    code: "LaunchControlPanel",
    id: "LaunchControlPanel",
    modifier: null
  },
  SelectTask: {
    usbPage: 12,
    usb: 418,
    evdev: 580,
    xkb: 588,
    win: 0,
    mac: 65535,
    code: "SelectTask",
    id: "SelectTask",
    modifier: null
  },
  LaunchDocuments: {
    usbPage: 12,
    usb: 423,
    evdev: 235,
    xkb: 243,
    win: 0,
    mac: 65535,
    code: null,
    id: "LaunchDocuments",
    modifier: null
  },
  SpellCheck: {
    usbPage: 12,
    usb: 427,
    evdev: 432,
    xkb: 440,
    win: 0,
    mac: 65535,
    code: null,
    id: "SpellCheck",
    modifier: null
  },
  LaunchKeyboardLayout: {
    usbPage: 12,
    usb: 430,
    evdev: 374,
    xkb: 382,
    win: 0,
    mac: 65535,
    code: null,
    id: "LaunchKeyboardLayout",
    modifier: null
  },
  LaunchScreenSaver: {
    usbPage: 12,
    usb: 433,
    evdev: 581,
    xkb: 589,
    win: 0,
    mac: 65535,
    code: "LaunchScreenSaver",
    id: "LaunchScreenSaver",
    modifier: null
  },
  LaunchAssistant: {
    usbPage: 12,
    usb: 459,
    evdev: 583,
    xkb: 591,
    win: 0,
    mac: 65535,
    code: "LaunchAssistant",
    id: "LaunchAssistant",
    modifier: null
  },
  LaunchAudioBrowser: {
    usbPage: 12,
    usb: 439,
    evdev: 392,
    xkb: 400,
    win: 0,
    mac: 65535,
    code: null,
    id: "LaunchAudioBrowser",
    modifier: null
  },
  New: {
    usbPage: 12,
    usb: 513,
    evdev: 181,
    xkb: 189,
    win: 0,
    mac: 65535,
    code: null,
    id: "New",
    modifier: null
  },
  Close: {
    usbPage: 12,
    usb: 515,
    evdev: 206,
    xkb: 214,
    win: 0,
    mac: 65535,
    code: null,
    id: "Close",
    modifier: null
  },
  Save: {
    usbPage: 12,
    usb: 519,
    evdev: 234,
    xkb: 242,
    win: 0,
    mac: 65535,
    code: null,
    id: "Save",
    modifier: null
  },
  Print: {
    usbPage: 12,
    usb: 520,
    evdev: 210,
    xkb: 218,
    win: 0,
    mac: 65535,
    code: null,
    id: "Print",
    modifier: null
  },
  BrowserSearch: {
    usbPage: 12,
    usb: 545,
    evdev: 217,
    xkb: 225,
    win: 57445,
    mac: 65535,
    code: "BrowserSearch",
    id: "BrowserSearch",
    modifier: null
  },
  BrowserHome: {
    usbPage: 12,
    usb: 547,
    evdev: 172,
    xkb: 180,
    win: 57394,
    mac: 65535,
    code: "BrowserHome",
    id: "BrowserHome",
    modifier: null
  },
  BrowserBack: {
    usbPage: 12,
    usb: 548,
    evdev: 158,
    xkb: 166,
    win: 57450,
    mac: 65535,
    code: "BrowserBack",
    id: "BrowserBack",
    modifier: null
  },
  BrowserForward: {
    usbPage: 12,
    usb: 549,
    evdev: 159,
    xkb: 167,
    win: 57449,
    mac: 65535,
    code: "BrowserForward",
    id: "BrowserForward",
    modifier: null
  },
  BrowserStop: {
    usbPage: 12,
    usb: 550,
    evdev: 128,
    xkb: 136,
    win: 57448,
    mac: 65535,
    code: "BrowserStop",
    id: "BrowserStop",
    modifier: null
  },
  BrowserRefresh: {
    usbPage: 12,
    usb: 551,
    evdev: 173,
    xkb: 181,
    win: 57447,
    mac: 65535,
    code: "BrowserRefresh",
    id: "BrowserRefresh",
    modifier: null
  },
  BrowserFavorites: {
    usbPage: 12,
    usb: 554,
    evdev: 156,
    xkb: 164,
    win: 57446,
    mac: 65535,
    code: "BrowserFavorites",
    id: "BrowserFavorites",
    modifier: null
  },
  ZoomIn: {
    usbPage: 12,
    usb: 557,
    evdev: 418,
    xkb: 426,
    win: 0,
    mac: 65535,
    code: null,
    id: "ZoomIn",
    modifier: null
  },
  ZoomOut: {
    usbPage: 12,
    usb: 558,
    evdev: 419,
    xkb: 427,
    win: 0,
    mac: 65535,
    code: null,
    id: "ZoomOut",
    modifier: null
  },
  ZoomToggle: {
    usbPage: 12,
    usb: 562,
    evdev: 372,
    xkb: 380,
    win: 0,
    mac: 65535,
    code: "ZoomToggle",
    id: "ZoomToggle",
    modifier: null
  },
  Redo: {
    usbPage: 12,
    usb: 633,
    evdev: 182,
    xkb: 190,
    win: 0,
    mac: 65535,
    code: null,
    id: "Redo",
    modifier: null
  },
  MailReply: {
    usbPage: 12,
    usb: 649,
    evdev: 232,
    xkb: 240,
    win: 0,
    mac: 65535,
    code: "MailReply",
    id: "MailReply",
    modifier: null
  },
  MailForward: {
    usbPage: 12,
    usb: 651,
    evdev: 233,
    xkb: 241,
    win: 0,
    mac: 65535,
    code: "MailForward",
    id: "MailForward",
    modifier: null
  },
  MailSend: {
    usbPage: 12,
    usb: 652,
    evdev: 231,
    xkb: 239,
    win: 0,
    mac: 65535,
    code: "MailSend",
    id: "MailSend",
    modifier: null
  },
  KeyboardLayoutSelect: {
    usbPage: 12,
    usb: 669,
    evdev: 584,
    xkb: 592,
    win: 0,
    mac: 65535,
    code: "KeyboardLayoutSelect",
    id: "KeyboardLayoutSelect",
    modifier: null
  },
  ShowAllWindows: {
    usbPage: 12,
    usb: 671,
    evdev: 120,
    xkb: 128,
    win: 0,
    mac: 65535,
    code: "ShowAllWindows",
    id: "ShowAllWindows",
    modifier: null
  }
};
var keyMapsByUsb = {
  "0:0": keyMaps.None,
  "0:16": keyMaps.Hyper,
  "0:17": keyMaps.Super,
  "0:18": keyMaps.Fn,
  "0:19": keyMaps.FnLock,
  "0:20": keyMaps.Suspend,
  "0:21": keyMaps.Resume,
  "0:22": keyMaps.Turbo,
  "1:130": keyMaps.Sleep,
  "1:131": keyMaps.WakeUp,
  "1:181": keyMaps.DisplayToggleIntExt,
  "7:0": keyMaps.UsbReserved,
  "7:1": keyMaps.UsbErrorRollOver,
  "7:2": keyMaps.UsbPostFail,
  "7:3": keyMaps.UsbErrorUndefined,
  "7:4": keyMaps.UsA,
  "7:5": keyMaps.UsB,
  "7:6": keyMaps.UsC,
  "7:7": keyMaps.UsD,
  "7:8": keyMaps.UsE,
  "7:9": keyMaps.UsF,
  "7:10": keyMaps.UsG,
  "7:11": keyMaps.UsH,
  "7:12": keyMaps.UsI,
  "7:13": keyMaps.UsJ,
  "7:14": keyMaps.UsK,
  "7:15": keyMaps.UsL,
  "7:16": keyMaps.UsM,
  "7:17": keyMaps.UsN,
  "7:18": keyMaps.UsO,
  "7:19": keyMaps.UsP,
  "7:20": keyMaps.UsQ,
  "7:21": keyMaps.UsR,
  "7:22": keyMaps.UsS,
  "7:23": keyMaps.UsT,
  "7:24": keyMaps.UsU,
  "7:25": keyMaps.UsV,
  "7:26": keyMaps.UsW,
  "7:27": keyMaps.UsX,
  "7:28": keyMaps.UsY,
  "7:29": keyMaps.UsZ,
  "7:30": keyMaps.Digit1,
  "7:31": keyMaps.Digit2,
  "7:32": keyMaps.Digit3,
  "7:33": keyMaps.Digit4,
  "7:34": keyMaps.Digit5,
  "7:35": keyMaps.Digit6,
  "7:36": keyMaps.Digit7,
  "7:37": keyMaps.Digit8,
  "7:38": keyMaps.Digit9,
  "7:39": keyMaps.Digit0,
  "7:40": keyMaps.Enter,
  "7:41": keyMaps.Escape,
  "7:42": keyMaps.Backspace,
  "7:43": keyMaps.Tab,
  "7:44": keyMaps.Space,
  "7:45": keyMaps.Minus,
  "7:46": keyMaps.Equal,
  "7:47": keyMaps.BracketLeft,
  "7:48": keyMaps.BracketRight,
  "7:49": keyMaps.Backslash,
  "7:50": keyMaps.IntlHash,
  "7:51": keyMaps.Semicolon,
  "7:52": keyMaps.Quote,
  "7:53": keyMaps.Backquote,
  "7:54": keyMaps.Comma,
  "7:55": keyMaps.Period,
  "7:56": keyMaps.Slash,
  "7:57": keyMaps.CapsLock,
  "7:58": keyMaps.F1,
  "7:59": keyMaps.F2,
  "7:60": keyMaps.F3,
  "7:61": keyMaps.F4,
  "7:62": keyMaps.F5,
  "7:63": keyMaps.F6,
  "7:64": keyMaps.F7,
  "7:65": keyMaps.F8,
  "7:66": keyMaps.F9,
  "7:67": keyMaps.F10,
  "7:68": keyMaps.F11,
  "7:69": keyMaps.F12,
  "7:70": keyMaps.PrintScreen,
  "7:71": keyMaps.ScrollLock,
  "7:72": keyMaps.Pause,
  "7:73": keyMaps.Insert,
  "7:74": keyMaps.Home,
  "7:75": keyMaps.PageUp,
  "7:76": keyMaps.Del,
  "7:77": keyMaps.End,
  "7:78": keyMaps.PageDown,
  "7:79": keyMaps.ArrowRight,
  "7:80": keyMaps.ArrowLeft,
  "7:81": keyMaps.ArrowDown,
  "7:82": keyMaps.ArrowUp,
  "7:83": keyMaps.NumLock,
  "7:84": keyMaps.NumpadDivide,
  "7:85": keyMaps.NumpadMultiply,
  "7:86": keyMaps.NumpadSubtract,
  "7:87": keyMaps.NumpadAdd,
  "7:88": keyMaps.NumpadEnter,
  "7:89": keyMaps.Numpad1,
  "7:90": keyMaps.Numpad2,
  "7:91": keyMaps.Numpad3,
  "7:92": keyMaps.Numpad4,
  "7:93": keyMaps.Numpad5,
  "7:94": keyMaps.Numpad6,
  "7:95": keyMaps.Numpad7,
  "7:96": keyMaps.Numpad8,
  "7:97": keyMaps.Numpad9,
  "7:98": keyMaps.Numpad0,
  "7:99": keyMaps.NumpadDecimal,
  "7:100": keyMaps.IntlBackslash,
  "7:101": keyMaps.ContextMenu,
  "7:102": keyMaps.Power,
  "7:103": keyMaps.NumpadEqual,
  "7:104": keyMaps.F13,
  "7:105": keyMaps.F14,
  "7:106": keyMaps.F15,
  "7:107": keyMaps.F16,
  "7:108": keyMaps.F17,
  "7:109": keyMaps.F18,
  "7:110": keyMaps.F19,
  "7:111": keyMaps.F20,
  "7:112": keyMaps.F21,
  "7:113": keyMaps.F22,
  "7:114": keyMaps.F23,
  "7:115": keyMaps.F24,
  "7:116": keyMaps.Open,
  "7:117": keyMaps.Help,
  "7:119": keyMaps.Select,
  "7:121": keyMaps.Again,
  "7:122": keyMaps.Undo,
  "7:123": keyMaps.Cut,
  "7:124": keyMaps.Copy,
  "7:125": keyMaps.Paste,
  "7:126": keyMaps.Find,
  "7:127": keyMaps.VolumeMute,
  "7:128": keyMaps.VolumeUp,
  "7:129": keyMaps.VolumeDown,
  "7:133": keyMaps.NumpadComma,
  "7:135": keyMaps.IntlRo,
  "7:136": keyMaps.KanaMode,
  "7:137": keyMaps.IntlYen,
  "7:138": keyMaps.Convert,
  "7:139": keyMaps.NonConvert,
  "7:144": keyMaps.Lang1,
  "7:145": keyMaps.Lang2,
  "7:146": keyMaps.Lang3,
  "7:147": keyMaps.Lang4,
  "7:148": keyMaps.Lang5,
  "7:155": keyMaps.Abort,
  "7:163": keyMaps.Props,
  "7:182": keyMaps.NumpadParenLeft,
  "7:183": keyMaps.NumpadParenRight,
  "7:187": keyMaps.NumpadBackspace,
  "7:208": keyMaps.NumpadMemoryStore,
  "7:209": keyMaps.NumpadMemoryRecall,
  "7:210": keyMaps.NumpadMemoryClear,
  "7:211": keyMaps.NumpadMemoryAdd,
  "7:212": keyMaps.NumpadMemorySubtract,
  "7:215": keyMaps.NumpadSignChange,
  "7:216": keyMaps.NumpadClear,
  "7:217": keyMaps.NumpadClearEntry,
  "7:224": keyMaps.ControlLeft,
  "7:225": keyMaps.ShiftLeft,
  "7:226": keyMaps.AltLeft,
  "7:227": keyMaps.MetaLeft,
  "7:228": keyMaps.ControlRight,
  "7:229": keyMaps.ShiftRight,
  "7:230": keyMaps.AltRight,
  "7:231": keyMaps.MetaRight,
  "12:96": keyMaps.Info,
  "12:97": keyMaps.ClosedCaptionToggle,
  "12:111": keyMaps.BrightnessUp,
  "12:112": keyMaps.BrightnessDown,
  "12:114": keyMaps.BrightnessToggle,
  "12:115": keyMaps.BrightnessMinimium,
  "12:116": keyMaps.BrightnessMaximum,
  "12:117": keyMaps.BrightnessAuto,
  "12:131": keyMaps.MediaLast,
  "12:140": keyMaps.LaunchPhone,
  "12:141": keyMaps.ProgramGuide,
  "12:148": keyMaps.Exit,
  "12:156": keyMaps.ChannelUp,
  "12:157": keyMaps.ChannelDown,
  "12:176": keyMaps.MediaPlay,
  "12:178": keyMaps.MediaRecord,
  "12:179": keyMaps.MediaFastForward,
  "12:180": keyMaps.MediaRewind,
  "12:181": keyMaps.MediaTrackNext,
  "12:182": keyMaps.MediaTrackPrevious,
  "12:183": keyMaps.MediaStop,
  "12:184": keyMaps.Eject,
  "12:205": keyMaps.MediaPlayPause,
  "12:207": keyMaps.SpeechInputToggle,
  "12:229": keyMaps.BassBoost,
  "12:387": keyMaps.MediaSelect,
  "12:388": keyMaps.LaunchWordProcessor,
  "12:390": keyMaps.LaunchSpreadsheet,
  "12:394": keyMaps.LaunchMail,
  "12:397": keyMaps.LaunchContacts,
  "12:398": keyMaps.LaunchCalendar,
  "12:402": keyMaps.LaunchApp2,
  "12:404": keyMaps.LaunchApp1,
  "12:406": keyMaps.LaunchInternetBrowser,
  "12:412": keyMaps.LogOff,
  "12:414": keyMaps.LockScreen,
  "12:415": keyMaps.LaunchControlPanel,
  "12:418": keyMaps.SelectTask,
  "12:423": keyMaps.LaunchDocuments,
  "12:427": keyMaps.SpellCheck,
  "12:430": keyMaps.LaunchKeyboardLayout,
  "12:433": keyMaps.LaunchScreenSaver,
  "12:459": keyMaps.LaunchAssistant,
  "12:439": keyMaps.LaunchAudioBrowser,
  "12:513": keyMaps.New,
  "12:515": keyMaps.Close,
  "12:519": keyMaps.Save,
  "12:520": keyMaps.Print,
  "12:545": keyMaps.BrowserSearch,
  "12:547": keyMaps.BrowserHome,
  "12:548": keyMaps.BrowserBack,
  "12:549": keyMaps.BrowserForward,
  "12:550": keyMaps.BrowserStop,
  "12:551": keyMaps.BrowserRefresh,
  "12:554": keyMaps.BrowserFavorites,
  "12:557": keyMaps.ZoomIn,
  "12:558": keyMaps.ZoomOut,
  "12:562": keyMaps.ZoomToggle,
  "12:633": keyMaps.Redo,
  "12:649": keyMaps.MailReply,
  "12:651": keyMaps.MailForward,
  "12:652": keyMaps.MailSend,
  "12:669": keyMaps.KeyboardLayoutSelect,
  "12:671": keyMaps.ShowAllWindows
};
var keyMapsByEvdev = {
  "0": keyMaps.None,
  "142": keyMaps.Sleep,
  "143": keyMaps.WakeUp,
  "227": keyMaps.DisplayToggleIntExt,
  "30": keyMaps.UsA,
  "48": keyMaps.UsB,
  "46": keyMaps.UsC,
  "32": keyMaps.UsD,
  "18": keyMaps.UsE,
  "33": keyMaps.UsF,
  "34": keyMaps.UsG,
  "35": keyMaps.UsH,
  "23": keyMaps.UsI,
  "36": keyMaps.UsJ,
  "37": keyMaps.UsK,
  "38": keyMaps.UsL,
  "50": keyMaps.UsM,
  "49": keyMaps.UsN,
  "24": keyMaps.UsO,
  "25": keyMaps.UsP,
  "16": keyMaps.UsQ,
  "19": keyMaps.UsR,
  "31": keyMaps.UsS,
  "20": keyMaps.UsT,
  "22": keyMaps.UsU,
  "47": keyMaps.UsV,
  "17": keyMaps.UsW,
  "45": keyMaps.UsX,
  "21": keyMaps.UsY,
  "44": keyMaps.UsZ,
  "2": keyMaps.Digit1,
  "3": keyMaps.Digit2,
  "4": keyMaps.Digit3,
  "5": keyMaps.Digit4,
  "6": keyMaps.Digit5,
  "7": keyMaps.Digit6,
  "8": keyMaps.Digit7,
  "9": keyMaps.Digit8,
  "10": keyMaps.Digit9,
  "11": keyMaps.Digit0,
  "28": keyMaps.Enter,
  "1": keyMaps.Escape,
  "14": keyMaps.Backspace,
  "15": keyMaps.Tab,
  "57": keyMaps.Space,
  "12": keyMaps.Minus,
  "13": keyMaps.Equal,
  "26": keyMaps.BracketLeft,
  "27": keyMaps.BracketRight,
  "43": keyMaps.Backslash,
  "39": keyMaps.Semicolon,
  "40": keyMaps.Quote,
  "41": keyMaps.Backquote,
  "51": keyMaps.Comma,
  "52": keyMaps.Period,
  "53": keyMaps.Slash,
  "58": keyMaps.CapsLock,
  "59": keyMaps.F1,
  "60": keyMaps.F2,
  "61": keyMaps.F3,
  "62": keyMaps.F4,
  "63": keyMaps.F5,
  "64": keyMaps.F6,
  "65": keyMaps.F7,
  "66": keyMaps.F8,
  "67": keyMaps.F9,
  "68": keyMaps.F10,
  "87": keyMaps.F11,
  "88": keyMaps.F12,
  "99": keyMaps.PrintScreen,
  "70": keyMaps.ScrollLock,
  "119": keyMaps.Pause,
  "110": keyMaps.Insert,
  "102": keyMaps.Home,
  "104": keyMaps.PageUp,
  "111": keyMaps.Del,
  "107": keyMaps.End,
  "109": keyMaps.PageDown,
  "106": keyMaps.ArrowRight,
  "105": keyMaps.ArrowLeft,
  "108": keyMaps.ArrowDown,
  "103": keyMaps.ArrowUp,
  "69": keyMaps.NumLock,
  "98": keyMaps.NumpadDivide,
  "55": keyMaps.NumpadMultiply,
  "74": keyMaps.NumpadSubtract,
  "78": keyMaps.NumpadAdd,
  "96": keyMaps.NumpadEnter,
  "79": keyMaps.Numpad1,
  "80": keyMaps.Numpad2,
  "81": keyMaps.Numpad3,
  "75": keyMaps.Numpad4,
  "76": keyMaps.Numpad5,
  "77": keyMaps.Numpad6,
  "71": keyMaps.Numpad7,
  "72": keyMaps.Numpad8,
  "73": keyMaps.Numpad9,
  "82": keyMaps.Numpad0,
  "83": keyMaps.NumpadDecimal,
  "86": keyMaps.IntlBackslash,
  "127": keyMaps.ContextMenu,
  "116": keyMaps.Power,
  "117": keyMaps.NumpadEqual,
  "183": keyMaps.F13,
  "184": keyMaps.F14,
  "185": keyMaps.F15,
  "186": keyMaps.F16,
  "187": keyMaps.F17,
  "188": keyMaps.F18,
  "189": keyMaps.F19,
  "190": keyMaps.F20,
  "191": keyMaps.F21,
  "192": keyMaps.F22,
  "193": keyMaps.F23,
  "194": keyMaps.F24,
  "134": keyMaps.Open,
  "138": keyMaps.Help,
  "132": keyMaps.Select,
  "129": keyMaps.Again,
  "131": keyMaps.Undo,
  "137": keyMaps.Cut,
  "133": keyMaps.Copy,
  "135": keyMaps.Paste,
  "136": keyMaps.Find,
  "113": keyMaps.VolumeMute,
  "115": keyMaps.VolumeUp,
  "114": keyMaps.VolumeDown,
  "121": keyMaps.NumpadComma,
  "89": keyMaps.IntlRo,
  "93": keyMaps.KanaMode,
  "124": keyMaps.IntlYen,
  "92": keyMaps.Convert,
  "94": keyMaps.NonConvert,
  "122": keyMaps.Lang1,
  "123": keyMaps.Lang2,
  "90": keyMaps.Lang3,
  "91": keyMaps.Lang4,
  "85": keyMaps.Lang5,
  "179": keyMaps.NumpadParenLeft,
  "180": keyMaps.NumpadParenRight,
  "118": keyMaps.NumpadSignChange,
  "29": keyMaps.ControlLeft,
  "42": keyMaps.ShiftLeft,
  "56": keyMaps.AltLeft,
  "125": keyMaps.MetaLeft,
  "97": keyMaps.ControlRight,
  "54": keyMaps.ShiftRight,
  "100": keyMaps.AltRight,
  "126": keyMaps.MetaRight,
  "358": keyMaps.Info,
  "370": keyMaps.ClosedCaptionToggle,
  "225": keyMaps.BrightnessUp,
  "224": keyMaps.BrightnessDown,
  "431": keyMaps.BrightnessToggle,
  "592": keyMaps.BrightnessMinimium,
  "593": keyMaps.BrightnessMaximum,
  "244": keyMaps.BrightnessAuto,
  "405": keyMaps.MediaLast,
  "169": keyMaps.LaunchPhone,
  "362": keyMaps.ProgramGuide,
  "174": keyMaps.Exit,
  "410": keyMaps.ChannelUp,
  "411": keyMaps.ChannelDown,
  "207": keyMaps.MediaPlay,
  "167": keyMaps.MediaRecord,
  "208": keyMaps.MediaFastForward,
  "168": keyMaps.MediaRewind,
  "163": keyMaps.MediaTrackNext,
  "165": keyMaps.MediaTrackPrevious,
  "166": keyMaps.MediaStop,
  "161": keyMaps.Eject,
  "164": keyMaps.MediaPlayPause,
  "582": keyMaps.SpeechInputToggle,
  "209": keyMaps.BassBoost,
  "171": keyMaps.MediaSelect,
  "421": keyMaps.LaunchWordProcessor,
  "423": keyMaps.LaunchSpreadsheet,
  "155": keyMaps.LaunchMail,
  "429": keyMaps.LaunchContacts,
  "397": keyMaps.LaunchCalendar,
  "140": keyMaps.LaunchApp2,
  "144": keyMaps.LaunchApp1,
  "150": keyMaps.LaunchInternetBrowser,
  "433": keyMaps.LogOff,
  "152": keyMaps.LockScreen,
  "579": keyMaps.LaunchControlPanel,
  "580": keyMaps.SelectTask,
  "235": keyMaps.LaunchDocuments,
  "432": keyMaps.SpellCheck,
  "374": keyMaps.LaunchKeyboardLayout,
  "581": keyMaps.LaunchScreenSaver,
  "583": keyMaps.LaunchAssistant,
  "392": keyMaps.LaunchAudioBrowser,
  "181": keyMaps.New,
  "206": keyMaps.Close,
  "234": keyMaps.Save,
  "210": keyMaps.Print,
  "217": keyMaps.BrowserSearch,
  "172": keyMaps.BrowserHome,
  "158": keyMaps.BrowserBack,
  "159": keyMaps.BrowserForward,
  "128": keyMaps.BrowserStop,
  "173": keyMaps.BrowserRefresh,
  "156": keyMaps.BrowserFavorites,
  "418": keyMaps.ZoomIn,
  "419": keyMaps.ZoomOut,
  "372": keyMaps.ZoomToggle,
  "182": keyMaps.Redo,
  "232": keyMaps.MailReply,
  "233": keyMaps.MailForward,
  "231": keyMaps.MailSend,
  "584": keyMaps.KeyboardLayoutSelect,
  "120": keyMaps.ShowAllWindows
};
var keyMapsByXkb = {
  "0": keyMaps.None,
  "150": keyMaps.Sleep,
  "151": keyMaps.WakeUp,
  "235": keyMaps.DisplayToggleIntExt,
  "38": keyMaps.UsA,
  "56": keyMaps.UsB,
  "54": keyMaps.UsC,
  "40": keyMaps.UsD,
  "26": keyMaps.UsE,
  "41": keyMaps.UsF,
  "42": keyMaps.UsG,
  "43": keyMaps.UsH,
  "31": keyMaps.UsI,
  "44": keyMaps.UsJ,
  "45": keyMaps.UsK,
  "46": keyMaps.UsL,
  "58": keyMaps.UsM,
  "57": keyMaps.UsN,
  "32": keyMaps.UsO,
  "33": keyMaps.UsP,
  "24": keyMaps.UsQ,
  "27": keyMaps.UsR,
  "39": keyMaps.UsS,
  "28": keyMaps.UsT,
  "30": keyMaps.UsU,
  "55": keyMaps.UsV,
  "25": keyMaps.UsW,
  "53": keyMaps.UsX,
  "29": keyMaps.UsY,
  "52": keyMaps.UsZ,
  "10": keyMaps.Digit1,
  "11": keyMaps.Digit2,
  "12": keyMaps.Digit3,
  "13": keyMaps.Digit4,
  "14": keyMaps.Digit5,
  "15": keyMaps.Digit6,
  "16": keyMaps.Digit7,
  "17": keyMaps.Digit8,
  "18": keyMaps.Digit9,
  "19": keyMaps.Digit0,
  "36": keyMaps.Enter,
  "9": keyMaps.Escape,
  "22": keyMaps.Backspace,
  "23": keyMaps.Tab,
  "65": keyMaps.Space,
  "20": keyMaps.Minus,
  "21": keyMaps.Equal,
  "34": keyMaps.BracketLeft,
  "35": keyMaps.BracketRight,
  "51": keyMaps.Backslash,
  "47": keyMaps.Semicolon,
  "48": keyMaps.Quote,
  "49": keyMaps.Backquote,
  "59": keyMaps.Comma,
  "60": keyMaps.Period,
  "61": keyMaps.Slash,
  "66": keyMaps.CapsLock,
  "67": keyMaps.F1,
  "68": keyMaps.F2,
  "69": keyMaps.F3,
  "70": keyMaps.F4,
  "71": keyMaps.F5,
  "72": keyMaps.F6,
  "73": keyMaps.F7,
  "74": keyMaps.F8,
  "75": keyMaps.F9,
  "76": keyMaps.F10,
  "95": keyMaps.F11,
  "96": keyMaps.F12,
  "107": keyMaps.PrintScreen,
  "78": keyMaps.ScrollLock,
  "127": keyMaps.Pause,
  "118": keyMaps.Insert,
  "110": keyMaps.Home,
  "112": keyMaps.PageUp,
  "119": keyMaps.Del,
  "115": keyMaps.End,
  "117": keyMaps.PageDown,
  "114": keyMaps.ArrowRight,
  "113": keyMaps.ArrowLeft,
  "116": keyMaps.ArrowDown,
  "111": keyMaps.ArrowUp,
  "77": keyMaps.NumLock,
  "106": keyMaps.NumpadDivide,
  "63": keyMaps.NumpadMultiply,
  "82": keyMaps.NumpadSubtract,
  "86": keyMaps.NumpadAdd,
  "104": keyMaps.NumpadEnter,
  "87": keyMaps.Numpad1,
  "88": keyMaps.Numpad2,
  "89": keyMaps.Numpad3,
  "83": keyMaps.Numpad4,
  "84": keyMaps.Numpad5,
  "85": keyMaps.Numpad6,
  "79": keyMaps.Numpad7,
  "80": keyMaps.Numpad8,
  "81": keyMaps.Numpad9,
  "90": keyMaps.Numpad0,
  "91": keyMaps.NumpadDecimal,
  "94": keyMaps.IntlBackslash,
  "135": keyMaps.ContextMenu,
  "124": keyMaps.Power,
  "125": keyMaps.NumpadEqual,
  "191": keyMaps.F13,
  "192": keyMaps.F14,
  "193": keyMaps.F15,
  "194": keyMaps.F16,
  "195": keyMaps.F17,
  "196": keyMaps.F18,
  "197": keyMaps.F19,
  "198": keyMaps.F20,
  "199": keyMaps.F21,
  "200": keyMaps.F22,
  "201": keyMaps.F23,
  "202": keyMaps.F24,
  "142": keyMaps.Open,
  "146": keyMaps.Help,
  "140": keyMaps.Select,
  "137": keyMaps.Again,
  "139": keyMaps.Undo,
  "145": keyMaps.Cut,
  "141": keyMaps.Copy,
  "143": keyMaps.Paste,
  "144": keyMaps.Find,
  "121": keyMaps.VolumeMute,
  "123": keyMaps.VolumeUp,
  "122": keyMaps.VolumeDown,
  "129": keyMaps.NumpadComma,
  "97": keyMaps.IntlRo,
  "101": keyMaps.KanaMode,
  "132": keyMaps.IntlYen,
  "100": keyMaps.Convert,
  "102": keyMaps.NonConvert,
  "130": keyMaps.Lang1,
  "131": keyMaps.Lang2,
  "98": keyMaps.Lang3,
  "99": keyMaps.Lang4,
  "93": keyMaps.Lang5,
  "187": keyMaps.NumpadParenLeft,
  "188": keyMaps.NumpadParenRight,
  "126": keyMaps.NumpadSignChange,
  "37": keyMaps.ControlLeft,
  "50": keyMaps.ShiftLeft,
  "64": keyMaps.AltLeft,
  "133": keyMaps.MetaLeft,
  "105": keyMaps.ControlRight,
  "62": keyMaps.ShiftRight,
  "108": keyMaps.AltRight,
  "134": keyMaps.MetaRight,
  "366": keyMaps.Info,
  "378": keyMaps.ClosedCaptionToggle,
  "233": keyMaps.BrightnessUp,
  "232": keyMaps.BrightnessDown,
  "439": keyMaps.BrightnessToggle,
  "600": keyMaps.BrightnessMinimium,
  "601": keyMaps.BrightnessMaximum,
  "252": keyMaps.BrightnessAuto,
  "413": keyMaps.MediaLast,
  "177": keyMaps.LaunchPhone,
  "370": keyMaps.ProgramGuide,
  "182": keyMaps.Exit,
  "418": keyMaps.ChannelUp,
  "419": keyMaps.ChannelDown,
  "215": keyMaps.MediaPlay,
  "175": keyMaps.MediaRecord,
  "216": keyMaps.MediaFastForward,
  "176": keyMaps.MediaRewind,
  "171": keyMaps.MediaTrackNext,
  "173": keyMaps.MediaTrackPrevious,
  "174": keyMaps.MediaStop,
  "169": keyMaps.Eject,
  "172": keyMaps.MediaPlayPause,
  "590": keyMaps.SpeechInputToggle,
  "217": keyMaps.BassBoost,
  "179": keyMaps.MediaSelect,
  "429": keyMaps.LaunchWordProcessor,
  "431": keyMaps.LaunchSpreadsheet,
  "163": keyMaps.LaunchMail,
  "437": keyMaps.LaunchContacts,
  "405": keyMaps.LaunchCalendar,
  "148": keyMaps.LaunchApp2,
  "152": keyMaps.LaunchApp1,
  "158": keyMaps.LaunchInternetBrowser,
  "441": keyMaps.LogOff,
  "160": keyMaps.LockScreen,
  "587": keyMaps.LaunchControlPanel,
  "588": keyMaps.SelectTask,
  "243": keyMaps.LaunchDocuments,
  "440": keyMaps.SpellCheck,
  "382": keyMaps.LaunchKeyboardLayout,
  "589": keyMaps.LaunchScreenSaver,
  "591": keyMaps.LaunchAssistant,
  "400": keyMaps.LaunchAudioBrowser,
  "189": keyMaps.New,
  "214": keyMaps.Close,
  "242": keyMaps.Save,
  "218": keyMaps.Print,
  "225": keyMaps.BrowserSearch,
  "180": keyMaps.BrowserHome,
  "166": keyMaps.BrowserBack,
  "167": keyMaps.BrowserForward,
  "136": keyMaps.BrowserStop,
  "181": keyMaps.BrowserRefresh,
  "164": keyMaps.BrowserFavorites,
  "426": keyMaps.ZoomIn,
  "427": keyMaps.ZoomOut,
  "380": keyMaps.ZoomToggle,
  "190": keyMaps.Redo,
  "240": keyMaps.MailReply,
  "241": keyMaps.MailForward,
  "239": keyMaps.MailSend,
  "592": keyMaps.KeyboardLayoutSelect,
  "128": keyMaps.ShowAllWindows
};
var keyMapsByWin = {
  "0": keyMaps.None,
  "57439": keyMaps.Sleep,
  "57443": keyMaps.WakeUp,
  "255": keyMaps.UsbErrorRollOver,
  "252": keyMaps.UsbPostFail,
  "30": keyMaps.UsA,
  "48": keyMaps.UsB,
  "46": keyMaps.UsC,
  "32": keyMaps.UsD,
  "18": keyMaps.UsE,
  "33": keyMaps.UsF,
  "34": keyMaps.UsG,
  "35": keyMaps.UsH,
  "23": keyMaps.UsI,
  "36": keyMaps.UsJ,
  "37": keyMaps.UsK,
  "38": keyMaps.UsL,
  "50": keyMaps.UsM,
  "49": keyMaps.UsN,
  "24": keyMaps.UsO,
  "25": keyMaps.UsP,
  "16": keyMaps.UsQ,
  "19": keyMaps.UsR,
  "31": keyMaps.UsS,
  "20": keyMaps.UsT,
  "22": keyMaps.UsU,
  "47": keyMaps.UsV,
  "17": keyMaps.UsW,
  "45": keyMaps.UsX,
  "21": keyMaps.UsY,
  "44": keyMaps.UsZ,
  "2": keyMaps.Digit1,
  "3": keyMaps.Digit2,
  "4": keyMaps.Digit3,
  "5": keyMaps.Digit4,
  "6": keyMaps.Digit5,
  "7": keyMaps.Digit6,
  "8": keyMaps.Digit7,
  "9": keyMaps.Digit8,
  "10": keyMaps.Digit9,
  "11": keyMaps.Digit0,
  "28": keyMaps.Enter,
  "1": keyMaps.Escape,
  "14": keyMaps.Backspace,
  "15": keyMaps.Tab,
  "57": keyMaps.Space,
  "12": keyMaps.Minus,
  "13": keyMaps.Equal,
  "26": keyMaps.BracketLeft,
  "27": keyMaps.BracketRight,
  "43": keyMaps.Backslash,
  "39": keyMaps.Semicolon,
  "40": keyMaps.Quote,
  "41": keyMaps.Backquote,
  "51": keyMaps.Comma,
  "52": keyMaps.Period,
  "53": keyMaps.Slash,
  "58": keyMaps.CapsLock,
  "59": keyMaps.F1,
  "60": keyMaps.F2,
  "61": keyMaps.F3,
  "62": keyMaps.F4,
  "63": keyMaps.F5,
  "64": keyMaps.F6,
  "65": keyMaps.F7,
  "66": keyMaps.F8,
  "67": keyMaps.F9,
  "68": keyMaps.F10,
  "87": keyMaps.F11,
  "88": keyMaps.F12,
  "57399": keyMaps.PrintScreen,
  "70": keyMaps.ScrollLock,
  "69": keyMaps.Pause,
  "57426": keyMaps.Insert,
  "57415": keyMaps.Home,
  "57417": keyMaps.PageUp,
  "57427": keyMaps.Del,
  "57423": keyMaps.End,
  "57425": keyMaps.PageDown,
  "57421": keyMaps.ArrowRight,
  "57419": keyMaps.ArrowLeft,
  "57424": keyMaps.ArrowDown,
  "57416": keyMaps.ArrowUp,
  "57413": keyMaps.NumLock,
  "57397": keyMaps.NumpadDivide,
  "55": keyMaps.NumpadMultiply,
  "74": keyMaps.NumpadSubtract,
  "78": keyMaps.NumpadAdd,
  "57372": keyMaps.NumpadEnter,
  "79": keyMaps.Numpad1,
  "80": keyMaps.Numpad2,
  "81": keyMaps.Numpad3,
  "75": keyMaps.Numpad4,
  "76": keyMaps.Numpad5,
  "77": keyMaps.Numpad6,
  "71": keyMaps.Numpad7,
  "72": keyMaps.Numpad8,
  "73": keyMaps.Numpad9,
  "82": keyMaps.Numpad0,
  "83": keyMaps.NumpadDecimal,
  "86": keyMaps.IntlBackslash,
  "57437": keyMaps.ContextMenu,
  "57438": keyMaps.Power,
  "89": keyMaps.NumpadEqual,
  "100": keyMaps.F13,
  "101": keyMaps.F14,
  "102": keyMaps.F15,
  "103": keyMaps.F16,
  "104": keyMaps.F17,
  "105": keyMaps.F18,
  "106": keyMaps.F19,
  "107": keyMaps.F20,
  "108": keyMaps.F21,
  "109": keyMaps.F22,
  "110": keyMaps.F23,
  "118": keyMaps.F24,
  "57403": keyMaps.Help,
  "57352": keyMaps.Undo,
  "57367": keyMaps.Cut,
  "57368": keyMaps.Copy,
  "57354": keyMaps.Paste,
  "57376": keyMaps.VolumeMute,
  "57392": keyMaps.VolumeUp,
  "57390": keyMaps.VolumeDown,
  "126": keyMaps.NumpadComma,
  "115": keyMaps.IntlRo,
  "112": keyMaps.KanaMode,
  "125": keyMaps.IntlYen,
  "121": keyMaps.Convert,
  "123": keyMaps.NonConvert,
  "114": keyMaps.Lang1,
  "113": keyMaps.Lang2,
  "120": keyMaps.Lang3,
  "119": keyMaps.Lang4,
  "29": keyMaps.ControlLeft,
  "42": keyMaps.ShiftLeft,
  "56": keyMaps.AltLeft,
  "57435": keyMaps.MetaLeft,
  "57373": keyMaps.ControlRight,
  "54": keyMaps.ShiftRight,
  "57400": keyMaps.AltRight,
  "57436": keyMaps.MetaRight,
  "57369": keyMaps.MediaTrackNext,
  "57360": keyMaps.MediaTrackPrevious,
  "57380": keyMaps.MediaStop,
  "57388": keyMaps.Eject,
  "57378": keyMaps.MediaPlayPause,
  "57453": keyMaps.MediaSelect,
  "57452": keyMaps.LaunchMail,
  "57377": keyMaps.LaunchApp2,
  "57451": keyMaps.LaunchApp1,
  "57445": keyMaps.BrowserSearch,
  "57394": keyMaps.BrowserHome,
  "57450": keyMaps.BrowserBack,
  "57449": keyMaps.BrowserForward,
  "57448": keyMaps.BrowserStop,
  "57447": keyMaps.BrowserRefresh,
  "57446": keyMaps.BrowserFavorites
};
var keyMapsByMac = {
  "65535": keyMaps.None,
  "0": keyMaps.UsA,
  "11": keyMaps.UsB,
  "8": keyMaps.UsC,
  "2": keyMaps.UsD,
  "14": keyMaps.UsE,
  "3": keyMaps.UsF,
  "5": keyMaps.UsG,
  "4": keyMaps.UsH,
  "34": keyMaps.UsI,
  "38": keyMaps.UsJ,
  "40": keyMaps.UsK,
  "37": keyMaps.UsL,
  "46": keyMaps.UsM,
  "45": keyMaps.UsN,
  "31": keyMaps.UsO,
  "35": keyMaps.UsP,
  "12": keyMaps.UsQ,
  "15": keyMaps.UsR,
  "1": keyMaps.UsS,
  "17": keyMaps.UsT,
  "32": keyMaps.UsU,
  "9": keyMaps.UsV,
  "13": keyMaps.UsW,
  "7": keyMaps.UsX,
  "16": keyMaps.UsY,
  "6": keyMaps.UsZ,
  "18": keyMaps.Digit1,
  "19": keyMaps.Digit2,
  "20": keyMaps.Digit3,
  "21": keyMaps.Digit4,
  "23": keyMaps.Digit5,
  "22": keyMaps.Digit6,
  "26": keyMaps.Digit7,
  "28": keyMaps.Digit8,
  "25": keyMaps.Digit9,
  "29": keyMaps.Digit0,
  "36": keyMaps.Enter,
  "53": keyMaps.Escape,
  "51": keyMaps.Backspace,
  "48": keyMaps.Tab,
  "49": keyMaps.Space,
  "27": keyMaps.Minus,
  "24": keyMaps.Equal,
  "33": keyMaps.BracketLeft,
  "30": keyMaps.BracketRight,
  "42": keyMaps.Backslash,
  "41": keyMaps.Semicolon,
  "39": keyMaps.Quote,
  "50": keyMaps.Backquote,
  "43": keyMaps.Comma,
  "47": keyMaps.Period,
  "44": keyMaps.Slash,
  "57": keyMaps.CapsLock,
  "122": keyMaps.F1,
  "120": keyMaps.F2,
  "99": keyMaps.F3,
  "118": keyMaps.F4,
  "96": keyMaps.F5,
  "97": keyMaps.F6,
  "98": keyMaps.F7,
  "100": keyMaps.F8,
  "101": keyMaps.F9,
  "109": keyMaps.F10,
  "103": keyMaps.F11,
  "111": keyMaps.F12,
  "114": keyMaps.Insert,
  "115": keyMaps.Home,
  "116": keyMaps.PageUp,
  "117": keyMaps.Del,
  "119": keyMaps.End,
  "121": keyMaps.PageDown,
  "124": keyMaps.ArrowRight,
  "123": keyMaps.ArrowLeft,
  "125": keyMaps.ArrowDown,
  "126": keyMaps.ArrowUp,
  "71": keyMaps.NumLock,
  "75": keyMaps.NumpadDivide,
  "67": keyMaps.NumpadMultiply,
  "78": keyMaps.NumpadSubtract,
  "69": keyMaps.NumpadAdd,
  "76": keyMaps.NumpadEnter,
  "83": keyMaps.Numpad1,
  "84": keyMaps.Numpad2,
  "85": keyMaps.Numpad3,
  "86": keyMaps.Numpad4,
  "87": keyMaps.Numpad5,
  "88": keyMaps.Numpad6,
  "89": keyMaps.Numpad7,
  "91": keyMaps.Numpad8,
  "92": keyMaps.Numpad9,
  "82": keyMaps.Numpad0,
  "65": keyMaps.NumpadDecimal,
  "10": keyMaps.IntlBackslash,
  "110": keyMaps.ContextMenu,
  "81": keyMaps.NumpadEqual,
  "105": keyMaps.F13,
  "107": keyMaps.F14,
  "113": keyMaps.F15,
  "106": keyMaps.F16,
  "64": keyMaps.F17,
  "79": keyMaps.F18,
  "80": keyMaps.F19,
  "90": keyMaps.F20,
  "74": keyMaps.VolumeMute,
  "72": keyMaps.VolumeUp,
  "73": keyMaps.VolumeDown,
  "95": keyMaps.NumpadComma,
  "94": keyMaps.IntlRo,
  "104": keyMaps.KanaMode,
  "93": keyMaps.IntlYen,
  "59": keyMaps.ControlLeft,
  "56": keyMaps.ShiftLeft,
  "58": keyMaps.AltLeft,
  "55": keyMaps.MetaLeft,
  "62": keyMaps.ControlRight,
  "60": keyMaps.ShiftRight,
  "61": keyMaps.AltRight,
  "54": keyMaps.MetaRight
};
var keyMapsByCode = {
  Hyper: keyMaps.Hyper,
  Super: keyMaps.Super,
  Fn: keyMaps.Fn,
  FnLock: keyMaps.FnLock,
  Suspend: keyMaps.Suspend,
  Resume: keyMaps.Resume,
  Turbo: keyMaps.Turbo,
  Sleep: keyMaps.Sleep,
  WakeUp: keyMaps.WakeUp,
  DisplayToggleIntExt: keyMaps.DisplayToggleIntExt,
  KeyA: keyMaps.UsA,
  KeyB: keyMaps.UsB,
  KeyC: keyMaps.UsC,
  KeyD: keyMaps.UsD,
  KeyE: keyMaps.UsE,
  KeyF: keyMaps.UsF,
  KeyG: keyMaps.UsG,
  KeyH: keyMaps.UsH,
  KeyI: keyMaps.UsI,
  KeyJ: keyMaps.UsJ,
  KeyK: keyMaps.UsK,
  KeyL: keyMaps.UsL,
  KeyM: keyMaps.UsM,
  KeyN: keyMaps.UsN,
  KeyO: keyMaps.UsO,
  KeyP: keyMaps.UsP,
  KeyQ: keyMaps.UsQ,
  KeyR: keyMaps.UsR,
  KeyS: keyMaps.UsS,
  KeyT: keyMaps.UsT,
  KeyU: keyMaps.UsU,
  KeyV: keyMaps.UsV,
  KeyW: keyMaps.UsW,
  KeyX: keyMaps.UsX,
  KeyY: keyMaps.UsY,
  KeyZ: keyMaps.UsZ,
  Digit1: keyMaps.Digit1,
  Digit2: keyMaps.Digit2,
  Digit3: keyMaps.Digit3,
  Digit4: keyMaps.Digit4,
  Digit5: keyMaps.Digit5,
  Digit6: keyMaps.Digit6,
  Digit7: keyMaps.Digit7,
  Digit8: keyMaps.Digit8,
  Digit9: keyMaps.Digit9,
  Digit0: keyMaps.Digit0,
  Enter: keyMaps.Enter,
  Escape: keyMaps.Escape,
  Backspace: keyMaps.Backspace,
  Tab: keyMaps.Tab,
  Space: keyMaps.Space,
  Minus: keyMaps.Minus,
  Equal: keyMaps.Equal,
  BracketLeft: keyMaps.BracketLeft,
  BracketRight: keyMaps.BracketRight,
  Backslash: keyMaps.Backslash,
  IntlHash: keyMaps.IntlHash,
  Semicolon: keyMaps.Semicolon,
  Quote: keyMaps.Quote,
  Backquote: keyMaps.Backquote,
  Comma: keyMaps.Comma,
  Period: keyMaps.Period,
  Slash: keyMaps.Slash,
  CapsLock: keyMaps.CapsLock,
  F1: keyMaps.F1,
  F2: keyMaps.F2,
  F3: keyMaps.F3,
  F4: keyMaps.F4,
  F5: keyMaps.F5,
  F6: keyMaps.F6,
  F7: keyMaps.F7,
  F8: keyMaps.F8,
  F9: keyMaps.F9,
  F10: keyMaps.F10,
  F11: keyMaps.F11,
  F12: keyMaps.F12,
  PrintScreen: keyMaps.PrintScreen,
  ScrollLock: keyMaps.ScrollLock,
  Pause: keyMaps.Pause,
  Insert: keyMaps.Insert,
  Home: keyMaps.Home,
  PageUp: keyMaps.PageUp,
  Delete: keyMaps.Del,
  End: keyMaps.End,
  PageDown: keyMaps.PageDown,
  ArrowRight: keyMaps.ArrowRight,
  ArrowLeft: keyMaps.ArrowLeft,
  ArrowDown: keyMaps.ArrowDown,
  ArrowUp: keyMaps.ArrowUp,
  NumLock: keyMaps.NumLock,
  NumpadDivide: keyMaps.NumpadDivide,
  NumpadMultiply: keyMaps.NumpadMultiply,
  NumpadSubtract: keyMaps.NumpadSubtract,
  NumpadAdd: keyMaps.NumpadAdd,
  NumpadEnter: keyMaps.NumpadEnter,
  Numpad1: keyMaps.Numpad1,
  Numpad2: keyMaps.Numpad2,
  Numpad3: keyMaps.Numpad3,
  Numpad4: keyMaps.Numpad4,
  Numpad5: keyMaps.Numpad5,
  Numpad6: keyMaps.Numpad6,
  Numpad7: keyMaps.Numpad7,
  Numpad8: keyMaps.Numpad8,
  Numpad9: keyMaps.Numpad9,
  Numpad0: keyMaps.Numpad0,
  NumpadDecimal: keyMaps.NumpadDecimal,
  IntlBackslash: keyMaps.IntlBackslash,
  ContextMenu: keyMaps.ContextMenu,
  Power: keyMaps.Power,
  NumpadEqual: keyMaps.NumpadEqual,
  F13: keyMaps.F13,
  F14: keyMaps.F14,
  F15: keyMaps.F15,
  F16: keyMaps.F16,
  F17: keyMaps.F17,
  F18: keyMaps.F18,
  F19: keyMaps.F19,
  F20: keyMaps.F20,
  F21: keyMaps.F21,
  F22: keyMaps.F22,
  F23: keyMaps.F23,
  F24: keyMaps.F24,
  Open: keyMaps.Open,
  Help: keyMaps.Help,
  Select: keyMaps.Select,
  Again: keyMaps.Again,
  Undo: keyMaps.Undo,
  Cut: keyMaps.Cut,
  Copy: keyMaps.Copy,
  Paste: keyMaps.Paste,
  Find: keyMaps.Find,
  AudioVolumeMute: keyMaps.VolumeMute,
  AudioVolumeUp: keyMaps.VolumeUp,
  AudioVolumeDown: keyMaps.VolumeDown,
  NumpadComma: keyMaps.NumpadComma,
  IntlRo: keyMaps.IntlRo,
  KanaMode: keyMaps.KanaMode,
  IntlYen: keyMaps.IntlYen,
  Convert: keyMaps.Convert,
  NonConvert: keyMaps.NonConvert,
  Lang1: keyMaps.Lang1,
  Lang2: keyMaps.Lang2,
  Lang3: keyMaps.Lang3,
  Lang4: keyMaps.Lang4,
  Lang5: keyMaps.Lang5,
  Abort: keyMaps.Abort,
  Props: keyMaps.Props,
  NumpadParenLeft: keyMaps.NumpadParenLeft,
  NumpadParenRight: keyMaps.NumpadParenRight,
  NumpadBackspace: keyMaps.NumpadBackspace,
  NumpadMemoryStore: keyMaps.NumpadMemoryStore,
  NumpadMemoryRecall: keyMaps.NumpadMemoryRecall,
  NumpadMemoryClear: keyMaps.NumpadMemoryClear,
  NumpadMemoryAdd: keyMaps.NumpadMemoryAdd,
  NumpadMemorySubtract: keyMaps.NumpadMemorySubtract,
  NumpadClear: keyMaps.NumpadClear,
  NumpadClearEntry: keyMaps.NumpadClearEntry,
  ControlLeft: keyMaps.ControlLeft,
  ShiftLeft: keyMaps.ShiftLeft,
  AltLeft: keyMaps.AltLeft,
  MetaLeft: keyMaps.MetaLeft,
  ControlRight: keyMaps.ControlRight,
  ShiftRight: keyMaps.ShiftRight,
  AltRight: keyMaps.AltRight,
  MetaRight: keyMaps.MetaRight,
  BrightnessUp: keyMaps.BrightnessUp,
  BrightnessDown: keyMaps.BrightnessDown,
  MediaPlay: keyMaps.MediaPlay,
  MediaRecord: keyMaps.MediaRecord,
  MediaFastForward: keyMaps.MediaFastForward,
  MediaRewind: keyMaps.MediaRewind,
  MediaTrackNext: keyMaps.MediaTrackNext,
  MediaTrackPrevious: keyMaps.MediaTrackPrevious,
  MediaStop: keyMaps.MediaStop,
  Eject: keyMaps.Eject,
  MediaPlayPause: keyMaps.MediaPlayPause,
  MediaSelect: keyMaps.MediaSelect,
  LaunchMail: keyMaps.LaunchMail,
  LaunchApp2: keyMaps.LaunchApp2,
  LaunchApp1: keyMaps.LaunchApp1,
  LaunchControlPanel: keyMaps.LaunchControlPanel,
  SelectTask: keyMaps.SelectTask,
  LaunchScreenSaver: keyMaps.LaunchScreenSaver,
  LaunchAssistant: keyMaps.LaunchAssistant,
  BrowserSearch: keyMaps.BrowserSearch,
  BrowserHome: keyMaps.BrowserHome,
  BrowserBack: keyMaps.BrowserBack,
  BrowserForward: keyMaps.BrowserForward,
  BrowserStop: keyMaps.BrowserStop,
  BrowserRefresh: keyMaps.BrowserRefresh,
  BrowserFavorites: keyMaps.BrowserFavorites,
  ZoomToggle: keyMaps.ZoomToggle,
  MailReply: keyMaps.MailReply,
  MailForward: keyMaps.MailForward,
  MailSend: keyMaps.MailSend,
  KeyboardLayoutSelect: keyMaps.KeyboardLayoutSelect,
  ShowAllWindows: keyMaps.ShowAllWindows
};
var allKeyMaps = Object.values(keyMaps);
function usbLookupKey(page, code) {
  return `${page}:${code}`;
}
function getUsbCode(page, code) {
  return keyMapsByUsb[usbLookupKey(page, code)];
}
function getKeyMapByCode(code) {
  return keyMapsByCode[code];
}
function getKeyMap(mapping) {
  switch (mapping.kind) {
    case "usb":
      return getUsbCode(mapping.page, mapping.code);
    case "evdev":
      return keyMapsByEvdev[String(mapping.code)];
    case "xkb":
      return keyMapsByXkb[String(mapping.code)];
    case "win":
      return keyMapsByWin[String(mapping.code)];
    case "mac":
      return keyMapsByMac[String(mapping.code)];
    case "code":
      return keyMapsByCode[mapping.code];
    case "id":
      return keyMaps[mapping.id];
  }
}
// src/utils/electron.ts
function parseElectronAccelerator(accelerator) {
  const parts = accelerator.toLowerCase().split("+");
  return parts.map((part) => {
    switch (part) {
      case "commandorcontrol":
      case "cmdorctrl":
        return process.platform === "darwin" ? KeyMappingCode.MetaLeft : KeyMappingCode.ControlLeft;
      case "control":
      case "ctrl":
        return KeyMappingCode.ControlLeft;
      case "alt":
      case "option":
        return KeyMappingCode.AltLeft;
      case "altgr":
        return KeyMappingCode.AltRight;
      case "shift":
        return KeyMappingCode.ShiftLeft;
      case "command":
      case "cmd":
      case "meta":
      case "super":
        return KeyMappingCode.MetaLeft;
    }
    if (/^[a-z]$/.test(part)) {
      return `Key${part.toUpperCase()}`;
    }
    if (/^\d$/.test(part)) {
      return `Digit${part}`;
    }
    if (/^f\d{1,2}$/.test(part)) {
      return part.toUpperCase();
    }
    const keymap = getKeyMapByCode(part);
    if (keymap?.code) {
      return keymap.code;
    }
    throw new Error(`Unknown accelerator part: ${part}`);
  });
}
function toElectronAccelerator(shortcut) {
  const parts = shortcut.split("+");
  return parts.map((part) => {
    const code = getKeyMapByCode(part)?.code;
    if (!code) {
      throw new Error(`Unknown shortcut part: ${part}`);
    }
    switch (code) {
      case KeyMappingCode.MetaLeft:
      case KeyMappingCode.MetaRight:
        return "Command";
      case KeyMappingCode.ControlLeft:
      case KeyMappingCode.ControlRight:
        return "Control";
      case KeyMappingCode.AltLeft:
        return "Alt";
      case KeyMappingCode.AltRight:
        return "AltGr";
      case KeyMappingCode.ShiftLeft:
      case KeyMappingCode.ShiftRight:
        return "Shift";
      default: {
        if (code.toLowerCase().startsWith("key")) {
          return code.replace("key", "");
        }
        if (code.toLowerCase().startsWith("digit")) {
          return code.replace("digit", "");
        }
        if (/^F\d{1,2}$/i.test(code)) {
          return code.toUpperCase();
        }
        throw new Error(`Unsupported key code: ${code}`);
      }
    }
  }).join("+");
}

// src/exports/1password.ts
import { tap } from "chordsapp";
var build1PasswordHandler = function build1PasswordHandler(meta) {
  const settingsJsonFilepath = untildify("~/Library/Group Containers/2BUA8C4S2C.com.1password/Library/Application Support/1Password/Data/settings/settings.json");
  if (!exists(settingsJsonFilepath)) {
    return import_utils_noop.default;
  }
  const globalHotkeys = ensureGlobalHotkeys(includeKeys(meta.chords, (sequence) => sequence.startsWith("/")), {
    bundleId: meta.bundleId,
    getHotkeyId: (chord) => nullthrows(chord.args?.[0])
  });
  if (globalHotkeys.length > 0) {
    const settings2 = parse2(fs2.readFileSync(settingsJsonFilepath, "utf8"));
    for (const { chord, shortcut } of globalHotkeys) {
      const hotkeyId = nullthrows(chord.args?.[0]);
      settings2[`keybinds.${hotkeyId}`] = toElectronAccelerator(shortcut);
    }
    fs2.writeFileSync(settingsJsonFilepath, stringify(settings2));
  }
  const settings = parse2(fs2.readFileSync(settingsJsonFilepath, "utf8"));
  return function handler(shortcutSlug) {
    const electronAccelerator = settings[`keybinds.${shortcutSlug}`];
    if (!electronAccelerator) {
      return false;
    }
    const codes = parseElectronAccelerator(electronAccelerator);
    tap(codes.join("+"));
  };
};
export {
  build1PasswordHandler as default
};
