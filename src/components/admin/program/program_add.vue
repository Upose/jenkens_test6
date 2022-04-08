<!---新闻发布-栏目管理-新增栏目-->
<template>
  <div class="admin-warp-page">
    <el-container>
      <el-aside width="auto" :collapse="$root.collapse" :class="$root.collapse?'fold-menu':''"><serviceLMenu :isActive="1"></serviceLMenu></el-aside>
      <el-main class="admin-content pd admin-bg-top" :class="{'content-collapse':$root.collapse}">
        <breadcrumb :cuMenu="'新闻发布'" :fontColor="'fff'"></breadcrumb><!--面包屑导航--->
        <div class="content">
          <h1 class="s-b-border-title">{{id?'编辑新闻栏目':'新增新闻栏目'}}</h1>
          <steps :countNum="countNum" :cuStep="cuStep" class="step-bg" :isEdit="isEdit" @handleCuStep="handleCuStep"></steps>
          <step_one v-show="cuStep==1" @nextStep="nextStep" ref="step_one_ref" :dataDetails="details_ob" :is_edit="id?true:false"></step_one>
          <step_two v-show="cuStep==2" @nextStep="nextStep" ref="step_two_ref" :dataDetails="details_ob" :is_edit="id?true:false"></step_two>
          <!-- <step_three v-show="cuStep==3" @nextStep="nextStep" ref="step_three_ref" :dataDetails="details_ob" :is_edit="id?true:false"></step_three> -->
          <!-- <step_four v-show="cuStep==4" @nextStep="nextStep" ref="step_four_ref" :dataDetails="details_ob" :is_edit="id?true:false"></step_four> -->
        </div><!---顶部查询板块 end--->
        <footerPage class="top20"></footerPage>
      </el-main>
    </el-container>
  </div>
</template>


<script>
import footerPage from "@/components/admin/common/footer";
import breadcrumb from "@/components/admin/common/breadcrumb";
import serviceLMenu from "@/components/admin/common/serviceLMenu";
import steps from '../model/steps';
import step_one from './step/step_one';
import step_two from './step/step_two';
// import step_three from './step/step_three';
// import step_four from './step/step_four';
import store from '@/router/store'
export default {
  name: 'index',
  created(){
    this.bus.$on('collapse', msg => {
        this.$root.collapse = msg;
    })
  },
  components:{footerPage,serviceLMenu,breadcrumb,steps,step_one,step_two},
  data () {
    return {
      isEdit: false,//是否编辑
      countNum:[{title:'基本信息'},{title:'权限设置'}],//步骤列表
      cuStep:1,//当前步骤
      id:this.$route.query.id,
      details_ob:JSON.parse(window.sessionStorage.getItem('news-column')||'{}'),
      postForm:{
        label:'',
        sysMesList:'',
        sideList:'',
        coverSize:'',
        acessAll:'',
        linkUrl:'',
      },
    }
  },
  beforeRouteLeave(to, form, next) {
    window.sessionStorage.removeItem('news-column');
    next()
  },
  mounted(){
    var _this = this;
    if(this.$route.query.id){ //有id表示修改，则获取详情数据
      this.isEdit = true;
      this.http.getPlain_url('news-column-get','/'+this.$route.query.id).then(res=>{
        _this.details_ob = res.data||{};
        _this.$refs.step_one_ref.setDetails(_this.details_ob);
        _this.$refs.step_two_ref.setDetails(_this.details_ob);
        // window.sessionStorage.setItem('news-column',JSON.stringify(this.details_ob));
      }).catch(err=>{
        
      })
    }
  },
  methods:{
    nextStep(data){
      console.log(data, 'data', this.postForm);
      this.cuStep = data.n;
      var list = data.data||{};
      if(data.step == 'next'){
        if(data.n == 2){
          this.postForm['title'] = list['title']||this.postForm['title'];
          this.postForm['alias'] = list['alias']||this.postForm['alias'];
          this.postForm['label'] = list['label']||this.postForm['label'];
          this.postForm['terminals'] = list['terminals'];
          this.postForm['status'] = list['status']||this.postForm['status'];
          this.postForm['extensionKV'] = list['extensionKV']||this.postForm['extensionKV']; //要做处理
          this.postForm['linkUrl'] = list['linkUrl']||this.postForm['linkUrl'];
          this.postForm['defaultTemplate'] = list['defaultTemplate']||this.postForm['defaultTemplate'];
          this.postForm['headTemplate'] = list['headTemplate']||this.postForm['headTemplate'];
          this.postForm['footTemplate'] = list['footTemplate']||this.postForm['footTemplate'];
          this.postForm['sideList'] = (list['sideList']||[]).toString().replace(/\,/g,';')||this.postForm['sideList'];
          this.postForm['sysMesList'] = (list['sysMesList']||[]).toString().replace(/\,/g,';')||this.postForm['sysMesList'];
          this.postForm['isOpenCover'] =  list['isOpenCover'];
          this.postForm['coverWidth'] =  list['coverWidth']||this.postForm['coverWidth'];
          this.postForm['coverHeight'] =  list['coverHeight']||this.postForm['coverHeight'];
        }
      }else if(data.step == 'save'){
        this.postForm['visitingListModel'] =  list['visitingListModel']||this.postForm['visitingListModel'];
        this.postForm['isLoginAcess'] =  list['isLoginAcess'];
        this.postForm['acessAll'] =  this.postForm['acessAll'] || list['acessAll'];
        this.postForm['isOpenComment'] =  list['isOpenComment'];
        this.postForm['isOpenAudit'] =  list['isOpenAudit'];
        this.postForm['auditFlow'] =  list['auditFlow']||this.postForm['auditFlow'];
        this.submitForm();
      }
    },
    handleCuStep(step) {
      this.cuStep = step;
    },
    //表单提交
    submitForm() {
      var list = {
        "id": "string",
        "extensionKV": [ //内容扩展项json
          {}
        ],
      }
      console.log('提交数据',this.postForm);
      if(this.id){
        this.postForm['id'] = this.id;
        this.http.postJsonParameter_url('news-column-update',this.postForm,'/'+this.id).then(res=>{
          this.$message({type: 'success',message: '修改成功'}); 
          this.getColumn();
          setTimeout(()=>{
            window.sessionStorage.removeItem('news-column');
            window.history.go(-1);
          },200)
        }).catch(err=>{
          this.$message({type: 'error',message: '修改失败'}); 
        })
      }else{
        this.http.postJson('news-column-add',this.postForm).then(res=>{
          this.$message({type: 'success',message: '添加成功'});
          this.getColumn();
          setTimeout(()=>{
            window.sessionStorage.removeItem('news-column');
            window.history.go(-1);
          },200)
        }).catch(err=>{
          this.$message({type: 'error',message: '添加失败'}); 
        })
      }
    },
    getColumn(){
      this.http.getPlain('news-user-union-column-permission-list','').then((res) => {
        let dataList = res.data||[];
        store.commit('menuList',dataList);
      }).catch((err) => {});
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
