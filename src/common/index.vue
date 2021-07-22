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
  data () {
    return {}
  },
  methods:{
    
  }
}
</script>


