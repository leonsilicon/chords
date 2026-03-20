import untildify from "untildify";
import { ensureGlobalHotkeys } from "../utils/global.ts";
import nullthrows from 'nullthrows-es'
import { getPlistShortcutUtils } from "../utils/plist.ts";
import { includeKeys } from "filter-obj";
import type { BuildHandler } from "../types/handler.ts";

export default (function buildMakethewebHandler(meta, tildepath: string) {
  const globalHotkeys = ensureGlobalHotkeys(
    includeKeys(meta.chords, (sequence) => sequence.startsWith('/')),
    {
      bundleId: meta.bundleId,
      getHotkeyId: (chord) => nullthrows(chord.args?.[0])
    }
  );

  const { buildHandler, writeShortcuts } = getPlistShortcutUtils({
    plistPath: untildify(tildepath),
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
