<!---新闻发布-栏目管理-新增栏目-->
<template>
  <div class="admin-warp-page">
      <el-form :model="postForm" :rules="rules" label-suffix="：" ref="postForm" label-width="140px" class="admin-form">
        <div class="form-content">
          <el-form-item label="必须登录访问" prop="isLoginAcess">
            <el-switch :active-value="1" :inactive-value="0" v-model="postForm.isLoginAcess"></el-switch>
          </el-form-item>
          <el-form-item label="授权访问名单" prop="acessAll" v-if="postForm.isLoginAcess==1">
            <el-radio-group v-model="postForm.acessAll">
              <el-radio v-for="item in acessAllList" :key="item.label" :label="item.label">{{item.val}}</el-radio>
              <el-button size="medium" class="m-l" v-if="postForm.acessAll==false" type="primary" @click="selectUserShow()">选择用户</el-button>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="启用内容评论">
            <el-switch :active-value="1" :inactive-value="0" v-model="postForm.isOpenComment"></el-switch>
          </el-form-item>
          <el-form-item label="启用内容审查">
            <el-switch  :active-value="1" :inactive-value="0" v-model="postForm.isOpenAudit"></el-switch>
          </el-form-item>
          <el-form-item label="设置审核流程" class="m-t" v-if="postForm.isOpenAudit==1">
            <div class="audit-warp">
              <span class="next-txt active"><i class="m-icon iconfont el-icon-vip-zhuanxie"></i><span><i class="iconfont el-icon-vip-gou2"></i> 撰稿</span></span>
              <span class="next-icon"><i class="next-bj"></i></span>
              <span class="next-txt" @click="checkClick('0')" :class="postForm.auditFlow.indexOf('0')>-1?'active':''"><i class="m-icon iconfont el-icon-vip-zhuanxie"></i><span><i class="iconfont el-icon-vip-gou2"></i> 提交</span></span>
              <span class="next-icon"><i class="next-bj"></i></span>
              <span class="next-txt" @click="checkClick('1')" :class="postForm.auditFlow.indexOf('1')>-1?'active':''"><i class="m-icon iconfont el-icon-vip-zhuanxie"></i><span><i class="iconfont el-icon-vip-gou2"></i> 初审</span></span>
              <span class="next-icon"><i class="next-bj"></i></span>
              <span class="next-txt" @click="checkClick('2')" :class="postForm.auditFlow.indexOf('2')>-1?'active':''"><i class="m-icon iconfont el-icon-vip-zhuanxie"></i><span><i class="iconfont el-icon-vip-gou2"></i> 初校</span></span>
              <span class="next-icon"><i class="next-bj"></i></span>
              <span class="next-txt" @click="checkClick('3')" :class="postForm.auditFlow.indexOf('3')>-1?'active':''"><i class="m-icon iconfont el-icon-vip-zhuanxie"></i><span><i class="iconfont el-icon-vip-gou2"></i> 复审</span></span>
              <span class="next-icon"><i class="next-bj"></i></span>
              <span class="next-txt" @click="checkClick('4')" :class="postForm.auditFlow.indexOf('4')>-1?'active':''"><i class="m-icon iconfont el-icon-vip-zhuanxie"></i><span><i class="iconfont el-icon-vip-gou2"></i> 二校</span></span>
              <span class="next-icon"><i class="next-bj"></i></span>
              <span class="next-txt" @click="checkClick('5')" :class="postForm.auditFlow.indexOf('5')>-1?'active':''"><i class="m-icon iconfont el-icon-vip-zhuanxie"></i><span><i class="iconfont el-icon-vip-gou2"></i> 终审</span></span>
              <span class="next-icon"><i class="next-bj"></i></span>
              <span class="next-txt" @click="checkClick('6')" :class="postForm.auditFlow.indexOf('6')>-1?'active':''"><i class="m-icon iconfont el-icon-vip-zhuanxie"></i><span><i class="iconfont el-icon-vip-gou2"></i> 终校</span></span>
              <span class="next-icon"><i class="next-bj"></i></span>
              <span class="next-txt active"><i class="m-icon iconfont el-icon-vip-zhuanxie"></i><span><i class="iconfont el-icon-vip-gou2"></i> 发布</span></span>
            </div><!--撰稿和发布是必须的-->
          </el-form-item>
          <el-form-item class="m-top">
            <el-button icon="iconfont el-icon-vip-quxiao" size="medium" @click="backHistory()">取消</el-button>
            <el-button icon="iconfont el-icon-vip-shangyibu" size="medium" type="primary" @click="preStep()">上一步</el-button>
            <el-button icon="iconfont el-icon-vip-baocun1" size="medium" type="primary" @click="submitForm('postForm')">确认</el-button>
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
      acessAllList: [{
        label: true,
        val: '全部'
      }, {
        label: false,
        val: '指定'
      }],
      postForm: {
        isLoginAcess:0,//必须登录访问
        acessAll:true,//授权访问名称 必填 true是全部 false是指定授权访问名单
        isOpenComment:0,//启用内容评分
        isOpenAudit:0,//启用内容审查
        auditFlow:'7;8',
      },
      rules: {
        acessAll: [
          { required: true, message: '请选择授权访问名单', trigger: 'blur' }
        ],
      },
    }
  },
  mounted(){
  },
  methods:{
    setDetails(newVal){
      this.postForm.isLoginAcess = newVal.isLoginAcess||0;
      this.postForm.defaultTemplate = newVal.defaultTemplate;
      this.postForm.isOpenComment = newVal.isOpenComment||0;
      this.postForm.acessAll = newVal.acessAll;
      this.postForm.visitingListModel = newVal.visitingListModel||{};
      this.select_user_data = newVal.visitingListModel||{};
      this.postForm.isOpenAudit = newVal.isOpenAudit||0;
      this.postForm.auditFlow = newVal.auditFlow||'7;8';
    },
    //设置审核流程
    checkClick(val){
      if(val == '8'){
        this.$message({type: 'warning',message: '此流程为必须项！'});
      }else{
        var list = this.postForm.auditFlow.split(';');
        var is_yes = false;
        list.forEach((item,index)=>{
          if(item == val){
            is_yes = true;
            list.splice(index,1);
            return;
          }
        });
        if(!is_yes){
          list.push(val);
        }
        this.postForm.auditFlow = list.toString().replace(/\,/g,';');
      }
    },
    //上一步
    preStep(){
      this.$emit('nextStep',{n:1,step:'pre'});
    },
    //设置审核流程
    checkClick(val){
        var list = this.postForm.auditFlow.split(';');
        var is_yes = false;
        list.forEach((item,index)=>{
          if(item == val){
            is_yes = true;
            list.splice(index,1);
            return;
          }
        });
        if(!is_yes){
          list.push(val);
        }
        this.postForm.auditFlow = list.toString().replace(/\,/g,';');
    },
    selectUserShow(){
      this.select_user_show = true;
    },
    selectUserHide(){
      this.select_user_show = false;
    },
    getCheckUser(val){
      console.log(val);//这里将拿到的数据放入表单
      this.postForm['visitingListModel'] = val;
      this.select_user_data = val;
      this.select_user_show = false;
    },
    //表单提交-表单提交后，需要 返回到列表页。
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          if (!this.postForm.acessAll && (!this.postForm['visitingListModel'] || !this.postForm['visitingListModel'].type)) {
            return this.$message({ type: 'error', message: '请选择授权访问用户'})
          }
          this.$emit('nextStep',{n:2,step:'save',data:this.postForm});
        } else {
        }
      });
    },
  },
}
</script>

