import { generateSyntheticKeybinds } from "#/utils/keybinds.ts";
import fs from "fs";
import { expand } from "brace-expansion";
import { exists } from "#/utils/file.ts";
import yaml from "js-yaml";
import os from "os";
import path from "path";

function extractCommands(chords: ImportMeta["chords"]): string[] {
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

export async function buildWarpHandler(chords: ImportMeta["chords"]) {
  const commands = extractCommands(chords);

  const syntheticKeybinds = generateSyntheticKeybinds(
    commands,
    [
      "alt+{0..9}",
      "alt+cmd+{0..9}",
      "alt+cmd+ctrl+{0..9}",
      "alt+cmd+ctrl+shift+{0..9}",
      "cmd+ctrl+{0..9}",
      "cmd+ctrl+shift+{0..9}",
      "ctrl+shift+{0..9}",
      "alt+shift+{0..9}",
      "cmd+shift+{0..9}",
    ].flatMap((pattern) => expand(pattern)),
  );

  // write warp keybindings
  const sortedCommands = Object.keys(syntheticKeybinds).sort();

  const keybindingsPath = path.join(os.homedir(), ".warp", "keybindings.yaml");
  let keybindings: Record<string, string> = {};
  if (exists(keybindingsPath)) {
    const yml = yaml.load(fs.readFileSync(keybindingsPath, "utf8"));
    if (typeof yml === "object" && yml !== null) {
      keybindings = yml as Record<string, string>;
    }
  }

  for (const cmd of sortedCommands) {
    const keybind = normalizeKeybind(syntheticKeybinds[cmd]!);
    keybindings[cmd] = keybind;
  }
  fs.writeFileSync(keybindingsPath, "---\n" + yaml.dump(keybindings));

  return function command(cmd: string): boolean {
    const keybind = keybindings[cmd];
    if (!keybind) {
      return false;
    }

    tap(keybind.replaceAll("-", "+"));
    return true;
  };
}
