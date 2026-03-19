declare global {
  function tap(key: string): void;
  function press(key: string): void;
  function release(key: string): void;

  interface ImportMeta {
     chords: Record<string, Chord>
  }
}

type Chord = {
  name: string,
  shortcut?: string
  shell?: string
  args?: string[]
}


export {};
