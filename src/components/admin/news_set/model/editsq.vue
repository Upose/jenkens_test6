<!---新闻发布-应用设置-编辑应用授权-->
<template>
  <div>
    <el-dialog append-to-body title="修改授权管理员" :visible.sync="dialogShow" width="600px" :close-on-click-modal="false" :before-close="handleClose">
        <div class="dialog-content">
            <div class="row"><label class="title">权限名称：</label><label class="txt">{{dataList.title||'无'}}</label></div>
            <div class="row"><label class="title">授权管理员：</label><label class="txt"><span v-for="i in dataList.managerList" :key="i">{{i.manager}}<i class="el-icon-close" @click="delManager(i)"></i></span></label></div>
            <div class="row"><label class="title">查找管理员：</label>
                <label class="search-input">
                    <el-input class="width-input" v-model="name" size="medium" placeholder="姓名/卡号/手机号"></el-input>
                    <el-button type="primary" class="btn-right" size="mini" icon="el-icon-search" @click="initData()">查找</el-button>
                </label>
            </div>
        </div>
        <div class="search-table">
            <!-- <h1 class="d-title"><i class="el-icon-search"></i> <span>查找管理员</span></h1>
            <div class="search-div">
                <el-input class="width-input" v-model="name" size="medium" placeholder="姓名/卡号/手机号"></el-input>
                <el-button type="primary" size="medium" icon="el-icon-search">查找</el-button>
            </div> -->
            <el-table stripe size="medium" :data="tableData" border class="admin-table" height="230">
                <el-table-column prop="indexNum" label="序号" align="center" width="58"></el-table-column>
                <el-table-column prop="name" label="姓名"></el-table-column>
                <el-table-column prop="cardNum" label="卡号"></el-table-column>
                <el-table-column prop="depart" label="部门"></el-table-column>
                <el-table-column prop="content" label="操作" width="100">
                    <template slot-scope="scope">
                        <el-button @click="handleAdd(scope.row)" type="text" size="mini" icon="el-icon-delete" round >添加</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <!-- <paging></paging> -->
        </div>
        <span slot="footer" class="dialog-footer">
            <el-button icon="iconfont el-icon-vip-quxiao" size="medium" @click="closeClick()">取消</el-button>
            <el-button icon="iconfont el-icon-vip-baocun1" size="medium" type="primary" @click="submitForm()">保存</el-button>
        </span>
    </el-dialog>
  </div>
</template>


<script>
import paging from "@/components/admin/common/paging";
export default {
  name: 'index',
  props:['dataList'],
  components:{paging},
  data () {
    return {
      dialogShow:true,
      name:'',
      tableData:[],
    }
  },
  mounted(){
    // this.initData();
  },
  methods:{
    initData(){
        if(!this.name){
            this.$message({type: 'info',message: '请输入要查询的值!'});
            return false;
        }
        this.http.getJson('search-permission-manager',{searchKey: this.name}).then(res=>{
            this.tableData = res.data||[];
        }).catch(err=>{
            console.log(err);
        })
    },
      /****保存按钮*******/
      submitForm(){
          this.http.postJson('save-news-column-permissions',this.dataList).then(res=>{
              this.$message({type: 'success',message: '保存成功!'});
          }).catch(err=>{
              this.$message({type: 'error',message: '保存失败!'});
          })
        this.$emit('alertHide');
      },
      /****取消按钮*******/
      closeClick(){
        this.$emit('alertHide');
      },
      //删除管理员
      delManager(row){
        this.dataList.managerList.forEach((item,index)=>{
            if(item.managerID == row.managerID){
                this.dataList.managerList.splice(index,1);
            }
        })
      },
      //添加管理员
      handleAdd(row){
        if(this.dataList && this.dataList.managerList){
            var is_add = true;
            this.dataList.managerList.forEach((item,index)=>{
                if(item.managerID == row.userKey){//存在
                    is_add = false;
                }
            })
            if(is_add){
                this.dataList.managerList.push({manager:row.name,managerID:row.userKey});
            }
        }else{
            this.dataList['managerList'] = [];
        }
      },
      /***x关闭按钮 **/
      handleClose(done){
        this.$emit('alertHide');
      },
  },
}
</script>

<style lang="less" scoped>
@import "../../../../assets/admin/css/color.less";/**颜色配置 */
@import "../../../../assets/admin/css/style.less";/**颜色配置 */
/deep/ .el-dialog__footer{
    padding: 0px 20px 20px;
}
.dialog-content{
    .row{
        min-height: 38px;
        font-size: 14px;
        position: relative;
        margin-bottom:10px;
    }
    .title{
        float: left;
        width: 100px;
        color: @34395E;
        text-align: right;
        width: 18%;
        min-height: 38px;
        line-height: 38px;
    }
    .txt{
        color: @313B3D;
        float: left;
        width: 80%;
        min-height: 38px;
        line-height: 38px;
        span{
            border: 1px solid @C9D0FF;
            border-radius: 13px;
            padding: 3px 8px;
            margin-bottom: 10px;
            margin-right: 10px;
            font-size: 13px;
            color: @333;
            line-height: 20px;
            display: inline-block;
            i{
                cursor: pointer;
                color: @6777EF;
                margin-left: 8px;
            }
            &:hover{
                color: @6777EF;
                i{
                    &:hover{
                        color: @333;
                    }
                }
            }
        }
    }
    .search-input{
        width: 456px;
        float: left;
        position: relative;
        /deep/.el-input__inner{
            padding-right: 85px;
        }
        .btn-right{
            position: absolute;
            right: 4px;
            top: 4px;
        }
    }
}
.search-table{
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
}
</style>