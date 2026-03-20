#!/usr/bin/env bun
import { parseBuffer } from 'bplist-parser-pure'
import fs from 'fs'
console.log(parseBuffer(fs.readFileSync(process.argv[2]!).buffer))
