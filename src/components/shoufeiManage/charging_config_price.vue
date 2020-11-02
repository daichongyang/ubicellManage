<template>
  <section class="modlude">
    <div class="nav_options" style="margin-bottom:20px;">
      <div class="nav_option" :class="{nav_option_active:isActive == 1}" @click="isActive=1">
        <span>水电煤配置</span>
      </div>
      <div class="nav_option" :class="{nav_option_active:isActive == 2}" @click="gogudinfeiyon_config">
        <span>固定费用配置</span>
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
              lazy
              node-key="id"
              :expand-on-click-node="false">
              
                <div class="custom-tree-node" slot-scope="{ node, data }">
                  <el-radio-group v-model="typeId.id" @change="changeRadio(data)">
                    <el-radio :label="node.id"><span>{{ node.label }}</span></el-radio>
                  </el-radio-group>
                </div>
              
            </el-tree>
          </div>
        </div>
      </div>
      <!-- 右边 -->
      <div class="settingsEle" style="position: static;">
      <el-table ref="multipleTable" :data="inforList" highlight-current-row @selection-change="selsChange" style="width: 100%;">
        <el-table-column class="ccc" type="selection" width="55" label="全选"></el-table-column>
        <el-table-column prop="name" label="分类" width="200">
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
        <el-table-column label="是否启用">
          <template slot-scope="scope">
            <el-radio-group v-model="scope.row.useAble">
              <el-radio :label="1"><span>是</span></el-radio>
              <el-radio :label="0"><span>否</span></el-radio>
            </el-radio-group>
          </template>
        </el-table-column>
      </el-table>
        <div style="text-align:center;margin-top:20px;">
          <el-button @click="updateMeterPriceConfig">保存</el-button>
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

import {updateHouseCallState,updateSectionNo,housetree,xqSelectList,orgTree,meterPriceConfig,updateMeterPriceConfig } from '../../url/api';
export default {
  data(){
    return{
      isActive:1,
      inforList:[],
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
      typeId:{},
      updata:[]
    }
  },
  methods:{
    gogudinfeiyon_config(){
      this.$router.push({
        path:'/gudinfeiyon_config'
      })
    },
    updateMeterPriceConfig(){//水电煤费用价格修改
      if(this.updata.length==0){
        this.$message("请勾选对象")
        return 
      }
      let params = this.updata
      console.log(params)
      updateMeterPriceConfig(params).then(res=>{
        console.log(res)
        if(res.data.code == 200){
          this.$message("配置成功")
        }else{
          this.$message("配置失败")
        }
      })
    },
    changeRadio(obj){//勾选区域或者房间
      console.log(obj)
      this.typeId.type = obj.type
      if(obj.type==1){//区域
        this.getMeterPriceConfig(this.formSearch.xqId,null,obj.id)
      }else{
        this.getMeterPriceConfig(this.formSearch.xqId,obj.id,null)
      }
    },
    getMeterPriceConfig(xqId,houseId,sectionId){//水电煤费用价格数据
      let params = {
        xqId:xqId,
        houseId:houseId,
        sectionId:sectionId
      }
      meterPriceConfig(params).then(res=>{
        console.log(res)
        if(res.data.code == 200){
          this.inforList = res.data.data
        }
      })
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
    selsChange: function (sels) {// 当选择项发生变化时会触发该事件
      console.log(sels)
      this.updata=[]
      sels.forEach(item=>{
        let newItem = {
          id:item.id,
          unitPrice:item.unitPrice,
          useAble:item.useAble,
          xqId:this.formSearch.xqId,
          type:this.typeId.type
        }
        this.updata.push(newItem)
      })
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
  float: left;
  min-width: 280px;
  /* background: #f6f8fb;
  border: 1px solid #e6e6e6; */
}
.chooseCommunity .communityContent {
  border: 1px solid #e6e6e6;
  height: 700px;
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


