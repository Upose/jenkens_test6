/***后台路由 */
async function beforeEnterImplAsync(to, from, next) {
  let token = localStorage.getItem('token');
  if(token){
    let response = await  axios({
      url:'/appcenter/api/baseinfo/getauthinfo?appcode=news',
      method:'get'
    }).then(x=>x.data);
    if (response.data.canAdmin) { nextPage(to.fullPath,next); return }
    next({ name: '403' })
  }else{
    nextPage(to.fullPath,next);
  }
}
async function nextPage(path,next){
  next()
}
export default {
  router: [
    {
      path: '/admin_newsProgram',
      name: 'admin_newsProgram',
      component: () => import('@/components/admin/program/news_program'),
      meta: {
        title: [{ name: '栏目管理'}],
        keepAlive: true,
        parentRoute:'/admin_newsProgram'
      },
    },
    {
      path: '/admin_newsSelect',
      name: 'admin_newsSelect',
      component: () => import('@/components/admin/program/news_select'),
      meta: {
        title: [{ name: '栏目管理',path:'/admin_newsProgram' }, { name: '新闻检索', }],
        keepAlive: true,
        parentRoute:'/admin_newsProgram'
      },
    },
    {
      path: '/admin_programInfo',
      name: 'admin_programInfo',
      component: () => import('@/components/admin/information/news_infor'),
      meta: {
        title: [{ name: '新闻发布',}],
        keepAlive: true,
        parentRoute:'/admin_programInfo'
      },
    },
    {
      path: '/admin_addNews',
      name: 'admin_addNews',
      component: () => import('@/components/admin/information/add_news'),
      meta: {
        title: [{ name: '新闻发布',}],
        keepAlive: true,
        parentRoute:'/admin_programInfo'
      },
    },
    {
      path: '/admin_newsSet',
      name: 'admin_newsSet',
      component: () => import('@/components/admin/news_set/news_set'),
      meta: { title: '新闻发布-应用设置', keepAlive: true },
      meta: {
        title: [{ name: '应用设置'}],
        keepAlive: true,
        parentRoute:'/admin_newsSet'
      },
    },
    {
      path: '/admin_newsLog',
      name: 'admin_newsLog',
      component: () => import('@/components/admin/news_log/news_log'),
      meta: {
        title: [{ name: '栏目信息管理'}, { name: '日志', }],
        keepAlive: true,
        parentRoute:'/admin_programInfo'
      },
    },
    {
      path: '/admin_programAdd',
      name: 'admin_programAdd',
      component: () => import('@/components/admin/program/program_add'),
      meta: {
        title: [{ name: '栏目管理', path: '/admin_newsProgram' }, { name: '栏目内容', }],
        keepAlive: true,
        parentRoute:'/admin_newsProgram'
      },
    },
    {
      path: '/admin_preview1',
      name: 'admin_preview1',
      component: () => import('@/components/admin/preview/detailspage1'),
      meta: {
        title: [{ name: '预览'}],
        keepAlive: true
      },
    },
    {
      path: '/admin_preview2',
      name: 'admin_preview2',
      component: () => import('@/components/admin/preview/detailspage2'),
      meta: {
        title: [{ name: '预览'}],
        keepAlive: true
      },
    },
  ].map(x=>{
    x.beforeEnter= beforeEnterImplAsync;
    return x;
  })
}