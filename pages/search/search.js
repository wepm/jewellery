var app = getApp();
// pages/search/search.js
Page({
  data:{
    focus:true,
    hotKeyShow:true,
    historyKeyShow:true,
    searchValue:'',
    page:1,
    productData:[],
  },
  onLoad:function(options){
    // 页面初始化 options为页面跳转所带来的参数

  },
  onReachBottom:function(){
      //下拉加载更多多...
      this.setData({
        page:(this.data.page+1)
      })
      
      this.searchProductData();
  },
  doKeySearch:function(e){
    console.log(e);
    var key = e.currentTarget.dataset.key;
    this.setData({
      searchValue: key,
       hotKeyShow:false,
       historyKeyShow:false,
    });

    this.data.productData.length = 0;
    this.searchProductData();
  },
  doSearch:function(){
    var searchKey = this.data.searchValue;
    if (!searchKey) {
        this.setData({
            focus: true,
        })
        return;
    };

    this.setData({
      hotKeyShow:false,
      historyKeyShow:false,
    })
    
    this.data.productData.length = 0;
    this.searchProductData();
  },
  searchValueInput:function(e){
    var value = e.detail.value;
    this.setData({
      searchValue:value,
    });
  },
  searchProductData:function(){
    var that = this;

    wx.request({
      url: app.d.hostUrl + '/ztb/productZBT/ScreenProductInfoZBT',
      method:'post',
      data: {
        productName:that.data.searchValue,
        pageindex: that.data.page,
        pagesize:10,
      },
      header: {
        'Content-Type':  'application/x-www-form-urlencoded'
      },
      success: function (res) {
        //console.log(res)
        //--init data       
        var data = res.data.data;
        console.log(data);
        that.initProductData(data);
        that.setData({
          productData:that.data.productData.concat(data),
        });
        //endInitData
      },
    });
  },
  initProductData: function (data){
    for(var i=0; i<data.length; i++){
      console.log(data[i]);
      var item = data[i];

      item.Price = item.Price/100;
      item.ImgUrl = app.d.hostImg + item.ImgUrl;

    }
  },
});