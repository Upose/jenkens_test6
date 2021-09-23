<!---新闻发布-栏目管理-新增栏目-->
<template>
  <div class="admin-warp-page">
      <el-form :model="postForm" :rules="rules" ref="ruleForm" label-width="120px" class="admin-form">
        <div class="form-content">
          <el-form-item label="必须登录访问">
            <el-radio-group v-model="postForm.resource">
              <el-radio label="关闭"></el-radio>
              <el-radio label="启用"></el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="授权访问名单">
            <el-radio-group v-model="postForm.resource">
              <el-radio label="全部"></el-radio>
              <el-radio label="指定"></el-radio>
              <el-button size="medium" class="m-l" type="primary" @click="selectUserShow()">选择用户</el-button>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="启用内容评论">
            <!-- <el-radio-group v-model="postForm.resource">
              <el-radio label="否"></el-radio>
              <el-radio label="是"></el-radio>
            </el-radio-group> -->
            <el-switch v-model="postForm.delivery"></el-switch>
          </el-form-item>
          <el-form-item class="m-top">
            <el-button icon="el-icon-close" size="medium">取消</el-button>
            <el-button icon="el-icon-check" size="medium" type="primary" @click="preStep()">上一步</el-button>
            <el-button icon="el-icon-check" size="medium" type="primary" @click="nextStep()">下一步</el-button>
          </el-form-item>
        </div>
      </el-form>
      <selectUser :dataList="select_user_data" @selectUserHide="selectUserHide" v-if="select_user_show"></selectUser>
  </div>
</template>

<script>
import bus from '@/assets/public/js/bus';
import http from "@/assets/public/js/http";
import selectUser from "../../model/selectUser";
export default {
  name: 'index',
  created(){
    bus.$on('collapse', msg => {
        this.$root.collapse = msg;
    })
  },
  components:{selectUser},
  data () {
    return {
      select_user_data:[],
      select_user_show:false,
      postForm: {
          name: '',
          desc: '',
          type: [],
          img:'default'
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
    //上一步
    preStep(){
      this.$emit('nextStep',2);
    },
    //下一步
    nextStep(){
      this.$emit('nextStep',4);
    },
    selectUserShow(){
      console.log(11);
      this.select_user_show = true;
    },
    selectUserHide(){
      this.select_user_show = false;
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
        box-shadow: 0px 5px 5px rgba(0, 0, 0, 0.02);
        border-radius: 4px;
        padding: 0;
        max-width: 824px;
        padding-top: 36px;
        padding-bottom:10px;
        .m-top{
          margin-top: 30px;
        }
    }
  }
</style>
