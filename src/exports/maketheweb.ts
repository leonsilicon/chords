import { parseBuffer } from "bplist-parser-pure";
import fs from "fs";
import { carbonModifiersToStrings, keycodeToString } from "#/utils/mac-keycode.ts";
import untildify from "untildify";
import { Buffer } from "buffer";

export function makeShortcut(tildepath: string) {
  const filepath = untildify(tildepath);
  const plist = fs.readFileSync(filepath);
  return function shortcut(property: string) {
    const data = parseBuffer(plist.buffer);
    const rawValue = data[0]?.[property];
    if (!rawValue) {
      return false;
    }

    const valueString = rawValue instanceof Uint8Array ? Buffer.from(rawValue).toString('utf8') : String(rawValue);

    const value = JSON.parse(valueString);
    const keys = carbonModifiersToStrings(value.carbonModifiers);
    keys.push(keycodeToString(value.carbonKey)!);
    tap(keys.join("+"));
  };
}
