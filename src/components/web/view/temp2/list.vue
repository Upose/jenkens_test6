<template>
  <div class="list-warp">
    <div class="articledetails-warp">
      <div class="m-width top-title">
        <span class="m-title">{{titleJson.name}}</span>
        <span class="m-address">
          当前位置：<span @click="menuClick(titleJson,0, 'first')">{{titleJson.name}}</span>
          <span @click="foxbaseClick(subTitle)" v-show="subTitle.value"> > {{subTitle.value}}</span>
        </span>
      </div><!--顶部面包屑 end-->

     <div class="body-content m-width c-l">
        <div class="left-menu" v-if="is_show_menu">
          <div class="menu-list">
            <span class="title">栏目列表</span>
            <ul>
              <li class="child_color_hover" v-for="(item,index) in menu_list" :class="isActive(item,item.check)">
                <a href="javascript:;" @click="menuClick(item,index, 'first')">{{item.name}}</a>
                <ul class="sub-menu" v-if="item.lableNewsList && item.lableNewsList.length>0 && item.check">
                  <li v-for="(it,i) in item.lableNewsList" @click="foxbaseClick(it)" :class="{'cur-sub-key':subTitle.key == it.key}"><a href="javascript:;">{{it.value}}</a></li>
                </ul>
              </li>
            </ul>
          </div>
        </div><!--左侧栏目菜单列表 end-->

        <div class="body-title" :style="{'margin-left':!is_show_menu?'0':'250px'}">
          <div class="right-content">
            <div class="content-top-title">新闻资讯</div><!--标题信息-->

            <div class="row" v-for="(it,i) in news_list" :key="i+'content'" @click="detailsClick(it)">
              <div class="msg-warp">
                <div class="title">
                  <span v-if="it.isShowLablesName && it.lablesName.length" class="tag">
                    【<span class="tag" v-for="(ite,k) in (it.lablesName||[])" :key="k+'_label'">{{ite}}</span>】
                  </span>
                  {{it.title||'标题走丢了'}}
                </div>
                <div class="msg c-l">
                  <span class="content">
                    <span v-if="it.isShowContent" v-html="it.content"></span>
                    <span class="show-details child_text_color">[查看详细]</span>
                  </span>
                  <span class="txt-right">
                    <span v-if="it.isShowHitCount">访问次数：{{it.hitCount||0}}</span>
                    <span v-if="it.isShowPublishDate">发布日期：{{(it.publishDate||'').slice(0,10)}}</span>
                  </span>
                </div>
              </div>
            </div><!--顶部-其他基础信息 end-->

            <div class="temp-loading" v-if="loading"></div><!--加载中-->
            <div v-if="!loading && news_list.length == 0" class="web-empty-data"></div>
            <pages :total="totalPages" :Cindex="pageIndex" :totalCount="totalCount" @currentClick="currentClick" v-if="totalCount"></pages>
          </div>
          
        </div>
     </div>
    </div>
  </div>
</template>

<script>
import pages from '@/components/web/model/pages';
export default {
  name: 'footerPage',
  components:{pages},
  created(){
    if(this.$route.query.subTitle){
      this.subTitle = JSON.parse(this.$route.query.subTitle);
    }
    //是否显示左侧菜单
    this.http.getPlain('pront-column-side-type','columnid=' + this.cid).then(res=>{
      this.is_show_menu = res.data||false;
    })
  },
  data () {
    return {
      loading:false,
      cid:decodeURI(this.$route.query.cid||''),
      pageIndex:1,//当前页
      pageSize:20,//每页条数
      totalCount:0,//总条数
      totalPages:0,//总页数
      menu_list:[],//菜单列表
      news_list:[],//新闻列表
      titleJson: {},//一级标题
      subTitle:{},//二级标题
      is_show_menu:false,//是否显示侧边栏目列表
    }
  },
  mounted(){
    document.title = '列表-'+this.$store.state.appDetails.appName+'-'+JSON.parse(localStorage.getItem('orgInfo')).orgName;
    this.initData();
  },
  methods:{
      //获取栏目菜单列表
      initData() {
        this.loading = true;
        this.http.getPlain('pront-news-column-list-get', 'columnid=' + this.cid).then(res => {
          this.menu_list = res.data || [];
          if (this.cid) {
            if(this.subTitle && this.subTitle.value){
              this.menu_list.forEach((item, i) => {
                if (item.columnID == this.cid) {
                  this.titleJson = item;
                  this.menu_list[i].check = true;
                }
              })
              this.foxbaseClick(this.subTitle);
            }else{
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
          this.$message({type: 'error',message: err.errors||'查询内容失败'});
        })
      },
      //获取分页数据
      currentClick(val){
        this.pageIndex = val;
        this.getNewsList(this.cid,this.l_id);
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
            if(this.news_list.length ==1){
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
        if(item.newsCount && item.newsCount==1){
          this.$router.push({ path: '/web_newsDetails', query: { id: encodeURI(val.newsContentId), cid: encodeURI(this.cid),subTitle:JSON.stringify(this.subTitle)} })
          return;
        }
        if (leve == 'first') {
          this.$router.push({ path: '/web_newsList', query: { cid: this.menu_list[index].columnID } }).catch((err) => { });
        }
        document.title = item.name + '-' + this.$store.state.appDetails.appName + '-' + JSON.parse(localStorage.getItem('orgInfo')).orgName;
        this.pageIndex = 1;
        this.totalCount = 0;
        this.titleJson = item;
        this.subTitle = {};//清空子选项
        this.cid = this.menu_list[index].columnID;
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
        this.getNewsList(this.menu_list[index].columnID,{});
        this.$forceUpdate();
      },
      //选中状态
      isActive(val,check){
        var cs = '';
        if(val.lableNewsList && val.lableNewsList.length>0){
          cs = 'child-list ';
        }
        if(this.cid == val.columnID){
          cs = 'active child_bg';
          if(val.lableNewsList && val.lableNewsList.length>0 && check==true){
            cs = cs + ' child-list-active-open';
          }else if(val.lableNewsList && val.lableNewsList.length>0 && (check==undefined||check==false)){
            cs = cs+' child-list-active-close';
          }
        }
        return cs;
      },
      //跳转详情
      detailsClick(val){
        if(val.externalLink && val.externalLink!=''){
          this.http.getJson('pront-news-content-hit-count', {contentid: val.contentID}).then(res => {
          }).catch(err => {
            console.log(err);
          })
          window.open(val.externalLink, '_blank');
        }else{
          /**
         * id：新闻详情id
         * cid：栏目id
         * subTitle:副标题
         */
        this.$router.push({ path: '/web_newsDetails', query: { id: encodeURI(val.contentID), cid: encodeURI(this.cid),subTitle:JSON.stringify(this.subTitle)} })
        }
      },
      //点击二级菜单
      foxbaseClick(val) {
        this.subTitle = val;
        if(val.newsCount && val.newsCount==1){
          this.$router.push({ path: '/web_newsDetails', query: { id: encodeURI(val.newsContentId), cid: encodeURI(this.cid),subTitle:JSON.stringify(this.subTitle)} });
          return;
        }
        this.pageIndex = 1;
        this.totalCount = 0;
        this.getNewsList(this.cid, val);
      },
  },
}
</script>

<style lang="less" scoped>
  @import "../../../../assets/web/css/style.less";
  @import "../../../../assets/web/css/color.less";
  @import "../../../../assets/web/css/temp2/list.less";  
</style>
