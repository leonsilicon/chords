import untildify from "untildify";
import { getPlistShortcutUtils } from "#/utils/plist.ts";
import { ensureGlobalHotkeys } from "#/utils/global.ts";
import nullthrows from 'nullthrows-es'
import { includeKeys } from 'filter-obj'
import type { BuildHandler } from "../types/handler.ts";

export default (function buildWiheadsHandler(meta, tildepath: string) {
  const globalHotkeys = ensureGlobalHotkeys(
    includeKeys(meta.chords, (sequence) => sequence.startsWith('/')),
    {
      bundleId: meta.bundleId,
      getHotkeyId: (chord) => nullthrows(chord.args?.[0])
    }
  );

  const { buildHandler, writeShortcuts } = getPlistShortcutUtils({
    plistPath: untildify(tildepath),
    modifierMaskKey: 'internalModifiers',
    keycodeKey: 'keyCode',
    modifierType: 'modern'
  })
  writeShortcuts(globalHotkeys.map(({ chord, shortcut }) => ({
    property: nullthrows(chord.args?.[0]),
    // _Paste_ stores shortcuts as bytes
    propertyType: 'bytes',
    shortcut,
  })))

  return buildHandler()
} satisfies BuildHandler);
