import untildify from "untildify";
import { ensureGlobalHotkeys } from "#/utils/global.ts";
import nullthrows from 'nullthrows-es'
import { getPlistShortcutUtils } from "#/utils/plist.ts";
import { includeKeys } from "filter-obj";
import type { BuildHandler } from "../types/handler.ts";
import { exists } from "../utils/file.ts";
import noop from "@stdlib/utils-noop";

export default (function buildMakethewebHandler(meta, tildepath: string) {
  const plistPath = untildify(tildepath);
  if (!exists(plistPath)) {
    return noop;
  }

  const globalHotkeys = ensureGlobalHotkeys(
    includeKeys(meta.chords, (sequence) => sequence.startsWith('/')),
    {
      bundleId: meta.bundleId,
      getHotkeyId: (chord) => nullthrows(chord.args?.[0])
    }
  );

  const { buildHandler, writeShortcuts } = getPlistShortcutUtils({
    plistPath,
    modifierType: 'carbon',
    modifierMaskKey: 'carbonModifiers',
    keycodeKey: 'carbonKey',
  })
  writeShortcuts(globalHotkeys.map(({ chord, shortcut }) => ({
    property: nullthrows(chord.args?.[0]),
    // _PixelSnap_ and _CleanShot X_ stores shortcuts as bytes
    propertyType: 'bytes',
    shortcut,
  })))

  return buildHandler()
} satisfies BuildHandler)
