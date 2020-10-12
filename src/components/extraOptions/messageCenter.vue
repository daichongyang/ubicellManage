<template>
  <section>
    <div class="nav_options">
      <div class="nav_option" :class="{nav_option_active:isActive == 1}" @click="isActive=1">
        <span>报警信息</span>
      </div>
      <div class="nav_option" :class="{nav_option_active:isActive == 2}" @click="isActive=2">
        <span>公告通知</span>
      </div>
      <div class="nav_option" :class="{nav_option_active:isActive == 3}" @click="isActive=3">
        <span>审核信息</span>
      </div>
      <div class="nav_option" :class="{nav_option_active:isActive == 4}" @click="isActive=4">
        <span>系统信息</span>
      </div>
      <div class="nav_option" :class="{nav_option_active:isActive == 5}" @click="isActive=5">
        <span>平台信息</span> 
      </div>
    </div>
    <div class="cont_box">
      <div class="cont_box_left">
        <el-tree
          :data="dataTree"
          node-key="id"
          default-expand-all
          @node-click="treeClick"
          :props="defaultProps"
          :filter-node-method="filterNode"
          ref="tree">
        </el-tree>
      </div>
      <div class="cont_box_right">
        <el-table :data="tableData" stripe @selection-change="handleSelectionChange" style="width: 100%" :header-row-style="{background:'rgba(15, 45, 79, 0)'}">
          <el-table-column type="selection" width="55"></el-table-column>
          <el-table-column prop="date" label="全选" width="180"></el-table-column>
          <el-table-column prop="name" align="left">
            <template slot="header" slot-scope="scope">
              <el-button size="small">删除消息</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </div>
    <div class="pagination">
      <el-pagination
        layout="prev, pager, next"
        prev-text="上一页"
        next-text="下一页"
        :total="500">
      </el-pagination>
    </div>
  </section>
</template>

<script>
import { orgTree,saveTree,updateTree,deleteTree } from '../../url/api';
export default {
  data(){
    return{
      tableData: [{
        date: '2016-05-02',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      }, {
        date: '2016-05-04',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1517 弄'
      }, {
        date: '2016-05-01',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1519 弄'
      }, {
        date: '2016-05-03',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1516 弄'
      }],
      isActive:1,
      formSearch:{
        label:'',
        status:1
      },//查询条件
      formPush:{
        sortValue:0,
        status:true
      },//表单提交
      defaultProps: {//树状图key定义
        children: 'children',
        label: 'label'
      },
      dataTree: [],//树数据
      rules: {
        parentId:[{ required: true, message: '该项不能为空'}],
        label:[{ required: true, message: '该项不能为空'}]
      },
      delTree:[]//删除树
    }
  },
  methods:{
    getInit(){
      orgTree(this.formSearch).then((res)=>{
        console.log(res)
        if(res.data.code == 200){
          this.dataTree = res.data.data
        }
      })
    },
    filterNode(value, data) {//树状图节点搜索
      if (!value) return true;
      return data.label.indexOf(value) !== -1;
    },
    treeClick(data){//树状图node节点点击事件,将该节点的数据填充，修改
      this.changeHandle = 0;
      console.log(data)
    },
    addTree(formName){//添加树状图node节点
      this.$refs[formName].validate((valid) => {
        if (valid) {
          saveTree(this.formPush).then((res)=>{
            console.log(res)
            if(res.data.code == 200){
              this.$message({
                message: '添加成功',
                type: 'success'
              });
              this.getInit()
            }
          })
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
    upTree(formName){//修改树状图node节点
      this.$refs[formName].validate((valid) => {
        if (valid) {
          updateTree(this.formPush).then((res)=>{
            console.log(res)
            if(res.data.code == 200){
              this.$message({
                message: '修改成功',
                type: 'warning'
              });
              this.getInit()
            }
          })
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
    handleSelectionChange(data,ev) {//监听勾选
      console.log(data,ev);
      this.delTree = ev.checkedKeys
    },
    deleInfor(){
      this.$confirm('确认删除吗？')
      .then(_ => {
        deleteTree(this.delTree).then((res)=>{
          console.log(res)
          if(res.data.code == 200){
            this.$message('删除成功');
            this.getInit()
          }
        })
      })
      .catch(_ => {});

    }
  },
  mounted(){
    this.getInit()
  },
}
</script>

<style scoped>
  .cont_box{
    width:100%;
    display: flex;
  }
 .cont_box_right{
    flex:1;
    background: transparent ;
    padding:10px;
  }
  .cont_box_left{
    background: transparent;
    padding: 10px;
    width:220px;
    margin-right:10px;
  }
  .margin10{
    margin-bottom:10px;
  }
  .marginRight{
    margin-bottom:10px;
    border-bottom: 1px solid #eee;
  }
  .cont_box_right .el-form-item{
    margin-bottom:20px;
  }
  
</style>