<!---新闻发布-栏目管理-->
<template>
  <div class="admin-warp-page">
    <el-container>
      <el-aside width="auto" :collapse="$root.collapse" :class="$root.collapse?'fold-menu':''"><serviceLMenu :isActive="1"></serviceLMenu></el-aside>
      <el-main class="admin-content pd admin-bg-top" :class="{'content-collapse':$root.collapse}">
        <breadcrumb :cuMenu="'栏目管理'" :fontColor="'fff'"></breadcrumb><!--面包屑导航--->
        <div class="content search-table-general">
          <div class="search-table-w">
              <h1 class="search-title">栏目管理</h1>
              <div class="search-term">
                  <el-input class="width187" v-model="postForm.name" size="medium" placeholder="新闻全文检索"></el-input>
                  <el-button type="primary" size="medium" icon="el-icon-search" @click="selectClick()">查找</el-button>
              </div>
          </div><!--顶部查询 end-->
          
          <div class="list-content">
            <div class="s-w c-l">
              <span class="m-title"><i class="el-icon-s-platform"></i>默认标签</span>
            </div>
            <div class="row">
              <div class="row-list c-l">
                <div class="row-box set-hover" v-for="i in 3" :key="i+'a'">
                  <div class="r-box-bg">
                    <img src="@/assets/admin/img/upload/s1.png"/>
                    <span class="name">新闻公告</span>
                  </div>
                  <div class="r-box-btns">
                    <el-button type="primary" class="admin-red-btn" size="medium" icon="el-icon-delete" @click="delClick(1)">删除</el-button>
                    <el-button type="primary" size="medium" icon="el-icon-setting" @click="editClick(1)">编辑</el-button>
                  </div>
                </div>
                <div class="row-box set-hover" @click="addClick()">
                  <div class="r-box-bg add-btn">
                    <div class="r-box-add-warp">
                      <i class="el-icon-plus"></i>
                      <span>新增栏目</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div><!----默认标签 end-->

          <div class="list-content m-top">
            <div class="s-w c-l">
              <span class="m-title"><i class="el-icon-s-platform"></i>一带一路专题</span>
            </div>
            <div class="row">
              <div class="row-list c-l">
                <div class="row-box set-hover" v-for="i in 2" :key="i+'b'">
                  <div class="r-box-bg">
                    <img src="@/assets/admin/img/upload/s1.png"/>
                    <span class="name">业界新闻</span>
                  </div>
                  <!--<div class="r-box-btns">
                    <el-button type="primary" class="admin-red-btn" size="medium" icon="el-icon-delete" @click="delClick(1)">删除</el-button>
                    <el-button type="primary" size="medium" icon="el-icon-setting" @click="editClick(1)">编辑</el-button>
                  </div>-->
                </div>
              </div>
            </div>
          </div><!----默认标签 end-->

        </div><!---content end--->
        <footerPage class="top20"></footerPage>
      </el-main>
    </el-container>
  </div>
</template>

<script>
import bus from '@/assets/public/js/bus';
import http from "@/assets/public/js/http";
import footerPage from "@/components/admin/common/footer";
import breadcrumb from "@/components/admin/common/breadcrumb";
import serviceLMenu from "@/components/admin/common/serviceLMenu";
import paging from "@/components/admin/common/paging";

export default {
  name: 'index',
  created(){
    bus.$on('collapse', msg => {
      this.$root.collapse = msg;
    })
  },
  components:{footerPage,serviceLMenu,breadcrumb,paging},
  data () {
    return {
      postForm:{},
    }
  },
  mounted(){
    //   this.initData();
  },
  methods:{
    initData(){
      http.getPlain('AssetNewest','PlateId=109&PageSize=9&PageIndex=1').then(res=>{ //学生专区
          this.list1 = res.result.dtos||[];
      }).catch(err=>{
          console.log(err);
      })
    },
    //查找
    selectClick(){
      this.$router.push('/newsSelect');
    },
    //新增栏目
    addClick(){
      this.$router.push('/programAdd');
    },
    //编辑栏目
    editClick(val){
      this.$router.push({path:'/programAdd',query:{id:val}});
    },
    //删除栏目
    delClick(val){
      this.$confirm('请谨慎执行删除操作, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$message({type: 'success',message: '删除成功!'});
      }).catch(() => {
        this.$message({type: 'info',message: '已取消删除'});          
      });
    },
  },
}
</script>

<style lang="less" scoped>
@import "../../../assets/admin/css/color.less";/**颜色配置 */
@import "../../../assets/admin/css/style.less";/**颜色配置 */
.content{
  .s-w{
      min-height: 60px;
      line-height: 57px;
      padding: 0 20px;
      border-bottom: 1px solid @EBEEF5;
      background-color: @fff;
      .d-title{
        color: @34395E;
        font-size: 14px;
        margin-left: 20px;
      }
    }
}
.m-top{
  margin-top: 24px;
}
  /***内容板块***/
  .list-content{
    background-color: @fff;
    border-radius: 0 0 4px 4px;
    margin-top: 5px;
    .row{
      padding: 10px;
      .row-box{
        width:16.6666%;
        width: 268px;
        float: left;
        padding: 15px;
        position: relative;
        .r-box-bg{
          box-shadow: 0px 2px 15px rgba(40, 120, 255, 0.1);
          &:hover{
            box-shadow: 0px 2px 15px rgba(40, 120, 255, 0.25);
          }
        }
        .add-btn{
          height: 241px;
          padding: 5px;
          border: 1px dotted @ACACAC;
          border-radius: 5px;
          .r-box-add-warp{
            color: @B7BEC1;
            cursor: pointer;
            font-size: 14px;
            width: 100%;
            height: 100%;
            display: flex;
            align-items: center;
            justify-content: center;
            flex-direction: column;
            background-color: @F5F8F9;
            box-shadow:none;
            i{
              font-size: 26px;
            }
            span{
              margin-top: 13px;
            }
          }
        }
        img{
          width: 100%;
          border-radius: 5px 5px 0px 0px;
        }
        span.name{
          display: block;
          height: 60px;
          color: @34395E;
          font-size: 14px;
          line-height: 60px;
          text-align: center;
          position: relative;
          border-radius: 0px 0px 3px 3px;
          
        }
        .r-box-btns{
          display: none;
          position: absolute;
          bottom: 90px;
          left: 0;
          right: 0;
          text-align: center;
          /deep/ .el-button{
            height: 32px;
            padding: 6px 14px;
          }
        }
      }
      /***移入显示设置按钮**/
      .set-hover{
        &:hover{
          .r-box-btns{
            display: block;
          }
        }
        
      }
    }
  }
</style>
