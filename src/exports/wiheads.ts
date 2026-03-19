import { parseBuffer } from "bplist-parser-pure";
import fs from "fs";
import { modifiersToStrings } from "#/utils/mac-keycode.ts";
import { keyname } from "os-keycode";
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

    const valueString =
      rawValue instanceof Uint8Array ? Buffer.from(rawValue).toString("utf8") : String(rawValue);

    const value = JSON.parse(valueString);
    const keys = modifiersToStrings(value.internalModifiers);
    const keyInfo = keyname(value.keyCode);
    if (!keyInfo || !("key" in keyInfo)) {
      return false;
    }
    keys.push(keyInfo.key);
    tap(keys.join("+"));
  };
}
