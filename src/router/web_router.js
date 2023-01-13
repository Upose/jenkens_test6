/*
 * @Description: 
 * @Author: gongqin
 * @Date: 2022-08-11 15:47:15
 * @LastEditors: gongqin
 * @LastEditTime: 2023-01-13 09:37:45
 */
/***门户路由 */
async function beforeEnterImplAsync(to, from, next) {
  let response = await  axios({
    url:'/appcenter/api/baseinfo/getauthinfo?appcode=news',
    method:'get'
  }).then(x=>x.data);
  if (response.data.canWeb) { next(); return }
  next({ name: '403' })
}
export default {
    router:[
        {
          path: '/web_newsList',
          name: 'web_newsList',
          component: () => import('@/components/web/view/news_list'),
          meta: { title: '列表页面' , keepAlive:true},
        },
        {
          path: '/web_newsDetails',
          name: 'web_newsDetails',
          component: () => import('@/components/web/view/news_details'),
          meta: { title: '详情页面' , keepAlive:true},
        },
        {
          path: '/web_list1',
          name: 'web_list1',
          component: () => import('@/components/web/view/temp1/list'),
          meta: { title: '列表页面-模板1' , keepAlive:true},
        },
        {
          path: '/web_detailspage1',
          name: 'web_detailspage1',
          component: () => import('@/components/web/view/temp1/detailspage'),
          meta: { title: '详情页面-模板1' , keepAlive:true},
        },
        {
          path: '/web_list2',
          name: 'web_list2',
          component: () => import('@/components/web/view/temp2/list'),
          meta: { title: '列表页面-模板2' , keepAlive:true},
        },
        {
          path: '/web_detailspage2',
          name: 'web_detailspage2',
          component: () => import('@/components/web/view/temp2/detailspage'),
          meta: { title: '详情页面-模板2' , keepAlive:true},
        },
    ].map(x=>{
      x.  beforeEnter= beforeEnterImplAsync;
      return x;
    })
}