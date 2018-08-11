// pages/movieDetails/movieDetails.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    detailsData:null,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getDetailsData(options);
  },
  // 获取页面详情数据
  getDetailsData: function (options){
    var id = options.id;
    var that = this;
    app.getData({
      url: '/v2/movie/subject/' +id,
      data: {},
      callback: function (res) {
        console.log(res)
        that.setData({
          detailsData: res.data
        })
        wx.setNavigationBarTitle({
          title: res.data.title
        })
      }
    })
  },
})