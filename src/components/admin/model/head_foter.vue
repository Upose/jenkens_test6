<!--头部底部模板选择-->
<template>
  <div class="tag-box">
    <el-dialog append-to-body title="选择头部和底部模板" :visible.sync="dialogBulk" width="600px" :close-on-click-modal="false" :before-close="handleClose">
        <el-form label-width="70px" class="admin-form">
            <div class="form-content">
            <el-form-item label="头部模板" prop="defaultTemplate">
                <div class="temp-select c-l">
                    <div class="d-temp-box" :style="{background:'url('+it.previewPic+')'}" v-for="(it,i) in head_list" :key="i+'a'">
                        <span class="temp-name">{{it.name}}</span>
                        <el-button type="primary" class="button" size="mini" @click="headerClick(it)"><i class="iconfont" :class="it.id==head_check?'vip-check':'vip-no-check'"></i> {{it.id==head_check?'已选':'选择'}}</el-button>
                    </div>
                </div>
            </el-form-item>

            <el-form-item label="底部模板" prop="defaultTemplate">
                <div class="temp-select c-l">
                    <div class="d-temp-box" :style="{background:'url('+it.previewPic+')'}" v-for="(it,i) in footer_list" :key="i+'a'">
                        <span class="temp-name">{{it.name}}</span>
                        <el-button type="primary" class="button" size="mini" @click="footerClick(it)"><i class="iconfont" :class="it.id==footer_check?'vip-check':'vip-no-check'"></i> {{it.id==footer_check?'已选':'选择'}}</el-button>
                    </div>
                </div>
            </el-form-item>
            <el-form-item class="m-center">
                <el-button icon="el-icon-check" size="medium" type="primary" @click="submitForm(2)">更改头部模板</el-button>
            </el-form-item>
            </div>
        </el-form>
    </el-dialog>
  </div>
</template>


<script>

export default {
  name: 'index',
  props:['dataList'],
  data() {
    return {
        dialogBulk:true,
        head_list:[],
        footer_list:[],
        head_check:'',
        footer_check:'',
        postForm:{},
    }
  },
  mounted() {
    this.http.getPlain('news-body-template-get-by-type',`type=2`).then(res=>{
        this.head_list = res.data||[];
    }).catch(err=>{
        this.$message({type: 'error',message: '获取失败!'});
    })
    this.http.getPlain('news-body-template-get-by-type',`type=3`).then(res=>{
        this.footer_list = res.data||[];
    }).catch(err=>{
        this.$message({type: 'error',message: '获取失败!'});
    })
    if(this.dataList){
        this.head_check=this.dataList.head;
        this.footer_check=this.dataList.foot;
    }

  },
  methods: {
    /****保存按钮*******/
    submitForm(){
        console.log(111);
        this.$emit('setHeadFoot',{head:this.head_check,foot:this.footer_check});
        this.$emit('hfHide',{head:this.head_check,foot:this.footer_check});
    },
    setDetail(val){
        this.head_check=val.head;
        this.footer_check=val.foot;
    },

    //模板选择
    headerClick(val){
        console.log(val);
        this.head_check = val.id;
        var list = {
            "id": val.id,
            "name": val.name,
            "type": 2,
            "note": val.note,
            "previewPic": val.previewPic
        }
        this.postForm.header = list;
    },
    //模板选择
    footerClick(val){
        this.footer_check = val.id
        var list = {
            "id": val.id,
            "name": val.name,
            "type": 2,
            "note": val.note,
            "previewPic": val.previewPic
        }
        this.postForm.footer = list;
    },
    /****取消按钮*******/
    closeClick(){
        this.$emit('hfHide');
    },
    /***x关闭按钮 **/
    handleClose(done){
        this.$emit('hfHide');
    },
  },
}
</script>

<style lang="less" scoped>
@import "../../../assets/admin/css/color.less";/**颜色配置 */
@import "../../../assets/admin/css/style.less";
@import "../../../assets/admin/css/form.less";
.admin-form .form-content{
    padding: 0 !important;
    .temp-select{
        padding: 10px 10px;
        .d-temp-box{
            margin:10px;
        }
    }
    .m-center{
        text-align: right;
    }
}
</style>





