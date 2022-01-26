<template>
  <div class="list-warp">
    <div class="articledetails-warp">
     <div class="body-content m-width c-l">
        <div class="left-menu">
          <div class="menu-top child_bg">新闻公告</div>
          <div class="menu-list">
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
          <div class="menu-top child_bg">当前位置：{{content_title}}</div>
          <div class="right-content">
              <div class="news-content-warp">
                <h1 :style="{color:getTitleClass('color'),fontSize:getTitleClass('font')+'px',fontWeight:getTitleClass('B'),'text-decoration':getTitleClass('U'),'font-style':getTitleClass('I')}">{{detailsData.title||"标题走丢了"}}</h1>
                <div class="details_content">
                  <div class="rich-title">
                    <span class="col1"><i class="title">发布人：</i>{{detailsData.publisher||''}}</span>
                    <span class="col2" v-if="data.isShowPublishDate"><i class="title">发布时间：</i>{{(detailsData.publishDate||'').slice(0,10)}}</span>
                    <span class="col3" v-if="data.isShowHitCount"><i class="title">范文次数：</i>{{detailsData.hitCount||0}}</span>
                    <span v-if="data.isShowAuthor">作者：{{detailsData.author}}</span><!--作者-->
                    <span v-if="data.isShowKeywords">关键词：{{detailsData.keywords}}</span><!--关键词-->
                    <a v-if="data.isShowJumpLink" :href="detailsData.jumpLink">跳转链接</a><!--跳转链接-->
                    <span v-if="data.isShowParentCatalogue">标签：{{detailsData.parentCatalogue}}</span><!--标签-->
                    <span v-if="data.isShowExpirationDate">失效日期：{{(detailsData.expirationDate||'').slice(0,10)}}</span><!--失效日期-->
                    <span v-if="data.isShowExpendFiled1">{{detailsData.expendFiled1}}</span>
                    <span v-if="data.isShowExpendFiled2">{{detailsData.expendFiled2}}</span>
                    <span v-if="data.isShowExpendFiled3">{{detailsData.expendFiled3}}</span>
                    <span v-if="data.isShowExpendFiled4">{{detailsData.expendFiled4}}</span>
                    <span v-if="data.isShowExpendFiled5">{{detailsData.expendFiled5}}</span>
                  </div>
                  <div class="rich-text" v-html="detailsData.content"></div>
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
                </div> -->
              </div>
          </div><!--文章详情页面 end -->
        </div>
     </div>
    </div>
  </div>
</template>

