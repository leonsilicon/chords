#!/usr/bin/env bun
import fs from "fs";
import { fastIsEqual } from 'fast-is-equal'
import { parseBplist, serializeBplist } from 'bplist-lossless'
import { detailedDiff } from 'deep-object-diff'

const  plist = fs.readFileSync(process.argv[2]!)
const parsed = parseBplist(plist)
console.log(parsed)
fs.writeFileSync('test.plist', serializeBplist({ ...parsed, 'per-item-hotkeys': "test" }))
const seralizedParsed = parseBplist(fs.readFileSync('test.plist'))

console.log(detailedDiff(parsed, seralizedParsed))
console.log(fastIsEqual(parsed, seralizedParsed))

// console.log(
//   new TextDecoder().decode(parse(fs.readFileSync(process.argv[2]!).buffer)["per-item-hotkeys"]),
// );
