import axios from 'axios';
import qs from 'qs'
var token = 'Bearer ' + window.localStorage['token'];
axios.defaults.timeout = 20000;

var baseUrl = 'http://192.168.21.71:10011';
export default {
  postUrl:{
      'pront-news-column-list-get':baseUrl+'/api/news/pront-news-column-list-get',//获取前台新闻栏目数据
      'pront-news-list-data-get':baseUrl+'/api/news/pront-news-list-data-get',//获取前台列表新闻列表数据
      'pront-news-content-get':baseUrl+'/api/news/pront-news-content-get',//获取前台新闻数据
  },

  //不带token的get方法  --- json
  noGet: function (url, data) {
    return new Promise((resolve, reject) => {
      axios({
        url: this.postUrl[url],
        data: data,
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        },
      }).then(response => {
        const result = response.data;
        if (result.statusCode == 200) {
          resolve(result);
        } else {
          error(result.message);
          reject(result);
        }
      }).catch(err => {
        reject(err);
      });
    });
  },
  //不带token的post方法  --- json
  noPost: function (url, data) {
    return new Promise((resolve, reject) => {
      axios({
        url: this.postUrl[url],
        data: data,
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
      }).then(response => {
        const result = response.data;

        if (result.statusCode == 200) {
          resolve(result);
        } else {
          error(result.message);
          reject(result);
        }
      }).catch(err => {
        reject(err);
      });
    });
  },
  //带token的get方法  --- json
  getJson: function (url, data) {
    return new Promise((resolve, reject) => {
      axios({
        url: this.postUrl[url],
        params: data,
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': token
        },
      }).then(response => {
        const result = response.data;
        if (result.statusCode == 200) {
          resolve(result);
        } else {
          error(result.message);
          reject(result);
        }
      }).catch(err => {
        reject(err);
      });
    });
  },
  //带token的delete方法  --- json
  deleteJson: function (url, data) {
    return new Promise((resolve, reject) => {
      axios({
        url: this.postUrl[url],
        data: data,
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': token
        },
      }).then(response => {
        const result = response.data;
        if (result.statusCode == 200) {
          resolve(result);
        } else {
          error(result.message);
          reject(result);
        }
      }).catch(err => {
        reject(err);
      });
    });
  },
  //带token的post方法  --- json
  postJson: function (url, data) {
    return new Promise((resolve, reject) => {
      axios({
        url: this.postUrl[url],
        data: data,
        method: 'POST',
        headers: {
          'Content-Type': 'application/json;charset=UTF-8',
          'Authorization': token
        },
      }).then(response => {
        const result = response.data;

        if (result.statusCode == 200) {
          resolve(result);
        } else {
          error(result.message);
          reject(result);
        }
      }).catch(err => {
        reject(err);
      });
    });
  },
  //带token的put方法  --- json
  putJson: function (url, data) {
    return new Promise((resolve, reject) => {
      axios({
        url: this.postUrl[url],
        data: JSON.stringify(data),
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': token
        },
      }).then(response => {
        const result = response.data;

        if (result.statusCode == 200) {
          resolve(result);
        } else {
          error(result.message);
          reject(result);
        }
      }).catch(err => {
        reject(err);
      });
    });
  },
  //带token的get方法  --- plain ；data参数是在调用时拼接好的（如：id=1&name=张三）
  getPlain: function (url, data) {
    return new Promise((resolve, reject) => {
      axios({
        url: this.postUrl[url] + '?' + data,
        method: 'GET',
        headers: {
          'Content-Type': 'text/plain',
          'Authorization': token
        },
      }).then(response => {
        const result = response.data;
        if (result.statusCode == 200) {
          resolve(result);
        } else {
          error(result.message);
          reject(result);
        }
      }).catch(err => {
        reject(err);
      });
    });
  },
  //带token的post方法  --- plain
  postPlain: function (url, data) {
    return new Promise((resolve, reject) => {
      axios({
        url: this.postUrl[url],
        data: data,
        method: 'POST',
        headers: {
          'Content-Type': 'text/plain',
          'Authorization': token
        },
      }).then(response => {
        const result = response.data;
        if (result.statusCode == 200) {
          resolve(result);
        } else {
          error(result.message);
          reject(result);
        }
      }).catch(err => {
        reject(err);
      });
    });
  },
  // get方法 自拼参数  带token
  getJsonSelf: function (url, data) {
    return new Promise((resolve, reject) => {
      axios({
        url: this.postUrl[url] + data,
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': token
        },
      }).then(response => {
        const result = response.data;
        if (result.statusCode == 200) {
          resolve(result);
        } else {
          error(result.message);
          reject(result);
        }
      }).catch(err => {
        reject(err);
      });
    });
  },
  // post方法 自拼参数  带token
  postJsonSelf: function (url, data) {
    return new Promise((resolve, reject) => {
      axios({
        url: this.postUrl[url]  + data,
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': token
        },
      }).then(response => {
        const result = response.data;
        if (result.statusCode == 200) {
          resolve(result);
        } else {
          error(result.message);
          reject(result);
        }
      }).catch(err => {
        reject(err);
      });
    });
  },
  //带token的文件上传方法  --- form-data
  postFile: function (url, formData) {
    return new Promise((resolve, reject) => {
      axios({
        url: this.postUrl[url],
        data: formData,
        method: 'POST',
        headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization': token
        },
      }).then(response => {
        const result = response.data;
        if (result.statusCode == 200) {
          resolve(result);
        } else {
          error(result.message);
          reject(result);
        }
      }).catch(err => {
        reject(err);
      });
    });
  },
}
