// pages/start/start.js
var app = getApp()
Page({
  data: {
    second: 3,
  },
  onLoad: function(options) {
    star_time(this)
  },
})

// 倒计时
function star_time(that) {
  app.globalData.time = setInterval(function() { 
    let second = that.data.second
    that.setData({
      second: second - 1
    })
    if (that.data.second == 1) {
      clearInterval(app.globalData.time)
      wx.reLaunch({
        url: '../job/job',
      })
    }
  }, 1000) 
}