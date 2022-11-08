/*
 * @Author: huyu
 * @Date: 2022-08-10 16:04:10
 * @LastEditors: huyu
 * @LastEditTime: 2022-08-10 17:31:18
 * @Description: 防抖节流  v-命令方式
 */


/**
 * 按钮节流 点击之后一秒不可再点击
 * 使用方式： v-button-debounce
 * 使用范围：需要防止短时间重复点击的按钮，提交、查询、下载按钮
 */
Vue.directive('button-debounce', {
  bind: function (el, binding) {
    el.addEventListener('click', () => {
      if (!el.disabled) {
        el.classList.add('is-loading')
        el.disabled = true
        setTimeout(() => {
          el.classList.remove('is-loading')
          el.disabled = false
        }, 1000)
      }
    });
  }
});
/**
 * 输入防抖 500毫秒后执行
 * 使用方式：v-input-debounce="function" function为需要执行的方法
 * 适用范围：需要调远程接口的input输入框
 */
Vue.directive('input-debounce', {
  bind: function (el, binding) {
    let tiemer = null;
    el.addEventListener('input', () => {
      if (tiemer) {
        clearTimeout(tiemer)
      }
      tiemer = setTimeout(() => {
        binding.value && binding.value();
      }, 500);
    })
  }
});