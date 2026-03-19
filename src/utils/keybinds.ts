import { expand } from "brace-expansion";
import arrayUnique from "array-uniq";

export function generateSyntheticKeybinds(commands: string[], patterns: string[]) {
  // expand all patterns (order doesn't matter anymore)
  const availableKeybinds = patterns.flatMap((pattern) => expand(pattern));

  const keybinds = arrayUnique(availableKeybinds);
  const cmds = arrayUnique(commands);

  // deterministic mapping
  return Object.fromEntries(cmds.map((cmd, i) => [cmd, keybinds[i]])); // undefined if exhausted
}
