// pages/job/job.js
const app = getApp()
Page({
  data: {
    job_title_show:0,
    job_title_list:[
      {'id':'1','job_title':'PHP'},
      { 'id': '2', 'job_title': 'web前端' },
      { 'id': '3', 'job_title': '微信小程序' },
      ]
  },
  onLoad: function (options) {
    app.globalData.SocketTask.onMessage(function (e) {
      console.log(e.data)
      let data = JSON.parse(e.data)
      switch(data['type']){
        case 'login':
        wx.showToast({
          title: data['err_msg'],
        })
        break;  
      }
    })
  },
  job_title_select: function (e) {
    let data = e.currentTarget.dataset
    this.setData({
      job_title_show:data.key,
    })
  },
  toSearch(){
    wx.navigateTo({
      url: '/pages/search/search',
    })
  },
})