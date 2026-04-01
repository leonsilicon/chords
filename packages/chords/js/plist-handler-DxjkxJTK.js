import { r as __toESM, t as require_lib } from "./lib-BcpI7GUj.js";
import { a as includeKeys, c as untildify, i as nullthrows, o as ensureGlobalHotkeys, s as exists } from "./dist-DhGxq6nI.js";
import { i as serializeBplist, t as getPlistShortcutUtils } from "./plist-DwWwaE8N.js";
import fs from "fs";
import { onAppTerminate, setAppNeedsRelaunch } from "chord";
//#region src/js/utils/plist-handler.ts
var import_lib = /* @__PURE__ */ __toESM(require_lib(), 1);
function buildPlistHandler(chordfile, tildepath, { globalPrefix, propertyType, keycodeKey, modifierMaskKey, modifierType }) {
	const plistPath = untildify(tildepath);
	if (!exists(plistPath)) return import_lib.default;
	const writes = ensureGlobalHotkeys(includeKeys(chordfile.chords, (sequence) => typeof globalPrefix === "string" ? sequence.startsWith(globalPrefix) : globalPrefix.test(sequence)), {
		bundleId: chordfile.bundleId,
		getHotkeyId: (chord) => nullthrows(chord.args?.[0])
	}).map(({ chord, shortcut }) => ({
		property: nullthrows(chord.args?.[0]),
		propertyType,
		shortcut
	}));
	const { buildHandler, createUpdatedPlist } = getPlistShortcutUtils({
		plistPath: untildify(tildepath),
		modifierMaskKey,
		keycodeKey,
		modifierType
	});
	if (createUpdatedPlist(writes, { overwrite: false }).appliedWrites.length > 0) {
		setAppNeedsRelaunch(chordfile.bundleId, true);
		const unregister = onAppTerminate(chordfile.bundleId, () => {
			const { updatedPlist } = createUpdatedPlist(writes, { overwrite: true });
			fs.writeFileSync(plistPath, serializeBplist(updatedPlist));
			unregister();
		});
	}
	return buildHandler();
}
//#endregion
export { buildPlistHandler as t };
