<!--分页-->
<template>
  <div class="paging-page">
    <!--<el-pagination background layout="total,prev, pager, next" :total="100"></el-pagination>-->
    <el-pagination background 
      @size-change="SizeChange"
      @current-change="CurrentChange"
      :current-page="currentPage"
      :page-sizes="[50, 200, 300, 400]"
      :page-size="50"
      layout="total, sizes, prev, pager, next, jumper"
      :total="100">
    </el-pagination>
  </div>
</template>

<script>
import http from "@/assets/public/js/http";
export default {
  name: 'pagingPage',
  created(){
  },
  props:['cuMenu','fontColor'],
  data () {
    return {
      currentPage:1,//当前页
    }
  },
  mounted(){
    //   this.initData();
  },
  methods:{
      initData(){
        http.getPlain('AssetNewest','PlateId=109&PageSize=9&PageIndex=1').then(res=>{ //学生专区
            this.list1 = res.result.dtos||[];
        }).catch(err=>{
            console.log(err);
        })
      },
      SizeChange(val) {
        console.log(`每页 ${val} 条`);
      },
      CurrentChange(val) {
        console.log(`当前页: ${val}`);
      },
  },
}
</script>

<style lang="less" scoped>
@import "../../../assets/admin/css/color.less";/**颜色配置 */
@import "../../../assets/admin/css/style.less";/**颜色配置 */
.paging-page{
  padding-top: 20px;
  text-align: right;
  /deep/ .el-pagination.is-background .el-pager li:not(.disabled).active{
    background-color:@6777EF;
  }
  /deep/ .el-pagination.is-background .el-pager li:not(.disabled):hover{
    color:@9CADFF;
  }
}
</style>
