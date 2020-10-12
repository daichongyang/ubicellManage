<template>
  <section class="modlude">
    <el-form :inline="true" :model="formSearch" class="form_inline" label-width="100px">
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
      <el-form-item label="主叫设备名" size="small">
        <el-input v-model="formSearch.callerDevice" placeholder="请输入主叫设备名"></el-input>
      </el-form-item>
      <el-form-item label="主叫所在区域" size="small">
        <el-input v-model="formSearch.callerSection" placeholder="请输入主叫所在区域"></el-input>
      </el-form-item>
      <el-form-item label="被叫房间名称" size="small">
        <el-input v-model="formSearch.houseName" placeholder="请输入被叫房间名称"></el-input>
      </el-form-item>
      <el-form-item label="被叫房间所在区域" size="small">
        <el-input v-model="formSearch.houseSection" placeholder="请输入被叫房间所在区域"></el-input>
      </el-form-item>
      <el-form-item label="主叫手机号" size="small">
        <el-input v-model="formSearch.phone" placeholder="请输入手机号"></el-input>
      </el-form-item>
      <el-form-item label="呼叫类型" size="small">
        <el-select v-model="formSearch.type" placeholder="请选择呼叫类型">
          <el-option label="门口机和对讲机呼叫记录" :value="1"></el-option>
          <el-option label="个人呼叫房间" :value="2"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="呼叫时间" size="small">
        <el-date-picker
          v-model="formSearch.startTime"
          type="datetime"
          value-format="timestamp"
          placeholder="开始时间">
        </el-date-picker>
        <span style="color:#a1d6f4;"> - </span>
        <el-date-picker
          v-model="formSearch.endTime"
          type="datetime"
          value-format="timestamp"
          placeholder="结束时间">
        </el-date-picker>
      </el-form-item>
      <el-form-item>
        <el-button size="small" @click="getlist">查 询</el-button>
      </el-form-item>
    </el-form>
    <el-table :data="formData" style="width: 100%" stripe>
      <el-table-column prop="callerDevice" label="主叫设备名"></el-table-column>
      <el-table-column prop="callerName" label="呼叫者姓名"></el-table-column>
      <el-table-column prop="callerSection" label="主叫设备区域名"></el-table-column>
      <el-table-column prop="companydst" label="呼叫号"></el-table-column>
      <el-table-column prop="houseName" label="房间名"></el-table-column>
      <el-table-column prop="houseSection" label="房间区域名"></el-table-column>
      <el-table-column prop="phone" label="手机号"></el-table-column>
      <el-table-column prop="talkTime" label="通话时长"></el-table-column>
      <el-table-column prop="callDate" label="呼叫时间"></el-table-column>
      <el-table-column label="类型">
        <template slot-scope="scope">
					{{scope.row.type==1?"门口机和对讲机呼叫记录":"个人呼叫房间"}}
				</template>
      </el-table-column>
    </el-table>
<paging @changePage = handleCurrentPage :get-total='total'></paging>
    </section>  
</template>

<script>
import paging from "../paging"
import { callHistory,openHwDev,xqSelectList,orgTree } from '../../url/api';
export default {
  data(){
    return{
      option1:[],
      xqTree:[],
      isAddorUpdate:1,//1添加、2修改
      formSearch:{
        type:1,
        current:1,
        size:10
      },
      formData: [],//数据
      formUpdate:{},//修改表单
      total: 0,//数据总数
      dataTree:[],
      defaultProps2: {
        children: 'children',
        label: 'name',
        value: 'id',
        expandTrigger: 'hover',checkStrictly: true
      },
    }
  },
  methods:{
    getlist(){
      callHistory(this.formSearch).then((res)=>{//对讲日志
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
          this.formSearch.xqId = this.xqTree[0].id||""
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
      this.getInit()
    },
    handleChange(value){
      if(value.length!=0){
        console.log(value)
        this.formSearch.orgId=this.$refs.cascader.getCheckedNodes()[0].data.id
      }else{
        this.formSearch.orgId = ''
      }
      callHistory(this.formSearch).then((res)=>{
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