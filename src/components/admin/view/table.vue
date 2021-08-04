<template>
  <div class="news-warp-page">
    <el-row>
        <el-button>默认按钮</el-button>
        <el-button type="primary">主要按钮</el-button>
        <el-button type="success">成功按钮</el-button>
        <el-button type="info">信息按钮</el-button>
        <el-button type="warning">警告按钮</el-button>
        <el-button type="danger">危险按钮</el-button>
    </el-row>
  </div>
</template>

<script>
import http from "@/assets/public/js/http";
export default {
  name: 'footerPage',
  created(){},
  data () {
    return {
      
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
  },
}
</script>

<style lang="less" scoped>

</style>
