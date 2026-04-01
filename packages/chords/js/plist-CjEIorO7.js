import fs from "fs";
import { tap } from "chord";
import { KeyMappingCode, getKeyMap, getKeyMapByCode } from "keycode-ts2";
import { parseBplist } from "bplist-lossless";
import { fastIsEqual } from "fast-is-equal";
import parseJson from "json-parse-safe";
import decodeUtf8 from "decode-utf8";
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
//#region src/js/utils/plist.ts
function plistValueToString(rawValue) {
	return Buffer.isBuffer(rawValue) ? decodeUtf8(rawValue) : String(rawValue);
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
			const result = parseJson(plistValueToString(rawValue));
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
export { plistValueToString as n, getPlistShortcutUtils as t };
