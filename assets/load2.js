/*
* antd加载效果
* */
(function () {


    (function polyfill() {
        const relList = document.createElement("link").relList;
        if (relList && relList.supports && relList.supports("modulepreload")) {
            return;
        }
        for (const link of document.querySelectorAll('link[rel="modulepreload"]')) {
            processPreload(link);
        }
        new MutationObserver((mutations) => {
            for (const mutation of mutations) {
                if (mutation.type !== "childList") {
                    continue;
                }
                for (const node of mutation.addedNodes) {
                    if (node.tagName === "LINK" && node.rel === "modulepreload")
                        processPreload(node);
                }
            }
        }).observe(document, {childList: true, subtree: true});

        function getFetchOpts(script) {
            const fetchOpts = {};
            if (script.integrity)
                fetchOpts.integrity = script.integrity;
            if (script.referrerpolicy)
                fetchOpts.referrerPolicy = script.referrerpolicy;
            if (script.crossorigin === "use-credentials")
                fetchOpts.credentials = "include";
            else if (script.crossorigin === "anonymous")
                fetchOpts.credentials = "omit";
            else
                fetchOpts.credentials = "same-origin";
            return fetchOpts;
        }

        function processPreload(link) {
            if (link.ep)
                return;
            link.ep = true;
            const fetchOpts = getFetchOpts(link);
            fetch(link.href, fetchOpts);
        }
    })();

    function _typeof$1(obj) {
        "@babel/helpers - typeof";
        return _typeof$1 = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj2) {
            return typeof obj2;
        } : function (obj2) {
            return obj2 && "function" == typeof Symbol && obj2.constructor === Symbol && obj2 !== Symbol.prototype ? "symbol" : typeof obj2;
        }, _typeof$1(obj);
    }

    function _toPrimitive(input, hint) {
        if (_typeof$1(input) !== "object" || input === null)
            return input;
        var prim = input[Symbol.toPrimitive];
        if (prim !== void 0) {
            var res = prim.call(input, hint || "default");
            if (_typeof$1(res) !== "object")
                return res;
            throw new TypeError("@@toPrimitive must return a primitive value.");
        }
        return (hint === "string" ? String : Number)(input);
    }

    function _toPropertyKey(arg) {
        var key2 = _toPrimitive(arg, "string");
        return _typeof$1(key2) === "symbol" ? key2 : String(key2);
    }

    function _defineProperty$d(obj, key2, value) {
        key2 = _toPropertyKey(key2);
        if (key2 in obj) {
            Object.defineProperty(obj, key2, {
                value,
                enumerable: true,
                configurable: true,
                writable: true
            });
        } else {
            obj[key2] = value;
        }
        return obj;
    }

    function ownKeys$1(object, enumerableOnly) {
        var keys = Object.keys(object);
        if (Object.getOwnPropertySymbols) {
            var symbols = Object.getOwnPropertySymbols(object);
            enumerableOnly && (symbols = symbols.filter(function (sym) {
                return Object.getOwnPropertyDescriptor(object, sym).enumerable;
            })), keys.push.apply(keys, symbols);
        }
        return keys;
    }

    function _objectSpread2(target) {
        for (var i2 = 1; i2 < arguments.length; i2++) {
            var source = null != arguments[i2] ? arguments[i2] : {};
            i2 % 2 ? ownKeys$1(Object(source), true).forEach(function (key2) {
                _defineProperty$d(target, key2, source[key2]);
            }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys$1(Object(source)).forEach(function (key2) {
                Object.defineProperty(target, key2, Object.getOwnPropertyDescriptor(source, key2));
            });
        }
        return target;
    }

    function _extends() {
        _extends = Object.assign ? Object.assign.bind() : function (target) {
            for (var i2 = 1; i2 < arguments.length; i2++) {
                var source = arguments[i2];
                for (var key2 in source) {
                    if (Object.prototype.hasOwnProperty.call(source, key2)) {
                        target[key2] = source[key2];
                    }
                }
            }
            return target;
        };
        return _extends.apply(this, arguments);
    }

    function makeMap(str, expectsLowerCase) {
        const map = /* @__PURE__ */ Object.create(null);
        const list = str.split(",");
        for (let i2 = 0; i2 < list.length; i2++) {
            map[list[i2]] = true;
        }
        return expectsLowerCase ? (val) => !!map[val.toLowerCase()] : (val) => !!map[val];
    }

    function normalizeStyle(value) {
        if (isArray$1(value)) {
            const res = {};
            for (let i2 = 0; i2 < value.length; i2++) {
                const item = value[i2];
                const normalized = isString$1(item) ? parseStringStyle(item) : normalizeStyle(item);
                if (normalized) {
                    for (const key2 in normalized) {
                        res[key2] = normalized[key2];
                    }
                }
            }
            return res;
        } else if (isString$1(value)) {
            return value;
        } else if (isObject$1(value)) {
            return value;
        }
    }

    const listDelimiterRE = /;(?![^(]*\))/g;
    const propertyDelimiterRE = /:([^]+)/;
    const styleCommentRE = /\/\*.*?\*\//gs;

    function parseStringStyle(cssText) {
        const ret = {};
        cssText.replace(styleCommentRE, "").split(listDelimiterRE).forEach((item) => {
            if (item) {
                const tmp = item.split(propertyDelimiterRE);
                tmp.length > 1 && (ret[tmp[0].trim()] = tmp[1].trim());
            }
        });
        return ret;
    }

    function normalizeClass(value) {
        let res = "";
        if (isString$1(value)) {
            res = value;
        } else if (isArray$1(value)) {
            for (let i2 = 0; i2 < value.length; i2++) {
                const normalized = normalizeClass(value[i2]);
                if (normalized) {
                    res += normalized + " ";
                }
            }
        } else if (isObject$1(value)) {
            for (const name in value) {
                if (value[name]) {
                    res += name + " ";
                }
            }
        }
        return res.trim();
    }

    const specialBooleanAttrs = `itemscope,allowfullscreen,formnovalidate,ismap,nomodule,novalidate,readonly`;
    const isSpecialBooleanAttr = /* @__PURE__ */ makeMap(specialBooleanAttrs);

    function includeBooleanAttr(value) {
        return !!value || value === "";
    }

    const EMPTY_OBJ = {};
    const EMPTY_ARR = [];
    const NOOP = () => {
    };
    const NO = () => false;
    const onRE = /^on[^a-z]/;
    const isOn = (key2) => onRE.test(key2);
    const isModelListener = (key2) => key2.startsWith("onUpdate:");
    const extend = Object.assign;
    const remove = (arr, el) => {
        const i2 = arr.indexOf(el);
        if (i2 > -1) {
            arr.splice(i2, 1);
        }
    };
    const hasOwnProperty$1 = Object.prototype.hasOwnProperty;
    const hasOwn = (val, key2) => hasOwnProperty$1.call(val, key2);
    const isArray$1 = Array.isArray;
    const isMap = (val) => toTypeString(val) === "[object Map]";
    const isSet = (val) => toTypeString(val) === "[object Set]";
    const isFunction = (val) => typeof val === "function";
    const isString$1 = (val) => typeof val === "string";
    const isSymbol = (val) => typeof val === "symbol";
    const isObject$1 = (val) => val !== null && typeof val === "object";
    const isPromise = (val) => {
        return isObject$1(val) && isFunction(val.then) && isFunction(val.catch);
    };
    const objectToString = Object.prototype.toString;
    const toTypeString = (value) => objectToString.call(value);
    const toRawType = (value) => {
        return toTypeString(value).slice(8, -1);
    };
    const isPlainObject = (val) => toTypeString(val) === "[object Object]";
    const isIntegerKey = (key2) => isString$1(key2) && key2 !== "NaN" && key2[0] !== "-" && "" + parseInt(key2, 10) === key2;
    const isReservedProp = /* @__PURE__ */ makeMap(
        // the leading comma is intentional so empty string "" is also included
        ",key,ref,ref_for,ref_key,onVnodeBeforeMount,onVnodeMounted,onVnodeBeforeUpdate,onVnodeUpdated,onVnodeBeforeUnmount,onVnodeUnmounted"
    );
    const cacheStringFunction = (fn) => {
        const cache = /* @__PURE__ */ Object.create(null);
        return (str) => {
            const hit = cache[str];
            return hit || (cache[str] = fn(str));
        };
    };
    const camelizeRE = /-(\w)/g;
    const camelize = cacheStringFunction((str) => {
        return str.replace(camelizeRE, (_2, c2) => c2 ? c2.toUpperCase() : "");
    });
    const hyphenateRE = /\B([A-Z])/g;
    const hyphenate = cacheStringFunction((str) => str.replace(hyphenateRE, "-$1").toLowerCase());
    const capitalize = cacheStringFunction((str) => str.charAt(0).toUpperCase() + str.slice(1));
    const toHandlerKey = cacheStringFunction((str) => str ? `on${capitalize(str)}` : ``);
    const hasChanged = (value, oldValue) => !Object.is(value, oldValue);
    const invokeArrayFns = (fns, arg) => {
        for (let i2 = 0; i2 < fns.length; i2++) {
            fns[i2](arg);
        }
    };
    const def = (obj, key2, value) => {
        Object.defineProperty(obj, key2, {
            configurable: true,
            enumerable: false,
            value
        });
    };
    const looseToNumber = (val) => {
        const n2 = parseFloat(val);
        return isNaN(n2) ? val : n2;
    };
    const toNumber = (val) => {
        const n2 = isString$1(val) ? Number(val) : NaN;
        return isNaN(n2) ? val : n2;
    };
    let _globalThis;
    const getGlobalThis = () => {
        return _globalThis || (_globalThis = typeof globalThis !== "undefined" ? globalThis : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : typeof global !== "undefined" ? global : {});
    };
    let activeEffectScope;

    class EffectScope {
        constructor(detached = false) {
            this.detached = detached;
            this._active = true;
            this.effects = [];
            this.cleanups = [];
            this.parent = activeEffectScope;
            if (!detached && activeEffectScope) {
                this.index = (activeEffectScope.scopes || (activeEffectScope.scopes = [])).push(this) - 1;
            }
        }

        get active() {
            return this._active;
        }

        run(fn) {
            if (this._active) {
                const currentEffectScope = activeEffectScope;
                try {
                    activeEffectScope = this;
                    return fn();
                } finally {
                    activeEffectScope = currentEffectScope;
                }
            }
        }

        /**
         * This should only be called on non-detached scopes
         * @internal
         */
        on() {
            activeEffectScope = this;
        }

        /**
         * This should only be called on non-detached scopes
         * @internal
         */
        off() {
            activeEffectScope = this.parent;
        }

        stop(fromParent) {
            if (this._active) {
                let i2, l2;
                for (i2 = 0, l2 = this.effects.length; i2 < l2; i2++) {
                    this.effects[i2].stop();
                }
                for (i2 = 0, l2 = this.cleanups.length; i2 < l2; i2++) {
                    this.cleanups[i2]();
                }
                if (this.scopes) {
                    for (i2 = 0, l2 = this.scopes.length; i2 < l2; i2++) {
                        this.scopes[i2].stop(true);
                    }
                }
                if (!this.detached && this.parent && !fromParent) {
                    const last = this.parent.scopes.pop();
                    if (last && last !== this) {
                        this.parent.scopes[this.index] = last;
                        last.index = this.index;
                    }
                }
                this.parent = void 0;
                this._active = false;
            }
        }
    }

    function recordEffectScope(effect, scope = activeEffectScope) {
        if (scope && scope.active) {
            scope.effects.push(effect);
        }
    }

    function getCurrentScope() {
        return activeEffectScope;
    }

    const createDep = (effects) => {
        const dep = new Set(effects);
        dep.w = 0;
        dep.n = 0;
        return dep;
    };
    const wasTracked = (dep) => (dep.w & trackOpBit) > 0;
    const newTracked = (dep) => (dep.n & trackOpBit) > 0;
    const initDepMarkers = ({deps}) => {
        if (deps.length) {
            for (let i2 = 0; i2 < deps.length; i2++) {
                deps[i2].w |= trackOpBit;
            }
        }
    };
    const finalizeDepMarkers = (effect) => {
        const {deps} = effect;
        if (deps.length) {
            let ptr = 0;
            for (let i2 = 0; i2 < deps.length; i2++) {
                const dep = deps[i2];
                if (wasTracked(dep) && !newTracked(dep)) {
                    dep.delete(effect);
                } else {
                    deps[ptr++] = dep;
                }
                dep.w &= ~trackOpBit;
                dep.n &= ~trackOpBit;
            }
            deps.length = ptr;
        }
    };
    const targetMap = /* @__PURE__ */ new WeakMap();
    let effectTrackDepth = 0;
    let trackOpBit = 1;
    const maxMarkerBits = 30;
    let activeEffect;
    const ITERATE_KEY = Symbol("");
    const MAP_KEY_ITERATE_KEY = Symbol("");

    class ReactiveEffect {
        constructor(fn, scheduler = null, scope) {
            this.fn = fn;
            this.scheduler = scheduler;
            this.active = true;
            this.deps = [];
            this.parent = void 0;
            recordEffectScope(this, scope);
        }

        run() {
            if (!this.active) {
                return this.fn();
            }
            let parent = activeEffect;
            let lastShouldTrack = shouldTrack;
            while (parent) {
                if (parent === this) {
                    return;
                }
                parent = parent.parent;
            }
            try {
                this.parent = activeEffect;
                activeEffect = this;
                shouldTrack = true;
                trackOpBit = 1 << ++effectTrackDepth;
                if (effectTrackDepth <= maxMarkerBits) {
                    initDepMarkers(this);
                } else {
                    cleanupEffect(this);
                }
                return this.fn();
            } finally {
                if (effectTrackDepth <= maxMarkerBits) {
                    finalizeDepMarkers(this);
                }
                trackOpBit = 1 << --effectTrackDepth;
                activeEffect = this.parent;
                shouldTrack = lastShouldTrack;
                this.parent = void 0;
                if (this.deferStop) {
                    this.stop();
                }
            }
        }

        stop() {
            if (activeEffect === this) {
                this.deferStop = true;
            } else if (this.active) {
                cleanupEffect(this);
                if (this.onStop) {
                    this.onStop();
                }
                this.active = false;
            }
        }
    }

    function cleanupEffect(effect) {
        const {deps} = effect;
        if (deps.length) {
            for (let i2 = 0; i2 < deps.length; i2++) {
                deps[i2].delete(effect);
            }
            deps.length = 0;
        }
    }

    let shouldTrack = true;
    const trackStack = [];

    function pauseTracking() {
        trackStack.push(shouldTrack);
        shouldTrack = false;
    }

    function resetTracking() {
        const last = trackStack.pop();
        shouldTrack = last === void 0 ? true : last;
    }

    function track(target, type, key2) {
        if (shouldTrack && activeEffect) {
            let depsMap = targetMap.get(target);
            if (!depsMap) {
                targetMap.set(target, depsMap = /* @__PURE__ */ new Map());
            }
            let dep = depsMap.get(key2);
            if (!dep) {
                depsMap.set(key2, dep = createDep());
            }
            trackEffects(dep);
        }
    }

    function trackEffects(dep, debuggerEventExtraInfo) {
        let shouldTrack2 = false;
        if (effectTrackDepth <= maxMarkerBits) {
            if (!newTracked(dep)) {
                dep.n |= trackOpBit;
                shouldTrack2 = !wasTracked(dep);
            }
        } else {
            shouldTrack2 = !dep.has(activeEffect);
        }
        if (shouldTrack2) {
            dep.add(activeEffect);
            activeEffect.deps.push(dep);
        }
    }

    function trigger(target, type, key2, newValue, oldValue, oldTarget) {
        const depsMap = targetMap.get(target);
        if (!depsMap) {
            return;
        }
        let deps = [];
        if (type === "clear") {
            deps = [...depsMap.values()];
        } else if (key2 === "length" && isArray$1(target)) {
            const newLength = Number(newValue);
            depsMap.forEach((dep, key3) => {
                if (key3 === "length" || key3 >= newLength) {
                    deps.push(dep);
                }
            });
        } else {
            if (key2 !== void 0) {
                deps.push(depsMap.get(key2));
            }
            switch (type) {
                case "add":
                    if (!isArray$1(target)) {
                        deps.push(depsMap.get(ITERATE_KEY));
                        if (isMap(target)) {
                            deps.push(depsMap.get(MAP_KEY_ITERATE_KEY));
                        }
                    } else if (isIntegerKey(key2)) {
                        deps.push(depsMap.get("length"));
                    }
                    break;
                case "delete":
                    if (!isArray$1(target)) {
                        deps.push(depsMap.get(ITERATE_KEY));
                        if (isMap(target)) {
                            deps.push(depsMap.get(MAP_KEY_ITERATE_KEY));
                        }
                    }
                    break;
                case "set":
                    if (isMap(target)) {
                        deps.push(depsMap.get(ITERATE_KEY));
                    }
                    break;
            }
        }
        if (deps.length === 1) {
            if (deps[0]) {
                {
                    triggerEffects(deps[0]);
                }
            }
        } else {
            const effects = [];
            for (const dep of deps) {
                if (dep) {
                    effects.push(...dep);
                }
            }
            {
                triggerEffects(createDep(effects));
            }
        }
    }

    function triggerEffects(dep, debuggerEventExtraInfo) {
        const effects = isArray$1(dep) ? dep : [...dep];
        for (const effect of effects) {
            if (effect.computed) {
                triggerEffect(effect);
            }
        }
        for (const effect of effects) {
            if (!effect.computed) {
                triggerEffect(effect);
            }
        }
    }

    function triggerEffect(effect, debuggerEventExtraInfo) {
        if (effect !== activeEffect || effect.allowRecurse) {
            if (effect.scheduler) {
                effect.scheduler();
            } else {
                effect.run();
            }
        }
    }

    const isNonTrackableKeys = /* @__PURE__ */ makeMap(`__proto__,__v_isRef,__isVue`);
    const builtInSymbols = new Set(
        /* @__PURE__ */ Object.getOwnPropertyNames(Symbol).filter((key2) => key2 !== "arguments" && key2 !== "caller").map((key2) => Symbol[key2]).filter(isSymbol)
    );
    const get$1 = /* @__PURE__ */ createGetter();
    const shallowGet = /* @__PURE__ */ createGetter(false, true);
    const readonlyGet = /* @__PURE__ */ createGetter(true);
    const arrayInstrumentations = /* @__PURE__ */ createArrayInstrumentations();

    function createArrayInstrumentations() {
        const instrumentations = {};
        ["includes", "indexOf", "lastIndexOf"].forEach((key2) => {
            instrumentations[key2] = function (...args) {
                const arr = toRaw(this);
                for (let i2 = 0, l2 = this.length; i2 < l2; i2++) {
                    track(arr, "get", i2 + "");
                }
                const res = arr[key2](...args);
                if (res === -1 || res === false) {
                    return arr[key2](...args.map(toRaw));
                } else {
                    return res;
                }
            };
        });
        ["push", "pop", "shift", "unshift", "splice"].forEach((key2) => {
            instrumentations[key2] = function (...args) {
                pauseTracking();
                const res = toRaw(this)[key2].apply(this, args);
                resetTracking();
                return res;
            };
        });
        return instrumentations;
    }

    function hasOwnProperty(key2) {
        const obj = toRaw(this);
        track(obj, "has", key2);
        return obj.hasOwnProperty(key2);
    }

    function createGetter(isReadonly2 = false, shallow = false) {
        return function get2(target, key2, receiver) {
            if (key2 === "__v_isReactive") {
                return !isReadonly2;
            } else if (key2 === "__v_isReadonly") {
                return isReadonly2;
            } else if (key2 === "__v_isShallow") {
                return shallow;
            } else if (key2 === "__v_raw" && receiver === (isReadonly2 ? shallow ? shallowReadonlyMap : readonlyMap : shallow ? shallowReactiveMap : reactiveMap).get(target)) {
                return target;
            }
            const targetIsArray = isArray$1(target);
            if (!isReadonly2) {
                if (targetIsArray && hasOwn(arrayInstrumentations, key2)) {
                    return Reflect.get(arrayInstrumentations, key2, receiver);
                }
                if (key2 === "hasOwnProperty") {
                    return hasOwnProperty;
                }
            }
            const res = Reflect.get(target, key2, receiver);
            if (isSymbol(key2) ? builtInSymbols.has(key2) : isNonTrackableKeys(key2)) {
                return res;
            }
            if (!isReadonly2) {
                track(target, "get", key2);
            }
            if (shallow) {
                return res;
            }
            if (isRef(res)) {
                return targetIsArray && isIntegerKey(key2) ? res : res.value;
            }
            if (isObject$1(res)) {
                return isReadonly2 ? readonly(res) : reactive(res);
            }
            return res;
        };
    }

    const set$1 = /* @__PURE__ */ createSetter();
    const shallowSet = /* @__PURE__ */ createSetter(true);

    function createSetter(shallow = false) {
        return function set2(target, key2, value, receiver) {
            let oldValue = target[key2];
            if (isReadonly(oldValue) && isRef(oldValue) && !isRef(value)) {
                return false;
            }
            if (!shallow) {
                if (!isShallow(value) && !isReadonly(value)) {
                    oldValue = toRaw(oldValue);
                    value = toRaw(value);
                }
                if (!isArray$1(target) && isRef(oldValue) && !isRef(value)) {
                    oldValue.value = value;
                    return true;
                }
            }
            const hadKey = isArray$1(target) && isIntegerKey(key2) ? Number(key2) < target.length : hasOwn(target, key2);
            const result = Reflect.set(target, key2, value, receiver);
            if (target === toRaw(receiver)) {
                if (!hadKey) {
                    trigger(target, "add", key2, value);
                } else if (hasChanged(value, oldValue)) {
                    trigger(target, "set", key2, value);
                }
            }
            return result;
        };
    }

    function deleteProperty(target, key2) {
        const hadKey = hasOwn(target, key2);
        target[key2];
        const result = Reflect.deleteProperty(target, key2);
        if (result && hadKey) {
            trigger(target, "delete", key2, void 0);
        }
        return result;
    }

    function has$1(target, key2) {
        const result = Reflect.has(target, key2);
        if (!isSymbol(key2) || !builtInSymbols.has(key2)) {
            track(target, "has", key2);
        }
        return result;
    }

    function ownKeys(target) {
        track(target, "iterate", isArray$1(target) ? "length" : ITERATE_KEY);
        return Reflect.ownKeys(target);
    }

    const mutableHandlers = {
        get: get$1,
        set: set$1,
        deleteProperty,
        has: has$1,
        ownKeys
    };
    const readonlyHandlers = {
        get: readonlyGet,
        set(target, key2) {
            return true;
        },
        deleteProperty(target, key2) {
            return true;
        }
    };
    const shallowReactiveHandlers = /* @__PURE__ */ extend({}, mutableHandlers, {
        get: shallowGet,
        set: shallowSet
    });
    const toShallow = (value) => value;
    const getProto = (v2) => Reflect.getPrototypeOf(v2);

    function get(target, key2, isReadonly2 = false, isShallow2 = false) {
        target = target[
            "__v_raw"
            /* ReactiveFlags.RAW */
            ];
        const rawTarget = toRaw(target);
        const rawKey = toRaw(key2);
        if (!isReadonly2) {
            if (key2 !== rawKey) {
                track(rawTarget, "get", key2);
            }
            track(rawTarget, "get", rawKey);
        }
        const {has: has2} = getProto(rawTarget);
        const wrap = isShallow2 ? toShallow : isReadonly2 ? toReadonly : toReactive;
        if (has2.call(rawTarget, key2)) {
            return wrap(target.get(key2));
        } else if (has2.call(rawTarget, rawKey)) {
            return wrap(target.get(rawKey));
        } else if (target !== rawTarget) {
            target.get(key2);
        }
    }

    function has(key2, isReadonly2 = false) {
        const target = this[
            "__v_raw"
            /* ReactiveFlags.RAW */
            ];
        const rawTarget = toRaw(target);
        const rawKey = toRaw(key2);
        if (!isReadonly2) {
            if (key2 !== rawKey) {
                track(rawTarget, "has", key2);
            }
            track(rawTarget, "has", rawKey);
        }
        return key2 === rawKey ? target.has(key2) : target.has(key2) || target.has(rawKey);
    }

    function size(target, isReadonly2 = false) {
        target = target[
            "__v_raw"
            /* ReactiveFlags.RAW */
            ];
        !isReadonly2 && track(toRaw(target), "iterate", ITERATE_KEY);
        return Reflect.get(target, "size", target);
    }

    function add(value) {
        value = toRaw(value);
        const target = toRaw(this);
        const proto = getProto(target);
        const hadKey = proto.has.call(target, value);
        if (!hadKey) {
            target.add(value);
            trigger(target, "add", value, value);
        }
        return this;
    }

    function set(key2, value) {
        value = toRaw(value);
        const target = toRaw(this);
        const {has: has2, get: get2} = getProto(target);
        let hadKey = has2.call(target, key2);
        if (!hadKey) {
            key2 = toRaw(key2);
            hadKey = has2.call(target, key2);
        }
        const oldValue = get2.call(target, key2);
        target.set(key2, value);
        if (!hadKey) {
            trigger(target, "add", key2, value);
        } else if (hasChanged(value, oldValue)) {
            trigger(target, "set", key2, value);
        }
        return this;
    }

    function deleteEntry(key2) {
        const target = toRaw(this);
        const {has: has2, get: get2} = getProto(target);
        let hadKey = has2.call(target, key2);
        if (!hadKey) {
            key2 = toRaw(key2);
            hadKey = has2.call(target, key2);
        }
        get2 ? get2.call(target, key2) : void 0;
        const result = target.delete(key2);
        if (hadKey) {
            trigger(target, "delete", key2, void 0);
        }
        return result;
    }

    function clear() {
        const target = toRaw(this);
        const hadItems = target.size !== 0;
        const result = target.clear();
        if (hadItems) {
            trigger(target, "clear", void 0, void 0);
        }
        return result;
    }

    function createForEach(isReadonly2, isShallow2) {
        return function forEach(callback, thisArg) {
            const observed = this;
            const target = observed[
                "__v_raw"
                /* ReactiveFlags.RAW */
                ];
            const rawTarget = toRaw(target);
            const wrap = isShallow2 ? toShallow : isReadonly2 ? toReadonly : toReactive;
            !isReadonly2 && track(rawTarget, "iterate", ITERATE_KEY);
            return target.forEach((value, key2) => {
                return callback.call(thisArg, wrap(value), wrap(key2), observed);
            });
        };
    }

    function createIterableMethod(method, isReadonly2, isShallow2) {
        return function (...args) {
            const target = this[
                "__v_raw"
                /* ReactiveFlags.RAW */
                ];
            const rawTarget = toRaw(target);
            const targetIsMap = isMap(rawTarget);
            const isPair = method === "entries" || method === Symbol.iterator && targetIsMap;
            const isKeyOnly = method === "keys" && targetIsMap;
            const innerIterator = target[method](...args);
            const wrap = isShallow2 ? toShallow : isReadonly2 ? toReadonly : toReactive;
            !isReadonly2 && track(rawTarget, "iterate", isKeyOnly ? MAP_KEY_ITERATE_KEY : ITERATE_KEY);
            return {
                // iterator protocol
                next() {
                    const {value, done} = innerIterator.next();
                    return done ? {value, done} : {
                        value: isPair ? [wrap(value[0]), wrap(value[1])] : wrap(value),
                        done
                    };
                },
                // iterable protocol
                [Symbol.iterator]() {
                    return this;
                }
            };
        };
    }

    function createReadonlyMethod(type) {
        return function (...args) {
            return type === "delete" ? false : this;
        };
    }

    function createInstrumentations() {
        const mutableInstrumentations2 = {
            get(key2) {
                return get(this, key2);
            },
            get size() {
                return size(this);
            },
            has,
            add,
            set,
            delete: deleteEntry,
            clear,
            forEach: createForEach(false, false)
        };
        const shallowInstrumentations2 = {
            get(key2) {
                return get(this, key2, false, true);
            },
            get size() {
                return size(this);
            },
            has,
            add,
            set,
            delete: deleteEntry,
            clear,
            forEach: createForEach(false, true)
        };
        const readonlyInstrumentations2 = {
            get(key2) {
                return get(this, key2, true);
            },
            get size() {
                return size(this, true);
            },
            has(key2) {
                return has.call(this, key2, true);
            },
            add: createReadonlyMethod(
                "add"
                /* TriggerOpTypes.ADD */
            ),
            set: createReadonlyMethod(
                "set"
                /* TriggerOpTypes.SET */
            ),
            delete: createReadonlyMethod(
                "delete"
                /* TriggerOpTypes.DELETE */
            ),
            clear: createReadonlyMethod(
                "clear"
                /* TriggerOpTypes.CLEAR */
            ),
            forEach: createForEach(true, false)
        };
        const shallowReadonlyInstrumentations2 = {
            get(key2) {
                return get(this, key2, true, true);
            },
            get size() {
                return size(this, true);
            },
            has(key2) {
                return has.call(this, key2, true);
            },
            add: createReadonlyMethod(
                "add"
                /* TriggerOpTypes.ADD */
            ),
            set: createReadonlyMethod(
                "set"
                /* TriggerOpTypes.SET */
            ),
            delete: createReadonlyMethod(
                "delete"
                /* TriggerOpTypes.DELETE */
            ),
            clear: createReadonlyMethod(
                "clear"
                /* TriggerOpTypes.CLEAR */
            ),
            forEach: createForEach(true, true)
        };
        const iteratorMethods = ["keys", "values", "entries", Symbol.iterator];
        iteratorMethods.forEach((method) => {
            mutableInstrumentations2[method] = createIterableMethod(method, false, false);
            readonlyInstrumentations2[method] = createIterableMethod(method, true, false);
            shallowInstrumentations2[method] = createIterableMethod(method, false, true);
            shallowReadonlyInstrumentations2[method] = createIterableMethod(method, true, true);
        });
        return [
            mutableInstrumentations2,
            readonlyInstrumentations2,
            shallowInstrumentations2,
            shallowReadonlyInstrumentations2
        ];
    }

    const [mutableInstrumentations, readonlyInstrumentations, shallowInstrumentations, shallowReadonlyInstrumentations] = /* @__PURE__ */ createInstrumentations();

    function createInstrumentationGetter(isReadonly2, shallow) {
        const instrumentations = shallow ? isReadonly2 ? shallowReadonlyInstrumentations : shallowInstrumentations : isReadonly2 ? readonlyInstrumentations : mutableInstrumentations;
        return (target, key2, receiver) => {
            if (key2 === "__v_isReactive") {
                return !isReadonly2;
            } else if (key2 === "__v_isReadonly") {
                return isReadonly2;
            } else if (key2 === "__v_raw") {
                return target;
            }
            return Reflect.get(hasOwn(instrumentations, key2) && key2 in target ? instrumentations : target, key2, receiver);
        };
    }

    const mutableCollectionHandlers = {
        get: /* @__PURE__ */ createInstrumentationGetter(false, false)
    };
    const shallowCollectionHandlers = {
        get: /* @__PURE__ */ createInstrumentationGetter(false, true)
    };
    const readonlyCollectionHandlers = {
        get: /* @__PURE__ */ createInstrumentationGetter(true, false)
    };
    const reactiveMap = /* @__PURE__ */ new WeakMap();
    const shallowReactiveMap = /* @__PURE__ */ new WeakMap();
    const readonlyMap = /* @__PURE__ */ new WeakMap();
    const shallowReadonlyMap = /* @__PURE__ */ new WeakMap();

    function targetTypeMap(rawType) {
        switch (rawType) {
            case "Object":
            case "Array":
                return 1;
            case "Map":
            case "Set":
            case "WeakMap":
            case "WeakSet":
                return 2;
            default:
                return 0;
        }
    }

    function getTargetType(value) {
        return value[
            "__v_skip"
            /* ReactiveFlags.SKIP */
            ] || !Object.isExtensible(value) ? 0 : targetTypeMap(toRawType(value));
    }

    function reactive(target) {
        if (isReadonly(target)) {
            return target;
        }
        return createReactiveObject(target, false, mutableHandlers, mutableCollectionHandlers, reactiveMap);
    }

    function shallowReactive(target) {
        return createReactiveObject(target, false, shallowReactiveHandlers, shallowCollectionHandlers, shallowReactiveMap);
    }

    function readonly(target) {
        return createReactiveObject(target, true, readonlyHandlers, readonlyCollectionHandlers, readonlyMap);
    }

    function createReactiveObject(target, isReadonly2, baseHandlers, collectionHandlers, proxyMap) {
        if (!isObject$1(target)) {
            return target;
        }
        if (target[
            "__v_raw"
            /* ReactiveFlags.RAW */
            ] && !(isReadonly2 && target[
            "__v_isReactive"
            /* ReactiveFlags.IS_REACTIVE */
            ])) {
            return target;
        }
        const existingProxy = proxyMap.get(target);
        if (existingProxy) {
            return existingProxy;
        }
        const targetType = getTargetType(target);
        if (targetType === 0) {
            return target;
        }
        const proxy = new Proxy(target, targetType === 2 ? collectionHandlers : baseHandlers);
        proxyMap.set(target, proxy);
        return proxy;
    }

    function isReactive(value) {
        if (isReadonly(value)) {
            return isReactive(value[
                "__v_raw"
                /* ReactiveFlags.RAW */
                ]);
        }
        return !!(value && value[
            "__v_isReactive"
            /* ReactiveFlags.IS_REACTIVE */
            ]);
    }

    function isReadonly(value) {
        return !!(value && value[
            "__v_isReadonly"
            /* ReactiveFlags.IS_READONLY */
            ]);
    }

    function isShallow(value) {
        return !!(value && value[
            "__v_isShallow"
            /* ReactiveFlags.IS_SHALLOW */
            ]);
    }

    function isProxy(value) {
        return isReactive(value) || isReadonly(value);
    }

    function toRaw(observed) {
        const raw = observed && observed[
            "__v_raw"
            /* ReactiveFlags.RAW */
            ];
        return raw ? toRaw(raw) : observed;
    }

    function markRaw(value) {
        def(value, "__v_skip", true);
        return value;
    }

    const toReactive = (value) => isObject$1(value) ? reactive(value) : value;
    const toReadonly = (value) => isObject$1(value) ? readonly(value) : value;

    function trackRefValue(ref2) {
        if (shouldTrack && activeEffect) {
            ref2 = toRaw(ref2);
            {
                trackEffects(ref2.dep || (ref2.dep = createDep()));
            }
        }
    }

    function triggerRefValue(ref2, newVal) {
        ref2 = toRaw(ref2);
        const dep = ref2.dep;
        if (dep) {
            {
                triggerEffects(dep);
            }
        }
    }

    function isRef(r2) {
        return !!(r2 && r2.__v_isRef === true);
    }

    function ref(value) {
        return createRef(value, false);
    }

    function createRef(rawValue, shallow) {
        if (isRef(rawValue)) {
            return rawValue;
        }
        return new RefImpl(rawValue, shallow);
    }

    class RefImpl {
        constructor(value, __v_isShallow) {
            this.__v_isShallow = __v_isShallow;
            this.dep = void 0;
            this.__v_isRef = true;
            this._rawValue = __v_isShallow ? value : toRaw(value);
            this._value = __v_isShallow ? value : toReactive(value);
        }

        get value() {
            trackRefValue(this);
            return this._value;
        }

        set value(newVal) {
            const useDirectValue = this.__v_isShallow || isShallow(newVal) || isReadonly(newVal);
            newVal = useDirectValue ? newVal : toRaw(newVal);
            if (hasChanged(newVal, this._rawValue)) {
                this._rawValue = newVal;
                this._value = useDirectValue ? newVal : toReactive(newVal);
                triggerRefValue(this);
            }
        }
    }

    function unref(ref2) {
        return isRef(ref2) ? ref2.value : ref2;
    }

    const shallowUnwrapHandlers = {
        get: (target, key2, receiver) => unref(Reflect.get(target, key2, receiver)),
        set: (target, key2, value, receiver) => {
            const oldValue = target[key2];
            if (isRef(oldValue) && !isRef(value)) {
                oldValue.value = value;
                return true;
            } else {
                return Reflect.set(target, key2, value, receiver);
            }
        }
    };

    function proxyRefs(objectWithRefs) {
        return isReactive(objectWithRefs) ? objectWithRefs : new Proxy(objectWithRefs, shallowUnwrapHandlers);
    }

    var _a$1;

    class ComputedRefImpl {
        constructor(getter, _setter, isReadonly2, isSSR) {
            this._setter = _setter;
            this.dep = void 0;
            this.__v_isRef = true;
            this[_a$1] = false;
            this._dirty = true;
            this.effect = new ReactiveEffect(getter, () => {
                if (!this._dirty) {
                    this._dirty = true;
                    triggerRefValue(this);
                }
            });
            this.effect.computed = this;
            this.effect.active = this._cacheable = !isSSR;
            this[
                "__v_isReadonly"
                /* ReactiveFlags.IS_READONLY */
                ] = isReadonly2;
        }

        get value() {
            const self2 = toRaw(this);
            trackRefValue(self2);
            if (self2._dirty || !self2._cacheable) {
                self2._dirty = false;
                self2._value = self2.effect.run();
            }
            return self2._value;
        }

        set value(newValue) {
            this._setter(newValue);
        }
    }

    _a$1 = "__v_isReadonly";

    function computed$1(getterOrOptions, debugOptions, isSSR = false) {
        let getter;
        let setter;
        const onlyGetter = isFunction(getterOrOptions);
        if (onlyGetter) {
            getter = getterOrOptions;
            setter = NOOP;
        } else {
            getter = getterOrOptions.get;
            setter = getterOrOptions.set;
        }
        const cRef = new ComputedRefImpl(getter, setter, onlyGetter || !setter, isSSR);
        return cRef;
    }

    function warn(msg, ...args) {
        return;
    }

    function callWithErrorHandling(fn, instance, type, args) {
        let res;
        try {
            res = args ? fn(...args) : fn();
        } catch (err) {
            handleError(err, instance, type);
        }
        return res;
    }

    function callWithAsyncErrorHandling(fn, instance, type, args) {
        if (isFunction(fn)) {
            const res = callWithErrorHandling(fn, instance, type, args);
            if (res && isPromise(res)) {
                res.catch((err) => {
                    handleError(err, instance, type);
                });
            }
            return res;
        }
        const values = [];
        for (let i2 = 0; i2 < fn.length; i2++) {
            values.push(callWithAsyncErrorHandling(fn[i2], instance, type, args));
        }
        return values;
    }

    function handleError(err, instance, type, throwInDev = true) {
        const contextVNode = instance ? instance.vnode : null;
        if (instance) {
            let cur = instance.parent;
            const exposedInstance = instance.proxy;
            const errorInfo = type;
            while (cur) {
                const errorCapturedHooks = cur.ec;
                if (errorCapturedHooks) {
                    for (let i2 = 0; i2 < errorCapturedHooks.length; i2++) {
                        if (errorCapturedHooks[i2](err, exposedInstance, errorInfo) === false) {
                            return;
                        }
                    }
                }
                cur = cur.parent;
            }
            const appErrorHandler = instance.appContext.config.errorHandler;
            if (appErrorHandler) {
                callWithErrorHandling(appErrorHandler, null, 10, [err, exposedInstance, errorInfo]);
                return;
            }
        }
        logError(err, type, contextVNode, throwInDev);
    }

    function logError(err, type, contextVNode, throwInDev = true) {
        {
            console.error(err);
        }
    }

    let isFlushing = false;
    let isFlushPending = false;
    const queue = [];
    let flushIndex = 0;
    const pendingPostFlushCbs = [];
    let activePostFlushCbs = null;
    let postFlushIndex = 0;
    const resolvedPromise = /* @__PURE__ */ Promise.resolve();
    let currentFlushPromise = null;

    function nextTick(fn) {
        const p2 = currentFlushPromise || resolvedPromise;
        return fn ? p2.then(this ? fn.bind(this) : fn) : p2;
    }

    function findInsertionIndex(id) {
        let start = flushIndex + 1;
        let end = queue.length;
        while (start < end) {
            const middle = start + end >>> 1;
            const middleJobId = getId(queue[middle]);
            middleJobId < id ? start = middle + 1 : end = middle;
        }
        return start;
    }

    function queueJob(job) {
        if (!queue.length || !queue.includes(job, isFlushing && job.allowRecurse ? flushIndex + 1 : flushIndex)) {
            if (job.id == null) {
                queue.push(job);
            } else {
                queue.splice(findInsertionIndex(job.id), 0, job);
            }
            queueFlush();
        }
    }

    function queueFlush() {
        if (!isFlushing && !isFlushPending) {
            isFlushPending = true;
            currentFlushPromise = resolvedPromise.then(flushJobs);
        }
    }

    function invalidateJob(job) {
        const i2 = queue.indexOf(job);
        if (i2 > flushIndex) {
            queue.splice(i2, 1);
        }
    }

    function queuePostFlushCb(cb) {
        if (!isArray$1(cb)) {
            if (!activePostFlushCbs || !activePostFlushCbs.includes(cb, cb.allowRecurse ? postFlushIndex + 1 : postFlushIndex)) {
                pendingPostFlushCbs.push(cb);
            }
        } else {
            pendingPostFlushCbs.push(...cb);
        }
        queueFlush();
    }

    function flushPreFlushCbs(seen, i2 = isFlushing ? flushIndex + 1 : 0) {
        for (; i2 < queue.length; i2++) {
            const cb = queue[i2];
            if (cb && cb.pre) {
                queue.splice(i2, 1);
                i2--;
                cb();
            }
        }
    }

    function flushPostFlushCbs(seen) {
        if (pendingPostFlushCbs.length) {
            const deduped = [...new Set(pendingPostFlushCbs)];
            pendingPostFlushCbs.length = 0;
            if (activePostFlushCbs) {
                activePostFlushCbs.push(...deduped);
                return;
            }
            activePostFlushCbs = deduped;
            activePostFlushCbs.sort((a2, b2) => getId(a2) - getId(b2));
            for (postFlushIndex = 0; postFlushIndex < activePostFlushCbs.length; postFlushIndex++) {
                activePostFlushCbs[postFlushIndex]();
            }
            activePostFlushCbs = null;
            postFlushIndex = 0;
        }
    }

    const getId = (job) => job.id == null ? Infinity : job.id;
    const comparator = (a2, b2) => {
        const diff = getId(a2) - getId(b2);
        if (diff === 0) {
            if (a2.pre && !b2.pre)
                return -1;
            if (b2.pre && !a2.pre)
                return 1;
        }
        return diff;
    };

    function flushJobs(seen) {
        isFlushPending = false;
        isFlushing = true;
        queue.sort(comparator);
        const check = NOOP;
        try {
            for (flushIndex = 0; flushIndex < queue.length; flushIndex++) {
                const job = queue[flushIndex];
                if (job && job.active !== false) {
                    if (false)
                        ;
                    callWithErrorHandling(
                        job,
                        null,
                        14
                        /* ErrorCodes.SCHEDULER */
                    );
                }
            }
        } finally {
            flushIndex = 0;
            queue.length = 0;
            flushPostFlushCbs();
            isFlushing = false;
            currentFlushPromise = null;
            if (queue.length || pendingPostFlushCbs.length) {
                flushJobs();
            }
        }
    }

    function emit(instance, event, ...rawArgs) {
        if (instance.isUnmounted)
            return;
        const props = instance.vnode.props || EMPTY_OBJ;
        let args = rawArgs;
        const isModelListener2 = event.startsWith("update:");
        const modelArg = isModelListener2 && event.slice(7);
        if (modelArg && modelArg in props) {
            const modifiersKey = `${modelArg === "modelValue" ? "model" : modelArg}Modifiers`;
            const {number, trim} = props[modifiersKey] || EMPTY_OBJ;
            if (trim) {
                args = rawArgs.map((a2) => isString$1(a2) ? a2.trim() : a2);
            }
            if (number) {
                args = rawArgs.map(looseToNumber);
            }
        }
        let handlerName;
        let handler = props[handlerName = toHandlerKey(event)] || // also try camelCase event handler (#2249)
            props[handlerName = toHandlerKey(camelize(event))];
        if (!handler && isModelListener2) {
            handler = props[handlerName = toHandlerKey(hyphenate(event))];
        }
        if (handler) {
            callWithAsyncErrorHandling(handler, instance, 6, args);
        }
        const onceHandler = props[handlerName + `Once`];
        if (onceHandler) {
            if (!instance.emitted) {
                instance.emitted = {};
            } else if (instance.emitted[handlerName]) {
                return;
            }
            instance.emitted[handlerName] = true;
            callWithAsyncErrorHandling(onceHandler, instance, 6, args);
        }
    }

    function normalizeEmitsOptions(comp, appContext, asMixin = false) {
        const cache = appContext.emitsCache;
        const cached2 = cache.get(comp);
        if (cached2 !== void 0) {
            return cached2;
        }
        const raw = comp.emits;
        let normalized = {};
        let hasExtends = false;
        if (!isFunction(comp)) {
            const extendEmits = (raw2) => {
                const normalizedFromExtend = normalizeEmitsOptions(raw2, appContext, true);
                if (normalizedFromExtend) {
                    hasExtends = true;
                    extend(normalized, normalizedFromExtend);
                }
            };
            if (!asMixin && appContext.mixins.length) {
                appContext.mixins.forEach(extendEmits);
            }
            if (comp.extends) {
                extendEmits(comp.extends);
            }
            if (comp.mixins) {
                comp.mixins.forEach(extendEmits);
            }
        }
        if (!raw && !hasExtends) {
            if (isObject$1(comp)) {
                cache.set(comp, null);
            }
            return null;
        }
        if (isArray$1(raw)) {
            raw.forEach((key2) => normalized[key2] = null);
        } else {
            extend(normalized, raw);
        }
        if (isObject$1(comp)) {
            cache.set(comp, normalized);
        }
        return normalized;
    }

    function isEmitListener(options, key2) {
        if (!options || !isOn(key2)) {
            return false;
        }
        key2 = key2.slice(2).replace(/Once$/, "");
        return hasOwn(options, key2[0].toLowerCase() + key2.slice(1)) || hasOwn(options, hyphenate(key2)) || hasOwn(options, key2);
    }

    let currentRenderingInstance = null;
    let currentScopeId = null;

    function setCurrentRenderingInstance(instance) {
        const prev = currentRenderingInstance;
        currentRenderingInstance = instance;
        currentScopeId = instance && instance.type.__scopeId || null;
        return prev;
    }

    function withCtx(fn, ctx = currentRenderingInstance, isNonScopedSlot) {
        if (!ctx)
            return fn;
        if (fn._n) {
            return fn;
        }
        const renderFnWithContext = (...args) => {
            if (renderFnWithContext._d) {
                setBlockTracking(-1);
            }
            const prevInstance = setCurrentRenderingInstance(ctx);
            let res;
            try {
                res = fn(...args);
            } finally {
                setCurrentRenderingInstance(prevInstance);
                if (renderFnWithContext._d) {
                    setBlockTracking(1);
                }
            }
            return res;
        };
        renderFnWithContext._n = true;
        renderFnWithContext._c = true;
        renderFnWithContext._d = true;
        return renderFnWithContext;
    }

    function markAttrsAccessed() {
    }

    function renderComponentRoot(instance) {
        const {
            type: Component,
            vnode,
            proxy,
            withProxy,
            props,
            propsOptions: [propsOptions],
            slots,
            attrs,
            emit: emit2,
            render: render2,
            renderCache,
            data,
            setupState,
            ctx,
            inheritAttrs
        } = instance;
        let result;
        let fallthroughAttrs;
        const prev = setCurrentRenderingInstance(instance);
        try {
            if (vnode.shapeFlag & 4) {
                const proxyToUse = withProxy || proxy;
                result = normalizeVNode(render2.call(proxyToUse, proxyToUse, renderCache, props, setupState, data, ctx));
                fallthroughAttrs = attrs;
            } else {
                const render3 = Component;
                if (false)
                    ;
                result = normalizeVNode(render3.length > 1 ? render3(props, false ? {
                    get attrs() {
                        markAttrsAccessed();
                        return attrs;
                    },
                    slots,
                    emit: emit2
                } : {attrs, slots, emit: emit2}) : render3(
                    props,
                    null
                    /* we know it doesn't need it */
                ));
                fallthroughAttrs = Component.props ? attrs : getFunctionalFallthrough(attrs);
            }
        } catch (err) {
            handleError(
                err,
                instance,
                1
                /* ErrorCodes.RENDER_FUNCTION */
            );
            result = createVNode(Comment);
        }
        let root = result;
        if (fallthroughAttrs && inheritAttrs !== false) {
            const keys = Object.keys(fallthroughAttrs);
            const {shapeFlag} = root;
            if (keys.length) {
                if (shapeFlag & (1 | 6)) {
                    if (propsOptions && keys.some(isModelListener)) {
                        fallthroughAttrs = filterModelListeners(fallthroughAttrs, propsOptions);
                    }
                    root = cloneVNode(root, fallthroughAttrs);
                }
            }
        }
        if (vnode.dirs) {
            root = cloneVNode(root);
            root.dirs = root.dirs ? root.dirs.concat(vnode.dirs) : vnode.dirs;
        }
        if (vnode.transition) {
            root.transition = vnode.transition;
        }
        {
            result = root;
        }
        setCurrentRenderingInstance(prev);
        return result;
    }

    const getFunctionalFallthrough = (attrs) => {
        let res;
        for (const key2 in attrs) {
            if (key2 === "class" || key2 === "style" || isOn(key2)) {
                (res || (res = {}))[key2] = attrs[key2];
            }
        }
        return res;
    };
    const filterModelListeners = (attrs, props) => {
        const res = {};
        for (const key2 in attrs) {
            if (!isModelListener(key2) || !(key2.slice(9) in props)) {
                res[key2] = attrs[key2];
            }
        }
        return res;
    };

    function shouldUpdateComponent(prevVNode, nextVNode, optimized) {
        const {props: prevProps, children: prevChildren, component} = prevVNode;
        const {props: nextProps, children: nextChildren, patchFlag} = nextVNode;
        const emits = component.emitsOptions;
        if (nextVNode.dirs || nextVNode.transition) {
            return true;
        }
        if (optimized && patchFlag >= 0) {
            if (patchFlag & 1024) {
                return true;
            }
            if (patchFlag & 16) {
                if (!prevProps) {
                    return !!nextProps;
                }
                return hasPropsChanged(prevProps, nextProps, emits);
            } else if (patchFlag & 8) {
                const dynamicProps = nextVNode.dynamicProps;
                for (let i2 = 0; i2 < dynamicProps.length; i2++) {
                    const key2 = dynamicProps[i2];
                    if (nextProps[key2] !== prevProps[key2] && !isEmitListener(emits, key2)) {
                        return true;
                    }
                }
            }
        } else {
            if (prevChildren || nextChildren) {
                if (!nextChildren || !nextChildren.$stable) {
                    return true;
                }
            }
            if (prevProps === nextProps) {
                return false;
            }
            if (!prevProps) {
                return !!nextProps;
            }
            if (!nextProps) {
                return true;
            }
            return hasPropsChanged(prevProps, nextProps, emits);
        }
        return false;
    }

    function hasPropsChanged(prevProps, nextProps, emitsOptions) {
        const nextKeys = Object.keys(nextProps);
        if (nextKeys.length !== Object.keys(prevProps).length) {
            return true;
        }
        for (let i2 = 0; i2 < nextKeys.length; i2++) {
            const key2 = nextKeys[i2];
            if (nextProps[key2] !== prevProps[key2] && !isEmitListener(emitsOptions, key2)) {
                return true;
            }
        }
        return false;
    }

    function updateHOCHostEl({vnode, parent}, el) {
        while (parent && parent.subTree === vnode) {
            (vnode = parent.vnode).el = el;
            parent = parent.parent;
        }
    }

    const isSuspense = (type) => type.__isSuspense;

    function queueEffectWithSuspense(fn, suspense) {
        if (suspense && suspense.pendingBranch) {
            if (isArray$1(fn)) {
                suspense.effects.push(...fn);
            } else {
                suspense.effects.push(fn);
            }
        } else {
            queuePostFlushCb(fn);
        }
    }

    function provide(key2, value) {
        if (!currentInstance)
            ;
        else {
            let provides = currentInstance.provides;
            const parentProvides = currentInstance.parent && currentInstance.parent.provides;
            if (parentProvides === provides) {
                provides = currentInstance.provides = Object.create(parentProvides);
            }
            provides[key2] = value;
        }
    }

    function inject(key2, defaultValue, treatDefaultAsFactory = false) {
        const instance = currentInstance || currentRenderingInstance;
        if (instance) {
            const provides = instance.parent == null ? instance.vnode.appContext && instance.vnode.appContext.provides : instance.parent.provides;
            if (provides && key2 in provides) {
                return provides[key2];
            } else if (arguments.length > 1) {
                return treatDefaultAsFactory && isFunction(defaultValue) ? defaultValue.call(instance.proxy) : defaultValue;
            } else
                ;
        }
    }

    function watchEffect(effect, options) {
        return doWatch(effect, null, options);
    }

    const INITIAL_WATCHER_VALUE = {};

    function watch(source, cb, options) {
        return doWatch(source, cb, options);
    }

    function doWatch(source, cb, {immediate, deep, flush, onTrack, onTrigger} = EMPTY_OBJ) {
        const instance = getCurrentScope() === (currentInstance === null || currentInstance === void 0 ? void 0 : currentInstance.scope) ? currentInstance : null;
        let getter;
        let forceTrigger = false;
        let isMultiSource = false;
        if (isRef(source)) {
            getter = () => source.value;
            forceTrigger = isShallow(source);
        } else if (isReactive(source)) {
            getter = () => source;
            deep = true;
        } else if (isArray$1(source)) {
            isMultiSource = true;
            forceTrigger = source.some((s2) => isReactive(s2) || isShallow(s2));
            getter = () => source.map((s2) => {
                if (isRef(s2)) {
                    return s2.value;
                } else if (isReactive(s2)) {
                    return traverse(s2);
                } else if (isFunction(s2)) {
                    return callWithErrorHandling(
                        s2,
                        instance,
                        2
                        /* ErrorCodes.WATCH_GETTER */
                    );
                } else
                    ;
            });
        } else if (isFunction(source)) {
            if (cb) {
                getter = () => callWithErrorHandling(
                    source,
                    instance,
                    2
                    /* ErrorCodes.WATCH_GETTER */
                );
            } else {
                getter = () => {
                    if (instance && instance.isUnmounted) {
                        return;
                    }
                    if (cleanup2) {
                        cleanup2();
                    }
                    return callWithAsyncErrorHandling(source, instance, 3, [onCleanup]);
                };
            }
        } else {
            getter = NOOP;
        }
        if (cb && deep) {
            const baseGetter = getter;
            getter = () => traverse(baseGetter());
        }
        let cleanup2;
        let onCleanup = (fn) => {
            cleanup2 = effect.onStop = () => {
                callWithErrorHandling(
                    fn,
                    instance,
                    4
                    /* ErrorCodes.WATCH_CLEANUP */
                );
            };
        };
        let ssrCleanup;
        if (isInSSRComponentSetup) {
            onCleanup = NOOP;
            if (!cb) {
                getter();
            } else if (immediate) {
                callWithAsyncErrorHandling(cb, instance, 3, [
                    getter(),
                    isMultiSource ? [] : void 0,
                    onCleanup
                ]);
            }
            if (flush === "sync") {
                const ctx = useSSRContext();
                ssrCleanup = ctx.__watcherHandles || (ctx.__watcherHandles = []);
            } else {
                return NOOP;
            }
        }
        let oldValue = isMultiSource ? new Array(source.length).fill(INITIAL_WATCHER_VALUE) : INITIAL_WATCHER_VALUE;
        const job = () => {
            if (!effect.active) {
                return;
            }
            if (cb) {
                const newValue = effect.run();
                if (deep || forceTrigger || (isMultiSource ? newValue.some((v2, i2) => hasChanged(v2, oldValue[i2])) : hasChanged(newValue, oldValue)) || false) {
                    if (cleanup2) {
                        cleanup2();
                    }
                    callWithAsyncErrorHandling(cb, instance, 3, [
                        newValue,
                        // pass undefined as the old value when it's changed for the first time
                        oldValue === INITIAL_WATCHER_VALUE ? void 0 : isMultiSource && oldValue[0] === INITIAL_WATCHER_VALUE ? [] : oldValue,
                        onCleanup
                    ]);
                    oldValue = newValue;
                }
            } else {
                effect.run();
            }
        };
        job.allowRecurse = !!cb;
        let scheduler;
        if (flush === "sync") {
            scheduler = job;
        } else if (flush === "post") {
            scheduler = () => queuePostRenderEffect(job, instance && instance.suspense);
        } else {
            job.pre = true;
            if (instance)
                job.id = instance.uid;
            scheduler = () => queueJob(job);
        }
        const effect = new ReactiveEffect(getter, scheduler);
        if (cb) {
            if (immediate) {
                job();
            } else {
                oldValue = effect.run();
            }
        } else if (flush === "post") {
            queuePostRenderEffect(effect.run.bind(effect), instance && instance.suspense);
        } else {
            effect.run();
        }
        const unwatch = () => {
            effect.stop();
            if (instance && instance.scope) {
                remove(instance.scope.effects, effect);
            }
        };
        if (ssrCleanup)
            ssrCleanup.push(unwatch);
        return unwatch;
    }

    function instanceWatch(source, value, options) {
        const publicThis = this.proxy;
        const getter = isString$1(source) ? source.includes(".") ? createPathGetter(publicThis, source) : () => publicThis[source] : source.bind(publicThis, publicThis);
        let cb;
        if (isFunction(value)) {
            cb = value;
        } else {
            cb = value.handler;
            options = value;
        }
        const cur = currentInstance;
        setCurrentInstance(this);
        const res = doWatch(getter, cb.bind(publicThis), options);
        if (cur) {
            setCurrentInstance(cur);
        } else {
            unsetCurrentInstance();
        }
        return res;
    }

    function createPathGetter(ctx, path) {
        const segments = path.split(".");
        return () => {
            let cur = ctx;
            for (let i2 = 0; i2 < segments.length && cur; i2++) {
                cur = cur[segments[i2]];
            }
            return cur;
        };
    }

    function traverse(value, seen) {
        if (!isObject$1(value) || value[
            "__v_skip"
            /* ReactiveFlags.SKIP */
            ]) {
            return value;
        }
        seen = seen || /* @__PURE__ */ new Set();
        if (seen.has(value)) {
            return value;
        }
        seen.add(value);
        if (isRef(value)) {
            traverse(value.value, seen);
        } else if (isArray$1(value)) {
            for (let i2 = 0; i2 < value.length; i2++) {
                traverse(value[i2], seen);
            }
        } else if (isSet(value) || isMap(value)) {
            value.forEach((v2) => {
                traverse(v2, seen);
            });
        } else if (isPlainObject(value)) {
            for (const key2 in value) {
                traverse(value[key2], seen);
            }
        }
        return value;
    }

    function useTransitionState() {
        const state = {
            isMounted: false,
            isLeaving: false,
            isUnmounting: false,
            leavingVNodes: /* @__PURE__ */ new Map()
        };
        onMounted(() => {
            state.isMounted = true;
        });
        onBeforeUnmount(() => {
            state.isUnmounting = true;
        });
        return state;
    }

    const TransitionHookValidator = [Function, Array];
    const BaseTransitionImpl = {
        name: `BaseTransition`,
        props: {
            mode: String,
            appear: Boolean,
            persisted: Boolean,
            // enter
            onBeforeEnter: TransitionHookValidator,
            onEnter: TransitionHookValidator,
            onAfterEnter: TransitionHookValidator,
            onEnterCancelled: TransitionHookValidator,
            // leave
            onBeforeLeave: TransitionHookValidator,
            onLeave: TransitionHookValidator,
            onAfterLeave: TransitionHookValidator,
            onLeaveCancelled: TransitionHookValidator,
            // appear
            onBeforeAppear: TransitionHookValidator,
            onAppear: TransitionHookValidator,
            onAfterAppear: TransitionHookValidator,
            onAppearCancelled: TransitionHookValidator
        },
        setup(props, {slots}) {
            const instance = getCurrentInstance();
            const state = useTransitionState();
            let prevTransitionKey;
            return () => {
                const children = slots.default && getTransitionRawChildren(slots.default(), true);
                if (!children || !children.length) {
                    return;
                }
                let child = children[0];
                if (children.length > 1) {
                    for (const c2 of children) {
                        if (c2.type !== Comment) {
                            child = c2;
                            break;
                        }
                    }
                }
                const rawProps = toRaw(props);
                const {mode} = rawProps;
                if (state.isLeaving) {
                    return emptyPlaceholder(child);
                }
                const innerChild = getKeepAliveChild(child);
                if (!innerChild) {
                    return emptyPlaceholder(child);
                }
                const enterHooks = resolveTransitionHooks(innerChild, rawProps, state, instance);
                setTransitionHooks(innerChild, enterHooks);
                const oldChild = instance.subTree;
                const oldInnerChild = oldChild && getKeepAliveChild(oldChild);
                let transitionKeyChanged = false;
                const {getTransitionKey} = innerChild.type;
                if (getTransitionKey) {
                    const key2 = getTransitionKey();
                    if (prevTransitionKey === void 0) {
                        prevTransitionKey = key2;
                    } else if (key2 !== prevTransitionKey) {
                        prevTransitionKey = key2;
                        transitionKeyChanged = true;
                    }
                }
                if (oldInnerChild && oldInnerChild.type !== Comment && (!isSameVNodeType(innerChild, oldInnerChild) || transitionKeyChanged)) {
                    const leavingHooks = resolveTransitionHooks(oldInnerChild, rawProps, state, instance);
                    setTransitionHooks(oldInnerChild, leavingHooks);
                    if (mode === "out-in") {
                        state.isLeaving = true;
                        leavingHooks.afterLeave = () => {
                            state.isLeaving = false;
                            if (instance.update.active !== false) {
                                instance.update();
                            }
                        };
                        return emptyPlaceholder(child);
                    } else if (mode === "in-out" && innerChild.type !== Comment) {
                        leavingHooks.delayLeave = (el, earlyRemove, delayedLeave) => {
                            const leavingVNodesCache = getLeavingNodesForType(state, oldInnerChild);
                            leavingVNodesCache[String(oldInnerChild.key)] = oldInnerChild;
                            el._leaveCb = () => {
                                earlyRemove();
                                el._leaveCb = void 0;
                                delete enterHooks.delayedLeave;
                            };
                            enterHooks.delayedLeave = delayedLeave;
                        };
                    }
                }
                return child;
            };
        }
    };
    const BaseTransition = BaseTransitionImpl;

    function getLeavingNodesForType(state, vnode) {
        const {leavingVNodes} = state;
        let leavingVNodesCache = leavingVNodes.get(vnode.type);
        if (!leavingVNodesCache) {
            leavingVNodesCache = /* @__PURE__ */ Object.create(null);
            leavingVNodes.set(vnode.type, leavingVNodesCache);
        }
        return leavingVNodesCache;
    }

    function resolveTransitionHooks(vnode, props, state, instance) {
        const {
            appear,
            mode,
            persisted = false,
            onBeforeEnter,
            onEnter,
            onAfterEnter,
            onEnterCancelled,
            onBeforeLeave,
            onLeave,
            onAfterLeave,
            onLeaveCancelled,
            onBeforeAppear,
            onAppear,
            onAfterAppear,
            onAppearCancelled
        } = props;
        const key2 = String(vnode.key);
        const leavingVNodesCache = getLeavingNodesForType(state, vnode);
        const callHook2 = (hook, args) => {
            hook && callWithAsyncErrorHandling(hook, instance, 9, args);
        };
        const callAsyncHook = (hook, args) => {
            const done = args[1];
            callHook2(hook, args);
            if (isArray$1(hook)) {
                if (hook.every((hook2) => hook2.length <= 1))
                    done();
            } else if (hook.length <= 1) {
                done();
            }
        };
        const hooks = {
            mode,
            persisted,
            beforeEnter(el) {
                let hook = onBeforeEnter;
                if (!state.isMounted) {
                    if (appear) {
                        hook = onBeforeAppear || onBeforeEnter;
                    } else {
                        return;
                    }
                }
                if (el._leaveCb) {
                    el._leaveCb(
                        true
                        /* cancelled */
                    );
                }
                const leavingVNode = leavingVNodesCache[key2];
                if (leavingVNode && isSameVNodeType(vnode, leavingVNode) && leavingVNode.el._leaveCb) {
                    leavingVNode.el._leaveCb();
                }
                callHook2(hook, [el]);
            },
            enter(el) {
                let hook = onEnter;
                let afterHook = onAfterEnter;
                let cancelHook = onEnterCancelled;
                if (!state.isMounted) {
                    if (appear) {
                        hook = onAppear || onEnter;
                        afterHook = onAfterAppear || onAfterEnter;
                        cancelHook = onAppearCancelled || onEnterCancelled;
                    } else {
                        return;
                    }
                }
                let called = false;
                const done = el._enterCb = (cancelled) => {
                    if (called)
                        return;
                    called = true;
                    if (cancelled) {
                        callHook2(cancelHook, [el]);
                    } else {
                        callHook2(afterHook, [el]);
                    }
                    if (hooks.delayedLeave) {
                        hooks.delayedLeave();
                    }
                    el._enterCb = void 0;
                };
                if (hook) {
                    callAsyncHook(hook, [el, done]);
                } else {
                    done();
                }
            },
            leave(el, remove2) {
                const key3 = String(vnode.key);
                if (el._enterCb) {
                    el._enterCb(
                        true
                        /* cancelled */
                    );
                }
                if (state.isUnmounting) {
                    return remove2();
                }
                callHook2(onBeforeLeave, [el]);
                let called = false;
                const done = el._leaveCb = (cancelled) => {
                    if (called)
                        return;
                    called = true;
                    remove2();
                    if (cancelled) {
                        callHook2(onLeaveCancelled, [el]);
                    } else {
                        callHook2(onAfterLeave, [el]);
                    }
                    el._leaveCb = void 0;
                    if (leavingVNodesCache[key3] === vnode) {
                        delete leavingVNodesCache[key3];
                    }
                };
                leavingVNodesCache[key3] = vnode;
                if (onLeave) {
                    callAsyncHook(onLeave, [el, done]);
                } else {
                    done();
                }
            },
            clone(vnode2) {
                return resolveTransitionHooks(vnode2, props, state, instance);
            }
        };
        return hooks;
    }

    function emptyPlaceholder(vnode) {
        if (isKeepAlive(vnode)) {
            vnode = cloneVNode(vnode);
            vnode.children = null;
            return vnode;
        }
    }

    function getKeepAliveChild(vnode) {
        return isKeepAlive(vnode) ? vnode.children ? vnode.children[0] : void 0 : vnode;
    }

    function setTransitionHooks(vnode, hooks) {
        if (vnode.shapeFlag & 6 && vnode.component) {
            setTransitionHooks(vnode.component.subTree, hooks);
        } else if (vnode.shapeFlag & 128) {
            vnode.ssContent.transition = hooks.clone(vnode.ssContent);
            vnode.ssFallback.transition = hooks.clone(vnode.ssFallback);
        } else {
            vnode.transition = hooks;
        }
    }

    function getTransitionRawChildren(children, keepComment = false, parentKey) {
        let ret = [];
        let keyedFragmentCount = 0;
        for (let i2 = 0; i2 < children.length; i2++) {
            let child = children[i2];
            const key2 = parentKey == null ? child.key : String(parentKey) + String(child.key != null ? child.key : i2);
            if (child.type === Fragment) {
                if (child.patchFlag & 128)
                    keyedFragmentCount++;
                ret = ret.concat(getTransitionRawChildren(child.children, keepComment, key2));
            } else if (keepComment || child.type !== Comment) {
                ret.push(key2 != null ? cloneVNode(child, {key: key2}) : child);
            }
        }
        if (keyedFragmentCount > 1) {
            for (let i2 = 0; i2 < ret.length; i2++) {
                ret[i2].patchFlag = -2;
            }
        }
        return ret;
    }

    function defineComponent(options) {
        return isFunction(options) ? {setup: options, name: options.name} : options;
    }

    const isAsyncWrapper = (i2) => !!i2.type.__asyncLoader;
    const isKeepAlive = (vnode) => vnode.type.__isKeepAlive;

    function onActivated(hook, target) {
        registerKeepAliveHook(hook, "a", target);
    }

    function onDeactivated(hook, target) {
        registerKeepAliveHook(hook, "da", target);
    }

    function registerKeepAliveHook(hook, type, target = currentInstance) {
        const wrappedHook = hook.__wdc || (hook.__wdc = () => {
            let current = target;
            while (current) {
                if (current.isDeactivated) {
                    return;
                }
                current = current.parent;
            }
            return hook();
        });
        injectHook(type, wrappedHook, target);
        if (target) {
            let current = target.parent;
            while (current && current.parent) {
                if (isKeepAlive(current.parent.vnode)) {
                    injectToKeepAliveRoot(wrappedHook, type, target, current);
                }
                current = current.parent;
            }
        }
    }

    function injectToKeepAliveRoot(hook, type, target, keepAliveRoot) {
        const injected = injectHook(
            type,
            hook,
            keepAliveRoot,
            true
            /* prepend */
        );
        onUnmounted(() => {
            remove(keepAliveRoot[type], injected);
        }, target);
    }

    function injectHook(type, hook, target = currentInstance, prepend = false) {
        if (target) {
            const hooks = target[type] || (target[type] = []);
            const wrappedHook = hook.__weh || (hook.__weh = (...args) => {
                if (target.isUnmounted) {
                    return;
                }
                pauseTracking();
                setCurrentInstance(target);
                const res = callWithAsyncErrorHandling(hook, target, type, args);
                unsetCurrentInstance();
                resetTracking();
                return res;
            });
            if (prepend) {
                hooks.unshift(wrappedHook);
            } else {
                hooks.push(wrappedHook);
            }
            return wrappedHook;
        }
    }

    const createHook = (lifecycle) => (hook, target = currentInstance) => (
        // post-create lifecycle registrations are noops during SSR (except for serverPrefetch)
        (!isInSSRComponentSetup || lifecycle === "sp") && injectHook(lifecycle, (...args) => hook(...args), target)
    );
    const onBeforeMount = createHook(
        "bm"
        /* LifecycleHooks.BEFORE_MOUNT */
    );
    const onMounted = createHook(
        "m"
        /* LifecycleHooks.MOUNTED */
    );
    const onBeforeUpdate = createHook(
        "bu"
        /* LifecycleHooks.BEFORE_UPDATE */
    );
    const onUpdated = createHook(
        "u"
        /* LifecycleHooks.UPDATED */
    );
    const onBeforeUnmount = createHook(
        "bum"
        /* LifecycleHooks.BEFORE_UNMOUNT */
    );
    const onUnmounted = createHook(
        "um"
        /* LifecycleHooks.UNMOUNTED */
    );
    const onServerPrefetch = createHook(
        "sp"
        /* LifecycleHooks.SERVER_PREFETCH */
    );
    const onRenderTriggered = createHook(
        "rtg"
        /* LifecycleHooks.RENDER_TRIGGERED */
    );
    const onRenderTracked = createHook(
        "rtc"
        /* LifecycleHooks.RENDER_TRACKED */
    );

    function onErrorCaptured(hook, target = currentInstance) {
        injectHook("ec", hook, target);
    }

    function withDirectives(vnode, directives) {
        const internalInstance = currentRenderingInstance;
        if (internalInstance === null) {
            return vnode;
        }
        const instance = getExposeProxy(internalInstance) || internalInstance.proxy;
        const bindings = vnode.dirs || (vnode.dirs = []);
        for (let i2 = 0; i2 < directives.length; i2++) {
            let [dir, value, arg, modifiers = EMPTY_OBJ] = directives[i2];
            if (dir) {
                if (isFunction(dir)) {
                    dir = {
                        mounted: dir,
                        updated: dir
                    };
                }
                if (dir.deep) {
                    traverse(value);
                }
                bindings.push({
                    dir,
                    instance,
                    value,
                    oldValue: void 0,
                    arg,
                    modifiers
                });
            }
        }
        return vnode;
    }

    function invokeDirectiveHook(vnode, prevVNode, instance, name) {
        const bindings = vnode.dirs;
        const oldBindings = prevVNode && prevVNode.dirs;
        for (let i2 = 0; i2 < bindings.length; i2++) {
            const binding = bindings[i2];
            if (oldBindings) {
                binding.oldValue = oldBindings[i2].value;
            }
            let hook = binding.dir[name];
            if (hook) {
                pauseTracking();
                callWithAsyncErrorHandling(hook, instance, 8, [
                    vnode.el,
                    binding,
                    vnode,
                    prevVNode
                ]);
                resetTracking();
            }
        }
    }

    const NULL_DYNAMIC_COMPONENT = Symbol();
    const getPublicInstance = (i2) => {
        if (!i2)
            return null;
        if (isStatefulComponent(i2))
            return getExposeProxy(i2) || i2.proxy;
        return getPublicInstance(i2.parent);
    };
    const publicPropertiesMap = (
        // Move PURE marker to new line to workaround compiler discarding it
        // due to type annotation
        /* @__PURE__ */ extend(/* @__PURE__ */ Object.create(null), {
            $: (i2) => i2,
            $el: (i2) => i2.vnode.el,
            $data: (i2) => i2.data,
            $props: (i2) => i2.props,
            $attrs: (i2) => i2.attrs,
            $slots: (i2) => i2.slots,
            $refs: (i2) => i2.refs,
            $parent: (i2) => getPublicInstance(i2.parent),
            $root: (i2) => getPublicInstance(i2.root),
            $emit: (i2) => i2.emit,
            $options: (i2) => resolveMergedOptions(i2),
            $forceUpdate: (i2) => i2.f || (i2.f = () => queueJob(i2.update)),
            $nextTick: (i2) => i2.n || (i2.n = nextTick.bind(i2.proxy)),
            $watch: (i2) => instanceWatch.bind(i2)
        })
    );
    const hasSetupBinding = (state, key2) => state !== EMPTY_OBJ && !state.__isScriptSetup && hasOwn(state, key2);
    const PublicInstanceProxyHandlers = {
        get({_: instance}, key2) {
            const {ctx, setupState, data, props, accessCache, type, appContext} = instance;
            let normalizedProps;
            if (key2[0] !== "$") {
                const n2 = accessCache[key2];
                if (n2 !== void 0) {
                    switch (n2) {
                        case 1:
                            return setupState[key2];
                        case 2:
                            return data[key2];
                        case 4:
                            return ctx[key2];
                        case 3:
                            return props[key2];
                    }
                } else if (hasSetupBinding(setupState, key2)) {
                    accessCache[key2] = 1;
                    return setupState[key2];
                } else if (data !== EMPTY_OBJ && hasOwn(data, key2)) {
                    accessCache[key2] = 2;
                    return data[key2];
                } else if (
                    // only cache other properties when instance has declared (thus stable)
                    // props
                    (normalizedProps = instance.propsOptions[0]) && hasOwn(normalizedProps, key2)
                ) {
                    accessCache[key2] = 3;
                    return props[key2];
                } else if (ctx !== EMPTY_OBJ && hasOwn(ctx, key2)) {
                    accessCache[key2] = 4;
                    return ctx[key2];
                } else if (shouldCacheAccess) {
                    accessCache[key2] = 0;
                }
            }
            const publicGetter = publicPropertiesMap[key2];
            let cssModule, globalProperties;
            if (publicGetter) {
                if (key2 === "$attrs") {
                    track(instance, "get", key2);
                }
                return publicGetter(instance);
            } else if (
                // css module (injected by vue-loader)
                (cssModule = type.__cssModules) && (cssModule = cssModule[key2])
            ) {
                return cssModule;
            } else if (ctx !== EMPTY_OBJ && hasOwn(ctx, key2)) {
                accessCache[key2] = 4;
                return ctx[key2];
            } else if (
                // global properties
                globalProperties = appContext.config.globalProperties, hasOwn(globalProperties, key2)
            ) {
                {
                    return globalProperties[key2];
                }
            } else
                ;
        },
        set({_: instance}, key2, value) {
            const {data, setupState, ctx} = instance;
            if (hasSetupBinding(setupState, key2)) {
                setupState[key2] = value;
                return true;
            } else if (data !== EMPTY_OBJ && hasOwn(data, key2)) {
                data[key2] = value;
                return true;
            } else if (hasOwn(instance.props, key2)) {
                return false;
            }
            if (key2[0] === "$" && key2.slice(1) in instance) {
                return false;
            } else {
                {
                    ctx[key2] = value;
                }
            }
            return true;
        },
        has({_: {data, setupState, accessCache, ctx, appContext, propsOptions}}, key2) {
            let normalizedProps;
            return !!accessCache[key2] || data !== EMPTY_OBJ && hasOwn(data, key2) || hasSetupBinding(setupState, key2) || (normalizedProps = propsOptions[0]) && hasOwn(normalizedProps, key2) || hasOwn(ctx, key2) || hasOwn(publicPropertiesMap, key2) || hasOwn(appContext.config.globalProperties, key2);
        },
        defineProperty(target, key2, descriptor) {
            if (descriptor.get != null) {
                target._.accessCache[key2] = 0;
            } else if (hasOwn(descriptor, "value")) {
                this.set(target, key2, descriptor.value, null);
            }
            return Reflect.defineProperty(target, key2, descriptor);
        }
    };
    let shouldCacheAccess = true;

    function applyOptions(instance) {
        const options = resolveMergedOptions(instance);
        const publicThis = instance.proxy;
        const ctx = instance.ctx;
        shouldCacheAccess = false;
        if (options.beforeCreate) {
            callHook$1(
                options.beforeCreate,
                instance,
                "bc"
                /* LifecycleHooks.BEFORE_CREATE */
            );
        }
        const {
            // state
            data: dataOptions,
            computed: computedOptions,
            methods,
            watch: watchOptions,
            provide: provideOptions,
            inject: injectOptions,
            // lifecycle
            created,
            beforeMount,
            mounted,
            beforeUpdate,
            updated,
            activated,
            deactivated,
            beforeDestroy,
            beforeUnmount,
            destroyed,
            unmounted,
            render: render2,
            renderTracked,
            renderTriggered,
            errorCaptured,
            serverPrefetch,
            // public API
            expose,
            inheritAttrs,
            // assets
            components,
            directives,
            filters
        } = options;
        const checkDuplicateProperties = null;
        if (injectOptions) {
            resolveInjections(injectOptions, ctx, checkDuplicateProperties, instance.appContext.config.unwrapInjectedRef);
        }
        if (methods) {
            for (const key2 in methods) {
                const methodHandler = methods[key2];
                if (isFunction(methodHandler)) {
                    {
                        ctx[key2] = methodHandler.bind(publicThis);
                    }
                }
            }
        }
        if (dataOptions) {
            const data = dataOptions.call(publicThis, publicThis);
            if (!isObject$1(data))
                ;
            else {
                instance.data = reactive(data);
            }
        }
        shouldCacheAccess = true;
        if (computedOptions) {
            for (const key2 in computedOptions) {
                const opt = computedOptions[key2];
                const get2 = isFunction(opt) ? opt.bind(publicThis, publicThis) : isFunction(opt.get) ? opt.get.bind(publicThis, publicThis) : NOOP;
                const set2 = !isFunction(opt) && isFunction(opt.set) ? opt.set.bind(publicThis) : NOOP;
                const c2 = computed({
                    get: get2,
                    set: set2
                });
                Object.defineProperty(ctx, key2, {
                    enumerable: true,
                    configurable: true,
                    get: () => c2.value,
                    set: (v2) => c2.value = v2
                });
            }
        }
        if (watchOptions) {
            for (const key2 in watchOptions) {
                createWatcher(watchOptions[key2], ctx, publicThis, key2);
            }
        }
        if (provideOptions) {
            const provides = isFunction(provideOptions) ? provideOptions.call(publicThis) : provideOptions;
            Reflect.ownKeys(provides).forEach((key2) => {
                provide(key2, provides[key2]);
            });
        }
        if (created) {
            callHook$1(
                created,
                instance,
                "c"
                /* LifecycleHooks.CREATED */
            );
        }

        function registerLifecycleHook(register, hook) {
            if (isArray$1(hook)) {
                hook.forEach((_hook) => register(_hook.bind(publicThis)));
            } else if (hook) {
                register(hook.bind(publicThis));
            }
        }

        registerLifecycleHook(onBeforeMount, beforeMount);
        registerLifecycleHook(onMounted, mounted);
        registerLifecycleHook(onBeforeUpdate, beforeUpdate);
        registerLifecycleHook(onUpdated, updated);
        registerLifecycleHook(onActivated, activated);
        registerLifecycleHook(onDeactivated, deactivated);
        registerLifecycleHook(onErrorCaptured, errorCaptured);
        registerLifecycleHook(onRenderTracked, renderTracked);
        registerLifecycleHook(onRenderTriggered, renderTriggered);
        registerLifecycleHook(onBeforeUnmount, beforeUnmount);
        registerLifecycleHook(onUnmounted, unmounted);
        registerLifecycleHook(onServerPrefetch, serverPrefetch);
        if (isArray$1(expose)) {
            if (expose.length) {
                const exposed = instance.exposed || (instance.exposed = {});
                expose.forEach((key2) => {
                    Object.defineProperty(exposed, key2, {
                        get: () => publicThis[key2],
                        set: (val) => publicThis[key2] = val
                    });
                });
            } else if (!instance.exposed) {
                instance.exposed = {};
            }
        }
        if (render2 && instance.render === NOOP) {
            instance.render = render2;
        }
        if (inheritAttrs != null) {
            instance.inheritAttrs = inheritAttrs;
        }
        if (components)
            instance.components = components;
        if (directives)
            instance.directives = directives;
    }

    function resolveInjections(injectOptions, ctx, checkDuplicateProperties = NOOP, unwrapRef = false) {
        if (isArray$1(injectOptions)) {
            injectOptions = normalizeInject(injectOptions);
        }
        for (const key2 in injectOptions) {
            const opt = injectOptions[key2];
            let injected;
            if (isObject$1(opt)) {
                if ("default" in opt) {
                    injected = inject(
                        opt.from || key2,
                        opt.default,
                        true
                        /* treat default function as factory */
                    );
                } else {
                    injected = inject(opt.from || key2);
                }
            } else {
                injected = inject(opt);
            }
            if (isRef(injected)) {
                if (unwrapRef) {
                    Object.defineProperty(ctx, key2, {
                        enumerable: true,
                        configurable: true,
                        get: () => injected.value,
                        set: (v2) => injected.value = v2
                    });
                } else {
                    ctx[key2] = injected;
                }
            } else {
                ctx[key2] = injected;
            }
        }
    }

    function callHook$1(hook, instance, type) {
        callWithAsyncErrorHandling(isArray$1(hook) ? hook.map((h2) => h2.bind(instance.proxy)) : hook.bind(instance.proxy), instance, type);
    }

    function createWatcher(raw, ctx, publicThis, key2) {
        const getter = key2.includes(".") ? createPathGetter(publicThis, key2) : () => publicThis[key2];
        if (isString$1(raw)) {
            const handler = ctx[raw];
            if (isFunction(handler)) {
                watch(getter, handler);
            }
        } else if (isFunction(raw)) {
            watch(getter, raw.bind(publicThis));
        } else if (isObject$1(raw)) {
            if (isArray$1(raw)) {
                raw.forEach((r2) => createWatcher(r2, ctx, publicThis, key2));
            } else {
                const handler = isFunction(raw.handler) ? raw.handler.bind(publicThis) : ctx[raw.handler];
                if (isFunction(handler)) {
                    watch(getter, handler, raw);
                }
            }
        } else
            ;
    }

    function resolveMergedOptions(instance) {
        const base = instance.type;
        const {mixins, extends: extendsOptions} = base;
        const {mixins: globalMixins, optionsCache: cache, config: {optionMergeStrategies}} = instance.appContext;
        const cached2 = cache.get(base);
        let resolved;
        if (cached2) {
            resolved = cached2;
        } else if (!globalMixins.length && !mixins && !extendsOptions) {
            {
                resolved = base;
            }
        } else {
            resolved = {};
            if (globalMixins.length) {
                globalMixins.forEach((m2) => mergeOptions(resolved, m2, optionMergeStrategies, true));
            }
            mergeOptions(resolved, base, optionMergeStrategies);
        }
        if (isObject$1(base)) {
            cache.set(base, resolved);
        }
        return resolved;
    }

    function mergeOptions(to, from, strats, asMixin = false) {
        const {mixins, extends: extendsOptions} = from;
        if (extendsOptions) {
            mergeOptions(to, extendsOptions, strats, true);
        }
        if (mixins) {
            mixins.forEach((m2) => mergeOptions(to, m2, strats, true));
        }
        for (const key2 in from) {
            if (asMixin && key2 === "expose")
                ;
            else {
                const strat = internalOptionMergeStrats[key2] || strats && strats[key2];
                to[key2] = strat ? strat(to[key2], from[key2]) : from[key2];
            }
        }
        return to;
    }

    const internalOptionMergeStrats = {
        data: mergeDataFn,
        props: mergeObjectOptions,
        emits: mergeObjectOptions,
        // objects
        methods: mergeObjectOptions,
        computed: mergeObjectOptions,
        // lifecycle
        beforeCreate: mergeAsArray,
        created: mergeAsArray,
        beforeMount: mergeAsArray,
        mounted: mergeAsArray,
        beforeUpdate: mergeAsArray,
        updated: mergeAsArray,
        beforeDestroy: mergeAsArray,
        beforeUnmount: mergeAsArray,
        destroyed: mergeAsArray,
        unmounted: mergeAsArray,
        activated: mergeAsArray,
        deactivated: mergeAsArray,
        errorCaptured: mergeAsArray,
        serverPrefetch: mergeAsArray,
        // assets
        components: mergeObjectOptions,
        directives: mergeObjectOptions,
        // watch
        watch: mergeWatchOptions,
        // provide / inject
        provide: mergeDataFn,
        inject: mergeInject
    };

    function mergeDataFn(to, from) {
        if (!from) {
            return to;
        }
        if (!to) {
            return from;
        }
        return function mergedDataFn() {
            return extend(isFunction(to) ? to.call(this, this) : to, isFunction(from) ? from.call(this, this) : from);
        };
    }

    function mergeInject(to, from) {
        return mergeObjectOptions(normalizeInject(to), normalizeInject(from));
    }

    function normalizeInject(raw) {
        if (isArray$1(raw)) {
            const res = {};
            for (let i2 = 0; i2 < raw.length; i2++) {
                res[raw[i2]] = raw[i2];
            }
            return res;
        }
        return raw;
    }

    function mergeAsArray(to, from) {
        return to ? [...new Set([].concat(to, from))] : from;
    }

    function mergeObjectOptions(to, from) {
        return to ? extend(extend(/* @__PURE__ */ Object.create(null), to), from) : from;
    }

    function mergeWatchOptions(to, from) {
        if (!to)
            return from;
        if (!from)
            return to;
        const merged = extend(/* @__PURE__ */ Object.create(null), to);
        for (const key2 in from) {
            merged[key2] = mergeAsArray(to[key2], from[key2]);
        }
        return merged;
    }

    function initProps(instance, rawProps, isStateful, isSSR = false) {
        const props = {};
        const attrs = {};
        def(attrs, InternalObjectKey, 1);
        instance.propsDefaults = /* @__PURE__ */ Object.create(null);
        setFullProps(instance, rawProps, props, attrs);
        for (const key2 in instance.propsOptions[0]) {
            if (!(key2 in props)) {
                props[key2] = void 0;
            }
        }
        if (isStateful) {
            instance.props = isSSR ? props : shallowReactive(props);
        } else {
            if (!instance.type.props) {
                instance.props = attrs;
            } else {
                instance.props = props;
            }
        }
        instance.attrs = attrs;
    }

    function updateProps(instance, rawProps, rawPrevProps, optimized) {
        const {props, attrs, vnode: {patchFlag}} = instance;
        const rawCurrentProps = toRaw(props);
        const [options] = instance.propsOptions;
        let hasAttrsChanged = false;
        if (
            // always force full diff in dev
            // - #1942 if hmr is enabled with sfc component
            // - vite#872 non-sfc component used by sfc component
            (optimized || patchFlag > 0) && !(patchFlag & 16)
        ) {
            if (patchFlag & 8) {
                const propsToUpdate = instance.vnode.dynamicProps;
                for (let i2 = 0; i2 < propsToUpdate.length; i2++) {
                    let key2 = propsToUpdate[i2];
                    if (isEmitListener(instance.emitsOptions, key2)) {
                        continue;
                    }
                    const value = rawProps[key2];
                    if (options) {
                        if (hasOwn(attrs, key2)) {
                            if (value !== attrs[key2]) {
                                attrs[key2] = value;
                                hasAttrsChanged = true;
                            }
                        } else {
                            const camelizedKey = camelize(key2);
                            props[camelizedKey] = resolvePropValue(
                                options,
                                rawCurrentProps,
                                camelizedKey,
                                value,
                                instance,
                                false
                                /* isAbsent */
                            );
                        }
                    } else {
                        if (value !== attrs[key2]) {
                            attrs[key2] = value;
                            hasAttrsChanged = true;
                        }
                    }
                }
            }
        } else {
            if (setFullProps(instance, rawProps, props, attrs)) {
                hasAttrsChanged = true;
            }
            let kebabKey;
            for (const key2 in rawCurrentProps) {
                if (!rawProps || // for camelCase
                    !hasOwn(rawProps, key2) && // it's possible the original props was passed in as kebab-case
                    // and converted to camelCase (#955)
                    ((kebabKey = hyphenate(key2)) === key2 || !hasOwn(rawProps, kebabKey))) {
                    if (options) {
                        if (rawPrevProps && // for camelCase
                            (rawPrevProps[key2] !== void 0 || // for kebab-case
                                rawPrevProps[kebabKey] !== void 0)) {
                            props[key2] = resolvePropValue(
                                options,
                                rawCurrentProps,
                                key2,
                                void 0,
                                instance,
                                true
                                /* isAbsent */
                            );
                        }
                    } else {
                        delete props[key2];
                    }
                }
            }
            if (attrs !== rawCurrentProps) {
                for (const key2 in attrs) {
                    if (!rawProps || !hasOwn(rawProps, key2) && true) {
                        delete attrs[key2];
                        hasAttrsChanged = true;
                    }
                }
            }
        }
        if (hasAttrsChanged) {
            trigger(instance, "set", "$attrs");
        }
    }

    function setFullProps(instance, rawProps, props, attrs) {
        const [options, needCastKeys] = instance.propsOptions;
        let hasAttrsChanged = false;
        let rawCastValues;
        if (rawProps) {
            for (let key2 in rawProps) {
                if (isReservedProp(key2)) {
                    continue;
                }
                const value = rawProps[key2];
                let camelKey;
                if (options && hasOwn(options, camelKey = camelize(key2))) {
                    if (!needCastKeys || !needCastKeys.includes(camelKey)) {
                        props[camelKey] = value;
                    } else {
                        (rawCastValues || (rawCastValues = {}))[camelKey] = value;
                    }
                } else if (!isEmitListener(instance.emitsOptions, key2)) {
                    if (!(key2 in attrs) || value !== attrs[key2]) {
                        attrs[key2] = value;
                        hasAttrsChanged = true;
                    }
                }
            }
        }
        if (needCastKeys) {
            const rawCurrentProps = toRaw(props);
            const castValues = rawCastValues || EMPTY_OBJ;
            for (let i2 = 0; i2 < needCastKeys.length; i2++) {
                const key2 = needCastKeys[i2];
                props[key2] = resolvePropValue(options, rawCurrentProps, key2, castValues[key2], instance, !hasOwn(castValues, key2));
            }
        }
        return hasAttrsChanged;
    }

    function resolvePropValue(options, props, key2, value, instance, isAbsent) {
        const opt = options[key2];
        if (opt != null) {
            const hasDefault = hasOwn(opt, "default");
            if (hasDefault && value === void 0) {
                const defaultValue = opt.default;
                if (opt.type !== Function && isFunction(defaultValue)) {
                    const {propsDefaults} = instance;
                    if (key2 in propsDefaults) {
                        value = propsDefaults[key2];
                    } else {
                        setCurrentInstance(instance);
                        value = propsDefaults[key2] = defaultValue.call(null, props);
                        unsetCurrentInstance();
                    }
                } else {
                    value = defaultValue;
                }
            }
            if (opt[
                0
                /* BooleanFlags.shouldCast */
                ]) {
                if (isAbsent && !hasDefault) {
                    value = false;
                } else if (opt[
                    1
                    /* BooleanFlags.shouldCastTrue */
                    ] && (value === "" || value === hyphenate(key2))) {
                    value = true;
                }
            }
        }
        return value;
    }

    function normalizePropsOptions(comp, appContext, asMixin = false) {
        const cache = appContext.propsCache;
        const cached2 = cache.get(comp);
        if (cached2) {
            return cached2;
        }
        const raw = comp.props;
        const normalized = {};
        const needCastKeys = [];
        let hasExtends = false;
        if (!isFunction(comp)) {
            const extendProps = (raw2) => {
                hasExtends = true;
                const [props, keys] = normalizePropsOptions(raw2, appContext, true);
                extend(normalized, props);
                if (keys)
                    needCastKeys.push(...keys);
            };
            if (!asMixin && appContext.mixins.length) {
                appContext.mixins.forEach(extendProps);
            }
            if (comp.extends) {
                extendProps(comp.extends);
            }
            if (comp.mixins) {
                comp.mixins.forEach(extendProps);
            }
        }
        if (!raw && !hasExtends) {
            if (isObject$1(comp)) {
                cache.set(comp, EMPTY_ARR);
            }
            return EMPTY_ARR;
        }
        if (isArray$1(raw)) {
            for (let i2 = 0; i2 < raw.length; i2++) {
                const normalizedKey = camelize(raw[i2]);
                if (validatePropName(normalizedKey)) {
                    normalized[normalizedKey] = EMPTY_OBJ;
                }
            }
        } else if (raw) {
            for (const key2 in raw) {
                const normalizedKey = camelize(key2);
                if (validatePropName(normalizedKey)) {
                    const opt = raw[key2];
                    const prop = normalized[normalizedKey] = isArray$1(opt) || isFunction(opt) ? {type: opt} : Object.assign({}, opt);
                    if (prop) {
                        const booleanIndex = getTypeIndex(Boolean, prop.type);
                        const stringIndex = getTypeIndex(String, prop.type);
                        prop[
                            0
                            /* BooleanFlags.shouldCast */
                            ] = booleanIndex > -1;
                        prop[
                            1
                            /* BooleanFlags.shouldCastTrue */
                            ] = stringIndex < 0 || booleanIndex < stringIndex;
                        if (booleanIndex > -1 || hasOwn(prop, "default")) {
                            needCastKeys.push(normalizedKey);
                        }
                    }
                }
            }
        }
        const res = [normalized, needCastKeys];
        if (isObject$1(comp)) {
            cache.set(comp, res);
        }
        return res;
    }

    function validatePropName(key2) {
        if (key2[0] !== "$") {
            return true;
        }
        return false;
    }

    function getType(ctor) {
        const match2 = ctor && ctor.toString().match(/^\s*(function|class) (\w+)/);
        return match2 ? match2[2] : ctor === null ? "null" : "";
    }

    function isSameType(a2, b2) {
        return getType(a2) === getType(b2);
    }

    function getTypeIndex(type, expectedTypes) {
        if (isArray$1(expectedTypes)) {
            return expectedTypes.findIndex((t2) => isSameType(t2, type));
        } else if (isFunction(expectedTypes)) {
            return isSameType(expectedTypes, type) ? 0 : -1;
        }
        return -1;
    }

    const isInternalKey = (key2) => key2[0] === "_" || key2 === "$stable";
    const normalizeSlotValue = (value) => isArray$1(value) ? value.map(normalizeVNode) : [normalizeVNode(value)];
    const normalizeSlot = (key2, rawSlot, ctx) => {
        if (rawSlot._n) {
            return rawSlot;
        }
        const normalized = withCtx((...args) => {
            if (false)
                ;
            return normalizeSlotValue(rawSlot(...args));
        }, ctx);
        normalized._c = false;
        return normalized;
    };
    const normalizeObjectSlots = (rawSlots, slots, instance) => {
        const ctx = rawSlots._ctx;
        for (const key2 in rawSlots) {
            if (isInternalKey(key2))
                continue;
            const value = rawSlots[key2];
            if (isFunction(value)) {
                slots[key2] = normalizeSlot(key2, value, ctx);
            } else if (value != null) {
                const normalized = normalizeSlotValue(value);
                slots[key2] = () => normalized;
            }
        }
    };
    const normalizeVNodeSlots = (instance, children) => {
        const normalized = normalizeSlotValue(children);
        instance.slots.default = () => normalized;
    };
    const initSlots = (instance, children) => {
        if (instance.vnode.shapeFlag & 32) {
            const type = children._;
            if (type) {
                instance.slots = toRaw(children);
                def(children, "_", type);
            } else {
                normalizeObjectSlots(children, instance.slots = {});
            }
        } else {
            instance.slots = {};
            if (children) {
                normalizeVNodeSlots(instance, children);
            }
        }
        def(instance.slots, InternalObjectKey, 1);
    };
    const updateSlots = (instance, children, optimized) => {
        const {vnode, slots} = instance;
        let needDeletionCheck = true;
        let deletionComparisonTarget = EMPTY_OBJ;
        if (vnode.shapeFlag & 32) {
            const type = children._;
            if (type) {
                if (optimized && type === 1) {
                    needDeletionCheck = false;
                } else {
                    extend(slots, children);
                    if (!optimized && type === 1) {
                        delete slots._;
                    }
                }
            } else {
                needDeletionCheck = !children.$stable;
                normalizeObjectSlots(children, slots);
            }
            deletionComparisonTarget = children;
        } else if (children) {
            normalizeVNodeSlots(instance, children);
            deletionComparisonTarget = {default: 1};
        }
        if (needDeletionCheck) {
            for (const key2 in slots) {
                if (!isInternalKey(key2) && !(key2 in deletionComparisonTarget)) {
                    delete slots[key2];
                }
            }
        }
    };

    function createAppContext() {
        return {
            app: null,
            config: {
                isNativeTag: NO,
                performance: false,
                globalProperties: {},
                optionMergeStrategies: {},
                errorHandler: void 0,
                warnHandler: void 0,
                compilerOptions: {}
            },
            mixins: [],
            components: {},
            directives: {},
            provides: /* @__PURE__ */ Object.create(null),
            optionsCache: /* @__PURE__ */ new WeakMap(),
            propsCache: /* @__PURE__ */ new WeakMap(),
            emitsCache: /* @__PURE__ */ new WeakMap()
        };
    }

    let uid$1 = 0;

    function createAppAPI(render2, hydrate) {
        return function createApp(rootComponent, rootProps = null) {
            if (!isFunction(rootComponent)) {
                rootComponent = Object.assign({}, rootComponent);
            }
            if (rootProps != null && !isObject$1(rootProps)) {
                rootProps = null;
            }
            const context = createAppContext();
            const installedPlugins = /* @__PURE__ */ new Set();
            let isMounted = false;
            const app = context.app = {
                _uid: uid$1++,
                _component: rootComponent,
                _props: rootProps,
                _container: null,
                _context: context,
                _instance: null,
                version,
                get config() {
                    return context.config;
                },
                set config(v2) {
                },
                use(plugin, ...options) {
                    if (installedPlugins.has(plugin))
                        ;
                    else if (plugin && isFunction(plugin.install)) {
                        installedPlugins.add(plugin);
                        plugin.install(app, ...options);
                    } else if (isFunction(plugin)) {
                        installedPlugins.add(plugin);
                        plugin(app, ...options);
                    } else
                        ;
                    return app;
                },
                mixin(mixin) {
                    {
                        if (!context.mixins.includes(mixin)) {
                            context.mixins.push(mixin);
                        }
                    }
                    return app;
                },
                component(name, component) {
                    if (!component) {
                        return context.components[name];
                    }
                    context.components[name] = component;
                    return app;
                },
                directive(name, directive) {
                    if (!directive) {
                        return context.directives[name];
                    }
                    context.directives[name] = directive;
                    return app;
                },
                mount(rootContainer, isHydrate, isSVG) {
                    if (!isMounted) {
                        const vnode = createVNode(rootComponent, rootProps);
                        vnode.appContext = context;
                        if (isHydrate && hydrate) {
                            hydrate(vnode, rootContainer);
                        } else {
                            render2(vnode, rootContainer, isSVG);
                        }
                        isMounted = true;
                        app._container = rootContainer;
                        rootContainer.__vue_app__ = app;
                        return getExposeProxy(vnode.component) || vnode.component.proxy;
                    }
                },
                unmount() {
                    if (isMounted) {
                        render2(null, app._container);
                        delete app._container.__vue_app__;
                    }
                },
                provide(key2, value) {
                    context.provides[key2] = value;
                    return app;
                }
            };
            return app;
        };
    }

    function setRef(rawRef, oldRawRef, parentSuspense, vnode, isUnmount = false) {
        if (isArray$1(rawRef)) {
            rawRef.forEach((r2, i2) => setRef(r2, oldRawRef && (isArray$1(oldRawRef) ? oldRawRef[i2] : oldRawRef), parentSuspense, vnode, isUnmount));
            return;
        }
        if (isAsyncWrapper(vnode) && !isUnmount) {
            return;
        }
        const refValue = vnode.shapeFlag & 4 ? getExposeProxy(vnode.component) || vnode.component.proxy : vnode.el;
        const value = isUnmount ? null : refValue;
        const {i: owner, r: ref2} = rawRef;
        const oldRef = oldRawRef && oldRawRef.r;
        const refs = owner.refs === EMPTY_OBJ ? owner.refs = {} : owner.refs;
        const setupState = owner.setupState;
        if (oldRef != null && oldRef !== ref2) {
            if (isString$1(oldRef)) {
                refs[oldRef] = null;
                if (hasOwn(setupState, oldRef)) {
                    setupState[oldRef] = null;
                }
            } else if (isRef(oldRef)) {
                oldRef.value = null;
            }
        }
        if (isFunction(ref2)) {
            callWithErrorHandling(ref2, owner, 12, [value, refs]);
        } else {
            const _isString = isString$1(ref2);
            const _isRef = isRef(ref2);
            if (_isString || _isRef) {
                const doSet = () => {
                    if (rawRef.f) {
                        const existing = _isString ? hasOwn(setupState, ref2) ? setupState[ref2] : refs[ref2] : ref2.value;
                        if (isUnmount) {
                            isArray$1(existing) && remove(existing, refValue);
                        } else {
                            if (!isArray$1(existing)) {
                                if (_isString) {
                                    refs[ref2] = [refValue];
                                    if (hasOwn(setupState, ref2)) {
                                        setupState[ref2] = refs[ref2];
                                    }
                                } else {
                                    ref2.value = [refValue];
                                    if (rawRef.k)
                                        refs[rawRef.k] = ref2.value;
                                }
                            } else if (!existing.includes(refValue)) {
                                existing.push(refValue);
                            }
                        }
                    } else if (_isString) {
                        refs[ref2] = value;
                        if (hasOwn(setupState, ref2)) {
                            setupState[ref2] = value;
                        }
                    } else if (_isRef) {
                        ref2.value = value;
                        if (rawRef.k)
                            refs[rawRef.k] = value;
                    } else
                        ;
                };
                if (value) {
                    doSet.id = -1;
                    queuePostRenderEffect(doSet, parentSuspense);
                } else {
                    doSet();
                }
            }
        }
    }

    const queuePostRenderEffect = queueEffectWithSuspense;

    function createRenderer(options) {
        return baseCreateRenderer(options);
    }

    function baseCreateRenderer(options, createHydrationFns) {
        const target = getGlobalThis();
        target.__VUE__ = true;
        const {
            insert: hostInsert,
            remove: hostRemove,
            patchProp: hostPatchProp,
            createElement: hostCreateElement,
            createText: hostCreateText,
            createComment: hostCreateComment,
            setText: hostSetText,
            setElementText: hostSetElementText,
            parentNode: hostParentNode,
            nextSibling: hostNextSibling,
            setScopeId: hostSetScopeId = NOOP,
            insertStaticContent: hostInsertStaticContent
        } = options;
        const patch = (n1, n2, container, anchor = null, parentComponent = null, parentSuspense = null, isSVG = false, slotScopeIds = null, optimized = !!n2.dynamicChildren) => {
            if (n1 === n2) {
                return;
            }
            if (n1 && !isSameVNodeType(n1, n2)) {
                anchor = getNextHostNode(n1);
                unmount(n1, parentComponent, parentSuspense, true);
                n1 = null;
            }
            if (n2.patchFlag === -2) {
                optimized = false;
                n2.dynamicChildren = null;
            }
            const {type, ref: ref2, shapeFlag} = n2;
            switch (type) {
                case Text:
                    processText(n1, n2, container, anchor);
                    break;
                case Comment:
                    processCommentNode(n1, n2, container, anchor);
                    break;
                case Static:
                    if (n1 == null) {
                        mountStaticNode(n2, container, anchor, isSVG);
                    }
                    break;
                case Fragment:
                    processFragment(n1, n2, container, anchor, parentComponent, parentSuspense, isSVG, slotScopeIds, optimized);
                    break;
                default:
                    if (shapeFlag & 1) {
                        processElement(n1, n2, container, anchor, parentComponent, parentSuspense, isSVG, slotScopeIds, optimized);
                    } else if (shapeFlag & 6) {
                        processComponent(n1, n2, container, anchor, parentComponent, parentSuspense, isSVG, slotScopeIds, optimized);
                    } else if (shapeFlag & 64) {
                        type.process(n1, n2, container, anchor, parentComponent, parentSuspense, isSVG, slotScopeIds, optimized, internals);
                    } else if (shapeFlag & 128) {
                        type.process(n1, n2, container, anchor, parentComponent, parentSuspense, isSVG, slotScopeIds, optimized, internals);
                    } else
                        ;
            }
            if (ref2 != null && parentComponent) {
                setRef(ref2, n1 && n1.ref, parentSuspense, n2 || n1, !n2);
            }
        };
        const processText = (n1, n2, container, anchor) => {
            if (n1 == null) {
                hostInsert(n2.el = hostCreateText(n2.children), container, anchor);
            } else {
                const el = n2.el = n1.el;
                if (n2.children !== n1.children) {
                    hostSetText(el, n2.children);
                }
            }
        };
        const processCommentNode = (n1, n2, container, anchor) => {
            if (n1 == null) {
                hostInsert(n2.el = hostCreateComment(n2.children || ""), container, anchor);
            } else {
                n2.el = n1.el;
            }
        };
        const mountStaticNode = (n2, container, anchor, isSVG) => {
            [n2.el, n2.anchor] = hostInsertStaticContent(n2.children, container, anchor, isSVG, n2.el, n2.anchor);
        };
        const moveStaticNode = ({el, anchor}, container, nextSibling) => {
            let next;
            while (el && el !== anchor) {
                next = hostNextSibling(el);
                hostInsert(el, container, nextSibling);
                el = next;
            }
            hostInsert(anchor, container, nextSibling);
        };
        const removeStaticNode = ({el, anchor}) => {
            let next;
            while (el && el !== anchor) {
                next = hostNextSibling(el);
                hostRemove(el);
                el = next;
            }
            hostRemove(anchor);
        };
        const processElement = (n1, n2, container, anchor, parentComponent, parentSuspense, isSVG, slotScopeIds, optimized) => {
            isSVG = isSVG || n2.type === "svg";
            if (n1 == null) {
                mountElement(n2, container, anchor, parentComponent, parentSuspense, isSVG, slotScopeIds, optimized);
            } else {
                patchElement(n1, n2, parentComponent, parentSuspense, isSVG, slotScopeIds, optimized);
            }
        };
        const mountElement = (vnode, container, anchor, parentComponent, parentSuspense, isSVG, slotScopeIds, optimized) => {
            let el;
            let vnodeHook;
            const {type, props, shapeFlag, transition, dirs} = vnode;
            el = vnode.el = hostCreateElement(vnode.type, isSVG, props && props.is, props);
            if (shapeFlag & 8) {
                hostSetElementText(el, vnode.children);
            } else if (shapeFlag & 16) {
                mountChildren(vnode.children, el, null, parentComponent, parentSuspense, isSVG && type !== "foreignObject", slotScopeIds, optimized);
            }
            if (dirs) {
                invokeDirectiveHook(vnode, null, parentComponent, "created");
            }
            setScopeId(el, vnode, vnode.scopeId, slotScopeIds, parentComponent);
            if (props) {
                for (const key2 in props) {
                    if (key2 !== "value" && !isReservedProp(key2)) {
                        hostPatchProp(el, key2, null, props[key2], isSVG, vnode.children, parentComponent, parentSuspense, unmountChildren);
                    }
                }
                if ("value" in props) {
                    hostPatchProp(el, "value", null, props.value);
                }
                if (vnodeHook = props.onVnodeBeforeMount) {
                    invokeVNodeHook(vnodeHook, parentComponent, vnode);
                }
            }
            if (dirs) {
                invokeDirectiveHook(vnode, null, parentComponent, "beforeMount");
            }
            const needCallTransitionHooks = (!parentSuspense || parentSuspense && !parentSuspense.pendingBranch) && transition && !transition.persisted;
            if (needCallTransitionHooks) {
                transition.beforeEnter(el);
            }
            hostInsert(el, container, anchor);
            if ((vnodeHook = props && props.onVnodeMounted) || needCallTransitionHooks || dirs) {
                queuePostRenderEffect(() => {
                    vnodeHook && invokeVNodeHook(vnodeHook, parentComponent, vnode);
                    needCallTransitionHooks && transition.enter(el);
                    dirs && invokeDirectiveHook(vnode, null, parentComponent, "mounted");
                }, parentSuspense);
            }
        };
        const setScopeId = (el, vnode, scopeId, slotScopeIds, parentComponent) => {
            if (scopeId) {
                hostSetScopeId(el, scopeId);
            }
            if (slotScopeIds) {
                for (let i2 = 0; i2 < slotScopeIds.length; i2++) {
                    hostSetScopeId(el, slotScopeIds[i2]);
                }
            }
            if (parentComponent) {
                let subTree = parentComponent.subTree;
                if (vnode === subTree) {
                    const parentVNode = parentComponent.vnode;
                    setScopeId(el, parentVNode, parentVNode.scopeId, parentVNode.slotScopeIds, parentComponent.parent);
                }
            }
        };
        const mountChildren = (children, container, anchor, parentComponent, parentSuspense, isSVG, slotScopeIds, optimized, start = 0) => {
            for (let i2 = start; i2 < children.length; i2++) {
                const child = children[i2] = optimized ? cloneIfMounted(children[i2]) : normalizeVNode(children[i2]);
                patch(null, child, container, anchor, parentComponent, parentSuspense, isSVG, slotScopeIds, optimized);
            }
        };
        const patchElement = (n1, n2, parentComponent, parentSuspense, isSVG, slotScopeIds, optimized) => {
            const el = n2.el = n1.el;
            let {patchFlag, dynamicChildren, dirs} = n2;
            patchFlag |= n1.patchFlag & 16;
            const oldProps = n1.props || EMPTY_OBJ;
            const newProps = n2.props || EMPTY_OBJ;
            let vnodeHook;
            parentComponent && toggleRecurse(parentComponent, false);
            if (vnodeHook = newProps.onVnodeBeforeUpdate) {
                invokeVNodeHook(vnodeHook, parentComponent, n2, n1);
            }
            if (dirs) {
                invokeDirectiveHook(n2, n1, parentComponent, "beforeUpdate");
            }
            parentComponent && toggleRecurse(parentComponent, true);
            const areChildrenSVG = isSVG && n2.type !== "foreignObject";
            if (dynamicChildren) {
                patchBlockChildren(n1.dynamicChildren, dynamicChildren, el, parentComponent, parentSuspense, areChildrenSVG, slotScopeIds);
            } else if (!optimized) {
                patchChildren(n1, n2, el, null, parentComponent, parentSuspense, areChildrenSVG, slotScopeIds, false);
            }
            if (patchFlag > 0) {
                if (patchFlag & 16) {
                    patchProps(el, n2, oldProps, newProps, parentComponent, parentSuspense, isSVG);
                } else {
                    if (patchFlag & 2) {
                        if (oldProps.class !== newProps.class) {
                            hostPatchProp(el, "class", null, newProps.class, isSVG);
                        }
                    }
                    if (patchFlag & 4) {
                        hostPatchProp(el, "style", oldProps.style, newProps.style, isSVG);
                    }
                    if (patchFlag & 8) {
                        const propsToUpdate = n2.dynamicProps;
                        for (let i2 = 0; i2 < propsToUpdate.length; i2++) {
                            const key2 = propsToUpdate[i2];
                            const prev = oldProps[key2];
                            const next = newProps[key2];
                            if (next !== prev || key2 === "value") {
                                hostPatchProp(el, key2, prev, next, isSVG, n1.children, parentComponent, parentSuspense, unmountChildren);
                            }
                        }
                    }
                }
                if (patchFlag & 1) {
                    if (n1.children !== n2.children) {
                        hostSetElementText(el, n2.children);
                    }
                }
            } else if (!optimized && dynamicChildren == null) {
                patchProps(el, n2, oldProps, newProps, parentComponent, parentSuspense, isSVG);
            }
            if ((vnodeHook = newProps.onVnodeUpdated) || dirs) {
                queuePostRenderEffect(() => {
                    vnodeHook && invokeVNodeHook(vnodeHook, parentComponent, n2, n1);
                    dirs && invokeDirectiveHook(n2, n1, parentComponent, "updated");
                }, parentSuspense);
            }
        };
        const patchBlockChildren = (oldChildren, newChildren, fallbackContainer, parentComponent, parentSuspense, isSVG, slotScopeIds) => {
            for (let i2 = 0; i2 < newChildren.length; i2++) {
                const oldVNode = oldChildren[i2];
                const newVNode = newChildren[i2];
                const container = (
                    // oldVNode may be an errored async setup() component inside Suspense
                    // which will not have a mounted element
                    oldVNode.el && // - In the case of a Fragment, we need to provide the actual parent
                    // of the Fragment itself so it can move its children.
                    (oldVNode.type === Fragment || // - In the case of different nodes, there is going to be a replacement
                        // which also requires the correct parent container
                        !isSameVNodeType(oldVNode, newVNode) || // - In the case of a component, it could contain anything.
                        oldVNode.shapeFlag & (6 | 64)) ? hostParentNode(oldVNode.el) : (
                        // In other cases, the parent container is not actually used so we
                        // just pass the block element here to avoid a DOM parentNode call.
                        fallbackContainer
                    )
                );
                patch(oldVNode, newVNode, container, null, parentComponent, parentSuspense, isSVG, slotScopeIds, true);
            }
        };
        const patchProps = (el, vnode, oldProps, newProps, parentComponent, parentSuspense, isSVG) => {
            if (oldProps !== newProps) {
                if (oldProps !== EMPTY_OBJ) {
                    for (const key2 in oldProps) {
                        if (!isReservedProp(key2) && !(key2 in newProps)) {
                            hostPatchProp(el, key2, oldProps[key2], null, isSVG, vnode.children, parentComponent, parentSuspense, unmountChildren);
                        }
                    }
                }
                for (const key2 in newProps) {
                    if (isReservedProp(key2))
                        continue;
                    const next = newProps[key2];
                    const prev = oldProps[key2];
                    if (next !== prev && key2 !== "value") {
                        hostPatchProp(el, key2, prev, next, isSVG, vnode.children, parentComponent, parentSuspense, unmountChildren);
                    }
                }
                if ("value" in newProps) {
                    hostPatchProp(el, "value", oldProps.value, newProps.value);
                }
            }
        };
        const processFragment = (n1, n2, container, anchor, parentComponent, parentSuspense, isSVG, slotScopeIds, optimized) => {
            const fragmentStartAnchor = n2.el = n1 ? n1.el : hostCreateText("");
            const fragmentEndAnchor = n2.anchor = n1 ? n1.anchor : hostCreateText("");
            let {patchFlag, dynamicChildren, slotScopeIds: fragmentSlotScopeIds} = n2;
            if (fragmentSlotScopeIds) {
                slotScopeIds = slotScopeIds ? slotScopeIds.concat(fragmentSlotScopeIds) : fragmentSlotScopeIds;
            }
            if (n1 == null) {
                hostInsert(fragmentStartAnchor, container, anchor);
                hostInsert(fragmentEndAnchor, container, anchor);
                mountChildren(n2.children, container, fragmentEndAnchor, parentComponent, parentSuspense, isSVG, slotScopeIds, optimized);
            } else {
                if (patchFlag > 0 && patchFlag & 64 && dynamicChildren && // #2715 the previous fragment could've been a BAILed one as a result
                    // of renderSlot() with no valid children
                    n1.dynamicChildren) {
                    patchBlockChildren(n1.dynamicChildren, dynamicChildren, container, parentComponent, parentSuspense, isSVG, slotScopeIds);
                    if (
                        // #2080 if the stable fragment has a key, it's a <template v-for> that may
                        //  get moved around. Make sure all root level vnodes inherit el.
                        // #2134 or if it's a component root, it may also get moved around
                        // as the component is being moved.
                        n2.key != null || parentComponent && n2 === parentComponent.subTree
                    ) {
                        traverseStaticChildren(
                            n1,
                            n2,
                            true
                            /* shallow */
                        );
                    }
                } else {
                    patchChildren(n1, n2, container, fragmentEndAnchor, parentComponent, parentSuspense, isSVG, slotScopeIds, optimized);
                }
            }
        };
        const processComponent = (n1, n2, container, anchor, parentComponent, parentSuspense, isSVG, slotScopeIds, optimized) => {
            n2.slotScopeIds = slotScopeIds;
            if (n1 == null) {
                if (n2.shapeFlag & 512) {
                    parentComponent.ctx.activate(n2, container, anchor, isSVG, optimized);
                } else {
                    mountComponent(n2, container, anchor, parentComponent, parentSuspense, isSVG, optimized);
                }
            } else {
                updateComponent(n1, n2, optimized);
            }
        };
        const mountComponent = (initialVNode, container, anchor, parentComponent, parentSuspense, isSVG, optimized) => {
            const instance = initialVNode.component = createComponentInstance(initialVNode, parentComponent, parentSuspense);
            if (isKeepAlive(initialVNode)) {
                instance.ctx.renderer = internals;
            }
            {
                setupComponent(instance);
            }
            if (instance.asyncDep) {
                parentSuspense && parentSuspense.registerDep(instance, setupRenderEffect);
                if (!initialVNode.el) {
                    const placeholder = instance.subTree = createVNode(Comment);
                    processCommentNode(null, placeholder, container, anchor);
                }
                return;
            }
            setupRenderEffect(instance, initialVNode, container, anchor, parentSuspense, isSVG, optimized);
        };
        const updateComponent = (n1, n2, optimized) => {
            const instance = n2.component = n1.component;
            if (shouldUpdateComponent(n1, n2, optimized)) {
                if (instance.asyncDep && !instance.asyncResolved) {
                    updateComponentPreRender(instance, n2, optimized);
                    return;
                } else {
                    instance.next = n2;
                    invalidateJob(instance.update);
                    instance.update();
                }
            } else {
                n2.el = n1.el;
                instance.vnode = n2;
            }
        };
        const setupRenderEffect = (instance, initialVNode, container, anchor, parentSuspense, isSVG, optimized) => {
            const componentUpdateFn = () => {
                if (!instance.isMounted) {
                    let vnodeHook;
                    const {el, props} = initialVNode;
                    const {bm, m: m2, parent} = instance;
                    const isAsyncWrapperVNode = isAsyncWrapper(initialVNode);
                    toggleRecurse(instance, false);
                    if (bm) {
                        invokeArrayFns(bm);
                    }
                    if (!isAsyncWrapperVNode && (vnodeHook = props && props.onVnodeBeforeMount)) {
                        invokeVNodeHook(vnodeHook, parent, initialVNode);
                    }
                    toggleRecurse(instance, true);
                    if (el && hydrateNode) {
                        const hydrateSubTree = () => {
                            instance.subTree = renderComponentRoot(instance);
                            hydrateNode(el, instance.subTree, instance, parentSuspense, null);
                        };
                        if (isAsyncWrapperVNode) {
                            initialVNode.type.__asyncLoader().then(
                                // note: we are moving the render call into an async callback,
                                // which means it won't track dependencies - but it's ok because
                                // a server-rendered async wrapper is already in resolved state
                                // and it will never need to change.
                                () => !instance.isUnmounted && hydrateSubTree()
                            );
                        } else {
                            hydrateSubTree();
                        }
                    } else {
                        const subTree = instance.subTree = renderComponentRoot(instance);
                        patch(null, subTree, container, anchor, instance, parentSuspense, isSVG);
                        initialVNode.el = subTree.el;
                    }
                    if (m2) {
                        queuePostRenderEffect(m2, parentSuspense);
                    }
                    if (!isAsyncWrapperVNode && (vnodeHook = props && props.onVnodeMounted)) {
                        const scopedInitialVNode = initialVNode;
                        queuePostRenderEffect(() => invokeVNodeHook(vnodeHook, parent, scopedInitialVNode), parentSuspense);
                    }
                    if (initialVNode.shapeFlag & 256 || parent && isAsyncWrapper(parent.vnode) && parent.vnode.shapeFlag & 256) {
                        instance.a && queuePostRenderEffect(instance.a, parentSuspense);
                    }
                    instance.isMounted = true;
                    initialVNode = container = anchor = null;
                } else {
                    let {next, bu, u: u2, parent, vnode} = instance;
                    let originNext = next;
                    let vnodeHook;
                    toggleRecurse(instance, false);
                    if (next) {
                        next.el = vnode.el;
                        updateComponentPreRender(instance, next, optimized);
                    } else {
                        next = vnode;
                    }
                    if (bu) {
                        invokeArrayFns(bu);
                    }
                    if (vnodeHook = next.props && next.props.onVnodeBeforeUpdate) {
                        invokeVNodeHook(vnodeHook, parent, next, vnode);
                    }
                    toggleRecurse(instance, true);
                    const nextTree = renderComponentRoot(instance);
                    const prevTree = instance.subTree;
                    instance.subTree = nextTree;
                    patch(
                        prevTree,
                        nextTree,
                        // parent may have changed if it's in a teleport
                        hostParentNode(prevTree.el),
                        // anchor may have changed if it's in a fragment
                        getNextHostNode(prevTree),
                        instance,
                        parentSuspense,
                        isSVG
                    );
                    next.el = nextTree.el;
                    if (originNext === null) {
                        updateHOCHostEl(instance, nextTree.el);
                    }
                    if (u2) {
                        queuePostRenderEffect(u2, parentSuspense);
                    }
                    if (vnodeHook = next.props && next.props.onVnodeUpdated) {
                        queuePostRenderEffect(() => invokeVNodeHook(vnodeHook, parent, next, vnode), parentSuspense);
                    }
                }
            };
            const effect = instance.effect = new ReactiveEffect(
                componentUpdateFn,
                () => queueJob(update),
                instance.scope
                // track it in component's effect scope
            );
            const update = instance.update = () => effect.run();
            update.id = instance.uid;
            toggleRecurse(instance, true);
            update();
        };
        const updateComponentPreRender = (instance, nextVNode, optimized) => {
            nextVNode.component = instance;
            const prevProps = instance.vnode.props;
            instance.vnode = nextVNode;
            instance.next = null;
            updateProps(instance, nextVNode.props, prevProps, optimized);
            updateSlots(instance, nextVNode.children, optimized);
            pauseTracking();
            flushPreFlushCbs();
            resetTracking();
        };
        const patchChildren = (n1, n2, container, anchor, parentComponent, parentSuspense, isSVG, slotScopeIds, optimized = false) => {
            const c1 = n1 && n1.children;
            const prevShapeFlag = n1 ? n1.shapeFlag : 0;
            const c2 = n2.children;
            const {patchFlag, shapeFlag} = n2;
            if (patchFlag > 0) {
                if (patchFlag & 128) {
                    patchKeyedChildren(c1, c2, container, anchor, parentComponent, parentSuspense, isSVG, slotScopeIds, optimized);
                    return;
                } else if (patchFlag & 256) {
                    patchUnkeyedChildren(c1, c2, container, anchor, parentComponent, parentSuspense, isSVG, slotScopeIds, optimized);
                    return;
                }
            }
            if (shapeFlag & 8) {
                if (prevShapeFlag & 16) {
                    unmountChildren(c1, parentComponent, parentSuspense);
                }
                if (c2 !== c1) {
                    hostSetElementText(container, c2);
                }
            } else {
                if (prevShapeFlag & 16) {
                    if (shapeFlag & 16) {
                        patchKeyedChildren(c1, c2, container, anchor, parentComponent, parentSuspense, isSVG, slotScopeIds, optimized);
                    } else {
                        unmountChildren(c1, parentComponent, parentSuspense, true);
                    }
                } else {
                    if (prevShapeFlag & 8) {
                        hostSetElementText(container, "");
                    }
                    if (shapeFlag & 16) {
                        mountChildren(c2, container, anchor, parentComponent, parentSuspense, isSVG, slotScopeIds, optimized);
                    }
                }
            }
        };
        const patchUnkeyedChildren = (c1, c2, container, anchor, parentComponent, parentSuspense, isSVG, slotScopeIds, optimized) => {
            c1 = c1 || EMPTY_ARR;
            c2 = c2 || EMPTY_ARR;
            const oldLength = c1.length;
            const newLength = c2.length;
            const commonLength = Math.min(oldLength, newLength);
            let i2;
            for (i2 = 0; i2 < commonLength; i2++) {
                const nextChild = c2[i2] = optimized ? cloneIfMounted(c2[i2]) : normalizeVNode(c2[i2]);
                patch(c1[i2], nextChild, container, null, parentComponent, parentSuspense, isSVG, slotScopeIds, optimized);
            }
            if (oldLength > newLength) {
                unmountChildren(c1, parentComponent, parentSuspense, true, false, commonLength);
            } else {
                mountChildren(c2, container, anchor, parentComponent, parentSuspense, isSVG, slotScopeIds, optimized, commonLength);
            }
        };
        const patchKeyedChildren = (c1, c2, container, parentAnchor, parentComponent, parentSuspense, isSVG, slotScopeIds, optimized) => {
            let i2 = 0;
            const l2 = c2.length;
            let e1 = c1.length - 1;
            let e2 = l2 - 1;
            while (i2 <= e1 && i2 <= e2) {
                const n1 = c1[i2];
                const n2 = c2[i2] = optimized ? cloneIfMounted(c2[i2]) : normalizeVNode(c2[i2]);
                if (isSameVNodeType(n1, n2)) {
                    patch(n1, n2, container, null, parentComponent, parentSuspense, isSVG, slotScopeIds, optimized);
                } else {
                    break;
                }
                i2++;
            }
            while (i2 <= e1 && i2 <= e2) {
                const n1 = c1[e1];
                const n2 = c2[e2] = optimized ? cloneIfMounted(c2[e2]) : normalizeVNode(c2[e2]);
                if (isSameVNodeType(n1, n2)) {
                    patch(n1, n2, container, null, parentComponent, parentSuspense, isSVG, slotScopeIds, optimized);
                } else {
                    break;
                }
                e1--;
                e2--;
            }
            if (i2 > e1) {
                if (i2 <= e2) {
                    const nextPos = e2 + 1;
                    const anchor = nextPos < l2 ? c2[nextPos].el : parentAnchor;
                    while (i2 <= e2) {
                        patch(null, c2[i2] = optimized ? cloneIfMounted(c2[i2]) : normalizeVNode(c2[i2]), container, anchor, parentComponent, parentSuspense, isSVG, slotScopeIds, optimized);
                        i2++;
                    }
                }
            } else if (i2 > e2) {
                while (i2 <= e1) {
                    unmount(c1[i2], parentComponent, parentSuspense, true);
                    i2++;
                }
            } else {
                const s1 = i2;
                const s2 = i2;
                const keyToNewIndexMap = /* @__PURE__ */ new Map();
                for (i2 = s2; i2 <= e2; i2++) {
                    const nextChild = c2[i2] = optimized ? cloneIfMounted(c2[i2]) : normalizeVNode(c2[i2]);
                    if (nextChild.key != null) {
                        keyToNewIndexMap.set(nextChild.key, i2);
                    }
                }
                let j2;
                let patched = 0;
                const toBePatched = e2 - s2 + 1;
                let moved = false;
                let maxNewIndexSoFar = 0;
                const newIndexToOldIndexMap = new Array(toBePatched);
                for (i2 = 0; i2 < toBePatched; i2++)
                    newIndexToOldIndexMap[i2] = 0;
                for (i2 = s1; i2 <= e1; i2++) {
                    const prevChild = c1[i2];
                    if (patched >= toBePatched) {
                        unmount(prevChild, parentComponent, parentSuspense, true);
                        continue;
                    }
                    let newIndex;
                    if (prevChild.key != null) {
                        newIndex = keyToNewIndexMap.get(prevChild.key);
                    } else {
                        for (j2 = s2; j2 <= e2; j2++) {
                            if (newIndexToOldIndexMap[j2 - s2] === 0 && isSameVNodeType(prevChild, c2[j2])) {
                                newIndex = j2;
                                break;
                            }
                        }
                    }
                    if (newIndex === void 0) {
                        unmount(prevChild, parentComponent, parentSuspense, true);
                    } else {
                        newIndexToOldIndexMap[newIndex - s2] = i2 + 1;
                        if (newIndex >= maxNewIndexSoFar) {
                            maxNewIndexSoFar = newIndex;
                        } else {
                            moved = true;
                        }
                        patch(prevChild, c2[newIndex], container, null, parentComponent, parentSuspense, isSVG, slotScopeIds, optimized);
                        patched++;
                    }
                }
                const increasingNewIndexSequence = moved ? getSequence(newIndexToOldIndexMap) : EMPTY_ARR;
                j2 = increasingNewIndexSequence.length - 1;
                for (i2 = toBePatched - 1; i2 >= 0; i2--) {
                    const nextIndex = s2 + i2;
                    const nextChild = c2[nextIndex];
                    const anchor = nextIndex + 1 < l2 ? c2[nextIndex + 1].el : parentAnchor;
                    if (newIndexToOldIndexMap[i2] === 0) {
                        patch(null, nextChild, container, anchor, parentComponent, parentSuspense, isSVG, slotScopeIds, optimized);
                    } else if (moved) {
                        if (j2 < 0 || i2 !== increasingNewIndexSequence[j2]) {
                            move(
                                nextChild,
                                container,
                                anchor,
                                2
                                /* MoveType.REORDER */
                            );
                        } else {
                            j2--;
                        }
                    }
                }
            }
        };
        const move = (vnode, container, anchor, moveType, parentSuspense = null) => {
            const {el, type, transition, children, shapeFlag} = vnode;
            if (shapeFlag & 6) {
                move(vnode.component.subTree, container, anchor, moveType);
                return;
            }
            if (shapeFlag & 128) {
                vnode.suspense.move(container, anchor, moveType);
                return;
            }
            if (shapeFlag & 64) {
                type.move(vnode, container, anchor, internals);
                return;
            }
            if (type === Fragment) {
                hostInsert(el, container, anchor);
                for (let i2 = 0; i2 < children.length; i2++) {
                    move(children[i2], container, anchor, moveType);
                }
                hostInsert(vnode.anchor, container, anchor);
                return;
            }
            if (type === Static) {
                moveStaticNode(vnode, container, anchor);
                return;
            }
            const needTransition = moveType !== 2 && shapeFlag & 1 && transition;
            if (needTransition) {
                if (moveType === 0) {
                    transition.beforeEnter(el);
                    hostInsert(el, container, anchor);
                    queuePostRenderEffect(() => transition.enter(el), parentSuspense);
                } else {
                    const {leave, delayLeave, afterLeave} = transition;
                    const remove3 = () => hostInsert(el, container, anchor);
                    const performLeave = () => {
                        leave(el, () => {
                            remove3();
                            afterLeave && afterLeave();
                        });
                    };
                    if (delayLeave) {
                        delayLeave(el, remove3, performLeave);
                    } else {
                        performLeave();
                    }
                }
            } else {
                hostInsert(el, container, anchor);
            }
        };
        const unmount = (vnode, parentComponent, parentSuspense, doRemove = false, optimized = false) => {
            const {type, props, ref: ref2, children, dynamicChildren, shapeFlag, patchFlag, dirs} = vnode;
            if (ref2 != null) {
                setRef(ref2, null, parentSuspense, vnode, true);
            }
            if (shapeFlag & 256) {
                parentComponent.ctx.deactivate(vnode);
                return;
            }
            const shouldInvokeDirs = shapeFlag & 1 && dirs;
            const shouldInvokeVnodeHook = !isAsyncWrapper(vnode);
            let vnodeHook;
            if (shouldInvokeVnodeHook && (vnodeHook = props && props.onVnodeBeforeUnmount)) {
                invokeVNodeHook(vnodeHook, parentComponent, vnode);
            }
            if (shapeFlag & 6) {
                unmountComponent(vnode.component, parentSuspense, doRemove);
            } else {
                if (shapeFlag & 128) {
                    vnode.suspense.unmount(parentSuspense, doRemove);
                    return;
                }
                if (shouldInvokeDirs) {
                    invokeDirectiveHook(vnode, null, parentComponent, "beforeUnmount");
                }
                if (shapeFlag & 64) {
                    vnode.type.remove(vnode, parentComponent, parentSuspense, optimized, internals, doRemove);
                } else if (dynamicChildren && // #1153: fast path should not be taken for non-stable (v-for) fragments
                    (type !== Fragment || patchFlag > 0 && patchFlag & 64)) {
                    unmountChildren(dynamicChildren, parentComponent, parentSuspense, false, true);
                } else if (type === Fragment && patchFlag & (128 | 256) || !optimized && shapeFlag & 16) {
                    unmountChildren(children, parentComponent, parentSuspense);
                }
                if (doRemove) {
                    remove2(vnode);
                }
            }
            if (shouldInvokeVnodeHook && (vnodeHook = props && props.onVnodeUnmounted) || shouldInvokeDirs) {
                queuePostRenderEffect(() => {
                    vnodeHook && invokeVNodeHook(vnodeHook, parentComponent, vnode);
                    shouldInvokeDirs && invokeDirectiveHook(vnode, null, parentComponent, "unmounted");
                }, parentSuspense);
            }
        };
        const remove2 = (vnode) => {
            const {type, el, anchor, transition} = vnode;
            if (type === Fragment) {
                {
                    removeFragment(el, anchor);
                }
                return;
            }
            if (type === Static) {
                removeStaticNode(vnode);
                return;
            }
            const performRemove = () => {
                hostRemove(el);
                if (transition && !transition.persisted && transition.afterLeave) {
                    transition.afterLeave();
                }
            };
            if (vnode.shapeFlag & 1 && transition && !transition.persisted) {
                const {leave, delayLeave} = transition;
                const performLeave = () => leave(el, performRemove);
                if (delayLeave) {
                    delayLeave(vnode.el, performRemove, performLeave);
                } else {
                    performLeave();
                }
            } else {
                performRemove();
            }
        };
        const removeFragment = (cur, end) => {
            let next;
            while (cur !== end) {
                next = hostNextSibling(cur);
                hostRemove(cur);
                cur = next;
            }
            hostRemove(end);
        };
        const unmountComponent = (instance, parentSuspense, doRemove) => {
            const {bum, scope, update, subTree, um} = instance;
            if (bum) {
                invokeArrayFns(bum);
            }
            scope.stop();
            if (update) {
                update.active = false;
                unmount(subTree, instance, parentSuspense, doRemove);
            }
            if (um) {
                queuePostRenderEffect(um, parentSuspense);
            }
            queuePostRenderEffect(() => {
                instance.isUnmounted = true;
            }, parentSuspense);
            if (parentSuspense && parentSuspense.pendingBranch && !parentSuspense.isUnmounted && instance.asyncDep && !instance.asyncResolved && instance.suspenseId === parentSuspense.pendingId) {
                parentSuspense.deps--;
                if (parentSuspense.deps === 0) {
                    parentSuspense.resolve();
                }
            }
        };
        const unmountChildren = (children, parentComponent, parentSuspense, doRemove = false, optimized = false, start = 0) => {
            for (let i2 = start; i2 < children.length; i2++) {
                unmount(children[i2], parentComponent, parentSuspense, doRemove, optimized);
            }
        };
        const getNextHostNode = (vnode) => {
            if (vnode.shapeFlag & 6) {
                return getNextHostNode(vnode.component.subTree);
            }
            if (vnode.shapeFlag & 128) {
                return vnode.suspense.next();
            }
            return hostNextSibling(vnode.anchor || vnode.el);
        };
        const render2 = (vnode, container, isSVG) => {
            if (vnode == null) {
                if (container._vnode) {
                    unmount(container._vnode, null, null, true);
                }
            } else {
                patch(container._vnode || null, vnode, container, null, null, null, isSVG);
            }
            flushPreFlushCbs();
            flushPostFlushCbs();
            container._vnode = vnode;
        };
        const internals = {
            p: patch,
            um: unmount,
            m: move,
            r: remove2,
            mt: mountComponent,
            mc: mountChildren,
            pc: patchChildren,
            pbc: patchBlockChildren,
            n: getNextHostNode,
            o: options
        };
        let hydrate;
        let hydrateNode;
        if (createHydrationFns) {
            [hydrate, hydrateNode] = createHydrationFns(internals);
        }
        return {
            render: render2,
            hydrate,
            createApp: createAppAPI(render2, hydrate)
        };
    }

    function toggleRecurse({effect, update}, allowed) {
        effect.allowRecurse = update.allowRecurse = allowed;
    }

    function traverseStaticChildren(n1, n2, shallow = false) {
        const ch1 = n1.children;
        const ch2 = n2.children;
        if (isArray$1(ch1) && isArray$1(ch2)) {
            for (let i2 = 0; i2 < ch1.length; i2++) {
                const c1 = ch1[i2];
                let c2 = ch2[i2];
                if (c2.shapeFlag & 1 && !c2.dynamicChildren) {
                    if (c2.patchFlag <= 0 || c2.patchFlag === 32) {
                        c2 = ch2[i2] = cloneIfMounted(ch2[i2]);
                        c2.el = c1.el;
                    }
                    if (!shallow)
                        traverseStaticChildren(c1, c2);
                }
                if (c2.type === Text) {
                    c2.el = c1.el;
                }
            }
        }
    }

    function getSequence(arr) {
        const p2 = arr.slice();
        const result = [0];
        let i2, j2, u2, v2, c2;
        const len = arr.length;
        for (i2 = 0; i2 < len; i2++) {
            const arrI = arr[i2];
            if (arrI !== 0) {
                j2 = result[result.length - 1];
                if (arr[j2] < arrI) {
                    p2[i2] = j2;
                    result.push(i2);
                    continue;
                }
                u2 = 0;
                v2 = result.length - 1;
                while (u2 < v2) {
                    c2 = u2 + v2 >> 1;
                    if (arr[result[c2]] < arrI) {
                        u2 = c2 + 1;
                    } else {
                        v2 = c2;
                    }
                }
                if (arrI < arr[result[u2]]) {
                    if (u2 > 0) {
                        p2[i2] = result[u2 - 1];
                    }
                    result[u2] = i2;
                }
            }
        }
        u2 = result.length;
        v2 = result[u2 - 1];
        while (u2-- > 0) {
            result[u2] = v2;
            v2 = p2[v2];
        }
        return result;
    }

    const isTeleport = (type) => type.__isTeleport;
    const isTeleportDisabled = (props) => props && (props.disabled || props.disabled === "");
    const isTargetSVG = (target) => typeof SVGElement !== "undefined" && target instanceof SVGElement;
    const resolveTarget = (props, select) => {
        const targetSelector = props && props.to;
        if (isString$1(targetSelector)) {
            if (!select) {
                return null;
            } else {
                const target = select(targetSelector);
                return target;
            }
        } else {
            return targetSelector;
        }
    };
    const TeleportImpl = {
        __isTeleport: true,
        process(n1, n2, container, anchor, parentComponent, parentSuspense, isSVG, slotScopeIds, optimized, internals) {
            const {
                mc: mountChildren,
                pc: patchChildren,
                pbc: patchBlockChildren,
                o: {insert, querySelector, createText, createComment}
            } = internals;
            const disabled = isTeleportDisabled(n2.props);
            let {shapeFlag, children, dynamicChildren} = n2;
            if (n1 == null) {
                const placeholder = n2.el = createText("");
                const mainAnchor = n2.anchor = createText("");
                insert(placeholder, container, anchor);
                insert(mainAnchor, container, anchor);
                const target = n2.target = resolveTarget(n2.props, querySelector);
                const targetAnchor = n2.targetAnchor = createText("");
                if (target) {
                    insert(targetAnchor, target);
                    isSVG = isSVG || isTargetSVG(target);
                }
                const mount = (container2, anchor2) => {
                    if (shapeFlag & 16) {
                        mountChildren(children, container2, anchor2, parentComponent, parentSuspense, isSVG, slotScopeIds, optimized);
                    }
                };
                if (disabled) {
                    mount(container, mainAnchor);
                } else if (target) {
                    mount(target, targetAnchor);
                }
            } else {
                n2.el = n1.el;
                const mainAnchor = n2.anchor = n1.anchor;
                const target = n2.target = n1.target;
                const targetAnchor = n2.targetAnchor = n1.targetAnchor;
                const wasDisabled = isTeleportDisabled(n1.props);
                const currentContainer = wasDisabled ? container : target;
                const currentAnchor = wasDisabled ? mainAnchor : targetAnchor;
                isSVG = isSVG || isTargetSVG(target);
                if (dynamicChildren) {
                    patchBlockChildren(n1.dynamicChildren, dynamicChildren, currentContainer, parentComponent, parentSuspense, isSVG, slotScopeIds);
                    traverseStaticChildren(n1, n2, true);
                } else if (!optimized) {
                    patchChildren(n1, n2, currentContainer, currentAnchor, parentComponent, parentSuspense, isSVG, slotScopeIds, false);
                }
                if (disabled) {
                    if (!wasDisabled) {
                        moveTeleport(
                            n2,
                            container,
                            mainAnchor,
                            internals,
                            1
                            /* TeleportMoveTypes.TOGGLE */
                        );
                    }
                } else {
                    if ((n2.props && n2.props.to) !== (n1.props && n1.props.to)) {
                        const nextTarget = n2.target = resolveTarget(n2.props, querySelector);
                        if (nextTarget) {
                            moveTeleport(
                                n2,
                                nextTarget,
                                null,
                                internals,
                                0
                                /* TeleportMoveTypes.TARGET_CHANGE */
                            );
                        }
                    } else if (wasDisabled) {
                        moveTeleport(
                            n2,
                            target,
                            targetAnchor,
                            internals,
                            1
                            /* TeleportMoveTypes.TOGGLE */
                        );
                    }
                }
            }
            updateCssVars(n2);
        },
        remove(vnode, parentComponent, parentSuspense, optimized, {um: unmount, o: {remove: hostRemove}}, doRemove) {
            const {shapeFlag, children, anchor, targetAnchor, target, props} = vnode;
            if (target) {
                hostRemove(targetAnchor);
            }
            if (doRemove || !isTeleportDisabled(props)) {
                hostRemove(anchor);
                if (shapeFlag & 16) {
                    for (let i2 = 0; i2 < children.length; i2++) {
                        const child = children[i2];
                        unmount(child, parentComponent, parentSuspense, true, !!child.dynamicChildren);
                    }
                }
            }
        },
        move: moveTeleport,
        hydrate: hydrateTeleport
    };

    function moveTeleport(vnode, container, parentAnchor, {o: {insert}, m: move}, moveType = 2) {
        if (moveType === 0) {
            insert(vnode.targetAnchor, container, parentAnchor);
        }
        const {el, anchor, shapeFlag, children, props} = vnode;
        const isReorder = moveType === 2;
        if (isReorder) {
            insert(el, container, parentAnchor);
        }
        if (!isReorder || isTeleportDisabled(props)) {
            if (shapeFlag & 16) {
                for (let i2 = 0; i2 < children.length; i2++) {
                    move(
                        children[i2],
                        container,
                        parentAnchor,
                        2
                        /* MoveType.REORDER */
                    );
                }
            }
        }
        if (isReorder) {
            insert(anchor, container, parentAnchor);
        }
    }

    function hydrateTeleport(node, vnode, parentComponent, parentSuspense, slotScopeIds, optimized, {
        o: {
            nextSibling,
            parentNode,
            querySelector
        }
    }, hydrateChildren) {
        const target = vnode.target = resolveTarget(vnode.props, querySelector);
        if (target) {
            const targetNode = target._lpa || target.firstChild;
            if (vnode.shapeFlag & 16) {
                if (isTeleportDisabled(vnode.props)) {
                    vnode.anchor = hydrateChildren(nextSibling(node), vnode, parentNode(node), parentComponent, parentSuspense, slotScopeIds, optimized);
                    vnode.targetAnchor = targetNode;
                } else {
                    vnode.anchor = nextSibling(node);
                    let targetAnchor = targetNode;
                    while (targetAnchor) {
                        targetAnchor = nextSibling(targetAnchor);
                        if (targetAnchor && targetAnchor.nodeType === 8 && targetAnchor.data === "teleport anchor") {
                            vnode.targetAnchor = targetAnchor;
                            target._lpa = vnode.targetAnchor && nextSibling(vnode.targetAnchor);
                            break;
                        }
                    }
                    hydrateChildren(targetNode, vnode, target, parentComponent, parentSuspense, slotScopeIds, optimized);
                }
            }
            updateCssVars(vnode);
        }
        return vnode.anchor && nextSibling(vnode.anchor);
    }

    const Teleport = TeleportImpl;

    function updateCssVars(vnode) {
        const ctx = vnode.ctx;
        if (ctx && ctx.ut) {
            let node = vnode.children[0].el;
            while (node !== vnode.targetAnchor) {
                if (node.nodeType === 1)
                    node.setAttribute("data-v-owner", ctx.uid);
                node = node.nextSibling;
            }
            ctx.ut();
        }
    }

    const Fragment = Symbol(void 0);
    const Text = Symbol(void 0);
    const Comment = Symbol(void 0);
    const Static = Symbol(void 0);
    let currentBlock = null;
    let isBlockTreeEnabled = 1;

    function setBlockTracking(value) {
        isBlockTreeEnabled += value;
    }

    function isVNode(value) {
        return value ? value.__v_isVNode === true : false;
    }

    function isSameVNodeType(n1, n2) {
        return n1.type === n2.type && n1.key === n2.key;
    }

    const InternalObjectKey = `__vInternal`;
    const normalizeKey = ({key: key2}) => key2 != null ? key2 : null;
    const normalizeRef = ({ref: ref2, ref_key, ref_for}) => {
        return ref2 != null ? isString$1(ref2) || isRef(ref2) || isFunction(ref2) ? {
            i: currentRenderingInstance,
            r: ref2,
            k: ref_key,
            f: !!ref_for
        } : ref2 : null;
    };

    function createBaseVNode(type, props = null, children = null, patchFlag = 0, dynamicProps = null, shapeFlag = type === Fragment ? 0 : 1, isBlockNode = false, needFullChildrenNormalization = false) {
        const vnode = {
            __v_isVNode: true,
            __v_skip: true,
            type,
            props,
            key: props && normalizeKey(props),
            ref: props && normalizeRef(props),
            scopeId: currentScopeId,
            slotScopeIds: null,
            children,
            component: null,
            suspense: null,
            ssContent: null,
            ssFallback: null,
            dirs: null,
            transition: null,
            el: null,
            anchor: null,
            target: null,
            targetAnchor: null,
            staticCount: 0,
            shapeFlag,
            patchFlag,
            dynamicProps,
            dynamicChildren: null,
            appContext: null,
            ctx: currentRenderingInstance
        };
        if (needFullChildrenNormalization) {
            normalizeChildren(vnode, children);
            if (shapeFlag & 128) {
                type.normalize(vnode);
            }
        } else if (children) {
            vnode.shapeFlag |= isString$1(children) ? 8 : 16;
        }
        if (isBlockTreeEnabled > 0 && // avoid a block node from tracking itself
            !isBlockNode && // has current parent block
            currentBlock && // presence of a patch flag indicates this node needs patching on updates.
            // component nodes also should always be patched, because even if the
            // component doesn't need to update, it needs to persist the instance on to
            // the next vnode so that it can be properly unmounted later.
            (vnode.patchFlag > 0 || shapeFlag & 6) && // the EVENTS flag is only for hydration and if it is the only flag, the
            // vnode should not be considered dynamic due to handler caching.
            vnode.patchFlag !== 32) {
            currentBlock.push(vnode);
        }
        return vnode;
    }

    const createVNode = _createVNode;

    function _createVNode(type, props = null, children = null, patchFlag = 0, dynamicProps = null, isBlockNode = false) {
        if (!type || type === NULL_DYNAMIC_COMPONENT) {
            type = Comment;
        }
        if (isVNode(type)) {
            const cloned = cloneVNode(
                type,
                props,
                true
                /* mergeRef: true */
            );
            if (children) {
                normalizeChildren(cloned, children);
            }
            if (isBlockTreeEnabled > 0 && !isBlockNode && currentBlock) {
                if (cloned.shapeFlag & 6) {
                    currentBlock[currentBlock.indexOf(type)] = cloned;
                } else {
                    currentBlock.push(cloned);
                }
            }
            cloned.patchFlag |= -2;
            return cloned;
        }
        if (isClassComponent(type)) {
            type = type.__vccOpts;
        }
        if (props) {
            props = guardReactiveProps(props);
            let {class: klass, style} = props;
            if (klass && !isString$1(klass)) {
                props.class = normalizeClass(klass);
            }
            if (isObject$1(style)) {
                if (isProxy(style) && !isArray$1(style)) {
                    style = extend({}, style);
                }
                props.style = normalizeStyle(style);
            }
        }
        const shapeFlag = isString$1(type) ? 1 : isSuspense(type) ? 128 : isTeleport(type) ? 64 : isObject$1(type) ? 4 : isFunction(type) ? 2 : 0;
        return createBaseVNode(type, props, children, patchFlag, dynamicProps, shapeFlag, isBlockNode, true);
    }

    function guardReactiveProps(props) {
        if (!props)
            return null;
        return isProxy(props) || InternalObjectKey in props ? extend({}, props) : props;
    }

    function cloneVNode(vnode, extraProps, mergeRef = false) {
        const {props, ref: ref2, patchFlag, children} = vnode;
        const mergedProps = extraProps ? mergeProps(props || {}, extraProps) : props;
        const cloned = {
            __v_isVNode: true,
            __v_skip: true,
            type: vnode.type,
            props: mergedProps,
            key: mergedProps && normalizeKey(mergedProps),
            ref: extraProps && extraProps.ref ? (
                // #2078 in the case of <component :is="vnode" ref="extra"/>
                // if the vnode itself already has a ref, cloneVNode will need to merge
                // the refs so the single vnode can be set on multiple refs
                mergeRef && ref2 ? isArray$1(ref2) ? ref2.concat(normalizeRef(extraProps)) : [ref2, normalizeRef(extraProps)] : normalizeRef(extraProps)
            ) : ref2,
            scopeId: vnode.scopeId,
            slotScopeIds: vnode.slotScopeIds,
            children,
            target: vnode.target,
            targetAnchor: vnode.targetAnchor,
            staticCount: vnode.staticCount,
            shapeFlag: vnode.shapeFlag,
            // if the vnode is cloned with extra props, we can no longer assume its
            // existing patch flag to be reliable and need to add the FULL_PROPS flag.
            // note: preserve flag for fragments since they use the flag for children
            // fast paths only.
            patchFlag: extraProps && vnode.type !== Fragment ? patchFlag === -1 ? 16 : patchFlag | 16 : patchFlag,
            dynamicProps: vnode.dynamicProps,
            dynamicChildren: vnode.dynamicChildren,
            appContext: vnode.appContext,
            dirs: vnode.dirs,
            transition: vnode.transition,
            // These should technically only be non-null on mounted VNodes. However,
            // they *should* be copied for kept-alive vnodes. So we just always copy
            // them since them being non-null during a mount doesn't affect the logic as
            // they will simply be overwritten.
            component: vnode.component,
            suspense: vnode.suspense,
            ssContent: vnode.ssContent && cloneVNode(vnode.ssContent),
            ssFallback: vnode.ssFallback && cloneVNode(vnode.ssFallback),
            el: vnode.el,
            anchor: vnode.anchor,
            ctx: vnode.ctx,
            ce: vnode.ce
        };
        return cloned;
    }

    function createTextVNode(text = " ", flag = 0) {
        return createVNode(Text, null, text, flag);
    }

    function normalizeVNode(child) {
        if (child == null || typeof child === "boolean") {
            return createVNode(Comment);
        } else if (isArray$1(child)) {
            return createVNode(
                Fragment,
                null,
                // #3666, avoid reference pollution when reusing vnode
                child.slice()
            );
        } else if (typeof child === "object") {
            return cloneIfMounted(child);
        } else {
            return createVNode(Text, null, String(child));
        }
    }

    function cloneIfMounted(child) {
        return child.el === null && child.patchFlag !== -1 || child.memo ? child : cloneVNode(child);
    }

    function normalizeChildren(vnode, children) {
        let type = 0;
        const {shapeFlag} = vnode;
        if (children == null) {
            children = null;
        } else if (isArray$1(children)) {
            type = 16;
        } else if (typeof children === "object") {
            if (shapeFlag & (1 | 64)) {
                const slot = children.default;
                if (slot) {
                    slot._c && (slot._d = false);
                    normalizeChildren(vnode, slot());
                    slot._c && (slot._d = true);
                }
                return;
            } else {
                type = 32;
                const slotFlag = children._;
                if (!slotFlag && !(InternalObjectKey in children)) {
                    children._ctx = currentRenderingInstance;
                } else if (slotFlag === 3 && currentRenderingInstance) {
                    if (currentRenderingInstance.slots._ === 1) {
                        children._ = 1;
                    } else {
                        children._ = 2;
                        vnode.patchFlag |= 1024;
                    }
                }
            }
        } else if (isFunction(children)) {
            children = {default: children, _ctx: currentRenderingInstance};
            type = 32;
        } else {
            children = String(children);
            if (shapeFlag & 64) {
                type = 16;
                children = [createTextVNode(children)];
            } else {
                type = 8;
            }
        }
        vnode.children = children;
        vnode.shapeFlag |= type;
    }

    function mergeProps(...args) {
        const ret = {};
        for (let i2 = 0; i2 < args.length; i2++) {
            const toMerge = args[i2];
            for (const key2 in toMerge) {
                if (key2 === "class") {
                    if (ret.class !== toMerge.class) {
                        ret.class = normalizeClass([ret.class, toMerge.class]);
                    }
                } else if (key2 === "style") {
                    ret.style = normalizeStyle([ret.style, toMerge.style]);
                } else if (isOn(key2)) {
                    const existing = ret[key2];
                    const incoming = toMerge[key2];
                    if (incoming && existing !== incoming && !(isArray$1(existing) && existing.includes(incoming))) {
                        ret[key2] = existing ? [].concat(existing, incoming) : incoming;
                    }
                } else if (key2 !== "") {
                    ret[key2] = toMerge[key2];
                }
            }
        }
        return ret;
    }

    function invokeVNodeHook(hook, instance, vnode, prevVNode = null) {
        callWithAsyncErrorHandling(hook, instance, 7, [
            vnode,
            prevVNode
        ]);
    }

    const emptyAppContext = createAppContext();
    let uid = 0;

    function createComponentInstance(vnode, parent, suspense) {
        const type = vnode.type;
        const appContext = (parent ? parent.appContext : vnode.appContext) || emptyAppContext;
        const instance = {
            uid: uid++,
            vnode,
            type,
            parent,
            appContext,
            root: null,
            next: null,
            subTree: null,
            effect: null,
            update: null,
            scope: new EffectScope(
                true
                /* detached */
            ),
            render: null,
            proxy: null,
            exposed: null,
            exposeProxy: null,
            withProxy: null,
            provides: parent ? parent.provides : Object.create(appContext.provides),
            accessCache: null,
            renderCache: [],
            // local resolved assets
            components: null,
            directives: null,
            // resolved props and emits options
            propsOptions: normalizePropsOptions(type, appContext),
            emitsOptions: normalizeEmitsOptions(type, appContext),
            // emit
            emit: null,
            emitted: null,
            // props default value
            propsDefaults: EMPTY_OBJ,
            // inheritAttrs
            inheritAttrs: type.inheritAttrs,
            // state
            ctx: EMPTY_OBJ,
            data: EMPTY_OBJ,
            props: EMPTY_OBJ,
            attrs: EMPTY_OBJ,
            slots: EMPTY_OBJ,
            refs: EMPTY_OBJ,
            setupState: EMPTY_OBJ,
            setupContext: null,
            // suspense related
            suspense,
            suspenseId: suspense ? suspense.pendingId : 0,
            asyncDep: null,
            asyncResolved: false,
            // lifecycle hooks
            // not using enums here because it results in computed properties
            isMounted: false,
            isUnmounted: false,
            isDeactivated: false,
            bc: null,
            c: null,
            bm: null,
            m: null,
            bu: null,
            u: null,
            um: null,
            bum: null,
            da: null,
            a: null,
            rtg: null,
            rtc: null,
            ec: null,
            sp: null
        };
        {
            instance.ctx = {_: instance};
        }
        instance.root = parent ? parent.root : instance;
        instance.emit = emit.bind(null, instance);
        if (vnode.ce) {
            vnode.ce(instance);
        }
        return instance;
    }

    let currentInstance = null;
    const getCurrentInstance = () => currentInstance || currentRenderingInstance;
    const setCurrentInstance = (instance) => {
        currentInstance = instance;
        instance.scope.on();
    };
    const unsetCurrentInstance = () => {
        currentInstance && currentInstance.scope.off();
        currentInstance = null;
    };

    function isStatefulComponent(instance) {
        return instance.vnode.shapeFlag & 4;
    }

    let isInSSRComponentSetup = false;

    function setupComponent(instance, isSSR = false) {
        isInSSRComponentSetup = isSSR;
        const {props, children} = instance.vnode;
        const isStateful = isStatefulComponent(instance);
        initProps(instance, props, isStateful, isSSR);
        initSlots(instance, children);
        const setupResult = isStateful ? setupStatefulComponent(instance, isSSR) : void 0;
        isInSSRComponentSetup = false;
        return setupResult;
    }

    function setupStatefulComponent(instance, isSSR) {
        const Component = instance.type;
        instance.accessCache = /* @__PURE__ */ Object.create(null);
        instance.proxy = markRaw(new Proxy(instance.ctx, PublicInstanceProxyHandlers));
        const {setup: setup19} = Component;
        if (setup19) {
            const setupContext = instance.setupContext = setup19.length > 1 ? createSetupContext(instance) : null;
            setCurrentInstance(instance);
            pauseTracking();
            const setupResult = callWithErrorHandling(setup19, instance, 0, [instance.props, setupContext]);
            resetTracking();
            unsetCurrentInstance();
            if (isPromise(setupResult)) {
                setupResult.then(unsetCurrentInstance, unsetCurrentInstance);
                if (isSSR) {
                    return setupResult.then((resolvedResult) => {
                        handleSetupResult(instance, resolvedResult, isSSR);
                    }).catch((e2) => {
                        handleError(
                            e2,
                            instance,
                            0
                            /* ErrorCodes.SETUP_FUNCTION */
                        );
                    });
                } else {
                    instance.asyncDep = setupResult;
                }
            } else {
                handleSetupResult(instance, setupResult, isSSR);
            }
        } else {
            finishComponentSetup(instance, isSSR);
        }
    }

    function handleSetupResult(instance, setupResult, isSSR) {
        if (isFunction(setupResult)) {
            if (instance.type.__ssrInlineRender) {
                instance.ssrRender = setupResult;
            } else {
                instance.render = setupResult;
            }
        } else if (isObject$1(setupResult)) {
            instance.setupState = proxyRefs(setupResult);
        } else
            ;
        finishComponentSetup(instance, isSSR);
    }

    let compile;

    function finishComponentSetup(instance, isSSR, skipOptions) {
        const Component = instance.type;
        if (!instance.render) {
            if (!isSSR && compile && !Component.render) {
                const template = Component.template || resolveMergedOptions(instance).template;
                if (template) {
                    const {isCustomElement, compilerOptions} = instance.appContext.config;
                    const {delimiters, compilerOptions: componentCompilerOptions} = Component;
                    const finalCompilerOptions = extend(extend({
                        isCustomElement,
                        delimiters
                    }, compilerOptions), componentCompilerOptions);
                    Component.render = compile(template, finalCompilerOptions);
                }
            }
            instance.render = Component.render || NOOP;
        }
        {
            setCurrentInstance(instance);
            pauseTracking();
            applyOptions(instance);
            resetTracking();
            unsetCurrentInstance();
        }
    }

    function createAttrsProxy(instance) {
        return new Proxy(instance.attrs, {
            get(target, key2) {
                track(instance, "get", "$attrs");
                return target[key2];
            }
        });
    }

    function createSetupContext(instance) {
        const expose = (exposed) => {
            instance.exposed = exposed || {};
        };
        let attrs;
        {
            return {
                get attrs() {
                    return attrs || (attrs = createAttrsProxy(instance));
                },
                slots: instance.slots,
                emit: instance.emit,
                expose
            };
        }
    }

    function getExposeProxy(instance) {
        if (instance.exposed) {
            return instance.exposeProxy || (instance.exposeProxy = new Proxy(proxyRefs(markRaw(instance.exposed)), {
                get(target, key2) {
                    if (key2 in target) {
                        return target[key2];
                    } else if (key2 in publicPropertiesMap) {
                        return publicPropertiesMap[key2](instance);
                    }
                },
                has(target, key2) {
                    return key2 in target || key2 in publicPropertiesMap;
                }
            }));
        }
    }

    function isClassComponent(value) {
        return isFunction(value) && "__vccOpts" in value;
    }

    const computed = (getterOrOptions, debugOptions) => {
        return computed$1(getterOrOptions, debugOptions, isInSSRComponentSetup);
    };

    function h$1(type, propsOrChildren, children) {
        const l2 = arguments.length;
        if (l2 === 2) {
            if (isObject$1(propsOrChildren) && !isArray$1(propsOrChildren)) {
                if (isVNode(propsOrChildren)) {
                    return createVNode(type, null, [propsOrChildren]);
                }
                return createVNode(type, propsOrChildren);
            } else {
                return createVNode(type, null, propsOrChildren);
            }
        } else {
            if (l2 > 3) {
                children = Array.prototype.slice.call(arguments, 2);
            } else if (l2 === 3 && isVNode(children)) {
                children = [children];
            }
            return createVNode(type, propsOrChildren, children);
        }
    }

    const ssrContextKey = Symbol(``);
    const useSSRContext = () => {
        {
            const ctx = inject(ssrContextKey);
            return ctx;
        }
    };
    const version = "3.2.46";
    const svgNS = "http://www.w3.org/2000/svg";
    const doc = typeof document !== "undefined" ? document : null;
    const templateContainer = doc && /* @__PURE__ */ doc.createElement("template");
    const nodeOps = {
        insert: (child, parent, anchor) => {
            parent.insertBefore(child, anchor || null);
        },
        remove: (child) => {
            const parent = child.parentNode;
            if (parent) {
                parent.removeChild(child);
            }
        },
        createElement: (tag, isSVG, is, props) => {
            const el = isSVG ? doc.createElementNS(svgNS, tag) : doc.createElement(tag, is ? {is} : void 0);
            if (tag === "select" && props && props.multiple != null) {
                el.setAttribute("multiple", props.multiple);
            }
            return el;
        },
        createText: (text) => doc.createTextNode(text),
        createComment: (text) => doc.createComment(text),
        setText: (node, text) => {
            node.nodeValue = text;
        },
        setElementText: (el, text) => {
            el.textContent = text;
        },
        parentNode: (node) => node.parentNode,
        nextSibling: (node) => node.nextSibling,
        querySelector: (selector) => doc.querySelector(selector),
        setScopeId(el, id) {
            el.setAttribute(id, "");
        },
        // __UNSAFE__
        // Reason: innerHTML.
        // Static content here can only come from compiled templates.
        // As long as the user only uses trusted templates, this is safe.
        insertStaticContent(content, parent, anchor, isSVG, start, end) {
            const before = anchor ? anchor.previousSibling : parent.lastChild;
            if (start && (start === end || start.nextSibling)) {
                while (true) {
                    parent.insertBefore(start.cloneNode(true), anchor);
                    if (start === end || !(start = start.nextSibling))
                        break;
                }
            } else {
                templateContainer.innerHTML = isSVG ? `<svg>${content}</svg>` : content;
                const template = templateContainer.content;
                if (isSVG) {
                    const wrapper = template.firstChild;
                    while (wrapper.firstChild) {
                        template.appendChild(wrapper.firstChild);
                    }
                    template.removeChild(wrapper);
                }
                parent.insertBefore(template, anchor);
            }
            return [
                // first
                before ? before.nextSibling : parent.firstChild,
                // last
                anchor ? anchor.previousSibling : parent.lastChild
            ];
        }
    };

    function patchClass(el, value, isSVG) {
        const transitionClasses = el._vtc;
        if (transitionClasses) {
            value = (value ? [value, ...transitionClasses] : [...transitionClasses]).join(" ");
        }
        if (value == null) {
            el.removeAttribute("class");
        } else if (isSVG) {
            el.setAttribute("class", value);
        } else {
            el.className = value;
        }
    }

    function patchStyle(el, prev, next) {
        const style = el.style;
        const isCssString = isString$1(next);
        if (next && !isCssString) {
            if (prev && !isString$1(prev)) {
                for (const key2 in prev) {
                    if (next[key2] == null) {
                        setStyle$1(style, key2, "");
                    }
                }
            }
            for (const key2 in next) {
                setStyle$1(style, key2, next[key2]);
            }
        } else {
            const currentDisplay = style.display;
            if (isCssString) {
                if (prev !== next) {
                    style.cssText = next;
                }
            } else if (prev) {
                el.removeAttribute("style");
            }
            if ("_vod" in el) {
                style.display = currentDisplay;
            }
        }
    }

    const importantRE = /\s*!important$/;

    function setStyle$1(style, name, val) {
        if (isArray$1(val)) {
            val.forEach((v2) => setStyle$1(style, name, v2));
        } else {
            if (val == null)
                val = "";
            if (name.startsWith("--")) {
                style.setProperty(name, val);
            } else {
                const prefixed = autoPrefix(style, name);
                if (importantRE.test(val)) {
                    style.setProperty(hyphenate(prefixed), val.replace(importantRE, ""), "important");
                } else {
                    style[prefixed] = val;
                }
            }
        }
    }

    const prefixes = ["Webkit", "Moz", "ms"];
    const prefixCache = {};

    function autoPrefix(style, rawName) {
        const cached2 = prefixCache[rawName];
        if (cached2) {
            return cached2;
        }
        let name = camelize(rawName);
        if (name !== "filter" && name in style) {
            return prefixCache[rawName] = name;
        }
        name = capitalize(name);
        for (let i2 = 0; i2 < prefixes.length; i2++) {
            const prefixed = prefixes[i2] + name;
            if (prefixed in style) {
                return prefixCache[rawName] = prefixed;
            }
        }
        return rawName;
    }

    const xlinkNS = "http://www.w3.org/1999/xlink";

    function patchAttr(el, key2, value, isSVG, instance) {
        if (isSVG && key2.startsWith("xlink:")) {
            if (value == null) {
                el.removeAttributeNS(xlinkNS, key2.slice(6, key2.length));
            } else {
                el.setAttributeNS(xlinkNS, key2, value);
            }
        } else {
            const isBoolean = isSpecialBooleanAttr(key2);
            if (value == null || isBoolean && !includeBooleanAttr(value)) {
                el.removeAttribute(key2);
            } else {
                el.setAttribute(key2, isBoolean ? "" : value);
            }
        }
    }

    function patchDOMProp(el, key2, value, prevChildren, parentComponent, parentSuspense, unmountChildren) {
        if (key2 === "innerHTML" || key2 === "textContent") {
            if (prevChildren) {
                unmountChildren(prevChildren, parentComponent, parentSuspense);
            }
            el[key2] = value == null ? "" : value;
            return;
        }
        if (key2 === "value" && el.tagName !== "PROGRESS" && // custom elements may use _value internally
            !el.tagName.includes("-")) {
            el._value = value;
            const newValue = value == null ? "" : value;
            if (el.value !== newValue || // #4956: always set for OPTION elements because its value falls back to
                // textContent if no value attribute is present. And setting .value for
                // OPTION has no side effect
                el.tagName === "OPTION") {
                el.value = newValue;
            }
            if (value == null) {
                el.removeAttribute(key2);
            }
            return;
        }
        let needRemove = false;
        if (value === "" || value == null) {
            const type = typeof el[key2];
            if (type === "boolean") {
                value = includeBooleanAttr(value);
            } else if (value == null && type === "string") {
                value = "";
                needRemove = true;
            } else if (type === "number") {
                value = 0;
                needRemove = true;
            }
        }
        try {
            el[key2] = value;
        } catch (e2) {
        }
        needRemove && el.removeAttribute(key2);
    }

    function addEventListener$1(el, event, handler, options) {
        el.addEventListener(event, handler, options);
    }

    function removeEventListener$1(el, event, handler, options) {
        el.removeEventListener(event, handler, options);
    }

    function patchEvent(el, rawName, prevValue, nextValue, instance = null) {
        const invokers = el._vei || (el._vei = {});
        const existingInvoker = invokers[rawName];
        if (nextValue && existingInvoker) {
            existingInvoker.value = nextValue;
        } else {
            const [name, options] = parseName(rawName);
            if (nextValue) {
                const invoker = invokers[rawName] = createInvoker(nextValue, instance);
                addEventListener$1(el, name, invoker, options);
            } else if (existingInvoker) {
                removeEventListener$1(el, name, existingInvoker, options);
                invokers[rawName] = void 0;
            }
        }
    }

    const optionsModifierRE = /(?:Once|Passive|Capture)$/;

    function parseName(name) {
        let options;
        if (optionsModifierRE.test(name)) {
            options = {};
            let m2;
            while (m2 = name.match(optionsModifierRE)) {
                name = name.slice(0, name.length - m2[0].length);
                options[m2[0].toLowerCase()] = true;
            }
        }
        const event = name[2] === ":" ? name.slice(3) : hyphenate(name.slice(2));
        return [event, options];
    }

    let cachedNow = 0;
    const p = /* @__PURE__ */ Promise.resolve();
    const getNow = () => cachedNow || (p.then(() => cachedNow = 0), cachedNow = Date.now());

    function createInvoker(initialValue, instance) {
        const invoker = (e2) => {
            if (!e2._vts) {
                e2._vts = Date.now();
            } else if (e2._vts <= invoker.attached) {
                return;
            }
            callWithAsyncErrorHandling(patchStopImmediatePropagation(e2, invoker.value), instance, 5, [e2]);
        };
        invoker.value = initialValue;
        invoker.attached = getNow();
        return invoker;
    }

    function patchStopImmediatePropagation(e2, value) {
        if (isArray$1(value)) {
            const originalStop = e2.stopImmediatePropagation;
            e2.stopImmediatePropagation = () => {
                originalStop.call(e2);
                e2._stopped = true;
            };
            return value.map((fn) => (e3) => !e3._stopped && fn && fn(e3));
        } else {
            return value;
        }
    }

    const nativeOnRE = /^on[a-z]/;
    const patchProp = (el, key2, prevValue, nextValue, isSVG = false, prevChildren, parentComponent, parentSuspense, unmountChildren) => {
        if (key2 === "class") {
            patchClass(el, nextValue, isSVG);
        } else if (key2 === "style") {
            patchStyle(el, prevValue, nextValue);
        } else if (isOn(key2)) {
            if (!isModelListener(key2)) {
                patchEvent(el, key2, prevValue, nextValue, parentComponent);
            }
        } else if (key2[0] === "." ? (key2 = key2.slice(1), true) : key2[0] === "^" ? (key2 = key2.slice(1), false) : shouldSetAsProp(el, key2, nextValue, isSVG)) {
            patchDOMProp(el, key2, nextValue, prevChildren, parentComponent, parentSuspense, unmountChildren);
        } else {
            if (key2 === "true-value") {
                el._trueValue = nextValue;
            } else if (key2 === "false-value") {
                el._falseValue = nextValue;
            }
            patchAttr(el, key2, nextValue, isSVG);
        }
    };

    function shouldSetAsProp(el, key2, value, isSVG) {
        if (isSVG) {
            if (key2 === "innerHTML" || key2 === "textContent") {
                return true;
            }
            if (key2 in el && nativeOnRE.test(key2) && isFunction(value)) {
                return true;
            }
            return false;
        }
        if (key2 === "spellcheck" || key2 === "draggable" || key2 === "translate") {
            return false;
        }
        if (key2 === "form") {
            return false;
        }
        if (key2 === "list" && el.tagName === "INPUT") {
            return false;
        }
        if (key2 === "type" && el.tagName === "TEXTAREA") {
            return false;
        }
        if (nativeOnRE.test(key2) && isString$1(value)) {
            return false;
        }
        return key2 in el;
    }

    const TRANSITION = "transition";
    const ANIMATION = "animation";
    const Transition$1 = (props, {slots}) => h$1(BaseTransition, resolveTransitionProps(props), slots);
    Transition$1.displayName = "Transition";
    const DOMTransitionPropsValidators = {
        name: String,
        type: String,
        css: {
            type: Boolean,
            default: true
        },
        duration: [String, Number, Object],
        enterFromClass: String,
        enterActiveClass: String,
        enterToClass: String,
        appearFromClass: String,
        appearActiveClass: String,
        appearToClass: String,
        leaveFromClass: String,
        leaveActiveClass: String,
        leaveToClass: String
    };
    const TransitionPropsValidators = Transition$1.props = /* @__PURE__ */ extend({}, BaseTransition.props, DOMTransitionPropsValidators);
    const callHook = (hook, args = []) => {
        if (isArray$1(hook)) {
            hook.forEach((h2) => h2(...args));
        } else if (hook) {
            hook(...args);
        }
    };
    const hasExplicitCallback = (hook) => {
        return hook ? isArray$1(hook) ? hook.some((h2) => h2.length > 1) : hook.length > 1 : false;
    };

    function resolveTransitionProps(rawProps) {
        const baseProps = {};
        for (const key2 in rawProps) {
            if (!(key2 in DOMTransitionPropsValidators)) {
                baseProps[key2] = rawProps[key2];
            }
        }
        if (rawProps.css === false) {
            return baseProps;
        }
        const {
            name = "v",
            type,
            duration,
            enterFromClass = `${name}-enter-from`,
            enterActiveClass = `${name}-enter-active`,
            enterToClass = `${name}-enter-to`,
            appearFromClass = enterFromClass,
            appearActiveClass = enterActiveClass,
            appearToClass = enterToClass,
            leaveFromClass = `${name}-leave-from`,
            leaveActiveClass = `${name}-leave-active`,
            leaveToClass = `${name}-leave-to`
        } = rawProps;
        const durations = normalizeDuration(duration);
        const enterDuration = durations && durations[0];
        const leaveDuration = durations && durations[1];
        const {
            onBeforeEnter,
            onEnter,
            onEnterCancelled,
            onLeave,
            onLeaveCancelled,
            onBeforeAppear = onBeforeEnter,
            onAppear = onEnter,
            onAppearCancelled = onEnterCancelled
        } = baseProps;
        const finishEnter = (el, isAppear, done) => {
            removeTransitionClass(el, isAppear ? appearToClass : enterToClass);
            removeTransitionClass(el, isAppear ? appearActiveClass : enterActiveClass);
            done && done();
        };
        const finishLeave = (el, done) => {
            el._isLeaving = false;
            removeTransitionClass(el, leaveFromClass);
            removeTransitionClass(el, leaveToClass);
            removeTransitionClass(el, leaveActiveClass);
            done && done();
        };
        const makeEnterHook = (isAppear) => {
            return (el, done) => {
                const hook = isAppear ? onAppear : onEnter;
                const resolve = () => finishEnter(el, isAppear, done);
                callHook(hook, [el, resolve]);
                nextFrame(() => {
                    removeTransitionClass(el, isAppear ? appearFromClass : enterFromClass);
                    addTransitionClass(el, isAppear ? appearToClass : enterToClass);
                    if (!hasExplicitCallback(hook)) {
                        whenTransitionEnds(el, type, enterDuration, resolve);
                    }
                });
            };
        };
        return extend(baseProps, {
            onBeforeEnter(el) {
                callHook(onBeforeEnter, [el]);
                addTransitionClass(el, enterFromClass);
                addTransitionClass(el, enterActiveClass);
            },
            onBeforeAppear(el) {
                callHook(onBeforeAppear, [el]);
                addTransitionClass(el, appearFromClass);
                addTransitionClass(el, appearActiveClass);
            },
            onEnter: makeEnterHook(false),
            onAppear: makeEnterHook(true),
            onLeave(el, done) {
                el._isLeaving = true;
                const resolve = () => finishLeave(el, done);
                addTransitionClass(el, leaveFromClass);
                forceReflow();
                addTransitionClass(el, leaveActiveClass);
                nextFrame(() => {
                    if (!el._isLeaving) {
                        return;
                    }
                    removeTransitionClass(el, leaveFromClass);
                    addTransitionClass(el, leaveToClass);
                    if (!hasExplicitCallback(onLeave)) {
                        whenTransitionEnds(el, type, leaveDuration, resolve);
                    }
                });
                callHook(onLeave, [el, resolve]);
            },
            onEnterCancelled(el) {
                finishEnter(el, false);
                callHook(onEnterCancelled, [el]);
            },
            onAppearCancelled(el) {
                finishEnter(el, true);
                callHook(onAppearCancelled, [el]);
            },
            onLeaveCancelled(el) {
                finishLeave(el);
                callHook(onLeaveCancelled, [el]);
            }
        });
    }

    function normalizeDuration(duration) {
        if (duration == null) {
            return null;
        } else if (isObject$1(duration)) {
            return [NumberOf(duration.enter), NumberOf(duration.leave)];
        } else {
            const n2 = NumberOf(duration);
            return [n2, n2];
        }
    }

    function NumberOf(val) {
        const res = toNumber(val);
        return res;
    }

    function addTransitionClass(el, cls) {
        cls.split(/\s+/).forEach((c2) => c2 && el.classList.add(c2));
        (el._vtc || (el._vtc = /* @__PURE__ */ new Set())).add(cls);
    }

    function removeTransitionClass(el, cls) {
        cls.split(/\s+/).forEach((c2) => c2 && el.classList.remove(c2));
        const {_vtc} = el;
        if (_vtc) {
            _vtc.delete(cls);
            if (!_vtc.size) {
                el._vtc = void 0;
            }
        }
    }

    function nextFrame(cb) {
        requestAnimationFrame(() => {
            requestAnimationFrame(cb);
        });
    }

    let endId = 0;

    function whenTransitionEnds(el, expectedType, explicitTimeout, resolve) {
        const id = el._endId = ++endId;
        const resolveIfNotStale = () => {
            if (id === el._endId) {
                resolve();
            }
        };
        if (explicitTimeout) {
            return setTimeout(resolveIfNotStale, explicitTimeout);
        }
        const {type, timeout, propCount} = getTransitionInfo(el, expectedType);
        if (!type) {
            return resolve();
        }
        const endEvent = type + "end";
        let ended = 0;
        const end = () => {
            el.removeEventListener(endEvent, onEnd);
            resolveIfNotStale();
        };
        const onEnd = (e2) => {
            if (e2.target === el && ++ended >= propCount) {
                end();
            }
        };
        setTimeout(() => {
            if (ended < propCount) {
                end();
            }
        }, timeout + 1);
        el.addEventListener(endEvent, onEnd);
    }

    function getTransitionInfo(el, expectedType) {
        const styles = window.getComputedStyle(el);
        const getStyleProperties = (key2) => (styles[key2] || "").split(", ");
        const transitionDelays = getStyleProperties(`${TRANSITION}Delay`);
        const transitionDurations = getStyleProperties(`${TRANSITION}Duration`);
        const transitionTimeout = getTimeout(transitionDelays, transitionDurations);
        const animationDelays = getStyleProperties(`${ANIMATION}Delay`);
        const animationDurations = getStyleProperties(`${ANIMATION}Duration`);
        const animationTimeout = getTimeout(animationDelays, animationDurations);
        let type = null;
        let timeout = 0;
        let propCount = 0;
        if (expectedType === TRANSITION) {
            if (transitionTimeout > 0) {
                type = TRANSITION;
                timeout = transitionTimeout;
                propCount = transitionDurations.length;
            }
        } else if (expectedType === ANIMATION) {
            if (animationTimeout > 0) {
                type = ANIMATION;
                timeout = animationTimeout;
                propCount = animationDurations.length;
            }
        } else {
            timeout = Math.max(transitionTimeout, animationTimeout);
            type = timeout > 0 ? transitionTimeout > animationTimeout ? TRANSITION : ANIMATION : null;
            propCount = type ? type === TRANSITION ? transitionDurations.length : animationDurations.length : 0;
        }
        const hasTransform = type === TRANSITION && /\b(transform|all)(,|$)/.test(getStyleProperties(`${TRANSITION}Property`).toString());
        return {
            type,
            timeout,
            propCount,
            hasTransform
        };
    }

    function getTimeout(delays, durations) {
        while (delays.length < durations.length) {
            delays = delays.concat(delays);
        }
        return Math.max(...durations.map((d2, i2) => toMs(d2) + toMs(delays[i2])));
    }

    function toMs(s2) {
        return Number(s2.slice(0, -1).replace(",", ".")) * 1e3;
    }

    function forceReflow() {
        return document.body.offsetHeight;
    }

    const positionMap = /* @__PURE__ */ new WeakMap();
    const newPositionMap = /* @__PURE__ */ new WeakMap();
    const TransitionGroupImpl = {
        name: "TransitionGroup",
        props: /* @__PURE__ */ extend({}, TransitionPropsValidators, {
            tag: String,
            moveClass: String
        }),
        setup(props, {slots}) {
            const instance = getCurrentInstance();
            const state = useTransitionState();
            let prevChildren;
            let children;
            onUpdated(() => {
                if (!prevChildren.length) {
                    return;
                }
                const moveClass = props.moveClass || `${props.name || "v"}-move`;
                if (!hasCSSTransform(prevChildren[0].el, instance.vnode.el, moveClass)) {
                    return;
                }
                prevChildren.forEach(callPendingCbs);
                prevChildren.forEach(recordPosition);
                const movedChildren = prevChildren.filter(applyTranslation);
                forceReflow();
                movedChildren.forEach((c2) => {
                    const el = c2.el;
                    const style = el.style;
                    addTransitionClass(el, moveClass);
                    style.transform = style.webkitTransform = style.transitionDuration = "";
                    const cb = el._moveCb = (e2) => {
                        if (e2 && e2.target !== el) {
                            return;
                        }
                        if (!e2 || /transform$/.test(e2.propertyName)) {
                            el.removeEventListener("transitionend", cb);
                            el._moveCb = null;
                            removeTransitionClass(el, moveClass);
                        }
                    };
                    el.addEventListener("transitionend", cb);
                });
            });
            return () => {
                const rawProps = toRaw(props);
                const cssTransitionProps = resolveTransitionProps(rawProps);
                let tag = rawProps.tag || Fragment;
                prevChildren = children;
                children = slots.default ? getTransitionRawChildren(slots.default()) : [];
                for (let i2 = 0; i2 < children.length; i2++) {
                    const child = children[i2];
                    if (child.key != null) {
                        setTransitionHooks(child, resolveTransitionHooks(child, cssTransitionProps, state, instance));
                    }
                }
                if (prevChildren) {
                    for (let i2 = 0; i2 < prevChildren.length; i2++) {
                        const child = prevChildren[i2];
                        setTransitionHooks(child, resolveTransitionHooks(child, cssTransitionProps, state, instance));
                        positionMap.set(child, child.el.getBoundingClientRect());
                    }
                }
                return createVNode(tag, null, children);
            };
        }
    };
    const removeMode = (props) => delete props.mode;
    /* @__PURE__ */
    removeMode(TransitionGroupImpl.props);
    const TransitionGroup = TransitionGroupImpl;

    function callPendingCbs(c2) {
        const el = c2.el;
        if (el._moveCb) {
            el._moveCb();
        }
        if (el._enterCb) {
            el._enterCb();
        }
    }

    function recordPosition(c2) {
        newPositionMap.set(c2, c2.el.getBoundingClientRect());
    }

    function applyTranslation(c2) {
        const oldPos = positionMap.get(c2);
        const newPos = newPositionMap.get(c2);
        const dx = oldPos.left - newPos.left;
        const dy = oldPos.top - newPos.top;
        if (dx || dy) {
            const s2 = c2.el.style;
            s2.transform = s2.webkitTransform = `translate(${dx}px,${dy}px)`;
            s2.transitionDuration = "0s";
            return c2;
        }
    }

    function hasCSSTransform(el, root, moveClass) {
        const clone = el.cloneNode();
        if (el._vtc) {
            el._vtc.forEach((cls) => {
                cls.split(/\s+/).forEach((c2) => c2 && clone.classList.remove(c2));
            });
        }
        moveClass.split(/\s+/).forEach((c2) => c2 && clone.classList.add(c2));
        clone.style.display = "none";
        const container = root.nodeType === 1 ? root : root.parentNode;
        container.appendChild(clone);
        const {hasTransform} = getTransitionInfo(clone);
        container.removeChild(clone);
        return hasTransform;
    }

    const vShow = {
        beforeMount(el, {value}, {transition}) {
            el._vod = el.style.display === "none" ? "" : el.style.display;
            if (transition && value) {
                transition.beforeEnter(el);
            } else {
                setDisplay(el, value);
            }
        },
        mounted(el, {value}, {transition}) {
            if (transition && value) {
                transition.enter(el);
            }
        },
        updated(el, {value, oldValue}, {transition}) {
            if (!value === !oldValue)
                return;
            if (transition) {
                if (value) {
                    transition.beforeEnter(el);
                    setDisplay(el, true);
                    transition.enter(el);
                } else {
                    transition.leave(el, () => {
                        setDisplay(el, false);
                    });
                }
            } else {
                setDisplay(el, value);
            }
        },
        beforeUnmount(el, {value}) {
            setDisplay(el, value);
        }
    };

    function setDisplay(el, value) {
        el.style.display = value ? el._vod : "none";
    }

    const rendererOptions = /* @__PURE__ */ extend({patchProp}, nodeOps);
    let renderer;

    function ensureRenderer() {
        return renderer || (renderer = createRenderer(rendererOptions));
    }

    const render = (...args) => {
        ensureRenderer().render(...args);
    };
    var isArray = Array.isArray;
    var isString = function isString2(val) {
        return typeof val === "string";
    };
    var isObject = function isObject2(val) {
        return val !== null && _typeof$1(val) === "object";
    };

    function renderHelper(v2) {
        var props = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
        var defaultV = arguments.length > 2 ? arguments[2] : void 0;
        if (typeof v2 === "function") {
            return v2(props);
        }
        return v2 !== null && v2 !== void 0 ? v2 : defaultV;
    }

    function classNames() {
        var classes = [];
        for (var i2 = 0; i2 < arguments.length; i2++) {
            var value = i2 < 0 || arguments.length <= i2 ? void 0 : arguments[i2];
            if (!value)
                continue;
            if (isString(value)) {
                classes.push(value);
            } else if (isArray(value)) {
                for (var _i = 0; _i < value.length; _i++) {
                    var inner = classNames(value[_i]);
                    if (inner) {
                        classes.push(inner);
                    }
                }
            } else if (isObject(value)) {
                for (var name in value) {
                    if (value[name]) {
                        classes.push(name);
                    }
                }
            }
        }
        return classes.join(" ");
    }

    function _arrayWithHoles$2(arr) {
        if (Array.isArray(arr))
            return arr;
    }

    function _iterableToArrayLimit$2(arr, i2) {
        var _i = null == arr ? null : "undefined" != typeof Symbol && arr[Symbol.iterator] || arr["@@iterator"];
        if (null != _i) {
            var _s, _e, _x, _r, _arr = [], _n = true, _d = false;
            try {
                if (_x = (_i = _i.call(arr)).next, 0 === i2) {
                    if (Object(_i) !== _i)
                        return;
                    _n = false;
                } else
                    for (; !(_n = (_s = _x.call(_i)).done) && (_arr.push(_s.value), _arr.length !== i2); _n = true)
                        ;
            } catch (err) {
                _d = true, _e = err;
            } finally {
                try {
                    if (!_n && null != _i["return"] && (_r = _i["return"](), Object(_r) !== _r))
                        return;
                } finally {
                    if (_d)
                        throw _e;
                }
            }
            return _arr;
        }
    }

    function _arrayLikeToArray$2(arr, len) {
        if (len == null || len > arr.length)
            len = arr.length;
        for (var i2 = 0, arr2 = new Array(len); i2 < len; i2++)
            arr2[i2] = arr[i2];
        return arr2;
    }

    function _unsupportedIterableToArray$2(o2, minLen) {
        if (!o2)
            return;
        if (typeof o2 === "string")
            return _arrayLikeToArray$2(o2, minLen);
        var n2 = Object.prototype.toString.call(o2).slice(8, -1);
        if (n2 === "Object" && o2.constructor)
            n2 = o2.constructor.name;
        if (n2 === "Map" || n2 === "Set")
            return Array.from(o2);
        if (n2 === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n2))
            return _arrayLikeToArray$2(o2, minLen);
    }

    function _nonIterableRest$2() {
        throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
    }

    function _slicedToArray$2(arr, i2) {
        return _arrayWithHoles$2(arr) || _iterableToArrayLimit$2(arr, i2) || _unsupportedIterableToArray$2(arr, i2) || _nonIterableRest$2();
    }

    function _arrayWithoutHoles(arr) {
        if (Array.isArray(arr))
            return _arrayLikeToArray$2(arr);
    }

    function _iterableToArray(iter) {
        if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null)
            return Array.from(iter);
    }

    function _nonIterableSpread() {
        throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
    }

    function _toConsumableArray(arr) {
        return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray$2(arr) || _nonIterableSpread();
    }

    var isValid = function isValid2(value) {
        return value !== void 0 && value !== null && value !== "";
    };
    const isValid$1 = isValid;
    var initDefaultProps = function initDefaultProps2(types, defaultProps) {
        var propTypes = _extends({}, types);
        Object.keys(defaultProps).forEach(function (k2) {
            var prop = propTypes[k2];
            if (prop) {
                if (prop.type || prop.default) {
                    prop.default = defaultProps[k2];
                } else if (prop.def) {
                    prop.def(defaultProps[k2]);
                } else {
                    propTypes[k2] = {
                        type: prop,
                        default: defaultProps[k2]
                    };
                }
            } else {
                throw new Error("not have ".concat(k2, " prop"));
            }
        });
        return propTypes;
    };
    const initDefaultProps$1 = initDefaultProps;
    var flattenChildren = function flattenChildren2() {
        var children = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : [];
        var filterEmpty2 = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : true;
        var temp = Array.isArray(children) ? children : [children];
        var res = [];
        temp.forEach(function (child) {
            if (Array.isArray(child)) {
                res.push.apply(res, _toConsumableArray(flattenChildren2(child, filterEmpty2)));
            } else if (child && child.type === Fragment) {
                res.push.apply(res, _toConsumableArray(flattenChildren2(child.children, filterEmpty2)));
            } else if (child && isVNode(child)) {
                if (filterEmpty2 && !isEmptyElement(child)) {
                    res.push(child);
                } else if (!filterEmpty2) {
                    res.push(child);
                }
            } else if (isValid$1(child)) {
                res.push(child);
            }
        });
        return res;
    };
    var findDOMNode = function findDOMNode2(instance) {
        var _a;
        var node = ((_a = instance === null || instance === void 0 ? void 0 : instance.vnode) === null || _a === void 0 ? void 0 : _a.el) || instance && (instance.$el || instance);
        while (node && !node.tagName) {
            node = node.nextSibling;
        }
        return node;
    };

    function isEmptyElement(c2) {
        return c2 && (c2.type === Comment || c2.type === Fragment && c2.children.length === 0 || c2.type === Text && c2.children.trim() === "");
    }

    function filterEmpty() {
        var children = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : [];
        var res = [];
        children.forEach(function (child) {
            if (Array.isArray(child)) {
                res.push.apply(res, _toConsumableArray(child));
            } else if (child.type === Fragment) {
                res.push.apply(res, _toConsumableArray(child.children));
            } else {
                res.push(child);
            }
        });
        return res.filter(function (c2) {
            return !isEmptyElement(c2);
        });
    }

    var raf = function raf2(callback) {
        return setTimeout(callback, 16);
    };
    var caf = function caf2(num) {
        return clearTimeout(num);
    };
    if (typeof window !== "undefined" && "requestAnimationFrame" in window) {
        raf = function raf3(callback) {
            return window.requestAnimationFrame(callback);
        };
        caf = function caf3(handle) {
            return window.cancelAnimationFrame(handle);
        };
    }
    var rafUUID = 0;
    var rafIds = /* @__PURE__ */ new Map();

    function cleanup(id) {
        rafIds.delete(id);
    }

    function wrapperRaf(callback) {
        var times = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : 1;
        rafUUID += 1;
        var id = rafUUID;

        function callRef(leftTimes) {
            if (leftTimes === 0) {
                cleanup(id);
                callback();
            } else {
                var realId = raf(function () {
                    callRef(leftTimes - 1);
                });
                rafIds.set(id, realId);
            }
        }

        callRef(times);
        return id;
    }

    wrapperRaf.cancel = function (id) {
        var realId = rafIds.get(id);
        cleanup(realId);
        return caf(realId);
    };
    var tuple = function tuple2() {
        for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }
        return args;
    };
    var withInstall = function withInstall2(comp) {
        var c2 = comp;
        c2.install = function (app) {
            app.component(c2.displayName || c2.name, comp);
        };
        return comp;
    };
    var supportsPassive = false;
    try {
        var opts = Object.defineProperty({}, "passive", {
            get: function get2() {
                supportsPassive = true;
            }
        });
        window.addEventListener("testPassive", null, opts);
        window.removeEventListener("testPassive", null, opts);
    } catch (e2) {
    }
    const supportsPassive$1 = supportsPassive;

    function addEventListenerWrap(target, eventType, cb, option) {
        if (target && target.addEventListener) {
            var opt = option;
            if (opt === void 0 && supportsPassive$1 && (eventType === "touchstart" || eventType === "touchmove" || eventType === "wheel")) {
                opt = {
                    passive: false
                };
            }
            target.addEventListener(eventType, cb, opt);
        }
        return {
            remove: function remove2() {
                if (target && target.removeEventListener) {
                    target.removeEventListener(eventType, cb);
                }
            }
        };
    }

    const enUS$1 = {
        // Options.jsx
        items_per_page: "/ page",
        jump_to: "Go to",
        jump_to_confirm: "confirm",
        page: "",
        // Pagination.jsx
        prev_page: "Previous Page",
        next_page: "Next Page",
        prev_5: "Previous 5 Pages",
        next_5: "Next 5 Pages",
        prev_3: "Previous 3 Pages",
        next_3: "Next 3 Pages"
    };
    var locale$2 = {
        locale: "en_US",
        today: "Today",
        now: "Now",
        backToToday: "Back to today",
        ok: "Ok",
        clear: "Clear",
        month: "Month",
        year: "Year",
        timeSelect: "select time",
        dateSelect: "select date",
        weekSelect: "Choose a week",
        monthSelect: "Choose a month",
        yearSelect: "Choose a year",
        decadeSelect: "Choose a decade",
        yearFormat: "YYYY",
        dateFormat: "M/D/YYYY",
        dayFormat: "D",
        dateTimeFormat: "M/D/YYYY HH:mm:ss",
        monthBeforeYear: true,
        previousMonth: "Previous month (PageUp)",
        nextMonth: "Next month (PageDown)",
        previousYear: "Last year (Control + left)",
        nextYear: "Next year (Control + right)",
        previousDecade: "Last decade",
        nextDecade: "Next decade",
        previousCentury: "Last century",
        nextCentury: "Next century"
    };
    const CalendarLocale = locale$2;
    var locale$1 = {
        placeholder: "Select time",
        rangePlaceholder: ["Start time", "End time"]
    };
    const TimePicker = locale$1;
    var locale = {
        lang: _extends({
            placeholder: "Select date",
            yearPlaceholder: "Select year",
            quarterPlaceholder: "Select quarter",
            monthPlaceholder: "Select month",
            weekPlaceholder: "Select week",
            rangePlaceholder: ["Start date", "End date"],
            rangeYearPlaceholder: ["Start year", "End year"],
            rangeQuarterPlaceholder: ["Start quarter", "End quarter"],
            rangeMonthPlaceholder: ["Start month", "End month"],
            rangeWeekPlaceholder: ["Start week", "End week"]
        }, CalendarLocale),
        timePickerLocale: _extends({}, TimePicker)
    };
    const enUS = locale;
    var typeTemplate = "${label} is not a valid ${type}";
    var localeValues = {
        locale: "en",
        Pagination: enUS$1,
        DatePicker: enUS,
        TimePicker,
        Calendar: enUS,
        global: {
            placeholder: "Please select"
        },
        Table: {
            filterTitle: "Filter menu",
            filterConfirm: "OK",
            filterReset: "Reset",
            filterEmptyText: "No filters",
            filterCheckall: "Select all items",
            filterSearchPlaceholder: "Search in filters",
            emptyText: "No data",
            selectAll: "Select current page",
            selectInvert: "Invert current page",
            selectNone: "Clear all data",
            selectionAll: "Select all data",
            sortTitle: "Sort",
            expand: "Expand row",
            collapse: "Collapse row",
            triggerDesc: "Click to sort descending",
            triggerAsc: "Click to sort ascending",
            cancelSort: "Click to cancel sorting"
        },
        Modal: {
            okText: "OK",
            cancelText: "Cancel",
            justOkText: "OK"
        },
        Popconfirm: {
            okText: "OK",
            cancelText: "Cancel"
        },
        Transfer: {
            titles: ["", ""],
            searchPlaceholder: "Search here",
            itemUnit: "item",
            itemsUnit: "items",
            remove: "Remove",
            selectCurrent: "Select current page",
            removeCurrent: "Remove current page",
            selectAll: "Select all data",
            removeAll: "Remove all data",
            selectInvert: "Invert current page"
        },
        Upload: {
            uploading: "Uploading...",
            removeFile: "Remove file",
            uploadError: "Upload error",
            previewFile: "Preview file",
            downloadFile: "Download file"
        },
        Empty: {
            description: "No Data"
        },
        Icon: {
            icon: "icon"
        },
        Text: {
            edit: "Edit",
            copy: "Copy",
            copied: "Copied",
            expand: "Expand"
        },
        PageHeader: {
            back: "Back"
        },
        Form: {
            optional: "(optional)",
            defaultValidateMessages: {
                default: "Field validation error for ${label}",
                required: "Please enter ${label}",
                enum: "${label} must be one of [${enum}]",
                whitespace: "${label} cannot be a blank character",
                date: {
                    format: "${label} date format is invalid",
                    parse: "${label} cannot be converted to a date",
                    invalid: "${label} is an invalid date"
                },
                types: {
                    string: typeTemplate,
                    method: typeTemplate,
                    array: typeTemplate,
                    object: typeTemplate,
                    number: typeTemplate,
                    date: typeTemplate,
                    boolean: typeTemplate,
                    integer: typeTemplate,
                    float: typeTemplate,
                    regexp: typeTemplate,
                    email: typeTemplate,
                    url: typeTemplate,
                    hex: typeTemplate
                },
                string: {
                    len: "${label} must be ${len} characters",
                    min: "${label} must be at least ${min} characters",
                    max: "${label} must be up to ${max} characters",
                    range: "${label} must be between ${min}-${max} characters"
                },
                number: {
                    len: "${label} must be equal to ${len}",
                    min: "${label} must be minimum ${min}",
                    max: "${label} must be maximum ${max}",
                    range: "${label} must be between ${min}-${max}"
                },
                array: {
                    len: "Must be ${len} ${label}",
                    min: "At least ${min} ${label}",
                    max: "At most ${max} ${label}",
                    range: "The amount of ${label} must be between ${min}-${max}"
                },
                pattern: {
                    mismatch: "${label} does not match the pattern ${pattern}"
                }
            }
        },
        Image: {
            preview: "Preview"
        }
    };
    const defaultLocale = localeValues;
    const LocaleReceiver = defineComponent({
        name: "LocaleReceiver",
        props: {
            componentName: String,
            defaultLocale: {
                type: [Object, Function]
            },
            children: {
                type: Function
            }
        },
        setup: function setup(props, _ref) {
            var slots = _ref.slots;
            var localeData = inject("localeData", {});
            var locale2 = computed(function () {
                var _props$componentName = props.componentName,
                    componentName = _props$componentName === void 0 ? "global" : _props$componentName,
                    defaultLocale$1 = props.defaultLocale;
                var locale3 = defaultLocale$1 || defaultLocale[componentName || "global"];
                var antLocale = localeData.antLocale;
                var localeFromContext = componentName && antLocale ? antLocale[componentName] : {};
                return _extends(_extends({}, typeof locale3 === "function" ? locale3() : locale3), localeFromContext || {});
            });
            var localeCode = computed(function () {
                var antLocale = localeData.antLocale;
                var localeCode2 = antLocale && antLocale.locale;
                if (antLocale && antLocale.exist && !localeCode2) {
                    return defaultLocale.locale;
                }
                return localeCode2;
            });
            return function () {
                var children = props.children || slots.default;
                var antLocale = localeData.antLocale;
                return children === null || children === void 0 ? void 0 : children(locale2.value, localeCode.value, antLocale);
            };
        }
    });

    function useLocaleReceiver(componentName, defaultLocale$1, propsLocale) {
        var localeData = inject("localeData", {});
        var componentLocale = computed(function () {
            var antLocale = localeData.antLocale;
            var locale2 = unref(defaultLocale$1) || defaultLocale[componentName || "global"];
            var localeFromContext = componentName && antLocale ? antLocale[componentName] : {};
            return _extends(_extends(_extends({}, typeof locale2 === "function" ? locale2() : locale2), localeFromContext || {}), unref(propsLocale) || {});
        });
        return [componentLocale];
    }

    var Empty$2 = function Empty() {
        var _useConfigInject = useConfigInject("empty", {}), getPrefixCls2 = _useConfigInject.getPrefixCls;
        var prefixCls = getPrefixCls2("empty-img-default");
        return createVNode("svg", {
            "class": prefixCls,
            "width": "184",
            "height": "152",
            "viewBox": "0 0 184 152"
        }, [createVNode("g", {
            "fill": "none",
            "fill-rule": "evenodd"
        }, [createVNode("g", {
            "transform": "translate(24 31.67)"
        }, [createVNode("ellipse", {
            "class": "".concat(prefixCls, "-ellipse"),
            "cx": "67.797",
            "cy": "106.89",
            "rx": "67.797",
            "ry": "12.668"
        }, null), createVNode("path", {
            "class": "".concat(prefixCls, "-path-1"),
            "d": "M122.034 69.674L98.109 40.229c-1.148-1.386-2.826-2.225-4.593-2.225h-51.44c-1.766 0-3.444.839-4.592 2.225L13.56 69.674v15.383h108.475V69.674z"
        }, null), createVNode("path", {
            "class": "".concat(prefixCls, "-path-2"),
            "d": "M101.537 86.214L80.63 61.102c-1.001-1.207-2.507-1.867-4.048-1.867H31.724c-1.54 0-3.047.66-4.048 1.867L6.769 86.214v13.792h94.768V86.214z",
            "transform": "translate(13.56)"
        }, null), createVNode("path", {
            "class": "".concat(prefixCls, "-path-3"),
            "d": "M33.83 0h67.933a4 4 0 0 1 4 4v93.344a4 4 0 0 1-4 4H33.83a4 4 0 0 1-4-4V4a4 4 0 0 1 4-4z"
        }, null), createVNode("path", {
            "class": "".concat(prefixCls, "-path-4"),
            "d": "M42.678 9.953h50.237a2 2 0 0 1 2 2V36.91a2 2 0 0 1-2 2H42.678a2 2 0 0 1-2-2V11.953a2 2 0 0 1 2-2zM42.94 49.767h49.713a2.262 2.262 0 1 1 0 4.524H42.94a2.262 2.262 0 0 1 0-4.524zM42.94 61.53h49.713a2.262 2.262 0 1 1 0 4.525H42.94a2.262 2.262 0 0 1 0-4.525zM121.813 105.032c-.775 3.071-3.497 5.36-6.735 5.36H20.515c-3.238 0-5.96-2.29-6.734-5.36a7.309 7.309 0 0 1-.222-1.79V69.675h26.318c2.907 0 5.25 2.448 5.25 5.42v.04c0 2.971 2.37 5.37 5.277 5.37h34.785c2.907 0 5.277-2.421 5.277-5.393V75.1c0-2.972 2.343-5.426 5.25-5.426h26.318v33.569c0 .617-.077 1.216-.221 1.789z"
        }, null)]), createVNode("path", {
            "class": "".concat(prefixCls, "-path-5"),
            "d": "M149.121 33.292l-6.83 2.65a1 1 0 0 1-1.317-1.23l1.937-6.207c-2.589-2.944-4.109-6.534-4.109-10.408C138.802 8.102 148.92 0 161.402 0 173.881 0 184 8.102 184 18.097c0 9.995-10.118 18.097-22.599 18.097-4.528 0-8.744-1.066-12.28-2.902z"
        }, null), createVNode("g", {
            "class": "".concat(prefixCls, "-g"),
            "transform": "translate(149.65 15.383)"
        }, [createVNode("ellipse", {
            "cx": "20.654",
            "cy": "3.167",
            "rx": "2.849",
            "ry": "2.815"
        }, null), createVNode("path", {
            "d": "M5.698 5.63H0L2.898.704zM9.259.704h4.985V5.63H9.259z"
        }, null)])])]);
    };
    Empty$2.PRESENTED_IMAGE_DEFAULT = true;
    const DefaultEmptyImg = Empty$2;
    var Simple = function Simple2() {
        var _useConfigInject = useConfigInject("empty", {}), getPrefixCls2 = _useConfigInject.getPrefixCls;
        var prefixCls = getPrefixCls2("empty-img-simple");
        return createVNode("svg", {
            "class": prefixCls,
            "width": "64",
            "height": "41",
            "viewBox": "0 0 64 41"
        }, [createVNode("g", {
            "transform": "translate(0 1)",
            "fill": "none",
            "fill-rule": "evenodd"
        }, [createVNode("ellipse", {
            "class": "".concat(prefixCls, "-ellipse"),
            "fill": "#F5F5F5",
            "cx": "32",
            "cy": "33",
            "rx": "32",
            "ry": "7"
        }, null), createVNode("g", {
            "class": "".concat(prefixCls, "-g"),
            "fill-rule": "nonzero",
            "stroke": "#D9D9D9"
        }, [createVNode("path", {
            "d": "M55 12.76L44.854 1.258C44.367.474 43.656 0 42.907 0H21.093c-.749 0-1.46.474-1.947 1.257L9 12.761V22h46v-9.24z"
        }, null), createVNode("path", {
            "d": "M41.613 15.931c0-1.605.994-2.93 2.227-2.931H55v18.137C55 33.26 53.68 35 52.05 35h-40.1C10.32 35 9 33.259 9 31.137V13h11.16c1.233 0 2.227 1.323 2.227 2.928v.022c0 1.605 1.005 2.901 2.237 2.901h14.752c1.232 0 2.237-1.308 2.237-2.913v-.007z",
            "fill": "#FAFAFA",
            "class": "".concat(prefixCls, "-path")
        }, null)])])]);
    };
    Simple.PRESENTED_IMAGE_SIMPLE = true;
    const SimpleEmptyImg = Simple;

    function e(e2, t2) {
        for (var n2 = 0; n2 < t2.length; n2++) {
            var r2 = t2[n2];
            r2.enumerable = r2.enumerable || false, r2.configurable = true, "value" in r2 && (r2.writable = true), Object.defineProperty(e2, r2.key, r2);
        }
    }

    function t(t2, n2, r2) {
        return n2 && e(t2.prototype, n2), r2 && e(t2, r2), t2;
    }

    function n() {
        return (n = Object.assign || function (e2) {
            for (var t2 = 1; t2 < arguments.length; t2++) {
                var n2 = arguments[t2];
                for (var r2 in n2)
                    Object.prototype.hasOwnProperty.call(n2, r2) && (e2[r2] = n2[r2]);
            }
            return e2;
        }).apply(this, arguments);
    }

    function r(e2, t2) {
        e2.prototype = Object.create(t2.prototype), e2.prototype.constructor = e2, e2.__proto__ = t2;
    }

    function i(e2, t2) {
        if (null == e2)
            return {};
        var n2, r2, i2 = {}, o2 = Object.keys(e2);
        for (r2 = 0; r2 < o2.length; r2++)
            t2.indexOf(n2 = o2[r2]) >= 0 || (i2[n2] = e2[n2]);
        return i2;
    }

    function o(e2) {
        return 1 == (null != (t2 = e2) && "object" == typeof t2 && false === Array.isArray(t2)) && "[object Object]" === Object.prototype.toString.call(e2);
        var t2;
    }

    var u = Object.prototype, a = u.toString, f = u.hasOwnProperty, c = /^\s*function (\w+)/;

    function l(e2) {
        var t2, n2 = null !== (t2 = null == e2 ? void 0 : e2.type) && void 0 !== t2 ? t2 : e2;
        if (n2) {
            var r2 = n2.toString().match(c);
            return r2 ? r2[1] : "";
        }
        return "";
    }

    var s = function (e2) {
        var t2, n2;
        return false !== o(e2) && "function" == typeof (t2 = e2.constructor) && false !== o(n2 = t2.prototype) && false !== n2.hasOwnProperty("isPrototypeOf");
    }, v = function (e2) {
        return e2;
    }, y = v;
    var d = function (e2, t2) {
        return f.call(e2, t2);
    }, h = Number.isInteger || function (e2) {
        return "number" == typeof e2 && isFinite(e2) && Math.floor(e2) === e2;
    }, b = Array.isArray || function (e2) {
        return "[object Array]" === a.call(e2);
    }, O = function (e2) {
        return "[object Function]" === a.call(e2);
    }, g = function (e2) {
        return s(e2) && d(e2, "_vueTypes_name");
    }, m = function (e2) {
        return s(e2) && (d(e2, "type") || ["_vueTypes_name", "validator", "default", "required"].some(function (t2) {
            return d(e2, t2);
        }));
    };

    function j(e2, t2) {
        return Object.defineProperty(e2.bind(t2), "__original", {value: e2});
    }

    function _(e2, t2, n2) {
        var r2;
        void 0 === n2 && (n2 = false);
        var i2 = true, o2 = "";
        r2 = s(e2) ? e2 : {type: e2};
        var u2 = g(r2) ? r2._vueTypes_name + " - " : "";
        if (m(r2) && null !== r2.type) {
            if (void 0 === r2.type || true === r2.type)
                return i2;
            if (!r2.required && void 0 === t2)
                return i2;
            b(r2.type) ? (i2 = r2.type.some(function (e3) {
                return true === _(e3, t2, true);
            }), o2 = r2.type.map(function (e3) {
                return l(e3);
            }).join(" or ")) : i2 = "Array" === (o2 = l(r2)) ? b(t2) : "Object" === o2 ? s(t2) : "String" === o2 || "Number" === o2 || "Boolean" === o2 || "Function" === o2 ? function (e3) {
                if (null == e3)
                    return "";
                var t3 = e3.constructor.toString().match(c);
                return t3 ? t3[1] : "";
            }(t2) === o2 : t2 instanceof r2.type;
        }
        if (!i2) {
            var a2 = u2 + 'value "' + t2 + '" should be of type "' + o2 + '"';
            return false === n2 ? (y(a2), false) : a2;
        }
        if (d(r2, "validator") && O(r2.validator)) {
            var f2 = y, v2 = [];
            if (y = function (e3) {
                v2.push(e3);
            }, i2 = r2.validator(t2), y = f2, !i2) {
                var p2 = (v2.length > 1 ? "* " : "") + v2.join("\n* ");
                return v2.length = 0, false === n2 ? (y(p2), i2) : p2;
            }
        }
        return i2;
    }

    function T(e2, t2) {
        var n2 = Object.defineProperties(t2, {
            _vueTypes_name: {value: e2, writable: true}, isRequired: {
                get: function () {
                    return this.required = true, this;
                }
            }, def: {
                value: function (e3) {
                    return void 0 !== e3 || this.default ? O(e3) || true === _(this, e3, true) ? (this.default = b(e3) ? function () {
                        return [].concat(e3);
                    } : s(e3) ? function () {
                        return Object.assign({}, e3);
                    } : e3, this) : (y(this._vueTypes_name + ' - invalid default value: "' + e3 + '"'), this) : this;
                }
            }
        }), r2 = n2.validator;
        return O(r2) && (n2.validator = j(r2, n2)), n2;
    }

    function w(e2, t2) {
        var n2 = T(e2, t2);
        return Object.defineProperty(n2, "validate", {
            value: function (e3) {
                return O(this.validator) && y(this._vueTypes_name + " - calling .validate() will overwrite the current custom validator function. Validator info:\n" + JSON.stringify(this)), this.validator = j(e3, this), this;
            }
        });
    }

    function k(e2, t2, n2) {
        var r2, o2, u2 = (r2 = t2, o2 = {}, Object.getOwnPropertyNames(r2).forEach(function (e3) {
            o2[e3] = Object.getOwnPropertyDescriptor(r2, e3);
        }), Object.defineProperties({}, o2));
        if (u2._vueTypes_name = e2, !s(n2))
            return u2;
        var a2, f2, c2 = n2.validator, l2 = i(n2, ["validator"]);
        if (O(c2)) {
            var v2 = u2.validator;
            v2 && (v2 = null !== (f2 = (a2 = v2).__original) && void 0 !== f2 ? f2 : a2), u2.validator = j(v2 ? function (e3) {
                return v2.call(this, e3) && c2.call(this, e3);
            } : c2, u2);
        }
        return Object.assign(u2, l2);
    }

    function P(e2) {
        return e2.replace(/^(?!\s*$)/gm, "  ");
    }

    var x = function () {
        return w("any", {});
    }, A = function () {
        return w("function", {type: Function});
    }, E = function () {
        return w("boolean", {type: Boolean});
    }, N = function () {
        return w("string", {type: String});
    }, q = function () {
        return w("number", {type: Number});
    }, S = function () {
        return w("array", {type: Array});
    }, V = function () {
        return w("object", {type: Object});
    }, F = function () {
        return T("integer", {
            type: Number, validator: function (e2) {
                return h(e2);
            }
        });
    }, D = function () {
        return T("symbol", {
            validator: function (e2) {
                return "symbol" == typeof e2;
            }
        });
    };

    function L(e2, t2) {
        if (void 0 === t2 && (t2 = "custom validation failed"), "function" != typeof e2)
            throw new TypeError("[VueTypes error]: You must provide a function as argument");
        return T(e2.name || "<<anonymous function>>", {
            validator: function (n2) {
                var r2 = e2(n2);
                return r2 || y(this._vueTypes_name + " - " + t2), r2;
            }
        });
    }

    function Y(e2) {
        if (!b(e2))
            throw new TypeError("[VueTypes error]: You must provide an array as argument.");
        var t2 = 'oneOf - value should be one of "' + e2.join('", "') + '".', n2 = e2.reduce(function (e3, t3) {
            if (null != t3) {
                var n3 = t3.constructor;
                -1 === e3.indexOf(n3) && e3.push(n3);
            }
            return e3;
        }, []);
        return T("oneOf", {
            type: n2.length > 0 ? n2 : void 0, validator: function (n3) {
                var r2 = -1 !== e2.indexOf(n3);
                return r2 || y(t2), r2;
            }
        });
    }

    function B(e2) {
        if (!b(e2))
            throw new TypeError("[VueTypes error]: You must provide an array as argument");
        for (var t2 = false, n2 = [], r2 = 0; r2 < e2.length; r2 += 1) {
            var i2 = e2[r2];
            if (m(i2)) {
                if (g(i2) && "oneOf" === i2._vueTypes_name) {
                    n2 = n2.concat(i2.type);
                    continue;
                }
                if (O(i2.validator) && (t2 = true), true !== i2.type && i2.type) {
                    n2 = n2.concat(i2.type);
                    continue;
                }
            }
            n2.push(i2);
        }
        return n2 = n2.filter(function (e3, t3) {
            return n2.indexOf(e3) === t3;
        }), T("oneOfType", t2 ? {
            type: n2, validator: function (t3) {
                var n3 = [], r3 = e2.some(function (e3) {
                    var r4 = _(g(e3) && "oneOf" === e3._vueTypes_name ? e3.type || null : e3, t3, true);
                    return "string" == typeof r4 && n3.push(r4), true === r4;
                });
                return r3 || y("oneOfType - provided value does not match any of the " + n3.length + " passed-in validators:\n" + P(n3.join("\n"))), r3;
            }
        } : {type: n2});
    }

    function I(e2) {
        return T("arrayOf", {
            type: Array, validator: function (t2) {
                var n2, r2 = t2.every(function (t3) {
                    return true === (n2 = _(e2, t3, true));
                });
                return r2 || y("arrayOf - value validation error:\n" + P(n2)), r2;
            }
        });
    }

    function J(e2) {
        return T("instanceOf", {type: e2});
    }

    function M(e2) {
        return T("objectOf", {
            type: Object, validator: function (t2) {
                var n2, r2 = Object.keys(t2).every(function (r3) {
                    return true === (n2 = _(e2, t2[r3], true));
                });
                return r2 || y("objectOf - value validation error:\n" + P(n2)), r2;
            }
        });
    }

    function R(e2) {
        var t2 = Object.keys(e2), n2 = t2.filter(function (t3) {
            var n3;
            return !!(null === (n3 = e2[t3]) || void 0 === n3 ? void 0 : n3.required);
        }), r2 = T("shape", {
            type: Object, validator: function (r3) {
                var i2 = this;
                if (!s(r3))
                    return false;
                var o2 = Object.keys(r3);
                if (n2.length > 0 && n2.some(function (e3) {
                    return -1 === o2.indexOf(e3);
                })) {
                    var u2 = n2.filter(function (e3) {
                        return -1 === o2.indexOf(e3);
                    });
                    return y(1 === u2.length ? 'shape - required property "' + u2[0] + '" is not defined.' : 'shape - required properties "' + u2.join('", "') + '" are not defined.'), false;
                }
                return o2.every(function (n3) {
                    if (-1 === t2.indexOf(n3))
                        return true === i2._vueTypes_isLoose || (y('shape - shape definition does not include a "' + n3 + '" property. Allowed keys: "' + t2.join('", "') + '".'), false);
                    var o3 = _(e2[n3], r3[n3], true);
                    return "string" == typeof o3 && y('shape - "' + n3 + '" property validation error:\n ' + P(o3)), true === o3;
                });
            }
        });
        return Object.defineProperty(r2, "_vueTypes_isLoose", {
            writable: true,
            value: false
        }), Object.defineProperty(r2, "loose", {
            get: function () {
                return this._vueTypes_isLoose = true, this;
            }
        }), r2;
    }

    var $ = function () {
        function e2() {
        }

        return e2.extend = function (e3) {
            var t2 = this;
            if (b(e3))
                return e3.forEach(function (e4) {
                    return t2.extend(e4);
                }), this;
            var n2 = e3.name, r2 = e3.validate, o2 = void 0 !== r2 && r2, u2 = e3.getter, a2 = void 0 !== u2 && u2,
                f2 = i(e3, ["name", "validate", "getter"]);
            if (d(this, n2))
                throw new TypeError('[VueTypes error]: Type "' + n2 + '" already defined');
            var c2, l2 = f2.type;
            return g(l2) ? (delete f2.type, Object.defineProperty(this, n2, a2 ? {
                get: function () {
                    return k(n2, l2, f2);
                }
            } : {
                value: function () {
                    var e4, t3 = k(n2, l2, f2);
                    return t3.validator && (t3.validator = (e4 = t3.validator).bind.apply(e4, [t3].concat([].slice.call(arguments)))), t3;
                }
            })) : (c2 = a2 ? {
                get: function () {
                    var e4 = Object.assign({}, f2);
                    return o2 ? w(n2, e4) : T(n2, e4);
                }, enumerable: true
            } : {
                value: function () {
                    var e4, t3, r3 = Object.assign({}, f2);
                    return e4 = o2 ? w(n2, r3) : T(n2, r3), r3.validator && (e4.validator = (t3 = r3.validator).bind.apply(t3, [e4].concat([].slice.call(arguments)))), e4;
                }, enumerable: true
            }, Object.defineProperty(this, n2, c2));
        }, t(e2, null, [{
            key: "any", get: function () {
                return x();
            }
        }, {
            key: "func", get: function () {
                return A().def(this.defaults.func);
            }
        }, {
            key: "bool", get: function () {
                return E().def(this.defaults.bool);
            }
        }, {
            key: "string", get: function () {
                return N().def(this.defaults.string);
            }
        }, {
            key: "number", get: function () {
                return q().def(this.defaults.number);
            }
        }, {
            key: "array", get: function () {
                return S().def(this.defaults.array);
            }
        }, {
            key: "object", get: function () {
                return V().def(this.defaults.object);
            }
        }, {
            key: "integer", get: function () {
                return F().def(this.defaults.integer);
            }
        }, {
            key: "symbol", get: function () {
                return D();
            }
        }]), e2;
    }();

    function z(e2) {
        var i2;
        return void 0 === e2 && (e2 = {
            func: function () {
            }, bool: true, string: "", number: 0, array: function () {
                return [];
            }, object: function () {
                return {};
            }, integer: 0
        }), (i2 = function (i3) {
            function o2() {
                return i3.apply(this, arguments) || this;
            }

            return r(o2, i3), t(o2, null, [{
                key: "sensibleDefaults", get: function () {
                    return n({}, this.defaults);
                }, set: function (t2) {
                    this.defaults = false !== t2 ? n({}, true !== t2 ? t2 : e2) : {};
                }
            }]), o2;
        }($)).defaults = n({}, e2), i2;
    }

    $.defaults = {}, $.custom = L, $.oneOf = Y, $.instanceOf = J, $.oneOfType = B, $.arrayOf = I, $.objectOf = M, $.shape = R, $.utils = {
        validate: function (e2, t2) {
            return true === _(t2, e2, true);
        }, toType: function (e2, t2, n2) {
            return void 0 === n2 && (n2 = false), n2 ? w(e2, t2) : T(e2, t2);
        }
    };
    (function (e2) {
        function t2() {
            return e2.apply(this, arguments) || this;
        }

        return r(t2, e2), t2;
    })(z());
    var PropTypes = z({
        func: void 0,
        bool: void 0,
        string: void 0,
        number: void 0,
        array: void 0,
        object: void 0,
        integer: void 0
    });
    PropTypes.extend([{
        name: "looseBool",
        getter: true,
        type: Boolean,
        default: void 0
    }, {
        name: "style",
        getter: true,
        type: [String, Object],
        default: void 0
    }, {
        name: "VueNode",
        getter: true,
        type: null
    }]);
    const PropTypes$1 = PropTypes;
    var __rest$2 = globalThis && globalThis.__rest || function (s2, e2) {
        var t2 = {};
        for (var p2 in s2) {
            if (Object.prototype.hasOwnProperty.call(s2, p2) && e2.indexOf(p2) < 0)
                t2[p2] = s2[p2];
        }
        if (s2 != null && typeof Object.getOwnPropertySymbols === "function")
            for (var i2 = 0, p2 = Object.getOwnPropertySymbols(s2); i2 < p2.length; i2++) {
                if (e2.indexOf(p2[i2]) < 0 && Object.prototype.propertyIsEnumerable.call(s2, p2[i2]))
                    t2[p2[i2]] = s2[p2[i2]];
            }
        return t2;
    };
    var defaultEmptyImg = createVNode(DefaultEmptyImg, null, null);
    var simpleEmptyImg = createVNode(SimpleEmptyImg, null, null);
    var Empty2 = function Empty3(props, _ref) {
        var _ref$slots = _ref.slots, slots = _ref$slots === void 0 ? {} : _ref$slots, attrs = _ref.attrs;
        var _a;
        var _useConfigInject = useConfigInject("empty", props), direction = _useConfigInject.direction,
            prefixClsRef = _useConfigInject.prefixCls;
        var prefixCls = prefixClsRef.value;
        var _b = _extends(_extends({}, props), attrs), _b$image = _b.image,
            image = _b$image === void 0 ? defaultEmptyImg : _b$image, _b$description = _b.description,
            description = _b$description === void 0 ? ((_a = slots.description) === null || _a === void 0 ? void 0 : _a.call(slots)) || void 0 : _b$description,
            imageStyle = _b.imageStyle, _b$class = _b.class, className = _b$class === void 0 ? "" : _b$class,
            restProps = __rest$2(_b, ["image", "description", "imageStyle", "class"]);
        return createVNode(LocaleReceiver, {
            "componentName": "Empty",
            "children": function children(locale2) {
                var _classNames;
                var des = typeof description !== "undefined" ? description : locale2.description;
                var alt = typeof des === "string" ? des : "empty";
                var imageNode = null;
                if (typeof image === "string") {
                    imageNode = createVNode("img", {
                        "alt": alt,
                        "src": image
                    }, null);
                } else {
                    imageNode = image;
                }
                return createVNode("div", _objectSpread2({
                    "class": classNames(prefixCls, className, (_classNames = {}, _defineProperty$d(_classNames, "".concat(prefixCls, "-normal"), image === simpleEmptyImg), _defineProperty$d(_classNames, "".concat(prefixCls, "-rtl"), direction.value === "rtl"), _classNames))
                }, restProps), [createVNode("div", {
                    "class": "".concat(prefixCls, "-image"),
                    "style": imageStyle
                }, [imageNode]), des && createVNode("p", {
                    "class": "".concat(prefixCls, "-description")
                }, [des]), slots.default && createVNode("div", {
                    "class": "".concat(prefixCls, "-footer")
                }, [filterEmpty(slots.default())])]);
            }
        }, null);
    };
    Empty2.displayName = "AEmpty";
    Empty2.PRESENTED_IMAGE_DEFAULT = defaultEmptyImg;
    Empty2.PRESENTED_IMAGE_SIMPLE = simpleEmptyImg;
    Empty2.inheritAttrs = false;
    Empty2.props = {
        prefixCls: String,
        image: PropTypes$1.any,
        description: PropTypes$1.any,
        imageStyle: {
            type: Object,
            default: void 0
        }
    };
    const Empty$1 = withInstall(Empty2);
    var RenderEmpty = function RenderEmpty2(props) {
        var _useConfigInject = useConfigInject("empty", props), prefixCls = _useConfigInject.prefixCls;
        var renderHtml = function renderHtml2(componentName) {
            switch (componentName) {
                case "Table":
                case "List":
                    return createVNode(Empty$1, {
                        "image": Empty$1.PRESENTED_IMAGE_SIMPLE
                    }, null);
                case "Select":
                case "TreeSelect":
                case "Cascader":
                case "Transfer":
                case "Mentions":
                    return createVNode(Empty$1, {
                        "image": Empty$1.PRESENTED_IMAGE_SIMPLE,
                        "class": "".concat(prefixCls.value, "-small")
                    }, null);
                default:
                    return createVNode(Empty$1, null, null);
            }
        };
        return renderHtml(props.componentName);
    };

    function renderEmpty(componentName) {
        return createVNode(RenderEmpty, {
            "componentName": componentName
        }, null);
    }

    var warned = {};

    function warning$2(valid, message2) {
    }

    function call(method, valid, message2) {
        if (!valid && !warned[message2]) {
            method(false, message2);
            warned[message2] = true;
        }
    }

    function warningOnce(valid, message2) {
        call(warning$2, valid, message2);
    }

    const warning$1 = function (valid, component) {
        var message2 = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : "";
        warningOnce(valid, "[antdv: ".concat(component, "] ").concat(message2));
    };
    var ANT_MARK = "internalMark";
    var LocaleProvider = defineComponent({
        name: "ALocaleProvider",
        props: {
            locale: {
                type: Object
            },
            ANT_MARK__: String
        },
        setup: function setup2(props, _ref) {
            var slots = _ref.slots;
            warning$1(props.ANT_MARK__ === ANT_MARK, "LocaleProvider", "`LocaleProvider` is deprecated. Please use `locale` with `ConfigProvider` instead");
            var state = reactive({
                antLocale: _extends(_extends({}, props.locale), {
                    exist: true
                }),
                ANT_MARK__: ANT_MARK
            });
            provide("localeData", state);
            watch(function () {
                return props.locale;
            }, function () {
                state.antLocale = _extends(_extends({}, props.locale), {
                    exist: true
                });
            }, {
                immediate: true
            });
            return function () {
                var _a;
                return (_a = slots.default) === null || _a === void 0 ? void 0 : _a.call(slots);
            };
        }
    });
    LocaleProvider.install = function (app) {
        app.component(LocaleProvider.name, LocaleProvider);
        return app;
    };
    const LocaleProvider$1 = withInstall(LocaleProvider);
    tuple("bottomLeft", "bottomRight", "topLeft", "topRight");
    var getTransitionProps = function getTransitionProps2(transitionName2) {
        var opt = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
        var transitionProps = transitionName2 ? _extends({
            name: transitionName2,
            appear: true,
            // type: 'animation',
            // appearFromClass: `${transitionName}-appear ${transitionName}-appear-prepare`,
            // appearActiveClass: `antdv-base-transtion`,
            // appearToClass: `${transitionName}-appear ${transitionName}-appear-active`,
            enterFromClass: "".concat(transitionName2, "-enter ").concat(transitionName2, "-enter-prepare"),
            enterActiveClass: "".concat(transitionName2, "-enter ").concat(transitionName2, "-enter-prepare"),
            enterToClass: "".concat(transitionName2, "-enter ").concat(transitionName2, "-enter-active"),
            leaveFromClass: " ".concat(transitionName2, "-leave"),
            leaveActiveClass: "".concat(transitionName2, "-leave ").concat(transitionName2, "-leave-active"),
            leaveToClass: "".concat(transitionName2, "-leave ").concat(transitionName2, "-leave-active")
        }, opt) : _extends({
            css: false
        }, opt);
        return transitionProps;
    };
    var getTransitionGroupProps = function getTransitionGroupProps2(transitionName2) {
        var opt = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
        var transitionProps = transitionName2 ? _extends({
            name: transitionName2,
            appear: true,
            // appearFromClass: `${transitionName}-appear ${transitionName}-appear-prepare`,
            appearActiveClass: "".concat(transitionName2),
            appearToClass: "".concat(transitionName2, "-appear ").concat(transitionName2, "-appear-active"),
            enterFromClass: "".concat(transitionName2, "-appear ").concat(transitionName2, "-enter ").concat(transitionName2, "-appear-prepare ").concat(transitionName2, "-enter-prepare"),
            enterActiveClass: "".concat(transitionName2),
            enterToClass: "".concat(transitionName2, "-enter ").concat(transitionName2, "-appear ").concat(transitionName2, "-appear-active ").concat(transitionName2, "-enter-active"),
            leaveActiveClass: "".concat(transitionName2, " ").concat(transitionName2, "-leave"),
            leaveToClass: "".concat(transitionName2, "-leave-active")
        }, opt) : _extends({
            css: false
        }, opt);
        return transitionProps;
    };
    var getTransitionName = function getTransitionName2(rootPrefixCls, motion, transitionName2) {
        if (transitionName2 !== void 0) {
            return transitionName2;
        }
        return "".concat(rootPrefixCls, "-").concat(motion);
    };
    const Transition = Transition$1;
    const Notice = defineComponent({
        name: "Notice",
        inheritAttrs: false,
        props: ["prefixCls", "duration", "updateMark", "noticeKey", "closeIcon", "closable", "props", "onClick", "onClose", "holder", "visible"],
        setup: function setup3(props, _ref) {
            var attrs = _ref.attrs, slots = _ref.slots;
            var closeTimer;
            var duration = computed(function () {
                return props.duration === void 0 ? 1.5 : props.duration;
            });
            var startCloseTimer = function startCloseTimer2() {
                if (duration.value) {
                    closeTimer = setTimeout(function () {
                        close3();
                    }, duration.value * 1e3);
                }
            };
            var clearCloseTimer = function clearCloseTimer2() {
                if (closeTimer) {
                    clearTimeout(closeTimer);
                    closeTimer = null;
                }
            };
            var close3 = function close4(e2) {
                if (e2) {
                    e2.stopPropagation();
                }
                clearCloseTimer();
                var onClose = props.onClose, noticeKey = props.noticeKey;
                if (onClose) {
                    onClose(noticeKey);
                }
            };
            var restartCloseTimer = function restartCloseTimer2() {
                clearCloseTimer();
                startCloseTimer();
            };
            onMounted(function () {
                startCloseTimer();
            });
            onUnmounted(function () {
                clearCloseTimer();
            });
            watch([duration, function () {
                return props.updateMark;
            }, function () {
                return props.visible;
            }], function (_ref2, _ref3) {
                var _ref4 = _slicedToArray$2(_ref2, 3), preDuration = _ref4[0], preUpdateMark = _ref4[1],
                    preVisible = _ref4[2];
                var _ref5 = _slicedToArray$2(_ref3, 3), newDuration = _ref5[0], newUpdateMark = _ref5[1],
                    newVisible = _ref5[2];
                if (preDuration !== newDuration || preUpdateMark !== newUpdateMark || preVisible !== newVisible && newVisible) {
                    restartCloseTimer();
                }
            }, {
                flush: "post"
            });
            return function () {
                var _a, _b;
                var prefixCls = props.prefixCls, closable = props.closable, _props$closeIcon = props.closeIcon,
                    closeIcon = _props$closeIcon === void 0 ? (_a = slots.closeIcon) === null || _a === void 0 ? void 0 : _a.call(slots) : _props$closeIcon,
                    onClick = props.onClick, holder = props.holder;
                var className = attrs.class, style = attrs.style;
                var componentClass = "".concat(prefixCls, "-notice");
                var dataOrAriaAttributeProps = Object.keys(attrs).reduce(function (acc, key2) {
                    if (key2.substr(0, 5) === "data-" || key2.substr(0, 5) === "aria-" || key2 === "role") {
                        acc[key2] = attrs[key2];
                    }
                    return acc;
                }, {});
                var node = createVNode("div", _objectSpread2({
                    "class": classNames(componentClass, className, _defineProperty$d({}, "".concat(componentClass, "-closable"), closable)),
                    "style": style,
                    "onMouseenter": clearCloseTimer,
                    "onMouseleave": startCloseTimer,
                    "onClick": onClick
                }, dataOrAriaAttributeProps), [createVNode("div", {
                    "class": "".concat(componentClass, "-content")
                }, [(_b = slots.default) === null || _b === void 0 ? void 0 : _b.call(slots)]), closable ? createVNode("a", {
                    "tabindex": 0,
                    "onClick": close3,
                    "class": "".concat(componentClass, "-close")
                }, [closeIcon || createVNode("span", {
                    "class": "".concat(componentClass, "-close-x")
                }, null)]) : null]);
                if (holder) {
                    return createVNode(Teleport, {
                        "to": holder
                    }, {
                        default: function _default2() {
                            return node;
                        }
                    });
                }
                return node;
            };
        }
    });
    var __rest$1 = globalThis && globalThis.__rest || function (s2, e2) {
        var t2 = {};
        for (var p2 in s2) {
            if (Object.prototype.hasOwnProperty.call(s2, p2) && e2.indexOf(p2) < 0)
                t2[p2] = s2[p2];
        }
        if (s2 != null && typeof Object.getOwnPropertySymbols === "function")
            for (var i2 = 0, p2 = Object.getOwnPropertySymbols(s2); i2 < p2.length; i2++) {
                if (e2.indexOf(p2[i2]) < 0 && Object.prototype.propertyIsEnumerable.call(s2, p2[i2]))
                    t2[p2[i2]] = s2[p2[i2]];
            }
        return t2;
    };
    var seed = 0;
    var now = Date.now();

    function getUuid() {
        var id = seed;
        seed += 1;
        return "rcNotification_".concat(now, "_").concat(id);
    }

    var Notification = defineComponent({
        name: "Notification",
        inheritAttrs: false,
        props: ["prefixCls", "transitionName", "animation", "maxCount", "closeIcon"],
        setup: function setup4(props, _ref) {
            var attrs = _ref.attrs, expose = _ref.expose, slots = _ref.slots;
            var hookRefs = /* @__PURE__ */ new Map();
            var notices = ref([]);
            var transitionProps = computed(function () {
                var prefixCls = props.prefixCls, _props$animation = props.animation,
                    animation = _props$animation === void 0 ? "fade" : _props$animation;
                var name = props.transitionName;
                if (!name && animation) {
                    name = "".concat(prefixCls, "-").concat(animation);
                }
                return getTransitionGroupProps(name);
            });
            var add2 = function add3(originNotice, holderCallback) {
                var key2 = originNotice.key || getUuid();
                var notice2 = _extends(_extends({}, originNotice), {
                    key: key2
                });
                var maxCount2 = props.maxCount;
                var noticeIndex = notices.value.map(function (v2) {
                    return v2.notice.key;
                }).indexOf(key2);
                var updatedNotices = notices.value.concat();
                if (noticeIndex !== -1) {
                    updatedNotices.splice(noticeIndex, 1, {
                        notice: notice2,
                        holderCallback
                    });
                } else {
                    if (maxCount2 && notices.value.length >= maxCount2) {
                        notice2.key = updatedNotices[0].notice.key;
                        notice2.updateMark = getUuid();
                        notice2.userPassKey = key2;
                        updatedNotices.shift();
                    }
                    updatedNotices.push({
                        notice: notice2,
                        holderCallback
                    });
                }
                notices.value = updatedNotices;
            };
            var remove2 = function remove3(removeKey) {
                notices.value = notices.value.filter(function (_ref2) {
                    var _ref2$notice = _ref2.notice, key2 = _ref2$notice.key, userPassKey = _ref2$notice.userPassKey;
                    var mergedKey = userPassKey || key2;
                    return mergedKey !== removeKey;
                });
            };
            expose({
                add: add2,
                remove: remove2,
                notices
            });
            return function () {
                var _className;
                var _a;
                var prefixCls = props.prefixCls, _props$closeIcon = props.closeIcon,
                    closeIcon = _props$closeIcon === void 0 ? (_a = slots.closeIcon) === null || _a === void 0 ? void 0 : _a.call(slots, {
                        prefixCls
                    }) : _props$closeIcon;
                var noticeNodes = notices.value.map(function (_ref3, index2) {
                    var notice2 = _ref3.notice, holderCallback = _ref3.holderCallback;
                    var updateMark = index2 === notices.value.length - 1 ? notice2.updateMark : void 0;
                    var key2 = notice2.key, userPassKey = notice2.userPassKey;
                    var content = notice2.content;
                    var noticeProps = _extends(_extends(_extends({
                        prefixCls,
                        closeIcon: typeof closeIcon === "function" ? closeIcon({
                            prefixCls
                        }) : closeIcon
                    }, notice2), notice2.props), {
                        key: key2,
                        noticeKey: userPassKey || key2,
                        updateMark,
                        onClose: function onClose(noticeKey) {
                            var _a2;
                            remove2(noticeKey);
                            (_a2 = notice2.onClose) === null || _a2 === void 0 ? void 0 : _a2.call(notice2);
                        },
                        onClick: notice2.onClick
                    });
                    if (holderCallback) {
                        return createVNode("div", {
                            "key": key2,
                            "class": "".concat(prefixCls, "-hook-holder"),
                            "ref": function ref2(div) {
                                if (typeof key2 === "undefined") {
                                    return;
                                }
                                if (div) {
                                    hookRefs.set(key2, div);
                                    holderCallback(div, noticeProps);
                                } else {
                                    hookRefs.delete(key2);
                                }
                            }
                        }, null);
                    }
                    return createVNode(Notice, noticeProps, {
                        default: function _default2() {
                            return [typeof content === "function" ? content({
                                prefixCls
                            }) : content];
                        }
                    });
                });
                var className = (_className = {}, _defineProperty$d(_className, prefixCls, 1), _defineProperty$d(_className, attrs.class, !!attrs.class), _className);
                return createVNode("div", {
                    "class": className,
                    "style": attrs.style || {
                        top: "65px",
                        left: "50%"
                    }
                }, [createVNode(TransitionGroup, _objectSpread2({
                    "tag": "div"
                }, transitionProps.value), {
                    default: function _default2() {
                        return [noticeNodes];
                    }
                })]);
            };
        }
    });
    Notification.newInstance = function newNotificationInstance(properties, callback) {
        var _a = properties || {}, _a$name = _a.name, name = _a$name === void 0 ? "notification" : _a$name,
            getContainer3 = _a.getContainer, appContext = _a.appContext, customizePrefixCls = _a.prefixCls,
            customRootPrefixCls = _a.rootPrefixCls, customTransitionName = _a.transitionName,
            hasTransitionName2 = _a.hasTransitionName,
            props = __rest$1(_a, ["name", "getContainer", "appContext", "prefixCls", "rootPrefixCls", "transitionName", "hasTransitionName"]);
        var div = document.createElement("div");
        if (getContainer3) {
            var root = getContainer3();
            root.appendChild(div);
        } else {
            document.body.appendChild(div);
        }
        var Wrapper = defineComponent({
            name: "NotificationWrapper",
            setup: function setup19(_props, _ref4) {
                var attrs = _ref4.attrs;
                var notiRef = ref();
                onMounted(function () {
                    callback({
                        notice: function notice2(noticeProps) {
                            var _a2;
                            (_a2 = notiRef.value) === null || _a2 === void 0 ? void 0 : _a2.add(noticeProps);
                        },
                        removeNotice: function removeNotice(key2) {
                            var _a2;
                            (_a2 = notiRef.value) === null || _a2 === void 0 ? void 0 : _a2.remove(key2);
                        },
                        destroy: function destroy3() {
                            render(null, div);
                            if (div.parentNode) {
                                div.parentNode.removeChild(div);
                            }
                        },
                        component: notiRef
                    });
                });
                return function () {
                    var global2 = globalConfigForApi;
                    var prefixCls = global2.getPrefixCls(name, customizePrefixCls);
                    var rootPrefixCls = global2.getRootPrefixCls(customRootPrefixCls, prefixCls);
                    var transitionName2 = hasTransitionName2 ? customTransitionName : "".concat(rootPrefixCls, "-").concat(customTransitionName);
                    return createVNode(ConfigProvider, _objectSpread2(_objectSpread2({}, global2), {}, {
                        "notUpdateGlobalConfig": true,
                        "prefixCls": rootPrefixCls
                    }), {
                        default: function _default2() {
                            return [createVNode(Notification, _objectSpread2(_objectSpread2({
                                "ref": notiRef
                            }, attrs), {}, {
                                "prefixCls": prefixCls,
                                "transitionName": transitionName2
                            }), null)];
                        }
                    });
                };
            }
        });
        var vm = createVNode(Wrapper, props);
        vm.appContext = appContext || vm.appContext;
        render(vm, div);
    };
    const Notification$1 = Notification;
    var LoadingOutlined$2 = {
        "icon": {
            "tag": "svg",
            "attrs": {"viewBox": "0 0 1024 1024", "focusable": "false"},
            "children": [{
                "tag": "path",
                "attrs": {"d": "M988 548c-19.9 0-36-16.1-36-36 0-59.4-11.6-117-34.6-171.3a440.45 440.45 0 00-94.3-139.9 437.71 437.71 0 00-139.9-94.3C629 83.6 571.4 72 512 72c-19.9 0-36-16.1-36-36s16.1-36 36-36c69.1 0 136.2 13.5 199.3 40.3C772.3 66 827 103 874 150c47 47 83.9 101.8 109.7 162.7 26.7 63.1 40.2 130.2 40.2 199.3.1 19.9-16 36-35.9 36z"}
            }]
        }, "name": "loading", "theme": "outlined"
    };
    const LoadingOutlinedSvg = LoadingOutlined$2;

    function bound01(n2, max) {
        if (isOnePointZero(n2)) {
            n2 = "100%";
        }
        var isPercent = isPercentage(n2);
        n2 = max === 360 ? n2 : Math.min(max, Math.max(0, parseFloat(n2)));
        if (isPercent) {
            n2 = parseInt(String(n2 * max), 10) / 100;
        }
        if (Math.abs(n2 - max) < 1e-6) {
            return 1;
        }
        if (max === 360) {
            n2 = (n2 < 0 ? n2 % max + max : n2 % max) / parseFloat(String(max));
        } else {
            n2 = n2 % max / parseFloat(String(max));
        }
        return n2;
    }

    function clamp01(val) {
        return Math.min(1, Math.max(0, val));
    }

    function isOnePointZero(n2) {
        return typeof n2 === "string" && n2.indexOf(".") !== -1 && parseFloat(n2) === 1;
    }

    function isPercentage(n2) {
        return typeof n2 === "string" && n2.indexOf("%") !== -1;
    }

    function boundAlpha(a2) {
        a2 = parseFloat(a2);
        if (isNaN(a2) || a2 < 0 || a2 > 1) {
            a2 = 1;
        }
        return a2;
    }

    function convertToPercentage(n2) {
        if (n2 <= 1) {
            return "".concat(Number(n2) * 100, "%");
        }
        return n2;
    }

    function pad2(c2) {
        return c2.length === 1 ? "0" + c2 : String(c2);
    }

    function rgbToRgb(r2, g2, b2) {
        return {
            r: bound01(r2, 255) * 255,
            g: bound01(g2, 255) * 255,
            b: bound01(b2, 255) * 255
        };
    }

    function rgbToHsl(r2, g2, b2) {
        r2 = bound01(r2, 255);
        g2 = bound01(g2, 255);
        b2 = bound01(b2, 255);
        var max = Math.max(r2, g2, b2);
        var min = Math.min(r2, g2, b2);
        var h2 = 0;
        var s2 = 0;
        var l2 = (max + min) / 2;
        if (max === min) {
            s2 = 0;
            h2 = 0;
        } else {
            var d2 = max - min;
            s2 = l2 > 0.5 ? d2 / (2 - max - min) : d2 / (max + min);
            switch (max) {
                case r2:
                    h2 = (g2 - b2) / d2 + (g2 < b2 ? 6 : 0);
                    break;
                case g2:
                    h2 = (b2 - r2) / d2 + 2;
                    break;
                case b2:
                    h2 = (r2 - g2) / d2 + 4;
                    break;
            }
            h2 /= 6;
        }
        return {h: h2, s: s2, l: l2};
    }

    function hue2rgb(p2, q2, t2) {
        if (t2 < 0) {
            t2 += 1;
        }
        if (t2 > 1) {
            t2 -= 1;
        }
        if (t2 < 1 / 6) {
            return p2 + (q2 - p2) * (6 * t2);
        }
        if (t2 < 1 / 2) {
            return q2;
        }
        if (t2 < 2 / 3) {
            return p2 + (q2 - p2) * (2 / 3 - t2) * 6;
        }
        return p2;
    }

    function hslToRgb(h2, s2, l2) {
        var r2;
        var g2;
        var b2;
        h2 = bound01(h2, 360);
        s2 = bound01(s2, 100);
        l2 = bound01(l2, 100);
        if (s2 === 0) {
            g2 = l2;
            b2 = l2;
            r2 = l2;
        } else {
            var q2 = l2 < 0.5 ? l2 * (1 + s2) : l2 + s2 - l2 * s2;
            var p2 = 2 * l2 - q2;
            r2 = hue2rgb(p2, q2, h2 + 1 / 3);
            g2 = hue2rgb(p2, q2, h2);
            b2 = hue2rgb(p2, q2, h2 - 1 / 3);
        }
        return {r: r2 * 255, g: g2 * 255, b: b2 * 255};
    }

    function rgbToHsv(r2, g2, b2) {
        r2 = bound01(r2, 255);
        g2 = bound01(g2, 255);
        b2 = bound01(b2, 255);
        var max = Math.max(r2, g2, b2);
        var min = Math.min(r2, g2, b2);
        var h2 = 0;
        var v2 = max;
        var d2 = max - min;
        var s2 = max === 0 ? 0 : d2 / max;
        if (max === min) {
            h2 = 0;
        } else {
            switch (max) {
                case r2:
                    h2 = (g2 - b2) / d2 + (g2 < b2 ? 6 : 0);
                    break;
                case g2:
                    h2 = (b2 - r2) / d2 + 2;
                    break;
                case b2:
                    h2 = (r2 - g2) / d2 + 4;
                    break;
            }
            h2 /= 6;
        }
        return {h: h2, s: s2, v: v2};
    }

    function hsvToRgb(h2, s2, v2) {
        h2 = bound01(h2, 360) * 6;
        s2 = bound01(s2, 100);
        v2 = bound01(v2, 100);
        var i2 = Math.floor(h2);
        var f2 = h2 - i2;
        var p2 = v2 * (1 - s2);
        var q2 = v2 * (1 - f2 * s2);
        var t2 = v2 * (1 - (1 - f2) * s2);
        var mod = i2 % 6;
        var r2 = [v2, q2, p2, p2, t2, v2][mod];
        var g2 = [t2, v2, v2, q2, p2, p2][mod];
        var b2 = [p2, p2, t2, v2, v2, q2][mod];
        return {r: r2 * 255, g: g2 * 255, b: b2 * 255};
    }

    function rgbToHex(r2, g2, b2, allow3Char) {
        var hex = [
            pad2(Math.round(r2).toString(16)),
            pad2(Math.round(g2).toString(16)),
            pad2(Math.round(b2).toString(16))
        ];
        if (allow3Char && hex[0].startsWith(hex[0].charAt(1)) && hex[1].startsWith(hex[1].charAt(1)) && hex[2].startsWith(hex[2].charAt(1))) {
            return hex[0].charAt(0) + hex[1].charAt(0) + hex[2].charAt(0);
        }
        return hex.join("");
    }

    function rgbaToHex(r2, g2, b2, a2, allow4Char) {
        var hex = [
            pad2(Math.round(r2).toString(16)),
            pad2(Math.round(g2).toString(16)),
            pad2(Math.round(b2).toString(16)),
            pad2(convertDecimalToHex(a2))
        ];
        if (allow4Char && hex[0].startsWith(hex[0].charAt(1)) && hex[1].startsWith(hex[1].charAt(1)) && hex[2].startsWith(hex[2].charAt(1)) && hex[3].startsWith(hex[3].charAt(1))) {
            return hex[0].charAt(0) + hex[1].charAt(0) + hex[2].charAt(0) + hex[3].charAt(0);
        }
        return hex.join("");
    }

    function convertDecimalToHex(d2) {
        return Math.round(parseFloat(d2) * 255).toString(16);
    }

    function convertHexToDecimal(h2) {
        return parseIntFromHex(h2) / 255;
    }

    function parseIntFromHex(val) {
        return parseInt(val, 16);
    }

    function numberInputToObject(color) {
        return {
            r: color >> 16,
            g: (color & 65280) >> 8,
            b: color & 255
        };
    }

    var names = {
        aliceblue: "#f0f8ff",
        antiquewhite: "#faebd7",
        aqua: "#00ffff",
        aquamarine: "#7fffd4",
        azure: "#f0ffff",
        beige: "#f5f5dc",
        bisque: "#ffe4c4",
        black: "#000000",
        blanchedalmond: "#ffebcd",
        blue: "#0000ff",
        blueviolet: "#8a2be2",
        brown: "#a52a2a",
        burlywood: "#deb887",
        cadetblue: "#5f9ea0",
        chartreuse: "#7fff00",
        chocolate: "#d2691e",
        coral: "#ff7f50",
        cornflowerblue: "#6495ed",
        cornsilk: "#fff8dc",
        crimson: "#dc143c",
        cyan: "#00ffff",
        darkblue: "#00008b",
        darkcyan: "#008b8b",
        darkgoldenrod: "#b8860b",
        darkgray: "#a9a9a9",
        darkgreen: "#006400",
        darkgrey: "#a9a9a9",
        darkkhaki: "#bdb76b",
        darkmagenta: "#8b008b",
        darkolivegreen: "#556b2f",
        darkorange: "#ff8c00",
        darkorchid: "#9932cc",
        darkred: "#8b0000",
        darksalmon: "#e9967a",
        darkseagreen: "#8fbc8f",
        darkslateblue: "#483d8b",
        darkslategray: "#2f4f4f",
        darkslategrey: "#2f4f4f",
        darkturquoise: "#00ced1",
        darkviolet: "#9400d3",
        deeppink: "#ff1493",
        deepskyblue: "#00bfff",
        dimgray: "#696969",
        dimgrey: "#696969",
        dodgerblue: "#1e90ff",
        firebrick: "#b22222",
        floralwhite: "#fffaf0",
        forestgreen: "#228b22",
        fuchsia: "#ff00ff",
        gainsboro: "#dcdcdc",
        ghostwhite: "#f8f8ff",
        goldenrod: "#daa520",
        gold: "#ffd700",
        gray: "#808080",
        green: "#008000",
        greenyellow: "#adff2f",
        grey: "#808080",
        honeydew: "#f0fff0",
        hotpink: "#ff69b4",
        indianred: "#cd5c5c",
        indigo: "#4b0082",
        ivory: "#fffff0",
        khaki: "#f0e68c",
        lavenderblush: "#fff0f5",
        lavender: "#e6e6fa",
        lawngreen: "#7cfc00",
        lemonchiffon: "#fffacd",
        lightblue: "#add8e6",
        lightcoral: "#f08080",
        lightcyan: "#e0ffff",
        lightgoldenrodyellow: "#fafad2",
        lightgray: "#d3d3d3",
        lightgreen: "#90ee90",
        lightgrey: "#d3d3d3",
        lightpink: "#ffb6c1",
        lightsalmon: "#ffa07a",
        lightseagreen: "#20b2aa",
        lightskyblue: "#87cefa",
        lightslategray: "#778899",
        lightslategrey: "#778899",
        lightsteelblue: "#b0c4de",
        lightyellow: "#ffffe0",
        lime: "#00ff00",
        limegreen: "#32cd32",
        linen: "#faf0e6",
        magenta: "#ff00ff",
        maroon: "#800000",
        mediumaquamarine: "#66cdaa",
        mediumblue: "#0000cd",
        mediumorchid: "#ba55d3",
        mediumpurple: "#9370db",
        mediumseagreen: "#3cb371",
        mediumslateblue: "#7b68ee",
        mediumspringgreen: "#00fa9a",
        mediumturquoise: "#48d1cc",
        mediumvioletred: "#c71585",
        midnightblue: "#191970",
        mintcream: "#f5fffa",
        mistyrose: "#ffe4e1",
        moccasin: "#ffe4b5",
        navajowhite: "#ffdead",
        navy: "#000080",
        oldlace: "#fdf5e6",
        olive: "#808000",
        olivedrab: "#6b8e23",
        orange: "#ffa500",
        orangered: "#ff4500",
        orchid: "#da70d6",
        palegoldenrod: "#eee8aa",
        palegreen: "#98fb98",
        paleturquoise: "#afeeee",
        palevioletred: "#db7093",
        papayawhip: "#ffefd5",
        peachpuff: "#ffdab9",
        peru: "#cd853f",
        pink: "#ffc0cb",
        plum: "#dda0dd",
        powderblue: "#b0e0e6",
        purple: "#800080",
        rebeccapurple: "#663399",
        red: "#ff0000",
        rosybrown: "#bc8f8f",
        royalblue: "#4169e1",
        saddlebrown: "#8b4513",
        salmon: "#fa8072",
        sandybrown: "#f4a460",
        seagreen: "#2e8b57",
        seashell: "#fff5ee",
        sienna: "#a0522d",
        silver: "#c0c0c0",
        skyblue: "#87ceeb",
        slateblue: "#6a5acd",
        slategray: "#708090",
        slategrey: "#708090",
        snow: "#fffafa",
        springgreen: "#00ff7f",
        steelblue: "#4682b4",
        tan: "#d2b48c",
        teal: "#008080",
        thistle: "#d8bfd8",
        tomato: "#ff6347",
        turquoise: "#40e0d0",
        violet: "#ee82ee",
        wheat: "#f5deb3",
        white: "#ffffff",
        whitesmoke: "#f5f5f5",
        yellow: "#ffff00",
        yellowgreen: "#9acd32"
    };

    function inputToRGB(color) {
        var rgb = {r: 0, g: 0, b: 0};
        var a2 = 1;
        var s2 = null;
        var v2 = null;
        var l2 = null;
        var ok = false;
        var format = false;
        if (typeof color === "string") {
            color = stringInputToObject(color);
        }
        if (typeof color === "object") {
            if (isValidCSSUnit(color.r) && isValidCSSUnit(color.g) && isValidCSSUnit(color.b)) {
                rgb = rgbToRgb(color.r, color.g, color.b);
                ok = true;
                format = String(color.r).substr(-1) === "%" ? "prgb" : "rgb";
            } else if (isValidCSSUnit(color.h) && isValidCSSUnit(color.s) && isValidCSSUnit(color.v)) {
                s2 = convertToPercentage(color.s);
                v2 = convertToPercentage(color.v);
                rgb = hsvToRgb(color.h, s2, v2);
                ok = true;
                format = "hsv";
            } else if (isValidCSSUnit(color.h) && isValidCSSUnit(color.s) && isValidCSSUnit(color.l)) {
                s2 = convertToPercentage(color.s);
                l2 = convertToPercentage(color.l);
                rgb = hslToRgb(color.h, s2, l2);
                ok = true;
                format = "hsl";
            }
            if (Object.prototype.hasOwnProperty.call(color, "a")) {
                a2 = color.a;
            }
        }
        a2 = boundAlpha(a2);
        return {
            ok,
            format: color.format || format,
            r: Math.min(255, Math.max(rgb.r, 0)),
            g: Math.min(255, Math.max(rgb.g, 0)),
            b: Math.min(255, Math.max(rgb.b, 0)),
            a: a2
        };
    }

    var CSS_INTEGER = "[-\\+]?\\d+%?";
    var CSS_NUMBER = "[-\\+]?\\d*\\.\\d+%?";
    var CSS_UNIT = "(?:".concat(CSS_NUMBER, ")|(?:").concat(CSS_INTEGER, ")");
    var PERMISSIVE_MATCH3 = "[\\s|\\(]+(".concat(CSS_UNIT, ")[,|\\s]+(").concat(CSS_UNIT, ")[,|\\s]+(").concat(CSS_UNIT, ")\\s*\\)?");
    var PERMISSIVE_MATCH4 = "[\\s|\\(]+(".concat(CSS_UNIT, ")[,|\\s]+(").concat(CSS_UNIT, ")[,|\\s]+(").concat(CSS_UNIT, ")[,|\\s]+(").concat(CSS_UNIT, ")\\s*\\)?");
    var matchers = {
        CSS_UNIT: new RegExp(CSS_UNIT),
        rgb: new RegExp("rgb" + PERMISSIVE_MATCH3),
        rgba: new RegExp("rgba" + PERMISSIVE_MATCH4),
        hsl: new RegExp("hsl" + PERMISSIVE_MATCH3),
        hsla: new RegExp("hsla" + PERMISSIVE_MATCH4),
        hsv: new RegExp("hsv" + PERMISSIVE_MATCH3),
        hsva: new RegExp("hsva" + PERMISSIVE_MATCH4),
        hex3: /^#?([0-9a-fA-F]{1})([0-9a-fA-F]{1})([0-9a-fA-F]{1})$/,
        hex6: /^#?([0-9a-fA-F]{2})([0-9a-fA-F]{2})([0-9a-fA-F]{2})$/,
        hex4: /^#?([0-9a-fA-F]{1})([0-9a-fA-F]{1})([0-9a-fA-F]{1})([0-9a-fA-F]{1})$/,
        hex8: /^#?([0-9a-fA-F]{2})([0-9a-fA-F]{2})([0-9a-fA-F]{2})([0-9a-fA-F]{2})$/
    };

    function stringInputToObject(color) {
        color = color.trim().toLowerCase();
        if (color.length === 0) {
            return false;
        }
        var named = false;
        if (names[color]) {
            color = names[color];
            named = true;
        } else if (color === "transparent") {
            return {r: 0, g: 0, b: 0, a: 0, format: "name"};
        }
        var match2 = matchers.rgb.exec(color);
        if (match2) {
            return {r: match2[1], g: match2[2], b: match2[3]};
        }
        match2 = matchers.rgba.exec(color);
        if (match2) {
            return {r: match2[1], g: match2[2], b: match2[3], a: match2[4]};
        }
        match2 = matchers.hsl.exec(color);
        if (match2) {
            return {h: match2[1], s: match2[2], l: match2[3]};
        }
        match2 = matchers.hsla.exec(color);
        if (match2) {
            return {h: match2[1], s: match2[2], l: match2[3], a: match2[4]};
        }
        match2 = matchers.hsv.exec(color);
        if (match2) {
            return {h: match2[1], s: match2[2], v: match2[3]};
        }
        match2 = matchers.hsva.exec(color);
        if (match2) {
            return {h: match2[1], s: match2[2], v: match2[3], a: match2[4]};
        }
        match2 = matchers.hex8.exec(color);
        if (match2) {
            return {
                r: parseIntFromHex(match2[1]),
                g: parseIntFromHex(match2[2]),
                b: parseIntFromHex(match2[3]),
                a: convertHexToDecimal(match2[4]),
                format: named ? "name" : "hex8"
            };
        }
        match2 = matchers.hex6.exec(color);
        if (match2) {
            return {
                r: parseIntFromHex(match2[1]),
                g: parseIntFromHex(match2[2]),
                b: parseIntFromHex(match2[3]),
                format: named ? "name" : "hex"
            };
        }
        match2 = matchers.hex4.exec(color);
        if (match2) {
            return {
                r: parseIntFromHex(match2[1] + match2[1]),
                g: parseIntFromHex(match2[2] + match2[2]),
                b: parseIntFromHex(match2[3] + match2[3]),
                a: convertHexToDecimal(match2[4] + match2[4]),
                format: named ? "name" : "hex8"
            };
        }
        match2 = matchers.hex3.exec(color);
        if (match2) {
            return {
                r: parseIntFromHex(match2[1] + match2[1]),
                g: parseIntFromHex(match2[2] + match2[2]),
                b: parseIntFromHex(match2[3] + match2[3]),
                format: named ? "name" : "hex"
            };
        }
        return false;
    }

    function isValidCSSUnit(color) {
        return Boolean(matchers.CSS_UNIT.exec(String(color)));
    }

    var TinyColor = (
        /** @class */
        function () {
            function TinyColor2(color, opts) {
                if (color === void 0) {
                    color = "";
                }
                if (opts === void 0) {
                    opts = {};
                }
                var _a;
                if (color instanceof TinyColor2) {
                    return color;
                }
                if (typeof color === "number") {
                    color = numberInputToObject(color);
                }
                this.originalInput = color;
                var rgb = inputToRGB(color);
                this.originalInput = color;
                this.r = rgb.r;
                this.g = rgb.g;
                this.b = rgb.b;
                this.a = rgb.a;
                this.roundA = Math.round(100 * this.a) / 100;
                this.format = (_a = opts.format) !== null && _a !== void 0 ? _a : rgb.format;
                this.gradientType = opts.gradientType;
                if (this.r < 1) {
                    this.r = Math.round(this.r);
                }
                if (this.g < 1) {
                    this.g = Math.round(this.g);
                }
                if (this.b < 1) {
                    this.b = Math.round(this.b);
                }
                this.isValid = rgb.ok;
            }

            TinyColor2.prototype.isDark = function () {
                return this.getBrightness() < 128;
            };
            TinyColor2.prototype.isLight = function () {
                return !this.isDark();
            };
            TinyColor2.prototype.getBrightness = function () {
                var rgb = this.toRgb();
                return (rgb.r * 299 + rgb.g * 587 + rgb.b * 114) / 1e3;
            };
            TinyColor2.prototype.getLuminance = function () {
                var rgb = this.toRgb();
                var R2;
                var G;
                var B2;
                var RsRGB = rgb.r / 255;
                var GsRGB = rgb.g / 255;
                var BsRGB = rgb.b / 255;
                if (RsRGB <= 0.03928) {
                    R2 = RsRGB / 12.92;
                } else {
                    R2 = Math.pow((RsRGB + 0.055) / 1.055, 2.4);
                }
                if (GsRGB <= 0.03928) {
                    G = GsRGB / 12.92;
                } else {
                    G = Math.pow((GsRGB + 0.055) / 1.055, 2.4);
                }
                if (BsRGB <= 0.03928) {
                    B2 = BsRGB / 12.92;
                } else {
                    B2 = Math.pow((BsRGB + 0.055) / 1.055, 2.4);
                }
                return 0.2126 * R2 + 0.7152 * G + 0.0722 * B2;
            };
            TinyColor2.prototype.getAlpha = function () {
                return this.a;
            };
            TinyColor2.prototype.setAlpha = function (alpha) {
                this.a = boundAlpha(alpha);
                this.roundA = Math.round(100 * this.a) / 100;
                return this;
            };
            TinyColor2.prototype.isMonochrome = function () {
                var s2 = this.toHsl().s;
                return s2 === 0;
            };
            TinyColor2.prototype.toHsv = function () {
                var hsv = rgbToHsv(this.r, this.g, this.b);
                return {h: hsv.h * 360, s: hsv.s, v: hsv.v, a: this.a};
            };
            TinyColor2.prototype.toHsvString = function () {
                var hsv = rgbToHsv(this.r, this.g, this.b);
                var h2 = Math.round(hsv.h * 360);
                var s2 = Math.round(hsv.s * 100);
                var v2 = Math.round(hsv.v * 100);
                return this.a === 1 ? "hsv(".concat(h2, ", ").concat(s2, "%, ").concat(v2, "%)") : "hsva(".concat(h2, ", ").concat(s2, "%, ").concat(v2, "%, ").concat(this.roundA, ")");
            };
            TinyColor2.prototype.toHsl = function () {
                var hsl = rgbToHsl(this.r, this.g, this.b);
                return {h: hsl.h * 360, s: hsl.s, l: hsl.l, a: this.a};
            };
            TinyColor2.prototype.toHslString = function () {
                var hsl = rgbToHsl(this.r, this.g, this.b);
                var h2 = Math.round(hsl.h * 360);
                var s2 = Math.round(hsl.s * 100);
                var l2 = Math.round(hsl.l * 100);
                return this.a === 1 ? "hsl(".concat(h2, ", ").concat(s2, "%, ").concat(l2, "%)") : "hsla(".concat(h2, ", ").concat(s2, "%, ").concat(l2, "%, ").concat(this.roundA, ")");
            };
            TinyColor2.prototype.toHex = function (allow3Char) {
                if (allow3Char === void 0) {
                    allow3Char = false;
                }
                return rgbToHex(this.r, this.g, this.b, allow3Char);
            };
            TinyColor2.prototype.toHexString = function (allow3Char) {
                if (allow3Char === void 0) {
                    allow3Char = false;
                }
                return "#" + this.toHex(allow3Char);
            };
            TinyColor2.prototype.toHex8 = function (allow4Char) {
                if (allow4Char === void 0) {
                    allow4Char = false;
                }
                return rgbaToHex(this.r, this.g, this.b, this.a, allow4Char);
            };
            TinyColor2.prototype.toHex8String = function (allow4Char) {
                if (allow4Char === void 0) {
                    allow4Char = false;
                }
                return "#" + this.toHex8(allow4Char);
            };
            TinyColor2.prototype.toRgb = function () {
                return {
                    r: Math.round(this.r),
                    g: Math.round(this.g),
                    b: Math.round(this.b),
                    a: this.a
                };
            };
            TinyColor2.prototype.toRgbString = function () {
                var r2 = Math.round(this.r);
                var g2 = Math.round(this.g);
                var b2 = Math.round(this.b);
                return this.a === 1 ? "rgb(".concat(r2, ", ").concat(g2, ", ").concat(b2, ")") : "rgba(".concat(r2, ", ").concat(g2, ", ").concat(b2, ", ").concat(this.roundA, ")");
            };
            TinyColor2.prototype.toPercentageRgb = function () {
                var fmt = function (x2) {
                    return "".concat(Math.round(bound01(x2, 255) * 100), "%");
                };
                return {
                    r: fmt(this.r),
                    g: fmt(this.g),
                    b: fmt(this.b),
                    a: this.a
                };
            };
            TinyColor2.prototype.toPercentageRgbString = function () {
                var rnd = function (x2) {
                    return Math.round(bound01(x2, 255) * 100);
                };
                return this.a === 1 ? "rgb(".concat(rnd(this.r), "%, ").concat(rnd(this.g), "%, ").concat(rnd(this.b), "%)") : "rgba(".concat(rnd(this.r), "%, ").concat(rnd(this.g), "%, ").concat(rnd(this.b), "%, ").concat(this.roundA, ")");
            };
            TinyColor2.prototype.toName = function () {
                if (this.a === 0) {
                    return "transparent";
                }
                if (this.a < 1) {
                    return false;
                }
                var hex = "#" + rgbToHex(this.r, this.g, this.b, false);
                for (var _i = 0, _a = Object.entries(names); _i < _a.length; _i++) {
                    var _b = _a[_i], key2 = _b[0], value = _b[1];
                    if (hex === value) {
                        return key2;
                    }
                }
                return false;
            };
            TinyColor2.prototype.toString = function (format) {
                var formatSet = Boolean(format);
                format = format !== null && format !== void 0 ? format : this.format;
                var formattedString = false;
                var hasAlpha = this.a < 1 && this.a >= 0;
                var needsAlphaFormat = !formatSet && hasAlpha && (format.startsWith("hex") || format === "name");
                if (needsAlphaFormat) {
                    if (format === "name" && this.a === 0) {
                        return this.toName();
                    }
                    return this.toRgbString();
                }
                if (format === "rgb") {
                    formattedString = this.toRgbString();
                }
                if (format === "prgb") {
                    formattedString = this.toPercentageRgbString();
                }
                if (format === "hex" || format === "hex6") {
                    formattedString = this.toHexString();
                }
                if (format === "hex3") {
                    formattedString = this.toHexString(true);
                }
                if (format === "hex4") {
                    formattedString = this.toHex8String(true);
                }
                if (format === "hex8") {
                    formattedString = this.toHex8String();
                }
                if (format === "name") {
                    formattedString = this.toName();
                }
                if (format === "hsl") {
                    formattedString = this.toHslString();
                }
                if (format === "hsv") {
                    formattedString = this.toHsvString();
                }
                return formattedString || this.toHexString();
            };
            TinyColor2.prototype.toNumber = function () {
                return (Math.round(this.r) << 16) + (Math.round(this.g) << 8) + Math.round(this.b);
            };
            TinyColor2.prototype.clone = function () {
                return new TinyColor2(this.toString());
            };
            TinyColor2.prototype.lighten = function (amount) {
                if (amount === void 0) {
                    amount = 10;
                }
                var hsl = this.toHsl();
                hsl.l += amount / 100;
                hsl.l = clamp01(hsl.l);
                return new TinyColor2(hsl);
            };
            TinyColor2.prototype.brighten = function (amount) {
                if (amount === void 0) {
                    amount = 10;
                }
                var rgb = this.toRgb();
                rgb.r = Math.max(0, Math.min(255, rgb.r - Math.round(255 * -(amount / 100))));
                rgb.g = Math.max(0, Math.min(255, rgb.g - Math.round(255 * -(amount / 100))));
                rgb.b = Math.max(0, Math.min(255, rgb.b - Math.round(255 * -(amount / 100))));
                return new TinyColor2(rgb);
            };
            TinyColor2.prototype.darken = function (amount) {
                if (amount === void 0) {
                    amount = 10;
                }
                var hsl = this.toHsl();
                hsl.l -= amount / 100;
                hsl.l = clamp01(hsl.l);
                return new TinyColor2(hsl);
            };
            TinyColor2.prototype.tint = function (amount) {
                if (amount === void 0) {
                    amount = 10;
                }
                return this.mix("white", amount);
            };
            TinyColor2.prototype.shade = function (amount) {
                if (amount === void 0) {
                    amount = 10;
                }
                return this.mix("black", amount);
            };
            TinyColor2.prototype.desaturate = function (amount) {
                if (amount === void 0) {
                    amount = 10;
                }
                var hsl = this.toHsl();
                hsl.s -= amount / 100;
                hsl.s = clamp01(hsl.s);
                return new TinyColor2(hsl);
            };
            TinyColor2.prototype.saturate = function (amount) {
                if (amount === void 0) {
                    amount = 10;
                }
                var hsl = this.toHsl();
                hsl.s += amount / 100;
                hsl.s = clamp01(hsl.s);
                return new TinyColor2(hsl);
            };
            TinyColor2.prototype.greyscale = function () {
                return this.desaturate(100);
            };
            TinyColor2.prototype.spin = function (amount) {
                var hsl = this.toHsl();
                var hue = (hsl.h + amount) % 360;
                hsl.h = hue < 0 ? 360 + hue : hue;
                return new TinyColor2(hsl);
            };
            TinyColor2.prototype.mix = function (color, amount) {
                if (amount === void 0) {
                    amount = 50;
                }
                var rgb1 = this.toRgb();
                var rgb2 = new TinyColor2(color).toRgb();
                var p2 = amount / 100;
                var rgba = {
                    r: (rgb2.r - rgb1.r) * p2 + rgb1.r,
                    g: (rgb2.g - rgb1.g) * p2 + rgb1.g,
                    b: (rgb2.b - rgb1.b) * p2 + rgb1.b,
                    a: (rgb2.a - rgb1.a) * p2 + rgb1.a
                };
                return new TinyColor2(rgba);
            };
            TinyColor2.prototype.analogous = function (results, slices) {
                if (results === void 0) {
                    results = 6;
                }
                if (slices === void 0) {
                    slices = 30;
                }
                var hsl = this.toHsl();
                var part = 360 / slices;
                var ret = [this];
                for (hsl.h = (hsl.h - (part * results >> 1) + 720) % 360; --results;) {
                    hsl.h = (hsl.h + part) % 360;
                    ret.push(new TinyColor2(hsl));
                }
                return ret;
            };
            TinyColor2.prototype.complement = function () {
                var hsl = this.toHsl();
                hsl.h = (hsl.h + 180) % 360;
                return new TinyColor2(hsl);
            };
            TinyColor2.prototype.monochromatic = function (results) {
                if (results === void 0) {
                    results = 6;
                }
                var hsv = this.toHsv();
                var h2 = hsv.h;
                var s2 = hsv.s;
                var v2 = hsv.v;
                var res = [];
                var modification = 1 / results;
                while (results--) {
                    res.push(new TinyColor2({h: h2, s: s2, v: v2}));
                    v2 = (v2 + modification) % 1;
                }
                return res;
            };
            TinyColor2.prototype.splitcomplement = function () {
                var hsl = this.toHsl();
                var h2 = hsl.h;
                return [
                    this,
                    new TinyColor2({h: (h2 + 72) % 360, s: hsl.s, l: hsl.l}),
                    new TinyColor2({h: (h2 + 216) % 360, s: hsl.s, l: hsl.l})
                ];
            };
            TinyColor2.prototype.onBackground = function (background) {
                var fg = this.toRgb();
                var bg = new TinyColor2(background).toRgb();
                return new TinyColor2({
                    r: bg.r + (fg.r - bg.r) * fg.a,
                    g: bg.g + (fg.g - bg.g) * fg.a,
                    b: bg.b + (fg.b - bg.b) * fg.a
                });
            };
            TinyColor2.prototype.triad = function () {
                return this.polyad(3);
            };
            TinyColor2.prototype.tetrad = function () {
                return this.polyad(4);
            };
            TinyColor2.prototype.polyad = function (n2) {
                var hsl = this.toHsl();
                var h2 = hsl.h;
                var result = [this];
                var increment = 360 / n2;
                for (var i2 = 1; i2 < n2; i2++) {
                    result.push(new TinyColor2({h: (h2 + i2 * increment) % 360, s: hsl.s, l: hsl.l}));
                }
                return result;
            };
            TinyColor2.prototype.equals = function (color) {
                return this.toRgbString() === new TinyColor2(color).toRgbString();
            };
            return TinyColor2;
        }()
    );
    var hueStep = 2;
    var saturationStep = 0.16;
    var saturationStep2 = 0.05;
    var brightnessStep1 = 0.05;
    var brightnessStep2 = 0.15;
    var lightColorCount = 5;
    var darkColorCount = 4;
    var darkColorMap = [{
        index: 7,
        opacity: 0.15
    }, {
        index: 6,
        opacity: 0.25
    }, {
        index: 5,
        opacity: 0.3
    }, {
        index: 5,
        opacity: 0.45
    }, {
        index: 5,
        opacity: 0.65
    }, {
        index: 5,
        opacity: 0.85
    }, {
        index: 4,
        opacity: 0.9
    }, {
        index: 3,
        opacity: 0.95
    }, {
        index: 2,
        opacity: 0.97
    }, {
        index: 1,
        opacity: 0.98
    }];

    function toHsv(_ref) {
        var r2 = _ref.r, g2 = _ref.g, b2 = _ref.b;
        var hsv = rgbToHsv(r2, g2, b2);
        return {
            h: hsv.h * 360,
            s: hsv.s,
            v: hsv.v
        };
    }

    function toHex(_ref2) {
        var r2 = _ref2.r, g2 = _ref2.g, b2 = _ref2.b;
        return "#".concat(rgbToHex(r2, g2, b2, false));
    }

    function mix(rgb1, rgb2, amount) {
        var p2 = amount / 100;
        var rgb = {
            r: (rgb2.r - rgb1.r) * p2 + rgb1.r,
            g: (rgb2.g - rgb1.g) * p2 + rgb1.g,
            b: (rgb2.b - rgb1.b) * p2 + rgb1.b
        };
        return rgb;
    }

    function getHue(hsv, i2, light) {
        var hue;
        if (Math.round(hsv.h) >= 60 && Math.round(hsv.h) <= 240) {
            hue = light ? Math.round(hsv.h) - hueStep * i2 : Math.round(hsv.h) + hueStep * i2;
        } else {
            hue = light ? Math.round(hsv.h) + hueStep * i2 : Math.round(hsv.h) - hueStep * i2;
        }
        if (hue < 0) {
            hue += 360;
        } else if (hue >= 360) {
            hue -= 360;
        }
        return hue;
    }

    function getSaturation(hsv, i2, light) {
        if (hsv.h === 0 && hsv.s === 0) {
            return hsv.s;
        }
        var saturation;
        if (light) {
            saturation = hsv.s - saturationStep * i2;
        } else if (i2 === darkColorCount) {
            saturation = hsv.s + saturationStep;
        } else {
            saturation = hsv.s + saturationStep2 * i2;
        }
        if (saturation > 1) {
            saturation = 1;
        }
        if (light && i2 === lightColorCount && saturation > 0.1) {
            saturation = 0.1;
        }
        if (saturation < 0.06) {
            saturation = 0.06;
        }
        return Number(saturation.toFixed(2));
    }

    function getValue(hsv, i2, light) {
        var value;
        if (light) {
            value = hsv.v + brightnessStep1 * i2;
        } else {
            value = hsv.v - brightnessStep2 * i2;
        }
        if (value > 1) {
            value = 1;
        }
        return Number(value.toFixed(2));
    }

    function generate$1(color) {
        var opts = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
        var patterns = [];
        var pColor = inputToRGB(color);
        for (var i2 = lightColorCount; i2 > 0; i2 -= 1) {
            var hsv = toHsv(pColor);
            var colorString = toHex(inputToRGB({
                h: getHue(hsv, i2, true),
                s: getSaturation(hsv, i2, true),
                v: getValue(hsv, i2, true)
            }));
            patterns.push(colorString);
        }
        patterns.push(toHex(pColor));
        for (var _i = 1; _i <= darkColorCount; _i += 1) {
            var _hsv = toHsv(pColor);
            var _colorString = toHex(inputToRGB({
                h: getHue(_hsv, _i),
                s: getSaturation(_hsv, _i),
                v: getValue(_hsv, _i)
            }));
            patterns.push(_colorString);
        }
        if (opts.theme === "dark") {
            return darkColorMap.map(function (_ref3) {
                var index2 = _ref3.index, opacity = _ref3.opacity;
                var darkColorString = toHex(mix(inputToRGB(opts.backgroundColor || "#141414"), inputToRGB(patterns[index2]), opacity * 100));
                return darkColorString;
            });
        }
        return patterns;
    }

    var presetPrimaryColors = {
        red: "#F5222D",
        volcano: "#FA541C",
        orange: "#FA8C16",
        gold: "#FAAD14",
        yellow: "#FADB14",
        lime: "#A0D911",
        green: "#52C41A",
        cyan: "#13C2C2",
        blue: "#1890FF",
        geekblue: "#2F54EB",
        purple: "#722ED1",
        magenta: "#EB2F96",
        grey: "#666666"
    };
    var presetPalettes = {};
    var presetDarkPalettes = {};
    Object.keys(presetPrimaryColors).forEach(function (key2) {
        presetPalettes[key2] = generate$1(presetPrimaryColors[key2]);
        presetPalettes[key2].primary = presetPalettes[key2][5];
        presetDarkPalettes[key2] = generate$1(presetPrimaryColors[key2], {
            theme: "dark",
            backgroundColor: "#141414"
        });
        presetDarkPalettes[key2].primary = presetDarkPalettes[key2][5];
    });
    var containers = [];
    var styleElements = [];
    var usage = "insert-css: You need to provide a CSS string. Usage: insertCss(cssString[, options]).";

    function createStyleElement() {
        var styleElement = document.createElement("style");
        styleElement.setAttribute("type", "text/css");
        return styleElement;
    }

    function insertCss(css, options) {
        options = options || {};
        if (css === void 0) {
            throw new Error(usage);
        }
        var position = options.prepend === true ? "prepend" : "append";
        var container = options.container !== void 0 ? options.container : document.querySelector("head");
        var containerId = containers.indexOf(container);
        if (containerId === -1) {
            containerId = containers.push(container) - 1;
            styleElements[containerId] = {};
        }
        var styleElement;
        if (styleElements[containerId] !== void 0 && styleElements[containerId][position] !== void 0) {
            styleElement = styleElements[containerId][position];
        } else {
            styleElement = styleElements[containerId][position] = createStyleElement();
            if (position === "prepend") {
                container.insertBefore(styleElement, container.childNodes[0]);
            } else {
                container.appendChild(styleElement);
            }
        }
        if (css.charCodeAt(0) === 65279) {
            css = css.substr(1, css.length);
        }
        if (styleElement.styleSheet) {
            styleElement.styleSheet.cssText += css;
        } else {
            styleElement.textContent += css;
        }
        return styleElement;
    }

    function _objectSpread$c(target) {
        for (var i2 = 1; i2 < arguments.length; i2++) {
            var source = arguments[i2] != null ? Object(arguments[i2]) : {};
            var ownKeys2 = Object.keys(source);
            if (typeof Object.getOwnPropertySymbols === "function") {
                ownKeys2 = ownKeys2.concat(Object.getOwnPropertySymbols(source).filter(function (sym) {
                    return Object.getOwnPropertyDescriptor(source, sym).enumerable;
                }));
            }
            ownKeys2.forEach(function (key2) {
                _defineProperty$c(target, key2, source[key2]);
            });
        }
        return target;
    }

    function _defineProperty$c(obj, key2, value) {
        if (key2 in obj) {
            Object.defineProperty(obj, key2, {value, enumerable: true, configurable: true, writable: true});
        } else {
            obj[key2] = value;
        }
        return obj;
    }

    function warning(valid, message2) {
    }

    function isIconDefinition(target) {
        return typeof target === "object" && typeof target.name === "string" && typeof target.theme === "string" && (typeof target.icon === "object" || typeof target.icon === "function");
    }

    function generate(node, key2, rootProps) {
        if (!rootProps) {
            return h$1(node.tag, _objectSpread$c({
                key: key2
            }, node.attrs), (node.children || []).map(function (child, index2) {
                return generate(child, "".concat(key2, "-").concat(node.tag, "-").concat(index2));
            }));
        }
        return h$1(node.tag, _objectSpread$c({
            key: key2
        }, rootProps, node.attrs), (node.children || []).map(function (child, index2) {
            return generate(child, "".concat(key2, "-").concat(node.tag, "-").concat(index2));
        }));
    }

    function getSecondaryColor(primaryColor) {
        return generate$1(primaryColor)[0];
    }

    function normalizeTwoToneColors(twoToneColor) {
        if (!twoToneColor) {
            return [];
        }
        return Array.isArray(twoToneColor) ? twoToneColor : [twoToneColor];
    }

    var iconStyles = "\n.anticon {\n  display: inline-block;\n  color: inherit;\n  font-style: normal;\n  line-height: 0;\n  text-align: center;\n  text-transform: none;\n  vertical-align: -0.125em;\n  text-rendering: optimizeLegibility;\n  -webkit-font-smoothing: antialiased;\n  -moz-osx-font-smoothing: grayscale;\n}\n\n.anticon > * {\n  line-height: 1;\n}\n\n.anticon svg {\n  display: inline-block;\n}\n\n.anticon::before {\n  display: none;\n}\n\n.anticon .anticon-icon {\n  display: block;\n}\n\n.anticon[tabindex] {\n  cursor: pointer;\n}\n\n.anticon-spin::before,\n.anticon-spin {\n  display: inline-block;\n  -webkit-animation: loadingCircle 1s infinite linear;\n  animation: loadingCircle 1s infinite linear;\n}\n\n@-webkit-keyframes loadingCircle {\n  100% {\n    -webkit-transform: rotate(360deg);\n    transform: rotate(360deg);\n  }\n}\n\n@keyframes loadingCircle {\n  100% {\n    -webkit-transform: rotate(360deg);\n    transform: rotate(360deg);\n  }\n}\n";
    var cssInjectedFlag = false;
    var useInsertStyles = function useInsertStyles2() {
        var styleStr = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : iconStyles;
        nextTick(function () {
            if (!cssInjectedFlag) {
                if (typeof window !== "undefined" && window.document && window.document.documentElement) {
                    insertCss(styleStr, {
                        prepend: true
                    });
                }
                cssInjectedFlag = true;
            }
        });
    };
    var _excluded$1 = ["icon", "primaryColor", "secondaryColor"];

    function _objectWithoutProperties$1(source, excluded) {
        if (source == null)
            return {};
        var target = _objectWithoutPropertiesLoose$1(source, excluded);
        var key2, i2;
        if (Object.getOwnPropertySymbols) {
            var sourceSymbolKeys = Object.getOwnPropertySymbols(source);
            for (i2 = 0; i2 < sourceSymbolKeys.length; i2++) {
                key2 = sourceSymbolKeys[i2];
                if (excluded.indexOf(key2) >= 0)
                    continue;
                if (!Object.prototype.propertyIsEnumerable.call(source, key2))
                    continue;
                target[key2] = source[key2];
            }
        }
        return target;
    }

    function _objectWithoutPropertiesLoose$1(source, excluded) {
        if (source == null)
            return {};
        var target = {};
        var sourceKeys = Object.keys(source);
        var key2, i2;
        for (i2 = 0; i2 < sourceKeys.length; i2++) {
            key2 = sourceKeys[i2];
            if (excluded.indexOf(key2) >= 0)
                continue;
            target[key2] = source[key2];
        }
        return target;
    }

    function _objectSpread$b(target) {
        for (var i2 = 1; i2 < arguments.length; i2++) {
            var source = arguments[i2] != null ? Object(arguments[i2]) : {};
            var ownKeys2 = Object.keys(source);
            if (typeof Object.getOwnPropertySymbols === "function") {
                ownKeys2 = ownKeys2.concat(Object.getOwnPropertySymbols(source).filter(function (sym) {
                    return Object.getOwnPropertyDescriptor(source, sym).enumerable;
                }));
            }
            ownKeys2.forEach(function (key2) {
                _defineProperty$b(target, key2, source[key2]);
            });
        }
        return target;
    }

    function _defineProperty$b(obj, key2, value) {
        if (key2 in obj) {
            Object.defineProperty(obj, key2, {value, enumerable: true, configurable: true, writable: true});
        } else {
            obj[key2] = value;
        }
        return obj;
    }

    var twoToneColorPalette = {
        primaryColor: "#333",
        secondaryColor: "#E6E6E6",
        calculated: false
    };

    function setTwoToneColors(_ref) {
        var primaryColor = _ref.primaryColor, secondaryColor = _ref.secondaryColor;
        twoToneColorPalette.primaryColor = primaryColor;
        twoToneColorPalette.secondaryColor = secondaryColor || getSecondaryColor(primaryColor);
        twoToneColorPalette.calculated = !!secondaryColor;
    }

    function getTwoToneColors() {
        return _objectSpread$b({}, twoToneColorPalette);
    }

    var IconBase = function IconBase2(props, context) {
        var _props$context$attrs = _objectSpread$b({}, props, context.attrs), icon = _props$context$attrs.icon,
            primaryColor = _props$context$attrs.primaryColor, secondaryColor = _props$context$attrs.secondaryColor,
            restProps = _objectWithoutProperties$1(_props$context$attrs, _excluded$1);
        var colors = twoToneColorPalette;
        if (primaryColor) {
            colors = {
                primaryColor,
                secondaryColor: secondaryColor || getSecondaryColor(primaryColor)
            };
        }
        useInsertStyles();
        warning(isIconDefinition(icon));
        if (!isIconDefinition(icon)) {
            return null;
        }
        var target = icon;
        if (target && typeof target.icon === "function") {
            target = _objectSpread$b({}, target, {
                icon: target.icon(colors.primaryColor, colors.secondaryColor)
            });
        }
        return generate(target.icon, "svg-".concat(target.name), _objectSpread$b({}, restProps, {
            "data-icon": target.name,
            width: "1em",
            height: "1em",
            fill: "currentColor",
            "aria-hidden": "true"
        }));
    };
    IconBase.props = {
        icon: Object,
        primaryColor: String,
        secondaryColor: String,
        focusable: String
    };
    IconBase.inheritAttrs = false;
    IconBase.displayName = "IconBase";
    IconBase.getTwoToneColors = getTwoToneColors;
    IconBase.setTwoToneColors = setTwoToneColors;
    const VueIcon = IconBase;

    function _slicedToArray$1(arr, i2) {
        return _arrayWithHoles$1(arr) || _iterableToArrayLimit$1(arr, i2) || _unsupportedIterableToArray$1(arr, i2) || _nonIterableRest$1();
    }

    function _nonIterableRest$1() {
        throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
    }

    function _unsupportedIterableToArray$1(o2, minLen) {
        if (!o2)
            return;
        if (typeof o2 === "string")
            return _arrayLikeToArray$1(o2, minLen);
        var n2 = Object.prototype.toString.call(o2).slice(8, -1);
        if (n2 === "Object" && o2.constructor)
            n2 = o2.constructor.name;
        if (n2 === "Map" || n2 === "Set")
            return Array.from(o2);
        if (n2 === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n2))
            return _arrayLikeToArray$1(o2, minLen);
    }

    function _arrayLikeToArray$1(arr, len) {
        if (len == null || len > arr.length)
            len = arr.length;
        for (var i2 = 0, arr2 = new Array(len); i2 < len; i2++) {
            arr2[i2] = arr[i2];
        }
        return arr2;
    }

    function _iterableToArrayLimit$1(arr, i2) {
        var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"];
        if (_i == null)
            return;
        var _arr = [];
        var _n = true;
        var _d = false;
        var _s, _e;
        try {
            for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) {
                _arr.push(_s.value);
                if (i2 && _arr.length === i2)
                    break;
            }
        } catch (err) {
            _d = true;
            _e = err;
        } finally {
            try {
                if (!_n && _i["return"] != null)
                    _i["return"]();
            } finally {
                if (_d)
                    throw _e;
            }
        }
        return _arr;
    }

    function _arrayWithHoles$1(arr) {
        if (Array.isArray(arr))
            return arr;
    }

    function setTwoToneColor(twoToneColor) {
        var _normalizeTwoToneColo = normalizeTwoToneColors(twoToneColor),
            _normalizeTwoToneColo2 = _slicedToArray$1(_normalizeTwoToneColo, 2),
            primaryColor = _normalizeTwoToneColo2[0], secondaryColor = _normalizeTwoToneColo2[1];
        return VueIcon.setTwoToneColors({
            primaryColor,
            secondaryColor
        });
    }

    function getTwoToneColor() {
        var colors = VueIcon.getTwoToneColors();
        if (!colors.calculated) {
            return colors.primaryColor;
        }
        return [colors.primaryColor, colors.secondaryColor];
    }

    var _excluded = ["class", "icon", "spin", "rotate", "tabindex", "twoToneColor", "onClick"];

    function _slicedToArray(arr, i2) {
        return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i2) || _unsupportedIterableToArray(arr, i2) || _nonIterableRest();
    }

    function _nonIterableRest() {
        throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
    }

    function _unsupportedIterableToArray(o2, minLen) {
        if (!o2)
            return;
        if (typeof o2 === "string")
            return _arrayLikeToArray(o2, minLen);
        var n2 = Object.prototype.toString.call(o2).slice(8, -1);
        if (n2 === "Object" && o2.constructor)
            n2 = o2.constructor.name;
        if (n2 === "Map" || n2 === "Set")
            return Array.from(o2);
        if (n2 === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n2))
            return _arrayLikeToArray(o2, minLen);
    }

    function _arrayLikeToArray(arr, len) {
        if (len == null || len > arr.length)
            len = arr.length;
        for (var i2 = 0, arr2 = new Array(len); i2 < len; i2++) {
            arr2[i2] = arr[i2];
        }
        return arr2;
    }

    function _iterableToArrayLimit(arr, i2) {
        var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"];
        if (_i == null)
            return;
        var _arr = [];
        var _n = true;
        var _d = false;
        var _s, _e;
        try {
            for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) {
                _arr.push(_s.value);
                if (i2 && _arr.length === i2)
                    break;
            }
        } catch (err) {
            _d = true;
            _e = err;
        } finally {
            try {
                if (!_n && _i["return"] != null)
                    _i["return"]();
            } finally {
                if (_d)
                    throw _e;
            }
        }
        return _arr;
    }

    function _arrayWithHoles(arr) {
        if (Array.isArray(arr))
            return arr;
    }

    function _objectSpread$a(target) {
        for (var i2 = 1; i2 < arguments.length; i2++) {
            var source = arguments[i2] != null ? Object(arguments[i2]) : {};
            var ownKeys2 = Object.keys(source);
            if (typeof Object.getOwnPropertySymbols === "function") {
                ownKeys2 = ownKeys2.concat(Object.getOwnPropertySymbols(source).filter(function (sym) {
                    return Object.getOwnPropertyDescriptor(source, sym).enumerable;
                }));
            }
            ownKeys2.forEach(function (key2) {
                _defineProperty$a(target, key2, source[key2]);
            });
        }
        return target;
    }

    function _defineProperty$a(obj, key2, value) {
        if (key2 in obj) {
            Object.defineProperty(obj, key2, {value, enumerable: true, configurable: true, writable: true});
        } else {
            obj[key2] = value;
        }
        return obj;
    }

    function _objectWithoutProperties(source, excluded) {
        if (source == null)
            return {};
        var target = _objectWithoutPropertiesLoose(source, excluded);
        var key2, i2;
        if (Object.getOwnPropertySymbols) {
            var sourceSymbolKeys = Object.getOwnPropertySymbols(source);
            for (i2 = 0; i2 < sourceSymbolKeys.length; i2++) {
                key2 = sourceSymbolKeys[i2];
                if (excluded.indexOf(key2) >= 0)
                    continue;
                if (!Object.prototype.propertyIsEnumerable.call(source, key2))
                    continue;
                target[key2] = source[key2];
            }
        }
        return target;
    }

    function _objectWithoutPropertiesLoose(source, excluded) {
        if (source == null)
            return {};
        var target = {};
        var sourceKeys = Object.keys(source);
        var key2, i2;
        for (i2 = 0; i2 < sourceKeys.length; i2++) {
            key2 = sourceKeys[i2];
            if (excluded.indexOf(key2) >= 0)
                continue;
            target[key2] = source[key2];
        }
        return target;
    }

    setTwoToneColor("#1890ff");
    var Icon = function Icon2(props, context) {
        var _classObj;
        var _props$context$attrs = _objectSpread$a({}, props, context.attrs), cls = _props$context$attrs["class"],
            icon = _props$context$attrs.icon, spin = _props$context$attrs.spin, rotate = _props$context$attrs.rotate,
            tabindex = _props$context$attrs.tabindex, twoToneColor = _props$context$attrs.twoToneColor,
            onClick = _props$context$attrs.onClick,
            restProps = _objectWithoutProperties(_props$context$attrs, _excluded);
        var classObj = (_classObj = {
            anticon: true
        }, _defineProperty$a(_classObj, "anticon-".concat(icon.name), Boolean(icon.name)), _defineProperty$a(_classObj, cls, cls), _classObj);
        var svgClassString = spin === "" || !!spin || icon.name === "loading" ? "anticon-spin" : "";
        var iconTabIndex = tabindex;
        if (iconTabIndex === void 0 && onClick) {
            iconTabIndex = -1;
            restProps.tabindex = iconTabIndex;
        }
        var svgStyle = rotate ? {
            msTransform: "rotate(".concat(rotate, "deg)"),
            transform: "rotate(".concat(rotate, "deg)")
        } : void 0;
        var _normalizeTwoToneColo = normalizeTwoToneColors(twoToneColor),
            _normalizeTwoToneColo2 = _slicedToArray(_normalizeTwoToneColo, 2), primaryColor = _normalizeTwoToneColo2[0],
            secondaryColor = _normalizeTwoToneColo2[1];
        return createVNode("span", _objectSpread$a({
            "role": "img",
            "aria-label": icon.name
        }, restProps, {
            "onClick": onClick,
            "class": classObj
        }), [createVNode(VueIcon, {
            "class": svgClassString,
            "icon": icon,
            "primaryColor": primaryColor,
            "secondaryColor": secondaryColor,
            "style": svgStyle
        }, null)]);
    };
    Icon.props = {
        spin: Boolean,
        rotate: Number,
        icon: Object,
        twoToneColor: String
    };
    Icon.displayName = "AntdIcon";
    Icon.inheritAttrs = false;
    Icon.getTwoToneColor = getTwoToneColor;
    Icon.setTwoToneColor = setTwoToneColor;
    const AntdIcon = Icon;

    function _objectSpread$9(target) {
        for (var i2 = 1; i2 < arguments.length; i2++) {
            var source = arguments[i2] != null ? Object(arguments[i2]) : {};
            var ownKeys2 = Object.keys(source);
            if (typeof Object.getOwnPropertySymbols === "function") {
                ownKeys2 = ownKeys2.concat(Object.getOwnPropertySymbols(source).filter(function (sym) {
                    return Object.getOwnPropertyDescriptor(source, sym).enumerable;
                }));
            }
            ownKeys2.forEach(function (key2) {
                _defineProperty$9(target, key2, source[key2]);
            });
        }
        return target;
    }

    function _defineProperty$9(obj, key2, value) {
        if (key2 in obj) {
            Object.defineProperty(obj, key2, {value, enumerable: true, configurable: true, writable: true});
        } else {
            obj[key2] = value;
        }
        return obj;
    }

    var LoadingOutlined = function LoadingOutlined2(props, context) {
        var p2 = _objectSpread$9({}, props, context.attrs);
        return createVNode(AntdIcon, _objectSpread$9({}, p2, {
            "icon": LoadingOutlinedSvg
        }), null);
    };
    LoadingOutlined.displayName = "LoadingOutlined";
    LoadingOutlined.inheritAttrs = false;
    const LoadingOutlined$1 = LoadingOutlined;
    var ExclamationCircleFilled$2 = {
        "icon": {
            "tag": "svg",
            "attrs": {"viewBox": "64 64 896 896", "focusable": "false"},
            "children": [{
                "tag": "path",
                "attrs": {"d": "M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm-32 232c0-4.4 3.6-8 8-8h48c4.4 0 8 3.6 8 8v272c0 4.4-3.6 8-8 8h-48c-4.4 0-8-3.6-8-8V296zm32 440a48.01 48.01 0 010-96 48.01 48.01 0 010 96z"}
            }]
        }, "name": "exclamation-circle", "theme": "filled"
    };
    const ExclamationCircleFilledSvg = ExclamationCircleFilled$2;

    function _objectSpread$8(target) {
        for (var i2 = 1; i2 < arguments.length; i2++) {
            var source = arguments[i2] != null ? Object(arguments[i2]) : {};
            var ownKeys2 = Object.keys(source);
            if (typeof Object.getOwnPropertySymbols === "function") {
                ownKeys2 = ownKeys2.concat(Object.getOwnPropertySymbols(source).filter(function (sym) {
                    return Object.getOwnPropertyDescriptor(source, sym).enumerable;
                }));
            }
            ownKeys2.forEach(function (key2) {
                _defineProperty$8(target, key2, source[key2]);
            });
        }
        return target;
    }

    function _defineProperty$8(obj, key2, value) {
        if (key2 in obj) {
            Object.defineProperty(obj, key2, {value, enumerable: true, configurable: true, writable: true});
        } else {
            obj[key2] = value;
        }
        return obj;
    }

    var ExclamationCircleFilled = function ExclamationCircleFilled2(props, context) {
        var p2 = _objectSpread$8({}, props, context.attrs);
        return createVNode(AntdIcon, _objectSpread$8({}, p2, {
            "icon": ExclamationCircleFilledSvg
        }), null);
    };
    ExclamationCircleFilled.displayName = "ExclamationCircleFilled";
    ExclamationCircleFilled.inheritAttrs = false;
    const ExclamationCircleFilled$1 = ExclamationCircleFilled;
    var CloseCircleFilled$2 = {
        "icon": {
            "tag": "svg",
            "attrs": {"viewBox": "64 64 896 896", "focusable": "false"},
            "children": [{
                "tag": "path",
                "attrs": {"d": "M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm165.4 618.2l-66-.3L512 563.4l-99.3 118.4-66.1.3c-4.4 0-8-3.5-8-8 0-1.9.7-3.7 1.9-5.2l130.1-155L340.5 359a8.32 8.32 0 01-1.9-5.2c0-4.4 3.6-8 8-8l66.1.3L512 464.6l99.3-118.4 66-.3c4.4 0 8 3.5 8 8 0 1.9-.7 3.7-1.9 5.2L553.5 514l130 155c1.2 1.5 1.9 3.3 1.9 5.2 0 4.4-3.6 8-8 8z"}
            }]
        }, "name": "close-circle", "theme": "filled"
    };
    const CloseCircleFilledSvg = CloseCircleFilled$2;

    function _objectSpread$7(target) {
        for (var i2 = 1; i2 < arguments.length; i2++) {
            var source = arguments[i2] != null ? Object(arguments[i2]) : {};
            var ownKeys2 = Object.keys(source);
            if (typeof Object.getOwnPropertySymbols === "function") {
                ownKeys2 = ownKeys2.concat(Object.getOwnPropertySymbols(source).filter(function (sym) {
                    return Object.getOwnPropertyDescriptor(source, sym).enumerable;
                }));
            }
            ownKeys2.forEach(function (key2) {
                _defineProperty$7(target, key2, source[key2]);
            });
        }
        return target;
    }

    function _defineProperty$7(obj, key2, value) {
        if (key2 in obj) {
            Object.defineProperty(obj, key2, {value, enumerable: true, configurable: true, writable: true});
        } else {
            obj[key2] = value;
        }
        return obj;
    }

    var CloseCircleFilled = function CloseCircleFilled2(props, context) {
        var p2 = _objectSpread$7({}, props, context.attrs);
        return createVNode(AntdIcon, _objectSpread$7({}, p2, {
            "icon": CloseCircleFilledSvg
        }), null);
    };
    CloseCircleFilled.displayName = "CloseCircleFilled";
    CloseCircleFilled.inheritAttrs = false;
    const CloseCircleFilled$1 = CloseCircleFilled;
    var CheckCircleFilled$2 = {
        "icon": {
            "tag": "svg",
            "attrs": {"viewBox": "64 64 896 896", "focusable": "false"},
            "children": [{
                "tag": "path",
                "attrs": {"d": "M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm193.5 301.7l-210.6 292a31.8 31.8 0 01-51.7 0L318.5 484.9c-3.8-5.3 0-12.7 6.5-12.7h46.9c10.2 0 19.9 4.9 25.9 13.3l71.2 98.8 157.2-218c6-8.3 15.6-13.3 25.9-13.3H699c6.5 0 10.3 7.4 6.5 12.7z"}
            }]
        }, "name": "check-circle", "theme": "filled"
    };
    const CheckCircleFilledSvg = CheckCircleFilled$2;

    function _objectSpread$6(target) {
        for (var i2 = 1; i2 < arguments.length; i2++) {
            var source = arguments[i2] != null ? Object(arguments[i2]) : {};
            var ownKeys2 = Object.keys(source);
            if (typeof Object.getOwnPropertySymbols === "function") {
                ownKeys2 = ownKeys2.concat(Object.getOwnPropertySymbols(source).filter(function (sym) {
                    return Object.getOwnPropertyDescriptor(source, sym).enumerable;
                }));
            }
            ownKeys2.forEach(function (key2) {
                _defineProperty$6(target, key2, source[key2]);
            });
        }
        return target;
    }

    function _defineProperty$6(obj, key2, value) {
        if (key2 in obj) {
            Object.defineProperty(obj, key2, {value, enumerable: true, configurable: true, writable: true});
        } else {
            obj[key2] = value;
        }
        return obj;
    }

    var CheckCircleFilled = function CheckCircleFilled2(props, context) {
        var p2 = _objectSpread$6({}, props, context.attrs);
        return createVNode(AntdIcon, _objectSpread$6({}, p2, {
            "icon": CheckCircleFilledSvg
        }), null);
    };
    CheckCircleFilled.displayName = "CheckCircleFilled";
    CheckCircleFilled.inheritAttrs = false;
    const CheckCircleFilled$1 = CheckCircleFilled;
    var InfoCircleFilled$2 = {
        "icon": {
            "tag": "svg",
            "attrs": {"viewBox": "64 64 896 896", "focusable": "false"},
            "children": [{
                "tag": "path",
                "attrs": {"d": "M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm32 664c0 4.4-3.6 8-8 8h-48c-4.4 0-8-3.6-8-8V456c0-4.4 3.6-8 8-8h48c4.4 0 8 3.6 8 8v272zm-32-344a48.01 48.01 0 010-96 48.01 48.01 0 010 96z"}
            }]
        }, "name": "info-circle", "theme": "filled"
    };
    const InfoCircleFilledSvg = InfoCircleFilled$2;

    function _objectSpread$5(target) {
        for (var i2 = 1; i2 < arguments.length; i2++) {
            var source = arguments[i2] != null ? Object(arguments[i2]) : {};
            var ownKeys2 = Object.keys(source);
            if (typeof Object.getOwnPropertySymbols === "function") {
                ownKeys2 = ownKeys2.concat(Object.getOwnPropertySymbols(source).filter(function (sym) {
                    return Object.getOwnPropertyDescriptor(source, sym).enumerable;
                }));
            }
            ownKeys2.forEach(function (key2) {
                _defineProperty$5(target, key2, source[key2]);
            });
        }
        return target;
    }

    function _defineProperty$5(obj, key2, value) {
        if (key2 in obj) {
            Object.defineProperty(obj, key2, {value, enumerable: true, configurable: true, writable: true});
        } else {
            obj[key2] = value;
        }
        return obj;
    }

    var InfoCircleFilled = function InfoCircleFilled2(props, context) {
        var p2 = _objectSpread$5({}, props, context.attrs);
        return createVNode(AntdIcon, _objectSpread$5({}, p2, {
            "icon": InfoCircleFilledSvg
        }), null);
    };
    InfoCircleFilled.displayName = "InfoCircleFilled";
    InfoCircleFilled.inheritAttrs = false;
    const InfoCircleFilled$1 = InfoCircleFilled;
    var defaultDuration$1 = 3;
    var defaultTop$1;
    var messageInstance;
    var key$1 = 1;
    var localPrefixCls = "";
    var transitionName = "move-up";
    var hasTransitionName = false;
    var getContainer$1 = function getContainer() {
        return document.body;
    };
    var maxCount$1;
    var rtl$1 = false;

    function getKeyThenIncreaseKey() {
        return key$1++;
    }

    function setMessageConfig(options) {
        if (options.top !== void 0) {
            defaultTop$1 = options.top;
            messageInstance = null;
        }
        if (options.duration !== void 0) {
            defaultDuration$1 = options.duration;
        }
        if (options.prefixCls !== void 0) {
            localPrefixCls = options.prefixCls;
        }
        if (options.getContainer !== void 0) {
            getContainer$1 = options.getContainer;
            messageInstance = null;
        }
        if (options.transitionName !== void 0) {
            transitionName = options.transitionName;
            messageInstance = null;
            hasTransitionName = true;
        }
        if (options.maxCount !== void 0) {
            maxCount$1 = options.maxCount;
            messageInstance = null;
        }
        if (options.rtl !== void 0) {
            rtl$1 = options.rtl;
        }
    }

    function getMessageInstance(args, callback) {
        if (messageInstance) {
            callback(messageInstance);
            return;
        }
        Notification$1.newInstance({
            appContext: args.appContext,
            prefixCls: args.prefixCls || localPrefixCls,
            rootPrefixCls: args.rootPrefixCls,
            transitionName,
            hasTransitionName,
            style: {
                top: defaultTop$1
            },
            getContainer: getContainer$1 || args.getPopupContainer,
            maxCount: maxCount$1,
            name: "message"
        }, function (instance) {
            if (messageInstance) {
                callback(messageInstance);
                return;
            }
            messageInstance = instance;
            callback(instance);
        });
    }

    var typeToIcon$1 = {
        info: InfoCircleFilled$1,
        success: CheckCircleFilled$1,
        error: CloseCircleFilled$1,
        warning: ExclamationCircleFilled$1,
        loading: LoadingOutlined$1
    };

    function notice$1(args) {
        var duration = args.duration !== void 0 ? args.duration : defaultDuration$1;
        var target = args.key || getKeyThenIncreaseKey();
        var closePromise = new Promise(function (resolve) {
            var callback = function callback2() {
                if (typeof args.onClose === "function") {
                    args.onClose();
                }
                return resolve(true);
            };
            getMessageInstance(args, function (instance) {
                instance.notice({
                    key: target,
                    duration,
                    style: args.style || {},
                    class: args.class,
                    content: function content(_ref) {
                        var _classNames;
                        var prefixCls = _ref.prefixCls;
                        var Icon3 = typeToIcon$1[args.type];
                        var iconNode = Icon3 ? createVNode(Icon3, null, null) : "";
                        var messageClass = classNames("".concat(prefixCls, "-custom-content"), (_classNames = {}, _defineProperty$d(_classNames, "".concat(prefixCls, "-").concat(args.type), args.type), _defineProperty$d(_classNames, "".concat(prefixCls, "-rtl"), rtl$1 === true), _classNames));
                        return createVNode("div", {
                            "class": messageClass
                        }, [typeof args.icon === "function" ? args.icon() : args.icon || iconNode, createVNode("span", null, [typeof args.content === "function" ? args.content() : args.content])]);
                    },
                    onClose: callback,
                    onClick: args.onClick
                });
            });
        });
        var result = function result2() {
            if (messageInstance) {
                messageInstance.removeNotice(target);
            }
        };
        result.then = function (filled, rejected) {
            return closePromise.then(filled, rejected);
        };
        result.promise = closePromise;
        return result;
    }

    function isArgsProps(content) {
        return Object.prototype.toString.call(content) === "[object Object]" && !!content.content;
    }

    var api$1 = {
        open: notice$1,
        config: setMessageConfig,
        destroy: function destroy(messageKey) {
            if (messageInstance) {
                if (messageKey) {
                    var _messageInstance = messageInstance, removeNotice = _messageInstance.removeNotice;
                    removeNotice(messageKey);
                } else {
                    var _messageInstance2 = messageInstance, destroy3 = _messageInstance2.destroy;
                    destroy3();
                    messageInstance = null;
                }
            }
        }
    };

    function attachTypeApi(originalApi, type) {
        originalApi[type] = function (content, duration, onClose) {
            if (isArgsProps(content)) {
                return originalApi.open(_extends(_extends({}, content), {
                    type
                }));
            }
            if (typeof duration === "function") {
                onClose = duration;
                duration = void 0;
            }
            return originalApi.open({
                content,
                duration,
                type,
                onClose
            });
        };
    }

    ["success", "info", "warning", "error", "loading"].forEach(function (type) {
        return attachTypeApi(api$1, type);
    });
    api$1.warn = api$1.warning;
    const message = api$1;
    var regeneratorRuntimeExports = {};
    var regeneratorRuntime$1 = {
        get exports() {
            return regeneratorRuntimeExports;
        },
        set exports(v2) {
            regeneratorRuntimeExports = v2;
        }
    };
    var _typeofExports = {};
    var _typeof = {
        get exports() {
            return _typeofExports;
        },
        set exports(v2) {
            _typeofExports = v2;
        }
    };
    (function (module) {
        function _typeof2(obj) {
            "@babel/helpers - typeof";
            return module.exports = _typeof2 = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj2) {
                return typeof obj2;
            } : function (obj2) {
                return obj2 && "function" == typeof Symbol && obj2.constructor === Symbol && obj2 !== Symbol.prototype ? "symbol" : typeof obj2;
            }, module.exports.__esModule = true, module.exports["default"] = module.exports, _typeof2(obj);
        }

        module.exports = _typeof2, module.exports.__esModule = true, module.exports["default"] = module.exports;
    })(_typeof);
    (function (module) {
        var _typeof2 = _typeofExports["default"];

        function _regeneratorRuntime() {
            module.exports = _regeneratorRuntime = function _regeneratorRuntime2() {
                return exports;
            }, module.exports.__esModule = true, module.exports["default"] = module.exports;
            var exports = {}, Op = Object.prototype, hasOwn2 = Op.hasOwnProperty,
                defineProperty = Object.defineProperty || function (obj, key2, desc) {
                    obj[key2] = desc.value;
                }, $Symbol = "function" == typeof Symbol ? Symbol : {},
                iteratorSymbol = $Symbol.iterator || "@@iterator",
                asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator",
                toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag";

            function define(obj, key2, value) {
                return Object.defineProperty(obj, key2, {
                    value,
                    enumerable: true,
                    configurable: true,
                    writable: true
                }), obj[key2];
            }

            try {
                define({}, "");
            } catch (err) {
                define = function define2(obj, key2, value) {
                    return obj[key2] = value;
                };
            }

            function wrap(innerFn, outerFn, self2, tryLocsList) {
                var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator,
                    generator = Object.create(protoGenerator.prototype), context = new Context(tryLocsList || []);
                return defineProperty(generator, "_invoke", {
                    value: makeInvokeMethod(innerFn, self2, context)
                }), generator;
            }

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

            exports.wrap = wrap;
            var ContinueSentinel = {};

            function Generator() {
            }

            function GeneratorFunction() {
            }

            function GeneratorFunctionPrototype() {
            }

            var IteratorPrototype = {};
            define(IteratorPrototype, iteratorSymbol, function () {
                return this;
            });
            var getProto2 = Object.getPrototypeOf,
                NativeIteratorPrototype = getProto2 && getProto2(getProto2(values([])));
            NativeIteratorPrototype && NativeIteratorPrototype !== Op && hasOwn2.call(NativeIteratorPrototype, iteratorSymbol) && (IteratorPrototype = NativeIteratorPrototype);
            var Gp = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(IteratorPrototype);

            function defineIteratorMethods(prototype) {
                ["next", "throw", "return"].forEach(function (method) {
                    define(prototype, method, function (arg) {
                        return this._invoke(method, arg);
                    });
                });
            }

            function AsyncIterator(generator, PromiseImpl) {
                function invoke(method, arg, resolve, reject) {
                    var record = tryCatch(generator[method], generator, arg);
                    if ("throw" !== record.type) {
                        var result = record.arg, value = result.value;
                        return value && "object" == _typeof2(value) && hasOwn2.call(value, "__await") ? PromiseImpl.resolve(value.__await).then(function (value2) {
                            invoke("next", value2, resolve, reject);
                        }, function (err) {
                            invoke("throw", err, resolve, reject);
                        }) : PromiseImpl.resolve(value).then(function (unwrapped) {
                            result.value = unwrapped, resolve(result);
                        }, function (error) {
                            return invoke("throw", error, resolve, reject);
                        });
                    }
                    reject(record.arg);
                }

                var previousPromise;
                defineProperty(this, "_invoke", {
                    value: function value(method, arg) {
                        function callInvokeWithMethodAndArg() {
                            return new PromiseImpl(function (resolve, reject) {
                                invoke(method, arg, resolve, reject);
                            });
                        }

                        return previousPromise = previousPromise ? previousPromise.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg();
                    }
                });
            }

            function makeInvokeMethod(innerFn, self2, context) {
                var state = "suspendedStart";
                return function (method, arg) {
                    if ("executing" === state)
                        throw new Error("Generator is already running");
                    if ("completed" === state) {
                        if ("throw" === method)
                            throw arg;
                        return doneResult();
                    }
                    for (context.method = method, context.arg = arg; ;) {
                        var delegate = context.delegate;
                        if (delegate) {
                            var delegateResult = maybeInvokeDelegate(delegate, context);
                            if (delegateResult) {
                                if (delegateResult === ContinueSentinel)
                                    continue;
                                return delegateResult;
                            }
                        }
                        if ("next" === context.method)
                            context.sent = context._sent = context.arg;
                        else if ("throw" === context.method) {
                            if ("suspendedStart" === state)
                                throw state = "completed", context.arg;
                            context.dispatchException(context.arg);
                        } else
                            "return" === context.method && context.abrupt("return", context.arg);
                        state = "executing";
                        var record = tryCatch(innerFn, self2, context);
                        if ("normal" === record.type) {
                            if (state = context.done ? "completed" : "suspendedYield", record.arg === ContinueSentinel)
                                continue;
                            return {
                                value: record.arg,
                                done: context.done
                            };
                        }
                        "throw" === record.type && (state = "completed", context.method = "throw", context.arg = record.arg);
                    }
                };
            }

            function maybeInvokeDelegate(delegate, context) {
                var methodName = context.method, method = delegate.iterator[methodName];
                if (void 0 === method)
                    return context.delegate = null, "throw" === methodName && delegate.iterator["return"] && (context.method = "return", context.arg = void 0, maybeInvokeDelegate(delegate, context), "throw" === context.method) || "return" !== methodName && (context.method = "throw", context.arg = new TypeError("The iterator does not provide a '" + methodName + "' method")), ContinueSentinel;
                var record = tryCatch(method, delegate.iterator, context.arg);
                if ("throw" === record.type)
                    return context.method = "throw", context.arg = record.arg, context.delegate = null, ContinueSentinel;
                var info = record.arg;
                return info ? info.done ? (context[delegate.resultName] = info.value, context.next = delegate.nextLoc, "return" !== context.method && (context.method = "next", context.arg = void 0), context.delegate = null, ContinueSentinel) : info : (context.method = "throw", context.arg = new TypeError("iterator result is not an object"), context.delegate = null, ContinueSentinel);
            }

            function pushTryEntry(locs) {
                var entry = {
                    tryLoc: locs[0]
                };
                1 in locs && (entry.catchLoc = locs[1]), 2 in locs && (entry.finallyLoc = locs[2], entry.afterLoc = locs[3]), this.tryEntries.push(entry);
            }

            function resetTryEntry(entry) {
                var record = entry.completion || {};
                record.type = "normal", delete record.arg, entry.completion = record;
            }

            function Context(tryLocsList) {
                this.tryEntries = [{
                    tryLoc: "root"
                }], tryLocsList.forEach(pushTryEntry, this), this.reset(true);
            }

            function values(iterable) {
                if (iterable) {
                    var iteratorMethod = iterable[iteratorSymbol];
                    if (iteratorMethod)
                        return iteratorMethod.call(iterable);
                    if ("function" == typeof iterable.next)
                        return iterable;
                    if (!isNaN(iterable.length)) {
                        var i2 = -1, next = function next2() {
                            for (; ++i2 < iterable.length;)
                                if (hasOwn2.call(iterable, i2))
                                    return next2.value = iterable[i2], next2.done = false, next2;
                            return next2.value = void 0, next2.done = true, next2;
                        };
                        return next.next = next;
                    }
                }
                return {
                    next: doneResult
                };
            }

            function doneResult() {
                return {
                    value: void 0,
                    done: true
                };
            }

            return GeneratorFunction.prototype = GeneratorFunctionPrototype, defineProperty(Gp, "constructor", {
                value: GeneratorFunctionPrototype,
                configurable: true
            }), defineProperty(GeneratorFunctionPrototype, "constructor", {
                value: GeneratorFunction,
                configurable: true
            }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, toStringTagSymbol, "GeneratorFunction"), exports.isGeneratorFunction = function (genFun) {
                var ctor = "function" == typeof genFun && genFun.constructor;
                return !!ctor && (ctor === GeneratorFunction || "GeneratorFunction" === (ctor.displayName || ctor.name));
            }, exports.mark = function (genFun) {
                return Object.setPrototypeOf ? Object.setPrototypeOf(genFun, GeneratorFunctionPrototype) : (genFun.__proto__ = GeneratorFunctionPrototype, define(genFun, toStringTagSymbol, "GeneratorFunction")), genFun.prototype = Object.create(Gp), genFun;
            }, exports.awrap = function (arg) {
                return {
                    __await: arg
                };
            }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, asyncIteratorSymbol, function () {
                return this;
            }), exports.AsyncIterator = AsyncIterator, exports.async = function (innerFn, outerFn, self2, tryLocsList, PromiseImpl) {
                void 0 === PromiseImpl && (PromiseImpl = Promise);
                var iter = new AsyncIterator(wrap(innerFn, outerFn, self2, tryLocsList), PromiseImpl);
                return exports.isGeneratorFunction(outerFn) ? iter : iter.next().then(function (result) {
                    return result.done ? result.value : iter.next();
                });
            }, defineIteratorMethods(Gp), define(Gp, toStringTagSymbol, "Generator"), define(Gp, iteratorSymbol, function () {
                return this;
            }), define(Gp, "toString", function () {
                return "[object Generator]";
            }), exports.keys = function (val) {
                var object = Object(val), keys = [];
                for (var key2 in object)
                    keys.push(key2);
                return keys.reverse(), function next() {
                    for (; keys.length;) {
                        var key3 = keys.pop();
                        if (key3 in object)
                            return next.value = key3, next.done = false, next;
                    }
                    return next.done = true, next;
                };
            }, exports.values = values, Context.prototype = {
                constructor: Context,
                reset: function reset(skipTempReset) {
                    if (this.prev = 0, this.next = 0, this.sent = this._sent = void 0, this.done = false, this.delegate = null, this.method = "next", this.arg = void 0, this.tryEntries.forEach(resetTryEntry), !skipTempReset)
                        for (var name in this)
                            "t" === name.charAt(0) && hasOwn2.call(this, name) && !isNaN(+name.slice(1)) && (this[name] = void 0);
                },
                stop: function stop() {
                    this.done = true;
                    var rootRecord = this.tryEntries[0].completion;
                    if ("throw" === rootRecord.type)
                        throw rootRecord.arg;
                    return this.rval;
                },
                dispatchException: function dispatchException(exception) {
                    if (this.done)
                        throw exception;
                    var context = this;

                    function handle(loc, caught) {
                        return record.type = "throw", record.arg = exception, context.next = loc, caught && (context.method = "next", context.arg = void 0), !!caught;
                    }

                    for (var i2 = this.tryEntries.length - 1; i2 >= 0; --i2) {
                        var entry = this.tryEntries[i2], record = entry.completion;
                        if ("root" === entry.tryLoc)
                            return handle("end");
                        if (entry.tryLoc <= this.prev) {
                            var hasCatch = hasOwn2.call(entry, "catchLoc"),
                                hasFinally = hasOwn2.call(entry, "finallyLoc");
                            if (hasCatch && hasFinally) {
                                if (this.prev < entry.catchLoc)
                                    return handle(entry.catchLoc, true);
                                if (this.prev < entry.finallyLoc)
                                    return handle(entry.finallyLoc);
                            } else if (hasCatch) {
                                if (this.prev < entry.catchLoc)
                                    return handle(entry.catchLoc, true);
                            } else {
                                if (!hasFinally)
                                    throw new Error("try statement without catch or finally");
                                if (this.prev < entry.finallyLoc)
                                    return handle(entry.finallyLoc);
                            }
                        }
                    }
                },
                abrupt: function abrupt(type, arg) {
                    for (var i2 = this.tryEntries.length - 1; i2 >= 0; --i2) {
                        var entry = this.tryEntries[i2];
                        if (entry.tryLoc <= this.prev && hasOwn2.call(entry, "finallyLoc") && this.prev < entry.finallyLoc) {
                            var finallyEntry = entry;
                            break;
                        }
                    }
                    finallyEntry && ("break" === type || "continue" === type) && finallyEntry.tryLoc <= arg && arg <= finallyEntry.finallyLoc && (finallyEntry = null);
                    var record = finallyEntry ? finallyEntry.completion : {};
                    return record.type = type, record.arg = arg, finallyEntry ? (this.method = "next", this.next = finallyEntry.finallyLoc, ContinueSentinel) : this.complete(record);
                },
                complete: function complete(record, afterLoc) {
                    if ("throw" === record.type)
                        throw record.arg;
                    return "break" === record.type || "continue" === record.type ? this.next = record.arg : "return" === record.type ? (this.rval = this.arg = record.arg, this.method = "return", this.next = "end") : "normal" === record.type && afterLoc && (this.next = afterLoc), ContinueSentinel;
                },
                finish: function finish(finallyLoc) {
                    for (var i2 = this.tryEntries.length - 1; i2 >= 0; --i2) {
                        var entry = this.tryEntries[i2];
                        if (entry.finallyLoc === finallyLoc)
                            return this.complete(entry.completion, entry.afterLoc), resetTryEntry(entry), ContinueSentinel;
                    }
                },
                "catch": function _catch(tryLoc) {
                    for (var i2 = this.tryEntries.length - 1; i2 >= 0; --i2) {
                        var entry = this.tryEntries[i2];
                        if (entry.tryLoc === tryLoc) {
                            var record = entry.completion;
                            if ("throw" === record.type) {
                                var thrown = record.arg;
                                resetTryEntry(entry);
                            }
                            return thrown;
                        }
                    }
                    throw new Error("illegal catch attempt");
                },
                delegateYield: function delegateYield(iterable, resultName, nextLoc) {
                    return this.delegate = {
                        iterator: values(iterable),
                        resultName,
                        nextLoc
                    }, "next" === this.method && (this.arg = void 0), ContinueSentinel;
                }
            }, exports;
        }

        module.exports = _regeneratorRuntime, module.exports.__esModule = true, module.exports["default"] = module.exports;
    })(regeneratorRuntime$1);
    var runtime = regeneratorRuntimeExports();
    try {
        regeneratorRuntime = runtime;
    } catch (accidentalStrictMode) {
        if (typeof globalThis === "object") {
            globalThis.regeneratorRuntime = runtime;
        } else {
            Function("r", "regeneratorRuntime = r")(runtime);
        }
    }
    var CheckCircleOutlined$2 = {
        "icon": {
            "tag": "svg",
            "attrs": {"viewBox": "64 64 896 896", "focusable": "false"},
            "children": [{
                "tag": "path",
                "attrs": {"d": "M699 353h-46.9c-10.2 0-19.9 4.9-25.9 13.3L469 584.3l-71.2-98.8c-6-8.3-15.6-13.3-25.9-13.3H325c-6.5 0-10.3 7.4-6.5 12.7l124.6 172.8a31.8 31.8 0 0051.7 0l210.6-292c3.9-5.3.1-12.7-6.4-12.7z"}
            }, {
                "tag": "path",
                "attrs": {"d": "M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm0 820c-205.4 0-372-166.6-372-372s166.6-372 372-372 372 166.6 372 372-166.6 372-372 372z"}
            }]
        }, "name": "check-circle", "theme": "outlined"
    };
    const CheckCircleOutlinedSvg = CheckCircleOutlined$2;

    function _objectSpread$4(target) {
        for (var i2 = 1; i2 < arguments.length; i2++) {
            var source = arguments[i2] != null ? Object(arguments[i2]) : {};
            var ownKeys2 = Object.keys(source);
            if (typeof Object.getOwnPropertySymbols === "function") {
                ownKeys2 = ownKeys2.concat(Object.getOwnPropertySymbols(source).filter(function (sym) {
                    return Object.getOwnPropertyDescriptor(source, sym).enumerable;
                }));
            }
            ownKeys2.forEach(function (key2) {
                _defineProperty$4(target, key2, source[key2]);
            });
        }
        return target;
    }

    function _defineProperty$4(obj, key2, value) {
        if (key2 in obj) {
            Object.defineProperty(obj, key2, {value, enumerable: true, configurable: true, writable: true});
        } else {
            obj[key2] = value;
        }
        return obj;
    }

    var CheckCircleOutlined = function CheckCircleOutlined2(props, context) {
        var p2 = _objectSpread$4({}, props, context.attrs);
        return createVNode(AntdIcon, _objectSpread$4({}, p2, {
            "icon": CheckCircleOutlinedSvg
        }), null);
    };
    CheckCircleOutlined.displayName = "CheckCircleOutlined";
    CheckCircleOutlined.inheritAttrs = false;
    const CheckCircleOutlined$1 = CheckCircleOutlined;
    var InfoCircleOutlined$2 = {
        "icon": {
            "tag": "svg",
            "attrs": {"viewBox": "64 64 896 896", "focusable": "false"},
            "children": [{
                "tag": "path",
                "attrs": {"d": "M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm0 820c-205.4 0-372-166.6-372-372s166.6-372 372-372 372 166.6 372 372-166.6 372-372 372z"}
            }, {
                "tag": "path",
                "attrs": {"d": "M464 336a48 48 0 1096 0 48 48 0 10-96 0zm72 112h-48c-4.4 0-8 3.6-8 8v272c0 4.4 3.6 8 8 8h48c4.4 0 8-3.6 8-8V456c0-4.4-3.6-8-8-8z"}
            }]
        }, "name": "info-circle", "theme": "outlined"
    };
    const InfoCircleOutlinedSvg = InfoCircleOutlined$2;

    function _objectSpread$3(target) {
        for (var i2 = 1; i2 < arguments.length; i2++) {
            var source = arguments[i2] != null ? Object(arguments[i2]) : {};
            var ownKeys2 = Object.keys(source);
            if (typeof Object.getOwnPropertySymbols === "function") {
                ownKeys2 = ownKeys2.concat(Object.getOwnPropertySymbols(source).filter(function (sym) {
                    return Object.getOwnPropertyDescriptor(source, sym).enumerable;
                }));
            }
            ownKeys2.forEach(function (key2) {
                _defineProperty$3(target, key2, source[key2]);
            });
        }
        return target;
    }

    function _defineProperty$3(obj, key2, value) {
        if (key2 in obj) {
            Object.defineProperty(obj, key2, {value, enumerable: true, configurable: true, writable: true});
        } else {
            obj[key2] = value;
        }
        return obj;
    }

    var InfoCircleOutlined = function InfoCircleOutlined2(props, context) {
        var p2 = _objectSpread$3({}, props, context.attrs);
        return createVNode(AntdIcon, _objectSpread$3({}, p2, {
            "icon": InfoCircleOutlinedSvg
        }), null);
    };
    InfoCircleOutlined.displayName = "InfoCircleOutlined";
    InfoCircleOutlined.inheritAttrs = false;
    const InfoCircleOutlined$1 = InfoCircleOutlined;
    var CloseCircleOutlined$2 = {
        "icon": {
            "tag": "svg",
            "attrs": {"viewBox": "64 64 896 896", "focusable": "false"},
            "children": [{
                "tag": "path",
                "attrs": {"d": "M685.4 354.8c0-4.4-3.6-8-8-8l-66 .3L512 465.6l-99.3-118.4-66.1-.3c-4.4 0-8 3.5-8 8 0 1.9.7 3.7 1.9 5.2l130.1 155L340.5 670a8.32 8.32 0 00-1.9 5.2c0 4.4 3.6 8 8 8l66.1-.3L512 564.4l99.3 118.4 66 .3c4.4 0 8-3.5 8-8 0-1.9-.7-3.7-1.9-5.2L553.5 515l130.1-155c1.2-1.4 1.8-3.3 1.8-5.2z"}
            }, {
                "tag": "path",
                "attrs": {"d": "M512 65C264.6 65 64 265.6 64 513s200.6 448 448 448 448-200.6 448-448S759.4 65 512 65zm0 820c-205.4 0-372-166.6-372-372s166.6-372 372-372 372 166.6 372 372-166.6 372-372 372z"}
            }]
        }, "name": "close-circle", "theme": "outlined"
    };
    const CloseCircleOutlinedSvg = CloseCircleOutlined$2;

    function _objectSpread$2(target) {
        for (var i2 = 1; i2 < arguments.length; i2++) {
            var source = arguments[i2] != null ? Object(arguments[i2]) : {};
            var ownKeys2 = Object.keys(source);
            if (typeof Object.getOwnPropertySymbols === "function") {
                ownKeys2 = ownKeys2.concat(Object.getOwnPropertySymbols(source).filter(function (sym) {
                    return Object.getOwnPropertyDescriptor(source, sym).enumerable;
                }));
            }
            ownKeys2.forEach(function (key2) {
                _defineProperty$2(target, key2, source[key2]);
            });
        }
        return target;
    }

    function _defineProperty$2(obj, key2, value) {
        if (key2 in obj) {
            Object.defineProperty(obj, key2, {value, enumerable: true, configurable: true, writable: true});
        } else {
            obj[key2] = value;
        }
        return obj;
    }

    var CloseCircleOutlined = function CloseCircleOutlined2(props, context) {
        var p2 = _objectSpread$2({}, props, context.attrs);
        return createVNode(AntdIcon, _objectSpread$2({}, p2, {
            "icon": CloseCircleOutlinedSvg
        }), null);
    };
    CloseCircleOutlined.displayName = "CloseCircleOutlined";
    CloseCircleOutlined.inheritAttrs = false;
    const CloseCircleOutlined$1 = CloseCircleOutlined;
    var ExclamationCircleOutlined$2 = {
        "icon": {
            "tag": "svg",
            "attrs": {"viewBox": "64 64 896 896", "focusable": "false"},
            "children": [{
                "tag": "path",
                "attrs": {"d": "M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm0 820c-205.4 0-372-166.6-372-372s166.6-372 372-372 372 166.6 372 372-166.6 372-372 372z"}
            }, {
                "tag": "path",
                "attrs": {"d": "M464 688a48 48 0 1096 0 48 48 0 10-96 0zm24-112h48c4.4 0 8-3.6 8-8V296c0-4.4-3.6-8-8-8h-48c-4.4 0-8 3.6-8 8v272c0 4.4 3.6 8 8 8z"}
            }]
        }, "name": "exclamation-circle", "theme": "outlined"
    };
    const ExclamationCircleOutlinedSvg = ExclamationCircleOutlined$2;

    function _objectSpread$1(target) {
        for (var i2 = 1; i2 < arguments.length; i2++) {
            var source = arguments[i2] != null ? Object(arguments[i2]) : {};
            var ownKeys2 = Object.keys(source);
            if (typeof Object.getOwnPropertySymbols === "function") {
                ownKeys2 = ownKeys2.concat(Object.getOwnPropertySymbols(source).filter(function (sym) {
                    return Object.getOwnPropertyDescriptor(source, sym).enumerable;
                }));
            }
            ownKeys2.forEach(function (key2) {
                _defineProperty$1(target, key2, source[key2]);
            });
        }
        return target;
    }

    function _defineProperty$1(obj, key2, value) {
        if (key2 in obj) {
            Object.defineProperty(obj, key2, {value, enumerable: true, configurable: true, writable: true});
        } else {
            obj[key2] = value;
        }
        return obj;
    }

    var ExclamationCircleOutlined = function ExclamationCircleOutlined2(props, context) {
        var p2 = _objectSpread$1({}, props, context.attrs);
        return createVNode(AntdIcon, _objectSpread$1({}, p2, {
            "icon": ExclamationCircleOutlinedSvg
        }), null);
    };
    ExclamationCircleOutlined.displayName = "ExclamationCircleOutlined";
    ExclamationCircleOutlined.inheritAttrs = false;
    const ExclamationCircleOutlined$1 = ExclamationCircleOutlined;
    var CloseOutlined$2 = {
        "icon": {
            "tag": "svg",
            "attrs": {"viewBox": "64 64 896 896", "focusable": "false"},
            "children": [{
                "tag": "path",
                "attrs": {"d": "M563.8 512l262.5-312.9c4.4-5.2.7-13.1-6.1-13.1h-79.8c-4.7 0-9.2 2.1-12.3 5.7L511.6 449.8 295.1 191.7c-3-3.6-7.5-5.7-12.3-5.7H203c-6.8 0-10.5 7.9-6.1 13.1L459.4 512 196.9 824.9A7.95 7.95 0 00203 838h79.8c4.7 0 9.2-2.1 12.3-5.7l216.5-258.1 216.5 258.1c3 3.6 7.5 5.7 12.3 5.7h79.8c6.8 0 10.5-7.9 6.1-13.1L563.8 512z"}
            }]
        }, "name": "close", "theme": "outlined"
    };
    const CloseOutlinedSvg = CloseOutlined$2;

    function _objectSpread(target) {
        for (var i2 = 1; i2 < arguments.length; i2++) {
            var source = arguments[i2] != null ? Object(arguments[i2]) : {};
            var ownKeys2 = Object.keys(source);
            if (typeof Object.getOwnPropertySymbols === "function") {
                ownKeys2 = ownKeys2.concat(Object.getOwnPropertySymbols(source).filter(function (sym) {
                    return Object.getOwnPropertyDescriptor(source, sym).enumerable;
                }));
            }
            ownKeys2.forEach(function (key2) {
                _defineProperty(target, key2, source[key2]);
            });
        }
        return target;
    }

    function _defineProperty(obj, key2, value) {
        if (key2 in obj) {
            Object.defineProperty(obj, key2, {value, enumerable: true, configurable: true, writable: true});
        } else {
            obj[key2] = value;
        }
        return obj;
    }

    var CloseOutlined = function CloseOutlined2(props, context) {
        var p2 = _objectSpread({}, props, context.attrs);
        return createVNode(AntdIcon, _objectSpread({}, p2, {
            "icon": CloseOutlinedSvg
        }), null);
    };
    CloseOutlined.displayName = "CloseOutlined";
    CloseOutlined.inheritAttrs = false;
    const CloseOutlined$1 = CloseOutlined;
    globalThis && globalThis.__awaiter || function (thisArg, _arguments, P2, generator) {
        function adopt(value) {
            return value instanceof P2 ? value : new P2(function (resolve) {
                resolve(value);
            });
        }

        return new (P2 || (P2 = Promise))(function (resolve, reject) {
            function fulfilled(value) {
                try {
                    step(generator.next(value));
                } catch (e2) {
                    reject(e2);
                }
            }

            function rejected(value) {
                try {
                    step(generator["throw"](value));
                } catch (e2) {
                    reject(e2);
                }
            }

            function step(result) {
                result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
            }

            step((generator = generator.apply(thisArg, _arguments || [])).next());
        });
    };
    var notificationInstance = {};
    var defaultDuration = 4.5;
    var defaultTop = "24px";
    var defaultBottom = "24px";
    var defaultPrefixCls$1 = "";
    var defaultPlacement = "topRight";
    var defaultGetContainer = function defaultGetContainer2() {
        return document.body;
    };
    var defaultCloseIcon = null;
    var rtl = false;
    var maxCount;

    function setNotificationConfig(options) {
        var duration = options.duration, placement = options.placement, bottom = options.bottom, top = options.top,
            getContainer3 = options.getContainer, closeIcon = options.closeIcon, prefixCls = options.prefixCls;
        if (prefixCls !== void 0) {
            defaultPrefixCls$1 = prefixCls;
        }
        if (duration !== void 0) {
            defaultDuration = duration;
        }
        if (placement !== void 0) {
            defaultPlacement = placement;
        }
        if (bottom !== void 0) {
            defaultBottom = typeof bottom === "number" ? "".concat(bottom, "px") : bottom;
        }
        if (top !== void 0) {
            defaultTop = typeof top === "number" ? "".concat(top, "px") : top;
        }
        if (getContainer3 !== void 0) {
            defaultGetContainer = getContainer3;
        }
        if (closeIcon !== void 0) {
            defaultCloseIcon = closeIcon;
        }
        if (options.rtl !== void 0) {
            rtl = options.rtl;
        }
        if (options.maxCount !== void 0) {
            maxCount = options.maxCount;
        }
    }

    function getPlacementStyle(placement) {
        var top = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : defaultTop;
        var bottom = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : defaultBottom;
        var style;
        switch (placement) {
            case "topLeft":
                style = {
                    left: "0px",
                    top,
                    bottom: "auto"
                };
                break;
            case "topRight":
                style = {
                    right: "0px",
                    top,
                    bottom: "auto"
                };
                break;
            case "bottomLeft":
                style = {
                    left: "0px",
                    top: "auto",
                    bottom
                };
                break;
            default:
                style = {
                    right: "0px",
                    top: "auto",
                    bottom
                };
                break;
        }
        return style;
    }

    function getNotificationInstance(_ref, callback) {
        var customizePrefixCls = _ref.prefixCls, _ref$placement = _ref.placement,
            placement = _ref$placement === void 0 ? defaultPlacement : _ref$placement,
            _ref$getContainer = _ref.getContainer,
            getContainer3 = _ref$getContainer === void 0 ? defaultGetContainer : _ref$getContainer, top = _ref.top,
            bottom = _ref.bottom, _ref$closeIcon = _ref.closeIcon,
            _closeIcon = _ref$closeIcon === void 0 ? defaultCloseIcon : _ref$closeIcon, appContext = _ref.appContext;
        var _globalConfig = globalConfig(), getPrefixCls2 = _globalConfig.getPrefixCls;
        var prefixCls = getPrefixCls2("notification", customizePrefixCls || defaultPrefixCls$1);
        var cacheKey = "".concat(prefixCls, "-").concat(placement, "-").concat(rtl);
        var cacheInstance = notificationInstance[cacheKey];
        if (cacheInstance) {
            Promise.resolve(cacheInstance).then(function (instance) {
                callback(instance);
            });
            return;
        }
        var notificationClass = classNames("".concat(prefixCls, "-").concat(placement), _defineProperty$d({}, "".concat(prefixCls, "-rtl"), rtl === true));
        Notification$1.newInstance({
            name: "notification",
            prefixCls: customizePrefixCls || defaultPrefixCls$1,
            class: notificationClass,
            style: getPlacementStyle(placement, top, bottom),
            appContext,
            getContainer: getContainer3,
            closeIcon: function closeIcon(_ref2) {
                var prefixCls2 = _ref2.prefixCls;
                var closeIconToRender = createVNode("span", {
                    "class": "".concat(prefixCls2, "-close-x")
                }, [renderHelper(_closeIcon, {}, createVNode(CloseOutlined$1, {
                    "class": "".concat(prefixCls2, "-close-icon")
                }, null))]);
                return closeIconToRender;
            },
            maxCount,
            hasTransitionName: true
        }, function (notification2) {
            notificationInstance[cacheKey] = notification2;
            callback(notification2);
        });
    }

    var typeToIcon = {
        success: CheckCircleOutlined$1,
        info: InfoCircleOutlined$1,
        error: CloseCircleOutlined$1,
        warning: ExclamationCircleOutlined$1
    };

    function notice(args) {
        var icon = args.icon, type = args.type, description = args.description, message2 = args.message, btn = args.btn;
        var duration = args.duration === void 0 ? defaultDuration : args.duration;
        getNotificationInstance(args, function (notification2) {
            notification2.notice({
                content: function content(_ref3) {
                    var outerPrefixCls = _ref3.prefixCls;
                    var prefixCls = "".concat(outerPrefixCls, "-notice");
                    var iconNode = null;
                    if (icon) {
                        iconNode = function iconNode2() {
                            return createVNode("span", {
                                "class": "".concat(prefixCls, "-icon")
                            }, [renderHelper(icon)]);
                        };
                    } else if (type) {
                        var Icon3 = typeToIcon[type];
                        iconNode = function iconNode2() {
                            return createVNode(Icon3, {
                                "class": "".concat(prefixCls, "-icon ").concat(prefixCls, "-icon-").concat(type)
                            }, null);
                        };
                    }
                    return createVNode("div", {
                        "class": iconNode ? "".concat(prefixCls, "-with-icon") : ""
                    }, [iconNode && iconNode(), createVNode("div", {
                        "class": "".concat(prefixCls, "-message")
                    }, [!description && iconNode ? createVNode("span", {
                        "class": "".concat(prefixCls, "-message-single-line-auto-margin")
                    }, null) : null, renderHelper(message2)]), createVNode("div", {
                        "class": "".concat(prefixCls, "-description")
                    }, [renderHelper(description)]), btn ? createVNode("span", {
                        "class": "".concat(prefixCls, "-btn")
                    }, [renderHelper(btn)]) : null]);
                },
                duration,
                closable: true,
                onClose: args.onClose,
                onClick: args.onClick,
                key: args.key,
                style: args.style || {},
                class: args.class
            });
        });
    }

    var api = {
        open: notice,
        close: function close(key2) {
            Object.keys(notificationInstance).forEach(function (cacheKey) {
                return Promise.resolve(notificationInstance[cacheKey]).then(function (instance) {
                    instance.removeNotice(key2);
                });
            });
        },
        config: setNotificationConfig,
        destroy: function destroy2() {
            Object.keys(notificationInstance).forEach(function (cacheKey) {
                Promise.resolve(notificationInstance[cacheKey]).then(function (instance) {
                    instance.destroy();
                });
                delete notificationInstance[cacheKey];
            });
        }
    };
    var iconTypes = ["success", "info", "warning", "error"];
    iconTypes.forEach(function (type) {
        api[type] = function (args) {
            return api.open(_extends(_extends({}, args), {
                type
            }));
        };
    });
    api.warn = api.warning;
    const notification = api;

    function canUseDom() {
        return !!(typeof window !== "undefined" && window.document && window.document.createElement);
    }

    var MARK_KEY = "vc-util-key";

    function getMark() {
        var _ref = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {}, mark = _ref.mark;
        if (mark) {
            return mark.startsWith("data-") ? mark : "data-".concat(mark);
        }
        return MARK_KEY;
    }

    function getContainer2(option) {
        if (option.attachTo) {
            return option.attachTo;
        }
        var head = document.querySelector("head");
        return head || document.body;
    }

    function injectCSS(css) {
        var option = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
        var _a, _b;
        if (!canUseDom()) {
            return null;
        }
        var styleNode = document.createElement("style");
        if ((_a = option.csp) === null || _a === void 0 ? void 0 : _a.nonce) {
            styleNode.nonce = (_b = option.csp) === null || _b === void 0 ? void 0 : _b.nonce;
        }
        styleNode.innerHTML = css;
        var container = getContainer2(option);
        var firstChild = container.firstChild;
        if (option.prepend && container.prepend) {
            container.prepend(styleNode);
        } else if (option.prepend && firstChild) {
            container.insertBefore(styleNode, firstChild);
        } else {
            container.appendChild(styleNode);
        }
        return styleNode;
    }

    var containerCache = /* @__PURE__ */ new Map();

    function findExistNode(key2) {
        var option = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
        var container = getContainer2(option);
        return Array.from(containerCache.get(container).children).find(function (node) {
            return node.tagName === "STYLE" && node.getAttribute(getMark(option)) === key2;
        });
    }

    function updateCSS(css, key2) {
        var option = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : {};
        var _a, _b, _c;
        var container = getContainer2(option);
        if (!containerCache.has(container)) {
            var placeholderStyle = injectCSS("", option);
            var parentNode = placeholderStyle.parentNode;
            containerCache.set(container, parentNode);
            parentNode.removeChild(placeholderStyle);
        }
        var existNode = findExistNode(key2, option);
        if (existNode) {
            if (((_a = option.csp) === null || _a === void 0 ? void 0 : _a.nonce) && existNode.nonce !== ((_b = option.csp) === null || _b === void 0 ? void 0 : _b.nonce)) {
                existNode.nonce = (_c = option.csp) === null || _c === void 0 ? void 0 : _c.nonce;
            }
            if (existNode.innerHTML !== css) {
                existNode.innerHTML = css;
            }
            return existNode;
        }
        var newNode = injectCSS(css, option);
        newNode.setAttribute(getMark(option), key2);
        return newNode;
    }

    const devWarning = function (valid, component, message2) {
        warningOnce(valid, "[ant-design-vue: ".concat(component, "] ").concat(message2));
    };
    var dynamicStyleMark = "-ant-".concat(Date.now(), "-").concat(Math.random());

    function registerTheme(globalPrefixCls, theme) {
        var variables = {};
        var formatColor = function formatColor2(color, updater) {
            var clone = color.clone();
            clone = (updater === null || updater === void 0 ? void 0 : updater(clone)) || clone;
            return clone.toRgbString();
        };
        var fillColor = function fillColor2(colorVal, type) {
            var baseColor = new TinyColor(colorVal);
            var colorPalettes = generate$1(baseColor.toRgbString());
            variables["".concat(type, "-color")] = formatColor(baseColor);
            variables["".concat(type, "-color-disabled")] = colorPalettes[1];
            variables["".concat(type, "-color-hover")] = colorPalettes[4];
            variables["".concat(type, "-color-active")] = colorPalettes[7];
            variables["".concat(type, "-color-outline")] = baseColor.clone().setAlpha(0.2).toRgbString();
            variables["".concat(type, "-color-deprecated-bg")] = colorPalettes[1];
            variables["".concat(type, "-color-deprecated-border")] = colorPalettes[3];
        };
        if (theme.primaryColor) {
            fillColor(theme.primaryColor, "primary");
            var primaryColor = new TinyColor(theme.primaryColor);
            var primaryColors = generate$1(primaryColor.toRgbString());
            primaryColors.forEach(function (color, index2) {
                variables["primary-".concat(index2 + 1)] = color;
            });
            variables["primary-color-deprecated-l-35"] = formatColor(primaryColor, function (c2) {
                return c2.lighten(35);
            });
            variables["primary-color-deprecated-l-20"] = formatColor(primaryColor, function (c2) {
                return c2.lighten(20);
            });
            variables["primary-color-deprecated-t-20"] = formatColor(primaryColor, function (c2) {
                return c2.tint(20);
            });
            variables["primary-color-deprecated-t-50"] = formatColor(primaryColor, function (c2) {
                return c2.tint(50);
            });
            variables["primary-color-deprecated-f-12"] = formatColor(primaryColor, function (c2) {
                return c2.setAlpha(c2.getAlpha() * 0.12);
            });
            var primaryActiveColor = new TinyColor(primaryColors[0]);
            variables["primary-color-active-deprecated-f-30"] = formatColor(primaryActiveColor, function (c2) {
                return c2.setAlpha(c2.getAlpha() * 0.3);
            });
            variables["primary-color-active-deprecated-d-02"] = formatColor(primaryActiveColor, function (c2) {
                return c2.darken(2);
            });
        }
        if (theme.successColor) {
            fillColor(theme.successColor, "success");
        }
        if (theme.warningColor) {
            fillColor(theme.warningColor, "warning");
        }
        if (theme.errorColor) {
            fillColor(theme.errorColor, "error");
        }
        if (theme.infoColor) {
            fillColor(theme.infoColor, "info");
        }
        var cssList = Object.keys(variables).map(function (key2) {
            return "--".concat(globalPrefixCls, "-").concat(key2, ": ").concat(variables[key2], ";");
        });
        if (canUseDom()) {
            updateCSS("\n  :root {\n    ".concat(cssList.join("\n"), "\n  }\n  "), "".concat(dynamicStyleMark, "-dynamic-theme"));
        } else {
            devWarning(false, "ConfigProvider", "SSR do not support dynamic theme with css variables.");
        }
    }

    var GlobalFormContextKey = Symbol("GlobalFormContextKey");
    var useProvideGlobalForm = function useProvideGlobalForm2(state) {
        provide(GlobalFormContextKey, state);
    };
    var configProviderProps = function configProviderProps2() {
        return {
            getTargetContainer: {
                type: Function
            },
            getPopupContainer: {
                type: Function
            },
            prefixCls: String,
            getPrefixCls: {
                type: Function
            },
            renderEmpty: {
                type: Function
            },
            transformCellText: {
                type: Function
            },
            csp: {
                type: Object,
                default: void 0
            },
            input: {
                type: Object
            },
            autoInsertSpaceInButton: {
                type: Boolean,
                default: void 0
            },
            locale: {
                type: Object,
                default: void 0
            },
            pageHeader: {
                type: Object
            },
            componentSize: {
                type: String
            },
            direction: {
                type: String
            },
            space: {
                type: Object
            },
            virtual: {
                type: Boolean,
                default: void 0
            },
            dropdownMatchSelectWidth: {
                type: [Number, Boolean],
                default: true
            },
            form: {
                type: Object,
                default: void 0
            },
            // internal use
            notUpdateGlobalConfig: Boolean
        };
    };
    var defaultPrefixCls = "ant";

    function getGlobalPrefixCls() {
        return globalConfigForApi.prefixCls || defaultPrefixCls;
    }

    var globalConfigByCom = reactive({});
    var globalConfigBySet = reactive({});
    var globalConfigForApi = reactive({});
    watchEffect(function () {
        _extends(globalConfigForApi, globalConfigByCom, globalConfigBySet);
        globalConfigForApi.prefixCls = getGlobalPrefixCls();
        globalConfigForApi.getPrefixCls = function (suffixCls, customizePrefixCls) {
            if (customizePrefixCls)
                return customizePrefixCls;
            return suffixCls ? "".concat(globalConfigForApi.prefixCls, "-").concat(suffixCls) : globalConfigForApi.prefixCls;
        };
        globalConfigForApi.getRootPrefixCls = function (rootPrefixCls, customizePrefixCls) {
            if (rootPrefixCls) {
                return rootPrefixCls;
            }
            if (globalConfigForApi.prefixCls) {
                return globalConfigForApi.prefixCls;
            }
            if (customizePrefixCls && customizePrefixCls.includes("-")) {
                return customizePrefixCls.replace(/^(.*)-[^-]*$/, "$1");
            }
            return getGlobalPrefixCls();
        };
    });
    var stopWatchEffect;
    var setGlobalConfig = function setGlobalConfig2(params) {
        if (stopWatchEffect) {
            stopWatchEffect();
        }
        stopWatchEffect = watchEffect(function () {
            _extends(globalConfigBySet, reactive(params));
        });
        if (params.theme) {
            registerTheme(getGlobalPrefixCls(), params.theme);
        }
    };
    var globalConfig = function globalConfig2() {
        return {
            getPrefixCls: function getPrefixCls2(suffixCls, customizePrefixCls) {
                if (customizePrefixCls)
                    return customizePrefixCls;
                return suffixCls ? "".concat(getGlobalPrefixCls(), "-").concat(suffixCls) : getGlobalPrefixCls();
            },
            getRootPrefixCls: function getRootPrefixCls(rootPrefixCls, customizePrefixCls) {
                if (rootPrefixCls) {
                    return rootPrefixCls;
                }
                if (globalConfigForApi.prefixCls) {
                    return globalConfigForApi.prefixCls;
                }
                if (customizePrefixCls && customizePrefixCls.includes("-")) {
                    return customizePrefixCls.replace(/^(.*)-[^-]*$/, "$1");
                }
                return getGlobalPrefixCls();
            }
        };
    };
    var ConfigProvider = defineComponent({
        name: "AConfigProvider",
        inheritAttrs: false,
        props: configProviderProps(),
        setup: function setup5(props, _ref) {
            var slots = _ref.slots;
            var getPrefixCls2 = function getPrefixCls3(suffixCls, customizePrefixCls) {
                var _props$prefixCls = props.prefixCls,
                    prefixCls = _props$prefixCls === void 0 ? "ant" : _props$prefixCls;
                if (customizePrefixCls)
                    return customizePrefixCls;
                return suffixCls ? "".concat(prefixCls, "-").concat(suffixCls) : prefixCls;
            };
            var renderEmptyComponent = function renderEmptyComponent2(name) {
                var renderEmpty$1 = props.renderEmpty || slots.renderEmpty || renderEmpty;
                return renderEmpty$1(name);
            };
            var getPrefixClsWrapper = function getPrefixClsWrapper2(suffixCls, customizePrefixCls) {
                var prefixCls = props.prefixCls;
                if (customizePrefixCls)
                    return customizePrefixCls;
                var mergedPrefixCls = prefixCls || getPrefixCls2("");
                return suffixCls ? "".concat(mergedPrefixCls, "-").concat(suffixCls) : mergedPrefixCls;
            };
            var configProvider = reactive(_extends(_extends({}, props), {
                getPrefixCls: getPrefixClsWrapper,
                renderEmpty: renderEmptyComponent
            }));
            Object.keys(props).forEach(function (key2) {
                watch(function () {
                    return props[key2];
                }, function () {
                    configProvider[key2] = props[key2];
                });
            });
            if (!props.notUpdateGlobalConfig) {
                _extends(globalConfigByCom, configProvider);
                watch(configProvider, function () {
                    _extends(globalConfigByCom, configProvider);
                });
            }
            var validateMessagesRef = computed(function () {
                var _a, _b;
                var validateMessages = {};
                if (props.locale) {
                    validateMessages = ((_a = props.locale.Form) === null || _a === void 0 ? void 0 : _a.defaultValidateMessages) || ((_b = defaultLocale.Form) === null || _b === void 0 ? void 0 : _b.defaultValidateMessages) || {};
                }
                if (props.form && props.form.validateMessages) {
                    validateMessages = _extends(_extends({}, validateMessages), props.form.validateMessages);
                }
                return validateMessages;
            });
            useProvideGlobalForm({
                validateMessages: validateMessagesRef
            });
            provide("configProvider", configProvider);
            var renderProvider = function renderProvider2(legacyLocale) {
                var _a;
                return createVNode(LocaleProvider$1, {
                    "locale": props.locale || legacyLocale,
                    "ANT_MARK__": ANT_MARK
                }, {
                    default: function _default2() {
                        return [(_a = slots.default) === null || _a === void 0 ? void 0 : _a.call(slots)];
                    }
                });
            };
            watchEffect(function () {
                if (props.direction) {
                    message.config({
                        rtl: props.direction === "rtl"
                    });
                    notification.config({
                        rtl: props.direction === "rtl"
                    });
                }
            });
            return function () {
                return createVNode(LocaleReceiver, {
                    "children": function children(_2, __, legacyLocale) {
                        return renderProvider(legacyLocale);
                    }
                }, null);
            };
        }
    });
    var defaultConfigProvider = reactive({
        getPrefixCls: function getPrefixCls(suffixCls, customizePrefixCls) {
            if (customizePrefixCls)
                return customizePrefixCls;
            return suffixCls ? "ant-".concat(suffixCls) : "ant";
        },
        renderEmpty,
        direction: "ltr"
    });
    ConfigProvider.config = setGlobalConfig;
    ConfigProvider.install = function (app) {
        app.component(ConfigProvider.name, ConfigProvider);
    };
    const useConfigInject = function (name, props) {
        var configProvider = inject("configProvider", defaultConfigProvider);
        var prefixCls = computed(function () {
            return configProvider.getPrefixCls(name, props.prefixCls);
        });
        var direction = computed(function () {
            var _a;
            return (_a = props.direction) !== null && _a !== void 0 ? _a : configProvider.direction;
        });
        var rootPrefixCls = computed(function () {
            return configProvider.getPrefixCls();
        });
        var autoInsertSpaceInButton = computed(function () {
            return configProvider.autoInsertSpaceInButton;
        });
        var renderEmpty2 = computed(function () {
            return configProvider.renderEmpty;
        });
        var space = computed(function () {
            return configProvider.space;
        });
        var pageHeader = computed(function () {
            return configProvider.pageHeader;
        });
        var form = computed(function () {
            return configProvider.form;
        });
        var getTargetContainer = computed(function () {
            return props.getTargetContainer || configProvider.getTargetContainer;
        });
        var getPopupContainer = computed(function () {
            return props.getPopupContainer || configProvider.getPopupContainer;
        });
        var dropdownMatchSelectWidth = computed(function () {
            var _a;
            return (_a = props.dropdownMatchSelectWidth) !== null && _a !== void 0 ? _a : configProvider.dropdownMatchSelectWidth;
        });
        var virtual = computed(function () {
            return (props.virtual === void 0 ? configProvider.virtual !== false : props.virtual !== false) && dropdownMatchSelectWidth.value !== false;
        });
        var size2 = computed(function () {
            return props.size || configProvider.componentSize;
        });
        var autocomplete = computed(function () {
            var _a;
            return props.autocomplete || ((_a = configProvider.input) === null || _a === void 0 ? void 0 : _a.autocomplete);
        });
        var csp = computed(function () {
            return configProvider.csp;
        });
        return {
            configProvider,
            prefixCls,
            direction,
            size: size2,
            getTargetContainer,
            getPopupContainer,
            space,
            pageHeader,
            form,
            autoInsertSpaceInButton,
            renderEmpty: renderEmpty2,
            virtual,
            dropdownMatchSelectWidth,
            rootPrefixCls,
            getPrefixCls: configProvider.getPrefixCls,
            autocomplete,
            csp
        };
    };

    function omit(obj, fields) {
        var shallowCopy = _extends({}, obj);
        for (var i2 = 0; i2 < fields.length; i2 += 1) {
            var key2 = fields[i2];
            delete shallowCopy[key2];
        }
        return shallowCopy;
    }

    function contains(root, n2) {
        if (!root) {
            return false;
        }
        return root.contains(n2);
    }

    var PortalContextKey = Symbol("PortalContextKey");
    var useProvidePortal = function useProvidePortal2(instance) {
        var config = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {
            inTriggerContext: true
        };
        provide(PortalContextKey, {
            inTriggerContext: config.inTriggerContext,
            shouldRender: computed(function () {
                var _ref = instance || {}, sPopupVisible = _ref.sPopupVisible, popupRef = _ref.popupRef,
                    forceRender = _ref.forceRender, autoDestroy = _ref.autoDestroy;
                var shouldRender = false;
                if (sPopupVisible || popupRef || forceRender) {
                    shouldRender = true;
                }
                if (!sPopupVisible && autoDestroy) {
                    shouldRender = false;
                }
                return shouldRender;
            })
        });
    };
    var useInjectPortal = function useInjectPortal2() {
        useProvidePortal({}, {
            inTriggerContext: false
        });
        var portalContext = inject(PortalContextKey, {
            shouldRender: computed(function () {
                return false;
            }),
            inTriggerContext: false
        });
        return {
            shouldRender: computed(function () {
                return portalContext.shouldRender.value || portalContext.inTriggerContext === false;
            })
        };
    };
    const Portal$1 = defineComponent({
        name: "Portal",
        inheritAttrs: false,
        props: {
            getContainer: PropTypes$1.func.isRequired,
            didUpdate: Function
        },
        setup: function setup6(props, _ref) {
            var slots = _ref.slots;
            var isSSR = true;
            var container;
            var _useInjectPortal = useInjectPortal(), shouldRender = _useInjectPortal.shouldRender;
            onBeforeMount(function () {
                isSSR = false;
                if (shouldRender.value) {
                    container = props.getContainer();
                }
            });
            var stopWatch = watch(shouldRender, function () {
                if (shouldRender.value && !container) {
                    container = props.getContainer();
                }
                if (container) {
                    stopWatch();
                }
            });
            onUpdated(function () {
                nextTick(function () {
                    var _a;
                    if (shouldRender.value) {
                        (_a = props.didUpdate) === null || _a === void 0 ? void 0 : _a.call(props, props);
                    }
                });
            });
            onBeforeUnmount(function () {
                if (container && container.parentNode) {
                    container.parentNode.removeChild(container);
                }
            });
            return function () {
                var _a;
                if (!shouldRender.value)
                    return null;
                if (isSSR) {
                    return (_a = slots.default) === null || _a === void 0 ? void 0 : _a.call(slots);
                }
                return container ? createVNode(Teleport, {
                    "to": container
                }, slots) : null;
            };
        }
    });
    var KeyCode = {
        /**
         * MAC_ENTER
         */
        MAC_ENTER: 3,
        /**
         * BACKSPACE
         */
        BACKSPACE: 8,
        /**
         * TAB
         */
        TAB: 9,
        /**
         * NUMLOCK on FF/Safari Mac
         */
        NUM_CENTER: 12,
        /**
         * ENTER
         */
        ENTER: 13,
        /**
         * SHIFT
         */
        SHIFT: 16,
        /**
         * CTRL
         */
        CTRL: 17,
        /**
         * ALT
         */
        ALT: 18,
        /**
         * PAUSE
         */
        PAUSE: 19,
        /**
         * CAPS_LOCK
         */
        CAPS_LOCK: 20,
        /**
         * ESC
         */
        ESC: 27,
        /**
         * SPACE
         */
        SPACE: 32,
        /**
         * PAGE_UP
         */
        PAGE_UP: 33,
        /**
         * PAGE_DOWN
         */
        PAGE_DOWN: 34,
        /**
         * END
         */
        END: 35,
        /**
         * HOME
         */
        HOME: 36,
        /**
         * LEFT
         */
        LEFT: 37,
        /**
         * UP
         */
        UP: 38,
        /**
         * RIGHT
         */
        RIGHT: 39,
        /**
         * DOWN
         */
        DOWN: 40,
        /**
         * PRINT_SCREEN
         */
        PRINT_SCREEN: 44,
        /**
         * INSERT
         */
        INSERT: 45,
        /**
         * DELETE
         */
        DELETE: 46,
        /**
         * ZERO
         */
        ZERO: 48,
        /**
         * ONE
         */
        ONE: 49,
        /**
         * TWO
         */
        TWO: 50,
        /**
         * THREE
         */
        THREE: 51,
        /**
         * FOUR
         */
        FOUR: 52,
        /**
         * FIVE
         */
        FIVE: 53,
        /**
         * SIX
         */
        SIX: 54,
        /**
         * SEVEN
         */
        SEVEN: 55,
        /**
         * EIGHT
         */
        EIGHT: 56,
        /**
         * NINE
         */
        NINE: 57,
        /**
         * QUESTION_MARK
         */
        QUESTION_MARK: 63,
        /**
         * A
         */
        A: 65,
        /**
         * B
         */
        B: 66,
        /**
         * C
         */
        C: 67,
        /**
         * D
         */
        D: 68,
        /**
         * E
         */
        E: 69,
        /**
         * F
         */
        F: 70,
        /**
         * G
         */
        G: 71,
        /**
         * H
         */
        H: 72,
        /**
         * I
         */
        I: 73,
        /**
         * J
         */
        J: 74,
        /**
         * K
         */
        K: 75,
        /**
         * L
         */
        L: 76,
        /**
         * M
         */
        M: 77,
        /**
         * N
         */
        N: 78,
        /**
         * O
         */
        O: 79,
        /**
         * P
         */
        P: 80,
        /**
         * Q
         */
        Q: 81,
        /**
         * R
         */
        R: 82,
        /**
         * S
         */
        S: 83,
        /**
         * T
         */
        T: 84,
        /**
         * U
         */
        U: 85,
        /**
         * V
         */
        V: 86,
        /**
         * W
         */
        W: 87,
        /**
         * X
         */
        X: 88,
        /**
         * Y
         */
        Y: 89,
        /**
         * Z
         */
        Z: 90,
        /**
         * META
         */
        META: 91,
        /**
         * WIN_KEY_RIGHT
         */
        WIN_KEY_RIGHT: 92,
        /**
         * CONTEXT_MENU
         */
        CONTEXT_MENU: 93,
        /**
         * NUM_ZERO
         */
        NUM_ZERO: 96,
        /**
         * NUM_ONE
         */
        NUM_ONE: 97,
        /**
         * NUM_TWO
         */
        NUM_TWO: 98,
        /**
         * NUM_THREE
         */
        NUM_THREE: 99,
        /**
         * NUM_FOUR
         */
        NUM_FOUR: 100,
        /**
         * NUM_FIVE
         */
        NUM_FIVE: 101,
        /**
         * NUM_SIX
         */
        NUM_SIX: 102,
        /**
         * NUM_SEVEN
         */
        NUM_SEVEN: 103,
        /**
         * NUM_EIGHT
         */
        NUM_EIGHT: 104,
        /**
         * NUM_NINE
         */
        NUM_NINE: 105,
        /**
         * NUM_MULTIPLY
         */
        NUM_MULTIPLY: 106,
        /**
         * NUM_PLUS
         */
        NUM_PLUS: 107,
        /**
         * NUM_MINUS
         */
        NUM_MINUS: 109,
        /**
         * NUM_PERIOD
         */
        NUM_PERIOD: 110,
        /**
         * NUM_DIVISION
         */
        NUM_DIVISION: 111,
        /**
         * F1
         */
        F1: 112,
        /**
         * F2
         */
        F2: 113,
        /**
         * F3
         */
        F3: 114,
        /**
         * F4
         */
        F4: 115,
        /**
         * F5
         */
        F5: 116,
        /**
         * F6
         */
        F6: 117,
        /**
         * F7
         */
        F7: 118,
        /**
         * F8
         */
        F8: 119,
        /**
         * F9
         */
        F9: 120,
        /**
         * F10
         */
        F10: 121,
        /**
         * F11
         */
        F11: 122,
        /**
         * F12
         */
        F12: 123,
        /**
         * NUMLOCK
         */
        NUMLOCK: 144,
        /**
         * SEMICOLON
         */
        SEMICOLON: 186,
        /**
         * DASH
         */
        DASH: 189,
        /**
         * EQUALS
         */
        EQUALS: 187,
        /**
         * COMMA
         */
        COMMA: 188,
        /**
         * PERIOD
         */
        PERIOD: 190,
        /**
         * SLASH
         */
        SLASH: 191,
        /**
         * APOSTROPHE
         */
        APOSTROPHE: 192,
        /**
         * SINGLE_QUOTE
         */
        SINGLE_QUOTE: 222,
        /**
         * OPEN_SQUARE_BRACKET
         */
        OPEN_SQUARE_BRACKET: 219,
        /**
         * BACKSLASH
         */
        BACKSLASH: 220,
        /**
         * CLOSE_SQUARE_BRACKET
         */
        CLOSE_SQUARE_BRACKET: 221,
        /**
         * WIN_KEY
         */
        WIN_KEY: 224,
        /**
         * MAC_FF_META
         */
        MAC_FF_META: 224,
        /**
         * WIN_IME
         */
        WIN_IME: 229,
        // ======================== Function ========================
        /**
         * whether text and modified key is entered at the same time.
         */
        isTextModifyingKeyEvent: function isTextModifyingKeyEvent(e2) {
            var keyCode = e2.keyCode;
            if (e2.altKey && !e2.ctrlKey || e2.metaKey || // Function keys don't generate text
                keyCode >= KeyCode.F1 && keyCode <= KeyCode.F12) {
                return false;
            }
            switch (keyCode) {
                case KeyCode.ALT:
                case KeyCode.CAPS_LOCK:
                case KeyCode.CONTEXT_MENU:
                case KeyCode.CTRL:
                case KeyCode.DOWN:
                case KeyCode.END:
                case KeyCode.ESC:
                case KeyCode.HOME:
                case KeyCode.INSERT:
                case KeyCode.LEFT:
                case KeyCode.MAC_FF_META:
                case KeyCode.META:
                case KeyCode.NUMLOCK:
                case KeyCode.NUM_CENTER:
                case KeyCode.PAGE_DOWN:
                case KeyCode.PAGE_UP:
                case KeyCode.PAUSE:
                case KeyCode.PRINT_SCREEN:
                case KeyCode.RIGHT:
                case KeyCode.SHIFT:
                case KeyCode.UP:
                case KeyCode.WIN_KEY:
                case KeyCode.WIN_KEY_RIGHT:
                    return false;
                default:
                    return true;
            }
        },
        /**
         * whether character is entered.
         */
        isCharacterKey: function isCharacterKey(keyCode) {
            if (keyCode >= KeyCode.ZERO && keyCode <= KeyCode.NINE) {
                return true;
            }
            if (keyCode >= KeyCode.NUM_ZERO && keyCode <= KeyCode.NUM_MULTIPLY) {
                return true;
            }
            if (keyCode >= KeyCode.A && keyCode <= KeyCode.Z) {
                return true;
            }
            if (window.navigator.userAgent.indexOf("WebKit") !== -1 && keyCode === 0) {
                return true;
            }
            switch (keyCode) {
                case KeyCode.SPACE:
                case KeyCode.QUESTION_MARK:
                case KeyCode.NUM_PLUS:
                case KeyCode.NUM_MINUS:
                case KeyCode.NUM_PERIOD:
                case KeyCode.NUM_DIVISION:
                case KeyCode.SEMICOLON:
                case KeyCode.DASH:
                case KeyCode.EQUALS:
                case KeyCode.COMMA:
                case KeyCode.PERIOD:
                case KeyCode.SLASH:
                case KeyCode.APOSTROPHE:
                case KeyCode.SINGLE_QUOTE:
                case KeyCode.OPEN_SQUARE_BRACKET:
                case KeyCode.BACKSLASH:
                case KeyCode.CLOSE_SQUARE_BRACKET:
                    return true;
                default:
                    return false;
            }
        }
    };
    const KeyCode$1 = KeyCode;
    var attributes = "accept acceptcharset accesskey action allowfullscreen allowtransparency\nalt async autocomplete autofocus autoplay capture cellpadding cellspacing challenge\ncharset checked classid classname colspan cols content contenteditable contextmenu\ncontrols coords crossorigin data datetime default defer dir disabled download draggable\nenctype form formaction formenctype formmethod formnovalidate formtarget frameborder\nheaders height hidden high href hreflang htmlfor for httpequiv icon id inputmode integrity\nis keyparams keytype kind label lang list loop low manifest marginheight marginwidth max maxlength media\nmediagroup method min minlength multiple muted name novalidate nonce open\noptimum pattern placeholder poster preload radiogroup readonly rel required\nreversed role rowspan rows sandbox scope scoped scrolling seamless selected\nshape size sizes span spellcheck src srcdoc srclang srcset start step style\nsummary tabindex target title type usemap value width wmode wrap";
    var eventsName = "onCopy onCut onPaste onCompositionend onCompositionstart onCompositionupdate onKeydown\n    onKeypress onKeyup onFocus onBlur onChange onInput onSubmit onClick onContextmenu onDoubleclick onDblclick\n    onDrag onDragend onDragenter onDragexit onDragleave onDragover onDragstart onDrop onMousedown\n    onMouseenter onMouseleave onMousemove onMouseout onMouseover onMouseup onSelect onTouchcancel\n    onTouchend onTouchmove onTouchstart onTouchstartPassive onTouchmovePassive onScroll onWheel onAbort onCanplay onCanplaythrough\n    onDurationchange onEmptied onEncrypted onEnded onError onLoadeddata onLoadedmetadata\n    onLoadstart onPause onPlay onPlaying onProgress onRatechange onSeeked onSeeking onStalled onSuspend onTimeupdate onVolumechange onWaiting onLoad onError";
    var propList = "".concat(attributes, " ").concat(eventsName).split(/[\s\n]+/);
    var ariaPrefix = "aria-";
    var dataPrefix = "data-";

    function match(key2, prefix) {
        return key2.indexOf(prefix) === 0;
    }

    function pickAttrs(props) {
        var ariaOnly = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : false;
        var mergedConfig;
        if (ariaOnly === false) {
            mergedConfig = {
                aria: true,
                data: true,
                attr: true
            };
        } else if (ariaOnly === true) {
            mergedConfig = {
                aria: true
            };
        } else {
            mergedConfig = _extends({}, ariaOnly);
        }
        var attrs = {};
        Object.keys(props).forEach(function (key2) {
            if (
                // Aria
                mergedConfig.aria && (key2 === "role" || match(key2, ariaPrefix)) || // Data
                mergedConfig.data && match(key2, dataPrefix) || // Attr
                mergedConfig.attr && (propList.includes(key2) || propList.includes(key2.toLowerCase()))
            ) {
                attrs[key2] = props[key2];
            }
        });
        return attrs;
    }

    var START_EVENT_NAME_MAP = {
        transitionstart: {
            transition: "transitionstart",
            WebkitTransition: "webkitTransitionStart",
            MozTransition: "mozTransitionStart",
            OTransition: "oTransitionStart",
            msTransition: "MSTransitionStart"
        },
        animationstart: {
            animation: "animationstart",
            WebkitAnimation: "webkitAnimationStart",
            MozAnimation: "mozAnimationStart",
            OAnimation: "oAnimationStart",
            msAnimation: "MSAnimationStart"
        }
    };
    var END_EVENT_NAME_MAP = {
        transitionend: {
            transition: "transitionend",
            WebkitTransition: "webkitTransitionEnd",
            MozTransition: "mozTransitionEnd",
            OTransition: "oTransitionEnd",
            msTransition: "MSTransitionEnd"
        },
        animationend: {
            animation: "animationend",
            WebkitAnimation: "webkitAnimationEnd",
            MozAnimation: "mozAnimationEnd",
            OAnimation: "oAnimationEnd",
            msAnimation: "MSAnimationEnd"
        }
    };
    var startEvents = [];
    var endEvents = [];

    function detectEvents() {
        var testEl = document.createElement("div");
        var style = testEl.style;
        if (!("AnimationEvent" in window)) {
            delete START_EVENT_NAME_MAP.animationstart.animation;
            delete END_EVENT_NAME_MAP.animationend.animation;
        }
        if (!("TransitionEvent" in window)) {
            delete START_EVENT_NAME_MAP.transitionstart.transition;
            delete END_EVENT_NAME_MAP.transitionend.transition;
        }

        function process(EVENT_NAME_MAP, events) {
            for (var baseEventName in EVENT_NAME_MAP) {
                if (EVENT_NAME_MAP.hasOwnProperty(baseEventName)) {
                    var baseEvents = EVENT_NAME_MAP[baseEventName];
                    for (var styleName in baseEvents) {
                        if (styleName in style) {
                            events.push(baseEvents[styleName]);
                            break;
                        }
                    }
                }
            }
        }

        process(START_EVENT_NAME_MAP, startEvents);
        process(END_EVENT_NAME_MAP, endEvents);
    }

    if (typeof window !== "undefined" && typeof document !== "undefined") {
        detectEvents();
    }

    function addEventListener(node, eventName, eventListener) {
        node.addEventListener(eventName, eventListener, false);
    }

    function removeEventListener(node, eventName, eventListener) {
        node.removeEventListener(eventName, eventListener, false);
    }

    var TransitionEvents = {
        // Start events
        startEvents,
        addStartEventListener: function addStartEventListener(node, eventListener) {
            if (startEvents.length === 0) {
                setTimeout(eventListener, 0);
                return;
            }
            startEvents.forEach(function (startEvent) {
                addEventListener(node, startEvent, eventListener);
            });
        },
        removeStartEventListener: function removeStartEventListener(node, eventListener) {
            if (startEvents.length === 0) {
                return;
            }
            startEvents.forEach(function (startEvent) {
                removeEventListener(node, startEvent, eventListener);
            });
        },
        // End events
        endEvents,
        addEndEventListener: function addEndEventListener(node, eventListener) {
            if (endEvents.length === 0) {
                setTimeout(eventListener, 0);
                return;
            }
            endEvents.forEach(function (endEvent) {
                addEventListener(node, endEvent, eventListener);
            });
        },
        removeEndEventListener: function removeEndEventListener(node, eventListener) {
            if (endEvents.length === 0) {
                return;
            }
            endEvents.forEach(function (endEvent) {
                removeEventListener(node, endEvent, eventListener);
            });
        }
    };
    const TransitionEvents$1 = TransitionEvents;
    var styleForPesudo;

    function isHidden(element) {
        return !element || element.offsetParent === null;
    }

    function isNotGrey(color) {
        var match2 = (color || "").match(/rgba?\((\d*), (\d*), (\d*)(, [\.\d]*)?\)/);
        if (match2 && match2[1] && match2[2] && match2[3]) {
            return !(match2[1] === match2[2] && match2[2] === match2[3]);
        }
        return true;
    }

    const Wave = defineComponent({
        name: "Wave",
        props: {
            insertExtraNode: Boolean,
            disabled: Boolean
        },
        setup: function setup7(props, _ref) {
            var slots = _ref.slots, expose = _ref.expose;
            var instance = getCurrentInstance();
            var _useConfigInject = useConfigInject("", props), csp = _useConfigInject.csp,
                prefixCls = _useConfigInject.prefixCls;
            expose({
                csp
            });
            var eventIns = null;
            var clickWaveTimeoutId = null;
            var animationStartId = null;
            var animationStart = false;
            var extraNode = null;
            var isUnmounted = false;
            var onTransitionStart = function onTransitionStart2(e2) {
                if (isUnmounted)
                    return;
                var node = findDOMNode(instance);
                if (!e2 || e2.target !== node) {
                    return;
                }
                if (!animationStart) {
                    resetEffect(node);
                }
            };
            var onTransitionEnd = function onTransitionEnd2(e2) {
                if (!e2 || e2.animationName !== "fadeEffect") {
                    return;
                }
                resetEffect(e2.target);
            };
            var getAttributeName = function getAttributeName2() {
                var insertExtraNode = props.insertExtraNode;
                return insertExtraNode ? "".concat(prefixCls.value, "-click-animating") : "".concat(prefixCls.value, "-click-animating-without-extra-node");
            };
            var onClick = function onClick2(node, waveColor) {
                var _a;
                var insertExtraNode = props.insertExtraNode, disabled = props.disabled;
                if (disabled || !node || isHidden(node) || node.className.indexOf("-leave") >= 0) {
                    return;
                }
                extraNode = document.createElement("div");
                extraNode.className = "".concat(prefixCls.value, "-click-animating-node");
                var attributeName = getAttributeName();
                node.removeAttribute(attributeName);
                node.setAttribute(attributeName, "true");
                styleForPesudo = styleForPesudo || document.createElement("style");
                if (waveColor && waveColor !== "#ffffff" && waveColor !== "rgb(255, 255, 255)" && isNotGrey(waveColor) && !/rgba\(\d*, \d*, \d*, 0\)/.test(waveColor) && // any transparent rgba color
                    waveColor !== "transparent") {
                    if ((_a = csp.value) === null || _a === void 0 ? void 0 : _a.nonce) {
                        styleForPesudo.nonce = csp.value.nonce;
                    }
                    extraNode.style.borderColor = waveColor;
                    styleForPesudo.innerHTML = "\n        [".concat(prefixCls.value, "-click-animating-without-extra-node='true']::after, .").concat(prefixCls.value, "-click-animating-node {\n          --antd-wave-shadow-color: ").concat(waveColor, ";\n        }");
                    if (!document.body.contains(styleForPesudo)) {
                        document.body.appendChild(styleForPesudo);
                    }
                }
                if (insertExtraNode) {
                    node.appendChild(extraNode);
                }
                TransitionEvents$1.addStartEventListener(node, onTransitionStart);
                TransitionEvents$1.addEndEventListener(node, onTransitionEnd);
            };
            var resetEffect = function resetEffect2(node) {
                if (!node || node === extraNode || !(node instanceof Element)) {
                    return;
                }
                var insertExtraNode = props.insertExtraNode;
                var attributeName = getAttributeName();
                node.setAttribute(attributeName, "false");
                if (styleForPesudo) {
                    styleForPesudo.innerHTML = "";
                }
                if (insertExtraNode && extraNode && node.contains(extraNode)) {
                    node.removeChild(extraNode);
                }
                TransitionEvents$1.removeStartEventListener(node, onTransitionStart);
                TransitionEvents$1.removeEndEventListener(node, onTransitionEnd);
            };
            var bindAnimationEvent = function bindAnimationEvent2(node) {
                if (!node || !node.getAttribute || node.getAttribute("disabled") || node.className.indexOf("disabled") >= 0) {
                    return;
                }
                var newClick = function newClick2(e2) {
                    if (e2.target.tagName === "INPUT" || isHidden(e2.target)) {
                        return;
                    }
                    resetEffect(node);
                    var waveColor = getComputedStyle(node).getPropertyValue("border-top-color") || // Firefox Compatible
                        getComputedStyle(node).getPropertyValue("border-color") || getComputedStyle(node).getPropertyValue("background-color");
                    clickWaveTimeoutId = setTimeout(function () {
                        return onClick(node, waveColor);
                    }, 0);
                    wrapperRaf.cancel(animationStartId);
                    animationStart = true;
                    animationStartId = wrapperRaf(function () {
                        animationStart = false;
                    }, 10);
                };
                node.addEventListener("click", newClick, true);
                return {
                    cancel: function cancel() {
                        node.removeEventListener("click", newClick, true);
                    }
                };
            };
            onMounted(function () {
                nextTick(function () {
                    var node = findDOMNode(instance);
                    if (node.nodeType !== 1) {
                        return;
                    }
                    eventIns = bindAnimationEvent(node);
                });
            });
            onBeforeUnmount(function () {
                if (eventIns) {
                    eventIns.cancel();
                }
                clearTimeout(clickWaveTimeoutId);
                isUnmounted = true;
            });
            return function () {
                var _a;
                return (_a = slots.default) === null || _a === void 0 ? void 0 : _a.call(slots)[0];
            };
        }
    });

    function convertLegacyProps(type) {
        if (type === "danger") {
            return {
                danger: true
            };
        }
        return {
            type
        };
    }

    var buttonProps = function buttonProps2() {
        return {
            prefixCls: String,
            type: String,
            htmlType: {
                type: String,
                default: "button"
            },
            shape: {
                type: String
            },
            size: {
                type: String
            },
            loading: {
                type: [Boolean, Object],
                default: function _default2() {
                    return false;
                }
            },
            disabled: {
                type: Boolean,
                default: void 0
            },
            ghost: {
                type: Boolean,
                default: void 0
            },
            block: {
                type: Boolean,
                default: void 0
            },
            danger: {
                type: Boolean,
                default: void 0
            },
            icon: PropTypes$1.any,
            href: String,
            target: String,
            title: String,
            onClick: {
                type: Function
            },
            onMousedown: {
                type: Function
            }
        };
    };
    const buttonTypes = buttonProps;
    var getCollapsedWidth = function getCollapsedWidth2(node) {
        if (node) {
            node.style.width = "0px";
            node.style.opacity = "0";
            node.style.transform = "scale(0)";
        }
    };
    var getRealWidth = function getRealWidth2(node) {
        nextTick(function () {
            if (node) {
                node.style.width = "".concat(node.scrollWidth, "px");
                node.style.opacity = "1";
                node.style.transform = "scale(1)";
            }
        });
    };
    var resetStyle = function resetStyle2(node) {
        if (node && node.style) {
            node.style.width = null;
            node.style.opacity = null;
            node.style.transform = null;
        }
    };
    const LoadingIcon = defineComponent({
        name: "LoadingIcon",
        props: {
            prefixCls: String,
            loading: [Boolean, Object],
            existIcon: Boolean
        },
        setup: function setup8(props) {
            return function () {
                var existIcon = props.existIcon, prefixCls = props.prefixCls, loading = props.loading;
                if (existIcon) {
                    return createVNode("span", {
                        "class": "".concat(prefixCls, "-loading-icon")
                    }, [createVNode(LoadingOutlined$1, null, null)]);
                }
                var visible = !!loading;
                return createVNode(Transition, {
                    "name": "".concat(prefixCls, "-loading-icon-motion"),
                    "onBeforeEnter": getCollapsedWidth,
                    "onEnter": getRealWidth,
                    "onAfterEnter": resetStyle,
                    "onBeforeLeave": getRealWidth,
                    "onLeave": function onLeave(node) {
                        setTimeout(function () {
                            getCollapsedWidth(node);
                        });
                    },
                    "onAfterLeave": resetStyle
                }, {
                    default: function _default2() {
                        return [visible ? createVNode("span", {
                            "class": "".concat(prefixCls, "-loading-icon")
                        }, [createVNode(LoadingOutlined$1, null, null)]) : null];
                    }
                });
            };
        }
    });
    var rxTwoCNChar = /^[\u4e00-\u9fa5]{2}$/;
    var isTwoCNChar = rxTwoCNChar.test.bind(rxTwoCNChar);

    function isUnborderedButtonType(type) {
        return type === "text" || type === "link";
    }

    const Button = defineComponent({
        name: "AButton",
        inheritAttrs: false,
        __ANT_BUTTON: true,
        props: initDefaultProps$1(buttonTypes(), {
            type: "default"
        }),
        slots: ["icon"],
        // emits: ['click', 'mousedown'],
        setup: function setup9(props, _ref) {
            var slots = _ref.slots, attrs = _ref.attrs, emit2 = _ref.emit;
            var _useConfigInject = useConfigInject("btn", props), prefixCls = _useConfigInject.prefixCls,
                autoInsertSpaceInButton = _useConfigInject.autoInsertSpaceInButton,
                direction = _useConfigInject.direction, size2 = _useConfigInject.size;
            var buttonNodeRef = ref(null);
            var delayTimeoutRef = ref(void 0);
            var isNeedInserted = false;
            var innerLoading = ref(false);
            var hasTwoCNChar = ref(false);
            var autoInsertSpace = computed(function () {
                return autoInsertSpaceInButton.value !== false;
            });
            var loadingOrDelay = computed(function () {
                return _typeof$1(props.loading) === "object" && props.loading.delay ? props.loading.delay || true : !!props.loading;
            });
            watch(loadingOrDelay, function (val) {
                clearTimeout(delayTimeoutRef.value);
                if (typeof loadingOrDelay.value === "number") {
                    delayTimeoutRef.value = setTimeout(function () {
                        innerLoading.value = val;
                    }, loadingOrDelay.value);
                } else {
                    innerLoading.value = val;
                }
            }, {
                immediate: true
            });
            var classes = computed(function () {
                var _ref2;
                var type = props.type, _props$shape = props.shape,
                    shape = _props$shape === void 0 ? "default" : _props$shape, ghost = props.ghost,
                    block = props.block, danger = props.danger;
                var pre = prefixCls.value;
                var sizeClassNameMap = {
                    large: "lg",
                    small: "sm",
                    middle: void 0
                };
                var sizeFullname = size2.value;
                var sizeCls = sizeFullname ? sizeClassNameMap[sizeFullname] || "" : "";
                return _ref2 = {}, _defineProperty$d(_ref2, "".concat(pre), true), _defineProperty$d(_ref2, "".concat(pre, "-").concat(type), type), _defineProperty$d(_ref2, "".concat(pre, "-").concat(shape), shape !== "default" && shape), _defineProperty$d(_ref2, "".concat(pre, "-").concat(sizeCls), sizeCls), _defineProperty$d(_ref2, "".concat(pre, "-loading"), innerLoading.value), _defineProperty$d(_ref2, "".concat(pre, "-background-ghost"), ghost && !isUnborderedButtonType(type)), _defineProperty$d(_ref2, "".concat(pre, "-two-chinese-chars"), hasTwoCNChar.value && autoInsertSpace.value), _defineProperty$d(_ref2, "".concat(pre, "-block"), block), _defineProperty$d(_ref2, "".concat(pre, "-dangerous"), !!danger), _defineProperty$d(_ref2, "".concat(pre, "-rtl"), direction.value === "rtl"), _ref2;
            });
            var fixTwoCNChar = function fixTwoCNChar2() {
                var node = buttonNodeRef.value;
                if (!node || autoInsertSpaceInButton.value === false) {
                    return;
                }
                var buttonText = node.textContent;
                if (isNeedInserted && isTwoCNChar(buttonText)) {
                    if (!hasTwoCNChar.value) {
                        hasTwoCNChar.value = true;
                    }
                } else if (hasTwoCNChar.value) {
                    hasTwoCNChar.value = false;
                }
            };
            var handleClick = function handleClick2(event) {
                if (innerLoading.value || props.disabled) {
                    event.preventDefault();
                    return;
                }
                emit2("click", event);
            };
            var insertSpace = function insertSpace2(child, needInserted) {
                var SPACE = needInserted ? " " : "";
                if (child.type === Text) {
                    var text = child.children.trim();
                    if (isTwoCNChar(text)) {
                        text = text.split("").join(SPACE);
                    }
                    return createVNode("span", null, [text]);
                }
                return child;
            };
            watchEffect(function () {
                devWarning(!(props.ghost && isUnborderedButtonType(props.type)), "Button", "`link` or `text` button can't be a `ghost` button.");
            });
            onMounted(fixTwoCNChar);
            onUpdated(fixTwoCNChar);
            onBeforeUnmount(function () {
                delayTimeoutRef.value && clearTimeout(delayTimeoutRef.value);
            });
            return function () {
                var _a, _b;
                var _props$icon = props.icon,
                    icon = _props$icon === void 0 ? (_a = slots.icon) === null || _a === void 0 ? void 0 : _a.call(slots) : _props$icon;
                var children = flattenChildren((_b = slots.default) === null || _b === void 0 ? void 0 : _b.call(slots));
                isNeedInserted = children.length === 1 && !icon && !isUnborderedButtonType(props.type);
                var type = props.type, htmlType = props.htmlType, disabled = props.disabled, href = props.href,
                    title = props.title, target = props.target, onMousedown = props.onMousedown;
                var iconType = innerLoading.value ? "loading" : icon;
                var buttonProps3 = _extends(_extends({}, attrs), {
                    title,
                    disabled,
                    class: [classes.value, attrs.class, _defineProperty$d({}, "".concat(prefixCls.value, "-icon-only"), children.length === 0 && !!iconType)],
                    onClick: handleClick,
                    onMousedown
                });
                if (!disabled) {
                    delete buttonProps3.disabled;
                }
                var iconNode = icon && !innerLoading.value ? icon : createVNode(LoadingIcon, {
                    "existIcon": !!icon,
                    "prefixCls": prefixCls.value,
                    "loading": !!innerLoading.value
                }, null);
                var kids = children.map(function (child) {
                    return insertSpace(child, isNeedInserted && autoInsertSpace.value);
                });
                if (href !== void 0) {
                    return createVNode("a", _objectSpread2(_objectSpread2({}, buttonProps3), {}, {
                        "href": href,
                        "target": target,
                        "ref": buttonNodeRef
                    }), [iconNode, kids]);
                }
                var buttonNode = createVNode("button", _objectSpread2(_objectSpread2({}, buttonProps3), {}, {
                    "ref": buttonNodeRef,
                    "type": htmlType
                }), [iconNode, kids]);
                if (isUnborderedButtonType(type)) {
                    return buttonNode;
                }
                return createVNode(Wave, {
                    "ref": "wave",
                    "disabled": !!innerLoading.value
                }, {
                    default: function _default2() {
                        return [buttonNode];
                    }
                });
            };
        }
    });

    function _defineProperties(target, props) {
        for (var i2 = 0; i2 < props.length; i2++) {
            var descriptor = props[i2];
            descriptor.enumerable = descriptor.enumerable || false;
            descriptor.configurable = true;
            if ("value" in descriptor)
                descriptor.writable = true;
            Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor);
        }
    }

    function _createClass(Constructor, protoProps, staticProps) {
        if (protoProps)
            _defineProperties(Constructor.prototype, protoProps);
        if (staticProps)
            _defineProperties(Constructor, staticProps);
        Object.defineProperty(Constructor, "prototype", {
            writable: false
        });
        return Constructor;
    }

    function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
        }
    }

    var UnreachableException = /* @__PURE__ */ _createClass(function UnreachableException2(value) {
        _classCallCheck(this, UnreachableException2);
        this.error = new Error("unreachable case: ".concat(JSON.stringify(value)));
    });
    var buttonGroupProps = function buttonGroupProps2() {
        return {
            prefixCls: String,
            size: {
                type: String
            }
        };
    };
    const ButtonGroup = defineComponent({
        name: "AButtonGroup",
        props: buttonGroupProps(),
        setup: function setup10(props, _ref) {
            var slots = _ref.slots;
            var _useConfigInject = useConfigInject("btn-group", props), prefixCls = _useConfigInject.prefixCls,
                direction = _useConfigInject.direction;
            var classes = computed(function () {
                var _ref2;
                var size2 = props.size;
                var sizeCls = "";
                switch (size2) {
                    case "large":
                        sizeCls = "lg";
                        break;
                    case "small":
                        sizeCls = "sm";
                        break;
                    case "middle":
                    case void 0:
                        break;
                    default:
                        console.warn(new UnreachableException(size2).error);
                }
                return _ref2 = {}, _defineProperty$d(_ref2, "".concat(prefixCls.value), true), _defineProperty$d(_ref2, "".concat(prefixCls.value, "-").concat(sizeCls), sizeCls), _defineProperty$d(_ref2, "".concat(prefixCls.value, "-rtl"), direction.value === "rtl"), _ref2;
            });
            return function () {
                var _a;
                return createVNode("div", {
                    "class": classes.value
                }, [flattenChildren((_a = slots.default) === null || _a === void 0 ? void 0 : _a.call(slots))]);
            };
        }
    });
    Button.Group = ButtonGroup;
    Button.install = function (app) {
        app.component(Button.name, Button);
        app.component(ButtonGroup.name, ButtonGroup);
        return app;
    };
    var canUseDocElement = function canUseDocElement2() {
        return canUseDom() && window.document.documentElement;
    };
    var cached;

    function getScrollBarSize(fresh) {
        if (typeof document === "undefined") {
            return 0;
        }
        if (fresh || cached === void 0) {
            var inner = document.createElement("div");
            inner.style.width = "100%";
            inner.style.height = "200px";
            var outer = document.createElement("div");
            var outerStyle = outer.style;
            outerStyle.position = "absolute";
            outerStyle.top = "0";
            outerStyle.left = "0";
            outerStyle.pointerEvents = "none";
            outerStyle.visibility = "hidden";
            outerStyle.width = "200px";
            outerStyle.height = "150px";
            outerStyle.overflow = "hidden";
            outer.appendChild(inner);
            document.body.appendChild(outer);
            var widthContained = inner.offsetWidth;
            outer.style.overflow = "scroll";
            var widthScroll = inner.offsetWidth;
            if (widthContained === widthScroll) {
                widthScroll = outer.clientWidth;
            }
            document.body.removeChild(outer);
            cached = widthContained - widthScroll;
        }
        return cached;
    }

    function setStyle(style) {
        var options = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
        var _options$element = options.element,
            element = _options$element === void 0 ? document.body : _options$element;
        var oldStyle = {};
        var styleKeys = Object.keys(style);
        styleKeys.forEach(function (key2) {
            oldStyle[key2] = element.style[key2];
        });
        styleKeys.forEach(function (key2) {
            element.style[key2] = style[key2];
        });
        return oldStyle;
    }

    function isBodyOverflowing() {
        return document.body.scrollHeight > (window.innerHeight || document.documentElement.clientHeight) && window.innerWidth > document.body.offsetWidth;
    }

    var cacheStyle$1 = {};
    const switchScrollingEffect = function (close3) {
        if (!isBodyOverflowing() && !close3) {
            return;
        }
        var scrollingEffectClassName2 = "ant-scrolling-effect";
        var scrollingEffectClassNameReg2 = new RegExp("".concat(scrollingEffectClassName2), "g");
        var bodyClassName = document.body.className;
        if (close3) {
            if (!scrollingEffectClassNameReg2.test(bodyClassName))
                return;
            setStyle(cacheStyle$1);
            cacheStyle$1 = {};
            document.body.className = bodyClassName.replace(scrollingEffectClassNameReg2, "").trim();
            return;
        }
        var scrollBarSize = getScrollBarSize();
        if (scrollBarSize) {
            cacheStyle$1 = setStyle({
                position: "relative",
                width: "calc(100% - ".concat(scrollBarSize, "px)")
            });
            if (!scrollingEffectClassNameReg2.test(bodyClassName)) {
                var addClassName = "".concat(bodyClassName, " ").concat(scrollingEffectClassName2);
                document.body.className = addClassName.trim();
            }
        }
    };
    var locks = [];
    var scrollingEffectClassName = "ant-scrolling-effect";
    var scrollingEffectClassNameReg = new RegExp("".concat(scrollingEffectClassName), "g");
    var uuid$1 = 0;
    var cacheStyle = /* @__PURE__ */ new Map();
    var ScrollLocker = /* @__PURE__ */ _createClass(function ScrollLocker2(options) {
        var _this = this;
        _classCallCheck(this, ScrollLocker2);
        this.getContainer = function () {
            var _a;
            return (_a = _this.options) === null || _a === void 0 ? void 0 : _a.container;
        };
        this.reLock = function (options2) {
            var findLock = locks.find(function (_ref) {
                var target = _ref.target;
                return target === _this.lockTarget;
            });
            if (findLock) {
                _this.unLock();
            }
            _this.options = options2;
            if (findLock) {
                findLock.options = options2;
                _this.lock();
            }
        };
        this.lock = function () {
            var _a;
            if (locks.some(function (_ref2) {
                var target = _ref2.target;
                return target === _this.lockTarget;
            })) {
                return;
            }
            if (locks.some(function (_ref3) {
                var options2 = _ref3.options;
                var _a2;
                return (options2 === null || options2 === void 0 ? void 0 : options2.container) === ((_a2 = _this.options) === null || _a2 === void 0 ? void 0 : _a2.container);
            })) {
                locks = [].concat(_toConsumableArray(locks), [{
                    target: _this.lockTarget,
                    options: _this.options
                }]);
                return;
            }
            var scrollBarSize = 0;
            var container = ((_a = _this.options) === null || _a === void 0 ? void 0 : _a.container) || document.body;
            if (container === document.body && window.innerWidth - document.documentElement.clientWidth > 0 || container.scrollHeight > container.clientHeight) {
                scrollBarSize = getScrollBarSize();
            }
            var containerClassName = container.className;
            if (locks.filter(function (_ref4) {
                var options2 = _ref4.options;
                var _a2;
                return (options2 === null || options2 === void 0 ? void 0 : options2.container) === ((_a2 = _this.options) === null || _a2 === void 0 ? void 0 : _a2.container);
            }).length === 0) {
                cacheStyle.set(container, setStyle({
                    width: scrollBarSize !== 0 ? "calc(100% - ".concat(scrollBarSize, "px)") : void 0,
                    overflow: "hidden",
                    overflowX: "hidden",
                    overflowY: "hidden"
                }, {
                    element: container
                }));
            }
            if (!scrollingEffectClassNameReg.test(containerClassName)) {
                var addClassName = "".concat(containerClassName, " ").concat(scrollingEffectClassName);
                container.className = addClassName.trim();
            }
            locks = [].concat(_toConsumableArray(locks), [{
                target: _this.lockTarget,
                options: _this.options
            }]);
        };
        this.unLock = function () {
            var _a;
            var findLock = locks.find(function (_ref5) {
                var target = _ref5.target;
                return target === _this.lockTarget;
            });
            locks = locks.filter(function (_ref6) {
                var target = _ref6.target;
                return target !== _this.lockTarget;
            });
            if (!findLock || locks.some(function (_ref7) {
                var options2 = _ref7.options;
                var _a2;
                return (options2 === null || options2 === void 0 ? void 0 : options2.container) === ((_a2 = findLock.options) === null || _a2 === void 0 ? void 0 : _a2.container);
            })) {
                return;
            }
            var container = ((_a = _this.options) === null || _a === void 0 ? void 0 : _a.container) || document.body;
            var containerClassName = container.className;
            if (!scrollingEffectClassNameReg.test(containerClassName))
                return;
            setStyle(cacheStyle.get(container), {
                element: container
            });
            cacheStyle.delete(container);
            container.className = container.className.replace(scrollingEffectClassNameReg, "").trim();
        };
        this.lockTarget = uuid$1++;
        this.options = options;
    });
    var openCount = 0;
    var supportDom = canUseDom();
    var cacheOverflow = {};
    var getParent = function getParent2(getContainer3) {
        if (!supportDom) {
            return null;
        }
        if (getContainer3) {
            if (typeof getContainer3 === "string") {
                return document.querySelectorAll(getContainer3)[0];
            }
            if (typeof getContainer3 === "function") {
                return getContainer3();
            }
            if (_typeof$1(getContainer3) === "object" && getContainer3 instanceof window.HTMLElement) {
                return getContainer3;
            }
        }
        return document.body;
    };
    const Portal = defineComponent({
        name: "PortalWrapper",
        inheritAttrs: false,
        props: {
            wrapperClassName: String,
            forceRender: {
                type: Boolean,
                default: void 0
            },
            getContainer: PropTypes$1.any,
            visible: {
                type: Boolean,
                default: void 0
            }
        },
        setup: function setup11(props, _ref) {
            var slots = _ref.slots;
            var container = ref();
            var componentRef = ref();
            var rafId = ref();
            var scrollLocker = new ScrollLocker({
                container: getParent(props.getContainer)
            });
            var removeCurrentContainer = function removeCurrentContainer2() {
                var _a, _b;
                (_b = (_a = container.value) === null || _a === void 0 ? void 0 : _a.parentNode) === null || _b === void 0 ? void 0 : _b.removeChild(container.value);
            };
            var attachToParent = function attachToParent2() {
                var force = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : false;
                if (force || container.value && !container.value.parentNode) {
                    var parent = getParent(props.getContainer);
                    if (parent) {
                        parent.appendChild(container.value);
                        return true;
                    }
                    return false;
                }
                return true;
            };
            var getContainer3 = function getContainer4() {
                if (!supportDom) {
                    return null;
                }
                if (!container.value) {
                    container.value = document.createElement("div");
                    attachToParent(true);
                }
                setWrapperClassName();
                return container.value;
            };
            var setWrapperClassName = function setWrapperClassName2() {
                var wrapperClassName = props.wrapperClassName;
                if (container.value && wrapperClassName && wrapperClassName !== container.value.className) {
                    container.value.className = wrapperClassName;
                }
            };
            onUpdated(function () {
                setWrapperClassName();
                attachToParent();
            });
            var switchScrolling = function switchScrolling2() {
                if (openCount === 1 && !Object.keys(cacheOverflow).length) {
                    switchScrollingEffect();
                    cacheOverflow = setStyle({
                        overflow: "hidden",
                        overflowX: "hidden",
                        overflowY: "hidden"
                    });
                } else if (!openCount) {
                    setStyle(cacheOverflow);
                    cacheOverflow = {};
                    switchScrollingEffect(true);
                }
            };
            var instance = getCurrentInstance();
            onMounted(function () {
                var init = false;
                watch([function () {
                    return props.visible;
                }, function () {
                    return props.getContainer;
                }], function (_ref2, _ref3) {
                    var _ref4 = _slicedToArray$2(_ref2, 2), visible = _ref4[0], getContainer4 = _ref4[1];
                    var _ref5 = _slicedToArray$2(_ref3, 2), prevVisible = _ref5[0], prevGetContainer = _ref5[1];
                    if (supportDom && getParent(props.getContainer) === document.body) {
                        if (visible && !prevVisible) {
                            openCount += 1;
                        } else if (init) {
                            openCount -= 1;
                        }
                    }
                    if (init) {
                        var getContainerIsFunc = typeof getContainer4 === "function" && typeof prevGetContainer === "function";
                        if (getContainerIsFunc ? getContainer4.toString() !== prevGetContainer.toString() : getContainer4 !== prevGetContainer) {
                            removeCurrentContainer();
                        }
                        if (visible && visible !== prevVisible && supportDom && getParent(getContainer4) !== scrollLocker.getContainer()) {
                            scrollLocker.reLock({
                                container: getParent(getContainer4)
                            });
                        }
                    }
                    init = true;
                }, {
                    immediate: true,
                    flush: "post"
                });
                nextTick(function () {
                    if (!attachToParent()) {
                        rafId.value = wrapperRaf(function () {
                            instance.update();
                        });
                    }
                });
            });
            onBeforeUnmount(function () {
                var visible = props.visible, getContainer4 = props.getContainer;
                if (supportDom && getParent(getContainer4) === document.body) {
                    openCount = visible && openCount ? openCount - 1 : openCount;
                }
                removeCurrentContainer();
                wrapperRaf.cancel(rafId.value);
            });
            return function () {
                var forceRender = props.forceRender, visible = props.visible;
                var portal = null;
                var childProps = {
                    getOpenCount: function getOpenCount2() {
                        return openCount;
                    },
                    getContainer: getContainer3,
                    switchScrollingEffect: switchScrolling,
                    scrollLocker
                };
                if (forceRender || visible || componentRef.value) {
                    portal = createVNode(Portal$1, {
                        "getContainer": getContainer3,
                        "ref": componentRef
                    }, {
                        default: function _default2() {
                            var _a;
                            return (_a = slots.default) === null || _a === void 0 ? void 0 : _a.call(slots, childProps);
                        }
                    });
                }
                return portal;
            };
        }
    });

    function dialogPropTypes() {
        return {
            keyboard: {
                type: Boolean,
                default: void 0
            },
            mask: {
                type: Boolean,
                default: void 0
            },
            afterClose: Function,
            closable: {
                type: Boolean,
                default: void 0
            },
            maskClosable: {
                type: Boolean,
                default: void 0
            },
            visible: {
                type: Boolean,
                default: void 0
            },
            destroyOnClose: {
                type: Boolean,
                default: void 0
            },
            mousePosition: PropTypes$1.shape({
                x: Number,
                y: Number
            }).loose,
            title: PropTypes$1.any,
            footer: PropTypes$1.any,
            transitionName: String,
            maskTransitionName: String,
            animation: PropTypes$1.any,
            maskAnimation: PropTypes$1.any,
            wrapStyle: {
                type: Object,
                default: void 0
            },
            bodyStyle: {
                type: Object,
                default: void 0
            },
            maskStyle: {
                type: Object,
                default: void 0
            },
            prefixCls: String,
            wrapClassName: String,
            rootClassName: String,
            width: [String, Number],
            height: [String, Number],
            zIndex: Number,
            bodyProps: PropTypes$1.any,
            maskProps: PropTypes$1.any,
            wrapProps: PropTypes$1.any,
            getContainer: PropTypes$1.any,
            dialogStyle: {
                type: Object,
                default: void 0
            },
            dialogClass: String,
            closeIcon: PropTypes$1.any,
            forceRender: {
                type: Boolean,
                default: void 0
            },
            getOpenCount: Function,
            // https://github.com/ant-design/ant-design/issues/19771
            // https://github.com/react-component/dialog/issues/95
            focusTriggerAfterClose: {
                type: Boolean,
                default: void 0
            },
            onClose: Function,
            modalRender: Function
        };
    }

    function getMotionName(prefixCls, transitionName2, animationName) {
        var motionName = transitionName2;
        if (!motionName && animationName) {
            motionName = "".concat(prefixCls, "-").concat(animationName);
        }
        return motionName;
    }

    var uuid = -1;

    function getUUID() {
        uuid += 1;
        return uuid;
    }

    function getScroll(w2, top) {
        var ret = w2["page".concat(top ? "Y" : "X", "Offset")];
        var method = "scroll".concat(top ? "Top" : "Left");
        if (typeof ret !== "number") {
            var d2 = w2.document;
            ret = d2.documentElement[method];
            if (typeof ret !== "number") {
                ret = d2.body[method];
            }
        }
        return ret;
    }

    function offset(el) {
        var rect = el.getBoundingClientRect();
        var pos = {
            left: rect.left,
            top: rect.top
        };
        var doc2 = el.ownerDocument;
        var w2 = doc2.defaultView || doc2.parentWindow;
        pos.left += getScroll(w2);
        pos.top += getScroll(w2, true);
        return pos;
    }

    var sentinelStyle = {
        width: 0,
        height: 0,
        overflow: "hidden",
        outline: "none"
    };
    const Content = defineComponent({
        name: "Content",
        inheritAttrs: false,
        props: _extends(_extends({}, dialogPropTypes()), {
            motionName: String,
            ariaId: String,
            onVisibleChanged: Function,
            onMousedown: Function,
            onMouseup: Function
        }),
        setup: function setup12(props, _ref) {
            var expose = _ref.expose, slots = _ref.slots, attrs = _ref.attrs;
            var sentinelStartRef = ref();
            var sentinelEndRef = ref();
            var dialogRef = ref();
            expose({
                focus: function focus() {
                    var _a;
                    (_a = sentinelStartRef.value) === null || _a === void 0 ? void 0 : _a.focus();
                },
                changeActive: function changeActive(next) {
                    var _document = document, activeElement = _document.activeElement;
                    if (next && activeElement === sentinelEndRef.value) {
                        sentinelStartRef.value.focus();
                    } else if (!next && activeElement === sentinelStartRef.value) {
                        sentinelEndRef.value.focus();
                    }
                }
            });
            var transformOrigin = ref();
            var contentStyleRef = computed(function () {
                var width = props.width, height = props.height;
                var contentStyle = {};
                if (width !== void 0) {
                    contentStyle.width = typeof width === "number" ? "".concat(width, "px") : width;
                }
                if (height !== void 0) {
                    contentStyle.height = typeof height === "number" ? "".concat(height, "px") : height;
                }
                if (transformOrigin.value) {
                    contentStyle.transformOrigin = transformOrigin.value;
                }
                return contentStyle;
            });
            var onPrepare = function onPrepare2() {
                nextTick(function () {
                    if (dialogRef.value) {
                        var elementOffset = offset(dialogRef.value);
                        transformOrigin.value = props.mousePosition ? "".concat(props.mousePosition.x - elementOffset.left, "px ").concat(props.mousePosition.y - elementOffset.top, "px") : "";
                    }
                });
            };
            var onVisibleChanged = function onVisibleChanged2(visible) {
                props.onVisibleChanged(visible);
            };
            return function () {
                var _a, _b, _c, _d;
                var prefixCls = props.prefixCls, _props$footer = props.footer,
                    footer = _props$footer === void 0 ? (_a = slots.footer) === null || _a === void 0 ? void 0 : _a.call(slots) : _props$footer,
                    _props$title = props.title,
                    title = _props$title === void 0 ? (_b = slots.title) === null || _b === void 0 ? void 0 : _b.call(slots) : _props$title,
                    ariaId = props.ariaId, closable = props.closable, _props$closeIcon = props.closeIcon,
                    closeIcon = _props$closeIcon === void 0 ? (_c = slots.closeIcon) === null || _c === void 0 ? void 0 : _c.call(slots) : _props$closeIcon,
                    onClose = props.onClose, bodyStyle = props.bodyStyle, bodyProps = props.bodyProps,
                    onMousedown = props.onMousedown, onMouseup = props.onMouseup, visible = props.visible,
                    _props$modalRender = props.modalRender,
                    modalRender = _props$modalRender === void 0 ? slots.modalRender : _props$modalRender,
                    destroyOnClose = props.destroyOnClose, motionName = props.motionName;
                var footerNode;
                if (footer) {
                    footerNode = createVNode("div", {
                        "class": "".concat(prefixCls, "-footer")
                    }, [footer]);
                }
                var headerNode;
                if (title) {
                    headerNode = createVNode("div", {
                        "class": "".concat(prefixCls, "-header")
                    }, [createVNode("div", {
                        "class": "".concat(prefixCls, "-title"),
                        "id": ariaId
                    }, [title])]);
                }
                var closer;
                if (closable) {
                    closer = createVNode("button", {
                        "type": "button",
                        "onClick": onClose,
                        "aria-label": "Close",
                        "class": "".concat(prefixCls, "-close")
                    }, [closeIcon || createVNode("span", {
                        "class": "".concat(prefixCls, "-close-x")
                    }, null)]);
                }
                var content = createVNode("div", {
                    "class": "".concat(prefixCls, "-content")
                }, [closer, headerNode, createVNode("div", _objectSpread2({
                    "class": "".concat(prefixCls, "-body"),
                    "style": bodyStyle
                }, bodyProps), [(_d = slots.default) === null || _d === void 0 ? void 0 : _d.call(slots)]), footerNode]);
                var transitionProps = getTransitionProps(motionName);
                return createVNode(Transition, _objectSpread2(_objectSpread2({}, transitionProps), {}, {
                    "onBeforeEnter": onPrepare,
                    "onAfterEnter": function onAfterEnter() {
                        return onVisibleChanged(true);
                    },
                    "onAfterLeave": function onAfterLeave() {
                        return onVisibleChanged(false);
                    }
                }), {
                    default: function _default2() {
                        return [visible || !destroyOnClose ? withDirectives(createVNode("div", _objectSpread2(_objectSpread2({}, attrs), {}, {
                            "ref": dialogRef,
                            "key": "dialog-element",
                            "role": "document",
                            "style": [contentStyleRef.value, attrs.style],
                            "class": [prefixCls, attrs.class],
                            "onMousedown": onMousedown,
                            "onMouseup": onMouseup
                        }), [createVNode("div", {
                            "tabindex": 0,
                            "ref": sentinelStartRef,
                            "style": sentinelStyle,
                            "aria-hidden": "true"
                        }, null), modalRender ? modalRender({
                            originVNode: content
                        }) : content, createVNode("div", {
                            "tabindex": 0,
                            "ref": sentinelEndRef,
                            "style": sentinelStyle,
                            "aria-hidden": "true"
                        }, null)]), [[vShow, visible]]) : null];
                    }
                });
            };
        }
    });

    function _objectDestructuringEmpty(obj) {
        if (obj == null)
            throw new TypeError("Cannot destructure " + obj);
    }

    const Mask = defineComponent({
        name: "Mask",
        props: {
            prefixCls: String,
            visible: Boolean,
            motionName: String,
            maskProps: Object
        },
        setup: function setup13(props, _ref) {
            _objectDestructuringEmpty(_ref);
            return function () {
                var prefixCls = props.prefixCls, visible = props.visible, maskProps = props.maskProps,
                    motionName = props.motionName;
                var transitionProps = getTransitionProps(motionName);
                return createVNode(Transition, transitionProps, {
                    default: function _default2() {
                        return [withDirectives(createVNode("div", _objectSpread2({
                            "class": "".concat(prefixCls, "-mask")
                        }, maskProps), null), [[vShow, visible]])];
                    }
                });
            };
        }
    });
    const Dialog = defineComponent({
        name: "Dialog",
        inheritAttrs: false,
        props: initDefaultProps$1(_extends(_extends({}, dialogPropTypes()), {
            getOpenCount: Function,
            scrollLocker: Object
        }), {
            mask: true,
            visible: false,
            keyboard: true,
            closable: true,
            maskClosable: true,
            destroyOnClose: false,
            prefixCls: "rc-dialog",
            getOpenCount: function getOpenCount() {
                return null;
            },
            focusTriggerAfterClose: true
        }),
        setup: function setup14(props, _ref) {
            var attrs = _ref.attrs, slots = _ref.slots;
            var lastOutSideActiveElementRef = ref();
            var wrapperRef = ref();
            var contentRef = ref();
            var animatedVisible = ref(props.visible);
            var ariaIdRef = ref("vcDialogTitle".concat(getUUID()));
            var onDialogVisibleChanged = function onDialogVisibleChanged2(newVisible) {
                var _a, _b;
                if (newVisible) {
                    if (!contains(wrapperRef.value, document.activeElement)) {
                        lastOutSideActiveElementRef.value = document.activeElement;
                        (_a = contentRef.value) === null || _a === void 0 ? void 0 : _a.focus();
                    }
                } else {
                    var preAnimatedVisible = animatedVisible.value;
                    animatedVisible.value = false;
                    if (props.mask && lastOutSideActiveElementRef.value && props.focusTriggerAfterClose) {
                        try {
                            lastOutSideActiveElementRef.value.focus({
                                preventScroll: true
                            });
                        } catch (e2) {
                        }
                        lastOutSideActiveElementRef.value = null;
                    }
                    if (preAnimatedVisible) {
                        (_b = props.afterClose) === null || _b === void 0 ? void 0 : _b.call(props);
                    }
                }
            };
            var onInternalClose = function onInternalClose2(e2) {
                var _a;
                (_a = props.onClose) === null || _a === void 0 ? void 0 : _a.call(props, e2);
            };
            var contentClickRef = ref(false);
            var contentTimeoutRef = ref();
            var onContentMouseDown = function onContentMouseDown2() {
                clearTimeout(contentTimeoutRef.value);
                contentClickRef.value = true;
            };
            var onContentMouseUp = function onContentMouseUp2() {
                contentTimeoutRef.value = setTimeout(function () {
                    contentClickRef.value = false;
                });
            };
            var onWrapperClick = function onWrapperClick2(e2) {
                if (!props.maskClosable)
                    return null;
                if (contentClickRef.value) {
                    contentClickRef.value = false;
                } else if (wrapperRef.value === e2.target) {
                    onInternalClose(e2);
                }
            };
            var onWrapperKeyDown = function onWrapperKeyDown2(e2) {
                if (props.keyboard && e2.keyCode === KeyCode$1.ESC) {
                    e2.stopPropagation();
                    onInternalClose(e2);
                    return;
                }
                if (props.visible) {
                    if (e2.keyCode === KeyCode$1.TAB) {
                        contentRef.value.changeActive(!e2.shiftKey);
                    }
                }
            };
            watch(function () {
                return props.visible;
            }, function () {
                if (props.visible) {
                    animatedVisible.value = true;
                }
            }, {
                flush: "post"
            });
            onBeforeUnmount(function () {
                var _a;
                clearTimeout(contentTimeoutRef.value);
                (_a = props.scrollLocker) === null || _a === void 0 ? void 0 : _a.unLock();
            });
            watchEffect(function () {
                var _a, _b;
                (_a = props.scrollLocker) === null || _a === void 0 ? void 0 : _a.unLock();
                if (animatedVisible.value) {
                    (_b = props.scrollLocker) === null || _b === void 0 ? void 0 : _b.lock();
                }
            });
            return function () {
                var prefixCls = props.prefixCls, mask = props.mask, visible = props.visible,
                    maskTransitionName = props.maskTransitionName, maskAnimation = props.maskAnimation,
                    zIndex = props.zIndex, wrapClassName = props.wrapClassName, rootClassName = props.rootClassName,
                    wrapStyle = props.wrapStyle, closable = props.closable, maskProps = props.maskProps,
                    maskStyle = props.maskStyle, transitionName2 = props.transitionName, animation = props.animation,
                    wrapProps = props.wrapProps, _props$title = props.title,
                    title = _props$title === void 0 ? slots.title : _props$title;
                var style = attrs.style, className = attrs.class;
                return createVNode("div", _objectSpread2({
                    "class": ["".concat(prefixCls, "-root"), rootClassName]
                }, pickAttrs(props, {
                    data: true
                })), [createVNode(Mask, {
                    "prefixCls": prefixCls,
                    "visible": mask && visible,
                    "motionName": getMotionName(prefixCls, maskTransitionName, maskAnimation),
                    "style": _extends({
                        zIndex
                    }, maskStyle),
                    "maskProps": maskProps
                }, null), createVNode("div", _objectSpread2({
                    "tabIndex": -1,
                    "onKeydown": onWrapperKeyDown,
                    "class": classNames("".concat(prefixCls, "-wrap"), wrapClassName),
                    "ref": wrapperRef,
                    "onClick": onWrapperClick,
                    "role": "dialog",
                    "aria-labelledby": title ? ariaIdRef.value : null,
                    "style": _extends(_extends({
                        zIndex
                    }, wrapStyle), {
                        display: !animatedVisible.value ? "none" : null
                    })
                }, wrapProps), [createVNode(Content, _objectSpread2(_objectSpread2({}, omit(props, ["scrollLocker"])), {}, {
                    "style": style,
                    "class": className,
                    "onMousedown": onContentMouseDown,
                    "onMouseup": onContentMouseUp,
                    "ref": contentRef,
                    "closable": closable,
                    "ariaId": ariaIdRef.value,
                    "prefixCls": prefixCls,
                    "visible": visible,
                    "onClose": onInternalClose,
                    "onVisibleChanged": onDialogVisibleChanged,
                    "motionName": getMotionName(prefixCls, transitionName2, animation)
                }), slots)])]);
            };
        }
    });
    var IDialogPropTypes = dialogPropTypes();
    var DialogWrap = defineComponent({
        name: "DialogWrap",
        inheritAttrs: false,
        props: initDefaultProps$1(IDialogPropTypes, {
            visible: false
        }),
        setup: function setup15(props, _ref) {
            var attrs = _ref.attrs, slots = _ref.slots;
            var animatedVisible = ref(props.visible);
            useProvidePortal({}, {
                inTriggerContext: false
            });
            watch(function () {
                return props.visible;
            }, function () {
                if (props.visible) {
                    animatedVisible.value = true;
                }
            }, {
                flush: "post"
            });
            return function () {
                var visible = props.visible, getContainer3 = props.getContainer, forceRender = props.forceRender,
                    _props$destroyOnClose = props.destroyOnClose,
                    destroyOnClose = _props$destroyOnClose === void 0 ? false : _props$destroyOnClose,
                    _afterClose = props.afterClose;
                var dialogProps = _extends(_extends(_extends({}, props), attrs), {
                    ref: "_component",
                    key: "dialog"
                });
                if (getContainer3 === false) {
                    return createVNode(Dialog, _objectSpread2(_objectSpread2({}, dialogProps), {}, {
                        "getOpenCount": function getOpenCount2() {
                            return 2;
                        }
                    }), slots);
                }
                if (!forceRender && destroyOnClose && !animatedVisible.value) {
                    return null;
                }
                return createVNode(Portal, {
                    "visible": visible,
                    "forceRender": forceRender,
                    "getContainer": getContainer3
                }, {
                    default: function _default2(childProps) {
                        dialogProps = _extends(_extends(_extends({}, dialogProps), childProps), {
                            afterClose: function afterClose() {
                                _afterClose === null || _afterClose === void 0 ? void 0 : _afterClose();
                                animatedVisible.value = false;
                            }
                        });
                        return createVNode(Dialog, dialogProps, slots);
                    }
                });
            };
        }
    });
    const DialogWrap$1 = DialogWrap;
    var __rest = globalThis && globalThis.__rest || function (s2, e2) {
        var t2 = {};
        for (var p2 in s2) {
            if (Object.prototype.hasOwnProperty.call(s2, p2) && e2.indexOf(p2) < 0)
                t2[p2] = s2[p2];
        }
        if (s2 != null && typeof Object.getOwnPropertySymbols === "function")
            for (var i2 = 0, p2 = Object.getOwnPropertySymbols(s2); i2 < p2.length; i2++) {
                if (e2.indexOf(p2[i2]) < 0 && Object.prototype.propertyIsEnumerable.call(s2, p2[i2]))
                    t2[p2[i2]] = s2[p2[i2]];
            }
        return t2;
    };
    var mousePosition = null;
    var getClickPosition = function getClickPosition2(e2) {
        mousePosition = {
            x: e2.pageX,
            y: e2.pageY
        };
        setTimeout(function () {
            return mousePosition = null;
        }, 100);
    };
    if (canUseDocElement()) {
        addEventListenerWrap(document.documentElement, "click", getClickPosition, true);
    }
    var modalProps = function modalProps2() {
        return {
            prefixCls: String,
            visible: {
                type: Boolean,
                default: void 0
            },
            confirmLoading: {
                type: Boolean,
                default: void 0
            },
            title: PropTypes$1.any,
            closable: {
                type: Boolean,
                default: void 0
            },
            closeIcon: PropTypes$1.any,
            onOk: Function,
            onCancel: Function,
            "onUpdate:visible": Function,
            onChange: Function,
            afterClose: Function,
            centered: {
                type: Boolean,
                default: void 0
            },
            width: [String, Number],
            footer: PropTypes$1.any,
            okText: PropTypes$1.any,
            okType: String,
            cancelText: PropTypes$1.any,
            icon: PropTypes$1.any,
            maskClosable: {
                type: Boolean,
                default: void 0
            },
            forceRender: {
                type: Boolean,
                default: void 0
            },
            okButtonProps: Object,
            cancelButtonProps: Object,
            destroyOnClose: {
                type: Boolean,
                default: void 0
            },
            wrapClassName: String,
            maskTransitionName: String,
            transitionName: String,
            getContainer: {
                type: [String, Function, Boolean, Object],
                default: void 0
            },
            zIndex: Number,
            bodyStyle: {
                type: Object,
                default: void 0
            },
            maskStyle: {
                type: Object,
                default: void 0
            },
            mask: {
                type: Boolean,
                default: void 0
            },
            keyboard: {
                type: Boolean,
                default: void 0
            },
            wrapProps: Object,
            focusTriggerAfterClose: {
                type: Boolean,
                default: void 0
            },
            modalRender: Function
        };
    };
    var destroyFns = [];
    const Modal = defineComponent({
        name: "AModal",
        inheritAttrs: false,
        props: initDefaultProps$1(modalProps(), {
            width: 520,
            transitionName: "zoom",
            maskTransitionName: "fade",
            confirmLoading: false,
            visible: false,
            okType: "primary"
        }),
        setup: function setup16(props, _ref) {
            var emit2 = _ref.emit, slots = _ref.slots, attrs = _ref.attrs;
            var _useLocaleReceiver = useLocaleReceiver("Modal"),
                _useLocaleReceiver2 = _slicedToArray$2(_useLocaleReceiver, 1), locale2 = _useLocaleReceiver2[0];
            var _useConfigInject = useConfigInject("modal", props), prefixCls = _useConfigInject.prefixCls,
                rootPrefixCls = _useConfigInject.rootPrefixCls, direction = _useConfigInject.direction,
                getPopupContainer = _useConfigInject.getPopupContainer;
            var handleCancel = function handleCancel2(e2) {
                emit2("update:visible", false);
                emit2("cancel", e2);
                emit2("change", false);
            };
            var handleOk = function handleOk2(e2) {
                emit2("ok", e2);
            };
            var renderFooter = function renderFooter2() {
                var _a, _b;
                var _props$okText = props.okText,
                    okText = _props$okText === void 0 ? (_a = slots.okText) === null || _a === void 0 ? void 0 : _a.call(slots) : _props$okText,
                    okType = props.okType, _props$cancelText = props.cancelText,
                    cancelText = _props$cancelText === void 0 ? (_b = slots.cancelText) === null || _b === void 0 ? void 0 : _b.call(slots) : _props$cancelText,
                    confirmLoading = props.confirmLoading;
                return createVNode(Fragment, null, [createVNode(Button, _objectSpread2({
                    "onClick": handleCancel
                }, props.cancelButtonProps), {
                    default: function _default2() {
                        return [cancelText || locale2.value.cancelText];
                    }
                }), createVNode(Button, _objectSpread2(_objectSpread2({}, convertLegacyProps(okType)), {}, {
                    "loading": confirmLoading,
                    "onClick": handleOk
                }, props.okButtonProps), {
                    default: function _default2() {
                        return [okText || locale2.value.okText];
                    }
                })]);
            };
            return function () {
                var _classNames;
                var _a;
                props.prefixCls;
                var visible = props.visible, wrapClassName = props.wrapClassName, centered = props.centered,
                    getContainer3 = props.getContainer, _props$closeIcon = props.closeIcon,
                    _closeIcon = _props$closeIcon === void 0 ? (_a = slots.closeIcon) === null || _a === void 0 ? void 0 : _a.call(slots) : _props$closeIcon,
                    _props$focusTriggerAf = props.focusTriggerAfterClose,
                    focusTriggerAfterClose = _props$focusTriggerAf === void 0 ? true : _props$focusTriggerAf,
                    restProps = __rest(props, ["prefixCls", "visible", "wrapClassName", "centered", "getContainer", "closeIcon", "focusTriggerAfterClose"]);
                var wrapClassNameExtended = classNames(wrapClassName, (_classNames = {}, _defineProperty$d(_classNames, "".concat(prefixCls.value, "-centered"), !!centered), _defineProperty$d(_classNames, "".concat(prefixCls.value, "-wrap-rtl"), direction.value === "rtl"), _classNames));
                return createVNode(DialogWrap$1, _objectSpread2(_objectSpread2(_objectSpread2({}, restProps), attrs), {}, {
                    "getContainer": getContainer3 || getPopupContainer.value,
                    "prefixCls": prefixCls.value,
                    "wrapClassName": wrapClassNameExtended,
                    "visible": visible,
                    "mousePosition": mousePosition,
                    "onClose": handleCancel,
                    "focusTriggerAfterClose": focusTriggerAfterClose,
                    "transitionName": getTransitionName(rootPrefixCls.value, "zoom", props.transitionName),
                    "maskTransitionName": getTransitionName(rootPrefixCls.value, "fade", props.maskTransitionName)
                }), _extends(_extends({}, slots), {
                    footer: slots.footer || renderFooter,
                    closeIcon: function closeIcon() {
                        return createVNode("span", {
                            "class": "".concat(prefixCls.value, "-close-x")
                        }, [_closeIcon || createVNode(CloseOutlined$1, {
                            "class": "".concat(prefixCls.value, "-close-icon")
                        }, null)]);
                    }
                }));
            };
        }
    });
    var useDestroyed = function useDestroyed2() {
        var destroyed = ref(false);
        onBeforeUnmount(function () {
            destroyed.value = true;
        });
        return destroyed;
    };
    const useDestroyed$1 = useDestroyed;
    var actionButtonProps = {
        type: {
            type: String
        },
        actionFn: Function,
        close: Function,
        autofocus: Boolean,
        prefixCls: String,
        buttonProps: Object,
        emitEvent: Boolean,
        quitOnNullishReturnValue: Boolean
    };

    function isThenable(thing) {
        return !!(thing && !!thing.then);
    }

    const ActionButton = defineComponent({
        name: "ActionButton",
        props: actionButtonProps,
        setup: function setup17(props, _ref) {
            var slots = _ref.slots;
            var clickedRef = ref(false);
            var buttonRef = ref();
            var loading = ref(false);
            var timeoutId;
            var isDestroyed = useDestroyed$1();
            onMounted(function () {
                if (props.autofocus) {
                    timeoutId = setTimeout(function () {
                        var _a;
                        return (_a = buttonRef.value.$el) === null || _a === void 0 ? void 0 : _a.focus();
                    });
                }
            });
            onBeforeUnmount(function () {
                clearTimeout(timeoutId);
            });
            var handlePromiseOnOk = function handlePromiseOnOk2(returnValueOfOnOk) {
                var close3 = props.close;
                if (!isThenable(returnValueOfOnOk)) {
                    return;
                }
                loading.value = true;
                returnValueOfOnOk.then(function () {
                    if (!isDestroyed.value) {
                        loading.value = false;
                    }
                    close3.apply(void 0, arguments);
                    clickedRef.value = false;
                }, function (e2) {
                    console.error(e2);
                    if (!isDestroyed.value) {
                        loading.value = false;
                    }
                    clickedRef.value = false;
                });
            };
            var onClick = function onClick2(e2) {
                var actionFn = props.actionFn, _props$close = props.close,
                    close3 = _props$close === void 0 ? function () {
                    } : _props$close;
                if (clickedRef.value) {
                    return;
                }
                clickedRef.value = true;
                if (!actionFn) {
                    close3();
                    return;
                }
                var returnValueOfOnOk;
                if (props.emitEvent) {
                    returnValueOfOnOk = actionFn(e2);
                    if (props.quitOnNullishReturnValue && !isThenable(returnValueOfOnOk)) {
                        clickedRef.value = false;
                        close3(e2);
                        return;
                    }
                } else if (actionFn.length) {
                    returnValueOfOnOk = actionFn(close3);
                    clickedRef.value = false;
                } else {
                    returnValueOfOnOk = actionFn();
                    if (!returnValueOfOnOk) {
                        close3();
                        return;
                    }
                }
                handlePromiseOnOk(returnValueOfOnOk);
            };
            return function () {
                var type = props.type, prefixCls = props.prefixCls, buttonProps3 = props.buttonProps;
                return createVNode(Button, _objectSpread2(_objectSpread2(_objectSpread2({}, convertLegacyProps(type)), {}, {
                    "onClick": onClick,
                    "loading": loading.value,
                    "prefixCls": prefixCls
                }, buttonProps3), {}, {
                    "ref": buttonRef
                }), slots);
            };
        }
    });

    function renderSomeContent(someContent) {
        if (typeof someContent === "function") {
            return someContent();
        }
        return someContent;
    }

    const ConfirmDialog = defineComponent({
        name: "ConfirmDialog",
        inheritAttrs: false,
        props: ["icon", "onCancel", "onOk", "close", "closable", "zIndex", "afterClose", "visible", "keyboard", "centered", "getContainer", "maskStyle", "okButtonProps", "cancelButtonProps", "okType", "prefixCls", "okCancel", "width", "mask", "maskClosable", "okText", "cancelText", "autoFocusButton", "transitionName", "maskTransitionName", "type", "title", "content", "direction", "rootPrefixCls", "bodyStyle", "closeIcon", "modalRender", "focusTriggerAfterClose", "wrapClassName"],
        setup: function setup18(props, _ref) {
            var attrs = _ref.attrs;
            var _useLocaleReceiver = useLocaleReceiver("Modal"),
                _useLocaleReceiver2 = _slicedToArray$2(_useLocaleReceiver, 1), locale2 = _useLocaleReceiver2[0];
            return function () {
                var icon = props.icon, onCancel = props.onCancel, onOk = props.onOk, close3 = props.close,
                    _props$closable = props.closable, closable = _props$closable === void 0 ? false : _props$closable,
                    zIndex = props.zIndex, afterClose = props.afterClose, visible = props.visible,
                    keyboard = props.keyboard, centered = props.centered, getContainer3 = props.getContainer,
                    maskStyle = props.maskStyle, okButtonProps = props.okButtonProps,
                    cancelButtonProps = props.cancelButtonProps, _props$okCancel = props.okCancel,
                    okCancel = _props$okCancel === void 0 ? true : _props$okCancel, _props$width = props.width,
                    width = _props$width === void 0 ? 416 : _props$width, _props$mask = props.mask,
                    mask = _props$mask === void 0 ? true : _props$mask, _props$maskClosable = props.maskClosable,
                    maskClosable = _props$maskClosable === void 0 ? false : _props$maskClosable, type = props.type,
                    title = props.title, content = props.content, direction = props.direction,
                    closeIcon = props.closeIcon, modalRender = props.modalRender,
                    focusTriggerAfterClose = props.focusTriggerAfterClose, rootPrefixCls = props.rootPrefixCls,
                    bodyStyle = props.bodyStyle, wrapClassName = props.wrapClassName;
                var okType = props.okType || "primary";
                var prefixCls = props.prefixCls || "ant-modal";
                var contentPrefixCls = "".concat(prefixCls, "-confirm");
                var style = attrs.style || {};
                var okText = renderSomeContent(props.okText) || (okCancel ? locale2.value.okText : locale2.value.justOkText);
                var cancelText = renderSomeContent(props.cancelText) || locale2.value.cancelText;
                var autoFocusButton = props.autoFocusButton === null ? false : props.autoFocusButton || "ok";
                var classString = classNames(contentPrefixCls, "".concat(contentPrefixCls, "-").concat(type), "".concat(prefixCls, "-").concat(type), _defineProperty$d({}, "".concat(contentPrefixCls, "-rtl"), direction === "rtl"), attrs.class);
                var cancelButton = okCancel && createVNode(ActionButton, {
                    "actionFn": onCancel,
                    "close": close3,
                    "autofocus": autoFocusButton === "cancel",
                    "buttonProps": cancelButtonProps,
                    "prefixCls": "".concat(rootPrefixCls, "-btn")
                }, {
                    default: function _default2() {
                        return [cancelText];
                    }
                });
                return createVNode(Modal, {
                    "prefixCls": prefixCls,
                    "class": classString,
                    "wrapClassName": classNames(_defineProperty$d({}, "".concat(contentPrefixCls, "-centered"), !!centered), wrapClassName),
                    "onCancel": function onCancel2(e2) {
                        return close3({
                            triggerCancel: true
                        }, e2);
                    },
                    "visible": visible,
                    "title": "",
                    "footer": "",
                    "transitionName": getTransitionName(rootPrefixCls, "zoom", props.transitionName),
                    "maskTransitionName": getTransitionName(rootPrefixCls, "fade", props.maskTransitionName),
                    "mask": mask,
                    "maskClosable": maskClosable,
                    "maskStyle": maskStyle,
                    "style": style,
                    "bodyStyle": bodyStyle,
                    "width": width,
                    "zIndex": zIndex,
                    "afterClose": afterClose,
                    "keyboard": keyboard,
                    "centered": centered,
                    "getContainer": getContainer3,
                    "closable": closable,
                    "closeIcon": closeIcon,
                    "modalRender": modalRender,
                    "focusTriggerAfterClose": focusTriggerAfterClose
                }, {
                    default: function _default2() {
                        return [createVNode("div", {
                            "class": "".concat(contentPrefixCls, "-body-wrapper")
                        }, [createVNode("div", {
                            "class": "".concat(contentPrefixCls, "-body")
                        }, [renderSomeContent(icon), title === void 0 ? null : createVNode("span", {
                            "class": "".concat(contentPrefixCls, "-title")
                        }, [renderSomeContent(title)]), createVNode("div", {
                            "class": "".concat(contentPrefixCls, "-content")
                        }, [renderSomeContent(content)])]), createVNode("div", {
                            "class": "".concat(contentPrefixCls, "-btns")
                        }, [cancelButton, createVNode(ActionButton, {
                            "type": okType,
                            "actionFn": onOk,
                            "close": close3,
                            "autofocus": autoFocusButton === "ok",
                            "buttonProps": okButtonProps,
                            "prefixCls": "".concat(rootPrefixCls, "-btn")
                        }, {
                            default: function _default3() {
                                return [okText];
                            }
                        })])])];
                    }
                });
            };
        }
    });
    var confirm = function confirm2(config) {
        var container = document.createDocumentFragment();
        var currentConfig = _extends(_extends({}, omit(config, ["parentContext", "appContext"])), {
            close: close3,
            visible: true
        });
        var confirmDialogInstance = null;

        function destroy3() {
            if (confirmDialogInstance) {
                render(null, container);
                confirmDialogInstance.component.update();
                confirmDialogInstance = null;
            }
            for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
                args[_key] = arguments[_key];
            }
            var triggerCancel = args.some(function (param) {
                return param && param.triggerCancel;
            });
            if (config.onCancel && triggerCancel) {
                config.onCancel.apply(config, args);
            }
            for (var i2 = 0; i2 < destroyFns.length; i2++) {
                var fn = destroyFns[i2];
                if (fn === close3) {
                    destroyFns.splice(i2, 1);
                    break;
                }
            }
        }

        function close3() {
            var _this = this;
            for (var _len2 = arguments.length, args = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
                args[_key2] = arguments[_key2];
            }
            currentConfig = _extends(_extends({}, currentConfig), {
                visible: false,
                afterClose: function afterClose() {
                    if (typeof config.afterClose === "function") {
                        config.afterClose();
                    }
                    destroy3.apply(_this, args);
                }
            });
            update(currentConfig);
        }

        function update(configUpdate) {
            if (typeof configUpdate === "function") {
                currentConfig = configUpdate(currentConfig);
            } else {
                currentConfig = _extends(_extends({}, currentConfig), configUpdate);
            }
            if (confirmDialogInstance) {
                _extends(confirmDialogInstance.component.props, currentConfig);
                confirmDialogInstance.component.update();
            }
        }

        var Wrapper = function Wrapper2(p2) {
            var global2 = globalConfigForApi;
            var rootPrefixCls = global2.prefixCls;
            var prefixCls = p2.prefixCls || "".concat(rootPrefixCls, "-modal");
            return createVNode(ConfigProvider, _objectSpread2(_objectSpread2({}, global2), {}, {
                "notUpdateGlobalConfig": true,
                "prefixCls": rootPrefixCls
            }), {
                default: function _default2() {
                    return [createVNode(ConfirmDialog, _objectSpread2(_objectSpread2({}, p2), {}, {
                        "rootPrefixCls": rootPrefixCls,
                        "prefixCls": prefixCls
                    }), null)];
                }
            });
        };

        function render$1(props) {
            var vm = createVNode(Wrapper, _extends({}, props));
            vm.appContext = config.parentContext || config.appContext || vm.appContext;
            render(vm, container);
            return vm;
        }

        confirmDialogInstance = render$1(currentConfig);
        destroyFns.push(close3);
        return {
            destroy: close3,
            update
        };
    };
    const confirm$1 = confirm;

    function withWarn(props) {
        return _extends(_extends({
            icon: function icon() {
                return createVNode(ExclamationCircleOutlined$1, null, null);
            },
            okCancel: false
        }, props), {
            type: "warning"
        });
    }

    function withInfo(props) {
        return _extends(_extends({
            icon: function icon() {
                return createVNode(InfoCircleOutlined$1, null, null);
            },
            okCancel: false
        }, props), {
            type: "info"
        });
    }

    function withSuccess(props) {
        return _extends(_extends({
            icon: function icon() {
                return createVNode(CheckCircleOutlined$1, null, null);
            },
            okCancel: false
        }, props), {
            type: "success"
        });
    }

    function withError(props) {
        return _extends(_extends({
            icon: function icon() {
                return createVNode(CloseCircleOutlined$1, null, null);
            },
            okCancel: false
        }, props), {
            type: "error"
        });
    }

    function withConfirm(props) {
        return _extends(_extends({
            icon: function icon() {
                return createVNode(ExclamationCircleOutlined$1, null, null);
            },
            okCancel: true
        }, props), {
            type: "confirm"
        });
    }

    function modalWarn(props) {
        return confirm$1(withWarn(props));
    }

    Modal.info = function infoFn(props) {
        return confirm$1(withInfo(props));
    };
    Modal.success = function successFn(props) {
        return confirm$1(withSuccess(props));
    };
    Modal.error = function errorFn(props) {
        return confirm$1(withError(props));
    };
    Modal.warning = modalWarn;
    Modal.warn = modalWarn;
    Modal.confirm = function confirmFn(props) {
        return confirm$1(withConfirm(props));
    };
    Modal.destroyAll = function destroyAllFn() {
        while (destroyFns.length) {
            var close3 = destroyFns.pop();
            if (close3) {
                close3();
            }
        }
    };
    Modal.install = function (app) {
        app.component(Modal.name, Modal);
        return app;
    };
    const _default = "";
    const index$2 = "";
    const index$1 = "";
    const index = "";
    let hide = 0;
    let key = "loading";
    let close2 = null;
    window.load = {
        loading(text = "加载中...") {
            close2 = message.loading({
                content: text,
                key,
                duration: 0,
                style: {
                    zIndex: 2e7
                }
            });
            hide++;
        },
        loaded() {
            if (hide > 0) {
                hide--;
                if (hide == 0 && !!close2)
                    close2();
            } else {
                if (!!close2)
                    close2();
            }
        },
        error(text = "加载异常") {
            message.error({
                content: text,
                style: {
                    zIndex: 2e7
                }
            });
        },
        success(text = "ok!") {
            message.success({
                content: text,
                style: {
                    zIndex: 2e7
                }
            });
        },
        info(text, config) {
            Modal.info(Object.assign({
                title: "提示",
                centered: true,
                cancelText: "取消",
                okText: "确定",
                content: h$1("div", {style: "font-size:18px;line-height:1.7;", innerHTML: text}),
                maskClosable: false
            }, config));
        },
        warning(text, config) {
            Modal.warning(Object.assign({
                title: "提示",
                centered: true,
                cancelText: "取消",
                okText: "确定",
                content: h$1("div", {style: "font-size:18px;line-height:1.7;", innerHTML: text}),
                maskClosable: false
            }, config));
        },
        confirm(text, title = "提示", confirm3 = null, cancel = null, config = {}) {
            Modal.confirm(Object.assign({
                title: h$1("div", {style: "font-size:18px;line-height:1.7;", innerHTML: title}),
                centered: true,
                content: h$1("div", {style: "font-size:18px;line-height:1.7;", innerHTML: text}),
                cancelText: "取消",
                okText: "确定",
                maskClosable: false,
                onOk: (close3) => {
                    close3();
                    if (confirm3) {
                        confirm3();
                    }
                },
                onCancel(close3) {
                    close3();
                    if (cancel) {
                        cancel();
                    }
                }
            }, config));
        }
    };
//# sourceMappingURL=index-9137e550.js.map


})();
//# sourceMappingURL=index-0f34894c.js.map
