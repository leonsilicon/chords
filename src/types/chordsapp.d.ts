declare module 'chordsapp' {
  export function tap(key: string): void;
  export function press(key: string): void;
  export function release(key: string): void;

  /*
    This function has to ensure that global hotkeys assigned to applications are always the same, even when Chords reloads. Because there's a limited amount of global hotkeys, they need to be assigned in a particular order. To do this, we use two reliable things that never change:

    1. The application's bundle identifier
    2. The order of the available global hotkeys (in order from least likely to conflict to most likely)
      - We will make this user-adjustable in the future
    3. The original creation date of the bundle identifier folder inside chords/ (according to Git, since system `ctime` isn't reliable)
      - This is necessary because we need a way to consistently order the bundle identifiers that won't change; alphabetical might change if future applications are added
  */
  export function registerGlobalHotkey(bundleId: string, hotkeyId: string): RepoHistoryItem[]
  export function getGlobalHotkey(bundleId: string, hotkeyId: string): string
}

// This should be a global package that also exposes import.meta
declare module '@chordsapp/types' {
  export type Chord = {
    name: string;
    shortcut?: string;
    shell?: string;
    args?: string[];
  };
}

declare module '@chordsapp/utils' {
  export function isGlobalSequence(sequence: string): boolean;
}