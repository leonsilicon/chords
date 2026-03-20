import untildify from "untildify";
import { getPlistShortcutUtils, plistValueToString } from "#/utils/plist.ts";
import { ensureGlobalHotkeys } from "#/utils/global.ts";
import { includeKeys } from "filter-obj";
import nullthrows from 'nullthrows-es'
import type { BuildHandler } from "../types/handler.ts";
import { exists } from "../utils/file.ts";
import noop from "@stdlib/utils-noop";
import bplist from "bplist-creator-pure";
import { Buffer } from "buffer";
import fs from 'fs'

interface PerItemHotkey {
  appName: string
  appBundleIdentifier: string
  keyName: string
}

export default (function buildBartenderHandler(meta, tildepath: string) {
  const plistPath = untildify(tildepath);
  if (!exists(plistPath)) {
    return noop;
  }

  const globalHotkeys = ensureGlobalHotkeys(
    includeKeys(meta.chords, (sequence) => sequence.startsWith('/') || sequence.startsWith('-')),
    {
      bundleId: meta.bundleId,
      getHotkeyId: (chord) => nullthrows(chord.args?.[0])
    }
  );

  const { writeShortcuts, buildHandler, readPlist } = getPlistShortcutUtils({
    plistPath,
    modifierType: 'carbon',
    modifierMaskKey: 'carbonModifiers',
    keycodeKey: 'carbonKeyCode',
  })
  writeShortcuts(globalHotkeys.map(({ chord, shortcut }) => ({
    // The 0th entry is the type ('item | 'shortcut')
    property: nullthrows(chord.args?.[1]),
    // _Bartender_ stores shortcuts as strings
    propertyType: 'string',
    shortcut,
  })))

  // TODO: For each per-item shortcut, we also need to add it to per-item-hotkeys
  {
    const plist = readPlist()
    const root = plist[0]!;
    const rawValue = plistValueToString(root['per-item-hotkeys']) ?? '[]'
    const perItemHotkeyList = JSON.parse(rawValue) as PerItemHotkey[];

    for (const { chord } of globalHotkeys) {
      const appBundleIdentifier = chord.args?.[1]
      const keyName = chord.args?.[2]
      const appName = chord.args?.[3]
      if (!appBundleIdentifier || !keyName || !appName) {
        continue;
      }

      if (perItemHotkeyList.some(item => item.keyName === keyName)) {
        continue;
      }

      const item: PerItemHotkey = {
        appName,
        appBundleIdentifier,
        keyName,
      }
      perItemHotkeyList.push(item);
    }

    root['per-item-hotkeys'] = new Uint8Array(Buffer.from(JSON.stringify(perItemHotkeyList), 'utf8'));
    fs.writeFileSync(plistPath, bplist(plist));
  }

  const plistHandler = buildHandler();

  const plist = readPlist();
  function itemHandler(itemId: string, keyName: string, appName: string): boolean {
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

  function handler(type: 'shortcut', property: string): boolean;
  function handler(type: 'item', appBundleIdentifier: string, keyName: string, appName: string): boolean;
  function handler(...args: ['shortcut', property: string] |  ['item', appBundleIdentifier: string, keyName: string, appName: string]): boolean {
    if (args[0] === 'shortcut') {
      const [type, property] = args;
      return shortcutHandler(property);
    } else {
      const [type, appBundleIdentifier, keyName, appName] = args;
      return itemHandler(appBundleIdentifier, keyName, appName);
    }
  };

  return handler;
} satisfies BuildHandler);
