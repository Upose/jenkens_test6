/***门户路由 */
export default {
    router:[
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
    ],
}