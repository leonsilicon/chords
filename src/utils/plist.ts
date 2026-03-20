import { parseBuffer } from "bplist-parser-pure";
import { Buffer } from "buffer";
import fs from 'fs'
import { carbonModifiersToKeystrings, modifiersToKeystrings, keystringsToCarbonModifierMask, keystringsToModifierMask } from "./mac-keycode.ts";
import { keyname } from "os-keycode";
import { tap } from "chordsapp";
import { keycode } from 'os-keycode'
import bplist from "bplist-creator-pure";
import { fastIsEqual } from 'fast-is-equal'

export function plistValueToString(rawValue: unknown): string {
  const valueString =
    rawValue instanceof Uint8Array ? Buffer.from(rawValue).toString("utf8") : String(rawValue);

    return valueString
}

type ShortcutWrite = {
  property: string,
  propertyType: 'string' | 'bytes',
  shortcut: string
}

export function getPlistShortcutUtils({
  plistPath,
  modifierMaskKey,
  modifierType,
  keycodeKey
}: {
  plistPath: string,
  modifierMaskKey: string,
  modifierType: 'carbon' | 'modern'
  keycodeKey: string
}) {
  function readPlist() {
    const plist = parseBuffer(fs.readFileSync(plistPath).buffer);
    return plist
  }

  function writeShortcuts(writes: ShortcutWrite[]) {
    let plistNeedsUpdates = false;
    const plist = readPlist()
    const root = plist[0]
    if (!root) {
      throw new Error("plist root is not an object");
    }

    for (const { shortcut, property, propertyType } of writes) {
      const parts = shortcut.split('+');
      const key = parts.at(-1)!;
      const modifiers = parts.slice(0, -1);
      const mask = modifierType === 'carbon' ? keystringsToCarbonModifierMask(modifiers) : keystringsToModifierMask(modifiers);

      const object = {
        [modifierMaskKey]: mask,
        [keycodeKey]: keycode(key)
      }
      if (fastIsEqual(root[property], object)) {
        continue;
      }

      const stringValue = JSON.stringify(object);
      const value =
        propertyType === 'string'
          ? stringValue
          : new Uint8Array(Buffer.from(stringValue, 'utf8'));

        root[property] = value;
    }

    if (plistNeedsUpdates) {
      fs.writeFileSync(plistPath, bplist(plist));
    }

    return plistNeedsUpdates
  }

  function buildHandler() {
    // Caches it so we don't read on every handler call
    const plist = readPlist();

    return function handler(property: string) {
      const rawValue = plist[0]?.[property];
      if (!rawValue) {
        return false;
      }

      const value = JSON.parse(plistValueToString(rawValue));
      const keys = modifierType === 'carbon' ? carbonModifiersToKeystrings(value[modifierMaskKey]) : modifiersToKeystrings(value[modifierMaskKey]);
      const keyInfo = keyname(value[keycodeKey]);
      if (!keyInfo || !("key" in keyInfo)) {
        return false;
      }
      keys.push(keyInfo.key);
      tap(keys.join("+"));
      return true;
    }
  }

  return {
    writeShortcuts,
    buildHandler,
    readPlist
  }
}