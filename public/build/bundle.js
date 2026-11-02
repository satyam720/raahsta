// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles

(function (
  modules,
  entry,
  mainEntry,
  parcelRequireName,
  externals,
  distDir,
  publicUrl,
  devServer
) {
  /* eslint-disable no-undef */
  var globalObject =
    typeof globalThis !== 'undefined'
      ? globalThis
      : typeof self !== 'undefined'
      ? self
      : typeof window !== 'undefined'
      ? window
      : typeof global !== 'undefined'
      ? global
      : {};
  /* eslint-enable no-undef */

  // Save the require from previous bundle to this closure if any
  var previousRequire =
    typeof globalObject[parcelRequireName] === 'function' &&
    globalObject[parcelRequireName];

  var importMap = previousRequire.i || {};
  var cache = previousRequire.cache || {};
  // Do not use `require` to prevent Webpack from trying to bundle this call
  var nodeRequire =
    typeof module !== 'undefined' &&
    typeof module.require === 'function' &&
    module.require.bind(module);

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        if (externals[name]) {
          return externals[name];
        }
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire =
          typeof globalObject[parcelRequireName] === 'function' &&
          globalObject[parcelRequireName];
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error("Cannot find module '" + name + "'");
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = (cache[name] = new newRequire.Module(name));

      modules[name][0].call(
        module.exports,
        localRequire,
        module,
        module.exports,
        globalObject
      );
    }

    return cache[name].exports;

    function localRequire(x) {
      var res = localRequire.resolve(x);
      if (res === false) {
        return {};
      }
      // Synthesize a module to follow re-exports.
      if (Array.isArray(res)) {
        var m = {__esModule: true};
        res.forEach(function (v) {
          var key = v[0];
          var id = v[1];
          var exp = v[2] || v[0];
          var x = newRequire(id);
          if (key === '*') {
            Object.keys(x).forEach(function (key) {
              if (
                key === 'default' ||
                key === '__esModule' ||
                Object.prototype.hasOwnProperty.call(m, key)
              ) {
                return;
              }

              Object.defineProperty(m, key, {
                enumerable: true,
                get: function () {
                  return x[key];
                },
              });
            });
          } else if (exp === '*') {
            Object.defineProperty(m, key, {
              enumerable: true,
              value: x,
            });
          } else {
            Object.defineProperty(m, key, {
              enumerable: true,
              get: function () {
                if (exp === 'default') {
                  return x.__esModule ? x.default : x;
                }
                return x[exp];
              },
            });
          }
        });
        return m;
      }
      return newRequire(res);
    }

    function resolve(x) {
      var id = modules[name][1][x];
      return id != null ? id : x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.require = nodeRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.distDir = distDir;
  newRequire.publicUrl = publicUrl;
  newRequire.devServer = devServer;
  newRequire.i = importMap;
  newRequire.register = function (id, exports) {
    modules[id] = [
      function (require, module) {
        module.exports = exports;
      },
      {},
    ];
  };

  // Only insert newRequire.load when it is actually used.
  // The code in this file is linted against ES5, so dynamic import is not allowed.
  // INSERT_LOAD_HERE

  Object.defineProperty(newRequire, 'root', {
    get: function () {
      return globalObject[parcelRequireName];
    },
  });

  globalObject[parcelRequireName] = newRequire;

  for (var i = 0; i < entry.length; i++) {
    newRequire(entry[i]);
  }

  if (mainEntry) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(mainEntry);

    // CommonJS
    if (typeof exports === 'object' && typeof module !== 'undefined') {
      module.exports = mainExports;

      // RequireJS
    } else if (typeof define === 'function' && define.amd) {
      define(function () {
        return mainExports;
      });
    }
  }
})({"8xXkV":[function(require,module,exports,__globalThis) {
var _webImmediateJs = require("core-js/modules/web.immediate.js");
var _runtime = require("regenerator-runtime/runtime");
var _loginJs = require("./login.js");
var _mapboxJs = require("./mapbox.js");
var _updateSettingJs = require("./updateSetting.js");
var _razorPayJs = require("./razorPay.js");
//DOM elems
const mapContainer = document.getElementById('map');
const loginForm = document.querySelector('.form--login');
const logoutBtn = document.querySelector('.nav__el--logout');
const userDataForm = document.querySelector('.form-user-data');
const userPasswordForm = document.querySelector('.form-user-password');
const bookTourBtn = document.getElementById('book-tour');
if (mapContainer) try {
    (0, _mapboxJs.initMap)(mapContainer);
} catch (error) {
    console.error(error);
}
if (loginForm) loginForm.addEventListener('submit', (e)=>{
    e.preventDefault();
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    (0, _loginJs.login)(email, password);
});
if (logoutBtn) logoutBtn.addEventListener('click', (0, _loginJs.logout));
if (userDataForm) userDataForm.addEventListener('submit', async (e)=>{
    e.preventDefault();
    const form = new FormData();
    form.append('name', document.getElementById('name').value);
    form.append('email', document.getElementById('email').value);
    form.append('photo', document.getElementById('photo').files[0]);
    await (0, _updateSettingJs.updateSettings)(form, 'data');
    location.reload(true);
});
if (userPasswordForm) userPasswordForm.addEventListener('submit', async (e)=>{
    e.preventDefault();
    document.querySelector('.btn--save-password').textContent = 'updating...';
    const passwordCurrent = document.getElementById('password-current').value;
    const password = document.getElementById('password').value;
    const passwordConfirm = document.getElementById('password-confirm').value;
    await (0, _updateSettingJs.updateSettings)({
        passwordCurrent,
        password,
        passwordConfirm
    }, 'password');
    document.getElementById('password-current').value = '';
    document.getElementById('password').value = '';
    document.getElementById('password-confirm').value = '';
    document.querySelector('.btn--save-password').textContent = 'SAVE PASSWORD';
});
if (bookTourBtn) bookTourBtn.addEventListener('click', async (e)=>{
    e.preventDefault();
    bookTourBtn.disabled = true;
    await (0, _razorPayJs.requestOrder)(bookTourBtn);
});

},{"core-js/modules/web.immediate.js":"bzsBv","regenerator-runtime/runtime":"f6ot0","./login.js":"baTDu","./mapbox.js":"btId7","./updateSetting.js":"3d1Ox","./razorPay.js":"fpv5n"}],"bzsBv":[function(require,module,exports,__globalThis) {
'use strict';
// TODO: Remove this module from `core-js@4` since it's split to modules listed below
require("52e9b3eefbbce1ed");
require("292fa64716f5b39e");

},{"52e9b3eefbbce1ed":"6n7Wj","292fa64716f5b39e":"cpv3g"}],"6n7Wj":[function(require,module,exports,__globalThis) {
'use strict';
var $ = require("79389288a80b279c");
var globalThis = require("e4d64249a0133d14");
var clearImmediate = require("84ba5ca62b8b14c9").clear;
// `clearImmediate` method
// http://w3c.github.io/setImmediate/#si-clearImmediate
$({
    global: true,
    bind: true,
    enumerable: true,
    forced: globalThis.clearImmediate !== clearImmediate
}, {
    clearImmediate: clearImmediate
});

},{"79389288a80b279c":"7Vckd","e4d64249a0133d14":"6xMjU","84ba5ca62b8b14c9":"9fjiV"}],"7Vckd":[function(require,module,exports,__globalThis) {
'use strict';
var globalThis = require("23dea28abc8414d1");
var getOwnPropertyDescriptor = require("2ec751f39e500b85").f;
var createNonEnumerableProperty = require("b4567636b28a3b3a");
var defineBuiltIn = require("50460aa43dd4048a");
var defineGlobalProperty = require("581238c99f8c2c30");
var copyConstructorProperties = require("566a383894c688bc");
var isForced = require("f0e2e697f04e8ad9");
/*
  options.target         - name of the target object
  options.global         - target is the global object
  options.stat           - export as static methods of target
  options.proto          - export as prototype methods of target
  options.real           - real prototype method for the `pure` version
  options.forced         - export even if the native feature is available
  options.bind           - bind methods to the target, required for the `pure` version
  options.wrap           - wrap constructors to preventing global pollution, required for the `pure` version
  options.unsafe         - use the simple assignment of property instead of delete + defineProperty
  options.sham           - add a flag to not completely full polyfills
  options.enumerable     - export as enumerable property
  options.dontCallGetSet - prevent calling a getter on target
  options.name           - the .name of the function if it does not match the key
*/ module.exports = function(options, source) {
    var TARGET = options.target;
    var GLOBAL = options.global;
    var STATIC = options.stat;
    var FORCED, target, key, targetProperty, sourceProperty, descriptor;
    if (GLOBAL) target = globalThis;
    else if (STATIC) target = globalThis[TARGET] || defineGlobalProperty(TARGET, {});
    else target = globalThis[TARGET] && globalThis[TARGET].prototype;
    if (target) for(key in source){
        sourceProperty = source[key];
        if (options.dontCallGetSet) {
            descriptor = getOwnPropertyDescriptor(target, key);
            targetProperty = descriptor && descriptor.value;
        } else targetProperty = target[key];
        FORCED = isForced(GLOBAL ? key : TARGET + (STATIC ? '.' : '#') + key, options.forced);
        // contained in target
        if (!FORCED && targetProperty !== undefined) {
            if (typeof sourceProperty == typeof targetProperty) continue;
            copyConstructorProperties(sourceProperty, targetProperty);
        }
        // add a flag to not completely full polyfills
        if (options.sham || targetProperty && targetProperty.sham) createNonEnumerableProperty(sourceProperty, 'sham', true);
        defineBuiltIn(target, key, sourceProperty, options);
    }
};

},{"23dea28abc8414d1":"6xMjU","2ec751f39e500b85":"dqLxA","b4567636b28a3b3a":"i7bgu","50460aa43dd4048a":"es56c","581238c99f8c2c30":"48kcX","566a383894c688bc":"i7gI0","f0e2e697f04e8ad9":"3rvW8"}],"6xMjU":[function(require,module,exports,__globalThis) {
var global = arguments[3];
'use strict';
var check = function(it) {
    return it && it.Math === Math && it;
};
// https://github.com/zloirock/core-js/issues/86#issuecomment-115759028
module.exports = // eslint-disable-next-line es/no-global-this -- safe
check(typeof globalThis == 'object' && globalThis) || check(typeof window == 'object' && window) || // eslint-disable-next-line no-restricted-globals -- safe
check(typeof self == 'object' && self) || check(typeof global == 'object' && global) || check(typeof this == 'object' && this) || // eslint-disable-next-line no-new-func -- fallback
function() {
    return this;
}() || Function('return this')();

},{}],"dqLxA":[function(require,module,exports,__globalThis) {
'use strict';
var DESCRIPTORS = require("c04e6fb248689dba");
var call = require("553ec943aa2a4554");
var propertyIsEnumerableModule = require("bbc5e69071aa2fbd");
var createPropertyDescriptor = require("1d2ffbfd99e01f41");
var toIndexedObject = require("c4ea69a78a643d87");
var toPropertyKey = require("8ab18ff766aa2ab9");
var hasOwn = require("3761c5d34b7aa48f");
var IE8_DOM_DEFINE = require("c4dfcc26308f1b4a");
// eslint-disable-next-line es/no-object-getownpropertydescriptor -- safe
var $getOwnPropertyDescriptor = Object.getOwnPropertyDescriptor;
// `Object.getOwnPropertyDescriptor` method
// https://tc39.es/ecma262/#sec-object.getownpropertydescriptor
exports.f = DESCRIPTORS ? $getOwnPropertyDescriptor : function getOwnPropertyDescriptor(O, P) {
    O = toIndexedObject(O);
    P = toPropertyKey(P);
    if (IE8_DOM_DEFINE) try {
        return $getOwnPropertyDescriptor(O, P);
    } catch (error) {}
    if (hasOwn(O, P)) return createPropertyDescriptor(!call(propertyIsEnumerableModule.f, O, P), O[P]);
};

},{"c04e6fb248689dba":"5AxuF","553ec943aa2a4554":"3v9g9","bbc5e69071aa2fbd":"U03h7","1d2ffbfd99e01f41":"dOb5l","c4ea69a78a643d87":"58zOi","8ab18ff766aa2ab9":"lGuA3","3761c5d34b7aa48f":"9CekL","c4dfcc26308f1b4a":"kwjpQ"}],"5AxuF":[function(require,module,exports,__globalThis) {
'use strict';
var fails = require("735b783268fd06c0");
// Detect IE8's incomplete defineProperty implementation
module.exports = !fails(function() {
    // eslint-disable-next-line es/no-object-defineproperty -- required for testing
    return Object.defineProperty({}, 1, {
        get: function() {
            return 7;
        }
    })[1] !== 7;
});

},{"735b783268fd06c0":"7Gv5z"}],"7Gv5z":[function(require,module,exports,__globalThis) {
'use strict';
module.exports = function(exec) {
    try {
        return !!exec();
    } catch (error) {
        return true;
    }
};

},{}],"3v9g9":[function(require,module,exports,__globalThis) {
'use strict';
var NATIVE_BIND = require("44e025d030d66023");
var call = Function.prototype.call;
// eslint-disable-next-line es/no-function-prototype-bind -- safe
module.exports = NATIVE_BIND ? call.bind(call) : function() {
    return call.apply(call, arguments);
};

},{"44e025d030d66023":"5U5xz"}],"5U5xz":[function(require,module,exports,__globalThis) {
'use strict';
var fails = require("2642aa7619056f20");
module.exports = !fails(function() {
    // eslint-disable-next-line es/no-function-prototype-bind -- safe
    var test = (function() {}).bind();
    // eslint-disable-next-line no-prototype-builtins -- safe
    return typeof test != 'function' || test.hasOwnProperty('prototype');
});

},{"2642aa7619056f20":"7Gv5z"}],"U03h7":[function(require,module,exports,__globalThis) {
'use strict';
var $propertyIsEnumerable = {}.propertyIsEnumerable;
// eslint-disable-next-line es/no-object-getownpropertydescriptor -- safe
var getOwnPropertyDescriptor = Object.getOwnPropertyDescriptor;
// Nashorn ~ JDK8 bug
var NASHORN_BUG = getOwnPropertyDescriptor && !$propertyIsEnumerable.call({
    1: 2
}, 1);
// `Object.prototype.propertyIsEnumerable` method implementation
// https://tc39.es/ecma262/#sec-object.prototype.propertyisenumerable
exports.f = NASHORN_BUG ? function propertyIsEnumerable(V) {
    var descriptor = getOwnPropertyDescriptor(this, V);
    return !!descriptor && descriptor.enumerable;
} : $propertyIsEnumerable;

},{}],"dOb5l":[function(require,module,exports,__globalThis) {
'use strict';
module.exports = function(bitmap, value) {
    return {
        enumerable: !(bitmap & 1),
        configurable: !(bitmap & 2),
        writable: !(bitmap & 4),
        value: value
    };
};

},{}],"58zOi":[function(require,module,exports,__globalThis) {
'use strict';
// toObject with fallback for non-array-like ES3 strings
var IndexedObject = require("9d8f8f50ac9468eb");
var requireObjectCoercible = require("f7224aed72953ac4");
module.exports = function(it) {
    return IndexedObject(requireObjectCoercible(it));
};

},{"9d8f8f50ac9468eb":"gXe04","f7224aed72953ac4":"7cHwm"}],"gXe04":[function(require,module,exports,__globalThis) {
'use strict';
var uncurryThis = require("7ba7e65983d7b662");
var fails = require("df551e12a7c872dd");
var classof = require("1d34ea813cebff9c");
var $Object = Object;
var split = uncurryThis(''.split);
// fallback for non-array-like ES3 and non-enumerable old V8 strings
module.exports = fails(function() {
    // throws an error in rhino, see https://github.com/mozilla/rhino/issues/346
    // eslint-disable-next-line no-prototype-builtins -- safe
    return !$Object('z').propertyIsEnumerable(0);
}) ? function(it) {
    return classof(it) === 'String' ? split(it, '') : $Object(it);
} : $Object;

},{"7ba7e65983d7b662":"aAate","df551e12a7c872dd":"7Gv5z","1d34ea813cebff9c":"fKrQp"}],"aAate":[function(require,module,exports,__globalThis) {
'use strict';
var NATIVE_BIND = require("829dd7a4e960cf9e");
var FunctionPrototype = Function.prototype;
var call = FunctionPrototype.call;
// eslint-disable-next-line es/no-function-prototype-bind -- safe
var uncurryThisWithBind = NATIVE_BIND && FunctionPrototype.bind.bind(call, call);
module.exports = NATIVE_BIND ? uncurryThisWithBind : function(fn) {
    return function() {
        return call.apply(fn, arguments);
    };
};

},{"829dd7a4e960cf9e":"5U5xz"}],"fKrQp":[function(require,module,exports,__globalThis) {
'use strict';
var uncurryThis = require("1c71c3f6daac476c");
var toString = uncurryThis({}.toString);
var stringSlice = uncurryThis(''.slice);
module.exports = function(it) {
    return stringSlice(toString(it), 8, -1);
};

},{"1c71c3f6daac476c":"aAate"}],"7cHwm":[function(require,module,exports,__globalThis) {
'use strict';
var isNullOrUndefined = require("74607922ed30019f");
var $TypeError = TypeError;
// `RequireObjectCoercible` abstract operation
// https://tc39.es/ecma262/#sec-requireobjectcoercible
module.exports = function(it) {
    if (isNullOrUndefined(it)) throw new $TypeError("Can't call method on " + it);
    return it;
};

},{"74607922ed30019f":"gHvvU"}],"gHvvU":[function(require,module,exports,__globalThis) {
'use strict';
// we can't use just `it == null` since of `document.all` special case
// https://tc39.es/ecma262/#sec-IsHTMLDDA-internal-slot-aec
module.exports = function(it) {
    return it === null || it === undefined;
};

},{}],"lGuA3":[function(require,module,exports,__globalThis) {
'use strict';
var toPrimitive = require("53a3a67ac381c4e8");
var isSymbol = require("b992ca9cdcf7937b");
// `ToPropertyKey` abstract operation
// https://tc39.es/ecma262/#sec-topropertykey
module.exports = function(argument) {
    var key = toPrimitive(argument, 'string');
    return isSymbol(key) ? key : key + '';
};

},{"53a3a67ac381c4e8":"hyNfR","b992ca9cdcf7937b":"8EQ8A"}],"hyNfR":[function(require,module,exports,__globalThis) {
'use strict';
var call = require("70235907dc93b4b0");
var isObject = require("46fb53dace408c8e");
var isSymbol = require("677bdc4d74d2f983");
var getMethod = require("80395bcde336a28b");
var ordinaryToPrimitive = require("49552a7324952190");
var wellKnownSymbol = require("aea01c71276624bf");
var $TypeError = TypeError;
var TO_PRIMITIVE = wellKnownSymbol('toPrimitive');
// `ToPrimitive` abstract operation
// https://tc39.es/ecma262/#sec-toprimitive
module.exports = function(input, pref) {
    if (!isObject(input) || isSymbol(input)) return input;
    var exoticToPrim = getMethod(input, TO_PRIMITIVE);
    var result;
    if (exoticToPrim) {
        if (pref === undefined) pref = 'default';
        result = call(exoticToPrim, input, pref);
        if (!isObject(result) || isSymbol(result)) return result;
        throw new $TypeError("Can't convert object to primitive value");
    }
    if (pref === undefined) pref = 'number';
    return ordinaryToPrimitive(input, pref);
};

},{"70235907dc93b4b0":"3v9g9","46fb53dace408c8e":"5rTge","677bdc4d74d2f983":"8EQ8A","80395bcde336a28b":"9TreM","49552a7324952190":"cUIZh","aea01c71276624bf":"lzelE"}],"5rTge":[function(require,module,exports,__globalThis) {
'use strict';
var isCallable = require("f87cee1cb79cbcca");
module.exports = function(it) {
    return typeof it == 'object' ? it !== null : isCallable(it);
};

},{"f87cee1cb79cbcca":"2KfBB"}],"2KfBB":[function(require,module,exports,__globalThis) {
'use strict';
// https://tc39.es/ecma262/#sec-IsHTMLDDA-internal-slot
var documentAll = typeof document == 'object' && document.all;
// `IsCallable` abstract operation
// https://tc39.es/ecma262/#sec-iscallable
// eslint-disable-next-line unicorn/no-typeof-undefined -- required for testing
module.exports = typeof documentAll == 'undefined' && documentAll !== undefined ? function(argument) {
    return typeof argument == 'function' || argument === documentAll;
} : function(argument) {
    return typeof argument == 'function';
};

},{}],"8EQ8A":[function(require,module,exports,__globalThis) {
'use strict';
var getBuiltIn = require("6b6c481cdfb7df35");
var isCallable = require("2af44fcbdbf14c83");
var isPrototypeOf = require("76e903e830c40e7c");
var USE_SYMBOL_AS_UID = require("7e2fe930b3598e22");
var $Object = Object;
module.exports = USE_SYMBOL_AS_UID ? function(it) {
    return typeof it == 'symbol';
} : function(it) {
    var $Symbol = getBuiltIn('Symbol');
    return isCallable($Symbol) && isPrototypeOf($Symbol.prototype, $Object(it));
};

},{"6b6c481cdfb7df35":"h2CMt","2af44fcbdbf14c83":"2KfBB","76e903e830c40e7c":"jkNHH","7e2fe930b3598e22":"fSbH5"}],"h2CMt":[function(require,module,exports,__globalThis) {
'use strict';
var globalThis = require("e057fc33d60763c1");
var isCallable = require("f1d62079325906cb");
var aFunction = function(argument) {
    return isCallable(argument) ? argument : undefined;
};
module.exports = function(namespace, method) {
    return arguments.length < 2 ? aFunction(globalThis[namespace]) : globalThis[namespace] && globalThis[namespace][method];
};

},{"e057fc33d60763c1":"6xMjU","f1d62079325906cb":"2KfBB"}],"jkNHH":[function(require,module,exports,__globalThis) {
'use strict';
var uncurryThis = require("83f14842ef67e16a");
module.exports = uncurryThis({}.isPrototypeOf);

},{"83f14842ef67e16a":"aAate"}],"fSbH5":[function(require,module,exports,__globalThis) {
'use strict';
/* eslint-disable es/no-symbol -- required for testing */ var NATIVE_SYMBOL = require("da4a972af0214ea0");
module.exports = NATIVE_SYMBOL && !Symbol.sham && typeof Symbol.iterator == 'symbol';

},{"da4a972af0214ea0":"2fu84"}],"2fu84":[function(require,module,exports,__globalThis) {
'use strict';
/* eslint-disable es/no-symbol -- required for testing */ var V8_VERSION = require("53b951dfb9de4d22");
var fails = require("b37df495bcdc1d99");
var globalThis = require("e5929e9affd2affc");
var $String = globalThis.String;
// eslint-disable-next-line es/no-object-getownpropertysymbols -- required for testing
module.exports = !!Object.getOwnPropertySymbols && !fails(function() {
    var symbol = Symbol('symbol detection');
    // Chrome 38 Symbol has incorrect toString conversion
    // `get-own-property-symbols` polyfill symbols converted to object are not Symbol instances
    // nb: Do not call `String` directly to avoid this being optimized out to `symbol+''` which will,
    // of course, fail.
    return !$String(symbol) || !(Object(symbol) instanceof Symbol) || // Chrome 38-40 symbols are not inherited from DOM collections prototypes to instances
    !Symbol.sham && V8_VERSION && V8_VERSION < 41;
});

},{"53b951dfb9de4d22":"cePh9","b37df495bcdc1d99":"7Gv5z","e5929e9affd2affc":"6xMjU"}],"cePh9":[function(require,module,exports,__globalThis) {
'use strict';
var globalThis = require("d049c1c2aa0eee5b");
var userAgent = require("4eb5796bbafe334d");
var process = globalThis.process;
var Deno = globalThis.Deno;
var versions = process && process.versions || Deno && Deno.version;
var v8 = versions && versions.v8;
var match, version;
if (v8) {
    match = v8.split('.');
    // in old Chrome, versions of V8 isn't V8 = Chrome / 10
    // but their correct versions are not interesting for us
    version = match[0] > 0 && match[0] < 4 ? 1 : +(match[0] + match[1]);
}
// BrowserFS NodeJS `process` polyfill incorrectly set `.v8` to `0.0`
// so check `userAgent` even if `.v8` exists, but 0
if (!version && userAgent) {
    match = userAgent.match(/Edge\/(\d+)/);
    if (!match || match[1] >= 74) {
        match = userAgent.match(/Chrome\/(\d+)/);
        if (match) version = +match[1];
    }
}
module.exports = version;

},{"d049c1c2aa0eee5b":"6xMjU","4eb5796bbafe334d":"qxRHs"}],"qxRHs":[function(require,module,exports,__globalThis) {
'use strict';
var globalThis = require("888bcb4c75dc4ad");
var navigator = globalThis.navigator;
var userAgent = navigator && navigator.userAgent;
module.exports = userAgent ? String(userAgent) : '';

},{"888bcb4c75dc4ad":"6xMjU"}],"9TreM":[function(require,module,exports,__globalThis) {
'use strict';
var aCallable = require("bbfed17b24e215f4");
var isNullOrUndefined = require("492a86e2970f6a26");
// `GetMethod` abstract operation
// https://tc39.es/ecma262/#sec-getmethod
module.exports = function(V, P) {
    var func = V[P];
    return isNullOrUndefined(func) ? undefined : aCallable(func);
};

},{"bbfed17b24e215f4":"dxhWU","492a86e2970f6a26":"gHvvU"}],"dxhWU":[function(require,module,exports,__globalThis) {
'use strict';
var isCallable = require("4094667126ecac05");
var tryToString = require("fce2a7573db493fa");
var $TypeError = TypeError;
// `Assert: IsCallable(argument) is true`
module.exports = function(argument) {
    if (isCallable(argument)) return argument;
    throw new $TypeError(tryToString(argument) + ' is not a function');
};

},{"4094667126ecac05":"2KfBB","fce2a7573db493fa":"fPD2p"}],"fPD2p":[function(require,module,exports,__globalThis) {
'use strict';
var $String = String;
module.exports = function(argument) {
    try {
        return $String(argument);
    } catch (error) {
        return 'Object';
    }
};

},{}],"cUIZh":[function(require,module,exports,__globalThis) {
'use strict';
var call = require("abe9ca006f56626e");
var isCallable = require("c96b3a89fec6248a");
var isObject = require("551615fda0214f1b");
var $TypeError = TypeError;
// `OrdinaryToPrimitive` abstract operation
// https://tc39.es/ecma262/#sec-ordinarytoprimitive
module.exports = function(input, pref) {
    var fn, val;
    if (pref === 'string' && isCallable(fn = input.toString) && !isObject(val = call(fn, input))) return val;
    if (isCallable(fn = input.valueOf) && !isObject(val = call(fn, input))) return val;
    if (pref !== 'string' && isCallable(fn = input.toString) && !isObject(val = call(fn, input))) return val;
    throw new $TypeError("Can't convert object to primitive value");
};

},{"abe9ca006f56626e":"3v9g9","c96b3a89fec6248a":"2KfBB","551615fda0214f1b":"5rTge"}],"lzelE":[function(require,module,exports,__globalThis) {
'use strict';
var globalThis = require("ad5ef4474219c101");
var shared = require("6a2cda01df6b4c79");
var hasOwn = require("dccc28ffa5beeb54");
var uid = require("48d6af1225853d44");
var NATIVE_SYMBOL = require("9f762329148684");
var USE_SYMBOL_AS_UID = require("1ce268781e409df2");
var Symbol = globalThis.Symbol;
var WellKnownSymbolsStore = shared('wks');
var createWellKnownSymbol = USE_SYMBOL_AS_UID ? Symbol['for'] || Symbol : Symbol && Symbol.withoutSetter || uid;
module.exports = function(name) {
    if (!hasOwn(WellKnownSymbolsStore, name)) WellKnownSymbolsStore[name] = NATIVE_SYMBOL && hasOwn(Symbol, name) ? Symbol[name] : createWellKnownSymbol('Symbol.' + name);
    return WellKnownSymbolsStore[name];
};

},{"ad5ef4474219c101":"6xMjU","6a2cda01df6b4c79":"6SeRV","dccc28ffa5beeb54":"9CekL","48d6af1225853d44":"dePDt","9f762329148684":"2fu84","1ce268781e409df2":"fSbH5"}],"6SeRV":[function(require,module,exports,__globalThis) {
'use strict';
var store = require("84eeed9891aafe14");
// eslint-disable-next-line es/no-object-create -- safe
var create = Object.create || Object;
module.exports = function(key, value) {
    return store[key] || (store[key] = value || create(null));
};

},{"84eeed9891aafe14":"29eKX"}],"29eKX":[function(require,module,exports,__globalThis) {
'use strict';
var IS_PURE = require("7b43004672b1879f");
var globalThis = require("bc8329e77dc2c1cc");
var defineGlobalProperty = require("dfb72a1d809f7b02");
var SHARED = '__core-js_shared__';
var store = module.exports = globalThis[SHARED] || defineGlobalProperty(SHARED, {});
(store.versions || (store.versions = [])).push({
    version: '3.51.0',
    mode: IS_PURE ? 'pure' : 'global',
    copyright: "\xa9 2013\u20132025 Denis Pushkarev (zloirock.ru), 2025\u20132026 CoreJS Company (core-js.io). All rights reserved.",
    license: 'https://github.com/zloirock/core-js/blob/v3.51.0/LICENSE',
    source: 'https://github.com/zloirock/core-js'
});

},{"7b43004672b1879f":"cpju0","bc8329e77dc2c1cc":"6xMjU","dfb72a1d809f7b02":"48kcX"}],"cpju0":[function(require,module,exports,__globalThis) {
'use strict';
module.exports = false;

},{}],"48kcX":[function(require,module,exports,__globalThis) {
'use strict';
var globalThis = require("2d1c29655635b9ea");
// eslint-disable-next-line es/no-object-defineproperty -- safe
var defineProperty = Object.defineProperty;
module.exports = function(key, value) {
    try {
        defineProperty(globalThis, key, {
            value: value,
            configurable: true,
            writable: true
        });
    } catch (error) {
        globalThis[key] = value;
    }
    return value;
};

},{"2d1c29655635b9ea":"6xMjU"}],"9CekL":[function(require,module,exports,__globalThis) {
'use strict';
var uncurryThis = require("f5dcaa60a713971f");
var toObject = require("ab17c4f45fcf0841");
var hasOwnProperty = uncurryThis({}.hasOwnProperty);
// `HasOwnProperty` abstract operation
// https://tc39.es/ecma262/#sec-hasownproperty
// eslint-disable-next-line es/no-object-hasown -- safe
module.exports = Object.hasOwn || function hasOwn(it, key) {
    return hasOwnProperty(toObject(it), key);
};

},{"f5dcaa60a713971f":"aAate","ab17c4f45fcf0841":"fTIhz"}],"fTIhz":[function(require,module,exports,__globalThis) {
'use strict';
var requireObjectCoercible = require("f45a7b5dcdc4a410");
var $Object = Object;
// `ToObject` abstract operation
// https://tc39.es/ecma262/#sec-toobject
module.exports = function(argument) {
    return $Object(requireObjectCoercible(argument));
};

},{"f45a7b5dcdc4a410":"7cHwm"}],"dePDt":[function(require,module,exports,__globalThis) {
'use strict';
var uncurryThis = require("5da0fe4507da20a3");
var id = 0;
var postfix = Math.random();
var toString = uncurryThis(1.1.toString);
module.exports = function(key) {
    return 'Symbol(' + (key === undefined ? '' : key) + ')_' + toString(++id + postfix, 36);
};

},{"5da0fe4507da20a3":"aAate"}],"kwjpQ":[function(require,module,exports,__globalThis) {
'use strict';
var DESCRIPTORS = require("9b4278b13c076bf");
var fails = require("8aee5d88a5f9b6b5");
var createElement = require("1db4d60148afcf21");
// Thanks to IE8 for its funny defineProperty
module.exports = !DESCRIPTORS && !fails(function() {
    // eslint-disable-next-line es/no-object-defineproperty -- required for testing
    return Object.defineProperty(createElement('div'), 'a', {
        get: function() {
            return 7;
        }
    }).a !== 7;
});

},{"9b4278b13c076bf":"5AxuF","8aee5d88a5f9b6b5":"7Gv5z","1db4d60148afcf21":"eF8HX"}],"eF8HX":[function(require,module,exports,__globalThis) {
'use strict';
var globalThis = require("845bcece0e6d354");
var isObject = require("824df78b2e007250");
var document = globalThis.document;
// typeof document.createElement is 'object' in old IE
var EXISTS = isObject(document) && isObject(document.createElement);
module.exports = function(it) {
    return EXISTS ? document.createElement(it) : {};
};

},{"845bcece0e6d354":"6xMjU","824df78b2e007250":"5rTge"}],"i7bgu":[function(require,module,exports,__globalThis) {
'use strict';
var DESCRIPTORS = require("a8753383ef98ee18");
var definePropertyModule = require("189ab650b8f71085");
var createPropertyDescriptor = require("1168c8162aa30435");
module.exports = DESCRIPTORS ? function(object, key, value) {
    return definePropertyModule.f(object, key, createPropertyDescriptor(1, value));
} : function(object, key, value) {
    object[key] = value;
    return object;
};

},{"a8753383ef98ee18":"5AxuF","189ab650b8f71085":"aBGsi","1168c8162aa30435":"dOb5l"}],"aBGsi":[function(require,module,exports,__globalThis) {
'use strict';
var DESCRIPTORS = require("ca50eb9163928400");
var IE8_DOM_DEFINE = require("d482f9e5478795e8");
var V8_PROTOTYPE_DEFINE_BUG = require("b6ad7537efb06f4b");
var anObject = require("16365a73399e7fe7");
var toPropertyKey = require("fab1d366c47796d9");
var $TypeError = TypeError;
// eslint-disable-next-line es/no-object-defineproperty -- safe
var $defineProperty = Object.defineProperty;
// eslint-disable-next-line es/no-object-getownpropertydescriptor -- safe
var $getOwnPropertyDescriptor = Object.getOwnPropertyDescriptor;
var ENUMERABLE = 'enumerable';
var CONFIGURABLE = 'configurable';
var WRITABLE = 'writable';
// `Object.defineProperty` method
// https://tc39.es/ecma262/#sec-object.defineproperty
exports.f = DESCRIPTORS ? V8_PROTOTYPE_DEFINE_BUG ? function defineProperty(O, P, Attributes) {
    anObject(O);
    P = toPropertyKey(P);
    anObject(Attributes);
    if (typeof O === 'function' && P === 'prototype' && 'value' in Attributes && WRITABLE in Attributes && !Attributes[WRITABLE]) {
        var current = $getOwnPropertyDescriptor(O, P);
        if (current && current[WRITABLE]) {
            O[P] = Attributes.value;
            Attributes = {
                configurable: CONFIGURABLE in Attributes ? Attributes[CONFIGURABLE] : current[CONFIGURABLE],
                enumerable: ENUMERABLE in Attributes ? Attributes[ENUMERABLE] : current[ENUMERABLE],
                writable: false
            };
        }
    }
    return $defineProperty(O, P, Attributes);
} : $defineProperty : function defineProperty(O, P, Attributes) {
    anObject(O);
    P = toPropertyKey(P);
    anObject(Attributes);
    if (IE8_DOM_DEFINE) try {
        return $defineProperty(O, P, Attributes);
    } catch (error) {}
    if ('get' in Attributes || 'set' in Attributes) throw new $TypeError('Accessors not supported');
    if ('value' in Attributes) O[P] = Attributes.value;
    return O;
};

},{"ca50eb9163928400":"5AxuF","d482f9e5478795e8":"kwjpQ","b6ad7537efb06f4b":"8Gm1h","16365a73399e7fe7":"jFjFb","fab1d366c47796d9":"lGuA3"}],"8Gm1h":[function(require,module,exports,__globalThis) {
'use strict';
var DESCRIPTORS = require("b22a5a2de93e3ad2");
var fails = require("249a5b857c2dfccd");
// V8 ~ Chrome 36-
// https://bugs.chromium.org/p/v8/issues/detail?id=3334
module.exports = DESCRIPTORS && fails(function() {
    // eslint-disable-next-line es/no-object-defineproperty -- required for testing
    return Object.defineProperty(function() {}, 'prototype', {
        value: 42,
        writable: false
    }).prototype !== 42;
});

},{"b22a5a2de93e3ad2":"5AxuF","249a5b857c2dfccd":"7Gv5z"}],"jFjFb":[function(require,module,exports,__globalThis) {
'use strict';
var isObject = require("2b6c6258a0a6082f");
var $String = String;
var $TypeError = TypeError;
// `Assert: Type(argument) is Object`
module.exports = function(argument) {
    if (isObject(argument)) return argument;
    throw new $TypeError($String(argument) + ' is not an object');
};

},{"2b6c6258a0a6082f":"5rTge"}],"es56c":[function(require,module,exports,__globalThis) {
'use strict';
var isCallable = require("99ee13632b3fa68");
var definePropertyModule = require("9ebb3e3004fccc0a");
var makeBuiltIn = require("f10cc812a3094053");
var defineGlobalProperty = require("d354802d852d9c2b");
module.exports = function(O, key, value, options) {
    if (!options) options = {};
    var simple = options.enumerable;
    var name = options.name !== undefined ? options.name : key;
    if (isCallable(value)) makeBuiltIn(value, name, options);
    if (options.global) {
        if (simple) O[key] = value;
        else defineGlobalProperty(key, value);
    } else {
        try {
            if (!options.unsafe) delete O[key];
            else if (O[key]) simple = true;
        } catch (error) {}
        if (simple) O[key] = value;
        else definePropertyModule.f(O, key, {
            value: value,
            enumerable: false,
            configurable: !options.nonConfigurable,
            writable: !options.nonWritable
        });
    }
    return O;
};

},{"99ee13632b3fa68":"2KfBB","9ebb3e3004fccc0a":"aBGsi","f10cc812a3094053":"6JWCA","d354802d852d9c2b":"48kcX"}],"6JWCA":[function(require,module,exports,__globalThis) {
'use strict';
var uncurryThis = require("ca84677f1ebd1804");
var fails = require("13360f2842eba261");
var isCallable = require("103e488c0928755a");
var hasOwn = require("cbf9b0e0779cc368");
var DESCRIPTORS = require("3f2eb7efeae2f72b");
var CONFIGURABLE_FUNCTION_NAME = require("548b10f284264c72").CONFIGURABLE;
var inspectSource = require("358f00f3103bd55b");
var InternalStateModule = require("9b2ce14119fd2412");
var enforceInternalState = InternalStateModule.enforce;
var getInternalState = InternalStateModule.get;
var $String = String;
// eslint-disable-next-line es/no-object-defineproperty -- safe
var defineProperty = Object.defineProperty;
var stringSlice = uncurryThis(''.slice);
var replace = uncurryThis(''.replace);
var join = uncurryThis([].join);
var CONFIGURABLE_LENGTH = DESCRIPTORS && !fails(function() {
    return defineProperty(function() {}, 'length', {
        value: 8
    }).length !== 8;
});
var TEMPLATE = String(String).split('String');
var makeBuiltIn = module.exports = function(value, name, options) {
    if (stringSlice($String(name), 0, 7) === 'Symbol(') name = '[' + replace($String(name), /^Symbol\(([^)]*)\).*$/, '$1') + ']';
    if (options && options.getter) name = 'get ' + name;
    if (options && options.setter) name = 'set ' + name;
    if (!hasOwn(value, 'name') || CONFIGURABLE_FUNCTION_NAME && value.name !== name) {
        if (DESCRIPTORS) defineProperty(value, 'name', {
            value: name,
            configurable: true
        });
        else value.name = name;
    }
    if (CONFIGURABLE_LENGTH && options && hasOwn(options, 'arity') && value.length !== options.arity) defineProperty(value, 'length', {
        value: options.arity
    });
    try {
        if (options && hasOwn(options, 'constructor') && options.constructor) {
            if (DESCRIPTORS) defineProperty(value, 'prototype', {
                writable: false
            });
        } else if (value.prototype) value.prototype = undefined;
    } catch (error) {}
    var state = enforceInternalState(value);
    if (!hasOwn(state, 'source')) state.source = join(TEMPLATE, typeof name == 'string' ? name : '');
    return value;
};
// add fake Function#toString for correct work wrapped methods / constructors with methods like LoDash isNative
// eslint-disable-next-line no-extend-native -- required
Function.prototype.toString = makeBuiltIn(function toString() {
    return isCallable(this) && getInternalState(this).source || inspectSource(this);
}, 'toString');

},{"ca84677f1ebd1804":"aAate","13360f2842eba261":"7Gv5z","103e488c0928755a":"2KfBB","cbf9b0e0779cc368":"9CekL","3f2eb7efeae2f72b":"5AxuF","548b10f284264c72":"d1uzf","358f00f3103bd55b":"aXOzF","9b2ce14119fd2412":"hbwRd"}],"d1uzf":[function(require,module,exports,__globalThis) {
'use strict';
var DESCRIPTORS = require("8ad2bacb0e20b95c");
var hasOwn = require("4eabfd8f83afc9d5");
var FunctionPrototype = Function.prototype;
// eslint-disable-next-line es/no-object-getownpropertydescriptor -- safe
var getDescriptor = DESCRIPTORS && Object.getOwnPropertyDescriptor;
var EXISTS = hasOwn(FunctionPrototype, 'name');
// additional protection from minified / mangled / dropped function names
var PROPER = EXISTS && (function something() {}).name === 'something';
var CONFIGURABLE = EXISTS && (!DESCRIPTORS || DESCRIPTORS && getDescriptor(FunctionPrototype, 'name').configurable);
module.exports = {
    EXISTS: EXISTS,
    PROPER: PROPER,
    CONFIGURABLE: CONFIGURABLE
};

},{"8ad2bacb0e20b95c":"5AxuF","4eabfd8f83afc9d5":"9CekL"}],"aXOzF":[function(require,module,exports,__globalThis) {
'use strict';
var uncurryThis = require("26e26db98367212e");
var isCallable = require("40ed9a4f6ae66648");
var store = require("485d48d6f4c6739e");
var functionToString = uncurryThis(Function.toString);
// this helper broken in `core-js@3.4.1-3.4.4`, so we can't use `shared` helper
if (!isCallable(store.inspectSource)) store.inspectSource = function(it) {
    return functionToString(it);
};
module.exports = store.inspectSource;

},{"26e26db98367212e":"aAate","40ed9a4f6ae66648":"2KfBB","485d48d6f4c6739e":"29eKX"}],"hbwRd":[function(require,module,exports,__globalThis) {
'use strict';
var NATIVE_WEAK_MAP = require("d3f0c9f3327b2fd6");
var globalThis = require("28c3574d0c39fe7e");
var isObject = require("f82e6cc0ac249fa5");
var createNonEnumerableProperty = require("c0ae163eea4ef97");
var hasOwn = require("6dea7358344877bb");
var shared = require("3e035a1241da2f0");
var sharedKey = require("88d6ccc27e779e5a");
var hiddenKeys = require("d40b9b3abdbb956e");
var OBJECT_ALREADY_INITIALIZED = 'Object already initialized';
var TypeError = globalThis.TypeError;
var WeakMap = globalThis.WeakMap;
var set, get, has;
var enforce = function(it) {
    return has(it) ? get(it) : set(it, {});
};
var getterFor = function(TYPE) {
    return function(it) {
        var state;
        if (!isObject(it) || (state = get(it)).type !== TYPE) throw new TypeError('Incompatible receiver, ' + TYPE + ' required');
        return state;
    };
};
if (NATIVE_WEAK_MAP || shared.state) {
    var store = shared.state || (shared.state = new WeakMap());
    /* eslint-disable no-self-assign -- prototype methods protection */ store.get = store.get;
    store.has = store.has;
    store.set = store.set;
    /* eslint-enable no-self-assign -- prototype methods protection */ set = function(it, metadata) {
        if (store.has(it)) throw new TypeError(OBJECT_ALREADY_INITIALIZED);
        metadata.facade = it;
        store.set(it, metadata);
        return metadata;
    };
    get = function(it) {
        return store.get(it) || {};
    };
    has = function(it) {
        return store.has(it);
    };
} else {
    var STATE = sharedKey('state');
    hiddenKeys[STATE] = true;
    set = function(it, metadata) {
        if (hasOwn(it, STATE)) throw new TypeError(OBJECT_ALREADY_INITIALIZED);
        metadata.facade = it;
        createNonEnumerableProperty(it, STATE, metadata);
        return metadata;
    };
    get = function(it) {
        return hasOwn(it, STATE) ? it[STATE] : {};
    };
    has = function(it) {
        return hasOwn(it, STATE);
    };
}
module.exports = {
    set: set,
    get: get,
    has: has,
    enforce: enforce,
    getterFor: getterFor
};

},{"d3f0c9f3327b2fd6":"6z7Mo","28c3574d0c39fe7e":"6xMjU","f82e6cc0ac249fa5":"5rTge","c0ae163eea4ef97":"i7bgu","6dea7358344877bb":"9CekL","3e035a1241da2f0":"29eKX","88d6ccc27e779e5a":"fDnL8","d40b9b3abdbb956e":"2sYlt"}],"6z7Mo":[function(require,module,exports,__globalThis) {
'use strict';
var globalThis = require("8b1a8c1dbfd18eb5");
var isCallable = require("aa77fff8d5ef0565");
var WeakMap = globalThis.WeakMap;
module.exports = isCallable(WeakMap) && /native code/.test(String(WeakMap));

},{"8b1a8c1dbfd18eb5":"6xMjU","aa77fff8d5ef0565":"2KfBB"}],"fDnL8":[function(require,module,exports,__globalThis) {
'use strict';
var shared = require("dbc8182adeb8c92f");
var uid = require("90b4ffb58508a6e5");
var keys = shared('keys');
module.exports = function(key) {
    return keys[key] || (keys[key] = uid(key));
};

},{"dbc8182adeb8c92f":"6SeRV","90b4ffb58508a6e5":"dePDt"}],"2sYlt":[function(require,module,exports,__globalThis) {
'use strict';
module.exports = {};

},{}],"i7gI0":[function(require,module,exports,__globalThis) {
'use strict';
var hasOwn = require("d91d786cc71453ce");
var ownKeys = require("88cb809f98beddc6");
var getOwnPropertyDescriptorModule = require("10ea642aad5f7c21");
var definePropertyModule = require("39ff598ce822187e");
module.exports = function(target, source, exceptions) {
    var keys = ownKeys(source);
    var defineProperty = definePropertyModule.f;
    var getOwnPropertyDescriptor = getOwnPropertyDescriptorModule.f;
    for(var i = 0; i < keys.length; i++){
        var key = keys[i];
        if (!hasOwn(target, key) && !(exceptions && hasOwn(exceptions, key))) defineProperty(target, key, getOwnPropertyDescriptor(source, key));
    }
};

},{"d91d786cc71453ce":"9CekL","88cb809f98beddc6":"dDsbC","10ea642aad5f7c21":"dqLxA","39ff598ce822187e":"aBGsi"}],"dDsbC":[function(require,module,exports,__globalThis) {
'use strict';
var getBuiltIn = require("3cc1e4329d869e34");
var uncurryThis = require("2b8e77cbdbe3db7a");
var getOwnPropertyNamesModule = require("d703bcb62fcda216");
var getOwnPropertySymbolsModule = require("157674bad2772c6d");
var anObject = require("a09e060b9cae3c6c");
var concat = uncurryThis([].concat);
// all object keys, includes non-enumerable and symbols
module.exports = getBuiltIn('Reflect', 'ownKeys') || function ownKeys(it) {
    var keys = getOwnPropertyNamesModule.f(anObject(it));
    var getOwnPropertySymbols = getOwnPropertySymbolsModule.f;
    return getOwnPropertySymbols ? concat(keys, getOwnPropertySymbols(it)) : keys;
};

},{"3cc1e4329d869e34":"h2CMt","2b8e77cbdbe3db7a":"aAate","d703bcb62fcda216":"kdCGz","157674bad2772c6d":"5fq5o","a09e060b9cae3c6c":"jFjFb"}],"kdCGz":[function(require,module,exports,__globalThis) {
'use strict';
var internalObjectKeys = require("6d8591e17a49376c");
var enumBugKeys = require("2c933f93dd98f385");
var hiddenKeys = enumBugKeys.concat('length', 'prototype');
// `Object.getOwnPropertyNames` method
// https://tc39.es/ecma262/#sec-object.getownpropertynames
// eslint-disable-next-line es/no-object-getownpropertynames -- safe
exports.f = Object.getOwnPropertyNames || function getOwnPropertyNames(O) {
    return internalObjectKeys(O, hiddenKeys);
};

},{"6d8591e17a49376c":"gRwJ4","2c933f93dd98f385":"6IITF"}],"gRwJ4":[function(require,module,exports,__globalThis) {
'use strict';
var uncurryThis = require("363ee0e6bb4f46a7");
var hasOwn = require("3183fe0b0bf6f6ac");
var toIndexedObject = require("28192ac12e934672");
var indexOf = require("a5f9c5d8e993ccd6").indexOf;
var hiddenKeys = require("57775908f1581bc6");
var push = uncurryThis([].push);
module.exports = function(object, names) {
    var O = toIndexedObject(object);
    var i = 0;
    var result = [];
    var key;
    for(key in O)!hasOwn(hiddenKeys, key) && hasOwn(O, key) && push(result, key);
    // Don't enum bug & hidden keys
    while(names.length > i)if (hasOwn(O, key = names[i++])) ~indexOf(result, key) || push(result, key);
    return result;
};

},{"363ee0e6bb4f46a7":"aAate","3183fe0b0bf6f6ac":"9CekL","28192ac12e934672":"58zOi","a5f9c5d8e993ccd6":"kvmnR","57775908f1581bc6":"2sYlt"}],"kvmnR":[function(require,module,exports,__globalThis) {
'use strict';
var toIndexedObject = require("d5dcbcd68ac5acd0");
var toAbsoluteIndex = require("212b13aecfa48226");
var lengthOfArrayLike = require("e5a8b3e1da4c5637");
// `Array.prototype.{ indexOf, includes }` methods implementation
var createMethod = function(IS_INCLUDES) {
    return function($this, el, fromIndex) {
        var O = toIndexedObject($this);
        var length = lengthOfArrayLike(O);
        if (length === 0) return !IS_INCLUDES && -1;
        var index = toAbsoluteIndex(fromIndex, length);
        var value;
        // Array#includes uses SameValueZero equality algorithm
        // eslint-disable-next-line no-self-compare -- NaN check
        if (IS_INCLUDES && el !== el) while(length > index){
            value = O[index++];
            // eslint-disable-next-line no-self-compare -- NaN check
            if (value !== value) return true;
        // Array#indexOf ignores holes, Array#includes - not
        }
        else for(; length > index; index++){
            if ((IS_INCLUDES || index in O) && O[index] === el) return IS_INCLUDES || index || 0;
        }
        return !IS_INCLUDES && -1;
    };
};
module.exports = {
    // `Array.prototype.includes` method
    // https://tc39.es/ecma262/#sec-array.prototype.includes
    includes: createMethod(true),
    // `Array.prototype.indexOf` method
    // https://tc39.es/ecma262/#sec-array.prototype.indexof
    indexOf: createMethod(false)
};

},{"d5dcbcd68ac5acd0":"58zOi","212b13aecfa48226":"hMPua","e5a8b3e1da4c5637":"132UY"}],"hMPua":[function(require,module,exports,__globalThis) {
'use strict';
var toIntegerOrInfinity = require("72fe0a53ad43912c");
var max = Math.max;
var min = Math.min;
// Helper for a popular repeating case of the spec:
// Let integer be ? ToInteger(index).
// If integer < 0, let result be max((length + integer), 0); else let result be min(integer, length).
module.exports = function(index, length) {
    var integer = toIntegerOrInfinity(index);
    return integer < 0 ? max(integer + length, 0) : min(integer, length);
};

},{"72fe0a53ad43912c":"hfRnH"}],"hfRnH":[function(require,module,exports,__globalThis) {
'use strict';
var trunc = require("3403cba02b5f61d8");
// `ToIntegerOrInfinity` abstract operation
// https://tc39.es/ecma262/#sec-tointegerorinfinity
module.exports = function(argument) {
    var number = +argument;
    // eslint-disable-next-line no-self-compare -- NaN check
    return number !== number || number === 0 ? 0 : trunc(number);
};

},{"3403cba02b5f61d8":"bZw4A"}],"bZw4A":[function(require,module,exports,__globalThis) {
'use strict';
var ceil = Math.ceil;
var floor = Math.floor;
// `Math.trunc` method
// https://tc39.es/ecma262/#sec-math.trunc
// eslint-disable-next-line es/no-math-trunc -- safe
module.exports = Math.trunc || function trunc(x) {
    var n = +x;
    return (n > 0 ? floor : ceil)(n);
};

},{}],"132UY":[function(require,module,exports,__globalThis) {
'use strict';
var toLength = require("23d9716c54a2ab90");
// `LengthOfArrayLike` abstract operation
// https://tc39.es/ecma262/#sec-lengthofarraylike
module.exports = function(obj) {
    return toLength(obj.length);
};

},{"23d9716c54a2ab90":"8PIfI"}],"8PIfI":[function(require,module,exports,__globalThis) {
'use strict';
var toIntegerOrInfinity = require("c48d3a8b8ac52b0b");
var min = Math.min;
// `ToLength` abstract operation
// https://tc39.es/ecma262/#sec-tolength
module.exports = function(argument) {
    var len = toIntegerOrInfinity(argument);
    return len > 0 ? min(len, 0x1FFFFFFFFFFFFF) : 0; // 2 ** 53 - 1 == 9007199254740991
};

},{"c48d3a8b8ac52b0b":"hfRnH"}],"6IITF":[function(require,module,exports,__globalThis) {
'use strict';
// IE8- don't enum bug keys
module.exports = [
    'constructor',
    'hasOwnProperty',
    'isPrototypeOf',
    'propertyIsEnumerable',
    'toLocaleString',
    'toString',
    'valueOf'
];

},{}],"5fq5o":[function(require,module,exports,__globalThis) {
'use strict';
// eslint-disable-next-line es/no-object-getownpropertysymbols -- safe
exports.f = Object.getOwnPropertySymbols;

},{}],"3rvW8":[function(require,module,exports,__globalThis) {
'use strict';
var fails = require("10299561ea0c7870");
var isCallable = require("8b1ecdaf59f07210");
var replacement = /#|\.prototype\./;
var isForced = function(feature, detection) {
    var value = data[normalize(feature)];
    return value === POLYFILL ? true : value === NATIVE ? false : isCallable(detection) ? fails(detection) : !!detection;
};
var normalize = isForced.normalize = function(string) {
    return String(string).replace(replacement, '.').toLowerCase();
};
var data = isForced.data = {};
var NATIVE = isForced.NATIVE = 'N';
var POLYFILL = isForced.POLYFILL = 'P';
module.exports = isForced;

},{"10299561ea0c7870":"7Gv5z","8b1ecdaf59f07210":"2KfBB"}],"9fjiV":[function(require,module,exports,__globalThis) {
'use strict';
var globalThis = require("629a4d99f4fe5b2e");
var apply = require("e574be68c288c7c8");
var bind = require("df212787338802d3");
var isCallable = require("afdf018c2d01bbc6");
var hasOwn = require("35a3e849940fd612");
var fails = require("b8bf5434d2248ca7");
var html = require("731f9370cc21fc3b");
var arraySlice = require("ec358060964e4bde");
var createElement = require("907adb6d219da7a3");
var validateArgumentsLength = require("f398561ebd49a798");
var IS_IOS = require("8a8e342aaad83bb");
var IS_NODE = require("6eef8b4e43dd6731");
var set = globalThis.setImmediate;
var clear = globalThis.clearImmediate;
var process = globalThis.process;
var Dispatch = globalThis.Dispatch;
var Function = globalThis.Function;
var MessageChannel = globalThis.MessageChannel;
var String = globalThis.String;
var counter = 0;
var queue = {};
var ONREADYSTATECHANGE = 'onreadystatechange';
var $location, defer, channel, port;
fails(function() {
    // Deno throws a ReferenceError on `location` access without `--location` flag
    $location = globalThis.location;
});
var run = function(id) {
    if (hasOwn(queue, id)) {
        var fn = queue[id];
        delete queue[id];
        fn();
    }
};
var runner = function(id) {
    return function() {
        run(id);
    };
};
var eventListener = function(event) {
    run(event.data);
};
var globalPostMessageDefer = function(id) {
    // old engines have not location.origin
    globalThis.postMessage(String(id), $location.protocol + '//' + $location.host);
};
// Node.js 0.9+ & IE10+ has setImmediate, otherwise:
if (!set || !clear) {
    set = function setImmediate(handler) {
        validateArgumentsLength(arguments.length, 1);
        var fn = isCallable(handler) ? handler : Function(handler);
        var args = arraySlice(arguments, 1);
        queue[++counter] = function() {
            apply(fn, undefined, args);
        };
        defer(counter);
        return counter;
    };
    clear = function clearImmediate(id) {
        delete queue[id];
    };
    // Node.js 0.8-
    if (IS_NODE) defer = function(id) {
        process.nextTick(runner(id));
    };
    else if (Dispatch && Dispatch.now) defer = function(id) {
        Dispatch.now(runner(id));
    };
    else if (MessageChannel && !IS_IOS) {
        channel = new MessageChannel();
        port = channel.port2;
        channel.port1.onmessage = eventListener;
        defer = bind(port.postMessage, port);
    // Browsers with postMessage, skip WebWorkers
    // IE8 has postMessage, but it's sync & typeof its postMessage is 'object'
    } else if (globalThis.addEventListener && isCallable(globalThis.postMessage) && !globalThis.importScripts && $location && $location.protocol !== 'file:' && !fails(globalPostMessageDefer)) {
        defer = globalPostMessageDefer;
        globalThis.addEventListener('message', eventListener, false);
    // IE8-
    } else if (ONREADYSTATECHANGE in createElement('script')) defer = function(id) {
        html.appendChild(createElement('script'))[ONREADYSTATECHANGE] = function() {
            html.removeChild(this);
            run(id);
        };
    };
    else defer = function(id) {
        setTimeout(runner(id), 0);
    };
}
module.exports = {
    set: set,
    clear: clear
};

},{"629a4d99f4fe5b2e":"6xMjU","e574be68c288c7c8":"9A5Vw","df212787338802d3":"l8jub","afdf018c2d01bbc6":"2KfBB","35a3e849940fd612":"9CekL","b8bf5434d2248ca7":"7Gv5z","731f9370cc21fc3b":"2ac6V","ec358060964e4bde":"kGYHC","907adb6d219da7a3":"eF8HX","f398561ebd49a798":"elQJL","8a8e342aaad83bb":"9HLc7","6eef8b4e43dd6731":"3ENS9"}],"9A5Vw":[function(require,module,exports,__globalThis) {
'use strict';
var NATIVE_BIND = require("d07466971ded2aca");
var FunctionPrototype = Function.prototype;
var apply = FunctionPrototype.apply;
var call = FunctionPrototype.call;
// eslint-disable-next-line es/no-function-prototype-bind, es/no-reflect -- safe
module.exports = typeof Reflect == 'object' && Reflect.apply || (NATIVE_BIND ? call.bind(apply) : function() {
    return call.apply(apply, arguments);
});

},{"d07466971ded2aca":"5U5xz"}],"l8jub":[function(require,module,exports,__globalThis) {
'use strict';
var uncurryThis = require("92f6f475baa85665");
var aCallable = require("547ee4f9dab0cc76");
var NATIVE_BIND = require("5acd31cba656d393");
var bind = uncurryThis(uncurryThis.bind);
// optional / simple context binding
module.exports = function(fn, that) {
    aCallable(fn);
    return that === undefined ? fn : NATIVE_BIND ? bind(fn, that) : function() {
        return fn.apply(that, arguments);
    };
};

},{"92f6f475baa85665":"1401W","547ee4f9dab0cc76":"dxhWU","5acd31cba656d393":"5U5xz"}],"1401W":[function(require,module,exports,__globalThis) {
'use strict';
var classofRaw = require("8e77093015e1e67f");
var uncurryThis = require("9daa4dbbca634c9e");
module.exports = function(fn) {
    // Nashorn bug:
    //   https://github.com/zloirock/core-js/issues/1128
    //   https://github.com/zloirock/core-js/issues/1130
    if (classofRaw(fn) === 'Function') return uncurryThis(fn);
};

},{"8e77093015e1e67f":"fKrQp","9daa4dbbca634c9e":"aAate"}],"2ac6V":[function(require,module,exports,__globalThis) {
'use strict';
var getBuiltIn = require("14cb391fa4a0dda8");
module.exports = getBuiltIn('document', 'documentElement');

},{"14cb391fa4a0dda8":"h2CMt"}],"kGYHC":[function(require,module,exports,__globalThis) {
'use strict';
var uncurryThis = require("5250b5c9324ccbe");
module.exports = uncurryThis([].slice);

},{"5250b5c9324ccbe":"aAate"}],"elQJL":[function(require,module,exports,__globalThis) {
'use strict';
var $TypeError = TypeError;
module.exports = function(passed, required) {
    if (passed < required) throw new $TypeError('Not enough arguments');
    return passed;
};

},{}],"9HLc7":[function(require,module,exports,__globalThis) {
'use strict';
var userAgent = require("88313d0d5d3e28c");
module.exports = /ipad|iphone|ipod/i.test(userAgent) && /applewebkit/i.test(userAgent);

},{"88313d0d5d3e28c":"qxRHs"}],"3ENS9":[function(require,module,exports,__globalThis) {
'use strict';
var ENVIRONMENT = require("5fac34e3c4c0e043");
module.exports = ENVIRONMENT === 'NODE';

},{"5fac34e3c4c0e043":"k2Sud"}],"k2Sud":[function(require,module,exports,__globalThis) {
'use strict';
/* global Bun, Deno -- detection */ var globalThis = require("7dc361f46ecde901");
var userAgent = require("9f6e24ecbba66a9e");
var classof = require("a008a59fdc341842");
var userAgentStartsWith = function(string) {
    return userAgent.slice(0, string.length) === string;
};
module.exports = function() {
    if (userAgentStartsWith('Bun/')) return 'BUN';
    if (userAgentStartsWith('Cloudflare-Workers')) return 'CLOUDFLARE';
    if (userAgentStartsWith('Deno/')) return 'DENO';
    if (userAgentStartsWith('Node.js/')) return 'NODE';
    if (globalThis.Bun && typeof Bun.version == 'string') return 'BUN';
    if (globalThis.Deno && typeof Deno.version == 'object') return 'DENO';
    if (classof(globalThis.process) === 'process') return 'NODE';
    if (globalThis.window && globalThis.document) return 'BROWSER';
    return 'REST';
}();

},{"7dc361f46ecde901":"6xMjU","9f6e24ecbba66a9e":"qxRHs","a008a59fdc341842":"fKrQp"}],"cpv3g":[function(require,module,exports,__globalThis) {
'use strict';
var $ = require("33581c362196ed1f");
var globalThis = require("503bb555249cad41");
var setTask = require("4219ce460223bd08").set;
var schedulersFix = require("738dc378e6a94c64");
// https://github.com/oven-sh/bun/issues/1633
var setImmediate = globalThis.setImmediate ? schedulersFix(setTask, false) : setTask;
// `setImmediate` method
// http://w3c.github.io/setImmediate/#si-setImmediate
$({
    global: true,
    bind: true,
    enumerable: true,
    forced: globalThis.setImmediate !== setImmediate
}, {
    setImmediate: setImmediate
});

},{"33581c362196ed1f":"7Vckd","503bb555249cad41":"6xMjU","4219ce460223bd08":"9fjiV","738dc378e6a94c64":"fRRu2"}],"fRRu2":[function(require,module,exports,__globalThis) {
'use strict';
var globalThis = require("aa6765693e58a0fe");
var apply = require("a68ecfcbf29c46f6");
var isCallable = require("7087588d33667af2");
var ENVIRONMENT = require("864edee099e8affb");
var USER_AGENT = require("3a3a5a2cfab86f21");
var arraySlice = require("cff2c830bdea4f24");
var validateArgumentsLength = require("58a74f00cee1ac64");
var Function = globalThis.Function;
// dirty IE9- and Bun 0.3.0- checks
var WRAP = /MSIE .\./.test(USER_AGENT) || ENVIRONMENT === 'BUN' && function() {
    var version = globalThis.Bun.version.split('.');
    return version.length < 3 || version[0] === '0' && (version[1] < 3 || version[1] === '3' && version[2] === '0');
}();
// IE9- / Bun 0.3.0- setTimeout / setInterval / setImmediate additional parameters fix
// https://html.spec.whatwg.org/multipage/timers-and-user-prompts.html#timers
// https://github.com/oven-sh/bun/issues/1633
module.exports = function(scheduler, hasTimeArg) {
    var firstParamIndex = hasTimeArg ? 2 : 1;
    return WRAP ? function(handler, timeout /* , ...arguments */ ) {
        var boundArgs = validateArgumentsLength(arguments.length, 1) > firstParamIndex;
        var fn = isCallable(handler) ? handler : Function(handler);
        var params = boundArgs ? arraySlice(arguments, firstParamIndex) : [];
        var callback = boundArgs ? function() {
            apply(fn, this, params);
        } : fn;
        return hasTimeArg ? scheduler(callback, timeout) : scheduler(callback);
    } : scheduler;
};

},{"aa6765693e58a0fe":"6xMjU","a68ecfcbf29c46f6":"9A5Vw","7087588d33667af2":"2KfBB","864edee099e8affb":"k2Sud","3a3a5a2cfab86f21":"qxRHs","cff2c830bdea4f24":"kGYHC","58a74f00cee1ac64":"elQJL"}],"f6ot0":[function(require,module,exports,__globalThis) {
/**
 * Copyright (c) 2014-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */ var runtime = function(exports) {
    "use strict";
    var Op = Object.prototype;
    var hasOwn = Op.hasOwnProperty;
    var defineProperty = Object.defineProperty || function(obj, key, desc) {
        obj[key] = desc.value;
    };
    var undefined; // More compressible than void 0.
    var $Symbol = typeof Symbol === "function" ? Symbol : {};
    var iteratorSymbol = $Symbol.iterator || "@@iterator";
    var asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator";
    var toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag";
    function define(obj, key, value) {
        Object.defineProperty(obj, key, {
            value: value,
            enumerable: true,
            configurable: true,
            writable: true
        });
        return obj[key];
    }
    try {
        // IE 8 has a broken Object.defineProperty that only works on DOM objects.
        define({}, "");
    } catch (err) {
        define = function(obj, key, value) {
            return obj[key] = value;
        };
    }
    function wrap(innerFn, outerFn, self, tryLocsList) {
        // If outerFn provided and outerFn.prototype is a Generator, then outerFn.prototype instanceof Generator.
        var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator;
        var generator = Object.create(protoGenerator.prototype);
        var context = new Context(tryLocsList || []);
        // The ._invoke method unifies the implementations of the .next,
        // .throw, and .return methods.
        defineProperty(generator, "_invoke", {
            value: makeInvokeMethod(innerFn, self, context)
        });
        return generator;
    }
    exports.wrap = wrap;
    // Try/catch helper to minimize deoptimizations. Returns a completion
    // record like context.tryEntries[i].completion. This interface could
    // have been (and was previously) designed to take a closure to be
    // invoked without arguments, but in all the cases we care about we
    // already have an existing method we want to call, so there's no need
    // to create a new function object. We can even get away with assuming
    // the method takes exactly one argument, since that happens to be true
    // in every case, so we don't have to touch the arguments object. The
    // only additional allocation required is the completion record, which
    // has a stable shape and so hopefully should be cheap to allocate.
    function tryCatch(fn, obj, arg) {
        try {
            return {
                type: "normal",
                arg: fn.call(obj, arg)
            };
        } catch (err) {
            return {
                type: "throw",
                arg: err
            };
        }
    }
    var GenStateSuspendedStart = "suspendedStart";
    var GenStateSuspendedYield = "suspendedYield";
    var GenStateExecuting = "executing";
    var GenStateCompleted = "completed";
    // Returning this object from the innerFn has the same effect as
    // breaking out of the dispatch switch statement.
    var ContinueSentinel = {};
    // Dummy constructor functions that we use as the .constructor and
    // .constructor.prototype properties for functions that return Generator
    // objects. For full spec compliance, you may wish to configure your
    // minifier not to mangle the names of these two functions.
    function Generator() {}
    function GeneratorFunction() {}
    function GeneratorFunctionPrototype() {}
    // This is a polyfill for %IteratorPrototype% for environments that
    // don't natively support it.
    var IteratorPrototype = {};
    define(IteratorPrototype, iteratorSymbol, function() {
        return this;
    });
    var getProto = Object.getPrototypeOf;
    var NativeIteratorPrototype = getProto && getProto(getProto(values([])));
    if (NativeIteratorPrototype && NativeIteratorPrototype !== Op && hasOwn.call(NativeIteratorPrototype, iteratorSymbol)) // This environment has a native %IteratorPrototype%; use it instead
    // of the polyfill.
    IteratorPrototype = NativeIteratorPrototype;
    var Gp = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(IteratorPrototype);
    GeneratorFunction.prototype = GeneratorFunctionPrototype;
    defineProperty(Gp, "constructor", {
        value: GeneratorFunctionPrototype,
        configurable: true
    });
    defineProperty(GeneratorFunctionPrototype, "constructor", {
        value: GeneratorFunction,
        configurable: true
    });
    GeneratorFunction.displayName = define(GeneratorFunctionPrototype, toStringTagSymbol, "GeneratorFunction");
    // Helper for defining the .next, .throw, and .return methods of the
    // Iterator interface in terms of a single ._invoke method.
    function defineIteratorMethods(prototype) {
        [
            "next",
            "throw",
            "return"
        ].forEach(function(method) {
            define(prototype, method, function(arg) {
                return this._invoke(method, arg);
            });
        });
    }
    exports.isGeneratorFunction = function(genFun) {
        var ctor = typeof genFun === "function" && genFun.constructor;
        return ctor ? ctor === GeneratorFunction || // For the native GeneratorFunction constructor, the best we can
        // do is to check its .name property.
        (ctor.displayName || ctor.name) === "GeneratorFunction" : false;
    };
    exports.mark = function(genFun) {
        if (Object.setPrototypeOf) Object.setPrototypeOf(genFun, GeneratorFunctionPrototype);
        else {
            genFun.__proto__ = GeneratorFunctionPrototype;
            define(genFun, toStringTagSymbol, "GeneratorFunction");
        }
        genFun.prototype = Object.create(Gp);
        return genFun;
    };
    // Within the body of any async function, `await x` is transformed to
    // `yield regeneratorRuntime.awrap(x)`, so that the runtime can test
    // `hasOwn.call(value, "__await")` to determine if the yielded value is
    // meant to be awaited.
    exports.awrap = function(arg) {
        return {
            __await: arg
        };
    };
    function AsyncIterator(generator, PromiseImpl) {
        function invoke(method, arg, resolve, reject) {
            var record = tryCatch(generator[method], generator, arg);
            if (record.type === "throw") reject(record.arg);
            else {
                var result = record.arg;
                var value = result.value;
                if (value && typeof value === "object" && hasOwn.call(value, "__await")) return PromiseImpl.resolve(value.__await).then(function(value) {
                    invoke("next", value, resolve, reject);
                }, function(err) {
                    invoke("throw", err, resolve, reject);
                });
                return PromiseImpl.resolve(value).then(function(unwrapped) {
                    // When a yielded Promise is resolved, its final value becomes
                    // the .value of the Promise<{value,done}> result for the
                    // current iteration.
                    result.value = unwrapped;
                    resolve(result);
                }, function(error) {
                    // If a rejected Promise was yielded, throw the rejection back
                    // into the async generator function so it can be handled there.
                    return invoke("throw", error, resolve, reject);
                });
            }
        }
        var previousPromise;
        function enqueue(method, arg) {
            function callInvokeWithMethodAndArg() {
                return new PromiseImpl(function(resolve, reject) {
                    invoke(method, arg, resolve, reject);
                });
            }
            return previousPromise = // If enqueue has been called before, then we want to wait until
            // all previous Promises have been resolved before calling invoke,
            // so that results are always delivered in the correct order. If
            // enqueue has not been called before, then it is important to
            // call invoke immediately, without waiting on a callback to fire,
            // so that the async generator function has the opportunity to do
            // any necessary setup in a predictable way. This predictability
            // is why the Promise constructor synchronously invokes its
            // executor callback, and why async functions synchronously
            // execute code before the first await. Since we implement simple
            // async functions in terms of async generators, it is especially
            // important to get this right, even though it requires care.
            previousPromise ? previousPromise.then(callInvokeWithMethodAndArg, // Avoid propagating failures to Promises returned by later
            // invocations of the iterator.
            callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg();
        }
        // Define the unified helper method that is used to implement .next,
        // .throw, and .return (see defineIteratorMethods).
        defineProperty(this, "_invoke", {
            value: enqueue
        });
    }
    defineIteratorMethods(AsyncIterator.prototype);
    define(AsyncIterator.prototype, asyncIteratorSymbol, function() {
        return this;
    });
    exports.AsyncIterator = AsyncIterator;
    // Note that simple async functions are implemented on top of
    // AsyncIterator objects; they just return a Promise for the value of
    // the final result produced by the iterator.
    exports.async = function(innerFn, outerFn, self, tryLocsList, PromiseImpl) {
        if (PromiseImpl === void 0) PromiseImpl = Promise;
        var iter = new AsyncIterator(wrap(innerFn, outerFn, self, tryLocsList), PromiseImpl);
        return exports.isGeneratorFunction(outerFn) ? iter // If outerFn is a generator, return the full iterator.
         : iter.next().then(function(result) {
            return result.done ? result.value : iter.next();
        });
    };
    function makeInvokeMethod(innerFn, self, context) {
        var state = GenStateSuspendedStart;
        return function invoke(method, arg) {
            if (state === GenStateExecuting) throw new Error("Generator is already running");
            if (state === GenStateCompleted) {
                if (method === "throw") throw arg;
                // Be forgiving, per GeneratorResume behavior specified since ES2015:
                // ES2015 spec, step 3: https://262.ecma-international.org/6.0/#sec-generatorresume
                // Latest spec, step 2: https://tc39.es/ecma262/#sec-generatorresume
                return doneResult();
            }
            context.method = method;
            context.arg = arg;
            while(true){
                var delegate = context.delegate;
                if (delegate) {
                    var delegateResult = maybeInvokeDelegate(delegate, context);
                    if (delegateResult) {
                        if (delegateResult === ContinueSentinel) continue;
                        return delegateResult;
                    }
                }
                if (context.method === "next") // Setting context._sent for legacy support of Babel's
                // function.sent implementation.
                context.sent = context._sent = context.arg;
                else if (context.method === "throw") {
                    if (state === GenStateSuspendedStart) {
                        state = GenStateCompleted;
                        throw context.arg;
                    }
                    context.dispatchException(context.arg);
                } else if (context.method === "return") context.abrupt("return", context.arg);
                state = GenStateExecuting;
                var record = tryCatch(innerFn, self, context);
                if (record.type === "normal") {
                    // If an exception is thrown from innerFn, we leave state ===
                    // GenStateExecuting and loop back for another invocation.
                    state = context.done ? GenStateCompleted : GenStateSuspendedYield;
                    if (record.arg === ContinueSentinel) continue;
                    return {
                        value: record.arg,
                        done: context.done
                    };
                } else if (record.type === "throw") {
                    state = GenStateCompleted;
                    // Dispatch the exception by looping back around to the
                    // context.dispatchException(context.arg) call above.
                    context.method = "throw";
                    context.arg = record.arg;
                }
            }
        };
    }
    // Call delegate.iterator[context.method](context.arg) and handle the
    // result, either by returning a { value, done } result from the
    // delegate iterator, or by modifying context.method and context.arg,
    // setting context.delegate to null, and returning the ContinueSentinel.
    function maybeInvokeDelegate(delegate, context) {
        var methodName = context.method;
        var method = delegate.iterator[methodName];
        if (method === undefined) {
            // A .throw or .return when the delegate iterator has no .throw
            // method, or a missing .next method, always terminate the
            // yield* loop.
            context.delegate = null;
            // Note: ["return"] must be used for ES3 parsing compatibility.
            if (methodName === "throw" && delegate.iterator["return"]) {
                // If the delegate iterator has a return method, give it a
                // chance to clean up.
                context.method = "return";
                context.arg = undefined;
                maybeInvokeDelegate(delegate, context);
                if (context.method === "throw") // If maybeInvokeDelegate(context) changed context.method from
                // "return" to "throw", let that override the TypeError below.
                return ContinueSentinel;
            }
            if (methodName !== "return") {
                context.method = "throw";
                context.arg = new TypeError("The iterator does not provide a '" + methodName + "' method");
            }
            return ContinueSentinel;
        }
        var record = tryCatch(method, delegate.iterator, context.arg);
        if (record.type === "throw") {
            context.method = "throw";
            context.arg = record.arg;
            context.delegate = null;
            return ContinueSentinel;
        }
        var info = record.arg;
        if (!info) {
            context.method = "throw";
            context.arg = new TypeError("iterator result is not an object");
            context.delegate = null;
            return ContinueSentinel;
        }
        if (info.done) {
            // Assign the result of the finished delegate to the temporary
            // variable specified by delegate.resultName (see delegateYield).
            context[delegate.resultName] = info.value;
            // Resume execution at the desired location (see delegateYield).
            context.next = delegate.nextLoc;
            // If context.method was "throw" but the delegate handled the
            // exception, let the outer generator proceed normally. If
            // context.method was "next", forget context.arg since it has been
            // "consumed" by the delegate iterator. If context.method was
            // "return", allow the original .return call to continue in the
            // outer generator.
            if (context.method !== "return") {
                context.method = "next";
                context.arg = undefined;
            }
        } else // Re-yield the result returned by the delegate method.
        return info;
        // The delegate iterator is finished, so forget it and continue with
        // the outer generator.
        context.delegate = null;
        return ContinueSentinel;
    }
    // Define Generator.prototype.{next,throw,return} in terms of the
    // unified ._invoke helper method.
    defineIteratorMethods(Gp);
    define(Gp, toStringTagSymbol, "Generator");
    // A Generator should always return itself as the iterator object when the
    // @@iterator function is called on it. Some browsers' implementations of the
    // iterator prototype chain incorrectly implement this, causing the Generator
    // object to not be returned from this call. This ensures that doesn't happen.
    // See https://github.com/facebook/regenerator/issues/274 for more details.
    define(Gp, iteratorSymbol, function() {
        return this;
    });
    define(Gp, "toString", function() {
        return "[object Generator]";
    });
    function pushTryEntry(locs) {
        var entry = {
            tryLoc: locs[0]
        };
        if (1 in locs) entry.catchLoc = locs[1];
        if (2 in locs) {
            entry.finallyLoc = locs[2];
            entry.afterLoc = locs[3];
        }
        this.tryEntries.push(entry);
    }
    function resetTryEntry(entry) {
        var record = entry.completion || {};
        record.type = "normal";
        delete record.arg;
        entry.completion = record;
    }
    function Context(tryLocsList) {
        // The root entry object (effectively a try statement without a catch
        // or a finally block) gives us a place to store values thrown from
        // locations where there is no enclosing try statement.
        this.tryEntries = [
            {
                tryLoc: "root"
            }
        ];
        tryLocsList.forEach(pushTryEntry, this);
        this.reset(true);
    }
    exports.keys = function(val) {
        var object = Object(val);
        var keys = [];
        for(var key in object)keys.push(key);
        keys.reverse();
        // Rather than returning an object with a next method, we keep
        // things simple and return the next function itself.
        return function next() {
            while(keys.length){
                var key = keys.pop();
                if (key in object) {
                    next.value = key;
                    next.done = false;
                    return next;
                }
            }
            // To avoid creating an additional object, we just hang the .value
            // and .done properties off the next function object itself. This
            // also ensures that the minifier will not anonymize the function.
            next.done = true;
            return next;
        };
    };
    function values(iterable) {
        if (iterable != null) {
            var iteratorMethod = iterable[iteratorSymbol];
            if (iteratorMethod) return iteratorMethod.call(iterable);
            if (typeof iterable.next === "function") return iterable;
            if (!isNaN(iterable.length)) {
                var i = -1, next = function next() {
                    while(++i < iterable.length)if (hasOwn.call(iterable, i)) {
                        next.value = iterable[i];
                        next.done = false;
                        return next;
                    }
                    next.value = undefined;
                    next.done = true;
                    return next;
                };
                return next.next = next;
            }
        }
        throw new TypeError(typeof iterable + " is not iterable");
    }
    exports.values = values;
    function doneResult() {
        return {
            value: undefined,
            done: true
        };
    }
    Context.prototype = {
        constructor: Context,
        reset: function(skipTempReset) {
            this.prev = 0;
            this.next = 0;
            // Resetting context._sent for legacy support of Babel's
            // function.sent implementation.
            this.sent = this._sent = undefined;
            this.done = false;
            this.delegate = null;
            this.method = "next";
            this.arg = undefined;
            this.tryEntries.forEach(resetTryEntry);
            if (!skipTempReset) {
                for(var name in this)// Not sure about the optimal order of these conditions:
                if (name.charAt(0) === "t" && hasOwn.call(this, name) && !isNaN(+name.slice(1))) this[name] = undefined;
            }
        },
        stop: function() {
            this.done = true;
            var rootEntry = this.tryEntries[0];
            var rootRecord = rootEntry.completion;
            if (rootRecord.type === "throw") throw rootRecord.arg;
            return this.rval;
        },
        dispatchException: function(exception) {
            if (this.done) throw exception;
            var context = this;
            function handle(loc, caught) {
                record.type = "throw";
                record.arg = exception;
                context.next = loc;
                if (caught) {
                    // If the dispatched exception was caught by a catch block,
                    // then let that catch block handle the exception normally.
                    context.method = "next";
                    context.arg = undefined;
                }
                return !!caught;
            }
            for(var i = this.tryEntries.length - 1; i >= 0; --i){
                var entry = this.tryEntries[i];
                var record = entry.completion;
                if (entry.tryLoc === "root") // Exception thrown outside of any try block that could handle
                // it, so set the completion value of the entire function to
                // throw the exception.
                return handle("end");
                if (entry.tryLoc <= this.prev) {
                    var hasCatch = hasOwn.call(entry, "catchLoc");
                    var hasFinally = hasOwn.call(entry, "finallyLoc");
                    if (hasCatch && hasFinally) {
                        if (this.prev < entry.catchLoc) return handle(entry.catchLoc, true);
                        else if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc);
                    } else if (hasCatch) {
                        if (this.prev < entry.catchLoc) return handle(entry.catchLoc, true);
                    } else if (hasFinally) {
                        if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc);
                    } else throw new Error("try statement without catch or finally");
                }
            }
        },
        abrupt: function(type, arg) {
            for(var i = this.tryEntries.length - 1; i >= 0; --i){
                var entry = this.tryEntries[i];
                if (entry.tryLoc <= this.prev && hasOwn.call(entry, "finallyLoc") && this.prev < entry.finallyLoc) {
                    var finallyEntry = entry;
                    break;
                }
            }
            if (finallyEntry && (type === "break" || type === "continue") && finallyEntry.tryLoc <= arg && arg <= finallyEntry.finallyLoc) // Ignore the finally entry if control is not jumping to a
            // location outside the try/catch block.
            finallyEntry = null;
            var record = finallyEntry ? finallyEntry.completion : {};
            record.type = type;
            record.arg = arg;
            if (finallyEntry) {
                this.method = "next";
                this.next = finallyEntry.finallyLoc;
                return ContinueSentinel;
            }
            return this.complete(record);
        },
        complete: function(record, afterLoc) {
            if (record.type === "throw") throw record.arg;
            if (record.type === "break" || record.type === "continue") this.next = record.arg;
            else if (record.type === "return") {
                this.rval = this.arg = record.arg;
                this.method = "return";
                this.next = "end";
            } else if (record.type === "normal" && afterLoc) this.next = afterLoc;
            return ContinueSentinel;
        },
        finish: function(finallyLoc) {
            for(var i = this.tryEntries.length - 1; i >= 0; --i){
                var entry = this.tryEntries[i];
                if (entry.finallyLoc === finallyLoc) {
                    this.complete(entry.completion, entry.afterLoc);
                    resetTryEntry(entry);
                    return ContinueSentinel;
                }
            }
        },
        "catch": function(tryLoc) {
            for(var i = this.tryEntries.length - 1; i >= 0; --i){
                var entry = this.tryEntries[i];
                if (entry.tryLoc === tryLoc) {
                    var record = entry.completion;
                    if (record.type === "throw") {
                        var thrown = record.arg;
                        resetTryEntry(entry);
                    }
                    return thrown;
                }
            }
            // The context.catch method must only be called with a location
            // argument that corresponds to a known catch block.
            throw new Error("illegal catch attempt");
        },
        delegateYield: function(iterable, resultName, nextLoc) {
            this.delegate = {
                iterator: values(iterable),
                resultName: resultName,
                nextLoc: nextLoc
            };
            if (this.method === "next") // Deliberately forget the last sent value so that we don't
            // accidentally pass it on to the delegate.
            this.arg = undefined;
            return ContinueSentinel;
        }
    };
    // Regardless of whether this script is executing as a CommonJS module
    // or not, return the runtime object so that we can declare the variable
    // regeneratorRuntime in the outer scope, which allows this module to be
    // injected easily by `bin/regenerator --include-runtime script.js`.
    return exports;
}(// If this script is executing as a CommonJS module, use module.exports
// as the regeneratorRuntime namespace. Otherwise create a new empty
// object. Either way, the resulting object will be used to initialize
// the regeneratorRuntime variable at the top of this file.
(0, module.exports));
try {
    regeneratorRuntime = runtime;
} catch (accidentalStrictMode) {
    // This module should not be running in strict mode, so the above
    // assignment should always work unless something is misconfigured. Just
    // in case runtime.js accidentally runs in strict mode, in modern engines
    // we can explicitly access globalThis. In older engines we can escape
    // strict mode using a global Function call. This could conceivably fail
    // if a Content Security Policy forbids using Function, but in that case
    // the proper solution is to fix the accidental strict mode problem. If
    // you've misconfigured your bundler to force strict mode and applied a
    // CSP to forbid Function, and you're not willing to fix either of those
    // problems, please detail your unique predicament in a GitHub issue.
    if (typeof globalThis === "object") globalThis.regeneratorRuntime = runtime;
    else Function("r", "regeneratorRuntime = r")(runtime);
}

},{}],"baTDu":[function(require,module,exports,__globalThis) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "login", ()=>login);
parcelHelpers.export(exports, "logout", ()=>logout);
var _axios = require("axios");
var _axiosDefault = parcelHelpers.interopDefault(_axios);
var _alerts = require("./alerts");
const login = async function(email, password) {
    try {
        const res = await (0, _axiosDefault.default)({
            method: 'POST',
            url: '/api/v1/users/login',
            data: {
                email,
                password
            }
        });
        if (res.data.status === 'success') {
            (0, _alerts.showAlert)('success', 'Logged in successfully');
            window.setTimeout(()=>{
                location.assign('/');
            }, 1500);
        }
    } catch (err) {
        (0, _alerts.showAlert)('error', err.response.data.message);
    }
};
const logout = async ()=>{
    try {
        const res = await (0, _axiosDefault.default)({
            method: 'POST',
            url: '/api/v1/users/logout'
        });
        if (res.data.status == 'success') location.reload(true);
    } catch (err) {
        (0, _alerts.showAlert)('error', 'Error logging out! Try again!');
    }
};

},{"axios":"kooH4","./alerts":"bDKEb","@parcel/transformer-js/src/esmodule-helpers.js":"jnFvT"}],"kooH4":[function(require,module,exports,__globalThis) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "default", ()=>(0, _axiosJsDefault.default));
parcelHelpers.export(exports, "create", ()=>create);
parcelHelpers.export(exports, "Axios", ()=>Axios);
parcelHelpers.export(exports, "AxiosError", ()=>AxiosError);
parcelHelpers.export(exports, "CanceledError", ()=>CanceledError);
parcelHelpers.export(exports, "isCancel", ()=>isCancel);
parcelHelpers.export(exports, "CancelToken", ()=>CancelToken);
parcelHelpers.export(exports, "VERSION", ()=>VERSION);
parcelHelpers.export(exports, "all", ()=>all);
parcelHelpers.export(exports, "Cancel", ()=>Cancel);
parcelHelpers.export(exports, "isAxiosError", ()=>isAxiosError);
parcelHelpers.export(exports, "spread", ()=>spread);
parcelHelpers.export(exports, "toFormData", ()=>toFormData);
parcelHelpers.export(exports, "AxiosHeaders", ()=>AxiosHeaders);
parcelHelpers.export(exports, "HttpStatusCode", ()=>HttpStatusCode);
parcelHelpers.export(exports, "formToJSON", ()=>formToJSON);
parcelHelpers.export(exports, "getAdapter", ()=>getAdapter);
parcelHelpers.export(exports, "mergeConfig", ()=>mergeConfig);
var _axiosJs = require("./lib/axios.js");
var _axiosJsDefault = parcelHelpers.interopDefault(_axiosJs);
// This module is intended to unwrap Axios default export as named.
// Keep top-level export same with static properties
// so that it can keep same with es module or cjs
const { Axios, AxiosError, CanceledError, isCancel, CancelToken, VERSION, all, Cancel, isAxiosError, spread, toFormData, AxiosHeaders, HttpStatusCode, formToJSON, getAdapter, mergeConfig, create } = (0, _axiosJsDefault.default);

},{"./lib/axios.js":"le7Ue","@parcel/transformer-js/src/esmodule-helpers.js":"jnFvT"}],"le7Ue":[function(require,module,exports,__globalThis) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
var _utilsJs = require("./utils.js");
var _utilsJsDefault = parcelHelpers.interopDefault(_utilsJs);
var _bindJs = require("./helpers/bind.js");
var _bindJsDefault = parcelHelpers.interopDefault(_bindJs);
var _axiosJs = require("./core/Axios.js");
var _axiosJsDefault = parcelHelpers.interopDefault(_axiosJs);
var _mergeConfigJs = require("./core/mergeConfig.js");
var _mergeConfigJsDefault = parcelHelpers.interopDefault(_mergeConfigJs);
var _indexJs = require("./defaults/index.js");
var _indexJsDefault = parcelHelpers.interopDefault(_indexJs);
var _formDataToJSONJs = require("./helpers/formDataToJSON.js");
var _formDataToJSONJsDefault = parcelHelpers.interopDefault(_formDataToJSONJs);
var _canceledErrorJs = require("./cancel/CanceledError.js");
var _canceledErrorJsDefault = parcelHelpers.interopDefault(_canceledErrorJs);
var _cancelTokenJs = require("./cancel/CancelToken.js");
var _cancelTokenJsDefault = parcelHelpers.interopDefault(_cancelTokenJs);
var _isCancelJs = require("./cancel/isCancel.js");
var _isCancelJsDefault = parcelHelpers.interopDefault(_isCancelJs);
var _dataJs = require("./env/data.js");
var _toFormDataJs = require("./helpers/toFormData.js");
var _toFormDataJsDefault = parcelHelpers.interopDefault(_toFormDataJs);
var _axiosErrorJs = require("./core/AxiosError.js");
var _axiosErrorJsDefault = parcelHelpers.interopDefault(_axiosErrorJs);
var _spreadJs = require("./helpers/spread.js");
var _spreadJsDefault = parcelHelpers.interopDefault(_spreadJs);
var _isAxiosErrorJs = require("./helpers/isAxiosError.js");
var _isAxiosErrorJsDefault = parcelHelpers.interopDefault(_isAxiosErrorJs);
var _axiosHeadersJs = require("./core/AxiosHeaders.js");
var _axiosHeadersJsDefault = parcelHelpers.interopDefault(_axiosHeadersJs);
var _adaptersJs = require("./adapters/adapters.js");
var _adaptersJsDefault = parcelHelpers.interopDefault(_adaptersJs);
var _httpStatusCodeJs = require("./helpers/HttpStatusCode.js");
var _httpStatusCodeJsDefault = parcelHelpers.interopDefault(_httpStatusCodeJs);
'use strict';
/**
 * Create an instance of Axios
 *
 * @param {Object} defaultConfig The default config for the instance
 *
 * @returns {Axios} A new instance of Axios
 */ function createInstance(defaultConfig) {
    const context = new (0, _axiosJsDefault.default)(defaultConfig);
    const instance = (0, _bindJsDefault.default)((0, _axiosJsDefault.default).prototype.request, context);
    // Copy axios.prototype to instance
    (0, _utilsJsDefault.default).extend(instance, (0, _axiosJsDefault.default).prototype, context, {
        allOwnKeys: true
    });
    // Copy context to instance
    (0, _utilsJsDefault.default).extend(instance, context, null, {
        allOwnKeys: true
    });
    // Factory for creating new instances
    instance.create = function create(instanceConfig) {
        return createInstance((0, _mergeConfigJsDefault.default)(defaultConfig, instanceConfig));
    };
    return instance;
}
// Create the default instance to be exported
const axios = createInstance((0, _indexJsDefault.default));
// Expose Axios class to allow class inheritance
axios.Axios = (0, _axiosJsDefault.default);
// Expose Cancel & CancelToken
axios.CanceledError = (0, _canceledErrorJsDefault.default);
axios.CancelToken = (0, _cancelTokenJsDefault.default);
axios.isCancel = (0, _isCancelJsDefault.default);
axios.VERSION = (0, _dataJs.VERSION);
axios.toFormData = (0, _toFormDataJsDefault.default);
// Expose AxiosError class
axios.AxiosError = (0, _axiosErrorJsDefault.default);
// alias for CanceledError for backward compatibility
axios.Cancel = axios.CanceledError;
// Expose all/spread
axios.all = function all(promises) {
    return Promise.all(promises);
};
axios.spread = (0, _spreadJsDefault.default);
// Expose isAxiosError
axios.isAxiosError = (0, _isAxiosErrorJsDefault.default);
// Expose mergeConfig
axios.mergeConfig = (0, _mergeConfigJsDefault.default);
axios.AxiosHeaders = (0, _axiosHeadersJsDefault.default);
axios.formToJSON = (thing)=>(0, _formDataToJSONJsDefault.default)((0, _utilsJsDefault.default).isHTMLForm(thing) ? new FormData(thing) : thing);
axios.getAdapter = (0, _adaptersJsDefault.default).getAdapter;
axios.HttpStatusCode = (0, _httpStatusCodeJsDefault.default);
axios.default = axios;
// this module should only have a default export
exports.default = axios;

},{"./utils.js":"jI6DP","./helpers/bind.js":"bgexy","./core/Axios.js":"cBDUi","./core/mergeConfig.js":"311Mu","./defaults/index.js":"9WXKx","./helpers/formDataToJSON.js":"fefHq","./cancel/CanceledError.js":"9yG1c","./cancel/CancelToken.js":"kSqbX","./cancel/isCancel.js":"fkTUi","./env/data.js":"9SLyZ","./helpers/toFormData.js":"2RXm4","./core/AxiosError.js":"7z85x","./helpers/spread.js":"i5yWF","./helpers/isAxiosError.js":"2FN3e","./core/AxiosHeaders.js":"9EzTj","./adapters/adapters.js":"hI0HS","./helpers/HttpStatusCode.js":"7tr76","@parcel/transformer-js/src/esmodule-helpers.js":"jnFvT"}],"jI6DP":[function(require,module,exports,__globalThis) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
var _bindJs = require("./helpers/bind.js");
var _bindJsDefault = parcelHelpers.interopDefault(_bindJs);
var global = arguments[3];
'use strict';
// utils is a library of generic helper functions non-specific to axios
const { toString } = Object.prototype;
const { getPrototypeOf } = Object;
const { iterator, toStringTag } = Symbol;
/* Creating a function that will check if an object has a property. */ const hasOwnProperty = (({ hasOwnProperty })=>(obj, prop)=>hasOwnProperty.call(obj, prop))(Object.prototype);
const isUnsafeObjectKey = (prop)=>typeof prop === 'string' && (prop === '__proto__' || prop === 'constructor' || prop === 'prototype');
/**
 * Determine whether an inherited object must be treated as a shared-prototype
 * boundary. Cross-realm Object.prototype objects cannot be distinguished
 * reliably from application-created null-prototype objects because their
 * properties are mutable, so all inherited terminal prototypes are excluded
 * as a fail-closed boundary. A null-prototype source still keeps its own
 * properties, as produced by mergeConfig and other safe materialization paths.
 *
 * @param {*} obj The object to inspect
 * @param {*} prototype The object's prototype
 * @param {boolean} source Whether obj is the original traversal source
 *
 * @returns {boolean} True when obj is a safe prototype traversal boundary
 */ const isPrototypeBoundary = (obj, prototype, source)=>obj === Object.prototype || !source && prototype === null;
/**
 * Determine whether an object can retain its identity through code paths that
 * add, replace, and remove config properties without bypassing unsafe-key
 * filtering. Immutable objects, unsafe-key-bearing objects, and objects with
 * accessor or restricted data properties must be materialized instead.
 *
 * @param {*} obj The object to inspect
 *
 * @returns {boolean} True when every own property is safe and fully mutable
 */ const isSafeAndFullyMutable = (obj)=>{
    if (!Object.isExtensible(obj)) return false;
    const props = Object.getOwnPropertyNames(obj);
    if (Object.getOwnPropertySymbols) props.push(...Object.getOwnPropertySymbols(obj));
    return props.every((prop)=>{
        if (isUnsafeObjectKey(prop)) return false;
        const descriptor = Object.getOwnPropertyDescriptor(obj, prop);
        return !!descriptor && descriptor.configurable && descriptor.writable === true;
    });
};
/**
 * Walk the prototype chain (excluding the source realm's Object.prototype)
 * looking for an own `prop`. This distinguishes genuine own/inherited members
 * — including class accessors and template prototypes — from members injected
 * via Object.prototype pollution (e.g. `Object.prototype.username = '...'`),
 * which live on Object.prototype itself and are therefore never matched.
 *
 * @param {*} thing The value whose chain to inspect
 * @param {string|symbol} prop The property key to look for
 *
 * @returns {boolean} True when `prop` is owned below Object.prototype
 */ const hasOwnInPrototypeChain = (thing, prop)=>{
    let obj = thing;
    const seen = [];
    while(obj != null){
        if (seen.indexOf(obj) !== -1) return false;
        seen.push(obj);
        const prototype = getPrototypeOf(obj);
        if (isPrototypeBoundary(obj, prototype, obj === thing)) return false;
        if (hasOwnProperty(obj, prop)) return true;
        obj = prototype;
    }
    return false;
};
/**
 * Read `obj[prop]` only when it is safe from Object.prototype pollution. Own
 * properties and members inherited from a non-Object.prototype source (a class
 * instance or template object) are honored; a value reachable only through a
 * polluted Object.prototype is ignored and `undefined` is returned.
 *
 * @param {*} obj The source object
 * @param {string|symbol} prop The property key to read
 *
 * @returns {*} The resolved value, or undefined when unsafe/absent
 */ const getSafeProp = (obj, prop)=>obj != null && hasOwnInPrototypeChain(obj, prop) ? obj[prop] : undefined;
/**
 * Flatten an object and its application-defined prototype chain into a
 * null-prototype object. Members inherited only from the source realm's
 * Object.prototype are deliberately excluded, while class/template members
 * below that boundary are preserved.
 *
 * @param {*} thing The value to flatten
 *
 * @returns {*} A null-prototype copy, or the original value when it is already
 * structurally safe or is not an object
 */ const toSafeFlatObject = (thing)=>{
    if (thing == null || typeof thing !== 'object' && typeof thing !== 'function') return thing;
    const sourcePrototype = getPrototypeOf(thing);
    if (sourcePrototype === null && isSafeAndFullyMutable(thing)) return thing;
    const result = Object.create(null);
    const merged = Object.create(null);
    const seen = [];
    let current = thing;
    while(current != null){
        if (seen.indexOf(current) !== -1) break;
        seen.push(current);
        const prototype = current === thing ? sourcePrototype : getPrototypeOf(current);
        if (isPrototypeBoundary(current, prototype, current === thing)) break;
        const props = Object.getOwnPropertyNames(current);
        if (Object.getOwnPropertySymbols) props.push(...Object.getOwnPropertySymbols(current));
        for (const prop of props){
            if (isUnsafeObjectKey(prop)) continue;
            if (!hasOwnProperty(merged, prop)) {
                result[prop] = thing[prop];
                merged[prop] = true;
            }
        }
        current = prototype;
    }
    return result;
};
const kindOf = ((cache)=>(thing)=>{
        const str = toString.call(thing);
        return cache[str] || (cache[str] = str.slice(8, -1).toLowerCase());
    })(Object.create(null));
const kindOfTest = (type)=>{
    type = type.toLowerCase();
    return (thing)=>kindOf(thing) === type;
};
const typeOfTest = (type)=>(thing)=>typeof thing === type;
/**
 * Determine if a value is a non-null object
 *
 * @param {Object} val The value to test
 *
 * @returns {boolean} True if value is an Array, otherwise false
 */ const { isArray } = Array;
/**
 * Determine if a value is undefined
 *
 * @param {*} val The value to test
 *
 * @returns {boolean} True if the value is undefined, otherwise false
 */ const isUndefined = typeOfTest('undefined');
/**
 * Determine if a value is a Buffer
 *
 * @param {*} val The value to test
 *
 * @returns {boolean} True if value is a Buffer, otherwise false
 */ function isBuffer(val) {
    return val !== null && !isUndefined(val) && val.constructor !== null && !isUndefined(val.constructor) && isFunction(val.constructor.isBuffer) && val.constructor.isBuffer(val);
}
/**
 * Determine if a value is an ArrayBuffer
 *
 * @param {*} val The value to test
 *
 * @returns {boolean} True if value is an ArrayBuffer, otherwise false
 */ const isArrayBuffer = kindOfTest('ArrayBuffer');
/**
 * Determine if a value is a view on an ArrayBuffer
 *
 * @param {*} val The value to test
 *
 * @returns {boolean} True if value is a view on an ArrayBuffer, otherwise false
 */ function isArrayBufferView(val) {
    let result;
    if (typeof ArrayBuffer !== 'undefined' && ArrayBuffer.isView) result = ArrayBuffer.isView(val);
    else result = val && val.buffer && isArrayBuffer(val.buffer);
    return result;
}
/**
 * Determine if a value is a String
 *
 * @param {*} val The value to test
 *
 * @returns {boolean} True if value is a String, otherwise false
 */ const isString = typeOfTest('string');
/**
 * Determine if a value is a Function
 *
 * @param {*} val The value to test
 * @returns {boolean} True if value is a Function, otherwise false
 */ const isFunction = typeOfTest('function');
/**
 * Determine if a value is a Number
 *
 * @param {*} val The value to test
 *
 * @returns {boolean} True if value is a Number, otherwise false
 */ const isNumber = typeOfTest('number');
/**
 * Determine if a value is an Object
 *
 * @param {*} thing The value to test
 *
 * @returns {boolean} True if value is an Object, otherwise false
 */ const isObject = (thing)=>thing !== null && typeof thing === 'object';
/**
 * Determine if a value is a Boolean
 *
 * @param {*} thing The value to test
 * @returns {boolean} True if value is a Boolean, otherwise false
 */ const isBoolean = (thing)=>thing === true || thing === false;
/**
 * Determine if a value is a plain Object
 *
 * @param {*} val The value to test
 *
 * @returns {boolean} True if value is a plain Object, otherwise false
 */ const isPlainObject = (val)=>{
    if (!isObject(val)) return false;
    const prototype = getPrototypeOf(val);
    return (prototype === null || prototype === Object.prototype || getPrototypeOf(prototype) === null) && // Treat own Symbol.toStringTag or Symbol.iterator members as evidence the
    // value is tagged/iterable, ignoring members reachable only through shared
    // or terminal prototype boundaries. This is exactly what
    // hasOwnInPrototypeChain(val, prop) computes here: every prototype admitted
    // above (null, Object.prototype, or a terminal null-prototype template) is
    // a boundary, so the walk never inspects anything but `val`'s own members,
    // and stops before even those when `val` is itself the boundary
    // Object.prototype. Checking that inline avoids allocating the walker's
    // `seen` list twice per call on the mergeConfig / merge hot path.
    (isPrototypeBoundary(val, prototype, true) || !hasOwnProperty(val, toStringTag) && !hasOwnProperty(val, iterator));
};
/**
 * Determine if a value is an empty object (safely handles Buffers)
 *
 * @param {*} val The value to test
 *
 * @returns {boolean} True if value is an empty object, otherwise false
 */ const isEmptyObject = (val)=>{
    // Early return for non-objects or Buffers to prevent RangeError
    if (!isObject(val) || isBuffer(val)) return false;
    try {
        return Object.keys(val).length === 0 && Object.getPrototypeOf(val) === Object.prototype;
    } catch (e) {
        // Fallback for any other objects that might cause RangeError with Object.keys()
        return false;
    }
};
/**
 * Determine if a value is a Date
 *
 * @param {*} val The value to test
 *
 * @returns {boolean} True if value is a Date, otherwise false
 */ const isDate = kindOfTest('Date');
/**
 * Determine if a value is a File
 *
 * @param {*} val The value to test
 *
 * @returns {boolean} True if value is a File, otherwise false
 */ const isFile = kindOfTest('File');
/**
 * Determine if a value is a React Native Blob
 * React Native "blob": an object with a `uri` attribute. Optionally, it can
 * also have a `name` and `type` attribute to specify filename and content type
 *
 * @see https://github.com/facebook/react-native/blob/26684cf3adf4094eb6c405d345a75bf8c7c0bf88/Libraries/Network/FormData.js#L68-L71
 *
 * @param {*} value The value to test
 *
 * @returns {boolean} True if value is a React Native Blob, otherwise false
 */ const isReactNativeBlob = (value)=>{
    return !!(value && typeof value.uri !== 'undefined');
};
/**
 * Determine if environment is React Native
 * ReactNative `FormData` has a non-standard `getParts()` method
 *
 * @param {*} formData The formData to test
 *
 * @returns {boolean} True if environment is React Native, otherwise false
 */ const isReactNative = (formData)=>formData && typeof formData.getParts !== 'undefined';
/**
 * Determine if a value is a Blob
 *
 * @param {*} val The value to test
 *
 * @returns {boolean} True if value is a Blob, otherwise false
 */ const isBlob = kindOfTest('Blob');
/**
 * Determine if a value is a FileList
 *
 * @param {*} val The value to test
 *
 * @returns {boolean} True if value is a FileList, otherwise false
 */ const isFileList = kindOfTest('FileList');
const isSet = kindOfTest('Set');
/**
 * Determine if a value is a Stream
 *
 * @param {*} val The value to test
 *
 * @returns {boolean} True if value is a Stream, otherwise false
 */ const isStream = (val)=>isObject(val) && isFunction(val.pipe);
/**
 * Determine if a value is a FormData
 *
 * @param {*} thing The value to test
 *
 * @returns {boolean} True if value is an FormData, otherwise false
 */ function getGlobal() {
    if (typeof globalThis !== 'undefined') return globalThis;
    if (typeof self !== 'undefined') return self;
    if (typeof window !== 'undefined') return window;
    if (typeof global !== 'undefined') return global;
    return {};
}
const G = getGlobal();
const FormDataCtor = typeof G.FormData !== 'undefined' ? G.FormData : undefined;
const isFormData = (thing)=>{
    if (!thing) return false;
    if (FormDataCtor && thing instanceof FormDataCtor) return true;
    // Reject plain objects inheriting directly from Object.prototype so prototype-pollution gadgets can't spoof FormData.
    const proto = getPrototypeOf(thing);
    if (!proto || proto === Object.prototype) return false;
    if (!isFunction(thing.append)) return false;
    const kind = kindOf(thing);
    return kind === 'formdata' || // detect form-data instance
    kind === 'object' && isFunction(thing.toString) && thing.toString() === '[object FormData]';
};
/**
 * Determine if a value is a URLSearchParams object
 *
 * @param {*} val The value to test
 *
 * @returns {boolean} True if value is a URLSearchParams object, otherwise false
 */ const isURLSearchParams = kindOfTest('URLSearchParams');
const [isReadableStream, isRequest, isResponse, isHeaders] = [
    'ReadableStream',
    'Request',
    'Response',
    'Headers'
].map(kindOfTest);
/**
 * Trim excess whitespace off the beginning and end of a string
 *
 * @param {String} str The String to trim
 *
 * @returns {String} The String freed of excess whitespace
 */ const trim = (str)=>{
    return str.trim ? str.trim() : str.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, '');
};
/**
 * Iterate over an Array or an Object invoking a function for each item.
 *
 * If `obj` is an Array callback will be called passing
 * the value, index, and complete array for each item.
 *
 * If 'obj' is an Object callback will be called passing
 * the value, key, and complete object for each property.
 *
 * @param {Object|Array<unknown>} obj The object to iterate
 * @param {Function} fn The callback to invoke for each item
 *
 * @param {Object} [options]
 * @param {Boolean} [options.allOwnKeys = false]
 * @returns {any}
 */ function forEach(obj, fn, { allOwnKeys = false } = {}) {
    // Don't bother if no value provided
    if (obj === null || typeof obj === 'undefined') return;
    let i;
    let l;
    // Force an array if not already something iterable
    if (typeof obj !== 'object') /*eslint no-param-reassign:0*/ obj = [
        obj
    ];
    if (isArray(obj)) // Iterate over array values
    for(i = 0, l = obj.length; i < l; i++)fn.call(null, obj[i], i, obj);
    else {
        // Buffer check
        if (isBuffer(obj)) return;
        // Iterate over object keys
        const keys = allOwnKeys ? Object.getOwnPropertyNames(obj) : Object.keys(obj);
        const len = keys.length;
        let key;
        for(i = 0; i < len; i++){
            key = keys[i];
            fn.call(null, obj[key], key, obj);
        }
    }
}
/**
 * Finds a key in an object, case-insensitive, returning the actual key name.
 * Returns null if the object is a Buffer or if no match is found.
 *
 * @param {Object} obj - The object to search.
 * @param {string} key - The key to find (case-insensitive).
 * @returns {?string} The actual key name if found, otherwise null.
 */ function findKey(obj, key) {
    if (isBuffer(obj)) return null;
    key = key.toLowerCase();
    const keys = Object.keys(obj);
    let i = keys.length;
    let _key;
    while(i-- > 0){
        _key = keys[i];
        if (key === _key.toLowerCase()) return _key;
    }
    return null;
}
const _global = (()=>{
    /*eslint no-undef:0*/ if (typeof globalThis !== 'undefined') return globalThis;
    return typeof self !== 'undefined' ? self : typeof window !== 'undefined' ? window : global;
})();
const isContextDefined = (context)=>!isUndefined(context) && context !== _global;
/**
 * Accepts varargs expecting each argument to be an object, then
 * immutably merges the properties of each object and returns result.
 *
 * When multiple objects contain the same key the later object in
 * the arguments list will take precedence.
 *
 * Example:
 *
 * ```js
 * const result = merge({foo: 123}, {foo: 456});
 * console.log(result.foo); // outputs 456
 * ```
 *
 * @param {Object} obj1 Object to merge
 *
 * @returns {Object} Result of all merge properties
 */ function merge(...objs) {
    const { caseless, skipUndefined } = isContextDefined(this) && this || {};
    const result = {};
    // Caseless lookup only applies to string keys — symbol keys are
    // identity-matched. Every string key that reaches `result` passes through
    // this index first, so it can never hold two case variants of one key and a
    // lowercase -> key map is exactly what findKey(result, key) would rescan
    // Object.keys(result) for on each assignment.
    const lowerCaseKeys = caseless ? Object.create(null) : null;
    const assignValue = (val, key)=>{
        // Skip dangerous property names to prevent prototype pollution
        if (key === '__proto__' || key === 'constructor' || key === 'prototype') return;
        let targetKey = key;
        if (lowerCaseKeys && typeof key === 'string') {
            const lowerKey = key.toLowerCase();
            const knownKey = lowerCaseKeys[lowerKey];
            // A key recorded but absent from `result` was skipped by skipUndefined;
            // the later spelling wins then, as it does for findKey.
            if (knownKey !== undefined && hasOwnProperty(result, knownKey)) targetKey = knownKey;
            else lowerCaseKeys[lowerKey] = key;
        }
        // Read via own-prop only — a bare `result[targetKey]` walks the prototype
        // chain, so a polluted Object.prototype value could surface here and get
        // copied into the merged result.
        const existing = hasOwnProperty(result, targetKey) ? result[targetKey] : undefined;
        if (isPlainObject(existing) && isPlainObject(val)) result[targetKey] = merge(existing, val);
        else if (isPlainObject(val)) result[targetKey] = merge({}, val);
        else if (isArray(val)) result[targetKey] = val.slice();
        else if (!skipUndefined || !isUndefined(val)) result[targetKey] = val;
    };
    for(let i = 0, l = objs.length; i < l; i++){
        const source = objs[i];
        if (!source || isBuffer(source)) continue;
        forEach(source, assignValue);
        if (typeof source !== 'object' || isArray(source) || !Object.getOwnPropertySymbols) continue;
        const symbols = Object.getOwnPropertySymbols(source);
        for(let j = 0; j < symbols.length; j++){
            const symbol = symbols[j];
            if (propertyIsEnumerable.call(source, symbol)) assignValue(source[symbol], symbol);
        }
    }
    return result;
}
/**
 * Extends object a by mutably adding to it the properties of object b.
 *
 * @param {Object} a The object to be extended
 * @param {Object} b The object to copy properties from
 * @param {Object} thisArg The object to bind function to
 *
 * @param {Object} [options]
 * @param {Boolean} [options.allOwnKeys]
 * @returns {Object} The resulting value of object a
 */ const extend = (a, b, thisArg, { allOwnKeys } = {})=>{
    forEach(b, (val, key)=>{
        if (thisArg && isFunction(val)) Object.defineProperty(a, key, {
            // Null-proto descriptor so a polluted Object.prototype.get cannot
            // hijack defineProperty's accessor-vs-data resolution.
            __proto__: null,
            value: (0, _bindJsDefault.default)(val, thisArg),
            writable: true,
            enumerable: true,
            configurable: true
        });
        else Object.defineProperty(a, key, {
            __proto__: null,
            value: val,
            writable: true,
            enumerable: true,
            configurable: true
        });
    }, {
        allOwnKeys
    });
    return a;
};
/**
 * Remove byte order marker. This catches EF BB BF (the UTF-8 BOM)
 *
 * @param {string} content with BOM
 *
 * @returns {string} content value without BOM
 */ const stripBOM = (content)=>{
    if (content.charCodeAt(0) === 0xfeff) content = content.slice(1);
    return content;
};
/**
 * Inherit the prototype methods from one constructor into another
 * @param {function} constructor
 * @param {function} superConstructor
 * @param {object} [props]
 * @param {object} [descriptors]
 *
 * @returns {void}
 */ const inherits = (constructor, superConstructor, props, descriptors)=>{
    constructor.prototype = Object.create(superConstructor.prototype, descriptors);
    Object.defineProperty(constructor.prototype, 'constructor', {
        __proto__: null,
        value: constructor,
        writable: true,
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(constructor, 'super', {
        __proto__: null,
        value: superConstructor.prototype
    });
    props && Object.assign(constructor.prototype, props);
};
/**
 * Resolve object with deep prototype chain to a flat object
 * @param {Object} sourceObj source object
 * @param {Object} [destObj]
 * @param {Function|Boolean} [filter]
 * @param {Function} [propFilter]
 *
 * @returns {Object}
 */ const toFlatObject = (sourceObj, destObj, filter, propFilter)=>{
    let props;
    let i;
    let prop;
    const merged = {};
    destObj = destObj || {};
    // eslint-disable-next-line no-eq-null,eqeqeq
    if (sourceObj == null) return destObj;
    do {
        props = Object.getOwnPropertyNames(sourceObj);
        i = props.length;
        while(i-- > 0){
            prop = props[i];
            if ((!propFilter || propFilter(prop, sourceObj, destObj)) && !merged[prop]) {
                destObj[prop] = sourceObj[prop];
                merged[prop] = true;
            }
        }
        sourceObj = filter !== false && getPrototypeOf(sourceObj);
    }while (sourceObj && (!filter || filter(sourceObj, destObj)) && sourceObj !== Object.prototype);
    return destObj;
};
/**
 * Determines whether a string ends with the characters of a specified string
 *
 * @param {String} str
 * @param {String} searchString
 * @param {Number} [position= 0]
 *
 * @returns {boolean}
 */ const endsWith = (str, searchString, position)=>{
    str = String(str);
    if (position === undefined || position > str.length) position = str.length;
    position -= searchString.length;
    const lastIndex = str.indexOf(searchString, position);
    return lastIndex !== -1 && lastIndex === position;
};
/**
 * Returns new array from array like object or null if failed
 *
 * @param {*} [thing]
 *
 * @returns {?Array}
 */ const toArray = (thing)=>{
    if (!thing) return null;
    if (isArray(thing)) return thing;
    let i = thing.length;
    if (!Number.isSafeInteger(i) || i < 0 || i > 0xffffffff) return null;
    // Bound the copy by actual indexed properties, including hidden and inherited
    // members of array-like collections, rather than by the declared length alone.
    const indexes = new Set();
    const seen = new Set();
    let source = thing;
    while(source != null && indexes.size < i){
        if (seen.has(source)) return null;
        seen.add(source);
        const prototype = getPrototypeOf(source);
        if (isPrototypeBoundary(source, prototype, source === thing)) break;
        Object.getOwnPropertyNames(source).forEach((key)=>{
            const index = +key;
            if (Number.isInteger(index) && index >= 0 && index < i && String(index) === key && hasOwnProperty(source, key)) indexes.add(index);
        });
        source = prototype;
    }
    if (indexes.size !== i) return null;
    const arr = new Array(i);
    while(i-- > 0)arr[i] = thing[i];
    return arr;
};
/**
 * Checking if the Uint8Array exists and if it does, it returns a function that checks if the
 * thing passed in is an instance of Uint8Array
 *
 * @param {TypedArray}
 *
 * @returns {Array}
 */ // eslint-disable-next-line func-names
const isTypedArray = ((TypedArray)=>{
    // eslint-disable-next-line func-names
    return (thing)=>{
        return TypedArray && thing instanceof TypedArray;
    };
})(typeof Uint8Array !== 'undefined' && getPrototypeOf(Uint8Array));
/**
 * For each entry in the object, call the function with the key and value.
 *
 * @param {Object<any, any>} obj - The object to iterate over.
 * @param {Function} fn - The function to call for each entry.
 *
 * @returns {void}
 */ const forEachEntry = (obj, fn)=>{
    const generator = obj && obj[iterator];
    const _iterator = generator.call(obj);
    let result;
    while((result = _iterator.next()) && !result.done){
        const pair = result.value;
        fn.call(obj, pair[0], pair[1]);
    }
};
/**
 * It takes a regular expression and a string, and returns an array of all the matches
 *
 * @param {string} regExp - The regular expression to match against.
 * @param {string} str - The string to search.
 *
 * @returns {Array<boolean>}
 */ const matchAll = (regExp, str)=>{
    let matches;
    const arr = [];
    while((matches = regExp.exec(str)) !== null)arr.push(matches);
    return arr;
};
/* Checking if the kindOfTest function returns true when passed an HTMLFormElement. */ const isHTMLForm = kindOfTest('HTMLFormElement');
const toCamelCase = (str)=>{
    return str.toLowerCase().replace(/[-_\s]([a-z\d])(\w*)/g, function replacer(m, p1, p2) {
        return p1.toUpperCase() + p2;
    });
};
const { propertyIsEnumerable } = Object.prototype;
/**
 * Determine if a value is a RegExp object
 *
 * @param {*} val The value to test
 *
 * @returns {boolean} True if value is a RegExp object, otherwise false
 */ const isRegExp = kindOfTest('RegExp');
const reduceDescriptors = (obj, reducer)=>{
    const descriptors = Object.getOwnPropertyDescriptors(obj);
    const reducedDescriptors = {};
    forEach(descriptors, (descriptor, name)=>{
        let ret;
        if ((ret = reducer(descriptor, name, obj)) !== false) reducedDescriptors[name] = ret || descriptor;
    });
    Object.defineProperties(obj, reducedDescriptors);
};
/**
 * Makes all methods read-only
 * @param {Object} obj
 */ const freezeMethods = (obj)=>{
    reduceDescriptors(obj, (descriptor, name)=>{
        // skip restricted props in strict mode
        if (isFunction(obj) && [
            'arguments',
            'caller',
            'callee'
        ].includes(name)) return false;
        const value = obj[name];
        if (!isFunction(value)) return;
        descriptor.enumerable = false;
        if ('writable' in descriptor) {
            descriptor.writable = false;
            return;
        }
        if (!descriptor.set) descriptor.set = ()=>{
            throw Error("Can not rewrite read-only method '" + name + "'");
        };
    });
};
/**
 * Converts an array or a delimited string into an object set with values as keys and true as values.
 * Useful for fast membership checks.
 *
 * @param {Array|string} arrayOrString - The array or string to convert.
 * @param {string} delimiter - The delimiter to use if input is a string.
 * @returns {Object} An object with keys from the array or string, values set to true.
 */ const toObjectSet = (arrayOrString, delimiter)=>{
    const obj = {};
    const define = (arr)=>{
        arr.forEach((value)=>{
            obj[value] = true;
        });
    };
    isArray(arrayOrString) ? define(arrayOrString) : define(String(arrayOrString).split(delimiter));
    return obj;
};
const noop = ()=>{};
const toFiniteNumber = (value, defaultValue)=>{
    return value != null && Number.isFinite(value = +value) ? value : defaultValue;
};
/**
 * If the thing is a FormData object, return true, otherwise return false.
 *
 * @param {unknown} thing - The thing to check.
 *
 * @returns {boolean}
 */ function isSpecCompliantForm(thing) {
    return !!(thing && isFunction(thing.append) && thing[toStringTag] === 'FormData' && thing[iterator]);
}
/**
 * Recursively converts an object to a JSON-compatible object, handling circular references and Buffers.
 *
 * @param {Object} obj - The object to convert.
 * @returns {Object} The JSON-compatible object.
 */ const toJSONObject = (obj)=>{
    const visited = new WeakSet();
    const visit = (source)=>{
        if (isObject(source)) {
            if (visited.has(source)) return;
            //Buffer check
            if (isBuffer(source)) return source;
            if (!('toJSON' in source)) {
                // add-on descent / delete-on-ascent: preserves path semantics, so DAG nodes serialise at every occurrence (see #7230).
                visited.add(source);
                let target;
                if (isSet(source)) {
                    target = [];
                    for (const value of source){
                        const reducedValue = visit(value);
                        !isUndefined(reducedValue) && target.push(reducedValue);
                    }
                } else {
                    target = isArray(source) ? [] : {};
                    forEach(source, (value, key)=>{
                        const reducedValue = visit(value);
                        !isUndefined(reducedValue) && (target[key] = reducedValue);
                    });
                }
                visited.delete(source);
                return target;
            }
        }
        return source;
    };
    return visit(obj);
};
/**
 * Determines if a value is an async function.
 *
 * @param {*} thing - The value to test.
 * @returns {boolean} True if value is an async function, otherwise false.
 */ const isAsyncFn = kindOfTest('AsyncFunction');
/**
 * Determines if a value is thenable (has then and catch methods).
 *
 * @param {*} thing - The value to test.
 * @returns {boolean} True if value is thenable, otherwise false.
 */ const isThenable = (thing)=>thing && (isObject(thing) || isFunction(thing)) && isFunction(thing.then) && isFunction(thing.catch);
// original code
// https://github.com/DigitalBrainJS/AxiosPromise/blob/16deab13710ec09779922131f3fa5954320f83ab/lib/utils.js#L11-L34
/**
 * Provides a cross-platform setImmediate implementation.
 * Uses native setImmediate if available, otherwise falls back to postMessage or setTimeout.
 *
 * @param {boolean} setImmediateSupported - Whether setImmediate is supported.
 * @param {boolean} postMessageSupported - Whether postMessage is supported.
 * @returns {Function} A function to schedule a callback asynchronously.
 */ const _setImmediate = ((setImmediateSupported, postMessageSupported)=>{
    if (setImmediateSupported) return setImmediate;
    return postMessageSupported ? ((token, callbacks)=>{
        _global.addEventListener('message', ({ source, data })=>{
            if (source === _global && data === token) callbacks.length && callbacks.shift()();
        }, false);
        return (cb)=>{
            callbacks.push(cb);
            _global.postMessage(token, '*');
        };
    })(`axios@${Math.random()}`, []) : (cb)=>setTimeout(cb);
})(typeof setImmediate === 'function', isFunction(_global.postMessage));
/**
 * Schedules a microtask or asynchronous callback as soon as possible.
 * Uses queueMicrotask if available, otherwise falls back to process.nextTick or _setImmediate.
 *
 * @type {Function}
 */ const asap = typeof queueMicrotask !== 'undefined' ? queueMicrotask.bind(_global) : _setImmediate;
// *********************
const isIterable = (thing)=>thing != null && isFunction(thing[iterator]);
/**
 * Determine if a value is iterable via an iterator that is NOT sourced solely
 * from a polluted Object.prototype. Use this instead of `isIterable` whenever
 * the iterable comes from untrusted input (e.g. user-supplied header sources),
 * so `Object.prototype[Symbol.iterator] = ...` cannot turn an ordinary object
 * into an attacker-controlled entries iterator.
 *
 * @param {*} thing The value to test
 *
 * @returns {boolean} True if value has a non-polluted iterator
 */ const isSafeIterable = (thing)=>thing != null && hasOwnInPrototypeChain(thing, iterator) && isIterable(thing);
exports.default = {
    isArray,
    isArrayBuffer,
    isBuffer,
    isFormData,
    isArrayBufferView,
    isString,
    isNumber,
    isBoolean,
    isObject,
    isPlainObject,
    isEmptyObject,
    isReadableStream,
    isRequest,
    isResponse,
    isHeaders,
    isUndefined,
    isDate,
    isFile,
    isReactNativeBlob,
    isReactNative,
    isBlob,
    isRegExp,
    isFunction,
    isStream,
    isURLSearchParams,
    isTypedArray,
    isFileList,
    forEach,
    merge,
    extend,
    trim,
    stripBOM,
    inherits,
    toFlatObject,
    kindOf,
    kindOfTest,
    endsWith,
    toArray,
    forEachEntry,
    matchAll,
    isHTMLForm,
    hasOwnProperty,
    hasOwnProp: hasOwnProperty,
    hasOwnInPrototypeChain,
    getSafeProp,
    toSafeFlatObject,
    reduceDescriptors,
    freezeMethods,
    toObjectSet,
    toCamelCase,
    noop,
    toFiniteNumber,
    findKey,
    global: _global,
    isContextDefined,
    isSpecCompliantForm,
    toJSONObject,
    isAsyncFn,
    isThenable,
    setImmediate: _setImmediate,
    asap,
    isIterable,
    isSafeIterable
};

},{"./helpers/bind.js":"bgexy","@parcel/transformer-js/src/esmodule-helpers.js":"jnFvT"}],"bgexy":[function(require,module,exports,__globalThis) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "default", ()=>bind);
'use strict';
function bind(fn, thisArg) {
    return function wrap() {
        return fn.apply(thisArg, arguments);
    };
}

},{"@parcel/transformer-js/src/esmodule-helpers.js":"jnFvT"}],"jnFvT":[function(require,module,exports,__globalThis) {
exports.interopDefault = function(a) {
    return a && a.__esModule ? a : {
        default: a
    };
};
exports.defineInteropFlag = function(a) {
    Object.defineProperty(a, '__esModule', {
        value: true
    });
};
exports.exportAll = function(source, dest) {
    Object.keys(source).forEach(function(key) {
        if (key === 'default' || key === '__esModule' || Object.prototype.hasOwnProperty.call(dest, key)) return;
        Object.defineProperty(dest, key, {
            enumerable: true,
            get: function() {
                return source[key];
            }
        });
    });
    return dest;
};
exports.export = function(dest, destName, get) {
    Object.defineProperty(dest, destName, {
        enumerable: true,
        get: get
    });
};

},{}],"cBDUi":[function(require,module,exports,__globalThis) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
var _utilsJs = require("../utils.js");
var _utilsJsDefault = parcelHelpers.interopDefault(_utilsJs);
var _buildURLJs = require("../helpers/buildURL.js");
var _buildURLJsDefault = parcelHelpers.interopDefault(_buildURLJs);
var _interceptorManagerJs = require("./InterceptorManager.js");
var _interceptorManagerJsDefault = parcelHelpers.interopDefault(_interceptorManagerJs);
var _dispatchRequestJs = require("./dispatchRequest.js");
var _dispatchRequestJsDefault = parcelHelpers.interopDefault(_dispatchRequestJs);
var _mergeConfigJs = require("./mergeConfig.js");
var _mergeConfigJsDefault = parcelHelpers.interopDefault(_mergeConfigJs);
var _buildFullPathJs = require("./buildFullPath.js");
var _buildFullPathJsDefault = parcelHelpers.interopDefault(_buildFullPathJs);
var _methodListJs = require("./methodList.js");
var _methodListJsDefault = parcelHelpers.interopDefault(_methodListJs);
var _validatorJs = require("../helpers/validator.js");
var _validatorJsDefault = parcelHelpers.interopDefault(_validatorJs);
var _axiosHeadersJs = require("./AxiosHeaders.js");
var _axiosHeadersJsDefault = parcelHelpers.interopDefault(_axiosHeadersJs);
var _transitionalJs = require("../defaults/transitional.js");
var _transitionalJsDefault = parcelHelpers.interopDefault(_transitionalJs);
var _axiosErrorJs = require("./AxiosError.js");
'use strict';
const validators = (0, _validatorJsDefault.default).validators;
// Recognize header maps without consuming objects intended as literal values.
// AxiosHeaders from other builds share a brand and header-container interface,
// but not constructor identity. A tag and toJSON alone can describe a literal.
const isHeadersBucket = (value)=>{
    if (value == null || (0, _utilsJsDefault.default).isPlainObject(value) || value instanceof (0, _axiosHeadersJsDefault.default)) return true;
    try {
        return (0, _utilsJsDefault.default).isObject(value) && (0, _utilsJsDefault.default).getSafeProp(value, Symbol.toStringTag) === 'AxiosHeaders' && [
            'toJSON',
            'set',
            'get',
            'has',
            'delete',
            'clear',
            'normalize',
            'concat',
            'toString',
            Symbol.iterator
        ].every((method)=>(0, _utilsJsDefault.default).isFunction((0, _utilsJsDefault.default).getSafeProp(value, method)));
    } catch (e) {
        // A failed optional brand probe must not prevent literal header serialization.
        return false;
    }
};
/**
 * Create a new instance of Axios
 *
 * @param {Object} instanceConfig The default config for the instance
 *
 * @return {Axios} A new instance of Axios
 */ class Axios {
    constructor(instanceConfig){
        this.defaults = instanceConfig || {};
        this.interceptors = {
            request: new (0, _interceptorManagerJsDefault.default)(),
            response: new (0, _interceptorManagerJsDefault.default)()
        };
    }
    /**
   * Dispatch a request
   *
   * @param {String|Object} configOrUrl The config specific for this request (merged with this.defaults)
   * @param {?Object} config
   *
   * @returns {Promise} The Promise to be fulfilled
   */ async request(configOrUrl, config) {
        try {
            return await this._request(configOrUrl, config);
        } catch (err) {
            if (err instanceof Error) try {
                let dummy = {};
                Error.captureStackTrace ? Error.captureStackTrace(dummy) : dummy = new Error();
                const dummyStack = dummy.stack;
                let stack = '';
                // slice off the Error: ... line
                if (typeof dummyStack === 'string') {
                    const firstNewlineIndex = dummyStack.indexOf('\n');
                    stack = firstNewlineIndex === -1 ? '' : dummyStack.slice(firstNewlineIndex + 1);
                }
                if (!err.stack) err.stack = stack;
                else if (stack) {
                    // Match a common suffix after the 2 top frames when available,
                    // otherwise compare the full reconstructed stack.
                    const firstNewlineIndex = stack.indexOf('\n');
                    const secondNewlineIndex = firstNewlineIndex === -1 ? -1 : stack.indexOf('\n', firstNewlineIndex + 1);
                    const duplicateCheckSuffix = secondNewlineIndex === -1 ? stack : stack.slice(secondNewlineIndex + 1);
                    // `AxiosError.from()` may have already inlined the wrapped error's
                    // stack under a `Caused by:` marker. Keep the reconstructed caller
                    // frames ahead of that marker so stack-only reporters do not read
                    // them as part of the low-level cause.
                    const currentStack = String(err.stack);
                    const causeIndex = (0, _axiosErrorJs.getCauseStackIndex)(err, currentStack);
                    const stackHead = causeIndex === -1 ? currentStack : currentStack.slice(0, causeIndex);
                    const causeSection = causeIndex === -1 ? '' : currentStack.slice(causeIndex);
                    if (!stackHead.endsWith(duplicateCheckSuffix)) err.stack = stackHead + '\n' + stack + causeSection;
                }
            } catch (e) {
            // Ignore failures from custom stack hooks or un-writable stack properties.
            }
            throw err;
        }
    }
    _request(configOrUrl, config) {
        /*eslint no-param-reassign:0*/ // Allow for axios('example/url'[, config]) a la fetch API
        if (typeof configOrUrl === 'string') {
            config = config || {};
            config.url = configOrUrl;
        } else config = configOrUrl || {};
        config = (0, _mergeConfigJsDefault.default)(this.defaults, config);
        const { transitional, paramsSerializer, headers } = config;
        if (transitional !== undefined) (0, _validatorJsDefault.default).assertOptions(transitional, {
            silentJSONParsing: validators.transitional(validators.boolean),
            forcedJSONParsing: validators.transitional(validators.boolean),
            clarifyTimeoutError: validators.transitional(validators.boolean),
            legacyInterceptorReqResOrdering: validators.transitional(validators.boolean),
            advertiseZstdAcceptEncoding: validators.transitional(validators.boolean),
            validateStatusUndefinedResolves: validators.transitional(validators.boolean),
            encodeBasicAuthUsername: validators.transitional(validators.boolean)
        }, false);
        if (paramsSerializer != null) {
            if ((0, _utilsJsDefault.default).isFunction(paramsSerializer)) config.paramsSerializer = {
                serialize: paramsSerializer
            };
            else (0, _validatorJsDefault.default).assertOptions(paramsSerializer, {
                encode: validators.function,
                serialize: validators.function
            }, true);
        }
        // Set config.allowAbsoluteUrls
        if (config.allowAbsoluteUrls !== undefined) ;
        else if ((0, _utilsJsDefault.default).hasOwnProp(this.defaults, 'allowAbsoluteUrls') && this.defaults.allowAbsoluteUrls !== undefined) config.allowAbsoluteUrls = this.defaults.allowAbsoluteUrls;
        else config.allowAbsoluteUrls = true;
        (0, _validatorJsDefault.default).assertOptions(config, {
            baseUrl: validators.spelling('baseURL'),
            withXsrfToken: validators.spelling('withXSRFToken')
        }, true);
        // Set config.method
        config.method = ((0, _utilsJsDefault.default).getSafeProp(config, 'method') || (0, _utilsJsDefault.default).getSafeProp(this.defaults, 'method') || 'get').toLowerCase();
        // Flatten header defaults without consuming literal method-named headers.
        const commonHeaders = (0, _utilsJsDefault.default).getSafeProp(headers, 'common');
        const methodHeaders = (0, _utilsJsDefault.default).getSafeProp(headers, config.method);
        const contextHeaders = headers && (0, _utilsJsDefault.default).merge(isHeadersBucket(commonHeaders) ? commonHeaders : undefined, isHeadersBucket(methodHeaders) ? methodHeaders : undefined);
        headers && (0, _utilsJsDefault.default).forEach((0, _methodListJsDefault.default).concat('common'), (method)=>{
            if (isHeadersBucket((0, _utilsJsDefault.default).getSafeProp(headers, method))) delete headers[method];
        });
        config.headers = (0, _axiosHeadersJsDefault.default).concat(contextHeaders, headers);
        // filter out skipped interceptors
        const requestInterceptorChain = [];
        let synchronousRequestInterceptors = true;
        this.interceptors.request.forEach(function unshiftRequestInterceptors(interceptor) {
            if (typeof interceptor.runWhen === 'function' && interceptor.runWhen(config) === false) return;
            synchronousRequestInterceptors = synchronousRequestInterceptors && interceptor.synchronous;
            const transitional = config.transitional || (0, _transitionalJsDefault.default);
            const legacyInterceptorReqResOrdering = transitional && transitional.legacyInterceptorReqResOrdering;
            if (legacyInterceptorReqResOrdering) requestInterceptorChain.unshift(interceptor.fulfilled, interceptor.rejected);
            else requestInterceptorChain.push(interceptor.fulfilled, interceptor.rejected);
        });
        const responseInterceptorChain = [];
        this.interceptors.response.forEach(function pushResponseInterceptors(interceptor) {
            responseInterceptorChain.push(interceptor.fulfilled, interceptor.rejected);
        });
        let promise;
        let i = 0;
        let len;
        if (!synchronousRequestInterceptors) {
            const chain = [
                (0, _dispatchRequestJsDefault.default).bind(this),
                undefined
            ];
            chain.unshift(...requestInterceptorChain);
            chain.push(...responseInterceptorChain);
            len = chain.length;
            promise = Promise.resolve(config);
            while(i < len)promise = promise.then(chain[i++], chain[i++]);
            return promise;
        }
        len = requestInterceptorChain.length;
        let newConfig = config;
        while(i < len){
            const onFulfilled = requestInterceptorChain[i++];
            const onRejected = requestInterceptorChain[i++];
            try {
                newConfig = onFulfilled ? onFulfilled(newConfig) : newConfig;
            } catch (error) {
                if (!onRejected) {
                    promise = Promise.reject(error);
                    break;
                }
                try {
                    const rejectedResult = onRejected.call(this, error);
                    if ((0, _utilsJsDefault.default).isThenable(rejectedResult)) promise = Promise.resolve(rejectedResult).then(()=>(0, _dispatchRequestJsDefault.default).call(this, newConfig));
                } catch (rejectedError) {
                    promise = Promise.reject(rejectedError);
                }
                break;
            }
        }
        if (!promise) try {
            promise = (0, _dispatchRequestJsDefault.default).call(this, newConfig);
        } catch (error) {
            promise = Promise.reject(error);
        }
        i = 0;
        len = responseInterceptorChain.length;
        while(i < len)promise = promise.then(responseInterceptorChain[i++], responseInterceptorChain[i++]);
        return promise;
    }
    getUri(config) {
        config = (0, _mergeConfigJsDefault.default)(this.defaults, config);
        const fullPath = (0, _buildFullPathJsDefault.default)(config.baseURL, config.url, config.allowAbsoluteUrls, config);
        return (0, _buildURLJsDefault.default)(fullPath, config.params, config.paramsSerializer);
    }
}
// Provide aliases for supported request methods
(0, _utilsJsDefault.default).forEach([
    'delete',
    'get',
    'head',
    'options'
], function forEachMethodNoData(method) {
    /*eslint func-names:0*/ Axios.prototype[method] = async function(url, config) {
        return this.request((0, _mergeConfigJsDefault.default)(config || {}, {
            method,
            url,
            data: config && (0, _utilsJsDefault.default).hasOwnProp(config, 'data') ? config.data : undefined
        }));
    };
});
(0, _utilsJsDefault.default).forEach([
    'post',
    'put',
    'patch',
    'query'
], function forEachMethodWithData(method) {
    function generateHTTPMethod(isForm) {
        return async function httpMethod(url, data, config) {
            return this.request((0, _mergeConfigJsDefault.default)(config || {}, {
                method,
                headers: isForm ? {
                    'Content-Type': 'multipart/form-data'
                } : {},
                url,
                data
            }));
        };
    }
    Axios.prototype[method] = generateHTTPMethod();
    // QUERY is a safe/idempotent read method; multipart form bodies don't fit
    // its semantics, so no queryForm shorthand is generated.
    if (method !== 'query') Axios.prototype[method + 'Form'] = generateHTTPMethod(true);
});
exports.default = Axios;

},{"../utils.js":"jI6DP","../helpers/buildURL.js":"3CNaw","./InterceptorManager.js":"bt5wS","./dispatchRequest.js":"1p0aT","./mergeConfig.js":"311Mu","./buildFullPath.js":"kg0Bk","./methodList.js":"c1k6n","../helpers/validator.js":"9wnyh","./AxiosHeaders.js":"9EzTj","../defaults/transitional.js":"cKdyU","./AxiosError.js":"7z85x","@parcel/transformer-js/src/esmodule-helpers.js":"jnFvT"}],"3CNaw":[function(require,module,exports,__globalThis) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
/**
 * It replaces URL-encoded forms of `:`, `$`, `,`, and spaces with
 * their plain counterparts (`:`, `$`, `,`, `+`).
 *
 * @param {string} val The value to be encoded.
 *
 * @returns {string} The encoded value.
 */ parcelHelpers.export(exports, "encode", ()=>encode);
parcelHelpers.export(exports, "default", ()=>buildURL);
var _utilsJs = require("../utils.js");
var _utilsJsDefault = parcelHelpers.interopDefault(_utilsJs);
var _axiosURLSearchParamsJs = require("./AxiosURLSearchParams.js");
var _axiosURLSearchParamsJsDefault = parcelHelpers.interopDefault(_axiosURLSearchParamsJs);
'use strict';
function encode(val) {
    return encodeURIComponent(val).replace(/%3A/gi, ':').replace(/%24/g, '$').replace(/%2C/gi, ',').replace(/%20/g, '+');
}
function buildURL(url, params, options) {
    if (!params) return url;
    url = url || '';
    const _options = (0, _utilsJsDefault.default).isFunction(options) ? {
        serialize: options
    } : options;
    // Read serializer options pollution-safely: own properties and methods on a
    // class/template prototype are honored, but values injected onto a polluted
    // Object.prototype are ignored.
    const _encode = (0, _utilsJsDefault.default).getSafeProp(_options, 'encode') || encode;
    const serializeFn = (0, _utilsJsDefault.default).getSafeProp(_options, 'serialize');
    let serializedParams;
    if (serializeFn) serializedParams = serializeFn(params, _options);
    else serializedParams = (0, _utilsJsDefault.default).isURLSearchParams(params) ? params.toString() : new (0, _axiosURLSearchParamsJsDefault.default)(params, _options).toString(_encode);
    if (serializedParams) {
        const hashmarkIndex = url.indexOf('#');
        if (hashmarkIndex !== -1) url = url.slice(0, hashmarkIndex);
        url += (url.indexOf('?') === -1 ? '?' : '&') + serializedParams;
    }
    return url;
}

},{"../utils.js":"jI6DP","./AxiosURLSearchParams.js":"i7MZs","@parcel/transformer-js/src/esmodule-helpers.js":"jnFvT"}],"i7MZs":[function(require,module,exports,__globalThis) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
var _toFormDataJs = require("./toFormData.js");
var _toFormDataJsDefault = parcelHelpers.interopDefault(_toFormDataJs);
'use strict';
/**
 * It encodes a string by replacing all characters that are not in the unreserved set with
 * their percent-encoded equivalents
 *
 * @param {string} str - The string to encode.
 *
 * @returns {string} The encoded string.
 */ function encode(str) {
    const charMap = {
        '!': '%21',
        "'": '%27',
        '(': '%28',
        ')': '%29',
        '~': '%7E',
        '%20': '+'
    };
    return encodeURIComponent(str).replace(/[!'()~]|%20/g, function replacer(match) {
        return charMap[match];
    });
}
/**
 * It takes a params object and converts it to a FormData object
 *
 * @param {Object<string, any>} params - The parameters to be converted to a FormData object.
 * @param {Object<string, any>} options - The options object passed to the Axios constructor.
 *
 * @returns {void}
 */ function AxiosURLSearchParams(params, options) {
    this._pairs = [];
    params && (0, _toFormDataJsDefault.default)(params, this, options);
}
const prototype = AxiosURLSearchParams.prototype;
prototype.append = function append(name, value) {
    this._pairs.push([
        name,
        value
    ]);
};
prototype.toString = function toString(encoder) {
    const _encode = encoder ? (value)=>encoder.call(this, value, encode) : encode;
    return this._pairs.map(function each(pair) {
        return _encode(pair[0]) + '=' + _encode(pair[1]);
    }, '').join('&');
};
exports.default = AxiosURLSearchParams;

},{"./toFormData.js":"2RXm4","@parcel/transformer-js/src/esmodule-helpers.js":"jnFvT"}],"2RXm4":[function(require,module,exports,__globalThis) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "DEFAULT_FORM_DATA_MAX_DEPTH", ()=>DEFAULT_FORM_DATA_MAX_DEPTH);
var _utilsJs = require("../utils.js");
var _utilsJsDefault = parcelHelpers.interopDefault(_utilsJs);
var _axiosErrorJs = require("../core/AxiosError.js");
var _axiosErrorJsDefault = parcelHelpers.interopDefault(_axiosErrorJs);
// temporary hotfix to avoid circular references until AxiosURLSearchParams is refactored
var _formDataJs = require("../platform/node/classes/FormData.js");
var _formDataJsDefault = parcelHelpers.interopDefault(_formDataJs);
var _bufferJs = require("../platform/node/classes/Buffer.js");
var _bufferJsDefault = parcelHelpers.interopDefault(_bufferJs);
'use strict';
const DEFAULT_FORM_DATA_MAX_DEPTH = 100;
/**
 * Determines if the given thing is a array or js object.
 *
 * @param {string} thing - The object or array to be visited.
 *
 * @returns {boolean}
 */ function isVisitable(thing) {
    return (0, _utilsJsDefault.default).isPlainObject(thing) || (0, _utilsJsDefault.default).isArray(thing);
}
/**
 * It removes the brackets from the end of a string
 *
 * @param {string} key - The key of the parameter.
 *
 * @returns {string} the key without the brackets.
 */ function removeBrackets(key) {
    return (0, _utilsJsDefault.default).endsWith(key, '[]') ? key.slice(0, -2) : key;
}
/**
 * It takes a path, a key, and a boolean, and returns a string
 *
 * @param {string} path - The path to the current key.
 * @param {string} key - The key of the current object being iterated over.
 * @param {string} dots - If true, the key will be rendered with dots instead of brackets.
 *
 * @returns {string} The path to the current key.
 */ function renderKey(path, key, dots) {
    if (!path) return key;
    return path.concat(key).map(function each(token, i) {
        // eslint-disable-next-line no-param-reassign
        token = removeBrackets(token);
        return !dots && i ? '[' + token + ']' : token;
    }).join(dots ? '.' : '');
}
/**
 * If the array is an array and none of its elements are visitable, then it's a flat array.
 *
 * @param {Array<any>} arr - The array to check
 *
 * @returns {boolean}
 */ function isFlatArray(arr) {
    return (0, _utilsJsDefault.default).isArray(arr) && !arr.some(isVisitable);
}
const predicates = (0, _utilsJsDefault.default).toFlatObject((0, _utilsJsDefault.default), {}, null, function filter(prop) {
    return /^is[A-Z]/.test(prop);
});
/**
 * Convert a data object to FormData
 *
 * @param {Object} obj
 * @param {?Object} [formData]
 * @param {?Object} [options]
 * @param {Function} [options.visitor]
 * @param {Boolean} [options.metaTokens = true]
 * @param {Boolean} [options.dots = false]
 * @param {?Boolean} [options.indexes = false]
 *
 * @returns {Object}
 **/ /**
 * It converts an object into a FormData object
 *
 * @param {Object<any, any>} obj - The object to convert to form data.
 * @param {string} formData - The FormData object to append to.
 * @param {Object<string, any>} options
 *
 * @returns
 */ function toFormData(obj, formData, options) {
    if (!(0, _utilsJsDefault.default).isObject(obj)) throw new TypeError('target must be an object');
    // eslint-disable-next-line no-param-reassign
    formData = formData || new ((0, _formDataJsDefault.default) || FormData)();
    const option = (name, fallback)=>{
        const value = (0, _utilsJsDefault.default).getSafeProp(options, name);
        return (0, _utilsJsDefault.default).isUndefined(value) ? fallback : value;
    };
    const metaTokens = option('metaTokens', true);
    // eslint-disable-next-line no-use-before-define
    const visitor = option('visitor') || defaultVisitor;
    const dots = option('dots', false);
    const indexes = option('indexes', false);
    const _Blob = option('Blob') || typeof Blob !== 'undefined' && Blob;
    const maxDepth = option('maxDepth', DEFAULT_FORM_DATA_MAX_DEPTH);
    const useBlob = _Blob && (0, _utilsJsDefault.default).isSpecCompliantForm(formData);
    const stack = [];
    if (!(0, _utilsJsDefault.default).isFunction(visitor)) throw new TypeError('visitor must be a function');
    function convertValue(value) {
        if (value === null) return '';
        if ((0, _utilsJsDefault.default).isDate(value)) return value.toISOString();
        if ((0, _utilsJsDefault.default).isBoolean(value)) return value.toString();
        if (!useBlob && (0, _utilsJsDefault.default).isBlob(value)) throw new (0, _axiosErrorJsDefault.default)('Blob is not supported. Use a Buffer instead.');
        if ((0, _utilsJsDefault.default).isArrayBuffer(value) || (0, _utilsJsDefault.default).isTypedArray(value)) {
            if (useBlob && typeof _Blob === 'function') return new _Blob([
                value
            ]);
            if ((0, _bufferJsDefault.default) && (0, _bufferJsDefault.default).isBufferAvailable()) return (0, _bufferJsDefault.default).from(value);
            throw new (0, _axiosErrorJsDefault.default)('Blob is not supported. Use a Buffer instead.', (0, _axiosErrorJsDefault.default).ERR_NOT_SUPPORT);
        }
        return value;
    }
    function throwIfMaxDepthExceeded(depth) {
        if (depth > maxDepth) throw new (0, _axiosErrorJsDefault.default)('Object is too deeply nested (' + depth + ' levels). Max depth: ' + maxDepth, (0, _axiosErrorJsDefault.default).ERR_FORM_DATA_DEPTH_EXCEEDED);
    }
    function stringifyWithDepthLimit(value, depth) {
        if (maxDepth === Infinity) return JSON.stringify(value);
        const ancestors = [];
        return JSON.stringify(value, function limitDepth(_key, currentValue) {
            if (!(0, _utilsJsDefault.default).isObject(currentValue)) return currentValue;
            while(ancestors.length && ancestors[ancestors.length - 1] !== this)ancestors.pop();
            ancestors.push(currentValue);
            throwIfMaxDepthExceeded(depth + ancestors.length - 1);
            return currentValue;
        });
    }
    /**
   * Default visitor.
   *
   * @param {*} value
   * @param {String|Number} key
   * @param {Array<String|Number>} path
   * @this {FormData}
   *
   * @returns {boolean} return true to visit the each prop of the value recursively
   */ function defaultVisitor(value, key, path) {
        let arr = value;
        if ((0, _utilsJsDefault.default).isReactNative(formData) && (0, _utilsJsDefault.default).isReactNativeBlob(value)) {
            formData.append(renderKey(path, key, dots), convertValue(value));
            return false;
        }
        if (value && !path && typeof value === 'object') {
            if ((0, _utilsJsDefault.default).endsWith(key, '{}')) {
                // eslint-disable-next-line no-param-reassign
                key = metaTokens ? key : key.slice(0, -2);
                // eslint-disable-next-line no-param-reassign
                value = stringifyWithDepthLimit(value, 1);
            } else if ((0, _utilsJsDefault.default).isArray(value) && isFlatArray(value) || ((0, _utilsJsDefault.default).isFileList(value) || (0, _utilsJsDefault.default).endsWith(key, '[]')) && (arr = (0, _utilsJsDefault.default).toArray(value))) {
                // eslint-disable-next-line no-param-reassign
                key = removeBrackets(key);
                arr.forEach(function each(el, index) {
                    !((0, _utilsJsDefault.default).isUndefined(el) || el === null) && formData.append(// eslint-disable-next-line no-nested-ternary
                    indexes === true ? renderKey([
                        key
                    ], index, dots) : indexes === null ? key : key + '[]', convertValue(el));
                });
                return false;
            }
        }
        if (isVisitable(value)) return true;
        formData.append(renderKey(path, key, dots), convertValue(value));
        return false;
    }
    const exposedHelpers = Object.assign(predicates, {
        defaultVisitor,
        convertValue,
        isVisitable
    });
    function build(value, path, depth = 0) {
        if ((0, _utilsJsDefault.default).isUndefined(value)) return;
        throwIfMaxDepthExceeded(depth);
        if (stack.indexOf(value) !== -1) throw new Error('Circular reference detected in ' + path.join('.'));
        stack.push(value);
        (0, _utilsJsDefault.default).forEach(value, function each(el, key) {
            const result = !((0, _utilsJsDefault.default).isUndefined(el) || el === null) && visitor.call(formData, el, (0, _utilsJsDefault.default).isString(key) ? key.trim() : key, path, exposedHelpers);
            if (result === true) build(el, path ? path.concat(key) : [
                key
            ], depth + 1);
        });
        stack.pop();
    }
    if (!(0, _utilsJsDefault.default).isObject(obj)) throw new TypeError('data must be an object');
    build(obj);
    return formData;
}
exports.default = toFormData;

},{"../utils.js":"jI6DP","../core/AxiosError.js":"7z85x","../platform/node/classes/FormData.js":"dVGJ4","../platform/node/classes/Buffer.js":"dVGJ4","@parcel/transformer-js/src/esmodule-helpers.js":"jnFvT"}],"7z85x":[function(require,module,exports,__globalThis) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "REDACTED", ()=>REDACTED);
parcelHelpers.export(exports, "CAUSED_BY_SEPARATOR", ()=>CAUSED_BY_SEPARATOR);
// Match the section we appended, not marker-like text in an error message or
// a replacement stack supplied by the caller. Do not re-read the cause's stack.
parcelHelpers.export(exports, "getCauseStackIndex", ()=>getCauseStackIndex);
var _utilsJs = require("../utils.js");
var _utilsJsDefault = parcelHelpers.interopDefault(_utilsJs);
var _axiosHeadersJs = require("./AxiosHeaders.js");
var _axiosHeadersJsDefault = parcelHelpers.interopDefault(_axiosHeadersJs);
'use strict';
const REDACTED = '[REDACTED ****]';
function hasOwnOrPrototypeToJSON(source) {
    if ((0, _utilsJsDefault.default).hasOwnProp(source, 'toJSON')) return true;
    let prototype = Object.getPrototypeOf(source);
    while(prototype && prototype !== Object.prototype){
        if ((0, _utilsJsDefault.default).hasOwnProp(prototype, 'toJSON')) return true;
        prototype = Object.getPrototypeOf(prototype);
    }
    return false;
}
// Build a plain-object snapshot of `config` and replace the value of any key
// (case-insensitive) listed in `redactKeys` with REDACTED. Walks through arrays
// and AxiosHeaders, and short-circuits on circular references.
function redactConfig(config, redactKeys) {
    const lowerKeys = new Set(redactKeys.map((k)=>String(k).toLowerCase()));
    const seen = [];
    const visit = (source)=>{
        if (source === null || typeof source !== 'object') return source;
        if ((0, _utilsJsDefault.default).isBuffer(source)) return source;
        if (seen.indexOf(source) !== -1) return undefined;
        if (source instanceof (0, _axiosHeadersJsDefault.default)) source = source.toJSON();
        seen.push(source);
        let result;
        if ((0, _utilsJsDefault.default).isArray(source)) {
            result = [];
            source.forEach((v, i)=>{
                const reducedValue = visit(v);
                if (!(0, _utilsJsDefault.default).isUndefined(reducedValue)) result[i] = reducedValue;
            });
        } else {
            if (!(0, _utilsJsDefault.default).isPlainObject(source) && hasOwnOrPrototypeToJSON(source)) {
                seen.pop();
                return source;
            }
            result = Object.create(null);
            for (const [key, value] of Object.entries(source)){
                const reducedValue = lowerKeys.has(key.toLowerCase()) ? REDACTED : visit(value);
                if (!(0, _utilsJsDefault.default).isUndefined(reducedValue)) result[key] = reducedValue;
            }
        }
        seen.pop();
        return result;
    };
    return visit(config);
}
function stringifySafely(value) {
    try {
        return String(value);
    } catch (err) {
        return '';
    }
}
function aggregateErrorMessage(error) {
    const message = error.errors.map((entry)=>{
        try {
            return entry && entry.message ? stringifySafely(entry.message) : stringifySafely(entry);
        } catch (err) {
            return '';
        }
    }).filter(Boolean).join('; ');
    return message || error.name || 'AggregateError';
}
const CAUSED_BY_SEPARATOR = '\nCaused by: ';
const $causeStack = Symbol('causeStack');
function getCauseStackIndex(error, stack) {
    const causeStack = (0, _utilsJsDefault.default).hasOwnProp(error, $causeStack) && error[$causeStack];
    return causeStack && stack.endsWith(causeStack) ? stack.length - causeStack.length : -1;
}
/**
 * Append the stack of a wrapped error to `target.stack`.
 *
 * `cause` already exposes the original error for tooling that walks the standard
 * cause chain, but many error reporters read `stack` and nothing else. Inlining
 * the wrapped stack there means those reporters surface the underlying failure
 * instead of the axios frames that normalized it (see #6670).
 *
 * Every read is defensive: a custom `Error.prepareStackTrace` hook, a runtime
 * without stack support, or a replaced `stack` property can leave the value
 * missing, non-string, or read-only, and normalizing an error must not throw
 * because of that.
 *
 * @param {Error} target The AxiosError being built.
 * @param {Error} source The error being wrapped.
 *
 * @returns {void}
 */ function appendCauseStack(target, source) {
    try {
        const sourceStack = source && source.stack;
        if (typeof sourceStack !== 'string' || !sourceStack) return;
        const targetStack = target.stack;
        if (typeof targetStack !== 'string' || !targetStack) return;
        // Each call to `from()` creates a fresh target. Re-wrapping includes the
        // previous stack verbatim, adding one cause section per wrap.
        const causeStack = CAUSED_BY_SEPARATOR + sourceStack;
        target.stack = targetStack + causeStack;
        Object.defineProperty(target, $causeStack, {
            __proto__: null,
            value: causeStack
        });
    } catch (e) {
    // Ignore failures from custom stack hooks or un-writable stack properties.
    }
}
class AxiosError extends Error {
    static from(error, code, config, request, response, customProps) {
        // `AggregateError` (thrown by Node on dual-stack/Happy-Eyeballs connection
        // failures) has an empty `message`; its detail lives in `errors[]`. Without
        // this, the wrapped error surfaces with a blank message (see #6721).
        let message = error.message;
        if (!message && (0, _utilsJsDefault.default).isArray(error.errors) && error.errors.length) message = aggregateErrorMessage(error);
        const axiosError = new AxiosError(message, code || error.code, config, request, response);
        // Match native `Error` `cause` semantics: non-enumerable. The wrapped
        // error often carries circular internals (sockets, requests, agents), so
        // an enumerable `cause` makes structured loggers (pino/winston) and any
        // own-property walk throw "Converting circular structure to JSON".
        // Regression from #6982; see #7205. `__proto__: null` mirrors the
        // `message` descriptor below (prototype-pollution-safe descriptor).
        Object.defineProperty(axiosError, 'cause', {
            __proto__: null,
            value: error,
            writable: true,
            enumerable: false,
            configurable: true
        });
        axiosError.name = error.name;
        // Inline the wrapped stack for reporters that read only `stack`; the `cause`
        // property above already covers cause-aware tooling.
        appendCauseStack(axiosError, error);
        // Preserve status from the original error if not already set from response
        if (error.status != null && axiosError.status == null) axiosError.status = error.status;
        customProps && Object.assign(axiosError, customProps);
        return axiosError;
    }
    /**
   * Create an Error with the specified message, config, error code, request and response.
   *
   * @param {string} message The error message.
   * @param {string} [code] The error code (for example, 'ECONNABORTED').
   * @param {Object} [config] The config.
   * @param {Object} [request] The request.
   * @param {Object} [response] The response.
   *
   * @returns {Error} The created error.
   */ constructor(message, code, config, request, response){
        super(message);
        // Make message enumerable to maintain backward compatibility
        // The native Error constructor sets message as non-enumerable,
        // but axios < v1.13.3 had it as enumerable
        Object.defineProperty(this, 'message', {
            // Null-proto descriptor so a polluted Object.prototype.get cannot turn
            // this data descriptor into an accessor descriptor on the way in.
            __proto__: null,
            value: message,
            enumerable: true,
            writable: true,
            configurable: true
        });
        this.name = 'AxiosError';
        this.isAxiosError = true;
        code && (this.code = code);
        config && (this.config = config);
        request && (this.request = request);
        if (response) {
            this.response = response;
            this.status = response.status;
        }
    }
    toJSON() {
        // Opt-in redaction: when the request config carries a `redact` array, the
        // value of any matching key (case-insensitive, at any depth) is replaced
        // with REDACTED in the serialized snapshot. Undefined or empty leaves the
        // existing serialization behavior unchanged.
        const config = this.config;
        const redactKeys = config && (0, _utilsJsDefault.default).hasOwnProp(config, 'redact') ? config.redact : undefined;
        const serializedConfig = (0, _utilsJsDefault.default).isArray(redactKeys) && redactKeys.length > 0 ? redactConfig(config, redactKeys) : (0, _utilsJsDefault.default).toJSONObject(config);
        return {
            // Standard
            message: this.message,
            name: this.name,
            // Microsoft
            description: this.description,
            number: this.number,
            // Mozilla
            fileName: this.fileName,
            lineNumber: this.lineNumber,
            columnNumber: this.columnNumber,
            stack: this.stack,
            // Axios
            config: serializedConfig,
            code: this.code,
            status: this.status
        };
    }
}
// This can be changed to static properties as soon as the parser options in .eslint.cjs are updated.
AxiosError.ERR_BAD_OPTION_VALUE = 'ERR_BAD_OPTION_VALUE';
AxiosError.ERR_BAD_OPTION = 'ERR_BAD_OPTION';
AxiosError.ECONNABORTED = 'ECONNABORTED';
AxiosError.ETIMEDOUT = 'ETIMEDOUT';
AxiosError.ECONNREFUSED = 'ECONNREFUSED';
AxiosError.ERR_NETWORK = 'ERR_NETWORK';
AxiosError.ERR_FR_TOO_MANY_REDIRECTS = 'ERR_FR_TOO_MANY_REDIRECTS';
AxiosError.ERR_DEPRECATED = 'ERR_DEPRECATED';
AxiosError.ERR_BAD_RESPONSE = 'ERR_BAD_RESPONSE';
AxiosError.ERR_BAD_REQUEST = 'ERR_BAD_REQUEST';
AxiosError.ERR_CANCELED = 'ERR_CANCELED';
AxiosError.ERR_NOT_SUPPORT = 'ERR_NOT_SUPPORT';
AxiosError.ERR_INVALID_URL = 'ERR_INVALID_URL';
AxiosError.ERR_FORM_DATA_DEPTH_EXCEEDED = 'ERR_FORM_DATA_DEPTH_EXCEEDED';
exports.default = AxiosError;

},{"../utils.js":"jI6DP","./AxiosHeaders.js":"9EzTj","@parcel/transformer-js/src/esmodule-helpers.js":"jnFvT"}],"9EzTj":[function(require,module,exports,__globalThis) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
var _utilsJs = require("../utils.js");
var _utilsJsDefault = parcelHelpers.interopDefault(_utilsJs);
var _parseHeadersJs = require("../helpers/parseHeaders.js");
var _parseHeadersJsDefault = parcelHelpers.interopDefault(_parseHeadersJs);
var _sanitizeHeaderValueJs = require("../helpers/sanitizeHeaderValue.js");
'use strict';
const $internals = Symbol('internals');
function normalizeHeader(header) {
    return header && String(header).trim().toLowerCase();
}
function normalizeValue(value) {
    if (value === false || value == null) return value;
    return (0, _utilsJsDefault.default).isArray(value) ? value.map(normalizeValue) : (0, _sanitizeHeaderValueJs.sanitizeHeaderValue)(String(value));
}
function parseTokens(str) {
    const tokens = Object.create(null);
    const tokensRE = /([^\s,;=]+)\s*(?:=\s*([^,;]+))?/g;
    let match;
    while(match = tokensRE.exec(str))tokens[match[1]] = match[2];
    return tokens;
}
const parameterNameRE = /^[!#$%&'*+\-.^_`|~0-9A-Za-z]+$/;
function trimOWS(value) {
    let start = 0;
    let end = value.length;
    while(start < end){
        const code = value.charCodeAt(start);
        if (code !== 0x09 && code !== 0x20) break;
        start += 1;
    }
    while(end > start){
        const code = value.charCodeAt(end - 1);
        if (code !== 0x09 && code !== 0x20) break;
        end -= 1;
    }
    return start === 0 && end === value.length ? value : value.slice(start, end);
}
function decodeQuotedString(value) {
    const last = value.length - 1;
    if (last < 1 || value.charCodeAt(0) !== 0x22 || value.charCodeAt(last) !== 0x22) return value;
    let decoded = '';
    for(let i = 1; i < last; i++){
        const code = value.charCodeAt(i);
        if (code === 0x22) return value;
        if (code === 0x5c) {
            i += 1;
            if (i >= last) return value;
        }
        decoded += value[i];
    }
    return decoded;
}
function parseParameters(value) {
    const parameters = Object.create(null);
    const str = String(value);
    let start = 0;
    let quoted = false;
    let escaped = false;
    function parseParameter(end) {
        const part = trimOWS(str.slice(start, end));
        const equals = part.indexOf('=');
        if (equals < 1) return;
        const name = trimOWS(part.slice(0, equals));
        if (!parameterNameRE.test(name)) return;
        const normalizedName = name.toLowerCase();
        if (normalizedName === '__proto__' || normalizedName === 'constructor' || normalizedName === 'prototype') return;
        const parameterValue = trimOWS(part.slice(equals + 1));
        parameters[normalizedName] = decodeQuotedString(parameterValue);
    }
    for(let i = 0; i < str.length; i++){
        const code = str.charCodeAt(i);
        if (quoted) {
            if (escaped) escaped = false;
            else if (code === 0x5c) escaped = true;
            else if (code === 0x22) quoted = false;
        } else if (code === 0x22) quoted = true;
        else if (code === 0x2c || code === 0x3b) {
            parseParameter(i);
            start = i + 1;
        }
    }
    parseParameter(str.length);
    return parameters;
}
const isValidHeaderName = (str)=>/^[-_a-zA-Z0-9^`|~,!#$%&'*+.]+$/.test(str.trim());
// `__proto__` is a valid field name, and the one name the uppercase mapping at
// the bottom of this file cannot reach: it is inherited from Object.prototype
// instead of being declared on AxiosHeaders.prototype, so `self.__proto__ = v`
// runs the inherited setter. That silently discards the header, and an array
// value replaces the instance prototype, taking every method with it.
// Store it under the same kind of case variant that mapping uses for `set` and
// `constructor`. Header lookup is caseless, so it reads back under either
// spelling, and no own `__proto__` slot is ever created for a later
// `Object.assign` to copy onto a plain object through the same setter.
const PROTO_HEADER_SLOT = '__Proto__';
const headerSlot = (name)=>name === '__proto__' ? PROTO_HEADER_SLOT : name;
function matchHeaderValue(context, value, header, filter, isHeaderNameFilter) {
    if ((0, _utilsJsDefault.default).isFunction(filter)) return filter.call(context, value, header);
    if (isHeaderNameFilter) value = header;
    if (!(0, _utilsJsDefault.default).isString(value)) return;
    if ((0, _utilsJsDefault.default).isString(filter)) return value.indexOf(filter) !== -1;
    if ((0, _utilsJsDefault.default).isRegExp(filter)) return filter.test(value);
}
function formatHeader(header) {
    return header.trim().toLowerCase().replace(/([a-z\d])(\w*)/g, (w, char, str)=>{
        return char.toUpperCase() + str;
    });
}
function buildAccessors(obj, header) {
    const accessorName = (0, _utilsJsDefault.default).toCamelCase(' ' + header);
    [
        'get',
        'set',
        'has'
    ].forEach((methodName)=>{
        Object.defineProperty(obj, methodName + accessorName, {
            // Null-proto descriptor so a polluted Object.prototype.get cannot turn
            // this data descriptor into an accessor descriptor on the way in.
            __proto__: null,
            value: function(arg1, arg2, arg3) {
                return this[methodName].call(this, header, arg1, arg2, arg3);
            },
            configurable: true
        });
    });
}
class AxiosHeaders {
    constructor(headers){
        headers && this.set(headers);
    }
    set(header, valueOrRewrite, rewrite) {
        const self = this;
        function setHeader(_value, _header, _rewrite) {
            const lHeader = normalizeHeader(_header);
            if (!lHeader) return;
            const key = (0, _utilsJsDefault.default).findKey(self, lHeader);
            if (!key || self[key] === undefined || _rewrite === true || _rewrite === undefined && self[key] !== false) self[headerSlot(key || _header)] = normalizeValue(_value);
        }
        const setHeaders = (headers, _rewrite)=>(0, _utilsJsDefault.default).forEach(headers, (_value, _header)=>setHeader(_value, _header, _rewrite));
        if ((0, _utilsJsDefault.default).isPlainObject(header) || header instanceof this.constructor) setHeaders(header, valueOrRewrite);
        else if ((0, _utilsJsDefault.default).isString(header) && (header = header.trim()) && !isValidHeaderName(header)) setHeaders((0, _parseHeadersJsDefault.default)(header), valueOrRewrite);
        else if ((0, _utilsJsDefault.default).isObject(header) && (0, _utilsJsDefault.default).isSafeIterable(header)) {
            let obj = Object.create(null), dest, key;
            for (const entry of header){
                if (!(0, _utilsJsDefault.default).isArray(entry)) throw new TypeError('Object iterator must return a key-value pair');
                key = entry[0];
                if ((0, _utilsJsDefault.default).hasOwnProp(obj, key)) {
                    dest = obj[key];
                    obj[key] = (0, _utilsJsDefault.default).isArray(dest) ? [
                        ...dest,
                        entry[1]
                    ] : [
                        dest,
                        entry[1]
                    ];
                } else obj[key] = entry[1];
            }
            setHeaders(obj, valueOrRewrite);
        } else header != null && setHeader(valueOrRewrite, header, rewrite);
        return this;
    }
    get(header, parser) {
        header = normalizeHeader(header);
        if (header) {
            const key = (0, _utilsJsDefault.default).findKey(this, header);
            if (key) {
                const value = this[key];
                if (!parser) return value;
                if (parser === true) return parseTokens(value);
                if ((0, _utilsJsDefault.default).isFunction(parser)) return parser.call(this, value, key);
                if ((0, _utilsJsDefault.default).isRegExp(parser)) return parser.exec(value);
                throw new TypeError('parser must be boolean|regexp|function');
            }
        }
    }
    has(header, matcher) {
        header = normalizeHeader(header);
        if (header) {
            const key = (0, _utilsJsDefault.default).findKey(this, header);
            return !!(key && this[key] !== undefined && (!matcher || matchHeaderValue(this, this[key], key, matcher)));
        }
        return false;
    }
    delete(header, matcher) {
        const self = this;
        let deleted = false;
        function deleteHeader(_header) {
            _header = normalizeHeader(_header);
            if (_header) {
                const key = (0, _utilsJsDefault.default).findKey(self, _header);
                if (key && (!matcher || matchHeaderValue(self, self[key], key, matcher))) {
                    delete self[key];
                    deleted = true;
                }
            }
        }
        if ((0, _utilsJsDefault.default).isArray(header)) header.forEach(deleteHeader);
        else deleteHeader(header);
        return deleted;
    }
    clear(matcher) {
        const keys = Object.keys(this);
        let i = keys.length;
        let deleted = false;
        while(i--){
            const key = keys[i];
            if (!matcher || matchHeaderValue(this, this[key], key, matcher, true)) {
                delete this[key];
                deleted = true;
            }
        }
        return deleted;
    }
    normalize(format) {
        const self = this;
        const headers = Object.create(null);
        (0, _utilsJsDefault.default).forEach(this, (value, header)=>{
            const key = (0, _utilsJsDefault.default).findKey(headers, header);
            if (key) {
                self[key] = normalizeValue(value);
                delete self[header];
                return;
            }
            const normalized = headerSlot(format ? formatHeader(header) : String(header).trim());
            if (normalized !== header) delete self[header];
            self[normalized] = normalizeValue(value);
            headers[normalized] = true;
        });
        return this;
    }
    concat(...targets) {
        return this.constructor.concat(this, ...targets);
    }
    toJSON(asStrings) {
        const obj = Object.create(null);
        (0, _utilsJsDefault.default).forEach(this, (value, header)=>{
            value != null && value !== false && (obj[header] = asStrings && (0, _utilsJsDefault.default).isArray(value) ? value.join(', ') : value);
        });
        return obj;
    }
    [Symbol.iterator]() {
        return Object.entries(this.toJSON())[Symbol.iterator]();
    }
    toString() {
        return Object.entries(this.toJSON()).map(([header, value])=>header + ': ' + value).join('\n');
    }
    getSetCookie() {
        const value = this.get('set-cookie');
        return (0, _utilsJsDefault.default).isArray(value) ? value : value == null || value === false ? [] : [
            value
        ];
    }
    get [Symbol.toStringTag]() {
        return 'AxiosHeaders';
    }
    static from(thing) {
        return thing instanceof this ? thing : new this(thing);
    }
    static parseParameters(value) {
        return parseParameters(value);
    }
    static concat(first, ...targets) {
        const computed = new this(first);
        targets.forEach((target)=>computed.set(target));
        return computed;
    }
    static accessor(header) {
        const internals = this[$internals] = this[$internals] = {
            accessors: {}
        };
        const accessors = internals.accessors;
        const prototype = this.prototype;
        function defineAccessor(_header) {
            const lHeader = normalizeHeader(_header);
            if (!accessors[lHeader]) {
                buildAccessors(prototype, _header);
                accessors[lHeader] = true;
            }
        }
        (0, _utilsJsDefault.default).isArray(header) ? header.forEach(defineAccessor) : defineAccessor(header);
        return this;
    }
}
AxiosHeaders.accessor([
    'Content-Type',
    'Content-Length',
    'Accept',
    'Accept-Encoding',
    'User-Agent',
    'Authorization'
]);
// reserved names hotfix
(0, _utilsJsDefault.default).reduceDescriptors(AxiosHeaders.prototype, ({ value }, key)=>{
    let mapped = key[0].toUpperCase() + key.slice(1); // map `set` => `Set`
    return {
        get: ()=>value,
        set (headerValue) {
            this[mapped] = headerValue;
        }
    };
});
(0, _utilsJsDefault.default).freezeMethods(AxiosHeaders);
exports.default = AxiosHeaders;

},{"../utils.js":"jI6DP","../helpers/parseHeaders.js":"H8RrA","../helpers/sanitizeHeaderValue.js":"hgIfL","@parcel/transformer-js/src/esmodule-helpers.js":"jnFvT"}],"H8RrA":[function(require,module,exports,__globalThis) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
var _utilsJs = require("../utils.js");
var _utilsJsDefault = parcelHelpers.interopDefault(_utilsJs);
'use strict';
// RawAxiosHeaders whose duplicates are ignored by node
// c.f. https://nodejs.org/api/http.html#http_message_headers
const ignoreDuplicateOf = (0, _utilsJsDefault.default).toObjectSet([
    'age',
    'authorization',
    'content-length',
    'content-type',
    'etag',
    'expires',
    'from',
    'host',
    'if-modified-since',
    'if-unmodified-since',
    'last-modified',
    'location',
    'max-forwards',
    'proxy-authorization',
    'referer',
    'retry-after',
    'user-agent'
]);
/**
 * Parse headers into an object
 *
 * ```
 * Date: Wed, 27 Aug 2014 08:58:49 GMT
 * Content-Type: application/json
 * Connection: keep-alive
 * Transfer-Encoding: chunked
 * ```
 *
 * @param {String} rawHeaders Headers needing to be parsed
 *
 * @returns {Object} Headers parsed into an object
 */ exports.default = (rawHeaders)=>{
    // Header names are data, including __proto__; avoid inherited setters.
    const parsed = Object.create(null);
    let key;
    let val;
    let i;
    rawHeaders && rawHeaders.split('\n').forEach(function parser(line) {
        i = line.indexOf(':');
        key = line.substring(0, i).trim().toLowerCase();
        val = line.substring(i + 1).trim();
        const hasKey = (0, _utilsJsDefault.default).hasOwnProp(parsed, key);
        if (!key || hasKey && (0, _utilsJsDefault.default).hasOwnProp(ignoreDuplicateOf, key)) return;
        if (key === 'set-cookie') {
            if (hasKey) parsed[key].push(val);
            else parsed[key] = [
                val
            ];
        } else parsed[key] = hasKey ? parsed[key] + ', ' + val : val;
    });
    return parsed;
};

},{"../utils.js":"jI6DP","@parcel/transformer-js/src/esmodule-helpers.js":"jnFvT"}],"hgIfL":[function(require,module,exports,__globalThis) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "sanitizeHeaderValue", ()=>sanitizeHeaderValue);
parcelHelpers.export(exports, "sanitizeByteStringHeaderValue", ()=>sanitizeByteStringHeaderValue);
parcelHelpers.export(exports, "toByteStringHeaderObject", ()=>toByteStringHeaderObject);
var _utilsJs = require("../utils.js");
var _utilsJsDefault = parcelHelpers.interopDefault(_utilsJs);
'use strict';
function trimSPorHTAB(str) {
    let start = 0;
    let end = str.length;
    while(start < end){
        const code = str.charCodeAt(start);
        if (code !== 0x09 && code !== 0x20) break;
        start += 1;
    }
    while(end > start){
        const code = str.charCodeAt(end - 1);
        if (code !== 0x09 && code !== 0x20) break;
        end -= 1;
    }
    return start === 0 && end === str.length ? str : str.slice(start, end);
}
// The control-code ranges are intentional: header sanitization strips C0/DEL bytes.
// eslint-disable-next-line no-control-regex
const INVALID_UNICODE_HEADER_VALUE_CHARS = new RegExp('[\\u0000-\\u0008\\u000a-\\u001f\\u007f]+', 'g');
// eslint-disable-next-line no-control-regex
const INVALID_BYTE_STRING_HEADER_VALUE_CHARS = new RegExp('[^\\u0009\\u0020-\\u007e\\u0080-\\u00ff]+', 'g');
function sanitizeValue(value, invalidChars) {
    if ((0, _utilsJsDefault.default).isArray(value)) return value.map((item)=>sanitizeValue(item, invalidChars));
    return trimSPorHTAB(String(value).replace(invalidChars, ''));
}
const sanitizeHeaderValue = (value)=>sanitizeValue(value, INVALID_UNICODE_HEADER_VALUE_CHARS);
const sanitizeByteStringHeaderValue = (value)=>sanitizeValue(value, INVALID_BYTE_STRING_HEADER_VALUE_CHARS);
function toByteStringHeaderObject(headers) {
    const byteStringHeaders = Object.create(null);
    (0, _utilsJsDefault.default).forEach(headers.toJSON(), (value, header)=>{
        byteStringHeaders[header] = sanitizeByteStringHeaderValue(value);
    });
    return byteStringHeaders;
}

},{"../utils.js":"jI6DP","@parcel/transformer-js/src/esmodule-helpers.js":"jnFvT"}],"dVGJ4":[function(require,module,exports,__globalThis) {
// eslint-disable-next-line strict
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
exports.default = null;

},{"@parcel/transformer-js/src/esmodule-helpers.js":"jnFvT"}],"bt5wS":[function(require,module,exports,__globalThis) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
var _utilsJs = require("../utils.js");
var _utilsJsDefault = parcelHelpers.interopDefault(_utilsJs);
'use strict';
const $internals = Symbol('internals');
// `handlers` is public and may be replaced with a nullish value by user code;
// `clear()` has always tolerated that. Treat it as an empty stack rather than
// dereferencing it.
function countHandlers(handlers) {
    return handlers ? handlers.length : 0;
}
function trimHandlers(handlers) {
    if (!handlers) return;
    while(handlers.length && handlers[handlers.length - 1] === null)handlers.pop();
}
// Preserve the array-key coercion used before IDs were stored in a Map, without
// treating null, empty strings, or noncanonical numeric strings as ID zero.
function normalizeHandlerId(id) {
    if (typeof id === 'string' && id !== '' && String(Number(id)) === id) return Number(id);
    return id;
}
function syncHandlerEntries(manager, internals) {
    const handlers = manager.handlers;
    const length = countHandlers(handlers);
    if (handlers !== internals.handlersRef) {
        internals.handlersRef = handlers;
        internals.handlerEntries.clear();
    } else if (length !== internals.handlersLength) {
        if (!length) internals.handlerEntries.clear();
        else internals.handlerEntries.forEach(function removeStaleEntry(entry, id) {
            if (handlers[entry.index] !== entry.handler) internals.handlerEntries.delete(id);
        });
    }
    internals.handlersLength = length;
}
class InterceptorManager {
    constructor(){
        this.handlers = [];
        this[$internals] = {
            handlersRef: this.handlers,
            handlersLength: this.handlers.length,
            handlerEntries: new Map(),
            iterationDepth: 0,
            nextId: 0
        };
    }
    /**
   * Add a new interceptor to the stack
   *
   * @param {Function} fulfilled The function to handle `then` for a `Promise`
   * @param {Function} rejected The function to handle `reject` for a `Promise`
   * @param {Object} options The options for the interceptor, synchronous and runWhen
   *
   * @return {Number} An ID used to remove interceptor later
   */ use(fulfilled, rejected, options) {
        const handler = {
            fulfilled,
            rejected,
            synchronous: options ? options.synchronous : false,
            runWhen: options ? options.runWhen : null
        };
        const internals = this[$internals];
        if (this.handlers == null) this.handlers = [];
        syncHandlerEntries(this, internals);
        const id = internals.nextId++;
        this.handlers.push(handler);
        internals.handlerEntries.set(id, {
            handler,
            index: this.handlers.length - 1
        });
        internals.handlersLength = this.handlers.length;
        return id;
    }
    /**
   * Remove an interceptor from the stack
   *
   * @param {Number} id The ID that was returned by `use`
   *
   * @returns {void}
   */ eject(id) {
        const internals = this[$internals];
        syncHandlerEntries(this, internals);
        const handlerId = normalizeHandlerId(id);
        const entry = internals.handlerEntries.get(handlerId);
        if (entry) {
            internals.handlerEntries.delete(handlerId);
            // Ignore IDs invalidated by clear or direct replacement of handlers.
            if (this.handlers[entry.index] !== entry.handler) return;
            this.handlers[entry.index] = null;
            // Do not reuse an index while forEach is walking its length snapshot.
            if (!internals.iterationDepth) {
                trimHandlers(this.handlers);
                internals.handlersLength = this.handlers.length;
            }
        }
    }
    /**
   * Clear all interceptors from the stack
   *
   * @returns {void}
   */ clear() {
        if (this.handlers) {
            this.handlers = [];
            syncHandlerEntries(this, this[$internals]);
        }
    }
    /**
   * Iterate over all the registered interceptors
   *
   * This method is particularly useful for skipping over any
   * interceptors that may have become `null` calling `eject`.
   *
   * @param {Function} fn The function to call for each interceptor
   *
   * @returns {void}
   */ forEach(fn) {
        const internals = this[$internals];
        syncHandlerEntries(this, internals);
        internals.iterationDepth++;
        try {
            (0, _utilsJsDefault.default).forEach(this.handlers, function forEachHandler(h) {
                if (h !== null) fn(h);
            });
        } finally{
            if (!--internals.iterationDepth) {
                syncHandlerEntries(this, internals);
                trimHandlers(this.handlers);
                internals.handlersLength = countHandlers(this.handlers);
            }
        }
    }
}
exports.default = InterceptorManager;

},{"../utils.js":"jI6DP","@parcel/transformer-js/src/esmodule-helpers.js":"jnFvT"}],"1p0aT":[function(require,module,exports,__globalThis) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "default", ()=>dispatchRequest);
var _transformDataJs = require("./transformData.js");
var _transformDataJsDefault = parcelHelpers.interopDefault(_transformDataJs);
var _isCancelJs = require("../cancel/isCancel.js");
var _isCancelJsDefault = parcelHelpers.interopDefault(_isCancelJs);
var _indexJs = require("../defaults/index.js");
var _indexJsDefault = parcelHelpers.interopDefault(_indexJs);
var _canceledErrorJs = require("../cancel/CanceledError.js");
var _canceledErrorJsDefault = parcelHelpers.interopDefault(_canceledErrorJs);
var _axiosHeadersJs = require("../core/AxiosHeaders.js");
var _axiosHeadersJsDefault = parcelHelpers.interopDefault(_axiosHeadersJs);
var _adaptersJs = require("../adapters/adapters.js");
var _adaptersJsDefault = parcelHelpers.interopDefault(_adaptersJs);
var _utilsJs = require("../utils.js");
var _utilsJsDefault = parcelHelpers.interopDefault(_utilsJs);
'use strict';
/**
 * Throws a `CanceledError` if cancellation has been requested.
 *
 * @param {Object} config The config that is to be used for the request
 *
 * @returns {void}
 */ function throwIfCancellationRequested(config) {
    if (config.cancelToken) config.cancelToken.throwIfRequested();
    if (config.signal && config.signal.aborted) throw new (0, _canceledErrorJsDefault.default)(null, config);
}
/**
 * Milliseconds elapsed since `start`, floored at zero.
 *
 * Wall-clock, to match the rest of the codebase (speedometer, throttle,
 * AxiosTransformStream). A backwards clock adjustment mid-request would
 * otherwise produce a negative duration, so the result is clamped.
 *
 * @param {number} start Timestamp from `Date.now()`
 *
 * @returns {number} Non-negative elapsed milliseconds
 */ function elapsedSince(start) {
    return Math.max(0, Date.now() - start);
}
function dispatchRequest(_config) {
    // Interceptors may replace the merged config with an ordinary object. Flatten
    // it at the dispatch boundary so shared prototype members cannot become
    // request behavior, while preserving intentional template/class members.
    const config = (0, _utilsJsDefault.default).toSafeFlatObject(_config);
    throwIfCancellationRequested(config);
    config.headers = (0, _axiosHeadersJsDefault.default).from((0, _utilsJsDefault.default).getSafeProp(config, 'headers'));
    // Transform request data
    config.data = (0, _transformDataJsDefault.default).call(config, config.transformRequest);
    if ([
        'post',
        'put',
        'patch'
    ].indexOf(config.method) !== -1) config.headers.setContentType('application/x-www-form-urlencoded', false);
    const adapter = (0, _adaptersJsDefault.default).getAdapter(config.adapter || (0, _indexJsDefault.default).adapter, config);
    const start = Date.now();
    return adapter(config).then(function onAdapterResolution(response) {
        throwIfCancellationRequested(config);
        response.duration = elapsedSince(start);
        // Expose the current response on config so that transformResponse can
        // attach it to any AxiosError it throws (e.g. on JSON parse failure).
        // We clean it up afterwards to avoid polluting the config object.
        config.response = response;
        try {
            response.data = (0, _transformDataJsDefault.default).call(config, config.transformResponse, response);
        } finally{
            delete config.response;
        }
        response.headers = (0, _axiosHeadersJsDefault.default).from(response.headers);
        return response;
    }, function onAdapterRejection(reason) {
        if (!(0, _isCancelJsDefault.default)(reason)) {
            throwIfCancellationRequested(config);
            // Transform response data
            if (reason && reason.response) {
                reason.response.duration = elapsedSince(start);
                config.response = reason.response;
                try {
                    reason.response.data = (0, _transformDataJsDefault.default).call(config, config.transformResponse, reason.response);
                } finally{
                    delete config.response;
                }
                reason.response.headers = (0, _axiosHeadersJsDefault.default).from(reason.response.headers);
            }
        }
        return Promise.reject(reason);
    });
}

},{"./transformData.js":"8ANo1","../cancel/isCancel.js":"fkTUi","../defaults/index.js":"9WXKx","../cancel/CanceledError.js":"9yG1c","../core/AxiosHeaders.js":"9EzTj","../adapters/adapters.js":"hI0HS","../utils.js":"jI6DP","@parcel/transformer-js/src/esmodule-helpers.js":"jnFvT"}],"8ANo1":[function(require,module,exports,__globalThis) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "default", ()=>transformData);
var _utilsJs = require("../utils.js");
var _utilsJsDefault = parcelHelpers.interopDefault(_utilsJs);
var _indexJs = require("../defaults/index.js");
var _indexJsDefault = parcelHelpers.interopDefault(_indexJs);
var _axiosHeadersJs = require("../core/AxiosHeaders.js");
var _axiosHeadersJsDefault = parcelHelpers.interopDefault(_axiosHeadersJs);
'use strict';
function transformData(fns, response) {
    const config = this || (0, _indexJsDefault.default);
    const context = response || config;
    const headers = (0, _axiosHeadersJsDefault.default).from(context.headers);
    let data = context.data;
    (0, _utilsJsDefault.default).forEach(fns, function transform(fn) {
        data = fn.call(config, data, headers.normalize(), response ? response.status : undefined);
    });
    headers.normalize();
    return data;
}

},{"../utils.js":"jI6DP","../defaults/index.js":"9WXKx","../core/AxiosHeaders.js":"9EzTj","@parcel/transformer-js/src/esmodule-helpers.js":"jnFvT"}],"9WXKx":[function(require,module,exports,__globalThis) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
var _utilsJs = require("../utils.js");
var _utilsJsDefault = parcelHelpers.interopDefault(_utilsJs);
var _axiosErrorJs = require("../core/AxiosError.js");
var _axiosErrorJsDefault = parcelHelpers.interopDefault(_axiosErrorJs);
var _transitionalJs = require("./transitional.js");
var _transitionalJsDefault = parcelHelpers.interopDefault(_transitionalJs);
var _toFormDataJs = require("../helpers/toFormData.js");
var _toFormDataJsDefault = parcelHelpers.interopDefault(_toFormDataJs);
var _toURLEncodedFormJs = require("../helpers/toURLEncodedForm.js");
var _toURLEncodedFormJsDefault = parcelHelpers.interopDefault(_toURLEncodedFormJs);
var _indexJs = require("../platform/index.js");
var _indexJsDefault = parcelHelpers.interopDefault(_indexJs);
var _formDataToJSONJs = require("../helpers/formDataToJSON.js");
var _formDataToJSONJsDefault = parcelHelpers.interopDefault(_formDataToJSONJs);
var _methodListJs = require("../core/methodList.js");
var _methodListJsDefault = parcelHelpers.interopDefault(_methodListJs);
'use strict';
const own = (obj, key)=>obj != null && (0, _utilsJsDefault.default).hasOwnProp(obj, key) ? obj[key] : undefined;
/**
 * It takes a string, tries to parse it, and if it fails, it returns the stringified version
 * of the input
 *
 * @param {any} rawValue - The value to be stringified.
 * @param {Function} parser - A function that parses a string into a JavaScript object.
 * @param {Function} encoder - A function that takes a value and returns a string.
 *
 * @returns {string} A stringified version of the rawValue.
 */ function stringifySafely(rawValue, parser, encoder) {
    if ((0, _utilsJsDefault.default).isString(rawValue)) try {
        (parser || JSON.parse)(rawValue);
        return (0, _utilsJsDefault.default).trim(rawValue);
    } catch (e) {
        if (e.name !== 'SyntaxError') throw e;
    }
    return (encoder || JSON.stringify)(rawValue);
}
const defaults = {
    transitional: (0, _transitionalJsDefault.default),
    adapter: [
        'xhr',
        'http',
        'fetch'
    ],
    transformRequest: [
        function transformRequest(data, headers) {
            const contentType = headers.getContentType() || '';
            const hasJSONContentType = contentType.indexOf('application/json') > -1;
            const isObjectPayload = (0, _utilsJsDefault.default).isObject(data);
            if (isObjectPayload && (0, _utilsJsDefault.default).isHTMLForm(data)) data = new FormData(data);
            const isFormData = (0, _utilsJsDefault.default).isFormData(data);
            if (isFormData) return hasJSONContentType ? JSON.stringify((0, _formDataToJSONJsDefault.default)(data)) : data;
            if ((0, _utilsJsDefault.default).isArrayBuffer(data) || (0, _utilsJsDefault.default).isBuffer(data) || (0, _utilsJsDefault.default).isStream(data) || (0, _utilsJsDefault.default).isFile(data) || (0, _utilsJsDefault.default).isBlob(data) || (0, _utilsJsDefault.default).isReadableStream(data)) return data;
            if ((0, _utilsJsDefault.default).isArrayBufferView(data)) return data.buffer;
            if ((0, _utilsJsDefault.default).isURLSearchParams(data)) {
                headers.setContentType('application/x-www-form-urlencoded;charset=utf-8', false);
                return data.toString();
            }
            let isFileList;
            if (isObjectPayload) {
                const formSerializer = own(this, 'formSerializer');
                if (contentType.indexOf('application/x-www-form-urlencoded') > -1) return (0, _toURLEncodedFormJsDefault.default)(data, formSerializer).toString();
                if ((isFileList = (0, _utilsJsDefault.default).isFileList(data)) || contentType.indexOf('multipart/form-data') > -1) {
                    const env = own(this, 'env');
                    const _FormData = env && env.FormData;
                    return (0, _toFormDataJsDefault.default)(isFileList ? {
                        'files[]': data
                    } : data, _FormData && new _FormData(), formSerializer);
                }
            }
            if (isObjectPayload || hasJSONContentType) {
                headers.setContentType('application/json', false);
                return stringifySafely(data);
            }
            return data;
        }
    ],
    transformResponse: [
        function transformResponse(data) {
            const transitional = own(this, 'transitional') || defaults.transitional;
            const forcedJSONParsing = transitional && transitional.forcedJSONParsing;
            const responseType = own(this, 'responseType');
            const JSONRequested = responseType === 'json';
            if ((0, _utilsJsDefault.default).isResponse(data) || (0, _utilsJsDefault.default).isReadableStream(data)) return data;
            if (data && (0, _utilsJsDefault.default).isString(data) && (forcedJSONParsing && !responseType || JSONRequested)) {
                const silentJSONParsing = transitional && transitional.silentJSONParsing;
                const strictJSONParsing = !silentJSONParsing && JSONRequested;
                try {
                    return JSON.parse(data, own(this, 'parseReviver'));
                } catch (e) {
                    if (strictJSONParsing) {
                        if (e.name === 'SyntaxError') throw (0, _axiosErrorJsDefault.default).from(e, (0, _axiosErrorJsDefault.default).ERR_BAD_RESPONSE, this, null, own(this, 'response'));
                        throw e;
                    }
                }
            }
            return data;
        }
    ],
    /**
   * A timeout in milliseconds to abort a request. If set to 0 (default) a
   * timeout is not created.
   */ timeout: 0,
    xsrfCookieName: 'XSRF-TOKEN',
    xsrfHeaderName: 'X-XSRF-TOKEN',
    maxContentLength: -1,
    maxBodyLength: -1,
    env: {
        FormData: (0, _indexJsDefault.default).classes.FormData,
        Blob: (0, _indexJsDefault.default).classes.Blob
    },
    validateStatus: function validateStatus(status) {
        return status >= 200 && status < 300;
    },
    headers: {
        common: {
            Accept: 'application/json, text/plain, */*',
            'Content-Type': undefined
        }
    }
};
(0, _utilsJsDefault.default).forEach((0, _methodListJsDefault.default), (method)=>{
    defaults.headers[method] = {};
});
exports.default = defaults;

},{"../utils.js":"jI6DP","../core/AxiosError.js":"7z85x","./transitional.js":"cKdyU","../helpers/toFormData.js":"2RXm4","../helpers/toURLEncodedForm.js":"keaer","../platform/index.js":"626Zd","../helpers/formDataToJSON.js":"fefHq","../core/methodList.js":"c1k6n","@parcel/transformer-js/src/esmodule-helpers.js":"jnFvT"}],"cKdyU":[function(require,module,exports,__globalThis) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
'use strict';
exports.default = {
    silentJSONParsing: true,
    forcedJSONParsing: true,
    clarifyTimeoutError: false,
    legacyInterceptorReqResOrdering: true,
    advertiseZstdAcceptEncoding: false,
    validateStatusUndefinedResolves: true,
    encodeBasicAuthUsername: false
};

},{"@parcel/transformer-js/src/esmodule-helpers.js":"jnFvT"}],"keaer":[function(require,module,exports,__globalThis) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "default", ()=>toURLEncodedForm);
var _utilsJs = require("../utils.js");
var _utilsJsDefault = parcelHelpers.interopDefault(_utilsJs);
var _toFormDataJs = require("./toFormData.js");
var _toFormDataJsDefault = parcelHelpers.interopDefault(_toFormDataJs);
var _indexJs = require("../platform/index.js");
var _indexJsDefault = parcelHelpers.interopDefault(_indexJs);
'use strict';
function toURLEncodedForm(data, options) {
    return (0, _toFormDataJsDefault.default)(data, new (0, _indexJsDefault.default).classes.URLSearchParams(), {
        visitor: function(value, key, path, helpers) {
            if ((0, _indexJsDefault.default).isNode && (0, _utilsJsDefault.default).isBuffer(value)) {
                this.append(key, value.toString('base64'));
                return false;
            }
            return helpers.defaultVisitor.apply(this, arguments);
        },
        ...options
    });
}

},{"../utils.js":"jI6DP","./toFormData.js":"2RXm4","../platform/index.js":"626Zd","@parcel/transformer-js/src/esmodule-helpers.js":"jnFvT"}],"626Zd":[function(require,module,exports,__globalThis) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
var _indexJs = require("./node/index.js");
var _indexJsDefault = parcelHelpers.interopDefault(_indexJs);
var _utilsJs = require("./common/utils.js");
exports.default = {
    ..._utilsJs,
    ...(0, _indexJsDefault.default)
};

},{"./node/index.js":"1TZsR","./common/utils.js":"3Z7Gl","@parcel/transformer-js/src/esmodule-helpers.js":"jnFvT"}],"1TZsR":[function(require,module,exports,__globalThis) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
var _urlsearchParamsJs = require("./classes/URLSearchParams.js");
var _urlsearchParamsJsDefault = parcelHelpers.interopDefault(_urlsearchParamsJs);
var _formDataJs = require("./classes/FormData.js");
var _formDataJsDefault = parcelHelpers.interopDefault(_formDataJs);
var _blobJs = require("./classes/Blob.js");
var _blobJsDefault = parcelHelpers.interopDefault(_blobJs);
exports.default = {
    isBrowser: true,
    classes: {
        URLSearchParams: (0, _urlsearchParamsJsDefault.default),
        FormData: (0, _formDataJsDefault.default),
        Blob: (0, _blobJsDefault.default)
    },
    protocols: [
        'http',
        'https',
        'file',
        'blob',
        'url',
        'data'
    ]
};

},{"./classes/URLSearchParams.js":"6cHm6","./classes/FormData.js":"7ag3a","./classes/Blob.js":"hRvHl","@parcel/transformer-js/src/esmodule-helpers.js":"jnFvT"}],"6cHm6":[function(require,module,exports,__globalThis) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
var _axiosURLSearchParamsJs = require("../../../helpers/AxiosURLSearchParams.js");
var _axiosURLSearchParamsJsDefault = parcelHelpers.interopDefault(_axiosURLSearchParamsJs);
'use strict';
exports.default = typeof URLSearchParams !== 'undefined' ? URLSearchParams : (0, _axiosURLSearchParamsJsDefault.default);

},{"../../../helpers/AxiosURLSearchParams.js":"i7MZs","@parcel/transformer-js/src/esmodule-helpers.js":"jnFvT"}],"7ag3a":[function(require,module,exports,__globalThis) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
'use strict';
exports.default = typeof FormData !== 'undefined' ? FormData : null;

},{"@parcel/transformer-js/src/esmodule-helpers.js":"jnFvT"}],"hRvHl":[function(require,module,exports,__globalThis) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
'use strict';
exports.default = typeof Blob !== 'undefined' ? Blob : null;

},{"@parcel/transformer-js/src/esmodule-helpers.js":"jnFvT"}],"3Z7Gl":[function(require,module,exports,__globalThis) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "hasBrowserEnv", ()=>hasBrowserEnv);
parcelHelpers.export(exports, "hasStandardBrowserWebWorkerEnv", ()=>hasStandardBrowserWebWorkerEnv);
parcelHelpers.export(exports, "hasStandardBrowserEnv", ()=>hasStandardBrowserEnv);
parcelHelpers.export(exports, "navigator", ()=>_navigator);
parcelHelpers.export(exports, "origin", ()=>origin);
const hasBrowserEnv = typeof window !== 'undefined' && typeof document !== 'undefined';
const _navigator = typeof navigator === 'object' && navigator || undefined;
/**
 * Determine if we're running in a standard browser environment
 *
 * This allows axios to run in a web worker, and react-native.
 * Both environments support XMLHttpRequest, but not fully standard globals.
 *
 * web workers:
 *  typeof window -> undefined
 *  typeof document -> undefined
 *
 * react-native:
 *  navigator.product -> 'ReactNative'
 * nativescript
 *  navigator.product -> 'NativeScript' or 'NS'
 *
 * @returns {boolean}
 */ const hasStandardBrowserEnv = hasBrowserEnv && (!_navigator || [
    'ReactNative',
    'NativeScript',
    'NS'
].indexOf(_navigator.product) < 0);
/**
 * Determine if we're running in a standard browser webWorker environment
 *
 * Although the `isStandardBrowserEnv` method indicates that
 * `allows axios to run in a web worker`, the WebWorker will still be
 * filtered out due to its judgment standard
 * `typeof window !== 'undefined' && typeof document !== 'undefined'`.
 * This leads to a problem when axios post `FormData` in webWorker
 */ const hasStandardBrowserWebWorkerEnv = (()=>{
    return typeof WorkerGlobalScope !== 'undefined' && // eslint-disable-next-line no-undef
    self instanceof WorkerGlobalScope && typeof self.importScripts === 'function';
})();
const origin = hasBrowserEnv && window.location.href || 'http://localhost';

},{"@parcel/transformer-js/src/esmodule-helpers.js":"jnFvT"}],"fefHq":[function(require,module,exports,__globalThis) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
var _utilsJs = require("../utils.js");
var _utilsJsDefault = parcelHelpers.interopDefault(_utilsJs);
var _axiosErrorJs = require("../core/AxiosError.js");
var _axiosErrorJsDefault = parcelHelpers.interopDefault(_axiosErrorJs);
var _toFormDataJs = require("./toFormData.js");
'use strict';
const MAX_DEPTH = (0, _toFormDataJs.DEFAULT_FORM_DATA_MAX_DEPTH);
function throwIfDepthExceeded(index) {
    if (index > MAX_DEPTH) throw new (0, _axiosErrorJsDefault.default)('FormData field is too deeply nested (' + index + ' levels). Max depth: ' + MAX_DEPTH, (0, _axiosErrorJsDefault.default).ERR_FORM_DATA_DEPTH_EXCEEDED);
}
/**
 * It takes a string like `foo[x][y][z]` and returns an array like `['foo', 'x', 'y', 'z']
 *
 * @param {string} name - The name of the property to get.
 *
 * @returns An array of strings.
 */ function parsePropPath(name) {
    // foo[x][y][z] -> ['foo', 'x', 'y', 'z']
    // foo.x.y.z    -> ['foo', 'x', 'y', 'z']
    // A path is split on `.` and on `[...]` groups. A segment — whether written
    // in dot notation or captured inside brackets — may contain any character
    // except `.`, `[` and `]`, so a key like `user-name` or `user name` is kept
    // literal instead of being split (#5402). `.`, `[` and `]` keep their existing
    // meaning, e.g. `foo[bar.baz]` -> ['foo', 'bar', 'baz'] and `[]` is an array push.
    // Excluding `[` from the bracket group also makes the match fail fast at the
    // next `[`, so a malformed name cannot rescan to the end of the string from
    // every unmatched `[` — parsing stays linear in the length of the name.
    const path = [];
    const pattern = /[^.[\]]+|\[([^.[\]]*)]/g;
    let match;
    while((match = pattern.exec(name)) !== null){
        throwIfDepthExceeded(path.length);
        path.push(match[0] === '[]' ? '' : match[1] || match[0]);
    }
    return path;
}
/**
 * Convert an array to an object.
 *
 * @param {Array<any>} arr - The array to convert to an object.
 *
 * @returns An object with the same keys and values as the array.
 */ function arrayToObject(arr) {
    const obj = {};
    const keys = Object.keys(arr);
    let i;
    const len = keys.length;
    let key;
    for(i = 0; i < len; i++){
        key = keys[i];
        obj[key] = arr[key];
    }
    return obj;
}
function normalizeArray(value) {
    if (!(0, _utilsJsDefault.default).isArray(value)) return value;
    const keys = Object.keys(value);
    return keys.length !== value.length || keys.some((key, index)=>key !== String(index)) ? arrayToObject(value) : value;
}
function normalizeArrays(obj) {
    const pending = [
        obj
    ];
    while(pending.length){
        const target = pending.pop();
        Object.keys(target).forEach((key)=>{
            const value = target[key] = normalizeArray(target[key]);
            if ((0, _utilsJsDefault.default).isArray(value) || (0, _utilsJsDefault.default).isPlainObject(value)) pending.push(value);
        });
    }
    return obj;
}
/**
 * It takes a FormData object and returns a JavaScript object
 *
 * @param {string} formData The FormData object to convert to JSON.
 *
 * @returns {Object<string, any> | null} The converted object.
 */ function formDataToJSON(formData) {
    function buildPath(path, value, target, index) {
        throwIfDepthExceeded(index);
        let name = path[index++];
        if (name === '__proto__') return true;
        const isNumericKey = Number.isFinite(+name);
        const isLast = index >= path.length;
        name = !name && (0, _utilsJsDefault.default).isArray(target) ? target.length : name;
        if (isLast) {
            if ((0, _utilsJsDefault.default).hasOwnProp(target, name)) {
                target[name] = normalizeArray(target[name]);
                target[name] = (0, _utilsJsDefault.default).isArray(target[name]) ? target[name].concat(value) : [
                    target[name],
                    value
                ];
            } else target[name] = value;
            return !isNumericKey;
        }
        if (!(0, _utilsJsDefault.default).hasOwnProp(target, name) || !(0, _utilsJsDefault.default).isObject(target[name])) target[name] = [];
        const result = buildPath(path, value, target[name], index);
        if (result && (0, _utilsJsDefault.default).isArray(target[name])) target[name] = arrayToObject(target[name]);
        return !isNumericKey;
    }
    if ((0, _utilsJsDefault.default).isFormData(formData) && (0, _utilsJsDefault.default).isFunction(formData.entries)) {
        const obj = {};
        (0, _utilsJsDefault.default).forEachEntry(formData, (name, value)=>{
            buildPath(parsePropPath(name), value, obj, 0);
        });
        return normalizeArrays(obj);
    }
    return null;
}
exports.default = formDataToJSON;

},{"../utils.js":"jI6DP","../core/AxiosError.js":"7z85x","./toFormData.js":"2RXm4","@parcel/transformer-js/src/esmodule-helpers.js":"jnFvT"}],"c1k6n":[function(require,module,exports,__globalThis) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
'use strict';
const methodList = Object.freeze([
    'get',
    'delete',
    'head',
    'options',
    'post',
    'put',
    'patch',
    'purge',
    'link',
    'unlink',
    'query'
]);
exports.default = methodList;

},{"@parcel/transformer-js/src/esmodule-helpers.js":"jnFvT"}],"fkTUi":[function(require,module,exports,__globalThis) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "default", ()=>isCancel);
'use strict';
function isCancel(value) {
    return !!(value && value.__CANCEL__);
}

},{"@parcel/transformer-js/src/esmodule-helpers.js":"jnFvT"}],"9yG1c":[function(require,module,exports,__globalThis) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
var _axiosErrorJs = require("../core/AxiosError.js");
var _axiosErrorJsDefault = parcelHelpers.interopDefault(_axiosErrorJs);
'use strict';
class CanceledError extends (0, _axiosErrorJsDefault.default) {
    /**
   * A `CanceledError` is an object that is thrown when an operation is canceled.
   *
   * @param {string=} message The message.
   * @param {Object=} config The config.
   * @param {Object=} request The request.
   *
   * @returns {CanceledError} The created error.
   */ constructor(message, config, request){
        super(message == null ? 'canceled' : message, (0, _axiosErrorJsDefault.default).ERR_CANCELED, config, request);
        this.name = 'CanceledError';
        this.__CANCEL__ = true;
    }
}
exports.default = CanceledError;

},{"../core/AxiosError.js":"7z85x","@parcel/transformer-js/src/esmodule-helpers.js":"jnFvT"}],"hI0HS":[function(require,module,exports,__globalThis) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
var _utilsJs = require("../utils.js");
var _utilsJsDefault = parcelHelpers.interopDefault(_utilsJs);
var _httpJs = require("./http.js");
var _httpJsDefault = parcelHelpers.interopDefault(_httpJs);
var _xhrJs = require("./xhr.js");
var _xhrJsDefault = parcelHelpers.interopDefault(_xhrJs);
var _fetchJs = require("./fetch.js");
var _axiosErrorJs = require("../core/AxiosError.js");
var _axiosErrorJsDefault = parcelHelpers.interopDefault(_axiosErrorJs);
/**
 * Known adapters mapping.
 * Provides environment-specific adapters for Axios:
 * - `http` for Node.js
 * - `xhr` for browsers
 * - `fetch` for fetch API-based requests
 *
 * @type {Object<string, Function|Object>}
 */ const knownAdapters = {
    http: (0, _httpJsDefault.default),
    xhr: (0, _xhrJsDefault.default),
    fetch: {
        get: _fetchJs.getFetch
    }
};
// Assign adapter names for easier debugging and identification
(0, _utilsJsDefault.default).forEach(knownAdapters, (fn, value)=>{
    if (fn) {
        try {
            // Null-proto descriptors so a polluted Object.prototype.get cannot turn
            // these data descriptors into accessor descriptors on the way in.
            Object.defineProperty(fn, 'name', {
                __proto__: null,
                value
            });
        } catch (e) {
        // eslint-disable-next-line no-empty
        }
        Object.defineProperty(fn, 'adapterName', {
            __proto__: null,
            value
        });
    }
});
/**
 * Render a rejection reason string for unknown or unsupported adapters
 *
 * @param {string} reason
 * @returns {string}
 */ const renderReason = (reason)=>`- ${reason}`;
/**
 * Check if the adapter is resolved (function, null, or false)
 *
 * @param {Function|null|false} adapter
 * @returns {boolean}
 */ const isResolvedHandle = (adapter)=>(0, _utilsJsDefault.default).isFunction(adapter) || adapter === null || adapter === false;
/**
 * Get the first suitable adapter from the provided list.
 * Tries each adapter in order until a supported one is found.
 * Throws an AxiosError if no adapter is suitable.
 *
 * @param {Array<string|Function>|string|Function} adapters - Adapter(s) by name or function.
 * @param {Object} config - Axios request configuration
 * @throws {AxiosError} If no suitable adapter is available
 * @returns {Function} The resolved adapter function
 */ function getAdapter(adapters, config) {
    adapters = (0, _utilsJsDefault.default).isArray(adapters) ? adapters : [
        adapters
    ];
    const { length } = adapters;
    let nameOrAdapter;
    let adapter;
    const rejectedReasons = {};
    for(let i = 0; i < length; i++){
        nameOrAdapter = adapters[i];
        let id;
        adapter = nameOrAdapter;
        if (!isResolvedHandle(nameOrAdapter)) {
            adapter = knownAdapters[(id = String(nameOrAdapter)).toLowerCase()];
            if (adapter === undefined) throw new (0, _axiosErrorJsDefault.default)(`Unknown adapter '${id}'`);
        }
        if (adapter && ((0, _utilsJsDefault.default).isFunction(adapter) || (adapter = adapter.get(config)))) break;
        rejectedReasons[id || '#' + i] = adapter;
    }
    if (!adapter) {
        const reasons = Object.entries(rejectedReasons).map(([id, state])=>`adapter ${id} ` + (state === false ? 'is not supported by the environment' : 'is not available in the build'));
        let s = length ? reasons.length > 1 ? 'since :\n' + reasons.map(renderReason).join('\n') : ' ' + renderReason(reasons[0]) : 'as no adapter specified';
        throw new (0, _axiosErrorJsDefault.default)(`There is no suitable adapter to dispatch the request ` + s, (0, _axiosErrorJsDefault.default).ERR_NOT_SUPPORT);
    }
    return adapter;
}
/**
 * Exports Axios adapters and utility to resolve an adapter
 */ exports.default = {
    /**
   * Resolve an adapter from a list of adapter names or functions.
   * @type {Function}
   */ getAdapter,
    /**
   * Exposes all known adapters
   * @type {Object<string, Function|Object>}
   */ adapters: knownAdapters
};

},{"../utils.js":"jI6DP","./http.js":"dVGJ4","./xhr.js":"ao6fA","./fetch.js":"d5PZl","../core/AxiosError.js":"7z85x","@parcel/transformer-js/src/esmodule-helpers.js":"jnFvT"}],"ao6fA":[function(require,module,exports,__globalThis) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
var _utilsJs = require("../utils.js");
var _utilsJsDefault = parcelHelpers.interopDefault(_utilsJs);
var _settleJs = require("../core/settle.js");
var _settleJsDefault = parcelHelpers.interopDefault(_settleJs);
var _transitionalJs = require("../defaults/transitional.js");
var _transitionalJsDefault = parcelHelpers.interopDefault(_transitionalJs);
var _axiosErrorJs = require("../core/AxiosError.js");
var _axiosErrorJsDefault = parcelHelpers.interopDefault(_axiosErrorJs);
var _canceledErrorJs = require("../cancel/CanceledError.js");
var _canceledErrorJsDefault = parcelHelpers.interopDefault(_canceledErrorJs);
var _normalizeURLForProtocolCheckJs = require("../helpers/normalizeURLForProtocolCheck.js");
var _normalizeURLForProtocolCheckJsDefault = parcelHelpers.interopDefault(_normalizeURLForProtocolCheckJs);
var _parseProtocolJs = require("../helpers/parseProtocol.js");
var _parseProtocolJsDefault = parcelHelpers.interopDefault(_parseProtocolJs);
var _indexJs = require("../platform/index.js");
var _indexJsDefault = parcelHelpers.interopDefault(_indexJs);
var _axiosHeadersJs = require("../core/AxiosHeaders.js");
var _axiosHeadersJsDefault = parcelHelpers.interopDefault(_axiosHeadersJs);
var _cookiesJs = require("../helpers/cookies.js");
var _cookiesJsDefault = parcelHelpers.interopDefault(_cookiesJs);
var _progressEventReducerJs = require("../helpers/progressEventReducer.js");
var _resolveConfigJs = require("../helpers/resolveConfig.js");
var _resolveConfigJsDefault = parcelHelpers.interopDefault(_resolveConfigJs);
var _sanitizeHeaderValueJs = require("../helpers/sanitizeHeaderValue.js");
const isXHRAdapterSupported = typeof XMLHttpRequest !== 'undefined';
exports.default = isXHRAdapterSupported && function(config) {
    return new Promise(function dispatchXhrRequest(resolve, reject) {
        let useAsyncXsrf;
        try {
            const store = (0, _indexJsDefault.default).hasStandardBrowserEnv && typeof window !== 'undefined' && window.cookieStore;
            useAsyncXsrf = store && (0, _utilsJsDefault.default).isFunction(store.get);
        } catch (e) {
        // A restricted Cookie Store getter must retain the synchronous fallback.
        }
        let xsrfCookieName;
        const _config = (0, _resolveConfigJsDefault.default)(config, useAsyncXsrf ? (name)=>{
            xsrfCookieName = name;
            return null;
        } : undefined);
        let requestData = _config.data;
        const requestHeaders = (0, _axiosHeadersJsDefault.default).from(_config.headers).normalize();
        let { responseType, onUploadProgress, onDownloadProgress } = _config;
        let onCanceled;
        let timeoutId;
        let uploadThrottled, downloadThrottled;
        let flushUpload, flushDownload, flushDownloadWithEvent;
        function done() {
            clearTimeout(timeoutId);
            // A final progress callback must not prevent the remaining cleanup.
            // Report errors asynchronously, as onloadend and the throttle timer do.
            try {
                flushUpload && flushUpload(); // flush events
            } catch (err) {
                setTimeout(()=>{
                    throw err;
                });
            }
            try {
                flushDownload && flushDownload(); // flush events
            } catch (err) {
                setTimeout(()=>{
                    throw err;
                });
            }
            // A flush can synchronously cancel the request and reenter done().
            // In that case the inner call has already detached these listeners.
            if (request) {
                downloadThrottled && request.removeEventListener('progress', downloadThrottled);
                if (request.upload) {
                    uploadThrottled && request.upload.removeEventListener('progress', uploadThrottled);
                    flushUpload && request.upload.removeEventListener('loadend', flushUpload);
                }
            }
            _config.cancelToken && _config.cancelToken.unsubscribe(onCanceled);
            _config.signal && _config.signal.removeEventListener('abort', onCanceled);
        }
        let request = new XMLHttpRequest();
        request.open(_config.method.toUpperCase(), _config.url, true);
        // Set the request timeout in MS
        request.timeout = _config.timeout;
        function onloadend(event) {
            if (!request) return;
            // Status 0 means no response was received, which onerror and onabort normally
            // reject before this runs. Firefox 152 fires only readystatechange and loadend for
            // navigation-canceled requests (https://bugzilla.mozilla.org/show_bug.cgi?id=1505389),
            // leaving settle() to resolve them as an empty success. ECONNABORTED is the error
            // onabort raised on Firefox 151. Reads over file:, which some environments report as
            // status 0 on success, are excluded by the request URL's scheme after browser-style
            // preprocessing, by the page origin's scheme for relative URLs (which inherit it), or
            // by responseURL where implemented.
            if (request.status === 0 && ((0, _parseProtocolJsDefault.default)((0, _normalizeURLForProtocolCheckJsDefault.default)(_config.url)) || (0, _parseProtocolJsDefault.default)((0, _indexJsDefault.default).origin)) !== 'file' && !(request.responseURL && request.responseURL.startsWith('file:'))) {
                reject(new (0, _axiosErrorJsDefault.default)('Request aborted', (0, _axiosErrorJsDefault.default).ECONNABORTED, config, request));
                done();
                // Clean up request
                request = null;
                return;
            }
            // When loadend is still dispatching, flushing with it gives progress
            // listeners a final delivery whose event has a live target. The legacy
            // ready-state fallback has no event, so replay its pending progress.
            // A throwing listener must not block settlement; rethrow asynchronously,
            // matching how listener errors surface on the throttle timer path.
            try {
                if (event) flushDownloadWithEvent && flushDownloadWithEvent(event);
                else flushDownload && flushDownload();
            } catch (err) {
                setTimeout(()=>{
                    throw err;
                });
            }
            // A final progress callback can cancel the request synchronously.
            if (!request) return;
            // Prepare the response
            const responseHeaders = (0, _axiosHeadersJsDefault.default).from('getAllResponseHeaders' in request && request.getAllResponseHeaders());
            const responseData = !responseType || responseType === 'text' || responseType === 'json' ? request.responseText : request.response;
            const response = {
                data: responseData,
                status: request.status,
                statusText: request.statusText,
                headers: responseHeaders,
                config,
                request
            };
            (0, _settleJsDefault.default)(function _resolve(value) {
                resolve(value);
                done();
            }, function _reject(err) {
                reject(err);
                done();
            }, response);
            // Clean up request
            request = null;
        }
        if ('onloadend' in request) // Use onloadend if available
        request.onloadend = onloadend;
        else // Listen for ready state to emulate onloadend
        request.onreadystatechange = function handleLoad() {
            if (!request || request.readyState !== 4) return;
            // The request errored out and we didn't get a response, this will be
            // handled by onerror instead
            // With one exception: request that using file: protocol, most browsers
            // will return status as 0 even though it's a successful request
            if (request.status === 0 && !(request.responseURL && request.responseURL.startsWith('file:'))) return;
            // readystate handler is calling before onerror or ontimeout handlers,
            // so we should call onloadend on the next 'tick'
            setTimeout(onloadend);
        };
        // Handle browser request cancellation (as opposed to a manual cancellation)
        request.onabort = function handleAbort() {
            if (!request) return;
            reject(new (0, _axiosErrorJsDefault.default)('Request aborted', (0, _axiosErrorJsDefault.default).ECONNABORTED, config, request));
            done();
            // Clean up request
            request = null;
        };
        // Handle low level network errors
        request.onerror = function handleError(event) {
            // Browsers deliver a ProgressEvent in XHR onerror
            // (message may be empty; when present, surface it)
            // See https://developer.mozilla.org/docs/Web/API/XMLHttpRequest/error_event
            const msg = event && event.message ? event.message : 'Network Error';
            const err = new (0, _axiosErrorJsDefault.default)(msg, (0, _axiosErrorJsDefault.default).ERR_NETWORK, config, request);
            // attach the underlying event for consumers who want details
            err.event = event || null;
            reject(err);
            done();
            request = null;
        };
        // Handle timeout
        request.ontimeout = function handleTimeout() {
            if (!request) return;
            let timeoutErrorMessage = _config.timeout ? 'timeout of ' + _config.timeout + 'ms exceeded' : 'timeout exceeded';
            const transitional = _config.transitional || (0, _transitionalJsDefault.default);
            if (_config.timeoutErrorMessage) timeoutErrorMessage = _config.timeoutErrorMessage;
            reject(new (0, _axiosErrorJsDefault.default)(timeoutErrorMessage, transitional.clarifyTimeoutError ? (0, _axiosErrorJsDefault.default).ETIMEDOUT : (0, _axiosErrorJsDefault.default).ECONNABORTED, config, request));
            done();
            // Clean up request
            request = null;
        };
        // Remove Content-Type if data is undefined
        requestData === undefined && requestHeaders.setContentType(null);
        // Add withCredentials to request if needed
        if (!(0, _utilsJsDefault.default).isUndefined(_config.withCredentials)) request.withCredentials = !!_config.withCredentials;
        // Add responseType to request if needed
        if (responseType && responseType !== 'json') request.responseType = _config.responseType;
        // Handle progress if needed
        if (onDownloadProgress) {
            [downloadThrottled, flushDownload, flushDownloadWithEvent] = (0, _progressEventReducerJs.progressEventReducer)(onDownloadProgress, true);
            request.addEventListener('progress', downloadThrottled);
        }
        // Not all browsers support upload events
        if (onUploadProgress && request.upload) {
            [uploadThrottled, flushUpload] = (0, _progressEventReducerJs.progressEventReducer)(onUploadProgress);
            request.upload.addEventListener('progress', uploadThrottled);
            request.upload.addEventListener('loadend', flushUpload);
        }
        if (_config.cancelToken || _config.signal) {
            // Handle cancellation
            // eslint-disable-next-line func-names
            onCanceled = (cancel)=>{
                if (!request) return;
                reject(!cancel || cancel.type ? new (0, _canceledErrorJsDefault.default)(null, config, request) : cancel);
                const xhr = request;
                done();
                request = null;
                xhr.abort();
            };
            _config.cancelToken && _config.cancelToken.subscribe(onCanceled);
            if (!request) return;
            if (_config.signal) _config.signal.aborted ? onCanceled() : _config.signal.addEventListener('abort', onCanceled);
        }
        if (!request) return;
        const protocol = (0, _parseProtocolJsDefault.default)(_config.url);
        if (protocol && !(0, _indexJsDefault.default).protocols.includes(protocol)) {
            reject(new (0, _axiosErrorJsDefault.default)('Unsupported protocol ' + protocol + ':', (0, _axiosErrorJsDefault.default).ERR_BAD_REQUEST, config));
            done();
            return;
        }
        const sendRequest = ()=>{
            if (!request) return;
            // Apply headers after an asynchronous XSRF read so existing headers are
            // replaced through AxiosHeaders rather than appended by the native XHR.
            if ('setRequestHeader' in request) (0, _utilsJsDefault.default).forEach((0, _sanitizeHeaderValueJs.toByteStringHeaderObject)(requestHeaders), function setRequestHeader(val, key) {
                request.setRequestHeader(key, val);
            });
            request.send(requestData || null);
        };
        if (xsrfCookieName) {
            // Native XHR timeout starts at send(). Cover cookie preparation and the
            // subsequent request with the same budget and existing timeout handler.
            const now = typeof performance !== 'undefined' && (0, _utilsJsDefault.default).isFunction(performance.now) ? ()=>performance.now() : Date.now;
            const deadline = request.timeout > 0 ? now() + Number(request.timeout) : undefined;
            const abortOnTimeout = ()=>{
                if (!request) return;
                const xhr = request;
                xhr.ontimeout();
                xhr.abort();
            };
            if (deadline !== undefined) {
                const scheduleTimeout = ()=>{
                    const remaining = deadline - now();
                    if (remaining > 0) // Browser timers overflow above the signed 32-bit delay limit.
                    timeoutId = setTimeout(scheduleTimeout, Math.min(remaining, 0x7fffffff));
                    else abortOnTimeout();
                };
                scheduleTimeout();
            }
            (0, _cookiesJsDefault.default).readAsync(xsrfCookieName).then((value)=>{
                if (!request) return;
                // Promise callbacks may run before an overdue timer after a busy task.
                if (deadline !== undefined && now() >= deadline) {
                    abortOnTimeout();
                    return;
                }
                if (value) {
                    const headerName = (0, _utilsJsDefault.default).hasOwnProp(_config, 'xsrfHeaderName') && _config.xsrfHeaderName;
                    requestHeaders.set(headerName, value);
                }
                sendRequest();
            }).catch((error)=>{
                if (!request) return;
                reject((0, _axiosErrorJsDefault.default).from(error, null, config, request));
                done();
                request = null;
            });
        } else sendRequest();
    });
};

},{"../utils.js":"jI6DP","../core/settle.js":"2vmJg","../defaults/transitional.js":"cKdyU","../core/AxiosError.js":"7z85x","../cancel/CanceledError.js":"9yG1c","../helpers/normalizeURLForProtocolCheck.js":"1IRer","../helpers/parseProtocol.js":"af3D4","../platform/index.js":"626Zd","../core/AxiosHeaders.js":"9EzTj","../helpers/cookies.js":"hoVvn","../helpers/progressEventReducer.js":"6rzPu","../helpers/resolveConfig.js":"3RDMa","../helpers/sanitizeHeaderValue.js":"hgIfL","@parcel/transformer-js/src/esmodule-helpers.js":"jnFvT"}],"2vmJg":[function(require,module,exports,__globalThis) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "default", ()=>settle);
var _axiosErrorJs = require("./AxiosError.js");
var _axiosErrorJsDefault = parcelHelpers.interopDefault(_axiosErrorJs);
'use strict';
function settle(resolve, reject, response) {
    const validateStatus = response.config.validateStatus;
    if (!response.status || !validateStatus || validateStatus(response.status)) resolve(response);
    else reject(new (0, _axiosErrorJsDefault.default)('Request failed with status code ' + response.status, response.status >= 400 && response.status < 500 ? (0, _axiosErrorJsDefault.default).ERR_BAD_REQUEST : (0, _axiosErrorJsDefault.default).ERR_BAD_RESPONSE, response.config, response.request, response));
}

},{"./AxiosError.js":"7z85x","@parcel/transformer-js/src/esmodule-helpers.js":"jnFvT"}],"1IRer":[function(require,module,exports,__globalThis) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "default", ()=>normalizeURLForProtocolCheck);
'use strict';
const urlParserControlCharacters = /[\t\n\r]/g;
function normalizeURLForProtocolCheck(url) {
    if (typeof url !== 'string') return url;
    let start = 0;
    while(start < url.length && url.charCodeAt(start) <= 0x20)start++;
    return url.slice(start).replace(urlParserControlCharacters, '');
}

},{"@parcel/transformer-js/src/esmodule-helpers.js":"jnFvT"}],"af3D4":[function(require,module,exports,__globalThis) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "default", ()=>parseProtocol);
'use strict';
function parseProtocol(url) {
    const match = /^([-+\w]{1,25}):(?:\/\/)?/.exec(url);
    return match && match[1].toLowerCase() || '';
}

},{"@parcel/transformer-js/src/esmodule-helpers.js":"jnFvT"}],"hoVvn":[function(require,module,exports,__globalThis) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
var _utilsJs = require("../utils.js");
var _utilsJsDefault = parcelHelpers.interopDefault(_utilsJs);
var _indexJs = require("../platform/index.js");
var _indexJsDefault = parcelHelpers.interopDefault(_indexJs);
const decodeCookieValue = (value)=>{
    try {
        return decodeURIComponent(value);
    } catch (e) {
        return value;
    }
};
exports.default = (0, _indexJsDefault.default).hasStandardBrowserEnv ? {
    write (name, value, expires, path, domain, secure, sameSite) {
        if (typeof document === 'undefined') return;
        const cookie = [
            `${name}=${encodeURIComponent(value)}`
        ];
        if ((0, _utilsJsDefault.default).isNumber(expires)) cookie.push(`expires=${new Date(expires).toUTCString()}`);
        if ((0, _utilsJsDefault.default).isString(path)) cookie.push(`path=${path}`);
        if ((0, _utilsJsDefault.default).isString(domain)) cookie.push(`domain=${domain}`);
        if (secure === true) cookie.push('secure');
        if ((0, _utilsJsDefault.default).isString(sameSite)) cookie.push(`SameSite=${sameSite}`);
        document.cookie = cookie.join('; ');
    },
    read (name) {
        if (typeof document === 'undefined') return null;
        const cookieString = document.cookie;
        if (!cookieString) return null;
        // Match name=value by splitting on the semicolon separator instead of building a
        // RegExp from `name` — interpolating an unescaped string into a RegExp would let
        // metacharacters (e.g. `.+?` in an attacker-influenced cookie name) cause ReDoS or
        // match the wrong cookie. Browsers may serialize cookie pairs as either ";" or
        // "; ", so ignore optional whitespace before each cookie name.
        const cookies = cookieString.split(';');
        for(let i = 0; i < cookies.length; i++){
            const cookie = cookies[i].replace(/^\s+/, '');
            const eq = cookie.indexOf('=');
            if (eq !== -1 && cookie.slice(0, eq) === name) return decodeCookieValue(cookie.slice(eq + 1));
        }
        return null;
    },
    async readAsync (name) {
        try {
            const store = typeof window !== 'undefined' && window.cookieStore;
            if (store && (0, _utilsJsDefault.default).isFunction(store.get)) {
                const cookie = await store.get(name);
                // Both APIs expose stored bytes; preserve Axios's existing URI decoding.
                return cookie ? decodeCookieValue(cookie.value) : null;
            }
        } catch (e) {
        // Restricted or unavailable storage retains the synchronous fallback.
        }
        return this.read(name);
    },
    remove (name) {
        this.write(name, '', Date.now() - 86400000, '/');
    }
} : {
    write () {},
    read () {
        return null;
    },
    async readAsync () {
        return null;
    },
    remove () {}
};

},{"../utils.js":"jI6DP","../platform/index.js":"626Zd","@parcel/transformer-js/src/esmodule-helpers.js":"jnFvT"}],"6rzPu":[function(require,module,exports,__globalThis) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "progressEventReducer", ()=>progressEventReducer);
parcelHelpers.export(exports, "progressEventDecorator", ()=>progressEventDecorator);
parcelHelpers.export(exports, "asyncDecorator", ()=>asyncDecorator);
var _speedometerJs = require("./speedometer.js");
var _speedometerJsDefault = parcelHelpers.interopDefault(_speedometerJs);
var _throttleJs = require("./throttle.js");
var _throttleJsDefault = parcelHelpers.interopDefault(_throttleJs);
var _utilsJs = require("../utils.js");
var _utilsJsDefault = parcelHelpers.interopDefault(_utilsJs);
const progressEventReducer = (listener, isDownloadStream, freq = 3)=>{
    let bytesNotified = 0;
    const _speedometer = (0, _speedometerJsDefault.default)(50, 250);
    return (0, _throttleJsDefault.default)((e)=>{
        if (!e || !(0, _utilsJsDefault.default).isNumber(e.loaded)) return;
        const rawLoaded = e.loaded;
        const total = e.lengthComputable ? e.total : undefined;
        const loaded = Math.max(0, total != null ? Math.min(rawLoaded, total) : rawLoaded);
        const progressBytes = Math.max(0, loaded - bytesNotified);
        const rate = _speedometer(progressBytes);
        bytesNotified = Math.max(bytesNotified, loaded);
        const data = {
            loaded,
            total,
            progress: total ? loaded / total : undefined,
            bytes: progressBytes,
            rate: rate ? rate : undefined,
            estimated: rate && total ? (total - loaded) / rate : undefined,
            event: e,
            lengthComputable: total != null,
            [isDownloadStream ? 'download' : 'upload']: true
        };
        listener(data);
    }, freq);
};
const progressEventDecorator = (total, throttled)=>{
    const lengthComputable = total != null;
    return [
        (loaded)=>throttled[0]({
                lengthComputable,
                total,
                loaded
            }),
        throttled[1]
    ];
};
const asyncDecorator = (fn, scheduler = (0, _utilsJsDefault.default).asap)=>(...args)=>scheduler(()=>fn(...args));

},{"./speedometer.js":"cCdi6","./throttle.js":"esfhP","../utils.js":"jI6DP","@parcel/transformer-js/src/esmodule-helpers.js":"jnFvT"}],"cCdi6":[function(require,module,exports,__globalThis) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
'use strict';
/**
 * Calculate data maxRate
 * @param {Number} [samplesCount= 10]
 * @param {Number} [min= 1000]
 * @returns {Function}
 */ function speedometer(samplesCount, min) {
    samplesCount = samplesCount || 10;
    const bytes = new Array(samplesCount);
    const timestamps = new Array(samplesCount);
    let head = 0;
    let tail = 0;
    let firstSampleTS;
    min = min !== undefined ? min : 1000;
    return function push(chunkLength) {
        const now = Date.now();
        const startedAt = timestamps[tail];
        if (!firstSampleTS) firstSampleTS = now;
        bytes[head] = chunkLength;
        timestamps[head] = now;
        let i = tail;
        let bytesCount = 0;
        while(i !== head){
            bytesCount += bytes[i++];
            i = i % samplesCount;
        }
        head = (head + 1) % samplesCount;
        if (head === tail) tail = (tail + 1) % samplesCount;
        if (now - firstSampleTS < min) return;
        const passed = startedAt && now - startedAt;
        return passed ? Math.round(bytesCount * 1000 / passed) : undefined;
    };
}
exports.default = speedometer;

},{"@parcel/transformer-js/src/esmodule-helpers.js":"jnFvT"}],"esfhP":[function(require,module,exports,__globalThis) {
/**
 * Throttle decorator
 * @param {Function} fn
 * @param {Number} freq
 * @return {Array<Function>}
 */ var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
function throttle(fn, freq) {
    let timestamp = 0;
    let threshold = 1000 / freq;
    let lastArgs;
    let timer;
    const invoke = (args, now = Date.now())=>{
        timestamp = now;
        lastArgs = null;
        if (timer) {
            clearTimeout(timer);
            timer = null;
        }
        fn(...args);
    };
    const throttled = (...args)=>{
        const now = Date.now();
        const passed = now - timestamp;
        if (passed >= threshold) invoke(args, now);
        else {
            lastArgs = args;
            if (!timer) timer = setTimeout(()=>{
                timer = null;
                invoke(lastArgs);
            }, threshold - passed);
        }
    };
    const flush = ()=>lastArgs && invoke(lastArgs);
    const flushWith = (...args)=>invoke(args);
    return [
        throttled,
        flush,
        flushWith
    ];
}
exports.default = throttle;

},{"@parcel/transformer-js/src/esmodule-helpers.js":"jnFvT"}],"3RDMa":[function(require,module,exports,__globalThis) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
var _indexJs = require("../platform/index.js");
var _indexJsDefault = parcelHelpers.interopDefault(_indexJs);
var _utilsJs = require("../utils.js");
var _utilsJsDefault = parcelHelpers.interopDefault(_utilsJs);
var _axiosErrorJs = require("../core/AxiosError.js");
var _axiosErrorJsDefault = parcelHelpers.interopDefault(_axiosErrorJs);
var _isURLSameOriginJs = require("./isURLSameOrigin.js");
var _isURLSameOriginJsDefault = parcelHelpers.interopDefault(_isURLSameOriginJs);
var _cookiesJs = require("./cookies.js");
var _cookiesJsDefault = parcelHelpers.interopDefault(_cookiesJs);
var _buildFullPathJs = require("../core/buildFullPath.js");
var _buildFullPathJsDefault = parcelHelpers.interopDefault(_buildFullPathJs);
var _mergeConfigJs = require("../core/mergeConfig.js");
var _mergeConfigJsDefault = parcelHelpers.interopDefault(_mergeConfigJs);
var _axiosHeadersJs = require("../core/AxiosHeaders.js");
var _axiosHeadersJsDefault = parcelHelpers.interopDefault(_axiosHeadersJs);
var _setFormDataHeadersJs = require("../core/setFormDataHeaders.js");
var _setFormDataHeadersJsDefault = parcelHelpers.interopDefault(_setFormDataHeadersJs);
var _buildURLJs = require("./buildURL.js");
var _buildURLJsDefault = parcelHelpers.interopDefault(_buildURLJs);
/**
 * Encode a UTF-8 string to a Latin-1 byte string for use with btoa().
 * This is a modern replacement for the deprecated unescape(encodeURIComponent(str)) pattern.
 *
 * @param {string} str The string to encode
 *
 * @returns {string} UTF-8 bytes as a Latin-1 string
 */ const encodeUTF8 = (str)=>encodeURIComponent(str).replace(/%([0-9A-F]{2})/gi, (_, hex)=>String.fromCharCode(parseInt(hex, 16)));
const readCookie = (name)=>(0, _cookiesJsDefault.default).read(name);
function resolveConfig(config, readXsrfCookie = readCookie) {
    const newConfig = (0, _mergeConfigJsDefault.default)({}, config);
    // Read only own properties to prevent prototype pollution gadgets
    // (e.g. Object.prototype.baseURL = 'https://evil.com').
    const own = (key)=>(0, _utilsJsDefault.default).hasOwnProp(newConfig, key) ? newConfig[key] : undefined;
    const data = own('data');
    let withXSRFToken = own('withXSRFToken');
    const xsrfHeaderName = own('xsrfHeaderName');
    const xsrfCookieName = own('xsrfCookieName');
    let headers = own('headers');
    const auth = own('auth');
    const baseURL = own('baseURL');
    const allowAbsoluteUrls = own('allowAbsoluteUrls');
    const url = own('url');
    newConfig.headers = headers = (0, _axiosHeadersJsDefault.default).from(headers);
    newConfig.url = (0, _buildURLJsDefault.default)((0, _buildFullPathJsDefault.default)(baseURL, url, allowAbsoluteUrls, newConfig), own('params'), own('paramsSerializer'));
    // HTTP basic authentication
    if (auth) {
        const username = (0, _utilsJsDefault.default).getSafeProp(auth, 'username') || '';
        const password = (0, _utilsJsDefault.default).getSafeProp(auth, 'password') || '';
        const transitional = own('transitional');
        const encodeUsername = transitional && (0, _utilsJsDefault.default).hasOwnProp(transitional, 'encodeBasicAuthUsername') && transitional.encodeBasicAuthUsername === true;
        try {
            headers.set('Authorization', // Preserve legacy username bytes unless the caller opts in to UTF-8.
            'Basic ' + btoa((encodeUsername ? encodeUTF8(username) : username) + ':' + (password ? encodeUTF8(password) : '')));
        } catch (e) {
            throw (0, _axiosErrorJsDefault.default).from(e, (0, _axiosErrorJsDefault.default).ERR_BAD_OPTION_VALUE, config);
        }
    }
    if ((0, _utilsJsDefault.default).isFormData(data)) {
        const getHeaders = (0, _utilsJsDefault.default).getSafeProp(data, 'getHeaders');
        if ((0, _indexJsDefault.default).hasStandardBrowserEnv || (0, _indexJsDefault.default).hasStandardBrowserWebWorkerEnv || (0, _utilsJsDefault.default).isReactNative(data)) headers.setContentType(undefined); // browser/web worker/RN handles it
        else if ((0, _utilsJsDefault.default).isFunction(getHeaders)) // Node.js FormData (like form-data package)
        (0, _setFormDataHeadersJsDefault.default)(headers, getHeaders.call(data), own('formDataHeaderPolicy'));
    }
    // Add xsrf header
    // This is only done if running in a standard browser environment.
    // Specifically not if we're in a web worker, or react-native.
    if ((0, _indexJsDefault.default).hasStandardBrowserEnv) {
        if ((0, _utilsJsDefault.default).isFunction(withXSRFToken)) withXSRFToken = withXSRFToken(newConfig);
        // Strict boolean check — prevents proto-pollution gadgets (e.g. Object.prototype.withXSRFToken = 1)
        // and misconfigurations (e.g. "false") from short-circuiting the same-origin check and leaking
        // the XSRF token cross-origin.
        const shouldSendXSRF = withXSRFToken === true || withXSRFToken == null && (0, _isURLSameOriginJsDefault.default)(newConfig.url);
        if (shouldSendXSRF) {
            const xsrfValue = xsrfHeaderName && xsrfCookieName && readXsrfCookie(xsrfCookieName);
            if (xsrfValue) headers.set(xsrfHeaderName, xsrfValue);
        }
    }
    return newConfig;
}
exports.default = resolveConfig;

},{"../platform/index.js":"626Zd","../utils.js":"jI6DP","../core/AxiosError.js":"7z85x","./isURLSameOrigin.js":"d9uxL","./cookies.js":"hoVvn","../core/buildFullPath.js":"kg0Bk","../core/mergeConfig.js":"311Mu","../core/AxiosHeaders.js":"9EzTj","../core/setFormDataHeaders.js":"h97qT","./buildURL.js":"3CNaw","@parcel/transformer-js/src/esmodule-helpers.js":"jnFvT"}],"d9uxL":[function(require,module,exports,__globalThis) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
var _indexJs = require("../platform/index.js");
var _indexJsDefault = parcelHelpers.interopDefault(_indexJs);
exports.default = (0, _indexJsDefault.default).hasStandardBrowserEnv ? ((origin)=>(url)=>{
        url = new URL(url, document.baseURI || (0, _indexJsDefault.default).origin);
        return origin.protocol === url.protocol && origin.host === url.host && origin.port === url.port;
    })(new URL((0, _indexJsDefault.default).origin)) : ()=>true;

},{"../platform/index.js":"626Zd","@parcel/transformer-js/src/esmodule-helpers.js":"jnFvT"}],"kg0Bk":[function(require,module,exports,__globalThis) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "default", ()=>buildFullPath);
var _axiosErrorJs = require("./AxiosError.js");
var _axiosErrorJsDefault = parcelHelpers.interopDefault(_axiosErrorJs);
var _isAbsoluteURLJs = require("../helpers/isAbsoluteURL.js");
var _isAbsoluteURLJsDefault = parcelHelpers.interopDefault(_isAbsoluteURLJs);
var _combineURLsJs = require("../helpers/combineURLs.js");
var _combineURLsJsDefault = parcelHelpers.interopDefault(_combineURLsJs);
var _normalizeURLForProtocolCheckJs = require("../helpers/normalizeURLForProtocolCheck.js");
var _normalizeURLForProtocolCheckJsDefault = parcelHelpers.interopDefault(_normalizeURLForProtocolCheckJs);
'use strict';
const malformedHttpProtocol = /^https?:(?!\/\/)/i;
// Redact the parts of a URL that can carry secrets before it is embedded in an
// error message. AxiosError.toJSON() serializes `message` verbatim and errors
// are commonly logged, while the opt-in `config.redact` model only cleans
// config keys — it cannot reach the message. Redact only the genuinely
// sensitive substrings — userinfo (credentials), query parameter values and
// fragment contents — with the same REDACTED marker the config redaction uses,
// while keeping the scheme, host, path and parameter names so the offending
// request stays accurately identifiable.
function redactFragment(fragment) {
    if (!fragment) return fragment;
    return fragment.replace(/(^|&)([^=&]*=)?[^&]+/g, (match, separator, parameterName = '')=>{
        return `${separator}${parameterName}${0, _axiosErrorJs.REDACTED}`;
    });
}
function redactSensitiveURLParts(url) {
    const redactedURL = url.replace(/^(https?:\/{0,2})[^/?#]*@/i, `$1${(0, _axiosErrorJs.REDACTED)}@`);
    const fragmentIndex = redactedURL.indexOf('#');
    const urlWithoutFragment = fragmentIndex === -1 ? redactedURL : redactedURL.slice(0, fragmentIndex);
    const redactedURLWithoutFragment = urlWithoutFragment.replace(/([?&][^=&#]*=)[^&#]*/g, `$1${(0, _axiosErrorJs.REDACTED)}`);
    if (fragmentIndex === -1) return redactedURLWithoutFragment;
    return `${redactedURLWithoutFragment}#${redactFragment(redactedURL.slice(fragmentIndex + 1))}`;
}
function assertValidHttpProtocolURL(url, config) {
    if (typeof url === 'string') {
        const normalizedURL = (0, _normalizeURLForProtocolCheckJsDefault.default)(url);
        if (malformedHttpProtocol.test(normalizedURL)) throw new (0, _axiosErrorJsDefault.default)(`Invalid URL ${JSON.stringify(redactSensitiveURLParts(normalizedURL))}: missing "//" after protocol`, (0, _axiosErrorJsDefault.default).ERR_INVALID_URL, config);
    }
}
function buildFullPath(baseURL, requestedURL, allowAbsoluteUrls, config) {
    assertValidHttpProtocolURL(requestedURL, config);
    let isRelativeUrl = !(0, _isAbsoluteURLJsDefault.default)(requestedURL);
    if (baseURL && (isRelativeUrl || allowAbsoluteUrls === false)) {
        assertValidHttpProtocolURL(baseURL, config);
        return (0, _combineURLsJsDefault.default)(baseURL, requestedURL);
    }
    return requestedURL;
}

},{"./AxiosError.js":"7z85x","../helpers/isAbsoluteURL.js":"6XRC7","../helpers/combineURLs.js":"l5Wmt","../helpers/normalizeURLForProtocolCheck.js":"1IRer","@parcel/transformer-js/src/esmodule-helpers.js":"jnFvT"}],"6XRC7":[function(require,module,exports,__globalThis) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "default", ()=>isAbsoluteURL);
'use strict';
function isAbsoluteURL(url) {
    // A URL is considered absolute if it begins with "<scheme>://" or "//" (protocol-relative URL).
    // RFC 3986 defines scheme name as a sequence of characters beginning with a letter and followed
    // by any combination of letters, digits, plus, period, or hyphen.
    if (typeof url !== 'string') return false;
    return /^([a-z][a-z\d+\-.]*:)?\/\//i.test(url);
}

},{"@parcel/transformer-js/src/esmodule-helpers.js":"jnFvT"}],"l5Wmt":[function(require,module,exports,__globalThis) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "default", ()=>combineURLs);
'use strict';
function combineURLs(baseURL, relativeURL) {
    if (!relativeURL) return baseURL;
    let end = baseURL.length;
    while(end > 0 && baseURL.charCodeAt(end - 1) === 47)end--;
    return baseURL.slice(0, end) + '/' + relativeURL.replace(/^\/+/, '');
}

},{"@parcel/transformer-js/src/esmodule-helpers.js":"jnFvT"}],"311Mu":[function(require,module,exports,__globalThis) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "default", ()=>mergeConfig);
var _utilsJs = require("../utils.js");
var _utilsJsDefault = parcelHelpers.interopDefault(_utilsJs);
var _axiosHeadersJs = require("./AxiosHeaders.js");
var _axiosHeadersJsDefault = parcelHelpers.interopDefault(_axiosHeadersJs);
var _assertParamsAcyclicJs = require("./assertParamsAcyclic.js");
var _assertParamsAcyclicJsDefault = parcelHelpers.interopDefault(_assertParamsAcyclicJs);
'use strict';
const headersToObject = (thing)=>thing instanceof (0, _axiosHeadersJsDefault.default) ? {
        ...thing
    } : thing;
