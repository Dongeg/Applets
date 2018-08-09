//index.js
//获取应用实例
var QQMapWX  = require('../../utils/qqmap-wx-jssdk.js');
var qqmapsdk = null;
const app = getApp();
Page({
  data: {
    city:"",
    top250: {},
    inTheaters: {},
    comingSoon: {},
  },
  onLoad: function () {
    this.getTop250();
    this.getComingSoon();
    this.getInTheaters('广州')
    // this.getUserLocation();
  },
  // 获取用户位置
  getUserLocation: function () {
    var that = this;
    qqmapsdk = new QQMapWX({
      key: 'JDBBZ-5BSW2-GADU4-CJSGH-7A7M2-UTF7P'
    });
    qqmapsdk.reverseGeocoder({
      success: function (res) {
        var name = res.result.address_component.city;
        var used = name.substring(0,name.length-1);
        console.log(used);
        app.city = used;
        that.getInTheaters(used)
      },
      fail: function (res) {
        console.log(res);
      },
      complete: function (res) {
        console.log(res);
      }
    })
  },
  // 跳转更多
  toMoreList:function(e){
    var type = e.currentTarget.dataset.type;
    wx.navigateTo({
      url: '../more-list/more-list?type=' + type
    })
  },
  // 跳转详情页
  toDetails: function (e) {
    var id = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: '../movieDetails/movieDetails?id=' + id
    })
  },
  // 获取正在上映
  getInTheaters: function (city) {
    var that = this;
    app.getData({
      url: '/v2/movie/in_theaters',
      data: {
        start: 0,
        count: 10,
        city:city,
      },
      callback: function (res) {
        res.data.type = 1;
        that.setData({
          inTheaters: res.data
        })

      }
    })
  },
  // 即将上映
  getComingSoon: function () {
    var that = this;
    app.getData({
      url: '/v2/movie/coming_soon',
      data: {
        start: 0,
        count: 10
      },
      callback: function (res) {
        res.data.type = 2;
        that.setData({
          comingSoon: res.data
        })

      }
    })
  },
  // top250
  getTop250: function () {
    var that = this;
    app.getData({
      url: '/v2/movie/top250',
      data: {
        start: 0,
        count: 10
      },
      callback: function (res) {
        res.data.type = 3;
        that.setData({
          top250: res.data
        })

      }
    })
  },
})