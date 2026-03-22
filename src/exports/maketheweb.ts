import untildify from "untildify";
import { ensureGlobalHotkeys } from "#/utils/global.ts";
import nullthrows from "nullthrows-es";
import { getPlistShortcutUtils } from "#/utils/plist.ts";
import { includeKeys } from "filter-obj";
import type { BuildHandler } from "../types/handler.ts";
import { exists } from "../utils/file.ts";
import noop from "@stdlib/utils-noop";
import { serializeBplist } from "bplist-lossless";
import fs from "fs";
import { onAppTerminate, setAppNeedsRelaunch } from "chordsapp";

export default (function buildMakethewebHandler(meta, tildepath: string) {
  const plistPath = untildify(tildepath);
  if (!exists(plistPath)) {
    return noop;
  }

  const globalHotkeys = ensureGlobalHotkeys(
    includeKeys(meta.chords, (sequence) => sequence.startsWith("/")),
    {
      bundleId: meta.bundleId,
      getHotkeyId: (chord) => nullthrows(chord.args?.[0]),
    },
  );
  const writes = globalHotkeys.map(({ chord, shortcut }) => ({
    property: nullthrows(chord.args?.[0]),
    // _PixelSnap_ and _CleanShot X_ stores shortcuts as bytes
    propertyType: "bytes" as const,
    shortcut,
  }));

  const { buildHandler, createUpdatedPlist } = getPlistShortcutUtils({
    plistPath,
    modifierType: "carbon",
    modifierMaskKey: "carbonModifiers",
    keycodeKey: "carbonKey",
  });
  const needsRelaunch = createUpdatedPlist(writes, { overwrite: false }).appliedWrites.length > 0;
  if (needsRelaunch) {
    setAppNeedsRelaunch(meta.bundleId, true);
    const unregister = onAppTerminate(meta.bundleId, () => {
      const { updatedPlist } = createUpdatedPlist(writes, { overwrite: true });
      fs.writeFileSync(plistPath, serializeBplist(updatedPlist));
      unregister();
    });
  }

  return buildHandler();
} satisfies BuildHandler);
