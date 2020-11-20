<template>  
  <section>
    <div class="cont_box">
      <div class="cont_box_left">
        <el-form :inline="true" :model="formSearch" class="margin10">
          <el-form-item label="">
            <el-button type="primary" @click="dialog = true">角色绑定</el-button>
          </el-form-item>
          <el-form-item label="">
            <el-button type="warning" @click="changeHandle = 1,getList,formPush={}">重置</el-button>
          </el-form-item>
          <el-form-item label="">
            <!-- <el-button type="danger" @click="deleInfor">删除</el-button> -->
          </el-form-item>
        </el-form>
        <el-tree
          :data="formData"
          :props='defaultProps'
          :load="loadNode"
          lazy
          node-key="id"
          @node-click="treeClick"
          :filter-node-method="filterNode"
          :expand-on-click-node="false">
          <div class="custom-tree-node" slot-scope="{ node, data }">
            <span>{{ node.label }}</span>
            <!-- <span v-if="data.xqName">
              -小区名称：{{ data.xqName }}
              <el-button type="text" size="mini" @click="() => append(data,1)"> 启用 </el-button>
              <el-button type="text" size="mini" @click="() => append(data,0)"> 停用 </el-button>
              配置区域代号：<el-input v-model="data.sectionNo" style="width:100px;" size="small"></el-input>
              <el-button type="text" size="mini" @click="() => srueDate(data)"> 确定 </el-button>
            </span>
            <span v-if="data.houseNum">
              -房间号：{{ data.houseNum }}
              <el-button type="text" size="mini" @click="() => append(data,1)"> 启用 </el-button>
              <el-button type="text" size="mini" @click="() => append(data,0)"> 停用 </el-button>
              配置房间对讲号：<el-input v-model="data.callNum" style="width:100px;" size="small"></el-input>
              <el-button type="text" size="mini" @click="() => srueDate(data)"> 确定 </el-button>
            </span> -->

            <el-button v-if="!data.parentId&&data.parentId!=0" style="margin-left:30px;" type="danger" size="mini" @click="() => deleInfor(data)"> 删除 </el-button> 
          </div>
        </el-tree>
      </div>
      <div class="cont_box_right">
        <el-form :inline="true" :model="formSearch" class="marginRight">
          <el-form-item :label="changeHandle == 1?'新增':'修改'" style="margin:0px;">
          </el-form-item>
        </el-form>
        <el-form label-position="right" :rules="rules" label-width="80px" :model="formPush" ref='formPush'>
          <el-form-item label="所属组织" size="small" prop="orgId">
          <el-cascader
              ref="cascader"
              v-model="option1"
              :options="dataTree"
              :props="defaultProps2"
              @change="handleChange"
              clearable
            >
            </el-cascader>
          </el-form-item>
          <el-form-item label="角色名称" prop="name">
            <el-input v-model="formPush.name"></el-input>
          </el-form-item>
          <el-form-item label="描述">
            <el-input v-model="formPush.description"></el-input>
          </el-form-item>
          <el-form-item label="状态" prop="status">
              <el-radio-group v-model="formPush.status">
                <el-radio :label="true">启用</el-radio>
                <el-radio :label="false">禁止</el-radio>
              </el-radio-group>
          </el-form-item>
          <el-form-item>
            <el-button v-if="changeHandle == 1" size="medium " @click="addTree('formPush')">新增</el-button>
            <el-button v-else size="medium " type="warning" @click="upTree('formPush')">修改</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
    <!-- 添加 -->
    <el-dialog title="菜单绑定" :visible.sync="dialog">
      <div class="cont_box_right">
        <el-form label-position="right" :rules="rules" label-width="90px" :model="formPush" ref='addList'>
          <el-form-item label="角色" size="small">
            <el-cascader
                ref="cascader"
                v-model="option2"
                :options="formData"
                :props="defaultProps3"
                @change="handleChange1"
                clearable
              >
            </el-cascader>
          </el-form-item>
          <el-form-item label="菜单" size="small">
            <el-tree
              :data="menuList"
              :props='defaultProps'
              :check-strictly="checkStrictly"
              show-checkbox
              :default-expanded-keys="showmenuList"
              :default-checked-keys="showmenuList"
              @check="handleCheckChange"
              node-key="id"
              ref="rightsTree"
            >
            </el-tree>
          </el-form-item>
        </el-form>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button size="medium " @click="dialog = false">取 消</el-button>
        <el-button size="medium " @click="binding()">绑 定</el-button>
      </div>
    </el-dialog>
  </section>
</template>

