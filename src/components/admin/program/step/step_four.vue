<!---新闻发布-栏目管理-新增栏目-->
<template>
  <div class="admin-warp-page">
      <el-form :model="postForm" :rules="rules" ref="postForm" label-width="120px" class="admin-form">
        <div class="form-content">
          <el-form-item label="启用内容审查">
            <el-switch  :active-value="1" :inactive-value="0" v-model="postForm.isOpenAudit"></el-switch>
          </el-form-item>
          <el-form-item label="设置审核流程" class="m-t" v-if="postForm.isOpenAudit==1">
            <div class="audit-warp">
              <span class="next-txt" @click="checkClick('0')" :class="postForm.auditFlow.indexOf('0')>-1?'active':''"><i class="m-icon iconfont vip-bg"></i><span><i class="iconfont vip-duigou"></i>撰稿</span></span>
              <span class="next-icon"><i class="el-icon-arrow-right"></i></span>
              <span class="next-txt" @click="checkClick('1')" :class="postForm.auditFlow.indexOf('1')>-1?'active':''"><i class="m-icon iconfont vip-bg"></i><span>提交</span></span>
              <span class="next-icon"><i class="el-icon-arrow-right"></i></span>
              <span class="next-txt" @click="checkClick('2')" :class="postForm.auditFlow.indexOf('2')>-1?'active':''"><i class="m-icon iconfont vip-bg"></i><span>初审</span></span>
              <span class="next-icon"><i class="el-icon-arrow-right"></i></span>
              <span class="next-txt" @click="checkClick('3')" :class="postForm.auditFlow.indexOf('3')>-1?'active':''"><i class="m-icon iconfont vip-bg"></i><span>初校</span></span>
              <span class="next-icon"><i class="el-icon-arrow-right"></i></span>
              <span class="next-txt" @click="checkClick('4')" :class="postForm.auditFlow.indexOf('4')>-1?'active':''"><i class="m-icon iconfont vip-bg"></i><span>复审</span></span>
              <span class="next-icon"><i class="el-icon-arrow-right"></i></span>
              <span class="next-txt" @click="checkClick('5')" :class="postForm.auditFlow.indexOf('5')>-1?'active':''"><i class="m-icon iconfont vip-bg"></i><span>二校</span></span>
              <span class="next-icon"><i class="el-icon-arrow-right"></i></span>
              <span class="next-txt" @click="checkClick('6')" :class="postForm.auditFlow.indexOf('6')>-1?'active':''"><i class="m-icon iconfont vip-bg"></i><span>终审</span></span>
              <span class="next-icon"><i class="el-icon-arrow-right"></i></span>
              <span class="next-txt" @click="checkClick('7')" :class="postForm.auditFlow.indexOf('7')>-1?'active':''"><i class="m-icon iconfont vip-bg"></i><span>终校</span></span>
              <span class="next-icon"><i class="el-icon-arrow-right"></i></span>
              <span class="next-txt" @click="checkClick('8')" :class="postForm.auditFlow.indexOf('8')>-1?'active':''"><i class="m-icon iconfont vip-bg"></i><span>发布</span></span>
            </div><!--撰稿和发布是必须的-->
          </el-form-item>
          <el-form-item class="m-top">
            <el-button icon="el-icon-close" size="medium" @click="$root.backClick()">取消</el-button>
            <el-button icon="el-icon-check" size="medium" type="primary" @click="preStep()">上一步</el-button>
            <el-button icon="el-icon-check" size="medium" type="primary" @click="submitForm('postForm')">确认</el-button>
          </el-form-item>
        </div>
      </el-form>
  </div>
</template>


<script>
export default {
  name: 'index',
  created(){
    this.bus.$on('collapse', msg => {
        this.$root.collapse = msg;
    })
  },
  mounted(){
  },
  data () {
    return {
      postForm: {
        isOpenAudit:0,//启用内容审查
        auditFlow:'0;8',
      },
      rules: {
        // name: [
        //     { required: true, message: '请输入内容', trigger: 'blur' }
        // ],
      },
    }
  },
  methods:{
    setDetails(newVal){
      console.log(newVal);
      this.postForm.isOpenAudit = newVal.isOpenAudit||0;
      this.postForm.auditFlow = newVal.auditFlow||'0,8';
    },
    //设置审核流程
    checkClick(val){
      if(val == '0' || val == '8'){
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
      this.$emit('nextStep',{n:3,step:'pre'});
    },
    //表单提交-表单提交后，需要 返回到列表页。
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
          if (valid) {
              this.$emit('nextStep',{n:4,step:'save',data:this.postForm});
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
    .m-t{
      margin-top: 50px;
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
            cursor: pointer;
            vertical-align: text-top;
            width: 70px;
            height: 110px;
            margin-top: -30px;
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
