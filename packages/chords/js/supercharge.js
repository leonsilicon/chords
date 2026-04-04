import os from "node:os";
import fs from "fs";
import { getGlobalHotkey, onAppTerminate, registerGlobalHotkey, setAppNeedsRelaunch, tap } from "chord";
import { Buffer as Buffer$1 } from "buffer";
//#region \0rolldown/runtime.js
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __commonJSMin = (cb, mod) => () => (mod || cb((mod = { exports: {} }).exports, mod), mod.exports);
var __copyProps = (to, from, except, desc) => {
	if (from && typeof from === "object" || typeof from === "function") for (var keys = __getOwnPropNames(from), i = 0, n = keys.length, key; i < n; i++) {
		key = keys[i];
		if (!__hasOwnProp.call(to, key) && key !== except) __defProp(to, key, {
			get: ((k) => from[k]).bind(null, key),
			enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable
		});
	}
	return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", {
	value: mod,
	enumerable: true
}) : target, mod));
//#endregion
//#region node_modules/.pnpm/untildify@6.0.0/node_modules/untildify/index.js
let homeDirectory;
let currentUser;
function untildify(pathWithTilde) {
	if (typeof pathWithTilde !== "string") throw new TypeError(`Expected a string, got ${typeof pathWithTilde}`);
	if (homeDirectory === void 0) homeDirectory = os.homedir();
	if (homeDirectory && /^~(?=$|\/|\\)/.test(pathWithTilde)) return pathWithTilde.replace(/^~/, homeDirectory);
	const userMatch = pathWithTilde.match(/^~([^/\\]+)(.*)/);
	if (userMatch) {
		if (currentUser === void 0) currentUser = os.userInfo().username;
		if (currentUser) {
			const username = userMatch[1];
			const rest = userMatch[2];
			if (username === currentUser) return homeDirectory + rest;
		}
	}
	return pathWithTilde;
}
//#endregion
//#region node_modules/.pnpm/keycode-ts2@0.1.0/node_modules/keycode-ts2/dist/generated.js
const KeyMappingCode = {
	Hyper: "Hyper",
	Super: "Super",
	Fn: "Fn",
	FnLock: "FnLock",
	Suspend: "Suspend",
	Resume: "Resume",
	Turbo: "Turbo",
	Sleep: "Sleep",
	WakeUp: "WakeUp",
	DisplayToggleIntExt: "DisplayToggleIntExt",
	KeyA: "KeyA",
	KeyB: "KeyB",
	KeyC: "KeyC",
	KeyD: "KeyD",
	KeyE: "KeyE",
	KeyF: "KeyF",
	KeyG: "KeyG",
	KeyH: "KeyH",
	KeyI: "KeyI",
	KeyJ: "KeyJ",
	KeyK: "KeyK",
	KeyL: "KeyL",
	KeyM: "KeyM",
	KeyN: "KeyN",
	KeyO: "KeyO",
	KeyP: "KeyP",
	KeyQ: "KeyQ",
	KeyR: "KeyR",
	KeyS: "KeyS",
	KeyT: "KeyT",
	KeyU: "KeyU",
	KeyV: "KeyV",
	KeyW: "KeyW",
	KeyX: "KeyX",
	KeyY: "KeyY",
	KeyZ: "KeyZ",
	Digit1: "Digit1",
	Digit2: "Digit2",
	Digit3: "Digit3",
	Digit4: "Digit4",
	Digit5: "Digit5",
	Digit6: "Digit6",
	Digit7: "Digit7",
	Digit8: "Digit8",
	Digit9: "Digit9",
	Digit0: "Digit0",
	Enter: "Enter",
	Escape: "Escape",
	Backspace: "Backspace",
	Tab: "Tab",
	Space: "Space",
	Minus: "Minus",
	Equal: "Equal",
	BracketLeft: "BracketLeft",
	BracketRight: "BracketRight",
	Backslash: "Backslash",
	IntlHash: "IntlHash",
	Semicolon: "Semicolon",
	Quote: "Quote",
	Backquote: "Backquote",
	Comma: "Comma",
	Period: "Period",
	Slash: "Slash",
	CapsLock: "CapsLock",
	F1: "F1",
	F2: "F2",
	F3: "F3",
	F4: "F4",
	F5: "F5",
	F6: "F6",
	F7: "F7",
	F8: "F8",
	F9: "F9",
	F10: "F10",
	F11: "F11",
	F12: "F12",
	PrintScreen: "PrintScreen",
	ScrollLock: "ScrollLock",
	Pause: "Pause",
	Insert: "Insert",
	Home: "Home",
	PageUp: "PageUp",
	Delete: "Delete",
	End: "End",
	PageDown: "PageDown",
	ArrowRight: "ArrowRight",
	ArrowLeft: "ArrowLeft",
	ArrowDown: "ArrowDown",
	ArrowUp: "ArrowUp",
	NumLock: "NumLock",
	NumpadDivide: "NumpadDivide",
	NumpadMultiply: "NumpadMultiply",
	NumpadSubtract: "NumpadSubtract",
	NumpadAdd: "NumpadAdd",
	NumpadEnter: "NumpadEnter",
	Numpad1: "Numpad1",
	Numpad2: "Numpad2",
	Numpad3: "Numpad3",
	Numpad4: "Numpad4",
	Numpad5: "Numpad5",
	Numpad6: "Numpad6",
	Numpad7: "Numpad7",
	Numpad8: "Numpad8",
	Numpad9: "Numpad9",
	Numpad0: "Numpad0",
	NumpadDecimal: "NumpadDecimal",
	IntlBackslash: "IntlBackslash",
	ContextMenu: "ContextMenu",
	Power: "Power",
	NumpadEqual: "NumpadEqual",
	F13: "F13",
	F14: "F14",
	F15: "F15",
	F16: "F16",
	F17: "F17",
	F18: "F18",
	F19: "F19",
	F20: "F20",
	F21: "F21",
	F22: "F22",
	F23: "F23",
	F24: "F24",
	Open: "Open",
	Help: "Help",
	Select: "Select",
	Again: "Again",
	Undo: "Undo",
	Cut: "Cut",
	Copy: "Copy",
	Paste: "Paste",
	Find: "Find",
	AudioVolumeMute: "AudioVolumeMute",
	AudioVolumeUp: "AudioVolumeUp",
	AudioVolumeDown: "AudioVolumeDown",
	NumpadComma: "NumpadComma",
	IntlRo: "IntlRo",
	KanaMode: "KanaMode",
	IntlYen: "IntlYen",
	Convert: "Convert",
	NonConvert: "NonConvert",
	Lang1: "Lang1",
	Lang2: "Lang2",
	Lang3: "Lang3",
	Lang4: "Lang4",
	Lang5: "Lang5",
	Abort: "Abort",
	Props: "Props",
	NumpadParenLeft: "NumpadParenLeft",
	NumpadParenRight: "NumpadParenRight",
	NumpadBackspace: "NumpadBackspace",
	NumpadMemoryStore: "NumpadMemoryStore",
	NumpadMemoryRecall: "NumpadMemoryRecall",
	NumpadMemoryClear: "NumpadMemoryClear",
	NumpadMemoryAdd: "NumpadMemoryAdd",
	NumpadMemorySubtract: "NumpadMemorySubtract",
	NumpadClear: "NumpadClear",
	NumpadClearEntry: "NumpadClearEntry",
	ControlLeft: "ControlLeft",
	ShiftLeft: "ShiftLeft",
	AltLeft: "AltLeft",
	MetaLeft: "MetaLeft",
	ControlRight: "ControlRight",
	ShiftRight: "ShiftRight",
	AltRight: "AltRight",
	MetaRight: "MetaRight",
	BrightnessUp: "BrightnessUp",
	BrightnessDown: "BrightnessDown",
	MediaPlay: "MediaPlay",
	MediaRecord: "MediaRecord",
	MediaFastForward: "MediaFastForward",
	MediaRewind: "MediaRewind",
	MediaTrackNext: "MediaTrackNext",
	MediaTrackPrevious: "MediaTrackPrevious",
	MediaStop: "MediaStop",
	Eject: "Eject",
	MediaPlayPause: "MediaPlayPause",
	MediaSelect: "MediaSelect",
	LaunchMail: "LaunchMail",
	LaunchApp2: "LaunchApp2",
	LaunchApp1: "LaunchApp1",
	LaunchControlPanel: "LaunchControlPanel",
	SelectTask: "SelectTask",
	LaunchScreenSaver: "LaunchScreenSaver",
	LaunchAssistant: "LaunchAssistant",
	BrowserSearch: "BrowserSearch",
	BrowserHome: "BrowserHome",
	BrowserBack: "BrowserBack",
	BrowserForward: "BrowserForward",
	BrowserStop: "BrowserStop",
	BrowserRefresh: "BrowserRefresh",
	BrowserFavorites: "BrowserFavorites",
	ZoomToggle: "ZoomToggle",
	MailReply: "MailReply",
	MailForward: "MailForward",
	MailSend: "MailSend",
	KeyboardLayoutSelect: "KeyboardLayoutSelect",
	ShowAllWindows: "ShowAllWindows"
};
const keyMaps = {
	None: {
		usbPage: 0,
		usb: 0,
		evdev: 0,
		xkb: 0,
		win: 0,
		mac: 65535,
		code: null,
		id: "None",
		modifier: null
	},
	Hyper: {
		usbPage: 0,
		usb: 16,
		evdev: 0,
		xkb: 0,
		win: 0,
		mac: 65535,
		code: "Hyper",
		id: "Hyper",
		modifier: null
	},
	Super: {
		usbPage: 0,
		usb: 17,
		evdev: 0,
		xkb: 0,
		win: 0,
		mac: 65535,
		code: "Super",
		id: "Super",
		modifier: null
	},
	Fn: {
		usbPage: 0,
		usb: 18,
		evdev: 0,
		xkb: 0,
		win: 0,
		mac: 65535,
		code: "Fn",
		id: "Fn",
		modifier: null
	},
	FnLock: {
		usbPage: 0,
		usb: 19,
		evdev: 0,
		xkb: 0,
		win: 0,
		mac: 65535,
		code: "FnLock",
		id: "FnLock",
		modifier: null
	},
	Suspend: {
		usbPage: 0,
		usb: 20,
		evdev: 0,
		xkb: 0,
		win: 0,
		mac: 65535,
		code: "Suspend",
		id: "Suspend",
		modifier: null
	},
	Resume: {
		usbPage: 0,
		usb: 21,
		evdev: 0,
		xkb: 0,
		win: 0,
		mac: 65535,
		code: "Resume",
		id: "Resume",
		modifier: null
	},
	Turbo: {
		usbPage: 0,
		usb: 22,
		evdev: 0,
		xkb: 0,
		win: 0,
		mac: 65535,
		code: "Turbo",
		id: "Turbo",
		modifier: null
	},
	Sleep: {
		usbPage: 1,
		usb: 130,
		evdev: 142,
		xkb: 150,
		win: 57439,
		mac: 65535,
		code: "Sleep",
		id: "Sleep",
		modifier: null
	},
	WakeUp: {
		usbPage: 1,
		usb: 131,
		evdev: 143,
		xkb: 151,
		win: 57443,
		mac: 65535,
		code: "WakeUp",
		id: "WakeUp",
		modifier: null
	},
	DisplayToggleIntExt: {
		usbPage: 1,
		usb: 181,
		evdev: 227,
		xkb: 235,
		win: 0,
		mac: 65535,
		code: "DisplayToggleIntExt",
		id: "DisplayToggleIntExt",
		modifier: null
	},
	UsbReserved: {
		usbPage: 7,
		usb: 0,
		evdev: 0,
		xkb: 0,
		win: 0,
		mac: 65535,
		code: null,
		id: "UsbReserved",
		modifier: null
	},
	UsbErrorRollOver: {
		usbPage: 7,
		usb: 1,
		evdev: 0,
		xkb: 0,
		win: 255,
		mac: 65535,
		code: null,
		id: "UsbErrorRollOver",
		modifier: null
	},
	UsbPostFail: {
		usbPage: 7,
		usb: 2,
		evdev: 0,
		xkb: 0,
		win: 252,
		mac: 65535,
		code: null,
		id: "UsbPostFail",
		modifier: null
	},
	UsbErrorUndefined: {
		usbPage: 7,
		usb: 3,
		evdev: 0,
		xkb: 0,
		win: 0,
		mac: 65535,
		code: null,
		id: "UsbErrorUndefined",
		modifier: null
	},
	UsA: {
		usbPage: 7,
		usb: 4,
		evdev: 30,
		xkb: 38,
		win: 30,
		mac: 0,
		code: "KeyA",
		id: "UsA",
		modifier: null
	},
	UsB: {
		usbPage: 7,
		usb: 5,
		evdev: 48,
		xkb: 56,
		win: 48,
		mac: 11,
		code: "KeyB",
		id: "UsB",
		modifier: null
	},
	UsC: {
		usbPage: 7,
		usb: 6,
		evdev: 46,
		xkb: 54,
		win: 46,
		mac: 8,
		code: "KeyC",
		id: "UsC",
		modifier: null
	},
	UsD: {
		usbPage: 7,
		usb: 7,
		evdev: 32,
		xkb: 40,
		win: 32,
		mac: 2,
		code: "KeyD",
		id: "UsD",
		modifier: null
	},
	UsE: {
		usbPage: 7,
		usb: 8,
		evdev: 18,
		xkb: 26,
		win: 18,
		mac: 14,
		code: "KeyE",
		id: "UsE",
		modifier: null
	},
	UsF: {
		usbPage: 7,
		usb: 9,
		evdev: 33,
		xkb: 41,
		win: 33,
		mac: 3,
		code: "KeyF",
		id: "UsF",
		modifier: null
	},
	UsG: {
		usbPage: 7,
		usb: 10,
		evdev: 34,
		xkb: 42,
		win: 34,
		mac: 5,
		code: "KeyG",
		id: "UsG",
		modifier: null
	},
	UsH: {
		usbPage: 7,
		usb: 11,
		evdev: 35,
		xkb: 43,
		win: 35,
		mac: 4,
		code: "KeyH",
		id: "UsH",
		modifier: null
	},
	UsI: {
		usbPage: 7,
		usb: 12,
		evdev: 23,
		xkb: 31,
		win: 23,
		mac: 34,
		code: "KeyI",
		id: "UsI",
		modifier: null
	},
	UsJ: {
		usbPage: 7,
		usb: 13,
		evdev: 36,
		xkb: 44,
		win: 36,
		mac: 38,
		code: "KeyJ",
		id: "UsJ",
		modifier: null
	},
	UsK: {
		usbPage: 7,
		usb: 14,
		evdev: 37,
		xkb: 45,
		win: 37,
		mac: 40,
		code: "KeyK",
		id: "UsK",
		modifier: null
	},
	UsL: {
		usbPage: 7,
		usb: 15,
		evdev: 38,
		xkb: 46,
		win: 38,
		mac: 37,
		code: "KeyL",
		id: "UsL",
		modifier: null
	},
	UsM: {
		usbPage: 7,
		usb: 16,
		evdev: 50,
		xkb: 58,
		win: 50,
		mac: 46,
		code: "KeyM",
		id: "UsM",
		modifier: null
	},
	UsN: {
		usbPage: 7,
		usb: 17,
		evdev: 49,
		xkb: 57,
		win: 49,
		mac: 45,
		code: "KeyN",
		id: "UsN",
		modifier: null
	},
	UsO: {
		usbPage: 7,
		usb: 18,
		evdev: 24,
		xkb: 32,
		win: 24,
		mac: 31,
		code: "KeyO",
		id: "UsO",
		modifier: null
	},
	UsP: {
		usbPage: 7,
		usb: 19,
		evdev: 25,
		xkb: 33,
		win: 25,
		mac: 35,
		code: "KeyP",
		id: "UsP",
		modifier: null
	},
	UsQ: {
		usbPage: 7,
		usb: 20,
		evdev: 16,
		xkb: 24,
		win: 16,
		mac: 12,
		code: "KeyQ",
		id: "UsQ",
		modifier: null
	},
	UsR: {
		usbPage: 7,
		usb: 21,
		evdev: 19,
		xkb: 27,
		win: 19,
		mac: 15,
		code: "KeyR",
		id: "UsR",
		modifier: null
	},
	UsS: {
		usbPage: 7,
		usb: 22,
		evdev: 31,
		xkb: 39,
		win: 31,
		mac: 1,
		code: "KeyS",
		id: "UsS",
		modifier: null
	},
	UsT: {
		usbPage: 7,
		usb: 23,
		evdev: 20,
		xkb: 28,
		win: 20,
		mac: 17,
		code: "KeyT",
		id: "UsT",
		modifier: null
	},
	UsU: {
		usbPage: 7,
		usb: 24,
		evdev: 22,
		xkb: 30,
		win: 22,
		mac: 32,
		code: "KeyU",
		id: "UsU",
		modifier: null
	},
	UsV: {
		usbPage: 7,
		usb: 25,
		evdev: 47,
		xkb: 55,
		win: 47,
		mac: 9,
		code: "KeyV",
		id: "UsV",
		modifier: null
	},
	UsW: {
		usbPage: 7,
		usb: 26,
		evdev: 17,
		xkb: 25,
		win: 17,
		mac: 13,
		code: "KeyW",
		id: "UsW",
		modifier: null
	},
	UsX: {
		usbPage: 7,
		usb: 27,
		evdev: 45,
		xkb: 53,
		win: 45,
		mac: 7,
		code: "KeyX",
		id: "UsX",
		modifier: null
	},
	UsY: {
		usbPage: 7,
		usb: 28,
		evdev: 21,
		xkb: 29,
		win: 21,
		mac: 16,
		code: "KeyY",
		id: "UsY",
		modifier: null
	},
	UsZ: {
		usbPage: 7,
		usb: 29,
		evdev: 44,
		xkb: 52,
		win: 44,
		mac: 6,
		code: "KeyZ",
		id: "UsZ",
		modifier: null
	},
	Digit1: {
		usbPage: 7,
		usb: 30,
		evdev: 2,
		xkb: 10,
		win: 2,
		mac: 18,
		code: "Digit1",
		id: "Digit1",
		modifier: null
	},
	Digit2: {
		usbPage: 7,
		usb: 31,
		evdev: 3,
		xkb: 11,
		win: 3,
		mac: 19,
		code: "Digit2",
		id: "Digit2",
		modifier: null
	},
	Digit3: {
		usbPage: 7,
		usb: 32,
		evdev: 4,
		xkb: 12,
		win: 4,
		mac: 20,
		code: "Digit3",
		id: "Digit3",
		modifier: null
	},
	Digit4: {
		usbPage: 7,
		usb: 33,
		evdev: 5,
		xkb: 13,
		win: 5,
		mac: 21,
		code: "Digit4",
		id: "Digit4",
		modifier: null
	},
	Digit5: {
		usbPage: 7,
		usb: 34,
		evdev: 6,
		xkb: 14,
		win: 6,
		mac: 23,
		code: "Digit5",
		id: "Digit5",
		modifier: null
	},
	Digit6: {
		usbPage: 7,
		usb: 35,
		evdev: 7,
		xkb: 15,
		win: 7,
		mac: 22,
		code: "Digit6",
		id: "Digit6",
		modifier: null
	},
	Digit7: {
		usbPage: 7,
		usb: 36,
		evdev: 8,
		xkb: 16,
		win: 8,
		mac: 26,
		code: "Digit7",
		id: "Digit7",
		modifier: null
	},
	Digit8: {
		usbPage: 7,
		usb: 37,
		evdev: 9,
		xkb: 17,
		win: 9,
		mac: 28,
		code: "Digit8",
		id: "Digit8",
		modifier: null
	},
	Digit9: {
		usbPage: 7,
		usb: 38,
		evdev: 10,
		xkb: 18,
		win: 10,
		mac: 25,
		code: "Digit9",
		id: "Digit9",
		modifier: null
	},
	Digit0: {
		usbPage: 7,
		usb: 39,
		evdev: 11,
		xkb: 19,
		win: 11,
		mac: 29,
		code: "Digit0",
		id: "Digit0",
		modifier: null
	},
	Enter: {
		usbPage: 7,
		usb: 40,
		evdev: 28,
		xkb: 36,
		win: 28,
		mac: 36,
		code: "Enter",
		id: "Enter",
		modifier: null
	},
	Escape: {
		usbPage: 7,
		usb: 41,
		evdev: 1,
		xkb: 9,
		win: 1,
		mac: 53,
		code: "Escape",
		id: "Escape",
		modifier: null
	},
	Backspace: {
		usbPage: 7,
		usb: 42,
		evdev: 14,
		xkb: 22,
		win: 14,
		mac: 51,
		code: "Backspace",
		id: "Backspace",
		modifier: null
	},
	Tab: {
		usbPage: 7,
		usb: 43,
		evdev: 15,
		xkb: 23,
		win: 15,
		mac: 48,
		code: "Tab",
		id: "Tab",
		modifier: null
	},
	Space: {
		usbPage: 7,
		usb: 44,
		evdev: 57,
		xkb: 65,
		win: 57,
		mac: 49,
		code: "Space",
		id: "Space",
		modifier: null
	},
	Minus: {
		usbPage: 7,
		usb: 45,
		evdev: 12,
		xkb: 20,
		win: 12,
		mac: 27,
		code: "Minus",
		id: "Minus",
		modifier: null
	},
	Equal: {
		usbPage: 7,
		usb: 46,
		evdev: 13,
		xkb: 21,
		win: 13,
		mac: 24,
		code: "Equal",
		id: "Equal",
		modifier: null
	},
	BracketLeft: {
		usbPage: 7,
		usb: 47,
		evdev: 26,
		xkb: 34,
		win: 26,
		mac: 33,
		code: "BracketLeft",
		id: "BracketLeft",
		modifier: null
	},
	BracketRight: {
		usbPage: 7,
		usb: 48,
		evdev: 27,
		xkb: 35,
		win: 27,
		mac: 30,
		code: "BracketRight",
		id: "BracketRight",
		modifier: null
	},
	Backslash: {
		usbPage: 7,
		usb: 49,
		evdev: 43,
		xkb: 51,
		win: 43,
		mac: 42,
		code: "Backslash",
		id: "Backslash",
		modifier: null
	},
	IntlHash: {
		usbPage: 7,
		usb: 50,
		evdev: 0,
		xkb: 0,
		win: 0,
		mac: 65535,
		code: "IntlHash",
		id: "IntlHash",
		modifier: null
	},
	Semicolon: {
		usbPage: 7,
		usb: 51,
		evdev: 39,
		xkb: 47,
		win: 39,
		mac: 41,
		code: "Semicolon",
		id: "Semicolon",
		modifier: null
	},
	Quote: {
		usbPage: 7,
		usb: 52,
		evdev: 40,
		xkb: 48,
		win: 40,
		mac: 39,
		code: "Quote",
		id: "Quote",
		modifier: null
	},
	Backquote: {
		usbPage: 7,
		usb: 53,
		evdev: 41,
		xkb: 49,
		win: 41,
		mac: 50,
		code: "Backquote",
		id: "Backquote",
		modifier: null
	},
	Comma: {
		usbPage: 7,
		usb: 54,
		evdev: 51,
		xkb: 59,
		win: 51,
		mac: 43,
		code: "Comma",
		id: "Comma",
		modifier: null
	},
	Period: {
		usbPage: 7,
		usb: 55,
		evdev: 52,
		xkb: 60,
		win: 52,
		mac: 47,
		code: "Period",
		id: "Period",
		modifier: null
	},
	Slash: {
		usbPage: 7,
		usb: 56,
		evdev: 53,
		xkb: 61,
		win: 53,
		mac: 44,
		code: "Slash",
		id: "Slash",
		modifier: null
	},
	CapsLock: {
		usbPage: 7,
		usb: 57,
		evdev: 58,
		xkb: 66,
		win: 58,
		mac: 57,
		code: "CapsLock",
		id: "CapsLock",
		modifier: null
	},
	F1: {
		usbPage: 7,
		usb: 58,
		evdev: 59,
		xkb: 67,
		win: 59,
		mac: 122,
		code: "F1",
		id: "F1",
		modifier: null
	},
	F2: {
		usbPage: 7,
		usb: 59,
		evdev: 60,
		xkb: 68,
		win: 60,
		mac: 120,
		code: "F2",
		id: "F2",
		modifier: null
	},
	F3: {
		usbPage: 7,
		usb: 60,
		evdev: 61,
		xkb: 69,
		win: 61,
		mac: 99,
		code: "F3",
		id: "F3",
		modifier: null
	},
	F4: {
		usbPage: 7,
		usb: 61,
		evdev: 62,
		xkb: 70,
		win: 62,
		mac: 118,
		code: "F4",
		id: "F4",
		modifier: null
	},
	F5: {
		usbPage: 7,
		usb: 62,
		evdev: 63,
		xkb: 71,
		win: 63,
		mac: 96,
		code: "F5",
		id: "F5",
		modifier: null
	},
	F6: {
		usbPage: 7,
		usb: 63,
		evdev: 64,
		xkb: 72,
		win: 64,
		mac: 97,
		code: "F6",
		id: "F6",
		modifier: null
	},
	F7: {
		usbPage: 7,
		usb: 64,
		evdev: 65,
		xkb: 73,
		win: 65,
		mac: 98,
		code: "F7",
		id: "F7",
		modifier: null
	},
	F8: {
		usbPage: 7,
		usb: 65,
		evdev: 66,
		xkb: 74,
		win: 66,
		mac: 100,
		code: "F8",
		id: "F8",
		modifier: null
	},
	F9: {
		usbPage: 7,
		usb: 66,
		evdev: 67,
		xkb: 75,
		win: 67,
		mac: 101,
		code: "F9",
		id: "F9",
		modifier: null
	},
	F10: {
		usbPage: 7,
		usb: 67,
		evdev: 68,
		xkb: 76,
		win: 68,
		mac: 109,
		code: "F10",
		id: "F10",
		modifier: null
	},
	F11: {
		usbPage: 7,
		usb: 68,
		evdev: 87,
		xkb: 95,
		win: 87,
		mac: 103,
		code: "F11",
		id: "F11",
		modifier: null
	},
	F12: {
		usbPage: 7,
		usb: 69,
		evdev: 88,
		xkb: 96,
		win: 88,
		mac: 111,
		code: "F12",
		id: "F12",
		modifier: null
	},
	PrintScreen: {
		usbPage: 7,
		usb: 70,
		evdev: 99,
		xkb: 107,
		win: 57399,
		mac: 65535,
		code: "PrintScreen",
		id: "PrintScreen",
		modifier: null
	},
	ScrollLock: {
		usbPage: 7,
		usb: 71,
		evdev: 70,
		xkb: 78,
		win: 70,
		mac: 65535,
		code: "ScrollLock",
		id: "ScrollLock",
		modifier: null
	},
	Pause: {
		usbPage: 7,
		usb: 72,
		evdev: 119,
		xkb: 127,
		win: 69,
		mac: 65535,
		code: "Pause",
		id: "Pause",
		modifier: null
	},
	Insert: {
		usbPage: 7,
		usb: 73,
		evdev: 110,
		xkb: 118,
		win: 57426,
		mac: 114,
		code: "Insert",
		id: "Insert",
		modifier: null
	},
	Home: {
		usbPage: 7,
		usb: 74,
		evdev: 102,
		xkb: 110,
		win: 57415,
		mac: 115,
		code: "Home",
		id: "Home",
		modifier: null
	},
	PageUp: {
		usbPage: 7,
		usb: 75,
		evdev: 104,
		xkb: 112,
		win: 57417,
		mac: 116,
		code: "PageUp",
		id: "PageUp",
		modifier: null
	},
	Del: {
		usbPage: 7,
		usb: 76,
		evdev: 111,
		xkb: 119,
		win: 57427,
		mac: 117,
		code: "Delete",
		id: "Del",
		modifier: null
	},
	End: {
		usbPage: 7,
		usb: 77,
		evdev: 107,
		xkb: 115,
		win: 57423,
		mac: 119,
		code: "End",
		id: "End",
		modifier: null
	},
	PageDown: {
		usbPage: 7,
		usb: 78,
		evdev: 109,
		xkb: 117,
		win: 57425,
		mac: 121,
		code: "PageDown",
		id: "PageDown",
		modifier: null
	},
	ArrowRight: {
		usbPage: 7,
		usb: 79,
		evdev: 106,
		xkb: 114,
		win: 57421,
		mac: 124,
		code: "ArrowRight",
		id: "ArrowRight",
		modifier: null
	},
	ArrowLeft: {
		usbPage: 7,
		usb: 80,
		evdev: 105,
		xkb: 113,
		win: 57419,
		mac: 123,
		code: "ArrowLeft",
		id: "ArrowLeft",
		modifier: null
	},
	ArrowDown: {
		usbPage: 7,
		usb: 81,
		evdev: 108,
		xkb: 116,
		win: 57424,
		mac: 125,
		code: "ArrowDown",
		id: "ArrowDown",
		modifier: null
	},
	ArrowUp: {
		usbPage: 7,
		usb: 82,
		evdev: 103,
		xkb: 111,
		win: 57416,
		mac: 126,
		code: "ArrowUp",
		id: "ArrowUp",
		modifier: null
	},
	NumLock: {
		usbPage: 7,
		usb: 83,
		evdev: 69,
		xkb: 77,
		win: 57413,
		mac: 71,
		code: "NumLock",
		id: "NumLock",
		modifier: null
	},
	NumpadDivide: {
		usbPage: 7,
		usb: 84,
		evdev: 98,
		xkb: 106,
		win: 57397,
		mac: 75,
		code: "NumpadDivide",
		id: "NumpadDivide",
		modifier: null
	},
	NumpadMultiply: {
		usbPage: 7,
		usb: 85,
		evdev: 55,
		xkb: 63,
		win: 55,
		mac: 67,
		code: "NumpadMultiply",
		id: "NumpadMultiply",
		modifier: null
	},
	NumpadSubtract: {
		usbPage: 7,
		usb: 86,
		evdev: 74,
		xkb: 82,
		win: 74,
		mac: 78,
		code: "NumpadSubtract",
		id: "NumpadSubtract",
		modifier: null
	},
	NumpadAdd: {
		usbPage: 7,
		usb: 87,
		evdev: 78,
		xkb: 86,
		win: 78,
		mac: 69,
		code: "NumpadAdd",
		id: "NumpadAdd",
		modifier: null
	},
	NumpadEnter: {
		usbPage: 7,
		usb: 88,
		evdev: 96,
		xkb: 104,
		win: 57372,
		mac: 76,
		code: "NumpadEnter",
		id: "NumpadEnter",
		modifier: null
	},
	Numpad1: {
		usbPage: 7,
		usb: 89,
		evdev: 79,
		xkb: 87,
		win: 79,
		mac: 83,
		code: "Numpad1",
		id: "Numpad1",
		modifier: null
	},
	Numpad2: {
		usbPage: 7,
		usb: 90,
		evdev: 80,
		xkb: 88,
		win: 80,
		mac: 84,
		code: "Numpad2",
		id: "Numpad2",
		modifier: null
	},
	Numpad3: {
		usbPage: 7,
		usb: 91,
		evdev: 81,
		xkb: 89,
		win: 81,
		mac: 85,
		code: "Numpad3",
		id: "Numpad3",
		modifier: null
	},
	Numpad4: {
		usbPage: 7,
		usb: 92,
		evdev: 75,
		xkb: 83,
		win: 75,
		mac: 86,
		code: "Numpad4",
		id: "Numpad4",
		modifier: null
	},
	Numpad5: {
		usbPage: 7,
		usb: 93,
		evdev: 76,
		xkb: 84,
		win: 76,
		mac: 87,
		code: "Numpad5",
		id: "Numpad5",
		modifier: null
	},
	Numpad6: {
		usbPage: 7,
		usb: 94,
		evdev: 77,
		xkb: 85,
		win: 77,
		mac: 88,
		code: "Numpad6",
		id: "Numpad6",
		modifier: null
	},
	Numpad7: {
		usbPage: 7,
		usb: 95,
		evdev: 71,
		xkb: 79,
		win: 71,
		mac: 89,
		code: "Numpad7",
		id: "Numpad7",
		modifier: null
	},
	Numpad8: {
		usbPage: 7,
		usb: 96,
		evdev: 72,
		xkb: 80,
		win: 72,
		mac: 91,
		code: "Numpad8",
		id: "Numpad8",
		modifier: null
	},
	Numpad9: {
		usbPage: 7,
		usb: 97,
		evdev: 73,
		xkb: 81,
		win: 73,
		mac: 92,
		code: "Numpad9",
		id: "Numpad9",
		modifier: null
	},
	Numpad0: {
		usbPage: 7,
		usb: 98,
		evdev: 82,
		xkb: 90,
		win: 82,
		mac: 82,
		code: "Numpad0",
		id: "Numpad0",
		modifier: null
	},
	NumpadDecimal: {
		usbPage: 7,
		usb: 99,
		evdev: 83,
		xkb: 91,
		win: 83,
		mac: 65,
		code: "NumpadDecimal",
		id: "NumpadDecimal",
		modifier: null
	},
	IntlBackslash: {
		usbPage: 7,
		usb: 100,
		evdev: 86,
		xkb: 94,
		win: 86,
		mac: 10,
		code: "IntlBackslash",
		id: "IntlBackslash",
		modifier: null
	},
	ContextMenu: {
		usbPage: 7,
		usb: 101,
		evdev: 127,
		xkb: 135,
		win: 57437,
		mac: 110,
		code: "ContextMenu",
		id: "ContextMenu",
		modifier: null
	},
	Power: {
		usbPage: 7,
		usb: 102,
		evdev: 116,
		xkb: 124,
		win: 57438,
		mac: 65535,
		code: "Power",
		id: "Power",
		modifier: null
	},
	NumpadEqual: {
		usbPage: 7,
		usb: 103,
		evdev: 117,
		xkb: 125,
		win: 89,
		mac: 81,
		code: "NumpadEqual",
		id: "NumpadEqual",
		modifier: null
	},
	F13: {
		usbPage: 7,
		usb: 104,
		evdev: 183,
		xkb: 191,
		win: 100,
		mac: 105,
		code: "F13",
		id: "F13",
		modifier: null
	},
	F14: {
		usbPage: 7,
		usb: 105,
		evdev: 184,
		xkb: 192,
		win: 101,
		mac: 107,
		code: "F14",
		id: "F14",
		modifier: null
	},
	F15: {
		usbPage: 7,
		usb: 106,
		evdev: 185,
		xkb: 193,
		win: 102,
		mac: 113,
		code: "F15",
		id: "F15",
		modifier: null
	},
	F16: {
		usbPage: 7,
		usb: 107,
		evdev: 186,
		xkb: 194,
		win: 103,
		mac: 106,
		code: "F16",
		id: "F16",
		modifier: null
	},
	F17: {
		usbPage: 7,
		usb: 108,
		evdev: 187,
		xkb: 195,
		win: 104,
		mac: 64,
		code: "F17",
		id: "F17",
		modifier: null
	},
	F18: {
		usbPage: 7,
		usb: 109,
		evdev: 188,
		xkb: 196,
		win: 105,
		mac: 79,
		code: "F18",
		id: "F18",
		modifier: null
	},
	F19: {
		usbPage: 7,
		usb: 110,
		evdev: 189,
		xkb: 197,
		win: 106,
		mac: 80,
		code: "F19",
		id: "F19",
		modifier: null
	},
	F20: {
		usbPage: 7,
		usb: 111,
		evdev: 190,
		xkb: 198,
		win: 107,
		mac: 90,
		code: "F20",
		id: "F20",
		modifier: null
	},
	F21: {
		usbPage: 7,
		usb: 112,
		evdev: 191,
		xkb: 199,
		win: 108,
		mac: 65535,
		code: "F21",
		id: "F21",
		modifier: null
	},
	F22: {
		usbPage: 7,
		usb: 113,
		evdev: 192,
		xkb: 200,
		win: 109,
		mac: 65535,
		code: "F22",
		id: "F22",
		modifier: null
	},
	F23: {
		usbPage: 7,
		usb: 114,
		evdev: 193,
		xkb: 201,
		win: 110,
		mac: 65535,
		code: "F23",
		id: "F23",
		modifier: null
	},
	F24: {
		usbPage: 7,
		usb: 115,
		evdev: 194,
		xkb: 202,
		win: 118,
		mac: 65535,
		code: "F24",
		id: "F24",
		modifier: null
	},
	Open: {
		usbPage: 7,
		usb: 116,
		evdev: 134,
		xkb: 142,
		win: 0,
		mac: 65535,
		code: "Open",
		id: "Open",
		modifier: null
	},
	Help: {
		usbPage: 7,
		usb: 117,
		evdev: 138,
		xkb: 146,
		win: 57403,
		mac: 65535,
		code: "Help",
		id: "Help",
		modifier: null
	},
	Select: {
		usbPage: 7,
		usb: 119,
		evdev: 132,
		xkb: 140,
		win: 0,
		mac: 65535,
		code: "Select",
		id: "Select",
		modifier: null
	},
	Again: {
		usbPage: 7,
		usb: 121,
		evdev: 129,
		xkb: 137,
		win: 0,
		mac: 65535,
		code: "Again",
		id: "Again",
		modifier: null
	},
	Undo: {
		usbPage: 7,
		usb: 122,
		evdev: 131,
		xkb: 139,
		win: 57352,
		mac: 65535,
		code: "Undo",
		id: "Undo",
		modifier: null
	},
	Cut: {
		usbPage: 7,
		usb: 123,
		evdev: 137,
		xkb: 145,
		win: 57367,
		mac: 65535,
		code: "Cut",
		id: "Cut",
		modifier: null
	},
	Copy: {
		usbPage: 7,
		usb: 124,
		evdev: 133,
		xkb: 141,
		win: 57368,
		mac: 65535,
		code: "Copy",
		id: "Copy",
		modifier: null
	},
	Paste: {
		usbPage: 7,
		usb: 125,
		evdev: 135,
		xkb: 143,
		win: 57354,
		mac: 65535,
		code: "Paste",
		id: "Paste",
		modifier: null
	},
	Find: {
		usbPage: 7,
		usb: 126,
		evdev: 136,
		xkb: 144,
		win: 0,
		mac: 65535,
		code: "Find",
		id: "Find",
		modifier: null
	},
	VolumeMute: {
		usbPage: 7,
		usb: 127,
		evdev: 113,
		xkb: 121,
		win: 57376,
		mac: 74,
		code: "AudioVolumeMute",
		id: "VolumeMute",
		modifier: null
	},
	VolumeUp: {
		usbPage: 7,
		usb: 128,
		evdev: 115,
		xkb: 123,
		win: 57392,
		mac: 72,
		code: "AudioVolumeUp",
		id: "VolumeUp",
		modifier: null
	},
	VolumeDown: {
		usbPage: 7,
		usb: 129,
		evdev: 114,
		xkb: 122,
		win: 57390,
		mac: 73,
		code: "AudioVolumeDown",
		id: "VolumeDown",
		modifier: null
	},
	NumpadComma: {
		usbPage: 7,
		usb: 133,
		evdev: 121,
		xkb: 129,
		win: 126,
		mac: 95,
		code: "NumpadComma",
		id: "NumpadComma",
		modifier: null
	},
	IntlRo: {
		usbPage: 7,
		usb: 135,
		evdev: 89,
		xkb: 97,
		win: 115,
		mac: 94,
		code: "IntlRo",
		id: "IntlRo",
		modifier: null
	},
	KanaMode: {
		usbPage: 7,
		usb: 136,
		evdev: 93,
		xkb: 101,
		win: 112,
		mac: 104,
		code: "KanaMode",
		id: "KanaMode",
		modifier: null
	},
	IntlYen: {
		usbPage: 7,
		usb: 137,
		evdev: 124,
		xkb: 132,
		win: 125,
		mac: 93,
		code: "IntlYen",
		id: "IntlYen",
		modifier: null
	},
	Convert: {
		usbPage: 7,
		usb: 138,
		evdev: 92,
		xkb: 100,
		win: 121,
		mac: 65535,
		code: "Convert",
		id: "Convert",
		modifier: null
	},
	NonConvert: {
		usbPage: 7,
		usb: 139,
		evdev: 94,
		xkb: 102,
		win: 123,
		mac: 65535,
		code: "NonConvert",
		id: "NonConvert",
		modifier: null
	},
	Lang1: {
		usbPage: 7,
		usb: 144,
		evdev: 122,
		xkb: 130,
		win: 114,
		mac: 65535,
		code: "Lang1",
		id: "Lang1",
		modifier: null
	},
	Lang2: {
		usbPage: 7,
		usb: 145,
		evdev: 123,
		xkb: 131,
		win: 113,
		mac: 65535,
		code: "Lang2",
		id: "Lang2",
		modifier: null
	},
	Lang3: {
		usbPage: 7,
		usb: 146,
		evdev: 90,
		xkb: 98,
		win: 120,
		mac: 65535,
		code: "Lang3",
		id: "Lang3",
		modifier: null
	},
	Lang4: {
		usbPage: 7,
		usb: 147,
		evdev: 91,
		xkb: 99,
		win: 119,
		mac: 65535,
		code: "Lang4",
		id: "Lang4",
		modifier: null
	},
	Lang5: {
		usbPage: 7,
		usb: 148,
		evdev: 85,
		xkb: 93,
		win: 0,
		mac: 65535,
		code: "Lang5",
		id: "Lang5",
		modifier: null
	},
	Abort: {
		usbPage: 7,
		usb: 155,
		evdev: 0,
		xkb: 0,
		win: 0,
		mac: 65535,
		code: "Abort",
		id: "Abort",
		modifier: null
	},
	Props: {
		usbPage: 7,
		usb: 163,
		evdev: 0,
		xkb: 0,
		win: 0,
		mac: 65535,
		code: "Props",
		id: "Props",
		modifier: null
	},
	NumpadParenLeft: {
		usbPage: 7,
		usb: 182,
		evdev: 179,
		xkb: 187,
		win: 0,
		mac: 65535,
		code: "NumpadParenLeft",
		id: "NumpadParenLeft",
		modifier: null
	},
	NumpadParenRight: {
		usbPage: 7,
		usb: 183,
		evdev: 180,
		xkb: 188,
		win: 0,
		mac: 65535,
		code: "NumpadParenRight",
		id: "NumpadParenRight",
		modifier: null
	},
	NumpadBackspace: {
		usbPage: 7,
		usb: 187,
		evdev: 0,
		xkb: 0,
		win: 0,
		mac: 65535,
		code: "NumpadBackspace",
		id: "NumpadBackspace",
		modifier: null
	},
	NumpadMemoryStore: {
		usbPage: 7,
		usb: 208,
		evdev: 0,
		xkb: 0,
		win: 0,
		mac: 65535,
		code: "NumpadMemoryStore",
		id: "NumpadMemoryStore",
		modifier: null
	},
	NumpadMemoryRecall: {
		usbPage: 7,
		usb: 209,
		evdev: 0,
		xkb: 0,
		win: 0,
		mac: 65535,
		code: "NumpadMemoryRecall",
		id: "NumpadMemoryRecall",
		modifier: null
	},
	NumpadMemoryClear: {
		usbPage: 7,
		usb: 210,
		evdev: 0,
		xkb: 0,
		win: 0,
		mac: 65535,
		code: "NumpadMemoryClear",
		id: "NumpadMemoryClear",
		modifier: null
	},
	NumpadMemoryAdd: {
		usbPage: 7,
		usb: 211,
		evdev: 0,
		xkb: 0,
		win: 0,
		mac: 65535,
		code: "NumpadMemoryAdd",
		id: "NumpadMemoryAdd",
		modifier: null
	},
	NumpadMemorySubtract: {
		usbPage: 7,
		usb: 212,
		evdev: 0,
		xkb: 0,
		win: 0,
		mac: 65535,
		code: "NumpadMemorySubtract",
		id: "NumpadMemorySubtract",
		modifier: null
	},
	NumpadSignChange: {
		usbPage: 7,
		usb: 215,
		evdev: 118,
		xkb: 126,
		win: 0,
		mac: 65535,
		code: null,
		id: "NumpadSignChange",
		modifier: null
	},
	NumpadClear: {
		usbPage: 7,
		usb: 216,
		evdev: 0,
		xkb: 0,
		win: 0,
		mac: 65535,
		code: "NumpadClear",
		id: "NumpadClear",
		modifier: null
	},
	NumpadClearEntry: {
		usbPage: 7,
		usb: 217,
		evdev: 0,
		xkb: 0,
		win: 0,
		mac: 65535,
		code: "NumpadClearEntry",
		id: "NumpadClearEntry",
		modifier: null
	},
	ControlLeft: {
		usbPage: 7,
		usb: 224,
		evdev: 29,
		xkb: 37,
		win: 29,
		mac: 59,
		code: "ControlLeft",
		id: "ControlLeft",
		modifier: 1
	},
	ShiftLeft: {
		usbPage: 7,
		usb: 225,
		evdev: 42,
		xkb: 50,
		win: 42,
		mac: 56,
		code: "ShiftLeft",
		id: "ShiftLeft",
		modifier: 2
	},
	AltLeft: {
		usbPage: 7,
		usb: 226,
		evdev: 56,
		xkb: 64,
		win: 56,
		mac: 58,
		code: "AltLeft",
		id: "AltLeft",
		modifier: 4
	},
	MetaLeft: {
		usbPage: 7,
		usb: 227,
		evdev: 125,
		xkb: 133,
		win: 57435,
		mac: 55,
		code: "MetaLeft",
		id: "MetaLeft",
		modifier: 8
	},
	ControlRight: {
		usbPage: 7,
		usb: 228,
		evdev: 97,
		xkb: 105,
		win: 57373,
		mac: 62,
		code: "ControlRight",
		id: "ControlRight",
		modifier: 16
	},
	ShiftRight: {
		usbPage: 7,
		usb: 229,
		evdev: 54,
		xkb: 62,
		win: 54,
		mac: 60,
		code: "ShiftRight",
		id: "ShiftRight",
		modifier: 32
	},
	AltRight: {
		usbPage: 7,
		usb: 230,
		evdev: 100,
		xkb: 108,
		win: 57400,
		mac: 61,
		code: "AltRight",
		id: "AltRight",
		modifier: 64
	},
	MetaRight: {
		usbPage: 7,
		usb: 231,
		evdev: 126,
		xkb: 134,
		win: 57436,
		mac: 54,
		code: "MetaRight",
		id: "MetaRight",
		modifier: 128
	},
	Info: {
		usbPage: 12,
		usb: 96,
		evdev: 358,
		xkb: 366,
		win: 0,
		mac: 65535,
		code: null,
		id: "Info",
		modifier: null
	},
	ClosedCaptionToggle: {
		usbPage: 12,
		usb: 97,
		evdev: 370,
		xkb: 378,
		win: 0,
		mac: 65535,
		code: null,
		id: "ClosedCaptionToggle",
		modifier: null
	},
	BrightnessUp: {
		usbPage: 12,
		usb: 111,
		evdev: 225,
		xkb: 233,
		win: 0,
		mac: 65535,
		code: "BrightnessUp",
		id: "BrightnessUp",
		modifier: null
	},
	BrightnessDown: {
		usbPage: 12,
		usb: 112,
		evdev: 224,
		xkb: 232,
		win: 0,
		mac: 65535,
		code: "BrightnessDown",
		id: "BrightnessDown",
		modifier: null
	},
	BrightnessToggle: {
		usbPage: 12,
		usb: 114,
		evdev: 431,
		xkb: 439,
		win: 0,
		mac: 65535,
		code: null,
		id: "BrightnessToggle",
		modifier: null
	},
	BrightnessMinimium: {
		usbPage: 12,
		usb: 115,
		evdev: 592,
		xkb: 600,
		win: 0,
		mac: 65535,
		code: null,
		id: "BrightnessMinimium",
		modifier: null
	},
	BrightnessMaximum: {
		usbPage: 12,
		usb: 116,
		evdev: 593,
		xkb: 601,
		win: 0,
		mac: 65535,
		code: null,
		id: "BrightnessMaximum",
		modifier: null
	},
	BrightnessAuto: {
		usbPage: 12,
		usb: 117,
		evdev: 244,
		xkb: 252,
		win: 0,
		mac: 65535,
		code: null,
		id: "BrightnessAuto",
		modifier: null
	},
	MediaLast: {
		usbPage: 12,
		usb: 131,
		evdev: 405,
		xkb: 413,
		win: 0,
		mac: 65535,
		code: null,
		id: "MediaLast",
		modifier: null
	},
	LaunchPhone: {
		usbPage: 12,
		usb: 140,
		evdev: 169,
		xkb: 177,
		win: 0,
		mac: 65535,
		code: null,
		id: "LaunchPhone",
		modifier: null
	},
	ProgramGuide: {
		usbPage: 12,
		usb: 141,
		evdev: 362,
		xkb: 370,
		win: 0,
		mac: 65535,
		code: null,
		id: "ProgramGuide",
		modifier: null
	},
	Exit: {
		usbPage: 12,
		usb: 148,
		evdev: 174,
		xkb: 182,
		win: 0,
		mac: 65535,
		code: null,
		id: "Exit",
		modifier: null
	},
	ChannelUp: {
		usbPage: 12,
		usb: 156,
		evdev: 410,
		xkb: 418,
		win: 0,
		mac: 65535,
		code: null,
		id: "ChannelUp",
		modifier: null
	},
	ChannelDown: {
		usbPage: 12,
		usb: 157,
		evdev: 411,
		xkb: 419,
		win: 0,
		mac: 65535,
		code: null,
		id: "ChannelDown",
		modifier: null
	},
	MediaPlay: {
		usbPage: 12,
		usb: 176,
		evdev: 207,
		xkb: 215,
		win: 0,
		mac: 65535,
		code: "MediaPlay",
		id: "MediaPlay",
		modifier: null
	},
	MediaRecord: {
		usbPage: 12,
		usb: 178,
		evdev: 167,
		xkb: 175,
		win: 0,
		mac: 65535,
		code: "MediaRecord",
		id: "MediaRecord",
		modifier: null
	},
	MediaFastForward: {
		usbPage: 12,
		usb: 179,
		evdev: 208,
		xkb: 216,
		win: 0,
		mac: 65535,
		code: "MediaFastForward",
		id: "MediaFastForward",
		modifier: null
	},
	MediaRewind: {
		usbPage: 12,
		usb: 180,
		evdev: 168,
		xkb: 176,
		win: 0,
		mac: 65535,
		code: "MediaRewind",
		id: "MediaRewind",
		modifier: null
	},
	MediaTrackNext: {
		usbPage: 12,
		usb: 181,
		evdev: 163,
		xkb: 171,
		win: 57369,
		mac: 65535,
		code: "MediaTrackNext",
		id: "MediaTrackNext",
		modifier: null
	},
	MediaTrackPrevious: {
		usbPage: 12,
		usb: 182,
		evdev: 165,
		xkb: 173,
		win: 57360,
		mac: 65535,
		code: "MediaTrackPrevious",
		id: "MediaTrackPrevious",
		modifier: null
	},
	MediaStop: {
		usbPage: 12,
		usb: 183,
		evdev: 166,
		xkb: 174,
		win: 57380,
		mac: 65535,
		code: "MediaStop",
		id: "MediaStop",
		modifier: null
	},
	Eject: {
		usbPage: 12,
		usb: 184,
		evdev: 161,
		xkb: 169,
		win: 57388,
		mac: 65535,
		code: "Eject",
		id: "Eject",
		modifier: null
	},
	MediaPlayPause: {
		usbPage: 12,
		usb: 205,
		evdev: 164,
		xkb: 172,
		win: 57378,
		mac: 65535,
		code: "MediaPlayPause",
		id: "MediaPlayPause",
		modifier: null
	},
	SpeechInputToggle: {
		usbPage: 12,
		usb: 207,
		evdev: 582,
		xkb: 590,
		win: 0,
		mac: 65535,
		code: null,
		id: "SpeechInputToggle",
		modifier: null
	},
	BassBoost: {
		usbPage: 12,
		usb: 229,
		evdev: 209,
		xkb: 217,
		win: 0,
		mac: 65535,
		code: null,
		id: "BassBoost",
		modifier: null
	},
	MediaSelect: {
		usbPage: 12,
		usb: 387,
		evdev: 171,
		xkb: 179,
		win: 57453,
		mac: 65535,
		code: "MediaSelect",
		id: "MediaSelect",
		modifier: null
	},
	LaunchWordProcessor: {
		usbPage: 12,
		usb: 388,
		evdev: 421,
		xkb: 429,
		win: 0,
		mac: 65535,
		code: null,
		id: "LaunchWordProcessor",
		modifier: null
	},
	LaunchSpreadsheet: {
		usbPage: 12,
		usb: 390,
		evdev: 423,
		xkb: 431,
		win: 0,
		mac: 65535,
		code: null,
		id: "LaunchSpreadsheet",
		modifier: null
	},
	LaunchMail: {
		usbPage: 12,
		usb: 394,
		evdev: 155,
		xkb: 163,
		win: 57452,
		mac: 65535,
		code: "LaunchMail",
		id: "LaunchMail",
		modifier: null
	},
	LaunchContacts: {
		usbPage: 12,
		usb: 397,
		evdev: 429,
		xkb: 437,
		win: 0,
		mac: 65535,
		code: null,
		id: "LaunchContacts",
		modifier: null
	},
	LaunchCalendar: {
		usbPage: 12,
		usb: 398,
		evdev: 397,
		xkb: 405,
		win: 0,
		mac: 65535,
		code: null,
		id: "LaunchCalendar",
		modifier: null
	},
	LaunchApp2: {
		usbPage: 12,
		usb: 402,
		evdev: 140,
		xkb: 148,
		win: 57377,
		mac: 65535,
		code: "LaunchApp2",
		id: "LaunchApp2",
		modifier: null
	},
	LaunchApp1: {
		usbPage: 12,
		usb: 404,
		evdev: 144,
		xkb: 152,
		win: 57451,
		mac: 65535,
		code: "LaunchApp1",
		id: "LaunchApp1",
		modifier: null
	},
	LaunchInternetBrowser: {
		usbPage: 12,
		usb: 406,
		evdev: 150,
		xkb: 158,
		win: 0,
		mac: 65535,
		code: null,
		id: "LaunchInternetBrowser",
		modifier: null
	},
	LogOff: {
		usbPage: 12,
		usb: 412,
		evdev: 433,
		xkb: 441,
		win: 0,
		mac: 65535,
		code: null,
		id: "LogOff",
		modifier: null
	},
	LockScreen: {
		usbPage: 12,
		usb: 414,
		evdev: 152,
		xkb: 160,
		win: 0,
		mac: 65535,
		code: null,
		id: "LockScreen",
		modifier: null
	},
	LaunchControlPanel: {
		usbPage: 12,
		usb: 415,
		evdev: 579,
		xkb: 587,
		win: 0,
		mac: 65535,
		code: "LaunchControlPanel",
		id: "LaunchControlPanel",
		modifier: null
	},
	SelectTask: {
		usbPage: 12,
		usb: 418,
		evdev: 580,
		xkb: 588,
		win: 0,
		mac: 65535,
		code: "SelectTask",
		id: "SelectTask",
		modifier: null
	},
	LaunchDocuments: {
		usbPage: 12,
		usb: 423,
		evdev: 235,
		xkb: 243,
		win: 0,
		mac: 65535,
		code: null,
		id: "LaunchDocuments",
		modifier: null
	},
	SpellCheck: {
		usbPage: 12,
		usb: 427,
		evdev: 432,
		xkb: 440,
		win: 0,
		mac: 65535,
		code: null,
		id: "SpellCheck",
		modifier: null
	},
	LaunchKeyboardLayout: {
		usbPage: 12,
		usb: 430,
		evdev: 374,
		xkb: 382,
		win: 0,
		mac: 65535,
		code: null,
		id: "LaunchKeyboardLayout",
		modifier: null
	},
	LaunchScreenSaver: {
		usbPage: 12,
		usb: 433,
		evdev: 581,
		xkb: 589,
		win: 0,
		mac: 65535,
		code: "LaunchScreenSaver",
		id: "LaunchScreenSaver",
		modifier: null
	},
	LaunchAssistant: {
		usbPage: 12,
		usb: 459,
		evdev: 583,
		xkb: 591,
		win: 0,
		mac: 65535,
		code: "LaunchAssistant",
		id: "LaunchAssistant",
		modifier: null
	},
	LaunchAudioBrowser: {
		usbPage: 12,
		usb: 439,
		evdev: 392,
		xkb: 400,
		win: 0,
		mac: 65535,
		code: null,
		id: "LaunchAudioBrowser",
		modifier: null
	},
	New: {
		usbPage: 12,
		usb: 513,
		evdev: 181,
		xkb: 189,
		win: 0,
		mac: 65535,
		code: null,
		id: "New",
		modifier: null
	},
	Close: {
		usbPage: 12,
		usb: 515,
		evdev: 206,
		xkb: 214,
		win: 0,
		mac: 65535,
		code: null,
		id: "Close",
		modifier: null
	},
	Save: {
		usbPage: 12,
		usb: 519,
		evdev: 234,
		xkb: 242,
		win: 0,
		mac: 65535,
		code: null,
		id: "Save",
		modifier: null
	},
	Print: {
		usbPage: 12,
		usb: 520,
		evdev: 210,
		xkb: 218,
		win: 0,
		mac: 65535,
		code: null,
		id: "Print",
		modifier: null
	},
	BrowserSearch: {
		usbPage: 12,
		usb: 545,
		evdev: 217,
		xkb: 225,
		win: 57445,
		mac: 65535,
		code: "BrowserSearch",
		id: "BrowserSearch",
		modifier: null
	},
	BrowserHome: {
		usbPage: 12,
		usb: 547,
		evdev: 172,
		xkb: 180,
		win: 57394,
		mac: 65535,
		code: "BrowserHome",
		id: "BrowserHome",
		modifier: null
	},
	BrowserBack: {
		usbPage: 12,
		usb: 548,
		evdev: 158,
		xkb: 166,
		win: 57450,
		mac: 65535,
		code: "BrowserBack",
		id: "BrowserBack",
		modifier: null
	},
	BrowserForward: {
		usbPage: 12,
		usb: 549,
		evdev: 159,
		xkb: 167,
		win: 57449,
		mac: 65535,
		code: "BrowserForward",
		id: "BrowserForward",
		modifier: null
	},
	BrowserStop: {
		usbPage: 12,
		usb: 550,
		evdev: 128,
		xkb: 136,
		win: 57448,
		mac: 65535,
		code: "BrowserStop",
		id: "BrowserStop",
		modifier: null
	},
	BrowserRefresh: {
		usbPage: 12,
		usb: 551,
		evdev: 173,
		xkb: 181,
		win: 57447,
		mac: 65535,
		code: "BrowserRefresh",
		id: "BrowserRefresh",
		modifier: null
	},
	BrowserFavorites: {
		usbPage: 12,
		usb: 554,
		evdev: 156,
		xkb: 164,
		win: 57446,
		mac: 65535,
		code: "BrowserFavorites",
		id: "BrowserFavorites",
		modifier: null
	},
	ZoomIn: {
		usbPage: 12,
		usb: 557,
		evdev: 418,
		xkb: 426,
		win: 0,
		mac: 65535,
		code: null,
		id: "ZoomIn",
		modifier: null
	},
	ZoomOut: {
		usbPage: 12,
		usb: 558,
		evdev: 419,
		xkb: 427,
		win: 0,
		mac: 65535,
		code: null,
		id: "ZoomOut",
		modifier: null
	},
	ZoomToggle: {
		usbPage: 12,
		usb: 562,
		evdev: 372,
		xkb: 380,
		win: 0,
		mac: 65535,
		code: "ZoomToggle",
		id: "ZoomToggle",
		modifier: null
	},
	Redo: {
		usbPage: 12,
		usb: 633,
		evdev: 182,
		xkb: 190,
		win: 0,
		mac: 65535,
		code: null,
		id: "Redo",
		modifier: null
	},
	MailReply: {
		usbPage: 12,
		usb: 649,
		evdev: 232,
		xkb: 240,
		win: 0,
		mac: 65535,
		code: "MailReply",
		id: "MailReply",
		modifier: null
	},
	MailForward: {
		usbPage: 12,
		usb: 651,
		evdev: 233,
		xkb: 241,
		win: 0,
		mac: 65535,
		code: "MailForward",
		id: "MailForward",
		modifier: null
	},
	MailSend: {
		usbPage: 12,
		usb: 652,
		evdev: 231,
		xkb: 239,
		win: 0,
		mac: 65535,
		code: "MailSend",
		id: "MailSend",
		modifier: null
	},
	KeyboardLayoutSelect: {
		usbPage: 12,
		usb: 669,
		evdev: 584,
		xkb: 592,
		win: 0,
		mac: 65535,
		code: "KeyboardLayoutSelect",
		id: "KeyboardLayoutSelect",
		modifier: null
	},
	ShowAllWindows: {
		usbPage: 12,
		usb: 671,
		evdev: 120,
		xkb: 128,
		win: 0,
		mac: 65535,
		code: "ShowAllWindows",
		id: "ShowAllWindows",
		modifier: null
	}
};
const keyMapsByUsb = {
	"0:0": keyMaps.None,
	"0:16": keyMaps.Hyper,
	"0:17": keyMaps.Super,
	"0:18": keyMaps.Fn,
	"0:19": keyMaps.FnLock,
	"0:20": keyMaps.Suspend,
	"0:21": keyMaps.Resume,
	"0:22": keyMaps.Turbo,
	"1:130": keyMaps.Sleep,
	"1:131": keyMaps.WakeUp,
	"1:181": keyMaps.DisplayToggleIntExt,
	"7:0": keyMaps.UsbReserved,
	"7:1": keyMaps.UsbErrorRollOver,
	"7:2": keyMaps.UsbPostFail,
	"7:3": keyMaps.UsbErrorUndefined,
	"7:4": keyMaps.UsA,
	"7:5": keyMaps.UsB,
	"7:6": keyMaps.UsC,
	"7:7": keyMaps.UsD,
	"7:8": keyMaps.UsE,
	"7:9": keyMaps.UsF,
	"7:10": keyMaps.UsG,
	"7:11": keyMaps.UsH,
	"7:12": keyMaps.UsI,
	"7:13": keyMaps.UsJ,
	"7:14": keyMaps.UsK,
	"7:15": keyMaps.UsL,
	"7:16": keyMaps.UsM,
	"7:17": keyMaps.UsN,
	"7:18": keyMaps.UsO,
	"7:19": keyMaps.UsP,
	"7:20": keyMaps.UsQ,
	"7:21": keyMaps.UsR,
	"7:22": keyMaps.UsS,
	"7:23": keyMaps.UsT,
	"7:24": keyMaps.UsU,
	"7:25": keyMaps.UsV,
	"7:26": keyMaps.UsW,
	"7:27": keyMaps.UsX,
	"7:28": keyMaps.UsY,
	"7:29": keyMaps.UsZ,
	"7:30": keyMaps.Digit1,
	"7:31": keyMaps.Digit2,
	"7:32": keyMaps.Digit3,
	"7:33": keyMaps.Digit4,
	"7:34": keyMaps.Digit5,
	"7:35": keyMaps.Digit6,
	"7:36": keyMaps.Digit7,
	"7:37": keyMaps.Digit8,
	"7:38": keyMaps.Digit9,
	"7:39": keyMaps.Digit0,
	"7:40": keyMaps.Enter,
	"7:41": keyMaps.Escape,
	"7:42": keyMaps.Backspace,
	"7:43": keyMaps.Tab,
	"7:44": keyMaps.Space,
	"7:45": keyMaps.Minus,
	"7:46": keyMaps.Equal,
	"7:47": keyMaps.BracketLeft,
	"7:48": keyMaps.BracketRight,
	"7:49": keyMaps.Backslash,
	"7:50": keyMaps.IntlHash,
	"7:51": keyMaps.Semicolon,
	"7:52": keyMaps.Quote,
	"7:53": keyMaps.Backquote,
	"7:54": keyMaps.Comma,
	"7:55": keyMaps.Period,
	"7:56": keyMaps.Slash,
	"7:57": keyMaps.CapsLock,
	"7:58": keyMaps.F1,
	"7:59": keyMaps.F2,
	"7:60": keyMaps.F3,
	"7:61": keyMaps.F4,
	"7:62": keyMaps.F5,
	"7:63": keyMaps.F6,
	"7:64": keyMaps.F7,
	"7:65": keyMaps.F8,
	"7:66": keyMaps.F9,
	"7:67": keyMaps.F10,
	"7:68": keyMaps.F11,
	"7:69": keyMaps.F12,
	"7:70": keyMaps.PrintScreen,
	"7:71": keyMaps.ScrollLock,
	"7:72": keyMaps.Pause,
	"7:73": keyMaps.Insert,
	"7:74": keyMaps.Home,
	"7:75": keyMaps.PageUp,
	"7:76": keyMaps.Del,
	"7:77": keyMaps.End,
	"7:78": keyMaps.PageDown,
	"7:79": keyMaps.ArrowRight,
	"7:80": keyMaps.ArrowLeft,
	"7:81": keyMaps.ArrowDown,
	"7:82": keyMaps.ArrowUp,
	"7:83": keyMaps.NumLock,
	"7:84": keyMaps.NumpadDivide,
	"7:85": keyMaps.NumpadMultiply,
	"7:86": keyMaps.NumpadSubtract,
	"7:87": keyMaps.NumpadAdd,
	"7:88": keyMaps.NumpadEnter,
	"7:89": keyMaps.Numpad1,
	"7:90": keyMaps.Numpad2,
	"7:91": keyMaps.Numpad3,
	"7:92": keyMaps.Numpad4,
	"7:93": keyMaps.Numpad5,
	"7:94": keyMaps.Numpad6,
	"7:95": keyMaps.Numpad7,
	"7:96": keyMaps.Numpad8,
	"7:97": keyMaps.Numpad9,
	"7:98": keyMaps.Numpad0,
	"7:99": keyMaps.NumpadDecimal,
	"7:100": keyMaps.IntlBackslash,
	"7:101": keyMaps.ContextMenu,
	"7:102": keyMaps.Power,
	"7:103": keyMaps.NumpadEqual,
	"7:104": keyMaps.F13,
	"7:105": keyMaps.F14,
	"7:106": keyMaps.F15,
	"7:107": keyMaps.F16,
	"7:108": keyMaps.F17,
	"7:109": keyMaps.F18,
	"7:110": keyMaps.F19,
	"7:111": keyMaps.F20,
	"7:112": keyMaps.F21,
	"7:113": keyMaps.F22,
	"7:114": keyMaps.F23,
	"7:115": keyMaps.F24,
	"7:116": keyMaps.Open,
	"7:117": keyMaps.Help,
	"7:119": keyMaps.Select,
	"7:121": keyMaps.Again,
	"7:122": keyMaps.Undo,
	"7:123": keyMaps.Cut,
	"7:124": keyMaps.Copy,
	"7:125": keyMaps.Paste,
	"7:126": keyMaps.Find,
	"7:127": keyMaps.VolumeMute,
	"7:128": keyMaps.VolumeUp,
	"7:129": keyMaps.VolumeDown,
	"7:133": keyMaps.NumpadComma,
	"7:135": keyMaps.IntlRo,
	"7:136": keyMaps.KanaMode,
	"7:137": keyMaps.IntlYen,
	"7:138": keyMaps.Convert,
	"7:139": keyMaps.NonConvert,
	"7:144": keyMaps.Lang1,
	"7:145": keyMaps.Lang2,
	"7:146": keyMaps.Lang3,
	"7:147": keyMaps.Lang4,
	"7:148": keyMaps.Lang5,
	"7:155": keyMaps.Abort,
	"7:163": keyMaps.Props,
	"7:182": keyMaps.NumpadParenLeft,
	"7:183": keyMaps.NumpadParenRight,
	"7:187": keyMaps.NumpadBackspace,
	"7:208": keyMaps.NumpadMemoryStore,
	"7:209": keyMaps.NumpadMemoryRecall,
	"7:210": keyMaps.NumpadMemoryClear,
	"7:211": keyMaps.NumpadMemoryAdd,
	"7:212": keyMaps.NumpadMemorySubtract,
	"7:215": keyMaps.NumpadSignChange,
	"7:216": keyMaps.NumpadClear,
	"7:217": keyMaps.NumpadClearEntry,
	"7:224": keyMaps.ControlLeft,
	"7:225": keyMaps.ShiftLeft,
	"7:226": keyMaps.AltLeft,
	"7:227": keyMaps.MetaLeft,
	"7:228": keyMaps.ControlRight,
	"7:229": keyMaps.ShiftRight,
	"7:230": keyMaps.AltRight,
	"7:231": keyMaps.MetaRight,
	"12:96": keyMaps.Info,
	"12:97": keyMaps.ClosedCaptionToggle,
	"12:111": keyMaps.BrightnessUp,
	"12:112": keyMaps.BrightnessDown,
	"12:114": keyMaps.BrightnessToggle,
	"12:115": keyMaps.BrightnessMinimium,
	"12:116": keyMaps.BrightnessMaximum,
	"12:117": keyMaps.BrightnessAuto,
	"12:131": keyMaps.MediaLast,
	"12:140": keyMaps.LaunchPhone,
	"12:141": keyMaps.ProgramGuide,
	"12:148": keyMaps.Exit,
	"12:156": keyMaps.ChannelUp,
	"12:157": keyMaps.ChannelDown,
	"12:176": keyMaps.MediaPlay,
	"12:178": keyMaps.MediaRecord,
	"12:179": keyMaps.MediaFastForward,
	"12:180": keyMaps.MediaRewind,
	"12:181": keyMaps.MediaTrackNext,
	"12:182": keyMaps.MediaTrackPrevious,
	"12:183": keyMaps.MediaStop,
	"12:184": keyMaps.Eject,
	"12:205": keyMaps.MediaPlayPause,
	"12:207": keyMaps.SpeechInputToggle,
	"12:229": keyMaps.BassBoost,
	"12:387": keyMaps.MediaSelect,
	"12:388": keyMaps.LaunchWordProcessor,
	"12:390": keyMaps.LaunchSpreadsheet,
	"12:394": keyMaps.LaunchMail,
	"12:397": keyMaps.LaunchContacts,
	"12:398": keyMaps.LaunchCalendar,
	"12:402": keyMaps.LaunchApp2,
	"12:404": keyMaps.LaunchApp1,
	"12:406": keyMaps.LaunchInternetBrowser,
	"12:412": keyMaps.LogOff,
	"12:414": keyMaps.LockScreen,
	"12:415": keyMaps.LaunchControlPanel,
	"12:418": keyMaps.SelectTask,
	"12:423": keyMaps.LaunchDocuments,
	"12:427": keyMaps.SpellCheck,
	"12:430": keyMaps.LaunchKeyboardLayout,
	"12:433": keyMaps.LaunchScreenSaver,
	"12:459": keyMaps.LaunchAssistant,
	"12:439": keyMaps.LaunchAudioBrowser,
	"12:513": keyMaps.New,
	"12:515": keyMaps.Close,
	"12:519": keyMaps.Save,
	"12:520": keyMaps.Print,
	"12:545": keyMaps.BrowserSearch,
	"12:547": keyMaps.BrowserHome,
	"12:548": keyMaps.BrowserBack,
	"12:549": keyMaps.BrowserForward,
	"12:550": keyMaps.BrowserStop,
	"12:551": keyMaps.BrowserRefresh,
	"12:554": keyMaps.BrowserFavorites,
	"12:557": keyMaps.ZoomIn,
	"12:558": keyMaps.ZoomOut,
	"12:562": keyMaps.ZoomToggle,
	"12:633": keyMaps.Redo,
	"12:649": keyMaps.MailReply,
	"12:651": keyMaps.MailForward,
	"12:652": keyMaps.MailSend,
	"12:669": keyMaps.KeyboardLayoutSelect,
	"12:671": keyMaps.ShowAllWindows
};
const keyMapsByEvdev = {
	"0": keyMaps.None,
	"142": keyMaps.Sleep,
	"143": keyMaps.WakeUp,
	"227": keyMaps.DisplayToggleIntExt,
	"30": keyMaps.UsA,
	"48": keyMaps.UsB,
	"46": keyMaps.UsC,
	"32": keyMaps.UsD,
	"18": keyMaps.UsE,
	"33": keyMaps.UsF,
	"34": keyMaps.UsG,
	"35": keyMaps.UsH,
	"23": keyMaps.UsI,
	"36": keyMaps.UsJ,
	"37": keyMaps.UsK,
	"38": keyMaps.UsL,
	"50": keyMaps.UsM,
	"49": keyMaps.UsN,
	"24": keyMaps.UsO,
	"25": keyMaps.UsP,
	"16": keyMaps.UsQ,
	"19": keyMaps.UsR,
	"31": keyMaps.UsS,
	"20": keyMaps.UsT,
	"22": keyMaps.UsU,
	"47": keyMaps.UsV,
	"17": keyMaps.UsW,
	"45": keyMaps.UsX,
	"21": keyMaps.UsY,
	"44": keyMaps.UsZ,
	"2": keyMaps.Digit1,
	"3": keyMaps.Digit2,
	"4": keyMaps.Digit3,
	"5": keyMaps.Digit4,
	"6": keyMaps.Digit5,
	"7": keyMaps.Digit6,
	"8": keyMaps.Digit7,
	"9": keyMaps.Digit8,
	"10": keyMaps.Digit9,
	"11": keyMaps.Digit0,
	"28": keyMaps.Enter,
	"1": keyMaps.Escape,
	"14": keyMaps.Backspace,
	"15": keyMaps.Tab,
	"57": keyMaps.Space,
	"12": keyMaps.Minus,
	"13": keyMaps.Equal,
	"26": keyMaps.BracketLeft,
	"27": keyMaps.BracketRight,
	"43": keyMaps.Backslash,
	"39": keyMaps.Semicolon,
	"40": keyMaps.Quote,
	"41": keyMaps.Backquote,
	"51": keyMaps.Comma,
	"52": keyMaps.Period,
	"53": keyMaps.Slash,
	"58": keyMaps.CapsLock,
	"59": keyMaps.F1,
	"60": keyMaps.F2,
	"61": keyMaps.F3,
	"62": keyMaps.F4,
	"63": keyMaps.F5,
	"64": keyMaps.F6,
	"65": keyMaps.F7,
	"66": keyMaps.F8,
	"67": keyMaps.F9,
	"68": keyMaps.F10,
	"87": keyMaps.F11,
	"88": keyMaps.F12,
	"99": keyMaps.PrintScreen,
	"70": keyMaps.ScrollLock,
	"119": keyMaps.Pause,
	"110": keyMaps.Insert,
	"102": keyMaps.Home,
	"104": keyMaps.PageUp,
	"111": keyMaps.Del,
	"107": keyMaps.End,
	"109": keyMaps.PageDown,
	"106": keyMaps.ArrowRight,
	"105": keyMaps.ArrowLeft,
	"108": keyMaps.ArrowDown,
	"103": keyMaps.ArrowUp,
	"69": keyMaps.NumLock,
	"98": keyMaps.NumpadDivide,
	"55": keyMaps.NumpadMultiply,
	"74": keyMaps.NumpadSubtract,
	"78": keyMaps.NumpadAdd,
	"96": keyMaps.NumpadEnter,
	"79": keyMaps.Numpad1,
	"80": keyMaps.Numpad2,
	"81": keyMaps.Numpad3,
	"75": keyMaps.Numpad4,
	"76": keyMaps.Numpad5,
	"77": keyMaps.Numpad6,
	"71": keyMaps.Numpad7,
	"72": keyMaps.Numpad8,
	"73": keyMaps.Numpad9,
	"82": keyMaps.Numpad0,
	"83": keyMaps.NumpadDecimal,
	"86": keyMaps.IntlBackslash,
	"127": keyMaps.ContextMenu,
	"116": keyMaps.Power,
	"117": keyMaps.NumpadEqual,
	"183": keyMaps.F13,
	"184": keyMaps.F14,
	"185": keyMaps.F15,
	"186": keyMaps.F16,
	"187": keyMaps.F17,
	"188": keyMaps.F18,
	"189": keyMaps.F19,
	"190": keyMaps.F20,
	"191": keyMaps.F21,
	"192": keyMaps.F22,
	"193": keyMaps.F23,
	"194": keyMaps.F24,
	"134": keyMaps.Open,
	"138": keyMaps.Help,
	"132": keyMaps.Select,
	"129": keyMaps.Again,
	"131": keyMaps.Undo,
	"137": keyMaps.Cut,
	"133": keyMaps.Copy,
	"135": keyMaps.Paste,
	"136": keyMaps.Find,
	"113": keyMaps.VolumeMute,
	"115": keyMaps.VolumeUp,
	"114": keyMaps.VolumeDown,
	"121": keyMaps.NumpadComma,
	"89": keyMaps.IntlRo,
	"93": keyMaps.KanaMode,
	"124": keyMaps.IntlYen,
	"92": keyMaps.Convert,
	"94": keyMaps.NonConvert,
	"122": keyMaps.Lang1,
	"123": keyMaps.Lang2,
	"90": keyMaps.Lang3,
	"91": keyMaps.Lang4,
	"85": keyMaps.Lang5,
	"179": keyMaps.NumpadParenLeft,
	"180": keyMaps.NumpadParenRight,
	"118": keyMaps.NumpadSignChange,
	"29": keyMaps.ControlLeft,
	"42": keyMaps.ShiftLeft,
	"56": keyMaps.AltLeft,
	"125": keyMaps.MetaLeft,
	"97": keyMaps.ControlRight,
	"54": keyMaps.ShiftRight,
	"100": keyMaps.AltRight,
	"126": keyMaps.MetaRight,
	"358": keyMaps.Info,
	"370": keyMaps.ClosedCaptionToggle,
	"225": keyMaps.BrightnessUp,
	"224": keyMaps.BrightnessDown,
	"431": keyMaps.BrightnessToggle,
	"592": keyMaps.BrightnessMinimium,
	"593": keyMaps.BrightnessMaximum,
	"244": keyMaps.BrightnessAuto,
	"405": keyMaps.MediaLast,
	"169": keyMaps.LaunchPhone,
	"362": keyMaps.ProgramGuide,
	"174": keyMaps.Exit,
	"410": keyMaps.ChannelUp,
	"411": keyMaps.ChannelDown,
	"207": keyMaps.MediaPlay,
	"167": keyMaps.MediaRecord,
	"208": keyMaps.MediaFastForward,
	"168": keyMaps.MediaRewind,
	"163": keyMaps.MediaTrackNext,
	"165": keyMaps.MediaTrackPrevious,
	"166": keyMaps.MediaStop,
	"161": keyMaps.Eject,
	"164": keyMaps.MediaPlayPause,
	"582": keyMaps.SpeechInputToggle,
	"209": keyMaps.BassBoost,
	"171": keyMaps.MediaSelect,
	"421": keyMaps.LaunchWordProcessor,
	"423": keyMaps.LaunchSpreadsheet,
	"155": keyMaps.LaunchMail,
	"429": keyMaps.LaunchContacts,
	"397": keyMaps.LaunchCalendar,
	"140": keyMaps.LaunchApp2,
	"144": keyMaps.LaunchApp1,
	"150": keyMaps.LaunchInternetBrowser,
	"433": keyMaps.LogOff,
	"152": keyMaps.LockScreen,
	"579": keyMaps.LaunchControlPanel,
	"580": keyMaps.SelectTask,
	"235": keyMaps.LaunchDocuments,
	"432": keyMaps.SpellCheck,
	"374": keyMaps.LaunchKeyboardLayout,
	"581": keyMaps.LaunchScreenSaver,
	"583": keyMaps.LaunchAssistant,
	"392": keyMaps.LaunchAudioBrowser,
	"181": keyMaps.New,
	"206": keyMaps.Close,
	"234": keyMaps.Save,
	"210": keyMaps.Print,
	"217": keyMaps.BrowserSearch,
	"172": keyMaps.BrowserHome,
	"158": keyMaps.BrowserBack,
	"159": keyMaps.BrowserForward,
	"128": keyMaps.BrowserStop,
	"173": keyMaps.BrowserRefresh,
	"156": keyMaps.BrowserFavorites,
	"418": keyMaps.ZoomIn,
	"419": keyMaps.ZoomOut,
	"372": keyMaps.ZoomToggle,
	"182": keyMaps.Redo,
	"232": keyMaps.MailReply,
	"233": keyMaps.MailForward,
	"231": keyMaps.MailSend,
	"584": keyMaps.KeyboardLayoutSelect,
	"120": keyMaps.ShowAllWindows
};
const keyMapsByXkb = {
	"0": keyMaps.None,
	"150": keyMaps.Sleep,
	"151": keyMaps.WakeUp,
	"235": keyMaps.DisplayToggleIntExt,
	"38": keyMaps.UsA,
	"56": keyMaps.UsB,
	"54": keyMaps.UsC,
	"40": keyMaps.UsD,
	"26": keyMaps.UsE,
	"41": keyMaps.UsF,
	"42": keyMaps.UsG,
	"43": keyMaps.UsH,
	"31": keyMaps.UsI,
	"44": keyMaps.UsJ,
	"45": keyMaps.UsK,
	"46": keyMaps.UsL,
	"58": keyMaps.UsM,
	"57": keyMaps.UsN,
	"32": keyMaps.UsO,
	"33": keyMaps.UsP,
	"24": keyMaps.UsQ,
	"27": keyMaps.UsR,
	"39": keyMaps.UsS,
	"28": keyMaps.UsT,
	"30": keyMaps.UsU,
	"55": keyMaps.UsV,
	"25": keyMaps.UsW,
	"53": keyMaps.UsX,
	"29": keyMaps.UsY,
	"52": keyMaps.UsZ,
	"10": keyMaps.Digit1,
	"11": keyMaps.Digit2,
	"12": keyMaps.Digit3,
	"13": keyMaps.Digit4,
	"14": keyMaps.Digit5,
	"15": keyMaps.Digit6,
	"16": keyMaps.Digit7,
	"17": keyMaps.Digit8,
	"18": keyMaps.Digit9,
	"19": keyMaps.Digit0,
	"36": keyMaps.Enter,
	"9": keyMaps.Escape,
	"22": keyMaps.Backspace,
	"23": keyMaps.Tab,
	"65": keyMaps.Space,
	"20": keyMaps.Minus,
	"21": keyMaps.Equal,
	"34": keyMaps.BracketLeft,
	"35": keyMaps.BracketRight,
	"51": keyMaps.Backslash,
	"47": keyMaps.Semicolon,
	"48": keyMaps.Quote,
	"49": keyMaps.Backquote,
	"59": keyMaps.Comma,
	"60": keyMaps.Period,
	"61": keyMaps.Slash,
	"66": keyMaps.CapsLock,
	"67": keyMaps.F1,
	"68": keyMaps.F2,
	"69": keyMaps.F3,
	"70": keyMaps.F4,
	"71": keyMaps.F5,
	"72": keyMaps.F6,
	"73": keyMaps.F7,
	"74": keyMaps.F8,
	"75": keyMaps.F9,
	"76": keyMaps.F10,
	"95": keyMaps.F11,
	"96": keyMaps.F12,
	"107": keyMaps.PrintScreen,
	"78": keyMaps.ScrollLock,
	"127": keyMaps.Pause,
	"118": keyMaps.Insert,
	"110": keyMaps.Home,
	"112": keyMaps.PageUp,
	"119": keyMaps.Del,
	"115": keyMaps.End,
	"117": keyMaps.PageDown,
	"114": keyMaps.ArrowRight,
	"113": keyMaps.ArrowLeft,
	"116": keyMaps.ArrowDown,
	"111": keyMaps.ArrowUp,
	"77": keyMaps.NumLock,
	"106": keyMaps.NumpadDivide,
	"63": keyMaps.NumpadMultiply,
	"82": keyMaps.NumpadSubtract,
	"86": keyMaps.NumpadAdd,
	"104": keyMaps.NumpadEnter,
	"87": keyMaps.Numpad1,
	"88": keyMaps.Numpad2,
	"89": keyMaps.Numpad3,
	"83": keyMaps.Numpad4,
	"84": keyMaps.Numpad5,
	"85": keyMaps.Numpad6,
	"79": keyMaps.Numpad7,
	"80": keyMaps.Numpad8,
	"81": keyMaps.Numpad9,
	"90": keyMaps.Numpad0,
	"91": keyMaps.NumpadDecimal,
	"94": keyMaps.IntlBackslash,
	"135": keyMaps.ContextMenu,
	"124": keyMaps.Power,
	"125": keyMaps.NumpadEqual,
	"191": keyMaps.F13,
	"192": keyMaps.F14,
	"193": keyMaps.F15,
	"194": keyMaps.F16,
	"195": keyMaps.F17,
	"196": keyMaps.F18,
	"197": keyMaps.F19,
	"198": keyMaps.F20,
	"199": keyMaps.F21,
	"200": keyMaps.F22,
	"201": keyMaps.F23,
	"202": keyMaps.F24,
	"142": keyMaps.Open,
	"146": keyMaps.Help,
	"140": keyMaps.Select,
	"137": keyMaps.Again,
	"139": keyMaps.Undo,
	"145": keyMaps.Cut,
	"141": keyMaps.Copy,
	"143": keyMaps.Paste,
	"144": keyMaps.Find,
	"121": keyMaps.VolumeMute,
	"123": keyMaps.VolumeUp,
	"122": keyMaps.VolumeDown,
	"129": keyMaps.NumpadComma,
	"97": keyMaps.IntlRo,
	"101": keyMaps.KanaMode,
	"132": keyMaps.IntlYen,
	"100": keyMaps.Convert,
	"102": keyMaps.NonConvert,
	"130": keyMaps.Lang1,
	"131": keyMaps.Lang2,
	"98": keyMaps.Lang3,
	"99": keyMaps.Lang4,
	"93": keyMaps.Lang5,
	"187": keyMaps.NumpadParenLeft,
	"188": keyMaps.NumpadParenRight,
	"126": keyMaps.NumpadSignChange,
	"37": keyMaps.ControlLeft,
	"50": keyMaps.ShiftLeft,
	"64": keyMaps.AltLeft,
	"133": keyMaps.MetaLeft,
	"105": keyMaps.ControlRight,
	"62": keyMaps.ShiftRight,
	"108": keyMaps.AltRight,
	"134": keyMaps.MetaRight,
	"366": keyMaps.Info,
	"378": keyMaps.ClosedCaptionToggle,
	"233": keyMaps.BrightnessUp,
	"232": keyMaps.BrightnessDown,
	"439": keyMaps.BrightnessToggle,
	"600": keyMaps.BrightnessMinimium,
	"601": keyMaps.BrightnessMaximum,
	"252": keyMaps.BrightnessAuto,
	"413": keyMaps.MediaLast,
	"177": keyMaps.LaunchPhone,
	"370": keyMaps.ProgramGuide,
	"182": keyMaps.Exit,
	"418": keyMaps.ChannelUp,
	"419": keyMaps.ChannelDown,
	"215": keyMaps.MediaPlay,
	"175": keyMaps.MediaRecord,
	"216": keyMaps.MediaFastForward,
	"176": keyMaps.MediaRewind,
	"171": keyMaps.MediaTrackNext,
	"173": keyMaps.MediaTrackPrevious,
	"174": keyMaps.MediaStop,
	"169": keyMaps.Eject,
	"172": keyMaps.MediaPlayPause,
	"590": keyMaps.SpeechInputToggle,
	"217": keyMaps.BassBoost,
	"179": keyMaps.MediaSelect,
	"429": keyMaps.LaunchWordProcessor,
	"431": keyMaps.LaunchSpreadsheet,
	"163": keyMaps.LaunchMail,
	"437": keyMaps.LaunchContacts,
	"405": keyMaps.LaunchCalendar,
	"148": keyMaps.LaunchApp2,
	"152": keyMaps.LaunchApp1,
	"158": keyMaps.LaunchInternetBrowser,
	"441": keyMaps.LogOff,
	"160": keyMaps.LockScreen,
	"587": keyMaps.LaunchControlPanel,
	"588": keyMaps.SelectTask,
	"243": keyMaps.LaunchDocuments,
	"440": keyMaps.SpellCheck,
	"382": keyMaps.LaunchKeyboardLayout,
	"589": keyMaps.LaunchScreenSaver,
	"591": keyMaps.LaunchAssistant,
	"400": keyMaps.LaunchAudioBrowser,
	"189": keyMaps.New,
	"214": keyMaps.Close,
	"242": keyMaps.Save,
	"218": keyMaps.Print,
	"225": keyMaps.BrowserSearch,
	"180": keyMaps.BrowserHome,
	"166": keyMaps.BrowserBack,
	"167": keyMaps.BrowserForward,
	"136": keyMaps.BrowserStop,
	"181": keyMaps.BrowserRefresh,
	"164": keyMaps.BrowserFavorites,
	"426": keyMaps.ZoomIn,
	"427": keyMaps.ZoomOut,
	"380": keyMaps.ZoomToggle,
	"190": keyMaps.Redo,
	"240": keyMaps.MailReply,
	"241": keyMaps.MailForward,
	"239": keyMaps.MailSend,
	"592": keyMaps.KeyboardLayoutSelect,
	"128": keyMaps.ShowAllWindows
};
const keyMapsByWin = {
	"0": keyMaps.None,
	"57439": keyMaps.Sleep,
	"57443": keyMaps.WakeUp,
	"255": keyMaps.UsbErrorRollOver,
	"252": keyMaps.UsbPostFail,
	"30": keyMaps.UsA,
	"48": keyMaps.UsB,
	"46": keyMaps.UsC,
	"32": keyMaps.UsD,
	"18": keyMaps.UsE,
	"33": keyMaps.UsF,
	"34": keyMaps.UsG,
	"35": keyMaps.UsH,
	"23": keyMaps.UsI,
	"36": keyMaps.UsJ,
	"37": keyMaps.UsK,
	"38": keyMaps.UsL,
	"50": keyMaps.UsM,
	"49": keyMaps.UsN,
	"24": keyMaps.UsO,
	"25": keyMaps.UsP,
	"16": keyMaps.UsQ,
	"19": keyMaps.UsR,
	"31": keyMaps.UsS,
	"20": keyMaps.UsT,
	"22": keyMaps.UsU,
	"47": keyMaps.UsV,
	"17": keyMaps.UsW,
	"45": keyMaps.UsX,
	"21": keyMaps.UsY,
	"44": keyMaps.UsZ,
	"2": keyMaps.Digit1,
	"3": keyMaps.Digit2,
	"4": keyMaps.Digit3,
	"5": keyMaps.Digit4,
	"6": keyMaps.Digit5,
	"7": keyMaps.Digit6,
	"8": keyMaps.Digit7,
	"9": keyMaps.Digit8,
	"10": keyMaps.Digit9,
	"11": keyMaps.Digit0,
	"28": keyMaps.Enter,
	"1": keyMaps.Escape,
	"14": keyMaps.Backspace,
	"15": keyMaps.Tab,
	"57": keyMaps.Space,
	"12": keyMaps.Minus,
	"13": keyMaps.Equal,
	"26": keyMaps.BracketLeft,
	"27": keyMaps.BracketRight,
	"43": keyMaps.Backslash,
	"39": keyMaps.Semicolon,
	"40": keyMaps.Quote,
	"41": keyMaps.Backquote,
	"51": keyMaps.Comma,
	"52": keyMaps.Period,
	"53": keyMaps.Slash,
	"58": keyMaps.CapsLock,
	"59": keyMaps.F1,
	"60": keyMaps.F2,
	"61": keyMaps.F3,
	"62": keyMaps.F4,
	"63": keyMaps.F5,
	"64": keyMaps.F6,
	"65": keyMaps.F7,
	"66": keyMaps.F8,
	"67": keyMaps.F9,
	"68": keyMaps.F10,
	"87": keyMaps.F11,
	"88": keyMaps.F12,
	"57399": keyMaps.PrintScreen,
	"70": keyMaps.ScrollLock,
	"69": keyMaps.Pause,
	"57426": keyMaps.Insert,
	"57415": keyMaps.Home,
	"57417": keyMaps.PageUp,
	"57427": keyMaps.Del,
	"57423": keyMaps.End,
	"57425": keyMaps.PageDown,
	"57421": keyMaps.ArrowRight,
	"57419": keyMaps.ArrowLeft,
	"57424": keyMaps.ArrowDown,
	"57416": keyMaps.ArrowUp,
	"57413": keyMaps.NumLock,
	"57397": keyMaps.NumpadDivide,
	"55": keyMaps.NumpadMultiply,
	"74": keyMaps.NumpadSubtract,
	"78": keyMaps.NumpadAdd,
	"57372": keyMaps.NumpadEnter,
	"79": keyMaps.Numpad1,
	"80": keyMaps.Numpad2,
	"81": keyMaps.Numpad3,
	"75": keyMaps.Numpad4,
	"76": keyMaps.Numpad5,
	"77": keyMaps.Numpad6,
	"71": keyMaps.Numpad7,
	"72": keyMaps.Numpad8,
	"73": keyMaps.Numpad9,
	"82": keyMaps.Numpad0,
	"83": keyMaps.NumpadDecimal,
	"86": keyMaps.IntlBackslash,
	"57437": keyMaps.ContextMenu,
	"57438": keyMaps.Power,
	"89": keyMaps.NumpadEqual,
	"100": keyMaps.F13,
	"101": keyMaps.F14,
	"102": keyMaps.F15,
	"103": keyMaps.F16,
	"104": keyMaps.F17,
	"105": keyMaps.F18,
	"106": keyMaps.F19,
	"107": keyMaps.F20,
	"108": keyMaps.F21,
	"109": keyMaps.F22,
	"110": keyMaps.F23,
	"118": keyMaps.F24,
	"57403": keyMaps.Help,
	"57352": keyMaps.Undo,
	"57367": keyMaps.Cut,
	"57368": keyMaps.Copy,
	"57354": keyMaps.Paste,
	"57376": keyMaps.VolumeMute,
	"57392": keyMaps.VolumeUp,
	"57390": keyMaps.VolumeDown,
	"126": keyMaps.NumpadComma,
	"115": keyMaps.IntlRo,
	"112": keyMaps.KanaMode,
	"125": keyMaps.IntlYen,
	"121": keyMaps.Convert,
	"123": keyMaps.NonConvert,
	"114": keyMaps.Lang1,
	"113": keyMaps.Lang2,
	"120": keyMaps.Lang3,
	"119": keyMaps.Lang4,
	"29": keyMaps.ControlLeft,
	"42": keyMaps.ShiftLeft,
	"56": keyMaps.AltLeft,
	"57435": keyMaps.MetaLeft,
	"57373": keyMaps.ControlRight,
	"54": keyMaps.ShiftRight,
	"57400": keyMaps.AltRight,
	"57436": keyMaps.MetaRight,
	"57369": keyMaps.MediaTrackNext,
	"57360": keyMaps.MediaTrackPrevious,
	"57380": keyMaps.MediaStop,
	"57388": keyMaps.Eject,
	"57378": keyMaps.MediaPlayPause,
	"57453": keyMaps.MediaSelect,
	"57452": keyMaps.LaunchMail,
	"57377": keyMaps.LaunchApp2,
	"57451": keyMaps.LaunchApp1,
	"57445": keyMaps.BrowserSearch,
	"57394": keyMaps.BrowserHome,
	"57450": keyMaps.BrowserBack,
	"57449": keyMaps.BrowserForward,
	"57448": keyMaps.BrowserStop,
	"57447": keyMaps.BrowserRefresh,
	"57446": keyMaps.BrowserFavorites
};
const keyMapsByMac = {
	"65535": keyMaps.None,
	"0": keyMaps.UsA,
	"11": keyMaps.UsB,
	"8": keyMaps.UsC,
	"2": keyMaps.UsD,
	"14": keyMaps.UsE,
	"3": keyMaps.UsF,
	"5": keyMaps.UsG,
	"4": keyMaps.UsH,
	"34": keyMaps.UsI,
	"38": keyMaps.UsJ,
	"40": keyMaps.UsK,
	"37": keyMaps.UsL,
	"46": keyMaps.UsM,
	"45": keyMaps.UsN,
	"31": keyMaps.UsO,
	"35": keyMaps.UsP,
	"12": keyMaps.UsQ,
	"15": keyMaps.UsR,
	"1": keyMaps.UsS,
	"17": keyMaps.UsT,
	"32": keyMaps.UsU,
	"9": keyMaps.UsV,
	"13": keyMaps.UsW,
	"7": keyMaps.UsX,
	"16": keyMaps.UsY,
	"6": keyMaps.UsZ,
	"18": keyMaps.Digit1,
	"19": keyMaps.Digit2,
	"20": keyMaps.Digit3,
	"21": keyMaps.Digit4,
	"23": keyMaps.Digit5,
	"22": keyMaps.Digit6,
	"26": keyMaps.Digit7,
	"28": keyMaps.Digit8,
	"25": keyMaps.Digit9,
	"29": keyMaps.Digit0,
	"36": keyMaps.Enter,
	"53": keyMaps.Escape,
	"51": keyMaps.Backspace,
	"48": keyMaps.Tab,
	"49": keyMaps.Space,
	"27": keyMaps.Minus,
	"24": keyMaps.Equal,
	"33": keyMaps.BracketLeft,
	"30": keyMaps.BracketRight,
	"42": keyMaps.Backslash,
	"41": keyMaps.Semicolon,
	"39": keyMaps.Quote,
	"50": keyMaps.Backquote,
	"43": keyMaps.Comma,
	"47": keyMaps.Period,
	"44": keyMaps.Slash,
	"57": keyMaps.CapsLock,
	"122": keyMaps.F1,
	"120": keyMaps.F2,
	"99": keyMaps.F3,
	"118": keyMaps.F4,
	"96": keyMaps.F5,
	"97": keyMaps.F6,
	"98": keyMaps.F7,
	"100": keyMaps.F8,
	"101": keyMaps.F9,
	"109": keyMaps.F10,
	"103": keyMaps.F11,
	"111": keyMaps.F12,
	"114": keyMaps.Insert,
	"115": keyMaps.Home,
	"116": keyMaps.PageUp,
	"117": keyMaps.Del,
	"119": keyMaps.End,
	"121": keyMaps.PageDown,
	"124": keyMaps.ArrowRight,
	"123": keyMaps.ArrowLeft,
	"125": keyMaps.ArrowDown,
	"126": keyMaps.ArrowUp,
	"71": keyMaps.NumLock,
	"75": keyMaps.NumpadDivide,
	"67": keyMaps.NumpadMultiply,
	"78": keyMaps.NumpadSubtract,
	"69": keyMaps.NumpadAdd,
	"76": keyMaps.NumpadEnter,
	"83": keyMaps.Numpad1,
	"84": keyMaps.Numpad2,
	"85": keyMaps.Numpad3,
	"86": keyMaps.Numpad4,
	"87": keyMaps.Numpad5,
	"88": keyMaps.Numpad6,
	"89": keyMaps.Numpad7,
	"91": keyMaps.Numpad8,
	"92": keyMaps.Numpad9,
	"82": keyMaps.Numpad0,
	"65": keyMaps.NumpadDecimal,
	"10": keyMaps.IntlBackslash,
	"110": keyMaps.ContextMenu,
	"81": keyMaps.NumpadEqual,
	"105": keyMaps.F13,
	"107": keyMaps.F14,
	"113": keyMaps.F15,
	"106": keyMaps.F16,
	"64": keyMaps.F17,
	"79": keyMaps.F18,
	"80": keyMaps.F19,
	"90": keyMaps.F20,
	"74": keyMaps.VolumeMute,
	"72": keyMaps.VolumeUp,
	"73": keyMaps.VolumeDown,
	"95": keyMaps.NumpadComma,
	"94": keyMaps.IntlRo,
	"104": keyMaps.KanaMode,
	"93": keyMaps.IntlYen,
	"59": keyMaps.ControlLeft,
	"56": keyMaps.ShiftLeft,
	"58": keyMaps.AltLeft,
	"55": keyMaps.MetaLeft,
	"62": keyMaps.ControlRight,
	"60": keyMaps.ShiftRight,
	"61": keyMaps.AltRight,
	"54": keyMaps.MetaRight
};
const keyMapsByCode = {
	Hyper: keyMaps.Hyper,
	Super: keyMaps.Super,
	Fn: keyMaps.Fn,
	FnLock: keyMaps.FnLock,
	Suspend: keyMaps.Suspend,
	Resume: keyMaps.Resume,
	Turbo: keyMaps.Turbo,
	Sleep: keyMaps.Sleep,
	WakeUp: keyMaps.WakeUp,
	DisplayToggleIntExt: keyMaps.DisplayToggleIntExt,
	KeyA: keyMaps.UsA,
	KeyB: keyMaps.UsB,
	KeyC: keyMaps.UsC,
	KeyD: keyMaps.UsD,
	KeyE: keyMaps.UsE,
	KeyF: keyMaps.UsF,
	KeyG: keyMaps.UsG,
	KeyH: keyMaps.UsH,
	KeyI: keyMaps.UsI,
	KeyJ: keyMaps.UsJ,
	KeyK: keyMaps.UsK,
	KeyL: keyMaps.UsL,
	KeyM: keyMaps.UsM,
	KeyN: keyMaps.UsN,
	KeyO: keyMaps.UsO,
	KeyP: keyMaps.UsP,
	KeyQ: keyMaps.UsQ,
	KeyR: keyMaps.UsR,
	KeyS: keyMaps.UsS,
	KeyT: keyMaps.UsT,
	KeyU: keyMaps.UsU,
	KeyV: keyMaps.UsV,
	KeyW: keyMaps.UsW,
	KeyX: keyMaps.UsX,
	KeyY: keyMaps.UsY,
	KeyZ: keyMaps.UsZ,
	Digit1: keyMaps.Digit1,
	Digit2: keyMaps.Digit2,
	Digit3: keyMaps.Digit3,
	Digit4: keyMaps.Digit4,
	Digit5: keyMaps.Digit5,
	Digit6: keyMaps.Digit6,
	Digit7: keyMaps.Digit7,
	Digit8: keyMaps.Digit8,
	Digit9: keyMaps.Digit9,
	Digit0: keyMaps.Digit0,
	Enter: keyMaps.Enter,
	Escape: keyMaps.Escape,
	Backspace: keyMaps.Backspace,
	Tab: keyMaps.Tab,
	Space: keyMaps.Space,
	Minus: keyMaps.Minus,
	Equal: keyMaps.Equal,
	BracketLeft: keyMaps.BracketLeft,
	BracketRight: keyMaps.BracketRight,
	Backslash: keyMaps.Backslash,
	IntlHash: keyMaps.IntlHash,
	Semicolon: keyMaps.Semicolon,
	Quote: keyMaps.Quote,
	Backquote: keyMaps.Backquote,
	Comma: keyMaps.Comma,
	Period: keyMaps.Period,
	Slash: keyMaps.Slash,
	CapsLock: keyMaps.CapsLock,
	F1: keyMaps.F1,
	F2: keyMaps.F2,
	F3: keyMaps.F3,
	F4: keyMaps.F4,
	F5: keyMaps.F5,
	F6: keyMaps.F6,
	F7: keyMaps.F7,
	F8: keyMaps.F8,
	F9: keyMaps.F9,
	F10: keyMaps.F10,
	F11: keyMaps.F11,
	F12: keyMaps.F12,
	PrintScreen: keyMaps.PrintScreen,
	ScrollLock: keyMaps.ScrollLock,
	Pause: keyMaps.Pause,
	Insert: keyMaps.Insert,
	Home: keyMaps.Home,
	PageUp: keyMaps.PageUp,
	Delete: keyMaps.Del,
	End: keyMaps.End,
	PageDown: keyMaps.PageDown,
	ArrowRight: keyMaps.ArrowRight,
	ArrowLeft: keyMaps.ArrowLeft,
	ArrowDown: keyMaps.ArrowDown,
	ArrowUp: keyMaps.ArrowUp,
	NumLock: keyMaps.NumLock,
	NumpadDivide: keyMaps.NumpadDivide,
	NumpadMultiply: keyMaps.NumpadMultiply,
	NumpadSubtract: keyMaps.NumpadSubtract,
	NumpadAdd: keyMaps.NumpadAdd,
	NumpadEnter: keyMaps.NumpadEnter,
	Numpad1: keyMaps.Numpad1,
	Numpad2: keyMaps.Numpad2,
	Numpad3: keyMaps.Numpad3,
	Numpad4: keyMaps.Numpad4,
	Numpad5: keyMaps.Numpad5,
	Numpad6: keyMaps.Numpad6,
	Numpad7: keyMaps.Numpad7,
	Numpad8: keyMaps.Numpad8,
	Numpad9: keyMaps.Numpad9,
	Numpad0: keyMaps.Numpad0,
	NumpadDecimal: keyMaps.NumpadDecimal,
	IntlBackslash: keyMaps.IntlBackslash,
	ContextMenu: keyMaps.ContextMenu,
	Power: keyMaps.Power,
	NumpadEqual: keyMaps.NumpadEqual,
	F13: keyMaps.F13,
	F14: keyMaps.F14,
	F15: keyMaps.F15,
	F16: keyMaps.F16,
	F17: keyMaps.F17,
	F18: keyMaps.F18,
	F19: keyMaps.F19,
	F20: keyMaps.F20,
	F21: keyMaps.F21,
	F22: keyMaps.F22,
	F23: keyMaps.F23,
	F24: keyMaps.F24,
	Open: keyMaps.Open,
	Help: keyMaps.Help,
	Select: keyMaps.Select,
	Again: keyMaps.Again,
	Undo: keyMaps.Undo,
	Cut: keyMaps.Cut,
	Copy: keyMaps.Copy,
	Paste: keyMaps.Paste,
	Find: keyMaps.Find,
	AudioVolumeMute: keyMaps.VolumeMute,
	AudioVolumeUp: keyMaps.VolumeUp,
	AudioVolumeDown: keyMaps.VolumeDown,
	NumpadComma: keyMaps.NumpadComma,
	IntlRo: keyMaps.IntlRo,
	KanaMode: keyMaps.KanaMode,
	IntlYen: keyMaps.IntlYen,
	Convert: keyMaps.Convert,
	NonConvert: keyMaps.NonConvert,
	Lang1: keyMaps.Lang1,
	Lang2: keyMaps.Lang2,
	Lang3: keyMaps.Lang3,
	Lang4: keyMaps.Lang4,
	Lang5: keyMaps.Lang5,
	Abort: keyMaps.Abort,
	Props: keyMaps.Props,
	NumpadParenLeft: keyMaps.NumpadParenLeft,
	NumpadParenRight: keyMaps.NumpadParenRight,
	NumpadBackspace: keyMaps.NumpadBackspace,
	NumpadMemoryStore: keyMaps.NumpadMemoryStore,
	NumpadMemoryRecall: keyMaps.NumpadMemoryRecall,
	NumpadMemoryClear: keyMaps.NumpadMemoryClear,
	NumpadMemoryAdd: keyMaps.NumpadMemoryAdd,
	NumpadMemorySubtract: keyMaps.NumpadMemorySubtract,
	NumpadClear: keyMaps.NumpadClear,
	NumpadClearEntry: keyMaps.NumpadClearEntry,
	ControlLeft: keyMaps.ControlLeft,
	ShiftLeft: keyMaps.ShiftLeft,
	AltLeft: keyMaps.AltLeft,
	MetaLeft: keyMaps.MetaLeft,
	ControlRight: keyMaps.ControlRight,
	ShiftRight: keyMaps.ShiftRight,
	AltRight: keyMaps.AltRight,
	MetaRight: keyMaps.MetaRight,
	BrightnessUp: keyMaps.BrightnessUp,
	BrightnessDown: keyMaps.BrightnessDown,
	MediaPlay: keyMaps.MediaPlay,
	MediaRecord: keyMaps.MediaRecord,
	MediaFastForward: keyMaps.MediaFastForward,
	MediaRewind: keyMaps.MediaRewind,
	MediaTrackNext: keyMaps.MediaTrackNext,
	MediaTrackPrevious: keyMaps.MediaTrackPrevious,
	MediaStop: keyMaps.MediaStop,
	Eject: keyMaps.Eject,
	MediaPlayPause: keyMaps.MediaPlayPause,
	MediaSelect: keyMaps.MediaSelect,
	LaunchMail: keyMaps.LaunchMail,
	LaunchApp2: keyMaps.LaunchApp2,
	LaunchApp1: keyMaps.LaunchApp1,
	LaunchControlPanel: keyMaps.LaunchControlPanel,
	SelectTask: keyMaps.SelectTask,
	LaunchScreenSaver: keyMaps.LaunchScreenSaver,
	LaunchAssistant: keyMaps.LaunchAssistant,
	BrowserSearch: keyMaps.BrowserSearch,
	BrowserHome: keyMaps.BrowserHome,
	BrowserBack: keyMaps.BrowserBack,
	BrowserForward: keyMaps.BrowserForward,
	BrowserStop: keyMaps.BrowserStop,
	BrowserRefresh: keyMaps.BrowserRefresh,
	BrowserFavorites: keyMaps.BrowserFavorites,
	ZoomToggle: keyMaps.ZoomToggle,
	MailReply: keyMaps.MailReply,
	MailForward: keyMaps.MailForward,
	MailSend: keyMaps.MailSend,
	KeyboardLayoutSelect: keyMaps.KeyboardLayoutSelect,
	ShowAllWindows: keyMaps.ShowAllWindows
};
Object.values(keyMaps);
function usbLookupKey(page, code) {
	return `${page}:${code}`;
}
function getUsbCode(page, code) {
	return keyMapsByUsb[usbLookupKey(page, code)];
}
function getKeyMapByCode(code) {
	return keyMapsByCode[code];
}
function getKeyMap(mapping) {
	switch (mapping.kind) {
		case "usb": return getUsbCode(mapping.page, mapping.code);
		case "evdev": return keyMapsByEvdev[String(mapping.code)];
		case "xkb": return keyMapsByXkb[String(mapping.code)];
		case "win": return keyMapsByWin[String(mapping.code)];
		case "mac": return keyMapsByMac[String(mapping.code)];
		case "code": return keyMapsByCode[mapping.code];
		case "id": return keyMaps[mapping.id];
	}
}
//#endregion
//#region src/js/utils/mac-keycode.ts
const CARBON_MODIFIERS = [
	{
		string: KeyMappingCode.MetaLeft,
		mask: 256
	},
	{
		string: KeyMappingCode.ShiftLeft,
		mask: 512
	},
	{
		string: KeyMappingCode.AltLeft,
		mask: 2048
	},
	{
		string: KeyMappingCode.ControlLeft,
		mask: 4096
	},
	{
		string: KeyMappingCode.CapsLock,
		mask: 1024
	}
];
const MODERN_MODIFIERS = [
	{
		string: KeyMappingCode.CapsLock,
		mask: 65536
	},
	{
		string: KeyMappingCode.ShiftLeft,
		mask: 1 << 17
	},
	{
		string: KeyMappingCode.ControlLeft,
		mask: 1 << 18
	},
	{
		string: KeyMappingCode.AltLeft,
		mask: 1 << 19
	},
	{
		string: KeyMappingCode.MetaLeft,
		mask: 1 << 20
	},
	{
		string: "Numpad",
		mask: 1 << 21
	},
	{
		string: KeyMappingCode.Help,
		mask: 1 << 22
	},
	{
		string: KeyMappingCode.Fn,
		mask: 1 << 23
	}
];
function modifiersToKeystrings(mask) {
	const result = [];
	for (const modifier of MODERN_MODIFIERS) if ((mask & modifier.mask) !== 0) result.push(modifier.string);
	return result;
}
function carbonModifiersToKeystrings(mask) {
	const result = [];
	for (const modifier of CARBON_MODIFIERS) if ((mask & modifier.mask) !== 0) result.push(modifier.string);
	return result;
}
function keystringsToMask(keystrings, modifiers) {
	let mask = 0;
	for (const keystring of keystrings) {
		const modifier = modifiers.find((m) => m.string === keystring);
		if (modifier) mask |= modifier.mask;
	}
	return mask;
}
function keystringsToModifierMask(keystrings) {
	return keystringsToMask(keystrings, MODERN_MODIFIERS);
}
function keystringsToCarbonModifierMask(keystrings) {
	return keystringsToMask(keystrings, CARBON_MODIFIERS);
}
//#endregion
//#region node_modules/.pnpm/bplist-lossless@0.2.0_typescript@6.0.2/node_modules/bplist-lossless/dist/utils/bytes.js
const UTF8_ENCODER = new TextEncoder();
const UTF8_DECODER = new TextDecoder("utf-8");
const BASE64_ALPHABET = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
function isByteSource(value) {
	return value instanceof ArrayBuffer || ArrayBuffer.isView(value);
}
function toUint8Array(input) {
	if (input instanceof Uint8Array) return input;
	if (input instanceof ArrayBuffer) return new Uint8Array(input);
	return new Uint8Array(input.buffer, input.byteOffset, input.byteLength);
}
function copyBytes(input) {
	return new Uint8Array(toUint8Array(input));
}
function concatBytes(chunks, totalSize) {
	const size = totalSize ?? chunks.reduce((sum, chunk) => sum + chunk.byteLength, 0);
	const out = new Uint8Array(size);
	let offset = 0;
	for (const chunk of chunks) {
		out.set(chunk, offset);
		offset += chunk.byteLength;
	}
	return out;
}
function encodeUtf8(value) {
	return UTF8_ENCODER.encode(value);
}
function decodeUtf8$1(input) {
	return UTF8_DECODER.decode(toUint8Array(input));
}
function encodeLatin1(value) {
	const out = new Uint8Array(value.length);
	for (let i = 0; i < value.length; i++) {
		const codeUnit = value.charCodeAt(i);
		if (codeUnit > 255) throw new RangeError("Latin-1 encoding only supports code units <= 0xFF.");
		out[i] = codeUnit;
	}
	return out;
}
function encodeUtf16BE(value) {
	const out = new Uint8Array(value.length * 2);
	for (let i = 0; i < value.length; i++) {
		const codeUnit = value.charCodeAt(i);
		out[i * 2] = codeUnit >>> 8;
		out[i * 2 + 1] = codeUnit & 255;
	}
	return out;
}
function decodeUtf16BE(input) {
	const bytes = toUint8Array(input);
	if (bytes.length % 2 !== 0) throw new Error("Invalid UTF-16 byte length");
	let result = "";
	const chunkSize = 16384;
	for (let start = 0; start < bytes.length; start += chunkSize * 2) {
		const end = Math.min(start + chunkSize * 2, bytes.length);
		const codeUnits = new Array((end - start) / 2);
		for (let i = start, j = 0; i < end; i += 2, j++) codeUnits[j] = bytes[i] << 8 | bytes[i + 1];
		result += String.fromCharCode(...codeUnits);
	}
	return result;
}
function toHex(input) {
	const bytes = toUint8Array(input);
	let out = "";
	for (const byte of bytes) out += byte.toString(16).padStart(2, "0");
	return out;
}
function fromHex(hex) {
	if (hex.length % 2 !== 0) throw new TypeError("Hex input must have an even number of characters.");
	const out = new Uint8Array(hex.length / 2);
	for (let i = 0; i < hex.length; i += 2) {
		const byte = Number.parseInt(hex.slice(i, i + 2), 16);
		if (Number.isNaN(byte)) throw new TypeError("Invalid hexadecimal input.");
		out[i / 2] = byte;
	}
	return out;
}
function toBase64(input) {
	const bytes = toUint8Array(input);
	let out = "";
	for (let i = 0; i < bytes.length; i += 3) {
		const a = bytes[i];
		const b = i + 1 < bytes.length ? bytes[i + 1] : 0;
		const c = i + 2 < bytes.length ? bytes[i + 2] : 0;
		const n = a << 16 | b << 8 | c;
		out += BASE64_ALPHABET[n >> 18 & 63];
		out += BASE64_ALPHABET[n >> 12 & 63];
		out += i + 1 < bytes.length ? BASE64_ALPHABET[n >> 6 & 63] : "=";
		out += i + 2 < bytes.length ? BASE64_ALPHABET[n & 63] : "=";
	}
	return out;
}
function bytesEqual(left, right) {
	const a = toUint8Array(left);
	const b = toUint8Array(right);
	if (a.byteLength !== b.byteLength) return false;
	for (let i = 0; i < a.byteLength; i++) if (a[i] !== b[i]) return false;
	return true;
}
function writeFloat64BE(value) {
	const out = new Uint8Array(8);
	new DataView(out.buffer, out.byteOffset, out.byteLength).setFloat64(0, value, false);
	return out;
}
function readFloat32BE(input, offset = 0) {
	const bytes = toUint8Array(input);
	return new DataView(bytes.buffer, bytes.byteOffset + offset, 4).getFloat32(0, false);
}
function readFloat64BE(input, offset = 0) {
	const bytes = toUint8Array(input);
	return new DataView(bytes.buffer, bytes.byteOffset + offset, 8).getFloat64(0, false);
}
//#endregion
//#region node_modules/.pnpm/bplist-lossless@0.2.0_typescript@6.0.2/node_modules/bplist-lossless/dist/classes/plist-date.js
const APPLE_PLIST_EPOCH_MS = Date.UTC(2001, 0, 1);
function isBinaryInput(value) {
	return value instanceof ArrayBuffer || ArrayBuffer.isView(value);
}
function normalizeRaw8(input) {
	const raw = copyBytes(input);
	if (raw.length !== 8) throw new RangeError(`PlistDate raw value must be exactly 8 bytes, got ${raw.length}.`);
	return raw;
}
function encodePlistSeconds(seconds) {
	return writeFloat64BE(seconds);
}
function decodePlistSeconds(raw) {
	return readFloat64BE(raw);
}
function plistSecondsToUnixMilliseconds(seconds) {
	return APPLE_PLIST_EPOCH_MS + seconds * 1e3;
}
function unixMillisecondsToPlistSeconds(milliseconds) {
	return (milliseconds - APPLE_PLIST_EPOCH_MS) / 1e3;
}
function numberToStableString(value) {
	if (Object.is(value, -0)) return "-0";
	if (Number.isNaN(value)) return "NaN";
	if (value === Infinity) return "Infinity";
	if (value === -Infinity) return "-Infinity";
	return value.toString();
}
/**
* Exact raw plist path.
*/
function canonicalStateFromRaw(input) {
	const raw = normalizeRaw8(input);
	const plistSeconds = decodePlistSeconds(raw);
	return {
		raw,
		plistSeconds,
		unixMilliseconds: plistSecondsToUnixMilliseconds(plistSeconds)
	};
}
/**
* Canonicalize a plist-seconds number by round-tripping it through the
* actual 8-byte binary representation.
*/
function canonicalStateFromPlistSeconds(seconds) {
	const raw = encodePlistSeconds(seconds);
	const plistSeconds = decodePlistSeconds(raw);
	return {
		raw,
		plistSeconds,
		unixMilliseconds: plistSecondsToUnixMilliseconds(plistSeconds)
	};
}
/**
* Canonicalize Unix milliseconds into the exact plist-representable value.
*
* This is the key fix for discrepancies like:
*   4410317596806472
* becoming
*   4410317596806471.5
*
* We normalize immediately instead of only discovering the change after
* encode -> decode.
*/
function canonicalStateFromUnixMilliseconds(milliseconds) {
	return canonicalStateFromPlistSeconds(unixMillisecondsToPlistSeconds(milliseconds));
}
function resolveInitialState(value) {
	if (value instanceof PlistDate) return canonicalStateFromRaw(value.getRawBytes());
	if (isBinaryInput(value)) return canonicalStateFromRaw(value);
	if (value instanceof Date) return canonicalStateFromUnixMilliseconds(value.getTime());
	if (typeof value === "number") return canonicalStateFromUnixMilliseconds(value);
	return canonicalStateFromUnixMilliseconds(Date.now());
}
var PlistDate = class PlistDate extends Date {
	static APPLE_PLIST_EPOCH_MS = APPLE_PLIST_EPOCH_MS;
	/**
	* Raw 8-byte plist payload is the canonical source of truth.
	*/
	#raw = encodePlistSeconds(0);
	constructor(value) {
		const state = resolveInitialState(value);
		super(state.unixMilliseconds);
		this.#raw = state.raw;
	}
	static from(input) {
		return new PlistDate(input);
	}
	static fromBuffer(input) {
		return new PlistDate(input);
	}
	static fromBytes(input) {
		return new PlistDate(input);
	}
	static fromPlistSeconds(seconds) {
		return new PlistDate(encodePlistSeconds(seconds));
	}
	static fromUnixMilliseconds(milliseconds) {
		return new PlistDate(milliseconds);
	}
	static isPlistDate(value) {
		return value instanceof PlistDate;
	}
	#applyCanonicalState(state) {
		this.#raw = copyBytes(state.raw);
		super.setTime(state.unixMilliseconds);
	}
	#replaceFromRaw(input) {
		this.#applyCanonicalState(canonicalStateFromRaw(input));
	}
	#replaceFromPlistSeconds(seconds) {
		this.#applyCanonicalState(canonicalStateFromPlistSeconds(seconds));
	}
	#replaceFromUnixMilliseconds(milliseconds) {
		this.#applyCanonicalState(canonicalStateFromUnixMilliseconds(milliseconds));
		return this.getTime();
	}
	#resyncFromDateState() {
		return this.#replaceFromUnixMilliseconds(super.getTime());
	}
	/**
	* Exact plist-native value:
	* seconds since 2001-01-01T00:00:00Z stored as IEEE 754
	* (Institute of Electrical and Electronics Engineers 754) double.
	*/
	get plistSeconds() {
		return decodePlistSeconds(this.#raw);
	}
	getPlistSeconds() {
		return this.plistSeconds;
	}
	getPlistSecondsString() {
		return numberToStableString(this.plistSeconds);
	}
	/**
	* Exact raw 8-byte plist payload.
	* If the object was constructed from raw bytes, those bytes are preserved
	* until the date is mutated.
	*/
	getRawBytes() {
		return copyBytes(this.#raw);
	}
	toRawString(encoding = "hex") {
		if (encoding === "hex") return toHex(this.#raw);
		return toBase64(this.#raw);
	}
	getRawHex() {
		return this.toRawString("hex");
	}
	getRawBase64() {
		return this.toRawString("base64");
	}
	toPlistString() {
		return this.getPlistSecondsString();
	}
	toBytes() {
		return this.getRawBytes();
	}
	toBuffer() {
		return this.toBytes();
	}
	/**
	* Set the exact plist-native seconds value.
	* Returns the plist-seconds string.
	*/
	setPlistSeconds(seconds) {
		if (typeof seconds !== "number") throw new TypeError("PlistDate seconds must be a number.");
		this.#replaceFromPlistSeconds(seconds);
		return this.getPlistSecondsString();
	}
	/**
	* Replace the date from exact raw plist bytes.
	* Returns the plist-seconds string.
	*/
	setRawBytes(input) {
		this.#replaceFromRaw(input);
		return this.getPlistSecondsString();
	}
	/**
	* Parse raw hex into the exact 8-byte plist payload.
	*/
	setRawHex(hex) {
		if (typeof hex !== "string" || !/^[0-9a-fA-F]{16}$/.test(hex)) throw new TypeError("PlistDate raw hex must be a 16-character hexadecimal string.");
		return this.setRawBytes(fromHex(hex));
	}
	/**
	* Exact Unix milliseconds derived from the canonical plist bytes.
	* This may include a fractional millisecond.
	*/
	getTime() {
		return plistSecondsToUnixMilliseconds(this.plistSeconds);
	}
	valueOf() {
		return this.getTime();
	}
	[Symbol.toPrimitive](hint) {
		if (hint === "number") return this.getTime();
		return this.toString();
	}
	toJSON() {
		return new Date(this.getTime()).toISOString();
	}
	clone() {
		return new PlistDate(this.#raw);
	}
	equalsExactly(other) {
		const rhs = PlistDate.from(other);
		return bytesEqual(this.#raw, rhs.#raw);
	}
	equalsValue(other) {
		const rhs = PlistDate.from(other);
		return Object.is(this.plistSeconds, rhs.plistSeconds);
	}
	/**
	* Direct time-setting path: normalize immediately to the exact
	* plist-representable value.
	*/
	setTime(time) {
		return this.#replaceFromUnixMilliseconds(time);
	}
	setMilliseconds(ms) {
		super.setMilliseconds(ms);
		return this.#resyncFromDateState();
	}
	setUTCMilliseconds(ms) {
		super.setUTCMilliseconds(ms);
		return this.#resyncFromDateState();
	}
	setSeconds(sec, ms) {
		if (ms === void 0) super.setSeconds(sec);
		else super.setSeconds(sec, ms);
		return this.#resyncFromDateState();
	}
	setUTCSeconds(sec, ms) {
		if (ms === void 0) super.setUTCSeconds(sec);
		else super.setUTCSeconds(sec, ms);
		return this.#resyncFromDateState();
	}
	setMinutes(min, sec, ms) {
		if (sec === void 0) super.setMinutes(min);
		else if (ms === void 0) super.setMinutes(min, sec);
		else super.setMinutes(min, sec, ms);
		return this.#resyncFromDateState();
	}
	setUTCMinutes(min, sec, ms) {
		if (sec === void 0) super.setUTCMinutes(min);
		else if (ms === void 0) super.setUTCMinutes(min, sec);
		else super.setUTCMinutes(min, sec, ms);
		return this.#resyncFromDateState();
	}
	setHours(hours, min, sec, ms) {
		if (min === void 0) super.setHours(hours);
		else if (sec === void 0) super.setHours(hours, min);
		else if (ms === void 0) super.setHours(hours, min, sec);
		else super.setHours(hours, min, sec, ms);
		return this.#resyncFromDateState();
	}
	setUTCHours(hours, min, sec, ms) {
		if (min === void 0) super.setUTCHours(hours);
		else if (sec === void 0) super.setUTCHours(hours, min);
		else if (ms === void 0) super.setUTCHours(hours, min, sec);
		else super.setUTCHours(hours, min, sec, ms);
		return this.#resyncFromDateState();
	}
	setDate(date) {
		super.setDate(date);
		return this.#resyncFromDateState();
	}
	setUTCDate(date) {
		super.setUTCDate(date);
		return this.#resyncFromDateState();
	}
	setMonth(month, date) {
		if (date === void 0) super.setMonth(month);
		else super.setMonth(month, date);
		return this.#resyncFromDateState();
	}
	setUTCMonth(month, date) {
		if (date === void 0) super.setUTCMonth(month);
		else super.setUTCMonth(month, date);
		return this.#resyncFromDateState();
	}
	setFullYear(year, month, date) {
		if (month === void 0) super.setFullYear(year);
		else if (date === void 0) super.setFullYear(year, month);
		else super.setFullYear(year, month, date);
		return this.#resyncFromDateState();
	}
	setUTCFullYear(year, month, date) {
		if (month === void 0) super.setUTCFullYear(year);
		else if (date === void 0) super.setUTCFullYear(year, month);
		else super.setUTCFullYear(year, month, date);
		return this.#resyncFromDateState();
	}
	/**
	* @deprecated This method is deprecated and should not be used. Use setFullYear() instead.
	*/
	setYear(year) {
		super.setYear(year);
		return this.#resyncFromDateState();
	}
	[Symbol.for("nodejs.util.inspect.custom")]() {
		return `PlistDate(${(() => {
			try {
				return this.toISOString();
			} catch {
				return "Invalid Date";
			}
		})()}, plistSeconds=${this.getPlistSecondsString()}, raw=${this.getRawHex()})`;
	}
};
//#endregion
//#region node_modules/.pnpm/bplist-lossless@0.2.0_typescript@6.0.2/node_modules/bplist-lossless/dist/classes/uid.js
const UID_BRAND = Symbol.for("plist.UID");
var UID = class UID extends Uint8Array {
	static from(bytes) {
		return new UID(bytes.buffer, bytes.byteOffset, bytes.byteLength);
	}
	static fromNumber(value) {
		if (!Number.isInteger(value) || value < 0) throw new TypeError("UID number value must be an unsigned integer.");
		let hex = value.toString(16);
		if (hex.length % 2 !== 0) hex = `0${hex}`;
		const bytes = new Uint8Array(Math.max(1, hex.length / 2));
		for (let i = 0; i < bytes.length; i++) bytes[i] = Number.parseInt(hex.slice(i * 2, i * 2 + 2), 16);
		let start = 0;
		while (start < bytes.length - 1 && bytes[start] === 0) start++;
		const raw = bytes.subarray(start);
		if (raw.length > 16) throw new RangeError("UID too large for binary plist");
		return UID.from(raw);
	}
	constructor(buffer, byteOffset, length) {
		super(buffer, byteOffset, length);
		Object.defineProperty(this, UID_BRAND, {
			value: true,
			enumerable: false
		});
	}
	static isUID(value) {
		return value instanceof Uint8Array && value != null && value[UID_BRAND] === true;
	}
	toHex() {
		return toHex(this);
	}
	[Symbol.for("nodejs.util.inspect.custom")]() {
		return `UID(${this.toHex()})`;
	}
};
//#endregion
//#region node_modules/.pnpm/bplist-lossless@0.2.0_typescript@6.0.2/node_modules/bplist-lossless/dist/classes/utf16-string.js
const UTF16_STRING_BRAND = Symbol.for("plist.Utf16String");
var Utf16String = class Utf16String extends Uint8Array {
	static from(bytes) {
		return new Utf16String(bytes.buffer, bytes.byteOffset, bytes.byteLength);
	}
	constructor(buffer, byteOffset, length) {
		super(buffer, byteOffset, length);
		Object.defineProperty(this, UTF16_STRING_BRAND, {
			value: true,
			enumerable: false
		});
	}
	static isUtf16String(value) {
		return value instanceof Uint8Array && value != null && value[UTF16_STRING_BRAND] === true;
	}
	toString() {
		return decodeUtf16BE(this);
	}
	toHex() {
		return toHex(this);
	}
	[Symbol.for("nodejs.util.inspect.custom")]() {
		return `Utf16String(${this.toString()})`;
	}
};
//#endregion
//#region node_modules/.pnpm/bplist-lossless@0.2.0_typescript@6.0.2/node_modules/bplist-lossless/dist/utils/parse.js
var maxObjectSize = 100 * 1e3 * 1e3;
function parseBplist(input) {
	const buffer = toUint8Array(input);
	if (decodeUtf8$1(buffer.subarray(0, 6)) !== "bplist") throw new Error("Invalid binary plist. Expected 'bplist' at offset 0.");
	const trailer = buffer.slice(buffer.length - 32, buffer.length);
	const offsetSize = trailer[6];
	const objectRefSize = trailer[7];
	const numObjects = toSafeNumber(readBigUInt64BE(trailer, 8));
	const topObject = toSafeNumber(readBigUInt64BE(trailer, 16));
	const offsetTableOffset = toSafeNumber(readBigUInt64BE(trailer, 24));
	if (numObjects > 32768) throw new Error("maxObjectCount exceeded");
	const offsetTable = [];
	for (let i = 0; i < numObjects; i++) offsetTable[i] = toSafeNumber(readUInt(buffer.slice(offsetTableOffset + i * offsetSize, offsetTableOffset + (i + 1) * offsetSize), 0));
	function parseObject(tableOffset) {
		const offset = offsetTable[tableOffset];
		const type = buffer[offset];
		const objType = (type & 240) >> 4;
		const objInfo = type & 15;
		switch (objType) {
			case 0: return parseSimple();
			case 1: return parseInteger();
			case 8: return parseUID();
			case 2: return parseReal();
			case 3: return parseDate();
			case 4: return parseData();
			case 5: return parsePlistString(false);
			case 6: return parsePlistString(true);
			case 10: return parseArray();
			case 13: return parseDictionary();
			default: throw new Error("Unhandled type 0x" + objType.toString(16));
		}
		function parseSimple() {
			switch (objInfo) {
				case 0: return null;
				case 8: return false;
				case 9: return true;
				case 15: return null;
				default: throw new Error("Unhandled simple type 0x" + objType.toString(16));
			}
		}
		function parseInteger() {
			const length = 1 << objInfo;
			if (length > 1e8) throw new Error(`Too little heap space available! Wanted to read ${length} bytes, but only ${maxObjectSize} are available.`);
			const start = offset + 1;
			const end = start + length;
			const data = buffer.subarray(start, end);
			let value = 0n;
			for (let i = 0; i < data.length; i++) value = value << 8n | BigInt(data[i]);
			const bits = BigInt(length * 8);
			const signBit = 1n << bits - 1n;
			if (value & signBit) value -= 1n << bits;
			return value;
		}
		function parseUID() {
			const length = objInfo + 1;
			if (length < 1e8) return new UID(buffer.buffer, buffer.byteOffset + offset + 1, length);
			throw new Error("Too little heap space available! Wanted to read " + length + " bytes, but only " + maxObjectSize + " are available.");
		}
		function parseReal() {
			const length = Math.pow(2, objInfo);
			if (length < 1e8) {
				const realBuffer = buffer.slice(offset + 1, offset + 1 + length);
				if (length === 4) return readFloat32BE(realBuffer);
				if (length === 8) return readFloat64BE(realBuffer);
			} else throw new Error("Too little heap space available! Wanted to read " + length + " bytes, but only " + maxObjectSize + " are available.");
		}
		function parseDate() {
			if (objInfo !== 3) console.error("Unknown date type: " + objInfo + ". Parsing anyway...");
			const raw = buffer.subarray(offset + 1, offset + 9);
			return PlistDate.fromBytes(raw);
		}
		function parseData() {
			let dataoffset = 1;
			let length = objInfo;
			if (objInfo == 15) {
				const intTypeByte = buffer[offset + 1];
				const intType = (intTypeByte & 240) / 16;
				if (intType != 1) console.error("0x4: UNEXPECTED LENGTH-INT TYPE! " + intType);
				const intInfo = intTypeByte & 15;
				const intLength = Math.pow(2, intInfo);
				dataoffset = 2 + intLength;
				length = toSafeNumber(readUInt(buffer.slice(offset + 2, offset + 2 + intLength)));
			}
			if (length < 1e8) return buffer.slice(offset + dataoffset, offset + dataoffset + length);
			throw new Error("Too little heap space available! Wanted to read " + length + " bytes, but only " + maxObjectSize + " are available.");
		}
		function parsePlistString(isUtf16) {
			let length = objInfo;
			let stroffset = 1;
			if (objInfo == 15) {
				const intTypeByte = buffer[offset + 1];
				const intType = (intTypeByte & 240) / 16;
				if (intType != 1) console.error("UNEXPECTED LENGTH-INT TYPE! " + intType);
				const intInfo = intTypeByte & 15;
				const intLength = Math.pow(2, intInfo);
				stroffset = 2 + intLength;
				length = toSafeNumber(readUInt(buffer.slice(offset + 2, offset + 2 + intLength)));
			}
			length *= Number(isUtf16) + 1;
			if (length < 1e8) {
				const plistString = buffer.slice(offset + stroffset, offset + stroffset + length);
				if (isUtf16) return Utf16String.from(plistString);
				return decodeUtf8$1(plistString);
			}
			throw new Error("Too little heap space available! Wanted to read " + length + " bytes, but only " + maxObjectSize + " are available.");
		}
		function parseArray() {
			let length = objInfo;
			let arrayoffset = 1;
			if (objInfo == 15) {
				const intTypeByte = buffer[offset + 1];
				const intType = (intTypeByte & 240) / 16;
				if (intType != 1) console.error("0xa: UNEXPECTED LENGTH-INT TYPE! " + intType);
				const intInfo = intTypeByte & 15;
				const intLength = Math.pow(2, intInfo);
				arrayoffset = 2 + intLength;
				length = toSafeNumber(readUInt(buffer.slice(offset + 2, offset + 2 + intLength)));
			}
			if (length * objectRefSize > 1e8) throw new Error("Too little heap space available!");
			const array = [];
			for (let i = 0; i < length; i++) array[i] = parseObject(toSafeNumber(readUInt(buffer.slice(offset + arrayoffset + i * objectRefSize, offset + arrayoffset + (i + 1) * objectRefSize))));
			return array;
		}
		function parseDictionary() {
			let length = objInfo;
			let dictoffset = 1;
			if (objInfo == 15) {
				const intTypeByte = buffer[offset + 1];
				const intType = (intTypeByte & 240) / 16;
				if (intType != 1) console.error("0xD: UNEXPECTED LENGTH-INT TYPE! " + intType);
				const intInfo = intTypeByte & 15;
				const intLength = Math.pow(2, intInfo);
				dictoffset = 2 + intLength;
				length = toSafeNumber(readUInt(buffer.slice(offset + 2, offset + 2 + intLength)));
			}
			if (length * 2 * objectRefSize > 1e8) throw new Error("Too little heap space available!");
			const dict = createSafeObject();
			for (let i = 0; i < length; i++) {
				const keyRef = toSafeNumber(readUInt(buffer.slice(offset + dictoffset + i * objectRefSize, offset + dictoffset + (i + 1) * objectRefSize)));
				const valRef = toSafeNumber(readUInt(buffer.slice(offset + dictoffset + length * objectRefSize + i * objectRefSize, offset + dictoffset + length * objectRefSize + (i + 1) * objectRefSize)));
				const key = parseObject(keyRef);
				dict[key] = parseObject(valRef);
			}
			return dict;
		}
	}
	return parseObject(topObject);
}
function readUInt(buffer, start = 0) {
	let result = 0n;
	for (let i = start; i < buffer.length; i++) {
		result <<= 8n;
		result |= BigInt(buffer[i]);
	}
	return result;
}
function toSafeNumber(x) {
	if (x > BigInt(Number.MAX_SAFE_INTEGER)) throw new Error("Offset too large");
	return Number(x);
}
function createSafeObject() {
	return Object.create(null);
}
function readBigUInt64BE(buf, offset) {
	let value = 0n;
	for (let i = 0; i < 8; i++) value = value << 8n | BigInt(buf[offset + i]);
	return value;
}
//#endregion
//#region node_modules/.pnpm/bplist-lossless@0.2.0_typescript@6.0.2/node_modules/bplist-lossless/dist/utils/serialize.js
function serializeBplist(dicts) {
	const buffer = new WritableStreamBuffer();
	buffer.write(encodeUtf8("bplist00"));
	let entries = toEntries(dicts);
	const idSizeInBytes = computeIdSizeInBytes(entries.length);
	const offsets = [];
	let offsetSizeInBytes;
	let offsetTableOffset;
	updateEntryIds();
	entries.forEach(function(entry, entryIdx) {
		offsets[entryIdx] = buffer.size();
		if (!entry) buffer.write(0);
		else write(entry);
	});
	writeOffsetTable();
	writeTrailer();
	return buffer.getContents();
	function updateEntryIds() {
		const strings = {};
		let entryId = 0;
		entries.forEach(function(entry) {
			if (entry.id) return;
			if (entry.type === "string") if (!entry.bplistOverride && strings.hasOwnProperty(entry.value)) {
				entry.type = "stringref";
				entry.id = strings[entry.value];
			} else strings[entry.value] = entry.id = entryId++;
			else entry.id = entryId++;
		});
		entries = entries.filter(function(entry) {
			return entry.type !== "stringref";
		});
	}
	function writeTrailer() {
		buffer.write(new Uint8Array(6));
		writeByte(offsetSizeInBytes);
		writeByte(idSizeInBytes);
		writeLong(entries.length);
		writeLong(0);
		writeLong(offsetTableOffset);
	}
	function writeOffsetTable() {
		offsetTableOffset = buffer.size();
		offsetSizeInBytes = computeOffsetSizeInBytes(offsetTableOffset);
		offsets.forEach(function(offset) {
			writeBytes(offset, offsetSizeInBytes);
		});
	}
	function write(entry) {
		switch (entry.type) {
			case "dict":
				writeDict(entry);
				break;
			case "number":
			case "double":
				writeNumber(entry);
				break;
			case "UID":
				writeUID(entry);
				break;
			case "array":
				writeArray(entry);
				break;
			case "boolean":
				writeBoolean(entry);
				break;
			case "string":
			case "string-utf16":
				writeString(entry);
				break;
			case "date":
				writeDate(entry);
				break;
			case "data":
				writeData(entry);
				break;
			case "null":
				writeNull();
				break;
			default: throw new Error("unhandled entry type: " + entry.type);
		}
	}
	function writeDate(entry) {
		writeByte(51);
		buffer.write(PlistDate.from(entry.value).toBytes());
	}
	function writeDict(entry) {
		writeIntHeader(13, entry.entryKeys.length);
		entry.entryKeys.forEach(function(item) {
			writeID(item.id);
		});
		entry.entryValues.forEach(function(item) {
			writeID(item.id);
		});
	}
	function writeNumber(entry) {
		if (typeof entry.value === "bigint") {
			const size = getIntSize(entry.value);
			writeByte(16 | Math.log2(size));
			buffer.write(bigintToBuffer(entry.value, size));
		} else if (entry.type !== "double" && parseFloat(entry.value).toFixed() == entry.value) if (entry.value < 0) {
			writeByte(19);
			writeBytes(entry.value, 8, true);
		} else if (entry.value <= 255) {
			writeByte(16);
			writeBytes(entry.value, 1);
		} else if (entry.value <= 65535) {
			writeByte(17);
			writeBytes(entry.value, 2);
		} else if (entry.value <= 4294967295) {
			writeByte(18);
			writeBytes(entry.value, 4);
		} else {
			writeByte(19);
			writeBytes(entry.value, 8);
		}
		else {
			writeByte(35);
			writeDouble(entry.value);
		}
	}
	function writeUID(entry) {
		let raw;
		if (entry.value instanceof UID) raw = copyBytes(entry.value);
		else if (typeof entry.value === "bigint") {
			if (entry.value < 0n) throw new TypeError("UID must be unsigned");
			let hex = entry.value.toString(16);
			if (hex.length % 2 !== 0) hex = "0" + hex;
			raw = fromHex(hex || "00");
		} else if (typeof entry.value === "number" && Number.isInteger(entry.value) && entry.value >= 0) {
			let hex = BigInt(entry.value).toString(16);
			if (hex.length % 2 !== 0) hex = "0" + hex;
			raw = fromHex(hex || "00");
		} else throw new TypeError("UID value must be a UID, bigint, or unsigned integer number");
		let start = 0;
		while (start < raw.length - 1 && raw[start] === 0) start++;
		raw = raw.subarray(start);
		if (raw.length < 1 || raw.length > 16) throw new RangeError(`UID must be between 1 and 16 bytes, got ${raw.length}`);
		writeByte(128 | raw.length - 1);
		buffer.write(raw);
	}
	function writeArray(entry) {
		writeIntHeader(10, entry.entries.length);
		entry.entries.forEach(function(item) {
			writeID(item.id);
		});
	}
	function writeBoolean(entry) {
		writeByte(entry.value ? 9 : 8);
	}
	function writeNull() {
		writeByte(0);
	}
	function writeString(entry) {
		if (entry.type === "string-utf16") {
			const utf16 = Utf16String.isUtf16String(entry.value) ? copyBytes(entry.value) : encodeUtf16BE(entry.value);
			writeIntHeader(6, utf16.length / 2);
			buffer.write(utf16);
		} else {
			const ascii = encodeLatin1(entry.value);
			writeIntHeader(5, ascii.length);
			buffer.write(ascii);
		}
	}
	function writeData(entry) {
		writeIntHeader(4, entry.value.length);
		buffer.write(entry.value);
	}
	function writeLong(l) {
		writeBytes(l, 8);
	}
	function writeByte(b) {
		buffer.write(b);
	}
	function writeDouble(v) {
		buffer.write(writeFloat64BE(v));
	}
	function writeIntHeader(kind, value) {
		if (value < 15) writeByte((kind << 4) + value);
		else if (value < 256) {
			writeByte((kind << 4) + 15);
			writeByte(16);
			writeBytes(value, 1);
		} else if (value < 65536) {
			writeByte((kind << 4) + 15);
			writeByte(17);
			writeBytes(value, 2);
		} else {
			writeByte((kind << 4) + 15);
			writeByte(18);
			writeBytes(value, 4);
		}
	}
	function writeID(id) {
		writeBytes(id, idSizeInBytes);
	}
	function writeBytes(value, bytes, isSignedInt = false) {
		const buf = new Uint8Array(bytes);
		let z = 0;
		while (bytes > 4) {
			buf[z++] = isSignedInt ? 255 : 0;
			bytes--;
		}
		for (let i = bytes - 1; i >= 0; i--) buf[z++] = value >> 8 * i;
		buffer.write(buf);
	}
}
function toEntries(dicts) {
	if (dicts === null) return [{
		type: "null",
		value: null
	}];
	else if (typeof dicts === "boolean") return [{
		type: "boolean",
		value: dicts
	}];
	else if (typeof dicts === "bigint") return [{
		type: "number",
		value: dicts
	}];
	else if (typeof dicts === "number") return [{
		type: "double",
		value: dicts
	}];
	else if (typeof dicts === "string") return [{
		type: mustBeUtf16(dicts) ? "string-utf16" : "string",
		value: dicts
	}];
	else if (Utf16String.isUtf16String(dicts)) return [{
		type: "string-utf16",
		value: dicts
	}];
	else if (UID.isUID(dicts)) return [{
		type: "UID",
		value: dicts
	}];
	else if (isByteSource(dicts)) return [{
		type: "data",
		value: copyBytes(toUint8Array(dicts))
	}];
	else if (PlistDate.isPlistDate(dicts) || Object.prototype.toString.call(dicts) === "[object Date]") return [{
		type: "date",
		value: dicts
	}];
	else if (Array.isArray(dicts)) return toEntriesArray(dicts);
	else if (isPlainObject(dicts)) return toEntriesObject(dicts);
	else throw new Error("unhandled entry: " + dicts);
}
function toEntriesArray(arr) {
	let results = [{
		type: "array",
		entries: []
	}];
	arr.forEach(function(v) {
		const entry = toEntries(v);
		results[0].entries.push(entry[0]);
		results = results.concat(entry);
	});
	return results;
}
function toEntriesObject(dict) {
	const result = {
		type: "dict",
		entryKeys: [],
		entryValues: []
	};
	const results = [result];
	for (const key of Reflect.ownKeys(dict)) {
		if (typeof key !== "string") continue;
		const entryKey = toEntries(key);
		const entryValue = toEntries(dict[key]);
		result.entryKeys.push(entryKey[0]);
		result.entryValues.push(entryValue[0]);
		results.push(...entryKey);
		results.push(...entryValue);
	}
	return results;
}
function computeOffsetSizeInBytes(maxOffset) {
	if (maxOffset < 256) return 1;
	if (maxOffset < 65536) return 2;
	if (maxOffset < 4294967296) return 4;
	return 8;
}
function computeIdSizeInBytes(numberOfIds) {
	if (numberOfIds < 256) return 1;
	if (numberOfIds < 65536) return 2;
	return 4;
}
function isPlainObject(value) {
	if (Object.prototype.toString.call(value) !== "[object Object]") return false;
	const proto = Object.getPrototypeOf(value);
	return proto === null || proto === Object.prototype;
}
var WritableStreamBuffer = class {
	_chunks;
	_size;
	constructor() {
		this._chunks = [];
		this._size = 0;
	}
	write(chunk, encoding) {
		let buf;
		if (typeof chunk === "number") buf = Uint8Array.of(chunk & 255);
		else if (isByteSource(chunk)) buf = copyBytes(chunk);
		else if (typeof chunk === "string") {
			if (encoding && encoding !== "utf8") throw new TypeError(`Unsupported string encoding passed to write(): ${String(encoding)}`);
			buf = encodeUtf8(chunk);
		} else throw new TypeError("Unsupported chunk type passed to write()");
		this._chunks.push(buf);
		this._size += buf.length;
		return true;
	}
	size() {
		return this._size;
	}
	getContents() {
		return concatBytes(this._chunks, this._size);
	}
};
function bigintToBuffer(value, size) {
	const buf = new Uint8Array(size);
	let temp = value;
	if (value < 0) temp = (1n << BigInt(size * 8)) + value;
	for (let i = size - 1; i >= 0; i--) {
		buf[i] = Number(temp & 255n);
		temp >>= 8n;
	}
	return buf;
}
function getIntSize(value) {
	if (value >= -128n && value <= 127n) return 1;
	if (value >= -32768n && value <= 32767n) return 2;
	if (value >= -2147483648n && value <= 2147483647n) return 4;
	if (value >= -9223372036854775808n && value <= 9223372036854775807n) return 8;
	return 16;
}
function mustBeUtf16(str) {
	for (let i = 0; i < str.length; i++) if (str.charCodeAt(i) > 127) return true;
	return false;
}
//#endregion
//#region node_modules/.pnpm/fast-is-equal@1.2.6/node_modules/fast-is-equal/dist/index.js
const TYPEOF_OBJECT = "object";
const TYPEOF_FUNCTION = "function";
const TYPEOF_NUMBER = "number";
const TYPEOF_STRING = "string";
const TYPEOF_BOOLEAN = "boolean";
const TYPEOF_SYMBOL = "symbol";
const TYPEOF_BIGINT = "bigint";
const isNaN = Number.isNaN;
const dateConstructor = Date;
const regExpConstructor = RegExp;
const mapConstructor = Map;
const setConstructor = Set;
const arrayBufferConstructor = ArrayBuffer;
const promiseConstructor = Promise;
const errorConstructor = Error;
const dataViewConstructor = DataView;
function fastIsEqual(a, b) {
	if (a === b) return true;
	if (a == null || b == null) return false;
	const typeA = typeof a;
	if (typeA === TYPEOF_NUMBER) return typeof b === TYPEOF_NUMBER && isNaN(a) && isNaN(b);
	if (typeA === TYPEOF_STRING || typeA === TYPEOF_BOOLEAN || typeA === TYPEOF_FUNCTION || typeA === TYPEOF_SYMBOL || typeA === TYPEOF_BIGINT) return false;
	if (typeof b !== TYPEOF_OBJECT) return false;
	const aIsArray = Array.isArray(a);
	if (aIsArray !== Array.isArray(b)) return false;
	const aCtor = a.constructor;
	if (aCtor !== b.constructor) return false;
	if (aIsArray) {
		const len = a.length;
		if (len !== b.length) return false;
		if (len === 0) return true;
		if (len < 8) {
			for (let i = 0; i < len; i++) {
				const hasA = i in a;
				if (hasA !== i in b) return false;
				if (!hasA) continue;
				const elemA = a[i];
				const elemB = b[i];
				if (elemA === elemB) continue;
				if (elemA == null || elemB == null) return false;
				const elemTypeA = typeof elemA;
				if (elemTypeA !== typeof elemB) return false;
				if (elemTypeA === TYPEOF_NUMBER) {
					if (!(isNaN(elemA) && isNaN(elemB))) return false;
					continue;
				}
				if (elemTypeA !== TYPEOF_OBJECT && elemTypeA !== TYPEOF_FUNCTION) return false;
				if (!deepEqual(elemA, elemB, /* @__PURE__ */ new Map())) return false;
			}
			return true;
		}
		return deepEqual(a, b, /* @__PURE__ */ new Map());
	}
	if (aCtor === dateConstructor) return a.getTime() === b.getTime();
	if (aCtor === regExpConstructor) return a.source === b.source && a.flags === b.flags;
	return deepEqual(a, b, /* @__PURE__ */ new Map());
}
function deepEqual(valA, valB, visited) {
	if (valA === valB) return true;
	if (valA == null || valB == null) return false;
	const typeA = typeof valA;
	if (typeA !== typeof valB) return false;
	if (typeA === TYPEOF_NUMBER) return isNaN(valA) && isNaN(valB);
	if (typeA !== TYPEOF_OBJECT && typeA !== TYPEOF_FUNCTION) return false;
	const visitedVal = visited.get(valA);
	if (visitedVal !== void 0) return visitedVal === valB;
	if (visited.has(valB)) return false;
	const ctorA = valA.constructor;
	if (ctorA !== valB.constructor) return false;
	if (ctorA === dateConstructor) return valA.getTime() === valB.getTime();
	if (ctorA === regExpConstructor) return valA.source === valB.source && valA.flags === valB.flags;
	if (ctorA === promiseConstructor || ctorA === errorConstructor) return false;
	if (Array.isArray(valA)) {
		const len = valA.length;
		if (len !== valB.length) return false;
		visited.set(valA, valB);
		visited.set(valB, valA);
		if (len === 0) return true;
		for (let i = 0; i < len; i++) {
			const hasA = i in valA;
			if (hasA !== i in valB) return false;
			if (!hasA) continue;
			const elemA = valA[i];
			const elemB = valB[i];
			if (elemA !== elemB && !deepEqual(elemA, elemB, visited)) return false;
		}
		return true;
	}
	if (ctorA === mapConstructor) {
		const mapA = valA;
		const mapB = valB;
		if (mapA.size !== mapB.size) return false;
		if (mapA.size === 0) return true;
		visited.set(valA, valB);
		visited.set(valB, valA);
		for (const [key, valueA] of mapA) {
			const keyType = typeof key;
			if (keyType !== TYPEOF_OBJECT && keyType !== TYPEOF_FUNCTION) {
				if (!mapB.has(key)) return false;
				const valueB = mapB.get(key);
				if (valueA !== valueB && !deepEqual(valueA, valueB, visited)) return false;
			} else {
				let found = false;
				for (const [keyB, valueB] of mapB) if (deepEqual(key, keyB, visited) && deepEqual(valueA, valueB, visited)) {
					found = true;
					break;
				}
				if (!found) return false;
			}
		}
		return true;
	}
	if (ctorA === setConstructor) {
		const setA = valA;
		const setB = valB;
		if (setA.size !== setB.size) return false;
		if (setA.size === 0) return true;
		visited.set(valA, valB);
		visited.set(valB, valA);
		let hasObjects = false;
		for (const val of setA) {
			const valType = typeof val;
			if (valType === TYPEOF_OBJECT || valType === TYPEOF_FUNCTION) hasObjects = true;
			else if (!setB.has(val)) return false;
		}
		if (!hasObjects) return true;
		const objectsA = [];
		const objectsB = [];
		for (const val of setA) {
			const valType = typeof val;
			if (valType === TYPEOF_OBJECT || valType === TYPEOF_FUNCTION) objectsA.push(val);
		}
		for (const val of setB) {
			const valType = typeof val;
			if (valType === TYPEOF_OBJECT || valType === TYPEOF_FUNCTION) objectsB.push(val);
		}
		const used = new Uint8Array(objectsB.length);
		for (const valA of objectsA) {
			let found = false;
			for (let j = 0; j < objectsB.length; j++) if (!used[j]) {
				const newVisited = new Map(visited);
				if (deepEqual(valA, objectsB[j], newVisited)) {
					used[j] = 1;
					found = true;
					break;
				}
			}
			if (!found) return false;
		}
		return true;
	}
	if (ctorA === arrayBufferConstructor) {
		const bufA = valA;
		const bufB = valB;
		const byteLength = bufA.byteLength;
		if (byteLength !== bufB.byteLength) return false;
		const viewA = new Uint8Array(bufA);
		const viewB = new Uint8Array(bufB);
		let i = 0;
		const unrollEnd = byteLength - 7;
		for (; i < unrollEnd; i += 8) if (viewA[i] !== viewB[i] || viewA[i + 1] !== viewB[i + 1] || viewA[i + 2] !== viewB[i + 2] || viewA[i + 3] !== viewB[i + 3] || viewA[i + 4] !== viewB[i + 4] || viewA[i + 5] !== viewB[i + 5] || viewA[i + 6] !== viewB[i + 6] || viewA[i + 7] !== viewB[i + 7]) return false;
		for (; i < byteLength; i++) if (viewA[i] !== viewB[i]) return false;
		return true;
	}
	if (ctorA === dataViewConstructor) {
		const viewA = valA;
		const viewB = valB;
		if (viewA.byteLength !== viewB.byteLength || viewA.byteOffset !== viewB.byteOffset) return false;
		for (let i = 0; i < viewA.byteLength; i++) if (viewA.getUint8(i) !== viewB.getUint8(i)) return false;
		return true;
	}
	if (ArrayBuffer.isView(valA)) {
		const arrA = valA;
		const arrB = valB;
		const len = arrA.length;
		if (len !== arrB.length) return false;
		if (len < 16) {
			for (let i = 0; i < len; i++) if (arrA[i] !== arrB[i]) return false;
			return true;
		}
		let i = 0;
		const unrollLen = len - 3;
		for (; i < unrollLen; i += 4) if (arrA[i] !== arrB[i] || arrA[i + 1] !== arrB[i + 1] || arrA[i + 2] !== arrB[i + 2] || arrA[i + 3] !== arrB[i + 3]) return false;
		for (; i < len; i++) if (arrA[i] !== arrB[i]) return false;
		return true;
	}
	visited.set(valA, valB);
	visited.set(valB, valA);
	const keysA = Object.keys(valA);
	const keysALen = keysA.length;
	if (keysALen !== Object.keys(valB).length) return false;
	if (keysALen === 0) {
		if (Object.getOwnPropertySymbols !== void 0) {
			const symbolsA = Object.getOwnPropertySymbols(valA);
			if (symbolsA.length !== Object.getOwnPropertySymbols(valB).length) return false;
			for (let i = 0; i < symbolsA.length; i++) {
				const sym = symbolsA[i];
				if (!(sym in valB) || !deepEqual(valA[sym], valB[sym], visited)) return false;
			}
		}
		return true;
	}
	for (let i = 0; i < keysALen; i++) {
		const key = keysA[i];
		if (!(key in valB)) return false;
		const propA = valA[key];
		const propB = valB[key];
		if (propA !== propB) {
			const propTypeA = typeof propA;
			if (propTypeA === TYPEOF_OBJECT || propTypeA === TYPEOF_FUNCTION) {
				if (!deepEqual(propA, propB, visited)) return false;
			} else if (propTypeA === TYPEOF_NUMBER) {
				if (!(isNaN(propA) && isNaN(propB))) return false;
			} else return false;
		}
	}
	if (Object.getOwnPropertySymbols !== void 0) {
		const symbolsA = Object.getOwnPropertySymbols(valA);
		if (symbolsA.length > 0) {
			if (symbolsA.length !== Object.getOwnPropertySymbols(valB).length) return false;
			for (let i = 0; i < symbolsA.length; i++) {
				const sym = symbolsA[i];
				if (!(sym in valB) || !deepEqual(valA[sym], valB[sym], visited)) return false;
			}
		}
	}
	return true;
}
//#endregion
//#region node_modules/.pnpm/json-parse-safe@2.0.0/node_modules/json-parse-safe/index.js
var require_json_parse_safe = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	module.exports = JSONParse;
	function JSONParse(text, reviver) {
		try {
			return { value: JSON.parse(text, reviver) };
		} catch (ex) {
			return { error: ex };
		}
	}
}));
//#endregion
//#region node_modules/.pnpm/decode-utf8@1.0.1/node_modules/decode-utf8/index.js
var require_decode_utf8 = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	function toUint8Array(input) {
		if (input instanceof Uint8Array) return input;
		if (input instanceof ArrayBuffer) return new Uint8Array(input);
		throw new TypeError("Expected \"input\" to be an ArrayBuffer or Uint8Array");
	}
	module.exports = function decodeUtf8(input) {
		const data = toUint8Array(input);
		const size = data.length;
		let result = "";
		for (let index = 0; index < size; index++) {
			let byte1 = data[index];
			if (byte1 < 128) {
				result += String.fromCodePoint(byte1);
				continue;
			}
			if ((byte1 & 224) === 192) {
				let byte2 = data[++index] & 63;
				result += String.fromCodePoint((byte1 & 31) << 6 | byte2);
				continue;
			}
			if ((byte1 & 240) === 224) {
				let byte2 = data[++index] & 63;
				let byte3 = data[++index] & 63;
				result += String.fromCodePoint((byte1 & 15) << 12 | byte2 << 6 | byte3);
				continue;
			}
			if ((byte1 & 248) === 240) {
				let byte2 = data[++index] & 63;
				let byte3 = data[++index] & 63;
				let byte4 = data[++index] & 63;
				result += String.fromCodePoint((byte1 & 7) << 18 | byte2 << 12 | byte3 << 6 | byte4);
				continue;
			}
		}
		return result;
	};
}));
//#endregion
//#region src/js/utils/plist.ts
var import_json_parse_safe = /* @__PURE__ */ __toESM(require_json_parse_safe(), 1);
var import_decode_utf8 = /* @__PURE__ */ __toESM(require_decode_utf8(), 1);
function plistValueToString(rawValue) {
	return Buffer$1.isBuffer(rawValue) ? (0, import_decode_utf8.default)(rawValue) : String(rawValue);
}
function getPlistShortcutUtils({ plistPath, modifierMaskKey, modifierType, keycodeKey }) {
	function readPlist() {
		return parseBplist(fs.readFileSync(plistPath));
	}
	function createUpdatedPlist(writes, options) {
		const overwrite = options?.overwrite ?? false;
		const plist = readPlist();
		if (!plist) throw new Error("plist root is not an object");
		let appliedWrites = [];
		for (const write of writes) {
			const { shortcut, property, propertyType } = write;
			const parts = shortcut.split("+");
			const key = parts.at(-1);
			const modifiers = parts.slice(0, -1);
			const mask = modifierType === "carbon" ? keystringsToCarbonModifierMask(modifiers) : keystringsToModifierMask(modifiers);
			const code = key in KeyMappingCode ? KeyMappingCode[key] : null;
			if (code === null) throw new Error(`Key "${key}" not found in key mapping`);
			const keymap = getKeyMapByCode(code);
			if (!keymap?.code) throw new Error(`Key "${key}" with code "${code}" not found in key mapping`);
			const object = {
				[modifierMaskKey]: mask,
				[keycodeKey]: keymap.mac
			};
			if (fastIsEqual(plist[property], object)) continue;
			if (plist[property] && !overwrite) {
				console.warn("Skipping write for property \"%s\" because it already exists and overwrite is false", property);
				continue;
			}
			const stringValue = JSON.stringify(object);
			plist[property] = propertyType === "string" ? stringValue : new Uint8Array(Buffer$1.from(stringValue, "utf8"));
			appliedWrites.push({
				property,
				propertyType,
				shortcut
			});
		}
		return {
			updatedPlist: plist,
			appliedWrites
		};
	}
	function buildHandler() {
		const plist = readPlist();
		return function handler(property) {
			const rawValue = plist?.[property];
			if (!rawValue) return false;
			const result = (0, import_json_parse_safe.default)(plistValueToString(rawValue));
			if ("error" in result) return false;
			const value = result.value;
			const keys = modifierType === "carbon" ? carbonModifiersToKeystrings(value[modifierMaskKey]) : modifiersToKeystrings(value[modifierMaskKey]);
			const keymap = getKeyMap({
				kind: "mac",
				code: value[keycodeKey]
			});
			if (!keymap?.code) return false;
			keys.push(keymap.code);
			tap(keys.join("+"));
			return true;
		};
	}
	return {
		createUpdatedPlist,
		buildHandler,
		readPlist
	};
}
//#endregion
//#region src/js/utils/global.ts
/**
Ensures that global hotkeys are registered.

Returns a list of global hotkeys.
*/
function ensureGlobalHotkeys(globalChords, { bundleId, getHotkeyId }) {
	return Object.entries(globalChords).flatMap(([sequence, chord]) => {
		if (!chord) return [];
		const hotkeyId = getHotkeyId(chord);
		let isNew = true;
		let shortcut = getGlobalHotkey(bundleId, hotkeyId);
		if (!shortcut) {
			isNew = false;
			shortcut = registerGlobalHotkey(bundleId, hotkeyId);
		}
		if (shortcut === void 0) {
			console.warn(`Failed to register global hotkey for ${bundleId} ${hotkeyId}`);
			return [];
		}
		return [{
			chord,
			sequence,
			shortcut,
			isNew
		}];
	});
}
//#endregion
//#region node_modules/.pnpm/nullthrows-es@1.0.1/node_modules/nullthrows-es/build/nullthrows.js
/**
* Enforces the given value to be neither `null` nor `undefined` and throws a {@link TypeError}
* otherwise.
* @param value the value to enforce not to be `null` or `undefined`
* @param message an optional error message to use in the thrown `TypeError` if the given value is
* `null` or `undefined`
* @returns the given value if it is neither `null` nor `undefined`
* @throws {@link TypeError} if the given value is `null` or `undefined`
*/
function nullthrows(value, message) {
	if (value != null) return value;
	throw new TypeError(message !== null && message !== void 0 ? message : `Expected value not to be null or undefined but got ${value}`);
}
//#endregion
//#region node_modules/.pnpm/filter-obj@6.1.0/node_modules/filter-obj/index.js
const isSet = (input) => Object.prototype.toString.call(input) === "[object Set]";
function includeKeys(object, predicate) {
	const result = {};
	if (Array.isArray(predicate) || isSet(predicate)) for (const key of predicate) {
		const descriptor = Object.getOwnPropertyDescriptor(object, key);
		if (!descriptor?.enumerable) continue;
		Object.defineProperty(result, key, descriptor);
	}
	else for (const key of Reflect.ownKeys(object)) {
		const descriptor = Object.getOwnPropertyDescriptor(object, key);
		if (!descriptor?.enumerable) continue;
		const value = object[key];
		if (predicate(key, value, object)) Object.defineProperty(result, key, descriptor);
	}
	return result;
}
//#endregion
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
//#region node_modules/.pnpm/@stdlib+utils-noop@0.2.3/node_modules/@stdlib/utils-noop/lib/main.js
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/
var require_main = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	/**
	* No operation.
	*
	* @example
	* noop();
	* // ...does nothing.
	*/
	function noop() {}
	module.exports = noop;
}));
//#endregion
//#region src/js/utils/plist-handler.ts
var import_lib = /* @__PURE__ */ __toESM((/* @__PURE__ */ __commonJSMin(((exports, module) => {
	module.exports = require_main();
})))(), 1);
function buildPlistHandler(context, tildepath, { globalPrefix, propertyType, keycodeKey, modifierMaskKey, modifierType }) {
	const plistPath = untildify(tildepath);
	if (!exists(plistPath)) return import_lib.default;
	const writes = ensureGlobalHotkeys(includeKeys(context.chordsFile.chords, (sequence) => typeof globalPrefix === "string" ? sequence.startsWith(globalPrefix) : globalPrefix.test(sequence)), {
		bundleId: context.chordsFileAppId,
		getHotkeyId: (chord) => nullthrows(chord["emit:hotkey"]?.[0])
	}).map(({ chord, shortcut }) => ({
		property: nullthrows(chord.args?.[0]),
		propertyType,
		shortcut
	}));
	const { buildHandler, createUpdatedPlist } = getPlistShortcutUtils({
		plistPath: untildify(tildepath),
		modifierMaskKey,
		keycodeKey,
		modifierType
	});
	if (createUpdatedPlist(writes, { overwrite: false }).appliedWrites.length > 0) {
		setAppNeedsRelaunch(context.chordsFileAppId, true);
		const unregister = onAppTerminate(context.chordsFileAppId, () => {
			const { updatedPlist } = createUpdatedPlist(writes, { overwrite: true });
			fs.writeFileSync(plistPath, serializeBplist(updatedPlist));
			unregister();
		});
	}
	return buildHandler();
}
//#endregion
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
