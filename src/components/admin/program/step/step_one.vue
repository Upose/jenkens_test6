<!---新闻发布-栏目管理-新增栏目-->
<template>
  <div class="admin-warp-page">
      <el-form :model="postForm" :rules="rules" ref="ruleForm" label-width="120px" class="admin-form">
        <div class="form-content">
          <el-form-item label="栏目名称" prop="name">
            <el-input v-model="postForm.name" placeholder="请输入栏目名称"></el-input>
          </el-form-item>
          <el-form-item label="栏目别名" prop="a">
            <el-input v-model="postForm.a" placeholder="请输入栏目别名"></el-input>
          </el-form-item>
          <div class="user-form-item">
            <label class="u-label"><span class="el-input">栏目标签</span></label>
            <div class="u-list">
              <input type="text" class="u-input" placeholder="标签可以为栏目设置分类，方便筛选"/>
              <el-button class="u-btn-r" icon="el-icon-search" size="medium" type="primary" @click="tagEditShow()">选择已有标签</el-button>
            </div>
          </div>
          <el-form-item label="多终端同步">
            <!-- <el-radio-group v-model="postForm.resource">
              <el-radio label="是"></el-radio>
              <el-radio label="否"></el-radio>
            </el-radio-group> -->
            <el-switch v-model="postForm.delivery"></el-switch>
          </el-form-item>
          <el-form-item label="状态">
            <el-radio-group v-model="postForm.resource">
              <el-radio label="启用"></el-radio>
              <el-radio label="下架"></el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="内容扩展项">
            <el-checkbox-group v-model="postForm.type">
              <el-checkbox label="作者" name="type"></el-checkbox>
              <el-checkbox label="新闻标签" name="type"></el-checkbox>
              <el-checkbox label="关键词" name="type"></el-checkbox>
              <el-checkbox label="失效日期" name="type"></el-checkbox>
              <el-checkbox label="跳转链接" name="type"></el-checkbox>
              <el-button size="medium" class="m-l" type="primary" @click="extendContent()">自定义扩展</el-button>
            </el-checkbox-group>
          </el-form-item>
          <el-form-item label="栏目地址" prop="a">
            <el-input v-model="postForm.a" placeholder="在门户中访问该栏目的链接地址"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button icon="el-icon-close" size="medium">取消</el-button>
            <el-button icon="el-icon-check" size="medium" type="primary" @click="nextStep('postForm')">下一步</el-button>
          </el-form-item>
        </div>
      </el-form>
      <el-dialog title="自定义扩展" :visible.sync="extend_content" width="400px" :close-on-click-modal="false" :before-close="handleClose">
        <div>
        <h1 class="d-title"><i class="el-icon-menu"></i> <span>自定义扩展添加</span></h1>
          <el-form>
            <el-form-item label="">
              <el-input v-model="postForm.name" placeholder="请输入内容名称"></el-input>
            </el-form-item>
          </el-form>
        </div>
        <span slot="footer" class="dialog-footer">
            <el-button icon="el-icon-close" size="medium" @click="closeClick()">取消</el-button>
            <el-button icon="el-icon-check" size="medium" type="primary" @click="submitForm()">保存</el-button>
        </span>
      </el-dialog>
      <tagEdit :dataList="tag_edit_data" @tagEditHide="tagEditHide" v-if="tag_edit"></tagEdit>
  </div>
</template>

<script>
import bus from '@/assets/public/js/bus';
import http from "@/assets/public/js/http";
import tagEdit from "../../model/tagEdit";
export default {
  name: 'index',
  components:{tagEdit},
  created(){
    bus.$on('collapse', msg => {
        this.$root.collapse = msg;
    })
  },
  data () {
    return {
      extend_content:false,
      tag_edit:false,
      tag_edit_data:[],
      tags: [
        { name: '标签一', type: '' },
        { name: '标签二', type: 'success' },
        { name: '标签三', type: 'info' },
        { name: '标签四', type: 'warning' },
        { name: '标签五', type: 'danger' }
      ],
      postForm: {
          name: '',
          desc: '',
          type: [],
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
    //打开-选择已有标签
    tagEditShow(){
      this.tag_edit = true;
    },
    //关闭-选择已有标签
    tagEditHide(){
      this.tag_edit = false;
    },
    //关闭-自定义扩展
    handleClose(){
      this.extend_content = false;
    },
    //关闭-自定义扩展
    closeClick(){
      this.extend_content = false;
    },
    //打开-自定义扩展
    extendContent(){
      this.extend_content = true;
    },
    //下一步
    nextStep(){
      this.$emit('nextStep',2);
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
@import "../../../../assets/admin/css/color.less";/**颜色配置 */
@import "../../../../assets/admin/css/style.less";/**颜色配置 */
@import "../../../../assets/admin/css/form.less";
  .content{
    border-radius: 4px;
    box-shadow: 0px 5px 5px rgba(0, 0, 0, 0.02);
    .admin-form{
        background-color: @fff;
    }
    .form-content{
        padding-top: 40px;
        padding-right: 24px;
        box-shadow: 0px 5px 5px rgba(0, 0, 0, 0.02);
        border-radius: 4px;
        .m-l{
          margin-left: 24px;
        }
      /deep/.el-input{
        max-width: 500px;
      }
      /deep/.el-date-editor{
        max-width: 500px;
        width: 100%;
      }
      .user-form-item{
        .u-label{
          width: 120px !important;
        }
        .u-list{
          margin-left: -4px;
          padding-right:130px;
        }
        .u-btn-r{
          width: 130px;
        }
      }
    }
  }
  /***标签选择弹窗 */
  .user-check-dialog{
    /deep/ .el-tag{
      margin: 10px;
    }
  }

/****弹窗标题 */
/deep/.el-dialog__body{
  padding: 30px;
  padding-bottom: 10px;
}
.d-title{
    color: @34395E;
    font-size: 14px;
    margin-bottom: 10px;
    span{
        vertical-align: middle;
    }
    i{
        font-size: 16px;
        vertical-align: middle;
    }
}

</style>