<script>
import { menuList,bindmenuroleId,bindmenu,roletreeList,addroletreeList,updateroletreeList,deleteroletreeList,xqSelectList,orgTree } from '../../url/api';
export default {
  data(){
    return{
      option2:[],
      option1:[],
      checkStrictly:false,//控制树状图父级和子集的关联
      menuList:[],
      showmenuList:[],
      dialog:false,
      changeHandle:1,//1表示执行新增，0表示修改
      formSearch:{
        name:'',
        status:1
      },//查询条件
      formPush:{},//表单提交
      defaultProps: {//树状图key定义
        children: 'children',
        label: 'name'
      },
      dataTree: [],//树数据
      formData: [],//树数据
      rules: {
        name:[{ required: true, message: '该项不能为空'}],
        orgId:[{  required: true, message: '该项不能为空',trigger: 'blur'}],
        status:[{ required: true, message: '该项不能为空',trigger: 'change'}],
      },
      defaultProps2: {
        children: 'children',
        label: 'name',
        value: 'id',
        expandTrigger: 'hover',checkStrictly: true
      },
      defaultProps3: {
        children: 'data',
        label: 'name',
        value: 'id',
        expandTrigger: 'hover',checkStrictly: true
      },
      bindMenu:{
        id:'',
        menuIds:[]
      },
      delTree:[]//删除树
    }
  },
  methods:{
    getList(){
      let params = sessionStorage.getItem('userId')
      roletreeList(params).then((res)=>{//角色列表
        console.log(res)
        if(res.data.code == 200){
          this.formData = res.data.data
        }
      })   
    },
    loadNode(node, resolve) {
      if(node.level == 0){
        return resolve(node.data);
      }
      let data1=node.data.data||[]
      let data2 =node.data.children||[]
      let data3 =[...data1,...data2] 
      setTimeout(() => {
        const data = data3;
        resolve(data);
      }, 500);
    },
    getInit(){
      this.getlist()
      let org_tree={
        name:'',
        status:1
      }
      orgTree(org_tree).then((res)=>{
        console.log(res)
        if(res.data.code == 200){
          this.dataTree = res.data.data
        }
      })
      this.checkStrictly = true
      menuList({}).then((res)=>{//查询系统所有的菜单
        console.log(res)
        if(res.data.code == 200){
          this.menuList = res.data.data  
        }
      })
    },
    handleChange(value){
        this.formPush.orgId = this.option1[this.option1.length -1]
    },
    handleChange1(value){//绑定
      this.checkStrictly = true
      this.bindMenu.id = this.option2[this.option2.length -1]
      bindmenuroleId(this.bindMenu.id).then((res)=>{//角色菜单回显
        console.log(res)
        if(res.data.code == 200){
          this.showmenuList = res.data.data
          this.$nextTick(() => {
            this.$refs.rightsTree.setCheckedKeys(this.showmenuList);
            this.checkStrictly = false
          });
          // this.showmenuList = res.data.data
          this.bindMenu.menuIds = this.showmenuList
        }
      }) 
    },
    filterNode(value, data) {//树状图节点搜索
      if (!value) return true;
      return data.label.indexOf(value) !== -1;
    },
    treeClick(data){//树状图node节点点击事件,将该节点的数据填充，修改
      this.option1 = []
      this.changeHandle = 0;
      this.formPush = data
      this.option1 = [data.orgId]

      console.log(data)
    },
    addTree(formName){//添加树状图node节点
      if(!this.formPush.orgId){
        alert('请选择组织')
        return
      }
      this.$refs[formName].validate((valid) => {
        if (valid) {
          addroletreeList(this.formPush).then((res)=>{
            console.log(res)
            if(res.data.code == 200){
              this.$message({
                message: '添加成功',
                type: 'success'
              });
              this.getlist()
            }
          })
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
    upTree(formName){//修改树状图node节点
      let pramas= {
        id:this.formPush.id,
        name:this.formPush.name,
        orgId:this.formPush.orgId,
        status:this.formPush.status,
        description:this.formPush.description,
      }
      this.$refs[formName].validate((valid) => {
        if (valid) {
          updateroletreeList(pramas).then((res)=>{
            console.log(res)
            if(res.data.code == 200){
              this.$message({
                message: '修改成功',
                type: 'warning'
              });
              this.getlist()
            }
          })
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
    deleInfor(data){
      console.log(data)
      let params = [data.id]
      this.$confirm('确认删除吗？')
      .then(_ => {
        deleteroletreeList(params).then((res)=>{
          console.log(res)
          if(res.data.code == 200){
            this.$message('删除成功');
            this.getlist()
          }
        })
      })
      .catch(_ => {});

    },
    binding(){//角色绑定菜单
      console.log(this.bindMenu)
      bindmenu(this.bindMenu).then((res)=>{
        console.log(res)
        if(res.data.code == 200){
          this.$message({
            message: '绑定成功',
            type: 'success'
          });
        }
        this.dialog = false
      })
    },
    handleCheckChange(checkedNodes, obj ) {//树状图选中
      console.log(obj);
      this.bindMenu.menuIds = this.$refs.rightsTree.getCheckedKeys().concat(this.$refs.rightsTree.getHalfCheckedKeys())
      console.log(this.$refs.rightsTree.getCheckedKeys().concat(this.$refs.rightsTree.getHalfCheckedKeys()),"dfdff");
    },
    getTreeArr(id,option){//回显遍历组织id
      this.option1.unshift(id)

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
