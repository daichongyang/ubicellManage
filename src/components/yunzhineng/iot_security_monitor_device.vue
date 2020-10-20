<template>  
  <section class="modlude">
    <el-form :inline="true" :model="formSearch" class="form_inline">
      <el-form-item label="选择小区" size="small">
        <el-select v-model="formSearch.xqId" placeholder="请选择小区">
          <el-option v-for="(item,index) in xqTree" :label="item.name" :value="item.id" :key="index"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="设备序列号" size="small">
        <el-input v-model="formSearch.deviceSerial" placeholder="请输入设备序列号"></el-input>
      </el-form-item>
      <el-form-item label="" size="small">
        <el-radio-group v-model="typeradio" @change="changeradio">
        <el-radio :label="1">本地设备</el-radio>
        <el-radio :label="2">云端设备</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item>
        <el-button size="medium " @click="getlist">查 询</el-button>
        <el-button size="medium " @click="addDialog = true">新 增</el-button>
      </el-form-item>
    </el-form>
    <el-table :data="formData" style="width: 100%" stripe>
      <el-table-column prop="deviceName" label="设备名称"></el-table-column>
      <el-table-column prop="deviceModel" label="设备型号" v-if="typeradio==1"></el-table-column>
      <el-table-column prop="deviceSerial" label="设备序列号"></el-table-column>
      <el-table-column prop="deviceType" label="设备类型" v-if="typeradio==2"></el-table-column>
      <el-table-column prop="model" label="设备型号" v-if="typeradio==2"></el-table-column>
      <el-table-column prop="deviceVersion" label="设备版本号" v-if="typeradio==2"></el-table-column>
      <el-table-column prop="remark" label="备注信息" v-if="typeradio==1"></el-table-column>
      <el-table-column prop="" label="设备状态" v-if="typeradio==1">
        <template slot-scope="scope">
          {{scope.row.addStatus==1?'未被用户添加':scope.row.addStatus==2?'已被用户添加':'已被用户删除'}}
        </template>
      </el-table-column>
      <el-table-column prop="" label="是否加密" v-if="typeradio==2">
        <template slot-scope="scope">
          {{scope.row.isEncrypt==0?'不加密':'加密'}}
        </template>
      </el-table-column>
      <el-table-column prop="" label="在线状态" v-if="typeradio==2">
        <template slot-scope="scope">
          {{scope.row.status==0?'不在线':'在线'}}
        </template>
      </el-table-column>
      <el-table-column label="操作" fixed="right" width=250>
				<template slot-scope="scope" v-if="typeradio==2">
					<el-button type="warning" size="small" @click="updateShowBox(scope.row)">修改设备名称</el-button>
					<el-button type="primary" size="small" @click="getysaccountList(scope.row.id)">查看设备</el-button>
				</template>
				<template slot-scope="scope" v-if="typeradio==1">
          <el-button type="danger" size="small" @click="deleInfor(scope.row)">删 除</el-button>
				</template>
			</el-table-column>
    </el-table>
    <paging v-show="typeradio==1" @changePage = handleCurrentPage :get-total='total'></paging>
    <paging1 v-show="typeradio==2" @changePage = handleCurrentPage1 :get-total='total1'></paging1>

    <!-- 添加 -->
    <el-dialog title="新增" :visible.sync="addDialog" :close-on-click-modal="false">
      <div class="cont_box_right">
        <el-form label-position="right" :rules="rules" label-width="120px" :model="formPush" ref='addList'> 
          <el-form-item label="选择小区" size="small" prop="xqId">
            <el-select v-model="formPush.xqId" placeholder="请选择小区">
              <el-option v-for="(item,index) in xqTree" :label="item.name" :value="item.id" :key="index"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="设备序列号" size="small">
            <el-input v-model="formPush.deviceSerial"></el-input>
          </el-form-item>
          <el-form-item label="设备验证码" size="small">
            <el-input v-model="formPush.validateCode"></el-input>
          </el-form-item>
          <el-form-item label="设备序型号" size="small">
            <el-input v-model="formPush.deviceModel" placeholder="(格式:xx-xxx-xxxxx字母大写)"></el-input>
          </el-form-item>
          <el-form-item label="设备名称" size="small">
            <el-input v-model="formPush.deviceName"></el-input>
          </el-form-item>
          <el-form-item label="设备类型" size="small">
            <el-radio v-model="formPush.deviceType" label='dev'>设备</el-radio>
            <el-radio v-model="formPush.deviceType" label='cam'>摄像头</el-radio>
          </el-form-item>
          <el-form-item label="备注信息" size="small">
            <el-input v-model="formPush.remark"></el-input>
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
        <el-form label-position="right" label-width="90px" :model="formUpdate" ref='formUpdate'> 
          <el-form-item label="设备名称" size="small">
            <el-input v-model="formUpdate.deviceName"></el-input>
          </el-form-item>
          <el-form-item label="设备序列号" size="small">
            <el-input :disabled="true" v-model="formUpdate.deviceSerial"></el-input>
          </el-form-item>
        </el-form>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button size="medium " @click="updateDialog = false">取 消</el-button>
        <el-button size="medium " @click="updateList('formUpdate')">修 改</el-button>
      </div>
    </el-dialog>
    <!-- 设备查看 -->
    <el-dialog title="设备查看" :visible.sync="addDialog1" :close-on-click-modal="false">
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
import paging1 from "../paging"
import paging2 from "../paging"
import { ysaccountList,ysdeviceList,yslocaldeviceList,ysadddevice,ysaupdatedevice,ysdeletedevice,xqSelectList,orgTree } from '../../url/api';
export default {
  data(){
    return{
      ysaccountpush:{
        current:1,
        size:10,
      },
      typeradio:1,
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
      formUpdate:{
        deviceName:'',
        deviceSerial:''
      },//修改表单
      total: 0,//数据总数
      total1: 0,//数据总数
      total2: 0,//数据总数
      pages:0,//页面总数
      addDialog1:false,
      addDialog:false,
      updateDialog:false,
      dialog:false,
      formPush:{
        deviceType:'dev'
      },
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
      ysaccount:[],
      imageUrl:''
    }
  },
  methods:{
    getysaccountList(accountId){//获取用户对应的设备信息
      this.ysaccountpush.accountId = accountId
      ysaccountList(this.ysaccountpush).then(res=>{
        console.log(res)
        if(res.data.code == 200){
          this.ysaccount = res.data.data.records
          this.addDialog1 = true
        }
        this.total2 = res.data.data.total
      })
    },
    changeradio(val){
      console.log(val)
      this.formSearch.current=1
      if(val == 1){
        this.getlist()
      }else{
        this.getlist1()
      }
      
    },
    getlist(){
      yslocaldeviceList(this.formSearch).then((res)=>{//获取本地设备信息
        this.formData=[]
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
    getlist1(){
      this.formData=[]
      ysdeviceList(this.formSearch).then((res)=>{//获取萤石设备列表云端
        console.log(res)
        if(res.data.code == 200){
          this.formData = res.data.data.records.filter((item)=>{
            if(item.gmtCreate){
              item.gmtCreate = this.$root.getDateArray(item.gmtCreate)[9]
            }
            return item
          })
          this.total1 = res.data.data.total
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
          ysadddevice(this.formPush).then((res)=>{
            console.log(res)
            if(res.data.code == 200){
              this.getlist()
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
          let params = this.formUpdate
          ysaupdatedevice(params).then((res)=>{
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
      let obj=JSON.parse(JSON.stringify(item));
      this.formUpdate.deviceName = obj.deviceName 
      this.formUpdate.deviceSerial = obj.deviceSerial  
      this.updateDialog = true
      console.log(item)
    },
    deleInfor(item){
      let params = {
        accountId :item.id,
        deviceSerial :item.deviceSerial,
      }
        
      this.$confirm('确认删除吗？')
      .then(_ => {
        ysdeletedevice(params).then((res)=>{
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
    handleCurrentPage1(val){//页码改变
      this.formSearch.current=val
      this.getList1()
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
    paging1,
    paging2
  }
}
</script>
<style scoped>
  .cont_box_right .el-form-item{
    margin-bottom:20px;
  }
</style>
