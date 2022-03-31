<template>
<div class="web-warp" :class="skin_template">
    <div :class="header_class" id="jl_vip_zt_header_warp"><div id="jl_vip_zt_header"></div></div>
    <div class="content-warp"><router-view v-if="post_details&&baseInfo"></router-view></div>
    <div :class="footer_class" id="jl_vip_zt_footer_warp"><div id="jl_vip_zt_footer"></div></div>
    <!-- <div class="template-warp">
      <span @click="skinClick('template1')">红</span>
      <span @click="skinClick('template2')">蓝</span>
      <span @click="skinClick('template3')">绿</span>
      <span @click="skinClick('template4')">紫</span>
    </div> -->
</div>
</template>
<style lang="less">
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
// .template-warp{
//   position: fixed;
//   top: 10px;
//   right: 0;
//   span{
//     cursor: pointer;
//     padding: 1px 2px;
//     border-radius: 4px;
//     background-color: #eee;
//     border: 1px solid #eee;
//   }
// }
</style>
<script>
import store from '@/router/store'
export default {
  name: 'index',
  created(){
    var _that = this;
    let appDetails = store.state.appDetails;
    //详情
    if(!appDetails || appDetails==null || appDetails==undefined || appDetails ==''){
      _that.http.getPlain('getcurrentappinfo','appcode=news').then((res) => {
        if(res.data){
          store.commit('appDetails',res.data);
        }
        _that.post_details = true;
      }).catch(err=>{
        _that.$message({type: 'error',message: '获取应用详情失败!'});
      })
    }else{
       _that.post_details = true;
    }
    //获取当前用户机构基础信息
    this.http.getJson('getbaseinfo').then(res=>{
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
    }).catch(err=>{})
  },
  mounted(){
    var headerFooterInfo = localStorage.getItem('headerFooterInfo');
    if(headerFooterInfo && headerFooterInfo!=null && headerFooterInfo!=undefined && headerFooterInfo!= 'undefined'){
      this.skin_template = JSON.parse(headerFooterInfo).themeColor||'template1';
    }
  },
  data () {
    return {
      post_details:false,
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


