import * as std from "qjs:std";

export function upsertBlock(
  path: string,
  newContent: string,
  startMarker = "# START",
  endMarker = "# END"
) {
  let existing = std.loadFile(path)?.toString() ?? "";

  const block = `${startMarker}\n${newContent}\n${endMarker}`;

  const startIndex = existing.indexOf(startMarker);
  const endIndex = existing.indexOf(endMarker);

  let updated: string;

  if (startIndex !== -1 && endIndex !== -1 && endIndex >= startIndex) {
    const endOfMarker = endIndex + endMarker.length;
    updated =
      existing.slice(0, startIndex) +
      block +
      existing.slice(endOfMarker);
  } else {
    if (existing !== "" && !existing.endsWith("\n")) {
      existing += "\n";
    }

    updated = `${existing}\n${block}\n`;
  }

  std.writeFile(path, updated);
}
