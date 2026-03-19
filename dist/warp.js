// @bun
// src/utils/file.ts
import { readFileSync, writeFileSync, statSync } from "fs";
function upsertBlock(path, newContent, startMarker = "# START", endMarker = "# END") {
  let existing = readFileSync(path, "utf8") ?? "";
  const block = `${startMarker}
${newContent}
${endMarker}`;
  const startIndex = existing.indexOf(startMarker);
  const endIndex = existing.indexOf(endMarker);
  let updated;
  if (startIndex !== -1 && endIndex !== -1 && endIndex >= startIndex) {
    const endOfMarker = endIndex + endMarker.length;
    updated = existing.slice(0, startIndex) + block + existing.slice(endOfMarker);
  } else {
    if (existing !== "" && !existing.endsWith(`
`)) {
      existing += `
`;
    }
    updated = `${existing}
${block}
`;
  }
  writeFileSync(path, updated);
}
function exists(path) {
  try {
    statSync(path);
    return true;
  } catch (err) {
    if (err.code === "ENOENT")
      return false;
    throw err;
  }
}

// node_modules/.pnpm/balanced-match@4.0.4/node_modules/balanced-match/dist/esm/index.js
var balanced = (a, b, str) => {
  const ma = a instanceof RegExp ? maybeMatch(a, str) : a;
  const mb = b instanceof RegExp ? maybeMatch(b, str) : b;
  const r = ma !== null && mb != null && range(ma, mb, str);
  return r && {
    start: r[0],
    end: r[1],
    pre: str.slice(0, r[0]),
    body: str.slice(r[0] + ma.length, r[1]),
    post: str.slice(r[1] + mb.length)
  };
};
var maybeMatch = (reg, str) => {
  const m = str.match(reg);
  return m ? m[0] : null;
};
var range = (a, b, str) => {
  let begs, beg, left, right = undefined, result;
  let ai = str.indexOf(a);
  let bi = str.indexOf(b, ai + 1);
  let i = ai;
  if (ai >= 0 && bi > 0) {
    if (a === b) {
      return [ai, bi];
    }
    begs = [];
    left = str.length;
    while (i >= 0 && !result) {
      if (i === ai) {
        begs.push(i);
        ai = str.indexOf(a, i + 1);
      } else if (begs.length === 1) {
        const r = begs.pop();
        if (r !== undefined)
          result = [r, bi];
      } else {
        beg = begs.pop();
        if (beg !== undefined && beg < left) {
          left = beg;
          right = bi;
        }
        bi = str.indexOf(b, i + 1);
      }
      i = ai < bi && ai >= 0 ? ai : bi;
    }
    if (begs.length && right !== undefined) {
      result = [left, right];
    }
  }
  return result;
};

// node_modules/.pnpm/brace-expansion@5.0.4/node_modules/brace-expansion/dist/esm/index.js
var escSlash = "\x00SLASH" + Math.random() + "\x00";
var escOpen = "\x00OPEN" + Math.random() + "\x00";
var escClose = "\x00CLOSE" + Math.random() + "\x00";
var escComma = "\x00COMMA" + Math.random() + "\x00";
var escPeriod = "\x00PERIOD" + Math.random() + "\x00";
var escSlashPattern = new RegExp(escSlash, "g");
var escOpenPattern = new RegExp(escOpen, "g");
var escClosePattern = new RegExp(escClose, "g");
var escCommaPattern = new RegExp(escComma, "g");
var escPeriodPattern = new RegExp(escPeriod, "g");
var slashPattern = /\\\\/g;
var openPattern = /\\{/g;
var closePattern = /\\}/g;
var commaPattern = /\\,/g;
var periodPattern = /\\\./g;
var EXPANSION_MAX = 1e5;
function numeric(str) {
  return !isNaN(str) ? parseInt(str, 10) : str.charCodeAt(0);
}
function escapeBraces(str) {
  return str.replace(slashPattern, escSlash).replace(openPattern, escOpen).replace(closePattern, escClose).replace(commaPattern, escComma).replace(periodPattern, escPeriod);
}
function unescapeBraces(str) {
  return str.replace(escSlashPattern, "\\").replace(escOpenPattern, "{").replace(escClosePattern, "}").replace(escCommaPattern, ",").replace(escPeriodPattern, ".");
}
function parseCommaParts(str) {
  if (!str) {
    return [""];
  }
  const parts = [];
  const m = balanced("{", "}", str);
  if (!m) {
    return str.split(",");
  }
  const { pre, body, post } = m;
  const p = pre.split(",");
  p[p.length - 1] += "{" + body + "}";
  const postParts = parseCommaParts(post);
  if (post.length) {
    p[p.length - 1] += postParts.shift();
    p.push.apply(p, postParts);
  }
  parts.push.apply(parts, p);
  return parts;
}
function expand(str, options = {}) {
  if (!str) {
    return [];
  }
  const { max = EXPANSION_MAX } = options;
  if (str.slice(0, 2) === "{}") {
    str = "\\{\\}" + str.slice(2);
  }
  return expand_(escapeBraces(str), max, true).map(unescapeBraces);
}
function embrace(str) {
  return "{" + str + "}";
}
function isPadded(el) {
  return /^-?0\d/.test(el);
}
function lte(i, y) {
  return i <= y;
}
function gte(i, y) {
  return i >= y;
}
function expand_(str, max, isTop) {
  const expansions = [];
  const m = balanced("{", "}", str);
  if (!m)
    return [str];
  const pre = m.pre;
  const post = m.post.length ? expand_(m.post, max, false) : [""];
  if (/\$$/.test(m.pre)) {
    for (let k = 0;k < post.length && k < max; k++) {
      const expansion = pre + "{" + m.body + "}" + post[k];
      expansions.push(expansion);
    }
  } else {
    const isNumericSequence = /^-?\d+\.\.-?\d+(?:\.\.-?\d+)?$/.test(m.body);
    const isAlphaSequence = /^[a-zA-Z]\.\.[a-zA-Z](?:\.\.-?\d+)?$/.test(m.body);
    const isSequence = isNumericSequence || isAlphaSequence;
    const isOptions = m.body.indexOf(",") >= 0;
    if (!isSequence && !isOptions) {
      if (m.post.match(/,(?!,).*\}/)) {
        str = m.pre + "{" + m.body + escClose + m.post;
        return expand_(str, max, true);
      }
      return [str];
    }
    let n;
    if (isSequence) {
      n = m.body.split(/\.\./);
    } else {
      n = parseCommaParts(m.body);
      if (n.length === 1 && n[0] !== undefined) {
        n = expand_(n[0], max, false).map(embrace);
        if (n.length === 1) {
          return post.map((p) => m.pre + n[0] + p);
        }
      }
    }
    let N;
    if (isSequence && n[0] !== undefined && n[1] !== undefined) {
      const x = numeric(n[0]);
      const y = numeric(n[1]);
      const width = Math.max(n[0].length, n[1].length);
      let incr = n.length === 3 && n[2] !== undefined ? Math.abs(numeric(n[2])) : 1;
      let test = lte;
      const reverse = y < x;
      if (reverse) {
        incr *= -1;
        test = gte;
      }
      const pad = n.some(isPadded);
      N = [];
      for (let i = x;test(i, y); i += incr) {
        let c;
        if (isAlphaSequence) {
          c = String.fromCharCode(i);
          if (c === "\\") {
            c = "";
          }
        } else {
          c = String(i);
          if (pad) {
            const need = width - c.length;
            if (need > 0) {
              const z = new Array(need + 1).join("0");
              if (i < 0) {
                c = "-" + z + c.slice(1);
              } else {
                c = z + c;
              }
            }
          }
        }
        N.push(c);
      }
    } else {
      N = [];
      for (let j = 0;j < n.length; j++) {
        N.push.apply(N, expand_(n[j], max, false));
      }
    }
    for (let j = 0;j < N.length; j++) {
      for (let k = 0;k < post.length && expansions.length < max; k++) {
        const expansion = pre + N[j] + post[k];
        if (!isTop || isSequence || expansion) {
          expansions.push(expansion);
        }
      }
    }
  }
  return expansions;
}

