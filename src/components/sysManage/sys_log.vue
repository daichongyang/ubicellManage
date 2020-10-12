<template>
  <section class="modlude">
    <el-form :inline="true" :model="formSearch" class="form_inline" label-width="90px">
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
      <el-form-item label="操作人名称" size="small">
        <el-input v-model="formSearch.name" placeholder="请输入操作人名称"></el-input>
      </el-form-item>
      <el-form-item label="操作人账号" size="small">
        <el-input v-model="formSearch.account" placeholder="请输入操作人账号"></el-input>
      </el-form-item>
      <el-form-item label="操作菜单" size="small">
        <el-input v-model="formSearch.label" placeholder="请输入操作菜单"></el-input>
      </el-form-item>
      <el-form-item label="操作时间" size="small">
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
      <el-table-column prop="account" label="操作人账号"></el-table-column>
      <el-table-column prop="name" label="操作人名称"></el-table-column>
      <el-table-column prop="detail" label="操作人内容"></el-table-column>
      <el-table-column prop="gmtCreate" label="操作时间"></el-table-column>
      <el-table-column prop="label" label="操作菜单"></el-table-column>
      <el-table-column label="操作类型">
        <template slot-scope="scope">
					{{scope.row.optType==1?"增加":scope.row.optType==2?"删除":"修改"}}
				</template>
      </el-table-column>
      <el-table-column label="操作结果">
        <template slot-scope="scope">
					{{scope.row.result==1?"成功":"失败"}}
				</template>
      </el-table-column>
    </el-table>
    <paging @changePage = handleCurrentPage :get-total='total'></paging>

    </section>  
</template>

<script>
import paging from "../paging"
import { sysLogList,xqSelectList,orgTree } from '../../url/api';
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
      sysLogList(this.formSearch).then((res)=>{
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
      sysLogList(this.formSearch).then((res)=>{
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