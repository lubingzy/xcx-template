// pages/chat/chat.js
Page({

  data: {
    topBar: [
      { 'name': '换手机', 'icon': '../../images/chat/phone.png' },
      { 'name': '换微信', 'icon': '../../images/chat/wx.png' },
      { 'name': '发简历', 'icon': '../../images/chat/resume.png' },
      { 'name': '没兴趣', 'icon': '../../images/chat/no.png' },
      ]
  },
  onLoad: function (options) {
    this.setTopBar('余女士', '亚睿科技•人事')
  },
  setTopBar(name, job) {
    wx.setNavigationBarTitle({
      title: name,
    })
    this.setData({
      jobShow: job
    })
  },
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})