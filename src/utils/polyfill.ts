// bplist-parser needs TextEncoder
import "@kayahr/text-encoding/encodings/utf-8";
import "@kayahr/text-encoding/encodings/utf-16";
import { TextDecoder, TextEncoder } from "@kayahr/text-encoding/no-encodings";

globalThis.TextEncoder = TextEncoder as unknown as typeof globalThis.TextEncoder;
globalThis.TextDecoder = TextDecoder as unknown as typeof globalThis.TextDecoder;
