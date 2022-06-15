<!---应用中心-管理权限设置-->
<template>
  <div class="admin-warp-page">
    <el-container>
      <el-aside width="auto" :collapse="$root.collapse" :class="$root.collapse?'fold-menu':''"><serviceLMenu :isActive="2"></serviceLMenu></el-aside>
      <el-main class="admin-content pd admin-bg-top" :class="{'content-collapse':$root.collapse}">
        <breadcrumb :cuMenu="'栏目管理'" :fontColor="'fff'" ref="breadcrumb_ref"></breadcrumb><!--面包屑导航--->
        <div class="content search-table-general">
            <div class="search-table-w">
                <h1 class="search-title">操作日志</h1>
            </div><!--顶部查询 end-->
            <div class="table-w">
              <h2 class="m-title">标题：{{title}}</h2>
                <div class="t-p">
                    <el-table @selection-change="handleSelectionChange" stripe :data="tableData" border class="admin-table">
                        <el-table-column prop="id" label="序号" align="center" width="58">
                          <template slot-scope="scope">
                            {{scope.$index+1}}
                          </template>
                        </el-table-column>
                        <el-table-column prop="eventName" label="操作名称"></el-table-column>
                        <el-table-column prop="operator" label="操作人"></el-table-column>
                        <el-table-column prop="operatorName" label="权限"></el-table-column>
                        <el-table-column prop="operateTime" label="时间">
                          <template slot-scope="scope">
                            <span>{{(scope.row.operateTime||'0000-00-00').substring(0,10)}} </span>
                          </template>
                        </el-table-column>
                        <!-- <el-table-column prop="content" label="操作" width="180">
                            <template slot-scope="scope">
                            <el-button @click="directoryClick('edit',scope.row)" type="text" size="mini" icon="el-icon-edit" round>编辑</el-button>
                            <el-button @click="handleDel(scope.row)" type="text" size="mini" icon="el-icon-delete" class="operate-red-btn" round>删除</el-button>
                            </template>
                        </el-table-column> -->
                    </el-table>
                    <!-- <paging :pagedata="pageData" @pagechange="pageChange" v-if="pageData.totalCount"></paging> -->
                </div>
            </div><!--管理页列表 end--->
            
        </div><!---顶部查询板块 end--->
        <footerPage class="top20"></footerPage>
      </el-main>
    </el-container>
  </div>
</template>

<script>
// import paging from "@/components/admin/common/paging";
import footerPage from "@/components/admin/common/footer";
import breadcrumb from "@/components/admin/common/breadcrumb";
import serviceLMenu from "@/components/admin/common/serviceLMenu";
export default {
  name: 'index',
  created(){
    this.bus.$on('collapse', msg => {
      this.$root.collapse = msg;
    })
  },
  components:{footerPage,serviceLMenu,breadcrumb},
  data () {
    return {
      activeName:'pc',
      postForm:{},
      pageData: {
        pageIndex: 1,
        pageSize: 50,
      },//分页参数
      id:this.$route.query.id,
      title:this.$route.query.title,
      c_id:this.$route.query.c_id,
      alert_show:false,
      columnDeatils:{},
      options: [{
        value: '选项1',
        label: '选项1'
      }],
      tableData:[],
    }
  },
  mounted(){
    this.initData();
    var _this = this;
      this.http.getPlain_url('news-column-template-get-by-column-id','/'+_this.c_id).then(res=>{
        _this.columnDeatils = res.data||{};
        var list = {
              title: [{ name: _this.columnDeatils.columnName, path: {path:'/admin_programInfo',query:{id:_this.c_id}}},{name:'日志'}],
              keepAlive: true
            }
          ;
      _this.$refs.breadcrumb_ref.setMeta(list);
      }).catch(err=>{})
  },
  methods:{
    //初始化数据
    initData(){
      this.http.getPlain_url('content-process-log-get','/'+this.c_id+"?contentid="+this.id).then(res=>{
        this.tableData = res.data || [];
      }).catch(err=>{
          console.log(err);
      })
    },
  },
}
</script>

<style lang="less" scoped>
@import "../../../assets/admin/css/color.less";/**颜色配置 */
@import "../../../assets/admin/css/style.less";/**颜色配置 */
@import "../../../assets/admin/css/table.less";
.search-table-general .table-w .m-title{
  min-height: 64px;
  height: auto;
  line-height: 30px;
  padding:16px 20px;
}
</style>
