#!/usr/bin/env bun
import { parseBuffer } from 'bplist-parser-pure'
import fs from 'fs'
console.log(parseBuffer(fs.readFileSync(process.argv[2]!).buffer))

console.log(new TextDecoder().decode(parseBuffer(fs.readFileSync(process.argv[2]!).buffer)[0]['per-item-hotkeys']))
