<!---新闻发布-栏目管理-新增栏目-->
<template>
  <div class="admin-warp-page">
      <el-form :model="postForm" :rules="rules" ref="postForm" label-width="120px" class="admin-form">
        <div class="form-content">
          <el-form-item label="默认模板" prop="defaultTemplate">
            <div class="temp-select c-l">
              <div class="d-temp-box" :style="{background:'url('+it.previewPic+')'}" v-for="(it,i) in template_list" :key="i+'a'">
                <span class="temp-name">{{it.name}}</span>
                <el-button type="primary" class="button" size="mini" @click="templateClick(it.id)"><i class="iconfont" :class="it.id==postForm.defaultTemplate?'vip-check':'vip-no-check'"></i> {{it.id==postForm.defaultTemplate?'已选':'选择'}}</el-button>
              </div>
              <div class="higher-set" @click="hfShow()">
                <i class="el-icon-s-grid"></i>
                <span>高级设置</span>
              </div>
            </div>
          </el-form-item>
          <el-form-item label="侧边列表" prop="sideList">
            <el-checkbox-group v-model="postForm.sideList">
                <el-checkbox label="1" name="type">左侧显示同标签栏目</el-checkbox>
                <el-checkbox label="2" name="type">左侧显示新闻标签</el-checkbox>
            </el-checkbox-group>
          </el-form-item>
          <el-form-item label="显示系统信息">
            <el-checkbox-group v-model="postForm.sysMesList">
                <el-checkbox label="1" name="type">列表显示发布日期</el-checkbox>
                <el-checkbox label="2" name="type">列表显示新闻访问次数</el-checkbox>
                <el-checkbox label="3" name="type">列表显示摘要</el-checkbox>
                <el-checkbox label="4" name="type">列表显示新闻标签</el-checkbox>
                <el-checkbox label="5" name="type">详情显示发布日期</el-checkbox>
                <el-checkbox label="6" name="type">详情显示访问次数</el-checkbox>
                <el-checkbox label="7" name="type">详情显示审核信息</el-checkbox>
            </el-checkbox-group>
          </el-form-item>
          <el-form-item label="启用内容封面">
            <el-switch :active-value="1" :inactive-value="0" v-model="postForm.isOpenCover"></el-switch>
            <el-select class="m-l" v-model="postForm.coverSize" placeholder="请选择" :disabled="postForm.isOpenCover!=1">
              <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item class="m-top">
            <el-button icon="el-icon-close" size="medium" @click="$root.backClick()">取消</el-button>
            <el-button icon="el-icon-check" size="medium" type="primary" @click="preStep()">上一步</el-button>
            <el-button icon="el-icon-check" size="medium" type="primary" @click="nextStep()">下一步</el-button>
          </el-form-item>
        </div>
      </el-form>
      <head_foter @hfHide="hfHide" v-if="head_foter_alert"></head_foter>
  </div>
</template>

<script>
import bus from '@/assets/public/js/bus';
import http from "@/assets/public/js/http";
import head_foter from "../../model/head_foter"
import paging from "@/components/admin/common/paging";
export default {
  name: 'index',
  created(){
    bus.$on('collapse', msg => {
        this.$root.collapse = msg;
    })
  },
  components:{head_foter},
  props:{
    dataDetails:JSON.parse(window.sessionStorage.getItem('news-column')||'{}'),
    is_edit:false,
  },
  mounted(){
    this.initData();
    if(this.dataDetails && this.is_edit){
      this.postForm.sideList = (this.dataDetails.sideList||'').split(';');
      console.log(this.postForm);
      this.postForm.sysMesList = (this.dataDetails.sysMesList||'').split(';');
      this.postForm.isOpenCover = this.dataDetails.isOpenCover||0;
      this.postForm.defaultTemplate = this.dataDetails.defaultTemplate;
      this.postForm.coverSize = this.dataDetails.coverSize||'default';
    }
  },
  data () {
    return {
      head_foter_alert:false,
      options: [{
        value: 'default',
        label: '封面默认尺寸'
      },{
        value: '200x400',
        label: '200x400'
      }],
      template_list:[],
      postForm: {
        defaultTemplate:'',//默认模板 必填
        sideList:[],//侧边列表
        sysMesList:[],//显示的系统信息
        isOpenCover:0,//启用内容封面 1开启 0关闭
        coverSize:'default',//封面尺寸
      },
      rules: {
          defaultTemplate: [
              { required: true, message: '请输入内容', trigger: 'blur' }
          ],
          desc: [
              { required: true, message: '请输入内容', trigger: 'blur' }
          ]
      },
    }
  },
  methods:{
    initData(){
      //获取模板列表
      http.postJson('news-template-get',[]).then(res=>{
        this.template_list = res.data||[];
        if(this.template_list.length>0){
          this.postForm.defaultTemplate = this.template_list[0].id;//默认选中第一个模板
        }
      }).catch(err=>{})
    },
    //隐藏高级设置弹窗
    hfHide(){
      this.head_foter_alert = false;
    },
    //显示高级设置弹窗
    hfShow(){
      this.head_foter_alert = true;
    },
    //模板选择
    templateClick(val){
      this.postForm.defaultTemplate = val;
    },
    //上一步
    preStep(){
      this.$emit('nextStep',{n:1,step:'pre'});
    },
    //下一步
    nextStep(){
      this.$emit('nextStep',{n:3,step:'next',data:this.postForm});
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
