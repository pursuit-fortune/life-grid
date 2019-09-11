'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

if (typeof Object.assign !== 'function') {
  // Must be writable: true, enumerable: false, configurable: true
  Object.assign = function (target) {
    var arguments$1 = arguments;
    // .length of function is 2
    if (target == null) {
      // TypeError if undefined or null
      throw new TypeError('Cannot convert undefined or null to object');
    }

    var to = Object(target);

    for (var index = 1; index < arguments.length; index++) {
      var nextSource = arguments$1[index];

      if (nextSource != null) {
        // Skip over if undefined or null
        for (var nextKey in nextSource) {
          // Avoid bugs when hasOwnProperty is shadowed
          if (Object.prototype.hasOwnProperty.call(nextSource, nextKey)) {
            to[nextKey] = nextSource[nextKey];
          }
        }
      }
    }
    return to;
  };
}

if (typeof Object.defineProperties !== 'function') {
  Object.defineProperties = function (obj, properties) {
    function convertToDescriptor(desc) {
      function hasProperty(obj, prop) {
        return Object.prototype.hasOwnProperty.call(obj, prop);
      }

      function isCallable(v) {
        // NB: modify as necessary if other values than functions are callable.
        return typeof v === 'function';
      }

      if (typeof desc !== 'object' || desc === null) {
        throw new TypeError('bad desc');
      }

      var d = {};

      if (hasProperty(desc, 'enumerable')) {
        d.enumerable = !!desc.enumerable;
      }
      if (hasProperty(desc, 'configurable')) {
        d.configurable = !!desc.configurable;
      }
      if (hasProperty(desc, 'value')) {
        d.value = desc.value;
      }
      if (hasProperty(desc, 'writable')) {
        d.writable = !!desc.writable;
      }
      if (hasProperty(desc, 'get')) {
        var g = desc.get;

        if (!isCallable(g) && typeof g !== 'undefined') {
          throw new TypeError('bad get');
        }
        d.get = g;
      }
      if (hasProperty(desc, 'set')) {
        var s = desc.set;
        if (!isCallable(s) && typeof s !== 'undefined') {
          throw new TypeError('bad set');
        }
        d.set = s;
      }

      if (('get' in d || 'set' in d) && ('value' in d || 'writable' in d)) {
        throw new TypeError('identity-confused descriptor');
      }

      return d;
    }

    if (typeof obj !== 'object' || obj === null) {
      throw new TypeError('bad obj');
    }

    properties = Object(properties);

    var keys = Object.keys(properties);
    var descs = [];

    for (var i = 0; i < keys.length; i++) {
      descs.push([keys[i], convertToDescriptor(properties[keys[i]])]);
    }

    for (var i = 0; i < descs.length; i++) {
      Object.defineProperty(obj, descs[i][0], descs[i][1]);
    }

    return obj;
  };
}

/* eslint-disable */
/**
 * lodash (Custom Build) <https://lodash.com/>
 * Build: `lodash modularize exports="npm" -o ./`
 * Copyright jQuery Foundation and other contributors <https://jquery.org/>
 * Released under MIT license <https://lodash.com/license>
 * Based on Underscore.js 1.8.3 <http://underscorejs.org/LICENSE>
 */

/** Used as the `TypeError` message for "Functions" methods. */
var FUNC_ERROR_TEXT = 'Expected a function';

/** Used to stand-in for `undefined` hash values. */
var HASH_UNDEFINED = '__lodash_hash_undefined__';

/** Used as references for various `Number` constants. */
var INFINITY = Infinity;

/** `Object#toString` result references. */
var funcTag = '[object Function]',
    genTag = '[object GeneratorFunction]',
    symbolTag = '[object Symbol]';

/** Used to match property names within property paths. */
var reLeadingDot = /^\./,
    rePropName = /[^.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|$))/g;

/**
 * Used to match `RegExp`
 * [syntax characters](http://ecma-international.org/ecma-262/7.0/#sec-patterns).
 */
var reRegExpChar = /[\\^$.*+?()[\]{}|]/g;

/** Used to match backslashes in property paths. */
var reEscapeChar = /\\(\\)?/g;

/** Used to detect host constructors (Safari). */
var reIsHostCtor = /^\[object .+?Constructor\]$/;

/** Detect free variable `global` from Node.js. */
var freeGlobal = typeof global === 'object' && global && global.Object === Object && global;

/** Detect free variable `self`. */
var freeSelf = typeof self === 'object' && self && self.Object === Object && self;

/** Used as a reference to the global object. */
var root = freeGlobal || freeSelf || Function('return this')();

/** Used as references for various `Number` constants. */
var MAX_SAFE_INTEGER = 9007199254740991;

/** Used to detect unsigned integer values. */
var reIsUint = /^(?:0|[1-9]\d*)$/;

/**
 * Gets the value at `key` of `object`.
 *
 * @private
 * @param {Object} [object] The object to query.
 * @param {string} key The key of the property to get.
 * @returns {*} Returns the property value.
 */
function getValue(object, key) {
  return object == null ? undefined : object[key];
}

/**
 * Checks if `value` is a host object in IE < 9.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a host object, else `false`.
 */
