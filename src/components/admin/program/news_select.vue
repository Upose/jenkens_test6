<!---新闻发布-查询栏目-->
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
                    <el-input class="width187" v-model="postForm.searchKey" size="medium" placeholder="新闻全文检索"></el-input><!--上一个页面中的检索条件要塞入此输入框中-->
                    <el-button type="primary" size="medium" icon="el-icon-search" @click="searchClick()">查找</el-button>
                </div>
            </div><!--顶部查询 end-->
            <div class="table-w">
              <h2 class="m-title"><i class="el-icon-date"></i>检索结果列表<div class="r-btn">
                    <!-- <el-button type="primary" size="medium" class="blue-btn">新增管理员</el-button> -->
                </div></h2>
                <div class="t-p">
                    <el-table stripe :data="tableData" @selection-change="handleSelectionApp" border class="admin-table">
                        <!-- <el-table-column type="selection" width="45"></el-table-column> -->
                        <el-table-column prop="indexNum" label="序号" align="center" width="58"></el-table-column>
                        <el-table-column prop="title" label="标题"></el-table-column>
                        <el-table-column prop="columnIDs" label="所属栏目">
                           <template slot-scope="scope">
                             <span v-for="(item,index) in scope.row.columnIDs" :key="index+'_'+item.title">{{item.value}};</span>
                           </template>
                        </el-table-column>
                        <el-table-column prop="publisher" label="发布人" width="120"></el-table-column>
                        <el-table-column prop="publishDate" label="发布时间" width="100">
                          <template slot-scope="scope">
                             <span>{{(scope.row.publishDate||'0000-00-00').slice(0,10)}}</span>
                           </template>
                        </el-table-column>
                        <el-table-column prop="updateTime" label="更新时间" width="100">
                          <template slot-scope="scope">
                             <span>{{(scope.row.updateTime||'0000-00-00').slice(0,10)}}</span>
                           </template>
                        </el-table-column>
                    </el-table>
                    <!--<el-button size="small" class="default-btn-n-border next-btn">下一页</el-button>-->
                    <paging :pagedata="pageData" @pagechange="pageChange" v-if="pageData.totalCount"></paging>

                </div>
            </div><!--管理页列表 end--->
            
        </div><!---顶部查询板块 end--->
        <footerPage class="top20"></footerPage>
      </el-main>
    </el-container>
    <el-dialog append-to-body title="备注信息" :visible.sync="show_remark" width="550px" :close-on-click-modal="false">
      <p>部分功能存在违规行为，请修改后再提交!</p>
      <span slot="footer" class="dialog-footer">
          <el-button icon="iconfont el-icon-vip-quxiao" size="medium" @click="show_remark=false">关闭</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import footerPage from "@/components/admin/common/footer";
import breadcrumb from "@/components/admin/common/breadcrumb";
import serviceLMenu from "@/components/admin/common/serviceLMenu";
import paging from "@/components/admin/common/paging";
export default {
  name: 'index',
  created(){
    this.bus.$on('collapse', msg => {
      this.$root.collapse = msg;
    })
  },
  components:{footerPage,serviceLMenu,breadcrumb,paging},
  data () {
    return {
      pageData: {
        pageIndex: 1,
        pageSize: 50,
      },//分页参数
      postForm:{
        "pageIndex": 1,
        "pageSize": 50,
        "searchKey": decodeURI(this.$route.query.title||''),
      },
      tableData:[],
    }
  },
  mounted(){
      this.initData();
  },
  methods:{
    initData(){
      this.postForm.pageIndex = this.pageData.pageIndex;
      this.postForm.pageSize = this.pageData.pageSize;
      this.http.postJson('news-content-get-by-search',this.postForm).then(res=>{
        this.tableData = res.data.items||[];
        this.pageData.totalCount = res.data.items.totalCount;
      }).catch(err=>{
          console.log(err);
      })
    },
    // 分页 页面修改
    pageChange(data) {
      this.pageData[data.key] = data.value;
      this.initData();
    },
    //查询
    searchClick(){
      this.initData();
    },
    /**应用表格选择框**/
    handleSelectionApp(val) {
        this.multipleSelection = val;
    },
  },
}
</script>

<style lang="less" scoped>
@import "../../../assets/admin/css/color.less";/**颜色配置 */
@import "../../../assets/admin/css/style.less";/**颜色配置 */
@import "../../../assets/admin/css/table.less";
</style>
