import { n as __commonJSMin, r as __toESM } from "./lib-BcpI7GUj.js";
import { n as getKeyMap, r as getKeyMapByCode, t as KeyMappingCode } from "./dist-DhGxq6nI.js";
import fs from "fs";
import { tap } from "chord";
import { Buffer } from "buffer";
//#region src/js/utils/mac-keycode.ts
const CARBON_MODIFIERS = [
	{
		string: KeyMappingCode.MetaLeft,
		mask: 256
	},
	{
		string: KeyMappingCode.ShiftLeft,
		mask: 512
	},
	{
		string: KeyMappingCode.AltLeft,
		mask: 2048
	},
	{
		string: KeyMappingCode.ControlLeft,
		mask: 4096
	},
	{
		string: KeyMappingCode.CapsLock,
		mask: 1024
	}
];
const MODERN_MODIFIERS = [
	{
		string: KeyMappingCode.CapsLock,
		mask: 65536
	},
	{
		string: KeyMappingCode.ShiftLeft,
		mask: 1 << 17
	},
	{
		string: KeyMappingCode.ControlLeft,
		mask: 1 << 18
	},
	{
		string: KeyMappingCode.AltLeft,
		mask: 1 << 19
	},
	{
		string: KeyMappingCode.MetaLeft,
		mask: 1 << 20
	},
	{
		string: "Numpad",
		mask: 1 << 21
	},
	{
		string: KeyMappingCode.Help,
		mask: 1 << 22
	},
	{
		string: KeyMappingCode.Fn,
		mask: 1 << 23
	}
];
function modifiersToKeystrings(mask) {
	const result = [];
	for (const modifier of MODERN_MODIFIERS) if ((mask & modifier.mask) !== 0) result.push(modifier.string);
	return result;
}
function carbonModifiersToKeystrings(mask) {
	const result = [];
	for (const modifier of CARBON_MODIFIERS) if ((mask & modifier.mask) !== 0) result.push(modifier.string);
	return result;
}
function keystringsToMask(keystrings, modifiers) {
	let mask = 0;
	for (const keystring of keystrings) {
		const modifier = modifiers.find((m) => m.string === keystring);
		if (modifier) mask |= modifier.mask;
	}
	return mask;
}
function keystringsToModifierMask(keystrings) {
	return keystringsToMask(keystrings, MODERN_MODIFIERS);
}
function keystringsToCarbonModifierMask(keystrings) {
	return keystringsToMask(keystrings, CARBON_MODIFIERS);
}
//#endregion
//#region node_modules/.pnpm/bplist-lossless@0.2.0_typescript@6.0.2/node_modules/bplist-lossless/dist/utils/bytes.js
const UTF8_ENCODER = new TextEncoder();
const UTF8_DECODER = new TextDecoder("utf-8");
const BASE64_ALPHABET = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
function isByteSource(value) {
	return value instanceof ArrayBuffer || ArrayBuffer.isView(value);
}
function toUint8Array(input) {
	if (input instanceof Uint8Array) return input;
	if (input instanceof ArrayBuffer) return new Uint8Array(input);
	return new Uint8Array(input.buffer, input.byteOffset, input.byteLength);
}
function copyBytes(input) {
	return new Uint8Array(toUint8Array(input));
}
function concatBytes(chunks, totalSize) {
	const size = totalSize ?? chunks.reduce((sum, chunk) => sum + chunk.byteLength, 0);
	const out = new Uint8Array(size);
	let offset = 0;
	for (const chunk of chunks) {
		out.set(chunk, offset);
		offset += chunk.byteLength;
	}
	return out;
}
function encodeUtf8(value) {
	return UTF8_ENCODER.encode(value);
}
function decodeUtf8$1(input) {
	return UTF8_DECODER.decode(toUint8Array(input));
}
function encodeLatin1(value) {
	const out = new Uint8Array(value.length);
	for (let i = 0; i < value.length; i++) {
		const codeUnit = value.charCodeAt(i);
		if (codeUnit > 255) throw new RangeError("Latin-1 encoding only supports code units <= 0xFF.");
		out[i] = codeUnit;
	}
	return out;
}
function encodeUtf16BE(value) {
	const out = new Uint8Array(value.length * 2);
	for (let i = 0; i < value.length; i++) {
		const codeUnit = value.charCodeAt(i);
		out[i * 2] = codeUnit >>> 8;
		out[i * 2 + 1] = codeUnit & 255;
	}
	return out;
}
function decodeUtf16BE(input) {
	const bytes = toUint8Array(input);
	if (bytes.length % 2 !== 0) throw new Error("Invalid UTF-16 byte length");
	let result = "";
	const chunkSize = 16384;
	for (let start = 0; start < bytes.length; start += chunkSize * 2) {
		const end = Math.min(start + chunkSize * 2, bytes.length);
		const codeUnits = new Array((end - start) / 2);
		for (let i = start, j = 0; i < end; i += 2, j++) codeUnits[j] = bytes[i] << 8 | bytes[i + 1];
		result += String.fromCharCode(...codeUnits);
	}
	return result;
}
function toHex(input) {
	const bytes = toUint8Array(input);
	let out = "";
	for (const byte of bytes) out += byte.toString(16).padStart(2, "0");
	return out;
}
function fromHex(hex) {
	if (hex.length % 2 !== 0) throw new TypeError("Hex input must have an even number of characters.");
	const out = new Uint8Array(hex.length / 2);
	for (let i = 0; i < hex.length; i += 2) {
		const byte = Number.parseInt(hex.slice(i, i + 2), 16);
		if (Number.isNaN(byte)) throw new TypeError("Invalid hexadecimal input.");
		out[i / 2] = byte;
	}
	return out;
}
function toBase64(input) {
	const bytes = toUint8Array(input);
	let out = "";
	for (let i = 0; i < bytes.length; i += 3) {
		const a = bytes[i];
		const b = i + 1 < bytes.length ? bytes[i + 1] : 0;
		const c = i + 2 < bytes.length ? bytes[i + 2] : 0;
		const n = a << 16 | b << 8 | c;
		out += BASE64_ALPHABET[n >> 18 & 63];
		out += BASE64_ALPHABET[n >> 12 & 63];
		out += i + 1 < bytes.length ? BASE64_ALPHABET[n >> 6 & 63] : "=";
		out += i + 2 < bytes.length ? BASE64_ALPHABET[n & 63] : "=";
	}
	return out;
}
function bytesEqual(left, right) {
	const a = toUint8Array(left);
	const b = toUint8Array(right);
	if (a.byteLength !== b.byteLength) return false;
	for (let i = 0; i < a.byteLength; i++) if (a[i] !== b[i]) return false;
	return true;
}
function writeFloat64BE(value) {
	const out = new Uint8Array(8);
	new DataView(out.buffer, out.byteOffset, out.byteLength).setFloat64(0, value, false);
	return out;
}
function readFloat32BE(input, offset = 0) {
	const bytes = toUint8Array(input);
	return new DataView(bytes.buffer, bytes.byteOffset + offset, 4).getFloat32(0, false);
}
function readFloat64BE(input, offset = 0) {
	const bytes = toUint8Array(input);
	return new DataView(bytes.buffer, bytes.byteOffset + offset, 8).getFloat64(0, false);
}
//#endregion
//#region node_modules/.pnpm/bplist-lossless@0.2.0_typescript@6.0.2/node_modules/bplist-lossless/dist/classes/plist-date.js
const APPLE_PLIST_EPOCH_MS = Date.UTC(2001, 0, 1);
function isBinaryInput(value) {
	return value instanceof ArrayBuffer || ArrayBuffer.isView(value);
}
function normalizeRaw8(input) {
	const raw = copyBytes(input);
	if (raw.length !== 8) throw new RangeError(`PlistDate raw value must be exactly 8 bytes, got ${raw.length}.`);
	return raw;
}
function encodePlistSeconds(seconds) {
	return writeFloat64BE(seconds);
}
function decodePlistSeconds(raw) {
	return readFloat64BE(raw);
}
function plistSecondsToUnixMilliseconds(seconds) {
	return APPLE_PLIST_EPOCH_MS + seconds * 1e3;
}
function unixMillisecondsToPlistSeconds(milliseconds) {
	return (milliseconds - APPLE_PLIST_EPOCH_MS) / 1e3;
}
function numberToStableString(value) {
	if (Object.is(value, -0)) return "-0";
	if (Number.isNaN(value)) return "NaN";
	if (value === Infinity) return "Infinity";
	if (value === -Infinity) return "-Infinity";
	return value.toString();
}
/**
* Exact raw plist path.
*/
function canonicalStateFromRaw(input) {
	const raw = normalizeRaw8(input);
	const plistSeconds = decodePlistSeconds(raw);
	return {
		raw,
		plistSeconds,
		unixMilliseconds: plistSecondsToUnixMilliseconds(plistSeconds)
	};
}
/**
* Canonicalize a plist-seconds number by round-tripping it through the
* actual 8-byte binary representation.
*/
function canonicalStateFromPlistSeconds(seconds) {
	const raw = encodePlistSeconds(seconds);
	const plistSeconds = decodePlistSeconds(raw);
	return {
		raw,
		plistSeconds,
		unixMilliseconds: plistSecondsToUnixMilliseconds(plistSeconds)
	};
}
/**
* Canonicalize Unix milliseconds into the exact plist-representable value.
*
* This is the key fix for discrepancies like:
*   4410317596806472
* becoming
*   4410317596806471.5
*
* We normalize immediately instead of only discovering the change after
* encode -> decode.
*/
function canonicalStateFromUnixMilliseconds(milliseconds) {
	return canonicalStateFromPlistSeconds(unixMillisecondsToPlistSeconds(milliseconds));
}
function resolveInitialState(value) {
	if (value instanceof PlistDate) return canonicalStateFromRaw(value.getRawBytes());
	if (isBinaryInput(value)) return canonicalStateFromRaw(value);
	if (value instanceof Date) return canonicalStateFromUnixMilliseconds(value.getTime());
	if (typeof value === "number") return canonicalStateFromUnixMilliseconds(value);
	return canonicalStateFromUnixMilliseconds(Date.now());
}
var PlistDate = class PlistDate extends Date {
	static APPLE_PLIST_EPOCH_MS = APPLE_PLIST_EPOCH_MS;
	/**
	* Raw 8-byte plist payload is the canonical source of truth.
	*/
	#raw = encodePlistSeconds(0);
	constructor(value) {
		const state = resolveInitialState(value);
		super(state.unixMilliseconds);
		this.#raw = state.raw;
	}
	static from(input) {
		return new PlistDate(input);
	}
	static fromBuffer(input) {
		return new PlistDate(input);
	}
	static fromBytes(input) {
		return new PlistDate(input);
	}
	static fromPlistSeconds(seconds) {
		return new PlistDate(encodePlistSeconds(seconds));
	}
	static fromUnixMilliseconds(milliseconds) {
		return new PlistDate(milliseconds);
	}
	static isPlistDate(value) {
		return value instanceof PlistDate;
	}
	#applyCanonicalState(state) {
		this.#raw = copyBytes(state.raw);
		super.setTime(state.unixMilliseconds);
	}
	#replaceFromRaw(input) {
		this.#applyCanonicalState(canonicalStateFromRaw(input));
	}
	#replaceFromPlistSeconds(seconds) {
		this.#applyCanonicalState(canonicalStateFromPlistSeconds(seconds));
	}
	#replaceFromUnixMilliseconds(milliseconds) {
		this.#applyCanonicalState(canonicalStateFromUnixMilliseconds(milliseconds));
		return this.getTime();
	}
	#resyncFromDateState() {
		return this.#replaceFromUnixMilliseconds(super.getTime());
	}
	/**
	* Exact plist-native value:
	* seconds since 2001-01-01T00:00:00Z stored as IEEE 754
	* (Institute of Electrical and Electronics Engineers 754) double.
	*/
	get plistSeconds() {
		return decodePlistSeconds(this.#raw);
	}
	getPlistSeconds() {
		return this.plistSeconds;
	}
	getPlistSecondsString() {
		return numberToStableString(this.plistSeconds);
	}
	/**
	* Exact raw 8-byte plist payload.
	* If the object was constructed from raw bytes, those bytes are preserved
	* until the date is mutated.
	*/
	getRawBytes() {
		return copyBytes(this.#raw);
	}
	toRawString(encoding = "hex") {
		if (encoding === "hex") return toHex(this.#raw);
		return toBase64(this.#raw);
	}
	getRawHex() {
		return this.toRawString("hex");
	}
	getRawBase64() {
		return this.toRawString("base64");
	}
	toPlistString() {
		return this.getPlistSecondsString();
	}
	toBytes() {
		return this.getRawBytes();
	}
	toBuffer() {
		return this.toBytes();
	}
	/**
	* Set the exact plist-native seconds value.
	* Returns the plist-seconds string.
	*/
	setPlistSeconds(seconds) {
		if (typeof seconds !== "number") throw new TypeError("PlistDate seconds must be a number.");
		this.#replaceFromPlistSeconds(seconds);
		return this.getPlistSecondsString();
	}
	/**
	* Replace the date from exact raw plist bytes.
	* Returns the plist-seconds string.
	*/
	setRawBytes(input) {
		this.#replaceFromRaw(input);
		return this.getPlistSecondsString();
	}
	/**
	* Parse raw hex into the exact 8-byte plist payload.
	*/
	setRawHex(hex) {
		if (typeof hex !== "string" || !/^[0-9a-fA-F]{16}$/.test(hex)) throw new TypeError("PlistDate raw hex must be a 16-character hexadecimal string.");
		return this.setRawBytes(fromHex(hex));
	}
	/**
	* Exact Unix milliseconds derived from the canonical plist bytes.
	* This may include a fractional millisecond.
	*/
	getTime() {
		return plistSecondsToUnixMilliseconds(this.plistSeconds);
	}
	valueOf() {
		return this.getTime();
	}
	[Symbol.toPrimitive](hint) {
		if (hint === "number") return this.getTime();
		return this.toString();
	}
	toJSON() {
		return new Date(this.getTime()).toISOString();
	}
	clone() {
		return new PlistDate(this.#raw);
	}
	equalsExactly(other) {
		const rhs = PlistDate.from(other);
		return bytesEqual(this.#raw, rhs.#raw);
	}
	equalsValue(other) {
		const rhs = PlistDate.from(other);
		return Object.is(this.plistSeconds, rhs.plistSeconds);
	}
	/**
	* Direct time-setting path: normalize immediately to the exact
	* plist-representable value.
	*/
	setTime(time) {
		return this.#replaceFromUnixMilliseconds(time);
	}
	setMilliseconds(ms) {
		super.setMilliseconds(ms);
		return this.#resyncFromDateState();
	}
	setUTCMilliseconds(ms) {
		super.setUTCMilliseconds(ms);
		return this.#resyncFromDateState();
	}
	setSeconds(sec, ms) {
		if (ms === void 0) super.setSeconds(sec);
		else super.setSeconds(sec, ms);
		return this.#resyncFromDateState();
	}
	setUTCSeconds(sec, ms) {
		if (ms === void 0) super.setUTCSeconds(sec);
		else super.setUTCSeconds(sec, ms);
		return this.#resyncFromDateState();
	}
	setMinutes(min, sec, ms) {
		if (sec === void 0) super.setMinutes(min);
		else if (ms === void 0) super.setMinutes(min, sec);
		else super.setMinutes(min, sec, ms);
		return this.#resyncFromDateState();
	}
	setUTCMinutes(min, sec, ms) {
		if (sec === void 0) super.setUTCMinutes(min);
		else if (ms === void 0) super.setUTCMinutes(min, sec);
		else super.setUTCMinutes(min, sec, ms);
		return this.#resyncFromDateState();
	}
	setHours(hours, min, sec, ms) {
		if (min === void 0) super.setHours(hours);
		else if (sec === void 0) super.setHours(hours, min);
		else if (ms === void 0) super.setHours(hours, min, sec);
		else super.setHours(hours, min, sec, ms);
		return this.#resyncFromDateState();
	}
	setUTCHours(hours, min, sec, ms) {
		if (min === void 0) super.setUTCHours(hours);
		else if (sec === void 0) super.setUTCHours(hours, min);
		else if (ms === void 0) super.setUTCHours(hours, min, sec);
		else super.setUTCHours(hours, min, sec, ms);
		return this.#resyncFromDateState();
	}
	setDate(date) {
		super.setDate(date);
		return this.#resyncFromDateState();
	}
	setUTCDate(date) {
		super.setUTCDate(date);
		return this.#resyncFromDateState();
	}
	setMonth(month, date) {
		if (date === void 0) super.setMonth(month);
		else super.setMonth(month, date);
		return this.#resyncFromDateState();
	}
	setUTCMonth(month, date) {
		if (date === void 0) super.setUTCMonth(month);
		else super.setUTCMonth(month, date);
		return this.#resyncFromDateState();
	}
	setFullYear(year, month, date) {
		if (month === void 0) super.setFullYear(year);
		else if (date === void 0) super.setFullYear(year, month);
		else super.setFullYear(year, month, date);
		return this.#resyncFromDateState();
	}
	setUTCFullYear(year, month, date) {
		if (month === void 0) super.setUTCFullYear(year);
		else if (date === void 0) super.setUTCFullYear(year, month);
		else super.setUTCFullYear(year, month, date);
		return this.#resyncFromDateState();
	}
	/**
	* @deprecated This method is deprecated and should not be used. Use setFullYear() instead.
	*/
	setYear(year) {
		super.setYear(year);
		return this.#resyncFromDateState();
	}
	[Symbol.for("nodejs.util.inspect.custom")]() {
		return `PlistDate(${(() => {
			try {
				return this.toISOString();
			} catch {
				return "Invalid Date";
			}
		})()}, plistSeconds=${this.getPlistSecondsString()}, raw=${this.getRawHex()})`;
	}
};
//#endregion
//#region node_modules/.pnpm/bplist-lossless@0.2.0_typescript@6.0.2/node_modules/bplist-lossless/dist/classes/uid.js
const UID_BRAND = Symbol.for("plist.UID");
var UID = class UID extends Uint8Array {
	static from(bytes) {
		return new UID(bytes.buffer, bytes.byteOffset, bytes.byteLength);
	}
	static fromNumber(value) {
		if (!Number.isInteger(value) || value < 0) throw new TypeError("UID number value must be an unsigned integer.");
		let hex = value.toString(16);
		if (hex.length % 2 !== 0) hex = `0${hex}`;
		const bytes = new Uint8Array(Math.max(1, hex.length / 2));
		for (let i = 0; i < bytes.length; i++) bytes[i] = Number.parseInt(hex.slice(i * 2, i * 2 + 2), 16);
		let start = 0;
		while (start < bytes.length - 1 && bytes[start] === 0) start++;
		const raw = bytes.subarray(start);
		if (raw.length > 16) throw new RangeError("UID too large for binary plist");
		return UID.from(raw);
	}
	constructor(buffer, byteOffset, length) {
		super(buffer, byteOffset, length);
		Object.defineProperty(this, UID_BRAND, {
			value: true,
			enumerable: false
		});
	}
	static isUID(value) {
		return value instanceof Uint8Array && value != null && value[UID_BRAND] === true;
	}
	toHex() {
		return toHex(this);
	}
	[Symbol.for("nodejs.util.inspect.custom")]() {
		return `UID(${this.toHex()})`;
	}
};
//#endregion
//#region node_modules/.pnpm/bplist-lossless@0.2.0_typescript@6.0.2/node_modules/bplist-lossless/dist/classes/utf16-string.js
const UTF16_STRING_BRAND = Symbol.for("plist.Utf16String");
var Utf16String = class Utf16String extends Uint8Array {
	static from(bytes) {
		return new Utf16String(bytes.buffer, bytes.byteOffset, bytes.byteLength);
	}
	constructor(buffer, byteOffset, length) {
		super(buffer, byteOffset, length);
		Object.defineProperty(this, UTF16_STRING_BRAND, {
			value: true,
			enumerable: false
		});
	}
	static isUtf16String(value) {
		return value instanceof Uint8Array && value != null && value[UTF16_STRING_BRAND] === true;
	}
	toString() {
		return decodeUtf16BE(this);
	}
	toHex() {
		return toHex(this);
	}
	[Symbol.for("nodejs.util.inspect.custom")]() {
		return `Utf16String(${this.toString()})`;
	}
};
//#endregion
//#region node_modules/.pnpm/bplist-lossless@0.2.0_typescript@6.0.2/node_modules/bplist-lossless/dist/utils/parse.js
var maxObjectSize = 100 * 1e3 * 1e3;
function parseBplist(input) {
	const buffer = toUint8Array(input);
	if (decodeUtf8$1(buffer.subarray(0, 6)) !== "bplist") throw new Error("Invalid binary plist. Expected 'bplist' at offset 0.");
	const trailer = buffer.slice(buffer.length - 32, buffer.length);
	const offsetSize = trailer[6];
	const objectRefSize = trailer[7];
	const numObjects = toSafeNumber(readBigUInt64BE(trailer, 8));
	const topObject = toSafeNumber(readBigUInt64BE(trailer, 16));
	const offsetTableOffset = toSafeNumber(readBigUInt64BE(trailer, 24));
	if (numObjects > 32768) throw new Error("maxObjectCount exceeded");
	const offsetTable = [];
	for (let i = 0; i < numObjects; i++) offsetTable[i] = toSafeNumber(readUInt(buffer.slice(offsetTableOffset + i * offsetSize, offsetTableOffset + (i + 1) * offsetSize), 0));
	function parseObject(tableOffset) {
		const offset = offsetTable[tableOffset];
		const type = buffer[offset];
		const objType = (type & 240) >> 4;
		const objInfo = type & 15;
		switch (objType) {
			case 0: return parseSimple();
			case 1: return parseInteger();
			case 8: return parseUID();
			case 2: return parseReal();
			case 3: return parseDate();
			case 4: return parseData();
			case 5: return parsePlistString(false);
			case 6: return parsePlistString(true);
			case 10: return parseArray();
			case 13: return parseDictionary();
			default: throw new Error("Unhandled type 0x" + objType.toString(16));
		}
		function parseSimple() {
			switch (objInfo) {
				case 0: return null;
				case 8: return false;
				case 9: return true;
				case 15: return null;
				default: throw new Error("Unhandled simple type 0x" + objType.toString(16));
			}
		}
		function parseInteger() {
			const length = 1 << objInfo;
			if (length > 1e8) throw new Error(`Too little heap space available! Wanted to read ${length} bytes, but only ${maxObjectSize} are available.`);
			const start = offset + 1;
			const end = start + length;
			const data = buffer.subarray(start, end);
			let value = 0n;
			for (let i = 0; i < data.length; i++) value = value << 8n | BigInt(data[i]);
			const bits = BigInt(length * 8);
			const signBit = 1n << bits - 1n;
			if (value & signBit) value -= 1n << bits;
			return value;
		}
		function parseUID() {
			const length = objInfo + 1;
			if (length < 1e8) return new UID(buffer.buffer, buffer.byteOffset + offset + 1, length);
			throw new Error("Too little heap space available! Wanted to read " + length + " bytes, but only " + maxObjectSize + " are available.");
		}
		function parseReal() {
			const length = Math.pow(2, objInfo);
			if (length < 1e8) {
				const realBuffer = buffer.slice(offset + 1, offset + 1 + length);
				if (length === 4) return readFloat32BE(realBuffer);
				if (length === 8) return readFloat64BE(realBuffer);
			} else throw new Error("Too little heap space available! Wanted to read " + length + " bytes, but only " + maxObjectSize + " are available.");
		}
		function parseDate() {
			if (objInfo !== 3) console.error("Unknown date type: " + objInfo + ". Parsing anyway...");
			const raw = buffer.subarray(offset + 1, offset + 9);
			return PlistDate.fromBytes(raw);
		}
		function parseData() {
			let dataoffset = 1;
			let length = objInfo;
			if (objInfo == 15) {
				const intTypeByte = buffer[offset + 1];
				const intType = (intTypeByte & 240) / 16;
				if (intType != 1) console.error("0x4: UNEXPECTED LENGTH-INT TYPE! " + intType);
				const intInfo = intTypeByte & 15;
				const intLength = Math.pow(2, intInfo);
				dataoffset = 2 + intLength;
				length = toSafeNumber(readUInt(buffer.slice(offset + 2, offset + 2 + intLength)));
			}
			if (length < 1e8) return buffer.slice(offset + dataoffset, offset + dataoffset + length);
			throw new Error("Too little heap space available! Wanted to read " + length + " bytes, but only " + maxObjectSize + " are available.");
		}
		function parsePlistString(isUtf16) {
			let length = objInfo;
			let stroffset = 1;
			if (objInfo == 15) {
				const intTypeByte = buffer[offset + 1];
				const intType = (intTypeByte & 240) / 16;
				if (intType != 1) console.error("UNEXPECTED LENGTH-INT TYPE! " + intType);
				const intInfo = intTypeByte & 15;
				const intLength = Math.pow(2, intInfo);
				stroffset = 2 + intLength;
				length = toSafeNumber(readUInt(buffer.slice(offset + 2, offset + 2 + intLength)));
			}
			length *= Number(isUtf16) + 1;
			if (length < 1e8) {
				const plistString = buffer.slice(offset + stroffset, offset + stroffset + length);
				if (isUtf16) return Utf16String.from(plistString);
				return decodeUtf8$1(plistString);
			}
			throw new Error("Too little heap space available! Wanted to read " + length + " bytes, but only " + maxObjectSize + " are available.");
		}
		function parseArray() {
			let length = objInfo;
			let arrayoffset = 1;
			if (objInfo == 15) {
				const intTypeByte = buffer[offset + 1];
				const intType = (intTypeByte & 240) / 16;
				if (intType != 1) console.error("0xa: UNEXPECTED LENGTH-INT TYPE! " + intType);
				const intInfo = intTypeByte & 15;
				const intLength = Math.pow(2, intInfo);
				arrayoffset = 2 + intLength;
				length = toSafeNumber(readUInt(buffer.slice(offset + 2, offset + 2 + intLength)));
			}
			if (length * objectRefSize > 1e8) throw new Error("Too little heap space available!");
			const array = [];
			for (let i = 0; i < length; i++) array[i] = parseObject(toSafeNumber(readUInt(buffer.slice(offset + arrayoffset + i * objectRefSize, offset + arrayoffset + (i + 1) * objectRefSize))));
			return array;
		}
		function parseDictionary() {
			let length = objInfo;
			let dictoffset = 1;
			if (objInfo == 15) {
				const intTypeByte = buffer[offset + 1];
				const intType = (intTypeByte & 240) / 16;
				if (intType != 1) console.error("0xD: UNEXPECTED LENGTH-INT TYPE! " + intType);
				const intInfo = intTypeByte & 15;
				const intLength = Math.pow(2, intInfo);
				dictoffset = 2 + intLength;
				length = toSafeNumber(readUInt(buffer.slice(offset + 2, offset + 2 + intLength)));
			}
			if (length * 2 * objectRefSize > 1e8) throw new Error("Too little heap space available!");
			const dict = createSafeObject();
			for (let i = 0; i < length; i++) {
				const keyRef = toSafeNumber(readUInt(buffer.slice(offset + dictoffset + i * objectRefSize, offset + dictoffset + (i + 1) * objectRefSize)));
				const valRef = toSafeNumber(readUInt(buffer.slice(offset + dictoffset + length * objectRefSize + i * objectRefSize, offset + dictoffset + length * objectRefSize + (i + 1) * objectRefSize)));
				const key = parseObject(keyRef);
				dict[key] = parseObject(valRef);
			}
			return dict;
		}
	}
	return parseObject(topObject);
}
function readUInt(buffer, start = 0) {
	let result = 0n;
	for (let i = start; i < buffer.length; i++) {
		result <<= 8n;
		result |= BigInt(buffer[i]);
	}
	return result;
}
function toSafeNumber(x) {
	if (x > BigInt(Number.MAX_SAFE_INTEGER)) throw new Error("Offset too large");
	return Number(x);
}
function createSafeObject() {
	return Object.create(null);
}
function readBigUInt64BE(buf, offset) {
	let value = 0n;
	for (let i = 0; i < 8; i++) value = value << 8n | BigInt(buf[offset + i]);
	return value;
}
//#endregion
//#region node_modules/.pnpm/bplist-lossless@0.2.0_typescript@6.0.2/node_modules/bplist-lossless/dist/utils/serialize.js
function serializeBplist(dicts) {
	const buffer = new WritableStreamBuffer();
	buffer.write(encodeUtf8("bplist00"));
	let entries = toEntries(dicts);
	const idSizeInBytes = computeIdSizeInBytes(entries.length);
	const offsets = [];
	let offsetSizeInBytes;
	let offsetTableOffset;
	updateEntryIds();
	entries.forEach(function(entry, entryIdx) {
		offsets[entryIdx] = buffer.size();
		if (!entry) buffer.write(0);
		else write(entry);
	});
	writeOffsetTable();
	writeTrailer();
	return buffer.getContents();
	function updateEntryIds() {
		const strings = {};
		let entryId = 0;
		entries.forEach(function(entry) {
			if (entry.id) return;
			if (entry.type === "string") if (!entry.bplistOverride && strings.hasOwnProperty(entry.value)) {
				entry.type = "stringref";
				entry.id = strings[entry.value];
			} else strings[entry.value] = entry.id = entryId++;
			else entry.id = entryId++;
		});
		entries = entries.filter(function(entry) {
			return entry.type !== "stringref";
		});
	}
	function writeTrailer() {
		buffer.write(new Uint8Array(6));
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
			case "null":
				writeNull();
				break;
			default: throw new Error("unhandled entry type: " + entry.type);
		}
	}
	function writeDate(entry) {
		writeByte(51);
		buffer.write(PlistDate.from(entry.value).toBytes());
	}
	function writeDict(entry) {
		writeIntHeader(13, entry.entryKeys.length);
		entry.entryKeys.forEach(function(item) {
			writeID(item.id);
		});
		entry.entryValues.forEach(function(item) {
			writeID(item.id);
		});
	}
	function writeNumber(entry) {
		if (typeof entry.value === "bigint") {
			const size = getIntSize(entry.value);
			writeByte(16 | Math.log2(size));
			buffer.write(bigintToBuffer(entry.value, size));
		} else if (entry.type !== "double" && parseFloat(entry.value).toFixed() == entry.value) if (entry.value < 0) {
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
		else {
			writeByte(35);
			writeDouble(entry.value);
		}
	}
	function writeUID(entry) {
		let raw;
		if (entry.value instanceof UID) raw = copyBytes(entry.value);
		else if (typeof entry.value === "bigint") {
			if (entry.value < 0n) throw new TypeError("UID must be unsigned");
			let hex = entry.value.toString(16);
			if (hex.length % 2 !== 0) hex = "0" + hex;
			raw = fromHex(hex || "00");
		} else if (typeof entry.value === "number" && Number.isInteger(entry.value) && entry.value >= 0) {
			let hex = BigInt(entry.value).toString(16);
			if (hex.length % 2 !== 0) hex = "0" + hex;
			raw = fromHex(hex || "00");
		} else throw new TypeError("UID value must be a UID, bigint, or unsigned integer number");
		let start = 0;
		while (start < raw.length - 1 && raw[start] === 0) start++;
		raw = raw.subarray(start);
		if (raw.length < 1 || raw.length > 16) throw new RangeError(`UID must be between 1 and 16 bytes, got ${raw.length}`);
		writeByte(128 | raw.length - 1);
		buffer.write(raw);
	}
	function writeArray(entry) {
		writeIntHeader(10, entry.entries.length);
		entry.entries.forEach(function(item) {
			writeID(item.id);
		});
	}
	function writeBoolean(entry) {
		writeByte(entry.value ? 9 : 8);
	}
	function writeNull() {
		writeByte(0);
	}
	function writeString(entry) {
		if (entry.type === "string-utf16") {
			const utf16 = Utf16String.isUtf16String(entry.value) ? copyBytes(entry.value) : encodeUtf16BE(entry.value);
			writeIntHeader(6, utf16.length / 2);
			buffer.write(utf16);
		} else {
			const ascii = encodeLatin1(entry.value);
			writeIntHeader(5, ascii.length);
			buffer.write(ascii);
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
		buffer.write(b);
	}
	function writeDouble(v) {
		buffer.write(writeFloat64BE(v));
	}
	function writeIntHeader(kind, value) {
		if (value < 15) writeByte((kind << 4) + value);
		else if (value < 256) {
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
	function writeBytes(value, bytes, isSignedInt = false) {
		const buf = new Uint8Array(bytes);
		let z = 0;
		while (bytes > 4) {
			buf[z++] = isSignedInt ? 255 : 0;
			bytes--;
		}
		for (let i = bytes - 1; i >= 0; i--) buf[z++] = value >> 8 * i;
		buffer.write(buf);
	}
}
function toEntries(dicts) {
	if (dicts === null) return [{
		type: "null",
		value: null
	}];
	else if (typeof dicts === "boolean") return [{
		type: "boolean",
		value: dicts
	}];
	else if (typeof dicts === "bigint") return [{
		type: "number",
		value: dicts
	}];
	else if (typeof dicts === "number") return [{
		type: "double",
		value: dicts
	}];
	else if (typeof dicts === "string") return [{
		type: mustBeUtf16(dicts) ? "string-utf16" : "string",
		value: dicts
	}];
	else if (Utf16String.isUtf16String(dicts)) return [{
		type: "string-utf16",
		value: dicts
	}];
	else if (UID.isUID(dicts)) return [{
		type: "UID",
		value: dicts
	}];
	else if (isByteSource(dicts)) return [{
		type: "data",
		value: copyBytes(toUint8Array(dicts))
	}];
	else if (PlistDate.isPlistDate(dicts) || Object.prototype.toString.call(dicts) === "[object Date]") return [{
		type: "date",
		value: dicts
	}];
	else if (Array.isArray(dicts)) return toEntriesArray(dicts);
	else if (isPlainObject(dicts)) return toEntriesObject(dicts);
	else throw new Error("unhandled entry: " + dicts);
}
function toEntriesArray(arr) {
	let results = [{
		type: "array",
		entries: []
	}];
	arr.forEach(function(v) {
		const entry = toEntries(v);
		results[0].entries.push(entry[0]);
		results = results.concat(entry);
	});
	return results;
}
function toEntriesObject(dict) {
	const result = {
		type: "dict",
		entryKeys: [],
		entryValues: []
	};
	const results = [result];
	for (const key of Reflect.ownKeys(dict)) {
		if (typeof key !== "string") continue;
		const entryKey = toEntries(key);
		const entryValue = toEntries(dict[key]);
		result.entryKeys.push(entryKey[0]);
		result.entryValues.push(entryValue[0]);
		results.push(...entryKey);
		results.push(...entryValue);
	}
	return results;
}
function computeOffsetSizeInBytes(maxOffset) {
	if (maxOffset < 256) return 1;
	if (maxOffset < 65536) return 2;
	if (maxOffset < 4294967296) return 4;
	return 8;
}
function computeIdSizeInBytes(numberOfIds) {
	if (numberOfIds < 256) return 1;
	if (numberOfIds < 65536) return 2;
	return 4;
}
function isPlainObject(value) {
	if (Object.prototype.toString.call(value) !== "[object Object]") return false;
	const proto = Object.getPrototypeOf(value);
	return proto === null || proto === Object.prototype;
}
var WritableStreamBuffer = class {
	_chunks;
	_size;
	constructor() {
		this._chunks = [];
		this._size = 0;
	}
	write(chunk, encoding) {
		let buf;
		if (typeof chunk === "number") buf = Uint8Array.of(chunk & 255);
		else if (isByteSource(chunk)) buf = copyBytes(chunk);
		else if (typeof chunk === "string") {
			if (encoding && encoding !== "utf8") throw new TypeError(`Unsupported string encoding passed to write(): ${String(encoding)}`);
			buf = encodeUtf8(chunk);
		} else throw new TypeError("Unsupported chunk type passed to write()");
		this._chunks.push(buf);
		this._size += buf.length;
		return true;
	}
	size() {
		return this._size;
	}
	getContents() {
		return concatBytes(this._chunks, this._size);
	}
};
function bigintToBuffer(value, size) {
	const buf = new Uint8Array(size);
	let temp = value;
	if (value < 0) temp = (1n << BigInt(size * 8)) + value;
	for (let i = size - 1; i >= 0; i--) {
		buf[i] = Number(temp & 255n);
		temp >>= 8n;
	}
	return buf;
}
function getIntSize(value) {
	if (value >= -128n && value <= 127n) return 1;
	if (value >= -32768n && value <= 32767n) return 2;
	if (value >= -2147483648n && value <= 2147483647n) return 4;
	if (value >= -9223372036854775808n && value <= 9223372036854775807n) return 8;
	return 16;
}
function mustBeUtf16(str) {
	for (let i = 0; i < str.length; i++) if (str.charCodeAt(i) > 127) return true;
	return false;
}
//#endregion
//#region node_modules/.pnpm/fast-is-equal@1.2.6/node_modules/fast-is-equal/dist/index.js
const TYPEOF_OBJECT = "object";
const TYPEOF_FUNCTION = "function";
const TYPEOF_NUMBER = "number";
const TYPEOF_STRING = "string";
const TYPEOF_BOOLEAN = "boolean";
const TYPEOF_SYMBOL = "symbol";
const TYPEOF_BIGINT = "bigint";
const isNaN = Number.isNaN;
const dateConstructor = Date;
const regExpConstructor = RegExp;
const mapConstructor = Map;
const setConstructor = Set;
const arrayBufferConstructor = ArrayBuffer;
const promiseConstructor = Promise;
const errorConstructor = Error;
const dataViewConstructor = DataView;
function fastIsEqual(a, b) {
	if (a === b) return true;
	if (a == null || b == null) return false;
	const typeA = typeof a;
	if (typeA === TYPEOF_NUMBER) return typeof b === TYPEOF_NUMBER && isNaN(a) && isNaN(b);
	if (typeA === TYPEOF_STRING || typeA === TYPEOF_BOOLEAN || typeA === TYPEOF_FUNCTION || typeA === TYPEOF_SYMBOL || typeA === TYPEOF_BIGINT) return false;
	if (typeof b !== TYPEOF_OBJECT) return false;
	const aIsArray = Array.isArray(a);
	if (aIsArray !== Array.isArray(b)) return false;
	const aCtor = a.constructor;
	if (aCtor !== b.constructor) return false;
	if (aIsArray) {
		const len = a.length;
		if (len !== b.length) return false;
		if (len === 0) return true;
		if (len < 8) {
			for (let i = 0; i < len; i++) {
				const hasA = i in a;
				if (hasA !== i in b) return false;
				if (!hasA) continue;
				const elemA = a[i];
				const elemB = b[i];
				if (elemA === elemB) continue;
				if (elemA == null || elemB == null) return false;
				const elemTypeA = typeof elemA;
				if (elemTypeA !== typeof elemB) return false;
				if (elemTypeA === TYPEOF_NUMBER) {
					if (!(isNaN(elemA) && isNaN(elemB))) return false;
					continue;
				}
				if (elemTypeA !== TYPEOF_OBJECT && elemTypeA !== TYPEOF_FUNCTION) return false;
				if (!deepEqual(elemA, elemB, /* @__PURE__ */ new Map())) return false;
			}
			return true;
		}
		return deepEqual(a, b, /* @__PURE__ */ new Map());
	}
	if (aCtor === dateConstructor) return a.getTime() === b.getTime();
	if (aCtor === regExpConstructor) return a.source === b.source && a.flags === b.flags;
	return deepEqual(a, b, /* @__PURE__ */ new Map());
}
function deepEqual(valA, valB, visited) {
	if (valA === valB) return true;
	if (valA == null || valB == null) return false;
	const typeA = typeof valA;
	if (typeA !== typeof valB) return false;
	if (typeA === TYPEOF_NUMBER) return isNaN(valA) && isNaN(valB);
	if (typeA !== TYPEOF_OBJECT && typeA !== TYPEOF_FUNCTION) return false;
	const visitedVal = visited.get(valA);
	if (visitedVal !== void 0) return visitedVal === valB;
	if (visited.has(valB)) return false;
	const ctorA = valA.constructor;
	if (ctorA !== valB.constructor) return false;
	if (ctorA === dateConstructor) return valA.getTime() === valB.getTime();
	if (ctorA === regExpConstructor) return valA.source === valB.source && valA.flags === valB.flags;
	if (ctorA === promiseConstructor || ctorA === errorConstructor) return false;
	if (Array.isArray(valA)) {
		const len = valA.length;
		if (len !== valB.length) return false;
		visited.set(valA, valB);
		visited.set(valB, valA);
		if (len === 0) return true;
		for (let i = 0; i < len; i++) {
			const hasA = i in valA;
			if (hasA !== i in valB) return false;
			if (!hasA) continue;
			const elemA = valA[i];
			const elemB = valB[i];
			if (elemA !== elemB && !deepEqual(elemA, elemB, visited)) return false;
		}
		return true;
	}
	if (ctorA === mapConstructor) {
		const mapA = valA;
		const mapB = valB;
		if (mapA.size !== mapB.size) return false;
		if (mapA.size === 0) return true;
		visited.set(valA, valB);
		visited.set(valB, valA);
		for (const [key, valueA] of mapA) {
			const keyType = typeof key;
			if (keyType !== TYPEOF_OBJECT && keyType !== TYPEOF_FUNCTION) {
				if (!mapB.has(key)) return false;
				const valueB = mapB.get(key);
				if (valueA !== valueB && !deepEqual(valueA, valueB, visited)) return false;
			} else {
				let found = false;
				for (const [keyB, valueB] of mapB) if (deepEqual(key, keyB, visited) && deepEqual(valueA, valueB, visited)) {
					found = true;
					break;
				}
				if (!found) return false;
			}
		}
		return true;
	}
	if (ctorA === setConstructor) {
		const setA = valA;
		const setB = valB;
		if (setA.size !== setB.size) return false;
		if (setA.size === 0) return true;
		visited.set(valA, valB);
		visited.set(valB, valA);
		let hasObjects = false;
		for (const val of setA) {
			const valType = typeof val;
			if (valType === TYPEOF_OBJECT || valType === TYPEOF_FUNCTION) hasObjects = true;
			else if (!setB.has(val)) return false;
		}
		if (!hasObjects) return true;
		const objectsA = [];
		const objectsB = [];
		for (const val of setA) {
			const valType = typeof val;
			if (valType === TYPEOF_OBJECT || valType === TYPEOF_FUNCTION) objectsA.push(val);
		}
		for (const val of setB) {
			const valType = typeof val;
			if (valType === TYPEOF_OBJECT || valType === TYPEOF_FUNCTION) objectsB.push(val);
		}
		const used = new Uint8Array(objectsB.length);
		for (const valA of objectsA) {
			let found = false;
			for (let j = 0; j < objectsB.length; j++) if (!used[j]) {
				const newVisited = new Map(visited);
				if (deepEqual(valA, objectsB[j], newVisited)) {
					used[j] = 1;
					found = true;
					break;
				}
			}
			if (!found) return false;
		}
		return true;
	}
	if (ctorA === arrayBufferConstructor) {
		const bufA = valA;
		const bufB = valB;
		const byteLength = bufA.byteLength;
		if (byteLength !== bufB.byteLength) return false;
		const viewA = new Uint8Array(bufA);
		const viewB = new Uint8Array(bufB);
		let i = 0;
		const unrollEnd = byteLength - 7;
		for (; i < unrollEnd; i += 8) if (viewA[i] !== viewB[i] || viewA[i + 1] !== viewB[i + 1] || viewA[i + 2] !== viewB[i + 2] || viewA[i + 3] !== viewB[i + 3] || viewA[i + 4] !== viewB[i + 4] || viewA[i + 5] !== viewB[i + 5] || viewA[i + 6] !== viewB[i + 6] || viewA[i + 7] !== viewB[i + 7]) return false;
		for (; i < byteLength; i++) if (viewA[i] !== viewB[i]) return false;
		return true;
	}
	if (ctorA === dataViewConstructor) {
		const viewA = valA;
		const viewB = valB;
		if (viewA.byteLength !== viewB.byteLength || viewA.byteOffset !== viewB.byteOffset) return false;
		for (let i = 0; i < viewA.byteLength; i++) if (viewA.getUint8(i) !== viewB.getUint8(i)) return false;
		return true;
	}
	if (ArrayBuffer.isView(valA)) {
		const arrA = valA;
		const arrB = valB;
		const len = arrA.length;
		if (len !== arrB.length) return false;
		if (len < 16) {
			for (let i = 0; i < len; i++) if (arrA[i] !== arrB[i]) return false;
			return true;
		}
		let i = 0;
		const unrollLen = len - 3;
		for (; i < unrollLen; i += 4) if (arrA[i] !== arrB[i] || arrA[i + 1] !== arrB[i + 1] || arrA[i + 2] !== arrB[i + 2] || arrA[i + 3] !== arrB[i + 3]) return false;
		for (; i < len; i++) if (arrA[i] !== arrB[i]) return false;
		return true;
	}
	visited.set(valA, valB);
	visited.set(valB, valA);
	const keysA = Object.keys(valA);
	const keysALen = keysA.length;
	if (keysALen !== Object.keys(valB).length) return false;
	if (keysALen === 0) {
		if (Object.getOwnPropertySymbols !== void 0) {
			const symbolsA = Object.getOwnPropertySymbols(valA);
			if (symbolsA.length !== Object.getOwnPropertySymbols(valB).length) return false;
			for (let i = 0; i < symbolsA.length; i++) {
				const sym = symbolsA[i];
				if (!(sym in valB) || !deepEqual(valA[sym], valB[sym], visited)) return false;
			}
		}
		return true;
	}
	for (let i = 0; i < keysALen; i++) {
		const key = keysA[i];
		if (!(key in valB)) return false;
		const propA = valA[key];
		const propB = valB[key];
		if (propA !== propB) {
			const propTypeA = typeof propA;
			if (propTypeA === TYPEOF_OBJECT || propTypeA === TYPEOF_FUNCTION) {
				if (!deepEqual(propA, propB, visited)) return false;
			} else if (propTypeA === TYPEOF_NUMBER) {
				if (!(isNaN(propA) && isNaN(propB))) return false;
			} else return false;
		}
	}
	if (Object.getOwnPropertySymbols !== void 0) {
		const symbolsA = Object.getOwnPropertySymbols(valA);
		if (symbolsA.length > 0) {
			if (symbolsA.length !== Object.getOwnPropertySymbols(valB).length) return false;
			for (let i = 0; i < symbolsA.length; i++) {
				const sym = symbolsA[i];
				if (!(sym in valB) || !deepEqual(valA[sym], valB[sym], visited)) return false;
			}
		}
	}
	return true;
}
//#endregion
//#region node_modules/.pnpm/json-parse-safe@2.0.0/node_modules/json-parse-safe/index.js
var require_json_parse_safe = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	module.exports = JSONParse;
	function JSONParse(text, reviver) {
		try {
			return { value: JSON.parse(text, reviver) };
		} catch (ex) {
			return { error: ex };
		}
	}
}));
//#endregion
//#region node_modules/.pnpm/decode-utf8@1.0.1/node_modules/decode-utf8/index.js
var require_decode_utf8 = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	function toUint8Array(input) {
		if (input instanceof Uint8Array) return input;
		if (input instanceof ArrayBuffer) return new Uint8Array(input);
		throw new TypeError("Expected \"input\" to be an ArrayBuffer or Uint8Array");
	}
	module.exports = function decodeUtf8(input) {
		const data = toUint8Array(input);
		const size = data.length;
		let result = "";
		for (let index = 0; index < size; index++) {
			let byte1 = data[index];
			if (byte1 < 128) {
				result += String.fromCodePoint(byte1);
				continue;
			}
			if ((byte1 & 224) === 192) {
				let byte2 = data[++index] & 63;
				result += String.fromCodePoint((byte1 & 31) << 6 | byte2);
				continue;
			}
			if ((byte1 & 240) === 224) {
				let byte2 = data[++index] & 63;
				let byte3 = data[++index] & 63;
				result += String.fromCodePoint((byte1 & 15) << 12 | byte2 << 6 | byte3);
				continue;
			}
			if ((byte1 & 248) === 240) {
				let byte2 = data[++index] & 63;
				let byte3 = data[++index] & 63;
				let byte4 = data[++index] & 63;
				result += String.fromCodePoint((byte1 & 7) << 18 | byte2 << 12 | byte3 << 6 | byte4);
				continue;
			}
		}
		return result;
	};
}));
//#endregion
//#region src/js/utils/plist.ts
var import_json_parse_safe = /* @__PURE__ */ __toESM(require_json_parse_safe(), 1);
var import_decode_utf8 = /* @__PURE__ */ __toESM(require_decode_utf8(), 1);
function plistValueToString(rawValue) {
	return Buffer.isBuffer(rawValue) ? (0, import_decode_utf8.default)(rawValue) : String(rawValue);
}
function getPlistShortcutUtils({ plistPath, modifierMaskKey, modifierType, keycodeKey }) {
	function readPlist() {
		return parseBplist(fs.readFileSync(plistPath));
	}
	function createUpdatedPlist(writes, options) {
		const overwrite = options?.overwrite ?? false;
		const plist = readPlist();
		if (!plist) throw new Error("plist root is not an object");
		let appliedWrites = [];
		for (const write of writes) {
			const { shortcut, property, propertyType } = write;
			const parts = shortcut.split("+");
			const key = parts.at(-1);
			const modifiers = parts.slice(0, -1);
			const mask = modifierType === "carbon" ? keystringsToCarbonModifierMask(modifiers) : keystringsToModifierMask(modifiers);
			const code = key in KeyMappingCode ? KeyMappingCode[key] : null;
			if (code === null) throw new Error(`Key "${key}" not found in key mapping`);
			const keymap = getKeyMapByCode(code);
			if (!keymap?.code) throw new Error(`Key "${key}" with code "${code}" not found in key mapping`);
			const object = {
				[modifierMaskKey]: mask,
				[keycodeKey]: keymap.mac
			};
			if (fastIsEqual(plist[property], object)) continue;
			if (plist[property] && !overwrite) {
				console.warn("Skipping write for property \"%s\" because it already exists and overwrite is false", property);
				continue;
			}
			const stringValue = JSON.stringify(object);
			plist[property] = propertyType === "string" ? stringValue : new Uint8Array(Buffer.from(stringValue, "utf8"));
			appliedWrites.push({
				property,
				propertyType,
				shortcut
			});
		}
		return {
			updatedPlist: plist,
			appliedWrites
		};
	}
	function buildHandler() {
		const plist = readPlist();
		return function handler(property) {
			const rawValue = plist?.[property];
			if (!rawValue) return false;
			const result = (0, import_json_parse_safe.default)(plistValueToString(rawValue));
			if ("error" in result) return false;
			const value = result.value;
			const keys = modifierType === "carbon" ? carbonModifiersToKeystrings(value[modifierMaskKey]) : modifiersToKeystrings(value[modifierMaskKey]);
			const keymap = getKeyMap({
				kind: "mac",
				code: value[keycodeKey]
			});
			if (!keymap?.code) return false;
			keys.push(keymap.code);
			tap(keys.join("+"));
			return true;
		};
	}
	return {
		createUpdatedPlist,
		buildHandler,
		readPlist
	};
}
//#endregion
export { serializeBplist as i, plistValueToString as n, require_json_parse_safe as r, getPlistShortcutUtils as t };
