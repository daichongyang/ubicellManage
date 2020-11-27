<template>
  <section class="form_content">
    <el-form :inline="true" :model="formSearch" class="form_inline">
      <el-form-item label="所属组织" size="small">
       <el-cascader
          ref="cascader"
          v-model="option1"
          :options="zuzhiTree"
          :props="defaultProps2"
          @change="zuzhiChange"
          clearable
         >
        </el-cascader>
      </el-form-item>
      <el-form-item label="选择小区" size="small" prop="xqId">
        <el-select v-model="formSearch.xqId" placeholder="请选择小区">
          <el-option v-for="item in xqTree" :label="item.name" :value="item.id" :key="item.id"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="房号" size="small">
        <el-input v-model="formSearch.houseNum" placeholder="请输入房号"></el-input>
      </el-form-item>
      <el-form-item label="房间名称" size="small">
        <el-input v-model="formSearch.name" placeholder="请输入房间名称"></el-input>
      </el-form-item>
    </el-form>
    <el-form :inline="true" :model="formSearch">
      <el-form-item label="区域名称" size="small">
        <el-input v-model="formSearch.sectionName" placeholder="请输入区域名称"></el-input>
      </el-form-item>
      <el-form-item label="房间类型" size="small">
        <el-select v-model="formSearch.type" placeholder="请选择房间类型">
          <el-option label="物业中心" value="1"></el-option>
          <el-option label="业主房间" value="2"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button size="small" @click="getList">查 询</el-button>
      </el-form-item>
    </el-form>
    <!-- 表格 -->
    <el-table :data="formData" style="width: 100%" ref="table"stripe stripe @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55" v-if="choiseStatus==2"></el-table-column>
      <el-table-column label="编号" width="60" v-else>
        <template slot-scope="scope">
          <el-radio v-model="houseRadio" :label="scope.row">{{scope.row.id}}</el-radio>
        </template>
      </el-table-column>
      <el-table-column prop="name" label="房间名称"></el-table-column>
      <el-table-column prop="houseNum" label="房间号" ></el-table-column>
      <el-table-column prop="floor" label="楼层" ></el-table-column>
      <el-table-column prop="sectionName"label="区域名称"></el-table-column>
      <el-table-column prop="xqName"label="小区名称"></el-table-column>
      <el-table-column prop="type"label="房间类型">
        <template slot-scope="scope">
          {{scope.row.type==1?"物业中心":"业主房间"}}
        </template>
      </el-table-column>
    </el-table>
    <paging @changePage = handleCurrentPage :get-total='total'></paging>
      <div class="export_template">
        <el-button size="small" @click="pushInfo" type="primary">确 定</el-button>
      </div>
  </section>
</template>

<script>
import paging from "./paging"
import {orgTree,houseList,xqSelectList } from '../url/api';
export default {
  props:["choisedStatus"],
  data(){
    return{
      formSearch:{//查询条件
        current:1,
        size: 10
      },
      houseRadio:{},//房间单选
      choiseStatus:this.choisedStatus,//1单选，2多选
      option1: [],
      formData: [],//数据
      total: 0,//数据总数
      xqTree:[],
      zuzhiTree:[],
      defaultProps2: {
        children: 'children',
        label: 'name',
        value: 'id',
        expandTrigger: 'hover',checkStrictly: true
      },
    }
  },
  methods:{
    pushInfo(){
      let houseInfor=this.houseRadio
      this.$emit("choiseHouseInfo",houseInfor)
    },
    getList(){
      // this.formSearch.xqId = this.xqTree\[0\]\.id||""
      houseList(this.formSearch).then((res)=>{//房间列表
        console.log(res)
        if(res.data.code == 200){
          this.formData = res.data.data.records.filter((item)=>{
            if(item.gmtModified){
              item.gmtModified = this.$root.getDateArray(item.gmtModified)[9]
            }
            return item
          })
          this.total = res.data.data.total
          this.pages = res.data.pages
        }else{
          this.$message(res.data.msg);
        }
      })
    },
    getInit(){//初始化列表
      this.getList()
      let org_tree={
        name:'',
        status:1
      }
      orgTree(org_tree).then((res)=>{//获取组织列表
        console.log(res)
        if(res.data.code == 200){
          this.zuzhiTree = res.data.data
        }
      })
      let org_tree1={}
      xqSelectList(org_tree1).then((res)=>{//小区选择列表
        console.log(res)
        if(res.data.code == 200){
          this.xqTree = res.data.data
          if(this.xqTree.length!=0){
            this.formSearch.xqId = this.xqTree[0].id
          }
        }
      })
    },
    zuzhiChange(value){//改变组织
      if(value.length!=0){
        console.log(value)
        this.formSearch.orgId=this.$refs.cascader.getCheckedNodes()[0].data.id
      }else{
        this.formSearch.orgId = ''
      }
      this.getList(this.formSearch)
    },
    handleCurrentPage(val){//页码改变
      this.formSearch.current=val
      this.getList()
    },
    handleSelectionChange(val){//多选
      console.log(val)
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
.table_row{
  color: #a1d6f4;
  width: 100%;
  font-size: 16px;
}
.show_father{
  height:50px;
  color:#a1d6f4;
  border:1px solid #a1d6f4;
  padding:0 10px;
  display: flex;
  align-items: center;
  margin-bottom:20px;
  position:relative;
}
.show_father_box{
  display: flex;
  align-items: center;
  flex: 1;
}
.pagination{
  margin-bottom:10px;
}
</style>
