<!---新闻发布-具体栏目-新闻发布 npm install myjs-common 文件上传 -->
<template>
  <div class="admin-warp-page">
    <!-- <img width="100" height="100" v-for="i in img_list" :src="'blob:'+i"/> -->
    <el-container>
      <el-aside width="auto" :collapse="$root.collapse" :class="$root.collapse?'fold-menu':''">
        <serviceLMenu :isActive="2"></serviceLMenu>
      </el-aside>
      <el-main class="admin-content pd admin-bg-top" :class="{'content-collapse':$root.collapse}">
        <breadcrumb :cuMenu="'新闻发布'" ref="breadcrumb_ref" :fontColor="'fff'"></breadcrumb>
        <!--面包屑导航--->
        <div class="content">
          <el-form :model="postForm" label-suffix="：" :rules="rules" ref="postForm" label-width="100px"
            class="admin-form">
            <h1 class="s-b-border-title">{{id?'编辑':'新增'}}新闻</h1>
            <div class="form-content">
              <el-form-item label="新闻标题" prop="title">
                <el-input v-model="postForm.title" placeholder="请输入新闻标题" maxlength="100" minlength="2" show-word-limit
                  class="txt-set r-pad-num-max-100">
                  <template slot="append">
                    <div class="news-font-set">
                      <i class="iconfont el-icon-vip-B" @click="fontClick(titleStyleKV.B,'B')"
                        :class="titleStyleKV.B?'active':''"></i>
                      <i class="iconfont el-icon-vip-I" @click="fontClick(titleStyleKV.I,'I')"
                        :class="titleStyleKV.I?'active':''"></i>
                      <i class="iconfont el-icon-vip-u" @click="fontClick(titleStyleKV.U,'U')"
                        :class="titleStyleKV.U?'active':''"></i>
                      <el-select class="width60" v-model="titleStyleKV.font" placeholder="请选择">
                        <el-option v-for="item in font_list" :key="item.title" :label="item.title" :value="item.title">
                        </el-option>
                      </el-select>
                      <el-color-picker v-model="titleStyleKV.color"></el-color-picker>
                    </div>
                  </template>
                </el-input>
              </el-form-item>
              <el-form-item label="副标题" prop="subTitle">
                <el-input v-model="postForm.subTitle" placeholder="请输入副标题" class="r-pad-num-max-100" maxlength="100"
                  minlength="0" show-word-limit></el-input>
              </el-form-item>
              <div class="user-form-item" v-if="isshow_ParentCatalogue">
                <label class="u-label"><span class="u-el-input">新闻标签：</span></label>
                <div class="u-list">
                  <input type="text" @keyup="inputBlur" v-model="postForm.parentCatalogue" class="u-input"
                    placeholder="请输入新闻标签" />
                  <span class="hint-num-max">{{parentCatalogue_length}}/20</span>
                  <el-button class="u-btn-r" icon="iconfont el-icon-vip-fangdajing" size="medium" type="primary"
                    @click="tagEditShow()">选择已有标签</el-button>
                  <tagEdit :dataList="tag_edit_data" :cType="2" @tagEditHide="tagEditHide" @checkTag="checkTag"
                    v-if="tag_edit"></tagEdit>
                </div>
              </div>
              <el-form-item label="多栏目投递">
                <div class="btns-colse-warp">
                  <div class="btns-select-row" v-for="(it,i) in coumn_list" :key="i+'b'">
                    <el-select v-model="it.value" placeholder="请选择栏目">
                      <el-option :label="item.value" :value="item.key" v-for="(item,i) in coumn_data_list"
                        :key="i+'coumn'">{{item.value||'无'}}</el-option>
                    </el-select>
                    <div class="btns-el-btn" @click="removeCoumn(i)" v-if="(coumn_list.length-1)!=i">
                      <i class="iconfont el-icon-vip-jianhao1"></i>
                      <span>删除</span>
                    </div>
                    <div class="btns-el-btn" @click="addCoumn" v-if="(coumn_list.length-1)==i">
                      <i class="iconfont el-icon-vip-tianjia1"></i>
                      <span>投递</span>
                    </div>
                  </div>
                </div>
                <p class="hint">每条内容支持最多同时投递到3个新闻栏目内。</p>
              </el-form-item>
              <el-form-item label="内容封面" v-if="columnDeatils.isOpenCover==1">
                <div class="up-img-form-item">
                  <!-- <div class="up-img-warp up-img-cover-img" v-if="id"> -->
                  <div class="up-img-warp up-img-cover-img" v-if="postForm.cover">
                    <img :src="fileUrl+postForm.cover">
                  </div>
                  <div class="up-img-warp up-icon up-img-cover-icon" @click="upImg()">
                    <span>上传封面</span>
                  </div>
                </div>
              </el-form-item>
              <el-form-item label="发布人" prop="publisher">
                <el-input v-model="postForm.publisher" placeholder="请输入发布人" class="r-pad-num-max" maxlength="50"
                  minlength="0" show-word-limit></el-input>
              </el-form-item>
              <el-form-item label="发布日期" prop="publishDate">
                <el-date-picker v-model="postForm.publishDate" type="date" value-format="yyyy-MM-dd" format="yyyy-MM-dd"
                  class="data-clear-icon" placeholder="请选择发布日期"></el-date-picker>
              </el-form-item>
              <el-form-item label="显示状态" prop="status">
                <el-radio-group v-model="postForm.status">
                  <el-radio :label="1">正常</el-radio>
                  <el-radio :label="2" :disabled="!($route.query.of==1)">下架</el-radio>
                </el-radio-group>
              </el-form-item>
              <el-form-item label="投递终端" v-if="columnDeatils.terminals != 1">
                <el-checkbox-group v-model="postForm.terminals">
                  <el-checkbox :label="it.key" name="type" v-for="(it,index) in terminals_list"
                    :key="index+'_terminals'">{{it.value}}</el-checkbox>
                </el-checkbox-group>
              </el-form-item>
              <el-form-item :label="item.value" v-for="(item,index) in row_list" :key="index +'row'">
                <el-input v-model="item.input_val" :placeholder="'请输入'+item.value" v-if="item.key !='ExpirationDate'">
                </el-input>
                <el-date-picker v-model="item.input_val" type="date" value-format="yyyy-MM-dd" format="yyyy-MM-dd"
                  v-if="item.key =='ExpirationDate'" placeholder="请选择失效日期"></el-date-picker>
              </el-form-item>
              <el-form-item label="内容" :prop="activeName=='div1'?'content':'externalLink'">
                <div class="filter-form-item">
                  <div class="filter-r-t-editor">
                    <div class="filter-f-title">
                      <span class="filter-box-col" @click="handleClick('div1')"
                        :class="activeName=='div1'?'active':''">编辑内容</span>
                      <span class="filter-box-col" @click="handleClick('div2')" :class="activeName=='div2'?'active':''"
                        v-show="isshow_link">链接跳转</span>
                      <span class="filter-hint">{{activeName=='div2'?'填写链接后，编辑内容将不会显示，直接跳转链接':''}}</span>
                    </div>
                    <div v-show="activeName=='div1'">
                      <div class="edit-fwb">
                        <!-- <textarea id="mytextarea" v-model="postForm.content"></textarea> -->
                        <dlib3Tinymce :contValue.sync="postForm.content" width="1000" :fileUrl="fileUrl"
                          editorId="mytextarea"></dlib3Tinymce>
                      </div>
                      <!-- <div class="edit-fwb" v-show="contentEditor==2">
                          <vue-ueditor-wrap v-model="postForm.content" :config="myConfig" class="ueditors"></vue-ueditor-wrap>
                        </div> -->
                      <!-- <div class="edit-check-list">
                          <div class="edit-col" @click="editorCheck(1)" :class="contentEditor==1?'edit-col-active':''"><i class="iconfont el-icon-vip-bianji1 filter-icon"></i>编辑器1</div>
                          <div class="edit-col" @click="editorCheck(2)" :class="contentEditor==2?'edit-col-active':''"><i class="iconfont el-icon-vip-bianji2 filter-icon"></i>编辑器2</div>
                        </div> -->
                    </div>
                    <div class="table-pd" style="width:1000px;position: relative;" v-show="activeName=='div2'">
                      <!-- <el-input type="textarea" class="tab-el-textarea" placeholder="请输入链接地址" v-model="postForm.externalLink" maxlength="500" show-word-limit></el-input> -->
                      <textarea class="table-el-textarea" @keyup="textareaBlur" v-model="postForm.externalLink"
                        placeholder="请输入链接地址"></textarea>
                      <span class="hint-num-max">{{externalLink_length}}/500</span>
                    </div>
                  </div>
                </div>
              </el-form-item>
              <el-form-item>
                <div>
                  <el-button icon="iconfont el-icon-vip-quxiao" size="medium" class="admin-gray-btn"
                    @click="backHistory()">取消</el-button>
                  <el-button icon="iconfont el-icon-vip-yulan1" size="medium" class="admin-green-btn"
                    @click="previewPage()">预览</el-button>
                  <el-button icon="iconfont el-icon-vip-baocun1" size="medium" type="primary"
                    @click="submitForm('postForm',it.key)" v-for="(it,index) in postForm.nextAuditStatus"
                    :key="index+'bts'">{{it.value||'保存'}}</el-button>
                </div>
              </el-form-item>
            </div>
          </el-form>
        </div>
        <!---顶部查询板块 end--->
        <el-dialog append-to-body title="图片上传" :visible.sync="dialogUPimg" width="700px" :close-on-click-modal="false"
          :before-close="handleClose">
          <UpdateImg @imgUrl="imgUrl" :imgWidth="coverWidth" :imgHeight="coverHeight"></UpdateImg>
        </el-dialog>

        <el-dialog append-to-body title="退回备注" :visible.sync="draw_back" width="480px" :close-on-click-modal="false">
          <div class="">
            <el-input type="textarea" v-model="sendBack.sendBackDesc" maxlength="200" minlength="0" show-word-limit
              rows="8" placeholder="输入备注原因"></el-input>
          </div>
          <span slot="footer" class="dialog-footer">
            <el-button icon="iconfont el-icon-vip-quxiao" size="medium" @click="draw_back = false">取消</el-button>
            <el-button icon="iconfont el-icon-vip-baocun1" size="medium" type="primary" @click="sendBackHande">保存
            </el-button>
          </span>
        </el-dialog>
        <footerPage class="top20"></footerPage>
      </el-main>
    </el-container>
  </div>
