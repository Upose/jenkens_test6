<!---应用中心-应用订单管理-->
<template>
  <div class="admin-warp-page">
    <el-container>
      <el-aside width="auto" :collapse="$root.collapse" :class="$root.collapse?'fold-menu':''"><serviceLMenu :isActive="2"></serviceLMenu></el-aside>
      <el-main class="admin-content pd admin-bg-top" :class="{'content-collapse':$root.collapse}">
        <breadcrumb :cuMenu="'新闻发布'" :fontColor="'fff'"></breadcrumb><!--面包屑导航--->
        <div class="content search-table-general">
            <div class="search-table-w">
                <h1 class="search-title">馆内资讯</h1>
                <div class="search-term">
                    <el-input class="width187" v-model="postForm.name" size="medium" placeholder="标题/内容/发布者"></el-input>
                    <el-select class="width136" v-model="postForm.val" size="medium" placeholder="子类">
                        <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"></el-option>
                    </el-select>
                    <el-date-picker class="width187" v-model="postForm.value1" size="medium" type="date" placeholder="创建时间"></el-date-picker>
                    <el-date-picker class="width187" v-model="postForm.value" size="medium" type="date" placeholder="更新时间"></el-date-picker>
                    <el-button type="primary" size="medium" icon="el-icon-search">查找</el-button>
                    <div class="r-btn">
                      <el-button type="primary" size="medium" @click="newsAdd()">新增新闻</el-button>
                      <el-button size="medium" class="gray-btn" @click="allDel()">批量下架</el-button>
                      <el-button size="medium" class="gray-btn" @click="allDel()">批量删除</el-button>
                    </div>
                </div>
            </div><!--顶部查询 end-->
            <div class="table-w">
                <h2 class="m-title">
                  <el-button size="medium" class="gray-btn" @click="allDel()">已发布(566)</el-button>
                  <el-button size="medium" class="gray-btn" @click="allDel()">待提交(0)</el-button>
                  <el-button size="medium" class="gray-btn" @click="allDel()">待初审</el-button>
                  <el-button size="medium" class="gray-btn" @click="allDel()">待初校</el-button>
                  <el-button size="medium" class="gray-btn" @click="allDel()">待二审</el-button>
                  <el-button size="medium" class="gray-btn" @click="allDel()">待二校</el-button>
                  <el-button size="medium" class="gray-btn" @click="allDel()">待终审</el-button>
                  <el-button size="medium" class="gray-btn" @click="allDel()">待终校</el-button>
                  <el-button size="medium" class="gray-btn" @click="allDel()">待发布</el-button>
                  <el-button size="medium" class="gray-btn" @click="allDel()">已退回</el-button>
                  <el-button size="medium" class="gray-btn" @click="allDel()">已下架</el-button>
                </h2>
                <div class="t-p">
                    <el-table stripe :data="tableData" @selection-change="handleSelectionApp" border class="admin-table">
                        <el-table-column type="selection" width="45"></el-table-column>
                        <el-table-column prop="id" label="序号" align="center" width="58"></el-table-column>
                        <el-table-column prop="content" label="新闻标题"></el-table-column>
                        <el-table-column prop="content" label="子类"></el-table-column>
                        <el-table-column prop="content" label="状态">
                          <template slot-scope="scope">
                            <span :class="scope.row.status==1?'color-blue':'color-red'">{{scope.row.status==1?'发布':'已退回'}}</span>
                          </template>
                        </el-table-column>
                        <el-table-column prop="content" label="发布者"></el-table-column>
                        <el-table-column prop="content" label="创建时间"></el-table-column>
                        <el-table-column prop="content" label="更新时间"></el-table-column>
                        <el-table-column prop="content" label="操作" width="380">
                          <template slot-scope="scope">
                            <el-button @click="handleEdit(scope.row)" type="text" size="mini" icon="el-icon-delete" round>编辑</el-button>
                            <el-button @click="handleEdit(scope.row)" type="text" size="mini" icon="el-icon-delete" round>评审</el-button>
                            <el-button @click="handleEdit(scope.row)" type="text" size="mini" icon="el-icon-delete" round>删除</el-button>
                            <el-button @click="handleEdit(scope.row)" type="text" size="mini" icon="el-icon-delete" round>排序</el-button>
                            <el-button @click="handleEdit(scope.row)" type="text" size="mini" icon="el-icon-delete" round>预览</el-button>
                          </template>
                        </el-table-column>
                        <el-table-column prop="content" label="操作记录" width="85">
                          <template slot-scope="scope">
                            <el-button @click="handleEdit(scope.row)" type="text" size="mini" icon="el-icon-delete" round>日志</el-button>
                          </template>
                        </el-table-column>
                    </el-table>
                    <!--<el-button size="small" class="default-btn-n-border next-btn">下一页</el-button>-->
                    <paging></paging>
                </div>
            </div><!--管理页列表 end--->
            
        </div><!---顶部查询板块 end--->
        <footerPage class="top20"></footerPage>
      </el-main>
    </el-container>
    <el-dialog title="备注信息" :visible.sync="show_remark" width="550px" :close-on-click-modal="false">
      <p>部分功能存在违规行为，请修改后再提交!</p>
      <span slot="footer" class="dialog-footer">
          <el-button icon="el-icon-close" size="medium" @click="show_remark=false">关闭</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import bus from '@/assets/public/js/bus';
