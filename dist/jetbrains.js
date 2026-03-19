// @bun
// src/exports/jetbrains.ts
import * as fs from "fs";
import * as process from "process";
import * as childProcess from "child_process";

// node_modules/outdent/lib-module/index.js
function noop() {
  var args = [];
  for (var _i = 0;_i < arguments.length; _i++) {
    args[_i] = arguments[_i];
  }
}
function createWeakMap() {
  if (typeof WeakMap !== "undefined") {
    return new WeakMap;
  } else {
    return fakeSetOrMap();
  }
}
function fakeSetOrMap() {
  return {
    add: noop,
    delete: noop,
    get: noop,
    set: noop,
    has: function(k) {
      return false;
    }
  };
}
var hop = Object.prototype.hasOwnProperty;
var has = function(obj, prop) {
  return hop.call(obj, prop);
};
function extend(target, source) {
  for (var prop in source) {
    if (has(source, prop)) {
      target[prop] = source[prop];
    }
  }
  return target;
}
var reLeadingNewline = /^[ \t]*(?:\r\n|\r|\n)/;
var reTrailingNewline = /(?:\r\n|\r|\n)[ \t]*$/;
var reStartsWithNewlineOrIsEmpty = /^(?:[\r\n]|$)/;
var reDetectIndentation = /(?:\r\n|\r|\n)([ \t]*)(?:[^ \t\r\n]|$)/;
var reOnlyWhitespaceWithAtLeastOneNewline = /^[ \t]*[\r\n][ \t\r\n]*$/;
function _outdentArray(strings, firstInterpolatedValueSetsIndentationLevel, options) {
  var indentationLevel = 0;
  var match = strings[0].match(reDetectIndentation);
  if (match) {
    indentationLevel = match[1].length;
  }
  var reSource = "(\\r\\n|\\r|\\n).{0," + indentationLevel + "}";
  var reMatchIndent = new RegExp(reSource, "g");
  if (firstInterpolatedValueSetsIndentationLevel) {
    strings = strings.slice(1);
  }
  var { newline, trimLeadingNewline, trimTrailingNewline } = options;
  var normalizeNewlines = typeof newline === "string";
  var l = strings.length;
  var outdentedStrings = strings.map(function(v, i) {
    v = v.replace(reMatchIndent, "$1");
    if (i === 0 && trimLeadingNewline) {
      v = v.replace(reLeadingNewline, "");
    }
    if (i === l - 1 && trimTrailingNewline) {
      v = v.replace(reTrailingNewline, "");
    }
    if (normalizeNewlines) {
      v = v.replace(/\r\n|\n|\r/g, function(_) {
        return newline;
      });
    }
    return v;
  });
  return outdentedStrings;
}
function concatStringsAndValues(strings, values) {
  var ret = "";
  for (var i = 0, l = strings.length;i < l; i++) {
    ret += strings[i];
    if (i < l - 1) {
      ret += values[i];
    }
  }
  return ret;
}
function isTemplateStringsArray(v) {
  return has(v, "raw") && has(v, "length");
}
function createInstance(options) {
  var arrayAutoIndentCache = createWeakMap();
  var arrayFirstInterpSetsIndentCache = createWeakMap();
  function outdent(stringsOrOptions) {
    var values = [];
    for (var _i = 1;_i < arguments.length; _i++) {
      values[_i - 1] = arguments[_i];
    }
    if (isTemplateStringsArray(stringsOrOptions)) {
      var strings = stringsOrOptions;
      var firstInterpolatedValueSetsIndentationLevel = (values[0] === outdent || values[0] === defaultOutdent) && reOnlyWhitespaceWithAtLeastOneNewline.test(strings[0]) && reStartsWithNewlineOrIsEmpty.test(strings[1]);
      var cache = firstInterpolatedValueSetsIndentationLevel ? arrayFirstInterpSetsIndentCache : arrayAutoIndentCache;
      var renderedArray = cache.get(strings);
      if (!renderedArray) {
        renderedArray = _outdentArray(strings, firstInterpolatedValueSetsIndentationLevel, options);
        cache.set(strings, renderedArray);
      }
      if (values.length === 0) {
        return renderedArray[0];
      }
      var rendered = concatStringsAndValues(renderedArray, firstInterpolatedValueSetsIndentationLevel ? values.slice(1) : values);
      return rendered;
    } else {
      return createInstance(extend(extend({}, options), stringsOrOptions || {}));
    }
  }
  var fullOutdent = extend(outdent, {
    string: function(str) {
      return _outdentArray([str], false, options)[0];
    }
  });
  return fullOutdent;
}
var defaultOutdent = createInstance({
  trimLeadingNewline: true,
  trimTrailingNewline: true
});
if (typeof module_lib_module !== "undefined") {
  try {
    module_lib_module.exports = defaultOutdent;
    Object.defineProperty(defaultOutdent, "__esModule", { value: true });
    defaultOutdent.default = defaultOutdent;
    defaultOutdent.outdent = defaultOutdent;
  } catch (e) {}
}

// src/exports/jetbrains.ts
function createAction(ideBinPath) {
  return function action(commandId) {
    const tmp = process.env.TMPDIR ?? "/tmp";
    const id = Math.random();
    const scriptPath = `${tmp}/jetbrains_action_${id}.groovy`;
    const resultPath = `${tmp}/jetbrains_action_${id}.txt`;
    const script = defaultOutdent`
    import com.intellij.openapi.actionSystem.ActionManager

    def actionManager = ActionManager.getInstance()
    def resultFile = new File(${JSON.stringify(resultPath)})

    IDE.application.invokeAndWait {
      try {
        def action = actionManager.getAction(${JSON.stringify(commandId)})
        if (action == null) {
          resultFile.text = "0"
          return
        }

        def result = actionManager.tryToExecute(action, null, null, null, false)
        resultFile.text = result.rejected ? "0" : "1"
      } catch (Throwable ignored) {
        resultFile.text = "0"
      }
    }`;
    fs.writeFileSync(scriptPath, script);
    childProcess.execFileSync(ideBinPath, ["ideScript", scriptPath]);
    const result = fs.readFileSync(resultPath, "utf8");
    fs.unlinkSync(scriptPath);
    fs.unlinkSync(resultPath);
    return result == "1";
  };
}
export {
  createAction
};
