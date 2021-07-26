<template>
  <div class="list-warp">
    <h1>联系我们</h1>
    <div class="details_content">
      <div class="rich-title">
        <span class="col1"><i class="title">发布人：</i>管理员</span>
        <span class="col2"><i class="title">发布时间：</i>2021-12-11</span>
        <span class="col3"><i class="title">范文次数：</i>455</span>
      </div>
      <div class="rich-text">
        <p>富文本内容</p>
      </div>
    </div>
    <div class="comment">
      <div class="row-score">
        <span class="title">是否对您有用：</span>
        <div class="star">
          <span title="2" @click="scoreClick(2)"><img :src="score_num>=2?star_check:star"></span>
          <span title="4" @click="scoreClick(4)"><img :src="score_num>=4?star_check:star"></span>
          <span title="6" @click="scoreClick(6)"><img :src="score_num>=6?star_check:star"></span>
          <span title="8" @click="scoreClick(8)"><img :src="score_num>=8?star_check:star"></span>
          <span title="10" @click="scoreClick(10)"><img :src="score_num>=10?star_check:star"></span>
        </div>
      </div>
      <div class="c-text">
        <div class="title">
          <span>发 表 评 论：</span>
          <span>（请 先 登 录）</span>
        </div>
        <textarea class="textarea"></textarea>
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
          <img src="@/assets/img/default.jpg" class="u-img">
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
    </div>
  </div>
</template>

<script>
import http from "@/assets/js/http";
export default {
  name: 'footerPage',
  created(){},
  data () {
    return {
      score_num:0,
      star:require('@/assets/img/star.png'),
      star_check:require('@/assets/img/star-check.png'),
    }
  },
  mounted(){
    //   this.initData();
  },
  methods:{
      initData(){
        http.getPlain('AssetNewest','PlateId=109&PageSize=9&PageIndex=1').then(res=>{ //学生专区
            this.list1 = res.result.dtos||[];
        }).catch(err=>{
            console.log(err);
        })
      },
      scoreClick(val){
        this.score_num = val;
      },
  },
}
</script>

<style lang="less" scoped>
@import "../../assets/css/color.less";/**通用文件 */
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
    span{
      padding: 0 15px;
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
    div.star{
      vertical-align: middle;
      display: inline-block;
      span{
        cursor: pointer;
      }
      img{
        width:18px;
      }
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
</style>
