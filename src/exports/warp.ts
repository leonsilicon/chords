import process from 'process'
import { upsertBlock } from "#/utils/file.ts";
import { generateSyntheticKeybinds } from "#/utils/keybinds.ts";
import fs from 'fs'

type Chord = {
  js?: string;
  shortcut?: string;
};

type Chords = Record<string, Chord>;

declare function expandAll(patterns: string[]): string[];

function extractCommands(chords: Chords): string[] {
  const result: string[] = [];

  for (const chord of Object.values(chords ?? {})) {
    if (chord?.js && !chord.shortcut) {
      const match = String(chord.js).match(/command\((['"])(.*?)\1\)/);
      if (match) {
        result.push(match[2]!);
      }
    }
  }

  return result;
}

function normalizeKeybind(k: string): string {
  return String(k).replace(/\+/g, "-");
}

function quote(str: string): string {
  return `"${String(str).replace(/"/g, '\\"')}"`;
}

export function createCommand(chords: Chords) {
  const commands = extractCommands(chords);

  const syntheticKeybinds = generateSyntheticKeybinds(
    commands,
    expandAll([
      "opt+{0..9}",
      "opt+cmd+{0..9}",
      "opt+cmd+ctrl+{0..9}",
      "opt+cmd+ctrl+shift+{0..9}",
      "cmd+ctrl+{0..9}",
      "cmd+ctrl+shift+{0..9}",
      "ctrl+shift+{0..9}",
      "opt+shift+{0..9}",
      "cmd+shift+{0..9}",
    ])
  );

  // write warp keybindings
  const sortedCommands = Object.keys(syntheticKeybinds).sort();
  let keybindingsYaml = "";

  for (const cmd of sortedCommands) {
    const keybind = syntheticKeybinds[cmd];
    keybindingsYaml += `${quote(cmd)}: ${normalizeKeybind(keybind!)}\n`;
  }

  const home = process.env.HOME || "~";
  const keybindingsPath = `${home}/.warp/keybindings.yaml`;

  if (fs.existsSync(keybindingsPath)) {
    fs.writeFileSync(keybindingsPath, "");
  }

  upsertBlock(
    keybindingsPath,
    keybindingsYaml,
    "# >>> chords:auto:start",
    "# >>> chords:auto:end"
  );

  const commandToKey: Record<string, string> = {};

  for (const [cmd, key] of Object.entries(syntheticKeybinds)) {
    commandToKey[cmd] = normalizeKeybind(key!);
  }

  return function (cmd: string): boolean {
    const keybind = commandToKey[cmd];
    if (!keybind) {
      return false;
    }

    tap(keybind.replace(/-/g, "+"));
    return true;
  };
}

export default {
  createCommand,
};