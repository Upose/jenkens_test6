<!---选择标签-->
<template>
  <div class="tag-box">
    <h1 class="d-title">
      <span>选择标签</span>
      <i class="el-icon-close close-tag" @click="hide"></i>
      <el-button size="medium" class="btn-r" type="text" @click="editClick">{{is_input?'完成标签':'编辑标签'}}</el-button>
    </h1>
    <div class="select-user c-l">
      <div class="box" :class="is_input ? 'edit-tag-box':''" v-for="(it,i) in dataList" :key="i">
        <div v-if="!is_input" class="tag-text">
          <span @click="checkTag(it.name)" :title="it.name">{{it.name}}</span>
          <i :class="isCheckClass(it.name)?'el-icon-check':'el-icon-plus'" @click="checkTag(it.name)" v-if="!it.check"></i>
          <!-- <i class="el-icon-plus" @click="checkTag(i)" v-if="!i.check"></i> -->
          <i class="el-icon-check" v-else></i>
        </div>
        <div v-if="is_input" class="tag-inp">
          <input type="text" v-model="it.name" />
          <i class="el-icon-close del-tag" @click="delTag(i)"></i>
        </div>
      </div>
    </div>
  </div>
</template>


<script>
export default {
  name: 'index',
  props: ['dataList','cType'],//cType 类型：2新闻 1栏目
  data() {
    return {
      is_input: false,
      check_list:'',//已选中标签
    }
  },
  mounted() {
    console.log(this.dataList);
  },
  methods: {
    hide(){
      this.$emit('tagEditHide');
    },
    //选择标签
    checkTag(val){
      // if(this.check_list.indexOf(val)>-1){
      //   this.check_list = this.check_list.replace((val+';'),'');
      // }else{
      //   this.check_list = this.check_list+val+';';
      // }
      // this.$emit('checkTag',this.check_list);
      this.check_list = val;
      this.$emit('checkTag',val);
    },
    //当前标签是否为已选中
    isCheckClass(val){
      if(this.check_list.indexOf(val)>-1){
        return true;
      }else{
        return false;
      }
    },
    //删除标签
    delTag(index){
      var _this = this;
      this.$confirm('请谨慎执行删除操作, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        _this.http.postUrlpj('lable-info-delete','?lableid='+_this.dataList[index].id).then(res=>{
          _this.$message({type: 'success',message: '删除成功!'});
          _this.dataList.splice(index,1);
        }).catch(err=>{
          _this.$message({type: 'error',message: '删除失败!'});          
        })   
      }).catch(() => {
          _this.$message({type: 'info',message: '已取消删除'}); 
      });
    },
    //打开编辑
    editClick(){
      this.is_input = !this.is_input;
      if(!this.is_input){
        var _this = this;
        var data={
          "Type":this.cType,
          "UpdateParmList":this.dataList
        };
        this.http.postJson('lable-info-update',data).then(res=>{
          _this.$message({type: 'success',message: '保存成功!'});
        }).catch(err=>{
          _this.$message({type: 'error',message: '保存失败!'});          
        })   
      }
    },
  },
}
</script>

<style lang="less" scoped>
@import "../../../assets/admin/css/color.less";/**颜色配置 */
@import "../../../assets/admin/css/style.less";/**颜色配置 */
.tag-box {
  position: absolute;
  z-index: 10;
  left: 0;
  margin-top:5px;
  width: 500px;
  background-color: #fff;
  box-shadow: 0px 2px 12px rgba(0, 0, 0, 0.1);
  padding: 20px;
  border-radius: 4px;
  margin-bottom: 20px;
}
.select-user {
  border-radius: 4px;
  width: 100%;
  min-height: 100px;
  .edit-tag-box {
    background: @fff !important;
    border: 1px solid @9CADFF !important;
  }
  .box {
    margin-top: 10px;
    width: 95px;
    float: left;
    height: 32px;
    margin: 10px;
    border-radius: 4px;
    border: 1px solid @6777EF;
    position: relative;
    background: @6777EF;

    .tag-text {
      color: @fff;
      line-height: 32px;
      span {
        padding-left:8px;
        padding-right: 28px;
        display: block;
        text-align: center;
        height: 30px;
        line-height: 30px;
      }
      .el-icon-plus {
        cursor: pointer;
      }
      i {
        position: absolute;
        top: 8px;
        right: 6px;
      }
    }
    .tag-inp {
      height: 100%;
      input {
        width: 93px;
        outline: none;
        height: 30px;
        line-height: 30px;
        padding-right: 25px;
        padding-left: 5px;
        border: none;
        display: block;
        border-radius: 3px;
      }
      .del-tag {
        cursor: pointer;
        position: absolute;
        right: 10px;
        z-index: 9;
        font-size: 16px;
        top: 8px;
        &:hover {
          color: @6677EF;
        }
      }
    }
  }
}

.d-title {
  color: @34395E;
  font-size: 14px;
  height: 30px;
  line-height: 30px;
  margin-bottom: 10px;
  border-bottom: 1px solid #ebeef5;

  .btn-r {
    float: right;
    height: 30px;
    margin-top: -6px;
    margin-right: 24px;
  }
  .close-tag {
    float: right;
    margin-top: 4px;
    cursor: pointer;
  }
  span {
    color: @6C757D;
    height: 29px;
    line-height: 29px;
    display: inline-block;
  }
  i {
    font-size: 16px;
    vertical-align: middle;
  }
}
</style>