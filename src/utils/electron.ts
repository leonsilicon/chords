import { getKeyMapByCode, KeyMappingCode } from "keycode-ts2";

// see https://www.electronjs.org/docs/latest/tutorial/keyboard-shortcuts
export function parseElectronAccelerator(accelerator: string): KeyMappingCode[] {
  const parts = accelerator.toLowerCase().split("+");
  return parts.map((part) => {
    // Accelerators are case-insensitive
    switch (part) {
      case "commandorcontrol":
      case "cmdorctrl":
        return process.platform === "darwin" ? KeyMappingCode.MetaLeft : KeyMappingCode.ControlLeft;

      case "control":
      case "ctrl":
        return KeyMappingCode.ControlLeft;

      case "alt":
      case "option":
        return KeyMappingCode.AltLeft;

      case "altgr":
        return KeyMappingCode.AltRight;

      case "shift":
        return KeyMappingCode.ShiftLeft;

      case "command":
      case "cmd":
      case "meta":
      case "super":
        return KeyMappingCode.MetaLeft;
    }

    const keymap = getKeyMapByCode(part as KeyMappingCode);
    if (keymap?.code) {
      return keymap.code;
    }

    throw new Error(`Unknown accelerator part: ${part}`);
  });
}

// see https://www.electronjs.org/docs/latest/tutorial/keyboard-shortcuts
export function toElectronAccelerator(shortcut: string): string {
  const parts = shortcut.split("+");
  return parts
    .map((part) => {
      const code = getKeyMapByCode(part as KeyMappingCode)?.code;
      if (!code) {
        throw new Error(`Unknown shortcut part: ${part}`);
      }

      // Accelerators are case-insensitive
      switch (code) {
        case KeyMappingCode.MetaLeft:
        case KeyMappingCode.MetaRight:
          return "Command";

        case KeyMappingCode.ControlLeft:
        case KeyMappingCode.ControlRight:
          return "Control";

        case KeyMappingCode.AltLeft:
          return "Alt";

        case KeyMappingCode.AltRight:
          return "AltGr";

        case KeyMappingCode.ShiftLeft:
        case KeyMappingCode.ShiftRight:
          return "Shift";

        default: {
          if (part.startsWith("Key")) {
            return part.slice(3);
          }

          throw new Error(`Unsupported key code in shortcut: ${code}`);
        }
      }
    })
    .join("+");
}
