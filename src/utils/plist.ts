import { Buffer } from "buffer";

export function plistValueToString(rawValue: unknown): string {
  const valueString =
    rawValue instanceof Uint8Array ? Buffer.from(rawValue).toString("utf8") : String(rawValue);

    return valueString
}