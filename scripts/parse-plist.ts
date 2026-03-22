#!/usr/bin/env bun
import fs from "fs";
import { fastIsEqual } from 'fast-is-equal'
import { parseBplist, serializeBplist } from 'bplist-lossless'
import { detailedDiff } from 'deep-object-diff'
import util from 'util'

const  plist = fs.readFileSync(process.argv[2]!)
const parsed = parseBplist(plist)
console.log(util.inspect(parsed, null, { depth: null }))
