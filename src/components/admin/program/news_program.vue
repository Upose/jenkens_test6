<!---新闻发布-栏目管理-->
<template>
  <div class="admin-warp-page">
    <el-container>
      <el-aside width="auto" :collapse="$root.collapse" :class="$root.collapse ? 'fold-menu' : ''">
        <serviceLMenu :isActive="1"></serviceLMenu>
      </el-aside>
      <el-main class="admin-content pd admin-bg-top" :class="{ 'content-collapse': $root.collapse }">
        <breadcrumb :cuMenu="'栏目管理'" :fontColor="'fff'"></breadcrumb><!--面包屑导航--->
        <div class="content search-table-general">
          <div class="search-table-w">
            <h1 class="search-title">栏目管理</h1>
            <div class="search-term" v-if="isAuth('query')">
              <el-input class="width187" v-model="search_title" size="medium" placeholder="新闻全文检索" clearable></el-input>
              <el-button type="primary" size="medium" icon="iconfont el-icon-vip-fangdajing"
                @click="selectClick()">查找</el-button>
            </div>
          </div><!--顶部查询 end-->
          <!-- <div class="list-content-warp" v-loading="loading" :class="!loading && dataList.length==0?'empty-data-admin':''"> -->
          <div class="list-content-warp" v-if="isAuth('query')" v-loading="loading">
            <div class="list-content" v-for="(item, index) in dataList" :key="index + 'm'">
              <div class="s-w c-l">
                <span class="m-title"><i class="iconfont el-icon-vip-moren"></i>{{ item.lableName }}</span>
              </div>
              <div class="row">
                <div class="row-list c-l"
                  :class="!loading && (item.columnList || []).length == 0 ? 'empty-data-admin' : ''">
                  <div class="row-box set-hover" v-for="(it, i) in (item.columnList || [])" :key="i + 'a'"
                    :class="it.enable ? '' : 'appsgraycolor'">
                    <a class="r-box-bg" :href="coumCover(it)">
                      <img :src="fileUrl + it.cover" />
                      <span class="name">{{ it.title || '暂无' }}</span>
                    </a>
                    <div class="r-box-btns" v-if="it.enable">
                      <el-button type="primary" v-if="isAuth('delete')" class="admin-red-btn" size="medium"
                        icon="iconfont el-icon-vip-shanchu-1" @click="delClick(it.columnID)">删除</el-button>
                      <el-button type="primary" v-if="isAuth('edit')" size="medium" icon="iconfont el-icon-vip-bianji"
                        @click="editClick(it.columnID)">编辑</el-button>
                    </div>
                  </div>
                  <div class="row-box set-hover" v-if="isAuth('add') && item.lableName == '默认标签'">
                    <a class="r-box-bg add-btn" :href="$setHref({ url: '/admin_programAdd' })">
                      <div class="r-box-add-warp">
                        <i class="iconfont el-icon-vip-tianjia1"></i>
                        <span>新增栏目</span>
                      </div>
                    </a>
                  </div>
                </div>
              </div>
            </div><!----默认标签 end-->
            <div class="list-content">
              <div class="row">
                <div class="row-list c-l">
                  <div class="row-box set-hover" v-if="isAuth('add') && dataList.length == 0">
                    <a class="r-box-bg add-btn" :href="$setHref({ url: '/admin_programAdd' })">
                      <div class="r-box-add-warp">
                        <i class="iconfont el-icon-vip-tianjia1"></i>
                        <span>新增栏目</span>
                      </div>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div><!---content end--->
        <footerPage class="top20"></footerPage>
      </el-main>
    </el-container>
  </div>
</template>

<script>
import footerPage from "@/components/admin/common/footer";
import breadcrumb from "@/components/admin/common/breadcrumb";
import serviceLMenu from "@/components/admin/common/serviceLMenu";
import paging from "@/components/admin/common/paging";
import store from '@/store/index'

