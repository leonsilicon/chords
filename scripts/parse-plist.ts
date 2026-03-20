#!/usr/bin/env bun
import { parse } from "@plist/binary.parse";
import fs from "fs";
console.log(parse(fs.readFileSync(process.argv[2]!).buffer));

console.log(
  new TextDecoder().decode(
    parse(fs.readFileSync(process.argv[2]!).buffer)["per-item-hotkeys"],
  ),
);
