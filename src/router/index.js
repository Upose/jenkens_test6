import Vue from 'vue'
import Router from 'vue-router'
import webRouter from './web_router';
import adminRouter from './admin_router';
Vue.use(Router)

export default new Router({
  routes: [
    // { path: '/', redirect: '/web_list1' },
    { path: '/admin', redirect: '/admin_newsProgram' },
    {
      path: '/web',
      name: 'index',
      component: r => require.ensure([], () => r(require('@/components/web/common/index')), 'index'),
      meta: { title: '首页' , keepAlive:true},
      children:webRouter.router,
    },
    {
      path: '/admin',
      name: 'index',
      component: r => require.ensure([], () => r(require('@/components/admin/common/index')), 'index'),
      meta: { title: '首页' , keepAlive:true},
      children:adminRouter.router,
    },
    {
      path: '/404',
      name: '404',
      component: r => require.ensure([], () => r(require('@/components/404')), 'index'),
    },
    {
      path: '/403',
      name: '403',
      component: r => require.ensure([], () => r(require('@/components/403')), 'index'),
    },
    {
      path: '/500',
      name: '500',
      component: r => require.ensure([], () => r(require('@/components/500')), 'index'),
    },
    {//重定向中间件
      path: '/',
      name: 'reset',
      beforeEnter:async (to, from, next) => {
        let path = await casCallbake('/admin_newsProgram');
        next(path);
      }
    },
    {
      path: '*',
      redirect: '/404',
    }
  ]
})
