// pages/msgList/msgList.js
Page({
  data: {
    swith_show: 0,
  },
  onLoad: function (options) {
    wx.showTabBarRedDot({
      index: 2,
    })
  },
  top_switch: function (e) {

    this.setData({
      swith_show: e.target.id
    })
  },
  toSearch(){
    wx.navigateTo({
      url: '/pages/search/search',
    })
  },
  toChat(){
     wx.navigateTo({
       url: '/pages/chat/chat',
     })
  }
})