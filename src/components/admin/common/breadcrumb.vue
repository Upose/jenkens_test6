<!--面包屑-->
<template>
  <div class="breadcrumb-page">
    <el-breadcrumb separator-class="el-icon-arrow-right" :class="fontColor ? 'fff' : 'gray'">
      <a class="el-breadcrumb__item cu-p" aria-current="page" :href="toWorkbench()">
        <span role="link" class="el-breadcrumb__inner"><i class="el-icon-s-home"></i></span>
        <i class="el-breadcrumb__separator el-icon-arrow-right"></i>
      </a>
      <el-breadcrumb-item class="cu-p" v-for="(item, index) in breadcrumbList" :key="index"
        :to="item.path">{{ item.name }}</el-breadcrumb-item>
    </el-breadcrumb>
  </div>
</template>

<script>
export default {
  name: 'breadcrumbPage',
  created() {
  },
  props: ['cuMenu', 'fontColor'],
  data() {
    return {
      breadcrumbList: []
    }
  },
  mounted() {
    this.breadcrumbList = this.$route.meta.title;
    if (this.breadcrumbList.length > 0 && this.breadcrumbList[0].name != this.$store.state.appDetails.appName) {
      this.breadcrumbList.unshift({ name: this.$store.state.appDetails.appName });
    }
  },
  methods: {
    //跳转馆员工作台
    toWorkbench() {
      let urlInfo = JSON.parse(localStorage.getItem('urlInfo'));
      let info = urlInfo.find(item => item.code == 'workbench');
      return this.$setHref({ url: info.path + '/workbench/#/admin_workbench', type: 'full' });
    },
    //针对栏目页面-单独重置栏目面包屑
    setMeta(list) {
      this.breadcrumbList = list.title;
      if (this.breadcrumbList.length > 0 && this.breadcrumbList[0].name != this.$store.state.appDetails.appName) {
        this.breadcrumbList.unshift({ name: this.$store.state.appDetails.appName });
      }
    },
  },
}
</script>

<style lang="less" scoped>
@import "../../../assets/admin/css/color.less";

/**颜色配置 */
.breadcrumb-page {
  color: @ph-col-n12;
  height: 30px;
}

.fff {
  /deep/ .el-breadcrumb__inner {
    color: @m-col-b0 !important;
  }

  /deep/ .el-breadcrumb__separator {
    color: @m-col-b0 !important;
  }
}

.cu-p {
  cursor: pointer;
}
</style>
