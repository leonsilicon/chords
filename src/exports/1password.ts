import untildify from "untildify";
import type { BuildHandler } from "../types/handler.ts";
import noop from "@stdlib/utils-noop";
import { exists } from "../utils/file.ts";
import { ensureGlobalHotkeys } from "../utils/global.ts";
import { includeKeys } from "filter-obj";
import nullthrows from "nullthrows-es";
import { parse, stringify } from "doctor-json";
import fs from "fs";
import { parseElectronAccelerator, toElectronAccelerator } from "../utils/electron.ts";
import { tap } from "chordsapp";

const keybindsSettings = [
  "keybinds.quickAccess",
  "keybinds.lock",
  "keybinds.autoFill",
  "keybinds.open",
];

export default (function build1PasswordHandler(meta) {
  const settingsJsonFilepath = untildify(
    "~/Library/Group Containers/2BUA8C4S2C.com.1password/Library/Application Support/1Password/Data/settings/settings.json",
  );
  if (!exists(settingsJsonFilepath)) {
    return noop;
  }

  const globalHotkeys = ensureGlobalHotkeys(
    includeKeys(meta.chords, (sequence) => sequence.startsWith("/")),
    {
      bundleId: meta.bundleId,
      getHotkeyId: (chord) => nullthrows(chord.args?.[0]),
    },
  );

  if (globalHotkeys.length > 0) {
    const settings = parse(fs.readFileSync(settingsJsonFilepath, "utf8"));
    for (const { chord, shortcut } of globalHotkeys) {
      const hotkeyId = nullthrows(chord.args?.[0]);
      const accelerator = toElectronAccelerator(shortcut);
      const onePasswordAccelerator = accelerator.replace(
        /\+([^+]+)$/,
        (_match, key) => `+[${key.toLowerCase()}]${key}`,
      );
      settings[`keybinds.${hotkeyId}`] = onePasswordAccelerator;
    }
    fs.writeFileSync(settingsJsonFilepath, stringify(settings));
  }

  const settings = parse(fs.readFileSync(settingsJsonFilepath, "utf8"));
  return function handler(shortcutSlug: string) {
    const electronAccelerator = settings[`keybinds.${shortcutSlug}`];
    // Handles empty string
    if (!electronAccelerator) {
      return false;
    }

    const codes = parseElectronAccelerator(electronAccelerator);
    tap(codes.join("+"));
  };
} satisfies BuildHandler);
