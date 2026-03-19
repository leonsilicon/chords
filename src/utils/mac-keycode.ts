type Modifier = {
  string: string;
  mask: number;
};

const CARBON_MODIFIERS: Modifier[] = [
  { string: "cmd", mask: 1 << 8 },
  { string: "shift", mask: 1 << 9 },
  { string: "alt", mask: 1 << 11 },
  { string: "ctrl", mask: 1 << 12 },
  { string: "caps_lock", mask: 1 << 10 },
];

const MODERN_MODIFIERS: Modifier[] = [
  { string: "caps_lock", mask: 1 << 16 },
  { string: "shift", mask: 1 << 17 },
  { string: "ctrl", mask: 1 << 18 },
  { string: "alt", mask: 1 << 19 },
  { string: "cmd", mask: 1 << 20 },
  { string: "numeric_pad", mask: 1 << 21 },
  { string: "help", mask: 1 << 22 },
  { string: "fn", mask: 1 << 23 },
];

export function modifiersToStrings(mask: number): string[] {
  const result: string[] = [];

  for (const modifier of MODERN_MODIFIERS) {
    if ((mask & modifier.mask) !== 0) {
      result.push(modifier.string);
    }
  }

  return result;
}

export function carbonModifiersToStrings(mask: number): string[] {
  const result: string[] = [];

  for (const modifier of CARBON_MODIFIERS) {
    if ((mask & modifier.mask) !== 0) {
      result.push(modifier.string);
    }
  }

  return result;
}
