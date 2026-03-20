declare global {
  interface ImportMeta {
    chords: Record<string, import("@chordsapp/types").Chord>;
    bundleId: string;
  }
}

export {};
