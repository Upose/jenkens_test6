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
        {
          path: '/detailspage',
          name: 'list',
          component: r => require.ensure([], () => r(require('@/components/web/view/details/temp1/detailspage')), 'list'),
          meta: { title: '详情页面-模板一' , keepAlive:true},
        },
      ]
    },
    {
      path: '/admin',
      name: 'index',
      component: r => require.ensure([], () => r(require('@/components/admin/common/index')), 'index'),
      meta: { title: '首页' , keepAlive:true},
      children:[
        {
          path: '/table',
          name: 'table',
          component: r => require.ensure([], () => r(require('@/components/admin/view/table')), 'table'),
          meta: { title: '拖动表格' , keepAlive:true},
        },
        {
          path: '/echars',
          name: 'echars',
          component: r => require.ensure([], () => r(require('@/components/admin/view/echars')), 'echars'),
          meta: { title: 'echars表格' , keepAlive:true},
        },
        {
          path: '/layui',
          name: 'layui',
          component: r => require.ensure([], () => r(require('@/components/admin/view/layui_edit')), 'echars'),
          meta: { title: 'layui富文本' , keepAlive:true},
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
