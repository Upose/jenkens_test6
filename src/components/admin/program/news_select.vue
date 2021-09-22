<!---应用中心-应用订单管理-->
<template>
  <div class="admin-warp-page">
    <el-container>
      <el-aside width="auto" :collapse="$root.collapse" :class="$root.collapse?'fold-menu':''"><serviceLMenu :isActive="1"></serviceLMenu></el-aside>
      <el-main class="admin-content pd admin-bg-top" :class="{'content-collapse':$root.collapse}">
        <breadcrumb :cuMenu="'新闻发布'" :fontColor="'fff'"></breadcrumb><!--面包屑导航--->
        <div class="content search-table-general">
            <div class="search-table-w">
                <h1 class="search-title">新闻检索</h1>
                <div class="search-term">
                    <el-input class="width187" v-model="postForm.name" size="medium" placeholder="新闻全文检索"></el-input><!--上一个页面中的检索条件要塞入此输入框中-->
                    <el-button type="primary" size="medium" icon="el-icon-search">查找</el-button>
                </div>
            </div><!--顶部查询 end-->
            <div class="table-w">
              <h2 class="m-title"><i class="el-icon-date"></i>检索结果列表<div class="r-btn">
                    <!-- <el-button type="primary" size="medium" class="blue-btn">新增管理员</el-button> -->
                </div></h2>
                <div class="t-p">
                    <el-table stripe :data="tableData" @selection-change="handleSelectionApp" border class="admin-table">
                        <el-table-column type="selection" width="45"></el-table-column>
                        <el-table-column prop="id" label="序号" align="center" width="58"></el-table-column>
                        <el-table-column prop="content" label="新闻标题"></el-table-column>
                        <el-table-column prop="content" label="子类"></el-table-column>
                        <el-table-column prop="content" label="状态">
                          <template slot-scope="scope">
                            <span :class="scope.row.status==1?'color-blue':'color-red'">{{scope.row.status==1?'发布':'发布'}}</span>
                          </template>
                        </el-table-column>
                        <el-table-column prop="content" label="发布者"></el-table-column>
                        <el-table-column prop="content" label="创建时间"></el-table-column>
                        <el-table-column prop="content" label="更新时间"></el-table-column>
                        <el-table-column prop="content" label="操作"></el-table-column>
                        <el-table-column prop="content" label="操作记录"></el-table-column>
                    </el-table>
                    <!--<el-button size="small" class="default-btn-n-border next-btn">下一页</el-button>-->
                    <paging></paging>
                </div>
            </div><!--管理页列表 end--->
            
        </div><!---顶部查询板块 end--->
        <footerPage class="top20"></footerPage>
      </el-main>
    </el-container>
    <el-dialog title="备注信息" :visible.sync="show_remark" width="550px" :close-on-click-modal="false">
      <p>部分功能存在违规行为，请修改后再提交!</p>
      <span slot="footer" class="dialog-footer">
          <el-button icon="el-icon-close" size="medium" @click="show_remark=false">关闭</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import bus from '@/assets/public/js/bus';
import http from "@/assets/public/js/http";
import footerPage from "@/components/admin/common/footer";
import breadcrumb from "@/components/admin/common/breadcrumb";
import serviceLMenu from "@/components/admin/common/serviceLMenu";
import paging from "@/components/admin/common/paging";
export default {
  name: 'index',
  created(){
    bus.$on('collapse', msg => {
      this.$root.collapse = msg;
    })
  },
  components:{footerPage,serviceLMenu,breadcrumb,paging},
  data () {
    return {
      activeName:'pc',
      show_remark:false,//查看备注信息
      postForm:{},
      options: [{
        value: '选项1',
        label: '选项1'
      }],
      tableData:[{id:1,content:'测试内容',status:2},{id:1,status:1},{id:1,status:1},{id:1},{id:1},{id:1}],
    }
  },
  mounted(){
    //   this.initData();
  },
  methods:{
    /**查看拒绝备注信息*/
    handleShow(){
      this.show_remark = true;
    },
    /**应用表格选择框**/
    handleSelectionApp(val) {
        this.multipleSelection = val;
    },
    initData(){
      http.getPlain('AssetNewest','PlateId=109&PageSize=9&PageIndex=1').then(res=>{ //学生专区
          this.list1 = res.result.dtos||[];
      }).catch(err=>{
          console.log(err);
      })
    },
    handleDel(row){
      this.$confirm('是否确定取消?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '关闭',
        type: 'warning'
      }).then(() => {
        this.$message({type: 'success',message: '取消成功!'});
      }).catch(() => {
        this.$message({type: 'info',message: '已关闭'});          
      });
    },
  },
}
</script>

<style lang="less" scoped>
@import "../../../assets/admin/css/color.less";/**颜色配置 */
@import "../../../assets/admin/css/table.less";
</style>
