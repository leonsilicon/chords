import { Buffer } from "buffer";
import fs from "fs";
import {
  carbonModifiersToKeystrings,
  modifiersToKeystrings,
  keystringsToCarbonModifierMask,
  keystringsToModifierMask,
} from "./mac-keycode.ts";
import { getKeyMap, getKeyMapByCode, KeyMappingCode } from "keycode-ts2";
import { tap } from "chordsapp";
import * as binaryPlist from "./plist-binary.ts";
import { fastIsEqual } from "fast-is-equal";

export function plistValueToString(rawValue: unknown): string {
  const valueString =
    rawValue instanceof Uint8Array
      ? Buffer.from(rawValue).toString("utf8")
      : String(rawValue);

  return valueString;
}

type ShortcutWrite = {
  property: string;
  propertyType: "string" | "bytes";
  shortcut: string;
};

function toArrayBuffer(buf: Buffer) {
  return buf.buffer.slice(
    buf.byteOffset,
    buf.byteOffset + buf.byteLength,
  ) as ArrayBuffer;
}

export function getPlistShortcutUtils({
  plistPath,
  modifierMaskKey,
  modifierType,
  keycodeKey,
}: {
  plistPath: string;
  modifierMaskKey: string;
  modifierType: "carbon" | "modern";
  keycodeKey: string;
}) {
  function readPlist() {
    const plist = binaryPlist.parse(
      toArrayBuffer(fs.readFileSync(plistPath)),
    ) as any;
    return plist;
  }

  function writeShortcuts(writes: ShortcutWrite[]) {
    let plistNeedsUpdates = false;
    const root = readPlist();
    if (!root) {
      throw new Error("plist root is not an object");
    }

    for (const { shortcut, property, propertyType } of writes) {
      const parts = shortcut.split("+");
      const key = parts.at(-1)!;
      const modifiers = parts.slice(0, -1);
      const mask =
        modifierType === "carbon"
          ? keystringsToCarbonModifierMask(modifiers)
          : keystringsToModifierMask(modifiers);

      const code =
        key in KeyMappingCode
          ? KeyMappingCode[key as keyof typeof KeyMappingCode]
          : null;
      if (code === null) {
        throw new Error(`Key "${key}" not found in key mapping`);
      }

      const keymap = getKeyMapByCode(code);
      if (!keymap?.code) {
        throw new Error(
          `Key "${key}" with code "${code}" not found in key mapping`,
        );
      }

      const object = {
        [modifierMaskKey]: mask,
        [keycodeKey]: keymap.mac,
      };

      if (fastIsEqual(root[property], object)) {
        continue;
      }

      const stringValue = JSON.stringify(object);
      const value =
        propertyType === "string"
          ? stringValue
          : new Uint8Array(Buffer.from(stringValue, "utf8"));

      root[property] = value;
      plistNeedsUpdates = true;
    }

    if (plistNeedsUpdates) {
      fs.writeFileSync(plistPath, binaryPlist.serialize(plist));
    }

    return plistNeedsUpdates;
  }

  function buildHandler() {
    // Caches it so we don't read on every handler call
    const plist = readPlist();

    return function handler(property: string) {
      const rawValue = plist?.[property];
      if (!rawValue) {
        return false;
      }

      const value = JSON.parse(plistValueToString(rawValue));
      const keys =
        modifierType === "carbon"
          ? carbonModifiersToKeystrings(value[modifierMaskKey])
          : modifiersToKeystrings(value[modifierMaskKey]);
      const keymap = getKeyMap({
        kind: "mac",
        code: value[keycodeKey],
      });

      if (!keymap?.code) {
        return false;
      }

      keys.push(keymap.code);
      tap(keys.join("+"));
      return true;
    };
  }

  return {
    writeShortcuts,
    buildHandler,
    readPlist,
  };
}
