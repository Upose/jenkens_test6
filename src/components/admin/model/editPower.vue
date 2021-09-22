<!---权限编辑-->
<template>
  <div>
    <el-dialog title="新增授权" :visible.sync="dialogBulk" width="480px" :close-on-click-modal="false" :before-close="handleClose">
        <h1 class="d-title"><i class="el-icon-menu"></i> <span>应用名称：文献专题引擎</span></h1>
        <div class="select-user check-box">
            <div class="box-title">选择用户</div>
            <div class="check-list">
                <el-tabs :tab-position="'left'" style="height: 200px;">
                    <el-tab-pane label="类型">
                        <el-checkbox :indeterminate="isIndeterminate" v-model="checkAll" @change="handleCheckAllChange">全部读者</el-checkbox>
                        <el-checkbox-group v-model="checkedCities" @change="handleCheckedCitiesChange">
                            <el-checkbox v-for="item in cities" :label="item" :key="item">{{item}}</el-checkbox>
                        </el-checkbox-group>
                    </el-tab-pane>
                    <el-tab-pane label="分组">
                        <el-checkbox :indeterminate="isIndeterminate" v-model="checkAll" @change="handleCheckAllChange">全部读者</el-checkbox>
                        <el-checkbox-group v-model="checkedCities" @change="handleCheckedCitiesChange">
                            <el-checkbox v-for="item in cities" :label="item" :key="item">{{item}}</el-checkbox>
                        </el-checkbox-group>
                    </el-tab-pane>
                    <el-tab-pane label="标签">
                        <el-checkbox :indeterminate="isIndeterminate" v-model="checkAll" @change="handleCheckAllChange">全部读者</el-checkbox>
                        <el-checkbox-group v-model="checkedCities" @change="handleCheckedCitiesChange">
                            <el-checkbox v-for="item in cities" :label="item" :key="item">{{item}}</el-checkbox>
                        </el-checkbox-group>
                    </el-tab-pane>
                </el-tabs>
            </div>
        </div>
        <span slot="footer" class="dialog-footer">
            <el-button icon="el-icon-close" size="medium" @click="closeClick()">取消</el-button>
            <el-button icon="el-icon-check" size="medium" type="primary" @click="submitForm()">保存</el-button>
        </span>
    </el-dialog>
  </div>
</template>


<script>
import http from "@/assets/public/js/http";
const cityOptions = ['校内读者', '社会读者', '工商管理','计算机科学'];
export default {
  name: 'index',
  props:['editPower_data'],
  data () {
    return {
      postForm:{},
      dialogBulk:true,
      checkAll: false,
      isIndeterminate: true,
      checkedCities: ['我的借阅'],
      cities:cityOptions,
    }
  },
  mounted(){
      console.log(this.editPower_data);
  },
  methods:{
      handleCheckAllChange(val) {
        this.checkedCities = val ? cityOptions : [];
        this.isIndeterminate = false;
      },
      handleCheckedCitiesChange(value) {
        let checkedCount = value.length;
        this.checkAll = checkedCount === this.cities.length;
        this.isIndeterminate = checkedCount > 0 && checkedCount < this.cities.length;
      },
      /****保存按钮*******/
      submitForm(){
        console.log(this.postForm);
        this.$emit('editPowerHide');
      },
      /****取消按钮*******/
      closeClick(){
        this.$emit('editPowerHide');
      },
      /***x关闭按钮 **/
      handleClose(done){
        this.$emit('editPowerHide');
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
}
.d-title{
    color: @34395E;
    font-size: 14px;
    margin-bottom: 10px;
    span{
        vertical-align: middle;
    }
    i{
        font-size: 16px;
        vertical-align: middle;
    }
}
.check-box{
    height: 340px;
    overflow-y: auto;
    .box-title{
        background-color: @EBEEF5;
        line-height: 40px;
        height: 40px;
        color: @34395E;
        padding: 0 20px;
        font-weight: bold;
        /deep/ .el-checkbox__label{
            font-weight: bold;
            color: @34395E;
        }
    }
    .check-list{
        padding: 20px 0;
        /deep/ .el-checkbox{
            display: block;
            margin-bottom: 10px;
            &:last-child{
                margin-bottom: 0;
            }
        }
        /deep/ .el-tabs--left{
            height: 257px !important;
        }
        /deep/ .el-tabs__content{
            overflow-y: auto;
            height: 257px;
        }
    }
}
</style>