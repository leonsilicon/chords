import { generateSyntheticKeybinds } from "#/utils/keybinds.ts";
import { readFileSync, writeFileSync } from "fs";
import { expand } from "brace-expansion";
import { exists } from "#/utils/file.ts";
import yaml from 'js-yaml';
import os from 'os'
import path from 'path'

function extractCommands(chords: ImportMeta['chords']): string[] {
  const result: string[] = [];

  for (const chord of Object.values(chords ?? {})) {
    if (chord?.args?.[0] && !chord.shortcut) {
      result.push(chord.args[0]);
    }
  }

  return result;
}

function normalizeKeybind(k: string): string {
  return k.replace(/\+/g, "-");
}


export async function createCommand(chords: ImportMeta['chords']) {
  const commands = extractCommands(chords);

  const syntheticKeybinds = generateSyntheticKeybinds(
    commands,
    [
      "opt+{0..9}",
      "opt+cmd+{0..9}",
      "opt+cmd+ctrl+{0..9}",
      "opt+cmd+ctrl+shift+{0..9}",
      "cmd+ctrl+{0..9}",
      "cmd+ctrl+shift+{0..9}",
      "ctrl+shift+{0..9}",
      "opt+shift+{0..9}",
      "cmd+shift+{0..9}",
    ].flatMap((pattern) => expand(pattern)),
  );

  // write warp keybindings
  const sortedCommands = Object.keys(syntheticKeybinds).sort();

  const keybindingsPath = path.join(os.homedir(), ".warp", "keybindings.yaml");
  const keybindings = exists(keybindingsPath) ? yaml.load(readFileSync(keybindingsPath, 'utf8')) || {} : {};
  for (const cmd of sortedCommands) {
    const keybind = syntheticKeybinds[cmd];
    keybindings[cmd] = keybind;
  }
  writeFileSync(keybindingsPath, '---\n' + yaml.dump(keybindings));

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
