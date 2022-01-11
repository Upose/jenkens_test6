/***门户路由 */
export default {
    router:[
        {
          path: '/web_list1',
          name: 'web_list1',
          component: r => require.ensure([], () => r(require('@/components/web/view/temp1/list')), 'list'),
          meta: { title: '列表页面-模板1' , keepAlive:true},
        },
        {
          path: '/web_detailspage1',
          name: 'web_detailspage1',
          component: r => require.ensure([], () => r(require('@/components/web/view/temp1/detailspage')), 'list'),
          meta: { title: '详情页面-模板1' , keepAlive:true},
        },
        {
          path: '/web_list2',
          name: 'web_list2',
          component: r => require.ensure([], () => r(require('@/components/web/view/temp2/list')), 'list'),
          meta: { title: '列表页面-模板2' , keepAlive:true},
        },
        {
          path: '/web_detailspage2',
          name: 'web_detailspage2',
          component: r => require.ensure([], () => r(require('@/components/web/view/temp2/detailspage')), 'list'),
          meta: { title: '详情页面-模板2' , keepAlive:true},
        },
    ],
}