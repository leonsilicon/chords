import puppeteer from "puppeteer-core";
import type { BuildHandler } from "#/types/handler.ts";

export default (function createBrainfmHandler() {
  return () => {
    console.log(puppeteer.default);
  };
} satisfies BuildHandler);
