<!---权限编辑-->
<template>
  <div>
    <el-dialog title="选择标签" :visible.sync="dialogAlert" width="480px" :close-on-click-modal="false" :before-close="handleClose">
        <h1 class="d-title">
            <i class="el-icon-menu"></i><span>{{is_input?'编辑':'选择'}}标签</span>
            <el-button size="small" class="btn-r" type="primary" @click="editClick()">{{is_input?'保存标签':'编辑标签'}}</el-button>
        </h1>
        <div class="select-user c-l">
            <div class="box" v-for="i in list" :key="i">
                <span v-if="!is_input">{{i.title}}</span>
                <input v-if="is_input" type="text" :value="i.title"/>
                <i class="el-icon-close del-tag" v-if="is_input"></i>
            </div>
        </div>
    </el-dialog>
  </div>
</template>


<script>
import http from "@/assets/public/js/http";
import tagEdit from "../model/tagEdit";
export default {
  name: 'index',
  props:['dataList'],
  components:{tagEdit},
  data () {  
    return {
      postForm:{},
      is_input:false,
      dialogAlert:true,
      list:[{title:'标签1'},{title:'标签2'},{title:'标签3'},{title:'标签4'}],
    }
  },
  mounted(){
      console.log(this.editPower_data);
  },
  methods:{
      /****保存按钮*******/
      submitForm(){
        console.log(this.postForm);
        this.$emit('tagEditHide');
      },
      /****取消按钮*******/
      closeClick(){
        this.$emit('tagEditHide');
      },
      /***x关闭按钮 **/
      handleClose(done){
        this.$emit('tagEditHide');
      },
      editClick(){
        this.is_input = !this.is_input;
      },
    // initData(){
    //   http.getPlain('AssetNewest','PlateId=109&PageSize=9&PageIndex=1').then(res=>{ //学生专区
    //       this.list1 = res.result.dtos||[];
    //   }).catch(err=>{
    //       console.log(err);
    //   })
    // },
  },
}
</script>

<style lang="less" scoped>
@import "../../../assets/admin/css/color.less";/**颜色配置 */
/deep/ .el-dialog__footer{
    padding: 0px 20px 20px;
}
.select-user{
    border: 1px solid #EBEEF5;
    border-radius: 4px;
    width: 100%;
    min-height: 300px;
    .box{
        margin-top: 10px;
        margin-bottom: 10px;
        width:29.333%;
        float: left;
        height: 40px;
        margin-left:2%;
        margin-right:2%;
        border-radius: 4px;
        border: 1px solid @E4E6FC;
        padding:5px;
        position: relative;
        span{
            cursor: pointer;
            display: block;
            height: 28px;
            line-height: 28px;
            color: @34395E;
            &:hover{
                background: @F5F8F9;
            }
        }
        input{
            outline: none;
            width: 100%;
            height: 100%;
            padding-right: 25px;
            border: 1px solid @E4E6FC;
        }
        .del-tag{
            cursor: pointer;
            position: absolute;
            right: 10px;
            z-index: 9;
            font-size: 20px;
            top: 10px;
            &:hover{
                color: @6677EF;
            }
        }
    }
}
.btn-r{
    float: right;
    margin-top: -6px;
}
.d-title{
    color: @34395E;
    font-size: 14px;
    height: 30px;
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