<template>
  <div>
    <el-table :data="tableData" ref="singleTable" highlight-current-row border row-key="id" class="load_table">
      <el-table-column type="index" width="50" label="序号" align="center" ></el-table-column>
      <el-table-column prop="id" width="50" label="id" align="center" ></el-table-column>
      <el-table-column prop="name" label="姓名" align="center" ></el-table-column>
      <el-table-column prop="sex" label="性别" align="center" ></el-table-column>
      <el-table-column prop="height" label="年龄" align="center" ></el-table-column>
      <el-table-column label="操作" align="center" width="320">
        <template slot-scope="scope">
          <el-button size="mini" icon="el-icon-sort">排序</el-button>
          <el-button size="mini" icon="el-icon-edit">编辑</el-button>
          <el-button size="mini" icon="el-icon-delete">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <div class="btns">
      <el-button type="primary" @click="submitClick()">获取排序</el-button>
    </div>
  </div>

</template>
<style scoped>
.btns{
  padding: 50px;
  text-align: center;
}
</style>
<script>
export default {
  data() {
    return {
      tableData: [
        {id:'1',name:'张三1',height:'11',sex:'男'},
        {id:'2',name:'李四2',height:'22',sex:"男"},
        {id:'3',name:'王五3',height:'33',sex:"男"}, 
        {id:'4',name:'周六4',height:'44',sex:"男"}, 
        {id:'5',name:'赵琪5',height:'55',sex:"男"}
      ]
    };

  },
  mounted() {
    this.dragSort();
  },
  methods:{
    //表格拖动排序
    dragSort() {
      const el = this.$refs.singleTable.$el.querySelectorAll(
        ".el-table__body-wrapper > table > tbody"
      )[0];
      this.sortable = Sortable.create(el, {
        animation: 150,
        ghostClass: "sortable-ghost",
        setData: function(dataTransfer) {
          dataTransfer.setData("Text", "");
        },
        onStart: function (evt) {
            evt.oldIndex;
            console.log(evt)
        },
        onEnd: e => {
          //e.oldIndex为拖动一行原来的位置，e.newIndex为拖动后新的位置
          const targetRow = this.tableData.splice(e.oldIndex, 1)[0];
          this.tableData.splice(e.newIndex, 0, targetRow);
          console.log(this.tableData,'排序后的数据')
          let dragId = this.tableData[e.newIndex].id; //拖动行的id
          let oneId, twoId;
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
          console.log(dragId,oneId,twoId)
          // this.postRequest({//这里是提交
          //   url: this.dragUrl,
          //   data: {
          //     dragId: dragId,
          //     oneId: oneId,
          //     twoId: twoId,
          //     projectId: ""
          //   },
          //   success: result => {
          //     if (result) {
          //       this.$message({
          //         message: "拖动排序成功!",
          //         type: "success"
          //       });
          //     } else {
          //       this.$message({
          //         message: "拖动排序失败！",
          //         type: "error"
          //       });
          //     }
          //   }
          // });

        }//onEnd
      });
    },
    submitClick(){
      console.log('排序后的顺序：',this.tableData);
    },
  }
};
</script>