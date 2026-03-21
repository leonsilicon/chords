import "@jxa/global-type";
import { run } from "jxa-run-compat";
import type { BuildHandler } from "../types/handler.ts";

export default (async function buildMenuHandler(meta, processName: string) {
  return function menu(menuBarItem: string, menuItems: string[]) {
    return run(
      (processName: string, menuBarItem: string, menuItems: string[]) => {
        const log = (...args: any[]) => {
          console.log("[JXA]", ...args);
        };

        const assertExists = (obj: any, label: string) => {
          try {
            if (!obj || (typeof obj.exists === "function" && !obj.exists())) {
              throw new Error(`Missing: ${label}`);
            }
            log("OK:", label);
            return obj;
          } catch (e) {
            throw new Error(`❌ Failed at: ${label}\n${e}`);
          }
        };

        const se = Application("System Events");
        const app = Application(processName);

        log("Activating app:", processName);
        app.activate();

        const proc = assertExists(se.processes.byName(processName), `process "${processName}"`);

        const menuBar = assertExists(proc.menuBars[0], "menuBars[0]");

        const menuBarItemRef = assertExists(
          menuBar.menuBarItems.byName(menuBarItem),
          `menuBarItem "${menuBarItem}"`,
        );

        let current = menuBarItemRef;

        for (let i = 0; i < menuItems.length; i++) {
          const name = menuItems[i];
          log(`Traversing -> "${name}"`);

          const menu = assertExists(current.menus[0], `menus[0] for "${name}"`);

          const next = assertExists(menu.menuItems.byName(name), `menuItem "${name}"`);

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
