// pages/cart/cart.js
const app = getApp();
Page({
  data: {
  },
  onLoad() {
   
  },
  toPage(e) {
    util.toPage(e.currentTarget.dataset.page, 0)
  },
  onShareAppMessage(){

  }
})