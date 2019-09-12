import { Block, View, Image, Text, Label, Button } from '@tarojs/components'
import Taro from '@tarojs/taro'
import withWeapp from '@tarojs/with-weapp'
import './index.scss'
//index.js
//获取应用实例
const app = Taro.getApp()

//时间格式化
Date.prototype.Format = function(fmt) {
  //author: meizz
  let o = {
    'M+': this.getMonth() + 1, //月份
    'd+': this.getDate(), //日
    'h+': this.getHours(), //小时
    'm+': this.getMinutes(), //分
    's+': this.getSeconds(), //秒
    'q+': Math.floor((this.getMonth() + 3) / 3), //季度
    S: this.getMilliseconds() //毫秒
  }
  if (/(y+)/.test(fmt))
    fmt = fmt.replace(
      RegExp.$1,
      (this.getFullYear() + '').substr(4 - RegExp.$1.length)
    )
  for (let k in o)
    if (new RegExp('(' + k + ')').test(fmt))
      fmt = fmt.replace(
        RegExp.$1,
        RegExp.$1.length == 1 ? o[k] : ('00' + o[k]).substr(('' + o[k]).length)
      )
  return fmt
}

@withWeapp({
  data: {
    topMargin: 70, //上边距
    leftMargin: 20, //左边距
    startDate: '1990/08/14', //起始日期  外界传入
    lifeLength: 80, //生命长度   外界传入
    //数据模型 外界传入  end字段可以不填，不填是点，填了是线
    modelArray: [
      { start: '1997/08', end: '2003/06', title: '上小学', level: 0 },
      { start: '2006/09', end: '2008/06', title: '上中学', level: 0 },
      { start: '2009/08', end: '2013/06', title: '上大学', level: 0 }
    ],
    bottomViewLeft: 0,
    bottomViewFlag: '收起',
    renderArray: {
      point: [],
      line: []
    }
  },
  //事件处理函数
  bindViewTap: function() {
    Taro.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function() {
    var totalIndex = this.data.lifeLength * 12
    var current = new Date()
    var initDate = new Date(this.data.startDate)
    var curIndex =
      current.getFullYear() * 12 +
      current.getMonth() -
      (initDate.getFullYear() * 12 + initDate.getMonth())
    var width = Taro.getSystemInfoSync().windowWidth
    var height = Taro.getSystemInfoSync().windowHeight
    var maskViewWidth = width - 2 * this.data.leftMargin
    var everywidth = maskViewWidth / 30
    var maskViewHeight = everywidth * parseInt(totalIndex / 30)
    var size = []
    for (var i = 0; i < totalIndex; i++) {
      var column = parseInt(i / 30)
      var row = parseInt(i % 30)
      var rowIndex = row * everywidth + this.data.leftMargin
      if (
        !(
          size.length > 0 &&
          size[row] != undefined &&
          size[row].column.length > 0
        )
      ) {
        var model = {
          row: rowIndex,
          column: []
        }
        size.push(model)
      }
      var zindex = i >= curIndex ? 2 : 1

      var colModel = {
        name: column * everywidth + this.data.topMargin,
        zindex: zindex
      }
      for (var j = 0; j < size.length; j++) {
        if (size[j].row == rowIndex) {
          size[row].column.push(colModel)
          break
        }
      }
    }
    //console.log(size);
    var modelArray = this.data.modelArray
    var pointNum = 0 //记录第几个点
    var lineNum = 0 //记录第几个线
    var renderArray =
      //渲染模型
      {
        point: [],
        line: []
      }
    for (var j = 0; j < modelArray.length; j++) {
      var model = modelArray[j]
      var initStartDate = new Date(this.data.startDate)
      var startDate = new Date(model.start)
      var endDate = new Date(model.end)
      var initStartMonth = initStartDate.getMonth()
      var startMonth = startDate.getMonth()
      var endMonth = endDate.getMonth()
      var intervalMonth =
        startDate.getFullYear() * 12 +
        startMonth -
        (initStartDate.getFullYear() * 12 + initStartMonth)
      //console.log(intervalMonth);
      if (isNaN(endMonth)) {
        //绘制点
        renderArray.point[pointNum] = {
          title: '',
          show: false,
          top: 0,
          left: 0
        }
        renderArray.point[pointNum].show = true
        renderArray.point[pointNum].title = model.title
        var fullRow = parseInt(intervalMonth / 30)
        // var addRow = intervalMonth % 30 > 0 ? 1 : 0;
        renderArray.point[pointNum].top =
          this.data.topMargin + everywidth * fullRow - 7.5
        renderArray.point[pointNum].left =
          this.data.leftMargin + everywidth * (intervalMonth % 30) - 7.5
        pointNum += 1
      } else {
        //绘制线
        renderArray.line.push({ show: false, title: model.title, images: [] })
        var startFullRow = parseInt(intervalMonth / 30)
        // var startAddRow = intervalMonth % 30 > 0 ? 1 : 0;
        var startTop = this.data.topMargin + everywidth * startFullRow
        var startLeft = this.data.leftMargin + everywidth * (intervalMonth % 30)
        var durationMonth =
          endDate.getFullYear() * 12 +
          endMonth -
          (initStartDate.getFullYear() * 12 + initStartMonth)
        var endFullRow = parseInt(durationMonth / 30)
        var endTop = this.data.topMargin + everywidth * endFullRow
        var endLeft = this.data.leftMargin + everywidth * (durationMonth % 30)

        if (parseInt(startTop) == parseInt(endTop)) {
          //在同一行
          renderArray.line[lineNum].images.push({
            top: 0,
            left: 0,
            width: 0,
            title: model.title
          })
          renderArray.line[lineNum].images[0].top = startTop
          renderArray.line[lineNum].images[0].left = startLeft
          renderArray.line[lineNum].images[0].width = endLeft - startLeft
          renderArray.line[lineNum].images[0].title = model.title
        } else {
          //多行
          var a = endTop / everywidth
          var b = startTop / everywidth
          var rowNum = Math.round((a - b) * 100) / 100 + 1
          for (var k = 0; k < rowNum; k++) {
            renderArray.line[lineNum].images.push({
              top: 0,
              left: 0,
              width: 0,
              title: model.title
            })
            renderArray.line[lineNum].images[k].top = startTop + k * everywidth
            if (k == 0) {
              //第一行
              renderArray.line[lineNum].images[k].left = startLeft
              renderArray.line[lineNum].images[k].width =
                width - this.data.leftMargin - startLeft
            } else if (k == rowNum - 1) {
              //最后一行
              renderArray.line[lineNum].images[k].left = this.data.leftMargin
              renderArray.line[lineNum].images[k].width =
                endLeft - this.data.leftMargin
            } else {
              //中间填充
              renderArray.line[lineNum].images[k].left = this.data.leftMargin
              renderArray.line[lineNum].images[k].width =
                width - this.data.leftMargin * 2
            }
          }
        }
        lineNum += 1
      }
    }
    var endDate = new Date()
    endDate.setFullYear(initDate.getFullYear() + this.data.lifeLength) //注意是FullYear
    endDate.setMonth(initDate.getMonth() + 1) //由于设计缺陷，要在设置月份的时候就加1
    endDate.setDate(initDate.getDate()) //注意是Date
    var passRate = parseInt((curIndex / totalIndex) * 100)

    var s1 = this.data.startDate.replace(/-/g, '/')
    var d1 = new Date(s1)
    var d2 = new Date()
    var time = d2.getTime() - d1.getTime()
    var passDay = parseInt(time / (1000 * 60 * 60 * 24))

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
    })
  },
  addAction: function() {
    Taro.navigateTo({
      url: '/pages/add/index'
    })
  },
  hideAction: function() {
    var width = Taro.getSystemInfoSync().windowWidth
    if (this.data.bottomViewLeft >= width) {
      this.setData({
        bottomViewLeft: 0,
        bottomViewFlag: '收起'
      })
    } else {
      this.setData({
        bottomViewLeft: width,
        bottomViewFlag: '展开'
      })
    }
  }
})
class _C extends Taro.Component {
  config = {}