</template>

<script>
import footerPage from "@/components/admin/common/footer";
import breadcrumb from "@/components/admin/common/breadcrumb";
import serviceLMenu from "@/components/admin/common/serviceLMenu";
import UpdateImg from "@/components/admin/common/UpdateImg";
import tagEdit from "../model/tagEdit";
// import VueUeditorWrap from 'vue-ueditor-wrap'
import { datePipe } from '@/assets/public/js/time'
// const FuRequire = require("myjs-common").FuRequire;
// import Tinymce from "@/components/admin/model/Tinymce/index";
export default {
  name: 'index',
  components: { footerPage, serviceLMenu, breadcrumb, UpdateImg, tagEdit },
  created() {
    this.bus.$on('collapse', msg => {
      this.$root.collapse = msg;
    })
    //获取有哪些终端
    this.http.getPlain_url('pront-terminals', '').then(res => {
      this.terminals_list = res.data || [];
    })
    //获取当前栏目信息
    this.http.getPlain_url('news-column-get', '/' + this.columnID).then(res => {
      if (res.data) {
        this.columnDeatils = res.data || {};
        // 开启时默认选全部
        if (this.columnDeatils.terminals == 1) {
          this.postForm.terminals = [1, 2, 3, 4, 5];
        }
        // console.log(this.columnDeatils)
        // this.row_list = this.columnDeatils.extensionKV||[];
        if (this.columnDeatils.extensionKV && this.columnDeatils.extensionKV.length > 0) {
          this.columnDeatils.extensionKV.forEach(item => {
            if (item.key != 'ParentCatalogue' && item.key != 'JumpLink') {
              this.row_list.push(item);
            }
          })
        }
        this.coverHeight = this.columnDeatils.coverHeight || 10;
        this.coverWidth = this.columnDeatils.coverWidth || 10;
        this.isshow_link = JSON.stringify(this.columnDeatils.extensionKV).indexOf('JumpLink') > -1;
        this.isshow_ParentCatalogue = JSON.stringify(this.columnDeatils.extensionKV).indexOf('ParentCatalogue') > -1;
        var list = {
          title: [{ name: this.columnDeatils.title, path: { path: '/admin_programInfo', query: { id: this.columnDeatils.id } }, }, { name: this.id ? '编辑新闻' : '新增新闻', }],
          keepAlive: true
        }
          ;
        this.$refs.breadcrumb_ref.setMeta(list);
        if (!this.$route.query.id) {
          // console.log(res.data.contentDefaultAuditStatusKV)
          this.postForm['nextAuditStatus'] = res.data.contentDefaultAuditStatusKV || [];
        }
      }
    }).catch(err => { })
    //栏目列表
    this.http.getPlain('delivery-column-list-get', 'columnid=' + this.columnID).then(res => {
      this.coumn_data_list = res.data || [];
    }).catch(err => { })
    //获取标签列表
    this.http.getPlain('lable-info-get-by-type', 'type=2').then(res => {
      this.tag_edit_data = res.data || [];
    }).catch(err => { })
  },
  beforeDestroy() {
    // 销毁组件前销毁编辑器
    window.tinymce.get('mytextarea').destroy();
  },
  mounted() {
    var _this = this;
    this.postForm['publisher'] = JSON.parse(this.userInfo).name;//这个地方应该由后台改为自动为登录用户，不用前端传
    // this.$set();
    // this.$set(this.row_list,index,{key:item.key,value:item.value,input_val:list.expendFiled2})
    //tinymce 编辑器
    // tinymce.init({
    //   selector: '#mytextarea',
    //   language: 'zh_CN',
    //   height: 400,
    //   min_height: 400,
    //   // plugins: 'code, image, autoresize, lists',
    //   // toolbar: 'code image',
    //   toolbar_mode: 'wrap',
    //   branding: false,
    //   // toolbar_sticky: true,
    //   resize: true,
    //   fontsize_formats: '11px 12px 14px 16px 18px 24px 36px 48px',
    //   font_formats: '微软雅黑=Microsoft YaHei,Helvetica Neue,PingFang SC,sans-serif;苹果苹方=PingFang SC,Microsoft YaHei,sans-serif;宋体=simsun,serif;仿宋体=FangSong,serif;黑体=SimHei,sans-serif;Arial=arial,helvetica,sans-serif;Arial Black=arial black,avant garde;Book Antiqua=book antiqua,palatino;',
    //   // plugins: 'image,wordcount,charmap,code,hr,lists,advlist,emoticons,fullscreen,help,insertdatetime,link',

    //   plugins: 'code  quickbars print preview searchreplace autolink directionality powerpaste visualblocks visualchars image link media template codesample table charmap hr pagebreak nonbreaking anchor insertdatetime advlist lists wordcount textpattern help emoticons autosave bdmap indent2em autoresize importword kityformula-editor',
    //   toolbar: 'code undo redo restoredraft | cut copy paste pastetext | forecolor backcolor bold italic underline strikethrough link anchor codesample | alignleft aligncenter alignright alignjustify outdent indent | \
    //       styleselect formatselect fontselect fontsizeselect | bullist numlist | blockquote subscript superscript removeformat | \
    //       table image  media charmap emoticons hr pagebreak insertdatetime print preview | bdmap indent2em lineheight importword kityformula-editor',
    //   images_upload_handler: (blobInfo, success, failure) => { // 图片上传
    //     console.log(blobInfo, success, failure);
    //     this.handleImgUpload(blobInfo, success, failure)
    //   },
    //   width: 1000,
    //   powerpaste_word_import: "merge",
    //   powerpaste_html_import: 'merge',
    //   powerpaste_allow_local_images: true,
    //   powerpaste_keep_unsupported_src: true,
    //   paste_data_images: true,
    //   file_picker_types: 'media',
    //   media_live_embeds: true,
    //   file_picker_callback: (callback, value, meta) => {
    //     let input = document.createElement('input');
    //     input.setAttribute('type', 'file');
    //     input.setAttribute("accept", ".mp4");
    //     let that = this;
    //     input.onchange = function () {
    //       let file = this.files[0];
    //       let fd = new FormData();
    //       fd.append("files", file);
    //       that.handleVideoUpload(fd, callback);
    //     }
    //     input.click();
    //   },
    //   video_template_callback: data => {
    //     console.log(data)
    //     return '<span class="mce-preview-object mce-object-video" contenteditable="false" data-mce-object="video" data-mce-p-allowfullscreen="allowfullscreen" data-mce-p-frameborder="no" data-mce-p-scrolling="no" data-mce-p-src=' + data.source + ' data-mce-p-width=' + data.width + ' data-mce-p-height=' + data.height + ' data-mce-p-controls="controls" data-mce-html="%20"> <video width=' + data.width + ' height=' + data.height + ' controls="controls"> <source src=' + data.source + ' type=' + data.sourcemime + '></source> </video> </span>';
    //   }
    // });
    // tinyMCE.activeEditor.on('paste', function (e) {
    //   setTimeout(() => {
    //     var html = null;
    //     e.path.forEach(item => {
    //       if (item.tagName == 'body' || item.tagName == 'BODY') {
    //         html = item.innerHTML;
    //         var img_data = [];
    //         html.replace(/<img [^>]*src=['"]([^'"]+)[^>]*>/g, function (match, capture) {
    //           img_data.push(capture);
    //         });
    //         _this.img_list = img_data;
    //         console.log(img_data);
    //       }
    //     })
    //   }, 50);
    // });
    //获取修改信息
    if (this.id && this.id != undefined) {
      //获取新闻详情
      this.http.getPlain_url('news-content-manage-get', '/' + this.columnID + '?contentid=' + this.id).then(res => {
        if (res.data.content) {
          this.postForm = { ...res.data.content, publishDate: datePipe(res.data.content.publishDate, 'yyyy-MM-dd') }
        } else {
          this.postForm = {};
        }
        console.log(this.postForm, res.data.content)
        if (this.postForm.parentCatalogue) {
          this.parentCatalogue_length = this.postForm.parentCatalogue.length || 0;
        }
        this.contentEditor = this.postForm.contentEditor || 1;
        // 设置富文本
        tinymce.activeEditor.setContent(this.postForm.content);
        var list = res.data.content || {};
        //按钮集合
        console.log(res.data.nextAuditStatus);
        this.postForm['nextAuditStatus'] = res.data.nextAuditStatus || [];
        if (this.postForm.externalLink) {
          this.externalLink_length = this.postForm.externalLink.length || 0;
          this.activeName = 'div2';
        }
        //标题样式设置
        if (list.titleStyleKV && list.titleStyleKV != undefined) {
          list.titleStyleKV.forEach(item => {
            if (item.key == 'B' || item.key == 'I' || item.key == 'U') {
              this.titleStyleKV[item.key] = item.value;
            }
            this.titleStyleKV[item.key] = item.value;
          })
        }
        //投递终端
        if (list.terminals) {
          this.postForm.terminals = list.terminals.split(';') || [];
          this.postForm.terminals.forEach((item, index) => {
            this.postForm.terminals[index] = parseInt(item);
          })
        } else {
          this.postForm.terminals = [];
        }
        //多栏目投递 columnIDs
        if (list.columnIDs) {
          var c_list = list.columnIDs.split(';') || [];
          if (c_list.length > 1) {
            for (var i = 0; i < c_list.length; i++) {
              if (_this.coumn_list[i]) {
                _this.coumn_list[i]['value'] = c_list[i];
              } else {
                if (c_list[i] != '') _this.coumn_list.push({ 'value': c_list[i] });
              }
            }
          }
        }
        //扩展项
        this.row_list.forEach((item, index) => {
          // if(item.key == 'ParentCatalogue'){
          //   item.input_val = list.parentCatalogue;
          // }
          // if(item.key == 'JumpLink'){
          //   item.input_val = list.jumpLink;
          // }
          if (item.key == 'Keywords') {
            this.$set(this.row_list, index, { key: item.key, value: item.value, input_val: list.keywords })
          }
          if (item.key == 'Author') {
            this.$set(this.row_list, index, { key: item.key, value: item.value, input_val: list.author })
          }
          if (item.key == 'ExpirationDate') {
            this.$set(this.row_list, index, { key: item.key, value: item.value, input_val: list.expirationDate })
          }
          if (item.key == 'ExpendFiled1') {
            this.$set(this.row_list, index, { key: item.key, value: item.value, input_val: list.expendFiled1 })
          }
          if (item.key == 'ExpendFiled2') {
            this.$set(this.row_list, index, { key: item.key, value: item.value, input_val: list.expendFiled2 })
          }
          if (item.key == 'ExpendFiled3') {
            this.$set(this.row_list, index, { key: item.key, value: item.value, input_val: list.expendFiled3 })
          }
          if (item.key == 'ExpendFiled4') {
            this.$set(this.row_list, index, { key: item.key, value: item.value, input_val: list.expendFiled4 })
          }
          if (item.key == 'ExpendFiled5') {
            this.$set(this.row_list, index, { key: item.key, value: item.value, input_val: list.expendFiled5 })
          }
        })
        this.$forceUpdate();
      }).catch(err => {
        console.log(err);
      })
    }
  },
  watch: {
    'postForm.content'(val) {
      this.$set(this.postForm, 'content', val)
      this.$nextTick(() => {
        this.$refs.postForm.validateField(['content']);
      })
    },
  },
  data() {
    return {
      img_list: [],//富文本图片路径
      userInfo: window.localStorage.getItem('userInfo'),
      coverHeight: 10,
      coverWidth: 10,
      parentCatalogue_length: 0,//标签输入长度
      externalLink_length: 0,//链接地址长度
      columnDeatils: {},//栏目详情
      fileUrl: window.localStorage.getItem('fileUrl'),
      columnID: this.$route.query.c_id,//栏目id-左边菜单
      layedit: null,
      isshow_link: false,//是否显示跳转链接输入框
      isshow_ParentCatalogue: false,//是否显示新闻标签
      row_list: [],//栏目定义的扩展字段列表
      coumn_list: [{ value: '' }],//新增删除栏目列表
      draw_back: false,//退回弹窗
      dialogUPimg: false,//图片上传
      tag_edit: false,//打开-选择已有标签弹窗
      tag_edit_data: [],//选择标签列表
      id: this.$route.query.id || '',
      contentEditor: '1',//编辑器切换
      activeName: "div1",//富文本还是链接
      coumn_data_list: [],//栏目下拉选择列表
      terminals_list: [],//终端列表
      font_list: [ //字体大小
        { title: 14 },
        { title: 16 },
        { title: 20 },
        { title: 24 },
        { title: 28 },
        { title: 30 },
        { title: 32 },
      ],
      titleStyleKV: {//标题样式设置
        B: false,
        I: false,
        U: false,
        font: 20,
        color: '#000000',
      },
      sendBack: {},
      postForm: {
        terminals: [],
        publishDate: new Date(+new Date() + 8 * 3600 * 1000).toISOString().replace(/\.[\d]{3}Z/, '') + '.000Z',
        status: 1,
        publisher: '',
      },
      // postForm: {terminals:[1,2,3,4]},
      rules: {
        title: [
          { required: true, min: 2, max: 100, message: '标题长度在 2 到 100 个字符', trigger: 'blur' }
        ],
        subTitle: [
          { min: 0, max: 100, message: '长度在 0 到 100 个字符', trigger: 'blur' }
        ],
        parentCatalogue: [
          { min: 0, max: 20, message: '长度在 0 到 20 个字符', trigger: 'blur' }
        ],
        publisher: [
          { required: true, message: '请输入发布人', trigger: 'blur' },
          { min: 2, max: 50, message: '长度在 2 到 50 个字符', trigger: 'blur' }
        ],
        status: [
          { required: true, message: '请选择显示状态', trigger: 'blur' },
        ],
        publishDate: [
          { required: true, message: '请选择日期', trigger: 'blur' },
        ],
        content: [
          { required: true, message: '请输入内容', }
        ],
        externalLink: [
          { required: true, message: '请输入链接', trigger: 'blur' },
          { min: 0, max: 500, message: '长度在 0 到 500 个字符', trigger: 'blur' }
        ],
      },
    }
  },
  methods: {
    // handleImgUpload(blobInfo, success, failure) {
    //   this.baseUrl = '你的baseurl'
    //   const imgBase64 = `data:${blobInfo.blob().type};base64,${blobInfo.base64()}`
    //   const data = { img: [imgBase64] }
    //   // uploadImgage(data).then(res => {        // 传入success回调里的数据就是富文本编辑器里插入图片的src的值
    //   //   success(`${this.baseUrl}/${res.data[0]}`)
    //   // }).catch(() => { failure('error') })
    //   let formData = new FormData();
    //   formData.append('files', blobInfo.blob(), "DX.jpg");
    //   this.http.postFile('', formData).then(res => {
    //     success(this.fileUrl+res.data)
    //   }).catch(err => {});
    // },
    handleVideoUpload(fd, callback) {
      this.http.postFile('', fd).then(res => {
        if (res.succeeded) {
          callback(this.fileUrl + res.data);
        }
      }).catch(err => {
        if (err.errors) {
          this.$message({ type: 'error', message: err.errors || '' });
        }
      });
    },
    handleFileUpload(file, succFun) {
      const formData = new FormData();
      formData.append('files', file);
      this.http.postFile('', formData).then(res => {
        if (res.succeeded) {
          succFun(this.fileUrl + res.data[0], { text: file.name });
        }
      }).catch(err => {
        if (err.errors) {
          this.$message({ type: 'error', message: err.errors || '' });
        }
      });
    },
    //标签选择
    checkTag(val) {
      this.postForm.parentCatalogue = val;
      console.log(val, this.postForm.parentCatalogue)
      this.inputBlur();
      this.$forceUpdate();
    },
    //标签键盘事件
    inputBlur() {
      if (this.postForm.parentCatalogue.length > 20) {
        this.postForm.parentCatalogue = this.postForm.parentCatalogue.slice(0, 20);
      }
      this.parentCatalogue_length = this.postForm.parentCatalogue.length;
      this.$forceUpdate();
    },
    //链接地址键盘事件
    textareaBlur() {
      if (this.postForm.externalLink.length > 20) {
        this.postForm.externalLink = this.postForm.externalLink.slice(0, 500);
      }
      this.externalLink_length = this.postForm.externalLink.length;
      this.$forceUpdate();
    },
    //字体设置-点击事件
    fontClick(val, key) {
      this.titleStyleKV[key] = !val;
    },
    //删除多栏目投递
    removeCoumn(index) {
      this.coumn_list.splice(index, 1);
    },
    //添加多栏目投递
    addCoumn() {
      if (this.coumn_list.length == 3) { return; }
      this.coumn_list.push({ value: '' });
    },
    //退回-打开弹窗
    drawBack() {
      this.draw_back = true;
    },
    //退回-关闭弹窗
    drawBackClose() {
      this.draw_back = false;
    },
    // 退回新闻
    sendBackHande() {
      if (!this.sendBack.sendBackDesc) {
        return this.$message({ type: 'error', message: '退回备注不能为空!' });
      }
      this.sendBack.contentID = this.id;
      this.http.postJson('news-content-send-back', this.sendBack).then(res => {
        this.draw_back = false;
        this.$message({ type: 'success', message: '退回成功!' });
        this.backHistory();
      }).catch(err => {
        this.draw_back = false;
        this.$message({ type: 'error', message: '退回失败!' });
      })
    },
    //内容、链接切换
    handleClick(val) {
      if (val == this.activeName) {
        return;
      }
      this.activeName = val;
    },
    imgUrl(val) {
      this.postForm['cover'] = val[0];
      this.dialogUPimg = false;
    },
    //打开图标上传弹窗
    upImg() {
      this.dialogUPimg = true;
    },
    //图片上传-弹窗关闭
    handleClose(done) {
      done();
    },
    //打开-选择已有标签
    tagEditShow() {
      this.tag_edit = true;
    },
    //关闭-选择已有标签
    tagEditHide() {
      this.tag_edit = false;
    },
    //编辑器切换
    editorCheck(val) {
      this.contentEditor = val;
    },
    //预览
    previewPage() {
      var _this = this;
      this.setPostFormPas();
      if (!_this.postForm.title || !_this.postForm.content) {
        _this.$message({ type: 'info', message: '请填写标题和内容!' });
        return;
      }
      window.localStorage.setItem('news-page-preview', JSON.stringify(_this.postForm));
      setTimeout(() => {
        //这里还需要根据栏目选择的模板，确定预览某一个模板，默认是1
        if (_this.columnDeatils.defaultTemplate) {
          window.open(location.href.split('#')[0] + "#/admin_preview" + _this.columnDeatils.defaultTemplate + '?cid=' + this.columnID)
        }
      }, 200);
    },
    //改造提交数据
    setPostFormPas() {
      var _this = this;
      //新闻标题样式
      var list = [];
      for (var item in _this.titleStyleKV) {
        list.push({ key: item, value: _this.titleStyleKV[item] });
      }
      _this.postForm.titleStyleKV = list;
      //多栏目投递
      var coumn_list = '';
      _this.coumn_list.forEach(item => {
        if (coumn_list.indexOf(item.value) == -1) {
          coumn_list = coumn_list + item.value + ';';
        }
      });
      //扩展项
      _this.row_list.forEach(item => {
        _this.postForm[item.key] = item.input_val || '';
      })
      _this.postForm.contentEditor = _this.contentEditor || 1;
      _this.postForm.columnIDs = coumn_list;
      // if (_this.contentEditor == 1) {
      //   _this.postForm.content = tinyMCE.activeEditor.getContent() || '';//获取富文本信息
      // }
    },
    //表单提交
    submitForm(formName, val) {
      var _this = this;
      this.setPostFormPas();
      if (val == 9) { //表示退回
        this.draw_back = true;
      } else {
        console.log(_this.postForm.content, 'cont');
        _this.postForm['auditStatus'] = val;
        this.$refs[formName].validate((valid) => {
          if (!valid) {
            if (_this.postForm.title && _this.postForm.publisher && _this.postForm.status && _this.postForm.publishDate) {
              if (_this.activeName == 'div1') {
                if (_this.postForm.content) _this.postUrl();
              } else {
                if (_this.postForm.externalLink) _this.postUrl();
              }
            }
          } else {
            _this.postUrl();
          }
        });
      }
    },
    postUrl() {
      var _this = this;
      if (this.activeName == 'div1') {
        _this.postForm['externalLink'] = '';
      } else {
        _this.postForm['content'] = '';
      }
      if (_this.postForm['ExpirationDate'] == '') {
        _this.postForm['ExpirationDate'] = null;
      }
      if (_this.id) {
        this.http.postJsonParameter_url('news-content-update', _this.postForm, '/' + _this.columnID).then(res => {
          _this.$message({ type: 'success', message: '提交成功!' });
          _this.backHistory();
        }).catch(err => {
          _this.$message({ type: 'error', message: '提交失败!' });
        })
      } else {
        _this.postForm['columnID'] = _this.columnID;
        this.http.postJsonParameter_url('news-content-add', _this.postForm, '/' + _this.columnID).then(res => {
          if (res.succeeded) {
            _this.$message({ type: 'success', message: '提交成功!' });
            _this.backHistory();
          } else {
            _this.$message({ type: 'error', message: res.data.message || '提交失败' });
          }
        }).catch(err => {
          _this.$message({ type: 'error', message: '提交失败!' });
        })
      }
    }
  },
}
</script>

<style lang="less" scoped>
@import "../../../assets/admin/css/color.less";
@import "../../../assets/admin/css/style.less";
@import "../../../assets/admin/css/form.less";
@import "../../../assets/admin/css/information/add_news.less";

.edit-fwb {
  position: relative;
}

.table-pd .hint-num-max {
  right: 10px;
}
</style>

