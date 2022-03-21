<!--此页面本打算做详情统一页面，然后在此页面做模板的区分页面，但目前还未采用此方法，待思考-->
<template>
    <div>
        <list1 v-if="details_template==2"></list1>
        <list2 v-if="details_template==4"></list2>
    </div>
</template>

<script>
import list1 from './temp1/list';
import list2 from './temp2/list';
export default {
    components: {list1,list2},
    props: {},
    data() {
        return {
            details_template:2,
            c_id:decodeURI(this.$route.query.c_id||''),
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
