<!--步骤进度条-->
<template>
  <div class="steps-page c-l">
    <div class="step" :class="isActive(index+1)" v-for="(it,index) in countNum" :key="index" :style="{width:(100/countNum.length)+'%'}">
        <span class="title">{{it.title||''}}</span>
        <span class="icon" v-if="(index+1) != cuStep">{{index+1}}</span>
        <span class="el-icon-success his" v-if="(index+1) < cuStep"></span>
        <span class="el-icon-alarm-clock cu" v-if="(index+1) == cuStep"></span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'stepsPage',
  props:['countNum','cuStep'],//countNum 总步骤;cuStep 当前步骤
  created(){
    //   console.log(this.countNum,this.cuStep);
  },
  data () {
    return {
      
    }
  },
  mounted(){
    //   this.initData();
  },
  methods:{
      initData(){
        this.http.getPlain('AssetNewest','PlateId=109&PageSize=9&PageIndex=1').then(res=>{ //学生专区
            this.list1 = res.result.dtos||[];
        }).catch(err=>{
            console.log(err);
        })
      },
      isActive(index){
          if(index < this.cuStep){ //已完成之前
            if(index == (this.cuStep-1)){ //当前步骤-前一步
                console.log(index);
                return 'step-r-border';
            }else{
                return 'over';
            }
          }else if(index == this.cuStep){ //当前完成
            return 'cu-step-over';
          }else if(index <= this.cuStep+1){//当前步骤的下一步
              return 'cu-step';
          }else{//未完成
              return 'non-border'
          }
      },
  },
}
</script>

<style lang="less" scoped>
@import "../../../assets/admin/css/color.less";/**颜色配置 */
@import "../../../assets/admin/css/style.less";/**颜色配置 */
.steps-page{
    width: 100%;
    height: 50px;
    .step{
        float: left;
        color: @34395E;
        font-size: 14px;
        text-align: center;
        position: relative;
    }
    /***完成 */
    .over{
        &::after{
            position: absolute;
            content: '';
            height: 1px;
            left: 0;
            top:38px;
            right: 0;
            z-index: 1;
            border-top: 1px dotted #8CC63F;
        }
    }
    .step-r-border{
        &::before{
            position: absolute;
            content: '';
            height: 1px;
            top:38px;
            left: 0;
            right: 50%;
            z-index: 1;
            border-top: 1px dotted #8CC63F;
        }
        &::after{
            position: absolute;
            content: '';
            height: 1px;
            top:38px;
            left: 50%;
            right:0;
            z-index: 1;
            border-top: 1px dotted #6777EF;
        }
    }
    .cu-step-over{
        &::before{
            position: absolute;
            content: '';
            height: 1px;
            top:38px;
            left: 0;
            right: 50%;
            z-index: 1;
            border-top: 1px dotted #6777EF;
        }
        &::after{
            position: absolute;
            content: '';
            height: 1px;
            top:38px;
            left: 50%;
            right:0;
            z-index: 1;
            border-top: 1px dotted #6777EF;
        }
    }
    .cu-step{
        &::before{
            position: absolute;
            content: '';
            height: 1px;
            top:38px;
            left: 0;
            right: 50%;
            z-index: 1;
            border-top: 1px dotted #6777EF;
        }
        &::after{
            position: absolute;
            content: '';
            height: 1px;
            top:38px;
            left: 50%;
            right:0;
            z-index: 1;
            border-top: 1px solid #E5E7E7;
        }
    }
    /***半边线 */
    .non-border{
        &::before{
            position: absolute;
            content: '';
            height: 1px;
            top:38px;
            left: 0;
            right: 50%;
            z-index: 1;
            border-top: 1px solid #E5E7E7;
        }
        &::after{
            position: absolute;
            content: '';
            height: 1px;
            top:38px;
            left: 50%;
            right:0;
            z-index: 1;
            border-top: 1px solid #E5E7E7;
        }
    }
    span{
        display: block;
        margin-left: auto;
        margin-right: auto;
    }
    .icon{
        margin-top:5px;
        background-color: @ABABAB;
        width: 20px;
        height: 20px;
        color: @fff;
        line-height: 20px;
        text-align: center;
        border-radius: 50%;
        z-index: 2;
        position: absolute;
        left: 50%;
        margin-left: -10px;
    }
    .his,.cu{
        margin-top:5px;
        font-size: 22px;
        color: @6777EF;
        background: @fff;
        border-radius: 50%;
        z-index: 2;
        position: absolute;
        left: 50%;
        margin-left: -10px;
    }
    .his{
        color: @8CC63F;
    }
}
</style>
