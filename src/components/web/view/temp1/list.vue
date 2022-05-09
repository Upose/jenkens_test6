<template>
  <div class="list-warp" v-aaa="'aaa'">
    <div class="articledetails-warp">
      <div class="body-content m-width c-l">
        <div class="left-menu">
          <div class="menu-top child_bg">{{content_title}}</div>
          <div class="menu-list">
            <ul>
              <li class="child_color_hover" v-for="(item,index) in menu_list" :class="isActive(item,item.check)">
                <a href="javascript:;" @click="menuClick(item.name,index, 'first')">{{item.name}}</a>
                <ul class="sub-menu" v-if="item.lableList && item.lableList.length>0 && item.check">
                  <li v-for="(it,i) in item.lableList" @click="foxbaseClick(it.key)" :class="{'cur-sub-key':curSubKey == it.key}"><a href="javascript:;">{{it.value}}</a></li>
                </ul>
              </li>
            </ul>
          </div>
        </div>
        <div class="body-title">
          <div class="menu-top child_bg">当前位置：{{content_title}}</div>
          <div class="right-content">
            <ul class="news-ul">
              <li class="next_hover" @click="detailsClick(it)" v-for="(it,i) in news_list" :key="i+'content'" :class="it.isShowPublishDate?'min-h':''">
                <div class="time n_hover" v-if="it.isShowPublishDate">
                  <span class="data">{{(it.publishDate||'').slice(8,10)}}</span>
                  <span>{{(it.publishDate||'').slice(0,7)}}</span>
                </div>
                <div class="title-warp" :class="it.isShowPublishDate?'':'p-l'">
                  <a href="javascript:void(0)">{{it.title||'标题走丢了'}}</a>
                  <span v-if="it.isShowHitCount">点击量：{{it.hitCount||0}}次</span>
                  <span v-if="it.isShowLablesName">标签：<span v-for="(ite,k) in (it.lablesName||[])" :key="k+'_label'">{{ite}}&nbsp;</span></span>
                  <p class="intros"><span v-html="it.content"></span></p>
                </div>
              </li>
            </ul>
            <div class="temp-loading" v-if="loading"></div>
            <!--加载中-->
            <div v-if="!loading && news_list.length == 0" class="web-empty-data"></div>
            <pages1 :total="totalPages" :Cindex="pageIndex" :totalCount="totalCount" @currentClick="currentClick" v-if="totalCount"></pages1>
          </div>
          <!--新闻列表 end -->
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import pages1 from '@/components/web/model/pages1';
export default {
  name: 'footerPage',
  components: { pages1 },
  created() { },
  data() {
    return {
      loading: true,
      left_index: 0,//左边的菜单
      content_title: '',//内容中的标题
      cid: decodeURI(this.$route.query.cid || ''),
      l_id: '',
      pageIndex: 1,//当前页
      pageSize: 20,//每页条数
      totalCount: 0,//总条数
      totalPages: 0,//总页数
      menu_list: [],
      news_list: [],
      curSubKey: '',
    }
  },
  mounted() {
    document.title = '列表-' + this.$store.state.appDetails.appName + '-' + JSON.parse(localStorage.getItem('orgInfo')).orgName;
    this.initData();
  },
  methods: {
    initData() {
      //获取左边菜单列表
      this.http.getPlain('pront-news-column-list-get', 'columnid=' + this.cid).then(res => {
        this.menu_list = res.data || [];
        this.loading = false;
        if (this.$route.query.cid) {
          this.menu_list.forEach((item, i) => {
            if (item.columnID == this.$route.query.cid) {
              setTimeout(() => {
                this.menu_list[i]['check'] = false;
                this.menuClick(this.menu_list[i].name, i, false);
              }, 200);
            }
          })
        } else {
          setTimeout(() => {
            this.menuClick(this.menu_list[0].name, 0);
          }, 200)
        }
      }).catch(err => {
        this.loading = false;
      })
    },
    //获取分页数据
    currentClick(val) {
      this.pageIndex = val;
      this.getNewsList(this.cid, this.l_id);
    },
    //获取新闻列表
    getNewsList(cid, l_id) {//栏目id，labeleid
      this.cid = cid;
      this.l_id = l_id;
      var list = {
        pageIndex: this.pageIndex,
        pageSize: this.pageSize,
        columnID: cid,
        contentCutLength: 160,
        lableID: l_id,
        searchKey: '',
      }
      this.http.postJsonParameter_url('pront-news-list-data-get', list, '?columnID=' + cid).then(res => {
        this.loading = false;
        if (res.data && res.data.items) {
          this.news_list = res.data.items || [];
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
    menuClick(title, index, leve) {//标题,index下标
      if (leve == 'first') {
        this.$router.push({ path: '/web_newsList', query: { cid: this.menu_list[index].columnID } }).catch((err) => { });
      }
      this.curSubKey = this.$route.query.detailId || ''
      document.title = title + '-' + this.$store.state.appDetails.appName + '-' + JSON.parse(localStorage.getItem('orgInfo')).orgName;
      this.pageIndex = 1;
      this.totalCount = 0;
      this.content_title = title;
      this.left_index = this.menu_list[index].columnID;
      if (this.menu_list[index]['check'] == undefined) {
        this.menu_list[index]['check'] = false;
      } else {
        this.menu_list[index]['check'] = !this.menu_list[index]['check'];
      }
      this.menu_list.forEach((item, i) => {
        if (i != index) {
          this.menu_list[i]['check'] = false;
        }
      })
      this.getNewsList(this.menu_list[index].columnID, this.curSubKey);
      this.$forceUpdate();
    },
    isActive(val, check) {
      var cs = '';
      if (val.lableList && val.lableList.length > 0) {
        cs = 'child-list ';
      }
      if (this.left_index == val.columnID) {
        cs = 'active child_bg';
        if (val.lableList && val.lableList.length > 0 && check == true) {
          cs = cs + ' child-list-active-open';
        } else if (val.lableList && val.lableList.length > 0 && (check == undefined || check == false)) {
          cs = cs + ' child-list-active-close';
        }
      }
      return cs;
    },
    detailsClick(val) {
      if (val.externalLink && val.externalLink != '') {
        location.href = val.externalLink;
      } else {
        this.$router.push({ path: '/web_newsDetails', query: { id: encodeURI(val.contentID), cid: encodeURI(this.left_index) } })
      }
    },
    //点击二级菜单
    foxbaseClick(val) {
      this.pageIndex = 1;
      this.totalCount = 0;
      this.curSubKey = val
      this.getNewsList(this.left_index, val);
    },
  },
}
</script>

<style lang="less" scoped>
@import "../../../../assets/web/css/style.less"; /**通用文件 */
@import "../../../../assets/web/css/color.less"; /**通用文件 */
.p-l {
  padding-left: 0 !important;
}
.min-h {
  min-height: 110px !important;
}
.articledetails-warp {
  min-height: 700px;
  background: @e0dfdf url(../../../../assets/web/img/banner-bg1.jpg) no-repeat
    center top;
  background-size: 100% 165px;
  padding-bottom: 20px;
  padding-top: 95px;
}
.cur-sub-key {
  background-color: #ffeaea;
}
.body-content {
  background-color: #fff;
  position: relative;
  &::before {
    position: absolute;
    left: 240px;
    top: 45px;
    bottom: 0;
    width: 6px;
    content: "";
    background: #fff;
    box-shadow: 8px 0 10px rgba(0, 0, 0, 0.05);
    z-index: 2;
  }
  .left-menu {
    float: left;
    margin-top: -25px;
    width: 250px;
    .menu-top {
      position: relative;
      height: 69px;
      font-size: 24px;
      font-weight: lighter;
      line-height: 74px;
      color: @fff;
      white-space:nowrap;
      overflow:hidden;
      text-overflow:ellipsis;
      text-align: center;
      padding: 0 10px;
    }
  }
  .body-title {
    margin-left: 250px;
    .menu-top {
      height: 44px;
      padding: 10px 20px;
      font-size: 14px;
      color: @fff;
      margin-top: 25px;
      line-height: 24px;
      position: relative;
      &:after {
        position: absolute;
        left: 0;
        bottom: 0;
        border-width: 0 0 44px 15px;
        border-style: dashed dashed solid solid;
        border-color: transparent transparent transparent rgba(0, 0, 0, 0.8);
        content: "";
      }
    }
  }
  .menu-list,
  .right-content {
    min-height: 550px;
    background-color: @fff;
  }
  /**左边的列表菜单*/
  .menu-list {
    ul {
      padding: 10px 20px 0;
      .child-list {
        > a {
          &:after {
            border-top: 6px solid transparent;
            border-left: 6px solid @6b;
            border-bottom: 6px solid transparent;
            left: 5px;
            top: 12px;
          }
        }
      }
      .child-list-active-open {
        > a {
          &:after {
            border-left: 6px solid transparent;
            border-right: 6px solid transparent;
            border-top: 6px solid @fff;
            left: 5px;
            top: 16px;
            border-left-color: transparent !important;
          }
        }
      }
      .child-list-active-close {
        > a {
          &:after {
            border-top: 6px solid transparent;
            border-left: 6px solid @fff;
            border-bottom: 6px solid transparent;
            left: 5px;
            top: 12px;
          }
        }
      }

      .child_color_hover {
        &:hover {
          > a {
            &::after {
              border-left-color: @fff;
            }
          }
        }
      }

      li {
        cursor: pointer;
        line-height: 36px;
        font-size: 15px;
        color: @6b;
        border-bottom: 1px solid @de;
        &:hover {
          color: @fff;
          a {
            color: @fff;
          }
        }
        a {
          position: relative;
          display: block;
          color: @6b;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          padding: 0 20px;
          &:after {
            content: "";
            width: 0;
            height: 0;
            position: absolute;
          }
        }
        .sub-menu {
          background-color: #f9f9f9;
          padding: 0;
          a {
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
            color: #a21e1e;
            position: relative;
            display: block;
            &::before {
              content: "";
              display: block;
              width: 5px;
              height: 5px;
              border-radius: 50%;
              background: #a21e1e;
              position: absolute;
              left: 8px;
              top: 15px;
            }
            &:hover {
              text-decoration: revert;
            }
          }
          li {
            border-bottom: none;
            padding-left: 10px;
            &:hover {
              color: @23;
            }
          }
        }
      }
      .active {
        color: @fff;
        a {
          color: @fff;
        }
      }
    }
  }
  .right-content {
    padding: 20px 75px 55px;
    /***新闻列表 */
    ul.news-ul {
      li {
        //min-height: 90px;
        cursor: pointer;
      }
      .time {
        min-height: 80px;
        left: 15px;
        width: 80px;
        color: @fff;
        text-align: center;
        background-color: @e0dfdf;
        font-size: 14px;
        font-weight: bold;
        line-height: 30px;
        float: left;
        .data {
          font-size: 30px;
          display: block;
          margin-top: 12px;
        }
      }
      .title-warp {
        padding-left: 90px;
        left: 95px;
        right: 10px;
        width: auto;
        a {
          font-size: 18px;
          color: @333;
          display: block;
        }
        span {
          font-size: 12px;
          color: @8b;
          line-height: 22px;
        }
        p.intros {
          color: @8b;
          font-size: 14px;
          overflow: hidden;
          text-overflow: ellipsis;
          display: -webkit-box;
          -webkit-box-orient: vertical;
          -webkit-line-clamp: 2;
        }
      }
    }
    li {
      padding: 20px 15px;
      font-size: 18px;
      margin-bottom: 10px;
      vertical-align: middle;
      border-bottom: 1px solid @de;
    }
    a {
      color: @333;
    }
    .video {
      margin-top: 20px;
      width: 100%;
      max-width: 100%;
    }
    video::-internal-media-controls-download-button {
      display: none;
    }
    video::-webkit-media-controls-enclosure {
      overflow: hidden;
    }
    video::-webkit-media-controls-panel {
      width: calc(100% + 30px);
    }
  }
}
</style>
