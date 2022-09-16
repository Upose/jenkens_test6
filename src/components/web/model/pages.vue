<!-- 分页 -->
<template>
  <div class="page-warp">
    <button class="thover-bg-c1" @click="first()">首页</button>
    <button class="thover-bg-c1" @click="pre()">上一页</button>
    <button class="thover-bg-c1" v-for="index in pageList" :key="index" :class="PageIndex==(start_number+index)?'main_bg thover-bg-c1':'thover-bg-c1'" @click="current(start_number+index)">{{start_number+index}}</button>
    <button class="thover-bg-c1" @click="next()">下一页</button>
    <button class="thover-bg-c1" @click="last()">末页</button>
    <button>共{{total}}页 {{totalCount}}条</button>
  </div>
  <!--分页 end-->
</template>

<script>
export default {
  name: 'mine',
  props: ['total', 'Cindex', 'totalCount'],//total:总页码；Cindex:当前页码
  mounted() {
    this.pageList = this.total < 5 ? this.total : 5;
  },
  watch: {
    total(newVal, oldVal) {
      this.pageList =newVal < 5 ? newVal : 5;
    },
    PageIndex() {
      if (this.total > 5 && this.PageIndex >= 3 && this.PageIndex < this.total - 3) {
        this.start_number = this.PageIndex - 3;
      } else if (this.total > 5 && this.PageIndex > this.total - 3) {
        this.start_number = this.total - 5;
      }else{
        this.start_number = 0;
      }
    }
  },
  data() {
    return {
      PageIndex: this.Cindex,//当前页码
      // totalpage: this.total,//总页码
      pageList: 5,//中间需要展示的页面数量
      start_number: 0,//循环的页码数量，从多少开始-主要用于中间的页码范围
    }
  },
  methods: {
    first() {//首页
      if (this.PageIndex == 1) {
        alert('已经是第一页');
      } else {
        this.start_number = 0;
        this.PageIndex = 1;
        this.$emit('currentClick', this.PageIndex);
      }
    },
    pre() {//上一页
      if (this.Cindex == 1) {
        alert('已经是第一页');
      } else {
        this.PageIndex = this.PageIndex - 1;
        this.$emit('currentClick', this.PageIndex);
      }
    },
    next() {//下一页
      if (this.PageIndex == this.total) {
        alert('已经是最后一页');
      } else {
        this.PageIndex = this.PageIndex + 1;
        this.$emit('currentClick', this.PageIndex);
        // if (this.PageIndex < this.total) {
        //   this.start_number = this.PageIndex - 1;
        // }
      }
    },
    current(n) {//当前页码
      this.PageIndex = n;
      this.$emit('currentClick', n);
    },
    last() {//最后一页
      if (this.PageIndex == this.total) {
        alert('已经是最后一页');
      } else {
        if (this.total > 5) {
          this.start_number = this.total - 5;
        }
        this.PageIndex = this.total;
        this.$emit('currentClick', this.total);
      }
    },
  },
}
</script>

<style scoped lang="less">
@import "../../../assets/web/css/color.less"; /**通用文件 */
/**分页 */

.page-warp {
  margin-top: 30px;
  text-align: right;
  .active {
    color: @m-col-b0;
  }
  button {
    font-size: 14px;
    border: 1px solid @ph-col-n8;
    padding: 0 5px;
    height: 30px;
    outline: none;
    background: @m-col-b0;
    vertical-align: middle;
    margin-right: 8px;
  }
  .thover-bg-c1 {
    cursor: pointer;
    &:hover {
      color: @m-col-b0;
      border: 1px solid @m-col-b0;
    }
  }
}
</style>

