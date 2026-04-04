import untildify from "untildify";
import { getPlistShortcutUtils } from "#/utils/plist.ts";
import { ensureGlobalHotkeys } from "#/utils/global.ts";
import nullthrows from "nullthrows-es";
import { includeKeys } from "filter-obj";
import { exists } from "#/utils/file.ts";
import noop from "@stdlib/utils-noop";
import { onAppTerminate, setAppNeedsRelaunch, type BuilderThis } from "chord";
import fs from "fs";
import { serializeBplist } from "bplist-lossless";

export default function buildWiheadsHandler(this: BuilderThis, tildepath: string) {
  const plistPath = untildify(tildepath);
  if (!exists(plistPath)) {
    return noop;
  }

  const globalHotkeys = ensureGlobalHotkeys(
    includeKeys(this.chordsFile.chords, (sequence) => sequence.startsWith("/")),
    {
      bundleId: this.chordsFileAppId,
      getHotkeyId: (chord) => nullthrows(chord['emit:hotkey']?.[0]),
    },
  );
  const writes = globalHotkeys.map(({ chord, shortcut }) => ({
    property: nullthrows(chord['emit:hotkey']?.[0]),
    // _Paste_ stores shortcuts as bytes
    propertyType: "bytes" as const,
    shortcut,
  }));

  const { buildHandler, createUpdatedPlist } = getPlistShortcutUtils({
    plistPath: untildify(tildepath),
    modifierMaskKey: "internalModifiers",
    keycodeKey: "keyCode",
    modifierType: "modern",
  });
  const needsRelaunch = createUpdatedPlist(writes, { overwrite: false }).appliedWrites.length > 0;
  if (needsRelaunch) {
    setAppNeedsRelaunch(this.chordsFileAppId, true);
    const unregister = onAppTerminate(this.chordsFileAppId, () => {
      const { updatedPlist } = createUpdatedPlist(writes, { overwrite: true });
      fs.writeFileSync(plistPath, serializeBplist(updatedPlist));
      unregister();
    });
  }

  return buildHandler();
}
