// pages/searchPage/searchPage.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    key: '',
    isShowHistroy:false,
    histroy: [],
    searchResult: [],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function () {
    var that = this;
    wx.getStorage({
      key: 'histroy',
      success: function (res) {
        if (res.data) {
          var result = res.data.split(',');
          that.setData({
            histroy: result,
            isShowHistroy:true,
          })
        }
      }
    })
  },
  getkey: function (e) {
    this.setData({
      key: e.detail.value
    })
  },
  clearHistroy:function(){
    var that = this;
    wx.removeStorage({
      key: 'histroy',
      success: function (res) {
        that.setData({
          isShowHistroy: false,
        })
      }
    })
  },
  histroyHandle: function (val) {
    var histroy = wx.getStorageSync('histroy');
    if (histroy) {
      var arr = histroy.split(',');
      for (var i = 0; i < arr.length; i++) {
        if (arr[i] == val) {
          return
        }
      }
      arr.push(val);
      var value = arr.join(',');
      wx.setStorageSync('histroy', value)
    }
    else {
      wx.setStorageSync('histroy', val)
    }


  },
  // 返回上一页
  back: function () {
    wx.navigateBack();
  },
  // 
  usehistroy:function(e){
    var val = e.currentTarget.dataset.val;
    this.setData({
      isShowHistroy: false,
      key: val,
    })
    this.getSearchResult();
  },
  // 跳转详情页
  toDetails: function (e) {
    var id = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: '../movieDetails/movieDetails?id=' + id
    })
  },
  // 获取搜索结果
  getSearchResult: function () {
    var that = this;
    this.histroyHandle(that.data.key);
    app.getData({
      url: '/v2/movie/search',
      data: {
        q: that.data.key
      },
      callback: function (res) {
        that.setData({
          isShowHistroy: false,
          searchResult: res.data.subjects
        })

      }
    })
  },

})