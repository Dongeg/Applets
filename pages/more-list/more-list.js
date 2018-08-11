// pages/more-list/more-list.js
const app = getApp();
Page({
  /**
   * 页面的初始数据
   */
  data: {
    moreData:[],
    param:{
      start: 0,
      count: 18,
    },
    pageindex:1,
    callbackcount:18,
    url:'',
    canReqdata:true,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.initPage(options);
  },
  
  initPage: function (options){
    var that = this;
    var type = options.type;
    var url = '';
    var title ='';
    if (type == 1) {
      url = '/v2/movie/in_theaters';
      that.data.param.city = app.city
      title = '正在上映';
    }
    else if (type == 2){
      url = '/v2/movie/coming_soon';
      title = '即将上映';
    }
    else if (type == 3){
      url = '/v2/movie/top250';
      title = 'top250';
    }
    wx.setNavigationBarTitle({
      title: title,
    })
    that.setData({
      url:url,
    })
    console.log(that.data.url)
    this.getMoreData();
  },
  // 获取数据列表
  getMoreData:function(){
    var that =this;
    app.getData({
      url: that.data.url,
      data: that.data.param,
      callback: function (res) {
        if (res.data.subjects[0]) {
          that.setData({
            moreData: that.data.moreData ? that.data.moreData.concat(res.data.subjects) : res.data.subjects
          })
          that.data.canReqdata = true;
        }
        else {
          that.data.canReqdata = false;
        }
      }
    })
  },
  // 跳转详情页
  toDetails: function (e) {
    var id = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: '../movieDetails/movieDetails?id=' + id
    })
  },
  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    var that = this;
    if (that.data.canReqdata){
      that.data.canReqdata = false;
      that.setData({
        pageindex: that.data.pageindex + 1,  //每次触发上拉事件，把searchPageNum+1
        param: {
          start: that.data.param.start + that.data.param.count +1 ,
          count: 18,
        }
      });
      that.getMoreData(); 
    }
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function (res) {
    if (res.from === 'menu') {
      // 来自页面内转发按钮
      console.log(res.target)
    }
    return {
      title: '分享',
      path: '/page/index/index'
    }
  }
})