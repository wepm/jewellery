var app = getApp();
Page({
  data: {
    siteName: '',
    order: null,
    loadingText: '加载中...',
    loadingHidden: false,
    loading: false,
    disabled: false,
    goods_id:null,
    shop_id:null,
    tipsHidden: true,
    tipsText: '',
    mobileValue: '',
    addressValue: '',
    remarkValue: '',
    clearHidden: 'none',
    clearHidden2: 'none',
  },
  onLoad: function (options) {
    var that = this, goods_id = options.goods_id, shop_id = options.shop_id;
    that.setData({
        siteName: app.globalData['siteName'],
        goods_id: goods_id,
        shop_id: shop_id,
        mobileValue: app['globalData']['userInfo']['mobile'] || '',
    }),
    wx.request({
        url: 'https://api.weiredu.cn/index.php/Api/detail',
        data: {'goods_id':goods_id,'shop_id':shop_id},
        method: 'POST', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
        header: {
         'Content-Type': 'application/json'
        },
        success: function(res){
          if(res.data.status && res.data.item){
              var item = res.data.item
              that.setData({
                  order: item || [],
                  loadingHidden: true
              })
          }
        },
        fail: function() {
          console.log('读取商品详情数据失败');
          that.setData({
            loadingHidden: true
          })
        },
        complete: function() {
          // complete
          console.log('读取商品详情数据完成')
        }
    })
  },

  bindKeyInput: function (e) {
    var val = e.detail.value
    if (val) {
      this.setData({
        clearHidden:'block',
        tipsHidden: true,
        tipsText: '',
        mobileValue: val,
      });
    }else{
      this.setData({
          mobileValue: '',
          clearHidden:'none'
      })
    }
  },
  
   bindKeyInput2: function (e) {
    var val = e.detail.value
    if (val) {
      this.setData({
        clearHidden2:'block',
        tipsHidden: true,
        tipsText: '',
        addressValue: val,
      });
    }else{
      this.setData({
          addressValue: '',
          clearHidden2:'none'
      })
    }
  },

  bindClear:function(e){
    console.log('clear');
     this.setData({
        mobileValue: '',
        clearHidden:'none'
    })
  },
  bindClear2:function(e){
     this.setData({
        addressValue: '',
        clearHidden2:'none'
    })
  },
  bindChooseLocation: function(e){
     var that = this;
      wx.chooseLocation({
        success: function(res){
          //console.log(res)
          // success
           that.setData({
            addressValue: res.address || '',
          })
        },
        fail: function() {
          // fail
        },
        complete: function() {
          // complete
        }
      })
  },
  bindBtnPay: function (e){
    console.log('form发生了submit事件，携带数据为：', e.detail)
    var that = this;
    var user_id = app['globalData']['userInfo']['id'],openid = app['globalData']['userInfo']['openid'],
    goods_id = that.data.goods_id, shop_id = that.data.shop_id,
    mobile = that.data.mobileValue,address = that.data.addressValue,remark=that.data.remarkValue,formId=e.detail.formId;
    if (!mobile) {
      that.setData({
        tipsHidden: false,
        tipsText: '请输入联系电话',
      })
      return false;
    }else{
        var myreg = /^(((13[0-9]{1})|(15[0-9]{1})|(18[0-9]{1}))+\d{8})$/; 
        if(!myreg.test(mobile)) { 
            that.setData({
              tipsHidden: false,
              tipsText: '输入的手机号码不合法',
            })
            return false; 
        }
    }

    if (!address) {
      that.setData({
        tipsHidden: false,
        tipsText: '请输入收货地址',
      })
      return false;
    }

     //创建订单
    that.setData({
      disabled: !that.data.disabled,
      loading: !that.data.loading,
      loadingHidden: false,
      loadingText: '请稍后...'
    })
    wx.request({
        url: 'https://api.weiredu.cn/index.php/Api/create_order',
        data: {'goods_id':goods_id,'shop_id':shop_id,'user_id':user_id,'openid':openid,'mobile':mobile,'address':address,'remark':remark},
        method: 'POST', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
        header: {
         'Content-Type': 'application/json'
        },
        success: function(res){
          if(res.data.status && res.data.pay_info){
              that.setData({
                loadingHidden: true,
                loadingText: ''
              })
              var param = res.data.pay_info;
              wx.requestPayment({
                timeStamp: param.timeStamp,
                nonceStr: param.nonceStr,
                package: param.package,
                signType: param.signType,
                paySign: param.paySign,
                success: function(res){
                    // success
                    wx.request({
                      url: 'https://api.weiredu.cn/index.php/Api/pay_success',
                      data: {'out_trade_no':param.out_trade_no,'user_id':user_id,'form_id':formId,'openid':openid},
                      method: 'POST', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
                      header: {
                        'Content-Type': 'application/json'
                      },
                      success: function(res){
                        //console.log(res)
                        // success
                        wx.navigateBack({
                          delta: 2, // 回退前 delta(默认为1) 页面
                          success: function(res){
                            // success
                            that.setData({
                              disabled: !that.data.disabled,
                              loading: !that.data.loading,
                            })
                          },
                          fail: function() {
                            // fail
                            that.setData({
                              disabled: !that.data.disabled,
                              loading: !that.data.loading,
                            })
                          },
                          complete: function() {
                            // complete
                          }
                        })
                      },
                      fail: function() {
                        wx.navigateBack({
                          delta: 2, // 回退前 delta(默认为1) 页面
                          success: function(res){
                            // success
                          },
                          fail: function() {
                            // fail
                          },
                          complete: function() {
                            // complete
                          }
                        })
                      },
                      complete: function() {
                        // complete
                      }
                    })
                },
                fail: function() {
                  // fail
                  console.log('pay fail')
                },
                complete: function() {
                  // complete
                  console.log('pay complete')
                }
            })

          }else{
            that.setData({
              disabled: !that.data.disabled,
              loading: !that.data.loading,
              loadingHidden: true,
              loadingText: '',
              tipsHidden: false,
              tipsText: res.data.msg || '下单失败',
            })
          }
        },
        fail: function() {
          console.log('创建订单数据失败');
          that.setData({
            disabled: !that.data.disabled,
            loading: !that.data.loading,
            loadingHidden: true,
            loadingText: ''
          })
        },
        complete: function() {
          // complete
          console.log('创建订单数据完成')
        }
    })

  }
})

