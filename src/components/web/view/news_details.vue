<!--此页面本打算做详情统一页面，然后在此页面做模板的区分页面，但目前还未采用此方法，待思考-->
<template>
    <div class="details-warp">
        <div class="temp-loading" v-if="request_of"></div><!--加载中-->
        <div class="web-empty-data" v-if="!request_of && template_num==0" :style="{background: 'url('+fileUrl+'/public/image/data-empty.png) no-repeat center'}" ></div><!--暂无数据-->
        <detailspage1 v-if="template==1"></detailspage1>
        <detailspage2 v-if="template==2"></detailspage2>
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
            template:2,
            request_of:true,//请求中
            fileUrl: window.localStorage.getItem('fileUrl'),//图片地址前缀
            cid:decodeURI(this.$route.query.cid||''),//栏目id
        };
    },
    created() {
        this.http.getPlain('pront-column-link-info','columnid='+this.cid).then(res=>{
            this.request_of = false;
            if(res.data){
                this.template_num = res.data.template||0;
            }
        }).catch(err=>{this.request_of = false;})
    },
    mounted() {},
    methods: {
        
    },
};
</script>

<style scoped lang="less">
    .details-warp{
        min-height: 500px;
    }
</style>
