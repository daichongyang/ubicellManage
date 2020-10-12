<template>  
  <section>
    <div class="cont_box">
      <div class="cont_box_left">
        <el-form :inline="true" :model="formSearch" class="margin10">
          <el-form-item label="">
            <el-input v-model="formSearch.name" placeholder="搜索部门名称"></el-input>
          </el-form-item>
          <el-form-item label="">
             <el-button @click="getInit">查询</el-button>
          </el-form-item>       
          <el-form-item label="">
             <el-button type="primary" @click="showAdd">添加</el-button>
          </el-form-item>
          <el-form-item label="">
            <el-button type="warning" @click="showupdata">修改</el-button>
          </el-form-item>
          <el-form-item label="">
            <el-button type="danger" @click="deleInfor">删除</el-button>
          </el-form-item>
        </el-form>
        <el-tree
          :data="dataTree"
          show-checkbox
          default-expand-all
          node-key="id"
          @node-click="treeClick"
          @check="checkInfor"
          :props="defaultProps"
          :filter-node-method="filterNode"
          ref="tree">
        </el-tree>
      </div>
      <div class="cont_box_right">
        <el-form :inline="true" :model="formSearch" class="marginRight">
          <el-form-item :label="changeHandle == 1?'新增':'修改'" style="margin:0px;">
          </el-form-item>
        </el-form>
        <el-form label-position="right" :rules="rules" label-width="80px" :model="formPush" ref='formPush'>
          <el-form-item label="上级" prop="parentId">
            <el-input v-model="formPush.parentName" :disabled="true"></el-input>
          </el-form-item>
          <el-form-item label="名称" prop="name">
            <el-input v-model="formPush.name"></el-input>
          </el-form-item>
          <el-form-item label="简称">
            <el-input v-model="formPush.abbreviation"></el-input>
          </el-form-item>
          <el-form-item label="描述">
            <el-input v-model="formPush.description"></el-input>
          </el-form-item>
          <el-form-item label="状态">
              <el-radio-group v-model="formPush.status">
                <el-radio :label="true">启用</el-radio>
                <el-radio :label="false">禁止</el-radio>
              </el-radio-group>
          </el-form-item>
          <el-form-item label="排序">
            <el-input-number :disabled="this.changeHandle == 1" v-model="formPush.sortValue" :min="min" :max="inputNumber"></el-input-number>
          </el-form-item>
          <el-form-item>
            <el-button v-if="changeHandle == 1" size="medium " @click="addTree('formPush')">新增</el-button>
            <el-button v-else size="medium " type="warning" @click="upTree('formPush')">修改</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </section>
</template>

<script>
import { orgTree,saveTree,updateTree,deleteTree } from '../../url/api';
export default {
  data(){
    return{
      min:0,
      nowName:'',//子集
      pName:'',//父级
      sortValue:'',//排序
      abbreviation:'',//简称
      description:'',//描述
      inputNumber:0,
      changeHandle:1,//1表示执行新增，0表示修改
      formSearch:{//查询条件
        name:'',
        status:1
      },
      formPush:{
        sortValue:0,
        status:true
      },//表单提交
      defaultProps: {//树状图key定义
        children: 'children',
        label: 'name'
      },
      dataTree: [],//树数据
      filterText: '',//输入的查询内容
      rules: {
        parentId:[{ required: true, message: '该项不能为空'}],
        name:[{ required: true, message: '该项不能为空'}]
      },
      delTree:[]//删除树
    }
  },
  watch: {
    filterText(val) {
      this.$refs.tree.filter(val);
    }
  },
  methods:{
    showupdata(){//切换修改状态
      this.changeHandle = 0;
      this.inputNumber =  this.formPush.sortValue || 0
      this.formPush.name = this.nowName
      this.formPush.parentName =this.pName
      this.formPush.abbreviation=this.abbreviation
      this.formPush.description=this.description
      this.inputNumber = this.formPush.sortValue = this.sortValue
    },
    showAdd(){//切换添加状态
      if(!this.formPush.parentId&&this.formPush.parentId!=0){
        this.$message('请先选择组织')
      }
      if(!this.formPush.parentName){
        this.formPush.parentName = this.nowName
      }
      this.formPush.parentName = this.nowName
      this.formPush.name = ''
      this.formPush.abbreviation=''
      this.formPush.description=""
      if(this.formPush.children){
        this.formPush.sortValue = this.inputNumber = this.formPush.children.length
      }else{
        this.formPush.sortValue = this.inputNumber = 0
      }

      this.changeHandle = 1
      // this.formPush={sortValue:0,status:true}
    },
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
      this.formPush = JSON.parse(JSON.stringify(data))
      this.nowName =this.formPush.name
      this.pName =this.formPush.parentName
      this.sortValue =this.formPush.sortValue
      this.abbreviation =this.formPush.abbreviation
      this.description =this.formPush.description
      if(!this.formPush.parentName){
        this.formPush.parentName = this.formPush.name
      }
      if(this.changeHandle == 1){
        this.formPush.name = ''
        this.formPush.parentName = this.nowName
        this.formPush.abbreviation=''
        this.formPush.description=''
        if(this.formPush.children){
         this.formPush.sortValue = this.inputNumber=this.formPush.children.length
        }else{
          this.formPush.sortValue = 0
        }
      }else{
        console.log(this.sortValue)
        if(this.formPush.children){
          this.inputNumber = this.sortValue
          this.formPush.parentName =this.pName
          this.formPush.abbreviation=this.abbreviation
          this.formPush.description=this.description
        }else{
          this.inputNumber = this.sortValue
          this.formPush.sortValue = this.sortValue
        }
      }
      console.log(data)
    },
    addTree(formName){//添加树状图node节点
      if(!this.formPush){
        this.$message("请先选择组织")
        return
      }
      this.$refs[formName].validate((valid) => {
        if (valid) {
          let params = {
            name:this.formPush.name,
            parentId:this.formPush.id,
            abbreviation:this.formPush.abbreviation,
            description:this.formPush.description,
            status:this.formPush.status,
            sortValue:this.formPush.sortValue
          }
          saveTree(params).then((res)=>{
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
      let params = JSON.parse(JSON.stringify(this.formPush))
      delete params.children
      delete params.parentName
      console.log(params)
      this.$refs[formName].validate((valid) => {
        if (valid) {
          updateTree(params).then((res)=>{
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
    checkInfor(data,ev) {//监听勾选
      console.log(ev);
      this.delTree = ev.checkedKeys
      if(this.delTree){
        this.formPush.parentId = this.delTree[0]
      }
      
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
  .cont_box_left,.cont_box_right{
    flex:1;
    background: transparent ;
    padding:10px;
  }
  .cont_box_left{
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
