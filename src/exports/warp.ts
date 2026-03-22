import { generateSyntheticKeybinds } from "#/utils/keybinds.ts";
import fs from "fs";
import { expand } from "brace-expansion";
import { exists } from "#/utils/file.ts";
import yaml from "js-yaml";
import os from "os";
import path from "path";
import { tap } from "chordsapp";
import type { BuildHandler } from "../types/handler.ts";

function extractCommands(chords: ImportMeta["chords"]): string[] {
  const result: string[] = [];

  for (const chord of Object.values(chords ?? {})) {
    if (chord?.args?.[0] && !chord.shortcut) {
      result.push(chord.args[0]);
    }
  }

  return result;
}

// TODO: call `setAppNeedsRelaunch` if we updated the keybindings
export default (function buildWarpHandler(meta) {
  const commands = extractCommands(meta.chords);

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
    // Warp uses - instead of + as their keybind separator
    const keybind = syntheticKeybinds[cmd]!.replaceAll("+", "-");
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
} satisfies BuildHandler);
