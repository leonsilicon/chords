#!/usr/bin/env bun
import fs from "fs";
import {fastIsEqual} from 'fast-is-equal'
import { parseBinary } from 'simple-plist-es/parseBinary'
import { writeBinaryFileSync } from 'simple-plist-es/writeBinaryFileSync'
import { detailedDiff } from 'deep-object-diff'
import {Buffer} from 'buffer'

const plist = fs.readFileSync(process.argv[2]!)

const parsed = parseBinary(plist)
console.log(parsed)
parsed['test'] = Buffer.alloc(100000)
writeBinaryFileSync('test.plist', parsed)
const seralizedParsed = parseBinary(fs.readFileSync('test.plist'))

console.log(detailedDiff(parsed, seralizedParsed))
console.log(fastIsEqual(parsed, seralizedParsed))

// console.log(
//   new TextDecoder().decode(parse(fs.readFileSync(process.argv[2]!).buffer)["per-item-hotkeys"]),
// );
