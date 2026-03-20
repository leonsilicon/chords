type Modifier = {
  string: string;
  mask: number;
};

const CARBON_MODIFIERS: Modifier[] = [
  { string: "MetaLeft", mask: 1 << 8 },
  { string: "ShiftLeft", mask: 1 << 9 },
  { string: "AltLeft", mask: 1 << 11 },
  { string: "ControlLeft", mask: 1 << 12 },
  { string: "CapsLock", mask: 1 << 10 },
];

const MODERN_MODIFIERS: Modifier[] = [
  { string: "CapsLock", mask: 1 << 16 },
  { string: "ShiftLeft", mask: 1 << 17 },
  { string: "ControlLeft", mask: 1 << 18 },
  { string: "AltLeft", mask: 1 << 19 },
  { string: "MetaLeft", mask: 1 << 20 },
  { string: "Numpad", mask: 1 << 21 },
  { string: "Help", mask: 1 << 22 },
  { string: "Function", mask: 1 << 23 },
];

export function modifiersToKeystrings(mask: number): string[] {
  const result: string[] = [];

  for (const modifier of MODERN_MODIFIERS) {
    if ((mask & modifier.mask) !== 0) {
      result.push(modifier.string);
    }
  }

  return result;
}

export function carbonModifiersToKeystrings(mask: number): string[] {
  const result: string[] = [];

  for (const modifier of CARBON_MODIFIERS) {
    if ((mask & modifier.mask) !== 0) {
      result.push(modifier.string);
    }
  }

  return result;
}

function keystringsToMask(keystrings: string[], modifiers: Modifier[]): number {
  let mask = 0;

  for (const keystring of keystrings) {
    const modifier = modifiers.find((m) => m.string === keystring);
    if (modifier) {
      mask |= modifier.mask;
    }
  }

  return mask;
}

export function keystringsToModifierMask(keystrings: string[]): number {
  return keystringsToMask(keystrings, MODERN_MODIFIERS);
}

export function keystringsToCarbonModifierMask(keystrings: string[]): number {
  return keystringsToMask(keystrings, CARBON_MODIFIERS);
}