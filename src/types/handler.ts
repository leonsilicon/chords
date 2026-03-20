import type { Promisable } from "type-fest";

export type BuildHandler = (meta: ImportMeta, ...args: any[]) => Promisable<(...args: any[]) => any>;
