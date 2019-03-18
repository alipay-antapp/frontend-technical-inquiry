import { dataRequest } from '/utils/request.js';

Page({
  data: {
    entrylist: [],
    cellWidth: 300,
    emptyData: {
      icon: 'iconshuju',
      text: '暂无详细数据',
      show: false,
      height: my.getSystemInfoSync().windowHeight
    },
    keywords: ["腾讯","二维码","日","妈逼"]
  },
  onLoad(query) {
    // 页面加载
    let that = this;
    that.getData();
  },
  onReady() {
    // 页面加载完成
  },
  onShow() {
    // 页面显示
  },
  onHide() {
    // 页面隐藏
  },
  onUnload() {
    // 页面被关闭
  },
  onTitleClick() {
    // 标题被点击
  },
  onPullDownRefresh() {
    // 页面被下拉
  },
  onReachBottom() {
    // 页面被拉到底部
  },
  onShareAppMessage() {
    // 返回自定义分享信息
    return {
      title: 'My App',
      desc: 'My App description',
      path: 'pages/index/index',
    };
  },
  getData() {
    let that = this;
    let baseUrl = 'https://timeline-merger-ms.juejin.im';
    let param = {
      src: 'web',
      uid: '',
      device_id: '',
      token: '',
      limit: '5',
      category: '5562b415e4b00c57d9b94ac8'
    }
    let res = dataRequest(baseUrl, '/v1/get_entry_by_timeline', param);
    res.then(result => {
      let entrylist = [];
      result.d.entrylist.forEach(ele => {
        if (!!ele.original) {
          entrylist.push(ele);
        }
      })
      entrylist.forEach(ele => {
        ele.title = ele.title.replace(/['二维码'|'腾讯'|'妈逼'|'操']/g, '*')
      })
      that.setData({
        entrylist,
        'emptyData.show': !!entrylist.length? false: true,
        cellWidth: my.getSystemInfoSync().windowWidth
      })
    }).catch(()=>{
      that.setData({
        'emptyData.show': true
      })
    })
  },
  toDetail(e) {
    let that = this;
    let url = e.target.dataset.originalUrl;
    let title = e.target.dataset.title;
    let id = url.split('/')[4];
    my.navigateTo({
      url: `/pages/juejin-detail/juejin-detail?objectId=${id}&title=${title}`
    })
  },
  refreshData() {
    let that = this;
    that.getData();
  }
});
