import untildify from "untildify";
import { getPlistShortcutUtils } from "#/utils/plist.ts";
import { ensureGlobalHotkeys } from "#/utils/global.ts";
import nullthrows from "nullthrows-es";
import { includeKeys } from "filter-obj";
import { exists } from "./file.ts";
import noop from "@stdlib/utils-noop";
import { onAppTerminate, setAppNeedsRelaunch } from "chord";
import fs from "fs";
import { serializeBplist } from "bplist-lossless";

export default function buildPlistHandler(
  chordfile: any,
  tildepath: string,
  {
    globalPrefix,
    propertyType,
    keycodeKey,
    modifierMaskKey,
    modifierType,
  }: {
    globalPrefix: string | RegExp;
    propertyType: "string" | "bytes";
    keycodeKey: string;
    modifierMaskKey: string;
    modifierType: "carbon" | "modern";
  },
) {
  const plistPath = untildify(tildepath);
  if (!exists(plistPath)) {
    return noop;
  }

  const globalHotkeys = ensureGlobalHotkeys(
    includeKeys(chordfile.chords, (sequence) =>
      typeof globalPrefix === "string"
        ? sequence.startsWith(globalPrefix)
        : globalPrefix.test(sequence),
    ),
    {
      bundleId: chordfile.bundleId,
      getHotkeyId: (chord) => nullthrows(chord.args?.[0]),
    },
  );
  const writes = globalHotkeys.map(({ chord, shortcut }) => ({
    property: nullthrows(chord.args?.[0]),
    propertyType,
    shortcut,
  }));

  const { buildHandler, createUpdatedPlist } = getPlistShortcutUtils({
    plistPath: untildify(tildepath),
    modifierMaskKey,
    keycodeKey,
    modifierType,
  });
  const needsRelaunch = createUpdatedPlist(writes, { overwrite: false }).appliedWrites.length > 0;
  if (needsRelaunch) {
    setAppNeedsRelaunch(chordfile.bundleId, true);
    const unregister = onAppTerminate(chordfile.bundleId, () => {
      const { updatedPlist } = createUpdatedPlist(writes, { overwrite: true });
      fs.writeFileSync(plistPath, serializeBplist(updatedPlist));
      unregister();
    });
  }

  return buildHandler();
}
