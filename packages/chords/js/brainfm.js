import { onAppLaunch, onAppTerminate, setAppNeedsRelaunch } from "chord";
import spawn from "nano-spawn-compat";
import { join } from "desm";
import getPort from "get-port";
//#region src/js/brainfm.ts
async function createBrainfmHandler() {
	const brainfmAppPath = "/Applications/Brain.fm.app";
	let isPendingRestart = false;
	let remoteDebuggingPort = null;
	setAppNeedsRelaunch(this.bundleId, true);
	const hasRemoteDebuggingPort = async (pid) => {
		const { stdout } = await spawn("ps", [
			"-p",
			pid.toString(),
			"-o",
			"command="
		]);
		return stdout.includes("remote-debugging-port");
	};
	onAppLaunch(this.bundleId, async (app) => {
		if (!await hasRemoteDebuggingPort(app.pid)) {
			isPendingRestart = true;
			await spawn("kill", ["-9", app.pid.toString()]);
		}
	});
	onAppTerminate(this.bundleId, async () => {
		if (isPendingRestart) {
			isPendingRestart = false;
			remoteDebuggingPort = await getPort();
			await spawn("open", [
				"-na",
				brainfmAppPath,
				"--args",
				`--remote-debugging-port=${remoteDebuggingPort}`
			]);
		}
	});
	const brainfmBinpath = join(import.meta.url, "bin/brainfm");
	return async function(code) {
		if (!remoteDebuggingPort) return false;
		await spawn(brainfmBinpath, [remoteDebuggingPort.toString()], { stdin: { string: code } });
	};
}
//#endregion
export { createBrainfmHandler as default };
