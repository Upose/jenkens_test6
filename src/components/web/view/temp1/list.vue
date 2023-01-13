<template>
  <div class="list-warp" v-aaa="'aaa'">
    <div class="articledetails-warp">
      <div class="body-content m-width c-l" :class="!is_show_menu ? 'body-content-clear' : ''">

        <div class="left-menu" v-if="is_show_menu">
          <div class="menu-top tbg-c1"><span>{{ titleJson.name }}</span></div>
          <div class="menu-list">
            <ul>
              <li class="thover-bg-c1" v-for="(item, index) in menu_list" :key="index"
                :class="isActive(item, item.check)">
                <!-- <a href="javascript:;" @click="menuClick(item, index, 'first')">{{ item.name }}</a> -->
                <a :href="$setHref({ url: '/web_newsList', query: { cid: menu_list[index].columnID } })"
                  @click="menuClick(item, index, 'first')">{{ item.name }}</a>
                <ul class="sub-menu" v-if="item.lableNewsList && item.lableNewsList.length > 0 && item.check">
                  <li v-for="(it, i) in item.lableNewsList" :key="i">
                    <a v-if="it.newsCount && it.newsCount == 1" :class="{ 'tfont-c2': subTitle.key == it.key }"
                      :href="$setHref({ url: '/web_newsDetails', query: { id: encodeURI(it.newsContentId), cid: encodeURI(cid), subTitle: JSON.stringify(subTitle) } })"
                      @click="foxbaseClick(it, 'existence')">
                      {{ it.value }}
                    </a>
                    <a :class="{ 'tfont-c2': subTitle.key == it.key }" href="javascript:;" @click="foxbaseClick(it)"
                      v-else>{{ it.value }}</a>
                  </li>
                </ul>
              </li>
            </ul>
          </div>
        </div>
        <!--左侧栏目菜单列表 end-->

        <div class="body-title" :style="{ 'margin-left': !is_show_menu ? '0' : '250px' }">
          <div class="menu-top tbg-c1">
            当前位置：
            <!-- <span @click="menuClick(titleJson, 0, 'first')">{{ titleJson.name }}</span> -->
            <a v-if="menu_list && menu_list.length"
              :href="$setHref({ url: '/web_newsList', query: { cid: titleJson.columnID } })"
              @click="menuClick(titleJson, ' ', 'first')">{{ titleJson.name }}</a>
            <span @click="foxbaseClick(subTitle)" v-if="subTitle.value"> > {{ subTitle.value }}</span>
            <!-- <span>
              <a @click="foxbaseClick(subTitle)" v-if="subTitle.value"> > {{ subTitle.value }}</a>
            </span> -->
          </div>
          <!--顶部面包屑 end-->

          <div class="right-content">
            <ul class="news-ul">
              <li class="thover-child-bg-c1" v-for="(it, i) in news_list" :key="i + 'content'"
                :class="it.isShowPublishDate ? 'min-h' : ''">
                <a :href="$setHref(getlink(it))" :target="it.externalLink ? '_blank' : ''" @click="hitClick(it)">
                  <div class="time child-bg-c1" v-if="it.isShowPublishDate">
                    <span class="data">{{ (it.publishDate || '').slice(8, 10) }}</span>
                    <span>{{ (it.publishDate || '').slice(0, 7) }}</span>
                  </div>
                  <div class="title-warp" :class="it.isShowPublishDate ? '' : 'p-l'">
                    <a>
                      <span class="tag" v-if="it.isShowLablesName && it.lablesName.length">
                        【<span class="tag" v-for="(ite, k) in (it.lablesName || [])" :key="k + '_label'">{{
                          ite
                        }}</span>】
                      </span>
                      {{ it.title || '标题走丢了' }}
                    </a>
                    <span v-if="it.isShowHitCount">点击量：{{ it.hitCount || 0 }}次</span>
                    <p class="intros" v-if="it.isShowContent"><span v-html="it.content"></span></p>
                  </div>
                </a>
              </li>
            </ul>
            <!--顶部-其他基础信息 end-->

            <div class="temp-loading" v-if="loading"></div>
            <!--加载中-->
            <div v-if="!loading && news_list.length == 0" class="web-empty-data"></div>
            <pages :total="totalPages" :Cindex="pageIndex" :totalCount="totalCount" @currentClick="currentClick"
              v-if="totalCount"></pages>
          </div>
          <!--新闻列表 end -->
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import pages from '@/components/web/model/pages';
export default {
  name: 'footerPage',
  components: { pages },
  created() {
    if (this.$route.query.subTitle) {
      this.subTitle = JSON.parse(this.$route.query.subTitle);
    }
    //是否显示左侧菜单
    this.http.getPlain('pront-column-side-type', 'columnid=' + this.cid).then(res => {
      this.is_show_menu = res.data || false;
    })
  },
  data() {
    return {
      loading: false,
      cid: decodeURI(this.$route.query.cid || ''),
      pageIndex: 1,//当前页
      pageSize: 20,//每页条数
      totalCount: 0,//总条数
      totalPages: 0,//总页数
      menu_list: [],
      news_list: [],
      titleJson: {},//一级标题
      subTitle: {},//二级标题
      is_show_menu: false,//是否显示侧边栏目列表
    }
  },
  mounted() {
    document.title = '列表-' + this.$store.state.appDetails.appName + '-' + JSON.parse(localStorage.getItem('orgInfo')).orgName;
    this.initData();
  },
  methods: {
    //获取栏目菜单列表
    initData() {
      this.loading = true;
      this.http.getPlain('pront-news-column-list-get', 'columnid=' + this.cid).then(res => {
        this.menu_list = res.data || [];
        if (this.cid) {
          if (this.subTitle && this.subTitle.value) {
            this.menu_list.forEach((item, i) => {
              if (item.columnID == this.cid) {
                this.titleJson = item;
                this.menu_list[i].check = true;
              }
            })
            this.foxbaseClick(this.subTitle);
          } else {
            this.menu_list.forEach((item, i) => {
              if (item.columnID == this.cid) {
                setTimeout(() => {
                  this.menu_list[i]['check'] = false;
                  this.menuClick(this.menu_list[i], i, false);
                }, 200);
              }
            })
          }
        } else {
          setTimeout(() => {
            this.menuClick(this.menu_list[0], 0);
          }, 200)
        }
        this.loading = false;
      }).catch(err => {
        this.loading = false;
        this.$message({ type: 'error', message: err.errors || '查询内容失败' });
      })
    },
    //获取分页数据
    currentClick(val) {
      this.pageIndex = val;
      this.getNewsList(this.cid, this.subTitle);
    },
    //获取新闻列表
    getNewsList(cid, sub) {//栏目id，labeleid
      this.cid = cid;
      var list = {
        pageIndex: this.pageIndex,
        pageSize: this.pageSize,
        columnID: cid,
        contentCutLength: 300,
        lableID: sub.key,
        searchKey: '',
      }
      this.news_list = [];
      this.http.postJsonParameter_url('pront-news-list-data-get', list, '?columnID=' + cid).then(res => {
        this.loading = false;
        if (res.data && res.data.items) {
          this.news_list = res.data.items || [];
          if (this.news_list.length == 1) {
            this.detailsClick(this.news_list[0]);
          }
          this.pageIndex = res.data.pageIndex;
          this.pageSize = res.data.pageSize;
          this.totalCount = res.data.totalCount;
          this.totalPages = res.data.totalPages;
        }
      }).catch(err => {
        this.loading = false;
        console.log(err);
      })
    },
    /**一级菜单点击事件
     * 行信息，下标，一级菜单
     */
    menuClick(item, index, leve) {
      if (item.newsCount && item.newsCount == 1) {
        this.getNewsList(this.menu_list[index].columnID, {}, 'one');
        // this.$router.push({ path: '/web_newsDetails', query: { id: encodeURI(val.newsContentId), cid: encodeURI(this.cid),subTitle:JSON.stringify(this.subTitle)} })
        return;
      }
      // if (leve == 'first') {
      //   this.$router.push({ path: '/web_newsList', query: { cid: this.menu_list[index].columnID } }).catch((err) => { });
      // }

      document.title = item.name + '-' + this.$store.state.appDetails.appName + '-' + JSON.parse(localStorage.getItem('orgInfo')).orgName;
      this.pageIndex = 1;
      this.totalCount = 0;
      this.titleJson = item;
      this.subTitle = {};//清空子选项
      this.cid = item.columnID;
      this.menu_list.forEach((item, i) => {
        this.menu_list[i]['check'] = false;
      })
      if (item['check'] == undefined) {
        item['check'] = false;
      } else {
        item['check'] = !item['check'];
      }
      this.getNewsList(item.columnID, {});
      this.$forceUpdate();
    },
    /***选中状态 */
    isActive(val, check) {
      var cs = '';
      if (val.lableNewsList && val.lableNewsList.length > 0) {
        cs = 'child-list ';
      }
      if (this.cid == val.columnID) {
        cs = 'active tbg-c1';
        if (val.lableNewsList && val.lableNewsList.length > 0 && check == true) {
          cs = cs + ' child-list-active-open';
        } else if (val.lableNewsList && val.lableNewsList.length > 0 && (check == undefined || check == false)) {
          cs = cs + ' child-list-active-close';
        }
      }
      return cs;
    },
    //点击二级菜单
    foxbaseClick(val, existence) {
      this.subTitle = val;
      if (!existence && val.newsCount && val.newsCount == 1) {
        this.$router.push({ path: '/web_newsDetails', query: { id: encodeURI(val.newsContentId), cid: encodeURI(this.cid), subTitle: JSON.stringify(this.subTitle) } });
        return;
      }
      this.pageIndex = 1;
      this.totalCount = 0;
      this.getNewsList(this.cid, val);
    },
    /***跳转详情 */
    detailsClick(val) {
      if (val.externalLink && val.externalLink != '') {
        this.http.getJson('pront-news-content-hit-count', { contentid: val.contentID }).then(res => {
        }).catch(err => {
          console.log(err);
        })
        window.open(val.externalLink, '_blank');
      } else {
        /**
         * id：新闻详情id
         * cid：栏目id
         * subTitle:副标题
         */
        this.$router.push({ path: '/web_newsDetails', query: { id: encodeURI(val.contentID), cid: encodeURI(this.cid), subTitle: JSON.stringify(this.subTitle) } })
      }
    },
    getlink(it) {
      if (it.externalLink) {
        return { type: 'full', url: it.externalLink };
      } else {
        return { type: 'router', url: '/web_newsDetails', query: { id: encodeURI(it.contentID), cid: encodeURI(this.cid), subTitle: JSON.stringify(this.subTitle) } };
      }
    },
    hitClick(val) {
      if (val && val.externalLink) {
        this.http.getJson('pront-news-content-hit-count', { contentid: val.contentID }).then(res => {
        }).catch(err => {
          console.log(err);
        })
      }
    },
  },
}
</script>

<style lang="less" scoped>
@import "../../../../assets/web/css/style.less";
@import "../../../../assets/web/css/color.less";
@import "../../../../assets/web/css/temp1/list.less";
</style>
