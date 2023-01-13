/*
 * @Description: 
 * @Author: gongqin
 * @Date: 2022-08-11 15:47:15
 * @LastEditors: gongqin
 * @LastEditTime: 2023-01-13 09:32:26
 */
import Vue from 'vue'
import Router from 'vue-router'
import webRouter from './web_router';
import adminRouter from './admin_router';
Vue.use(Router)

export default new Router({
  routes: [
    { path: '/admin', redirect: '/admin_newsProgram' },
    {
      path: '/web',
      name: 'index',
      component: () => import('@/components/web/common/index'),
      meta: { title: '首页' , keepAlive:true},
      children:webRouter.router,
    },
    {
      path: '/admin',
      name: 'index',
      component: () => import('@/components/admin/common/index'),
      meta: { title: '首页' , keepAlive:true},
      children:adminRouter.router,
    },
    {
      path: '/404',
      name: '404',
      component: () => import('@/components/404'),
    },
    {
      path: '/403',
      name: '403',
      component: () => import('@/components/403'),
    },
    {
      path: '/500',
      name: '500',
      component: () => import('@/components/500'),
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
