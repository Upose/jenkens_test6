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
          <el-form-item label="设置审核流程">
            <div class="audit-warp">
              <span class="next-txt"><i class="el-icon-position"></i><span>撰稿</span></span>
              <span class="next-icon"><i class="el-icon-arrow-right"></i></span>
              <span class="next-txt"><i class="el-icon-position"></i><span>初审</span></span>
              <span class="next-icon"><i class="el-icon-arrow-right"></i></span>
              <span class="next-txt"><i class="el-icon-position"></i><span>初校</span></span>
              <span class="next-icon"><i class="el-icon-arrow-right"></i></span>
              <span class="next-txt"><i class="el-icon-position"></i><span>复审</span></span>
              <span class="next-icon"><i class="el-icon-arrow-right"></i></span>
              <span class="next-txt"><i class="el-icon-position"></i><span>二校</span></span>
              <span class="next-icon"><i class="el-icon-arrow-right"></i></span>
              <span class="next-txt"><i class="el-icon-position"></i><span>终审</span></span>
              <span class="next-icon"><i class="el-icon-arrow-right"></i></span>
              <span class="next-txt"><i class="el-icon-position"></i><span>终校</span></span>
              <span class="next-icon"><i class="el-icon-arrow-right"></i></span>
              <span class="next-txt"><i class="el-icon-position"></i><span>发布</span></span>
            </div>
          </el-form-item>
          <el-form-item class="m-top">
            <el-button icon="el-icon-close" size="medium">取消</el-button>
            <el-button icon="el-icon-check" size="medium" type="primary" @click="preStep()">上一步</el-button>
            <el-button icon="el-icon-check" size="medium" type="primary" @click="submitForm('postForm')">确认</el-button>
          </el-form-item>
        </div>
      </el-form>
  </div>
</template>

<script>
import bus from '@/assets/public/js/bus';
import http from "@/assets/public/js/http";
export default {
  name: 'index',
  created(){
    bus.$on('collapse', msg => {
        this.$root.collapse = msg;
    })
  },
  data () {
    return {
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
    //选择图标
    selectImgClick(val){
      this.select_img = val;
    },
    //打开图标选择弹窗
    selectImg(){
      this.dialogSelectimg = true;
    },
    //关闭图标选择弹窗
    closeClick(){
      this.dialogSelectimg = false;
      this.select_img = null;
    },
    //关闭图标选择弹窗
    selectImgClose(done){
      this.select_img = null;
      done();
    },
    //确定图标选择弹窗
    submitImg(){
      this.dialogSelectimg = false;
      this.select_img = null;
    },
    //打开图标上传弹窗
    upImg(){
      this.dialogUPimg = true;
    },
    //图片上传-弹窗关闭
    handleClose(done) {
      done();
      // this.$confirm('确认关闭？')
      //   .then(_ => {
      //     done();
      //   })
      //   .catch(_ => {});
    },
    //上一步
    preStep(){
      this.$emit('nextStep',3);
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
        padding-top: 36px;
        padding-bottom:10px;
        .m-top{
          margin-top: 30px;
        }
        .audit-warp{

          .next-txt{
            vertical-align: text-top;
            width: 70px;
            height: 90px;
            display: inline-block;
            text-align: center;
            i{
              color: @6777EF;
              display: block;
              width: 70px;
              height: 70px;
              line-height: 70px;
              font-size: 30px;
              border: 2px solid @E4E6FC;
              border-radius: 50%;
            }
            span{
              
              display: block;
              font-size: 14px;
              color: @222534;
            }
          }
          .next-icon{
            vertical-align: text-top;
            display: inline-block;
            height: 90px;
            line-height: 90px;
            color: @6777EF;
            font-size: 20px;
            margin-left: 10px;
            margin-right: 10px;
          }
        }
    }
  }
</style>
