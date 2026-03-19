import { parseBuffer } from '@ban12/bplist-parser'
import * as std from 'qjs:std'
import { carbonModifiersToStrings, keycodeToString } from '#/utils/mac-keycode.ts'

export function makeShortcut(filepath: string) {
  const plist = std.loadFile(filepath, { binary: true }) as Uint8Array | null
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
    const keys = carbonModifiersToStrings(value.carbonModifiers)
    keys.push(keycodeToString(value.carbonKey)!)
    tap(keys.join("+"))
  }
}
