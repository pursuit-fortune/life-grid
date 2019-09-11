import { View, Image, Picker, Input, Text } from '@tarojs/components'
import Taro from '@tarojs/taro'
import withWeapp from '@tarojs/with-weapp'
import './index.scss'
const today = new Date()
const end = `${today.getFullYear()}-${('0' + (today.getMonth() + 1)).slice(-2)}-${('0' + today.getDate()).slice(-2)}`

@withWeapp('Page')
class _C extends Taro.Component {
  state = {
    date: '',
    age: '',
    value: [9999, 1, 1],
    timePickerStatus: false,
    end
  }

  config = {}

  componentDidShow () {
    const age = Taro.getStorageSync('age')
    const date = Taro.getStorageSync('date')
    console.log(age, date)
    this.setData({
      age,
      date
    })
  }

  bindDateChange(e) {
    this.setData({
      date: e.detail.value
    })
    Taro.setStorageSync('date', e.detail.value)
  }

  ageChange(e) {
    console.log(e)
    const { value } = e.detail
    if (value > 999) {
      Taro.showToast({
        title: '妖孽,上天准你活这么久了吗?',
        icon: 'none'
      })
    }
    this.setData({
      age: Math.min(value, 999)
    })
    Taro.setStorageSync('age', Math.min(value, 999))
  }

  nextAction() {
    if (!this.data.age || !this.data.date) {
      Taro.showToast({
        title: '有些东西还没有输入啊',
        icon: 'none'
      })
      return
    }
    Taro.navigateTo({
      url: '../index/index'
    })
  }

  render() {
    const { date, end, age } = this.state
    console.log(this)
    return (
      <View className="page-entry">
        <Image
          className="header"
          src={require('../images/first_title.png')}
        ></Image>
        <View className="content">
          <View className="date">
            <Picker
              mode="date"
              value={date}
              end={end}
              onChange={this.bindDateChange}
            >
              <View className="date-picker">
                {date ? date : '输入出生年月日'}
              </View>
            </Picker>
            <View className="date-label">我来到这个世上</View>
          </View>
          <View className="age">
            <View>我觉得我能活到</View>
            <View className="age-no">
              <Input
                className="age-input"
                type="number"
                value={age}
                placeholder="多少"
                onInput={this.ageChange}
              ></Input>
              <View className="bottom-line"></View>
              <Text>岁</Text>
            </View>
          </View>
        </View>
        <Image
          src={require('../images/next_btn.png')}
          className="footer"
          onClick={this.nextAction}
        ></Image>
      </View>
    )
  }
}

export default _C
