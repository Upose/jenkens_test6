<template>
  <div class="list-warp">
    <div class="articledetails-warp">
      <div class="m-width top-title">
        <span class="m-title">{{titleJson.name}}</span>
        <span class="m-address">
          当前位置：<span @click="menuClick(titleJson,0, 'first')">{{titleJson.name}}</span>
          <span @click="foxbaseClick(subTitle)" v-show="subTitle.value"> > {{subTitle.value}}</span>
        </span>
      </div>
     <div class="body-content m-width c-l">
        <div class="left-menu" v-if="is_show_menu">
          <div class="menu-list">
            <span class="title">栏目列表</span>
            <ul>
              <li class="child_color_hover" v-for="(item,index) in menu_list" :class="isActive(item,item.check)">
                <a href="javascript:;" @click="menuClick(item,index, 'first')">{{item.name}}</a>
                <ul class="sub-menu" v-if="item.lableList && item.lableList.length>0 && item.check">
                  <li v-for="(it,i) in item.lableList" @click="foxbaseClick(it)" :class="{'cur-sub-key':subTitle.key == it.key}"><a href="javascript:;">{{it.value}}</a></li>
                </ul>
              </li>
            </ul>
          </div>
        </div>
        <div class="body-title" :style="{'margin-left':!is_show_menu?'0':'250px'}">
          <div class="right-content">
            <div class="content-top-title">新闻资讯</div>
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
            </div>
            <div class="temp-loading" v-if="loading"></div><!--加载中-->
            <div v-if="!loading && news_list.length == 0" class="web-empty-data"></div>
            <pages1 :total="totalPages" :Cindex="pageIndex" :totalCount="totalCount" @currentClick="currentClick" v-if="totalCount"></pages1>
          </div>
          
        </div>
     </div>
    </div>
  </div>
</template>

<script>
import pages1 from '@/components/web/model/pages1';
export default {
  name: 'footerPage',
  components:{pages1},
  created(){
    if(this.$route.query.subTitle){
      this.subTitle = JSON.parse(this.$route.query.subTitle);
    }
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
      menu_list:[],
      news_list:[],
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
      initData() {
        this.loading = true;
        //获取左边菜单列表
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
      menuClick(item, index, leve) {//标题,index下标
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
      isActive(val,check){
        var cs = '';
        if(val.lableList && val.lableList.length>0){
          cs = 'child-list ';
        }
        if(this.cid == val.columnID){
          cs = 'active child_bg';
          if(val.lableList && val.lableList.length>0 && check==true){
            cs = cs + ' child-list-active-open';
          }else if(val.lableList && val.lableList.length>0 && (check==undefined||check==false)){
            cs = cs+' child-list-active-close';
          }
        }
        return cs;
      },
      detailsClick(val){
        if(val.externalLink && val.externalLink!=''){
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
        this.pageIndex = 1;
        this.totalCount = 0;
        this.getNewsList(this.cid, val);
      },
  },
}
</script>

<style lang="less" scoped>
  @import "../../../../assets/web/css/style.less";/**通用文件 */
  @import "../../../../assets/web/css/color.less";/**通用文件 */
  /***主标题 */
  .top-title{
    margin-bottom: 15px;
    span{
      display: block;
      line-height: 36px;
    }
    .m-title{
      font-size: 28px;
      color: @fff;
    }
    .m-address{
      font-size: 14px;
      color: @fff;
      span{
        cursor: pointer;
        display: inline;
      }
    }
  }

  .cur-sub-key{
    background-color: #ffeaea;
  }
  
  .articledetails-warp{
    min-height:700px;
    background: @e0dfdf url(../../../../assets/web/img/banner-bg2.jpg) no-repeat center top;
    background-size: 100% 248px;
    padding-bottom: 20px;
    padding-top: 100px;
  }
    .body-content{
      min-height: calc(100vh - 450px);
    background-color: @fff;
    .left-menu{
      float: left;
      // margin-top: -25px;
      width: 250px;
      .menu-top{
        position: relative;
        height: 69px;
        font-size: 24px;
        font-weight: lighter;
        line-height: 74px;
        text-align: center;
      }
      // &::after{
      //   position: absolute;
      //   right:0;
      //   top: 72px;
      //   bottom: 0;
      //   width: 6px;
      //   content: "";
      //   background: @fff;
      //   box-shadow:8px 0 10px rgba(0, 0, 0, 0.05);
      //   z-index: 2;
      // }
    }
    .body-title{
      margin-left: 250px;
      position: relative;
      
    }
    .menu-list,.right-content{
      min-height: 550px;
      background-color: @fff;
    }
    /**左边的列表菜单*/
    .menu-list{
      .title{
        color: @666;
        display: block;
        margin: 0 30px;
        margin-right: 0;
        margin-top: 20px;
        line-height: 40px;
        border-bottom: 1px solid #dedede;
      }
      ul{
        padding-left:30px;
        padding-right: 0;
        .child-list{
          > a{
            &:after{
                left: 5px;
                top: 0px;
                content: '>';
              }
          }
        }
        .child-list-active-open{
          > a{
            &:after{
                content: '>';
                left: 9px;
                top: 9px;
                width: 13px;
                height: 22px;
                transform: rotate(90deg);
                border-left-color: transparent !important;
              }
          }
        }
        .child-list-active-close{
          > a{
            &:after{
                content: '>';
                left: 5px;
                top: 0px;
              }
          }
        }

        .child_color_hover{
            &:hover{
              > a{
                &::after{
                  border-left-color: @fff;
                }
              }
            }
        }

        li{
          cursor: pointer;
          line-height: 36px;
          font-size: 15px;
          color: @6b;
          border-bottom: 1px solid @de;
          text-overflow: ellipsis;
          white-space: nowrap;
          overflow: hidden;
          &:hover{
            color: @fff;
            a{
              color: @fff;
            }
          }
          a{
            position: relative;
            display: block;
            color:@6b;
            padding: 0 20px;
            &:after{
              content: '';
              width: 0;
              height: 0;
              position:absolute;
            }
          }
          .sub-menu{
            background-color: #f9f9f9;
            padding: 0;
            a{
              font-size: 12px;
              color: #a21e1e;
              position: relative;
              display: block;
              padding-left: 30px;
              &:hover{
                text-decoration: revert;
              }
              &::after{
                display: block;
                width: 5px;
                height: 5px;
                border-radius: 50%;
                background: #a21e1e;
                position: absolute;
                left: 20px;
                top: 15px;
              }
            }
            li{
              border-bottom: none;
              &:hover{
                color: @23;
              }
            }
          }
          
        }
        .active{
          color: @fff;
          a{
            color: @fff;
          }
        }
      }
    }
    .right-content{
      padding: 20px 75px 55px;
      .content-top-title{
        border-bottom: 1px solid #dedede;
        line-height: 40px;
        margin-bottom: 10px;
      }
      /***新闻列表 */
      .row{
        padding: 10px 0;
        border-bottom: 1px dotted #dedede;
        &:hover{
          cursor: pointer;
          .content{
            color: #232323;
          }
        }
        .msg-warp{
          .title{
            font-weight: bold;
            line-height: 26px;
          }
          .msg{
            width: 100%;
            color: @999;
            line-height: 22px;
            .content{
              display: inline-block;
              width: 100%;
              word-break: break-all;
              overflow: hidden;
              text-overflow: ellipsis;
              display: -webkit-box;
              -webkit-line-clamp: 3;
              -webkit-box-orient: vertical;
            }
            .txt-right{
              float: right;
            }
          }
          .c-l{
            display: inline-block;
          }
        }
      }
    }
  }
</style>
