// pages/myOrder/myOrder.js
const app = getApp()
Page({
  data: {
    item_num:0
  },
  onLoad(options) {

  },
  select_item(e){
    this.setData({
      item_num: e.currentTarget.id
    })
  },
  toPage(e) {
    wx.navigateTo({
      url: `/pages/${e.currentTarget.dataset.page}/${e.currentTarget.dataset.page}`,
    })
  },
onShareAppMessage() {

  }
})