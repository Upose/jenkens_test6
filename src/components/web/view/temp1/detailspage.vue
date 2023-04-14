<template>
  <div class="list-warp">
    <div class="articledetails-warp">
      <div class="body-content m-width c-l" :class="!is_show_menu ? 'body-content-clear' : ''">

        <div class="left-menu" v-if="is_show_menu">
          <div class="menu-top tbg-c1">{{ titleJson.name }}</div>
          <div class="menu-list">
            <ul>
              <li class="thover-bg-c1" v-for="(item, index) in menu_list" :key="index"
                :class="isActive(item, item.check)">
                <!-- <a href="javascript:;" @click="menuClick(item, index, true)">{{ item.name }}</a> -->
                <a :href="$setHref({ url: '/web_newsList', query: { cid: menu_list[index].columnID } })"
                  @click="menuClick(item, index, true)">{{ item.name }}</a>
                <ul class="sub-menu" v-if="item.lableNewsList && item.lableNewsList.length > 0 && item.check">
                  <li v-for="(it, i) in item.lableNewsList" :key="i">
                    <!-- <a :class="{ 'tfont-c2': subTitle.key == it.key }" href="javascript:;">{{ it.value }}</a> -->
                    <a v-if="it.newsCount && it.newsCount == 1" :class="{ 'tfont-c2': subTitle.key == it.key }"
                      :href="$setHref({ url: '/web_newsDetails', query: { id: encodeURI(it.newsContentId), cid: encodeURI(cid), subTitle: JSON.stringify(it) } })">
                      {{ it.value }}
                    </a>
                    <a :class="{ 'tfont-c2': subTitle.key == it.key }"
                      :href="$setHref({ url: '/web_newsList', query: { cid: encodeURI(cid), subTitle: JSON.stringify(it) } })"
                      v-else>
                      {{ it.value }}
                    </a>
                  </li>
                </ul>
              </li>
            </ul>
          </div>
        </div>
        <!--栏目菜单列表 end-->

        <div class="body-title" :style="{ 'margin-left': !is_show_menu ? '0' : '250px' }">
          <div class="menu-top tbg-c1">
            当前位置：
            <!-- <span class="cursor" @click="menuClick(titleJson, 0, 'first')">{{ titleJson.name }}</span> -->
            <a :href="$setHref({ url: '/web_newsList', query: { cid: titleJson.columnID } })"
              @click="menuClick(titleJson, ' ', 'first')">{{ titleJson.name }}</a>
            <!-- <span @click="foxbaseClick(subTitle)" v-if="subTitle.value" class="cursor"> > {{ subTitle.value }}</span> > -->
            <span v-if="subTitle.value" class="cursor">
              <a v-if="subTitle.newsCount && subTitle.newsCount == 1"
                :href="$setHref({ url: '/web_newsDetails', query: { id: encodeURI(subTitle.newsContentId), cid: encodeURI(cid), subTitle: JSON.stringify(subTitle) } })">
                > {{ subTitle.value }}
              </a>
              <a v-else
                :href="$setHref({ url: '/web_newsList', query: { cid: encodeURI(cid), subTitle: JSON.stringify(subTitle) } })">
                > {{ subTitle.value }}
              </a>
            </span> >
            详情
          </div>
          <!--顶部面包屑 end -->

          <div class="right-content">
            <div v-if="!loading && !removed" class="news-content-warp news-img-max-sys">

              <h1
                :style="{ color: getTitleClass('color'), fontSize: getTitleClass('font') + 'px', fontWeight: getTitleClass('B'), 'text-decoration': getTitleClass('U'), 'font-style': getTitleClass('I') }">
                <span class="tag" v-if="data.isShowParentCatalogue && (detailsData.parentCatalogueKV || []).length > 0">
                  【<span class="tag" v-for="i in (detailsData.parentCatalogueKV || [])" :key="i.key">{{
                    i.value
                  }}&nbsp;</span>】
                </span>
                {{ detailsData.title || "标题走丢了" }}
              </h1>
              <!--标题信息 end-->

              <div class="details_content">
                <div class="audit-process"
                  v-if="auditProcessList && auditProcessList.length > 0 && data.isShowAuditProcess">
                  <span v-for="(i, index) in auditProcessList" :key="index">{{ i.name }}:{{ i.auditManager }}</span>
                </div>
                <!--审核信息end-->

                <div class="rich-title">
                  <span class="col1"><i class="title">发布人：</i>{{ detailsData.publisher || '无' }}</span>
                  <span class="col2" v-if="data.isShowPublishDate"><i class="title">发布时间：</i>{{ (detailsData.publishDate
                    || '').slice(0, 10)
                  }}</span>
                  <span class="col3" v-if="data.isShowHitCount"><i class="title">访问次数：</i>{{
                    detailsData.hitCount || 0
                  }}</span>
                  <!-- <span v-if="data.isShowAuthor">作者：{{detailsData.author}}</span>作者 -->
                  <!-- <span v-if="data.isShowKeywords">关键词：{{detailsData.keywords}}</span>关键词 -->
                  <!-- <a v-if="data.isShowJumpLink && detailsData.jumpLink" :href="detailsData.jumpLink">跳转链接</a>跳转链接 -->
                  <!-- <span v-if="data.isShowExpirationDate">失效日期：{{(detailsData.expirationDate||'').slice(0,10)}}</span>失效日期 -->
                  <span v-if="data.isShowExpendFiled1">{{ detailsData.expendFiled1 }}</span>
                  <span v-if="data.isShowExpendFiled2">{{ detailsData.expendFiled2 }}</span>
                  <span v-if="data.isShowExpendFiled3">{{ detailsData.expendFiled3 }}</span>
                  <span v-if="data.isShowExpendFiled4">{{ detailsData.expendFiled4 }}</span>
                  <span v-if="data.isShowExpendFiled5">{{ detailsData.expendFiled5 }}</span>
                </div>
                <!--顶部-其他基础信息 end-->

                <div class="rich-text" v-html="detailsData.content"></div>
                <!--富文本详情 end-->
              </div>

              <!-- <div class="comment">
                  <div class="row-score">
                    <span class="title">是否对您有用：</span>
                    <my_rate :score.sync="curScore"></my_rate>
                  </div>
                  <div class="c-text">
                    <div class="title">
                      <span>发 表 评 论：</span>
                      <span>（请 先 登 录）</span>
                    </div>
                    <textarea class="textarea" :disabled="disabled"></textarea>
                  </div>
                  <div class="btns">
                    <button class="btn main_bg fff">保 存</button>
                    <button class="btn b-clear">清 空</button>
                  </div>
                </div>
                <div class="write-a-review">
                  <div class="title"><span class="child_text_color child_border_bottom">评论数</span>（3）</div>
                  <div class="row" v-for="i in 3">
                    <div class="r-top">
                      <img src="@/assets/web/img/default.jpg" class="u-img">
                      <span class="text">
                        <span class="name">张老师</span>
                        <span class="time">2018年12月14日  20:18:25</span>
                      </span>
                    </div>
                    <div class="r-bottom">
                      ASC数据库收录16,700多种期刊的摘要；8,500多种全文期刊，其中7,300多种为同行评审(peer-reviewed)，还包括800多种非期刊类全文出版物(如书籍, 报告及会议论文等)。主题包括生物科学、工程技术、社会科学、心理学、教育、法律、医学、语言学、人文、信息科技、通讯传播、公共管理、历史学、计算机科学、军事、文化、健康卫生医疗、宗教与神学、艺术、视觉传达、表演、哲学、各国文学等等。
                    </div>
                  </div>
                  <div class="more">查看更多</div>
                </div> 评论信息 end-->
            </div>
            <div v-if="!loading && removed" class="web-empty-data"></div>
            <div class="temp-loading" v-if="loading"></div>
          </div>
          <!--文章详情页面 end -->

        </div>
        <!--右侧中间区域 end-->

      </div>
    </div>
  </div>
