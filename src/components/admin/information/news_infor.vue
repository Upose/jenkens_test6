<!---新闻发布-具体栏目（新闻列表）-->
<template>
  <div class="admin-warp-page">
    <el-container>
      <el-aside width="auto" :collapse="$root.collapse" :class="$root.collapse?'fold-menu':''"><serviceLMenu :isActive="2"></serviceLMenu></el-aside>
      <el-main class="admin-content pd admin-bg-top" :class="{'content-collapse':$root.collapse}">
        <breadcrumb :cuMenu="'新闻发布'" :fontColor="'fff'" ref="breadcrumb_ref"></breadcrumb><!--面包屑导航--->
        <div class="content search-table-general">
            <div class="search-table-w">
                <h1 class="search-title">{{columnDeatils.columnName||''}}</h1>
                <div class="search-term" v-if="auditStatusCountList.length>0">
                  <div class="col-select" :class="auditStatus_menu==index?'col-select-active':''" v-for="(it,index) in auditStatusCountList" :key="index+'audit'" @click="auditStatus(index,it.auditStatus)"><span>{{it.name||'无'}}</span><span class="number">{{it.counts||0}}</span></div>
                   <!-- <h2 class="m-title" v-if="auditStatusCountList.length>0">
                    <el-button size="medium" v-for="(it,index) in auditStatusCountList" :key="index+'audit'" class="gray-btn" @click="auditStatus(0)">{{it.name||'无'}}({{it.counts||0}})</el-button>
                  </h2> -->
                </div>
            </div><!--顶部查询 end-->
            <div class="table-w">
              <div class="search-table-w">
                  <div class="search-term">
                      <el-input class="width187" v-model="postForm.searchKey" size="medium" placeholder="标题/内容/发布者"></el-input>
                      <el-select class="width136" v-if="isHasCatalogue" v-model="postForm.lableId" size="medium" placeholder="子类">
                          <el-option v-for="item in lableList" :key="item.key" :label="item.value" :value="item.key"></el-option>
                      </el-select>
                      <!-- <el-date-picker class="width187" v-model="postForm.beginCreateTime" format="yyyy-MM-dd" value-format="yyyy-MM-dd" size="medium" type="date" placeholder="创建时间"></el-date-picker>
                      <el-date-picker class="width187" v-model="postForm.endCreateTime" format="yyyy-MM-dd" value-format="yyyy-MM-dd" size="medium" type="date" placeholder="更新时间"></el-date-picker> -->
                      <el-date-picker v-model="beginCreateTime" type="daterange" range-separator="至" value-format="yyyy-MM-dd" start-placeholder="创建开始日期" end-placeholder="创建结束日期" size="medium"></el-date-picker>
                      <el-date-picker v-model="endCreateTime" type="daterange" range-separator="至" value-format="yyyy-MM-dd" start-placeholder="更新开始日期" end-placeholder="更新结束日期" size="medium"></el-date-picker>
                      <el-button type="primary" size="medium" icon="el-icon-search" @click="searchClick()">查找</el-button>
                      <div class="r-btn">
                        <el-button type="primary" size="medium" @click="newsAdd()" v-if="columnDeatils.hasPermission">新增新闻</el-button>
                        <el-button size="medium" class="gray-btn" @click="allOut()" v-if="columnDeatils.hasPermission">批量下架</el-button>
                        <el-button size="medium" class="gray-btn" @click="allDel()" v-if="columnDeatils.hasPermission">批量删除</el-button>
                      </div>
                  </div>
                </div><!--顶部查询 end-->
                <div class="t-p">
                    <el-table stripe :data="tableData" v-loading="loading" ref="singleTable" @selection-change="handleSelectionApp" border class="admin-table">
                        <el-table-column type="selection" width="50"></el-table-column>
                        <el-table-column prop="indexNum" label="序号" align="center" width="58"></el-table-column>
                        <el-table-column prop="content" label="排序" align="center" width="85">
                          <template slot="header" slot-scope="scope">
                            <div>
                              <span>排序</span>
                              <el-popover placement="top-start" width="300" trigger="click">
                                <div>
                                  <div>提供两种排序方法：</div>
                                  <div>1.按住按钮可直接拖动记录的位置；</div>
                                  <div>2.点击按钮，在对话框输入新的位置编号。</div>
                                </div>
                                <i slot="reference" class="el-icon-question" style="cursor: pointer;"></i>
                              </el-popover>
                            </div>
                          </template>
                          <template slot-scope="scope">
                            <el-button @click="handleSort(scope.row)" type="text" size="mini" icon="iconfont el-icon-vip-paixu" class="handleSort" round>排序</el-button>
                          </template>
                        </el-table-column>
                        <el-table-column prop="title" label="新闻标题" min-width="150px">
                          <template slot-scope="scope">
                            <span class="news-title" :title="scope.row.title" @click="handleEdit(scope.row)">{{scope.row.title}}</span>
                          </template>
                        </el-table-column>
                        <el-table-column prop="parentCatalogue" label="标签" v-if="isHasCatalogue">
                           <template slot-scope="scope">
                            <span v-for="(item,index) in (scope.row.parentCatalogue||[])" :key="index">{{item.value}},</span>
                          </template>
                        </el-table-column>
                        <el-table-column prop="aduitStatusName" label="状态" align="center" width="80">
                          <template slot-scope="scope">
                            <span>{{scope.row.aduitStatusName}}</span>
                          </template>
                        </el-table-column>
                        <!-- <el-table-column prop="aduitStatusName" label="显示状态" align="center" width="80">
                          <template slot-scope="scope">
                            <span :class="scope.row.status==1?'color-blue':'color-red'">{{scope.row.status==1?'上架':'下架'}}</span>
                          </template>
                        </el-table-column> -->
                        <!-- <el-table-column prop="aduitStatusName" label="审核状态" align="center" width="80">
                          <template slot-scope="scope">
                            <span :class="scope.row.aduitStatus==8?'color-blue':'color-red'">{{scope.row.aduitStatusName}}</span>
                          </template>
                        </el-table-column> -->
                        <el-table-column prop="publisher" label="发布者" align="center" width="100"></el-table-column>
                        <el-table-column prop="createdTime" label="创建时间" align="center" width="100">
                          <template slot-scope="scope">
                            <span>{{(scope.row.createdTime||'0000-00-00').substring(0,10)}} </span>
                          </template>
                        </el-table-column>
                        <el-table-column prop="updateTime" label="更新时间" align="center" width="100">
                          <template slot-scope="scope">
                            <span>{{(scope.row.updateTime||'0000-00-00').substring(0,10)}} </span>
                          </template>
                        </el-table-column>
                        <el-table-column label="操作" fixed="right" align="center" width="310">
                          <template slot-scope="scope">
                            <el-button @click="handleDel(scope.row)" v-if="columnDeatils.hasPermission" type="text" size="mini" icon="iconfont el-icon-vip-shanchu-1" class="operate-red-btn" round>删除</el-button>
                            <el-button @click="previewPage(scope.row.id)" type="text" size="mini" icon="iconfont el-icon-vip-yulan" round>预览</el-button>
                            <el-button @click="handleAudit(scope.row)" type="text" size="mini" icon="iconfont el-icon-vip-pingshen" v-if="(scope.row.aduitStatus !=8 || scope.row.status!=2) && scope.row.nextAuditBottonName" round >
                              {{scope.row.nextAuditBottonName}}
                            </el-button>
                            <el-button @click="handleEdit(scope.row)" type="text" size="mini" icon="iconfont el-icon-vip-bianji" round>编辑</el-button>
                          </template>
                        </el-table-column>
                        <el-table-column prop="content" label="操作记录" align="center" width="85">
                          <template slot-scope="scope">
                            <el-button @click="handleLog(scope.row)" type="text" size="mini">日志</el-button>
                          </template>
                        </el-table-column>
                    </el-table>
                    <paging :pagedata="pageData" @pagechange="pageChange" v-if="pageData.totalCount"></paging>
                </div>
            </div><!--管理页列表 end--->
            <el-dialog append-to-body title="退回备注" :visible.sync="draw_back" width="480px" :close-on-click-modal="false">
              <div class="">
                <el-input type="textarea" v-model="sendBack.sendBackDesc" maxlength="200" minlength="0" show-word-limit rows="8" placeholder="输入备注原因"></el-input>
              </div>
              <span slot="footer" class="dialog-footer">
                  <el-button icon="iconfont el-icon-vip-quxiao" size="medium" @click="draw_back = false">取消</el-button>
                  <el-button icon="iconfont el-icon-vip-baocun1" size="medium" type="primary" @click="sendBackHande">保存</el-button>
              </span>
            </el-dialog>
        </div><!---顶部查询板块 end--->
        <footerPage class="top20"></footerPage>
      </el-main>
    </el-container>
  </div>
