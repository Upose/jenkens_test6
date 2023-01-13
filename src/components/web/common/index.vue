<template>
  <div class="web-warp" :class="skin_template">
    <div :class="header_class" id="jl_vip_zt_header_warp">
      <div id="jl_vip_zt_header"></div>
    </div>
    <div class="content-warp">
      <router-view v-if="post_details"></router-view>
    </div>
    <div :class="footer_class" id="jl_vip_zt_footer_warp">
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
  created() {
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
    if (this.headerFooterInfo) {
      this.header_class = this.headerFooterInfo.headerTemplateCode || '';
      this.footer_class = this.headerFooterInfo.footerTemplateCode || '';
      this.addStyle(this.headerFooterInfo.headerRouter + '/component.css');
      this.addScript(this.headerFooterInfo.headerRouter + '/component.js');

      this.addStyle(this.headerFooterInfo.footerRouter + '/component.css');
      this.addScript(this.headerFooterInfo.footerRouter + '/component.js');
    }
  },
  mounted() {
    if (this.headerFooterInfo && this.headerFooterInfo != null && this.headerFooterInfo != undefined && this.headerFooterInfo != 'undefined') {
      this.skin_template = this.headerFooterInfo.themeColor || 'template1';
    }
  },
  data() {
    return {
      headerFooterInfo: JSON.parse(localStorage.getItem('headerFooterInfo')),
      post_details: false,
      header_class: '',
      footer_class: '',
      skin_template: this.$store.state.skin_template || 'template1',
    }
  },
  methods: {

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

