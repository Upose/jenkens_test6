/***后台路由 */
async function beforeEnterImplAsync(to, from, next) {
  let token = localStorage.getItem('token');
  if(token){
    let response = await  axios({
      url:'/appcenter/api/baseinfo/getauthinfo?appcode=news',
      method:'get'
    }).then(x=>x.data);
    if (response.data.canAdmin) { next(); return }
    next({ name: '403' })
  }else{
    next();
  }
}
export default {
  router: [
    {
      path: '/admin_newsProgram',
      name: 'admin_newsProgram',
      component: r => require.ensure([], () => r(require('@/components/admin/program/news_program')), 'news_program'),
      meta: {
        title: [{ name: '栏目管理'}],
        keepAlive: true,
        parentRoute:'admin_newsProgram'
      },
    },
    {
      path: '/admin_newsSelect',
      name: 'admin_newsSelect',
      component: r => require.ensure([], () => r(require('@/components/admin/program/news_select')), 'news_select'),
      meta: {
        title: [{ name: '栏目管理',path:'/admin_newsProgram' }, { name: '新闻检索', }],
        keepAlive: true,
        parentRoute:'admin_newsProgram'
      },
    },
    {
      path: '/admin_programInfo',
      name: 'admin_programInfo',
      component: r => require.ensure([], () => r(require('@/components/admin/information/news_infor')), 'news_infor'),
      meta: {
        title: [{ name: '新闻发布',}],
        keepAlive: true,
        parentRoute:'admin_programInfo'
      },
    },
    {
      path: '/admin_addNews',
      name: 'admin_addNews',
      component: r => require.ensure([], () => r(require('@/components/admin/information/add_news')), 'add_news'),
      meta: {
        title: [{ name: '新闻发布',}],
        keepAlive: true,
        parentRoute:'admin_programInfo'
      },
    },
    {
      path: '/admin_newsSet',
      name: 'admin_newsSet',
      component: r => require.ensure([], () => r(require('@/components/admin/news_set/news_set')), 'news_set'),
      meta: { title: '新闻发布-应用设置', keepAlive: true },
      meta: {
        title: [{ name: '应用设置'}],
        keepAlive: true,
        parentRoute:'admin_newsSet'
      },
    },
    {
      path: '/admin_newsLog',
      name: 'admin_newsLog',
      component: r => require.ensure([], () => r(require('@/components/admin/news_log/news_log')), 'news_log'),
      meta: {
        title: [{ name: '栏目信息管理'}, { name: '日志', }],
        keepAlive: true,
        parentRoute:'admin_newsProgram'
      },
    },
    {
      path: '/admin_programAdd',
      name: 'admin_programAdd',
      component: r => require.ensure([], () => r(require('@/components/admin/program/program_add')), 'news_release'),
      meta: {
        title: [{ name: '栏目管理', path: '/admin_newsProgram' }, { name: '栏目内容', }],
        keepAlive: true,
        parentRoute:'admin_newsProgram'
      },
    },
    {
      path: '/admin_preview1',
      name: 'admin_preview1',
      component: r => require.ensure([], () => r(require('@/components/admin/preview/page1')), 'news_preview'),
      meta: {
        title: [{ name: '预览'}],
        keepAlive: true
      },
    },
    {
      path: '/admin_preview2',
      name: 'admin_preview2',
      component: r => require.ensure([], () => r(require('@/components/admin/preview/page2')), 'news_preview'),
      meta: {
        title: [{ name: '预览'}],
        keepAlive: true
      },
    },
  ].map(x=>{
    x.  beforeEnter= beforeEnterImplAsync;
    return x;
  })
}