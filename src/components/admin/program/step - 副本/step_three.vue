<!---新闻发布-栏目管理-新增栏目-->
<template>
  <div class="admin-warp-page">
      <el-form :model="postForm" :rules="rules" ref="postForm" label-width="120px" class="admin-form">
        <div class="form-content">
          <el-form-item label="必须登录访问" prop="isLoginAcess">
            <!-- <el-radio-group v-model="postForm.isLoginAcess">
              <el-radio :label="0">关闭</el-radio>
              <el-radio :label="1">启用</el-radio>
            </el-radio-group> -->
            <el-switch :active-value="1" :inactive-value="0" v-model="postForm.isLoginAcess"></el-switch>
          </el-form-item>
          <el-form-item label="授权访问名单" prop="visitingList">
            <el-radio-group v-model="postForm.visitingList">
              <el-radio label="-1">全部</el-radio>
              <el-radio label="指定"></el-radio>
              <el-button size="medium" class="m-l" v-if="postForm.visitingList!='-1'" type="primary" @click="selectUserShow()">选择用户</el-button>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="启用内容评论">
            <!-- <el-radio-group v-model="postForm.resource">
              <el-radio label="否"></el-radio>
              <el-radio label="是"></el-radio>
            </el-radio-group> -->
            <el-switch :active-value="1" :inactive-value="0" v-model="postForm.isOpenComment"></el-switch>
          </el-form-item>
          <el-form-item class="m-top">
            <el-button icon="iconfont el-icon-vip-quxiao" size="medium" @click="backHistory()">取消</el-button>
            <el-button icon="iconfont el-icon-vip-shangyibu" size="medium" type="primary" @click="preStep()">上一步</el-button>
            <el-button icon="iconfont el-icon-vip-xiayibu" size="medium" type="primary" @click="nextStep()">下一步</el-button>
          </el-form-item>
        </div>
      </el-form>
      <selectUser :dataList="select_user_data" @selectUserHide="selectUserHide" @getCheckUser="getCheckUser" v-if="select_user_show"></selectUser>
  </div>
</template>

<script>
import selectUser from "../../model/selectUser";
export default {
  name: 'index',
  created(){
    this.bus.$on('collapse', msg => {
        this.$root.collapse = msg;
    })
  },
  components:{selectUser},
  mounted(){
  },
  data () {
    return {
      select_user_data:{},
      select_user_show:false,
      postForm: {
        isLoginAcess:0,//必须登录访问
        visitingList:'-1',//授权访问名称 必填 0是全部 1是指定授权访问名单
        isOpenComment:0,//启用内容评分
      },
      rules: {
        visitingList: [
          { required: true, message: '请输入内容', trigger: 'blur' }
        ],
      },
    }
  },
  mounted(){
  },
  methods:{
    setDetails(newVal){
      this.postForm.isLoginAcess = newVal.isLoginAcess||0;
      this.postForm.isOpenComment = newVal.isOpenComment||0;
      this.postForm.visitingList = newVal.visitingList;
      this.postForm.visitingListModel = newVal.visitingListModel||{};
      this.select_user_data = newVal.visitingListModel||{};
    },
    //上一步
    preStep(){
      this.$emit('nextStep',{n:2,step:'pre'});
    },
    //下一步
    nextStep(){
      this.$emit('nextStep',{n:4,step:'next',data:this.postForm});
    },
    selectUserShow(){
      console.log(11);
      this.select_user_show = true;
    },
    selectUserHide(){
      this.select_user_show = false;
    },
    getCheckUser(val){
      console.log(val);//这里将拿到的数据放入表单
      this.postForm['visitingListModel'] = val;
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
