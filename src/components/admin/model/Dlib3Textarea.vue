<template>
  <div class="item-textarea" :class="{ 'no-maxlength': !maxlength }">
    <el-input :placeholder="placeholderText ? placeholderText : '请输入'" v-model="info" type="textarea"
      :rows="rows ? rows : 5" :resize="resize ? resize : 'vertical'" class="w500" :maxlength="maxlength" show-word-limit
      @mouseenter.native="enterTextClear" @mouseleave.native="leaveTextClear" @input="inputTextClear"
      @blur="leaveTextClear" clearable>
    </el-input>
    <i v-show="showTextClear" class="el-icon-circle-close" @mouseenter="enterTextClear" @click="clearText"></i>
  </div>
</template>

<script>
export default {
  components: {},
  props: ["info", "maxlength", "rows", "placeholderText", "resize"],
  data() {
    return {
      showTextClear: false
    };
  },
  created() { },
  mounted() { },
  watch: {
    info: {
      deep: true,
      handler(newValue) {
        this.notifyParentValueChange(newValue);
      }
    }
  },
  methods: {
    //sync 同步props值
    notifyParentValueChange(val) {
      this.info = val;
      this.$emit("update:info", val);
    },
    // textarea输入框
    clearText() {
      this.notifyParentValueChange("");
      this.showTextClear = false;
    },
    inputTextClear() {
      this.notifyParentValueChange(this.info);
      if (this.info) {
        this.showTextClear = true;
      } else {
        this.showTextClear = false;
      }
    },
    enterTextClear() {
      if (this.info) {
        this.showTextClear = true;
      }
    },
    leaveTextClear() {
      this.showTextClear = false;
    }
  }
};
</script>

<style scoped lang="less">
.item-textarea {
  position: relative;

  .el-icon-circle-close {
    background: #fff;
    position: absolute;
    left: 425px;
    height: 20px;
    bottom: 14px;
    line-height: 20px;
    color: #c0c4cc;
    font-size: 15px;
    cursor: pointer;

    &:hover {
      color: #909399;
    }
  }

  &.no-maxlength {
    .el-icon-circle-close {
      left: 470px;
    }
  }
}

// 响应式
@media screen and (max-width: 1440px) {
  .item-textarea {
    .el-icon-circle-close {
      left: 225px;
    }

    &.no-maxlength {
      .el-icon-circle-close {
        left: 270px;
      }
    }
  }
}
</style>
