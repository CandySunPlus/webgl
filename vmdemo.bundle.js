/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var vm_1 = __webpack_require__(2);
	var vm = vm_1.default({
	    info: {
	        name: 'niksun',
	        age: undefined
	    }
	}, {
	    container: document.body,
	    binder: {
	        'info.name': '.name-input' // vm key path -> element selector
	    }
	});
	console.log(vm.info.name);
	vm.info.name = 'candysfm';
	console.log(vm.info.name);
	vm.info.age = 20;
	console.log(vm.info.age);


/***/ },
/* 1 */,
/* 2 */
/***/ function(module, exports) {

	"use strict";
	var VM = (function () {
	    function VM(__object, __bind) {
	        this.__object = __object;
	        this.__bind = __bind;
	        this.__isReady = false;
	        if (!Function.bind || !Object.defineProperty) {
	            throw new Error('Required APIs not available.');
	        }
	        this.__object = this.bind(__object);
	        this.__isReady = true;
	    }
	    Object.defineProperty(VM.prototype, "proxyModel", {
	        get: function () {
	            return this.__object;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    VM.prototype.bind = function (object, path) {
	        var _this = this;
	        if (path === void 0) { path = []; }
	        var _loop_1 = function (key) {
	            var value = object[key], _path = [].slice.apply(path);
	            _path.push(key);
	            var _pathName = _path.join('.');
	            Object.defineProperty(object, key, {
	                configurable: true,
	                enumerable: true,
	                set: function (v) {
	                    if (_this.__isReady) {
	                        if (Object.prototype.toString.apply(v) === '[object Object]') {
	                            value = _this.bind(v, _path);
	                        }
	                        else {
	                            value = v;
	                        }
	                        if (_this.__bind.binder.hasOwnProperty(_pathName)) {
	                            var els = _this.__bind.container.querySelectorAll(_this.__bind.binder[_pathName]);
	                            for (var _i = 0, els_1 = els; _i < els_1.length; _i++) {
	                                var el = els_1[_i];
	                                if (el.nodeName === 'INPUT' || el.nodeName === 'TEXTAREA') {
	                                    el.value = value;
	                                }
	                                else {
	                                    el.innerHTML = value;
	                                }
	                            }
	                        }
	                        console.log("set key " + _pathName + " value " + JSON.stringify(value));
	                    }
	                },
	                get: function () { return value; }
	            });
	            if (!this_1.__isReady) {
	                if (Object.prototype.toString.apply(value) === '[object Object]') {
	                    object[key] = this_1.bind(value, _path);
	                }
	                if (this_1.__bind.binder.hasOwnProperty(_pathName)) {
	                    var els = this_1.__bind.container.querySelectorAll(this_1.__bind.binder[_pathName]);
	                    var _loop_2 = function (el) {
	                        if (el.nodeName === 'INPUT' || el.nodeName === 'TEXTAREA') {
	                            el.addEventListener('input', function () {
	                                object[key] = el.value;
	                            });
	                        }
	                    };
	                    for (var _i = 0, els_2 = els; _i < els_2.length; _i++) {
	                        var el = els_2[_i];
	                        _loop_2(el);
	                    }
	                }
	            }
	        };
	        var this_1 = this;
	        for (var _i = 0, _a = Object.keys(object); _i < _a.length; _i++) {
	            var key = _a[_i];
	            _loop_1(key);
	        }
	        return object;
	    };
	    return VM;
	}());
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.default = function (object, bind) {
	    var vm = new VM(object, bind);
	    return vm.proxyModel;
	};


/***/ }
/******/ ]);