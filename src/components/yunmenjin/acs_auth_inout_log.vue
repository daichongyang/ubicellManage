<template>
  <section class="modlude">
    <el-form :inline="true" :model="formSearch" class="form_inline" label-width="80px">
      <!-- <el-form-item label="所属组织" size="small">
       <el-cascader
          ref="cascader"
          v-model="option1"
          :options="dataTree"
          :props="defaultProps2"
          @change="handleChange"
          clearable
         >
        </el-cascader>
      </el-form-item> -->
      <el-form-item label="选择小区" size="small">
        <el-select v-model="formSearch.xqId" placeholder="请选择小区">
          <el-option v-for="(item,index) in xqTree" :label="item.name" :value="item.id" :key="index"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="卡号" size="small">
        <el-input v-model="formSearch.cardNum" placeholder="请输入设备卡号"></el-input>
      </el-form-item>
      <el-form-item label="进出方向" size="small">
        <el-select v-model="formSearch.inOut" placeholder="请选择进出方向">
          <el-option label="进" :value="1"></el-option>
          <el-option label="出" :value="2"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="操作类型" size="small">
        <el-select v-model="formSearch.operType" placeholder="请选择进出方向">
          <el-option label="所有" :value="0"></el-option>
          <el-option label="刷卡" :value="1"></el-option>
          <el-option label="二维码" :value="2"></el-option>
          <el-option label="蓝牙" :value="3"></el-option>
          <el-option label="网络" :value="4"></el-option>
          <el-option label="人脸" :value="5"></el-option>
          <el-option label="密码" :value="6"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="开门结果" size="small">
        <el-select v-model="formSearch.operResult" placeholder="请选择开门结果">
          <el-option label="失败" :value="0"></el-option>
          <el-option label="成功" :value="1"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="设备名称" size="small">
        <el-input v-model="formSearch.name" placeholder="设备名称"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button size="small" @click="getlist">查 询</el-button>
      </el-form-item>
    </el-form>
    <el-table :data="formData" style="width: 100%" stripe>
      <el-table-column prop="devName" label="设备名称"></el-table-column>
      <el-table-column prop="cardNum" label="卡号"></el-table-column>
      <el-table-column label="开门结果">
        <template slot-scope="scope">
					{{scope.row.operResult==0?"失败":"成功"}}
				</template>
      </el-table-column>
      <el-table-column prop="xqName" label="小区名称"></el-table-column>
      <el-table-column label="操作类型">
        <template slot-scope="scope">
					{{scope.row.operType==1?"刷卡":scope.row.operType==2?"二维码":scope.row.operType==3?"蓝牙":scope.row.operType==4?"网络":scope.row.operType==5?"人脸":"密码"}}
				</template>
      </el-table-column>
      <el-table-column prop="gmtCreate" label="开门时间" width=200></el-table-column>
      <el-table-column prop="phone" label="手机号"></el-table-column>
      <el-table-column prop="nickname" label="昵称"></el-table-column>
    </el-table>
    <paging @changePage = handleCurrentPage :get-total='total'></paging>

    </section>  
</template>

<script>
import paging from "../paging"
import { getAcDoorOperLog,openHwDev,xqSelectList,orgTree } from '../../url/api';
export default {
  data(){
    return{
      option1:[],
      xqTree:[],
      isAddorUpdate:1,//1添加、2修改
      formSearch:{},
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
      getAcDoorOperLog(this.formSearch).then((res)=>{
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
    getInit(){//初始化列表
      this.getlist()
      xqSelectList({}).then((res)=>{//小区选择列表
        console.log(res)
        if(res.data.code == 200){
          this.xqTree = res.data.data
          this.formSearch.xqId= this.xqTree[0].id
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
      this.getInit()
    },
    handleChange(value){
      if(value.length!=0){
        console.log(value)
        this.formSearch.orgId=this.$refs.cascader.getCheckedNodes()[0].data.id
      }else{
        this.formSearch.orgId = ''
      }
      getAcDoorOperLog(this.formSearch).then((res)=>{
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