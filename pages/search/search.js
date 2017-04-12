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
    historyKeyList:[],
  },
  onLoad:function(options){
    wx.setStorage({
      key:"historyKeyList",
      data:this.data.historyKeyList,
    });
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
            hotKeyShow:true,
            historyKeyShow:true,
        });
        return;
    };

    this.setData({
      hotKeyShow:false,
      historyKeyShow:false,
    })
    
    this.data.productData.length = 0;
    this.searchProductData();

    this.getOrSetSearchHistory(searchKey);
  },
  getOrSetSearchHistory:function(key){
    var that = this;
    wx.getStorage({
      key: 'historyKeyList',
      success: function(res) {
          console.log(res.data);

          //console.log(res.data.indexOf(key))
          if(res.data.indexOf(key) >= 0){
            return;
          }

          res.data.push(key);
          wx.setStorage({
            key:"historyKeyList",
            data:res.data,
          });

          that.setData({
            historyKeyList:res.data
          });
      }
    });
  },
  searchValueInput:function(e){
    var value = e.detail.value;
    this.setData({
      searchValue:value,
    });
    if(!value && this.data.productData.length == 0){
      this.setData({
        hotKeyShow:true,
        historyKeyShow:true,
      });
    }
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