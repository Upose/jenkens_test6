<!---新闻预览模板-->
<template>
  <div class="admin-warp-page template1">
    <el-container>
      <!-- <el-aside width="auto" :collapse="$root.collapse" :class="$root.collapse?'fold-menu':''"><serviceLMenu :isActive="1"></serviceLMenu></el-aside> -->
      <el-main class="admin-content admin-bg-top" :class="{'content-collapse':$root.collapse}">
        <div class="content search-table-general">
          <div class="list-warp">
    <div class="articledetails-warp">
     <div class="body-content m-width c-l" :class="!is_show_menu?'body-content-clear':''">
        <div class="left-menu" v-if="is_show_menu">
          <div class="menu-top child_bg">{{content_title}}</div>
          <div class="menu-list">
            <ul>
              <li class="child_color_hover" v-for="(item,index) in menu_list" :class="isActive(item,item.check)">
                <a href="javascript:;" @click="menuClick(item.name,index,true)">{{item.name}}</a>
                <ul class="sub-menu" v-if="item.lableList && item.lableList.length>0 && item.check">
                  <li v-for="(it,i) in item.lableList"><a href="javascript:;">{{it.value}}</a></li>
                </ul>
              </li>
            </ul>
          </div>
        </div>
        <div class="body-title" :style="{'margin-left':!is_show_menu?'0':'250px'}">
          <div class="menu-top child_bg">当前位置：{{content_title}} > 详情</div>
          <div class="right-content">
              <div class="news-content-warp news-img-max-sys">
                <h1 :style="{color:getTitleClass('color'),fontSize:getTitleClass('font')+'px',fontWeight:getTitleClass('B'),'text-decoration':getTitleClass('U'),'font-style':getTitleClass('I')}">
                  <span class="tag" v-if="data.isShowParentCatalogue && (detailsData.parentCatalogueKV||[]).length>0">
                    【<span class="tag" v-for="i in (detailsData.parentCatalogueKV||[])" :key="i.key">{{i.value}}&nbsp;</span>】
                  </span>
                  {{detailsData.title||"标题走丢了"}}
                </h1>
                <div class="details_content">
                  <div class="audit-process" v-if="auditProcessList && auditProcessList.length>0 && data.isShowAuditProcess">
                    <span v-for="(i, index) in auditProcessList" :key="index">{{i.name}}:{{i.auditManager}}</span>
                  </div>
                  <div class="rich-title">
                    <span class="col1"><i class="title">发布人：</i>{{detailsData.publisher||'无'}}</span>
                    <span class="col2" v-if="data.isShowPublishDate"><i class="title">发布时间：</i>{{(detailsData.publishDate||'').slice(0,10)}}</span>
                    <span class="col3" v-if="data.isShowHitCount"><i class="title">访问次数：</i>{{detailsData.hitCount||0}}</span>
                    <!-- <span v-if="data.isShowAuthor">作者：{{detailsData.author}}</span>作者 -->
                    <!-- <span v-if="data.isShowKeywords">关键词：{{detailsData.keywords}}</span>关键词 -->
                    <!-- <a v-if="data.isShowJumpLink && detailsData.jumpLink" :href="detailsData.jumpLink">跳转链接</a>跳转链接 -->
                    <!-- <span v-if="data.isShowExpirationDate">失效日期：{{(detailsData.expirationDate||'').slice(0,10)}}</span>失效日期 -->
                    <span v-if="data.isShowExpendFiled1">{{detailsData.expendFiled1}}</span>
                    <span v-if="data.isShowExpendFiled2">{{detailsData.expendFiled2}}</span>
                    <span v-if="data.isShowExpendFiled3">{{detailsData.expendFiled3}}</span>
                    <span v-if="data.isShowExpendFiled4">{{detailsData.expendFiled4}}</span>
                    <span v-if="data.isShowExpendFiled5">{{detailsData.expendFiled5}}</span>
                  </div>
                  <div class="rich-text" v-html="detailsData.content"></div>
                </div>
                <!-- <div class="comment">
                  <div class="row-score">
                    <span class="title">是否对您有用：</span>
                    <my_rate :score.sync="curScore"></my_rate>
                  </div>
                  <div class="c-text">
                    <div class="title">
                      <span>发 表 评 论：</span>
                      <span>（请 先 登 录）</span>
                    </div>
                    <textarea class="textarea" :disabled="disabled"></textarea>
                  </div>
                  <div class="btns">
                    <button class="btn main_bg fff">保 存</button>
                    <button class="btn b-clear">清 空</button>
                  </div>
                </div>
                <div class="write-a-review">
                  <div class="title"><span class="child_text_color child_border_bottom">评论数</span>（3）</div>
                  <div class="row" v-for="i in 3">
                    <div class="r-top">
                      <img src="@/assets/web/img/default.jpg" class="u-img">
                      <span class="text">
                        <span class="name">张老师</span>
                        <span class="time">2018年12月14日  20:18:25</span>
                      </span>
                    </div>
                    <div class="r-bottom">
                      ASC数据库收录16,700多种期刊的摘要；8,500多种全文期刊，其中7,300多种为同行评审(peer-reviewed)，还包括800多种非期刊类全文出版物(如书籍, 报告及会议论文等)。主题包括生物科学、工程技术、社会科学、心理学、教育、法律、医学、语言学、人文、信息科技、通讯传播、公共管理、历史学、计算机科学、军事、文化、健康卫生医疗、宗教与神学、艺术、视觉传达、表演、哲学、各国文学等等。
                    </div>
                  </div>
                  <div class="more">查看更多</div>
                </div> -->
              </div>
          </div><!--文章详情页面 end -->
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
import my_rate from "../../web/model/rate";
import footerPage from "@/components/admin/common/footer";
export default {
  name: 'index',
  components:{my_rate,footerPage},
  created(){
    this.detailsData = JSON.parse(window.localStorage.getItem('news-page-preview')||'{}');
    this.titleStyleKV = this.detailsData['titleStyleKV']||[];
    this.http.getPlain('pront-column-side-type','columnid=' + this.cid).then(res=>{
      this.is_show_menu = res.data||false;
    })
  },
  data () {
    return {
        left_index:0,//左边的菜单
        content_title:'',//内容中的标题
        id:decodeURI(this.$route.query.id||''),//新闻id
        cid:decodeURI(this.$route.query.cid||''),//栏目id
        detailsData:{},//新闻详情
        curScore:2,//评论分数
        data:{},
        titleStyleKV:[],
        menu_list:[],
        is_show_menu:false,
    }
  },
  mounted(){
    this.initData();
  },
  methods:{
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
       getTitleClass(type){
        var class_val = '';
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
          this.$router.push({path:'/web_list1',query:{cid:encodeURI(this.menu_list[index].columnID)}})
        }
        this.$forceUpdate();
      },
      isActive(val,check){
        var cs = '';
        if(val.lableList && val.lableList.length>0){
          cs = 'child-list ';
        }
        if(this.left_index == val.columnID){
          cs = 'active child_bg';
          if(val.lableList && val.lableList.length>0 && check==true){
            cs = cs + ' child-list-active-open';
          }else if(val.lableList && val.lableList.length>0 && (check==undefined||check==false)){
            cs = cs+' child-list-active-close';
          }
        }
        return cs;
      },
      detailsClick(val){
        // this.$router.push({path:'/web_detailspage1',query:{id:val}})
      },
  },
}
</script>

<style lang="less" scoped>
  @import "../../../assets/web/css/style.less";/**通用文件 */
  @import "../../../assets/web/css/color.less";/**通用文件 */
  @import "../../web/view/temp1/detailspage.less";
  .admin-content{
    left: 0;
  }
</style>