// include: shell.js
// include: minimum_runtime_check.js
(function() {
  // "30.0.0" -> 300000
  function humanReadableVersionToPacked(str) {
    str = str.split("-")[0];
    // Remove any trailing part from e.g. "12.53.3-alpha"
    let vers = str.split(".").slice(0, 3);
    while (vers.length < 3) vers.push("00");
    vers = vers.map((n, i, arr) => n.padStart(2, "0"));
    return vers.join("");
  }
  // 300000 -> "30.0.0"
  const packedVersionToHumanReadable = n => [ n / 1e4 | 0, (n / 100 | 0) % 100, n % 100 ].join(".");
  const TARGET_NOT_SUPPORTED = 2147483647;
  // Note: We use a typeof check here instead of optional chaining using
  // globalThis because older browsers might not have globalThis defined.
  // We skip the node version checking when running on Bun/Deno since the node
  // version they report doesn't seem to be useful.
  if (typeof process !== "undefined" && !process.versions?.bun && typeof Deno === "undefined") {
    const currentNodeVersion = process.versions?.node ? humanReadableVersionToPacked(process.versions.node) : TARGET_NOT_SUPPORTED;
    if (currentNodeVersion < TARGET_NOT_SUPPORTED) {
      throw new Error("not compiled for this environment (did you build to HTML and try to run it not on the web, or set ENVIRONMENT to something - like node - and run it someplace else - like on the web?)");
    }
    if (currentNodeVersion < 2147483647) {
      throw new Error(`This emscripten-generated code requires node v${packedVersionToHumanReadable(2147483647)} (detected v${packedVersionToHumanReadable(currentNodeVersion)})`);
    }
  }
  const userAgent = typeof navigator !== "undefined" && navigator.userAgent;
  if (!userAgent) {
    return;
  }
  const currentSafariVersion = userAgent.includes("Safari/") && !userAgent.includes("Chrome/") && userAgent.match(/Version\/(\d+\.?\d*\.?\d*)/) ? humanReadableVersionToPacked(userAgent.match(/Version\/(\d+\.?\d*\.?\d*)/)[1]) : TARGET_NOT_SUPPORTED;
  if (currentSafariVersion < 15e4) {
    throw new Error(`This emscripten-generated code requires Safari v${packedVersionToHumanReadable(15e4)} (detected v${currentSafariVersion})`);
  }
  const currentFirefoxVersion = userAgent.match(/Firefox\/(\d+(?:\.\d+)?)/) ? parseFloat(userAgent.match(/Firefox\/(\d+(?:\.\d+)?)/)[1]) : TARGET_NOT_SUPPORTED;
  if (currentFirefoxVersion < 79) {
    throw new Error(`This emscripten-generated code requires Firefox v79 (detected v${currentFirefoxVersion})`);
  }
  const currentChromeVersion = userAgent.match(/Chrome\/(\d+(?:\.\d+)?)/) ? parseFloat(userAgent.match(/Chrome\/(\d+(?:\.\d+)?)/)[1]) : TARGET_NOT_SUPPORTED;
  if (currentChromeVersion < 85) {
    throw new Error(`This emscripten-generated code requires Chrome v85 (detected v${currentChromeVersion})`);
  }
})();

// end include: minimum_runtime_check.js
// The Module object: Our interface to the outside world. We import
// and export values on it. There are various ways Module can be used:
// 1. Not defined. We create it here
// 2. A function parameter, function(moduleArg) => Promise<Module>
// 3. pre-run appended it, var Module = {}; ..generated code..
// 4. External script tag defines var Module.
// We need to check if Module already exists (e.g. case 3 above).
// Substitution will be replaced with actual code on later stage of the build,
// this way Closure Compiler will not mangle it (e.g. case 4. above).
// Note that if you want to run closure, and also to use Module
// after the generated code, you will need to define   var Module = {};
// before the code. Then that object will be used in the code, and you
// can continue to use Module afterwards as well.
var Module = typeof Module !== "undefined" ? Module : {};

// Determine the runtime environment we are in. You can customize this by
// setting the ENVIRONMENT setting at compile time (see settings.js).
// Attempt to auto-detect the environment
var ENVIRONMENT_IS_WEB = !!globalThis.window;

var ENVIRONMENT_IS_WORKER = !!globalThis.WorkerGlobalScope;

// N.b. Electron.js environment is simultaneously a NODE-environment, but
// also a web environment.
var ENVIRONMENT_IS_NODE = globalThis.process?.versions?.node && globalThis.process?.type != "renderer";

var ENVIRONMENT_IS_SHELL = !ENVIRONMENT_IS_WEB && !ENVIRONMENT_IS_NODE && !ENVIRONMENT_IS_WORKER;

// --pre-jses are emitted after the Module integration code, so that they can
// refer to Module (if they choose; they can also define Module)
// include: D:/Projects/Claw2/build/web-activity/discord-activity/discord-activity.js
((() => {
  var __defProp = Object.defineProperty;
  var __export = (target, all) => {
    for (var name in all) __defProp(target, name, {
      get: all[name],
      enumerable: true
    });
  };
  // <define:CLAW_DISCORD_CONFIG>
  var define_CLAW_DISCORD_CONFIG_default = {
    clientId: "655554093682655233",
    tokenEndpoint: "/.proxy/api/discord/activity/token"
  };
  // node_modules/@discord/embedded-app-sdk/output/_virtual/_commonjsHelpers.mjs
  var commonjsGlobal = typeof globalThis !== "undefined" ? globalThis : typeof window !== "undefined" ? window : typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : {};
  function getDefaultExportFromCjs(x) {
    return x && x.__esModule && Object.prototype.hasOwnProperty.call(x, "default") ? x["default"] : x;
  }
  // node_modules/@discord/embedded-app-sdk/output/_virtual/index4.mjs
  var eventemitter3 = {
    exports: {}
  };
  // node_modules/@discord/embedded-app-sdk/output/lib/eventemitter3/index2.mjs
  var hasRequiredEventemitter3;
  function requireEventemitter3() {
    if (hasRequiredEventemitter3) return eventemitter3.exports;
    hasRequiredEventemitter3 = 1;
    (function(module) {
      var has = Object.prototype.hasOwnProperty, prefix = "~";
      function Events2() {}
      if (Object.create) {
        Events2.prototype =  Object.create(null);
        if (!(new Events2).__proto__) prefix = false;
      }
      function EE(fn, context, once) {
        this.fn = fn;
        this.context = context;
        this.once = once || false;
      }
      function addListener(emitter, event, fn, context, once) {
        if (typeof fn !== "function") {
          throw new TypeError("The listener must be a function");
        }
        var listener = new EE(fn, context || emitter, once), evt = prefix ? prefix + event : event;
        if (!emitter._events[evt]) emitter._events[evt] = listener, emitter._eventsCount++; else if (!emitter._events[evt].fn) emitter._events[evt].push(listener); else emitter._events[evt] = [ emitter._events[evt], listener ];
        return emitter;
      }
      function clearEvent(emitter, evt) {
        if (--emitter._eventsCount === 0) emitter._events = new Events2; else delete emitter._events[evt];
      }
      function EventEmitter2() {
        this._events = new Events2;
        this._eventsCount = 0;
      }
      EventEmitter2.prototype.eventNames = function eventNames() {
        var names = [], events, name;
        if (this._eventsCount === 0) return names;
        for (name in events = this._events) {
          if (has.call(events, name)) names.push(prefix ? name.slice(1) : name);
        }
        if (Object.getOwnPropertySymbols) {
          return names.concat(Object.getOwnPropertySymbols(events));
        }
        return names;
      };
      EventEmitter2.prototype.listeners = function listeners(event) {
        var evt = prefix ? prefix + event : event, handlers = this._events[evt];
        if (!handlers) return [];
        if (handlers.fn) return [ handlers.fn ];
        for (var i = 0, l = handlers.length, ee = new Array(l); i < l; i++) {
          ee[i] = handlers[i].fn;
        }
        return ee;
      };
      EventEmitter2.prototype.listenerCount = function listenerCount(event) {
        var evt = prefix ? prefix + event : event, listeners = this._events[evt];
        if (!listeners) return 0;
        if (listeners.fn) return 1;
        return listeners.length;
      };
      EventEmitter2.prototype.emit = function emit(event, a1, a2, a3, a4, a5) {
        var evt = prefix ? prefix + event : event;
        if (!this._events[evt]) return false;
        var listeners = this._events[evt], len = arguments.length, args, i;
        if (listeners.fn) {
          if (listeners.once) this.removeListener(event, listeners.fn, void 0, true);
          switch (len) {
           case 1:
            return listeners.fn.call(listeners.context), true;

           case 2:
            return listeners.fn.call(listeners.context, a1), true;

           case 3:
            return listeners.fn.call(listeners.context, a1, a2), true;

           case 4:
            return listeners.fn.call(listeners.context, a1, a2, a3), true;

           case 5:
            return listeners.fn.call(listeners.context, a1, a2, a3, a4), true;

           case 6:
            return listeners.fn.call(listeners.context, a1, a2, a3, a4, a5), true;
          }
          for (i = 1, args = new Array(len - 1); i < len; i++) {
            args[i - 1] = arguments[i];
          }
          listeners.fn.apply(listeners.context, args);
        } else {
          var length = listeners.length, j;
          for (i = 0; i < length; i++) {
            if (listeners[i].once) this.removeListener(event, listeners[i].fn, void 0, true);
            switch (len) {
             case 1:
              listeners[i].fn.call(listeners[i].context);
              break;

             case 2:
              listeners[i].fn.call(listeners[i].context, a1);
              break;

             case 3:
              listeners[i].fn.call(listeners[i].context, a1, a2);
              break;

             case 4:
              listeners[i].fn.call(listeners[i].context, a1, a2, a3);
              break;

             default:
              if (!args) for (j = 1, args = new Array(len - 1); j < len; j++) {
                args[j - 1] = arguments[j];
              }
              listeners[i].fn.apply(listeners[i].context, args);
            }
          }
        }
        return true;
      };
      EventEmitter2.prototype.on = function on(event, fn, context) {
        return addListener(this, event, fn, context, false);
      };
      EventEmitter2.prototype.once = function once(event, fn, context) {
        return addListener(this, event, fn, context, true);
      };
      EventEmitter2.prototype.removeListener = function removeListener(event, fn, context, once) {
        var evt = prefix ? prefix + event : event;
        if (!this._events[evt]) return this;
        if (!fn) {
          clearEvent(this, evt);
          return this;
        }
        var listeners = this._events[evt];
        if (listeners.fn) {
          if (listeners.fn === fn && (!once || listeners.once) && (!context || listeners.context === context)) {
            clearEvent(this, evt);
          }
        } else {
          for (var i = 0, events = [], length = listeners.length; i < length; i++) {
            if (listeners[i].fn !== fn || once && !listeners[i].once || context && listeners[i].context !== context) {
              events.push(listeners[i]);
            }
          }
          if (events.length) this._events[evt] = events.length === 1 ? events[0] : events; else clearEvent(this, evt);
        }
        return this;
      };
      EventEmitter2.prototype.removeAllListeners = function removeAllListeners(event) {
        var evt;
        if (event) {
          evt = prefix ? prefix + event : event;
          if (this._events[evt]) clearEvent(this, evt);
        } else {
          this._events = new Events2;
          this._eventsCount = 0;
        }
        return this;
      };
      EventEmitter2.prototype.off = EventEmitter2.prototype.removeListener;
      EventEmitter2.prototype.addListener = EventEmitter2.prototype.on;
      EventEmitter2.prefixed = prefix;
      EventEmitter2.EventEmitter = EventEmitter2;
      {
        module.exports = EventEmitter2;
      }
    })(eventemitter3);
    return eventemitter3.exports;
  }
  // node_modules/@discord/embedded-app-sdk/output/_virtual/index.mjs
  var eventemitter3Exports = requireEventemitter3();
  var EventEmitter =  getDefaultExportFromCjs(eventemitter3Exports);
  // node_modules/@discord/embedded-app-sdk/output/lib/zod/lib/index.mjs
  var util;
  (function(util2) {
    util2.assertEqual = val => val;
    function assertIs(_arg) {}
    util2.assertIs = assertIs;
    function assertNever(_x) {
      throw new Error;
    }
    util2.assertNever = assertNever;
    util2.arrayToEnum = items => {
      const obj = {};
      for (const item of items) {
        obj[item] = item;
      }
      return obj;
    };
    util2.getValidEnumValues = obj => {
      const validKeys = util2.objectKeys(obj).filter(k => typeof obj[obj[k]] !== "number");
      const filtered = {};
      for (const k of validKeys) {
        filtered[k] = obj[k];
      }
      return util2.objectValues(filtered);
    };
    util2.objectValues = obj => util2.objectKeys(obj).map(function(e) {
      return obj[e];
    });
    util2.objectKeys = typeof Object.keys === "function" ? obj => Object.keys(obj) : object => {
      const keys = [];
      for (const key in object) {
        if (Object.prototype.hasOwnProperty.call(object, key)) {
          keys.push(key);
        }
      }
      return keys;
    };
    util2.find = (arr, checker) => {
      for (const item of arr) {
        if (checker(item)) return item;
      }
      return void 0;
    };
    util2.isInteger = typeof Number.isInteger === "function" ? val => Number.isInteger(val) : val => typeof val === "number" && isFinite(val) && Math.floor(val) === val;
    function joinValues(array, separator = " | ") {
      return array.map(val => typeof val === "string" ? `'${val}'` : val).join(separator);
    }
    util2.joinValues = joinValues;
    util2.jsonStringifyReplacer = (_, value) => {
      if (typeof value === "bigint") {
        return value.toString();
      }
      return value;
    };
  })(util || (util = {}));
  var objectUtil;
  (function(objectUtil2) {
    objectUtil2.mergeShapes = (first, second) => ({
      ...first,
      ...second
    });
  })(objectUtil || (objectUtil = {}));
  var ZodParsedType = util.arrayToEnum([ "string", "nan", "number", "integer", "float", "boolean", "date", "bigint", "symbol", "function", "undefined", "null", "array", "object", "unknown", "promise", "void", "never", "map", "set" ]);
  var getParsedType = data => {
    const t = typeof data;
    switch (t) {
     case "undefined":
      return ZodParsedType.undefined;

     case "string":
      return ZodParsedType.string;

     case "number":
      return isNaN(data) ? ZodParsedType.nan : ZodParsedType.number;

     case "boolean":
      return ZodParsedType.boolean;

     case "function":
      return ZodParsedType.function;

     case "bigint":
      return ZodParsedType.bigint;

     case "symbol":
      return ZodParsedType.symbol;

     case "object":
      if (Array.isArray(data)) {
        return ZodParsedType.array;
      }
      if (data === null) {
        return ZodParsedType.null;
      }
      if (data.then && typeof data.then === "function" && data.catch && typeof data.catch === "function") {
        return ZodParsedType.promise;
      }
      if (typeof Map !== "undefined" && data instanceof Map) {
        return ZodParsedType.map;
      }
      if (typeof Set !== "undefined" && data instanceof Set) {
        return ZodParsedType.set;
      }
      if (typeof Date !== "undefined" && data instanceof Date) {
        return ZodParsedType.date;
      }
      return ZodParsedType.object;

     default:
      return ZodParsedType.unknown;
    }
  };
  var ZodIssueCode = util.arrayToEnum([ "invalid_type", "invalid_literal", "custom", "invalid_union", "invalid_union_discriminator", "invalid_enum_value", "unrecognized_keys", "invalid_arguments", "invalid_return_type", "invalid_date", "invalid_string", "too_small", "too_big", "invalid_intersection_types", "not_multiple_of", "not_finite" ]);
  var quotelessJson = obj => {
    const json = JSON.stringify(obj, null, 2);
    return json.replace(/"([^"]+)":/g, "$1:");
  };
  var ZodError = class _ZodError extends Error {
    constructor(issues) {
      super();
      this.issues = [];
      this.addIssue = sub => {
        this.issues = [ ...this.issues, sub ];
      };
      this.addIssues = (subs = []) => {
        this.issues = [ ...this.issues, ...subs ];
      };
      const actualProto = new.target.prototype;
      if (Object.setPrototypeOf) {
        Object.setPrototypeOf(this, actualProto);
      } else {
        this.__proto__ = actualProto;
      }
      this.name = "ZodError";
      this.issues = issues;
    }
    get errors() {
      return this.issues;
    }
    format(_mapper) {
      const mapper = _mapper || function(issue) {
        return issue.message;
      };
      const fieldErrors = {
        _errors: []
      };
      const processError = error => {
        for (const issue of error.issues) {
          if (issue.code === "invalid_union") {
            issue.unionErrors.map(processError);
          } else if (issue.code === "invalid_return_type") {
            processError(issue.returnTypeError);
          } else if (issue.code === "invalid_arguments") {
            processError(issue.argumentsError);
          } else if (issue.path.length === 0) {
            fieldErrors._errors.push(mapper(issue));
          } else {
            let curr = fieldErrors;
            let i = 0;
            while (i < issue.path.length) {
              const el = issue.path[i];
              const terminal = i === issue.path.length - 1;
              if (!terminal) {
                curr[el] = curr[el] || {
                  _errors: []
                };
              } else {
                curr[el] = curr[el] || {
                  _errors: []
                };
                curr[el]._errors.push(mapper(issue));
              }
              curr = curr[el];
              i++;
            }
          }
        }
      };
      processError(this);
      return fieldErrors;
    }
    static assert(value) {
      if (!(value instanceof _ZodError)) {
        throw new Error(`Not a ZodError: ${value}`);
      }
    }
    toString() {
      return this.message;
    }
    get message() {
      return JSON.stringify(this.issues, util.jsonStringifyReplacer, 2);
    }
    get isEmpty() {
      return this.issues.length === 0;
    }
    flatten(mapper = issue => issue.message) {
      const fieldErrors = {};
      const formErrors = [];
      for (const sub of this.issues) {
        if (sub.path.length > 0) {
          fieldErrors[sub.path[0]] = fieldErrors[sub.path[0]] || [];
          fieldErrors[sub.path[0]].push(mapper(sub));
        } else {
          formErrors.push(mapper(sub));
        }
      }
      return {
        formErrors,
        fieldErrors
      };
    }
    get formErrors() {
      return this.flatten();
    }
  };
  ZodError.create = issues => {
    const error = new ZodError(issues);
    return error;
  };
  var errorMap = (issue, _ctx) => {
    let message;
    switch (issue.code) {
     case ZodIssueCode.invalid_type:
      if (issue.received === ZodParsedType.undefined) {
        message = "Required";
      } else {
        message = `Expected ${issue.expected}, received ${issue.received}`;
      }
      break;

     case ZodIssueCode.invalid_literal:
      message = `Invalid literal value, expected ${JSON.stringify(issue.expected, util.jsonStringifyReplacer)}`;
      break;

     case ZodIssueCode.unrecognized_keys:
      message = `Unrecognized key(s) in object: ${util.joinValues(issue.keys, ", ")}`;
      break;

     case ZodIssueCode.invalid_union:
      message = `Invalid input`;
      break;

     case ZodIssueCode.invalid_union_discriminator:
      message = `Invalid discriminator value. Expected ${util.joinValues(issue.options)}`;
      break;

     case ZodIssueCode.invalid_enum_value:
      message = `Invalid enum value. Expected ${util.joinValues(issue.options)}, received '${issue.received}'`;
      break;

     case ZodIssueCode.invalid_arguments:
      message = `Invalid function arguments`;
      break;

     case ZodIssueCode.invalid_return_type:
      message = `Invalid function return type`;
      break;

     case ZodIssueCode.invalid_date:
      message = `Invalid date`;
      break;

     case ZodIssueCode.invalid_string:
      if (typeof issue.validation === "object") {
        if ("includes" in issue.validation) {
          message = `Invalid input: must include "${issue.validation.includes}"`;
          if (typeof issue.validation.position === "number") {
            message = `${message} at one or more positions greater than or equal to ${issue.validation.position}`;
          }
        } else if ("startsWith" in issue.validation) {
          message = `Invalid input: must start with "${issue.validation.startsWith}"`;
        } else if ("endsWith" in issue.validation) {
          message = `Invalid input: must end with "${issue.validation.endsWith}"`;
        } else {
          util.assertNever(issue.validation);
        }
      } else if (issue.validation !== "regex") {
        message = `Invalid ${issue.validation}`;
      } else {
        message = "Invalid";
      }
      break;

     case ZodIssueCode.too_small:
      if (issue.type === "array") message = `Array must contain ${issue.exact ? "exactly" : issue.inclusive ? `at least` : `more than`} ${issue.minimum} element(s)`; else if (issue.type === "string") message = `String must contain ${issue.exact ? "exactly" : issue.inclusive ? `at least` : `over`} ${issue.minimum} character(s)`; else if (issue.type === "number") message = `Number must be ${issue.exact ? `exactly equal to ` : issue.inclusive ? `greater than or equal to ` : `greater than `}${issue.minimum}`; else if (issue.type === "date") message = `Date must be ${issue.exact ? `exactly equal to ` : issue.inclusive ? `greater than or equal to ` : `greater than `}${new Date(Number(issue.minimum))}`; else message = "Invalid input";
      break;

     case ZodIssueCode.too_big:
      if (issue.type === "array") message = `Array must contain ${issue.exact ? `exactly` : issue.inclusive ? `at most` : `less than`} ${issue.maximum} element(s)`; else if (issue.type === "string") message = `String must contain ${issue.exact ? `exactly` : issue.inclusive ? `at most` : `under`} ${issue.maximum} character(s)`; else if (issue.type === "number") message = `Number must be ${issue.exact ? `exactly` : issue.inclusive ? `less than or equal to` : `less than`} ${issue.maximum}`; else if (issue.type === "bigint") message = `BigInt must be ${issue.exact ? `exactly` : issue.inclusive ? `less than or equal to` : `less than`} ${issue.maximum}`; else if (issue.type === "date") message = `Date must be ${issue.exact ? `exactly` : issue.inclusive ? `smaller than or equal to` : `smaller than`} ${new Date(Number(issue.maximum))}`; else message = "Invalid input";
      break;

     case ZodIssueCode.custom:
      message = `Invalid input`;
      break;

     case ZodIssueCode.invalid_intersection_types:
      message = `Intersection results could not be merged`;
      break;

     case ZodIssueCode.not_multiple_of:
      message = `Number must be a multiple of ${issue.multipleOf}`;
      break;

     case ZodIssueCode.not_finite:
      message = "Number must be finite";
      break;

     default:
      message = _ctx.defaultError;
      util.assertNever(issue);
    }
    return {
      message
    };
  };
  var overrideErrorMap = errorMap;
  function setErrorMap(map) {
    overrideErrorMap = map;
  }
  function getErrorMap() {
    return overrideErrorMap;
  }
  var makeIssue = params => {
    const {data, path, errorMaps, issueData} = params;
    const fullPath = [ ...path, ...issueData.path || [] ];
    const fullIssue = {
      ...issueData,
      path: fullPath
    };
    if (issueData.message !== void 0) {
      return {
        ...issueData,
        path: fullPath,
        message: issueData.message
      };
    }
    let errorMessage = "";
    const maps = errorMaps.filter(m => !!m).slice().reverse();
    for (const map of maps) {
      errorMessage = map(fullIssue, {
        data,
        defaultError: errorMessage
      }).message;
    }
    return {
      ...issueData,
      path: fullPath,
      message: errorMessage
    };
  };
  var EMPTY_PATH = [];
  function addIssueToContext(ctx, issueData) {
    const overrideMap = getErrorMap();
    const issue = makeIssue({
      issueData,
      data: ctx.data,
      path: ctx.path,
      errorMaps: [ ctx.common.contextualErrorMap, ctx.schemaErrorMap, overrideMap, overrideMap === errorMap ? void 0 : errorMap ].filter(x => !!x)
    });
    ctx.common.issues.push(issue);
  }
  var ParseStatus = class _ParseStatus {
    constructor() {
      this.value = "valid";
    }
    dirty() {
      if (this.value === "valid") this.value = "dirty";
    }
    abort() {
      if (this.value !== "aborted") this.value = "aborted";
    }
    static mergeArray(status, results) {
      const arrayValue = [];
      for (const s of results) {
        if (s.status === "aborted") return INVALID;
        if (s.status === "dirty") status.dirty();
        arrayValue.push(s.value);
      }
      return {
        status: status.value,
        value: arrayValue
      };
    }
    static async mergeObjectAsync(status, pairs) {
      const syncPairs = [];
      for (const pair of pairs) {
        const key = await pair.key;
        const value = await pair.value;
        syncPairs.push({
          key,
          value
        });
      }
      return _ParseStatus.mergeObjectSync(status, syncPairs);
    }
    static mergeObjectSync(status, pairs) {
      const finalObject = {};
      for (const pair of pairs) {
        const {key, value} = pair;
        if (key.status === "aborted") return INVALID;
        if (value.status === "aborted") return INVALID;
        if (key.status === "dirty") status.dirty();
        if (value.status === "dirty") status.dirty();
        if (key.value !== "__proto__" && (typeof value.value !== "undefined" || pair.alwaysSet)) {
          finalObject[key.value] = value.value;
        }
      }
      return {
        status: status.value,
        value: finalObject
      };
    }
  };
  var INVALID = Object.freeze({
    status: "aborted"
  });
  var DIRTY = value => (({
    status: "dirty",
    value
  }));
  var OK = value => (({
    status: "valid",
    value
  }));
  var isAborted = x => x.status === "aborted";
  var isDirty = x => x.status === "dirty";
  var isValid = x => x.status === "valid";
  var isAsync = x => typeof Promise !== "undefined" && x instanceof Promise;
  function __classPrivateFieldGet(receiver, state, kind, f) {
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return state.get(receiver);
  }
  function __classPrivateFieldSet(receiver, state, value, kind, f) {
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
    return state.set(receiver, value), value;
  }
  var errorUtil;
  (function(errorUtil2) {
    errorUtil2.errToObj = message => typeof message === "string" ? {
      message
    } : message || {};
    errorUtil2.toString = message => typeof message === "string" ? message : message === null || message === void 0 ? void 0 : message.message;
  })(errorUtil || (errorUtil = {}));
  var _ZodEnum_cache;
  var _ZodNativeEnum_cache;
  var ParseInputLazyPath = class {
    constructor(parent, value, path, key) {
      this._cachedPath = [];
      this.parent = parent;
      this.data = value;
      this._path = path;
      this._key = key;
    }
    get path() {
      if (!this._cachedPath.length) {
        if (this._key instanceof Array) {
          this._cachedPath.push(...this._path, ...this._key);
        } else {
          this._cachedPath.push(...this._path, this._key);
        }
      }
      return this._cachedPath;
    }
  };
  var handleResult = (ctx, result) => {
    if (isValid(result)) {
      return {
        success: true,
        data: result.value
      };
    } else {
      if (!ctx.common.issues.length) {
        throw new Error("Validation failed but no issues detected.");
      }
      return {
        success: false,
        get error() {
          if (this._error) return this._error;
          const error = new ZodError(ctx.common.issues);
          this._error = error;
          return this._error;
        }
      };
    }
  };
  function processCreateParams(params) {
    if (!params) return {};
    const {errorMap: errorMap2, invalid_type_error, required_error, description} = params;
    if (errorMap2 && (invalid_type_error || required_error)) {
      throw new Error(`Can't use "invalid_type_error" or "required_error" in conjunction with custom error map.`);
    }
    if (errorMap2) return {
      errorMap: errorMap2,
      description
    };
    const customMap = (iss, ctx) => {
      var _a, _b;
      const {message} = params;
      if (iss.code === "invalid_enum_value") {
        return {
          message: message !== null && message !== void 0 ? message : ctx.defaultError
        };
      }
      if (typeof ctx.data === "undefined") {
        return {
          message: (_a = message !== null && message !== void 0 ? message : required_error) !== null && _a !== void 0 ? _a : ctx.defaultError
        };
      }
      if (iss.code !== "invalid_type") return {
        message: ctx.defaultError
      };
      return {
        message: (_b = message !== null && message !== void 0 ? message : invalid_type_error) !== null && _b !== void 0 ? _b : ctx.defaultError
      };
    };
    return {
      errorMap: customMap,
      description
    };
  }
  var ZodType = class {
    constructor(def) {
      this.spa = this.safeParseAsync;
      this._def = def;
      this.parse = this.parse.bind(this);
      this.safeParse = this.safeParse.bind(this);
      this.parseAsync = this.parseAsync.bind(this);
      this.safeParseAsync = this.safeParseAsync.bind(this);
      this.spa = this.spa.bind(this);
      this.refine = this.refine.bind(this);
      this.refinement = this.refinement.bind(this);
      this.superRefine = this.superRefine.bind(this);
      this.optional = this.optional.bind(this);
      this.nullable = this.nullable.bind(this);
      this.nullish = this.nullish.bind(this);
      this.array = this.array.bind(this);
      this.promise = this.promise.bind(this);
      this.or = this.or.bind(this);
      this.and = this.and.bind(this);
      this.transform = this.transform.bind(this);
      this.brand = this.brand.bind(this);
      this.default = this.default.bind(this);
      this.catch = this.catch.bind(this);
      this.describe = this.describe.bind(this);
      this.pipe = this.pipe.bind(this);
      this.readonly = this.readonly.bind(this);
      this.isNullable = this.isNullable.bind(this);
      this.isOptional = this.isOptional.bind(this);
    }
    get description() {
      return this._def.description;
    }
    _getType(input) {
      return getParsedType(input.data);
    }
    _getOrReturnCtx(input, ctx) {
      return ctx || {
        common: input.parent.common,
        data: input.data,
        parsedType: getParsedType(input.data),
        schemaErrorMap: this._def.errorMap,
        path: input.path,
        parent: input.parent
      };
    }
    _processInputParams(input) {
      return {
        status: new ParseStatus,
        ctx: {
          common: input.parent.common,
          data: input.data,
          parsedType: getParsedType(input.data),
          schemaErrorMap: this._def.errorMap,
          path: input.path,
          parent: input.parent
        }
      };
    }
    _parseSync(input) {
      const result = this._parse(input);
      if (isAsync(result)) {
        throw new Error("Synchronous parse encountered promise.");
      }
      return result;
    }
    _parseAsync(input) {
      const result = this._parse(input);
      return Promise.resolve(result);
    }
    parse(data, params) {
      const result = this.safeParse(data, params);
      if (result.success) return result.data;
      throw result.error;
    }
    safeParse(data, params) {
      var _a;
      const ctx = {
        common: {
          issues: [],
          async: (_a = params === null || params === void 0 ? void 0 : params.async) !== null && _a !== void 0 ? _a : false,
          contextualErrorMap: params === null || params === void 0 ? void 0 : params.errorMap
        },
        path: (params === null || params === void 0 ? void 0 : params.path) || [],
        schemaErrorMap: this._def.errorMap,
        parent: null,
        data,
        parsedType: getParsedType(data)
      };
      const result = this._parseSync({
        data,
        path: ctx.path,
        parent: ctx
      });
      return handleResult(ctx, result);
    }
    async parseAsync(data, params) {
      const result = await this.safeParseAsync(data, params);
      if (result.success) return result.data;
      throw result.error;
    }
    async safeParseAsync(data, params) {
      const ctx = {
        common: {
          issues: [],
          contextualErrorMap: params === null || params === void 0 ? void 0 : params.errorMap,
          async: true
        },
        path: (params === null || params === void 0 ? void 0 : params.path) || [],
        schemaErrorMap: this._def.errorMap,
        parent: null,
        data,
        parsedType: getParsedType(data)
      };
      const maybeAsyncResult = this._parse({
        data,
        path: ctx.path,
        parent: ctx
      });
      const result = await ((isAsync(maybeAsyncResult) ? maybeAsyncResult : Promise.resolve(maybeAsyncResult)));
      return handleResult(ctx, result);
    }
    refine(check, message) {
      const getIssueProperties = val => {
        if (typeof message === "string" || typeof message === "undefined") {
          return {
            message
          };
        } else if (typeof message === "function") {
          return message(val);
        } else {
          return message;
        }
      };
      return this._refinement((val, ctx) => {
        const result = check(val);
        const setError = () => ctx.addIssue({
          code: ZodIssueCode.custom,
          ...getIssueProperties(val)
        });
        if (typeof Promise !== "undefined" && result instanceof Promise) {
          return result.then(data => {
            if (!data) {
              setError();
              return false;
            } else {
              return true;
            }
          });
        }
        if (!result) {
          setError();
          return false;
        } else {
          return true;
        }
      });
    }
    refinement(check, refinementData) {
      return this._refinement((val, ctx) => {
        if (!check(val)) {
          ctx.addIssue(typeof refinementData === "function" ? refinementData(val, ctx) : refinementData);
          return false;
        } else {
          return true;
        }
      });
    }
    _refinement(refinement) {
      return new ZodEffects({
        schema: this,
        typeName: ZodFirstPartyTypeKind.ZodEffects,
        effect: {
          type: "refinement",
          refinement
        }
      });
    }
    superRefine(refinement) {
      return this._refinement(refinement);
    }
    optional() {
      return ZodOptional.create(this, this._def);
    }
    nullable() {
      return ZodNullable.create(this, this._def);
    }
    nullish() {
      return this.nullable().optional();
    }
    array() {
      return ZodArray.create(this, this._def);
    }
    promise() {
      return ZodPromise.create(this, this._def);
    }
    or(option) {
      return ZodUnion.create([ this, option ], this._def);
    }
    and(incoming) {
      return ZodIntersection.create(this, incoming, this._def);
    }
    transform(transform2) {
      return new ZodEffects({
        ...processCreateParams(this._def),
        schema: this,
        typeName: ZodFirstPartyTypeKind.ZodEffects,
        effect: {
          type: "transform",
          transform: transform2
        }
      });
    }
    default(def) {
      const defaultValueFunc = typeof def === "function" ? def : () => def;
      return new ZodDefault({
        ...processCreateParams(this._def),
        innerType: this,
        defaultValue: defaultValueFunc,
        typeName: ZodFirstPartyTypeKind.ZodDefault
      });
    }
    brand() {
      return new ZodBranded({
        typeName: ZodFirstPartyTypeKind.ZodBranded,
        type: this,
        ...processCreateParams(this._def)
      });
    }
    catch(def) {
      const catchValueFunc = typeof def === "function" ? def : () => def;
      return new ZodCatch({
        ...processCreateParams(this._def),
        innerType: this,
        catchValue: catchValueFunc,
        typeName: ZodFirstPartyTypeKind.ZodCatch
      });
    }
    describe(description) {
      const This = this.constructor;
      return new This({
        ...this._def,
        description
      });
    }
    pipe(target) {
      return ZodPipeline.create(this, target);
    }
    readonly() {
      return ZodReadonly.create(this);
    }
    isOptional() {
      return this.safeParse(void 0).success;
    }
    isNullable() {
      return this.safeParse(null).success;
    }
  };
  var cuidRegex = /^c[^\s-]{8,}$/i;
  var cuid2Regex = /^[0-9a-z]+$/;
  var ulidRegex = /^[0-9A-HJKMNP-TV-Z]{26}$/;
  var uuidRegex = /^[0-9a-fA-F]{8}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{12}$/i;
  var nanoidRegex = /^[a-z0-9_-]{21}$/i;
  var durationRegex = /^[-+]?P(?!$)(?:(?:[-+]?\d+Y)|(?:[-+]?\d+[.,]\d+Y$))?(?:(?:[-+]?\d+M)|(?:[-+]?\d+[.,]\d+M$))?(?:(?:[-+]?\d+W)|(?:[-+]?\d+[.,]\d+W$))?(?:(?:[-+]?\d+D)|(?:[-+]?\d+[.,]\d+D$))?(?:T(?=[\d+-])(?:(?:[-+]?\d+H)|(?:[-+]?\d+[.,]\d+H$))?(?:(?:[-+]?\d+M)|(?:[-+]?\d+[.,]\d+M$))?(?:[-+]?\d+(?:[.,]\d+)?S)?)??$/;
  var emailRegex = /^(?!\.)(?!.*\.\.)([A-Z0-9_'+\-\.]*)[A-Z0-9_+-]@([A-Z0-9][A-Z0-9\-]*\.)+[A-Z]{2,}$/i;
  var _emojiRegex = `^(\\p{Extended_Pictographic}|\\p{Emoji_Component})+$`;
  var emojiRegex;
  var ipv4Regex = /^(?:(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])\.){3}(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])$/;
  var ipv6Regex = /^(([a-f0-9]{1,4}:){7}|::([a-f0-9]{1,4}:){0,6}|([a-f0-9]{1,4}:){1}:([a-f0-9]{1,4}:){0,5}|([a-f0-9]{1,4}:){2}:([a-f0-9]{1,4}:){0,4}|([a-f0-9]{1,4}:){3}:([a-f0-9]{1,4}:){0,3}|([a-f0-9]{1,4}:){4}:([a-f0-9]{1,4}:){0,2}|([a-f0-9]{1,4}:){5}:([a-f0-9]{1,4}:){0,1})([a-f0-9]{1,4}|(((25[0-5])|(2[0-4][0-9])|(1[0-9]{2})|([0-9]{1,2}))\.){3}((25[0-5])|(2[0-4][0-9])|(1[0-9]{2})|([0-9]{1,2})))$/;
  var base64Regex = /^([0-9a-zA-Z+/]{4})*(([0-9a-zA-Z+/]{2}==)|([0-9a-zA-Z+/]{3}=))?$/;
  var dateRegexSource = `((\\d\\d[2468][048]|\\d\\d[13579][26]|\\d\\d0[48]|[02468][048]00|[13579][26]00)-02-29|\\d{4}-((0[13578]|1[02])-(0[1-9]|[12]\\d|3[01])|(0[469]|11)-(0[1-9]|[12]\\d|30)|(02)-(0[1-9]|1\\d|2[0-8])))`;
  var dateRegex = new RegExp(`^${dateRegexSource}$`);
  function timeRegexSource(args) {
    let regex = `([01]\\d|2[0-3]):[0-5]\\d:[0-5]\\d`;
    if (args.precision) {
      regex = `${regex}\\.\\d{${args.precision}}`;
    } else if (args.precision == null) {
      regex = `${regex}(\\.\\d+)?`;
    }
    return regex;
  }
  function timeRegex(args) {
    return new RegExp(`^${timeRegexSource(args)}$`);
  }
  function datetimeRegex(args) {
    let regex = `${dateRegexSource}T${timeRegexSource(args)}`;
    const opts = [];
    opts.push(args.local ? `Z?` : `Z`);
    if (args.offset) opts.push(`([+-]\\d{2}:?\\d{2})`);
    regex = `${regex}(${opts.join("|")})`;
    return new RegExp(`^${regex}$`);
  }
  function isValidIP(ip, version2) {
    if ((version2 === "v4" || !version2) && ipv4Regex.test(ip)) {
      return true;
    }
    if ((version2 === "v6" || !version2) && ipv6Regex.test(ip)) {
      return true;
    }
    return false;
  }
  var ZodString = class _ZodString extends ZodType {
    _parse(input) {
      if (this._def.coerce) {
        input.data = String(input.data);
      }
      const parsedType = this._getType(input);
      if (parsedType !== ZodParsedType.string) {
        const ctx2 = this._getOrReturnCtx(input);
        addIssueToContext(ctx2, {
          code: ZodIssueCode.invalid_type,
          expected: ZodParsedType.string,
          received: ctx2.parsedType
        });
        return INVALID;
      }
      const status = new ParseStatus;
      let ctx = void 0;
      for (const check of this._def.checks) {
        if (check.kind === "min") {
          if (input.data.length < check.value) {
            ctx = this._getOrReturnCtx(input, ctx);
            addIssueToContext(ctx, {
              code: ZodIssueCode.too_small,
              minimum: check.value,
              type: "string",
              inclusive: true,
              exact: false,
              message: check.message
            });
            status.dirty();
          }
        } else if (check.kind === "max") {
          if (input.data.length > check.value) {
            ctx = this._getOrReturnCtx(input, ctx);
            addIssueToContext(ctx, {
              code: ZodIssueCode.too_big,
              maximum: check.value,
              type: "string",
              inclusive: true,
              exact: false,
              message: check.message
            });
            status.dirty();
          }
        } else if (check.kind === "length") {
          const tooBig = input.data.length > check.value;
          const tooSmall = input.data.length < check.value;
          if (tooBig || tooSmall) {
            ctx = this._getOrReturnCtx(input, ctx);
            if (tooBig) {
              addIssueToContext(ctx, {
                code: ZodIssueCode.too_big,
                maximum: check.value,
                type: "string",
                inclusive: true,
                exact: true,
                message: check.message
              });
            } else if (tooSmall) {
              addIssueToContext(ctx, {
                code: ZodIssueCode.too_small,
                minimum: check.value,
                type: "string",
                inclusive: true,
                exact: true,
                message: check.message
              });
            }
            status.dirty();
          }
        } else if (check.kind === "email") {
          if (!emailRegex.test(input.data)) {
            ctx = this._getOrReturnCtx(input, ctx);
            addIssueToContext(ctx, {
              validation: "email",
              code: ZodIssueCode.invalid_string,
              message: check.message
            });
            status.dirty();
          }
        } else if (check.kind === "emoji") {
          if (!emojiRegex) {
            emojiRegex = new RegExp(_emojiRegex, "u");
          }
          if (!emojiRegex.test(input.data)) {
            ctx = this._getOrReturnCtx(input, ctx);
            addIssueToContext(ctx, {
              validation: "emoji",
              code: ZodIssueCode.invalid_string,
              message: check.message
            });
            status.dirty();
          }
        } else if (check.kind === "uuid") {
          if (!uuidRegex.test(input.data)) {
            ctx = this._getOrReturnCtx(input, ctx);
            addIssueToContext(ctx, {
              validation: "uuid",
              code: ZodIssueCode.invalid_string,
              message: check.message
            });
            status.dirty();
          }
        } else if (check.kind === "nanoid") {
          if (!nanoidRegex.test(input.data)) {
            ctx = this._getOrReturnCtx(input, ctx);
            addIssueToContext(ctx, {
              validation: "nanoid",
              code: ZodIssueCode.invalid_string,
              message: check.message
            });
            status.dirty();
          }
        } else if (check.kind === "cuid") {
          if (!cuidRegex.test(input.data)) {
            ctx = this._getOrReturnCtx(input, ctx);
            addIssueToContext(ctx, {
              validation: "cuid",
              code: ZodIssueCode.invalid_string,
              message: check.message
            });
            status.dirty();
          }
        } else if (check.kind === "cuid2") {
          if (!cuid2Regex.test(input.data)) {
            ctx = this._getOrReturnCtx(input, ctx);
            addIssueToContext(ctx, {
              validation: "cuid2",
              code: ZodIssueCode.invalid_string,
              message: check.message
            });
            status.dirty();
          }
        } else if (check.kind === "ulid") {
          if (!ulidRegex.test(input.data)) {
            ctx = this._getOrReturnCtx(input, ctx);
            addIssueToContext(ctx, {
              validation: "ulid",
              code: ZodIssueCode.invalid_string,
              message: check.message
            });
            status.dirty();
          }
        } else if (check.kind === "url") {
          try {
            new URL(input.data);
          } catch (_a) {
            ctx = this._getOrReturnCtx(input, ctx);
            addIssueToContext(ctx, {
              validation: "url",
              code: ZodIssueCode.invalid_string,
              message: check.message
            });
            status.dirty();
          }
        } else if (check.kind === "regex") {
          check.regex.lastIndex = 0;
          const testResult = check.regex.test(input.data);
          if (!testResult) {
            ctx = this._getOrReturnCtx(input, ctx);
            addIssueToContext(ctx, {
              validation: "regex",
              code: ZodIssueCode.invalid_string,
              message: check.message
            });
            status.dirty();
          }
        } else if (check.kind === "trim") {
          input.data = input.data.trim();
        } else if (check.kind === "includes") {
          if (!input.data.includes(check.value, check.position)) {
            ctx = this._getOrReturnCtx(input, ctx);
            addIssueToContext(ctx, {
              code: ZodIssueCode.invalid_string,
              validation: {
                includes: check.value,
                position: check.position
              },
              message: check.message
            });
            status.dirty();
          }
        } else if (check.kind === "toLowerCase") {
          input.data = input.data.toLowerCase();
        } else if (check.kind === "toUpperCase") {
          input.data = input.data.toUpperCase();
        } else if (check.kind === "startsWith") {
          if (!input.data.startsWith(check.value)) {
            ctx = this._getOrReturnCtx(input, ctx);
            addIssueToContext(ctx, {
              code: ZodIssueCode.invalid_string,
              validation: {
                startsWith: check.value
              },
              message: check.message
            });
            status.dirty();
          }
        } else if (check.kind === "endsWith") {
          if (!input.data.endsWith(check.value)) {
            ctx = this._getOrReturnCtx(input, ctx);
            addIssueToContext(ctx, {
              code: ZodIssueCode.invalid_string,
              validation: {
                endsWith: check.value
              },
              message: check.message
            });
            status.dirty();
          }
        } else if (check.kind === "datetime") {
          const regex = datetimeRegex(check);
          if (!regex.test(input.data)) {
            ctx = this._getOrReturnCtx(input, ctx);
            addIssueToContext(ctx, {
              code: ZodIssueCode.invalid_string,
              validation: "datetime",
              message: check.message
            });
            status.dirty();
          }
        } else if (check.kind === "date") {
          const regex = dateRegex;
          if (!regex.test(input.data)) {
            ctx = this._getOrReturnCtx(input, ctx);
            addIssueToContext(ctx, {
              code: ZodIssueCode.invalid_string,
              validation: "date",
              message: check.message
            });
            status.dirty();
          }
        } else if (check.kind === "time") {
          const regex = timeRegex(check);
          if (!regex.test(input.data)) {
            ctx = this._getOrReturnCtx(input, ctx);
            addIssueToContext(ctx, {
              code: ZodIssueCode.invalid_string,
              validation: "time",
              message: check.message
            });
            status.dirty();
          }
        } else if (check.kind === "duration") {
          if (!durationRegex.test(input.data)) {
            ctx = this._getOrReturnCtx(input, ctx);
            addIssueToContext(ctx, {
              validation: "duration",
              code: ZodIssueCode.invalid_string,
              message: check.message
            });
            status.dirty();
          }
        } else if (check.kind === "ip") {
          if (!isValidIP(input.data, check.version)) {
            ctx = this._getOrReturnCtx(input, ctx);
            addIssueToContext(ctx, {
              validation: "ip",
              code: ZodIssueCode.invalid_string,
              message: check.message
            });
            status.dirty();
          }
        } else if (check.kind === "base64") {
          if (!base64Regex.test(input.data)) {
            ctx = this._getOrReturnCtx(input, ctx);
            addIssueToContext(ctx, {
              validation: "base64",
              code: ZodIssueCode.invalid_string,
              message: check.message
            });
            status.dirty();
          }
        } else {
          util.assertNever(check);
        }
      }
      return {
        status: status.value,
        value: input.data
      };
    }
    _regex(regex, validation, message) {
      return this.refinement(data => regex.test(data), {
        validation,
        code: ZodIssueCode.invalid_string,
        ...errorUtil.errToObj(message)
      });
    }
    _addCheck(check) {
      return new _ZodString({
        ...this._def,
        checks: [ ...this._def.checks, check ]
      });
    }
    email(message) {
      return this._addCheck({
        kind: "email",
        ...errorUtil.errToObj(message)
      });
    }
    url(message) {
      return this._addCheck({
        kind: "url",
        ...errorUtil.errToObj(message)
      });
    }
    emoji(message) {
      return this._addCheck({
        kind: "emoji",
        ...errorUtil.errToObj(message)
      });
    }
    uuid(message) {
      return this._addCheck({
        kind: "uuid",
        ...errorUtil.errToObj(message)
      });
    }
    nanoid(message) {
      return this._addCheck({
        kind: "nanoid",
        ...errorUtil.errToObj(message)
      });
    }
    cuid(message) {
      return this._addCheck({
        kind: "cuid",
        ...errorUtil.errToObj(message)
      });
    }
    cuid2(message) {
      return this._addCheck({
        kind: "cuid2",
        ...errorUtil.errToObj(message)
      });
    }
    ulid(message) {
      return this._addCheck({
        kind: "ulid",
        ...errorUtil.errToObj(message)
      });
    }
    base64(message) {
      return this._addCheck({
        kind: "base64",
        ...errorUtil.errToObj(message)
      });
    }
    ip(options) {
      return this._addCheck({
        kind: "ip",
        ...errorUtil.errToObj(options)
      });
    }
    datetime(options) {
      var _a, _b;
      if (typeof options === "string") {
        return this._addCheck({
          kind: "datetime",
          precision: null,
          offset: false,
          local: false,
          message: options
        });
      }
      return this._addCheck({
        kind: "datetime",
        precision: typeof (options === null || options === void 0 ? void 0 : options.precision) === "undefined" ? null : options === null || options === void 0 ? void 0 : options.precision,
        offset: (_a = options === null || options === void 0 ? void 0 : options.offset) !== null && _a !== void 0 ? _a : false,
        local: (_b = options === null || options === void 0 ? void 0 : options.local) !== null && _b !== void 0 ? _b : false,
        ...errorUtil.errToObj(options === null || options === void 0 ? void 0 : options.message)
      });
    }
    date(message) {
      return this._addCheck({
        kind: "date",
        message
      });
    }
    time(options) {
      if (typeof options === "string") {
        return this._addCheck({
          kind: "time",
          precision: null,
          message: options
        });
      }
      return this._addCheck({
        kind: "time",
        precision: typeof (options === null || options === void 0 ? void 0 : options.precision) === "undefined" ? null : options === null || options === void 0 ? void 0 : options.precision,
        ...errorUtil.errToObj(options === null || options === void 0 ? void 0 : options.message)
      });
    }
    duration(message) {
      return this._addCheck({
        kind: "duration",
        ...errorUtil.errToObj(message)
      });
    }
    regex(regex, message) {
      return this._addCheck({
        kind: "regex",
        regex,
        ...errorUtil.errToObj(message)
      });
    }
    includes(value, options) {
      return this._addCheck({
        kind: "includes",
        value,
        position: options === null || options === void 0 ? void 0 : options.position,
        ...errorUtil.errToObj(options === null || options === void 0 ? void 0 : options.message)
      });
    }
    startsWith(value, message) {
      return this._addCheck({
        kind: "startsWith",
        value,
        ...errorUtil.errToObj(message)
      });
    }
    endsWith(value, message) {
      return this._addCheck({
        kind: "endsWith",
        value,
        ...errorUtil.errToObj(message)
      });
    }
    min(minLength, message) {
      return this._addCheck({
        kind: "min",
        value: minLength,
        ...errorUtil.errToObj(message)
      });
    }
    max(maxLength, message) {
      return this._addCheck({
        kind: "max",
        value: maxLength,
        ...errorUtil.errToObj(message)
      });
    }
    length(len, message) {
      return this._addCheck({
        kind: "length",
        value: len,
        ...errorUtil.errToObj(message)
      });
    }
    /**
     * @deprecated Use z.string().min(1) instead.
     * @see {@link ZodString.min}
     */ nonempty(message) {
      return this.min(1, errorUtil.errToObj(message));
    }
    trim() {
      return new _ZodString({
        ...this._def,
        checks: [ ...this._def.checks, {
          kind: "trim"
        } ]
      });
    }
    toLowerCase() {
      return new _ZodString({
        ...this._def,
        checks: [ ...this._def.checks, {
          kind: "toLowerCase"
        } ]
      });
    }
    toUpperCase() {
      return new _ZodString({
        ...this._def,
        checks: [ ...this._def.checks, {
          kind: "toUpperCase"
        } ]
      });
    }
    get isDatetime() {
      return !!this._def.checks.find(ch => ch.kind === "datetime");
    }
    get isDate() {
      return !!this._def.checks.find(ch => ch.kind === "date");
    }
    get isTime() {
      return !!this._def.checks.find(ch => ch.kind === "time");
    }
    get isDuration() {
      return !!this._def.checks.find(ch => ch.kind === "duration");
    }
    get isEmail() {
      return !!this._def.checks.find(ch => ch.kind === "email");
    }
    get isURL() {
      return !!this._def.checks.find(ch => ch.kind === "url");
    }
    get isEmoji() {
      return !!this._def.checks.find(ch => ch.kind === "emoji");
    }
    get isUUID() {
      return !!this._def.checks.find(ch => ch.kind === "uuid");
    }
    get isNANOID() {
      return !!this._def.checks.find(ch => ch.kind === "nanoid");
    }
    get isCUID() {
      return !!this._def.checks.find(ch => ch.kind === "cuid");
    }
    get isCUID2() {
      return !!this._def.checks.find(ch => ch.kind === "cuid2");
    }
    get isULID() {
      return !!this._def.checks.find(ch => ch.kind === "ulid");
    }
    get isIP() {
      return !!this._def.checks.find(ch => ch.kind === "ip");
    }
    get isBase64() {
      return !!this._def.checks.find(ch => ch.kind === "base64");
    }
    get minLength() {
      let min = null;
      for (const ch of this._def.checks) {
        if (ch.kind === "min") {
          if (min === null || ch.value > min) min = ch.value;
        }
      }
      return min;
    }
    get maxLength() {
      let max = null;
      for (const ch of this._def.checks) {
        if (ch.kind === "max") {
          if (max === null || ch.value < max) max = ch.value;
        }
      }
      return max;
    }
  };
  ZodString.create = params => {
    var _a;
    return new ZodString({
      checks: [],
      typeName: ZodFirstPartyTypeKind.ZodString,
      coerce: (_a = params === null || params === void 0 ? void 0 : params.coerce) !== null && _a !== void 0 ? _a : false,
      ...processCreateParams(params)
    });
  };
  function floatSafeRemainder(val, step) {
    const valDecCount = (val.toString().split(".")[1] || "").length;
    const stepDecCount = (step.toString().split(".")[1] || "").length;
    const decCount = valDecCount > stepDecCount ? valDecCount : stepDecCount;
    const valInt = parseInt(val.toFixed(decCount).replace(".", ""));
    const stepInt = parseInt(step.toFixed(decCount).replace(".", ""));
    return valInt % stepInt / Math.pow(10, decCount);
  }
  var ZodNumber = class _ZodNumber extends ZodType {
    constructor() {
      super(...arguments);
      this.min = this.gte;
      this.max = this.lte;
      this.step = this.multipleOf;
    }
    _parse(input) {
      if (this._def.coerce) {
        input.data = Number(input.data);
      }
      const parsedType = this._getType(input);
      if (parsedType !== ZodParsedType.number) {
        const ctx2 = this._getOrReturnCtx(input);
        addIssueToContext(ctx2, {
          code: ZodIssueCode.invalid_type,
          expected: ZodParsedType.number,
          received: ctx2.parsedType
        });
        return INVALID;
      }
      let ctx = void 0;
      const status = new ParseStatus;
      for (const check of this._def.checks) {
        if (check.kind === "int") {
          if (!util.isInteger(input.data)) {
            ctx = this._getOrReturnCtx(input, ctx);
            addIssueToContext(ctx, {
              code: ZodIssueCode.invalid_type,
              expected: "integer",
              received: "float",
              message: check.message
            });
            status.dirty();
          }
        } else if (check.kind === "min") {
          const tooSmall = check.inclusive ? input.data < check.value : input.data <= check.value;
          if (tooSmall) {
            ctx = this._getOrReturnCtx(input, ctx);
            addIssueToContext(ctx, {
              code: ZodIssueCode.too_small,
              minimum: check.value,
              type: "number",
              inclusive: check.inclusive,
              exact: false,
              message: check.message
            });
            status.dirty();
          }
        } else if (check.kind === "max") {
          const tooBig = check.inclusive ? input.data > check.value : input.data >= check.value;
          if (tooBig) {
            ctx = this._getOrReturnCtx(input, ctx);
            addIssueToContext(ctx, {
              code: ZodIssueCode.too_big,
              maximum: check.value,
              type: "number",
              inclusive: check.inclusive,
              exact: false,
              message: check.message
            });
            status.dirty();
          }
        } else if (check.kind === "multipleOf") {
          if (floatSafeRemainder(input.data, check.value) !== 0) {
            ctx = this._getOrReturnCtx(input, ctx);
            addIssueToContext(ctx, {
              code: ZodIssueCode.not_multiple_of,
              multipleOf: check.value,
              message: check.message
            });
            status.dirty();
          }
        } else if (check.kind === "finite") {
          if (!Number.isFinite(input.data)) {
            ctx = this._getOrReturnCtx(input, ctx);
            addIssueToContext(ctx, {
              code: ZodIssueCode.not_finite,
              message: check.message
            });
            status.dirty();
          }
        } else {
          util.assertNever(check);
        }
      }
      return {
        status: status.value,
        value: input.data
      };
    }
    gte(value, message) {
      return this.setLimit("min", value, true, errorUtil.toString(message));
    }
    gt(value, message) {
      return this.setLimit("min", value, false, errorUtil.toString(message));
    }
    lte(value, message) {
      return this.setLimit("max", value, true, errorUtil.toString(message));
    }
    lt(value, message) {
      return this.setLimit("max", value, false, errorUtil.toString(message));
    }
    setLimit(kind, value, inclusive, message) {
      return new _ZodNumber({
        ...this._def,
        checks: [ ...this._def.checks, {
          kind,
          value,
          inclusive,
          message: errorUtil.toString(message)
        } ]
      });
    }
    _addCheck(check) {
      return new _ZodNumber({
        ...this._def,
        checks: [ ...this._def.checks, check ]
      });
    }
    int(message) {
      return this._addCheck({
        kind: "int",
        message: errorUtil.toString(message)
      });
    }
    positive(message) {
      return this._addCheck({
        kind: "min",
        value: 0,
        inclusive: false,
        message: errorUtil.toString(message)
      });
    }
    negative(message) {
      return this._addCheck({
        kind: "max",
        value: 0,
        inclusive: false,
        message: errorUtil.toString(message)
      });
    }
    nonpositive(message) {
      return this._addCheck({
        kind: "max",
        value: 0,
        inclusive: true,
        message: errorUtil.toString(message)
      });
    }
    nonnegative(message) {
      return this._addCheck({
        kind: "min",
        value: 0,
        inclusive: true,
        message: errorUtil.toString(message)
      });
    }
    multipleOf(value, message) {
      return this._addCheck({
        kind: "multipleOf",
        value,
        message: errorUtil.toString(message)
      });
    }
    finite(message) {
      return this._addCheck({
        kind: "finite",
        message: errorUtil.toString(message)
      });
    }
    safe(message) {
      return this._addCheck({
        kind: "min",
        inclusive: true,
        value: Number.MIN_SAFE_INTEGER,
        message: errorUtil.toString(message)
      })._addCheck({
        kind: "max",
        inclusive: true,
        value: Number.MAX_SAFE_INTEGER,
        message: errorUtil.toString(message)
      });
    }
    get minValue() {
      let min = null;
      for (const ch of this._def.checks) {
        if (ch.kind === "min") {
          if (min === null || ch.value > min) min = ch.value;
        }
      }
      return min;
    }
    get maxValue() {
      let max = null;
      for (const ch of this._def.checks) {
        if (ch.kind === "max") {
          if (max === null || ch.value < max) max = ch.value;
        }
      }
      return max;
    }
    get isInt() {
      return !!this._def.checks.find(ch => ch.kind === "int" || ch.kind === "multipleOf" && util.isInteger(ch.value));
    }
    get isFinite() {
      let max = null, min = null;
      for (const ch of this._def.checks) {
        if (ch.kind === "finite" || ch.kind === "int" || ch.kind === "multipleOf") {
          return true;
        } else if (ch.kind === "min") {
          if (min === null || ch.value > min) min = ch.value;
        } else if (ch.kind === "max") {
          if (max === null || ch.value < max) max = ch.value;
        }
      }
      return Number.isFinite(min) && Number.isFinite(max);
    }
  };
  ZodNumber.create = params => new ZodNumber({
    checks: [],
    typeName: ZodFirstPartyTypeKind.ZodNumber,
    coerce: (params === null || params === void 0 ? void 0 : params.coerce) || false,
    ...processCreateParams(params)
  });
  var ZodBigInt = class _ZodBigInt extends ZodType {
    constructor() {
      super(...arguments);
      this.min = this.gte;
      this.max = this.lte;
    }
    _parse(input) {
      if (this._def.coerce) {
        input.data = BigInt(input.data);
      }
      const parsedType = this._getType(input);
      if (parsedType !== ZodParsedType.bigint) {
        const ctx2 = this._getOrReturnCtx(input);
        addIssueToContext(ctx2, {
          code: ZodIssueCode.invalid_type,
          expected: ZodParsedType.bigint,
          received: ctx2.parsedType
        });
        return INVALID;
      }
      let ctx = void 0;
      const status = new ParseStatus;
      for (const check of this._def.checks) {
        if (check.kind === "min") {
          const tooSmall = check.inclusive ? input.data < check.value : input.data <= check.value;
          if (tooSmall) {
            ctx = this._getOrReturnCtx(input, ctx);
            addIssueToContext(ctx, {
              code: ZodIssueCode.too_small,
              type: "bigint",
              minimum: check.value,
              inclusive: check.inclusive,
              message: check.message
            });
            status.dirty();
          }
        } else if (check.kind === "max") {
          const tooBig = check.inclusive ? input.data > check.value : input.data >= check.value;
          if (tooBig) {
            ctx = this._getOrReturnCtx(input, ctx);
            addIssueToContext(ctx, {
              code: ZodIssueCode.too_big,
              type: "bigint",
              maximum: check.value,
              inclusive: check.inclusive,
              message: check.message
            });
            status.dirty();
          }
        } else if (check.kind === "multipleOf") {
          if (input.data % check.value !== BigInt(0)) {
            ctx = this._getOrReturnCtx(input, ctx);
            addIssueToContext(ctx, {
              code: ZodIssueCode.not_multiple_of,
              multipleOf: check.value,
              message: check.message
            });
            status.dirty();
          }
        } else {
          util.assertNever(check);
        }
      }
      return {
        status: status.value,
        value: input.data
      };
    }
    gte(value, message) {
      return this.setLimit("min", value, true, errorUtil.toString(message));
    }
    gt(value, message) {
      return this.setLimit("min", value, false, errorUtil.toString(message));
    }
    lte(value, message) {
      return this.setLimit("max", value, true, errorUtil.toString(message));
    }
    lt(value, message) {
      return this.setLimit("max", value, false, errorUtil.toString(message));
    }
    setLimit(kind, value, inclusive, message) {
      return new _ZodBigInt({
        ...this._def,
        checks: [ ...this._def.checks, {
          kind,
          value,
          inclusive,
          message: errorUtil.toString(message)
        } ]
      });
    }
    _addCheck(check) {
      return new _ZodBigInt({
        ...this._def,
        checks: [ ...this._def.checks, check ]
      });
    }
    positive(message) {
      return this._addCheck({
        kind: "min",
        value: BigInt(0),
        inclusive: false,
        message: errorUtil.toString(message)
      });
    }
    negative(message) {
      return this._addCheck({
        kind: "max",
        value: BigInt(0),
        inclusive: false,
        message: errorUtil.toString(message)
      });
    }
    nonpositive(message) {
      return this._addCheck({
        kind: "max",
        value: BigInt(0),
        inclusive: true,
        message: errorUtil.toString(message)
      });
    }
    nonnegative(message) {
      return this._addCheck({
        kind: "min",
        value: BigInt(0),
        inclusive: true,
        message: errorUtil.toString(message)
      });
    }
    multipleOf(value, message) {
      return this._addCheck({
        kind: "multipleOf",
        value,
        message: errorUtil.toString(message)
      });
    }
    get minValue() {
      let min = null;
      for (const ch of this._def.checks) {
        if (ch.kind === "min") {
          if (min === null || ch.value > min) min = ch.value;
        }
      }
      return min;
    }
    get maxValue() {
      let max = null;
      for (const ch of this._def.checks) {
        if (ch.kind === "max") {
          if (max === null || ch.value < max) max = ch.value;
        }
      }
      return max;
    }
  };
  ZodBigInt.create = params => {
    var _a;
    return new ZodBigInt({
      checks: [],
      typeName: ZodFirstPartyTypeKind.ZodBigInt,
      coerce: (_a = params === null || params === void 0 ? void 0 : params.coerce) !== null && _a !== void 0 ? _a : false,
      ...processCreateParams(params)
    });
  };
  var ZodBoolean = class extends ZodType {
    _parse(input) {
      if (this._def.coerce) {
        input.data = Boolean(input.data);
      }
      const parsedType = this._getType(input);
      if (parsedType !== ZodParsedType.boolean) {
        const ctx = this._getOrReturnCtx(input);
        addIssueToContext(ctx, {
          code: ZodIssueCode.invalid_type,
          expected: ZodParsedType.boolean,
          received: ctx.parsedType
        });
        return INVALID;
      }
      return OK(input.data);
    }
  };
  ZodBoolean.create = params => new ZodBoolean({
    typeName: ZodFirstPartyTypeKind.ZodBoolean,
    coerce: (params === null || params === void 0 ? void 0 : params.coerce) || false,
    ...processCreateParams(params)
  });
  var ZodDate = class _ZodDate extends ZodType {
    _parse(input) {
      if (this._def.coerce) {
        input.data = new Date(input.data);
      }
      const parsedType = this._getType(input);
      if (parsedType !== ZodParsedType.date) {
        const ctx2 = this._getOrReturnCtx(input);
        addIssueToContext(ctx2, {
          code: ZodIssueCode.invalid_type,
          expected: ZodParsedType.date,
          received: ctx2.parsedType
        });
        return INVALID;
      }
      if (isNaN(input.data.getTime())) {
        const ctx2 = this._getOrReturnCtx(input);
        addIssueToContext(ctx2, {
          code: ZodIssueCode.invalid_date
        });
        return INVALID;
      }
      const status = new ParseStatus;
      let ctx = void 0;
      for (const check of this._def.checks) {
        if (check.kind === "min") {
          if (input.data.getTime() < check.value) {
            ctx = this._getOrReturnCtx(input, ctx);
            addIssueToContext(ctx, {
              code: ZodIssueCode.too_small,
              message: check.message,
              inclusive: true,
              exact: false,
              minimum: check.value,
              type: "date"
            });
            status.dirty();
          }
        } else if (check.kind === "max") {
          if (input.data.getTime() > check.value) {
            ctx = this._getOrReturnCtx(input, ctx);
            addIssueToContext(ctx, {
              code: ZodIssueCode.too_big,
              message: check.message,
              inclusive: true,
              exact: false,
              maximum: check.value,
              type: "date"
            });
            status.dirty();
          }
        } else {
          util.assertNever(check);
        }
      }
      return {
        status: status.value,
        value: new Date(input.data.getTime())
      };
    }
    _addCheck(check) {
      return new _ZodDate({
        ...this._def,
        checks: [ ...this._def.checks, check ]
      });
    }
    min(minDate, message) {
      return this._addCheck({
        kind: "min",
        value: minDate.getTime(),
        message: errorUtil.toString(message)
      });
    }
    max(maxDate, message) {
      return this._addCheck({
        kind: "max",
        value: maxDate.getTime(),
        message: errorUtil.toString(message)
      });
    }
    get minDate() {
      let min = null;
      for (const ch of this._def.checks) {
        if (ch.kind === "min") {
          if (min === null || ch.value > min) min = ch.value;
        }
      }
      return min != null ? new Date(min) : null;
    }
    get maxDate() {
      let max = null;
      for (const ch of this._def.checks) {
        if (ch.kind === "max") {
          if (max === null || ch.value < max) max = ch.value;
        }
      }
      return max != null ? new Date(max) : null;
    }
  };
  ZodDate.create = params => new ZodDate({
    checks: [],
    coerce: (params === null || params === void 0 ? void 0 : params.coerce) || false,
    typeName: ZodFirstPartyTypeKind.ZodDate,
    ...processCreateParams(params)
  });
  var ZodSymbol = class extends ZodType {
    _parse(input) {
      const parsedType = this._getType(input);
      if (parsedType !== ZodParsedType.symbol) {
        const ctx = this._getOrReturnCtx(input);
        addIssueToContext(ctx, {
          code: ZodIssueCode.invalid_type,
          expected: ZodParsedType.symbol,
          received: ctx.parsedType
        });
        return INVALID;
      }
      return OK(input.data);
    }
  };
  ZodSymbol.create = params => new ZodSymbol({
    typeName: ZodFirstPartyTypeKind.ZodSymbol,
    ...processCreateParams(params)
  });
  var ZodUndefined = class extends ZodType {
    _parse(input) {
      const parsedType = this._getType(input);
      if (parsedType !== ZodParsedType.undefined) {
        const ctx = this._getOrReturnCtx(input);
        addIssueToContext(ctx, {
          code: ZodIssueCode.invalid_type,
          expected: ZodParsedType.undefined,
          received: ctx.parsedType
        });
        return INVALID;
      }
      return OK(input.data);
    }
  };
  ZodUndefined.create = params => new ZodUndefined({
    typeName: ZodFirstPartyTypeKind.ZodUndefined,
    ...processCreateParams(params)
  });
  var ZodNull = class extends ZodType {
    _parse(input) {
      const parsedType = this._getType(input);
      if (parsedType !== ZodParsedType.null) {
        const ctx = this._getOrReturnCtx(input);
        addIssueToContext(ctx, {
          code: ZodIssueCode.invalid_type,
          expected: ZodParsedType.null,
          received: ctx.parsedType
        });
        return INVALID;
      }
      return OK(input.data);
    }
  };
  ZodNull.create = params => new ZodNull({
    typeName: ZodFirstPartyTypeKind.ZodNull,
    ...processCreateParams(params)
  });
  var ZodAny = class extends ZodType {
    constructor() {
      super(...arguments);
      this._any = true;
    }
    _parse(input) {
      return OK(input.data);
    }
  };
  ZodAny.create = params => new ZodAny({
    typeName: ZodFirstPartyTypeKind.ZodAny,
    ...processCreateParams(params)
  });
  var ZodUnknown = class extends ZodType {
    constructor() {
      super(...arguments);
      this._unknown = true;
    }
    _parse(input) {
      return OK(input.data);
    }
  };
  ZodUnknown.create = params => new ZodUnknown({
    typeName: ZodFirstPartyTypeKind.ZodUnknown,
    ...processCreateParams(params)
  });
  var ZodNever = class extends ZodType {
    _parse(input) {
      const ctx = this._getOrReturnCtx(input);
      addIssueToContext(ctx, {
        code: ZodIssueCode.invalid_type,
        expected: ZodParsedType.never,
        received: ctx.parsedType
      });
      return INVALID;
    }
  };
  ZodNever.create = params => new ZodNever({
    typeName: ZodFirstPartyTypeKind.ZodNever,
    ...processCreateParams(params)
  });
  var ZodVoid = class extends ZodType {
    _parse(input) {
      const parsedType = this._getType(input);
      if (parsedType !== ZodParsedType.undefined) {
        const ctx = this._getOrReturnCtx(input);
        addIssueToContext(ctx, {
          code: ZodIssueCode.invalid_type,
          expected: ZodParsedType.void,
          received: ctx.parsedType
        });
        return INVALID;
      }
      return OK(input.data);
    }
  };
  ZodVoid.create = params => new ZodVoid({
    typeName: ZodFirstPartyTypeKind.ZodVoid,
    ...processCreateParams(params)
  });
  var ZodArray = class _ZodArray extends ZodType {
    _parse(input) {
      const {ctx, status} = this._processInputParams(input);
      const def = this._def;
      if (ctx.parsedType !== ZodParsedType.array) {
        addIssueToContext(ctx, {
          code: ZodIssueCode.invalid_type,
          expected: ZodParsedType.array,
          received: ctx.parsedType
        });
        return INVALID;
      }
      if (def.exactLength !== null) {
        const tooBig = ctx.data.length > def.exactLength.value;
        const tooSmall = ctx.data.length < def.exactLength.value;
        if (tooBig || tooSmall) {
          addIssueToContext(ctx, {
            code: tooBig ? ZodIssueCode.too_big : ZodIssueCode.too_small,
            minimum: tooSmall ? def.exactLength.value : void 0,
            maximum: tooBig ? def.exactLength.value : void 0,
            type: "array",
            inclusive: true,
            exact: true,
            message: def.exactLength.message
          });
          status.dirty();
        }
      }
      if (def.minLength !== null) {
        if (ctx.data.length < def.minLength.value) {
          addIssueToContext(ctx, {
            code: ZodIssueCode.too_small,
            minimum: def.minLength.value,
            type: "array",
            inclusive: true,
            exact: false,
            message: def.minLength.message
          });
          status.dirty();
        }
      }
      if (def.maxLength !== null) {
        if (ctx.data.length > def.maxLength.value) {
          addIssueToContext(ctx, {
            code: ZodIssueCode.too_big,
            maximum: def.maxLength.value,
            type: "array",
            inclusive: true,
            exact: false,
            message: def.maxLength.message
          });
          status.dirty();
        }
      }
      if (ctx.common.async) {
        return Promise.all([ ...ctx.data ].map((item, i) => def.type._parseAsync(new ParseInputLazyPath(ctx, item, ctx.path, i)))).then(result2 => ParseStatus.mergeArray(status, result2));
      }
      const result = [ ...ctx.data ].map((item, i) => def.type._parseSync(new ParseInputLazyPath(ctx, item, ctx.path, i)));
      return ParseStatus.mergeArray(status, result);
    }
    get element() {
      return this._def.type;
    }
    min(minLength, message) {
      return new _ZodArray({
        ...this._def,
        minLength: {
          value: minLength,
          message: errorUtil.toString(message)
        }
      });
    }
    max(maxLength, message) {
      return new _ZodArray({
        ...this._def,
        maxLength: {
          value: maxLength,
          message: errorUtil.toString(message)
        }
      });
    }
    length(len, message) {
      return new _ZodArray({
        ...this._def,
        exactLength: {
          value: len,
          message: errorUtil.toString(message)
        }
      });
    }
    nonempty(message) {
      return this.min(1, message);
    }
  };
  ZodArray.create = (schema, params) => new ZodArray({
    type: schema,
    minLength: null,
    maxLength: null,
    exactLength: null,
    typeName: ZodFirstPartyTypeKind.ZodArray,
    ...processCreateParams(params)
  });
  function deepPartialify(schema) {
    if (schema instanceof ZodObject) {
      const newShape = {};
      for (const key in schema.shape) {
        const fieldSchema = schema.shape[key];
        newShape[key] = ZodOptional.create(deepPartialify(fieldSchema));
      }
      return new ZodObject({
        ...schema._def,
        shape: () => newShape
      });
    } else if (schema instanceof ZodArray) {
      return new ZodArray({
        ...schema._def,
        type: deepPartialify(schema.element)
      });
    } else if (schema instanceof ZodOptional) {
      return ZodOptional.create(deepPartialify(schema.unwrap()));
    } else if (schema instanceof ZodNullable) {
      return ZodNullable.create(deepPartialify(schema.unwrap()));
    } else if (schema instanceof ZodTuple) {
      return ZodTuple.create(schema.items.map(item => deepPartialify(item)));
    } else {
      return schema;
    }
  }
  var ZodObject = class _ZodObject extends ZodType {
    constructor() {
      super(...arguments);
      this._cached = null;
      this.nonstrict = this.passthrough;
      this.augment = this.extend;
    }
    _getCached() {
      if (this._cached !== null) return this._cached;
      const shape = this._def.shape();
      const keys = util.objectKeys(shape);
      return this._cached = {
        shape,
        keys
      };
    }
    _parse(input) {
      const parsedType = this._getType(input);
      if (parsedType !== ZodParsedType.object) {
        const ctx2 = this._getOrReturnCtx(input);
        addIssueToContext(ctx2, {
          code: ZodIssueCode.invalid_type,
          expected: ZodParsedType.object,
          received: ctx2.parsedType
        });
        return INVALID;
      }
      const {status, ctx} = this._processInputParams(input);
      const {shape, keys: shapeKeys} = this._getCached();
      const extraKeys = [];
      if (!(this._def.catchall instanceof ZodNever && this._def.unknownKeys === "strip")) {
        for (const key in ctx.data) {
          if (!shapeKeys.includes(key)) {
            extraKeys.push(key);
          }
        }
      }
      const pairs = [];
      for (const key of shapeKeys) {
        const keyValidator = shape[key];
        const value = ctx.data[key];
        pairs.push({
          key: {
            status: "valid",
            value: key
          },
          value: keyValidator._parse(new ParseInputLazyPath(ctx, value, ctx.path, key)),
          alwaysSet: key in ctx.data
        });
      }
      if (this._def.catchall instanceof ZodNever) {
        const unknownKeys = this._def.unknownKeys;
        if (unknownKeys === "passthrough") {
          for (const key of extraKeys) {
            pairs.push({
              key: {
                status: "valid",
                value: key
              },
              value: {
                status: "valid",
                value: ctx.data[key]
              }
            });
          }
        } else if (unknownKeys === "strict") {
          if (extraKeys.length > 0) {
            addIssueToContext(ctx, {
              code: ZodIssueCode.unrecognized_keys,
              keys: extraKeys
            });
            status.dirty();
          }
        } else if (unknownKeys === "strip") ; else {
          throw new Error(`Internal ZodObject error: invalid unknownKeys value.`);
        }
      } else {
        const catchall = this._def.catchall;
        for (const key of extraKeys) {
          const value = ctx.data[key];
          pairs.push({
            key: {
              status: "valid",
              value: key
            },
            value: catchall._parse(new ParseInputLazyPath(ctx, value, ctx.path, key)),
            alwaysSet: key in ctx.data
          });
        }
      }
      if (ctx.common.async) {
        return Promise.resolve().then(async () => {
          const syncPairs = [];
          for (const pair of pairs) {
            const key = await pair.key;
            const value = await pair.value;
            syncPairs.push({
              key,
              value,
              alwaysSet: pair.alwaysSet
            });
          }
          return syncPairs;
        }).then(syncPairs => ParseStatus.mergeObjectSync(status, syncPairs));
      } else {
        return ParseStatus.mergeObjectSync(status, pairs);
      }
    }
    get shape() {
      return this._def.shape();
    }
    strict(message) {
      errorUtil.errToObj;
      return new _ZodObject({
        ...this._def,
        unknownKeys: "strict",
        ...message !== void 0 ? {
          errorMap: (issue, ctx) => {
            var _a, _b, _c, _d;
            const defaultError = (_c = (_b = (_a = this._def).errorMap) === null || _b === void 0 ? void 0 : _b.call(_a, issue, ctx).message) !== null && _c !== void 0 ? _c : ctx.defaultError;
            if (issue.code === "unrecognized_keys") return {
              message: (_d = errorUtil.errToObj(message).message) !== null && _d !== void 0 ? _d : defaultError
            };
            return {
              message: defaultError
            };
          }
        } : {}
      });
    }
    strip() {
      return new _ZodObject({
        ...this._def,
        unknownKeys: "strip"
      });
    }
    passthrough() {
      return new _ZodObject({
        ...this._def,
        unknownKeys: "passthrough"
      });
    }
    // const AugmentFactory =
    //   <Def extends ZodObjectDef>(def: Def) =>
    //   <Augmentation extends ZodRawShape>(
    //     augmentation: Augmentation
    //   ): ZodObject<
    //     extendShape<ReturnType<Def["shape"]>, Augmentation>,
    //     Def["unknownKeys"],
    //     Def["catchall"]
    //   > => {
    //     return new ZodObject({
    //       ...def,
    //       shape: () => ({
    //         ...def.shape(),
    //         ...augmentation,
    //       }),
    //     }) as any;
    //   };
    extend(augmentation) {
      return new _ZodObject({
        ...this._def,
        shape: () => (({
          ...this._def.shape(),
          ...augmentation
        }))
      });
    }
    /**
     * Prior to zod@1.0.12 there was a bug in the
     * inferred type of merged objects. Please
     * upgrade if you are experiencing issues.
     */ merge(merging) {
      const merged = new _ZodObject({
        unknownKeys: merging._def.unknownKeys,
        catchall: merging._def.catchall,
        shape: () => (({
          ...this._def.shape(),
          ...merging._def.shape()
        })),
        typeName: ZodFirstPartyTypeKind.ZodObject
      });
      return merged;
    }
    // merge<
    //   Incoming extends AnyZodObject,
    //   Augmentation extends Incoming["shape"],
    //   NewOutput extends {
    //     [k in keyof Augmentation | keyof Output]: k extends keyof Augmentation
    //       ? Augmentation[k]["_output"]
    //       : k extends keyof Output
    //       ? Output[k]
    //       : never;
    //   },
    //   NewInput extends {
    //     [k in keyof Augmentation | keyof Input]: k extends keyof Augmentation
    //       ? Augmentation[k]["_input"]
    //       : k extends keyof Input
    //       ? Input[k]
    //       : never;
    //   }
    // >(
    //   merging: Incoming
    // ): ZodObject<
    //   extendShape<T, ReturnType<Incoming["_def"]["shape"]>>,
    //   Incoming["_def"]["unknownKeys"],
    //   Incoming["_def"]["catchall"],
    //   NewOutput,
    //   NewInput
    // > {
    //   const merged: any = new ZodObject({
    //     unknownKeys: merging._def.unknownKeys,
    //     catchall: merging._def.catchall,
    //     shape: () =>
    //       objectUtil.mergeShapes(this._def.shape(), merging._def.shape()),
    //     typeName: ZodFirstPartyTypeKind.ZodObject,
    //   }) as any;
    //   return merged;
    // }
    setKey(key, schema) {
      return this.augment({
        [key]: schema
      });
    }
    // merge<Incoming extends AnyZodObject>(
    //   merging: Incoming
    // ): //ZodObject<T & Incoming["_shape"], UnknownKeys, Catchall> = (merging) => {
    // ZodObject<
    //   extendShape<T, ReturnType<Incoming["_def"]["shape"]>>,
    //   Incoming["_def"]["unknownKeys"],
    //   Incoming["_def"]["catchall"]
    // > {
    //   // const mergedShape = objectUtil.mergeShapes(
    //   //   this._def.shape(),
    //   //   merging._def.shape()
    //   // );
    //   const merged: any = new ZodObject({
    //     unknownKeys: merging._def.unknownKeys,
    //     catchall: merging._def.catchall,
    //     shape: () =>
    //       objectUtil.mergeShapes(this._def.shape(), merging._def.shape()),
    //     typeName: ZodFirstPartyTypeKind.ZodObject,
    //   }) as any;
    //   return merged;
    // }
    catchall(index) {
      return new _ZodObject({
        ...this._def,
        catchall: index
      });
    }
    pick(mask) {
      const shape = {};
      util.objectKeys(mask).forEach(key => {
        if (mask[key] && this.shape[key]) {
          shape[key] = this.shape[key];
        }
      });
      return new _ZodObject({
        ...this._def,
        shape: () => shape
      });
    }
    omit(mask) {
      const shape = {};
      util.objectKeys(this.shape).forEach(key => {
        if (!mask[key]) {
          shape[key] = this.shape[key];
        }
      });
      return new _ZodObject({
        ...this._def,
        shape: () => shape
      });
    }
    /**
     * @deprecated
     */ deepPartial() {
      return deepPartialify(this);
    }
    partial(mask) {
      const newShape = {};
      util.objectKeys(this.shape).forEach(key => {
        const fieldSchema = this.shape[key];
        if (mask && !mask[key]) {
          newShape[key] = fieldSchema;
        } else {
          newShape[key] = fieldSchema.optional();
        }
      });
      return new _ZodObject({
        ...this._def,
        shape: () => newShape
      });
    }
    required(mask) {
      const newShape = {};
      util.objectKeys(this.shape).forEach(key => {
        if (mask && !mask[key]) {
          newShape[key] = this.shape[key];
        } else {
          const fieldSchema = this.shape[key];
          let newField = fieldSchema;
          while (newField instanceof ZodOptional) {
            newField = newField._def.innerType;
          }
          newShape[key] = newField;
        }
      });
      return new _ZodObject({
        ...this._def,
        shape: () => newShape
      });
    }
    keyof() {
      return createZodEnum(util.objectKeys(this.shape));
    }
  };
  ZodObject.create = (shape, params) => new ZodObject({
    shape: () => shape,
    unknownKeys: "strip",
    catchall: ZodNever.create(),
    typeName: ZodFirstPartyTypeKind.ZodObject,
    ...processCreateParams(params)
  });
  ZodObject.strictCreate = (shape, params) => new ZodObject({
    shape: () => shape,
    unknownKeys: "strict",
    catchall: ZodNever.create(),
    typeName: ZodFirstPartyTypeKind.ZodObject,
    ...processCreateParams(params)
  });
  ZodObject.lazycreate = (shape, params) => new ZodObject({
    shape,
    unknownKeys: "strip",
    catchall: ZodNever.create(),
    typeName: ZodFirstPartyTypeKind.ZodObject,
    ...processCreateParams(params)
  });
  var ZodUnion = class extends ZodType {
    _parse(input) {
      const {ctx} = this._processInputParams(input);
      const options = this._def.options;
      function handleResults(results) {
        for (const result of results) {
          if (result.result.status === "valid") {
            return result.result;
          }
        }
        for (const result of results) {
          if (result.result.status === "dirty") {
            ctx.common.issues.push(...result.ctx.common.issues);
            return result.result;
          }
        }
        const unionErrors = results.map(result => new ZodError(result.ctx.common.issues));
        addIssueToContext(ctx, {
          code: ZodIssueCode.invalid_union,
          unionErrors
        });
        return INVALID;
      }
      if (ctx.common.async) {
        return Promise.all(options.map(async option => {
          const childCtx = {
            ...ctx,
            common: {
              ...ctx.common,
              issues: []
            },
            parent: null
          };
          return {
            result: await option._parseAsync({
              data: ctx.data,
              path: ctx.path,
              parent: childCtx
            }),
            ctx: childCtx
          };
        })).then(handleResults);
      } else {
        let dirty = void 0;
        const issues = [];
        for (const option of options) {
          const childCtx = {
            ...ctx,
            common: {
              ...ctx.common,
              issues: []
            },
            parent: null
          };
          const result = option._parseSync({
            data: ctx.data,
            path: ctx.path,
            parent: childCtx
          });
          if (result.status === "valid") {
            return result;
          } else if (result.status === "dirty" && !dirty) {
            dirty = {
              result,
              ctx: childCtx
            };
          }
          if (childCtx.common.issues.length) {
            issues.push(childCtx.common.issues);
          }
        }
        if (dirty) {
          ctx.common.issues.push(...dirty.ctx.common.issues);
          return dirty.result;
        }
        const unionErrors = issues.map(issues2 => new ZodError(issues2));
        addIssueToContext(ctx, {
          code: ZodIssueCode.invalid_union,
          unionErrors
        });
        return INVALID;
      }
    }
    get options() {
      return this._def.options;
    }
  };
  ZodUnion.create = (types, params) => new ZodUnion({
    options: types,
    typeName: ZodFirstPartyTypeKind.ZodUnion,
    ...processCreateParams(params)
  });
  var getDiscriminator = type => {
    if (type instanceof ZodLazy) {
      return getDiscriminator(type.schema);
    } else if (type instanceof ZodEffects) {
      return getDiscriminator(type.innerType());
    } else if (type instanceof ZodLiteral) {
      return [ type.value ];
    } else if (type instanceof ZodEnum) {
      return type.options;
    } else if (type instanceof ZodNativeEnum) {
      return util.objectValues(type.enum);
    } else if (type instanceof ZodDefault) {
      return getDiscriminator(type._def.innerType);
    } else if (type instanceof ZodUndefined) {
      return [ void 0 ];
    } else if (type instanceof ZodNull) {
      return [ null ];
    } else if (type instanceof ZodOptional) {
      return [ void 0, ...getDiscriminator(type.unwrap()) ];
    } else if (type instanceof ZodNullable) {
      return [ null, ...getDiscriminator(type.unwrap()) ];
    } else if (type instanceof ZodBranded) {
      return getDiscriminator(type.unwrap());
    } else if (type instanceof ZodReadonly) {
      return getDiscriminator(type.unwrap());
    } else if (type instanceof ZodCatch) {
      return getDiscriminator(type._def.innerType);
    } else {
      return [];
    }
  };
  var ZodDiscriminatedUnion = class _ZodDiscriminatedUnion extends ZodType {
    _parse(input) {
      const {ctx} = this._processInputParams(input);
      if (ctx.parsedType !== ZodParsedType.object) {
        addIssueToContext(ctx, {
          code: ZodIssueCode.invalid_type,
          expected: ZodParsedType.object,
          received: ctx.parsedType
        });
        return INVALID;
      }
      const discriminator = this.discriminator;
      const discriminatorValue = ctx.data[discriminator];
      const option = this.optionsMap.get(discriminatorValue);
      if (!option) {
        addIssueToContext(ctx, {
          code: ZodIssueCode.invalid_union_discriminator,
          options: Array.from(this.optionsMap.keys()),
          path: [ discriminator ]
        });
        return INVALID;
      }
      if (ctx.common.async) {
        return option._parseAsync({
          data: ctx.data,
          path: ctx.path,
          parent: ctx
        });
      } else {
        return option._parseSync({
          data: ctx.data,
          path: ctx.path,
          parent: ctx
        });
      }
    }
    get discriminator() {
      return this._def.discriminator;
    }
    get options() {
      return this._def.options;
    }
    get optionsMap() {
      return this._def.optionsMap;
    }
    /**
     * The constructor of the discriminated union schema. Its behaviour is very similar to that of the normal z.union() constructor.
     * However, it only allows a union of objects, all of which need to share a discriminator property. This property must
     * have a different value for each object in the union.
     * @param discriminator the name of the discriminator property
     * @param types an array of object schemas
     * @param params
     */ static create(discriminator, options, params) {
      const optionsMap =  new Map;
      for (const type of options) {
        const discriminatorValues = getDiscriminator(type.shape[discriminator]);
        if (!discriminatorValues.length) {
          throw new Error(`A discriminator value for key \`${discriminator}\` could not be extracted from all schema options`);
        }
        for (const value of discriminatorValues) {
          if (optionsMap.has(value)) {
            throw new Error(`Discriminator property ${String(discriminator)} has duplicate value ${String(value)}`);
          }
          optionsMap.set(value, type);
        }
      }
      return new _ZodDiscriminatedUnion({
        typeName: ZodFirstPartyTypeKind.ZodDiscriminatedUnion,
        discriminator,
        options,
        optionsMap,
        ...processCreateParams(params)
      });
    }
  };
  function mergeValues(a, b) {
    const aType = getParsedType(a);
    const bType = getParsedType(b);
    if (a === b) {
      return {
        valid: true,
        data: a
      };
    } else if (aType === ZodParsedType.object && bType === ZodParsedType.object) {
      const bKeys = util.objectKeys(b);
      const sharedKeys = util.objectKeys(a).filter(key => bKeys.indexOf(key) !== -1);
      const newObj = {
        ...a,
        ...b
      };
      for (const key of sharedKeys) {
        const sharedValue = mergeValues(a[key], b[key]);
        if (!sharedValue.valid) {
          return {
            valid: false
          };
        }
        newObj[key] = sharedValue.data;
      }
      return {
        valid: true,
        data: newObj
      };
    } else if (aType === ZodParsedType.array && bType === ZodParsedType.array) {
      if (a.length !== b.length) {
        return {
          valid: false
        };
      }
      const newArray = [];
      for (let index = 0; index < a.length; index++) {
        const itemA = a[index];
        const itemB = b[index];
        const sharedValue = mergeValues(itemA, itemB);
        if (!sharedValue.valid) {
          return {
            valid: false
          };
        }
        newArray.push(sharedValue.data);
      }
      return {
        valid: true,
        data: newArray
      };
    } else if (aType === ZodParsedType.date && bType === ZodParsedType.date && +a === +b) {
      return {
        valid: true,
        data: a
      };
    } else {
      return {
        valid: false
      };
    }
  }
  var ZodIntersection = class extends ZodType {
    _parse(input) {
      const {status, ctx} = this._processInputParams(input);
      const handleParsed = (parsedLeft, parsedRight) => {
        if (isAborted(parsedLeft) || isAborted(parsedRight)) {
          return INVALID;
        }
        const merged = mergeValues(parsedLeft.value, parsedRight.value);
        if (!merged.valid) {
          addIssueToContext(ctx, {
            code: ZodIssueCode.invalid_intersection_types
          });
          return INVALID;
        }
        if (isDirty(parsedLeft) || isDirty(parsedRight)) {
          status.dirty();
        }
        return {
          status: status.value,
          value: merged.data
        };
      };
      if (ctx.common.async) {
        return Promise.all([ this._def.left._parseAsync({
          data: ctx.data,
          path: ctx.path,
          parent: ctx
        }), this._def.right._parseAsync({
          data: ctx.data,
          path: ctx.path,
          parent: ctx
        }) ]).then(([left, right]) => handleParsed(left, right));
      } else {
        return handleParsed(this._def.left._parseSync({
          data: ctx.data,
          path: ctx.path,
          parent: ctx
        }), this._def.right._parseSync({
          data: ctx.data,
          path: ctx.path,
          parent: ctx
        }));
      }
    }
  };
  ZodIntersection.create = (left, right, params) => new ZodIntersection({
    left,
    right,
    typeName: ZodFirstPartyTypeKind.ZodIntersection,
    ...processCreateParams(params)
  });
  var ZodTuple = class _ZodTuple extends ZodType {
    _parse(input) {
      const {status, ctx} = this._processInputParams(input);
      if (ctx.parsedType !== ZodParsedType.array) {
        addIssueToContext(ctx, {
          code: ZodIssueCode.invalid_type,
          expected: ZodParsedType.array,
          received: ctx.parsedType
        });
        return INVALID;
      }
      if (ctx.data.length < this._def.items.length) {
        addIssueToContext(ctx, {
          code: ZodIssueCode.too_small,
          minimum: this._def.items.length,
          inclusive: true,
          exact: false,
          type: "array"
        });
        return INVALID;
      }
      const rest = this._def.rest;
      if (!rest && ctx.data.length > this._def.items.length) {
        addIssueToContext(ctx, {
          code: ZodIssueCode.too_big,
          maximum: this._def.items.length,
          inclusive: true,
          exact: false,
          type: "array"
        });
        status.dirty();
      }
      const items = [ ...ctx.data ].map((item, itemIndex) => {
        const schema = this._def.items[itemIndex] || this._def.rest;
        if (!schema) return null;
        return schema._parse(new ParseInputLazyPath(ctx, item, ctx.path, itemIndex));
      }).filter(x => !!x);
      if (ctx.common.async) {
        return Promise.all(items).then(results => ParseStatus.mergeArray(status, results));
      } else {
        return ParseStatus.mergeArray(status, items);
      }
    }
    get items() {
      return this._def.items;
    }
    rest(rest) {
      return new _ZodTuple({
        ...this._def,
        rest
      });
    }
  };
  ZodTuple.create = (schemas, params) => {
    if (!Array.isArray(schemas)) {
      throw new Error("You must pass an array of schemas to z.tuple([ ... ])");
    }
    return new ZodTuple({
      items: schemas,
      typeName: ZodFirstPartyTypeKind.ZodTuple,
      rest: null,
      ...processCreateParams(params)
    });
  };
  var ZodRecord = class _ZodRecord extends ZodType {
    get keySchema() {
      return this._def.keyType;
    }
    get valueSchema() {
      return this._def.valueType;
    }
    _parse(input) {
      const {status, ctx} = this._processInputParams(input);
      if (ctx.parsedType !== ZodParsedType.object) {
        addIssueToContext(ctx, {
          code: ZodIssueCode.invalid_type,
          expected: ZodParsedType.object,
          received: ctx.parsedType
        });
        return INVALID;
      }
      const pairs = [];
      const keyType = this._def.keyType;
      const valueType = this._def.valueType;
      for (const key in ctx.data) {
        pairs.push({
          key: keyType._parse(new ParseInputLazyPath(ctx, key, ctx.path, key)),
          value: valueType._parse(new ParseInputLazyPath(ctx, ctx.data[key], ctx.path, key)),
          alwaysSet: key in ctx.data
        });
      }
      if (ctx.common.async) {
        return ParseStatus.mergeObjectAsync(status, pairs);
      } else {
        return ParseStatus.mergeObjectSync(status, pairs);
      }
    }
    get element() {
      return this._def.valueType;
    }
    static create(first, second, third) {
      if (second instanceof ZodType) {
        return new _ZodRecord({
          keyType: first,
          valueType: second,
          typeName: ZodFirstPartyTypeKind.ZodRecord,
          ...processCreateParams(third)
        });
      }
      return new _ZodRecord({
        keyType: ZodString.create(),
        valueType: first,
        typeName: ZodFirstPartyTypeKind.ZodRecord,
        ...processCreateParams(second)
      });
    }
  };
  var ZodMap = class extends ZodType {
    get keySchema() {
      return this._def.keyType;
    }
    get valueSchema() {
      return this._def.valueType;
    }
    _parse(input) {
      const {status, ctx} = this._processInputParams(input);
      if (ctx.parsedType !== ZodParsedType.map) {
        addIssueToContext(ctx, {
          code: ZodIssueCode.invalid_type,
          expected: ZodParsedType.map,
          received: ctx.parsedType
        });
        return INVALID;
      }
      const keyType = this._def.keyType;
      const valueType = this._def.valueType;
      const pairs = [ ...ctx.data.entries() ].map(([key, value], index) => ({
        key: keyType._parse(new ParseInputLazyPath(ctx, key, ctx.path, [ index, "key" ])),
        value: valueType._parse(new ParseInputLazyPath(ctx, value, ctx.path, [ index, "value" ]))
      }));
      if (ctx.common.async) {
        const finalMap =  new Map;
        return Promise.resolve().then(async () => {
          for (const pair of pairs) {
            const key = await pair.key;
            const value = await pair.value;
            if (key.status === "aborted" || value.status === "aborted") {
              return INVALID;
            }
            if (key.status === "dirty" || value.status === "dirty") {
              status.dirty();
            }
            finalMap.set(key.value, value.value);
          }
          return {
            status: status.value,
            value: finalMap
          };
        });
      } else {
        const finalMap =  new Map;
        for (const pair of pairs) {
          const key = pair.key;
          const value = pair.value;
          if (key.status === "aborted" || value.status === "aborted") {
            return INVALID;
          }
          if (key.status === "dirty" || value.status === "dirty") {
            status.dirty();
          }
          finalMap.set(key.value, value.value);
        }
        return {
          status: status.value,
          value: finalMap
        };
      }
    }
  };
  ZodMap.create = (keyType, valueType, params) => new ZodMap({
    valueType,
    keyType,
    typeName: ZodFirstPartyTypeKind.ZodMap,
    ...processCreateParams(params)
  });
  var ZodSet = class _ZodSet extends ZodType {
    _parse(input) {
      const {status, ctx} = this._processInputParams(input);
      if (ctx.parsedType !== ZodParsedType.set) {
        addIssueToContext(ctx, {
          code: ZodIssueCode.invalid_type,
          expected: ZodParsedType.set,
          received: ctx.parsedType
        });
        return INVALID;
      }
      const def = this._def;
      if (def.minSize !== null) {
        if (ctx.data.size < def.minSize.value) {
          addIssueToContext(ctx, {
            code: ZodIssueCode.too_small,
            minimum: def.minSize.value,
            type: "set",
            inclusive: true,
            exact: false,
            message: def.minSize.message
          });
          status.dirty();
        }
      }
      if (def.maxSize !== null) {
        if (ctx.data.size > def.maxSize.value) {
          addIssueToContext(ctx, {
            code: ZodIssueCode.too_big,
            maximum: def.maxSize.value,
            type: "set",
            inclusive: true,
            exact: false,
            message: def.maxSize.message
          });
          status.dirty();
        }
      }
      const valueType = this._def.valueType;
      function finalizeSet(elements2) {
        const parsedSet =  new Set;
        for (const element of elements2) {
          if (element.status === "aborted") return INVALID;
          if (element.status === "dirty") status.dirty();
          parsedSet.add(element.value);
        }
        return {
          status: status.value,
          value: parsedSet
        };
      }
      const elements = [ ...ctx.data.values() ].map((item, i) => valueType._parse(new ParseInputLazyPath(ctx, item, ctx.path, i)));
      if (ctx.common.async) {
        return Promise.all(elements).then(elements2 => finalizeSet(elements2));
      } else {
        return finalizeSet(elements);
      }
    }
    min(minSize, message) {
      return new _ZodSet({
        ...this._def,
        minSize: {
          value: minSize,
          message: errorUtil.toString(message)
        }
      });
    }
    max(maxSize, message) {
      return new _ZodSet({
        ...this._def,
        maxSize: {
          value: maxSize,
          message: errorUtil.toString(message)
        }
      });
    }
    size(size, message) {
      return this.min(size, message).max(size, message);
    }
    nonempty(message) {
      return this.min(1, message);
    }
  };
  ZodSet.create = (valueType, params) => new ZodSet({
    valueType,
    minSize: null,
    maxSize: null,
    typeName: ZodFirstPartyTypeKind.ZodSet,
    ...processCreateParams(params)
  });
  var ZodFunction = class _ZodFunction extends ZodType {
    constructor() {
      super(...arguments);
      this.validate = this.implement;
    }
    _parse(input) {
      const {ctx} = this._processInputParams(input);
      if (ctx.parsedType !== ZodParsedType.function) {
        addIssueToContext(ctx, {
          code: ZodIssueCode.invalid_type,
          expected: ZodParsedType.function,
          received: ctx.parsedType
        });
        return INVALID;
      }
      function makeArgsIssue(args, error) {
        return makeIssue({
          data: args,
          path: ctx.path,
          errorMaps: [ ctx.common.contextualErrorMap, ctx.schemaErrorMap, getErrorMap(), errorMap ].filter(x => !!x),
          issueData: {
            code: ZodIssueCode.invalid_arguments,
            argumentsError: error
          }
        });
      }
      function makeReturnsIssue(returns, error) {
        return makeIssue({
          data: returns,
          path: ctx.path,
          errorMaps: [ ctx.common.contextualErrorMap, ctx.schemaErrorMap, getErrorMap(), errorMap ].filter(x => !!x),
          issueData: {
            code: ZodIssueCode.invalid_return_type,
            returnTypeError: error
          }
        });
      }
      const params = {
        errorMap: ctx.common.contextualErrorMap
      };
      const fn = ctx.data;
      if (this._def.returns instanceof ZodPromise) {
        const me = this;
        return OK(async function(...args) {
          const error = new ZodError([]);
          const parsedArgs = await me._def.args.parseAsync(args, params).catch(e => {
            error.addIssue(makeArgsIssue(args, e));
            throw error;
          });
          const result = await Reflect.apply(fn, this, parsedArgs);
          const parsedReturns = await me._def.returns._def.type.parseAsync(result, params).catch(e => {
            error.addIssue(makeReturnsIssue(result, e));
            throw error;
          });
          return parsedReturns;
        });
      } else {
        const me = this;
        return OK(function(...args) {
          const parsedArgs = me._def.args.safeParse(args, params);
          if (!parsedArgs.success) {
            throw new ZodError([ makeArgsIssue(args, parsedArgs.error) ]);
          }
          const result = Reflect.apply(fn, this, parsedArgs.data);
          const parsedReturns = me._def.returns.safeParse(result, params);
          if (!parsedReturns.success) {
            throw new ZodError([ makeReturnsIssue(result, parsedReturns.error) ]);
          }
          return parsedReturns.data;
        });
      }
    }
    parameters() {
      return this._def.args;
    }
    returnType() {
      return this._def.returns;
    }
    args(...items) {
      return new _ZodFunction({
        ...this._def,
        args: ZodTuple.create(items).rest(ZodUnknown.create())
      });
    }
    returns(returnType) {
      return new _ZodFunction({
        ...this._def,
        returns: returnType
      });
    }
    implement(func) {
      const validatedFunc = this.parse(func);
      return validatedFunc;
    }
    strictImplement(func) {
      const validatedFunc = this.parse(func);
      return validatedFunc;
    }
    static create(args, returns, params) {
      return new _ZodFunction({
        args: args ? args : ZodTuple.create([]).rest(ZodUnknown.create()),
        returns: returns || ZodUnknown.create(),
        typeName: ZodFirstPartyTypeKind.ZodFunction,
        ...processCreateParams(params)
      });
    }
  };
  var ZodLazy = class extends ZodType {
    get schema() {
      return this._def.getter();
    }
    _parse(input) {
      const {ctx} = this._processInputParams(input);
      const lazySchema = this._def.getter();
      return lazySchema._parse({
        data: ctx.data,
        path: ctx.path,
        parent: ctx
      });
    }
  };
  ZodLazy.create = (getter, params) => new ZodLazy({
    getter,
    typeName: ZodFirstPartyTypeKind.ZodLazy,
    ...processCreateParams(params)
  });
  var ZodLiteral = class extends ZodType {
    _parse(input) {
      if (input.data !== this._def.value) {
        const ctx = this._getOrReturnCtx(input);
        addIssueToContext(ctx, {
          received: ctx.data,
          code: ZodIssueCode.invalid_literal,
          expected: this._def.value
        });
        return INVALID;
      }
      return {
        status: "valid",
        value: input.data
      };
    }
    get value() {
      return this._def.value;
    }
  };
  ZodLiteral.create = (value, params) => new ZodLiteral({
    value,
    typeName: ZodFirstPartyTypeKind.ZodLiteral,
    ...processCreateParams(params)
  });
  function createZodEnum(values, params) {
    return new ZodEnum({
      values,
      typeName: ZodFirstPartyTypeKind.ZodEnum,
      ...processCreateParams(params)
    });
  }
  var ZodEnum = class _ZodEnum extends ZodType {
    constructor() {
      super(...arguments);
      _ZodEnum_cache.set(this, void 0);
    }
    _parse(input) {
      if (typeof input.data !== "string") {
        const ctx = this._getOrReturnCtx(input);
        const expectedValues = this._def.values;
        addIssueToContext(ctx, {
          expected: util.joinValues(expectedValues),
          received: ctx.parsedType,
          code: ZodIssueCode.invalid_type
        });
        return INVALID;
      }
      if (!__classPrivateFieldGet(this, _ZodEnum_cache)) {
        __classPrivateFieldSet(this, _ZodEnum_cache, new Set(this._def.values));
      }
      if (!__classPrivateFieldGet(this, _ZodEnum_cache).has(input.data)) {
        const ctx = this._getOrReturnCtx(input);
        const expectedValues = this._def.values;
        addIssueToContext(ctx, {
          received: ctx.data,
          code: ZodIssueCode.invalid_enum_value,
          options: expectedValues
        });
        return INVALID;
      }
      return OK(input.data);
    }
    get options() {
      return this._def.values;
    }
    get enum() {
      const enumValues = {};
      for (const val of this._def.values) {
        enumValues[val] = val;
      }
      return enumValues;
    }
    get Values() {
      const enumValues = {};
      for (const val of this._def.values) {
        enumValues[val] = val;
      }
      return enumValues;
    }
    get Enum() {
      const enumValues = {};
      for (const val of this._def.values) {
        enumValues[val] = val;
      }
      return enumValues;
    }
    extract(values, newDef = this._def) {
      return _ZodEnum.create(values, {
        ...this._def,
        ...newDef
      });
    }
    exclude(values, newDef = this._def) {
      return _ZodEnum.create(this.options.filter(opt => !values.includes(opt)), {
        ...this._def,
        ...newDef
      });
    }
  };
  _ZodEnum_cache =  new WeakMap;
  ZodEnum.create = createZodEnum;
  var ZodNativeEnum = class extends ZodType {
    constructor() {
      super(...arguments);
      _ZodNativeEnum_cache.set(this, void 0);
    }
    _parse(input) {
      const nativeEnumValues = util.getValidEnumValues(this._def.values);
      const ctx = this._getOrReturnCtx(input);
      if (ctx.parsedType !== ZodParsedType.string && ctx.parsedType !== ZodParsedType.number) {
        const expectedValues = util.objectValues(nativeEnumValues);
        addIssueToContext(ctx, {
          expected: util.joinValues(expectedValues),
          received: ctx.parsedType,
          code: ZodIssueCode.invalid_type
        });
        return INVALID;
      }
      if (!__classPrivateFieldGet(this, _ZodNativeEnum_cache)) {
        __classPrivateFieldSet(this, _ZodNativeEnum_cache, new Set(util.getValidEnumValues(this._def.values)));
      }
      if (!__classPrivateFieldGet(this, _ZodNativeEnum_cache).has(input.data)) {
        const expectedValues = util.objectValues(nativeEnumValues);
        addIssueToContext(ctx, {
          received: ctx.data,
          code: ZodIssueCode.invalid_enum_value,
          options: expectedValues
        });
        return INVALID;
      }
      return OK(input.data);
    }
    get enum() {
      return this._def.values;
    }
  };
  _ZodNativeEnum_cache =  new WeakMap;
  ZodNativeEnum.create = (values, params) => new ZodNativeEnum({
    values,
    typeName: ZodFirstPartyTypeKind.ZodNativeEnum,
    ...processCreateParams(params)
  });
  var ZodPromise = class extends ZodType {
    unwrap() {
      return this._def.type;
    }
    _parse(input) {
      const {ctx} = this._processInputParams(input);
      if (ctx.parsedType !== ZodParsedType.promise && ctx.common.async === false) {
        addIssueToContext(ctx, {
          code: ZodIssueCode.invalid_type,
          expected: ZodParsedType.promise,
          received: ctx.parsedType
        });
        return INVALID;
      }
      const promisified = ctx.parsedType === ZodParsedType.promise ? ctx.data : Promise.resolve(ctx.data);
      return OK(promisified.then(data => this._def.type.parseAsync(data, {
        path: ctx.path,
        errorMap: ctx.common.contextualErrorMap
      })));
    }
  };
  ZodPromise.create = (schema, params) => new ZodPromise({
    type: schema,
    typeName: ZodFirstPartyTypeKind.ZodPromise,
    ...processCreateParams(params)
  });
  var ZodEffects = class extends ZodType {
    innerType() {
      return this._def.schema;
    }
    sourceType() {
      return this._def.schema._def.typeName === ZodFirstPartyTypeKind.ZodEffects ? this._def.schema.sourceType() : this._def.schema;
    }
    _parse(input) {
      const {status, ctx} = this._processInputParams(input);
      const effect = this._def.effect || null;
      const checkCtx = {
        addIssue: arg => {
          addIssueToContext(ctx, arg);
          if (arg.fatal) {
            status.abort();
          } else {
            status.dirty();
          }
        },
        get path() {
          return ctx.path;
        }
      };
      checkCtx.addIssue = checkCtx.addIssue.bind(checkCtx);
      if (effect.type === "preprocess") {
        const processed = effect.transform(ctx.data, checkCtx);
        if (ctx.common.async) {
          return Promise.resolve(processed).then(async processed2 => {
            if (status.value === "aborted") return INVALID;
            const result = await this._def.schema._parseAsync({
              data: processed2,
              path: ctx.path,
              parent: ctx
            });
            if (result.status === "aborted") return INVALID;
            if (result.status === "dirty") return DIRTY(result.value);
            if (status.value === "dirty") return DIRTY(result.value);
            return result;
          });
        } else {
          if (status.value === "aborted") return INVALID;
          const result = this._def.schema._parseSync({
            data: processed,
            path: ctx.path,
            parent: ctx
          });
          if (result.status === "aborted") return INVALID;
          if (result.status === "dirty") return DIRTY(result.value);
          if (status.value === "dirty") return DIRTY(result.value);
          return result;
        }
      }
      if (effect.type === "refinement") {
        const executeRefinement = acc => {
          const result = effect.refinement(acc, checkCtx);
          if (ctx.common.async) {
            return Promise.resolve(result);
          }
          if (result instanceof Promise) {
            throw new Error("Async refinement encountered during synchronous parse operation. Use .parseAsync instead.");
          }
          return acc;
        };
        if (ctx.common.async === false) {
          const inner = this._def.schema._parseSync({
            data: ctx.data,
            path: ctx.path,
            parent: ctx
          });
          if (inner.status === "aborted") return INVALID;
          if (inner.status === "dirty") status.dirty();
          executeRefinement(inner.value);
          return {
            status: status.value,
            value: inner.value
          };
        } else {
          return this._def.schema._parseAsync({
            data: ctx.data,
            path: ctx.path,
            parent: ctx
          }).then(inner => {
            if (inner.status === "aborted") return INVALID;
            if (inner.status === "dirty") status.dirty();
            return executeRefinement(inner.value).then(() => ({
              status: status.value,
              value: inner.value
            }));
          });
        }
      }
      if (effect.type === "transform") {
        if (ctx.common.async === false) {
          const base = this._def.schema._parseSync({
            data: ctx.data,
            path: ctx.path,
            parent: ctx
          });
          if (!isValid(base)) return base;
          const result = effect.transform(base.value, checkCtx);
          if (result instanceof Promise) {
            throw new Error(`Asynchronous transform encountered during synchronous parse operation. Use .parseAsync instead.`);
          }
          return {
            status: status.value,
            value: result
          };
        } else {
          return this._def.schema._parseAsync({
            data: ctx.data,
            path: ctx.path,
            parent: ctx
          }).then(base => {
            if (!isValid(base)) return base;
            return Promise.resolve(effect.transform(base.value, checkCtx)).then(result => (({
              status: status.value,
              value: result
            })));
          });
        }
      }
      util.assertNever(effect);
    }
  };
  ZodEffects.create = (schema, effect, params) => new ZodEffects({
    schema,
    typeName: ZodFirstPartyTypeKind.ZodEffects,
    effect,
    ...processCreateParams(params)
  });
  ZodEffects.createWithPreprocess = (preprocess, schema, params) => new ZodEffects({
    schema,
    effect: {
      type: "preprocess",
      transform: preprocess
    },
    typeName: ZodFirstPartyTypeKind.ZodEffects,
    ...processCreateParams(params)
  });
  var ZodOptional = class extends ZodType {
    _parse(input) {
      const parsedType = this._getType(input);
      if (parsedType === ZodParsedType.undefined) {
        return OK(void 0);
      }
      return this._def.innerType._parse(input);
    }
    unwrap() {
      return this._def.innerType;
    }
  };
  ZodOptional.create = (type, params) => new ZodOptional({
    innerType: type,
    typeName: ZodFirstPartyTypeKind.ZodOptional,
    ...processCreateParams(params)
  });
  var ZodNullable = class extends ZodType {
    _parse(input) {
      const parsedType = this._getType(input);
      if (parsedType === ZodParsedType.null) {
        return OK(null);
      }
      return this._def.innerType._parse(input);
    }
    unwrap() {
      return this._def.innerType;
    }
  };
  ZodNullable.create = (type, params) => new ZodNullable({
    innerType: type,
    typeName: ZodFirstPartyTypeKind.ZodNullable,
    ...processCreateParams(params)
  });
  var ZodDefault = class extends ZodType {
    _parse(input) {
      const {ctx} = this._processInputParams(input);
      let data = ctx.data;
      if (ctx.parsedType === ZodParsedType.undefined) {
        data = this._def.defaultValue();
      }
      return this._def.innerType._parse({
        data,
        path: ctx.path,
        parent: ctx
      });
    }
    removeDefault() {
      return this._def.innerType;
    }
  };
  ZodDefault.create = (type, params) => new ZodDefault({
    innerType: type,
    typeName: ZodFirstPartyTypeKind.ZodDefault,
    defaultValue: typeof params.default === "function" ? params.default : () => params.default,
    ...processCreateParams(params)
  });
  var ZodCatch = class extends ZodType {
    _parse(input) {
      const {ctx} = this._processInputParams(input);
      const newCtx = {
        ...ctx,
        common: {
          ...ctx.common,
          issues: []
        }
      };
      const result = this._def.innerType._parse({
        data: newCtx.data,
        path: newCtx.path,
        parent: {
          ...newCtx
        }
      });
      if (isAsync(result)) {
        return result.then(result2 => ({
          status: "valid",
          value: result2.status === "valid" ? result2.value : this._def.catchValue({
            get error() {
              return new ZodError(newCtx.common.issues);
            },
            input: newCtx.data
          })
        }));
      } else {
        return {
          status: "valid",
          value: result.status === "valid" ? result.value : this._def.catchValue({
            get error() {
              return new ZodError(newCtx.common.issues);
            },
            input: newCtx.data
          })
        };
      }
    }
    removeCatch() {
      return this._def.innerType;
    }
  };
  ZodCatch.create = (type, params) => new ZodCatch({
    innerType: type,
    typeName: ZodFirstPartyTypeKind.ZodCatch,
    catchValue: typeof params.catch === "function" ? params.catch : () => params.catch,
    ...processCreateParams(params)
  });
  var ZodNaN = class extends ZodType {
    _parse(input) {
      const parsedType = this._getType(input);
      if (parsedType !== ZodParsedType.nan) {
        const ctx = this._getOrReturnCtx(input);
        addIssueToContext(ctx, {
          code: ZodIssueCode.invalid_type,
          expected: ZodParsedType.nan,
          received: ctx.parsedType
        });
        return INVALID;
      }
      return {
        status: "valid",
        value: input.data
      };
    }
  };
  ZodNaN.create = params => new ZodNaN({
    typeName: ZodFirstPartyTypeKind.ZodNaN,
    ...processCreateParams(params)
  });
  var BRAND =  Symbol("zod_brand");
  var ZodBranded = class extends ZodType {
    _parse(input) {
      const {ctx} = this._processInputParams(input);
      const data = ctx.data;
      return this._def.type._parse({
        data,
        path: ctx.path,
        parent: ctx
      });
    }
    unwrap() {
      return this._def.type;
    }
  };
  var ZodPipeline = class _ZodPipeline extends ZodType {
    _parse(input) {
      const {status, ctx} = this._processInputParams(input);
      if (ctx.common.async) {
        const handleAsync = async () => {
          const inResult = await this._def.in._parseAsync({
            data: ctx.data,
            path: ctx.path,
            parent: ctx
          });
          if (inResult.status === "aborted") return INVALID;
          if (inResult.status === "dirty") {
            status.dirty();
            return DIRTY(inResult.value);
          } else {
            return this._def.out._parseAsync({
              data: inResult.value,
              path: ctx.path,
              parent: ctx
            });
          }
        };
        return handleAsync();
      } else {
        const inResult = this._def.in._parseSync({
          data: ctx.data,
          path: ctx.path,
          parent: ctx
        });
        if (inResult.status === "aborted") return INVALID;
        if (inResult.status === "dirty") {
          status.dirty();
          return {
            status: "dirty",
            value: inResult.value
          };
        } else {
          return this._def.out._parseSync({
            data: inResult.value,
            path: ctx.path,
            parent: ctx
          });
        }
      }
    }
    static create(a, b) {
      return new _ZodPipeline({
        in: a,
        out: b,
        typeName: ZodFirstPartyTypeKind.ZodPipeline
      });
    }
  };
  var ZodReadonly = class extends ZodType {
    _parse(input) {
      const result = this._def.innerType._parse(input);
      const freeze = data => {
        if (isValid(data)) {
          data.value = Object.freeze(data.value);
        }
        return data;
      };
      return isAsync(result) ? result.then(data => freeze(data)) : freeze(result);
    }
    unwrap() {
      return this._def.innerType;
    }
  };
  ZodReadonly.create = (type, params) => new ZodReadonly({
    innerType: type,
    typeName: ZodFirstPartyTypeKind.ZodReadonly,
    ...processCreateParams(params)
  });
  function custom(check, params = {}, fatal) {
    if (check) return ZodAny.create().superRefine((data, ctx) => {
      var _a, _b;
      if (!check(data)) {
        const p = typeof params === "function" ? params(data) : typeof params === "string" ? {
          message: params
        } : params;
        const _fatal = (_b = (_a = p.fatal) !== null && _a !== void 0 ? _a : fatal) !== null && _b !== void 0 ? _b : true;
        const p2 = typeof p === "string" ? {
          message: p
        } : p;
        ctx.addIssue({
          code: "custom",
          ...p2,
          fatal: _fatal
        });
      }
    });
    return ZodAny.create();
  }
  var late = {
    object: ZodObject.lazycreate
  };
  var ZodFirstPartyTypeKind;
  (function(ZodFirstPartyTypeKind2) {
    ZodFirstPartyTypeKind2["ZodString"] = "ZodString";
    ZodFirstPartyTypeKind2["ZodNumber"] = "ZodNumber";
    ZodFirstPartyTypeKind2["ZodNaN"] = "ZodNaN";
    ZodFirstPartyTypeKind2["ZodBigInt"] = "ZodBigInt";
    ZodFirstPartyTypeKind2["ZodBoolean"] = "ZodBoolean";
    ZodFirstPartyTypeKind2["ZodDate"] = "ZodDate";
    ZodFirstPartyTypeKind2["ZodSymbol"] = "ZodSymbol";
    ZodFirstPartyTypeKind2["ZodUndefined"] = "ZodUndefined";
    ZodFirstPartyTypeKind2["ZodNull"] = "ZodNull";
    ZodFirstPartyTypeKind2["ZodAny"] = "ZodAny";
    ZodFirstPartyTypeKind2["ZodUnknown"] = "ZodUnknown";
    ZodFirstPartyTypeKind2["ZodNever"] = "ZodNever";
    ZodFirstPartyTypeKind2["ZodVoid"] = "ZodVoid";
    ZodFirstPartyTypeKind2["ZodArray"] = "ZodArray";
    ZodFirstPartyTypeKind2["ZodObject"] = "ZodObject";
    ZodFirstPartyTypeKind2["ZodUnion"] = "ZodUnion";
    ZodFirstPartyTypeKind2["ZodDiscriminatedUnion"] = "ZodDiscriminatedUnion";
    ZodFirstPartyTypeKind2["ZodIntersection"] = "ZodIntersection";
    ZodFirstPartyTypeKind2["ZodTuple"] = "ZodTuple";
    ZodFirstPartyTypeKind2["ZodRecord"] = "ZodRecord";
    ZodFirstPartyTypeKind2["ZodMap"] = "ZodMap";
    ZodFirstPartyTypeKind2["ZodSet"] = "ZodSet";
    ZodFirstPartyTypeKind2["ZodFunction"] = "ZodFunction";
    ZodFirstPartyTypeKind2["ZodLazy"] = "ZodLazy";
    ZodFirstPartyTypeKind2["ZodLiteral"] = "ZodLiteral";
    ZodFirstPartyTypeKind2["ZodEnum"] = "ZodEnum";
    ZodFirstPartyTypeKind2["ZodEffects"] = "ZodEffects";
    ZodFirstPartyTypeKind2["ZodNativeEnum"] = "ZodNativeEnum";
    ZodFirstPartyTypeKind2["ZodOptional"] = "ZodOptional";
    ZodFirstPartyTypeKind2["ZodNullable"] = "ZodNullable";
    ZodFirstPartyTypeKind2["ZodDefault"] = "ZodDefault";
    ZodFirstPartyTypeKind2["ZodCatch"] = "ZodCatch";
    ZodFirstPartyTypeKind2["ZodPromise"] = "ZodPromise";
    ZodFirstPartyTypeKind2["ZodBranded"] = "ZodBranded";
    ZodFirstPartyTypeKind2["ZodPipeline"] = "ZodPipeline";
    ZodFirstPartyTypeKind2["ZodReadonly"] = "ZodReadonly";
  })(ZodFirstPartyTypeKind || (ZodFirstPartyTypeKind = {}));
  var instanceOfType = (cls, params = {
    message: `Input not instance of ${cls.name}`
  }) => custom(data => data instanceof cls, params);
  var stringType = ZodString.create;
  var numberType = ZodNumber.create;
  var nanType = ZodNaN.create;
  var bigIntType = ZodBigInt.create;
  var booleanType = ZodBoolean.create;
  var dateType = ZodDate.create;
  var symbolType = ZodSymbol.create;
  var undefinedType = ZodUndefined.create;
  var nullType = ZodNull.create;
  var anyType = ZodAny.create;
  var unknownType = ZodUnknown.create;
  var neverType = ZodNever.create;
  var voidType = ZodVoid.create;
  var arrayType = ZodArray.create;
  var objectType = ZodObject.create;
  var strictObjectType = ZodObject.strictCreate;
  var unionType = ZodUnion.create;
  var discriminatedUnionType = ZodDiscriminatedUnion.create;
  var intersectionType = ZodIntersection.create;
  var tupleType = ZodTuple.create;
  var recordType = ZodRecord.create;
  var mapType = ZodMap.create;
  var setType = ZodSet.create;
  var functionType = ZodFunction.create;
  var lazyType = ZodLazy.create;
  var literalType = ZodLiteral.create;
  var enumType = ZodEnum.create;
  var nativeEnumType = ZodNativeEnum.create;
  var promiseType = ZodPromise.create;
  var effectsType = ZodEffects.create;
  var optionalType = ZodOptional.create;
  var nullableType = ZodNullable.create;
  var preprocessType = ZodEffects.createWithPreprocess;
  var pipelineType = ZodPipeline.create;
  var ostring = () => stringType().optional();
  var onumber = () => numberType().optional();
  var oboolean = () => booleanType().optional();
  var coerce = {
    string: (arg => ZodString.create({
      ...arg,
      coerce: true
    })),
    number: (arg => ZodNumber.create({
      ...arg,
      coerce: true
    })),
    boolean: (arg => ZodBoolean.create({
      ...arg,
      coerce: true
    })),
    bigint: (arg => ZodBigInt.create({
      ...arg,
      coerce: true
    })),
    date: (arg => ZodDate.create({
      ...arg,
      coerce: true
    }))
  };
  var NEVER = INVALID;
  var z =  Object.freeze({
    __proto__: null,
    defaultErrorMap: errorMap,
    setErrorMap,
    getErrorMap,
    makeIssue,
    EMPTY_PATH,
    addIssueToContext,
    ParseStatus,
    INVALID,
    DIRTY,
    OK,
    isAborted,
    isDirty,
    isValid,
    isAsync,
    get util() {
      return util;
    },
    get objectUtil() {
      return objectUtil;
    },
    ZodParsedType,
    getParsedType,
    ZodType,
    datetimeRegex,
    ZodString,
    ZodNumber,
    ZodBigInt,
    ZodBoolean,
    ZodDate,
    ZodSymbol,
    ZodUndefined,
    ZodNull,
    ZodAny,
    ZodUnknown,
    ZodNever,
    ZodVoid,
    ZodArray,
    ZodObject,
    ZodUnion,
    ZodDiscriminatedUnion,
    ZodIntersection,
    ZodTuple,
    ZodRecord,
    ZodMap,
    ZodSet,
    ZodFunction,
    ZodLazy,
    ZodLiteral,
    ZodEnum,
    ZodNativeEnum,
    ZodPromise,
    ZodEffects,
    ZodTransformer: ZodEffects,
    ZodOptional,
    ZodNullable,
    ZodDefault,
    ZodCatch,
    ZodNaN,
    BRAND,
    ZodBranded,
    ZodPipeline,
    ZodReadonly,
    custom,
    Schema: ZodType,
    ZodSchema: ZodType,
    late,
    get ZodFirstPartyTypeKind() {
      return ZodFirstPartyTypeKind;
    },
    coerce,
    any: anyType,
    array: arrayType,
    bigint: bigIntType,
    boolean: booleanType,
    date: dateType,
    discriminatedUnion: discriminatedUnionType,
    effect: effectsType,
    "enum": enumType,
    "function": functionType,
    "instanceof": instanceOfType,
    intersection: intersectionType,
    lazy: lazyType,
    literal: literalType,
    map: mapType,
    nan: nanType,
    nativeEnum: nativeEnumType,
    never: neverType,
    "null": nullType,
    nullable: nullableType,
    number: numberType,
    object: objectType,
    oboolean,
    onumber,
    optional: optionalType,
    ostring,
    pipeline: pipelineType,
    preprocess: preprocessType,
    promise: promiseType,
    record: recordType,
    set: setType,
    strictObject: strictObjectType,
    string: stringType,
    symbol: symbolType,
    transformer: effectsType,
    tuple: tupleType,
    "undefined": undefinedType,
    union: unionType,
    unknown: unknownType,
    "void": voidType,
    NEVER,
    ZodIssueCode,
    quotelessJson,
    ZodError
  });
  // node_modules/@discord/embedded-app-sdk/output/_virtual/BigInteger2.mjs
  var BigInteger = {
    exports: {}
  };
  // node_modules/@discord/embedded-app-sdk/output/lib/big-integer/BigInteger.mjs
  var hasRequiredBigInteger;
  function requireBigInteger() {
    if (hasRequiredBigInteger) return BigInteger.exports;
    hasRequiredBigInteger = 1;
    (function(module) {
      var bigInt2 = (function(undefined$1) {
        var BASE2 = 1e7, LOG_BASE2 = 7, MAX_INT = 9007199254740992, MAX_INT_ARR = smallToArray(MAX_INT), DEFAULT_ALPHABET = "0123456789abcdefghijklmnopqrstuvwxyz";
        var supportsNativeBigInt = typeof BigInt === "function";
        function Integer(v, radix, alphabet, caseSensitive) {
          if (typeof v === "undefined") return Integer[0];
          if (typeof radix !== "undefined") return +radix === 10 && !alphabet ? parseValue(v) : parseBase(v, radix, alphabet, caseSensitive);
          return parseValue(v);
        }
        function BigInteger2(value, sign) {
          this.value = value;
          this.sign = sign;
          this.isSmall = false;
        }
        BigInteger2.prototype = Object.create(Integer.prototype);
        function SmallInteger(value) {
          this.value = value;
          this.sign = value < 0;
          this.isSmall = true;
        }
        SmallInteger.prototype = Object.create(Integer.prototype);
        function NativeBigInt(value) {
          this.value = value;
        }
        NativeBigInt.prototype = Object.create(Integer.prototype);
        function isPrecise(n) {
          return -MAX_INT < n && n < MAX_INT;
        }
        function smallToArray(n) {
          if (n < 1e7) return [ n ];
          if (n < 1e14) return [ n % 1e7, Math.floor(n / 1e7) ];
          return [ n % 1e7, Math.floor(n / 1e7) % 1e7, Math.floor(n / 1e14) ];
        }
        function arrayToSmall(arr) {
          trim(arr);
          var length = arr.length;
          if (length < 4 && compareAbs(arr, MAX_INT_ARR) < 0) {
            switch (length) {
             case 0:
              return 0;

             case 1:
              return arr[0];

             case 2:
              return arr[0] + arr[1] * BASE2;

             default:
              return arr[0] + (arr[1] + arr[2] * BASE2) * BASE2;
            }
          }
          return arr;
        }
        function trim(v) {
          var i2 = v.length;
          while (v[--i2] === 0) ;
          v.length = i2 + 1;
        }
        function createArray(length) {
          var x = new Array(length);
          var i2 = -1;
          while (++i2 < length) {
            x[i2] = 0;
          }
          return x;
        }
        function truncate2(n) {
          if (n > 0) return Math.floor(n);
          return Math.ceil(n);
        }
        function add2(a, b) {
          var l_a = a.length, l_b = b.length, r = new Array(l_a), carry = 0, base = BASE2, sum, i2;
          for (i2 = 0; i2 < l_b; i2++) {
            sum = a[i2] + b[i2] + carry;
            carry = sum >= base ? 1 : 0;
            r[i2] = sum - carry * base;
          }
          while (i2 < l_a) {
            sum = a[i2] + carry;
            carry = sum === base ? 1 : 0;
            r[i2++] = sum - carry * base;
          }
          if (carry > 0) r.push(carry);
          return r;
        }
        function addAny(a, b) {
          if (a.length >= b.length) return add2(a, b);
          return add2(b, a);
        }
        function addSmall(a, carry) {
          var l = a.length, r = new Array(l), base = BASE2, sum, i2;
          for (i2 = 0; i2 < l; i2++) {
            sum = a[i2] - base + carry;
            carry = Math.floor(sum / base);
            r[i2] = sum - carry * base;
            carry += 1;
          }
          while (carry > 0) {
            r[i2++] = carry % base;
            carry = Math.floor(carry / base);
          }
          return r;
        }
        BigInteger2.prototype.add = function(v) {
          var n = parseValue(v);
          if (this.sign !== n.sign) {
            return this.subtract(n.negate());
          }
          var a = this.value, b = n.value;
          if (n.isSmall) {
            return new BigInteger2(addSmall(a, Math.abs(b)), this.sign);
          }
          return new BigInteger2(addAny(a, b), this.sign);
        };
        BigInteger2.prototype.plus = BigInteger2.prototype.add;
        SmallInteger.prototype.add = function(v) {
          var n = parseValue(v);
          var a = this.value;
          if (a < 0 !== n.sign) {
            return this.subtract(n.negate());
          }
          var b = n.value;
          if (n.isSmall) {
            if (isPrecise(a + b)) return new SmallInteger(a + b);
            b = smallToArray(Math.abs(b));
          }
          return new BigInteger2(addSmall(b, Math.abs(a)), a < 0);
        };
        SmallInteger.prototype.plus = SmallInteger.prototype.add;
        NativeBigInt.prototype.add = function(v) {
          return new NativeBigInt(this.value + parseValue(v).value);
        };
        NativeBigInt.prototype.plus = NativeBigInt.prototype.add;
        function subtract2(a, b) {
          var a_l = a.length, b_l = b.length, r = new Array(a_l), borrow = 0, base = BASE2, i2, difference;
          for (i2 = 0; i2 < b_l; i2++) {
            difference = a[i2] - borrow - b[i2];
            if (difference < 0) {
              difference += base;
              borrow = 1;
            } else borrow = 0;
            r[i2] = difference;
          }
          for (i2 = b_l; i2 < a_l; i2++) {
            difference = a[i2] - borrow;
            if (difference < 0) difference += base; else {
              r[i2++] = difference;
              break;
            }
            r[i2] = difference;
          }
          for (;i2 < a_l; i2++) {
            r[i2] = a[i2];
          }
          trim(r);
          return r;
        }
        function subtractAny(a, b, sign) {
          var value;
          if (compareAbs(a, b) >= 0) {
            value = subtract2(a, b);
          } else {
            value = subtract2(b, a);
            sign = !sign;
          }
          value = arrayToSmall(value);
          if (typeof value === "number") {
            if (sign) value = -value;
            return new SmallInteger(value);
          }
          return new BigInteger2(value, sign);
        }
        function subtractSmall(a, b, sign) {
          var l = a.length, r = new Array(l), carry = -b, base = BASE2, i2, difference;
          for (i2 = 0; i2 < l; i2++) {
            difference = a[i2] + carry;
            carry = Math.floor(difference / base);
            difference %= base;
            r[i2] = difference < 0 ? difference + base : difference;
          }
          r = arrayToSmall(r);
          if (typeof r === "number") {
            if (sign) r = -r;
            return new SmallInteger(r);
          }
          return new BigInteger2(r, sign);
        }
        BigInteger2.prototype.subtract = function(v) {
          var n = parseValue(v);
          if (this.sign !== n.sign) {
            return this.add(n.negate());
          }
          var a = this.value, b = n.value;
          if (n.isSmall) return subtractSmall(a, Math.abs(b), this.sign);
          return subtractAny(a, b, this.sign);
        };
        BigInteger2.prototype.minus = BigInteger2.prototype.subtract;
        SmallInteger.prototype.subtract = function(v) {
          var n = parseValue(v);
          var a = this.value;
          if (a < 0 !== n.sign) {
            return this.add(n.negate());
          }
          var b = n.value;
          if (n.isSmall) {
            return new SmallInteger(a - b);
          }
          return subtractSmall(b, Math.abs(a), a >= 0);
        };
        SmallInteger.prototype.minus = SmallInteger.prototype.subtract;
        NativeBigInt.prototype.subtract = function(v) {
          return new NativeBigInt(this.value - parseValue(v).value);
        };
        NativeBigInt.prototype.minus = NativeBigInt.prototype.subtract;
        BigInteger2.prototype.negate = function() {
          return new BigInteger2(this.value, !this.sign);
        };
        SmallInteger.prototype.negate = function() {
          var sign = this.sign;
          var small = new SmallInteger(-this.value);
          small.sign = !sign;
          return small;
        };
        NativeBigInt.prototype.negate = function() {
          return new NativeBigInt(-this.value);
        };
        BigInteger2.prototype.abs = function() {
          return new BigInteger2(this.value, false);
        };
        SmallInteger.prototype.abs = function() {
          return new SmallInteger(Math.abs(this.value));
        };
        NativeBigInt.prototype.abs = function() {
          return new NativeBigInt(this.value >= 0 ? this.value : -this.value);
        };
        function multiplyLong(a, b) {
          var a_l = a.length, b_l = b.length, l = a_l + b_l, r = createArray(l), base = BASE2, product, carry, i2, a_i, b_j;
          for (i2 = 0; i2 < a_l; ++i2) {
            a_i = a[i2];
            for (var j = 0; j < b_l; ++j) {
              b_j = b[j];
              product = a_i * b_j + r[i2 + j];
              carry = Math.floor(product / base);
              r[i2 + j] = product - carry * base;
              r[i2 + j + 1] += carry;
            }
          }
          trim(r);
          return r;
        }
        function multiplySmall(a, b) {
          var l = a.length, r = new Array(l), base = BASE2, carry = 0, product, i2;
          for (i2 = 0; i2 < l; i2++) {
            product = a[i2] * b + carry;
            carry = Math.floor(product / base);
            r[i2] = product - carry * base;
          }
          while (carry > 0) {
            r[i2++] = carry % base;
            carry = Math.floor(carry / base);
          }
          return r;
        }
        function shiftLeft(x, n) {
          var r = [];
          while (n-- > 0) r.push(0);
          return r.concat(x);
        }
        function multiplyKaratsuba(x, y) {
          var n = Math.max(x.length, y.length);
          if (n <= 30) return multiplyLong(x, y);
          n = Math.ceil(n / 2);
          var b = x.slice(n), a = x.slice(0, n), d = y.slice(n), c = y.slice(0, n);
          var ac = multiplyKaratsuba(a, c), bd = multiplyKaratsuba(b, d), abcd = multiplyKaratsuba(addAny(a, b), addAny(c, d));
          var product = addAny(addAny(ac, shiftLeft(subtract2(subtract2(abcd, ac), bd), n)), shiftLeft(bd, 2 * n));
          trim(product);
          return product;
        }
        function useKaratsuba(l1, l2) {
          return -.012 * l1 - .012 * l2 + 15e-6 * l1 * l2 > 0;
        }
        BigInteger2.prototype.multiply = function(v) {
          var n = parseValue(v), a = this.value, b = n.value, sign = this.sign !== n.sign, abs;
          if (n.isSmall) {
            if (b === 0) return Integer[0];
            if (b === 1) return this;
            if (b === -1) return this.negate();
            abs = Math.abs(b);
            if (abs < BASE2) {
              return new BigInteger2(multiplySmall(a, abs), sign);
            }
            b = smallToArray(abs);
          }
          if (useKaratsuba(a.length, b.length)) return new BigInteger2(multiplyKaratsuba(a, b), sign);
          return new BigInteger2(multiplyLong(a, b), sign);
        };
        BigInteger2.prototype.times = BigInteger2.prototype.multiply;
        function multiplySmallAndArray(a, b, sign) {
          if (a < BASE2) {
            return new BigInteger2(multiplySmall(b, a), sign);
          }
          return new BigInteger2(multiplyLong(b, smallToArray(a)), sign);
        }
        SmallInteger.prototype._multiplyBySmall = function(a) {
          if (isPrecise(a.value * this.value)) {
            return new SmallInteger(a.value * this.value);
          }
          return multiplySmallAndArray(Math.abs(a.value), smallToArray(Math.abs(this.value)), this.sign !== a.sign);
        };
        BigInteger2.prototype._multiplyBySmall = function(a) {
          if (a.value === 0) return Integer[0];
          if (a.value === 1) return this;
          if (a.value === -1) return this.negate();
          return multiplySmallAndArray(Math.abs(a.value), this.value, this.sign !== a.sign);
        };
        SmallInteger.prototype.multiply = function(v) {
          return parseValue(v)._multiplyBySmall(this);
        };
        SmallInteger.prototype.times = SmallInteger.prototype.multiply;
        NativeBigInt.prototype.multiply = function(v) {
          return new NativeBigInt(this.value * parseValue(v).value);
        };
        NativeBigInt.prototype.times = NativeBigInt.prototype.multiply;
        function square(a) {
          var l = a.length, r = createArray(l + l), base = BASE2, product, carry, i2, a_i, a_j;
          for (i2 = 0; i2 < l; i2++) {
            a_i = a[i2];
            carry = 0 - a_i * a_i;
            for (var j = i2; j < l; j++) {
              a_j = a[j];
              product = 2 * (a_i * a_j) + r[i2 + j] + carry;
              carry = Math.floor(product / base);
              r[i2 + j] = product - carry * base;
            }
            r[i2 + l] = carry;
          }
          trim(r);
          return r;
        }
        BigInteger2.prototype.square = function() {
          return new BigInteger2(square(this.value), false);
        };
        SmallInteger.prototype.square = function() {
          var value = this.value * this.value;
          if (isPrecise(value)) return new SmallInteger(value);
          return new BigInteger2(square(smallToArray(Math.abs(this.value))), false);
        };
        NativeBigInt.prototype.square = function(v) {
          return new NativeBigInt(this.value * this.value);
        };
        function divMod1(a, b) {
          var a_l = a.length, b_l = b.length, base = BASE2, result = createArray(b.length), divisorMostSignificantDigit = b[b_l - 1], lambda = Math.ceil(base / (2 * divisorMostSignificantDigit)), remainder = multiplySmall(a, lambda), divisor = multiplySmall(b, lambda), quotientDigit, shift, carry, borrow, i2, l, q;
          if (remainder.length <= a_l) remainder.push(0);
          divisor.push(0);
          divisorMostSignificantDigit = divisor[b_l - 1];
          for (shift = a_l - b_l; shift >= 0; shift--) {
            quotientDigit = base - 1;
            if (remainder[shift + b_l] !== divisorMostSignificantDigit) {
              quotientDigit = Math.floor((remainder[shift + b_l] * base + remainder[shift + b_l - 1]) / divisorMostSignificantDigit);
            }
            carry = 0;
            borrow = 0;
            l = divisor.length;
            for (i2 = 0; i2 < l; i2++) {
              carry += quotientDigit * divisor[i2];
              q = Math.floor(carry / base);
              borrow += remainder[shift + i2] - (carry - q * base);
              carry = q;
              if (borrow < 0) {
                remainder[shift + i2] = borrow + base;
                borrow = -1;
              } else {
                remainder[shift + i2] = borrow;
                borrow = 0;
              }
            }
            while (borrow !== 0) {
              quotientDigit -= 1;
              carry = 0;
              for (i2 = 0; i2 < l; i2++) {
                carry += remainder[shift + i2] - base + divisor[i2];
                if (carry < 0) {
                  remainder[shift + i2] = carry + base;
                  carry = 0;
                } else {
                  remainder[shift + i2] = carry;
                  carry = 1;
                }
              }
              borrow += carry;
            }
            result[shift] = quotientDigit;
          }
          remainder = divModSmall(remainder, lambda)[0];
          return [ arrayToSmall(result), arrayToSmall(remainder) ];
        }
        function divMod2(a, b) {
          var a_l = a.length, b_l = b.length, result = [], part = [], base = BASE2, guess, xlen, highx, highy, check;
          while (a_l) {
            part.unshift(a[--a_l]);
            trim(part);
            if (compareAbs(part, b) < 0) {
              result.push(0);
              continue;
            }
            xlen = part.length;
            highx = part[xlen - 1] * base + part[xlen - 2];
            highy = b[b_l - 1] * base + b[b_l - 2];
            if (xlen > b_l) {
              highx = (highx + 1) * base;
            }
            guess = Math.ceil(highx / highy);
            do {
              check = multiplySmall(b, guess);
              if (compareAbs(check, part) <= 0) break;
              guess--;
            } while (guess);
            result.push(guess);
            part = subtract2(part, check);
          }
          result.reverse();
          return [ arrayToSmall(result), arrayToSmall(part) ];
        }
        function divModSmall(value, lambda) {
          var length = value.length, quotient = createArray(length), base = BASE2, i2, q, remainder, divisor;
          remainder = 0;
          for (i2 = length - 1; i2 >= 0; --i2) {
            divisor = remainder * base + value[i2];
            q = truncate2(divisor / lambda);
            remainder = divisor - q * lambda;
            quotient[i2] = q | 0;
          }
          return [ quotient, remainder | 0 ];
        }
        function divModAny(self2, v) {
          var value, n = parseValue(v);
          if (supportsNativeBigInt) {
            return [ new NativeBigInt(self2.value / n.value), new NativeBigInt(self2.value % n.value) ];
          }
          var a = self2.value, b = n.value;
          var quotient;
          if (b === 0) throw new Error("Cannot divide by zero");
          if (self2.isSmall) {
            if (n.isSmall) {
              return [ new SmallInteger(truncate2(a / b)), new SmallInteger(a % b) ];
            }
            return [ Integer[0], self2 ];
          }
          if (n.isSmall) {
            if (b === 1) return [ self2, Integer[0] ];
            if (b == -1) return [ self2.negate(), Integer[0] ];
            var abs = Math.abs(b);
            if (abs < BASE2) {
              value = divModSmall(a, abs);
              quotient = arrayToSmall(value[0]);
              var remainder = value[1];
              if (self2.sign) remainder = -remainder;
              if (typeof quotient === "number") {
                if (self2.sign !== n.sign) quotient = -quotient;
                return [ new SmallInteger(quotient), new SmallInteger(remainder) ];
              }
              return [ new BigInteger2(quotient, self2.sign !== n.sign), new SmallInteger(remainder) ];
            }
            b = smallToArray(abs);
          }
          var comparison = compareAbs(a, b);
          if (comparison === -1) return [ Integer[0], self2 ];
          if (comparison === 0) return [ Integer[self2.sign === n.sign ? 1 : -1], Integer[0] ];
          if (a.length + b.length <= 200) value = divMod1(a, b); else value = divMod2(a, b);
          quotient = value[0];
          var qSign = self2.sign !== n.sign, mod = value[1], mSign = self2.sign;
          if (typeof quotient === "number") {
            if (qSign) quotient = -quotient;
            quotient = new SmallInteger(quotient);
          } else quotient = new BigInteger2(quotient, qSign);
          if (typeof mod === "number") {
            if (mSign) mod = -mod;
            mod = new SmallInteger(mod);
          } else mod = new BigInteger2(mod, mSign);
          return [ quotient, mod ];
        }
        BigInteger2.prototype.divmod = function(v) {
          var result = divModAny(this, v);
          return {
            quotient: result[0],
            remainder: result[1]
          };
        };
        NativeBigInt.prototype.divmod = SmallInteger.prototype.divmod = BigInteger2.prototype.divmod;
        BigInteger2.prototype.divide = function(v) {
          return divModAny(this, v)[0];
        };
        NativeBigInt.prototype.over = NativeBigInt.prototype.divide = function(v) {
          return new NativeBigInt(this.value / parseValue(v).value);
        };
        SmallInteger.prototype.over = SmallInteger.prototype.divide = BigInteger2.prototype.over = BigInteger2.prototype.divide;
        BigInteger2.prototype.mod = function(v) {
          return divModAny(this, v)[1];
        };
        NativeBigInt.prototype.mod = NativeBigInt.prototype.remainder = function(v) {
          return new NativeBigInt(this.value % parseValue(v).value);
        };
        SmallInteger.prototype.remainder = SmallInteger.prototype.mod = BigInteger2.prototype.remainder = BigInteger2.prototype.mod;
        BigInteger2.prototype.pow = function(v) {
          var n = parseValue(v), a = this.value, b = n.value, value, x, y;
          if (b === 0) return Integer[1];
          if (a === 0) return Integer[0];
          if (a === 1) return Integer[1];
          if (a === -1) return n.isEven() ? Integer[1] : Integer[-1];
          if (n.sign) {
            return Integer[0];
          }
          if (!n.isSmall) throw new Error("The exponent " + n.toString() + " is too large.");
          if (this.isSmall) {
            if (isPrecise(value = Math.pow(a, b))) return new SmallInteger(truncate2(value));
          }
          x = this;
          y = Integer[1];
          while (true) {
            if (b & true) {
              y = y.times(x);
              --b;
            }
            if (b === 0) break;
            b /= 2;
            x = x.square();
          }
          return y;
        };
        SmallInteger.prototype.pow = BigInteger2.prototype.pow;
        NativeBigInt.prototype.pow = function(v) {
          var n = parseValue(v);
          var a = this.value, b = n.value;
          var _0 = BigInt(0), _1 = BigInt(1), _2 = BigInt(2);
          if (b === _0) return Integer[1];
          if (a === _0) return Integer[0];
          if (a === _1) return Integer[1];
          if (a === BigInt(-1)) return n.isEven() ? Integer[1] : Integer[-1];
          if (n.isNegative()) return new NativeBigInt(_0);
          var x = this;
          var y = Integer[1];
          while (true) {
            if ((b & _1) === _1) {
              y = y.times(x);
              --b;
            }
            if (b === _0) break;
            b /= _2;
            x = x.square();
          }
          return y;
        };
        BigInteger2.prototype.modPow = function(exp2, mod) {
          exp2 = parseValue(exp2);
          mod = parseValue(mod);
          if (mod.isZero()) throw new Error("Cannot take modPow with modulus 0");
          var r = Integer[1], base = this.mod(mod);
          if (exp2.isNegative()) {
            exp2 = exp2.multiply(Integer[-1]);
            base = base.modInv(mod);
          }
          while (exp2.isPositive()) {
            if (base.isZero()) return Integer[0];
            if (exp2.isOdd()) r = r.multiply(base).mod(mod);
            exp2 = exp2.divide(2);
            base = base.square().mod(mod);
          }
          return r;
        };
        NativeBigInt.prototype.modPow = SmallInteger.prototype.modPow = BigInteger2.prototype.modPow;
        function compareAbs(a, b) {
          if (a.length !== b.length) {
            return a.length > b.length ? 1 : -1;
          }
          for (var i2 = a.length - 1; i2 >= 0; i2--) {
            if (a[i2] !== b[i2]) return a[i2] > b[i2] ? 1 : -1;
          }
          return 0;
        }
        BigInteger2.prototype.compareAbs = function(v) {
          var n = parseValue(v), a = this.value, b = n.value;
          if (n.isSmall) return 1;
          return compareAbs(a, b);
        };
        SmallInteger.prototype.compareAbs = function(v) {
          var n = parseValue(v), a = Math.abs(this.value), b = n.value;
          if (n.isSmall) {
            b = Math.abs(b);
            return a === b ? 0 : a > b ? 1 : -1;
          }
          return -1;
        };
        NativeBigInt.prototype.compareAbs = function(v) {
          var a = this.value;
          var b = parseValue(v).value;
          a = a >= 0 ? a : -a;
          b = b >= 0 ? b : -b;
          return a === b ? 0 : a > b ? 1 : -1;
        };
        BigInteger2.prototype.compare = function(v) {
          if (v === Infinity) {
            return -1;
          }
          if (v === -Infinity) {
            return 1;
          }
          var n = parseValue(v), a = this.value, b = n.value;
          if (this.sign !== n.sign) {
            return n.sign ? 1 : -1;
          }
          if (n.isSmall) {
            return this.sign ? -1 : 1;
          }
          return compareAbs(a, b) * (this.sign ? -1 : 1);
        };
        BigInteger2.prototype.compareTo = BigInteger2.prototype.compare;
        SmallInteger.prototype.compare = function(v) {
          if (v === Infinity) {
            return -1;
          }
          if (v === -Infinity) {
            return 1;
          }
          var n = parseValue(v), a = this.value, b = n.value;
          if (n.isSmall) {
            return a == b ? 0 : a > b ? 1 : -1;
          }
          if (a < 0 !== n.sign) {
            return a < 0 ? -1 : 1;
          }
          return a < 0 ? 1 : -1;
        };
        SmallInteger.prototype.compareTo = SmallInteger.prototype.compare;
        NativeBigInt.prototype.compare = function(v) {
          if (v === Infinity) {
            return -1;
          }
          if (v === -Infinity) {
            return 1;
          }
          var a = this.value;
          var b = parseValue(v).value;
          return a === b ? 0 : a > b ? 1 : -1;
        };
        NativeBigInt.prototype.compareTo = NativeBigInt.prototype.compare;
        BigInteger2.prototype.equals = function(v) {
          return this.compare(v) === 0;
        };
        NativeBigInt.prototype.eq = NativeBigInt.prototype.equals = SmallInteger.prototype.eq = SmallInteger.prototype.equals = BigInteger2.prototype.eq = BigInteger2.prototype.equals;
        BigInteger2.prototype.notEquals = function(v) {
          return this.compare(v) !== 0;
        };
        NativeBigInt.prototype.neq = NativeBigInt.prototype.notEquals = SmallInteger.prototype.neq = SmallInteger.prototype.notEquals = BigInteger2.prototype.neq = BigInteger2.prototype.notEquals;
        BigInteger2.prototype.greater = function(v) {
          return this.compare(v) > 0;
        };
        NativeBigInt.prototype.gt = NativeBigInt.prototype.greater = SmallInteger.prototype.gt = SmallInteger.prototype.greater = BigInteger2.prototype.gt = BigInteger2.prototype.greater;
        BigInteger2.prototype.lesser = function(v) {
          return this.compare(v) < 0;
        };
        NativeBigInt.prototype.lt = NativeBigInt.prototype.lesser = SmallInteger.prototype.lt = SmallInteger.prototype.lesser = BigInteger2.prototype.lt = BigInteger2.prototype.lesser;
        BigInteger2.prototype.greaterOrEquals = function(v) {
          return this.compare(v) >= 0;
        };
        NativeBigInt.prototype.geq = NativeBigInt.prototype.greaterOrEquals = SmallInteger.prototype.geq = SmallInteger.prototype.greaterOrEquals = BigInteger2.prototype.geq = BigInteger2.prototype.greaterOrEquals;
        BigInteger2.prototype.lesserOrEquals = function(v) {
          return this.compare(v) <= 0;
        };
        NativeBigInt.prototype.leq = NativeBigInt.prototype.lesserOrEquals = SmallInteger.prototype.leq = SmallInteger.prototype.lesserOrEquals = BigInteger2.prototype.leq = BigInteger2.prototype.lesserOrEquals;
        BigInteger2.prototype.isEven = function() {
          return (this.value[0] & 1) === 0;
        };
        SmallInteger.prototype.isEven = function() {
          return (this.value & 1) === 0;
        };
        NativeBigInt.prototype.isEven = function() {
          return (this.value & BigInt(1)) === BigInt(0);
        };
        BigInteger2.prototype.isOdd = function() {
          return (this.value[0] & 1) === 1;
        };
        SmallInteger.prototype.isOdd = function() {
          return (this.value & 1) === 1;
        };
        NativeBigInt.prototype.isOdd = function() {
          return (this.value & BigInt(1)) === BigInt(1);
        };
        BigInteger2.prototype.isPositive = function() {
          return !this.sign;
        };
        SmallInteger.prototype.isPositive = function() {
          return this.value > 0;
        };
        NativeBigInt.prototype.isPositive = SmallInteger.prototype.isPositive;
        BigInteger2.prototype.isNegative = function() {
          return this.sign;
        };
        SmallInteger.prototype.isNegative = function() {
          return this.value < 0;
        };
        NativeBigInt.prototype.isNegative = SmallInteger.prototype.isNegative;
        BigInteger2.prototype.isUnit = function() {
          return false;
        };
        SmallInteger.prototype.isUnit = function() {
          return Math.abs(this.value) === 1;
        };
        NativeBigInt.prototype.isUnit = function() {
          return this.abs().value === BigInt(1);
        };
        BigInteger2.prototype.isZero = function() {
          return false;
        };
        SmallInteger.prototype.isZero = function() {
          return this.value === 0;
        };
        NativeBigInt.prototype.isZero = function() {
          return this.value === BigInt(0);
        };
        BigInteger2.prototype.isDivisibleBy = function(v) {
          var n = parseValue(v);
          if (n.isZero()) return false;
          if (n.isUnit()) return true;
          if (n.compareAbs(2) === 0) return this.isEven();
          return this.mod(n).isZero();
        };
        NativeBigInt.prototype.isDivisibleBy = SmallInteger.prototype.isDivisibleBy = BigInteger2.prototype.isDivisibleBy;
        function isBasicPrime(v) {
          var n = v.abs();
          if (n.isUnit()) return false;
          if (n.equals(2) || n.equals(3) || n.equals(5)) return true;
          if (n.isEven() || n.isDivisibleBy(3) || n.isDivisibleBy(5)) return false;
          if (n.lesser(49)) return true;
        }
        function millerRabinTest(n, a) {
          var nPrev = n.prev(), b = nPrev, r = 0, d, i2, x;
          while (b.isEven()) b = b.divide(2), r++;
          next: for (i2 = 0; i2 < a.length; i2++) {
            if (n.lesser(a[i2])) continue;
            x = bigInt2(a[i2]).modPow(b, n);
            if (x.isUnit() || x.equals(nPrev)) continue;
            for (d = r - 1; d != 0; d--) {
              x = x.square().mod(n);
              if (x.isUnit()) return false;
              if (x.equals(nPrev)) continue next;
            }
            return false;
          }
          return true;
        }
        BigInteger2.prototype.isPrime = function(strict) {
          var isPrime = isBasicPrime(this);
          if (isPrime !== undefined$1) return isPrime;
          var n = this.abs();
          var bits = n.bitLength();
          if (bits <= 64) return millerRabinTest(n, [ 2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31, 37 ]);
          var logN = Math.log(2) * bits.toJSNumber();
          var t = Math.ceil(strict === true ? 2 * Math.pow(logN, 2) : logN);
          for (var a = [], i2 = 0; i2 < t; i2++) {
            a.push(bigInt2(i2 + 2));
          }
          return millerRabinTest(n, a);
        };
        NativeBigInt.prototype.isPrime = SmallInteger.prototype.isPrime = BigInteger2.prototype.isPrime;
        BigInteger2.prototype.isProbablePrime = function(iterations, rng2) {
          var isPrime = isBasicPrime(this);
          if (isPrime !== undefined$1) return isPrime;
          var n = this.abs();
          var t = iterations === undefined$1 ? 5 : iterations;
          for (var a = [], i2 = 0; i2 < t; i2++) {
            a.push(bigInt2.randBetween(2, n.minus(2), rng2));
          }
          return millerRabinTest(n, a);
        };
        NativeBigInt.prototype.isProbablePrime = SmallInteger.prototype.isProbablePrime = BigInteger2.prototype.isProbablePrime;
        BigInteger2.prototype.modInv = function(n) {
          var t = bigInt2.zero, newT = bigInt2.one, r = parseValue(n), newR = this.abs(), q, lastT, lastR;
          while (!newR.isZero()) {
            q = r.divide(newR);
            lastT = t;
            lastR = r;
            t = newT;
            r = newR;
            newT = lastT.subtract(q.multiply(newT));
            newR = lastR.subtract(q.multiply(newR));
          }
          if (!r.isUnit()) throw new Error(this.toString() + " and " + n.toString() + " are not co-prime");
          if (t.compare(0) === -1) {
            t = t.add(n);
          }
          if (this.isNegative()) {
            return t.negate();
          }
          return t;
        };
        NativeBigInt.prototype.modInv = SmallInteger.prototype.modInv = BigInteger2.prototype.modInv;
        BigInteger2.prototype.next = function() {
          var value = this.value;
          if (this.sign) {
            return subtractSmall(value, 1, this.sign);
          }
          return new BigInteger2(addSmall(value, 1), this.sign);
        };
        SmallInteger.prototype.next = function() {
          var value = this.value;
          if (value + 1 < MAX_INT) return new SmallInteger(value + 1);
          return new BigInteger2(MAX_INT_ARR, false);
        };
        NativeBigInt.prototype.next = function() {
          return new NativeBigInt(this.value + BigInt(1));
        };
        BigInteger2.prototype.prev = function() {
          var value = this.value;
          if (this.sign) {
            return new BigInteger2(addSmall(value, 1), true);
          }
          return subtractSmall(value, 1, this.sign);
        };
        SmallInteger.prototype.prev = function() {
          var value = this.value;
          if (value - 1 > -MAX_INT) return new SmallInteger(value - 1);
          return new BigInteger2(MAX_INT_ARR, true);
        };
        NativeBigInt.prototype.prev = function() {
          return new NativeBigInt(this.value - BigInt(1));
        };
        var powersOfTwo = [ 1 ];
        while (2 * powersOfTwo[powersOfTwo.length - 1] <= BASE2) powersOfTwo.push(2 * powersOfTwo[powersOfTwo.length - 1]);
        var powers2Length = powersOfTwo.length, highestPower2 = powersOfTwo[powers2Length - 1];
        function shift_isSmall(n) {
          return Math.abs(n) <= BASE2;
        }
        BigInteger2.prototype.shiftLeft = function(v) {
          var n = parseValue(v).toJSNumber();
          if (!shift_isSmall(n)) {
            throw new Error(String(n) + " is too large for shifting.");
          }
          if (n < 0) return this.shiftRight(-n);
          var result = this;
          if (result.isZero()) return result;
          while (n >= powers2Length) {
            result = result.multiply(highestPower2);
            n -= powers2Length - 1;
          }
          return result.multiply(powersOfTwo[n]);
        };
        NativeBigInt.prototype.shiftLeft = SmallInteger.prototype.shiftLeft = BigInteger2.prototype.shiftLeft;
        BigInteger2.prototype.shiftRight = function(v) {
          var remQuo;
          var n = parseValue(v).toJSNumber();
          if (!shift_isSmall(n)) {
            throw new Error(String(n) + " is too large for shifting.");
          }
          if (n < 0) return this.shiftLeft(-n);
          var result = this;
          while (n >= powers2Length) {
            if (result.isZero() || result.isNegative() && result.isUnit()) return result;
            remQuo = divModAny(result, highestPower2);
            result = remQuo[1].isNegative() ? remQuo[0].prev() : remQuo[0];
            n -= powers2Length - 1;
          }
          remQuo = divModAny(result, powersOfTwo[n]);
          return remQuo[1].isNegative() ? remQuo[0].prev() : remQuo[0];
        };
        NativeBigInt.prototype.shiftRight = SmallInteger.prototype.shiftRight = BigInteger2.prototype.shiftRight;
        function bitwise(x, y, fn) {
          y = parseValue(y);
          var xSign = x.isNegative(), ySign = y.isNegative();
          var xRem = xSign ? x.not() : x, yRem = ySign ? y.not() : y;
          var xDigit = 0, yDigit = 0;
          var xDivMod = null, yDivMod = null;
          var result = [];
          while (!xRem.isZero() || !yRem.isZero()) {
            xDivMod = divModAny(xRem, highestPower2);
            xDigit = xDivMod[1].toJSNumber();
            if (xSign) {
              xDigit = highestPower2 - 1 - xDigit;
            }
            yDivMod = divModAny(yRem, highestPower2);
            yDigit = yDivMod[1].toJSNumber();
            if (ySign) {
              yDigit = highestPower2 - 1 - yDigit;
            }
            xRem = xDivMod[0];
            yRem = yDivMod[0];
            result.push(fn(xDigit, yDigit));
          }
          var sum = fn(xSign ? 1 : 0, ySign ? 1 : 0) !== 0 ? bigInt2(-1) : bigInt2(0);
          for (var i2 = result.length - 1; i2 >= 0; i2 -= 1) {
            sum = sum.multiply(highestPower2).add(bigInt2(result[i2]));
          }
          return sum;
        }
        BigInteger2.prototype.not = function() {
          return this.negate().prev();
        };
        NativeBigInt.prototype.not = SmallInteger.prototype.not = BigInteger2.prototype.not;
        BigInteger2.prototype.and = function(n) {
          return bitwise(this, n, function(a, b) {
            return a & b;
          });
        };
        NativeBigInt.prototype.and = SmallInteger.prototype.and = BigInteger2.prototype.and;
        BigInteger2.prototype.or = function(n) {
          return bitwise(this, n, function(a, b) {
            return a | b;
          });
        };
        NativeBigInt.prototype.or = SmallInteger.prototype.or = BigInteger2.prototype.or;
        BigInteger2.prototype.xor = function(n) {
          return bitwise(this, n, function(a, b) {
            return a ^ b;
          });
        };
        NativeBigInt.prototype.xor = SmallInteger.prototype.xor = BigInteger2.prototype.xor;
        var LOBMASK_I = 1 << 30, LOBMASK_BI = (BASE2 & -BASE2) * (BASE2 & -BASE2) | LOBMASK_I;
        function roughLOB(n) {
          var v = n.value, x = typeof v === "number" ? v | LOBMASK_I : typeof v === "bigint" ? v | BigInt(LOBMASK_I) : v[0] + v[1] * BASE2 | LOBMASK_BI;
          return x & -x;
        }
        function integerLogarithm(value, base) {
          if (base.compareTo(value) <= 0) {
            var tmp = integerLogarithm(value, base.square(base));
            var p = tmp.p;
            var e = tmp.e;
            var t = p.multiply(base);
            return t.compareTo(value) <= 0 ? {
              p: t,
              e: e * 2 + 1
            } : {
              p,
              e: e * 2
            };
          }
          return {
            p: bigInt2(1),
            e: 0
          };
        }
        BigInteger2.prototype.bitLength = function() {
          var n = this;
          if (n.compareTo(bigInt2(0)) < 0) {
            n = n.negate().subtract(bigInt2(1));
          }
          if (n.compareTo(bigInt2(0)) === 0) {
            return bigInt2(0);
          }
          return bigInt2(integerLogarithm(n, bigInt2(2)).e).add(bigInt2(1));
        };
        NativeBigInt.prototype.bitLength = SmallInteger.prototype.bitLength = BigInteger2.prototype.bitLength;
        function max(a, b) {
          a = parseValue(a);
          b = parseValue(b);
          return a.greater(b) ? a : b;
        }
        function min(a, b) {
          a = parseValue(a);
          b = parseValue(b);
          return a.lesser(b) ? a : b;
        }
        function gcd(a, b) {
          a = parseValue(a).abs();
          b = parseValue(b).abs();
          if (a.equals(b)) return a;
          if (a.isZero()) return b;
          if (b.isZero()) return a;
          var c = Integer[1], d, t;
          while (a.isEven() && b.isEven()) {
            d = min(roughLOB(a), roughLOB(b));
            a = a.divide(d);
            b = b.divide(d);
            c = c.multiply(d);
          }
          while (a.isEven()) {
            a = a.divide(roughLOB(a));
          }
          do {
            while (b.isEven()) {
              b = b.divide(roughLOB(b));
            }
            if (a.greater(b)) {
              t = b;
              b = a;
              a = t;
            }
            b = b.subtract(a);
          } while (!b.isZero());
          return c.isUnit() ? a : a.multiply(c);
        }
        function lcm(a, b) {
          a = parseValue(a).abs();
          b = parseValue(b).abs();
          return a.divide(gcd(a, b)).multiply(b);
        }
        function randBetween(a, b, rng2) {
          a = parseValue(a);
          b = parseValue(b);
          var usedRNG = rng2 || Math.random;
          var low = min(a, b), high = max(a, b);
          var range = high.subtract(low).add(1);
          if (range.isSmall) return low.add(Math.floor(usedRNG() * range));
          var digits = toBase(range, BASE2).value;
          var result = [], restricted = true;
          for (var i2 = 0; i2 < digits.length; i2++) {
            var top = restricted ? digits[i2] + (i2 + 1 < digits.length ? digits[i2 + 1] / BASE2 : 0) : BASE2;
            var digit = truncate2(usedRNG() * top);
            result.push(digit);
            if (digit < digits[i2]) restricted = false;
          }
          return low.add(Integer.fromArray(result, BASE2, false));
        }
        var parseBase = function(text, base, alphabet, caseSensitive) {
          alphabet = alphabet || DEFAULT_ALPHABET;
          text = String(text);
          if (!caseSensitive) {
            text = text.toLowerCase();
            alphabet = alphabet.toLowerCase();
          }
          var length = text.length;
          var i2;
          var absBase = Math.abs(base);
          var alphabetValues = {};
          for (i2 = 0; i2 < alphabet.length; i2++) {
            alphabetValues[alphabet[i2]] = i2;
          }
          for (i2 = 0; i2 < length; i2++) {
            var c = text[i2];
            if (c === "-") continue;
            if (c in alphabetValues) {
              if (alphabetValues[c] >= absBase) {
                if (c === "1" && absBase === 1) continue;
                throw new Error(c + " is not a valid digit in base " + base + ".");
              }
            }
          }
          base = parseValue(base);
          var digits = [];
          var isNegative = text[0] === "-";
          for (i2 = isNegative ? 1 : 0; i2 < text.length; i2++) {
            var c = text[i2];
            if (c in alphabetValues) digits.push(parseValue(alphabetValues[c])); else if (c === "<") {
              var start = i2;
              do {
                i2++;
              } while (text[i2] !== ">" && i2 < text.length);
              digits.push(parseValue(text.slice(start + 1, i2)));
            } else throw new Error(c + " is not a valid character");
          }
          return parseBaseFromArray(digits, base, isNegative);
        };
        function parseBaseFromArray(digits, base, isNegative) {
          var val = Integer[0], pow = Integer[1], i2;
          for (i2 = digits.length - 1; i2 >= 0; i2--) {
            val = val.add(digits[i2].times(pow));
            pow = pow.times(base);
          }
          return isNegative ? val.negate() : val;
        }
        function stringify(digit, alphabet) {
          alphabet = alphabet || DEFAULT_ALPHABET;
          if (digit < alphabet.length) {
            return alphabet[digit];
          }
          return "<" + digit + ">";
        }
        function toBase(n, base) {
          base = bigInt2(base);
          if (base.isZero()) {
            if (n.isZero()) return {
              value: [ 0 ],
              isNegative: false
            };
            throw new Error("Cannot convert nonzero numbers to base 0.");
          }
          if (base.equals(-1)) {
            if (n.isZero()) return {
              value: [ 0 ],
              isNegative: false
            };
            if (n.isNegative()) return {
              value: [].concat.apply([], Array.apply(null, Array(-n.toJSNumber())).map(Array.prototype.valueOf, [ 1, 0 ])),
              isNegative: false
            };
            var arr = Array.apply(null, Array(n.toJSNumber() - 1)).map(Array.prototype.valueOf, [ 0, 1 ]);
            arr.unshift([ 1 ]);
            return {
              value: [].concat.apply([], arr),
              isNegative: false
            };
          }
          var neg = false;
          if (n.isNegative() && base.isPositive()) {
            neg = true;
            n = n.abs();
          }
          if (base.isUnit()) {
            if (n.isZero()) return {
              value: [ 0 ],
              isNegative: false
            };
            return {
              value: Array.apply(null, Array(n.toJSNumber())).map(Number.prototype.valueOf, 1),
              isNegative: neg
            };
          }
          var out = [];
          var left = n, divmod;
          while (left.isNegative() || left.compareAbs(base) >= 0) {
            divmod = left.divmod(base);
            left = divmod.quotient;
            var digit = divmod.remainder;
            if (digit.isNegative()) {
              digit = base.minus(digit).abs();
              left = left.next();
            }
            out.push(digit.toJSNumber());
          }
          out.push(left.toJSNumber());
          return {
            value: out.reverse(),
            isNegative: neg
          };
        }
        function toBaseString(n, base, alphabet) {
          var arr = toBase(n, base);
          return (arr.isNegative ? "-" : "") + arr.value.map(function(x) {
            return stringify(x, alphabet);
          }).join("");
        }
        BigInteger2.prototype.toArray = function(radix) {
          return toBase(this, radix);
        };
        SmallInteger.prototype.toArray = function(radix) {
          return toBase(this, radix);
        };
        NativeBigInt.prototype.toArray = function(radix) {
          return toBase(this, radix);
        };
        BigInteger2.prototype.toString = function(radix, alphabet) {
          if (radix === undefined$1) radix = 10;
          if (radix !== 10 || alphabet) return toBaseString(this, radix, alphabet);
          var v = this.value, l = v.length, str = String(v[--l]), zeros = "0000000", digit;
          while (--l >= 0) {
            digit = String(v[l]);
            str += zeros.slice(digit.length) + digit;
          }
          var sign = this.sign ? "-" : "";
          return sign + str;
        };
        SmallInteger.prototype.toString = function(radix, alphabet) {
          if (radix === undefined$1) radix = 10;
          if (radix != 10 || alphabet) return toBaseString(this, radix, alphabet);
          return String(this.value);
        };
        NativeBigInt.prototype.toString = SmallInteger.prototype.toString;
        NativeBigInt.prototype.toJSON = BigInteger2.prototype.toJSON = SmallInteger.prototype.toJSON = function() {
          return this.toString();
        };
        BigInteger2.prototype.valueOf = function() {
          return parseInt(this.toString(), 10);
        };
        BigInteger2.prototype.toJSNumber = BigInteger2.prototype.valueOf;
        SmallInteger.prototype.valueOf = function() {
          return this.value;
        };
        SmallInteger.prototype.toJSNumber = SmallInteger.prototype.valueOf;
        NativeBigInt.prototype.valueOf = NativeBigInt.prototype.toJSNumber = function() {
          return parseInt(this.toString(), 10);
        };
        function parseStringValue(v) {
          if (isPrecise(+v)) {
            var x = +v;
            if (x === truncate2(x)) return supportsNativeBigInt ? new NativeBigInt(BigInt(x)) : new SmallInteger(x);
            throw new Error("Invalid integer: " + v);
          }
          var sign = v[0] === "-";
          if (sign) v = v.slice(1);
          var split = v.split(/e/i);
          if (split.length > 2) throw new Error("Invalid integer: " + split.join("e"));
          if (split.length === 2) {
            var exp2 = split[1];
            if (exp2[0] === "+") exp2 = exp2.slice(1);
            exp2 = +exp2;
            if (exp2 !== truncate2(exp2) || !isPrecise(exp2)) throw new Error("Invalid integer: " + exp2 + " is not a valid exponent.");
            var text = split[0];
            var decimalPlace = text.indexOf(".");
            if (decimalPlace >= 0) {
              exp2 -= text.length - decimalPlace - 1;
              text = text.slice(0, decimalPlace) + text.slice(decimalPlace + 1);
            }
            if (exp2 < 0) throw new Error("Cannot include negative exponent part for integers");
            text += new Array(exp2 + 1).join("0");
            v = text;
          }
          var isValid2 = /^([0-9][0-9]*)$/.test(v);
          if (!isValid2) throw new Error("Invalid integer: " + v);
          if (supportsNativeBigInt) {
            return new NativeBigInt(BigInt(sign ? "-" + v : v));
          }
          var r = [], max2 = v.length, l = LOG_BASE2, min2 = max2 - l;
          while (max2 > 0) {
            r.push(+v.slice(min2, max2));
            min2 -= l;
            if (min2 < 0) min2 = 0;
            max2 -= l;
          }
          trim(r);
          return new BigInteger2(r, sign);
        }
        function parseNumberValue(v) {
          if (supportsNativeBigInt) {
            return new NativeBigInt(BigInt(v));
          }
          if (isPrecise(v)) {
            if (v !== truncate2(v)) throw new Error(v + " is not an integer.");
            return new SmallInteger(v);
          }
          return parseStringValue(v.toString());
        }
        function parseValue(v) {
          if (typeof v === "number") {
            return parseNumberValue(v);
          }
          if (typeof v === "string") {
            return parseStringValue(v);
          }
          if (typeof v === "bigint") {
            return new NativeBigInt(v);
          }
          return v;
        }
        for (var i = 0; i < 1e3; i++) {
          Integer[i] = parseValue(i);
          if (i > 0) Integer[-i] = parseValue(-i);
        }
        Integer.one = Integer[1];
        Integer.zero = Integer[0];
        Integer.minusOne = Integer[-1];
        Integer.max = max;
        Integer.min = min;
        Integer.gcd = gcd;
        Integer.lcm = lcm;
        Integer.isInstance = function(x) {
          return x instanceof BigInteger2 || x instanceof SmallInteger || x instanceof NativeBigInt;
        };
        Integer.randBetween = randBetween;
        Integer.fromArray = function(digits, base, isNegative) {
          return parseBaseFromArray(digits.map(parseValue), parseValue(base || 10), isNegative);
        };
        return Integer;
      })();
      if (module.hasOwnProperty("exports")) {
        module.exports = bigInt2;
      }
    })(BigInteger);
    return BigInteger.exports;
  }
  // node_modules/@discord/embedded-app-sdk/output/_virtual/BigInteger.mjs
  var BigIntegerExports = requireBigInteger();
  var bigInt =  getDefaultExportFromCjs(BigIntegerExports);
  // node_modules/@discord/embedded-app-sdk/output/utils/BigFlagUtils.mjs
  var MAX_BIG_INT = 64;
  var SMALL_INT = 16;
  var PARTS = MAX_BIG_INT / SMALL_INT;
  function checkBrowserSupportsBigInt() {
    try {
      BigInt;
      return true;
    } catch (_a) {
      return false;
    }
  }
  function fromHexReverseArray(hexValues, start, size) {
    let value = 0;
    for (let i = 0; i < size; i++) {
      const byte = hexValues[start + i];
      if (byte === void 0) {
        break;
      }
      value += byte * 16 ** i;
    }
    return value;
  }
  function toHexReverseArray(value) {
    const sum = [];
    for (let i = 0; i < value.length; i++) {
      let s = Number(value[i]);
      for (let j = 0; s || j < sum.length; j++) {
        s += (sum[j] || 0) * 10;
        sum[j] = s % 16;
        s = (s - sum[j]) / 16;
      }
    }
    return sum;
  }
  function splitBigInt(value) {
    const sum = toHexReverseArray(value);
    const parts = Array(PARTS);
    for (let i = 0; i < PARTS; i++) {
      parts[PARTS - 1 - i] = fromHexReverseArray(sum, i * PARTS, PARTS);
    }
    return parts;
  }
  var HighLow = class _HighLow {
    static fromString(value) {
      return new _HighLow(splitBigInt(value), value);
    }
    static fromBit(index) {
      const parts = Array(PARTS);
      const offset = Math.floor(index / SMALL_INT);
      for (let i = 0; i < PARTS; i++) {
        parts[PARTS - 1 - i] = i === offset ? 1 << index - offset * SMALL_INT : 0;
      }
      return new _HighLow(parts);
    }
    constructor(parts, str) {
      this.parts = parts;
      this.str = str;
    }
    and({parts}) {
      return new _HighLow(this.parts.map((v, i) => v & parts[i]));
    }
    or({parts}) {
      return new _HighLow(this.parts.map((v, i) => v | parts[i]));
    }
    xor({parts}) {
      return new _HighLow(this.parts.map((v, i) => v ^ parts[i]));
    }
    not() {
      return new _HighLow(this.parts.map(v => ~v));
    }
    equals({parts}) {
      return this.parts.every((v, i) => v === parts[i]);
    }
    /**
     * For the average case the string representation is provided, but
     * when we need to convert high and low to string we just let the
     * slower big-integer library do it.
     */ toString() {
      if (this.str != null) {
        return this.str;
      }
      const array = new Array(MAX_BIG_INT / 4);
      this.parts.forEach((value, offset) => {
        const hex = toHexReverseArray(value.toString());
        for (let i = 0; i < 4; i++) {
          array[i + offset * 4] = hex[4 - 1 - i] || 0;
        }
      });
      return this.str = bigInt.fromArray(array, 16).toString();
    }
    toJSON() {
      return this.toString();
    }
  };
  var SUPPORTS_BIGINT = checkBrowserSupportsBigInt();
  if (SUPPORTS_BIGINT && BigInt.prototype.toJSON == null) {
    BigInt.prototype.toJSON = function() {
      return this.toString();
    };
  }
  var HIGH_LOW_CACHE = {};
  var convertToBigFlag = SUPPORTS_BIGINT ? function convertToBigFlagBigInt(value) {
    return BigInt(value);
  } : function convertToBigFlagHighLow(value) {
    if (value instanceof HighLow) {
      return value;
    }
    if (typeof value === "number") {
      value = value.toString();
    }
    if (HIGH_LOW_CACHE[value] != null) {
      return HIGH_LOW_CACHE[value];
    }
    HIGH_LOW_CACHE[value] = HighLow.fromString(value);
    return HIGH_LOW_CACHE[value];
  };
  var EMPTY_FLAG = convertToBigFlag(0);
  var flagAnd = SUPPORTS_BIGINT ? function flagAndBigInt(first = EMPTY_FLAG, second = EMPTY_FLAG) {
    return first & second;
  } : function flagAndHighLow(first = EMPTY_FLAG, second = EMPTY_FLAG) {
    return first.and(second);
  };
  var flagOr = SUPPORTS_BIGINT ? function flagOrBigInt(first = EMPTY_FLAG, second = EMPTY_FLAG) {
    return first | second;
  } : function flagOrHighLow(first = EMPTY_FLAG, second = EMPTY_FLAG) {
    return first.or(second);
  };
  var flagXor = SUPPORTS_BIGINT ? function flagXorBigInt(first = EMPTY_FLAG, second = EMPTY_FLAG) {
    return first ^ second;
  } : function flagXorHighLow(first = EMPTY_FLAG, second = EMPTY_FLAG) {
    return first.xor(second);
  };
  var flagNot = SUPPORTS_BIGINT ? function flagNotBigInt(first = EMPTY_FLAG) {
    return ~first;
  } : function flagNotHighLow(first = EMPTY_FLAG) {
    return first.not();
  };
  var flagEquals = SUPPORTS_BIGINT ? function flagEqualsBigInt(first, second) {
    return first === second;
  } : function flagEqualsHighLow(first, second) {
    if (first == null || second == null) {
      return first == second;
    }
    return first.equals(second);
  };
  function flagOrMultiple(...flags) {
    let result = flags[0];
    for (let i = 1; i < flags.length; i++) {
      result = flagOr(result, flags[i]);
    }
    return result;
  }
  function flagHas(base, flag) {
    return flagEquals(flagAnd(base, flag), flag);
  }
  function flagHasAny(base, flag) {
    return !flagEquals(flagAnd(base, flag), EMPTY_FLAG);
  }
  function flagAdd(base, flag) {
    return flag === EMPTY_FLAG ? base : flagOr(base, flag);
  }
  function flagRemove(base, flag) {
    return flag === EMPTY_FLAG ? base : flagXor(base, flagAnd(base, flag));
  }
  var getFlag = SUPPORTS_BIGINT ? function getFlagBigInt(index) {
    return BigInt(1) << BigInt(index);
  } : function getFlagHighLow(index) {
    return HighLow.fromBit(index);
  };
  var BigFlagUtils = {
    combine: flagOrMultiple,
    add: flagAdd,
    remove: flagRemove,
    filter: flagAnd,
    invert: flagNot,
    has: flagHas,
    hasAny: flagHasAny,
    equals: flagEquals,
    deserialize: convertToBigFlag,
    getFlag
  };
  // node_modules/@discord/embedded-app-sdk/output/Constants.mjs
  var RPCCloseCodes;
  (function(RPCCloseCodes2) {
    RPCCloseCodes2[RPCCloseCodes2["CLOSE_NORMAL"] = 1e3] = "CLOSE_NORMAL";
    RPCCloseCodes2[RPCCloseCodes2["CLOSE_UNSUPPORTED"] = 1003] = "CLOSE_UNSUPPORTED";
    RPCCloseCodes2[RPCCloseCodes2["CLOSE_ABNORMAL"] = 1006] = "CLOSE_ABNORMAL";
    RPCCloseCodes2[RPCCloseCodes2["INVALID_CLIENTID"] = 4e3] = "INVALID_CLIENTID";
    RPCCloseCodes2[RPCCloseCodes2["INVALID_ORIGIN"] = 4001] = "INVALID_ORIGIN";
    RPCCloseCodes2[RPCCloseCodes2["RATELIMITED"] = 4002] = "RATELIMITED";
    RPCCloseCodes2[RPCCloseCodes2["TOKEN_REVOKED"] = 4003] = "TOKEN_REVOKED";
    RPCCloseCodes2[RPCCloseCodes2["INVALID_VERSION"] = 4004] = "INVALID_VERSION";
    RPCCloseCodes2[RPCCloseCodes2["INVALID_ENCODING"] = 4005] = "INVALID_ENCODING";
  })(RPCCloseCodes || (RPCCloseCodes = {}));
  var RPCErrorCodes;
  (function(RPCErrorCodes2) {
    RPCErrorCodes2[RPCErrorCodes2["INVALID_PAYLOAD"] = 4e3] = "INVALID_PAYLOAD";
    RPCErrorCodes2[RPCErrorCodes2["INVALID_COMMAND"] = 4002] = "INVALID_COMMAND";
    RPCErrorCodes2[RPCErrorCodes2["INVALID_GUILD"] = 4003] = "INVALID_GUILD";
    RPCErrorCodes2[RPCErrorCodes2["INVALID_EVENT"] = 4004] = "INVALID_EVENT";
    RPCErrorCodes2[RPCErrorCodes2["INVALID_CHANNEL"] = 4005] = "INVALID_CHANNEL";
    RPCErrorCodes2[RPCErrorCodes2["INVALID_PERMISSIONS"] = 4006] = "INVALID_PERMISSIONS";
    RPCErrorCodes2[RPCErrorCodes2["INVALID_CLIENTID"] = 4007] = "INVALID_CLIENTID";
    RPCErrorCodes2[RPCErrorCodes2["INVALID_ORIGIN"] = 4008] = "INVALID_ORIGIN";
    RPCErrorCodes2[RPCErrorCodes2["INVALID_TOKEN"] = 4009] = "INVALID_TOKEN";
    RPCErrorCodes2[RPCErrorCodes2["INVALID_USER"] = 4010] = "INVALID_USER";
  })(RPCErrorCodes || (RPCErrorCodes = {}));
  var Orientation;
  (function(Orientation3) {
    Orientation3["LANDSCAPE"] = "landscape";
    Orientation3["PORTRAIT"] = "portrait";
  })(Orientation || (Orientation = {}));
  var Platform;
  (function(Platform2) {
    Platform2["MOBILE"] = "mobile";
    Platform2["DESKTOP"] = "desktop";
  })(Platform || (Platform = {}));
  var Permissions = Object.freeze({
    CREATE_INSTANT_INVITE: BigFlagUtils.getFlag(0),
    KICK_MEMBERS: BigFlagUtils.getFlag(1),
    BAN_MEMBERS: BigFlagUtils.getFlag(2),
    ADMINISTRATOR: BigFlagUtils.getFlag(3),
    MANAGE_CHANNELS: BigFlagUtils.getFlag(4),
    MANAGE_GUILD: BigFlagUtils.getFlag(5),
    ADD_REACTIONS: BigFlagUtils.getFlag(6),
    VIEW_AUDIT_LOG: BigFlagUtils.getFlag(7),
    PRIORITY_SPEAKER: BigFlagUtils.getFlag(8),
    STREAM: BigFlagUtils.getFlag(9),
    VIEW_CHANNEL: BigFlagUtils.getFlag(10),
    SEND_MESSAGES: BigFlagUtils.getFlag(11),
    SEND_TTS_MESSAGES: BigFlagUtils.getFlag(12),
    MANAGE_MESSAGES: BigFlagUtils.getFlag(13),
    EMBED_LINKS: BigFlagUtils.getFlag(14),
    ATTACH_FILES: BigFlagUtils.getFlag(15),
    READ_MESSAGE_HISTORY: BigFlagUtils.getFlag(16),
    MENTION_EVERYONE: BigFlagUtils.getFlag(17),
    USE_EXTERNAL_EMOJIS: BigFlagUtils.getFlag(18),
    VIEW_GUILD_INSIGHTS: BigFlagUtils.getFlag(19),
    CONNECT: BigFlagUtils.getFlag(20),
    SPEAK: BigFlagUtils.getFlag(21),
    MUTE_MEMBERS: BigFlagUtils.getFlag(22),
    DEAFEN_MEMBERS: BigFlagUtils.getFlag(23),
    MOVE_MEMBERS: BigFlagUtils.getFlag(24),
    USE_VAD: BigFlagUtils.getFlag(25),
    CHANGE_NICKNAME: BigFlagUtils.getFlag(26),
    MANAGE_NICKNAMES: BigFlagUtils.getFlag(27),
    MANAGE_ROLES: BigFlagUtils.getFlag(28),
    MANAGE_WEBHOOKS: BigFlagUtils.getFlag(29),
    MANAGE_GUILD_EXPRESSIONS: BigFlagUtils.getFlag(30),
    USE_APPLICATION_COMMANDS: BigFlagUtils.getFlag(31),
    REQUEST_TO_SPEAK: BigFlagUtils.getFlag(32),
    MANAGE_EVENTS: BigFlagUtils.getFlag(33),
    MANAGE_THREADS: BigFlagUtils.getFlag(34),
    CREATE_PUBLIC_THREADS: BigFlagUtils.getFlag(35),
    CREATE_PRIVATE_THREADS: BigFlagUtils.getFlag(36),
    USE_EXTERNAL_STICKERS: BigFlagUtils.getFlag(37),
    SEND_MESSAGES_IN_THREADS: BigFlagUtils.getFlag(38),
    USE_EMBEDDED_ACTIVITIES: BigFlagUtils.getFlag(39),
    MODERATE_MEMBERS: BigFlagUtils.getFlag(40),
    VIEW_CREATOR_MONETIZATION_ANALYTICS: BigFlagUtils.getFlag(41),
    USE_SOUNDBOARD: BigFlagUtils.getFlag(42),
    CREATE_GUILD_EXPRESSIONS: BigFlagUtils.getFlag(43),
    CREATE_EVENTS: BigFlagUtils.getFlag(44),
    USE_EXTERNAL_SOUNDS: BigFlagUtils.getFlag(45),
    SEND_VOICE_MESSAGES: BigFlagUtils.getFlag(46),
    SEND_POLLS: BigFlagUtils.getFlag(49),
    USE_EXTERNAL_APPS: BigFlagUtils.getFlag(50)
  });
  var UNKNOWN_VERSION_NUMBER = -1;
  var HANDSHAKE_SDK_VERSION_MINIMUM_MOBILE_VERSION = 250;
  // node_modules/@discord/embedded-app-sdk/output/schema/common.mjs
  var common_exports = {};
  __export(common_exports, {
    Activity: () => Activity,
    Attachment: () => Attachment,
    CertifiedDevice: () => CertifiedDevice,
    CertifiedDeviceTypeObject: () => CertifiedDeviceTypeObject,
    Channel: () => Channel,
    ChannelMention: () => ChannelMention,
    ChannelTypesObject: () => ChannelTypesObject,
    Commands: () => Commands,
    DISPATCH: () => DISPATCH,
    Embed: () => Embed,
    EmbedAuthor: () => EmbedAuthor,
    EmbedField: () => EmbedField,
    EmbedFooter: () => EmbedFooter,
    EmbedProvider: () => EmbedProvider,
    Emoji: () => Emoji,
    Entitlement: () => Entitlement,
    EntitlementTypesObject: () => EntitlementTypesObject,
    Guild: () => Guild,
    GuildMember: () => GuildMember,
    GuildMemberRPC: () => GuildMemberRPC,
    Image: () => Image,
    KeyTypesObject: () => KeyTypesObject,
    LayoutMode: () => LayoutMode,
    LayoutModeTypeObject: () => LayoutModeTypeObject,
    Message: () => Message,
    MessageActivity: () => MessageActivity,
    MessageApplication: () => MessageApplication,
    MessageReference: () => MessageReference,
    Orientation: () => Orientation2,
    OrientationLockState: () => OrientationLockState,
    OrientationLockStateTypeObject: () => OrientationLockStateTypeObject,
    OrientationTypeObject: () => OrientationTypeObject,
    PermissionOverwrite: () => PermissionOverwrite,
    PermissionOverwriteTypeObject: () => PermissionOverwriteTypeObject,
    PresenceUpdate: () => PresenceUpdate,
    Reaction: () => Reaction,
    ReceiveFramePayload: () => ReceiveFramePayload,
    Relationship: () => Relationship,
    Role: () => Role,
    Scopes: () => Scopes,
    ScopesObject: () => ScopesObject,
    ShortcutKey: () => ShortcutKey,
    Sku: () => Sku,
    SkuTypeObject: () => SkuTypeObject,
    Status: () => Status,
    StatusObject: () => StatusObject,
    ThermalState: () => ThermalState,
    ThermalStateTypeObject: () => ThermalStateTypeObject,
    User: () => User,
    UserVoiceState: () => UserVoiceState,
    Video: () => Video,
    VoiceDevice: () => VoiceDevice,
    VoiceSettingModeTypeObject: () => VoiceSettingModeTypeObject,
    VoiceSettingsIO: () => VoiceSettingsIO,
    VoiceSettingsMode: () => VoiceSettingsMode,
    VoiceState: () => VoiceState
  });
  // node_modules/@discord/embedded-app-sdk/output/utils/zodUtils.mjs
  function zodCoerceUnhandledValue(inputObject) {
    return preprocessType(arg => {
      var _a;
      const [objectKey] = (_a = Object.entries(inputObject).find(([, value]) => value === arg)) !== null && _a !== void 0 ? _a : [];
      if (arg != null && objectKey === void 0) {
        return inputObject.UNHANDLED;
      }
      return arg;
    }, stringType().or(numberType()));
  }
  function fallbackToDefault(schema) {
    const transform2 = custom().transform(data => {
      const res = schema.safeParse(data);
      if (res.success) {
        return res.data;
      }
      return schema._def.defaultValue();
    });
    transform2.overlayType = schema;
    return transform2;
  }
  // node_modules/@discord/embedded-app-sdk/output/generated/schemas.mjs
  var InitiateImageUploadResponseSchema = z.object({
    image_url: z.string()
  }).describe('Response for "INITIATE_IMAGE_UPLOAD" Command');
  var OpenShareMomentDialogRequestSchema = z.object({
    mediaUrl: z.string().max(1024)
  }).describe('Request for "OPEN_SHARE_MOMENT_DIALOG" Command');
  var AuthenticateRequestSchema = z.object({
    access_token: z.union([ z.string(), z.null() ]).optional()
  }).describe('Request for "AUTHENTICATE" Command');
  var AuthenticateResponseSchema = z.object({
    access_token: z.string(),
    user: z.object({
      username: z.string(),
      discriminator: z.string(),
      id: z.string(),
      avatar: z.union([ z.string(), z.null() ]).optional(),
      public_flags: z.number(),
      global_name: z.union([ z.string(), z.null() ]).optional()
    }),
    scopes: z.array(fallbackToDefault(z.enum([ "identify", "identify.premium", "email", "connections", "guilds", "guilds.join", "guilds.members.read", "guilds.channels.read", "gdm.join", "bot", "rpc", "rpc.notifications.read", "rpc.voice.read", "rpc.voice.write", "rpc.video.read", "rpc.video.write", "rpc.screenshare.read", "rpc.screenshare.write", "rpc.activities.write", "webhook.incoming", "messages.read", "applications.builds.upload", "applications.builds.read", "applications.commands", "applications.commands.permissions.update", "applications.commands.update", "applications.store.update", "applications.entitlements", "activities.read", "activities.write", "activities.invites.write", "relationships.read", "relationships.write", "voice", "dm_channels.read", "role_connections.write", "presences.read", "presences.write", "openid", "dm_channels.messages.read", "dm_channels.messages.write", "gateway.connect", "account.global_name.update", "payment_sources.country_code", "sdk.social_layer_presence", "sdk.social_layer", "lobbies.write", "application_identities.write" ]).or(z.literal(-1)).default(-1))),
    expires: z.string(),
    application: z.object({
      description: z.string(),
      icon: z.union([ z.string(), z.null() ]).optional(),
      id: z.string(),
      rpc_origins: z.array(z.string()).optional(),
      name: z.string()
    })
  }).describe('Response for "AUTHENTICATE" Command');
  var GetActivityInstanceConnectedParticipantsResponseSchema = z.object({
    participants: z.array(z.object({
      id: z.string(),
      username: z.string(),
      global_name: z.union([ z.string(), z.null() ]).optional(),
      discriminator: z.string(),
      avatar: z.union([ z.string(), z.null() ]).optional(),
      flags: z.number(),
      bot: z.boolean(),
      avatar_decoration_data: z.union([ z.object({
        asset: z.union([ z.string(), z.null() ]).optional(),
        skuId: z.string().optional(),
        expiresAt: z.number().optional()
      }), z.null() ]).optional(),
      premium_type: z.union([ z.number(), z.null() ]).optional(),
      nickname: z.string().optional()
    }))
  }).describe('Response for "GET_ACTIVITY_INSTANCE_CONNECTED_PARTICIPANTS" Command');
  var ShareInteractionRequestSchema = z.object({
    command: z.string(),
    options: z.array(z.object({
      name: z.string(),
      value: z.string()
    })).optional(),
    content: z.string().max(2e3).optional(),
    require_launch_channel: z.boolean().optional(),
    preview_image: z.object({
      height: z.number(),
      url: z.string(),
      width: z.number()
    }).optional(),
    components: z.array(z.object({
      type: z.literal(1),
      components: z.array(z.object({
        type: z.literal(2),
        style: z.number().gte(1).lte(5),
        label: z.string().max(80).optional(),
        custom_id: z.string().max(100).describe("Developer-defined identifier for the button; max 100 characters").optional()
      })).max(5).optional()
    })).optional(),
    pid: z.number().optional()
  }).describe('Request for "SHARE_INTERACTION" Command');
  var ShareInteractionResponseSchema = z.object({
    success: z.boolean()
  }).describe('Response for "SHARE_INTERACTION" Command');
  var ShareLinkRequestSchema = z.object({
    custom_id: z.string().max(64).optional(),
    message: z.string().max(1e3),
    link_id: z.string().max(64).optional()
  }).describe('Request for "SHARE_LINK" Command');
  var ShareLinkResponseSchema = z.object({
    success: z.boolean(),
    didCopyLink: z.boolean(),
    didSendMessage: z.boolean()
  }).describe('Response for "SHARE_LINK" Command');
  var GetRelationshipsResponseSchema = z.object({
    relationships: z.array(z.object({
      type: z.number(),
      user: z.object({
        id: z.string(),
        username: z.string(),
        global_name: z.union([ z.string(), z.null() ]).optional(),
        discriminator: z.string(),
        avatar: z.union([ z.string(), z.null() ]).optional(),
        flags: z.number(),
        bot: z.boolean(),
        avatar_decoration_data: z.union([ z.object({
          asset: z.union([ z.string(), z.null() ]).optional(),
          skuId: z.string().optional(),
          expiresAt: z.number().optional()
        }), z.null() ]).optional(),
        premium_type: z.union([ z.number(), z.null() ]).optional()
      }),
      presence: z.object({
        status: z.string(),
        activity: z.union([ z.object({
          session_id: z.string().optional(),
          type: z.number().optional(),
          name: z.string(),
          url: z.union([ z.string(), z.null() ]).optional(),
          application_id: z.string().optional(),
          status_display_type: z.number().optional(),
          state: z.string().optional(),
          state_url: z.string().optional(),
          details: z.string().optional(),
          details_url: z.string().optional(),
          emoji: z.union([ z.object({
            name: z.string(),
            id: z.union([ z.string(), z.null() ]).optional(),
            animated: z.union([ z.boolean(), z.null() ]).optional()
          }), z.null() ]).optional(),
          assets: z.object({
            large_image: z.string().optional(),
            large_text: z.string().optional(),
            large_url: z.string().optional(),
            small_image: z.string().optional(),
            small_text: z.string().optional(),
            small_url: z.string().optional()
          }).optional(),
          timestamps: z.object({
            start: z.number().optional(),
            end: z.number().optional()
          }).optional(),
          party: z.object({
            id: z.string().optional(),
            size: z.array(z.number()).min(2).max(2).optional(),
            privacy: z.number().optional()
          }).optional(),
          secrets: z.object({
            match: z.string().optional(),
            join: z.string().optional()
          }).optional(),
          sync_id: z.string().optional(),
          created_at: z.number().optional(),
          instance: z.boolean().optional(),
          flags: z.number().optional(),
          metadata: z.object({}).optional(),
          platform: z.string().optional(),
          supported_platforms: z.array(z.string()).optional(),
          buttons: z.array(z.string()).optional(),
          hangStatus: z.string().optional()
        }), z.null() ]).optional()
      }).optional()
    }))
  }).describe('Response for "GET_RELATIONSHIPS" Command');
  var InviteUserEmbeddedRequestSchema = z.object({
    user_id: z.string(),
    content: z.string().min(0).max(1024).optional()
  }).describe('Request for "INVITE_USER_EMBEDDED" Command');
  var GetUserRequestSchema = z.object({
    id: z.string().max(64)
  }).describe('Request for "GET_USER" Command');
  var GetUserResponseSchema = z.union([ z.object({
    id: z.string(),
    username: z.string(),
    global_name: z.union([ z.string(), z.null() ]).optional(),
    discriminator: z.string(),
    avatar: z.union([ z.string(), z.null() ]).optional(),
    flags: z.number(),
    bot: z.boolean(),
    avatar_decoration_data: z.union([ z.object({
      asset: z.union([ z.string(), z.null() ]).optional(),
      skuId: z.string().optional(),
      expiresAt: z.number().optional()
    }), z.null() ]).optional(),
    premium_type: z.union([ z.number(), z.null() ]).optional()
  }), z.null() ]);
  var GetQuestEnrollmentStatusRequestSchema = z.object({
    quest_id: z.string()
  }).describe('Request for "GET_QUEST_ENROLLMENT_STATUS" Command');
  var GetQuestEnrollmentStatusResponseSchema = z.object({
    quest_id: z.string(),
    is_enrolled: z.boolean(),
    enrolled_at: z.union([ z.string(), z.null() ]).optional()
  }).describe('Response for "GET_QUEST_ENROLLMENT_STATUS" Command');
  var QuestStartTimerRequestSchema = z.object({
    quest_id: z.string()
  }).describe('Request for "QUEST_START_TIMER" Command');
  var QuestStartTimerResponseSchema = z.object({
    success: z.boolean()
  }).describe('Response for "QUEST_START_TIMER" Command');
  var GetQuestResponseSchema = z.object({
    quest_id: z.string(),
    enrolled_at: z.union([ z.string(), z.null() ]).optional(),
    completed_at: z.union([ z.string(), z.null() ]).optional(),
    external_cta_url: z.string()
  }).describe('Response for "GET_QUEST" Command');
  var RequestProxyTicketRefreshResponseSchema = z.object({
    ticket: z.string()
  }).describe('Response for "REQUEST_PROXY_TICKET_REFRESH" Command');
  var Command;
  (function(Command2) {
    Command2["INITIATE_IMAGE_UPLOAD"] = "INITIATE_IMAGE_UPLOAD";
    Command2["OPEN_SHARE_MOMENT_DIALOG"] = "OPEN_SHARE_MOMENT_DIALOG";
    Command2["AUTHENTICATE"] = "AUTHENTICATE";
    Command2["GET_ACTIVITY_INSTANCE_CONNECTED_PARTICIPANTS"] = "GET_ACTIVITY_INSTANCE_CONNECTED_PARTICIPANTS";
    Command2["SHARE_INTERACTION"] = "SHARE_INTERACTION";
    Command2["SHARE_LINK"] = "SHARE_LINK";
    Command2["GET_RELATIONSHIPS"] = "GET_RELATIONSHIPS";
    Command2["INVITE_USER_EMBEDDED"] = "INVITE_USER_EMBEDDED";
    Command2["GET_USER"] = "GET_USER";
    Command2["GET_QUEST_ENROLLMENT_STATUS"] = "GET_QUEST_ENROLLMENT_STATUS";
    Command2["QUEST_START_TIMER"] = "QUEST_START_TIMER";
    Command2["GET_QUEST"] = "GET_QUEST";
    Command2["REQUEST_PROXY_TICKET_REFRESH"] = "REQUEST_PROXY_TICKET_REFRESH";
  })(Command || (Command = {}));
  var emptyResponseSchema = z.object({}).optional().nullable();
  var emptyRequestSchema = z.void();
  var Schemas = {
    [Command.INITIATE_IMAGE_UPLOAD]: {
      request: emptyRequestSchema,
      response: InitiateImageUploadResponseSchema
    },
    [Command.OPEN_SHARE_MOMENT_DIALOG]: {
      request: OpenShareMomentDialogRequestSchema,
      response: emptyResponseSchema
    },
    [Command.AUTHENTICATE]: {
      request: AuthenticateRequestSchema,
      response: AuthenticateResponseSchema
    },
    [Command.GET_ACTIVITY_INSTANCE_CONNECTED_PARTICIPANTS]: {
      request: emptyRequestSchema,
      response: GetActivityInstanceConnectedParticipantsResponseSchema
    },
    [Command.SHARE_INTERACTION]: {
      request: ShareInteractionRequestSchema,
      response: ShareInteractionResponseSchema
    },
    [Command.SHARE_LINK]: {
      request: ShareLinkRequestSchema,
      response: ShareLinkResponseSchema
    },
    [Command.GET_RELATIONSHIPS]: {
      request: emptyRequestSchema,
      response: GetRelationshipsResponseSchema
    },
    [Command.INVITE_USER_EMBEDDED]: {
      request: InviteUserEmbeddedRequestSchema,
      response: emptyResponseSchema
    },
    [Command.GET_USER]: {
      request: GetUserRequestSchema,
      response: GetUserResponseSchema
    },
    [Command.GET_QUEST_ENROLLMENT_STATUS]: {
      request: GetQuestEnrollmentStatusRequestSchema,
      response: GetQuestEnrollmentStatusResponseSchema
    },
    [Command.QUEST_START_TIMER]: {
      request: QuestStartTimerRequestSchema,
      response: QuestStartTimerResponseSchema
    },
    [Command.GET_QUEST]: {
      request: emptyRequestSchema,
      response: GetQuestResponseSchema
    },
    [Command.REQUEST_PROXY_TICKET_REFRESH]: {
      request: emptyRequestSchema,
      response: RequestProxyTicketRefreshResponseSchema
    }
  };
  // node_modules/@discord/embedded-app-sdk/output/schema/common.mjs
  var DISPATCH = "DISPATCH";
  var Commands;
  (function(Commands3) {
    Commands3["AUTHORIZE"] = "AUTHORIZE";
    Commands3["GET_GUILDS"] = "GET_GUILDS";
    Commands3["GET_GUILD"] = "GET_GUILD";
    Commands3["GET_CHANNEL"] = "GET_CHANNEL";
    Commands3["GET_CHANNELS"] = "GET_CHANNELS";
    Commands3["SELECT_VOICE_CHANNEL"] = "SELECT_VOICE_CHANNEL";
    Commands3["SELECT_TEXT_CHANNEL"] = "SELECT_TEXT_CHANNEL";
    Commands3["SUBSCRIBE"] = "SUBSCRIBE";
    Commands3["UNSUBSCRIBE"] = "UNSUBSCRIBE";
    Commands3["CAPTURE_SHORTCUT"] = "CAPTURE_SHORTCUT";
    Commands3["SET_CERTIFIED_DEVICES"] = "SET_CERTIFIED_DEVICES";
    Commands3["SET_ACTIVITY"] = "SET_ACTIVITY";
    Commands3["GET_SKUS"] = "GET_SKUS";
    Commands3["GET_ENTITLEMENTS"] = "GET_ENTITLEMENTS";
    Commands3["GET_SKUS_EMBEDDED"] = "GET_SKUS_EMBEDDED";
    Commands3["GET_ENTITLEMENTS_EMBEDDED"] = "GET_ENTITLEMENTS_EMBEDDED";
    Commands3["START_PURCHASE"] = "START_PURCHASE";
    Commands3["SET_CONFIG"] = "SET_CONFIG";
    Commands3["SEND_ANALYTICS_EVENT"] = "SEND_ANALYTICS_EVENT";
    Commands3["USER_SETTINGS_GET_LOCALE"] = "USER_SETTINGS_GET_LOCALE";
    Commands3["OPEN_EXTERNAL_LINK"] = "OPEN_EXTERNAL_LINK";
    Commands3["ENCOURAGE_HW_ACCELERATION"] = "ENCOURAGE_HW_ACCELERATION";
    Commands3["CAPTURE_LOG"] = "CAPTURE_LOG";
    Commands3["SET_ORIENTATION_LOCK_STATE"] = "SET_ORIENTATION_LOCK_STATE";
    Commands3["OPEN_INVITE_DIALOG"] = "OPEN_INVITE_DIALOG";
    Commands3["GET_PLATFORM_BEHAVIORS"] = "GET_PLATFORM_BEHAVIORS";
    Commands3["GET_CHANNEL_PERMISSIONS"] = "GET_CHANNEL_PERMISSIONS";
    Commands3["AUTHENTICATE"] = "AUTHENTICATE";
    Commands3["GET_ACTIVITY_INSTANCE_CONNECTED_PARTICIPANTS"] = "GET_ACTIVITY_INSTANCE_CONNECTED_PARTICIPANTS";
    Commands3["GET_QUEST"] = "GET_QUEST";
    Commands3["GET_QUEST_ENROLLMENT_STATUS"] = "GET_QUEST_ENROLLMENT_STATUS";
    Commands3["GET_RELATIONSHIPS"] = "GET_RELATIONSHIPS";
    Commands3["GET_USER"] = "GET_USER";
    Commands3["INITIATE_IMAGE_UPLOAD"] = "INITIATE_IMAGE_UPLOAD";
    Commands3["INVITE_USER_EMBEDDED"] = "INVITE_USER_EMBEDDED";
    Commands3["OPEN_SHARE_MOMENT_DIALOG"] = "OPEN_SHARE_MOMENT_DIALOG";
    Commands3["QUEST_START_TIMER"] = "QUEST_START_TIMER";
    Commands3["REQUEST_PROXY_TICKET_REFRESH"] = "REQUEST_PROXY_TICKET_REFRESH";
    Commands3["SHARE_INTERACTION"] = "SHARE_INTERACTION";
    Commands3["SHARE_LINK"] = "SHARE_LINK";
  })(Commands || (Commands = {}));
  var ReceiveFramePayload = objectType({
    cmd: stringType(),
    data: unknownType(),
    evt: nullType(),
    nonce: stringType()
  }).passthrough();
  var ScopesObject = Object.assign(Object.assign({}, AuthenticateResponseSchema.shape.scopes.element.overlayType._def.innerType.options[0].Values), {
    UNHANDLED: -1
  });
  var Scopes = zodCoerceUnhandledValue(ScopesObject);
  var Relationship = GetRelationshipsResponseSchema.shape.relationships.element;
  var User = objectType({
    id: stringType(),
    username: stringType(),
    discriminator: stringType(),
    global_name: stringType().optional().nullable(),
    avatar: stringType().optional().nullable(),
    avatar_decoration_data: objectType({
      asset: stringType(),
      sku_id: stringType().optional()
    }).nullable(),
    bot: booleanType(),
    flags: numberType().optional().nullable(),
    premium_type: numberType().optional().nullable()
  });
  var GuildMember = objectType({
    user: User,
    nick: stringType().optional().nullable(),
    roles: arrayType(stringType()),
    joined_at: stringType(),
    deaf: booleanType(),
    mute: booleanType()
  });
  var GuildMemberRPC = objectType({
    user_id: stringType(),
    nick: stringType().optional().nullable(),
    guild_id: stringType(),
    avatar: stringType().optional().nullable(),
    avatar_decoration_data: objectType({
      asset: stringType(),
      sku_id: stringType().optional().nullable()
    }).optional().nullable(),
    color_string: stringType().optional().nullable()
  });
  var Emoji = objectType({
    id: stringType(),
    name: stringType().optional().nullable(),
    roles: arrayType(stringType()).optional().nullable(),
    user: User.optional().nullable(),
    require_colons: booleanType().optional().nullable(),
    managed: booleanType().optional().nullable(),
    animated: booleanType().optional().nullable(),
    available: booleanType().optional().nullable()
  });
  var VoiceState = objectType({
    mute: booleanType(),
    deaf: booleanType(),
    self_mute: booleanType(),
    self_deaf: booleanType(),
    suppress: booleanType()
  });
  var UserVoiceState = objectType({
    mute: booleanType(),
    nick: stringType(),
    user: User,
    voice_state: VoiceState,
    volume: numberType()
  });
  var StatusObject = {
    UNHANDLED: -1,
    IDLE: "idle",
    DND: "dnd",
    ONLINE: "online",
    OFFLINE: "offline"
  };
  var Status = zodCoerceUnhandledValue(StatusObject);
  var Activity = objectType({
    name: stringType(),
    type: numberType(),
    url: stringType().optional().nullable(),
    created_at: numberType().optional().nullable(),
    timestamps: objectType({
      start: numberType(),
      end: numberType()
    }).partial().optional().nullable(),
    application_id: stringType().optional().nullable(),
    details: stringType().optional().nullable(),
    details_url: stringType().url().optional().nullable(),
    state: stringType().optional().nullable(),
    state_url: stringType().url().optional().nullable(),
    emoji: Emoji.optional().nullable(),
    party: objectType({
      id: stringType().optional().nullable(),
      size: arrayType(numberType()).optional().nullable()
    }).optional().nullable(),
    assets: objectType({
      large_image: stringType().nullable(),
      large_text: stringType().nullable(),
      large_url: stringType().url().optional().nullable(),
      small_image: stringType().nullable(),
      small_text: stringType().nullable(),
      small_url: stringType().url().optional().nullable()
    }).partial().optional().nullable(),
    secrets: objectType({
      join: stringType(),
      match: stringType()
    }).partial().optional().nullable(),
    instance: booleanType().optional().nullable(),
    flags: numberType().optional().nullable()
  });
  var PermissionOverwriteTypeObject = {
    UNHANDLED: -1,
    ROLE: 0,
    MEMBER: 1
  };
  var PermissionOverwrite = objectType({
    id: stringType(),
    type: zodCoerceUnhandledValue(PermissionOverwriteTypeObject),
    allow: stringType(),
    deny: stringType()
  });
  var ChannelTypesObject = {
    UNHANDLED: -1,
    DM: 1,
    GROUP_DM: 3,
    GUILD_TEXT: 0,
    GUILD_VOICE: 2,
    GUILD_CATEGORY: 4,
    GUILD_ANNOUNCEMENT: 5,
    GUILD_STORE: 6,
    ANNOUNCEMENT_THREAD: 10,
    PUBLIC_THREAD: 11,
    PRIVATE_THREAD: 12,
    GUILD_STAGE_VOICE: 13,
    GUILD_DIRECTORY: 14,
    GUILD_FORUM: 15
  };
  var Channel = objectType({
    id: stringType(),
    type: zodCoerceUnhandledValue(ChannelTypesObject),
    guild_id: stringType().optional().nullable(),
    position: numberType().optional().nullable(),
    permission_overwrites: arrayType(PermissionOverwrite).optional().nullable(),
    name: stringType().optional().nullable(),
    topic: stringType().optional().nullable(),
    nsfw: booleanType().optional().nullable(),
    last_message_id: stringType().optional().nullable(),
    bitrate: numberType().optional().nullable(),
    user_limit: numberType().optional().nullable(),
    rate_limit_per_user: numberType().optional().nullable(),
    recipients: arrayType(User).optional().nullable(),
    icon: stringType().optional().nullable(),
    owner_id: stringType().optional().nullable(),
    application_id: stringType().optional().nullable(),
    parent_id: stringType().optional().nullable(),
    last_pin_timestamp: stringType().optional().nullable()
  });
  var PresenceUpdate = objectType({
    user: User,
    guild_id: stringType(),
    status: Status,
    activities: arrayType(Activity),
    client_status: objectType({
      desktop: Status,
      mobile: Status,
      web: Status
    }).partial()
  });
  var Role = objectType({
    id: stringType(),
    name: stringType(),
    color: numberType(),
    hoist: booleanType(),
    position: numberType(),
    permissions: stringType(),
    managed: booleanType(),
    mentionable: booleanType()
  });
  var Guild = objectType({
    id: stringType(),
    name: stringType(),
    owner_id: stringType(),
    icon: stringType().nullable(),
    icon_hash: stringType().optional().nullable(),
    splash: stringType().nullable(),
    discovery_splash: stringType().nullable(),
    owner: booleanType().optional().nullable(),
    permissions: stringType().optional().nullable(),
    region: stringType(),
    afk_channel_id: stringType().nullable(),
    afk_timeout: numberType(),
    widget_enabled: booleanType().optional().nullable(),
    widget_channel_id: stringType().optional().nullable(),
    verification_level: numberType(),
    default_message_notifications: numberType(),
    explicit_content_filter: numberType(),
    roles: arrayType(Role),
    emojis: arrayType(Emoji),
    features: arrayType(stringType()),
    mfa_level: numberType(),
    application_id: stringType().nullable(),
    system_channel_id: stringType().nullable(),
    system_channel_flags: numberType(),
    rules_channel_id: stringType().nullable(),
    joined_at: stringType().optional().nullable(),
    large: booleanType().optional().nullable(),
    unavailable: booleanType().optional().nullable(),
    member_count: numberType().optional().nullable(),
    voice_states: arrayType(VoiceState).optional().nullable(),
    members: arrayType(GuildMember).optional().nullable(),
    channels: arrayType(Channel).optional().nullable(),
    presences: arrayType(PresenceUpdate).optional().nullable(),
    max_presences: numberType().optional().nullable(),
    max_members: numberType().optional().nullable(),
    vanity_url_code: stringType().nullable(),
    description: stringType().nullable(),
    banner: stringType().nullable(),
    premium_tier: numberType(),
    premium_subscription_count: numberType().optional().nullable(),
    preferred_locale: stringType(),
    public_updates_channel_id: stringType().nullable(),
    max_video_channel_users: numberType().optional().nullable(),
    approximate_member_count: numberType().optional().nullable(),
    approximate_presence_count: numberType().optional().nullable()
  });
  var ChannelMention = objectType({
    id: stringType(),
    guild_id: stringType(),
    type: numberType(),
    name: stringType()
  });
  var Attachment = objectType({
    id: stringType(),
    filename: stringType(),
    size: numberType(),
    url: stringType(),
    proxy_url: stringType(),
    height: numberType().optional().nullable(),
    width: numberType().optional().nullable()
  });
  var EmbedFooter = objectType({
    text: stringType(),
    icon_url: stringType().optional().nullable(),
    proxy_icon_url: stringType().optional().nullable()
  });
  var Image = objectType({
    url: stringType().optional().nullable(),
    proxy_url: stringType().optional().nullable(),
    height: numberType().optional().nullable(),
    width: numberType().optional().nullable()
  });
  var Video = Image.omit({
    proxy_url: true
  });
  var EmbedProvider = objectType({
    name: stringType().optional().nullable(),
    url: stringType().optional().nullable()
  });
  var EmbedAuthor = objectType({
    name: stringType().optional().nullable(),
    url: stringType().optional().nullable(),
    icon_url: stringType().optional().nullable(),
    proxy_icon_url: stringType().optional().nullable()
  });
  var EmbedField = objectType({
    name: stringType(),
    value: stringType(),
    inline: booleanType()
  });
  var Embed = objectType({
    title: stringType().optional().nullable(),
    type: stringType().optional().nullable(),
    description: stringType().optional().nullable(),
    url: stringType().optional().nullable(),
    timestamp: stringType().optional().nullable(),
    color: numberType().optional().nullable(),
    footer: EmbedFooter.optional().nullable(),
    image: Image.optional().nullable(),
    thumbnail: Image.optional().nullable(),
    video: Video.optional().nullable(),
    provider: EmbedProvider.optional().nullable(),
    author: EmbedAuthor.optional().nullable(),
    fields: arrayType(EmbedField).optional().nullable()
  });
  var Reaction = objectType({
    count: numberType(),
    me: booleanType(),
    emoji: Emoji
  });
  var MessageActivity = objectType({
    type: numberType(),
    party_id: stringType().optional().nullable()
  });
  var MessageApplication = objectType({
    id: stringType(),
    cover_image: stringType().optional().nullable(),
    description: stringType(),
    icon: stringType().optional().nullable(),
    name: stringType()
  });
  var MessageReference = objectType({
    message_id: stringType().optional().nullable(),
    channel_id: stringType().optional().nullable(),
    guild_id: stringType().optional().nullable()
  });
  var Message = objectType({
    id: stringType(),
    channel_id: stringType(),
    guild_id: stringType().optional().nullable(),
    author: User.optional().nullable(),
    member: GuildMember.optional().nullable(),
    content: stringType(),
    timestamp: stringType(),
    edited_timestamp: stringType().optional().nullable(),
    tts: booleanType(),
    mention_everyone: booleanType(),
    mentions: arrayType(User),
    mention_roles: arrayType(stringType()),
    mention_channels: arrayType(ChannelMention),
    attachments: arrayType(Attachment),
    embeds: arrayType(Embed),
    reactions: arrayType(Reaction).optional().nullable(),
    nonce: unionType([ stringType(), numberType() ]).optional().nullable(),
    pinned: booleanType(),
    webhook_id: stringType().optional().nullable(),
    type: numberType(),
    activity: MessageActivity.optional().nullable(),
    application: MessageApplication.optional().nullable(),
    message_reference: MessageReference.optional().nullable(),
    flags: numberType().optional().nullable(),
    stickers: arrayType(unknownType()).optional().nullable(),
    // Cannot self reference, but this is possibly a Message
    referenced_message: unknownType().optional().nullable()
  });
  var VoiceDevice = objectType({
    id: stringType(),
    name: stringType()
  });
  var KeyTypesObject = {
    UNHANDLED: -1,
    KEYBOARD_KEY: 0,
    MOUSE_BUTTON: 1,
    KEYBOARD_MODIFIER_KEY: 2,
    GAMEPAD_BUTTON: 3
  };
  var ShortcutKey = objectType({
    type: zodCoerceUnhandledValue(KeyTypesObject),
    code: numberType(),
    name: stringType()
  });
  var VoiceSettingModeTypeObject = {
    UNHANDLED: -1,
    PUSH_TO_TALK: "PUSH_TO_TALK",
    VOICE_ACTIVITY: "VOICE_ACTIVITY"
  };
  var VoiceSettingsMode = objectType({
    type: zodCoerceUnhandledValue(VoiceSettingModeTypeObject),
    auto_threshold: booleanType(),
    threshold: numberType(),
    shortcut: arrayType(ShortcutKey),
    delay: numberType()
  });
  var VoiceSettingsIO = objectType({
    device_id: stringType(),
    volume: numberType(),
    available_devices: arrayType(VoiceDevice)
  });
  var CertifiedDeviceTypeObject = {
    UNHANDLED: -1,
    AUDIO_INPUT: "AUDIO_INPUT",
    AUDIO_OUTPUT: "AUDIO_OUTPUT",
    VIDEO_INPUT: "VIDEO_INPUT"
  };
  var CertifiedDevice = objectType({
    type: zodCoerceUnhandledValue(CertifiedDeviceTypeObject),
    id: stringType(),
    vendor: objectType({
      name: stringType(),
      url: stringType()
    }),
    model: objectType({
      name: stringType(),
      url: stringType()
    }),
    related: arrayType(stringType()),
    echo_cancellation: booleanType().optional().nullable(),
    noise_suppression: booleanType().optional().nullable(),
    automatic_gain_control: booleanType().optional().nullable(),
    hardware_mute: booleanType().optional().nullable()
  });
  var SkuTypeObject = {
    UNHANDLED: -1,
    APPLICATION: 1,
    DLC: 2,
    CONSUMABLE: 3,
    BUNDLE: 4,
    SUBSCRIPTION: 5
  };
  var Sku = objectType({
    id: stringType(),
    name: stringType(),
    type: zodCoerceUnhandledValue(SkuTypeObject),
    price: objectType({
      amount: numberType(),
      currency: stringType()
    }),
    application_id: stringType(),
    flags: numberType(),
    release_date: stringType().nullable()
  });
  var EntitlementTypesObject = {
    UNHANDLED: -1,
    PURCHASE: 1,
    PREMIUM_SUBSCRIPTION: 2,
    DEVELOPER_GIFT: 3,
    TEST_MODE_PURCHASE: 4,
    FREE_PURCHASE: 5,
    USER_GIFT: 6,
    PREMIUM_PURCHASE: 7
  };
  var Entitlement = objectType({
    id: stringType(),
    sku_id: stringType(),
    application_id: stringType(),
    user_id: stringType(),
    gift_code_flags: numberType(),
    type: zodCoerceUnhandledValue(EntitlementTypesObject),
    gifter_user_id: stringType().optional().nullable(),
    branches: arrayType(stringType()).optional().nullable(),
    starts_at: stringType().optional().nullable(),
    // ISO string
    ends_at: stringType().optional().nullable(),
    // ISO string
    parent_id: stringType().optional().nullable(),
    consumed: booleanType().optional().nullable(),
    deleted: booleanType().optional().nullable(),
    gift_code_batch_id: stringType().optional().nullable()
  });
  var OrientationLockStateTypeObject = {
    UNHANDLED: -1,
    UNLOCKED: 1,
    PORTRAIT: 2,
    LANDSCAPE: 3
  };
  var OrientationLockState = zodCoerceUnhandledValue(OrientationLockStateTypeObject);
  var ThermalStateTypeObject = {
    UNHANDLED: -1,
    NOMINAL: 0,
    FAIR: 1,
    SERIOUS: 2,
    CRITICAL: 3
  };
  var ThermalState = zodCoerceUnhandledValue(ThermalStateTypeObject);
  var OrientationTypeObject = {
    UNHANDLED: -1,
    PORTRAIT: 0,
    LANDSCAPE: 1
  };
  var Orientation2 = zodCoerceUnhandledValue(OrientationTypeObject);
  var LayoutModeTypeObject = {
    UNHANDLED: -1,
    FOCUSED: 0,
    PIP: 1,
    GRID: 2
  };
  var LayoutMode = zodCoerceUnhandledValue(LayoutModeTypeObject);
  // node_modules/@discord/embedded-app-sdk/output/schema/events.mjs
  var ERROR = "ERROR";
  var Events;
  (function(Events2) {
    Events2["READY"] = "READY";
    Events2["VOICE_STATE_UPDATE"] = "VOICE_STATE_UPDATE";
    Events2["SPEAKING_START"] = "SPEAKING_START";
    Events2["SPEAKING_STOP"] = "SPEAKING_STOP";
    Events2["ACTIVITY_LAYOUT_MODE_UPDATE"] = "ACTIVITY_LAYOUT_MODE_UPDATE";
    Events2["ORIENTATION_UPDATE"] = "ORIENTATION_UPDATE";
    Events2["CURRENT_USER_UPDATE"] = "CURRENT_USER_UPDATE";
    Events2["CURRENT_GUILD_MEMBER_UPDATE"] = "CURRENT_GUILD_MEMBER_UPDATE";
    Events2["ENTITLEMENT_CREATE"] = "ENTITLEMENT_CREATE";
    Events2["THERMAL_STATE_UPDATE"] = "THERMAL_STATE_UPDATE";
    Events2["ACTIVITY_INSTANCE_PARTICIPANTS_UPDATE"] = "ACTIVITY_INSTANCE_PARTICIPANTS_UPDATE";
    Events2["RELATIONSHIP_UPDATE"] = "RELATIONSHIP_UPDATE";
    Events2["ACTIVITY_JOIN"] = "ACTIVITY_JOIN";
    Events2["QUEST_ENROLLMENT_STATUS_UPDATE"] = "QUEST_ENROLLMENT_STATUS_UPDATE";
  })(Events || (Events = {}));
  var DispatchEventFrame = ReceiveFramePayload.extend({
    evt: nativeEnumType(Events),
    nonce: stringType().nullable(),
    cmd: literalType(DISPATCH),
    data: objectType({}).passthrough()
  });
  var ErrorEvent = ReceiveFramePayload.extend({
    evt: literalType(ERROR),
    data: objectType({
      code: numberType(),
      message: stringType().optional()
    }).passthrough(),
    cmd: nativeEnumType(Commands),
    nonce: stringType().nullable()
  });
  var OtherEvent = DispatchEventFrame.extend({
    evt: stringType()
  });
  var EventFrame = unionType([ DispatchEventFrame, OtherEvent, ErrorEvent ]);
  function parseEventPayload(data) {
    const event = data.evt;
    if (!(event in Events)) {
      throw new Error(`Unrecognized event type ${data.evt}`);
    }
    const eventSchema = EventSchema[event];
    return eventSchema.payload.parse(data);
  }
  var EventSchema = {
    [Events.READY]: {
      payload: DispatchEventFrame.extend({
        evt: literalType(Events.READY),
        data: objectType({
          v: numberType(),
          config: objectType({
            cdn_host: stringType().optional(),
            api_endpoint: stringType(),
            environment: stringType()
          }),
          user: objectType({
            id: stringType(),
            username: stringType(),
            discriminator: stringType(),
            avatar: stringType().optional()
          }).optional()
        })
      })
    },
    [Events.VOICE_STATE_UPDATE]: {
      payload: DispatchEventFrame.extend({
        evt: literalType(Events.VOICE_STATE_UPDATE),
        data: UserVoiceState
      }),
      subscribeArgs: objectType({
        channel_id: stringType()
      })
    },
    [Events.SPEAKING_START]: {
      payload: DispatchEventFrame.extend({
        evt: literalType(Events.SPEAKING_START),
        data: objectType({
          lobby_id: stringType().optional(),
          channel_id: stringType().optional(),
          user_id: stringType()
        })
      }),
      subscribeArgs: objectType({
        lobby_id: stringType().nullable().optional(),
        channel_id: stringType().nullable().optional()
      })
    },
    [Events.SPEAKING_STOP]: {
      payload: DispatchEventFrame.extend({
        evt: literalType(Events.SPEAKING_STOP),
        data: objectType({
          lobby_id: stringType().optional(),
          channel_id: stringType().optional(),
          user_id: stringType()
        })
      }),
      subscribeArgs: objectType({
        lobby_id: stringType().nullable().optional(),
        channel_id: stringType().nullable().optional()
      })
    },
    [Events.ACTIVITY_LAYOUT_MODE_UPDATE]: {
      payload: DispatchEventFrame.extend({
        evt: literalType(Events.ACTIVITY_LAYOUT_MODE_UPDATE),
        data: objectType({
          layout_mode: zodCoerceUnhandledValue(LayoutModeTypeObject)
        })
      })
    },
    [Events.ORIENTATION_UPDATE]: {
      payload: DispatchEventFrame.extend({
        evt: literalType(Events.ORIENTATION_UPDATE),
        data: objectType({
          screen_orientation: zodCoerceUnhandledValue(OrientationTypeObject),
          /**
           * @deprecated use screen_orientation instead
           */ orientation: nativeEnumType(Orientation)
        })
      })
    },
    [Events.CURRENT_USER_UPDATE]: {
      payload: DispatchEventFrame.extend({
        evt: literalType(Events.CURRENT_USER_UPDATE),
        data: User
      })
    },
    [Events.CURRENT_GUILD_MEMBER_UPDATE]: {
      payload: DispatchEventFrame.extend({
        evt: literalType(Events.CURRENT_GUILD_MEMBER_UPDATE),
        data: GuildMemberRPC
      }),
      subscribeArgs: objectType({
        guild_id: stringType()
      })
    },
    [Events.ENTITLEMENT_CREATE]: {
      payload: DispatchEventFrame.extend({
        evt: literalType(Events.ENTITLEMENT_CREATE),
        data: objectType({
          entitlement: Entitlement
        })
      })
    },
    [Events.THERMAL_STATE_UPDATE]: {
      payload: DispatchEventFrame.extend({
        evt: literalType(Events.THERMAL_STATE_UPDATE),
        data: objectType({
          thermal_state: ThermalState
        })
      })
    },
    [Events.ACTIVITY_INSTANCE_PARTICIPANTS_UPDATE]: {
      payload: DispatchEventFrame.extend({
        evt: literalType(Events.ACTIVITY_INSTANCE_PARTICIPANTS_UPDATE),
        data: objectType({
          participants: GetActivityInstanceConnectedParticipantsResponseSchema.shape.participants
        })
      })
    },
    [Events.RELATIONSHIP_UPDATE]: {
      payload: DispatchEventFrame.extend({
        evt: literalType(Events.RELATIONSHIP_UPDATE),
        data: Relationship
      })
    },
    [Events.ACTIVITY_JOIN]: {
      payload: DispatchEventFrame.extend({
        evt: literalType(Events.ACTIVITY_JOIN),
        data: objectType({
          applicationId: stringType(),
          secret: stringType()
        })
      })
    },
    [Events.QUEST_ENROLLMENT_STATUS_UPDATE]: {
      payload: DispatchEventFrame.extend({
        evt: literalType(Events.QUEST_ENROLLMENT_STATUS_UPDATE),
        data: objectType({
          quest_id: stringType(),
          is_enrolled: booleanType(),
          enrolled_at: stringType().date()
        })
      })
    }
  };
  // node_modules/@discord/embedded-app-sdk/output/utils/assertUnreachable.mjs
  function assertUnreachable(_x, runtimeError) {
    throw runtimeError;
  }
  // node_modules/@discord/embedded-app-sdk/output/schema/responses.mjs
  var EmptyResponse = objectType({}).nullable();
  var AuthorizeResponse = objectType({
    code: stringType()
  });
  var GetGuildsResponse = objectType({
    guilds: arrayType(objectType({
      id: stringType(),
      name: stringType()
    }))
  });
  var GetGuildResponse = objectType({
    id: stringType(),
    name: stringType(),
    icon_url: stringType().optional(),
    members: arrayType(GuildMember)
  });
  var GetChannelResponse = objectType({
    id: stringType(),
    type: zodCoerceUnhandledValue(ChannelTypesObject),
    guild_id: stringType().optional().nullable(),
    name: stringType().optional().nullable(),
    topic: stringType().optional().nullable(),
    bitrate: numberType().optional().nullable(),
    user_limit: numberType().optional().nullable(),
    position: numberType().optional().nullable(),
    voice_states: arrayType(UserVoiceState),
    messages: arrayType(Message)
  });
  var GetChannelsResponse = objectType({
    channels: arrayType(Channel)
  });
  var NullableChannelResponse = GetChannelResponse.nullable();
  var SelectVoiceChannelResponse = GetChannelResponse.nullable();
  var SelectTextChannelResponse = GetChannelResponse.nullable();
  var VoiceSettingsResponse = objectType({
    input: VoiceSettingsIO,
    output: VoiceSettingsIO,
    mode: VoiceSettingsMode,
    automatic_gain_control: booleanType(),
    echo_cancellation: booleanType(),
    noise_suppression: booleanType(),
    qos: booleanType(),
    silence_warning: booleanType(),
    deaf: booleanType(),
    mute: booleanType()
  });
  var SubscribeResponse = objectType({
    evt: stringType()
  });
  var CaptureShortcutResponse = objectType({
    shortcut: ShortcutKey
  });
  var SetActivityResponse = Activity;
  var GetSkusResponse = objectType({
    skus: arrayType(Sku)
  });
  var GetEntitlementsResponse = objectType({
    entitlements: arrayType(Entitlement)
  });
  var StartPurchaseResponse = arrayType(Entitlement).nullable();
  var SetConfigResponse = objectType({
    use_interactive_pip: booleanType()
  });
  var UserSettingsGetLocaleResponse = objectType({
    locale: stringType()
  });
  var EncourageHardwareAccelerationResponse = objectType({
    enabled: booleanType()
  });
  var GetChannelPermissionsResponse = objectType({
    permissions: bigIntType().or(stringType())
  });
  var OpenExternalLinkResponse = fallbackToDefault(objectType({
    opened: booleanType().or(nullType())
  }).default({
    opened: null
  }));
  var GetPlatformBehaviorsResponse = objectType({
    iosKeyboardResizesView: optionalType(booleanType())
  });
  var ResponseFrame = ReceiveFramePayload.extend({
    cmd: nativeEnumType(Commands),
    evt: nullType()
  });
  function parseResponseData({cmd, data}) {
    switch (cmd) {
     case Commands.AUTHORIZE:
      return AuthorizeResponse.parse(data);

     case Commands.CAPTURE_SHORTCUT:
      return CaptureShortcutResponse.parse(data);

     case Commands.ENCOURAGE_HW_ACCELERATION:
      return EncourageHardwareAccelerationResponse.parse(data);

     case Commands.GET_CHANNEL:
      return GetChannelResponse.parse(data);

     case Commands.GET_CHANNELS:
      return GetChannelsResponse.parse(data);

     case Commands.GET_CHANNEL_PERMISSIONS:
      return GetChannelPermissionsResponse.parse(data);

     case Commands.GET_GUILD:
      return GetGuildResponse.parse(data);

     case Commands.GET_GUILDS:
      return GetGuildsResponse.parse(data);

     case Commands.GET_PLATFORM_BEHAVIORS:
      return GetPlatformBehaviorsResponse.parse(data);

     case Commands.GET_CHANNEL:
      return GetChannelResponse.parse(data);

     case Commands.SELECT_TEXT_CHANNEL:
      return SelectTextChannelResponse.parse(data);

     case Commands.SELECT_VOICE_CHANNEL:
      return SelectVoiceChannelResponse.parse(data);

     case Commands.SET_ACTIVITY:
      return SetActivityResponse.parse(data);

     case Commands.GET_SKUS_EMBEDDED:
      return GetSkusResponse.parse(data);

     case Commands.GET_ENTITLEMENTS_EMBEDDED:
      return GetEntitlementsResponse.parse(data);

     case Commands.SET_CONFIG:
      return SetConfigResponse.parse(data);

     case Commands.START_PURCHASE:
      return StartPurchaseResponse.parse(data);

     case Commands.SUBSCRIBE:
     case Commands.UNSUBSCRIBE:
      return SubscribeResponse.parse(data);

     case Commands.USER_SETTINGS_GET_LOCALE:
      return UserSettingsGetLocaleResponse.parse(data);

     case Commands.OPEN_EXTERNAL_LINK:
      return OpenExternalLinkResponse.parse(data);

     // Empty Responses
      case Commands.SET_ORIENTATION_LOCK_STATE:
     case Commands.SET_CERTIFIED_DEVICES:
     case Commands.SEND_ANALYTICS_EVENT:
     case Commands.OPEN_INVITE_DIALOG:
     case Commands.CAPTURE_LOG:
     case Commands.GET_SKUS:
     case Commands.GET_ENTITLEMENTS:
      return EmptyResponse.parse(data);

     // START-GENERATED-SECTION
      case Commands.AUTHENTICATE:
     case Commands.GET_ACTIVITY_INSTANCE_CONNECTED_PARTICIPANTS:
     case Commands.GET_QUEST:
     case Commands.GET_QUEST_ENROLLMENT_STATUS:
     case Commands.GET_RELATIONSHIPS:
     case Commands.GET_USER:
     case Commands.INITIATE_IMAGE_UPLOAD:
     case Commands.INVITE_USER_EMBEDDED:
     case Commands.OPEN_SHARE_MOMENT_DIALOG:
     case Commands.QUEST_START_TIMER:
     case Commands.REQUEST_PROXY_TICKET_REFRESH:
     case Commands.SHARE_INTERACTION:
     case Commands.SHARE_LINK:
      const {response} = Schemas[cmd];
      return response.parse(data);

     default:
      assertUnreachable(cmd, new Error(`Unrecognized command ${cmd}`));
    }
  }
  function parseResponsePayload(payload) {
    return Object.assign(Object.assign({}, payload), {
      data: parseResponseData(payload)
    });
  }
  // node_modules/@discord/embedded-app-sdk/output/schema/index.mjs
  objectType({
    frame_id: stringType(),
    platform: nativeEnumType(Platform).optional().nullable()
  });
  objectType({
    v: literalType(1),
    encoding: literalType("json").optional(),
    client_id: stringType(),
    frame_id: stringType()
  });
  var ClosePayload = objectType({
    code: numberType(),
    message: stringType().optional()
  });
  var IncomingPayload = objectType({
    evt: stringType().nullable(),
    nonce: stringType().nullable(),
    data: unknownType().nullable(),
    cmd: stringType()
  }).passthrough();
  function parseIncomingPayload(payload) {
    const incoming = IncomingPayload.parse(payload);
    if (incoming.evt != null) {
      if (incoming.evt === ERROR) {
        return ErrorEvent.parse(incoming);
      }
      return parseEventPayload(EventFrame.parse(incoming));
    } else {
      return parseResponsePayload(ResponseFrame.passthrough().parse(incoming));
    }
  }
  // node_modules/@discord/embedded-app-sdk/output/utils/commandFactory.mjs
  function commandFactory(sendCommand, cmd, response, transferTransform = () => void 0) {
    const payload = ReceiveFramePayload.extend({
      cmd: literalType(cmd),
      data: response
    });
    return async args => {
      const reply = await sendCommand({
        cmd,
        args,
        transfer: transferTransform(args)
      });
      const parsed = payload.parse(reply);
      return parsed.data;
    };
  }
  function schemaCommandFactory(cmd, transferTransform = () => void 0) {
    const response = Schemas[cmd].response;
    const payload = ReceiveFramePayload.extend({
      cmd: literalType(cmd),
      data: response
    });
    return sendCommand => async args => {
      const reply = await sendCommand({
        // @ts-expect-error - Merge commands
        cmd,
        args,
        transfer: transferTransform(args)
      });
      const parsed = payload.parse(reply);
      return parsed.data;
    };
  }
  // node_modules/@discord/embedded-app-sdk/output/commands/authorize.mjs
  var authorize = sendCommand => commandFactory(sendCommand, Commands.AUTHORIZE, AuthorizeResponse);
  // node_modules/@discord/embedded-app-sdk/output/commands/captureLog.mjs
  var captureLog = sendCommand => commandFactory(sendCommand, Commands.CAPTURE_LOG, EmptyResponse);
  // node_modules/@discord/embedded-app-sdk/output/commands/encourageHardwareAcceleration.mjs
  var encourageHardwareAcceleration = sendCommand => commandFactory(sendCommand, Commands.ENCOURAGE_HW_ACCELERATION, EncourageHardwareAccelerationResponse);
  // node_modules/@discord/embedded-app-sdk/output/commands/getChannel.mjs
  var getChannel = sendCommand => commandFactory(sendCommand, Commands.GET_CHANNEL, GetChannelResponse);
  // node_modules/@discord/embedded-app-sdk/output/commands/getEntitlements.mjs
  var getEntitlements = sendCommand => commandFactory(sendCommand, Commands.GET_ENTITLEMENTS_EMBEDDED, GetEntitlementsResponse);
  // node_modules/@discord/embedded-app-sdk/output/commands/getSkus.mjs
  var getSkus = sendCommand => commandFactory(sendCommand, Commands.GET_SKUS_EMBEDDED, GetSkusResponse);
  // node_modules/@discord/embedded-app-sdk/output/commands/getChannelPermissions.mjs
  var getChannelPermissions = sendCommand => commandFactory(sendCommand, Commands.GET_CHANNEL_PERMISSIONS, GetChannelPermissionsResponse);
  // node_modules/@discord/embedded-app-sdk/output/commands/getPlatformBehaviors.mjs
  var getPlatformBehaviors = sendCommand => commandFactory(sendCommand, Commands.GET_PLATFORM_BEHAVIORS, GetPlatformBehaviorsResponse);
  // node_modules/@discord/embedded-app-sdk/output/commands/openExternalLink.mjs
  var openExternalLink = sendCommand => commandFactory(sendCommand, Commands.OPEN_EXTERNAL_LINK, OpenExternalLinkResponse);
  // node_modules/@discord/embedded-app-sdk/output/commands/openInviteDialog.mjs
  var openInviteDialog = sendCommand => commandFactory(sendCommand, Commands.OPEN_INVITE_DIALOG, EmptyResponse);
  // node_modules/@discord/embedded-app-sdk/output/commands/setActivity.mjs
  Activity.pick({
    state: true,
    state_url: true,
    details: true,
    details_url: true,
    timestamps: true,
    assets: true,
    party: true,
    secrets: true,
    instance: true,
    type: true
  }).extend({
    type: Activity.shape.type.optional(),
    instance: Activity.shape.instance.optional()
  }).nullable();
  var setActivity = sendCommand => commandFactory(sendCommand, Commands.SET_ACTIVITY, SetActivityResponse);
  // node_modules/@discord/embedded-app-sdk/output/commands/setConfig.mjs
  var setConfig = sendCommand => commandFactory(sendCommand, Commands.SET_CONFIG, SetConfigResponse);
  // node_modules/@discord/embedded-app-sdk/output/utils/compatCommandFactory.mjs
  function compatCommandFactory({sendCommand, cmd, response, fallbackTransform: fallbackTransform2, transferTransform = () => void 0}) {
    const payload = ReceiveFramePayload.extend({
      cmd: literalType(cmd),
      data: response
    });
    return async args => {
      try {
        const reply = await sendCommand({
          cmd,
          args,
          transfer: transferTransform(args)
        });
        const parsed = payload.parse(reply);
        return parsed.data;
      } catch (error) {
        if (error.code === RPCErrorCodes.INVALID_PAYLOAD) {
          const fallbackArgs = fallbackTransform2(args);
          const reply = await sendCommand({
            cmd,
            args: fallbackArgs,
            transfer: transferTransform(fallbackArgs)
          });
          const parsed = payload.parse(reply);
          return parsed.data;
        } else {
          throw error;
        }
      }
    };
  }
  // node_modules/@discord/embedded-app-sdk/output/commands/setOrientationLockState.mjs
  var fallbackTransform = args => ({
    lock_state: args.lock_state,
    picture_in_picture_lock_state: args.picture_in_picture_lock_state
  });
  var setOrientationLockState = sendCommand => compatCommandFactory({
    sendCommand,
    cmd: Commands.SET_ORIENTATION_LOCK_STATE,
    response: EmptyResponse,
    fallbackTransform
  });
  // node_modules/@discord/embedded-app-sdk/output/commands/startPurchase.mjs
  var startPurchase = sendCommand => commandFactory(sendCommand, Commands.START_PURCHASE, StartPurchaseResponse);
  // node_modules/@discord/embedded-app-sdk/output/commands/userSettingsGetLocale.mjs
  var userSettingsGetLocale = sendCommand => commandFactory(sendCommand, Commands.USER_SETTINGS_GET_LOCALE, UserSettingsGetLocaleResponse);
  // node_modules/@discord/embedded-app-sdk/output/commands/authenticate.mjs
  var authenticate = schemaCommandFactory(Command.AUTHENTICATE);
  // node_modules/@discord/embedded-app-sdk/output/commands/getActivityInstanceConnectedParticipants.mjs
  var getActivityInstanceConnectedParticipants = schemaCommandFactory(Command.GET_ACTIVITY_INSTANCE_CONNECTED_PARTICIPANTS);
  // node_modules/@discord/embedded-app-sdk/output/commands/getQuest.mjs
  var getQuest = schemaCommandFactory(Command.GET_QUEST);
  // node_modules/@discord/embedded-app-sdk/output/commands/getQuestEnrollmentStatus.mjs
  var getQuestEnrollmentStatus = schemaCommandFactory(Command.GET_QUEST_ENROLLMENT_STATUS);
  // node_modules/@discord/embedded-app-sdk/output/commands/getRelationships.mjs
  var getRelationships = schemaCommandFactory(Command.GET_RELATIONSHIPS);
  // node_modules/@discord/embedded-app-sdk/output/commands/getUser.mjs
  var getUser = schemaCommandFactory(Command.GET_USER);
  // node_modules/@discord/embedded-app-sdk/output/commands/initiateImageUpload.mjs
  var initiateImageUpload = schemaCommandFactory(Command.INITIATE_IMAGE_UPLOAD);
  // node_modules/@discord/embedded-app-sdk/output/commands/inviteUserEmbedded.mjs
  var inviteUserEmbedded = schemaCommandFactory(Command.INVITE_USER_EMBEDDED);
  // node_modules/@discord/embedded-app-sdk/output/commands/openShareMomentDialog.mjs
  var openShareMomentDialog = schemaCommandFactory(Command.OPEN_SHARE_MOMENT_DIALOG);
  // node_modules/@discord/embedded-app-sdk/output/commands/questStartTimer.mjs
  var questStartTimer = schemaCommandFactory(Command.QUEST_START_TIMER);
  // node_modules/@discord/embedded-app-sdk/output/commands/requestProxyTicketRefresh.mjs
  var requestProxyTicketRefresh = schemaCommandFactory(Command.REQUEST_PROXY_TICKET_REFRESH);
  // node_modules/@discord/embedded-app-sdk/output/commands/shareInteraction.mjs
  var shareInteraction = schemaCommandFactory(Command.SHARE_INTERACTION);
  // node_modules/@discord/embedded-app-sdk/output/commands/shareLink.mjs
  var shareLink = schemaCommandFactory(Command.SHARE_LINK);
  // node_modules/@discord/embedded-app-sdk/output/commands/index.mjs
  function commands(sendCommand) {
    return {
      authorize: authorize(sendCommand),
      captureLog: captureLog(sendCommand),
      encourageHardwareAcceleration: encourageHardwareAcceleration(sendCommand),
      getChannel: getChannel(sendCommand),
      getChannelPermissions: getChannelPermissions(sendCommand),
      getEntitlements: getEntitlements(sendCommand),
      getPlatformBehaviors: getPlatformBehaviors(sendCommand),
      getSkus: getSkus(sendCommand),
      openExternalLink: openExternalLink(sendCommand),
      openInviteDialog: openInviteDialog(sendCommand),
      setActivity: setActivity(sendCommand),
      setConfig: setConfig(sendCommand),
      setOrientationLockState: setOrientationLockState(sendCommand),
      startPurchase: startPurchase(sendCommand),
      userSettingsGetLocale: userSettingsGetLocale(sendCommand),
      // Backward compatibility - getInstanceConnectedParticipants is an alias for getActivityInstanceConnectedParticipants
      getInstanceConnectedParticipants: getActivityInstanceConnectedParticipants(sendCommand),
      // START-GENERATED-SECTION
      authenticate: authenticate(sendCommand),
      getActivityInstanceConnectedParticipants: getActivityInstanceConnectedParticipants(sendCommand),
      getQuest: getQuest(sendCommand),
      getQuestEnrollmentStatus: getQuestEnrollmentStatus(sendCommand),
      getRelationships: getRelationships(sendCommand),
      getUser: getUser(sendCommand),
      initiateImageUpload: initiateImageUpload(sendCommand),
      inviteUserEmbedded: inviteUserEmbedded(sendCommand),
      openShareMomentDialog: openShareMomentDialog(sendCommand),
      questStartTimer: questStartTimer(sendCommand),
      requestProxyTicketRefresh: requestProxyTicketRefresh(sendCommand),
      shareInteraction: shareInteraction(sendCommand),
      shareLink: shareLink(sendCommand)
    };
  }
  // node_modules/@discord/embedded-app-sdk/output/error.mjs
  var SDKError = class extends Error {
    constructor(code, message = "") {
      super(message);
      this.code = code;
      this.message = message;
      this.name = "Discord SDK Error";
    }
  };
  // node_modules/@discord/embedded-app-sdk/output/utils/getDefaultSdkConfiguration.mjs
  function getDefaultSdkConfiguration() {
    return {
      disableConsoleLogOverride: false
    };
  }
  // node_modules/@discord/embedded-app-sdk/output/utils/console.mjs
  var consoleLevels = [ "log", "warn", "debug", "info", "error" ];
  function wrapConsoleMethod(console2, level, callback) {
    const _consoleMethod = console2[level];
    const _console = console2;
    if (!_consoleMethod) {
      return;
    }
    console2[level] = function() {
      const args = [].slice.call(arguments);
      const message = "" + args.join(" ");
      callback(level, message);
      _consoleMethod.apply(_console, args);
    };
  }
  // node_modules/@discord/embedded-app-sdk/output/package.json.mjs
  var version = "2.5.0";
  // node_modules/@discord/embedded-app-sdk/output/lib/uuid/dist/esm-browser/native.mjs
  var randomUUID = typeof crypto !== "undefined" && crypto.randomUUID && crypto.randomUUID.bind(crypto);
  var native = {
    randomUUID
  };
  // node_modules/@discord/embedded-app-sdk/output/lib/uuid/dist/esm-browser/rng.mjs
  var getRandomValues;
  var rnds8 = new Uint8Array(16);
  function rng() {
    if (!getRandomValues) {
      if (typeof crypto === "undefined" || !crypto.getRandomValues) {
        throw new Error("crypto.getRandomValues() not supported. See https://github.com/uuidjs/uuid#getrandomvalues-not-supported");
      }
      getRandomValues = crypto.getRandomValues.bind(crypto);
    }
    return getRandomValues(rnds8);
  }
  // node_modules/@discord/embedded-app-sdk/output/lib/uuid/dist/esm-browser/stringify.mjs
  var byteToHex = [];
  for (let i = 0; i < 256; ++i) {
    byteToHex.push((i + 256).toString(16).slice(1));
  }
  function unsafeStringify(arr, offset = 0) {
    return (byteToHex[arr[offset + 0]] + byteToHex[arr[offset + 1]] + byteToHex[arr[offset + 2]] + byteToHex[arr[offset + 3]] + "-" + byteToHex[arr[offset + 4]] + byteToHex[arr[offset + 5]] + "-" + byteToHex[arr[offset + 6]] + byteToHex[arr[offset + 7]] + "-" + byteToHex[arr[offset + 8]] + byteToHex[arr[offset + 9]] + "-" + byteToHex[arr[offset + 10]] + byteToHex[arr[offset + 11]] + byteToHex[arr[offset + 12]] + byteToHex[arr[offset + 13]] + byteToHex[arr[offset + 14]] + byteToHex[arr[offset + 15]]).toLowerCase();
  }
  // node_modules/@discord/embedded-app-sdk/output/lib/uuid/dist/esm-browser/v4.mjs
  function v4(options, buf, offset) {
    if (native.randomUUID && !buf && !options) {
      return native.randomUUID();
    }
    options = options || {};
    const rnds = options.random ?? options.rng?.() ?? rng();
    if (rnds.length < 16) {
      throw new Error("Random bytes length must be >= 16");
    }
    rnds[6] = rnds[6] & 15 | 64;
    rnds[8] = rnds[8] & 63 | 128;
    return unsafeStringify(rnds);
  }
  // node_modules/@discord/embedded-app-sdk/output/Discord.mjs
  var Opcodes;
  (function(Opcodes2) {
    Opcodes2[Opcodes2["HANDSHAKE"] = 0] = "HANDSHAKE";
    Opcodes2[Opcodes2["FRAME"] = 1] = "FRAME";
    Opcodes2[Opcodes2["CLOSE"] = 2] = "CLOSE";
    Opcodes2[Opcodes2["HELLO"] = 3] = "HELLO";
  })(Opcodes || (Opcodes = {}));
  var ALLOWED_ORIGINS = new Set(getAllowedOrigins());
  function getAllowedOrigins() {
    if (typeof window === "undefined") return [];
    return [ window.location.origin, "https://discord.com", "https://discordapp.com", "https://ptb.discord.com", "https://ptb.discordapp.com", "https://canary.discord.com", "https://canary.discordapp.com", "https://staging.discord.co", "http://localhost:3333", "https://pax.discord.com", "null" ];
  }
  function getRPCServerSource() {
    var _a;
    return [ (_a = window.parent.opener) !== null && _a !== void 0 ? _a : window.parent, !!document.referrer ? document.referrer : "*" ];
  }
  var DiscordSDK = class {
    getTransfer(payload) {
      var _a;
      switch (payload.cmd) {
       case Commands.SUBSCRIBE:
       case Commands.UNSUBSCRIBE:
        return void 0;

       default:
        return (_a = payload.transfer) !== null && _a !== void 0 ? _a : void 0;
      }
    }
    constructor(clientId, configuration) {
      this.sdkVersion = version;
      this.mobileAppVersion = null;
      this.source = null;
      this.sourceOrigin = "";
      this.eventBus = new EventEmitter;
      this.pendingCommands =  new Map;
      this.sendCommand = payload => {
        var _a;
        if (this.source == null) throw new Error("Attempting to send message before initialization");
        const nonce = v4();
        (_a = this.source) === null || _a === void 0 ? void 0 : _a.postMessage([ Opcodes.FRAME, Object.assign(Object.assign({}, payload), {
          nonce
        }) ], this.sourceOrigin, this.getTransfer(payload));
        const promise = new Promise((resolve, reject) => {
          this.pendingCommands.set(nonce, {
            resolve,
            reject
          });
        });
        return promise;
      };
      this.commands = commands(this.sendCommand);
      this.handleMessage = event => {
        if (!ALLOWED_ORIGINS.has(event.origin)) return;
        const tuple = event.data;
        if (!Array.isArray(tuple)) {
          return;
        }
        const [opcode, data] = tuple;
        switch (opcode) {
         case Opcodes.HELLO:
          return;

         case Opcodes.CLOSE:
          return this.handleClose(data);

         case Opcodes.HANDSHAKE:
          return this.handleHandshake();

         case Opcodes.FRAME:
          return this.handleFrame(data);

         default:
          throw new Error("Invalid message format");
        }
      };
      this.isReady = false;
      this.clientId = clientId;
      this.configuration = configuration !== null && configuration !== void 0 ? configuration : getDefaultSdkConfiguration();
      if (typeof window !== "undefined") {
        window.addEventListener("message", this.handleMessage);
      }
      if (typeof window === "undefined") {
        this.frameId = "";
        this.instanceId = "";
        this.customId = null;
        this.referrerId = null;
        this.platform = Platform.DESKTOP;
        this.guildId = null;
        this.channelId = null;
        this.locationId = null;
        return;
      }
      const urlParams = new URLSearchParams(this._getSearch());
      const frameId = urlParams.get("frame_id");
      if (!frameId) {
        throw new Error("frame_id query param is not defined");
      }
      this.frameId = frameId;
      const instanceId = urlParams.get("instance_id");
      if (!instanceId) {
        throw new Error("instance_id query param is not defined");
      }
      this.instanceId = instanceId;
      const platform = urlParams.get("platform");
      if (!platform) {
        throw new Error("platform query param is not defined");
      } else if (platform !== Platform.DESKTOP && platform !== Platform.MOBILE) {
        throw new Error(`Invalid query param "platform" of "${platform}". Valid values are "${Platform.DESKTOP}" or "${Platform.MOBILE}"`);
      }
      this.platform = platform;
      this.customId = urlParams.get("custom_id");
      this.referrerId = urlParams.get("referrer_id");
      this.guildId = urlParams.get("guild_id");
      this.channelId = urlParams.get("channel_id");
      this.locationId = urlParams.get("location_id");
      this.mobileAppVersion = urlParams.get("mobile_app_version");
      [this.source, this.sourceOrigin] = getRPCServerSource();
      this.addOnReadyListener();
      this.handshake();
    }
    close(code, message) {
      var _a;
      window.removeEventListener("message", this.handleMessage);
      const nonce = v4();
      (_a = this.source) === null || _a === void 0 ? void 0 : _a.postMessage([ Opcodes.CLOSE, {
        code,
        message,
        nonce
      } ], this.sourceOrigin);
    }
    async subscribe(event, listener, ...rest) {
      const [subscribeArgs] = rest;
      const listenerCount = this.eventBus.listenerCount(event);
      const emitter = this.eventBus.on(event, listener);
      if (Object.values(Events).includes(event) && event !== Events.READY && listenerCount === 0) {
        await this.sendCommand({
          cmd: Commands.SUBSCRIBE,
          args: subscribeArgs,
          evt: event
        });
      }
      return emitter;
    }
    async unsubscribe(event, listener, ...rest) {
      const [unsubscribeArgs] = rest;
      if (event !== Events.READY && this.eventBus.listenerCount(event) === 1) {
        await this.sendCommand({
          cmd: Commands.UNSUBSCRIBE,
          evt: event,
          args: unsubscribeArgs
        });
      }
      return this.eventBus.off(event, listener);
    }
    async ready() {
      if (this.isReady) {
        return;
      } else {
        await new Promise(resolve => {
          this.eventBus.once(Events.READY, resolve);
        });
      }
    }
    parseMajorMobileVersion() {
      if (this.mobileAppVersion && this.mobileAppVersion.includes(".")) {
        try {
          return parseInt(this.mobileAppVersion.split(".")[0]);
        } catch (_a) {
          return UNKNOWN_VERSION_NUMBER;
        }
      }
      return UNKNOWN_VERSION_NUMBER;
    }
    handshake() {
      var _a;
      const handshakePayload = {
        v: 1,
        encoding: "json",
        client_id: this.clientId,
        frame_id: this.frameId
      };
      const majorMobileVersion = this.parseMajorMobileVersion();
      if (this.platform === Platform.DESKTOP || majorMobileVersion >= HANDSHAKE_SDK_VERSION_MINIMUM_MOBILE_VERSION) {
        handshakePayload["sdk_version"] = this.sdkVersion;
      }
      (_a = this.source) === null || _a === void 0 ? void 0 : _a.postMessage([ Opcodes.HANDSHAKE, handshakePayload ], this.sourceOrigin);
    }
    addOnReadyListener() {
      this.eventBus.once(Events.READY, () => {
        this.overrideConsoleLogging();
        this.isReady = true;
      });
    }
    overrideConsoleLogging() {
      if (this.configuration.disableConsoleLogOverride) return;
      const sendCaptureLogCommand = (level, message) => {
        this.commands.captureLog({
          level,
          message
        });
      };
      consoleLevels.forEach(level => {
        wrapConsoleMethod(console, level, sendCaptureLogCommand);
      });
    }
    handleClose(data) {
      ClosePayload.parse(data);
    }
    handleHandshake() {}
    handleFrame(payload) {
      var _a, _b;
      let parsed;
      try {
        parsed = parseIncomingPayload(payload);
      } catch (e) {
        console.error("Failed to parse", payload);
        console.error(e);
        return;
      }
      if (parsed.cmd === "DISPATCH") {
        this.eventBus.emit(parsed.evt, parsed.data);
      } else {
        if (parsed.evt === ERROR) {
          if (parsed.nonce != null) {
            (_a = this.pendingCommands.get(parsed.nonce)) === null || _a === void 0 ? void 0 : _a.reject(parsed.data);
            this.pendingCommands.delete(parsed.nonce);
            return;
          }
          this.eventBus.emit("error", new SDKError(parsed.data.code, parsed.data.message));
        }
        if (parsed.nonce == null) {
          console.error("Missing nonce", payload);
          return;
        }
        (_b = this.pendingCommands.get(parsed.nonce)) === null || _b === void 0 ? void 0 : _b.resolve(parsed);
        this.pendingCommands.delete(parsed.nonce);
      }
    }
    _getSearch() {
      return typeof window === "undefined" ? "" : window.location.search;
    }
  };
  // node_modules/@discord/embedded-app-sdk/output/lib/decimal.js-light/decimal.mjs
  var MAX_DIGITS = 1e9;
  var defaults = {
    // These values must be integers within the stated ranges (inclusive).
    // Most of these values can be changed during run-time using `Decimal.config`.
    // The maximum number of significant digits of the result of a calculation or base conversion.
    // E.g. `Decimal.config({ precision: 20 });`
    precision: 20,
    // 1 to MAX_DIGITS
    // The rounding mode used by default by `toInteger`, `toDecimalPlaces`, `toExponential`,
    // `toFixed`, `toPrecision` and `toSignificantDigits`.
    // ROUND_UP         0 Away from zero.
    // ROUND_DOWN       1 Towards zero.
    // ROUND_CEIL       2 Towards +Infinity.
    // ROUND_FLOOR      3 Towards -Infinity.
    // ROUND_HALF_UP    4 Towards nearest neighbour. If equidistant, up.
    // ROUND_HALF_DOWN  5 Towards nearest neighbour. If equidistant, down.
    // ROUND_HALF_EVEN  6 Towards nearest neighbour. If equidistant, towards even neighbour.
    // ROUND_HALF_CEIL  7 Towards nearest neighbour. If equidistant, towards +Infinity.
    // ROUND_HALF_FLOOR 8 Towards nearest neighbour. If equidistant, towards -Infinity.
    // E.g.
    // `Decimal.rounding = 4;`
    // `Decimal.rounding = Decimal.ROUND_HALF_UP;`
    rounding: 4,
    // 0 to 8
    // The exponent value at and beneath which `toString` returns exponential notation.
    // JavaScript numbers: -7
    toExpNeg: -7,
    // 0 to -MAX_E
    // The exponent value at and above which `toString` returns exponential notation.
    // JavaScript numbers: 21
    toExpPos: 21,
    // 0 to MAX_E
    // The natural logarithm of 10.
    // 115 digits
    LN10: "2.302585092994045684017991454684364207601101488628772976033327900967572609677352480235997205089598298341967784042286"
  };
  var Decimal;
  var external = true;
  var decimalError = "[DecimalError] ";
  var invalidArgument = decimalError + "Invalid argument: ";
  var exponentOutOfRange = decimalError + "Exponent out of range: ";
  var mathfloor = Math.floor;
  var mathpow = Math.pow;
  var isDecimal = /^(\d+(\.\d*)?|\.\d+)(e[+-]?\d+)?$/i;
  var ONE;
  var BASE = 1e7;
  var LOG_BASE = 7;
  var MAX_SAFE_INTEGER = 9007199254740991;
  var MAX_E = mathfloor(MAX_SAFE_INTEGER / LOG_BASE);
  var P = {};
  P.absoluteValue = P.abs = function() {
    var x = new this.constructor(this);
    if (x.s) x.s = 1;
    return x;
  };
  P.comparedTo = P.cmp = function(y) {
    var i, j, xdL, ydL, x = this;
    y = new x.constructor(y);
    if (x.s !== y.s) return x.s || -y.s;
    if (x.e !== y.e) return x.e > y.e ^ x.s < 0 ? 1 : -1;
    xdL = x.d.length;
    ydL = y.d.length;
    for (i = 0, j = xdL < ydL ? xdL : ydL; i < j; ++i) {
      if (x.d[i] !== y.d[i]) return x.d[i] > y.d[i] ^ x.s < 0 ? 1 : -1;
    }
    return xdL === ydL ? 0 : xdL > ydL ^ x.s < 0 ? 1 : -1;
  };
  P.decimalPlaces = P.dp = function() {
    var x = this, w = x.d.length - 1, dp = (w - x.e) * LOG_BASE;
    w = x.d[w];
    if (w) for (;w % 10 == 0; w /= 10) dp--;
    return dp < 0 ? 0 : dp;
  };
  P.dividedBy = P.div = function(y) {
    return divide(this, new this.constructor(y));
  };
  P.dividedToIntegerBy = P.idiv = function(y) {
    var x = this, Ctor = x.constructor;
    return round(divide(x, new Ctor(y), 0, 1), Ctor.precision);
  };
  P.equals = P.eq = function(y) {
    return !this.cmp(y);
  };
  P.exponent = function() {
    return getBase10Exponent(this);
  };
  P.greaterThan = P.gt = function(y) {
    return this.cmp(y) > 0;
  };
  P.greaterThanOrEqualTo = P.gte = function(y) {
    return this.cmp(y) >= 0;
  };
  P.isInteger = P.isint = function() {
    return this.e > this.d.length - 2;
  };
  P.isNegative = P.isneg = function() {
    return this.s < 0;
  };
  P.isPositive = P.ispos = function() {
    return this.s > 0;
  };
  P.isZero = function() {
    return this.s === 0;
  };
  P.lessThan = P.lt = function(y) {
    return this.cmp(y) < 0;
  };
  P.lessThanOrEqualTo = P.lte = function(y) {
    return this.cmp(y) < 1;
  };
  P.logarithm = P.log = function(base) {
    var r, x = this, Ctor = x.constructor, pr = Ctor.precision, wpr = pr + 5;
    if (base === void 0) {
      base = new Ctor(10);
    } else {
      base = new Ctor(base);
      if (base.s < 1 || base.eq(ONE)) throw Error(decimalError + "NaN");
    }
    if (x.s < 1) throw Error(decimalError + (x.s ? "NaN" : "-Infinity"));
    if (x.eq(ONE)) return new Ctor(0);
    external = false;
    r = divide(ln(x, wpr), ln(base, wpr), wpr);
    external = true;
    return round(r, pr);
  };
  P.minus = P.sub = function(y) {
    var x = this;
    y = new x.constructor(y);
    return x.s == y.s ? subtract(x, y) : add(x, (y.s = -y.s, y));
  };
  P.modulo = P.mod = function(y) {
    var q, x = this, Ctor = x.constructor, pr = Ctor.precision;
    y = new Ctor(y);
    if (!y.s) throw Error(decimalError + "NaN");
    if (!x.s) return round(new Ctor(x), pr);
    external = false;
    q = divide(x, y, 0, 1).times(y);
    external = true;
    return x.minus(q);
  };
  P.naturalExponential = P.exp = function() {
    return exp(this);
  };
  P.naturalLogarithm = P.ln = function() {
    return ln(this);
  };
  P.negated = P.neg = function() {
    var x = new this.constructor(this);
    x.s = -x.s || 0;
    return x;
  };
  P.plus = P.add = function(y) {
    var x = this;
    y = new x.constructor(y);
    return x.s == y.s ? add(x, y) : subtract(x, (y.s = -y.s, y));
  };
  P.precision = P.sd = function(z2) {
    var e, sd, w, x = this;
    if (z2 !== void 0 && z2 !== !!z2 && z2 !== 1 && z2 !== 0) throw Error(invalidArgument + z2);
    e = getBase10Exponent(x) + 1;
    w = x.d.length - 1;
    sd = w * LOG_BASE + 1;
    w = x.d[w];
    if (w) {
      for (;w % 10 == 0; w /= 10) sd--;
      for (w = x.d[0]; w >= 10; w /= 10) sd++;
    }
    return z2 && e > sd ? e : sd;
  };
  P.squareRoot = P.sqrt = function() {
    var e, n, pr, r, s, t, wpr, x = this, Ctor = x.constructor;
    if (x.s < 1) {
      if (!x.s) return new Ctor(0);
      throw Error(decimalError + "NaN");
    }
    e = getBase10Exponent(x);
    external = false;
    s = Math.sqrt(+x);
    if (s == 0 || s == 1 / 0) {
      n = digitsToString(x.d);
      if ((n.length + e) % 2 == 0) n += "0";
      s = Math.sqrt(n);
      e = mathfloor((e + 1) / 2) - (e < 0 || e % 2);
      if (s == 1 / 0) {
        n = "5e" + e;
      } else {
        n = s.toExponential();
        n = n.slice(0, n.indexOf("e") + 1) + e;
      }
      r = new Ctor(n);
    } else {
      r = new Ctor(s.toString());
    }
    pr = Ctor.precision;
    s = wpr = pr + 3;
    for (;;) {
      t = r;
      r = t.plus(divide(x, t, wpr + 2)).times(.5);
      if (digitsToString(t.d).slice(0, wpr) === (n = digitsToString(r.d)).slice(0, wpr)) {
        n = n.slice(wpr - 3, wpr + 1);
        if (s == wpr && n == "4999") {
          round(t, pr + 1, 0);
          if (t.times(t).eq(x)) {
            r = t;
            break;
          }
        } else if (n != "9999") {
          break;
        }
        wpr += 4;
      }
    }
    external = true;
    return round(r, pr);
  };
  P.times = P.mul = function(y) {
    var carry, e, i, k, r, rL, t, xdL, ydL, x = this, Ctor = x.constructor, xd = x.d, yd = (y = new Ctor(y)).d;
    if (!x.s || !y.s) return new Ctor(0);
    y.s *= x.s;
    e = x.e + y.e;
    xdL = xd.length;
    ydL = yd.length;
    if (xdL < ydL) {
      r = xd;
      xd = yd;
      yd = r;
      rL = xdL;
      xdL = ydL;
      ydL = rL;
    }
    r = [];
    rL = xdL + ydL;
    for (i = rL; i--; ) r.push(0);
    for (i = ydL; --i >= 0; ) {
      carry = 0;
      for (k = xdL + i; k > i; ) {
        t = r[k] + yd[i] * xd[k - i - 1] + carry;
        r[k--] = t % BASE | 0;
        carry = t / BASE | 0;
      }
      r[k] = (r[k] + carry) % BASE | 0;
    }
    for (;!r[--rL]; ) r.pop();
    if (carry) ++e; else r.shift();
    y.d = r;
    y.e = e;
    return external ? round(y, Ctor.precision) : y;
  };
  P.toDecimalPlaces = P.todp = function(dp, rm) {
    var x = this, Ctor = x.constructor;
    x = new Ctor(x);
    if (dp === void 0) return x;
    checkInt32(dp, 0, MAX_DIGITS);
    if (rm === void 0) rm = Ctor.rounding; else checkInt32(rm, 0, 8);
    return round(x, dp + getBase10Exponent(x) + 1, rm);
  };
  P.toExponential = function(dp, rm) {
    var str, x = this, Ctor = x.constructor;
    if (dp === void 0) {
      str = toString(x, true);
    } else {
      checkInt32(dp, 0, MAX_DIGITS);
      if (rm === void 0) rm = Ctor.rounding; else checkInt32(rm, 0, 8);
      x = round(new Ctor(x), dp + 1, rm);
      str = toString(x, true, dp + 1);
    }
    return str;
  };
  P.toFixed = function(dp, rm) {
    var str, y, x = this, Ctor = x.constructor;
    if (dp === void 0) return toString(x);
    checkInt32(dp, 0, MAX_DIGITS);
    if (rm === void 0) rm = Ctor.rounding; else checkInt32(rm, 0, 8);
    y = round(new Ctor(x), dp + getBase10Exponent(x) + 1, rm);
    str = toString(y.abs(), false, dp + getBase10Exponent(y) + 1);
    return x.isneg() && !x.isZero() ? "-" + str : str;
  };
  P.toInteger = P.toint = function() {
    var x = this, Ctor = x.constructor;
    return round(new Ctor(x), getBase10Exponent(x) + 1, Ctor.rounding);
  };
  P.toNumber = function() {
    return +this;
  };
  P.toPower = P.pow = function(y) {
    var e, k, pr, r, sign, yIsInt, x = this, Ctor = x.constructor, guard = 12, yn = +(y = new Ctor(y));
    if (!y.s) return new Ctor(ONE);
    x = new Ctor(x);
    if (!x.s) {
      if (y.s < 1) throw Error(decimalError + "Infinity");
      return x;
    }
    if (x.eq(ONE)) return x;
    pr = Ctor.precision;
    if (y.eq(ONE)) return round(x, pr);
    e = y.e;
    k = y.d.length - 1;
    yIsInt = e >= k;
    sign = x.s;
    if (!yIsInt) {
      if (sign < 0) throw Error(decimalError + "NaN");
    } else if ((k = yn < 0 ? -yn : yn) <= MAX_SAFE_INTEGER) {
      r = new Ctor(ONE);
      e = Math.ceil(pr / LOG_BASE + 4);
      external = false;
      for (;;) {
        if (k % 2) {
          r = r.times(x);
          truncate(r.d, e);
        }
        k = mathfloor(k / 2);
        if (k === 0) break;
        x = x.times(x);
        truncate(x.d, e);
      }
      external = true;
      return y.s < 0 ? new Ctor(ONE).div(r) : round(r, pr);
    }
    sign = sign < 0 && y.d[Math.max(e, k)] & 1 ? -1 : 1;
    x.s = 1;
    external = false;
    r = y.times(ln(x, pr + guard));
    external = true;
    r = exp(r);
    r.s = sign;
    return r;
  };
  P.toPrecision = function(sd, rm) {
    var e, str, x = this, Ctor = x.constructor;
    if (sd === void 0) {
      e = getBase10Exponent(x);
      str = toString(x, e <= Ctor.toExpNeg || e >= Ctor.toExpPos);
    } else {
      checkInt32(sd, 1, MAX_DIGITS);
      if (rm === void 0) rm = Ctor.rounding; else checkInt32(rm, 0, 8);
      x = round(new Ctor(x), sd, rm);
      e = getBase10Exponent(x);
      str = toString(x, sd <= e || e <= Ctor.toExpNeg, sd);
    }
    return str;
  };
  P.toSignificantDigits = P.tosd = function(sd, rm) {
    var x = this, Ctor = x.constructor;
    if (sd === void 0) {
      sd = Ctor.precision;
      rm = Ctor.rounding;
    } else {
      checkInt32(sd, 1, MAX_DIGITS);
      if (rm === void 0) rm = Ctor.rounding; else checkInt32(rm, 0, 8);
    }
    return round(new Ctor(x), sd, rm);
  };
  P.toString = P.valueOf = P.val = P.toJSON = P[ Symbol.for("nodejs.util.inspect.custom")] = function() {
    var x = this, e = getBase10Exponent(x), Ctor = x.constructor;
    return toString(x, e <= Ctor.toExpNeg || e >= Ctor.toExpPos);
  };
  function add(x, y) {
    var carry, d, e, i, k, len, xd, yd, Ctor = x.constructor, pr = Ctor.precision;
    if (!x.s || !y.s) {
      if (!y.s) y = new Ctor(x);
      return external ? round(y, pr) : y;
    }
    xd = x.d;
    yd = y.d;
    k = x.e;
    e = y.e;
    xd = xd.slice();
    i = k - e;
    if (i) {
      if (i < 0) {
        d = xd;
        i = -i;
        len = yd.length;
      } else {
        d = yd;
        e = k;
        len = xd.length;
      }
      k = Math.ceil(pr / LOG_BASE);
      len = k > len ? k + 1 : len + 1;
      if (i > len) {
        i = len;
        d.length = 1;
      }
      d.reverse();
      for (;i--; ) d.push(0);
      d.reverse();
    }
    len = xd.length;
    i = yd.length;
    if (len - i < 0) {
      i = len;
      d = yd;
      yd = xd;
      xd = d;
    }
    for (carry = 0; i; ) {
      carry = (xd[--i] = xd[i] + yd[i] + carry) / BASE | 0;
      xd[i] %= BASE;
    }
    if (carry) {
      xd.unshift(carry);
      ++e;
    }
    for (len = xd.length; xd[--len] == 0; ) xd.pop();
    y.d = xd;
    y.e = e;
    return external ? round(y, pr) : y;
  }
  function checkInt32(i, min, max) {
    if (i !== ~~i || i < min || i > max) {
      throw Error(invalidArgument + i);
    }
  }
  function digitsToString(d) {
    var i, k, ws, indexOfLastWord = d.length - 1, str = "", w = d[0];
    if (indexOfLastWord > 0) {
      str += w;
      for (i = 1; i < indexOfLastWord; i++) {
        ws = d[i] + "";
        k = LOG_BASE - ws.length;
        if (k) str += getZeroString(k);
        str += ws;
      }
      w = d[i];
      ws = w + "";
      k = LOG_BASE - ws.length;
      if (k) str += getZeroString(k);
    } else if (w === 0) {
      return "0";
    }
    for (;w % 10 === 0; ) w /= 10;
    return str + w;
  }
  var divide =  (function() {
    function multiplyInteger(x, k) {
      var temp, carry = 0, i = x.length;
      for (x = x.slice(); i--; ) {
        temp = x[i] * k + carry;
        x[i] = temp % BASE | 0;
        carry = temp / BASE | 0;
      }
      if (carry) x.unshift(carry);
      return x;
    }
    function compare(a, b, aL, bL) {
      var i, r;
      if (aL != bL) {
        r = aL > bL ? 1 : -1;
      } else {
        for (i = r = 0; i < aL; i++) {
          if (a[i] != b[i]) {
            r = a[i] > b[i] ? 1 : -1;
            break;
          }
        }
      }
      return r;
    }
    function subtract2(a, b, aL) {
      var i = 0;
      for (;aL--; ) {
        a[aL] -= i;
        i = a[aL] < b[aL] ? 1 : 0;
        a[aL] = i * BASE + a[aL] - b[aL];
      }
      for (;!a[0] && a.length > 1; ) a.shift();
    }
    return function(x, y, pr, dp) {
      var cmp, e, i, k, prod, prodL, q, qd, rem, remL, rem0, sd, t, xi, xL, yd0, yL, yz, Ctor = x.constructor, sign = x.s == y.s ? 1 : -1, xd = x.d, yd = y.d;
      if (!x.s) return new Ctor(x);
      if (!y.s) throw Error(decimalError + "Division by zero");
      e = x.e - y.e;
      yL = yd.length;
      xL = xd.length;
      q = new Ctor(sign);
      qd = q.d = [];
      for (i = 0; yd[i] == (xd[i] || 0); ) ++i;
      if (yd[i] > (xd[i] || 0)) --e;
      if (pr == null) {
        sd = pr = Ctor.precision;
      } else if (dp) {
        sd = pr + (getBase10Exponent(x) - getBase10Exponent(y)) + 1;
      } else {
        sd = pr;
      }
      if (sd < 0) return new Ctor(0);
      sd = sd / LOG_BASE + 2 | 0;
      i = 0;
      if (yL == 1) {
        k = 0;
        yd = yd[0];
        sd++;
        for (;(i < xL || k) && sd--; i++) {
          t = k * BASE + (xd[i] || 0);
          qd[i] = t / yd | 0;
          k = t % yd | 0;
        }
      } else {
        k = BASE / (yd[0] + 1) | 0;
        if (k > 1) {
          yd = multiplyInteger(yd, k);
          xd = multiplyInteger(xd, k);
          yL = yd.length;
          xL = xd.length;
        }
        xi = yL;
        rem = xd.slice(0, yL);
        remL = rem.length;
        for (;remL < yL; ) rem[remL++] = 0;
        yz = yd.slice();
        yz.unshift(0);
        yd0 = yd[0];
        if (yd[1] >= BASE / 2) ++yd0;
        do {
          k = 0;
          cmp = compare(yd, rem, yL, remL);
          if (cmp < 0) {
            rem0 = rem[0];
            if (yL != remL) rem0 = rem0 * BASE + (rem[1] || 0);
            k = rem0 / yd0 | 0;
            if (k > 1) {
              if (k >= BASE) k = BASE - 1;
              prod = multiplyInteger(yd, k);
              prodL = prod.length;
              remL = rem.length;
              cmp = compare(prod, rem, prodL, remL);
              if (cmp == 1) {
                k--;
                subtract2(prod, yL < prodL ? yz : yd, prodL);
              }
            } else {
              if (k == 0) cmp = k = 1;
              prod = yd.slice();
            }
            prodL = prod.length;
            if (prodL < remL) prod.unshift(0);
            subtract2(rem, prod, remL);
            if (cmp == -1) {
              remL = rem.length;
              cmp = compare(yd, rem, yL, remL);
              if (cmp < 1) {
                k++;
                subtract2(rem, yL < remL ? yz : yd, remL);
              }
            }
            remL = rem.length;
          } else if (cmp === 0) {
            k++;
            rem = [ 0 ];
          }
          qd[i++] = k;
          if (cmp && rem[0]) {
            rem[remL++] = xd[xi] || 0;
          } else {
            rem = [ xd[xi] ];
            remL = 1;
          }
        } while ((xi++ < xL || rem[0] !== void 0) && sd--);
      }
      if (!qd[0]) qd.shift();
      q.e = e;
      return round(q, dp ? pr + getBase10Exponent(q) + 1 : pr);
    };
  })();
  function exp(x, sd) {
    var denominator, guard, pow, sum, t, wpr, i = 0, k = 0, Ctor = x.constructor, pr = Ctor.precision;
    if (getBase10Exponent(x) > 16) throw Error(exponentOutOfRange + getBase10Exponent(x));
    if (!x.s) return new Ctor(ONE);
    if (sd == null) {
      external = false;
      wpr = pr;
    } else {
      wpr = sd;
    }
    t = new Ctor(.03125);
    while (x.abs().gte(.1)) {
      x = x.times(t);
      k += 5;
    }
    guard = Math.log(mathpow(2, k)) / Math.LN10 * 2 + 5 | 0;
    wpr += guard;
    denominator = pow = sum = new Ctor(ONE);
    Ctor.precision = wpr;
    for (;;) {
      pow = round(pow.times(x), wpr);
      denominator = denominator.times(++i);
      t = sum.plus(divide(pow, denominator, wpr));
      if (digitsToString(t.d).slice(0, wpr) === digitsToString(sum.d).slice(0, wpr)) {
        while (k--) sum = round(sum.times(sum), wpr);
        Ctor.precision = pr;
        return sd == null ? (external = true, round(sum, pr)) : sum;
      }
      sum = t;
    }
  }
  function getBase10Exponent(x) {
    var e = x.e * LOG_BASE, w = x.d[0];
    for (;w >= 10; w /= 10) e++;
    return e;
  }
  function getLn10(Ctor, sd, pr) {
    if (sd > Ctor.LN10.sd()) {
      external = true;
      if (pr) Ctor.precision = pr;
      throw Error(decimalError + "LN10 precision limit exceeded");
    }
    return round(new Ctor(Ctor.LN10), sd);
  }
  function getZeroString(k) {
    var zs = "";
    for (;k--; ) zs += "0";
    return zs;
  }
  function ln(y, sd) {
    var c, c0, denominator, e, numerator, sum, t, wpr, x2, n = 1, guard = 10, x = y, xd = x.d, Ctor = x.constructor, pr = Ctor.precision;
    if (x.s < 1) throw Error(decimalError + (x.s ? "NaN" : "-Infinity"));
    if (x.eq(ONE)) return new Ctor(0);
    if (sd == null) {
      external = false;
      wpr = pr;
    } else {
      wpr = sd;
    }
    if (x.eq(10)) {
      if (sd == null) external = true;
      return getLn10(Ctor, wpr);
    }
    wpr += guard;
    Ctor.precision = wpr;
    c = digitsToString(xd);
    c0 = c.charAt(0);
    e = getBase10Exponent(x);
    if (Math.abs(e) < 15e14) {
      while (c0 < 7 && c0 != 1 || c0 == 1 && c.charAt(1) > 3) {
        x = x.times(y);
        c = digitsToString(x.d);
        c0 = c.charAt(0);
        n++;
      }
      e = getBase10Exponent(x);
      if (c0 > 1) {
        x = new Ctor("0." + c);
        e++;
      } else {
        x = new Ctor(c0 + "." + c.slice(1));
      }
    } else {
      t = getLn10(Ctor, wpr + 2, pr).times(e + "");
      x = ln(new Ctor(c0 + "." + c.slice(1)), wpr - guard).plus(t);
      Ctor.precision = pr;
      return sd == null ? (external = true, round(x, pr)) : x;
    }
    sum = numerator = x = divide(x.minus(ONE), x.plus(ONE), wpr);
    x2 = round(x.times(x), wpr);
    denominator = 3;
    for (;;) {
      numerator = round(numerator.times(x2), wpr);
      t = sum.plus(divide(numerator, new Ctor(denominator), wpr));
      if (digitsToString(t.d).slice(0, wpr) === digitsToString(sum.d).slice(0, wpr)) {
        sum = sum.times(2);
        if (e !== 0) sum = sum.plus(getLn10(Ctor, wpr + 2, pr).times(e + ""));
        sum = divide(sum, new Ctor(n), wpr);
        Ctor.precision = pr;
        return sd == null ? (external = true, round(sum, pr)) : sum;
      }
      sum = t;
      denominator += 2;
    }
  }
  function parseDecimal(x, str) {
    var e, i, len;
    if ((e = str.indexOf(".")) > -1) str = str.replace(".", "");
    if ((i = str.search(/e/i)) > 0) {
      if (e < 0) e = i;
      e += +str.slice(i + 1);
      str = str.substring(0, i);
    } else if (e < 0) {
      e = str.length;
    }
    for (i = 0; str.charCodeAt(i) === 48; ) ++i;
    for (len = str.length; str.charCodeAt(len - 1) === 48; ) --len;
    str = str.slice(i, len);
    if (str) {
      len -= i;
      e = e - i - 1;
      x.e = mathfloor(e / LOG_BASE);
      x.d = [];
      i = (e + 1) % LOG_BASE;
      if (e < 0) i += LOG_BASE;
      if (i < len) {
        if (i) x.d.push(+str.slice(0, i));
        for (len -= LOG_BASE; i < len; ) x.d.push(+str.slice(i, i += LOG_BASE));
        str = str.slice(i);
        i = LOG_BASE - str.length;
      } else {
        i -= len;
      }
      for (;i--; ) str += "0";
      x.d.push(+str);
      if (external && (x.e > MAX_E || x.e < -MAX_E)) throw Error(exponentOutOfRange + e);
    } else {
      x.s = 0;
      x.e = 0;
      x.d = [ 0 ];
    }
    return x;
  }
  function round(x, sd, rm) {
    var i, j, k, n, rd, doRound, w, xdi, xd = x.d;
    for (n = 1, k = xd[0]; k >= 10; k /= 10) n++;
    i = sd - n;
    if (i < 0) {
      i += LOG_BASE;
      j = sd;
      w = xd[xdi = 0];
    } else {
      xdi = Math.ceil((i + 1) / LOG_BASE);
      k = xd.length;
      if (xdi >= k) return x;
      w = k = xd[xdi];
      for (n = 1; k >= 10; k /= 10) n++;
      i %= LOG_BASE;
      j = i - LOG_BASE + n;
    }
    if (rm !== void 0) {
      k = mathpow(10, n - j - 1);
      rd = w / k % 10 | 0;
      doRound = sd < 0 || xd[xdi + 1] !== void 0 || w % k;
      doRound = rm < 4 ? (rd || doRound) && (rm == 0 || rm == (x.s < 0 ? 3 : 2)) : rd > 5 || rd == 5 && (rm == 4 || doRound || rm == 6 && // Check whether the digit to the left of the rounding digit is odd.
      (i > 0 ? j > 0 ? w / mathpow(10, n - j) : 0 : xd[xdi - 1]) % 10 & 1 || rm == (x.s < 0 ? 8 : 7));
    }
    if (sd < 1 || !xd[0]) {
      if (doRound) {
        k = getBase10Exponent(x);
        xd.length = 1;
        sd = sd - k - 1;
        xd[0] = mathpow(10, (LOG_BASE - sd % LOG_BASE) % LOG_BASE);
        x.e = mathfloor(-sd / LOG_BASE) || 0;
      } else {
        xd.length = 1;
        xd[0] = x.e = x.s = 0;
      }
      return x;
    }
    if (i == 0) {
      xd.length = xdi;
      k = 1;
      xdi--;
    } else {
      xd.length = xdi + 1;
      k = mathpow(10, LOG_BASE - i);
      xd[xdi] = j > 0 ? (w / mathpow(10, n - j) % mathpow(10, j) | 0) * k : 0;
    }
    if (doRound) {
      for (;;) {
        if (xdi == 0) {
          if ((xd[0] += k) == BASE) {
            xd[0] = 1;
            ++x.e;
          }
          break;
        } else {
          xd[xdi] += k;
          if (xd[xdi] != BASE) break;
          xd[xdi--] = 0;
          k = 1;
        }
      }
    }
    for (i = xd.length; xd[--i] === 0; ) xd.pop();
    if (external && (x.e > MAX_E || x.e < -MAX_E)) {
      throw Error(exponentOutOfRange + getBase10Exponent(x));
    }
    return x;
  }
  function subtract(x, y) {
    var d, e, i, j, k, len, xd, xe, xLTy, yd, Ctor = x.constructor, pr = Ctor.precision;
    if (!x.s || !y.s) {
      if (y.s) y.s = -y.s; else y = new Ctor(x);
      return external ? round(y, pr) : y;
    }
    xd = x.d;
    yd = y.d;
    e = y.e;
    xe = x.e;
    xd = xd.slice();
    k = xe - e;
    if (k) {
      xLTy = k < 0;
      if (xLTy) {
        d = xd;
        k = -k;
        len = yd.length;
      } else {
        d = yd;
        e = xe;
        len = xd.length;
      }
      i = Math.max(Math.ceil(pr / LOG_BASE), len) + 2;
      if (k > i) {
        k = i;
        d.length = 1;
      }
      d.reverse();
      for (i = k; i--; ) d.push(0);
      d.reverse();
    } else {
      i = xd.length;
      len = yd.length;
      xLTy = i < len;
      if (xLTy) len = i;
      for (i = 0; i < len; i++) {
        if (xd[i] != yd[i]) {
          xLTy = xd[i] < yd[i];
          break;
        }
      }
      k = 0;
    }
    if (xLTy) {
      d = xd;
      xd = yd;
      yd = d;
      y.s = -y.s;
    }
    len = xd.length;
    for (i = yd.length - len; i > 0; --i) xd[len++] = 0;
    for (i = yd.length; i > k; ) {
      if (xd[--i] < yd[i]) {
        for (j = i; j && xd[--j] === 0; ) xd[j] = BASE - 1;
        --xd[j];
        xd[i] += BASE;
      }
      xd[i] -= yd[i];
    }
    for (;xd[--len] === 0; ) xd.pop();
    for (;xd[0] === 0; xd.shift()) --e;
    if (!xd[0]) return new Ctor(0);
    y.d = xd;
    y.e = e;
    return external ? round(y, pr) : y;
  }
  function toString(x, isExp, sd) {
    var k, e = getBase10Exponent(x), str = digitsToString(x.d), len = str.length;
    if (isExp) {
      if (sd && (k = sd - len) > 0) {
        str = str.charAt(0) + "." + str.slice(1) + getZeroString(k);
      } else if (len > 1) {
        str = str.charAt(0) + "." + str.slice(1);
      }
      str = str + (e < 0 ? "e" : "e+") + e;
    } else if (e < 0) {
      str = "0." + getZeroString(-e - 1) + str;
      if (sd && (k = sd - len) > 0) str += getZeroString(k);
    } else if (e >= len) {
      str += getZeroString(e + 1 - len);
      if (sd && (k = sd - e - 1) > 0) str = str + "." + getZeroString(k);
    } else {
      if ((k = e + 1) < len) str = str.slice(0, k) + "." + str.slice(k);
      if (sd && (k = sd - len) > 0) {
        if (e + 1 === len) str += ".";
        str += getZeroString(k);
      }
    }
    return x.s < 0 ? "-" + str : str;
  }
  function truncate(arr, len) {
    if (arr.length > len) {
      arr.length = len;
      return true;
    }
  }
  function clone(obj) {
    var i, p, ps;
    function Decimal2(value) {
      var x = this;
      if (!(x instanceof Decimal2)) return new Decimal2(value);
      x.constructor = Decimal2;
      if (value instanceof Decimal2) {
        x.s = value.s;
        x.e = value.e;
        x.d = (value = value.d) ? value.slice() : value;
        return;
      }
      if (typeof value === "number") {
        if (value * 0 !== 0) {
          throw Error(invalidArgument + value);
        }
        if (value > 0) {
          x.s = 1;
        } else if (value < 0) {
          value = -value;
          x.s = -1;
        } else {
          x.s = 0;
          x.e = 0;
          x.d = [ 0 ];
          return;
        }
        if (value === ~~value && value < 1e7) {
          x.e = 0;
          x.d = [ value ];
          return;
        }
        return parseDecimal(x, value.toString());
      } else if (typeof value !== "string") {
        throw Error(invalidArgument + value);
      }
      if (value.charCodeAt(0) === 45) {
        value = value.slice(1);
        x.s = -1;
      } else {
        x.s = 1;
      }
      if (isDecimal.test(value)) parseDecimal(x, value); else throw Error(invalidArgument + value);
    }
    Decimal2.prototype = P;
    Decimal2.ROUND_UP = 0;
    Decimal2.ROUND_DOWN = 1;
    Decimal2.ROUND_CEIL = 2;
    Decimal2.ROUND_FLOOR = 3;
    Decimal2.ROUND_HALF_UP = 4;
    Decimal2.ROUND_HALF_DOWN = 5;
    Decimal2.ROUND_HALF_EVEN = 6;
    Decimal2.ROUND_HALF_CEIL = 7;
    Decimal2.ROUND_HALF_FLOOR = 8;
    Decimal2.clone = clone;
    Decimal2.config = Decimal2.set = config;
    if (obj === void 0) obj = {};
    if (obj) {
      ps = [ "precision", "rounding", "toExpNeg", "toExpPos", "LN10" ];
      for (i = 0; i < ps.length; ) if (!obj.hasOwnProperty(p = ps[i++])) obj[p] = this[p];
    }
    Decimal2.config(obj);
    return Decimal2;
  }
  function config(obj) {
    if (!obj || typeof obj !== "object") {
      throw Error(decimalError + "Object expected");
    }
    var i, p, v, ps = [ "precision", 1, MAX_DIGITS, "rounding", 0, 8, "toExpNeg", -1 / 0, 0, "toExpPos", 0, 1 / 0 ];
    for (i = 0; i < ps.length; i += 3) {
      if ((v = obj[p = ps[i]]) !== void 0) {
        if (mathfloor(v) === v && v >= ps[i + 1] && v <= ps[i + 2]) this[p] = v; else throw Error(invalidArgument + p + ": " + v);
      }
    }
    if ((v = obj[p = "LN10"]) !== void 0) {
      if (v == Math.LN10) this[p] = new this(v); else throw Error(invalidArgument + p + ": " + v);
    }
    return this;
  }
  var Decimal = clone(defaults);
  ONE = new Decimal(1);
  // node_modules/@discord/embedded-app-sdk/output/utils/PriceConstants.mjs
  var CurrencyCodes;
  (function(CurrencyCodes2) {
    CurrencyCodes2["AED"] = "aed";
    CurrencyCodes2["AFN"] = "afn";
    CurrencyCodes2["ALL"] = "all";
    CurrencyCodes2["AMD"] = "amd";
    CurrencyCodes2["ANG"] = "ang";
    CurrencyCodes2["AOA"] = "aoa";
    CurrencyCodes2["ARS"] = "ars";
    CurrencyCodes2["AUD"] = "aud";
    CurrencyCodes2["AWG"] = "awg";
    CurrencyCodes2["AZN"] = "azn";
    CurrencyCodes2["BAM"] = "bam";
    CurrencyCodes2["BBD"] = "bbd";
    CurrencyCodes2["BDT"] = "bdt";
    CurrencyCodes2["BGN"] = "bgn";
    CurrencyCodes2["BHD"] = "bhd";
    CurrencyCodes2["BIF"] = "bif";
    CurrencyCodes2["BMD"] = "bmd";
    CurrencyCodes2["BND"] = "bnd";
    CurrencyCodes2["BOB"] = "bob";
    CurrencyCodes2["BOV"] = "bov";
    CurrencyCodes2["BRL"] = "brl";
    CurrencyCodes2["BSD"] = "bsd";
    CurrencyCodes2["BTN"] = "btn";
    CurrencyCodes2["BWP"] = "bwp";
    CurrencyCodes2["BYN"] = "byn";
    CurrencyCodes2["BYR"] = "byr";
    CurrencyCodes2["BZD"] = "bzd";
    CurrencyCodes2["CAD"] = "cad";
    CurrencyCodes2["CDF"] = "cdf";
    CurrencyCodes2["CHE"] = "che";
    CurrencyCodes2["CHF"] = "chf";
    CurrencyCodes2["CHW"] = "chw";
    CurrencyCodes2["CLF"] = "clf";
    CurrencyCodes2["CLP"] = "clp";
    CurrencyCodes2["CNY"] = "cny";
    CurrencyCodes2["COP"] = "cop";
    CurrencyCodes2["COU"] = "cou";
    CurrencyCodes2["CRC"] = "crc";
    CurrencyCodes2["CUC"] = "cuc";
    CurrencyCodes2["CUP"] = "cup";
    CurrencyCodes2["CVE"] = "cve";
    CurrencyCodes2["CZK"] = "czk";
    CurrencyCodes2["DJF"] = "djf";
    CurrencyCodes2["DKK"] = "dkk";
    CurrencyCodes2["DOP"] = "dop";
    CurrencyCodes2["DZD"] = "dzd";
    CurrencyCodes2["EGP"] = "egp";
    CurrencyCodes2["ERN"] = "ern";
    CurrencyCodes2["ETB"] = "etb";
    CurrencyCodes2["EUR"] = "eur";
    CurrencyCodes2["FJD"] = "fjd";
    CurrencyCodes2["FKP"] = "fkp";
    CurrencyCodes2["GBP"] = "gbp";
    CurrencyCodes2["GEL"] = "gel";
    CurrencyCodes2["GHS"] = "ghs";
    CurrencyCodes2["GIP"] = "gip";
    CurrencyCodes2["GMD"] = "gmd";
    CurrencyCodes2["GNF"] = "gnf";
    CurrencyCodes2["GTQ"] = "gtq";
    CurrencyCodes2["GYD"] = "gyd";
    CurrencyCodes2["HKD"] = "hkd";
    CurrencyCodes2["HNL"] = "hnl";
    CurrencyCodes2["HRK"] = "hrk";
    CurrencyCodes2["HTG"] = "htg";
    CurrencyCodes2["HUF"] = "huf";
    CurrencyCodes2["IDR"] = "idr";
    CurrencyCodes2["ILS"] = "ils";
    CurrencyCodes2["INR"] = "inr";
    CurrencyCodes2["IQD"] = "iqd";
    CurrencyCodes2["IRR"] = "irr";
    CurrencyCodes2["ISK"] = "isk";
    CurrencyCodes2["JMD"] = "jmd";
    CurrencyCodes2["JOD"] = "jod";
    CurrencyCodes2["JPY"] = "jpy";
    CurrencyCodes2["KES"] = "kes";
    CurrencyCodes2["KGS"] = "kgs";
    CurrencyCodes2["KHR"] = "khr";
    CurrencyCodes2["KMF"] = "kmf";
    CurrencyCodes2["KPW"] = "kpw";
    CurrencyCodes2["KRW"] = "krw";
    CurrencyCodes2["KWD"] = "kwd";
    CurrencyCodes2["KYD"] = "kyd";
    CurrencyCodes2["KZT"] = "kzt";
    CurrencyCodes2["LAK"] = "lak";
    CurrencyCodes2["LBP"] = "lbp";
    CurrencyCodes2["LKR"] = "lkr";
    CurrencyCodes2["LRD"] = "lrd";
    CurrencyCodes2["LSL"] = "lsl";
    CurrencyCodes2["LTL"] = "ltl";
    CurrencyCodes2["LVL"] = "lvl";
    CurrencyCodes2["LYD"] = "lyd";
    CurrencyCodes2["MAD"] = "mad";
    CurrencyCodes2["MDL"] = "mdl";
    CurrencyCodes2["MGA"] = "mga";
    CurrencyCodes2["MKD"] = "mkd";
    CurrencyCodes2["MMK"] = "mmk";
    CurrencyCodes2["MNT"] = "mnt";
    CurrencyCodes2["MOP"] = "mop";
    CurrencyCodes2["MRO"] = "mro";
    CurrencyCodes2["MUR"] = "mur";
    CurrencyCodes2["MVR"] = "mvr";
    CurrencyCodes2["MWK"] = "mwk";
    CurrencyCodes2["MXN"] = "mxn";
    CurrencyCodes2["MXV"] = "mxv";
    CurrencyCodes2["MYR"] = "myr";
    CurrencyCodes2["MZN"] = "mzn";
    CurrencyCodes2["NAD"] = "nad";
    CurrencyCodes2["NGN"] = "ngn";
    CurrencyCodes2["NIO"] = "nio";
    CurrencyCodes2["NOK"] = "nok";
    CurrencyCodes2["NPR"] = "npr";
    CurrencyCodes2["NZD"] = "nzd";
    CurrencyCodes2["OMR"] = "omr";
    CurrencyCodes2["PAB"] = "pab";
    CurrencyCodes2["PEN"] = "pen";
    CurrencyCodes2["PGK"] = "pgk";
    CurrencyCodes2["PHP"] = "php";
    CurrencyCodes2["PKR"] = "pkr";
    CurrencyCodes2["PLN"] = "pln";
    CurrencyCodes2["PYG"] = "pyg";
    CurrencyCodes2["QAR"] = "qar";
    CurrencyCodes2["RON"] = "ron";
    CurrencyCodes2["RSD"] = "rsd";
    CurrencyCodes2["RUB"] = "rub";
    CurrencyCodes2["RWF"] = "rwf";
    CurrencyCodes2["SAR"] = "sar";
    CurrencyCodes2["SBD"] = "sbd";
    CurrencyCodes2["SCR"] = "scr";
    CurrencyCodes2["SDG"] = "sdg";
    CurrencyCodes2["SEK"] = "sek";
    CurrencyCodes2["SGD"] = "sgd";
    CurrencyCodes2["SHP"] = "shp";
    CurrencyCodes2["SLL"] = "sll";
    CurrencyCodes2["SOS"] = "sos";
    CurrencyCodes2["SRD"] = "srd";
    CurrencyCodes2["SSP"] = "ssp";
    CurrencyCodes2["STD"] = "std";
    CurrencyCodes2["SVC"] = "svc";
    CurrencyCodes2["SYP"] = "syp";
    CurrencyCodes2["SZL"] = "szl";
    CurrencyCodes2["THB"] = "thb";
    CurrencyCodes2["TJS"] = "tjs";
    CurrencyCodes2["TMT"] = "tmt";
    CurrencyCodes2["TND"] = "tnd";
    CurrencyCodes2["TOP"] = "top";
    CurrencyCodes2["TRY"] = "try";
    CurrencyCodes2["TTD"] = "ttd";
    CurrencyCodes2["TWD"] = "twd";
    CurrencyCodes2["TZS"] = "tzs";
    CurrencyCodes2["UAH"] = "uah";
    CurrencyCodes2["UGX"] = "ugx";
    CurrencyCodes2["USD"] = "usd";
    CurrencyCodes2["USN"] = "usn";
    CurrencyCodes2["USS"] = "uss";
    CurrencyCodes2["UYI"] = "uyi";
    CurrencyCodes2["UYU"] = "uyu";
    CurrencyCodes2["UZS"] = "uzs";
    CurrencyCodes2["VEF"] = "vef";
    CurrencyCodes2["VND"] = "vnd";
    CurrencyCodes2["VUV"] = "vuv";
    CurrencyCodes2["WST"] = "wst";
    CurrencyCodes2["XAF"] = "xaf";
    CurrencyCodes2["XAG"] = "xag";
    CurrencyCodes2["XAU"] = "xau";
    CurrencyCodes2["XBA"] = "xba";
    CurrencyCodes2["XBB"] = "xbb";
    CurrencyCodes2["XBC"] = "xbc";
    CurrencyCodes2["XBD"] = "xbd";
    CurrencyCodes2["XCD"] = "xcd";
    CurrencyCodes2["XDR"] = "xdr";
    CurrencyCodes2["XFU"] = "xfu";
    CurrencyCodes2["XOF"] = "xof";
    CurrencyCodes2["XPD"] = "xpd";
    CurrencyCodes2["XPF"] = "xpf";
    CurrencyCodes2["XPT"] = "xpt";
    CurrencyCodes2["XSU"] = "xsu";
    CurrencyCodes2["XTS"] = "xts";
    CurrencyCodes2["XUA"] = "xua";
    CurrencyCodes2["YER"] = "yer";
    CurrencyCodes2["ZAR"] = "zar";
    CurrencyCodes2["ZMW"] = "zmw";
    CurrencyCodes2["ZWL"] = "zwl";
  })(CurrencyCodes || (CurrencyCodes = {}));
  var CurrencyExponents = {
    [CurrencyCodes.AED]: 2,
    [CurrencyCodes.AFN]: 2,
    [CurrencyCodes.ALL]: 2,
    [CurrencyCodes.AMD]: 2,
    [CurrencyCodes.ANG]: 2,
    [CurrencyCodes.AOA]: 2,
    [CurrencyCodes.ARS]: 2,
    [CurrencyCodes.AUD]: 2,
    [CurrencyCodes.AWG]: 2,
    [CurrencyCodes.AZN]: 2,
    [CurrencyCodes.BAM]: 2,
    [CurrencyCodes.BBD]: 2,
    [CurrencyCodes.BDT]: 2,
    [CurrencyCodes.BGN]: 2,
    [CurrencyCodes.BHD]: 3,
    [CurrencyCodes.BIF]: 0,
    [CurrencyCodes.BMD]: 2,
    [CurrencyCodes.BND]: 2,
    [CurrencyCodes.BOB]: 2,
    [CurrencyCodes.BOV]: 2,
    [CurrencyCodes.BRL]: 2,
    [CurrencyCodes.BSD]: 2,
    [CurrencyCodes.BTN]: 2,
    [CurrencyCodes.BWP]: 2,
    [CurrencyCodes.BYR]: 0,
    [CurrencyCodes.BYN]: 2,
    [CurrencyCodes.BZD]: 2,
    [CurrencyCodes.CAD]: 2,
    [CurrencyCodes.CDF]: 2,
    [CurrencyCodes.CHE]: 2,
    [CurrencyCodes.CHF]: 2,
    [CurrencyCodes.CHW]: 2,
    [CurrencyCodes.CLF]: 0,
    [CurrencyCodes.CLP]: 0,
    [CurrencyCodes.CNY]: 2,
    [CurrencyCodes.COP]: 2,
    [CurrencyCodes.COU]: 2,
    [CurrencyCodes.CRC]: 2,
    [CurrencyCodes.CUC]: 2,
    [CurrencyCodes.CUP]: 2,
    [CurrencyCodes.CVE]: 2,
    [CurrencyCodes.CZK]: 2,
    [CurrencyCodes.DJF]: 0,
    [CurrencyCodes.DKK]: 2,
    [CurrencyCodes.DOP]: 2,
    [CurrencyCodes.DZD]: 2,
    [CurrencyCodes.EGP]: 2,
    [CurrencyCodes.ERN]: 2,
    [CurrencyCodes.ETB]: 2,
    [CurrencyCodes.EUR]: 2,
    [CurrencyCodes.FJD]: 2,
    [CurrencyCodes.FKP]: 2,
    [CurrencyCodes.GBP]: 2,
    [CurrencyCodes.GEL]: 2,
    [CurrencyCodes.GHS]: 2,
    [CurrencyCodes.GIP]: 2,
    [CurrencyCodes.GMD]: 2,
    [CurrencyCodes.GNF]: 0,
    [CurrencyCodes.GTQ]: 2,
    [CurrencyCodes.GYD]: 2,
    [CurrencyCodes.HKD]: 2,
    [CurrencyCodes.HNL]: 2,
    [CurrencyCodes.HRK]: 2,
    [CurrencyCodes.HTG]: 2,
    [CurrencyCodes.HUF]: 2,
    [CurrencyCodes.IDR]: 2,
    [CurrencyCodes.ILS]: 2,
    [CurrencyCodes.INR]: 2,
    [CurrencyCodes.IQD]: 3,
    [CurrencyCodes.IRR]: 2,
    [CurrencyCodes.ISK]: 0,
    [CurrencyCodes.JMD]: 2,
    [CurrencyCodes.JOD]: 3,
    [CurrencyCodes.JPY]: 0,
    [CurrencyCodes.KES]: 2,
    [CurrencyCodes.KGS]: 2,
    [CurrencyCodes.KHR]: 2,
    [CurrencyCodes.KMF]: 0,
    [CurrencyCodes.KPW]: 2,
    [CurrencyCodes.KRW]: 0,
    [CurrencyCodes.KWD]: 3,
    [CurrencyCodes.KYD]: 2,
    [CurrencyCodes.KZT]: 2,
    [CurrencyCodes.LAK]: 2,
    [CurrencyCodes.LBP]: 2,
    [CurrencyCodes.LKR]: 2,
    [CurrencyCodes.LRD]: 2,
    [CurrencyCodes.LSL]: 2,
    [CurrencyCodes.LTL]: 2,
    [CurrencyCodes.LVL]: 2,
    [CurrencyCodes.LYD]: 3,
    [CurrencyCodes.MAD]: 2,
    [CurrencyCodes.MDL]: 2,
    [CurrencyCodes.MGA]: 2,
    [CurrencyCodes.MKD]: 2,
    [CurrencyCodes.MMK]: 2,
    [CurrencyCodes.MNT]: 2,
    [CurrencyCodes.MOP]: 2,
    [CurrencyCodes.MRO]: 2,
    [CurrencyCodes.MUR]: 2,
    [CurrencyCodes.MVR]: 2,
    [CurrencyCodes.MWK]: 2,
    [CurrencyCodes.MXN]: 2,
    [CurrencyCodes.MXV]: 2,
    [CurrencyCodes.MYR]: 2,
    [CurrencyCodes.MZN]: 2,
    [CurrencyCodes.NAD]: 2,
    [CurrencyCodes.NGN]: 2,
    [CurrencyCodes.NIO]: 2,
    [CurrencyCodes.NOK]: 2,
    [CurrencyCodes.NPR]: 2,
    [CurrencyCodes.NZD]: 2,
    [CurrencyCodes.OMR]: 3,
    [CurrencyCodes.PAB]: 2,
    [CurrencyCodes.PEN]: 2,
    [CurrencyCodes.PGK]: 2,
    [CurrencyCodes.PHP]: 2,
    [CurrencyCodes.PKR]: 2,
    [CurrencyCodes.PLN]: 2,
    [CurrencyCodes.PYG]: 0,
    [CurrencyCodes.QAR]: 2,
    [CurrencyCodes.RON]: 2,
    [CurrencyCodes.RSD]: 2,
    [CurrencyCodes.RUB]: 2,
    [CurrencyCodes.RWF]: 0,
    [CurrencyCodes.SAR]: 2,
    [CurrencyCodes.SBD]: 2,
    [CurrencyCodes.SCR]: 2,
    [CurrencyCodes.SDG]: 2,
    [CurrencyCodes.SEK]: 2,
    [CurrencyCodes.SGD]: 2,
    [CurrencyCodes.SHP]: 2,
    [CurrencyCodes.SLL]: 2,
    [CurrencyCodes.SOS]: 2,
    [CurrencyCodes.SRD]: 2,
    [CurrencyCodes.SSP]: 2,
    [CurrencyCodes.STD]: 2,
    [CurrencyCodes.SVC]: 2,
    [CurrencyCodes.SYP]: 2,
    [CurrencyCodes.SZL]: 2,
    [CurrencyCodes.THB]: 2,
    [CurrencyCodes.TJS]: 2,
    [CurrencyCodes.TMT]: 2,
    [CurrencyCodes.TND]: 3,
    [CurrencyCodes.TOP]: 2,
    [CurrencyCodes.TRY]: 2,
    [CurrencyCodes.TTD]: 2,
    [CurrencyCodes.TWD]: 2,
    [CurrencyCodes.TZS]: 2,
    [CurrencyCodes.UAH]: 2,
    [CurrencyCodes.UGX]: 0,
    [CurrencyCodes.USD]: 2,
    [CurrencyCodes.USN]: 2,
    [CurrencyCodes.USS]: 2,
    [CurrencyCodes.UYI]: 0,
    [CurrencyCodes.UYU]: 2,
    [CurrencyCodes.UZS]: 2,
    [CurrencyCodes.VEF]: 2,
    [CurrencyCodes.VND]: 0,
    [CurrencyCodes.VUV]: 0,
    [CurrencyCodes.WST]: 2,
    [CurrencyCodes.XAF]: 0,
    [CurrencyCodes.XAG]: 0,
    [CurrencyCodes.XAU]: 0,
    [CurrencyCodes.XBA]: 0,
    [CurrencyCodes.XBB]: 0,
    [CurrencyCodes.XBC]: 0,
    [CurrencyCodes.XBD]: 0,
    [CurrencyCodes.XCD]: 2,
    [CurrencyCodes.XDR]: 0,
    [CurrencyCodes.XFU]: 0,
    [CurrencyCodes.XOF]: 0,
    [CurrencyCodes.XPD]: 0,
    [CurrencyCodes.XPF]: 0,
    [CurrencyCodes.XPT]: 0,
    [CurrencyCodes.XSU]: 0,
    [CurrencyCodes.XTS]: 0,
    [CurrencyCodes.XUA]: 0,
    [CurrencyCodes.YER]: 2,
    [CurrencyCodes.ZAR]: 2,
    [CurrencyCodes.ZMW]: 2,
    [CurrencyCodes.ZWL]: 2
  };
  // node_modules/@discord/embedded-app-sdk/output/_virtual/index3.mjs
  var lodash_transform = {
    exports: {}
  };
  // node_modules/@discord/embedded-app-sdk/output/lib/lodash.transform/index.mjs
  lodash_transform.exports;
  var hasRequiredLodash_transform;
  function requireLodash_transform() {
    if (hasRequiredLodash_transform) return lodash_transform.exports;
    hasRequiredLodash_transform = 1;
    (function(module, exports) {
      var LARGE_ARRAY_SIZE = 200;
      var FUNC_ERROR_TEXT = "Expected a function";
      var HASH_UNDEFINED = "__lodash_hash_undefined__";
      var UNORDERED_COMPARE_FLAG = 1, PARTIAL_COMPARE_FLAG = 2;
      var INFINITY = 1 / 0, MAX_SAFE_INTEGER2 = 9007199254740991;
      var argsTag = "[object Arguments]", arrayTag = "[object Array]", boolTag = "[object Boolean]", dateTag = "[object Date]", errorTag = "[object Error]", funcTag = "[object Function]", genTag = "[object GeneratorFunction]", mapTag = "[object Map]", numberTag = "[object Number]", objectTag = "[object Object]", promiseTag = "[object Promise]", regexpTag = "[object RegExp]", setTag = "[object Set]", stringTag = "[object String]", symbolTag = "[object Symbol]", weakMapTag = "[object WeakMap]";
      var arrayBufferTag = "[object ArrayBuffer]", dataViewTag = "[object DataView]", float32Tag = "[object Float32Array]", float64Tag = "[object Float64Array]", int8Tag = "[object Int8Array]", int16Tag = "[object Int16Array]", int32Tag = "[object Int32Array]", uint8Tag = "[object Uint8Array]", uint8ClampedTag = "[object Uint8ClampedArray]", uint16Tag = "[object Uint16Array]", uint32Tag = "[object Uint32Array]";
      var reIsDeepProp = /\.|\[(?:[^[\]]*|(["'])(?:(?!\1)[^\\]|\\.)*?\1)\]/, reIsPlainProp = /^\w*$/, reLeadingDot = /^\./, rePropName = /[^.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|$))/g;
      var reRegExpChar = /[\\^$.*+?()[\]{}|]/g;
      var reEscapeChar = /\\(\\)?/g;
      var reIsHostCtor = /^\[object .+?Constructor\]$/;
      var reIsUint = /^(?:0|[1-9]\d*)$/;
      var typedArrayTags = {};
      typedArrayTags[float32Tag] = typedArrayTags[float64Tag] = typedArrayTags[int8Tag] = typedArrayTags[int16Tag] = typedArrayTags[int32Tag] = typedArrayTags[uint8Tag] = typedArrayTags[uint8ClampedTag] = typedArrayTags[uint16Tag] = typedArrayTags[uint32Tag] = true;
      typedArrayTags[argsTag] = typedArrayTags[arrayTag] = typedArrayTags[arrayBufferTag] = typedArrayTags[boolTag] = typedArrayTags[dataViewTag] = typedArrayTags[dateTag] = typedArrayTags[errorTag] = typedArrayTags[funcTag] = typedArrayTags[mapTag] = typedArrayTags[numberTag] = typedArrayTags[objectTag] = typedArrayTags[regexpTag] = typedArrayTags[setTag] = typedArrayTags[stringTag] = typedArrayTags[weakMapTag] = false;
      var freeGlobal = typeof commonjsGlobal == "object" && commonjsGlobal && commonjsGlobal.Object === Object && commonjsGlobal;
      var freeSelf = typeof self == "object" && self && self.Object === Object && self;
      var root = freeGlobal || freeSelf || Function("return this")();
      var freeExports = exports && !exports.nodeType && exports;
      var freeModule = freeExports && true && module && !module.nodeType && module;
      var moduleExports = freeModule && freeModule.exports === freeExports;
      var freeProcess = moduleExports && freeGlobal.process;
      var nodeUtil = (function() {
        try {
          return freeProcess && freeProcess.binding("util");
        } catch (e) {}
      })();
      var nodeIsTypedArray = nodeUtil && nodeUtil.isTypedArray;
      function arrayEach(array, iteratee) {
        var index = -1, length = array ? array.length : 0;
        while (++index < length) {
          if (iteratee(array[index], index, array) === false) {
            break;
          }
        }
        return array;
      }
      function arraySome(array, predicate) {
        var index = -1, length = array ? array.length : 0;
        while (++index < length) {
          if (predicate(array[index], index, array)) {
            return true;
          }
        }
        return false;
      }
      function baseProperty(key) {
        return function(object) {
          return object == null ? void 0 : object[key];
        };
      }
      function baseTimes(n, iteratee) {
        var index = -1, result = Array(n);
        while (++index < n) {
          result[index] = iteratee(index);
        }
        return result;
      }
      function baseUnary(func) {
        return function(value) {
          return func(value);
        };
      }
      function getValue(object, key) {
        return object == null ? void 0 : object[key];
      }
      function isHostObject(value) {
        var result = false;
        if (value != null && typeof value.toString != "function") {
          try {
            result = !!(value + "");
          } catch (e) {}
        }
        return result;
      }
      function mapToArray(map) {
        var index = -1, result = Array(map.size);
        map.forEach(function(value, key) {
          result[++index] = [ key, value ];
        });
        return result;
      }
      function overArg(func, transform3) {
        return function(arg) {
          return func(transform3(arg));
        };
      }
      function setToArray(set) {
        var index = -1, result = Array(set.size);
        set.forEach(function(value) {
          result[++index] = value;
        });
        return result;
      }
      var arrayProto = Array.prototype, funcProto = Function.prototype, objectProto = Object.prototype;
      var coreJsData = root["__core-js_shared__"];
      var maskSrcKey = (function() {
        var uid = /[^.]+$/.exec(coreJsData && coreJsData.keys && coreJsData.keys.IE_PROTO || "");
        return uid ? "Symbol(src)_1." + uid : "";
      })();
      var funcToString = funcProto.toString;
      var hasOwnProperty = objectProto.hasOwnProperty;
      var objectToString = objectProto.toString;
      var reIsNative = RegExp("^" + funcToString.call(hasOwnProperty).replace(reRegExpChar, "\\$&").replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, "$1.*?") + "$");
      var Symbol2 = root.Symbol, Uint8Array2 = root.Uint8Array, getPrototype = overArg(Object.getPrototypeOf, Object), objectCreate = Object.create, propertyIsEnumerable = objectProto.propertyIsEnumerable, splice = arrayProto.splice;
      var nativeKeys = overArg(Object.keys, Object);
      var DataView = getNative(root, "DataView"), Map2 = getNative(root, "Map"), Promise2 = getNative(root, "Promise"), Set2 = getNative(root, "Set"), WeakMap2 = getNative(root, "WeakMap"), nativeCreate = getNative(Object, "create");
      var dataViewCtorString = toSource(DataView), mapCtorString = toSource(Map2), promiseCtorString = toSource(Promise2), setCtorString = toSource(Set2), weakMapCtorString = toSource(WeakMap2);
      var symbolProto = Symbol2 ? Symbol2.prototype : void 0, symbolValueOf = symbolProto ? symbolProto.valueOf : void 0, symbolToString = symbolProto ? symbolProto.toString : void 0;
      function Hash(entries) {
        var index = -1, length = entries ? entries.length : 0;
        this.clear();
        while (++index < length) {
          var entry = entries[index];
          this.set(entry[0], entry[1]);
        }
      }
      function hashClear() {
        this.__data__ = nativeCreate ? nativeCreate(null) : {};
      }
      function hashDelete(key) {
        return this.has(key) && delete this.__data__[key];
      }
      function hashGet(key) {
        var data = this.__data__;
        if (nativeCreate) {
          var result = data[key];
          return result === HASH_UNDEFINED ? void 0 : result;
        }
        return hasOwnProperty.call(data, key) ? data[key] : void 0;
      }
      function hashHas(key) {
        var data = this.__data__;
        return nativeCreate ? data[key] !== void 0 : hasOwnProperty.call(data, key);
      }
      function hashSet(key, value) {
        var data = this.__data__;
        data[key] = nativeCreate && value === void 0 ? HASH_UNDEFINED : value;
        return this;
      }
      Hash.prototype.clear = hashClear;
      Hash.prototype["delete"] = hashDelete;
      Hash.prototype.get = hashGet;
      Hash.prototype.has = hashHas;
      Hash.prototype.set = hashSet;
      function ListCache(entries) {
        var index = -1, length = entries ? entries.length : 0;
        this.clear();
        while (++index < length) {
          var entry = entries[index];
          this.set(entry[0], entry[1]);
        }
      }
      function listCacheClear() {
        this.__data__ = [];
      }
      function listCacheDelete(key) {
        var data = this.__data__, index = assocIndexOf(data, key);
        if (index < 0) {
          return false;
        }
        var lastIndex = data.length - 1;
        if (index == lastIndex) {
          data.pop();
        } else {
          splice.call(data, index, 1);
        }
        return true;
      }
      function listCacheGet(key) {
        var data = this.__data__, index = assocIndexOf(data, key);
        return index < 0 ? void 0 : data[index][1];
      }
      function listCacheHas(key) {
        return assocIndexOf(this.__data__, key) > -1;
      }
      function listCacheSet(key, value) {
        var data = this.__data__, index = assocIndexOf(data, key);
        if (index < 0) {
          data.push([ key, value ]);
        } else {
          data[index][1] = value;
        }
        return this;
      }
      ListCache.prototype.clear = listCacheClear;
      ListCache.prototype["delete"] = listCacheDelete;
      ListCache.prototype.get = listCacheGet;
      ListCache.prototype.has = listCacheHas;
      ListCache.prototype.set = listCacheSet;
      function MapCache(entries) {
        var index = -1, length = entries ? entries.length : 0;
        this.clear();
        while (++index < length) {
          var entry = entries[index];
          this.set(entry[0], entry[1]);
        }
      }
      function mapCacheClear() {
        this.__data__ = {
          "hash": new Hash,
          "map": new (Map2 || ListCache),
          "string": new Hash
        };
      }
      function mapCacheDelete(key) {
        return getMapData(this, key)["delete"](key);
      }
      function mapCacheGet(key) {
        return getMapData(this, key).get(key);
      }
      function mapCacheHas(key) {
        return getMapData(this, key).has(key);
      }
      function mapCacheSet(key, value) {
        getMapData(this, key).set(key, value);
        return this;
      }
      MapCache.prototype.clear = mapCacheClear;
      MapCache.prototype["delete"] = mapCacheDelete;
      MapCache.prototype.get = mapCacheGet;
      MapCache.prototype.has = mapCacheHas;
      MapCache.prototype.set = mapCacheSet;
      function SetCache(values) {
        var index = -1, length = values ? values.length : 0;
        this.__data__ = new MapCache;
        while (++index < length) {
          this.add(values[index]);
        }
      }
      function setCacheAdd(value) {
        this.__data__.set(value, HASH_UNDEFINED);
        return this;
      }
      function setCacheHas(value) {
        return this.__data__.has(value);
      }
      SetCache.prototype.add = SetCache.prototype.push = setCacheAdd;
      SetCache.prototype.has = setCacheHas;
      function Stack(entries) {
        this.__data__ = new ListCache(entries);
      }
      function stackClear() {
        this.__data__ = new ListCache;
      }
      function stackDelete(key) {
        return this.__data__["delete"](key);
      }
      function stackGet(key) {
        return this.__data__.get(key);
      }
      function stackHas(key) {
        return this.__data__.has(key);
      }
      function stackSet(key, value) {
        var cache = this.__data__;
        if (cache instanceof ListCache) {
          var pairs = cache.__data__;
          if (!Map2 || pairs.length < LARGE_ARRAY_SIZE - 1) {
            pairs.push([ key, value ]);
            return this;
          }
          cache = this.__data__ = new MapCache(pairs);
        }
        cache.set(key, value);
        return this;
      }
      Stack.prototype.clear = stackClear;
      Stack.prototype["delete"] = stackDelete;
      Stack.prototype.get = stackGet;
      Stack.prototype.has = stackHas;
      Stack.prototype.set = stackSet;
      function arrayLikeKeys(value, inherited) {
        var result = isArray(value) || isArguments(value) ? baseTimes(value.length, String) : [];
        var length = result.length, skipIndexes = !!length;
        for (var key in value) {
          if (hasOwnProperty.call(value, key) && !(skipIndexes && (key == "length" || isIndex(key, length)))) {
            result.push(key);
          }
        }
        return result;
      }
      function assocIndexOf(array, key) {
        var length = array.length;
        while (length--) {
          if (eq(array[length][0], key)) {
            return length;
          }
        }
        return -1;
      }
      function baseCreate(proto) {
        return isObject(proto) ? objectCreate(proto) : {};
      }
      var baseFor = createBaseFor();
      function baseForOwn(object, iteratee) {
        return object && baseFor(object, iteratee, keys);
      }
      function baseGet(object, path) {
        path = isKey(path, object) ? [ path ] : castPath(path);
        var index = 0, length = path.length;
        while (object != null && index < length) {
          object = object[toKey(path[index++])];
        }
        return index && index == length ? object : void 0;
      }
      function baseGetTag(value) {
        return objectToString.call(value);
      }
      function baseHasIn(object, key) {
        return object != null && key in Object(object);
      }
      function baseIsEqual(value, other, customizer, bitmask, stack) {
        if (value === other) {
          return true;
        }
        if (value == null || other == null || !isObject(value) && !isObjectLike(other)) {
          return value !== value && other !== other;
        }
        return baseIsEqualDeep(value, other, baseIsEqual, customizer, bitmask, stack);
      }
      function baseIsEqualDeep(object, other, equalFunc, customizer, bitmask, stack) {
        var objIsArr = isArray(object), othIsArr = isArray(other), objTag = arrayTag, othTag = arrayTag;
        if (!objIsArr) {
          objTag = getTag(object);
          objTag = objTag == argsTag ? objectTag : objTag;
        }
        if (!othIsArr) {
          othTag = getTag(other);
          othTag = othTag == argsTag ? objectTag : othTag;
        }
        var objIsObj = objTag == objectTag && !isHostObject(object), othIsObj = othTag == objectTag && !isHostObject(other), isSameTag = objTag == othTag;
        if (isSameTag && !objIsObj) {
          stack || (stack = new Stack);
          return objIsArr || isTypedArray(object) ? equalArrays(object, other, equalFunc, customizer, bitmask, stack) : equalByTag(object, other, objTag, equalFunc, customizer, bitmask, stack);
        }
        if (!(bitmask & PARTIAL_COMPARE_FLAG)) {
          var objIsWrapped = objIsObj && hasOwnProperty.call(object, "__wrapped__"), othIsWrapped = othIsObj && hasOwnProperty.call(other, "__wrapped__");
          if (objIsWrapped || othIsWrapped) {
            var objUnwrapped = objIsWrapped ? object.value() : object, othUnwrapped = othIsWrapped ? other.value() : other;
            stack || (stack = new Stack);
            return equalFunc(objUnwrapped, othUnwrapped, customizer, bitmask, stack);
          }
        }
        if (!isSameTag) {
          return false;
        }
        stack || (stack = new Stack);
        return equalObjects(object, other, equalFunc, customizer, bitmask, stack);
      }
      function baseIsMatch(object, source, matchData, customizer) {
        var index = matchData.length, length = index;
        if (object == null) {
          return !length;
        }
        object = Object(object);
        while (index--) {
          var data = matchData[index];
          if (data[2] ? data[1] !== object[data[0]] : !(data[0] in object)) {
            return false;
          }
        }
        while (++index < length) {
          data = matchData[index];
          var key = data[0], objValue = object[key], srcValue = data[1];
          if (data[2]) {
            if (objValue === void 0 && !(key in object)) {
              return false;
            }
          } else {
            var stack = new Stack;
            var result;
            if (!(result === void 0 ? baseIsEqual(srcValue, objValue, customizer, UNORDERED_COMPARE_FLAG | PARTIAL_COMPARE_FLAG, stack) : result)) {
              return false;
            }
          }
        }
        return true;
      }
      function baseIsNative(value) {
        if (!isObject(value) || isMasked(value)) {
          return false;
        }
        var pattern = isFunction(value) || isHostObject(value) ? reIsNative : reIsHostCtor;
        return pattern.test(toSource(value));
      }
      function baseIsTypedArray(value) {
        return isObjectLike(value) && isLength(value.length) && !!typedArrayTags[objectToString.call(value)];
      }
      function baseIteratee(value) {
        if (typeof value == "function") {
          return value;
        }
        if (value == null) {
          return identity;
        }
        if (typeof value == "object") {
          return isArray(value) ? baseMatchesProperty(value[0], value[1]) : baseMatches(value);
        }
        return property(value);
      }
      function baseKeys(object) {
        if (!isPrototype(object)) {
          return nativeKeys(object);
        }
        var result = [];
        for (var key in Object(object)) {
          if (hasOwnProperty.call(object, key) && key != "constructor") {
            result.push(key);
          }
        }
        return result;
      }
      function baseMatches(source) {
        var matchData = getMatchData(source);
        if (matchData.length == 1 && matchData[0][2]) {
          return matchesStrictComparable(matchData[0][0], matchData[0][1]);
        }
        return function(object) {
          return object === source || baseIsMatch(object, source, matchData);
        };
      }
      function baseMatchesProperty(path, srcValue) {
        if (isKey(path) && isStrictComparable(srcValue)) {
          return matchesStrictComparable(toKey(path), srcValue);
        }
        return function(object) {
          var objValue = get(object, path);
          return objValue === void 0 && objValue === srcValue ? hasIn(object, path) : baseIsEqual(srcValue, objValue, void 0, UNORDERED_COMPARE_FLAG | PARTIAL_COMPARE_FLAG);
        };
      }
      function basePropertyDeep(path) {
        return function(object) {
          return baseGet(object, path);
        };
      }
      function baseToString(value) {
        if (typeof value == "string") {
          return value;
        }
        if (isSymbol(value)) {
          return symbolToString ? symbolToString.call(value) : "";
        }
        var result = value + "";
        return result == "0" && 1 / value == -INFINITY ? "-0" : result;
      }
      function castPath(value) {
        return isArray(value) ? value : stringToPath(value);
      }
      function createBaseFor(fromRight) {
        return function(object, iteratee, keysFunc) {
          var index = -1, iterable = Object(object), props = keysFunc(object), length = props.length;
          while (length--) {
            var key = props[++index];
            if (iteratee(iterable[key], key, iterable) === false) {
              break;
            }
          }
          return object;
        };
      }
      function equalArrays(array, other, equalFunc, customizer, bitmask, stack) {
        var isPartial = bitmask & PARTIAL_COMPARE_FLAG, arrLength = array.length, othLength = other.length;
        if (arrLength != othLength && !(isPartial && othLength > arrLength)) {
          return false;
        }
        var stacked = stack.get(array);
        if (stacked && stack.get(other)) {
          return stacked == other;
        }
        var index = -1, result = true, seen = bitmask & UNORDERED_COMPARE_FLAG ? new SetCache : void 0;
        stack.set(array, other);
        stack.set(other, array);
        while (++index < arrLength) {
          var arrValue = array[index], othValue = other[index];
          if (customizer) {
            var compared = isPartial ? customizer(othValue, arrValue, index, other, array, stack) : customizer(arrValue, othValue, index, array, other, stack);
          }
          if (compared !== void 0) {
            if (compared) {
              continue;
            }
            result = false;
            break;
          }
          if (seen) {
            if (!arraySome(other, function(othValue2, othIndex) {
              if (!seen.has(othIndex) && (arrValue === othValue2 || equalFunc(arrValue, othValue2, customizer, bitmask, stack))) {
                return seen.add(othIndex);
              }
            })) {
              result = false;
              break;
            }
          } else if (!(arrValue === othValue || equalFunc(arrValue, othValue, customizer, bitmask, stack))) {
            result = false;
            break;
          }
        }
        stack["delete"](array);
        stack["delete"](other);
        return result;
      }
      function equalByTag(object, other, tag, equalFunc, customizer, bitmask, stack) {
        switch (tag) {
         case dataViewTag:
          if (object.byteLength != other.byteLength || object.byteOffset != other.byteOffset) {
            return false;
          }
          object = object.buffer;
          other = other.buffer;

         case arrayBufferTag:
          if (object.byteLength != other.byteLength || !equalFunc(new Uint8Array2(object), new Uint8Array2(other))) {
            return false;
          }
          return true;

         case boolTag:
         case dateTag:
         case numberTag:
          return eq(+object, +other);

         case errorTag:
          return object.name == other.name && object.message == other.message;

         case regexpTag:
         case stringTag:
          return object == other + "";

         case mapTag:
          var convert = mapToArray;

         case setTag:
          var isPartial = bitmask & PARTIAL_COMPARE_FLAG;
          convert || (convert = setToArray);
          if (object.size != other.size && !isPartial) {
            return false;
          }
          var stacked = stack.get(object);
          if (stacked) {
            return stacked == other;
          }
          bitmask |= UNORDERED_COMPARE_FLAG;
          stack.set(object, other);
          var result = equalArrays(convert(object), convert(other), equalFunc, customizer, bitmask, stack);
          stack["delete"](object);
          return result;

         case symbolTag:
          if (symbolValueOf) {
            return symbolValueOf.call(object) == symbolValueOf.call(other);
          }
        }
        return false;
      }
      function equalObjects(object, other, equalFunc, customizer, bitmask, stack) {
        var isPartial = bitmask & PARTIAL_COMPARE_FLAG, objProps = keys(object), objLength = objProps.length, othProps = keys(other), othLength = othProps.length;
        if (objLength != othLength && !isPartial) {
          return false;
        }
        var index = objLength;
        while (index--) {
          var key = objProps[index];
          if (!(isPartial ? key in other : hasOwnProperty.call(other, key))) {
            return false;
          }
        }
        var stacked = stack.get(object);
        if (stacked && stack.get(other)) {
          return stacked == other;
        }
        var result = true;
        stack.set(object, other);
        stack.set(other, object);
        var skipCtor = isPartial;
        while (++index < objLength) {
          key = objProps[index];
          var objValue = object[key], othValue = other[key];
          if (customizer) {
            var compared = isPartial ? customizer(othValue, objValue, key, other, object, stack) : customizer(objValue, othValue, key, object, other, stack);
          }
          if (!(compared === void 0 ? objValue === othValue || equalFunc(objValue, othValue, customizer, bitmask, stack) : compared)) {
            result = false;
            break;
          }
          skipCtor || (skipCtor = key == "constructor");
        }
        if (result && !skipCtor) {
          var objCtor = object.constructor, othCtor = other.constructor;
          if (objCtor != othCtor && ("constructor" in object && "constructor" in other) && !(typeof objCtor == "function" && objCtor instanceof objCtor && typeof othCtor == "function" && othCtor instanceof othCtor)) {
            result = false;
          }
        }
        stack["delete"](object);
        stack["delete"](other);
        return result;
      }
      function getMapData(map, key) {
        var data = map.__data__;
        return isKeyable(key) ? data[typeof key == "string" ? "string" : "hash"] : data.map;
      }
      function getMatchData(object) {
        var result = keys(object), length = result.length;
        while (length--) {
          var key = result[length], value = object[key];
          result[length] = [ key, value, isStrictComparable(value) ];
        }
        return result;
      }
      function getNative(object, key) {
        var value = getValue(object, key);
        return baseIsNative(value) ? value : void 0;
      }
      var getTag = baseGetTag;
      if (DataView && getTag(new DataView(new ArrayBuffer(1))) != dataViewTag || Map2 && getTag(new Map2) != mapTag || Promise2 && getTag(Promise2.resolve()) != promiseTag || Set2 && getTag(new Set2) != setTag || WeakMap2 && getTag(new WeakMap2) != weakMapTag) {
        getTag = function(value) {
          var result = objectToString.call(value), Ctor = result == objectTag ? value.constructor : void 0, ctorString = Ctor ? toSource(Ctor) : void 0;
          if (ctorString) {
            switch (ctorString) {
             case dataViewCtorString:
              return dataViewTag;

             case mapCtorString:
              return mapTag;

             case promiseCtorString:
              return promiseTag;

             case setCtorString:
              return setTag;

             case weakMapCtorString:
              return weakMapTag;
            }
          }
          return result;
        };
      }
      function hasPath(object, path, hasFunc) {
        path = isKey(path, object) ? [ path ] : castPath(path);
        var result, index = -1, length = path.length;
        while (++index < length) {
          var key = toKey(path[index]);
          if (!(result = object != null && hasFunc(object, key))) {
            break;
          }
          object = object[key];
        }
        if (result) {
          return result;
        }
        var length = object ? object.length : 0;
        return !!length && isLength(length) && isIndex(key, length) && (isArray(object) || isArguments(object));
      }
      function isIndex(value, length) {
        length = length == null ? MAX_SAFE_INTEGER2 : length;
        return !!length && (typeof value == "number" || reIsUint.test(value)) && (value > -1 && value % 1 == 0 && value < length);
      }
      function isKey(value, object) {
        if (isArray(value)) {
          return false;
        }
        var type = typeof value;
        if (type == "number" || type == "symbol" || type == "boolean" || value == null || isSymbol(value)) {
          return true;
        }
        return reIsPlainProp.test(value) || !reIsDeepProp.test(value) || object != null && value in Object(object);
      }
      function isKeyable(value) {
        var type = typeof value;
        return type == "string" || type == "number" || type == "symbol" || type == "boolean" ? value !== "__proto__" : value === null;
      }
      function isMasked(func) {
        return !!maskSrcKey && maskSrcKey in func;
      }
      function isPrototype(value) {
        var Ctor = value && value.constructor, proto = typeof Ctor == "function" && Ctor.prototype || objectProto;
        return value === proto;
      }
      function isStrictComparable(value) {
        return value === value && !isObject(value);
      }
      function matchesStrictComparable(key, srcValue) {
        return function(object) {
          if (object == null) {
            return false;
          }
          return object[key] === srcValue && (srcValue !== void 0 || key in Object(object));
        };
      }
      var stringToPath = memoize(function(string) {
        string = toString2(string);
        var result = [];
        if (reLeadingDot.test(string)) {
          result.push("");
        }
        string.replace(rePropName, function(match, number, quote, string2) {
          result.push(quote ? string2.replace(reEscapeChar, "$1") : number || match);
        });
        return result;
      });
      function toKey(value) {
        if (typeof value == "string" || isSymbol(value)) {
          return value;
        }
        var result = value + "";
        return result == "0" && 1 / value == -INFINITY ? "-0" : result;
      }
      function toSource(func) {
        if (func != null) {
          try {
            return funcToString.call(func);
          } catch (e) {}
          try {
            return func + "";
          } catch (e) {}
        }
        return "";
      }
      function memoize(func, resolver) {
        if (typeof func != "function" || resolver && typeof resolver != "function") {
          throw new TypeError(FUNC_ERROR_TEXT);
        }
        var memoized = function() {
          var args = arguments, key = resolver ? resolver.apply(this, args) : args[0], cache = memoized.cache;
          if (cache.has(key)) {
            return cache.get(key);
          }
          var result = func.apply(this, args);
          memoized.cache = cache.set(key, result);
          return result;
        };
        memoized.cache = new (memoize.Cache || MapCache);
        return memoized;
      }
      memoize.Cache = MapCache;
      function eq(value, other) {
        return value === other || value !== value && other !== other;
      }
      function isArguments(value) {
        return isArrayLikeObject(value) && hasOwnProperty.call(value, "callee") && (!propertyIsEnumerable.call(value, "callee") || objectToString.call(value) == argsTag);
      }
      var isArray = Array.isArray;
      function isArrayLike(value) {
        return value != null && isLength(value.length) && !isFunction(value);
      }
      function isArrayLikeObject(value) {
        return isObjectLike(value) && isArrayLike(value);
      }
      function isFunction(value) {
        var tag = isObject(value) ? objectToString.call(value) : "";
        return tag == funcTag || tag == genTag;
      }
      function isLength(value) {
        return typeof value == "number" && value > -1 && value % 1 == 0 && value <= MAX_SAFE_INTEGER2;
      }
      function isObject(value) {
        var type = typeof value;
        return !!value && (type == "object" || type == "function");
      }
      function isObjectLike(value) {
        return !!value && typeof value == "object";
      }
      function isSymbol(value) {
        return typeof value == "symbol" || isObjectLike(value) && objectToString.call(value) == symbolTag;
      }
      var isTypedArray = nodeIsTypedArray ? baseUnary(nodeIsTypedArray) : baseIsTypedArray;
      function toString2(value) {
        return value == null ? "" : baseToString(value);
      }
      function get(object, path, defaultValue) {
        var result = object == null ? void 0 : baseGet(object, path);
        return result === void 0 ? defaultValue : result;
      }
      function hasIn(object, path) {
        return object != null && hasPath(object, path, baseHasIn);
      }
      function keys(object) {
        return isArrayLike(object) ? arrayLikeKeys(object) : baseKeys(object);
      }
      function transform2(object, iteratee, accumulator) {
        var isArr = isArray(object) || isTypedArray(object);
        iteratee = baseIteratee(iteratee);
        if (accumulator == null) {
          if (isArr || isObject(object)) {
            var Ctor = object.constructor;
            if (isArr) {
              accumulator = isArray(object) ? new Ctor : [];
            } else {
              accumulator = isFunction(Ctor) ? baseCreate(getPrototype(object)) : {};
            }
          } else {
            accumulator = {};
          }
        }
        (isArr ? arrayEach : baseForOwn)(object, function(value, index, object2) {
          return iteratee(accumulator, value, index, object2);
        });
        return accumulator;
      }
      function identity(value) {
        return value;
      }
      function property(path) {
        return isKey(path) ? baseProperty(toKey(path)) : basePropertyDeep(path);
      }
      module.exports = transform2;
    })(lodash_transform, lodash_transform.exports);
    return lodash_transform.exports;
  }
  // node_modules/@discord/embedded-app-sdk/output/_virtual/index2.mjs
  var lodash_transformExports = requireLodash_transform();
  // activity.js
  var config2 = define_CLAW_DISCORD_CONFIG_default;
  function quickPlayLevel(customId) {
    const match = /^level-(\d{1,2})$/.exec(customId ?? "");
    const level = match ? Number(match[1]) : 0;
    return level >= 1 && level <= 14 ? level : 0;
  }
  function createActivityBridge(SDK, request, locationSearch) {
    let sdk;
    const bridge = {
      status: 0,
      error: "",
      generation: 0,
      quickPlayLevel: 0,
      embedded: new URLSearchParams(locationSearch).has("frame_id"),
      async connect() {
        if ([ 1, 2, 3 ].includes(this.status)) return;
        const generation = ++this.generation;
        const isCurrent = () => generation === this.generation;
        this.status = 1;
        this.error = "";
        try {
          if (!new URLSearchParams(locationSearch).has("frame_id")) throw new Error("Open this build as a Discord Activity.");
          sdk ?? (sdk = new SDK(config2.clientId, {
            disableConsoleLogOverride: true
          }));
          this.quickPlayLevel = quickPlayLevel(sdk.customId);
          await sdk.ready();
          if (!isCurrent()) return;
          const {code} = await sdk.commands.authorize({
            client_id: config2.clientId,
            response_type: "code",
            state: "",
            prompt: "none",
            scope: [ "identify", "rpc.activities.write" ]
          });
          if (!isCurrent()) return;
          this.status = 2;
          const response = await request(config2.tokenEndpoint, {
            method: "POST",
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify({
              code
            })
          });
          if (!isCurrent()) return;
          if (!response.ok) throw new Error("Discord token endpoint failed.");
          const {access_token} = await response.json();
          if (!isCurrent()) return;
          if (typeof access_token !== "string" || !access_token) throw new Error("Discord token endpoint returned no token.");
          const auth = await sdk.commands.authenticate({
            access_token
          });
          if (!isCurrent()) return;
          if (!auth) throw new Error("Discord authentication failed.");
          this.status = 3;
          this.userId = auth.user?.id;
          this.username = auth.user?.global_name || auth.user?.username;
          globalThis.clawAnalytics?.discordIdentity(auth.user?.id, this.username);
        } catch (error) {
          if (!isCurrent()) return;
          this.status = 4;
          this.error = new URLSearchParams(locationSearch).has("frame_id") ? "Discord Activity connection failed. Check Activity and token endpoint configuration." : "Open this build as a Discord Activity.";
        }
      },
      disconnect() {
        ++this.generation;
        this.status = 0;
        this.error = "";
        this.userId = null;
        this.username = null;
        globalThis.clawAnalytics?.discordIdentity(null);
      },
      async presence(state, details) {
        if (this.status !== 3) return;
        try {
          await sdk.commands.setActivity({
            activity: {
              type: 0,
              state,
              details
            }
          });
        } catch {
          this.error = "Discord Activity presence update failed.";
        }
      }
    };
    return bridge;
  }
  globalThis.clawDiscordActivity = createActivityBridge(DiscordSDK, globalThis.fetch.bind(globalThis), globalThis.location.search);
  if (new URLSearchParams(globalThis.location.search).has("frame_id")) void globalThis.clawDiscordActivity.connect();
}))();

// end include: D:/Projects/Claw2/build/web-activity/discord-activity/discord-activity.js
// include: D:/Projects/Claw2/build/web-activity/claw-text-shader-source.js
Module.clawTextShaderSource = "uniform sampler2D texture;\nuniform vec2 resolution;\nuniform vec4 fillColor;\nuniform vec4 outlineColor;\nuniform float outlineThickness;\nuniform float bevelRadius;\nuniform float bevelStrength;\nuniform float goldMaterialStrength;\nuniform float ruggedness;\nuniform float extrusionDepth;\nuniform float specularStrength;\nuniform float reliefHighlightStrength;\nuniform vec2 faceVerticalBounds;\nuniform float shadowStrength;\nuniform vec2 shadowOffset;\nuniform float shadowSoftness;\nuniform vec4 glowColor;\nuniform float glowRadius;\nuniform float glowSoftness;\nuniform float bevelSmoothing;\nuniform float faceExpansion;\nfloat hash(vec2 p) {\n    return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453);\n}\nfloat noise(vec2 p) {\n    vec2 c = floor(p), f = fract(p);\n    f = f * f * (3.0 - 2.0 * f);\n    return mix(mix(hash(c), hash(c + vec2(1.0, 0.0)), f.x),\n        mix(hash(c + vec2(0.0, 1.0)), hash(c + vec2(1.0)), f.x), f.y);\n}\nfloat distanceAt(vec2 p) {\n    vec2 warp = vec2(noise(p * 0.19), noise(p * 0.19 + 31.0)) - 0.5;\n    p += warp * ruggedness * 0.65;\n    float distance = (texture2D(texture, p / resolution).r * 2.0 - 1.0) * 32.0;\n    if (faceExpansion > 0.0) {\n        // Add stem weight sideways without moving cap tops or baselines.\n        vec2 gradient = vec2(\n            texture2D(texture, (p + vec2(1.0, 0.0)) / resolution).r - texture2D(texture, (p - vec2(1.0, 0.0)) / resolution).r,\n            texture2D(texture, (p + vec2(0.0, 1.0)) / resolution).r - texture2D(texture, (p - vec2(0.0, 1.0)) / resolution).r);\n        distance += faceExpansion * abs(gradient.x) / max(0.0001, length(gradient));\n    }\n    return distance;\n}\nfloat relief(vec2 p) {\n    float d = max(0.0, distanceAt(p));\n    float variation = (noise(p * 0.12 + 7.0) - 0.5) * ruggedness * 0.42;\n    return min(d, max(0.5, bevelRadius)) * (1.0 + variation);\n}\nvoid main() {\n    vec2 p = gl_TexCoord[0].xy * resolution;\n    float d = distanceAt(p);\n    float face = smoothstep(-0.6, 0.6, d + min(0.0, outlineThickness));\n    float silhouette = smoothstep(-0.6, 0.6, d + max(0.0, outlineThickness));\n    float stepSize = 0.65 + bevelSmoothing;\n    vec2 slope = vec2(relief(p + vec2(stepSize, 0.0)) - relief(p - vec2(stepSize, 0.0)),\n        relief(p + vec2(0.0, stepSize)) - relief(p - vec2(0.0, stepSize))) / (2.0 * stepSize);\n    vec3 normal = normalize(vec3(-slope * bevelStrength * 0.65, 1.0));\n    vec3 light = normalize(vec3(-0.65, -0.85, 0.8));\n    float diffuse = max(0.0, dot(normal, light));\n    float specular = pow(max(0.0, dot(normal, normalize(light + vec3(0.0, 0.0, 1.0)))), 12.0);\n    float patina = mix(0.5, noise(p * 0.085 + 13.0), min(ruggedness, 1.0));\n    vec3 base = mix(fillColor.rgb, vec3(0.83, 0.65, 0.25), goldMaterialStrength);\n    vec3 color = base * (0.38 + diffuse * 0.90) * (0.9 + 0.2 * patina);\n    // Broad variations break up the polished highlight without adding grain.\n    color += mix(vec3(1.0), vec3(1.0, 0.94, 0.72), goldMaterialStrength)\n        * specular * specularStrength * (0.36 + 0.22 * patina);\n    color = mix(base, color, clamp(bevelStrength, 0.0, 1.0));\n    // Small specular patches INSIDE the raised face, away from its silhouette.\n    // A diagonal relief normal selects upper-left corners rather than tracing edges.\n    float insetFace = smoothstep(1.3, 1.8, d);\n    float bevelPatch = 1.0 - smoothstep(2.5, 3.5, d);\n    // A wider derivative keeps tiny raster irregularities from becoming white speckles.\n    const float facetStep = 1.25;\n    vec2 facetSlope = vec2(relief(p + vec2(facetStep, 0.0)) - relief(p - vec2(facetStep, 0.0)),\n        relief(p + vec2(0.0, facetStep)) - relief(p - vec2(0.0, facetStep))) / (2.0 * facetStep);\n    float slopeLength = length(facetSlope);\n    vec2 facetDirection = facetSlope / max(slopeLength, 0.0001);\n    float cornerFacing = pow(max(0.0, dot(facetDirection, normalize(vec2(1.0, 1.0)))), 12.0);\n    float raisedFacet = smoothstep(0.15, 0.55, slopeLength);\n    // Flat serif caps also catch light at their inset upper-left corner.\n    // Nearby left/top boundaries locate that corner without lighting a whole edge.\n    float leftCorner = 1.0 - smoothstep(0.0, 1.0, distanceAt(p - vec2(3.5, 0.0)));\n    float topCorner = 1.0 - smoothstep(0.0, 1.0, distanceAt(p - vec2(0.0, 3.5)));\n    float serifFacet = leftCorner * topCorner;\n    float glint = insetFace * bevelPatch * max(cornerFacing * raisedFacet, serifFacet);\n    // These single-line gold overlays catch the strongest reflection near their cap tops.\n    float faceY = (p.y - faceVerticalBounds.x) / max(1.0, faceVerticalBounds.y);\n    float capHighlight = 1.0 - smoothstep(0.18, 0.62, faceY);\n    glint = min(1.0, glint * 1.12) * capHighlight;\n    color = mix(color, vec3(1.0, 0.99, 0.88), reliefHighlightStrength * glint);\n    float side = silhouette;\n    for (int i = 1; i <= 24; ++i) {\n        vec2 offset = vec2(0.65, 0.85) * extrusionDepth * float(i) / 24.0;\n        side = max(side, smoothstep(-0.6, 0.6, distanceAt(p - offset) + max(0.0, outlineThickness)));\n    }\n    float shadow = smoothstep(-shadowSoftness, shadowSoftness, distanceAt(p - shadowOffset\n        - vec2(0.65, 0.85) * extrusionDepth)) * 0.72 * fillColor.a;\n    float sideAlpha = max(0.0, side - silhouette) * fillColor.a;\n    float outlineAlpha = max(0.0, silhouette - face) * outlineColor.a;\n    float faceAlpha = face * fillColor.a;\n    float alpha = faceAlpha + outlineAlpha + sideAlpha;\n    vec3 rgb = color * faceAlpha + outlineColor.rgb * outlineAlpha\n        + base * vec3(0.30, 0.24, 0.18) * sideAlpha;\n    if (glowRadius > 0.0 && glowColor.a > 0.0) {\n        float outside = max(0.0, -d);\n        float glow = (1.0 - smoothstep(mix(glowRadius - 0.6, 0.0, glowSoftness), glowRadius + 0.6, outside))\n            * glowColor.a * fillColor.a;\n        float innerRim = 1.0 - smoothstep(glowRadius * 0.78, glowRadius * 0.78 + 0.6, outside);\n        vec3 haloColor = mix(glowColor.rgb * vec3(0.67, 0.48, 0.20), glowColor.rgb, innerRim);\n        rgb += haloColor * glow * (1.0 - alpha);\n        alpha += glow * (1.0 - alpha);\n    }\n    shadow *= shadowStrength;\n    rgb += vec3(0.025, 0.018, 0.01) * shadow * (1.0 - alpha);\n    alpha += shadow * (1.0 - alpha);\n    gl_FragColor = vec4(rgb, alpha);\n}\n";

// end include: D:/Projects/Claw2/build/web-activity/claw-text-shader-source.js
// include: D:/Projects/Claw2/src/platform/web/touch-controls.js
(function() {
  const controls = document.createElement("div");
  controls.id = "touch-controls";
  controls.hidden = true;
  controls.setAttribute("aria-label", "Touch controls");
  const pad = document.createElement("div");
  pad.className = "touch-pad";
  const actions = document.createElement("div");
  actions.className = "touch-actions";
  const gameplayMenu = document.createElement("div");
  gameplayMenu.className = "touch-menu";
  const buttons = [];
  const gameplayButtons = [];
  const menuButtons = [];
  const gameplayMenuButtons = [];
  const pointers = new Map;
  const pointerButtons = new Map;
  const menuDirectionHeld = new Map;
  let menuSelectHeld = false;
  let menuBackHeld = false;
  let gameplayMenuHeld = false;
  const left = 16777216, right = 33554432, up = 67108864, down = 134217728;
  const directionKeys = new Map([ [ up, "ArrowUp" ], [ down, "ArrowDown" ], [ left, "ArrowLeft" ], [ right, "ArrowRight" ] ]);
  function addButton(parent, label, name, mask, group) {
    const button = document.createElement("button");
    button.type = "button";
    button.textContent = label;
    button.tabIndex = -1;
    button.setAttribute("aria-label", name);
    button.setAttribute("aria-pressed", "false");
    button.touchMask = mask;
    parent.appendChild(button);
    buttons.push(button);
    if (group) group.push(button);
    return button;
  }
  const upButton = addButton(pad, "▲", "Up", up);
  const leftButton = addButton(pad, "◀", "Left", left);
  const spacer = document.createElement("span");
  pad.appendChild(spacer);
  const rightButton = addButton(pad, "▶", "Right", right);
  const downButton = addButton(pad, "▼", "Down", down);
  upButton.style.gridColumn = "2";
  upButton.style.gridRow = "1";
  leftButton.style.gridColumn = "1";
  leftButton.style.gridRow = "2";
  rightButton.style.gridColumn = "3";
  rightButton.style.gridRow = "2";
  downButton.style.gridColumn = "2";
  downButton.style.gridRow = "3";
  spacer.style.gridColumn = "2";
  spacer.style.gridRow = "2";
  spacer.style.width = "clamp(36px,9vw,60px)";
  // Use numeric grid lines only; gridArea resets gridRow/gridColumn.
  pad.style.gridTemplateAreas = "none";
  addButton(actions, "Special", "Special attack (fire weapon)", 4, gameplayButtons);
  addButton(actions, "Attack", "Attack", 2, gameplayButtons);
  addButton(actions, "Jump", "Jump", 1, gameplayButtons);
  addButton(actions, "Switch", "Toggle special weapon", 8, gameplayButtons);
  addButton(actions, "Select", "Select menu item", 16, menuButtons);
  addButton(actions, "Back", "Back or cancel", 32, menuButtons);
  addButton(gameplayMenu, "☰", "Open in-game menu", 64, gameplayMenuButtons);
  controls.appendChild(pad);
  controls.appendChild(actions);
  controls.appendChild(gameplayMenu);
  document.body.appendChild(controls);
  let firstInput = true, enabled = false, editing = false;
  let config = {
    enabled: null,
    style: "4",
    size: 1,
    actions: [ 4, 2, 1, 8 ],
    positions: {}
  };
  try {
    const saved = JSON.parse(localStorage.getItem("claw-touch-layout"));
    if (saved && [ "4", "8", "stick" ].includes(saved.style) && Array.isArray(saved.actions)) config = {
      enabled: typeof saved.enabled === "boolean" ? saved.enabled : null,
      style: saved.style,
      size: [ .75, 1, 1.25 ].includes(saved.size) ? saved.size : 1,
      actions: saved.actions,
      positions: saved.positions || {}
    };
  } catch (_) {}
  function save() {
    try {
      localStorage.setItem("claw-touch-layout", JSON.stringify(config));
    } catch (_) {}
  }
  const diagonals = [];
  for (const [label, name, mask, column, row] of [ [ "↖", "Up left", up | left, 1, 1 ], [ "↗", "Up right", up | right, 3, 1 ], [ "↙", "Down left", down | left, 1, 3 ], [ "↘", "Down right", down | right, 3, 3 ] ]) {
    const button = addButton(pad, label, name, mask, diagonals);
    button.style.gridColumn = String(column);
    button.style.gridRow = String(row);
  }
  for (const [label, mask] of [ [ "Lift / throw", 32 ], [ "Pistol", 64 ], [ "Magic", 128 ], [ "Dynamite", 256 ], [ "Special ability", 512 ] ]) addButton(actions, label, label, mask, gameplayButtons);
  const stick = addButton(controls, "+", "Movement stick", 0);
  stick.className = "touch-stick";
  const keyboard = addButton(controls, "⌨", "Open keyboard", 0);
  keyboard.className = "touch-keyboard";
  const textInput = document.createElement("textarea");
  textInput.className = "touch-text-input";
  textInput.setAttribute("aria-label", "Game keyboard input");
  textInput.setAttribute("autocapitalize", "off");
  textInput.setAttribute("autocomplete", "off");
  textInput.spellcheck = false;
  controls.appendChild(textInput);
  Module.clawTouchText = [];
  Module.clawMenuTextInput = false;
  Module.clawSetMenuTextInput = active => {
    const wasActive = Module.clawMenuTextInput;
    Module.clawMenuTextInput = !!active;
    if (wasActive && !Module.clawMenuTextInput && document.activeElement === textInput) {
      textInput.blur();
      Module.canvas.focus();
    }
  };
  Module.clawFocusMenuTextInput = () => {
    textInput.value = "";
    textInput.focus({
      preventScroll: true
    });
  };
  Module.clawCopyMenuText = text => {
    if (!navigator.clipboard || !navigator.clipboard.writeText) {
      console.warn("Clipboard copy is unavailable in this browser.");
      return;
    }
    navigator.clipboard.writeText(text).catch(error => console.warn("Could not copy menu text to the clipboard.", error));
  };
  Module.clawPasteMenuText = async () => {
    if (!navigator.clipboard || !navigator.clipboard.readText) {
      console.warn("Clipboard paste is unavailable in this browser.");
      return;
    }
    try {
      submitText(await navigator.clipboard.readText());
    } catch (error) {
      console.warn("Could not paste menu text from the clipboard.", error);
    }
  };
  const keyboardPulses = [];
  let releaseKeyboardPulse = false;
  Module.clawTakeTouchKey = () => {
    if (releaseKeyboardPulse) {
      releaseKeyboardPulse = false;
      return 0;
    }
    const key = keyboardPulses.shift() || 0;
    releaseKeyboardPulse = key !== 0;
    return key;
  };
  function submitText(value) {
    for (const character of value) {
      Module.clawTouchText.push(character.codePointAt(0));
      if (Module.clawGameState === 3 || Module.clawGameState === 4) {
        const key = character.toUpperCase().codePointAt(0);
        if (key === 32 || key >= 48 && key <= 57 || key >= 65 && key <= 90) keyboardPulses.push(key);
      }
    }
  }
  textInput.addEventListener("input", event => {
    if (event.isComposing) return;
    if (event.inputType === "deleteContentBackward") submitText("\b"); else submitText(textInput.value);
    textInput.value = "";
  });
  textInput.addEventListener("compositionend", () => {
    submitText(textInput.value);
    textInput.value = "";
  });
  textInput.addEventListener("keydown", event => {
    event.stopPropagation();
    const control = event.ctrlKey || event.metaKey;
    const editKey = [ "Backspace", "Delete", "ArrowLeft", "ArrowRight", "Home", "End" ].includes(event.key);
    const clipboardKey = control && [ "a", "c", "x", "v" ].includes(event.key.toLowerCase());
    if (Module.clawMenuTextInput && (editKey || clipboardKey)) {
      event.preventDefault();
      dispatchMenuKey(event.key, {
        ctrlKey: control,
        shiftKey: event.shiftKey
      });
      return;
    }
    if (event.key === "Enter" || event.key === "Escape") {
      event.preventDefault();
      dispatchMenuKey(event.key);
      textInput.blur();
      Module.canvas.focus();
    }
  });
  // The native game menu owns presentation; these methods only change input settings.
  Module.clawTouchSettings = {
    enabled: () => enabled,
    style: () => [ "4", "8", "stick" ].indexOf(config.style),
    size: () => [ .75, 1, 1.25 ].indexOf(config.size),
    cycleSize() {
      config.size = {
        .75: 1,
        1: 1.25,
        1.25: .75
      }[config.size];
      save();
      update();
    },
    action: mask => config.actions.includes(mask),
    toggle() {
      enabled = !enabled;
      config.enabled = enabled;
      firstInput = false;
      save();
      clear();
    },
    cycleStyle() {
      config.style = {
        4: "8",
        8: "stick",
        stick: "4"
      }[config.style];
      save();
      clear();
    },
    toggleAction(mask) {
      config.actions = config.actions.includes(mask) ? config.actions.filter(value => value !== mask) : [ ...config.actions, mask ];
      save();
      clear();
    },
    reorganize() {
      enabled = true;
      config.enabled = true;
      firstInput = false;
      editing = true;
      clear();
      // Measure every control before taking any of them out of grid flow.
      const positions = movable.map(item => {
        if (item.hidden) return null;
        const rect = item.getBoundingClientRect();
        const point = local({
          clientX: rotated() ? rect.right : rect.left,
          clientY: rect.top
        });
        return {
          x: point.x / controls.clientWidth,
          y: point.y / controls.clientHeight
        };
      });
      positions.forEach((pos, index) => {
        if (pos) config.positions[index] = pos;
      });
      place();
      save();
    },
    finishReorganizing() {
      editing = false;
      drags.clear();
      save();
      clear();
    },
    resetPositions() {
      config.positions = {};
      save();
      update();
    }
  };
  const movable = [ pad, stick, ...gameplayButtons, ...gameplayMenuButtons, keyboard ], drags = new Map;
  function rotated() {
    return document.documentElement.classList.contains("claw-rotated");
  }
  function local(event) {
    const rect = controls.getBoundingClientRect();
    return rotated() ? {
      x: event.clientY - rect.top,
      y: rect.right - event.clientX
    } : {
      x: event.clientX - rect.left,
      y: event.clientY - rect.top
    };
  }
  function place() {
    movable.forEach((item, index) => {
      const pos = config.positions[index];
      for (const key of [ "position", "left", "top", "right", "bottom" ]) item.style[key] = "";
      if (!pos || !Number.isFinite(pos.x) || !Number.isFinite(pos.y)) return;
      item.style.position = "fixed";
      item.style.left = Math.max(0, Math.min(controls.clientWidth - item.offsetWidth, pos.x * controls.clientWidth)) + "px";
      item.style.top = Math.max(0, Math.min(controls.clientHeight - item.offsetHeight, pos.y * controls.clientHeight)) + "px";
      item.style.right = "auto";
      item.style.bottom = "auto";
    });
  }
  window.addEventListener("resize", place);
  window.addEventListener("keydown", event => {
    if (firstInput && ![ "Shift", "Control", "Alt", "Meta" ].includes(event.key)) firstInput = false;
  }, true);
  function update() {
    const playing = Module.clawGameState === 3 || Module.clawGameState === 4;
    const initialized = Module.clawGameState > 0;
    pad.hidden = Module.clawGameState === 2 || config.style === "stick";
    stick.hidden = config.style !== "stick" || Module.clawGameState === 2;
    diagonals.forEach(button => button.hidden = config.style !== "8");
    keyboard.hidden = !initialized && !editing;
    controls.hidden = !enabled;
    for (const item of [ pad, actions, gameplayMenu, stick, keyboard ]) item.style.zoom = String(config.size);
    place();
    for (const button of gameplayButtons) button.hidden = !(playing || editing) || !config.actions.includes(button.touchMask);
    for (const button of menuButtons) button.hidden = !initialized || playing || editing;
    for (const button of gameplayMenuButtons) button.hidden = !(playing || editing);
    let held = 0;
    for (const [id, mask] of pointers) {
      const button = pointerButtons.get(id);
      if ((playing && menuButtons.includes(button)) || (!playing && gameplayButtons.includes(button))) continue;
      if (menuButtons.includes(button) || gameplayMenuButtons.includes(button)) continue;
      held |= mask;
    }
    Module.clawTouchActions = enabled && !editing ? held : 0;
    document.body.classList.toggle("touch-controls-visible", !controls.hidden);
    Module.clawTouchMode = !controls.hidden && !editing;
    document.documentElement.style.cursor = controls.hidden ? "" : "none";
    document.body.style.cursor = controls.hidden ? "" : "none";
    Module.canvas.style.cursor = controls.hidden ? "" : "none";
    for (const button of buttons) {
      const active = button.touchMask !== 0 && (held & button.touchMask) === button.touchMask;
      button.classList.toggle("active", active);
      button.setAttribute("aria-pressed", String(active));
    }
  }
  function clear() {
    keyboardPulses.length = 0;
    releaseKeyboardPulse = false;
    pointers.clear();
    pointerButtons.clear();
    for (const id of menuDirectionHeld.keys()) stopMenuDirection(id);
    menuSelectHeld = menuBackHeld = gameplayMenuHeld = false;
    update();
  }
  function dispatchMenuKey(key, modifiers = {}) {
    const code = /^[a-z]$/i.test(key) ? `Key${key.toUpperCase()}` : key;
    const options = {
      key,
      code,
      bubbles: true,
      ...modifiers
    };
    Module.canvas.dispatchEvent(new KeyboardEvent("keydown", options));
    Module.canvas.dispatchEvent(new KeyboardEvent("keyup", options));
  }
  function stopMenuDirection(id) {
    const held = menuDirectionHeld.get(id);
    if (held) clearTimeout(held.timer);
    menuDirectionHeld.delete(id);
  }
  function holdMenuDirection(id, key) {
    if (menuDirectionHeld.get(id)?.key === key) return;
    stopMenuDirection(id);
    if (!key) return;
    const held = {
      key,
      timer: null
    };
    menuDirectionHeld.set(id, held);
    function repeat() {
      if (menuDirectionHeld.get(id) !== held) return;
      if (!enabled || editing || Module.clawDeveloperEditing || document.hidden || Module.clawGameState === 3 || Module.clawGameState === 4) {
        stopMenuDirection(id);
        return;
      }
      dispatchMenuKey(key);
      if (menuDirectionHeld.get(id) === held) held.timer = setTimeout(repeat, 100);
    }
    dispatchMenuKey(key);
    if (menuDirectionHeld.get(id) === held) held.timer = setTimeout(repeat, 400);
  }
  function move(event) {
    if (Module.clawDeveloperEditing) {
      clear();
      return;
    }
    if (!enabled || editing) return;
    const target = document.elementFromPoint(event.clientX, event.clientY);
    if (target === stick || pointerButtons.get(event.pointerId) === stick) {
      const rect = stick.getBoundingClientRect();
      let x = (event.clientX - rect.left) / rect.width * 2 - 1;
      let y = (event.clientY - rect.top) / rect.height * 2 - 1;
      if (rotated()) [x, y] = [ y, -x ];
      const mask = (x < -.3 ? left : x > .3 ? right : 0) | (y < -.3 ? up : y > .3 ? down : 0);
      pointerButtons.set(event.pointerId, stick);
      if (Module.clawGameState === 3 || Module.clawGameState === 4) pointers.set(event.pointerId, mask); else {
        const key = directionKeys.get(mask);
        holdMenuDirection(event.pointerId, key);
        pointers.set(event.pointerId, 0);
      }
      update();
      return;
    }
    pointers.set(event.pointerId, buttons.includes(target) ? target.touchMask : 0);
    pointerButtons.set(event.pointerId, buttons.includes(target) ? target : null);
    const button = buttons.includes(target) ? target : null;
    const playing = Module.clawGameState === 3 || Module.clawGameState === 4;
    if (playing || !directionKeys.has(button && button.touchMask)) stopMenuDirection(event.pointerId);
    if (!playing && directionKeys.has(button && button.touchMask)) {
      const key = directionKeys.get(button.touchMask);
      holdMenuDirection(event.pointerId, key);
      pointers.set(event.pointerId, 0);
    } else if (playing && gameplayMenuButtons.includes(button)) {
      if (!gameplayMenuHeld) dispatchMenuKey("Escape");
      gameplayMenuHeld = true;
    } else if (!playing && (button === menuButtons[0] || button === menuButtons[1])) {
      const isSelect = button === menuButtons[0];
      if (!(isSelect ? menuSelectHeld : menuBackHeld)) dispatchMenuKey(isSelect ? "Enter" : "Escape");
      if (isSelect) menuSelectHeld = true; else menuBackHeld = true;
    }
    update();
  }
  window.addEventListener("pointerdown", function(event) {
    if (Module.clawDeveloperEditing) {
      clear();
      return;
    }
    if (firstInput && [ "touch", "mouse", "pen" ].includes(event.pointerType)) {
      firstInput = false;
      if (config.enabled === null) {
        enabled = event.pointerType === "touch";
        if (enabled) {
          config.enabled = true;
          save();
        }
      } else enabled = config.enabled;
      if (enabled && Module.clawHideCursor) Module.clawHideCursor();
      update();
    }
  }, true);
  window.addEventListener("pointerdown", function(event) {
    if (event.pointerType === "touch" && event.target === Module.canvas && Module.clawMenuTextInput) {
      event.preventDefault();
      clear();
      Module.clawFocusMenuTextInput();
    }
  }, true);
  controls.addEventListener("pointerdown", function(event) {
    if (editing) {
      event.preventDefault();
      const item = movable.find(item => item === event.target || item.contains(event.target));
      if (item) {
        const point = local(event), rect = item.getBoundingClientRect();
        const origin = local({
          clientX: rotated() ? rect.right : rect.left,
          clientY: rect.top
        });
        drags.set(event.pointerId, {
          item,
          dx: point.x - origin.x,
          dy: point.y - origin.y
        });
        controls.setPointerCapture(event.pointerId);
      }
      return;
    }
    if (event.target === textInput) return;
    if (event.target === keyboard && enabled) {
      event.preventDefault();
      clear();
      textInput.focus();
      return;
    }
    if (event.pointerType !== "touch" || !enabled) return;
    event.preventDefault();
    controls.setPointerCapture(event.pointerId);
    Module.canvas.focus();
    move(event);
  });
  controls.addEventListener("pointermove", function(event) {
    if (drags.has(event.pointerId)) {
      event.preventDefault();
      const {item, dx, dy} = drags.get(event.pointerId), point = local(event);
      config.positions[movable.indexOf(item)] = {
        x: Math.max(0, Math.min(controls.clientWidth - item.offsetWidth, point.x - dx)) / controls.clientWidth,
        y: Math.max(0, Math.min(controls.clientHeight - item.offsetHeight, point.y - dy)) / controls.clientHeight
      };
      place();
      return;
    }
    if (!pointers.has(event.pointerId)) return;
    event.preventDefault();
    move(event);
  });
  function release(event) {
    if (drags.delete(event.pointerId)) save();
    stopMenuDirection(event.pointerId);
    const button = pointerButtons.get(event.pointerId);
    if (button === menuButtons[0]) menuSelectHeld = false;
    if (button === menuButtons[1]) menuBackHeld = false;
    if (gameplayMenuButtons.includes(button)) gameplayMenuHeld = false;
    pointers.delete(event.pointerId);
    pointerButtons.delete(event.pointerId);
    update();
  }
  for (const type of [ "pointerup", "pointercancel", "lostpointercapture" ]) controls.addEventListener(type, release);
  controls.addEventListener("contextmenu", event => event.preventDefault());
  window.addEventListener("blur", () => {
    drags.clear();
    clear();
  });
  window.addEventListener("claw-game-state-change", () => {
    Module.clawSetMenuTextInput(false);
    clear();
  });
  window.addEventListener("claw-developer-editing", clear);
  window.addEventListener("pagehide", clear);
  document.addEventListener("visibilitychange", function() {
    if (document.hidden) clear();
  });
  Module.clawGameState = 0;
  update();
})();

// end include: D:/Projects/Claw2/src/platform/web/touch-controls.js
// include: D:/Projects/Claw2/src/platform/web/comparison.js
// Set Module.clawComparison before pressing Start. Tokens remain in memory only.
Module.clawComparisonArguments = function() {
  const config = Module.clawComparison;
  if (!config) return [];
  if (!config.token || !config.session || !config.assets || !config.endpoint) throw new Error("Comparison requires endpoint, session, assets and token");
  const endpoint = new URL(config.endpoint);
  if (![ "ws:", "wss:" ].includes(endpoint.protocol)) throw new Error("Invalid comparison endpoint");
  if (location.protocol === "https:" && endpoint.protocol !== "wss:") throw new Error("HTTPS comparison requires WSS");
  if (!Number.isInteger(config.level) || config.level < 1 || config.level > 14) throw new Error("Comparison level must be 1..14");
  ENV["CLAW_COMPARE_TOKEN"] = config.token;
  const args = [ "--compare-legacy", String(config.level), "--compare-endpoint", endpoint.href, "--compare-session", config.session, "--compare-assets", config.assets, "--compare-report", "/comparison.csv" ];
  if (config.frames !== undefined) args.push("--compare-frames", String(config.frames));
  if (config.checkpoint) args.push("--compare-save-point", config.checkpoint);
  if (config.autopilot) args.push("--autopilot");
  return args;
};

Module.clawComparisonClearToken = function() {
  delete ENV["CLAW_COMPARE_TOKEN"];
  if (Module.clawComparison) delete Module.clawComparison.token;
};

Module.clawComparisonDownload = function() {
  const bytes = FS.readFile("/comparison.csv");
  const url = URL.createObjectURL(new Blob([ bytes ], {
    type: "text/csv"
  }));
  const link = document.createElement("a");
  link.href = url;
  link.download = "comparison.csv";
  link.click();
  setTimeout(() => URL.revokeObjectURL(url), 1e3);
};

// end include: D:/Projects/Claw2/src/platform/web/comparison.js
// include: D:/Projects/Claw2/src/platform/web/sha256.js
// SHA-256 for asset integrity, including HTTP LAN origins without Web Crypto.
(function() {
  const k = new Uint32Array([ 1116352408, 1899447441, 3049323471, 3921009573, 961987163, 1508970993, 2453635748, 2870763221, 3624381080, 310598401, 607225278, 1426881987, 1925078388, 2162078206, 2614888103, 3248222580, 3835390401, 4022224774, 264347078, 604807628, 770255983, 1249150122, 1555081692, 1996064986, 2554220882, 2821834349, 2952996808, 3210313671, 3336571891, 3584528711, 113926993, 338241895, 666307205, 773529912, 1294757372, 1396182291, 1695183700, 1986661051, 2177026350, 2456956037, 2730485921, 2820302411, 3259730800, 3345764771, 3516065817, 3600352804, 4094571909, 275423344, 430227734, 506948616, 659060556, 883997877, 958139571, 1322822218, 1537002063, 1747873779, 1955562222, 2024104815, 2227730452, 2361852424, 2428436474, 2756734187, 3204031479, 3329325298 ]);
  const rotate = (x, n) => (x >>> n) | (x << (32 - n));
  Module.clawSHA256 = async function(input) {
    const bytes = input instanceof ArrayBuffer ? new Uint8Array(input) : new Uint8Array(input.buffer, input.byteOffset, input.byteLength);
    if (globalThis.crypto?.subtle) {
      return Array.from(new Uint8Array(await globalThis.crypto.subtle.digest("SHA-256", bytes)), b => b.toString(16).padStart(2, "0")).join("");
    }
    const h = new Uint32Array([ 1779033703, 3144134277, 1013904242, 2773480762, 1359893119, 2600822924, 528734635, 1541459225 ]);
    const w = new Uint32Array(64), block = new Uint8Array(64), view = new DataView(block.buffer);
    const length = Math.ceil((bytes.length + 9) / 64) * 64;
    for (let offset = 0; offset < length; offset += 64) {
      block.fill(0);
      block.set(bytes.subarray(offset, Math.min(offset + 64, bytes.length)));
      if (offset <= bytes.length && bytes.length < offset + 64) block[bytes.length - offset] = 128;
      if (offset + 64 === length) {
        view.setUint32(56, Math.floor(bytes.length / 536870912));
        view.setUint32(60, (bytes.length * 8) >>> 0);
      }
      for (let i = 0; i < 16; i++) w[i] = view.getUint32(i * 4);
      for (let i = 16; i < 64; i++) {
        const x = w[i - 15], y = w[i - 2];
        w[i] = (w[i - 16] + (rotate(x, 7) ^ rotate(x, 18) ^ (x >>> 3)) + w[i - 7] + (rotate(y, 17) ^ rotate(y, 19) ^ (y >>> 10))) >>> 0;
      }
      let [a, b, c, d, e, f, g, z] = h;
      for (let i = 0; i < 64; i++) {
        const t1 = (z + (rotate(e, 6) ^ rotate(e, 11) ^ rotate(e, 25)) + ((e & f) ^ (~e & g)) + k[i] + w[i]) >>> 0;
        const t2 = ((rotate(a, 2) ^ rotate(a, 13) ^ rotate(a, 22)) + ((a & b) ^ (a & c) ^ (b & c))) >>> 0;
        z = g;
        g = f;
        f = e;
        e = (d + t1) >>> 0;
        d = c;
        c = b;
        b = a;
        a = (t1 + t2) >>> 0;
      }
      [ a, b, c, d, e, f, g, z ].forEach((value, i) => h[i] = (h[i] + value) >>> 0);
      // Keep loading UI responsive while hashing large assets on phones.
      if ((offset + 64) % (256 * 1024) === 0) await new Promise(resolve => setTimeout(resolve, 0));
    }
    return Array.from(h, x => x.toString(16).padStart(8, "0")).join("");
  };
})();

// end include: D:/Projects/Claw2/src/platform/web/sha256.js
// include: D:/Projects/Claw2/src/platform/web/release-assets.js
// Single source: GitHub Releases, reached through the same-origin read-through proxy.
// Files are fetched separately at startup, language selection, and level entry.
(function() {
  const packs = new Set([ "BaseAssets", "Strings", "BR", "DE", "EN", "ES", "JP", "PL", "RU" ]);
  const languages = new Set([ "BR", "DE", "EN", "ES", "JP", "PL", "RU" ]);
  const manifests = new Map, loaded = new Set;
  const digest = bytes => Module.clawSHA256(bytes);
  const base = () => Module.clawAssetBaseURL || "/assets/";
  const url = path => new URL(base() + path, location.href).href;
  const cachePromise = typeof caches === "undefined" ? Promise.resolve(null) : caches.open("claw-release-assets-v1").catch(() => null);
  function safePath(path) {
    return typeof path === "string" && !/[\\:<>"|?*\x00-\x1f]/.test(path) && path.split("/").every(p => p && p !== "." && p !== ".." && !/[. ]$/.test(p) && !/^(CON|PRN|AUX|NUL|COM[1-9]|LPT[1-9])(?:\.|$)/i.test(p));
  }
  async function validate(m, pack) {
    const installRoot = pack === "BaseAssets" ? "BaseAssets" : pack === "Strings" ? "LangAssets" : "LangAssets/" + pack;
    if (!packs.has(pack) || m.schema !== 1 || m.pack !== pack || m.repository !== `captainclawnet/${pack}` || !/^(0|[1-9]\d{0,8})\.(0|[1-9]\d{0,8})\.(0|[1-9]\d{0,8})$/.test(m.version) || m.tag !== "v" + m.version || m.install_root !== installRoot || !Array.isArray(m.files) || !m.files.length || m.files.length > 999) throw Error("Invalid asset manifest");
    const paths = new Set, names = new Set;
    let total = 0;
    for (const f of m.files) {
      if (!safePath(f.path) || !/^[a-f0-9]{64}$/.test(f.sha256) || !Number.isSafeInteger(f.size) || f.size < 0 || f.size > 256 * 1024 * 1024 || (pack === "Strings" ? !languages.has(f.path.split("/")[0]) || f.path !== f.path.split("/")[0] + "/STRINGS.INI" || f.asset !== f.path.split("/")[0] + ".INI" : f.asset !== "f-" + await digest((new TextEncoder).encode(f.path))) || paths.has(f.path.toLowerCase()) || names.has(f.asset)) throw Error("Invalid asset mapping");
      paths.add(f.path.toLowerCase());
      names.add(f.asset);
      total += f.size;
    }
    if (pack === "Strings" && (m.files.length !== languages.size || new Set(m.files.map(f => f.path.split("/")[0])).size !== languages.size)) throw Error("Invalid strings inventory");
    if (total > 4 * 1024 ** 3) throw Error("Asset pack too large");
    for (const path of paths) {
      const parts = path.split("/");
      for (let i = 1; i < parts.length; i++) if (paths.has(parts.slice(0, i).join("/"))) throw Error("Asset path conflict");
    }
    return m;
  }
  async function bounded(response, limit) {
    if (!response.ok) throw Error("Asset HTTP " + response.status);
    const reader = response.body.getReader(), chunks = [];
    let size = 0;
    try {
      for (;;) {
        const {done, value} = await reader.read();
        if (done) break;
        size += value.length;
        if (size > limit) throw Error("Asset too large");
        chunks.push(value);
      }
    } catch (error) {
      await reader.cancel();
      throw error;
    }
    const bytes = new Uint8Array(size);
    let offset = 0;
    for (const chunk of chunks) {
      bytes.set(chunk, offset);
      offset += chunk.length;
    }
    return bytes;
  }
  async function manifest(pack) {
    if (manifests.has(pack)) return manifests.get(pack);
    if (!packs.has(pack)) throw Error("Unsupported language");
    const cache = await cachePromise, key = url(pack + "/latest.json");
    let m;
    try {
      const bytes = await bounded(await fetch(key, {
        cache: "no-cache",
        signal: AbortSignal.timeout(2e4)
      }), 2 * 1024 * 1024);
      m = await validate(JSON.parse((new TextDecoder).decode(bytes)), pack);
      if (cache) await cache.put(key, new Response(bytes)).catch(() => {});
    } catch (error) {
      const saved = cache && await cache.match(key);
      if (!saved) throw error;
      m = await validate(await saved.json(), pack);
      console.warn("Using cached asset manifest:", pack, error);
    }
    manifests.set(pack, m);
    (Module.clawAssetVersions ||= {})[pack] = m.version;
    return m;
  }
  function targetPath(m, f) {
    return "/" + m.install_root + "/" + f.path;
  }
  async function file(m, f, progress = () => {}) {
    const target = targetPath(m, f);
    if (loaded.has(target)) return true;
    progress("VERIFYING");
    const cache = await cachePromise;
    const key = new URL("/__claw_asset_cache__/" + f.sha256, location.href).href;
    const saved = cache && await cache.match(key);
    let bytes;
    if (saved) {
      bytes = new Uint8Array(await saved.arrayBuffer());
      if (bytes.length !== f.size || await digest(bytes) !== f.sha256) {
        await cache.delete(key);
        bytes = null;
      }
    }
    if (!bytes) {
      progress("DOWNLOADING");
      bytes = await bounded(await fetch(url(m.pack + "/" + m.tag + "/" + f.asset), {
        signal: AbortSignal.timeout(12e4)
      }), f.size);
      if (bytes.length !== f.size || await digest(bytes) !== f.sha256) throw Error("Asset checksum mismatch: " + f.path);
      if (cache) await cache.put(key, new Response(bytes)).catch(() => {});
    }
    const directory = target.slice(0, target.lastIndexOf("/"));
    FS.mkdirTree(directory);
    FS.writeFile(target, bytes);
    loaded.add(target);
    return false;
  }
  function levelOf(path) {
    const match = /(?:^|\/)LEVEL(\d+)(?:_ROPE)?(?:\/|\.)/i.exec(path);
    return match ? Number(match[1]) : 0;
  }
  async function load(pack, level = 0, progress = () => {}) {
    const m = await manifest(pack);
    const files = m.files.filter(f => (levelOf(f.path) === level || (pack === "BaseAssets" && level === 0 && /^LOADINGS\/LEVEL\d+\.PNG$/i.test(f.path))) && !(languages.has(pack) && f.path.toUpperCase() === "STRINGS.INI"));
    let cursor = 0;
    await Promise.all(Array.from({
      length: Math.min(4, files.length)
    }, async () => {
      while (cursor < files.length) {
        const index = cursor++, f = files[index];
        await file(m, f, phase => progress(phase, pack, index + 1, files.length, (index + 1) / Math.max(files.length, 1)));
      }
    }));
    FS.mkdirTree("/" + m.install_root);
    return m;
  }
  async function loadStrings(language, progress = () => {}) {
    const m = await manifest("Strings");
    const entry = m.files.find(f => f.path === language + "/STRINGS.INI");
    if (!entry) throw Error("Strings release is missing " + language + ".INI");
    await file(m, entry, phase => progress(phase, "STRINGS", 1, 1));
  }
  const showProgress = (phase, detail, done, total) => Module.setStatus(phase + "... " + detail + " " + done + "/" + total);
  Module.clawLanguages = {};
  Module.clawRequestLanguage = function(pack) {
    if (Module.clawLanguages[pack]?.status >= 0) return;
    const state = Module.clawLanguages[pack] = {
      status: 0,
      progress: 0
    };
    Module.clawLanguageDownloadActive = true;
    load(pack, 0, (phase, detail, done, total, overall) => {
      state.progress = overall;
      showProgress(phase, detail, done, total);
    }).then(() => loadStrings(pack, (phase, detail, done, total) => showProgress(phase, detail, done, total))).then(() => {
      state.status = 1;
      Module.clawSelectedLanguage = pack;
      Module.clawLanguageDownloadActive = false;
      Module.setStatus("");
    }).catch(error => {
      state.status = -1;
      state.error = String(error);
      Module.clawLanguageDownloadActive = false;
      Module.setStatus("Language download failed. Press Enter to retry.");
      console.error(error);
    });
  };
  Module.clawLevels = {};
  Module.clawRequestLevel = function(level, audioLanguage = Module.clawSelectedLanguage) {
    if (Module.clawLevels[level] && Module.clawLevels[level].language === audioLanguage) return;
    const state = Module.clawLevels[level] = {
      status: 0,
      progress: 0,
      language: audioLanguage
    };
    if (!Number.isInteger(level) || level < 1 || level > 14) {
      state.status = -1;
      return;
    }
    ((async () => {
      await load("BaseAssets", level, (_phase, _detail, _done, _total, overall) => {
        state.progress = overall * .8;
      });
      if (audioLanguage) await load(audioLanguage, level, (_phase, _detail, _done, _total, overall) => {
        state.progress = .8 + overall * .2;
      });
      state.status = 1;
      Module.setStatus("");
    }))().catch(error => {
      state.status = -1;
      state.error = String(error);
      console.error(error);
      Module.setStatus("Level download failed. Retry from the menu.");
    });
  };
  Module.preRun = Module.preRun || [];
  Module.preRun.push(function() {
    addRunDependency("release-assets");
    ((async () => {
      await Module.clawStorageReady;
      FS.mkdirTree("/BaseAssets/LOADINGS");
      FS.mkdirTree("/BaseAssets/MUSICS");
      FS.mkdirTree("/BaseAssets/PALETTES");
      FS.mkdirTree("/BaseAssets/WORLDS");
      for (let i = 1; i <= 14; i++) {
        FS.mkdirTree("/BaseAssets/LEVEL" + i);
        FS.mkdirTree("/BaseAssets/TILES/LEVEL" + i);
      }
      await load("BaseAssets", 0, showProgress);
      let language = "", audioLanguage = "";
      try {
        const ini = FS.readFile("/save/settings.ini", {
          encoding: "utf8"
        });
        const section = ini.match(/\[General\]([^]*?)(?=\n\[|$)/i)?.[1] || "";
        language = section.match(/^\s*Language\s*=\s*([A-Z]{2})\s*$/m)?.[1] || "";
        audioLanguage = section.match(/^\s*AudioLanguage\s*=\s*([A-Z]{2})\s*$/m)?.[1] || language;
      } catch (_) {}
      // PLAY/comparison startup uses EN even when no saved language exists.
      if (Module.clawComparisonArguments?.().length) language = "EN";
      if (globalThis.clawDiscordActivity?.quickPlayLevel) {
        language = language || "EN";
        audioLanguage = audioLanguage || language;
      }
      if (packs.has(language) && language !== "BaseAssets") {
        await load(language, 0, showProgress);
        await loadStrings(language, showProgress);
        Module.clawLanguages[language] = {
          status: 1
        };
        Module.clawSelectedLanguage = language;
      }
      if (packs.has(audioLanguage) && audioLanguage !== "BaseAssets" && audioLanguage !== language) {
        await load(audioLanguage, 0, showProgress);
        await loadStrings(audioLanguage, showProgress);
        Module.clawLanguages[audioLanguage] = {
          status: 1
        };
      }
      Module.setStatus("");
      removeRunDependency("release-assets");
    }))().catch(error => {
      console.error(error);
      Module.clawFail("Asset download failed. Check your connection and reload. " + error);
    });
  });
  // Pure validation is also exercised without an Emscripten runtime in Node tests.
  Module.clawAssetValidation = {
    validate,
    levelOf,
    safePath
  };
})();

// end include: D:/Projects/Claw2/src/platform/web/release-assets.js
// include: D:/Projects/Claw2/src/platform/web/text-shader.js
Module.clawRenderText = function(input, output, width, height) {
  let state = Module.clawTextShader;
  if (!state) {
    const canvas = document.createElement("canvas");
    const gl = canvas.getContext("webgl", {
      alpha: true,
      premultipliedAlpha: false,
      antialias: false
    });
    if (!gl) throw new Error("WebGL niedostępny");
    const compile = (type, source) => {
      const shader = gl.createShader(type);
      gl.shaderSource(shader, source);
      gl.compileShader(shader);
      if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
        const log = gl.getShaderInfoLog(shader);
        gl.deleteShader(shader);
        throw new Error(log);
      }
      return shader;
    };
    // Keep shader code paired with the material uniforms in this web build.
    const source = (Module.clawTextShaderSource || FS.readFile("/BaseAssets/SHADERS/SHADEDTEXT.FRAG", {
      encoding: "utf8"
    })).replace(/gl_TexCoord\[0\]\.xy/g, "uv");
    const vertex = compile(gl.VERTEX_SHADER, "attribute vec2 position; varying vec2 uv; void main(){uv=(position+1.0)*0.5;gl_Position=vec4(position,0.0,1.0);}");
    const fragment = compile(gl.FRAGMENT_SHADER, "precision highp float; precision highp sampler2D; varying vec2 uv;\n" + source);
    const program = gl.createProgram();
    gl.attachShader(program, vertex);
    gl.attachShader(program, fragment);
    gl.linkProgram(program);
    gl.deleteShader(vertex);
    gl.deleteShader(fragment);
    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) throw new Error(gl.getProgramInfoLog(program));
    const buffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([ -1, -1, 1, -1, -1, 1, -1, 1, 1, -1, 1, 1 ]), gl.STATIC_DRAW);
    state = Module.clawTextShader = {
      canvas,
      gl,
      program,
      buffer,
      texture: gl.createTexture()
    };
  }
  const {canvas, gl, program, buffer, texture} = state;
  canvas.width = width;
  canvas.height = height;
  gl.viewport(0, 0, width, height);
  gl.disable(gl.BLEND);
  gl.useProgram(program);
  gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
  const position = gl.getAttribLocation(program, "position");
  gl.enableVertexAttribArray(position);
  gl.vertexAttribPointer(position, 2, gl.FLOAT, false, 0, 0);
  gl.activeTexture(gl.TEXTURE0);
  gl.bindTexture(gl.TEXTURE_2D, texture);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
  gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, width, height, 0, gl.RGBA, gl.UNSIGNED_BYTE, HEAPU8.subarray(input, input + width * height * 4));
  gl.uniform1i(gl.getUniformLocation(program, "texture"), 0);
  gl.uniform2f(gl.getUniformLocation(program, "resolution"), width, height);
  for (const [name, value] of Object.entries(Module.clawTextUniforms)) {
    const location = gl.getUniformLocation(program, name);
    if (value.length === 1) gl.uniform1f(location, value[0]); else if (value.length === 2) gl.uniform2fv(location, value); else gl.uniform4fv(location, value);
  }
  gl.drawArrays(gl.TRIANGLES, 0, 6);
  gl.readPixels(0, 0, width, height, gl.RGBA, gl.UNSIGNED_BYTE, HEAPU8.subarray(output, output + width * height * 4));
  if (gl.getError() !== gl.NO_ERROR) throw new Error("Błąd renderowania materiału tekstu");
};

Module.clawRenderPalette = function(input, palette, output, width, height, paletteHeight, colors, shaderSource) {
  shaderSource = UTF8ToString(shaderSource);
  let state = Module.clawPaletteShader;
  if (!state || state.source !== shaderSource) {
    const canvas = state ? state.canvas : document.createElement("canvas");
    const gl = state ? state.gl : canvas.getContext("webgl", {
      alpha: true,
      premultipliedAlpha: false,
      antialias: false
    });
    if (!gl) throw new Error("WebGL unavailable");
    const compile = (type, source) => {
      const shader = gl.createShader(type);
      gl.shaderSource(shader, source);
      gl.compileShader(shader);
      if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
        const log = gl.getShaderInfoLog(shader);
        gl.deleteShader(shader);
        throw new Error(log);
      }
      return shader;
    };
    const fragment = shaderSource.replace(/^\s*#version[^\n]*\n/, "").replace(/gl_TexCoord\[0\]\.xy/g, "uv").replace(/\bgl_Color\b/g, "vec4(1.0)");
    const vertex = compile(gl.VERTEX_SHADER, "attribute vec2 position; varying vec2 uv; void main(){uv=(position+1.0)*0.5;gl_Position=vec4(position,0.0,1.0);}");
    const pixel = compile(gl.FRAGMENT_SHADER, "precision highp float; varying vec2 uv;\n" + fragment);
    const program = gl.createProgram();
    gl.attachShader(program, vertex);
    gl.attachShader(program, pixel);
    gl.linkProgram(program);
    gl.deleteShader(vertex);
    gl.deleteShader(pixel);
    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) throw new Error(gl.getProgramInfoLog(program));
    const buffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([ -1, -1, 1, -1, -1, 1, -1, 1, 1, -1, 1, 1 ]), gl.STATIC_DRAW);
    state = Module.clawPaletteShader = {
      canvas,
      gl,
      program,
      buffer,
      textures: [ gl.createTexture(), gl.createTexture() ],
      source: shaderSource
    };
  }
  const {canvas, gl, program, buffer, textures} = state;
  canvas.width = width;
  canvas.height = height;
  gl.viewport(0, 0, width, height);
  gl.disable(gl.BLEND);
  gl.useProgram(program);
  gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
  const position = gl.getAttribLocation(program, "position");
  gl.enableVertexAttribArray(position);
  gl.vertexAttribPointer(position, 2, gl.FLOAT, false, 0, 0);
  const upload = (unit, texture, w, h, pixels) => {
    gl.activeTexture(gl.TEXTURE0 + unit);
    gl.bindTexture(gl.TEXTURE_2D, texture);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, w, h, 0, gl.RGBA, gl.UNSIGNED_BYTE, pixels);
  };
  gl.pixelStorei(gl.UNPACK_ALIGNMENT, 1);
  gl.pixelStorei(gl.PACK_ALIGNMENT, 1);
  upload(0, textures[0], width, height, HEAPU8.subarray(input, input + width * height * 4));
  upload(1, textures[1], 256, paletteHeight, HEAPU8.subarray(palette, palette + 256 * paletteHeight * 4));
  gl.uniform1i(gl.getUniformLocation(program, "texture"), 0);
  gl.uniform1i(gl.getUniformLocation(program, "palette"), 1);
  gl.uniform1f(gl.getUniformLocation(program, "paletteHeight"), paletteHeight);
  const names = [ "hatColor", "coatColor", "trousersColor", "bootsColor" ];
  for (let i = 0; i < 4; i++) gl.uniform4f(gl.getUniformLocation(program, names[i]), HEAPU8[colors + i * 3] / 255, HEAPU8[colors + i * 3 + 1] / 255, HEAPU8[colors + i * 3 + 2] / 255, 1);
  gl.drawArrays(gl.TRIANGLES, 0, 6);
  gl.readPixels(0, 0, width, height, gl.RGBA, gl.UNSIGNED_BYTE, HEAPU8.subarray(output, output + width * height * 4));
  if (gl.getError() !== gl.NO_ERROR) throw new Error("WebGL Claw recolor failed");
};

// end include: D:/Projects/Claw2/src/platform/web/text-shader.js
// include: D:/Projects/Claw2/src/platform/web/storage.js
Module.preRun = Module.preRun || [];

Module.clawStorageReady = new Promise(resolve => {
  Module.clawStorageResolved = resolve;
});

Module.preRun.push(function() {
  if (Module.clawStorageStarted) return;
  Module.clawStorageStarted = true;
  addRunDependency("claw-storage");
  try {
    FS.mkdirTree("/save");
    FS.mount(IDBFS, {
      autoPersist: true
    }, "/save");
  } catch (error) {
    Module.setStatus("Błąd montowania zapisów: " + error);
    console.error(error);
    return;
  }
  FS.syncfs(true, function(error) {
    if (error) {
      Module.setStatus("Nie można odczytać zapisów: " + error);
      return;
    }
    FS.chdir("/");
    Module.clawStorageResolved();
    removeRunDependency("claw-storage");
  });
});

Module.clawSync = function() {
  FS.syncfs(false, function(error) {
    if (error) Module.setStatus("Błąd synchronizacji zapisów: " + error);
  });
};

Module.clawSyncAsync = function() {
  return new Promise((resolve, reject) => FS.syncfs(false, function(error) {
    if (error) {
      Module.setStatus("Save storage could not be synchronized: " + error);
      reject(error);
      return;
    }
    resolve();
  }));
};

Module.clawExportSave = function() {
  try {
    const bytes = FS.readFile("/save/CLAW.USR");
    const url = URL.createObjectURL(new Blob([ bytes ], {
      type: "application/octet-stream"
    }));
    const link = document.createElement("a");
    link.href = url;
    link.download = "CLAW.USR";
    link.click();
    setTimeout(() => URL.revokeObjectURL(url), 1e3);
  } catch (error) {
    Module.setStatus("Save export failed: " + error);
    console.error(error);
  }
};

Module.clawImportSave = function() {
  const input = document.createElement("input");
  input.type = "file";
  input.accept = ".usr,application/octet-stream";
  input.onchange = async () => {
    if (!input.files || input.files.length === 0) return;
    try {
      const file = input.files[0];
      if (file.size > 10 * 1024 * 1024) throw new Error("The selected save file is too large.");
      const bytes = new Uint8Array(await file.arrayBuffer());
      if (!Module.ccall("clawValidateUserProfile", "number", [ "array", "number" ], [ bytes, bytes.length ])) {
        throw new Error("The selected file is not a valid Claw save.");
      }
      FS.writeFile("/save/CLAW.USR", bytes);
      await Module.clawSyncAsync();
      location.reload();
    } catch (error) {
      Module.setStatus("Save import failed: " + error);
      console.error(error);
    }
  };
  input.click();
};

// end include: D:/Projects/Claw2/src/platform/web/storage.js
var programArgs = [];

var thisProgram = "./this.program";

var quit_ = (status, toThrow) => {
  throw toThrow;
};

// In MODULARIZE mode _scriptName needs to be captured already at the very top of the page immediately when the page is parsed, so it is generated there
// before the page load. In non-MODULARIZE modes generate it here.
var _scriptName = globalThis.document?.currentScript?.src;

// `/` should be present at the end if `scriptDirectory` is not empty
var scriptDirectory = "";

function locateFile(path) {
  if (Module["locateFile"]) {
    return Module["locateFile"](path, scriptDirectory);
  }
  return scriptDirectory + path;
}

// Hooks that are implemented differently in different runtime environments.
var readAsync, readBinary;

if (ENVIRONMENT_IS_SHELL) {} else // Note that this includes Node.js workers when relevant (pthreads is enabled).
// Node.js workers are detected as a combination of ENVIRONMENT_IS_WORKER and
// ENVIRONMENT_IS_NODE.
if (ENVIRONMENT_IS_WEB || ENVIRONMENT_IS_WORKER) {
  try {
    scriptDirectory = new URL(".", _scriptName).href;
  } catch {}
  if (!(globalThis.window || globalThis.WorkerGlobalScope)) throw new Error("not compiled for this environment (did you build to HTML and try to run it not on the web, or set ENVIRONMENT to something - like node - and run it someplace else - like on the web?)");
  {
    // include: web_or_worker_shell_read.js
    readAsync = async url => {
      assert(!isFileURI(url), "readAsync does not work with file:// URLs");
      var response = await fetch(url, {
        credentials: "same-origin"
      });
      if (response.ok) {
        return response.arrayBuffer();
      }
      throw new Error(response.status + " : " + response.url);
    };
  }
} else {
  throw new Error("environment detection error");
}

var out = console.log.bind(console);

var err = console.error.bind(console);

// perform assertions in shell.js after we set up out() and err(), as otherwise
// if an assertion fails it cannot print the message
assert(!ENVIRONMENT_IS_WORKER, "worker environment detected but not enabled at build time (add `worker` to `-sENVIRONMENT` to enable)");

assert(!ENVIRONMENT_IS_NODE, "node environment detected but not enabled at build time (add `node` to `-sENVIRONMENT` to enable)");

assert(!ENVIRONMENT_IS_SHELL, "shell environment detected but not enabled at build time (add `shell` to `-sENVIRONMENT` to enable)");

// end include: shell.js
// include: preamble.js
// === Preamble library stuff ===
// Documentation for the public APIs defined in this file must be updated in:
//    site/source/docs/api_reference/preamble.js.rst
// A prebuilt local version of the documentation is available at:
//    site/build/text/docs/api_reference/preamble.js.txt
// You can also build docs locally as HTML or other formats in site/
// An online HTML version (which may be of a different version of Emscripten)
//    is up at http://kripken.github.io/emscripten-site/docs/api_reference/preamble.js.html
var wasmBinary;

if (!globalThis.WebAssembly) {
  err("no native wasm support detected");
}

// Wasm globals
//========================================
// Runtime essentials
//========================================
// whether we are quitting the application. no code should run after this.
// set in exit() and abort()
var ABORT = false;

// set by exit() and abort().  Passed to 'onExit' handler.
// NOTE: This is also used as the process return code in shell environments
// but only when noExitRuntime is false.
var EXITSTATUS;

// In STRICT mode, we only define assert() when ASSERTIONS is set.  i.e. we
// don't define it at all in release modes.  This matches the behaviour of
// MINIMAL_RUNTIME.
// TODO(sbc): Make this the default even without STRICT enabled.
/** @type {function(*, string=)} */ function assert(condition, text) {
  if (!condition) {
    abort("Assertion failed" + (text ? ": " + text : ""));
  }
}

// We used to include malloc/free by default in the past. Show a helpful error in
// builds with assertions.
/**
 * Indicates whether filename is delivered via file protocol (as opposed to http/https)
 * @noinline
 */ var isFileURI = filename => filename.startsWith("file://");

// include: runtime_common.js
// include: runtime_exceptions.js
// Base Emscripten EH error class
class EmscriptenEH extends Error {}

class EmscriptenSjLj extends EmscriptenEH {}

class CppException extends EmscriptenEH {
  constructor(excPtr) {
    super(excPtr);
    this.excPtr = excPtr;
    const excInfo = getExceptionMessage(this);
    this.name = excInfo[0];
    this.message = excInfo[1];
  }
}

// end include: runtime_exceptions.js
// include: runtime_debug.js
var runtimeDebug = true;

// Endianness check
((() => {
  const h16 = new Int16Array(1);
  const h8 = new Int8Array(h16.buffer);
  h16[0] = 25459;
  if (h8[0] !== 115 || h8[1] !== 99) abort("Runtime error: expected the system to be little-endian! (Run with -sSUPPORT_BIG_ENDIAN to bypass)");
}))();

function consumedModuleProp(prop) {
  let value = Module[prop];
  const msg = `Attempt to modify \`Module.${prop}\` after it has already been processed.  This can happen, for example, when code is injected via '--post-js' rather than '--pre-js'`;
  if (Array.isArray(value)) {
    value = new Proxy(value, {
      set(target, key, val) {
        abort(msg);
        return false;
      },
      defineProperty(target, key, descriptor) {
        abort(msg);
        return false;
      },
      deleteProperty(target, key) {
        abort(msg);
        return false;
      }
    });
  }
  Object.defineProperty(Module, prop, {
    configurable: true,
    get() {
      return value;
    },
    set() {
      abort(msg);
    }
  });
}

function makeInvalidEarlyAccess(name) {
  return () => assert(false, `call to '${name}' via reference taken before Wasm module initialization`);
}

function ignoredModuleProp(prop) {
  if (Object.getOwnPropertyDescriptor(Module, prop)) {
    abort(`\`Module.${prop}\` was supplied but \`${prop}\` not included in INCOMING_MODULE_JS_API`);
  }
}

// forcing the filesystem exports a few things by default
function isExportedByForceFilesystem(name) {
  return name === "FS_createPath" || name === "FS_createDataFile" || name === "FS_createPreloadedFile" || name === "FS_preloadFile" || name === "FS_unlink" || name === "addRunDependency" || // The old FS has some functionality that WasmFS lacks.
  name === "FS_createLazyFile" || name === "FS_createDevice" || name === "removeRunDependency";
}

/**
 * Intercept access to a symbols in the global symbol.  This enables us to give
 * informative warnings/errors when folks attempt to use symbols they did not
 * include in their build, or no symbols that no longer exist.
 *
 * We don't define this in MODULARIZE mode since in that mode emscripten symbols
 * are never placed in the global scope.
 */ function hookGlobalSymbolAccess(sym, func) {
  if (!Object.getOwnPropertyDescriptor(globalThis, sym)) {
    Object.defineProperty(globalThis, sym, {
      configurable: true,
      get() {
        func();
        return undefined;
      }
    });
  }
}

function missingGlobal(sym, msg) {
  hookGlobalSymbolAccess(sym, () => {
    warnOnce(`\`${sym}\` is no longer defined by emscripten. ${msg}`);
  });
}

missingGlobal("buffer", "Please use HEAP8.buffer or wasmMemory.buffer");

missingGlobal("asm", "Please use wasmExports instead");

function missingLibrarySymbol(sym) {
  hookGlobalSymbolAccess(sym, () => {
    // Can't `abort()` here because it would break code that does runtime
    // checks.  e.g. `if (typeof SDL === 'undefined')`.
    let msg = `\`${sym}\` is a library symbol and not included by default; add it to your library.js __deps or to DEFAULT_LIBRARY_FUNCS_TO_INCLUDE on the command line`;
    // DEFAULT_LIBRARY_FUNCS_TO_INCLUDE requires the name as it appears in
    // library.js, which means $name for a JS name with no prefix, or name
    // for a JS name like _name.
    let librarySymbol = sym;
    if (!librarySymbol.startsWith("_")) {
      librarySymbol = "$" + sym;
    }
    msg += ` (e.g. -sDEFAULT_LIBRARY_FUNCS_TO_INCLUDE='${librarySymbol}')`;
    if (isExportedByForceFilesystem(sym)) {
      msg += ". Alternatively, forcing filesystem support (-sFORCE_FILESYSTEM) can export this for you";
    }
    warnOnce(msg);
  });
  // Any symbol that is not included from the JS library is also (by definition)
  // not exported on the Module object.
  unexportedRuntimeSymbol(sym);
}

function unexportedRuntimeSymbol(sym) {
  if (!Object.getOwnPropertyDescriptor(Module, sym)) {
    Object.defineProperty(Module, sym, {
      configurable: true,
      get() {
        let msg = `'${sym}' was not exported. add it to EXPORTED_RUNTIME_METHODS (see the Emscripten FAQ)`;
        if (isExportedByForceFilesystem(sym)) {
          msg += ". Alternatively, forcing filesystem support (-sFORCE_FILESYSTEM) can export this for you";
        }
        abort(msg);
      }
    });
  }
}

// end include: runtime_debug.js
// include: runtime_stack_check.js
const stackCookie1 = 34821223;

const stackCookie2 = 2310721022;

// Initializes the stack cookie. Called at the startup of main and at the startup of each thread in pthreads mode.
function writeStackCookie() {
  let max = _emscripten_stack_get_end();
  assert((max & 3) == 0);
  // If the stack ends at address zero we write our cookies 4 bytes into the
  // stack.  This prevents interference with SAFE_HEAP and ASAN which also
  // monitor writes to address zero.
  if (max == 0) {
    max += 4;
  }
  // The stack grow downwards towards _emscripten_stack_get_end.
  // We write cookies to the final two words in the stack and detect if they are
  // ever overwritten.
  HEAPU32[((max) >> 2)] = stackCookie1;
  HEAPU32[(((max) + (4)) >> 2)] = stackCookie2;
  // Also test the global address 0 for integrity.
  HEAPU32[((0) >> 2)] = 1668509029;
}

function u32ToHexString(num) {
  return "0x" + (num >>> 0).toString(16).padStart(8, "0");
}

function checkStackCookie() {
  if (ABORT) return;
  let max = _emscripten_stack_get_end();
  // See writeStackCookie().
  if (max == 0) {
    max += 4;
  }
  const val1 = HEAPU32[((max) >> 2)];
  const val2 = HEAPU32[(((max) + (4)) >> 2)];
  if (val1 != stackCookie1 || val2 != stackCookie2) {
    abort(`Stack overflow! Stack cookie has been overwritten at ${ptrToString(max)}, expected hex dwords ${u32ToHexString(stackCookie2)} and ${u32ToHexString(stackCookie1)}, but received ${u32ToHexString(val2)} ${u32ToHexString(val1)}`);
  }
  // Also test the global address 0 for integrity.
  if (HEAPU32[((0) >> 2)] != 1668509029) {
    abort("Runtime error: The application has corrupted its heap memory area (address zero)!");
  }
}

// end include: runtime_stack_check.js
// Memory management
var runtimeInitialized = false;

// When ALLOW_MEMORY_GROWTH is enabled, the conversion from Wasm
// memory to ArrayBuffer requires some additional logic.
function getMemoryBuffer() {
  return wasmMemory.buffer;
}

function updateMemoryViews() {
  // If we already have a heap that is resizeable/growable buffer we don't
  // need to do anything in updateMemoryViews.
  if (HEAP8?.buffer?.resizable) return;
  var b = getMemoryBuffer();
  HEAP8 = new Int8Array(b);
  HEAP16 = new Int16Array(b);
  HEAPU8 = new Uint8Array(b);
  HEAPU16 = new Uint16Array(b);
  HEAP32 = new Int32Array(b);
  HEAPU32 = new Uint32Array(b);
  HEAPF32 = new Float32Array(b);
  HEAPF64 = new Float64Array(b);
  HEAP64 = new BigInt64Array(b);
  HEAPU64 = new BigUint64Array(b);
}

// include: memoryprofiler.js
// end include: memoryprofiler.js
// end include: runtime_common.js
assert(globalThis.Int32Array && globalThis.Float64Array && Int32Array.prototype.subarray && Int32Array.prototype.set, "JS engine does not provide full typed array support");

function preRun() {
  var preRun = Module["preRun"];
  if (preRun) {
    if (typeof preRun === "function") preRun = [ preRun ];
    onPreRuns.push(...preRun);
  }
  consumedModuleProp("preRun");
  // Begin ATPRERUNS hooks
  callRuntimeCallbacks(onPreRuns);
}

function initRuntime() {
  assert(!runtimeInitialized);
  runtimeInitialized = true;
  checkStackCookie();
  // Begin ATINITS hooks
  if (!Module["noFSInit"] && !FS.initialized) FS.init();
  TTY.init();
  // End ATINITS hooks
  wasmExports["__wasm_call_ctors"]();
  // Begin ATPOSTCTORS hooks
  FS.ignorePermissions = false;
  // End ATPOSTCTORS hooks
  checkStackCookie();
}

function postRun() {
  checkStackCookie();
  var postRun = Module["postRun"];
  if (postRun) {
    if (typeof postRun === "function") postRun = [ postRun ];
    onPostRuns.push(...postRun);
  }
  consumedModuleProp("postRun");
  // Begin ATPOSTRUNS hooks
  callRuntimeCallbacks(onPostRuns);
}

/**
 * @param {string|number=} what
 */ function abort(what) {
  Module["onAbort"]?.(what);
  what = `Aborted(${what})`;
  // TODO(sbc): Should we remove printing and leave it up to whoever
  // catches the exception?
  err(what);
  ABORT = true;
  // Use a wasm runtime error, because a JS error might be seen as a foreign
  // exception, which means we'd run destructors on it. We need the error to
  // simply make the program stop.
  // FIXME This approach does not work in Wasm EH because it currently does not assume
  // all RuntimeErrors are from traps; it decides whether a RuntimeError is from
  // a trap or not based on a hidden field within the object. So at the moment
  // we don't have a way of throwing a wasm trap from JS. TODO Make a JS API that
  // allows this in the wasm spec.
  throw new WebAssembly.RuntimeError(what);
}

function createExportWrapper(name, func, nargs) {
  assert(func);
  return (...args) => {
    assert(runtimeInitialized, `native function \`${name}\` called before runtime initialization`);
    // Only assert for too many arguments. Too few can be valid since the missing arguments will be zero filled.
    assert(args.length <= nargs, `native function \`${name}\` called with ${args.length} args but expects ${nargs}`);
    return func(...args);
  };
}

var wasmBinaryFile;

function findWasmBinary() {
  return locateFile("Claw2.wasm");
}

function getBinarySync(file) {
  if (readBinary) {
    return readBinary(file);
  }
  // Throwing a plain string here, even though it not normally advisable since
  // this gets turning into an `abort` in instantiateArrayBuffer.
  throw "both async and sync fetching of the wasm failed";
}

async function getWasmBinary(binaryFile) {
  // If we don't have the binary yet, load it asynchronously using readAsync.
  if (!wasmBinary) {
    // Fetch the binary using readAsync
    try {
      var response = await readAsync(binaryFile);
      return new Uint8Array(response);
    } catch {}
  }
  // Otherwise, getBinarySync should be able to get it synchronously
  return getBinarySync(binaryFile);
}

async function instantiateArrayBuffer(binaryFile, imports) {
  try {
    var binary = await getWasmBinary(binaryFile);
    var instance = await WebAssembly.instantiate(binary, imports);
    return instance;
  } catch (reason) {
    err(`failed to asynchronously prepare wasm: ${reason}`);
    // Warn on some common problems.
    if (isFileURI(binaryFile)) {
      err(`warning: Loading from a file URI (${binaryFile}) is not supported in most browsers. See https://emscripten.org/docs/getting_started/FAQ.html#how-do-i-run-a-local-webserver-for-testing-why-does-my-program-stall-in-downloading-or-preparing`);
    }
    abort(reason);
  }
}

async function instantiateAsync(binary, binaryFile, imports) {
  if (!binary) {
    try {
      var response = fetch(binaryFile, {
        credentials: "same-origin"
      });
      var instantiationResult = await WebAssembly.instantiateStreaming(response, imports);
      return instantiationResult;
    } catch (reason) {
      // We expect the most common failure cause to be a bad MIME type for the binary,
      // in which case falling back to ArrayBuffer instantiation should work.
      err(`wasm streaming compile failed: ${reason}`);
      err("falling back to ArrayBuffer instantiation");
    }
  }
  return instantiateArrayBuffer(binaryFile, imports);
}

function getWasmImports() {
  // prepare imports
  var imports = {
    "env": wasmImports,
    "wasi_snapshot_preview1": wasmImports
  };
  return imports;
}

// Create the wasm instance.
// Receives the wasm imports, returns the exports.
async function createWasm() {
  // Load the wasm module and create an instance of using native support in the JS engine.
  // handle a generated wasm instance, receiving its exports and
  // performing other necessary setup
  function receiveInstance(instance) {
    wasmExports = instance.exports;
    assignWasmExports(wasmExports);
    updateMemoryViews();
    return wasmExports;
  }
  // Prefer streaming instantiation if available.
  // Async compilation can be confusing when an error on the page overwrites Module
  // (for example, if the order of elements is wrong, and the one defining Module is
  // later), so we save Module and check it later.
  var trueModule = Module;
  function receiveInstantiationResult(result) {
    // 'result' is a ResultObject object which has both the module and instance.
    // receiveInstance() will swap in the exports (to Module.asm) so they can be called
    assert(Module === trueModule, "the Module object should not be replaced during async compilation - perhaps the order of HTML elements is wrong?");
    trueModule = null;
    // TODO: Due to Closure regression https://github.com/google/closure-compiler/issues/3193, the above line no longer optimizes out down to the following line.
    // When the regression is fixed, can restore the above PTHREADS-enabled path.
    return receiveInstance(result["instance"]);
  }
  var info = getWasmImports();
  // User shell pages can write their own Module.instantiateWasm = function(imports, successCallback) callback
  // to manually instantiate the Wasm module themselves. This allows pages to
  // run the instantiation parallel to any other async startup actions they are
  // performing.
  // Also pthreads and wasm workers initialize the wasm instance through this
  // path.
  var instantiateWasm = Module["instantiateWasm"];
  if (instantiateWasm) {
    return new Promise(resolve => {
      try {
        instantiateWasm(info, inst => resolve(receiveInstance(inst)));
      } catch (e) {
        err(`Module.instantiateWasm callback failed with error: ${e}`);
        throw e;
      }
    });
  }
  wasmBinaryFile ??= findWasmBinary();
  var result = await instantiateAsync(wasmBinary, wasmBinaryFile, info);
  var exports = receiveInstantiationResult(result);
  return exports;
}

// end include: preamble.js
// Begin JS library code
class ExitStatus {
  name="ExitStatus";
  constructor(status) {
    this.message = `Program terminated with exit(${status})`;
    this.status = status;
  }
}

/** @type {!Int32Array} */ var HEAP32;

/** @type {!Int8Array} */ var HEAP8;

/** @type {!Uint32Array} */ var HEAPU32;

var callRuntimeCallbacks = callbacks => {
  while (callbacks.length > 0) {
    // Pass the module as the first argument.
    callbacks.shift()(Module);
  }
};

var onPostRuns = [];

var onPreRuns = [];

var noExitRuntime = true;

function ptrToString(ptr) {
  assert(typeof ptr === "number", `ptrToString expects a number, got ${typeof ptr}`);
  // Convert to 32-bit unsigned value
  ptr >>>= 0;
  return "0x" + ptr.toString(16).padStart(8, "0");
}

var stackRestore = val => __emscripten_stack_restore(val);

var stackSave = () => _emscripten_stack_get_current();

var warnOnce = text => {
  warnOnce.shown ||= {};
  if (!warnOnce.shown[text]) {
    warnOnce.shown[text] = 1;
    err(text);
  }
};

var UTF8Decoder = globalThis.TextDecoder && new TextDecoder;

/**
   * heapOrArray is either a regular array, or a JavaScript typed array view.
   * @param {number} idx
   * @param {number=} maxBytesToRead
   * @param {boolean=} ignoreNul
   * @return {number}
   */ var findStringEnd = (heapOrArray, idx, maxBytesToRead, ignoreNul) => {
  var maxIdx = idx + maxBytesToRead;
  if (ignoreNul) return maxIdx;
  // TextDecoder needs to know the byte length in advance, it doesn't stop on
  // null terminator by itself.
  // As a tiny code save trick, compare idx against maxIdx using a negation,
  // so that maxBytesToRead=undefined/NaN means Infinity.
  while (heapOrArray[idx] && !(idx >= maxIdx)) ++idx;
  return idx;
};

/**
   * Given a pointer 'idx' to a null-terminated UTF8-encoded string in the given
   * array that contains uint8 values, returns a copy of that string as a
   * Javascript String object.
   * heapOrArray is either a regular array, or a JavaScript typed array view.
   * @param {number=} idx
   * @param {number=} maxBytesToRead
   * @param {boolean=} ignoreNul - If true, the function will not stop on a NUL character.
   * @return {string}
   */ var UTF8ArrayToString = (heapOrArray, idx = 0, maxBytesToRead, ignoreNul) => {
  var endPtr = findStringEnd(heapOrArray, idx, maxBytesToRead, ignoreNul);
  // When using conditional TextDecoder, skip it for short strings as the overhead of the native call is not worth it.
  if (endPtr - idx > 16 && heapOrArray.buffer && UTF8Decoder) {
    return UTF8Decoder.decode(heapOrArray.subarray(idx, endPtr));
  }
  var str = "";
  while (idx < endPtr) {
    // For UTF8 byte structure, see:
    // http://en.wikipedia.org/wiki/UTF-8#Description
    // https://www.ietf.org/rfc/rfc2279.txt
    // https://tools.ietf.org/html/rfc3629
    var u0 = heapOrArray[idx++];
    if (!(u0 & 128)) {
      str += String.fromCharCode(u0);
      continue;
    }
    var u1 = heapOrArray[idx++] & 63;
    if ((u0 & 224) == 192) {
      str += String.fromCharCode(((u0 & 31) << 6) | u1);
      continue;
    }
    var u2 = heapOrArray[idx++] & 63;
    if ((u0 & 240) == 224) {
      u0 = ((u0 & 15) << 12) | (u1 << 6) | u2;
    } else {
      if ((u0 & 248) != 240) warnOnce(`Invalid UTF-8 leading byte ${ptrToString(u0)} encountered when deserializing a UTF-8 string in wasm memory to a JS string!`);
      u0 = ((u0 & 7) << 18) | (u1 << 12) | (u2 << 6) | (heapOrArray[idx++] & 63);
    }
    if (u0 < 65536) {
      str += String.fromCharCode(u0);
    } else {
      var ch = u0 - 65536;
      str += String.fromCharCode(55296 | (ch >> 10), 56320 | (ch & 1023));
    }
  }
  return str;
};

/** @type {!Uint8Array} */ var HEAPU8;

/**
   * Given a pointer 'ptr' to a null-terminated UTF8-encoded string in the
   * emscripten HEAP, returns a copy of that string as a Javascript String object.
   *
   * @param {number} ptr
   * @param {number=} maxBytesToRead - An optional length that specifies the
   *   maximum number of bytes to read. You can omit this parameter to scan the
   *   string until the first 0 byte. If maxBytesToRead is passed, and the string
   *   at [ptr, ptr+maxBytesToReadr[ contains a null byte in the middle, then the
   *   string will cut short at that byte index.
   * @param {boolean=} ignoreNul - If true, the function will not stop on a NUL character.
   * @return {string}
   */ var UTF8ToString = (ptr, maxBytesToRead, ignoreNul) => {
  assert(typeof ptr === "number", `UTF8ToString expects a number (got ${typeof ptr})`);
  return ptr ? UTF8ArrayToString(HEAPU8, ptr, maxBytesToRead, ignoreNul) : "";
};

var ___assert_fail = (condition, filename, line, func) => abort(`Assertion failed: ${UTF8ToString(condition)}, at: ` + [ filename ? UTF8ToString(filename) : "unknown filename", line, func ? UTF8ToString(func) : "unknown function" ]);

var exceptionCaught = [];

var uncaughtExceptionCount = 0;

class ExceptionInfo {
  // excPtr - Thrown object pointer to wrap. Metadata pointer is calculated from it.
  constructor(excPtr) {
    this.excPtr = excPtr;
    this.ptr = excPtr - 24;
  }
  set_type(type) {
    HEAPU32[(((this.ptr) + (4)) >> 2)] = type;
  }
  get_type() {
    return HEAPU32[(((this.ptr) + (4)) >> 2)];
  }
  set_destructor(destructor) {
    HEAPU32[(((this.ptr) + (8)) >> 2)] = destructor;
  }
  get_destructor() {
    return HEAPU32[(((this.ptr) + (8)) >> 2)];
  }
  set_caught(caught) {
    caught = caught ? 1 : 0;
    HEAP8[(this.ptr) + (12)] = caught;
  }
  get_caught() {
    return HEAP8[(this.ptr) + (12)] != 0;
  }
  set_rethrown(rethrown) {
    rethrown = rethrown ? 1 : 0;
    HEAP8[(this.ptr) + (13)] = rethrown;
  }
  get_rethrown() {
    return HEAP8[(this.ptr) + (13)] != 0;
  }
  // Initialize native structure fields. Should be called once after allocated.
  init(type, destructor) {
    this.set_adjusted_ptr(0);
    this.set_type(type);
    this.set_destructor(destructor);
  }
  set_adjusted_ptr(adjustedPtr) {
    HEAPU32[(((this.ptr) + (16)) >> 2)] = adjustedPtr;
  }
  get_adjusted_ptr() {
    return HEAPU32[(((this.ptr) + (16)) >> 2)];
  }
}

var ___cxa_begin_catch = ptr => {
  var info = new ExceptionInfo(ptr);
  if (!info.get_caught()) {
    info.set_caught(true);
    uncaughtExceptionCount--;
  }
  info.set_rethrown(false);
  exceptionCaught.push(info);
  return ___cxa_get_exception_ptr(ptr);
};

var ___cxa_current_primary_exception = () => {
  if (!exceptionCaught.length) {
    return 0;
  }
  var info = exceptionCaught[exceptionCaught.length - 1];
  ___cxa_increment_exception_refcount(info.excPtr);
  return info.excPtr;
};

var exceptionLast = null;

var ___cxa_end_catch = () => {
  // Clear state flag.
  _setThrew(0, 0);
  assert(exceptionCaught.length > 0);
  // Call destructor if one is registered then clear it.
  var info = exceptionCaught.pop();
  ___cxa_decrement_exception_refcount(info.excPtr);
  exceptionLast = null;
};

var setTempRet0 = val => __emscripten_tempret_set(val);

var findMatchingCatch = args => {
  var thrown = exceptionLast?.excPtr;
  if (!thrown) {
    // just pass through the null ptr
    setTempRet0(0);
    return 0;
  }
  var info = new ExceptionInfo(thrown);
  info.set_adjusted_ptr(thrown);
  var thrownType = info.get_type();
  if (!thrownType) {
    // just pass through the thrown ptr
    setTempRet0(0);
    return thrown;
  }
  // can_catch receives a **, add indirection
  // The different catch blocks are denoted by different types.
  // Due to inheritance, those types may not precisely match the
  // type of the thrown object. Find one which matches, and
  // return the type of the catch block which should be called.
  for (var caughtType of args) {
    if (!caughtType || caughtType === thrownType) {
      // Catch all clause matched or exactly the same type is caught
      break;
    }
    var adjusted_ptr_addr = info.ptr + 16;
    if (___cxa_can_catch(caughtType, thrownType, adjusted_ptr_addr)) {
      setTempRet0(caughtType);
      return thrown;
    }
  }
  setTempRet0(thrownType);
  return thrown;
};

var ___cxa_find_matching_catch_2 = () => findMatchingCatch([]);

var ___cxa_find_matching_catch_3 = arg0 => findMatchingCatch([ arg0 ]);

var ___cxa_find_matching_catch_4 = (arg0, arg1) => findMatchingCatch([ arg0, arg1 ]);

var ___cxa_find_matching_catch_5 = (arg0, arg1, arg2) => findMatchingCatch([ arg0, arg1, arg2 ]);

var __Unwind_RaiseException = ex => {
  throw ex;
};

var ___cxa_rethrow = () => {
  if (!exceptionCaught.length) {
    abort("no exception to throw");
  }
  var info = exceptionCaught.at(-1);
  var ptr = info.excPtr;
  info.set_rethrown(true);
  info.set_caught(false);
  uncaughtExceptionCount++;
  ___cxa_increment_exception_refcount(ptr);
  ptr = exceptionLast = new CppException(ptr);
  __Unwind_RaiseException(ptr);
};

var ___cxa_rethrow_primary_exception = ptr => {
  if (!ptr) return;
  var info = new ExceptionInfo(ptr);
  info.set_rethrown(true);
  info.set_caught(false);
  uncaughtExceptionCount++;
  ___cxa_increment_exception_refcount(ptr);
  ptr = exceptionLast = new CppException(ptr);
  __Unwind_RaiseException(ptr);
};

var stackAlloc = sz => __emscripten_stack_alloc(sz);

var getExceptionMessageCommon = ptr => {
  var sp = stackSave();
  var type_addr_addr = stackAlloc(4);
  var message_addr_addr = stackAlloc(4);
  ___get_exception_message(ptr, type_addr_addr, message_addr_addr);
  var type_addr = HEAPU32[((type_addr_addr) >> 2)];
  var message_addr = HEAPU32[((message_addr_addr) >> 2)];
  var type = UTF8ToString(type_addr);
  _free(type_addr);
  var message;
  if (message_addr) {
    message = UTF8ToString(message_addr);
    _free(message_addr);
  }
  stackRestore(sp);
  return [ type, message ];
};

var getExceptionMessage = exn => getExceptionMessageCommon(exn.excPtr);

var ___cxa_throw = (ptr, type, destructor) => {
  var info = new ExceptionInfo(ptr);
  // Initialize ExceptionInfo content after it was allocated in __cxa_allocate_exception.
  info.init(type, destructor);
  ___cxa_increment_exception_refcount(ptr);
  ptr = exceptionLast = new CppException(ptr);
  uncaughtExceptionCount++;
  __Unwind_RaiseException(ptr);
};

var ___cxa_uncaught_exceptions = () => uncaughtExceptionCount;

var __Unwind_Resume = ex => {
  throw ex;
};

var ___resumeException = ptr => {
  ptr = exceptionLast ??= new CppException(ptr);
  __Unwind_Resume(ptr);
};

var PATH = {
  isAbs: path => path.charAt(0) === "/",
  splitPath: filename => {
    var splitPathRe = /^(\/?|)([\s\S]*?)((?:\.{1,2}|[^\/]+?|)(\.[^.\/]*|))(?:[\/]*)$/;
    return splitPathRe.exec(filename).slice(1);
  },
  normalizeArray: (parts, allowAboveRoot) => {
    // if the path tries to go above the root, `up` ends up > 0
    var up = 0;
    for (var i = parts.length - 1; i >= 0; i--) {
      var last = parts[i];
      if (last === ".") {
        parts.splice(i, 1);
      } else if (last === "..") {
        parts.splice(i, 1);
        up++;
      } else if (up) {
        parts.splice(i, 1);
        up--;
      }
    }
    // if the path is allowed to go above the root, restore leading ..s
    if (allowAboveRoot) {
      for (;up; up--) {
        parts.unshift("..");
      }
    }
    return parts;
  },
  normalize: path => {
    var isAbsolute = PATH.isAbs(path), trailingSlash = path.slice(-1) === "/";
    // Normalize the path
    path = PATH.normalizeArray(path.split("/").filter(p => !!p), !isAbsolute).join("/");
    if (!path && !isAbsolute) {
      path = ".";
    }
    if (path && trailingSlash) {
      path += "/";
    }
    return (isAbsolute ? "/" : "") + path;
  },
  dirname: path => {
    var result = PATH.splitPath(path), root = result[0], dir = result[1];
    if (!root && !dir) {
      // No dirname whatsoever
      return ".";
    }
    if (dir) {
      // It has a dirname, strip trailing slash
      dir = dir.slice(0, -1);
    }
    return root + dir;
  },
  basename: path => path && path.match(/([^\/]+|\/)\/*$/)[1],
  join: (...paths) => PATH.normalize(paths.join("/")),
  join2: (l, r) => PATH.normalize(l + "/" + r)
};

var initRandomFill = () => view => (crypto.getRandomValues(view), 0);

var randomFill = view => (randomFill = initRandomFill())(view);

var PATH_FS = {
  resolve: (...args) => {
    var resolvedPath = "", resolvedAbsolute = false;
    for (var i = args.length - 1; i >= -1 && !resolvedAbsolute; i--) {
      var path = (i >= 0) ? args[i] : FS.cwd();
      // Skip empty and invalid entries
      if (typeof path !== "string") {
        throw new TypeError("Arguments to path.resolve must be strings");
      } else if (!path) {
        return "";
      }
      resolvedPath = path + "/" + resolvedPath;
      resolvedAbsolute = PATH.isAbs(path);
    }
    // At this point the path should be resolved to a full absolute path, but
    // handle relative paths to be safe (might happen when process.cwd() fails)
    resolvedPath = PATH.normalizeArray(resolvedPath.split("/").filter(p => !!p), !resolvedAbsolute).join("/");
    return ((resolvedAbsolute ? "/" : "") + resolvedPath) || ".";
  },
  relative: (from, to) => {
    from = PATH_FS.resolve(from).slice(1);
    to = PATH_FS.resolve(to).slice(1);
    function trim(arr) {
      var start = 0;
      for (;start < arr.length; start++) {
        if (arr[start] !== "") break;
      }
      var end = arr.length - 1;
      for (;end >= 0; end--) {
        if (arr[end] !== "") break;
      }
      if (start > end) return [];
      return arr.slice(start, end - start + 1);
    }
    var fromParts = trim(from.split("/"));
    var toParts = trim(to.split("/"));
    var length = Math.min(fromParts.length, toParts.length);
    var samePartsLength = length;
    for (var i = 0; i < length; i++) {
      if (fromParts[i] !== toParts[i]) {
        samePartsLength = i;
        break;
      }
    }
    var outputParts = [];
    for (var i = samePartsLength; i < fromParts.length; i++) {
      outputParts.push("..");
    }
    outputParts = outputParts.concat(toParts.slice(samePartsLength));
    return outputParts.join("/");
  }
};

var FS_stdin_getChar_buffer = [];

var lengthBytesUTF8 = str => {
  var len = 0;
  for (var i = 0; i < str.length; ++i) {
    // Gotcha: charCodeAt returns a 16-bit word that is a UTF-16 encoded code
    // unit, not a Unicode code point of the character! So decode
    // UTF16->UTF32->UTF8.
    // See http://unicode.org/faq/utf_bom.html#utf16-3
    var c = str.charCodeAt(i);
    // possibly a lead surrogate
    if (c <= 127) {
      len++;
    } else if (c <= 2047) {
      len += 2;
    } else if (c >= 55296 && c <= 57343) {
      len += 4;
      ++i;
    } else {
      len += 3;
    }
  }
  return len;
};

var stringToUTF8Array = (str, heap, outIdx, maxBytesToWrite) => {
  assert(typeof str === "string", `stringToUTF8Array expects a string (got ${typeof str})`);
  // Parameter maxBytesToWrite is not optional. Negative values, 0, null,
  // undefined and false each don't write out any bytes.
  if (!(maxBytesToWrite > 0)) return 0;
  var startIdx = outIdx;
  var endIdx = outIdx + maxBytesToWrite - 1;
  // -1 for string null terminator.
  for (var i = 0; i < str.length; ++i) {
    // For UTF8 byte structure, see http://en.wikipedia.org/wiki/UTF-8#Description
    // and https://www.ietf.org/rfc/rfc2279.txt
    // and https://tools.ietf.org/html/rfc3629
    var u = str.codePointAt(i);
    if (u <= 127) {
      if (outIdx >= endIdx) break;
      heap[outIdx++] = u;
    } else if (u <= 2047) {
      if (outIdx + 1 >= endIdx) break;
      heap[outIdx++] = 192 | (u >> 6);
      heap[outIdx++] = 128 | (u & 63);
    } else if (u <= 65535) {
      if (outIdx + 2 >= endIdx) break;
      heap[outIdx++] = 224 | (u >> 12);
      heap[outIdx++] = 128 | ((u >> 6) & 63);
      heap[outIdx++] = 128 | (u & 63);
    } else {
      if (outIdx + 3 >= endIdx) break;
      if (u > 1114111) warnOnce(`Invalid Unicode code point ${ptrToString(u)} encountered when serializing a JS string to a UTF-8 string in wasm memory! (Valid unicode code points should be in range 0-0x10FFFF).`);
      heap[outIdx++] = 240 | (u >> 18);
      heap[outIdx++] = 128 | ((u >> 12) & 63);
      heap[outIdx++] = 128 | ((u >> 6) & 63);
      heap[outIdx++] = 128 | (u & 63);
      // Gotcha: if codePoint is over 0xFFFF, it is represented as a surrogate pair in UTF-16.
      // We need to manually skip over the second code unit for correct iteration.
      i++;
    }
  }
  // Null-terminate the pointer to the buffer.
  heap[outIdx] = 0;
  return outIdx - startIdx;
};

/** @type {function(string, boolean=, number=)} */ var intArrayFromString = (stringy, dontAddNull, length) => {
  var len = length > 0 ? length : lengthBytesUTF8(stringy) + 1;
  var u8array = new Array(len);
  var numBytesWritten = stringToUTF8Array(stringy, u8array, 0, u8array.length);
  if (dontAddNull) u8array.length = numBytesWritten;
  return u8array;
};

var FS_stdin_getChar = () => {
  if (!FS_stdin_getChar_buffer.length) {
    var result = null;
    if (globalThis.window?.prompt) {
      // Browser.
      result = window.prompt("Input: ");
      // returns null on cancel
      if (result !== null) {
        result += "\n";
      }
    } else {}
    if (!result) {
      return null;
    }
    FS_stdin_getChar_buffer = intArrayFromString(result, true);
  }
  return FS_stdin_getChar_buffer.shift();
};

var TTY = {
  ttys: [],
  init() {},
  shutdown() {},
  register(dev, ops) {
    TTY.ttys[dev] = {
      input: [],
      output: [],
      ops
    };
    FS.registerDevice(dev, TTY.stream_ops);
  },
  stream_ops: {
    open(stream) {
      var tty = TTY.ttys[stream.node.rdev];
      if (!tty) {
        throw new FS.ErrnoError(43);
      }
      stream.tty = tty;
      stream.seekable = false;
    },
    close(stream) {
      // flush any pending line data
      stream.tty.ops.fsync(stream.tty);
    },
    fsync(stream) {
      stream.tty.ops.fsync(stream.tty);
    },
    read(stream, buffer, offset, length, pos) {
      if (!stream.tty || !stream.tty.ops.get_char) {
        throw new FS.ErrnoError(60);
      }
      var bytesRead = 0;
      for (var i = 0; i < length; i++) {
        var result;
        try {
          result = stream.tty.ops.get_char(stream.tty);
        } catch (e) {
          throw new FS.ErrnoError(29);
        }
        if (result === undefined && !bytesRead) {
          throw new FS.ErrnoError(6);
        }
        if (result === null || result === undefined) break;
        bytesRead++;
        buffer[offset + i] = result;
        // We currently only support canonical mode (ICANON), where
        // read(2) returns as soon as a line delimiter is read.
        if (result === 10) break;
      }
      if (bytesRead) {
        stream.node.atime = Date.now();
      }
      return bytesRead;
    },
    write(stream, buffer, offset, length, pos) {
      if (!stream.tty || !stream.tty.ops.put_char) {
        throw new FS.ErrnoError(60);
      }
      try {
        for (var i = 0; i < length; i++) {
          stream.tty.ops.put_char(stream.tty, buffer[offset + i]);
        }
      } catch (e) {
        throw new FS.ErrnoError(29);
      }
      if (length) {
        stream.node.mtime = stream.node.ctime = Date.now();
      }
      return i;
    }
  },
  default_tty_ops: {
    get_char(tty) {
      return FS_stdin_getChar();
    },
    put_char(tty, val) {
      if (val === null || val === 10) {
        out(UTF8ArrayToString(tty.output));
        tty.output = [];
      } else {
        if (val != 0) tty.output.push(val);
      }
    },
    fsync(tty) {
      if (tty.output?.length > 0) {
        out(UTF8ArrayToString(tty.output));
        tty.output = [];
      }
    },
    ioctl_tcgets(tty) {
      // typical setting
      return {
        c_iflag: 25856,
        c_oflag: 5,
        c_cflag: 191,
        c_lflag: 35387,
        c_cc: [ 3, 28, 127, 21, 4, 0, 1, 0, 17, 19, 26, 0, 18, 15, 23, 22, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ]
      };
    },
    ioctl_tcsets(tty, optional_actions, data) {
      // currently just ignore
      return 0;
    },
    ioctl_tiocgwinsz(tty) {
      return [ 24, 80 ];
    }
  },
  default_tty1_ops: {
    put_char(tty, val) {
      if (val === null || val === 10) {
        err(UTF8ArrayToString(tty.output));
        tty.output = [];
      } else {
        if (val != 0) tty.output.push(val);
      }
    },
    fsync(tty) {
      if (tty.output?.length > 0) {
        err(UTF8ArrayToString(tty.output));
        tty.output = [];
      }
    }
  }
};

var mmapAlloc = size => {
  abort("internal error: mmapAlloc called but `emscripten_builtin_memalign` native symbol not exported");
};

var MEMFS = {
  ops_table: null,
  mount(mount) {
    return MEMFS.createNode(null, "/", 16895, 0);
  },
  createNode(parent, name, mode, dev = undefined) {
    if (FS.isBlkdev(mode) || FS.isFIFO(mode)) {
      // not supported
      throw new FS.ErrnoError(63);
    }
    MEMFS.ops_table ||= {
      dir: {
        node: {
          getattr: MEMFS.node_ops.getattr,
          setattr: MEMFS.node_ops.setattr,
          lookup: MEMFS.node_ops.lookup,
          mknod: MEMFS.node_ops.mknod,
          rename: MEMFS.node_ops.rename,
          unlink: MEMFS.node_ops.unlink,
          rmdir: MEMFS.node_ops.rmdir,
          readdir: MEMFS.node_ops.readdir,
          symlink: MEMFS.node_ops.symlink
        },
        stream: {
          llseek: MEMFS.stream_ops.llseek
        }
      },
      file: {
        node: {
          getattr: MEMFS.node_ops.getattr,
          setattr: MEMFS.node_ops.setattr
        },
        stream: {
          llseek: MEMFS.stream_ops.llseek,
          read: MEMFS.stream_ops.read,
          write: MEMFS.stream_ops.write,
          mmap: MEMFS.stream_ops.mmap,
          msync: MEMFS.stream_ops.msync
        }
      },
      link: {
        node: {
          getattr: MEMFS.node_ops.getattr,
          setattr: MEMFS.node_ops.setattr,
          readlink: MEMFS.node_ops.readlink
        },
        stream: {}
      },
      chrdev: {
        node: {
          getattr: MEMFS.node_ops.getattr,
          setattr: MEMFS.node_ops.setattr
        },
        stream: FS.chrdev_stream_ops
      }
    };
    var node = FS.createNode(parent, name, mode, dev);
    if (FS.isDir(node.mode)) {
      node.node_ops = MEMFS.ops_table.dir.node;
      node.stream_ops = MEMFS.ops_table.dir.stream;
      node.contents = {};
    } else if (FS.isFile(node.mode)) {
      node.node_ops = MEMFS.ops_table.file.node;
      node.stream_ops = MEMFS.ops_table.file.stream;
      // The actual number of bytes used in the typed array, as opposed to
      // contents.length which gives the whole capacity.
      node.usedBytes = 0;
      // The byte data of the file is stored in a typed array.
      // Note: typed arrays are not resizable like normal JS arrays are, so
      // there is a small penalty involved for appending file writes that
      // continuously grow a file similar to std::vector capacity vs used.
      node.contents = MEMFS.emptyFileContents ??= new Uint8Array(0);
    } else if (FS.isLink(node.mode)) {
      node.node_ops = MEMFS.ops_table.link.node;
      node.stream_ops = MEMFS.ops_table.link.stream;
    } else if (FS.isChrdev(node.mode)) {
      node.node_ops = MEMFS.ops_table.chrdev.node;
      node.stream_ops = MEMFS.ops_table.chrdev.stream;
    }
    node.atime = node.mtime = node.ctime = Date.now();
    // add the new node to the parent
    if (parent) {
      parent.contents[name] = node;
      parent.atime = parent.mtime = parent.ctime = node.atime;
    }
    return node;
  },
  getFileDataAsTypedArray(node) {
    assert(FS.isFile(node.mode), "getFileDataAsTypedArray called on non-file");
    return node.contents.subarray(0, node.usedBytes);
  },
  expandFileStorage(node, newCapacity) {
    var prevCapacity = node.contents.length;
    if (prevCapacity >= newCapacity) return;
    // No need to expand, the storage was already large enough.
    // Don't expand strictly to the given requested limit if it's only a very
    // small increase, but instead geometrically grow capacity.
    // For small filesizes (<1MB), perform size*2 geometric increase, but for
    // large sizes, do a much more conservative size*1.125 increase to avoid
    // overshooting the allocation cap by a very large margin.
    const CAPACITY_DOUBLING_MAX = 1024 * 1024;
    newCapacity = Math.max(newCapacity, (prevCapacity * (prevCapacity < CAPACITY_DOUBLING_MAX ? 2 : 1.125)) >>> 0);
    if (prevCapacity) newCapacity = Math.max(newCapacity, 256);
    // At minimum allocate 256b for each file when expanding.
    var oldContents = MEMFS.getFileDataAsTypedArray(node);
    node.contents = new Uint8Array(newCapacity);
    // Allocate new storage.
    node.contents.set(oldContents);
  },
  resizeFileStorage(node, newSize) {
    if (node.usedBytes == newSize) return;
    var oldContents = node.contents;
    node.contents = new Uint8Array(newSize);
    // Allocate new storage.
    node.contents.set(oldContents.subarray(0, Math.min(newSize, node.usedBytes)));
    // Copy old data over to the new storage.
    node.usedBytes = newSize;
  },
  node_ops: {
    getattr(node) {
      var attr = {};
      // device numbers reuse inode numbers.
      attr.dev = FS.isChrdev(node.mode) ? node.id : 1;
      attr.ino = node.id;
      attr.mode = node.mode;
      attr.nlink = 1;
      attr.uid = 0;
      attr.gid = 0;
      attr.rdev = node.rdev;
      if (FS.isDir(node.mode)) {
        attr.size = 4096;
      } else if (FS.isFile(node.mode)) {
        attr.size = node.usedBytes;
      } else if (FS.isLink(node.mode)) {
        attr.size = node.link.length;
      } else {
        attr.size = 0;
      }
      attr.atime = new Date(node.atime);
      attr.mtime = new Date(node.mtime);
      attr.ctime = new Date(node.ctime);
      // NOTE: In our implementation, st_blocks = Math.ceil(st_size/st_blksize),
      //       but this is not required by the standard.
      attr.blksize = 4096;
      attr.blocks = Math.ceil(attr.size / attr.blksize);
      return attr;
    },
    setattr(node, attr) {
      for (const key of [ "mode", "atime", "mtime", "ctime" ]) {
        if (attr[key] != null) {
          node[key] = attr[key];
        }
      }
      if (attr.size !== undefined) {
        MEMFS.resizeFileStorage(node, attr.size);
      }
    },
    lookup(parent, name) {
      throw new FS.ErrnoError(44);
    },
    mknod(parent, name, mode, dev = undefined) {
      return MEMFS.createNode(parent, name, mode, dev);
    },
    rename(old_node, new_dir, new_name) {
      var new_node;
      try {
        new_node = FS.lookupNode(new_dir, new_name);
      } catch (e) {}
      if (new_node && FS.isDir(old_node.mode)) {
        // if we're overwriting a directory at new_name, make sure it's empty.
        for (var i in new_node.contents) {
          throw new FS.ErrnoError(55);
        }
      }
      // do the internal rewiring
      delete old_node.parent.contents[old_node.name];
      new_dir.contents[new_name] = old_node;
      old_node.name = new_name;
      new_dir.ctime = new_dir.mtime = old_node.parent.ctime = old_node.parent.mtime = Date.now();
    },
    unlink(parent, name) {
      delete parent.contents[name];
      parent.ctime = parent.mtime = Date.now();
    },
    rmdir(parent, name) {
      var node = FS.lookupNode(parent, name);
      for (var i in node.contents) {
        throw new FS.ErrnoError(55);
      }
      delete parent.contents[name];
      parent.ctime = parent.mtime = Date.now();
    },
    readdir(node) {
      return [ ".", "..", ...Object.keys(node.contents) ];
    },
    symlink(parent, newname, oldpath) {
      var node = MEMFS.createNode(parent, newname, 511 | 40960, 0);
      node.link = oldpath;
      return node;
    },
    readlink(node) {
      if (!FS.isLink(node.mode)) {
        throw new FS.ErrnoError(28);
      }
      return node.link;
    }
  },
  stream_ops: {
    read(stream, buffer, offset, length, position) {
      var contents = stream.node.contents;
      if (position >= stream.node.usedBytes) return 0;
      var size = Math.min(stream.node.usedBytes - position, length);
      assert(size >= 0);
      buffer.set(contents.subarray(position, position + size), offset);
      return size;
    },
    write(stream, buffer, offset, length, position, canOwn) {
      assert(buffer.subarray, "FS.write expects a TypedArray");
      // If the buffer is located in main memory (HEAP), and if
      // memory can grow, we can't hold on to references of the
      // memory buffer, as they may get invalidated. That means we
      // need to copy its contents.
      if (buffer.buffer === HEAP8.buffer) {
        canOwn = false;
      }
      if (!length) return 0;
      var node = stream.node;
      node.mtime = node.ctime = Date.now();
      if (canOwn) {
        assert(!position, "canOwn must imply no weird position inside the file");
        node.contents = buffer.subarray(offset, offset + length);
        node.usedBytes = length;
      } else if (!node.usedBytes && !position) {
        // If this is a simple first write to an empty file, do a fast set since we don't need to care about old data.
        node.contents = buffer.slice(offset, offset + length);
        node.usedBytes = length;
      } else {
        MEMFS.expandFileStorage(node, position + length);
        // Use typed array write which is available.
        node.contents.set(buffer.subarray(offset, offset + length), position);
        node.usedBytes = Math.max(node.usedBytes, position + length);
      }
      return length;
    },
    llseek(stream, offset, whence) {
      var position = offset;
      if (whence === 1) {
        position += stream.position;
      } else if (whence === 2) {
        if (FS.isFile(stream.node.mode)) {
          position += stream.node.usedBytes;
        }
      }
      if (position < 0) {
        throw new FS.ErrnoError(28);
      }
      return position;
    },
    mmap(stream, length, position, prot, flags) {
      if (!FS.isFile(stream.node.mode)) {
        throw new FS.ErrnoError(43);
      }
      var ptr;
      var allocated;
      var contents = stream.node.contents;
      // Only make a new copy when MAP_PRIVATE is specified.
      if (!(flags & 2) && contents.buffer === HEAP8.buffer) {
        // We can't emulate MAP_SHARED when the file is not backed by the
        // buffer we're mapping to (e.g. the HEAP buffer).
        allocated = false;
        ptr = contents.byteOffset;
      } else {
        allocated = true;
        ptr = mmapAlloc(length);
        if (!ptr) {
          throw new FS.ErrnoError(48);
        }
        if (contents) {
          // Try to avoid unnecessary slices.
          if (position > 0 || position + length < contents.length) {
            if (contents.subarray) {
              contents = contents.subarray(position, position + length);
            } else {
              contents = Array.prototype.slice.call(contents, position, position + length);
            }
          }
          HEAP8.set(contents, ptr);
        }
      }
      return {
        ptr,
        allocated
      };
    },
    msync(stream, buffer, offset, length, mmapFlags) {
      MEMFS.stream_ops.write(stream, buffer, 0, length, offset, false);
      // should we check if bytesWritten and length are the same?
      return 0;
    }
  }
};

var FS_modeStringToFlags = str => {
  if (typeof str !== "string") return str;
  var flagModes = {
    "r": 0,
    "r+": 2,
    "w": 512 | 64 | 1,
    "w+": 512 | 64 | 2,
    "a": 1024 | 64 | 1,
    "a+": 1024 | 64 | 2
  };
  var flags = flagModes[str];
  if (typeof flags === "undefined") {
    throw new Error(`Unknown file open mode: ${str}`);
  }
  return flags;
};

var FS_fileDataToTypedArray = data => {
  if (typeof data === "string") {
    data = intArrayFromString(data, true);
  }
  if (!data.subarray) {
    data = new Uint8Array(data);
  }
  return data;
};

var FS_getMode = (canRead, canWrite) => {
  var mode = 0;
  if (canRead) mode |= 292 | 73;
  if (canWrite) mode |= 146;
  return mode;
};

var IDBFS = {
  dbs: {},
  indexedDB: () => {
    assert(typeof indexedDB !== "undefined", "IDBFS used, but indexedDB not supported");
    return indexedDB;
  },
  DB_VERSION: 21,
  DB_STORE_NAME: "FILE_DATA",
  queuePersist: mount => {
    function onPersistComplete() {
      if (mount.idbPersistState === "again") startPersist(); else {
        mount.idbPersistState = 0;
        // Otherwise reset sync state back to idle to wait for a new sync later
        IDBFS.onAutoPersistStateChanged?.(false);
      }
    }
    function startPersist() {
      mount.idbPersistState = "idb";
      // Mark that we are currently running a sync operation
      IDBFS.onAutoPersistStateChanged?.(true);
      IDBFS.syncfs(mount, /*populate:*/ false, onPersistComplete);
    }
    if (!mount.idbPersistState) {
      // Programs typically write/copy/move multiple files in the in-memory
      // filesystem within a single app frame, so when a filesystem sync
      // command is triggered, do not start it immediately, but only after
      // the current frame is finished. This way all the modified files
      // inside the main loop tick will be batched up to the same sync.
      mount.idbPersistState = setTimeout(startPersist, 0);
    } else if (mount.idbPersistState === "idb") {
      // There is an active IndexedDB sync operation in-flight, but we now
      // have accumulated more files to sync. We should therefore queue up
      // a new sync after the current one finishes so that all writes
      // will be properly persisted.
      mount.idbPersistState = "again";
    }
  },
  mount: mount => {
    // reuse core MEMFS functionality
    var mnt = MEMFS.mount(mount);
    // If the automatic IDBFS persistence option has been selected, then automatically persist
    // all modifications to the filesystem as they occur.
    if (mount?.opts?.autoPersist) {
      mount.idbPersistState = 0;
      // IndexedDB sync starts in idle state
      var memfs_node_ops = mnt.node_ops;
      mnt.node_ops = {
        ...mnt.node_ops
      };
      // Clone node_ops to inject write tracking
      mnt.node_ops.mknod = (parent, name, mode, dev) => {
        var node = memfs_node_ops.mknod(parent, name, mode, dev);
        // Propagate injected node_ops to the newly created child node
        node.node_ops = mnt.node_ops;
        // Remember for each IDBFS node which IDBFS mount point they came from so we know which mount to persist on modification.
        node.idbfs_mount = mnt.mount;
        // Remember original MEMFS stream_ops for this node
        node.memfs_stream_ops = node.stream_ops;
        // Clone stream_ops to inject write tracking
        node.stream_ops = {
          ...node.stream_ops
        };
        // Track all file writes
        node.stream_ops.write = (stream, buffer, offset, length, position, canOwn) => {
          // This file has been modified, we must persist IndexedDB when this file closes
          stream.node.isModified = true;
          return node.memfs_stream_ops.write(stream, buffer, offset, length, position, canOwn);
        };
        // Persist IndexedDB on file close
        node.stream_ops.close = stream => {
          var n = stream.node;
          if (n.isModified) {
            IDBFS.queuePersist(n.idbfs_mount);
            n.isModified = false;
          }
          if (n.memfs_stream_ops.close) return n.memfs_stream_ops.close(stream);
        };
        // Persist the node we just created to IndexedDB
        IDBFS.queuePersist(mnt.mount);
        return node;
      };
      // Also kick off persisting the filesystem on other operations that modify the filesystem.
      mnt.node_ops.rmdir = (...args) => (IDBFS.queuePersist(mnt.mount), memfs_node_ops.rmdir(...args));
      mnt.node_ops.symlink = (...args) => (IDBFS.queuePersist(mnt.mount), memfs_node_ops.symlink(...args));
      mnt.node_ops.unlink = (...args) => (IDBFS.queuePersist(mnt.mount), memfs_node_ops.unlink(...args));
      mnt.node_ops.rename = (...args) => (IDBFS.queuePersist(mnt.mount), memfs_node_ops.rename(...args));
    }
    return mnt;
  },
  syncfs: (mount, populate, callback) => {
    IDBFS.getLocalSet(mount, (err, local) => {
      if (err) return callback(err);
      IDBFS.getRemoteSet(mount, (err, remote) => {
        if (err) return callback(err);
        var src = populate ? remote : local;
        var dst = populate ? local : remote;
        IDBFS.reconcile(src, dst, callback);
      });
    });
  },
  quit: () => {
    for (var value of Object.values(IDBFS.dbs)) {
      value.close();
    }
    IDBFS.dbs = {};
  },
  getDB: (name, callback) => {
    // check the cache first
    var db = IDBFS.dbs[name];
    if (db) {
      return callback(null, db);
    }
    var req;
    try {
      req = IDBFS.indexedDB().open(name, IDBFS.DB_VERSION);
    } catch (e) {
      return callback(e);
    }
    if (!req) {
      return callback("Unable to connect to IndexedDB");
    }
    req.onupgradeneeded = e => {
      var db = /** @type {IDBDatabase} */ (e.target.result);
      var transaction = e.target.transaction;
      var fileStore;
      if (db.objectStoreNames.contains(IDBFS.DB_STORE_NAME)) {
        fileStore = transaction.objectStore(IDBFS.DB_STORE_NAME);
      } else {
        fileStore = db.createObjectStore(IDBFS.DB_STORE_NAME);
      }
      if (!fileStore.indexNames.contains("timestamp")) {
        fileStore.createIndex("timestamp", "timestamp", {
          unique: false
        });
      }
    };
    req.onsuccess = () => {
      db = /** @type {IDBDatabase} */ (req.result);
      // add to the cache
      IDBFS.dbs[name] = db;
      callback(null, db);
    };
    req.onerror = e => {
      callback(e.target.error);
      e.preventDefault();
    };
  },
  getLocalSet: (mount, callback) => {
    var entries = {};
    function isRealDir(p) {
      return p !== "." && p !== "..";
    }
    function toAbsolute(root) {
      return p => PATH.join2(root, p);
    }
    var check = FS.readdir(mount.mountpoint).filter(isRealDir).map(toAbsolute(mount.mountpoint));
    while (check.length) {
      var path = check.pop();
      var stat;
      try {
        stat = FS.lstat(path);
      } catch (e) {
        return callback(e);
      }
      if (FS.isDir(stat.mode)) {
        check.push(...FS.readdir(path).filter(isRealDir).map(toAbsolute(path)));
      }
      entries[path] = {
        "timestamp": stat.mtime
      };
    }
    return callback(null, {
      type: "local",
      entries
    });
  },
  getRemoteSet: (mount, callback) => {
    var entries = {};
    IDBFS.getDB(mount.mountpoint, (err, db) => {
      if (err) return callback(err);
      try {
        var transaction = db.transaction([ IDBFS.DB_STORE_NAME ], "readonly");
        transaction.onerror = e => {
          callback(e.target.error);
          e.preventDefault();
        };
        var store = transaction.objectStore(IDBFS.DB_STORE_NAME);
        var index = store.index("timestamp");
        index.openKeyCursor().onsuccess = event => {
          var cursor = event.target.result;
          if (!cursor) {
            return callback(null, {
              type: "remote",
              db,
              entries
            });
          }
          entries[cursor.primaryKey] = {
            "timestamp": cursor.key
          };
          cursor.continue();
        };
      } catch (e) {
        return callback(e);
      }
    });
  },
  loadLocalEntry: (path, callback) => {
    var stat, node;
    try {
      var lookup = FS.lookupPath(path);
      node = lookup.node;
      stat = FS.lstat(path);
    } catch (e) {
      return callback(e);
    }
    if (FS.isDir(stat.mode)) {
      return callback(null, {
        "timestamp": stat.mtime,
        "mode": stat.mode
      });
    } else if (FS.isLink(stat.mode)) {
      return callback(null, {
        "timestamp": stat.mtime,
        "mode": stat.mode,
        "link": node.link
      });
    } else if (FS.isFile(stat.mode)) {
      // Performance consideration: storing a normal JavaScript array to a IndexedDB is much slower than storing a typed array.
      // Therefore always convert the file contents to a typed array first before writing the data to IndexedDB.
      node.contents = MEMFS.getFileDataAsTypedArray(node);
      return callback(null, {
        "timestamp": stat.mtime,
        "mode": stat.mode,
        "contents": node.contents
      });
    } else {
      return callback(new Error("node type not supported"));
    }
  },
  storeLocalEntry: (path, entry, callback) => {
    try {
      if (FS.isDir(entry["mode"])) {
        FS.mkdirTree(path, entry["mode"]);
      } else if (FS.isLink(entry["mode"])) {
        FS.symlink(entry["link"], path);
      } else if (FS.isFile(entry["mode"])) {
        FS.writeFile(path, entry["contents"], {
          canOwn: true
        });
      } else {
        return callback(new Error("node type not supported"));
      }
      FS.chmod(path, entry["mode"]);
      FS.utime(path, entry["timestamp"], entry["timestamp"]);
    } catch (e) {
      return callback(e);
    }
    callback(null);
  },
  removeLocalEntry: (path, callback) => {
    try {
      var stat = FS.lstat(path);
      if (FS.isDir(stat.mode)) {
        FS.rmdir(path);
      } else {
        FS.unlink(path);
      }
    } catch (e) {
      return callback(e);
    }
    callback(null);
  },
  loadRemoteEntry: (store, path, callback) => {
    var req = store.get(path);
    req.onsuccess = event => callback(null, event.target.result);
    req.onerror = e => {
      callback(e.target.error);
      e.preventDefault();
    };
  },
  storeRemoteEntry: (store, path, entry, callback) => {
    try {
      var req = store.put(entry, path);
    } catch (e) {
      callback(e);
      return;
    }
    req.onsuccess = event => callback();
    req.onerror = e => {
      callback(e.target.error);
      e.preventDefault();
    };
  },
  removeRemoteEntry: (store, path, callback) => {
    var req = store.delete(path);
    req.onsuccess = event => callback();
    req.onerror = e => {
      callback(e.target.error);
      e.preventDefault();
    };
  },
  reconcile: (src, dst, callback) => {
    var total = 0;
    var create = [];
    for (var [key, e] of Object.entries(src.entries)) {
      var e2 = dst.entries[key];
      if (!e2 || e["timestamp"].getTime() != e2["timestamp"].getTime()) {
        create.push(key);
        total++;
      }
    }
    var remove = [];
    for (var key of Object.keys(dst.entries)) {
      if (!src.entries[key]) {
        remove.push(key);
        total++;
      }
    }
    if (!total) {
      return callback(null);
    }
    var errored = false;
    var db = src.type === "remote" ? src.db : dst.db;
    var transaction = db.transaction([ IDBFS.DB_STORE_NAME ], "readwrite");
    var store = transaction.objectStore(IDBFS.DB_STORE_NAME);
    function done(err) {
      if (err && !errored) {
        errored = true;
        return callback(err);
      }
    }
    // transaction may abort if (for example) there is a QuotaExceededError
    transaction.onerror = transaction.onabort = e => {
      done(e.target.error);
      e.preventDefault();
    };
    transaction.oncomplete = e => {
      if (!errored) {
        callback(null);
      }
    };
    // sort paths in ascending order so directory entries are created
    // before the files inside them
    for (const path of create.sort()) {
      if (dst.type === "local") {
        IDBFS.loadRemoteEntry(store, path, (err, entry) => {
          if (err) return done(err);
          IDBFS.storeLocalEntry(path, entry, done);
        });
      } else {
        IDBFS.loadLocalEntry(path, (err, entry) => {
          if (err) return done(err);
          IDBFS.storeRemoteEntry(store, path, entry, done);
        });
      }
    }
    // sort paths in descending order so files are deleted before their
    // parent directories
    for (var path of remove.sort().reverse()) {
      if (dst.type === "local") {
        IDBFS.removeLocalEntry(path, done);
      } else {
        IDBFS.removeRemoteEntry(store, path, done);
      }
    }
  }
};

var strError = errno => UTF8ToString(_strerror(errno));

var ERRNO_CODES = {
  "EPERM": 63,
  "ENOENT": 44,
  "ESRCH": 71,
  "EINTR": 27,
  "EIO": 29,
  "ENXIO": 60,
  "E2BIG": 1,
  "ENOEXEC": 45,
  "EBADF": 8,
  "ECHILD": 12,
  "EAGAIN": 6,
  "EWOULDBLOCK": 6,
  "ENOMEM": 48,
  "EACCES": 2,
  "EFAULT": 21,
  "ENOTBLK": 105,
  "EBUSY": 10,
  "EEXIST": 20,
  "EXDEV": 75,
  "ENODEV": 43,
  "ENOTDIR": 54,
  "EISDIR": 31,
  "EINVAL": 28,
  "ENFILE": 41,
  "EMFILE": 33,
  "ENOTTY": 59,
  "ETXTBSY": 74,
  "EFBIG": 22,
  "ENOSPC": 51,
  "ESPIPE": 70,
  "EROFS": 69,
  "EMLINK": 34,
  "EPIPE": 64,
  "EDOM": 18,
  "ERANGE": 68,
  "ENOMSG": 49,
  "EIDRM": 24,
  "ECHRNG": 106,
  "EL2NSYNC": 156,
  "EL3HLT": 107,
  "EL3RST": 108,
  "ELNRNG": 109,
  "EUNATCH": 110,
  "ENOCSI": 111,
  "EL2HLT": 112,
  "EDEADLK": 16,
  "ENOLCK": 46,
  "EBADE": 113,
  "EBADR": 114,
  "EXFULL": 115,
  "ENOANO": 104,
  "EBADRQC": 103,
  "EBADSLT": 102,
  "EDEADLOCK": 16,
  "EBFONT": 101,
  "ENOSTR": 100,
  "ENODATA": 116,
  "ETIME": 117,
  "ENOSR": 118,
  "ENONET": 119,
  "ENOPKG": 120,
  "EREMOTE": 121,
  "ENOLINK": 47,
  "EADV": 122,
  "ESRMNT": 123,
  "ECOMM": 124,
  "EPROTO": 65,
  "EMULTIHOP": 36,
  "EDOTDOT": 125,
  "EBADMSG": 9,
  "ENOTUNIQ": 126,
  "EBADFD": 127,
  "EREMCHG": 128,
  "ELIBACC": 129,
  "ELIBBAD": 130,
  "ELIBSCN": 131,
  "ELIBMAX": 132,
  "ELIBEXEC": 133,
  "ENOSYS": 52,
  "ENOTEMPTY": 55,
  "ENAMETOOLONG": 37,
  "ELOOP": 32,
  "EOPNOTSUPP": 138,
  "EPFNOSUPPORT": 139,
  "ECONNRESET": 15,
  "ENOBUFS": 42,
  "EAFNOSUPPORT": 5,
  "EPROTOTYPE": 67,
  "ENOTSOCK": 57,
  "ENOPROTOOPT": 50,
  "ESHUTDOWN": 140,
  "ECONNREFUSED": 14,
  "EADDRINUSE": 3,
  "ECONNABORTED": 13,
  "ENETUNREACH": 40,
  "ENETDOWN": 38,
  "ETIMEDOUT": 73,
  "EHOSTDOWN": 142,
  "EHOSTUNREACH": 23,
  "EINPROGRESS": 26,
  "EALREADY": 7,
  "EDESTADDRREQ": 17,
  "EMSGSIZE": 35,
  "EPROTONOSUPPORT": 66,
  "ESOCKTNOSUPPORT": 137,
  "EADDRNOTAVAIL": 4,
  "ENETRESET": 39,
  "EISCONN": 30,
  "ENOTCONN": 53,
  "ETOOMANYREFS": 141,
  "EUSERS": 136,
  "EDQUOT": 19,
  "ESTALE": 72,
  "ENOTSUP": 138,
  "ENOMEDIUM": 148,
  "EILSEQ": 25,
  "EOVERFLOW": 61,
  "ECANCELED": 11,
  "ENOTRECOVERABLE": 56,
  "EOWNERDEAD": 62,
  "ESTRPIPE": 135
};

var asyncLoad = async url => {
  var arrayBuffer = await readAsync(url);
  assert(arrayBuffer, `Loading data file "${url}" failed (no arrayBuffer).`);
  return new Uint8Array(arrayBuffer);
};

var FS_createDataFile = (...args) => FS.createDataFile(...args);

var getUniqueRunDependency = id => {
  var orig = id;
  while (1) {
    if (!runDependencyTracking[id]) return id;
    id = orig + Math.random();
  }
};

var dependenciesPromise = null;

var resolveRunDependencies = async () => dependenciesPromise;

var runDependencies = 0;

var dependenciesPromiseResolve = null;

var runDependencyTracking = {};

var runDependencyWatcher = null;

var removeRunDependency = id => {
  runDependencies--;
  Module["monitorRunDependencies"]?.(runDependencies);
  assert(id, "removeRunDependency requires an ID");
  assert(runDependencyTracking[id]);
  delete runDependencyTracking[id];
  if (!runDependencies) {
    if (runDependencyWatcher !== null) {
      clearInterval(runDependencyWatcher);
      runDependencyWatcher = null;
    }
    dependenciesPromiseResolve();
  }
};

var addRunDependency = id => {
  if (!runDependencies) {
    dependenciesPromise = new Promise(resolve => dependenciesPromiseResolve = resolve);
  }
  runDependencies++;
  Module["monitorRunDependencies"]?.(runDependencies);
  assert(id, "addRunDependency requires an ID");
  assert(!runDependencyTracking[id]);
  runDependencyTracking[id] = 1;
  if (!runDependencyWatcher && globalThis.setInterval) {
    // Check for missing dependencies every few seconds
    runDependencyWatcher = setInterval(() => {
      if (ABORT) {
        clearInterval(runDependencyWatcher);
        runDependencyWatcher = null;
        return;
      }
      var shown = false;
      for (var dep in runDependencyTracking) {
        if (!shown) {
          shown = true;
          err("still waiting on run dependencies:");
        }
        err(`dependency: ${dep}`);
      }
      if (shown) {
        err("(end of list)");
      }
    }, 1e4);
  }
};

var preloadPlugins = [];

var FS_handledByPreloadPlugin = async (byteArray, fullname) => {
  // Ensure plugins are ready.
  if (typeof Browser !== "undefined") Browser.init();
  for (var plugin of preloadPlugins) {
    if (plugin["canHandle"](fullname)) {
      assert(plugin["handle"].constructor.name === "AsyncFunction", "Filesystem plugin handlers must be async functions (See #24914)");
      return plugin["handle"](byteArray, fullname);
    }
  }
  // If no plugin handled this file then return the original/unmodified
  // byteArray.
  return byteArray;
};

var FS_preloadFile = async (parent, name, url, canRead, canWrite, dontCreateFile, canOwn, preFinish) => {
  // TODO we should allow people to just pass in a complete filename instead
  // of parent and name being that we just join them anyways
  var fullname = name ? PATH_FS.resolve(PATH.join2(parent, name)) : parent;
  var dep = getUniqueRunDependency(`cp ${fullname}`);
  // might have several active requests for the same fullname
  addRunDependency(dep);
  try {
    var byteArray = url;
    if (typeof url === "string") {
      byteArray = await asyncLoad(url);
    }
    byteArray = await FS_handledByPreloadPlugin(byteArray, fullname);
    preFinish?.();
    if (!dontCreateFile) {
      FS_createDataFile(parent, name, byteArray, canRead, canWrite, canOwn);
    }
  } finally {
    removeRunDependency(dep);
  }
};

var FS_createPreloadedFile = (parent, name, url, canRead, canWrite, onload, onerror, dontCreateFile, canOwn, preFinish) => {
  FS_preloadFile(parent, name, url, canRead, canWrite, dontCreateFile, canOwn, preFinish).then(onload).catch(onerror);
};

var FS = {
  root: null,
  mounts: [],
  devices: {},
  streams: [],
  nextInode: 1,
  nameTable: [],
  currentPath: "/",
  initialized: false,
  ignorePermissions: true,
  syncFSRequests: 0,
  ErrnoError: class extends Error {
    name="ErrnoError";
    // We set the `name` property to be able to identify `FS.ErrnoError`
    // - the `name` is a standard ECMA-262 property of error objects. Kind of good to have it anyway.
    // - when using PROXYFS, an error can come from an underlying FS
    // as different FS objects have their own FS.ErrnoError each,
    // the test `err instanceof FS.ErrnoError` won't detect an error coming from another filesystem, causing bugs.
    // we'll use the reliable test `err.name == "ErrnoError"` instead
    constructor(errno) {
      super(runtimeInitialized ? strError(errno) : "");
      this.errno = errno;
      for (var key in ERRNO_CODES) {
        if (ERRNO_CODES[key] === errno) {
          this.code = key;
          break;
        }
      }
    }
  },
  FSStream: class {
    shared={};
    get object() {
      return this.node;
    }
    set object(val) {
      this.node = val;
    }
    get isRead() {
      return (this.flags & 2097155) !== 1;
    }
    get isWrite() {
      return (this.flags & 2097155) !== 0;
    }
    get isAppend() {
      return (this.flags & 1024);
    }
    get flags() {
      return this.shared.flags;
    }
    set flags(val) {
      this.shared.flags = val;
    }
    get position() {
      return this.shared.position;
    }
    set position(val) {
      this.shared.position = val;
    }
  },
  FSNode: class {
    node_ops={};
    stream_ops={};
    readMode=292 | 73;
    writeMode=146;
    mounted=null;
    constructor(parent, name, mode, rdev) {
      if (!parent) {
        parent = this;
      }
      this.parent = parent;
      this.mount = parent.mount;
      this.id = FS.nextInode++;
      this.name = name;
      this.mode = mode;
      this.rdev = rdev;
      this.atime = this.mtime = this.ctime = Date.now();
    }
    get read() {
      return (this.mode & this.readMode) === this.readMode;
    }
    set read(val) {
      val ? this.mode |= this.readMode : this.mode &= ~this.readMode;
    }
    get write() {
      return (this.mode & this.writeMode) === this.writeMode;
    }
    set write(val) {
      val ? this.mode |= this.writeMode : this.mode &= ~this.writeMode;
    }
    get isFolder() {
      return FS.isDir(this.mode);
    }
    get isDevice() {
      return FS.isChrdev(this.mode);
    }
    // The per-inode readiness wait-queue. The node carries a Set of listener
    // entries {cb}; producers (SOCKFS, PIPEFS) call notifyListeners on a
    // readiness transition, and poll()/epoll consume it. It lives on the node
    // (not the fd) so dup'd fds share one queue. Only nodes that derive real
    // readiness (sockets, pipes, and an epoll's own node) ever use this -
    // always-ready types (regular files, ttys) never register or notify.
    addListener(cb, exclusive = false) {
      var entry = {
        cb,
        exclusive
      };
      var listeners = (this.listeners ??= new Set);
      listeners.add(entry);
      return {
        listeners,
        entry
      };
    }
    notifyListeners(flags) {
      // Iterates the set without copying, which is safe ONLY under a
      // load-bearing contract that every internal listener must honour:
      //   1. A listener must not run user code synchronously (a poll waiter only
      //      resolves a Promise; an epoll registration only re-lists +
      //      re-notifies; the epoll callback only schedules a tick). User code
      //      runs on a later tick, never inside this loop.
      //   2. A listener may delete entries only from ITS OWN waiter, never from
      //      a sibling node's set that may be mid-iteration. (Deleting an entry
      //      of the set being iterated here is fine - a Set tolerates removal of
      //      a not-yet-visited entry mid-iteration; mutating a *different* node's
      //      set is fine because that set is not being iterated.)
      // Violating either gives silently skipped wakeups that are near-impossible
      // to reproduce. Any new producer/listener must preserve it.
      if (!this.listeners) return;
      // Fire every non-exclusive listener. Among EPOLLEXCLUSIVE registrations
      // (one fd watched by several epolls) wake only one, rotating round-robin
      // per node, to avoid a thundering herd. (Only epoll registrations are ever
      // exclusive; poll waiters and a node's own consumers are not.)
      var excl;
      for (var entry of this.listeners) {
        if (entry.exclusive) (excl ||= []).push(entry); else entry.cb(flags);
      }
      if (excl) {
        var i = (this.exclTurn || 0) % excl.length;
        this.exclTurn = i + 1;
        excl[i].cb(flags);
      }
    }
  },
  lookupPath(path, opts = {}) {
    if (!path) {
      throw new FS.ErrnoError(44);
    }
    opts.follow_mount ??= true;
    if (!PATH.isAbs(path)) {
      path = FS.cwd() + "/" + path;
    }
    // limit max consecutive symlinks to SYMLOOP_MAX.
    linkloop: for (var nlinks = 0; nlinks < 40; nlinks++) {
      // split the absolute path
      var parts = path.split("/").filter(p => !!p);
      // start at the root
      var current = FS.root;
      var current_path = "/";
      for (var i = 0; i < parts.length; i++) {
        var islast = (i === parts.length - 1);
        if (islast && opts.parent) {
          // stop resolving
          break;
        }
        if (parts[i] === ".") {
          continue;
        }
        if (parts[i] === "..") {
          current_path = PATH.dirname(current_path);
          if (FS.isRoot(current)) {
            path = current_path + "/" + parts.slice(i + 1).join("/");
            // We're making progress here, don't let many consecutive ..'s
            // lead to ELOOP
            nlinks--;
            continue linkloop;
          } else {
            current = current.parent;
          }
          continue;
        }
        current_path = PATH.join2(current_path, parts[i]);
        try {
          current = FS.lookupNode(current, parts[i]);
        } catch (e) {
          // if noent_okay is true, suppress a ENOENT in the last component
          // and return an object with an undefined node. This is needed for
          // resolving symlinks in the path when creating a file.
          if ((e?.errno === 44) && islast && opts.noent_okay) {
            return {
              path: current_path
            };
          }
          throw e;
        }
        // jump to the mount's root node if this is a mountpoint
        if (FS.isMountpoint(current) && (!islast || opts.follow_mount)) {
          current = current.mounted.root;
        }
        // by default, lookupPath will not follow a symlink if it is the final path component.
        // setting opts.follow = true will override this behavior.
        if (FS.isLink(current.mode) && (!islast || opts.follow)) {
          if (!current.node_ops.readlink) {
            throw new FS.ErrnoError(52);
          }
          var link = current.node_ops.readlink(current);
          if (!PATH.isAbs(link)) {
            link = PATH.dirname(current_path) + "/" + link;
          }
          path = link + "/" + parts.slice(i + 1).join("/");
          continue linkloop;
        }
      }
      return {
        path: current_path,
        node: current
      };
    }
    throw new FS.ErrnoError(32);
  },
  getPath(node) {
    var path;
    while (true) {
      if (FS.isRoot(node)) {
        var mount = node.mount.mountpoint;
        if (!path) return mount;
        return mount[mount.length - 1] !== "/" ? `${mount}/${path}` : mount + path;
      }
      path = path ? `${node.name}/${path}` : node.name;
      node = node.parent;
    }
  },
  hashName(parentid, name) {
    var hash = 0;
    for (var i = 0; i < name.length; i++) {
      hash = ((hash << 5) - hash + name.charCodeAt(i)) | 0;
    }
    return ((parentid + hash) >>> 0) % FS.nameTable.length;
  },
  hashAddNode(node) {
    var hash = FS.hashName(node.parent.id, node.name);
    node.name_next = FS.nameTable[hash];
    FS.nameTable[hash] = node;
  },
  hashRemoveNode(node) {
    var hash = FS.hashName(node.parent.id, node.name);
    if (FS.nameTable[hash] === node) {
      FS.nameTable[hash] = node.name_next;
    } else {
      var current = FS.nameTable[hash];
      while (current) {
        if (current.name_next === node) {
          current.name_next = node.name_next;
          break;
        }
        current = current.name_next;
      }
    }
  },
  lookupNode(parent, name) {
    var errCode = FS.mayLookup(parent);
    if (errCode) {
      throw new FS.ErrnoError(errCode);
    }
    var hash = FS.hashName(parent.id, name);
    for (var node = FS.nameTable[hash]; node; node = node.name_next) {
      var nodeName = node.name;
      if (node.parent.id === parent.id && nodeName === name) {
        return node;
      }
    }
    // if we failed to find it in the cache, call into the VFS
    return FS.lookup(parent, name);
  },
  createNode(parent, name, mode, rdev = undefined) {
    assert(typeof parent === "object");
    var node = new FS.FSNode(parent, name, mode, rdev);
    FS.hashAddNode(node);
    return node;
  },
  destroyNode(node) {
    FS.hashRemoveNode(node);
  },
  isRoot(node) {
    return node === node.parent;
  },
  isMountpoint(node) {
    return !!node.mounted;
  },
  isFile(mode) {
    return (mode & 61440) === 32768;
  },
  isDir(mode) {
    return (mode & 61440) === 16384;
  },
  isLink(mode) {
    return (mode & 61440) === 40960;
  },
  isChrdev(mode) {
    return (mode & 61440) === 8192;
  },
  isBlkdev(mode) {
    return (mode & 61440) === 24576;
  },
  isFIFO(mode) {
    return (mode & 61440) === 4096;
  },
  isSocket(mode) {
    return (mode & 49152) === 49152;
  },
  flagsToPermissionString(flag) {
    var perms = [ "r", "w", "rw" ][flag & 3];
    if ((flag & 512)) {
      perms += "w";
    }
    return perms;
  },
  nodePermissions(node, perms) {
    if (FS.ignorePermissions) {
      return 0;
    }
    // return 0 if any user, group or owner bits are set.
    if (perms.includes("r") && !(node.mode & 292)) {
      return 2;
    }
    if (perms.includes("w") && !(node.mode & 146)) {
      return 2;
    }
    if (perms.includes("x") && !(node.mode & 73)) {
      return 2;
    }
    return 0;
  },
  mayLookup(dir) {
    if (!FS.isDir(dir.mode)) return 54;
    var errCode = FS.nodePermissions(dir, "x");
    if (errCode) return errCode;
    if (!dir.node_ops.lookup) return 2;
    return 0;
  },
  mayCreate(dir, name) {
    if (!FS.isDir(dir.mode)) {
      return 54;
    }
    try {
      var node = FS.lookupNode(dir, name);
      return 20;
    } catch (e) {}
    return FS.nodePermissions(dir, "wx");
  },
  mayDelete(dir, name, isdir) {
    var node;
    try {
      node = FS.lookupNode(dir, name);
    } catch (e) {
      return e.errno;
    }
    var errCode = FS.nodePermissions(dir, "wx");
    if (errCode) {
      return errCode;
    }
    if (isdir) {
      if (!FS.isDir(node.mode)) {
        return 54;
      }
      if (FS.isRoot(node) || FS.getPath(node) === FS.cwd()) {
        return 10;
      }
    } else if (FS.isDir(node.mode)) {
      return 31;
    }
    return 0;
  },
  mayOpen(node, flags) {
    if (!node) {
      return 44;
    }
    if (FS.isLink(node.mode)) {
      return 32;
    }
    var mode = FS.flagsToPermissionString(flags);
    if (FS.isDir(node.mode)) {
      // opening for write
      // TODO: check for O_SEARCH? (== search for dir only)
      if (mode !== "r" || (flags & (512 | 64))) {
        return 31;
      }
    }
    return FS.nodePermissions(node, mode);
  },
  checkOpExists(op, err) {
    if (!op) {
      throw new FS.ErrnoError(err);
    }
    return op;
  },
  MAX_OPEN_FDS: 4096,
  nextfd() {
    for (var fd = 0; fd <= FS.MAX_OPEN_FDS; fd++) {
      if (!FS.streams[fd]) {
        return fd;
      }
    }
    throw new FS.ErrnoError(33);
  },
  getStreamChecked(fd) {
    var stream = FS.getStream(fd);
    if (!stream) {
      throw new FS.ErrnoError(8);
    }
    return stream;
  },
  getStream: fd => FS.streams[fd],
  createStream(stream, fd = -1) {
    assert(fd >= -1);
    // clone it, so we can return an instance of FSStream
    stream = Object.assign(new FS.FSStream, stream);
    if (fd == -1) {
      fd = FS.nextfd();
    }
    stream.fd = fd;
    FS.streams[fd] = stream;
    return stream;
  },
  closeStream(fd) {
    FS.streams[fd] = null;
  },
  dupStream(origStream, fd = -1) {
    var stream = FS.createStream(origStream, fd);
    stream.stream_ops?.dup?.(stream);
    return stream;
  },
  doSetAttr(stream, node, attr) {
    var setattr = stream?.stream_ops.setattr;
    var arg = setattr ? stream : node;
    setattr ??= node.node_ops.setattr;
    FS.checkOpExists(setattr, 63);
    try {
      setattr(arg, attr);
    } catch (e) {
      if (e instanceof RangeError) {
        throw new FS.ErrnoError(22);
      }
      throw e;
    }
  },
  chrdev_stream_ops: {
    open(stream) {
      var device = FS.getDevice(stream.node.rdev);
      // override node's stream ops with the device's
      stream.stream_ops = device.stream_ops;
      // forward the open call
      stream.stream_ops.open?.(stream);
    },
    llseek() {
      throw new FS.ErrnoError(70);
    }
  },
  major: dev => ((dev) >> 8),
  minor: dev => ((dev) & 255),
  makedev: (ma, mi) => ((ma) << 8 | (mi)),
  registerDevice(dev, ops) {
    FS.devices[dev] = {
      stream_ops: ops
    };
  },
  getDevice: dev => FS.devices[dev],
  getMounts(mount) {
    var mounts = [];
    var check = [ mount ];
    while (check.length) {
      var m = check.pop();
      mounts.push(m);
      check.push(...m.mounts);
    }
    return mounts;
  },
  syncfs(populate, callback) {
    if (typeof populate === "function") {
      callback = populate;
      populate = false;
    }
    FS.syncFSRequests++;
    if (FS.syncFSRequests > 1) {
      err(`warning: ${FS.syncFSRequests} FS.syncfs operations in flight at once, probably just doing extra work`);
    }
    var mounts = FS.getMounts(FS.root.mount);
    var completed = 0;
    function doCallback(errCode) {
      assert(FS.syncFSRequests > 0);
      FS.syncFSRequests--;
      return callback(errCode);
    }
    function done(errCode) {
      if (errCode) {
        if (!done.errored) {
          done.errored = true;
          return doCallback(errCode);
        }
        return;
      }
      if (++completed >= mounts.length) {
        doCallback(null);
      }
    }
    // sync all mounts
    for (var mount of mounts) {
      if (mount.type.syncfs) {
        mount.type.syncfs(mount, populate, done);
      } else {
        done(null);
      }
    }
  },
  mount(type, opts, mountpoint) {
    if (typeof type === "string") {
      // The filesystem was not included, and instead we have an error
      // message stored in the variable.
      throw type;
    }
    var root = mountpoint === "/";
    var pseudo = !mountpoint;
    var node;
    if (root && FS.root) {
      throw new FS.ErrnoError(10);
    } else if (!root && !pseudo) {
      var lookup = FS.lookupPath(mountpoint, {
        follow_mount: false
      });
      mountpoint = lookup.path;
      // use the absolute path
      node = lookup.node;
      if (FS.isMountpoint(node)) {
        throw new FS.ErrnoError(10);
      }
      if (!FS.isDir(node.mode)) {
        throw new FS.ErrnoError(54);
      }
    }
    var mount = {
      type,
      opts,
      mountpoint,
      mounts: []
    };
    // create a root node for the fs
    var mountRoot = type.mount(mount);
    mountRoot.mount = mount;
    mount.root = mountRoot;
    if (root) {
      FS.root = mountRoot;
    } else if (node) {
      // set as a mountpoint
      node.mounted = mount;
      // add the new mount to the current mount's children
      if (node.mount) {
        node.mount.mounts.push(mount);
      }
    }
    return mountRoot;
  },
  unmount(mountpoint) {
    var lookup = FS.lookupPath(mountpoint, {
      follow_mount: false
    });
    if (!FS.isMountpoint(lookup.node)) {
      throw new FS.ErrnoError(28);
    }
    // destroy the nodes for this mount, and all its child mounts
    var node = lookup.node;
    var mount = node.mounted;
    var mounts = FS.getMounts(mount);
    for (var [hash, current] of Object.entries(FS.nameTable)) {
      while (current) {
        var next = current.name_next;
        if (mounts.includes(current.mount)) {
          FS.destroyNode(current);
        }
        current = next;
      }
    }
    // no longer a mountpoint
    node.mounted = null;
    // remove this mount from the child mounts
    var idx = node.mount.mounts.indexOf(mount);
    assert(idx !== -1);
    node.mount.mounts.splice(idx, 1);
  },
  lookup(parent, name) {
    return parent.node_ops.lookup(parent, name);
  },
  mknod(path, mode, dev) {
    var lookup = FS.lookupPath(path, {
      parent: true
    });
    var parent = lookup.node;
    var name = PATH.basename(path);
    if (!name) {
      throw new FS.ErrnoError(28);
    }
    if (name === "." || name === "..") {
      throw new FS.ErrnoError(20);
    }
    var errCode = FS.mayCreate(parent, name);
    if (errCode) {
      throw new FS.ErrnoError(errCode);
    }
    if (!parent.node_ops.mknod) {
      throw new FS.ErrnoError(63);
    }
    return parent.node_ops.mknod(parent, name, mode, dev);
  },
  statfs(path) {
    return FS.statfsNode(FS.lookupPath(path, {
      follow: true
    }).node);
  },
  statfsStream(stream) {
    // We keep a separate statfsStream function because noderawfs overrides
    // it. In noderawfs, stream.node is sometimes null. Instead, we need to
    // look at stream.path.
    return FS.statfsNode(stream.node);
  },
  statfsNode(node) {
    // NOTE: None of the defaults here are true. We're just returning safe and
    //       sane values. Currently nodefs and rawfs replace these defaults,
    //       other file systems leave them alone.
    var rtn = {
      bsize: 4096,
      frsize: 4096,
      blocks: 1e6,
      bfree: 5e5,
      bavail: 5e5,
      files: FS.nextInode,
      ffree: FS.nextInode - 1,
      fsid: 42,
      flags: 2,
      namelen: 255
    };
    if (node.node_ops.statfs) {
      Object.assign(rtn, node.node_ops.statfs(node.mount.opts.root));
    }
    return rtn;
  },
  create(path, mode = 438) {
    mode &= 4095;
    mode |= 32768;
    return FS.mknod(path, mode, 0);
  },
  mkdir(path, mode = 511) {
    mode &= 511 | 512;
    mode |= 16384;
    return FS.mknod(path, mode, 0);
  },
  mkdirTree(path, mode = 511) {
    var dirs = path.split("/");
    var d = "";
    for (var dir of dirs) {
      if (!dir) continue;
      if (d || PATH.isAbs(path)) d += "/";
      d += dir;
      try {
        FS.mkdir(d, mode);
      } catch (e) {
        if (e.errno != 20) throw e;
      }
    }
  },
  mkdev(path, mode, dev = undefined) {
    if (typeof dev === "undefined") {
      dev = mode;
      mode = 438;
    }
    mode |= 8192;
    return FS.mknod(path, mode, dev);
  },
  symlink(oldpath, newpath) {
    if (!PATH_FS.resolve(oldpath)) {
      throw new FS.ErrnoError(44);
    }
    var lookup = FS.lookupPath(newpath, {
      parent: true
    });
    var parent = lookup.node;
    if (!parent) {
      throw new FS.ErrnoError(44);
    }
    var newname = PATH.basename(newpath);
    var errCode = FS.mayCreate(parent, newname);
    if (errCode) {
      throw new FS.ErrnoError(errCode);
    }
    if (!parent.node_ops.symlink) {
      throw new FS.ErrnoError(63);
    }
    return parent.node_ops.symlink(parent, newname, oldpath);
  },
  link(oldpath, newpath, flags) {
    var lookup = FS.lookupPath(newpath, {
      parent: true
    });
    var parent = lookup.node;
    if (!parent) {
      throw new FS.ErrnoError(44);
    }
    var newname = PATH.basename(newpath);
    var errCode = FS.mayCreate(parent, newname);
    if (errCode) {
      throw new FS.ErrnoError(errCode);
    }
    // Hardlinks are only supported by filesystem backends that provide a
    // `link` node op (e.g. NODERAWFS backed by the host). NODEFS omits it:
    // a host hardlink cannot be confined to the mount root.
    if (!parent.node_ops.link) {
      throw new FS.ErrnoError(34);
    }
    return parent.node_ops.link(parent, newname, oldpath, flags);
  },
  rename(old_path, new_path) {
    var old_dirname = PATH.dirname(old_path);
    var new_dirname = PATH.dirname(new_path);
    var old_name = PATH.basename(old_path);
    var new_name = PATH.basename(new_path);
    // parents must exist
    var lookup, old_dir, new_dir;
    // let the errors from non existent directories percolate up
    lookup = FS.lookupPath(old_path, {
      parent: true
    });
    old_dir = lookup.node;
    lookup = FS.lookupPath(new_path, {
      parent: true
    });
    new_dir = lookup.node;
    if (!old_dir || !new_dir) throw new FS.ErrnoError(44);
    // need to be part of the same mount
    if (old_dir.mount !== new_dir.mount) {
      throw new FS.ErrnoError(75);
    }
    // source must exist
    var old_node = FS.lookupNode(old_dir, old_name);
    // old path should not be an ancestor of the new path
    var relative = PATH_FS.relative(old_path, new_dirname);
    if (relative.charAt(0) !== ".") {
      throw new FS.ErrnoError(28);
    }
    // new path should not be an ancestor of the old path
    relative = PATH_FS.relative(new_path, old_dirname);
    if (relative.charAt(0) !== ".") {
      throw new FS.ErrnoError(55);
    }
    // see if the new path already exists
    var new_node;
    try {
      new_node = FS.lookupNode(new_dir, new_name);
    } catch (e) {}
    // early out if nothing needs to change
    if (old_node === new_node) {
      return;
    }
    // we'll need to delete the old entry
    var isdir = FS.isDir(old_node.mode);
    var errCode = FS.mayDelete(old_dir, old_name, isdir);
    if (errCode) {
      throw new FS.ErrnoError(errCode);
    }
    // need delete permissions if we'll be overwriting.
    // need create permissions if new doesn't already exist.
    errCode = new_node ? FS.mayDelete(new_dir, new_name, isdir) : FS.mayCreate(new_dir, new_name);
    if (errCode) {
      throw new FS.ErrnoError(errCode);
    }
    if (!old_dir.node_ops.rename) {
      throw new FS.ErrnoError(63);
    }
    if (FS.isMountpoint(old_node) || (new_node && FS.isMountpoint(new_node))) {
      throw new FS.ErrnoError(10);
    }
    // if we are going to change the parent, check write permissions
    if (new_dir !== old_dir) {
      errCode = FS.nodePermissions(old_dir, "w");
      if (errCode) {
        throw new FS.ErrnoError(errCode);
      }
    }
    // remove the node from the lookup hash
    FS.hashRemoveNode(old_node);
    // do the underlying fs rename
    try {
      old_dir.node_ops.rename(old_node, new_dir, new_name);
      // The replaced node is stale now. Evict it only after the rename
      // succeeded: backends like NODEFS report node.id as st_ino.
      if (new_node) {
        FS.hashRemoveNode(new_node);
      }
      // update old node (we do this here to avoid each backend
      // needing to)
      old_node.parent = new_dir;
    } catch (e) {
      throw e;
    } finally {
      // add the node back to the hash (in case node_ops.rename
      // changed its name)
      FS.hashAddNode(old_node);
    }
  },
  rmdir(path) {
    var lookup = FS.lookupPath(path, {
      parent: true
    });
    var parent = lookup.node;
    var name = PATH.basename(path);
    var node = FS.lookupNode(parent, name);
    var errCode = FS.mayDelete(parent, name, true);
    if (errCode) {
      throw new FS.ErrnoError(errCode);
    }
    if (!parent.node_ops.rmdir) {
      throw new FS.ErrnoError(63);
    }
    if (FS.isMountpoint(node)) {
      throw new FS.ErrnoError(10);
    }
    parent.node_ops.rmdir(parent, name);
    FS.destroyNode(node);
  },
  readdir(path) {
    var lookup = FS.lookupPath(path, {
      follow: true
    });
    var node = lookup.node;
    var readdir = FS.checkOpExists(node.node_ops.readdir, 54);
    return readdir(node);
  },
  unlink(path) {
    var lookup = FS.lookupPath(path, {
      parent: true
    });
    var parent = lookup.node;
    if (!parent) {
      throw new FS.ErrnoError(44);
    }
    var name = PATH.basename(path);
    var node = FS.lookupNode(parent, name);
    var errCode = FS.mayDelete(parent, name, false);
    if (errCode) {
      // According to POSIX, we should map EISDIR to EPERM, but
      // we instead do what Linux does (and we must, as we use
      // the musl linux libc).
      throw new FS.ErrnoError(errCode);
    }
    if (!parent.node_ops.unlink) {
      throw new FS.ErrnoError(63);
    }
    if (FS.isMountpoint(node)) {
      throw new FS.ErrnoError(10);
    }
    parent.node_ops.unlink(parent, name);
    FS.destroyNode(node);
  },
  readlink(path) {
    var lookup = FS.lookupPath(path);
    var link = lookup.node;
    if (!link) {
      throw new FS.ErrnoError(44);
    }
    if (!link.node_ops.readlink) {
      throw new FS.ErrnoError(28);
    }
    return link.node_ops.readlink(link);
  },
  stat(path, dontFollow = false) {
    var lookup = FS.lookupPath(path, {
      follow: !dontFollow
    });
    var node = lookup.node;
    var getattr = FS.checkOpExists(node.node_ops.getattr, 63);
    return getattr(node);
  },
  fstat(fd) {
    var stream = FS.getStreamChecked(fd);
    var node = stream.node;
    var getattr = stream.stream_ops.getattr;
    var arg = getattr ? stream : node;
    getattr ??= node.node_ops.getattr;
    FS.checkOpExists(getattr, 63);
    return getattr(arg);
  },
  lstat(path) {
    return FS.stat(path, true);
  },
  doChmod(stream, node, mode, dontFollow = false) {
    FS.doSetAttr(stream, node, {
      mode: (mode & 4095) | (node.mode & ~4095),
      ctime: Date.now(),
      dontFollow
    });
  },
  chmod(path, mode, dontFollow = false) {
    var node;
    if (typeof path === "string") {
      var lookup = FS.lookupPath(path, {
        follow: !dontFollow
      });
      node = lookup.node;
    } else {
      node = path;
    }
    FS.doChmod(null, node, mode, dontFollow);
  },
  lchmod(path, mode) {
    FS.chmod(path, mode, true);
  },
  fchmod(fd, mode) {
    var stream = FS.getStreamChecked(fd);
    FS.doChmod(stream, stream.node, mode, false);
  },
  doChown(stream, node, dontFollow = false) {
    FS.doSetAttr(stream, node, {
      timestamp: Date.now(),
      dontFollow
    });
  },
  chown(path, uid, gid, dontFollow = false) {
    var node;
    if (typeof path === "string") {
      var lookup = FS.lookupPath(path, {
        follow: !dontFollow
      });
      node = lookup.node;
    } else {
      node = path;
    }
    FS.doChown(null, node, dontFollow);
  },
  lchown(path, uid, gid) {
    FS.chown(path, uid, gid, true);
  },
  fchown(fd, uid, gid) {
    var stream = FS.getStreamChecked(fd);
    FS.doChown(stream, stream.node, false);
  },
  doTruncate(stream, node, len) {
    if (FS.isDir(node.mode)) {
      throw new FS.ErrnoError(31);
    }
    if (!FS.isFile(node.mode)) {
      throw new FS.ErrnoError(28);
    }
    var errCode = FS.nodePermissions(node, "w");
    if (errCode) {
      throw new FS.ErrnoError(errCode);
    }
    FS.doSetAttr(stream, node, {
      size: len,
      timestamp: Date.now()
    });
  },
  truncate(path, len) {
    if (len < 0) {
      throw new FS.ErrnoError(28);
    }
    var node;
    if (typeof path === "string") {
      var lookup = FS.lookupPath(path, {
        follow: true
      });
      node = lookup.node;
    } else {
      node = path;
    }
    FS.doTruncate(null, node, len);
  },
  ftruncate(fd, len) {
    var stream = FS.getStreamChecked(fd);
    if (len < 0 || (stream.flags & 2097155) === 0) {
      throw new FS.ErrnoError(28);
    }
    FS.doTruncate(stream, stream.node, len);
  },
  utime(path, atime, mtime, dontFollow = false) {
    var lookup = FS.lookupPath(path, {
      follow: !dontFollow
    });
    FS.doSetAttr(null, lookup.node, {
      atime,
      mtime,
      dontFollow
    });
  },
  open(path, flags, mode = 438) {
    if (path === "") {
      throw new FS.ErrnoError(44);
    }
    flags = FS_modeStringToFlags(flags);
    if ((flags & 64)) {
      mode = (mode & 4095) | 32768;
    } else {
      mode = 0;
    }
    var node;
    var isDirPath;
    if (typeof path === "object") {
      node = path;
    } else {
      isDirPath = path.endsWith("/");
      // noent_okay makes it so that if the final component of the path
      // doesn't exist, lookupPath returns `node: undefined`. `path` will be
      // updated to point to the target of all symlinks.
      var lookup = FS.lookupPath(path, {
        follow: !(flags & 131072),
        noent_okay: true
      });
      node = lookup.node;
      path = lookup.path;
    }
    // perhaps we need to create the node
    var created = false;
    if ((flags & 64)) {
      if (node) {
        // if O_CREAT and O_EXCL are set, error out if the node already exists
        if ((flags & 128)) {
          throw new FS.ErrnoError(20);
        }
      } else if (isDirPath) {
        throw new FS.ErrnoError(31);
      } else {
        // node doesn't exist, try to create it
        // Ignore the permission bits here to ensure we can `open` this new
        // file below. We use chmod below to apply the permissions once the
        // file is open.
        node = FS.mknod(path, mode | 511, 0);
        created = true;
      }
    }
    if (!node) {
      throw new FS.ErrnoError(44);
    }
    // can't truncate a device
    if (FS.isChrdev(node.mode)) {
      flags &= ~512;
    }
    // if asked only for a directory, then this must be one
    if ((flags & 65536) && !FS.isDir(node.mode)) {
      throw new FS.ErrnoError(54);
    }
    // check permissions, if this is not a file we just created now (it is ok to
    // create and write to a file with read-only permissions; it is read-only
    // for later use)
    if (!created) {
      var errCode = FS.mayOpen(node, flags);
      if (errCode) {
        throw new FS.ErrnoError(errCode);
      }
    }
    // do truncation if necessary
    if ((flags & 512) && !created) {
      FS.truncate(node, 0);
    }
    // we've already handled these, don't pass down to the underlying vfs
    flags &= ~(128 | 512 | 131072);
    // register the stream with the filesystem
    var stream = FS.createStream({
      node,
      path: FS.getPath(node),
      // we want the absolute path to the node
      flags,
      seekable: true,
      position: 0,
      stream_ops: node.stream_ops,
      // used by the file family libc calls (fopen, fwrite, ferror, etc.)
      ungotten: [],
      error: false
    });
    // call the new stream's open function
    if (stream.stream_ops.open) {
      stream.stream_ops.open(stream);
    }
    if (created) {
      FS.chmod(node, mode & 511);
    }
    return stream;
  },
  close(stream) {
    if (FS.isClosed(stream)) {
      throw new FS.ErrnoError(8);
    }
    if (stream.getdents) stream.getdents = null;
    // free readdir state
    // The fd is going away: wake anything waiting on it (poll/epoll) with
    // POLLNVAL so a blocking wait unblocks and an epoll registration is evicted
    // on its next derive. Only sockets/pipes/epoll ever carry a wait-queue, so
    // for every other stream (incl. nodeless noderawfs stdio) this is a no-op.
    stream.node?.notifyListeners(32);
    try {
      if (stream.stream_ops.close) {
        stream.stream_ops.close(stream);
      }
    } catch (e) {
      throw e;
    } finally {
      FS.closeStream(stream.fd);
    }
    stream.fd = null;
  },
  isClosed(stream) {
    return stream.fd === null;
  },
  llseek(stream, offset, whence) {
    if (FS.isClosed(stream)) {
      throw new FS.ErrnoError(8);
    }
    if (!stream.seekable || !stream.stream_ops.llseek) {
      throw new FS.ErrnoError(70);
    }
    if (whence != 0 && whence != 1 && whence != 2) {
      throw new FS.ErrnoError(28);
    }
    stream.position = stream.stream_ops.llseek(stream, offset, whence);
    stream.ungotten = [];
    return stream.position;
  },
  read(stream, buffer, offset, length, position = undefined) {
    assert(offset >= 0);
    if (length < 0 || position < 0) {
      throw new FS.ErrnoError(28);
    }
    if (FS.isClosed(stream)) {
      throw new FS.ErrnoError(8);
    }
    if ((stream.flags & 2097155) === 1) {
      throw new FS.ErrnoError(8);
    }
    if (FS.isDir(stream.node.mode)) {
      throw new FS.ErrnoError(31);
    }
    if (!stream.stream_ops.read) {
      throw new FS.ErrnoError(28);
    }
    var seeking = typeof position !== "undefined";
    if (!seeking) {
      position = stream.position;
    } else if (!stream.seekable) {
      throw new FS.ErrnoError(70);
    }
    var bytesRead = stream.stream_ops.read(stream, buffer, offset, length, position);
    if (!seeking) stream.position += bytesRead;
    return bytesRead;
  },
  write(stream, buffer, offset, length, position = undefined, canOwn = undefined) {
    assert(offset >= 0);
    assert(buffer.subarray, "FS.write expects a TypedArray");
    if (length < 0 || position < 0) {
      throw new FS.ErrnoError(28);
    }
    if (FS.isClosed(stream)) {
      throw new FS.ErrnoError(8);
    }
    if ((stream.flags & 2097155) === 0) {
      throw new FS.ErrnoError(8);
    }
    if (FS.isDir(stream.node.mode)) {
      throw new FS.ErrnoError(31);
    }
    if (!stream.stream_ops.write) {
      throw new FS.ErrnoError(28);
    }
    if (stream.seekable && stream.flags & 1024) {
      // seek to the end before writing in append mode
      FS.llseek(stream, 0, 2);
    }
    var seeking = typeof position !== "undefined";
    if (!seeking) {
      position = stream.position;
    } else if (!stream.seekable) {
      throw new FS.ErrnoError(70);
    }
    var bytesWritten = stream.stream_ops.write(stream, buffer, offset, length, position, canOwn);
    if (!seeking) stream.position += bytesWritten;
    return bytesWritten;
  },
  mmap(stream, length, position, prot, flags) {
    // User requests writing to file (prot & PROT_WRITE != 0).
    // Checking if we have permissions to write to the file unless
    // MAP_PRIVATE flag is set. According to POSIX spec it is possible
    // to write to file opened in read-only mode with MAP_PRIVATE flag,
    // as all modifications will be visible only in the memory of
    // the current process.
    if ((prot & 2) && !(flags & 2) && (stream.flags & 2097155) !== 2) {
      throw new FS.ErrnoError(2);
    }
    if ((stream.flags & 2097155) === 1) {
      throw new FS.ErrnoError(2);
    }
    if (!stream.stream_ops.mmap) {
      throw new FS.ErrnoError(43);
    }
    if (!length) {
      throw new FS.ErrnoError(28);
    }
    return stream.stream_ops.mmap(stream, length, position, prot, flags);
  },
  msync(stream, buffer, offset, length, mmapFlags) {
    assert(offset >= 0);
    if (!stream.stream_ops.msync) {
      return 0;
    }
    return stream.stream_ops.msync(stream, buffer, offset, length, mmapFlags);
  },
  ioctl(stream, cmd, arg) {
    if (!stream.stream_ops.ioctl) {
      throw new FS.ErrnoError(59);
    }
    return stream.stream_ops.ioctl(stream, cmd, arg);
  },
  readFile(path, opts = {}) {
    opts.flags ??= 0;
    opts.encoding ??= "binary";
    if (opts.encoding !== "utf8" && opts.encoding !== "binary") {
      abort(`Invalid encoding type "${opts.encoding}"`);
    }
    var stream = FS.open(path, opts.flags);
    var stat = FS.stat(path);
    var length = stat.size;
    var buf = new Uint8Array(length);
    FS.read(stream, buf, 0, length, 0);
    if (opts.encoding === "utf8") {
      buf = UTF8ArrayToString(buf);
    }
    FS.close(stream);
    return buf;
  },
  writeFile(path, data, opts = {}) {
    opts.flags ??= 577;
    var stream = FS.open(path, opts.flags, opts.mode);
    data = FS_fileDataToTypedArray(data);
    FS.write(stream, data, 0, data.byteLength, undefined, opts.canOwn);
    FS.close(stream);
  },
  cwd: () => FS.currentPath,
  chdir(path) {
    var lookup = FS.lookupPath(path, {
      follow: true
    });
    if (lookup.node === null) {
      throw new FS.ErrnoError(44);
    }
    if (!FS.isDir(lookup.node.mode)) {
      throw new FS.ErrnoError(54);
    }
    var errCode = FS.nodePermissions(lookup.node, "x");
    if (errCode) {
      throw new FS.ErrnoError(errCode);
    }
    FS.currentPath = lookup.path;
  },
  createDefaultDirectories() {
    FS.mkdir("/tmp");
    FS.mkdir("/home");
    FS.mkdir("/home/web_user");
  },
  createDefaultDevices() {
    // create /dev
    FS.mkdir("/dev");
    // setup /dev/null
    FS.registerDevice(FS.makedev(1, 3), {
      read: () => 0,
      write: (stream, buffer, offset, length, pos) => length,
      llseek: () => 0
    });
    FS.mkdev("/dev/null", FS.makedev(1, 3));
    // setup /dev/tty and /dev/tty1
    // stderr needs to print output using err() rather than out()
    // so we register a second tty just for it.
    TTY.register(FS.makedev(5, 0), TTY.default_tty_ops);
    TTY.register(FS.makedev(6, 0), TTY.default_tty1_ops);
    FS.mkdev("/dev/tty", FS.makedev(5, 0));
    FS.mkdev("/dev/tty1", FS.makedev(6, 0));
    // setup /dev/[u]random
    // use a buffer to avoid overhead of individual crypto calls per byte
    var randomBuffer = new Uint8Array(1024), randomLeft = 0;
    var randomByte = () => {
      if (!randomLeft) {
        randomFill(randomBuffer);
        randomLeft = randomBuffer.byteLength;
      }
      return randomBuffer[--randomLeft];
    };
    FS.createDevice("/dev", "random", randomByte);
    FS.createDevice("/dev", "urandom", randomByte);
    // we're not going to emulate the actual shm device,
    // just create the tmp dirs that reside in it commonly
    FS.mkdir("/dev/shm");
    FS.mkdir("/dev/shm/tmp");
  },
  createSpecialDirectories() {
    // create /proc/self/fd which allows /proc/self/fd/6 => readlink gives the
    // name of the stream for fd 6 (see test_unistd_ttyname)
    FS.mkdir("/proc");
    var proc_self = FS.mkdir("/proc/self");
    FS.mkdir("/proc/self/fd");
    FS.mount({
      mount() {
        var node = FS.createNode(proc_self, "fd", 16895, 73);
        node.stream_ops = {
          llseek: MEMFS.stream_ops.llseek
        };
        node.node_ops = {
          lookup(parent, name) {
            var fd = +name;
            var stream = FS.getStreamChecked(fd);
            var ret = {
              parent: null,
              mount: {
                mountpoint: "fake"
              },
              node_ops: {
                readlink: () => stream.path
              },
              id: fd + 1
            };
            ret.parent = ret;
            // make it look like a simple root node
            return ret;
          },
          readdir() {
            return Array.from(FS.streams.entries()).filter(([k, v]) => v).map(([k, v]) => k.toString());
          }
        };
        return node;
      }
    }, {}, "/proc/self/fd");
  },
  createStandardStreams(input, output, error) {
    // TODO deprecate the old functionality of a single
    // input / output callback and that utilizes FS.createDevice
    // and instead require a unique set of stream ops
    // by default, we symlink the standard streams to the
    // default tty devices. however, if the standard streams
    // have been overwritten we create a unique device for
    // them instead.
    if (input) {
      FS.createDevice("/dev", "stdin", input);
    } else {
      FS.symlink("/dev/tty", "/dev/stdin");
    }
    if (output) {
      FS.createDevice("/dev", "stdout", null, output);
    } else {
      FS.symlink("/dev/tty", "/dev/stdout");
    }
    if (error) {
      FS.createDevice("/dev", "stderr", null, error);
    } else {
      FS.symlink("/dev/tty1", "/dev/stderr");
    }
    // open default streams for the stdin, stdout and stderr devices
    var stdin = FS.open("/dev/stdin", 0);
    var stdout = FS.open("/dev/stdout", 1);
    var stderr = FS.open("/dev/stderr", 1);
    assert(stdin.fd === 0, `invalid handle for stdin (${stdin.fd})`);
    assert(stdout.fd === 1, `invalid handle for stdout (${stdout.fd})`);
    assert(stderr.fd === 2, `invalid handle for stderr (${stderr.fd})`);
  },
  staticInit() {
    FS.nameTable.length = 4096;
    FS.mount(MEMFS, {}, "/");
    FS.createDefaultDirectories();
    FS.createDefaultDevices();
    FS.createSpecialDirectories();
  },
  init(input = undefined, output = undefined, error = undefined) {
    assert(!FS.initialized, "FS.init was previously called. If you want to initialize later with custom parameters, remove any earlier calls (note that one is automatically added to the generated code)");
    FS.initialized = true;
    // Allow Module.stdin etc. to provide defaults, if none explicitly passed to us here
    input ??= Module["stdin"];
    output ??= Module["stdout"];
    error ??= Module["stderr"];
    FS.createStandardStreams(input, output, error);
  },
  quit() {
    FS.initialized = false;
    // force-flush all streams, so we get musl std streams printed out
    _fflush(0);
    // close all of our streams
    for (var stream of FS.streams) {
      if (stream) {
        FS.close(stream);
      }
    }
  },
  analyzePath(path, dontResolveLastLink = false) {
    warnOnce("FS.analyzePath is deprecated; use FS.lookupPath or FS.stat instead");
    // operate from within the context of the symlink's target
    try {
      var lookup = FS.lookupPath(path, {
        follow: !dontResolveLastLink
      });
      path = lookup.path;
    } catch (e) {}
    var ret = {
      isRoot: false,
      exists: false,
      error: 0,
      name: null,
      path: null,
      object: null,
      parentExists: false,
      parentPath: null,
      parentObject: null
    };
    try {
      var lookup = FS.lookupPath(path, {
        parent: true
      });
      ret.parentExists = true;
      ret.parentPath = lookup.path;
      ret.parentObject = lookup.node;
      ret.name = PATH.basename(path);
      lookup = FS.lookupPath(path, {
        follow: !dontResolveLastLink
      });
      ret.exists = true;
      ret.path = lookup.path;
      ret.object = lookup.node;
      ret.name = lookup.node.name;
      ret.isRoot = lookup.path === "/";
    } catch (e) {
      ret.error = e.errno;
    }
    return ret;
  },
  createPath(parent, path, canRead = undefined, canWrite = undefined) {
    parent = typeof parent === "string" ? parent : FS.getPath(parent);
    var parts = path.split("/").reverse();
    while (parts.length) {
      var part = parts.pop();
      if (!part) continue;
      var current = PATH.join2(parent, part);
      try {
        FS.mkdir(current);
      } catch (e) {
        if (e.errno != 20) throw e;
      }
      parent = current;
    }
    return current;
  },
  createFile(parent, name, properties, canRead = undefined, canWrite = undefined) {
    var path = PATH.join2(typeof parent === "string" ? parent : FS.getPath(parent), name);
    var mode = FS_getMode(canRead, canWrite);
    return FS.create(path, mode);
  },
  createDataFile(parent, name, data = undefined, canRead = undefined, canWrite = undefined, canOwn = undefined) {
    var path = name;
    if (parent) {
      parent = typeof parent === "string" ? parent : FS.getPath(parent);
      path = name ? PATH.join2(parent, name) : parent;
    }
    var mode = FS_getMode(canRead, canWrite);
    var node = FS.create(path, mode);
    if (data) {
      data = FS_fileDataToTypedArray(data);
      // make sure we can write to the file
      FS.chmod(node, mode | 146);
      var stream = FS.open(node, 577);
      FS.write(stream, data, 0, data.length, 0, canOwn);
      FS.close(stream);
      FS.chmod(node, mode);
    }
  },
  createDevice(parent, name, input = undefined, output = undefined) {
    var path = PATH.join2(typeof parent === "string" ? parent : FS.getPath(parent), name);
    var mode = FS_getMode(!!input, !!output);
    FS.createDevice.major ??= 64;
    var dev = FS.makedev(FS.createDevice.major++, 0);
    // Create a fake device that a set of stream ops to emulate
    // the old behavior.
    FS.registerDevice(dev, {
      open(stream) {
        stream.seekable = false;
      },
      close(stream) {
        // flush any pending line data
        if (output?.buffer?.length) {
          output(10);
        }
      },
      read(stream, buffer, offset, length, pos) {
        var bytesRead = 0;
        for (var i = 0; i < length; i++) {
          var result;
          try {
            result = input();
          } catch (e) {
            throw new FS.ErrnoError(29);
          }
          if (result === undefined && !bytesRead) {
            throw new FS.ErrnoError(6);
          }
          if (result === null || result === undefined) break;
          bytesRead++;
          buffer[offset + i] = result;
        }
        if (bytesRead) {
          stream.node.atime = Date.now();
        }
        return bytesRead;
      },
      write(stream, buffer, offset, length, pos) {
        for (var i = 0; i < length; i++) {
          try {
            output(buffer[offset + i]);
          } catch (e) {
            throw new FS.ErrnoError(29);
          }
        }
        if (length) {
          stream.node.mtime = stream.node.ctime = Date.now();
        }
        return i;
      }
    });
    return FS.mkdev(path, mode, dev);
  },
  forceLoadFile(obj) {
    if (obj.isDevice || obj.isFolder || obj.link || obj.contents) return true;
    if (globalThis.XMLHttpRequest) {
      abort("Lazy loading should have been performed (contents set) in createLazyFile, but it was not. Lazy loading only works in web workers. Use --embed-file or --preload-file in emcc on the main thread.");
    } else {
      // Command-line.
      try {
        obj.contents = readBinary(obj.url);
      } catch (e) {
        throw new FS.ErrnoError(29);
      }
    }
  },
  createLazyFile(parent, name, url, canRead = undefined, canWrite = undefined) {
    // Lazy chunked Uint8Array (implements get and length from Uint8Array).
    // Actual getting is abstracted away for eventual reuse.
    class LazyUint8Array {
      lengthKnown=false;
      chunks=[];
      // Loaded chunks. Index is the chunk number
      get(idx) {
        if (idx > this.length - 1 || idx < 0) {
          return undefined;
        }
        var chunkOffset = idx % this.chunkSize;
        var chunkNum = (idx / this.chunkSize) | 0;
        return this.getter(chunkNum)[chunkOffset];
      }
      setDataGetter(getter) {
        this.getter = getter;
      }
      cacheLength() {
        // Find length
        var xhr = new XMLHttpRequest;
        xhr.open("HEAD", url, false);
        xhr.send(null);
        if (!(xhr.status >= 200 && xhr.status < 300 || xhr.status === 304)) abort(`Couldn't load ${url}. Status: ${xhr.status}`);
        var datalength = Number(xhr.getResponseHeader("Content-length"));
        var header;
        var hasByteServing = (header = xhr.getResponseHeader("Accept-Ranges")) && header === "bytes";
        var usesGzip = (header = xhr.getResponseHeader("Content-Encoding")) && header === "gzip";
        var chunkSize = 1024 * 1024;
        // Chunk size in bytes
        if (!hasByteServing) chunkSize = datalength;
        // Function to get a range from the remote URL.
        var doXHR = (from, to) => {
          if (from > to) abort(`invalid range (${from}, ${to}) or no bytes requested!`);
          if (to > datalength - 1) abort(`only ${datalength} bytes available! programmer error!`);
          // TODO: Use mozResponseArrayBuffer, responseStream, etc. if available.
          var xhr = new XMLHttpRequest;
          xhr.open("GET", url, false);
          if (datalength !== chunkSize) xhr.setRequestHeader("Range", `bytes=${from}-${to}`);
          // Some hints to the browser that we want binary data.
          xhr.responseType = "arraybuffer";
          if (xhr.overrideMimeType) {
            xhr.overrideMimeType("text/plain; charset=x-user-defined");
          }
          xhr.send(null);
          if (!(xhr.status >= 200 && xhr.status < 300 || xhr.status === 304)) abort(`Couldn't load ${url}. Status: ${xhr.status}`);
          if (xhr.response !== undefined) {
            return new Uint8Array(/** @type{Array<number>} */ (xhr.response || []));
          }
          return intArrayFromString(xhr.responseText ?? "", true);
        };
        var lazyArray = this;
        lazyArray.setDataGetter(chunkNum => {
          var start = chunkNum * chunkSize;
          var end = (chunkNum + 1) * chunkSize - 1;
          // including this byte
          end = Math.min(end, datalength - 1);
          // if datalength-1 is selected, this is the last block
          if (typeof lazyArray.chunks[chunkNum] === "undefined") {
            lazyArray.chunks[chunkNum] = doXHR(start, end);
          }
          if (typeof lazyArray.chunks[chunkNum] === "undefined") abort("doXHR failed!");
          return lazyArray.chunks[chunkNum];
        });
        if (usesGzip || !datalength) {
          // if the server uses gzip or doesn't supply the length, we have to download the whole file to get the (uncompressed) length
          chunkSize = datalength = 1;
          // this will force getter(0)/doXHR do download the whole file
          datalength = this.getter(0).length;
          chunkSize = datalength;
          out("LazyFiles on gzip forces download of the whole file when length is accessed");
        }
        this._length = datalength;
        this._chunkSize = chunkSize;
        this.lengthKnown = true;
      }
      get length() {
        if (!this.lengthKnown) {
          this.cacheLength();
        }
        return this._length;
      }
      get chunkSize() {
        if (!this.lengthKnown) {
          this.cacheLength();
        }
        return this._chunkSize;
      }
    }
    if (globalThis.XMLHttpRequest) {
      if (!ENVIRONMENT_IS_WORKER) abort("Cannot do synchronous binary XHRs outside webworkers in modern browsers. Use --embed-file or --preload-file in emcc");
      var lazyArray = new LazyUint8Array;
      var properties = {
        isDevice: false,
        contents: lazyArray
      };
    } else {
      var properties = {
        isDevice: false,
        url
      };
    }
    var node = FS.createFile(parent, name, properties, canRead, canWrite);
    // This is a total hack, but I want to get this lazy file code out of the
    // core of MEMFS. If we want to keep this lazy file concept I feel it should
    // be its own thin LAZYFS proxying calls to MEMFS.
    if (properties.contents) {
      node.contents = properties.contents;
    } else if (properties.url) {
      node.contents = null;
      node.url = properties.url;
    }
    // Add a function that defers querying the file size until it is asked the first time.
    Object.defineProperties(node, {
      usedBytes: {
        get: function() {
          return this.contents.length;
        }
      }
    });
    // override each stream op with one that tries to force load the lazy file first
    var stream_ops = {};
    for (const [key, fn] of Object.entries(node.stream_ops)) {
      stream_ops[key] = (...args) => {
        FS.forceLoadFile(node);
        return fn(...args);
      };
    }
    function writeChunks(stream, buffer, offset, length, position) {
      var contents = stream.node.contents;
      if (position >= contents.length) return 0;
      var size = Math.min(contents.length - position, length);
      assert(size >= 0);
      if (contents.slice) {
        // normal array
        for (var i = 0; i < size; i++) {
          buffer[offset + i] = contents[position + i];
        }
      } else {
        for (var i = 0; i < size; i++) {
          // LazyUint8Array from sync binary XHR
          buffer[offset + i] = contents.get(position + i);
        }
      }
      return size;
    }
    // use a custom read function
    stream_ops.read = (stream, buffer, offset, length, position) => {
      FS.forceLoadFile(node);
      return writeChunks(stream, buffer, offset, length, position);
    };
    // use a custom mmap function
    stream_ops.mmap = (stream, length, position, prot, flags) => {
      FS.forceLoadFile(node);
      var ptr = mmapAlloc(length);
      if (!ptr) {
        throw new FS.ErrnoError(48);
      }
      writeChunks(stream, HEAP8, ptr, length, position);
      return {
        ptr,
        allocated: true
      };
    };
    node.stream_ops = stream_ops;
    return node;
  }
};

/** not-@type {!BigInt64Array} */ var HEAP64;

var SYSCALLS = {
  currentUmask: 18,
  calculateAt(dirfd, path, allowEmpty = false) {
    if (PATH.isAbs(path)) {
      return path;
    }
    // relative path
    var dir;
    if (dirfd === -100) {
      dir = FS.cwd();
    } else {
      var dirstream = SYSCALLS.getStreamFromFD(dirfd);
      dir = dirstream.path;
    }
    if (path.length == 0) {
      if (!allowEmpty) {
        throw new FS.ErrnoError(44);
      }
      return dir;
    }
    return dir + "/" + path;
  },
  writeStat(buf, stat) {
    HEAPU32[((buf) >> 2)] = stat.dev;
    HEAPU32[(((buf) + (4)) >> 2)] = stat.mode;
    HEAPU32[(((buf) + (8)) >> 2)] = stat.nlink;
    HEAPU32[(((buf) + (12)) >> 2)] = stat.uid;
    HEAPU32[(((buf) + (16)) >> 2)] = stat.gid;
    HEAPU32[(((buf) + (20)) >> 2)] = stat.rdev;
    HEAP64[(((buf) + (24)) >> 3)] = BigInt(stat.size);
    HEAP32[(((buf) + (32)) >> 2)] = 4096;
    HEAP32[(((buf) + (36)) >> 2)] = stat.blocks;
    var atime = stat.atime.getTime();
    var mtime = stat.mtime.getTime();
    var ctime = stat.ctime.getTime();
    HEAP64[(((buf) + (40)) >> 3)] = BigInt(Math.floor(atime / 1e3));
    HEAPU32[(((buf) + (48)) >> 2)] = (atime % 1e3) * 1e3 * 1e3;
    HEAP64[(((buf) + (56)) >> 3)] = BigInt(Math.floor(mtime / 1e3));
    HEAPU32[(((buf) + (64)) >> 2)] = (mtime % 1e3) * 1e3 * 1e3;
    HEAP64[(((buf) + (72)) >> 3)] = BigInt(Math.floor(ctime / 1e3));
    HEAPU32[(((buf) + (80)) >> 2)] = (ctime % 1e3) * 1e3 * 1e3;
    HEAP64[(((buf) + (88)) >> 3)] = BigInt(stat.ino);
    return 0;
  },
  writeStatFs(buf, stats) {
    HEAPU32[(((buf) + (4)) >> 2)] = stats.bsize;
    HEAPU32[(((buf) + (60)) >> 2)] = stats.bsize;
    HEAP64[(((buf) + (8)) >> 3)] = BigInt(stats.blocks);
    HEAP64[(((buf) + (16)) >> 3)] = BigInt(stats.bfree);
    HEAP64[(((buf) + (24)) >> 3)] = BigInt(stats.bavail);
    HEAP64[(((buf) + (32)) >> 3)] = BigInt(stats.files);
    HEAP64[(((buf) + (40)) >> 3)] = BigInt(stats.ffree);
    HEAPU32[(((buf) + (48)) >> 2)] = stats.fsid;
    HEAPU32[(((buf) + (64)) >> 2)] = stats.flags;
    // ST_NOSUID
    HEAPU32[(((buf) + (56)) >> 2)] = stats.namelen;
  },
  doMsync(addr, stream, len, flags, offset) {
    if (!FS.isFile(stream.node.mode)) {
      throw new FS.ErrnoError(43);
    }
    if (flags & 2) {
      // MAP_PRIVATE calls need not to be synced back to underlying fs
      return 0;
    }
    var buffer = HEAPU8.subarray(addr, addr + len);
    FS.msync(stream, buffer, offset, len, flags);
  },
  getStreamFromFD(fd) {
    var stream = FS.getStreamChecked(fd);
    return stream;
  },
  varargs: undefined,
  getStr(ptr) {
    var ret = UTF8ToString(ptr);
    return ret;
  }
};

function ___syscall_chmod(path, mode) {
  try {
    path = SYSCALLS.getStr(path);
    FS.chmod(path, mode);
    return 0;
  } catch (e) {
    if (typeof FS === "undefined" || !(e.name === "ErrnoError")) throw e;
    return -e.errno;
  }
}

function ___syscall_fchmod(fd, mode) {
  try {
    FS.fchmod(fd, mode);
    return 0;
  } catch (e) {
    if (typeof FS === "undefined" || !(e.name === "ErrnoError")) throw e;
    return -e.errno;
  }
}

var syscallGetVarargI = () => {
  assert(SYSCALLS.varargs != undefined);
  // the `+` prepended here is necessary to convince the JSCompiler that varargs is indeed a number.
  var ret = HEAP32[((+SYSCALLS.varargs) >> 2)];
  SYSCALLS.varargs += 4;
  return ret;
};

var syscallGetVarargP = syscallGetVarargI;

/** @type {!Int16Array} */ var HEAP16;

function ___syscall_fcntl64(fd, cmd, varargs) {
  SYSCALLS.varargs = varargs;
  try {
    var stream = SYSCALLS.getStreamFromFD(fd);
    switch (cmd) {
     case 0:
      {
        var arg = syscallGetVarargI();
        if (arg < 0) {
          return -28;
        }
        while (FS.streams[arg]) {
          arg++;
        }
        var newStream;
        newStream = FS.dupStream(stream, arg);
        return newStream.fd;
      }

     case 1:
     case 2:
      return 0;

     // FD_CLOEXEC makes no sense for a single process.
      case 3:
      return stream.flags;

     case 4:
      {
        var arg = syscallGetVarargI();
        var mask = 289792;
        stream.flags = (stream.flags & ~mask) | (arg & mask);
        return 0;
      }

     case 12:
      {
        var arg = syscallGetVarargP();
        var offset = 0;
        // We're always unlocked.
        HEAP16[(((arg) + (offset)) >> 1)] = 2;
        return 0;
      }

     case 13:
     case 14:
      // Pretend that the locking is successful. These are process-level locks,
      // and Emscripten programs are a single process. If we supported linking a
      // filesystem between programs, we'd need to do more here.
      // See https://github.com/emscripten-core/emscripten/issues/23697
      return 0;
    }
    return -28;
  } catch (e) {
    if (typeof FS === "undefined" || !(e.name === "ErrnoError")) throw e;
    return -e.errno;
  }
}

function ___syscall_fdatasync(fd) {
  try {
    var stream = SYSCALLS.getStreamFromFD(fd);
    return 0;
  } catch (e) {
    if (typeof FS === "undefined" || !(e.name === "ErrnoError")) throw e;
    return -e.errno;
  }
}

function ___syscall_fstat64(fd, buf) {
  try {
    return SYSCALLS.writeStat(buf, FS.fstat(fd));
  } catch (e) {
    if (typeof FS === "undefined" || !(e.name === "ErrnoError")) throw e;
    return -e.errno;
  }
}

var INT53_MAX = 9007199254740992;

var INT53_MIN = -9007199254740992;

var bigintToI53Checked = num => (num < INT53_MIN || num > INT53_MAX) ? NaN : Number(num);

function ___syscall_ftruncate64(fd, length) {
  length = bigintToI53Checked(length);
  try {
    if (isNaN(length)) return -22;
    FS.ftruncate(fd, length);
    return 0;
  } catch (e) {
    if (typeof FS === "undefined" || !(e.name === "ErrnoError")) throw e;
    return -e.errno;
  }
}

var stringToUTF8 = (str, outPtr, maxBytesToWrite) => {
  assert(typeof maxBytesToWrite === "number", "stringToUTF8 requires a third parameter that specifies the length of the output buffer");
  return stringToUTF8Array(str, HEAPU8, outPtr, maxBytesToWrite);
};

function ___syscall_getcwd(buf, size) {
  try {
    if (!size) return -28;
    var cwd = FS.cwd();
    var cwdLengthInBytes = lengthBytesUTF8(cwd) + 1;
    if (size < cwdLengthInBytes) return -68;
    stringToUTF8(cwd, buf, size);
    return cwdLengthInBytes;
  } catch (e) {
    if (typeof FS === "undefined" || !(e.name === "ErrnoError")) throw e;
    return -e.errno;
  }
}

function ___syscall_getdents64(fd, dirp, count) {
  try {
    var stream = SYSCALLS.getStreamFromFD(fd);
    stream.getdents ||= FS.readdir(stream.path);
    var struct_size = 280;
    var pos = 0;
    var off = FS.llseek(stream, 0, 1);
    var startIdx = Math.floor(off / struct_size);
    var endIdx = Math.min(stream.getdents.length, startIdx + Math.floor(count / struct_size));
    for (var idx = startIdx; idx < endIdx; idx++) {
      var id;
      var type;
      var name = stream.getdents[idx];
      if (name === ".") {
        id = stream.node.id;
        type = 4;
      } else if (name === "..") {
        var lookup = FS.lookupPath(stream.path, {
          parent: true
        });
        id = lookup.node.id;
        type = 4;
      } else {
        var child;
        try {
          child = FS.lookupNode(stream.node, name);
        } catch (e) {
          // If the entry is not a directory, file, or symlink, nodefs
          // lookupNode will raise EINVAL. Skip these and continue.
          if (e?.errno === 28) {
            continue;
          }
          throw e;
        }
        id = child.id;
        type = FS.isChrdev(child.mode) ? 2 : // character device.
        FS.isDir(child.mode) ? 4 : // directory
        FS.isLink(child.mode) ? 10 : // symbolic link.
        8;
      }
      assert(id);
      HEAP64[((dirp + pos) >> 3)] = BigInt(id);
      HEAP64[(((dirp + pos) + (8)) >> 3)] = BigInt((idx + 1) * struct_size);
      HEAP16[(((dirp + pos) + (16)) >> 1)] = 280;
      HEAP8[(dirp + pos) + (18)] = type;
      stringToUTF8(name, dirp + pos + 19, 256);
      pos += struct_size;
    }
    FS.llseek(stream, idx * struct_size, 0);
    return pos;
  } catch (e) {
    if (typeof FS === "undefined" || !(e.name === "ErrnoError")) throw e;
    return -e.errno;
  }
}

function ___syscall_ioctl(fd, op, varargs) {
  SYSCALLS.varargs = varargs;
  try {
    var stream = SYSCALLS.getStreamFromFD(fd);
    switch (op) {
     case 21509:
      {
        if (!stream.tty) return -59;
        return 0;
      }

     case 21505:
      {
        if (!stream.tty) return -59;
        if (stream.tty.ops.ioctl_tcgets) {
          var termios = stream.tty.ops.ioctl_tcgets(stream);
          var argp = syscallGetVarargP();
          HEAP32[((argp) >> 2)] = termios.c_iflag || 0;
          HEAP32[(((argp) + (4)) >> 2)] = termios.c_oflag || 0;
          HEAP32[(((argp) + (8)) >> 2)] = termios.c_cflag || 0;
          HEAP32[(((argp) + (12)) >> 2)] = termios.c_lflag || 0;
          for (var i = 0; i < 32; i++) {
            HEAP8[(argp + i) + (17)] = termios.c_cc[i] || 0;
          }
          return 0;
        }
        return 0;
      }

     case 21510:
     case 21511:
     case 21512:
      {
        if (!stream.tty) return -59;
        return 0;
      }

     case 21506:
     case 21507:
     case 21508:
      {
        if (!stream.tty) return -59;
        if (stream.tty.ops.ioctl_tcsets) {
          var argp = syscallGetVarargP();
          var c_iflag = HEAP32[((argp) >> 2)];
          var c_oflag = HEAP32[(((argp) + (4)) >> 2)];
          var c_cflag = HEAP32[(((argp) + (8)) >> 2)];
          var c_lflag = HEAP32[(((argp) + (12)) >> 2)];
          var c_cc = [];
          for (var i = 0; i < 32; i++) {
            c_cc.push(HEAP8[(argp + i) + (17)]);
          }
          return stream.tty.ops.ioctl_tcsets(stream.tty, op, {
            c_iflag,
            c_oflag,
            c_cflag,
            c_lflag,
            c_cc
          });
        }
        return 0;
      }

     case 21519:
      {
        if (!stream.tty) return -59;
        var argp = syscallGetVarargP();
        HEAP32[((argp) >> 2)] = 0;
        return 0;
      }

     case 21520:
      {
        if (!stream.tty) return -59;
        return -28;
      }

     case 21537:
     case 21531:
      {
        var argp = syscallGetVarargP();
        return FS.ioctl(stream, op, argp);
      }

     case 21523:
      {
        // TODO: in theory we should write to the winsize struct that gets
        // passed in, but for now musl doesn't read anything on it
        if (!stream.tty) return -59;
        if (stream.tty.ops.ioctl_tiocgwinsz) {
          var winsize = stream.tty.ops.ioctl_tiocgwinsz(stream.tty);
          var argp = syscallGetVarargP();
          HEAP16[((argp) >> 1)] = winsize[0];
          HEAP16[(((argp) + (2)) >> 1)] = winsize[1];
        }
        return 0;
      }

     case 21524:
      {
        // TODO: technically, this ioctl call should change the window size.
        // but, since emscripten doesn't have any concept of a terminal window
        // yet, we'll just silently throw it away as we do TIOCGWINSZ
        if (!stream.tty) return -59;
        return 0;
      }

     case 21515:
      {
        if (!stream.tty) return -59;
        return 0;
      }

     default:
      return -28;
    }
  } catch (e) {
    if (typeof FS === "undefined" || !(e.name === "ErrnoError")) throw e;
    return -e.errno;
  }
}

function ___syscall_lstat64(path, buf) {
  try {
    path = SYSCALLS.getStr(path);
    return SYSCALLS.writeStat(buf, FS.lstat(path));
  } catch (e) {
    if (typeof FS === "undefined" || !(e.name === "ErrnoError")) throw e;
    return -e.errno;
  }
}

function ___syscall_mkdirat(dirfd, path, mode) {
  try {
    path = SYSCALLS.getStr(path);
    path = SYSCALLS.calculateAt(dirfd, path);
    mode &= ~SYSCALLS.currentUmask;
    FS.mkdir(path, mode);
    return 0;
  } catch (e) {
    if (typeof FS === "undefined" || !(e.name === "ErrnoError")) throw e;
    return -e.errno;
  }
}

function ___syscall_newfstatat(dirfd, path, buf, flags) {
  try {
    path = SYSCALLS.getStr(path);
    var nofollow = flags & 256;
    var allowEmpty = flags & 4096;
    flags = flags & (~6400);
    assert(!flags, `unknown flags in __syscall_newfstatat: ${flags}`);
    path = SYSCALLS.calculateAt(dirfd, path, allowEmpty);
    return SYSCALLS.writeStat(buf, nofollow ? FS.lstat(path) : FS.stat(path));
  } catch (e) {
    if (typeof FS === "undefined" || !(e.name === "ErrnoError")) throw e;
    return -e.errno;
  }
}

function ___syscall_openat(dirfd, path, flags, varargs) {
  SYSCALLS.varargs = varargs;
  try {
    path = SYSCALLS.getStr(path);
    path = SYSCALLS.calculateAt(dirfd, path);
    var mode = varargs ? syscallGetVarargI() : 0;
    if (flags & 64) {
      mode &= ~SYSCALLS.currentUmask;
    }
    return FS.open(path, flags, mode).fd;
  } catch (e) {
    if (typeof FS === "undefined" || !(e.name === "ErrnoError")) throw e;
    return -e.errno;
  }
}

function ___syscall_renameat(olddirfd, oldpath, newdirfd, newpath) {
  try {
    oldpath = SYSCALLS.getStr(oldpath);
    newpath = SYSCALLS.getStr(newpath);
    oldpath = SYSCALLS.calculateAt(olddirfd, oldpath);
    newpath = SYSCALLS.calculateAt(newdirfd, newpath);
    FS.rename(oldpath, newpath);
    return 0;
  } catch (e) {
    if (typeof FS === "undefined" || !(e.name === "ErrnoError")) throw e;
    return -e.errno;
  }
}

function ___syscall_rmdir(path) {
  try {
    path = SYSCALLS.getStr(path);
    FS.rmdir(path);
    return 0;
  } catch (e) {
    if (typeof FS === "undefined" || !(e.name === "ErrnoError")) throw e;
    return -e.errno;
  }
}

function ___syscall_stat64(path, buf) {
  try {
    path = SYSCALLS.getStr(path);
    return SYSCALLS.writeStat(buf, FS.stat(path));
  } catch (e) {
    if (typeof FS === "undefined" || !(e.name === "ErrnoError")) throw e;
    return -e.errno;
  }
}

function ___syscall_unlinkat(dirfd, path, flags) {
  try {
    path = SYSCALLS.getStr(path);
    path = SYSCALLS.calculateAt(dirfd, path);
    if (!flags) {
      FS.unlink(path);
    } else if (flags === 512) {
      FS.rmdir(path);
    } else {
      return -28;
    }
    return 0;
  } catch (e) {
    if (typeof FS === "undefined" || !(e.name === "ErrnoError")) throw e;
    return -e.errno;
  }
}

var __abort_js = () => abort("native code called abort()");

function __gmtime_js(time, tmPtr) {
  time = bigintToI53Checked(time);
  var date = new Date(time * 1e3);
  if (isNaN(date.getTime())) {
    return 1;
  }
  HEAP32[((tmPtr) >> 2)] = date.getUTCSeconds();
  HEAP32[(((tmPtr) + (4)) >> 2)] = date.getUTCMinutes();
  HEAP32[(((tmPtr) + (8)) >> 2)] = date.getUTCHours();
  HEAP32[(((tmPtr) + (12)) >> 2)] = date.getUTCDate();
  HEAP32[(((tmPtr) + (16)) >> 2)] = date.getUTCMonth();
  HEAP32[(((tmPtr) + (20)) >> 2)] = date.getUTCFullYear() - 1900;
  HEAP32[(((tmPtr) + (24)) >> 2)] = date.getUTCDay();
  var start = Date.UTC(date.getUTCFullYear(), 0, 1, 0, 0, 0, 0);
  var yday = ((date.getTime() - start) / (1e3 * 60 * 60 * 24)) | 0;
  HEAP32[(((tmPtr) + (28)) >> 2)] = yday;
  return 0;
}

var isLeapYear = year => year % 4 === 0 && (year % 100 !== 0 || year % 400 === 0);

var MONTH_DAYS_LEAP_CUMULATIVE = [ 0, 31, 60, 91, 121, 152, 182, 213, 244, 274, 305, 335 ];

var MONTH_DAYS_REGULAR_CUMULATIVE = [ 0, 31, 59, 90, 120, 151, 181, 212, 243, 273, 304, 334 ];

var ydayFromDate = date => {
  var leap = isLeapYear(date.getFullYear());
  var monthDaysCumulative = (leap ? MONTH_DAYS_LEAP_CUMULATIVE : MONTH_DAYS_REGULAR_CUMULATIVE);
  var yday = monthDaysCumulative[date.getMonth()] + date.getDate() - 1;
  // -1 since it's days since Jan 1
  return yday;
};

function __localtime_js(time, tmPtr) {
  time = bigintToI53Checked(time);
  var date = new Date(time * 1e3);
  if (isNaN(date.getTime())) {
    return 1;
  }
  HEAP32[((tmPtr) >> 2)] = date.getSeconds();
  HEAP32[(((tmPtr) + (4)) >> 2)] = date.getMinutes();
  HEAP32[(((tmPtr) + (8)) >> 2)] = date.getHours();
  HEAP32[(((tmPtr) + (12)) >> 2)] = date.getDate();
  HEAP32[(((tmPtr) + (16)) >> 2)] = date.getMonth();
  HEAP32[(((tmPtr) + (20)) >> 2)] = date.getFullYear() - 1900;
  HEAP32[(((tmPtr) + (24)) >> 2)] = date.getDay();
  var yday = ydayFromDate(date) | 0;
  HEAP32[(((tmPtr) + (28)) >> 2)] = yday;
  HEAP32[(((tmPtr) + (36)) >> 2)] = -(date.getTimezoneOffset() * 60);
  // Attention: DST is in December in South, and some regions don't have DST at all.
  var start = new Date(date.getFullYear(), 0, 1);
  var summerOffset = new Date(date.getFullYear(), 6, 1).getTimezoneOffset();
  var winterOffset = start.getTimezoneOffset();
  var dst = (summerOffset != winterOffset && date.getTimezoneOffset() == Math.min(winterOffset, summerOffset)) | 0;
  HEAP32[(((tmPtr) + (32)) >> 2)] = dst;
  return 0;
}

var __tzset_js = (timezone, daylight, std_name, dst_name) => {
  // TODO: Use (malleable) environment variables instead of system settings.
  var currentYear = (new Date).getFullYear();
  var winter = new Date(currentYear, 0, 1);
  var summer = new Date(currentYear, 6, 1);
  var winterOffset = winter.getTimezoneOffset();
  var summerOffset = summer.getTimezoneOffset();
  // Local standard timezone offset. Local standard time is not adjusted for
  // daylight savings.  This code uses the fact that getTimezoneOffset returns
  // a greater value during Standard Time versus Daylight Saving Time (DST).
  // Thus it determines the expected output during Standard Time, and it
  // compares whether the output of the given date the same (Standard) or less
  // (DST).
  var stdTimezoneOffset = Math.max(winterOffset, summerOffset);
  // timezone is specified as seconds west of UTC ("The external variable
  // `timezone` shall be set to the difference, in seconds, between
  // Coordinated Universal Time (UTC) and local standard time."), the same
  // as returned by stdTimezoneOffset.
  // See http://pubs.opengroup.org/onlinepubs/009695399/functions/tzset.html
  HEAPU32[((timezone) >> 2)] = stdTimezoneOffset * 60;
  HEAP32[((daylight) >> 2)] = Number(winterOffset != summerOffset);
  var extractZone = timezoneOffset => {
    // Why inverse sign?
    // Read here https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/getTimezoneOffset
    var sign = timezoneOffset >= 0 ? "-" : "+";
    var absOffset = Math.abs(timezoneOffset);
    var hours = String(Math.floor(absOffset / 60)).padStart(2, "0");
    var minutes = String(absOffset % 60).padStart(2, "0");
    return `UTC${sign}${hours}${minutes}`;
  };
  var winterName = extractZone(winterOffset);
  var summerName = extractZone(summerOffset);
  assert(winterName);
  assert(summerName);
  assert(lengthBytesUTF8(winterName) <= 16, `timezone name truncated to fit in TZNAME_MAX (${winterName})`);
  assert(lengthBytesUTF8(summerName) <= 16, `timezone name truncated to fit in TZNAME_MAX (${summerName})`);
  if (summerOffset < winterOffset) {
    // Northern hemisphere
    stringToUTF8(winterName, std_name, 17);
    stringToUTF8(summerName, dst_name, 17);
  } else {
    stringToUTF8(winterName, dst_name, 17);
    stringToUTF8(summerName, std_name, 17);
  }
};

var _emscripten_get_now = () => performance.now();

var _emscripten_date_now = () => Date.now();

var nowIsMonotonic = 1;

var checkWasiClock = clock_id => clock_id >= 0 && clock_id <= 3;

function _clock_time_get(clk_id, ignored_precision, ptime) {
  ignored_precision = bigintToI53Checked(ignored_precision);
  if (!checkWasiClock(clk_id)) {
    return 28;
  }
  var now;
  // all wasi clocks but realtime are monotonic
  if (clk_id === 0) {
    now = _emscripten_date_now();
  } else if (nowIsMonotonic) {
    now = _emscripten_get_now();
  } else {
    return 52;
  }
  // "now" is in ms, and wasi times are in ns.
  var nsec = Math.round(now * 1e6);
  HEAP64[((ptime) >> 3)] = BigInt(nsec);
  return 0;
}

var readEmAsmArgsArray = [];

/** @type {!Float64Array} */ var HEAPF64;

var readEmAsmArgs = (sigPtr, buf) => {
  // Nobody should have mutated _readEmAsmArgsArray underneath us to be something else than an array.
  assert(Array.isArray(readEmAsmArgsArray));
  // The input buffer is allocated on the stack, so it must be stack-aligned.
  assert(buf % 16 == 0);
  readEmAsmArgsArray.length = 0;
  var ch;
  // Most arguments are i32s, so shift the buffer pointer so it is a plain
  // index into HEAP32.
  while (ch = HEAPU8[sigPtr++]) {
    var chr = String.fromCharCode(ch);
    var validChars = [ "d", "f", "i", "p" ];
    // In WASM_BIGINT mode we support passing i64 values as bigint.
    validChars.push("j");
    assert(validChars.includes(chr), `Invalid character ${ch}("${chr}") in readEmAsmArgs! Use only [${validChars}], and do not specify "v" for void return argument.`);
    // Floats are always passed as doubles, so all types except for 'i'
    // are 8 bytes and require alignment.
    var wide = (ch != 105);
    wide &= (ch != 112);
    buf += wide && (buf % 8) ? 4 : 0;
    readEmAsmArgsArray.push(// Special case for pointers under wasm64 or CAN_ADDRESS_2GB mode.
    ch == 112 ? HEAPU32[((buf) >> 2)] : ch == 106 ? HEAP64[((buf) >> 3)] : ch == 105 ? HEAP32[((buf) >> 2)] : HEAPF64[((buf) >> 3)]);
    buf += wide ? 8 : 4;
  }
  return readEmAsmArgsArray;
};

var runEmAsmFunction = (code, sigPtr, argbuf) => {
  var args = readEmAsmArgs(sigPtr, argbuf);
  assert(ASM_CONSTS.hasOwnProperty(code), `No EM_ASM constant found at address ${code}.  The loaded WebAssembly file is likely out of sync with the generated JavaScript.`);
  return ASM_CONSTS[code](...args);
};

var _emscripten_asm_const_double = (code, sigPtr, argbuf) => runEmAsmFunction(code, sigPtr, argbuf);

var runMainThreadEmAsm = (emAsmAddr, sigPtr, argbuf, sync) => {
  var args = readEmAsmArgs(sigPtr, argbuf);
  assert(ASM_CONSTS.hasOwnProperty(emAsmAddr), `No EM_ASM constant found at address ${emAsmAddr}.  The loaded WebAssembly file is likely out of sync with the generated JavaScript.`);
  return ASM_CONSTS[emAsmAddr](...args);
};

var _emscripten_asm_const_int_sync_on_main_thread = (emAsmAddr, sigPtr, argbuf) => runMainThreadEmAsm(emAsmAddr, sigPtr, argbuf, 1);

var _emscripten_asm_const_double_sync_on_main_thread = _emscripten_asm_const_int_sync_on_main_thread;

var _emscripten_asm_const_int = (code, sigPtr, argbuf) => runEmAsmFunction(code, sigPtr, argbuf);

var _emscripten_asm_const_ptr = (code, sigPtr, argbuf) => runEmAsmFunction(code, sigPtr, argbuf);

var _emscripten_asm_const_ptr_sync_on_main_thread = (emAsmAddr, sigPtr, argbuf) => runMainThreadEmAsm(emAsmAddr, sigPtr, argbuf, 1);

var _emscripten_set_main_loop_timing = (mode, value) => {
  MainLoop.timingMode = mode;
  MainLoop.timingValue = value;
  if (!MainLoop.func) {
    err("emscripten_set_main_loop_timing: Cannot set timing mode for main loop since a main loop does not exist! Call emscripten_set_main_loop first to set one up.");
    return 1;
  }
  if (mode == 0) {
    MainLoop.scheduler = function MainLoop_scheduler_setTimeout() {
      var timeUntilNextTick = Math.max(0, MainLoop.tickStartTime + value - _emscripten_get_now()) | 0;
      setTimeout(MainLoop.runner, timeUntilNextTick);
    };
  } else if (mode == 1) {
    MainLoop.scheduler = function MainLoop_scheduler_rAF() {
      MainLoop.requestAnimationFrame(MainLoop.runner);
    };
  } else {
    assert(mode == 2);
    if (!MainLoop.setImmediate) {
      if (globalThis.scheduler) {
        // Some modern browsers implement scheduler.postTask, but not all.
        MainLoop.setImmediate = scheduler.postTask.bind(scheduler);
      } else {
        // Emulate setImmediate. (note: not a complete polyfill, we don't emulate clearImmediate() to keep code size to minimum, since not needed)
        var setImmediates = [];
        var emscriptenMainLoopMessageId = "setimmediate";
        /** @param {Event} event */ var MainLoop_setImmediate_messageHandler = event => {
          if (event.data === emscriptenMainLoopMessageId) {
            event.stopPropagation();
            setImmediates.shift()();
          }
        };
        addEventListener("message", MainLoop_setImmediate_messageHandler, true);
        MainLoop.setImmediate = /** @type{function(function(): ?, ...?): number} */ (func => {
          setImmediates.push(func);
          if (ENVIRONMENT_IS_WORKER) {
            // The postMessge API in a Worker, sends message to the main
            // thread and does not support the `targetOrigin` (*) argument.
            postMessage(emscriptenMainLoopMessageId);
          } else {
            postMessage(emscriptenMainLoopMessageId, "*");
          }
        });
      }
    }
    MainLoop.scheduler = function MainLoop_scheduler_setImmediate() {
      MainLoop.setImmediate(MainLoop.runner);
    };
  }
  return 0;
};

var runtimeKeepaliveCounter = 0;

var keepRuntimeAlive = () => noExitRuntime || runtimeKeepaliveCounter > 0;

var _proc_exit = code => {
  EXITSTATUS = code;
  if (!keepRuntimeAlive()) {
    Module["onExit"]?.(code);
    ABORT = true;
  }
  quit_(code, new ExitStatus(code));
};

/** @param {boolean|number=} implicit */ var exitJS = (status, implicit) => {
  EXITSTATUS = status;
  checkUnflushedContent();
  // if exit() was called explicitly, warn the user if the runtime isn't actually being shut down
  if (keepRuntimeAlive() && !implicit) {
    var msg = `program exited (with status: ${status}), but keepRuntimeAlive() is set (counter=${runtimeKeepaliveCounter}) due to an async operation, so halting execution but not exiting the runtime or preventing further async execution (you can use emscripten_force_exit, if you want to force a true shutdown)`;
    err(msg);
  }
  _proc_exit(status);
};

var _exit = exitJS;

var handleException = e => {
  // Certain exception types we do not treat as errors since they are used for
  // internal control flow.
  // 1. ExitStatus, which is thrown by exit()
  // 2. "unwind", which is thrown by emscripten_unwind_to_js_event_loop() and others
  //    that wish to return to JS event loop.
  if (e instanceof ExitStatus || e == "unwind") {
    return EXITSTATUS;
  }
  checkStackCookie();
  if (e instanceof WebAssembly.RuntimeError) {
    if (_emscripten_stack_get_current() <= 0) {
      err("Stack overflow detected.  You can try increasing -sSTACK_SIZE (currently set to 65536)");
    }
  }
  quit_(1, e);
};

var maybeExit = () => {
  if (!keepRuntimeAlive()) {
    try {
      _exit(EXITSTATUS);
    } catch (e) {
      handleException(e);
    }
  }
};

/**
   * @param {number=} arg
   * @param {boolean=} noSetTiming
   */ var setMainLoop = (iterFunc, fps, simulateInfiniteLoop, arg, noSetTiming) => {
  assert(!MainLoop.func, "emscripten_set_main_loop: there can only be one main loop function at once");
  MainLoop.func = iterFunc;
  MainLoop.arg = arg;
  var thisMainLoopId = MainLoop.currentlyRunningMainloop;
  function checkIsRunning() {
    if (thisMainLoopId < MainLoop.currentlyRunningMainloop) {
      maybeExit();
      return false;
    }
    return true;
  }
  // We create the loop runner here but it is not actually running until
  // _emscripten_set_main_loop_timing is called (which might happen at a
  // later time).
  MainLoop.runner = function MainLoop_runner() {
    if (ABORT) return;
    if (MainLoop.queue.length > 0) {
      var start = Date.now();
      var blocker = MainLoop.queue.shift();
      blocker.func(blocker.arg);
      if (MainLoop.remainingBlockers) {
        var remaining = MainLoop.remainingBlockers;
        var next = remaining % 1 == 0 ? remaining - 1 : Math.floor(remaining);
        if (blocker.counted) {
          MainLoop.remainingBlockers = next;
        } else {
          // not counted, but move the progress along a tiny bit
          next = next + .5;
          // do not steal all the next one's progress
          MainLoop.remainingBlockers = (8 * remaining + next) / 9;
        }
      }
      MainLoop.updateStatus();
      // catches pause/resume main loop from blocker execution
      if (!checkIsRunning()) return;
      setTimeout(MainLoop.runner, 0);
      return;
    }
    // catch pauses from non-main loop sources
    if (!checkIsRunning()) return;
    // Implement very basic swap interval control
    MainLoop.currentFrameNumber = MainLoop.currentFrameNumber + 1 | 0;
    if (MainLoop.timingMode == 1 && MainLoop.timingValue > 1 && MainLoop.currentFrameNumber % MainLoop.timingValue != 0) {
      // Not the scheduled time to render this frame - skip.
      MainLoop.scheduler();
      return;
    } else if (MainLoop.timingMode == 0) {
      MainLoop.tickStartTime = _emscripten_get_now();
      if (Module["ctx"]) {
        warnOnce("Looks like you are rendering without using requestAnimationFrame for the main loop. You should use 0 for the frame rate in emscripten_set_main_loop in order to use requestAnimationFrame, as that can greatly improve your frame rates!");
      }
    }
    MainLoop.runIter(iterFunc);
    // catch pauses from the main loop itself
    if (!checkIsRunning()) return;
    MainLoop.scheduler();
  };
  if (!noSetTiming) {
    if (fps > 0) {
      _emscripten_set_main_loop_timing(0, 1e3 / fps);
    } else {
      // Do rAF by rendering each frame (no decimating)
      _emscripten_set_main_loop_timing(1, 1);
    }
    MainLoop.scheduler();
  }
  if (simulateInfiniteLoop) {
    throw "unwind";
  }
};

var callUserCallback = (func, ...args) => {
  if (ABORT) {
    err("user callback triggered after runtime exited or application aborted.  Ignoring.");
    return;
  }
  try {
    return func(...args);
  } catch (e) {
    handleException(e);
  } finally {
    maybeExit();
  }
};

var MainLoop = {
  func: null,
  scheduler: null,
  currentlyRunningMainloop: 0,
  arg: 0,
  timingMode: 0,
  timingValue: 0,
  currentFrameNumber: 0,
  queue: [],
  preMainLoop: [],
  postMainLoop: [],
  pause() {
    if (MainLoop.scheduler) {
      MainLoop.scheduler = null;
      // Incrementing this signals the previous main loop that it's now become old, and it must return.
      MainLoop.currentlyRunningMainloop++;
    }
  },
  resume() {
    MainLoop.currentlyRunningMainloop++;
    var timingMode = MainLoop.timingMode;
    var timingValue = MainLoop.timingValue;
    var func = MainLoop.func;
    MainLoop.func = null;
    // do not set timing and call scheduler, we will do it on the next lines
    setMainLoop(func, 0, false, MainLoop.arg, true);
    _emscripten_set_main_loop_timing(timingMode, timingValue);
    MainLoop.scheduler();
  },
  updateStatus() {
    if (Module["setStatus"]) {
      var message = Module["statusMessage"] || "Please wait...";
      var remaining = MainLoop.remainingBlockers ?? 0;
      var expected = MainLoop.expectedBlockers ?? 0;
      if (remaining) {
        if (remaining < expected) {
          Module["setStatus"](`{message} ({expected - remaining}/{expected})`);
        } else {
          Module["setStatus"](message);
        }
      } else {
        Module["setStatus"]("");
      }
    }
  },
  init() {},
  runIter(func) {
    if (ABORT) return;
    for (var pre of MainLoop.preMainLoop) {
      if (pre() === false) {
        return;
      }
    }
    callUserCallback(func);
    for (var post of MainLoop.postMainLoop) {
      post();
    }
    checkStackCookie();
  },
  nextRAF: 0,
  fakeRequestAnimationFrame(func) {
    // try to keep 60fps between calls to here
    var now = Date.now();
    if (!MainLoop.nextRAF) {
      MainLoop.nextRAF = now + 1e3 / 60;
    } else {
      while (now + 2 >= MainLoop.nextRAF) {
        // fudge a little, to avoid timer jitter causing us to do lots of delay:0
        MainLoop.nextRAF += 1e3 / 60;
      }
    }
    var delay = Math.max(MainLoop.nextRAF - now, 0);
    setTimeout(func, delay);
  },
  requestAnimationFrame(func) {
    if (globalThis.requestAnimationFrame) {
      requestAnimationFrame(func);
    } else {
      MainLoop.fakeRequestAnimationFrame(func);
    }
  }
};

var _emscripten_cancel_main_loop = () => {
  MainLoop.pause();
  MainLoop.func = null;
};

var _emscripten_err = str => err(UTF8ToString(str));

var onExits = [];

var JSEvents = {
  removeAllEventListeners() {
    while (JSEvents.eventHandlers.length) {
      JSEvents._removeHandler(JSEvents.eventHandlers.length - 1);
    }
    JSEvents.deferredCalls = [];
  },
  inEventHandler: 0,
  deferredCalls: [],
  deferCall(targetFunction, precedence, argsList) {
    function arraysHaveEqualContent(arrA, arrB) {
      if (arrA.length != arrB.length) return false;
      for (var i = 0; i < arrA.length; i++) {
        if (arrA[i] != arrB[i]) return false;
      }
      return true;
    }
    // Test if the given call was already queued, and if so, don't add it again.
    for (var call of JSEvents.deferredCalls) {
      if (call.targetFunction == targetFunction && arraysHaveEqualContent(call.argsList, argsList)) {
        return;
      }
    }
    JSEvents.deferredCalls.push({
      targetFunction,
      precedence,
      argsList
    });
    JSEvents.deferredCalls.sort((x, y) => x.precedence - y.precedence);
  },
  removeDeferredCalls(targetFunction) {
    JSEvents.deferredCalls = JSEvents.deferredCalls.filter(call => call.targetFunction != targetFunction);
  },
  canPerformEventHandlerRequests() {
    // Browsers that support navigator.userActivation.isActive: https://developer.mozilla.org/en-US/docs/Web/API/UserActivation/isActive
    if (navigator.userActivation) {
      // Verify against transient activation status from UserActivation API
      // whether it is possible to perform a request here without needing to defer. See
      // https://developer.mozilla.org/en-US/docs/Web/Security/User_activation#transient_activation
      // and https://caniuse.com/mdn-api_useractivation
      return navigator.userActivation.isActive;
    }
    return JSEvents.inEventHandler && JSEvents.currentEventHandler.allowsDeferredCalls;
  },
  runDeferredCalls() {
    if (!JSEvents.canPerformEventHandlerRequests()) {
      return;
    }
    var deferredCalls = JSEvents.deferredCalls;
    JSEvents.deferredCalls = [];
    for (var call of deferredCalls) {
      call.targetFunction(...call.argsList);
    }
  },
  eventHandlers: [],
  removeAllHandlersOnTarget: (target, eventTypeString) => {
    for (var i = 0; i < JSEvents.eventHandlers.length; ++i) {
      if (JSEvents.eventHandlers[i].target == target && (!eventTypeString || eventTypeString == JSEvents.eventHandlers[i].eventTypeString)) {
        JSEvents._removeHandler(i--);
      }
    }
  },
  _removeHandler(i) {
    var h = JSEvents.eventHandlers[i];
    h.target.removeEventListener(h.eventTypeString, h.eventListenerFunc, h.useCapture);
    JSEvents.eventHandlers.splice(i, 1);
  },
  registerOrRemoveHandler(eventHandler) {
    if (!eventHandler.target) {
      err("registerOrRemoveHandler: the target element for event handler registration does not exist, when processing the following event handler registration:");
      console.dir(eventHandler);
      return -4;
    }
    if (eventHandler.callbackfunc) {
      eventHandler.eventListenerFunc = function(event) {
        // Increment nesting count for the event handler.
        ++JSEvents.inEventHandler;
        JSEvents.currentEventHandler = eventHandler;
        // Process any old deferred calls the user has placed.
        JSEvents.runDeferredCalls();
        // Process the actual event, calls back to user C code handler.
        eventHandler.handlerFunc(event);
        // Process any new deferred calls that were placed right now from this event handler.
        JSEvents.runDeferredCalls();
        // Out of event handler - restore nesting count.
        --JSEvents.inEventHandler;
      };
      eventHandler.target.addEventListener(eventHandler.eventTypeString, eventHandler.eventListenerFunc, eventHandler.useCapture);
      JSEvents.eventHandlers.push(eventHandler);
    } else {
      for (var i = 0; i < JSEvents.eventHandlers.length; ++i) {
        if (JSEvents.eventHandlers[i].target == eventHandler.target && JSEvents.eventHandlers[i].eventTypeString == eventHandler.eventTypeString) {
          JSEvents._removeHandler(i--);
        }
      }
    }
    return 0;
  },
  removeSingleHandler(eventHandler) {
    let success = false;
    for (let i = 0; i < JSEvents.eventHandlers.length; ++i) {
      const handler = JSEvents.eventHandlers[i];
      if (handler.target === eventHandler.target && handler.eventTypeId === eventHandler.eventTypeId && handler.callbackfunc === eventHandler.callbackfunc && handler.userData === eventHandler.userData) {
        // in some very rare cases (ex: Safari / fullscreen events), there is more than 1 handler (eventTypeString is different)
        JSEvents._removeHandler(i--);
        success = true;
      }
    }
    return success ? 0 : -5;
  },
  getNodeNameForTarget(target) {
    if (target == window) return "#window";
    if (target == screen) return "#screen";
    return target?.nodeName ?? "";
  },
  fullscreenEnabled() {
    return document.fullscreenEnabled ?? document.webkitFullscreenEnabled;
  }
};

/** @type {Object} */ var specialHTMLTargets = [ 0, document, window ];

var maybeCStringToJsString = cString => cString > 2 ? UTF8ToString(cString) : cString;

var findEventTarget = target => {
  target = maybeCStringToJsString(target);
  var domElement = specialHTMLTargets[target] || document.querySelector(target);
  return domElement;
};

var findCanvasEventTarget = findEventTarget;

var _emscripten_get_canvas_element_size = (target, width, height) => {
  var canvas = findCanvasEventTarget(target);
  if (!canvas) return -4;
  HEAP32[((width) >> 2)] = canvas.width;
  HEAP32[((height) >> 2)] = canvas.height;
};

var stringToUTF8OnStack = str => {
  var size = lengthBytesUTF8(str) + 1;
  var ret = stackAlloc(size);
  stringToUTF8(str, ret, size);
  return ret;
};

var getCanvasElementSize = target => {
  var sp = stackSave();
  var w = stackAlloc(8);
  var h = w + 4;
  var targetInt = stringToUTF8OnStack(target.id);
  var ret = _emscripten_get_canvas_element_size(targetInt, w, h);
  var size = [ HEAP32[((w) >> 2)], HEAP32[((h) >> 2)] ];
  stackRestore(sp);
  return size;
};

var _emscripten_set_canvas_element_size = (target, width, height) => {
  var canvas = findCanvasEventTarget(target);
  if (!canvas) return -4;
  canvas.width = width;
  canvas.height = height;
  return 0;
};

var setCanvasElementSize = (target, width, height) => {
  if (!target.controlTransferredOffscreen) {
    target.width = width;
    target.height = height;
  } else {
    // This function is being called from high-level JavaScript code instead of asm.js/Wasm,
    // and it needs to synchronously proxy over to another thread, so marshal the string onto the heap to do the call.
    var sp = stackSave();
    var targetInt = stringToUTF8OnStack(target.id);
    _emscripten_set_canvas_element_size(targetInt, width, height);
    stackRestore(sp);
  }
};

var currentFullscreenStrategy = 0;

var wasmTableMirror = [];

var getWasmTableEntry = funcPtr => {
  var func = wasmTableMirror[funcPtr];
  if (!func) {
    /** @suppress {checkTypes} */ wasmTableMirror[funcPtr] = func = wasmTable.get(funcPtr);
  }
  /** @suppress {checkTypes} */ assert(wasmTable.get(funcPtr) == func, "table mirror is out of date");
  return func;
};

var callCanvasResizedCallback = strategy => {
  if (strategy.canvasResizedCallback) {
    getWasmTableEntry(strategy.canvasResizedCallback)(37, 0, strategy.canvasResizedCallbackUserData);
  }
};

var registerRestoreOldStyle = canvas => {
  var canvasSize = getCanvasElementSize(canvas);
  var oldWidth = canvasSize[0];
  var oldHeight = canvasSize[1];
  var oldCssWidth = canvas.style.width;
  var oldCssHeight = canvas.style.height;
  var oldBackgroundColor = canvas.style.backgroundColor;
  // Chrome reads color from here.
  var oldDocumentBackgroundColor = document.body.style.backgroundColor;
  // IE11 reads color from here.
  // Firefox always has black background color.
  var oldPaddingLeft = canvas.style.paddingLeft;
  // Chrome, FF, Safari
  var oldPaddingRight = canvas.style.paddingRight;
  var oldPaddingTop = canvas.style.paddingTop;
  var oldPaddingBottom = canvas.style.paddingBottom;
  var oldMarginLeft = canvas.style.marginLeft;
  // IE11
  var oldMarginRight = canvas.style.marginRight;
  var oldMarginTop = canvas.style.marginTop;
  var oldMarginBottom = canvas.style.marginBottom;
  var oldDocumentBodyMargin = document.body.style.margin;
  var oldDocumentOverflow = document.documentElement.style.overflow;
  // Chrome, Firefox
  var oldDocumentScroll = document.body.scroll;
  // IE
  var oldImageRendering = canvas.style.imageRendering;
  function restoreOldStyle() {
    if (!getFullscreenElement()) {
      document.removeEventListener("fullscreenchange", restoreOldStyle);
      document.removeEventListener("webkitfullscreenchange", restoreOldStyle);
      setCanvasElementSize(canvas, oldWidth, oldHeight);
      canvas.style.width = oldCssWidth;
      canvas.style.height = oldCssHeight;
      canvas.style.backgroundColor = oldBackgroundColor;
      // Chrome
      // IE11 hack: assigning 'undefined' or an empty string to document.body.style.backgroundColor has no effect, so first assign back the default color
      // before setting the undefined value. Setting undefined value is also important, or otherwise we would later treat that as something that the user
      // had explicitly set so subsequent fullscreen transitions would not set background color properly.
      if (!oldDocumentBackgroundColor) document.body.style.backgroundColor = "white";
      document.body.style.backgroundColor = oldDocumentBackgroundColor;
      // IE11
      canvas.style.paddingLeft = oldPaddingLeft;
      // Chrome, FF, Safari
      canvas.style.paddingRight = oldPaddingRight;
      canvas.style.paddingTop = oldPaddingTop;
      canvas.style.paddingBottom = oldPaddingBottom;
      canvas.style.marginLeft = oldMarginLeft;
      // IE11
      canvas.style.marginRight = oldMarginRight;
      canvas.style.marginTop = oldMarginTop;
      canvas.style.marginBottom = oldMarginBottom;
      document.body.style.margin = oldDocumentBodyMargin;
      document.documentElement.style.overflow = oldDocumentOverflow;
      // Chrome, Firefox
      document.body.scroll = oldDocumentScroll;
      // IE
      canvas.style.imageRendering = oldImageRendering;
      if (canvas.GLctxObject) canvas.GLctxObject.GLctx.viewport(0, 0, oldWidth, oldHeight);
      callCanvasResizedCallback(currentFullscreenStrategy);
    }
  }
  document.addEventListener("fullscreenchange", restoreOldStyle);
  document.addEventListener("webkitfullscreenchange", restoreOldStyle);
  return restoreOldStyle;
};

var setLetterbox = (element, topBottom, leftRight) => {
  // Cannot use margin to specify letterboxes in FF or Chrome, since those ignore margins in fullscreen mode.
  element.style.paddingLeft = element.style.paddingRight = leftRight + "px";
  element.style.paddingTop = element.style.paddingBottom = topBottom + "px";
};

var getBoundingClientRect = e => specialHTMLTargets.indexOf(e) < 0 ? e.getBoundingClientRect() : {
  "left": 0,
  "top": 0
};

var JSEvents_resizeCanvasForFullscreen = (target, strategy) => {
  var restoreOldStyle = registerRestoreOldStyle(target);
  var cssWidth = strategy.softFullscreen ? innerWidth : screen.width;
  var cssHeight = strategy.softFullscreen ? innerHeight : screen.height;
  var rect = getBoundingClientRect(target);
  var windowedCssWidth = rect.width;
  var windowedCssHeight = rect.height;
  var canvasSize = getCanvasElementSize(target);
  var windowedRttWidth = canvasSize[0];
  var windowedRttHeight = canvasSize[1];
  if (strategy.scaleMode == 3) {
    setLetterbox(target, (cssHeight - windowedCssHeight) / 2, (cssWidth - windowedCssWidth) / 2);
    cssWidth = windowedCssWidth;
    cssHeight = windowedCssHeight;
  } else if (strategy.scaleMode == 2) {
    if (cssWidth * windowedRttHeight < windowedRttWidth * cssHeight) {
      var desiredCssHeight = windowedRttHeight * cssWidth / windowedRttWidth;
      setLetterbox(target, (cssHeight - desiredCssHeight) / 2, 0);
      cssHeight = desiredCssHeight;
    } else {
      var desiredCssWidth = windowedRttWidth * cssHeight / windowedRttHeight;
      setLetterbox(target, 0, (cssWidth - desiredCssWidth) / 2);
      cssWidth = desiredCssWidth;
    }
  }
  // If we are adding padding, must choose a background color or otherwise Chrome will give the
  // padding a default white color. Do it only if user has not customized their own background color.
  target.style.backgroundColor ||= "black";
  // IE11 does the same, but requires the color to be set in the document body.
  document.body.style.backgroundColor ||= "black";
  // IE11
  // Firefox always shows black letterboxes independent of style color.
  target.style.width = cssWidth + "px";
  target.style.height = cssHeight + "px";
  if (strategy.filteringMode == 1) {
    target.style.imageRendering = "optimizeSpeed";
    target.style.imageRendering = "-moz-crisp-edges";
    target.style.imageRendering = "-o-crisp-edges";
    target.style.imageRendering = "-webkit-optimize-contrast";
    target.style.imageRendering = "optimize-contrast";
    target.style.imageRendering = "crisp-edges";
    target.style.imageRendering = "pixelated";
  }
  var dpiScale = (strategy.canvasResolutionScaleMode == 2) ? devicePixelRatio : 1;
  if (strategy.canvasResolutionScaleMode != 0) {
    var newWidth = (cssWidth * dpiScale) | 0;
    var newHeight = (cssHeight * dpiScale) | 0;
    setCanvasElementSize(target, newWidth, newHeight);
    if (target.GLctxObject) target.GLctxObject.GLctx.viewport(0, 0, newWidth, newHeight);
  }
  return restoreOldStyle;
};

var JSEvents_requestFullscreen = (target, strategy) => {
  // EMSCRIPTEN_FULLSCREEN_SCALE_DEFAULT + EMSCRIPTEN_FULLSCREEN_CANVAS_SCALE_NONE is a mode where no extra logic is performed to the DOM elements.
  if (strategy.scaleMode != 0 || strategy.canvasResolutionScaleMode != 0) {
    JSEvents_resizeCanvasForFullscreen(target, strategy);
  }
  if (target.requestFullscreen) {
    target.requestFullscreen();
  } else if (target.webkitRequestFullscreen) {
    // Safari didn't Element.requestFullscreen support until 16.4
    // See: https://developer.mozilla.org/en-US/docs/Web/API/Element/requestFullscreen
    target.webkitRequestFullscreen(Element.ALLOW_KEYBOARD_INPUT);
  } else {
    return JSEvents.fullscreenEnabled() ? -3 : -1;
  }
  currentFullscreenStrategy = strategy;
  callCanvasResizedCallback(strategy);
  return 0;
};

var _emscripten_exit_fullscreen = () => {
  if (!JSEvents.fullscreenEnabled()) return -1;
  // Make sure no queued up calls will fire after this.
  JSEvents.removeDeferredCalls(JSEvents_requestFullscreen);
  var d = specialHTMLTargets[1];
  if (d.exitFullscreen) {
    d.fullscreenElement && d.exitFullscreen();
  } else if (d.webkitExitFullscreen) {
    d.webkitFullscreenElement && d.webkitExitFullscreen();
  } else {
    return -1;
  }
  return 0;
};

var requestPointerLock = target => {
  if (target.requestPointerLock) {
    target.requestPointerLock();
  } else {
    // document.body is known to accept pointer lock, so use that to differentiate if the user passed a bad element,
    // or if the whole browser just doesn't support the feature.
    if (document.body.requestPointerLock) {
      return -3;
    }
    return -1;
  }
  return 0;
};

var _emscripten_exit_pointerlock = () => {
  // Make sure no queued up calls will fire after this.
  JSEvents.removeDeferredCalls(requestPointerLock);
  if (!document.exitPointerLock) return -1;
  document.exitPointerLock();
  return 0;
};

var _emscripten_get_device_pixel_ratio = () => devicePixelRatio;

var _emscripten_get_element_css_size = (target, width, height) => {
  target = findEventTarget(target);
  if (!target) return -4;
  var rect = getBoundingClientRect(target);
  HEAPF64[((width) >> 3)] = rect.width;
  HEAPF64[((height) >> 3)] = rect.height;
  return 0;
};

function getFullscreenElement() {
  return document.fullscreenElement ?? document.webkitFullscreenElement;
}

var fillFullscreenChangeEventData = eventStruct => {
  var fullscreenElement = getFullscreenElement();
  var isFullscreen = !!fullscreenElement;
  // Assigning a boolean to HEAP32 with expected type coercion.
  /** @suppress{checkTypes} */ HEAP8[eventStruct] = isFullscreen;
  HEAP8[(eventStruct) + (1)] = JSEvents.fullscreenEnabled();
  // If transitioning to fullscreen, report info about the element that is now fullscreen.
  // If transitioning to windowed mode, report info about the element that just was fullscreen.
  var reportedElement = isFullscreen ? fullscreenElement : JSEvents.previousFullscreenElement;
  var nodeName = JSEvents.getNodeNameForTarget(reportedElement);
  var id = reportedElement?.id ?? "";
  stringToUTF8(nodeName, eventStruct + 2, 128);
  stringToUTF8(id, eventStruct + 130, 128);
  HEAP32[(((eventStruct) + (260)) >> 2)] = reportedElement?.clientWidth ?? 0;
  HEAP32[(((eventStruct) + (264)) >> 2)] = reportedElement?.clientHeight ?? 0;
  HEAP32[(((eventStruct) + (268)) >> 2)] = screen.width;
  HEAP32[(((eventStruct) + (272)) >> 2)] = screen.height;
  if (isFullscreen) {
    JSEvents.previousFullscreenElement = fullscreenElement;
  }
};

var _emscripten_get_fullscreen_status = fullscreenStatus => {
  if (!JSEvents.fullscreenEnabled()) return -1;
  fillFullscreenChangeEventData(fullscreenStatus);
  return 0;
};

var fillGamepadEventData = (eventStruct, e) => {
  HEAPF64[((eventStruct) >> 3)] = e.timestamp;
  for (var i = 0; i < e.axes.length; ++i) {
    HEAPF64[(((eventStruct + i * 8) + (16)) >> 3)] = e.axes[i];
  }
  for (var i = 0; i < e.buttons.length; ++i) {
    HEAP8[(eventStruct + i) + (1040)] = e.buttons[i].pressed;
    HEAPF64[(((eventStruct + i * 8) + (528)) >> 3)] = e.buttons[i].value;
  }
  HEAP8[(eventStruct) + (1104)] = e.connected;
  HEAP32[(((eventStruct) + (1108)) >> 2)] = e.index;
  HEAP32[(((eventStruct) + (8)) >> 2)] = e.axes.length;
  HEAP32[(((eventStruct) + (12)) >> 2)] = e.buttons.length;
  stringToUTF8(e.id, eventStruct + 1112, 64);
  stringToUTF8(e.mapping, eventStruct + 1176, 64);
};

var _emscripten_get_gamepad_status = (index, gamepadState) => {
  assert(JSEvents.lastGamepadState, "emscripten_get_gamepad_status() called before emscripten_sample_gamepad_data()");
  // INVALID_PARAM is returned on a Gamepad index that never was there.
  if (index < 0 || index >= JSEvents.lastGamepadState.length) return -5;
  // NO_DATA is returned on a Gamepad index that was removed.
  // For previously disconnected gamepads there should be an empty slot (null/undefined/false) at the index.
  // This is because gamepads must keep their original position in the array.
  // For example, removing the first of two gamepads produces [null/undefined/false, gamepad].
  if (!JSEvents.lastGamepadState[index]) return -7;
  fillGamepadEventData(gamepadState, JSEvents.lastGamepadState[index]);
  return 0;
};

var getHeapMax = () => // Stay one Wasm page short of 4GB: while e.g. Chrome is able to allocate
// full 4GB Wasm memories, the size will wrap back to 0 bytes in Wasm side
// for any code that deals with heap sizes, which would require special
// casing all heap size related code to treat 0 specially.
2147483648;

var _emscripten_get_heap_max = () => getHeapMax();

var _emscripten_get_main_loop_timing = (mode, value) => {
  if (mode) HEAP32[((mode) >> 2)] = MainLoop.timingMode;
  if (value) HEAP32[((value) >> 2)] = MainLoop.timingValue;
};

var _emscripten_get_num_gamepads = () => {
  assert(JSEvents.lastGamepadState, "emscripten_get_num_gamepads() called before emscripten_sample_gamepad_data()");
  // N.B. Do not call emscripten_get_num_gamepads() unless having first called emscripten_sample_gamepad_data(), and that has returned EMSCRIPTEN_RESULT_SUCCESS.
  // Otherwise the following line will throw an exception.
  return JSEvents.lastGamepadState.length;
};

/** @param {number=} timeout */ var safeSetTimeout = (func, timeout) => {
  var id = safeSetTimeout.nextId++;
  safeSetTimeout.pending.set(id, setTimeout(() => {
    safeSetTimeout.pending.delete(id);
    callUserCallback(func);
  }, timeout));
  return id;
};

var Browser = {
  useWebGL: false,
  isFullscreen: false,
  pointerLock: false,
  moduleContextCreatedCallbacks: [],
  preloadedImages: {},
  preloadedAudios: {},
  getCanvas: () => Module["canvas"],
  init() {
    if (Browser.initted) return;
    Browser.initted = true;
    // Support for plugins that can process preloaded files. You can add more of these to
    // your app by creating and appending to preloadPlugins.
    // Each plugin is asked if it can handle a file based on the file's name. If it can,
    // it is given the file's raw data. When it is done, it calls a callback with the file's
    // (possibly modified) data. For example, a plugin might decompress a file, or it
    // might create some side data structure for use later (like an Image element, etc.).
    var imagePlugin = {};
    imagePlugin["canHandle"] = name => !Module["noImageDecoding"] && /\.(jpg|jpeg|png|bmp|webp)$/i.test(name);
    imagePlugin["handle"] = async (byteArray, name) => {
      var b = new Blob([ byteArray ], {
        type: Browser.getMimetype(name)
      });
      if (b.size !== byteArray.length) {
        // Safari bug #118630
        // Safari's Blob can only take an ArrayBuffer
        b = new Blob([ (new Uint8Array(byteArray)).buffer ], {
          type: Browser.getMimetype(name)
        });
      }
      var url = URL.createObjectURL(b);
      return new Promise((resolve, reject) => {
        var img = new Image;
        img.onload = () => {
          assert(img.complete, `Image ${name} could not be decoded`);
          var canvas = /** @type {!HTMLCanvasElement} */ (document.createElement("canvas"));
          canvas.width = img.width;
          canvas.height = img.height;
          var ctx = canvas.getContext("2d");
          ctx.drawImage(img, 0, 0);
          Browser.preloadedImages[name] = canvas;
          URL.revokeObjectURL(url);
          resolve(byteArray);
        };
        img.onerror = event => {
          err(`Image ${url} could not be decoded`);
          reject();
        };
        img.src = url;
      });
    };
    preloadPlugins.push(imagePlugin);
    var audioPlugin = {};
    audioPlugin["canHandle"] = name => !Module["noAudioDecoding"] && name.slice(-4) in {
      ".ogg": 1,
      ".wav": 1,
      ".mp3": 1
    };
    audioPlugin["handle"] = async (byteArray, name) => new Promise((resolve, reject) => {
      var done = false;
      function finish(audio) {
        if (done) return;
        done = true;
        Browser.preloadedAudios[name] = audio;
        resolve(byteArray);
      }
      var b = new Blob([ byteArray ], {
        type: Browser.getMimetype(name)
      });
      var url = URL.createObjectURL(b);
      // XXX we never revoke this!
      var audio = new Audio;
      audio.addEventListener("canplaythrough", () => finish(audio));
      // use addEventListener due to chromium bug 124926
      audio.onerror = event => {
        if (done) return;
        err(`warning: browser could not fully decode audio ${name}, trying slower base64 approach`);
        function encode64(data) {
          var BASE = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
          const PAD = "=";
          var ret = "";
          var leftchar = 0;
          var leftbits = 0;
          for (var byte of data) {
            leftchar = (leftchar << 8) | byte;
            leftbits += 8;
            while (leftbits >= 6) {
              var curr = (leftchar >> (leftbits - 6)) & 63;
              leftbits -= 6;
              ret += BASE[curr];
            }
          }
          if (leftbits == 2) {
            ret += BASE[(leftchar & 3) << 4];
            ret += PAD + PAD;
          } else if (leftbits == 4) {
            ret += BASE[(leftchar & 15) << 2];
            ret += PAD;
          }
          return ret;
        }
        audio.src = "data:audio/x-" + name.slice(-3) + ";base64," + encode64(byteArray);
        finish(audio);
      };
      audio.src = url;
      // workaround for chrome bug 124926 - we do not always get oncanplaythrough or onerror
      safeSetTimeout(() => {
        finish(audio);
      }, 1e4);
    });
    preloadPlugins.push(audioPlugin);
    // Canvas event setup
    function pointerLockChange() {
      var canvas = Browser.getCanvas();
      Browser.pointerLock = document.pointerLockElement === canvas;
    }
    var canvas = Browser.getCanvas();
    if (canvas) {
      // forced aspect ratio can be enabled by defining 'forcedAspectRatio' on Module
      // Module['forcedAspectRatio'] = 4 / 3;
      document.addEventListener("pointerlockchange", pointerLockChange);
      if (Module["elementPointerLock"]) {
        canvas.addEventListener("click", ev => {
          if (!Browser.pointerLock && Browser.getCanvas().requestPointerLock) {
            Browser.getCanvas().requestPointerLock();
            ev.preventDefault();
          }
        });
      }
    }
  },
  createContext(/** @type {HTMLCanvasElement} */ canvas, useWebGL, setInModule, webGLContextAttributes) {
    if (useWebGL && Module["ctx"] && canvas == Browser.getCanvas()) return Module["ctx"];
    // no need to recreate GL context if it's already been created for this canvas.
    var ctx;
    var contextHandle;
    if (useWebGL) {
      // For GLES2/desktop GL compatibility, adjust a few defaults to be different to WebGL defaults, so that they align better with the desktop defaults.
      var contextAttributes = {
        antialias: false,
        alpha: false,
        majorVersion: 1
      };
      if (webGLContextAttributes) {
        for (var attribute in webGLContextAttributes) {
          contextAttributes[attribute] = webGLContextAttributes[attribute];
        }
      }
      // This check of existence of GL is here to satisfy Closure compiler, which yells if variable GL is referenced below but GL object is not
      // actually compiled in because application is not doing any GL operations. TODO: Ideally if GL is not being used, this function
      // Browser.createContext() should not even be emitted.
      if (typeof GL !== "undefined") {
        contextHandle = GL.createContext(canvas, contextAttributes);
        if (contextHandle) {
          ctx = GL.getContext(contextHandle).GLctx;
        }
      }
    } else {
      ctx = canvas.getContext("2d");
    }
    if (!ctx) return null;
    if (setInModule) {
      if (!useWebGL) assert(typeof GLctx === "undefined", "cannot set in module if GLctx is used, but we are a non-GL context that would replace it");
      Module["ctx"] = ctx;
      if (useWebGL) GL.makeContextCurrent(contextHandle);
      Browser.useWebGL = useWebGL;
      Browser.moduleContextCreatedCallbacks.forEach(callback => callback());
      Browser.init();
    }
    return ctx;
  },
  fullscreenHandlersInstalled: false,
  lockPointer: undefined,
  resizeCanvas: undefined,
  requestFullscreen(lockPointer, resizeCanvas) {
    Browser.lockPointer = lockPointer;
    Browser.resizeCanvas = resizeCanvas;
    if (typeof Browser.lockPointer === "undefined") Browser.lockPointer = true;
    if (typeof Browser.resizeCanvas === "undefined") Browser.resizeCanvas = false;
    var canvas = Browser.getCanvas();
    function fullscreenChange() {
      Browser.isFullscreen = false;
      var canvasContainer = canvas.parentNode;
      if (getFullscreenElement() === canvasContainer) {
        canvas.exitFullscreen = Browser.exitFullscreen;
        if (Browser.lockPointer) canvas.requestPointerLock();
        Browser.isFullscreen = true;
        if (Browser.resizeCanvas) {
          Browser.setFullscreenCanvasSize();
        } else {
          Browser.updateCanvasDimensions(canvas);
        }
      } else {
        // remove the full screen specific parent of the canvas again to restore the HTML structure from before going full screen
        canvasContainer.parentNode.insertBefore(canvas, canvasContainer);
        canvasContainer.parentNode.removeChild(canvasContainer);
        if (Browser.resizeCanvas) {
          Browser.setWindowedCanvasSize();
        } else {
          Browser.updateCanvasDimensions(canvas);
        }
      }
    }
    if (!Browser.fullscreenHandlersInstalled) {
      Browser.fullscreenHandlersInstalled = true;
      document.addEventListener("fullscreenchange", fullscreenChange);
      document.addEventListener("webkitfullscreenchange", fullscreenChange);
    }
    // create a new parent to ensure the canvas has no siblings. this allows browsers to optimize full screen performance when its parent is the full screen root
    var canvasContainer = document.createElement("div");
    canvas.parentNode.insertBefore(canvasContainer, canvas);
    canvasContainer.appendChild(canvas);
    // use parent of canvas as full screen root to allow aspect ratio correction (Firefox stretches the root to screen size)
    // Safari didn't support Element.requestFullscreen until 16.4
    // See: https://developer.mozilla.org/en-US/docs/Web/API/Element/requestFullscreen
    /** @suppress {checkTypes} */ canvasContainer.requestFullscreen ??= (canvasContainer["webkitRequestFullscreen"] ? () => canvasContainer["webkitRequestFullscreen"](Element.ALLOW_KEYBOARD_INPUT) : null) ?? (canvasContainer["webkitRequestFullScreen"] ? () => canvasContainer["webkitRequestFullScreen"](Element.ALLOW_KEYBOARD_INPUT) : null);
    canvasContainer.requestFullscreen();
  },
  exitFullscreen() {
    // This is workaround for chrome. Trying to exit from fullscreen
    // not in fullscreen state will cause 'TypeError: Document not active'
    // in chrome. See https://github.com/emscripten-core/emscripten/pull/8236
    if (!Browser.isFullscreen) {
      return false;
    }
    var CFS = document.exitFullscreen ?? document["webkitCancelFullScreen"];
    CFS.apply(document, []);
    return true;
  },
  getMimetype(name) {
    return {
      "jpg": "image/jpeg",
      "jpeg": "image/jpeg",
      "png": "image/png",
      "bmp": "image/bmp",
      "ogg": "audio/ogg",
      "wav": "audio/wav",
      "mp3": "audio/mpeg"
    }[name.slice(name.lastIndexOf(".") + 1)];
  },
  getMouseWheelDelta(event) {
    var delta = 0;
    switch (event.type) {
     case "DOMMouseScroll":
      // 3 lines make up a step
      delta = event.detail / 3;
      break;

     case "mousewheel":
      // 120 units make up a step
      delta = event.wheelDelta / 120;
      break;

     case "wheel":
      delta = event.deltaY;
      switch (event.deltaMode) {
       case 0:
        // DOM_DELTA_PIXEL: 100 pixels make up a step
        delta /= 100;
        break;

       case 1:
        // DOM_DELTA_LINE: 3 lines make up a step
        delta /= 3;
        break;

       case 2:
        // DOM_DELTA_PAGE: A page makes up 80 steps
        delta *= 80;
        break;

       default:
        abort("unrecognized mouse wheel delta mode: " + event.deltaMode);
      }
      break;

     default:
      abort("unrecognized mouse wheel event: " + event.type);
    }
    return delta;
  },
  mouseX: 0,
  mouseY: 0,
  mouseMovementX: 0,
  mouseMovementY: 0,
  touches: {},
  lastTouches: {},
  calculateMouseCoords(pageX, pageY) {
    // Calculate the movement based on the changes
    // in the coordinates.
    var canvas = Browser.getCanvas();
    var rect = canvas.getBoundingClientRect();
    var adjustedX = pageX - (window.scrollX + rect.left);
    var adjustedY = pageY - (window.scrollY + rect.top);
    // the canvas might be CSS-scaled compared to its backbuffer;
    // SDL-using content will want mouse coordinates in terms
    // of backbuffer units.
    adjustedX = adjustedX * (canvas.width / rect.width);
    adjustedY = adjustedY * (canvas.height / rect.height);
    return {
      x: adjustedX,
      y: adjustedY
    };
  },
  setMouseCoords(pageX, pageY) {
    const {x, y} = Browser.calculateMouseCoords(pageX, pageY);
    Browser.mouseMovementX = x - Browser.mouseX;
    Browser.mouseMovementY = y - Browser.mouseY;
    Browser.mouseX = x;
    Browser.mouseY = y;
  },
  calculateMouseEvent(event) {
    // event should be mousemove, mousedown or mouseup
    if (Browser.pointerLock) {
      // When the pointer is locked, calculate the coordinates
      // based on the movement of the mouse.
      Browser.mouseMovementX = event.movementX;
      Browser.mouseMovementY = event.movementY;
      // add the mouse delta to the current absolute mouse position
      Browser.mouseX += Browser.mouseMovementX;
      Browser.mouseY += Browser.mouseMovementY;
    } else {
      if (event.type === "touchstart" || event.type === "touchend" || event.type === "touchmove") {
        var touch = event.touch;
        if (touch === undefined) {
          return;
        }
        var coords = Browser.calculateMouseCoords(touch.pageX, touch.pageY);
        if (event.type === "touchstart") {
          Browser.lastTouches[touch.identifier] = coords;
          Browser.touches[touch.identifier] = coords;
        } else if (event.type === "touchend" || event.type === "touchmove") {
          var last = Browser.touches[touch.identifier];
          last ||= coords;
          Browser.lastTouches[touch.identifier] = last;
          Browser.touches[touch.identifier] = coords;
        }
        return;
      }
      Browser.setMouseCoords(event.pageX, event.pageY);
    }
  },
  resizeListeners: [],
  updateResizeListeners() {
    var canvas = Browser.getCanvas();
    Browser.resizeListeners.forEach(listener => listener(canvas.width, canvas.height));
  },
  setCanvasSize(width, height, noUpdates) {
    var canvas = Browser.getCanvas();
    Browser.updateCanvasDimensions(canvas, width, height);
    if (!noUpdates) Browser.updateResizeListeners();
  },
  setFullscreenCanvasSize() {
    // check if SDL is available
    if (typeof SDL !== "undefined") {
      var flags = HEAPU32[((SDL.screen) >> 2)];
      flags = flags | 8388608;
      HEAP32[((SDL.screen) >> 2)] = flags;
    }
    Browser.updateCanvasDimensions(Browser.getCanvas());
    Browser.updateResizeListeners();
  },
  setWindowedCanvasSize() {
    // check if SDL is available
    if (typeof SDL !== "undefined") {
      var flags = HEAPU32[((SDL.screen) >> 2)];
      flags = flags & ~8388608;
      HEAP32[((SDL.screen) >> 2)] = flags;
    }
    Browser.updateCanvasDimensions(Browser.getCanvas());
    Browser.updateResizeListeners();
  },
  updateCanvasDimensions(canvas, wNative, hNative) {
    if (wNative && hNative) {
      canvas.widthNative = wNative;
      canvas.heightNative = hNative;
    } else {
      wNative = canvas.widthNative;
      hNative = canvas.heightNative;
    }
    var w = wNative;
    var h = hNative;
    if ((getFullscreenElement() === canvas.parentNode) && (typeof screen !== "undefined")) {
      var factor = Math.min(screen.width / w, screen.height / h);
      w = Math.round(w * factor);
      h = Math.round(h * factor);
    }
    if (Browser.resizeCanvas) {
      if (canvas.width != w) canvas.width = w;
      if (canvas.height != h) canvas.height = h;
      if (typeof canvas.style !== "undefined") {
        canvas.style.removeProperty("width");
        canvas.style.removeProperty("height");
      }
    } else {
      if (canvas.width != wNative) canvas.width = wNative;
      if (canvas.height != hNative) canvas.height = hNative;
      if (typeof canvas.style !== "undefined") {
        if (w != wNative || h != hNative) {
          canvas.style.setProperty("width", w + "px", "important");
          canvas.style.setProperty("height", h + "px", "important");
        } else {
          canvas.style.removeProperty("width");
          canvas.style.removeProperty("height");
        }
      }
    }
  }
};

var getPreloadedImageData = (path, w, h) => {
  path = PATH_FS.resolve(path);
  var canvas = /** @type {HTMLCanvasElement} */ (Browser.preloadedImages[path]);
  if (!canvas) return 0;
  var ctx = canvas.getContext("2d");
  var image = ctx.getImageData(0, 0, canvas.width, canvas.height);
  var buf = _malloc(canvas.width * canvas.height * 4);
  HEAPU8.set(image.data, buf);
  HEAP32[((w) >> 2)] = canvas.width;
  HEAP32[((h) >> 2)] = canvas.height;
  return buf;
};

var _emscripten_get_preloaded_image_data = (path, w, h) => getPreloadedImageData(UTF8ToString(path), w, h);

var _emscripten_get_preloaded_image_data_from_FILE = (file, w, h) => {
  var fd = _fileno(file);
  var stream = FS.getStream(fd);
  if (stream) {
    return getPreloadedImageData(stream.path, w, h);
  }
  return 0;
};

var _emscripten_get_screen_size = (width, height) => {
  HEAP32[((width) >> 2)] = screen.width;
  HEAP32[((height) >> 2)] = screen.height;
};

var GLctx;

var webgl_enable_ANGLE_instanced_arrays = ctx => {
  // Extension available in WebGL 1 from Firefox 26 and Google Chrome 30 onwards. Core feature in WebGL 2.
  var ext = ctx.getExtension("ANGLE_instanced_arrays");
  // Because this extension is a core function in WebGL 2, assign the extension entry points in place of
  // where the core functions will reside in WebGL 2. This way the calling code can call these without
  // having to dynamically branch depending if running against WebGL 1 or WebGL 2.
  if (ext) {
    ctx["vertexAttribDivisor"] = (index, divisor) => ext["vertexAttribDivisorANGLE"](index, divisor);
    ctx["drawArraysInstanced"] = (mode, first, count, primcount) => ext["drawArraysInstancedANGLE"](mode, first, count, primcount);
    ctx["drawElementsInstanced"] = (mode, count, type, indices, primcount) => ext["drawElementsInstancedANGLE"](mode, count, type, indices, primcount);
    return 1;
  }
};

var webgl_enable_OES_vertex_array_object = ctx => {
  // Extension available in WebGL 1 from Firefox 25 and WebKit 536.28/desktop Safari 6.0.3 onwards. Core feature in WebGL 2.
  var ext = ctx.getExtension("OES_vertex_array_object");
  if (ext) {
    ctx["createVertexArray"] = () => ext["createVertexArrayOES"]();
    ctx["deleteVertexArray"] = vao => ext["deleteVertexArrayOES"](vao);
    ctx["bindVertexArray"] = vao => ext["bindVertexArrayOES"](vao);
    ctx["isVertexArray"] = vao => ext["isVertexArrayOES"](vao);
    return 1;
  }
};

var webgl_enable_WEBGL_draw_buffers = ctx => {
  // Extension available in WebGL 1 from Firefox 28 onwards. Core feature in WebGL 2.
  var ext = ctx.getExtension("WEBGL_draw_buffers");
  if (ext) {
    ctx["drawBuffers"] = (n, bufs) => ext["drawBuffersWEBGL"](n, bufs);
    return 1;
  }
};

var webgl_enable_EXT_polygon_offset_clamp = ctx => !!(ctx.extPolygonOffsetClamp = ctx.getExtension("EXT_polygon_offset_clamp"));

var webgl_enable_EXT_clip_control = ctx => !!(ctx.extClipControl = ctx.getExtension("EXT_clip_control"));

var webgl_enable_WEBGL_polygon_mode = ctx => !!(ctx.webglPolygonMode = ctx.getExtension("WEBGL_polygon_mode"));

var webgl_enable_WEBGL_multi_draw = ctx => // Closure is expected to be allowed to minify the '.multiDrawWebgl' property, so not accessing it quoted.
!!(ctx.multiDrawWebgl = ctx.getExtension("WEBGL_multi_draw"));

var getEmscriptenSupportedExtensions = ctx => {
  // Restrict the list of advertised extensions to those that we actually
  // support.
  var supportedExtensions = [ // WebGL 1 extensions
  "ANGLE_instanced_arrays", "EXT_blend_minmax", "EXT_disjoint_timer_query", "EXT_frag_depth", "EXT_shader_texture_lod", "EXT_sRGB", "OES_element_index_uint", "OES_fbo_render_mipmap", "OES_standard_derivatives", "OES_texture_float", "OES_texture_half_float", "OES_texture_half_float_linear", "OES_vertex_array_object", "WEBGL_color_buffer_float", "WEBGL_depth_texture", "WEBGL_draw_buffers", // WebGL 1 and WebGL 2 extensions
  "EXT_clip_control", "EXT_color_buffer_half_float", "EXT_depth_clamp", "EXT_float_blend", "EXT_polygon_offset_clamp", "EXT_texture_compression_bptc", "EXT_texture_compression_rgtc", "EXT_texture_filter_anisotropic", "KHR_parallel_shader_compile", "OES_texture_float_linear", "WEBGL_blend_func_extended", "WEBGL_compressed_texture_astc", "WEBGL_compressed_texture_etc", "WEBGL_compressed_texture_etc1", "WEBGL_compressed_texture_s3tc", "WEBGL_compressed_texture_s3tc_srgb", "WEBGL_debug_renderer_info", "WEBGL_debug_shaders", "WEBGL_lose_context", "WEBGL_multi_draw", "WEBGL_polygon_mode" ];
  // .getSupportedExtensions() can return null if context is lost, so coerce to empty array.
  return ctx.getSupportedExtensions()?.filter(ext => supportedExtensions.includes(ext)) ?? [];
};

var GL = {
  counter: 1,
  buffers: [],
  programs: [],
  framebuffers: [],
  renderbuffers: [],
  textures: [],
  shaders: [],
  vaos: [],
  contexts: [],
  offscreenCanvases: {},
  queries: [],
  stringCache: {},
  unpackAlignment: 4,
  unpackRowLength: 0,
  recordError: errorCode => {
    if (!GL.lastError) {
      GL.lastError = errorCode;
    }
  },
  getNewId: table => {
    var ret = GL.counter++;
    for (var i = table.length; i < ret; i++) {
      table[i] = null;
    }
    return ret;
  },
  genObject: (n, buffers, createFunction, objectTable) => {
    for (var i = 0; i < n; i++) {
      var buffer = GLctx[createFunction]();
      var id = buffer && GL.getNewId(objectTable);
      if (buffer) {
        buffer.name = id;
        objectTable[id] = buffer;
      } else {
        GL.recordError(1282);
      }
      HEAP32[(((buffers) + (i * 4)) >> 2)] = id;
    }
  },
  getSource: (shader, count, string, length) => {
    var source = "";
    for (var i = 0; i < count; ++i) {
      var len = length ? HEAPU32[(((length) + (i * 4)) >> 2)] : undefined;
      source += UTF8ToString(HEAPU32[(((string) + (i * 4)) >> 2)], len);
    }
    return source;
  },
  createContext: (/** @type {HTMLCanvasElement} */ canvas, webGLContextAttributes) => {
    // BUG: Workaround Safari WebGL issue: After successfully acquiring WebGL
    // context on a canvas, calling .getContext() will always return that
    // context independent of which 'webgl' or 'webgl2'
    // context version was passed. See:
    //   https://webkit.org/b/222758
    // and:
    //   https://github.com/emscripten-core/emscripten/issues/13295.
    // TODO: Once the bug is fixed and shipped in Safari, adjust the Safari
    // version field in above check.
    if (!canvas.getContextSafariWebGL2Fixed) {
      canvas.getContextSafariWebGL2Fixed = canvas.getContext;
      /** @type {function(this:HTMLCanvasElement, string, (Object|null)=): (RenderingContext|null)} */ function fixedGetContext(ver, attrs) {
        var gl = canvas.getContextSafariWebGL2Fixed(ver, attrs);
        return ((ver == "webgl") == (gl instanceof WebGLRenderingContext)) ? gl : null;
      }
      canvas.getContext = fixedGetContext;
    }
    var ctx = canvas.getContext("webgl", webGLContextAttributes);
    if (!ctx) return 0;
    var handle = GL.registerContext(ctx, webGLContextAttributes);
    return handle;
  },
  registerContext: (ctx, webGLContextAttributes) => {
    // without pthreads a context is just an integer ID
    var handle = GL.getNewId(GL.contexts);
    var context = {
      handle,
      attributes: webGLContextAttributes,
      version: webGLContextAttributes.majorVersion,
      GLctx: ctx
    };
    // Store the created context object so that we can access the context
    // given a canvas without having to pass the parameters again.
    if (ctx.canvas) ctx.canvas.GLctxObject = context;
    GL.contexts[handle] = context;
    if (typeof webGLContextAttributes.enableExtensionsByDefault === "undefined" || webGLContextAttributes.enableExtensionsByDefault) {
      GL.initExtensions(context);
    }
    return handle;
  },
  makeContextCurrent: contextHandle => {
    // Active Emscripten GL layer context object.
    GL.currentContext = GL.contexts[contextHandle];
    // Active WebGL context object.
    Module["ctx"] = GLctx = GL.currentContext?.GLctx;
    return !(contextHandle && !GLctx);
  },
  getContext: contextHandle => GL.contexts[contextHandle],
  deleteContext: contextHandle => {
    if (GL.currentContext === GL.contexts[contextHandle]) {
      GL.currentContext = null;
    }
    if (typeof JSEvents === "object") {
      // Release all JS event handlers on the DOM element that the GL context is
      // associated with since the context is now deleted.
      JSEvents.removeAllHandlersOnTarget(GL.contexts[contextHandle].GLctx.canvas);
    }
    // Make sure the canvas object no longer refers to the context object so
    // there are no GC surprises.
    if (GL.contexts[contextHandle]?.GLctx.canvas) {
      GL.contexts[contextHandle].GLctx.canvas.GLctxObject = undefined;
    }
    GL.contexts[contextHandle] = null;
  },
  initExtensions: context => {
    // If this function is called without a specific context object, init the
    // extensions of the currently active context.
    context ||= GL.currentContext;
    if (context.initExtensionsDone) return;
    context.initExtensionsDone = true;
    var GLctx = context.GLctx;
    // Detect the presence of a few extensions manually, since the GL interop
    // layer itself will need to know if they exist.
    // Extensions that are available in both WebGL 1 and WebGL 2
    webgl_enable_WEBGL_multi_draw(GLctx);
    webgl_enable_EXT_polygon_offset_clamp(GLctx);
    webgl_enable_EXT_clip_control(GLctx);
    webgl_enable_WEBGL_polygon_mode(GLctx);
    // Extensions that are only available in WebGL 1 (the calls will be no-ops
    // if called on a WebGL 2 context active)
    webgl_enable_ANGLE_instanced_arrays(GLctx);
    webgl_enable_OES_vertex_array_object(GLctx);
    webgl_enable_WEBGL_draw_buffers(GLctx);
    {
      GLctx.disjointTimerQueryExt = GLctx.getExtension("EXT_disjoint_timer_query");
    }
    for (var ext of getEmscriptenSupportedExtensions(GLctx)) {
      // WEBGL_lose_context, WEBGL_debug_renderer_info and WEBGL_debug_shaders
      // are not enabled by default.
      if (!ext.includes("lose_context") && !ext.includes("debug")) {
        // Call .getExtension() to enable that extension permanently.
        GLctx.getExtension(ext);
      }
    }
  }
};

var _emscripten_glActiveTexture = x0 => GLctx.activeTexture(x0);

var _emscripten_glAttachShader = (program, shader) => {
  GLctx.attachShader(GL.programs[program], GL.shaders[shader]);
};

var _emscripten_glBeginQueryEXT = (target, id) => {
  GLctx.disjointTimerQueryExt["beginQueryEXT"](target, GL.queries[id]);
};

var _emscripten_glBindAttribLocation = (program, index, name) => {
  GLctx.bindAttribLocation(GL.programs[program], index, UTF8ToString(name));
};

var _emscripten_glBindBuffer = (target, buffer) => {
  GLctx.bindBuffer(target, GL.buffers[buffer]);
};

var _emscripten_glBindFramebuffer = (target, framebuffer) => {
  GLctx.bindFramebuffer(target, GL.framebuffers[framebuffer]);
};

var _emscripten_glBindRenderbuffer = (target, renderbuffer) => {
  GLctx.bindRenderbuffer(target, GL.renderbuffers[renderbuffer]);
};

var _emscripten_glBindTexture = (target, texture) => {
  GLctx.bindTexture(target, GL.textures[texture]);
};

var _emscripten_glBindVertexArray = vao => {
  GLctx.bindVertexArray(GL.vaos[vao]);
};

var _emscripten_glBindVertexArrayOES = _emscripten_glBindVertexArray;

var _emscripten_glBlendColor = (x0, x1, x2, x3) => GLctx.blendColor(x0, x1, x2, x3);

var _emscripten_glBlendEquation = x0 => GLctx.blendEquation(x0);

var _emscripten_glBlendEquationSeparate = (x0, x1) => GLctx.blendEquationSeparate(x0, x1);

var _emscripten_glBlendFunc = (x0, x1) => GLctx.blendFunc(x0, x1);

var _emscripten_glBlendFuncSeparate = (x0, x1, x2, x3) => GLctx.blendFuncSeparate(x0, x1, x2, x3);

var _emscripten_glBufferData = (target, size, data, usage) => {
  // N.b. here first form specifies a heap subarray, second form an integer
  // size, so the ?: code here is polymorphic. It is advised to avoid
  // randomly mixing both uses in calling code, to avoid any potential JS
  // engine JIT issues.
  GLctx.bufferData(target, data ? HEAPU8.subarray(data, data + size) : size, usage);
};

var webglBufferSubData = (target, offset, size, data, src = HEAPU8) => {
  GLctx.bufferSubData(target, offset, src.subarray(data, data + size));
};

var _emscripten_glBufferSubData = (target, offset, size, data) => webglBufferSubData(target, offset, size, data);

var _emscripten_glCheckFramebufferStatus = x0 => GLctx.checkFramebufferStatus(x0);

var _emscripten_glClear = x0 => GLctx.clear(x0);

var _emscripten_glClearColor = (x0, x1, x2, x3) => GLctx.clearColor(x0, x1, x2, x3);

var _emscripten_glClearDepthf = x0 => GLctx.clearDepth(x0);

var _emscripten_glClearStencil = x0 => GLctx.clearStencil(x0);

var _emscripten_glClipControlEXT = (origin, depth) => {
  GLctx.extClipControl["clipControlEXT"](origin, depth);
};

var _emscripten_glColorMask = (red, green, blue, alpha) => {
  GLctx.colorMask(!!red, !!green, !!blue, !!alpha);
};

var _emscripten_glCompileShader = shader => {
  GLctx.compileShader(GL.shaders[shader]);
};

var _emscripten_glCompressedTexImage2D = (target, level, internalFormat, width, height, border, imageSize, data) => {
  // `data` may be null here, which means "allocate uninitialized space but
  // don't upload" in GLES parlance, but `compressedTexImage2D` requires the
  // final data parameter, so we simply pass a heap view starting at zero
  // effectively uploading whatever happens to be near address zero.  See
  // https://github.com/emscripten-core/emscripten/issues/19300.
  GLctx.compressedTexImage2D(target, level, internalFormat, width, height, border, HEAPU8.subarray(data, data + imageSize));
};

var _emscripten_glCompressedTexSubImage2D = (target, level, xoffset, yoffset, width, height, format, imageSize, data) => {
  GLctx.compressedTexSubImage2D(target, level, xoffset, yoffset, width, height, format, HEAPU8.subarray(data, data + imageSize));
};

var _emscripten_glCopyTexImage2D = (x0, x1, x2, x3, x4, x5, x6, x7) => GLctx.copyTexImage2D(x0, x1, x2, x3, x4, x5, x6, x7);

var _emscripten_glCopyTexSubImage2D = (x0, x1, x2, x3, x4, x5, x6, x7) => GLctx.copyTexSubImage2D(x0, x1, x2, x3, x4, x5, x6, x7);

var _emscripten_glCreateProgram = () => {
  var id = GL.getNewId(GL.programs);
  var program = GLctx.createProgram();
  // Store additional information needed for each shader program:
  program.name = id;
  // Lazy cache results of
  // glGetProgramiv(GL_ACTIVE_UNIFORM_MAX_LENGTH/GL_ACTIVE_ATTRIBUTE_MAX_LENGTH/GL_ACTIVE_UNIFORM_BLOCK_MAX_NAME_LENGTH)
  program.maxUniformLength = program.maxAttributeLength = program.maxUniformBlockNameLength = 0;
  program.uniformIdCounter = 1;
  GL.programs[id] = program;
  return id;
};

var _emscripten_glCreateShader = shaderType => {
  var id = GL.getNewId(GL.shaders);
  GL.shaders[id] = GLctx.createShader(shaderType);
  return id;
};

var _emscripten_glCullFace = x0 => GLctx.cullFace(x0);

var _emscripten_glDeleteBuffers = (n, buffers) => {
  for (var i = 0; i < n; i++) {
    var id = HEAP32[(((buffers) + (i * 4)) >> 2)];
    var buffer = GL.buffers[id];
    // From spec: "glDeleteBuffers silently ignores 0's and names that do not
    // correspond to existing buffer objects."
    if (!buffer) continue;
    GLctx.deleteBuffer(buffer);
    buffer.name = 0;
    GL.buffers[id] = null;
  }
};

var _emscripten_glDeleteFramebuffers = (n, framebuffers) => {
  for (var i = 0; i < n; ++i) {
    var id = HEAP32[(((framebuffers) + (i * 4)) >> 2)];
    var framebuffer = GL.framebuffers[id];
    if (!framebuffer) continue;
    // GL spec: "glDeleteFramebuffers silently ignores 0s and names that do not correspond to existing framebuffer objects".
    GLctx.deleteFramebuffer(framebuffer);
    framebuffer.name = 0;
    GL.framebuffers[id] = null;
  }
};

var _emscripten_glDeleteProgram = id => {
  if (!id) return;
  var program = GL.programs[id];
  if (!program) {
    // glDeleteProgram actually signals an error when deleting a nonexisting
    // object, unlike some other GL delete functions.
    GL.recordError(1281);
    return;
  }
  GLctx.deleteProgram(program);
  program.name = 0;
  GL.programs[id] = null;
};

var _emscripten_glDeleteQueriesEXT = (n, ids) => {
  for (var i = 0; i < n; i++) {
    var id = HEAP32[(((ids) + (i * 4)) >> 2)];
    var query = GL.queries[id];
    if (!query) continue;
    // GL spec: "unused names in ids are ignored, as is the name zero."
    GLctx.disjointTimerQueryExt["deleteQueryEXT"](query);
    GL.queries[id] = null;
  }
};

var _emscripten_glDeleteRenderbuffers = (n, renderbuffers) => {
  for (var i = 0; i < n; i++) {
    var id = HEAP32[(((renderbuffers) + (i * 4)) >> 2)];
    var renderbuffer = GL.renderbuffers[id];
    if (!renderbuffer) continue;
    // GL spec: "glDeleteRenderbuffers silently ignores 0s and names that do not correspond to existing renderbuffer objects".
    GLctx.deleteRenderbuffer(renderbuffer);
    renderbuffer.name = 0;
    GL.renderbuffers[id] = null;
  }
};

var _emscripten_glDeleteShader = id => {
  if (!id) return;
  var shader = GL.shaders[id];
  if (!shader) {
    // glDeleteShader actually signals an error when deleting a nonexisting
    // object, unlike some other GL delete functions.
    GL.recordError(1281);
    return;
  }
  GLctx.deleteShader(shader);
  GL.shaders[id] = null;
};

var _emscripten_glDeleteTextures = (n, textures) => {
  for (var i = 0; i < n; i++) {
    var id = HEAP32[(((textures) + (i * 4)) >> 2)];
    var texture = GL.textures[id];
    // GL spec: "glDeleteTextures silently ignores 0s and names that do not
    // correspond to existing textures".
    if (!texture) continue;
    GLctx.deleteTexture(texture);
    texture.name = 0;
    GL.textures[id] = null;
  }
};

var _emscripten_glDeleteVertexArrays = (n, vaos) => {
  for (var i = 0; i < n; i++) {
    var id = HEAP32[(((vaos) + (i * 4)) >> 2)];
    GLctx.deleteVertexArray(GL.vaos[id]);
    GL.vaos[id] = null;
  }
};

var _emscripten_glDeleteVertexArraysOES = _emscripten_glDeleteVertexArrays;

var _emscripten_glDepthFunc = x0 => GLctx.depthFunc(x0);

var _emscripten_glDepthMask = flag => {
  GLctx.depthMask(!!flag);
};

var _emscripten_glDepthRangef = (x0, x1) => GLctx.depthRange(x0, x1);

var _emscripten_glDetachShader = (program, shader) => {
  GLctx.detachShader(GL.programs[program], GL.shaders[shader]);
};

var _emscripten_glDisable = x0 => GLctx.disable(x0);

var _emscripten_glDisableVertexAttribArray = index => {
  GLctx.disableVertexAttribArray(index);
};

var _emscripten_glDrawArrays = (mode, first, count) => {
  GLctx.drawArrays(mode, first, count);
};

var _emscripten_glDrawArraysInstanced = (mode, first, count, primcount) => {
  GLctx.drawArraysInstanced(mode, first, count, primcount);
};

var _emscripten_glDrawArraysInstancedANGLE = _emscripten_glDrawArraysInstanced;

var tempFixedLengthArray = [];

var _emscripten_glDrawBuffers = (n, bufs) => {
  var bufArray = tempFixedLengthArray[n];
  for (var i = 0; i < n; i++) {
    bufArray[i] = HEAP32[(((bufs) + (i * 4)) >> 2)];
  }
  GLctx.drawBuffers(bufArray);
};

var _emscripten_glDrawBuffersWEBGL = _emscripten_glDrawBuffers;

var _emscripten_glDrawElements = (mode, count, type, indices) => {
  GLctx.drawElements(mode, count, type, indices);
};

var _emscripten_glDrawElementsInstanced = (mode, count, type, indices, primcount) => {
  GLctx.drawElementsInstanced(mode, count, type, indices, primcount);
};

var _emscripten_glDrawElementsInstancedANGLE = _emscripten_glDrawElementsInstanced;

var _emscripten_glEnable = x0 => GLctx.enable(x0);

var _emscripten_glEnableVertexAttribArray = index => {
  GLctx.enableVertexAttribArray(index);
};

var _emscripten_glEndQueryEXT = target => {
  GLctx.disjointTimerQueryExt["endQueryEXT"](target);
};

var _emscripten_glFinish = () => GLctx.finish();

var _emscripten_glFlush = () => GLctx.flush();

var _emscripten_glFramebufferRenderbuffer = (target, attachment, renderbuffertarget, renderbuffer) => {
  GLctx.framebufferRenderbuffer(target, attachment, renderbuffertarget, GL.renderbuffers[renderbuffer]);
};

var _emscripten_glFramebufferTexture2D = (target, attachment, textarget, texture, level) => {
  GLctx.framebufferTexture2D(target, attachment, textarget, GL.textures[texture], level);
};

var _emscripten_glFrontFace = x0 => GLctx.frontFace(x0);

var _emscripten_glGenBuffers = (n, buffers) => {
  GL.genObject(n, buffers, "createBuffer", GL.buffers);
};

var _emscripten_glGenFramebuffers = (n, ids) => {
  GL.genObject(n, ids, "createFramebuffer", GL.framebuffers);
};

var _emscripten_glGenQueriesEXT = (n, ids) => {
  for (var i = 0; i < n; i++) {
    var query = GLctx.disjointTimerQueryExt["createQueryEXT"]();
    if (!query) {
      GL.recordError(1282);
      while (i < n) HEAP32[(((ids) + (i++ * 4)) >> 2)] = 0;
      return;
    }
    var id = GL.getNewId(GL.queries);
    query.name = id;
    GL.queries[id] = query;
    HEAP32[(((ids) + (i * 4)) >> 2)] = id;
  }
};

var _emscripten_glGenRenderbuffers = (n, renderbuffers) => {
  GL.genObject(n, renderbuffers, "createRenderbuffer", GL.renderbuffers);
};

var _emscripten_glGenTextures = (n, textures) => {
  GL.genObject(n, textures, "createTexture", GL.textures);
};

var _emscripten_glGenVertexArrays = (n, arrays) => {
  GL.genObject(n, arrays, "createVertexArray", GL.vaos);
};

var _emscripten_glGenVertexArraysOES = _emscripten_glGenVertexArrays;

var _emscripten_glGenerateMipmap = x0 => GLctx.generateMipmap(x0);

var __glGetActiveAttribOrUniform = (funcName, program, index, bufSize, length, size, type, name) => {
  program = GL.programs[program];
  var info = GLctx[funcName](program, index);
  if (info) {
    // If an error occurs, nothing will be written to length, size and type and name.
    var numBytesWrittenExclNull = name && stringToUTF8(info.name, name, bufSize);
    if (length) HEAP32[((length) >> 2)] = numBytesWrittenExclNull;
    if (size) HEAP32[((size) >> 2)] = info.size;
    if (type) HEAP32[((type) >> 2)] = info.type;
  }
};

var _emscripten_glGetActiveAttrib = (program, index, bufSize, length, size, type, name) => __glGetActiveAttribOrUniform("getActiveAttrib", program, index, bufSize, length, size, type, name);

var _emscripten_glGetActiveUniform = (program, index, bufSize, length, size, type, name) => __glGetActiveAttribOrUniform("getActiveUniform", program, index, bufSize, length, size, type, name);

var _emscripten_glGetAttachedShaders = (program, maxCount, count, shaders) => {
  var result = GLctx.getAttachedShaders(GL.programs[program]);
  var len = result.length;
  if (len > maxCount) {
    len = maxCount;
  }
  HEAP32[((count) >> 2)] = len;
  for (var i = 0; i < len; ++i) {
    var id = GL.shaders.indexOf(result[i]);
    HEAP32[(((shaders) + (i * 4)) >> 2)] = id;
  }
};

var _emscripten_glGetAttribLocation = (program, name) => GLctx.getAttribLocation(GL.programs[program], UTF8ToString(name));

var readI53FromI64 = ptr => HEAPU32[((ptr) >> 2)] + HEAP32[(((ptr) + (4)) >> 2)] * 4294967296;

var readI53FromU64 = ptr => HEAPU32[((ptr) >> 2)] + HEAPU32[(((ptr) + (4)) >> 2)] * 4294967296;

var writeI53ToI64 = (ptr, num) => {
  HEAPU32[((ptr) >> 2)] = num;
  var lower = HEAPU32[((ptr) >> 2)];
  HEAPU32[(((ptr) + (4)) >> 2)] = (num - lower) / 4294967296;
  var deserialized = (num >= 0) ? readI53FromU64(ptr) : readI53FromI64(ptr);
  var offset = ((ptr) >> 2);
  if (deserialized != num) warnOnce(`writeI53ToI64() out of range: serialized JS Number ${num} to Wasm heap as bytes lo=${ptrToString(HEAPU32[offset])}, hi=${ptrToString(HEAPU32[offset + 1])}, which deserializes back to ${deserialized} instead!`);
};

/** @type {!Float32Array} */ var HEAPF32;

var emscriptenWebGLGet = (name_, p, type) => {
  // Guard against user passing a null pointer.
  // Note that GLES2 spec does not say anything about how passing a null
  // pointer should be treated.  Testing on desktop core GL 3, the application
  // crashes on glGetIntegerv to a null pointer, but better to report an error
  // instead of doing anything random.
  if (!p) {
    GL.recordError(1281);
    return;
  }
  var ret = undefined;
  switch (name_) {
   // Handle a few trivial GLES values
    case 36346:
    // GL_SHADER_COMPILER
    ret = 1;
    break;

   case 36344:
    // GL_SHADER_BINARY_FORMATS
    if (type != 0 && type != 1) {
      GL.recordError(1280);
    }
    // Do not write anything to the out pointer, since no binary formats are
    // supported.
    return;

   case 36345:
    // GL_NUM_SHADER_BINARY_FORMATS
    ret = 0;
    break;

   case 34466:
    // GL_NUM_COMPRESSED_TEXTURE_FORMATS
    // WebGL doesn't have GL_NUM_COMPRESSED_TEXTURE_FORMATS (it's obsolete
    // since GL_COMPRESSED_TEXTURE_FORMATS returns a JS array that can be
    // queried for length), so implement it ourselves to allow C++ GLES2
    // code to get the length.
    var formats = GLctx.getParameter(34467);
    ret = formats ? formats.length : 0;
    break;
  }
  if (ret === undefined) {
    var result = GLctx.getParameter(name_);
    switch (typeof result) {
     case "number":
      ret = result;
      break;

     case "boolean":
      ret = result ? 1 : 0;
      break;

     case "string":
      GL.recordError(1280);
      // GL_INVALID_ENUM
      return;

     case "object":
      if (result === null) {
        // null is a valid result for some (e.g., which buffer is bound -
        // perhaps nothing is bound), but otherwise can mean an invalid
        // name_, which we need to report as an error
        switch (name_) {
         case 34964:
         // ARRAY_BUFFER_BINDING
          case 35725:
         // CURRENT_PROGRAM
          case 34965:
         // ELEMENT_ARRAY_BUFFER_BINDING
          case 36006:
         // FRAMEBUFFER_BINDING or DRAW_FRAMEBUFFER_BINDING
          case 36007:
         // RENDERBUFFER_BINDING
          case 32873:
         // TEXTURE_BINDING_2D
          case 34229:
         // WebGL 2 GL_VERTEX_ARRAY_BINDING, or WebGL 1 extension OES_vertex_array_object GL_VERTEX_ARRAY_BINDING_OES
          case 34068:
          {
            // TEXTURE_BINDING_CUBE_MAP
            ret = 0;
            break;
          }

         default:
          {
            GL.recordError(1280);
            // GL_INVALID_ENUM
            return;
          }
        }
      } else if (result instanceof Float32Array || result instanceof Uint32Array || result instanceof Int32Array || result instanceof Array) {
        for (var i = 0; i < result.length; ++i) {
          switch (type) {
           case 0:
            HEAP32[(((p) + (i * 4)) >> 2)] = result[i];
            break;

           case 2:
            HEAPF32[(((p) + (i * 4)) >> 2)] = result[i];
            break;

           case 4:
            HEAP8[(p) + (i)] = result[i] ? 1 : 0;
            break;
          }
        }
        return;
      } else {
        try {
          ret = result.name | 0;
        } catch (e) {
          GL.recordError(1280);
          // GL_INVALID_ENUM
          err(`GL_INVALID_ENUM in glGet${type}v: Unknown object returned from WebGL getParameter(${name_})! (error: ${e})`);
          return;
        }
      }
      break;

     default:
      GL.recordError(1280);
      // GL_INVALID_ENUM
      err(`GL_INVALID_ENUM in glGet${type}v: Native code calling glGet${type}v(${name_}) and it returns ${result} of type ${typeof (result)}!`);
      return;
    }
  }
  switch (type) {
   case 1:
    writeI53ToI64(p, ret);
    break;

   case 0:
    HEAP32[((p) >> 2)] = ret;
    break;

   case 2:
    HEAPF32[((p) >> 2)] = ret;
    break;

   case 4:
    HEAP8[p] = ret ? 1 : 0;
    break;
  }
};

var _emscripten_glGetBooleanv = (name_, p) => emscriptenWebGLGet(name_, p, 4);

var _emscripten_glGetBufferParameteriv = (target, value, data) => {
  if (!data) {
    // GLES2 specification does not specify how to behave if data is a null
    // pointer. Since calling this function does not make sense if data ==
    // null, issue a GL error to notify user about it.
    GL.recordError(1281);
    return;
  }
  HEAP32[((data) >> 2)] = GLctx.getBufferParameter(target, value);
};

var _emscripten_glGetError = () => {
  var error = GLctx.getError() || GL.lastError;
  GL.lastError = 0;
  return error;
};

var _emscripten_glGetFloatv = (name_, p) => emscriptenWebGLGet(name_, p, 2);

var _emscripten_glGetFramebufferAttachmentParameteriv = (target, attachment, pname, params) => {
  var result = GLctx.getFramebufferAttachmentParameter(target, attachment, pname);
  if (result instanceof WebGLRenderbuffer || result instanceof WebGLTexture) {
    result = result.name | 0;
  }
  HEAP32[((params) >> 2)] = result;
};

var _emscripten_glGetIntegerv = (name_, p) => emscriptenWebGLGet(name_, p, 0);

var _emscripten_glGetProgramInfoLog = (program, maxLength, length, infoLog) => {
  var log = GLctx.getProgramInfoLog(GL.programs[program]);
  if (log === null) log = "(unknown error)";
  var numBytesWrittenExclNull = (maxLength > 0 && infoLog) ? stringToUTF8(log, infoLog, maxLength) : 0;
  if (length) HEAP32[((length) >> 2)] = numBytesWrittenExclNull;
};

var _emscripten_glGetProgramiv = (program, pname, p) => {
  if (!p) {
    // GLES2 specification does not specify how to behave if p is a null
    // pointer. Since calling this function does not make sense if p == null,
    // issue a GL error to notify user about it.
    GL.recordError(1281);
    return;
  }
  if (program >= GL.counter) {
    GL.recordError(1281);
    return;
  }
  program = GL.programs[program];
  if (pname == 35716) {
    // GL_INFO_LOG_LENGTH
    var log = GLctx.getProgramInfoLog(program);
    if (log === null) log = "(unknown error)";
    HEAP32[((p) >> 2)] = log.length + 1;
  } else if (pname == 35719) {
    if (!program.maxUniformLength) {
      var numActiveUniforms = GLctx.getProgramParameter(program, 35718);
      for (var i = 0; i < numActiveUniforms; ++i) {
        program.maxUniformLength = Math.max(program.maxUniformLength, GLctx.getActiveUniform(program, i).name.length + 1);
      }
    }
    HEAP32[((p) >> 2)] = program.maxUniformLength;
  } else if (pname == 35722) {
    if (!program.maxAttributeLength) {
      var numActiveAttributes = GLctx.getProgramParameter(program, 35721);
      for (var i = 0; i < numActiveAttributes; ++i) {
        program.maxAttributeLength = Math.max(program.maxAttributeLength, GLctx.getActiveAttrib(program, i).name.length + 1);
      }
    }
    HEAP32[((p) >> 2)] = program.maxAttributeLength;
  } else if (pname == 35381) {
    if (!program.maxUniformBlockNameLength) {
      var numActiveUniformBlocks = GLctx.getProgramParameter(program, 35382);
      for (var i = 0; i < numActiveUniformBlocks; ++i) {
        program.maxUniformBlockNameLength = Math.max(program.maxUniformBlockNameLength, GLctx.getActiveUniformBlockName(program, i).length + 1);
      }
    }
    HEAP32[((p) >> 2)] = program.maxUniformBlockNameLength;
  } else {
    HEAP32[((p) >> 2)] = GLctx.getProgramParameter(program, pname);
  }
};

var _emscripten_glGetQueryObjecti64vEXT = (id, pname, params) => {
  if (!params) {
    // GLES2 specification does not specify how to behave if params is a null pointer. Since calling this function does not make sense
    // if p == null, issue a GL error to notify user about it.
    GL.recordError(1281);
    return;
  }
  var query = GL.queries[id];
  var param;
  {
    param = GLctx.disjointTimerQueryExt["getQueryObjectEXT"](query, pname);
  }
  var ret;
  if (typeof param === "boolean") {
    ret = param ? 1 : 0;
  } else {
    ret = param;
  }
  writeI53ToI64(params, ret);
};

var _emscripten_glGetQueryObjectivEXT = (id, pname, params) => {
  if (!params) {
    // GLES2 specification does not specify how to behave if params is a null pointer. Since calling this function does not make sense
    // if p == null, issue a GL error to notify user about it.
    GL.recordError(1281);
    return;
  }
  var query = GL.queries[id];
  var param = GLctx.disjointTimerQueryExt["getQueryObjectEXT"](query, pname);
  var ret;
  if (typeof param === "boolean") {
    ret = param ? 1 : 0;
  } else {
    ret = param;
  }
  HEAP32[((params) >> 2)] = ret;
};

var _emscripten_glGetQueryObjectui64vEXT = _emscripten_glGetQueryObjecti64vEXT;

var _emscripten_glGetQueryObjectuivEXT = _emscripten_glGetQueryObjectivEXT;

var _emscripten_glGetQueryivEXT = (target, pname, params) => {
  if (!params) {
    // GLES2 specification does not specify how to behave if params is a null pointer. Since calling this function does not make sense
    // if p == null, issue a GL error to notify user about it.
    GL.recordError(1281);
    return;
  }
  HEAP32[((params) >> 2)] = GLctx.disjointTimerQueryExt["getQueryEXT"](target, pname);
};

var _emscripten_glGetRenderbufferParameteriv = (target, pname, params) => {
  if (!params) {
    // GLES2 specification does not specify how to behave if params is a null pointer. Since calling this function does not make sense
    // if params == null, issue a GL error to notify user about it.
    GL.recordError(1281);
    return;
  }
  HEAP32[((params) >> 2)] = GLctx.getRenderbufferParameter(target, pname);
};

var _emscripten_glGetShaderInfoLog = (shader, maxLength, length, infoLog) => {
  var log = GLctx.getShaderInfoLog(GL.shaders[shader]);
  if (log === null) log = "(unknown error)";
  var numBytesWrittenExclNull = (maxLength > 0 && infoLog) ? stringToUTF8(log, infoLog, maxLength) : 0;
  if (length) HEAP32[((length) >> 2)] = numBytesWrittenExclNull;
};

var _emscripten_glGetShaderPrecisionFormat = (shaderType, precisionType, range, precision) => {
  var result = GLctx.getShaderPrecisionFormat(shaderType, precisionType);
  HEAP32[((range) >> 2)] = result.rangeMin;
  HEAP32[(((range) + (4)) >> 2)] = result.rangeMax;
  HEAP32[((precision) >> 2)] = result.precision;
};

var _emscripten_glGetShaderSource = (shader, bufSize, length, source) => {
  var result = GLctx.getShaderSource(GL.shaders[shader]);
  if (!result) return;
  // If an error occurs, nothing will be written to length or source.
  var numBytesWrittenExclNull = (bufSize > 0 && source) ? stringToUTF8(result, source, bufSize) : 0;
  if (length) HEAP32[((length) >> 2)] = numBytesWrittenExclNull;
};

var _emscripten_glGetShaderiv = (shader, pname, p) => {
  if (!p) {
    // GLES2 specification does not specify how to behave if p is a null
    // pointer. Since calling this function does not make sense if p == null,
    // issue a GL error to notify user about it.
    GL.recordError(1281);
    return;
  }
  if (pname == 35716) {
    // GL_INFO_LOG_LENGTH
    var log = GLctx.getShaderInfoLog(GL.shaders[shader]);
    if (log === null) log = "(unknown error)";
    // The GLES2 specification says that if the shader has an empty info log,
    // a value of 0 is returned. Otherwise the log has a null char appended.
    // (An empty string is falsey, so we can just check that instead of
    // looking at log.length.)
    var logLength = log ? log.length + 1 : 0;
    HEAP32[((p) >> 2)] = logLength;
  } else if (pname == 35720) {
    // GL_SHADER_SOURCE_LENGTH
    var source = GLctx.getShaderSource(GL.shaders[shader]);
    // source may be a null, or the empty string, both of which are falsey
    // values that we report a 0 length for.
    var sourceLength = source ? source.length + 1 : 0;
    HEAP32[((p) >> 2)] = sourceLength;
  } else {
    HEAP32[((p) >> 2)] = GLctx.getShaderParameter(GL.shaders[shader], pname);
  }
};

var stringToNewUTF8 = str => {
  var size = lengthBytesUTF8(str) + 1;
  var ret = _malloc(size);
  if (ret) stringToUTF8(str, ret, size);
  return ret;
};

var webglGetExtensions = () => {
  var exts = getEmscriptenSupportedExtensions(GLctx);
  exts = exts.concat(exts.map(e => "GL_" + e));
  return exts;
};

var _emscripten_glGetString = name_ => {
  var ret = GL.stringCache[name_];
  if (!ret) {
    switch (name_) {
     case 7939:
      ret = stringToNewUTF8(webglGetExtensions().join(" "));
      break;

     case 7936:
     case 7937:
     case 37445:
     case 37446:
      var s = GLctx.getParameter(name_);
      if (!s) {
        GL.recordError(1280);
      }
      ret = s ? stringToNewUTF8(s) : 0;
      break;

     case 7938:
      var webGLVersion = GLctx.getParameter(7938);
      // return GLES version string corresponding to the version of the WebGL context
      var glVersion = `OpenGL ES 2.0 (${webGLVersion})`;
      ret = stringToNewUTF8(glVersion);
      break;

     case 35724:
      var glslVersion = GLctx.getParameter(35724);
      // extract the version number 'N.M' from the string 'WebGL GLSL ES N.M ...'
      var ver_re = /^WebGL GLSL ES ([0-9]\.[0-9][0-9]?)(?:$| .*)/;
      var ver_num = glslVersion.match(ver_re);
      if (ver_num !== null) {
        if (ver_num[1].length == 3) ver_num[1] = ver_num[1] + "0";
        // ensure minor version has 2 digits
        glslVersion = `OpenGL ES GLSL ES ${ver_num[1]} (${glslVersion})`;
      }
      ret = stringToNewUTF8(glslVersion);
      break;

     default:
      GL.recordError(1280);
    }
    GL.stringCache[name_] = ret;
  }
  return ret;
};

var _emscripten_glGetTexParameterfv = (target, pname, params) => {
  if (!params) {
    // GLES2 specification does not specify how to behave if params is a null
    // pointer. Since calling this function does not make sense if p == null,
    // issue a GL error to notify user about it.
    GL.recordError(1281);
    return;
  }
  HEAPF32[((params) >> 2)] = GLctx.getTexParameter(target, pname);
};

var _emscripten_glGetTexParameteriv = (target, pname, params) => {
  if (!params) {
    // GLES2 specification does not specify how to behave if params is a null
    // pointer. Since calling this function does not make sense if p == null,
    // issue a GL error to notify user about it.
    GL.recordError(1281);
    return;
  }
  HEAP32[((params) >> 2)] = GLctx.getTexParameter(target, pname);
};

/** @suppress {checkTypes} */ var jstoi_q = str => parseInt(str);

/** @noinline */ var webglGetLeftBracePos = name => name.slice(-1) == "]" && name.lastIndexOf("[");

var webglPrepareUniformLocationsBeforeFirstUse = program => {
  var uniformLocsById = program.uniformLocsById, // Maps GLuint -> WebGLUniformLocation
  uniformSizeAndIdsByName = program.uniformSizeAndIdsByName, // Maps name -> [uniform array length, GLuint]
  i, j;
  // On the first time invocation of glGetUniformLocation on this shader program:
  // initialize cache data structures and discover which uniforms are arrays.
  if (!uniformLocsById) {
    // maps GLint integer locations to WebGLUniformLocations
    program.uniformLocsById = uniformLocsById = {};
    // maps integer locations back to uniform name strings, so that we can lazily fetch uniform array locations
    program.uniformArrayNamesById = {};
    var numActiveUniforms = GLctx.getProgramParameter(program, 35718);
    for (i = 0; i < numActiveUniforms; ++i) {
      var u = GLctx.getActiveUniform(program, i);
      var nm = u.name;
      var sz = u.size;
      var lb = webglGetLeftBracePos(nm);
      var arrayName = lb > 0 ? nm.slice(0, lb) : nm;
      // Assign a new location.
      var id = program.uniformIdCounter;
      program.uniformIdCounter += sz;
      // Eagerly get the location of the uniformArray[0] base element.
      // The remaining indices >0 will be left for lazy evaluation to
      // improve performance. Those may never be needed to fetch, if the
      // application fills arrays always in full starting from the first
      // element of the array.
      uniformSizeAndIdsByName[arrayName] = [ sz, id ];
      // Store placeholder integers in place that highlight that these
      // >0 index locations are array indices pending population.
      for (j = 0; j < sz; ++j) {
        uniformLocsById[id] = j;
        program.uniformArrayNamesById[id++] = arrayName;
      }
    }
  }
};

var _emscripten_glGetUniformLocation = (program, name) => {
  name = UTF8ToString(name);
  if (program = GL.programs[program]) {
    webglPrepareUniformLocationsBeforeFirstUse(program);
    var uniformLocsById = program.uniformLocsById;
    // Maps GLuint -> WebGLUniformLocation
    var arrayIndex = 0;
    var uniformBaseName = name;
    // Invariant: when populating integer IDs for uniform locations, we must
    // maintain the precondition that arrays reside in contiguous addresses,
    // i.e. for a 'vec4 colors[10];', colors[4] must be at location
    // colors[0]+4.  However, user might call glGetUniformLocation(program,
    // "colors") for an array, so we cannot discover based on the user input
    // arguments whether the uniform we are dealing with is an array. The only
    // way to discover which uniforms are arrays is to enumerate over all the
    // active uniforms in the program.
    var leftBrace = webglGetLeftBracePos(name);
    // If user passed an array accessor "[index]", parse the array index off the accessor.
    if (leftBrace > 0) {
      arrayIndex = jstoi_q(name.slice(leftBrace + 1)) >>> 0;
      // "index]", coerce parseInt(']') with >>>0 to treat "foo[]" as "foo[0]" and foo[-1] as unsigned out-of-bounds.
      uniformBaseName = name.slice(0, leftBrace);
    }
    // Have we cached the location of this uniform before?
    // A pair [array length, GLint of the uniform location]
    var sizeAndId = program.uniformSizeAndIdsByName[uniformBaseName];
    // If a uniform with this name exists, and if its index is within the
    // array limits (if it's even an array), query the WebGLlocation, or
    // return an existing cached location.
    if (sizeAndId && arrayIndex < sizeAndId[0]) {
      arrayIndex += sizeAndId[1];
      // Add the base location of the uniform to the array index offset.
      if ((uniformLocsById[arrayIndex] = uniformLocsById[arrayIndex] || GLctx.getUniformLocation(program, name))) {
        return arrayIndex;
      }
    }
  } else {
    // N.b. we are currently unable to distinguish between GL program IDs that
    // never existed vs GL program IDs that have been deleted, so report
    // GL_INVALID_VALUE in both cases.
    GL.recordError(1281);
  }
  return -1;
};

var webglGetProgramUniformLocation = (program, location) => {
  if (program) {
    var webglLoc = program.uniformLocsById[location];
    // program.uniformLocsById[location] stores either an integer, or a
    // WebGLUniformLocation.
    // If an integer, we have not yet bound the location, so do it now. The
    // integer value specifies the array index we should bind to.
    if (typeof webglLoc === "number") {
      program.uniformLocsById[location] = webglLoc = GLctx.getUniformLocation(program, program.uniformArrayNamesById[location] + (webglLoc > 0 ? `[${webglLoc}]` : ""));
    }
    // Else an already cached WebGLUniformLocation, return it.
    return webglLoc;
  } else {
    GL.recordError(1282);
  }
};

/** @suppress{checkTypes} */ var emscriptenWebGLGetUniform = (program, location, params, type) => {
  if (!params) {
    // GLES2 specification does not specify how to behave if params is a null
    // pointer. Since calling this function does not make sense if params ==
    // null, issue a GL error to notify user about it.
    GL.recordError(1281);
    return;
  }
  program = GL.programs[program];
  webglPrepareUniformLocationsBeforeFirstUse(program);
  var data = GLctx.getUniform(program, webglGetProgramUniformLocation(program, location));
  if (typeof data === "number" || typeof data === "boolean") {
    switch (type) {
     case 0:
      HEAP32[((params) >> 2)] = data;
      break;

     case 2:
      HEAPF32[((params) >> 2)] = data;
      break;
    }
  } else {
    for (var i = 0; i < data.length; i++) {
      switch (type) {
       case 0:
        HEAP32[(((params) + (i * 4)) >> 2)] = data[i];
        break;

       case 2:
        HEAPF32[(((params) + (i * 4)) >> 2)] = data[i];
        break;
      }
    }
  }
};

var _emscripten_glGetUniformfv = (program, location, params) => {
  emscriptenWebGLGetUniform(program, location, params, 2);
};

var _emscripten_glGetUniformiv = (program, location, params) => {
  emscriptenWebGLGetUniform(program, location, params, 0);
};

var _emscripten_glGetVertexAttribPointerv = (index, pname, pointer) => {
  if (!pointer) {
    // GLES2 specification does not specify how to behave if pointer is a null
    // pointer. Since calling this function does not make sense if pointer ==
    // null, issue a GL error to notify user about it.
    GL.recordError(1281);
    return;
  }
  HEAP32[((pointer) >> 2)] = GLctx.getVertexAttribOffset(index, pname);
};

/** @suppress{checkTypes} */ var emscriptenWebGLGetVertexAttrib = (index, pname, params, type) => {
  if (!params) {
    // GLES2 specification does not specify how to behave if params is a null
    // pointer. Since calling this function does not make sense if params ==
    // null, issue a GL error to notify user about it.
    GL.recordError(1281);
    return;
  }
  var data = GLctx.getVertexAttrib(index, pname);
  if (pname == 34975) {
    HEAP32[((params) >> 2)] = data && data["name"];
  } else if (typeof data === "number" || typeof data === "boolean") {
    switch (type) {
     case 0:
      HEAP32[((params) >> 2)] = data;
      break;

     case 2:
      HEAPF32[((params) >> 2)] = data;
      break;

     case 5:
      HEAP32[((params) >> 2)] = Math.fround(data);
      break;
    }
  } else {
    for (var i = 0; i < data.length; i++) {
      switch (type) {
       case 0:
        HEAP32[(((params) + (i * 4)) >> 2)] = data[i];
        break;

       case 2:
        HEAPF32[(((params) + (i * 4)) >> 2)] = data[i];
        break;

       case 5:
        HEAP32[(((params) + (i * 4)) >> 2)] = Math.fround(data[i]);
        break;
      }
    }
  }
};

var _emscripten_glGetVertexAttribfv = (index, pname, params) => {
  // N.B. This function may only be called if the vertex attribute was
  // specified using the function glVertexAttrib*f(), otherwise the results
  // are undefined. (GLES3 spec 6.1.12)
  emscriptenWebGLGetVertexAttrib(index, pname, params, 2);
};

var _emscripten_glGetVertexAttribiv = (index, pname, params) => {
  // N.B. This function may only be called if the vertex attribute was
  // specified using the function glVertexAttrib*f(), otherwise the results
  // are undefined. (GLES3 spec 6.1.12)
  emscriptenWebGLGetVertexAttrib(index, pname, params, 5);
};

var _emscripten_glHint = (x0, x1) => GLctx.hint(x0, x1);

var _emscripten_glIsBuffer = buffer => {
  var b = GL.buffers[buffer];
  if (!b) return 0;
  return GLctx.isBuffer(b);
};

var _emscripten_glIsEnabled = x0 => GLctx.isEnabled(x0);

var _emscripten_glIsFramebuffer = framebuffer => {
  var fb = GL.framebuffers[framebuffer];
  if (!fb) return 0;
  return GLctx.isFramebuffer(fb);
};

var _emscripten_glIsProgram = program => {
  program = GL.programs[program];
  if (!program) return 0;
  return GLctx.isProgram(program);
};

var _emscripten_glIsQueryEXT = id => {
  var query = GL.queries[id];
  if (!query) return 0;
  return GLctx.disjointTimerQueryExt["isQueryEXT"](query);
};

var _emscripten_glIsRenderbuffer = renderbuffer => {
  var rb = GL.renderbuffers[renderbuffer];
  if (!rb) return 0;
  return GLctx.isRenderbuffer(rb);
};

var _emscripten_glIsShader = shader => {
  var s = GL.shaders[shader];
  if (!s) return 0;
  return GLctx.isShader(s);
};

var _emscripten_glIsTexture = id => {
  var texture = GL.textures[id];
  if (!texture) return 0;
  return GLctx.isTexture(texture);
};

var _emscripten_glIsVertexArray = array => {
  var vao = GL.vaos[array];
  if (!vao) return 0;
  return GLctx.isVertexArray(vao);
};

var _emscripten_glIsVertexArrayOES = _emscripten_glIsVertexArray;

var _emscripten_glLineWidth = x0 => GLctx.lineWidth(x0);

var _emscripten_glLinkProgram = program => {
  program = GL.programs[program];
  GLctx.linkProgram(program);
  // Invalidate earlier computed uniform->ID mappings, those have now become stale
  program.uniformLocsById = 0;
  // Mark as null-like so that glGetUniformLocation() knows to populate this again.
  program.uniformSizeAndIdsByName = {};
};

var _emscripten_glPixelStorei = (pname, param) => {
  if (pname == 3317) {
    GL.unpackAlignment = param;
  } else if (pname == 3314) {
    GL.unpackRowLength = param;
  }
  GLctx.pixelStorei(pname, param);
};

var _emscripten_glPolygonModeWEBGL = (face, mode) => {
  GLctx.webglPolygonMode["polygonModeWEBGL"](face, mode);
};

var _emscripten_glPolygonOffset = (x0, x1) => GLctx.polygonOffset(x0, x1);

var _emscripten_glPolygonOffsetClampEXT = (factor, units, clamp) => {
  GLctx.extPolygonOffsetClamp["polygonOffsetClampEXT"](factor, units, clamp);
};

var _emscripten_glQueryCounterEXT = (id, target) => {
  GLctx.disjointTimerQueryExt["queryCounterEXT"](GL.queries[id], target);
};

var computeUnpackAlignedImageSize = (width, height, sizePerPixel) => {
  function roundedToNextMultipleOf(x, y) {
    return (x + y - 1) & -y;
  }
  var plainRowSize = (GL.unpackRowLength || width) * sizePerPixel;
  var alignedRowSize = roundedToNextMultipleOf(plainRowSize, GL.unpackAlignment);
  return height * alignedRowSize;
};

var colorChannelsInGlTextureFormat = format => {
  // Micro-optimizations for size: map format to size by subtracting smallest
  // enum value (0x1902) from all values first.  Also omit the most common
  // size value (1) from the list, which is assumed by formats not on the
  // list.
  var colorChannels = {
    // 0x1902 /* GL_DEPTH_COMPONENT */ - 0x1902: 1,
    // 0x1906 /* GL_ALPHA */ - 0x1902: 1,
    5: 3,
    6: 4,
    // 0x1909 /* GL_LUMINANCE */ - 0x1902: 1,
    8: 2,
    29502: 3,
    29504: 4
  };
  return colorChannels[format - 6402] || 1;
};

/** @type {!Uint16Array} */ var HEAPU16;

var heapObjectForWebGLType = type => {
  // Micro-optimization for size: Subtract lowest GL enum number (0x1400/* GL_BYTE */) from type to compare
  // smaller values for the heap, for shorter generated code size.
  // Also the type HEAPU16 is not tested for explicitly, but any unrecognized type will return out HEAPU16.
  // (since most types are HEAPU16)
  type -= 5120;
  if (type == 1) return HEAPU8;
  if (type == 4) return HEAP32;
  if (type == 6) return HEAPF32;
  if (type == 5 || type == 28922) return HEAPU32;
  return HEAPU16;
};

var toTypedArrayIndex = (pointer, heap) => pointer >>> (31 - Math.clz32(heap.BYTES_PER_ELEMENT));

var emscriptenWebGLGetTexPixelData = (type, format, width, height, pixels) => {
  var heap = heapObjectForWebGLType(type);
  var sizePerPixel = colorChannelsInGlTextureFormat(format) * heap.BYTES_PER_ELEMENT;
  var bytes = computeUnpackAlignedImageSize(width, height, sizePerPixel);
  return heap.subarray(toTypedArrayIndex(pixels, heap), toTypedArrayIndex(pixels + bytes, heap));
};

var _emscripten_glReadPixels = (x, y, width, height, format, type, pixels) => {
  var pixelData = emscriptenWebGLGetTexPixelData(type, format, width, height, pixels);
  if (!pixelData) {
    GL.recordError(1280);
    return;
  }
  GLctx.readPixels(x, y, width, height, format, type, pixelData);
};

var _emscripten_glReleaseShaderCompiler = () => {};

var _emscripten_glRenderbufferStorage = (x0, x1, x2, x3) => GLctx.renderbufferStorage(x0, x1, x2, x3);

var _emscripten_glSampleCoverage = (value, invert) => {
  GLctx.sampleCoverage(value, !!invert);
};

var _emscripten_glScissor = (x0, x1, x2, x3) => GLctx.scissor(x0, x1, x2, x3);

var _emscripten_glShaderBinary = (count, shaders, binaryformat, binary, length) => {
  GL.recordError(1280);
};

var _emscripten_glShaderSource = (shader, count, string, length) => {
  var source = GL.getSource(shader, count, string, length);
  GLctx.shaderSource(GL.shaders[shader], source);
};

var _emscripten_glStencilFunc = (x0, x1, x2) => GLctx.stencilFunc(x0, x1, x2);

var _emscripten_glStencilFuncSeparate = (x0, x1, x2, x3) => GLctx.stencilFuncSeparate(x0, x1, x2, x3);

var _emscripten_glStencilMask = x0 => GLctx.stencilMask(x0);

var _emscripten_glStencilMaskSeparate = (x0, x1) => GLctx.stencilMaskSeparate(x0, x1);

var _emscripten_glStencilOp = (x0, x1, x2) => GLctx.stencilOp(x0, x1, x2);

var _emscripten_glStencilOpSeparate = (x0, x1, x2, x3) => GLctx.stencilOpSeparate(x0, x1, x2, x3);

var _emscripten_glTexImage2D = (target, level, internalFormat, width, height, border, format, type, pixels) => {
  var pixelData = pixels ? emscriptenWebGLGetTexPixelData(type, format, width, height, pixels) : null;
  GLctx.texImage2D(target, level, internalFormat, width, height, border, format, type, pixelData);
};

var _emscripten_glTexParameterf = (x0, x1, x2) => GLctx.texParameterf(x0, x1, x2);

var _emscripten_glTexParameterfv = (target, pname, params) => {
  var param = HEAPF32[((params) >> 2)];
  GLctx.texParameterf(target, pname, param);
};

var _emscripten_glTexParameteri = (x0, x1, x2) => GLctx.texParameteri(x0, x1, x2);

var _emscripten_glTexParameteriv = (target, pname, params) => {
  var param = HEAP32[((params) >> 2)];
  GLctx.texParameteri(target, pname, param);
};

var _emscripten_glTexSubImage2D = (target, level, xoffset, yoffset, width, height, format, type, pixels) => {
  var pixelData = pixels ? emscriptenWebGLGetTexPixelData(type, format, width, height, pixels) : null;
  GLctx.texSubImage2D(target, level, xoffset, yoffset, width, height, format, type, pixelData);
};

var webglGetUniformLocation = location => webglGetProgramUniformLocation(GLctx.currentProgram, location);

var _emscripten_glUniform1f = (location, v0) => {
  GLctx.uniform1f(webglGetUniformLocation(location), v0);
};

var miniTempWebGLFloatBuffers = [];

var _emscripten_glUniform1fv = (location, count, value) => {
  if (count <= 288) {
    // avoid allocation when uploading few enough uniforms
    var view = miniTempWebGLFloatBuffers[count];
    for (var i = 0; i < count; ++i) {
      view[i] = HEAPF32[(((value) + (4 * i)) >> 2)];
    }
  } else {
    var view = HEAPF32.subarray(((value) >> 2), ((value + count * 4) >> 2));
  }
  GLctx.uniform1fv(webglGetUniformLocation(location), view);
};

var _emscripten_glUniform1i = (location, v0) => {
  GLctx.uniform1i(webglGetUniformLocation(location), v0);
};

var miniTempWebGLIntBuffers = [];

var _emscripten_glUniform1iv = (location, count, value) => {
  if (count <= 288) {
    // avoid allocation when uploading few enough uniforms
    var view = miniTempWebGLIntBuffers[count];
    for (var i = 0; i < count; ++i) {
      view[i] = HEAP32[(((value) + (4 * i)) >> 2)];
    }
  } else {
    var view = HEAP32.subarray(((value) >> 2), ((value + count * 4) >> 2));
  }
  GLctx.uniform1iv(webglGetUniformLocation(location), view);
};

var _emscripten_glUniform2f = (location, v0, v1) => {
  GLctx.uniform2f(webglGetUniformLocation(location), v0, v1);
};

var _emscripten_glUniform2fv = (location, count, value) => {
  if (count <= 144) {
    // avoid allocation when uploading few enough uniforms
    count *= 2;
    var view = miniTempWebGLFloatBuffers[count];
    for (var i = 0; i < count; i += 2) {
      view[i] = HEAPF32[(((value) + (4 * i)) >> 2)];
      view[i + 1] = HEAPF32[(((value) + (4 * i + 4)) >> 2)];
    }
  } else {
    var view = HEAPF32.subarray(((value) >> 2), ((value + count * 8) >> 2));
  }
  GLctx.uniform2fv(webglGetUniformLocation(location), view);
};

var _emscripten_glUniform2i = (location, v0, v1) => {
  GLctx.uniform2i(webglGetUniformLocation(location), v0, v1);
};

var _emscripten_glUniform2iv = (location, count, value) => {
  if (count <= 144) {
    // avoid allocation when uploading few enough uniforms
    count *= 2;
    var view = miniTempWebGLIntBuffers[count];
    for (var i = 0; i < count; i += 2) {
      view[i] = HEAP32[(((value) + (4 * i)) >> 2)];
      view[i + 1] = HEAP32[(((value) + (4 * i + 4)) >> 2)];
    }
  } else {
    var view = HEAP32.subarray(((value) >> 2), ((value + count * 8) >> 2));
  }
  GLctx.uniform2iv(webglGetUniformLocation(location), view);
};

var _emscripten_glUniform3f = (location, v0, v1, v2) => {
  GLctx.uniform3f(webglGetUniformLocation(location), v0, v1, v2);
};

var _emscripten_glUniform3fv = (location, count, value) => {
  if (count <= 96) {
    // avoid allocation when uploading few enough uniforms
    count *= 3;
    var view = miniTempWebGLFloatBuffers[count];
    for (var i = 0; i < count; i += 3) {
      view[i] = HEAPF32[(((value) + (4 * i)) >> 2)];
      view[i + 1] = HEAPF32[(((value) + (4 * i + 4)) >> 2)];
      view[i + 2] = HEAPF32[(((value) + (4 * i + 8)) >> 2)];
    }
  } else {
    var view = HEAPF32.subarray(((value) >> 2), ((value + count * 12) >> 2));
  }
  GLctx.uniform3fv(webglGetUniformLocation(location), view);
};

var _emscripten_glUniform3i = (location, v0, v1, v2) => {
  GLctx.uniform3i(webglGetUniformLocation(location), v0, v1, v2);
};

var _emscripten_glUniform3iv = (location, count, value) => {
  if (count <= 96) {
    // avoid allocation when uploading few enough uniforms
    count *= 3;
    var view = miniTempWebGLIntBuffers[count];
    for (var i = 0; i < count; i += 3) {
      view[i] = HEAP32[(((value) + (4 * i)) >> 2)];
      view[i + 1] = HEAP32[(((value) + (4 * i + 4)) >> 2)];
      view[i + 2] = HEAP32[(((value) + (4 * i + 8)) >> 2)];
    }
  } else {
    var view = HEAP32.subarray(((value) >> 2), ((value + count * 12) >> 2));
  }
  GLctx.uniform3iv(webglGetUniformLocation(location), view);
};

var _emscripten_glUniform4f = (location, v0, v1, v2, v3) => {
  GLctx.uniform4f(webglGetUniformLocation(location), v0, v1, v2, v3);
};

var _emscripten_glUniform4fv = (location, count, value) => {
  if (count <= 72) {
    // avoid allocation when uploading few enough uniforms
    var view = miniTempWebGLFloatBuffers[4 * count];
    // hoist the heap out of the loop for size and for pthreads+growth.
    var heap = HEAPF32;
    value = ((value) >> 2);
    count *= 4;
    for (var i = 0; i < count; i += 4) {
      var dst = value + i;
      view[i] = heap[dst];
      view[i + 1] = heap[dst + 1];
      view[i + 2] = heap[dst + 2];
      view[i + 3] = heap[dst + 3];
    }
  } else {
    var view = HEAPF32.subarray(((value) >> 2), ((value + count * 16) >> 2));
  }
  GLctx.uniform4fv(webglGetUniformLocation(location), view);
};

var _emscripten_glUniform4i = (location, v0, v1, v2, v3) => {
  GLctx.uniform4i(webglGetUniformLocation(location), v0, v1, v2, v3);
};

var _emscripten_glUniform4iv = (location, count, value) => {
  if (count <= 72) {
    // avoid allocation when uploading few enough uniforms
    count *= 4;
    var view = miniTempWebGLIntBuffers[count];
    for (var i = 0; i < count; i += 4) {
      view[i] = HEAP32[(((value) + (4 * i)) >> 2)];
      view[i + 1] = HEAP32[(((value) + (4 * i + 4)) >> 2)];
      view[i + 2] = HEAP32[(((value) + (4 * i + 8)) >> 2)];
      view[i + 3] = HEAP32[(((value) + (4 * i + 12)) >> 2)];
    }
  } else {
    var view = HEAP32.subarray(((value) >> 2), ((value + count * 16) >> 2));
  }
  GLctx.uniform4iv(webglGetUniformLocation(location), view);
};

var _emscripten_glUniformMatrix2fv = (location, count, transpose, value) => {
  if (count <= 72) {
    // avoid allocation when uploading few enough uniforms
    count *= 4;
    var view = miniTempWebGLFloatBuffers[count];
    for (var i = 0; i < count; i += 4) {
      view[i] = HEAPF32[(((value) + (4 * i)) >> 2)];
      view[i + 1] = HEAPF32[(((value) + (4 * i + 4)) >> 2)];
      view[i + 2] = HEAPF32[(((value) + (4 * i + 8)) >> 2)];
      view[i + 3] = HEAPF32[(((value) + (4 * i + 12)) >> 2)];
    }
  } else {
    var view = HEAPF32.subarray(((value) >> 2), ((value + count * 16) >> 2));
  }
  GLctx.uniformMatrix2fv(webglGetUniformLocation(location), !!transpose, view);
};

var _emscripten_glUniformMatrix3fv = (location, count, transpose, value) => {
  if (count <= 32) {
    // avoid allocation when uploading few enough uniforms
    count *= 9;
    var view = miniTempWebGLFloatBuffers[count];
    for (var i = 0; i < count; i += 9) {
      view[i] = HEAPF32[(((value) + (4 * i)) >> 2)];
      view[i + 1] = HEAPF32[(((value) + (4 * i + 4)) >> 2)];
      view[i + 2] = HEAPF32[(((value) + (4 * i + 8)) >> 2)];
      view[i + 3] = HEAPF32[(((value) + (4 * i + 12)) >> 2)];
      view[i + 4] = HEAPF32[(((value) + (4 * i + 16)) >> 2)];
      view[i + 5] = HEAPF32[(((value) + (4 * i + 20)) >> 2)];
      view[i + 6] = HEAPF32[(((value) + (4 * i + 24)) >> 2)];
      view[i + 7] = HEAPF32[(((value) + (4 * i + 28)) >> 2)];
      view[i + 8] = HEAPF32[(((value) + (4 * i + 32)) >> 2)];
    }
  } else {
    var view = HEAPF32.subarray(((value) >> 2), ((value + count * 36) >> 2));
  }
  GLctx.uniformMatrix3fv(webglGetUniformLocation(location), !!transpose, view);
};

var _emscripten_glUniformMatrix4fv = (location, count, transpose, value) => {
  if (count <= 18) {
    // avoid allocation when uploading few enough uniforms
    var view = miniTempWebGLFloatBuffers[16 * count];
    // hoist the heap out of the loop for size and for pthreads+growth.
    var heap = HEAPF32;
    value = ((value) >> 2);
    count *= 16;
    for (var i = 0; i < count; i += 16) {
      var dst = value + i;
      view[i] = heap[dst];
      view[i + 1] = heap[dst + 1];
      view[i + 2] = heap[dst + 2];
      view[i + 3] = heap[dst + 3];
      view[i + 4] = heap[dst + 4];
      view[i + 5] = heap[dst + 5];
      view[i + 6] = heap[dst + 6];
      view[i + 7] = heap[dst + 7];
      view[i + 8] = heap[dst + 8];
      view[i + 9] = heap[dst + 9];
      view[i + 10] = heap[dst + 10];
      view[i + 11] = heap[dst + 11];
      view[i + 12] = heap[dst + 12];
      view[i + 13] = heap[dst + 13];
      view[i + 14] = heap[dst + 14];
      view[i + 15] = heap[dst + 15];
    }
  } else {
    var view = HEAPF32.subarray(((value) >> 2), ((value + count * 64) >> 2));
  }
  GLctx.uniformMatrix4fv(webglGetUniformLocation(location), !!transpose, view);
};

var _emscripten_glUseProgram = program => {
  program = GL.programs[program];
  GLctx.useProgram(program);
  // Record the currently active program so that we can access the uniform
  // mapping table of that program.
  GLctx.currentProgram = program;
};

var _emscripten_glValidateProgram = program => {
  GLctx.validateProgram(GL.programs[program]);
};

var _emscripten_glVertexAttrib1f = (x0, x1) => GLctx.vertexAttrib1f(x0, x1);

var _emscripten_glVertexAttrib1fv = (index, v) => {
  GLctx.vertexAttrib1f(index, HEAPF32[v >> 2]);
};

var _emscripten_glVertexAttrib2f = (x0, x1, x2) => GLctx.vertexAttrib2f(x0, x1, x2);

var _emscripten_glVertexAttrib2fv = (index, v) => {
  GLctx.vertexAttrib2f(index, HEAPF32[v >> 2], HEAPF32[v + 4 >> 2]);
};

var _emscripten_glVertexAttrib3f = (x0, x1, x2, x3) => GLctx.vertexAttrib3f(x0, x1, x2, x3);

var _emscripten_glVertexAttrib3fv = (index, v) => {
  GLctx.vertexAttrib3f(index, HEAPF32[v >> 2], HEAPF32[v + 4 >> 2], HEAPF32[v + 8 >> 2]);
};

var _emscripten_glVertexAttrib4f = (x0, x1, x2, x3, x4) => GLctx.vertexAttrib4f(x0, x1, x2, x3, x4);

var _emscripten_glVertexAttrib4fv = (index, v) => {
  GLctx.vertexAttrib4f(index, HEAPF32[v >> 2], HEAPF32[v + 4 >> 2], HEAPF32[v + 8 >> 2], HEAPF32[v + 12 >> 2]);
};

var _emscripten_glVertexAttribDivisor = (index, divisor) => {
  GLctx.vertexAttribDivisor(index, divisor);
};

var _emscripten_glVertexAttribDivisorANGLE = _emscripten_glVertexAttribDivisor;

var _emscripten_glVertexAttribPointer = (index, size, type, normalized, stride, ptr) => {
  GLctx.vertexAttribPointer(index, size, type, !!normalized, stride, ptr);
};

var _emscripten_glViewport = (x0, x1, x2, x3) => GLctx.viewport(x0, x1, x2, x3);

var _emscripten_has_asyncify = () => 0;

var doRequestFullscreen = (target, strategy) => {
  if (!JSEvents.fullscreenEnabled()) return -1;
  target = findEventTarget(target);
  if (!target) return -4;
  if (!target.requestFullscreen && !target.webkitRequestFullscreen) {
    return -3;
  }
  // Queue this function call if we're not currently in an event handler and
  // the user saw it appropriate to do so.
  if (!JSEvents.canPerformEventHandlerRequests()) {
    if (strategy.deferUntilInEventHandler) {
      JSEvents.deferCall(JSEvents_requestFullscreen, 1, [ target, strategy ]);
      return 1;
    }
    return -2;
  }
  return JSEvents_requestFullscreen(target, strategy);
};

var _emscripten_request_fullscreen_strategy = (target, deferUntilInEventHandler, fullscreenStrategy) => {
  var strategy = {
    scaleMode: HEAP32[((fullscreenStrategy) >> 2)],
    canvasResolutionScaleMode: HEAP32[(((fullscreenStrategy) + (4)) >> 2)],
    filteringMode: HEAP32[(((fullscreenStrategy) + (8)) >> 2)],
    deferUntilInEventHandler,
    canvasResizedCallback: HEAP32[(((fullscreenStrategy) + (12)) >> 2)],
    canvasResizedCallbackUserData: HEAP32[(((fullscreenStrategy) + (16)) >> 2)]
  };
  return doRequestFullscreen(target, strategy);
};

var _emscripten_request_pointerlock = (target, deferUntilInEventHandler) => {
  target = findEventTarget(target);
  if (!target) return -4;
  if (!target.requestPointerLock) {
    return -1;
  }
  // Queue this function call if we're not currently in an event handler and
  // the user saw it appropriate to do so.
  if (!JSEvents.canPerformEventHandlerRequests()) {
    if (deferUntilInEventHandler) {
      JSEvents.deferCall(requestPointerLock, 2, [ target ]);
      return 1;
    }
    return -2;
  }
  return requestPointerLock(target);
};

var alignMemory = (size, alignment) => {
  assert(alignment, "alignment argument is required");
  return Math.ceil(size / alignment) * alignment;
};

var growMemory = size => {
  var oldHeapSize = wasmMemory.buffer.byteLength;
  var pages = ((size - oldHeapSize + 65535) / 65536) | 0;
  try {
    // round size grow request up to wasm page size (fixed 64KB per spec)
    wasmMemory.grow(pages);
    // .grow() takes a delta compared to the previous size
    updateMemoryViews();
    return 1;
  } catch (e) {
    err(`growMemory: Attempted to grow heap from ${oldHeapSize} bytes to ${size} bytes, but got error: ${e}`);
  }
};

var _emscripten_resize_heap = requestedSize => {
  var oldSize = HEAPU8.length;
  // With CAN_ADDRESS_2GB or MEMORY64, pointers are already unsigned.
  requestedSize >>>= 0;
  // With multithreaded builds, races can happen (another thread might increase the size
  // in between), so return a failure, and let the caller retry.
  assert(requestedSize > oldSize);
  // Memory resize rules:
  // 1.  Always increase heap size to at least the requested size, rounded up
  //     to next page multiple.
  // 2a. If MEMORY_GROWTH_LINEAR_STEP == -1, excessively resize the heap
  //     geometrically: increase the heap size according to
  //     MEMORY_GROWTH_GEOMETRIC_STEP factor (default +20%), At most
  //     overreserve by MEMORY_GROWTH_GEOMETRIC_CAP bytes (default 96MB).
  // 2b. If MEMORY_GROWTH_LINEAR_STEP != -1, excessively resize the heap
  //     linearly: increase the heap size by at least
  //     MEMORY_GROWTH_LINEAR_STEP bytes.
  // 3.  Max size for the heap is capped at 2048MB-WASM_PAGE_SIZE, or by
  //     MAXIMUM_MEMORY, or by ASAN limit, depending on which is smallest
  // 4.  If we were unable to allocate as much memory, it may be due to
  //     over-eager decision to excessively reserve due to (3) above.
  //     Hence if an allocation fails, cut down on the amount of excess
  //     growth, in an attempt to succeed to perform a smaller allocation.
  // A limit is set for how much we can grow. We should not exceed that
  // (the wasm binary specifies it, so if we tried, we'd fail anyhow).
  var maxHeapSize = getHeapMax();
  if (requestedSize > maxHeapSize) {
    err(`Cannot enlarge memory, requested ${requestedSize} bytes, but the limit is ${maxHeapSize} bytes!`);
    return false;
  }
  // Loop through potential heap size increases. If we attempt a too eager
  // reservation that fails, cut down on the attempted size and reserve a
  // smaller bump instead. (max 3 times, chosen somewhat arbitrarily)
  for (var cutDown = 1; cutDown <= 4; cutDown *= 2) {
    var overGrownHeapSize = oldSize * (1 + .2 / cutDown);
    // ensure geometric growth
    // but limit overreserving (default to capping at +96MB overgrowth at most)
    overGrownHeapSize = Math.min(overGrownHeapSize, requestedSize + 100663296);
    var newSize = Math.min(maxHeapSize, alignMemory(Math.max(requestedSize, overGrownHeapSize), 65536));
    var replacement = growMemory(newSize);
    if (replacement) {
      return true;
    }
  }
  err(`Failed to grow the heap from ${oldSize} bytes to ${newSize} bytes, not enough memory!`);
  return false;
};

/** not-@type {!BigUint64Array} */ var HEAPU64;

var _emscripten_run_script = ptr => {
  eval(UTF8ToString(ptr));
};

/** @suppress {checkTypes} */ var _emscripten_sample_gamepad_data = () => {
  try {
    if (navigator.getGamepads) return (JSEvents.lastGamepadState = navigator.getGamepads()) ? 0 : -1;
  } catch (e) {
    err(`navigator.getGamepads() exists, but failed to execute with exception ${e}. Disabling Gamepad access.`);
    navigator.getGamepads = null;
  }
  return -1;
};

var registerBeforeUnloadEventCallback = (target, userData, useCapture, callbackfunc, eventTypeId, eventTypeString) => {
  var beforeUnloadEventHandlerFunc = e => {
    // Note: This is always called on the main browser thread, since it needs synchronously return a value!
    var confirmationMessage = getWasmTableEntry(callbackfunc)(eventTypeId, 0, userData);
    if (confirmationMessage) {
      confirmationMessage = UTF8ToString(confirmationMessage);
    }
    if (confirmationMessage) {
      e.preventDefault();
      e.returnValue = confirmationMessage;
      return confirmationMessage;
    }
  };
  var eventHandler = {
    target: findEventTarget(target),
    eventTypeString,
    eventTypeId,
    userData,
    callbackfunc,
    handlerFunc: beforeUnloadEventHandlerFunc,
    useCapture
  };
  return JSEvents.registerOrRemoveHandler(eventHandler);
};

var _emscripten_set_beforeunload_callback_on_thread = (userData, callbackfunc, targetThread) => {
  if (typeof onbeforeunload === "undefined") return -1;
  // beforeunload callback can only be registered on the main browser thread, because the page will go away immediately after returning from the handler,
  // and there is no time to start proxying it anywhere.
  if (targetThread !== 1) return -5;
  return registerBeforeUnloadEventCallback(2, userData, true, callbackfunc, 28, "beforeunload");
};

var registerFocusEventCallback = (target, userData, useCapture, callbackfunc, eventTypeId, eventTypeString, targetThread) => {
  const eventSize = 256;
  JSEvents.focusEvent ||= _malloc(eventSize);
  var focusEventHandlerFunc = e => {
    var nodeName = JSEvents.getNodeNameForTarget(e.target);
    var id = e.target.id ?? "";
    var focusEvent = JSEvents.focusEvent;
    stringToUTF8(nodeName, focusEvent + 0, 128);
    stringToUTF8(id, focusEvent + 128, 128);
    if (getWasmTableEntry(callbackfunc)(eventTypeId, focusEvent, userData)) e.preventDefault();
  };
  var eventHandler = {
    target: findEventTarget(target),
    eventTypeString,
    eventTypeId,
    userData,
    callbackfunc,
    handlerFunc: focusEventHandlerFunc,
    useCapture
  };
  return JSEvents.registerOrRemoveHandler(eventHandler);
};

var _emscripten_set_blur_callback_on_thread = (target, userData, useCapture, callbackfunc, targetThread) => registerFocusEventCallback(target, userData, useCapture, callbackfunc, 12, "blur", targetThread);

var fillDeviceMotionEventData = (eventStruct, e, target) => {
  var a = e.acceleration;
  var ag = e.accelerationIncludingGravity;
  var rr = e.rotationRate;
  var supportedFields = 0;
  supportedFields |= a && 1;
  supportedFields |= ag && 2;
  supportedFields |= rr && 4;
  HEAP32[(((eventStruct) + (72)) >> 2)] = supportedFields;
  HEAPF64[((eventStruct) >> 3)] = a?.x;
  HEAPF64[(((eventStruct) + (8)) >> 3)] = a?.y;
  HEAPF64[(((eventStruct) + (16)) >> 3)] = a?.z;
  HEAPF64[(((eventStruct) + (24)) >> 3)] = ag?.x;
  HEAPF64[(((eventStruct) + (32)) >> 3)] = ag?.y;
  HEAPF64[(((eventStruct) + (40)) >> 3)] = ag?.z;
  HEAPF64[(((eventStruct) + (48)) >> 3)] = rr?.alpha;
  HEAPF64[(((eventStruct) + (56)) >> 3)] = rr?.beta;
  HEAPF64[(((eventStruct) + (64)) >> 3)] = rr?.gamma;
};

var registerDeviceMotionEventCallback = (target, userData, useCapture, callbackfunc, eventTypeId, eventTypeString, targetThread) => {
  const eventSize = 80;
  JSEvents.deviceMotionEvent ||= _malloc(eventSize);
  var deviceMotionEventHandlerFunc = e => {
    fillDeviceMotionEventData(JSEvents.deviceMotionEvent, e, target);
    // TODO: Thread-safety with respect to emscripten_get_devicemotion_status()
    if (getWasmTableEntry(callbackfunc)(eventTypeId, JSEvents.deviceMotionEvent, userData)) e.preventDefault();
  };
  var eventHandler = {
    target: findEventTarget(target),
    eventTypeString,
    eventTypeId,
    userData,
    callbackfunc,
    handlerFunc: deviceMotionEventHandlerFunc,
    useCapture
  };
  return JSEvents.registerOrRemoveHandler(eventHandler);
};

var _emscripten_set_devicemotion_callback_on_thread = (userData, useCapture, callbackfunc, targetThread) => registerDeviceMotionEventCallback(2, userData, useCapture, callbackfunc, 17, "devicemotion", targetThread);

var _emscripten_set_element_css_size = (target, width, height) => {
  target = findEventTarget(target);
  if (!target) return -4;
  target.style.width = width + "px";
  target.style.height = height + "px";
  return 0;
};

var _emscripten_set_focus_callback_on_thread = (target, userData, useCapture, callbackfunc, targetThread) => registerFocusEventCallback(target, userData, useCapture, callbackfunc, 13, "focus", targetThread);

var registerFullscreenChangeEventCallback = (target, userData, useCapture, callbackfunc, eventTypeId, eventTypeString, targetThread) => {
  const eventSize = 276;
  JSEvents.fullscreenChangeEvent ||= _malloc(eventSize);
  var fullscreenChangeEventHandlerFunc = e => {
    var fullscreenChangeEvent = JSEvents.fullscreenChangeEvent;
    fillFullscreenChangeEventData(fullscreenChangeEvent);
    if (getWasmTableEntry(callbackfunc)(eventTypeId, fullscreenChangeEvent, userData)) e.preventDefault();
  };
  var eventHandler = {
    target,
    eventTypeString,
    eventTypeId,
    userData,
    callbackfunc,
    handlerFunc: fullscreenChangeEventHandlerFunc,
    useCapture
  };
  return JSEvents.registerOrRemoveHandler(eventHandler);
};

var _emscripten_set_fullscreenchange_callback_on_thread = (target, userData, useCapture, callbackfunc, targetThread) => {
  if (!JSEvents.fullscreenEnabled()) return -1;
  target = findEventTarget(target);
  if (!target) return -4;
  // TODO: When this block is removed, also change test/test_html5_remove_event_listener.c test expectation on emscripten_set_fullscreenchange_callback().
  registerFullscreenChangeEventCallback(target, userData, useCapture, callbackfunc, 19, "webkitfullscreenchange", targetThread);
  return registerFullscreenChangeEventCallback(target, userData, useCapture, callbackfunc, 19, "fullscreenchange", targetThread);
};

var registerGamepadEventCallback = (target, userData, useCapture, callbackfunc, eventTypeId, eventTypeString, targetThread) => {
  const eventSize = 1240;
  JSEvents.gamepadEvent ||= _malloc(eventSize);
  var gamepadEventHandlerFunc = e => {
    var gamepadEvent = JSEvents.gamepadEvent;
    fillGamepadEventData(gamepadEvent, e["gamepad"]);
    if (getWasmTableEntry(callbackfunc)(eventTypeId, gamepadEvent, userData)) e.preventDefault();
  };
  var eventHandler = {
    target: findEventTarget(target),
    allowsDeferredCalls: true,
    eventTypeString,
    eventTypeId,
    userData,
    callbackfunc,
    handlerFunc: gamepadEventHandlerFunc,
    useCapture
  };
  return JSEvents.registerOrRemoveHandler(eventHandler);
};

var _emscripten_set_gamepadconnected_callback_on_thread = (userData, useCapture, callbackfunc, targetThread) => {
  if (_emscripten_sample_gamepad_data()) return -1;
  return registerGamepadEventCallback(2, userData, useCapture, callbackfunc, 26, "gamepadconnected", targetThread);
};

var _emscripten_set_gamepaddisconnected_callback_on_thread = (userData, useCapture, callbackfunc, targetThread) => {
  if (_emscripten_sample_gamepad_data()) return -1;
  return registerGamepadEventCallback(2, userData, useCapture, callbackfunc, 27, "gamepaddisconnected", targetThread);
};

var registerKeyEventCallback = (target, userData, useCapture, callbackfunc, eventTypeId, eventTypeString, targetThread) => {
  const eventSize = 160;
  JSEvents.keyEvent ||= _malloc(eventSize);
  var keyEventHandlerFunc = e => {
    assert(e);
    var keyEventData = JSEvents.keyEvent;
    HEAPF64[((keyEventData) >> 3)] = e.timeStamp;
    var idx = ((keyEventData) >> 2);
    HEAP32[idx + 2] = e.location;
    HEAP8[keyEventData + 12] = e.ctrlKey;
    HEAP8[keyEventData + 13] = e.shiftKey;
    HEAP8[keyEventData + 14] = e.altKey;
    HEAP8[keyEventData + 15] = e.metaKey;
    HEAP8[keyEventData + 16] = e.repeat;
    HEAP32[idx + 5] = e.charCode;
    HEAP32[idx + 6] = e.keyCode;
    HEAP32[idx + 7] = e.which;
    stringToUTF8(e.key ?? "", keyEventData + 32, 32);
    stringToUTF8(e.code ?? "", keyEventData + 64, 32);
    stringToUTF8(e.char ?? "", keyEventData + 96, 32);
    stringToUTF8(e.locale ?? "", keyEventData + 128, 32);
    if (getWasmTableEntry(callbackfunc)(eventTypeId, keyEventData, userData)) e.preventDefault();
  };
  var eventHandler = {
    target: findEventTarget(target),
    eventTypeString,
    eventTypeId,
    userData,
    callbackfunc,
    handlerFunc: keyEventHandlerFunc,
    useCapture
  };
  return JSEvents.registerOrRemoveHandler(eventHandler);
};

var _emscripten_set_keydown_callback_on_thread = (target, userData, useCapture, callbackfunc, targetThread) => registerKeyEventCallback(target, userData, useCapture, callbackfunc, 2, "keydown", targetThread);

var _emscripten_set_keypress_callback_on_thread = (target, userData, useCapture, callbackfunc, targetThread) => registerKeyEventCallback(target, userData, useCapture, callbackfunc, 1, "keypress", targetThread);

var _emscripten_set_keyup_callback_on_thread = (target, userData, useCapture, callbackfunc, targetThread) => registerKeyEventCallback(target, userData, useCapture, callbackfunc, 3, "keyup", targetThread);

var _emscripten_set_main_loop = (func, fps, simulateInfiniteLoop) => {
  var iterFunc = getWasmTableEntry(func);
  setMainLoop(iterFunc, fps, simulateInfiniteLoop);
};

var screenOrientation = () => window.screen?.orientation;

var fillOrientationChangeEventData = eventStruct => {
  // OrientationType enum
  var orientationsType1 = [ "portrait-primary", "portrait-secondary", "landscape-primary", "landscape-secondary" ];
  // alternative selection from OrientationLockType enum
  var orientationsType2 = [ "portrait", "portrait", "landscape", "landscape" ];
  var orientationIndex = 0;
  var orientationAngle = 0;
  var screenOrientObj = screenOrientation();
  if (screenOrientObj) {
    orientationIndex = orientationsType1.indexOf(screenOrientObj.type);
    if (orientationIndex < 0) {
      orientationIndex = orientationsType2.indexOf(screenOrientObj.type);
    }
    if (orientationIndex >= 0) {
      orientationIndex = 1 << orientationIndex;
    }
    orientationAngle = screenOrientObj.angle;
  } else {
    // fallback for Safari earlier than 16.4 (March 2023)
    orientationAngle = window.orientation;
  }
  HEAP32[((eventStruct) >> 2)] = orientationIndex;
  HEAP32[(((eventStruct) + (4)) >> 2)] = orientationAngle;
};

var registerOrientationChangeEventCallback = (target, userData, useCapture, callbackfunc, eventTypeId, eventTypeString, targetThread) => {
  const eventSize = 8;
  JSEvents.orientationChangeEvent ||= _malloc(eventSize);
  var orientationChangeEventHandlerFunc = e => {
    var orientationChangeEvent = JSEvents.orientationChangeEvent;
    fillOrientationChangeEventData(orientationChangeEvent);
    if (getWasmTableEntry(callbackfunc)(eventTypeId, orientationChangeEvent, userData)) e.preventDefault();
  };
  var eventHandler = {
    target,
    eventTypeString,
    eventTypeId,
    userData,
    callbackfunc,
    handlerFunc: orientationChangeEventHandlerFunc,
    useCapture
  };
  return JSEvents.registerOrRemoveHandler(eventHandler);
};

var _emscripten_set_orientationchange_callback_on_thread = (userData, useCapture, callbackfunc, targetThread) => {
  if (!window.screen || !screen.orientation) return -1;
  return registerOrientationChangeEventCallback(screen.orientation, userData, useCapture, callbackfunc, 18, "change", targetThread);
};

var fillPointerlockChangeEventData = eventStruct => {
  var pointerLockElement = document.pointerLockElement;
  var isPointerlocked = !!pointerLockElement;
  // Assigning a boolean to HEAP32 with expected type coercion.
  /** @suppress{checkTypes} */ HEAP8[eventStruct] = isPointerlocked;
  var nodeName = JSEvents.getNodeNameForTarget(pointerLockElement);
  var id = pointerLockElement?.id ?? "";
  stringToUTF8(nodeName, eventStruct + 1, 128);
  stringToUTF8(id, eventStruct + 129, 128);
};

var registerPointerlockChangeEventCallback = (target, userData, useCapture, callbackfunc, eventTypeId, eventTypeString, targetThread) => {
  const eventSize = 257;
  JSEvents.pointerlockChangeEvent ||= _malloc(eventSize);
  var pointerlockChangeEventHandlerFunc = e => {
    var pointerlockChangeEvent = JSEvents.pointerlockChangeEvent;
    fillPointerlockChangeEventData(pointerlockChangeEvent);
    if (getWasmTableEntry(callbackfunc)(eventTypeId, pointerlockChangeEvent, userData)) e.preventDefault();
  };
  var eventHandler = {
    target,
    eventTypeString,
    eventTypeId,
    userData,
    callbackfunc,
    handlerFunc: pointerlockChangeEventHandlerFunc,
    useCapture
  };
  return JSEvents.registerOrRemoveHandler(eventHandler);
};

var _emscripten_set_pointerlockchange_callback_on_thread = (target, userData, useCapture, callbackfunc, targetThread) => {
  if (!document.body?.requestPointerLock) {
    return -1;
  }
  target = findEventTarget(target);
  if (!target) return -4;
  return registerPointerlockChangeEventCallback(target, userData, useCapture, callbackfunc, 20, "pointerlockchange", targetThread);
};

var registerUiEventCallback = (target, userData, useCapture, callbackfunc, eventTypeId, eventTypeString, targetThread) => {
  const eventSize = 36;
  JSEvents.uiEvent ||= _malloc(eventSize);
  target = findEventTarget(target);
  var uiEventHandlerFunc = e => {
    if (e.target != target) {
      // Never take ui events such as scroll via a 'bubbled' route, but always from the direct element that
      // was targeted. Otherwise e.g. if app logs a message in response to a page scroll, the Emscripten log
      // message box could cause to scroll, generating a new (bubbled) scroll message, causing a new log print,
      // causing a new scroll, etc..
      return;
    }
    var b = document.body;
    // Take document.body to a variable, Closure compiler does not outline access to it on its own.
    if (!b) {
      // During a page unload 'body' can be null, with "Cannot read property 'clientWidth' of null" being thrown
      return;
    }
    var uiEvent = JSEvents.uiEvent;
    HEAP32[((uiEvent) >> 2)] = 0;
    // always zero for resize and scroll
    HEAP32[(((uiEvent) + (4)) >> 2)] = b.clientWidth;
    HEAP32[(((uiEvent) + (8)) >> 2)] = b.clientHeight;
    HEAP32[(((uiEvent) + (12)) >> 2)] = innerWidth;
    HEAP32[(((uiEvent) + (16)) >> 2)] = innerHeight;
    HEAP32[(((uiEvent) + (20)) >> 2)] = outerWidth;
    HEAP32[(((uiEvent) + (24)) >> 2)] = outerHeight;
    HEAP32[(((uiEvent) + (28)) >> 2)] = pageXOffset | 0;
    // scroll offsets are float
    HEAP32[(((uiEvent) + (32)) >> 2)] = pageYOffset | 0;
    if (getWasmTableEntry(callbackfunc)(eventTypeId, uiEvent, userData)) e.preventDefault();
  };
  var eventHandler = {
    target,
    eventTypeString,
    eventTypeId,
    userData,
    callbackfunc,
    handlerFunc: uiEventHandlerFunc,
    useCapture
  };
  return JSEvents.registerOrRemoveHandler(eventHandler);
};

var _emscripten_set_resize_callback_on_thread = (target, userData, useCapture, callbackfunc, targetThread) => registerUiEventCallback(target, userData, useCapture, callbackfunc, 10, "resize", targetThread);

var fillVisibilityChangeEventData = eventStruct => {
  var visibilityStates = [ "hidden", "visible", "prerender", "unloaded" ];
  var visibilityState = visibilityStates.indexOf(document.visibilityState);
  // Assigning a boolean to HEAP32 with expected type coercion.
  /** @suppress{checkTypes} */ HEAP8[eventStruct] = document.hidden;
  HEAP32[(((eventStruct) + (4)) >> 2)] = visibilityState;
};

var registerVisibilityChangeEventCallback = (target, userData, useCapture, callbackfunc, eventTypeId, eventTypeString, targetThread) => {
  const eventSize = 8;
  JSEvents.visibilityChangeEvent ||= _malloc(eventSize);
  var visibilityChangeEventHandlerFunc = e => {
    var visibilityChangeEvent = JSEvents.visibilityChangeEvent;
    fillVisibilityChangeEventData(visibilityChangeEvent);
    if (getWasmTableEntry(callbackfunc)(eventTypeId, visibilityChangeEvent, userData)) e.preventDefault();
  };
  var eventHandler = {
    target,
    eventTypeString,
    eventTypeId,
    userData,
    callbackfunc,
    handlerFunc: visibilityChangeEventHandlerFunc,
    useCapture
  };
  return JSEvents.registerOrRemoveHandler(eventHandler);
};

var _emscripten_set_visibilitychange_callback_on_thread = (userData, useCapture, callbackfunc, targetThread) => registerVisibilityChangeEventCallback(specialHTMLTargets[1], userData, useCapture, callbackfunc, 21, "visibilitychange", targetThread);

var fillMouseEventData = (eventStruct, e, target) => {
  assert(eventStruct % 4 == 0);
  HEAPF64[((eventStruct) >> 3)] = e.timeStamp;
  var idx = ((eventStruct) >> 2);
  HEAP32[idx + 2] = e.screenX;
  HEAP32[idx + 3] = e.screenY;
  HEAP32[idx + 4] = e.clientX;
  HEAP32[idx + 5] = e.clientY;
  HEAP8[eventStruct + 24] = e.ctrlKey;
  HEAP8[eventStruct + 25] = e.shiftKey;
  HEAP8[eventStruct + 26] = e.altKey;
  HEAP8[eventStruct + 27] = e.metaKey;
  HEAP16[idx * 2 + 14] = e.button;
  HEAP16[idx * 2 + 15] = e.buttons;
  HEAP32[idx + 8] = e.movementX;
  HEAP32[idx + 9] = e.movementY;
  // Note: rect contains doubles (truncated to placate SAFE_HEAP, which is the same behaviour when writing to HEAP32 anyway)
  var rect = getBoundingClientRect(target);
  HEAP32[idx + 10] = e.clientX - (rect.left | 0);
  HEAP32[idx + 11] = e.clientY - (rect.top | 0);
};

var registerWheelEventCallback = (target, userData, useCapture, callbackfunc, eventTypeId, eventTypeString, targetThread) => {
  const eventSize = 96;
  JSEvents.wheelEvent ||= _malloc(eventSize);
  // The DOM Level 3 events spec event 'wheel'
  var wheelHandlerFunc = e => {
    var wheelEvent = JSEvents.wheelEvent;
    fillMouseEventData(wheelEvent, e, target);
    HEAPF64[(((wheelEvent) + (64)) >> 3)] = e["deltaX"];
    HEAPF64[(((wheelEvent) + (72)) >> 3)] = e["deltaY"];
    HEAPF64[(((wheelEvent) + (80)) >> 3)] = e["deltaZ"];
    HEAP32[(((wheelEvent) + (88)) >> 2)] = e["deltaMode"];
    if (getWasmTableEntry(callbackfunc)(eventTypeId, wheelEvent, userData)) e.preventDefault();
  };
  var eventHandler = {
    target,
    allowsDeferredCalls: true,
    eventTypeString,
    eventTypeId,
    userData,
    callbackfunc,
    handlerFunc: wheelHandlerFunc,
    useCapture
  };
  return JSEvents.registerOrRemoveHandler(eventHandler);
};

var _emscripten_set_wheel_callback_on_thread = (target, userData, useCapture, callbackfunc, targetThread) => {
  target = findEventTarget(target);
  if (!target) return -4;
  if (typeof target.onwheel !== "undefined") {
    return registerWheelEventCallback(target, userData, useCapture, callbackfunc, 9, "wheel", targetThread);
  } else {
    return -1;
  }
};

var _emscripten_set_window_title = title => document.title = UTF8ToString(title);

var _emscripten_sleep = () => {
  abort("Please compile your program with async support in order to use asynchronous operations like emscripten_sleep");
};

var webglPowerPreferences = [ "default", "low-power", "high-performance" ];

var _emscripten_webgl_do_create_context = (target, attributes) => {
  assert(attributes);
  var attr32 = ((attributes) >> 2);
  var powerPreference = HEAP32[attr32 + (8 >> 2)];
  var contextAttributes = {
    "alpha": !!HEAP8[attributes + 0],
    "depth": !!HEAP8[attributes + 1],
    "stencil": !!HEAP8[attributes + 2],
    "antialias": !!HEAP8[attributes + 3],
    "premultipliedAlpha": !!HEAP8[attributes + 4],
    "preserveDrawingBuffer": !!HEAP8[attributes + 5],
    "powerPreference": webglPowerPreferences[powerPreference],
    "failIfMajorPerformanceCaveat": !!HEAP8[attributes + 12],
    "desynchronized": !!HEAP8[attributes + 33],
    // The following are not predefined WebGL context attributes in the WebGL specification, so the property names can be minified by Closure.
    majorVersion: HEAP32[attr32 + (16 >> 2)],
    minorVersion: HEAP32[attr32 + (20 >> 2)],
    enableExtensionsByDefault: HEAP8[attributes + 24],
    explicitSwapControl: HEAP8[attributes + 25],
    proxyContextToMainThread: HEAP32[attr32 + (28 >> 2)],
    renderViaOffscreenBackBuffer: HEAP8[attributes + 32]
  };
  //  TODO: Make these into hard errors at some point in the future
  if (contextAttributes.majorVersion !== 1 && contextAttributes.majorVersion !== 2) {
    err(`Invalid WebGL version requested: ${contextAttributes.majorVersion}`);
  }
  if (contextAttributes.majorVersion !== 1) {
    err("WebGL 2 requested but only WebGL 1 is supported (set -sMAX_WEBGL_VERSION=2 to fix the problem)");
  }
  var canvas = findCanvasEventTarget(target);
  if (!canvas) {
    return 0;
  }
  if (contextAttributes.explicitSwapControl) {
    return 0;
  }
  var contextHandle = GL.createContext(canvas, contextAttributes);
  return contextHandle;
};

var _emscripten_webgl_create_context = _emscripten_webgl_do_create_context;

var _emscripten_webgl_do_destroy_context = contextHandle => {
  if (GL.currentContext == contextHandle) GL.currentContext = 0;
  GL.deleteContext(contextHandle);
};

var _emscripten_webgl_destroy_context = _emscripten_webgl_do_destroy_context;

var _emscripten_webgl_make_context_current = contextHandle => {
  var success = GL.makeContextCurrent(contextHandle);
  return success ? 0 : -5;
};

class HandleAllocator {
  allocated=[ undefined ];
  freelist=[];
  get(id) {
    assert(this.allocated[id] !== undefined, `invalid handle: ${id}`);
    return this.allocated[id];
  }
  has(id) {
    return this.allocated[id] !== undefined;
  }
  allocate(handle) {
    var id = this.freelist.pop() ?? this.allocated.length;
    this.allocated[id] = handle;
    return id;
  }
  free(id) {
    assert(this.allocated[id] !== undefined);
    // Set the slot to `undefined` rather than using `delete` here since
    // apparently arrays with holes in them can be less efficient.
    this.allocated[id] = undefined;
    this.freelist.push(id);
  }
}

var webSockets = new HandleAllocator;

var WS = {
  socketEvent: null,
  getSocket(socketId) {
    if (!webSockets.has(socketId)) {
      return 0;
    }
    return webSockets.get(socketId);
  },
  getSocketEvent(socketId) {
    // Singleton event pointer.  Use EmscriptenWebSocketCloseEvent, which is
    // the largest event struct
    WS.socketEvent ||= _malloc(520);
    HEAPU32[((WS.socketEvent) >> 2)] = socketId;
    return WS.socketEvent;
  }
};

var _emscripten_websocket_close = (socketId, code, reason) => {
  var socket = WS.getSocket(socketId);
  if (!socket) {
    return -3;
  }
  var reasonStr = reason ? UTF8ToString(reason) : undefined;
  // According to WebSocket specification, only close codes that are recognized have integer values
  // 1000-4999, with 3000-3999 and 4000-4999 denoting user-specified close codes:
  // https://developer.mozilla.org/en-US/docs/Web/API/CloseEvent#Status_codes
  // Therefore be careful to call the .close() function with exact number and types of parameters.
  // Coerce code==0 to undefined, since Wasm->JS call can only marshal integers, and 0 is not allowed.
  if (reason) socket.close(code || undefined, UTF8ToString(reason)); else if (code) socket.close(code); else socket.close();
  return 0;
};

var _emscripten_websocket_delete = socketId => {
  var socket = WS.getSocket(socketId);
  if (!socket) {
    return -3;
  }
  socket.onopen = socket.onerror = socket.onclose = socket.onmessage = null;
  webSockets.free(socketId);
  return 0;
};

var _emscripten_websocket_get_buffered_amount = (socketId, bufferedAmount) => {
  var socket = WS.getSocket(socketId);
  if (!socket) {
    return -3;
  }
  HEAPU32[((bufferedAmount) >> 2)] = socket.bufferedAmount;
  return 0;
};

var _emscripten_websocket_is_supported = () => typeof WebSocket !== "undefined";

var _emscripten_websocket_new = createAttributes => {
  if (!globalThis.WebSocket) {
    return -1;
  }
  if (!createAttributes) {
    return -5;
  }
  var url = UTF8ToString(HEAPU32[((createAttributes) >> 2)]);
  var protocols = HEAPU32[(((createAttributes) + (4)) >> 2)];
  // TODO: Add support for createOnMainThread==false; currently all WebSocket connections are created on the main thread.
  // var createOnMainThread = HEAP8[createAttributes+2];
  var socket = protocols ? new WebSocket(url, UTF8ToString(protocols).split(",")) : new WebSocket(url);
  // We always marshal received WebSocket data back to Wasm, so enable receiving the data as arraybuffers for easy marshalling.
  socket.binaryType = "arraybuffer";
  // TODO: While strictly not necessary, this ID would be good to be unique across all threads to avoid confusion.
  var socketId = webSockets.allocate(socket);
  return socketId;
};

var _emscripten_websocket_send_binary = (socketId, binaryData, dataLength) => {
  var socket = WS.getSocket(socketId);
  if (!socket) {
    return -3;
  }
  socket.send(HEAPU8.subarray(binaryData, binaryData + dataLength));
  return 0;
};

var _emscripten_websocket_set_onclose_callback_on_thread = (socketId, userData, callbackFunc, thread) => {
  var socket = WS.getSocket(socketId);
  if (!socket) {
    return -3;
  }
  socket.onclose = e => {
    var eventPtr = WS.getSocketEvent(socketId);
    HEAP8[(eventPtr) + (4)] = e.wasClean, HEAP16[(((eventPtr) + (6)) >> 1)] = e.code, 
    stringToUTF8(e.reason, eventPtr + 8, 512);
    getWasmTableEntry(callbackFunc)(0, eventPtr, userData);
  };
  return 0;
};

var _emscripten_websocket_set_onerror_callback_on_thread = (socketId, userData, callbackFunc, thread) => {
  var socket = WS.getSocket(socketId);
  if (!socket) {
    return -3;
  }
  socket.onerror = e => {
    var eventPtr = WS.getSocketEvent(socketId);
    getWasmTableEntry(callbackFunc)(0, eventPtr, userData);
  };
  return 0;
};

var _emscripten_websocket_set_onmessage_callback_on_thread = (socketId, userData, callbackFunc, thread) => {
  var socket = WS.getSocket(socketId);
  if (!socket) {
    return -3;
  }
  socket.onmessage = e => {
    var isText = typeof e.data === "string";
    if (isText) {
      var buf = stringToNewUTF8(e.data);
      var len = lengthBytesUTF8(e.data) + 1;
    } else {
      var len = e.data.byteLength;
      var buf = _malloc(len);
      HEAP8.set(new Uint8Array(e.data), buf);
    }
    var eventPtr = WS.getSocketEvent(socketId);
    HEAPU32[(((eventPtr) + (4)) >> 2)] = buf, HEAP32[(((eventPtr) + (8)) >> 2)] = len, 
    HEAP8[(eventPtr) + (12)] = isText, getWasmTableEntry(callbackFunc)(0, eventPtr, userData);
    _free(buf);
  };
  return 0;
};

var _emscripten_websocket_set_onopen_callback_on_thread = (socketId, userData, callbackFunc, thread) => {
  // TODO:
  //    if (thread == 2 ||
  //      (thread == _pthread_self()) return emscripten_websocket_set_onopen_callback_on_calling_thread(socketId, userData, callbackFunc);
  var socket = WS.getSocket(socketId);
  if (!socket) {
    return -3;
  }
  socket.onopen = e => {
    var eventPtr = WS.getSocketEvent(socketId);
    getWasmTableEntry(callbackFunc)(0, eventPtr, userData);
  };
  return 0;
};

var ENV = {};

var getExecutableName = () => thisProgram;

var getEnvStrings = () => {
  if (!getEnvStrings.strings) {
    // Default values.
    var lang = (globalThis.navigator?.language ?? "C").replace("-", "_") + ".UTF-8";
    var env = {
      "USER": "web_user",
      "LOGNAME": "web_user",
      "PATH": "/",
      "PWD": "/",
      "HOME": "/home/web_user",
      "LANG": lang,
      "_": getExecutableName()
    };
    // Apply the user-provided values, if any.
    for (var x in ENV) {
      // x is a key in ENV; if ENV[x] is undefined, that means it was
      // explicitly set to be so. We allow user code to do that to
      // force variables with default values to remain unset.
      if (ENV[x] === undefined) delete env[x]; else env[x] = ENV[x];
    }
    var strings = [];
    for (var x in env) {
      strings.push(`${x}=${env[x]}`);
    }
    getEnvStrings.strings = strings;
  }
  return getEnvStrings.strings;
};

var _environ_get = (__environ, environ_buf) => {
  var bufSize = 0;
  var envp = 0;
  for (var string of getEnvStrings()) {
    var ptr = environ_buf + bufSize;
    HEAPU32[(((__environ) + (envp)) >> 2)] = ptr;
    bufSize += stringToUTF8(string, ptr, Infinity) + 1;
    envp += 4;
  }
  return 0;
};

var _environ_sizes_get = (penviron_count, penviron_buf_size) => {
  var strings = getEnvStrings();
  HEAPU32[((penviron_count) >> 2)] = strings.length;
  var bufSize = 0;
  for (var string of strings) {
    bufSize += lengthBytesUTF8(string) + 1;
  }
  HEAPU32[((penviron_buf_size) >> 2)] = bufSize;
  return 0;
};

function _fd_close(fd) {
  try {
    var stream = SYSCALLS.getStreamFromFD(fd);
    FS.close(stream);
    return 0;
  } catch (e) {
    if (typeof FS === "undefined" || !(e.name === "ErrnoError")) throw e;
    return e.errno;
  }
}

function _fd_fdstat_get(fd, pbuf) {
  try {
    var rightsBase = 0;
    var rightsInheriting = 0;
    var flags = 0;
    {
      var stream = SYSCALLS.getStreamFromFD(fd);
      // All character devices are terminals (other things a Linux system would
      // assume is a character device, like the mouse, we have special APIs for).
      var type = stream.tty ? 2 : FS.isDir(stream.mode) ? 3 : FS.isLink(stream.mode) ? 7 : 4;
    }
    HEAP8[pbuf] = type;
    HEAP16[(((pbuf) + (2)) >> 1)] = flags;
    HEAP64[(((pbuf) + (8)) >> 3)] = BigInt(rightsBase);
    HEAP64[(((pbuf) + (16)) >> 3)] = BigInt(rightsInheriting);
    return 0;
  } catch (e) {
    if (typeof FS === "undefined" || !(e.name === "ErrnoError")) throw e;
    return e.errno;
  }
}

/** @param {number=} offset */ var doReadv = (stream, iov, iovcnt, offset) => {
  var ret = 0;
  for (var i = 0; i < iovcnt; i++) {
    var ptr = HEAPU32[((iov) >> 2)];
    var len = HEAPU32[(((iov) + (4)) >> 2)];
    iov += 8;
    try {
      var curr = FS.read(stream, HEAP8, ptr, len, offset);
    } catch (e) {
      // On a non-blocking stream a subsequent read may would-block after we
      // already gathered data. POSIX readv is a single gather-read: return
      // what we have rather than failing the whole call.
      if (ret > 0 && e instanceof FS.ErrnoError && (e.errno == 6 || e.errno == 6)) {
        break;
      }
      throw e;
    }
    if (curr < 0) return -1;
    ret += curr;
    if (curr < len) break;
    // nothing more to read
    if (typeof offset !== "undefined") {
      offset += curr;
    }
  }
  return ret;
};

function _fd_read(fd, iov, iovcnt, pnum) {
  try {
    var stream = SYSCALLS.getStreamFromFD(fd);
    var num = doReadv(stream, iov, iovcnt);
    HEAPU32[((pnum) >> 2)] = num;
    return 0;
  } catch (e) {
    if (typeof FS === "undefined" || !(e.name === "ErrnoError")) throw e;
    return e.errno;
  }
}

function _fd_seek(fd, offset, whence, newOffset) {
  offset = bigintToI53Checked(offset);
  try {
    if (isNaN(offset)) return 22;
    var stream = SYSCALLS.getStreamFromFD(fd);
    FS.llseek(stream, offset, whence);
    HEAP64[((newOffset) >> 3)] = BigInt(stream.position);
    if (stream.getdents && !offset && whence === 0) stream.getdents = null;
    // reset readdir state
    return 0;
  } catch (e) {
    if (typeof FS === "undefined" || !(e.name === "ErrnoError")) throw e;
    return e.errno;
  }
}

/** @param {number=} offset */ var doWritev = (stream, iov, iovcnt, offset) => {
  // Gather all iovecs into one contiguous buffer and issue a single
  // FS.write, matching POSIX writev's single gather-write semantics (as
  // __syscall_sendmsg already does). Per-iovec writes fragment a stream
  // socket send into multiple segments, breaking stream byte semantics.
  if (iovcnt == 1) {
    // Single iovec: write directly from HEAP8, no gather buffer needed.
    return FS.write(stream, HEAP8, HEAPU32[((iov) >> 2)], HEAPU32[(((iov) + (4)) >> 2)], offset);
  }
  var total = 0;
  for (var i = 0, p = iov; i < iovcnt; i++, p += 8) {
    total += HEAPU32[(((p) + (4)) >> 2)];
  }
  var view = new Uint8Array(total);
  var voff = 0;
  for (var i = 0; i < iovcnt; i++, iov += 8) {
    var ptr = HEAPU32[((iov) >> 2)];
    var len = HEAPU32[(((iov) + (4)) >> 2)];
    view.set(HEAPU8.subarray(ptr, ptr + len), voff);
    voff += len;
  }
  return FS.write(stream, view, 0, total, offset);
};

function _fd_write(fd, iov, iovcnt, pnum) {
  try {
    var stream = SYSCALLS.getStreamFromFD(fd);
    var num = doWritev(stream, iov, iovcnt);
    HEAPU32[((pnum) >> 2)] = num;
    return 0;
  } catch (e) {
    if (typeof FS === "undefined" || !(e.name === "ErrnoError")) throw e;
    return e.errno;
  }
}

var _llvm_eh_typeid_for = type => type;

var _random_get = (buffer, size) => randomFill(HEAPU8.subarray(buffer, buffer + size));

var autoResumeAudioContext = ctx => {
  for (var event of [ "keydown", "mousedown", "touchstart" ]) {
    for (var element of [ document, document.getElementById("canvas") ]) {
      element?.addEventListener(event, () => {
        if (ctx.state === "suspended") ctx.resume();
      }, {
        "once": true
      });
    }
  }
};

var dynCall = (sig, ptr, args = [], promising = false) => {
  assert(ptr, `null function pointer in dynCall`);
  assert(!promising, "async dynCall is not supported in this mode");
  assert(getWasmTableEntry(ptr), `missing table entry in dynCall: ${ptr}`);
  var func = getWasmTableEntry(ptr);
  var rtn = func(...args);
  function convert(rtn) {
    return rtn;
  }
  return convert(rtn);
};

var writeArrayToMemory = (array, buffer) => {
  assert(array.length >= 0, "writeArrayToMemory array must have a length (should be an array or typed array)");
  HEAP8.set(array, buffer);
};

/**
   * @param {number} ptr
   * @param {number} value
   * @param {string} type
   */ function setValue(ptr, value, type = "i8") {
  if (type.endsWith("*")) type = "*";
  switch (type) {
   case "i1":
    HEAP8[ptr] = value;
    break;

   case "i8":
    HEAP8[ptr] = value;
    break;

   case "i16":
    HEAP16[((ptr) >> 1)] = value;
    break;

   case "i32":
    HEAP32[((ptr) >> 2)] = value;
    break;

   case "i64":
    HEAP64[((ptr) >> 3)] = BigInt(value);
    break;

   case "float":
    HEAPF32[((ptr) >> 2)] = value;
    break;

   case "double":
    HEAPF64[((ptr) >> 3)] = value;
    break;

   case "*":
    HEAPU32[((ptr) >> 2)] = value;
    break;

   default:
    abort(`invalid type for setValue: ${type}`);
  }
}

var getCFunc = ident => {
  var func = Module["_" + ident];
  // closure exported function
  assert(func, `Cannot call unknown function ${ident}, make sure it is exported`);
  return func;
};

/**
   * @param {string|null=} returnType
   * @param {Array=} argTypes
   * @param {Array=} args
   * @param {Object=} opts
   */ var ccall = (ident, returnType, argTypes, args, opts) => {
  // For fast lookup of conversion functions
  var toC = {
    "string": str => {
      var ret = 0;
      if (str !== null && str !== undefined && str !== 0) {
        // null string
        ret = stringToUTF8OnStack(str);
      }
      return ret;
    },
    "array": arr => {
      var ret = stackAlloc(arr.length);
      writeArrayToMemory(arr, ret);
      return ret;
    }
  };
  function convertReturnValue(ret) {
    if (returnType === "string") {
      return UTF8ToString(ret);
    }
    if (returnType === "boolean") return Boolean(ret);
    return ret;
  }
  var func = getCFunc(ident);
  var cArgs = [];
  var stack = 0;
  assert(returnType !== "array", 'return type should not be "array"');
  if (args) {
    for (var i = 0; i < args.length; i++) {
      var converter = toC[argTypes[i]];
      if (converter) {
        if (!stack) stack = stackSave();
        cArgs[i] = converter(args[i]);
      } else {
        cArgs[i] = args[i];
      }
    }
  }
  var ret = func(...cArgs);
  function onDone(ret) {
    if (stack) stackRestore(stack);
    return convertReturnValue(ret);
  }
  ret = onDone(ret);
  return ret;
};

var FS_createPath = (...args) => FS.createPath(...args);

var FS_unlink = (...args) => FS.unlink(...args);

var FS_createLazyFile = (...args) => FS.createLazyFile(...args);

var FS_createDevice = (...args) => FS.createDevice(...args);

FS.createPreloadedFile = FS_createPreloadedFile;

FS.preloadFile = FS_preloadFile;

FS.staticInit();

Module["requestAnimationFrame"] = MainLoop.requestAnimationFrame;

Module["pauseMainLoop"] = MainLoop.pause;

Module["resumeMainLoop"] = MainLoop.resume;

MainLoop.init();

safeSetTimeout.pending = new Map;

safeSetTimeout.nextId = 1;

for (let i = 0; i < 32; ++i) tempFixedLengthArray.push(new Array(i));

var miniTempWebGLFloatBuffersStorage = new Float32Array(288);

// Create GL_POOL_TEMP_BUFFERS_SIZE+1 temporary buffers, for uploads of size 0 through GL_POOL_TEMP_BUFFERS_SIZE inclusive
for (/**@suppress{duplicate}*/ var i = 0; i <= 288; ++i) {
  miniTempWebGLFloatBuffers[i] = miniTempWebGLFloatBuffersStorage.subarray(0, i);
}

var miniTempWebGLIntBuffersStorage = new Int32Array(288);

// Create GL_POOL_TEMP_BUFFERS_SIZE+1 temporary buffers, for uploads of size 0 through GL_POOL_TEMP_BUFFERS_SIZE inclusive
for (/**@suppress{duplicate}*/ var i = 0; i <= 288; ++i) {
  miniTempWebGLIntBuffers[i] = miniTempWebGLIntBuffersStorage.subarray(0, i);
}

// End JS library code
// include: postlibrary.js
// This file is included after the automatically-generated JS library code
// but before the wasm module is created.
{
  // Begin ATMODULES hooks
  if (Module["noExitRuntime"]) noExitRuntime = Module["noExitRuntime"];
  if (Module["print"]) out = Module["print"];
  if (Module["printErr"]) err = Module["printErr"];
  // End ATMODULES hooks
  checkIncomingModuleAPI();
  if (Module["arguments"]) programArgs = Module["arguments"];
  if (Module["thisProgram"]) thisProgram = Module["thisProgram"];
  // Assertions on removed incoming Module JS APIs.
  assert(typeof Module["memoryInitializerPrefixURL"] === "undefined", "Module.memoryInitializerPrefixURL option was removed, use Module.locateFile instead");
  assert(typeof Module["pthreadMainPrefixURL"] === "undefined", "Module.pthreadMainPrefixURL option was removed, use Module.locateFile instead");
  assert(typeof Module["cdInitializerPrefixURL"] === "undefined", "Module.cdInitializerPrefixURL option was removed, use Module.locateFile instead");
  assert(typeof Module["filePackagePrefixURL"] === "undefined", "Module.filePackagePrefixURL option was removed, use Module.locateFile instead");
  assert(typeof Module["read"] === "undefined", "Module.read option was removed");
  assert(typeof Module["readAsync"] === "undefined", "Module.readAsync option was removed (modify readAsync in JS)");
  assert(typeof Module["readBinary"] === "undefined", "Module.readBinary option was removed (modify readBinary in JS)");
  assert(typeof Module["setWindowTitle"] === "undefined", "Module.setWindowTitle option was removed (modify emscripten_set_window_title in JS)");
  assert(typeof Module["TOTAL_MEMORY"] === "undefined", "Module.TOTAL_MEMORY has been renamed Module.INITIAL_MEMORY");
  assert(typeof Module["ENVIRONMENT"] === "undefined", "Module.ENVIRONMENT has been deprecated. To force the environment, use the ENVIRONMENT compile-time option (for example, -sENVIRONMENT=web or -sENVIRONMENT=node)");
  assert(typeof Module["STACK_SIZE"] === "undefined", "STACK_SIZE can no longer be set at runtime.  Use -sSTACK_SIZE at link time");
  // If memory is defined in wasm, the user can't provide it, or set INITIAL_MEMORY
  assert(typeof Module["wasmMemory"] === "undefined", "Use of `wasmMemory` detected.  Use -sIMPORTED_MEMORY to define wasmMemory externally");
  assert(typeof Module["INITIAL_MEMORY"] === "undefined", "Detected runtime INITIAL_MEMORY setting.  Use -sIMPORTED_MEMORY to define wasmMemory dynamically");
  var preInit = Module["preInit"];
  if (preInit) {
    if (typeof preInit === "function") Module["preInit"] = preInit = [ preInit ];
    // Written as a loop so that preInit functions that themselves add more
    // preInit functions.  Is this actually needed?
    while (preInit.length > 0) {
      preInit.shift()();
    }
  }
  consumedModuleProp("preInit");
}

// Begin runtime exports
Module["callMain"] = callMain;

Module["addRunDependency"] = addRunDependency;

Module["removeRunDependency"] = removeRunDependency;

Module["ccall"] = ccall;

Module["FS_preloadFile"] = FS_preloadFile;

Module["FS_unlink"] = FS_unlink;

Module["FS_createPath"] = FS_createPath;

Module["FS_createDevice"] = FS_createDevice;

Module["FS_createDataFile"] = FS_createDataFile;

Module["FS_createLazyFile"] = FS_createLazyFile;

var missingLibrarySymbols = [ "writeI53ToI64Clamped", "writeI53ToI64Signaling", "writeI53ToU64Clamped", "writeI53ToU64Signaling", "convertI32PairToI53", "convertI32PairToI53Checked", "convertU32PairToI53", "getTempRet0", "createNamedFunction", "zeroMemory", "withStackSave", "inetPton4", "inetNtop4", "inetPton6", "inetNtop6", "readSockaddr", "writeSockaddr", "getDynCaller", "runtimeKeepalivePush", "runtimeKeepalivePop", "asmjsMangle", "addOnInit", "addOnPostCtor", "addOnPreMain", "STACK_SIZE", "STACK_ALIGN", "POINTER_SIZE", "ASSERTIONS", "cwrap", "convertJsFunctionToWasm", "getEmptyTableSlot", "updateTableMap", "getFunctionAddress", "addFunction", "removeFunction", "intArrayToString", "AsciiToString", "stringToAscii", "UTF16ToString", "stringToUTF16", "lengthBytesUTF16", "UTF32ToString", "stringToUTF32", "lengthBytesUTF32", "registerMouseEventCallback", "fillDeviceOrientationEventData", "registerDeviceOrientationEventCallback", "hideEverythingExceptGivenElement", "restoreHiddenElements", "softFullscreenResizeWebGLRenderTarget", "registerPointerlockErrorEventCallback", "registerTouchEventCallback", "fillBatteryEventData", "registerBatteryEventCallback", "jsStackTrace", "getCallstack", "convertPCtoSourceLocation", "wasiRightsToMuslOFlags", "wasiOFlagsToMuslOFlags", "safeClearTimeout", "setImmediateWrapped", "safeRequestAnimationFrame", "clearImmediateWrapped", "registerPostMainLoop", "registerPreMainLoop", "getPromise", "makePromise", "addPromise", "idsToPromises", "makePromiseCallback", "incrementUncaughtExceptionCount", "decrementUncaughtExceptionCount", "Browser_asyncPrepareDataCounter", "arraySum", "addDays", "getSocketFromFD", "getSocketAddress", "FS_mkdirTree", "_setNetworkCallback", "writeGLArray", "registerWebGlEventCallback", "runAndAbortIfError", "writeStringToMemory", "writeAsciiToMemory", "allocateUTF8", "allocateUTF8OnStack", "demangle", "stackTrace", "getNativeTypeSize" ];

missingLibrarySymbols.forEach(missingLibrarySymbol);

var unexportedSymbols = [ "run", "out", "err", "abort", "wasmExports", "writeStackCookie", "checkStackCookie", "writeI53ToI64", "readI53FromI64", "readI53FromU64", "INT53_MAX", "INT53_MIN", "bigintToI53Checked", "HEAP8", "HEAPU8", "HEAP16", "HEAPU16", "HEAP32", "HEAPU32", "HEAPF32", "HEAPF64", "HEAP64", "HEAPU64", "stackSave", "stackRestore", "stackAlloc", "setTempRet0", "ptrToString", "exitJS", "getHeapMax", "growMemory", "ENV", "ERRNO_CODES", "strError", "DNS", "Protocols", "timers", "warnOnce", "readEmAsmArgsArray", "readEmAsmArgs", "runEmAsmFunction", "runMainThreadEmAsm", "jstoi_q", "getExecutableName", "autoResumeAudioContext", "dynCall", "handleException", "keepRuntimeAlive", "callUserCallback", "maybeExit", "asyncLoad", "alignMemory", "mmapAlloc", "HandleAllocator", "wasmTable", "wasmMemory", "getUniqueRunDependency", "noExitRuntime", "addOnPreRun", "addOnExit", "addOnPostRun", "freeTableIndexes", "functionsInTableMap", "setValue", "getValue", "PATH", "PATH_FS", "UTF8Decoder", "UTF8ArrayToString", "UTF8ToString", "stringToUTF8Array", "stringToUTF8", "lengthBytesUTF8", "intArrayFromString", "UTF16Decoder", "stringToNewUTF8", "stringToUTF8OnStack", "writeArrayToMemory", "JSEvents", "registerKeyEventCallback", "specialHTMLTargets", "maybeCStringToJsString", "findEventTarget", "findCanvasEventTarget", "getBoundingClientRect", "fillMouseEventData", "registerWheelEventCallback", "registerUiEventCallback", "registerFocusEventCallback", "fillDeviceMotionEventData", "registerDeviceMotionEventCallback", "screenOrientation", "fillOrientationChangeEventData", "registerOrientationChangeEventCallback", "fillFullscreenChangeEventData", "registerFullscreenChangeEventCallback", "callCanvasResizedCallback", "JSEvents_requestFullscreen", "JSEvents_resizeCanvasForFullscreen", "registerRestoreOldStyle", "setLetterbox", "currentFullscreenStrategy", "restoreOldWindowedStyle", "doRequestFullscreen", "fillPointerlockChangeEventData", "registerPointerlockChangeEventCallback", "requestPointerLock", "fillVisibilityChangeEventData", "registerVisibilityChangeEventCallback", "fillGamepadEventData", "registerGamepadEventCallback", "registerBeforeUnloadEventCallback", "setCanvasElementSize", "getCanvasElementSize", "UNWIND_CACHE", "ExitStatus", "getEnvStrings", "checkWasiClock", "doReadv", "doWritev", "initRandomFill", "randomFill", "safeSetTimeout", "emSetImmediate", "emClearImmediate", "promiseMap", "uncaughtExceptionCount", "exceptionLast", "exceptionCaught", "ExceptionInfo", "findMatchingCatch", "getExceptionMessageCommon", "incrementExceptionRefcount", "decrementExceptionRefcount", "getExceptionMessage", "Browser", "requestFullscreen", "setCanvasSize", "createContext", "wget", "MONTH_DAYS_REGULAR", "MONTH_DAYS_LEAP", "MONTH_DAYS_REGULAR_CUMULATIVE", "MONTH_DAYS_LEAP_CUMULATIVE", "isLeapYear", "ydayFromDate", "SYSCALLS", "preloadPlugins", "FS_createPreloadedFile", "FS_modeStringToFlags", "FS_getMode", "FS_fileDataToTypedArray", "FS_stdin_getChar_buffer", "FS_stdin_getChar", "FS_readFile", "FS", "FS_root", "FS_mounts", "FS_devices", "FS_streams", "FS_nextInode", "FS_nameTable", "FS_currentPath", "FS_initialized", "FS_ignorePermissions", "FS_syncFSRequests", "FS_lookupPath", "FS_getPath", "FS_hashName", "FS_hashAddNode", "FS_hashRemoveNode", "FS_lookupNode", "FS_createNode", "FS_destroyNode", "FS_isRoot", "FS_isMountpoint", "FS_isFile", "FS_isDir", "FS_isLink", "FS_isChrdev", "FS_isBlkdev", "FS_isFIFO", "FS_isSocket", "FS_flagsToPermissionString", "FS_nodePermissions", "FS_mayLookup", "FS_mayCreate", "FS_mayDelete", "FS_mayOpen", "FS_checkOpExists", "FS_nextfd", "FS_getStreamChecked", "FS_getStream", "FS_createStream", "FS_closeStream", "FS_dupStream", "FS_doSetAttr", "FS_chrdev_stream_ops", "FS_major", "FS_minor", "FS_makedev", "FS_registerDevice", "FS_getDevice", "FS_getMounts", "FS_syncfs", "FS_mount", "FS_unmount", "FS_lookup", "FS_mknod", "FS_statfs", "FS_statfsStream", "FS_statfsNode", "FS_create", "FS_mkdir", "FS_mkdev", "FS_symlink", "FS_link", "FS_rename", "FS_rmdir", "FS_readdir", "FS_readlink", "FS_stat", "FS_fstat", "FS_lstat", "FS_doChmod", "FS_chmod", "FS_lchmod", "FS_fchmod", "FS_doChown", "FS_chown", "FS_lchown", "FS_fchown", "FS_doTruncate", "FS_truncate", "FS_ftruncate", "FS_utime", "FS_open", "FS_close", "FS_isClosed", "FS_llseek", "FS_read", "FS_write", "FS_mmap", "FS_msync", "FS_ioctl", "FS_writeFile", "FS_cwd", "FS_chdir", "FS_createDefaultDirectories", "FS_createDefaultDevices", "FS_createSpecialDirectories", "FS_createStandardStreams", "FS_staticInit", "FS_init", "FS_quit", "FS_analyzePath", "FS_createFile", "FS_forceLoadFile", "MEMFS", "TTY", "PIPEFS", "SOCKFS", "tempFixedLengthArray", "miniTempWebGLFloatBuffers", "miniTempWebGLIntBuffers", "heapObjectForWebGLType", "toTypedArrayIndex", "webgl_enable_ANGLE_instanced_arrays", "webgl_enable_OES_vertex_array_object", "webgl_enable_WEBGL_draw_buffers", "webgl_enable_WEBGL_multi_draw", "webgl_enable_EXT_polygon_offset_clamp", "webgl_enable_EXT_clip_control", "webgl_enable_WEBGL_polygon_mode", "GL", "emscriptenWebGLGet", "computeUnpackAlignedImageSize", "colorChannelsInGlTextureFormat", "emscriptenWebGLGetTexPixelData", "emscriptenWebGLGetUniform", "webglGetProgramUniformLocation", "webglGetUniformLocation", "webglPrepareUniformLocationsBeforeFirstUse", "webglGetLeftBracePos", "emscriptenWebGLGetVertexAttrib", "__glGetActiveAttribOrUniform", "AL", "GLUT", "EGL", "GLEW", "IDBStore", "SDL", "SDL_gfx", "print", "printErr", "jstoi_s", "IDBFS", "webSockets", "WS" ];

unexportedSymbols.forEach(unexportedRuntimeSymbol);

// End runtime exports
// Begin JS library exports
// End JS library exports
// end include: postlibrary.js
function checkIncomingModuleAPI() {
  ignoredModuleProp("fetchSettings");
  ignoredModuleProp("logReadFiles");
  ignoredModuleProp("loadSplitModule");
  ignoredModuleProp("onMalloc");
  ignoredModuleProp("onRealloc");
  ignoredModuleProp("onFree");
  ignoredModuleProp("onSbrkGrow");
  ignoredModuleProp("onCOSCacheHit");
  ignoredModuleProp("onCOSCacheMiss");
  ignoredModuleProp("onCOSStore");
  ignoredModuleProp("GL_MAX_TEXTURE_IMAGE_UNITS");
  ignoredModuleProp("SDL_canPlayWithWebAudio");
  ignoredModuleProp("SDL_numSimultaneouslyQueuedBuffers");
  ignoredModuleProp("freePreloadedMediaOnUse");
  ignoredModuleProp("preinitializedWebGLContext");
  ignoredModuleProp("keyboardListeningElement");
  ignoredModuleProp("doNotCaptureKeyboard");
  ignoredModuleProp("extraStackTrace");
  ignoredModuleProp("preloadPlugins");
  ignoredModuleProp("preMainLoop");
  ignoredModuleProp("postMainLoop");
  ignoredModuleProp("forcedAspectRatio");
  ignoredModuleProp("mainScriptUrlOrBlob");
  ignoredModuleProp("onFullScreen");
  ignoredModuleProp("INITIAL_MEMORY");
  ignoredModuleProp("wasmMemory");
  ignoredModuleProp("wasmBinary");
}

var ASM_CONSTS = {
  912483: () => document.hidden || Module.clawPageHidden || !document.hasFocus(),
  912560: () => {
    const token = Module.clawComparison && Module.clawComparison.token;
    if (typeof token !== "string") return 0;
    const size = lengthBytesUTF8(token) + 1;
    const pointer = _malloc(size);
    stringToUTF8(token, pointer, size);
    return pointer;
  },
  912797: () => globalThis.clawDiscordActivity?.quickPlayLevel || 0,
  912861: () => {
    Module.clawFail(Module.clawStartupError || "Nie udało się zainicjalizować gry. Sprawdź konsolę przeglądarki.");
  },
  912983: () => {
    Module.clawHideCursor = function() {
      _clawHideCursor();
    };
  },
  913046: () => {
    Module.clawRedrawScreen = function() {
      _clawRedrawScreen();
    };
  },
  913113: () => {
    Module.clawResizeScreen = function() {
      _clawResizeScreen();
    };
    Module.clawResizeScreen();
  },
  913207: () => {
    Module.clawUpdateBackgroundAudio = function() {
      _clawUpdateBackgroundAudio();
    };
    document.addEventListener("visibilitychange", Module.clawUpdateBackgroundAudio);
    window.addEventListener("blur", Module.clawUpdateBackgroundAudio);
    window.addEventListener("focus", Module.clawUpdateBackgroundAudio);
    window.addEventListener("pagehide", function() {
      Module.clawPageHidden = true;
      Module.clawUpdateBackgroundAudio();
    });
    window.addEventListener("pageshow", function() {
      Module.clawPageHidden = false;
      Module.clawUpdateBackgroundAudio();
    });
  },
  913747: $0 => {
    Module.setStatus("Błąd uruchomienia: " + UTF8ToString($0));
  },
  913813: () => {
    if (Module.clawPhase === "starting") Module.clawStarted();
  },
  913876: ($0, $1) => {
    Module.clawFail("Unable to continue game. (" + $0 + ")", {
      error_code: $0,
      error_resource_id: $1,
      error_source: "game_runtime"
    });
  },
  914011: () => {
    Module.clawFail(Module.clawStartupError || "Game loop stopped.");
  },
  914081: $0 => {
    Module.clawFail(UTF8ToString($0));
  },
  914120: () => {
    Module.clawComparisonFinished = true;
    Module.clawSync();
  },
  914181: () => {
    Module.clawTextShader = null;
  },
  914215: () => {
    Module.clawTextUniforms = {};
  },
  914249: ($0, $1, $2, $3) => {
    try {
      Module.clawRenderText($0, $1, $2, $3);
      return 1;
    } catch (error) {
      Module.setStatus("Shader tekstu: " + error);
      console.error(error);
      return 0;
    }
  },
  914402: ($0, $1, $2, $3, $4) => {
    Module.clawTextUniforms[UTF8ToString($0)] = ([ $1, $2, $3, $4 ]);
  },
  914467: ($0, $1) => {
    Module.clawTextUniforms[UTF8ToString($0)] = [ $1 ];
  },
  914521: ($0, $1, $2) => {
    Module.clawTextUniforms[UTF8ToString($0)] = ([ $1, $2 ]);
  },
  914580: ($0, $1) => {
    Module.clawRequestLevel($0, UTF8ToString($1));
  },
  914631: $0 => Module.clawLevels[$0].status,
  914672: $0 => Module.clawLevels[$0].progress,
  914715: $0 => Module.clawLevels[$0].status,
  914756: $0 => {
    delete Module.clawLevels[$0];
  },
  914790: ($0, $1) => {
    globalThis.clawAnalytics?.end($0, $1);
  },
  914833: ($0, $1, $2, $3, $4, $5) => {
    globalThis.clawAnalytics?.levelStart($0, $1, $2, $3, $4, $5);
  },
  914899: ($0, $1, $2, $3, $4, $5, $6, $7) => {
    globalThis.clawAnalytics?.complete($0, $1, $2, $3, $4, $5, $6, $7);
  },
  914971: ($0, $1, $2, $3, $4) => {
    globalThis.clawAnalytics?.checkpoint($0, $1, $2, $3, $4);
  },
  915033: ($0, $1, $2, $3) => {
    globalThis.clawAnalytics?.stateChange?.(UTF8ToString($0), $1, $2, $3);
  },
  915108: ($0, $1, $2, $3, $4) => {
    globalThis.clawAnalytics?.cheat?.(UTF8ToString($0), $1, $2, $3, $4);
  },
  915181: ($0, $1, $2, $3, $4, $5, $6, $7) => {
    globalThis.clawAnalytics?.treasure?.($0, $1, $2, $3, $4, $5, $6, $7 ? UTF8ToString($7) : null);
  },
  915281: ($0, $1, $2, $3, $4, $5, $6, $7) => {
    globalThis.clawAnalytics?.enemy?.(UTF8ToString($0), $1, $2, $3, $4, $5, UTF8ToString($6), $7 ? UTF8ToString($7) : null);
  },
  915406: ($0, $1) => {
    globalThis.clawAnalytics?.progress?.($0, $1);
  },
  915456: ($0, $1, $2) => {
    globalThis.clawAnalytics?.position?.($0, $1, $2);
  },
  915510: ($0, $1, $2, $3, $4, $5, $6, $7) => {
    globalThis.clawAnalytics?.death($0, $1, $2, $3, $4, $5, UTF8ToString($6), $7 ? UTF8ToString($7) : null);
  },
  915619: ($0, $1, $2, $3, $4) => {
    globalThis.clawAnalytics?.route?.($0, $1, $2, $3, $4);
  },
  915674: () => Module.clawTouchText && Module.clawTouchText.length ? Module.clawTouchText.shift() : -1,
  915774: ($0, $1, $2, $3, $4, $5) => {
    if (!Module.clawMapPointer) return;
    const point = Module.clawMapPointer($1, $2, $3, $4, $5);
    HEAPF32[$0 >> 2] = point.x;
    HEAPF32[($0 >> 2) + 1] = point.y;
  },
  915933: () => {
    Module.clawPaletteShader = null;
  },
  915968: ($0, $1, $2, $3, $4, $5, $6, $7) => {
    try {
      Module.clawRenderPalette($0, $1, $2, $3, $4, $5, $6, $7);
      return 1;
    } catch (error) {
      Module.setStatus("Claw palette shader: " + error);
      console.error(error);
      return 0;
    }
  },
  916139: ($0, $1, $2) => {
    globalThis.clawAnalytics?.menu(UTF8ToString($0), UTF8ToString($1), $2);
  },
  916215: $0 => Module.clawLanguages[UTF8ToString($0)]?.status ?? -1,
  916278: $0 => Module.clawLanguages[UTF8ToString($0)]?.status ?? -1,
  916341: $0 => {
    Module.clawRequestLanguage(UTF8ToString($0));
  },
  916389: () => !!(globalThis.CLAW_ANALYTICS_CONFIG?.leaderboard_api && globalThis.CLAW_ANALYTICS_CONFIG?.token),
  916498: () => !!globalThis.clawDiscordActivity,
  916543: () => !!globalThis.clawDiscordActivity?.embedded,
  916598: $0 => Module.clawLanguages?.[UTF8ToString($0)]?.status === 1,
  916665: $0 => {
    Module.clawRequestLanguage(UTF8ToString($0));
  },
  916715: $0 => {
    if (Module.clawSetMenuTextInput) Module.clawSetMenuTextInput(!!$0); else Module.clawMenuTextInput = !!$0;
  },
  916825: $0 => Module.clawLanguages?.[UTF8ToString($0)]?.status ?? -1,
  916892: () => {
    if (Module.clawFocusMenuTextInput) Module.clawFocusMenuTextInput();
  },
  916964: () => {
    globalThis.clawAnalytics?.showLeaderboards?.();
  },
  917016: () => {
    globalThis.clawAnalytics?.applicationQuit?.();
  },
  917067: () => {
    Module.clawQuit();
  },
  917090: () => Module.clawTouchMode ? 1 : 0,
  917131: $0 => {
    if (Module.clawCopyMenuText) Module.clawCopyMenuText(UTF8ToString($0));
  },
  917207: () => {
    if (Module.clawPasteMenuText) Module.clawPasteMenuText();
  },
  917269: () => {
    Module.clawImportSave();
  },
  917298: () => {
    Module.clawExportSave();
  },
  917327: () => Module.clawTouchSettings.enabled(),
  917374: () => Module.clawTouchSettings.style(),
  917419: () => Module.clawTouchSettings.size(),
  917463: () => {
    Module.clawTouchSettings.toggle();
  },
  917502: () => {
    Module.clawTouchSettings.cycleStyle();
  },
  917545: () => {
    Module.clawTouchSettings.cycleSize();
  },
  917587: $0 => Module.clawTouchSettings.action($0),
  917635: $0 => {
    Module.clawTouchSettings.toggleAction($0);
  },
  917682: () => {
    Module.clawTouchSettings.reorganize();
  },
  917725: () => {
    Module.clawTouchSettings.finishReorganizing();
  },
  917776: () => {
    Module.clawTouchSettings.resetPositions();
  },
  917823: ($0, $1, $2) => {
    const id = $0;
    const persist = !!$2;
    const input = document.createElement("input");
    input.type = "file";
    input.accept = UTF8ToString($1);
    input.style.position = "fixed";
    input.style.left = "-10000px";
    document.body.appendChild(input);
    let finished = false;
    const complete = (path, error) => {
      if (finished) return;
      finished = true;
      Module.ccall("clawMenuFilePickerCompleted", null, [ "number", "string", "string" ], [ id, path || "", error || "" ]);
      input.remove();
    };
    input.addEventListener("change", async () => {
      if (!input.files || input.files.length === 0) {
        complete("", "");
        return;
      }
      try {
        const directory = persist ? "/save/CustomAudio" : "/tmp";
        FS.mkdirTree(directory);
        if (input.files[0].size > 128 * 1024 * 1024) throw new Error("The selected file is too large.");
        const fileName = input.files[0].name;
        const uniqueName = self.crypto && crypto.randomUUID ? crypto.randomUUID() : `${Date.now()}-${id}`;
        const storageName = `Claw2Track-${uniqueName}-${fileName}`;
        const path = persist ? `${directory}/${storageName}` : `${directory}/claw-picked-${id}`;
        FS.writeFile(path, new Uint8Array(await input.files[0].arrayBuffer()));
        if (persist) {
          if (!Module.clawSyncAsync) throw new Error("Persistent storage is unavailable.");
          await Module.clawSyncAsync();
        }
        complete(path, "");
      } catch (error) {
        complete("", String(error));
      }
    }, {
      once: true
    });
    input.addEventListener("cancel", () => complete("", ""), {
      once: true
    });
    input.click();
  },
  919262: () => {
    const sdl = Module["SDL3"];
    const context = sdl && sdl.audioContext;
    return !!context && context.state !== "running";
  },
  919384: () => globalThis.clawAnalytics?.enabled() ? 1 : 0,
  919440: () => globalThis.clawAnalytics?.canEnable() ? 1 : 0,
  919498: () => {
    const analytics = globalThis.clawAnalytics;
    analytics?.setEnabled(!analytics.enabled());
  },
  919591: ($0, $1) => {
    try {
      const bytes = FS.readFile(UTF8ToString($0));
      const url = URL.createObjectURL(new Blob([ bytes ], {
        type: "application/octet-stream"
      }));
      const link = document.createElement("a");
      link.href = url;
      link.download = UTF8ToString($1);
      link.click();
      setTimeout(() => {
        URL.revokeObjectURL(url);
        FS.unlink(UTF8ToString($0));
      }, 1e3);
    } catch (error) {
      Module.setStatus("Player profile download failed: " + error);
      console.error(error);
    }
  },
  920029: () => {
    globalThis.clawAnalytics?.quitLevel();
  },
  920072: () => Module.clawTouchMode ? 1 : 0,
  920113: () => {
    if (Module.clawUpdateBackgroundAudio) Module.clawUpdateBackgroundAudio();
  },
  920191: () => Module.clawTouchActions || 0,
  920232: () => Module.clawTakeTouchKey ? Module.clawTakeTouchKey() : 0,
  920300: () => {
    if (typeof (Module["SDL3"]) === "undefined") {
      Module["SDL3"] = {};
    }
    var SDL3 = Module["SDL3"];
    if (typeof (SDL3.JSVarToCPtr) === "undefined") {
      SDL3.JSVarToCPtr = function(v) {
        return v;
      };
    }
    if (typeof (SDL3.CPtrToHeap32Index) === "undefined") {
      SDL3.CPtrToHeap32Index = function(ptr) {
        return ptr >>> 2;
      };
    }
  },
  920614: $0 => {
    var str = UTF8ToString($0) + "\n\n" + "Abort/Retry/Ignore/AlwaysIgnore? [ariA] :";
    var reply = window.prompt(str, "i");
    if (reply === null) {
      reply = "i";
    }
    return reply.length === 1 ? reply.charCodeAt(0) : -1;
  },
  920829: () => {
    Module["SDL3"].dummy_audio = {};
    Module["SDL3"].dummy_audio.timers = [];
    Module["SDL3"].dummy_audio.timers[0] = undefined;
    Module["SDL3"].dummy_audio.timers[1] = undefined;
  },
  921006: ($0, $1, $2, $3, $4) => {
    var a = Module["SDL3"].dummy_audio;
    if (a.timers[$0] !== undefined) {
      clearInterval(a.timers[$0]);
    }
    a.timers[$0] = setInterval(function() {
      dynCall("vi", $3, [ $4 ]);
    }, ($1 / $2) * 1e3);
  },
  921198: $0 => {
    var a = Module["SDL3"].dummy_audio;
    if (a.timers[$0] !== undefined) {
      clearInterval(a.timers[$0]);
    }
    a.timers[$0] = undefined;
  },
  921329: () => {
    if (typeof (AudioContext) !== "undefined") {
      return true;
    } else if (typeof (webkitAudioContext) !== "undefined") {
      return true;
    }
    return false;
  },
  921476: () => {
    if ((typeof (navigator.mediaDevices) !== "undefined") && (typeof (navigator.mediaDevices.getUserMedia) !== "undefined")) {
      return true;
    }
    return false;
  },
  921630: () => {
    var SDL3 = Module["SDL3"];
    if (typeof (SDL3.audio_playback) === "undefined") {
      SDL3.audio_playback = {};
    }
    if (typeof (SDL3.audio_recording) === "undefined") {
      SDL3.audio_recording = {};
    }
    if (!SDL3.audioContext) {
      if (typeof (AudioContext) !== "undefined") {
        SDL3.audioContext = new AudioContext;
      } else if (typeof (webkitAudioContext) !== "undefined") {
        SDL3.audioContext = new webkitAudioContext;
      }
      if (SDL3.audioContext) {
        if ((typeof navigator.userActivation) === "undefined") {
          autoResumeAudioContext(SDL3.audioContext);
        }
      }
    }
    return (SDL3.audioContext !== undefined);
  },
  922209: () => Module["SDL3"].audioContext.sampleRate,
  922260: ($0, $1, $2, $3) => {
    var SDL3 = Module["SDL3"];
    var have_microphone = function(stream) {
      if (SDL3.audio_recording.silenceTimer !== undefined) {
        clearInterval(SDL3.audio_recording.silenceTimer);
        SDL3.audio_recording.silenceTimer = undefined;
        SDL3.audio_recording.silenceBuffer = undefined;
      }
      SDL3.audio_recording.mediaStreamNode = SDL3.audioContext.createMediaStreamSource(stream);
      SDL3.audio_recording.scriptProcessorNode = SDL3.audioContext.createScriptProcessor($1, $0, 1);
      SDL3.audio_recording.scriptProcessorNode.onaudioprocess = function(audioProcessingEvent) {
        if ((SDL3 === undefined) || (SDL3.audio_recording === undefined)) {
          return;
        }
        audioProcessingEvent.outputBuffer.getChannelData(0).fill(0);
        SDL3.audio_recording.currentRecordingBuffer = audioProcessingEvent.inputBuffer;
        dynCall("ip", $2, [ $3 ]);
      };
      SDL3.audio_recording.mediaStreamNode.connect(SDL3.audio_recording.scriptProcessorNode);
      SDL3.audio_recording.scriptProcessorNode.connect(SDL3.audioContext.destination);
      SDL3.audio_recording.stream = stream;
    };
    var no_microphone = function(error) {};
    SDL3.audio_recording.silenceBuffer = SDL3.audioContext.createBuffer($0, $1, SDL3.audioContext.sampleRate);
    SDL3.audio_recording.silenceBuffer.getChannelData(0).fill(0);
    var silence_callback = function() {
      SDL3.audio_recording.currentRecordingBuffer = SDL3.audio_recording.silenceBuffer;
      dynCall("ip", $2, [ $3 ]);
    };
    SDL3.audio_recording.silenceTimer = setInterval(silence_callback, ($1 / SDL3.audioContext.sampleRate) * 1e3);
    if ((navigator.mediaDevices !== undefined) && (navigator.mediaDevices.getUserMedia !== undefined)) {
      navigator.mediaDevices.getUserMedia({
        audio: true,
        video: false
      }).then(have_microphone).catch(no_microphone);
    }
  },
  923951: ($0, $1, $2, $3) => {
    var SDL3 = Module["SDL3"];
    SDL3.audio_playback.scriptProcessorNode = SDL3.audioContext["createScriptProcessor"]($1, 0, $0);
    SDL3.audio_playback.scriptProcessorNode["onaudioprocess"] = function(e) {
      if ((SDL3 === undefined) || (SDL3.audio_playback === undefined)) {
        return;
      }
      if (SDL3.audio_playback.silenceTimer !== undefined) {
        clearInterval(SDL3.audio_playback.silenceTimer);
        SDL3.audio_playback.silenceTimer = undefined;
        SDL3.audio_playback.silenceBuffer = undefined;
      }
      SDL3.audio_playback.currentPlaybackBuffer = e["outputBuffer"];
      dynCall("ip", $2, [ $3 ]);
    };
    SDL3.audio_playback.scriptProcessorNode["connect"](SDL3.audioContext["destination"]);
    if (SDL3.audioContext.state === "suspended") {
      SDL3.audio_playback.silenceBuffer = SDL3.audioContext.createBuffer($0, $1, SDL3.audioContext.sampleRate);
      SDL3.audio_playback.silenceBuffer.getChannelData(0).fill(0);
      var silence_callback = function() {
        if ((typeof navigator.userActivation) !== "undefined") {
          if (navigator.userActivation.hasBeenActive) {
            SDL3.audioContext.resume();
          }
        }
        SDL3.audio_playback.currentPlaybackBuffer = SDL3.audio_playback.silenceBuffer;
        dynCall("ip", $2, [ $3 ]);
        SDL3.audio_playback.currentPlaybackBuffer = undefined;
      };
      SDL3.audio_playback.silenceTimer = setInterval(silence_callback, ($1 / SDL3.audioContext.sampleRate) * 1e3);
    }
  },
  925267: $0 => {
    var SDL3 = Module["SDL3"];
    if ($0) {
      if (SDL3.audio_recording.silenceTimer !== undefined) {
        clearInterval(SDL3.audio_recording.silenceTimer);
      }
      if (SDL3.audio_recording.stream !== undefined) {
        var tracks = SDL3.audio_recording.stream.getAudioTracks();
        for (var i = 0; i < tracks.length; i++) {
          SDL3.audio_recording.stream.removeTrack(tracks[i]);
        }
      }
      if (SDL3.audio_recording.scriptProcessorNode !== undefined) {
        SDL3.audio_recording.scriptProcessorNode.onaudioprocess = function(audioProcessingEvent) {};
        SDL3.audio_recording.scriptProcessorNode.disconnect();
      }
      if (SDL3.audio_recording.mediaStreamNode !== undefined) {
        SDL3.audio_recording.mediaStreamNode.disconnect();
      }
      SDL3.audio_recording = undefined;
    } else {
      if (SDL3.audio_playback.scriptProcessorNode != undefined) {
        SDL3.audio_playback.scriptProcessorNode.disconnect();
      }
      if (SDL3.audio_playback.silenceTimer !== undefined) {
        clearInterval(SDL3.audio_playback.silenceTimer);
      }
      SDL3.audio_playback = undefined;
    }
    if ((SDL3.audioContext !== undefined) && (SDL3.audio_playback === undefined) && (SDL3.audio_recording === undefined)) {
      SDL3.audioContext.close();
      SDL3.audioContext = undefined;
    }
  },
  926423: ($0, $1) => {
    var SDL3 = Module["SDL3"];
    var buf = SDL3.CPtrToHeap32Index($0);
    var numChannels = SDL3.audio_playback.currentPlaybackBuffer["numberOfChannels"];
    for (var c = 0; c < numChannels; ++c) {
      var channelData = SDL3.audio_playback.currentPlaybackBuffer["getChannelData"](c);
      if (channelData.length != $1) {
        throw "Web Audio playback buffer length mismatch! Destination size: " + channelData.length + " samples vs expected " + $1 + " samples!";
      }
      for (var j = 0; j < $1; ++j) {
        channelData[j] = HEAPF32[buf + (j * numChannels + c)];
      }
    }
  },
  926956: ($0, $1) => {
    var SDL3 = Module["SDL3"];
    var numChannels = SDL3.audio_recording.currentRecordingBuffer.numberOfChannels;
    for (var c = 0; c < numChannels; ++c) {
      var channelData = SDL3.audio_recording.currentRecordingBuffer.getChannelData(c);
      if (channelData.length != $1) {
        throw "Web Audio recording buffer length mismatch! Destination size: " + channelData.length + " samples vs expected " + $1 + " samples!";
      }
      if (numChannels == 1) {
        for (var j = 0; j < $1; ++j) {
          setValue($0 + (j * 4), channelData[j], "float");
        }
      } else {
        for (var j = 0; j < $1; ++j) {
          setValue($0 + (((j * numChannels) + c) * 4), channelData[j], "float");
        }
      }
    }
  },
  927583: () => {
    Module["SDL3"].camera = {};
  },
  927615: () => (navigator.mediaDevices === undefined) ? 0 : 1,
  927674: ($0, $1, $2, $3, $4) => {
    const device = $0;
    const w = $1;
    const h = $2;
    const framerate_numerator = $3;
    const framerate_denominator = $4;
    const outcome = Module._SDLEmscriptenCameraPermissionOutcome;
    const iterate = Module._SDLEmscriptenThreadIterate;
    const constraints = {};
    if ((w <= 0) || (h <= 0)) {
      constraints.video = true;
    } else {
      constraints.video = {};
      constraints.video.width = w;
      constraints.video.height = h;
    }
    if ((framerate_numerator > 0) && (framerate_denominator > 0)) {
      var fps = framerate_numerator / framerate_denominator;
      constraints.video.frameRate = {
        ideal: fps
      };
    }
    function grabNextCameraFrame() {
      const SDL3 = Module["SDL3"];
      if ((typeof (SDL3) === "undefined") || (typeof (SDL3.camera) === "undefined") || (typeof (SDL3.camera.stream) === "undefined")) {
        return;
      }
      const nextframems = SDL3.camera.next_frame_time;
      const now = performance.now();
      if (now >= nextframems) {
        iterate(device);
        while (SDL3.camera.next_frame_time < now) {
          SDL3.camera.next_frame_time += SDL3.camera.fpsincrms;
        }
      }
      requestAnimationFrame(grabNextCameraFrame);
    }
    navigator.mediaDevices.getUserMedia(constraints).then(stream => {
      const settings = stream.getVideoTracks()[0].getSettings();
      const actualw = settings.width;
      const actualh = settings.height;
      const actualfps = settings.frameRate;
      console.log("Camera is opened! Actual spec: (" + actualw + "x" + actualh + "), fps=" + actualfps);
      if (outcome(device, 1, actualw, actualh, actualfps)) {
        const video = document.createElement("video");
        video.width = actualw;
        video.height = actualh;
        video.style.display = "none";
        video.srcObject = stream;
        const canvas = document.createElement("canvas");
        canvas.width = actualw;
        canvas.height = actualh;
        canvas.style.display = "none";
        const ctx2d = canvas.getContext("2d");
        const SDL3 = Module["SDL3"];
        SDL3.camera.width = actualw;
        SDL3.camera.height = actualh;
        SDL3.camera.fps = actualfps;
        SDL3.camera.fpsincrms = 1e3 / actualfps;
        SDL3.camera.stream = stream;
        SDL3.camera.video = video;
        SDL3.camera.canvas = canvas;
        SDL3.camera.ctx2d = ctx2d;
        SDL3.camera.next_frame_time = performance.now();
        video.play();
        video.addEventListener("loadedmetadata", () => {
          grabNextCameraFrame();
        });
      }
    }).catch(err => {
      console.error("Tried to open camera but it threw an error! " + err.name + ": " + err.message);
      outcome(device, 0, 0, 0, 0);
    });
  },
  929980: () => {
    const SDL3 = Module["SDL3"];
    if ((typeof (SDL3) === "undefined") || (typeof (SDL3.camera) === "undefined") || (typeof (SDL3.camera.stream) === "undefined")) {
      return;
    }
    SDL3.camera.stream.getTracks().forEach(track => track.stop());
    SDL3.camera = {};
  },
  930231: ($0, $1, $2) => {
    const w = $0;
    const h = $1;
    const rgba = $2;
    const SDL3 = Module["SDL3"];
    if ((typeof (SDL3) === "undefined") || (typeof (SDL3.camera) === "undefined") || (typeof (SDL3.camera.ctx2d) === "undefined")) {
      return 0;
    }
    SDL3.camera.ctx2d.drawImage(SDL3.camera.video, 0, 0, w, h);
    const imgrgba = SDL3.camera.ctx2d.getImageData(0, 0, w, h).data;
    HEAPU8.set(imgrgba, rgba);
    return 1;
  },
  930609: () => {
    if (typeof (Module["SDL3"]) !== "undefined") {
      Module["SDL3"].camera = undefined;
    }
  },
  930696: $0 => {
    let gamepad = navigator["getGamepads"]()[$0];
    if (!gamepad || !gamepad["vibrationActuator"] || !gamepad["vibrationActuator"]["effects"] || !gamepad["vibrationActuator"]["effects"]["includes"]("trigger-rumble")) {
      return false;
    }
    return true;
  },
  930942: $0 => {
    let gamepad = navigator["getGamepads"]()[$0];
    if (!gamepad) {
      return 0;
    }
    let vendor_str = "Vendor: ";
    if (gamepad["id"]["indexOf"](vendor_str) > 0) {
      let vendor_str_index = gamepad["id"]["indexOf"](vendor_str) + vendor_str["length"];
      return parseInt(gamepad["id"]["substr"](vendor_str_index, 4), 16);
    }
    let id_split = gamepad["id"]["split"]("-");
    if (id_split["length"] > 1 && !isNaN(parseInt(id_split[0], 16))) {
      return parseInt(id_split[0], 16);
    }
    return 0;
  },
  931407: $0 => {
    let gamepad = navigator["getGamepads"]()[$0];
    if (!gamepad) {
      return 0;
    }
    let product_str = "Product: ";
    if (gamepad["id"]["indexOf"](product_str) > 0) {
      let product_str_index = gamepad["id"]["indexOf"](product_str) + product_str["length"];
      return parseInt(gamepad["id"]["substr"](product_str_index, 4), 16);
    }
    let id_split = gamepad["id"]["split"]("-");
    if (id_split["length"] > 1 && !isNaN(parseInt(id_split[1], 16))) {
      return parseInt(id_split[1], 16);
    }
    return 0;
  },
  931879: $0 => {
    let gamepad = navigator["getGamepads"]()[$0];
    if (!gamepad) {
      return 0;
    }
    return gamepad["id"]["toLowerCase"]()["indexOf"]("xinput") >= 0;
  },
  932022: () => {
    const os = ([ "Android", "Linux", "iPhone", "Macintosh", "Windows" ]);
    const ua = navigator["userAgent"];
    for (let i = 0; i < os.length; i++) {
      if (ua["indexOf"](os[i]) >= 0) {
        return i + 1;
      }
    }
    return 0;
  },
  932232: ($0, $1, $2) => {
    let gamepad = navigator["getGamepads"]()[$0];
    if (!gamepad) {
      stringToUTF8("\0", $1, $2);
      return;
    }
    let id = gamepad["id"];
    let output = id;
    if (id["indexOf"](" (STANDARD GAMEPAD") > 0) {
      output = id["substr"](0, id["indexOf"](" (STANDARD GAMEPAD"));
    } else if (id["indexOf"](" (Vendor:") > 0) {
      output = id["substr"](0, id["indexOf"](" (Vendor:"));
    } else if (id["indexOf"](" (XInput") > 0) {
      output = id["substr"](0, id["indexOf"](" (XInput"));
    }
    let id_split = id["split"]("-");
    if (id_split["length"] > 1 && !isNaN(parseInt(id_split[0], 16))) {
      let start = id["indexOf"]("-", id["indexOf"]("-") + 1) + 1;
      output = id["substr"](start);
    }
    stringToUTF8(output.trim(), $1, $2);
  },
  932910: $0 => {
    let gamepad = navigator["getGamepads"]()[$0];
    if (!gamepad || !gamepad["vibrationActuator"]) {
      return false;
    }
    return true;
  },
  933038: ($0, $1, $2, $3, $4) => {
    let gamepad = navigator["getGamepads"]()[$0];
    if (!gamepad) {
      return false;
    }
    gamepad["vibrationActuator"]["playEffect"]("dual-rumble", {
      "startDelay": 0,
      "duration": 3e3,
      "weakMagnitude": $1 / 65535,
      "strongMagnitude": $2 / 65535,
      "leftTrigger": $3 / 65535,
      "rightTrigger": $4 / 65535
    });
    return true;
  },
  933351: ($0, $1) => {
    var buf = $0;
    var buflen = $1;
    var list = undefined;
    if (navigator.languages && navigator.languages.length) {
      list = navigator.languages;
    } else {
      var oneOfThese = navigator.userLanguage || navigator.language || navigator.browserLanguage || navigator.systemLanguage;
      if (oneOfThese !== undefined) {
        list = [ oneOfThese ];
      }
    }
    if (list === undefined) {
      return;
    }
    var str = "";
    for (var i = 0; i < list.length; i++) {
      var item = list[i];
      if ((str.length + item.length + 1) > buflen) {
        break;
      }
      if (str.length > 0) {
        str += ",";
      }
      str += item;
    }
    str = str.replace(/-/g, "_");
    if (buflen > str.length) {
      buflen = str.length;
    }
    for (var i = 0; i < buflen; i++) {
      setValue(buf + i, str.charCodeAt(i), "i8");
    }
  },
  934059: ($0, $1, $2, $3) => {
    var w = $0;
    var h = $1;
    var pixels = $2;
    var canvasId = UTF8ToString($3);
    var canvas = document.querySelector(canvasId);
    var SDL3 = Module["SDL3"];
    if (SDL3.ctxCanvas !== canvas) {
      SDL3.ctx = Browser.createContext(canvas, false, true);
      if (!SDL3.ctx) {
        return false;
      }
      SDL3.ctxCanvas = canvas;
    }
    if (SDL3.w !== w || SDL3.h !== h || SDL3.imageCtx !== SDL3.ctx) {
      SDL3.image = SDL3.ctx.createImageData(w, h);
      SDL3.w = w;
      SDL3.h = h;
      SDL3.imageCtx = SDL3.ctx;
    }
    var data = SDL3.image.data;
    var src = pixels / 4;
    if (SDL3.data32Data !== data) {
      SDL3.data32 = new Int32Array(data.buffer);
      SDL3.data32Data = data;
    }
    var data32 = SDL3.data32;
    data32.set(HEAP32.subarray(src, src + data32.length));
    SDL3.ctx.putImageData(SDL3.image, 0, 0);
    return true;
  },
  934808: () => {
    var SDL3 = Module["SDL3"];
    SDL3["mouse_x"] = 0;
    SDL3["mouse_y"] = 0;
    SDL3["mouse_buttons"] = [];
    for (var i = 0; i < 5; ++i) {
      SDL3["mouse_buttons"][i] = false;
    }
    document.addEventListener("mousemove", function(e) {
      var SDL3 = Module["SDL3"];
      SDL3["mouse_x"] = e.clientX;
      SDL3["mouse_y"] = e.clientY;
    });
    document.addEventListener("mousedown", function(e) {
      var SDL3 = Module["SDL3"];
      if (0 <= e.button && e.button < SDL3["mouse_buttons"].length) {
        SDL3["mouse_buttons"][e.button] = true;
      }
    });
    document.addEventListener("mouseup", function(e) {
      var SDL3 = Module["SDL3"];
      if (0 <= e.button && e.button < SDL3["mouse_buttons"].length) {
        SDL3["mouse_buttons"][e.button] = false;
      }
    });
  },
  935496: ($0, $1, $2, $3, $4) => {
    var w = $0;
    var h = $1;
    var hot_x = $2;
    var hot_y = $3;
    var pixels = $4;
    var canvas = document.createElement("canvas");
    canvas.width = w;
    canvas.height = h;
    var ctx = canvas.getContext("2d");
    var image = ctx.createImageData(w, h);
    var data = image.data;
    var src = pixels / 4;
    var data32 = new Int32Array(data.buffer);
    data32.set(HEAP32.subarray(src, src + data32.length));
    ctx.putImageData(image, 0, 0);
    var url = hot_x === 0 && hot_y === 0 ? "url(" + canvas.toDataURL() + "), auto" : "url(" + canvas.toDataURL() + ") " + hot_x + " " + hot_y + ", auto";
    var urlBuf = _SDL_malloc(url.length + 1);
    stringToUTF8(url, urlBuf, url.length + 1);
    return urlBuf;
  },
  936154: $0 => {
    if (Module["canvas"]) {
      Module["canvas"].style["cursor"] = UTF8ToString($0);
    }
  },
  936237: () => {
    if (Module["canvas"]) {
      Module["canvas"].style["cursor"] = "none";
    }
  },
  936306: () => Module["SDL3"]["mouse_x"],
  936344: () => Module["SDL3"]["mouse_y"],
  936382: $0 => Module["SDL3"]["mouse_buttons"][$0],
  936430: $0 => {
    var data = $0;
    if (document.sdlEventHandlerLockKeysCheck) {
      document.removeEventListener("keydown", document.sdlEventHandlerLockKeysCheck);
    }
    document.sdlEventHandlerLockKeysCheck = function(event) {
      if ((event.key != "CapsLock") && (event.key != "NumLock") && (event.key != "ScrollLock")) {
        _Emscripten_HandleLockKeysCheck(Module["SDL3"].JSVarToCPtr(data), event.getModifierState("CapsLock"), event.getModifierState("NumLock"), event.getModifierState("ScrollLock"));
      }
    };
    document.addEventListener("keydown", document.sdlEventHandlerLockKeysCheck);
  },
  936984: () => {
    document.removeEventListener("keydown", document.sdlEventHandlerLockKeysCheck);
  },
  937068: $0 => {
    var target = document;
    if (target) {
      target.sdlEventHandlerMouseButtonUpGlobal = function(event) {
        var SDL3 = Module["SDL3"];
        var d = SDL3.makePointerEventCStruct(0, 0, event);
        if (d != 0) {
          _Emscripten_HandleMouseButtonUpGlobal(SDL3.JSVarToCPtr($0), d);
          _SDL_free(d);
        }
      };
      target.addEventListener("pointerup", target.sdlEventHandlerMouseButtonUpGlobal);
    }
  },
  937429: $0 => {
    var SDL3 = Module["SDL3"];
    if (SDL3.makePointerEventCStruct === undefined) {
      SDL3.makePointerEventCStruct = function(left, top, event) {
        var ptrtype = 0;
        if (event.pointerType == "mouse") {
          ptrtype = 1;
        } else if (event.pointerType == "touch") {
          ptrtype = 2;
        } else if (event.pointerType == "pen") {
          ptrtype = 3;
        } else {
          return 0;
        }
        var ptr = _SDL_malloc($0);
        if (ptr != 0) {
          var idx = SDL3.CPtrToHeap32Index(ptr);
          HEAP32[idx++] = ptrtype;
          HEAP32[idx++] = event.pointerId;
          HEAP32[idx++] = (typeof (event.button) !== "undefined") ? event.button : -1;
          HEAP32[idx++] = event.buttons;
          HEAP32[idx++] = (event.type == "pointerdown") ? 1 : 0;
          HEAPF32[idx++] = event.movementX;
          HEAPF32[idx++] = event.movementY;
          HEAPF32[idx++] = event.clientX - left;
          HEAPF32[idx++] = event.clientY - top;
          if (ptrtype == 3) {
            HEAPF32[idx++] = event.pressure;
            HEAPF32[idx++] = event.tangentialPressure;
            HEAPF32[idx++] = event.tiltX;
            HEAPF32[idx++] = event.tiltY;
            HEAPF32[idx++] = event.twist;
          }
        }
        return ptr;
      };
    }
  },
  938421: $0 => {
    var id = UTF8ToString($0);
    try {
      var canvas = document.querySelector(id);
      if (canvas) {
        return canvas === document.activeElement;
      }
    } catch (e) {}
    return false;
  },
  938587: () => document.hasFocus(),
  938619: () => {
    var target = document;
    if (target) {
      target.removeEventListener("pointerup", target.sdlEventHandlerMouseButtonUpGlobal);
      target.sdlEventHandlerMouseButtonUpGlobal = undefined;
    }
  },
  938801: () => document.body.clientWidth,
  938839: () => document.body.clientHeight,
  938878: () => window.innerWidth,
  938908: () => window.innerHeight,
  938939: () => window.outerWidth,
  938969: () => window.outerHeight,
  939e3: () => window.pageXOffset,
  939031: () => window.pageYOffset,
  939062: ($0, $1) => {
    var target = document.querySelector(UTF8ToString($1));
    if (target) {
      var SDL3 = Module["SDL3"];
      var data = $0;
      target.sdlEventHandlerPointerEnter = function(event) {
        var rect = target.getBoundingClientRect();
        var d = SDL3.makePointerEventCStruct(rect.left, rect.top, event);
        if (d != 0) {
          _Emscripten_HandlePointerEnter(SDL3.JSVarToCPtr(data), d);
          _SDL_free(d);
        }
      };
      target.sdlEventHandlerPointerLeave = function(event) {
        var rect = target.getBoundingClientRect();
        var d = SDL3.makePointerEventCStruct(rect.left, rect.top, event);
        if (d != 0) {
          _Emscripten_HandlePointerLeave(SDL3.JSVarToCPtr(data), d);
          _SDL_free(d);
        }
      };
      target.sdlEventHandlerPointerGeneric = function(event) {
        var rect = target.getBoundingClientRect();
        var d = SDL3.makePointerEventCStruct(rect.left, rect.top, event);
        if (d != 0) {
          _Emscripten_HandlePointerGeneric(SDL3.JSVarToCPtr(data), d);
          _SDL_free(d);
        }
      };
      target.style.touchAction = "none";
      target.addEventListener("pointerenter", target.sdlEventHandlerPointerEnter);
      target.addEventListener("pointerleave", target.sdlEventHandlerPointerLeave);
      target.addEventListener("pointercancel", target.sdlEventHandlerPointerLeave);
      target.addEventListener("pointerdown", target.sdlEventHandlerPointerGeneric);
      target.addEventListener("pointermove", target.sdlEventHandlerPointerGeneric);
      target.addEventListener("pointerup", target.sdlEventHandlerPointerGeneric);
    }
  },
  940450: ($0, $1, $2) => {
    var target = document.querySelector(UTF8ToString($1));
    if (target) {
      var data = $0;
      var SDL3 = Module["SDL3"];
      var makeDropEventCStruct = function(event) {
        var ptr = 0;
        ptr = _SDL_malloc($2);
        if (ptr != 0) {
          var idx = ptr >> 2;
          var rect = target.getBoundingClientRect();
          HEAP32[idx++] = event.clientX - rect.left;
          HEAP32[idx++] = event.clientY - rect.top;
        }
        return ptr;
      };
      SDL3.eventHandlerDropDragover = function(event) {
        event.preventDefault();
        var d = makeDropEventCStruct(event);
        if (d != 0) {
          _Emscripten_SendDragEvent(data, d);
          _SDL_free(d);
        }
      };
      target.addEventListener("dragover", SDL3.eventHandlerDropDragover);
      SDL3.drop_count = 0;
      try {
        FS.mkdir("/tmp/filedrop");
      } catch (e) {}
      SDL3.eventHandlerDropDrop = function(event) {
        event.preventDefault();
        if (event.dataTransfer.types.includes("text/plain")) {
          let plain_text = stringToNewUTF8(event.dataTransfer.getData("text/plain"));
          _Emscripten_SendDragTextEvent(data, plain_text);
          _Emscripten_force_free(plain_text);
        } else if (event.dataTransfer.types.includes("Files")) {
          let files_read = 0;
          const files_to_read = event.dataTransfer.files.length;
          for (let i = 0; i < files_to_read; i++) {
            const file = event.dataTransfer.files.item(i);
            const file_reader = new FileReader;
            file_reader.readAsArrayBuffer(file);
            file_reader.onload = function(event) {
              const fs_dropdir = `/tmp/filedrop/${SDL3.drop_count}`;
              SDL3.drop_count += 1;
              const fs_filepath = `${fs_dropdir}/${file.name}`;
              const c_fs_filepath = stringToNewUTF8(fs_filepath);
              const contents_array8 = new Uint8Array(event.target.result);
              try {
                FS.mkdir(fs_dropdir);
                var stream = FS.open(fs_filepath, "w");
                FS.write(stream, contents_array8, 0, contents_array8.length, 0);
                FS.close(stream);
                _Emscripten_SendDragFileEvent(data, c_fs_filepath);
              } catch (e) {}
              _Emscripten_force_free(c_fs_filepath);
              onFileRead();
            };
            file_reader.onerror = function(event) {
              onFileRead();
            };
          }
          function onFileRead() {
            ++files_read;
            if (files_read === files_to_read) {
              _Emscripten_SendDragCompleteEvent(data);
            }
          }
        }
        _Emscripten_SendDragCompleteEvent(data);
      };
      target.addEventListener("drop", SDL3.eventHandlerDropDrop);
      SDL3.eventHandlerDropDragend = function(event) {
        event.preventDefault();
        _Emscripten_SendDragCompleteEvent(data);
      };
      target.addEventListener("dragend", SDL3.eventHandlerDropDragend);
      target.addEventListener("dragleave", SDL3.eventHandlerDropDragend);
    }
  },
  942817: $0 => {
    var target = document.querySelector(UTF8ToString($0));
    if (target) {
      var SDL3 = Module["SDL3"];
      target.removeEventListener("dragleave", SDL3.eventHandlerDropDragend);
      target.removeEventListener("dragend", SDL3.eventHandlerDropDragend);
      target.removeEventListener("drop", SDL3.eventHandlerDropDrop);
      SDL3.drop_count = undefined;
      ("/tmp/filedrop");
      FS.rmdir("/tmp/filedrop");
      target.removeEventListener("dragover", SDL3.eventHandlerDropDragover);
      SDL3.eventHandlerDropDragover = undefined;
      SDL3.eventHandlerDropDrop = undefined;
      SDL3.eventHandlerDropDragend = undefined;
    }
  },
  943647: $0 => {
    var target = document.querySelector(UTF8ToString($0));
    if (target) {
      target.removeEventListener("pointerenter", target.sdlEventHandlerPointerEnter);
      target.removeEventListener("pointerleave", target.sdlEventHandlerPointerLeave);
      target.removeEventListener("pointercancel", target.sdlEventHandlerPointerLeave);
      target.removeEventListener("pointerdown", target.sdlEventHandlerPointerGeneric);
      target.removeEventListener("pointermove", target.sdlEventHandlerPointerGeneric);
      target.removeEventListener("pointerup", target.sdlEventHandlerPointerGeneric);
      target.style.touchAction = "";
      target.sdlEventHandlerPointerEnter = undefined;
      target.sdlEventHandlerPointerLeave = undefined;
      target.sdlEventHandlerPointerGeneric = undefined;
    }
  },
  944381: () => {
    if (!window.matchMedia) {
      return -1;
    }
    if (window.matchMedia("(prefers-color-scheme: light)").matches) {
      return 0;
    }
    if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
      return 1;
    }
    return -1;
  },
  944590: () => {
    if (typeof (Module["SDL3"]) !== "undefined") {
      var SDL3 = Module["SDL3"];
      SDL3.themeChangedMatchMedia.removeEventListener("change", SDL3.eventHandlerThemeChanged);
      SDL3.themeChangedMatchMedia = undefined;
      SDL3.eventHandlerThemeChanged = undefined;
    }
  },
  944843: () => window.innerWidth,
  944873: () => window.innerHeight,
  944904: $0 => {
    Module["requestFullscreen"] = function(lockPointer, resizeCanvas) {
      _requestFullscreenThroughSDL($0);
    };
  },
  945013: ($0, $1) => {
    var pngData = HEAPU8.buffer instanceof ArrayBuffer ? HEAPU8.subarray($0, $0 + $1) : HEAPU8.slice($0, $0 + $1);
    var blob = new Blob([ pngData ], {
      type: "image/png"
    });
    var url = URL.createObjectURL(blob);
    var link = document.querySelector("link[rel~='icon']");
    if (!link) {
      link = document.createElement("link");
      link.rel = "icon";
      link.type = "image/png";
      document.head.appendChild(link);
    }
    if (link.href && link.href.startsWith("blob:")) {
      URL.revokeObjectURL(link.href);
    }
    link.href = url;
  },
  945506: () => {
    Module["requestFullscreen"] = function(lockPointer, resizeCanvas) {};
  },
  945580: () => window.innerWidth,
  945610: () => window.innerHeight,
  945641: $0 => {
    var canvas = document.querySelector(UTF8ToString($0));
    canvas.SDL3_original_position = canvas.style.position;
    canvas.SDL3_original_top = canvas.style.top;
    canvas.SDL3_original_left = canvas.style.left;
    var div = document.createElement("div");
    div.id = "SDL3_fill_document_background_elements";
    div.SDL3_canvas = canvas;
    div.SDL3_canvas_parent = canvas.parentNode;
    div.SDL3_canvas_nextsib = canvas.nextSibling;
    var children = Array.from(document.body.children);
    for (var child of children) {
      div.appendChild(child);
    }
    document.body.appendChild(div);
    div.style.display = "none";
    document.body.appendChild(canvas);
    canvas.style.position = "fixed";
    canvas.style.top = "0";
    canvas.style.left = "0";
  },
  946339: () => {
    var div = document.getElementById("SDL3_fill_document_background_elements");
    if (div) {
      if (div.SDL3_canvas_nextsib) {
        div.SDL3_canvas_parent.insertBefore(div.SDL3_canvas, div.SDL3_canvas_nextsib);
      } else {
        div.SDL3_canvas_parent.appendChild(div.SDL3_canvas);
      }
      while (div.firstChild) {
        document.body.insertBefore(div.firstChild, div);
      }
      div.SDL3_canvas.style.position = div.SDL3_canvas.SDL3_original_position;
      div.SDL3_canvas.style.top = div.SDL3_canvas.SDL3_original_top;
      div.SDL3_canvas.style.left = div.SDL3_canvas.SDL3_original_left;
      div.remove();
    }
  },
  946898: () => {
    if (window.matchMedia) {
      var SDL3 = Module["SDL3"];
      SDL3.eventHandlerThemeChanged = function(event) {
        _Emscripten_SendSystemThemeChangedEvent();
      };
      SDL3.themeChangedMatchMedia = window.matchMedia("(prefers-color-scheme: dark)");
      SDL3.themeChangedMatchMedia.addEventListener("change", SDL3.eventHandlerThemeChanged);
    }
  },
  947220: ($0, $1, $2, $3, $4) => {
    var title = UTF8ToString($0);
    var message = UTF8ToString($1);
    var background = UTF8ToString($2);
    var color = UTF8ToString($3);
    var id = UTF8ToString($4);
    var dialog = document.createElement("dialog");
    dialog.classList.add("SDL3_messagebox");
    dialog.id = id;
    dialog.style.color = color;
    dialog.style.backgroundColor = background;
    document.body.append(dialog);
    var h1 = document.createElement("h1");
    h1.innerText = title;
    dialog.append(h1);
    var p = document.createElement("p");
    p.innerText = message;
    dialog.append(p);
    dialog.showModal();
  },
  947761: ($0, $1, $2, $3, $4, $5, $6, $7) => {
    var dialog_id = UTF8ToString($0);
    var text = UTF8ToString($1);
    var responseId = $2;
    var clickOnReturn = $3;
    var clickOnEscape = $4;
    var border = UTF8ToString($5);
    var background = UTF8ToString($6);
    var hovered = UTF8ToString($7);
    var dialog = document.getElementById(dialog_id);
    if (!dialog) {
      return false;
    }
    var button = document.createElement("button");
    button.innerText = text;
    button.style.borderColor = border;
    button.style.backgroundColor = background;
    dialog.addEventListener("keydown", function(e) {
      if (clickOnReturn && e.key === "Enter") {
        e.preventDefault();
        button.click();
      } else if (clickOnEscape && e.key === "Escape") {
        e.preventDefault();
        button.click();
      }
    });
    dialog.addEventListener("cancel", function(e) {
      e.preventDefault();
    });
    button.onmouseenter = function(e) {
      button.style.backgroundColor = hovered;
    };
    button.onmouseleave = function(e) {
      button.style.backgroundColor = background;
    };
    button.onclick = function(e) {
      dialog.close(responseId);
    };
    dialog.append(button);
    return true;
  },
  948770: $0 => {
    var dialog_id = UTF8ToString($0);
    var dialog = document.getElementById(dialog_id);
    if (!dialog) {
      return false;
    }
    return dialog.open;
  },
  948908: $0 => {
    var dialog_id = UTF8ToString($0);
    var dialog = document.getElementById(dialog_id);
    if (!dialog) {
      return 0;
    }
    try {
      return parseInt(dialog.returnValue);
    } catch (e) {
      return 0;
    }
  },
  949090: ($0, $1) => {
    alert(UTF8ToString($0) + "\n\n" + UTF8ToString($1));
  },
  949147: $0 => {
    window.open(UTF8ToString($0), "_blank");
  },
  949187: () => {
    if (Module.clawDeveloperTextField) Module.clawDeveloperTextField.remove();
    Module.clawDeveloperTextField = null;
  },
  949304: $0 => {
    var editing = !!$0;
    if (Module.clawDeveloperEditing !== editing) window.dispatchEvent(new Event("claw-developer-editing"));
    Module.clawDeveloperEditing = editing;
    var controls = document.getElementById("touch-controls");
    if (controls) controls.style.display = $0 ? "none" : "";
    if ($0) Module.clawTouchActions = 0;
  }
};

function clawActivityConnect() {
  globalThis.clawDiscordActivity.connect();
}

function clawActivityDisconnect() {
  globalThis.clawDiscordActivity?.disconnect?.();
}

function clawActivityStatus() {
  return globalThis.clawDiscordActivity.status;
}

function clawActivityError(buffer, capacity) {
  stringToUTF8(globalThis.clawDiscordActivity.error, buffer, capacity);
}

function clawActivityPresence(state, details) {
  globalThis.clawDiscordActivity.presence(UTF8ToString(state), UTF8ToString(details));
}

function syncTouchTextInput(text, capacity, x, y, w, h, displayWidth, displayHeight, visible) {
  var field = Module.clawDeveloperTextField;
  var touch = Module.clawForceTouchInput || matchMedia("(pointer: coarse)").matches;
  if (!visible || !touch || !Module.canvas) {
    if (field) {
      field.blur();
      field.style.display = "none";
      field.clawDirty = false;
    }
    return;
  }
  if (!field) {
    field = document.createElement("input");
    field.type = "text";
    field.setAttribute("aria-label", "Westworld sample text");
    field.autocomplete = "off";
    field.spellcheck = false;
    field.style.cssText = "position:fixed;z-index:20;box-sizing:border-box;margin:0;border:1px solid #526d91;border-radius:0;padding:4px 8px;background:#20334f;color:white;font:16px monospace;";
    field.addEventListener("input", function() {
      field.clawDirty = true;
    });
    for (var event of [ "keydown", "keyup", "keypress" ]) field.addEventListener(event, function(e) {
      e.stopPropagation();
    });
    document.body.appendChild(field);
    Module.clawDeveloperTextField = field;
  }
  if (field.clawDirty) {
    stringToUTF8(field.value, text, capacity);
    field.clawDirty = false;
  }
  if (document.activeElement !== field) field.value = UTF8ToString(text);
  var canvas = Module.canvas.getBoundingClientRect();
  field.style.display = "block";
  field.style.left = (canvas.left + x * canvas.width / displayWidth) + "px";
  field.style.top = (canvas.top + y * canvas.height / displayHeight) + "px";
  field.style.width = (w * canvas.width / displayWidth) + "px";
  field.style.height = (h * canvas.height / displayHeight) + "px";
}

// Imports from the Wasm binary.
var _malloc = makeInvalidEarlyAccess("_malloc");

var _free = makeInvalidEarlyAccess("_free");

var _fflush = makeInvalidEarlyAccess("_fflush");

var _fileno = makeInvalidEarlyAccess("_fileno");

var _SDL_free = Module["_SDL_free"] = makeInvalidEarlyAccess("_SDL_free");

var _clawUpdateBackgroundAudio = Module["_clawUpdateBackgroundAudio"] = makeInvalidEarlyAccess("_clawUpdateBackgroundAudio");

var _clawHideCursor = Module["_clawHideCursor"] = makeInvalidEarlyAccess("_clawHideCursor");

var _clawRedrawScreen = Module["_clawRedrawScreen"] = makeInvalidEarlyAccess("_clawRedrawScreen");

var _clawResizeScreen = Module["_clawResizeScreen"] = makeInvalidEarlyAccess("_clawResizeScreen");

var _main = Module["_main"] = makeInvalidEarlyAccess("_main");

var _clawValidateUserProfile = Module["_clawValidateUserProfile"] = makeInvalidEarlyAccess("_clawValidateUserProfile");

var _clawMenuFilePickerCompleted = Module["_clawMenuFilePickerCompleted"] = makeInvalidEarlyAccess("_clawMenuFilePickerCompleted");

var _SDL_malloc = Module["_SDL_malloc"] = makeInvalidEarlyAccess("_SDL_malloc");

var _SDL_calloc = Module["_SDL_calloc"] = makeInvalidEarlyAccess("_SDL_calloc");

var _Emscripten_force_free = Module["_Emscripten_force_free"] = makeInvalidEarlyAccess("_Emscripten_force_free");

var _SDL_realloc = Module["_SDL_realloc"] = makeInvalidEarlyAccess("_SDL_realloc");

var _strerror = makeInvalidEarlyAccess("_strerror");

var _SDLEmscriptenCameraPermissionOutcome = Module["_SDLEmscriptenCameraPermissionOutcome"] = makeInvalidEarlyAccess("_SDLEmscriptenCameraPermissionOutcome");

var _SDLEmscriptenThreadIterate = Module["_SDLEmscriptenThreadIterate"] = makeInvalidEarlyAccess("_SDLEmscriptenThreadIterate");

var _Emscripten_HandlePointerEnter = Module["_Emscripten_HandlePointerEnter"] = makeInvalidEarlyAccess("_Emscripten_HandlePointerEnter");

var _Emscripten_HandlePointerLeave = Module["_Emscripten_HandlePointerLeave"] = makeInvalidEarlyAccess("_Emscripten_HandlePointerLeave");

var _Emscripten_HandlePointerGeneric = Module["_Emscripten_HandlePointerGeneric"] = makeInvalidEarlyAccess("_Emscripten_HandlePointerGeneric");

var _Emscripten_HandleMouseButtonUpGlobal = Module["_Emscripten_HandleMouseButtonUpGlobal"] = makeInvalidEarlyAccess("_Emscripten_HandleMouseButtonUpGlobal");

var _Emscripten_SendDragEvent = Module["_Emscripten_SendDragEvent"] = makeInvalidEarlyAccess("_Emscripten_SendDragEvent");

var _Emscripten_SendDragCompleteEvent = Module["_Emscripten_SendDragCompleteEvent"] = makeInvalidEarlyAccess("_Emscripten_SendDragCompleteEvent");

var _Emscripten_SendDragTextEvent = Module["_Emscripten_SendDragTextEvent"] = makeInvalidEarlyAccess("_Emscripten_SendDragTextEvent");

var _Emscripten_SendDragFileEvent = Module["_Emscripten_SendDragFileEvent"] = makeInvalidEarlyAccess("_Emscripten_SendDragFileEvent");

var _Emscripten_HandleLockKeysCheck = Module["_Emscripten_HandleLockKeysCheck"] = makeInvalidEarlyAccess("_Emscripten_HandleLockKeysCheck");

var _Emscripten_SendSystemThemeChangedEvent = Module["_Emscripten_SendSystemThemeChangedEvent"] = makeInvalidEarlyAccess("_Emscripten_SendSystemThemeChangedEvent");

var _requestFullscreenThroughSDL = Module["_requestFullscreenThroughSDL"] = makeInvalidEarlyAccess("_requestFullscreenThroughSDL");

var _emscripten_stack_get_end = makeInvalidEarlyAccess("_emscripten_stack_get_end");

var _emscripten_stack_get_base = makeInvalidEarlyAccess("_emscripten_stack_get_base");

var _setThrew = makeInvalidEarlyAccess("_setThrew");

var __emscripten_tempret_set = makeInvalidEarlyAccess("__emscripten_tempret_set");

var _emscripten_stack_init = makeInvalidEarlyAccess("_emscripten_stack_init");

var _emscripten_stack_get_free = makeInvalidEarlyAccess("_emscripten_stack_get_free");

var __emscripten_stack_restore = makeInvalidEarlyAccess("__emscripten_stack_restore");

var __emscripten_stack_alloc = makeInvalidEarlyAccess("__emscripten_stack_alloc");

var _emscripten_stack_get_current = makeInvalidEarlyAccess("_emscripten_stack_get_current");

var ___cxa_decrement_exception_refcount = makeInvalidEarlyAccess("___cxa_decrement_exception_refcount");

var ___cxa_increment_exception_refcount = makeInvalidEarlyAccess("___cxa_increment_exception_refcount");

var ___get_exception_message = makeInvalidEarlyAccess("___get_exception_message");

var ___cxa_can_catch = makeInvalidEarlyAccess("___cxa_can_catch");

var ___cxa_get_exception_ptr = makeInvalidEarlyAccess("___cxa_get_exception_ptr");

var memory = makeInvalidEarlyAccess("memory");

var __indirect_function_table = makeInvalidEarlyAccess("__indirect_function_table");

var wasmMemory = makeInvalidEarlyAccess("wasmMemory");

var wasmTable = makeInvalidEarlyAccess("wasmTable");

function assignWasmExports(wasmExports) {
  assert(typeof wasmExports["malloc"] !== "undefined", "missing Wasm export: malloc");
  assert(typeof wasmExports["free"] !== "undefined", "missing Wasm export: free");
  assert(typeof wasmExports["fflush"] !== "undefined", "missing Wasm export: fflush");
  assert(typeof wasmExports["fileno"] !== "undefined", "missing Wasm export: fileno");
  assert(typeof wasmExports["SDL_free"] !== "undefined", "missing Wasm export: SDL_free");
  assert(typeof wasmExports["clawUpdateBackgroundAudio"] !== "undefined", "missing Wasm export: clawUpdateBackgroundAudio");
  assert(typeof wasmExports["clawHideCursor"] !== "undefined", "missing Wasm export: clawHideCursor");
  assert(typeof wasmExports["clawRedrawScreen"] !== "undefined", "missing Wasm export: clawRedrawScreen");
  assert(typeof wasmExports["clawResizeScreen"] !== "undefined", "missing Wasm export: clawResizeScreen");
  assert(typeof wasmExports["__main_argc_argv"] !== "undefined", "missing Wasm export: __main_argc_argv");
  assert(typeof wasmExports["clawValidateUserProfile"] !== "undefined", "missing Wasm export: clawValidateUserProfile");
  assert(typeof wasmExports["clawMenuFilePickerCompleted"] !== "undefined", "missing Wasm export: clawMenuFilePickerCompleted");
  assert(typeof wasmExports["SDL_malloc"] !== "undefined", "missing Wasm export: SDL_malloc");
  assert(typeof wasmExports["SDL_calloc"] !== "undefined", "missing Wasm export: SDL_calloc");
  assert(typeof wasmExports["Emscripten_force_free"] !== "undefined", "missing Wasm export: Emscripten_force_free");
  assert(typeof wasmExports["SDL_realloc"] !== "undefined", "missing Wasm export: SDL_realloc");
  assert(typeof wasmExports["strerror"] !== "undefined", "missing Wasm export: strerror");
  assert(typeof wasmExports["SDLEmscriptenCameraPermissionOutcome"] !== "undefined", "missing Wasm export: SDLEmscriptenCameraPermissionOutcome");
  assert(typeof wasmExports["SDLEmscriptenThreadIterate"] !== "undefined", "missing Wasm export: SDLEmscriptenThreadIterate");
  assert(typeof wasmExports["Emscripten_HandlePointerEnter"] !== "undefined", "missing Wasm export: Emscripten_HandlePointerEnter");
  assert(typeof wasmExports["Emscripten_HandlePointerLeave"] !== "undefined", "missing Wasm export: Emscripten_HandlePointerLeave");
  assert(typeof wasmExports["Emscripten_HandlePointerGeneric"] !== "undefined", "missing Wasm export: Emscripten_HandlePointerGeneric");
  assert(typeof wasmExports["Emscripten_HandleMouseButtonUpGlobal"] !== "undefined", "missing Wasm export: Emscripten_HandleMouseButtonUpGlobal");
  assert(typeof wasmExports["Emscripten_SendDragEvent"] !== "undefined", "missing Wasm export: Emscripten_SendDragEvent");
  assert(typeof wasmExports["Emscripten_SendDragCompleteEvent"] !== "undefined", "missing Wasm export: Emscripten_SendDragCompleteEvent");
  assert(typeof wasmExports["Emscripten_SendDragTextEvent"] !== "undefined", "missing Wasm export: Emscripten_SendDragTextEvent");
  assert(typeof wasmExports["Emscripten_SendDragFileEvent"] !== "undefined", "missing Wasm export: Emscripten_SendDragFileEvent");
  assert(typeof wasmExports["Emscripten_HandleLockKeysCheck"] !== "undefined", "missing Wasm export: Emscripten_HandleLockKeysCheck");
  assert(typeof wasmExports["Emscripten_SendSystemThemeChangedEvent"] !== "undefined", "missing Wasm export: Emscripten_SendSystemThemeChangedEvent");
  assert(typeof wasmExports["requestFullscreenThroughSDL"] !== "undefined", "missing Wasm export: requestFullscreenThroughSDL");
  assert(typeof wasmExports["emscripten_stack_get_end"] !== "undefined", "missing Wasm export: emscripten_stack_get_end");
  assert(typeof wasmExports["emscripten_stack_get_base"] !== "undefined", "missing Wasm export: emscripten_stack_get_base");
  assert(typeof wasmExports["setThrew"] !== "undefined", "missing Wasm export: setThrew");
  assert(typeof wasmExports["_emscripten_tempret_set"] !== "undefined", "missing Wasm export: _emscripten_tempret_set");
  assert(typeof wasmExports["emscripten_stack_init"] !== "undefined", "missing Wasm export: emscripten_stack_init");
  assert(typeof wasmExports["emscripten_stack_get_free"] !== "undefined", "missing Wasm export: emscripten_stack_get_free");
  assert(typeof wasmExports["_emscripten_stack_restore"] !== "undefined", "missing Wasm export: _emscripten_stack_restore");
  assert(typeof wasmExports["_emscripten_stack_alloc"] !== "undefined", "missing Wasm export: _emscripten_stack_alloc");
  assert(typeof wasmExports["emscripten_stack_get_current"] !== "undefined", "missing Wasm export: emscripten_stack_get_current");
  assert(typeof wasmExports["__cxa_decrement_exception_refcount"] !== "undefined", "missing Wasm export: __cxa_decrement_exception_refcount");
  assert(typeof wasmExports["__cxa_increment_exception_refcount"] !== "undefined", "missing Wasm export: __cxa_increment_exception_refcount");
  assert(typeof wasmExports["__get_exception_message"] !== "undefined", "missing Wasm export: __get_exception_message");
  assert(typeof wasmExports["__cxa_can_catch"] !== "undefined", "missing Wasm export: __cxa_can_catch");
  assert(typeof wasmExports["__cxa_get_exception_ptr"] !== "undefined", "missing Wasm export: __cxa_get_exception_ptr");
  assert(typeof wasmExports["memory"] !== "undefined", "missing Wasm export: memory");
  assert(typeof wasmExports["__indirect_function_table"] !== "undefined", "missing Wasm export: __indirect_function_table");
  _malloc = createExportWrapper("malloc", wasmExports["malloc"], 1);
  _free = createExportWrapper("free", wasmExports["free"], 1);
  _fflush = createExportWrapper("fflush", wasmExports["fflush"], 1);
  _fileno = createExportWrapper("fileno", wasmExports["fileno"], 1);
  _SDL_free = Module["_SDL_free"] = createExportWrapper("SDL_free", wasmExports["SDL_free"], 1);
  _clawUpdateBackgroundAudio = Module["_clawUpdateBackgroundAudio"] = createExportWrapper("clawUpdateBackgroundAudio", wasmExports["clawUpdateBackgroundAudio"], 0);
  _clawHideCursor = Module["_clawHideCursor"] = createExportWrapper("clawHideCursor", wasmExports["clawHideCursor"], 0);
  _clawRedrawScreen = Module["_clawRedrawScreen"] = createExportWrapper("clawRedrawScreen", wasmExports["clawRedrawScreen"], 0);
  _clawResizeScreen = Module["_clawResizeScreen"] = createExportWrapper("clawResizeScreen", wasmExports["clawResizeScreen"], 0);
  _main = Module["_main"] = createExportWrapper("__main_argc_argv", wasmExports["__main_argc_argv"], 2);
  _clawValidateUserProfile = Module["_clawValidateUserProfile"] = createExportWrapper("clawValidateUserProfile", wasmExports["clawValidateUserProfile"], 2);
  _clawMenuFilePickerCompleted = Module["_clawMenuFilePickerCompleted"] = createExportWrapper("clawMenuFilePickerCompleted", wasmExports["clawMenuFilePickerCompleted"], 3);
  _SDL_malloc = Module["_SDL_malloc"] = createExportWrapper("SDL_malloc", wasmExports["SDL_malloc"], 1);
  _SDL_calloc = Module["_SDL_calloc"] = createExportWrapper("SDL_calloc", wasmExports["SDL_calloc"], 2);
  _Emscripten_force_free = Module["_Emscripten_force_free"] = createExportWrapper("Emscripten_force_free", wasmExports["Emscripten_force_free"], 1);
  _SDL_realloc = Module["_SDL_realloc"] = createExportWrapper("SDL_realloc", wasmExports["SDL_realloc"], 2);
  _strerror = createExportWrapper("strerror", wasmExports["strerror"], 1);
  _SDLEmscriptenCameraPermissionOutcome = Module["_SDLEmscriptenCameraPermissionOutcome"] = createExportWrapper("SDLEmscriptenCameraPermissionOutcome", wasmExports["SDLEmscriptenCameraPermissionOutcome"], 5);
  _SDLEmscriptenThreadIterate = Module["_SDLEmscriptenThreadIterate"] = createExportWrapper("SDLEmscriptenThreadIterate", wasmExports["SDLEmscriptenThreadIterate"], 1);
  _Emscripten_HandlePointerEnter = Module["_Emscripten_HandlePointerEnter"] = createExportWrapper("Emscripten_HandlePointerEnter", wasmExports["Emscripten_HandlePointerEnter"], 2);
  _Emscripten_HandlePointerLeave = Module["_Emscripten_HandlePointerLeave"] = createExportWrapper("Emscripten_HandlePointerLeave", wasmExports["Emscripten_HandlePointerLeave"], 2);
  _Emscripten_HandlePointerGeneric = Module["_Emscripten_HandlePointerGeneric"] = createExportWrapper("Emscripten_HandlePointerGeneric", wasmExports["Emscripten_HandlePointerGeneric"], 2);
  _Emscripten_HandleMouseButtonUpGlobal = Module["_Emscripten_HandleMouseButtonUpGlobal"] = createExportWrapper("Emscripten_HandleMouseButtonUpGlobal", wasmExports["Emscripten_HandleMouseButtonUpGlobal"], 2);
  _Emscripten_SendDragEvent = Module["_Emscripten_SendDragEvent"] = createExportWrapper("Emscripten_SendDragEvent", wasmExports["Emscripten_SendDragEvent"], 2);
  _Emscripten_SendDragCompleteEvent = Module["_Emscripten_SendDragCompleteEvent"] = createExportWrapper("Emscripten_SendDragCompleteEvent", wasmExports["Emscripten_SendDragCompleteEvent"], 1);
  _Emscripten_SendDragTextEvent = Module["_Emscripten_SendDragTextEvent"] = createExportWrapper("Emscripten_SendDragTextEvent", wasmExports["Emscripten_SendDragTextEvent"], 2);
  _Emscripten_SendDragFileEvent = Module["_Emscripten_SendDragFileEvent"] = createExportWrapper("Emscripten_SendDragFileEvent", wasmExports["Emscripten_SendDragFileEvent"], 2);
  _Emscripten_HandleLockKeysCheck = Module["_Emscripten_HandleLockKeysCheck"] = createExportWrapper("Emscripten_HandleLockKeysCheck", wasmExports["Emscripten_HandleLockKeysCheck"], 4);
  _Emscripten_SendSystemThemeChangedEvent = Module["_Emscripten_SendSystemThemeChangedEvent"] = createExportWrapper("Emscripten_SendSystemThemeChangedEvent", wasmExports["Emscripten_SendSystemThemeChangedEvent"], 0);
  _requestFullscreenThroughSDL = Module["_requestFullscreenThroughSDL"] = createExportWrapper("requestFullscreenThroughSDL", wasmExports["requestFullscreenThroughSDL"], 1);
  _emscripten_stack_get_end = wasmExports["emscripten_stack_get_end"];
  _emscripten_stack_get_base = wasmExports["emscripten_stack_get_base"];
  _setThrew = createExportWrapper("setThrew", wasmExports["setThrew"], 2);
  __emscripten_tempret_set = createExportWrapper("_emscripten_tempret_set", wasmExports["_emscripten_tempret_set"], 1);
  _emscripten_stack_init = wasmExports["emscripten_stack_init"];
  _emscripten_stack_get_free = wasmExports["emscripten_stack_get_free"];
  __emscripten_stack_restore = wasmExports["_emscripten_stack_restore"];
  __emscripten_stack_alloc = wasmExports["_emscripten_stack_alloc"];
  _emscripten_stack_get_current = wasmExports["emscripten_stack_get_current"];
  ___cxa_decrement_exception_refcount = createExportWrapper("__cxa_decrement_exception_refcount", wasmExports["__cxa_decrement_exception_refcount"], 1);
  ___cxa_increment_exception_refcount = createExportWrapper("__cxa_increment_exception_refcount", wasmExports["__cxa_increment_exception_refcount"], 1);
  ___get_exception_message = createExportWrapper("__get_exception_message", wasmExports["__get_exception_message"], 3);
  ___cxa_can_catch = createExportWrapper("__cxa_can_catch", wasmExports["__cxa_can_catch"], 3);
  ___cxa_get_exception_ptr = createExportWrapper("__cxa_get_exception_ptr", wasmExports["__cxa_get_exception_ptr"], 1);
  memory = wasmMemory = wasmExports["memory"];
  __indirect_function_table = wasmTable = wasmExports["__indirect_function_table"];
}

var wasmImports = {
  /** @export */ __assert_fail: ___assert_fail,
  /** @export */ __cxa_begin_catch: ___cxa_begin_catch,
  /** @export */ __cxa_current_primary_exception: ___cxa_current_primary_exception,
  /** @export */ __cxa_end_catch: ___cxa_end_catch,
  /** @export */ __cxa_find_matching_catch_2: ___cxa_find_matching_catch_2,
  /** @export */ __cxa_find_matching_catch_3: ___cxa_find_matching_catch_3,
  /** @export */ __cxa_find_matching_catch_4: ___cxa_find_matching_catch_4,
  /** @export */ __cxa_find_matching_catch_5: ___cxa_find_matching_catch_5,
  /** @export */ __cxa_rethrow: ___cxa_rethrow,
  /** @export */ __cxa_rethrow_primary_exception: ___cxa_rethrow_primary_exception,
  /** @export */ __cxa_throw: ___cxa_throw,
  /** @export */ __cxa_uncaught_exceptions: ___cxa_uncaught_exceptions,
  /** @export */ __resumeException: ___resumeException,
  /** @export */ __syscall_chmod: ___syscall_chmod,
  /** @export */ __syscall_fchmod: ___syscall_fchmod,
  /** @export */ __syscall_fcntl64: ___syscall_fcntl64,
  /** @export */ __syscall_fdatasync: ___syscall_fdatasync,
  /** @export */ __syscall_fstat64: ___syscall_fstat64,
  /** @export */ __syscall_ftruncate64: ___syscall_ftruncate64,
  /** @export */ __syscall_getcwd: ___syscall_getcwd,
  /** @export */ __syscall_getdents64: ___syscall_getdents64,
  /** @export */ __syscall_ioctl: ___syscall_ioctl,
  /** @export */ __syscall_lstat64: ___syscall_lstat64,
  /** @export */ __syscall_mkdirat: ___syscall_mkdirat,
  /** @export */ __syscall_newfstatat: ___syscall_newfstatat,
  /** @export */ __syscall_openat: ___syscall_openat,
  /** @export */ __syscall_renameat: ___syscall_renameat,
  /** @export */ __syscall_rmdir: ___syscall_rmdir,
  /** @export */ __syscall_stat64: ___syscall_stat64,
  /** @export */ __syscall_unlinkat: ___syscall_unlinkat,
  /** @export */ _abort_js: __abort_js,
  /** @export */ _gmtime_js: __gmtime_js,
  /** @export */ _localtime_js: __localtime_js,
  /** @export */ _tzset_js: __tzset_js,
  /** @export */ clawActivityConnect,
  /** @export */ clawActivityDisconnect,
  /** @export */ clawActivityError,
  /** @export */ clawActivityPresence,
  /** @export */ clawActivityStatus,
  /** @export */ clock_time_get: _clock_time_get,
  /** @export */ emscripten_asm_const_double: _emscripten_asm_const_double,
  /** @export */ emscripten_asm_const_double_sync_on_main_thread: _emscripten_asm_const_double_sync_on_main_thread,
  /** @export */ emscripten_asm_const_int: _emscripten_asm_const_int,
  /** @export */ emscripten_asm_const_int_sync_on_main_thread: _emscripten_asm_const_int_sync_on_main_thread,
  /** @export */ emscripten_asm_const_ptr: _emscripten_asm_const_ptr,
  /** @export */ emscripten_asm_const_ptr_sync_on_main_thread: _emscripten_asm_const_ptr_sync_on_main_thread,
  /** @export */ emscripten_cancel_main_loop: _emscripten_cancel_main_loop,
  /** @export */ emscripten_date_now: _emscripten_date_now,
  /** @export */ emscripten_err: _emscripten_err,
  /** @export */ emscripten_exit_fullscreen: _emscripten_exit_fullscreen,
  /** @export */ emscripten_exit_pointerlock: _emscripten_exit_pointerlock,
  /** @export */ emscripten_get_device_pixel_ratio: _emscripten_get_device_pixel_ratio,
  /** @export */ emscripten_get_element_css_size: _emscripten_get_element_css_size,
  /** @export */ emscripten_get_fullscreen_status: _emscripten_get_fullscreen_status,
  /** @export */ emscripten_get_gamepad_status: _emscripten_get_gamepad_status,
  /** @export */ emscripten_get_heap_max: _emscripten_get_heap_max,
  /** @export */ emscripten_get_main_loop_timing: _emscripten_get_main_loop_timing,
  /** @export */ emscripten_get_now: _emscripten_get_now,
  /** @export */ emscripten_get_num_gamepads: _emscripten_get_num_gamepads,
  /** @export */ emscripten_get_preloaded_image_data: _emscripten_get_preloaded_image_data,
  /** @export */ emscripten_get_preloaded_image_data_from_FILE: _emscripten_get_preloaded_image_data_from_FILE,
  /** @export */ emscripten_get_screen_size: _emscripten_get_screen_size,
  /** @export */ emscripten_glActiveTexture: _emscripten_glActiveTexture,
  /** @export */ emscripten_glAttachShader: _emscripten_glAttachShader,
  /** @export */ emscripten_glBeginQueryEXT: _emscripten_glBeginQueryEXT,
  /** @export */ emscripten_glBindAttribLocation: _emscripten_glBindAttribLocation,
  /** @export */ emscripten_glBindBuffer: _emscripten_glBindBuffer,
  /** @export */ emscripten_glBindFramebuffer: _emscripten_glBindFramebuffer,
  /** @export */ emscripten_glBindRenderbuffer: _emscripten_glBindRenderbuffer,
  /** @export */ emscripten_glBindTexture: _emscripten_glBindTexture,
  /** @export */ emscripten_glBindVertexArrayOES: _emscripten_glBindVertexArrayOES,
  /** @export */ emscripten_glBlendColor: _emscripten_glBlendColor,
  /** @export */ emscripten_glBlendEquation: _emscripten_glBlendEquation,
  /** @export */ emscripten_glBlendEquationSeparate: _emscripten_glBlendEquationSeparate,
  /** @export */ emscripten_glBlendFunc: _emscripten_glBlendFunc,
  /** @export */ emscripten_glBlendFuncSeparate: _emscripten_glBlendFuncSeparate,
  /** @export */ emscripten_glBufferData: _emscripten_glBufferData,
  /** @export */ emscripten_glBufferSubData: _emscripten_glBufferSubData,
  /** @export */ emscripten_glCheckFramebufferStatus: _emscripten_glCheckFramebufferStatus,
  /** @export */ emscripten_glClear: _emscripten_glClear,
  /** @export */ emscripten_glClearColor: _emscripten_glClearColor,
  /** @export */ emscripten_glClearDepthf: _emscripten_glClearDepthf,
  /** @export */ emscripten_glClearStencil: _emscripten_glClearStencil,
  /** @export */ emscripten_glClipControlEXT: _emscripten_glClipControlEXT,
  /** @export */ emscripten_glColorMask: _emscripten_glColorMask,
  /** @export */ emscripten_glCompileShader: _emscripten_glCompileShader,
  /** @export */ emscripten_glCompressedTexImage2D: _emscripten_glCompressedTexImage2D,
  /** @export */ emscripten_glCompressedTexSubImage2D: _emscripten_glCompressedTexSubImage2D,
  /** @export */ emscripten_glCopyTexImage2D: _emscripten_glCopyTexImage2D,
  /** @export */ emscripten_glCopyTexSubImage2D: _emscripten_glCopyTexSubImage2D,
  /** @export */ emscripten_glCreateProgram: _emscripten_glCreateProgram,
  /** @export */ emscripten_glCreateShader: _emscripten_glCreateShader,
  /** @export */ emscripten_glCullFace: _emscripten_glCullFace,
  /** @export */ emscripten_glDeleteBuffers: _emscripten_glDeleteBuffers,
  /** @export */ emscripten_glDeleteFramebuffers: _emscripten_glDeleteFramebuffers,
  /** @export */ emscripten_glDeleteProgram: _emscripten_glDeleteProgram,
  /** @export */ emscripten_glDeleteQueriesEXT: _emscripten_glDeleteQueriesEXT,
  /** @export */ emscripten_glDeleteRenderbuffers: _emscripten_glDeleteRenderbuffers,
  /** @export */ emscripten_glDeleteShader: _emscripten_glDeleteShader,
  /** @export */ emscripten_glDeleteTextures: _emscripten_glDeleteTextures,
  /** @export */ emscripten_glDeleteVertexArraysOES: _emscripten_glDeleteVertexArraysOES,
  /** @export */ emscripten_glDepthFunc: _emscripten_glDepthFunc,
  /** @export */ emscripten_glDepthMask: _emscripten_glDepthMask,
  /** @export */ emscripten_glDepthRangef: _emscripten_glDepthRangef,
  /** @export */ emscripten_glDetachShader: _emscripten_glDetachShader,
  /** @export */ emscripten_glDisable: _emscripten_glDisable,
  /** @export */ emscripten_glDisableVertexAttribArray: _emscripten_glDisableVertexAttribArray,
  /** @export */ emscripten_glDrawArrays: _emscripten_glDrawArrays,
  /** @export */ emscripten_glDrawArraysInstancedANGLE: _emscripten_glDrawArraysInstancedANGLE,
  /** @export */ emscripten_glDrawBuffersWEBGL: _emscripten_glDrawBuffersWEBGL,
  /** @export */ emscripten_glDrawElements: _emscripten_glDrawElements,
  /** @export */ emscripten_glDrawElementsInstancedANGLE: _emscripten_glDrawElementsInstancedANGLE,
  /** @export */ emscripten_glEnable: _emscripten_glEnable,
  /** @export */ emscripten_glEnableVertexAttribArray: _emscripten_glEnableVertexAttribArray,
  /** @export */ emscripten_glEndQueryEXT: _emscripten_glEndQueryEXT,
  /** @export */ emscripten_glFinish: _emscripten_glFinish,
  /** @export */ emscripten_glFlush: _emscripten_glFlush,
  /** @export */ emscripten_glFramebufferRenderbuffer: _emscripten_glFramebufferRenderbuffer,
  /** @export */ emscripten_glFramebufferTexture2D: _emscripten_glFramebufferTexture2D,
  /** @export */ emscripten_glFrontFace: _emscripten_glFrontFace,
  /** @export */ emscripten_glGenBuffers: _emscripten_glGenBuffers,
  /** @export */ emscripten_glGenFramebuffers: _emscripten_glGenFramebuffers,
  /** @export */ emscripten_glGenQueriesEXT: _emscripten_glGenQueriesEXT,
  /** @export */ emscripten_glGenRenderbuffers: _emscripten_glGenRenderbuffers,
  /** @export */ emscripten_glGenTextures: _emscripten_glGenTextures,
  /** @export */ emscripten_glGenVertexArraysOES: _emscripten_glGenVertexArraysOES,
  /** @export */ emscripten_glGenerateMipmap: _emscripten_glGenerateMipmap,
  /** @export */ emscripten_glGetActiveAttrib: _emscripten_glGetActiveAttrib,
  /** @export */ emscripten_glGetActiveUniform: _emscripten_glGetActiveUniform,
  /** @export */ emscripten_glGetAttachedShaders: _emscripten_glGetAttachedShaders,
  /** @export */ emscripten_glGetAttribLocation: _emscripten_glGetAttribLocation,
  /** @export */ emscripten_glGetBooleanv: _emscripten_glGetBooleanv,
  /** @export */ emscripten_glGetBufferParameteriv: _emscripten_glGetBufferParameteriv,
  /** @export */ emscripten_glGetError: _emscripten_glGetError,
  /** @export */ emscripten_glGetFloatv: _emscripten_glGetFloatv,
  /** @export */ emscripten_glGetFramebufferAttachmentParameteriv: _emscripten_glGetFramebufferAttachmentParameteriv,
  /** @export */ emscripten_glGetIntegerv: _emscripten_glGetIntegerv,
  /** @export */ emscripten_glGetProgramInfoLog: _emscripten_glGetProgramInfoLog,
  /** @export */ emscripten_glGetProgramiv: _emscripten_glGetProgramiv,
  /** @export */ emscripten_glGetQueryObjecti64vEXT: _emscripten_glGetQueryObjecti64vEXT,
  /** @export */ emscripten_glGetQueryObjectivEXT: _emscripten_glGetQueryObjectivEXT,
  /** @export */ emscripten_glGetQueryObjectui64vEXT: _emscripten_glGetQueryObjectui64vEXT,
  /** @export */ emscripten_glGetQueryObjectuivEXT: _emscripten_glGetQueryObjectuivEXT,
  /** @export */ emscripten_glGetQueryivEXT: _emscripten_glGetQueryivEXT,
  /** @export */ emscripten_glGetRenderbufferParameteriv: _emscripten_glGetRenderbufferParameteriv,
  /** @export */ emscripten_glGetShaderInfoLog: _emscripten_glGetShaderInfoLog,
  /** @export */ emscripten_glGetShaderPrecisionFormat: _emscripten_glGetShaderPrecisionFormat,
  /** @export */ emscripten_glGetShaderSource: _emscripten_glGetShaderSource,
  /** @export */ emscripten_glGetShaderiv: _emscripten_glGetShaderiv,
  /** @export */ emscripten_glGetString: _emscripten_glGetString,
  /** @export */ emscripten_glGetTexParameterfv: _emscripten_glGetTexParameterfv,
  /** @export */ emscripten_glGetTexParameteriv: _emscripten_glGetTexParameteriv,
  /** @export */ emscripten_glGetUniformLocation: _emscripten_glGetUniformLocation,
  /** @export */ emscripten_glGetUniformfv: _emscripten_glGetUniformfv,
  /** @export */ emscripten_glGetUniformiv: _emscripten_glGetUniformiv,
  /** @export */ emscripten_glGetVertexAttribPointerv: _emscripten_glGetVertexAttribPointerv,
  /** @export */ emscripten_glGetVertexAttribfv: _emscripten_glGetVertexAttribfv,
  /** @export */ emscripten_glGetVertexAttribiv: _emscripten_glGetVertexAttribiv,
  /** @export */ emscripten_glHint: _emscripten_glHint,
  /** @export */ emscripten_glIsBuffer: _emscripten_glIsBuffer,
  /** @export */ emscripten_glIsEnabled: _emscripten_glIsEnabled,
  /** @export */ emscripten_glIsFramebuffer: _emscripten_glIsFramebuffer,
  /** @export */ emscripten_glIsProgram: _emscripten_glIsProgram,
  /** @export */ emscripten_glIsQueryEXT: _emscripten_glIsQueryEXT,
  /** @export */ emscripten_glIsRenderbuffer: _emscripten_glIsRenderbuffer,
  /** @export */ emscripten_glIsShader: _emscripten_glIsShader,
  /** @export */ emscripten_glIsTexture: _emscripten_glIsTexture,
  /** @export */ emscripten_glIsVertexArrayOES: _emscripten_glIsVertexArrayOES,
  /** @export */ emscripten_glLineWidth: _emscripten_glLineWidth,
  /** @export */ emscripten_glLinkProgram: _emscripten_glLinkProgram,
  /** @export */ emscripten_glPixelStorei: _emscripten_glPixelStorei,
  /** @export */ emscripten_glPolygonModeWEBGL: _emscripten_glPolygonModeWEBGL,
  /** @export */ emscripten_glPolygonOffset: _emscripten_glPolygonOffset,
  /** @export */ emscripten_glPolygonOffsetClampEXT: _emscripten_glPolygonOffsetClampEXT,
  /** @export */ emscripten_glQueryCounterEXT: _emscripten_glQueryCounterEXT,
  /** @export */ emscripten_glReadPixels: _emscripten_glReadPixels,
  /** @export */ emscripten_glReleaseShaderCompiler: _emscripten_glReleaseShaderCompiler,
  /** @export */ emscripten_glRenderbufferStorage: _emscripten_glRenderbufferStorage,
  /** @export */ emscripten_glSampleCoverage: _emscripten_glSampleCoverage,
  /** @export */ emscripten_glScissor: _emscripten_glScissor,
  /** @export */ emscripten_glShaderBinary: _emscripten_glShaderBinary,
  /** @export */ emscripten_glShaderSource: _emscripten_glShaderSource,
  /** @export */ emscripten_glStencilFunc: _emscripten_glStencilFunc,
  /** @export */ emscripten_glStencilFuncSeparate: _emscripten_glStencilFuncSeparate,
  /** @export */ emscripten_glStencilMask: _emscripten_glStencilMask,
  /** @export */ emscripten_glStencilMaskSeparate: _emscripten_glStencilMaskSeparate,
  /** @export */ emscripten_glStencilOp: _emscripten_glStencilOp,
  /** @export */ emscripten_glStencilOpSeparate: _emscripten_glStencilOpSeparate,
  /** @export */ emscripten_glTexImage2D: _emscripten_glTexImage2D,
  /** @export */ emscripten_glTexParameterf: _emscripten_glTexParameterf,
  /** @export */ emscripten_glTexParameterfv: _emscripten_glTexParameterfv,
  /** @export */ emscripten_glTexParameteri: _emscripten_glTexParameteri,
  /** @export */ emscripten_glTexParameteriv: _emscripten_glTexParameteriv,
  /** @export */ emscripten_glTexSubImage2D: _emscripten_glTexSubImage2D,
  /** @export */ emscripten_glUniform1f: _emscripten_glUniform1f,
  /** @export */ emscripten_glUniform1fv: _emscripten_glUniform1fv,
  /** @export */ emscripten_glUniform1i: _emscripten_glUniform1i,
  /** @export */ emscripten_glUniform1iv: _emscripten_glUniform1iv,
  /** @export */ emscripten_glUniform2f: _emscripten_glUniform2f,
  /** @export */ emscripten_glUniform2fv: _emscripten_glUniform2fv,
  /** @export */ emscripten_glUniform2i: _emscripten_glUniform2i,
  /** @export */ emscripten_glUniform2iv: _emscripten_glUniform2iv,
  /** @export */ emscripten_glUniform3f: _emscripten_glUniform3f,
  /** @export */ emscripten_glUniform3fv: _emscripten_glUniform3fv,
  /** @export */ emscripten_glUniform3i: _emscripten_glUniform3i,
  /** @export */ emscripten_glUniform3iv: _emscripten_glUniform3iv,
  /** @export */ emscripten_glUniform4f: _emscripten_glUniform4f,
  /** @export */ emscripten_glUniform4fv: _emscripten_glUniform4fv,
  /** @export */ emscripten_glUniform4i: _emscripten_glUniform4i,
  /** @export */ emscripten_glUniform4iv: _emscripten_glUniform4iv,
  /** @export */ emscripten_glUniformMatrix2fv: _emscripten_glUniformMatrix2fv,
  /** @export */ emscripten_glUniformMatrix3fv: _emscripten_glUniformMatrix3fv,
  /** @export */ emscripten_glUniformMatrix4fv: _emscripten_glUniformMatrix4fv,
  /** @export */ emscripten_glUseProgram: _emscripten_glUseProgram,
  /** @export */ emscripten_glValidateProgram: _emscripten_glValidateProgram,
  /** @export */ emscripten_glVertexAttrib1f: _emscripten_glVertexAttrib1f,
  /** @export */ emscripten_glVertexAttrib1fv: _emscripten_glVertexAttrib1fv,
  /** @export */ emscripten_glVertexAttrib2f: _emscripten_glVertexAttrib2f,
  /** @export */ emscripten_glVertexAttrib2fv: _emscripten_glVertexAttrib2fv,
  /** @export */ emscripten_glVertexAttrib3f: _emscripten_glVertexAttrib3f,
  /** @export */ emscripten_glVertexAttrib3fv: _emscripten_glVertexAttrib3fv,
  /** @export */ emscripten_glVertexAttrib4f: _emscripten_glVertexAttrib4f,
  /** @export */ emscripten_glVertexAttrib4fv: _emscripten_glVertexAttrib4fv,
  /** @export */ emscripten_glVertexAttribDivisorANGLE: _emscripten_glVertexAttribDivisorANGLE,
  /** @export */ emscripten_glVertexAttribPointer: _emscripten_glVertexAttribPointer,
  /** @export */ emscripten_glViewport: _emscripten_glViewport,
  /** @export */ emscripten_has_asyncify: _emscripten_has_asyncify,
  /** @export */ emscripten_request_fullscreen_strategy: _emscripten_request_fullscreen_strategy,
  /** @export */ emscripten_request_pointerlock: _emscripten_request_pointerlock,
  /** @export */ emscripten_resize_heap: _emscripten_resize_heap,
  /** @export */ emscripten_run_script: _emscripten_run_script,
  /** @export */ emscripten_sample_gamepad_data: _emscripten_sample_gamepad_data,
  /** @export */ emscripten_set_beforeunload_callback_on_thread: _emscripten_set_beforeunload_callback_on_thread,
  /** @export */ emscripten_set_blur_callback_on_thread: _emscripten_set_blur_callback_on_thread,
  /** @export */ emscripten_set_canvas_element_size: _emscripten_set_canvas_element_size,
  /** @export */ emscripten_set_devicemotion_callback_on_thread: _emscripten_set_devicemotion_callback_on_thread,
  /** @export */ emscripten_set_element_css_size: _emscripten_set_element_css_size,
  /** @export */ emscripten_set_focus_callback_on_thread: _emscripten_set_focus_callback_on_thread,
  /** @export */ emscripten_set_fullscreenchange_callback_on_thread: _emscripten_set_fullscreenchange_callback_on_thread,
  /** @export */ emscripten_set_gamepadconnected_callback_on_thread: _emscripten_set_gamepadconnected_callback_on_thread,
  /** @export */ emscripten_set_gamepaddisconnected_callback_on_thread: _emscripten_set_gamepaddisconnected_callback_on_thread,
  /** @export */ emscripten_set_keydown_callback_on_thread: _emscripten_set_keydown_callback_on_thread,
  /** @export */ emscripten_set_keypress_callback_on_thread: _emscripten_set_keypress_callback_on_thread,
  /** @export */ emscripten_set_keyup_callback_on_thread: _emscripten_set_keyup_callback_on_thread,
  /** @export */ emscripten_set_main_loop: _emscripten_set_main_loop,
  /** @export */ emscripten_set_main_loop_timing: _emscripten_set_main_loop_timing,
  /** @export */ emscripten_set_orientationchange_callback_on_thread: _emscripten_set_orientationchange_callback_on_thread,
  /** @export */ emscripten_set_pointerlockchange_callback_on_thread: _emscripten_set_pointerlockchange_callback_on_thread,
  /** @export */ emscripten_set_resize_callback_on_thread: _emscripten_set_resize_callback_on_thread,
  /** @export */ emscripten_set_visibilitychange_callback_on_thread: _emscripten_set_visibilitychange_callback_on_thread,
  /** @export */ emscripten_set_wheel_callback_on_thread: _emscripten_set_wheel_callback_on_thread,
  /** @export */ emscripten_set_window_title: _emscripten_set_window_title,
  /** @export */ emscripten_sleep: _emscripten_sleep,
  /** @export */ emscripten_webgl_create_context: _emscripten_webgl_create_context,
  /** @export */ emscripten_webgl_destroy_context: _emscripten_webgl_destroy_context,
  /** @export */ emscripten_webgl_make_context_current: _emscripten_webgl_make_context_current,
  /** @export */ emscripten_websocket_close: _emscripten_websocket_close,
  /** @export */ emscripten_websocket_delete: _emscripten_websocket_delete,
  /** @export */ emscripten_websocket_get_buffered_amount: _emscripten_websocket_get_buffered_amount,
  /** @export */ emscripten_websocket_is_supported: _emscripten_websocket_is_supported,
  /** @export */ emscripten_websocket_new: _emscripten_websocket_new,
  /** @export */ emscripten_websocket_send_binary: _emscripten_websocket_send_binary,
  /** @export */ emscripten_websocket_set_onclose_callback_on_thread: _emscripten_websocket_set_onclose_callback_on_thread,
  /** @export */ emscripten_websocket_set_onerror_callback_on_thread: _emscripten_websocket_set_onerror_callback_on_thread,
  /** @export */ emscripten_websocket_set_onmessage_callback_on_thread: _emscripten_websocket_set_onmessage_callback_on_thread,
  /** @export */ emscripten_websocket_set_onopen_callback_on_thread: _emscripten_websocket_set_onopen_callback_on_thread,
  /** @export */ environ_get: _environ_get,
  /** @export */ environ_sizes_get: _environ_sizes_get,
  /** @export */ exit: _exit,
  /** @export */ fd_close: _fd_close,
  /** @export */ fd_fdstat_get: _fd_fdstat_get,
  /** @export */ fd_read: _fd_read,
  /** @export */ fd_seek: _fd_seek,
  /** @export */ fd_write: _fd_write,
  /** @export */ invoke_d,
  /** @export */ invoke_diii,
  /** @export */ invoke_fiff,
  /** @export */ invoke_fii,
  /** @export */ invoke_fiifi,
  /** @export */ invoke_fiii,
  /** @export */ invoke_fiiii,
  /** @export */ invoke_i,
  /** @export */ invoke_idiii,
  /** @export */ invoke_ii,
  /** @export */ invoke_iif,
  /** @export */ invoke_iiffff,
  /** @export */ invoke_iii,
  /** @export */ invoke_iiii,
  /** @export */ invoke_iiiii,
  /** @export */ invoke_iiiiidii,
  /** @export */ invoke_iiiiii,
  /** @export */ invoke_iiiiiii,
  /** @export */ invoke_iiiiiiii,
  /** @export */ invoke_iiiiiiiii,
  /** @export */ invoke_iiiiiiiiii,
  /** @export */ invoke_iiiiiiiiiiii,
  /** @export */ invoke_iiiiiiiiiiiii,
  /** @export */ invoke_iiiiij,
  /** @export */ invoke_iiiij,
  /** @export */ invoke_iiiiji,
  /** @export */ invoke_iiij,
  /** @export */ invoke_iiiji,
  /** @export */ invoke_iiijj,
  /** @export */ invoke_iiji,
  /** @export */ invoke_ijjiii,
  /** @export */ invoke_j,
  /** @export */ invoke_ji,
  /** @export */ invoke_jii,
  /** @export */ invoke_jijii,
  /** @export */ invoke_v,
  /** @export */ invoke_vi,
  /** @export */ invoke_vif,
  /** @export */ invoke_vifff,
  /** @export */ invoke_viffffi,
  /** @export */ invoke_vifi,
  /** @export */ invoke_vii,
  /** @export */ invoke_viif,
  /** @export */ invoke_viiff,
  /** @export */ invoke_viifff,
  /** @export */ invoke_viiffif,
  /** @export */ invoke_viiffiii,
  /** @export */ invoke_viii,
  /** @export */ invoke_viiif,
  /** @export */ invoke_viiiffffiii,
  /** @export */ invoke_viiifffii,
  /** @export */ invoke_viiii,
  /** @export */ invoke_viiiif,
  /** @export */ invoke_viiiifi,
  /** @export */ invoke_viiiii,
  /** @export */ invoke_viiiiif,
  /** @export */ invoke_viiiiii,
  /** @export */ invoke_viiiiiii,
  /** @export */ invoke_viiiiiiii,
  /** @export */ invoke_viiiiiiiiii,
  /** @export */ invoke_viiiiiiiiiiiii,
  /** @export */ invoke_viiiiiiiiiiiiiii,
  /** @export */ invoke_viiji,
  /** @export */ invoke_viijii,
  /** @export */ invoke_vij,
  /** @export */ invoke_viji,
  /** @export */ invoke_vijii,
  /** @export */ invoke_vijiii,
  /** @export */ invoke_vijj,
  /** @export */ invoke_vijjff,
  /** @export */ llvm_eh_typeid_for: _llvm_eh_typeid_for,
  /** @export */ random_get: _random_get,
  /** @export */ syncTouchTextInput
};

function invoke_iii(index, a1, a2) {
  var sp = stackSave();
  try {
    return getWasmTableEntry(index)(a1, a2);
  } catch (e) {
    stackRestore(sp);
    if (!(e instanceof EmscriptenEH)) throw e;
    _setThrew(1, 0);
  }
}

function invoke_viii(index, a1, a2, a3) {
  var sp = stackSave();
  try {
    getWasmTableEntry(index)(a1, a2, a3);
  } catch (e) {
    stackRestore(sp);
    if (!(e instanceof EmscriptenEH)) throw e;
    _setThrew(1, 0);
  }
}

function invoke_ii(index, a1) {
  var sp = stackSave();
  try {
    return getWasmTableEntry(index)(a1);
  } catch (e) {
    stackRestore(sp);
    if (!(e instanceof EmscriptenEH)) throw e;
    _setThrew(1, 0);
  }
}

function invoke_iiii(index, a1, a2, a3) {
  var sp = stackSave();
  try {
    return getWasmTableEntry(index)(a1, a2, a3);
  } catch (e) {
    stackRestore(sp);
    if (!(e instanceof EmscriptenEH)) throw e;
    _setThrew(1, 0);
  }
}

function invoke_vii(index, a1, a2) {
  var sp = stackSave();
  try {
    getWasmTableEntry(index)(a1, a2);
  } catch (e) {
    stackRestore(sp);
    if (!(e instanceof EmscriptenEH)) throw e;
    _setThrew(1, 0);
  }
}

function invoke_v(index) {
  var sp = stackSave();
  try {
    getWasmTableEntry(index)();
  } catch (e) {
    stackRestore(sp);
    if (!(e instanceof EmscriptenEH)) throw e;
    _setThrew(1, 0);
  }
}

function invoke_viiiiiiii(index, a1, a2, a3, a4, a5, a6, a7, a8) {
  var sp = stackSave();
  try {
    getWasmTableEntry(index)(a1, a2, a3, a4, a5, a6, a7, a8);
  } catch (e) {
    stackRestore(sp);
    if (!(e instanceof EmscriptenEH)) throw e;
    _setThrew(1, 0);
  }
}

function invoke_vij(index, a1, a2) {
  var sp = stackSave();
  try {
    getWasmTableEntry(index)(a1, a2);
  } catch (e) {
    stackRestore(sp);
    if (!(e instanceof EmscriptenEH)) throw e;
    _setThrew(1, 0);
  }
}

function invoke_vi(index, a1) {
  var sp = stackSave();
  try {
    getWasmTableEntry(index)(a1);
  } catch (e) {
    stackRestore(sp);
    if (!(e instanceof EmscriptenEH)) throw e;
    _setThrew(1, 0);
  }
}

function invoke_viiii(index, a1, a2, a3, a4) {
  var sp = stackSave();
  try {
    getWasmTableEntry(index)(a1, a2, a3, a4);
  } catch (e) {
    stackRestore(sp);
    if (!(e instanceof EmscriptenEH)) throw e;
    _setThrew(1, 0);
  }
}

function invoke_iiiii(index, a1, a2, a3, a4) {
  var sp = stackSave();
  try {
    return getWasmTableEntry(index)(a1, a2, a3, a4);
  } catch (e) {
    stackRestore(sp);
    if (!(e instanceof EmscriptenEH)) throw e;
    _setThrew(1, 0);
  }
}

function invoke_i(index) {
  var sp = stackSave();
  try {
    return getWasmTableEntry(index)();
  } catch (e) {
    stackRestore(sp);
    if (!(e instanceof EmscriptenEH)) throw e;
    _setThrew(1, 0);
  }
}

function invoke_viiiiii(index, a1, a2, a3, a4, a5, a6) {
  var sp = stackSave();
  try {
    getWasmTableEntry(index)(a1, a2, a3, a4, a5, a6);
  } catch (e) {
    stackRestore(sp);
    if (!(e instanceof EmscriptenEH)) throw e;
    _setThrew(1, 0);
  }
}

function invoke_ji(index, a1) {
  var sp = stackSave();
  try {
    return getWasmTableEntry(index)(a1);
  } catch (e) {
    stackRestore(sp);
    if (!(e instanceof EmscriptenEH)) throw e;
    _setThrew(1, 0);
    return 0n;
  }
}

function invoke_j(index) {
  var sp = stackSave();
  try {
    return getWasmTableEntry(index)();
  } catch (e) {
    stackRestore(sp);
    if (!(e instanceof EmscriptenEH)) throw e;
    _setThrew(1, 0);
    return 0n;
  }
}

function invoke_idiii(index, a1, a2, a3, a4) {
  var sp = stackSave();
  try {
    return getWasmTableEntry(index)(a1, a2, a3, a4);
  } catch (e) {
    stackRestore(sp);
    if (!(e instanceof EmscriptenEH)) throw e;
    _setThrew(1, 0);
  }
}

function invoke_ijjiii(index, a1, a2, a3, a4, a5) {
  var sp = stackSave();
  try {
    return getWasmTableEntry(index)(a1, a2, a3, a4, a5);
  } catch (e) {
    stackRestore(sp);
    if (!(e instanceof EmscriptenEH)) throw e;
    _setThrew(1, 0);
  }
}

function invoke_iiiiiii(index, a1, a2, a3, a4, a5, a6) {
  var sp = stackSave();
  try {
    return getWasmTableEntry(index)(a1, a2, a3, a4, a5, a6);
  } catch (e) {
    stackRestore(sp);
    if (!(e instanceof EmscriptenEH)) throw e;
    _setThrew(1, 0);
  }
}

function invoke_iiiiii(index, a1, a2, a3, a4, a5) {
  var sp = stackSave();
  try {
    return getWasmTableEntry(index)(a1, a2, a3, a4, a5);
  } catch (e) {
    stackRestore(sp);
    if (!(e instanceof EmscriptenEH)) throw e;
    _setThrew(1, 0);
  }
}

function invoke_viiiiif(index, a1, a2, a3, a4, a5, a6) {
  var sp = stackSave();
  try {
    getWasmTableEntry(index)(a1, a2, a3, a4, a5, a6);
  } catch (e) {
    stackRestore(sp);
    if (!(e instanceof EmscriptenEH)) throw e;
    _setThrew(1, 0);
  }
}

function invoke_viiifffii(index, a1, a2, a3, a4, a5, a6, a7, a8) {
  var sp = stackSave();
  try {
    getWasmTableEntry(index)(a1, a2, a3, a4, a5, a6, a7, a8);
  } catch (e) {
    stackRestore(sp);
    if (!(e instanceof EmscriptenEH)) throw e;
    _setThrew(1, 0);
  }
}

function invoke_viiiiiii(index, a1, a2, a3, a4, a5, a6, a7) {
  var sp = stackSave();
  try {
    getWasmTableEntry(index)(a1, a2, a3, a4, a5, a6, a7);
  } catch (e) {
    stackRestore(sp);
    if (!(e instanceof EmscriptenEH)) throw e;
    _setThrew(1, 0);
  }
}

function invoke_viiiii(index, a1, a2, a3, a4, a5) {
  var sp = stackSave();
  try {
    getWasmTableEntry(index)(a1, a2, a3, a4, a5);
  } catch (e) {
    stackRestore(sp);
    if (!(e instanceof EmscriptenEH)) throw e;
    _setThrew(1, 0);
  }
}

function invoke_iiiiiiii(index, a1, a2, a3, a4, a5, a6, a7) {
  var sp = stackSave();
  try {
    return getWasmTableEntry(index)(a1, a2, a3, a4, a5, a6, a7);
  } catch (e) {
    stackRestore(sp);
    if (!(e instanceof EmscriptenEH)) throw e;
    _setThrew(1, 0);
  }
}

function invoke_d(index) {
  var sp = stackSave();
  try {
    return getWasmTableEntry(index)();
  } catch (e) {
    stackRestore(sp);
    if (!(e instanceof EmscriptenEH)) throw e;
    _setThrew(1, 0);
  }
}

function invoke_iiiij(index, a1, a2, a3, a4) {
  var sp = stackSave();
  try {
    return getWasmTableEntry(index)(a1, a2, a3, a4);
  } catch (e) {
    stackRestore(sp);
    if (!(e instanceof EmscriptenEH)) throw e;
    _setThrew(1, 0);
  }
}

function invoke_viiiif(index, a1, a2, a3, a4, a5) {
  var sp = stackSave();
  try {
    getWasmTableEntry(index)(a1, a2, a3, a4, a5);
  } catch (e) {
    stackRestore(sp);
    if (!(e instanceof EmscriptenEH)) throw e;
    _setThrew(1, 0);
  }
}

function invoke_fiii(index, a1, a2, a3) {
  var sp = stackSave();
  try {
    return getWasmTableEntry(index)(a1, a2, a3);
  } catch (e) {
    stackRestore(sp);
    if (!(e instanceof EmscriptenEH)) throw e;
    _setThrew(1, 0);
  }
}

function invoke_iiiiidii(index, a1, a2, a3, a4, a5, a6, a7) {
  var sp = stackSave();
  try {
    return getWasmTableEntry(index)(a1, a2, a3, a4, a5, a6, a7);
  } catch (e) {
    stackRestore(sp);
    if (!(e instanceof EmscriptenEH)) throw e;
    _setThrew(1, 0);
  }
}

function invoke_iiiiiiiii(index, a1, a2, a3, a4, a5, a6, a7, a8) {
  var sp = stackSave();
  try {
    return getWasmTableEntry(index)(a1, a2, a3, a4, a5, a6, a7, a8);
  } catch (e) {
    stackRestore(sp);
    if (!(e instanceof EmscriptenEH)) throw e;
    _setThrew(1, 0);
  }
}

function invoke_fiiii(index, a1, a2, a3, a4) {
  var sp = stackSave();
  try {
    return getWasmTableEntry(index)(a1, a2, a3, a4);
  } catch (e) {
    stackRestore(sp);
    if (!(e instanceof EmscriptenEH)) throw e;
    _setThrew(1, 0);
  }
}

function invoke_iiffff(index, a1, a2, a3, a4, a5) {
  var sp = stackSave();
  try {
    return getWasmTableEntry(index)(a1, a2, a3, a4, a5);
  } catch (e) {
    stackRestore(sp);
    if (!(e instanceof EmscriptenEH)) throw e;
    _setThrew(1, 0);
  }
}

function invoke_viiffif(index, a1, a2, a3, a4, a5, a6) {
  var sp = stackSave();
  try {
    getWasmTableEntry(index)(a1, a2, a3, a4, a5, a6);
  } catch (e) {
    stackRestore(sp);
    if (!(e instanceof EmscriptenEH)) throw e;
    _setThrew(1, 0);
  }
}

function invoke_viifff(index, a1, a2, a3, a4, a5) {
  var sp = stackSave();
  try {
    getWasmTableEntry(index)(a1, a2, a3, a4, a5);
  } catch (e) {
    stackRestore(sp);
    if (!(e instanceof EmscriptenEH)) throw e;
    _setThrew(1, 0);
  }
}

function invoke_iiji(index, a1, a2, a3) {
  var sp = stackSave();
  try {
    return getWasmTableEntry(index)(a1, a2, a3);
  } catch (e) {
    stackRestore(sp);
    if (!(e instanceof EmscriptenEH)) throw e;
    _setThrew(1, 0);
  }
}

function invoke_iif(index, a1, a2) {
  var sp = stackSave();
  try {
    return getWasmTableEntry(index)(a1, a2);
  } catch (e) {
    stackRestore(sp);
    if (!(e instanceof EmscriptenEH)) throw e;
    _setThrew(1, 0);
  }
}

function invoke_vifi(index, a1, a2, a3) {
  var sp = stackSave();
  try {
    getWasmTableEntry(index)(a1, a2, a3);
  } catch (e) {
    stackRestore(sp);
    if (!(e instanceof EmscriptenEH)) throw e;
    _setThrew(1, 0);
  }
}

function invoke_viffffi(index, a1, a2, a3, a4, a5, a6) {
  var sp = stackSave();
  try {
    getWasmTableEntry(index)(a1, a2, a3, a4, a5, a6);
  } catch (e) {
    stackRestore(sp);
    if (!(e instanceof EmscriptenEH)) throw e;
    _setThrew(1, 0);
  }
}

function invoke_viiji(index, a1, a2, a3, a4) {
  var sp = stackSave();
  try {
    getWasmTableEntry(index)(a1, a2, a3, a4);
  } catch (e) {
    stackRestore(sp);
    if (!(e instanceof EmscriptenEH)) throw e;
    _setThrew(1, 0);
  }
}

function invoke_vijj(index, a1, a2, a3) {
  var sp = stackSave();
  try {
    getWasmTableEntry(index)(a1, a2, a3);
  } catch (e) {
    stackRestore(sp);
    if (!(e instanceof EmscriptenEH)) throw e;
    _setThrew(1, 0);
  }
}

function invoke_viiif(index, a1, a2, a3, a4) {
  var sp = stackSave();
  try {
    getWasmTableEntry(index)(a1, a2, a3, a4);
  } catch (e) {
    stackRestore(sp);
    if (!(e instanceof EmscriptenEH)) throw e;
    _setThrew(1, 0);
  }
}

function invoke_viif(index, a1, a2, a3) {
  var sp = stackSave();
  try {
    getWasmTableEntry(index)(a1, a2, a3);
  } catch (e) {
    stackRestore(sp);
    if (!(e instanceof EmscriptenEH)) throw e;
    _setThrew(1, 0);
  }
}

function invoke_iiij(index, a1, a2, a3) {
  var sp = stackSave();
  try {
    return getWasmTableEntry(index)(a1, a2, a3);
  } catch (e) {
    stackRestore(sp);
    if (!(e instanceof EmscriptenEH)) throw e;
    _setThrew(1, 0);
  }
}

function invoke_vif(index, a1, a2) {
  var sp = stackSave();
  try {
    getWasmTableEntry(index)(a1, a2);
  } catch (e) {
    stackRestore(sp);
    if (!(e instanceof EmscriptenEH)) throw e;
    _setThrew(1, 0);
  }
}

function invoke_fii(index, a1, a2) {
  var sp = stackSave();
  try {
    return getWasmTableEntry(index)(a1, a2);
  } catch (e) {
    stackRestore(sp);
    if (!(e instanceof EmscriptenEH)) throw e;
    _setThrew(1, 0);
  }
}

function invoke_viiiifi(index, a1, a2, a3, a4, a5, a6) {
  var sp = stackSave();
  try {
    getWasmTableEntry(index)(a1, a2, a3, a4, a5, a6);
  } catch (e) {
    stackRestore(sp);
    if (!(e instanceof EmscriptenEH)) throw e;
    _setThrew(1, 0);
  }
}

function invoke_jii(index, a1, a2) {
  var sp = stackSave();
  try {
    return getWasmTableEntry(index)(a1, a2);
  } catch (e) {
    stackRestore(sp);
    if (!(e instanceof EmscriptenEH)) throw e;
    _setThrew(1, 0);
    return 0n;
  }
}

function invoke_iiijj(index, a1, a2, a3, a4) {
  var sp = stackSave();
  try {
    return getWasmTableEntry(index)(a1, a2, a3, a4);
  } catch (e) {
    stackRestore(sp);
    if (!(e instanceof EmscriptenEH)) throw e;
    _setThrew(1, 0);
  }
}

function invoke_fiff(index, a1, a2, a3) {
  var sp = stackSave();
  try {
    return getWasmTableEntry(index)(a1, a2, a3);
  } catch (e) {
    stackRestore(sp);
    if (!(e instanceof EmscriptenEH)) throw e;
    _setThrew(1, 0);
  }
}

function invoke_vijiii(index, a1, a2, a3, a4, a5) {
  var sp = stackSave();
  try {
    getWasmTableEntry(index)(a1, a2, a3, a4, a5);
  } catch (e) {
    stackRestore(sp);
    if (!(e instanceof EmscriptenEH)) throw e;
    _setThrew(1, 0);
  }
}

function invoke_fiifi(index, a1, a2, a3, a4) {
  var sp = stackSave();
  try {
    return getWasmTableEntry(index)(a1, a2, a3, a4);
  } catch (e) {
    stackRestore(sp);
    if (!(e instanceof EmscriptenEH)) throw e;
    _setThrew(1, 0);
  }
}

function invoke_viji(index, a1, a2, a3) {
  var sp = stackSave();
  try {
    getWasmTableEntry(index)(a1, a2, a3);
  } catch (e) {
    stackRestore(sp);
    if (!(e instanceof EmscriptenEH)) throw e;
    _setThrew(1, 0);
  }
}

function invoke_viiffiii(index, a1, a2, a3, a4, a5, a6, a7) {
  var sp = stackSave();
  try {
    getWasmTableEntry(index)(a1, a2, a3, a4, a5, a6, a7);
  } catch (e) {
    stackRestore(sp);
    if (!(e instanceof EmscriptenEH)) throw e;
    _setThrew(1, 0);
  }
}

function invoke_viiiiiiiiiiiii(index, a1, a2, a3, a4, a5, a6, a7, a8, a9, a10, a11, a12, a13) {
  var sp = stackSave();
  try {
    getWasmTableEntry(index)(a1, a2, a3, a4, a5, a6, a7, a8, a9, a10, a11, a12, a13);
  } catch (e) {
    stackRestore(sp);
    if (!(e instanceof EmscriptenEH)) throw e;
    _setThrew(1, 0);
  }
}

function invoke_viiff(index, a1, a2, a3, a4) {
  var sp = stackSave();
  try {
    getWasmTableEntry(index)(a1, a2, a3, a4);
  } catch (e) {
    stackRestore(sp);
    if (!(e instanceof EmscriptenEH)) throw e;
    _setThrew(1, 0);
  }
}

function invoke_vijjff(index, a1, a2, a3, a4, a5) {
  var sp = stackSave();
  try {
    getWasmTableEntry(index)(a1, a2, a3, a4, a5);
  } catch (e) {
    stackRestore(sp);
    if (!(e instanceof EmscriptenEH)) throw e;
    _setThrew(1, 0);
  }
}

function invoke_viiiffffiii(index, a1, a2, a3, a4, a5, a6, a7, a8, a9, a10) {
  var sp = stackSave();
  try {
    getWasmTableEntry(index)(a1, a2, a3, a4, a5, a6, a7, a8, a9, a10);
  } catch (e) {
    stackRestore(sp);
    if (!(e instanceof EmscriptenEH)) throw e;
    _setThrew(1, 0);
  }
}

function invoke_viiiiiiiiii(index, a1, a2, a3, a4, a5, a6, a7, a8, a9, a10) {
  var sp = stackSave();
  try {
    getWasmTableEntry(index)(a1, a2, a3, a4, a5, a6, a7, a8, a9, a10);
  } catch (e) {
    stackRestore(sp);
    if (!(e instanceof EmscriptenEH)) throw e;
    _setThrew(1, 0);
  }
}

function invoke_vijii(index, a1, a2, a3, a4) {
  var sp = stackSave();
  try {
    getWasmTableEntry(index)(a1, a2, a3, a4);
  } catch (e) {
    stackRestore(sp);
    if (!(e instanceof EmscriptenEH)) throw e;
    _setThrew(1, 0);
  }
}

function invoke_jijii(index, a1, a2, a3, a4) {
  var sp = stackSave();
  try {
    return getWasmTableEntry(index)(a1, a2, a3, a4);
  } catch (e) {
    stackRestore(sp);
    if (!(e instanceof EmscriptenEH)) throw e;
    _setThrew(1, 0);
    return 0n;
  }
}

function invoke_vifff(index, a1, a2, a3, a4) {
  var sp = stackSave();
  try {
    getWasmTableEntry(index)(a1, a2, a3, a4);
  } catch (e) {
    stackRestore(sp);
    if (!(e instanceof EmscriptenEH)) throw e;
    _setThrew(1, 0);
  }
}

function invoke_iiiiiiiiii(index, a1, a2, a3, a4, a5, a6, a7, a8, a9) {
  var sp = stackSave();
  try {
    return getWasmTableEntry(index)(a1, a2, a3, a4, a5, a6, a7, a8, a9);
  } catch (e) {
    stackRestore(sp);
    if (!(e instanceof EmscriptenEH)) throw e;
    _setThrew(1, 0);
  }
}

function invoke_iiiji(index, a1, a2, a3, a4) {
  var sp = stackSave();
  try {
    return getWasmTableEntry(index)(a1, a2, a3, a4);
  } catch (e) {
    stackRestore(sp);
    if (!(e instanceof EmscriptenEH)) throw e;
    _setThrew(1, 0);
  }
}

function invoke_iiiiji(index, a1, a2, a3, a4, a5) {
  var sp = stackSave();
  try {
    return getWasmTableEntry(index)(a1, a2, a3, a4, a5);
  } catch (e) {
    stackRestore(sp);
    if (!(e instanceof EmscriptenEH)) throw e;
    _setThrew(1, 0);
  }
}

function invoke_viijii(index, a1, a2, a3, a4, a5) {
  var sp = stackSave();
  try {
    getWasmTableEntry(index)(a1, a2, a3, a4, a5);
  } catch (e) {
    stackRestore(sp);
    if (!(e instanceof EmscriptenEH)) throw e;
    _setThrew(1, 0);
  }
}

function invoke_iiiiij(index, a1, a2, a3, a4, a5) {
  var sp = stackSave();
  try {
    return getWasmTableEntry(index)(a1, a2, a3, a4, a5);
  } catch (e) {
    stackRestore(sp);
    if (!(e instanceof EmscriptenEH)) throw e;
    _setThrew(1, 0);
  }
}

function invoke_iiiiiiiiiiiii(index, a1, a2, a3, a4, a5, a6, a7, a8, a9, a10, a11, a12) {
  var sp = stackSave();
  try {
    return getWasmTableEntry(index)(a1, a2, a3, a4, a5, a6, a7, a8, a9, a10, a11, a12);
  } catch (e) {
    stackRestore(sp);
    if (!(e instanceof EmscriptenEH)) throw e;
    _setThrew(1, 0);
  }
}

function invoke_diii(index, a1, a2, a3) {
  var sp = stackSave();
  try {
    return getWasmTableEntry(index)(a1, a2, a3);
  } catch (e) {
    stackRestore(sp);
    if (!(e instanceof EmscriptenEH)) throw e;
    _setThrew(1, 0);
  }
}

function invoke_iiiiiiiiiiii(index, a1, a2, a3, a4, a5, a6, a7, a8, a9, a10, a11) {
  var sp = stackSave();
  try {
    return getWasmTableEntry(index)(a1, a2, a3, a4, a5, a6, a7, a8, a9, a10, a11);
  } catch (e) {
    stackRestore(sp);
    if (!(e instanceof EmscriptenEH)) throw e;
    _setThrew(1, 0);
  }
}

function invoke_viiiiiiiiiiiiiii(index, a1, a2, a3, a4, a5, a6, a7, a8, a9, a10, a11, a12, a13, a14, a15) {
  var sp = stackSave();
  try {
    getWasmTableEntry(index)(a1, a2, a3, a4, a5, a6, a7, a8, a9, a10, a11, a12, a13, a14, a15);
  } catch (e) {
    stackRestore(sp);
    if (!(e instanceof EmscriptenEH)) throw e;
    _setThrew(1, 0);
  }
}

// include: postamble.js
// === Auto-generated postamble setup entry stuff ===
var calledRun;

function callMain(args = []) {
  assert(runDependencies == 0, 'cannot call main when async dependencies remain! (listen on Module["onRuntimeInitialized"])');
  assert(typeof onPreRuns === "undefined" || onPreRuns.length == 0, "cannot call main when preRun functions remain to be called");
  var entryFunction = _main;
  args.unshift(thisProgram);
  var argc = args.length;
  var argv = stackAlloc((argc + 1) * 4);
  var argv_ptr = argv;
  for (var arg of args) {
    HEAPU32[((argv_ptr) >> 2)] = stringToUTF8OnStack(arg);
    argv_ptr += 4;
  }
  HEAPU32[((argv_ptr) >> 2)] = 0;
  try {
    var ret = entryFunction(argc, argv);
    // if we're not running an evented main loop, it's time to exit
    exitJS(ret, /* implicit = */ true);
    return ret;
  } catch (e) {
    return handleException(e);
  }
}

function stackCheckInit() {
  // This is normally called automatically during __wasm_call_ctors but need to
  // get these values before even running any of the ctors so we call it redundantly
  // here.
  _emscripten_stack_init();
  // TODO(sbc): Move writeStackCookie to native to to avoid this.
  writeStackCookie();
}

async function run(args = programArgs) {
  assert(!calledRun);
  calledRun = true;
  stackCheckInit();
  preRun();
  if (runDependencies) {
    await resolveRunDependencies();
  }
  var setStatus = Module["setStatus"];
  if (setStatus) {
    setStatus("Running...");
    // Yield to the event loop to allow the browser to paint "Running..."
    await new Promise(resolve => setTimeout(resolve, 1));
    // Then we want to clear the status text, but only after the rest of this function runs.
    setTimeout(setStatus, 1, "");
  }
  if (ABORT) return;
  initRuntime();
  // No ATMAINS hooks
  Module["onRuntimeInitialized"]?.();
  consumedModuleProp("onRuntimeInitialized");
  var noInitialRun = Module["noInitialRun"] || false;
  if (!noInitialRun) callMain(args);
  postRun();
}

function checkUnflushedContent() {
  // Compiler settings do not allow exiting the runtime, so flushing
  // the streams is not possible. but in ASSERTIONS mode we check
  // if there was something to flush, and if so tell the user they
  // should request that the runtime be exitable.
  // Normally we would not even include flush() at all, but in ASSERTIONS
  // builds we do so just for this check, and here we see if there is any
  // content to flush, that is, we check if there would have been
  // something a non-ASSERTIONS build would have not seen.
  // How we flush the streams depends on whether we are in SYSCALLS_REQUIRE_FILESYSTEM=0
  // mode (which has its own special function for this; otherwise, all
  // the code is inside libc)
  var oldOut = out;
  var oldErr = err;
  var has = false;
  out = err = x => {
    has = true;
  };
  try {
    // it doesn't matter if it fails
    _fflush(0);
    // also flush in the JS FS layer
    for (var tty of Object.values(TTY.ttys)) {
      if (tty.output.length) {
        has = true;
      }
    }
  } catch (e) {}
  out = oldOut;
  err = oldErr;
  if (has) {
    warnOnce("stdio streams had content in them that was not flushed. you should set EXIT_RUNTIME to 1 (see the Emscripten FAQ), or make sure to emit a newline when you printf etc.");
  }
}

var wasmExports;

// With async instantation wasmExports is assigned asynchronously when the
// instance is received.
createWasm().then(() => run());
