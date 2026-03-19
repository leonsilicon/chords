import { upsertBlock } from "#/utils/file.ts";
import { generateSyntheticKeybinds } from "#/utils/keybinds.ts";
import { writeFileSync } from "fs";
import { expand } from "brace-expansion";
import { exists } from "#/utils/file.ts";

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
  return String(k).replace(/\+/g, "-");
}

function quote(str: string): string {
  return `"${String(str).replace(/"/g, '\\"')}"`;
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
  let keybindingsYaml = "";

  for (const cmd of sortedCommands) {
    const keybind = syntheticKeybinds[cmd];
    keybindingsYaml += `${quote(cmd)}: ${normalizeKeybind(keybind!)}\n`;
  }

  const home = process.env.HOME || "~";
  const keybindingsPath = `${home}/.warp/keybindings.yaml`;

  if (exists(keybindingsPath)) {
    writeFileSync(keybindingsPath, "");
  }

  upsertBlock(keybindingsPath, keybindingsYaml, "# >>> chords:auto:start", "# >>> chords:auto:end");

  const commandToKey: Record<string, string> = {};

  for (const [cmd, key] of Object.entries(syntheticKeybinds)) {
    commandToKey[cmd] = normalizeKeybind(key!);
  }

  return function (cmd: string): boolean {
    console.log(cmd);
    const keybind = commandToKey[cmd];
    if (!keybind) {
      return false;
    }

    tap(keybind.replace(/-/g, "+"));
    return true;
  };
}
