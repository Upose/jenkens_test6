<template>
<div class="warp">
    <div id="zt_header_sys"></div>
    <div class="content-warp"><router-view></router-view></div>
    <div id="zt_footer_sys"></div>
</div>
</template>
<style scoped>
.warp{
    width: 100%;
    height: 100%;
    position: relative;
}
</style>
<script>
export default {
  name: 'index',
  mounted(){
    console.log(this.$store.state.skin_template);
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
  data () {
    return {
    }
  },
  methods:{
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
  }
}
</script>


