declare module "os-keycode" {
  declare namespace keycodes {
    export type KeyName =
      | "up"
      | "down"
      | "left"
      | "right"
      | "backspace"
      | "enter"
      | "home"
      | "end"
      | "pageDown"
      | "pageUp"
      | "return"
      | "delete"
      | "tab"
      | "spacebar"
      | "shift"
      | "shiftRight"
      | "control"
      | "menu"
      | "printScreen"
      | "escape"
      | "capsLock"
      | "help"
      | "f1"
      | "f2"
      | "f3"
      | "f4"
      | "f5"
      | "f6"
      | "f7"
      | "f8"
      | "f9"
      | "f10"
      | "f11"
      | "f12"
      | "macFn"
      | "macOption"
      | "macCommand"
      | "macOptionRight"
      | "macCommandRight"
      | "winLeftWindow"
      | "winRightWindow"
      | "winApplication"
      | "q"
      | "w"
      | "e"
      | "r"
      | "t"
      | "y"
      | "u"
      | "i"
      | "o"
      | "p"
      | "a"
      | "s"
      | "d"
      | "f"
      | "g"
      | "h"
      | "j"
      | "k"
      | "l"
      | "z"
      | "x"
      | "c"
      | "v"
      | "b"
      | "n"
      | "m"
      | "0"
      | "1"
      | "2"
      | "3"
      | "4"
      | "5"
      | "6"
      | "7"
      | "8"
      | "9"
      | "period"
      | "comma"
      | "slash"
      | "num0"
      | "num1"
      | "num2"
      | "num3"
      | "num4"
      | "num5"
      | "num6"
      | "num7"
      | "num8"
      | "num9"
      | "multiply"
      | "add"
      | "subtract"
      | "divide"
      | "decimal"
      | "numEqual";

    export interface SupportedKeyInfo {
      code: number;
      key: KeyName;
      keys: [KeyName];
    }

    export interface UnsupportedKeyInfo {
      code: "*";
      keys: KeyName[];
    }

    export type KeyInfo = SupportedKeyInfo | UnsupportedKeyInfo;
  }

  declare const keycodes: {
    /**
     * Returns info for a numeric keycode on the current platform.
     * Passing 0 returns the grouped unsupported keys (`code: '*'`).
     */
    keyname(keycode: number): keycodes.KeyInfo | undefined;

    /**
     * Returns the numeric keycode for a known key name on the current platform.
     * Returns 0 when the key is unsupported on that platform.
     */
    keycode(keyname: keycodes.KeyName): number;

    /**
     * Returns an error string when the key name does not exist.
     */
    keycode(keyname: string): number | `Keyname ${string} not found`;
  };

  export = keycodes;
}
