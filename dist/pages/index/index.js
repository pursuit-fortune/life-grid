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

//index.js
//获取应用实例
var app = _index2.default.getApp();

//时间格式化
Date.prototype.Format = function (fmt) {
  //author: meizz
  var o = {
    'M+': this.getMonth() + 1, //月份
    'd+': this.getDate(), //日
    'h+': this.getHours(), //小时
    'm+': this.getMinutes(), //分
    's+': this.getSeconds(), //秒
    'q+': Math.floor((this.getMonth() + 3) / 3), //季度
    S: this.getMilliseconds() //毫秒
  };
  if (/(y+)/.test(fmt)) {
    fmt = fmt.replace(RegExp.$1, (this.getFullYear() + '').substr(4 - RegExp.$1.length));
  }for (var k in o) {
    if (new RegExp('(' + k + ')').test(fmt)) {
      fmt = fmt.replace(RegExp.$1, RegExp.$1.length == 1 ? o[k] : ('00' + o[k]).substr(('' + o[k]).length));
    }
  }return fmt;
};

var _C = (_dec = (0, _index4.default)({
  data: {
    topMargin: 70, //上边距
    leftMargin: 20, //左边距
    startDate: '1990/08/14', //起始日期  外界传入
    lifeLength: 80, //生命长度   外界传入
    //数据模型 外界传入  end字段可以不填，不填是点，填了是线
    modelArray: [{ start: '1997/08', end: '2003/06', title: '上小学', level: 0 }, { start: '2006/09', end: '2008/06', title: '上中学', level: 0 }, { start: '2009/08', end: '2013/06', title: '上大学', level: 0 }],
    bottomViewLeft: 0,
    bottomViewFlag: '收起'
  },
  //事件处理函数
  bindViewTap: function bindViewTap() {
    _index2.default.navigateTo({
      url: '../logs/logs'
    });
  },
  onLoad: function onLoad() {
    var totalIndex = this.data.lifeLength * 12;
    var current = new Date();
    var initDate = new Date(this.data.startDate);
    var curIndex = current.getFullYear() * 12 + current.getMonth() - (initDate.getFullYear() * 12 + initDate.getMonth());
    var width = _index2.default.getSystemInfoSync().windowWidth;
    var height = _index2.default.getSystemInfoSync().windowHeight;
    var maskViewWidth = width - 2 * this.data.leftMargin;
    var everywidth = maskViewWidth / 30;
    var maskViewHeight = everywidth * parseInt(totalIndex / 30);
    var size = [];
    for (var i = 0; i < totalIndex; i++) {
      var column = parseInt(i / 30);
      var row = parseInt(i % 30);
      var rowIndex = row * everywidth + this.data.leftMargin;
      if (!(size.length > 0 && size[row] != undefined && size[row].column.length > 0)) {
        var model = {
          row: rowIndex,
          column: []
        };
        size.push(model);
      }
      var zindex = i >= curIndex ? 2 : 1;

      var colModel = {
        name: column * everywidth + this.data.topMargin,
        zindex: zindex
      };
      for (var j = 0; j < size.length; j++) {
        if (size[j].row == rowIndex) {
          size[row].column.push(colModel);
          break;
        }
      }
    }
    //console.log(size);
    var modelArray = this.data.modelArray;
    var pointNum = 0; //记录第几个点
    var lineNum = 0; //记录第几个线
    var renderArray =
    //渲染模型
    {
      point: [],
      line: []
    };
    for (var j = 0; j < modelArray.length; j++) {
      var model = modelArray[j];
      var initStartDate = new Date(this.data.startDate);
      var startDate = new Date(model.start);
      var endDate = new Date(model.end);
      var initStartMonth = initStartDate.getMonth();
      var startMonth = startDate.getMonth();
      var endMonth = endDate.getMonth();
      var intervalMonth = startDate.getFullYear() * 12 + startMonth - (initStartDate.getFullYear() * 12 + initStartMonth);
      //console.log(intervalMonth);
      if (isNaN(endMonth)) {
        //绘制点
        renderArray.point[pointNum] = {
          title: '',
          show: false,
          top: 0,
          left: 0
        };
        renderArray.point[pointNum].show = true;
        renderArray.point[pointNum].title = model.title;
        var fullRow = parseInt(intervalMonth / 30);
        // var addRow = intervalMonth % 30 > 0 ? 1 : 0;
        renderArray.point[pointNum].top = this.data.topMargin + everywidth * fullRow - 7.5;
        renderArray.point[pointNum].left = this.data.leftMargin + everywidth * (intervalMonth % 30) - 7.5;
        pointNum += 1;
      } else {
        //绘制线
        renderArray.line.push({ show: false, title: model.title, images: [] });
        var startFullRow = parseInt(intervalMonth / 30);
        // var startAddRow = intervalMonth % 30 > 0 ? 1 : 0;
        var startTop = this.data.topMargin + everywidth * startFullRow;
        var startLeft = this.data.leftMargin + everywidth * (intervalMonth % 30);
        var durationMonth = endDate.getFullYear() * 12 + endMonth - (initStartDate.getFullYear() * 12 + initStartMonth);
        var endFullRow = parseInt(durationMonth / 30);
        var endTop = this.data.topMargin + everywidth * endFullRow;
        var endLeft = this.data.leftMargin + everywidth * (durationMonth % 30);
        // console.log(endTop);
        // console.log(endLeft);
        // console.log(startTop);
        // console.log(startLeft);

        if (parseInt(startTop) == parseInt(endTop)) {
          //在同一行
          renderArray.line[lineNum].images.push({
            top: 0,
            left: 0,
            width: 0,
            title: model.title
          });
          renderArray.line[lineNum].images[0].top = startTop;
          renderArray.line[lineNum].images[0].left = startLeft;
          renderArray.line[lineNum].images[0].width = endLeft - startLeft;
          renderArray.line[lineNum].images[0].title = model.title;
        } else {
          //多行
          var a = endTop / everywidth;
          var b = startTop / everywidth;
          var rowNum = Math.round((a - b) * 100) / 100 + 1;
          for (var k = 0; k < rowNum; k++) {
            renderArray.line[lineNum].images.push({
              top: 0,
              left: 0,
              width: 0,
              title: model.title
            });
            renderArray.line[lineNum].images[k].top = startTop + k * everywidth;
            if (k == 0) {
              //第一行
              renderArray.line[lineNum].images[k].left = startLeft;
              renderArray.line[lineNum].images[k].width = width - this.data.leftMargin - startLeft;
            } else if (k == rowNum - 1) {
              //最后一行
              renderArray.line[lineNum].images[k].left = this.data.leftMargin;
              renderArray.line[lineNum].images[k].width = endLeft - this.data.leftMargin;
            } else {
              //中间填充
              renderArray.line[lineNum].images[k].left = this.data.leftMargin;
              renderArray.line[lineNum].images[k].width = width - this.data.leftMargin * 2;
            }
          }
        }
        lineNum += 1;
      }
    }
    var endDate = new Date();
    endDate.setFullYear(initDate.getFullYear() + this.data.lifeLength); //注意是FullYear
    endDate.setMonth(initDate.getMonth() + 1); //由于设计缺陷，要在设置月份的时候就加1
    endDate.setDate(initDate.getDate()); //注意是Date
    var passRate = parseInt(curIndex / totalIndex * 100);

    var s1 = this.data.startDate.replace(/-/g, '/');
    var d1 = new Date(s1);
    var d2 = new Date();
    var time = d2.getTime() - d1.getTime();
    var passDay = parseInt(time / 86400000);

    this.setData({
      endDateString: endDate.Format('yyyy年M月'),
      startDateString: startDate.Format('yyyy年M月'),
      size: size,
      squareHeight: everywidth,
      squareWidth: everywidth,
      maskViewWidth: maskViewWidth,
      maskViewHeight: maskViewHeight,
      renderArray: renderArray,
      passRate: passRate,
      passDay: passDay
    });
  },
  addAction: function addAction() {
    _index2.default.navigateTo({
      url: '/pages/add/index'
    });
  },
  hideAction: function hideAction() {
    var width = _index2.default.getSystemInfoSync().windowWidth;
    if (this.data.bottomViewLeft >= width) {
      this.setData({
        bottomViewLeft: 0,
        bottomViewFlag: '收起'
      });
    } else {
      this.setData({
        bottomViewLeft: width,
        bottomViewFlag: '展开'
      });
    }
  }
}), _dec(_class = (_temp2 = _class2 = function (_Taro$Component) {
  _inherits(_C, _Taro$Component);

  function _C() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, _C);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = _C.__proto__ || Object.getPrototypeOf(_C)).call.apply(_ref, [this].concat(args))), _this), _this.$usedState = ["anonymousState__temp", "anonymousState__temp2", "anonymousState__temp3", "anonymousState__temp4", "anonymousState__temp5", "anonymousState__temp12", "anonymousState__temp13", "anonymousState__temp14", "renderArray", "loopArray1", "loopArray2", "loopArray3", "size", "squareHeight", "squareWidth", "topMargin", "leftMargin", "maskViewWidth", "maskViewHeight", "bottomViewLeft", "passDay", "passRate", "startDateString", "endDateString", "bottomViewFlag"], _this.config = {}, _this.customComponents = [], _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(_C, [{
    key: "_constructor",
    value: function _constructor(props) {
      _get(_C.prototype.__proto__ || Object.getPrototypeOf(_C.prototype), "_constructor", this).call(this, props);

      this.$$refs = [];
    }
  }, {
    key: "_createData",
    value: function _createData() {
      this.__state = arguments[0] || this.state || {};
      this.__props = arguments[1] || this.props || {};
      var __isRunloopRef = arguments[2];
      var __prefix = this.$prefix;
      ;

      var _data = this.data,
          passDay = _data.passDay,
          passRate = _data.passRate,
          startDateString = _data.startDateString,
          size = _data.size,
          squareHeight = _data.squareHeight,
          squareWidth = _data.squareWidth,
          topMargin = _data.topMargin,
          leftMargin = _data.leftMargin,
          maskViewWidth = _data.maskViewWidth,
          maskViewHeight = _data.maskViewHeight,
          renderArray = _data.renderArray,
          endDateString = _data.endDateString,
          bottomViewFlag = _data.bottomViewFlag,
          bottomViewLeft = _data.bottomViewLeft;

      var anonymousState__temp = "/pages/images/bg_image.png";
      var anonymousState__temp2 = "/pages/images/start_point.png";
      var anonymousState__temp3 = renderArray.point[0].show ? "/pages/images/start_point.png" : null;
      var anonymousState__temp4 = renderArray.point[1].show ? "/pages/images/start_point2.png" : null;
      var anonymousState__temp5 = renderArray.point[2].show ? "/pages/images/start_point3.png" : null;
      var anonymousState__temp12 = "/pages/images/gray_square.png";
      var anonymousState__temp13 = "/pages/images/color_square.png";
      var anonymousState__temp14 = "/pages/images/bg_bottom.png";
      var loopArray1 = renderArray.line[0].images.map(function (item, index) {
        item = {
          $original: (0, _index.internal_get_original)(item)
        };
        var $loopState__temp7 = "/pages/images/line.png";
        return {
          $loopState__temp7: $loopState__temp7,
          $original: item.$original
        };
      });
      var loopArray2 = renderArray.line[1].images.map(function (item, index) {
        item = {
          $original: (0, _index.internal_get_original)(item)
        };
        var $loopState__temp9 = "/pages/images/line1.png";
        return {
          $loopState__temp9: $loopState__temp9,
          $original: item.$original
        };
      });
      var loopArray3 = renderArray.line[2].images.map(function (item, index) {
        item = {
          $original: (0, _index.internal_get_original)(item)
        };
        var $loopState__temp11 = "/pages/images/line2.png";
        return {
          $loopState__temp11: $loopState__temp11,
          $original: item.$original
        };
      });
      Object.assign(this.__state, {
        anonymousState__temp: anonymousState__temp,
        anonymousState__temp2: anonymousState__temp2,
        anonymousState__temp3: anonymousState__temp3,
        anonymousState__temp4: anonymousState__temp4,
        anonymousState__temp5: anonymousState__temp5,
        anonymousState__temp12: anonymousState__temp12,
        anonymousState__temp13: anonymousState__temp13,
        anonymousState__temp14: anonymousState__temp14,
        renderArray: renderArray,
        loopArray1: loopArray1,
        loopArray2: loopArray2,
        loopArray3: loopArray3,
        size: size,
        squareHeight: squareHeight,
        squareWidth: squareWidth,
        topMargin: topMargin,
        leftMargin: leftMargin,
        maskViewWidth: maskViewWidth,
        maskViewHeight: maskViewHeight,
        bottomViewLeft: bottomViewLeft,
        passDay: passDay,
        passRate: passRate,
        startDateString: startDateString,
        endDateString: endDateString,
        bottomViewFlag: bottomViewFlag
      });
      return this.__state;
    }
  }]);

  return _C;
}(_index2.default.Component), _class2.$$events = ["hideAction", "addAction"], _class2.multipleSlots = true, _class2.$$componentPath = "pages/index/index", _temp2)) || _class);

exports.default = _C;

Component(require('../../npm/@tarojs/taro-weapp/index.js').default.createComponent(_C, true));