  render() {
    const {
      passDay,
      passRate,
      startDateString,
      size,
      squareHeight,
      squareWidth,
      topMargin,
      leftMargin,
      maskViewWidth,
      maskViewHeight,
      renderArray,
      endDateString,
      bottomViewFlag,
      bottomViewLeft
    } = this.data
    return (
      <View className="bgView">
        <Image
          className="bgViewImage"
          src={require('../images/bg_image.png')}
        ></Image>
        <View className="topView">
          <Image
            src={require('../images/start_point.png')}
            mode="scaleToFill"
          ></Image>
          <Text className="topViewName">MrHello</Text>
          <Text className="topViewLabelDay" decode={true} space={true}>
            出生的第&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;天
          </Text>
          <Text className="topViewNumDay">{passDay}</Text>
          <Text className="topViewLabel" decode={true} space={true}>
            生命已经过了&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;%
          </Text>
          <Text className="topViewNum">{passRate}</Text>
        </View>
        <View className="topStartView">
          <Text className="topViewTime">{startDateString}</Text>
        </View>
        {size.map((item, outIndex) => {
          return (
            <View key="id">
              {item.column.map((columnitem, inIndex) => {
                return (
                  <View key="id">
                    <Label
                      style={
                        'position:fixed;top:' +
                        columnitem.name +
                        'px;left:' +
                        item.row +
                        'px;height:' +
                        squareHeight +
                        'px;width:' +
                        squareWidth +
                        'px;background:#C9C5BA;z-index:' +
                        columnitem.zindex +
                        ';box-shadow:1px 1px 4px 0px rgba(0,0,0,0.5);'
                      }
                    ></Label>
                  </View>
                )
              })}
            </View>
          )
        })}
        <View
          className="maskView"
          style={
            'top:' +
            topMargin +
            'px;left:' +
            leftMargin +
            'px;width:' +
            maskViewWidth +
            'px;height:' +
            maskViewHeight +
            'px;'
          }
        ></View>
        {renderArray.point[0] && renderArray.point[0].show && (
          <View
            className="startImage0"
            style={
              'top:' +
              renderArray.point[0].top +
              'px;left:' +
              renderArray.point[0].left +
              'px;position: fixed;z-index: 6;'
            }
          >
            <Image src={require('../images/start_point.png')}></Image>
            <Text>{renderArray.point[0].title}</Text>
          </View>
        )}
        {renderArray.point[1] && renderArray.point[1].show && (
          <View
            className="startImage1"
            style={
              'top:' +
              renderArray.point[1].top +
              'px;left:' +
              renderArray.point[1].left +
              'px;position: fixed;z-index: 6;'
            }
          >
            <Image src={require('../images/start_point2.png')}></Image>
            <Text>{renderArray.point[1].title}</Text>
          </View>
        )}
        {renderArray.point[2] && renderArray.point[2].show && (
          <View
            className="startImage2"
            style={
              'top:' +
              renderArray.point[2].top +
              'px;left:' +
              renderArray.point[2].left +
              'px;position: fixed;z-index: 6;'
            }
          >
            <Image src={require('../images/start_point3.png')}></Image>
            <Text>{renderArray.point[2].title}</Text>
          </View>
        )}
        {renderArray.line[0] && renderArray.line[0].images.map((item, index) => {
          return (
            <Block>
              <View className="lineImage">
                {index < 1 && (
                  <Text
                    style={
                      'position: fixed;top:' +
                      item.top +
                      'px;left:' +
                      item.left +
                      'px; height:5px; z-index: 6;height:5px;width:' +
                      item.width +
                      'px;'
                    }
                  >
                    {renderArray.line[0].title}
                  </Text>
                )}
                <Image
                  src={require('../images/line.png')}
                  mode="scaleToFill"
                  style={
                    'position: fixed;top:' +
                    item.top +
                    'px;left:' +
                    item.left +
                    'px; height:5px; z-index: 6;height:5px;width:' +
                    item.width +
                    'px;'
                  }
                ></Image>
              </View>
            </Block>
          )
        })}
        {renderArray.line[1] && renderArray.line[1].images.map((item, index) => {
          return (
            <Block>
              <View className="lineImage">
                {index < 1 && (
                  <Text
                    style={
                      'position: fixed;top:' +
                      item.top +
                      'px;left:' +
                      item.left +
                      'px; height:5px; z-index: 6;height:5px;width:' +
                      item.width +
                      'px;'
                    }
                  >
                    {renderArray.line[1].title}
                  </Text>
                )}
                <Image
                  src={require('../images/line1.png')}
                  mode="scaleToFill"
                  style={
                    'position: fixed;top:' +
                    (item.top + 2) +
                    'px;left:' +
                    item.left +
                    'px; height:5px; z-index: 6;height:5px;width:' +
                    item.width +
                    'px;'
                  }
                ></Image>
              </View>
            </Block>
          )
        })}
        {renderArray.line[2] && renderArray.line[2].images.map((item, index) => {
          return (
            <Block>
              <View className="lineImage">
                {index < 1 && (
                  <Text
                    style={
                      'position: fixed;top:' +
                      item.top +
                      'px;left:' +
                      item.left +
                      'px; height:5px; z-index: 6;height:5px;width:' +
                      item.width +
                      'px;'
                    }
                  >
                    {renderArray.line[2].title}
                  </Text>
                )}
                <Image
                  src={require('../images/line2.png')}
                  mode="scaleToFill"
                  style={
                    'position: fixed;top:' +
                    (item.top + 4) +
                    'px;left:' +
                    item.left +
                    'px; height:5px; z-index: 6;height:5px;width:' +
                    item.width +
                    'px;'
                  }
                ></Image>
              </View>
            </Block>
          )
        })}
        <Image
          src={require('../images/gray_square.png')}
          style={
            'position:fixed;top:' +
            (topMargin + maskViewHeight + squareHeight) +
            'px;height:20px;width:20px;left:20px;'
          }
        ></Image>
        <Label
          style={
            'position:fixed;top:' +
            (topMargin + maskViewHeight + squareHeight) +
            'px;height:20px;width:100px;left:40px;font-size:14px;font-family:PingFangSC-Regular;font-weight:400;'
          }
        >
          未知的未来
        </Label>
        <Image
          src={require('../images/color_square.png')}
          style={
            'position:fixed;top:' +
            (topMargin + maskViewHeight + squareHeight) +
            'px;height:25px;width:25px;left:130px;'
          }
        ></Image>
        <Label
          style={
            'position:fixed;top:' +
            (topMargin + maskViewHeight + squareHeight) +
            'px;height:20px;width:100px;left:150px;font-size:14px;font-family:PingFangSC-Regular;font-weight:400;'
          }
        >
          消逝的过往
        </Label>
        <Label
          style={
            'position:fixed;top:' +
            (topMargin + maskViewHeight + squareHeight) +
            'px;right:' +
            leftMargin +
            'px;padding-right:5px;border-right: solid 5px #FF6348;font-size:14pxfont-family:SourceHanSansCN-Normal;font-weight:400;'
          }
        >
          {endDateString}
        </Label>
        <Button className="hideBtn" onClick={this.hideAction}>
          {bottomViewFlag}
        </Button>
        <View className="bottomView" style={'left:' + bottomViewLeft + 'px;'}>
          <Image
            src={require('../images/bg_bottom.png')}
            onClick={this.addAction}
          ></Image>
        </View>
      </View>
    )
  }
}

export default _C
