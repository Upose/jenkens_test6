<!---新闻发布-查询栏目-->
<template>
  <div class="admin-warp-page">
    <el-container>
      <el-aside width="auto" :collapse="$root.collapse" :class="$root.collapse ? 'fold-menu' : ''">
        <serviceLMenu :isActive="1"></serviceLMenu>
      </el-aside>
      <el-main class="admin-content pd admin-bg-top" :class="{ 'content-collapse': $root.collapse }">
        <breadcrumb :cuMenu="'新闻发布'" :fontColor="'fff'"></breadcrumb><!--面包屑导航--->
        <div class="content search-table-general">
          <div class="search-table-w">
            <h1 class="search-title">新闻检索</h1>
            <div class="search-term">
              <el-input class="width187" v-model="postForm.searchKey" size="medium" placeholder="新闻全文检索"
                clearable></el-input><!--上一个页面中的检索条件要塞入此输入框中-->
              <el-button type="primary" size="medium" icon="el-icon-search" @click="searchClick()">查找</el-button>
            </div>
          </div><!--顶部查询 end-->
          <div class="table-w" v-loading="loading">
            <h2 class="m-title"><i class="el-icon-date"></i>检索结果列表<div class="r-btn">
                <!-- <el-button type="primary" size="medium" class="blue-btn">新增管理员</el-button> -->
              </div>
            </h2>
            <div class="t-p">
              <el-table stripe :data="tableData" @selection-change="handleSelectionApp" border class="admin-table">
                <!-- <el-table-column type="selection" width="45"></el-table-column> -->
                <el-table-column type="index" width="58" align="center" label="序号">
                  <template slot-scope="scope">
                    {{ getTableSort(scope.$index) }}
                  </template>
                </el-table-column>
                <el-table-column prop="title" label="标题">
                  <template slot-scope="scope">
                    <a class="news-title" :title="scope.row.title" :href="handleEdit(scope.row)">
                      {{ scope.row.title }}
                    </a>
                  </template>
                </el-table-column>
                <el-table-column prop="columnIDs" label="所属栏目">
                  <template slot-scope="scope">
                    <a class="news-title" v-for="(item, index) in scope.row.columnIDs" :href="ColumnEdit(item)"
                      :key="index + '_' + item.title">{{ item.value }};</a>
                  </template>
                </el-table-column>
                <el-table-column prop="publisher" align="center" label="发布者" width="120"></el-table-column>
                <el-table-column align="center" prop="publishDate" label="发布时间" width="100">
                  <template slot-scope="scope">
                    <span>{{ (scope.row.publishDate || '0000-00-00').slice(0, 10) }}</span>
                  </template>
                </el-table-column>
                <el-table-column align="center" prop="updateTime" label="更新时间" width="100">
                  <template slot-scope="scope">
                    <span>{{ (scope.row.updateTime || '0000-00-00').slice(0, 10) }}</span>
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
        <el-button icon="iconfont el-icon-vip-quxiao" size="medium" @click="show_remark = false">关闭</el-button>
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
  created() {
    this.bus.$on('collapse', msg => {
      this.$root.collapse = msg;
    })
  },
  components: { footerPage, serviceLMenu, breadcrumb, paging },
  data() {
    return {
      loading: false,
      pageData: {
        pageIndex: 1,
        pageSize: 50,
      },//分页参数
      postForm: {
        "pageIndex": 1,
        "pageSize": 50,
        "searchKey": decodeURI(this.$route.query.title || ''),
      },
      tableData: [],
    }
  },
  mounted() {
    this.initData();
  },
  methods: {
    getTableSort(index) {
      return (index + 1) + (this.pageData.pageSize * (this.pageData.pageIndex - 1))
    },
    //编辑新闻
    handleEdit(row) {
      // console.log(row.columnIDs[0]);
      // this.$router.push({ path: '/admin_addNews', query: { id: row.id, c_id: row.columnIDs[0].key } })
      if (row.columnIDs.length) {
        let key = row.columnIDs[0].key;
        return this.$setHref({ url: '/admin_addNews', query: { id: row.id, c_id: key } });
      } else {
        return "javascript:;";
      }
    },
    //编辑栏目
    ColumnEdit(row) {
      // this.$router.push({ path: '/admin_programInfo', query: { id: row.key } })
      if (row.key) {
        return this.$setHref({ url: '/admin_programInfo', query: { id: row.key } });
      } else {
        return "javascript:;";
      }
    },
    initData() {
      this.loading = true;
      this.tableData = [];
      this.initpageData();
      this.postForm.pageIndex = this.pageData.pageIndex;
      this.postForm.pageSize = this.pageData.pageSize;
      this.http.postJson('news-content-get-by-search', this.postForm).then(res => {
        this.tableData = res.data.items || [];
        this.pageData.totalCount = res.data.totalCount;
        this.loading = false;
      }).catch(err => {
        this.loading = false;
        console.log(err);
      })
    },
    initpageData() {
      this.pageData = {
        pageIndex: this.pageData.pageIndex,
        pageSize: this.pageData.pageSize,
      };
    },
    // 分页 页面修改
    pageChange(data) {
      this.pageData[data.key] = data.value;
      this.initData();
    },
    //查询
    searchClick() {
      this.pageData.pageIndex = 1;
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
@import "../../../assets/admin/css/color.less";
@import "../../../assets/admin/css/style.less";
@import "../../../assets/admin/css/table.less";

.news-title {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  color: @m-col-b7;
  cursor: pointer;

  &:hover {
    border-bottom: 1px solid @m-col-b7;
  }
}
</style>
