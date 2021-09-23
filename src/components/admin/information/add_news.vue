<!---服务中台-终端管理-添加终端-->
<template>
  <div class="admin-warp-page">
    <el-container>
      <el-aside width="auto" :collapse="$root.collapse" :class="$root.collapse?'fold-menu':''"><serviceLMenu :isActive="2"></serviceLMenu></el-aside>
      <el-main class="admin-content pd admin-bg-top" :class="{'content-collapse':$root.collapse}">
        <breadcrumb :cuMenu="'新闻发布'" :fontColor="'fff'"></breadcrumb><!--面包屑导航--->
        <div class="content">
          <el-form :model="postForm" :rules="rules" ref="ruleForm" label-width="100px" class="admin-form">
            <h1 class="s-b-border-title">新增新闻</h1>
            <div class="form-content">
              <el-form-item label="新闻标题" prop="name">
                <el-input v-model="postForm.name" placeholder="请输入新闻标题" class="txt-set">
                    <template slot="append">
                        <div class="news-font-set">
                            <i class="iconfont vip-B"></i>
                            <i class="iconfont vip-I"></i>
                            <i class="iconfont vip-u"></i>
                            <el-select class="width60" v-model="font_size" placeholder="请选择">
                                <el-option v-for="item in font_list" :key="item.title" :label="item.title" :value="item.title"></el-option>
                            </el-select>
                            <el-color-picker v-model="postForm.color1"></el-color-picker>
                        </div>
                    </template>
                </el-input>
              </el-form-item>
              <el-form-item label="副标题" prop="desc">
                <el-input v-model="postForm.desc" placeholder="请输入副标题"></el-input>
              </el-form-item>
              <div class="user-form-item">
                <label class="u-label"><span class="el-input">新闻标签</span></label>
                <div class="u-list">
                    <input type="text" class="u-input" placeholder="请输入新闻标签"/>
                    <el-button class="u-btn-r" icon="el-icon-search" size="medium" type="primary" @click="tagEditShow()">选择已有标签</el-button>
                </div>
              </div>
              <el-form-item label="多栏目投递" prop="name">
                <div class="btns-colse-warp">
                    <span class="b-colse">馆内资讯<i class="el-icon-close"></i></span>
                    <span class="b-colse">图书馆动态<i class="el-icon-close"></i></span>
                    <span v-for="i in 1" :key="i+'a'" class="b-colse">党建新闻<i class="el-icon-close"></i></span>
                    <el-button class="b-colse-add" icon="el-icon-plus" size="medium" type="primary" @click="columnShow()">投递</el-button>
                    <p class="hint">每条内容支持最多同时投递到3个新闻栏目内。</p>
                </div>
              </el-form-item>
              <el-form-item label="内容封面">
                <div class="up-img-form-item">
                  <div class="up-img-warp">
                    <img src="@/assets/admin/img/icon2.png">
                  </div>
                  <div class="up-img-warp up-icon" @click="upImg()">
                    <span>上传封面</span>
                  </div>
                </div>
              </el-form-item>
              <el-form-item label="发布人">
                <el-input v-model="postForm.desc" placeholder="请输入发布人"></el-input>
              </el-form-item>
              <el-form-item label="发布日期">
                <el-date-picker v-model="postForm.value1" type="date" placeholder="请选择发布日期"></el-date-picker>
              </el-form-item>
              <el-form-item label="显示状态">
                <el-radio-group v-model="postForm.resource">
                  <el-radio label="正常"></el-radio>
                  <el-radio label="下架"></el-radio>
                </el-radio-group>
              </el-form-item>
              <el-form-item label="投递终端">
                <el-checkbox-group v-model="postForm.type">
                    <el-checkbox label="PC门户" name="type"></el-checkbox>
                    <el-checkbox label="微信小程序" name="type"></el-checkbox>
                    <el-checkbox label="手机APP" name="type"></el-checkbox>
                    <el-checkbox label="大厅查询机" name="type"></el-checkbox>
                </el-checkbox-group>
              </el-form-item>
              <el-form-item label="内容">
                <div class="filter-form-item">
                    <el-tabs v-model="activeName" @tab-click="handleClick">
                        <el-tab-pane label="编辑内容" name="div1"></el-tab-pane>
                        <el-tab-pane label="链接跳转" name="div2"></el-tab-pane>
                    </el-tabs>
                    <div class="edit-pd" v-show="activeName=='div1'">
                        <div class="edit-fwb" v-show="edit_check==1"><textarea id="remark_textarea" style="display: none;"></textarea></div>
                        <div class="edit-fwb" v-show="edit_check==2"><textarea id="mytextarea"></textarea> </div>
                        <div class="edit-cut">
                            <div @click="editorCheck(1)">
                                <i class="el-icon-document"></i>
                                <span>编辑器1</span>
                            </div>
                            <div @click="editorCheck(2)">
                                <i class="el-icon-document"></i>
                                <span>编辑器2</span>
                            </div>
                        </div>
                    </div>
                    <div class="table-pd" v-show="activeName=='div2'">
                        <el-input v-model="postForm.desc" placeholder="请输入链接地址"></el-input>
                    </div>
                </div>
                <p class="hint m-top">填写链接后，编辑内容将不会显示，直接跳转链接</p>
              </el-form-item>
              <el-form-item>
                <el-button icon="el-icon-close" size="medium" class="admin-green-btn">保存并发布</el-button>
                <el-button icon="el-icon-close" size="medium" class="admin-red-btn">预览</el-button>
                <el-button icon="el-icon-check" size="medium" type="primary" @click="submitForm('postForm')">保存</el-button>
                <el-button icon="el-icon-close" size="medium" class="admin-gray-btn">取消</el-button>
              </el-form-item>
            </div>
          </el-form>
        </div><!---顶部查询板块 end--->
        <el-dialog title="图片上传" :visible.sync="dialogUPimg" width="550px" :close-on-click-modal="false" :before-close="handleClose">
          <UpdateImg></UpdateImg>
        </el-dialog>
        <el-dialog title="请选择要投递的栏目" :visible.sync="column_check" width="400px" :close-on-click-modal="false" :before-close="columnHide">
            <div class="user-check-dialog">
                <el-select v-model="postForm.value" placeholder="请选择">
                    <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"></el-option>
                </el-select>
            </div>
            <span slot="footer" class="dialog-footer">
                <el-button icon="el-icon-close" size="medium" @click="columnHide()">取消</el-button>
                <el-button icon="el-icon-check" size="medium" type="primary" @click="submitForm()">保存</el-button>
            </span>
        </el-dialog>
        <tagEdit :dataList="tag_edit_data" @tagEditHide="tagEditHide" v-if="tag_edit"></tagEdit>
        <footerPage class="top20"></footerPage>
      </el-main>
    </el-container>
  </div>
