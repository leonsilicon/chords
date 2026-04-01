import fs from "fs";
//#region src/js/utils/file.ts
function exists(path) {
	try {
		fs.statSync(path);
		return true;
	} catch (err) {
		return false;
	}
}
//#endregion
export { exists as t };
