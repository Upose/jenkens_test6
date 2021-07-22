import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'index',
      component: r => require.ensure([], () => r(require('@/common/index')), 'index'),
      meta: { title: '首页' , keepAlive:true},
      children:[
        {
          path: '/',
          name: 'list',
          component: r => require.ensure([], () => r(require('@/components/template1/list')), 'list'),
          meta: { title: '列表页面' , keepAlive:true},
        },
      ]
    },
  ]
})
