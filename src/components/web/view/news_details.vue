<!--此页面本打算做详情统一页面，然后在此页面做模板的区分页面，但目前还未采用此方法，待思考-->
<template>
    <div>
        <detailspage1 v-if="details_template==2"></detailspage1>
        <detailspage2 v-if="details_template==4"></detailspage2>
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
            details_template:2,
            id:decodeURI(this.$route.query.id||''),//新闻id
            c_id:decodeURI(this.$route.query.c_id||''),//栏目id
        };
    },
    created() {
        // this.http.getPlain('pront-news-column-list-get','columnid='+this.c_id).then(res=>{

        // }).catch(err=>{

        // })
    },
    mounted() {},
    methods: {
        
    },
};
</script>

<style scoped lang="less">

</style>
