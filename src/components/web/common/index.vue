<!--
 * @Description: 
 * @Author: gongqin
 * @Date: 2022-08-11 15:47:15
 * @LastEditors: gongqin
 * @LastEditTime: 2023-04-14 11:48:34
-->
<!--
 * @Description: 
 * @Author: gongqin
 * @Date: 2022-08-11 15:47:15
 * @LastEditors: gongqin
 * @LastEditTime: 2023-04-14 10:44:07
-->
<template>
  <div class="web-warp" :class="skin_template">
    <div :class="headerTemplateCode" id="jl_vip_zt_header_warp">
      <div id="jl_vip_zt_header"></div>
    </div>
    <div class="content-warp">
      <router-view v-if="post_details"></router-view>
    </div>
    <div :class="footerTemplateCode" id="jl_vip_zt_footer_warp">
      <div id="jl_vip_zt_footer"></div>
    </div>
  </div>
</template>

<script>
import store from '@/store/index'
/**日志分割线begin */
// import mixin from "@/assets/public/js/appLog/appLogMixin"
/**日志分割线end */
export default {
  /**日志分割线begin */
  // mixins: [mixin],
  // 2022.10.17 新日志
  mixins: [Vue.$createLegacyMixin()],
  provide() {
    return {
      fatherMethodSearchOperationWriteLog: this.searchOperationWriteLog,
      fatherMethodDownloadOperationWriteLog: this.downloadOperationWriteLog,
      fatherMethodDatabaseClickWriteLog: this.databaseClickWriteLog,
    }
  },
  /**日志分割线end */
  name: 'index',
  data() {
    return {
      headerFooterInfo: JSON.parse(localStorage.getItem('headerFooterInfo')),
      post_details: false,
      headerTemplateCode: '',
      footerTemplateCode: '',
      headerRouter: '',
      footerRouter: '',
      skin_template: this.$store.state.skin_template || 'template1',
      cId: this.$route.query.cid,
    }
  },
  created() {
    this.getHeadFoot();

    var _that = this;
    let appDetails = store.state.appDetails;
    //详情
    if (!appDetails || appDetails == null || appDetails == undefined || appDetails == '') {
      _that.http.getPlain('getcurrentappinfo', 'appcode=news').then((res) => {
        if (res.data) {
          store.commit('appDetails', res.data);
        }
        _that.post_details = true;
      }).catch(err => {
        _that.$message({ type: 'error', message: '获取应用详情失败!' });
      })
    } else {
      _that.post_details = true;
    }
  },
  mounted() {
    if (this.headerFooterInfo && this.headerFooterInfo != null && this.headerFooterInfo != undefined && this.headerFooterInfo != 'undefined') {
      this.skin_template = this.headerFooterInfo.themeColor || 'template1';
    }
  },
  methods: {
    getHeadFoot() {
      let headerFooterInfo = JSON.parse(localStorage.getItem('headerFooterInfo'));
      this.headerTemplateCode = headerFooterInfo.headerTemplateCode || '';
      this.footerTemplateCode = headerFooterInfo.footerTemplateCode || '';
      this.headerRouter = headerFooterInfo.headerRouter;
      this.footerRouter = headerFooterInfo.footerRouter;
      this.getServerHeadFoot();
    },
    // 获取信息导航特定头底部-设置
    getServerHeadFoot() {
      this.http.getJsonSelf('template-detail-by-column-id', `/${this.cId}`).then(res => {
        if (res.data.headTemplateModel.headerTemplateCode && res.data.headTemplateModel.headerRouter) {
          this.headerTemplateCode = res.data.headTemplateModel.headerTemplateCode;
          this.headerRouter = res.data.headTemplateModel.headerRouter;
        }
        if (res.data.footTemplateModel.footerTemplateCode && res.data.footTemplateModel.footerRouter) {
          this.footerTemplateCode = res.data.footTemplateModel.footerTemplateCode;
          this.footerRouter = res.data.footTemplateModel.footerRouter;
        }

        this.addTemp(this.headerRouter);
        this.addTemp(this.footerRouter);
      }).catch(err => {
        // this.$message({ type: 'error', message: '获取数据失败!' });
        this.addTemp(this.headerRouter);
        this.addTemp(this.footerRouter);
      });
    },
    addTemp(url) {
      this.addStyle(url + '/component.css?v=' + new Date().getTime());
      this.addScript(url + '/component.js?v=' + new Date().getTime());
    },
    addStyle(url) {
      var link = document.createElement("link");
      link.setAttribute("rel", "stylesheet");
      link.setAttribute("type", "text/css");
      link.setAttribute("href", url);
      document.getElementsByTagName("body")[0].appendChild(link);
    },
    addScript(url) {
      var js_element = document.createElement("script");
      js_element.setAttribute("type", "text/javascript");
      js_element.setAttribute("src", url);
      document.getElementsByTagName("body")[0].appendChild(js_element);
    },
  }
}
</script>
<style lang="less">
.web-empty-data {
  background: url(../../../assets/public/img/data-empty.png) no-repeat center;
  width: 100%;
  min-height: 180px;
}

.web-warp {
  min-width: 1200px;
  width: 100%;
  height: 100%;
  position: relative;
}
</style>

