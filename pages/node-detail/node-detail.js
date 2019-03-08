import { getRequest } from '/utils/request.js';
let wxParse = require('/utils/wxParse/wxParse.js');
Page({
  data: {
    topicId: '',
    title: '',
    htmlContent: '',
    allData: {},
    replyTemArray: [],
    emptyData: {
      icon: 'iconshuju',
      text: '暂无详细数据',
      show: false,
      height: my.getSystemInfoSync().windowHeight
    }
  },
  onLoad(query) {
    let that = this;
    my.setNavigationBar({
      title: query.title,
      backgroundColor: '#108ee9'
    })
    that.setData({
      topicId: query.topicId,
      title: query.title
    });
    that.getDetailData(query.topicId,query.title);
  },
  getDetailData(topicId,title) {
    let that = this;
    let baseUrl = 'https://cnodejs.org';
    let param = {
      
    }
    let res = getRequest(baseUrl, `/api/v1/topic/${topicId}`, param);
    res.then(result => {
      let allData = result.data;
      let htmlContent = result.data.content.replace(/['二维码'|'腾讯'|'妈逼'|'操']/g, '*');
      that.setData({
        'emptyData.show': !!allData? false: true,
        htmlContent: result.data.content.replace(/['二维码'|'腾讯'|'妈逼'|'操']/g, '*'),
        title,
        allData
      })
      wxParse.wxParse('htmlContent', 'html', htmlContent, that, 5);

      if (!!allData.replies.length) {
        that.data.nodeName = [];
        allData.replies.forEach((ele, index) => {
          ele.content = ele.content.replace(/['二维码'|'腾讯'|'妈逼'|'操']/g, '*')
          wxParse.wxParse('reply'+index, 'html', ele.content, that, 5);
        })
        setTimeout(function(){
          let replyTemArray = [];
          allData.replies.forEach((ele, index )=> {
            replyTemArray.push(that.data['reply'+index])
          })
          that.setData({
            replyTemArray
          });
        },0)
      }
    }).catch(()=>{
      that.setData({
        'emptyData.show': true
      })
    })
  },
  refreshData() {
    let that = this;
    that.getDetailData(that.data.topicId, that.data.title);
  }
});
