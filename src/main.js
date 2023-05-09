/*
 * @Description: 
 * @Author: gongqin
 * @Date: 2022-08-11 15:47:15
 * @LastEditors: lxx1997 lujiangpeng@vipinfo.com.cn
 * @LastEditTime: 2023-03-14 11:43:54
 */
import Vue from 'vue'
import App from './App'
import router from './router'

import store from './store/index'
import Debounce from '@/assets/public/js/debounce';
import http from '@/assets/public/js/http';
import bus from '@/assets/public/js/bus';
import "@/assets/public/js/directive";
import vDebounce from '@/assets/public/js/vdebounce';
import '@/assets/public/js/plugin'
import Dlib3Tinymce from '@vpscope/dlib3-tinymce'

//2022.11.8 日志 将日志提出为cdn引入模式
import FingerprintJS from '@fingerprintjs/fingerprintjs';
logReportPlugin(Vue, { app: "news", api: "loganalysis/api/log-write/write-log" }, FingerprintJS)
// import logReportPlugin from "log-report-plugin";
// Vue.use(logReportPlugin, { app: "news", api: "loganalysis/api/log-write/write-log" });
// app: 应用id
// api: 上报接口地址 loganalysis/api/log-write/write-log

Vue.config.productionTip = false
Vue.use(vDebounce);

Vue.component('Debounce', Debounce)
// Vue.use(VueI18n)
Vue.use(Dlib3Tinymce)

Vue.prototype.http = http;
Vue.prototype.bus = bus;

// const i18n = new VueI18n({
//   locale: window.localStorage.getItem('locale') || 'zh-CN',
//   messages: {
//     'zh-CN': require('@/assets/public/lang/zh'),   // 中文
//     'zh-HANT': require('@/assets/public/lang/hant'),    // 繁体
//     'en-US': require('@/assets/public/lang/en')    // 英文
//   }
// })
Vue.prototype.backHistory = function () {
  window.history.go(-1);
}
//判断是否本站地址url,返回true表示本站，无需open()(此应用暂时不存在此判断方法，但代码保留)
Vue.prototype.isThirdpartyApp = function (is_web, url) {
  var port_url = {};
  var is_open = false;//true 打开新窗口，false不打开新窗口
  var orgInfo = localStorage.getItem('orgInfo');
  if (orgInfo && orgInfo != '' && orgInfo != undefined && orgInfo != 'null' && orgInfo != 'undefined') {
    port_url = JSON.parse(localStorage.getItem('orgInfo')) || {};
    if (is_web) {
      (url.indexOf(port_url.onlinePortalUrl) > -1 || url.indexOf(port_url.portalUrl) > -1) ? is_open = true : is_open = false;
    } else {
      (url.indexOf(port_url.onlineManageUrl) > -1 || url.indexOf(port_url.manageUrl) > -1) ? is_open = true : is_open = false;
    }
  }
  return is_open;
}
Vue.prototype.addStyle = function (url) {
  var link = document.createElement("link");
  link.setAttribute("rel", "stylesheet");
  link.setAttribute("type", "text/css");
  link.setAttribute("href", url + '?version=' + new Date().getTime());
  document.getElementsByTagName("body")[0].appendChild(link);
}
Vue.prototype.addScript = function (url) {
  var js_element = document.createElement("script");
  js_element.setAttribute("type", "text/javascript");
  js_element.setAttribute("src", url + '?version=' + new Date().getTime());
  document.getElementsByTagName("body")[0].appendChild(js_element);
}
Vue.prototype.authShowBtn = function (path, value) {
  var list = store.state.menuList;
  var is_show = false;
  if (list.length > 0) {
    for (var i = 0; i < list.length; i++) {
      if (list[i].listPermission && list[i].listPermission.length > 0 && list[i].component.indexOf(path) > -1) {
        for (var k = 0; k < list[i].listPermission.length; k++) {
          if (list[i].listPermission[k] == value) {
            // console.log(list[i].listPermission[k] , value);
            is_show = true;
          }
        }
      }
    }
    return is_show;
  }
}

let timer = setInterval(() => {
  if (axios && axios.defaults && axios.defaults.loaded && Vue.$createLegacyMixin) {
    clearInterval(timer);
    new Vue({
      el: '#news_sys',
      router,
      // i18n,
      store,
      components: { App },
      data() {
        return {
          collapse: false,
          fileUrl: '',
        }
      },
      template: '<App/>'
    })
  }
}, 100);
