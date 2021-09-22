<!---新闻发布-栏目管理-新增栏目-->
<template>
  <div class="admin-warp-page">
      <el-form :model="postForm" :rules="rules" ref="ruleForm" label-width="120px" class="admin-form">
        <div class="form-content">
          <el-form-item label="侧边列表">
            <div class="temp-select c-l">
              <div class="d-temp-box" v-for="i in 2" :key="i+'a'">
                <span class="temp-name">模板一</span>
                <el-button type="primary" class="button" size="mini"><i class="el-icon-success"></i> 已选</el-button>
              </div>
              <div class="higher-set">
                <i class="el-icon-s-grid"></i>
                <span>高级设置</span>
              </div>
            </div>
          </el-form-item>
          <el-form-item label="侧边列表">
            <el-checkbox-group v-model="postForm.type">
                <el-checkbox label="左侧显示同标签栏目" name="type"></el-checkbox>
                <el-checkbox label="左侧显示新闻标签" name="type"></el-checkbox>
            </el-checkbox-group>
          </el-form-item>
          <el-form-item label="显示系统信息">
            <el-checkbox-group v-model="postForm.type">
                <el-checkbox label="列表显示发布日期" name="type"></el-checkbox>
                <el-checkbox label="列表显示新闻访问次数" name="type"></el-checkbox>
                <el-checkbox label="列表显示摘要" name="type"></el-checkbox>
                <el-checkbox label="列表显示新闻标签" name="type"></el-checkbox>
                <el-checkbox label="详情显示发布日期" name="type"></el-checkbox>
                <el-checkbox label="详情显示访问次数" name="type"></el-checkbox>
                <el-checkbox label="详情显示审核信息" name="type"></el-checkbox>
            </el-checkbox-group>
          </el-form-item>
          <el-form-item label="启用内容封面">
            <!-- <el-radio-group v-model="postForm.resource">
              <el-radio label="否"></el-radio>
              <el-radio label="是"></el-radio>
            </el-radio-group> -->
            <el-switch v-model="postForm.delivery"></el-switch>
            <el-select class="m-l" v-model="postForm.img" placeholder="请选择">
              <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item class="m-top">
            <el-button icon="el-icon-close" size="medium">取消</el-button>
            <el-button icon="el-icon-check" size="medium" type="primary" @click="preStep()">上一步</el-button>
            <el-button icon="el-icon-check" size="medium" type="primary" @click="nextStep()">下一步</el-button>
          </el-form-item>
        </div>
      </el-form>
  </div>
</template>

<script>
import bus from '@/assets/public/js/bus';
import http from "@/assets/public/js/http";
import paging from "@/components/admin/common/paging";
export default {
  name: 'index',
  created(){
    bus.$on('collapse', msg => {
        this.$root.collapse = msg;
    })
  },
  data () {
    return {
      options: [{
        value: 'default',
        label: '封面默认尺寸'
      },{
        value: '200',
        label: '200x400'
      },{
        value: '400',
        label: '400x1000'
      }],
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
      this.$emit('nextStep',1);
    },
    //下一步
    nextStep(){
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
      .m-l{
        margin-left: 24px;
      }
      .width500{
        width: 500px;
      }
    }
  }
</style>
