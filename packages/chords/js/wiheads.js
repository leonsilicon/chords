import { t as exists } from "./file-BC3LWRm1.js";
import { t as ensureGlobalHotkeys } from "./global-y2zS14hM.js";
import { t as getPlistShortcutUtils } from "./plist-CjEIorO7.js";
import untildify from "untildify";
import noop from "@stdlib/utils-noop";
import fs from "fs";
import { onAppTerminate, setAppNeedsRelaunch } from "chord";
import { includeKeys } from "filter-obj";
import nullthrows from "nullthrows-es";
import { serializeBplist } from "bplist-lossless";
//#region src/js/wiheads.ts
function buildWiheadsHandler(tildepath) {
	const plistPath = untildify(tildepath);
	if (!exists(plistPath)) return noop;
	const writes = ensureGlobalHotkeys(includeKeys(this.chords, (sequence) => sequence.startsWith("/")), {
		bundleId: this.bundleId,
		getHotkeyId: (chord) => nullthrows(chord.args?.[0])
	}).map(({ chord, shortcut }) => ({
		property: nullthrows(chord.args?.[0]),
		propertyType: "bytes",
		shortcut
	}));
	const { buildHandler, createUpdatedPlist } = getPlistShortcutUtils({
		plistPath: untildify(tildepath),
		modifierMaskKey: "internalModifiers",
		keycodeKey: "keyCode",
		modifierType: "modern"
	});
	if (createUpdatedPlist(writes, { overwrite: false }).appliedWrites.length > 0) {
		setAppNeedsRelaunch(this.bundleId, true);
		const unregister = onAppTerminate(this.bundleId, () => {
			const { updatedPlist } = createUpdatedPlist(writes, { overwrite: true });
			fs.writeFileSync(plistPath, serializeBplist(updatedPlist));
			unregister();
		});
	}
	return buildHandler();
}
//#endregion
export { buildWiheadsHandler as default };
