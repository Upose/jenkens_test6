<template>
  <div class="list-warp">
    <div class="articledetails-warp">
      <div class="m-width top-title">
        <span class="m-title">新闻公告 NEWS</span>
        <span class="m-address">当前位置：联系我们</span>
      </div>
     <div class="body-content m-width c-l">
        <div class="left-menu">
          <div class="menu-list">
            <span class="title">栏目列表</span>
            <ul>
              <li class="child_color_hover" v-for="(item,index) in menu_list" :class="isActive(item,item.check)">
                <a href="javascript:;" @click="menuClick(item.title,item.type,item.id,index)">{{item.title}}</a>
                <ul class="sub-menu" v-if="item.list && item.list.length>0 && item.check">
                  <li v-for="(it,i) in item.list"><a href="javascript:;">{{it.title}}</a></li>
                </ul>
              </li>
            </ul>
          </div>
        </div>
        <div class="body-title">
          <div class="right-content">
            <div class="content-top-title">新闻资讯</div>
            <div class="row" @click="detailsClick(1)" v-for="i in 8">
              <div class="msg-warp">
                <div class="title">重庆环保企业网站</div>
                <div class="msg">
                  <span class="content">新闻简介新闻简介新闻简介新闻简介新闻简介新闻简介新闻简介新闻简介新闻简介新闻简介新闻简介新闻简介新闻简介新闻简介新闻简介</span>
                  <span class="show-details child_text_color">[查看详细]</span>
                  <span class="txt-right">访问次数：32 &nbsp;&nbsp;&nbsp;&nbsp;2021-9-23</span>
                </div>
              </div>
            </div>

            <div class="page-warp">
              <button class="child_color_hover">首页</button>
              <button class="child_color_hover">1</button>
              <button class="child_color_hover">2</button>
              <button class="child_color_hover">下一页</button>
              <button class="child_color_hover">末页</button>
              <button>共2页 11条</button>
            </div><!--分页 end-->
          </div>
          
        </div>
     </div>
    </div>
  </div>
</template>

<script>
import http from "@/assets/public/js/http";
import pages from '@/components/web/model/pages';
export default {
  name: 'footerPage',
  components:{pages},
  created(){},
  data () {
    return {
        left_index:0,//左边的菜单
        content_title:'关于我们',//内容中的标题
        content_type:'news',//右边内容的类型，如：文章(text)，列表(news)
        menu_list:[
          {id:0,title:'关于我们',list:[{title:'下级'},{title:'下级'}],type:'news'},
          {id:1,title:'智慧图书馆',list:[{title:'下级'},{title:'下级'}],type:'news'},
          {id:2,title:'联系我们',list:[{title:'下级'},{title:'下级'}],type:'text'},
          {id:3,title:'新闻列表',type:'news'},
        ],
    }
  },
  mounted(){
      // this.initData();
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
            color: @999;
            line-height: 22px;
            .txt-right{
              float: right;
            }
          }
        }
      }
      /*****分页 */
      .page-warp{
        margin-top: 30px;
        button{
          border: 1px solid @999;
          padding: 0 5px;
          height: 30px;
          outline: none;
          background: @fff;
          vertical-align: middle;
          margin-right: 8px;
        }
        .child_color_hover{
          cursor: pointer;
          &:hover{
            color: @fff;
            border: 1px solid @fff;
          }
        }
      }
    }
  }
</style>
