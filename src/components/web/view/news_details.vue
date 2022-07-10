<!--根据参数选择某个详情页-->
<template>
    <div class="details-warp">
        <div class="temp-loading" v-if="request_of"></div><!--加载中-->
        <div class="web-empty-data" v-if="!request_of && template_num==0" :style="{background: 'url('+fileUrl+'/public/image/data-empty.png) no-repeat center'}" ></div><!--暂无数据-->
        
        <detailspage1 v-if="template_num==1"></detailspage1><!--模板一（2.2新闻模板）-->
        <detailspage2 v-if="template_num==2"></detailspage2><!--模板二（外包设计）-->
    </div>
</template>

<script>
import detailspage1 from './temp1/detailspage';
import detailspage2 from './temp2/detailspage';
export default {
    components: {detailspage1,detailspage2},
    props: {},
    data() {
        return {
            template_num:0,
            request_of:true,//请求中
            fileUrl: window.localStorage.getItem('fileUrl'),//图片地址前缀
            cid:decodeURI(this.$route.query.cid||''),//栏目id
        };
    },
    created() {
        this.initData();
    },
    mounted() {},
    methods: {
        //根据栏目id获取模板信息
        initData(){
            this.http.getPlain('pront-column-link-info','columnid='+this.cid).then(res=>{
                if(res.data){
                    this.template_num = res.data.template||0;
                }
                this.request_of = false;
            }).catch(err=>{this.request_of = false;})
        },
    },
};
</script>

<style scoped lang="less">
    .details-warp{
        min-height: 500px;
    }
</style>
