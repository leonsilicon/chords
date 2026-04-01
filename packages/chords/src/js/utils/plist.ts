import fs from "fs";
import {
  carbonModifiersToKeystrings,
  modifiersToKeystrings,
  keystringsToCarbonModifierMask,
  keystringsToModifierMask,
} from "./mac-keycode.ts";
import { getKeyMap, getKeyMapByCode, KeyMappingCode } from "keycode-ts2";
import { tap } from "chord";
import { parseBplist, serializeBplist } from "bplist-lossless";
import { fastIsEqual } from "fast-is-equal";
import parseJson from "json-parse-safe";
import decodeUtf8 from "decode-utf8";
import { Buffer } from "buffer";

export function plistValueToString(rawValue: unknown): string {
  const valueString = Buffer.isBuffer(rawValue) ? decodeUtf8(rawValue) : String(rawValue);

  return valueString;
}

type ShortcutWrite = {
  property: string;
  propertyType: "string" | "bytes";
  shortcut: string;
};

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
    const plist = parseBplist(fs.readFileSync(plistPath));
    return plist;
  }

  function createUpdatedPlist(writes: ShortcutWrite[], options?: { overwrite?: boolean }) {
    const overwrite = options?.overwrite ?? false;

    let plistNeedsUpdates = false;
    const plist = readPlist();
    if (!plist) {
      throw new Error("plist root is not an object");
    }

    let appliedWrites: ShortcutWrite[] = [];
    for (const write of writes) {
      const { shortcut, property, propertyType } = write;
      const parts = shortcut.split("+");
      const key = parts.at(-1)!;
      const modifiers = parts.slice(0, -1);
      const mask =
        modifierType === "carbon"
          ? keystringsToCarbonModifierMask(modifiers)
          : keystringsToModifierMask(modifiers);

      const code =
        key in KeyMappingCode ? KeyMappingCode[key as keyof typeof KeyMappingCode] : null;
      if (code === null) {
        throw new Error(`Key "${key}" not found in key mapping`);
      }

      const keymap = getKeyMapByCode(code);
      if (!keymap?.code) {
        throw new Error(`Key "${key}" with code "${code}" not found in key mapping`);
      }

      const object = {
        [modifierMaskKey]: mask,
        [keycodeKey]: keymap.mac,
      };

      if (fastIsEqual(plist[property], object)) {
        continue;
      }

      if (plist[property] && !overwrite) {
        console.warn(
          'Skipping write for property "%s" because it already exists and overwrite is false',
          property,
        );
        continue;
      }

      const stringValue = JSON.stringify(object);
      const value =
        propertyType === "string" ? stringValue : new Uint8Array(Buffer.from(stringValue, "utf8"));

      plist[property] = value;
      appliedWrites.push({ property, propertyType, shortcut });
    }

    return {
      updatedPlist: plist,
      appliedWrites,
    };
  }

  function buildHandler() {
    // Caches it so we don't read on every handler call
    const plist = readPlist();

    return function handler(property: string) {
      const rawValue = plist?.[property];
      if (!rawValue) {
        return false;
      }

      const result = parseJson(plistValueToString(rawValue));
      if ("error" in result) {
        return false;
      }
      const value = result.value;

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
    createUpdatedPlist,
    buildHandler,
    readPlist,
  };
}
