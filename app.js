//app.js
App({
  baseUrl: 'https://douban.uieee.com',
  city:'',
  getData:function(obj){
    wx.request({
      url: this.baseUrl + obj.url,
      header: { "content-type": "json" },
      method: 'GET',
      data:obj.data,
      success: function (res) {
        obj.callback && obj.callback(res);
      }
    })
  }
})