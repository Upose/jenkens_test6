<!--分页-->
<template>
  <div class="paging-page">
    <el-pagination background 
      @size-change="SizeChange"
      @current-change="CurrentChange"
      :current-page="pagedata.pageIndex"
      :page-sizes="pageSizes"
      :page-size="pagedata.pageSize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="pagedata.totalCount">
    </el-pagination>
  </div>
</template>

<script>
export default {
  name: 'pagingPage',
  created(){
  },
  props:['pagedata'],
  data () {
    return {
      pageSizes:[]
    }
  },
  mounted(){
    // 如果每页条数设置小于50 条数下拉选择框增加当前条数
    if(this.pagedata.pageSize < 50){
      this.pageSizes = [10,20,50,100,150,200];
    }else{
      this.pageSizes = [50,100,150,200];
    }
  },
  methods:{
      SizeChange(val) {
        this.$emit('pagechange',{key:'pageSize',value:val})
      },
      CurrentChange(val) {
        this.pagedata.pageIndex = val;
        this.$emit('pagechange',{key:'pageIndex',value:val})
      },
  },
}
</script>

<style lang="less" scoped>
@import "../../../assets/admin/css/color.less";
@import "../../../assets/admin/css/style.less";
.paging-page{
  padding-top: 20px;
  text-align: right;
  /deep/ .el-pagination.is-background .el-pager li:not(.disabled).active{
    background-color:@m-col-b7;
  }
  /deep/ .el-pagination.is-background .el-pager li:not(.disabled):hover{
    color:@m-col-b5;
  }
}
</style>
