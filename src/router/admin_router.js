/***后台路由 */
export default {
    router:[
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
    ],
}