<!---新闻发布-栏目管理-新增栏目-->
<template>
  <div class="admin-warp-page">
    <el-container>
      <el-aside width="auto" :collapse="$root.collapse" :class="$root.collapse?'fold-menu':''"><serviceLMenu :isActive="1"></serviceLMenu></el-aside>
      <el-main class="admin-content pd admin-bg-top" :class="{'content-collapse':$root.collapse}">
        <breadcrumb :cuMenu="'新闻发布'" :fontColor="'fff'"></breadcrumb><!--面包屑导航--->
        <div class="content">
          <h1 class="s-b-border-title">{{id?'编辑新闻栏目':'新增新闻栏目'}}</h1>
          <steps :countNum="countNum" :cuStep="cuStep" class="step-bg"></steps>
          <step_one v-if="cuStep==1" @nextStep="nextStep"></step_one>
          <step_two v-if="cuStep==2" @nextStep="nextStep"></step_two>
          <step_three v-if="cuStep==3" @nextStep="nextStep"></step_three>
          <step_four v-if="cuStep==4" @nextStep="nextStep"></step_four>
        </div><!---顶部查询板块 end--->
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
import steps from '../model/steps';
import step_one from './step/step_one';
import step_two from './step/step_two';
import step_three from './step/step_three';
import step_four from './step/step_four';
export default {
  name: 'index',
  created(){
    bus.$on('collapse', msg => {
        this.$root.collapse = msg;
    })
  },
  components:{footerPage,serviceLMenu,breadcrumb,steps,step_one,step_two,step_three,step_four},
  data () {
    return {
      countNum:[{title:'基本信息'},{title:'风格样式'},{title:'读者互动'},{title:'内容审查'}],//步骤列表
      cuStep:1,//当前步骤
      id:this.$route.query.id,
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
    nextStep(val){
      this.cuStep = val;
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
@import "../../../assets/admin/css/style.less";/**颜色配置 */
@import "../../../assets/admin/css/form.less";
  .content{
    border-radius: 4px;
    box-shadow: 0px 5px 5px rgba(0, 0, 0, 0.02);
    .admin-form{
        background-color: @fff;
    }
    .step-bg{
        background-color: #fff;
        margin-top: 24px;
        border-radius: 4px 4px 0 0;
        padding-top: 24px;
    }
    .form-content{
        padding-top: 40px;
        padding-right: 24px;
        width: 724px;
        box-shadow: 0px 5px 5px rgba(0, 0, 0, 0.02);
        border-radius: 4px;
      /deep/.el-input{
        max-width: 500px;
      }
      /deep/.el-date-editor{
        max-width: 500px;
        width: 100%;
      }
    }
  }
</style>
