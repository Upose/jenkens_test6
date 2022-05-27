<!---权限编辑-->
<template>
  <div>
    <el-dialog append-to-body title="新增授权" :visible.sync="dialogBulk" width="480px" :close-on-click-modal="false" :before-close="handleClose">
        <!-- <h1 class="d-title"><i class="el-icon-menu"></i> <span>已选标签：2021年毕业生</span></h1> -->
        <div class="select-user check-box">
            <div class="box-title">选择用户</div>
            <div class="check-list">
                <el-tabs :tab-position="'left'" v-model="check_name" style="height: 200px;" @tab-click="handleClick">
                    <el-tab-pane label="类型" :name="1">
                        <el-checkbox-group v-model="checkedCities">
                            <el-checkbox v-for="item in cities1" @change="checkClick(1,item)" :label="item.key" :key="item">{{item.value}}</el-checkbox>
                        </el-checkbox-group>
                    </el-tab-pane>
                    <el-tab-pane label="分组" :name="2">
                        <el-checkbox-group v-model="checkedCities">
                            <el-checkbox v-for="item in cities2" @change="checkClick(2,item)" :label="item.key" :key="item">{{item.value}}</el-checkbox>
                        </el-checkbox-group>
                    </el-tab-pane>
                    <!-- <el-tab-pane label="标签" :name="3">
                        <el-checkbox-group v-model="checkedCities">
                            <el-checkbox v-for="item in cities3" @change="checkClick(3,item)" :label="item" :key="item">{{item.value}}</el-checkbox>
                        </el-checkbox-group>
                    </el-tab-pane> -->
                </el-tabs>
            </div>
        </div>
        <span slot="footer" class="dialog-footer">
            <el-button icon="iconfont el-icon-vip-quxiao" size="medium" @click="closeClick()">取消</el-button>
            <el-button icon="iconfont el-icon-vip-baocun1" size="medium" type="primary" @click="submitForm()">保存</el-button>
        </span>
    </el-dialog>
  </div>
</template>


<script>
export default {
  name: 'index',
  props:['dataList'],
  data () {
    return {
      postForm:{},
      dialogBulk:true,
      type:1,//左边-类型
      check_name:1,
      cities1:[],
      cities2:[],
      cities3:[],
      checkedCities:[],//选择的项
    }
  },
  created(){
    this.initData();
  },
  mounted(){
  },
  methods:{
      initData(){
        this.http.getPlain('user-permission-list-get','type=1').then(res=>{
            if(res.data){
                this.cities1 = res.data||[];
            }
            if (this.dataList.type != 2) {
                this.initChecked();
            }
        }).catch(err=>{
            console.log(err);
        })
        this.http.getPlain('user-permission-list-get','type=2').then(res=>{
            if(res.data){
                this.cities2 = res.data||[];
            }
            if (this.dataList.type == 2) {
                this.initChecked();
            }
        }).catch(err=>{
            console.log(err);
        })
        // this.http.getPlain('user-permission-list-get','type=3').then(res=>{
        //     if(res.data){
        //         this.cities3 = res.data||[];
        //     }
        // }).catch(err=>{
        //     console.log(err);
        // })
      },
      initChecked() {
        // console.log(this.dataList)
        var _this = this;
        _this.type = _this.dataList.type||1;
        _this.check_name = _this.dataList.type||1;
        let clist = [];
        if(_this.dataList.visitList && _this.dataList.visitList.length>0){
            _this.dataList.visitList.forEach((it,i) => {
                clist.push(it.key);
                if ((i+1) == _this.dataList.visitList.length){
                    this.$set(this, 'checkedCities', clist);
                }
            });
        }
        // console.log(this.dataList, this.checkedCities, this.type, this.cities2)
      },
      //菜单选择
      handleClick(val){
          this.$confirm('切换类型将清空当前选项，是否继续切换？', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
            this.type = val.name;
            this.checkedCities = [];
        }).catch(() => {   
            this.check_name = this.type;    
        });
      },
      //选择选项
      checkClick(type,val){
        console.log(this.checkedCities);
      },
      /****保存按钮*******/
      submitForm(){
        
        if(this.checkedCities.length>0){
            var list = [];
            var data_list = [];
            var str = this.checkedCities.join();
            if(this.type == 1){
                data_list = this.cities1;
            }else{
                data_list = this.cities2;
            }
            data_list.forEach(item=>{
                if(str.indexOf(item.key)>-1){
                    list.push(item);
                }
            });
            this.$emit('getCheckUser',{type:this.check_name,visitList:list});
        }else{
            this.$message({type: 'info',message: '请选择用户'});   
        }
      },
      /****取消按钮*******/
      closeClick(){
        this.$emit('selectUserHide');
      },
      /***x关闭按钮 **/
      handleClose(done){
        this.$emit('selectUserHide');
      },
  },
}
</script>

<style lang="less" scoped>
@import "../../../assets/admin/css/color.less";/**颜色配置 */
@import "../../../assets/admin/css/style.less";/**颜色配置 */
/deep/ .el-dialog__footer{
    padding: 0px 20px 20px;
}
/deep/.el-tabs__item.is-active{
    border-right: 2px solid;
    box-shadow: 0 0 0px 0px #fff inset !important;
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