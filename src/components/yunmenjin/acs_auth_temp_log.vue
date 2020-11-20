<template>
  <section class="modlude">
    <el-form :inline="true" :model="formSearch" class="form_inline" label-width="120px">
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
      <el-form-item label="类型" size="small">
        <el-select v-model="formSearch.type" placeholder="请选择进出方向" @change="getlist">
          <el-option label="业主通行证" :value="1"></el-option>
          <el-option label="成员通行证" :value="2"></el-option>
          <el-option label="访客通行证" :value="3"></el-option>
          <el-option label="实体卡通行证" :value="4"></el-option>
          <el-option label="临时通行证" :value="5"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="卡号" size="small" v-if="formSearch.type==4">
        <el-input v-model="formSearch.cardNo" placeholder="请输入设备卡号"></el-input>
      </el-form-item>
      <el-form-item label="授权人姓名" size="small" v-if="formSearch.type==2||formSearch.type==3">
        <el-input v-model="formSearch.fromName" placeholder="请输入授权人姓名"></el-input>
      </el-form-item>
      <el-form-item label="授权人手机号" size="small" v-if="formSearch.type==2||formSearch.type==3">
        <el-input v-model="formSearch.fromPhone" placeholder="请输入授权人手机号"></el-input>
      </el-form-item>
      <el-form-item label="身份证" size="small" v-if="formSearch.type==4||formSearch.type==5">
        <el-input v-model="formSearch.idNumber" placeholder="请输入身份证"></el-input>
      </el-form-item>
      <el-form-item label="房间名称" size="small" v-if="formSearch.type==1||formSearch.type==2||formSearch.type==3">
        <el-input v-model="formSearch.houseName" placeholder="请输入房间名称"></el-input>
      </el-form-item>
      <el-form-item label="区域名称" size="small" v-if="formSearch.type==1||formSearch.type==2||formSearch.type==3">
        <el-input v-model="formSearch.sectionName" placeholder="请输入区域名称"></el-input>
      </el-form-item>
      <el-form-item label="公司" size="small">
        <el-input v-model="formSearch.company" placeholder="请输入公司"></el-input>
      </el-form-item>
      <el-form-item label="部门" size="small">
        <el-input v-model="formSearch.department" placeholder="请输入部门"></el-input>
      </el-form-item>
      <el-form-item label="被授权人姓名" size="small">
        <el-input v-model="formSearch.toName" placeholder="请输入被授权人姓名"></el-input>
      </el-form-item>
      <!-- <el-form-item label="被授权人号码" size="small">
        <el-input v-model="formSearch.toPhone" placeholder="请输入被授权人号码"></el-input>
      </el-form-item> -->
      <el-form-item label="授权时间" size="small">
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
        <el-button v-if="formSearch.type == 4" size="small" @click="blackWhiteCards(1)">白名单操作</el-button>
        <el-button v-if="formSearch.type == 4" size="small" @click="blackWhiteCards(2)">黑名单操作</el-button>
        <el-button v-if="formSearch.type == 4" size="small" @click="blackWhiteCards(3)">回收操作</el-button>
      </el-form-item>
    </el-form>
    <el-table :data="formData" style="width: 100%" stripe @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55"></el-table-column>
      <el-table-column prop="xqName" label="小区名称"></el-table-column>
      <!-- <el-table-column prop="sectionName" label="区域"></el-table-column>
      <el-table-column prop="houseName" label="房间"></el-table-column> -->
      <el-table-column prop="cardNo" label="卡号"></el-table-column>
      <el-table-column prop="toName" label="被授权人姓名"></el-table-column>
      <el-table-column prop="toPhone" label="被授权人电话"></el-table-column>
      <el-table-column prop="fromName" label="授权人姓名"></el-table-column>
      <!-- <el-table-column prop="fromPhone" label="授权人电话"></el-table-column> -->
      <el-table-column prop="startTime" label="有效开始" width="150">
        <template slot-scope="scope">
          {{$root.getDateArray(scope.row.startTime)[9]}}
        </template>
      </el-table-column>
      <el-table-column label="有效结束" width="150">
        <template slot-scope="scope">
          {{$root.getDateArray(scope.row.endTime)[9]}}
        </template>
      </el-table-column>
      <el-table-column label="操作时间" width="150">
        <template slot-scope="scope">
          {{$root.getDateArray(scope.row.createTime)[9]}}
        </template>
      </el-table-column>
      <el-table-column prop="cardType" label="白/黑名单"></el-table-column>
      <el-table-column prop="remark" label="备注"></el-table-column>
      <!-- <el-table-column prop="nickname" label="备注">
        <template slot-scope="scope">
					{{scope.row.type==1?"业主通行证":scope.row.type==2?"成员通行证":scope.row.type==3?"访客通行证":scope.row.type==4?"实体卡通行证":"临时通行证"}}
        </template>
      </el-table-column> -->
    </el-table>
    <paging @changePage = handleCurrentPage :get-total='total'></paging>

    </section>  
</template>

<script>
import paging from "../paging"
import { showPasscardRecords,blackWhiteCards,openHwDev,xqSelectList,orgTree } from '../../url/api';
export default {
  data(){
    return{
      option1:[],
      xqTree:[],
      isAddorUpdate:1,//1添加、2修改
      formSearch:{
        type:4,
        xqId:''
      },
      deleBatch:[],
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
    blackWhiteCards(type){//黑白门禁操作
      let params={
        passcardIds:[],
        type:type
      }
      this.deleBatch.forEach(item=>{
        params.passcardIds.push(item.passcardId)
      })
      if( params.passcardIds.length==0){
        this.$message("请勾选实体卡")
        return
      }
      this.$confirm('确认要继续吗？')
      .then(_ => {
        blackWhiteCards(params).then((res)=>{
          console.log(res)
          if(res.data.code == 200){
            this.$message({
              message: '操作成功',
              type: 'success'
            });
            this.getlist()
          }else{
            this.$message("操作失败")
          }
        })
      })
      .catch(_ => {});
    },
    getlist(){
      showPasscardRecords(this.formSearch).then((res)=>{
        console.log(res)
        if(res.data.code == 200){
          this.formData = res.data.data.records
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
    handleSelectionChange(val) {//多选
      
      this.deleBatch = val
      console.log(this.deleBatch)
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
      showPasscardRecords(this.formSearch).then((res)=>{
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