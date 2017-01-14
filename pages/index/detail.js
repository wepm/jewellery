//index.js  
//获取应用实例  
var app = getApp()
Page({
  data: {
    bannerApp:true,
    winWidth: 0,
    winHeight: 0,
    currentTab: 0, //tab切换  
    productId:0,
    itemData:{},
  },
  onLoad: function (option) {
    console.log(option);
    this.initNavHeight();
    this.setData({
      productId: option.productId,
    });
    this.loadProductDetail();

  },
  loadProductDetail:function(){
    var that = this;

    wx.request({
      url: app.d.hostUrl + '/ztb/productDetailsZBT/GetProductDetails',
      method:'post',
      data: {
        ProID: that.data.productId,
      },
      header: {
        'Content-Type':  'application/x-www-form-urlencoded'
      },
      success: function (res) {
        console.log(res)
        //--init data        
        var data = res.data.data[0];
        console.log(data);
        that.initProductData(data);
        that.setData({
          itemData:data,
        });
        //endInitData
      },
    });
  },
  initProductData: function(data){
    data["LunBoProductImageUrl"] = [];

    var imgs = data.LunBoProductImage.split(';');
    for(let url of imgs){
      url && data["LunBoProductImageUrl"].push(app.d.hostImg + url);
    }

    data.Price = data.Price/100;
    data.VedioImagePath = app.d.hostImg + '/' +data.VedioImagePath;
    data.videoPath = app.d.hostImg + '/' +data.videoPath;
  },
  addFavorites:function(e){//添加到收藏
    var that = this;
    console.log(this.data);
    wx.request({
      url: app.d.hostUrl + '/ztb/productZBT/AddCollectCategory',
      method:'post',
      data: {
        userID: app.d.userId,
        ProID: that.data.productId,
      },
      header: {
        'Content-Type':  'application/x-www-form-urlencoded'
      },
      success: function (res) {
        // //--init data        
        var data = res.data;
        console.log(data);
        wx.showToast({
            title: data.message,
            icon: 'success',
            duration: 2000
        });

        if(data.result == 'ok'){
          console.log('add to shope favs ok');
          //变成已收藏，但是目前小程序可能不能改变图片，只能改样式
          that.data.itemData.isCollect = true;
          console.log(that.data.itemData);
        }
      },
    });
  },
  addShopCart:function(e){ //添加到购物车
    var that = this;
    console.log(this.data);
    wx.request({
      url: app.d.hostUrl + '/ztb/shopCartZBT/AddShopCart',
      method:'post',
      data: {
        userID: app.d.userId,
        ProID: that.data.productId,
        buycount:1,
      },
      header: {
        'Content-Type':  'application/x-www-form-urlencoded'
      },
      success: function (res) {
        // //--init data        
        var data = res.data;
        console.log(data);
        wx.showToast({
            title: data.message,
            icon: 'success',
            duration: 2000
        });

        if(data.result == 'ok'){
          console.log('add to shope card ok')
          wx.switchTab({
            url: '/pages/cart/cart'
          });
        }
      },
    });
  },
  bindChange: function (e) {//滑动切换tab 
    var that = this;
    that.setData({ currentTab: e.detail.current });
  },
  initNavHeight:function(){////获取系统信息
    var that = this;
    wx.getSystemInfo({
      success: function (res) {
        that.setData({
          winWidth: res.windowWidth,
          winHeight: res.windowHeight
        });
      }
    });
  },
  bannerClosed:function(){
    console.log('bbbbbbbbbbbb')
    this.setData({
      bannerApp:false,
    })
  },
  swichNav: function (e) {//点击tab切换
    var that = this;
    if (this.data.currentTab === e.target.dataset.current) {
      return false;
    } else {
      that.setData({
        currentTab: e.target.dataset.current
      })
    }
  }
});
