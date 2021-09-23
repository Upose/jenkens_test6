<!---新闻发布-应用设置-编辑应用授权-->
<template>
  <div>
    <el-dialog title="修改授权管理员" :visible.sync="dialogShow" width="600px" :close-on-click-modal="false" :before-close="handleClose">
        <div class="dialog-content">
            <div class="row"><label class="title">权限名称：</label><label class="txt">新闻公告-撰稿</label></div>
            <div class="row"><label class="title">授权管理员：</label><label class="txt"><span v-for="i in 3" :key="i">张老师<i class="el-icon-close"></i></span></label></div>
        </div>
        <div class="search-table">
            <h1 class="d-title"><i class="el-icon-search"></i> <span>查找管理员</span></h1>
            <div class="search-div">
                <el-input class="width-input" v-model="name" size="medium" placeholder="姓名/卡号/手机号"></el-input>
                <el-button type="primary" size="medium" icon="el-icon-search">查找</el-button>
            </div>
            <el-table stripe size="medium" :data="tableData" border class="admin-table">
                <el-table-column prop="id" label="序号" align="center" width="58"></el-table-column>
                <el-table-column prop="title" label="姓名"></el-table-column>
                <el-table-column prop="content" label="卡号"></el-table-column>
                <el-table-column prop="content" label="部门"></el-table-column>
                <el-table-column prop="content" label="操作" width="100">
                    <template slot-scope="scope">
                        <el-button @click="handleShow(scope.row)" type="text" size="mini" icon="el-icon-delete" round >添加</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <paging></paging>
        </div>
        <span slot="footer" class="dialog-footer">
            <el-button icon="el-icon-close" size="medium" @click="closeClick()">取消</el-button>
            <el-button icon="el-icon-check" size="medium" type="primary" @click="submitForm()">保存</el-button>
        </span>
    </el-dialog>
  </div>
</template>


<script>
import bus from '@/assets/public/js/bus';
import paging from "@/components/admin/common/paging";
export default {
  name: 'index',
  props:['dataList'],
  components:{paging},
  data () {
    return {
      dialogShow:true,
      name:'',
      tableData:[{title:'张老师'},{title:'王老师'},{title:'李老师'},],
    }
  },
  mounted(){
      console.log(this.dataList);
  },
  methods:{
      /****保存按钮*******/
      submitForm(){
        this.$emit('alertHide');
      },
      /****取消按钮*******/
      closeClick(){
        this.$emit('alertHide');
      },
      /***x关闭按钮 **/
      handleClose(done){
        this.$emit('alertHide');
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
@import "../../../../assets/admin/css/color.less";/**颜色配置 */
@import "../../../../assets/admin/css/style.less";/**颜色配置 */
/deep/ .el-dialog__footer{
    padding: 0px 20px 20px;
}
.dialog-content{
    .row{
        height: 38px;
        font-size: 14px;
        position: relative;
    }
    .title{
        float: left;
        width: 100px;
        color: @34395E;
        text-align: right;
        width: 18%;
    }
    .txt{
        color: @313B3D;
        float: left;
        width: 80%;
        span{
            border: 1px solid @C9D0FF;
            border-radius: 13px;
            padding: 3px 8px;
            margin-bottom: 10px;
            margin-right: 10px;
            font-size: 13px;
            color: @333;
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
    .search-div{
        margin-bottom: 24px;
        .width-input{
            width: 250px;
        }
    }
}
</style>