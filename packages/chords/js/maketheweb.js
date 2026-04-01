import { t as buildPlistHandler } from "./plist-handler-BiNDldpt.js";
//#region src/js/maketheweb.ts
function buildMakethewebHandler(tildepath) {
	return buildPlistHandler(this, tildepath, {
		modifierMaskKey: "carbonModifiers",
		keycodeKey: "carbonKey",
		modifierType: "carbon",
		globalPrefix: "/",
		propertyType: "bytes"
	});
}
//#endregion
export { buildMakethewebHandler as default };
