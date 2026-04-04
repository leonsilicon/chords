//#region package.json
var name = "@leonsilicon/chords";
var type = "module";
var imports = { "#/*": "./src/js/*" };
var dependencies = {
	"@keychord/chords-menu": "github:KeyChord/chords-menu#d17435f29fbcae83fcc372fccbbbb3189011f72d",
	"@keychord/chords-chromium": "github:KeyChord/chords-chromium#bd12096440a086c81c612fdf5aa9dd0b39737aae",
	"@keychord/chords-jetbrains": "github:KeyChord/chords-jetbrains#25c767201949dd0dd757d590d2585173eca916a4",
	"@stdlib/utils-noop": "^0.2.3",
	"@types/json-parse-safe": "^2.0.3",
	"any-ascii-json": "^0.4.0",
	"array-uniq": "^3.0.0",
	"bplist-lossless": "^0.2.0",
	"brace-expansion": "^5.0.4",
	"chrome-remote-interface": "^0.34.0",
	"decode-utf8": "^1.0.1",
	"desm": "^1.3.1",
	"doctor-json": "^1.0.0",
	"encode-utf8": "^2.0.0",
	"fast-is-equal": "^1.2.6",
	"filter-obj": "^6.1.0",
	"get-port": "^7.2.0",
	"jquery-as-string": "^0.4.0",
	"js-yaml": "^4.1.1",
	"json-parse-safe": "^2.0.0",
	"just-filter-object": "^3.2.0",
	"just-zip-it": "^3.2.0",
	"jxa-run-compat": "^1.6.0",
	"keycode-ts2": "^0.1.0",
	"map-obj": "^6.0.0",
	"nano-spawn-compat": "^2.0.6",
	"nullthrows-es": "^1.0.1",
	"onetime": "^8.0.0",
	"outdent": "^0.8.0",
	"type-fest": "^5.5.0",
	"untildify": "^6.0.0",
	"websocket": "^1.0.35"
};
var devDependencies = {
	"@electron/asar": "^4.1.0",
	"@jxa/global-type": "^1.4.0",
	"@keychord/config": "^0.0.6",
	"@keychord/tsconfig": "^0.0.6",
	"@types/chrome-remote-interface": "^0.33.0",
	"@types/js-yaml": "^4.0.9",
	"@types/node": "^25.5.0",
	"@types/websocket": "^1.0.10",
	"bun-types": "^1.3.11",
	"chord-types": "^0.1.0",
	"deep-object-diff": "^1.1.9",
	"rimraf": "^6.1.3",
	"typescript": "^6.0.2"
};
var packageManager = "pnpm@10.32.1";
var package_default = {
	name,
	type,
	imports,
	dependencies,
	devDependencies,
	packageManager
};
//#endregion
export { package_default as default, dependencies, devDependencies, imports, name, packageManager, type };
