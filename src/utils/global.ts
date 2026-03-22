import type { Chord } from "@chordsapp/types";
import { getGlobalHotkey, registerGlobalHotkey } from "chordsapp";

/**
  Ensures that global hotkeys are registered.

  Returns a list of global hotkeys.
*/
export function ensureGlobalHotkeys(
  // `Partial` needed because it's the return type of filter
  globalChords: Partial<Record<string, Chord>>,
  {
    bundleId,
    getHotkeyId,
  }: {
    bundleId: string;
    getHotkeyId: (chord: Chord) => string;
  },
): Array<{ sequence: string; chord: Chord; shortcut: string; isNew: boolean }> {
  return Object.entries(globalChords).flatMap(([sequence, chord]) => {
    if (!chord) {
      return [];
    }

    const hotkeyId = getHotkeyId(chord);
    let isNew = true;
    let shortcut = getGlobalHotkey(bundleId, hotkeyId);
    if (!shortcut) {
      isNew = false;
      shortcut = registerGlobalHotkey(bundleId, hotkeyId);
    }

    if (shortcut === undefined) {
      console.warn(`Failed to register global hotkey for ${bundleId} ${hotkeyId}`);
      return [];
    }

    return [
      {
        chord,
        sequence,
        shortcut,
        isNew,
      },
    ];
  });
}
