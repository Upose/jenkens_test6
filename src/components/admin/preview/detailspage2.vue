<!---新闻预览模板-->
<template>
  <div class="admin-warp-page template1">
    <el-container>
      <el-main class="admin-content admin-bg-top" :class="{'content-collapse':$root.collapse}">
        <div class="content search-table-general">
          <div class="list-warp">
            <div class="articledetails-warp">
              <div class="m-width top-title">
                <span class="m-title">{{content_title}}</span>
                <span class="m-address">
                  当前位置：<span>{{content_title}}</span> > 详情
                </span>
              </div><!--顶部面包屑 end -->
              
              <div class="body-content m-width c-l">
                  <div class="left-menu" v-if="is_show_menu">
                    <div class="menu-list">
                      <span class="title">栏目列表</span>
                      <ul>
                        <li class="thover-bg-c1" v-for="(item,index) in menu_list" :class="isActive(item,item.check)">
                          <a href="javascript:;" @click="menuClick(item.name,index,true)">{{item.name}}</a>
                          <ul class="sub-menu" v-if="item.lableList && item.lableList.length>0 && item.check">
                            <li v-for="(it,i) in item.lableList"><a href="javascript:;">{{it.value}}</a></li>
                          </ul>
                        </li>
                      </ul>
                    </div><!--栏目菜单列表 end-->

                  </div>
                  <div class="body-title" :style="{'margin-right':!is_show_menu?'0':'250px'}">
                    <div class="right-content news-img-max-sys">
                      <div class="content-top-title">
                        <span class="title" :style="{color:getTitleClass('color'),fontSize:getTitleClass('font')+'px',fontWeight:getTitleClass('B'),'text-decoration':getTitleClass('U'),'font-style':getTitleClass('I')}">
                          <span class="tag" v-if="power.isShowParentCatalogue && (detailsData.parentCatalogueKV||[]).length>0">
                            【<span class="tag" v-for="(i, index) in (detailsData.parentCatalogueKV||[])" :key="index">{{i.value}}&nbsp;</span>】
                          </span>
                          {{detailsData.title||"标题走丢了"}}
                        </span>
                        <div class="audit-process" v-if="auditProcessList && auditProcessList.length>0 && power.isShowAuditProcess">
                          <span v-for="i in auditProcessList">{{i.name}}:{{i.auditManager}}</span>
                        </div>
                        <div class="news-sub-warp">
                          <span class="name child1_text_color">{{detailsData.publisher||'无'}}</span><!--发布人-->
                          <span v-if="power.isShowPublishDate"><i class="time-icon"></i>{{(detailsData.publishDate||'').slice(0,10)}}</span><!--发布日期-->
                          <!-- <span v-if="power.isShowAuthor">{{detailsData.author}}</span>作者 -->
                          <!-- <span v-if="power.isShowKeywords">{{detailsData.keywords}}</span>关键词 -->
                          <!-- <span v-if="power.isShowExpirationDate">{{(detailsData.expirationDate||'').slice(0,10)}}</span>失效日期 -->
                          <!-- <a v-if="power.isShowJumpLink && detailsData.jumpLink" :href="detailsData.jumpLink">跳转链接</a>跳转链接 -->
                          <span v-if="power.isShowExpendFiled1">{{detailsData.expendFiled1}}</span>
                          <span v-if="power.isShowExpendFiled2">{{detailsData.expendFiled2}}</span>
                          <span v-if="power.isShowExpendFiled3">{{detailsData.expendFiled3}}</span>
                          <span v-if="power.isShowExpendFiled4">{{detailsData.expendFiled4}}</span>
                          <span v-if="power.isShowExpendFiled5">{{detailsData.expendFiled5}}</span>
                          <span v-if="power.isShowHitCount"><i class="number-icon"></i>({{detailsData.hitCount||0}})浏览量</span>
                          <span class="r-share">一键分享</span>
                          <dialogShare ref="dialogShare_ref"></dialogShare>
                        </div>
                      </div>
                      <div class="edit-content" v-html="detailsData.content"></div>
                    </div>
                  </div>
              </div>
            </div>
          </div>
        </div><!---content end--->
        <footerPage class="top20"></footerPage>
      </el-main>
    </el-container>
  </div>
