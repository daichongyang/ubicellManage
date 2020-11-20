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
      <el-form-item label="主机设备类型" size="small">
        <el-select v-model="formSearch.devType">
          <el-option label="7500" :value="1"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button size="small" @click="getlist">查 询</el-button>
      </el-form-item>
    </el-form>
    <el-table :data="formData" style="width: 100%" stripe>
      <el-table-column prop="xqName" label="小区名称"></el-table-column>
      <el-table-column prop="account" label="主机账号"></el-table-column>
      <el-table-column prop="devIp" label="主机 ip"></el-table-column>
      <el-table-column prop="nickname" label="昵称"></el-table-column>
      <el-table-column prop="devPort" label="主机端口号"></el-table-column>
      <el-table-column prop="houseName" label="房间名称"></el-table-column>
      <el-table-column prop="houseNum" label="房间号"></el-table-column>
      <el-table-column prop="phone" label="手机号"></el-table-column>
      <el-table-column prop="transferIp" label="转换服务器ip"></el-table-column>
      <el-table-column label="主机状态">
        <template slot-scope="scope">
          {{scope.row.devState==0?'初始状态':scope.row.devState==1?'tcp 连接成功':scope.row.devState==2?'tcp连接不成功':scope.row.devState==3?'注册成功':'注册不成功'}}
        </template>
      </el-table-column>
      <el-table-column label="媒体状态">
        <template slot-scope="scope">
          {{scope.row.sipState==0?'初始状态':scope.row.sipState==1?'没有连接':scope.row.sipState==2?'连接不成功':scope.row.sipState==3?'没有注册':scope.row.sipState==4?'注册成功':'注册不成功'}}
        </template>
      </el-table-column>
      <el-table-column prop="devLastRecv" label="主机最后接收命令时间"></el-table-column>
      <el-table-column prop="devLastSend" label="主机最后发送命令时间"></el-table-column>
      <el-table-column prop="sipLastRecv" label="sip最后接收命令时间"></el-table-column>
      <el-table-column prop="sipLastSend" label="sip最后发送命令时间"></el-table-column>
    </el-table>
    <paging @changePage = handleCurrentPage :get-total='total'></paging>
    </section>  
</template>

<script>
import paging from "../paging"
import { getIntercomDevSipInfo,xqSelectList,orgTree } from '../../url/api';
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
      total: 0,//数据总数
      dataTree:[],
      defaultProps2: {
        children: 'children',
        label: 'label',
        value: 'id',
        expandTrigger: 'hover',checkStrictly: true
      },
    }
  },
  methods:{
    getlist(){
      getIntercomDevSipInfo(this.formSearch).then((res)=>{//传统-主机/媒体实时状态
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
    handleCurrentPage(val){//页码改变
      this.formSearch.current=val
      this.getlist()
    },
    handleChange(value){
      if(value.length!=0){
        console.log(value)
        this.formSearch.orgId=this.$refs.cascader.getCheckedNodes()[0].data.id
      }else{
        this.formSearch.orgId = ''
      }
      getIntercomDevSipInfo(this.formSearch).then((res)=>{
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