<!--
 * @Description: 
 * @Author: gongqin
 * @Date: 2022-08-11 15:47:15
 * @LastEditors: gongqin
 * @LastEditTime: 2022-10-28 15:59:59
-->
<template>
  <div id="news_sys" class="admin-warp-app">
    <router-view v-if="post_details && isInfoLoad" />
    <div class="admin-loading" v-if="!post_details && !isInfoLoad" v-loading="true"></div>
  </div>
</template>

<script>
export default {
  name: 'news_sys',
  created() {
    this.getBaseInfo();
    let appDetails = this.$store.state.appDetails;
    //详情
    if (!appDetails || appDetails == null || appDetails == undefined || appDetails == '') {
      this.getAppsDetails();
    }
    // localStorage.setItem('token', 'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJPcmdDb2RlIjoiY3F1IiwiVXNlcktleSI6ImNxdV92aXBzbWFydDAwMDAxIiwiQ2FyZE5vIjoidmlwc21hcnQwMDAwMSIsIkNhc0Zyb20iOiJ2aXBzbWFydCIsIm5iZiI6MTY2NjY3OTQ2MywiZXhwIjoxNjY2Njg2NjYzLCJpc3MiOiJTbWFydExpYnJhcnkuSWRlbnRpdHlDZW50ZXIiLCJhdWQiOiJXZWJBcGkifQ.KwqR5JcWeQ02M8__9sPNW5Jpjf0kfbRyGUj2VSXX2Hwg7D4-OauluL5796jFgEXHNAeNTVmhN-oCHjgTs4m8YXSd2e8if6S1hKThfQoqESyHVt6XERiM2_hyvte68Mu-22T8_-si9iTNJEA5dqO9rbMJFhGr_dvDQrN-AXYnv6olR7jMPeEt9nbCsH7n0ibOyG8gTetoV2YO3hRaoa0QuuxI-HaflN92-FzVR79Qbr90fAUF_QWy-OlUuex355PWy8WxqviLmffMDbLqf1Y2_CNbQMsTU2Kn_Orbvb0SyyT-S7MU9HqUYzrBoEQlv_7O_jj_9bbc0QdlgZitP5LIew')
  },
  mounted() {
    // this.$store.commit('getSession');
    // this.$i18n.locale = this.$store.state.language;
    // this.skin_template = this.$store.state.skin_template;
  },
  data() {
    return {
      isInfoLoad: false,
      post_details: false,
    }
  },
  methods: {
    //获取应用名称信息等
    async getAppsDetails() {
      var res = await handleAppState('news');
      if (res.code == 200) {
        this.$store.commit('appDetails', res.data);
        this.post_details = true;
      } else if (res.code == 499) {
        this.$router.push({ path: "/403", query: { txt: res.message } });
        this.post_details = true;
      } else if (res.code == 500) {
        this.$message({ type: 'error', message: '获取应用详情失败!' });
      }
    },
    //获取基础信息
    async getBaseInfo() {
      var res = await handleGetBaseInfo();
      if (res.code == 200) {
        this.$store.commit('baseinfo', res.data);
        this.$root.fileUrl = res.data.orgInfo.fileUrl;
        this.isInfoLoad = true;
      } else {
        this.$message({ type: 'error', message: res.message || '获取基础数据失败！' });
      }
    },
  },
}
</script>

<style lang="less">
@import "./assets/public/css/public.less";
/**颜色配置 */
</style>
