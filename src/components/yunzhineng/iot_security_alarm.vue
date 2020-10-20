<template>  
  <section class="modlude">
    <el-form :inline="true" :model="formSearch" class="form_inline">
      <el-form-item label="设备系列号" size="small">
        <el-input v-model="formSearch.phone" placeholder="请输入设备系列号"></el-input>
      </el-form-item>
      <el-form-item label="手机号" size="small">
        <el-input v-model="formSearch.phone" placeholder="请输入手机号"></el-input>
      </el-form-item>
      <el-form-item label="选择小区" size="small">
        <el-select v-model="formSearch.xqId" placeholder="请选择小区">
          <el-option v-for="(item,index) in xqTree" :label="item.name" :value="item.id" :key="index"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button size="small" @click="getlist">查 询</el-button>
      </el-form-item>
      <el-form-item>
        <el-button size="small" type="danger" @click="deleInfor(false)">批量删除</el-button>
      </el-form-item>
    </el-form>
    <el-table :data="formData" style="width: 100%" stripe @selection-change="handleSelectionChange">
      <el-table-column prop="xqName" label="小区名称"></el-table-column>
      <el-table-column prop="showName" label="用户家园号"></el-table-column>
      <el-table-column prop="deviceSerial" label="设备系列号"></el-table-column>
      <el-table-column prop="alarmType" label="报警类型"></el-table-column>
      <el-table-column prop="alarmTime" label="报警时间"></el-table-column>
      <el-table-column prop="picUrl" label="报警铺抓图片">
        <template slot-scope="scope" v-if="scope.row.picUrl">
          <div style="display:flex;cursor: pointer;">
          <img :src="scope.row.picUrl" alt="" style="height:35px;cursor: pointer;">
          </div>
        </template>
      </el-table-column>
      <el-table-column prop="pushTime" label="推送时间"></el-table-column>
      <el-table-column prop="" label="是否已删除">
        <template slot-scope="scope">
          {{scope.row.isDel==0?'否':'是'}}
        </template>
      </el-table-column>
      <el-table-column label="操作" fixed="right" width=250>
				<template slot-scope="scope">
					<el-button type="warning" size="small" @click="updateShowBox(scope.row)">修 改</el-button>
					<el-button type="danger" size="small" @click="deleInfor(scope.row.id)">删 除</el-button>
				</template>
			</el-table-column>
    </el-table>
    <paging @changePage = handleCurrentPage :get-total='total'></paging>

    <!-- 添加 -->
    <el-dialog title="新增" :visible.sync="addDialog" :close-on-click-modal="false">
      <div class="cont_box_right">
        <el-form label-position="right" :rules="rules" label-width="120px" :model="formPush" ref='addList'> 
          <el-form-item label="选择小区" size="small" prop="xqId">
            <el-select v-model="formPush.xqId" placeholder="请选择小区">
              <el-option v-for="(item,index) in xqTree" :label="item.name" :value="item.id" :key="index"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="hdl协议版本号" size="small">
            <el-input v-model="formPush.protocolVersion"></el-input>
          </el-form-item>
          <el-form-item label="工作模式" size="small">
            <el-radio v-model="formPush.workPattern" :label='0'>自动</el-radio>
            <el-radio v-model="formPush.workPattern" :label='1'>远程</el-radio>
            <el-radio v-model="formPush.workPattern" :label='2'>本地</el-radio>
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
        <el-form label-position="right" :rules="rules" label-width="80px" :model="formUpdate" ref='formUpdate'> 
          <el-form-item label="选择小区" size="small" prop="xqId">
            <el-select v-model="formUpdate.xqId" placeholder="请选择小区">
              <el-option v-for="(item,index) in xqTree" :label="item.name" :value="item.id" :key="index"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="hdl协议版本号" size="small">
            <el-input v-model="formUpdate.protocolVersion"></el-input>
          </el-form-item>
          <el-form-item label="工作模式" size="small">
            <el-radio v-model="formUpdate.workPattern" :label='0'>自动</el-radio>
            <el-radio v-model="formUpdate.workPattern" :label='1'>远程</el-radio>
            <el-radio v-model="formUpdate.workPattern" :label='2'>本地</el-radio>
          </el-form-item>
        </el-form>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button size="medium " @click="updateDialog = false">取 消</el-button>
        <el-button size="medium " @click="updateList('formUpdate')">修 改</el-button>
      </div>
    </el-dialog>
    </section>
</template>

<script>
import paging from "../paging"
import { ysalarmpushList,addHdlGlobalParam,updateHdlGlobalParam,deleteysalarmpush,xqSelectList,orgTree } from '../../url/api';
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
      pages:0,//页面总数
      addDialog:false,
      updateDialog:false,
      dialog:false,
      formPush:{},
      dataTree:[],
      deleBatch:[],
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
      imageUrl:''
    }
  },
  methods:{
    getlist(){
      ysalarmpushList(this.formSearch).then((res)=>{
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
          addHdlGlobalParam(this.formPush).then((res)=>{
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
    handleSelectionChange(val,self) {//多选
      console.log(val,self)
      this.deleBatch = val
    },
    deleInfor(ids){
      let arrId =''
      if(ids){
        arrId=ids
      }else{
        if(this.deleBatch.length!=0){
          this.deleBatch.forEach((item)=>{
            arrId=arrId+"_"+item.id
          })
        }
      }
      this.$confirm('确认删除吗？')
      .then(_ => {
          let parmas={
            idStr:arrId
          }
          console.log(parmas)
        deleteysalarmpush(parmas).then((res)=>{
          console.log(res)
          if(res.data.code == 200){
            this.$message('删除成功');
            this.getInit()
          }
        })
      })
      .catch(_ => {});

    },
    handleCurrentPage(val){//页码改变
      this.formSearch.current=val
      this.getList()
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
  .cont_box_right .el-form-item{
    margin-bottom:20px;
  }
</style>
