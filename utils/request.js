function dataRequest(baseUrl,url, data) {
  return new Promise((resolve, reject) => {
    my.request({
      url: baseUrl + url,
      method: 'GET',
      data: data,
      dataType: 'json',
      success: function(res) {
        if (res.data.m === "ok") {
          resolve(res.data);
        } else {
          my.alert({
            title: res.data.m,
          });
          reject(res.data);
        }
      },
      fail: function(res) {
        my.alert({
          title: res.errorMessage
        });
        reject(res.data);
      },
      complete: function(res) {
        my.hideLoading();
        reject(res.data);
      }
    });
  })
}

function getRequest(baseUrl,url, data) {
  return new Promise((resolve, reject) => {
    my.request({
      url: baseUrl + url,
      method: 'GET',
      data: data,
      dataType: 'json',
      success: function(res) {
        if (!!res.data.success) {
          resolve(res.data);
        } else {
          my.alert({
            title: res.data,
          });
          reject(res.data);
        }
      },
      fail: function(res) {
        reject(res.data);
      },
      complete: function(res) {
        my.hideLoading();
        reject(res.data);
      }
    });
  })
}

function getGithub(baseUrl,url, data) {
  return new Promise((resolve, reject) => {
    my.request({
      url: baseUrl + url,
      method: 'GET',
      data: data,
      dataType: 'json',
      success: function(res) {
        if (!!res.data.length) {
          resolve(res.data);
        } else {
          my.alert({
            title: res.data,
          });
          reject(res.data);
        }
      },
      fail: function(res) {
        reject(res.data);
      },
      complete: function(res) {
        my.hideLoading();
        reject(res.data);
      }
    });
  })
}


module.exports = {
  dataRequest: dataRequest,
  getRequest: getRequest,
  getGithub: getGithub
}