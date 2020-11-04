<template>
  <section class="modlude gudinfeiyon">
    <div class="nav_options" style="margin-bottom:20px;">
      <div class="nav_option" :class="{nav_option_active:isActive == 1}" @click="gocharging_config_price">
        <span>水电煤配置</span>
      </div>
      <div class="nav_option" :class="{nav_option_active:isActive == 2}" @click="isActive=2">
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
      <el-form-item label="房号" size="small">
        <el-input v-model="formSearch.houseNum" placeholder="请输入房号"></el-input>
      </el-form-item>
      <el-form-item label="房间名称" size="small">
        <el-input v-model="formSearch.name" placeholder="请输入房间名称"></el-input>
      </el-form-item>
      <el-form-item label="区域名称" size="small">
        <el-input v-model="formSearch.sectionName" placeholder="请输入区域名称"></el-input>
      </el-form-item>
        <el-form-item label="房间类型" size="small">
          <el-select v-model="formSearch.type">
            <el-option label="物业中心" :value="1"></el-option>
            <el-option label="业主房间" :value="2"></el-option>
          </el-select>
        </el-form-item>
      <el-form-item>
        <el-button size="small" @click="getlist">查 询</el-button>
      </el-form-item>
    </el-form>
    <el-table :data="formData" style="width: 100%" ref="table">
      <el-table-column prop="name" label="房间名称"></el-table-column>
      <el-table-column prop="houseNum" label="房间号" ></el-table-column>
      <el-table-column prop="xqName"label="小区名称"></el-table-column>
      <el-table-column prop="costOptions"label="固定缴费项" width="550"></el-table-column>
      <el-table-column prop="type"label="房间类型">
        <template slot-scope="scope">
          {{scope.row.type==1?"物业中心":"业主房间"}}
        </template>
      </el-table-column>
      <el-table-column label="操作" fixed="right" width='250'>
				<template slot-scope="scope">
					<el-button type="primary" size="small" @click="getHouseFixedFeeInfo(scope.row)">查看详情</el-button>
					<el-button type="warning" size="small" @click="updateShowBox(scope.row)">修 改</el-button>
				</template>
			</el-table-column>
    </el-table>
    <paging @changePage = handleCurrentPage :get-total='total'></paging>
    <!-- 修改 -->
    <el-dialog class="gudinfeiyon_dialog" title="修改" :visible.sync="updateDialog" :close-on-click-modal="false">
      <el-button type="primary" size="small" @click="addList">添 加</el-button>
      <el-table ref="multipleTable" :data="inforList" highlight-current-row style="width: 100%;">
        <el-table-column prop="name" label="类型">
          <template slot-scope="scope">
            <el-select v-model="scope.row.optionName" placeholder="请选择类型" size="small" @change="changeSelect(scope.row)">
              <el-option v-for="(item,index) in houseFixed" :label="item.costName" :value="item.costName" :key="index" :disabled="item.disabled"></el-option>
            </el-select>
          </template>
        </el-table-column>
        <el-table-column label="数量">
          <template slot-scope="scope">
            <el-input size="small" v-model="scope.row.num"></el-input>
          </template>
        </el-table-column>
        <el-table-column label="单价（元）">
          <template slot-scope="scope">
            <el-input size="small" v-model="scope.row.price"></el-input>
          </template>
        </el-table-column>
        <el-table-column label="缴费周期" width="450">
          <template slot-scope="scope">
            <el-tag
              :key="index"
              v-for="(tag,index) in scope.row.dynamicTags"
              closable
              :disable-transitions="false"
              @close="handleClose(tag,scope.row)">
              {{tag}}
            </el-tag>
            <el-input
              v-if="scope.row.inputVisible"
              v-model="scope.row.inputValue"
              size="small"
              @keyup.enter.native="handleInputConfirm(scope.row)"
              @blur="handleInputConfirm(scope.row)"
            >
            </el-input>
            <el-button v-else class="button-new-tag" size="small" @click="showInput(scope.row)">+ 周期</el-button>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="80">
          <template slot-scope="scope">
            <el-button type="danger" size="small" @click="deleteRow(scope.$index, inforList)">删 除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <span slot="footer" class="dialog-footer">
        <el-button @click="updateDialog = false">取 消</el-button>
        <el-button type="primary" @click="addUpdateHouseFixedFeeList">确 定</el-button>
      </span>
    </el-dialog>
    <el-dialog class="gudinfeiyon_define" title="详情" :visible.sync="defineDialog" :close-on-click-modal="false">
      <el-form class="form_inline" style="margin-bottom:20px;" v-for="(item,index) in defineData" :key="index" label-width="100px">
        <el-form-item label="费用项名称:" size="small">
          <el-input v-model="item.optionName" placeholder=""></el-input>
        </el-form-item>
        <el-form-item label="数量:" size="small">
          <el-input v-model="item.num" placeholder=""></el-input>
        </el-form-item>
        <el-form-item label="单价:" size="small">
          <el-input v-model="item.price" placeholder=""></el-input>
        </el-form-item>
        <el-form-item label="每月需缴纳:" size="small">
          <el-input v-model="item.cost" placeholder=""></el-input>
        </el-form-item>
      </el-form>
    </el-dialog>
  </section>
