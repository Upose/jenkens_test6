<!---新闻发布-应用设置-->
<template>
  <div class="admin-warp-page">
    <el-container>
      <el-aside width="auto" :collapse="$root.collapse" :class="$root.collapse?'fold-menu':''"><serviceLMenu :isActive="3"></serviceLMenu></el-aside>
      <el-main class="admin-content pd admin-bg-top" :class="{'content-collapse':$root.collapse}">
        <breadcrumb :cuMenu="'应用中心'" :fontColor="'fff'"></breadcrumb><!--面包屑导航--->
        <div class="content">
          <el-form :model="postForm" :rules="rules" ref="ruleForm" label-width="150px" class="admin-form">
            <h1 class="s-b-border-title">应用设置</h1>
            <div class="form-content">
              <el-form-item label="启用敏感词过滤">
                <!-- <el-radio-group v-model="postForm.resource">
                  <el-radio label="否"></el-radio>
                  <el-radio label="是"></el-radio>
                </el-radio-group> -->
                <el-switch v-model="postForm.delivery"></el-switch>
              </el-form-item>
              <el-form-item label="统一关闭评论留言">
                <!-- <el-radio-group v-model="postForm.resource">
                  <el-radio label="是"></el-radio>
                  <el-radio label="否"></el-radio>
                </el-radio-group> -->
                <el-switch v-model="postForm.delivery"></el-switch>
              </el-form-item>
              <el-form-item label="栏目管理权限">
                <div class="table-pd">
                    <el-table :data="tableData" row-key="id" border class="alert-table" default-expand-all :tree-props="{children: 'children', hasChildren: 'hasChildren'}">
                      <el-table-column prop="id" label="序号" width="80" class="table-p-l"></el-table-column>
                      <el-table-column prop="name" label="栏目名称" width="180"></el-table-column>
                      <el-table-column prop="rous" label="授权管理员"></el-table-column>
                      <el-table-column prop="content" label="操作" width="180">
                        <template slot-scope="scope">
                          <el-button @click="handleSet(scope.row)" type="text" size="mini" icon="el-icon-edit" round>修改</el-button>
                        </template>
                      </el-table-column>
                    </el-table>
                </div>
              </el-form-item>
              <el-form-item>
                <el-button icon="el-icon-close" size="medium">重置</el-button>
                <el-button icon="el-icon-check" size="medium" type="primary" @click="submitForm('postForm')">保存</el-button>
              </el-form-item>
            </div>
          </el-form>
        </div><!---内容板块 end--->
        <editsq :dataList="alert_data" @alertHide="alertHide" v-if="alert_show"></editsq>
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
import editsq from "./model/editsq";
export default {
  name: 'index',
  created(){
    bus.$on('collapse', msg => {
        this.$root.collapse = msg;
    })
  },
  components:{footerPage,serviceLMenu,breadcrumb,editsq},
  data () {
    return {
      select_img:null,
      alert_data:[],
      alert_show:false,
      tableData: [{
          id: 1,
          name: '新闻公告',
          rous: '李老师、王老师',
          children: [{
              id: 2,
              name: '撰稿',
          rous: '李老师、王老师',
            }, {
              id: 3,
              name: '初审',
              rous: '王老师',
          }, {
              id: 4,
              name: '初校',
              rous: '李老师',
          }, {
              id: 5,
              name: '发布',
              rous: '李老师',
          }]
        }, {
          id: 6,
          name: '资源动态',
          rous: '李老师、王老师',
        }, {
          id: 7,
          name: '党建新闻',
          rous: '李老师'
        }],
      postForm: {
          name: '',
          desc: ''
      },
      rules: {
          name: [
              { required: true, message: '请输入内容', trigger: 'blur' }
          ],
          desc: [
              { required: true, message: '请输入内容', trigger: 'blur' }
          ]
      },
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
    alertHide(){
      this.alert_show = false;
    },
    handleSet(){
      this.alert_show = true;
    },
    //表单提交
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
          if (valid) {
              
          } else {
              
          }
      });
    },
    
  },
}
</script>

<style lang="less" scoped>
@import "../../../assets/admin/css/color.less";/**颜色配置 */
@import "../../../assets/admin/css/form.less";
  .content{
    min-height: 600px;
    background-color: @fff;
    border-radius: 4px;
    box-shadow: 0px 5px 5px rgba(0, 0, 0, 0.02);
    .form-content{
      // max-width: 740px;
    }
  }
  .table-pd{
    border: 1px solid #E4E6FC;
    border-radius: 3px;
    padding:22px;
    
      /deep/ .el-table--enable-row-transition .el-table__body td:first-child .cell{
        margin-left: 0;
        padding-left: 15px;
      }
      /deep/.el-table [class*=el-table__row--level] .el-table__expand-icon{
        margin-left: -20px;
        margin-right: 0px;
      }
      /deep/ .el-table__row--level-1{
        color: @909399 !important;
      }
    /deep/ .el-table__indent{
      padding-left: 10px !important;
      margin-left: -29px;
    }
    /deep/ .el-table--enable-row-transition .el-table__body td{
      padding-left: 15px;
    }
  }
.alert-table{
  /deep/  thead th{
    padding: 3px 0;
  }
  /deep/  td{
    padding:9px 0;
  }
}
</style>
