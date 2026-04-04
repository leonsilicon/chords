import buildPlistHandler from "./utils/plist-handler.ts";
import type { BuilderThis } from 'chord';

export default function buildSuperchargeHandler(this: BuilderThis, tildepath: string) {
  return buildPlistHandler(this, tildepath, {
    modifierMaskKey: "carbonModifiers",
    keycodeKey: "carbonKey",
    modifierType: "carbon",
    globalPrefix: "/",
    propertyType: "bytes",
  });
}
