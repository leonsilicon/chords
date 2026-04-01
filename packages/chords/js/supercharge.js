import { t as buildPlistHandler } from "./plist-handler-BiNDldpt.js";
//#region src/js/supercharge.ts
function buildSuperchargeHandler(tildepath) {
	return buildPlistHandler(this, tildepath, {
		modifierMaskKey: "carbonModifiers",
		keycodeKey: "carbonKey",
		modifierType: "carbon",
		globalPrefix: "/",
		propertyType: "bytes"
	});
}
//#endregion
export { buildSuperchargeHandler as default };
