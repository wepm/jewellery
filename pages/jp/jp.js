var app = getApp();

// pages/jp/jp.js
function initSubMenuDisplay() { 
     return ['hidden', 'hidden', 'hidden', 'hidden'];
}

Page({
    data:{
        subMenuDisplay:initSubMenuDisplay(),
        color:0
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
      var index = parseInt(e.currentTarget.dataset.index);
      this.setData({ 
        subMenuDisplay: initSubMenuDisplay()
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
  onReachBottom:function(){
      //下拉加载更多多...
  },
  onLoad: function (options) {
    var that = this;

    wx.request({
      url: app.d.hostUrl + '/ztb/productZBT/ScreenProduct',
      data: {
        type: 2,
        pageindex: that.data.page,
        pagesize:10,
      },
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        console.log(res.data)
      },
    })
    //--init data
    that.initProductData(productData.data);
    that.setData({
      productData:productData.data,
    });
    console.log(that.data.productData)

    
  },
});

var productData = {
    "result": "ok",
    "message": "获取成功",
    "data": [
        {
            "row_id": 1,
            "ProID": 21029,
            "ProductName": "高冰种飘花弥勒佛挂坠",
            "Title": "",
            "UpsetPrice": 24500,
            "Price": 34300,
            "MarketPrice": 0,
            "StockCount": 1,
            "PostDate": "2016-10-17 20:13:28",
            "BarCode": "6900054000858",
            "IsStatus": 1,
            "BrandID": 81,
            "IsSpot": true,
            "SupplierID": 163,
            "AuditDate": "2016-10-17 20:13:34",
            "ReadCount": 0,
            "Property": 1,
            "Contents": "种质细腻，底子干净利落，饱满浑厚。",
            "MID": 103,
            "LastDate": "2016-10-17 20:13:34",
            "AuditRemark": "",
            "IsReadNew": 0,
            "StaffID": 0,
            "ProductNumber": "A-Y0005400858",
            "CID": 0,
            "IsPrivate": true,
            "Source": "可乐",
            "ProsectionID": 0,
            "IsUpsetPrice": null,
            "ImgUrl": "/upload/product/20161013/e6821574-38fc-448e-a663-80b3597bd810_Watermark.jpg?x-oss-process=image/resize,w_336,h_400,limit_0,m_fixed",
            "ParentID": "102103",
            "ModelName": "挂件/吊坠",
            "IsVedioPath": 1960,
            "IntervalPrice": null
        },
        {
            "row_id": 2,
            "ProID": 21095,
            "ProductName": "冰糯种晴水福瓜挂坠",
            "Title": "",
            "UpsetPrice": 1980,
            "Price": 2772,
            "MarketPrice": 0,
            "StockCount": 1,
            "PostDate": "2016-10-17 20:10:51",
            "BarCode": "6900004000529",
            "IsStatus": 1,
            "BrandID": 4,
            "IsSpot": true,
            "SupplierID": 4,
            "AuditDate": "2016-10-17 20:10:58",
            "ReadCount": 0,
            "Property": 1,
            "Contents": "质地细腻 纯洁无瑕玉养人一生，人养玉三年，渊生珠而崖不牯，玉在山而草木润翡翠经磨励封藏地表多年,它充满生机却又那么坚定不移。它吸收了天地灵气，再经能工巧匠之手，剩下来的事情，就是静静的等候与你相遇。\n",
            "MID": 103,
            "LastDate": "2016-10-17 20:10:58",
            "AuditRemark": "",
            "IsReadNew": 0,
            "StaffID": 0,
            "ProductNumber": "A-HT0040529",
            "CID": 0,
            "IsPrivate": null,
            "Source": "0",
            "ProsectionID": 0,
            "IsUpsetPrice": null,
            "ImgUrl": "/GYSimg/image/0/ffa0d7a7-fbea-4259-9f1c-d1ce4c2d4eef_Watermark.JPG?x-oss-process=image/resize,w_336,h_400,limit_0,m_fixed",
            "ParentID": "102103",
            "ModelName": "挂件/吊坠",
            "IsVedioPath": null,
            "IntervalPrice": null
        },
        {
            "row_id": 3,
            "ProID": 21099,
            "ProductName": "糯冰种深晴水生肖鼠挂坠",
            "Title": "",
            "UpsetPrice": 1980,
            "Price": 2772,
            "MarketPrice": 0,
            "StockCount": 1,
            "PostDate": "2016-10-17 20:10:30",
            "BarCode": "6900004000531",
            "IsStatus": 1,
            "BrandID": 4,
            "IsSpot": true,
            "SupplierID": 4,
            "AuditDate": "2016-10-17 20:10:36",
            "ReadCount": 0,
            "Property": 1,
            "Contents": "质地细腻 纯洁无瑕玉养人一生，人养玉三年，渊生珠而崖不牯，玉在山而草木润翡翠经磨励封藏地表多年,它充满生机却又那么坚定不移。它吸收了天地灵气，再经能工巧匠之手，剩下来的事情，就是静静的等候与你相遇。\n",
            "MID": 103,
            "LastDate": "2016-10-17 20:10:36",
            "AuditRemark": "",
            "IsReadNew": 0,
            "StaffID": 0,
            "ProductNumber": "A-HT0040531",
            "CID": 0,
            "IsPrivate": null,
            "Source": "0",
            "ProsectionID": 0,
            "IsUpsetPrice": null,
            "ImgUrl": "/GYSimg/image/0/feeca482-ed41-42a2-bb38-a58b92532b2d_Watermark.JPG?x-oss-process=image/resize,w_336,h_400,limit_0,m_fixed",
            "ParentID": "102103",
            "ModelName": "挂件/吊坠",
            "IsVedioPath": null,
            "IntervalPrice": null
        },
        {
            "row_id": 4,
            "ProID": 21103,
            "ProductName": "糯冰种晴水马到成功挂坠",
            "Title": "",
            "UpsetPrice": 1980,
            "Price": 2772,
            "MarketPrice": 0,
            "StockCount": 1,
            "PostDate": "2016-10-17 20:10:07",
            "BarCode": "6900004000551",
            "IsStatus": 1,
            "BrandID": 4,
            "IsSpot": true,
            "SupplierID": 4,
            "AuditDate": "2016-10-17 20:10:14",
            "ReadCount": 0,
            "Property": 1,
            "Contents": "质地细腻 纯洁无瑕玉养人一生，人养玉三年，渊生珠而崖不牯，玉在山而草木润翡翠经磨励封藏地表多年,它充满生机却又那么坚定不移。它吸收了天地灵气，再经能工巧匠之手，剩下来的事情，就是静静的等候与你相遇。\n",
            "MID": 103,
            "LastDate": "2016-10-17 20:10:14",
            "AuditRemark": "",
            "IsReadNew": 0,
            "StaffID": 0,
            "ProductNumber": "A-HT0040551",
            "CID": 0,
            "IsPrivate": null,
            "Source": "0",
            "ProsectionID": 0,
            "IsUpsetPrice": null,
            "ImgUrl": "/GYSimg/image/0/f2e4db80-7268-43e8-a4a3-70e0598ae02d_Watermark.JPG?x-oss-process=image/resize,w_336,h_400,limit_0,m_fixed",
            "ParentID": "102103",
            "ModelName": "挂件/吊坠",
            "IsVedioPath": null,
            "IntervalPrice": null
        },
        {
            "row_id": 5,
            "ProID": 21106,
            "ProductName": "糯冰种墨翠弥勒佛挂坠",
            "Title": "",
            "UpsetPrice": 1980,
            "Price": 2772,
            "MarketPrice": 0,
            "StockCount": 1,
            "PostDate": "2016-10-17 20:09:45",
            "BarCode": "6900004000542",
            "IsStatus": 1,
            "BrandID": 4,
            "IsSpot": true,
            "SupplierID": 4,
            "AuditDate": "2016-10-17 20:09:52",
            "ReadCount": 0,
            "Property": 1,
            "Contents": "质地细腻 纯洁无瑕玉养人一生，人养玉三年，渊生珠而崖不牯，玉在山而草木润翡翠经磨励封藏地表多年,它充满生机却又那么坚定不移。它吸收了天地灵气，再经能工巧匠之手，剩下来的事情，就是静静的等候与你相遇。\n",
            "MID": 103,
            "LastDate": "2016-10-17 20:09:52",
            "AuditRemark": "",
            "IsReadNew": 0,
            "StaffID": 0,
            "ProductNumber": "A-HT0040542",
            "CID": 0,
            "IsPrivate": null,
            "Source": "0",
            "ProsectionID": 0,
            "IsUpsetPrice": null,
            "ImgUrl": "/GYSimg/image/0/fc139e30-d75f-4c14-82c1-b3e4c5a11ffd_Watermark.JPG?x-oss-process=image/resize,w_336,h_400,limit_0,m_fixed",
            "ParentID": "102103",
            "ModelName": "挂件/吊坠",
            "IsVedioPath": null,
            "IntervalPrice": null
        },
        {
            "row_id": 6,
            "ProID": 21108,
            "ProductName": "糯冰种无色观音挂坠",
            "Title": "",
            "UpsetPrice": 1980,
            "Price": 2772,
            "MarketPrice": 0,
            "StockCount": 1,
            "PostDate": "2016-10-17 20:09:24",
            "BarCode": "6900004000544",
            "IsStatus": 1,
            "BrandID": 4,
            "IsSpot": true,
            "SupplierID": 4,
            "AuditDate": "2016-10-17 20:09:30",
            "ReadCount": 0,
            "Property": 1,
            "Contents": "质地细腻 纯洁无瑕玉养人一生，人养玉三年，渊生珠而崖不牯，玉在山而草木润翡翠经磨励封藏地表多年,它充满生机却又那么坚定不移。它吸收了天地灵气，再经能工巧匠之手，剩下来的事情，就是静静的等候与你相遇。\n",
            "MID": 103,
            "LastDate": "2016-10-17 20:09:30",
            "AuditRemark": "",
            "IsReadNew": 0,
            "StaffID": 0,
            "ProductNumber": "A-HT0040544",
            "CID": 0,
            "IsPrivate": null,
            "Source": "0",
            "ProsectionID": 0,
            "IsUpsetPrice": null,
            "ImgUrl": "/GYSimg/image/0/f7d36a24-08e3-4284-b5ac-e0ee337f55d7_Watermark.JPG?x-oss-process=image/resize,w_336,h_400,limit_0,m_fixed",
            "ParentID": "102103",
            "ModelName": "挂件/吊坠",
            "IsVedioPath": null,
            "IntervalPrice": null
        },
        {
            "row_id": 7,
            "ProID": 21082,
            "ProductName": "糯冰种飘翠平安扣挂坠",
            "Title": "",
            "UpsetPrice": 1980,
            "Price": 2772,
            "MarketPrice": 0,
            "StockCount": 1,
            "PostDate": "2016-10-17 20:08:59",
            "BarCode": "6900004000533",
            "IsStatus": 1,
            "BrandID": 4,
            "IsSpot": true,
            "SupplierID": 4,
            "AuditDate": "2016-10-17 20:09:06",
            "ReadCount": 0,
            "Property": 1,
            "Contents": "质地细腻 纯洁无瑕玉养人一生，人养玉三年，渊生珠而崖不牯，玉在山而草木润翡翠经磨励封藏地表多年,它充满生机却又那么坚定不移。它吸收了天地灵气，再经能工巧匠之手，剩下来的事情，就是静静的等候与你相遇。\n",
            "MID": 103,
            "LastDate": "2016-10-17 20:09:06",
            "AuditRemark": "",
            "IsReadNew": 0,
            "StaffID": 0,
            "ProductNumber": "A-HT0040533",
            "CID": 0,
            "IsPrivate": null,
            "Source": "0",
            "ProsectionID": 0,
            "IsUpsetPrice": null,
            "ImgUrl": "/GYSimg/image/0/e4c3f4a0-75e0-459d-8d2a-4ad4c0f28f7e_Watermark.JPG?x-oss-process=image/resize,w_336,h_400,limit_0,m_fixed",
            "ParentID": "102103",
            "ModelName": "挂件/吊坠",
            "IsVedioPath": null,
            "IntervalPrice": null
        },
        {
            "row_id": 8,
            "ProID": 20738,
            "ProductName": "冰糯种晴水龙牌挂坠",
            "Title": "",
            "UpsetPrice": 1200,
            "Price": 1680,
            "MarketPrice": 0,
            "StockCount": 1,
            "PostDate": "2016-10-17 09:13:13",
            "BarCode": "6900060000239",
            "IsStatus": 1,
            "BrandID": 0,
            "IsSpot": true,
            "SupplierID": 169,
            "AuditDate": "2016-10-17 09:13:21",
            "ReadCount": 0,
            "Property": 1,
            "Contents": "",
            "MID": 103,
            "LastDate": "2016-10-17 09:13:21",
            "AuditRemark": "",
            "IsReadNew": 0,
            "StaffID": 0,
            "ProductNumber": "A-MF0600239",
            "CID": 0,
            "IsPrivate": null,
            "Source": "0",
            "ProsectionID": 0,
            "IsUpsetPrice": null,
            "ImgUrl": "/GYSimg/image/0/d337d47c-15d3-4653-a16a-fc6e82b288ce_Watermark.jpg?x-oss-process=image/resize,w_336,h_400,limit_0,m_fixed",
            "ParentID": "102103",
            "ModelName": "挂件/吊坠",
            "IsVedioPath": null,
            "IntervalPrice": null
        },
        {
            "row_id": 9,
            "ProID": 20742,
            "ProductName": "冰糯种飘翠仿古圆牌挂坠",
            "Title": "",
            "UpsetPrice": 4000,
            "Price": 5600,
            "MarketPrice": 0,
            "StockCount": 1,
            "PostDate": "2016-10-17 09:12:16",
            "BarCode": "6900060000246",
            "IsStatus": 1,
            "BrandID": 0,
            "IsSpot": true,
            "SupplierID": 169,
            "AuditDate": "2016-10-17 09:12:24",
            "ReadCount": 0,
            "Property": 1,
            "Contents": "",
            "MID": 103,
            "LastDate": "2016-10-17 09:12:24",
            "AuditRemark": "",
            "IsReadNew": 0,
            "StaffID": 0,
            "ProductNumber": "A-MF0600246",
            "CID": 0,
            "IsPrivate": null,
            "Source": "0",
            "ProsectionID": 0,
            "IsUpsetPrice": null,
            "ImgUrl": "/GYSimg/image/0/deeb0879-c1b4-4f87-a125-78e17b106ff8_Watermark.jpg?x-oss-process=image/resize,w_336,h_400,limit_0,m_fixed",
            "ParentID": "102103",
            "ModelName": "挂件/吊坠",
            "IsVedioPath": null,
            "IntervalPrice": null
        },
        {
            "row_id": 10,
            "ProID": 20782,
            "ProductName": "糯冰种春带彩英明神武挂坠",
            "Title": "",
            "UpsetPrice": 2600,
            "Price": 3640,
            "MarketPrice": 0,
            "StockCount": 1,
            "PostDate": "2016-10-17 09:11:21",
            "BarCode": "6900042000292",
            "IsStatus": 1,
            "BrandID": 0,
            "IsSpot": true,
            "SupplierID": 150,
            "AuditDate": "2016-10-17 09:11:28",
            "ReadCount": 0,
            "Property": 1,
            "Contents": "质地细腻 纯洁无瑕玉养人一生，人养玉三年，渊生珠而崖不牯，玉在山而草木润翡翠经磨励封藏地表多年,它充满生机却又那么坚定不移。它吸收了天地灵气，再经能工巧匠之手，剩下来的事情，就是静静的等候与你相遇。",
            "MID": 103,
            "LastDate": "2016-10-17 09:11:28",
            "AuditRemark": "",
            "IsReadNew": 0,
            "StaffID": 0,
            "ProductNumber": "A-YXS0420292",
            "CID": 0,
            "IsPrivate": null,
            "Source": "0",
            "ProsectionID": 0,
            "IsUpsetPrice": null,
            "ImgUrl": "/GYSimg/image/0/c8191adc-46d7-4cb7-9f51-732ead735f9a_Watermark.jpg?x-oss-process=image/resize,w_336,h_400,limit_0,m_fixed",
            "ParentID": "102103",
            "ModelName": "挂件/吊坠",
            "IsVedioPath": null,
            "IntervalPrice": null
        }
    ],
    "tableName": null,
    "dataset": null,
    "count": 0,
    "other": null
};