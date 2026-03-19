import { parseBuffer } from '@ban12/bplist-parser'
import fs from "fs"
import { carbonModifiersToStrings, keycodeToString } from '#/utils/mac-keycode.ts'

export function makeShortcut(filepath: string) {
  const plist = fs.readFileSync(filepath);
  return function shortcut(property: string) {
    const data = parseBuffer(plist.buffer)
    const rawValue = data[0]?.[property]
    if (!rawValue) {
      return false
    }

    const value = JSON.parse(String(rawValue))
    const keys = carbonModifiersToStrings(value.carbonModifiers)
    keys.push(keycodeToString(value.carbonKey)!)
    tap(keys.join("+"))
  }
}
