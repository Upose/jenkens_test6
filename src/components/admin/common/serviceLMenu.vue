<!--左边菜单-->
<template>
  <div class="header-warp">
    <div class="m-menu">
      <div class="m-text">
        <span class="m">新闻发布</span>
        <span class="v">v1.0.0</span>
      </div>
    </div>
    <div class="s-menu">
      <div class="s-row" :class="isActive==(index+1)?'active':''"  :title="item.title" @click="openPage(item.url)" v-for="(item,index) in dataList" :key="index+'menu'"><i class="el-icon-s-ticket"></i><span>{{item.title}}</span></div>
    </div>
  </div>
</template>

<script>
import bus from '@/assets/public/js/bus';
export default {
  name: 'test',
  props:['isActive'],
  // created(){
  //   // 通过 Event Bus 进行组件间通信，来折叠侧边栏
  //   bus.$on('collapse', msg => {
  //     this.$root.collapse = msg;
  //   })
  // },
  data () {
    return {
      default_img:require('@/assets/admin/img/upload/user-img.png'),
      dataList:[
        // {icon:'el-icon-warning-outline',title:'服务总览',url:'/caseShow'},
        // {icon:'el-icon-warning-outline',title:'场景管理',url:'/sceneManage'},
        // {icon:'el-icon-warning-outline',title:'栏目管理',url:'/programManage'},
        // {icon:'el-icon-warning-outline',title:'终端管理',url:'/terminalManage'},
        {icon:'el-icon-warning-outline',title:'栏目管理',url:'/newsProgram'},
        {icon:'el-icon-warning-outline',title:'馆内资讯',url:'/newsInfo'},
        // {icon:'el-icon-warning-outline',title:'资源动态',url:'/newsProgram'},
        // {icon:'el-icon-warning-outline',title:'党建新闻',url:'/newsProgram'},
        // {icon:'el-icon-warning-outline',title:'业界新闻',url:'/newsProgram'},
        {icon:'el-icon-warning-outline',title:'应用设置',url:'/newsSet'},
      ],
    }
  },
  methods:{
    handleOpen(key, keyPath) {
        console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
        console.log(key, keyPath);
    },
    openPage(url){
      this.$router.push(url)
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
    background: @F4F7FC;
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
      background-color:@6677EF;
    }
    span{
      display: block;
      color: @6677EF;
      padding-left: 16px;
    }
    .m{
      font-size: 24px;
      font-weight: bold;
    }
    .v{
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
    color: @6C757D;
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
      z-index: 9;
      background: #FFFFFF;
      position: relative;
      color: @6777EF !important;
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
        background-color: @6777EF;
      }
    }
  }
  .active{
    width: 245px;
    z-index: 9;
    background: #FFFFFF;
    position: relative;
    color: @6777EF !important;
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
      background-color: @6777EF;
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
