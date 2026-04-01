import { r as __toESM, t as require_lib } from "./lib-BcpI7GUj.js";
import { a as includeKeys, c as untildify, i as nullthrows, o as ensureGlobalHotkeys, s as exists } from "./dist-DhGxq6nI.js";
import { i as serializeBplist, n as plistValueToString, r as require_json_parse_safe, t as getPlistShortcutUtils } from "./plist-DwWwaE8N.js";
import fs from "fs";
import { onAppTerminate, setAppNeedsRelaunch } from "chord";
//#region node_modules/.pnpm/encode-utf8@2.0.0/node_modules/encode-utf8/index.js
var import_lib = /* @__PURE__ */ __toESM(require_lib(), 1);
var import_json_parse_safe = /* @__PURE__ */ __toESM(require_json_parse_safe(), 1);
function encodeUtf8(input) {
	const result = [];
	const size = input.length;
	for (let index = 0; index < size; index++) {
		let point = input.charCodeAt(index);
		if (point >= 55296 && point <= 56319 && size > index + 1) {
			const second = input.charCodeAt(index + 1);
			if (second >= 56320 && second <= 57343) {
				point = (point - 55296) * 1024 + second - 56320 + 65536;
				index += 1;
			}
		}
		if (point < 128) {
			result.push(point);
			continue;
		}
		if (point < 2048) {
			result.push(point >> 6 | 192);
			result.push(point & 63 | 128);
			continue;
		}
		if (point < 55296 || point >= 57344 && point < 65536) {
			result.push(point >> 12 | 224);
			result.push(point >> 6 & 63 | 128);
			result.push(point & 63 | 128);
			continue;
		}
		if (point >= 65536 && point <= 1114111) {
			result.push(point >> 18 | 240);
			result.push(point >> 12 & 63 | 128);
			result.push(point >> 6 & 63 | 128);
			result.push(point & 63 | 128);
			continue;
		}
		result.push(239, 191, 189);
	}
	return new Uint8Array(result).buffer;
}
//#endregion
//#region src/js/bartender.ts
function buildBartenderHandler(tildepath) {
	const plistPath = untildify(tildepath);
	if (!exists(plistPath)) return import_lib.default;
	const globalHotkeys = ensureGlobalHotkeys(includeKeys(this.chords, (sequence) => sequence.startsWith("/") || sequence.startsWith("-")), {
		bundleId: this.bundleId,
		getHotkeyId: (chord) => nullthrows(chord.args?.[2] ?? chord.args?.[1])
	});
	const writes = globalHotkeys.map(({ chord, shortcut }) => {
		return {
			property: chord.args?.[2] ? `KeyboardShortcuts_${chord.args[2]}` : nullthrows(chord.args?.[1]),
			propertyType: "string",
			shortcut
		};
	});
	const { createUpdatedPlist, buildHandler } = getPlistShortcutUtils({
		plistPath,
		modifierType: "carbon",
		modifierMaskKey: "carbonModifiers",
		keycodeKey: "carbonKeyCode"
	});
	if (createUpdatedPlist(writes).appliedWrites.length > 0) {
		setAppNeedsRelaunch(this.bundleId, true);
		onAppTerminate(this.bundleId, () => {
			const { updatedPlist: plist } = createUpdatedPlist(writes, { overwrite: false });
			const result = (0, import_json_parse_safe.default)(plistValueToString(plist["per-item-hotkeys"]));
			let perItemHotkeyList = [];
			if ("error" in result) perItemHotkeyList = [];
			else perItemHotkeyList = result.value;
			for (const { chord } of globalHotkeys) {
				const appBundleIdentifier = chord.args?.[1];
				const keyName = chord.args?.[2];
				const appName = chord.args?.[3];
				if (!appBundleIdentifier || !keyName || !appName) continue;
				if (perItemHotkeyList.some((item) => item.keyName === keyName)) continue;
				const item = {
					appName,
					appBundleIdentifier,
					keyName
				};
				perItemHotkeyList.push(item);
			}
			plist["per-item-hotkeys"] = new Uint8Array(encodeUtf8(JSON.stringify(perItemHotkeyList)));
			fs.writeFileSync(plistPath, serializeBplist(plist));
		});
	}
	const plistHandler = buildHandler();
	function itemHandler(itemId, keyName, appName) {
		return plistHandler(`KeyboardShortcuts_${keyName}`);
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
}
//#endregion
export { buildBartenderHandler as default };
