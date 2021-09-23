<template>
  <div :class="skin_template">
    <div class="content"><router-view/></div>
    <div class="template-warp">
      <!-- <span @click="skinClick('template1')">红</span> -->
      <!-- <span @click="skinClick('template2')">蓝</span> -->
      <!-- <span @click="skinClick('template3')">绿</span>
      <span @click="skinClick('template4')">紫</span> -->
    </div>
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
      skin_template:this.$store.state.skin_template||'template1',
    }
  },
  methods:{
    skinClick(val){
      // this.$refs.skin_template.add(val);
      this.skin_template = val;
      this.$store.state.skin_template = this.skin_template;
      this.$store.commit('setSkinTemplate',{skin_template:this.skin_template});
      setTimeout(() => {
          window.location.reload();
      }, 1000);
    },
    
  },
}
</script>

<style lang="less">
// @import "./assets/public/css/style.less";/**通用文件 */
// @import "./assets/public/css/color.less";/**通用文件 */
.template-warp{
  position: fixed;
  top: 10px;
  right: 0;
  span{
    cursor: pointer;
    padding: 1px 2px;
    border-radius: 4px;
    background-color: #eee;
    border: 1px solid #eee;
  }
}
</style>
