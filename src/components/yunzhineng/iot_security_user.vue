<template>  
  <section class="modlude">
    <el-form :inline="true" :model="formSearch" class="form_inline">
      <el-form-item label="选择小区" size="small">
        <el-select v-model="formSearch.xqId" placeholder="请选择小区">
          <el-option v-for="(item,index) in xqTree" :label="item.name" :value="item.id" :key="index"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="手机号" size="small">
        <el-input v-model="formSearch.phone" placeholder="请输入手机号"></el-input>
      </el-form-item>
      <el-form-item label="家园号" size="small">
        <el-input v-model="formSearch.showName" placeholder="请输入家园号"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button size="medium " @click="getlist">查 询</el-button>
        <el-button size="medium " @click="addDialog = true,imageUrl = ''">新 增</el-button>
      </el-form-item>
    </el-form>
    <el-table :data="formData" style="width: 100%" stripe>
      <el-table-column prop="nickname" label="名称"></el-table-column>
      <el-table-column prop="phone" label="手机号"></el-table-column>
      <el-table-column prop="showName" label="家园号"></el-table-column>
      <el-table-column label="操作" fixed="right" width=250>
				<template slot-scope="scope">
					<el-button type="primary" size="small" @click="getysaccountList(scope.row.id)">查看设备</el-button>
				</template>
			</el-table-column>
    </el-table>
    <paging @changePage = handleCurrentPage :get-total='total'></paging>

    <!-- 添加 -->
    <el-dialog title="设备查看" :visible.sync="addDialog" :close-on-click-modal="false">
      <el-table :data="ysaccount" style="width: 100%" stripe>
        <el-table-column prop="deviceName" label="设备名"></el-table-column>
        <el-table-column prop="permission" label="设备权限"></el-table-column>
        <el-table-column prop="resourceId" label="设备序列号"></el-table-column>
        <el-table-column prop="resourceType" label="设备类型"></el-table-column>
      </el-table>
      <paging2 @changePage = handleCurrentPage2 :get-total='total2'></paging2>
    </el-dialog>
    </section>
</template>

<script>
import paging from "../paging"
import paging2 from "../paging"
import { ysUserList,ysaccountList,updateHdlGlobalParam,delHdlGlobalParam,xqSelectList,orgTree } from '../../url/api';
export default {
  data(){
    return{
      bindRole:{},
      showmenuList:[],
      menuList:[],
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
      total2: 0,//数据总数
      pages:0,//页面总数
      addDialog:false,
      updateDialog:false,
      dialog:false,
      formPush:{},
      dataTree:[],
      defaultProps: {//树状图key定义
        children: 'data',
        label: 'name'
      },
      defaultProps2: {
        children: 'children',
        label: 'name',
        value: 'id',
        expandTrigger: 'hover',checkStrictly: true
      },
      rules: {
        account:[{ required: true, message: '该项不能为空'}],
        orgId:[{ required: true, message: '该项不能为空',trigger: 'blur'}],
        xqId:[{ required: true, message: '该项不能为空',trigger: 'blur'}],
      },
      imageUrl:'',
      ysaccount:[],
      ysaccountpush:{
        current:1,
        size:10,
      }
    }
  },
  methods:{
    getysaccountList(accountId){//获取用户对应的设备信息
      this.ysaccountpush.accountId = accountId
      ysaccountList(this.ysaccountpush).then(res=>{
        console.log(res)
        if(res.data.code == 200){
          this.ysaccount = res.data.data.records
          this.addDialog = true
        }
        this.total2 = res.data.data.total
      })
    },
    getlist(){
      ysUserList(this.formSearch).then((res)=>{
        console.log(res)
        if(res.data.code == 200){
          this.formData = res.data.data.records.filter((item)=>{
            if(item.gmtCreate){
              item.gmtCreate = this.$root.getDateArray(item.gmtCreate)[9]
              // item.storeTime = this.$root.getDateArray(item.storeTime)[9]
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
    handleChange1(value){
      if(value.length!=0){
        console.log(value)
        this.formPush.orgId=this.$refs.cascader.getCheckedNodes()[0].data.id
      }else{
        this.formPush.orgId = ''
      }
    },
    addList(addList){//添加树状图node节点
      this.$refs[addList].validate((valid) => {
        if (valid) {
          ysaccountList(this.formPush).then((res)=>{
            console.log(res)
            if(res.data.code == 200){
              this.getInit()
              this.$message({
                message: '添加成功',
                type: 'success'
              });
              
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
    updateList(formName){//修改
      this.$refs[formName].validate((valid) => {
        if (valid) {
          if(this.formUpdate.xqName){
            delete this.formUpdate.xqName
          }
          let params = this.formUpdate
          updateHdlGlobalParam(params).then((res)=>{
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
        this.updateDialog =false
      });
    },
    updateShowBox(item){//修改东西弹窗
      this.formUpdate = JSON.parse(JSON.stringify(item));
      this.updateDialog = true
      console.log(this.formUpdate)
    },
    deleInfor(id){
      let params = [id]
      this.$confirm('确认删除吗？')
      .then(_ => {
        delHdlGlobalParam(params).then((res)=>{
          console.log(res)
          if(res.data.code == 200){
            this.$message('删除成功');
            this.getlist()
          }else{
            this.$message(res.data.msg);
          }
        })
      })
      .catch(_ => {});

    },
    handleCurrentPage(val){//页码改变
      this.formSearch.current=val
      this.getList()
    },
    handleCurrentPage2(val){//页码改变
      this.ysaccountpush.current=val
      this.getysaccountList(this.ysaccountpush.accountId)
    },
  },
  mounted(){
    this.getInit()
  },
  components:{
    paging,
    paging2
  }
}
</script>
<style scoped>
  .cont_box_right .el-form-item{
    margin-bottom:20px;
  }
</style>