<script>
import my_rate from "../../model/rate";
export default {
  name: 'footerPage',
  
  components:{my_rate},
  created(){},
  data () {
    return {
        left_index:0,//左边的菜单
        content_title:'',//内容中的标题
        id:decodeURI(this.$route.query.id||''),//新闻id
        c_id:decodeURI(this.$route.query.c_id||''),//栏目id
        detailsData:{},//新闻详情
        curScore:2,//评论分数
        data:{},
        titleStyleKV:[],
        menu_list:[],
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
        var _this = this;
        this.http.getPlain('pront-news-column-list-get','columnid='+this.c_id).then(res=>{
            _this.menu_list = res.data||[];
            if(_this.menu_list && _this.menu_list.length>0){
              _this.menu_list.forEach((item,i)=>{
                if(item.columnID == _this.c_id){
                 setTimeout(() => {
                   _this.menu_list[i]['check'] = false;
                    _this.menuClick(_this.menu_list[i].name,i,false);
                 }, 200);
                }
              })
            }
        }).catch(err=>{
            console.log(err);
        })
        this.http.getPlain_url('pront-news-content-get','?contentid="'+this.id+'"').then(res=>{
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
          this.$router.push({path:'/web_list1',query:{c_id:encodeURI(this.menu_list[index].columnID)}})
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
        this.$router.push({path:'/web_detailspage1',query:{id:val}})
      },
  },
}
</script>

<style lang="less" scoped>
  @import "../../../../assets/web/css/style.less";/**通用文件 */
  @import "../../../../assets/web/css/color.less";/**通用文件 */
  .articledetails-warp{
    min-height:700px;
    background: @e0dfdf url(../../../../assets/web/img/banner-bg1.jpg) no-repeat center top;
    padding-bottom: 20px;
    padding-top: 95px;
  }
    .body-content{
    background-color: #fff;
    .left-menu{
      float: left;
      margin-top: -25px;
      width: 250px;
      .menu-top{
        position: relative;
        height: 69px;
        font-size: 24px;
        font-weight: lighter;
        line-height: 74px;
        color: @fff;
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
      &::after{
        position: absolute;
        left: -6px;
        top: 45px;
        bottom: 0;
        width: 6px;
        content: "";
        background: #fff;
        box-shadow: 8px 0 10px rgba(0, 0, 0, 0.05);
        z-index: 2;
      }
      .menu-top{
        height: 44px;
        padding: 10px 20px;
        font-size: 14px;
        color: @fff;
        margin-top: 25px;
        line-height: 24px;
        position: relative;
        &:after{
          position: absolute;
          left: 0;
          bottom: 0;
          border-width: 0 0 44px 15px;
          border-style: dashed dashed solid solid;
          border-color: transparent transparent transparent rgba(0,0,0,.8);
          content: "";
        }
      }
    }
    .menu-list,.right-content{
      min-height: 550px;
      background-color: @fff;
    }
    /**左边的列表菜单*/
    .menu-list{
      ul{
        padding: 10px 20px 0;
        .child-list{
          > a{
            &:after{
                border-top: 6px solid transparent;
                border-left: 6px solid @6b;
                border-bottom: 6px solid transparent;
                left:5px;
                top: 12px;
              }
          }
        }
        .child-list-active-open{
          > a{
            &:after{
                border-left: 6px solid transparent;
                border-right: 6px solid transparent;
                border-top: 6px solid @fff;
                left:5px;
                top: 16px;
                 border-left-color: transparent !important;
              }
          }
        }
        .child-list-active-close{
          > a{
            &:after{
                border-top: 6px solid transparent;
                border-left: 6px solid @fff;
                border-bottom: 6px solid transparent;
                left:5px;
                top: 12px;
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
              color: @6b;
              position: relative;
              display: block;
              &:hover{
                text-decoration: revert;
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
      a{
        color: @333;
      }
    }
  }
  /*****新闻详情 */
  .news-content-warp{
h1{
  margin: 0 -15px;
  padding: 10px 50px;
  font-size: 20px;
  font-weight: lighter;
  line-height: 30px;
  text-align: center;
  border-bottom: 1px dashed #dedad6;
}
.details_content{
  margin-top: 20px;
  min-height: 150px;
  .rich-title{
    margin-bottom: 20px;
    text-align: center;
    color: @6b;
    span,a{
      padding: 0 15px;
      white-space: nowrap;
    }
    i{
      font-style: normal;
    }
  }
  .rich-text{
    margin-bottom: 20px;
  }
}
/***评论****/
.comment{
  margin: 0 -15px;
  .row-score{
    margin-bottom: 15px;
    span.title{
      vertical-align: middle;
    }
  }
  .c-text{
    position: relative;
    height: 120px;
    .textarea,.title{
      position: absolute;
      top: 0;
    }
    .title{
      width:98px;
      text-align: right;
      span{
        display: block;
      }
    }
    textarea{
      left: 100px;
      outline: none;
      width:calc(100% - 100px);
      height: 100px;
      resize: none;
      border: 1px solid @de;
      border-radius: 3px;
      padding: 10px;
      
    }
  }
  .btns{
    text-align: center;
    .btn{
      color: @fff;
      width: 100px;
      height: 30px;
      outline: none;
      border: 0px solid @fff;
      border-radius: 3px;
      cursor: pointer;
      &:hover{
        opacity: .8;
      }
    }
    .b-clear{
      margin-left: 30px;
      background-color: @9ea0a5;
    }
  }
}
/**评论区**/
.write-a-review{
  margin-top: 20px;
  .title{
    margin: 0 -15px;
    margin-bottom: 30px;
    font-weight: bold;
    line-height: 20px;
    font-size: 16px;
    border-bottom: 1px dashed @de;
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
      border-radius: 3px;
    }
    .r-top .text{
      display: inline-block;
      margin-left:20px;
      vertical-align: top;
      line-height: 23px;
      span.name{
        color: @3e3f42;
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
}
</style>
