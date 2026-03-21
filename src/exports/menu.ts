import "@jxa/global-type";
import { run } from "jxa-run-compat";
import type { BuildHandler } from "../types/handler.ts";
// Can't use because it makes the argument list too long
// import anyAsciiJson from "any-ascii-json";

export default (async function buildMenuHandler(meta, processName: string) {
  return function menu(menuBarItem: string, menuItems: string[]) {
    return run(
      (processName: string, menuBarItem: string, menuItems: string[]) => {
        const log = (...args: any[]) => {
          console.log("[JXA]", ...args);
        };

        const normalize = (s: string) =>
          s
            .normalize("NFKD")
            .replace(/[\u0300-\u036f]/g, "")
            // remove invisible / formatting chars
            .replace(/[\u200B-\u200D\uFEFF]/g, "") // zero-width
            .replace(/[\u202A-\u202E]/g, "") // bidi control
            .toLowerCase()
            .trim();

        const findByName = (collection: any, target: string, label: string) => {
          const normTarget = normalize(target);
          const items = collection();

          for (let i = 0; i < items.length; i++) {
            try {
              const raw = items[i].name();
              const norm = normalize(raw);

              if (norm === normTarget) {
                log(`Matched ${label}:`, `"${raw}"`);
                return items[i];
              }
            } catch {}
          }

          // debug dump if not found
          log(`❌ Available ${label}s:`);
          for (let i = 0; i < items.length; i++) {
            try {
              log("-", `"${items[i].name()}"`);
            } catch {}
          }

          throw new Error(`Missing: ${label} "${target}"`);
        };

        const assertExists = (obj: any, label: string) => {
          if (!obj) throw new Error(`❌ Failed at: ${label}`);
          log("OK:", label);
          return obj;
        };

        const se = Application("System Events");
        const app = Application(processName);

        log("Activating app:", processName);
        app.activate();
        delay(0.1);

        const proc = assertExists(se.processes.whose({ frontmost: true })[0], "frontmost process");

        log("Frontmost process:", proc.name());

        const menuBar = assertExists(proc.menuBars[0], "menuBars[0]");

        const menuBarItemRef = findByName(menuBar.menuBarItems, menuBarItem, "menuBarItem");

        let current = menuBarItemRef;

        for (let i = 0; i < menuItems.length; i++) {
          const name = menuItems[i]!;
          log(`Traversing -> "${name}"`);

          const menu = assertExists(current.menus[0], `menus[0] for "${name}"`);

          const next = findByName(menu.menuItems, name, "menuItem");

          if (i === menuItems.length - 1) {
            log(`Clicking "${name}"`);
            next.click();
          } else {
            current = next;
          }
        }

        log("Done");
      },
      processName,
      menuBarItem,
      menuItems,
    );
  };
} satisfies BuildHandler);
