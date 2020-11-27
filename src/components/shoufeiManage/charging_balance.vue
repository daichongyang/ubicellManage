<template>
  <section class="modlude gudinfeiyon">
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
        <el-select v-model="formSearch.xqId" placeholder="请选择小区" @change="getlist">
          <el-option v-for="(item,index) in xqTree" :label="item.name" :value="item.id" :key="index"></el-option>
        </el-select>
      </el-form-item>
        <el-form-item label="房间类型" size="small">
          <el-select v-model="formSearch.type">
            <el-option label="物业中心" :value="1"></el-option>
            <el-option label="业主房间" :value="2"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="房号" size="small">
          <el-input v-model="formSearch.houseNum"></el-input>
        </el-form-item>
        <el-form-item label="房间名称" size="small">
          <el-input v-model="formSearch.name"></el-input>
        </el-form-item>
        <el-form-item label="区域名称" size="small">
          <el-input v-model="formSearch.sectionName"></el-input>
        </el-form-item>
      <el-form-item>
        <el-button size="small" @click="getlist">查 询</el-button>
        <el-button size="small" type="danger" @click="deleInfor(false)">批量结算</el-button>
      </el-form-item>
    </el-form>
    <el-table :data="formData" style="width: 100%" ref="table" stripe @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55"></el-table-column>
      <el-table-column prop="name" label="房间名称" ></el-table-column>
      <el-table-column prop="houseNum" label="房间门牌号" ></el-table-column>
      <el-table-column prop="xqName" label="小区名称"></el-table-column>
      <el-table-column prop="sectionName" label="区域名称"></el-table-column>
      <el-table-column prop="" label="房间类型">
        <template slot-scope="scope">
          {{scope.row.type==1?"管家房间":"业主房间"}}
        </template>
      </el-table-column>
      <el-table-column prop="balances" :label="item.name+'余额'" v-for="(item,index) in formData2" :key="index">
        <template slot-scope="scope">
          {{scope.row.balances.find(ii=>ii.cardId==item.cardId).balanceAmount}} 元
        </template>
      </el-table-column>

      <el-table-column label="操作" fixed="right" width="100px">
				<template slot-scope="scope">
            <!-- <el-button size="mini" type="primary" @click.native="refillPrint(scope.row)">打印收据</el-button> -->
				</template>
			</el-table-column>
    </el-table>
    <paging @changePage = handleCurrentPage :get-total='total'></paging>
  </section>
</template>
<script>
import paging from "../paging"
import houseListModule from "../houseListModule"
import {xqSelectList,orgTree,accountBalanceList,accountBalanceListOption,accountBalanceListSettlement ,deleteproperty,refillPrint } from '../../url/api';
export default {
  data(){
    return{
      addDialog:false,
      option1:[],
      xqTree:[],
      formSearch:{
        xqId:'',
        size:10,
        current:1
      },
      total:0,
      formData: [],//数据
      formData2: [],//数据
      dataTree:[],
      defaultProps: {
        children: 'children',
        label: 'name',
      },
      defaultProps2: {
        children: 'children',
        label: 'name',
        value: 'id',
        expandTrigger: 'hover',checkStrictly: true
      },
      deleBatch:[],
      rules: {
        houseId:[{ required: true, message: '该项不能为空',trigger: 'blur'}],
        amount:[{ required: true, message: '该项不能为空',trigger: 'blur'}],
        address:[{ required: true, message: '该项不能为空',trigger: 'blur'}],
        idNumber:[{ required: true, message: '该项不能为空',trigger: 'blur'}],
        phone:[{ required: true, message: '该项不能为空',trigger: 'blur'}],
        title:[{ required: true, message: '该项不能为空',trigger: 'blur'}],
        cardId:[{ required: true, message: '该项不能为空',trigger: 'change'}],
      },

    }
  },
  methods:{
    deleInfor(ids){//删除
      let arrId = []
      if(ids){
        arrId.push(ids)
      }else{
        if(this.deleBatch.length!=0){
          this.deleBatch.filter((item)=>{
            arrId.push(item.id)
            return item
          })
        }
      }
      this.$confirm('确认批量结算吗？')
      .then(_ => {
        accountBalanceListSettlement(arrId).then((res)=>{
          console.log(res)
          if(res.data.code == 200){
            this.$message('结算成功');
            this.getlist()
          }
        })
      })
      .catch(_ => {});
    },
    getlist(){
      let params2={
        xqId:this.formSearch.xqId
      }
      accountBalanceListOption(params2).then((res)=>{//查询小区余额项目
        console.log(res)
        if(res.data.code == 200){
          this.formData2 = res.data.data.filter((item)=>{
            return item
          })
        }else{
          this.$message(res.data.msg);
        }
      })
      let params1 =this.formSearch
      console.log(this.formSearch)
      accountBalanceList(params1).then((res)=>{//余额查询分页列表
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
      let org_tree={
        name:'',
        status:1
      }
      orgTree(org_tree).then((res)=>{//获取组织列表
        console.log(res)
        if(res.data.code == 200){
          this.dataTree = res.data.data
          xqSelectList({}).then((ress)=>{//小区选择列表
            console.log(ress)
            if(ress.data.code == 200){
              this.xqTree = ress.data.data
              this.formSearch.xqId = this.xqTree[0].id
              this.getlist()
            }
          })
        }
      })

    },
    handleCurrentPage(val){//页码改变
      this.formSearch.current=val
      this.getlist()
    },
    handleChange(value){//组织改变，请求列表
      if(value.length!=0){
        console.log(value)
        this.formSearch.orgId=this.$refs.cascader.getCheckedNodes()[0].data.id
      }else{
        this.formSearch.orgId = ''
      }
      this.getlist()
    },
    handleSelectionChange(val,self) {//勾选账单
      console.log(val,self)
      this.deleBatch = val
    },
  },
  mounted(){
    this.getInit()
  },
  components:{
    paging,
  }
}
</script>
<style scoped>

</style>