export default {
  name: 'index',
  beforeCreate() {
    if (this.$store.state.menuList && this.$store.state.menuList.length > 0) {
      var is_list = this.$store.state.menuList.filter(x => x.component == this.$route.path) || [];
      if (is_list.length == 0) {
        this.$router.push('/403')
      }
    }
  },
  created() {
    this.bus.$on('collapse', msg => {
      this.$root.collapse = msg;
    })
  },
  components: { footerPage, serviceLMenu, breadcrumb, paging },
  data() {
    return {
      loading: true,
      search_title: '',
      dataList: [],
      fileUrl: window.localStorage.getItem('fileUrl'),
    }
  },
  mounted() {
    this.initData();
  },
  methods: {
    // 页面子权限判定
    isAuth(name) {
      let authList = this.$store.state.menuList;
      let curAuth = authList && authList.find(item => (item.component == '/admin_newsProgram'));
      let curSonAuth = curAuth ? curAuth.listPermission.includes(name) : null;
      return curSonAuth ? true : false;
    },
    initData() {
      this.http.getJson('news-column-get-by-manager-id', "").then(res => {
        this.loading = false;
        this.dataList = res.data || [];
      }).catch(err => {
        this.loading = false;
        this.$message({ type: 'error', message: '数据获取失败!' });
      })
    },
    //栏目封面点击
    coumCover(val) {
      if (!val.enable) return '';
      return this.$setHref({ url: '/admin_programInfo', query: { id: val.columnID } })
    },
    //查找
    selectClick() {
      if (this.search_title) {
        this.$router.push({ path: '/admin_newsSelect', query: { title: encodeURI(this.search_title) } });
      } else {
        this.$message({ type: 'info', message: '请输入检索内容' });
      }
    },
    //编辑栏目
    editClick(val) {
      this.$router.push({ path: '/admin_programAdd', query: { id: val } });
    },
    //删除栏目
    delClick(val) {
      console.log(val);
      var _this = this;
      this.$confirm('请谨慎执行删除操作, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.http.getPlain_url('column_delete', '/' + val).then(res => {
          if (res.statusCode==200 && res.data.succeeded) {
            _this.$message({ type: 'success', message: '删除成功!' });
            _this.getColumn();
            _this.initData();
          } else {
            _this.$message({ type: 'error', message: res.data.message ? res.data.message : '删除失败!' });
          }
        }).catch(err => {
          _this.$message({ type: 'error', message: res.data.message ? res.data.message : '删除失败!' });
        })
      }).catch(() => {
        _this.$message({ type: 'info', message: '已取消删除' });
      });
    },
    getColumn() {
      var _this = this;
      this.http.getPlain('news-user-union-column-permission-list', '').then((res) => {
        let dataList = res.data.permissionNodes || [];
        store.commit('menuList', dataList);
        _this.$forceUpdate();
      }).catch((err) => { });
    },
  },
}
</script>

<style lang="less" scoped>
@import "../../../assets/admin/css/color.less";
@import "../../../assets/admin/css/style.less";

.content {
  .s-w {
    min-height: 60px;
    line-height: 57px;
    padding: 0 20px;
    border-bottom: 1px solid @ph-col-n3;
    background-color: @m-col-b0;

    .d-title {
      color: @ph-col-n12;
      font-size: 14px;
      margin-left: 20px;
    }
  }
}

.m-top {
  margin-top: 24px;
}

/***内容板块***/
.list-content-warp {
  min-height: 300px;
  background-color: @m-col-b0;
  border-radius: 0 0 4px 4px;
}

.list-content {
  background-color: @m-col-b0;
  border-radius: 0 0 4px 4px;
  margin-top: 5px;

  .row {
    padding: 10px;

    .row-list {
      display: grid;
      justify-content: space-between;
      grid-template-columns: repeat(auto-fill, 200px);
    }

    .row-box {
      float: left;
      width: 170px;
      padding: 15px 0;
      margin-left: 10px;
      margin-right: 10px;
      position: relative;

      .r-box-bg {
        display: block;
        cursor: pointer;
        // width: 238px;
        // height: 238px;
        box-shadow: 0px 2px 15px rgba(40, 120, 255, 0.1);

        &:hover {
          box-shadow: 0px 2px 15px rgba(40, 120, 255, 0.25);
        }
      }

      .add-btn {
        height: 183px;
        padding: 5px;
        border: 1px dotted @ph-col-n34;
        border-radius: 5px;

        .r-box-add-warp {
          color: @ph-col-n27;
          cursor: pointer;
          font-size: 14px;
          width: 100%;
          height: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-direction: column;
          background-color: @ph-col-n1;
          box-shadow: none;

          i {
            font-size: 26px;
          }

          span {
            margin-top: 13px;
          }
        }
      }

      img {
        width: 100%;
        height: 120px;
        border-radius: 5px 5px 0px 0px;
      }

      span.name {
        display: block;
        height: 60px;
        color: @ph-col-n12;
        font-size: 15px;
        line-height: 60px;
        text-align: center;
        position: relative;
        font-weight: bold;
        border-radius: 0px 0px 3px 3px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        padding: 0 10px;
      }

      .r-box-btns {
        display: none;
        position: absolute;
        bottom: 90px;
        left: 0;
        right: 0;
        text-align: center;

        /deep/ .el-button {
          height: 32px;
          padding: 6px 8px;
        }

        /deep/.el-button+.el-button {
          margin-left: 5px;
        }
      }
    }

    /***移入显示设置按钮**/
    .set-hover {
      &:hover {
        .r-box-btns {
          display: block;
        }
      }

    }
  }
}

.appsgraycolor {
  filter: grayscale(100%);
  -webkit-filter: grayscale(100%);
  -moz-filter: grayscale(100%);
  -ms-filter: grayscale(100%);
  -o-filter: grayscale(100%);
  filter: progid:DXImageTransform.Microsoft.BasicImage(grayscale=1);
  -webkit-filter: grayscale(1);
}
</style>
