<!--左边菜单-->
<template>
  <LeftNavCom :dataList="dataList"/>
</template>

<script>
import LeftNavCom from '../model/LeftNavCom/index.vue'
export default {
  name: 'test',
  components: {
    LeftNavCom
  },
  watch:{
    '$route':'force'
  },
  mounted(){
    var _this = this;
    let appDetails = this.$store.state.appDetails;
    if(appDetails && appDetails!=null && appDetails!=undefined && appDetails !=''){
      _this.appDetails = appDetails;
    }
  },
  computed: {
    dataList() {
      return this.$store.state.menuList || [];
    }
  },
  data () {
    return {
      default_img:require('@/assets/admin/img/upload/user-img.png'),
      appDetails:{},//应用详情
    }
  },
  methods:{
    openLog(url){
      window.location.href = url;
    },
    openPage(url){
      this.$router.push(url).catch(err=>{});
    },
    force(){
      this.$forceUpdate();
    },
  },
}
</script>

<style lang="less" scoped>
@import "../../../assets/admin/css/color.less";/**颜色配置 */
.m-menu{
  padding-left: 20px;
  padding-top: 22px;
  padding-bottom: 22px;
  .m-text{
    display: inline-block;
    vertical-align: middle;
    width: 200px;
    height: 80px;
    background: @ph-col-n2;
    opacity: 1;
    border-radius: 8px;
    position:relative;
    padding-left: 30px;
    padding-top:17px;
    &::after{
      content: '';
      position: absolute;
      height: 40px;
      width: 2px;
      top: 17px;
      background-color:@m-col-b9;
    }
    span{
      display: block;
      color: @m-col-b9;
      padding-left: 16px;
    }
    .m{
      font-size: 24px;
      font-weight: bold;
    }
    .v{
      cursor: pointer;
      display: block;
      font-size: 12px;
    }
  }
}
.s-menu{
  .s-row{
    height: 40px;
    line-height: 40px;
    font-size: 13px;
    color: @ph-col-n10;
    font-weight: bold;
    padding: 0 50px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    i{
      visibility: visible;
      transition: visibility 0s .3s;
      margin-right: 8px;
    }
    &:hover{
      cursor: pointer;
      width: 245px;
      z-index: 20;
      background: #FFFFFF;
      position: relative;
      color: @m-col-b7 !important;
      box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.05);
      border-radius: 0px 3px 3px 0px;
      transition: width .3s ease-in-out;
      &:after{
        content: '';
        display: block;
        width: 2px;
        height: 15px;
        position: absolute;
        right: 0;
        top:13px;
        background-color: @m-col-b7;
      }
    }
  }
  .active{
    width: 245px;
    z-index: 20;
    background: #FFFFFF;
    position: relative;
    color: @m-col-b7 !important;
    box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.05);
    border-radius: 0px 3px 3px 0px;
    transition: width .3s ease-in-out;
    &:after{
      content: '';
      display: block;
      width: 2px;
      height: 15px;
      position: absolute;
      right: 0px;
      top:13px;
      background-color: @m-col-b7;
    }
  }
}
/***折叠后菜单**/
.fold-menu{
  .s-row{
    padding:0;
    font-size: 12px;
    font-weight: 400;
    span{
      width: 60px;
      display: inline-block;
      overflow: hidden;
      overflow: hidden;
      text-overflow:ellipsis;
      white-space: nowrap;
      margin-left: 10px;
    }
    i{
      margin-right: 0;
      display: none;
    }
    &:hover{
      width: 80px;
      transition: width .3s ease-in-out;
    }
  }
  .active{
    width:80px;
    transition: width .3s ease-in-out;
  }
  .m-menu{
    padding-left: 6px;
    .m-text{
      width: 70px;
      height: 39px;
      padding-left: 0;
      padding-top:4px;
      border-radius:3px;
      &::after{
        height: 28px;
        top: 4px;
      }
      span{
        padding-left: 4px;
      }
      .m{
        font-size: 13px;
        overflow: hidden;
        text-overflow:ellipsis;
        white-space: nowrap;
      }
    }
  }
}
</style>
