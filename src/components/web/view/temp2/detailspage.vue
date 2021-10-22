<template>
  <div class="list-warp">
    <div class="articledetails-warp">
      <div class="m-width top-title">
        <span class="m-title">新闻公告 NEWS</span>
        <span class="m-address">当前位置：{{content_title}}</span>
      </div>
     <div class="body-content m-width c-l">
        <div class="left-menu">
          <div class="menu-list">
            <span class="title">栏目列表</span>
            <ul>
              <li class="child_color_hover" v-for="(item,index) in menu_list" :class="isActive(item,item.check)">
                <a href="javascript:;" @click="menuClick(item.name,index,true)">{{item.name}}</a>
                <ul class="sub-menu" v-if="item.lableList && item.lableList.length>0 && item.check">
                  <li v-for="(it,i) in item.lableList"><a href="javascript:;">{{it.value}}</a></li>
                </ul>
              </li>
            </ul>
          </div>
        </div>
        <div class="body-title">
          <div class="right-content">
            <div class="content-top-title">
              <span :style="{color:getTitleClass('color'),fontSize:getTitleClass('font')+'px',fontWeight:getTitleClass('B'),'text-decoration':getTitleClass('U'),'font-style':getTitleClass('I')}">{{detailsData.title||"标题走丢了"}}</span>
              <div class="news-sub-warp">
                <span class="name child1_text_color">{{detailsData.publisher||''}}</span><!--发布人-->
                <span v-if="data.isShowPublishDate"><i class="time-icon"></i>{{(detailsData.publishDate||'').slice(0,10)}}</span><!--发布日期-->
                <span v-if="data.isShowAuthor">{{detailsData.author}}</span><!--作者-->
                <span v-if="data.isShowKeywords">{{detailsData.keywords}}</span><!--关键词-->
                <span v-if="data.isShowExpirationDate">{{(detailsData.expirationDate||'').slice(0,10)}}</span><!--失效日期-->
                <a v-if="data.isShowJumpLink" :href="detailsData.jumpLink">跳转链接</a><!--跳转链接-->
                <span v-if="data.isShowParentCatalogue">{{detailsData.parentCatalogue}}</span><!--标签-->
                <span v-if="data.isShowExpendFiled1">{{detailsData.expendFiled1}}</span>
                <span v-if="data.isShowExpendFiled2">{{detailsData.expendFiled2}}</span>
                <span v-if="data.isShowExpendFiled3">{{detailsData.expendFiled3}}</span>
                <span v-if="data.isShowExpendFiled4">{{detailsData.expendFiled4}}</span>
                <span v-if="data.isShowExpendFiled5">{{detailsData.expendFiled5}}</span>
                <span v-if="data.isShowHitCount"><i class="number-icon"></i>({{detailsData.hitCount||0}})浏览量</span>
                <span class="r-share">一键分享</span>
              </div>
            </div>
            <div class="edit-content" v-html="detailsData.content"></div>
            <!-- <div class="comment">
              <div class="c-title">评论</div>
              <div class="c-input">
                <div class="no-login"><span class="login-btn child1_text_color">登录</span>后可评论</div>
                <div class="yes-login">
                  <textarea>请输入评论内容</textarea>
                </div>
              </div>
            </div>
            <div class="write-a-review">
              <div div class="title"><span>全部评论</span>（3）</div>
              <div class="row" v-for="i in 3">
                <div class="r-top">
                  <img src="@/assets/web/img/default.jpg" class="u-img">
                  <span class="text">
                    <span class="name child1_text_color">张老师</span>
                    <span class="time">2021-02-05  20:18:25</span>
                  </span>
                </div>
                <div class="r-bottom">
                  ASC数据库收录16,700多种期刊的摘要；8,500多种全文期刊，其中7,300多种为同行评审(peer-reviewed)，还包括800多种非期刊类全文出版物(如书籍, 报告及会议论文等)。主题包括生物科学、工程技术、社会科学、心理学、教育、法律、医学、语言学、人文、信息科技、通讯传播、公共管理、历史学、计算机科学、军事、文化、健康卫生医疗、宗教与神学、艺术、视觉传达、表演、哲学、各国文学等等。
                </div>
              </div>
              <div class="more">查看更多</div>
            </div> -->
          </div>
        </div>
     </div>
    </div>
  </div>
