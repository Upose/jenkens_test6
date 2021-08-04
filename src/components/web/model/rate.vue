<!--星星评分-->
<template>
  <div class="rate" :class="{'disabled':disabled}">
    <i v-for="i in 5" class="iconfont" @mouseenter="disabled?'':curScore=i" @mouseleave="disabled?'' :curScore=''" @click="disabled?'':setScore(i)" :class="getClass(i)">
        <i v-if="disabled&&i==Math.floor(score)+1" class="iconfont icon-star" :style="'width:'+width"></i>
    </i>
    <span v-if="showText" class="text">{{curScore||score}}分</span>
  </div>
</template>

<script>
  export default {
    name:'MyRate',
    props: {
      score: {
        type: Number,
        default: 0,
      },
      disabled: {
        type: Boolean,
        default: false,
      },
      showText: {
        type: Boolean,
        default: false,
      },
    },
    data() {
      return {
        curScore: '',
        width:'',
      }
    },
    created: function () {
      this.getDecimal();
    },
    methods: {
      getClass(i) {
        if (this.curScore === '') {
          return i <= this.score ? 'icon-star' : 'icon-star-o'
        } else {
          return i <= this.curScore ? 'icon-star' : 'icon-star-o'
        }
      },
      getDecimal() {
        this.width=Number(this.score * 100 - Math.floor(this.score) * 100)+'%';
      },
      setScore(i){
        this.$emit('update:score',i);
      }
    }
  }
</script>

<style lang="less" scope>
    .rate{
        display: inline-block;
        vertical-align: middle;
    }
    .iconfont{
        width: 18px;
        height: 18px;
        display: inline-block;
        font-style: normal;
        background-size: 100% 100%;
        margin-right: 5px;
    }
    .icon-star-o{
        background-image: url(../../../assets/web/img/star.png);
    }
    .icon-star{
        background-image: url(../../../assets/web/img/star-check.png);
    }
</style>
