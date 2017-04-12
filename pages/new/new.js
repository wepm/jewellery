var app = getApp();

// pages/new/new.js
function initSubMenuDisplay() { 
     return ['hidden', 'hidden', 'hidden', 'hidden'];
}

Page({
    data:{
        subMenuDisplay:initSubMenuDisplay(),
        color:0,
        productData:[],
        page:1,
        fcClass:[],
        zsClass:[],
        cbClass:[],
        dzClass:[],
        filterCid:1,
        filterMid:'',
        filterValueText:'',
        filterPriceSection:'',
        type:1,
    },
    tapMainMenu: function(e) {//        获取当前显示的一级菜单标识
        var index = parseInt(e.currentTarget.dataset.index);        // 生成数组，全为hidden的，只对当前的进行显示
        var newSubMenuDisplay = initSubMenuDisplay();//        如果目前是显示则隐藏，反之亦反之。同时要隐藏其他的菜单
        if(this.data.subMenuDisplay[index] == 'hidden') {
            newSubMenuDisplay[index] = 'show';
        } else {
            newSubMenuDisplay[index] = 'hidden';
        }        // 设置为新的数组
        this.setData({
            subMenuDisplay: newSubMenuDisplay
        });
    },
    tapSubMenu: function(e) { 
      var dataset = e.currentTarget.dataset;
      var index = parseInt(dataset.index);
      
      console.log(e);
      var mid = dataset.mid;
      var attr = dataset.attr;
      var val = dataset.value;

      console.log(mid);
      console.log(attr);
      console.log(val);
      if(val || attr == 'all'){
        //查询商品
        this.setData({
            subMenuDisplay: initSubMenuDisplay(),
            filterMid: mid,
            filterValueText: attr == 'all' ? '' : val,
            page:1,
            productData:[],
        });

        console.log('filter data：' + val);
        //this.initProductData(productData.data);
        //this.initProductClass(allClass.data);
        this.loadProductData();
        this.loadProductClass();

        return;
      }
      var filterType = dataset.type;
      var box = [];
      switch(filterType){
        case 'fc':
            box = this.data.fcClass;
            break;
        case 'zs':
            box = this.data.zsClass;
            break;
        case 'cb':
            box = this.data.cbClass;
            break;
        case 'dz':
            box = this.data.dzClass;
            break;
      }

      //如果当前存在此属性，直接显示
      if(attr) {
        var array = attr.split(',');

        box.length = 0;
        for(var i =0; i<array.length;i++){
            box.push({
                mid:mid,
                name:array[i],
                value:array[i],
            });
        };

      }else{
        //点击子菜单属性
        this.loadProductAttr(filterType, mid);
      }

      this.refreshData();
  },
  
  onReachBottom:function(){
      //下拉加载更多多...
      this.setData({
        page:(this.data.page+1)
      })
      
      this.loadProductData();
  },
  loadProductData:function(){
    

    var that = this;
    console.log(this.data);
    wx.request({
      url: app.d.hostUrl + '/ztb/productZBT/ScreenProduct',
      method:'post',
      data: {
        type: that.data.type,
        pageindex: that.data.page,
        pagesize:10,
        mid: that.data.filterMid,
        valueText: that.data.filterValueText,
      },
      header: {
        'Content-Type':  'application/x-www-form-urlencoded'
      },
      success: function (res) {
        console.log(res);
        //--init data        
        var data = res.data.data;
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
      //console.log(data[i]);
      var item = data[i];

      item.Price = item.Price/100;
      item.ImgUrl = app.d.hostImg + item.ImgUrl;

    }
  },
  onLoad: function (options) {
    this.loadProductData();
    // //--加载产品
    // that.initProductData(productData.data);
    // that.setData({
    //   productData:productData.data,
    // });
    //console.log(that.data.productData)
    //加载分类
    // /ztb/prodcutModelZBT/GetProductModelZBTList
    this.loadProductClass();
    
  },
  loadProductClass:function(){
    var that = this;
    console.log(this.data);
    wx.request({
      url: app.d.hostUrl + '/ztb/prodcutModelZBT/GetProductModelZBTList',
      method:'post',
      data: {
        type: that.data.type,
        pageindex: that.data.page,
        pagesize:10,
      },
      header: {
        'Content-Type':  'application/x-www-form-urlencoded'
      },
      success: function (res) {
        // //--init data        
        var data = res.data.data;
        console.log(data);
        that.initProductClass(data);
      },
    });
  },
  initProductClass:function(data){
    var that = this;

    that.data.fcClass.length = 0;
    that.data.zsClass.length = 0;
    that.data.cbClass.length = 0;
    // that.data.fcClass.push({
    //     mid: item.MID,
    //     name: '全部'
    // });
    // that.data.zsClass.push({
    //     mid: item.MID,
    //     name: '全部'
    // });
    // that.data.cbClass.push({
    //     mid: item.MID,
    //     name: '全部'
    // });
    for(var i=0;i<data.length;i++){
        var item = data[i];
        
        //翡翠
        if(item.ParentID.length == 6 && item.ParentID.indexOf('102') == 0){
            that.data.fcClass.push({
                mid: item.MID,
                name: item.ModelName
            });
        }
        //钻石
        if(item.ParentID.length == 6 && item.ParentID.indexOf('110') == 0){
            that.data.zsClass.push({
                mid: item.MID,
                name: item.ModelName
            });
        }
        //彩宝
        if(item.ParentID.length == 6 && item.ParentID.indexOf('111') == 0){
            that.data.cbClass.push({
                mid: item.MID,
                name: item.ModelName
            });
        }
    }
    
    this.refreshData();
  },
  loadProductAttr:function(filterType, mid){
    var that = this;
    wx.request({
      url: app.d.hostUrl + '/ztb/prodcutModelZBT/GetMIDProductAttribute',
      method:'post',
      data: {
        mid:mid
      },
      header: {
        'Content-Type':  'application/x-www-form-urlencoded'
      },
      success: function (res) {
        // //--init data        
        var data = res.data.data;
        console.log(data);
        that.initProductAttr(filterType, data);
      },
    });
  },
  initProductAttr: function(filterType, data){

      var box = [];
      box.push({
        mid: data[0].MID,
        name: '全部',
        attr: 'all',
      });
      for(var i =0; i<data.length;i++){
          var item = data[i];

          box.push({
            mid: item.MID,
            name: item.AttrName,
            attr: item.ValueText,
          });
      }

      switch(filterType){
        case 'fc':
            this.setData({fcClass:box});
            break;
        case 'zs':
            this.setData({zsClass:box});
            break;
        case 'cb':
            this.setData({cbClass:box});
            break;
        case 'dz':
            this.setData({dzClass:box});
            break;
      }

  },
  refreshData:function(){
    this.setData({
        fcClass:this.data.fcClass,
        zsClass:this.data.zsClass,
        cbClass:this.data.cbClass,
      });

    // console.log(this.data.fcClass);
    // console.log(this.data.zsClass);
    // console.log(this.data.cbClass);
  },
});

