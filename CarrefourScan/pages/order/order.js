// pages/order/order.js
const app = getApp()
Page({
  data: {
    select_num:0,
  },
  onShow: function () {
    let userInfo = wx.getStorageSync('userInfo')
    if (!userInfo) {
      this.setData({
        is_login: false,
      })
      return
    }
    this.getOrder()
    this.setData({
      userInfo: userInfo,
      is_login: true,
    })
    
  },
  // 加载订单列表
  getOrder(){
    let that = this
    util.req(urls.myOrder, { 'shop_id': app.globalData.shop_id, 'openid': app.globalData.openid }, 'POST', function (res) {
      for(let i=0;i<res.data.data.length;i++){
        let tmp = JSON.parse(res.data.data[i]['order_list'])
        let orderInfo=''
        let num=0
        for (let j = 0; j < tmp.length;j++){
          if (j == 0) {
            orderInfo = tmp[j]['good_name']
          } else {
            orderInfo = orderInfo+'+'+ tmp[j]['good_name']
          }
        }
        res.data.data[i]['orderInfo'] = orderInfo + ' ,等总计: ' + res.data.data[i]['order_num']+'件商品'
      }
      that.setData({
        order_list: res.data.data,
        order_num: (res.data.data).length,
        shop_logo: app.globalData.shop.shop_logo,
        host: urls.host,
        host_on: app.globalData.host_on
      })
    })
  },
  // 顶部tab
  select_tab:function(e){
    this.setData({
      select_num: e.target.id
    })
  },
  // 订单操作
  order_opt(e){
    switch (e.currentTarget.id){
      // 未支付
      case '0':
    this.pay(e.currentTarget.dataset.order_id)
      break;
      // 已支付
      case '1':
        util.toPage('menu', 1)
      break; 
    }
  },
  // 支付
  pay(order_id) {
    util.req(urls.wxpay, { 'shop_id': app.globalData.shop_id, 'order_id': order_id }, 'POST', (res) => {
      if (res.data.code == 200) {
        wx.requestPayment({
          timeStamp: res.data.timeStamp,
          nonceStr: res.data.nonceStr,
          package: res.data.package,
          signType: 'MD5',
          paySign: res.data.paySign,
          success: function (res) {
            wx.showToast({
              title: '支付成功!',
              duration: 1500,
            })
            setTimeout(function () {
              util.toPage('index', 1)
            }, 1500)
          },
          fail: function () {
            wx.showToast({
              title: '支付失败!请重试',
              icon: 'none',
              duration: 1500,
            })
          },
        })
      } else {
        wx.showToast({
          title: res.data.return_msg,
          icon: 'none',
          duration: 1500,
        })
      }
    })
  },
  // 提交用户数据
  getUserInfo: function (e) {
    let that = this
    if (e.detail.errMsg == 'getUserInfo:ok') {
      app.globalData.userInfo = e.detail.userInfo
      util.setNum('userInfo', e.detail.userInfo)
      let userInfo = e.detail.userInfo
      userInfo['openid'] = wx.getStorageSync('openid')
      util.req(urls.updateUserInfo, { 'shop_id': app.globalData.shop_id, 'userInfo': userInfo }, 'POST', (res) => {
        if (res.data.code == 200) {
          wx.showToast({
            title: '登录成功!',
          })
          that.getOrder()
          that.setData({
            show_login: false,
            is_login: true,
            userInfo: e.detail.userInfo,
          })
        }
      })
    }

  },
  // 打开登录弹窗
  open_login: function () {
    this.setData({
      shop_logo: app.globalData.shop_logo,
      shop_title: app.globalData.shop_title,
      show_login: true
    })
  },
  // 关闭登录弹窗
  close_login: function () {
    this.setData({
      show_login: false
    })
  },
})