</template>

<script>
import footerPage from "@/components/admin/common/footer";
export default {
  name: 'index',
  created(){
    this.detailsData = JSON.parse(window.localStorage.getItem('news-page-preview')||'{}');
    this.titleStyleKV = this.detailsData['titleStyleKV']||[];
    //是否显示侧边栏目列表
    this.http.getPlain('pront-column-side-type','columnid=' + this.cid).then(res=>{
      this.is_show_menu = res.data||false;
    })
    //获取权限
    this.http.getPlain('column-show-infos','columnid=' + this.cid+'&contentid='+this.id).then(res=>{
      this.power = res.data||{};
    })
  },
  components:{footerPage},
  data () {
    return {
        left_index:0,//左边的菜单
        content_title:'',//内容中的标题
        id:decodeURI(this.$route.query.id||''),//新闻id
        cid:decodeURI(this.$route.query.cid||''),//栏目id
        detailsData:{},//新闻详情
        titleStyleKV:[],
        data:{},
        menu_list:[],
        power:{},//权限
    }
  },
  mounted(){
    this.initData();
  },
  methods:{
    //初始化基础信息
      initData(){
        var _this = this;
        this.http.getPlain('pront-news-column-list-get','columnid='+this.cid).then(res=>{
            _this.menu_list = res.data||[];
            if(_this.menu_list && _this.menu_list.length>0){
              _this.menu_list.forEach((item,i)=>{
                if(item.columnID == _this.cid){
                 setTimeout(() => {
                   _this.menu_list[i]['check'] = false;
                    _this.menuClick(_this.menu_list[i].name,i,false);
                 }, 200);
                }
              })
            }
        }).catch(err=>{
            console.log(err);
        })
      },
      //获取标题样式配置
      getTitleClass(type){
        var class_val = '';
        if(this.titleStyleKV)
        this.titleStyleKV.forEach(item=>{
          if(item.key == type){
            if(type == 'B'){
              class_val = item.value?'blod':'';
            }else if(type == 'U'){
              class_val = item.value?'underline':'';
            }else if(type == 'I'){
              class_val = item.value?'italic':'';
            }else{
              class_val = item.value;
            } 
          }
        })
        return class_val;
      },
      /**一级菜单点击事件
       * 行信息，下标，一级菜单
       */
      menuClick(title,index,is_open){//标题,index下标
        this.content_title = title;
        this.left_index = this.menu_list[index].columnID;
        if(this.menu_list[index]['check']==undefined){
          this.menu_list[index]['check'] = false;
        }else{
          this.menu_list[index]['check'] = !this.menu_list[index]['check'];
        }
        this.menu_list.forEach((item,i)=>{
          if(i != index){
            this.menu_list[i]['check'] = false;
          }
        })
        if(is_open){
          this.$router.push({path:'/web_list2',query:{cid:encodeURI(this.menu_list[index].columnID)}})
        }
        this.$forceUpdate();
      },
      //是否选中状态
      isActive(val,check){
        var cs = '';
        if(val.lableList && val.lableList.length>0){
          cs = 'child-list ';
        }
        if(this.left_index == val.columnID){
          cs = 'active tbg-c1';
          if(val.lableList && val.lableList.length>0 && check==true){
            cs = cs + ' child-list-active-open';
          }else if(val.lableList && val.lableList.length>0 && (check==undefined||check==false)){
            cs = cs+' child-list-active-close';
          }
        }
        return cs;
      },
      detailsClick(val){
        this.$router.push({path:'/web_detailspage2',query:{id:1}})
      },
  },
}
</script>

<style lang="less" scoped>
  @import "../../../assets/web/css/style.less";/**通用文件 */
  @import "../../../assets/web/css/color.less";/**通用文件 */
  @import "../../../assets/web/css/temp2/detailspage.less";
  .admin-content{
    left: 0;
  }
</style>
