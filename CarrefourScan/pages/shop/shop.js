// pages/shop/shop.js
const app = getApp()
Page({
  data: {

  },
  onLoad() {

  },
  sao_sn(){
  },
  toPage(e){
    wx.navigateTo({
      url: `/pages/${e.currentTarget.dataset.page}/${e.currentTarget.dataset.page}`,
    })
  },
  onShareAppMessage() {

  }
})