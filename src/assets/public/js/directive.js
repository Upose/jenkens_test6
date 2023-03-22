import Vue from 'vue';
import http from "@/assets/public/js/http";

//自定义事件指令，点击需要判断登录的指令
Vue.directive('clickWithAuthLogin', {
  bind: function (el, binding, vnode) {
    el.onclick = function (event) {
      //阻止事件冒泡
      event.stopPropagation();
      //监听点击事件，判断是否登录
      if (!localStorage.getItem('token')) {
        //未登录，跳转登录，附带当前页面的path,登录成功再跳转到本页面
        console.log('未登录')
        Vue.prototype.$confirm('此功能需要登录后才可使用，是否继续登录?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          http.getJson("userPreferenceList")
            .then(x => console.log(x));//模仿一个需要登录的api，以使用统一的跳转功能

        }).catch(() => {
          Vue.prototype.$message({
            type: 'info',
            message: '已取消登录'
          });
        });
      } else {
        if (binding.expression) {
          //已登录则，如果有后续执行的函数，则继续做组件自己的事件
          binding.value()
        }
      }
    }
    // el.addEventListener('click', (event) => {
    // }, true)
  }
});
// //是否能加载出图片
// const imageIsExist = (url) => {
//   return new Promise((resolve, reject) => {
//       const image = new Image();
//       image.onload = function () {
//           resolve(image);
//       };
//       image.onerror = function () {
//           reject("load failed");
//       };
//       image.src = url;
//   })
// }
// /**
//  * 设置默认图
//  */
// const replaceDefaultImg=(el,binding) => {
//   if (binding.value) {
//     let type = binding.value.type
//     //_src 有文献类型时取随机图 没有文献类型时取默认图
//     let _src = type 
//                 ? `${window.localStorage.getItem('fileUrl')}/public/image/default-cover/default-cover-type${type}-${Math.floor(Math.random()*5+1)}.png`
//                 : `${window.localStorage.getItem('fileUrl')}/public/image/default-cover/default-cover.png`;
//     imageIsExist(binding.value.url).then(() => {
//       el.setAttribute("src", binding.value.url);
//     })
//     .catch(() => {
//         el.setAttribute("src", _src);
//     });
//   }
// }
// Vue.directive('default-image',{
//   bind: function (el, binding, vnode){
//     replaceDefaultImg(el,binding)
//   },
//   update: function (el, binding, vnode){
//     replaceDefaultImg(el,binding)
//   }
// })