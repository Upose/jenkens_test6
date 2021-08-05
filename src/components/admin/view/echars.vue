<template>
  <div class="news-warp-page">
    <div id="echar_line" style="width: 600px;height:400px;"></div>
  </div>
</template>

<script>
import http from "@/assets/public/js/http";
import echarsjson from '@/assets/admin/echarts/echarsjson';

  // 引入 ECharts 主模块
  var echarts = require("echarts/lib/echarts");
  // 引入柱状图
  require("echarts/lib/chart/bar");
  require("echarts/lib/chart/line");
  require("echarts/lib/chart/pie");
  require("echarts/lib/component/title");
  require("echarts/lib/component/legend");
  require("echarts/lib/component/tooltip");
  import 'echarts/lib/component/grid';
  import { GridComponent } from 'echarts/components';
  echarts.use([GridComponent]);
export default {
  name: 'footerPage',
  created(){},
  data () {
    return {
      
    }
  },
  mounted(){
    this.echar_line = echarts.init(document.getElementById("echar_line"));
    setTimeout(() => {
        this.init();
      }, 1000);
      window.addEventListener("resize", this.renderChart);
  },
  methods:{
      init(){
          this.echar_line.setOption(echarsjson.option1({}));
      },
      handleListener() {
        bus.$on("collapse", this.handleBus);
        // 调用renderChart方法对图表进行重新渲染
        window.addEventListener("resize", this.renderChart);
      },
      handleBus(msg) {
        setTimeout(() => {
          this.renderChart();
        }, 300);
      },
      renderChart() {
        this.echar_line.resize();
      },
  },
}
</script>

<style lang="less" scoped>

</style>
