<template>
  <section class="form_content">
    <el-form :inline="true" :model="formSearch" class="form_inline">
      <el-form-item label="所属组织" size="small">
       <el-cascader
          ref="cascader"
          v-model="option1"
          :options="zuzhiTree"
          :props="defaultProps2"
          @change="zuzhiChange"
          clearable
         >
        </el-cascader>
      </el-form-item>
    </el-form>
    <el-form :inline="true" :model="formSearch">
      <el-form-item label="选择小区" size="small" prop="xqId">
        <el-select v-model="formSearch.xqId" placeholder="请选择小区">
          <el-option v-for="item in xqTree" :label="item.name" :value="item.id" :key="item.id"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button size="small" @click="getlist">查 询</el-button>
      </el-form-item>
      <el-form-item>
        <el-button size="small" @click="addDialog=true">添 加</el-button>
      </el-form-item>
      <el-form-item>
        <el-button size="small" type="danger" @click="deleInfor(false)">批量删除</el-button>
      </el-form-item>
    </el-form>
    <!-- 面包屑 -->
    <div class="show_father">
      <div class="show_father_box"> 
        <div style="cursor: pointer;" v-for="(item,index) in fatherName" :key="index" @click="clickmbx(item.id)">
          <span>{{item.name}} </span>
          <span v-if="index!=fatherName.length-1" style="margin-right:10px;"> → </span>
        </div>
      </div>
      <el-button size="small" @click="fatherName=[{id:0,name:'首级'}],clickmbx(0)">清楚记录</el-button>
    </div>
    <!-- 表格 -->
    <el-table :data="formData" @selection-change="handleSelectionChange" style="width: 100%">
      <el-table-column type="selection" width="55">
      </el-table-column>
      <!-- <el-table-column width="25">
        <template slot-scope="scope">
          <el-radio @change='pname = scope.row.name,isGetFather = true' :disabled="scope.row.id==formUpdate.id" v-model="formUpdate.pid" :label="scope.row.id" style="color:transparent;"></el-radio>
				</template>
			</el-table-column> -->
      <el-table-column prop="id" label="区域编号"></el-table-column>
      <el-table-column prop="name" label="区域">
        <template slot-scope="scope">
          <div style="cursor: pointer;" @click="handleclick(scope.row)">{{scope.row.name}}</div>
        </template>
      </el-table-column>
      <el-table-column prop="remark" label="备注"></el-table-column>
      <el-table-column prop="gmtModified" label="创建时间" width="180"></el-table-column>
      <el-table-column prop="pname"label="父级区域"width="180"></el-table-column>
      <el-table-column prop="xqName"label="所属小区"width="180"></el-table-column>
      <el-table-column label="操作" fixed="right" width=250>
				<template slot-scope="scope">
					<el-button type="warning" size="small" @click="updateShowBox(scope.row)">修 改</el-button>
					<el-button type="danger" size="small" @click="deleInfor(scope.row.id)">删 除</el-button>
				</template>
			</el-table-column>
    </el-table>
    <paging @changePage = handleCurrentPage :get-total='total'></paging>

    </div>
    <!-- 添加 -->
    <el-dialog title="新增" :visible.sync="addDialog" :close-on-click-modal="false">
      <div class="cont_box_right">
        <el-form label-position="right" :rules="rules" label-width="80px" :model="formPush" ref='addList'>
          <el-form-item label="区域名称" prop="name">
            <el-input v-model="formPush.name"></el-input>
          </el-form-item>
          <el-form-item label="备注">
            <el-input v-model="formPush.remark"></el-input>
          </el-form-item>
          <el-form-item label="选择小区" size="small" prop="xqId">
            <el-select v-model="formPush.xqId" placeholder="请选择小区">
              <el-option v-for="item in xqTree" :label="item.name" :value="item.id" :key="item.id"></el-option>
            </el-select>
          </el-form-item>
        </el-form>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button size="medium " @click="addDialog = false">取 消</el-button>
        <el-button size="medium " @click="addList('addList')">新 增</el-button>
      </div>
    </el-dialog>
    
    <!-- 修改 -->
    <el-dialog title="修改" :visible.sync="updateDialog" :close-on-click-modal="false">
      <div class="cont_box_right">
        <el-form label-position="right" :rules="rules" label-width="100px" :model="formUpdate" ref='addList'>
          <el-form-item label="区域名称" prop="name">
            <el-input v-model="formUpdate.name"></el-input>
          </el-form-item>
          <!-- <el-form-item label="选择小区" size="small" prop="xqId">
            <el-select v-model="formUpdate.xqId" placeholder="请选择小区">
              <el-option v-for="item in xqTree" :label="item.name" :value="item.id" :key="item.id"></el-option>
            </el-select>
          </el-form-item> -->
          <el-form-item label="备注">
            <el-input v-model="formUpdate.remark"></el-input>
          </el-form-item>
        </el-form>
        <el-form label-position="right" label-width="100px" :model="formUpdate">
          <el-form-item label="当前选中父级" prop="name">
            <span style="color:#a1d6f4">{{pname}} <span style="font-size:12px;">（修改父级需要在父级处先勾选）</span> </span>
          </el-form-item>
        </el-form>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button size="medium" @click="updateDialog = false">取 消</el-button>
        <el-button size="medium" @click="updateList">确定</el-button>
      </div>
    </el-dialog>

  </section>
