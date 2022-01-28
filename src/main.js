import Vue from 'vue'
import App from './App'
import router from './router'

import store from './router/store'
import Debounce from '@/assets/public/js/debounce';
import http from '@/assets/public/js/http';
import bus from '@/assets/public/js/bus';

Vue.config.productionTip = false

Vue.component('Debounce',Debounce)
Vue.use(VueI18n)

Vue.prototype.http = http;
Vue.prototype.bus = bus;

const i18n = new VueI18n({
  locale: window.localStorage.getItem('locale')||'zh-CN',
  messages: {
    'zh-CN': require('@/assets/public/lang/zh'),   // 中文
    'zh-HANT': require('@/assets/public/lang/hant'),    // 繁体
    'en-US': require('@/assets/public/lang/en')    // 英文
  }
})
Vue.prototype.backHistory = function(){
  window.history.go(-1);
}
Vue.prototype.addStyle = function(url){
  var link=document.createElement("link"); 
  link.setAttribute("rel", "stylesheet"); 
  link.setAttribute("type", "text/css"); 
  link.setAttribute("href", url+'?version='+new Date().getTime());
  document.getElementsByTagName("body")[0].appendChild(link);
}
Vue.prototype.addScript = function(url){
  var js_element=document.createElement("script");
  js_element.setAttribute("type","text/javascript");
  js_element.setAttribute("src",url+'?version='+new Date().getTime());
  document.getElementsByTagName("body")[0].appendChild(js_element);
}
Vue.prototype.authShowBtn = function(value){
  var list = JSON.parse(window.localStorage.getItem('menuAuth')||'[]');
  var is_show = false;
  if(list.length>0){
    for(var i=0;i<list.length;i++){
      if(list[i].permissionNodes && list[i].permissionNodes.length>0){
        for(var k=0;k<list[i].permissionNodes.length;k++){
            if(list[i].permissionNodes[k].permission == value){
              is_show = true;
            }
        }
      }
    }
    return is_show;
  }
}
router.beforeEach((to, from, next) => {
  // var url = window.location.href;
  // var token = url.split('token')[1];
  // if(token){//做重定向处理否则就不管
  //   window.localStorage.setItem('token',token);
  //   window.location.replace(url.split('token')[0]);
  //   window.location.reload();
  // }else{
  //   next();
  // }
  next();
})

let timer = setInterval(() => {
  if (axios && axios.defaults && axios.defaults.loaded) {
    clearInterval(timer);
    new Vue({
      el: '#news_sys',
      router,
      i18n,
      store,
      components: { App },
      data(){
        return{
          collapse:false,
        }
      },
      template: '<App/>'
    })
  }
}, 100);