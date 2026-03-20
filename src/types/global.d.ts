type BundleIdData = {

}

type Chord = {
  name: string;
  shortcut?: string;
  shell?: string;
  args?: string[];
};

declare global {
  interface ImportMeta {
    chords: Record<string, Chord>;
    bundleId: string
  }
}


export {};
