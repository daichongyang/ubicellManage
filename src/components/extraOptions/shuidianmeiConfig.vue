<template>
  <section class="modlude">
    <div class="nav_options" style="margin-bottom:20px;">
      <div class="nav_option" :class="{nav_option_active:isActive == 1}" @click="gocommon_config">
        <span>支付配置</span>
      </div>
      <div class="nav_option" :class="{nav_option_active:isActive == 2}" @click="isActive=2">
        <span>账单配置</span>
      </div>
      <div class="nav_option" :class="{nav_option_active:isActive == 3}" @click="isActive=3">
        <span>考勤配置</span>
      </div>
      <div class="nav_option" :class="{nav_option_active:isActive == 4}" @click="isActive=4">
        <span>保修类型配置</span>
      </div>
      <div class="nav_option" :class="{nav_option_active:isActive == 5}" @click="isActive=5">
        <span>在线申请配置</span>
      </div>
      <div class="nav_option" :class="{nav_option_active:isActive == 6}" @click="isActive=6">
        <span>内容可见范围配置</span>
      </div>
      <div class="nav_option" :class="{nav_option_active:isActive == 7}" @click="goshuidianmeiConfig">
        <span>水电煤配置</span>
      </div>
    </div>
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
    <div class="equi">
      <div class="chooseCommunity" style="position: static;">
        <div class="community">
          <div class="communityContent">
            <el-tree
              :data="formData"
              :props='defaultProps'
              :load="loadNode"
              show-checkbox
              lazy
              node-key="id"
              :expand-on-click-node="false">
              <div class="custom-tree-node" slot-scope="{ node, data }">
                <span>{{ node.label }}</span>
                <span v-if="data.xqName">
                  -区域名称：{{ data.xqName }}
                  <!-- <el-button type="text" size="mini" @click="() => append(data,1)"> 启用 </el-button>
                  <el-button type="text" size="mini" @click="() => append(data,0)"> 停用 </el-button>
                  配置区域代号：<el-input v-model="data.sectionNo" style="width:100px;" size="small"></el-input>
                  <el-button type="text" size="mini" @click="() => srueDate(data)"> 保存 </el-button>
                  <el-button type="text" size="mini" @click="() => append1(data)"> 一键配置对讲号 </el-button>  -->

                </span>
                <span v-if="data.houseNum">
                  <!-- -房间号：{{ data.houseNum }} -->
                  <!-- <el-button type="text" size="mini" @click="() => append(data,1)"> 启用 </el-button>
                  <el-button type="text" size="mini" @click="() => append(data,0)"> 停用 </el-button>
                  配置房间对讲号：<el-input v-model="data.callNum" style="width:100px;" size="small"></el-input>
                  <el-button type="text" size="mini" @click="() => srueDate(data)"> 保存 </el-button>
                  <span class="green" v-if="data.callState==1" style="font-size:12px;">已启用</span>
                  <span class="red" v-else style="font-size:12px;">未启用</span> -->
                </span>

              </div>
            </el-tree>
          </div>
        </div>
      </div>
      <!-- 右边 -->
      <div class="settingsEle" style="position: static;">
      <el-table ref="multipleTable" :data="inforList" highlight-current-row style="width: 100%;">
        </el-table-column>
        <el-table-column prop="name" label="分类">
        </el-table-column>
        <el-table-column label="单价">
          <template slot-scope="scope">
            <el-form>
              <el-form-item label="￥">
                <el-input v-model="scope.row.unitPrice" style="width:200px;"></el-input>
                <span>/{{scope.row.unit}}</span>
              </el-form-item>
            </el-form>
          </template>
        </el-table-column>
      </el-table>
        <div style="text-align:center;margin-top:20px;">
          <el-button @click="">保存</el-button>
        </div>
        <!-- 通用配置-水电煤配置-费用收款日设置数据 -->
        <!-- <div class="choise_data" style="margin-top:20px;">
          <div>
            <el-radio v-model="choiseData.receiptType" :label="0">跟随收租日</el-radio>
          </div>
          <div>
            <el-radio v-model="choiseData.receiptType" :label="1">自定义日期</el-radio>
            <el-input v-model="choiseData.receiptDay" style="width:220px;margin-left:20px;"></el-input>
            <span style="color:#999;">日期需在（1号-28号）内</span>
          </div>
          <div style="text-align:center;margin-top:20px;">
            <el-button @click="configMeterReceiptUpdatee">保存</el-button>
          </div>
        </div> -->
      </div>
      <!-- <div v-else class="settingsEle" style="position: static;color:#507bea;" >请先创建公寓</div> -->

    </div>
  </section>
</template>
<script>

import {updateHouseCallState,updateSectionNo,housetree,xqSelectList,orgTree,setHouseCallNum,updateCallState,setOneHouseCallNum } from '../../url/api';
export default {
  data(){
    return{
      isActive:7,
      inforList:[{
        name:"起飞",
        unit:'gk',
        unitPrice:'wewq'
      }],
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
    gocommon_config(){
      this.$router.push({
        path:'./common_config'
      })
    },
    goshuidianmeiConfig(){
      this.$router.push({
        path:'./shuidianmeiConfig'
      })
    },
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
      let data2 =node.data.houses||[]
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
    getlist(obj){
      if(obj.xqId){
        this.formSearch = obj
      }
      let params =[this.formSearch.xqId]
      console.log(this.formSearch)
      housetree(params).then((res)=>{
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
                // orgId:this.dataTree[0].id||"",
                xqId:this.xqTree[0].id||"",
              }
              
              this.getlist(obj)
            }
          })
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
      let params = [this.formSearch.xqId]
      housetree(params).then((res)=>{//区域-房间树状列表
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
<style scoped>
@import '../../assets/mySelf.css';

.chooseCommunity {
  margin-top: 20px;
  padding-top: 10px;
  float: left;
  min-width: 280px;
  /* background: #f6f8fb;
  border: 1px solid #e6e6e6; */
}
.chooseCommunity .communityContent {
  border: 1px solid #e6e6e6;
  height: 700px;
  padding-left: 10px;
  margin-top: 10px;
}
.chooseCommunity .communityContent .list {
  padding-top: 10px;
}
.chooseCommunity .communityContent .orgName span:first-child {
  cursor: pointer;
}
.chooseCommunity .communityContent .orgName span:first-child.active {
  color: #507bea;
}
.chooseCommunity .communityContent ul li.communityList {
  display: block;
  padding-left: 20px;
  position: relative;
  line-height: 36px;
  font-size: 14px;
  cursor: pointer;
}
.chooseCommunity .communityContent ul li.communityList.active {
  color: #507bea;
}
.chooseCommunity .communityContent ul li.communityList .circle {
  position: absolute;
  display: inline-block;
  width: 6px;
  height: 6px;
  background-color: #507bea;
  border-radius: 50%;
  top: 50%;
  left: 4px;
  -webkit-transform: translateY(-50%);
  -ms-transform: translateY(-50%);
  transform: translateY(-50%);
}
.chooseCommunity .communityContent ul li.communityList .circle .line {
  position: absolute;
  top: 0;
  left: 50%;
  display: inline-block;
  height: 40px;
  width: 1px;
  background:#507bea;
  transform: translateX(-50%);
}
.chooseCommunity .communityContent ul li.communityList:last-child .circle .line {
  display: none;
}
.settingsEle {
  margin-left: 300px;
  /* background: #fff; */
  margin-top: 20px;
  padding: 10px 20px;
  height: 756px;
  overflow: auto;
}
</style>


