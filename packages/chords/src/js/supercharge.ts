import buildPlistHandler from "./utils/plist-handler.ts";

export default function buildSuperchargeHandler(this: any, tildepath: string) {
  return buildPlistHandler(this, tildepath, {
    modifierMaskKey: "carbonModifiers",
    keycodeKey: "carbonKey",
    modifierType: "carbon",
    globalPrefix: "/",
    propertyType: "bytes",
  });
}