<style lang="less" scoped>
@import "../../../../assets/admin/css/color.less";
@import "../../../../assets/admin/css/style.less";
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
          margin-top: 10px;
        }
    }
    .m-t{
      padding-top: 20px;
    }
    /***审核流程 */
        .audit-warp{
          .next-txt{
            cursor: pointer;
            vertical-align: text-top;
            width: 70px;
            height: 110px;
            margin-top: -30px;
            margin-bottom: 20px;
            display: inline-block;
            text-align: center;
            i.m-icon{
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
              color: @ADB6FE;
              display: block;
              font-size: 14px;
            }
            &:hover{
              span{
                color: @6777EF;
              }
              i.m-icon{
                color: @fff;
                border: 2px solid @6777EF;
                background-color:@6777EF;
              }
            }
            .el-icon-vip-gou2{
              font-size: 12px;
              padding-right: 2px;
            }
          }
          .active{
            span{
              color: @6777EF;
            }
            i.m-icon{
              color: @fff;
              border: 2px solid @6777EF;
              background-color:@6777EF;
            }
          }
          .next-icon{
            vertical-align: top;
            display: inline-block;
            height: 90px;
            line-height: 90px;
            color: @6777EF;
            font-size: 20px;
            margin-left: 10px;
            margin-right: 10px;
            .next-bj{
              display: inline-block;
              width: 50px;
              height: 39px;
              vertical-align: top;
              background: url(../../../../assets/admin/img/news-next.png) no-repeat center;
            }
          }
        }
  }
</style>
