<!---新闻发布-栏目管理-新增栏目-->
<template>
  <div class="admin-warp-page">
      <el-form :model="postForm" :rules="rules" ref="postForm" label-width="120px" class="admin-form">
        <div class="form-content">
          <el-form-item label="栏目名称" prop="title">
            <el-input v-model="postForm.title" placeholder="请输入栏目名称"></el-input>
          </el-form-item>
          <el-form-item label="栏目别名" prop="alias">
            <el-input v-model="postForm.alias" placeholder="请输入栏目别名"></el-input>
          </el-form-item>
          <div class="user-form-item">
            <label class="u-label"><span class="el-input">栏目标签</span></label>
            <div class="u-list">
              <input type="text" class="u-input" v-model="postForm.label" placeholder="标签可以为栏目设置分类，方便筛选"/>
              <!-- <el-popover popper-class="el-down-alert" placement="bottom" width="400" trigger="click">
                <div>内容</div>
                <el-button class="u-btn-r" icon="el-icon-search" size="medium" slot="reference" type="primary">选择已有标签</el-button>
              </el-popover> -->
              <el-button class="u-btn-r" icon="el-icon-search" size="medium" slot="reference" type="primary" @click="tagEditShow()">选择已有标签</el-button>
              <tagEdit ref="editTag" :dataList="tag_edit_data" @tagEditHide="tagEditHide" @checkTag="checkTag" v-if="tag_edit"></tagEdit>
            </div>
          </div>
          <el-form-item label="多终端同步">
            <el-switch :active-value="1" :inactive-value="0" v-model="postForm.terminals"></el-switch>
          </el-form-item>
          <el-form-item label="状态" prop="status">
            <el-radio-group v-model="postForm.status">
              <el-radio :label="1">启用</el-radio>
              <el-radio :label="2">下架</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="内容扩展项">
            <el-checkbox-group v-model="postForm.extension">
              <el-checkbox :label="item.key" name="type" @change="extensionCheck(item)" v-for="(item,index) in scalable_data" :key="index+'extension'">{{item.value}}</el-checkbox>
              <el-button size="medium" type="primary" @click="extendContent()">自定义扩展</el-button>
            </el-checkbox-group>
          </el-form-item>
          <el-form-item label="栏目地址" prop="a" v-if="is_edit">
            <el-input v-model="postForm.linkUrl" disabled="false" placeholder="在门户中访问该栏目的链接地址"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button icon="el-icon-close" size="medium" @click="$root.backClick()">取消</el-button>
            <el-button icon="el-icon-check" size="medium" type="primary" @click="nextStep('postForm')">下一步</el-button>
          </el-form-item>
        </div>
      </el-form>
      <el-dialog append-to-body title="自定义扩展" :visible.sync="extend_content" width="400px" :close-on-click-modal="false" :before-close="handleClose">
        <div>
        <h1 class="d-title"><i class="el-icon-menu"></i> <span>自定义扩展添加</span></h1>
          <el-form>
            <el-form-item label="">
              <el-input v-model="scalable_input" placeholder="请输入内容名称(2-20个字符)"></el-input>
            </el-form-item>
          </el-form>
        </div>
        <span slot="footer" class="dialog-footer">
            <el-button icon="el-icon-close" size="medium" @click="scalableClose()">取消</el-button>
            <el-button icon="el-icon-check" size="medium" type="primary" @click="scalableSub()">保存</el-button>
        </span>
      </el-dialog>
  </div>
</template>

