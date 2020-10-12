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
          <el-option v-for="(item,index) in xqTree" :label="item.name" :value="item.id" :key="index"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="dns地址" size="small">
        <el-input v-model="formSearch.sipDns" placeholder="请输入dns地址"></el-input>
      </el-form-item>
      <el-form-item label="端口" size="small">
        <el-input v-model="formSearch.sipPort" placeholder="请输入端口"></el-input>
      </el-form-item>
      <el-form-item label="sip代理地址" size="small">
        <el-input v-model="formSearch.sipProxy" placeholder="请输入sip代理地址"></el-input>
      </el-form-item>
      <el-form-item label="服务器域名" size="small">
        <el-input v-model="formSearch.sipServerDomain" placeholder="请输入服务器域名"></el-input>
      </el-form-item>
     
      <el-form-item>
        <el-button size="medium " @click="getlist">查 询</el-button>
        <el-button size="medium " @click="addDialog = true">新 增</el-button>
      </el-form-item>
    </el-form>
    <el-table :data="formData" style="width: 100%" stripe>
      <el-table-column prop="sipDns" label="dns地址"></el-table-column>
      <el-table-column prop="sipPort" label="端口"></el-table-column>
      <el-table-column prop="sipProxy" label="sip代理地址"></el-table-column>
      <el-table-column prop="sipServerDomain" label="服务器域名"></el-table-column>
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
        <el-form label-position="right" :rules="rules" label-width="90px" :model="formPush" ref='addList'>
          <el-form-item label="dns地址" size="small">
            <el-input v-model="formPush.sipDns"></el-input>
          </el-form-item>
          <el-form-item label="端口" size="small">
            <el-input v-model="formPush.sipPort"></el-input>
          </el-form-item>
          <el-form-item label="sip代理地址" size="small">
            <el-input v-model="formPush.sipProxy"></el-input>
          </el-form-item>
          <el-form-item label="服务器域名" size="small">
            <el-input v-model="formPush.sipServerDomain"></el-input>
          </el-form-item>
          <el-form-item label="选择小区" size="small">
            <el-select v-model="formPush.xqId" placeholder="请选择小区">
              <el-option v-for="(item,index) in xqTree" :label="item.name" :value="item.id" :key="index"></el-option>
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
        <el-form label-position="right" :rules="rules" label-width="90px" :model="formPush" ref='formUpdate'>
          <el-form-item label="dns地址" size="small">
            <el-input v-model="formUpdate.sipDns"></el-input>
          </el-form-item>
          <el-form-item label="端口" size="small">
            <el-input v-model="formUpdate.sipPort"></el-input>
          </el-form-item>
          <el-form-item label="sip代理地址" size="small">
            <el-input v-model="formUpdate.sipProxy"></el-input>
          </el-form-item>
          <el-form-item label="服务器域名" size="small">
            <el-input v-model="formUpdate.sipServerDomain"></el-input>
          </el-form-item>
          <el-form-item label="选择小区" size="small">
            <el-select v-model="formUpdate.xqId" placeholder="请选择小区">
              <el-option v-for="(item,index) in xqTree" :label="item.name" :value="item.id" :key="index"></el-option>
            </el-select>
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
import { getSiphostInfoList,addSiphostInfo,updateSiphostInfo,delSiphostInfo,xqSelectList,orgTree } from '../../url/api';
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
      updateDialog:false,
      formPush:{},
      dataTree:[],
      defaultProps2: {
        children: 'children',
        label: 'name',
        value: 'id',
        expandTrigger: 'hover',checkStrictly: true
      },
      rules: {
        account:[{ required: true, message: '该项不能为空'}],
        orgId:[{ required: true, message: '该项不能为空',trigger: 'change'}],
        sex:[{ required: true, message: '该项不能为空',trigger: 'change'}],
        status:[{ required: true, message: '该项不能为空',trigger: 'change'}],
      },
      imageUrl:''
    }
  },
  methods:{
    getlist(){
      getSiphostInfoList(this.formSearch).then((res)=>{
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
          addSiphostInfo(this.formPush).then((res)=>{
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
          let params = this.formUpdate
          updateSiphostInfo(params).then((res)=>{
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
      delete this.formUpdate.gmtCreate
      this.updateDialog = true
      console.log(this.formUpdate)
    },
    deleInfor(id){
      let params = {
        id:id
      }
      this.$confirm('确认删除吗？')
      .then(_ => {
        delSiphostInfo(params).then((res)=>{
          console.log(res)
          if(res.data.code == 200){
            this.$message('删除成功');
            this.getInit()
          }else{
            this.$message(res.data.msg);
          }
        })
      })
      .catch(_ => {});

    },
    handleAvatarSuccess(res, file) {//头像上传成功
      console.log(res, file)
      this.imageUrl = URL.createObjectURL(file.raw);
      if(res.code == 200){
        this.formPush.avatar = res.data[0]
      }
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
