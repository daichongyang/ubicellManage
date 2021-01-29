<template>
  <section class="modlude">
    <el-form :inline="true" :model="formSearch" class="form_inline" label-width="80px">
      <el-form-item label="选择小区" size="small">
        <el-select v-model="formSearch.xqId" placeholder="请选择小区" @change="getlist">
          <el-option v-for="(item,index) in xqTree" :label="item.name" :value="item.id" :key="index"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="设备名称" size="small">
        <el-input v-model="formSearch.DevName" placeholder="设备名称"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button size="small" @click="getlist">查 询</el-button>
      </el-form-item>
    </el-form>
    <el-table :data="formData" style="width: 100%" stripe>
      <el-table-column prop="DevName" label="设备名称"></el-table-column>
      <el-table-column prop="StaffNo" label="人员"></el-table-column>
      <el-table-column prop="TcmName" label="开门方式"></el-table-column>
      <el-table-column prop="WorkStationName" label="所属区"></el-table-column>
      <el-table-column prop="OpenDate" label="开门时间" width=200></el-table-column>
      
    </el-table>
    <paging @changePage = handleCurrentPage :get-total='total'></paging>

    </section>  
</template>

<script>
import paging from "../paging"
import { getFushiDoorOperLog,openHwDev,xqSelectList,orgTree } from '../../url/api';
export default {
  data(){
    return{
      option1:[],
      xqTree:[],
      isAddorUpdate:1,//1添加、2修改
      formSearch:{
        xqId:""
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
      getFushiDoorOperLog(this.formSearch).then((res)=>{
        console.log(res)
        if(res.data.code == 200){
          let obj = JSON.parse(res.data.data)
          this.formData =obj.Records.filter((item)=>{
            if(item.gmtCreate){
              item.gmtCreate = this.$root.getDateArray(item.gmtCreate)[9]
            }
            return item
          })
          this.total = obj.PageAttri.TotalCount
        }else{
          this.$message(res.data.msg);
        }
      })
    },
    getInit(){//初始化列表
      
      xqSelectList({}).then((res)=>{//小区选择列表
        console.log(res)
        if(res.data.code == 200){
          this.xqTree = res.data.data
          this.formSearch.xqId= this.xqTree[0].id
          this.getlist()
        }
      })
      // let org_tree={
      //   name:'',
      //   status:1
      // }
      // orgTree(org_tree).then((res)=>{//获取组织列表
      //   console.log(res)
      //   if(res.data.code == 200){
      //     this.dataTree = res.data.data
      //   }
      // })
    },
    deleInfor(obj){//远程开门
      let params = {
        id:obj.id,
        name:obj.name,
        account:localStorage.getItem('phone')
      }
      openHwDev(params).then((res)=>{
        console.log(res)
        if(res.data.code == 200){
          this.$message({
            message: '远程开门成功',
            type: 'success'
          });
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
      this.getlist()
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