</template>

<script>
import paging from "../paging"
import { sectionList,sectionAddList,sectionUpdateList,sectionDeleteList,xqSelectList,orgTree } from '../../url/api';
export default {
  data(){
    return{
      option1:[],
      deleBatch:[],//批量删除
      pname:'',//当前选中的父级
      isGetFather:false,//是否已经选中父级
      fatherId:0,
      formSearch:{//查询条件
        current:1,
        xqId:'',
        pid:0,
        size: 10
      },
      fatherName:[
        {id:0,name:'首级'}
      ],//用于修改pid和相关操作,//子区域的父级
      formPush:{},//表单提交
      formData: [],//数据
      formUpdate:{},//修改表单
      total: 0,//数据总数
      pages:0,//页面总数
      addDialog:false,
      updateDialog:false,
      zuzhiTree:[],
      xqTree:[],
      dataTree:[],
      defaultProps: {//树状图key定义
        children: 'children',
        label: 'label'
      },
      defaultProps2: {
        children: 'children',
        label: 'name',
        value: 'id',
        expandTrigger: 'hover',checkStrictly: true
      },
      rules: {
        name:[{ required: true, message: '该项不能为空'}],
        xqId:[{ required: true, message: '该项不能为空',trigger: 'change'}]
      },
    }
  },
  methods:{
    getlist(){
      sectionList(this.formSearch).then((res)=>{
        console.log(res)
        if(res.data.code == 200){
          this.formData = res.data.data.records.filter((item)=>{
            if(item.gmtModified){
              item.gmtModified = this.$root.getDateArray(item.gmtModified)[9]
            }
            return item
          })
          this.total = res.data.data.total
          this.pages = res.data.pages
        }else{
          this.$message(res.data.msg);
        }
      })
    },
    getInit(){//初始化列表

      let org_tree1={}
      xqSelectList(org_tree1).then((res)=>{//小区选择列表
        console.log(res)
        if(res.data.code == 200){
          this.xqTree = res.data.data
          this.formSearch.xqId = this.xqTree[0].id
          this.getlist()
        }
      })
      let org_tree={
        name:'',
        status:1
      }
      orgTree(org_tree).then((res)=>{//获取组织列表
        console.log(res)
        if(res.data.code == 200){
          this.zuzhiTree = res.data.data
        }
      })
    },
    addList(addList){//添加
      this.formPush.pid = this.formSearch.pid
      console.log(this.formSearch.pid)
      if(!this.formSearch.pid){

      }
      this.$refs[addList].validate((valid) => {
        if (valid) {
          sectionAddList(this.formPush).then((res)=>{
            console.log(res)
            if(res.data.code == 200){
              this.$message({
                message: '添加成功',
                type: 'success'
              });
              this.getlist()
            }else{
              this.$message('添加失败')
            }
          })
          this.addDialog = false
        } else {
          console.log('error submit!!');
          return false;
        }
      });
        
    },
    updateList(){//修改
    console.log(this.formUpdate)
      sectionUpdateList(this.formUpdate).then((res)=>{
        console.log(res)
        if(res.data.code == 200){
          this.$message({
            message: '修改成功',
            type: 'warning'
          });
          this.getlist()
        }
      })
      this.updateDialog = false
    },
    deleInfor(ids){//删除
      let arrId = []
      if(ids){
        arrId.push(ids)
      }else{
        if(this.deleBatch.length!=0){
          this.deleBatch.filter((item)=>{
            arrId.push(item.id)
            return item
          })
        }
      }
      this.$confirm('确认删除吗？')
      .then(_ => {
        sectionDeleteList(arrId).then((res)=>{
          console.log(res)
          if(res.data.code == 200){
            this.$message('删除成功');
            this.getlist()
          }
        })
      })
      .catch(_ => {});
    },
    handleCurrentPage(val){//页码改变
      this.formSearch.current=val
      this.getlist()
    },
    checkTreeInfor(data,ev) {//监听树状图勾选
      // console.log(ev);
      if(ev.checkedKeys.length>1){
        this.$message('只能选择一个组织');
      }else{
        this.formPush.xqId = ev.checkedKeys[0]
        this.formUpdate.xqId = ev.checkedKeys[0]
      }
    },
    updateShowBox(item){//修改东西弹窗
    if(!this.isGetFather){
      if(item.pname){
        this.pname = item.pname;
      } else {
        this.pname = item.name
      }
      
    }
      let obj = {
        id:item.id,
        name:item.name,
        pid:this.formUpdate.pid||item.pid,
        remark:item.remark,
      }
      this.updateDialog = true
      this.formUpdate = obj;
      
    },
    zuzhiChange(value){//改变组织
    this.$refs.cascader.dropDownVisible = false;
      if(value.length!=0){
        console.log(value)
        this.formSearch.orgId=this.$refs.cascader.getCheckedNodes()[0].data.id
        console.log(this.formSearch.orgId)
      }else{
        this.formSearch.orgId = ''
      }
      sectionList(this.formSearch).then((res)=>{
        console.log(res)
        if(res.data.code == 200){
          this.formData = res.data.data.records.filter((item)=>{
            if(item.gmtModified){
              item.gmtModified = this.$root.getDateArray(item.gmtModified)[9]
            }
            return item
          })
          this.total = res.data.data.total
          this.pages = res.data.pages
        }else{
          this.$message(res.data.msg);
        }
      })
    },
    handleSelectionChange(val) {//多选
      console.log(val)
      this.deleBatch = val
    },
    handleclick(event){//点击表格
    this.fatherName = this.fatherName.filter((item)=>{
      return item.id!=event.id
    })
    this.fatherName.push(event)

      this.formSearch.pid = event.id
      console.log(this.fatherName,event)
      
      sectionList(this.formSearch).then((res)=>{
        console.log(res)
        if(res.data.code == 200){
          this.formData = res.data.data.records.filter((item)=>{
            if(item.gmtModified){
              item.gmtModified = this.$root.getDateArray(item.gmtModified)[9]
            }
            return item
          })
          this.total = res.data.data.total
          this.pages = res.data.pages
        }else{
          this.$message(res.data.msg);
        }
      })
    },
    clickmbx(event){//点击面包屑
      console.log(event)
      this.formSearch.pid = event
      sectionList(this.formSearch).then((res)=>{
        console.log(res)
        if(res.data.code == 200){
          this.formData = res.data.data.records.filter((item)=>{
            if(item.gmtModified){
              item.gmtModified = this.$root.getDateArray(item.gmtModified)[9]
            }
            return item
          })
          this.total = res.data.data.total
          this.pages = res.data.pages
        }else{
          this.$message(res.data.msg);
        }
      })
    }
  },
  mounted(){
    this.getInit()
  },
  components:{
    paging
  }
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
.table_row{
  color: #a1d6f4;
  width: 100%;
  font-size: 16px;
}
.show_father{
  height:50px;
  color:#a1d6f4;
  border:1px solid #a1d6f4;
  padding:0 10px;
  display: flex;
  align-items: center;
  margin-bottom:20px;
  position:relative;
}
.show_father_box{
  display: flex;
  align-items: center;
  flex: 1;
}
</style>
