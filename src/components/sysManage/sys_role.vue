<template>  
  <section>
    <div class="cont_box">
      <div class="cont_box_left">
        <el-form :inline="true" :model="formSearch" class="margin10">
          <el-form-item label="">
            <el-button type="primary" @click="dialog = true">角色绑定</el-button>
          </el-form-item>
          <el-form-item label="">
            <el-button type="warning" @click="changeHandle = 1,getlist,formPush={}">重置</el-button>
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

            <el-button v-if="!data.parentId&&data.parentId!=0&&$root.btnControl.find(item=>item=='delete')" style="margin-left:30px;" type="danger" size="mini" @click="() => deleInfor(data)"> 删除 </el-button> 
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
          <el-form-item v-if="$root.btnControl.find(item=>item=='add')">
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
            <el-row >
              <el-col :span="12">
                <el-tree
                  :data="menuList"
                  :props='defaultProps'
                  :check-strictly="checkStrictly"
                  show-checkbox
                  :default-expanded-keys="showmenuList"
                  :default-checked-keys="showmenuList"
                  @check="handleCheckChange"
                  @node-click="treeClick1"
                  node-key="id"
                  ref="rightsTree"
                >
                </el-tree>
              </el-col>
              <el-col :span="12">
                <div class="colorBlue">{{btnFather}}</div>
                <el-table :data="formData11" :row-key="getkey" style="width: 100%" stripe @selection-change="handleSelectionChange" ref="multipleTable">
                  <el-table-column type="selection" width="55" :reserve-selection="true" label="全选"></el-table-column>
                  <el-table-column prop="code" label="code"></el-table-column>
                  <el-table-column prop="name" label="名称"></el-table-column>
                </el-table>
              </el-col>
            </el-row>
          </el-form-item>
        </el-form>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button size="medium " @click="dialog = false">取 消</el-button>
        <el-button size="medium " @click="binding()" :loading="dialoggg">绑 定</el-button>
      </div>
    </el-dialog>
  </section>
</template>

