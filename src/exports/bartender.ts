import { parseBuffer } from "bplist-parser-pure";
import fs from "fs";
import { keyname } from "os-keycode";
import { carbonModifiersToStrings } from "#/utils/mac-keycode.ts";
import untildify from "untildify";
import { Buffer } from "buffer";
import { plistValueToString } from "../utils/plist.ts";

interface PerItemHotkey {
  appName: string
  appBundleIdentifier: string
  keyName: string
}

export default function buildBartenderHandler(tildepath: string) {
  const filepath = untildify(tildepath);
  const plist = parseBuffer(fs.readFileSync(filepath).buffer);

  function itemHandler(bundleId: string): boolean {
    const rawValue = plist[0]?.['per-item-hotkeys']
    const value = JSON.parse(plistValueToString(rawValue)) as PerItemHotkey[];
    const item = value.find(item => item.appBundleIdentifier === bundleId);
    if (item === undefined) {
      return false;
    }

    const property = `KeyboardShortcuts_${item.keyName}`;
    return shortcutHandler(property);
  }

  function shortcutHandler(property: string): boolean {
    const rawValue = plist[0]?.[property];
    if (!rawValue) {
      return false;
    }

    const value = JSON.parse(plistValueToString(rawValue));
    const keys = carbonModifiersToStrings(value.carbonModifiers);
    const keyInfo = keyname(value.carbonKeyCode);
    if (!keyInfo || !("key" in keyInfo)) {
      return false;
    }
    keys.push(keyInfo.key);
    tap(keys.join("+"));
    return true;
  }

  function handler(type: 'item', bundleId: string): boolean;
  function handler(type: 'global', property: string): boolean;
  function handler(type: 'item' | 'global', bundleIdOrProperty: string): boolean {
    return type === 'item' ? itemHandler(bundleIdOrProperty) : shortcutHandler(bundleIdOrProperty);
  };

  return handler;
}

export function makeItemShortcut(tildepath: string) {
  const filepath = untildify(tildepath);
}