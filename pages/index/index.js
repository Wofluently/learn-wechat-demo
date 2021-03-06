//index.js
//获取应用实例
const app = getApp()

// 页面构造器
Page({
  // 参与页面渲染的数据
  data: {
    motto: 'Hello World',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    msg: '',
    latitude: 0,
    longitude: 0
  },
  //事件处理函数
  bindViewTap: function() {
    wx.switchTab({
      url: '../logs/logs'
    })
  },
  onLoad: function() {

    wx.request({
      url: 'https://www.poetrydistant.cn:8080/blog/login',
      method:'POST',
      data:{
        username:'ChangLau',
        password:'wff1993lc'
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded' // 默认值
      },
      success (res) {
        console.log(res.data)
      }
    })

    // 页面渲染后 执行
    this.setData({
      msg: 'Hello WeChat'
    })
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse) {
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
    // 获取当前位置
    wx.getLocation({
      type: 'wgs84',
      success: res => {
        this.setData({
          latitude: res.latitude,
          longitude: res.longitude
        })
      }
    })
  },
  getUserInfo: function(e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  },
  changeMsg: function() {
    this.setData({
      msg: 'Hello ChangLau'
    })
    // 调用微信扫一扫能力
    wx.scanCode({
      success: res => {
        console.log(res)
      }
    })
  },
  mapClick: function(res) {},
  goToTemplate() {
    wx.navigateTo({
      url: '/pages/template/template'
    })
  }
})
