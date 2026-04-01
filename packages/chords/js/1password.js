import { t as exists } from "./file-BC3LWRm1.js";
import { t as ensureGlobalHotkeys } from "./global-y2zS14hM.js";
import untildify from "untildify";
import noop from "@stdlib/utils-noop";
import fs from "fs";
import { tap } from "chord";
import { includeKeys } from "filter-obj";
import nullthrows from "nullthrows-es";
import { parse, stringify } from "doctor-json";
import { KeyMappingCode, getKeyMapByCode } from "keycode-ts2";
//#region src/js/utils/electron.ts
function parseElectronAccelerator(accelerator) {
	return accelerator.toLowerCase().split("+").map((part) => {
		switch (part) {
			case "commandorcontrol":
			case "cmdorctrl": return process.platform === "darwin" ? KeyMappingCode.MetaLeft : KeyMappingCode.ControlLeft;
			case "control":
			case "ctrl": return KeyMappingCode.ControlLeft;
			case "alt":
			case "option": return KeyMappingCode.AltLeft;
			case "altgr": return KeyMappingCode.AltRight;
			case "shift": return KeyMappingCode.ShiftLeft;
			case "command":
			case "cmd":
			case "meta":
			case "super": return KeyMappingCode.MetaLeft;
		}
		function parseKeyPart(part) {
			const match = part.match(/\[([^\]]+)\](.*)/);
			if (match) return {
				key: match[1],
				output: match[2]
			};
			return {
				key: part,
				output: part
			};
		}
		part = parseKeyPart(part).key;
		if (/^[a-z]$/.test(part)) return `Key${part.toUpperCase()}`;
		if (/^\d$/.test(part)) return `Digit${part}`;
		if (/^f\d{1,2}$/.test(part)) return part.toUpperCase();
		const keymap = getKeyMapByCode(part);
		if (keymap?.code) return keymap.code;
		throw new Error(`Unknown accelerator part: ${part}`);
	});
}
function toElectronAccelerator(shortcut) {
	return shortcut.split("+").map((part) => {
		const code = getKeyMapByCode(part)?.code;
		if (!code) throw new Error(`Unknown shortcut part: ${part}`);
		switch (code) {
			case KeyMappingCode.MetaLeft:
			case KeyMappingCode.MetaRight: return "CommandOrControl";
			case KeyMappingCode.ControlLeft:
			case KeyMappingCode.ControlRight: return "Control";
			case KeyMappingCode.AltLeft: return "Alt";
			case KeyMappingCode.AltRight: return "AltGr";
			case KeyMappingCode.ShiftLeft:
			case KeyMappingCode.ShiftRight: return "Shift";
			default:
				if (code.startsWith("Key")) return code.replace("Key", "");
				if (code.startsWith("Digit")) return code.replace("Digit", "");
				if (/^F\d{1,2}$/i.test(code)) return code.toUpperCase();
				throw new Error(`Unsupported key code: ${code}`);
		}
	}).join("+");
}
//#endregion
//#region src/js/1password.ts
function build1PasswordHandler() {
	const settingsJsonFilepath = untildify("~/Library/Group Containers/2BUA8C4S2C.com.1password/Library/Application Support/1Password/Data/settings/settings.json");
	if (!exists(settingsJsonFilepath)) return noop;
	const globalHotkeys = ensureGlobalHotkeys(includeKeys(this.chords, (sequence) => sequence.startsWith("/")), {
		bundleId: this.bundleId,
		getHotkeyId: (chord) => nullthrows(chord.args?.[0])
	});
	if (globalHotkeys.length > 0) {
		const settings = parse(fs.readFileSync(settingsJsonFilepath, "utf8"));
		for (const { chord, shortcut } of globalHotkeys) {
			const hotkeyId = nullthrows(chord.args?.[0]);
			const onePasswordAccelerator = toElectronAccelerator(shortcut).replace(/\+([^+]+)$/, (_match, key) => `+[${key.toLowerCase()}]${key}`);
			settings[`keybinds.${hotkeyId}`] = onePasswordAccelerator;
		}
		fs.writeFileSync(settingsJsonFilepath, stringify(settings));
	}
	const settings = parse(fs.readFileSync(settingsJsonFilepath, "utf8"));
	return function handler(shortcutSlug) {
		const electronAccelerator = settings[`keybinds.${shortcutSlug}`];
		if (!electronAccelerator) return false;
		tap(parseElectronAccelerator(electronAccelerator).join("+"));
	};
}
//#endregion
export { build1PasswordHandler as default };
