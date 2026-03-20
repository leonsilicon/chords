import untildify from "untildify";
import { getPlistShortcutUtils, plistValueToString } from "#/utils/plist.ts";
import { ensureGlobalHotkeys } from "../utils/global.ts";
import { includeKeys } from "filter-obj";
import nullthrows from 'nullthrows-es'
import type { BuildHandler } from "../types/handler.ts";

interface PerItemHotkey {
  appName: string
  appBundleIdentifier: string
  keyName: string
}

export default (function buildBartenderHandler(meta, tildepath: string) {
  const globalHotkeys = ensureGlobalHotkeys(
    includeKeys(meta.chords, (sequence) => sequence.startsWith('/') || sequence.startsWith('-')),
    {
      bundleId: meta.bundleId,
      getHotkeyId: (chord) => nullthrows(chord.args?.[0])
    }
  );

  const { writeShortcuts, buildHandler, readPlist } = getPlistShortcutUtils({
    plistPath: untildify(tildepath),
    modifierType: 'carbon',
    modifierMaskKey: 'carbonModifiers',
    keycodeKey: 'carbonKeyCode',
  })
  writeShortcuts(globalHotkeys.map(({ chord, shortcut }) => ({
    property: nullthrows(chord.args?.[0]),
    // _Bartender_ stores shortcuts as strings
    propertyType: 'string',
    shortcut,
  })))
  const plistHandler = buildHandler();

  const plist = readPlist();
  function itemHandler(itemId: string): boolean {
    const rawValue = plist[0]?.['per-item-hotkeys']
    const value = JSON.parse(plistValueToString(rawValue)) as PerItemHotkey[];
    const item = value.find(item => item.appBundleIdentifier === itemId);
    if (item === undefined) {
      return false;
    }

    const property = `KeyboardShortcuts_${item.keyName}`;
    return plistHandler(property);
  }

  function shortcutHandler(property: string): boolean {
    return plistHandler(property);
  }

  function handler(type: 'item', itemId: string): boolean;
  function handler(type: 'shortcut', property: string): boolean;
  function handler(type: 'shortcut' | 'item', itemIdOrProperty: string): boolean {
    return type === 'item' ? itemHandler(itemIdOrProperty) : shortcutHandler(itemIdOrProperty);
  };

  return handler;
} satisfies BuildHandler);