</template>
<script>
import paging from "../paging"
import {updateHouseFixedFeeList,houseFixedFeeInfo,houseFixedFeeList,xqSelectList,orgTree,houseFixedFeeInfoSelect,updateMeterPriceConfig } from '../../url/api';
export default {
  data(){
    return{
      isActive:2,
      updateDialog:false,
      defineDialog:false,
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
      formUpdate:[],
      houseFixed:[],
      defineData:[],
    }
  },
  methods:{
    getHouseFixedFeeInfo(row){//获取房间固定费用数据详情
      let params ={
        houseId:row.id
      }
      this.defineDialog = true
      houseFixedFeeInfo(params).then(res=>{
        console.log(res)
        if(res.data.code == 200){
          this.defineData = res.data.data
        }
      })
    },
    addUpdateHouseFixedFeeList(){//修改房间固定费用
      let params = {
        houseId:this.formUpdate.houseId,
        xqId:this.formUpdate.xqId,
        saves:[],
      }
      
      this.inforList.forEach(item=>{
        item.dynamicTags.forEach(ii=>{
          item.cycle=ii+"_"+item.cycle
        })
        let obj = {
          cost:item.num*item.price,
          cycle:item.cycle,
          num:item.num,
          optionName:item.optionName,
          price:item.price,
        }
        if(!item.optionName||!item.num||!item.price){
          this.$message("请将信息填写完整")
          return
        }
        params.saves.push(obj)
      })
      console.log(this.inforList,params)
      updateHouseFixedFeeList(params).then(res=>{
        console.log(res)
        if(res.data.code == 200){
          this.$message("提交成功")
          this.getlist()
        }else{
          this.$message("提交失败")
        }
      })
      this.updateDialog = false
    },
    deleteRow(index, rows) {//删除
      rows.splice(index, 1);
    },
    addList(){//添加
      let obj = {
        cost:'',
        cycle:'',
        num:'',
        optionName:'',
        price:'',
        dynamicTags:[],
        inputValue:'',
        inputVisible:false
      }
      this.inforList.push(obj)
    },
    gocharging_config_price(){
      this.$router.push({
        path:'/charging_config_price'
      })
    },
    updateShowBox(row){//修改东西弹窗
      this.updateDialog= true
      console.log(row)
      let params ={
        houseId:row.id
      }
      houseFixedFeeInfo(params).then(res=>{
        console.log(res)
        this.inforList=[]
        if(res.data.code == 200){
         res.data.data.forEach(item=>{
            let obj = {
              cost:'',
              cycle:'',
              num:item.num,
              optionName:item.optionName,
              price:item.price,
              dynamicTags:item.cycle.substr(0,item.cycle.length-1).split("_"),
              inputValue:'',
              inputVisible:false
            }
            this.inforList.push(obj)
         })
         console.log(this.inforList)
        }
      })
      this.formUpdate={
        xqId:row.xqId,
        houseId:row.id,
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
    getlist(){
      let params =this.formSearch
      console.log(this.formSearch)
      houseFixedFeeList(params).then((res)=>{
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
      houseFixedFeeInfoSelect({}).then(res=>{//固定费用缴费项下拉列表
        console.log(res)
        if(res.data.code == 200){
          this.houseFixed = res.data.data.filter(item=>{
            item.disabled=false
            return item
          })
        }
      })
    },
    handleCurrentPage(val){//页码改变
      this.formSearch.current=val
      this.getList()
    },
    handleChange(value){
      if(value.length!=0){
        console.log(value)
        this.formSearch.orgId=this.$refs.cascader.getCheckedNodes()[0].data.id
      }else{
        this.formSearch.orgId = ''
      }
      this.getlist()
    },
    handleClose(tag,row) {
      row.dynamicTags.splice(row.dynamicTags.indexOf(tag), 1);
    },

    showInput(row) {
      row.inputVisible = true;
      // this.$nextTick(_ => {
      //   this.$refs.saveTagInput.$refs.input.focus();
      // });
    },

    handleInputConfirm(row) {
      let inputValue = row.inputValue;
      if (inputValue) {
        row.dynamicTags.push(inputValue);
      }
      row.inputVisible = false;
      row.inputValue = '';
    },
    changeSelect(val){
      console.log(val,this.inforList)
      this.inforList.forEach(item=>{
         if(item.optionName==val.optionName&&item!=val){
           this.$message("收费项名称不能相同")
           val.optionName = ""
           return
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