const ownEnumerableKeys = (thing)=>{
    if (Object.getOwnPropertySymbols && Object.getOwnPropertyDescriptor) return Object.keys(thing).concat(Object.getOwnPropertySymbols(thing).filter((symbol)=>{
        const descriptor = Object.getOwnPropertyDescriptor(thing, symbol);
        return descriptor && descriptor.enumerable;
    }));
    return Object.keys(thing);
};
// Copy params without recursive merges so the serializer remains responsible
// for its depth policy. Only visit defaults that contribute to the result.
function mergeParams(a, b) {
    const pending = [];
    const copies = new WeakMap();
    const empty = {};
    function copy(target, source) {
        if (!(0, _utilsJsDefault.default).isPlainObject(source)) return (0, _utilsJsDefault.default).isArray(source) ? source.slice() : source;
        const base = (0, _utilsJsDefault.default).isPlainObject(target) ? target : empty;
        let bases = copies.get(source);
        if (!bases) {
            bases = new WeakMap();
            copies.set(source, bases);
        }
        if (bases.has(base)) return bases.get(base);
        const result = {};
        bases.set(base, result);
        pending.push({
            base,
            source,
            result
        });
        return result;
    }
    const result = (0, _utilsJsDefault.default).isUndefined(b) ? copy(undefined, a) : copy(a, b);
    while(pending.length){
        const { base, source, result: target } = pending.pop();
        const baseKeys = new Set(ownEnumerableKeys(base));
        const sourceKeys = new Set(ownEnumerableKeys(source));
        const keys = new Set([
            ...baseKeys,
            ...sourceKeys
        ]);
        keys.forEach((key)=>{
            if (key === '__proto__' || key === 'constructor' || key === 'prototype') return;
            const hasSource = sourceKeys.has(key);
            const value = hasSource ? source[key] : undefined;
            const previous = (!hasSource || (0, _utilsJsDefault.default).isPlainObject(value)) && baseKeys.has(key) ? base[key] : undefined;
            target[key] = hasSource ? copy(previous, value) : copy(undefined, previous);
        });
    }
    (0, _assertParamsAcyclicJsDefault.default)(result);
    return result;
}
function getMergedValue(target, source, prop, caseless) {
    if ((0, _utilsJsDefault.default).isPlainObject(target) && (0, _utilsJsDefault.default).isPlainObject(source)) return (0, _utilsJsDefault.default).merge.call({
        caseless
    }, target, source);
    else if ((0, _utilsJsDefault.default).isPlainObject(source)) return (0, _utilsJsDefault.default).merge({}, source);
    else if ((0, _utilsJsDefault.default).isArray(source)) return source.slice();
    return source;
}
function mergeDeepProperties(a, b, prop, caseless) {
    if (!(0, _utilsJsDefault.default).isUndefined(b)) return getMergedValue(a, b, prop, caseless);
    else if (!(0, _utilsJsDefault.default).isUndefined(a)) return getMergedValue(undefined, a, prop, caseless);
}
// eslint-disable-next-line consistent-return
function valueFromConfig2(a, b) {
    if (!(0, _utilsJsDefault.default).isUndefined(b)) return getMergedValue(undefined, b);
}
// eslint-disable-next-line consistent-return
function defaultToConfig2(a, b) {
    if (!(0, _utilsJsDefault.default).isUndefined(b)) return getMergedValue(undefined, b);
    else if (!(0, _utilsJsDefault.default).isUndefined(a)) return getMergedValue(undefined, a);
}
function getMergedTransitionalOption(config1, config2, prop) {
    const transitional2 = (0, _utilsJsDefault.default).hasOwnProp(config2, 'transitional') ? config2.transitional : undefined;
    if (!(0, _utilsJsDefault.default).isUndefined(transitional2)) {
        if ((0, _utilsJsDefault.default).isPlainObject(transitional2)) {
            if ((0, _utilsJsDefault.default).hasOwnProp(transitional2, prop)) return transitional2[prop];
        } else return undefined;
    }
    const transitional1 = (0, _utilsJsDefault.default).hasOwnProp(config1, 'transitional') ? config1.transitional : undefined;
    if ((0, _utilsJsDefault.default).isPlainObject(transitional1) && (0, _utilsJsDefault.default).hasOwnProp(transitional1, prop)) return transitional1[prop];
    return undefined;
}
// eslint-disable-next-line consistent-return
function mergeDirectKeys(a, b, prop, config1, config2) {
    if ((0, _utilsJsDefault.default).hasOwnProp(config2, prop)) return getMergedValue(a, b);
    else if ((0, _utilsJsDefault.default).hasOwnProp(config1, prop)) return getMergedValue(undefined, a);
}
function mergeHeaders(a, b, prop) {
    return mergeDeepProperties(headersToObject(a), headersToObject(b), prop, true);
}
// Null-proto, frozen descriptor so a polluted Object.prototype.get cannot turn
// this data descriptor into an accessor descriptor on the way in.
// defineProperty only reads it, so one shared instance serves every call.
const hasOwnPropertyDescriptor = Object.freeze({
    __proto__: null,
    value: Object.prototype.hasOwnProperty,
    enumerable: false,
    writable: true,
    configurable: true
});
// The strategy table and the strategies above are stateless, so they are
// built once at module load instead of on every call: mergeConfig runs at
// most twice per request (once from a method alias, once from `_request`).
const mergeMap = {
    url: valueFromConfig2,
    method: valueFromConfig2,
    data: valueFromConfig2,
    baseURL: defaultToConfig2,
    transformRequest: defaultToConfig2,
    transformResponse: defaultToConfig2,
    params: mergeParams,
    paramsSerializer: defaultToConfig2,
    timeout: defaultToConfig2,
    timeoutErrorMessage: defaultToConfig2,
    withCredentials: defaultToConfig2,
    withXSRFToken: defaultToConfig2,
    adapter: defaultToConfig2,
    responseType: defaultToConfig2,
    xsrfCookieName: defaultToConfig2,
    xsrfHeaderName: defaultToConfig2,
    onUploadProgress: defaultToConfig2,
    onDownloadProgress: defaultToConfig2,
    decompress: defaultToConfig2,
    maxContentLength: defaultToConfig2,
    maxBodyLength: defaultToConfig2,
    beforeRedirect: defaultToConfig2,
    transport: defaultToConfig2,
    httpAgent: defaultToConfig2,
    httpsAgent: defaultToConfig2,
    cancelToken: defaultToConfig2,
    socketPath: defaultToConfig2,
    allowedSocketPaths: defaultToConfig2,
    responseEncoding: defaultToConfig2,
    validateStatus: mergeDirectKeys,
    headers: mergeHeaders
};
function mergeConfig(config1, config2) {
    // eslint-disable-next-line no-param-reassign
    config1 = config1 || {};
    config2 = config2 || {};
    // Use a null-prototype object so that downstream reads such as `config.auth`
    // or `config.baseURL` cannot inherit polluted values from Object.prototype.
    // `hasOwnProperty` is restored as a non-enumerable own slot to preserve
    // ergonomics for user code that relies on it.
    const config = Object.create(null);
    Object.defineProperty(config, 'hasOwnProperty', hasOwnPropertyDescriptor);
    const keys = ownEnumerableKeys({
        ...config1,
        ...config2
    });
    for(let i = 0, len = keys.length; i < len; i++){
        const prop = keys[i];
        if (prop === '__proto__' || prop === 'constructor' || prop === 'prototype') continue;
        const merge = (0, _utilsJsDefault.default).hasOwnProp(mergeMap, prop) ? mergeMap[prop] : mergeDeepProperties;
        const a = (0, _utilsJsDefault.default).hasOwnProp(config1, prop) ? config1[prop] : undefined;
        const b = (0, _utilsJsDefault.default).hasOwnProp(config2, prop) ? config2[prop] : undefined;
        const configValue = merge === mergeDirectKeys ? merge(a, b, prop, config1, config2) : merge(a, b, prop);
        (0, _utilsJsDefault.default).isUndefined(configValue) && merge !== mergeDirectKeys || (config[prop] = configValue);
    }
    if ((0, _utilsJsDefault.default).hasOwnProp(config2, 'validateStatus') && (0, _utilsJsDefault.default).isUndefined(config2.validateStatus) && getMergedTransitionalOption(config1, config2, 'validateStatusUndefinedResolves') === false) {
        if ((0, _utilsJsDefault.default).hasOwnProp(config1, 'validateStatus')) config.validateStatus = getMergedValue(undefined, config1.validateStatus);
        else delete config.validateStatus;
    }
    return config;
}

},{"../utils.js":"jI6DP","./AxiosHeaders.js":"9EzTj","./assertParamsAcyclic.js":"fl56P","@parcel/transformer-js/src/esmodule-helpers.js":"jnFvT"}],"fl56P":[function(require,module,exports,__globalThis) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "default", ()=>assertParamsAcyclic);
var _utilsJs = require("../utils.js");
var _utilsJsDefault = parcelHelpers.interopDefault(_utilsJs);
var _axiosErrorJs = require("./AxiosError.js");
var _axiosErrorJsDefault = parcelHelpers.interopDefault(_axiosErrorJs);
'use strict';
function assertParamsAcyclic(params) {
    const pending = [
        {
            value: params
        }
    ];
    const active = new WeakSet();
    const visited = new WeakSet();
    while(pending.length){
        const { value, done } = pending.pop();
        if (!(0, _utilsJsDefault.default).isPlainObject(value) && !(0, _utilsJsDefault.default).isArray(value)) continue;
        if (done) {
            active.delete(value);
            continue;
        }
        if (active.has(value)) throw new (0, _axiosErrorJsDefault.default)('Circular reference detected in params', (0, _axiosErrorJsDefault.default).ERR_BAD_OPTION_VALUE);
        if (visited.has(value)) continue;
        visited.add(value);
        active.add(value);
        pending.push({
            value,
            done: true
        });
        const keys = Object.keys(value);
        if (Object.getOwnPropertySymbols && Object.getOwnPropertyDescriptor) Object.getOwnPropertySymbols(value).forEach((key)=>{
            const descriptor = Object.getOwnPropertyDescriptor(value, key);
            if (descriptor && descriptor.enumerable) keys.push(key);
        });
        // Shallow array elements retain fields filtered during plain-object merges.
        // Inspect reserved data properties without evaluating their accessors.
        keys.forEach((key)=>{
            if (key === '__proto__' || key === 'constructor' || key === 'prototype') {
                const descriptor = Object.getOwnPropertyDescriptor(value, key);
                if (descriptor && (0, _utilsJsDefault.default).hasOwnProp(descriptor, 'value')) pending.push({
                    value: descriptor.value
                });
            } else pending.push({
                value: value[key]
            });
        });
    }
}

},{"../utils.js":"jI6DP","./AxiosError.js":"7z85x","@parcel/transformer-js/src/esmodule-helpers.js":"jnFvT"}],"h97qT":[function(require,module,exports,__globalThis) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "default", ()=>setFormDataHeaders);
'use strict';
const FORM_DATA_CONTENT_HEADERS = [
    'content-type',
    'content-length'
];
function setFormDataHeaders(headers, formHeaders, policy) {
    if (policy !== 'content-only') {
        headers.set(formHeaders);
        return;
    }
    Object.entries(formHeaders || {}).forEach(([key, val])=>{
        if (FORM_DATA_CONTENT_HEADERS.includes(key.toLowerCase())) headers.set(key, val);
    });
}

},{"@parcel/transformer-js/src/esmodule-helpers.js":"jnFvT"}],"d5PZl":[function(require,module,exports,__globalThis) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "getFetch", ()=>getFetch);
var _indexJs = require("../platform/index.js");
var _indexJsDefault = parcelHelpers.interopDefault(_indexJs);
var _utilsJs = require("../utils.js");
var _utilsJsDefault = parcelHelpers.interopDefault(_utilsJs);
var _axiosErrorJs = require("../core/AxiosError.js");
var _axiosErrorJsDefault = parcelHelpers.interopDefault(_axiosErrorJs);
var _composeSignalsJs = require("../helpers/composeSignals.js");
var _composeSignalsJsDefault = parcelHelpers.interopDefault(_composeSignalsJs);
var _trackStreamJs = require("../helpers/trackStream.js");
var _createMultipartBodyJs = require("../core/createMultipartBody.js");
var _createMultipartBodyJsDefault = parcelHelpers.interopDefault(_createMultipartBodyJs);
var _axiosHeadersJs = require("../core/AxiosHeaders.js");
var _axiosHeadersJsDefault = parcelHelpers.interopDefault(_axiosHeadersJs);
var _progressEventReducerJs = require("../helpers/progressEventReducer.js");
var _resolveConfigJs = require("../helpers/resolveConfig.js");
var _resolveConfigJsDefault = parcelHelpers.interopDefault(_resolveConfigJs);
var _settleJs = require("../core/settle.js");
var _settleJsDefault = parcelHelpers.interopDefault(_settleJs);
var _estimateDataURLDecodedBytesJs = require("../helpers/estimateDataURLDecodedBytes.js");
var _estimateDataURLDecodedBytesJsDefault = parcelHelpers.interopDefault(_estimateDataURLDecodedBytesJs);
var _dataJs = require("../env/data.js");
var _sanitizeHeaderValueJs = require("../helpers/sanitizeHeaderValue.js");
const DEFAULT_CHUNK_SIZE = 65536;
const DEFAULT_REQUEST_OPTIONS = {
    cache: 'default',
    redirect: 'follow',
    referrer: 'about:client',
    referrerPolicy: '',
    mode: 'cors',
    integrity: '',
    keepalive: false,
    priority: 'auto',
    window: null
};
const { isFunction } = (0, _utilsJsDefault.default);
/**
 * Encode a UTF-8 string to a Latin-1 byte string for use with btoa().
 * This is a modern replacement for the deprecated unescape(encodeURIComponent(str)) pattern.
 *
 * @param {string} str The string to encode
 *
 * @returns {string} UTF-8 bytes as a Latin-1 string
 */ const encodeUTF8 = (str)=>encodeURIComponent(str).replace(/%([0-9A-F]{2})/gi, (_, hex)=>String.fromCharCode(parseInt(hex, 16)));
