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
      <el-form-item label="主机账号" size="small">
        <el-input v-model="formSearch.account" placeholder="请输入主机账号"></el-input>
      </el-form-item>
      <el-form-item label="主机ip" size="small">
        <el-input v-model="formSearch.devIp" placeholder="请输入主机ip"></el-input>
      </el-form-item>
      <el-form-item label="房间名称" size="small">
        <el-input v-model="formSearch.houseName" placeholder="请输入房间名称"></el-input>
      </el-form-item>
      <el-form-item label="房间所在区域" size="small">
        <el-input v-model="formSearch.houseSection" placeholder="请输入房间所在区域"></el-input>
      </el-form-item>
      <el-form-item label="房间类型" size="small">
        <el-select v-model="formSearch.type">
          <el-option label="管家中心" :value="1"></el-option>
          <el-option label="业主中心" :value="2"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button size="small" @click="getlist">查 询</el-button>
      </el-form-item>
    </el-form>
    <el-table :data="formData" style="width: 100%" stripe>
      <el-table-column prop="xqName" label="小区名称"></el-table-column>
      <el-table-column prop="account" label="主机账号"></el-table-column>
      <el-table-column prop="houseName" label="房间名称"></el-table-column>
      <el-table-column prop="houseNum" label="房间号"></el-table-column>
      <el-table-column prop="transferIp" label="转换服务器ip"></el-table-column>
      <el-table-column label="房间类型">
        <template slot-scope="scope">
          {{scope.row.type==1?'管家中心':'业主中心'}}
        </template>
      </el-table-column>
    </el-table>
    <paging @changePage = handleCurrentPage :get-total='total'></paging>
    <!-- 修改 -->
    <el-dialog title="修改" :visible.sync="updateDialog" :close-on-click-modal="false">
      <div class="cont_box_right">
        <el-form label-position="right" :rules="rules" label-width="80px" :model="formUpdate" ref='formUpdate'>
          <el-form-item label="主机账号" size="small">
            <el-input v-model="formUpdate.account"></el-input>
          </el-form-item>
          <el-form-item label="主机ip" size="small">
            <el-input v-model="formUpdate.mainphoneIp"></el-input>
          </el-form-item>
          <el-form-item label="转换服务器ip" size="small">
            <el-input v-model="formUpdate.transferIp"></el-input>
          </el-form-item>
          <el-form-item label="是否启用" size="small" prop="enable">
            <el-radio v-model="formUpdate.enable" :label="1">启用</el-radio>
            <el-radio v-model="formUpdate.enable" :label="0">禁用</el-radio>
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
import { getIntercomDevInfo,updateIntercomDevInfo,xqSelectList,orgTree } from '../../url/api';
export default {
  data(){
    return{
      option1:[],
      xqTree:[],
      formSearch:{
        current:1,
        size:10
      },
      formData: [],//数据
      formUpdate:{},//修改表单
      updateDialog:false,
      total: 0,//数据总数
      dataTree:[],
      defaultProps2: {
        children: 'children',
        label: 'name',
        value: 'id',
        expandTrigger: 'hover',checkStrictly: true
      },
      rules: {
        account:[{ required: true, message: '该项不能为空'}],
        orgId:[{ required: true, message: '该项不能为空',trigger: 'blur'}],
        sex:[{ required: true, message: '该项不能为空',trigger: 'change'}],
        status:[{ required: true, message: '该项不能为空',trigger: 'change'}],
      },
    }
  },
  methods:{
    getlist(){
      getIntercomDevInfo(this.formSearch).then((res)=>{//传统-主机/媒体实时状态
        console.log(res)
        if(res.data.code == 200){
          this.formData = res.data.data.records.filter((item)=>{
            if(item.callDate){
              item.callDate = this.$root.getDateArray(item.callDate)[9]
            }
            return item
          })
          this.total = res.data.data.total
        }else{
          this.$message(res.data.msg);
        }
      })
    },
    getInit(){//初始化列表
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
    updateList(formName){//修改
      this.$refs[formName].validate((valid) => {
        if (valid) {
          let params={
            id:this.formUpdate.id,
            mainphoneIp:this.formUpdate.mainphoneIp,
            isEnable:this.formUpdate.isEnable,
            transferIp:this.formUpdate.transferIp,
          }
          updateIntercomDevInfo(params).then((res)=>{
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
    handleCurrentPage(val){//页码改变
      this.formSearch.current=val
      this.getInit()
    },
    handleChange(value){//监听组织选择
      if(value.length!=0){
        console.log(value)
        this.formSearch.orgId=this.$refs.cascader.getCheckedNodes()[0].data.id
      }else{
        this.formSearch.orgId = ''
      }
      getIntercomDevInfo(this.formSearch).then((res)=>{
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

</style>