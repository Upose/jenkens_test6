/***后台路由 */
export default {
    router:[
      // {
      //   path: '/table',
      //   name: 'table',
      //   component: r => require.ensure([], () => r(require('@/components/admin/view/table')), 'table'),
      //   meta: { title: '拖动表格' , keepAlive:true},
      // },
      // {
      //   path: '/echars',
      //   name: 'echars',
      //   component: r => require.ensure([], () => r(require('@/components/admin/view/echars')), 'echars'),
      //   meta: { title: 'echars表格' , keepAlive:true},
      // },
      // {
      //   path: '/layui',
      //   name: 'layui',
      //   component: r => require.ensure([], () => r(require('@/components/admin/view/layui_edit')), 'echars'),
      //   meta: { title: 'layui富文本' , keepAlive:true},
      // },
      {
        path: '/newsProgram',
        name: 'newsProgram',
        component: r => require.ensure([], () => r(require('@/components/admin/program/news_program')), 'news_program'),
        meta: { title: '新闻发布-栏目管理' , keepAlive:true},
      },
      {
        path: '/newsInfo',
        name: 'newsInfo',
        component: r => require.ensure([], () => r(require('@/components/admin/information/news_infor')), 'news_infor'),
        meta: { title: '新闻发布-新闻资讯' , keepAlive:true},
      },
      {
        path: '/addNews',
        name: 'addNews',
        component: r => require.ensure([], () => r(require('@/components/admin/information/add_news')), 'add_news'),
        meta: { title: '新闻发布-新闻资讯-新增新闻' , keepAlive:true},
      },
      {
        path: '/newsSelect',
        name: 'newsSelect',
        component: r => require.ensure([], () => r(require('@/components/admin/program/news_select')), 'news_select'),
        meta: { title: '新闻发布-新闻检索' , keepAlive:true},
      },
      {
        path: '/newsSet',
        name: 'newsSet',
        component: r => require.ensure([], () => r(require('@/components/admin/news_set/news_set')), 'news_set'),
        meta: { title: '新闻发布-应用设置' , keepAlive:true},
      },
      {
        path: '/programAdd',
        name: 'programAdd',
        component: r => require.ensure([], () => r(require('@/components/admin/program/program_add')), 'news_release'),
        meta: { title: '新闻发布-新增新闻栏目' , keepAlive:true},
      },
    ],
}