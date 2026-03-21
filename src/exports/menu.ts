import "@jxa/global-type";
import { run } from "jxa-run-compat";
import type { BuildHandler } from "../types/handler.ts";

export default (async function buildMenuHandler(meta, processName: string) {
  return function menu(menuBarItem: string, menuItems: string[]) {
    return run(
      (processName: string, menuBarItem: string, menuItems: string[]) => {
        const se = Application("System Events");
        const am = Application(processName);

        am.activate();

        const proc = se.processes[processName];

        let current = proc.menuBars[0].menuBarItems[menuBarItem];

        for (let i = 0; i < menuItems.length; i++) {
          const name = menuItems[i];

          const next = current.menus[0].menuItems[name];

          if (i === menuItems.length - 1) {
            next.click();
          } else {
            current = next;
          }
        }
      },
      processName,
      menuBarItem,
      menuItems,
    );
  };
} satisfies BuildHandler);
