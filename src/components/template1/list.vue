<template>
  <div class="list-warp">
    <div class="articledetails-warp">
     <div class="body-content m-width c-l">
        <div class="left-menu">
          <div class="menu-top child_bg">新闻公告</div>
          <div class="menu-list">
            <ul>
              <li class="child_color_hover" v-for="(item,index) in menu_list" :class="isActive(item,item.check)">
                <a href="javascript:;" @click="menuClick(item.title,item.type,item.id,index)">{{item.title}}</a>
                <ul class="sub-menu" v-if="item.list && item.list.length>0 && item.check">
                  <li v-for="(it,i) in item.list"><a href="javascript:;">{{it.title}}</a></li>
                </ul>
              </li>
              <!-- <li class="child_color_hover" :class="left_index==1?'active child_bg':''" @click="menuClick('智慧图书馆','menu',1)"><a href="javascript:;">智慧图书馆</a></li>
              <li class="child_color_hover" :class="left_index==2?'active child_bg':''" @click="menuClick('联系我们','text',2)"><a href="javascript:;">联系我们</a></li>
              <li class="child_color_hover" :class="left_index==3?'active child_bg':''" @click="menuClick('新闻列表','news',3)"><a href="javascript:;">新闻列表</a></li> -->
            </ul>
          </div>
        </div>
        <div class="body-title">
          <div class="menu-top child_bg">当前位置：{{content_title}}</div>
          <div class="right-content" v-if="content_type=='news'">
            <ul class="news-ul">
              <li class="next_hover" @click="menuClick('列表详情','text',-1)" v-for="item in 4">
                <div class="time n_hover">
                  <span class="data">26</span>
                  <span>2019-11</span>
                </div>
                <div class="title-warp">
                  <a href="javascript:void(0)">CNRDS经济、金融、商学数据库高级试用通知</a>
                  <span>点击量：49次</span>
                  <p class="intros">新闻简介新闻简介新闻简介新闻简介新闻简介新闻简简介新闻简介新闻简介新闻简介新闻简介新闻简介新闻简介新闻简介新闻简介新闻简介新闻简介新闻简介新闻简介新闻简介新闻简介新闻简介新闻简介新闻简介新闻简介新闻简介</p>
                </div>
              </li>
            </ul>
            <pages :total="10" :Cindex="1"></pages>
          </div><!--新闻列表 end -->

          <div class="right-content" v-if="content_type=='text'">
            <news_details></news_details>
          </div><!--文章详情页面 end -->
        </div>
     </div>
    </div>
  </div>
</template>

<script>
import http from "@/assets/js/http";
import news_details from './news_details'
import pages from '@/common/pages';
export default {
  name: 'footerPage',
  components:{news_details,pages},
  created(){},
  data () {
    return {
        left_index:0,//左边的菜单
        content_title:'关于我们',//内容中的标题
        content_type:'news',//右边内容的类型，如：文章(text)，列表(news)
        menu_list:[
          {id:0,title:'关于我们',list:[{title:'下级'},{title:'下级'}],type:'news'},
          {id:1,title:'智慧图书馆',type:'news'},
          {id:2,title:'联系我们',type:'text'},
          {id:3,title:'新闻列表',type:'news'},
        ],
    }
  },
  mounted(){
    //   this.initData();
    this.menuClick(this.menu_list[2].title,this.menu_list[2].type,this.menu_list[2].id,2);
    // document.addEventListener('click',function(e){
    //   console.log(e,e.target);
    // })
  },
  methods:{
      initData(){
        http.getPlain('AssetNewest','PlateId=109&PageSize=9&PageIndex=1').then(res=>{ //学生专区
            this.list1 = res.result.dtos||[];
        }).catch(err=>{
            console.log(err);
        })
      },
      menuClick(title,type,id,index){//标题,内容类型，左边菜单下标（此方法如果用到右边菜单列表时，index参数为-1）
        this.content_type = type;
        this.content_title = title;
        if(id!=-1){
          this.left_index = id;
        }
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
        this.$forceUpdate();
      },
      isActive(val,check){
        var cs = '';
        if(val.list && val.list.length>0){
          cs = 'child-list ';
        }
        if(this.left_index == val.id){
          cs = 'active child_bg';
          if(val.list && val.list.length>0 && check==true){
            cs = cs + ' child-list-active-open';
          }else if(val.list && val.list.length>0 && (check==undefined||check==false)){
            cs = cs+' child-list-active-close';
          }
        }
        return cs;
      },
  },
}
</script>

<style lang="less" scoped>
    @import "../../assets/css/color.less";/**通用文件 */
  .articledetails-warp{
    min-height:700px;
    background: @e0dfdf url(../../assets/img/template1/banner-bg.jpg) no-repeat center top;
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
      &::after{
        position: absolute;
        right:0;
        top: 72px;
        bottom: 0;
        width: 6px;
        content: "";
        background: @fff;
        box-shadow:8px 0 10px rgba(0, 0, 0, 0.05);
        z-index: 2;
      }
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
      /***新闻列表 */
      ul.news-ul{
        li{
          //min-height: 90px;
          cursor: pointer;
        }
        .time{
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
          .data{
            font-size: 30px;
            display: block;
            margin-top: 12px;
          }
        }
        .title-warp{
          padding-left: 90px;
          left: 95px;
          right:10px;
          width: auto;
          a{
            font-size: 18px;
            color: @333;
            display: block;
          }
          span{
            font-size: 12px;
            color: @8b;
            line-height: 22px;
          }
          p.intros{
            color: @8b;
            font-size: 14px;
            overflow:hidden; 
            text-overflow:ellipsis;
            display:-webkit-box; 
            -webkit-box-orient:vertical;
            -webkit-line-clamp:2; 
          }
        }
      }
      li{
        padding: 20px 15px;
        font-size: 18px;
        margin-bottom: 10px;
        vertical-align: middle;
        border-bottom: 1px solid @de;
      }
      a{
        color: @333;
      }
      .video{
        margin-top: 20px;
        width: 100%;
        max-width: 100%;
      }
      video::-internal-media-controls-download-button {
          display:none;
      }
      video::-webkit-media-controls-enclosure {
          overflow:hidden;
      }
      video::-webkit-media-controls-panel {
          width: calc(100% + 30px); 
      }
    }
  }
</style>
