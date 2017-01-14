// pages/user/dingdan.js
//index.js  
//获取应用实例  
var app = getApp()  
Page( {  
  data: {  
    winWidth: 0,  
    winHeight: 0,  
    // tab切换  
    currentTab: 0,  
    isStatus:1,//1待付款，2待收货，3已完成
    page:1,
    orderList0:[],
    orderList2:[],
    orderList3:[],
  },  
  onLoad: function(options) {  
    this.initSystemInfo();
    this.setData({
      currentTab: parseInt(options.currentTab),
    });
    this.setData({
      isStatus: this.getOrderStatus(),
    });
    console.log(options);

    this.loadOrderList();
  },  
  getOrderStatus:function(){
    return this.data.currentTab == 0 ? 1 : this.data.currentTab == 2 ?2 :this.data.currentTab == 3 ? 3:0;
  },
  loadOrderList: function(){
    var that = this;
    console.log(this.data);
    wx.request({
      url: app.d.hostUrl + '/ztb/orderZBT/GetOrderZBTList',
      method:'post',
      data: {
        userId:app.d.userId,
        isStatus:that.data.isStatus,
        pageindex:that.data.page,
        pagesize:10,
      },
      header: {
        'Content-Type':  'application/x-www-form-urlencoded'
      },
      success: function (res) {
        //--init data        
        var data = res.data.data;
        console.log(data);
        switch(that.data.currentTab){
          case 0:
            that.setData({
              orderList0: that.data.orderList0.concat(data),
            });
            break;
          case 2:
            that.setData({
              orderList2: that.data.orderList2.concat(data),
            });
            break;
          case 3:
            that.setData({
              orderList3: that.data.orderList3.concat(data),
            });
            break;
        }
        //endInitData
        console.log(that.data);
      },
    });
  },
  initSystemInfo:function(){
    var that = this;  
  
    wx.getSystemInfo( {
      success: function( res ) {  
        that.setData( {  
          winWidth: res.windowWidth,  
          winHeight: res.windowHeight  
        });  
      }    
    });  
  },
  bindChange: function( e ) {  
  
    var that = this;  
    that.setData( { currentTab: e.detail.current });  
  
  },  
  swichNav: function( e ) {  
  
    var that = this;  
  
    if( this.data.currentTab === e.target.dataset.current ) {  
      return false;  
    } else {  
      that.setData({
        currentTab: parseInt(e.target.dataset.current),
      });
      that.setData( {  
        isStatus: this.getOrderStatus(),
      });
      //没有数据就进行加载
      switch(that.data.currentTab){
          case 0:
            !that.data.orderList0.length && that.loadOrderList();
            break;
          case 2:
            !that.data.orderList2.length && that.loadOrderList();
            break;
          case 3:
            !that.data.orderList3.length && that.loadOrderList();
            break;
        }
    };
  }  
})  