// Node's WHATWG URL parser returns `username` and `password` percent-encoded.
// Decode before composing the `auth` option so credentials such as
// `my%40email.com:pass` are sent as `my@email.com:pass`. Falls back to the
// original value for malformed input so a bad encoding never throws.
const decodeURIComponentSafe = (value)=>{
    if (!(0, _utilsJsDefault.default).isString(value)) return value;
    try {
        return decodeURIComponent(value);
    } catch (error) {
        return value;
    }
};
const test = (fn, ...args)=>{
    try {
        return !!fn(...args);
    } catch (e) {
        return false;
    }
};
const maybeWithAuthCredentials = (url)=>{
    const protocolIndex = url.indexOf('://');
    let urlToCheck = url;
    if (protocolIndex !== -1) urlToCheck = urlToCheck.slice(protocolIndex + 3);
    return urlToCheck.includes('@') || urlToCheck.includes(':');
};
const factory = (env)=>{
    const globalObject = (0, _utilsJsDefault.default).global !== undefined && (0, _utilsJsDefault.default).global !== null ? (0, _utilsJsDefault.default).global : globalThis;
    const { ReadableStream, TextEncoder } = globalObject;
    env = (0, _utilsJsDefault.default).merge.call({
        skipUndefined: true
    }, {
        Request: globalObject.Request,
        Response: globalObject.Response,
        Blob: globalObject.Blob
    }, env);
    const envFetch = (0, _utilsJsDefault.default).hasOwnProp(env, 'fetch') ? env.fetch : undefined;
    const { Request, Response, Blob } = env;
    const isFetchSupported = envFetch ? isFunction(envFetch) : typeof fetch === 'function';
    const isRequestSupported = isFunction(Request);
    const isResponseSupported = isFunction(Response);
    if (!isFetchSupported) return false;
    const isReadableStreamSupported = isFetchSupported && isFunction(ReadableStream);
    const encodeText = isFetchSupported && (typeof TextEncoder === 'function' ? ((encoder)=>(str)=>encoder.encode(str))(new TextEncoder()) : async (str)=>new Uint8Array(await new Request(str).arrayBuffer()));
    const supportsRequestStream = isRequestSupported && isReadableStreamSupported && test(()=>{
        let duplexAccessed = false;
        const request = new Request((0, _indexJsDefault.default).origin, {
            body: new ReadableStream(),
            method: 'POST',
            get duplex () {
                duplexAccessed = true;
                return 'half';
            }
        });
        const hasContentType = request.headers.has('Content-Type');
        if (request.body != null) request.body.cancel();
        return duplexAccessed && !hasContentType;
    });
    const supportsResponseStream = isResponseSupported && isReadableStreamSupported && test(()=>(0, _utilsJsDefault.default).isReadableStream(new Response('').body));
    // Some runtimes reject every explicit cache mode. Use own defaults for both
    // probes so unrelated polluted options cannot affect cache-mode detection.
    const requestDefaults = Object.assign(Object.create(null), DEFAULT_REQUEST_OPTIONS);
    if (isRequestSupported && !test(()=>new Request((0, _indexJsDefault.default).origin, requestDefaults))) {
        delete requestDefaults.cache;
        // Only omit cache when that makes Request construction succeed. Otherwise
        // retain the explicit default that protects supporting runtimes from pollution.
        if (!test(()=>new Request((0, _indexJsDefault.default).origin, requestDefaults))) requestDefaults.cache = DEFAULT_REQUEST_OPTIONS.cache;
    }
    const resolvers = {
        stream: supportsResponseStream && ((res)=>res.body)
    };
    isFetchSupported && (()=>{
        [
            'text',
            'arrayBuffer',
            'blob',
            'formData',
            'stream'
        ].forEach((type)=>{
            !resolvers[type] && (resolvers[type] = (res, config)=>{
                let method = res && res[type];
                if (method) return method.call(res);
                throw new (0, _axiosErrorJsDefault.default)(`Response type '${type}' is not supported`, (0, _axiosErrorJsDefault.default).ERR_NOT_SUPPORT, config);
            });
        });
    })();
    const getBodyLength = async (body)=>{
        if (body == null) return 0;
        if ((0, _utilsJsDefault.default).isBlob(body)) return body.size;
        if ((0, _utilsJsDefault.default).isArrayBufferView(body) || (0, _utilsJsDefault.default).isArrayBuffer(body)) return body.byteLength;
        if ((0, _utilsJsDefault.default).isURLSearchParams(body)) body = body + '';
        if ((0, _utilsJsDefault.default).isString(body)) return (await encodeText(body)).byteLength;
    };
    const resolveBodyLength = async (headers, body)=>{
        const length = (0, _utilsJsDefault.default).toFiniteNumber(headers.getContentLength());
        return length == null ? getBodyLength(body) : length;
    };
    return async (config)=>{
        let { url, method, data, signal, cancelToken, timeout, onDownloadProgress, onUploadProgress, responseType, headers, withCredentials = 'same-origin', fetchOptions, maxContentLength, maxBodyLength, maxRedirects } = (0, _resolveConfigJsDefault.default)(config);
        const hasMaxContentLength = (0, _utilsJsDefault.default).isNumber(maxContentLength) && maxContentLength > -1;
        const hasMaxBodyLength = (0, _utilsJsDefault.default).isNumber(maxBodyLength) && maxBodyLength > -1;
        const own = (key)=>(0, _utilsJsDefault.default).hasOwnProp(config, key) ? config[key] : undefined;
        let _fetch = envFetch || fetch;
        responseType = responseType ? (responseType + '').toLowerCase() : 'text';
        let composedSignal = (0, _composeSignalsJsDefault.default)([
            signal,
            cancelToken && cancelToken.toAbortSignal()
        ], timeout);
        let request = null;
        const unsubscribe = composedSignal && composedSignal.unsubscribe && (()=>{
            composedSignal.unsubscribe();
        });
        let requestContentLength;
        // AxiosErrors we raise while request or response bodies are being streamed. Captured
        // by identity so the catch block can surface it directly, regardless of
        // how the runtime wraps the resulting fetch rejection (undici exposes it
        // as `err.cause`; some browsers drop the original error entirely).
        let pendingBodyError = null;
        let pendingResponseError = null;
        const maxBodyLengthError = ()=>new (0, _axiosErrorJsDefault.default)('Request body larger than maxBodyLength limit', (0, _axiosErrorJsDefault.default).ERR_BAD_REQUEST, config, request);
        try {
            // HTTP basic authentication
            let auth = undefined;
            const configAuth = own('auth');
            if (configAuth) {
                const username = (0, _utilsJsDefault.default).getSafeProp(configAuth, 'username') || '';
                const password = (0, _utilsJsDefault.default).getSafeProp(configAuth, 'password') || '';
                auth = {
                    username,
                    password
                };
            }
            let parsedURL;
            if (maybeWithAuthCredentials(url)) {
                parsedURL = new URL(url, (0, _indexJsDefault.default).origin);
                if (!auth && (parsedURL.username || parsedURL.password)) {
                    const urlUsername = decodeURIComponentSafe(parsedURL.username);
                    const urlPassword = decodeURIComponentSafe(parsedURL.password);
                    auth = {
                        username: urlUsername,
                        password: urlPassword
                    };
                }
                if (parsedURL.username || parsedURL.password) {
                    parsedURL.username = '';
                    parsedURL.password = '';
                    url = parsedURL.href;
                }
            }
            if (auth) {
                headers.delete('authorization');
                headers.set('Authorization', 'Basic ' + btoa(encodeUTF8((auth.username || '') + ':' + (auth.password || ''))));
            }
            // Enforce maxContentLength for data: URLs up-front so we never materialize
            // an oversized payload. The HTTP adapter applies the same check (see http.js
            // "if (protocol === 'data:')" branch).
            if (hasMaxContentLength && parsedURL && parsedURL.protocol === 'data:') {
                const estimated = (0, _estimateDataURLDecodedBytesJsDefault.default)(parsedURL.href);
                if (estimated > maxContentLength) throw new (0, _axiosErrorJsDefault.default)('maxContentLength size of ' + maxContentLength + ' exceeded', (0, _axiosErrorJsDefault.default).ERR_BAD_RESPONSE, config, request);
            }
            const formContentType = (0, _utilsJsDefault.default).isSpecCompliantForm(data) && (0, _axiosHeadersJsDefault.default).from(own('headers')).getContentType();
            let formBoundary;
            if ((0, _utilsJsDefault.default).isString(formContentType) && /^multipart\/form-data(?:\s*;|$)/i.test(formContentType.trim())) {
                const parameters = (0, _axiosHeadersJsDefault.default).parseParameters(formContentType);
                if ((0, _utilsJsDefault.default).hasOwnProp(parameters, 'boundary')) formBoundary = parameters.boundary;
            }
            if ((0, _utilsJsDefault.default).isSpecCompliantForm(data) && method !== 'get' && method !== 'head' && (hasMaxBodyLength || onUploadProgress && supportsRequestStream || formBoundary !== undefined)) {
                data = (0, _createMultipartBodyJsDefault.default)(data, Blob, hasMaxBodyLength ? maxBodyLength : Infinity, maxBodyLengthError, formBoundary);
                // Blob.type lowercases its value, including a case-sensitive boundary.
                // Retain the caller's header when an explicit boundary was serialized.
                headers.setContentType(formBoundary === undefined ? data.type : formContentType);
                requestContentLength = data.size;
            }
            // Enforce maxBodyLength against known-size bodies before dispatch using
            // the body's *actual* size — never a caller-declared Content-Length,
            // which could under-report to slip an oversized body past the check.
            // Unknown-size streams return undefined here and are counted per-chunk
            // below as fetch consumes them.
            if (hasMaxBodyLength && method !== 'get' && method !== 'head') {
                const outboundLength = await getBodyLength(data);
                if (typeof outboundLength === 'number' && isFinite(outboundLength)) {
                    requestContentLength = outboundLength;
                    if (outboundLength > maxBodyLength) throw maxBodyLengthError();
                }
            }
            // A streamed body under maxBodyLength must be counted as fetch consumes
            // it; its size is never trusted from a caller-declared Content-Length.
            const mustEnforceStreamBody = hasMaxBodyLength && ((0, _utilsJsDefault.default).isReadableStream(data) || (0, _utilsJsDefault.default).isStream(data));
            const trackRequestStream = (stream, onProgress, flush)=>(0, _trackStreamJs.trackStream)(stream, DEFAULT_CHUNK_SIZE, (loadedBytes)=>{
                    if (hasMaxBodyLength && loadedBytes > maxBodyLength) throw pendingBodyError = maxBodyLengthError();
                    onProgress && onProgress(loadedBytes);
                }, flush);
            if (supportsRequestStream && method !== 'get' && method !== 'head' && (onUploadProgress || mustEnforceStreamBody)) {
                requestContentLength = requestContentLength == null ? await resolveBodyLength(headers, data) : requestContentLength;
                // A declared length of 0 is only trusted to skip the wrap when we are
                // not enforcing a stream limit (which must not rely on that header).
                if (requestContentLength !== 0 || mustEnforceStreamBody) {
                    let _request = new Request(url, {
                        method: 'POST',
                        body: data,
                        duplex: 'half'
                    });
                    let contentTypeHeader;
                    if ((0, _utilsJsDefault.default).isFormData(data) && (contentTypeHeader = _request.headers.get('content-type'))) headers.setContentType(contentTypeHeader);
                    if (_request.body) {
                        const [onProgress, flush] = onUploadProgress && (0, _progressEventReducerJs.progressEventDecorator)(requestContentLength, (0, _progressEventReducerJs.progressEventReducer)((0, _progressEventReducerJs.asyncDecorator)(onUploadProgress))) || [];
                        data = trackRequestStream(_request.body, onProgress, flush);
                    }
                }
            } else if (mustEnforceStreamBody && !isRequestSupported && isReadableStreamSupported && method !== 'get' && method !== 'head') data = trackRequestStream(data);
            else if (mustEnforceStreamBody && isRequestSupported && !supportsRequestStream && method !== 'get' && method !== 'head') throw new (0, _axiosErrorJsDefault.default)('Stream request bodies are not supported by the current fetch implementation', (0, _axiosErrorJsDefault.default).ERR_NOT_SUPPORT, config, request);
            if (!(0, _utilsJsDefault.default).isString(withCredentials)) withCredentials = withCredentials ? 'include' : 'omit';
            // Cloudflare Workers throws when credentials are defined
            // see https://github.com/cloudflare/workerd/issues/902
            const isCredentialsSupported = isRequestSupported && 'credentials' in Request.prototype;
            // If data is FormData and Content-Type is multipart/form-data without boundary,
            // delete it so fetch can set it correctly with the boundary
            if ((0, _utilsJsDefault.default).isFormData(data)) {
                const contentType = headers.getContentType();
                if (contentType && /^multipart\/form-data/i.test(contentType) && !/boundary=/i.test(contentType)) headers.delete('content-type');
            }
            // Set User-Agent header if not already set (fetch defaults to 'node' in Node.js)
            headers.set('User-Agent', 'axios/' + (0, _dataJs.VERSION), false);
            const safeFetchOptions = fetchOptions == null ? fetchOptions : Object.assign(Object.create(null), fetchOptions);
            if (safeFetchOptions) {
                // These options are owned by Axios and are already reflected in the
                // resolved Request passed to fetch.
                delete safeFetchOptions.body;
                delete safeFetchOptions.headers;
                delete safeFetchOptions.method;
                delete safeFetchOptions.signal;
                delete safeFetchOptions.duplex;
                delete safeFetchOptions.credentials;
            }
            const resolvedOptions = Object.assign(Object.create(null), safeFetchOptions, {
                signal: composedSignal,
                method: method.toUpperCase(),
                headers: (0, _sanitizeHeaderValueJs.toByteStringHeaderObject)(headers.normalize()),
                body: data,
                duplex: 'half',
                credentials: isCredentialsSupported ? withCredentials : undefined
            });
            if (isRequestSupported) {
                (0, _utilsJsDefault.default).forEach(requestDefaults, (value, key)=>{
                    if (resolvedOptions[key] === undefined) resolvedOptions[key] = value;
                });
                if (resolvedOptions.signal === undefined) resolvedOptions.signal = null;
                if (resolvedOptions.body === undefined) resolvedOptions.body = null;
            }
            if (maxRedirects === 0) {
                resolvedOptions.redirect = 'manual';
                if (safeFetchOptions) safeFetchOptions.redirect = 'manual';
            }
            request = isRequestSupported && new Request(url, resolvedOptions);
            let response = await (isRequestSupported ? _fetch(request, safeFetchOptions) : _fetch(url, resolvedOptions));
            const responseHeaders = (0, _axiosHeadersJsDefault.default).from(response.headers);
            // Cheap pre-check: if the server honestly declares a content-length that
            // already exceeds the cap, reject before we start streaming.
            if (hasMaxContentLength) {
                const declaredLength = (0, _utilsJsDefault.default).toFiniteNumber(responseHeaders.getContentLength());
                if (declaredLength != null && declaredLength > maxContentLength) throw new (0, _axiosErrorJsDefault.default)('maxContentLength size of ' + maxContentLength + ' exceeded', (0, _axiosErrorJsDefault.default).ERR_BAD_RESPONSE, config, request);
            }
            const isStreamResponse = supportsResponseStream && (responseType === 'stream' || responseType === 'response');
            if (supportsResponseStream && response.body && (onDownloadProgress || hasMaxContentLength || isStreamResponse && unsubscribe)) {
                const options = {};
                [
                    'status',
                    'statusText',
                    'headers'
                ].forEach((prop)=>{
                    options[prop] = response[prop];
                });
                const responseContentLength = (0, _utilsJsDefault.default).toFiniteNumber(responseHeaders.getContentLength());
                const [onProgress, flush] = onDownloadProgress && (0, _progressEventReducerJs.progressEventDecorator)(responseContentLength, (0, _progressEventReducerJs.progressEventReducer)((0, _progressEventReducerJs.asyncDecorator)(onDownloadProgress), true)) || [];
                let bytesRead = 0;
                const onChunkProgress = (loadedBytes)=>{
                    if (hasMaxContentLength) {
                        bytesRead = loadedBytes;
                        if (bytesRead > maxContentLength) throw pendingResponseError = new (0, _axiosErrorJsDefault.default)('maxContentLength size of ' + maxContentLength + ' exceeded', (0, _axiosErrorJsDefault.default).ERR_BAD_RESPONSE, config, request);
                    }
                    onProgress && onProgress(loadedBytes);
                };
                response = new Response((0, _trackStreamJs.trackStream)(response.body, DEFAULT_CHUNK_SIZE, onChunkProgress, ()=>{
                    flush && flush();
                    unsubscribe && unsubscribe();
                }), options);
            }
            responseType = responseType || 'text';
            let responseData = await resolvers[(0, _utilsJsDefault.default).findKey(resolvers, responseType) || 'text'](response, config);
            // Fallback enforcement for environments without ReadableStream support
            // (legacy runtimes). Detect materialized size from typed output; skip
            // streams/Response passthrough since the user will read those themselves.
            if (hasMaxContentLength && !supportsResponseStream && !isStreamResponse) {
                let materializedSize;
                if (responseData != null) {
                    if (typeof responseData.byteLength === 'number') materializedSize = responseData.byteLength;
                    else if (typeof responseData.size === 'number') materializedSize = responseData.size;
                    else if (typeof responseData === 'string') materializedSize = typeof TextEncoder === 'function' ? new TextEncoder().encode(responseData).byteLength : responseData.length;
                }
                if (typeof materializedSize === 'number' && materializedSize > maxContentLength) throw new (0, _axiosErrorJsDefault.default)('maxContentLength size of ' + maxContentLength + ' exceeded', (0, _axiosErrorJsDefault.default).ERR_BAD_RESPONSE, config, request);
            }
            !isStreamResponse && unsubscribe && unsubscribe();
            return await new Promise((resolve, reject)=>{
                (0, _settleJsDefault.default)(resolve, reject, {
                    data: responseData,
                    headers: (0, _axiosHeadersJsDefault.default).from(response.headers),
                    status: response.status,
                    statusText: response.statusText,
                    config,
                    request
                });
            });
        } catch (err) {
            unsubscribe && unsubscribe();
            // Safari can surface fetch aborts as a DOMException-like object whose
            // branded getters throw. Prefer our composed signal reason before reading
            // the caught error, preserving timeout vs cancellation semantics.
            if (composedSignal && composedSignal.aborted && composedSignal.reason instanceof (0, _axiosErrorJsDefault.default)) {
                const canceledError = composedSignal.reason;
                canceledError.config = config;
                request && (canceledError.request = request);
                if (err !== canceledError) // Non-enumerable to match native Error `cause` semantics so loggers
                // don't recurse into circular fetch internals (see #7205).
                Object.defineProperty(canceledError, 'cause', {
                    __proto__: null,
                    value: err,
                    writable: true,
                    enumerable: false,
                    configurable: true
                });
                throw canceledError;
            }
            // Surface a maxBodyLength violation we raised while the request body was
            // being streamed. Keeping the original error (rather than reading
            // `err.cause.isAxiosError`) keeps the error deterministic across runtimes
            // and avoids both prototype-pollution reads and mis-attributing a foreign
            // AxiosError that merely happened to land in `err.cause`.
            if (pendingBodyError) {
                request && !pendingBodyError.request && (pendingBodyError.request = request);
                throw pendingBodyError;
            }
            if (pendingResponseError) throw pendingResponseError;
            // Re-throw AxiosErrors we raised synchronously (data: URL / content-length
            // pre-checks, response size enforcement) without re-wrapping them.
            if (err instanceof (0, _axiosErrorJsDefault.default)) {
                request && !err.request && (err.request = request);
                throw err;
            }
            if (err && err.name === 'TypeError' && /Load failed|fetch/i.test(err.message)) {
                const networkError = new (0, _axiosErrorJsDefault.default)('Network Error', (0, _axiosErrorJsDefault.default).ERR_NETWORK, config, request, err && err.response);
                // Non-enumerable to match native Error `cause` semantics so loggers
                // don't recurse into circular fetch internals (see #7205).
                Object.defineProperty(networkError, 'cause', {
                    __proto__: null,
                    value: err.cause || err,
                    writable: true,
                    enumerable: false,
                    configurable: true
                });
                throw networkError;
            }
            throw (0, _axiosErrorJsDefault.default).from(err, err && err.code, config, request, err && err.response);
        }
    };
};
const seedCache = new Map();
const getFetch = (config)=>{
    const env = Object.create(null);
    const configuredEnv = config && (0, _utilsJsDefault.default).hasOwnProp(config, 'env') && config.env;
    [
        'fetch',
        'Request',
        'Response',
        'Blob'
    ].forEach((key)=>{
        if (configuredEnv && (0, _utilsJsDefault.default).hasOwnProp(configuredEnv, key)) env[key] = configuredEnv[key];
    });
    const { fetch: fetch1, Request, Response, Blob } = env;
    const seeds = [
        Request,
        Response,
        fetch1,
        Blob
    ];
    let len = seeds.length, i = len, seed, target, map = seedCache;
    while(i--){
        seed = seeds[i];
        target = map.get(seed);
        target === undefined && map.set(seed, target = i ? new Map() : factory(env));
        map = target;
    }
    return target;
};
const adapter = getFetch();
exports.default = adapter;

},{"../platform/index.js":"626Zd","../utils.js":"jI6DP","../core/AxiosError.js":"7z85x","../helpers/composeSignals.js":"fy9c7","../helpers/trackStream.js":"6dI08","../core/createMultipartBody.js":"84kVE","../core/AxiosHeaders.js":"9EzTj","../helpers/progressEventReducer.js":"6rzPu","../helpers/resolveConfig.js":"3RDMa","../core/settle.js":"2vmJg","../helpers/estimateDataURLDecodedBytes.js":"918ps","../env/data.js":"9SLyZ","../helpers/sanitizeHeaderValue.js":"hgIfL","@parcel/transformer-js/src/esmodule-helpers.js":"jnFvT"}],"fy9c7":[function(require,module,exports,__globalThis) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
var _canceledErrorJs = require("../cancel/CanceledError.js");
var _canceledErrorJsDefault = parcelHelpers.interopDefault(_canceledErrorJs);
var _axiosErrorJs = require("../core/AxiosError.js");
var _axiosErrorJsDefault = parcelHelpers.interopDefault(_axiosErrorJs);
var _utilsJs = require("../utils.js");
var _utilsJsDefault = parcelHelpers.interopDefault(_utilsJs);
const composeSignals = (signals, timeout)=>{
    signals = signals ? signals.filter(Boolean) : [];
    if (!timeout && !signals.length) return;
    const controller = new AbortController();
    let aborted = false;
    const onabort = function(reason) {
        if (!aborted) {
            aborted = true;
            unsubscribe();
            const err = reason instanceof Error ? reason : this.reason;
            controller.abort(err instanceof (0, _axiosErrorJsDefault.default) ? err : new (0, _canceledErrorJsDefault.default)(err instanceof Error ? err.message : err));
        }
    };
    let timer = timeout && setTimeout(()=>{
        timer = null;
        onabort(new (0, _axiosErrorJsDefault.default)(`timeout of ${timeout}ms exceeded`, (0, _axiosErrorJsDefault.default).ETIMEDOUT));
    }, timeout);
    const unsubscribe = ()=>{
        if (!signals) return;
        timer && clearTimeout(timer);
        timer = null;
        signals.forEach((signal)=>{
            const unsubscribeSignal = (0, _utilsJsDefault.default).getSafeProp(signal, 'unsubscribe');
            (0, _utilsJsDefault.default).isFunction(unsubscribeSignal) ? unsubscribeSignal.call(signal, onabort) : signal.removeEventListener('abort', onabort);
        });
        signals = null;
    };
    signals.forEach((signal)=>{
        if (aborted) return;
        if (signal.aborted) {
            onabort.call(signal);
            return;
        }
        signal.addEventListener('abort', onabort, {
            once: true
        });
    });
    const { signal } = controller;
    signal.unsubscribe = ()=>(0, _utilsJsDefault.default).asap(unsubscribe);
    return signal;
};
exports.default = composeSignals;

},{"../cancel/CanceledError.js":"9yG1c","../core/AxiosError.js":"7z85x","../utils.js":"jI6DP","@parcel/transformer-js/src/esmodule-helpers.js":"jnFvT"}],"6dI08":[function(require,module,exports,__globalThis) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "streamChunk", ()=>streamChunk);
parcelHelpers.export(exports, "readBytes", ()=>readBytes);
parcelHelpers.export(exports, "trackStream", ()=>trackStream);
const streamChunk = function*(chunk, chunkSize) {
    let len = chunk.byteLength;
    if (!chunkSize || len < chunkSize) {
        yield chunk;
        return;
    }
    let pos = 0;
    let end;
    while(pos < len){
        end = pos + chunkSize;
        yield chunk.slice(pos, end);
        pos = end;
    }
};
const readBytes = async function*(iterable, chunkSize) {
    for await (const chunk of readStream(iterable))yield* streamChunk(chunk, chunkSize);
};
const readStream = async function*(stream) {
    if (stream[Symbol.asyncIterator]) {
        yield* stream;
        return;
    }
    const reader = stream.getReader();
    try {
        for(;;){
            const { done, value } = await reader.read();
            if (done) break;
            yield value;
        }
    } finally{
        await reader.cancel();
    }
};
const trackStream = (stream, chunkSize, onProgress, onFinish)=>{
    const iterator = readBytes(stream, chunkSize);
    let bytes = 0;
    let done;
    let _onFinish = (e)=>{
        if (!done) {
            done = true;
            onFinish && onFinish(e);
        }
    };
    return new ReadableStream({
        async pull (controller) {
            try {
                const { done, value } = await iterator.next();
                if (done) {
                    _onFinish();
                    controller.close();
                    return;
                }
                let len = value.byteLength;
                if (onProgress) {
                    let loadedBytes = bytes += len;
                    onProgress(loadedBytes);
                }
                controller.enqueue(new Uint8Array(value));
            } catch (err) {
                _onFinish(err);
                throw err;
            }
        },
        cancel (reason) {
            _onFinish(reason);
            return iterator.return();
        }
    }, {
        highWaterMark: 2
    });
};

},{"@parcel/transformer-js/src/esmodule-helpers.js":"jnFvT"}],"84kVE":[function(require,module,exports,__globalThis) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "default", ()=>createMultipartBody);
var _utilsJs = require("../utils.js");
var _utilsJsDefault = parcelHelpers.interopDefault(_utilsJs);
var _indexJs = require("../platform/index.js");
var _indexJsDefault = parcelHelpers.interopDefault(_indexJs);
var _axiosErrorJs = require("./AxiosError.js");
var _axiosErrorJsDefault = parcelHelpers.interopDefault(_axiosErrorJs);
var _formDataToBlobJs = require("../helpers/formDataToBlob.js");
var _formDataToBlobJsDefault = parcelHelpers.interopDefault(_formDataToBlobJs);
function createMultipartBody(form, Blob, limit, limitError, boundary) {
    // Report missing Blob support before trying to select a random source.
    if (!(0, _utilsJsDefault.default).isFunction(Blob)) throw new (0, _axiosErrorJsDefault.default)('Blob is not supported', (0, _axiosErrorJsDefault.default).ERR_NOT_SUPPORT);
    if (boundary === undefined) {
        if ((0, _utilsJsDefault.default).isFunction((0, _indexJsDefault.default).generateString)) boundary = 'axios-' + (0, _indexJsDefault.default).generateString(36, '0123456789abcdef');
        else {
            const crypto = (0, _utilsJsDefault.default).global.crypto;
            if (!crypto || !(0, _utilsJsDefault.default).isFunction(crypto.getRandomValues)) throw new (0, _axiosErrorJsDefault.default)('Random byte generation is not supported', (0, _axiosErrorJsDefault.default).ERR_NOT_SUPPORT);
            const random = new Uint8Array(18);
            crypto.getRandomValues(random);
            boundary = 'axios-' + Array.from(random, (value)=>('0' + value.toString(16)).slice(-2)).join('');
        }
    }
    try {
        return (0, _formDataToBlobJsDefault.default)(form, Blob, limit, limitError, boundary);
    } catch (error) {
        if (error instanceof (0, _formDataToBlobJs.FormDataError)) {
            const code = error.reason === 'boundary' ? (0, _axiosErrorJsDefault.default).ERR_BAD_OPTION_VALUE : (0, _axiosErrorJsDefault.default).ERR_BAD_REQUEST;
            throw new (0, _axiosErrorJsDefault.default)(error.message, code);
        }
        throw error;
    }
}

},{"../utils.js":"jI6DP","../platform/index.js":"626Zd","./AxiosError.js":"7z85x","../helpers/formDataToBlob.js":"bbOIB","@parcel/transformer-js/src/esmodule-helpers.js":"jnFvT"}],"bbOIB":[function(require,module,exports,__globalThis) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
// Describe serialization failures independently of any request library.
parcelHelpers.export(exports, "FormDataError", ()=>FormDataError);
parcelHelpers.export(exports, "default", ()=>formDataToBlob);
var _utilsJs = require("../utils.js");
var _utilsJsDefault = parcelHelpers.interopDefault(_utilsJs);
const CRLF = '\r\n';
const normalizeLines = (value)=>String(value).replace(/\r\n|\r|\n/g, CRLF);
const escapeName = (value)=>String(value).replace(/[\r\n"]/g, (char)=>char === '\r' ? '%0D' : char === '\n' ? '%0A' : '%22');
// Count UTF-8 bytes without allocating an encoded copy of a field. FormData
// string values normalize line endings; Blob/File contents remain unchanged.
const stringBytes = (value, normalize)=>{
    let length = 0;
    for(let i = 0; i < value.length; i++){
        const code = value.charCodeAt(i);
        if (normalize && (code === 13 || code === 10)) {
            if (code === 13 && value.charCodeAt(i + 1) === 10) i++;
            length += 2;
        } else if (code < 0x80) length++;
        else if (code < 0x800) length += 2;
        else if (code >= 0xd800 && code <= 0xdbff && value.charCodeAt(i + 1) >= 0xdc00 && value.charCodeAt(i + 1) <= 0xdfff) {
            length += 4;
            i++;
        } else length += 3;
    }
    return length;
};
class FormDataError extends TypeError {
    constructor(message, reason){
        super(message);
        this.name = 'FormDataError';
        this.reason = reason;
    }
}
function formDataToBlob(form, Blob, limit, limitError, boundary) {
    if (!(0, _utilsJsDefault.default).isFunction(Blob)) throw new FormDataError('Blob is not supported', 'blob');
    if (!(0, _utilsJsDefault.default).isString(boundary) || !/^[A-Za-z0-9'()+_,./:=? -]{1,70}$/.test(boundary) || / $/.test(boundary)) throw new FormDataError('Invalid multipart boundary', 'boundary');
    const footer = '--' + boundary + '--' + CRLF;
    let length = footer.length;
    const parts = [];
    const checkLength = (extra)=>{
        if (length + extra > limit) throw limitError();
    };
    checkLength(0);
    for (const [name, value] of form){
        const isString = (0, _utilsJsDefault.default).isString(value);
        const valueLength = isString ? stringBytes(value, true) : value.size;
        if (!Number.isFinite(valueLength) || valueLength < 0) throw new FormDataError('Unsupported FormData part size', 'part');
        // Reject large values and names before building normalized header strings.
        checkLength(valueLength + stringBytes(name, true) + (!isString && value.name ? stringBytes(value.name, false) : 0) + (!isString && value.type ? stringBytes(value.type, false) : 0));
        let header = '--' + boundary + CRLF + 'Content-Disposition: form-data; name="' + escapeName(normalizeLines(name)) + '"';
        if (!isString) header += '; filename="' + escapeName((0, _utilsJsDefault.default).isString(value.name) ? value.name : 'blob') + '"' + CRLF + 'Content-Type: ' + String(value.type || 'application/octet-stream').replace(/[\r\n]/g, '');
        header += CRLF + CRLF;
        const partLength = stringBytes(header, false) + valueLength + CRLF.length;
        checkLength(partLength);
        length += partLength;
        parts.push({
            header,
            value,
            isString
        });
    }
    // Native Blob composition retains existing Blob/File data. No file is read
    // and no complete multipart ArrayBuffer is created to determine its length.
    const blobParts = [];
    for (const part of parts)blobParts.push(part.header, part.isString ? normalizeLines(part.value) : part.value, CRLF);
    blobParts.push(footer);
    return new Blob(blobParts, {
        type: 'multipart/form-data; boundary=' + boundary
    });
}

},{"../utils.js":"jI6DP","@parcel/transformer-js/src/esmodule-helpers.js":"jnFvT"}],"918ps":[function(require,module,exports,__globalThis) {
/**
 * Estimate data: URL byte lengths *without* allocating large buffers.
 * - Fetch percent-decodes a base64 body before decoding it.
 * - Node's Buffer.from(body, 'base64') sizes its backing allocation from the
 *   percent-decoded body, including ignored characters and content after padding.
 * - Non-base64 data is percent-decoded and then encoded as UTF-8.
 */ var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "default", ()=>estimateDataURLDecodedBytes);
/**
 * Estimate the Buffer backing allocation used after Node's percent-decoding step.
 *
 * @param {string} url
 * @returns {number}
 */ parcelHelpers.export(exports, "estimateDataURLBufferAllocation", ()=>estimateDataURLBufferAllocation);
const isHexDigit = (charCode)=>charCode >= 48 && charCode <= 57 || charCode >= 65 && charCode <= 70 || charCode >= 97 && charCode <= 102;
const isPercentEncodedByte = (str, i, len)=>i + 2 < len && isHexDigit(str.charCodeAt(i + 1)) && isHexDigit(str.charCodeAt(i + 2));
const hexValue = (charCode)=>charCode <= 57 ? charCode - 48 : (charCode & 0xdf) - 55;
const isBase64Char = (charCode)=>charCode >= 65 && charCode <= 90 || // A-Z
    charCode >= 97 && charCode <= 122 || // a-z
    charCode >= 48 && charCode <= 57 || // 0-9
    charCode === 43 || // +
    charCode === 47 || // /
    charCode === 45 || // - (base64url)
    charCode === 95; // _ (base64url)
const isBase64Whitespace = (charCode)=>charCode === 9 || charCode === 10 || charCode === 12 || charCode === 13 || charCode === 32;
const base64Bytes = (significant)=>{
    const groups = Math.floor(significant / 4);
    const remainder = significant % 4;
    return groups * 3 + (remainder === 2 ? 1 : remainder === 3 ? 2 : 0);
};
// Buffer.byteLength(body, 'base64') uses the raw string length as an allocation
// upper bound even when Buffer.from later ignores characters or stops at '='.
const estimateBase64BufferAllocation = (body)=>{
    const len = body.length;
    let padding = 0;
    if (len > 0 && body.charCodeAt(len - 1) === 61 /* '=' */ ) {
        padding++;
        if (len > 1 && body.charCodeAt(len - 2) === 61 /* '=' */ ) padding++;
    }
    return Math.floor((len - padding) * 3 / 4);
};
const estimatePercentDecodedBase64BufferAllocation = (body)=>{
    // Ordinary Base64 needs only its length and trailing padding.
    if (body.indexOf('%') === -1) return estimateBase64BufferAllocation(body);
    let length = 0;
    let previous = 0;
    let last = 0;
    for(let i = 0, len = body.length; i < len; i++){
        let code = body.charCodeAt(i);
        if (code === 37 /* '%' */  && isPercentEncodedByte(body, i, len)) {
            code = hexValue(body.charCodeAt(i + 1)) * 16 + hexValue(body.charCodeAt(i + 2));
            i += 2;
        }
        length++;
        previous = last;
        last = code;
    }
    const padding = last === 61 ? previous === 61 ? 2 : 1 : 0;
    return Math.floor((length - padding) * 3 / 4);
};
const estimatePercentDecodedBase64Bytes = (body)=>{
    const len = body.length;
    let significant = 0;
    let padding = 0;
    let invalid = false;
    for(let i = 0; i < len; i++){
        let code = body.charCodeAt(i);
        if (code === 37 /* '%' */  && isPercentEncodedByte(body, i, len)) {
            code = hexValue(body.charCodeAt(i + 1)) * 16 + hexValue(body.charCodeAt(i + 2));
            i += 2;
        }
        if (isBase64Whitespace(code)) continue;
        if (code === 61 /* '=' */ ) {
            padding++;
            continue;
        }
        if (!isBase64Char(code) || padding > 0) {
            invalid = true;
            continue;
        }
        significant++;
    }
    // Fetch rejects malformed forgiving-base64 input. Returning the raw-size
    // allocation bound keeps that invalid input from becoming a pre-check bypass.
    if (invalid || padding > 2 || padding > 0 && (significant + padding) % 4 !== 0 || significant % 4 === 1) return estimateBase64BufferAllocation(body);
    return base64Bytes(significant);
};
const estimateDataURLBytes = (url, estimateBase64, base64Pattern)=>{
    if (!url || typeof url !== 'string') return 0;
    if (!/^data:/i.test(url)) return 0;
    const comma = url.indexOf(',');
    if (comma < 0) return 0;
    const meta = url.slice(5, comma);
    const body = url.slice(comma + 1);
    const isBase64 = base64Pattern.test(meta);
    if (isBase64) return estimateBase64(body);
    // Compute UTF-8 byte length directly from UTF-16 code units without allocating
    // a byte buffer (TextEncoder.encode would defeat the DoS guard on large bodies).
    // Valid %XX triplets count as one decoded byte; this matches the bytes that
    // decodeURIComponent(body) would produce before Buffer re-encodes the string.
    let bytes = 0;
    for(let i = 0, len = body.length; i < len; i++){
        const c = body.charCodeAt(i);
        if (c === 37 /* '%' */  && isPercentEncodedByte(body, i, len)) {
            bytes += 1;
            i += 2;
        } else if (c < 0x80) bytes += 1;
        else if (c < 0x800) bytes += 2;
        else if (c >= 0xd800 && c <= 0xdbff && i + 1 < len) {
            const next = body.charCodeAt(i + 1);
            if (next >= 0xdc00 && next <= 0xdfff) {
                bytes += 4;
                i++;
            } else bytes += 3;
        } else bytes += 3;
    }
    return bytes;
};
function estimateDataURLDecodedBytes(url) {
    // Fetch removes URL fragments before processing a data: URL.
    const fragmentIndex = typeof url === 'string' ? url.indexOf('#') : -1;
    return estimateDataURLBytes(fragmentIndex === -1 ? url : url.slice(0, fragmentIndex), estimatePercentDecodedBase64Bytes, /; *base64[\t\n\f\r ]*$/i);
}
function estimateDataURLBufferAllocation(url) {
    // Match fromDataURI's case-insensitive protocol and encoding suffix.
    return estimateDataURLBytes(url, estimatePercentDecodedBase64BufferAllocation, /;base64$/i);
}

},{"@parcel/transformer-js/src/esmodule-helpers.js":"jnFvT"}],"9SLyZ":[function(require,module,exports,__globalThis) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "VERSION", ()=>VERSION);
const VERSION = "1.21.0";

},{"@parcel/transformer-js/src/esmodule-helpers.js":"jnFvT"}],"9wnyh":[function(require,module,exports,__globalThis) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
var _dataJs = require("../env/data.js");
var _axiosErrorJs = require("../core/AxiosError.js");
var _axiosErrorJsDefault = parcelHelpers.interopDefault(_axiosErrorJs);
'use strict';
const validators = {};
// eslint-disable-next-line func-names
[
    'object',
    'boolean',
    'number',
    'function',
    'string',
    'symbol'
].forEach((type, i)=>{
    validators[type] = function validator(thing) {
        return typeof thing === type || 'a' + (i < 1 ? 'n ' : ' ') + type;
    };
});
const deprecatedWarnings = {};
/**
 * Transitional option validator
 *
 * @param {function|boolean?} validator - set to false if the transitional option has been removed
 * @param {string?} version - deprecated version / removed since version
 * @param {string?} message - some message with additional info
 *
 * @returns {function}
 */ validators.transitional = function transitional(validator, version, message) {
    function formatMessage(opt, desc) {
        return '[Axios v' + (0, _dataJs.VERSION) + "] Transitional option '" + opt + "'" + desc + (message ? '. ' + message : '');
    }
    // eslint-disable-next-line func-names
    return (value, opt, opts)=>{
        if (validator === false) throw new (0, _axiosErrorJsDefault.default)(formatMessage(opt, ' has been removed' + (version ? ' in ' + version : '')), (0, _axiosErrorJsDefault.default).ERR_DEPRECATED);
        if (version && !deprecatedWarnings[opt]) {
            deprecatedWarnings[opt] = true;
            // eslint-disable-next-line no-console
            console.warn(formatMessage(opt, ' has been deprecated since v' + version + ' and will be removed in the near future'));
        }
        return validator ? validator(value, opt, opts) : true;
    };
};
validators.spelling = function spelling(correctSpelling) {
    return (value, opt)=>{
        // eslint-disable-next-line no-console
        console.warn(`${opt} is likely a misspelling of ${correctSpelling}`);
        return true;
    };
};
/**
 * Assert object's properties type
 *
 * @param {object} options
 * @param {object} schema
 * @param {boolean?} allowUnknown
 *
 * @returns {object}
 */ function assertOptions(options, schema, allowUnknown) {
    if (typeof options !== 'object' || options === null) throw new (0, _axiosErrorJsDefault.default)('options must be an object', (0, _axiosErrorJsDefault.default).ERR_BAD_OPTION_VALUE);
    const keys = Object.keys(options);
    let i = keys.length;
    while(i-- > 0){
        const opt = keys[i];
        // Use hasOwnProperty so a polluted Object.prototype.<opt> cannot supply
        // a non-function validator and cause a TypeError.
        const validator = Object.prototype.hasOwnProperty.call(schema, opt) ? schema[opt] : undefined;
        if (validator) {
            const value = options[opt];
            const result = value === undefined || validator(value, opt, options);
            if (result !== true) throw new (0, _axiosErrorJsDefault.default)('option ' + opt + ' must be ' + result, (0, _axiosErrorJsDefault.default).ERR_BAD_OPTION_VALUE);
            continue;
        }
        if (allowUnknown !== true) throw new (0, _axiosErrorJsDefault.default)('Unknown option ' + opt, (0, _axiosErrorJsDefault.default).ERR_BAD_OPTION);
    }
}
exports.default = {
    assertOptions,
    validators
};

},{"../env/data.js":"9SLyZ","../core/AxiosError.js":"7z85x","@parcel/transformer-js/src/esmodule-helpers.js":"jnFvT"}],"kSqbX":[function(require,module,exports,__globalThis) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
var _canceledErrorJs = require("./CanceledError.js");
var _canceledErrorJsDefault = parcelHelpers.interopDefault(_canceledErrorJs);
'use strict';
/**
 * A `CancelToken` is an object that can be used to request cancellation of an operation.
 *
 * @param {Function} executor The executor function.
 *
 * @returns {CancelToken}
 */ class CancelToken {
    constructor(executor){
        if (typeof executor !== 'function') throw new TypeError('executor must be a function.');
        let resolvePromise;
        this.promise = new Promise(function promiseExecutor(resolve) {
            resolvePromise = resolve;
        });
        const token = this;
        // eslint-disable-next-line func-names
        this.promise.then((cancel)=>{
            if (!token._listeners) return;
            let i = token._listeners.length;
            while(i-- > 0)token._listeners[i](cancel);
            token._listeners = null;
        });
        // eslint-disable-next-line func-names
        this.promise.then = (onfulfilled)=>{
            let _resolve;
            // eslint-disable-next-line func-names
            const promise = new Promise((resolve)=>{
                token.subscribe(resolve);
                _resolve = resolve;
            }).then(onfulfilled);
            promise.cancel = function reject() {
                token.unsubscribe(_resolve);
            };
            return promise;
        };
        executor(function cancel(message, config, request) {
            if (token.reason) // Cancellation has already been requested
            return;
            token.reason = new (0, _canceledErrorJsDefault.default)(message, config, request);
            resolvePromise(token.reason);
        });
    }
    /**
   * Throws a `CanceledError` if cancellation has been requested.
   */ throwIfRequested() {
        if (this.reason) throw this.reason;
    }
    /**
   * Subscribe to the cancel signal
   */ subscribe(listener) {
        if (this.reason) {
            listener(this.reason);
            return;
        }
        if (this._listeners) this._listeners.push(listener);
        else this._listeners = [
            listener
        ];
    }
    /**
   * Unsubscribe from the cancel signal
   */ unsubscribe(listener) {
        if (!this._listeners) return;
        const index = this._listeners.indexOf(listener);
        if (index !== -1) this._listeners.splice(index, 1);
    }
    toAbortSignal() {
        const controller = new AbortController();
        const abort = (err)=>{
            controller.abort(err);
        };
        this.subscribe(abort);
        controller.signal.unsubscribe = ()=>this.unsubscribe(abort);
        return controller.signal;
    }
    /**
   * Returns an object that contains a new `CancelToken` and a function that, when called,
   * cancels the `CancelToken`.
   */ static source() {
        let cancel;
        const token = new CancelToken(function executor(c) {
            cancel = c;
        });
        return {
            token,
            cancel
        };
    }
}
exports.default = CancelToken;

},{"./CanceledError.js":"9yG1c","@parcel/transformer-js/src/esmodule-helpers.js":"jnFvT"}],"i5yWF":[function(require,module,exports,__globalThis) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "default", ()=>spread);
'use strict';
function spread(callback) {
    return function wrap(arr) {
        return callback.apply(null, arr);
    };
}

},{"@parcel/transformer-js/src/esmodule-helpers.js":"jnFvT"}],"2FN3e":[function(require,module,exports,__globalThis) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "default", ()=>isAxiosError);
var _utilsJs = require("../utils.js");
var _utilsJsDefault = parcelHelpers.interopDefault(_utilsJs);
'use strict';
function isAxiosError(payload) {
    return (0, _utilsJsDefault.default).isObject(payload) && payload.isAxiosError === true;
}

},{"../utils.js":"jI6DP","@parcel/transformer-js/src/esmodule-helpers.js":"jnFvT"}],"7tr76":[function(require,module,exports,__globalThis) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
const HttpStatusCode = {
    Continue: 100,
    SwitchingProtocols: 101,
    Processing: 102,
    EarlyHints: 103,
    Ok: 200,
    Created: 201,
    Accepted: 202,
    NonAuthoritativeInformation: 203,
    NoContent: 204,
    ResetContent: 205,
    PartialContent: 206,
    MultiStatus: 207,
    AlreadyReported: 208,
    ImUsed: 226,
    MultipleChoices: 300,
    MovedPermanently: 301,
    Found: 302,
    SeeOther: 303,
    NotModified: 304,
    UseProxy: 305,
    Unused: 306,
    TemporaryRedirect: 307,
    PermanentRedirect: 308,
    BadRequest: 400,
    Unauthorized: 401,
    PaymentRequired: 402,
    Forbidden: 403,
    NotFound: 404,
    MethodNotAllowed: 405,
    NotAcceptable: 406,
    ProxyAuthenticationRequired: 407,
    RequestTimeout: 408,
    Conflict: 409,
    Gone: 410,
    LengthRequired: 411,
    PreconditionFailed: 412,
    /**
   * @deprecated Use `ContentTooLarge` instead.
   */ PayloadTooLarge: 413,
    ContentTooLarge: 413,
    UriTooLong: 414,
    UnsupportedMediaType: 415,
    RangeNotSatisfiable: 416,
    ExpectationFailed: 417,
    ImATeapot: 418,
    MisdirectedRequest: 421,
    /**
   * @deprecated Use `UnprocessableContent` instead.
   */ UnprocessableEntity: 422,
    UnprocessableContent: 422,
    Locked: 423,
    FailedDependency: 424,
    TooEarly: 425,
    UpgradeRequired: 426,
    PreconditionRequired: 428,
    TooManyRequests: 429,
    RequestHeaderFieldsTooLarge: 431,
    UnavailableForLegalReasons: 451,
    InternalServerError: 500,
    NotImplemented: 501,
    BadGateway: 502,
    ServiceUnavailable: 503,
    GatewayTimeout: 504,
    HttpVersionNotSupported: 505,
    VariantAlsoNegotiates: 506,
    InsufficientStorage: 507,
    LoopDetected: 508,
    NotExtended: 510,
    NetworkAuthenticationRequired: 511,
    WebServerReturnsAnUnknownError: 520,
    WebServerIsDown: 521,
    ConnectionTimedOut: 522,
    OriginIsUnreachable: 523,
    TimeoutOccurred: 524,
    SslHandshakeFailed: 525,
    InvalidSslCertificate: 526
};
Object.entries(HttpStatusCode).forEach(([key, value])=>{
    if (HttpStatusCode[value] === undefined) HttpStatusCode[value] = key;
});
exports.default = HttpStatusCode;

},{"@parcel/transformer-js/src/esmodule-helpers.js":"jnFvT"}],"bDKEb":[function(require,module,exports,__globalThis) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "showAlert", ()=>showAlert);
parcelHelpers.export(exports, "hideAlert", ()=>hideAlert);
const showAlert = (type, msg)=>{
    hideAlert();
    const markup = `<div class="alert alert--${type}">${msg}</div> `;
    document.querySelector('body').insertAdjacentHTML('afterbegin', markup);
    window.setTimeout(()=>{
        hideAlert();
    }, 5000);
};
const hideAlert = ()=>{
    const el = document.querySelector('.alert');
    if (el) el.parentElement.removeChild(el);
};

},{"@parcel/transformer-js/src/esmodule-helpers.js":"jnFvT"}],"btId7":[function(require,module,exports,__globalThis) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "initMap", ()=>initMap);
const initMap = (mapContainer)=>{
    const mapboxAccessToken = mapContainer.dataset.mapboxToken;
    if (!mapboxAccessToken) throw new Error('MAPBOX_ACCESS_TOKEN is not configured on the server');
    const locations = JSON.parse(mapContainer.dataset.locations);
    console.log(locations);
    const map = new mapboxgl.Map({
        accessToken: mapboxAccessToken,
        container: 'map',
        // center: [78.327152, 17.472882], // starting position [lng, lat]. Note that lat must be set between -90 and 90
        // zoom: 12, // starting zoom
        style: 'mapbox://styles/shino1960/cmvv0m1ev000l01r1bl6dchu4',
        scrollZoom: false
    });
    const bounds = new mapboxgl.LngLatBounds();
    locations.forEach((loc)=>{
        //add marker
        const el = document.createElement('div');
        el.className = 'marker';
        new mapboxgl.Marker({
            element: el,
            anchor: 'bottom'
        }).setLngLat(loc.coordinates).addTo(map);
        new mapboxgl.Popup({
            offset: 30
        }).setLngLat(loc.coordinates).setHTML(`<p>Day ${loc.day}: ${loc.description}</p>`).addTo(map);
        bounds.extend(loc.coordinates);
    });
    map.fitBounds(bounds, {
        padding: {
            top: 200,
            bottom: 150,
            left: 100,
            right: 100
        }
    });
};

},{"@parcel/transformer-js/src/esmodule-helpers.js":"jnFvT"}],"3d1Ox":[function(require,module,exports,__globalThis) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "updateSettings", ()=>updateSettings);
var _alerts = require("./alerts");
var _axios = require("axios");
var _axiosDefault = parcelHelpers.interopDefault(_axios);
const updateSettings = async (data, type)=>{
    try {
        const url = type === 'password' ? '/api/v1/users/updatePassword' : '/api/v1/users/updateMe';
        const res = await (0, _axiosDefault.default)({
            method: 'PATCH',
            url,
            data
        });
        if (res.data.status == 'success') // location.reload(true);
        (0, _alerts.showAlert)('success', `${type.toUpperCase()} updated succesfully`);
    } catch (err) {
        (0, _alerts.showAlert)('error', 'Failed to udpate User Data, Please try again!');
    }
};

},{"./alerts":"bDKEb","axios":"kooH4","@parcel/transformer-js/src/esmodule-helpers.js":"jnFvT"}],"fpv5n":[function(require,module,exports,__globalThis) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "initClientRzrPay", ()=>initClientRzrPay);
parcelHelpers.export(exports, "requestOrder", ()=>requestOrder);
var _axios = require("axios");
var _axiosDefault = parcelHelpers.interopDefault(_axios);
const initClientRzrPay = function(data) {
    var options = {
        key: data.key,
        order_id: data.order.id,
        amount: data.order.amount,
        currency: data.order.currency,
        name: 'Natours',
        description: data.tour.name,
        image: '/img/logo-green.png',
        prefill: {
            name: data.customer.name,
            email: data.customer.email
        },
        handler: async function(payment) {
            try {
                const result = await (0, _axiosDefault.default).post('/api/v1/bookings/verify-payment', payment);
                if (result.data.status === 'success') window.location.assign('/');
            } catch (error) {
                alert(error.response?.data?.message || 'Unable to verify payment. Please contact support.');
            }
        },
        modal: {
            ondismiss () {
                window.location.assign(`/tour/${data.tour.slug}`);
            }
        },
        theme: {
            color: '#55c57a'
        }
    };
    const checkout = new window.Razorpay(options);
    checkout.on('payment.failed', ({ error })=>{
        console.error('Razorpay payment failed:', {
            code: error.code,
            description: error.description,
            source: error.source,
            step: error.step,
            reason: error.reason
        });
    });
    return checkout;
};
const requestOrder = async function(bookTourBtn) {
    try {
        const tourId = bookTourBtn.dataset.tourId;
        const { data } = await (0, _axiosDefault.default).get(`/api/v1/bookings/checkout-session/${tourId}`);
        const checkout = initClientRzrPay(data);
        checkout.open();
    } catch (error) {
        alert(error.response?.data?.message || 'Unable to open checkout');
    } finally{
        bookTourBtn.disabled = false;
    }
};

},{"axios":"kooH4","@parcel/transformer-js/src/esmodule-helpers.js":"jnFvT"}]},["8xXkV"], "8xXkV", "parcelRequire11c7", {})

//# sourceMappingURL=bundle.js.map
