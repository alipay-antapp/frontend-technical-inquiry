import { getGithub } from '/utils/request.js';
Page({
  data: {
    page: 9,
    pageSize: 20,
    listData: [],
    emptyData: {
      icon: 'iconshuju',
      text: '暂无详细数据',
      show: false,
      height: my.getSystemInfoSync().windowHeight
    }
  },
  onLoad() {
     // 页面加载
    let that = this;
    that.getListData();
  },
  onShareAppMessage() {
    // 返回自定义分享信息
    return {
      title: 'My App',
      desc: 'My App description',
      path: 'pages/index/index',
    };
  },
  getListData() {
    let that = this;
    let baseUrl = 'https://api.github.com';
    let param = {
      per_page: that.data.pageSize,
      page: that.data.page
    }
    let res = getGithub(baseUrl, '/users/fairyly/repos', param);
    res.then(result => {
      let listData = result;
      if (that.data.page != 1 && !!listData && !!listData.length) {
        let newData = JSON.parse(JSON.stringify(listData));
       
        that.setData({
          'emptyData.show': !!listData.length? false: true,
          listData: newData
        })
        return false;
      }
      that.setData({
        listData,
        cellWidth: my.getSystemInfoSync().windowWidth
      })
    }).catch(()=>{
      that.setData({
        'emptyData.show': true
      })
    })
  },
  refreshData() {
    let that = this;
    that.getListData();
  },
  toDetail(e) {
    let that = this;
    let url = e.target.dataset.url;
    my.setClipboard({
      text:url,
      success: () => {
        my.alert({ title: '复制成功'});
      },
      fail:()=> {
         my.alert({ title: '复制失败'});
      }
    });
  }

});
