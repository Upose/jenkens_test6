import Vue from "vue";

Vue.directive('appLog',{
  bind: function (el, binding, vnode) {
    el.onclick = function (e) {
      console.log('appLog',binding);
    }
  }
})