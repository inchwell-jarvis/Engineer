(global["webpackJsonp"] = global["webpackJsonp"] || []).push([["common/vendor"],{

/***/ 1:
/*!************************************************************!*\
  !*** ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js ***!
  \************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.createApp = createApp;exports.createComponent = createComponent;exports.createPage = createPage;exports.default = void 0;var _vue = _interopRequireDefault(__webpack_require__(/*! vue */ 2));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}function _objectSpread(target) {for (var i = 1; i < arguments.length; i++) {var source = arguments[i] != null ? arguments[i] : {};var ownKeys = Object.keys(source);if (typeof Object.getOwnPropertySymbols === 'function') {ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) {return Object.getOwnPropertyDescriptor(source, sym).enumerable;}));}ownKeys.forEach(function (key) {_defineProperty(target, key, source[key]);});}return target;}function _slicedToArray(arr, i) {return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest();}function _nonIterableRest() {throw new TypeError("Invalid attempt to destructure non-iterable instance");}function _iterableToArrayLimit(arr, i) {var _arr = [];var _n = true;var _d = false;var _e = undefined;try {for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {_arr.push(_s.value);if (i && _arr.length === i) break;}} catch (err) {_d = true;_e = err;} finally {try {if (!_n && _i["return"] != null) _i["return"]();} finally {if (_d) throw _e;}}return _arr;}function _arrayWithHoles(arr) {if (Array.isArray(arr)) return arr;}function _defineProperty(obj, key, value) {if (key in obj) {Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true });} else {obj[key] = value;}return obj;}function _toConsumableArray(arr) {return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread();}function _nonIterableSpread() {throw new TypeError("Invalid attempt to spread non-iterable instance");}function _iterableToArray(iter) {if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter);}function _arrayWithoutHoles(arr) {if (Array.isArray(arr)) {for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) {arr2[i] = arr[i];}return arr2;}}

var _toString = Object.prototype.toString;
var hasOwnProperty = Object.prototype.hasOwnProperty;

function isFn(fn) {
  return typeof fn === 'function';
}

function isStr(str) {
  return typeof str === 'string';
}

function isPlainObject(obj) {
  return _toString.call(obj) === '[object Object]';
}

function hasOwn(obj, key) {
  return hasOwnProperty.call(obj, key);
}

function noop() {}

/**
                    * Create a cached version of a pure function.
                    */
function cached(fn) {
  var cache = Object.create(null);
  return function cachedFn(str) {
    var hit = cache[str];
    return hit || (cache[str] = fn(str));
  };
}

/**
   * Camelize a hyphen-delimited string.
   */
var camelizeRE = /-(\w)/g;
var camelize = cached(function (str) {
  return str.replace(camelizeRE, function (_, c) {return c ? c.toUpperCase() : '';});
});

var HOOKS = [
'invoke',
'success',
'fail',
'complete',
'returnValue'];


var globalInterceptors = {};
var scopedInterceptors = {};

function mergeHook(parentVal, childVal) {
  var res = childVal ?
  parentVal ?
  parentVal.concat(childVal) :
  Array.isArray(childVal) ?
  childVal : [childVal] :
  parentVal;
  return res ?
  dedupeHooks(res) :
  res;
}

function dedupeHooks(hooks) {
  var res = [];
  for (var i = 0; i < hooks.length; i++) {
    if (res.indexOf(hooks[i]) === -1) {
      res.push(hooks[i]);
    }
  }
  return res;
}

function removeHook(hooks, hook) {
  var index = hooks.indexOf(hook);
  if (index !== -1) {
    hooks.splice(index, 1);
  }
}

function mergeInterceptorHook(interceptor, option) {
  Object.keys(option).forEach(function (hook) {
    if (HOOKS.indexOf(hook) !== -1 && isFn(option[hook])) {
      interceptor[hook] = mergeHook(interceptor[hook], option[hook]);
    }
  });
}

function removeInterceptorHook(interceptor, option) {
  if (!interceptor || !option) {
    return;
  }
  Object.keys(option).forEach(function (hook) {
    if (HOOKS.indexOf(hook) !== -1 && isFn(option[hook])) {
      removeHook(interceptor[hook], option[hook]);
    }
  });
}

function addInterceptor(method, option) {
  if (typeof method === 'string' && isPlainObject(option)) {
    mergeInterceptorHook(scopedInterceptors[method] || (scopedInterceptors[method] = {}), option);
  } else if (isPlainObject(method)) {
    mergeInterceptorHook(globalInterceptors, method);
  }
}

function removeInterceptor(method, option) {
  if (typeof method === 'string') {
    if (isPlainObject(option)) {
      removeInterceptorHook(scopedInterceptors[method], option);
    } else {
      delete scopedInterceptors[method];
    }
  } else if (isPlainObject(method)) {
    removeInterceptorHook(globalInterceptors, method);
  }
}

function wrapperHook(hook) {
  return function (data) {
    return hook(data) || data;
  };
}

function isPromise(obj) {
  return !!obj && (typeof obj === 'object' || typeof obj === 'function') && typeof obj.then === 'function';
}

function queue(hooks, data) {
  var promise = false;
  for (var i = 0; i < hooks.length; i++) {
    var hook = hooks[i];
    if (promise) {
      promise = Promise.then(wrapperHook(hook));
    } else {
      var res = hook(data);
      if (isPromise(res)) {
        promise = Promise.resolve(res);
      }
      if (res === false) {
        return {
          then: function then() {} };

      }
    }
  }
  return promise || {
    then: function then(callback) {
      return callback(data);
    } };

}

function wrapperOptions(interceptor) {var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  ['success', 'fail', 'complete'].forEach(function (name) {
    if (Array.isArray(interceptor[name])) {
      var oldCallback = options[name];
      options[name] = function callbackInterceptor(res) {
        queue(interceptor[name], res).then(function (res) {
          /* eslint-disable no-mixed-operators */
          return isFn(oldCallback) && oldCallback(res) || res;
        });
      };
    }
  });
  return options;
}

function wrapperReturnValue(method, returnValue) {
  var returnValueHooks = [];
  if (Array.isArray(globalInterceptors.returnValue)) {
    returnValueHooks.push.apply(returnValueHooks, _toConsumableArray(globalInterceptors.returnValue));
  }
  var interceptor = scopedInterceptors[method];
  if (interceptor && Array.isArray(interceptor.returnValue)) {
    returnValueHooks.push.apply(returnValueHooks, _toConsumableArray(interceptor.returnValue));
  }
  returnValueHooks.forEach(function (hook) {
    returnValue = hook(returnValue) || returnValue;
  });
  return returnValue;
}

function getApiInterceptorHooks(method) {
  var interceptor = Object.create(null);
  Object.keys(globalInterceptors).forEach(function (hook) {
    if (hook !== 'returnValue') {
      interceptor[hook] = globalInterceptors[hook].slice();
    }
  });
  var scopedInterceptor = scopedInterceptors[method];
  if (scopedInterceptor) {
    Object.keys(scopedInterceptor).forEach(function (hook) {
      if (hook !== 'returnValue') {
        interceptor[hook] = (interceptor[hook] || []).concat(scopedInterceptor[hook]);
      }
    });
  }
  return interceptor;
}

function invokeApi(method, api, options) {for (var _len = arguments.length, params = new Array(_len > 3 ? _len - 3 : 0), _key = 3; _key < _len; _key++) {params[_key - 3] = arguments[_key];}
  var interceptor = getApiInterceptorHooks(method);
  if (interceptor && Object.keys(interceptor).length) {
    if (Array.isArray(interceptor.invoke)) {
      var res = queue(interceptor.invoke, options);
      return res.then(function (options) {
        return api.apply(void 0, [wrapperOptions(interceptor, options)].concat(params));
      });
    } else {
      return api.apply(void 0, [wrapperOptions(interceptor, options)].concat(params));
    }
  }
  return api.apply(void 0, [options].concat(params));
}

var promiseInterceptor = {
  returnValue: function returnValue(res) {
    if (!isPromise(res)) {
      return res;
    }
    return res.then(function (res) {
      return res[1];
    }).catch(function (res) {
      return res[0];
    });
  } };


var SYNC_API_RE =
/^\$|restoreGlobal|getCurrentSubNVue|getMenuButtonBoundingClientRect|^report|interceptors|Interceptor$|getSubNVueById|requireNativePlugin|upx2px|hideKeyboard|canIUse|^create|Sync$|Manager$|base64ToArrayBuffer|arrayBufferToBase64/;

var CONTEXT_API_RE = /^create|Manager$/;

var CALLBACK_API_RE = /^on/;

function isContextApi(name) {
  return CONTEXT_API_RE.test(name);
}
function isSyncApi(name) {
  return SYNC_API_RE.test(name);
}

function isCallbackApi(name) {
  return CALLBACK_API_RE.test(name) && name !== 'onPush';
}

function handlePromise(promise) {
  return promise.then(function (data) {
    return [null, data];
  }).
  catch(function (err) {return [err];});
}

function shouldPromise(name) {
  if (
  isContextApi(name) ||
  isSyncApi(name) ||
  isCallbackApi(name))
  {
    return false;
  }
  return true;
}

function promisify(name, api) {
  if (!shouldPromise(name)) {
    return api;
  }
  return function promiseApi() {var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};for (var _len2 = arguments.length, params = new Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {params[_key2 - 1] = arguments[_key2];}
    if (isFn(options.success) || isFn(options.fail) || isFn(options.complete)) {
      return wrapperReturnValue(name, invokeApi.apply(void 0, [name, api, options].concat(params)));
    }
    return wrapperReturnValue(name, handlePromise(new Promise(function (resolve, reject) {
      invokeApi.apply(void 0, [name, api, Object.assign({}, options, {
        success: resolve,
        fail: reject })].concat(
      params));
      /* eslint-disable no-extend-native */
      if (!Promise.prototype.finally) {
        Promise.prototype.finally = function (callback) {
          var promise = this.constructor;
          return this.then(
          function (value) {return promise.resolve(callback()).then(function () {return value;});},
          function (reason) {return promise.resolve(callback()).then(function () {
              throw reason;
            });});

        };
      }
    })));
  };
}

var EPS = 1e-4;
var BASE_DEVICE_WIDTH = 750;
var isIOS = false;
var deviceWidth = 0;
var deviceDPR = 0;

function checkDeviceWidth() {var _wx$getSystemInfoSync =




  wx.getSystemInfoSync(),platform = _wx$getSystemInfoSync.platform,pixelRatio = _wx$getSystemInfoSync.pixelRatio,windowWidth = _wx$getSystemInfoSync.windowWidth; // uni=>wx runtime 编译目标是 uni 对象，内部不允许直接使用 uni

  deviceWidth = windowWidth;
  deviceDPR = pixelRatio;
  isIOS = platform === 'ios';
}

function upx2px(number, newDeviceWidth) {
  if (deviceWidth === 0) {
    checkDeviceWidth();
  }

  number = Number(number);
  if (number === 0) {
    return 0;
  }
  var result = number / BASE_DEVICE_WIDTH * (newDeviceWidth || deviceWidth);
  if (result < 0) {
    result = -result;
  }
  result = Math.floor(result + EPS);
  if (result === 0) {
    if (deviceDPR === 1 || !isIOS) {
      return 1;
    } else {
      return 0.5;
    }
  }
  return number < 0 ? -result : result;
}

var interceptors = {
  promiseInterceptor: promiseInterceptor };




var baseApi = /*#__PURE__*/Object.freeze({
  __proto__: null,
  upx2px: upx2px,
  interceptors: interceptors,
  addInterceptor: addInterceptor,
  removeInterceptor: removeInterceptor });


var previewImage = {
  args: function args(fromArgs) {
    var currentIndex = parseInt(fromArgs.current);
    if (isNaN(currentIndex)) {
      return;
    }
    var urls = fromArgs.urls;
    if (!Array.isArray(urls)) {
      return;
    }
    var len = urls.length;
    if (!len) {
      return;
    }
    if (currentIndex < 0) {
      currentIndex = 0;
    } else if (currentIndex >= len) {
      currentIndex = len - 1;
    }
    if (currentIndex > 0) {
      fromArgs.current = urls[currentIndex];
      fromArgs.urls = urls.filter(
      function (item, index) {return index < currentIndex ? item !== urls[currentIndex] : true;});

    } else {
      fromArgs.current = urls[0];
    }
    return {
      indicator: false,
      loop: false };

  } };


function addSafeAreaInsets(result) {
  if (result.safeArea) {
    var safeArea = result.safeArea;
    result.safeAreaInsets = {
      top: safeArea.top,
      left: safeArea.left,
      right: result.windowWidth - safeArea.right,
      bottom: result.windowHeight - safeArea.bottom };

  }
}
var protocols = {
  previewImage: previewImage,
  getSystemInfo: {
    returnValue: addSafeAreaInsets },

  getSystemInfoSync: {
    returnValue: addSafeAreaInsets } };


var todos = [
'vibrate'];

var canIUses = [];

var CALLBACKS = ['success', 'fail', 'cancel', 'complete'];

function processCallback(methodName, method, returnValue) {
  return function (res) {
    return method(processReturnValue(methodName, res, returnValue));
  };
}

function processArgs(methodName, fromArgs) {var argsOption = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};var returnValue = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};var keepFromArgs = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : false;
  if (isPlainObject(fromArgs)) {// 一般 api 的参数解析
    var toArgs = keepFromArgs === true ? fromArgs : {}; // returnValue 为 false 时，说明是格式化返回值，直接在返回值对象上修改赋值
    if (isFn(argsOption)) {
      argsOption = argsOption(fromArgs, toArgs) || {};
    }
    for (var key in fromArgs) {
      if (hasOwn(argsOption, key)) {
        var keyOption = argsOption[key];
        if (isFn(keyOption)) {
          keyOption = keyOption(fromArgs[key], fromArgs, toArgs);
        }
        if (!keyOption) {// 不支持的参数
          console.warn("\u5FAE\u4FE1\u5C0F\u7A0B\u5E8F ".concat(methodName, "\u6682\u4E0D\u652F\u6301").concat(key));
        } else if (isStr(keyOption)) {// 重写参数 key
          toArgs[keyOption] = fromArgs[key];
        } else if (isPlainObject(keyOption)) {// {name:newName,value:value}可重新指定参数 key:value
          toArgs[keyOption.name ? keyOption.name : key] = keyOption.value;
        }
      } else if (CALLBACKS.indexOf(key) !== -1) {
        toArgs[key] = processCallback(methodName, fromArgs[key], returnValue);
      } else {
        if (!keepFromArgs) {
          toArgs[key] = fromArgs[key];
        }
      }
    }
    return toArgs;
  } else if (isFn(fromArgs)) {
    fromArgs = processCallback(methodName, fromArgs, returnValue);
  }
  return fromArgs;
}

function processReturnValue(methodName, res, returnValue) {var keepReturnValue = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;
  if (isFn(protocols.returnValue)) {// 处理通用 returnValue
    res = protocols.returnValue(methodName, res);
  }
  return processArgs(methodName, res, returnValue, {}, keepReturnValue);
}

function wrapper(methodName, method) {
  if (hasOwn(protocols, methodName)) {
    var protocol = protocols[methodName];
    if (!protocol) {// 暂不支持的 api
      return function () {
        console.error("\u5FAE\u4FE1\u5C0F\u7A0B\u5E8F \u6682\u4E0D\u652F\u6301".concat(methodName));
      };
    }
    return function (arg1, arg2) {// 目前 api 最多两个参数
      var options = protocol;
      if (isFn(protocol)) {
        options = protocol(arg1);
      }

      arg1 = processArgs(methodName, arg1, options.args, options.returnValue);

      var args = [arg1];
      if (typeof arg2 !== 'undefined') {
        args.push(arg2);
      }
      var returnValue = wx[options.name || methodName].apply(wx, args);
      if (isSyncApi(methodName)) {// 同步 api
        return processReturnValue(methodName, returnValue, options.returnValue, isContextApi(methodName));
      }
      return returnValue;
    };
  }
  return method;
}

var todoApis = Object.create(null);

var TODOS = [
'onTabBarMidButtonTap',
'subscribePush',
'unsubscribePush',
'onPush',
'offPush',
'share'];


function createTodoApi(name) {
  return function todoApi(_ref)


  {var fail = _ref.fail,complete = _ref.complete;
    var res = {
      errMsg: "".concat(name, ":fail:\u6682\u4E0D\u652F\u6301 ").concat(name, " \u65B9\u6CD5") };

    isFn(fail) && fail(res);
    isFn(complete) && complete(res);
  };
}

TODOS.forEach(function (name) {
  todoApis[name] = createTodoApi(name);
});

var providers = {
  oauth: ['weixin'],
  share: ['weixin'],
  payment: ['wxpay'],
  push: ['weixin'] };


function getProvider(_ref2)




{var service = _ref2.service,success = _ref2.success,fail = _ref2.fail,complete = _ref2.complete;
  var res = false;
  if (providers[service]) {
    res = {
      errMsg: 'getProvider:ok',
      service: service,
      provider: providers[service] };

    isFn(success) && success(res);
  } else {
    res = {
      errMsg: 'getProvider:fail:服务[' + service + ']不存在' };

    isFn(fail) && fail(res);
  }
  isFn(complete) && complete(res);
}

var extraApi = /*#__PURE__*/Object.freeze({
  __proto__: null,
  getProvider: getProvider });


var getEmitter = function () {
  if (typeof getUniEmitter === 'function') {
    /* eslint-disable no-undef */
    return getUniEmitter;
  }
  var Emitter;
  return function getUniEmitter() {
    if (!Emitter) {
      Emitter = new _vue.default();
    }
    return Emitter;
  };
}();

function apply(ctx, method, args) {
  return ctx[method].apply(ctx, args);
}

function $on() {
  return apply(getEmitter(), '$on', Array.prototype.slice.call(arguments));
}
function $off() {
  return apply(getEmitter(), '$off', Array.prototype.slice.call(arguments));
}
function $once() {
  return apply(getEmitter(), '$once', Array.prototype.slice.call(arguments));
}
function $emit() {
  return apply(getEmitter(), '$emit', Array.prototype.slice.call(arguments));
}

var eventApi = /*#__PURE__*/Object.freeze({
  __proto__: null,
  $on: $on,
  $off: $off,
  $once: $once,
  $emit: $emit });




var api = /*#__PURE__*/Object.freeze({
  __proto__: null });


var MPPage = Page;
var MPComponent = Component;

var customizeRE = /:/g;

var customize = cached(function (str) {
  return camelize(str.replace(customizeRE, '-'));
});

function initTriggerEvent(mpInstance) {
  {
    if (!wx.canIUse('nextTick')) {
      return;
    }
  }
  var oldTriggerEvent = mpInstance.triggerEvent;
  mpInstance.triggerEvent = function (event) {for (var _len3 = arguments.length, args = new Array(_len3 > 1 ? _len3 - 1 : 0), _key3 = 1; _key3 < _len3; _key3++) {args[_key3 - 1] = arguments[_key3];}
    return oldTriggerEvent.apply(mpInstance, [customize(event)].concat(args));
  };
}

function initHook(name, options) {
  var oldHook = options[name];
  if (!oldHook) {
    options[name] = function () {
      initTriggerEvent(this);
    };
  } else {
    options[name] = function () {
      initTriggerEvent(this);for (var _len4 = arguments.length, args = new Array(_len4), _key4 = 0; _key4 < _len4; _key4++) {args[_key4] = arguments[_key4];}
      return oldHook.apply(this, args);
    };
  }
}

Page = function Page() {var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  initHook('onLoad', options);
  return MPPage(options);
};

Component = function Component() {var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  initHook('created', options);
  return MPComponent(options);
};

var PAGE_EVENT_HOOKS = [
'onPullDownRefresh',
'onReachBottom',
'onShareAppMessage',
'onPageScroll',
'onResize',
'onTabItemTap'];


function initMocks(vm, mocks) {
  var mpInstance = vm.$mp[vm.mpType];
  mocks.forEach(function (mock) {
    if (hasOwn(mpInstance, mock)) {
      vm[mock] = mpInstance[mock];
    }
  });
}

function hasHook(hook, vueOptions) {
  if (!vueOptions) {
    return true;
  }

  if (_vue.default.options && Array.isArray(_vue.default.options[hook])) {
    return true;
  }

  vueOptions = vueOptions.default || vueOptions;

  if (isFn(vueOptions)) {
    if (isFn(vueOptions.extendOptions[hook])) {
      return true;
    }
    if (vueOptions.super &&
    vueOptions.super.options &&
    Array.isArray(vueOptions.super.options[hook])) {
      return true;
    }
    return false;
  }

  if (isFn(vueOptions[hook])) {
    return true;
  }
  var mixins = vueOptions.mixins;
  if (Array.isArray(mixins)) {
    return !!mixins.find(function (mixin) {return hasHook(hook, mixin);});
  }
}

function initHooks(mpOptions, hooks, vueOptions) {
  hooks.forEach(function (hook) {
    if (hasHook(hook, vueOptions)) {
      mpOptions[hook] = function (args) {
        return this.$vm && this.$vm.__call_hook(hook, args);
      };
    }
  });
}

function initVueComponent(Vue, vueOptions) {
  vueOptions = vueOptions.default || vueOptions;
  var VueComponent;
  if (isFn(vueOptions)) {
    VueComponent = vueOptions;
    vueOptions = VueComponent.extendOptions;
  } else {
    VueComponent = Vue.extend(vueOptions);
  }
  return [VueComponent, vueOptions];
}

function initSlots(vm, vueSlots) {
  if (Array.isArray(vueSlots) && vueSlots.length) {
    var $slots = Object.create(null);
    vueSlots.forEach(function (slotName) {
      $slots[slotName] = true;
    });
    vm.$scopedSlots = vm.$slots = $slots;
  }
}

function initVueIds(vueIds, mpInstance) {
  vueIds = (vueIds || '').split(',');
  var len = vueIds.length;

  if (len === 1) {
    mpInstance._$vueId = vueIds[0];
  } else if (len === 2) {
    mpInstance._$vueId = vueIds[0];
    mpInstance._$vuePid = vueIds[1];
  }
}

function initData(vueOptions, context) {
  var data = vueOptions.data || {};
  var methods = vueOptions.methods || {};

  if (typeof data === 'function') {
    try {
      data = data.call(context); // 支持 Vue.prototype 上挂的数据
    } catch (e) {
      if (Object({"NODE_ENV":"development","VUE_APP_PLATFORM":"mp-weixin","BASE_URL":"/"}).VUE_APP_DEBUG) {
        console.warn('根据 Vue 的 data 函数初始化小程序 data 失败，请尽量确保 data 函数中不访问 vm 对象，否则可能影响首次数据渲染速度。', data);
      }
    }
  } else {
    try {
      // 对 data 格式化
      data = JSON.parse(JSON.stringify(data));
    } catch (e) {}
  }

  if (!isPlainObject(data)) {
    data = {};
  }

  Object.keys(methods).forEach(function (methodName) {
    if (context.__lifecycle_hooks__.indexOf(methodName) === -1 && !hasOwn(data, methodName)) {
      data[methodName] = methods[methodName];
    }
  });

  return data;
}

var PROP_TYPES = [String, Number, Boolean, Object, Array, null];

function createObserver(name) {
  return function observer(newVal, oldVal) {
    if (this.$vm) {
      this.$vm[name] = newVal; // 为了触发其他非 render watcher
    }
  };
}

function initBehaviors(vueOptions, initBehavior) {
  var vueBehaviors = vueOptions['behaviors'];
  var vueExtends = vueOptions['extends'];
  var vueMixins = vueOptions['mixins'];

  var vueProps = vueOptions['props'];

  if (!vueProps) {
    vueOptions['props'] = vueProps = [];
  }

  var behaviors = [];
  if (Array.isArray(vueBehaviors)) {
    vueBehaviors.forEach(function (behavior) {
      behaviors.push(behavior.replace('uni://', "wx".concat("://")));
      if (behavior === 'uni://form-field') {
        if (Array.isArray(vueProps)) {
          vueProps.push('name');
          vueProps.push('value');
        } else {
          vueProps['name'] = {
            type: String,
            default: '' };

          vueProps['value'] = {
            type: [String, Number, Boolean, Array, Object, Date],
            default: '' };

        }
      }
    });
  }
  if (isPlainObject(vueExtends) && vueExtends.props) {
    behaviors.push(
    initBehavior({
      properties: initProperties(vueExtends.props, true) }));


  }
  if (Array.isArray(vueMixins)) {
    vueMixins.forEach(function (vueMixin) {
      if (isPlainObject(vueMixin) && vueMixin.props) {
        behaviors.push(
        initBehavior({
          properties: initProperties(vueMixin.props, true) }));


      }
    });
  }
  return behaviors;
}

function parsePropType(key, type, defaultValue, file) {
  // [String]=>String
  if (Array.isArray(type) && type.length === 1) {
    return type[0];
  }
  return type;
}

function initProperties(props) {var isBehavior = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;var file = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : '';
  var properties = {};
  if (!isBehavior) {
    properties.vueId = {
      type: String,
      value: '' };

    properties.vueSlots = { // 小程序不能直接定义 $slots 的 props，所以通过 vueSlots 转换到 $slots
      type: null,
      value: [],
      observer: function observer(newVal, oldVal) {
        var $slots = Object.create(null);
        newVal.forEach(function (slotName) {
          $slots[slotName] = true;
        });
        this.setData({
          $slots: $slots });

      } };

  }
  if (Array.isArray(props)) {// ['title']
    props.forEach(function (key) {
      properties[key] = {
        type: null,
        observer: createObserver(key) };

    });
  } else if (isPlainObject(props)) {// {title:{type:String,default:''},content:String}
    Object.keys(props).forEach(function (key) {
      var opts = props[key];
      if (isPlainObject(opts)) {// title:{type:String,default:''}
        var value = opts['default'];
        if (isFn(value)) {
          value = value();
        }

        opts.type = parsePropType(key, opts.type);

        properties[key] = {
          type: PROP_TYPES.indexOf(opts.type) !== -1 ? opts.type : null,
          value: value,
          observer: createObserver(key) };

      } else {// content:String
        var type = parsePropType(key, opts);
        properties[key] = {
          type: PROP_TYPES.indexOf(type) !== -1 ? type : null,
          observer: createObserver(key) };

      }
    });
  }
  return properties;
}

function wrapper$1(event) {
  // TODO 又得兼容 mpvue 的 mp 对象
  try {
    event.mp = JSON.parse(JSON.stringify(event));
  } catch (e) {}

  event.stopPropagation = noop;
  event.preventDefault = noop;

  event.target = event.target || {};

  if (!hasOwn(event, 'detail')) {
    event.detail = {};
  }

  if (isPlainObject(event.detail)) {
    event.target = Object.assign({}, event.target, event.detail);
  }

  return event;
}

function getExtraValue(vm, dataPathsArray) {
  var context = vm;
  dataPathsArray.forEach(function (dataPathArray) {
    var dataPath = dataPathArray[0];
    var value = dataPathArray[2];
    if (dataPath || typeof value !== 'undefined') {// ['','',index,'disable']
      var propPath = dataPathArray[1];
      var valuePath = dataPathArray[3];

      var vFor = dataPath ? vm.__get_value(dataPath, context) : context;

      if (Number.isInteger(vFor)) {
        context = value;
      } else if (!propPath) {
        context = vFor[value];
      } else {
        if (Array.isArray(vFor)) {
          context = vFor.find(function (vForItem) {
            return vm.__get_value(propPath, vForItem) === value;
          });
        } else if (isPlainObject(vFor)) {
          context = Object.keys(vFor).find(function (vForKey) {
            return vm.__get_value(propPath, vFor[vForKey]) === value;
          });
        } else {
          console.error('v-for 暂不支持循环数据：', vFor);
        }
      }

      if (valuePath) {
        context = vm.__get_value(valuePath, context);
      }
    }
  });
  return context;
}

function processEventExtra(vm, extra, event) {
  var extraObj = {};

  if (Array.isArray(extra) && extra.length) {
    /**
                                              *[
                                              *    ['data.items', 'data.id', item.data.id],
                                              *    ['metas', 'id', meta.id]
                                              *],
                                              *[
                                              *    ['data.items', 'data.id', item.data.id],
                                              *    ['metas', 'id', meta.id]
                                              *],
                                              *'test'
                                              */
    extra.forEach(function (dataPath, index) {
      if (typeof dataPath === 'string') {
        if (!dataPath) {// model,prop.sync
          extraObj['$' + index] = vm;
        } else {
          if (dataPath === '$event') {// $event
            extraObj['$' + index] = event;
          } else if (dataPath.indexOf('$event.') === 0) {// $event.target.value
            extraObj['$' + index] = vm.__get_value(dataPath.replace('$event.', ''), event);
          } else {
            extraObj['$' + index] = vm.__get_value(dataPath);
          }
        }
      } else {
        extraObj['$' + index] = getExtraValue(vm, dataPath);
      }
    });
  }

  return extraObj;
}

function getObjByArray(arr) {
  var obj = {};
  for (var i = 1; i < arr.length; i++) {
    var element = arr[i];
    obj[element[0]] = element[1];
  }
  return obj;
}

function processEventArgs(vm, event) {var args = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : [];var extra = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : [];var isCustom = arguments.length > 4 ? arguments[4] : undefined;var methodName = arguments.length > 5 ? arguments[5] : undefined;
  var isCustomMPEvent = false; // wxcomponent 组件，传递原始 event 对象
  if (isCustom) {// 自定义事件
    isCustomMPEvent = event.currentTarget &&
    event.currentTarget.dataset &&
    event.currentTarget.dataset.comType === 'wx';
    if (!args.length) {// 无参数，直接传入 event 或 detail 数组
      if (isCustomMPEvent) {
        return [event];
      }
      return event.detail.__args__ || event.detail;
    }
  }

  var extraObj = processEventExtra(vm, extra, event);

  var ret = [];
  args.forEach(function (arg) {
    if (arg === '$event') {
      if (methodName === '__set_model' && !isCustom) {// input v-model value
        ret.push(event.target.value);
      } else {
        if (isCustom && !isCustomMPEvent) {
          ret.push(event.detail.__args__[0]);
        } else {// wxcomponent 组件或内置组件
          ret.push(event);
        }
      }
    } else {
      if (Array.isArray(arg) && arg[0] === 'o') {
        ret.push(getObjByArray(arg));
      } else if (typeof arg === 'string' && hasOwn(extraObj, arg)) {
        ret.push(extraObj[arg]);
      } else {
        ret.push(arg);
      }
    }
  });

  return ret;
}

var ONCE = '~';
var CUSTOM = '^';

function isMatchEventType(eventType, optType) {
  return eventType === optType ||

  optType === 'regionchange' && (

  eventType === 'begin' ||
  eventType === 'end');


}

function handleEvent(event) {var _this = this;
  event = wrapper$1(event);

  // [['tap',[['handle',[1,2,a]],['handle1',[1,2,a]]]]]
  var dataset = (event.currentTarget || event.target).dataset;
  if (!dataset) {
    return console.warn("\u4E8B\u4EF6\u4FE1\u606F\u4E0D\u5B58\u5728");
  }
  var eventOpts = dataset.eventOpts || dataset['event-opts']; // 支付宝 web-view 组件 dataset 非驼峰
  if (!eventOpts) {
    return console.warn("\u4E8B\u4EF6\u4FE1\u606F\u4E0D\u5B58\u5728");
  }

  // [['handle',[1,2,a]],['handle1',[1,2,a]]]
  var eventType = event.type;

  var ret = [];

  eventOpts.forEach(function (eventOpt) {
    var type = eventOpt[0];
    var eventsArray = eventOpt[1];

    var isCustom = type.charAt(0) === CUSTOM;
    type = isCustom ? type.slice(1) : type;
    var isOnce = type.charAt(0) === ONCE;
    type = isOnce ? type.slice(1) : type;

    if (eventsArray && isMatchEventType(eventType, type)) {
      eventsArray.forEach(function (eventArray) {
        var methodName = eventArray[0];
        if (methodName) {
          var handlerCtx = _this.$vm;
          if (
          handlerCtx.$options.generic &&
          handlerCtx.$parent &&
          handlerCtx.$parent.$parent)
          {// mp-weixin,mp-toutiao 抽象节点模拟 scoped slots
            handlerCtx = handlerCtx.$parent.$parent;
          }
          if (methodName === '$emit') {
            handlerCtx.$emit.apply(handlerCtx,
            processEventArgs(
            _this.$vm,
            event,
            eventArray[1],
            eventArray[2],
            isCustom,
            methodName));

            return;
          }
          var handler = handlerCtx[methodName];
          if (!isFn(handler)) {
            throw new Error(" _vm.".concat(methodName, " is not a function"));
          }
          if (isOnce) {
            if (handler.once) {
              return;
            }
            handler.once = true;
          }
          ret.push(handler.apply(handlerCtx, processEventArgs(
          _this.$vm,
          event,
          eventArray[1],
          eventArray[2],
          isCustom,
          methodName)));

        }
      });
    }
  });

  if (
  eventType === 'input' &&
  ret.length === 1 &&
  typeof ret[0] !== 'undefined')
  {
    return ret[0];
  }
}

var hooks = [
'onShow',
'onHide',
'onError',
'onPageNotFound'];


function parseBaseApp(vm, _ref3)


{var mocks = _ref3.mocks,initRefs = _ref3.initRefs;
  if (vm.$options.store) {
    _vue.default.prototype.$store = vm.$options.store;
  }

  _vue.default.prototype.mpHost = "mp-weixin";

  _vue.default.mixin({
    beforeCreate: function beforeCreate() {
      if (!this.$options.mpType) {
        return;
      }

      this.mpType = this.$options.mpType;

      this.$mp = _defineProperty({
        data: {} },
      this.mpType, this.$options.mpInstance);


      this.$scope = this.$options.mpInstance;

      delete this.$options.mpType;
      delete this.$options.mpInstance;

      if (this.mpType !== 'app') {
        initRefs(this);
        initMocks(this, mocks);
      }
    } });


  var appOptions = {
    onLaunch: function onLaunch(args) {
      if (this.$vm) {// 已经初始化过了，主要是为了百度，百度 onShow 在 onLaunch 之前
        return;
      }
      {
        if (!wx.canIUse('nextTick')) {// 事实 上2.2.3 即可，简单使用 2.3.0 的 nextTick 判断
          console.error('当前微信基础库版本过低，请将 微信开发者工具-详情-项目设置-调试基础库版本 更换为`2.3.0`以上');
        }
      }

      this.$vm = vm;

      this.$vm.$mp = {
        app: this };


      this.$vm.$scope = this;
      // vm 上也挂载 globalData
      this.$vm.globalData = this.globalData;

      this.$vm._isMounted = true;
      this.$vm.__call_hook('mounted', args);

      this.$vm.__call_hook('onLaunch', args);
    } };


  // 兼容旧版本 globalData
  appOptions.globalData = vm.$options.globalData || {};
  // 将 methods 中的方法挂在 getApp() 中
  var methods = vm.$options.methods;
  if (methods) {
    Object.keys(methods).forEach(function (name) {
      appOptions[name] = methods[name];
    });
  }

  initHooks(appOptions, hooks);

  return appOptions;
}

var mocks = ['__route__', '__wxExparserNodeId__', '__wxWebviewId__'];

function findVmByVueId(vm, vuePid) {
  var $children = vm.$children;
  // 优先查找直属(反向查找:https://github.com/dcloudio/uni-app/issues/1200)
  for (var i = $children.length - 1; i >= 0; i--) {
    var childVm = $children[i];
    if (childVm.$scope._$vueId === vuePid) {
      return childVm;
    }
  }
  // 反向递归查找
  var parentVm;
  for (var _i = $children.length - 1; _i >= 0; _i--) {
    parentVm = findVmByVueId($children[_i], vuePid);
    if (parentVm) {
      return parentVm;
    }
  }
}

function initBehavior(options) {
  return Behavior(options);
}

function isPage() {
  return !!this.route;
}

function initRelation(detail) {
  this.triggerEvent('__l', detail);
}

function initRefs(vm) {
  var mpInstance = vm.$scope;
  Object.defineProperty(vm, '$refs', {
    get: function get() {
      var $refs = {};
      var components = mpInstance.selectAllComponents('.vue-ref');
      components.forEach(function (component) {
        var ref = component.dataset.ref;
        $refs[ref] = component.$vm || component;
      });
      var forComponents = mpInstance.selectAllComponents('.vue-ref-in-for');
      forComponents.forEach(function (component) {
        var ref = component.dataset.ref;
        if (!$refs[ref]) {
          $refs[ref] = [];
        }
        $refs[ref].push(component.$vm || component);
      });
      return $refs;
    } });

}

function handleLink(event) {var _ref4 =



  event.detail || event.value,vuePid = _ref4.vuePid,vueOptions = _ref4.vueOptions; // detail 是微信,value 是百度(dipatch)

  var parentVm;

  if (vuePid) {
    parentVm = findVmByVueId(this.$vm, vuePid);
  }

  if (!parentVm) {
    parentVm = this.$vm;
  }

  vueOptions.parent = parentVm;
}

function parseApp(vm) {
  return parseBaseApp(vm, {
    mocks: mocks,
    initRefs: initRefs });

}

function createApp(vm) {
  App(parseApp(vm));
  return vm;
}

function parseBaseComponent(vueComponentOptions)


{var _ref5 = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},isPage = _ref5.isPage,initRelation = _ref5.initRelation;var _initVueComponent =
  initVueComponent(_vue.default, vueComponentOptions),_initVueComponent2 = _slicedToArray(_initVueComponent, 2),VueComponent = _initVueComponent2[0],vueOptions = _initVueComponent2[1];

  var options = _objectSpread({
    multipleSlots: true,
    addGlobalClass: true },
  vueOptions.options || {});


  {
    // 微信 multipleSlots 部分情况有 bug，导致内容顺序错乱 如 u-list，提供覆盖选项
    if (vueOptions['mp-weixin'] && vueOptions['mp-weixin']['options']) {
      Object.assign(options, vueOptions['mp-weixin']['options']);
    }
  }

  var componentOptions = {
    options: options,
    data: initData(vueOptions, _vue.default.prototype),
    behaviors: initBehaviors(vueOptions, initBehavior),
    properties: initProperties(vueOptions.props, false, vueOptions.__file),
    lifetimes: {
      attached: function attached() {
        var properties = this.properties;

        var options = {
          mpType: isPage.call(this) ? 'page' : 'component',
          mpInstance: this,
          propsData: properties };


        initVueIds(properties.vueId, this);

        // 处理父子关系
        initRelation.call(this, {
          vuePid: this._$vuePid,
          vueOptions: options });


        // 初始化 vue 实例
        this.$vm = new VueComponent(options);

        // 处理$slots,$scopedSlots（暂不支持动态变化$slots）
        initSlots(this.$vm, properties.vueSlots);

        // 触发首次 setData
        this.$vm.$mount();
      },
      ready: function ready() {
        // 当组件 props 默认值为 true，初始化时传入 false 会导致 created,ready 触发, 但 attached 不触发
        // https://developers.weixin.qq.com/community/develop/doc/00066ae2844cc0f8eb883e2a557800
        if (this.$vm) {
          this.$vm._isMounted = true;
          this.$vm.__call_hook('mounted');
          this.$vm.__call_hook('onReady');
        }
      },
      detached: function detached() {
        this.$vm && this.$vm.$destroy();
      } },

    pageLifetimes: {
      show: function show(args) {
        this.$vm && this.$vm.__call_hook('onPageShow', args);
      },
      hide: function hide() {
        this.$vm && this.$vm.__call_hook('onPageHide');
      },
      resize: function resize(size) {
        this.$vm && this.$vm.__call_hook('onPageResize', size);
      } },

    methods: {
      __l: handleLink,
      __e: handleEvent } };



  if (Array.isArray(vueOptions.wxsCallMethods)) {
    vueOptions.wxsCallMethods.forEach(function (callMethod) {
      componentOptions.methods[callMethod] = function (args) {
        return this.$vm[callMethod](args);
      };
    });
  }

  if (isPage) {
    return componentOptions;
  }
  return [componentOptions, VueComponent];
}

function parseComponent(vueComponentOptions) {
  return parseBaseComponent(vueComponentOptions, {
    isPage: isPage,
    initRelation: initRelation });

}

var hooks$1 = [
'onShow',
'onHide',
'onUnload'];


hooks$1.push.apply(hooks$1, PAGE_EVENT_HOOKS);

function parseBasePage(vuePageOptions, _ref6)


{var isPage = _ref6.isPage,initRelation = _ref6.initRelation;
  var pageOptions = parseComponent(vuePageOptions);

  initHooks(pageOptions.methods, hooks$1, vuePageOptions);

  pageOptions.methods.onLoad = function (args) {
    this.$vm.$mp.query = args; // 兼容 mpvue
    this.$vm.__call_hook('onLoad', args);
  };

  return pageOptions;
}

function parsePage(vuePageOptions) {
  return parseBasePage(vuePageOptions, {
    isPage: isPage,
    initRelation: initRelation });

}

function createPage(vuePageOptions) {
  {
    return Component(parsePage(vuePageOptions));
  }
}

function createComponent(vueOptions) {
  {
    return Component(parseComponent(vueOptions));
  }
}

todos.forEach(function (todoApi) {
  protocols[todoApi] = false;
});

canIUses.forEach(function (canIUseApi) {
  var apiName = protocols[canIUseApi] && protocols[canIUseApi].name ? protocols[canIUseApi].name :
  canIUseApi;
  if (!wx.canIUse(apiName)) {
    protocols[canIUseApi] = false;
  }
});

var uni = {};

if (typeof Proxy !== 'undefined' && "mp-weixin" !== 'app-plus') {
  uni = new Proxy({}, {
    get: function get(target, name) {
      if (target[name]) {
        return target[name];
      }
      if (baseApi[name]) {
        return baseApi[name];
      }
      if (api[name]) {
        return promisify(name, api[name]);
      }
      {
        if (extraApi[name]) {
          return promisify(name, extraApi[name]);
        }
        if (todoApis[name]) {
          return promisify(name, todoApis[name]);
        }
      }
      if (eventApi[name]) {
        return eventApi[name];
      }
      if (!hasOwn(wx, name) && !hasOwn(protocols, name)) {
        return;
      }
      return promisify(name, wrapper(name, wx[name]));
    },
    set: function set(target, name, value) {
      target[name] = value;
      return true;
    } });

} else {
  Object.keys(baseApi).forEach(function (name) {
    uni[name] = baseApi[name];
  });

  {
    Object.keys(todoApis).forEach(function (name) {
      uni[name] = promisify(name, todoApis[name]);
    });
    Object.keys(extraApi).forEach(function (name) {
      uni[name] = promisify(name, todoApis[name]);
    });
  }

  Object.keys(eventApi).forEach(function (name) {
    uni[name] = eventApi[name];
  });

  Object.keys(api).forEach(function (name) {
    uni[name] = promisify(name, api[name]);
  });

  Object.keys(wx).forEach(function (name) {
    if (hasOwn(wx, name) || hasOwn(protocols, name)) {
      uni[name] = promisify(name, wrapper(name, wx[name]));
    }
  });
}

wx.createApp = createApp;
wx.createPage = createPage;
wx.createComponent = createComponent;

var uni$1 = uni;var _default =

uni$1;exports.default = _default;

/***/ }),

/***/ 117:
/*!***************************************!*\
  !*** F:/工作/APP/static/img/icon/8.jpg ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQEAYABgAAD/2wBDAAMCAgMCAgMDAwMEAwMEBQgFBQQEBQoHBwYIDAoMDAsKCwsNDhIQDQ4RDgsLEBYQERMUFRUVDA8XGBYUGBIUFRT/2wBDAQMEBAUEBQkFBQkUDQsNFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBT/wAARCAAlACUDASIAAhEBAxEB/8QAHwAAAQUBAQEBAQEAAAAAAAAAAAECAwQFBgcICQoL/8QAtRAAAgEDAwIEAwUFBAQAAAF9AQIDAAQRBRIhMUEGE1FhByJxFDKBkaEII0KxwRVS0fAkM2JyggkKFhcYGRolJicoKSo0NTY3ODk6Q0RFRkdISUpTVFVWV1hZWmNkZWZnaGlqc3R1dnd4eXqDhIWGh4iJipKTlJWWl5iZmqKjpKWmp6ipqrKztLW2t7i5usLDxMXGx8jJytLT1NXW19jZ2uHi4+Tl5ufo6erx8vP09fb3+Pn6/8QAHwEAAwEBAQEBAQEBAQAAAAAAAAECAwQFBgcICQoL/8QAtREAAgECBAQDBAcFBAQAAQJ3AAECAxEEBSExBhJBUQdhcRMiMoEIFEKRobHBCSMzUvAVYnLRChYkNOEl8RcYGRomJygpKjU2Nzg5OkNERUZHSElKU1RVVldYWVpjZGVmZ2hpanN0dXZ3eHl6goOEhYaHiImKkpOUlZaXmJmaoqOkpaanqKmqsrO0tba3uLm6wsPExcbHyMnK0tPU1dbX2Nna4uPk5ebn6Onq8vP09fb3+Pn6/9oADAMBAAIRAxEAPwD9U6rNqNorEG6hBHBBkH+Nc/8AFG8n0/4d+Iri2laGeOxlKSIcFTtPIPrXnPg/4J+Ar/wv4fuNTt9+pajaxzfvb10eZyoZtqhhnr2FBwVsRUjVVKlFN2vq7dbdmezf2nZ/8/cH/fxf8afDeQXDFYpo5D1wjg15w/7OvgCNSzaU6qoyWa8lAA/76rjPFPgPw54D1zwPrHhJmt2utZhtXmgumlSWNjhhkk+hH4mgxqYnE0Vz1IRt5Sd97fyn0BRSUUHqnI/F7/kmPib/AK8Zf/Qa4K+8Aza34L8A+JtNt2vdX0S1tZVs/M2i4jAVig9GzyD+HNekfEjSrnXPAevWFnH5t1cWciRR/wB5ipwPxrzfwj8aofD3hbStLvfC3iIXdlbR28vl2OV3IoU4yR6elB4WM9j7e1d2Tjo/NO/4Gz4i+IzeK/D97oul+G9an1W+ge2NvdWjwJBvBUtJIeABkngnNcz4o8FQ/D/w/wDDXR4naV4/ENs80hOQ0jHLEegz0rpP+GgtP/6FfxN/4Af/AGVc74k8Yz/FTxH4QstK8Paxaix1WK+uJ7628tFjQ885PvQclepRqxcufnm7JaeaPdqKKKD6gWkoooAKMUUUALRRRQB//9k="

/***/ }),

/***/ 118:
/*!****************************************!*\
  !*** F:/工作/APP/static/img/icon/12.jpg ***!
  \****************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQEAYABgAAD/2wBDAAMCAgMCAgMDAwMEAwMEBQgFBQQEBQoHBwYIDAoMDAsKCwsNDhIQDQ4RDgsLEBYQERMUFRUVDA8XGBYUGBIUFRT/2wBDAQMEBAUEBQkFBQkUDQsNFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBT/wAARCAAlACUDASIAAhEBAxEB/8QAHwAAAQUBAQEBAQEAAAAAAAAAAAECAwQFBgcICQoL/8QAtRAAAgEDAwIEAwUFBAQAAAF9AQIDAAQRBRIhMUEGE1FhByJxFDKBkaEII0KxwRVS0fAkM2JyggkKFhcYGRolJicoKSo0NTY3ODk6Q0RFRkdISUpTVFVWV1hZWmNkZWZnaGlqc3R1dnd4eXqDhIWGh4iJipKTlJWWl5iZmqKjpKWmp6ipqrKztLW2t7i5usLDxMXGx8jJytLT1NXW19jZ2uHi4+Tl5ufo6erx8vP09fb3+Pn6/8QAHwEAAwEBAQEBAQEBAQAAAAAAAAECAwQFBgcICQoL/8QAtREAAgECBAQDBAcFBAQAAQJ3AAECAxEEBSExBhJBUQdhcRMiMoEIFEKRobHBCSMzUvAVYnLRChYkNOEl8RcYGRomJygpKjU2Nzg5OkNERUZHSElKU1RVVldYWVpjZGVmZ2hpanN0dXZ3eHl6goOEhYaHiImKkpOUlZaXmJmaoqOkpaanqKmqsrO0tba3uLm6wsPExcbHyMnK0tPU1dbX2Nna4uPk5ebn6Onq8vP09fb3+Pn6/9oADAMBAAIRAxEAPwD0i1j1j4keJotO02Jru5nZhBbhgqqoBJJJOAABkk10x+A/iAcHUvD4P/YVi/xrA+BPiCz0rxhqE17eQWUZ0i8RJJ5BGC5iO1QSep7DrXmpvvev3eOHrRqPD4dqEIJfZvvfzXY/KnySiq1ZOUpN9bdvJne+E/CF74y1K6sbK5sIJbdC7NeXSRIQGA+Vj15Paui1P4IeJ9P0u8v4n03Uo7OIzzR6ffRzSLGOrbQckCvHzfe9ekfAHxFZaV4yv5b+9gsoW0i8jD3EojVmMZwuSeST0FbYuniaMJVqclZK9uXf53/QnD06NSSpzi7vrf8ASxB4d8fyaVbyQ3Ra5TIMe45K9cjP5UV5z9v96K563D2BxFR1Z09X8jqpZli6MFCM9Eb/AMIZ5brxNdLF4XsvFrLYTSmxvpvKRFTDtIDkcgKRj/aNbv8AwvTwp/0Srw//AN/pv8a5z9mvxHp2l/EwwapfwaXDqGnXenpdXbbIY5ZIiE3t/CM8Z9xV5v2YPF2f+Qv4XI/7DcP+NepiY4SOLnHGS5VaLXvSV977NLSyOulTq+yTpK+rvon28jT/AOF6eFP+iU+Hv+/83+Na/hf4iaV421Caw0b4QeHbm7jt5bpkN1ImI413McswHA7ZrxrwL4B1X4haxeaZpt1ptvcWsZkdr++jgjIDBflZjhuT2r2v4X/De6+Cuo654o8Va/4fg06LRry3SO11OOeaaWSPaiIi8kk1jjqGBwsJRhJurbSPPO7fTTm6mtFVqjTkvd6u0f8AI8E+3+9FYKXEkudis+Ou0E0V9d7FHlezPR/jd8ObXwzftq1lcssV9KWNqU4Rickhs9MnpjivKvLb+/8ApRRXhcL4qtisrpVK0uZ6q/o7I9vHU4U68lFWG+Wf736UscBkdV34ycdKKK+rb0OCyPp/4WfC3S/DugCefGpXN8qSvJKmAowcKoycdTz3ooor+WcwzDF18XVqVKjbu+tttOh93RpQhTjGKP/Z"

/***/ }),

/***/ 119:
/*!****************************************!*\
  !*** F:/工作/APP/static/img/icon/13.jpg ***!
  \****************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQEAYABgAAD/2wBDAAMCAgMCAgMDAwMEAwMEBQgFBQQEBQoHBwYIDAoMDAsKCwsNDhIQDQ4RDgsLEBYQERMUFRUVDA8XGBYUGBIUFRT/2wBDAQMEBAUEBQkFBQkUDQsNFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBT/wAARCAAlACUDASIAAhEBAxEB/8QAHwAAAQUBAQEBAQEAAAAAAAAAAAECAwQFBgcICQoL/8QAtRAAAgEDAwIEAwUFBAQAAAF9AQIDAAQRBRIhMUEGE1FhByJxFDKBkaEII0KxwRVS0fAkM2JyggkKFhcYGRolJicoKSo0NTY3ODk6Q0RFRkdISUpTVFVWV1hZWmNkZWZnaGlqc3R1dnd4eXqDhIWGh4iJipKTlJWWl5iZmqKjpKWmp6ipqrKztLW2t7i5usLDxMXGx8jJytLT1NXW19jZ2uHi4+Tl5ufo6erx8vP09fb3+Pn6/8QAHwEAAwEBAQEBAQEBAQAAAAAAAAECAwQFBgcICQoL/8QAtREAAgECBAQDBAcFBAQAAQJ3AAECAxEEBSExBhJBUQdhcRMiMoEIFEKRobHBCSMzUvAVYnLRChYkNOEl8RcYGRomJygpKjU2Nzg5OkNERUZHSElKU1RVVldYWVpjZGVmZ2hpanN0dXZ3eHl6goOEhYaHiImKkpOUlZaXmJmaoqOkpaanqKmqsrO0tba3uLm6wsPExcbHyMnK0tPU1dbX2Nna4uPk5ebn6Onq8vP09fb3+Pn6/9oADAMBAAIRAxEAPwD9DvG2sarHqmgaDos8Nlf6xLKv22aPzBBHHHvchOjN0AzxTv8AhAfGH/RQZf8AwUW9U/FmP+FneA9xcLjUc+Xnd/x7dsc5+lZn27w5/wBDD42/77uv/iK+lo05ewp+yitVd+4p680lu07aJaHi1Jr2s+d7Oy95x+zF9H3Zv/8ACA+MP+igy/8Agot653w78WorDxNP4R8TTAa3b3ZtI76GHZb3OQDGTydjtnG3pnoea2fDuk6T4kuJI7LxD4u3xKHYXF1cRKRn1ZQD9K+f/illfix4hI4I1O3wfwjr1cBgqeYVKmGxG6jdWgoNO6S2Wq12ZwYrEzwkIV6XV21k5JrXu9Nj60ooor4U+pOK8Thm+KXgAIwRz/aG1iMgH7P1x3rb/sPxt/0NFh/4K/8A7ZWL4j/5Kt8Pf97UP/SevTK9irWlSo0OVJ3j1Sf2590edTpqpUq3b+Lo2vsx7HF+IvF+peHv7J0Ozto9d8U30bFVB8iFVXG+aTqVQEjgZJPArwD4rfDnxZomrTeJ9Zj0+e1vb2GS4l0132WzblA3BwCFO3rzyfcV7X4zu28EfEOy8XXdvLNocumtpl5cQoXNmRJ5iSMoGdhyQSOnH48T8avjV4a1rwfcaJpV/Hfy6htieSMEpEhYZdj2x6dc4r6HJ3iKNak8LS5oz+KVvPVaaRt0Xz2aPHzFUqlOoq87OPwq/lo/O57NRUNm0bWkBilE0RRdkisGDjHByOuaK+HejsfUGV4o8J2fiy2t47mS4tbi2lE1teWcnlzwPjG5G+hxggg+lYv/AAr3U/8AofPEv/f+H/43RRXXTxlelHkjLTzSf5pnPPD0qkuaS19WvyD/AIV7qf8A0Pnib/v/AA//ABusnR/2ffC2l6quoTtfatKH80x6hMJI2f8AvMoUbj9ciiiuhZni4pxhO197WX5JGTwOHk05Rvbvd/md5oeh2XhvS4NO06HyLKDIji3s20Ek4yxJxkn6dKKKK82UpTk5Sd2ztjFRSjFWSP/Z"

/***/ }),

/***/ 120:
/*!***************************************!*\
  !*** F:/工作/APP/static/img/icon/9.jpg ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQEAYABgAAD/2wBDAAMCAgMCAgMDAwMEAwMEBQgFBQQEBQoHBwYIDAoMDAsKCwsNDhIQDQ4RDgsLEBYQERMUFRUVDA8XGBYUGBIUFRT/2wBDAQMEBAUEBQkFBQkUDQsNFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBT/wAARCAAlACUDASIAAhEBAxEB/8QAHwAAAQUBAQEBAQEAAAAAAAAAAAECAwQFBgcICQoL/8QAtRAAAgEDAwIEAwUFBAQAAAF9AQIDAAQRBRIhMUEGE1FhByJxFDKBkaEII0KxwRVS0fAkM2JyggkKFhcYGRolJicoKSo0NTY3ODk6Q0RFRkdISUpTVFVWV1hZWmNkZWZnaGlqc3R1dnd4eXqDhIWGh4iJipKTlJWWl5iZmqKjpKWmp6ipqrKztLW2t7i5usLDxMXGx8jJytLT1NXW19jZ2uHi4+Tl5ufo6erx8vP09fb3+Pn6/8QAHwEAAwEBAQEBAQEBAQAAAAAAAAECAwQFBgcICQoL/8QAtREAAgECBAQDBAcFBAQAAQJ3AAECAxEEBSExBhJBUQdhcRMiMoEIFEKRobHBCSMzUvAVYnLRChYkNOEl8RcYGRomJygpKjU2Nzg5OkNERUZHSElKU1RVVldYWVpjZGVmZ2hpanN0dXZ3eHl6goOEhYaHiImKkpOUlZaXmJmaoqOkpaanqKmqsrO0tba3uLm6wsPExcbHyMnK0tPU1dbX2Nna4uPk5ebn6Onq8vP09fb3+Pn6/9oADAMBAAIRAxEAPwD9Q/EGuWvhnQ9Q1e+Zks7GB7iZlXJCKpJwO5wK4G1+Nk99axXEHw/8YSwTIJI3WyiwykZB/wBb6VsfG3/kj/jP/sE3P/otq8C0/wAE/Cvw14Q8LS+KPFus6TqGo6Vb3nkjUpguGQZKhQcDOQB7V6+Ew9KpS5ppt3tom+l+jR5mJrVIVOWDSVr6u3XzTPav+FyXn/RO/GP/AIBRf/Ha6DwH4/tvHkGotDp9/pVxp9z9lubTUo1SVH2K44ViMbXHevn/AEzQfgdrGo21hZ+PtZmu7mRYYoxqk43OxwBkrjkmtd/hjpvwn+O3w6j0K+1Ty9XkvjeJdXrSiXZb/Lkd+vf0HpW9TC0LOCTjKzaumtlfqzGGIrXUrpxuk7NPfToj6SooorwT2Tifjb/yR/xn/wBgm5/9FtXE2ek+LtR+F/gBvC2m+Gb4ro9uLg+II3Yr+6Tbs2jp1zn2rvvi7p9zqvwt8WWdnC9zdT6ZcRxQxjLOxjbAA7k15h4A+Pmn+HfA/h/Srzwp4uF3Y2EFtKI9GkZdyIFODnkZFevh41JUL048zUtvkeXXcFW/eOycf1Ol8B+HfHkPiKKTxPongmDTEVm8zR4JBcLJ/CV3DHWqnxP/AOS9fCL/AK6al/6Tipf+GldH/wChV8Yf+CST/GuWm8aN8Uvjh8O7rTPD2vWVppJvXurjUtPeBFEkO1eT7j9RW0Kdf2jqVIcqUZenwszlOlyKnTld3j+aPoeiiivCPYCiiigAooooAKKKKAP/2Q=="

/***/ }),

/***/ 121:
/*!****************************************!*\
  !*** F:/工作/APP/static/img/icon/10.jpg ***!
  \****************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQEAYABgAAD/2wBDAAMCAgMCAgMDAwMEAwMEBQgFBQQEBQoHBwYIDAoMDAsKCwsNDhIQDQ4RDgsLEBYQERMUFRUVDA8XGBYUGBIUFRT/2wBDAQMEBAUEBQkFBQkUDQsNFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBT/wAARCAAlACUDASIAAhEBAxEB/8QAHwAAAQUBAQEBAQEAAAAAAAAAAAECAwQFBgcICQoL/8QAtRAAAgEDAwIEAwUFBAQAAAF9AQIDAAQRBRIhMUEGE1FhByJxFDKBkaEII0KxwRVS0fAkM2JyggkKFhcYGRolJicoKSo0NTY3ODk6Q0RFRkdISUpTVFVWV1hZWmNkZWZnaGlqc3R1dnd4eXqDhIWGh4iJipKTlJWWl5iZmqKjpKWmp6ipqrKztLW2t7i5usLDxMXGx8jJytLT1NXW19jZ2uHi4+Tl5ufo6erx8vP09fb3+Pn6/8QAHwEAAwEBAQEBAQEBAQAAAAAAAAECAwQFBgcICQoL/8QAtREAAgECBAQDBAcFBAQAAQJ3AAECAxEEBSExBhJBUQdhcRMiMoEIFEKRobHBCSMzUvAVYnLRChYkNOEl8RcYGRomJygpKjU2Nzg5OkNERUZHSElKU1RVVldYWVpjZGVmZ2hpanN0dXZ3eHl6goOEhYaHiImKkpOUlZaXmJmaoqOkpaanqKmqsrO0tba3uLm6wsPExcbHyMnK0tPU1dbX2Nna4uPk5ebn6Onq8vP09fb3+Pn6/9oADAMBAAIRAxEAPwD9Tby8g0+1kuLmVIII13PJI2FUepNc7/ws7wr/ANB2z/77qn8Y/wDkm+s/7sf/AKNSvCdLsPBcmnwNf6pqkN4VzLHFApVW7gHuK+YzLNK2DxCo0lHa/vO3Wx9Fl+W0sVQdao5b291X6XPoNfiZ4WZgo12zyTjmTFdMrBlDKQVIyCO9fJ3iCy8KQafu0fUdQubzcB5dxCqpt7nIr6L8K+J9JfS9J04alam/FrEpt/NXzM7BxjOc08tzWeKqSp1+VWtazvv0FmGWww1ONSjzO973Vtjp6KKK+mPnji/jH/yTfWf92P8A9GpXhOl+I/Ctrp9vFeeFGvLpFxJP9udN59cAcV778VrGfUPh/q8FtC88zIjCONcsQJFJwPoDXh+leMPEGkafBZxeHrOVIV2B5tNLOfcnua+Azx8uNjJuy5f5VLq+59tk/vYSUVq+b+Zx6LsZXiDXPDuoaf5WmeHDpd1vB+0fbHk47jaRU9j/AMlK0f8A6+7P/wBp1Pr3iHXvE1iLKXQLeFWcMGtdPKPkdADVmy8Pan/wszTV+wXH7m7ti7eWdqhdhYk9MDBr5vllUqxcNVzR2jy9+iPf5owptS092X2ubt1Z9N0UUV+xn5UFJgUUUAGBRiiigBaKKKAP/9k="

/***/ }),

/***/ 122:
/*!****************************************!*\
  !*** F:/工作/APP/static/img/icon/11.jpg ***!
  \****************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQEAYABgAAD/2wBDAAMCAgMCAgMDAwMEAwMEBQgFBQQEBQoHBwYIDAoMDAsKCwsNDhIQDQ4RDgsLEBYQERMUFRUVDA8XGBYUGBIUFRT/2wBDAQMEBAUEBQkFBQkUDQsNFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBT/wAARCAAlACUDASIAAhEBAxEB/8QAHwAAAQUBAQEBAQEAAAAAAAAAAAECAwQFBgcICQoL/8QAtRAAAgEDAwIEAwUFBAQAAAF9AQIDAAQRBRIhMUEGE1FhByJxFDKBkaEII0KxwRVS0fAkM2JyggkKFhcYGRolJicoKSo0NTY3ODk6Q0RFRkdISUpTVFVWV1hZWmNkZWZnaGlqc3R1dnd4eXqDhIWGh4iJipKTlJWWl5iZmqKjpKWmp6ipqrKztLW2t7i5usLDxMXGx8jJytLT1NXW19jZ2uHi4+Tl5ufo6erx8vP09fb3+Pn6/8QAHwEAAwEBAQEBAQEBAQAAAAAAAAECAwQFBgcICQoL/8QAtREAAgECBAQDBAcFBAQAAQJ3AAECAxEEBSExBhJBUQdhcRMiMoEIFEKRobHBCSMzUvAVYnLRChYkNOEl8RcYGRomJygpKjU2Nzg5OkNERUZHSElKU1RVVldYWVpjZGVmZ2hpanN0dXZ3eHl6goOEhYaHiImKkpOUlZaXmJmaoqOkpaanqKmqsrO0tba3uLm6wsPExcbHyMnK0tPU1dbX2Nna4uPk5ebn6Onq8vP09fb3+Pn6/9oADAMBAAIRAxEAPwD9NvHXiyDwH4P1fxDdQyXFvp1u1w8MWNzgDoM8c1e0DWIvEOh6dqkCssF9bR3Mat1CuoYA++DXEftF/wDJDvGn/YNkrwLwZ4f/AGkJvCOiSaPr+mxaS1lCbSOQQblh2DYDmInO3HU15OIxk6GI9moOStfRX6nTCkpwvdLXqfYdcn4l+Ill4Z8beFPDU9vNLdeIWuFhljI2xeUgcls+uccV4D/wjX7UP/Qx6V+Vv/8AGaytH0f4o6f8fvhlL8SNRtNQ3S3q2P2Xy/k/cEyZ2IvX5OvpXPUzGo+VRpSjdpXa01a8y40Fq3JPR/kfX9FFFe8cZ5z+0X/yQ3xr/wBg2SvEvAsX7Rv/AAhuhnSZtBOlGxhNp54j3iHYNmeOu3Fe5ftAWdxqHwX8Y29rBJc3EmnSKkUKFnY+gA5Jrwjwyf2mdI8PaZZWWl6Z9it7aOKBZzbh1jVQFDZcHOAOvNfNY7TFJvnty/Y9Xud9H+H036m+0P7Tp/5ePDq/QRf4Vh2MfxSj+PPww/4WPNp0sZnvfsX2EJwfs537toH+z1q82oftSHppukL9Dbf/ABdVvDth8YtU+N3w9u/iHpsQsbSa7ME9kkbJGWt2DbzGTjOFxu69q4m+aUEva/FH4tviW5t0d+XZ7b7H1hRRRX2R5QUUUUAFFFFABRRRQB//2Q=="

/***/ }),

/***/ 14:
/*!**********************************************************************************************************!*\
  !*** ./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/runtime/componentNormalizer.js ***!
  \**********************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return normalizeComponent; });
/* globals __VUE_SSR_CONTEXT__ */

// IMPORTANT: Do NOT use ES2015 features in this file (except for modules).
// This module is a runtime utility for cleaner component module output and will
// be included in the final webpack user bundle.

function normalizeComponent (
  scriptExports,
  render,
  staticRenderFns,
  functionalTemplate,
  injectStyles,
  scopeId,
  moduleIdentifier, /* server only */
  shadowMode, /* vue-cli only */
  components, // fixed by xxxxxx auto components
  renderjs // fixed by xxxxxx renderjs
) {
  // Vue.extend constructor export interop
  var options = typeof scriptExports === 'function'
    ? scriptExports.options
    : scriptExports

  // fixed by xxxxxx auto components
  if (components) {
    options.components = Object.assign(components, options.components || {})
  }
  // fixed by xxxxxx renderjs
  if (renderjs) {
    (renderjs.beforeCreate || (renderjs.beforeCreate = [])).unshift(function() {
      this[renderjs.__module] = this
    });
    (options.mixins || (options.mixins = [])).push(renderjs)
  }

  // render functions
  if (render) {
    options.render = render
    options.staticRenderFns = staticRenderFns
    options._compiled = true
  }

  // functional template
  if (functionalTemplate) {
    options.functional = true
  }

  // scopedId
  if (scopeId) {
    options._scopeId = 'data-v-' + scopeId
  }

  var hook
  if (moduleIdentifier) { // server build
    hook = function (context) {
      // 2.3 injection
      context =
        context || // cached call
        (this.$vnode && this.$vnode.ssrContext) || // stateful
        (this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext) // functional
      // 2.2 with runInNewContext: true
      if (!context && typeof __VUE_SSR_CONTEXT__ !== 'undefined') {
        context = __VUE_SSR_CONTEXT__
      }
      // inject component styles
      if (injectStyles) {
        injectStyles.call(this, context)
      }
      // register component module identifier for async chunk inferrence
      if (context && context._registeredComponents) {
        context._registeredComponents.add(moduleIdentifier)
      }
    }
    // used by ssr in case component is cached and beforeCreate
    // never gets called
    options._ssrRegister = hook
  } else if (injectStyles) {
    hook = shadowMode
      ? function () { injectStyles.call(this, this.$root.$options.shadowRoot) }
      : injectStyles
  }

  if (hook) {
    if (options.functional) {
      // for template-only hot-reload because in that case the render fn doesn't
      // go through the normalizer
      options._injectStyles = hook
      // register for functioal component in vue file
      var originalRender = options.render
      options.render = function renderWithStyleInjection (h, context) {
        hook.call(context)
        return originalRender(h, context)
      }
    } else {
      // inject component registration as beforeCreate hook
      var existing = options.beforeCreate
      options.beforeCreate = existing
        ? [].concat(existing, hook)
        : [hook]
    }
  }

  return {
    exports: scriptExports,
    options: options
  }
}


/***/ }),

/***/ 15:
/*!********************************!*\
  !*** F:/工作/APP/store/index.js ***!
  \********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var _vue = _interopRequireDefault(__webpack_require__(/*! vue */ 2));
var _vuex = _interopRequireDefault(__webpack_require__(/*! vuex */ 16));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}
_vue.default.use(_vuex.default);
var store = new _vuex.default.Store({
  state: {
    username: '',
    url: 'http://39.101.201.199:6001/api/', // url:'http://47.244.175.166:8081/api',http://39.101.201.199:6001/api    接口地址换成这个，这个快
    httpurl: 'http://39.101.201.199:6001', //外部路径
    token: 'xxx',
    WorkdailyId: '', //上传日报id
    SOId: '', //订单详情ID
    vip: false,
    vipitem: {}, //vip页面调到新建页面的数据
    codeurlid: {}, //跳转页面后
    codeurlids: '', //判断是什么状态
    weburl: '', //打开外部网址
    gsQRcode: '', //录安装二维码
    Customercode: '', //零配件客户编码   ---进入零配件的客户
    Ninedetails: [], //零配件的详细信息
    NinedetailsHTML: '', //零件超级图
    buyids: '', //选择的商品id
    lianxir: {}, //选择切换的联系人
    Buy: [{ //立即购买
      ProductId: '', //商品id
      Number: '', //数量
      IsAssembly: '' //甲方安装
    }],
    ShoppingCartasd: [], //由购物车前往结单页面的数据
    Maintenancestatus: 0, //保养管理的状态
    MaintenancestatusID: '', //任务的ID
    imgList: [],
    imgListXAIBIAO0: '' },

  mutations: {},
  actions: {} });var _default =


store;exports.default = _default;

/***/ }),

/***/ 16:
/*!********************************************!*\
  !*** ./node_modules/vuex/dist/vuex.esm.js ***!
  \********************************************/
/*! exports provided: Store, install, mapState, mapMutations, mapGetters, mapActions, createNamespacedHelpers, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Store", function() { return Store; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "install", function() { return install; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "mapState", function() { return mapState; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "mapMutations", function() { return mapMutations; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "mapGetters", function() { return mapGetters; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "mapActions", function() { return mapActions; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "createNamespacedHelpers", function() { return createNamespacedHelpers; });
/**
 * vuex v3.0.1
 * (c) 2017 Evan You
 * @license MIT
 */
var applyMixin = function (Vue) {
  var version = Number(Vue.version.split('.')[0]);

  if (version >= 2) {
    Vue.mixin({ beforeCreate: vuexInit });
  } else {
    // override init and inject vuex init procedure
    // for 1.x backwards compatibility.
    var _init = Vue.prototype._init;
    Vue.prototype._init = function (options) {
      if ( options === void 0 ) options = {};

      options.init = options.init
        ? [vuexInit].concat(options.init)
        : vuexInit;
      _init.call(this, options);
    };
  }

  /**
   * Vuex init hook, injected into each instances init hooks list.
   */

  function vuexInit () {
    var options = this.$options;
    // store injection
    if (options.store) {
      this.$store = typeof options.store === 'function'
        ? options.store()
        : options.store;
    } else if (options.parent && options.parent.$store) {
      this.$store = options.parent.$store;
    }
  }
};

var devtoolHook =
  typeof window !== 'undefined' &&
  window.__VUE_DEVTOOLS_GLOBAL_HOOK__;

function devtoolPlugin (store) {
  if (!devtoolHook) { return }

  store._devtoolHook = devtoolHook;

  devtoolHook.emit('vuex:init', store);

  devtoolHook.on('vuex:travel-to-state', function (targetState) {
    store.replaceState(targetState);
  });

  store.subscribe(function (mutation, state) {
    devtoolHook.emit('vuex:mutation', mutation, state);
  });
}

/**
 * Get the first item that pass the test
 * by second argument function
 *
 * @param {Array} list
 * @param {Function} f
 * @return {*}
 */
/**
 * Deep copy the given object considering circular structure.
 * This function caches all nested objects and its copies.
 * If it detects circular structure, use cached copy to avoid infinite loop.
 *
 * @param {*} obj
 * @param {Array<Object>} cache
 * @return {*}
 */


/**
 * forEach for object
 */
function forEachValue (obj, fn) {
  Object.keys(obj).forEach(function (key) { return fn(obj[key], key); });
}

function isObject (obj) {
  return obj !== null && typeof obj === 'object'
}

function isPromise (val) {
  return val && typeof val.then === 'function'
}

function assert (condition, msg) {
  if (!condition) { throw new Error(("[vuex] " + msg)) }
}

var Module = function Module (rawModule, runtime) {
  this.runtime = runtime;
  this._children = Object.create(null);
  this._rawModule = rawModule;
  var rawState = rawModule.state;
  this.state = (typeof rawState === 'function' ? rawState() : rawState) || {};
};

var prototypeAccessors$1 = { namespaced: { configurable: true } };

prototypeAccessors$1.namespaced.get = function () {
  return !!this._rawModule.namespaced
};

Module.prototype.addChild = function addChild (key, module) {
  this._children[key] = module;
};

Module.prototype.removeChild = function removeChild (key) {
  delete this._children[key];
};

Module.prototype.getChild = function getChild (key) {
  return this._children[key]
};

Module.prototype.update = function update (rawModule) {
  this._rawModule.namespaced = rawModule.namespaced;
  if (rawModule.actions) {
    this._rawModule.actions = rawModule.actions;
  }
  if (rawModule.mutations) {
    this._rawModule.mutations = rawModule.mutations;
  }
  if (rawModule.getters) {
    this._rawModule.getters = rawModule.getters;
  }
};

Module.prototype.forEachChild = function forEachChild (fn) {
  forEachValue(this._children, fn);
};

Module.prototype.forEachGetter = function forEachGetter (fn) {
  if (this._rawModule.getters) {
    forEachValue(this._rawModule.getters, fn);
  }
};

Module.prototype.forEachAction = function forEachAction (fn) {
  if (this._rawModule.actions) {
    forEachValue(this._rawModule.actions, fn);
  }
};

Module.prototype.forEachMutation = function forEachMutation (fn) {
  if (this._rawModule.mutations) {
    forEachValue(this._rawModule.mutations, fn);
  }
};

Object.defineProperties( Module.prototype, prototypeAccessors$1 );

var ModuleCollection = function ModuleCollection (rawRootModule) {
  // register root module (Vuex.Store options)
  this.register([], rawRootModule, false);
};

ModuleCollection.prototype.get = function get (path) {
  return path.reduce(function (module, key) {
    return module.getChild(key)
  }, this.root)
};

ModuleCollection.prototype.getNamespace = function getNamespace (path) {
  var module = this.root;
  return path.reduce(function (namespace, key) {
    module = module.getChild(key);
    return namespace + (module.namespaced ? key + '/' : '')
  }, '')
};

ModuleCollection.prototype.update = function update$1 (rawRootModule) {
  update([], this.root, rawRootModule);
};

ModuleCollection.prototype.register = function register (path, rawModule, runtime) {
    var this$1 = this;
    if ( runtime === void 0 ) runtime = true;

  if (true) {
    assertRawModule(path, rawModule);
  }

  var newModule = new Module(rawModule, runtime);
  if (path.length === 0) {
    this.root = newModule;
  } else {
    var parent = this.get(path.slice(0, -1));
    parent.addChild(path[path.length - 1], newModule);
  }

  // register nested modules
  if (rawModule.modules) {
    forEachValue(rawModule.modules, function (rawChildModule, key) {
      this$1.register(path.concat(key), rawChildModule, runtime);
    });
  }
};

ModuleCollection.prototype.unregister = function unregister (path) {
  var parent = this.get(path.slice(0, -1));
  var key = path[path.length - 1];
  if (!parent.getChild(key).runtime) { return }

  parent.removeChild(key);
};

function update (path, targetModule, newModule) {
  if (true) {
    assertRawModule(path, newModule);
  }

  // update target module
  targetModule.update(newModule);

  // update nested modules
  if (newModule.modules) {
    for (var key in newModule.modules) {
      if (!targetModule.getChild(key)) {
        if (true) {
          console.warn(
            "[vuex] trying to add a new module '" + key + "' on hot reloading, " +
            'manual reload is needed'
          );
        }
        return
      }
      update(
        path.concat(key),
        targetModule.getChild(key),
        newModule.modules[key]
      );
    }
  }
}

var functionAssert = {
  assert: function (value) { return typeof value === 'function'; },
  expected: 'function'
};

var objectAssert = {
  assert: function (value) { return typeof value === 'function' ||
    (typeof value === 'object' && typeof value.handler === 'function'); },
  expected: 'function or object with "handler" function'
};

var assertTypes = {
  getters: functionAssert,
  mutations: functionAssert,
  actions: objectAssert
};

function assertRawModule (path, rawModule) {
  Object.keys(assertTypes).forEach(function (key) {
    if (!rawModule[key]) { return }

    var assertOptions = assertTypes[key];

    forEachValue(rawModule[key], function (value, type) {
      assert(
        assertOptions.assert(value),
        makeAssertionMessage(path, key, type, value, assertOptions.expected)
      );
    });
  });
}

function makeAssertionMessage (path, key, type, value, expected) {
  var buf = key + " should be " + expected + " but \"" + key + "." + type + "\"";
  if (path.length > 0) {
    buf += " in module \"" + (path.join('.')) + "\"";
  }
  buf += " is " + (JSON.stringify(value)) + ".";
  return buf
}

var Vue; // bind on install

var Store = function Store (options) {
  var this$1 = this;
  if ( options === void 0 ) options = {};

  // Auto install if it is not done yet and `window` has `Vue`.
  // To allow users to avoid auto-installation in some cases,
  // this code should be placed here. See #731
  if (!Vue && typeof window !== 'undefined' && window.Vue) {
    install(window.Vue);
  }

  if (true) {
    assert(Vue, "must call Vue.use(Vuex) before creating a store instance.");
    assert(typeof Promise !== 'undefined', "vuex requires a Promise polyfill in this browser.");
    assert(this instanceof Store, "Store must be called with the new operator.");
  }

  var plugins = options.plugins; if ( plugins === void 0 ) plugins = [];
  var strict = options.strict; if ( strict === void 0 ) strict = false;

  var state = options.state; if ( state === void 0 ) state = {};
  if (typeof state === 'function') {
    state = state() || {};
  }

  // store internal state
  this._committing = false;
  this._actions = Object.create(null);
  this._actionSubscribers = [];
  this._mutations = Object.create(null);
  this._wrappedGetters = Object.create(null);
  this._modules = new ModuleCollection(options);
  this._modulesNamespaceMap = Object.create(null);
  this._subscribers = [];
  this._watcherVM = new Vue();

  // bind commit and dispatch to self
  var store = this;
  var ref = this;
  var dispatch = ref.dispatch;
  var commit = ref.commit;
  this.dispatch = function boundDispatch (type, payload) {
    return dispatch.call(store, type, payload)
  };
  this.commit = function boundCommit (type, payload, options) {
    return commit.call(store, type, payload, options)
  };

  // strict mode
  this.strict = strict;

  // init root module.
  // this also recursively registers all sub-modules
  // and collects all module getters inside this._wrappedGetters
  installModule(this, state, [], this._modules.root);

  // initialize the store vm, which is responsible for the reactivity
  // (also registers _wrappedGetters as computed properties)
  resetStoreVM(this, state);

  // apply plugins
  plugins.forEach(function (plugin) { return plugin(this$1); });

  if (Vue.config.devtools) {
    devtoolPlugin(this);
  }
};

var prototypeAccessors = { state: { configurable: true } };

prototypeAccessors.state.get = function () {
  return this._vm._data.$$state
};

prototypeAccessors.state.set = function (v) {
  if (true) {
    assert(false, "Use store.replaceState() to explicit replace store state.");
  }
};

Store.prototype.commit = function commit (_type, _payload, _options) {
    var this$1 = this;

  // check object-style commit
  var ref = unifyObjectStyle(_type, _payload, _options);
    var type = ref.type;
    var payload = ref.payload;
    var options = ref.options;

  var mutation = { type: type, payload: payload };
  var entry = this._mutations[type];
  if (!entry) {
    if (true) {
      console.error(("[vuex] unknown mutation type: " + type));
    }
    return
  }
  this._withCommit(function () {
    entry.forEach(function commitIterator (handler) {
      handler(payload);
    });
  });
  this._subscribers.forEach(function (sub) { return sub(mutation, this$1.state); });

  if (
     true &&
    options && options.silent
  ) {
    console.warn(
      "[vuex] mutation type: " + type + ". Silent option has been removed. " +
      'Use the filter functionality in the vue-devtools'
    );
  }
};

Store.prototype.dispatch = function dispatch (_type, _payload) {
    var this$1 = this;

  // check object-style dispatch
  var ref = unifyObjectStyle(_type, _payload);
    var type = ref.type;
    var payload = ref.payload;

  var action = { type: type, payload: payload };
  var entry = this._actions[type];
  if (!entry) {
    if (true) {
      console.error(("[vuex] unknown action type: " + type));
    }
    return
  }

  this._actionSubscribers.forEach(function (sub) { return sub(action, this$1.state); });

  return entry.length > 1
    ? Promise.all(entry.map(function (handler) { return handler(payload); }))
    : entry[0](payload)
};

Store.prototype.subscribe = function subscribe (fn) {
  return genericSubscribe(fn, this._subscribers)
};

Store.prototype.subscribeAction = function subscribeAction (fn) {
  return genericSubscribe(fn, this._actionSubscribers)
};

Store.prototype.watch = function watch (getter, cb, options) {
    var this$1 = this;

  if (true) {
    assert(typeof getter === 'function', "store.watch only accepts a function.");
  }
  return this._watcherVM.$watch(function () { return getter(this$1.state, this$1.getters); }, cb, options)
};

Store.prototype.replaceState = function replaceState (state) {
    var this$1 = this;

  this._withCommit(function () {
    this$1._vm._data.$$state = state;
  });
};

Store.prototype.registerModule = function registerModule (path, rawModule, options) {
    if ( options === void 0 ) options = {};

  if (typeof path === 'string') { path = [path]; }

  if (true) {
    assert(Array.isArray(path), "module path must be a string or an Array.");
    assert(path.length > 0, 'cannot register the root module by using registerModule.');
  }

  this._modules.register(path, rawModule);
  installModule(this, this.state, path, this._modules.get(path), options.preserveState);
  // reset store to update getters...
  resetStoreVM(this, this.state);
};

Store.prototype.unregisterModule = function unregisterModule (path) {
    var this$1 = this;

  if (typeof path === 'string') { path = [path]; }

  if (true) {
    assert(Array.isArray(path), "module path must be a string or an Array.");
  }

  this._modules.unregister(path);
  this._withCommit(function () {
    var parentState = getNestedState(this$1.state, path.slice(0, -1));
    Vue.delete(parentState, path[path.length - 1]);
  });
  resetStore(this);
};

Store.prototype.hotUpdate = function hotUpdate (newOptions) {
  this._modules.update(newOptions);
  resetStore(this, true);
};

Store.prototype._withCommit = function _withCommit (fn) {
  var committing = this._committing;
  this._committing = true;
  fn();
  this._committing = committing;
};

Object.defineProperties( Store.prototype, prototypeAccessors );

function genericSubscribe (fn, subs) {
  if (subs.indexOf(fn) < 0) {
    subs.push(fn);
  }
  return function () {
    var i = subs.indexOf(fn);
    if (i > -1) {
      subs.splice(i, 1);
    }
  }
}

function resetStore (store, hot) {
  store._actions = Object.create(null);
  store._mutations = Object.create(null);
  store._wrappedGetters = Object.create(null);
  store._modulesNamespaceMap = Object.create(null);
  var state = store.state;
  // init all modules
  installModule(store, state, [], store._modules.root, true);
  // reset vm
  resetStoreVM(store, state, hot);
}

function resetStoreVM (store, state, hot) {
  var oldVm = store._vm;

  // bind store public getters
  store.getters = {};
  var wrappedGetters = store._wrappedGetters;
  var computed = {};
  forEachValue(wrappedGetters, function (fn, key) {
    // use computed to leverage its lazy-caching mechanism
    computed[key] = function () { return fn(store); };
    Object.defineProperty(store.getters, key, {
      get: function () { return store._vm[key]; },
      enumerable: true // for local getters
    });
  });

  // use a Vue instance to store the state tree
  // suppress warnings just in case the user has added
  // some funky global mixins
  var silent = Vue.config.silent;
  Vue.config.silent = true;
  store._vm = new Vue({
    data: {
      $$state: state
    },
    computed: computed
  });
  Vue.config.silent = silent;

  // enable strict mode for new vm
  if (store.strict) {
    enableStrictMode(store);
  }

  if (oldVm) {
    if (hot) {
      // dispatch changes in all subscribed watchers
      // to force getter re-evaluation for hot reloading.
      store._withCommit(function () {
        oldVm._data.$$state = null;
      });
    }
    Vue.nextTick(function () { return oldVm.$destroy(); });
  }
}

function installModule (store, rootState, path, module, hot) {
  var isRoot = !path.length;
  var namespace = store._modules.getNamespace(path);

  // register in namespace map
  if (module.namespaced) {
    store._modulesNamespaceMap[namespace] = module;
  }

  // set state
  if (!isRoot && !hot) {
    var parentState = getNestedState(rootState, path.slice(0, -1));
    var moduleName = path[path.length - 1];
    store._withCommit(function () {
      Vue.set(parentState, moduleName, module.state);
    });
  }

  var local = module.context = makeLocalContext(store, namespace, path);

  module.forEachMutation(function (mutation, key) {
    var namespacedType = namespace + key;
    registerMutation(store, namespacedType, mutation, local);
  });

  module.forEachAction(function (action, key) {
    var type = action.root ? key : namespace + key;
    var handler = action.handler || action;
    registerAction(store, type, handler, local);
  });

  module.forEachGetter(function (getter, key) {
    var namespacedType = namespace + key;
    registerGetter(store, namespacedType, getter, local);
  });

  module.forEachChild(function (child, key) {
    installModule(store, rootState, path.concat(key), child, hot);
  });
}

/**
 * make localized dispatch, commit, getters and state
 * if there is no namespace, just use root ones
 */
function makeLocalContext (store, namespace, path) {
  var noNamespace = namespace === '';

  var local = {
    dispatch: noNamespace ? store.dispatch : function (_type, _payload, _options) {
      var args = unifyObjectStyle(_type, _payload, _options);
      var payload = args.payload;
      var options = args.options;
      var type = args.type;

      if (!options || !options.root) {
        type = namespace + type;
        if ( true && !store._actions[type]) {
          console.error(("[vuex] unknown local action type: " + (args.type) + ", global type: " + type));
          return
        }
      }

      return store.dispatch(type, payload)
    },

    commit: noNamespace ? store.commit : function (_type, _payload, _options) {
      var args = unifyObjectStyle(_type, _payload, _options);
      var payload = args.payload;
      var options = args.options;
      var type = args.type;

      if (!options || !options.root) {
        type = namespace + type;
        if ( true && !store._mutations[type]) {
          console.error(("[vuex] unknown local mutation type: " + (args.type) + ", global type: " + type));
          return
        }
      }

      store.commit(type, payload, options);
    }
  };

  // getters and state object must be gotten lazily
  // because they will be changed by vm update
  Object.defineProperties(local, {
    getters: {
      get: noNamespace
        ? function () { return store.getters; }
        : function () { return makeLocalGetters(store, namespace); }
    },
    state: {
      get: function () { return getNestedState(store.state, path); }
    }
  });

  return local
}

function makeLocalGetters (store, namespace) {
  var gettersProxy = {};

  var splitPos = namespace.length;
  Object.keys(store.getters).forEach(function (type) {
    // skip if the target getter is not match this namespace
    if (type.slice(0, splitPos) !== namespace) { return }

    // extract local getter type
    var localType = type.slice(splitPos);

    // Add a port to the getters proxy.
    // Define as getter property because
    // we do not want to evaluate the getters in this time.
    Object.defineProperty(gettersProxy, localType, {
      get: function () { return store.getters[type]; },
      enumerable: true
    });
  });

  return gettersProxy
}

function registerMutation (store, type, handler, local) {
  var entry = store._mutations[type] || (store._mutations[type] = []);
  entry.push(function wrappedMutationHandler (payload) {
    handler.call(store, local.state, payload);
  });
}

function registerAction (store, type, handler, local) {
  var entry = store._actions[type] || (store._actions[type] = []);
  entry.push(function wrappedActionHandler (payload, cb) {
    var res = handler.call(store, {
      dispatch: local.dispatch,
      commit: local.commit,
      getters: local.getters,
      state: local.state,
      rootGetters: store.getters,
      rootState: store.state
    }, payload, cb);
    if (!isPromise(res)) {
      res = Promise.resolve(res);
    }
    if (store._devtoolHook) {
      return res.catch(function (err) {
        store._devtoolHook.emit('vuex:error', err);
        throw err
      })
    } else {
      return res
    }
  });
}

function registerGetter (store, type, rawGetter, local) {
  if (store._wrappedGetters[type]) {
    if (true) {
      console.error(("[vuex] duplicate getter key: " + type));
    }
    return
  }
  store._wrappedGetters[type] = function wrappedGetter (store) {
    return rawGetter(
      local.state, // local state
      local.getters, // local getters
      store.state, // root state
      store.getters // root getters
    )
  };
}

function enableStrictMode (store) {
  store._vm.$watch(function () { return this._data.$$state }, function () {
    if (true) {
      assert(store._committing, "Do not mutate vuex store state outside mutation handlers.");
    }
  }, { deep: true, sync: true });
}

function getNestedState (state, path) {
  return path.length
    ? path.reduce(function (state, key) { return state[key]; }, state)
    : state
}

function unifyObjectStyle (type, payload, options) {
  if (isObject(type) && type.type) {
    options = payload;
    payload = type;
    type = type.type;
  }

  if (true) {
    assert(typeof type === 'string', ("Expects string as the type, but found " + (typeof type) + "."));
  }

  return { type: type, payload: payload, options: options }
}

function install (_Vue) {
  if (Vue && _Vue === Vue) {
    if (true) {
      console.error(
        '[vuex] already installed. Vue.use(Vuex) should be called only once.'
      );
    }
    return
  }
  Vue = _Vue;
  applyMixin(Vue);
}

var mapState = normalizeNamespace(function (namespace, states) {
  var res = {};
  normalizeMap(states).forEach(function (ref) {
    var key = ref.key;
    var val = ref.val;

    res[key] = function mappedState () {
      var state = this.$store.state;
      var getters = this.$store.getters;
      if (namespace) {
        var module = getModuleByNamespace(this.$store, 'mapState', namespace);
        if (!module) {
          return
        }
        state = module.context.state;
        getters = module.context.getters;
      }
      return typeof val === 'function'
        ? val.call(this, state, getters)
        : state[val]
    };
    // mark vuex getter for devtools
    res[key].vuex = true;
  });
  return res
});

var mapMutations = normalizeNamespace(function (namespace, mutations) {
  var res = {};
  normalizeMap(mutations).forEach(function (ref) {
    var key = ref.key;
    var val = ref.val;

    res[key] = function mappedMutation () {
      var args = [], len = arguments.length;
      while ( len-- ) args[ len ] = arguments[ len ];

      var commit = this.$store.commit;
      if (namespace) {
        var module = getModuleByNamespace(this.$store, 'mapMutations', namespace);
        if (!module) {
          return
        }
        commit = module.context.commit;
      }
      return typeof val === 'function'
        ? val.apply(this, [commit].concat(args))
        : commit.apply(this.$store, [val].concat(args))
    };
  });
  return res
});

var mapGetters = normalizeNamespace(function (namespace, getters) {
  var res = {};
  normalizeMap(getters).forEach(function (ref) {
    var key = ref.key;
    var val = ref.val;

    val = namespace + val;
    res[key] = function mappedGetter () {
      if (namespace && !getModuleByNamespace(this.$store, 'mapGetters', namespace)) {
        return
      }
      if ( true && !(val in this.$store.getters)) {
        console.error(("[vuex] unknown getter: " + val));
        return
      }
      return this.$store.getters[val]
    };
    // mark vuex getter for devtools
    res[key].vuex = true;
  });
  return res
});

var mapActions = normalizeNamespace(function (namespace, actions) {
  var res = {};
  normalizeMap(actions).forEach(function (ref) {
    var key = ref.key;
    var val = ref.val;

    res[key] = function mappedAction () {
      var args = [], len = arguments.length;
      while ( len-- ) args[ len ] = arguments[ len ];

      var dispatch = this.$store.dispatch;
      if (namespace) {
        var module = getModuleByNamespace(this.$store, 'mapActions', namespace);
        if (!module) {
          return
        }
        dispatch = module.context.dispatch;
      }
      return typeof val === 'function'
        ? val.apply(this, [dispatch].concat(args))
        : dispatch.apply(this.$store, [val].concat(args))
    };
  });
  return res
});

var createNamespacedHelpers = function (namespace) { return ({
  mapState: mapState.bind(null, namespace),
  mapGetters: mapGetters.bind(null, namespace),
  mapMutations: mapMutations.bind(null, namespace),
  mapActions: mapActions.bind(null, namespace)
}); };

function normalizeMap (map) {
  return Array.isArray(map)
    ? map.map(function (key) { return ({ key: key, val: key }); })
    : Object.keys(map).map(function (key) { return ({ key: key, val: map[key] }); })
}

function normalizeNamespace (fn) {
  return function (namespace, map) {
    if (typeof namespace !== 'string') {
      map = namespace;
      namespace = '';
    } else if (namespace.charAt(namespace.length - 1) !== '/') {
      namespace += '/';
    }
    return fn(namespace, map)
  }
}

function getModuleByNamespace (store, helper, namespace) {
  var module = store._modulesNamespaceMap[namespace];
  if ( true && !module) {
    console.error(("[vuex] module namespace not found in " + helper + "(): " + namespace));
  }
  return module
}

var index_esm = {
  Store: Store,
  install: install,
  version: '3.0.1',
  mapState: mapState,
  mapMutations: mapMutations,
  mapGetters: mapGetters,
  mapActions: mapActions,
  createNamespacedHelpers: createNamespacedHelpers
};


/* harmony default export */ __webpack_exports__["default"] = (index_esm);


/***/ }),

/***/ 2:
/*!******************************************************************************************!*\
  !*** ./node_modules/@dcloudio/vue-cli-plugin-uni/packages/mp-vue/dist/mp.runtime.esm.js ***!
  \******************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(global) {/*!
 * Vue.js v2.6.11
 * (c) 2014-2020 Evan You
 * Released under the MIT License.
 */
/*  */

var emptyObject = Object.freeze({});

// These helpers produce better VM code in JS engines due to their
// explicitness and function inlining.
function isUndef (v) {
  return v === undefined || v === null
}

function isDef (v) {
  return v !== undefined && v !== null
}

function isTrue (v) {
  return v === true
}

function isFalse (v) {
  return v === false
}

/**
 * Check if value is primitive.
 */
function isPrimitive (value) {
  return (
    typeof value === 'string' ||
    typeof value === 'number' ||
    // $flow-disable-line
    typeof value === 'symbol' ||
    typeof value === 'boolean'
  )
}

/**
 * Quick object check - this is primarily used to tell
 * Objects from primitive values when we know the value
 * is a JSON-compliant type.
 */
function isObject (obj) {
  return obj !== null && typeof obj === 'object'
}

/**
 * Get the raw type string of a value, e.g., [object Object].
 */
var _toString = Object.prototype.toString;

function toRawType (value) {
  return _toString.call(value).slice(8, -1)
}

/**
 * Strict object type check. Only returns true
 * for plain JavaScript objects.
 */
function isPlainObject (obj) {
  return _toString.call(obj) === '[object Object]'
}

function isRegExp (v) {
  return _toString.call(v) === '[object RegExp]'
}

/**
 * Check if val is a valid array index.
 */
function isValidArrayIndex (val) {
  var n = parseFloat(String(val));
  return n >= 0 && Math.floor(n) === n && isFinite(val)
}

function isPromise (val) {
  return (
    isDef(val) &&
    typeof val.then === 'function' &&
    typeof val.catch === 'function'
  )
}

/**
 * Convert a value to a string that is actually rendered.
 */
function toString (val) {
  return val == null
    ? ''
    : Array.isArray(val) || (isPlainObject(val) && val.toString === _toString)
      ? JSON.stringify(val, null, 2)
      : String(val)
}

/**
 * Convert an input value to a number for persistence.
 * If the conversion fails, return original string.
 */
function toNumber (val) {
  var n = parseFloat(val);
  return isNaN(n) ? val : n
}

/**
 * Make a map and return a function for checking if a key
 * is in that map.
 */
function makeMap (
  str,
  expectsLowerCase
) {
  var map = Object.create(null);
  var list = str.split(',');
  for (var i = 0; i < list.length; i++) {
    map[list[i]] = true;
  }
  return expectsLowerCase
    ? function (val) { return map[val.toLowerCase()]; }
    : function (val) { return map[val]; }
}

/**
 * Check if a tag is a built-in tag.
 */
var isBuiltInTag = makeMap('slot,component', true);

/**
 * Check if an attribute is a reserved attribute.
 */
var isReservedAttribute = makeMap('key,ref,slot,slot-scope,is');

/**
 * Remove an item from an array.
 */
function remove (arr, item) {
  if (arr.length) {
    var index = arr.indexOf(item);
    if (index > -1) {
      return arr.splice(index, 1)
    }
  }
}

/**
 * Check whether an object has the property.
 */
var hasOwnProperty = Object.prototype.hasOwnProperty;
function hasOwn (obj, key) {
  return hasOwnProperty.call(obj, key)
}

/**
 * Create a cached version of a pure function.
 */
function cached (fn) {
  var cache = Object.create(null);
  return (function cachedFn (str) {
    var hit = cache[str];
    return hit || (cache[str] = fn(str))
  })
}

/**
 * Camelize a hyphen-delimited string.
 */
var camelizeRE = /-(\w)/g;
var camelize = cached(function (str) {
  return str.replace(camelizeRE, function (_, c) { return c ? c.toUpperCase() : ''; })
});

/**
 * Capitalize a string.
 */
var capitalize = cached(function (str) {
  return str.charAt(0).toUpperCase() + str.slice(1)
});

/**
 * Hyphenate a camelCase string.
 */
var hyphenateRE = /\B([A-Z])/g;
var hyphenate = cached(function (str) {
  return str.replace(hyphenateRE, '-$1').toLowerCase()
});

/**
 * Simple bind polyfill for environments that do not support it,
 * e.g., PhantomJS 1.x. Technically, we don't need this anymore
 * since native bind is now performant enough in most browsers.
 * But removing it would mean breaking code that was able to run in
 * PhantomJS 1.x, so this must be kept for backward compatibility.
 */

/* istanbul ignore next */
function polyfillBind (fn, ctx) {
  function boundFn (a) {
    var l = arguments.length;
    return l
      ? l > 1
        ? fn.apply(ctx, arguments)
        : fn.call(ctx, a)
      : fn.call(ctx)
  }

  boundFn._length = fn.length;
  return boundFn
}

function nativeBind (fn, ctx) {
  return fn.bind(ctx)
}

var bind = Function.prototype.bind
  ? nativeBind
  : polyfillBind;

/**
 * Convert an Array-like object to a real Array.
 */
function toArray (list, start) {
  start = start || 0;
  var i = list.length - start;
  var ret = new Array(i);
  while (i--) {
    ret[i] = list[i + start];
  }
  return ret
}

/**
 * Mix properties into target object.
 */
function extend (to, _from) {
  for (var key in _from) {
    to[key] = _from[key];
  }
  return to
}

/**
 * Merge an Array of Objects into a single Object.
 */
function toObject (arr) {
  var res = {};
  for (var i = 0; i < arr.length; i++) {
    if (arr[i]) {
      extend(res, arr[i]);
    }
  }
  return res
}

/* eslint-disable no-unused-vars */

/**
 * Perform no operation.
 * Stubbing args to make Flow happy without leaving useless transpiled code
 * with ...rest (https://flow.org/blog/2017/05/07/Strict-Function-Call-Arity/).
 */
function noop (a, b, c) {}

/**
 * Always return false.
 */
var no = function (a, b, c) { return false; };

/* eslint-enable no-unused-vars */

/**
 * Return the same value.
 */
var identity = function (_) { return _; };

/**
 * Check if two values are loosely equal - that is,
 * if they are plain objects, do they have the same shape?
 */
function looseEqual (a, b) {
  if (a === b) { return true }
  var isObjectA = isObject(a);
  var isObjectB = isObject(b);
  if (isObjectA && isObjectB) {
    try {
      var isArrayA = Array.isArray(a);
      var isArrayB = Array.isArray(b);
      if (isArrayA && isArrayB) {
        return a.length === b.length && a.every(function (e, i) {
          return looseEqual(e, b[i])
        })
      } else if (a instanceof Date && b instanceof Date) {
        return a.getTime() === b.getTime()
      } else if (!isArrayA && !isArrayB) {
        var keysA = Object.keys(a);
        var keysB = Object.keys(b);
        return keysA.length === keysB.length && keysA.every(function (key) {
          return looseEqual(a[key], b[key])
        })
      } else {
        /* istanbul ignore next */
        return false
      }
    } catch (e) {
      /* istanbul ignore next */
      return false
    }
  } else if (!isObjectA && !isObjectB) {
    return String(a) === String(b)
  } else {
    return false
  }
}

/**
 * Return the first index at which a loosely equal value can be
 * found in the array (if value is a plain object, the array must
 * contain an object of the same shape), or -1 if it is not present.
 */
function looseIndexOf (arr, val) {
  for (var i = 0; i < arr.length; i++) {
    if (looseEqual(arr[i], val)) { return i }
  }
  return -1
}

/**
 * Ensure a function is called only once.
 */
function once (fn) {
  var called = false;
  return function () {
    if (!called) {
      called = true;
      fn.apply(this, arguments);
    }
  }
}

var ASSET_TYPES = [
  'component',
  'directive',
  'filter'
];

var LIFECYCLE_HOOKS = [
  'beforeCreate',
  'created',
  'beforeMount',
  'mounted',
  'beforeUpdate',
  'updated',
  'beforeDestroy',
  'destroyed',
  'activated',
  'deactivated',
  'errorCaptured',
  'serverPrefetch'
];

/*  */



var config = ({
  /**
   * Option merge strategies (used in core/util/options)
   */
  // $flow-disable-line
  optionMergeStrategies: Object.create(null),

  /**
   * Whether to suppress warnings.
   */
  silent: false,

  /**
   * Show production mode tip message on boot?
   */
  productionTip: "development" !== 'production',

  /**
   * Whether to enable devtools
   */
  devtools: "development" !== 'production',

  /**
   * Whether to record perf
   */
  performance: false,

  /**
   * Error handler for watcher errors
   */
  errorHandler: null,

  /**
   * Warn handler for watcher warns
   */
  warnHandler: null,

  /**
   * Ignore certain custom elements
   */
  ignoredElements: [],

  /**
   * Custom user key aliases for v-on
   */
  // $flow-disable-line
  keyCodes: Object.create(null),

  /**
   * Check if a tag is reserved so that it cannot be registered as a
   * component. This is platform-dependent and may be overwritten.
   */
  isReservedTag: no,

  /**
   * Check if an attribute is reserved so that it cannot be used as a component
   * prop. This is platform-dependent and may be overwritten.
   */
  isReservedAttr: no,

  /**
   * Check if a tag is an unknown element.
   * Platform-dependent.
   */
  isUnknownElement: no,

  /**
   * Get the namespace of an element
   */
  getTagNamespace: noop,

  /**
   * Parse the real tag name for the specific platform.
   */
  parsePlatformTagName: identity,

  /**
   * Check if an attribute must be bound using property, e.g. value
   * Platform-dependent.
   */
  mustUseProp: no,

  /**
   * Perform updates asynchronously. Intended to be used by Vue Test Utils
   * This will significantly reduce performance if set to false.
   */
  async: true,

  /**
   * Exposed for legacy reasons
   */
  _lifecycleHooks: LIFECYCLE_HOOKS
});

/*  */

/**
 * unicode letters used for parsing html tags, component names and property paths.
 * using https://www.w3.org/TR/html53/semantics-scripting.html#potentialcustomelementname
 * skipping \u10000-\uEFFFF due to it freezing up PhantomJS
 */
var unicodeRegExp = /a-zA-Z\u00B7\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u037D\u037F-\u1FFF\u200C-\u200D\u203F-\u2040\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD/;

/**
 * Check if a string starts with $ or _
 */
function isReserved (str) {
  var c = (str + '').charCodeAt(0);
  return c === 0x24 || c === 0x5F
}

/**
 * Define a property.
 */
function def (obj, key, val, enumerable) {
  Object.defineProperty(obj, key, {
    value: val,
    enumerable: !!enumerable,
    writable: true,
    configurable: true
  });
}

/**
 * Parse simple path.
 */
var bailRE = new RegExp(("[^" + (unicodeRegExp.source) + ".$_\\d]"));
function parsePath (path) {
  if (bailRE.test(path)) {
    return
  }
  var segments = path.split('.');
  return function (obj) {
    for (var i = 0; i < segments.length; i++) {
      if (!obj) { return }
      obj = obj[segments[i]];
    }
    return obj
  }
}

/*  */

// can we use __proto__?
var hasProto = '__proto__' in {};

// Browser environment sniffing
var inBrowser = typeof window !== 'undefined';
var inWeex = typeof WXEnvironment !== 'undefined' && !!WXEnvironment.platform;
var weexPlatform = inWeex && WXEnvironment.platform.toLowerCase();
var UA = inBrowser && window.navigator.userAgent.toLowerCase();
var isIE = UA && /msie|trident/.test(UA);
var isIE9 = UA && UA.indexOf('msie 9.0') > 0;
var isEdge = UA && UA.indexOf('edge/') > 0;
var isAndroid = (UA && UA.indexOf('android') > 0) || (weexPlatform === 'android');
var isIOS = (UA && /iphone|ipad|ipod|ios/.test(UA)) || (weexPlatform === 'ios');
var isChrome = UA && /chrome\/\d+/.test(UA) && !isEdge;
var isPhantomJS = UA && /phantomjs/.test(UA);
var isFF = UA && UA.match(/firefox\/(\d+)/);

// Firefox has a "watch" function on Object.prototype...
var nativeWatch = ({}).watch;
if (inBrowser) {
  try {
    var opts = {};
    Object.defineProperty(opts, 'passive', ({
      get: function get () {
      }
    })); // https://github.com/facebook/flow/issues/285
    window.addEventListener('test-passive', null, opts);
  } catch (e) {}
}

// this needs to be lazy-evaled because vue may be required before
// vue-server-renderer can set VUE_ENV
var _isServer;
var isServerRendering = function () {
  if (_isServer === undefined) {
    /* istanbul ignore if */
    if (!inBrowser && !inWeex && typeof global !== 'undefined') {
      // detect presence of vue-server-renderer and avoid
      // Webpack shimming the process
      _isServer = global['process'] && global['process'].env.VUE_ENV === 'server';
    } else {
      _isServer = false;
    }
  }
  return _isServer
};

// detect devtools
var devtools = inBrowser && window.__VUE_DEVTOOLS_GLOBAL_HOOK__;

/* istanbul ignore next */
function isNative (Ctor) {
  return typeof Ctor === 'function' && /native code/.test(Ctor.toString())
}

var hasSymbol =
  typeof Symbol !== 'undefined' && isNative(Symbol) &&
  typeof Reflect !== 'undefined' && isNative(Reflect.ownKeys);

var _Set;
/* istanbul ignore if */ // $flow-disable-line
if (typeof Set !== 'undefined' && isNative(Set)) {
  // use native Set when available.
  _Set = Set;
} else {
  // a non-standard Set polyfill that only works with primitive keys.
  _Set = /*@__PURE__*/(function () {
    function Set () {
      this.set = Object.create(null);
    }
    Set.prototype.has = function has (key) {
      return this.set[key] === true
    };
    Set.prototype.add = function add (key) {
      this.set[key] = true;
    };
    Set.prototype.clear = function clear () {
      this.set = Object.create(null);
    };

    return Set;
  }());
}

/*  */

var warn = noop;
var tip = noop;
var generateComponentTrace = (noop); // work around flow check
var formatComponentName = (noop);

if (true) {
  var hasConsole = typeof console !== 'undefined';
  var classifyRE = /(?:^|[-_])(\w)/g;
  var classify = function (str) { return str
    .replace(classifyRE, function (c) { return c.toUpperCase(); })
    .replace(/[-_]/g, ''); };

  warn = function (msg, vm) {
    var trace = vm ? generateComponentTrace(vm) : '';

    if (config.warnHandler) {
      config.warnHandler.call(null, msg, vm, trace);
    } else if (hasConsole && (!config.silent)) {
      console.error(("[Vue warn]: " + msg + trace));
    }
  };

  tip = function (msg, vm) {
    if (hasConsole && (!config.silent)) {
      console.warn("[Vue tip]: " + msg + (
        vm ? generateComponentTrace(vm) : ''
      ));
    }
  };

  formatComponentName = function (vm, includeFile) {
    {
      if(vm.$scope && vm.$scope.is){
        return vm.$scope.is
      }
    }
    if (vm.$root === vm) {
      return '<Root>'
    }
    var options = typeof vm === 'function' && vm.cid != null
      ? vm.options
      : vm._isVue
        ? vm.$options || vm.constructor.options
        : vm;
    var name = options.name || options._componentTag;
    var file = options.__file;
    if (!name && file) {
      var match = file.match(/([^/\\]+)\.vue$/);
      name = match && match[1];
    }

    return (
      (name ? ("<" + (classify(name)) + ">") : "<Anonymous>") +
      (file && includeFile !== false ? (" at " + file) : '')
    )
  };

  var repeat = function (str, n) {
    var res = '';
    while (n) {
      if (n % 2 === 1) { res += str; }
      if (n > 1) { str += str; }
      n >>= 1;
    }
    return res
  };

  generateComponentTrace = function (vm) {
    if (vm._isVue && vm.$parent) {
      var tree = [];
      var currentRecursiveSequence = 0;
      while (vm) {
        if (tree.length > 0) {
          var last = tree[tree.length - 1];
          if (last.constructor === vm.constructor) {
            currentRecursiveSequence++;
            vm = vm.$parent;
            continue
          } else if (currentRecursiveSequence > 0) {
            tree[tree.length - 1] = [last, currentRecursiveSequence];
            currentRecursiveSequence = 0;
          }
        }
        tree.push(vm);
        vm = vm.$parent;
      }
      return '\n\nfound in\n\n' + tree
        .map(function (vm, i) { return ("" + (i === 0 ? '---> ' : repeat(' ', 5 + i * 2)) + (Array.isArray(vm)
            ? ((formatComponentName(vm[0])) + "... (" + (vm[1]) + " recursive calls)")
            : formatComponentName(vm))); })
        .join('\n')
    } else {
      return ("\n\n(found in " + (formatComponentName(vm)) + ")")
    }
  };
}

/*  */

var uid = 0;

/**
 * A dep is an observable that can have multiple
 * directives subscribing to it.
 */
var Dep = function Dep () {
  // fixed by xxxxxx (nvue vuex)
  /* eslint-disable no-undef */
  if(typeof SharedObject !== 'undefined'){
    this.id = SharedObject.uid++;
  } else {
    this.id = uid++;
  }
  this.subs = [];
};

Dep.prototype.addSub = function addSub (sub) {
  this.subs.push(sub);
};

Dep.prototype.removeSub = function removeSub (sub) {
  remove(this.subs, sub);
};

Dep.prototype.depend = function depend () {
  if (Dep.SharedObject.target) {
    Dep.SharedObject.target.addDep(this);
  }
};

Dep.prototype.notify = function notify () {
  // stabilize the subscriber list first
  var subs = this.subs.slice();
  if ( true && !config.async) {
    // subs aren't sorted in scheduler if not running async
    // we need to sort them now to make sure they fire in correct
    // order
    subs.sort(function (a, b) { return a.id - b.id; });
  }
  for (var i = 0, l = subs.length; i < l; i++) {
    subs[i].update();
  }
};

// The current target watcher being evaluated.
// This is globally unique because only one watcher
// can be evaluated at a time.
// fixed by xxxxxx (nvue shared vuex)
/* eslint-disable no-undef */
Dep.SharedObject = typeof SharedObject !== 'undefined' ? SharedObject : {};
Dep.SharedObject.target = null;
Dep.SharedObject.targetStack = [];

function pushTarget (target) {
  Dep.SharedObject.targetStack.push(target);
  Dep.SharedObject.target = target;
}

function popTarget () {
  Dep.SharedObject.targetStack.pop();
  Dep.SharedObject.target = Dep.SharedObject.targetStack[Dep.SharedObject.targetStack.length - 1];
}

/*  */

var VNode = function VNode (
  tag,
  data,
  children,
  text,
  elm,
  context,
  componentOptions,
  asyncFactory
) {
  this.tag = tag;
  this.data = data;
  this.children = children;
  this.text = text;
  this.elm = elm;
  this.ns = undefined;
  this.context = context;
  this.fnContext = undefined;
  this.fnOptions = undefined;
  this.fnScopeId = undefined;
  this.key = data && data.key;
  this.componentOptions = componentOptions;
  this.componentInstance = undefined;
  this.parent = undefined;
  this.raw = false;
  this.isStatic = false;
  this.isRootInsert = true;
  this.isComment = false;
  this.isCloned = false;
  this.isOnce = false;
  this.asyncFactory = asyncFactory;
  this.asyncMeta = undefined;
  this.isAsyncPlaceholder = false;
};

var prototypeAccessors = { child: { configurable: true } };

// DEPRECATED: alias for componentInstance for backwards compat.
/* istanbul ignore next */
prototypeAccessors.child.get = function () {
  return this.componentInstance
};

Object.defineProperties( VNode.prototype, prototypeAccessors );

var createEmptyVNode = function (text) {
  if ( text === void 0 ) text = '';

  var node = new VNode();
  node.text = text;
  node.isComment = true;
  return node
};

function createTextVNode (val) {
  return new VNode(undefined, undefined, undefined, String(val))
}

// optimized shallow clone
// used for static nodes and slot nodes because they may be reused across
// multiple renders, cloning them avoids errors when DOM manipulations rely
// on their elm reference.
function cloneVNode (vnode) {
  var cloned = new VNode(
    vnode.tag,
    vnode.data,
    // #7975
    // clone children array to avoid mutating original in case of cloning
    // a child.
    vnode.children && vnode.children.slice(),
    vnode.text,
    vnode.elm,
    vnode.context,
    vnode.componentOptions,
    vnode.asyncFactory
  );
  cloned.ns = vnode.ns;
  cloned.isStatic = vnode.isStatic;
  cloned.key = vnode.key;
  cloned.isComment = vnode.isComment;
  cloned.fnContext = vnode.fnContext;
  cloned.fnOptions = vnode.fnOptions;
  cloned.fnScopeId = vnode.fnScopeId;
  cloned.asyncMeta = vnode.asyncMeta;
  cloned.isCloned = true;
  return cloned
}

/*
 * not type checking this file because flow doesn't play well with
 * dynamically accessing methods on Array prototype
 */

var arrayProto = Array.prototype;
var arrayMethods = Object.create(arrayProto);

var methodsToPatch = [
  'push',
  'pop',
  'shift',
  'unshift',
  'splice',
  'sort',
  'reverse'
];

/**
 * Intercept mutating methods and emit events
 */
methodsToPatch.forEach(function (method) {
  // cache original method
  var original = arrayProto[method];
  def(arrayMethods, method, function mutator () {
    var args = [], len = arguments.length;
    while ( len-- ) args[ len ] = arguments[ len ];

    var result = original.apply(this, args);
    var ob = this.__ob__;
    var inserted;
    switch (method) {
      case 'push':
      case 'unshift':
        inserted = args;
        break
      case 'splice':
        inserted = args.slice(2);
        break
    }
    if (inserted) { ob.observeArray(inserted); }
    // notify change
    ob.dep.notify();
    return result
  });
});

/*  */

var arrayKeys = Object.getOwnPropertyNames(arrayMethods);

/**
 * In some cases we may want to disable observation inside a component's
 * update computation.
 */
var shouldObserve = true;

function toggleObserving (value) {
  shouldObserve = value;
}

/**
 * Observer class that is attached to each observed
 * object. Once attached, the observer converts the target
 * object's property keys into getter/setters that
 * collect dependencies and dispatch updates.
 */
var Observer = function Observer (value) {
  this.value = value;
  this.dep = new Dep();
  this.vmCount = 0;
  def(value, '__ob__', this);
  if (Array.isArray(value)) {
    if (hasProto) {
      {// fixed by xxxxxx 微信小程序使用 plugins 之后，数组方法被直接挂载到了数组对象上，需要执行 copyAugment 逻辑
        if(value.push !== value.__proto__.push){
          copyAugment(value, arrayMethods, arrayKeys);
        } else {
          protoAugment(value, arrayMethods);
        }
      }
    } else {
      copyAugment(value, arrayMethods, arrayKeys);
    }
    this.observeArray(value);
  } else {
    this.walk(value);
  }
};

/**
 * Walk through all properties and convert them into
 * getter/setters. This method should only be called when
 * value type is Object.
 */
Observer.prototype.walk = function walk (obj) {
  var keys = Object.keys(obj);
  for (var i = 0; i < keys.length; i++) {
    defineReactive$$1(obj, keys[i]);
  }
};

/**
 * Observe a list of Array items.
 */
Observer.prototype.observeArray = function observeArray (items) {
  for (var i = 0, l = items.length; i < l; i++) {
    observe(items[i]);
  }
};

// helpers

/**
 * Augment a target Object or Array by intercepting
 * the prototype chain using __proto__
 */
function protoAugment (target, src) {
  /* eslint-disable no-proto */
  target.__proto__ = src;
  /* eslint-enable no-proto */
}

/**
 * Augment a target Object or Array by defining
 * hidden properties.
 */
/* istanbul ignore next */
function copyAugment (target, src, keys) {
  for (var i = 0, l = keys.length; i < l; i++) {
    var key = keys[i];
    def(target, key, src[key]);
  }
}

/**
 * Attempt to create an observer instance for a value,
 * returns the new observer if successfully observed,
 * or the existing observer if the value already has one.
 */
function observe (value, asRootData) {
  if (!isObject(value) || value instanceof VNode) {
    return
  }
  var ob;
  if (hasOwn(value, '__ob__') && value.__ob__ instanceof Observer) {
    ob = value.__ob__;
  } else if (
    shouldObserve &&
    !isServerRendering() &&
    (Array.isArray(value) || isPlainObject(value)) &&
    Object.isExtensible(value) &&
    !value._isVue
  ) {
    ob = new Observer(value);
  }
  if (asRootData && ob) {
    ob.vmCount++;
  }
  return ob
}

/**
 * Define a reactive property on an Object.
 */
function defineReactive$$1 (
  obj,
  key,
  val,
  customSetter,
  shallow
) {
  var dep = new Dep();

  var property = Object.getOwnPropertyDescriptor(obj, key);
  if (property && property.configurable === false) {
    return
  }

  // cater for pre-defined getter/setters
  var getter = property && property.get;
  var setter = property && property.set;
  if ((!getter || setter) && arguments.length === 2) {
    val = obj[key];
  }

  var childOb = !shallow && observe(val);
  Object.defineProperty(obj, key, {
    enumerable: true,
    configurable: true,
    get: function reactiveGetter () {
      var value = getter ? getter.call(obj) : val;
      if (Dep.SharedObject.target) { // fixed by xxxxxx
        dep.depend();
        if (childOb) {
          childOb.dep.depend();
          if (Array.isArray(value)) {
            dependArray(value);
          }
        }
      }
      return value
    },
    set: function reactiveSetter (newVal) {
      var value = getter ? getter.call(obj) : val;
      /* eslint-disable no-self-compare */
      if (newVal === value || (newVal !== newVal && value !== value)) {
        return
      }
      /* eslint-enable no-self-compare */
      if ( true && customSetter) {
        customSetter();
      }
      // #7981: for accessor properties without setter
      if (getter && !setter) { return }
      if (setter) {
        setter.call(obj, newVal);
      } else {
        val = newVal;
      }
      childOb = !shallow && observe(newVal);
      dep.notify();
    }
  });
}

/**
 * Set a property on an object. Adds the new property and
 * triggers change notification if the property doesn't
 * already exist.
 */
function set (target, key, val) {
  if ( true &&
    (isUndef(target) || isPrimitive(target))
  ) {
    warn(("Cannot set reactive property on undefined, null, or primitive value: " + ((target))));
  }
  if (Array.isArray(target) && isValidArrayIndex(key)) {
    target.length = Math.max(target.length, key);
    target.splice(key, 1, val);
    return val
  }
  if (key in target && !(key in Object.prototype)) {
    target[key] = val;
    return val
  }
  var ob = (target).__ob__;
  if (target._isVue || (ob && ob.vmCount)) {
     true && warn(
      'Avoid adding reactive properties to a Vue instance or its root $data ' +
      'at runtime - declare it upfront in the data option.'
    );
    return val
  }
  if (!ob) {
    target[key] = val;
    return val
  }
  defineReactive$$1(ob.value, key, val);
  ob.dep.notify();
  return val
}

/**
 * Delete a property and trigger change if necessary.
 */
function del (target, key) {
  if ( true &&
    (isUndef(target) || isPrimitive(target))
  ) {
    warn(("Cannot delete reactive property on undefined, null, or primitive value: " + ((target))));
  }
  if (Array.isArray(target) && isValidArrayIndex(key)) {
    target.splice(key, 1);
    return
  }
  var ob = (target).__ob__;
  if (target._isVue || (ob && ob.vmCount)) {
     true && warn(
      'Avoid deleting properties on a Vue instance or its root $data ' +
      '- just set it to null.'
    );
    return
  }
  if (!hasOwn(target, key)) {
    return
  }
  delete target[key];
  if (!ob) {
    return
  }
  ob.dep.notify();
}

/**
 * Collect dependencies on array elements when the array is touched, since
 * we cannot intercept array element access like property getters.
 */
function dependArray (value) {
  for (var e = (void 0), i = 0, l = value.length; i < l; i++) {
    e = value[i];
    e && e.__ob__ && e.__ob__.dep.depend();
    if (Array.isArray(e)) {
      dependArray(e);
    }
  }
}

/*  */

/**
 * Option overwriting strategies are functions that handle
 * how to merge a parent option value and a child option
 * value into the final value.
 */
var strats = config.optionMergeStrategies;

/**
 * Options with restrictions
 */
if (true) {
  strats.el = strats.propsData = function (parent, child, vm, key) {
    if (!vm) {
      warn(
        "option \"" + key + "\" can only be used during instance " +
        'creation with the `new` keyword.'
      );
    }
    return defaultStrat(parent, child)
  };
}

/**
 * Helper that recursively merges two data objects together.
 */
function mergeData (to, from) {
  if (!from) { return to }
  var key, toVal, fromVal;

  var keys = hasSymbol
    ? Reflect.ownKeys(from)
    : Object.keys(from);

  for (var i = 0; i < keys.length; i++) {
    key = keys[i];
    // in case the object is already observed...
    if (key === '__ob__') { continue }
    toVal = to[key];
    fromVal = from[key];
    if (!hasOwn(to, key)) {
      set(to, key, fromVal);
    } else if (
      toVal !== fromVal &&
      isPlainObject(toVal) &&
      isPlainObject(fromVal)
    ) {
      mergeData(toVal, fromVal);
    }
  }
  return to
}

/**
 * Data
 */
function mergeDataOrFn (
  parentVal,
  childVal,
  vm
) {
  if (!vm) {
    // in a Vue.extend merge, both should be functions
    if (!childVal) {
      return parentVal
    }
    if (!parentVal) {
      return childVal
    }
    // when parentVal & childVal are both present,
    // we need to return a function that returns the
    // merged result of both functions... no need to
    // check if parentVal is a function here because
    // it has to be a function to pass previous merges.
    return function mergedDataFn () {
      return mergeData(
        typeof childVal === 'function' ? childVal.call(this, this) : childVal,
        typeof parentVal === 'function' ? parentVal.call(this, this) : parentVal
      )
    }
  } else {
    return function mergedInstanceDataFn () {
      // instance merge
      var instanceData = typeof childVal === 'function'
        ? childVal.call(vm, vm)
        : childVal;
      var defaultData = typeof parentVal === 'function'
        ? parentVal.call(vm, vm)
        : parentVal;
      if (instanceData) {
        return mergeData(instanceData, defaultData)
      } else {
        return defaultData
      }
    }
  }
}

strats.data = function (
  parentVal,
  childVal,
  vm
) {
  if (!vm) {
    if (childVal && typeof childVal !== 'function') {
       true && warn(
        'The "data" option should be a function ' +
        'that returns a per-instance value in component ' +
        'definitions.',
        vm
      );

      return parentVal
    }
    return mergeDataOrFn(parentVal, childVal)
  }

  return mergeDataOrFn(parentVal, childVal, vm)
};

/**
 * Hooks and props are merged as arrays.
 */
function mergeHook (
  parentVal,
  childVal
) {
  var res = childVal
    ? parentVal
      ? parentVal.concat(childVal)
      : Array.isArray(childVal)
        ? childVal
        : [childVal]
    : parentVal;
  return res
    ? dedupeHooks(res)
    : res
}

function dedupeHooks (hooks) {
  var res = [];
  for (var i = 0; i < hooks.length; i++) {
    if (res.indexOf(hooks[i]) === -1) {
      res.push(hooks[i]);
    }
  }
  return res
}

LIFECYCLE_HOOKS.forEach(function (hook) {
  strats[hook] = mergeHook;
});

/**
 * Assets
 *
 * When a vm is present (instance creation), we need to do
 * a three-way merge between constructor options, instance
 * options and parent options.
 */
function mergeAssets (
  parentVal,
  childVal,
  vm,
  key
) {
  var res = Object.create(parentVal || null);
  if (childVal) {
     true && assertObjectType(key, childVal, vm);
    return extend(res, childVal)
  } else {
    return res
  }
}

ASSET_TYPES.forEach(function (type) {
  strats[type + 's'] = mergeAssets;
});

/**
 * Watchers.
 *
 * Watchers hashes should not overwrite one
 * another, so we merge them as arrays.
 */
strats.watch = function (
  parentVal,
  childVal,
  vm,
  key
) {
  // work around Firefox's Object.prototype.watch...
  if (parentVal === nativeWatch) { parentVal = undefined; }
  if (childVal === nativeWatch) { childVal = undefined; }
  /* istanbul ignore if */
  if (!childVal) { return Object.create(parentVal || null) }
  if (true) {
    assertObjectType(key, childVal, vm);
  }
  if (!parentVal) { return childVal }
  var ret = {};
  extend(ret, parentVal);
  for (var key$1 in childVal) {
    var parent = ret[key$1];
    var child = childVal[key$1];
    if (parent && !Array.isArray(parent)) {
      parent = [parent];
    }
    ret[key$1] = parent
      ? parent.concat(child)
      : Array.isArray(child) ? child : [child];
  }
  return ret
};

/**
 * Other object hashes.
 */
strats.props =
strats.methods =
strats.inject =
strats.computed = function (
  parentVal,
  childVal,
  vm,
  key
) {
  if (childVal && "development" !== 'production') {
    assertObjectType(key, childVal, vm);
  }
  if (!parentVal) { return childVal }
  var ret = Object.create(null);
  extend(ret, parentVal);
  if (childVal) { extend(ret, childVal); }
  return ret
};
strats.provide = mergeDataOrFn;

/**
 * Default strategy.
 */
var defaultStrat = function (parentVal, childVal) {
  return childVal === undefined
    ? parentVal
    : childVal
};

/**
 * Validate component names
 */
function checkComponents (options) {
  for (var key in options.components) {
    validateComponentName(key);
  }
}

function validateComponentName (name) {
  if (!new RegExp(("^[a-zA-Z][\\-\\.0-9_" + (unicodeRegExp.source) + "]*$")).test(name)) {
    warn(
      'Invalid component name: "' + name + '". Component names ' +
      'should conform to valid custom element name in html5 specification.'
    );
  }
  if (isBuiltInTag(name) || config.isReservedTag(name)) {
    warn(
      'Do not use built-in or reserved HTML elements as component ' +
      'id: ' + name
    );
  }
}

/**
 * Ensure all props option syntax are normalized into the
 * Object-based format.
 */
function normalizeProps (options, vm) {
  var props = options.props;
  if (!props) { return }
  var res = {};
  var i, val, name;
  if (Array.isArray(props)) {
    i = props.length;
    while (i--) {
      val = props[i];
      if (typeof val === 'string') {
        name = camelize(val);
        res[name] = { type: null };
      } else if (true) {
        warn('props must be strings when using array syntax.');
      }
    }
  } else if (isPlainObject(props)) {
    for (var key in props) {
      val = props[key];
      name = camelize(key);
      res[name] = isPlainObject(val)
        ? val
        : { type: val };
    }
  } else if (true) {
    warn(
      "Invalid value for option \"props\": expected an Array or an Object, " +
      "but got " + (toRawType(props)) + ".",
      vm
    );
  }
  options.props = res;
}

/**
 * Normalize all injections into Object-based format
 */
function normalizeInject (options, vm) {
  var inject = options.inject;
  if (!inject) { return }
  var normalized = options.inject = {};
  if (Array.isArray(inject)) {
    for (var i = 0; i < inject.length; i++) {
      normalized[inject[i]] = { from: inject[i] };
    }
  } else if (isPlainObject(inject)) {
    for (var key in inject) {
      var val = inject[key];
      normalized[key] = isPlainObject(val)
        ? extend({ from: key }, val)
        : { from: val };
    }
  } else if (true) {
    warn(
      "Invalid value for option \"inject\": expected an Array or an Object, " +
      "but got " + (toRawType(inject)) + ".",
      vm
    );
  }
}

/**
 * Normalize raw function directives into object format.
 */
function normalizeDirectives (options) {
  var dirs = options.directives;
  if (dirs) {
    for (var key in dirs) {
      var def$$1 = dirs[key];
      if (typeof def$$1 === 'function') {
        dirs[key] = { bind: def$$1, update: def$$1 };
      }
    }
  }
}

function assertObjectType (name, value, vm) {
  if (!isPlainObject(value)) {
    warn(
      "Invalid value for option \"" + name + "\": expected an Object, " +
      "but got " + (toRawType(value)) + ".",
      vm
    );
  }
}

/**
 * Merge two option objects into a new one.
 * Core utility used in both instantiation and inheritance.
 */
function mergeOptions (
  parent,
  child,
  vm
) {
  if (true) {
    checkComponents(child);
  }

  if (typeof child === 'function') {
    child = child.options;
  }

  normalizeProps(child, vm);
  normalizeInject(child, vm);
  normalizeDirectives(child);

  // Apply extends and mixins on the child options,
  // but only if it is a raw options object that isn't
  // the result of another mergeOptions call.
  // Only merged options has the _base property.
  if (!child._base) {
    if (child.extends) {
      parent = mergeOptions(parent, child.extends, vm);
    }
    if (child.mixins) {
      for (var i = 0, l = child.mixins.length; i < l; i++) {
        parent = mergeOptions(parent, child.mixins[i], vm);
      }
    }
  }

  var options = {};
  var key;
  for (key in parent) {
    mergeField(key);
  }
  for (key in child) {
    if (!hasOwn(parent, key)) {
      mergeField(key);
    }
  }
  function mergeField (key) {
    var strat = strats[key] || defaultStrat;
    options[key] = strat(parent[key], child[key], vm, key);
  }
  return options
}

/**
 * Resolve an asset.
 * This function is used because child instances need access
 * to assets defined in its ancestor chain.
 */
function resolveAsset (
  options,
  type,
  id,
  warnMissing
) {
  /* istanbul ignore if */
  if (typeof id !== 'string') {
    return
  }
  var assets = options[type];
  // check local registration variations first
  if (hasOwn(assets, id)) { return assets[id] }
  var camelizedId = camelize(id);
  if (hasOwn(assets, camelizedId)) { return assets[camelizedId] }
  var PascalCaseId = capitalize(camelizedId);
  if (hasOwn(assets, PascalCaseId)) { return assets[PascalCaseId] }
  // fallback to prototype chain
  var res = assets[id] || assets[camelizedId] || assets[PascalCaseId];
  if ( true && warnMissing && !res) {
    warn(
      'Failed to resolve ' + type.slice(0, -1) + ': ' + id,
      options
    );
  }
  return res
}

/*  */



function validateProp (
  key,
  propOptions,
  propsData,
  vm
) {
  var prop = propOptions[key];
  var absent = !hasOwn(propsData, key);
  var value = propsData[key];
  // boolean casting
  var booleanIndex = getTypeIndex(Boolean, prop.type);
  if (booleanIndex > -1) {
    if (absent && !hasOwn(prop, 'default')) {
      value = false;
    } else if (value === '' || value === hyphenate(key)) {
      // only cast empty string / same name to boolean if
      // boolean has higher priority
      var stringIndex = getTypeIndex(String, prop.type);
      if (stringIndex < 0 || booleanIndex < stringIndex) {
        value = true;
      }
    }
  }
  // check default value
  if (value === undefined) {
    value = getPropDefaultValue(vm, prop, key);
    // since the default value is a fresh copy,
    // make sure to observe it.
    var prevShouldObserve = shouldObserve;
    toggleObserving(true);
    observe(value);
    toggleObserving(prevShouldObserve);
  }
  if (
    true
  ) {
    assertProp(prop, key, value, vm, absent);
  }
  return value
}

/**
 * Get the default value of a prop.
 */
function getPropDefaultValue (vm, prop, key) {
  // no default, return undefined
  if (!hasOwn(prop, 'default')) {
    return undefined
  }
  var def = prop.default;
  // warn against non-factory defaults for Object & Array
  if ( true && isObject(def)) {
    warn(
      'Invalid default value for prop "' + key + '": ' +
      'Props with type Object/Array must use a factory function ' +
      'to return the default value.',
      vm
    );
  }
  // the raw prop value was also undefined from previous render,
  // return previous default value to avoid unnecessary watcher trigger
  if (vm && vm.$options.propsData &&
    vm.$options.propsData[key] === undefined &&
    vm._props[key] !== undefined
  ) {
    return vm._props[key]
  }
  // call factory function for non-Function types
  // a value is Function if its prototype is function even across different execution context
  return typeof def === 'function' && getType(prop.type) !== 'Function'
    ? def.call(vm)
    : def
}

/**
 * Assert whether a prop is valid.
 */
function assertProp (
  prop,
  name,
  value,
  vm,
  absent
) {
  if (prop.required && absent) {
    warn(
      'Missing required prop: "' + name + '"',
      vm
    );
    return
  }
  if (value == null && !prop.required) {
    return
  }
  var type = prop.type;
  var valid = !type || type === true;
  var expectedTypes = [];
  if (type) {
    if (!Array.isArray(type)) {
      type = [type];
    }
    for (var i = 0; i < type.length && !valid; i++) {
      var assertedType = assertType(value, type[i]);
      expectedTypes.push(assertedType.expectedType || '');
      valid = assertedType.valid;
    }
  }

  if (!valid) {
    warn(
      getInvalidTypeMessage(name, value, expectedTypes),
      vm
    );
    return
  }
  var validator = prop.validator;
  if (validator) {
    if (!validator(value)) {
      warn(
        'Invalid prop: custom validator check failed for prop "' + name + '".',
        vm
      );
    }
  }
}

var simpleCheckRE = /^(String|Number|Boolean|Function|Symbol)$/;

function assertType (value, type) {
  var valid;
  var expectedType = getType(type);
  if (simpleCheckRE.test(expectedType)) {
    var t = typeof value;
    valid = t === expectedType.toLowerCase();
    // for primitive wrapper objects
    if (!valid && t === 'object') {
      valid = value instanceof type;
    }
  } else if (expectedType === 'Object') {
    valid = isPlainObject(value);
  } else if (expectedType === 'Array') {
    valid = Array.isArray(value);
  } else {
    valid = value instanceof type;
  }
  return {
    valid: valid,
    expectedType: expectedType
  }
}

/**
 * Use function string name to check built-in types,
 * because a simple equality check will fail when running
 * across different vms / iframes.
 */
function getType (fn) {
  var match = fn && fn.toString().match(/^\s*function (\w+)/);
  return match ? match[1] : ''
}

function isSameType (a, b) {
  return getType(a) === getType(b)
}

function getTypeIndex (type, expectedTypes) {
  if (!Array.isArray(expectedTypes)) {
    return isSameType(expectedTypes, type) ? 0 : -1
  }
  for (var i = 0, len = expectedTypes.length; i < len; i++) {
    if (isSameType(expectedTypes[i], type)) {
      return i
    }
  }
  return -1
}

function getInvalidTypeMessage (name, value, expectedTypes) {
  var message = "Invalid prop: type check failed for prop \"" + name + "\"." +
    " Expected " + (expectedTypes.map(capitalize).join(', '));
  var expectedType = expectedTypes[0];
  var receivedType = toRawType(value);
  var expectedValue = styleValue(value, expectedType);
  var receivedValue = styleValue(value, receivedType);
  // check if we need to specify expected value
  if (expectedTypes.length === 1 &&
      isExplicable(expectedType) &&
      !isBoolean(expectedType, receivedType)) {
    message += " with value " + expectedValue;
  }
  message += ", got " + receivedType + " ";
  // check if we need to specify received value
  if (isExplicable(receivedType)) {
    message += "with value " + receivedValue + ".";
  }
  return message
}

function styleValue (value, type) {
  if (type === 'String') {
    return ("\"" + value + "\"")
  } else if (type === 'Number') {
    return ("" + (Number(value)))
  } else {
    return ("" + value)
  }
}

function isExplicable (value) {
  var explicitTypes = ['string', 'number', 'boolean'];
  return explicitTypes.some(function (elem) { return value.toLowerCase() === elem; })
}

function isBoolean () {
  var args = [], len = arguments.length;
  while ( len-- ) args[ len ] = arguments[ len ];

  return args.some(function (elem) { return elem.toLowerCase() === 'boolean'; })
}

/*  */

function handleError (err, vm, info) {
  // Deactivate deps tracking while processing error handler to avoid possible infinite rendering.
  // See: https://github.com/vuejs/vuex/issues/1505
  pushTarget();
  try {
    if (vm) {
      var cur = vm;
      while ((cur = cur.$parent)) {
        var hooks = cur.$options.errorCaptured;
        if (hooks) {
          for (var i = 0; i < hooks.length; i++) {
            try {
              var capture = hooks[i].call(cur, err, vm, info) === false;
              if (capture) { return }
            } catch (e) {
              globalHandleError(e, cur, 'errorCaptured hook');
            }
          }
        }
      }
    }
    globalHandleError(err, vm, info);
  } finally {
    popTarget();
  }
}

function invokeWithErrorHandling (
  handler,
  context,
  args,
  vm,
  info
) {
  var res;
  try {
    res = args ? handler.apply(context, args) : handler.call(context);
    if (res && !res._isVue && isPromise(res) && !res._handled) {
      res.catch(function (e) { return handleError(e, vm, info + " (Promise/async)"); });
      // issue #9511
      // avoid catch triggering multiple times when nested calls
      res._handled = true;
    }
  } catch (e) {
    handleError(e, vm, info);
  }
  return res
}

function globalHandleError (err, vm, info) {
  if (config.errorHandler) {
    try {
      return config.errorHandler.call(null, err, vm, info)
    } catch (e) {
      // if the user intentionally throws the original error in the handler,
      // do not log it twice
      if (e !== err) {
        logError(e, null, 'config.errorHandler');
      }
    }
  }
  logError(err, vm, info);
}

function logError (err, vm, info) {
  if (true) {
    warn(("Error in " + info + ": \"" + (err.toString()) + "\""), vm);
  }
  /* istanbul ignore else */
  if ((inBrowser || inWeex) && typeof console !== 'undefined') {
    console.error(err);
  } else {
    throw err
  }
}

/*  */

var callbacks = [];
var pending = false;

function flushCallbacks () {
  pending = false;
  var copies = callbacks.slice(0);
  callbacks.length = 0;
  for (var i = 0; i < copies.length; i++) {
    copies[i]();
  }
}

// Here we have async deferring wrappers using microtasks.
// In 2.5 we used (macro) tasks (in combination with microtasks).
// However, it has subtle problems when state is changed right before repaint
// (e.g. #6813, out-in transitions).
// Also, using (macro) tasks in event handler would cause some weird behaviors
// that cannot be circumvented (e.g. #7109, #7153, #7546, #7834, #8109).
// So we now use microtasks everywhere, again.
// A major drawback of this tradeoff is that there are some scenarios
// where microtasks have too high a priority and fire in between supposedly
// sequential events (e.g. #4521, #6690, which have workarounds)
// or even between bubbling of the same event (#6566).
var timerFunc;

// The nextTick behavior leverages the microtask queue, which can be accessed
// via either native Promise.then or MutationObserver.
// MutationObserver has wider support, however it is seriously bugged in
// UIWebView in iOS >= 9.3.3 when triggered in touch event handlers. It
// completely stops working after triggering a few times... so, if native
// Promise is available, we will use it:
/* istanbul ignore next, $flow-disable-line */
if (typeof Promise !== 'undefined' && isNative(Promise)) {
  var p = Promise.resolve();
  timerFunc = function () {
    p.then(flushCallbacks);
    // In problematic UIWebViews, Promise.then doesn't completely break, but
    // it can get stuck in a weird state where callbacks are pushed into the
    // microtask queue but the queue isn't being flushed, until the browser
    // needs to do some other work, e.g. handle a timer. Therefore we can
    // "force" the microtask queue to be flushed by adding an empty timer.
    if (isIOS) { setTimeout(noop); }
  };
} else if (!isIE && typeof MutationObserver !== 'undefined' && (
  isNative(MutationObserver) ||
  // PhantomJS and iOS 7.x
  MutationObserver.toString() === '[object MutationObserverConstructor]'
)) {
  // Use MutationObserver where native Promise is not available,
  // e.g. PhantomJS, iOS7, Android 4.4
  // (#6466 MutationObserver is unreliable in IE11)
  var counter = 1;
  var observer = new MutationObserver(flushCallbacks);
  var textNode = document.createTextNode(String(counter));
  observer.observe(textNode, {
    characterData: true
  });
  timerFunc = function () {
    counter = (counter + 1) % 2;
    textNode.data = String(counter);
  };
} else if (typeof setImmediate !== 'undefined' && isNative(setImmediate)) {
  // Fallback to setImmediate.
  // Technically it leverages the (macro) task queue,
  // but it is still a better choice than setTimeout.
  timerFunc = function () {
    setImmediate(flushCallbacks);
  };
} else {
  // Fallback to setTimeout.
  timerFunc = function () {
    setTimeout(flushCallbacks, 0);
  };
}

function nextTick (cb, ctx) {
  var _resolve;
  callbacks.push(function () {
    if (cb) {
      try {
        cb.call(ctx);
      } catch (e) {
        handleError(e, ctx, 'nextTick');
      }
    } else if (_resolve) {
      _resolve(ctx);
    }
  });
  if (!pending) {
    pending = true;
    timerFunc();
  }
  // $flow-disable-line
  if (!cb && typeof Promise !== 'undefined') {
    return new Promise(function (resolve) {
      _resolve = resolve;
    })
  }
}

/*  */

/* not type checking this file because flow doesn't play well with Proxy */

var initProxy;

if (true) {
  var allowedGlobals = makeMap(
    'Infinity,undefined,NaN,isFinite,isNaN,' +
    'parseFloat,parseInt,decodeURI,decodeURIComponent,encodeURI,encodeURIComponent,' +
    'Math,Number,Date,Array,Object,Boolean,String,RegExp,Map,Set,JSON,Intl,' +
    'require' // for Webpack/Browserify
  );

  var warnNonPresent = function (target, key) {
    warn(
      "Property or method \"" + key + "\" is not defined on the instance but " +
      'referenced during render. Make sure that this property is reactive, ' +
      'either in the data option, or for class-based components, by ' +
      'initializing the property. ' +
      'See: https://vuejs.org/v2/guide/reactivity.html#Declaring-Reactive-Properties.',
      target
    );
  };

  var warnReservedPrefix = function (target, key) {
    warn(
      "Property \"" + key + "\" must be accessed with \"$data." + key + "\" because " +
      'properties starting with "$" or "_" are not proxied in the Vue instance to ' +
      'prevent conflicts with Vue internals. ' +
      'See: https://vuejs.org/v2/api/#data',
      target
    );
  };

  var hasProxy =
    typeof Proxy !== 'undefined' && isNative(Proxy);

  if (hasProxy) {
    var isBuiltInModifier = makeMap('stop,prevent,self,ctrl,shift,alt,meta,exact');
    config.keyCodes = new Proxy(config.keyCodes, {
      set: function set (target, key, value) {
        if (isBuiltInModifier(key)) {
          warn(("Avoid overwriting built-in modifier in config.keyCodes: ." + key));
          return false
        } else {
          target[key] = value;
          return true
        }
      }
    });
  }

  var hasHandler = {
    has: function has (target, key) {
      var has = key in target;
      var isAllowed = allowedGlobals(key) ||
        (typeof key === 'string' && key.charAt(0) === '_' && !(key in target.$data));
      if (!has && !isAllowed) {
        if (key in target.$data) { warnReservedPrefix(target, key); }
        else { warnNonPresent(target, key); }
      }
      return has || !isAllowed
    }
  };

  var getHandler = {
    get: function get (target, key) {
      if (typeof key === 'string' && !(key in target)) {
        if (key in target.$data) { warnReservedPrefix(target, key); }
        else { warnNonPresent(target, key); }
      }
      return target[key]
    }
  };

  initProxy = function initProxy (vm) {
    if (hasProxy) {
      // determine which proxy handler to use
      var options = vm.$options;
      var handlers = options.render && options.render._withStripped
        ? getHandler
        : hasHandler;
      vm._renderProxy = new Proxy(vm, handlers);
    } else {
      vm._renderProxy = vm;
    }
  };
}

/*  */

var seenObjects = new _Set();

/**
 * Recursively traverse an object to evoke all converted
 * getters, so that every nested property inside the object
 * is collected as a "deep" dependency.
 */
function traverse (val) {
  _traverse(val, seenObjects);
  seenObjects.clear();
}

function _traverse (val, seen) {
  var i, keys;
  var isA = Array.isArray(val);
  if ((!isA && !isObject(val)) || Object.isFrozen(val) || val instanceof VNode) {
    return
  }
  if (val.__ob__) {
    var depId = val.__ob__.dep.id;
    if (seen.has(depId)) {
      return
    }
    seen.add(depId);
  }
  if (isA) {
    i = val.length;
    while (i--) { _traverse(val[i], seen); }
  } else {
    keys = Object.keys(val);
    i = keys.length;
    while (i--) { _traverse(val[keys[i]], seen); }
  }
}

var mark;
var measure;

if (true) {
  var perf = inBrowser && window.performance;
  /* istanbul ignore if */
  if (
    perf &&
    perf.mark &&
    perf.measure &&
    perf.clearMarks &&
    perf.clearMeasures
  ) {
    mark = function (tag) { return perf.mark(tag); };
    measure = function (name, startTag, endTag) {
      perf.measure(name, startTag, endTag);
      perf.clearMarks(startTag);
      perf.clearMarks(endTag);
      // perf.clearMeasures(name)
    };
  }
}

/*  */

var normalizeEvent = cached(function (name) {
  var passive = name.charAt(0) === '&';
  name = passive ? name.slice(1) : name;
  var once$$1 = name.charAt(0) === '~'; // Prefixed last, checked first
  name = once$$1 ? name.slice(1) : name;
  var capture = name.charAt(0) === '!';
  name = capture ? name.slice(1) : name;
  return {
    name: name,
    once: once$$1,
    capture: capture,
    passive: passive
  }
});

function createFnInvoker (fns, vm) {
  function invoker () {
    var arguments$1 = arguments;

    var fns = invoker.fns;
    if (Array.isArray(fns)) {
      var cloned = fns.slice();
      for (var i = 0; i < cloned.length; i++) {
        invokeWithErrorHandling(cloned[i], null, arguments$1, vm, "v-on handler");
      }
    } else {
      // return handler return value for single handlers
      return invokeWithErrorHandling(fns, null, arguments, vm, "v-on handler")
    }
  }
  invoker.fns = fns;
  return invoker
}

function updateListeners (
  on,
  oldOn,
  add,
  remove$$1,
  createOnceHandler,
  vm
) {
  var name, def$$1, cur, old, event;
  for (name in on) {
    def$$1 = cur = on[name];
    old = oldOn[name];
    event = normalizeEvent(name);
    if (isUndef(cur)) {
       true && warn(
        "Invalid handler for event \"" + (event.name) + "\": got " + String(cur),
        vm
      );
    } else if (isUndef(old)) {
      if (isUndef(cur.fns)) {
        cur = on[name] = createFnInvoker(cur, vm);
      }
      if (isTrue(event.once)) {
        cur = on[name] = createOnceHandler(event.name, cur, event.capture);
      }
      add(event.name, cur, event.capture, event.passive, event.params);
    } else if (cur !== old) {
      old.fns = cur;
      on[name] = old;
    }
  }
  for (name in oldOn) {
    if (isUndef(on[name])) {
      event = normalizeEvent(name);
      remove$$1(event.name, oldOn[name], event.capture);
    }
  }
}

/*  */

/*  */

// fixed by xxxxxx (mp properties)
function extractPropertiesFromVNodeData(data, Ctor, res, context) {
  var propOptions = Ctor.options.mpOptions && Ctor.options.mpOptions.properties;
  if (isUndef(propOptions)) {
    return res
  }
  var externalClasses = Ctor.options.mpOptions.externalClasses || [];
  var attrs = data.attrs;
  var props = data.props;
  if (isDef(attrs) || isDef(props)) {
    for (var key in propOptions) {
      var altKey = hyphenate(key);
      var result = checkProp(res, props, key, altKey, true) ||
          checkProp(res, attrs, key, altKey, false);
      // externalClass
      if (
        result &&
        res[key] &&
        externalClasses.indexOf(altKey) !== -1 &&
        context[camelize(res[key])]
      ) {
        // 赋值 externalClass 真正的值(模板里 externalClass 的值可能是字符串)
        res[key] = context[camelize(res[key])];
      }
    }
  }
  return res
}

function extractPropsFromVNodeData (
  data,
  Ctor,
  tag,
  context// fixed by xxxxxx
) {
  // we are only extracting raw values here.
  // validation and default values are handled in the child
  // component itself.
  var propOptions = Ctor.options.props;
  if (isUndef(propOptions)) {
    // fixed by xxxxxx
    return extractPropertiesFromVNodeData(data, Ctor, {}, context)
  }
  var res = {};
  var attrs = data.attrs;
  var props = data.props;
  if (isDef(attrs) || isDef(props)) {
    for (var key in propOptions) {
      var altKey = hyphenate(key);
      if (true) {
        var keyInLowerCase = key.toLowerCase();
        if (
          key !== keyInLowerCase &&
          attrs && hasOwn(attrs, keyInLowerCase)
        ) {
          tip(
            "Prop \"" + keyInLowerCase + "\" is passed to component " +
            (formatComponentName(tag || Ctor)) + ", but the declared prop name is" +
            " \"" + key + "\". " +
            "Note that HTML attributes are case-insensitive and camelCased " +
            "props need to use their kebab-case equivalents when using in-DOM " +
            "templates. You should probably use \"" + altKey + "\" instead of \"" + key + "\"."
          );
        }
      }
      checkProp(res, props, key, altKey, true) ||
      checkProp(res, attrs, key, altKey, false);
    }
  }
  // fixed by xxxxxx
  return extractPropertiesFromVNodeData(data, Ctor, res, context)
}

function checkProp (
  res,
  hash,
  key,
  altKey,
  preserve
) {
  if (isDef(hash)) {
    if (hasOwn(hash, key)) {
      res[key] = hash[key];
      if (!preserve) {
        delete hash[key];
      }
      return true
    } else if (hasOwn(hash, altKey)) {
      res[key] = hash[altKey];
      if (!preserve) {
        delete hash[altKey];
      }
      return true
    }
  }
  return false
}

/*  */

// The template compiler attempts to minimize the need for normalization by
// statically analyzing the template at compile time.
//
// For plain HTML markup, normalization can be completely skipped because the
// generated render function is guaranteed to return Array<VNode>. There are
// two cases where extra normalization is needed:

// 1. When the children contains components - because a functional component
// may return an Array instead of a single root. In this case, just a simple
// normalization is needed - if any child is an Array, we flatten the whole
// thing with Array.prototype.concat. It is guaranteed to be only 1-level deep
// because functional components already normalize their own children.
function simpleNormalizeChildren (children) {
  for (var i = 0; i < children.length; i++) {
    if (Array.isArray(children[i])) {
      return Array.prototype.concat.apply([], children)
    }
  }
  return children
}

// 2. When the children contains constructs that always generated nested Arrays,
// e.g. <template>, <slot>, v-for, or when the children is provided by user
// with hand-written render functions / JSX. In such cases a full normalization
// is needed to cater to all possible types of children values.
function normalizeChildren (children) {
  return isPrimitive(children)
    ? [createTextVNode(children)]
    : Array.isArray(children)
      ? normalizeArrayChildren(children)
      : undefined
}

function isTextNode (node) {
  return isDef(node) && isDef(node.text) && isFalse(node.isComment)
}

function normalizeArrayChildren (children, nestedIndex) {
  var res = [];
  var i, c, lastIndex, last;
  for (i = 0; i < children.length; i++) {
    c = children[i];
    if (isUndef(c) || typeof c === 'boolean') { continue }
    lastIndex = res.length - 1;
    last = res[lastIndex];
    //  nested
    if (Array.isArray(c)) {
      if (c.length > 0) {
        c = normalizeArrayChildren(c, ((nestedIndex || '') + "_" + i));
        // merge adjacent text nodes
        if (isTextNode(c[0]) && isTextNode(last)) {
          res[lastIndex] = createTextVNode(last.text + (c[0]).text);
          c.shift();
        }
        res.push.apply(res, c);
      }
    } else if (isPrimitive(c)) {
      if (isTextNode(last)) {
        // merge adjacent text nodes
        // this is necessary for SSR hydration because text nodes are
        // essentially merged when rendered to HTML strings
        res[lastIndex] = createTextVNode(last.text + c);
      } else if (c !== '') {
        // convert primitive to vnode
        res.push(createTextVNode(c));
      }
    } else {
      if (isTextNode(c) && isTextNode(last)) {
        // merge adjacent text nodes
        res[lastIndex] = createTextVNode(last.text + c.text);
      } else {
        // default key for nested array children (likely generated by v-for)
        if (isTrue(children._isVList) &&
          isDef(c.tag) &&
          isUndef(c.key) &&
          isDef(nestedIndex)) {
          c.key = "__vlist" + nestedIndex + "_" + i + "__";
        }
        res.push(c);
      }
    }
  }
  return res
}

/*  */

function initProvide (vm) {
  var provide = vm.$options.provide;
  if (provide) {
    vm._provided = typeof provide === 'function'
      ? provide.call(vm)
      : provide;
  }
}

function initInjections (vm) {
  var result = resolveInject(vm.$options.inject, vm);
  if (result) {
    toggleObserving(false);
    Object.keys(result).forEach(function (key) {
      /* istanbul ignore else */
      if (true) {
        defineReactive$$1(vm, key, result[key], function () {
          warn(
            "Avoid mutating an injected value directly since the changes will be " +
            "overwritten whenever the provided component re-renders. " +
            "injection being mutated: \"" + key + "\"",
            vm
          );
        });
      } else {}
    });
    toggleObserving(true);
  }
}

function resolveInject (inject, vm) {
  if (inject) {
    // inject is :any because flow is not smart enough to figure out cached
    var result = Object.create(null);
    var keys = hasSymbol
      ? Reflect.ownKeys(inject)
      : Object.keys(inject);

    for (var i = 0; i < keys.length; i++) {
      var key = keys[i];
      // #6574 in case the inject object is observed...
      if (key === '__ob__') { continue }
      var provideKey = inject[key].from;
      var source = vm;
      while (source) {
        if (source._provided && hasOwn(source._provided, provideKey)) {
          result[key] = source._provided[provideKey];
          break
        }
        source = source.$parent;
      }
      if (!source) {
        if ('default' in inject[key]) {
          var provideDefault = inject[key].default;
          result[key] = typeof provideDefault === 'function'
            ? provideDefault.call(vm)
            : provideDefault;
        } else if (true) {
          warn(("Injection \"" + key + "\" not found"), vm);
        }
      }
    }
    return result
  }
}

/*  */



/**
 * Runtime helper for resolving raw children VNodes into a slot object.
 */
function resolveSlots (
  children,
  context
) {
  if (!children || !children.length) {
    return {}
  }
  var slots = {};
  for (var i = 0, l = children.length; i < l; i++) {
    var child = children[i];
    var data = child.data;
    // remove slot attribute if the node is resolved as a Vue slot node
    if (data && data.attrs && data.attrs.slot) {
      delete data.attrs.slot;
    }
    // named slots should only be respected if the vnode was rendered in the
    // same context.
    if ((child.context === context || child.fnContext === context) &&
      data && data.slot != null
    ) {
      var name = data.slot;
      var slot = (slots[name] || (slots[name] = []));
      if (child.tag === 'template') {
        slot.push.apply(slot, child.children || []);
      } else {
        slot.push(child);
      }
    } else {
      // fixed by xxxxxx 临时 hack 掉 uni-app 中的异步 name slot page
      if(child.asyncMeta && child.asyncMeta.data && child.asyncMeta.data.slot === 'page'){
        (slots['page'] || (slots['page'] = [])).push(child);
      }else{
        (slots.default || (slots.default = [])).push(child);
      }
    }
  }
  // ignore slots that contains only whitespace
  for (var name$1 in slots) {
    if (slots[name$1].every(isWhitespace)) {
      delete slots[name$1];
    }
  }
  return slots
}

function isWhitespace (node) {
  return (node.isComment && !node.asyncFactory) || node.text === ' '
}

/*  */

function normalizeScopedSlots (
  slots,
  normalSlots,
  prevSlots
) {
  var res;
  var hasNormalSlots = Object.keys(normalSlots).length > 0;
  var isStable = slots ? !!slots.$stable : !hasNormalSlots;
  var key = slots && slots.$key;
  if (!slots) {
    res = {};
  } else if (slots._normalized) {
    // fast path 1: child component re-render only, parent did not change
    return slots._normalized
  } else if (
    isStable &&
    prevSlots &&
    prevSlots !== emptyObject &&
    key === prevSlots.$key &&
    !hasNormalSlots &&
    !prevSlots.$hasNormal
  ) {
    // fast path 2: stable scoped slots w/ no normal slots to proxy,
    // only need to normalize once
    return prevSlots
  } else {
    res = {};
    for (var key$1 in slots) {
      if (slots[key$1] && key$1[0] !== '$') {
        res[key$1] = normalizeScopedSlot(normalSlots, key$1, slots[key$1]);
      }
    }
  }
  // expose normal slots on scopedSlots
  for (var key$2 in normalSlots) {
    if (!(key$2 in res)) {
      res[key$2] = proxyNormalSlot(normalSlots, key$2);
    }
  }
  // avoriaz seems to mock a non-extensible $scopedSlots object
  // and when that is passed down this would cause an error
  if (slots && Object.isExtensible(slots)) {
    (slots)._normalized = res;
  }
  def(res, '$stable', isStable);
  def(res, '$key', key);
  def(res, '$hasNormal', hasNormalSlots);
  return res
}

function normalizeScopedSlot(normalSlots, key, fn) {
  var normalized = function () {
    var res = arguments.length ? fn.apply(null, arguments) : fn({});
    res = res && typeof res === 'object' && !Array.isArray(res)
      ? [res] // single vnode
      : normalizeChildren(res);
    return res && (
      res.length === 0 ||
      (res.length === 1 && res[0].isComment) // #9658
    ) ? undefined
      : res
  };
  // this is a slot using the new v-slot syntax without scope. although it is
  // compiled as a scoped slot, render fn users would expect it to be present
  // on this.$slots because the usage is semantically a normal slot.
  if (fn.proxy) {
    Object.defineProperty(normalSlots, key, {
      get: normalized,
      enumerable: true,
      configurable: true
    });
  }
  return normalized
}

function proxyNormalSlot(slots, key) {
  return function () { return slots[key]; }
}

/*  */

/**
 * Runtime helper for rendering v-for lists.
 */
function renderList (
  val,
  render
) {
  var ret, i, l, keys, key;
  if (Array.isArray(val) || typeof val === 'string') {
    ret = new Array(val.length);
    for (i = 0, l = val.length; i < l; i++) {
      ret[i] = render(val[i], i, i, i); // fixed by xxxxxx
    }
  } else if (typeof val === 'number') {
    ret = new Array(val);
    for (i = 0; i < val; i++) {
      ret[i] = render(i + 1, i, i, i); // fixed by xxxxxx
    }
  } else if (isObject(val)) {
    if (hasSymbol && val[Symbol.iterator]) {
      ret = [];
      var iterator = val[Symbol.iterator]();
      var result = iterator.next();
      while (!result.done) {
        ret.push(render(result.value, ret.length, i++, i)); // fixed by xxxxxx
        result = iterator.next();
      }
    } else {
      keys = Object.keys(val);
      ret = new Array(keys.length);
      for (i = 0, l = keys.length; i < l; i++) {
        key = keys[i];
        ret[i] = render(val[key], key, i, i); // fixed by xxxxxx
      }
    }
  }
  if (!isDef(ret)) {
    ret = [];
  }
  (ret)._isVList = true;
  return ret
}

/*  */

/**
 * Runtime helper for rendering <slot>
 */
function renderSlot (
  name,
  fallback,
  props,
  bindObject
) {
  var scopedSlotFn = this.$scopedSlots[name];
  var nodes;
  if (scopedSlotFn) { // scoped slot
    props = props || {};
    if (bindObject) {
      if ( true && !isObject(bindObject)) {
        warn(
          'slot v-bind without argument expects an Object',
          this
        );
      }
      props = extend(extend({}, bindObject), props);
    }
    // fixed by xxxxxx app-plus scopedSlot
    nodes = scopedSlotFn(props, this, props._i) || fallback;
  } else {
    nodes = this.$slots[name] || fallback;
  }

  var target = props && props.slot;
  if (target) {
    return this.$createElement('template', { slot: target }, nodes)
  } else {
    return nodes
  }
}

/*  */

/**
 * Runtime helper for resolving filters
 */
function resolveFilter (id) {
  return resolveAsset(this.$options, 'filters', id, true) || identity
}

/*  */

function isKeyNotMatch (expect, actual) {
  if (Array.isArray(expect)) {
    return expect.indexOf(actual) === -1
  } else {
    return expect !== actual
  }
}

/**
 * Runtime helper for checking keyCodes from config.
 * exposed as Vue.prototype._k
 * passing in eventKeyName as last argument separately for backwards compat
 */
function checkKeyCodes (
  eventKeyCode,
  key,
  builtInKeyCode,
  eventKeyName,
  builtInKeyName
) {
  var mappedKeyCode = config.keyCodes[key] || builtInKeyCode;
  if (builtInKeyName && eventKeyName && !config.keyCodes[key]) {
    return isKeyNotMatch(builtInKeyName, eventKeyName)
  } else if (mappedKeyCode) {
    return isKeyNotMatch(mappedKeyCode, eventKeyCode)
  } else if (eventKeyName) {
    return hyphenate(eventKeyName) !== key
  }
}

/*  */

/**
 * Runtime helper for merging v-bind="object" into a VNode's data.
 */
function bindObjectProps (
  data,
  tag,
  value,
  asProp,
  isSync
) {
  if (value) {
    if (!isObject(value)) {
       true && warn(
        'v-bind without argument expects an Object or Array value',
        this
      );
    } else {
      if (Array.isArray(value)) {
        value = toObject(value);
      }
      var hash;
      var loop = function ( key ) {
        if (
          key === 'class' ||
          key === 'style' ||
          isReservedAttribute(key)
        ) {
          hash = data;
        } else {
          var type = data.attrs && data.attrs.type;
          hash = asProp || config.mustUseProp(tag, type, key)
            ? data.domProps || (data.domProps = {})
            : data.attrs || (data.attrs = {});
        }
        var camelizedKey = camelize(key);
        var hyphenatedKey = hyphenate(key);
        if (!(camelizedKey in hash) && !(hyphenatedKey in hash)) {
          hash[key] = value[key];

          if (isSync) {
            var on = data.on || (data.on = {});
            on[("update:" + key)] = function ($event) {
              value[key] = $event;
            };
          }
        }
      };

      for (var key in value) loop( key );
    }
  }
  return data
}

/*  */

/**
 * Runtime helper for rendering static trees.
 */
function renderStatic (
  index,
  isInFor
) {
  var cached = this._staticTrees || (this._staticTrees = []);
  var tree = cached[index];
  // if has already-rendered static tree and not inside v-for,
  // we can reuse the same tree.
  if (tree && !isInFor) {
    return tree
  }
  // otherwise, render a fresh tree.
  tree = cached[index] = this.$options.staticRenderFns[index].call(
    this._renderProxy,
    null,
    this // for render fns generated for functional component templates
  );
  markStatic(tree, ("__static__" + index), false);
  return tree
}

/**
 * Runtime helper for v-once.
 * Effectively it means marking the node as static with a unique key.
 */
function markOnce (
  tree,
  index,
  key
) {
  markStatic(tree, ("__once__" + index + (key ? ("_" + key) : "")), true);
  return tree
}

function markStatic (
  tree,
  key,
  isOnce
) {
  if (Array.isArray(tree)) {
    for (var i = 0; i < tree.length; i++) {
      if (tree[i] && typeof tree[i] !== 'string') {
        markStaticNode(tree[i], (key + "_" + i), isOnce);
      }
    }
  } else {
    markStaticNode(tree, key, isOnce);
  }
}

function markStaticNode (node, key, isOnce) {
  node.isStatic = true;
  node.key = key;
  node.isOnce = isOnce;
}

/*  */

function bindObjectListeners (data, value) {
  if (value) {
    if (!isPlainObject(value)) {
       true && warn(
        'v-on without argument expects an Object value',
        this
      );
    } else {
      var on = data.on = data.on ? extend({}, data.on) : {};
      for (var key in value) {
        var existing = on[key];
        var ours = value[key];
        on[key] = existing ? [].concat(existing, ours) : ours;
      }
    }
  }
  return data
}

/*  */

function resolveScopedSlots (
  fns, // see flow/vnode
  res,
  // the following are added in 2.6
  hasDynamicKeys,
  contentHashKey
) {
  res = res || { $stable: !hasDynamicKeys };
  for (var i = 0; i < fns.length; i++) {
    var slot = fns[i];
    if (Array.isArray(slot)) {
      resolveScopedSlots(slot, res, hasDynamicKeys);
    } else if (slot) {
      // marker for reverse proxying v-slot without scope on this.$slots
      if (slot.proxy) {
        slot.fn.proxy = true;
      }
      res[slot.key] = slot.fn;
    }
  }
  if (contentHashKey) {
    (res).$key = contentHashKey;
  }
  return res
}

/*  */

function bindDynamicKeys (baseObj, values) {
  for (var i = 0; i < values.length; i += 2) {
    var key = values[i];
    if (typeof key === 'string' && key) {
      baseObj[values[i]] = values[i + 1];
    } else if ( true && key !== '' && key !== null) {
      // null is a special value for explicitly removing a binding
      warn(
        ("Invalid value for dynamic directive argument (expected string or null): " + key),
        this
      );
    }
  }
  return baseObj
}

// helper to dynamically append modifier runtime markers to event names.
// ensure only append when value is already string, otherwise it will be cast
// to string and cause the type check to miss.
function prependModifier (value, symbol) {
  return typeof value === 'string' ? symbol + value : value
}

/*  */

function installRenderHelpers (target) {
  target._o = markOnce;
  target._n = toNumber;
  target._s = toString;
  target._l = renderList;
  target._t = renderSlot;
  target._q = looseEqual;
  target._i = looseIndexOf;
  target._m = renderStatic;
  target._f = resolveFilter;
  target._k = checkKeyCodes;
  target._b = bindObjectProps;
  target._v = createTextVNode;
  target._e = createEmptyVNode;
  target._u = resolveScopedSlots;
  target._g = bindObjectListeners;
  target._d = bindDynamicKeys;
  target._p = prependModifier;
}

/*  */

function FunctionalRenderContext (
  data,
  props,
  children,
  parent,
  Ctor
) {
  var this$1 = this;

  var options = Ctor.options;
  // ensure the createElement function in functional components
  // gets a unique context - this is necessary for correct named slot check
  var contextVm;
  if (hasOwn(parent, '_uid')) {
    contextVm = Object.create(parent);
    // $flow-disable-line
    contextVm._original = parent;
  } else {
    // the context vm passed in is a functional context as well.
    // in this case we want to make sure we are able to get a hold to the
    // real context instance.
    contextVm = parent;
    // $flow-disable-line
    parent = parent._original;
  }
  var isCompiled = isTrue(options._compiled);
  var needNormalization = !isCompiled;

  this.data = data;
  this.props = props;
  this.children = children;
  this.parent = parent;
  this.listeners = data.on || emptyObject;
  this.injections = resolveInject(options.inject, parent);
  this.slots = function () {
    if (!this$1.$slots) {
      normalizeScopedSlots(
        data.scopedSlots,
        this$1.$slots = resolveSlots(children, parent)
      );
    }
    return this$1.$slots
  };

  Object.defineProperty(this, 'scopedSlots', ({
    enumerable: true,
    get: function get () {
      return normalizeScopedSlots(data.scopedSlots, this.slots())
    }
  }));

  // support for compiled functional template
  if (isCompiled) {
    // exposing $options for renderStatic()
    this.$options = options;
    // pre-resolve slots for renderSlot()
    this.$slots = this.slots();
    this.$scopedSlots = normalizeScopedSlots(data.scopedSlots, this.$slots);
  }

  if (options._scopeId) {
    this._c = function (a, b, c, d) {
      var vnode = createElement(contextVm, a, b, c, d, needNormalization);
      if (vnode && !Array.isArray(vnode)) {
        vnode.fnScopeId = options._scopeId;
        vnode.fnContext = parent;
      }
      return vnode
    };
  } else {
    this._c = function (a, b, c, d) { return createElement(contextVm, a, b, c, d, needNormalization); };
  }
}

installRenderHelpers(FunctionalRenderContext.prototype);

function createFunctionalComponent (
  Ctor,
  propsData,
  data,
  contextVm,
  children
) {
  var options = Ctor.options;
  var props = {};
  var propOptions = options.props;
  if (isDef(propOptions)) {
    for (var key in propOptions) {
      props[key] = validateProp(key, propOptions, propsData || emptyObject);
    }
  } else {
    if (isDef(data.attrs)) { mergeProps(props, data.attrs); }
    if (isDef(data.props)) { mergeProps(props, data.props); }
  }

  var renderContext = new FunctionalRenderContext(
    data,
    props,
    children,
    contextVm,
    Ctor
  );

  var vnode = options.render.call(null, renderContext._c, renderContext);

  if (vnode instanceof VNode) {
    return cloneAndMarkFunctionalResult(vnode, data, renderContext.parent, options, renderContext)
  } else if (Array.isArray(vnode)) {
    var vnodes = normalizeChildren(vnode) || [];
    var res = new Array(vnodes.length);
    for (var i = 0; i < vnodes.length; i++) {
      res[i] = cloneAndMarkFunctionalResult(vnodes[i], data, renderContext.parent, options, renderContext);
    }
    return res
  }
}

function cloneAndMarkFunctionalResult (vnode, data, contextVm, options, renderContext) {
  // #7817 clone node before setting fnContext, otherwise if the node is reused
  // (e.g. it was from a cached normal slot) the fnContext causes named slots
  // that should not be matched to match.
  var clone = cloneVNode(vnode);
  clone.fnContext = contextVm;
  clone.fnOptions = options;
  if (true) {
    (clone.devtoolsMeta = clone.devtoolsMeta || {}).renderContext = renderContext;
  }
  if (data.slot) {
    (clone.data || (clone.data = {})).slot = data.slot;
  }
  return clone
}

function mergeProps (to, from) {
  for (var key in from) {
    to[camelize(key)] = from[key];
  }
}

/*  */

/*  */

/*  */

/*  */

// inline hooks to be invoked on component VNodes during patch
var componentVNodeHooks = {
  init: function init (vnode, hydrating) {
    if (
      vnode.componentInstance &&
      !vnode.componentInstance._isDestroyed &&
      vnode.data.keepAlive
    ) {
      // kept-alive components, treat as a patch
      var mountedNode = vnode; // work around flow
      componentVNodeHooks.prepatch(mountedNode, mountedNode);
    } else {
      var child = vnode.componentInstance = createComponentInstanceForVnode(
        vnode,
        activeInstance
      );
      child.$mount(hydrating ? vnode.elm : undefined, hydrating);
    }
  },

  prepatch: function prepatch (oldVnode, vnode) {
    var options = vnode.componentOptions;
    var child = vnode.componentInstance = oldVnode.componentInstance;
    updateChildComponent(
      child,
      options.propsData, // updated props
      options.listeners, // updated listeners
      vnode, // new parent vnode
      options.children // new children
    );
  },

  insert: function insert (vnode) {
    var context = vnode.context;
    var componentInstance = vnode.componentInstance;
    if (!componentInstance._isMounted) {
      callHook(componentInstance, 'onServiceCreated');
      callHook(componentInstance, 'onServiceAttached');
      componentInstance._isMounted = true;
      callHook(componentInstance, 'mounted');
    }
    if (vnode.data.keepAlive) {
      if (context._isMounted) {
        // vue-router#1212
        // During updates, a kept-alive component's child components may
        // change, so directly walking the tree here may call activated hooks
        // on incorrect children. Instead we push them into a queue which will
        // be processed after the whole patch process ended.
        queueActivatedComponent(componentInstance);
      } else {
        activateChildComponent(componentInstance, true /* direct */);
      }
    }
  },

  destroy: function destroy (vnode) {
    var componentInstance = vnode.componentInstance;
    if (!componentInstance._isDestroyed) {
      if (!vnode.data.keepAlive) {
        componentInstance.$destroy();
      } else {
        deactivateChildComponent(componentInstance, true /* direct */);
      }
    }
  }
};

var hooksToMerge = Object.keys(componentVNodeHooks);

function createComponent (
  Ctor,
  data,
  context,
  children,
  tag
) {
  if (isUndef(Ctor)) {
    return
  }

  var baseCtor = context.$options._base;

  // plain options object: turn it into a constructor
  if (isObject(Ctor)) {
    Ctor = baseCtor.extend(Ctor);
  }

  // if at this stage it's not a constructor or an async component factory,
  // reject.
  if (typeof Ctor !== 'function') {
    if (true) {
      warn(("Invalid Component definition: " + (String(Ctor))), context);
    }
    return
  }

  // async component
  var asyncFactory;
  if (isUndef(Ctor.cid)) {
    asyncFactory = Ctor;
    Ctor = resolveAsyncComponent(asyncFactory, baseCtor);
    if (Ctor === undefined) {
      // return a placeholder node for async component, which is rendered
      // as a comment node but preserves all the raw information for the node.
      // the information will be used for async server-rendering and hydration.
      return createAsyncPlaceholder(
        asyncFactory,
        data,
        context,
        children,
        tag
      )
    }
  }

  data = data || {};

  // resolve constructor options in case global mixins are applied after
  // component constructor creation
  resolveConstructorOptions(Ctor);

  // transform component v-model data into props & events
  if (isDef(data.model)) {
    transformModel(Ctor.options, data);
  }

  // extract props
  var propsData = extractPropsFromVNodeData(data, Ctor, tag, context); // fixed by xxxxxx

  // functional component
  if (isTrue(Ctor.options.functional)) {
    return createFunctionalComponent(Ctor, propsData, data, context, children)
  }

  // extract listeners, since these needs to be treated as
  // child component listeners instead of DOM listeners
  var listeners = data.on;
  // replace with listeners with .native modifier
  // so it gets processed during parent component patch.
  data.on = data.nativeOn;

  if (isTrue(Ctor.options.abstract)) {
    // abstract components do not keep anything
    // other than props & listeners & slot

    // work around flow
    var slot = data.slot;
    data = {};
    if (slot) {
      data.slot = slot;
    }
  }

  // install component management hooks onto the placeholder node
  installComponentHooks(data);

  // return a placeholder vnode
  var name = Ctor.options.name || tag;
  var vnode = new VNode(
    ("vue-component-" + (Ctor.cid) + (name ? ("-" + name) : '')),
    data, undefined, undefined, undefined, context,
    { Ctor: Ctor, propsData: propsData, listeners: listeners, tag: tag, children: children },
    asyncFactory
  );

  return vnode
}

function createComponentInstanceForVnode (
  vnode, // we know it's MountedComponentVNode but flow doesn't
  parent // activeInstance in lifecycle state
) {
  var options = {
    _isComponent: true,
    _parentVnode: vnode,
    parent: parent
  };
  // check inline-template render functions
  var inlineTemplate = vnode.data.inlineTemplate;
  if (isDef(inlineTemplate)) {
    options.render = inlineTemplate.render;
    options.staticRenderFns = inlineTemplate.staticRenderFns;
  }
  return new vnode.componentOptions.Ctor(options)
}

function installComponentHooks (data) {
  var hooks = data.hook || (data.hook = {});
  for (var i = 0; i < hooksToMerge.length; i++) {
    var key = hooksToMerge[i];
    var existing = hooks[key];
    var toMerge = componentVNodeHooks[key];
    if (existing !== toMerge && !(existing && existing._merged)) {
      hooks[key] = existing ? mergeHook$1(toMerge, existing) : toMerge;
    }
  }
}

function mergeHook$1 (f1, f2) {
  var merged = function (a, b) {
    // flow complains about extra args which is why we use any
    f1(a, b);
    f2(a, b);
  };
  merged._merged = true;
  return merged
}

// transform component v-model info (value and callback) into
// prop and event handler respectively.
function transformModel (options, data) {
  var prop = (options.model && options.model.prop) || 'value';
  var event = (options.model && options.model.event) || 'input'
  ;(data.attrs || (data.attrs = {}))[prop] = data.model.value;
  var on = data.on || (data.on = {});
  var existing = on[event];
  var callback = data.model.callback;
  if (isDef(existing)) {
    if (
      Array.isArray(existing)
        ? existing.indexOf(callback) === -1
        : existing !== callback
    ) {
      on[event] = [callback].concat(existing);
    }
  } else {
    on[event] = callback;
  }
}

/*  */

var SIMPLE_NORMALIZE = 1;
var ALWAYS_NORMALIZE = 2;

// wrapper function for providing a more flexible interface
// without getting yelled at by flow
function createElement (
  context,
  tag,
  data,
  children,
  normalizationType,
  alwaysNormalize
) {
  if (Array.isArray(data) || isPrimitive(data)) {
    normalizationType = children;
    children = data;
    data = undefined;
  }
  if (isTrue(alwaysNormalize)) {
    normalizationType = ALWAYS_NORMALIZE;
  }
  return _createElement(context, tag, data, children, normalizationType)
}

function _createElement (
  context,
  tag,
  data,
  children,
  normalizationType
) {
  if (isDef(data) && isDef((data).__ob__)) {
     true && warn(
      "Avoid using observed data object as vnode data: " + (JSON.stringify(data)) + "\n" +
      'Always create fresh vnode data objects in each render!',
      context
    );
    return createEmptyVNode()
  }
  // object syntax in v-bind
  if (isDef(data) && isDef(data.is)) {
    tag = data.is;
  }
  if (!tag) {
    // in case of component :is set to falsy value
    return createEmptyVNode()
  }
  // warn against non-primitive key
  if ( true &&
    isDef(data) && isDef(data.key) && !isPrimitive(data.key)
  ) {
    {
      warn(
        'Avoid using non-primitive value as key, ' +
        'use string/number value instead.',
        context
      );
    }
  }
  // support single function children as default scoped slot
  if (Array.isArray(children) &&
    typeof children[0] === 'function'
  ) {
    data = data || {};
    data.scopedSlots = { default: children[0] };
    children.length = 0;
  }
  if (normalizationType === ALWAYS_NORMALIZE) {
    children = normalizeChildren(children);
  } else if (normalizationType === SIMPLE_NORMALIZE) {
    children = simpleNormalizeChildren(children);
  }
  var vnode, ns;
  if (typeof tag === 'string') {
    var Ctor;
    ns = (context.$vnode && context.$vnode.ns) || config.getTagNamespace(tag);
    if (config.isReservedTag(tag)) {
      // platform built-in elements
      if ( true && isDef(data) && isDef(data.nativeOn)) {
        warn(
          ("The .native modifier for v-on is only valid on components but it was used on <" + tag + ">."),
          context
        );
      }
      vnode = new VNode(
        config.parsePlatformTagName(tag), data, children,
        undefined, undefined, context
      );
    } else if ((!data || !data.pre) && isDef(Ctor = resolveAsset(context.$options, 'components', tag))) {
      // component
      vnode = createComponent(Ctor, data, context, children, tag);
    } else {
      // unknown or unlisted namespaced elements
      // check at runtime because it may get assigned a namespace when its
      // parent normalizes children
      vnode = new VNode(
        tag, data, children,
        undefined, undefined, context
      );
    }
  } else {
    // direct component options / constructor
    vnode = createComponent(tag, data, context, children);
  }
  if (Array.isArray(vnode)) {
    return vnode
  } else if (isDef(vnode)) {
    if (isDef(ns)) { applyNS(vnode, ns); }
    if (isDef(data)) { registerDeepBindings(data); }
    return vnode
  } else {
    return createEmptyVNode()
  }
}

function applyNS (vnode, ns, force) {
  vnode.ns = ns;
  if (vnode.tag === 'foreignObject') {
    // use default namespace inside foreignObject
    ns = undefined;
    force = true;
  }
  if (isDef(vnode.children)) {
    for (var i = 0, l = vnode.children.length; i < l; i++) {
      var child = vnode.children[i];
      if (isDef(child.tag) && (
        isUndef(child.ns) || (isTrue(force) && child.tag !== 'svg'))) {
        applyNS(child, ns, force);
      }
    }
  }
}

// ref #5318
// necessary to ensure parent re-render when deep bindings like :style and
// :class are used on slot nodes
function registerDeepBindings (data) {
  if (isObject(data.style)) {
    traverse(data.style);
  }
  if (isObject(data.class)) {
    traverse(data.class);
  }
}

/*  */

function initRender (vm) {
  vm._vnode = null; // the root of the child tree
  vm._staticTrees = null; // v-once cached trees
  var options = vm.$options;
  var parentVnode = vm.$vnode = options._parentVnode; // the placeholder node in parent tree
  var renderContext = parentVnode && parentVnode.context;
  vm.$slots = resolveSlots(options._renderChildren, renderContext);
  vm.$scopedSlots = emptyObject;
  // bind the createElement fn to this instance
  // so that we get proper render context inside it.
  // args order: tag, data, children, normalizationType, alwaysNormalize
  // internal version is used by render functions compiled from templates
  vm._c = function (a, b, c, d) { return createElement(vm, a, b, c, d, false); };
  // normalization is always applied for the public version, used in
  // user-written render functions.
  vm.$createElement = function (a, b, c, d) { return createElement(vm, a, b, c, d, true); };

  // $attrs & $listeners are exposed for easier HOC creation.
  // they need to be reactive so that HOCs using them are always updated
  var parentData = parentVnode && parentVnode.data;

  /* istanbul ignore else */
  if (true) {
    defineReactive$$1(vm, '$attrs', parentData && parentData.attrs || emptyObject, function () {
      !isUpdatingChildComponent && warn("$attrs is readonly.", vm);
    }, true);
    defineReactive$$1(vm, '$listeners', options._parentListeners || emptyObject, function () {
      !isUpdatingChildComponent && warn("$listeners is readonly.", vm);
    }, true);
  } else {}
}

var currentRenderingInstance = null;

function renderMixin (Vue) {
  // install runtime convenience helpers
  installRenderHelpers(Vue.prototype);

  Vue.prototype.$nextTick = function (fn) {
    return nextTick(fn, this)
  };

  Vue.prototype._render = function () {
    var vm = this;
    var ref = vm.$options;
    var render = ref.render;
    var _parentVnode = ref._parentVnode;

    if (_parentVnode) {
      vm.$scopedSlots = normalizeScopedSlots(
        _parentVnode.data.scopedSlots,
        vm.$slots,
        vm.$scopedSlots
      );
    }

    // set parent vnode. this allows render functions to have access
    // to the data on the placeholder node.
    vm.$vnode = _parentVnode;
    // render self
    var vnode;
    try {
      // There's no need to maintain a stack because all render fns are called
      // separately from one another. Nested component's render fns are called
      // when parent component is patched.
      currentRenderingInstance = vm;
      vnode = render.call(vm._renderProxy, vm.$createElement);
    } catch (e) {
      handleError(e, vm, "render");
      // return error render result,
      // or previous vnode to prevent render error causing blank component
      /* istanbul ignore else */
      if ( true && vm.$options.renderError) {
        try {
          vnode = vm.$options.renderError.call(vm._renderProxy, vm.$createElement, e);
        } catch (e) {
          handleError(e, vm, "renderError");
          vnode = vm._vnode;
        }
      } else {
        vnode = vm._vnode;
      }
    } finally {
      currentRenderingInstance = null;
    }
    // if the returned array contains only a single node, allow it
    if (Array.isArray(vnode) && vnode.length === 1) {
      vnode = vnode[0];
    }
    // return empty vnode in case the render function errored out
    if (!(vnode instanceof VNode)) {
      if ( true && Array.isArray(vnode)) {
        warn(
          'Multiple root nodes returned from render function. Render function ' +
          'should return a single root node.',
          vm
        );
      }
      vnode = createEmptyVNode();
    }
    // set parent
    vnode.parent = _parentVnode;
    return vnode
  };
}

/*  */

function ensureCtor (comp, base) {
  if (
    comp.__esModule ||
    (hasSymbol && comp[Symbol.toStringTag] === 'Module')
  ) {
    comp = comp.default;
  }
  return isObject(comp)
    ? base.extend(comp)
    : comp
}

function createAsyncPlaceholder (
  factory,
  data,
  context,
  children,
  tag
) {
  var node = createEmptyVNode();
  node.asyncFactory = factory;
  node.asyncMeta = { data: data, context: context, children: children, tag: tag };
  return node
}

function resolveAsyncComponent (
  factory,
  baseCtor
) {
  if (isTrue(factory.error) && isDef(factory.errorComp)) {
    return factory.errorComp
  }

  if (isDef(factory.resolved)) {
    return factory.resolved
  }

  var owner = currentRenderingInstance;
  if (owner && isDef(factory.owners) && factory.owners.indexOf(owner) === -1) {
    // already pending
    factory.owners.push(owner);
  }

  if (isTrue(factory.loading) && isDef(factory.loadingComp)) {
    return factory.loadingComp
  }

  if (owner && !isDef(factory.owners)) {
    var owners = factory.owners = [owner];
    var sync = true;
    var timerLoading = null;
    var timerTimeout = null

    ;(owner).$on('hook:destroyed', function () { return remove(owners, owner); });

    var forceRender = function (renderCompleted) {
      for (var i = 0, l = owners.length; i < l; i++) {
        (owners[i]).$forceUpdate();
      }

      if (renderCompleted) {
        owners.length = 0;
        if (timerLoading !== null) {
          clearTimeout(timerLoading);
          timerLoading = null;
        }
        if (timerTimeout !== null) {
          clearTimeout(timerTimeout);
          timerTimeout = null;
        }
      }
    };

    var resolve = once(function (res) {
      // cache resolved
      factory.resolved = ensureCtor(res, baseCtor);
      // invoke callbacks only if this is not a synchronous resolve
      // (async resolves are shimmed as synchronous during SSR)
      if (!sync) {
        forceRender(true);
      } else {
        owners.length = 0;
      }
    });

    var reject = once(function (reason) {
       true && warn(
        "Failed to resolve async component: " + (String(factory)) +
        (reason ? ("\nReason: " + reason) : '')
      );
      if (isDef(factory.errorComp)) {
        factory.error = true;
        forceRender(true);
      }
    });

    var res = factory(resolve, reject);

    if (isObject(res)) {
      if (isPromise(res)) {
        // () => Promise
        if (isUndef(factory.resolved)) {
          res.then(resolve, reject);
        }
      } else if (isPromise(res.component)) {
        res.component.then(resolve, reject);

        if (isDef(res.error)) {
          factory.errorComp = ensureCtor(res.error, baseCtor);
        }

        if (isDef(res.loading)) {
          factory.loadingComp = ensureCtor(res.loading, baseCtor);
          if (res.delay === 0) {
            factory.loading = true;
          } else {
            timerLoading = setTimeout(function () {
              timerLoading = null;
              if (isUndef(factory.resolved) && isUndef(factory.error)) {
                factory.loading = true;
                forceRender(false);
              }
            }, res.delay || 200);
          }
        }

        if (isDef(res.timeout)) {
          timerTimeout = setTimeout(function () {
            timerTimeout = null;
            if (isUndef(factory.resolved)) {
              reject(
                 true
                  ? ("timeout (" + (res.timeout) + "ms)")
                  : undefined
              );
            }
          }, res.timeout);
        }
      }
    }

    sync = false;
    // return in case resolved synchronously
    return factory.loading
      ? factory.loadingComp
      : factory.resolved
  }
}

/*  */

function isAsyncPlaceholder (node) {
  return node.isComment && node.asyncFactory
}

/*  */

function getFirstComponentChild (children) {
  if (Array.isArray(children)) {
    for (var i = 0; i < children.length; i++) {
      var c = children[i];
      if (isDef(c) && (isDef(c.componentOptions) || isAsyncPlaceholder(c))) {
        return c
      }
    }
  }
}

/*  */

/*  */

function initEvents (vm) {
  vm._events = Object.create(null);
  vm._hasHookEvent = false;
  // init parent attached events
  var listeners = vm.$options._parentListeners;
  if (listeners) {
    updateComponentListeners(vm, listeners);
  }
}

var target;

function add (event, fn) {
  target.$on(event, fn);
}

function remove$1 (event, fn) {
  target.$off(event, fn);
}

function createOnceHandler (event, fn) {
  var _target = target;
  return function onceHandler () {
    var res = fn.apply(null, arguments);
    if (res !== null) {
      _target.$off(event, onceHandler);
    }
  }
}

function updateComponentListeners (
  vm,
  listeners,
  oldListeners
) {
  target = vm;
  updateListeners(listeners, oldListeners || {}, add, remove$1, createOnceHandler, vm);
  target = undefined;
}

function eventsMixin (Vue) {
  var hookRE = /^hook:/;
  Vue.prototype.$on = function (event, fn) {
    var vm = this;
    if (Array.isArray(event)) {
      for (var i = 0, l = event.length; i < l; i++) {
        vm.$on(event[i], fn);
      }
    } else {
      (vm._events[event] || (vm._events[event] = [])).push(fn);
      // optimize hook:event cost by using a boolean flag marked at registration
      // instead of a hash lookup
      if (hookRE.test(event)) {
        vm._hasHookEvent = true;
      }
    }
    return vm
  };

  Vue.prototype.$once = function (event, fn) {
    var vm = this;
    function on () {
      vm.$off(event, on);
      fn.apply(vm, arguments);
    }
    on.fn = fn;
    vm.$on(event, on);
    return vm
  };

  Vue.prototype.$off = function (event, fn) {
    var vm = this;
    // all
    if (!arguments.length) {
      vm._events = Object.create(null);
      return vm
    }
    // array of events
    if (Array.isArray(event)) {
      for (var i$1 = 0, l = event.length; i$1 < l; i$1++) {
        vm.$off(event[i$1], fn);
      }
      return vm
    }
    // specific event
    var cbs = vm._events[event];
    if (!cbs) {
      return vm
    }
    if (!fn) {
      vm._events[event] = null;
      return vm
    }
    // specific handler
    var cb;
    var i = cbs.length;
    while (i--) {
      cb = cbs[i];
      if (cb === fn || cb.fn === fn) {
        cbs.splice(i, 1);
        break
      }
    }
    return vm
  };

  Vue.prototype.$emit = function (event) {
    var vm = this;
    if (true) {
      var lowerCaseEvent = event.toLowerCase();
      if (lowerCaseEvent !== event && vm._events[lowerCaseEvent]) {
        tip(
          "Event \"" + lowerCaseEvent + "\" is emitted in component " +
          (formatComponentName(vm)) + " but the handler is registered for \"" + event + "\". " +
          "Note that HTML attributes are case-insensitive and you cannot use " +
          "v-on to listen to camelCase events when using in-DOM templates. " +
          "You should probably use \"" + (hyphenate(event)) + "\" instead of \"" + event + "\"."
        );
      }
    }
    var cbs = vm._events[event];
    if (cbs) {
      cbs = cbs.length > 1 ? toArray(cbs) : cbs;
      var args = toArray(arguments, 1);
      var info = "event handler for \"" + event + "\"";
      for (var i = 0, l = cbs.length; i < l; i++) {
        invokeWithErrorHandling(cbs[i], vm, args, vm, info);
      }
    }
    return vm
  };
}

/*  */

var activeInstance = null;
var isUpdatingChildComponent = false;

function setActiveInstance(vm) {
  var prevActiveInstance = activeInstance;
  activeInstance = vm;
  return function () {
    activeInstance = prevActiveInstance;
  }
}

function initLifecycle (vm) {
  var options = vm.$options;

  // locate first non-abstract parent
  var parent = options.parent;
  if (parent && !options.abstract) {
    while (parent.$options.abstract && parent.$parent) {
      parent = parent.$parent;
    }
    parent.$children.push(vm);
  }

  vm.$parent = parent;
  vm.$root = parent ? parent.$root : vm;

  vm.$children = [];
  vm.$refs = {};

  vm._watcher = null;
  vm._inactive = null;
  vm._directInactive = false;
  vm._isMounted = false;
  vm._isDestroyed = false;
  vm._isBeingDestroyed = false;
}

function lifecycleMixin (Vue) {
  Vue.prototype._update = function (vnode, hydrating) {
    var vm = this;
    var prevEl = vm.$el;
    var prevVnode = vm._vnode;
    var restoreActiveInstance = setActiveInstance(vm);
    vm._vnode = vnode;
    // Vue.prototype.__patch__ is injected in entry points
    // based on the rendering backend used.
    if (!prevVnode) {
      // initial render
      vm.$el = vm.__patch__(vm.$el, vnode, hydrating, false /* removeOnly */);
    } else {
      // updates
      vm.$el = vm.__patch__(prevVnode, vnode);
    }
    restoreActiveInstance();
    // update __vue__ reference
    if (prevEl) {
      prevEl.__vue__ = null;
    }
    if (vm.$el) {
      vm.$el.__vue__ = vm;
    }
    // if parent is an HOC, update its $el as well
    if (vm.$vnode && vm.$parent && vm.$vnode === vm.$parent._vnode) {
      vm.$parent.$el = vm.$el;
    }
    // updated hook is called by the scheduler to ensure that children are
    // updated in a parent's updated hook.
  };

  Vue.prototype.$forceUpdate = function () {
    var vm = this;
    if (vm._watcher) {
      vm._watcher.update();
    }
  };

  Vue.prototype.$destroy = function () {
    var vm = this;
    if (vm._isBeingDestroyed) {
      return
    }
    callHook(vm, 'beforeDestroy');
    vm._isBeingDestroyed = true;
    // remove self from parent
    var parent = vm.$parent;
    if (parent && !parent._isBeingDestroyed && !vm.$options.abstract) {
      remove(parent.$children, vm);
    }
    // teardown watchers
    if (vm._watcher) {
      vm._watcher.teardown();
    }
    var i = vm._watchers.length;
    while (i--) {
      vm._watchers[i].teardown();
    }
    // remove reference from data ob
    // frozen object may not have observer.
    if (vm._data.__ob__) {
      vm._data.__ob__.vmCount--;
    }
    // call the last hook...
    vm._isDestroyed = true;
    // invoke destroy hooks on current rendered tree
    vm.__patch__(vm._vnode, null);
    // fire destroyed hook
    callHook(vm, 'destroyed');
    // turn off all instance listeners.
    vm.$off();
    // remove __vue__ reference
    if (vm.$el) {
      vm.$el.__vue__ = null;
    }
    // release circular reference (#6759)
    if (vm.$vnode) {
      vm.$vnode.parent = null;
    }
  };
}

function updateChildComponent (
  vm,
  propsData,
  listeners,
  parentVnode,
  renderChildren
) {
  if (true) {
    isUpdatingChildComponent = true;
  }

  // determine whether component has slot children
  // we need to do this before overwriting $options._renderChildren.

  // check if there are dynamic scopedSlots (hand-written or compiled but with
  // dynamic slot names). Static scoped slots compiled from template has the
  // "$stable" marker.
  var newScopedSlots = parentVnode.data.scopedSlots;
  var oldScopedSlots = vm.$scopedSlots;
  var hasDynamicScopedSlot = !!(
    (newScopedSlots && !newScopedSlots.$stable) ||
    (oldScopedSlots !== emptyObject && !oldScopedSlots.$stable) ||
    (newScopedSlots && vm.$scopedSlots.$key !== newScopedSlots.$key)
  );

  // Any static slot children from the parent may have changed during parent's
  // update. Dynamic scoped slots may also have changed. In such cases, a forced
  // update is necessary to ensure correctness.
  var needsForceUpdate = !!(
    renderChildren ||               // has new static slots
    vm.$options._renderChildren ||  // has old static slots
    hasDynamicScopedSlot
  );

  vm.$options._parentVnode = parentVnode;
  vm.$vnode = parentVnode; // update vm's placeholder node without re-render

  if (vm._vnode) { // update child tree's parent
    vm._vnode.parent = parentVnode;
  }
  vm.$options._renderChildren = renderChildren;

  // update $attrs and $listeners hash
  // these are also reactive so they may trigger child update if the child
  // used them during render
  vm.$attrs = parentVnode.data.attrs || emptyObject;
  vm.$listeners = listeners || emptyObject;

  // update props
  if (propsData && vm.$options.props) {
    toggleObserving(false);
    var props = vm._props;
    var propKeys = vm.$options._propKeys || [];
    for (var i = 0; i < propKeys.length; i++) {
      var key = propKeys[i];
      var propOptions = vm.$options.props; // wtf flow?
      props[key] = validateProp(key, propOptions, propsData, vm);
    }
    toggleObserving(true);
    // keep a copy of raw propsData
    vm.$options.propsData = propsData;
  }
  
  // fixed by xxxxxx update properties(mp runtime)
  vm._$updateProperties && vm._$updateProperties(vm);
  
  // update listeners
  listeners = listeners || emptyObject;
  var oldListeners = vm.$options._parentListeners;
  vm.$options._parentListeners = listeners;
  updateComponentListeners(vm, listeners, oldListeners);

  // resolve slots + force update if has children
  if (needsForceUpdate) {
    vm.$slots = resolveSlots(renderChildren, parentVnode.context);
    vm.$forceUpdate();
  }

  if (true) {
    isUpdatingChildComponent = false;
  }
}

function isInInactiveTree (vm) {
  while (vm && (vm = vm.$parent)) {
    if (vm._inactive) { return true }
  }
  return false
}

function activateChildComponent (vm, direct) {
  if (direct) {
    vm._directInactive = false;
    if (isInInactiveTree(vm)) {
      return
    }
  } else if (vm._directInactive) {
    return
  }
  if (vm._inactive || vm._inactive === null) {
    vm._inactive = false;
    for (var i = 0; i < vm.$children.length; i++) {
      activateChildComponent(vm.$children[i]);
    }
    callHook(vm, 'activated');
  }
}

function deactivateChildComponent (vm, direct) {
  if (direct) {
    vm._directInactive = true;
    if (isInInactiveTree(vm)) {
      return
    }
  }
  if (!vm._inactive) {
    vm._inactive = true;
    for (var i = 0; i < vm.$children.length; i++) {
      deactivateChildComponent(vm.$children[i]);
    }
    callHook(vm, 'deactivated');
  }
}

function callHook (vm, hook) {
  // #7573 disable dep collection when invoking lifecycle hooks
  pushTarget();
  var handlers = vm.$options[hook];
  var info = hook + " hook";
  if (handlers) {
    for (var i = 0, j = handlers.length; i < j; i++) {
      invokeWithErrorHandling(handlers[i], vm, null, vm, info);
    }
  }
  if (vm._hasHookEvent) {
    vm.$emit('hook:' + hook);
  }
  popTarget();
}

/*  */

var MAX_UPDATE_COUNT = 100;

var queue = [];
var activatedChildren = [];
var has = {};
var circular = {};
var waiting = false;
var flushing = false;
var index = 0;

/**
 * Reset the scheduler's state.
 */
function resetSchedulerState () {
  index = queue.length = activatedChildren.length = 0;
  has = {};
  if (true) {
    circular = {};
  }
  waiting = flushing = false;
}

// Async edge case #6566 requires saving the timestamp when event listeners are
// attached. However, calling performance.now() has a perf overhead especially
// if the page has thousands of event listeners. Instead, we take a timestamp
// every time the scheduler flushes and use that for all event listeners
// attached during that flush.
var currentFlushTimestamp = 0;

// Async edge case fix requires storing an event listener's attach timestamp.
var getNow = Date.now;

// Determine what event timestamp the browser is using. Annoyingly, the
// timestamp can either be hi-res (relative to page load) or low-res
// (relative to UNIX epoch), so in order to compare time we have to use the
// same timestamp type when saving the flush timestamp.
// All IE versions use low-res event timestamps, and have problematic clock
// implementations (#9632)
if (inBrowser && !isIE) {
  var performance = window.performance;
  if (
    performance &&
    typeof performance.now === 'function' &&
    getNow() > document.createEvent('Event').timeStamp
  ) {
    // if the event timestamp, although evaluated AFTER the Date.now(), is
    // smaller than it, it means the event is using a hi-res timestamp,
    // and we need to use the hi-res version for event listener timestamps as
    // well.
    getNow = function () { return performance.now(); };
  }
}

/**
 * Flush both queues and run the watchers.
 */
function flushSchedulerQueue () {
  currentFlushTimestamp = getNow();
  flushing = true;
  var watcher, id;

  // Sort queue before flush.
  // This ensures that:
  // 1. Components are updated from parent to child. (because parent is always
  //    created before the child)
  // 2. A component's user watchers are run before its render watcher (because
  //    user watchers are created before the render watcher)
  // 3. If a component is destroyed during a parent component's watcher run,
  //    its watchers can be skipped.
  queue.sort(function (a, b) { return a.id - b.id; });

  // do not cache length because more watchers might be pushed
  // as we run existing watchers
  for (index = 0; index < queue.length; index++) {
    watcher = queue[index];
    if (watcher.before) {
      watcher.before();
    }
    id = watcher.id;
    has[id] = null;
    watcher.run();
    // in dev build, check and stop circular updates.
    if ( true && has[id] != null) {
      circular[id] = (circular[id] || 0) + 1;
      if (circular[id] > MAX_UPDATE_COUNT) {
        warn(
          'You may have an infinite update loop ' + (
            watcher.user
              ? ("in watcher with expression \"" + (watcher.expression) + "\"")
              : "in a component render function."
          ),
          watcher.vm
        );
        break
      }
    }
  }

  // keep copies of post queues before resetting state
  var activatedQueue = activatedChildren.slice();
  var updatedQueue = queue.slice();

  resetSchedulerState();

  // call component updated and activated hooks
  callActivatedHooks(activatedQueue);
  callUpdatedHooks(updatedQueue);

  // devtool hook
  /* istanbul ignore if */
  if (devtools && config.devtools) {
    devtools.emit('flush');
  }
}

function callUpdatedHooks (queue) {
  var i = queue.length;
  while (i--) {
    var watcher = queue[i];
    var vm = watcher.vm;
    if (vm._watcher === watcher && vm._isMounted && !vm._isDestroyed) {
      callHook(vm, 'updated');
    }
  }
}

/**
 * Queue a kept-alive component that was activated during patch.
 * The queue will be processed after the entire tree has been patched.
 */
function queueActivatedComponent (vm) {
  // setting _inactive to false here so that a render function can
  // rely on checking whether it's in an inactive tree (e.g. router-view)
  vm._inactive = false;
  activatedChildren.push(vm);
}

function callActivatedHooks (queue) {
  for (var i = 0; i < queue.length; i++) {
    queue[i]._inactive = true;
    activateChildComponent(queue[i], true /* true */);
  }
}

/**
 * Push a watcher into the watcher queue.
 * Jobs with duplicate IDs will be skipped unless it's
 * pushed when the queue is being flushed.
 */
function queueWatcher (watcher) {
  var id = watcher.id;
  if (has[id] == null) {
    has[id] = true;
    if (!flushing) {
      queue.push(watcher);
    } else {
      // if already flushing, splice the watcher based on its id
      // if already past its id, it will be run next immediately.
      var i = queue.length - 1;
      while (i > index && queue[i].id > watcher.id) {
        i--;
      }
      queue.splice(i + 1, 0, watcher);
    }
    // queue the flush
    if (!waiting) {
      waiting = true;

      if ( true && !config.async) {
        flushSchedulerQueue();
        return
      }
      nextTick(flushSchedulerQueue);
    }
  }
}

/*  */



var uid$2 = 0;

/**
 * A watcher parses an expression, collects dependencies,
 * and fires callback when the expression value changes.
 * This is used for both the $watch() api and directives.
 */
var Watcher = function Watcher (
  vm,
  expOrFn,
  cb,
  options,
  isRenderWatcher
) {
  this.vm = vm;
  if (isRenderWatcher) {
    vm._watcher = this;
  }
  vm._watchers.push(this);
  // options
  if (options) {
    this.deep = !!options.deep;
    this.user = !!options.user;
    this.lazy = !!options.lazy;
    this.sync = !!options.sync;
    this.before = options.before;
  } else {
    this.deep = this.user = this.lazy = this.sync = false;
  }
  this.cb = cb;
  this.id = ++uid$2; // uid for batching
  this.active = true;
  this.dirty = this.lazy; // for lazy watchers
  this.deps = [];
  this.newDeps = [];
  this.depIds = new _Set();
  this.newDepIds = new _Set();
  this.expression =  true
    ? expOrFn.toString()
    : undefined;
  // parse expression for getter
  if (typeof expOrFn === 'function') {
    this.getter = expOrFn;
  } else {
    this.getter = parsePath(expOrFn);
    if (!this.getter) {
      this.getter = noop;
       true && warn(
        "Failed watching path: \"" + expOrFn + "\" " +
        'Watcher only accepts simple dot-delimited paths. ' +
        'For full control, use a function instead.',
        vm
      );
    }
  }
  this.value = this.lazy
    ? undefined
    : this.get();
};

/**
 * Evaluate the getter, and re-collect dependencies.
 */
Watcher.prototype.get = function get () {
  pushTarget(this);
  var value;
  var vm = this.vm;
  try {
    value = this.getter.call(vm, vm);
  } catch (e) {
    if (this.user) {
      handleError(e, vm, ("getter for watcher \"" + (this.expression) + "\""));
    } else {
      throw e
    }
  } finally {
    // "touch" every property so they are all tracked as
    // dependencies for deep watching
    if (this.deep) {
      traverse(value);
    }
    popTarget();
    this.cleanupDeps();
  }
  return value
};

/**
 * Add a dependency to this directive.
 */
Watcher.prototype.addDep = function addDep (dep) {
  var id = dep.id;
  if (!this.newDepIds.has(id)) {
    this.newDepIds.add(id);
    this.newDeps.push(dep);
    if (!this.depIds.has(id)) {
      dep.addSub(this);
    }
  }
};

/**
 * Clean up for dependency collection.
 */
Watcher.prototype.cleanupDeps = function cleanupDeps () {
  var i = this.deps.length;
  while (i--) {
    var dep = this.deps[i];
    if (!this.newDepIds.has(dep.id)) {
      dep.removeSub(this);
    }
  }
  var tmp = this.depIds;
  this.depIds = this.newDepIds;
  this.newDepIds = tmp;
  this.newDepIds.clear();
  tmp = this.deps;
  this.deps = this.newDeps;
  this.newDeps = tmp;
  this.newDeps.length = 0;
};

/**
 * Subscriber interface.
 * Will be called when a dependency changes.
 */
Watcher.prototype.update = function update () {
  /* istanbul ignore else */
  if (this.lazy) {
    this.dirty = true;
  } else if (this.sync) {
    this.run();
  } else {
    queueWatcher(this);
  }
};

/**
 * Scheduler job interface.
 * Will be called by the scheduler.
 */
Watcher.prototype.run = function run () {
  if (this.active) {
    var value = this.get();
    if (
      value !== this.value ||
      // Deep watchers and watchers on Object/Arrays should fire even
      // when the value is the same, because the value may
      // have mutated.
      isObject(value) ||
      this.deep
    ) {
      // set new value
      var oldValue = this.value;
      this.value = value;
      if (this.user) {
        try {
          this.cb.call(this.vm, value, oldValue);
        } catch (e) {
          handleError(e, this.vm, ("callback for watcher \"" + (this.expression) + "\""));
        }
      } else {
        this.cb.call(this.vm, value, oldValue);
      }
    }
  }
};

/**
 * Evaluate the value of the watcher.
 * This only gets called for lazy watchers.
 */
Watcher.prototype.evaluate = function evaluate () {
  this.value = this.get();
  this.dirty = false;
};

/**
 * Depend on all deps collected by this watcher.
 */
Watcher.prototype.depend = function depend () {
  var i = this.deps.length;
  while (i--) {
    this.deps[i].depend();
  }
};

/**
 * Remove self from all dependencies' subscriber list.
 */
Watcher.prototype.teardown = function teardown () {
  if (this.active) {
    // remove self from vm's watcher list
    // this is a somewhat expensive operation so we skip it
    // if the vm is being destroyed.
    if (!this.vm._isBeingDestroyed) {
      remove(this.vm._watchers, this);
    }
    var i = this.deps.length;
    while (i--) {
      this.deps[i].removeSub(this);
    }
    this.active = false;
  }
};

/*  */

var sharedPropertyDefinition = {
  enumerable: true,
  configurable: true,
  get: noop,
  set: noop
};

function proxy (target, sourceKey, key) {
  sharedPropertyDefinition.get = function proxyGetter () {
    return this[sourceKey][key]
  };
  sharedPropertyDefinition.set = function proxySetter (val) {
    this[sourceKey][key] = val;
  };
  Object.defineProperty(target, key, sharedPropertyDefinition);
}

function initState (vm) {
  vm._watchers = [];
  var opts = vm.$options;
  if (opts.props) { initProps(vm, opts.props); }
  if (opts.methods) { initMethods(vm, opts.methods); }
  if (opts.data) {
    initData(vm);
  } else {
    observe(vm._data = {}, true /* asRootData */);
  }
  if (opts.computed) { initComputed(vm, opts.computed); }
  if (opts.watch && opts.watch !== nativeWatch) {
    initWatch(vm, opts.watch);
  }
}

function initProps (vm, propsOptions) {
  var propsData = vm.$options.propsData || {};
  var props = vm._props = {};
  // cache prop keys so that future props updates can iterate using Array
  // instead of dynamic object key enumeration.
  var keys = vm.$options._propKeys = [];
  var isRoot = !vm.$parent;
  // root instance props should be converted
  if (!isRoot) {
    toggleObserving(false);
  }
  var loop = function ( key ) {
    keys.push(key);
    var value = validateProp(key, propsOptions, propsData, vm);
    /* istanbul ignore else */
    if (true) {
      var hyphenatedKey = hyphenate(key);
      if (isReservedAttribute(hyphenatedKey) ||
          config.isReservedAttr(hyphenatedKey)) {
        warn(
          ("\"" + hyphenatedKey + "\" is a reserved attribute and cannot be used as component prop."),
          vm
        );
      }
      defineReactive$$1(props, key, value, function () {
        if (!isRoot && !isUpdatingChildComponent) {
          {
            if(vm.mpHost === 'mp-baidu'){//百度 observer 在 setData callback 之后触发，直接忽略该 warn
                return
            }
            //fixed by xxxxxx __next_tick_pending,uni://form-field 时不告警
            if(
                key === 'value' && 
                Array.isArray(vm.$options.behaviors) &&
                vm.$options.behaviors.indexOf('uni://form-field') !== -1
              ){
              return
            }
            if(vm._getFormData){
              return
            }
            var $parent = vm.$parent;
            while($parent){
              if($parent.__next_tick_pending){
                return  
              }
              $parent = $parent.$parent;
            }
          }
          warn(
            "Avoid mutating a prop directly since the value will be " +
            "overwritten whenever the parent component re-renders. " +
            "Instead, use a data or computed property based on the prop's " +
            "value. Prop being mutated: \"" + key + "\"",
            vm
          );
        }
      });
    } else {}
    // static props are already proxied on the component's prototype
    // during Vue.extend(). We only need to proxy props defined at
    // instantiation here.
    if (!(key in vm)) {
      proxy(vm, "_props", key);
    }
  };

  for (var key in propsOptions) loop( key );
  toggleObserving(true);
}

function initData (vm) {
  var data = vm.$options.data;
  data = vm._data = typeof data === 'function'
    ? getData(data, vm)
    : data || {};
  if (!isPlainObject(data)) {
    data = {};
     true && warn(
      'data functions should return an object:\n' +
      'https://vuejs.org/v2/guide/components.html#data-Must-Be-a-Function',
      vm
    );
  }
  // proxy data on instance
  var keys = Object.keys(data);
  var props = vm.$options.props;
  var methods = vm.$options.methods;
  var i = keys.length;
  while (i--) {
    var key = keys[i];
    if (true) {
      if (methods && hasOwn(methods, key)) {
        warn(
          ("Method \"" + key + "\" has already been defined as a data property."),
          vm
        );
      }
    }
    if (props && hasOwn(props, key)) {
       true && warn(
        "The data property \"" + key + "\" is already declared as a prop. " +
        "Use prop default value instead.",
        vm
      );
    } else if (!isReserved(key)) {
      proxy(vm, "_data", key);
    }
  }
  // observe data
  observe(data, true /* asRootData */);
}

function getData (data, vm) {
  // #7573 disable dep collection when invoking data getters
  pushTarget();
  try {
    return data.call(vm, vm)
  } catch (e) {
    handleError(e, vm, "data()");
    return {}
  } finally {
    popTarget();
  }
}

var computedWatcherOptions = { lazy: true };

function initComputed (vm, computed) {
  // $flow-disable-line
  var watchers = vm._computedWatchers = Object.create(null);
  // computed properties are just getters during SSR
  var isSSR = isServerRendering();

  for (var key in computed) {
    var userDef = computed[key];
    var getter = typeof userDef === 'function' ? userDef : userDef.get;
    if ( true && getter == null) {
      warn(
        ("Getter is missing for computed property \"" + key + "\"."),
        vm
      );
    }

    if (!isSSR) {
      // create internal watcher for the computed property.
      watchers[key] = new Watcher(
        vm,
        getter || noop,
        noop,
        computedWatcherOptions
      );
    }

    // component-defined computed properties are already defined on the
    // component prototype. We only need to define computed properties defined
    // at instantiation here.
    if (!(key in vm)) {
      defineComputed(vm, key, userDef);
    } else if (true) {
      if (key in vm.$data) {
        warn(("The computed property \"" + key + "\" is already defined in data."), vm);
      } else if (vm.$options.props && key in vm.$options.props) {
        warn(("The computed property \"" + key + "\" is already defined as a prop."), vm);
      }
    }
  }
}

function defineComputed (
  target,
  key,
  userDef
) {
  var shouldCache = !isServerRendering();
  if (typeof userDef === 'function') {
    sharedPropertyDefinition.get = shouldCache
      ? createComputedGetter(key)
      : createGetterInvoker(userDef);
    sharedPropertyDefinition.set = noop;
  } else {
    sharedPropertyDefinition.get = userDef.get
      ? shouldCache && userDef.cache !== false
        ? createComputedGetter(key)
        : createGetterInvoker(userDef.get)
      : noop;
    sharedPropertyDefinition.set = userDef.set || noop;
  }
  if ( true &&
      sharedPropertyDefinition.set === noop) {
    sharedPropertyDefinition.set = function () {
      warn(
        ("Computed property \"" + key + "\" was assigned to but it has no setter."),
        this
      );
    };
  }
  Object.defineProperty(target, key, sharedPropertyDefinition);
}

function createComputedGetter (key) {
  return function computedGetter () {
    var watcher = this._computedWatchers && this._computedWatchers[key];
    if (watcher) {
      if (watcher.dirty) {
        watcher.evaluate();
      }
      if (Dep.SharedObject.target) {// fixed by xxxxxx
        watcher.depend();
      }
      return watcher.value
    }
  }
}

function createGetterInvoker(fn) {
  return function computedGetter () {
    return fn.call(this, this)
  }
}

function initMethods (vm, methods) {
  var props = vm.$options.props;
  for (var key in methods) {
    if (true) {
      if (typeof methods[key] !== 'function') {
        warn(
          "Method \"" + key + "\" has type \"" + (typeof methods[key]) + "\" in the component definition. " +
          "Did you reference the function correctly?",
          vm
        );
      }
      if (props && hasOwn(props, key)) {
        warn(
          ("Method \"" + key + "\" has already been defined as a prop."),
          vm
        );
      }
      if ((key in vm) && isReserved(key)) {
        warn(
          "Method \"" + key + "\" conflicts with an existing Vue instance method. " +
          "Avoid defining component methods that start with _ or $."
        );
      }
    }
    vm[key] = typeof methods[key] !== 'function' ? noop : bind(methods[key], vm);
  }
}

function initWatch (vm, watch) {
  for (var key in watch) {
    var handler = watch[key];
    if (Array.isArray(handler)) {
      for (var i = 0; i < handler.length; i++) {
        createWatcher(vm, key, handler[i]);
      }
    } else {
      createWatcher(vm, key, handler);
    }
  }
}

function createWatcher (
  vm,
  expOrFn,
  handler,
  options
) {
  if (isPlainObject(handler)) {
    options = handler;
    handler = handler.handler;
  }
  if (typeof handler === 'string') {
    handler = vm[handler];
  }
  return vm.$watch(expOrFn, handler, options)
}

function stateMixin (Vue) {
  // flow somehow has problems with directly declared definition object
  // when using Object.defineProperty, so we have to procedurally build up
  // the object here.
  var dataDef = {};
  dataDef.get = function () { return this._data };
  var propsDef = {};
  propsDef.get = function () { return this._props };
  if (true) {
    dataDef.set = function () {
      warn(
        'Avoid replacing instance root $data. ' +
        'Use nested data properties instead.',
        this
      );
    };
    propsDef.set = function () {
      warn("$props is readonly.", this);
    };
  }
  Object.defineProperty(Vue.prototype, '$data', dataDef);
  Object.defineProperty(Vue.prototype, '$props', propsDef);

  Vue.prototype.$set = set;
  Vue.prototype.$delete = del;

  Vue.prototype.$watch = function (
    expOrFn,
    cb,
    options
  ) {
    var vm = this;
    if (isPlainObject(cb)) {
      return createWatcher(vm, expOrFn, cb, options)
    }
    options = options || {};
    options.user = true;
    var watcher = new Watcher(vm, expOrFn, cb, options);
    if (options.immediate) {
      try {
        cb.call(vm, watcher.value);
      } catch (error) {
        handleError(error, vm, ("callback for immediate watcher \"" + (watcher.expression) + "\""));
      }
    }
    return function unwatchFn () {
      watcher.teardown();
    }
  };
}

/*  */

var uid$3 = 0;

function initMixin (Vue) {
  Vue.prototype._init = function (options) {
    var vm = this;
    // a uid
    vm._uid = uid$3++;

    var startTag, endTag;
    /* istanbul ignore if */
    if ( true && config.performance && mark) {
      startTag = "vue-perf-start:" + (vm._uid);
      endTag = "vue-perf-end:" + (vm._uid);
      mark(startTag);
    }

    // a flag to avoid this being observed
    vm._isVue = true;
    // merge options
    if (options && options._isComponent) {
      // optimize internal component instantiation
      // since dynamic options merging is pretty slow, and none of the
      // internal component options needs special treatment.
      initInternalComponent(vm, options);
    } else {
      vm.$options = mergeOptions(
        resolveConstructorOptions(vm.constructor),
        options || {},
        vm
      );
    }
    /* istanbul ignore else */
    if (true) {
      initProxy(vm);
    } else {}
    // expose real self
    vm._self = vm;
    initLifecycle(vm);
    initEvents(vm);
    initRender(vm);
    callHook(vm, 'beforeCreate');
    vm.mpHost !== 'mp-toutiao' && initInjections(vm); // resolve injections before data/props  
    initState(vm);
    vm.mpHost !== 'mp-toutiao' && initProvide(vm); // resolve provide after data/props
    vm.mpHost !== 'mp-toutiao' && callHook(vm, 'created');      

    /* istanbul ignore if */
    if ( true && config.performance && mark) {
      vm._name = formatComponentName(vm, false);
      mark(endTag);
      measure(("vue " + (vm._name) + " init"), startTag, endTag);
    }

    if (vm.$options.el) {
      vm.$mount(vm.$options.el);
    }
  };
}

function initInternalComponent (vm, options) {
  var opts = vm.$options = Object.create(vm.constructor.options);
  // doing this because it's faster than dynamic enumeration.
  var parentVnode = options._parentVnode;
  opts.parent = options.parent;
  opts._parentVnode = parentVnode;

  var vnodeComponentOptions = parentVnode.componentOptions;
  opts.propsData = vnodeComponentOptions.propsData;
  opts._parentListeners = vnodeComponentOptions.listeners;
  opts._renderChildren = vnodeComponentOptions.children;
  opts._componentTag = vnodeComponentOptions.tag;

  if (options.render) {
    opts.render = options.render;
    opts.staticRenderFns = options.staticRenderFns;
  }
}

function resolveConstructorOptions (Ctor) {
  var options = Ctor.options;
  if (Ctor.super) {
    var superOptions = resolveConstructorOptions(Ctor.super);
    var cachedSuperOptions = Ctor.superOptions;
    if (superOptions !== cachedSuperOptions) {
      // super option changed,
      // need to resolve new options.
      Ctor.superOptions = superOptions;
      // check if there are any late-modified/attached options (#4976)
      var modifiedOptions = resolveModifiedOptions(Ctor);
      // update base extend options
      if (modifiedOptions) {
        extend(Ctor.extendOptions, modifiedOptions);
      }
      options = Ctor.options = mergeOptions(superOptions, Ctor.extendOptions);
      if (options.name) {
        options.components[options.name] = Ctor;
      }
    }
  }
  return options
}

function resolveModifiedOptions (Ctor) {
  var modified;
  var latest = Ctor.options;
  var sealed = Ctor.sealedOptions;
  for (var key in latest) {
    if (latest[key] !== sealed[key]) {
      if (!modified) { modified = {}; }
      modified[key] = latest[key];
    }
  }
  return modified
}

function Vue (options) {
  if ( true &&
    !(this instanceof Vue)
  ) {
    warn('Vue is a constructor and should be called with the `new` keyword');
  }
  this._init(options);
}

initMixin(Vue);
stateMixin(Vue);
eventsMixin(Vue);
lifecycleMixin(Vue);
renderMixin(Vue);

/*  */

function initUse (Vue) {
  Vue.use = function (plugin) {
    var installedPlugins = (this._installedPlugins || (this._installedPlugins = []));
    if (installedPlugins.indexOf(plugin) > -1) {
      return this
    }

    // additional parameters
    var args = toArray(arguments, 1);
    args.unshift(this);
    if (typeof plugin.install === 'function') {
      plugin.install.apply(plugin, args);
    } else if (typeof plugin === 'function') {
      plugin.apply(null, args);
    }
    installedPlugins.push(plugin);
    return this
  };
}

/*  */

function initMixin$1 (Vue) {
  Vue.mixin = function (mixin) {
    this.options = mergeOptions(this.options, mixin);
    return this
  };
}

/*  */

function initExtend (Vue) {
  /**
   * Each instance constructor, including Vue, has a unique
   * cid. This enables us to create wrapped "child
   * constructors" for prototypal inheritance and cache them.
   */
  Vue.cid = 0;
  var cid = 1;

  /**
   * Class inheritance
   */
  Vue.extend = function (extendOptions) {
    extendOptions = extendOptions || {};
    var Super = this;
    var SuperId = Super.cid;
    var cachedCtors = extendOptions._Ctor || (extendOptions._Ctor = {});
    if (cachedCtors[SuperId]) {
      return cachedCtors[SuperId]
    }

    var name = extendOptions.name || Super.options.name;
    if ( true && name) {
      validateComponentName(name);
    }

    var Sub = function VueComponent (options) {
      this._init(options);
    };
    Sub.prototype = Object.create(Super.prototype);
    Sub.prototype.constructor = Sub;
    Sub.cid = cid++;
    Sub.options = mergeOptions(
      Super.options,
      extendOptions
    );
    Sub['super'] = Super;

    // For props and computed properties, we define the proxy getters on
    // the Vue instances at extension time, on the extended prototype. This
    // avoids Object.defineProperty calls for each instance created.
    if (Sub.options.props) {
      initProps$1(Sub);
    }
    if (Sub.options.computed) {
      initComputed$1(Sub);
    }

    // allow further extension/mixin/plugin usage
    Sub.extend = Super.extend;
    Sub.mixin = Super.mixin;
    Sub.use = Super.use;

    // create asset registers, so extended classes
    // can have their private assets too.
    ASSET_TYPES.forEach(function (type) {
      Sub[type] = Super[type];
    });
    // enable recursive self-lookup
    if (name) {
      Sub.options.components[name] = Sub;
    }

    // keep a reference to the super options at extension time.
    // later at instantiation we can check if Super's options have
    // been updated.
    Sub.superOptions = Super.options;
    Sub.extendOptions = extendOptions;
    Sub.sealedOptions = extend({}, Sub.options);

    // cache constructor
    cachedCtors[SuperId] = Sub;
    return Sub
  };
}

function initProps$1 (Comp) {
  var props = Comp.options.props;
  for (var key in props) {
    proxy(Comp.prototype, "_props", key);
  }
}

function initComputed$1 (Comp) {
  var computed = Comp.options.computed;
  for (var key in computed) {
    defineComputed(Comp.prototype, key, computed[key]);
  }
}

/*  */

function initAssetRegisters (Vue) {
  /**
   * Create asset registration methods.
   */
  ASSET_TYPES.forEach(function (type) {
    Vue[type] = function (
      id,
      definition
    ) {
      if (!definition) {
        return this.options[type + 's'][id]
      } else {
        /* istanbul ignore if */
        if ( true && type === 'component') {
          validateComponentName(id);
        }
        if (type === 'component' && isPlainObject(definition)) {
          definition.name = definition.name || id;
          definition = this.options._base.extend(definition);
        }
        if (type === 'directive' && typeof definition === 'function') {
          definition = { bind: definition, update: definition };
        }
        this.options[type + 's'][id] = definition;
        return definition
      }
    };
  });
}

/*  */



function getComponentName (opts) {
  return opts && (opts.Ctor.options.name || opts.tag)
}

function matches (pattern, name) {
  if (Array.isArray(pattern)) {
    return pattern.indexOf(name) > -1
  } else if (typeof pattern === 'string') {
    return pattern.split(',').indexOf(name) > -1
  } else if (isRegExp(pattern)) {
    return pattern.test(name)
  }
  /* istanbul ignore next */
  return false
}

function pruneCache (keepAliveInstance, filter) {
  var cache = keepAliveInstance.cache;
  var keys = keepAliveInstance.keys;
  var _vnode = keepAliveInstance._vnode;
  for (var key in cache) {
    var cachedNode = cache[key];
    if (cachedNode) {
      var name = getComponentName(cachedNode.componentOptions);
      if (name && !filter(name)) {
        pruneCacheEntry(cache, key, keys, _vnode);
      }
    }
  }
}

function pruneCacheEntry (
  cache,
  key,
  keys,
  current
) {
  var cached$$1 = cache[key];
  if (cached$$1 && (!current || cached$$1.tag !== current.tag)) {
    cached$$1.componentInstance.$destroy();
  }
  cache[key] = null;
  remove(keys, key);
}

var patternTypes = [String, RegExp, Array];

var KeepAlive = {
  name: 'keep-alive',
  abstract: true,

  props: {
    include: patternTypes,
    exclude: patternTypes,
    max: [String, Number]
  },

  created: function created () {
    this.cache = Object.create(null);
    this.keys = [];
  },

  destroyed: function destroyed () {
    for (var key in this.cache) {
      pruneCacheEntry(this.cache, key, this.keys);
    }
  },

  mounted: function mounted () {
    var this$1 = this;

    this.$watch('include', function (val) {
      pruneCache(this$1, function (name) { return matches(val, name); });
    });
    this.$watch('exclude', function (val) {
      pruneCache(this$1, function (name) { return !matches(val, name); });
    });
  },

  render: function render () {
    var slot = this.$slots.default;
    var vnode = getFirstComponentChild(slot);
    var componentOptions = vnode && vnode.componentOptions;
    if (componentOptions) {
      // check pattern
      var name = getComponentName(componentOptions);
      var ref = this;
      var include = ref.include;
      var exclude = ref.exclude;
      if (
        // not included
        (include && (!name || !matches(include, name))) ||
        // excluded
        (exclude && name && matches(exclude, name))
      ) {
        return vnode
      }

      var ref$1 = this;
      var cache = ref$1.cache;
      var keys = ref$1.keys;
      var key = vnode.key == null
        // same constructor may get registered as different local components
        // so cid alone is not enough (#3269)
        ? componentOptions.Ctor.cid + (componentOptions.tag ? ("::" + (componentOptions.tag)) : '')
        : vnode.key;
      if (cache[key]) {
        vnode.componentInstance = cache[key].componentInstance;
        // make current key freshest
        remove(keys, key);
        keys.push(key);
      } else {
        cache[key] = vnode;
        keys.push(key);
        // prune oldest entry
        if (this.max && keys.length > parseInt(this.max)) {
          pruneCacheEntry(cache, keys[0], keys, this._vnode);
        }
      }

      vnode.data.keepAlive = true;
    }
    return vnode || (slot && slot[0])
  }
};

var builtInComponents = {
  KeepAlive: KeepAlive
};

/*  */

function initGlobalAPI (Vue) {
  // config
  var configDef = {};
  configDef.get = function () { return config; };
  if (true) {
    configDef.set = function () {
      warn(
        'Do not replace the Vue.config object, set individual fields instead.'
      );
    };
  }
  Object.defineProperty(Vue, 'config', configDef);

  // exposed util methods.
  // NOTE: these are not considered part of the public API - avoid relying on
  // them unless you are aware of the risk.
  Vue.util = {
    warn: warn,
    extend: extend,
    mergeOptions: mergeOptions,
    defineReactive: defineReactive$$1
  };

  Vue.set = set;
  Vue.delete = del;
  Vue.nextTick = nextTick;

  // 2.6 explicit observable API
  Vue.observable = function (obj) {
    observe(obj);
    return obj
  };

  Vue.options = Object.create(null);
  ASSET_TYPES.forEach(function (type) {
    Vue.options[type + 's'] = Object.create(null);
  });

  // this is used to identify the "base" constructor to extend all plain-object
  // components with in Weex's multi-instance scenarios.
  Vue.options._base = Vue;

  extend(Vue.options.components, builtInComponents);

  initUse(Vue);
  initMixin$1(Vue);
  initExtend(Vue);
  initAssetRegisters(Vue);
}

initGlobalAPI(Vue);

Object.defineProperty(Vue.prototype, '$isServer', {
  get: isServerRendering
});

Object.defineProperty(Vue.prototype, '$ssrContext', {
  get: function get () {
    /* istanbul ignore next */
    return this.$vnode && this.$vnode.ssrContext
  }
});

// expose FunctionalRenderContext for ssr runtime helper installation
Object.defineProperty(Vue, 'FunctionalRenderContext', {
  value: FunctionalRenderContext
});

Vue.version = '2.6.11';

/**
 * https://raw.githubusercontent.com/Tencent/westore/master/packages/westore/utils/diff.js
 */
var ARRAYTYPE = '[object Array]';
var OBJECTTYPE = '[object Object]';
// const FUNCTIONTYPE = '[object Function]'

function diff(current, pre) {
    var result = {};
    syncKeys(current, pre);
    _diff(current, pre, '', result);
    return result
}

function syncKeys(current, pre) {
    if (current === pre) { return }
    var rootCurrentType = type(current);
    var rootPreType = type(pre);
    if (rootCurrentType == OBJECTTYPE && rootPreType == OBJECTTYPE) {
        if(Object.keys(current).length >= Object.keys(pre).length){
            for (var key in pre) {
                var currentValue = current[key];
                if (currentValue === undefined) {
                    current[key] = null;
                } else {
                    syncKeys(currentValue, pre[key]);
                }
            }
        }
    } else if (rootCurrentType == ARRAYTYPE && rootPreType == ARRAYTYPE) {
        if (current.length >= pre.length) {
            pre.forEach(function (item, index) {
                syncKeys(current[index], item);
            });
        }
    }
}

function _diff(current, pre, path, result) {
    if (current === pre) { return }
    var rootCurrentType = type(current);
    var rootPreType = type(pre);
    if (rootCurrentType == OBJECTTYPE) {
        if (rootPreType != OBJECTTYPE || Object.keys(current).length < Object.keys(pre).length) {
            setResult(result, path, current);
        } else {
            var loop = function ( key ) {
                var currentValue = current[key];
                var preValue = pre[key];
                var currentType = type(currentValue);
                var preType = type(preValue);
                if (currentType != ARRAYTYPE && currentType != OBJECTTYPE) {
                    if (currentValue != pre[key]) {
                        setResult(result, (path == '' ? '' : path + ".") + key, currentValue);
                    }
                } else if (currentType == ARRAYTYPE) {
                    if (preType != ARRAYTYPE) {
                        setResult(result, (path == '' ? '' : path + ".") + key, currentValue);
                    } else {
                        if (currentValue.length < preValue.length) {
                            setResult(result, (path == '' ? '' : path + ".") + key, currentValue);
                        } else {
                            currentValue.forEach(function (item, index) {
                                _diff(item, preValue[index], (path == '' ? '' : path + ".") + key + '[' + index + ']', result);
                            });
                        }
                    }
                } else if (currentType == OBJECTTYPE) {
                    if (preType != OBJECTTYPE || Object.keys(currentValue).length < Object.keys(preValue).length) {
                        setResult(result, (path == '' ? '' : path + ".") + key, currentValue);
                    } else {
                        for (var subKey in currentValue) {
                            _diff(currentValue[subKey], preValue[subKey], (path == '' ? '' : path + ".") + key + '.' + subKey, result);
                        }
                    }
                }
            };

            for (var key in current) loop( key );
        }
    } else if (rootCurrentType == ARRAYTYPE) {
        if (rootPreType != ARRAYTYPE) {
            setResult(result, path, current);
        } else {
            if (current.length < pre.length) {
                setResult(result, path, current);
            } else {
                current.forEach(function (item, index) {
                    _diff(item, pre[index], path + '[' + index + ']', result);
                });
            }
        }
    } else {
        setResult(result, path, current);
    }
}

function setResult(result, k, v) {
    // if (type(v) != FUNCTIONTYPE) {
        result[k] = v;
    // }
}

function type(obj) {
    return Object.prototype.toString.call(obj)
}

/*  */

function flushCallbacks$1(vm) {
    if (vm.__next_tick_callbacks && vm.__next_tick_callbacks.length) {
        if (Object({"NODE_ENV":"development","VUE_APP_PLATFORM":"mp-weixin","BASE_URL":"/"}).VUE_APP_DEBUG) {
            var mpInstance = vm.$scope;
            console.log('[' + (+new Date) + '][' + (mpInstance.is || mpInstance.route) + '][' + vm._uid +
                ']:flushCallbacks[' + vm.__next_tick_callbacks.length + ']');
        }
        var copies = vm.__next_tick_callbacks.slice(0);
        vm.__next_tick_callbacks.length = 0;
        for (var i = 0; i < copies.length; i++) {
            copies[i]();
        }
    }
}

function hasRenderWatcher(vm) {
    return queue.find(function (watcher) { return vm._watcher === watcher; })
}

function nextTick$1(vm, cb) {
    //1.nextTick 之前 已 setData 且 setData 还未回调完成
    //2.nextTick 之前存在 render watcher
    if (!vm.__next_tick_pending && !hasRenderWatcher(vm)) {
        if(Object({"NODE_ENV":"development","VUE_APP_PLATFORM":"mp-weixin","BASE_URL":"/"}).VUE_APP_DEBUG){
            var mpInstance = vm.$scope;
            console.log('[' + (+new Date) + '][' + (mpInstance.is || mpInstance.route) + '][' + vm._uid +
                ']:nextVueTick');
        }
        return nextTick(cb, vm)
    }else{
        if(Object({"NODE_ENV":"development","VUE_APP_PLATFORM":"mp-weixin","BASE_URL":"/"}).VUE_APP_DEBUG){
            var mpInstance$1 = vm.$scope;
            console.log('[' + (+new Date) + '][' + (mpInstance$1.is || mpInstance$1.route) + '][' + vm._uid +
                ']:nextMPTick');
        }
    }
    var _resolve;
    if (!vm.__next_tick_callbacks) {
        vm.__next_tick_callbacks = [];
    }
    vm.__next_tick_callbacks.push(function () {
        if (cb) {
            try {
                cb.call(vm);
            } catch (e) {
                handleError(e, vm, 'nextTick');
            }
        } else if (_resolve) {
            _resolve(vm);
        }
    });
    // $flow-disable-line
    if (!cb && typeof Promise !== 'undefined') {
        return new Promise(function (resolve) {
            _resolve = resolve;
        })
    }
}

/*  */

function cloneWithData(vm) {
  // 确保当前 vm 所有数据被同步
  var ret = Object.create(null);
  var dataKeys = [].concat(
    Object.keys(vm._data || {}),
    Object.keys(vm._computedWatchers || {}));

  dataKeys.reduce(function(ret, key) {
    ret[key] = vm[key];
    return ret
  }, ret);
  //TODO 需要把无用数据处理掉，比如 list=>l0 则 list 需要移除，否则多传输一份数据
  Object.assign(ret, vm.$mp.data || {});
  if (
    Array.isArray(vm.$options.behaviors) &&
    vm.$options.behaviors.indexOf('uni://form-field') !== -1
  ) { //form-field
    ret['name'] = vm.name;
    ret['value'] = vm.value;
  }

  return JSON.parse(JSON.stringify(ret))
}

var patch = function(oldVnode, vnode) {
  var this$1 = this;

  if (vnode === null) { //destroy
    return
  }
  if (this.mpType === 'page' || this.mpType === 'component') {
    var mpInstance = this.$scope;
    var data = Object.create(null);
    try {
      data = cloneWithData(this);
    } catch (err) {
      console.error(err);
    }
    data.__webviewId__ = mpInstance.data.__webviewId__;
    var mpData = Object.create(null);
    Object.keys(data).forEach(function (key) { //仅同步 data 中有的数据
      mpData[key] = mpInstance.data[key];
    });
    var diffData = this.$shouldDiffData === false ? data : diff(data, mpData);
    if (Object.keys(diffData).length) {
      if (Object({"NODE_ENV":"development","VUE_APP_PLATFORM":"mp-weixin","BASE_URL":"/"}).VUE_APP_DEBUG) {
        console.log('[' + (+new Date) + '][' + (mpInstance.is || mpInstance.route) + '][' + this._uid +
          ']差量更新',
          JSON.stringify(diffData));
      }
      this.__next_tick_pending = true;
      mpInstance.setData(diffData, function () {
        this$1.__next_tick_pending = false;
        flushCallbacks$1(this$1);
      });
    } else {
      flushCallbacks$1(this);
    }
  }
};

/*  */

function createEmptyRender() {

}

function mountComponent$1(
  vm,
  el,
  hydrating
) {
  if (!vm.mpType) {//main.js 中的 new Vue
    return vm
  }
  if (vm.mpType === 'app') {
    vm.$options.render = createEmptyRender;
  }
  if (!vm.$options.render) {
    vm.$options.render = createEmptyRender;
    if (true) {
      /* istanbul ignore if */
      if ((vm.$options.template && vm.$options.template.charAt(0) !== '#') ||
        vm.$options.el || el) {
        warn(
          'You are using the runtime-only build of Vue where the template ' +
          'compiler is not available. Either pre-compile the templates into ' +
          'render functions, or use the compiler-included build.',
          vm
        );
      } else {
        warn(
          'Failed to mount component: template or render function not defined.',
          vm
        );
      }
    }
  }
  
  vm.mpHost !== 'mp-toutiao' && callHook(vm, 'beforeMount');

  var updateComponent = function () {
    vm._update(vm._render(), hydrating);
  };

  // we set this to vm._watcher inside the watcher's constructor
  // since the watcher's initial patch may call $forceUpdate (e.g. inside child
  // component's mounted hook), which relies on vm._watcher being already defined
  new Watcher(vm, updateComponent, noop, {
    before: function before() {
      if (vm._isMounted && !vm._isDestroyed) {
        callHook(vm, 'beforeUpdate');
      }
    }
  }, true /* isRenderWatcher */);
  hydrating = false;
  return vm
}

/*  */

function renderClass (
  staticClass,
  dynamicClass
) {
  if (isDef(staticClass) || isDef(dynamicClass)) {
    return concat(staticClass, stringifyClass(dynamicClass))
  }
  /* istanbul ignore next */
  return ''
}

function concat (a, b) {
  return a ? b ? (a + ' ' + b) : a : (b || '')
}

function stringifyClass (value) {
  if (Array.isArray(value)) {
    return stringifyArray(value)
  }
  if (isObject(value)) {
    return stringifyObject(value)
  }
  if (typeof value === 'string') {
    return value
  }
  /* istanbul ignore next */
  return ''
}

function stringifyArray (value) {
  var res = '';
  var stringified;
  for (var i = 0, l = value.length; i < l; i++) {
    if (isDef(stringified = stringifyClass(value[i])) && stringified !== '') {
      if (res) { res += ' '; }
      res += stringified;
    }
  }
  return res
}

function stringifyObject (value) {
  var res = '';
  for (var key in value) {
    if (value[key]) {
      if (res) { res += ' '; }
      res += key;
    }
  }
  return res
}

/*  */

var parseStyleText = cached(function (cssText) {
  var res = {};
  var listDelimiter = /;(?![^(]*\))/g;
  var propertyDelimiter = /:(.+)/;
  cssText.split(listDelimiter).forEach(function (item) {
    if (item) {
      var tmp = item.split(propertyDelimiter);
      tmp.length > 1 && (res[tmp[0].trim()] = tmp[1].trim());
    }
  });
  return res
});

// normalize possible array / string values into Object
function normalizeStyleBinding (bindingStyle) {
  if (Array.isArray(bindingStyle)) {
    return toObject(bindingStyle)
  }
  if (typeof bindingStyle === 'string') {
    return parseStyleText(bindingStyle)
  }
  return bindingStyle
}

/*  */

var MP_METHODS = ['createSelectorQuery', 'createIntersectionObserver', 'selectAllComponents', 'selectComponent'];

function getTarget(obj, path) {
  var parts = path.split('.');
  var key = parts[0];
  if (key.indexOf('__$n') === 0) { //number index
    key = parseInt(key.replace('__$n', ''));
  }
  if (parts.length === 1) {
    return obj[key]
  }
  return getTarget(obj[key], parts.slice(1).join('.'))
}

function internalMixin(Vue) {

  Vue.config.errorHandler = function(err) {
    console.error(err);
    /* eslint-disable no-undef */
    var app = getApp();
    if (app && app.onError) {
      app.onError(err);
    }
  };

  var oldEmit = Vue.prototype.$emit;

  Vue.prototype.$emit = function(event) {
    if (this.$scope && event) {
      this.$scope['triggerEvent'](event, {
        __args__: toArray(arguments, 1)
      });
    }
    return oldEmit.apply(this, arguments)
  };

  Vue.prototype.$nextTick = function(fn) {
    return nextTick$1(this, fn)
  };

  MP_METHODS.forEach(function (method) {
    Vue.prototype[method] = function(args) {
      if (this.$scope && this.$scope[method]) {
        return this.$scope[method](args)
      }
      // mp-alipay
      if (typeof my === 'undefined') {
        return
      }
      if (method === 'createSelectorQuery') {
        /* eslint-disable no-undef */
        return my.createSelectorQuery(args)
      } else if (method === 'createIntersectionObserver') {
        /* eslint-disable no-undef */
        return my.createIntersectionObserver(args)
      }
      // TODO mp-alipay 暂不支持 selectAllComponents,selectComponent
    };
  });

  Vue.prototype.__init_provide = initProvide;

  Vue.prototype.__init_injections = initInjections;

  Vue.prototype.__call_hook = function(hook, args) {
    var vm = this;
    // #7573 disable dep collection when invoking lifecycle hooks
    pushTarget();
    var handlers = vm.$options[hook];
    var info = hook + " hook";
    var ret;
    if (handlers) {
      for (var i = 0, j = handlers.length; i < j; i++) {
        ret = invokeWithErrorHandling(handlers[i], vm, args ? [args] : null, vm, info);
      }
    }
    if (vm._hasHookEvent) {
      vm.$emit('hook:' + hook, args);
    }
    popTarget();
    return ret
  };

  Vue.prototype.__set_model = function(target, key, value, modifiers) {
    if (Array.isArray(modifiers)) {
      if (modifiers.indexOf('trim') !== -1) {
        value = value.trim();
      }
      if (modifiers.indexOf('number') !== -1) {
        value = this._n(value);
      }
    }
    if (!target) {
      target = this;
    }
    target[key] = value;
  };

  Vue.prototype.__set_sync = function(target, key, value) {
    if (!target) {
      target = this;
    }
    target[key] = value;
  };

  Vue.prototype.__get_orig = function(item) {
    if (isPlainObject(item)) {
      return item['$orig'] || item
    }
    return item
  };

  Vue.prototype.__get_value = function(dataPath, target) {
    return getTarget(target || this, dataPath)
  };


  Vue.prototype.__get_class = function(dynamicClass, staticClass) {
    return renderClass(staticClass, dynamicClass)
  };

  Vue.prototype.__get_style = function(dynamicStyle, staticStyle) {
    if (!dynamicStyle && !staticStyle) {
      return ''
    }
    var dynamicStyleObj = normalizeStyleBinding(dynamicStyle);
    var styleObj = staticStyle ? extend(staticStyle, dynamicStyleObj) : dynamicStyleObj;
    return Object.keys(styleObj).map(function (name) { return ((hyphenate(name)) + ":" + (styleObj[name])); }).join(';')
  };

  Vue.prototype.__map = function(val, iteratee) {
    //TODO 暂不考虑 string,number
    var ret, i, l, keys, key;
    if (Array.isArray(val)) {
      ret = new Array(val.length);
      for (i = 0, l = val.length; i < l; i++) {
        ret[i] = iteratee(val[i], i);
      }
      return ret
    } else if (isObject(val)) {
      keys = Object.keys(val);
      ret = Object.create(null);
      for (i = 0, l = keys.length; i < l; i++) {
        key = keys[i];
        ret[key] = iteratee(val[key], key, i);
      }
      return ret
    }
    return []
  };

}

/*  */

var LIFECYCLE_HOOKS$1 = [
    //App
    'onLaunch',
    'onShow',
    'onHide',
    'onUniNViewMessage',
    'onError',
    //Page
    'onLoad',
    // 'onShow',
    'onReady',
    // 'onHide',
    'onUnload',
    'onPullDownRefresh',
    'onReachBottom',
    'onTabItemTap',
    'onShareAppMessage',
    'onResize',
    'onPageScroll',
    'onNavigationBarButtonTap',
    'onBackPress',
    'onNavigationBarSearchInputChanged',
    'onNavigationBarSearchInputConfirmed',
    'onNavigationBarSearchInputClicked',
    //Component
    // 'onReady', // 兼容旧版本，应该移除该事件
    'onPageShow',
    'onPageHide',
    'onPageResize'
];
function lifecycleMixin$1(Vue) {

    //fixed vue-class-component
    var oldExtend = Vue.extend;
    Vue.extend = function(extendOptions) {
        extendOptions = extendOptions || {};

        var methods = extendOptions.methods;
        if (methods) {
            Object.keys(methods).forEach(function (methodName) {
                if (LIFECYCLE_HOOKS$1.indexOf(methodName)!==-1) {
                    extendOptions[methodName] = methods[methodName];
                    delete methods[methodName];
                }
            });
        }

        return oldExtend.call(this, extendOptions)
    };

    var strategies = Vue.config.optionMergeStrategies;
    var mergeHook = strategies.created;
    LIFECYCLE_HOOKS$1.forEach(function (hook) {
        strategies[hook] = mergeHook;
    });

    Vue.prototype.__lifecycle_hooks__ = LIFECYCLE_HOOKS$1;
}

/*  */

// install platform patch function
Vue.prototype.__patch__ = patch;

// public mount method
Vue.prototype.$mount = function(
    el ,
    hydrating 
) {
    return mountComponent$1(this, el, hydrating)
};

lifecycleMixin$1(Vue);
internalMixin(Vue);

/*  */

/* harmony default export */ __webpack_exports__["default"] = (Vue);

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../../../../webpack/buildin/global.js */ 3)))

/***/ }),

/***/ 23:
/*!********************************************!*\
  !*** F:/工作/APP/static/img/banners/006.jpg ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "data:image/jpeg;base64,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"

/***/ }),

/***/ 235:
/*!*******************************************!*\
  !*** F:/工作/APP/static/icon/icon/shan.png ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,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"

/***/ }),

/***/ 24:
/*!********************************************!*\
  !*** F:/工作/APP/static/img/banners/007.jpg ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQEAYABgAAD/2wBDAAMCAgMCAgMDAwMEAwMEBQgFBQQEBQoHBwYIDAoMDAsKCwsNDhIQDQ4RDgsLEBYQERMUFRUVDA8XGBYUGBIUFRT/2wBDAQMEBAUEBQkFBQkUDQsNFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBT/wAARCADIAXcDASIAAhEBAxEB/8QAHwAAAQUBAQEBAQEAAAAAAAAAAAECAwQFBgcICQoL/8QAtRAAAgEDAwIEAwUFBAQAAAF9AQIDAAQRBRIhMUEGE1FhByJxFDKBkaEII0KxwRVS0fAkM2JyggkKFhcYGRolJicoKSo0NTY3ODk6Q0RFRkdISUpTVFVWV1hZWmNkZWZnaGlqc3R1dnd4eXqDhIWGh4iJipKTlJWWl5iZmqKjpKWmp6ipqrKztLW2t7i5usLDxMXGx8jJytLT1NXW19jZ2uHi4+Tl5ufo6erx8vP09fb3+Pn6/8QAHwEAAwEBAQEBAQEBAQAAAAAAAAECAwQFBgcICQoL/8QAtREAAgECBAQDBAcFBAQAAQJ3AAECAxEEBSExBhJBUQdhcRMiMoEIFEKRobHBCSMzUvAVYnLRChYkNOEl8RcYGRomJygpKjU2Nzg5OkNERUZHSElKU1RVVldYWVpjZGVmZ2hpanN0dXZ3eHl6goOEhYaHiImKkpOUlZaXmJmaoqOkpaanqKmqsrO0tba3uLm6wsPExcbHyMnK0tPU1dbX2Nna4uPk5ebn6Onq8vP09fb3+Pn6/9oADAMBAAIRAxEAPwD5zFvsbcRhs8gVajVW2/P5THuRkfjTmTzmZ8tI3Vio/M0i26bW+Y+oA/rX7P6n5Y430RLNDLGsathk9unJ6g1RmjKKApBYkgKT+tWhNJb5IOAB+lRy3ttse5vAY8D7ykAfj707Myd46FZVaOHbnGDkA98+lQtct9oRYwJ5DgbR0z71nx3eqeLzLDosSw2MbfvdSucrDH7A/wAR9hXb6L4Vg0fTY5HvSIYwWk1LUMKGJ/uqPocDk/yrD20b+X9f1odPsZWu9PL+tjMbw/HApfUZSZm+7Cp+4D3A/wAa3obaPT7GNNRb7Jpgyy2cOBNP/tEfXufwrHbxNp8JlTTWZ7jcSL65UH8l/h+pz+FUbWxvr3fcSNu3MSZGbIbn1r57NswxGFjy06bV/tNHvZbg6WJfNKa06L9TRuPERnZ7XS7c2Nm3HlA5d/8Aebv/ACrsvAXiLV/DLERXX+inmSynG6M/h2+orntKjsYZlSZVSdlGNx6Huc1Prmq2mjKC1ykhP3IUPzflX57KrUqT55u7Ps4whTjywVkfRHhvxKdc05p4I3RFOx4ZTlc4/hb/ABp1y0UjMYdySD70TDB/+v8AhWH+z/dS6t4Ja8lXHm3LhQeu0YHNd7qnhKHUF3Qt5EvUf3c/0/CtFUvpI2SRy8N5jqcVcjuQyleCG6g8g/UVmalZ3mkTeXeQs6n7sqjn/wCv/OoBeCNd6NvQ9x2/wpyNVHsO1DQZI7g3mkzG1ue8ZPyv7f8A1jXHfETXb7XPC9xpQtEg1bzEJSQ7Y3UHnGe/t+td1b3nmUusafpt9Yk6mI/JQZDudpX6GuOVSMXqbxouSPAWt47W1i+1weXLFbiPfNwd+SSMfiKy7HxFJp8x8u0S7Ehx8wyw/wB0ete3f8IF4e8baODZyXEscbGNJmQ/J7o5GGX25H0rY8LfD3QPCCo0Sfab3HM8vzP+A7fhXjY7OsNg/cT5pdkejhMlr4l8z92Pd/5HNeDfCbahHDeXcElpE43bWUCTp6HpW7ongXQ/Cuq3eoadYxxajdStLLdNlpmJJPLHsM9BgcVv6xrdnotrJcX9zFZW8Yy7SsBge+eB+NcZY/E7T/Fmn37eE9Qs7u4XKjcxYhgMDd0O04zketfGV8zxuKTd+WHl+rPr8Pl+EwskrXl5/wCR094rJkSnYeuDy35f414h8Yfj9D8MboWCaHeXOoucRvKu2L2+bv8AQCr3w1n+ITa1eT+LFsX015dyLGdrgg/wkD7uPXJ+ldhrHgDTvEM16Zz9ptrl/NW3uPmWF/8AYPUV04PLFUk5u00raJvW/n5dTPGZg4RUVeDfVpaW8vM+b5PCXxM+PTxz6tdyaHorNu+zplFYHoNmck/7xr13wr8CLPwrZxJFGLq6RMiS45PTkgAV6PpMkWnXUVpKnkOi4Xd0Ix2NbPnZvo9iF+Dk44H419VHL/aRUartH+WOi/zZ8y8wVOfNTjd9XLV/8A8XuPBPjfT9UXV9M1RJFjJC2rRgwY9Cv9c5rU1jU7zxNp62OvaPFahH3OIX3ByBjjIyv4V7JDHtYsdvzcMPWtOw+Hena7btg8sSfm6iu+ip4NpUXy22sTKpQxt3WV2++p8heIPBt5odjcT2D/atGVg5jkCmWIkEZIx09x7ZrzpdSuNF/d3Tm5sz8sd5k5j/ANlx+XPtX29r/wAHZtNmzBGzRNw2BlSD2/GvNPiD+y/etp8+s+G4fMjRS91prAk7QOTGMc/T8q/Tcp4gjiOWji5cs1tLo/Jn5rm/Droc1bBrmg949V5o+f7jbdQiRCDxkkHI+tanhy3/AHxkDlXjAYMh4Hqawv7Pn8PyyTWkLXNhG2Z7B/vxckEr3x7Vp6LqcEIju7SXMbH7y8bT6HPf2r72FTmfLPR/1sfndSm6dpw1X9bj9WuZ7y68qNG2jpgYz71VK7nbYPMbG5tvsOTXqGmro2qaX5EphinZcqRwM+g9D7V51r+nnS7qSNJBNDk/MPXng1pCSbaXQzmnpJ63KELbJVkRxHweW9u3HrW9oeuvo9/Fc2Me6HcDJBJ8wB7qfUGufjAYjI6ck4zn0rpLCzTS4XvZoTDHNzDCxJOw/Xr9acktn1Cmm3dPY7nT7y00eSPWktxc2MsTx3dnECCgbjcp7dvpis6+0dfDFxZXqXB1Lw5Odllf5z5ZP/LKX0I7Gp/Cvmw2bSbi0cgZdvcoR0P8qg03Vh4TuLi0urYX/hy/Hlz2r9F9x6EdQa8ycbtxT1Po6EpQiqjXumvZ+ILjw/q1tcxXDW5TgOn8a9djex969/8ACfjrSfHfh2SNY2K8pJbyHJTORgn0PY18x+JrBfD7Wlot8b7QrxGfTrsnLJtOTFJ6MCag8E+KtR8H6qJrRlZ5P3ZRlDbkyCR+PFcf1f20P7yOutivZ1E1s9zs/iV4Dl8K6tdBY2l052/iHC56An09K5G8+EUviXwfrWqWd1amHTWiZLPcTNHE6Lufpyoc4PPGRX0fqutQeOvCtqnlxzwGIK6MctC2M7Ccfr0OB3FeR3MN74D1f7RauTbsPLyV3Kw2gFSD1OOfyNdlGrLEU+SfxL8TzK1GOHqe1h8L+9HlHwt+IN/4F8RR21xEZ1B8uWBiR5qZ6Z9RnIPsK+mpmi03y72wV7rSrxfMVGBXY3ow6gjuPavG/jJ4D8OX0Oj3Hhm4LXtxbB9uCFEyZDxBjjJ6MOB1xWj8C/iJZz2LaDqzSRXSMQ/mOcEdAVGODnrXDiKUa1P2dRNp6ef/AA66HXh6jo1OeEv8r/5M9L0jVL+/1RVt7ZmtWO1/JTaq++7v+ddZdeFF1K1eAO0bHGGjGSPWn+H7o6PeHT71VkiY5tp85DD0/wA+tdZJcnZ8qgV+ZYzCywlVwlt0fc+/w9dYiHMvmcrYeAbCxZZHiEkq/wDLSY7zn1x0reWGFDlgZD/tU5iW5Jpu3iuA6yT7TsXAG0e1FVZJAo5NFTcdj4ziuhCrDaN+c/N/L3rYkhit5lRhBIZo1kR1mDFB3BC8D6Gm2dvaCGbcGVIT5jRu4VgOhAB6546frWA2uWC3y20k0durH92hYF2x6t2zk4r9p+K8uh+Tq8bR3bNq4aG7j8iCBpL5WO91kHlY/Dr+FZ03w8W/1GGTUZ31HuunQNiMehdgc8enGK3LWa0063aN7mG0bYG8oDdNIp/iA7D3JHXvWJq+qXE0csFt8lg2N0at87+u5u+fQcURpOvB8iuhyqRozUp7nrN58KZ/Cmj6VNrdv9s1rUcRaL4VsCA85IGC237kYHJavS/h58MU0/Vo/Anjm7sfFWn6tYvdwqqIqWF/EwE1vEy4ZcRyRsMnPyMa4zwf+0ZoGm/Ey/8AFU+kfa5r+KK2SG6uAk+nwoqr5duzYjZCQWIJRsnvXqfiLxn4c17wiPFmhz28Wt+G9ZGu3VjGWjuDBkxzb43AYboGJOARlRgnFfhudYzNvbqGKTh2tok+lrdu/U/T8toZe6fNQtK+/W55n8UP2I7qx86/8F332qIAsNMvDiQeySdD9Gx9a+cr2DWvAmpNYatZXOmXkbYaG6jK/iARyPccHtX6rSfZ721ililVklQSxvkcjGQw/OvPfGXhnw78SIX03WLDT9atA+zeH/eQN7MOVPXuOnet8v4zxFFewzGPtId+v+TOfF8OUaj9rg3yS/D/AIB+d2oa9NqkO6ERxyLycdD9PQ1jQ6Tf3zCS53Wsbnqxy7V6j+0V8DLf4P3iXemanJcaddXBjjt5h+8i+XcPm/iHUdOwryeHXJLfKpJuGejA88Dtn+VfXvA4PM6CxeXysn0/rY8OONxGCq/V8artH258C9Jg034Z6LHbgiN0aTLHJOXPNekww5xXzp8GP2kPDUOl6d4e1pP7Gkto1hiuSxeGTHqcZU/Xj3r6Z0kw6lbJc2s0c9sy7hPG4KEeu7pivlsRRnhb+2Vj6ijWhif4Wpm6lZx3CiKWNZEI5VhkVxGs+BP3jT6c+1u8TH+R/wAa6/xZ4o07w7qOmwuftwm+ebyXAEcfPOefm9j9elcJ4m+JgZ5V0yDyY8na0rBmA/Kvna+b4WlF2ld9kfQ4fK8VUa0svMxZobqzaWOCPyblDhjOCsQPv/8AWqjDpuntOs+s3T67dqcrGw226H/ZjHX/AIFmuc1TxGF33eraksEPUtI+M/T1rkbz4yL5ps/C+ntdztwLqZSefUL/AI4r46tjMVjG1B2j5fqz7CjhcPhbc6u/66HuOqeLo9J0x7m+mh06xiQsS5CAKPauG8HfHLwt461qXSNI1BRc79gWRfLaYeqE9f8APFcn4f8AhP4l+It/HceIdRaJJDxEzfmAOg/AZrtx8K9K+H/i7w1aWelxW7u09y8+0MZgseAd3f5mFduW5L9Zeqb89l/m/kcmPzP6utGl5bv/AIBx/wARv2db34vXcFyl1qmnXFtIRJaGRpIGjDYz6KTzg1Qs9D074X3j6No2gPp94n+su71SZZPfnqD9SK+ldI1650eYvBJgN96NuVb61f1jTtB+IFqIrq3jhvOdqtgEH/Ybt9P0r7Snk1KMeSTbitl0/wCD87nydTNKjk5RSUnu1v8A8D5HyyfFep6bfNNNM14jH5o3/wDZfSu60HxNHf26SoHiLdY5RtYVu6v8M4vD0kkixiREG4vIMso9f/riuH1S+tFkIgDO/Z14ArodNU/dSsefzOT5pO7Z3ZWDWIRHMoYdj0IPqDTvt1zouPPja6twP9dGPmX/AHh/WuT8Oa+8MipeKUXtKOn4+ld9HIJIwQQysM5BzSC5lza5eXw/0NVjiP8AHnJrofAmtXOg6kZJ5DLDLxKhOc+hHvWJNpXlyGa0Ijc8mP8AhP8AhVizuFkbY48uUdUapa7ji+XVHuK69YX8G1JFcuAAo5P5VpaYw0sPcTpiMrkgDO0eteK2l00DKQSMHIZTyK9Z8C+JhrkL2N0qSTFdpkP8a4xyKj2cpP3TsjXio2keUftDfs3x+Kbc+ItBjistRwZJFjACXGe5wOG96+INS8NXHhvWrmSaB7Vy3lTWrcRyHPDEdj7iv1oj0uKx0uOAu8ltCPlVmyAB/SvmD4y678O/jz8KfGureHovteseE41YT+WYTw2eGx8yEBsfSvvcozSpQUaGKfNFbPqv+AfFZtl1PEOVbDLlm9+z/wCCfHVres8hhExi7IzdQM5AP09am1a4u1dUu4Q2AQGKD5ge5I6+xrmLLULe+KbJgoJ5Zuq/WujXUrVIrfSr7ykZiJVuUYklSPu8cH6DkV+kwrU5pSi7pn5lKhUhJpppkmk6fFJI00uRaRHMmep9F+taUN2fEV8sQZirFUjRhny1HGB7CsvUtSSaBbO0XEEZ4PJMh45NdD4D0m4trr7fcRbE24j3dye+KuTsnJmlGm6k1CO3U7hYRpNgIlIG0Bcd6y9RSK4hYSLvRlyVUjH4+hrTnl81cM2QD83Gfx96xLxWKySlgEYhQueT17fh/KvEb5p3Pu4U1TpcrWjKtvcjQr17HUIheaXd4YbjtZN3RlPYjPX29DUWuaIui6taiBxdWk6+ZbzsSob1B5+Ugnnn9DU8kiXarBKVLp91mPYfw1paBcRC5gur23+1WMUpeSJW5G7ALDOcjB/QV3qTtfqeBKioy9m9n+B0/gHxHJoMcdwgaW3ORLbtjbID95c/hkeh6V2fiuxtde0lLy0f7XYXTgpLjBjYDmN8dGHr3rz/AFK3l0KR4Jp/tek3hzZXyKBkkg+U+PusOMZ6/wA9z4f+Kjo99JYXCfabO4yJbVjjzB0A/wBlh1B9q4W3F+1jujr5VJezkZ1/4XFpbx2d580DEtFNH1B4wwPZhXGeOfB7XUyX+jqI9fsE8+YKwzdwj/lqB69iMV9Fap4bS3htzuM+nTN5lrdbP4uhDDsw7j8asfC/VvDPgfxbCniHRIdQtpoXspJJUG5I5CM4J7HAP4VVTEe0pOUVzNGMMN7KpyvRM86+E/xS0/xtotvpN/EsF1bsqQFnwUc5+T1wcZB9eO4r13T9QZlkguVMcsR2jP8AEOxrwn9oL4O33wf8aReJ9HtFk0W7Auvs8TceSWOM/UD04Neq+EfFGnePPDNrqNjc+ZcRr86AgybeB8w9QeM/j6142OwtLHUFbrs+z/rc9PCVqmErOMv+HR08l8q8Dmq0l4zd8CsDW7zUbVgsarGMfexn+dVbL7TeKJXkY/3gT+tfmFZTpTdOSs0fc03GcVOOzNS81qzt3xJNk+ijNFULvQlustn5qK5ryNbHzI+oEQmGYLPG3B3jofrWDr3hGwvbcSw7opXwyo3K49M+taX+puDuTJUf6tznnHtioheMM7WPzdQeQa/c7KSs1ofj7dnzdR+k6JpdhCv2KC480qPPaaXfIfXZkDj261aFu8ZaWzJliGRuDYfOO6/jVee5MqqnlhRjBXtU0TrHDtCDZld4ccgj0bGVH6V00azoxUYLTsc9Wmq0nOT17mXMtveL5cke1/7y9aW31LUdFj+zu66lp+CvkzFiFB4IRgQ0eRwdpGe+aS8vI7e5YS2bNbH7sytl1+pA5/KmL8yh7aTz06fL94fhW1aGFxsPZ14JrzOelLEYWSnSlZ+R9TeB/wBpzSNej8P2IFrosmmWn2FdI1aVxDdcBQyXY+42ABiRdp9e9ez+GdUTVdVsoEt59MntInf7Decq0bAgFHClGXnqjkdOBmvzob7NcFhMNhHVl7fUV1XhX4ueMvAumy2mj6w1zpcwwbG4ZnSPHQqM5U/7pGe9flubcCwqJ1MtlZ9n+j/zPvcv4qnBqGNV/Nf5HrH7dOpbL3w1pxbMoR55cHPZVB/9Cr5Nab7x3Ee1dX8RviVrvxJvra612WOWa1jMUZSPaQpOcE9T+JrgriQhT/OvRy3CzyvA08LP4le/q2YYmpHH4mWIjs9i9JeiTDEjOMcVo2PxA8Q29rZ6GmvXlpokl5E8tutwyw/eAJZcgEYJyOlcg05qKaTzIyD8wIwQaMVy4mm6c9Tsw6eHmpx6H1FZ/F3Q/D/heIzatBemIFXuQ/BbPPqT6Y5Ncj4s+K2t6vosd14P+y6m0jbS2/JTJ7J6/X8q+ap9HaeTax+T19PpXq3wt+IY+HWoWc1to2nXUEQHmwXEZImOMFmOfvfoPSvzb/VeXPzR95367H3/APrHFQtP3Vbpv/keqfDz4C+MfiTNFqGvTTvGcbmkbCL9D0/ACuu8caPH8K9UGiaV5cTLErSXCJhyTnv1r2j4W/tG+EfiJHBaJMui6oRtFjdEKD/uN0P04PtXjPxyuIpvipqn2kMI18tIyfuHCL/XNN5VChL9/G77Pb7jF5tKtH9w7Lv1+bKXg74ma14dkMMJbU7Vm3Na3BLL15Ib+E+4r2Twv4yt/FPi2xvJImdLexki+y3TKxVndchW/iOF+vFeJ6fCXgzCg2AdExg1ow3H2GzjkZWUzSk4zgjaMcf99V7VCo4p9kjyqiu15n0pc6PDeK0umy5OebeQ4YfQn+R5+tYMzvC7I4KOp5Vhgg1574d+IV3a+WsztexKMB84mT2z3Hsa7628WWXiC2HnsJgox5yfLJH7Ef8A6x9K6oVIzCxfXxI0kIt77NxEOkn/AC0X8e9cX4l8O2KyG8gVfKc/66JeM/7S9jWlqULW6743E0PXcvb6isZtWa3YlW68MOoI9CO9VKmpIjWLMRrUxr0VkYduVP0qzpuoXOltiJjJD3hY/wAvSpl+yTuTA62szdYZD+6c+3p+P506bSp9x2QsJB/yxPX/AICe/wDOvOnTcTVSR0Njq0GoLmNsOOsZ4Iq5JHHcABxgjow6ivPmnKyBlZo5F6MvBFbemeLAu2G+IU9BMOh+vpWXKy1I6aO6ksyFm+eI8CQf1rf8O6udL1S1ulkKxq4LFf7veueinV0BBV0YfUGkVGt2LW5yveInj8KhXi7ltXPrrTfIvbNR8ssMqA5PRlYfy5r5j/bI0PQPg58AtYtPDOlW+jrrl9b2tytigVmXufphcfifWvYfgh4gbX/D13aly1zY/L5bcHaR8ufxBH4V4Ja3Ev7aX7PGu+HNTZbDxlol+yJOpwomjZtjH0DDKH869anK9mjjaex8FeTJp+ly3K2we23qsjeWC69+vb6d609Ns01C3V5WFxpEn3bqPOIG9T1aMg9zx716TD4UXR/gb4htNV3xeJP7RWGa3lTDQtAfmRvciQMPZTXkvhHWLjwnrC3MIJtpTiaHsR3OPX9D3r2KOKq4dpxfyPPrYWlX+NfM7PS7ibw3dhdVj+0acrBU1CNAVOeiv7n1rqG1yS+vIht8uBPuIp6jAwc96dq1na6X4ft9WghOoeErz5bm2HP2Vj3QdlyR8vY9DyDWCuh3Ok3Mc2iyDUtCmAaP5gZojjkAnGV6/TGDzX2WCx8MQuV/8N/wPyPlsTgqmGd4bb+v/B/M9Ht2N5bptPK9PSsnU3+xRmU4352jGcqe5qfw3dedCqO4MhBwM88Hv6GtG6s4b7fbziNI8ZMg4J+pq1P2dRxkety+2oqpD5nHx4mjfJ2N5uRJt9j0+vpXY6XGy2seowxJGY/3cqsBhsjG4jnOeayUstPtZPLkMt7cKd37tcKB05yOnPWtKw1c5KpEqwt8pX7zY79+tdkpXWh5Dp8stTc00Qos9te+TJo15/rIZD9w88r6EGs9tBu/CslvGssd9Lcl/KndT8yjgZOfveo4pL5ZVhaGaJVTaCr7TuJ6g1e8M6zbaos2l38btICCsjN824Hr/nqCRWMpO3N0N4RUnytanceDfGl3pUn9m68y3Fhcj7iEAqezr6MP16Gur8SeExcWZUOJFYF7e6A4b0/D1HY1xcekx6X4ihhuFVrO7wLW6X50lO3JQkjhu4r1rRby0gsfsV9uNoTt+Y7njP8AeH9R3FeNUxKoVFbqen9T+sUm10PHzeXGqSHS9XZ5by2RokjuHZ0lhOS0eM9Dj+o5Fed/2fqPwp8QjWdIupoNFnkVp7fB+TBywZejFcgMMcg55Fe/+N/h019MrxSL5g+a3uEYbT3HI6j09K6f4HeCvCHxBi8Q6F4jilg8VXaKkEs77ov3e7G1CMK/Jz6j2yK9OpiacKXtoq66pfmeDHDzlP2M36MS2tdP8XaCmp6e8b2sw3jAxtbv+HcVyFxayabckYwAcEVymnW+t/s9fEC60HUN02ltJ5ccchIQg87F9FPJU44IIPQ169qukW+vaQL+ylEwkXzIsDBZSOR7EHtXyWa4GOIj7Wk7tfkfSYHEyoy9lV0OSjlxyOVPT29qKyP7TSxmaKfhPftRXw/Kz6W6Pl2FR1z5T45J5H/1qht2W6/exSJIqnHykHp61pJe2MluZJpXeQ8ojcSKPTOOfxrHljsryXcrtDNn+M7G/Bhwfxr9Qw+cYfEaX5X5/wCex+e1srrUbu115FxWDNjqe2T/ADqWKOGS3kEkuwpjC4JLZ9O361Sktb+3ba2y5jxxvwrev3hwf0+tTWsMl1AZoopI0zgo4+YEfz+te5GalseRKDQuxdvqp7elRPo8RxIrGKYg/MvFTrHIhBKnbUj9hv8Am7jt9a25jn5bMzZIGXJuYRcpjHmR8OBVUaUki5sZjIc8xyYVlH9f0raYFc9vYUyWCN1BIAdTkOvDD8a1hUcdUyZQUtGclqVmxYpcRFX9cYNc5faJOyloFMi/3e9elTSzcebGt3EO2MN+FVri2ikQm3YIc4MMnysD+NY4mnSxEfeWpthatTDy0enY8g+yyLIQ6lCDyGFTfZ028cV2ur2KyMUuYSG7Fhz+Brn7rRXjy0Lbx/dbg18xUw/s3bc+phW9ormG1uVYkehqNSY8AjFX2UoxV1Ib0NQsgauWULbG/M3uSWt28LBkYgjkYPNd9ofxIudoh1Mm/h4BaQ5cfj3/ABrzny9pyKkjmMbc1LUZrkqq6ItKL56bsz37SL2G5iFxol4HOMtaynDCu01i8txb6XZ3o8qeS3W4APGN2B1+qGvnHw9czyX1vFbuyyySKi7TzknFey/FLxRb2vjq+0+SHzrG1CwQyLw6qBwff1rgq5Q5Rf1R3v07WOilmajpiVa3U2mtJrQ+bC3mJ2K9RV/T9cKuCXaORekiHBH1ritL8QSQoJLSf7Zb91/jX6itj7daamoYt5Ep6OK+XlTnTlyzVmj34zjUXNF3R6Bb+KZo1y7bgf8AlpH0P1H+FQ3WpC4+eMZz2U9fpXALqk+nSHc26Mf8tFPH4ir9jrAusSwMmO4U5Vj6V0QrSWjNbrqdJ5hmzg89we31ra0PxJc6YVhmQXdn0ML9QP8AZPb6dKx/Dcq60rF7aS3kTjbJwG/3T/jXSpoBdSYTuZfvRkYYfhXTzKSDk6o6K50HT/F1qbqxkJmVRlW4lT6jPzf55PSuM1TwjfQq8Y2ox4WRU3An8Rx9K1LMyWE6vEzwzKeGU4IrrLHxDb6knlaiojmPy/aEUYb/AHh/n8KxlFC5ZI4Pw3Z33h7IkvpLtG6xy4Cr/ugDiurtNRivM7Gww6qeoqTWPDht/wB5FgxtyGU5Vs+h/wAfzNc7NZus3yBhIp/hzkVyzj3Ki+x7l8B9YWx8bC3breQtGPcj5gPyBrwD4XeMLn4E/tkeNNAdQNG1rU3WSNhgDzG3I4/FvyNdr4G8QXOkeKtIup0MYhuY2Mm7PGRnPpxWd+3j8OLjwz8SdH8fWEZWC8jSKWVB92ZDkE/Vcfka6cPrFxImrnc/tefA2HVtB1vxjpS+VOIUmv7dekpj4WXH94IzqfUY9K+A7fQ2uFlRU3MrHoK/XrT5bf4hfCyzecB7bWNMAfHJG9MH+dfBln8GpPB2pX0l+PPSMvbSqo+4TkJJ9MgD8RXfCTaszFrmMz9nex+3aT4g0nUIvP02SPDxv/C+CAcehGQad4N+DFw39twaZKY40xParIcg9SMe5XcpHTcgrV+EEY0nUtRaT5FuoDEe3zAnBr0r4P6kdSsfEOmw4+32M4uoMjl493zJ+B5/E12YevKjLmhuc9WlGpHlnseCr4ZlXUna0b7LfQg70nHDkHoR9PTn61a0fWoPG2lzTQToXgBEsRIDKRx0+ten/EbSbex159yBFcCe3l7+W3IHvjkfhXmmveBYtUvjrGhTx6frKHlnbbFcqP4ZAPuk44b8/Wvfo5hTxz5ZaTRwyw9TBrmhrFlCSGbTwt3bedG/MbyjIUBgeD65GetaehRyu080MH2lmUHOTg+uff8A+vTNI1A+KZJdMvoX0vWbRVWWzmXaQ3q3qCOh6c1qWmjyWqzCTEBj4Jbdkkjgcewr2Pae7bqeeqcakrlGSZpLW6aZG84DCbSMLjtjH9RWVpc0kmqF2XymjUEe5z3/AAJrotPa3ENx59uZNwwjb+OOvbr0qz4d/s6SO58x2gct/qcMxkAwcHPQDFaylam9DnhD9+kmegWc1m2iGK9X7VpNwu6SGLGbeTP+sB64+nTg1Ha6rfrJNZTwSXMauotdRXBa4Q9DtB+8Oh9cA8ZrEtJprVme1BSLd91T0z2H5Vo6ei30d3ahw1s0byRCRxm2f1BON30rw+VTXLP5H0cl7OXtIdd0eqfDvxFbanZLpl83+jk4ikZT+6Pcn2PGfpn66PjDwWfD95HqGncXqjeArfNnOQQeh9vUVm+DdDOj2dm0uySGZdsdyoyGbklD6NgZHqAcZwcdXb6xDfXUGh6gBAN2LS6Y48tv7j57E9D2NcdPESp1XDoc+IwsalL2kDgfiRJL8WNMF7qc6Tl4lSUsuDayYCljjnyyVHTJBOeo55j4TeOrnwd4mfwn4lGIFLLDdyKEEwGPmPON65AbH3gQeeDXq+oaDLpl5JPFEodDtnhxgMO5x/n1qf4g/AvRviB8J7fU/DMUsGuaSMyRtK0swxkqylj1XOADwV+X0x6ftaMEoSXuvTToeN7OpO7T95fic/8AHb4Iz6lcQ61olzttbhFaaOFdwJPR1x2Pf3+tFWf2d/i++pWsnhDxF/o19YriMlDtRQM5z/cbqOODxRXzeKy9wqtSPXw+PjKmmfnTd61CsrqVZ5+uYjn8896W1u5rjCuwAXkJj+n+NTWNnFZSKbOMXMneSRctn2Hatqw8P/apAbljZ7ucEZzXyh7ejVmR22sTeWsMW5Ofuv8AOD+HatpVNrFbvcxiBppNqtE+5ehOSvbp7/Sov+EeTzmSDcCo4ZhuU1UOn6jpl3bG4V7i3iZnyx3AZGMeo/GvRw+OxGFf7uWnbocdbCUcR8cdTYVpVUL8s8Oc7h6f59azbqaOGZhsmSLG4SMm5fpkdPxAFb2maxb3F5IYcREoqhSevJzWlNZxXUZG3Yx6tGME9OtfT4fP4ytGurPujwa2TPV03fyORjUS8qyOrLkOGBH1B6UNHtbHf09K1b3waSry2zeS3Um3Oxm9yOjfj61Sg0+eHel5JyANriMqSO4YZ/lX02HxdPEK9OSfoeDWwk6PxKxX8stwBjHGKZNYpqKbZohIAMcjmr8dozI7o6sqDJ2nn8qIZjbyB1AB6118xyqGupiSaTe267IZEuocZ+z3XzD8G7dayLzTbaSTZsk0q4/553HKN9G7CvXbXxHpN5CVv7FRMwIZlAC89wAOD/nFZN9ptlcqy/aYbm3XhY5jz9BmuKVpO0kdsfd+CR45q2jzWvy3UHyno45U/QisG40tly0TZ/2Wr2U6FHZCWGLBibrBcHKZ/wBk9qwNS8L2lzLtjifTZz0BG6Nvp/8AWrCeHUvhOmniXH4jyiRWjYh1Kn3rV8I+EtZ8eeIrHQtB0+bU9VvJBHDbW67mYn+QHcngV2+h/CfxJ4x1ldJ0bRp9ZuWGQtqm8AepP8I9ziv06/ZA/ZW0j9nHQZtUuIU1XxxqEe2e7wNlqh58qJjzjOMt3I9K+cx1eGEWru+x9Dg6EsV71tD4I179lfxZ8FfFFpLqsQ1SfT5ILuSC0UhHwQ7IJG49s1w3j63v38RPfahaNYHUFE8du77mRcAAE9yABX64eLNGvtQt9WbVLC1u7doi6M0nIODlSCvIxjnPrXzP8UPgLp/jz4a6xYWlhHYeLNJZtTs48gs0RQsUDf3WUHHuo9DXnZRnFWni4xrfC9DszbJKdbCynh21KOtt0/1X4nwIJrixmEkLsjL/ABKcGtWz8YSFCkwVZTyJex+o/qKc+nmWAMBzg5FYd9p7KM4wPUV+i5llVPERu43PzrL8xnQlyqVj1HS7gahpwLOssMi4doW3BT/Ot3Q9F0/TYj9lUKrHLEHkn3rwaw1i80O58y3laM/7J/mK77w/8RoZmVbz/R5jwZUB2H6jt+FfnGIyupSu6Wq7dT72jmEJ2VTTz6Hvfh2QJENuAKi1r4naB4XM51G+EP2YjeQCWTOcdOnT6V5LrfxJlsLJobG5jjusB4XJyjMP4T7GvGfiN4yXxlKdWt90VzIn2a9ts9MHIJHfB7+wrx1zRdmeuu6PpTxr+014R0nQ7W7tpF1aeZwoWI+XIi9ywI//AF+1ebJ+17B/Z8Mg04/akmUSwhuHjwwbDeudpr5n/sa9vJkt7W1mupj0SFC7fkKmuvBuv6SFa60y7tUY4/fRFR+tU5a2NffeqR90eAf2oPDWvw3MRuhbJHy0NycKy+o9K9Es9cstesFvtGnS+tpF3eWpy6+49R7fyr80Dp81uyZRoX4Djpn3r0r4d/GDV/DNmLWKZnCsBAA5XZgfz7VLT2J31Z9jXd1qd1ISs6iFT1jGMezDqDX2lrfhOw+OvwMttOv9rvd2MbrNjJjlCgbh7hgf1r4P8M/EOy8VWiS3LGw1BVCm4jXIJwPvqPvD3Hr3r6//AGX/ABZcal4ZvdIbY01jJ5sLwvuilhbup9mByO2aujHld0ZybVrnn37OXjrVvAOuS/C7xc7RyWrMunXEpwGXPEf9RXpnjzwJaf2tqE7oCmpwrFI3ZWGcH8eOfapPjh8JoviBpY1PT1+y+IrA+bbzx/K5K8hSarfD7xsfiR4Elg1QeRrmnH7PdxsMEkcBwPwru80QfM91oK6PrV7CQUnhdl2++Tn/AB/GqvgHWm8JfES1nY4jud0cnOB82a9A+M2lvpurW+qhNhlPlXA9HXGCfqv8jXlOuRmTZdxHmN/MB9K0TBq57X8d/A82tfDnTdf0ZBLdWErwvEvDPCxLLj6Nnj/ar4muvi9PpOpFbWGWaeNtrxbDjIOCrZr768FEfEv4M6roXmN9ouLR442RsMsuCyEH/eUfnXyFZfs66nNr1vZatd2uk6hdAzLbyEzTFQeWITIAz3JFaxlhqL9tXqcv5nHU9vNKnSjf8i74f1qx+JY0zUzC2m61p8gMbbwJYUPVC3SSM8HBBx7Z57XxA9zqV1PLC32u7iIaSMHO/wB0I6jHbtW74L+CHgzw/qVrFea3JfanuwsKTrFlgMkBVO7p71teMPAN1od9PqOml5dLKfNBauUubfHAeNsH5gTnJH1zXfhc+wOIrKjGTT6N6X8jOWDxFGnzyS87HjmmRvcals/dxiUkLJM6rjn0yccfyrX0vw26X087SRzFXCcyjB9SOeevTjrU1/oUUn2RrqWMXszbbTUfLEVtqDn/AJZyLnFvcDupIV+qn1z7XT3i1SM+WyyRNtPykHI6g+4r7BVVUg7aNdDx/ZONVSPQl8Oy7SEt2nkUeb+6bO1QM9jVzwz4fu31JXhUeUh5RQDkEk4z/wDXrk4Guo7oeVLIoOM7G6+3WvoXwZo00GnQvKA07LlsAV8/jKnsYebPocLTdSeuyFtYZfD9usRiaXSWB8y3Jx5eSDkEc8HkHqpAxWTqlvB4jkvrYyTwLaSAR3DgBrhCoIZQD2+6fcZwM4HoUNmJFdZVDxPwUZQRiuQ1WazsdY/sSXdHJMpktLhf4Gz9zgdK83D1Pavla95F4in7G8ov3XuQ+A/H41zVBoWpM73Q/d2V5MpHnqOkT+jDnBPUceldffR3mhHzYZXhs5AYrgL0KHggiuA8TRz+HLmAXkMElvcIDDdxZALdSuQDhlOOOvQ9Dmu8+G3jaDxbCdD1l4n1bawQnkXMY4ye27HUdTg16cvdXPFe6eE462vqeOeOvBeqXWvR6r4TuHtdfijdhLapuE0BYKzEd/mKgg/xEMOrUV9A2F9P8HdWFybf7ZoF1uR42AbDdQM9ufz/AAoro+u4iOlKClHvocbw9GTvUbTPzD01bbySbeBo7gcb2zW3HAZ/La4bcy9MVnQsF+6MVow75GGBivza59lY0omEa/KMU6MlsgDOar7UhXdI4Wof7Y3N5dtGWb+8w4qea4WJLrw1Z3jrNIvkyJkiSM7fz9arDUrjS5vKRlvIugO3B/8Ar1bXSbu8USXLGRP7sLAkVp2cMFuwWBwj/wB2YcmgDGW+ub+Ta74To0SjBH4VtWMdlJCImeTI6eYdwH09KlvLWC4X/Sbbaf8Anov+NZ8mmzpzbTLcp/clPzfnWlOc6crwdmZyjGatJXJ7rw2uGmhO985DLzj+orF1DQ9Ws4lvBGXtpGKjz0wjHuFcDg/XNXY9Ue1k2yM9s/pJ0P0PSvr74J6bDqHwv01byCO4juS8jJIoZWyxHT8K+iw+d16elVcy/E8mpldKpdw0/I+JPOWJf9JiksiTw0w+Q/RulTGNoznbX2b4t/Zt8M+JI5HsVfSLlucx5eI+xQngfQivGfG37P3iPwrZIIbNdUtIhtSSzGSo916/zr6fDZph8RopWfZnh18vq0dbXXkeLGVhnn5eu00yObHykZHoeR+Va19pTWYPnwzRupw0ZjOV/r+lO0/S4L1l8uRZOcHbzg+n1r19DzVGV7H1b/wTpuLY6t43sFjU6hLbwXCSNySisylee2WU17v4l+J03gfxA2n+IdTjsmky0Uir8mPTI6H6j8a8T/YM8MvovxP1WWVWRn0lwOeo82M81798afhXpPiPzNb1SBpmgO3922GwTxj3r8vz1P605R8j9HyVx9ioVDzrxh4u1vU5kvNH8RQXunSKVZVKyR4I6nHP61xf7S2h6zqXwG/4S221C40zXtGtkeZrGVohc2ch2OjAHkDrg+/rXPXfgCBvEU1np8sVhfb1i8gkpKN3KlgD3B6960P22tfGi/C3w/4Q865M98uy7lhxkwx7SA3rliv5GuLKI1J4yDp73PTzd06eCkpvSx8X+GbWHVLc+U6ucfiOlTat4UKxl9vy89Bgj/6/SszQdEl0y8Vop1kjDZV1ypx716tptmuq2vkO+H77hnNfvVPEOUE5H4TLCxjJpfI8D1jw+8allGVrl5Ee3fByPevobxP4LFvYlhHub+8vQfjXkviLw6yM2F9vevOxmCjXTq0dzuw2Klh5KlW2OQlmlul8kB+ePlPB+or6Y/Zx/YY1L4g2cPijxazWGizf6m3ibE9yD0JyPlXn6n9a5H4P/Cm20e2j8XeJLU6nEys9hpe8or4ON8mOdvoAcn2r3GD9p7xXJPpVpYRWOm6dp0gCWNshClQMYYkknjvX5BmuKjKo4QWq3Z+vZVgJRpqc9nsjrte8G6P8KZBo/hrwhJaoFwJI1iiDe7Oxyx/M187/ABK1ya/ae11DSFUOMiVXWRfzHevoP4p+ID4msLvWlmiuNVvLcRKkm4xwR5ztQZxn1bGeO1eJaNLcPNFBqlp5wkUwvL95WB4yeOtfPpx3Wp9NyztyvQ+Z/FHh9LJi6vi3k4KtyF9x6V5tZzi2vGK7jtJIr6g+KnwzubHT7mGNSYVJMcmDXy/d2cljdSI3DK2DXp0Zcy3PAxlNwlseh+F/Gt1HbmNbuWNygjT0B7fpxX1L+yH8crz4e/F7R59U1KOLw7fIbO+jYthS4G1+uPlYLz6Zr4b0u5aGQg8g8dPTpX0F+zbqmha58RdN0rxDZx3tnMzIkcjlVVsZGcEZ54xXeq8KMZVKkbpLpueXKlOquSDsz9qtQs4rqPzIgAWGcjoRXkPijwOum6xNrmk4tL+T/XLj5Jcf3hXefDvxPp+r+HrNLKWOSO3jW3YRsGCsqjAz9Cp/EVb1i0N1buXGW57UqVRVIqcdmOScXys+c/iQ0PjDRL2BYfs97tHmQk8rMo+Qj/ZOCM1862s32m3nt3GGKkEHqD0xX1V8QvDPl3CX8a7WX93LgdYyRn8QcMPce9fN/jTRm0vxNcTxrhLh2Z1HO2TPzj8+fxrqWw0dl8AvGH9gKbeWTG+42qD7AY/nVLXtYGi/Er4l6bIGXxRcWrXujyt0mtDCGjSPjqrE5Hcj2NebWNxPp+v23l7tpmVhj619B/tL6/4N+H0ng3UvENhNNrh0rFjcWtuHmiI+UlWYhQRx1rzswoyr0eSnByl5b/8ADdzSjONGfNOVl5nzL8NdS8N3fjf4UyaKjyasEuBq9wyuC05iJKuxHzNnceOgIr63ubey8uW8l03+0rhVAEPDFvQAMdo/SviGH4yXema9bapCbnXruzEi2c2tFEEHmfeby4gMsRxksaZrnx48deJGZH1yWyhb/ljYKIR+Y+Y/nXnS4azHF1IytyLzfnf+tiXnGEoRaT5n5H1v4i8MxyeHru81azsdPgnTZNptzMgt5FLcKQAOVzkNu4IyMVxWjfDjULGe6Y6iupaVtD2Bucm7VMfddwNsgHOG6kCvlySPVNSZZLy6ubhm5Z7uUnBye7H/ADmvS/h/8VL7wfp7aXJINXss5htF3MY2/wBk46f7PSv0vA5ZisLhVCpVU2vlp6t6/M+XnmdKpiFJ0+VHuHhbQV1DxLEhjZkU+Yd3Py54r3XT4TDtCjGBXzn8KfF/jXUfHDXdxoMknh9lxK/kGHyV67kJHzY44PJx1r6X068tbuzjurV4p4JBlZEO4HH9a8jMVUjUSk/uPp8DUp1KbcYtepneK/Edv4b0WW7lKq6qdox1NfL3inxfea1qQvLiZo5PMyrBvlUfTGf1rvvjH401SHxKYLW4SOzij+6UUgkj3Feaahd3mrri4eMu65DHAJ6ccfWvosrwapU1UktZHzeaYt1JulHZHq3h34hnxR4TudCuvJnuGQpAsy58xgvysDnIkXOevOcdyDwa3GvaDqkcImaKRSsq3ESYO4dCD68VzGnJJp+oxTQXK5XgSAkAEn+eK9i0m40jx1abL4vJMF8u48hwHOOkynAGQe3f867KlJYd3SvFnHSq+2Vpbo+mfhL4qg+IfhlNO1y1jbVI0VpoXUYmAP3wPyz/APXor5k8Mpq/w58ZJGLnfA0TPb3ER+R4yDyP5Edjx9SvmK+Ekp3py0Z7NNpx95HyhutdPXdNIpbsuefyqH+3J7olLWB0X/noy5FTWmh2yvvkXzn/AL0hya14bNYxiJjH/s9q+JPbM210trjEk8n2pu4jfkVu2rRQLsjIj/6Zyr/WqzWRU7jHk/3ozg0vmMPl3iQf3Zhz+dNIk0souGKNCf78ZyKV5mkXDCO6T8mrM84wj/lpb/T5lqtPqQUZZQwzgTR5H6VdhGut4IvlimaD/pnMOKrXF7GhJmTy3/56RNxVZI57qVVYedFj7x4Iq7aaOI0ZZX3qxyV68elMkoTXU8yrGU+0xScA7QSK+4/hTp40z4e+HrZV2hLNDjGOoz/Wvj21ght5EWNAAMAcV9v+G7b7Lo2nw9PLgRfyUUFI2Ylpl90QfjU0YqC+b94g9jQNHKeJvAGh+L7d49SsI5GPSZflcH1yK8R8bfswS7vP0KZZwvO12Mcw9gw4PTvivpH+Gqmo6ha6TZyXd9cxWdrHjfNO4RFycDJPua9HD5hiMNpCWnZ7HLVwlKv8UdTz79h/RdW8P/F7VbPU7a7ikGlyEvdKQSPMjx2wfqK+mvjhrU2i+Hgbd9pkdVbntmrvwv0NdJ0j+1ZNrS3iK0bDtEcEc+/X8q80/aG8QW9xDHai4Pmg5CKenua4syxf1qXtGrM78vw3spKCd7Hg3xY0SHTfHfh/4n6dstnW0ay1GKIAGYqwMZJ/vYJGfQV5B8dPiNH8Sda0y8TcZIrcpKnOEcsSQPYDHPtXa/FDxf8AavCsvh+zuVnuXkSbA+bYBng88k5/SvBpmEKoXYxTKcvk5Bz6V9Hw9g7z+ty9EcPEGNSprCQXq/0KwtYpshosnjcyj5h6kVp6Rq2p6QRsliuIF/5Yz4zj0B/HtWaLpY2YhyWORk88Ukl8zN5vl4TIwQmBX6CpPqfn1ken6H4t0PXoWtZ5jp11tyIbsfu2bI4D/Q55/OqWvfDKPXr6K2s7Vo7y8dY4I1UlZGYgAD8fSvOWmjmyCm8HAG49D9fzr2X9lvXruz8fPLcXzS6fpmn3WotDN8yxsqYVgT0OSDkc1lXxTwlGdZP4U2VRwscXWhQa+JpHHfHTwTqHhW8s/DFprype6TbWyiTTGx5EojxKjdn5xwfeua02Ge41lL2ZVSPy1V8Yy7gfM2O2T2rW8TQnXNQvb9b2eC8nmaXdnIJLE9D1696g0mK5kjMNz5bydpI025+oz1r8JrVPazlN7ttn7zTpqnGMI7JJfcda2pI1nhT2wK6X4Z2MetM9q0IlDPk5Ga87t4ZfOMZB2ivYvgPamLUJiRjng/jXPFe9Y6pP3b2KXx4+H89v4HE0MBYR5DFR82K+A/F3g64juJpBCVIySTX7M2tgmtXVrZXFv9ogkbMisvG3PevCP2lvBejal4lmsz4d0vTNDjh2rqJcQvvGNwwAcnJAxjJ7V6dNxoxuzxK0JYqSilqfkwqGG7KuDwcmt/whqN1pfibT7qykMVzHcK0bAdDkeldl8cfg/d/DTVdPvftMWo6LqjSG2u4VZBuQjfGynkMNyn3DCtv9lf4Ov8ZP2gPCvhwRu1g919pvWBxtt4/nck9sgbfqwrvjarD3dmeJUpzoVHCas0frV8NfBNl8H/hHFcy3czQRqdRlV1VSqsMsoAxgbiWHpnHQCu28LeLrPxpoUOpae7NBIWVTIMHIOCp9+n4Gm/FjwjN4v8H6hpVpK1vESiGOIY3xqclB6Dp+VY3wxis/C+j/ANiNbC2tQfl9Q3rmt6NNUqSiuhzylzNyZZ8QaSmpRyoEw+PmjPWvmD4uaHJo+sqZIiisQNxHG4D5T7ZXj6qa+ufE0aaPpcuoTyL9ngXd54P8PvXx78XvHrfEDxM0VsoS1SHy4/V2U7gT7nBA+tbxYRucxHocN9qWmGEBnadCF9s17R+3V8PIfFHwA0TxFApl1bSbqOK3RBkzpL8roAOpyFP/AAE1ynwn+H95qfh/XNXZSZbW1Y2uR/Ee/wDOvT7U6x448A+GmmjY22mo0FwhGcS7vlcj3U4z9a7KEnTqxnfYxrU/axcH1Pz08NfA7x34kKyRaFcQW55825Tyl/Xmu7h/Z51bR7XztTvhHjrFZrz7DNfc+n6Tbx2bQvywXI/CvOfEJC6tPbkRiN0+UAg9Ox5716kczqVKlrWREMqoQhfVs8E8G/CHR4mEupWLTsg+9O7FXOMjoa9N8L+EbCLWorGxt7ezZhvdYogCFyOM/lVzQPCWpeJLibTdNsXu5UYsTvC+WuTyecYrVi8P3Hw18QRL4il2zJD5kMdpHvZ1JI5c4GBg8c0q+Op63mr9rmtPDciSUfwPWrezjt7MRDAj24wB+dcndaHc+FVmuNHdVtWzJcWsxO0j1H9047j8Qa5+6+MLw6hHFBo7ta5+eWWf5iPYAYH5mu2sdct9Vt1urRwVYDjPII9Qehr5hY6NJtN3T6Hq+yVX4d1sfO3xIabUNWhukJe2Kn5tvIPdSf8APSuHuJHZWaMh4o8K25OjZHX05Neh+O/hvq+k/EO58XS69cXuk3UwH9lSBmt4VwMhlyeCRnIAxXNeINNu7fVHuYba1S2nIkEagL5fOQOc8ZyA3Q49uP0nLsVGtRi1s9tfwfmfAZhh5wqyvv1/z9DnrfymYCWfy1ZsEbQSAfbvXaaPfQ6TLbrb3LPsAKMG27GHP071x32KX7QqtPCI3PzMrAgda1LF3ivHs4wEcqytuPBHbjH0r16sFNHlYefLLU9dtZBrgaa1ihaSKII6q+GiyQcq39wk4+vHpRXNWdjqPg1rS6guTFdSISfJO9CpA68nn29qK8GVK792z+8+gi7L/hj5sht7i3/497pnX+5N8w/PrV2HVp7fH2m1YD+/D8w/LrWLdW2oWK7jbygA5ytWLC4viQWAePH/AC0HNflZ9NzHSWupW15gRSqzf3ejflViQK33lDfUc1hyJbXGPOhBYfxDt+NPjjkTP2W7Yj+5L84/xFIrctzW6zSBFZlU5JGcin2FpDbxhUQY9xxWb9rureRnmt9y7du6E5H5das2urWawqWuV3dNqjn8qq4jaVwAOQKPtAGcc1i319cQ+UIItxlTeGc8AZx0qmsd5fKHlujGDzsjGBSuCidXpE6XWtWFr5i7priOPb1PLAV96WsYUAegxXwd8K9FWb4haBEYg5N5GdwPPBzn9K+9YRVoCzGKqX3+uxnoKuxrmnQ6LLfzNPLJHZ2S8PdXDBUXA55PWqs3ohFCzs5b6ZIYhl2P4D3NS+NIfCMvwv1HUZray8W6bpdzHcXsORLG5hlBlTjqyDLAf3lFefap+0F4cbVrjwx4H06++IOqOrROmkjahP3TumOAqjPVc1534v8AAfjHUltdB1zUNO8JeG40Jh8NaGzeUjffKzN/G+c5J4zXbTp2Wu5Dbb0Pa/iN+13pvh7QkudHmg1i3uAPKVTsdVI47dvQivk3xh+0GNW8+5nMyTPyS3zAe2a838bX1pa6lNbWTM1rCdis3VsVk6XY+dCZZhuMh+6fSsK1Gn8TOujWlTi7DtQ8V3lxdrJHC175z5ZlYAp78mre3UL24R5GjktSPmWVcyfg+cj8c07+zYpOq4I6MvBFPCXNmuIpVmT+7JwfzpUa86D5qbscVSnGsv3iuPl0eBv9UGK8ny2IDA47HofxrLuBcW8jIInMfZepB+n+FXTrkUZ2yo0L9MScD8DWPL40tZL5LS3vIppnJAhQ7ucEn2HGa+hw+fVI6VlfzPHq5VCS/duxPcRmGdkcbWUkHH+Irt/hVey2/wDbdvD8n9oW62sk2eRHvDMo+pVfwFeU2fjiPVroRw6bfk9BKq7l/LsPx/CvTvh/p93L/aaRndN5QuYcLjIX7y8d8HP4GuvMswp4rAVFRettuo8qwcqGPpuqtD1eb4faZNoySRTfvsdG6k1wl54XvdLlYhflPT1q3p3jC9WNVm3KmeCc10B1yW8hVWRZAf4q/LPaNH61FJnM2pMJy8fzdDXs3wHtVvtY8vgCvK9RtFFuZFHzdcVvfBf4jQ+HfESpMw+ZsHNb0WnJMzr3UGkfWvj7xVefC3Sba/0vwvd+Iru4cwxLbj5ImxkNIQCQK+Zdc+Fnjv4keJNM8Ta4832NrmRprF4FijgjY5L7c5cYLZYjjA55r7I8IeNoNYhgRZFYuuetfIX/AAU2/aWvvhzoNv4C0KYQX2s27G9mU4dIDxtX03civTlTVbS+h4lHFPCty5Pe7s+Nf2ufiBpWoa/pvgrRpYryy0S8uLmeWJt6rPIVXyVccMEVFBZeCScZGDX0X/wSi8I58a+MvE9yilrXT4rSBz/D5rlmA9OIx+dfBPgvw1ceKNaggt1kmnZhtWNSxP5V+qH/AAT98J3/AIR0vxXbXun3FmsjW8itcRlC7DeGHI9/1r2MPhuWk3FaRPCxeLderz1H70j6/vtVt7eKQLgt6VzlzqmnspeW2Vj7DFUJ5JppJXKMBvOB7ZqlfXSrauSvKjmrSOc8p+PXxGubvQzo9mhgs2b5+eWxyAfavni3WSCWO8KZWKQOeOwOTXpvxEuhd6hcRscktwM1W+FfhqPxL4mh0uRN8U0citx2KmtEjVaI+kvhlo8Ok+D9SQAGLzfLQ+quA4/R67O10+18K+HNSBjUCS3fK9mJGB+prn/h7as/w90GEj99IlukvHVkUo3/AKBWr8SvGFr4cu7bTZLU3ct0hcoACNoOADk8ZOefauetWp0I89WVkKjRqV5+zpK7OD/snTvEOk3WnHUbnQdSmXbDfwFSqN24I/PP5ivAPEnhTXtJ1y806VnnMLmPzVOFkHZh7Ec/jXt1815dTl7OxFpAw4WZy5H44HFTW2jy3WnmS62tMj4LBf4e35V8fnGZ0sRBRw02380rH2WVYGthZOeIirP0bOE/Z+huvDHxDsmvh5dreq1s+f7xHy/qB+dd/wDteeCdak8G2eteHktTe2M2ycXQO3yW78dw238zWZdWIhHmQ8TQsJIyOzKcj+VfRNxY2/j7wK0MgDQalaY+hZeD+B/lXJldV1LxlugziPJKM1s9D8xbzwf4y1SF7zUPEj2cYDFrXS4wnHoGOTmp/gz4i1fTPDFjf/bJ5ZJHkIFyxYvHvIUN68CvY5tLNrJPaTx7XjkaN19CDg1Drnw5s1tIItKjW1lSMKkIGI3wO3oa9yT6HzitFpm7onii08TWpRlVJsbZbd+c/T1Fc/4s8CpqFnIIXMcatvi8pRvtsn5ti9GU/wASHg8HggEcjps02m6hcQsrQXMOODwy16LoviIXkaR3B2S44boG/wDr16eDxlTBu8dV1RnXo08WuWej6M8LuNPbSxei9tM3kRUQsqMIZFPRkyPY/KeRzkd6z9HmeG+ae5GGb94POB+br7g9TXvXi7w2utRzzANNJMuyWPdyRjGVPZhge3HQ14hqui32h6kltqMu+KQlLa8ZdqOw/gcH7jgduhxxmv1XL8wpYyldP/NeR+e47B1MLV2/yZ6RodyhjjnuZQ0X8Q25GSOKK5/T/tMSpC6LM6jBK/MP07dPyopypa7nZGpojxW115lwJIuPVTWhDJZ6h1i59WXH61Vt7O2gXbcRTWzY+/MnGfr0rWtLDdeLGsisgiyVBBzk8cHHp2r8c5ux9fYqSeHYZl/duVPpnIrP/wCERu4pt6yrImeVxg116WsMKADMZx0Yn+TUrTondfx4o5mFjnYdNkg4kf5fR1wfz6VHe6PazjMsQPuRn9RW5NqcUZO9cr9Kr/bNJuGIMyxue2cfypoDBnsS0KrA6hlTarEkkD061Tja8s1CTWvmIowJITnP4VvSaC99LI1tKQgUbSQGz19OaypPD+tWsisLj5VPKryD+BqhHf8A7P7Q6n8VNEVW+aNpJCjDBGI27fXFfbEQ+UV8j/sy2ss/xGMk8Q329pIwfbg84H9a+w9J0+XU7yC2hGZJDtH+NaxuxvoZ2uXGo2mmbdJtludWuP3doko/dhu7uf7o/U8V8rftAR+JPiP8WND+Fs3iKW+3LHea+8Z8u3giOGWBAOi7eeepIJ6V94alYQWN8sURVY7KLBlf7kagZZ29+tfBnwZ8P3HxT+MHiLWi0j2+pXkt3dzZwTDuxHGT2GwKMexr0qcVFWMU7s9v0W30rwtD/Zfw90hB5QWGXUVXbBGRxkN/ERk9PxNfO3xI+LGoX2oanbRXcl3G00kSSSgFioOA2ffGa+ifi58TtM8A+DdUtdL8vzYY/skPl4CiWQEAD/dUMfbj1r4YmuZbqRzk5bJLVsCKlxE9zcDeVVFOWYtT7zxhpOlptlvIgRwEjO8/pUd14ci13ShHc3ZtoFbLKDjd35PpzUdhpPhjRLdpBbJebGx5igyAfXqK82tK7t2NfIqf8J9LfMU0rSrq9bszLtX9Keun+Mtaxva30mI9cct/WtL/AITN3ULpumNsxwXwg/IVD53iLVM7pVtE9I15/M1ghalOb4dwQp9q1PVLi+mQ5wX2j3psv/CM6PdJcQOouFXA8v52ORjJ961ofh3fX6+bc/abkE/eYMwqWHwjZR3ws1VXvQMi3z+8x67euKqzFsYVv4rtogwsLdie4mXb9MYqxofjDxZY61aX9m0Vs1vIHVQmQwHVTnqCMg/Wu11T4ef8IrpZv9XuLHSE27lguJh57+wjGWyffFeNeKvjEdPkePQ7SG5WMlTNI4Jz/ug5H40/Zt6NDTcXc+3NAk8M/ETwHqF5bQfZL+1QS3Fm33oiepB7rnPP54rldJhT+z5CM4Toa8s/Zx+JEdla6k3ijUfJvte0S4NnarGqRRAONhZupLbTjt+dd34O8QDVPDkipzIOCfpXiV6PJLQ+uwtadSCc9zK17xA8ayqh5FebSXGpJetdwFlI53V2/iLTxp7G4vH2Ky7xEv3iD0HOOT1A9OeBXlviX4qJqEJtfDUdnps+dn2fXmMch7Z35EYJ64YjgjrXdSwVRpStY5q2OpJtN39D2L4bftIa74HuFmklW5jQjcsh7V85/tZ/FS5+PXxm1DW7O3lkghggtwEUvsIUAgkf7WRWPdeD/Fet3Ky+I9Us9JsCdxaGeJyV/wBiOInd7EkD3rsvhVY3PiPxNF4R8Iac06XLCJJZOWaTI3TOR2UAn0WvTpYdx3Z41bEKsrJHRfsx+FT4R83xBqsJto7XDyzPwYs5wqjHLsegr9Av2PfG1/8AEiTxXrkzBdOikjs4IAM4YKWYlu7YZc/Wvj34raGNM1SPwbps7fYNITbc3DH/AI+bkgeZIfx4HoAK+wv2Q9Nsfh78GtAsoin2jVZ7i6nkU/flZcj/AMcjWvVlN+zVOOx5fs1zc71Z7xHDbW9udz5JYk7j61y/iq+02x025keVd2xsDNcx4p8UT27Q4l2o3UV5544v52tw7SFkcc1iolpXPMtY1IXGpXszHcuSFr1z9lfT/tniK9vXT5o49oYj1rxO8xJKQhyCa+rP2YfDP9m+HXvHXDTtkH2q3sXPRHqPgvTxDahMfJDc3GB6fvpMfzryP4vvc2vxCknvVMaqqCBc53RDv+J3V7r4d8pbNJMgLPK8if7QZ2Yfoa4r9oTwmdS8P22sW5AnsW2SblODGfUjpg9/evDx2EjmLjhZO2v/AAyO7BY2eXOVeCTdranl958SLOztcxWUkzqOrkKP61teGfGen+JYWtgv2a7Zc+TIepHPynv/ADryG+vIkjeGb9xKR8quRh/dT0P4UaZePp15b3UZw0MiyDHsc1w1cppYVOEoa26nRTzWtXkpqenkewXtmVY8fhXq/wAGdSF14YfT34ksJjH/AMAPzL/Mj8K4eWOO8hjniAMUqCRD6qRkGtr4YXB0vxY8DHEd7CV/4GvI/Qn8q+XwEnRxKi9nofSZhFV8I2t1qeafHbwjLoPji5vo4GFjfYmEgHyhzww+uRn8awdoaEAjIIFfSfxaVYvDH2qW3S5gifbNG4/gPGfqDivnbWLiytGEkTYtW4BP8Hsa+ydPqmfHJylG9jivFWim9uoJWijeJBhpuRKq46DHX8a53VNQg0ORVTT2lQj5JZJDtP5V6PeKGjBUhlI6iuS1fS0uGbjcpHMZPB9/Y1g0+hpF9zM0vxy7z7bqFIrfHBQnK/XNbeo2On+ILJ4rmOK6t5lAYSDcjDqAcH1wcjkYFcDqekS6esjxhni2nKn7y8dDVHw34kuLOIBTuiZ8FM++MiunD16uGn7Sm7MucKdeHs6qujZ8U2MXhPyJY7eZdOlGHkCl1gfPQ4ydrYGD68elFWb34x6N4RaNdWuoYlIJSOZwrD3U0V93h88pSpp1IO58zWyurGbVOaseeXkkCRlG2uvdT0/rXOX39mrIZfLEUuMb42KnH4f4VzkGsajqh2sBF6/Nu/KrcehmbmdmlyOQTx+Vfnqj3PcbGz659n3JBcvKo48tl3Y/KqdxeX8wJig2n1B/pxW1b6THHwkeT7DNaEWh3E23ERGeBu4/SqukTZnGLbtcMwuLhlJ6LjYR+PFX49JijVmRAXI+9611T+HBtHnyRhWyOcflUlt4TgkI+z285PrCdoz+PH6Uc4+U5uO3khk3Rl1P+xkVo217qe4IAJgeiyDOa2ZPDur2cCuy25w4GJsbiM9PT9KoR3VjPK8N3e+WFO1oY3GFPcYzU81w0PZP2bITca5q07wLDLFAqHB/vN6fhX2l8MfD4htX1OUfPJlIvZe5/Gvkb9lyx026XWTpSSF3nigZnXbuOCR/OvuawgWx0eGGP7qIFGK7qK0uZzPIvj1d6hZeANd07RYDPqusIdOtmBxiWbgsT2VU3sWPTFePeAfAs3hXwmvhvwftVSu7VvE1wNsfA+by89VHOPpXv+t6f/wmWoTWSMy2ULNFNION3TeAff7v/ASO9fNf7UXxqt9JsZfAfhVljiVRHezwHGf+mYx29a9GLM12R4N8evEmgXGsWul6PcPcaXpyNm4c5e6nY/vJD+QA9hXjdzdSTDKoILfoB3at+605FJml+ZzyS1cjrmpbpZUQ4SMbePU8k/lj8zVmljQ1jwg8lhZavqay2em3QxbmQMFkx6Dv1612vh/4L3ra5p+ltYS2k99tKGdCo2EZLH2AyT9K8U1T4r6xq9lbaVqU1wmmW6+VAoAeIKOgI7fjW9H8XvG2n+F2sdK16a+tFRljhupDMqqQQVRicpwSMA47YrmlSi3e4an1l8WfgF4U+Hen+H5NN1vdFNCxvbqbBBcEfcQdO/BNeb6P8UfD/h++n0/R9Ht5ZfKZV1bUP3ju2Oqr91PbHPvXzlq3xo8UeJIbKXU9Vur6zX9y0Nw5JifgEZ7kgAjNaMNwZrq3dGJSRBID7YzWnLBbII9bn1f+zV8dm0XxC/hjWfLu9J1BmeCSXBNvLgkgH0b+deR/tkfFLQ7y8ktrews7y4jciK4MY3RjPOGHP4V5v4fubk6gs0bshjfKsDyK4L4n2s+veIYbWPLsR3PvV3XKEt9DmNN8R69rzuFdWgjBZpJicKo9+/0qz4F0e01TX769unCWdinmSttP3eSxx9AePeust/Ac9pokkced/l8he9aX7N/h2PVtav7e4jV0klSOVHAIK8ggg1nbYZk6i1/p+sGC7KoNJhRLUmMo01pIAyEg98Mpx7n0r2n4T+LF0uxnuJF32caB3YnoegA9SfStD9rLwMknjLwL/ZUEaXGr6bPbXA+6qLAVKyt/uq5H0XFedalcwaTpkGkaezfYrfrI3DTPjDSN9ew7Dj1zjPDRqVFJ7HTSxEqcGkR+IPGmt654o1bUdVu4xayMRa2MP3Y1znJPr2rzvxHHL4iv0jhVWnl+Tpxj+8T7VY1K/wA3Top9ic/rXuHw2/Ze8f8AiC6gh07SRaX1zEkzXt7jyrWNsEM3vg5wOfyrrtfQ5L9Tz7wn8KY9Sv7DQrK0m1TWLjoks7JDFk/fYA4VR719u/Db4d+HP2cdNt9NgMN54v1KLfe3yoF8qPGdiD+Ff1Petvw78FfCXwL0F727vrLUdTtUE8tzcKnm3EgHIbJJCB8EKOmBya8N8SeNrjUvFGoanJdrPcSyEBg2QF9vwrS0UkTe5xXx28dW+j6lql7EPMuruUrGq8l3r3z4P+Pm0T4J+E5JJ993Z6ozgucExqsdvIPoPMr4w+Il1LqHiiC7cgCCbEfzZ788V7Frk0um/s//AA5uvMaIXV7qIdgcfJLMUGfx2n8KV7so+svFN48l4tuSQYiR19+tcp408RRyWKWkTb2H3mzVIeLH8Y/Dnw14kWQC8vbRRcgHpOvyyKf+BA1z8NtdamxldMqDgt6VSHHYm8K6W+r6xbwBS29wP1r7g8P2a+E/BdrbRALcSqlvCAP+WjkKD+Gc/QGvn34B+CzqHiGKV1ykXzkkV7ZJ8WvDDfGDQvA7XYk1FzIQsf3InETFVY9MkZAHXp60cspXUVtqZVJqLVzqvEDf2XBpptlIisWU4/2cbSPyJrsL7SYPEGi3dhdKHS4heFgTkYZcZqwbK2mRlMMbHGOUFR6XcZ2xYxtyhJHUjp+leFGlKFWVZvc65VI1KSppbH58fECx1PwZqWoabPCtylu7q9rL8yZHQqe31FcdofxSt5LgW+JBnj7NcH5l/wBx/wCIezYPvX01+1l4GltfEi6vbKvkahFlxjjzFAB/MbT+dfHmpaLJDfFliEb7uw4NfrGHo4fNMLF1ldtH59VqVsDXfs3pc+3PhP4gt/E3gW1aNi0lo5t3VuGAHK5H0OPwrpo5G02+tr1M5t5Vk/DPP6Zrwv8AZd1ae01C90a5k3xXUAlhB7OnOP8Avkt+VfQE0O4FT3HTrX4Tn2A/svMJU4vTRo/Xcmxv17BqUt9meqa9pUPiTw/eWEhzFdwsm70yOD+HBr83vFnx+g8J65f6DbaNqWt3VvK9tKphESh1JDKd57Eda/RfwXe/bfDtrubdJEPKb6rx/LFfAP7WnwB8S6x+0pMnhoGG2161/tEMqDarIu2U59dwz9XFfT4JYSsubFStG17nhTliaLdLDxu7nnfh/wCOerRX080mjzWlkzD/AEF7hZx7lSOUPtyK29Y+PNuq7rXRbiU/9NXCY/Q15vo3gfxF53lPDqNwFJXKpsP0x6V0sPwU1zVOV0i4BbqZ5eK+mrU8howUnXi3/i/yPGo0s6r1GvYSS72/zM7WPjtq9xkQaXa256BpH3EfrXD3PjrV7iaR/tMNtvbcVhXjPqAK9isP2Y9YuWBuI7azTH3j8xraj/Z18PaWu/VtetYsdVaZE/ma8mWZ5TT0oR5n5Rb/ABZ60cozKX8aXKvOSR81ahdT6xIsl5dTXbrwrOM7fpmivpkeHfhJ4f8Aln1K3uZBwditL/JTRWf9rT+xh6lv8Jt/ZMPtYiF/U8eXw5daDHJLqcUthsZR/qy6kZ5OR0ro7W3WK4NutmbybIALsVByOMD/AOvXTX2u+F1bz7q2u9blYYDEBUz+HH6VFd/Eee+ZRaaDaJEmFRpjubaOMcV83zNodijfeEdfSFWe3k0m3c9Vj24HruqGRdA0G1J1vxBJPIvBhjRtx/Sr994mi1i0+z3ltNar3W2mJTP+6eK5rV/CqX1jIYL2VYehE8TAD0GRmhS6Csxl38UPDdjGJNN0m4cLkLLMNvOfTmsyX4keJNYX/RzFYQsBgRR/OPxOaov4TlUQJcoGhaUR+cmWGTjGAvP6V29j4S0KxmRX1GS7VcB4VQxMD6ZIptxQWODurS81SRnvbya5LNuxI5IB9gelEHh8SyYjgaVz6KSa9is7Xw9HOkdtpKbiceZcTb/xwcCsXVtf1fS9Qm8mK3FoD8sXk4UD2Yf/AF6XP2Hynv37HHhmXT9DuJJ4WhP2l5QrDB4RVH6mvrLW7qXTtEJt1V7oqI4UboZDwoPtnr7A14f+yfbTap8P49UniEJuJioUNno/P8hXonxW+Iln4H0u4vpmV5IBsgi7tMR/QH/x6vaor3Eck/iPM/jx8VIfhJ4PTw/pM/n69cRbGm/iXP3nPuTk/jXxPJpbzyPd3bsZZSWJY5Zie9eq/wDCPa78Qtcn1a4glvb65fKIQSB6fQCsf4jWfh/4SabI2vXqah4icZWwt2z5Xpu9660i1aK8zxXxWrwxhY1yzHAFeR+KpJLG1uLVfnvL2QiNYzlgNo3H8P61veJvG2peItca0jQ2sjk4t1U5X5SfnPbjsP0ribiyuP7Wjhab7Rf3HyF1GFjjBycDsM/ypsRJo+mvdWflzoVdeDxg/Wsm7t7nw94ghn81VspiEmG3Awf4uO9dpaYtZsgZjztP4VP4k0WLVLHyVH7yQEovuByKQzmYtN8u81BF2P50X3cZDkkBGHvk/rXfReGpI42kjjYqkIjjGPbB/lXnejtNdazpWmW8my7UbQ3BKjJz16lTg/hXvPhv4Z6trC7P7d1F3VcswEePy2ULUDk9M0lrWFVKYc9eMVxniLR7ix8R/aGjO0fdb2r3S4+G3iPQ7WS6j1G3vYowWKXlthuP9pCv8q868UahdWf2hdW0iRYoSqG6s286MEjPPAYfka05dCOYqaTdh8HOR3FS6Fpd34N8SSavpUInsriRZZo1+/GwOcgdwax7Jre8b7Rpd1FOndVbkfUdq9A8FySKbm5uLdhBbJuIcfK0n8C++Tz9FNSkXc7D46eMrfWrrT7WzjBkhtBG838W1yHKe3OM/wC6PSvnrxlqC6Pb+UMNdSchf7o9TXo2sz/Y4LjUroF5GJZQf4mNeF+ItRW81ZjI/wC/c79rcZ9h9KqWhKsd5+z38Nrr4k/FXw9phsmvopLgTy24IHmRp8zAk9FIGCT61+uWp/D2LU2STXL65vQAxNnDK0NquRgKI1IyB6tnP6V81f8ABP8A+HOkeA/C9r4r167t7TxF4sLQaTZ3DhJHto8MdgPJLEZ47KvrX1X4y1pbOM4yJWThO9Qr7Gctz5H/AGidL0CGWXRtP0HTIEYfvJEtU3NkDPbj/wCtXzBqHgTRZPOA02GOTn5ocpzj2r6P+Js0mr69qJkG2ZBgMe4IyOa8cSxeS4dTwSTkmteiKPAZvDNlDqjNFHucPuR3csV9ua+kPiHpE2pfss+FktoS76fBPIVjGdhEgfJ/H+deLLp3/FQSQYB2zsuOx5xX3/8AA/wxp2pNoWgajb+daS2ciTqOjK6bSG9iCfxxUxWo72Pnv9kvxZZ+Imm8K35BikuVvbcP0w4ww/8AHl/75NfQ3jr4f3Xg+x8+y3G0mPzr1wc9q+UZPhJ4h/Z5+MVpBqKeXbWdwVgu+iXEQYMrKe/B5HYjFfplptvYfELwNBd2LR3lndQgrgjKt/iKte7uHNys8vbV9Q8D/Ba5utBhQeJtViMVorttMY6NJ9QDx718aaRq2v8AgzxvYavqMFxFq1ndrdebIrHcytuJyeuefzr698Vagt1qnkQnNpZqLeHHTC8E/icmsG80221OEw3cEdxE3VZFyKKGYewcouN0zlrYf21nezR9oeHtch17SrLUbZle1vIUnide6suR/OnJII9SZSmFI8wEe3B/pXnXwD1KJfAcGkwjA06RoUjJJIQ/Mv4ckfhXoGrTfYbX7V/zxO5s/wB3HzfpXnSs72OiF00jkP2hvDUnij4V6tJbIzXunRtfRKn3m2AllHuVz+OK/Pe31fTtRKyWlxvAOZI7gHcD9O3ev090u+jvrPDAPHIuGU8gg9q/Jf8AaC0O6+Hnxk8T6TbWn2a0t71nto9xbETfMhDdehFfR5HmCgpUW/M8nMsGpPnS1PZPD/xEsPh3Ba+KBGZorW5VZkUEEIx2E/kxr66Zo5gHjYNGwDK47g9DX5ZXXxG12+8P3ekTInlXAx9pRCJU/Lg1+gn7OviqXxb8F/DF1cy+fe29sLG4k/vPF8gJ9yoU/jXz3GVONaNPEwW2jPa4blKk50ZddT3D4d3nl3V9Zk8MBOo/Q/0rp9S0q2vLmG7eBHuYFZEkI5CtjIz6EgflXneg3xsfEFlL91S3lP8A7rcfzxXqkyloHCcMVIH1xXzWAft8P7O+x6mYRdGvzrqfBfx1+Mf9i/EjWtB8MPZWZtZPKfzIAS0uMttY8cEkY9jXiOtfGbxskrebr9xAM/8ALBFjH/jozW78TvA8eueINXmkO7UEupRcFRhxIHIbcv1zzXld9Pq3hyXydSt/7T03org/PGP9lv6Gv23L8nwGHpwUKEZO29lf11PzDG5zjqk5c9aSXRXZpaj4+1LWlJn1K6uZiek0rEH8zWS160vLFge4qnfWK3EH2jTm85OrIDhwPcf4VnWWotLIFabDL0DV9LGhRivdil8jxHiKsn70ma0jBx0z6ZNFJHcNMWH2hUIorN8l9kdK5mtz6U0f4H3c3y3Vxb2e37yAFmGa6az+Bvhu1C/apJrpgc/KfLXP4c1j6V8QrvUmuJFiNuwwDmTeDj0z9aujWLy/UBriXJ6hef5V/OPMfrjTNNfAfh3RGLWpWFs5xLtk/wDQuf1rkviZNb3Gk29vbLAcShmeJSNwwcVvx6HfXnKQSSD1YFc/nWB430eewtbTz4xHvYkL34H/ANei+pPQ5TR7ELbpwOTmvTPD/h6yvdBX7TbRymR2JLLye3WuG09AkUYA7V6f4fXy9FtV9QW/MmtVuRLY5+6+FuivloY5IGY4ykh7+1c/qHwUnwTY6qyn+7Kv+FeoNy0YH97+hq4vUU7GV2ek/Ae7Xwx4AsNFumUXVsjO0g6PnkmuQvvDVjrX/FUePdTitLd3eW1sXlCqqMxKlvVsEflWlpu6KGIr8pCiuU8WfDey8YXwutYtH1lYYVihtzeSQIijP8K9+evfFe9SkuVJmD3ucx8RP2nPCPhPSbrSvCjKl5LG0SXUCb2ViCAVHc14x4C+AeveKJpPF3itZfDehp+/fVdcXF1IOv7qBuhPZn9eAa92jg0D4TWLahaeEdH0aVTtF1IPNm/BmBNeJ/Fr4uaj8QoZLNryb7Luz8qkKfwrrQLyPnP4p6ld2vjzW7q2e2sPCkbtHZpGA0869A8jdd7dSffiuZ8C6TLeXFzrtyoKkbYYwc4H9K7LXfBceqXUBuZXkgjO5o2GNx9+eldVpOnQWtrt2KFKbAuMAD6Ural2PJNozIo4JcjH41N4kvjpMOm3K/wzEN9CMVPf6ZLY61PCw4aQuh9jWP46iuL7TfKtgHlhGduev0oYi94V8Lq3jifXkx9mEf7tf9thyfyH619y/AbwrDqHh2S4dPnmH3vT0r5Q+CGkjXvBYvZhPBL57R4Vip+XA/EZr7S+Dlvc2+iRRJJkBRw6j+lEQlsP1Dw6ka3MEsQX5cAEcE1454w+Hdj4is0treKEancys6wI21iEGOnr1r6I163vby3OIwkiPhdzDD/Q9ufWvmb4w/ArXfGXirTyddbwzLAzSC4ZWzJjliNrDaMYxnrWyehkeE+Jvh/b2+qXMdzaG2uIHMSEgxS7vXIwa9Y8I/D+aDw7aWd5NOYIU+3X0lwQWXcAVXOOyY685c11eueBYPHHxEtnbWrW7t4Y0zFG4eZ4o1AYuQfvtjn0Jro/jRMngf4fi3yPtl+5Zz3I6nHtnA/Kixdz5e8aXqa14gFvEoW1gztQdP8AOK5/wb8Gbn4o/FTQvDltB5kF9cD7Q+M+VCvMjn6KDj3wO9WY5j5ss7csx/WvtD9g/wCE7Xclz8QNQgKRxq1np27ILZ4kf6Y+UfjUSE9D3W68D+HNF8XaBq1h4dvNS1bTNP8A7P0yNFYW9nGuRuJb5UOGIz1I7HArhfjL4o8W6fZm58/SdLMaMAFV7mTGOmTtH6GvoC+vlt9WghGAJYn/ABI5/pXx5+1F4rzfCwjfp94A1KJWrPnXxf428S6teSPLrchO3Z+7iRMj04Fefak1/cRyvcXs87HA+dye9dVfrv3NWZJZma3fjuP502zUg+HPhm41zxdp9tGjOWkyRX6FfAbSWXxVdXH/ACytkSBR29fz6V84fsr+E4rrxdf38qAx2VmzjI6M3A/TNfXHwU002NpJOet7P5wz2ycf0FNGc9FYuftOfD3QPG3gWW61iIrLpcguI7qIYeMMvI9wcfoK4/8AZ68SWmj/AAL1i401pgkFy9pCszZ+Z/4x+BJ/CvYPj1HGfgx4p3cslmxH1HT+dfN/wrSXS/gro1mcqt7eT3b9s7SEX/2aplK1JsUTUAJOTyakVaRV9qlUV5ZqegfBXxBHoviowXEmy3vI/LOem8cqf5j8a9zuta0y5s54ZZsmRCn3SeCK+VrOZ7O6imjOHjYOv1Fe4w3CXlvFcRkFJkDjHuK8vG4urhUuRaM9DCYenXb5nqi74N8VQtfNYPOWZf3X7wBW3DjkdskfrXz5+298ObrVLzRvF2kWQupDG1nehVyTt5jP5Fh+ArofiRNc+GvE0N/au0S3KhiV6blwP8K2vDXxI07xRaNpPiJQ8ExAYs2Of7wPYivNyzPfqeIUpLVfc7nv4/InisP7SlqmvmfA/wC4Vtl1D9nbpyMEH0Ir64/ZJ0+/svBWrySyb9Mmug9sCCDu2gOR7cL+VWPHnwf0SK9KNLZ6lYTMNlyHVXTJ6Pz+vSuv0Lxl4D8D6ZYaDa+JNLh8kC3W3W4UtuJxyAepNfYZ5ndPMMF7ClH3nv1skfKZVlU8LifbVHotjs5i204OG6jHr2r2PRb5dU0m1ul6Sxg/j3/WvHG+VmXuDXoPw1vvN0ma0J5t5Tgf7LfMP618TlFTlquD6n0ea0uakqi6HyX+1h8JZtO+I1xrmmXMlu2qKtzsYkJ5gAVtrDkHIB9Oa+eNS1ZI2FhrlrJHek4M20Devrjo34V+gf7VenSD4bnWoLZbqXS5Q7oW2/unIViDjsdp/CvjWS70jxVCscscbEkH7PcoOD7dj+FfvWS432uFjGe8dD8czPCOnWc47SPD/HnhYaLYNq1hK8IQqUaHJUk+vdfxrg5PFNzcW6q9vAJ+QZ9oy3PUivovxh4dXQfBGrXdndRwSCWELbv8xOW5xntg4INeH6nY2V2sUkVn9lusnzlj/wBW3oQOx9ulfYUJqsrS1SPl68XQ1p6XMZdc1W4l2xSHceiog9KK9Y+AXgD/AISDxi1xNBvtrSFnYEcFmG0D9T+VFfM5pxFg8sxP1aULtJfifSZXkOOzPDrExm0m2fSy6L4Y0yOZNPDea/3TNmQA/pVpNTuLdSltNbwr0Hlw+WfzANFFfg1z9SsVLm8vJRmRmmPqJg38zmuP8SXE808aSmXCglVkz39KKKuO5L2K9uCu0ewr0zT1Men2qdMRiiiumJzzIP7altJAbyxnhVSfnRd6kdjke1XrXxLpl04VLuNXJxtf5T+Roop31Iseh2y7UX6CrDXENuu6WVI19XYD+dFFezFX0OeWhntq2ga0zWkl9p17zgwNLHJ+max9U+EPhHWCzPpFvEx/itv3f/oPFFFXJcuzJjJs5HUv2Z/DN0xMMtzB6Btr/wBBXD+NPgBZ+F9Jlv49R8xEZV8tosE5OPWiio9rNJu5rc8i1r4VWmqXUc4naN07KBzWDd/BVmkLxzbvyFFFRHETLPcPhb8EX0vw3Y+bFtGC4UAYJZic/rXv3hvwqNDsk2rgkUUV6C2M5Nm9puk/bp1RlyrEAivLbGx0zWfHXj7Xbq1F851D+x7WOT5l8uFFDAL0A3lqKKa3IOl0zwDp+iWjS2OmWtjNMfm8iFUG0dRwOmcflXyN+1N4wj8QeMJLW1k32lmogTHQkD5v1/lRRVxBas8g8GeE7nxv4t0Tw/aj99qV3Hb7v7qswBb8ASfwr9ePDfhux8F+GdN0TTIFt7KxgSCKNRgYUYz9TjJ96KKzkKRx3jzVRoU+lXkrfL57RM3puUgfqRXwf8YNeOteML1w29Q5GetFFWti4rqed3i/KO1FvDutZDjgLnp6UUVJoj6g/Zt0f7H4B8SaiBiW6ljtI2HX/OWr6T0tY/D91otkowM7D+Wf6UUVcdjCZ13xY0g6z8MPENuvzNJaMQPXHJrwa601dD0nQ9IUYNjYRq4x/E2XP/oQoornqP8Ad2CO5U2+1SKKKK4TQkxXqPw/1D7XoQgY5kt3Kf8AATyP6/lRRXl5lFPDtvoejgW1WRmfF7Sf7Q8JySopM1q3mA/7PQ188TXDqh+fDD0NFFfmmM0mmj9ZyduVFxfcxpvFUlreS2+5pGK5w36V8h6Pr0+oeJpIMsswuGLyM2SuGOT70UV9Pw823O/keRxKlGNNru/0P1i8EeIoPFng/SNYt5WmjurdWLsu1iw+VsjtyDXf/D2++y+IDAThbmIr/wACXkfpmiiin+7xiUe/6ngVf3mEfN2O+8S6Fb+JvD9/pV2ge3vIHhdT6MCM/Wvzq8QeG9C8PzahZSi9N/bzPEFRk2qykghgRnqOxoor9LwM5Rb5XY+CrRTjqjj9UujqWlvp86bkZhiR87lxjAz36VDp2h2Wl7pDBBM+wuc2qTbQO/zA4oor7DD4uvK1Pm0Pnq2Goq8+XU9o+FV5Gnh2O7GwC5ZmT90kQCgkDCqB3BP40UUV+P5tOU8fWc3d8zX3aH6xlsFDBUVDRcqf36n/2Q=="

/***/ }),

/***/ 25:
/*!********************************************!*\
  !*** F:/工作/APP/static/img/banners/008.jpg ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQEAYABgAAD/2wBDAAMCAgMCAgMDAwMEAwMEBQgFBQQEBQoHBwYIDAoMDAsKCwsNDhIQDQ4RDgsLEBYQERMUFRUVDA8XGBYUGBIUFRT/2wBDAQMEBAUEBQkFBQkUDQsNFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBT/wAARCADIAXcDASIAAhEBAxEB/8QAHwAAAQUBAQEBAQEAAAAAAAAAAAECAwQFBgcICQoL/8QAtRAAAgEDAwIEAwUFBAQAAAF9AQIDAAQRBRIhMUEGE1FhByJxFDKBkaEII0KxwRVS0fAkM2JyggkKFhcYGRolJicoKSo0NTY3ODk6Q0RFRkdISUpTVFVWV1hZWmNkZWZnaGlqc3R1dnd4eXqDhIWGh4iJipKTlJWWl5iZmqKjpKWmp6ipqrKztLW2t7i5usLDxMXGx8jJytLT1NXW19jZ2uHi4+Tl5ufo6erx8vP09fb3+Pn6/8QAHwEAAwEBAQEBAQEBAQAAAAAAAAECAwQFBgcICQoL/8QAtREAAgECBAQDBAcFBAQAAQJ3AAECAxEEBSExBhJBUQdhcRMiMoEIFEKRobHBCSMzUvAVYnLRChYkNOEl8RcYGRomJygpKjU2Nzg5OkNERUZHSElKU1RVVldYWVpjZGVmZ2hpanN0dXZ3eHl6goOEhYaHiImKkpOUlZaXmJmaoqOkpaanqKmqsrO0tba3uLm6wsPExcbHyMnK0tPU1dbX2Nna4uPk5ebn6Onq8vP09fb3+Pn6/9oADAMBAAIRAxEAPwBmsa7dQwsYXGTXmt3rXiM37ukzbc8V6t/ZYb70efwoGg2/eEZrGNRwNvZnmJ8XeJkUDzCfzrsvAHiDWrtZnuQTtNbjaDb/APPEGul8KaLEkU2yMLzzTlWlNWBU+XUi8H+KrhLydZWIUMcA16P4W8RJca9aIHyWavINRU2t9OEG35j0rW8A3rr4u04yNhPM5JNQpu9gcND6i+KF2LPwwkpOAFBrx6HxRGcfOPzr0n44yib4du8LbiqA8V8qxXlyvO9q0qy5WTGLke3R+I025U5PYetXL7w/LF4fn1m+4fbuRT+grxvTdYurVhIpLsvIBrd1z4oazreiiwmhEcQGDjv7104ePNF1JbIyqOzUe4eBdLjvdak1W+K784QegzXsdrNHMo2sCK+cYPEN3p+Ah+QV3HgfxpPqN4IWJOK4KtZzdzeNOyPXtu1xWzpbASAmsNGLKhPXFbNjG20GuRpyNdi/rN4z2+0H24rs/heNuiKpPIPP51xElv5nWu8+HMfl6eV7Zr1cPFRTRx1Xexynx11b+ydLSUPsO771fO8niA3EjOZMk816/wDtcXbWvhW28vqZlr5RXW541yc10VanK0iacbq59GfAu/8AtfxAtlznEbn9K+nJV+ZW75r40/ZX1R9Q+KKo3RbdzX2ZNkyDHSrpy5lcymrM+YviFqQh8aaopbo4H6CsOxuUkkJrmPi54ia3+JutwA42ygf+OiszTfEhxjd1rkqVPeaN4x909KspkadeR1roIpE9q8mtPEhjkB3d62U8YBR979aXtClE9E8xD3AprOnt+dee/wDCaqvV6cvjiPpvH50e1DlO6uLwCMg9Ki8I+FZ/G/iBbG3dY0H7yaQ/wIDyfrXFax4sS3tWct0Ga6/9mfxOuueLNYSOYxmOxLF0IyPnX1qPaDtofSGgabYaDFb6TpsGyKF1LyHgswIyT6nj+VdZXMaJYyRyQzMWVWIwjdW/2j+XSunpx21IRwvx1Yp8HfGBBwf7NmH5riuC0UHZMc8mT+gru/jt83wf8Vr/AHrJl/MgVw+iyL5MylWZvNJ6cYwK9Ch1OeruW/hid3i12/6eph/44wr1nWs/2XfY6+Uf5V5N8L1P/CVSE8Yu5/8A0Fq6f4i/EbTfBOk3NuxuNU1GfcsNnaIZZnY84CrycZ+g7461y4k0o7Hwj+2h4W/tmx8C6XJcJa215rvlPNJjbGGQ7mJPoM14z/wT1Pm+IPiEynMf9kyZZs4A3DBIHI+o9a9H/a50Hxr4x8Fw+ILyCKw0zT5A8mneaGkiU/L5hPGGJYDaMketct+wfYpZ6x46aFPLxozkrH8pPzLyCOQf0Oa8yL9yx28utzxv4yxKvw/1wrIj/wCnLhRIW/vc4J/WvBdLupbyS0ikJZYYtq57Akt/M19G/EiH+1/Bmp2aBmkm1NF5yeu73614/rHhRvDLaXvhZTcQuwYqQG2yunB78rjjuDXTS+Ezqbn1B/wS6jC/tSHB/wCYNdfzSv028RLnVLjI/ir80f8Aglsm/wDaiuDj7uiXJ/8AHo6/TDX8/wBq3HpuNZVBR3MsD5eBiuB+Ku2G30p3Yt882Ae33K9Brz34tQtJHpAxhd03/slRTWpTPNJpjM3GcUR25krRWGOFBk81nahq0dmCFILeldPIQrjLqBI0OTiuXvoZriTEYIFa1q11rF1jGVrutN8JxJb75AC2O9PRGxwOj+GZblcyCivVLDS0iX7oAoo5iTpZPhhoTKcRx/8AfNZdx8LNGLcCMfhXX/Y32/6xqpXGnTdRK1bSiuxhzM56L4O6PNjiM10eifBTSYY2Coo3ehp9nBPGwzKfyrsdEeUKAXz+FaU4xe6E5M4S+/Zt0O8meQphmOThj/jVGP8AZj0mC4jmiaRGU5G1zXsnmyf3hR5snqK29nHsRzvucjqvwzXVdFNhLIzIV2nPpXm837K9oWYpcSKM8CveFmkHp+dKt0/qPzocFLdApNbHyx8Qvgf/AMIJoU2oRzs+wZIYcVzvw2+G138SLSRo5PKiU7d23PNfVnizw1B41sXsLw5gYfMuetYXw48L23gma5srFMQ7yQBXTGMY0nBGbcnNSPGLz9lTUHUhL0fjH/8AXqbwp+zVrGgXxma6WQZ6bMf1r6hF4/dT+VSJck9sfhXA8PB9DdVZdzyNfhvqUargqcD0p17oNxoNhJd309vZ2sK7pJp3CIo9ST0rE/ag/a60P9nLTba3e2/tfxHeqzW+nq+0RqP+Wkh7Lnt1PNfmb8e/2wPHXx6ulttRvxpmhqcJp9mTHC59W5y5zjrx6CsfYU4msZSlufffiz9obwH4SkeC78VaebkYAjhcyE5GewPHv0rY+GP7ZvwpmV7S58UQWsigYeZHAf6cV+RV3b3G3zZZTJK3VpG5P51AdJvJIQyT7c/w/dq6dqdxyipaH7IfGq60/wCLnhm0k8MXkOsQ+YrhoHB4/GvB7z4S6/HGcabKf90Zr88dJ8R6/wCD5CdO8TXelufvLbXbxhh6HawzX1f8Bf8AgobrHw7sbLRvFGiW3iHSkcCS8gkP2pV7n5j85+pFW3Co7vQSpyitD6i/Zf8ABmp+H/iVJPfWUtuhtmUM64Ga+s5Jg023rXmfwY+NngP43aeuq+D71Z3jGJ7eSPy5oCR91l/w4r0GFv8ASeR3ropwUVock229T4Z+L+h39x8UddmjtJmjacYZUJB+UVhW+l3sK5a2lXH/AEzP+Ffe914d0q5uHklt0aRjySBUDeD9Fk4NrH/3yKwlRUne5sqllY+EIY7hpADFIPqpq20Ev91h+FfbzeA9CY5NpF/3yKY/w50CTraxf98Cs3h/MaqnxA9pI3r+VMXT5DIoz3Ffbb/Czw/J/wAukP8A3wKrt8IPDrsD9khz/uip+r+ZftUfIfi7SJV0aQg/w13H7EmmmPx9r3nKGX7B3558xa+hL/4P6HqELRSW8ZVuoxUHh/wTonwna/1WyFvbTTQ+TukcIOoP49OlS6DjrcXtE1Y9U8kTSIvmNGyncNnXpjvUskTRqWa7kRQMlm24H6V4wvxnezs5l0yzfU78ktJcTEpEO2R7Ac9q+bfjl+1Ne6XdSJef2h4itEj8yddDKva2owf9ZtbJ574IwetTHbYi9j6Q8eeEvDvxc8XfYh8SNatJI0ht5NK0y6C2cpWQy7XG3azsAQRnO0dK+fPiZ4N/aMm8e63deGbDUtJ0S1Dw2NravZzQXwVjtld2lV4ywxxtOK9i+B+lWtk7zwjc15dQ3Lsx5ZiBz+AwB9K9N8X+ItS8V6xJ4S8LzeTOAP7S1VRlbGM9h6yMM7R26ngYO9OrKOqM3FS1PBv2drL4n6/4fttI8RSx2Xii1eR9V1ZSsoti+7ahCYV5SpxsU4UAFicgV734f8DWvgrQ71XddR1drfFxqkiYlnOPcttXn7oOBXXeF/C+n+D9Fg0zTYfKt48ksxy8jnlndv4mY8knqTVPXJN329B/zxrOrJy1ZpGNj4t/acty3wS8Xt38pP8A0aleFfsSQmHVPHLDAP8AY0gyflB+ZeC3b8jX0N+05Dt+BvjE9P3Kf+jUr5x/YbvJLq+8etIcbdHcAoAG5ZfX5T9D/SvLhJX5TtUW4uSOZ0Tw/L4w1vTNEWVYPt2vQwrK84ZVJ3c4wM4+taXxm/ZhXR9a0+wuPETzmyikiDxWwUHdNJKeCxx/rMfhnvirnweto5Pip4UUE5fxLB/yzRe7d8fpXvn7RFoV8WHcgyu4V0KTjHQykryR59/wTp+F8HhP9orUb2K+lufL0eaPa6Berp6fSvu3Xv8AkKXH+8a+Uv2G4x/wvPWWxgf2W3/oa19Wa6wOq3A77jUNtxuwatLQz/ve1cL8V5kgtdILkdZuv/AK7qvLPjpY6hqFvoS2cLyqDPv29uUxWtH4iWcJNrCSyeXGAR0zWjY+Gf7WIbYMGqnhnwTevIr3EEi89xXrWgaB9mjUCIj8K6JO2w7mFo/gaO1UFY+fWt0aE8cZULXTw2vlDGMVV1DUorJTnDP6VnGLkxORkW+kLCC0xCj3orMvdQnvpDg4XP4UV08sUZczKS/EJcfe/WlPj5W71yLaHJ6Un9jyD+GsfaGvKjs7Txt504VTXYaL4xjjba5xivKtF0tkvASvatuHT2a6lIB6VpCpYlxR6l/wn1nkrvGRT18a2jc7xXhV5psv2yXG771T3ELaZpryyOwAHOTW0a3M9iJU0j0Xxh8btL8N2shaVQ+MD1rjtF+LniDxOqzaTpVxfWaPiaSNchB6+/4V8f8Axm8eT6xqi6XZMzsZAvy8kmvuf9nHU7fwv8KdN0+a3ZblI8vxyzHkk1tTn7S9kYyXKd54b8SQaxpoZD+9Cjdxgg96XRdTsoHnMrKJixznrXK6DOYdQ1GUJ5azSMwFcp4tuL2Fme2dlJNbXSg5MVrtI9rTWLZv+Wi/nWJ4++IFl4J8M3OpzSqojU4ywHOCe/Gew9yK8Q0/VNcNxlrg4z3FeQ/tm+KtWi+HFmsStLbrOyzybc+WSjKG/Anr2JFcarxbsjf2TPjX47/FO9+L/wAX/EHiDU3yHmaKCGTokafKifgB+ZJ71wDM7OJeHVeFUYBUVVuVj1C4ml5WZm3Hg5J74pbDS28wszjcvRuQGHpQasnkvmfmDDMxwUlPX/gX+NX/AA/bajqweC3tJBIWwwOcj8ap29nGsjxzKCpbr3HvXuvwd0+F1Kum5kPLeo7VxYmr7GDkjuwtFVqii2ecX37PN3qEaztPKsp56AiuZb4Sa/pGtWlisTTNdP5cDIpwzf3SPWvsy51HTdLtR9snjtIycBpCAKZpF/4a1pN9pfw3T28oceU4dkZTuVxjoVIz+FeTh8dNyvUXuns18BSUbQfvHWf8E9/g/qfhvxk+vSpd2LCIxXNtI5jOccEr92RDnIOMiv0BVB9q+WvGf2e/iZoPxC1TURo80U81ighumiTbtk7j88mvaI2C3BNfVxat7ux8bUvze8Urjb5z/X1pqlf8mvLdc+LUWn69e2pDfupSvSi3+LltJjJYfUVXMu4WZ6pwe5H41V1LU7PRbN7q+u1tbdPvSSMAK8Y8cftCReHbeG3srd7q/uvlTHAj7bj68npXzLoPiDxF4q+ImttrWoz6jIJZIrdZG7rsXAHoDn8jXmYrHRoXUFdnrYXLp11zydkfX3iT9oDw/oL28tu0mpae5xLdwHCxnJGACOTxSaH+0h4N17UBYwalsu3BaOFgHdlH3iVQkqBxy2ByOea/PT9pL4gavotvB4XtL4wx3OWaBUUtHGuVyrYyu4jGR/dNcx8BvCnxDk1K7Xwa9lp2sXtsbWO41JtqxqzKxcfKcsMcAjH5VGHrV6i9pNpJ9C8Vh6NJ+yppuS3Z+mXiD4wMqtHZSwWMeCTdXjBeB1KgmvC/FPxk/tHUPs2lxz+JdVkJSNjulBbP8CDt+ntXKfDH9ijVLe+GsfEnx5Jqd1I2+e309mYyHPAMsgHHsF+lfVGir4G+E/h+4uLG3tdKs7ePdNccGRgB3Y8kn0r040+d66s8KXN6I+foPhf458UaLP4i8b+JI/B2gW0m0WvmBZfMOAqKinapJKjk5GeRWB8Zvhn4o+F/hKaTSNFl1HTPEbwi5vrd9l2joCGQbQOJcKSe5BHc15j8dPjVd/FjVrx5LiWw8FWFzJNFCTgyuT192IA+grkrz9sTxZ8RodH8K32pmzt7GRUsboP5ZbbgIJWJ6jsx/Hnmu/FZbWo0Yyvd9V2/rqedhcfTrVXFLTo+/wDXQ92074jeIPBd3ZeZqN1a+LpZBZyaE6maGwjEgBlkQZYu2BsUEsT7cV+g3g3w9YeG9Bt7bT45FjcedJJOD50rtyzyZ5LE9c18wfsi/BufSPE1x4k1aCPVbuO32Nq00Qy07HcfLfGZCATlzn72B7fXVeHyuOjPbCuU1F/M1LVU7LCP5V1dcrPHnUNbf/YA/wDHaznsM+Uf2mofO+Cfi+Pu0SKP+/qCvnD9knSb/wAPyeObWye1k83RnlYzRszYDKOgZeOfWvpX9pHH/CnvFLHO0pHnHXPnJXjn7NsAS88VxqGieTQJnUqu5x+8TPyHr1/CvMil7TU61JqDR4X4T8U6h4D8SaT4ja3huhputR3JtymwSbSTjOT/ACJrufid+09qXjzUmuzpNjZE/wAKtI39RXG6XZi7urSIsrbtXQHEG0nr1+Y4/KvSdW8C2NwctaxsfUoKucuXQm3U7P8A4J6+JLnXPjxqpl2oG0iQlUzj/WJ6k19qa5/yFLj/AHjXy9+xD4RttC+L+oXEECxM2mSLlRj+NK+o9c/5CVx/vGqTvAh/EZrCtCzs7a6sYzPGHKs2M/hVBq0bJk+wpkfxN1/CuvC/xDOp8IT2+nWa7mQKPam2+saVH0da5Xx9qUNtYOPM2tjA2mvB5dQu77VFht7udk3cqpNerK3Ywjc+gvEniSHlbU9fSuQurjIaW4bC9cVBptlPDpokCNvx/Fya5e/uby4uDHMjoM45FY2v6FEmreJHlby7cbVHpRVFYPJbmNsnuRRQkgOnhtLiZsKuTU02k3kMe9o8Ct3Q5l+0YZa6LWgrWG1E5I9KzjRTV7lc2tjgdKt53mLhMgCtq1tLlZJG8okHpW5o+ki1sg7Lyea6Cyjg8sbkFXCir6ictDzGXT7o3TsYG2k5zXjnx/8AiIvhvSzZxuFnkGMd6+lfF/iDTdFt9rlVdugzXyFqXgG8+LnxmjMyn+x7bDsD0Y56U/Y2i7GbqapHOfA/4T3PibWE17UrSYxMdyFgcYz1r7Z8N2MMNvDFGNka4Famg+FdO0HRo7WCGOMImMKKWwtx5z7B8oNb0afK2TN3SE1CCC1kzHgEjnnNc1eRLMpLLu59K3ddIibg4P8A9apPDtpFeQkuAaqcHKk4ijK00zivsoVvlT8hXyV+2v4s1a18PS6clo9jYTPtEjgfv2wR68YGfr71+gH9hW/UKPyr4+/4KReA2f4a6JrtsC0VjqHlThR/DIpAb6Aqo/GvPVBw1OuNRN2Pzjt90MMcxHmHg/8AAc1fup4reHecKrN8m37w461HH+4mC/eUgmM+o6kU7TfD994s8QR6fpdncX8wXiGCNnYY5JwKtyUVdstRcpKKKVxcyNIGUbi3Umvq79nPwHetoq313HtF1ymR/DXlC/AHxJHbxTDTZpCvLxquWGOvH+elfV/7Pdvdt4dSyuYGjFuNiBhg49K8HH14zpWgz3svounVbmjm/HVjo2jzNcSWb6ldj5I4VXcB+HYe9edRz6ha66biPSraCFSjRzWyld+R8yuDjkZxnFfTuu6PZWYlJRSxOM968+8XaOi6O9zbrkwqSU714dKtZODPoJUrtSR6F+xrDcaN8UNVL6rBb6ZqNqXTT5Fw7T5ycN3wv4nnivs9YyJD9DX5k+GfGFvFqWkWdpczzapdyriW3T/j2II5Y54PsMnjpX6YaDb3cOj2Md9N9ou1gUTS4xvbbyfzr6zLa86lNxmtj5HN8PGlUVSL36Hzd4m0NZvEuoyZGWnY9PeoYdATjkV6dqngRbjUrmbccvIW61EngHHRz+ddrpSueRGeh4R8RbO10GS01KeKSQLDKqtEMkMACv48n8q8V+EFrJY/arzWdWXR7+1lkeC4vJVQvG33fvfeI6Hr0r7Z1b4Xxa1p8tncjfFIO4zg9iPcV4t4i+A+oWZkt57fz4FyI5tuQR68V5OIw9SLuldM+ly/FU3BU27NHxJ4l0vVfH3xE1rUN5CXUxAmVcFo1+7j+7xjgAV9Sfsz+DZNH1KzY3M5ww3KzFlb8DnH4U//AIVPcaKyyx2ZKCXbv29QVr2H4b6LB4O0e+1/VP3Vlp8DXMrYAwqjcR7niuVTq1aii9kelKFOjSlUT1Z2Hi6zS10qeWWRYYY8s8jNgKB1JNfF/wAWfiU3ja6ubC1untvDVi26aYnHnEf54rtfjr8df+FmSNovh66aHw5Eolur4jb5oIz0649q+P8A4i+Nf7XlXR9IRksY22BU5aRj3PqSf51+pZbl6w6+sVV7728vP1PxzMMc8RJ0KT91b+fl6dzG8e+MpPEd2LKxQx2EbbYoY/4uevua+ov2Gv2JZfinqcfi7xfavH4TtZMLC4KnUJB/Av8A0zH8TDqRtHfGV+xl+xvefGDxIuq67HJa+GrGQfa5uhlbGfIjP97puYfdB9TX60aLotj4d0m00zTLWKysLWMRQW8CBUjQDAAArlzHGey/dxfvfl/wTtwGEuuaS0LFraw2NvFb28SQQRKEjjjUKqqBgAAdBUtFFfKH0IVz1yoVtYb1X/2WuhrB1AbY9TPqp/lUT2A+UP2hFEnwi8TgkqPLQkjt+9WvCfhPcHztcaECeKTQ5G2lN/8Ay0TnaPmH1HTvXvPx2jL/AAu8RKcFGEYx/wBtUrxX4YWZS810wr839hTEgJnP7xcjI5H5EH0ryofxDr+weG+DIHm8TaUjRuY/7WRvmWQgEE+p4+tfSN5pwJzivnzwGm7xVpC/KR/aq8bX46+o4r6durZT1UH8KK26Ejvv2UbPyPiNfPjH+gsP/Hlr23Wf+QjP/vmvKf2Y4gvju9P/AE5t/wChLXq2s/8AIRm/3jWkP4Zn1KGO1YXjLxVF4a0+0WR9pl8wj8CK3vWuI+I/hc+Ib7RGJOyJJMr2JLCurDy5ZcwpLQ4K7XVfG15iN3jtWPJ7kV3/AIP+G1rpaK7RjceST1rW8P6HDpsKKACRXTwVvKo5EWQkOmwQx7QgI+lZOo+GbS4k3lRn6VvbuKqXUoVTzUcz7hZHK3vh21yOOfpRVm/uxu60U02IwdO1BUu89BmuiutWieNBmuRVY16ACpo9rSKMk8+taRrNK1g5Dt49Sj+xqCaZe+IrXS9OeaV1QKM5NczeTrbW5YtgD3rw346eLL+DR5ILaRt0nGFNawqSlKyRMopI5bx18WLrx38VrHStOZpLWOTDlenfmvp/w14btdD02Ke3hUTMgycV8+fs5/Cf7BnWNQQtdzHcWbt6CvqPRtk5ETj5V6Cn9YUU0iPZ3aZoafMZLNmlGDitPQ7VGtZJMZrP1KMW9sQny1qaH8ujufatMPX9rfyFUhy2OP8AEzK1wQp71oeFmSODDHH41zV9O01/PuPAJrK13xFLoMIMZrtlK1O5il71j1xJIz0f9a5X4ufDey+LPw71rwxdOqi+t2SKVgG8uTqj49mAryiP4pah5mNpxW9Y/Eq8ZQzKa5faRehtytH5T+P/AATqXgPxLqXh/VbZrPUtOmMckR6ZB+8p7qwwR9RXq37F+qabceLNf0i4cQaheyW7o3RmhRn8xQ3sWjYj/Yz2r2L9tvwavjDS4vG1pb4vrJBDf7RzJFn5X+qk4+h9q+IPC/iq58FeJ7LW9LmEN/ZT+YhboT0Kn1BBII9DXnYil7alKnFnp4WuqFeFVrRH6I/DnxjbxeNL7TNUhkt7iwm8mCSZ9xmQNsLMe75ycegr06a1gsNUkktI0hEg8zCDArlfhvNp/wAbPhqfEEVuLW7v5FknbHCSKO34n3rprTwfqWi2K/2nex3jLny5I8/c7Ak9TXxLbjeLR9zLkn78Wcj4ymLO7Ie9cNql7I9uYwuQcgj1rpvFl8IZSrH8a4u81BVcYG7uM1lH4rmyXu2OB1bV7LS9WWJY5ZtQVwfLtFG/2+YkAH8c1+nvwv1a61rwBod3elvtMtorM0mNx4wC2O+MZr82eINSW6VFEqvuDd85r7l/Z58dDWvh/bW12Ps9zYDyCD0dcZVh+ZH4V9Zlk4tuCPls3g/Zxl2Z111NL9slwRjce9V5NXa2IDYyT61zV74sSO5l5zhjWJfeIReTAq3SvovaR7nynKz0uHUHkUEDipnmNxC8TqCrKVOa4jTfEiJCqk9Ktaprkkmmy/ZjhyNu4dqyq14U4OUjajSlUmox3PKfGnxkt/hlpdwur2lveJas+4+aeFHAPfmvlD4uftZax8X/AA3b6PHaR6Doiu0s0NuxDXXJ2b/YDHy+ozXsnxk/Z8vviloclhJrraTE1wJ2kUbzIBn5SO4/HtXm0n7HGmWWizy3vie8maBcsLWFIwfpu3V83QxUI3qVHr0R9HiKNSaVKktOrPmjWPiNcw6KdDtysVmXLF04Y57E9x6fWvcv2X/2abnx9q0V7eZitYtsl3dKAwtkIyI0PeVx/wB8Dk84FZdv+yLp2uvM2mtrmqFDwqsgH0OEzX2B+y74J1X4T/DubQNT0g6Qi3LSwNI2Zp1bqz89RwB04x6V9jgs9lKn7Ja9m/6+4+UxWQqjL20rLyPov9n/AEmz0Hwhcadp8C21jaXkkMMSDhVUKB9T6nqSSTXqFebfAxvM8N3rdd1/Mf5V6TXlSk5SbZvFJKyCiiikUFYOqHbBqf8AuH+Vb1c/qpP2fVP9w/yqJfCB8s/G3958L9dGOSYv/RyV4j4Jul06712RxsjOgzL5u1wFPmJ1deV/HivaPjNM3/CudbU92i5/7apXhOiXk2n32rSw7RnQpVb5mRseYvRgMHp0OM+teVD+IdT+E8g+GupRz+NtEjEud2pqR/pDNnr2/wAa+sbqOvkH4W6qJfiDocZHLakucPz39zX2BdNzTrLVCPTP2Z8f8JxfjuLM9v8AaFep6t/yEJv9415f+zSQfG2of9eZ/wDQhXqGrf8AH9P/ALxq4fw0Z9Smazdal8tLLGCcN/OtH1qlq8a+TZkgZw3863p7iZTt7xhjir8epFe1VIVjH8NSSSRAfdGa1JuWJNY2rWVfawWB7VFdXEa54rGvLhWzgVVgG3eobm60VkzMzHgUVdkGhXN1jv8ArU9jc77mNc964tvEB9a0fDesfa9TVfQZrnT1LsanxJ186Jo5lU8gE14d4Vu7j4jat5lyv7iOTPPfFeifFpL7XIGstPtpLqXYcrGM1yHwr0m98NKYdQtZLSUnO2RcV2xbhSlJGD96aTPc/DqxWEEUEYUKoxxXZ2rNFtlTp3rgdIk3MDnmvQtHkCW+X5GK8l1GpHVy6E+oaxFNbhS21+mDXR6Ow/sM4P8ACa8y8T4knj8ptp3Diuy0W6kj0XYTnCV62Cindo5a19EzlZFEl7P/AL1cb8SPlWJSep/pXWWcvmX1xn+9XFfFi9S2mgVjjJr0Kn8FmEfjOUtYA7A1tQr5cYFYmnahF/eFai6hE2AHUV5NzqNIafBq1rcWd1GstrcRtFLGwyGVgQQfwNfm98e/2ddY+Ffiu5R5Iv7DuJZH02feGZ4wQcMOoIDAH9K/SXTrhCAFILH0r5g/bM8I+JfE/iDTZtN0qae1tbXZvxjLFiSAD7Y5rSi/e1JlflNH9kP9pLwr4P8ABNr4Q8QT/wBm3yyMVunwIJM4x82eD9a+mPEXjvSo9NEbXSFCNySA5BB96/JW+judJuGgvbWS1lHVJEKkfga6Pw18V9d8MQpbRX0lzpw/5dZm3KB/sk/drx8ZlPO3UovV9D3sJmaglCuvmfZfi7xlptxcvEs2eeCK5wagrJkKXX1ryTw/460vxUFaG48u6xlraY4f8PX8K9M8HzxXUwjkcCIdSegAryI4f2b5JrU+jjiFUjzQeh6B8P8AwLN4quBdLZO1rGctNKdqfTPc+wr3XSIV0XakTkDvt4HA6V698BfE3w6+IPgDTR4RudN1SC0gSG4iRVE0cgXnzEPzAk55PB7V6I3hHRJOTpVmf+2K/wCFfT0aMaSVtz43GYqriJNPRHyLqGpFpZP96oIdQOetfW8nw+8NSZ36JYnJ/wCeQqP/AIVr4W/6AVn+EdacpwHy/Z3m4jk/nXZXUgs9AgPqocn6iul+Mvg/R/D1tp1zp9pFZl3ZXWM43DA7V85+PPjBJBcSaf5INuuFWSI+nGK8/GU5yhaOp6eBlCNT33Y6rWfEKzQuDLyOAoNeceJNae6ZYrd32A/MFPBrEj1yXVpt8bEK3cV2nhXwHd+ILiPho4s5LFePrXgQpTqStY+ovGnG50Xw68J3Nr4N1TW5Huov7NikvEtbOdoZrkKjMU4IBDFcfNxmu+1PVk11tM1qzLiy1TT7a9iEn3gskSsM+9WfDHw3fRdL1iK21drm5u7V41EilUQ7SAPpzUvizQYfBOjeHtJhO6PT9Kt7NWPJIjQID+lfW06PssNFPc+Uxlb2lZroejfAVceD5T/eu5T+or0qvOfgSv8AxRKHs08p/wDHq9GrVHnrYKKKKYwrntU/1GqD/ZNdDXO6qdsGqHqdpqJ/CB8t/GS3/wCLd6zk87o//Rq188xSIl9qn71IX/sOTDNIVz+8XjOCP5H3r6J+Nkqr8MtWJbZI80CjjOf3q8V8/W6p/aWpq3AbQ5SAsqoxPmL0Vvlb8ea8qH8Q6vsnh/wrmlb4jaArXDOpvwQpuFfpnt/Wvr2+m29a+SfhPb/8XH0JsSf8f/VoowOh7gfyr7R0zwZfeK7PULm3e3trWzjaWSe5k2IABk847AfSqq6ySF0O1/ZhnX/hNNR3MATaYGT/ALQr1jVMNezHqCx5rxb9mGzW6+IF66zJP9ljkRvLY/K6sFYH6ZH517Vqn/H9N/vmrj8CM+pTxWbr8vlw2f0Y/rWo1c54wn8lbBc4+Rj/AOPVtT3CRX+2YHWq9xqGO9ZbXZbvTVV5m9a3Mh8100pwKRbdpBzV6104nkitKOx2r0plHONYn0orektRRQK585yXS464roPAMiyahO+furXH30ZhjZmcAAVb+HusRxteyGXPIH04rGn7z0OiTtufSPwj0y1vtQvZpwruGAGRnisT4+WdppQhnhRY33joKm/Z7vpL5tScvlPOIX6Vg/tOXEii1jU/emAr052jQd+xxrWoZ3hfVopgpLV3kOswx2+A+K8q8K2brZqcjOK3JJZkj5IwPevn9LndsdQ15BcXKEuCS3Fd5p8W3S2Pbaa+cW8Uyr4msrYcK0gHWvpXT0K+G9//AEyr3MDtJnFX3RwujMp1S43fd8w/zrzD9oSQ/b7IQAn5ucfSvTPDcYupLyQn5vNb+decfG2ZYNRswxC/Meprsru1BmVP4zz7T/OWFSQRV5Z5F5yajkvx9lGwjH1rF+2TzXCRRBmd2Cqo7knArxOY7+U9v+Dvh99cupb+cH7NaEbd3RnPT8uv5V1PxUa0t/Ds/mbf3hAZh1xkE/pkfjXV+CfC6+EfCFjp0hBlVN9w396RuT/h9BXnviPS4vFXiK1EkM0jXQc/ZWb92sS/dYgfxMOcE8ZA61sZ37Hn/iyDwfqFi0V9pdnqAVcmOW2QgcZ/u18lfEb4IaNq15PdaVpZtEbJzpLcr7mFiQfopH0r69+IGj6LcahFp9tG2YI/LdomMewj+EYriL34ZXLLu03XL61kHOJCsyfQhhn9aalylaNanwTq3w3vtDnWdNSj+yiTal4EZArD+Fu6MPRsH611Om+NfEuhW8mmXEC6ktxA3k6hbvgDIx8xxjjI64PI65r6I8deBdVt2nFzHZ39/ImFuIV2C4X+5NE2Q6/QkjOQO1eHz+C4r63u5NKjltprVyL7R5ifMtmHdc/eXuO+D3rVxp1F76LpynS1g7Cfs+fELUfAfiy38Q6TqLWM2lsJLtfMaMMinLI4BBKnGMd8190/Dn/gqZoXiezjfWfB1xpshbazW94JFz9Cg/nX5ja9o99d/b7+GylsjbMEnj3cXEYPD4744Nc0+s6hpMksFrdzQ20uJNkbYU55zj8a25Y2sjGTu9T9v9T/AG6vhnpvh2LVnOqXId9gt7e08xlOOpOcAfj+Feezf8FJdGk1yyt7HwTfXWm3UgjW7N8qyZJxgRhDk+24V+WPwv8AFl5P4ot9N1HUbqbTr9Wt5ImlbarMPlfHTIIHNfZXwx+FN3p3h2yvJzb6prkDMzxl9z2+Dhcdi2ADkdM+1RJKKuCSZ9GfGT42WniKWe7Qrb28MWy1hnkw/I5OACM59+1fMuq6gNTmMiOT32tyDntXS6rZgyyfbIWjmUc+ctZWnaHFrF0kWHhzkCUJhQccZ9s1hrJmiXKdz8GfDem21rfat4hmkstIjClWETSYYkAKAoJ59Pavp7wbq+iapp8TaJG0Ng6ZW4lj2yvyRnB+6OK+ctU8UQeH/AumWFy0dvHdX0Cj5eWZfM8xRnH3QiHnuwrpfhb8WNF1HVzpun6isFxDL9lGmajiKSQKB80YJyQR2IBr1aGDpJc9tSKmIqNcl9D6Z03w/HbM7xyM5kH8RzzXmvxq1DOqWcLfI4tELL6HJ/wr13wx/pOnxMVZFYcB+o9q+ff2itQNr8RBbL1+xxH8y1ceKbaszKPc9x+Ba7fAluf+mkv/AKGa9Drz/wCB3/Ig2Z9WkP8A4+a9ArAEFFFFMYVzOtsfsmqheu0101c7qXzRamP9lqmXwsD5Q+L106+CdUtpRyzxkcZ6SrzXidnF/wATLVUjkKH+wJSV+VgR5i8lWxn6gjFe0fHyO7j+H2pvaBXmE0GNzYBHnpkE89ga8NsJl1Ca+e5tykjaDI2I9kvlt5oHGef+BDFeVT+M6X8J458LbeSHx5pEmFAW8YkqijsfQ196/D/Sx4g8K6tZ+ayQLA/mRq+A6kMCreqkdq+CfhZBEnjzSW3OALtsl7fYPut1O41+iXwVVT4Y1ptm0+W6n36/41pP+IiXsS/s76VbWvjzVpY4kSTyHAMa7flZwSMDr91efavRdSP+nTH/AGjXEfs/gDxhq5PXyeP++q7bUv8Aj9l/3jRH4EJ/EV64/wAeFt+nD/pm/wD6FXXnp+Fc34wt/Ok044/5Zt/6FW9LclnMWtuZCM1u2ViFAJFNsbPGK15I/JtSR1rVkkUUkUJ29fpVi5lVYdyHIqlbWLXETuDgrzVWO4ZpHhJzV8uhHMSrKZeaKSSSO1TLsFFFShs+PfiV4kTT4TbxnMjcYHWvQ/2Z/CMd9pF1c36pLKx4WTHAryK+0V/EviSObrGr19JfCixS1010RQpUYNdeH5Y1OUibbjzHo3wl0u30HUdRt7UAQmUthTxk1wv7SSvcXtmFGcS5rv8A4cqI9QusDHz1zvxitUvL6Dcej5rTE29g7E0v4iZ5xoVxNDaKMHpVTxH4gayt2GcHFbkkkFnCAWArh/FTwXQYdR35rwYxR6NzmPC99Lq3xA05mJKCUV90RRbPCZOP+WP9K+K/AOn26+MLBkXDb/Wvt6ZfL8Itn/nl/SvawllFnDX+JHkXguQx/bDnOZ2/nXmP7Qyebqll9T/KvUvB+zZP7zH+deafHqETaxZ84xk9a6cR/AMqX8Q88sbXFuveu9+C/htNb+IWnCRcxWhN2wx12cj/AMexXKWdov2dcMRXrn7Otii+I9VnJyUtQo/Fh/hXiRirnoyloe0+Io3utPkhjO15PlDDqPU/WuK0e2aHWLi5BCxiGOJVHXcowT/L8q7S9uR5scYI3MSRnvivLfiN48bSbpbHT4/MvJf7oroOcrfEDwSdea41HTiLfVhyB0SYDsw9fevKrrxXqGnwy2i6dMt+vyvGy9DXo2j6T4huo1utRvvsiN823v8AlWm3h+w1GE+ZeyOzDaXY4YfQ0DWh83X2i+LdfuTK1qxXPCyD5f1pz/DC4kjS515bfTSufLvYnKzJj+6fb0PFe5XHw/ubrXbSOK7DaPGn7xo2/eMQejfX2rw740a1e/EHx5pngPw2pjhicxFQcBf77N+Rz9KaNFI868WeAYtSxJpk8N9qHzBvs8Z8ubAySwGQjEdicHnFfLPxA8C3Onaov2S2lZZm2QQqMkSbuYsevPFfoH8Q9H0P4K+BUGlxRNqUSfNe7AZJpOnB9M9q5Kz8H32qfCWPUo9Jht/Ef2GHWYtWto1EkDNO4IAPfYAQ2PWtuZdBP3kYXwR/Zog+H/g2DU/Eej28/i+aRZ5I7qNZTYoOUjA5CuepPXnFe4jXEW2VrOJra9UYCj7oPqB0rmdL8bTadr2jNfSvPDq2nxLctKclnHybz7nbn8a0vFWpx+GyksCefM+fLj/qfasm22CXQxPF2pN4Z0p9R1O6eWeV+I85aQnoAPWuH03xBft52t604tra1TzbbTUOV3fwmT+82cH0GOK6CWBfEVx/at9J5zR9A33Yzjkj3rP8ZeG3vofCeiQ/u5NaumnmOOUhXABPsAXP4VcYvoPY6HwJ4NtviH8OrK98SSTXFzp9/PeWfnTeWrOycMzYzjOM+wre+D/wn1Hxlq1rqOsxWMtjpUSy2GraZc75JZN3A3dSqhT165Arofh2umfG7wvY2OmXB0bSFEiL5ag74kcosZz0LKAxPvx7e0aL8G73TVtLXT72KC1iCrvUmMqox0A46DpXvQUacEmzlk7s7Xwv4qXTXSx1tlsZs7EHPlz/AN1oz2OOq9j6jmvCviNMvi74k6pqMTNJbK6wxMxz8qALkfUgn8a9c+I3jaJrVtK0hUfb8sl5jJ+if4/lXmVnppUA7a8HEVY1HaJcVbc+gfgqu3wHYj3f/wBDNd5XEfB1dvgWx/4H/wChtXb0CWwUUUUDCuav2yuqj0Vq6WuVvGy2sfRqiewHyt+0NZtqfwp1+1jdo3YxYZCQykTIRgj3Arw2OzuY5tVRoFuVGgSBl8kThR5owTk7j9RX0L8Zl/4oLUx38yEf+RlrwW6tVa91h2CjboMn7x4yQMyj+MEFT+hryofxbHX9g8C+Hqr/AMJNaFrOMJ5suT5Mi/wNxk8Cv0G+G+tT6d4TvBZpCzSM0LiXIAHzDA9818CfCtT/AMJlpgZgR9ocdWB+43TjrX3z8NbXb4R1vKq4BMgB/wB7PHvmpxE3CSaKhFS3Ok/Zykmn8Y600u3asIxtPfcc13+pHF9L/vGuB/ZpZ38Ua6HQowgU/wDjxrvtS/4/Jv8AeNaUXzUkzKatNlVvu5rM16MSLYkjojD/AMeNabZbiqOtf6uy/wBxv/QjXTT6mUijbJjHFWb3/j1NV45BH944ArM17xRa2No43hmHPWt4pyehlKSitTY0+ZILOVmOBivOdW8dWmn6w8YdWfHSq8evajrQkSDcI2OBiobP4Z77v7XcDLN1zXfGnGLfOzhdSVS3IjO1XXNT1tsQBlTrxRXodpolvYwqqoOBiip9pBaJGnsZPVs8Vh+GDaXbo9uzLIeTuBNdt4Ht5NKtZUclj6mteDUBcJztcClsR5xlOAPpVUYRU7o6Jt8tjqvh6S9xO+eS3Nc98U7aW51CII5XBPSuj+HfDzAjHzVS8cFf7SXK5rapBSptMzg7SueSX3hm6usfOxP1rIuvhzeSo370gt2r1aOZcfc/SpGmXb9zP4V56oQR0czPK/BXw8vdM8UWlxJJuRW6V9bajG3/AAiMij73lYH5V5FpciNqMA2Y+b0r2XUOPDrZ6bP6V2UYKKsjCbuzxbwnbyW8MiueTKT+tcD8ZND1HVNYtntRlVByMV61o8KknAwN1UNfjha8BdMmt6sVKlZkQfvXPDbbwxq8cIHkg/nXrH7P+m3mn6prLXMewNAgH/fRq5ttz/BineRqHk7tF1dtHujIqFzAkyOpzkMjdR9Cp968v2Kjrc6uZs7fU54rfUrUznAVyFY9t3y5/MgfjXL6Z4JNrfS3lyI571mYiRjkKM8YrD1DVvGdxbtHLpWla0YwTHc6ffG2l3EYGYJAVHr/AKztXfreJNGIbvMb4xuP86nYZm6hol1cKBHNHz13GqMfhPlRPcAjskYxmuntNOiRgfM3jHBzU01usjBlPzLyKQHn99eSp4x0TRYR5Ns8oeTHVtvIBrwD4j6FL8HfFniXV5N0utarM6Ws6fdhgdsk5P8AERgewHvX0trOin/hYGi6gBiJtyk+jY4riP2rvB7eI/AP9qQJuudPb95gc7fWguO54z8VNAk8QeD/AAAl2jLp3kST3k2cAKoDEE+pyce5FdvaeMoNF8ReD7zyY49K13SxZPER8iMhyq89sM35VjeNLeTxR+zboFxCGZbS4jWYD+6QAf1FQ/HLTEk/Z90XxNpa5fQbyKdtnZOAwPtzQV5HJfE/TUsfiK8URzFFIBEgPRTggAelaXiiTzPtkspytrb7XbtuK5x+FZ0niO08XabB4gh2y3uxWl98d6i8ZfaU8L6dYIpfU9ZmULGo+Y7jzx+VXFXdyhvg+zn1bTLO0AYm6m8xwBk7MgfrivcNL+AWqeMNS1a9llOly3Fn/Z1ncMp3WMGMMwHTewLDGRgH16WPhX4Et/ClrE0qrNqEaKskhHywAD7o9WPr2r0DVNWvNUylxcu0f/PNW2r+QrtivZrXcxlLojK8GfCf4f8AwQ8Hjw5pGqSTXTSmee4j/eyySkAEnB2rwAMCt+PXJ5rI28DzRWxGGaR9zuPT0A9hWJFpMPmBgmTV24UW9vgAisKlSrJct9BK242W1jm4C496ikaK0jwBk+tUm1Aw7jI4CjoK5XXvE2ZVRWwpbHHWuC1in3Pp34Q/8iLp59Q5/wDH2rtK4z4QrjwFpn+63/oRrs66zNbBRRRQMK5K6Pz6z/wKutrlb1cDVj/vVE9gPmT43yNH8P8AVHDbVWSE/wDkZa8UkEkcmvOsbSINBcOyI+V/ej+Je3tkfWvY/j5KV+G+tbThg9uc/wDbZa8jhVFHiOUyJG66A2N+9Qf3o43qDg/h+Irx4P8AffI7bfurngXwn8q48Z6ZGqiJmunXfG0m4ZRumTj88199/DFi3h3U41+6Qxb8AT/PFfBnwruJP+Ew0gvIGQXbcfa2k6q38JWvvr4Pqk3hjWzjcVRtp9PWoxWs4oqGzZufs4D/AIqvxAcY/cJ/6E1dvqH/AB+Tf7xrif2b/wDkaPEftFH/AOhNXa6j/wAf03+8a3ov90vUwn8ZAPumuc8ba7Do9vY+YwDNGxAz/tGui7GuD+JOgy61qGkENiJbdgf++zXbh0nJ3Oeq2o6HGX3jW81K48m1RtvrVweFby/s/OlZhnBIrpNF8K21jhtmX7nFdXDbr5ezb8vTFd/tYw+BHH7GU/jZzXg+xgtI2iZQHB4NdDcxjHFZ95p7WMm+P7p54p8WpLNiNz84/Woneb5kbU/dXKLIvyiilm6CisjY8i0+O9t1wzfgK6rwurNbSl+Tmm+RHtzsrQ8Oqi20vYZrrw8WpbmdTY2fh65W4uOeN5rlfiprFxa6pGIunNdH4LcRXlwF6bjWX4ysYr7UgZByK6JP3DKPxHAQ+J7zunFXV8R3DAZStmPQ7b0qb+xrcDpXHqdFit4a1iW51i3V1wNwzXv2qXSL4YdgQT5fH5V4RHax2MwmTqvNdLJ4ykuNMNsScYxW1OWlmZSWpc8Pq11CHAyd1cx4x1n7BqgQqTx6V3/w9FvFFiUjnpmuO+Iml2914gZkxtxx+ddFR+5oRBe8cwvihB1U/lVq18S3t80Npp+mR36FmeXLFHjwBht3QL1zVY6HB3IFXNJ0+fR7pbmyuDBKONy9x6GuF6qx0LRmtHPYrB9pUR74/wDXC3JZo+3OQDiui06+S6gSKcrNAwzFOvPy9gasyR/6Hbo9lE11doC+1du7I6mvnjxx4i8S+IfjEfD3hHUZNJ0zQY/O1Ce3AIlY9UIIIIrn8ij6INrJatmJyydQM8VIt4Y2G4FSe4NeKad8Z9Z0XT7nUNbgtpNJjfyoJFBSedycAKM4JJ6cCtTwL+0t4L8faelwLqTRi8xgWPU0EW5xwQrZKnn3pWA9b+0rdBeA7Idwz1BpNQ2alY3NndwiS3uEMcqkZBBFZ9jcW7/voZVlR8MrKQQR7VZ/tDZ6MPQ0Aec+GfAZ0Pwr4k8J3ZDWMpM9jM3QjOQPqK57wLYQajpfiTwTrC7NN1CzdSr/AMDeo/n+Fev3Ukd1GQ6qQexrjPEmgpcfvbdhHNjGW4z+NUo32KufNvw9+Ft94VkvYNSHl6RZ7mnuc5Roh/d9Seg+ten+A/Cd3rniB/GOpW/2fZEU023cDFtEf+WuD/GQPlHXkn0rq4fCcS6WbvxDdwWGgW0n2i58xwTLt6LgdRmvk+3/AGmNY+I/7WWkaPL/AMSXwzpt/PYWmmBuHco0YlkP8TscY7AEAe/oU6cYkykz7oWfTbjwn4eu9LV47a8tftB38OWLHO73HSqPLN8uSar6JD5GlzWLfL9ju5Sn+5KFmBHtukcf8Bqwt9Fb5X7x9a56k5Rk0K2hfs1Mf32+apZrWS8GFJyfaqVlci6nAXkV1+m2qpHkjmuOcmxo4TVPD8yocEk1zSeDfOm8yb5sHOK9X1jaoPArnJ5VVG7cGs73Yz2r4Up5fgXSx/0zP/oRrrq5X4YLt8E6WD/zy/qa6qupELYKKKKYwrmdQ4i1Q/71dNXN6kv+j6n9GqJ7AfKf7RTGP4S66wOCHhP/AJFWvIbaaNbHX3kl27tA+WVZmiY/vBxu+4QfQ8mvXP2jlMnwg8QKOuY//Rq14zpcclvomrJ52yRfDo3KzkZ/eDqMYx+INeLB/wC0/I9D/lxfzPFPhTtbxbppWV2/0l8BpFI+63Xjn86++PgcX/4QzWSeP3Tg+vXivgf4RyFvGGmqZI2BuX4WVWP3G5wDX338Gyq+E9dU8HY5Hp1qMV/GgEP4cjo/2b1/4qfxGT18qP8A9Caux1HP22b/AHjXI/s4/wDIw+IT/wBMo/5tXW6l/wAfk3+8a6qX8JHPP42Q+tZ2ux7lsT/0zb/0I1oHgHmqescxWP8A1zb/ANCNdVLdmUtihBHtxV+M1RjNW4z0rcgmkVZYyrDINcFrAksdaRVPyZ4rvO1cJ4olP9tRgcfMK6KO7RhV2TOhY/u0z6UU0nMSZ9KKyNz54f4vLGPvj0616r4Bvjq/ht7zsQTXy5d6PtxmM4z6V9UfCOGG3+HIU8Hyz/WuzD6tmNSWhb8Aagbq5uR/dY1zvj/xxHousCJ8dDWx8LoR59+w6GRv5mvHvjqiN4pXc2CFP860qaQM4v3jrofidbH+7VlfiRZt/dzXgcUImYKjsfoambTblWyC4/GuK50XPfoPFtvqbGOPbmprq++w2rSsjbc+ledfCnTHutfVJmYpkZBNfaWm+FdLXR4vMt42ULnlc9qcNWJq54roPjKxSGFml2f/AKq5Hxn8SNOi1QASbsL1z719Gx6b4cJKm0i4P9yrg8FeGLtA76bbPnuYxXZKTlHlZmlZ3PjdvijZtc8SfL9a7PQ/Gmn3XkZk4Zhn5vevpSf4R+Eby3kI0ezJKn5vKFfBnxQ09/C3xK1rTdOLRWkMq7FA4GVB4/OuV6Lc1ufZ+tQNa6bNdwAyXRQiJQeORgV49puh2Pwu8P6reXhWbVdUlaadurOT0X6DNHg34qXninTbA3LlbizgZZ/TKoTuP+8B/OuG0XXh4v0nV/Fuv3JTSrN2AXoMDoo9zWFjRHlHxCFxrMa+IPEV0dN0K3dorCzhOJTjqyL6nJXcemD7Vwej6VdeML+1v5LVdP0GwKra2aDCogP6+5rrtB0PVP2gPHUl/cRtDoVodsMOMIiD7qivY/8AhCLQatHZxwBNI01A847Sv1VP8fYUFHnngnwjrHw4s714NSu7O7vLhnjhimJSCIMdgC9MsPmPHcV3lt8YfEnhy1334ttWhRclnXy5D+I4/SpdS/0id5XGcnNeeeLZjd3QtIidufmpp62Cx3aftPNdW8lwvh1o1ToHuBz/AOO1jN+1Dcarqlvax+HI4YycM8lwWH5AD+deeatEsFmYEGAOKxtLsf8ASmlwfl6V0+7FpD5Tuv2nvEOp3X/CPxxyNDpVwv2iOOBiIyeOHHdgehz3r5N8UaPPb/tJQwljCdWkt5raUHHzTRKAw9xIT+Ir7E8cab/wl3wptZdu+402bH/AGH+Ir5t+MFj9k8YfCPxCineLtbKVveKdHX9Hb8q6OtzNrQ/RvwObjUvh5YanqHlnVJbWCK7kiGEeRAwJA7Elj+QrPaNZpj83fnmq/wAM9WOpeAdTgU58iRCFHbPB/wDQas21pKsm5jgVx13yzEka2lqttMNvNdZb6htirmLBAz81uxxr5XU1xyLKWs6luzXL3Wo5IX1OK1daHXGa51oC0qn0OahbiPpv4crt8GaUP+mC10tc98Pxt8IaT/17of0roa61sT0CiiimAVzmqfLaamfZq6Ouf1hcWOpfRqiWwHyx8cohcfDfVojzvkjXH/bRa8X1BdkOvjcUA0Q4xMEOfNHTIIr3D4voZPBN8g7zRf8AoYrxue6uLe18S/Z2DBtEIaPzI93+tHOx/lb88141P+PfyO+/7qx4F8I/tDeL9LBeYxtcPjfIjKTsb05NfevwjlMHgTxPI+EMatn8yf5V8G/CCSVvGGlBoFQNcudwgiXnY3defyr71+GiM3gHxMFGWZCOPrWOL0qRZdPWDR1P7OI/4nGvN6xR/wA2rqtQ/wCPyX/eNcr+znJjVtdU8YjjHPr81dPfn/TZv9412Uf4SOWfxshzVTWSfKsf+ubf+hGrWetVNZ4hseP+Wbf+hGuqluzKRSj61ajqolWY63IJ81w/iNQ2sx5H8Qrta4nxC3/E5j/3q6KPxGFbZG+3CL9KKYxyi/Sisjc+eLzR4GXoMivafA+ltD4HIVgAYzgV5FJG/vXpfh3Urm28KtGvPykCtcHJ3ZFXobHwxthHHc5HO5v5mvL/AIuaIt94k3bc4U9vevWPhnlrKZm6nNeefEhmHiJsdMf1rSvJqlczh8R5zY+G0if7uOfSups/BNzqMIa3g8xfXFUxI24D3r6C+G9tD/ZCFowTj0rzYybZ0Hl/gLwjc6XryG4hMSkjrX1fpCo2nxp1GK861C1iW+i2oqnGeBXW6Lduse3OQAK6qKfNYzk7HRw6VbNn92PWrsdjDGu0LwKybG8le4Cn7tba53VtO6e4o2ZEbdLeGTaMZBr4S+Kuipd/EzW5SAd0oP8A46K+7dRYrYzEdQpr4N8T3z3XjTV2dsn7Qw/I4rGpK0Suomi+H5vsN9HZKwurpFs4pF6J5hwzn6IHNZPxE0ceJv7C+HnhRGi0SCNZbq4A/wBYc8s3ucZror3xkfBvw/8AE9yoCTfZCY5m4EZOVJJxxw354qD9m/WoPFXwus9cjVjOs0lrK7DDNtOVb6EMPyqI3cbmmx2vhrwxYfD/AMPw6dp0K7sBRjq7etc9431qLw5ZrZowed23yMP4nNdJDr1n/wATS8eQOdOPln0RyMkfXGPzrwWfXJ/G/jDahLJ5n/1qBo7mZhY+FZL+fmR/u14p478ZQeC/Dd9rtyA8ijMcecF3PCr+dex/E6QWem6fpsZxgDcBXw/+0t41bWPEFt4cs3Lw2Z3Sqh+9Kw4H4D+dbU11G3ZXPSvh18Rm+Jmnz3DWD2UsDBJPm3IxIz8p616Jo9gGSQ4xXJfCrwavg/wbY2bKBcsvmz4H/LRgC35dPwr1HTrELY7sYJNOHvSbK6am34ImVoL3TbgfuLyFk56BuoNeUfG/watr8JJbu4i2toviG0ukfH3VL7W59MMPyFeu6HY7WRwMYIxU/wAaNDHib4PeLtFjCm4l0+SVOOsiDeo/NQPxruS0M2zuvgrbnTbrxNpsjbsIJFB6EYYg/kRXYSVxXwbWW40bw7rm4ONT0CISsOpYwpIpPrndIv8AwCuqa4OetcOJ3THHUv2LHza6O3jLR1zmlsDKCa6m1mXyxxXFIZiatZ5rJFmBk4rp9S2t0rGkI5/KpW6JZ754HXb4T0of9O0f/oIrdrG8Hrt8M6WP+naP/wBBFbNda2JCiiimAVh60v8AxLdRP+w1blY2uKTpd/j+4aiWwz5f+Ki/8Uhef9do/wD0MV41MN1r4pVdxb+xNxARZBjzOuzGR/vAjFerfFLUG/4R65tyOGlQhvowrzCVkXTvFXmxJPH/AGKMK+w8+YcEA8598GvIh/G+R2f8uz58+DuW8W6WpcMftEh+7/sH0c/yr71+F6sfA+v7RyBn2PJr4P8Ag7CR4s0tvIZB9ofDeWB/Ae4r77+EKA+C/EGemxuPxNZYpc1WJcHaDN79nRd2qa/n/nnH/Nq6O/8A+Pyb/ernv2cmDalrpBUjy06fVq6DUP8Aj8l/3jXTS/hI55/GQ1V1o/urH/rm3/oRqzu61T1r/V2P/XM/+hGuqluzKRRVulWYzVRTzVhGrcgnLVw/iH/kNx/71dpmuI8QH/idJ/vCuih8TMK2yOjJ+RfpRTM/u1z6UVkbnmBsY2TOwV2ul6ag8OnHXaaKK6MKtWZVDc8AW/k2MhxiuG8b2Mdxrjsy5IFFFXWX7uxMPiZz39kQrIpIwAa9z8DxqNFjeMcYzRRXnWsbltrOS41RZSflAI610+kryfwoorpofGY1NjpdOhG7ditZRyaKKue5UNirq3/IPn/3TXwtrGktJ4m1OQOPmuHP60UVjNXirl9TQj8M/wBrWc1lK7CK4QxvsODtPUfSpPhz4DuPhD4B1LTftIuhJcSXZkVSoAwAoAPTgD8aKKzj7qsijy/xl4lk8M/DeC03bb7WLiS+l9cMcL/46i1Z+Cehbc3Uo/et8wzRRTNOhjfG7xnBoX9ranO/7uxiYKCfvPjgD8cV8c/Bnw/N8RPiadTvgZYbeQ3twx5BcklF/P8AlRRXRtDQndpH15b23nXkcCDOSBiuxNn5aRocAD+H1oorTDr3WVI6Gzh+ywx/Lj+I1hfELxJH4e8J6ldynB8lwN3fINFFdz0izNbnpP7Kb/2v8A/Ds8i7mj01Qn0RmQfpu/Ot4xDd0oorzMR9kcepp6bGN44ro4ID5WciiiuOQ+pia5qkViMu3NcPceJpLrVLeKPhGlUH6ZoorWnFPVnPUk07I+tfCq48O6b/ANe8f/oIrWoorRGi2CiiimMKxvEDFdH1AjrsNFFRPYD5Z+J8a/8ACG3bEDJmj/8AQhXlUkPmab4rCmQv/YoO1UV8jzOcqSCfzx7UUV5FP+N8js/5dnz78G4dvivTW2qP38nS2CH7h/iDV9+/Cfcvg3xCR08ljj35ooqcR/ERUfgZp/sywzw6t4k80LtZIyu36vxXV6h/x+Tf7xoorairUUY1HebK/aqetH91Yf8AXNv/AEI0UV00t2ZSM9GqwjUUV0ED91cRr7f8TtP96iiunD/EznrfCjoM/IKKKKxOg//Z"

/***/ }),

/***/ 26:
/*!********************************************!*\
  !*** F:/工作/APP/static/img/banners/009.jpg ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "data:image/jpeg;base64,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"

/***/ }),

/***/ 27:
/*!***************************************!*\
  !*** F:/工作/APP/static/img/icon/1.jpg ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQEAYABgAAD/2wBDAAMCAgMCAgMDAwMEAwMEBQgFBQQEBQoHBwYIDAoMDAsKCwsNDhIQDQ4RDgsLEBYQERMUFRUVDA8XGBYUGBIUFRT/2wBDAQMEBAUEBQkFBQkUDQsNFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBT/wAARCAAlACUDASIAAhEBAxEB/8QAHwAAAQUBAQEBAQEAAAAAAAAAAAECAwQFBgcICQoL/8QAtRAAAgEDAwIEAwUFBAQAAAF9AQIDAAQRBRIhMUEGE1FhByJxFDKBkaEII0KxwRVS0fAkM2JyggkKFhcYGRolJicoKSo0NTY3ODk6Q0RFRkdISUpTVFVWV1hZWmNkZWZnaGlqc3R1dnd4eXqDhIWGh4iJipKTlJWWl5iZmqKjpKWmp6ipqrKztLW2t7i5usLDxMXGx8jJytLT1NXW19jZ2uHi4+Tl5ufo6erx8vP09fb3+Pn6/8QAHwEAAwEBAQEBAQEBAQAAAAAAAAECAwQFBgcICQoL/8QAtREAAgECBAQDBAcFBAQAAQJ3AAECAxEEBSExBhJBUQdhcRMiMoEIFEKRobHBCSMzUvAVYnLRChYkNOEl8RcYGRomJygpKjU2Nzg5OkNERUZHSElKU1RVVldYWVpjZGVmZ2hpanN0dXZ3eHl6goOEhYaHiImKkpOUlZaXmJmaoqOkpaanqKmqsrO0tba3uLm6wsPExcbHyMnK0tPU1dbX2Nna4uPk5ebn6Onq8vP09fb3+Pn6/9oADAMBAAIRAxEAPwD9Uq5XXPiLp+h+I9L0eSOSaW/OFliIKp820Z59R+FbPiaeS18O6pNExSWO1ldWHUEISDXzDoepeIHsoWs9LbUBbs3kXf2VpXhYnJ2sOOpzznBOa+WznNZ4CUKVNay1va+iaurea6n0uUZXHHRnVm9I6b21adnfyZ9KXPjXRYbW5mj1G1uWgieVoYJlZyFBJwM+gqLwZ40s/GmkpfWyNblmZPJlI3fLjJ46jkfnXzPpei+JNJvlu4NIvvNAYESWjsrKwIZSCOQQSPxrf8Lajq1v4+8Nw3Nm2kIk4SO3WFol2ucOcNyc+p9K8OhxLXqVYe1pOKbtaz6tWd3210PZrcO0YUp+yqqTSve66J3VvPTU+mqKKK/RT4EyfFn/ACK2sf8AXnN/6Aa+evA+n+KrrRS+j6/Bp1p5rDyZLwRndxk7a+hvFnPhfWAOT9jm/wDQDXzD4c07wpdafv1nVryyvN5HlQW+9dvY5r8+4idsZRd7e7L7XJ1XX9D7vIFzYSsrX96P2efo+n6ndf2R8QP+hutP/BgP8KyILbW7X4l+GV1vU49UmM8ZSSO4EoVd3T2qj/Yvw+/6GHUv/AT/AOtTdAs9FtfiN4dXQ764v4Dcxl2uIthVt3QeoxXzkp806a5r+9H/AJe8/VfZPoIxtCo7fZl/y65ej6n1BRRRX7Ifkg1lEilWAZSMEHvXn918C/Cl1cSSi3uId5z5cUxCj6AiiiuTEYPD4tJV4KVu6udVDFV8K26E3G/Z2Iv+FB+Ff7t5/wB//wD61a3hv4T+HvCuorfWdvK90owjzyF9me4HrRRXNTyrA0pKcKMU1tojpqZnjakXCdaTT82djRRRXqHmH//Z"

/***/ }),

/***/ 28:
/*!***************************************!*\
  !*** F:/工作/APP/static/img/icon/2.jpg ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQEAYABgAAD/2wBDAAMCAgMCAgMDAwMEAwMEBQgFBQQEBQoHBwYIDAoMDAsKCwsNDhIQDQ4RDgsLEBYQERMUFRUVDA8XGBYUGBIUFRT/2wBDAQMEBAUEBQkFBQkUDQsNFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBT/wAARCAAlACUDASIAAhEBAxEB/8QAHwAAAQUBAQEBAQEAAAAAAAAAAAECAwQFBgcICQoL/8QAtRAAAgEDAwIEAwUFBAQAAAF9AQIDAAQRBRIhMUEGE1FhByJxFDKBkaEII0KxwRVS0fAkM2JyggkKFhcYGRolJicoKSo0NTY3ODk6Q0RFRkdISUpTVFVWV1hZWmNkZWZnaGlqc3R1dnd4eXqDhIWGh4iJipKTlJWWl5iZmqKjpKWmp6ipqrKztLW2t7i5usLDxMXGx8jJytLT1NXW19jZ2uHi4+Tl5ufo6erx8vP09fb3+Pn6/8QAHwEAAwEBAQEBAQEBAQAAAAAAAAECAwQFBgcICQoL/8QAtREAAgECBAQDBAcFBAQAAQJ3AAECAxEEBSExBhJBUQdhcRMiMoEIFEKRobHBCSMzUvAVYnLRChYkNOEl8RcYGRomJygpKjU2Nzg5OkNERUZHSElKU1RVVldYWVpjZGVmZ2hpanN0dXZ3eHl6goOEhYaHiImKkpOUlZaXmJmaoqOkpaanqKmqsrO0tba3uLm6wsPExcbHyMnK0tPU1dbX2Nna4uPk5ebn6Onq8vP09fb3+Pn6/9oADAMBAAIRAxEAPwD9U653xd8QNB8D23m6vqEdu5+5Ap3Syf7qDk/yrD+OHiLUfDHw7vr3S7g2l55kUSzKASoZwDjPfFcHpPgjRPCaSr460i5nvJzlvErTvPETnIbeMNAc45I/4EaDysTi5wqOjSSva93sr3tt6eSOjh+PUdpMk+t+GtW0TRJz/o+pTxFlI9XUDK+3WvStI1qw16zS7068hvbZ+ksDh1/TvXnOsa1d+BdJS5fV7PxZ4cnG1La+lT7XIp/hicDbP9GGT615x400u/8AC1nL418I6ZeeC7ONo/Nhnl2m53MAP9H5CgZ7n8O9BxvGVsNdzfPbVq1ml3VtGvuPpqimQsWiRj1IBooPoTzP9o7/AJJbef8AXzb/APowV6ZsWSEKwDKy4IIyDXP/ABA8Fw+PvC91o09xJaLKVdZowCVZWDA4PUZFcOvi/wAbfDf934p03/hJNGTj+2NKT96i+skX9Rge5oPLqT+r4iVWonyySV97Wvv1677Gt4L8M6TY/EPxdJb6bawvbyW/klIgPK3w7m2/3cnk461X/aN/5JPqn/XSD/0atc5pfxs8NWHiTxNf2ss+qPqL2v2O0s4GaWYiEAjBHGDxz+tXb7wz40+MEHk6/wCV4V8OOyv/AGfGBLdTYORvY8L0H+FBwe1p1cNOhh1zSlzbbat2u9kev2/+oj/3R/KinIojRVHQDFFB9Eth1JRRQMy7Hwvo+l6hPfWemWlteT/62eKFVd/qQK1aKKCYxUVaKsFFFFBR/9k="

/***/ }),

/***/ 29:
/*!***************************************!*\
  !*** F:/工作/APP/static/img/icon/3.jpg ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQEAYABgAAD/2wBDAAMCAgMCAgMDAwMEAwMEBQgFBQQEBQoHBwYIDAoMDAsKCwsNDhIQDQ4RDgsLEBYQERMUFRUVDA8XGBYUGBIUFRT/2wBDAQMEBAUEBQkFBQkUDQsNFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBT/wAARCAAlACUDASIAAhEBAxEB/8QAHwAAAQUBAQEBAQEAAAAAAAAAAAECAwQFBgcICQoL/8QAtRAAAgEDAwIEAwUFBAQAAAF9AQIDAAQRBRIhMUEGE1FhByJxFDKBkaEII0KxwRVS0fAkM2JyggkKFhcYGRolJicoKSo0NTY3ODk6Q0RFRkdISUpTVFVWV1hZWmNkZWZnaGlqc3R1dnd4eXqDhIWGh4iJipKTlJWWl5iZmqKjpKWmp6ipqrKztLW2t7i5usLDxMXGx8jJytLT1NXW19jZ2uHi4+Tl5ufo6erx8vP09fb3+Pn6/8QAHwEAAwEBAQEBAQEBAQAAAAAAAAECAwQFBgcICQoL/8QAtREAAgECBAQDBAcFBAQAAQJ3AAECAxEEBSExBhJBUQdhcRMiMoEIFEKRobHBCSMzUvAVYnLRChYkNOEl8RcYGRomJygpKjU2Nzg5OkNERUZHSElKU1RVVldYWVpjZGVmZ2hpanN0dXZ3eHl6goOEhYaHiImKkpOUlZaXmJmaoqOkpaanqKmqsrO0tba3uLm6wsPExcbHyMnK0tPU1dbX2Nna4uPk5ebn6Onq8vP09fb3+Pn6/9oADAMBAAIRAxEAPwD9T7i4itYJJppFihjUu8jnCqoGSSewrm/+Fo+Dv+hp0f8A8Dov/iql+JH/ACT7xL/2Dbj/ANFtXk2jWPgbwt8JfC2q63oWnvPfxRwfapLJZSJGVjvfuVGMnHNB5eJxNSlU5IWStdt372PVP+Fo+Dv+hp0f/wADov8A4qremePPDetXiWmn6/pt7dSZ2QW92ju2Bk4AOTxXhngOCzuryyk13wn4cu9Iv9QfTYbyysBGPMAJR0Jz5kbbSM8EEV0vibwro/hn40fDwaRplrpqzfazILWIJvxHxnHXqfzoOSnjq8oKrZWul1vq0v1Pa6KKKD3zA8fW8t54H8QW8EbTTy6fOkcaDLMxjYAAdyTXG+G/B9p4k+Cvh6y1R5NOe1to7hLjhHtZUyQ/zcDHOQe2a6P4meAz8QPD4sotQuNLu4ZPPt7iByMOAQNwHUc14fefFbxr4DtLzwr4w8Pf8JEjRmIXBZl86Egg/OoO4Ed+D680HgY2tChW5q8XyONr7rvrbVGp41vru10+xSLxfo/iC3tWD20dhJb2c9lMoPlyoN+1hzhlPGDwPTotQurnxB47+Feqs0N3tjuI7u4sXEsCTmEZXcuQOQ3Ge1fM3idrXU5o30nwvNokSgl182Wfcfqw4Favwj8beJfCnia3g8PxtfNdSBX01gSk3/xJA/i7d+Kk+WhmS9vyTT5W47NvZp6XV32/I+7KKQdBRVH6QLSY9qKKADaD2rn9I8A+H9C1681iw0uC11G7GJZo1xn1wOi574xnvRRQRKnCTTkrtbHQ0UUUFn//2Q=="

/***/ }),

/***/ 3:
/*!***********************************!*\
  !*** (webpack)/buildin/global.js ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports) {

var g;

// This works in non-strict mode
g = (function() {
	return this;
})();

try {
	// This works if eval is allowed (see CSP)
	g = g || new Function("return this")();
} catch (e) {
	// This works if the window reference is available
	if (typeof window === "object") g = window;
}

// g can still be undefined, but nothing to do about it...
// We return undefined, instead of nothing here, so it's
// easier to handle this case. if(!global) { ...}

module.exports = g;


/***/ }),

/***/ 30:
/*!***************************************!*\
  !*** F:/工作/APP/static/img/icon/4.jpg ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQEAYABgAAD/2wBDAAMCAgMCAgMDAwMEAwMEBQgFBQQEBQoHBwYIDAoMDAsKCwsNDhIQDQ4RDgsLEBYQERMUFRUVDA8XGBYUGBIUFRT/2wBDAQMEBAUEBQkFBQkUDQsNFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBT/wAARCAAlACUDASIAAhEBAxEB/8QAHwAAAQUBAQEBAQEAAAAAAAAAAAECAwQFBgcICQoL/8QAtRAAAgEDAwIEAwUFBAQAAAF9AQIDAAQRBRIhMUEGE1FhByJxFDKBkaEII0KxwRVS0fAkM2JyggkKFhcYGRolJicoKSo0NTY3ODk6Q0RFRkdISUpTVFVWV1hZWmNkZWZnaGlqc3R1dnd4eXqDhIWGh4iJipKTlJWWl5iZmqKjpKWmp6ipqrKztLW2t7i5usLDxMXGx8jJytLT1NXW19jZ2uHi4+Tl5ufo6erx8vP09fb3+Pn6/8QAHwEAAwEBAQEBAQEBAQAAAAAAAAECAwQFBgcICQoL/8QAtREAAgECBAQDBAcFBAQAAQJ3AAECAxEEBSExBhJBUQdhcRMiMoEIFEKRobHBCSMzUvAVYnLRChYkNOEl8RcYGRomJygpKjU2Nzg5OkNERUZHSElKU1RVVldYWVpjZGVmZ2hpanN0dXZ3eHl6goOEhYaHiImKkpOUlZaXmJmaoqOkpaanqKmqsrO0tba3uLm6wsPExcbHyMnK0tPU1dbX2Nna4uPk5ebn6Onq8vP09fb3+Pn6/9oADAMBAAIRAxEAPwD9UiccnpWPceMNGtry1tn1CEyXLSLGVbcuY13OCw4XA55xXO/Gm6nt/A0kUEzwG7uoLWSSM4bY8gVgD7jI/Gm654b8I+A9AgvZNEVrWyYokNvHvZ2mAibKk4csCAd2aDz6tecZyjCyUUm2/N/5JnQ3njbQbKyubt9WtZIbeMyyeTKsjBR1O1SSfwFX7LWrDUpGjtbyCeVQGaOOQF1BGRleo/GvMPtXg4MtrN4CvtKiv2Wya4fS1gX94QuC6kEAk9qsfE/w7p3hn+xfEGlWkdhqsOp20RuIBtaWN22Mj4+8CPWgw+t1FF1Pdajva9/xR6pRRRQeuef/ABu/5E+2/wCwnaf+jVqX40bv+EBn2yiFvtVriQjIQ+fHzj2qz8WtDvdd8GTR6dD9pvLeeG7SDODL5bhio9yAcVz2s/FHwj4l0n7BrFhqqxsyPLazadNlWVgwVsDB5Az2NB4eKlGM6sJyUeaKSvovtFfxZHqixaSbrxbaatD/AGrZ5tYbWNGb98uDlWJ4rY+Nn/Ir6b/2FrP/ANGiubbxH8MPMgli0GW2mgmSeOW30iSN1ZWDDkLnGR071a8UeKovilJpGi6DZX8m2/hurm6uLV4YoI423HJYDJPYUHLKpTdOpFTTckkkm5P8dT12iiig+mCiiigAooooAKKKKAP/2Q=="

/***/ }),

/***/ 31:
/*!***************************************!*\
  !*** F:/工作/APP/static/img/icon/5.jpg ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQEAYABgAAD/2wBDAAMCAgMCAgMDAwMEAwMEBQgFBQQEBQoHBwYIDAoMDAsKCwsNDhIQDQ4RDgsLEBYQERMUFRUVDA8XGBYUGBIUFRT/2wBDAQMEBAUEBQkFBQkUDQsNFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBT/wAARCAAlACUDASIAAhEBAxEB/8QAHwAAAQUBAQEBAQEAAAAAAAAAAAECAwQFBgcICQoL/8QAtRAAAgEDAwIEAwUFBAQAAAF9AQIDAAQRBRIhMUEGE1FhByJxFDKBkaEII0KxwRVS0fAkM2JyggkKFhcYGRolJicoKSo0NTY3ODk6Q0RFRkdISUpTVFVWV1hZWmNkZWZnaGlqc3R1dnd4eXqDhIWGh4iJipKTlJWWl5iZmqKjpKWmp6ipqrKztLW2t7i5usLDxMXGx8jJytLT1NXW19jZ2uHi4+Tl5ufo6erx8vP09fb3+Pn6/8QAHwEAAwEBAQEBAQEBAQAAAAAAAAECAwQFBgcICQoL/8QAtREAAgECBAQDBAcFBAQAAQJ3AAECAxEEBSExBhJBUQdhcRMiMoEIFEKRobHBCSMzUvAVYnLRChYkNOEl8RcYGRomJygpKjU2Nzg5OkNERUZHSElKU1RVVldYWVpjZGVmZ2hpanN0dXZ3eHl6goOEhYaHiImKkpOUlZaXmJmaoqOkpaanqKmqsrO0tba3uLm6wsPExcbHyMnK0tPU1dbX2Nna4uPk5ebn6Onq8vP09fb3+Pn6/9oADAMBAAIRAxEAPwD9Uicc1hnxFNfyPHo9ib9V4N1LJ5Vvn0DYJb/gKke9ReKr5N9vp8sv2e2mjlubuYnAW3iA3jPbJZAfYtX53/tB/tzeJfFmr3Wi+A7t/Dfhi3Ywx3NqNlxcgcbt38C+gXBx1NeVjsfSwUeao/kt2eLmWaUcuhzVXvsluz7m0n4z22p+MNX8LRNpN14i0tgLnSbe/ZbnBUNmNZYkV+GHRsDuRXa+HvFOn+JopzZyMs9u/lXNrMpSa3fGdsiHlTjkdiOQSDmvxR0zxRr8Piy21y01G9fxCLhZorxZGedpcjBz1JPT36V+nPxB8Wat8OdD+GnxN1qBdO1iV7TSvE1rFwkkM6/NuH96KT5l9MsM4NebgM2eKjOUo2Ufyf6rqeRluePGRqTnGyhv6N/muvfofRlFIDkA0V9OfYni/wC1HdXen/DbxRc2YIlk8Oajbow6gkRMwHv5ayH/AICa+Iv2Lf2YrP44a1e674iLN4Y0mVYntUYq11MRuCEjooGCccnIFfpd4s8NWvi7QrrTLtVaOZCoLLkDIIOR3BBII7gkd6+CPBMPxI/Yb+IWrC88NXuu/DzUZiZJLAGaPYCdkqsB8kgU4IcDd+AI+WzKhH63Sr143prfy7X8j4vN8ND67RxOIi5Ulo+tuzfl3PqLwr+yJ8PvCXxQvPG9rpqtdsYzZafsVbWxKoqlo0A5YlScnoSceteL/t+fEa38Sy+GfhTosou9avtRhmuo4TkxfwxIcfxEvux6AetcX8XP21vH/j7xZeaD8JYZpNHlSNYLm10x3vizIC4IOduGLDIHbOe9d3+yT+yLrWg+Jl+I3xIMj+It7TWdjcSebIkjDmaZsnL8nAzx1PPSJ1YYq+DwMLRb96XS3W3e5nUrU8bzYDLadoyfvStZWvrbvc+y4V8uJFPJVQKKfRX1h9wFIRnrRRQAxYI4zlUVT7CpKKKACiiigD//2Q=="

/***/ }),

/***/ 32:
/*!***************************************!*\
  !*** F:/工作/APP/static/img/icon/6.jpg ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQEAYABgAAD/2wBDAAMCAgMCAgMDAwMEAwMEBQgFBQQEBQoHBwYIDAoMDAsKCwsNDhIQDQ4RDgsLEBYQERMUFRUVDA8XGBYUGBIUFRT/2wBDAQMEBAUEBQkFBQkUDQsNFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBT/wAARCAAlACUDASIAAhEBAxEB/8QAHwAAAQUBAQEBAQEAAAAAAAAAAAECAwQFBgcICQoL/8QAtRAAAgEDAwIEAwUFBAQAAAF9AQIDAAQRBRIhMUEGE1FhByJxFDKBkaEII0KxwRVS0fAkM2JyggkKFhcYGRolJicoKSo0NTY3ODk6Q0RFRkdISUpTVFVWV1hZWmNkZWZnaGlqc3R1dnd4eXqDhIWGh4iJipKTlJWWl5iZmqKjpKWmp6ipqrKztLW2t7i5usLDxMXGx8jJytLT1NXW19jZ2uHi4+Tl5ufo6erx8vP09fb3+Pn6/8QAHwEAAwEBAQEBAQEBAQAAAAAAAAECAwQFBgcICQoL/8QAtREAAgECBAQDBAcFBAQAAQJ3AAECAxEEBSExBhJBUQdhcRMiMoEIFEKRobHBCSMzUvAVYnLRChYkNOEl8RcYGRomJygpKjU2Nzg5OkNERUZHSElKU1RVVldYWVpjZGVmZ2hpanN0dXZ3eHl6goOEhYaHiImKkpOUlZaXmJmaoqOkpaanqKmqsrO0tba3uLm6wsPExcbHyMnK0tPU1dbX2Nna4uPk5ebn6Onq8vP09fb3+Pn6/9oADAMBAAIRAxEAPwD9U6gF7btcG3E0ZuFGTFvG4D1x1rC+InjJPh/4RvvEEtpLe29lseaKH7/ll1VmH+6CT+Havlb9qX4o+DNci8Oa74O1ZJPF8MyuL6wZkkig2k7XOOu4jg8jkd69LBYGpjJqKTs9L2uk/M4MVjIYWLbeq6eXkfZtQC9tzdm1E8f2oJ5hh3jeFzjdjrjPevH/ABX+0DbeC/gjoXi64WO/1PVLWJYIIWGxrho8tkjoqkNn6Yr5y+Atl8Qfi98Yj4vi1We1+zyhr7UmGY/LP/Luq9CCONvQDn0rooZXOpSqVqklGMb6vq10MK2YQhUhSprmlL8EfelFJRXinrEN5ZwahaTWtzClxbzIY5IpFDK6kYKkHqCK+cfiP+yL8PdO8P6vq9tcy6A8KGdZLm4LWseDnawxu2npwcjPHpX0bqF/Bpen3N7dSLDbW8bSyyN0VVGST+ArxrwjZa18cta/t7xVpsmmeELGfzNH0eYFTeHJ23Fwp6gDBVSMZPfGT6mCq1qF6kJuMVv5+VurPOxdOlWtTnDmk9vLzv0PlS+0m1TxdZ3HjK4uofA9u/mQaakqpPHC/MaLDnKhhhs4BKgnIbivvL4c6X4b0nwbpsXhJIF0Fo/Mt2tzuVwf4iTySe+ec9a5D47/AAH0v4x6DgBLLX7VD9ivtv8A5DfHVD+h5HcHxf8AZqk8T/C3xFB4W1G8Sb7ZqMlpc+HXVjPZBYy4u0bp5bYwccHIOc17GJqQzLCc8J2lDePT19fM8uhTll+J5ZRvGX2uvp/wD69opKK+TPpQZQykEZB4INA4oooAWmeTH5vmbF8zG3fjnHpmiigB9FFFAH//2Q=="

/***/ }),

/***/ 324:
/*!***********************************************!*\
  !*** F:/工作/APP/components/uni-icons/icons.js ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var _default = {
  'contact': "\uE100",
  'person': "\uE101",
  'personadd': "\uE102",
  'contact-filled': "\uE130",
  'person-filled': "\uE131",
  'personadd-filled': "\uE132",
  'phone': "\uE200",
  'email': "\uE201",
  'chatbubble': "\uE202",
  'chatboxes': "\uE203",
  'phone-filled': "\uE230",
  'email-filled': "\uE231",
  'chatbubble-filled': "\uE232",
  'chatboxes-filled': "\uE233",
  'weibo': "\uE260",
  'weixin': "\uE261",
  'pengyouquan': "\uE262",
  'chat': "\uE263",
  'qq': "\uE264",
  'videocam': "\uE300",
  'camera': "\uE301",
  'mic': "\uE302",
  'location': "\uE303",
  'mic-filled': "\uE332",
  'speech': "\uE332",
  'location-filled': "\uE333",
  'micoff': "\uE360",
  'image': "\uE363",
  'map': "\uE364",
  'compose': "\uE400",
  'trash': "\uE401",
  'upload': "\uE402",
  'download': "\uE403",
  'close': "\uE404",
  'redo': "\uE405",
  'undo': "\uE406",
  'refresh': "\uE407",
  'star': "\uE408",
  'plus': "\uE409",
  'minus': "\uE410",
  'circle': "\uE411",
  'checkbox': "\uE411",
  'close-filled': "\uE434",
  'clear': "\uE434",
  'refresh-filled': "\uE437",
  'star-filled': "\uE438",
  'plus-filled': "\uE439",
  'minus-filled': "\uE440",
  'circle-filled': "\uE441",
  'checkbox-filled': "\uE442",
  'closeempty': "\uE460",
  'refreshempty': "\uE461",
  'reload': "\uE462",
  'starhalf': "\uE463",
  'spinner': "\uE464",
  'spinner-cycle': "\uE465",
  'search': "\uE466",
  'plusempty': "\uE468",
  'forward': "\uE470",
  'back': "\uE471",
  'left-nav': "\uE471",
  'checkmarkempty': "\uE472",
  'home': "\uE500",
  'navigate': "\uE501",
  'gear': "\uE502",
  'paperplane': "\uE503",
  'info': "\uE504",
  'help': "\uE505",
  'locked': "\uE506",
  'more': "\uE507",
  'flag': "\uE508",
  'home-filled': "\uE530",
  'gear-filled': "\uE532",
  'info-filled': "\uE534",
  'help-filled': "\uE535",
  'more-filled': "\uE537",
  'settings': "\uE560",
  'list': "\uE562",
  'bars': "\uE563",
  'loop': "\uE565",
  'paperclip': "\uE567",
  'eye': "\uE568",
  'arrowup': "\uE580",
  'arrowdown': "\uE581",
  'arrowleft': "\uE582",
  'arrowright': "\uE583",
  'arrowthinup': "\uE584",
  'arrowthindown': "\uE585",
  'arrowthinleft': "\uE586",
  'arrowthinright': "\uE587",
  'pulldown': "\uE588",
  'closefill': "\uE589",
  'sound': "\uE590",
  'scan': "\uE612" };exports.default = _default;

/***/ }),

/***/ 33:
/*!***************************************!*\
  !*** F:/工作/APP/static/img/icon/7.jpg ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQEAYABgAAD/2wBDAAMCAgMCAgMDAwMEAwMEBQgFBQQEBQoHBwYIDAoMDAsKCwsNDhIQDQ4RDgsLEBYQERMUFRUVDA8XGBYUGBIUFRT/2wBDAQMEBAUEBQkFBQkUDQsNFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBT/wAARCAAlACUDASIAAhEBAxEB/8QAHwAAAQUBAQEBAQEAAAAAAAAAAAECAwQFBgcICQoL/8QAtRAAAgEDAwIEAwUFBAQAAAF9AQIDAAQRBRIhMUEGE1FhByJxFDKBkaEII0KxwRVS0fAkM2JyggkKFhcYGRolJicoKSo0NTY3ODk6Q0RFRkdISUpTVFVWV1hZWmNkZWZnaGlqc3R1dnd4eXqDhIWGh4iJipKTlJWWl5iZmqKjpKWmp6ipqrKztLW2t7i5usLDxMXGx8jJytLT1NXW19jZ2uHi4+Tl5ufo6erx8vP09fb3+Pn6/8QAHwEAAwEBAQEBAQEBAQAAAAAAAAECAwQFBgcICQoL/8QAtREAAgECBAQDBAcFBAQAAQJ3AAECAxEEBSExBhJBUQdhcRMiMoEIFEKRobHBCSMzUvAVYnLRChYkNOEl8RcYGRomJygpKjU2Nzg5OkNERUZHSElKU1RVVldYWVpjZGVmZ2hpanN0dXZ3eHl6goOEhYaHiImKkpOUlZaXmJmaoqOkpaanqKmqsrO0tba3uLm6wsPExcbHyMnK0tPU1dbX2Nna4uPk5ebn6Onq8vP09fb3+Pn6/9oADAMBAAIRAxEAPwD9U6Kz/EGuWnhnQ7/Vr9zFZ2UD3EzgZIVQSePwrz/wn8Y5vF2q2+jXmgah4Vu9VsnvNJuLwxyrcRgDLYU/KwDK209u9bwo1KkXOK0RjKtCElGT1Z0egfE3Q/EfjbXfC1ncb9U0dY2nXjDbuu312nAPoSK62vij4C+Arux/ae8SW0evXBuNEeaWW5eME3qmRVdXGeN2/OexANe+6f8AtBWt7rNmG8PajD4avtROlWviBmQwy3G4oBszuCllIDHvXp4zL/ZVFGg+Zcqb+a/XdLc8/C432kHKsuV3a+7/ACPWqKKK8U9Yp6vpNpr2l3enX8K3FldxNBNC2cOjAgj8jXhX7O/hK2/4Svxbd3l9fanceGtTn0LSxfXJkFraKFwFB6E9M+i4r6Bryvx38E7G/wBWvfFOg6xqfhLxEyb5rrSnylwVHHmQnhzx7Zr0MNVUYToylZS6/wBd1ocOIptyhVjG/L/X4Hifw98aaH4F/ae+J+o6/qUGmWe2dBJO33286M7VHVjgHgDtXVfCfwXY+PPiJf61p8OsQ/DqxnF/pdlfSPHby35Ys00UR58sZJAPGT+FcH8GtFuLb4heG/GvicaT4l/4TWWaBEUK09rMMsJjHjAPyEHH3d34V9oKoVQFG0DgAV7OY11h58tPdxSvfTTR2XfRq55eBouvHmnspN26666+W2gtFLRXyx9EFFFFAHKaL8KvCPh3xFNrum6BZWWrTbt1zFHg/N97A6LnvgDNdXRRVynKo7zdyIxjBWirBRRRUFn/2Q=="

/***/ }),

/***/ 34:
/*!***************************************!*\
  !*** F:/工作/APP/static/img/icon/0.png ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACUAAAAlCAIAAABK/LdUAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAJISURBVFhH7ZbPaxNREMdn9+02u21jG01FiA01pFoolnoQA15E8NaCNw9e/Nf0pIJ4EL3qQdG2eJFia1qK/ZEgNUlJGrPZfT/GedkkKmxvSw6yXwI7vNk3n5nvvmVjICKMUGb/OiolvHiV8OJVwotXCS9ejZp35vdIIRw1ZdVD1zEKk2baNvoJANrQCPB7W1GUHzeyrjnMUarpYfmn8DjkM+Zchhl/9mlF81pdfLnpv9nmImVMzrDCZfYgZy242oxAwfuafLXPay2FEtIM7hfte3mbmELBxiF/8rG7U1Wcq6kJc/XG2KOSa7Owqla0n+uH/PlG0Oyg4Oh7WDnFp1XR4rqz3bZ6XREnPtJWNKHRxWdf+cGpotRxWz3+5G9XpJCoJJy01It1/+1u0CvZVwSP2nz3jQdCx0og91SnoY5qqkwGAmy2VLMHJqNCq8iMzz8kBVvHYr+uA1Jo4y8PP+zw3kJfETwq1h3cQ2ZLjkFH+W0VLnYDFAGiRuts7wKB1BG1KGWfNNSwVKgIHj2J5dme5QhUV3E9pSPhUkpXujplGop42jH6EdJiUMzoOlfOs7RLB0Ivhq2YJizm/np6kTxmwMpiqlRkQAeQ5kBwTGOlaBfO6ZuXp9ndnMX03AASqYc7c9bSjEWpYpY9vJUad3RbNOWYbZSu2avXU7roQGe+D+0A1w74Xl05rnFz1pqfZtRHKDqiX+pyqyZp68IFcylrOYMZuIRyTazt0fuA8xfZ7YI9MfaPv8n/wXiV8OJVwotXCS9e/d88gN9atR+JmF3LpQAAAABJRU5ErkJggg=="

/***/ }),

/***/ 4:
/*!****************************!*\
  !*** F:/工作/APP/pages.json ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/***/ }),

/***/ 43:
/*!*****************************************!*\
  !*** F:/工作/APP/static/img/download.jpg ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "data:image/jpeg;base64,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"

/***/ }),

/***/ 5:
/*!*******************************************************!*\
  !*** ./node_modules/@dcloudio/uni-stat/dist/index.js ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(uni) {var _package = __webpack_require__(/*! ../package.json */ 6);function _possibleConstructorReturn(self, call) {if (call && (typeof call === "object" || typeof call === "function")) {return call;}return _assertThisInitialized(self);}function _assertThisInitialized(self) {if (self === void 0) {throw new ReferenceError("this hasn't been initialised - super() hasn't been called");}return self;}function _getPrototypeOf(o) {_getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) {return o.__proto__ || Object.getPrototypeOf(o);};return _getPrototypeOf(o);}function _inherits(subClass, superClass) {if (typeof superClass !== "function" && superClass !== null) {throw new TypeError("Super expression must either be null or a function");}subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } });if (superClass) _setPrototypeOf(subClass, superClass);}function _setPrototypeOf(o, p) {_setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) {o.__proto__ = p;return o;};return _setPrototypeOf(o, p);}function _classCallCheck(instance, Constructor) {if (!(instance instanceof Constructor)) {throw new TypeError("Cannot call a class as a function");}}function _defineProperties(target, props) {for (var i = 0; i < props.length; i++) {var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);}}function _createClass(Constructor, protoProps, staticProps) {if (protoProps) _defineProperties(Constructor.prototype, protoProps);if (staticProps) _defineProperties(Constructor, staticProps);return Constructor;}

var STAT_VERSION = _package.version;
var STAT_URL = 'https://tongji.dcloud.io/uni/stat';
var STAT_H5_URL = 'https://tongji.dcloud.io/uni/stat.gif';
var PAGE_PVER_TIME = 1800;
var APP_PVER_TIME = 300;
var OPERATING_TIME = 10;

var UUID_KEY = '__DC_STAT_UUID';
var UUID_VALUE = '__DC_UUID_VALUE';

function getUuid() {
  var uuid = '';
  if (getPlatformName() === 'n') {
    try {
      uuid = plus.runtime.getDCloudId();
    } catch (e) {
      uuid = '';
    }
    return uuid;
  }

  try {
    uuid = uni.getStorageSync(UUID_KEY);
  } catch (e) {
    uuid = UUID_VALUE;
  }

  if (!uuid) {
    uuid = Date.now() + '' + Math.floor(Math.random() * 1e7);
    try {
      uni.setStorageSync(UUID_KEY, uuid);
    } catch (e) {
      uni.setStorageSync(UUID_KEY, UUID_VALUE);
    }
  }
  return uuid;
}

var getSgin = function getSgin(statData) {
  var arr = Object.keys(statData);
  var sortArr = arr.sort();
  var sgin = {};
  var sginStr = '';
  for (var i in sortArr) {
    sgin[sortArr[i]] = statData[sortArr[i]];
    sginStr += sortArr[i] + '=' + statData[sortArr[i]] + '&';
  }
  // const options = sginStr.substr(0, sginStr.length - 1)
  // sginStr = sginStr.substr(0, sginStr.length - 1) + '&key=' + STAT_KEY;
  // const si = crypto.createHash('md5').update(sginStr).digest('hex');
  return {
    sign: '',
    options: sginStr.substr(0, sginStr.length - 1) };

};

var getSplicing = function getSplicing(data) {
  var str = '';
  for (var i in data) {
    str += i + '=' + data[i] + '&';
  }
  return str.substr(0, str.length - 1);
};

var getTime = function getTime() {
  return parseInt(new Date().getTime() / 1000);
};

var getPlatformName = function getPlatformName() {
  var platformList = {
    'app-plus': 'n',
    'h5': 'h5',
    'mp-weixin': 'wx',
    'mp-alipay': 'ali',
    'mp-baidu': 'bd',
    'mp-toutiao': 'tt',
    'mp-qq': 'qq' };

  return platformList["mp-weixin"];
};

var getPackName = function getPackName() {
  var packName = '';
  if (getPlatformName() === 'wx' || getPlatformName() === 'qq') {
    // 兼容微信小程序低版本基础库
    if (uni.canIUse('getAccountInfoSync')) {
      packName = uni.getAccountInfoSync().miniProgram.appId || '';
    }
  }
  return packName;
};

var getVersion = function getVersion() {
  return getPlatformName() === 'n' ? plus.runtime.version : '';
};

var getChannel = function getChannel() {
  var platformName = getPlatformName();
  var channel = '';
  if (platformName === 'n') {
    channel = plus.runtime.channel;
  }
  return channel;
};

var getScene = function getScene(options) {
  var platformName = getPlatformName();
  var scene = '';
  if (options) {
    return options;
  }
  if (platformName === 'wx') {
    scene = uni.getLaunchOptionsSync().scene;
  }
  return scene;
};
var First__Visit__Time__KEY = 'First__Visit__Time';
var Last__Visit__Time__KEY = 'Last__Visit__Time';

var getFirstVisitTime = function getFirstVisitTime() {
  var timeStorge = uni.getStorageSync(First__Visit__Time__KEY);
  var time = 0;
  if (timeStorge) {
    time = timeStorge;
  } else {
    time = getTime();
    uni.setStorageSync(First__Visit__Time__KEY, time);
    uni.removeStorageSync(Last__Visit__Time__KEY);
  }
  return time;
};

var getLastVisitTime = function getLastVisitTime() {
  var timeStorge = uni.getStorageSync(Last__Visit__Time__KEY);
  var time = 0;
  if (timeStorge) {
    time = timeStorge;
  } else {
    time = '';
  }
  uni.setStorageSync(Last__Visit__Time__KEY, getTime());
  return time;
};


var PAGE_RESIDENCE_TIME = '__page__residence__time';
var First_Page_residence_time = 0;
var Last_Page_residence_time = 0;


var setPageResidenceTime = function setPageResidenceTime() {
  First_Page_residence_time = getTime();
  if (getPlatformName() === 'n') {
    uni.setStorageSync(PAGE_RESIDENCE_TIME, getTime());
  }
  return First_Page_residence_time;
};

var getPageResidenceTime = function getPageResidenceTime() {
  Last_Page_residence_time = getTime();
  if (getPlatformName() === 'n') {
    First_Page_residence_time = uni.getStorageSync(PAGE_RESIDENCE_TIME);
  }
  return Last_Page_residence_time - First_Page_residence_time;
};
var TOTAL__VISIT__COUNT = 'Total__Visit__Count';
var getTotalVisitCount = function getTotalVisitCount() {
  var timeStorge = uni.getStorageSync(TOTAL__VISIT__COUNT);
  var count = 1;
  if (timeStorge) {
    count = timeStorge;
    count++;
  }
  uni.setStorageSync(TOTAL__VISIT__COUNT, count);
  return count;
};

var GetEncodeURIComponentOptions = function GetEncodeURIComponentOptions(statData) {
  var data = {};
  for (var prop in statData) {
    data[prop] = encodeURIComponent(statData[prop]);
  }
  return data;
};

var Set__First__Time = 0;
var Set__Last__Time = 0;

var getFirstTime = function getFirstTime() {
  var time = new Date().getTime();
  Set__First__Time = time;
  Set__Last__Time = 0;
  return time;
};


var getLastTime = function getLastTime() {
  var time = new Date().getTime();
  Set__Last__Time = time;
  return time;
};


var getResidenceTime = function getResidenceTime(type) {
  var residenceTime = 0;
  if (Set__First__Time !== 0) {
    residenceTime = Set__Last__Time - Set__First__Time;
  }

  residenceTime = parseInt(residenceTime / 1000);
  residenceTime = residenceTime < 1 ? 1 : residenceTime;
  if (type === 'app') {
    var overtime = residenceTime > APP_PVER_TIME ? true : false;
    return {
      residenceTime: residenceTime,
      overtime: overtime };

  }
  if (type === 'page') {
    var _overtime = residenceTime > PAGE_PVER_TIME ? true : false;
    return {
      residenceTime: residenceTime,
      overtime: _overtime };

  }

  return {
    residenceTime: residenceTime };


};

var getRoute = function getRoute() {
  var pages = getCurrentPages();
  var page = pages[pages.length - 1];
  var _self = page.$vm;

  if (getPlatformName() === 'bd') {
    return _self.$mp && _self.$mp.page.is;
  } else {
    return _self.$scope && _self.$scope.route || _self.$mp && _self.$mp.page.route;
  }
};

var getPageRoute = function getPageRoute(self) {
  var pages = getCurrentPages();
  var page = pages[pages.length - 1];
  var _self = page.$vm;
  var query = self._query;
  var str = query && JSON.stringify(query) !== '{}' ? '?' + JSON.stringify(query) : '';
  // clear
  self._query = '';
  if (getPlatformName() === 'bd') {
    return _self.$mp && _self.$mp.page.is + str;
  } else {
    return _self.$scope && _self.$scope.route + str || _self.$mp && _self.$mp.page.route + str;
  }
};

var getPageTypes = function getPageTypes(self) {
  if (self.mpType === 'page' || self.$mp && self.$mp.mpType === 'page' || self.$options.mpType === 'page') {
    return true;
  }
  return false;
};

var calibration = function calibration(eventName, options) {
  //  login 、 share 、pay_success 、pay_fail 、register 、title
  if (!eventName) {
    console.error("uni.report \u7F3A\u5C11 [eventName] \u53C2\u6570");
    return true;
  }
  if (typeof eventName !== 'string') {
    console.error("uni.report [eventName] \u53C2\u6570\u7C7B\u578B\u9519\u8BEF,\u53EA\u80FD\u4E3A String \u7C7B\u578B");
    return true;
  }
  if (eventName.length > 255) {
    console.error("uni.report [eventName] \u53C2\u6570\u957F\u5EA6\u4E0D\u80FD\u5927\u4E8E 255");
    return true;
  }

  if (typeof options !== 'string' && typeof options !== 'object') {
    console.error("uni.report [options] \u53C2\u6570\u7C7B\u578B\u9519\u8BEF,\u53EA\u80FD\u4E3A String \u6216 Object \u7C7B\u578B");
    return true;
  }

  if (typeof options === 'string' && options.length > 255) {
    console.error("uni.report [options] \u53C2\u6570\u957F\u5EA6\u4E0D\u80FD\u5927\u4E8E 255");
    return true;
  }

  if (eventName === 'title' && typeof options !== 'string') {
    console.error('uni.report [eventName] 参数为 title 时，[options] 参数只能为 String 类型');
    return true;
  }
};

var PagesJson = __webpack_require__(/*! uni-pages?{"type":"style"} */ 7).default;
var statConfig = __webpack_require__(/*! uni-stat-config */ 8).default || __webpack_require__(/*! uni-stat-config */ 8);

var resultOptions = uni.getSystemInfoSync();var

Util = /*#__PURE__*/function () {
  function Util() {_classCallCheck(this, Util);
    this.self = '';
    this._retry = 0;
    this._platform = '';
    this._query = {};
    this._navigationBarTitle = {
      config: '',
      page: '',
      report: '',
      lt: '' };

    this._operatingTime = 0;
    this._reportingRequestData = {
      '1': [],
      '11': [] };

    this.__prevent_triggering = false;

    this.__licationHide = false;
    this.__licationShow = false;
    this._lastPageRoute = '';
    this.statData = {
      uuid: getUuid(),
      ut: getPlatformName(),
      mpn: getPackName(),
      ak: statConfig.appid,
      usv: STAT_VERSION,
      v: getVersion(),
      ch: getChannel(),
      cn: '',
      pn: '',
      ct: '',
      t: getTime(),
      tt: '',
      p: resultOptions.platform === 'android' ? 'a' : 'i',
      brand: resultOptions.brand || '',
      md: resultOptions.model,
      sv: resultOptions.system.replace(/(Android|iOS)\s/, ''),
      mpsdk: resultOptions.SDKVersion || '',
      mpv: resultOptions.version || '',
      lang: resultOptions.language,
      pr: resultOptions.pixelRatio,
      ww: resultOptions.windowWidth,
      wh: resultOptions.windowHeight,
      sw: resultOptions.screenWidth,
      sh: resultOptions.screenHeight };


  }_createClass(Util, [{ key: "_applicationShow", value: function _applicationShow()

    {
      if (this.__licationHide) {
        getLastTime();
        var time = getResidenceTime('app');
        if (time.overtime) {
          var options = {
            path: this._lastPageRoute,
            scene: this.statData.sc };

          this._sendReportRequest(options);
        }
        this.__licationHide = false;
      }
    } }, { key: "_applicationHide", value: function _applicationHide(

    self, type) {

      this.__licationHide = true;
      getLastTime();
      var time = getResidenceTime();
      getFirstTime();
      var route = getPageRoute(this);
      this._sendHideRequest({
        urlref: route,
        urlref_ts: time.residenceTime },
      type);
    } }, { key: "_pageShow", value: function _pageShow()

    {
      var route = getPageRoute(this);
      var routepath = getRoute();
      this._navigationBarTitle.config = PagesJson &&
      PagesJson.pages[routepath] &&
      PagesJson.pages[routepath].titleNView &&
      PagesJson.pages[routepath].titleNView.titleText ||
      PagesJson &&
      PagesJson.pages[routepath] &&
      PagesJson.pages[routepath].navigationBarTitleText || '';

      if (this.__licationShow) {
        getFirstTime();
        this.__licationShow = false;
        // console.log('这是 onLauch 之后执行的第一次 pageShow ，为下次记录时间做准备');
        this._lastPageRoute = route;
        return;
      }

      getLastTime();
      this._lastPageRoute = route;
      var time = getResidenceTime('page');
      if (time.overtime) {
        var options = {
          path: this._lastPageRoute,
          scene: this.statData.sc };

        this._sendReportRequest(options);
      }
      getFirstTime();
    } }, { key: "_pageHide", value: function _pageHide()

    {
      if (!this.__licationHide) {
        getLastTime();
        var time = getResidenceTime('page');
        this._sendPageRequest({
          url: this._lastPageRoute,
          urlref: this._lastPageRoute,
          urlref_ts: time.residenceTime });

        this._navigationBarTitle = {
          config: '',
          page: '',
          report: '',
          lt: '' };

        return;
      }
    } }, { key: "_login", value: function _login()

    {
      this._sendEventRequest({
        key: 'login' },
      0);
    } }, { key: "_share", value: function _share()

    {
      this._sendEventRequest({
        key: 'share' },
      0);
    } }, { key: "_payment", value: function _payment(
    key) {
      this._sendEventRequest({
        key: key },
      0);
    } }, { key: "_sendReportRequest", value: function _sendReportRequest(
    options) {

      this._navigationBarTitle.lt = '1';
      var query = options.query && JSON.stringify(options.query) !== '{}' ? '?' + JSON.stringify(options.query) : '';
      this.statData.lt = '1';
      this.statData.url = options.path + query || '';
      this.statData.t = getTime();
      this.statData.sc = getScene(options.scene);
      this.statData.fvts = getFirstVisitTime();
      this.statData.lvts = getLastVisitTime();
      this.statData.tvc = getTotalVisitCount();
      if (getPlatformName() === 'n') {
        this.getProperty();
      } else {
        this.getNetworkInfo();
      }
    } }, { key: "_sendPageRequest", value: function _sendPageRequest(

    opt) {var

      url =


      opt.url,urlref = opt.urlref,urlref_ts = opt.urlref_ts;
      this._navigationBarTitle.lt = '11';
      var options = {
        ak: this.statData.ak,
        uuid: this.statData.uuid,
        lt: '11',
        ut: this.statData.ut,
        url: url,
        tt: this.statData.tt,
        urlref: urlref,
        urlref_ts: urlref_ts,
        ch: this.statData.ch,
        usv: this.statData.usv,
        t: getTime(),
        p: this.statData.p };

      this.request(options);
    } }, { key: "_sendHideRequest", value: function _sendHideRequest(

    opt, type) {var

      urlref =

      opt.urlref,urlref_ts = opt.urlref_ts;
      var options = {
        ak: this.statData.ak,
        uuid: this.statData.uuid,
        lt: '3',
        ut: this.statData.ut,
        urlref: urlref,
        urlref_ts: urlref_ts,
        ch: this.statData.ch,
        usv: this.statData.usv,
        t: getTime(),
        p: this.statData.p };

      this.request(options, type);
    } }, { key: "_sendEventRequest", value: function _sendEventRequest()



    {var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},_ref$key = _ref.key,key = _ref$key === void 0 ? '' : _ref$key,_ref$value = _ref.value,value = _ref$value === void 0 ? "" : _ref$value;
      var route = this._lastPageRoute;
      var options = {
        ak: this.statData.ak,
        uuid: this.statData.uuid,
        lt: '21',
        ut: this.statData.ut,
        url: route,
        ch: this.statData.ch,
        e_n: key,
        e_v: typeof value === 'object' ? JSON.stringify(value) : value.toString(),
        usv: this.statData.usv,
        t: getTime(),
        p: this.statData.p };

      this.request(options);
    } }, { key: "getNetworkInfo", value: function getNetworkInfo()

    {var _this = this;
      uni.getNetworkType({
        success: function success(result) {
          _this.statData.net = result.networkType;
          _this.getLocation();
        } });

    } }, { key: "getProperty", value: function getProperty()

    {var _this2 = this;
      plus.runtime.getProperty(plus.runtime.appid, function (wgtinfo) {
        _this2.statData.v = wgtinfo.version || '';
        _this2.getNetworkInfo();
      });
    } }, { key: "getLocation", value: function getLocation()

    {var _this3 = this;
      if (statConfig.getLocation) {
        uni.getLocation({
          type: 'wgs84',
          geocode: true,
          success: function success(result) {
            if (result.address) {
              _this3.statData.cn = result.address.country;
              _this3.statData.pn = result.address.province;
              _this3.statData.ct = result.address.city;
            }

            _this3.statData.lat = result.latitude;
            _this3.statData.lng = result.longitude;
            _this3.request(_this3.statData);
          } });

      } else {
        this.statData.lat = 0;
        this.statData.lng = 0;
        this.request(this.statData);
      }
    } }, { key: "request", value: function request(

    data, type) {var _this4 = this;
      var time = getTime();
      var title = this._navigationBarTitle;
      data.ttn = title.page;
      data.ttpj = title.config;
      data.ttc = title.report;

      var requestData = this._reportingRequestData;
      if (getPlatformName() === 'n') {
        requestData = uni.getStorageSync('__UNI__STAT__DATA') || {};
      }
      if (!requestData[data.lt]) {
        requestData[data.lt] = [];
      }
      requestData[data.lt].push(data);

      if (getPlatformName() === 'n') {
        uni.setStorageSync('__UNI__STAT__DATA', requestData);
      }
      if (getPageResidenceTime() < OPERATING_TIME && !type) {
        return;
      }
      var uniStatData = this._reportingRequestData;
      if (getPlatformName() === 'n') {
        uniStatData = uni.getStorageSync('__UNI__STAT__DATA');
      }
      // 时间超过，重新获取时间戳
      setPageResidenceTime();
      var firstArr = [];
      var contentArr = [];
      var lastArr = [];var _loop = function _loop(

      i) {
        var rd = uniStatData[i];
        rd.forEach(function (elm) {
          var newData = getSplicing(elm);
          if (i === 0) {
            firstArr.push(newData);
          } else if (i === 3) {
            lastArr.push(newData);
          } else {
            contentArr.push(newData);
          }
        });};for (var i in uniStatData) {_loop(i);
      }

      firstArr.push.apply(firstArr, contentArr.concat(lastArr));
      var optionsData = {
        usv: STAT_VERSION, //统计 SDK 版本号
        t: time, //发送请求时的时间戮
        requests: JSON.stringify(firstArr) };


      this._reportingRequestData = {};
      if (getPlatformName() === 'n') {
        uni.removeStorageSync('__UNI__STAT__DATA');
      }

      if (data.ut === 'h5') {
        this.imageRequest(optionsData);
        return;
      }

      if (getPlatformName() === 'n' && this.statData.p === 'a') {
        setTimeout(function () {
          _this4._sendRequest(optionsData);
        }, 200);
        return;
      }
      this._sendRequest(optionsData);
    } }, { key: "_sendRequest", value: function _sendRequest(
    optionsData) {var _this5 = this;
      uni.request({
        url: STAT_URL,
        method: 'POST',
        // header: {
        //   'content-type': 'application/json' // 默认值
        // },
        data: optionsData,
        success: function success() {
          // if (process.env.NODE_ENV === 'development') {
          //   console.log('stat request success');
          // }
        },
        fail: function fail(e) {
          if (++_this5._retry < 3) {
            setTimeout(function () {
              _this5._sendRequest(optionsData);
            }, 1000);
          }
        } });

    }
    /**
       * h5 请求
       */ }, { key: "imageRequest", value: function imageRequest(
    data) {
      var image = new Image();
      var options = getSgin(GetEncodeURIComponentOptions(data)).options;
      image.src = STAT_H5_URL + '?' + options;
    } }, { key: "sendEvent", value: function sendEvent(

    key, value) {
      // 校验 type 参数
      if (calibration(key, value)) return;

      if (key === 'title') {
        this._navigationBarTitle.report = value;
        return;
      }
      this._sendEventRequest({
        key: key,
        value: typeof value === 'object' ? JSON.stringify(value) : value },
      1);
    } }]);return Util;}();var



Stat = /*#__PURE__*/function (_Util) {_inherits(Stat, _Util);_createClass(Stat, null, [{ key: "getInstance", value: function getInstance()
    {
      if (!this.instance) {
        this.instance = new Stat();
      }
      return this.instance;
    } }]);
  function Stat() {var _this6;_classCallCheck(this, Stat);
    _this6 = _possibleConstructorReturn(this, _getPrototypeOf(Stat).call(this));
    _this6.instance = null;
    // 注册拦截器
    if (typeof uni.addInterceptor === 'function' && "development" !== 'development') {
      _this6.addInterceptorInit();
      _this6.interceptLogin();
      _this6.interceptShare(true);
      _this6.interceptRequestPayment();
    }return _this6;
  }_createClass(Stat, [{ key: "addInterceptorInit", value: function addInterceptorInit()

    {
      var self = this;
      uni.addInterceptor('setNavigationBarTitle', {
        invoke: function invoke(args) {
          self._navigationBarTitle.page = args.title;
        } });

    } }, { key: "interceptLogin", value: function interceptLogin()

    {
      var self = this;
      uni.addInterceptor('login', {
        complete: function complete() {
          self._login();
        } });

    } }, { key: "interceptShare", value: function interceptShare(

    type) {
      var self = this;
      if (!type) {
        self._share();
        return;
      }
      uni.addInterceptor('share', {
        success: function success() {
          self._share();
        },
        fail: function fail() {
          self._share();
        } });

    } }, { key: "interceptRequestPayment", value: function interceptRequestPayment()

    {
      var self = this;
      uni.addInterceptor('requestPayment', {
        success: function success() {
          self._payment('pay_success');
        },
        fail: function fail() {
          self._payment('pay_fail');
        } });

    } }, { key: "report", value: function report(

    options, self) {
      this.self = self;
      // if (process.env.NODE_ENV === 'development') {
      //   console.log('report init');
      // }
      setPageResidenceTime();
      this.__licationShow = true;
      this._sendReportRequest(options, true);
    } }, { key: "load", value: function load(

    options, self) {
      if (!self.$scope && !self.$mp) {
        var page = getCurrentPages();
        self.$scope = page[page.length - 1];
      }
      this.self = self;
      this._query = options;
    } }, { key: "show", value: function show(

    self) {
      this.self = self;
      if (getPageTypes(self)) {
        this._pageShow(self);
      } else {
        this._applicationShow(self);
      }
    } }, { key: "ready", value: function ready(

    self) {
      // this.self = self;
      // if (getPageTypes(self)) {
      //   this._pageShow(self);
      // }
    } }, { key: "hide", value: function hide(
    self) {
      this.self = self;
      if (getPageTypes(self)) {
        this._pageHide(self);
      } else {
        this._applicationHide(self, true);
      }
    } }, { key: "error", value: function error(
    em) {
      if (this._platform === 'devtools') {
        if (true) {
          console.info('当前运行环境为开发者工具，不上报数据。');
        }
        // return;
      }
      var emVal = '';
      if (!em.message) {
        emVal = JSON.stringify(em);
      } else {
        emVal = em.stack;
      }
      var options = {
        ak: this.statData.ak,
        uuid: this.statData.uuid,
        lt: '31',
        ut: this.statData.ut,
        ch: this.statData.ch,
        mpsdk: this.statData.mpsdk,
        mpv: this.statData.mpv,
        v: this.statData.v,
        em: emVal,
        usv: this.statData.usv,
        t: getTime(),
        p: this.statData.p };

      this.request(options);
    } }]);return Stat;}(Util);


var stat = Stat.getInstance();
var isHide = false;
var lifecycle = {
  onLaunch: function onLaunch(options) {
    stat.report(options, this);
  },
  onReady: function onReady() {
    stat.ready(this);
  },
  onLoad: function onLoad(options) {
    stat.load(options, this);
    // 重写分享，获取分享上报事件
    if (this.$scope && this.$scope.onShareAppMessage) {
      var oldShareAppMessage = this.$scope.onShareAppMessage;
      this.$scope.onShareAppMessage = function (options) {
        stat.interceptShare(false);
        return oldShareAppMessage.call(this, options);
      };
    }
  },
  onShow: function onShow() {
    isHide = false;
    stat.show(this);
  },
  onHide: function onHide() {
    isHide = true;
    stat.hide(this);
  },
  onUnload: function onUnload() {
    if (isHide) {
      isHide = false;
      return;
    }
    stat.hide(this);
  },
  onError: function onError(e) {
    stat.error(e);
  } };


function main() {
  if (true) {
    uni.report = function (type, options) {};
  } else { var Vue; }
}

main();
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 1)["default"]))

/***/ }),

/***/ 52:
/*!*************************************************************************************!*\
  !*** F:/工作/APP/components/an-uploadImg/js_sdk/gsq-image-tools/image-tools/index.js ***!
  \*************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.pathToBase64 = pathToBase64;exports.base64ToPath = base64ToPath;function getLocalFilePath(path) {
  if (path.indexOf('_www') === 0 || path.indexOf('_doc') === 0 || path.indexOf('_documents') === 0 || path.indexOf('_downloads') === 0) {
    return path;
  }
  if (path.indexOf('file://') === 0) {
    return path;
  }
  if (path.indexOf('/storage/emulated/0/') === 0) {
    return path;
  }
  if (path.indexOf('/') === 0) {
    var localFilePath = plus.io.convertAbsoluteFileSystem(path);
    if (localFilePath !== path) {
      return localFilePath;
    } else {
      path = path.substr(1);
    }
  }
  return '_www/' + path;
}

function pathToBase64(path) {
  return new Promise(function (resolve, reject) {
    if (typeof window === 'object' && 'document' in window) {
      if (typeof FileReader === 'function') {
        var xhr = new XMLHttpRequest();
        xhr.open('GET', path, true);
        xhr.responseType = 'blob';
        xhr.onload = function () {
          if (this.status === 200) {
            var fileReader = new FileReader();
            fileReader.onload = function (e) {
              resolve(e.target.result);
            };
            fileReader.onerror = reject;
            fileReader.readAsDataURL(this.response);
          }
        };
        xhr.onerror = reject;
        xhr.send();
        return;
      }
      var canvas = document.createElement('canvas');
      var c2x = canvas.getContext('2d');
      var img = new Image();
      img.onload = function () {
        canvas.width = img.width;
        canvas.height = img.height;
        c2x.drawImage(img, 0, 0);
        resolve(canvas.toDataURL());
        canvas.height = canvas.width = 0;
      };
      img.onerror = reject;
      img.src = path;
      return;
    }
    if (typeof plus === 'object') {
      plus.io.resolveLocalFileSystemURL(getLocalFilePath(path), function (entry) {
        entry.file(function (file) {
          var fileReader = new plus.io.FileReader();
          fileReader.onload = function (data) {
            resolve(data.target.result);
          };
          fileReader.onerror = function (error) {
            reject(error);
          };
          fileReader.readAsDataURL(file);
        }, function (error) {
          reject(error);
        });
      }, function (error) {
        reject(error);
      });
      return;
    }
    if (typeof wx === 'object' && wx.canIUse('getFileSystemManager')) {
      wx.getFileSystemManager().readFile({
        filePath: path,
        encoding: 'base64',
        success: function success(res) {
          resolve('data:image/png;base64,' + res.data);
        },
        fail: function fail(error) {
          reject(error);
        } });

      return;
    }
    reject(new Error('not support'));
  });
}

function base64ToPath(base64) {
  return new Promise(function (resolve, reject) {
    if (typeof window === 'object' && 'document' in window) {
      base64 = base64.split(',');
      var type = base64[0].match(/:(.*?);/)[1];
      var str = atob(base64[1]);
      var n = str.length;
      var array = new Uint8Array(n);
      while (n--) {
        array[n] = str.charCodeAt(n);
      }
      return resolve((window.URL || window.webkitURL).createObjectURL(new Blob([array], { type: type })));
    }
    var extName = base64.match(/data\:\S+\/(\S+);/);
    if (extName) {
      extName = extName[1];
    } else {
      reject(new Error('base64 error'));
    }
    var fileName = Date.now() + '.' + extName;
    if (typeof plus === 'object') {
      var bitmap = new plus.nativeObj.Bitmap('bitmap' + Date.now());
      bitmap.loadBase64Data(base64, function () {
        var filePath = '_doc/uniapp_temp/' + fileName;
        bitmap.save(filePath, {}, function () {
          bitmap.clear();
          resolve(filePath);
        }, function (error) {
          bitmap.clear();
          reject(error);
        });
      }, function (error) {
        bitmap.clear();
        reject(error);
      });
      return;
    }
    if (typeof wx === 'object' && wx.canIUse('getFileSystemManager')) {
      var filePath = wx.env.USER_DATA_PATH + '/' + fileName;
      wx.getFileSystemManager().writeFile({
        filePath: filePath,
        data: base64.replace(/^data:\S+\/\S+;base64,/, ''),
        encoding: 'base64',
        success: function success() {
          resolve(filePath);
        },
        fail: function fail(error) {
          reject(error);
        } });

      return;
    }
    reject(new Error('not support'));
  });
}

/***/ }),

/***/ 6:
/*!******************************************************!*\
  !*** ./node_modules/@dcloudio/uni-stat/package.json ***!
  \******************************************************/
/*! exports provided: _from, _id, _inBundle, _integrity, _location, _phantomChildren, _requested, _requiredBy, _resolved, _shasum, _spec, _where, author, bugs, bundleDependencies, deprecated, description, devDependencies, files, gitHead, homepage, license, main, name, repository, scripts, version, default */
/***/ (function(module) {

module.exports = {"_from":"@dcloudio/uni-stat@next","_id":"@dcloudio/uni-stat@2.0.0-26420200313001","_inBundle":false,"_integrity":"sha512-7dPuazTiDmUyRcw+WW+UlWGKH0eeCUB+p0P4pJVKEHjpdXnXgvDQCSdJk764NH99TfsUycnuxecP5oHckVa88g==","_location":"/@dcloudio/uni-stat","_phantomChildren":{},"_requested":{"type":"tag","registry":true,"raw":"@dcloudio/uni-stat@next","name":"@dcloudio/uni-stat","escapedName":"@dcloudio%2funi-stat","scope":"@dcloudio","rawSpec":"next","saveSpec":null,"fetchSpec":"next"},"_requiredBy":["#USER","/","/@dcloudio/vue-cli-plugin-uni"],"_resolved":"https://registry.npmjs.org/@dcloudio/uni-stat/-/uni-stat-2.0.0-26420200313001.tgz","_shasum":"a006e329e033cd412accfa635f8933dbb822a9c3","_spec":"@dcloudio/uni-stat@next","_where":"/Users/guoshengqiang/Documents/dcloud-plugins/release/uniapp-cli","author":"","bugs":{"url":"https://github.com/dcloudio/uni-app/issues"},"bundleDependencies":false,"deprecated":false,"description":"","devDependencies":{"@babel/core":"^7.5.5","@babel/preset-env":"^7.5.5","eslint":"^6.1.0","rollup":"^1.19.3","rollup-plugin-babel":"^4.3.3","rollup-plugin-clear":"^2.0.7","rollup-plugin-commonjs":"^10.0.2","rollup-plugin-copy":"^3.1.0","rollup-plugin-eslint":"^7.0.0","rollup-plugin-json":"^4.0.0","rollup-plugin-node-resolve":"^5.2.0","rollup-plugin-replace":"^2.2.0","rollup-plugin-uglify":"^6.0.2"},"files":["dist","package.json","LICENSE"],"gitHead":"b1fdbafab5dd4673cff64188a5203d0c947e4f50","homepage":"https://github.com/dcloudio/uni-app#readme","license":"Apache-2.0","main":"dist/index.js","name":"@dcloudio/uni-stat","repository":{"type":"git","url":"git+https://github.com/dcloudio/uni-app.git","directory":"packages/uni-stat"},"scripts":{"build":"NODE_ENV=production rollup -c rollup.config.js","dev":"NODE_ENV=development rollup -w -c rollup.config.js"},"version":"2.0.0-26420200313001"};

/***/ }),

/***/ 7:
/*!*********************************************!*\
  !*** F:/工作/APP/pages.json?{"type":"style"} ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var _default = { "pages": { "pages/home/home": { "navigationBarTitleText": "首页" }, "pages/index/index": { "navigationBarTitleText": "个人中心" }, "pages/news/news": { "navigationBarTitleText": "消息" }, "pages/home/works/work.1": { "navigationBarTitleText": "工单管理" }, "pages/home/works/work.2": { "navigationBarTitleText": "订单列表" }, "pages/home/works/work.3": { "navigationBarTitleText": "保养管理" }, "pages/home/works/work.4": { "navigationBarTitleText": "工作日报", "onReachBottomDistance": 500 }, "pages/home/works/work.5": { "navigationBarTitleText": "VIP客户回访" }, "pages/home/works/work.6": { "navigationBarTitleText": "保修管理" }, "pages/home/works/work.7": { "navigationBarTitleText": "零配件" }, "pages/home/works/work.8": { "navigationBarTitleText": "全部" }, "pages/home/works/detailed/Add_order": { "navigationBarTitleText": "创建日报" }, "pages/home/works/detailed/Editfile": { "navigationBarTitleText": "编辑日报" }, "pages/home/works/detailed/details": { "navigationBarTitleText": "查看日报详情" }, "pages/home/works/TEXT/Manual/Manual": { "navigationBarTitleText": "设备说明书" }, "pages/home/works/TEXT/stock/stock": { "navigationBarTitleText": "积压库存" }, "pages/Logo/Logo": { "navigationBarTitleText": "登录" }, "pages/home/works/Order/Order": { "navigationBarTitleText": "订单详情" }, "pages/home/works/one/one": { "navigationBarTitleText": "xxx", "usingComponents": {}, "usingAutoImportComponents": {} }, "pages/home/works/QRcode/code": {}, "pages/home/works/Spareparts/classification": { "navigationBarTitleText": "零配件" }, "pages/home/works/Spareparts/Navigationindetail": {}, "pages/home/works/Spareparts/drawing": {}, "pages/home/works/Spareparts/ProductDetails": { "navigationBarTitleText": "商品详情" }, "pages/home/works/Spareparts/ShoppingCart": { "navigationBarTitleText": "购物车" }, "pages/home/works/Spareparts/Buy": { "navigationBarTitleText": "确认订单" }, "pages/home/works/maintenance/maintenance": { "navigationBarTitleText": "保养" }, "pages/home/works/Spareparts/qielxr": {}, "pages/home/works/Spareparts/drawings": {} }, "globalStyle": { "navigationBarTextStyle": "black", "navigationBarTitleText": "uni-app", "navigationBarBackgroundColor": "#F8F8F8", "backgroundColor": "#F8F8F8" } };exports.default = _default;

/***/ }),

/***/ 8:
/*!********************************************!*\
  !*** F:/工作/APP/pages.json?{"type":"stat"} ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var _default = { "appid": "__UNI__FB3B110" };exports.default = _default;

/***/ })

}]);
//# sourceMappingURL=../../.sourcemap/mp-weixin/common/vendor.js.map