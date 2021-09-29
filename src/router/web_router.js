/***门户路由 */
export default {
    router:[
        {
          path: '/list1',
          name: 'list1',
          component: r => require.ensure([], () => r(require('@/components/web/view/list/temp1/list')), 'list'),
          meta: { title: '列表页面-模板1' , keepAlive:true},
        },
        {
          path: '/detailspage1',
          name: 'detailspage1',
          component: r => require.ensure([], () => r(require('@/components/web/view/details/temp1/detailspage')), 'list'),
          meta: { title: '详情页面-模板1' , keepAlive:true},
        },
        {
          path: '/list2',
          name: 'list2',
          component: r => require.ensure([], () => r(require('@/components/web/view/list/temp2/list')), 'list'),
          meta: { title: '列表页面-模板2' , keepAlive:true},
        },
        {
          path: '/detailspage2',
          name: 'detailspage2',
          component: r => require.ensure([], () => r(require('@/components/web/view/details/temp2/detailspage')), 'list'),
          meta: { title: '详情页面-模板2' , keepAlive:true},
        },
    ],
}