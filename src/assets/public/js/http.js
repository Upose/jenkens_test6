import axios from 'axios';
// import qs from 'qs'

var token = 'Bearer eyJhbGciOiJSUzI1NiIsImtpZCI6IjNVUFByYmlXWko4MjBaWHpxVUVreXciLCJ0eXAiOiJhdCtqd3QifQ.eyJuYmYiOjE2MjU3MDY3NTIsImV4cCI6MTYyNTc5MzE1MiwiaXNzIjoiaHR0cDovL2xvY2FsaG9zdDo1NTU1IiwiYXVkIjpbIkNsaWVudDAiLCJDbGllbnQ5OTkiXSwiY2xpZW50X2lkIjoiY2xpZW50X2RlbW9fOTk5Iiwic3ViIjoiMTZ8OTk5fGRlbW98Ml8xXzE4OTk2MjIwODYxXzAiLCJhdXRoX3RpbWUiOjE2MjU3MDY3NTIsImlkcCI6ImxvY2FsIiwiVXNlcklkIjoiMTZ8OTk5fGRlbW98Ml8xXzE4OTk2MjIwODYxXzAiLCJzY29wZSI6WyJvcGVuaWQiLCJDbGllbnQwIiwiQ2xpZW50OTk5Iiwib2ZmbGluZV9hY2Nlc3MiXSwiYW1yIjpbInB3ZCJdfQ.NUPgdTTeuJgLXr6lA-CvjumsTBZoX7ftlUca4XBxk051lhi-SBmlxpFwn1Cl05z5ini6HG8zcK_i3ahlzfhl_WjvAxlxLkVUM3KDuYBBaiI2HBdAy-QL5W7rMdvP13Tv8zW05Nhwdeossq4Tnkp4_lB_PPuvNLjNwXmLG6zPOGI_BZs15iObKsLgZ7uk4iIbuU4wnZzqNXs184Pf2JtmZxIZvweu4tnseviNN-fEKtlC9kSYM3-wp3KUMQ0h75LekmxbM8lirkje6xDx94ICM0HrSK0_5lq7lXIR2IkvDjGwaBKivhmRv6pCySAUmdMq7lWOYFq0yGfWuhXBBaBVDg';
axios.defaults.timeout = 20000;

import admin_api from '@/assets/admin/js/admin_api';
import web_api from '@/assets/web/js/web_api';

export default {
  admin_postUrl:admin_api.postUrl,
  web_postUrl:web_api.postUrl,

  //不带token的get方法  --- json
  noGet:function(pageTyle,url,data){
    return new Promise((resolve, reject) => {
      axios({
        url: pageTyle=='web'?this.web_postUrl[url]:this.admin_postUrl[url],
        data: data,
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        },
      }).then(response => {
        const result = response.data;
        if (result.status == 200) {
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
  noPost:function(pageTyle,url,data){
    return new Promise((resolve, reject) => {
      axios({
        url: pageTyle=='web'?this.web_postUrl[url]:this.admin_postUrl[url],
        data: data,
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
      }).then(response => {
        const result = response.data;

        if (result.status == 200) {
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
  getJson: function (pageTyle,url, data) {
    return new Promise((resolve, reject) => {
      axios({
        url: pageTyle=='web'?this.web_postUrl[url]:this.admin_postUrl[url],
        data: data,
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': token
        },
      }).then(response => {
        const result = response.data;
        if (result.status == 200) {
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
  postJson: function (pageTyle, url, data) {
    return new Promise((resolve, reject) => {
      axios({
        url: pageTyle=='web'?this.web_postUrl[url]:this.admin_postUrl[url],
        data: data,
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': token
        },
      }).then(response => {
        const result = response.data;

        if (result.status == 200) {
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
  getPlain: function (pageTyle,url, data) {
    return new Promise((resolve, reject) => {
      axios({
        url: (pageTyle=='web'?this.web_postUrl[url]:this.admin_postUrl[url])+'?'+data,
        method: 'GET',
        headers: {
          'Content-Type': 'text/plain',
          'Authorization': token
        },
      }).then(response => {
        const result = response.data;
        if (result.status == 200) {
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
  postPlain: function (pageTyle, url, data) {
    return new Promise((resolve, reject) => {
      axios({
        url: pageTyle=='web'?this.web_postUrl[url]:this.admin_postUrl[url],
        data:data,
        method: 'POST',
        headers: {
          'Content-Type': 'text/plain',
          'Authorization': token
        },
      }).then(response => {
        const result = response.data;
        if (result.status == 200) {
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
  postFile: function (pageTyle, url, formData) {
    return new Promise((resolve, reject) => {
      axios({
        url: pageTyle=='web'?this.web_postUrl[url]:this.admin_postUrl[url],
        data: formData,
        method: 'POST',
        headers: {
          'Content-Type':'multipart/form-data',
          'Authorization': token
        },
      }).then(response => {
        const result = response.data;
        if (result.status == 200) {
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
