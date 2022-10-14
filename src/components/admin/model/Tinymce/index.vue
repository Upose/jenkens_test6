<!--
 * @Description: 
 * @Author: gongqin
 * @Date: 2022-10-13 10:25:26
 * @LastEditors: gongqin
 * @LastEditTime: 2022-10-14 10:12:47
-->
<template>
  <div class="">
    <textarea :id="editorId" v-model="contValue"></textarea>
  </div>
</template>

<script>
// import VueUeditorWrap from 'vue-ueditor-wrap'
export default {
  props: {
    contValue: String,
    editorId: {
      type: String,
      default: 'mytextarea'
    },
    fileUrl: {
      type: String,
      default: window.localStorage.getItem('fileUrl')
    },
    width: {
      type: Number,
      default: 650
    },
    height: {
      type: Number,
      default: 450
    },
    maxLen: {
      type: String,
      default: '50000000',
    },
  },
  data() {
    return {
      // fileUrl: window.localStorage.getItem('fileUrl'),
      contValue: '',
      img_list: [],//富文本图片路径
    }
  },
  watch: {
    contValue: {
      deep: true,
      handler(newValue) {
        this.notifyParentValueChange(newValue);
      }
    },
  },
  mounted() {
    this.tinymceInit();
  },
  beforeDestroy() {
    // 销毁组件前销毁编辑器
    // window.tinymce.get('this.editorId').destroy();
  },
  methods: {
    //sync 同步props值
    notifyParentValueChange(val) {
      this.contValue = val;
      this.$emit('update:contValue', val);
    },
    tinymceInit() {
      var _this = this;
      tinymce.init({
        selector: `#${_this.editorId}`,
        language: 'zh_CN',
        height: this.height,
        min_height: this.height,
        width: this.width,
        // plugins: 'code, image, autoresize, lists',
        // toolbar: 'code image',
        toolbar_mode: 'wrap',
        branding: false,
        // toolbar_sticky: true,
        resize: true,
        fontsize_formats: '11px 12px 14px 16px 18px 24px 36px 48px',
        font_formats: '微软雅黑=Microsoft YaHei,Helvetica Neue,PingFang SC,sans-serif;苹果苹方=PingFang SC,Microsoft YaHei,sans-serif;宋体=simsun,serif;仿宋体=FangSong,serif;黑体=SimHei,sans-serif;Arial=arial,helvetica,sans-serif;Arial Black=arial black,avant garde;Book Antiqua=book antiqua,palatino;',
        // plugins: 'image,wordcount,charmap,code,hr,lists,advlist,emoticons,fullscreen,help,insertdatetime,link',

        plugins: 'code  quickbars print preview searchreplace autolink directionality powerpaste visualblocks visualchars image link media template codesample table charmap hr pagebreak nonbreaking anchor insertdatetime advlist lists wordcount textpattern help emoticons autosave bdmap indent2em autoresize importword kityformula-editor',
        toolbar: 'code undo redo restoredraft | cut copy paste pastetext | forecolor backcolor bold italic underline strikethrough link anchor codesample | alignleft aligncenter alignright alignjustify outdent indent | \
          styleselect formatselect fontselect fontsizeselect | bullist numlist | blockquote subscript superscript removeformat | \
          table image  media charmap emoticons hr pagebreak insertdatetime print preview | bdmap indent2em lineheight importword kityformula-editor',
        images_upload_handler: (blobInfo, success, failure) => { // 图片上传
          console.log(blobInfo, success, failure);
          this.handleImgUpload(blobInfo, success, failure)
        },

        powerpaste_word_import: "merge",
        powerpaste_html_import: 'merge',
        powerpaste_allow_local_images: true,
        powerpaste_keep_unsupported_src: true,
        paste_data_images: true,
        file_picker_types: 'media',
        media_live_embeds: true,
        file_picker_callback: (callback, value, meta) => {
          let input = document.createElement('input');
          input.setAttribute('type', 'file');
          input.setAttribute("accept", ".mp4");
          let that = this;
          input.onchange = function () {
            let file = this.files[0];
            let fd = new FormData();
            fd.append("files", file);
            that.handleVideoUpload(fd, callback);
          }
          input.click();
        },
        video_template_callback: data => {
          console.log(data)
          return '<span class="mce-preview-object mce-object-video" contenteditable="false" data-mce-object="video" data-mce-p-allowfullscreen="allowfullscreen" data-mce-p-frameborder="no" data-mce-p-scrolling="no" data-mce-p-src=' + data.source + ' data-mce-p-width=' + data.width + ' data-mce-p-height=' + data.height + ' data-mce-p-controls="controls" data-mce-html="%20"> <video width=' + data.width + ' height=' + data.height + ' controls="controls"> <source src=' + data.source + ' type=' + data.sourcemime + '></source> </video> </span>';
        },
        init_instance_callback: (editor) => {
          tinyMCE.activeEditor.on('paste', function (e) {
            setTimeout(() => {
              var html = null;
              e.path.forEach(item => {
                if (item.tagName == 'body' || item.tagName == 'BODY') {
                  html = item.innerHTML;
                  var img_data = [];
                  html.replace(/<img [^>]*src=['"]([^'"]+)[^>]*>/g, function (match, capture) {
                    img_data.push(capture);
                  });
                  _this.img_list = img_data;
                  console.log(img_data, 'img_data');
                  var content = tinyMCE.activeEditor.getContent();
                  _this.notifyParentValueChange(content)
                }
              })
            }, 50);
          });
          editor.on('input', (e) => {
            // 内容是否超长
            if (tinyMCE.activeEditor.getContent().length > parseInt(this.maxLen)) {
              // 内容超出还原
              window.tinymce.activeEditor.setContent(this.contValue);
              // 禁止再输入
              window.tinymce.activeEditor.getBody().blur();
              this.$message({
                message: '内容超长！',
                type: 'error'
              })
            } else {
              // 更新富文本
              var content = tinyMCE.activeEditor.getContent();
              this.notifyParentValueChange(content)
            }
          });
        }
      });
    },
    handleImgUpload(blobInfo, success, failure) {
      this.baseUrl = '你的baseurl'
      const imgBase64 = `data:${blobInfo.blob().type};base64,${blobInfo.base64()}`
      const data = { img: [imgBase64] }
      // uploadImgage(data).then(res => {        // 传入success回调里的数据就是富文本编辑器里插入图片的src的值
      //   success(`${this.baseUrl}/${res.data[0]}`)
      // }).catch(() => { failure('error') })
      let formData = new FormData();
      formData.append('files', blobInfo.blob(), "DX.jpg");
      this.http.postFile('', formData).then(res => {
        success(this.fileUrl + res.data)
      }).then(err => { });
    },
  },
}
</script>

<style>
.tox .tox-pop__dialog {
  display: none;
}

.tox .tox-pop.tox-pop--left::before {
  display: none;
}
</style>