</template>

<script>
import bus from '@/assets/public/js/bus';
import http from "@/assets/public/js/http";
import footerPage from "@/components/admin/common/footer";
import breadcrumb from "@/components/admin/common/breadcrumb";
import serviceLMenu from "@/components/admin/common/serviceLMenu";
import UpdateImg from "@/components/admin/common/UpdateImg";
import tagEdit from "../model/tagEdit";

export default {
  name: 'index',
  created(){
      console.log(window.layui.layedit);
    bus.$on('collapse', msg => {
        this.$root.collapse = msg;
    })
  },
  components:{footerPage,serviceLMenu,breadcrumb,UpdateImg,tagEdit},
  mounted(){
      //layui编辑器
      window.layui.use('layedit', function(){
          let layedit = window.layui.layedit
          layedit.build('remark_textarea',{
              height: 350,//高度
            //   tool: ['strong', 'italic', 'underline','del','|','link','face']
            tool: [
                'strong' //加粗
                ,'italic' //斜体
                ,'underline' //下划线
                ,'del' //删除线
                ,'|' //分割线
                ,'left' //左对齐
                ,'center' //居中对齐
                ,'right' //右对齐
                ,'link' //超链接
                ,'unlink' //清除链接
                ,'face' //表情
                ,'image' //插入图片
                ,'help' //帮助
            ]
          });
        })
        //tinymce 编辑器
        tinymce.init({
            selector: 'textarea',
            language: 'zh_CN',
            height: 400,
         });
    },
  data () {
    return {
      dialogUPimg:false,
      column_check:false,
      tag_edit:false,//打开-选择已有标签弹窗
      tag_edit_data:[],
      edit_check:1,//编辑器切换
      activeName:"div1",
      font_size:'12',
      font_list:[
        {title:'12'},
        {title:'14'},
        {title:'16'},
        {title:'18'},
        {title:'20'},
        {title:'24'},
        {title:'30'},
      ],
      options: [{
          value: '馆内资讯',
          label: '馆内资讯'
        },{
          value: '图书馆动态',
          label: '图书馆动态'
        },{
          value: '党建新闻',
          label: '党建新闻'
        }],
      postForm: {
          name: '',
          desc: '',
          type: [],
      },
      rules: {
          name: [
              { required: true, message: '请输入内容', trigger: 'blur' }
          ],
          desc: [
              { required: true, message: '请输入内容', trigger: 'blur' }
          ]
      },
    }
  },
  methods:{
    initData(){
      http.getPlain('AssetNewest','PlateId=109&PageSize=9&PageIndex=1').then(res=>{ //学生专区
          this.list1 = res.result.dtos||[];
      }).catch(err=>{
          console.log(err);
      })
    },
    //打开图标上传弹窗
    upImg(){
      this.dialogUPimg = true;
    },
    //图片上传-弹窗关闭
    handleClose(done) {
      done();
      // this.$confirm('确认关闭？')
      //   .then(_ => {
      //     done();
      //   })
      //   .catch(_ => {});
    },
    //打开-选择已有标签
    tagEditShow(){
      this.tag_edit = true;
    },
    //关闭-选择已有标签
    tagEditHide(){
      this.tag_edit = false;
    },
    //打开添加栏目弹窗
    columnShow(){
        this.column_check = true;
    },
    //打开添加栏目弹窗
    columnHide(){
        this.column_check = false;
    },
    //编辑器切换
    editorCheck(val){
        this.edit_check = val;
    },
    //表单提交
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
          if (valid) {
              
          } else {
              
          }
      });
    },
    
  },
}
</script>

