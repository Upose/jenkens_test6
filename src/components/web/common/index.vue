<template>
<div class="web-warp" :class="skin_template">
    <div :class="header_class" id="jl_vip_zt_header_warp"><div id="jl_vip_zt_header"></div></div>
    <div class="content-warp"><router-view v-if="baseInfo"></router-view></div>
    <div :class="footer_class" id="jl_vip_zt_footer_warp"><div id="jl_vip_zt_footer"></div></div>
    <!-- <div class="template-warp">
      <span @click="skinClick('template1')">红</span>
      <span @click="skinClick('template2')">蓝</span>
      <span @click="skinClick('template3')">绿</span>
      <span @click="skinClick('template4')">紫</span>
    </div> -->
</div>
</template>
<style scoped lang="less">
.web-empty-data{
  background: url(../../../assets/public/img/data-empty.png) no-repeat center;
  width: 100%;
  min-height: 180px;
}
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
  created(){
    //根据userkey获取指定应用的权限类型
    this.http.getPlain('getuserapppermissiontype','approutecode=assembly').then(res=>{
      console.log('根据userkey获取指定应用的权限类型',res);
    }).catch(err=>{})

    //判断用户对指定应用是否有使用权限(前台)
    this.http.getPlain('getuserapppermission','approutecode=assembly').then(res=>{
      console.log('判断用户对指定应用是否有使用权限(前台)',res);
    }).catch(err=>{})

    //获取当前用户机构基础信息
    this.http.getJson('getbaseinfo').then(res=>{
      console.log(res);
      if(res.data){
        this.header_class = res.data.headerFooterInfo.headerTemplateCode||'';
        this.footer_class = res.data.headerFooterInfo.footerTemplateCode||'';
        this.addStyle(res.data.headerFooterInfo.headerRouter+'/component.css');
        this.addScript(res.data.headerFooterInfo.headerRouter+'/component.js');

        this.addStyle(res.data.headerFooterInfo.footerRouter+'/component.css');
        this.addScript(res.data.headerFooterInfo.footerRouter+'/component.js');
        this.$root.fileUrl = res.data.orgInfo.fileUrl||'';
        this.baseInfo = true;
      }
      console.log('用户基本信息',res);
    }).catch(err=>{})
  },
  mounted(){},
  data () {
    return {
      baseInfo:false,
      header_class:'',
      footer_class:'',
      skin_template:this.$store.state.skin_template||'template1',
    }
  },
  methods:{
    
  }
}
</script>


