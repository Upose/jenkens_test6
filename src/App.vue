<template>
  <div :class="skin_template">
    <div id="zt_header_sys"></div>
    <div class="content"><router-view/></div>
    <div id="zt_footer_sys"></div>


    <div class="template-warp">
      <span @click="skinClick('template1')">红</span>
      <span @click="skinClick('template2')">蓝</span>
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
    console.log(this.$store.state.skin_template);
    // this.skinClick(this.$store.state.skin_template);
    this.skin_template = this.$store.state.skin_template;
    if(this.$store.state.skin_template == 'template1'){
        var list = [
          {
            cs_url:'http://192.168.21.71:9000/header_sys/temp1/header.css',
            js_url:'http://192.168.21.71:9000/header_sys/temp1/header.js',
          },
          {
            cs_url:'http://192.168.21.71:9000/footer_sys/temp1/footer.css',
            js_url:'http://192.168.21.71:9000/footer_sys/temp1/footer.js',
          },
        ]
        list.forEach(e => {
          this.addStyle(e.cs_url);
          this.addScript(e.js_url);
        });
      }else{
        var list = [
          {
            cs_url:'http://192.168.21.71:9000/header_sys/temp2/header.css',
            js_url:'http://192.168.21.71:9000/header_sys/temp2/header.js',
          },
          {
            cs_url:'http://192.168.21.71:9000/footer_sys/temp2/footer.css',
            js_url:'http://192.168.21.71:9000/footer_sys/temp2/footer.js',
          },
        ]
        list.forEach(e => {
          this.addStyle(e.cs_url);
          this.addScript(e.js_url);
        });
      }
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
    addStyle(url){
      var link=document.createElement("link"); 
      link.setAttribute("rel", "stylesheet"); 
      link.setAttribute("type", "text/css"); 
      link.setAttribute("href", url);
      document.getElementsByTagName("body")[0].appendChild(link);
    },
    addScript(url){
      var js_element=document.createElement("script");
      js_element.setAttribute("type","text/javascript");
      js_element.setAttribute("src",url);
      document.getElementsByTagName("body")[0].appendChild(js_element);
    },
  },
}
</script>

<style lang="less">
@import "./assets/css/style.less";/**通用文件 */
@import "./assets/css/color.less";/**颜色配置 */
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
html,body,#news_sys{
  min-width: 1200px;
  width: 100%;
  height: 100%;
}
#news_sys {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
}
*{
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
</style>