<script>
import tagEdit from "../../model/tagEdit";
export default {
  name: 'index',
  components:{tagEdit},
  props:{
    dataDetails:JSON.parse(window.sessionStorage.getItem('news-column')||'{}'),
    is_edit:false,
  },
  watch: {
    dataDetails: {
      deep: true,  // 深度监听
      handler(newVal,oldVal) {
         this.postForm.title = newVal.title||'';
         this.postForm.alias = newVal.alias||'';
         this.postForm.terminals = newVal.terminals;
         this.postForm.linkUrl = newVal.linkUrl||'';
         this.postForm.label = newVal.label||'';
         if(newVal.extensionKV && newVal.extensionKV.length>0){
           for(let i=0;i<newVal.extensionKV.length;i++){
             this.postForm.extension.push(newVal.extensionKV[i].key);//将选中值添加到选中数组中
             if(newVal.extensionKV[i].key.indexOf('ExpendFiled')>-1){//是否为自定义，自定义就单独最佳到显示列表上。
               this.scalable_data.push(newVal.extensionKV[i]);
               this.zdy_check.splice(this.zdy_check.indexOf(newVal.extensionKV[i].key),1);//这里还要做排除操作，是为了排除已经暂用的ExpendFiled；
             }
           }
         }
         this.postForm.status = newVal.status||'';
      }
    }
  },
  created(){
    this.bus.$on('collapse', msg => {
        this.$root.collapse = msg;
    })
    this.initData();
  },
  mounted(){
    /**
     * 这里是否要考虑存入缓存，便于刷新时也能保留数据，新增时，就清空缓存，或是取消时也需要清空缓存。或者是页面离开时
     */
  },
  data () {
    return {
      extend_content:false,
      tag_edit:false,
      tag_edit_data:[],//已有标签
      scalable_input:'',//扩展输入框
      zdy:['ExpendFiled1','ExpendFiled2','ExpendFiled3','ExpendFiled4','ExpendFiled5'],//内容扩展项-自定义选项-后台固定key
      zdy_check:['ExpendFiled1','ExpendFiled2','ExpendFiled3','ExpendFiled4','ExpendFiled5'],//可选择的
      scalable_data:[ //内容扩展项-列表
        {key:'Author',value:'作者'},
        {key:'Keywords',value:'关键词'},
        {key:'ExpirationDate',value:'失效日期'},
        {key:'JumpLink',value:'跳转链接'},
        {key:'ParentCatalogue',value:'标签'},
      ],
      postForm: {
          title: '',//栏目名称 必填，2-50个字符
          alias: '',//栏目别名 0-50个字符
          terminals:1,//多终端 默认开
          labelKV:'',//栏目标签  0-100个字符
          linkUrl:'',//栏目地址
          status:1,//状态  必填
          extension:[],//内容扩展项 管理员可以自定义输入扩展选项（2-20个字符），最多扩展5项内容
      },
      rules: {
          title: [
              { required: true, message: '请输入内容', trigger: 'blur' },
              { min: 2, max: 50, message: '长度在 2 到 50 个字符', trigger: 'blur' }
          ],
          alias: [
              { min: 2, max: 50, message: '长度在 2 到 50 个字符', trigger: 'blur' }
          ],
          status: [
              { required: true, message: '请输入内容', trigger: 'blur' }
          ]
      },
    }
  },
  
  methods:{
    initData(){
      //获取标签列表
      this.http.getPlain('lable-info-get-by-type','type=1').then(res=>{
        this.tag_edit_data = res.data||[];
      }).catch(err=>{})
    },
    //标签选择
    checkTag(val){
      this.postForm.label = val;
      this.$forceUpdate();
    },
    //打开-选择已有标签
    tagEditShow(){
      this.tag_edit = true;
    },
    //关闭-选择已有标签
    tagEditHide(){
      this.tag_edit = false;
    },
    //关闭-自定义扩展
    handleClose(){
      this.scalable_input = '';
      this.extend_content = false;
    },
    //关闭-自定义扩展
    closeClick(){
      this.extend_content = false;
    },
    //打开-自定义扩展
    extendContent(){
      this.extend_content = true;
    },
    //自定义扩展-取消
    scalableClose(){
      this.scalable_input = '';
      this.extend_content = false;
    },
    //标签选择-选择的是自定义的，就删除
    extensionCheck(val){
      if(this.zdy.indexOf(val.key)>-1){//表示存在于自定义中，需删除此行
        this.scalable_data.forEach((item,index)=>{
          if(item.key == val.key){
            this.zdy_check.push(item.key);
            this.scalable_data.splice(index,1);
          }
        })
      }
    },
    //自定义扩展-保存
    scalableSub(){
      //保存之前需先判断是否存在，且只能添加5个，
      if(this.scalable_data.length>=10){
        this.$message({type: 'error',message: '自定义扩展内容最多只能添加5个'}); 
      }else{
        var is_exist = false;//是否已存在
        this.scalable_data.forEach(item=>{
          if(item.title == this.scalable_input){
            is_exist = true;
            return;
          }
        })
        if(!is_exist){
          //这个地方的ExpendFiled1值，要在列表没有的选择。//从this.zdy_check列表中获取，获取了之后，在push后要移出
          console.log(this.zdy_check);
          this.scalable_data.push({key:this.zdy_check[0],value:this.scalable_input});
          this.postForm.extension.push(this.zdy_check[0]);
          this.zdy_check.splice(0,1);//这里移出 this.zdy_check
          this.scalable_input = '';
          this.extend_content = false;
        }else{
          this.$message({type: 'error',message: '已存在相同扩展项'});
        }
      }
      console.log(this.scalable_data,this.zdy_check);
    },
    //下一步
    nextStep(formName) {
      var list =[];
      this.postForm.extension.forEach(item=>{
        this.scalable_data.forEach(item1=>{
          if(item == item1.key){
            list.push(item1);
            return;
          }
        })
      })
      this.postForm.extensionKV = list;
      this.$refs[formName].validate((valid) => {
          if (valid) {
            this.$emit('nextStep',{n:2,step:'next',data:this.postForm});
          }
      });
    },
  },
}
</script>

<style lang="less" scoped>
@import "../../../../assets/admin/css/color.less";/**颜色配置 */
@import "../../../../assets/admin/css/style.less";/**颜色配置 */
@import "../../../../assets/admin/css/form.less";
  .content{
    border-radius: 4px;
    box-shadow: 0px 5px 5px rgba(0, 0, 0, 0.02);
    .admin-form{
        background-color: @fff;
    }
    .form-content{
        padding-top: 40px;
        padding-right: 24px;
        box-shadow: 0px 5px 5px rgba(0, 0, 0, 0.02);
        border-radius: 4px;
        /deep/.el-checkbox:last-of-type{
          margin-right: 24px;
        }
        .m-l{
          margin-left: 24px;
        }
      /deep/.el-input{
        max-width: 500px;
      }
      /deep/.el-date-editor{
        max-width: 500px;
        width: 100%;
      }
      .user-form-item{
        .u-label{
          width: 120px !important;
        }
        .u-list{
          margin-left: -4px;
          padding-right:130px;
        }
        .u-btn-r{
          width: 130px;
        }
      }
    }
  }
  /***标签选择弹窗 */
  .user-check-dialog{
    /deep/ .el-tag{
      margin: 10px;
    }
  }

/****弹窗标题 */
/deep/.el-dialog__body{
  padding: 30px;
  padding-bottom: 10px;
}
.d-title{
    color: @34395E;
    font-size: 14px;
    margin-bottom: 10px;
    span{
        vertical-align: middle;
    }
    i{
        font-size: 16px;
        vertical-align: middle;
    }
}
</style>
