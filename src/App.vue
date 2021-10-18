<template>
  <div id="news_sys" class="admin-warp-app">
    <router-view/>
  </div>
</template>

<script>

export default {
  name: 'news_sys',
  mounted(){
    this.$store.commit('getSession');
    this.$i18n.locale = this.$store.state.language;
    this.skin_template = this.$store.state.skin_template;
  },
  data(){
    return {
      
    }
  },
  methods:{
  },
}
</script>

<style lang="less">
@import "./assets/public/css/public.less";/**颜色配置 */
@import "./assets/admin/css/color.less";/**后台管理系统颜色 */
@import "./assets/admin/css/style.less";/**后台管理系统公共样式 */
</style>
