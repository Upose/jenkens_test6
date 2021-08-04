import axios from 'axios';
var token = 'Bearer eyJhbGciOiJSUzI1NiIsImtpZCI6IjNVUFByYmlXWko4MjBaWHpxVUVreXciLCJ0eXAiOiJhdCtqd3QifQ.eyJuYmYiOjE2MjU3MDY3NTIsImV4cCI6MTYyNTc5MzE1MiwiaXNzIjoiaHR0cDovL2xvY2FsaG9zdDo1NTU1IiwiYXVkIjpbIkNsaWVudDAiLCJDbGllbnQ5OTkiXSwiY2xpZW50X2lkIjoiY2xpZW50X2RlbW9fOTk5Iiwic3ViIjoiMTZ8OTk5fGRlbW98Ml8xXzE4OTk2MjIwODYxXzAiLCJhdXRoX3RpbWUiOjE2MjU3MDY3NTIsImlkcCI6ImxvY2FsIiwiVXNlcklkIjoiMTZ8OTk5fGRlbW98Ml8xXzE4OTk2MjIwODYxXzAiLCJzY29wZSI6WyJvcGVuaWQiLCJDbGllbnQwIiwiQ2xpZW50OTk5Iiwib2ZmbGluZV9hY2Nlc3MiXSwiYW1yIjpbInB3ZCJdfQ.NUPgdTTeuJgLXr6lA-CvjumsTBZoX7ftlUca4XBxk051lhi-SBmlxpFwn1Cl05z5ini6HG8zcK_i3ahlzfhl_WjvAxlxLkVUM3KDuYBBaiI2HBdAy-QL5W7rMdvP13Tv8zW05Nhwdeossq4Tnkp4_lB_PPuvNLjNwXmLG6zPOGI_BZs15iObKsLgZ7uk4iIbuU4wnZzqNXs184Pf2JtmZxIZvweu4tnseviNN-fEKtlC9kSYM3-wp3KUMQ0h75LekmxbM8lirkje6xDx94ICM0HrSK0_5lq7lXIR2IkvDjGwaBKivhmRv6pCySAUmdMq7lWOYFq0yGfWuhXBBaBVDg';
axios.defaults.timeout = 20000;
import api from '@/assets/public/js/api';
// import qs from 'qs'
export default {
  baseURL: api.baseURL,
  postUrl:api.postUrl,
  noGet:function(url,data){ //不带token
    return new Promise((resolve, reject) => {
      axios({
        url: this.postUrl[url],
        data: data,
        method: 'GET',
        baseURL: api.baseURL,
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
  noPost:function(url,data){ //不带token
    return new Promise((resolve, reject) => {
      axios({
        url: this.postUrl[url],
        data: data,
        method: 'POST',
        baseURL: api.baseURL,
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
  getJson: function (url, data) {
    return new Promise((resolve, reject) => {
      axios({
        url: this.postUrl[url],
        data: data,
        method: 'GET',
        baseURL: api.baseURL,
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
  getPlain: function (url, data) {
    return new Promise((resolve, reject) => {
      axios({
        url: this.postUrl[url]+'?'+data,
        method: 'GET',
        baseURL: api.baseURL,
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
  postPlain: function (url, data) {
    return new Promise((resolve, reject) => {
      axios({
        url: this.postUrl[url],
        data:data,
        method: 'POST',
        baseURL: api.baseURL,
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
  postJson: function (url, data) {
    return new Promise((resolve, reject) => {
      axios({
        url: this.postUrl[url],
        data: data,
        method: 'POST',
        baseURL: api.baseURL,
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
  postImg: function (url, formData) {
    return new Promise((resolve, reject) => {
      axios({
        url: this.postUrl[url],
        data: formData,
        method: 'POST',
        baseURL: api.baseURL,
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
