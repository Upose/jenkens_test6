<template>
<div class="web-warp" :class="skin_template">
    <div class="header_sys_temp1"><div id="aa"></div></div>
    <div class="content-warp"><router-view></router-view></div>
    <div class="footer_sys_temp1"><div id="bb"></div></div>
    <div class="template-warp">
      <span @click="skinClick('template1')">红</span>
      <span @click="skinClick('template2')">蓝</span>
      <span @click="skinClick('template3')">绿</span>
      <span @click="skinClick('template4')">紫</span>
    </div>
</div>
</template>
<style scoped lang="less">
.web-warp{
    min-width: 1200px;
    width: 100%;
    height: 100%;
    position: relative;
}
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
<script>
export default {
  name: 'index',
  mounted(){
    console.log(this.$store.state.skin_template);
    this.addStyle('http://192.168.21.71:9000/header_sys/temp1/component.css');
    this.addScript('http://192.168.21.71:9000/header_sys/temp1/component.js');
    
    this.addStyle('http://192.168.21.71:9000/footer_sys/temp1/component.css');
    this.addScript('http://192.168.21.71:9000/footer_sys/temp1/component.js');
    // if(this.$store.state.skin_template == 'template1'){
    //     var list = [
    //       {
    //         cs_url:'http://192.168.21.71:9000/header_sys/temp1/component.css',
    //         js_url:'http://192.168.21.71:9000/header_sys/temp1/component.js',
    //       },
    //       {
    //         cs_url:'http://192.168.21.71:9000/footer_sys/temp1/component.css',
    //         js_url:'http://192.168.21.71:9000/footer_sys/temp1/component.js',
    //       },
    //     ]
    //     list.forEach(e => {
    //       this.addStyle(e.cs_url);
    //       this.addScript(e.js_url);
    //     });
    //   }else{
    //     var list = [
    //       {
    //         cs_url:'http://192.168.21.71:9000/header_sys/temp2/component.css',
    //         js_url:'http://192.168.21.71:9000/header_sys/temp2/component.js',
    //       },
    //       {
    //         cs_url:'http://192.168.21.71:9000/footer_sys/temp2/component.css',
    //         js_url:'http://192.168.21.71:9000/footer_sys/temp2/component.js',
    //       },
    //     ]
    //     list.forEach(e => {
    //       this.addStyle(e.cs_url);
    //       this.addScript(e.js_url);
    //     });
    //   }
  },
  data () {
    return {
      skin_template:this.$store.state.skin_template||'template1',
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
    skinClick(val){
      // this.$refs.skin_template.add(val);
      this.skin_template = val;
      this.$store.state.skin_template = this.skin_template;
      this.$store.commit('setSkinTemplate',{skin_template:this.skin_template});
      setTimeout(() => {
          window.location.reload();
      }, 1000);
    },
  }
}
</script>


