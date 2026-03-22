declare module "chordsapp" {
  export function tap(key: string): void;
  export function press(key: string): void;
  export function release(key: string): void;

  export function registerGlobalHotkey(bundleId: string, hotkeyId: string): string | undefined;
  export function getGlobalHotkey(bundleId: string, hotkeyId: string): string | undefined;
}

declare module "@chordsapp/types" {
  export type Chord = {
    name: string;
    shortcut?: string;
    shell?: string;
    args?: string[];
  };
}
