<template>
  <el-dialog append-to-body title="分享" :visible.sync="dialogVisible" width="400px">
    <div>
      <div class="share-root"></div>
    </div>
  </el-dialog>
</template>

<script>
// import {socialShare} from 'social-share.js';
export default {
  components: {},
  props: [],
  data() {
    return {
      dialogVisible: false,

    };
  },
  created() {

  },
  mounted() {

  },
  methods: {
    show() {
      this.dialogVisible = true;
      setTimeout(() => {
        let config = {
          sites: ["qq", "weibo", "wechat", "douban"], // 启用的站点
          wechatQrcodeTitle: "微信扫一扫：分享", // 微信二维码提示文字
          wechatQrcodeHelper:
            "<p>微信里点“发现”，扫一下</p><p>二维码便可将本文分享至朋友圈。</p>",
        };
        socialShare(".share-root", config);
      }, 300);
    }
  },
};
</script>

<style scoped lang="less">
</style>
