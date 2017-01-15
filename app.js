// //app.js
// Page({
//   data: {
//   },
//   onLoad: function (options) {
//     // 页面初始化 options为页面跳转所带来的参数
//   },
//   onReady: function () {
//     // 页面渲染完成
//   },
//   onShow: function () {
//     // 页面显示
//   },
//   onHide: function () {
//     // 页面隐藏
//   },
//   onUnload: function () {
//     // 页面关闭
//   }
// });
// app.js
App({
  d: {
    hostUrl: 'https://app.gemmy.so',
    hostImg: 'http://img.ynjmzb.net',
    hostVideo: 'http://zhubaotong-file.oss-cn-beijing.aliyuncs.com',
    userId: 3,
  },
    onLaunch: function () {
    //调用API从本地缓存中获取数据
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)
  },
  getUserInfo:function(cb){
    var that = this
    if(this.globalData.userInfo){
      typeof cb == "function" && cb(this.globalData.userInfo)
    }else{
      //调用登录接口
      wx.login({
        success: function () {
          wx.getUserInfo({
            success: function (res) {
              that.globalData.userInfo = res.userInfo
              typeof cb == "function" && cb(that.globalData.userInfo)
            }
          })
        }
      })
    }
  },
  globalData:{
    userInfo:null
  },
  onPullDownRefresh: function (){
    wx.stopPullDownRefresh();
  }

});





