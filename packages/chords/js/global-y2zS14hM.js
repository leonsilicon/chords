import { getGlobalHotkey, registerGlobalHotkey } from "chord";
//#region src/js/utils/global.ts
/**
Ensures that global hotkeys are registered.

Returns a list of global hotkeys.
*/
function ensureGlobalHotkeys(globalChords, { bundleId, getHotkeyId }) {
	return Object.entries(globalChords).flatMap(([sequence, chord]) => {
		if (!chord) return [];
		const hotkeyId = getHotkeyId(chord);
		let isNew = true;
		let shortcut = getGlobalHotkey(bundleId, hotkeyId);
		if (!shortcut) {
			isNew = false;
			shortcut = registerGlobalHotkey(bundleId, hotkeyId);
		}
		if (shortcut === void 0) {
			console.warn(`Failed to register global hotkey for ${bundleId} ${hotkeyId}`);
			return [];
		}
		return [{
			chord,
			sequence,
			shortcut,
			isNew
		}];
	});
}
//#endregion
export { ensureGlobalHotkeys as t };
