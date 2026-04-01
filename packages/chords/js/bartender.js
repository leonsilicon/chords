import { t as exists } from "./file-BC3LWRm1.js";
import { t as ensureGlobalHotkeys } from "./global-y2zS14hM.js";
import { n as plistValueToString, t as getPlistShortcutUtils } from "./plist-CjEIorO7.js";
import untildify from "untildify";
import noop from "@stdlib/utils-noop";
import fs from "fs";
import { onAppTerminate, setAppNeedsRelaunch } from "chord";
import { includeKeys } from "filter-obj";
import nullthrows from "nullthrows-es";
import { serializeBplist } from "bplist-lossless";
import parseJson from "json-parse-safe";
import encodeUtf8 from "encode-utf8";
//#region src/js/bartender.ts
function buildBartenderHandler(tildepath) {
	const plistPath = untildify(tildepath);
	if (!exists(plistPath)) return noop;
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
			const result = parseJson(plistValueToString(plist["per-item-hotkeys"]));
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
