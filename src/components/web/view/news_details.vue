<!--
 * @Author: lxx1997 lujiangpeng@vipinfo.com.cn
 * @Date: 2023-03-14 10:31:29
 * @LastEditors: lxx1997 lujiangpeng@vipinfo.com.cn
 * @LastEditTime: 2023-03-17 12:35:05
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

    <detailspage1
      v-if="template_num == 1"
      @detailsData="detailsData"
    ></detailspage1
    ><!--模板一（2.2新闻模板）-->
    <detailspage2
      v-if="template_num == 2"
      @detailsData="detailsData"
    ></detailspage2
    ><!--模板二（外包设计）-->
    <!-- 读者评论组件 -->
    <div class="news-readcomment" id="news-readcomment">
      <div id="readcomment-component" class="readcomment-component">
        <div
          class="readers_comments_temp1"
          data-test="ceshi"
          :data-path="path"
          data-approutecode="news"
          :data-objectid="objectid"
          :data-objectname="title"
          :data-columnid="columnid"
          :data-commnetscope="commnetscope"
        >
          <div id="readers_comments_temp1"></div>
        </div>
      </div>
    </div>
    <!-- <div class="news-readcomment" id="news-readcomment">
      <div class="news-read">
        <readcomment
          @comMainSwitch="comMainSwitch"
          :path="path"
          approutecode="news"
          :objectid="objectid"
          :objectname="title"
        ></readcomment>
      </div>
    </div> -->
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
        .match(/id=[^\&]+/g)[1]
        .substr(3),
      columnid: location.search
        .substr(1)
        .match(/cid=[^\&]+/)[0]
        .substr(4),
      commnetscope: "",//评论范围
      title: ""
    };
  },
  created() {
    this.initData();
  },
  mounted() {
    this.addComponent();
  },
  methods: {
    detailsData(data) {
      // console.log(data);
      this.title = data.title;
      this.objectid = data.id;
      this.columnid = data.columnID;
    },
    addComponent() {
      setTimeout(() => {
        var url =
          "http://192.168.21.46:80/cdn/public/template/readers_comments/temp1";
        var link = document.createElement("link");
        link.setAttribute("rel", "stylesheet");
        link.setAttribute("type", "text/css");
        link.setAttribute("href", url + "/component.css");
        document.getElementsByTagName("body")[0].appendChild(link);
        ///
        var js_element = document.createElement("script");
        js_element.setAttribute("type", "text/javascript");
        js_element.setAttribute("src", url + "/component.js");
        document.getElementsByTagName("body")[0].appendChild(js_element);

        // js_element.addEventListener("load", e => {
        //   setTimeout(() => {
        //     if (!document.getElementsByClassName("readComment")[0]) {
        //       // console.log('object');
        //       document.getElementById("readcomment-component").style.display =
        //         "none";
        //     }
        //   }, 100);
        // });
      }, 100);
    },
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
          // console.log(res);
          if (res.data) {
            this.commnetscope = res.data.columnName // 获取评论范围
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
  background-color: #fff;
}
.news-readcomment {
  width: 100%;
  background: #fff;
  // background: #e0dfdf;
  display: flex;
  margin: -1px;
  justify-content: center;
  & .readcomment-component {
    margin-top: 10px;
    width: 1200px;
    padding: 10px;
    margin-bottom: 10px;
  }
}
</style>
