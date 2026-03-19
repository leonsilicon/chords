type Modifier = {
  string: string;
  mask: number;
};

const KEYCODE_BY_STRING: Record<string, number> = {
  // letters
  a: 0x0,
  s: 0x1,
  d: 0x2,
  f: 0x3,
  h: 0x4,
  g: 0x5,
  z: 0x6,
  x: 0x7,
  c: 0x8,
  v: 0x9,
  b: 0xb,
  q: 0xc,
  w: 0xd,
  e: 0xe,
  r: 0xf,
  y: 0x10,
  t: 0x11,
  "1": 0x12,
  "2": 0x13,
  "3": 0x14,
  "4": 0x15,
  "6": 0x16,
  "5": 0x17,
  "=": 0x18,
  "9": 0x19,
  "7": 0x1a,
  "-": 0x1b,
  "8": 0x1c,
  "0": 0x1d,
  "]": 0x1e,
  o: 0x1f,
  u: 0x20,
  "[": 0x21,
  i: 0x22,
  p: 0x23,
  enter: 0x24,
  l: 0x25,
  j: 0x26,
  "'": 0x27,
  k: 0x28,
  ";": 0x29,
  "\\": 0x2a,
  ",": 0x2b,
  "/": 0x2c,
  n: 0x2d,
  m: 0x2e,
  ".": 0x2f,
  tab: 0x30,
  space: 0x31,
  "`": 0x32,
  delete: 0x33,
  esc: 0x35,

  right_cmd: 0x36,
  cmd: 0x37,
  shift: 0x38,
  caps_lock: 0x39,
  alt: 0x3a,
  ctrl: 0x3b,
  right_shift: 0x3c,
  right_alt: 0x3d,
  right_ctrl: 0x3e,
  fn: 0x3f,

  f17: 0x40,
  keypad_decimal: 0x41,
  keypad_multiply: 0x43,
  keypad_plus: 0x45,
  keypad_clear: 0x47,
  volume_up: 0x48,
  volume_down: 0x49,
  mute: 0x4a,
  keypad_divide: 0x4b,
  keypad_enter: 0x4c,
  keypad_minus: 0x4e,
  f18: 0x4f,
  f19: 0x50,
  keypad_equals: 0x51,
  keypad_0: 0x52,
  keypad_1: 0x53,
  keypad_2: 0x54,
  keypad_3: 0x55,
  keypad_4: 0x56,
  keypad_5: 0x57,
  keypad_6: 0x58,
  keypad_7: 0x59,
  f20: 0x5a,
  keypad_8: 0x5b,
  keypad_9: 0x5c,

  jis_yen: 0x5d,
  jis_underscore: 0x5e,
  jis_keypad_comma: 0x5f,

  f5: 0x60,
  f6: 0x61,
  f7: 0x62,
  f3: 0x63,
  f8: 0x64,
  f9: 0x65,
  jis_eisu: 0x66,
  f11: 0x67,
  jis_kana: 0x68,
  f13: 0x69,
  f16: 0x6a,
  f14: 0x6b,
  f10: 0x6d,
  contextual_menu: 0x6e,
  f12: 0x6f,
  f15: 0x71,
  help: 0x72,
  home: 0x73,
  pageup: 0x74,
  forward_delete: 0x75,
  f4: 0x76,
  end: 0x77,
  f2: 0x78,
  pagedown: 0x79,
  f1: 0x7a,
  left: 0x7b,
  right: 0x7c,
  down: 0x7d,
  up: 0x7e,

  iso_section: 0x0a,
};

const STRING_BY_KEYCODE: Record<number, string> = {};
for (const [str, code] of Object.entries(KEYCODE_BY_STRING)) {
  STRING_BY_KEYCODE[code] = str;
}

const CARBON_MODIFIERS: Modifier[] = [
  { string: "cmd", mask: 0x100000 },
  { string: "shift", mask: 0x20000 },
  { string: "alt", mask: 0x80000 },
  { string: "ctrl", mask: 0x40000 },
  { string: "caps_lock", mask: 0x10000 },
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

export const Key = KEYCODE_BY_STRING;

export function keycodeFromString(str: unknown): number | undefined {
  if (typeof str !== "string") return undefined;
  return KEYCODE_BY_STRING[str.toLowerCase()];
}

export function keycodeToString(code: number): string | undefined {
  return STRING_BY_KEYCODE[code];
}

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