</template>
<script>
import http from "@/assets/public/js/http";
export default {
  name: 'footerPage',
  created(){
  },
  data () {
    return {
        left_index:0,//左边的菜单
        content_title:'',//内容中的标题
        id:this.$route.query.id,//新闻id
        coum_id:'"ByKpD6IAtgEEXaXd"',//栏目id
        detailsData:{},//新闻详情
        titleStyleKV:[],
        data:{},
        menu_list:[
          {id:0,name:'关于我们',lableList:[{name:'下级'},{name:'下级'}],type:'news'},
          {id:3,name:'新闻列表',type:'news'},
        ],
    }
  },
  mounted(){
    this.initData();
    // setTimeout(()=>{
    //   this.menuClick(this.menu_list[0].title,0);
    // },200)
  },
  methods:{
      initData(){
        http.postJson('pront-news-column-list-get',this.coum_id).then(res=>{
            this.menu_list = res.data||[];
        }).catch(err=>{
            console.log(err);
        })
        http.postJson('pront-news-content-get','"'+this.id+'"').then(res=>{
            if(res.data && res.data.content){
              this.data = res.data||[];
              this.detailsData = res.data.content||{};
              if(this.detailsData && this.detailsData.titleStyleKV){
                this.titleStyleKV = this.detailsData.titleStyleKV||[];
              }
            }
        }).catch(err=>{
            console.log(err);
        })
      },
      getTitleClass(type){
        var class_val = '';
        if(this.titleStyleKV)
        this.titleStyleKV.forEach(item=>{
          if(item.key == type){
            if(type == 'B'){
              class_val = item.value?'blod':'';
            }else if(type == 'U'){
              class_val = item.value?'underline':'';
            }else if(type == 'I'){
              class_val = item.value?'italic':'';
            }else{
              class_val = item.value;
            } 
          }
        })
        return class_val;
      },
      menuClick(title,index,is_open){//标题,index下标
        this.content_title = title;
        this.left_index = this.menu_list[index].columnID;
        if(this.menu_list[index]['check']==undefined){
          this.menu_list[index]['check'] = false;
        }else{
          this.menu_list[index]['check'] = !this.menu_list[index]['check'];
        }
        this.menu_list.forEach((item,i)=>{
          if(i != index){
            this.menu_list[i]['check'] = false;
          }
        })
        if(is_open){
          this.$router.push({path:'/list2',query:{id:this.menu_list[index].columnID}})
        }
        this.$forceUpdate();
      },
      isActive(val,check){
        var cs = '';
        if(val.lableList && val.lableList.length>0){
          cs = 'child-list ';
        }
        if(this.left_index == val.columnID){
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
        this.$router.push({path:'/detailspage2',query:{id:1}})
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
    }
  }
  
  .articledetails-warp{
    min-height:700px;
    background: @e0dfdf url(../../../../assets/web/img/banner-bg2.jpg) no-repeat center top;
    padding-bottom: 20px;
    padding-top: 100px;
  }
    .body-content{
    background-color: @fff;
    .left-menu{
      float: right;
      margin-right: 30px;
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
      margin-right: 250px;
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
            background-color: @fff;
            padding: 0;
            a{
              font-size: 12px;
              color: @6b;
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
                background: @999;
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
      padding: 35px 75px 55px;
      .edit-content{
        img{
          max-width: 100% !important;
        }
      }
      .content-top-title{
        font-size: 24px;
        // font-weight: bold;
        color: #000;
        .news-sub-warp{
          font-size: 12px;
          color: @999;
          font-weight: 400;
          margin-top: 20px;
          margin-bottom: 40px;
          padding-bottom: 20px;
          border-bottom: 1px solid #dedede;
          position: relative;
          padding-right: 80px;
          span,a{
            margin-right:5px;
            white-space: nowrap;
          }
          /***一键分享 */
          .r-share{
            position: absolute;
            right: 0;
            z-index: 2;
            top: 3px;
            color: @fff;
            background-color: #000;
            border-radius: 15px;
            padding: 6px 12px;
            margin-top: -10px;
          }
        }
      }
    }
  }
  /**评论区**/
.write-a-review{
  margin-top: 20px;
  .title{
    margin: 0 -15px;
    margin-bottom: 30px;
    line-height: 20px;
    font-size: 16px;
    line-height: 40px;
    border-bottom: 1px solid @de;
    span{
      border-width: 3px;
    }
  }
  .row{
    width: 100%;
    margin-bottom: 20px;
    .r-top{
      margin: 10px 0;
    }
    .r-top .u-img{
      width: 46px;
      height: 46px;
      border-radius: 50%;
    }
    .r-top .text{
      display: inline-block;
      margin-left:10px;
      vertical-align: top;
      line-height: 23px;
      span.name{
        font-size: 16px;
      }
      span.time{
        color: @9ea0a5;
      }
      span{
        display: block;
      }
    }
    .r-bottom{
      color: @6b;
      line-height: 20px;
    }
  }
  .more{
    cursor: pointer;
    text-align: right;
    &:hover{
      opacity: 0.6;
    }
  }
}
/****评论 */
.comment{
  margin-top: 30px;
  .c-title{
    font-weight: bold;
    font-size: 18px;
    line-height: 40px;
  }
  .c-input{
    background-color: #f8f8f8;
    padding: 20px;
    .no-login,.yes-login{
      width: 100%;
      height: 140px;
      border: 1px solid #dedede;
      background-color: #fff;
      text-align: center;
    }
    .no-login{
      color: #999;;
      line-height: 140px;
    }
    .yes-login{
      display: none;
    }
    .yes-login textarea{
      width: 100%;
      height: 100%;
      border: none;
      padding: 10px;
      outline: none;
    }
  }
}
</style>