function isHostObject(value) {
  // Many host objects are `Object` objects that can coerce to strings
  // despite having improperly defined `toString` methods.
  var result = false;
  if (value != null && typeof value.toString !== 'function') {
    try {
      result = !!(value + '');
    } catch (e) {}
  }
  return result;
}

/** Used for built-in method references. */
var arrayProto = Array.prototype,
    funcProto = Function.prototype,
    objectProto = Object.prototype;

/** Used to detect overreaching core-js shims. */
var coreJsData = root['__core-js_shared__'];

/** Used to detect methods masquerading as native. */
var maskSrcKey = function () {
  var uid = /[^.]+$/.exec(coreJsData && coreJsData.keys && coreJsData.keys.IE_PROTO || '');
  return uid ? 'Symbol(src)_1.' + uid : '';
}();

/** Used to resolve the decompiled source of functions. */
var funcToString = funcProto.toString;

/** Used to check objects for own properties. */
var hasOwnProperty = objectProto.hasOwnProperty;

/**
 * Used to resolve the
 * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
 * of values.
 */
var objectToString = objectProto.toString;

/** Used to detect if a method is native. */
var reIsNative = RegExp('^' + funcToString.call(hasOwnProperty).replace(reRegExpChar, '\\$&').replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, '$1.*?') + '$');

/** Built-in value references. */
var Symbol = root.Symbol,
    splice = arrayProto.splice;

/* Built-in method references that are verified to be native. */
var Map = getNative(root, 'Map'),
    nativeCreate = getNative(Object, 'create');

/** Used to convert symbols to primitives and strings. */
var symbolProto = Symbol ? Symbol.prototype : undefined,
    symbolToString = symbolProto ? symbolProto.toString : undefined;

/**
 * Creates a hash object.
 *
 * @private
 * @constructor
 * @param {Array} [entries] The key-value pairs to cache.
 */
function Hash(entries) {
  var index = -1,
      length = entries ? entries.length : 0;

  this.clear();
  while (++index < length) {
    var entry = entries[index];
    this.set(entry[0], entry[1]);
  }
}

/**
 * Removes all key-value entries from the hash.
 *
 * @private
 * @name clear
 * @memberOf Hash
 */
function hashClear() {
  this.__data__ = nativeCreate ? nativeCreate(null) : {};
}

/**
 * Removes `key` and its value from the hash.
 *
 * @private
 * @name delete
 * @memberOf Hash
 * @param {Object} hash The hash to modify.
 * @param {string} key The key of the value to remove.
 * @returns {boolean} Returns `true` if the entry was removed, else `false`.
 */
function hashDelete(key) {
  return this.has(key) && delete this.__data__[key];
}

/**
 * Gets the hash value for `key`.
 *
 * @private
 * @name get
 * @memberOf Hash
 * @param {string} key The key of the value to get.
 * @returns {*} Returns the entry value.
 */
function hashGet(key) {
  var data = this.__data__;
  if (nativeCreate) {
    var result = data[key];
    return result === HASH_UNDEFINED ? undefined : result;
  }
  return hasOwnProperty.call(data, key) ? data[key] : undefined;
}

/**
 * Checks if a hash value for `key` exists.
 *
 * @private
 * @name has
 * @memberOf Hash
 * @param {string} key The key of the entry to check.
 * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
 */
function hashHas(key) {
  var data = this.__data__;
  return nativeCreate ? data[key] !== undefined : hasOwnProperty.call(data, key);
}

/**
 * Sets the hash `key` to `value`.
 *
 * @private
 * @name set
 * @memberOf Hash
 * @param {string} key The key of the value to set.
 * @param {*} value The value to set.
 * @returns {Object} Returns the hash instance.
 */
function hashSet(key, value) {
  var data = this.__data__;
  data[key] = nativeCreate && value === undefined ? HASH_UNDEFINED : value;
  return this;
}

// Add methods to `Hash`.
Hash.prototype.clear = hashClear;
Hash.prototype['delete'] = hashDelete;
Hash.prototype.get = hashGet;
Hash.prototype.has = hashHas;
Hash.prototype.set = hashSet;

/**
 * Creates an list cache object.
 *
 * @private
 * @constructor
 * @param {Array} [entries] The key-value pairs to cache.
 */
function ListCache(entries) {
  var index = -1,
      length = entries ? entries.length : 0;

  this.clear();
  while (++index < length) {
    var entry = entries[index];
    this.set(entry[0], entry[1]);
  }
}

/**
 * Removes all key-value entries from the list cache.
 *
 * @private
 * @name clear
 * @memberOf ListCache
 */
function listCacheClear() {
  this.__data__ = [];
}

/**
 * Removes `key` and its value from the list cache.
 *
 * @private
 * @name delete
 * @memberOf ListCache
 * @param {string} key The key of the value to remove.
 * @returns {boolean} Returns `true` if the entry was removed, else `false`.
 */
