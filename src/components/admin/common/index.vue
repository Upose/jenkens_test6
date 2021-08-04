<template>
<div class="warp">
    <!-- <headerpage></headerpage> -->
    <div class="content-warp"><router-view></router-view></div>
    <!-- <footerpage class="footer-page"></footerpage> -->
</div>
</template>
<style scoped>
.warp{
    width: 100%;
    height: 100%;
    position: relative;
}
/*
.content-warp{
  position: absolute;
  top: 136px;
  left: 0;
  right: 0;
  bottom:80px;
}
.footer-page{
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
}
*/
</style>
<script>
// import headerpage from '@/common/header'
// import footerpage from '@/common/footer'
export default {
  name: 'index',
  // components:{headerpage,footerpage},
  // created(){
  //   this.addStyle('./static/assets/other/element-ui/index.css');
  //   this.addScript('./static/assets/other/element-ui/index.js');
  // },
  mounted(){
    
    console.log('admin-index');
  },
  data () {
    return {}
  },
  methods:{
    addStyle(url){
      var link=document.createElement("link"); 
      link.setAttribute("rel", "stylesheet"); 
      link.setAttribute("type", "text/css"); 
      link.setAttribute("href", url);
      document.getElementsByTagName("head")[0].appendChild(link);
    },
    addScript(url){
      var js_element=document.createElement("script");
      js_element.setAttribute("type","text/javascript");
      js_element.setAttribute("src",url);
      document.getElementsByTagName("head")[0].appendChild(js_element);
    },
  }
}
</script>


