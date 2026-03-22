import untildify from "untildify";
import { getPlistShortcutUtils, plistValueToString } from "#/utils/plist.ts";
import { ensureGlobalHotkeys } from "#/utils/global.ts";
import { includeKeys } from "filter-obj";
import nullthrows from "nullthrows-es";
import type { BuildHandler } from "../types/handler.ts";
import { exists } from "../utils/file.ts";
import noop from "@stdlib/utils-noop";
import { serializeBplist } from "bplist-lossless";
import parseJson from "json-parse-safe";
import encodeUtf8 from "encode-utf8";
import fs from "fs";
import { onAppTerminate, setAppNeedsRelaunch } from "chordsapp";

interface PerItemHotkey {
  appName: string;
  appBundleIdentifier: string;
  keyName: string;
}

export default (function buildBartenderHandler(meta, tildepath: string) {
  const plistPath = untildify(tildepath);
  if (!exists(plistPath)) {
    return noop;
  }

  const globalHotkeys = ensureGlobalHotkeys(
    includeKeys(meta.chords, (sequence) => sequence.startsWith("/") || sequence.startsWith("-")),
    {
      bundleId: meta.bundleId,
      // index 2 is the item id, index 1 is the property
      getHotkeyId: (chord) => nullthrows(chord.args?.[2] ?? chord.args?.[1]),
    },
  );
  const writes = globalHotkeys.map(({ chord, shortcut }) => {
    const property = chord.args?.[2]
      ? `KeyboardShortcuts_${chord.args[2]}`
      : nullthrows(chord.args?.[1]);
    return {
      property,
      // _Bartender_ stores shortcuts as strings
      propertyType: "string" as const,
      shortcut,
    };
  });

  const { createUpdatedPlist, buildHandler } = getPlistShortcutUtils({
    plistPath,
    modifierType: "carbon",
    modifierMaskKey: "carbonModifiers",
    keycodeKey: "carbonKeyCode",
  });
  const needsRelaunch = createUpdatedPlist(writes).appliedWrites.length > 0;
  if (needsRelaunch) {
    setAppNeedsRelaunch(meta.bundleId, true);
    onAppTerminate(meta.bundleId, () => {
      const { updatedPlist: plist } = createUpdatedPlist(writes, { overwrite: false });
      const rawValue = plistValueToString(plist["per-item-hotkeys"]);
      const result = parseJson(rawValue);
      let perItemHotkeyList: PerItemHotkey[] = [];
      if ("error" in result) {
        perItemHotkeyList = [];
      } else {
        perItemHotkeyList = result.value;
      }

      for (const { chord } of globalHotkeys) {
        const appBundleIdentifier = chord.args?.[1];
        const keyName = chord.args?.[2];
        const appName = chord.args?.[3];
        if (!appBundleIdentifier || !keyName || !appName) {
          continue;
        }

        if (perItemHotkeyList.some((item) => item.keyName === keyName)) {
          continue;
        }

        const item: PerItemHotkey = {
          appName,
          appBundleIdentifier,
          keyName,
        };
        perItemHotkeyList.push(item);
      }

      plist["per-item-hotkeys"] = new Uint8Array(encodeUtf8(JSON.stringify(perItemHotkeyList)));
      fs.writeFileSync(plistPath, serializeBplist(plist));
    });
  }

  const plistHandler = buildHandler();

  function itemHandler(itemId: string, keyName: string, appName: string): boolean {
    const property = `KeyboardShortcuts_${keyName}`;
    return plistHandler(property);
  }

  function shortcutHandler(property: string): boolean {
    return plistHandler(property);
  }

  function handler(type: "shortcut", property: string): boolean;
  function handler(
    type: "item",
    appBundleIdentifier: string,
    keyName: string,
    appName: string,
  ): boolean;
  function handler(
    ...args:
      | ["shortcut", property: string]
      | ["item", appBundleIdentifier: string, keyName: string, appName: string]
  ): boolean {
    if (args[0] === "shortcut") {
      const [type, property] = args;
      return shortcutHandler(property);
    } else {
      const [type, appBundleIdentifier, keyName, appName] = args;
      return itemHandler(appBundleIdentifier, keyName, appName);
    }
  }

  return handler;
} satisfies BuildHandler);
