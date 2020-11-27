<template>  
  <section class="modlude">
    <el-form :inline="true" :model="formSearch" class="form_inline">
      <el-form-item label="所属组织" size="small">
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
      <el-form-item label="选择小区" size="small">
        <el-select v-model="formSearch.xqId" placeholder="请选择小区">
          <el-option v-for="item in xqTree" :label="item.name" :value="item.id" :key="item.id"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="是否启用" size="small">
        <el-select v-model="formSearch.isOn">
          <el-option label="启用" :value="1"></el-option>
          <el-option label="禁止" :value="0"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="线路名称" size="small">
        <el-input v-model="formSearch.name" placeholder="请输入线路名称"></el-input>
      </el-form-item>
      <el-form-item label="地址" size="small">
        <el-input v-model="formSearch.addr" placeholder="请输入地址"></el-input>
      </el-form-item>
      <el-form-item label="账号" size="small">
        <el-input v-model="formSearch.username" placeholder="请输入账号"></el-input>
      </el-form-item>
      <el-form-item label="外显号码" size="small">
        <el-input v-model="formSearch.number" placeholder="请输入外显号码"></el-input>
      </el-form-item>
      <el-form-item label="密码" size="small">
        <el-input v-model="formSearch.password" placeholder="请输入密码"></el-input>
      </el-form-item>
      <el-form-item label="号码前缀" size="small">
        <el-input v-model="formSearch.prefix" placeholder="请输入号码前缀"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button size="medium " @click="getlist">查 询</el-button>
        <el-button size="medium " @click="addDialog = true">新 增</el-button>
      </el-form-item>
    </el-form>
    <el-table :data="formData" style="width: 100%" stripe>
      <el-table-column prop="name" label="线路名称"></el-table-column>
      <el-table-column prop="number" label="线路账号"></el-table-column>
      <el-table-column prop="password" label="线路密码"></el-table-column>
      <el-table-column prop="addr" label="线路地址"></el-table-column>
      <el-table-column prop="number" label="外显号码"></el-table-column>
      <el-table-column prop="isOn" label="是否启用">
        <template slot-scope="scope">
          {{scope.row.isOn==1?'启用':'禁止'}}
				</template>
      </el-table-column>
      <el-table-column label="操作" fixed="right" width=250>
				<template slot-scope="scope">
					<el-button type="primary" size="small" @click="getupdateGatewaySetting(scope.row)">{{scope.row.isOn==0?'启用':'禁止'}}</el-button>
					<el-button type="danger" size="small" @click="deleInfor(scope.row.id)">删除</el-button>
				</template>
			</el-table-column>
    </el-table>
    <paging @changePage = handleCurrentPage :get-total='total'></paging>

    <!-- 添加 -->
    <el-dialog title="新增" :visible.sync="addDialog" :close-on-click-modal="false">
      <div class="cont_box_right">
        <el-form label-position="right" :rules="rules" label-width="80px" :model="formPush" ref='addList'>
      <el-form-item label="选择小区" size="small">
        <el-select v-model="formPush.xqId" placeholder="请选择小区">
          <el-option v-for="item in xqTree" :label="item.name" :value="item.id" :key="item.id"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="是否启用" size="small">
        <el-select v-model="formPush.isOn">
          <el-option label="启用" :value="1"></el-option>
          <el-option label="禁止" :value="0"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="线路名称" size="small">
        <el-input v-model="formPush.name" placeholder="请输入线路名称"></el-input>
      </el-form-item>
      <el-form-item label="地址" size="small">
        <el-input v-model="formPush.addr" placeholder="请输入地址"></el-input>
      </el-form-item>
      <el-form-item label="账号" size="small">
        <el-input v-model="formPush.username" placeholder="请输入账号"></el-input>
      </el-form-item>
      <el-form-item label="外显号码" size="small">
        <el-input v-model="formPush.number" placeholder="请输入外显号码"></el-input>
      </el-form-item>
      <el-form-item label="密码" size="small">
        <el-input v-model="formPush.password" placeholder="请输入密码"></el-input>
      </el-form-item>
      <el-form-item label="号码前缀" size="small">
        <el-input v-model="formPush.prefix" placeholder="请输入号码前缀"></el-input>
      </el-form-item>
        </el-form>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button size="medium " @click="addDialog = false">取 消</el-button>
        <el-button size="medium " @click="addList('addList')">新 增</el-button>
      </div>
    </el-dialog>
    </section>
</template>

<script>
import paging from "../paging"
import { getGatewaySetting,addGatewaySetting,updateTree,delGatewaySetting,xqSelectList,orgTree,updateGatewaySetting } from '../../url/api';
export default {
  data(){
    return{
      option1:[],
      xqTree:[],
      isAddorUpdate:1,//1添加、2修改
      formSearch:{
        current:1,
        size:10
      },
      formData: [],//数据
      formUpdate:{},//修改表单
      total: 0,//数据总数
      pages:0,//页面总数
      addDialog:false,
      formPush:{},
      dataTree:[],
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
      getGatewaySetting(this.formSearch).then((res)=>{
        console.log(res)
        if(res.data.code == 200){
          this.formData = res.data.data.records.filter((item)=>{
            if(item.gmtCreate){
              item.gmtCreate = this.$root.getDateArray(item.gmtCreate)[9]
            }
            return item
          })
          this.total = res.data.data.total
        }else{
          this.$message(res.data.msg);
        }
      })
    },
    getInit(){
      this.getlist()
      xqSelectList({}).then((res)=>{//小区选择列表
        console.log(res)
        if(res.data.code == 200){
          this.xqTree = res.data.data
        }
      })
      let org_tree={
        name:'',
        status:1
      }
      orgTree(org_tree).then((res)=>{//获取组织列表
        console.log(res)
        if(res.data.code == 200){
          this.dataTree = res.data.data
        }
      })
    },
    handleChange(value){
      if(value.length!=0){
        console.log(value)
        this.formSearch.orgId=this.$refs.cascader.getCheckedNodes()[0].data.id
      }else{
        this.formSearch.orgId = ''
      }
    },
    addList(addList){//添加树状图node节点
      this.$refs[addList].validate((valid) => {
        if (valid) {
          addGatewaySetting(this.formPush).then((res)=>{
            console.log(res)
            if(res.data.code == 200){
              this.$message({
                message: '添加成功',
                type: 'success'
              });
              this.getlist()
            }else{
              this.$message('添加失败:'+res.data.msg)
            }
          })
          this.addDialog = false
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
    updateList(formName){//修改树状图node节点
      this.$refs[formName].validate((valid) => {
        if (valid) {
          updateTree(this.formPush).then((res)=>{
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
    checkInfor(data,ev) {//监听勾选
      console.log(ev);
      this.delTree = ev.checkedKeys
    },
    getupdateGatewaySetting(item){//启用和停用
      let params ={
        id:item.id,
        isOn:item.isOn==1?0:1
      }
      updateGatewaySetting(params).then((res)=>{
        console.log(res)
        if(res.data.code == 200){
          this.$message('操作成功');
          this.getlist()
        }
      })
    },
    deleInfor(id){
      this.$confirm('确认删除吗？')
      .then(_ => {
        delGatewaySetting(id).then((res)=>{
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
</style>
