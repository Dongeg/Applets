// pages/searchPage/searchPage.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    key:'',
    searchResult:[],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function () {
  
  },
  getkey:function(e){
    this.setData({
      key: e.detail.value
    })
  },
  back:function(){
    wx.navigateBack();
  },
  // 跳转详情页
  toDetails: function (e) {
    var id = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: '../movieDetails/movieDetails?id=' + id
    })
  },
  getSearchResult: function (city) {
    var that = this;
    app.getData({
      url: '/v2/movie/search',
      data:{
        q:that.data.key
      },
      callback: function (res) {
        that.setData({
          searchResult: res.data.subjects
        })

      }
    })
  },

})