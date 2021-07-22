<!-- 分页 -->
<template>
    <div class="pages">
        <span class="total">共{{total}}页&nbsp;</span>
        <span class="page">
            <Debounce !isDebounce><a href="javascript:void(0);" @click="first()" title="首页">&lt;&lt;</a>&nbsp;</Debounce>
            <Debounce !isDebounce><a href="javascript:void(0);" @click="pre()" title="上一页">&lt;</a></Debounce>
            <span class="page_num">
                <a href="javascript:void(0);" v-for="index in pageList" :class="PageIndex==(start_number+index)?'active':''"><Debounce !isDebounce><span @click="current(start_number+index)">{{start_number+index}}</span></Debounce></a>
            </span>
            <Debounce !isDebounce><a href="javascript:void(0);" @click="next()" title="下一页">&gt;</a>&nbsp;</Debounce>
            <Debounce !isDebounce><a href="javascript:void(0);" @click="last()" title="末页">&gt;&gt;</a></Debounce>
        </span>
        <input type="hidden" id="hidPageCount" value="3">
    </div>
</template>

<script>
export default {
  name: 'mine',
  props:['total','Cindex'],//total:总页码；Cindex:当前页码
  mounted(){
    console.log(this.total);
    console.log(this.Cindex);
  },
  watch: {
    'total': function(newVal,oldVal){
        if(newVal<=5){
            this.pageList = newVal;
        }
    }
  },
  data () {
    return {
        PageIndex:this.Cindex,//当前页码
        totalpage:this.total,//总页码
        pageList:5,//中间需要展示的页面数量
        start_number:0,//循环的页码数量，从多少开始-主要用于中间的页码范围
    }
  },
  methods: {
    first(){//首页
        if(this.PageIndex == 1){
           alert('已经是第一页'); 
        }else{
            this.start_number = 0;
            this.PageIndex = 1;
            this.$emit('currentClick',this.PageIndex);
        }
    },
    pre(){//上一页
        if(this.Cindex == 1){
            alert('已经是第一页');
        }else{
            this.PageIndex = this.PageIndex-1;
            this.$emit('currentClick',this.PageIndex);
            
        }
    },
    next(){//下一页
        if(this.PageIndex == this.total){
            alert('已经是最后一页');
        }else{
            this.PageIndex = this.PageIndex+1;
            this.$emit('currentClick',this.PageIndex);
            if(this.PageIndex<(this.total-5)){
                this.start_number = this.PageIndex-1;
            }
        }
    },
    current(n){//当前页码
        this.PageIndex = n;
        this.$emit('currentClick',n);
    },
    last(){//最后一页
        if(this.PageIndex == this.total){
           alert('已经是最后一页'); 
        }else{
            if(this.total>5){
                this.start_number = this.total-5;
            }
            this.PageIndex = this.total;
            this.$emit('currentClick',this.total);
        }
    },
  },
}
</script>

<style scoped lang="less">
@import "../assets/css/color.less";/**通用文件 */
/**分页 */
.pages{
    padding:20px 10px;
    text-align: right;
    .active{
        color:#fff;
        background: #a21e1e;
        border: 1px solid #a21e1e;
    }
}

.page a {
    float: none;
    margin-left: -1px;
    padding: 4px 7px;
    font-family: Comic Sans MS;
    font-size: 12px;
    line-height: 16px;
    text-align: center;
    color: #333;
    background: #fff;
    border: 1px solid #adadad;
    cursor: pointer;
    text-align: center;
    &:hover{
        background: #eaeaea;
    }
}
.page .page_num{
    a{
        padding: 4px 0;
        font-family:initial;
        &:hover{
            color: #fff;
            background: #a21e1e;
            border: 1px solid #a21e1e;
        }
    }
    span{
        display: inline-block;
        padding: 4px 10px;
    }
}
</style>

