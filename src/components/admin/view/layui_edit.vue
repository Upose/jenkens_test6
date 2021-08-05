<template>
  <div class="news-warp-page">
    <textarea id="remark_textarea" style="display: none;"></textarea>
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
    this.$nextTick(function () {
        window.layui.use('layedit', function(){
          let layedit = window.layui.layedit
          layedit.build('remark_textarea',{
              height: 120,//高度
              tool: ['strong', 'italic', 'underline','del','|','link','face']
          });
        })
      })
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
    .footer-page{
       text-align: center;
    }
</style>
