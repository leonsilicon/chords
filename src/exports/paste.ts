import { parseBuffer } from '@ban12/bplist-parser'
import fs from "fs"
import { modifiersToStrings, keycodeToString } from '#/utils/mac-keycode.ts'

export function makeShortcut(filepath: string) {
  const plist = fs.readFileSync(filepath);
  if (!plist) {
    return () => false
  }

  return function shortcut(property: string) {
    const data = parseBuffer(plist.buffer)
    const rawValue = data[0]?.[property]
    if (!rawValue) {
      return false
    }

    const value = JSON.parse(String(rawValue))
    const keys = modifiersToStrings(value.carbonModifiers)
    keys.push(keycodeToString(value.carbonKey)!)
    tap(keys.join("+"))
  }
}
