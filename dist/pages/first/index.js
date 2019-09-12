"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _dec, _class, _class2, _temp2;

var _index = require("../../npm/@tarojs/taro-weapp/index.js");

var _index2 = _interopRequireDefault(_index);

var _index3 = require("../../npm/@tarojs/with-weapp/index.js");

var _index4 = _interopRequireDefault(_index3);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var today = new Date();
var end = today.getFullYear() + "-" + ('0' + (today.getMonth() + 1)).slice(-2) + "-" + ('0' + today.getDate()).slice(-2);

var _C = (_dec = (0, _index4.default)('Page'), _dec(_class = (_temp2 = _class2 = function (_Taro$Component) {
  _inherits(_C, _Taro$Component);

  function _C() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, _C);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = _C.__proto__ || Object.getPrototypeOf(_C)).call.apply(_ref, [this].concat(args))), _this), _this.$usedState = ["anonymousState__temp", "anonymousState__temp2", "date", "end", "age", "value", "timePickerStatus"], _this.state = {
      date: '',
      age: '',
      value: [9999, 1, 1],
      timePickerStatus: false,
      end: end
    }, _this.config = {}, _this.customComponents = [], _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(_C, [{
    key: "_constructor",
    value: function _constructor(props) {
      _get(_C.prototype.__proto__ || Object.getPrototypeOf(_C.prototype), "_constructor", this).call(this, props);

      this.$$refs = [];
    }
  }, {
    key: "componentDidShow",
    value: function componentDidShow() {
      var age = _index2.default.getStorageSync('age');
      var date = _index2.default.getStorageSync('date');
      this.setData({
        age: age,
        date: date
      });
    }
  }, {
    key: "bindDateChange",
    value: function bindDateChange(e) {
      this.setData({
        date: e.detail.value
      });
      _index2.default.setStorageSync('date', e.detail.value);
    }
  }, {
    key: "ageChange",
    value: function ageChange(e) {
      var value = e.detail.value;

      if (value > 999) {
        _index2.default.showToast({
          title: '妖孽,上天准你活这么久了吗?',
          icon: 'none'
        });
      }
      this.setData({
        age: Math.min(value, 999)
      });
    }
  }, {
    key: "nextAction",
    value: function nextAction() {
      if (!this.data.age || !this.data.date) {
        _index2.default.showToast({
          title: '有些东西还没有输入啊',
          icon: 'none'
        });
        return;
      }
      _index2.default.setStorageSync('age', this.data.age);
      _index2.default.setStorageSync('date', this.data.date);
      _index2.default.navigateTo({
        url: '../index/index'
      });
    }
  }, {
    key: "_createData",
    value: function _createData() {
      this.__state = arguments[0] || this.state || {};
      this.__props = arguments[1] || this.props || {};
      var __isRunloopRef = arguments[2];
      var __prefix = this.$prefix;
      ;

      var _state = this.__state,
          date = _state.date,
          end = _state.end,
          age = _state.age;

      console.log(this);
      var anonymousState__temp = "/pages/images/first_title.png";
      var anonymousState__temp2 = "/pages/images/next_btn.png";
      Object.assign(this.__state, {
        anonymousState__temp: anonymousState__temp,
        anonymousState__temp2: anonymousState__temp2
      });
      return this.__state;
    }
  }]);

  return _C;
}(_index2.default.Component), _class2.$$events = ["bindDateChange", "ageChange", "nextAction"], _class2.$$componentPath = "pages/first/index", _temp2)) || _class);

exports.default = _C;

Component(require('../../npm/@tarojs/taro-weapp/index.js').default.createComponent(_C, true));