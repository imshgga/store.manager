'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var classCallCheck = function (instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
};

var createClass = function () {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  return function (Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);
    if (staticProps) defineProperties(Constructor, staticProps);
    return Constructor;
  };
}();

var toArray = function (arr) {
  return Array.isArray(arr) ? arr : Array.from(arr);
};

var toConsumableArray = function (arr) {
  if (Array.isArray(arr)) {
    for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) arr2[i] = arr[i];

    return arr2;
  } else {
    return Array.from(arr);
  }
};

/**
 * @Author: houshengwei
 * @Date:   2018/07/22
 * @Last modified by:   houshengwei
 * @Last modified time: 2018/07/22
 */

var StoreManager = function () {
  function StoreManager(args) {
    classCallCheck(this, StoreManager);

    this.args = args;
    this.instance = '';
    this.executing = false;
  }

  createClass(StoreManager, [{
    key: '_getType',
    value: function _getType(any) {
      return Object.prototype.toString.call(any).slice(8, -1);
    }
  }, {
    key: 'start',
    value: function start() {
      var _this = this;

      if (!this.instance) {
        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
          args[_key] = arguments[_key];
        }

        this.instance = new StoreManager(args);

        var url = window.location.href;
        var _args$ = args[0],
            $store = args[1],
            rest = args.slice(2);


        window.addEventListener('hashchange', function () {
          _this.instance && _this.instance.updateStore();
        });
        window.addEventListener('popstate', function () {
          _this.instance && _this.instance.updateStore();
        });

        $store.registerModule('_storeManage_', {
          namespaced: true,
          state: {
            version: '0.0.1',
            'MOUNTED': ''
          },
          mutations: {
            'MOUNTED': function MOUNTED(state, payload) {
              state['MOUNTED'] = payload;
            }
          }
        });
      }

      return this.instance;
    }
  }, {
    key: 'updateStore',
    value: function updateStore(url) {
      var _this2 = this;

      if (this.executing) return;

      try {
        url = url || window.location.href;
        if (!url) throw '';
      } catch (e) {
        throw new Error('非浏览器环境时,需要提供参数: 匹配对象<String>, 如url等');
      }
      this.executing = true;

      var _args = toArray(this.args),
          rules = _args[0],
          $store = _args[1],
          rest = _args.slice(2);

      var matched = [];
      var notMatched = [];
      var mounted = [];

      rules.forEach(function (item) {
        var isMatched = void 0;
        if (_this2._getType(item.rule) === 'RegExp') {
          isMatched = item.rule.test(url);
        } else if (_this2._getType(item.rule) === 'Function') {
          isMatched = item.rule.apply(item, [url].concat(toConsumableArray(_this2.args)));
        } else {
          throw new Error('Expected the `rule` to be a function or regExp.');
        }
        if (isMatched) {
          matched.push(item);
        } else {
          notMatched.push(item);
        }
      });

      matched.forEach(function (item) {
        var name = item.name,
            module = item.module;

        if (!name || !module) {
          throw new Error('Missing `name` or `module` for rules');
        }

        if (module.namespaced !== false) {
          module.namespaced = true;
        }

        if ($store.state[name] === undefined) {
          $store.registerModule(name, module);
        }

        mounted.push(name);
      });

      setTimeout(function () {
        notMatched.forEach(function (item) {
          var moduleName = item.name;
          $store.state[moduleName] && $store.unregisterModule(moduleName);
        });

        $store.commit('_storeManage_/MOUNTED', '_' + mounted.join('_') + '_');
        _this2.executing = false;
      }, 100);
    }
  }]);
  return StoreManager;
}();

var storeManager = new StoreManager();

exports.default = storeManager;
//# sourceMappingURL=store.manager.js.map
