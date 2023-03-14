<!--
 * @Author: lxx1997 lujiangpeng@vipinfo.com.cn
 * @Date: 2023-03-14 10:31:29
 * @LastEditors: lxx1997 lujiangpeng@vipinfo.com.cn
 * @LastEditTime: 2023-03-14 15:51:19
 * @FilePath: \news_sys\src\components\web\view\news_details.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<!--根据参数选择某个详情页-->
<template>
  <div class="details-warp">
    <div class="temp-loading" v-if="request_of"></div>
    <!--加载中-->
    <div
      class="web-empty-data"
      v-if="!request_of && template_num == 0"
      :style="{
        background:
          'url(' + fileUrl + '/public/image/data-empty.png) no-repeat center'
      }"
    ></div>
    <!--暂无数据-->

    <detailspage1 v-if="template_num == 1"></detailspage1
    ><!--模板一（2.2新闻模板）-->
    <detailspage2 v-if="template_num == 2"></detailspage2
    ><!--模板二（外包设计）-->
    <div class="news-readcomment" id="news-readcomment">
      <div class="news-read">
        <readcomment
          @comMainSwitch="comMainSwitch"
          :path="path"
          approutecode="news"
          :objectid="objectid"
          :objectname="title"
        ></readcomment>
      </div>
    </div>
  </div>
</template>

<script>
import detailspage1 from "./temp1/detailspage";
import detailspage2 from "./temp2/detailspage";
import readcomment from "./readercomment/readcomment.vue";
export default {
  components: { detailspage1, detailspage2, readcomment },
  props: {},
  data() {
    return {
      template_num: 0,
      request_of: true, //请求中
      fileUrl: window.localStorage.getItem("fileUrl"), //图片地址前缀
      cid: decodeURI(this.$route.query.cid || ""), //栏目id
      ////读者评论使用参数
      path: location.pathname + location.search,
      objectid: location.search
        .substr(1)
        .match(/id=\d+/)[0]
        .match(/\d+/)[0],
      title: ""
    };
  },
  created() {
    this.initData();
  },
  mounted() {},
  methods: {
    comMainSwitch(data) {
      // console.log(data);
      if (!data) {
        document.getElementById("news-readcomment").style.display = "none";
      }
    },
    //根据栏目id获取模板信息
    initData() {
      this.http
        .getPlain("pront-column-link-info", "columnid=" + this.cid)
        .then(res => {
          if (res.data) {
            this.template_num = res.data.template || 0;
          }
          this.request_of = false;
        })
        .catch(err => {
          this.request_of = false;
        });
    }
  }
};
</script>

<style scoped lang="less">
.details-warp {
  min-height: 500px;
  //   background-color: #ddd;
}
.news-readcomment {
  width: 100%;
  background: #e0dfdf;
  display: flex;
  margin: -1px;
  justify-content: center;
  & .news-read {
    margin-top: 10px;
    width: 1200px;
    padding: 10px;
    background-color: #f6f8f9;
    margin-bottom: 10px;
  }
}
</style>
