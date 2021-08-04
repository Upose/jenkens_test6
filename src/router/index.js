import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/web',
      name: 'index',
      component: r => require.ensure([], () => r(require('@/components/web/common/index')), 'index'),
      meta: { title: '首页' , keepAlive:true},
      children:[
        {
          path: '/list',
          name: 'list',
          component: r => require.ensure([], () => r(require('@/components/web/view/list/temp1/list')), 'list'),
          meta: { title: '列表页面-模板一' , keepAlive:true},
        },
        // {
        //   path: '/details',
        //   name: 'list',
        //   component: r => require.ensure([], () => r(require('@/components/web/view/details/temp1/details')), 'list'),
        //   meta: { title: '详情页面-模板一' , keepAlive:true},
        // },
      ]
    },
    {
      path: '/admin',
      name: 'index',
      component: r => require.ensure([], () => r(require('@/components/admin/common/index')), 'index'),
      meta: { title: '首页' , keepAlive:true},
      children:[
        {
          path: '/admin_table',
          name: 'admin_table',
          component: r => require.ensure([], () => r(require('@/components/admin/view/table')), 'admin_table'),
          meta: { title: '列表页面' , keepAlive:true},
        },
      ]
    },
    {
      path: '*',
      name: '/404',
      component: r => require.ensure([], () => r(require('@/components/404')), 'index'),
    },
  ]
})
