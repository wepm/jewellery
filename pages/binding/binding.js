var app = getApp();
// pages/binding/binding.js
Page({
  data: {
    array: ['中国'],
    objectArray: [
      {
        id: 0,
        name: '中国'
      }
    ],
    index: 0,
    date: '2016-09-01',
    time: '12:01',
    tel: '',
  },
  bindPickerChange: function(e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      index: e.detail.value
    })
  },
  bindDateChange: function(e) {
    this.setData({
      date: e.detail.value
    })
  },
  bindTimeChange: function(e) {
    this.setData({
      time: e.detail.value
    })
  },
  bindTelInput:function(e){
    this.setData({
      tel: e.detail.value
    });
  },
  bindNext:function(){
    var that = this;
    var tel = that.data.tel;

    if(!tel){
      wx.showToast({
        title: '请输入手机号码',
        icon: 'success',
        duration: 2000
      });
      return;
    }
    if(!/^1\d{10}$/.test(tel)){
      wx.showToast({
        title: '请输入正确手机号码',
        icon: 'success',
        duration: 2000
      });
      return;
    }
    console.log(that.data.tel);

    that.onBindingTel(tel);
  },
  onBindingTel:function(tel){
    var that = this;

    wx.request({
      url: app.d.hostUrl + '/ztb/userZBT/Login',
      method:'post',
      data: {
        userId: app.d.userId,
        phone: tel,
      },
      header: {
        'Content-Type':  'application/x-www-form-urlencoded'
      },
      success: function (res) {
        //--init data        
        var data = res.data;

        console.log(data);
      },
    });
  },
})