declare module "chordsapp" {
  export function tap(key: string): void;
  export function press(key: string): void;
  export function release(key: string): void;

  export function registerGlobalHotkey(bundleId: string, hotkeyId: string): string | undefined;
  export function getGlobalHotkey(bundleId: string, hotkeyId: string): string | undefined;

  export function onAppLaunch(callback: (app: { pid: number; bundleId: string }) => void): void;
  export function onAppTerminate(callback: () => void): void;
}

declare module "@chordsapp/types" {
  export type Chord = {
    name: string;
    shortcut?: string;
    shell?: string;
    args?: string[];
  };
}