</template>

<script>
import my_rate from "../../model/rate";//评论星星
export default {
  name: 'footerPage',
  components: { my_rate },
  created() {
    //栏目信息-是否显示左侧菜单
    this.http.getPlain('pront-column-side-type', 'columnid=' + this.cid).then(res => {
      this.is_show_menu = res.data || false;
    })
  },
  data() {
    return {
      titleJson: {},//内容中的标题
      id: decodeURI(this.$route.query.id || ''),//新闻id
      cid: decodeURI(this.$route.query.cid || ''),//栏目id
      detailsData: {},//新闻详情
      auditProcessList: [],//审核流程
      curScore: 2,//评论分数
      data: {},//详情信息
      subTitle: JSON.parse(this.$route.query.subTitle || '{}'),//副标题
      titleStyleKV: [],
      menu_list: [],
      removed: false,
      loading: false,
      is_show_menu: false,//是否显示侧边栏目列表
    }
  },
  mounted() {
    this.initData();
  },
  watch: {
    '$route'(nval, oval) {
      this.id = decodeURI(nval.query.id || '');
      this.cid = decodeURI(nval.query.cid || '');
      this.subTitle = JSON.parse(nval.query.subTitle || '{}');
      this.initData();
    }
  },
  methods: {
    //初始化基础信息
    initData() {
      this.removed = false;
      this.loading = true;
      var _this = this;
      this.http.getPlain('pront-news-column-list-get', 'columnid=' + this.cid).then(res => {
        _this.menu_list = res.data || [];

        _this.menu_list.forEach((item, i) => {
          _this.menu_list[i]['check'] = false;
          if (_this.cid) {
            _this.menu_list.forEach((item, i) => {
              if (item.columnID == _this.cid) {
                setTimeout(() => {
                  _this.menu_list[i]['check'] = false;
                  _this.menuClick(_this.menu_list[i], i, false);
                }, 200);
              }
            })
          } else {
            setTimeout(() => {
              _this.menuClick(_this.menu_list[0], 0);
            }, 200)
          }
        })
      }).catch(err => {
        this.$message({ type: 'error', message: err.errors || '查询内容失败' });
      })
      this.http.getPlain_url('pront-news-content-get', '?contentid=' + this.id + '').then(res => {
        if (res.data && res.data.content) {
          this.data = res.data || [];
          this.auditProcessList = res.data.auditProcessList || [];
          this.detailsData = res.data.content || {};
          let title = res.data.content.title || ''
          document.title = title + '-' + this.$store.state.appDetails.appName + '-' + JSON.parse(localStorage.getItem('orgInfo')).orgName;
          if (this.detailsData && this.detailsData.titleStyleKV) {
            this.titleStyleKV = this.detailsData.titleStyleKV || [];
          }
        }
        this.loading = false;
      }).catch(err => {
        this.removed = true;
        this.loading = false;
        console.log(err, this.removed);
      })
    },
    //获取标题样式配置
    getTitleClass(type) {
      var class_val = '';
      this.titleStyleKV.forEach(item => {
        if (item.key == type) {
          if (type == 'B') {
            class_val = item.value ? 'blod' : '';
          } else if (type == 'U') {
            class_val = item.value ? 'underline' : '';
          } else if (type == 'I') {
            class_val = item.value ? 'italic' : '';
          } else {
            class_val = item.value;
          }
        }
      })
      return class_val;
    },
    /**一级菜单点击事件
     * 行信息，下标，一级菜单
     */
    menuClick(item, index, leve) {
      this.titleJson = item;
      if (item.newsCount && item.newsCount == 1) {
        // let curId = encodeURI(this.id);
        if (this.$route.query.id !== item.newsContentId) {
          this.$router.push({ path: '/web_newsDetails', query: { id: encodeURI(item.newsContentId), cid: encodeURI(item.columnID), subTitle: JSON.stringify(item.name) } })
        }
        return;
      }
      this.cid = item.columnID;
      this.menu_list.forEach((item, i) => {
        this.menu_list[i]['check'] = false;
      })
      if (item['check'] == undefined) {
        item['check'] = false;
      } else {
        item['check'] = !item['check'];
      }
      if (leve) {
        this.$router.push({ path: '/web_newsList', query: { cid: encodeURI(item.columnID) } })
      }
      this.$forceUpdate();
    },
    //是否选中状态
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
    //二级菜单点击事件
    foxbaseClick(val) {
      if (val.newsCount && val.newsCount == 1) {
        this.$router.push({ path: '/web_newsDetails', query: { id: encodeURI(val.newsContentId), cid: encodeURI(this.cid), subTitle: JSON.stringify(val) } }).catch(() => { });
        return;
      }
      this.$router.push({ path: '/web_newsList', query: { cid: encodeURI(this.cid), subTitle: JSON.stringify(val) } })
    }
  },
}
</script>

<style lang="less" scoped>
@import "../../../../assets/web/css/style.less";
@import "../../../../assets/web/css/color.less";
@import "../../../../assets/web/css/temp1/detailspage.less";
</style>
