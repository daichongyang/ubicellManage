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
      <el-form-item>
        <el-button size="small" @click="getlist">查 询</el-button>
      </el-form-item>
    </el-form>

    <el-tree
      :data="formData"
      :props='defaultProps'
      :load="loadNode"
      lazy
      node-key="id"
      :expand-on-click-node="false">
       <div class="custom-tree-node" slot-scope="{ node, data }">
        <span>{{ node.label }}</span>
        <span v-if="data.xqName">
          -区域名称：{{ data.xqName }}
          <el-button type="text" size="mini" @click="() => append(data,1)"> 启用 </el-button>
          <el-button type="text" size="mini" @click="() => append(data,0)"> 停用 </el-button>
          配置区域代号：<el-input v-model="data.sectionNo" style="width:100px;" size="small"></el-input>
          <el-button type="text" size="mini" @click="() => srueDate(data)"> 保存 </el-button>
          <el-button type="text" size="mini" @click="() => append1(data)"> 一键配置对讲号 </el-button> 

        </span>
        <span v-if="data.houseNum">
          -房间号：{{ data.houseNum }}
          <el-button type="text" size="mini" @click="() => append(data,1)"> 启用 </el-button>
          <el-button type="text" size="mini" @click="() => append(data,0)"> 停用 </el-button>
          配置房间对讲号：<el-input v-model="data.callNum" style="width:100px;" size="small"></el-input>
          <el-button type="text" size="mini" @click="() => srueDate(data)"> 保存 </el-button>
          <span class="green" v-if="data.callState==1" style="font-size:12px;">已启用</span>
          <span class="red" v-else style="font-size:12px;">未启用</span>
        </span>

      </div>
    </el-tree>


    </section>
</template>

<script>
import {updateHouseCallState,updateSectionNo,getSectionHouseList,xqSelectList,orgTree,setHouseCallNum,updateCallState,setOneHouseCallNum } from '../../url/api';
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
    }
  },
  methods:{
    srueDate(data){
      console.log(data)
      if(data.xqName){//配置区域代号
        updateSectionNo(data).then((res)=>{
          console.log(res)
          if(res.data.code == 200){
              this.$message({
                message: '操作成功',
                type: 'success'
              });
          }else{
            this.$message(res.data.msg);
          }
        })
      }else{//配置房间对讲号
        setOneHouseCallNum(data).then((res)=>{
          console.log(res)
          if(res.data.code == 200){
              this.$message({
                message: '操作成功',
                type: 'success'
              });
          }else{
            this.$message(res.data.msg);
          }
        })
      }
    },
    loadNode(node, resolve) {
      // console.log(node, resolve)
      if(node.level == 0){
        return resolve(node.data);
      }
      let data1=node.data.children||[]
      let data2 =node.data.houseNodes||[]
      let data3 =[...data1,...data2] 
      setTimeout(() => {
        const data = data3;
        resolve(data);
      }, 500);
    },
    append1(data){//一键配置对讲号
      console.log(data)
      // if(!data.sectionNo){
      //   this.$message('请先配置对讲号');
      //   return
      // }
      setHouseCallNum(data.id).then((res)=>{
        console.log(res)
        if(res.data.code == 200){
            this.$message({
              message: '操作成功',
              type: 'success'
            });
        this.getInit()
        }else{
          this.$message(res.data.msg);
        }
      })
      
    },
    append(data,callState){//启用和关闭
      console.log(data)
      let params = {
        id:data.id,
        callState:callState
      }
      if(data.xqName){//启用/停用区域对讲号
        updateCallState(params).then((res)=>{
          console.log(res)
          if(res.data.code == 200){
              this.$message({
                message: '操作成功',
                type: 'success'
              });
          }else{
            this.$message(res.data.msg);
          }
        })
      }else{
        updateHouseCallState(params).then((res)=>{
          console.log(res)
          if(res.data.code == 200){
              this.$message({
                message: '操作成功',
                type: 'success'
              });
          }else{
            this.$message(res.data.msg);
          }
        })
      }
    },
    getlist(){

      console.log(this.formSearch)
      getSectionHouseList(this.formSearch).then((res)=>{
        console.log(res)
        if(res.data.code == 200){
          this.formData = res.data.data.filter((item)=>{
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
              let obj = {
                orgId:this.dataTree[0].id||"",
                xqId:this.xqTree[0].id||"",
              }
              this.formSearch=obj
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
    handleChange(value){
      if(value.length!=0){
        console.log(value)
        this.formSearch.orgId=this.$refs.cascader.getCheckedNodes()[0].data.id
      }else{
        this.formSearch.orgId = ''
      }
      getSectionHouseList(this.formSearch).then((res)=>{
        console.log(res)
        if(res.data.code == 200){
          this.formData = res.data.data.filter((item)=>{
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
  }
}
</script>
<style>
.custom-tree-node .el-input__inner{
  min-width: 100px;
}
</style>