<style lang="less" scoped>
@import "../../../assets/admin/css/color.less";/**颜色配置 */
@import "../../../assets/admin/css/style.less";/**颜色配置 */
@import "../../../assets/admin/css/form.less";
  .content{
    background-color: @fff;
    border-radius: 4px;
    box-shadow: 0px 5px 5px rgba(0, 0, 0, 0.02);
    .form-content{
    //   max-width: 760px;
        .el-input,.up-img-form-item{
            width: 500px;
        }
    }
  }
  .form-content{
      .m-top{
          margin-top: 10px;
      }
    .user-form-item{
        .u-label{
            width: 100px !important;
        }
        .u-input{
            padding-right: 140px !important;
        }
        .u-list{
            margin-left: -4px;
            padding-right:130px !important;
        }
        .u-btn-r{
            width: 130px !important;
        }
    }
    .txt-set{
      /deep/.el-input-group__append{
          padding: 0 10px;
      }
    }
    .news-font-set{
        height: 38px;
        display: flex;
        align-items: center;
        i{
            cursor: pointer;
            margin-right: 5px;
            &:hover{
                color: @f28102;
            }
        }
        /deep/.el-popover{
            min-width: 50px;
        }
        /deep/ .el-input__suffix{
            display: none;
        }
        /deep/.el-input--suffix .el-input__inner{
            padding-right: 0;
            text-align: center;
            padding-left: 0;
        }
        .width60{
            width: 30px;
            margin: 0;
        }
        /deep/.el-input-group--append .el-input__inner{
            padding-right: 0 !important;
        }
    }
    /****新闻标题设置颜色和字体样式 */
    /deep/.el-color-picker__trigger{
        width: 30px;
        height: 30px;
    }
    /deep/.el-color-picker{
        height: 30px;
    }
    /*****以下是富文本编辑器的重置样式 */
    /deep/.tox-tinymce{
        border: 1px solid #eee;
    }
    /deep/ .tox .tox-menubar+.tox-toolbar-overlord .tox-toolbar__primary{
        border-top: 1px solid #eee;
    }
    /deep/.tox .tox-statusbar{
        border-top:1px solid #eee;
    }
    /deep/.tox:not([dir=rtl]) .tox-toolbar__group:not(:last-of-type){
        border-right: 1px solid #eee;
    }
    /deep/.tox .tox-menubar{
        background:none;
    }
    /deep/.tox .tox-toolbar__primary{
        background:none;
        border-bottom: 1px solid #eee;
    }
  }
</style>