<script>
import { menuList,bindmenuroleId,bindmenu,roletreeList,addroletreeList,updateroletreeList,deleteroletreeList,xqSelectList,orgTree,authority } from '../../url/api';
export default {
  data(){
    return{
      option2:[],
      option1:[],
      checkStrictly:false,//控制树状图父级和子集的关联
      menuList:[],
      showmenuList:[],
      dialog:false,
      dialoggg:false,
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
        menuIds:[],
        resources:[],
      },
      formData11:[],
      formData1:[],
      resources:[//只记录useAble为true的对象

      ],
      fatherCheckedObj:'',
      delTree:[],//删除树
      btnFather:'',
      deleBatch:[]//删除树
    }
  },
  methods:{
    getkey(row){
      return row.id
    },
    treeClick1(data){//树状图node节点点击事件,将该节点的数据填充，修改
    this.btnFather = data.name
    this.formData11= data.resources
      if(!data.isClicked){
        data.resources.forEach(item=>{
          item.parentId=data.parentId
          if(item.useAble){
            this.$refs.multipleTable.toggleRowSelection(item);
          }
        })
      }
      // // this.$refs.multipleTable.clearSelection();
      data.isClicked = true
      // // this.getauthority(data)
      console.log(data)
    },
    handleSelectionChange(val,self) {//列表多选//已经选中中左边的所有对象
      this.formData1 = val
      // this.formData11.forEach(item=>{
      //   if(this.formData1.find(ii=>item.id==ii.id)){
          
      //   }else{
      //     item.useAble = false
      //   }
      // })
      // this.formData1= this.formData1.filter(item=>{
      //   val.forEach(ii=>{
      //     if(ii.id == item.id){
      //       item.useAble = true
      //       // this.$refs.multipleTable.toggleRowSelection(item);
      //     }else{
      //       item.useAble = false
      //       // this.$refs.multipleTable.clearSelection(item);
      //     }
      //   })
      //   return item
      // })
      console.log(val)
      // val = val.filter(item=>{
      //   if(this.formData1.find(ii=>ii.id == item.id)){
      //     item.useAble = true
      //   }else{
      //     item.useAble = false
      //   }
        
      //   return item
      // })

    },
    getauthority(data){//查看用户菜单有权限资源列表
      
      if(!this.bindMenu.id){
        this.$message("请先选择角色")
        return
      }
      let params = {
        menuId:data.id,
        bindMenuid: this.bindMenu.id,
      }
      authority(params).then(res=>{
        console.log(res)
        if(res.data.code ==200){
          this.formData1 = res.data.data
          // console.log(this.checkedObj,this.checkedObj.resources.length)
          this.formData1.forEach(item=>{
            if(item.useAble){
              this.$refs.multipleTable.toggleRowSelection(item);
            }
          })
        }
      })
    },
    getlist(){
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
    },
    getmenuList(){
      console.log(this.option2)
      let params = this.option2[this.option2.length -1]
      this.formData11=[]
      this.$refs.multipleTable.clearSelection();
      if(params){
        this.menuList=[]
        menuList(params).then((res)=>{//查询系统所有的菜单
          console.log(res)
          if(res.data.code == 200){
            this.dialog = true
            this.menuList = res.data.data
            this.huixian()
          }
        })
      }
      
    },
    handleChange(value){
        this.formPush.orgId = this.option1[this.option1.length -1]
    },
    handleChange1(value){//绑定角色
      this.getmenuList()//左边列表
    },
    huixian(){
      this.checkStrictly = true
      this.bindMenu.id = this.option2[this.option2.length -1]
      bindmenuroleId(this.bindMenu.id).then((res)=>{//角色菜单回显
        console.log(res)
        if(res.data.code == 200){
          this.showmenuList = res.data.data

            this.$refs.rightsTree.setCheckedKeys(this.showmenuList);
            this.checkStrictly = false

          this.$nextTick(() => {
            setTimeout(()=>{
              console.log(this.$refs.rightsTree.getCheckedNodes())
              this.fatherCheckedObj = this.$refs.rightsTree.getCheckedNodes().filter(item=>{
                item.isClicked = false//表示没有点击
                return item
              })
            },1000)
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
      this.dialoggg = true
      this.bindMenu.resources= []
      let checkedObj =this.$refs.rightsTree.getCheckedNodes()
      checkedObj.forEach(item=>{//收集已勾选，未被点击的树状对象，左边的
      if(item.isClicked){
        this.formData1.forEach(ii=>{//右边的左右对象
          this.bindMenu.resources.push(ii.id)
        })
      }else{
        item.resources.forEach(ii=>{//右边的左右对象
          if(ii.useAble){
            this.bindMenu.resources.push(ii.id)
          }
          
        })
      }
        // this.formData1.forEach(ii=>{//右边的左右对象
        //   if(item.id==ii.menuId){
        //     this.bindMenu.resources.push(ii.id)
        //   }else{
        //     item.resources.forEach(tt=>{//没有被点击过的
        //       if(tt.useAble){
        //         this.bindMenu.resources.push(tt.id)
        //       }
        //     })
        //   }
        // })
      })
      let aa = this.bindMenu.resources
      this.bindMenu.resources = [...new Set(aa)]
      console.log(this.bindMenu)
      bindmenu(this.bindMenu).then((res)=>{
        console.log(res)
        if(res.data.code == 200){
          this.$message({
            message: '绑定成功',
            type: 'success'
          });
        }
        this.dialoggg = false
        this.dialog = false
      })
    },
    handleCheckChange(checkedNodes, obj) {//树状图选中
      console.log(obj);
      this.bindMenu.menuIds = this.$refs.rightsTree.getCheckedKeys().concat(this.$refs.rightsTree.getHalfCheckedKeys())||[]
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
  .colorBlue{
    margin-left:10px;
    color:#a1d6f4;
  }
</style>