import http from "@/assets/public/js/http";
import paging from "@/components/admin/common/paging";
import footerPage from "@/components/admin/common/footer";
import breadcrumb from "@/components/admin/common/breadcrumb";
import serviceLMenu from "@/components/admin/common/serviceLMenu";
export default {
  name: 'index',
  created(){
    bus.$on('collapse', msg => {
      this.$root.collapse = msg;
    })
  },
  components:{footerPage,serviceLMenu,breadcrumb,paging},
  data () {
    return {
      activeName:'pc',
      show_remark:false,//查看备注信息
      postForm:{},
      options:[
        {
          value: '选项1',
          label: '选项1'
        }
      ],
      btns: [{
        value: '已发布',
        label: '1',
        number:569,
      },{
        value: '待提交',
        label: '2',
        number:56,
      },{
        value: '待初审',
        label: '3',
        number:0,
      },{
        value: '待初校',
        label: '4',
        number:0,
      },{
        value: '待二审',
        label: '5',
        number:0,
      },{
        value: '待二校',
        label: '6',
        number:0,
      },{
        value: '待终审',
        label: '7',
        number:0,
      },{
        value: '待终校',
        label: '8',
        number:0,
      },{
        value: '待发布',
        label: '9',
        number:0,
      },{
        value: '已退回',
        label: '10',
        number:0,
      },{
        value: '已下架',
        label: '11',
        number:0,
      }],
      tableData:[{id:1,content:'测试内容',status:2},{id:1,status:1},{id:1,status:1},{id:1},{id:1},{id:1}],
    }
  },
  mounted(){
    //   this.initData();
  },
  methods:{
    /**查看拒绝备注信息*/
    handleShow(){
      this.show_remark = true;
    },
    //新增新闻
    newsAdd(){
      this.$router.push('/addNews')
    },
    //编辑应用
    handleEdit(){
      this.$router.push({path:'/addNews',query:{id:1}})
    },
    /**应用表格选择框**/
    handleSelectionApp(val) {
        this.multipleSelection = val;
    },
    initData(){
      http.getPlain('AssetNewest','PlateId=109&PageSize=9&PageIndex=1').then(res=>{ //学生专区
          this.list1 = res.result.dtos||[];
      }).catch(err=>{
          console.log(err);
      })
    },
    handleDel(row){
      this.$confirm('是否确定取消?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '关闭',
        type: 'warning'
      }).then(() => {
        this.$message({type: 'success',message: '取消成功!'});
      }).catch(() => {
        this.$message({type: 'info',message: '已关闭'});          
      });
    },
  },
}
</script>

<style lang="less" scoped>
@import "../../../assets/admin/css/color.less";/**颜色配置 */
@import "../../../assets/admin/css/table.less";
</style>