// node_modules/.pnpm/array-uniq@3.0.0/node_modules/array-uniq/index.js
function arrayUniq(array) {
  return [...new Set(array)];
}

// src/utils/keybinds.ts
function generateSyntheticKeybinds(commands, patterns) {
  const availableKeybinds = patterns.flatMap((pattern) => expand(pattern));
  const keybinds = arrayUniq(availableKeybinds);
  const cmds = arrayUniq(commands);
  return Object.fromEntries(cmds.map((cmd, i) => [cmd, keybinds[i]]));
}

// src/exports/warp.ts
import { writeFileSync as writeFileSync2 } from "fs";
function extractCommands(chords) {
  const result = [];
  for (const chord of Object.values(chords ?? {})) {
    if (chord?.args?.[0] && !chord.shortcut) {
      result.push(chord.args[0]);
    }
  }
  return result;
}
function normalizeKeybind(k) {
  return String(k).replace(/\+/g, "-");
}
function quote(str) {
  return `"${String(str).replace(/"/g, "\\\"")}"`;
}
async function createCommand(chords) {
  const commands = extractCommands(chords);
  const syntheticKeybinds = generateSyntheticKeybinds(commands, [
    "opt+{0..9}",
    "opt+cmd+{0..9}",
    "opt+cmd+ctrl+{0..9}",
    "opt+cmd+ctrl+shift+{0..9}",
    "cmd+ctrl+{0..9}",
    "cmd+ctrl+shift+{0..9}",
    "ctrl+shift+{0..9}",
    "opt+shift+{0..9}",
    "cmd+shift+{0..9}"
  ].flatMap((pattern) => expand(pattern)));
  const sortedCommands = Object.keys(syntheticKeybinds).sort();
  let keybindingsYaml = "";
  for (const cmd of sortedCommands) {
    const keybind = syntheticKeybinds[cmd];
    keybindingsYaml += `${quote(cmd)}: ${normalizeKeybind(keybind)}
`;
  }
  const home = process.env.HOME || "~";
  const keybindingsPath = `${home}/.warp/keybindings.yaml`;
  if (exists(keybindingsPath)) {
    writeFileSync2(keybindingsPath, "");
  }
  upsertBlock(keybindingsPath, keybindingsYaml, "# >>> chords:auto:start", "# >>> chords:auto:end");
  const commandToKey = {};
  for (const [cmd, key] of Object.entries(syntheticKeybinds)) {
    commandToKey[cmd] = normalizeKeybind(key);
  }
  return function(cmd) {
    console.log(cmd);
    const keybind = commandToKey[cmd];
    if (!keybind) {
      return false;
    }
    tap(keybind.replace(/-/g, "+"));
    return true;
  };
}
export {
  createCommand
};
