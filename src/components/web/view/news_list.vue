<!--此页面本打算做详情统一页面，然后在此页面做模板的区分页面，但目前还未采用此方法，待思考-->
<template>
    <div class="details-warp">
        <div class="temp-loading" v-if="request_of"></div><!--加载中-->
        <div class="web-empty-data" v-if="!request_of && template_num==0" :style="{background: 'url('+fileUrl+'/public/image/data-empty.png) no-repeat center'}" ></div><!--暂无数据-->
        <list1 v-if="template_num==1"></list1>
        <list2 v-if="template_num==2"></list2>
    </div>
</template>

<script>
import list1 from './temp1/list';
import list2 from './temp2/list';
export default {
    components: {list1,list2},
    watch:{
        '$route':'getId'
    },
    props: {},
    data() {
        return {
            template_num:0,
            request_of:true,//请求中
            fileUrl: window.localStorage.getItem('fileUrl'),//图片地址前缀
            cid:decodeURI(this.$route.query.cid||''),
        };
    },
    created() {
        this.initData();
    },
    mounted() {
        
    },
    methods: {
        initData(){
            this.http.getPlain('pront-column-link-info','columnid='+this.cid).then(res=>{
                this.request_of = false;
                if(res.data){
                    this.template_num = res.data.template||0;
                }
            }).catch(err=>{this.request_of = false;})
        },
        getId(){
            this.cid = this.$route.query.cid;
            this.initData();
            this.$forceUpdate();
        },
    },
};
</script>

<style scoped lang="less">
    .details-warp{
        min-height: 500px;
    }
</style>
