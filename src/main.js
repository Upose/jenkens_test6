import Vue from 'vue'
import App from './App'
import router from './router'

import store from './router/store'
import Debounce from '@/assets/js/debounce'

Vue.config.productionTip = false

Vue.component('Debounce',Debounce)
Vue.use(VueI18n)

const i18n = new VueI18n({
  locale: window.localStorage.getItem('locale')||'zh-CN',
  messages: {
    'zh-CN': require('./assets/lang/zh'),   // 中文
    'zh-HANT': require('./assets/lang/hant'),    // 繁体
    'en-US': require('./assets/lang/en')    // 英文
  }
})

router.beforeEach((to, from, next) => {
  // const token = sessionStorage.getItem('token');
  // if (!token && to.path !== '/login') {
  //     next('/login');
  // } else {
  //   next();
  // }
  next();
})

new Vue({
  el: '#app',
  router,
  i18n,
  store,
  components: { App },
  template: '<App/>'
})
