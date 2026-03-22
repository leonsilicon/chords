#!/usr/bin/env bun
import CDP from "chrome-remote-interface";
import getStdin from "get-stdin";
import jquerySource from "jquery-as-string";

const targets = await CDP.List({ port: 9222 });
const target = targets.find((t) => t.type === "page" && t.url.includes("index.html"));
if (!target) throw new Error("No page target found");
const stdin = await getStdin();
const client = await CDP({ target });
const { Runtime } = client;
await Runtime.enable();

// inject + run
const { result, exceptionDetails } = await Runtime.evaluate({
  expression: `
    ${jquerySource}
    ${stdin}
  `,
  awaitPromise: true,
  returnByValue: true,
});

await client.close();
if (exceptionDetails) {
  console.error("Evaluation failed:", exceptionDetails);
  process.exit(1);
} else {
  process.stdout.write(JSON.stringify(result.value));
  process.exit(0);
}