function listCacheDelete(key) {
  var data = this.__data__,
      index = assocIndexOf(data, key);

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

/**
 * Gets the list cache value for `key`.
 *
 * @private
 * @name get
 * @memberOf ListCache
 * @param {string} key The key of the value to get.
 * @returns {*} Returns the entry value.
 */
function listCacheGet(key) {
  var data = this.__data__,
      index = assocIndexOf(data, key);

  return index < 0 ? undefined : data[index][1];
}

/**
 * Checks if a list cache value for `key` exists.
 *
 * @private
 * @name has
 * @memberOf ListCache
 * @param {string} key The key of the entry to check.
 * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
 */
function listCacheHas(key) {
  return assocIndexOf(this.__data__, key) > -1;
}

/**
 * Sets the list cache `key` to `value`.
 *
 * @private
 * @name set
 * @memberOf ListCache
 * @param {string} key The key of the value to set.
 * @param {*} value The value to set.
 * @returns {Object} Returns the list cache instance.
 */
function listCacheSet(key, value) {
  var data = this.__data__,
      index = assocIndexOf(data, key);

  if (index < 0) {
    data.push([key, value]);
  } else {
    data[index][1] = value;
  }
  return this;
}

// Add methods to `ListCache`.
ListCache.prototype.clear = listCacheClear;
ListCache.prototype['delete'] = listCacheDelete;
ListCache.prototype.get = listCacheGet;
ListCache.prototype.has = listCacheHas;
ListCache.prototype.set = listCacheSet;

/**
 * Creates a map cache object to store key-value pairs.
 *
 * @private
 * @constructor
 * @param {Array} [entries] The key-value pairs to cache.
 */
function MapCache(entries) {
  var index = -1,
      length = entries ? entries.length : 0;

  this.clear();
  while (++index < length) {
    var entry = entries[index];
    this.set(entry[0], entry[1]);
  }
}

/**
 * Removes all key-value entries from the map.
 *
 * @private
 * @name clear
 * @memberOf MapCache
 */
function mapCacheClear() {
  this.__data__ = {
    hash: new Hash(),
    map: new (Map || ListCache)(),
    string: new Hash()
  };
}

/**
 * Removes `key` and its value from the map.
 *
 * @private
 * @name delete
 * @memberOf MapCache
 * @param {string} key The key of the value to remove.
 * @returns {boolean} Returns `true` if the entry was removed, else `false`.
 */
function mapCacheDelete(key) {
  return getMapData(this, key)['delete'](key);
}

/**
 * Gets the map value for `key`.
 *
 * @private
 * @name get
 * @memberOf MapCache
 * @param {string} key The key of the value to get.
 * @returns {*} Returns the entry value.
 */
function mapCacheGet(key) {
  return getMapData(this, key).get(key);
}

/**
 * Checks if a map value for `key` exists.
 *
 * @private
 * @name has
 * @memberOf MapCache
 * @param {string} key The key of the entry to check.
 * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
 */
function mapCacheHas(key) {
  return getMapData(this, key).has(key);
}

/**
 * Sets the map `key` to `value`.
 *
 * @private
 * @name set
 * @memberOf MapCache
 * @param {string} key The key of the value to set.
 * @param {*} value The value to set.
 * @returns {Object} Returns the map cache instance.
 */
function mapCacheSet(key, value) {
  getMapData(this, key).set(key, value);
  return this;
}

// Add methods to `MapCache`.
MapCache.prototype.clear = mapCacheClear;
MapCache.prototype['delete'] = mapCacheDelete;
MapCache.prototype.get = mapCacheGet;
MapCache.prototype.has = mapCacheHas;
MapCache.prototype.set = mapCacheSet;

/**
 * Gets the index at which the `key` is found in `array` of key-value pairs.
 *
 * @private
 * @param {Array} array The array to inspect.
 * @param {*} key The key to search for.
 * @returns {number} Returns the index of the matched value, else `-1`.
 */
function assocIndexOf(array, key) {
  var length = array.length;
  while (length--) {
    if (eq(array[length][0], key)) {
      return length;
    }
  }
  return -1;
}

/**
 * The base implementation of `_.isNative` without bad shim checks.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a native function,
 *  else `false`.
 */
function baseIsNative(value) {
  if (!isObject(value) || isMasked(value)) {
    return false;
  }
  var pattern = isFunction(value) || isHostObject(value) ? reIsNative : reIsHostCtor;
  return pattern.test(toSource(value));
}

/**
 * The base implementation of `_.toString` which doesn't convert nullish
 * values to empty strings.
 *
 * @private
 * @param {*} value The value to process.
 * @returns {string} Returns the string.
 */
function baseToString(value) {
  // Exit early for strings to avoid a performance hit in some environments.
  if (typeof value === 'string') {
    return value;
  }
  if (isSymbol(value)) {
    return symbolToString ? symbolToString.call(value) : '';
  }
  var result = value + '';
  return result == '0' && 1 / value == -Infinity ? '-0' : result;
}

/**
 * Casts `value` to a path array if it's not one.
 *
 * @private
 * @param {*} value The value to inspect.
 * @returns {Array} Returns the cast property path array.
 */
function castPath(value) {
  return isArray(value) ? value : stringToPath(value);
}

/**
 * Gets the data for `map`.
 *
 * @private
 * @param {Object} map The map to query.
 * @param {string} key The reference key.
 * @returns {*} Returns the map data.
 */
function getMapData(map, key) {
  var data = map.__data__;
  return isKeyable(key) ? data[typeof key === 'string' ? 'string' : 'hash'] : data.map;
}

/**
 * Gets the native function at `key` of `object`.
 *
 * @private
 * @param {Object} object The object to query.
 * @param {string} key The key of the method to get.
 * @returns {*} Returns the function if it's native, else `undefined`.
 */
function getNative(object, key) {
  var value = getValue(object, key);
  return baseIsNative(value) ? value : undefined;
}

/**
 * Checks if `value` is suitable for use as unique object key.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is suitable, else `false`.
 */
function isKeyable(value) {
  var type = typeof value;
  return type == 'string' || type == 'number' || type == 'symbol' || type == 'boolean' ? value !== '__proto__' : value === null;
}

/**
 * Checks if `func` has its source masked.
 *
 * @private
 * @param {Function} func The function to check.
 * @returns {boolean} Returns `true` if `func` is masked, else `false`.
 */
function isMasked(func) {
  return !!maskSrcKey && maskSrcKey in func;
}

/**
 * Converts `string` to a property path array.
 *
 * @private
 * @param {string} string The string to convert.
 * @returns {Array} Returns the property path array.
 */
var stringToPath = memoize(function (string) {
  string = toString(string);

  var result = [];
  if (reLeadingDot.test(string)) {
    result.push('');
  }
  string.replace(rePropName, function (match, number, quote, string) {
    result.push(quote ? string.replace(reEscapeChar, '$1') : number || match);
  });
  return result;
});

/**
 * Converts `value` to a string key if it's not a string or symbol.
 *
 * @private
 * @param {*} value The value to inspect.
 * @returns {string|symbol} Returns the key.
 */
function toKey(value) {
  if (typeof value === 'string' || isSymbol(value)) {
    return value;
  }
  var result = value + '';
  return result == '0' && 1 / value == -Infinity ? '-0' : result;
}

/**
 * Converts `func` to its source code.
 *
 * @private
 * @param {Function} func The function to process.
 * @returns {string} Returns the source code.
 */
function toSource(func) {
  if (func != null) {
    try {
      return funcToString.call(func);
    } catch (e) {}
    try {
      return func + '';
    } catch (e) {}
  }
  return '';
}

/**
 * Creates a function that memoizes the result of `func`. If `resolver` is
 * provided, it determines the cache key for storing the result based on the
 * arguments provided to the memoized function. By default, the first argument
 * provided to the memoized function is used as the map cache key. The `func`
 * is invoked with the `this` binding of the memoized function.
 *
 * **Note:** The cache is exposed as the `cache` property on the memoized
 * function. Its creation may be customized by replacing the `_.memoize.Cache`
 * constructor with one whose instances implement the
 * [`Map`](http://ecma-international.org/ecma-262/7.0/#sec-properties-of-the-map-prototype-object)
 * method interface of `delete`, `get`, `has`, and `set`.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Function
 * @param {Function} func The function to have its output memoized.
 * @param {Function} [resolver] The function to resolve the cache key.
 * @returns {Function} Returns the new memoized function.
 * @example
 *
 * var object = { 'a': 1, 'b': 2 };
 * var other = { 'c': 3, 'd': 4 };
 *
 * var values = _.memoize(_.values);
 * values(object);
 * // => [1, 2]
 *
 * values(other);
 * // => [3, 4]
 *
 * object.a = 2;
 * values(object);
 * // => [1, 2]
 *
 * // Modify the result cache.
 * values.cache.set(object, ['a', 'b']);
 * values(object);
 * // => ['a', 'b']
 *
 * // Replace `_.memoize.Cache`.
 * _.memoize.Cache = WeakMap;
 */
function memoize(func, resolver) {
  if (typeof func !== 'function' || resolver && typeof resolver !== 'function') {
    throw new TypeError(FUNC_ERROR_TEXT);
  }
  var memoized = function () {
    var args = arguments,
        key = resolver ? resolver.apply(this, args) : args[0],
        cache = memoized.cache;

    if (cache.has(key)) {
      return cache.get(key);
    }
    var result = func.apply(this, args);
    memoized.cache = cache.set(key, result);
    return result;
  };
  memoized.cache = new (memoize.Cache || MapCache)();
  return memoized;
}

// Assign cache to `_.memoize`.
memoize.Cache = MapCache;

/**
 * Performs a
 * [`SameValueZero`](http://ecma-international.org/ecma-262/7.0/#sec-samevaluezero)
 * comparison between two values to determine if they are equivalent.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to compare.
 * @param {*} other The other value to compare.
 * @returns {boolean} Returns `true` if the values are equivalent, else `false`.
 * @example
 *
 * var object = { 'a': 1 };
 * var other = { 'a': 1 };
 *
 * _.eq(object, object);
 * // => true
 *
 * _.eq(object, other);
 * // => false
 *
 * _.eq('a', 'a');
 * // => true
 *
 * _.eq('a', Object('a'));
 * // => false
 *
 * _.eq(NaN, NaN);
 * // => true
 */
function eq(value, other) {
  return value === other || value !== value && other !== other;
}

/**
 * Checks if `value` is classified as an `Array` object.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an array, else `false`.
 * @example
 *
 * _.isArray([1, 2, 3]);
 * // => true
 *
 * _.isArray(document.body.children);
 * // => false
 *
 * _.isArray('abc');
 * // => false
 *
 * _.isArray(_.noop);
 * // => false
 */
var isArray = Array.isArray;

/**
 * Checks if `value` is classified as a `Function` object.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a function, else `false`.
 * @example
 *
 * _.isFunction(_);
 * // => true
 *
 * _.isFunction(/abc/);
 * // => false
 */
function isFunction(value) {
  // The use of `Object#toString` avoids issues with the `typeof` operator
  // in Safari 8-9 which returns 'object' for typed array and other constructors.
  var tag = isObject(value) ? objectToString.call(value) : '';
  return tag == funcTag || tag == genTag;
}

/**
 * Checks if `value` is the
 * [language type](http://www.ecma-international.org/ecma-262/7.0/#sec-ecmascript-language-types)
 * of `Object`. (e.g. arrays, functions, objects, regexes, `new Number(0)`, and `new String('')`)
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an object, else `false`.
 * @example
 *
 * _.isObject({});
 * // => true
 *
 * _.isObject([1, 2, 3]);
 * // => true
 *
 * _.isObject(_.noop);
 * // => true
 *
 * _.isObject(null);
 * // => false
 */
function isObject(value) {
  var type = typeof value;
  return !!value && (type == 'object' || type == 'function');
}

/**
 * Checks if `value` is object-like. A value is object-like if it's not `null`
 * and has a `typeof` result of "object".
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is object-like, else `false`.
 * @example
 *
 * _.isObjectLike({});
 * // => true
 *
 * _.isObjectLike([1, 2, 3]);
 * // => true
 *
 * _.isObjectLike(_.noop);
 * // => false
 *
 * _.isObjectLike(null);
 * // => false
 */
function isObjectLike(value) {
  return !!value && typeof value === 'object';
}

/**
 * Checks if `value` is classified as a `Symbol` primitive or object.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a symbol, else `false`.
 * @example
 *
 * _.isSymbol(Symbol.iterator);
 * // => true
 *
 * _.isSymbol('abc');
 * // => false
 */
function isSymbol(value) {
  return typeof value === 'symbol' || isObjectLike(value) && objectToString.call(value) == symbolTag;
}

/**
 * Converts `value` to a string. An empty string is returned for `null`
 * and `undefined` values. The sign of `-0` is preserved.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to process.
 * @returns {string} Returns the string.
 * @example
 *
 * _.toString(null);
 * // => ''
 *
 * _.toString(-0);
 * // => '-0'
 *
 * _.toString([1, 2, 3]);
 * // => '1,2,3'
 */
function toString(value) {
  return value == null ? '' : baseToString(value);
}

/**
 * Checks if `value` is a valid array-like index.
 *
 * @private
 * @param {*} value The value to check.
 * @param {number} [length=MAX_SAFE_INTEGER] The upper bounds of a valid index.
 * @returns {boolean} Returns `true` if `value` is a valid index, else `false`.
 */
function isIndex(value, length) {
  var type = typeof value;
  length = length == null ? MAX_SAFE_INTEGER : length;

  return !!length && (type == 'number' || type != 'symbol' && reIsUint.test(value)) && value > -1 && value % 1 == 0 && value < length;
}

/**
 * The base implementation of `assignValue` and `assignMergeValue` without
 * value checks.
 *
 * @private
 * @param {Object} object The object to modify.
 * @param {string} key The key of the property to assign.
 * @param {*} value The value to assign.
 */
function baseAssignValue(object, key, value) {
  if (key == '__proto__') {
    Object.defineProperty(object, key, {
      'configurable': true,
      'enumerable': true,
      'value': value,
      'writable': true
    });
  } else {
    object[key] = value;
  }
}

/** Used to check objects for own properties. */
var hasOwnProperty = Object.prototype.hasOwnProperty;

/**
 * Assigns `value` to `key` of `object` if the existing value is not equivalent
 * using [`SameValueZero`](http://ecma-international.org/ecma-262/7.0/#sec-samevaluezero)
 * for equality comparisons.
 *
 * @private
 * @param {Object} object The object to modify.
 * @param {string} key The key of the property to assign.
 * @param {*} value The value to assign.
 */
function assignValue(object, key, value) {
  var objValue = object[key];
  if (!(hasOwnProperty.call(object, key) && eq(objValue, value)) || value === undefined && !(key in object)) {
    baseAssignValue(object, key, value);
  }
}

/**
 * The base implementation of `set`.
 *
 * @private
 * @param {Object} object The object to modify.
 * @param {Array|string} path The path of the property to set.
 * @param {*} value The value to set.
 * @param {Function} [customizer] The function to customize path creation.
 * @returns {Object} Returns `object`.
 */
function baseSet(object, path, value, customizer) {
  if (!isObject(object)) {
    return object;
  }
  path = castPath(path, object);

  var length = path.length;
  var lastIndex = length - 1;

  var index = -1;
  var nested = object;

  while (nested != null && ++index < length) {
    var key = toKey(path[index]);
    var newValue = value;

    if (index != lastIndex) {
      var objValue = nested[key];
      newValue = customizer ? customizer(objValue, key, nested) : undefined;
      if (newValue === undefined) {
        newValue = isObject(objValue) ? objValue : isIndex(path[index + 1]) ? [] : {};
      }
    }
    assignValue(nested, key, newValue);
    nested = nested[key];
  }
  return object;
}

/**
 * Sets the value at `path` of `object`. If a portion of `path` doesn't exist,
 * it's created. Arrays are created for missing index properties while objects
 * are created for all other missing properties. Use `setWith` to customize
 * `path` creation.
 *
 * **Note:** This method mutates `object`.
 *
 * @since 3.7.0
 * @category Object
 * @param {Object} object The object to modify.
 * @param {Array|string} path The path of the property to set.
 * @param {*} value The value to set.
 * @returns {Object} Returns `object`.
 * @see has, hasIn, get, unset
 * @example
 *
 * const object = { 'a': [{ 'b': { 'c': 3 } }] }
 *
 * set(object, 'a[0].b.c', 4)
 * console.log(object.a[0].b.c)
 * // => 4
 *
 * set(object, ['x', '0', 'y', 'z'], 5)
 * console.log(object.x[0].y.z)
 * // => 5
 */
function set(object, path, value) {
  return object == null ? object : baseSet(object, path, value);
}

var Events = function Events(opts) {
  if (typeof opts !== 'undefined' && opts.callbacks) {
    this.callbacks = opts.callbacks;
  } else {
    this.callbacks = {};
  }
};

Events.prototype.on = function on(events, callback, context) {
  var calls, event, node, tail, list;
  if (!callback) {
    return this;
  }
  events = events.split(Events.eventSplitter);
  calls = this.callbacks;
  while (event = events.shift()) {
    list = calls[event];
    node = list ? list.tail : {};
    node.next = tail = {};
    node.context = context;
    node.callback = callback;
    calls[event] = {
      tail: tail,
      next: list ? list.next : node
    };
  }
  return this;
};

Events.prototype.once = function once(events, callback, context) {
  var this$1 = this;

  var wrapper = function () {
    var args = [],
        len = arguments.length;
    while (len--) args[len] = arguments[len];

    callback.apply(this$1, args);
    this$1.off(events, wrapper, context);
  };

  this.on(events, wrapper, context);

  return this;
};

Events.prototype.off = function off(events, callback, context) {
  var event, calls, node, tail, cb, ctx;
  if (!(calls = this.callbacks)) {
    return this;
  }
  if (!(events || callback || context)) {
    delete this.callbacks;
    return this;
  }
  events = events ? events.split(Events.eventSplitter) : Object.keys(calls);
  while (event = events.shift()) {
    node = calls[event];
    delete calls[event];
    if (!node || !(callback || context)) {
      continue;
    }
    tail = node.tail;
    while ((node = node.next) !== tail) {
      cb = node.callback;
      ctx = node.context;
      if (callback && cb !== callback || context && ctx !== context) {
        this.on(event, cb, ctx);
      }
    }
  }
  return this;
};

Events.prototype.trigger = function trigger(events) {
  var event, node, calls, tail, rest;
  if (!(calls = this.callbacks)) {
    return this;
  }
  events = events.split(Events.eventSplitter);
  rest = [].slice.call(arguments, 1);
  while (event = events.shift()) {
    if (node = calls[event]) {
      tail = node.tail;
      while ((node = node.next) !== tail) {
        node.callback.apply(node.context || this, rest);
      }
    }
  }
  return this;
};

Events.eventSplitter = /\s+/;

var defer = typeof Promise === 'function' ? Promise.prototype.then.bind(Promise.resolve()) : setTimeout;

/* eslint-disable */

/* eslint-disable camelcase */

var eventCenter;
{
  eventCenter = new Events();
}

var TaroLifeCycles;
(function (TaroLifeCycles) {
  TaroLifeCycles["WillMount"] = "componentWillMount";
  TaroLifeCycles["DidMount"] = "componentDidMount";
  TaroLifeCycles["DidShow"] = "componentDidShow";
  TaroLifeCycles["DidHide"] = "componentDidHide";
  TaroLifeCycles["WillUnmount"] = "componentWillUnmount";
})(TaroLifeCycles || (TaroLifeCycles = {}));
var lifecycleMap = {};
lifecycleMap[TaroLifeCycles.WillMount] = ['created', 'onLoad', 'onLanuch'];
lifecycleMap[TaroLifeCycles.DidMount] = ['onReady', 'ready', 'attached'];
lifecycleMap[TaroLifeCycles.DidShow] = ['onShow'];
lifecycleMap[TaroLifeCycles.DidHide] = ['onHide'];
lifecycleMap[TaroLifeCycles.WillUnmount] = ['detached', 'onUnload'];
var lifecycles = new Set();
for (var key in lifecycleMap) {
  var lifecycle = lifecycleMap[key];
  lifecycle.forEach(function (l) {
    return lifecycles.add(l);
  });
}

/**
 * Simple bind, faster than native
 */
function bind(fn /*: Function */, ctx /*: Object */) {
  if (!fn) {
    return false;
  }
  function boundFn(a) {
    var l /*: number */ = arguments.length;
    return l ? l > 1 ? fn.apply(ctx, arguments) : fn.call(ctx, a) : fn.call(ctx);
  }
  // record original fn length
  boundFn._length = fn.length;
  return boundFn;
}
function isEqual(obj1, obj2) {
  return JSON.stringify(obj1) === JSON.stringify(obj2);
}
function noop() {
  var _ = [],
      len = arguments.length;
  while (len--) _[len] = arguments[len];

  //
}
var sharedPropertyDefinition = {
  enumerable: true,
  configurable: true,
  get: noop,
  set: noop
};
function proxy(target, sourceKey, key) {
  sharedPropertyDefinition.get = function proxyGetter() {
    return this[sourceKey][key];
  };
  sharedPropertyDefinition.set = function proxySetter(val) {
    this[sourceKey][key] = val;
  };
  Object.defineProperty(target, key, sharedPropertyDefinition);
}

function defineGetter(component, key, getter) {
  Object.defineProperty(component, key, {
    enumerable: true,
    configurable: true,
    get: function () {
      if (getter === 'props') {
        return component.props;
      }
      return Object.assign({}, component.state, component.props);
    }
  });
}
function isFunction$2(o) {
  return typeof o === 'function';
}
function withWeapp(weappConf) {
  return function (ConnectComponent) {
    var obj;

    var BaseComponent = /*@__PURE__*/function (ConnectComponent) {
      function BaseComponent(props) {
        var this$1 = this;

        ConnectComponent.call(this, props);
        this._observeProps = [];
        // mixins 可以多次调用生命周期
        this.willMounts = [];
        this.didMounts = [];
        this.didHides = [];
        this.didShows = [];
        this.willUnmounts = [];
        this.safeExecute = function (func) {
          var args = [],
              len = arguments.length - 1;
          while (len-- > 0) args[len] = arguments[len + 1];

          if (isFunction$2(func)) {
            func.apply(this$1, args);
          }
        };
        this.selectComponent = function () {
          var ref;

          var args = [],
              len = arguments.length;
          while (len--) args[len] = arguments[len];
          if (this$1.$scope && this$1.$scope.selectComponent) {
            (ref = this$1.$scope).selectComponent.apply(ref, args);
          } else {
            // tslint:disable-next-line: no-console
            console.error("this.$scope 下没有 selectComponent 方法");
          }
        };
        this.getRelationNodes = function () {
          var ref;

          var args = [],
              len = arguments.length;
          while (len--) args[len] = arguments[len];
          if (this$1.$scope && this$1.$scope.getRelationNodes) {
            (ref = this$1.$scope).getRelationNodes.apply(ref, args);
          } else {
            // tslint:disable-next-line: no-console
            console.error("this.$scope 下没有 getRelationNodes 方法");
          }
        };
        this.setData = function (obj, callback) {
          var state = Object.assign({}, this$1.state);
          Object.keys(obj).forEach(function (key) {
            set(state, key, obj[key]);
          });
          this$1.setState(state, callback);
        };
        this.triggerEvent = function (eventName) {
          var args = [],
              len = arguments.length - 1;
          while (len-- > 0) args[len] = arguments[len + 1];

          var func = this$1.props["on" + eventName[0].slice(0, 1).toUpperCase() + eventName.slice(1)];
          if (isFunction$2(func)) {
            func.apply(this$1, args.map(function (a) {
              return { detail: a };
            }));
          }
        };
        this.init(weappConf);
        defineGetter(this, 'data', 'state');
        defineGetter(this, 'properties', 'props');
      }

      if (ConnectComponent) BaseComponent.__proto__ = ConnectComponent;
      BaseComponent.prototype = Object.create(ConnectComponent && ConnectComponent.prototype);
      BaseComponent.prototype.constructor = BaseComponent;
      BaseComponent.prototype.initProps = function initProps(props) {
        for (var propKey in props) {
          if (props.hasOwnProperty(propKey)) {
            var propValue = props[propKey];
            if (!isFunction$2(propValue)) {
              if (propValue.observer) {
                this._observeProps.push({
                  name: propKey,
                  observer: propValue.observer
                });
              }
            }
            proxy(this, 'props', propKey);
          }
        }
      };
      BaseComponent.prototype.init = function init(options) {
        for (var confKey in options) {
          var confValue = options[confKey];
          switch (confKey) {
            case 'externalClasses':
              break;
            case 'data':
              this.state = confValue;
              var keys = Object.keys(this.state);
              var i = keys.length;
              while (i--) {
                var key = keys[i];
                proxy(this, "state", key);
              }
              break;
            case 'properties':
              this.initProps(confValue);
              break;
            case 'methods':
              for (var key$1 in confValue) {
                var method = confValue[key$1];
                this[key$1] = bind(method, this);
              }
              break;
            case 'behaviors':
              // this.initMixins(confValue, options);
              break;
            case 'lifetimes':
              for (var key$2 in confValue) {
                var lifecycle = confValue[key$2];
                this.initLifeCycles(key$2, lifecycle);
              }
              break;
            default:
              if (lifecycles.has(confKey)) {
                var lifecycle$1 = options[confKey];
                this.initLifeCycles(confKey, lifecycle$1);
              } else if (isFunction$2(confValue)) {
                this[confKey] = bind(confValue, this);
              } else {
                this[confKey] = confValue;
              }
              break;
          }
        }
      };
      BaseComponent.prototype.initLifeCycles = function initLifeCycles(lifecycleName, lifecycle) {
        for (var lifecycleKey in lifecycleMap) {
          var cycleNames = lifecycleMap[lifecycleKey];
          if (cycleNames.indexOf(lifecycleName) !== -1) {
            switch (lifecycleKey) {
              case TaroLifeCycles.DidHide:
                this.didHides.push(lifecycle);
                break;
              case TaroLifeCycles.DidMount:
                this.didMounts.push(lifecycle);
                break;
              case TaroLifeCycles.DidShow:
                this.didShows.push(lifecycle);
                break;
              case TaroLifeCycles.WillMount:
                this.willMounts.push(lifecycle);
                break;
              case TaroLifeCycles.WillUnmount:
                this.willUnmounts.push(lifecycle);
                break;
              default:
                break;
            }
          }
        }
        // mixins 不会覆盖已经设置的生命周期，加入到 this 是为了形如 this.created() 的调用
        if (!isFunction$2(this[lifecycleName])) {
          this[lifecycleName] = lifecycle;
        }
      };
      BaseComponent.prototype.executeLifeCycles = function executeLifeCycles(funcs) {
        var ref;

        var args = [],
            len = arguments.length - 1;
        while (len-- > 0) args[len] = arguments[len + 1];
        for (var i = 0; i < funcs.length; i++) {
          var func = funcs[i];
          (ref = this).safeExecute.apply(ref, [func].concat(args));
        }
      };
      BaseComponent.prototype.componentWillMount = function componentWillMount() {
        var this$1 = this;

        this._observeProps.forEach(function (ref) {
          var key = ref.name;
          var observer = ref.observer;

          var prop = this$1.props[key];
          if (typeof observer === 'string') {
            var ob = this$1[observer];
            if (isFunction$2(ob)) {
              ob.call(this$1, prop, prop, key);
            }
          } else if (isFunction$2(observer)) {
            observer.call(this$1, prop, prop, key);
          }
        });
        this.safeExecute.call(this, ConnectComponent.prototype.componentWillMount);
        this.executeLifeCycles(this.willMounts, this.$router.params || {});
      };
      BaseComponent.prototype.componentDidMount = function componentDidMount() {
        this.safeExecute.call(this, ConnectComponent.prototype.componentDidMount);
        this.executeLifeCycles(this.didMounts);
      };
      BaseComponent.prototype.componentWillUnmount = function componentWillUnmount() {
        this.safeExecute.call(this, ConnectComponent.prototype.componentWillUnmount);
        this.executeLifeCycles(this.willUnmounts);
      };
      BaseComponent.prototype.componentDidHide = function componentDidHide() {
        this.safeExecute.call(this, ConnectComponent.prototype.componentDidHide);
        this.executeLifeCycles(this.didHides);
      };
      BaseComponent.prototype.componentDidShow = function componentDidShow() {
        this.safeExecute.call(this, ConnectComponent.prototype.componentDidShow);
        this.executeLifeCycles(this.didShows, this.$router.params || {});
      };
      BaseComponent.prototype.componentWillReceiveProps = function componentWillReceiveProps(nextProps) {
        var this$1 = this;

        this._observeProps.forEach(function (ref) {
          var key = ref.name;
          var observer = ref.observer;

          var prop = this$1.props[key];
          var nextProp = nextProps[key];
          // 小程序是深比较不同之后才 trigger observer
          if (!isEqual(prop, nextProp)) {
            if (typeof observer === 'string') {
              var ob = this$1[observer];
              if (isFunction$2(ob)) {
                ob.call(this$1, nextProp, prop, key);
              }
            } else if (isFunction$2(observer)) {
              observer.call(this$1, nextProp, prop, key);
            }
          }
        });
        this.safeExecute.call(this, ConnectComponent.prototype.componentWillReceiveProps);
      };

      return BaseComponent;
    }(ConnectComponent);
    var props = weappConf['properties'];
    if (props) {
      for (var propKey in props) {
        var propValue = props[propKey];
        if (propValue != null && !isFunction$2(propValue)) {
          if (propValue.value !== undefined) {
            // 如果是 null 也赋值到 defaultProps
            BaseComponent.defaultProps = Object.assign((obj = {}, obj[propKey] = propValue.value, obj), BaseComponent.defaultProps);
          }
        }
      }
    }
    var staticOptions = ['externalClasses', 'relations', 'options'];
    staticOptions.forEach(function (option) {
      var value = weappConf[option];
      if (value != null) {
        BaseComponent[option] = value;
      }
    });
    return BaseComponent;
  };
}

exports.default = withWeapp;
//# sourceMappingURL=index.js.map