</template>
<script>
import paging from "@/components/admin/common/paging";
import footerPage from "@/components/admin/common/footer";
import breadcrumb from "@/components/admin/common/breadcrumb";
import serviceLMenu from "@/components/admin/common/serviceLMenu";
export default {
  name: 'index',
  created(){
    this.bus.$on('collapse', msg => {
      this.$root.collapse = msg;
    })
    //获取栏目详情
    this.http.getPlain_url('news-column-content-manage-get','/'+this.postForm.columnID).then(res=>{
      if(res.data){
        this.lableList = res.data.lableList||[];
        this.isHasCatalogue = res.data.isHasCatalogue;
      }
    }).catch(err=>{
        console.log(err);
    })
    this.getColumndetails();
  },
  watch:{
    '$route':'getId'
  },
  mounted(){
    this.postForm.auditStatus = null;
    this.initData(0);
    this.dragSort();
  },
  components:{footerPage,serviceLMenu,breadcrumb,paging},
  data () {
    return {
      loading:true,
      draw_back:false,//退回弹窗
      auditStatus_menu:0,//菜单
      multipleSelection:[],//选择列表
      pageData: {
        pageIndex: 1,
        pageSize: 50,
      },//分页参数
      isHasCatalogue:false,//是否显示子类
      //列表查询条件
      beginCreateTime:'',
      endCreateTime:'',
      postForm:{
        "columnID": this.$route.query.id||"",//栏目id 左边菜单
        "pageIndex":1,
        "pageSize":50,
        "searchKey": "",
        "lableId": "",
        "auditStatus":null,
      },
      lableList:[],
      auditStatusCountList: [
      //   {
      //   value: '已发布',
      //   label: '1',
      //   number:569,
      // },{
      //   value: '待提交',
      //   label: '2',
      //   number:56,
      // },{
      //   value: '待初审',
      //   label: '3',
      //   number:0,
      // },{
      //   value: '待初校',
      //   label: '4',
      //   number:0,
      // },{
      //   value: '待二审',
      //   label: '5',
      //   number:0,
      // },{
      //   value: '待二校',
      //   label: '6',
      //   number:0,
      // },{
      //   value: '待终审',
      //   label: '7',
      //   number:0,
      // },{
      //   value: '待终校',
      //   label: '8',
      //   number:0,
      // },{
      //   value: '待发布',
      //   label: '9',
      //   number:0,
      // },{
      //   value: '已退回',
      //   label: '10',
      //   number:0,
      // },{
      //   value: '已下架',
      //   label: '11',
      //   number:0,
      // }
      ],
      tableData:[],
      columnDeatils:{},
      sendBack: {},
    }
  },
  methods:{
    //获取栏目详情
    getColumndetails(){
      var _this = this;
      this.http.getPlain_url('news-column-template-get-by-column-id','/'+this.$route.query.id).then(res=>{
        this.columnDeatils = res.data||{};
        var list = {
              title: [{ name: this.columnDeatils.columnName, path: {path:'/admin_programInfo',query:{id:this.columnDeatils.id}},}],
              keepAlive: true
            }
          ;
      _this.$refs.breadcrumb_ref.setMeta(list);
      }).catch(err=>{})
    },
    initpageData(){
      this.pageData = {
        pageIndex:this.pageData.pageIndex,
        pageSize: this.pageData.pageSize,
      };
    },
    //初始化数据
    initData(idx){
      this.initpageData();
      var _this = this;
      this.postForm.pageIndex = this.pageData.pageIndex;
      this.postForm.pageSize = this.pageData.pageSize;
      this.http.postJsonParameter_url('news-content-get-by-column',this.postForm,'/'+this.postForm.columnID).then(res=>{
        this.loading = false;
        _this.auditStatusCountList = res.data.auditStatusCountList||[];
        console.log(res.data.auditStatusCountList)
        if(_this.auditStatusCountList.length>0){
          this.auditStatus_menu = 0;
          if(!_this.postForm.auditStatus && _this.postForm.auditStatus !== 0){
            _this.postForm.auditStatus = _this.auditStatusCountList[0].auditStatus;
          }
          _this.auditStatus(idx === 0 ? 0 : this.auditStatus_menu, _this.postForm.auditStatus);
        }
      }).catch(err=>{
        this.loading = false;
      })
    },
    initDataTable(){
      var _this = this;
      this.tableData = [];
      this.postForm.pageIndex = this.pageData.pageIndex;
      this.postForm.pageSize = this.pageData.pageSize;
      this.http.postJsonParameter_url('news-content-get-by-column',this.postForm,'/'+this.postForm.columnID).then(res=>{
        this.tableData = res.data.newsContents.items || [];
        _this.pageData.totalCount = res.data.newsContents.totalCount;
        _this.dragSort();
      }).catch(err=>{
          console.log(err);
      })
    },
    // 分页 页面修改
    pageChange(data) {
      this.pageData[data.key] = data.value;
      this.initData();
    },
    //预览
    previewPage(id){
      var news_details = {};
      this.http.getPlain_url('news-content-manage-get','/'+this.$route.query.id+'?contentid='+id).then(res=>{
        news_details = res.data.content||{};
        window.localStorage.setItem('news-page-preview',JSON.stringify(news_details));
        setTimeout(() => {
          //这里还需要根据栏目选择的模板，确定预览某一个模板，默认是1
          if(this.columnDeatils && this.columnDeatils.columnTemplate){
            window.open(location.href.split('#')[0]+"/#/admin_preview"+this.columnDeatils.columnTemplate+'?cid='+this.$route.query.id+'&id='+id)
          }
        }, 200);
      }).catch(err=>{
        this.$message({type: 'info',message: '获取详情失败'});
      })
    },
    getId(){
      this.postForm = {
        "columnID": this.$route.query.id,//栏目id 左边菜单
        "pageIndex":1,
        "pageSize":50,
        "searchKey": "",
        "lableId": "",
        "auditStatus":null,
      }
      this.pageData.pageIndex = 1;
      this.pageData.pageSize = 50;
      this.getColumndetails();
      this.initData();
      this.$forceUpdate();
    },
    // 获取图标
    coverUrl(url){
      this.postForm.cover = url;
    },
    // 点击排序
    handleSort(row) {
      var _this = this;
      this.$prompt('请输入序号', '排序', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        inputPattern: /^[0-9]*$/,
        inputErrorMessage: '请输入正确的序号'
      }).then(({ value }) => {
        _this.byIndex('alertNum',row.id,value,'',false);
      }).catch(() => {
        _this.$message({type: 'info',message: '取消输入'});
      });
    },
    //排序提交
    byIndex(type,sourceID,sortIndex,TargetCataID,isUp){ //ghost 拖动 alertNum 输入序号
      var _this = this;
      if(type == 'ghost'){ //拖动排序
        this.http.postJsonParameter_url('news-sort-content-by-target',{"sourceID": sourceID,"targetCataID": TargetCataID,"isUp": isUp},'/'+this.postForm['columnID']).then(res=>{
          _this.$message({type: 'success',message: '排序成功!'});
          setTimeout(() => {
            _this.initDataTable();
          }, 300);
        }).catch(err=>{
          _this.$message({type: 'error',message: '排序失败'});
         
        })
      }else{ //输入序号排序
        this.http.postJsonParameter_url('news-sort-content-by-index',{sourceID:sourceID,sortIndex:sortIndex},'/'+this.postForm['columnID']).then(res=>{
          _this.$message({type: 'success',message: '排序成功!'});
          setTimeout(() => {
            _this.initDataTable();
          }, 300);
        }).catch(err=>{
           _this.$message({type: 'error',message: '排序失败'});
        })
      }
    },
    //表格拖动排序
    dragSort() {
      const el = this.$refs.singleTable.$el.querySelectorAll(
        ".el-table__body-wrapper > table > tbody"
      )[0];
      this.sortable = Sortable.create(el, {
        handle: ".handleSort",
        sort: true,
        animation: 150,
        ghostClass: "sortable-ghost",
        onEnd: e => {
          // 拖动了但是没有改变位置 不执行
          if (e.newIndex == e.oldIndex) {
            return;
          }
          //e.oldIndex为拖动一行原来的位置，e.newIndex为拖动后新的位置
          const targetRow = this.tableData.splice(e.oldIndex, 1)[0];
          this.tableData.splice(e.newIndex, 0, targetRow);
          // console.log(this.tableData, '排序后的数据')
          let dragId = this.tableData[e.newIndex].id; //拖动行的id
          let oneId, twoId, isUp, curId;
          //拖动行的前一行
          if (this.tableData[e.newIndex - 1]) {
            oneId = this.tableData[e.newIndex - 1].id;
          } else {
            oneId = "";
          }
          //拖动行的后一行
          if (this.tableData[e.newIndex + 1]) {
            twoId = this.tableData[e.newIndex + 1].id;
          } else {
            twoId = "";
          }
          // 是否向上移动
          isUp = e.newIndex - e.oldIndex < 0 ? true : false;
          // 目标id
          curId = isUp ? twoId : oneId;
          // console.log(dragId, oneId, twoId, isUp, curId)
          //这里提交
           this.byIndex('ghost',dragId,'',curId,isUp); //SourceID:源ID,TargetCataID:目标ID, isUp:位置(true:上，false:下)
        }//onEnd
      });
    },
    //审核状态
    auditStatus(index,auditStatus){
      this.auditStatus_menu = index;
      this.postForm['auditStatus'] = auditStatus;
      // console.log(this.postForm['auditStatus'], this.auditStatus_menu);
      this.postForm.pageIndex = 1;
      this.postForm.pageSize = 50;
      // console.log(this.auditStatus_menu, this.postForm['auditStatus'])
      this.initDataTable();
    },
    //批量下架
    allOut(){
      var _this = this;
      if(this.multipleSelection.length>0){
        this.$confirm('是否确定取消?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '关闭',
          type: 'warning'
        }).then(() => {
          this.http.postJsonParameter_url('news-content-off-shelf',this.multipleSelection,'/'+this.postForm['columnID']).then(res=>{//传数组
            _this.$message({type: 'success',message: '下架成功!'});
            _this.initData();
          }).catch(err=>{
            console.log(err);
          })
        }).catch(() => {
          _this.$message({type: 'info',message: '已关闭'});          
        });
      }else{
        _this.$message({type: 'info',message: '请选择要批量操作的数据'});      
      }
    },
    //批量删除
    allDel(){
      var _this = this;
      if(this.multipleSelection.length>0){
        this.$confirm('是否确定删除?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '关闭',
          type: 'warning'
        }).then(() => {
          this.http.postJsonParameter_url('news-content-delete',this.multipleSelection,'/'+this.postForm.columnID).then(res=>{
            _this.$message({type: 'success',message: '删除成功!'});
            _this.initData();
          }).catch(err=>{
            console.log(err);
          })
        }).catch(() => {
          _this.$message({type: 'info',message: '已关闭'});          
        });
      }else{
        _this.$message({type: 'info',message: '请选择要批量操作的数据'});      
      }
    },
    //评审
    handleAudit(row){
      let _this = this;
      let content = '是否通过该新闻'+row.nextAuditBottonName+'?';
      let l_btn = '取消'
      let r_btn = '通过'
      if(row.nextAuditBottonName == '提交'){
        content = '是否提交该新闻?';
        l_btn = '取消'
        r_btn = '提交'
      }else if(row.nextAuditBottonName == '初校'){
        content = '是否通过该新闻初校?';
        l_btn = '取消'
        r_btn = '通过'
      }else if(row.nextAuditBottonName == '初审'){
        content = '是否通过该新闻初审?';
        l_btn = '不通过'
        r_btn = '通过'
      }else if(row.nextAuditBottonName == '二审'){
        content = '是否通过该新闻二审?';
        l_btn = '不通过'
        r_btn = '通过'
      }else if(row.nextAuditBottonName == '二校'){
        content = '是否通过该新闻二校?';
        l_btn = '取消'
        r_btn = '通过'
      }else if(row.nextAuditBottonName == '终审'){
        content = '是否通过该新闻终审?';
        l_btn = '不通过'
        r_btn = '通过'
      }else if(row.nextAuditBottonName == '终校'){
        content = '是否通过该新闻终校?'
        l_btn = '取消'
        r_btn = '通过'
      }else if(row.nextAuditBottonName == '发布'){
        content = '是否发布该新闻?'
        if(this.columnDeatils.isOpenAudit==1){//无审核流程按钮：取消，发布  1表示有审核
          l_btn = '退回'
          r_btn = '发布'
        }else{
          l_btn = '取消'
          r_btn = '发布'
        }
      }else if(row.nextAuditBottonName == '退回'){
        content = '是否退回该新闻?'
        l_btn = '取消'
        r_btn = '退回'
      }
      this.$confirm(content, '提示', {
        distinguishCancelAndClose: true,
        cancelButtonText: l_btn,
        confirmButtonText: r_btn,
        type: "warning",
        beforeClose: (action, instance, done) => {
          if (action === 'confirm') {//右-按钮
          if (r_btn == '退回') {//这里打开退回弹窗
              this.sendBack.contentID = row.id;
              this.draw_back = true;
              done();
            }else{
              this.http.postJsonParameter_url('news-content-update-audit-status',{contentID:row.id,auditStatus:row.nextAuditStatus[0].key},'/'+this.postForm['columnID']).then(res=>{
                _this.$message({type: 'success',message: '操作成功!'});
                this.postForm.auditStatus = null;
                _this.initData(0);
                done();
                return;
              }).catch(err=>{
                _this.$message({type: 'error',message: '操作失败!'});
                done();
                return;
              })
            }
          } else if (action === 'cancel') {//左-按钮
            if (l_btn == '退回' || l_btn == '不通过') {//这里打开退回弹窗
              this.sendBack.contentID = row.id;
              this.draw_back = true;
            }
            done();
          } else {
            done();
          }
        }
      }).catch(() => {})
    },
    // 退回新闻
    sendBackHande() {
      if (!this.sendBack.sendBackDesc) {
        return this.$message({type: 'error',message: '退回备注不能为空!'});
      }
      this.http.postJson('news-content-send-back', this.sendBack).then(res=>{
        this.draw_back = false;
        this.$message({type: 'success',message: '退回成功!'});
        this.initData();
      }).catch(err=>{
        this.draw_back = false;
        this.$message({type: 'error',message: '退回失败!'});
      })
    },
    //新增新闻
    newsAdd(){
      this.$router.push({path:'/admin_addNews',query:{c_id:this.$route.query.id}})
    },
    //编辑新闻
    handleEdit(row){
      this.$router.push({path:'/admin_addNews',query:{id:row.id,c_id:this.$route.query.id,of:(this.columnDeatils.hasPermission?1:'')}})
    },
    //新闻日志
    handleLog(row){
      this.$router.push({path:'/admin_newsLog',query:{id:row.id,c_id:this.$route.query.id,title:row.title}})
    },
    /**表格选择框**/
    handleSelectionApp(val) {
      var list = [];
      val.forEach(item=>{
        list.push(item.id);
      })
      this.multipleSelection = list;
    },
    //查找
    searchClick(){
      console.log(this.beginCreateTime,this.endCreateTime);
      if(this.beginCreateTime){
        this.postForm['beginCreateTime'] = this.beginCreateTime[0];
        this.postForm['endCreateTime'] = this.beginCreateTime[1];
      }
      if(this.endCreateTime){
        this.postForm['beginOperateTime'] = this.endCreateTime[0];
        this.postForm['endOperateTime'] = this.endCreateTime[1];
      }
      this.loading = true;
      this.pageData.pageIndex = 1;
      this.initData();
    },
    //删除
    handleDel(row){
      var _this = this;
      this.$confirm('是否确定删除?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.http.postJsonParameter_url('news-content-delete',[row.id],'/'+this.postForm.columnID).then(res=>{
            _this.$message({type: 'success',message: '删除成功!'});
            _this.initData();
          }).catch(err=>{
            console.log(err);
          })
      }).catch(() => {
        _this.$message({type: 'info',message: '已取消'});          
      });
    },
  },
}
</script>

<style lang="less" scoped>
@import "../../../assets/admin/css/color.less";
@import "../../../assets/admin/css/style.less";
@import "../../../assets/admin/css/table.less";
.news-title{
  overflow: hidden;
  text-overflow:ellipsis;
  white-space: nowrap;
  color: @6777EF;
  cursor: pointer;
  &:hover{
    border-bottom: 1px solid @6777EF;
  }
}
</style>
