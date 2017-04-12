var app = getApp();
//index.js
Page({
  data: {
    imgUrls: [
      'https://gdp.alicdn.com/imgextra/i1/407700539/TB23I1vabBkpuFjy1zkXXbSpFXa-407700539.jpg',
      'https://gdp.alicdn.com/imgextra/i1/407700539/TB2.bMjXQ1M.eBjSZFOXXc0rFXa-407700539.jpg'
    ],
    indicatorDots: true,
    autoplay: true,
    interval: 5000,
    duration: 1000,
    circular: true,
    productData: [],
    page: 1,
  },
  changeIndicatorDots: function (e) {
    this.setData({
      indicatorDots: !this.data.indicatorDots
    })
  },
  changeAutoplay: function (e) {
    this.setData({
      autoplay: !this.data.autoplay
    })
  },
  intervalChange: function (e) {
    this.setData({
      interval: e.detail.value
    })
  },
  durationChange: function (e) {
    this.setData({
      duration: e.detail.value
    })
  },
  initProductData: function (data){
    for(var i=0; i<data.length; i++){
      console.log(data[i]);
      var item = data[i];

      item.Price = item.Price/100;
      item.ImgUrl = app.d.hostImg + item.ImgUrl;

    }
  },
  onLoad: function (options) {
    var that = this;

    wx.request({
      url: app.d.hostUrl + '/ztb/productZBT/GetTJProductList',
      method:'post',
      data: {
        pageindex: that.data.page,
        pagesize:10,
      },
      header: {
        'Content-Type':  'application/x-www-form-urlencoded'
      },
      success: function (res) {
        console.log(res)
        //--init data        
        var data = res.data.data;
        console.log(data);
        that.initProductData(data);
        that.setData({
          productData:data,
        });
        //endInitData
      },
    })
    

    
  },



});