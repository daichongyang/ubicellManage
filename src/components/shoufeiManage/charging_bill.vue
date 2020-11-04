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
        <el-select v-model="formSearch.xqId" placeholder="请选择小区">
          <el-option v-for="(item,index) in xqTree" :label="item.name" :value="item.id" :key="index"></el-option>
        </el-select>
      </el-form-item>
        <el-form-item label="支付状态" size="small">
          <el-select v-model="formSearch.payStatus">
            <el-option label="是" :value="1"></el-option>
            <el-option label="否" :value="0"></el-option>
          </el-select>
        </el-form-item>
      <el-form-item>
        <el-button size="small" @click="getlist">查 询</el-button>
        <el-button type="primary" size="small" @click="addDialog=true">添 加</el-button>
      </el-form-item>
    </el-form>
    <el-table :data="formData" style="width: 100%" ref="table">
      <el-table-column prop="id" label="编号"></el-table-column>
      <el-table-column prop="houseName" label="房间" ></el-table-column>
      <el-table-column prop="xqName"label="小区名称"></el-table-column>
      <el-table-column prop=""label="账单生成">
        <template slot-scope="scope">
          {{scope.row.generaWay==1?"线上":"线下"}}
        </template>
      </el-table-column>
      <el-table-column prop=""label="周期">
        <template slot-scope="scope">
          {{scope.row.month==0?"一次性缴费":scope.row.month+"个月"}}
        </template>
      </el-table-column>
      </el-table-column>
      <el-table-column prop="remark"label="备注"></el-table-column>
      <el-table-column prop="payStatus"label="支付状态">
        <template slot-scope="scope">
          {{scope.row.payStatus==1?"已支付":"未支付"}}
        </template>
      </el-table-column>
      <el-table-column prop="payUser"label="支付人员"></el-table-column>
      <el-table-column prop="optionName"label="缴费项"></el-table-column>
      <el-table-column prop="costTotal"label="费用(元)"></el-table-column>
      <el-table-column prop="gmtCreate"label="创建时间"></el-table-column>
      <el-table-column prop="type"label="通知推送">
        <template slot-scope="scope">
          {{scope.row.type==1?"业主":scope.row.type==0?"业主和成员":"自定义"}}
        </template>
      </el-table-column>
      <el-table-column label="操作" fixed="right" width='250'>
				<template slot-scope="scope">
					<el-button type="primary" size="small" @click="getHouseFixedFeeInfo(scope.row)">查看详情</el-button>
					<el-button type="warning" size="small" @click="updateShowBox(scope.row)">作废</el-button>
				</template>
			</el-table-column>
    </el-table>
    <paging @changePage = handleCurrentPage :get-total='total'></paging>
    <!-- 添加 -->
    <el-dialog title="添加" :visible.sync="addDialog" :close-on-click-modal="false">
        <el-form class="form_inline" label-width="110px">
          <el-form-item label="房间" size="small">
            <el-input v-model="houseInfor.name" :disabled="true"></el-input>
            <el-button type="primary" size="small" @click="houseDialog=true">添 加</el-button>
          </el-form-item>
          <el-form-item label="缴费周期" size="small">
            <el-select v-model="pushInfor.month">
              <el-option label="一次性缴费" :value="0"></el-option>
              <el-option label="1个月" :value="1"></el-option>
              <el-option label="2个月" :value="2"></el-option>
              <el-option label="3个月" :value="3"></el-option>
              <el-option label="4个月" :value="4"></el-option>
              <el-option label="5个月" :value="5"></el-option>
              <el-option label="6个月" :value="6"></el-option>
              <el-option label="7个月" :value="7"></el-option>
              <el-option label="8个月" :value="8"></el-option>
              <el-option label="9个月" :value="9"></el-option>
              <el-option label="10个月" :value="10"></el-option>
              <el-option label="11个月" :value="11"></el-option>
              <el-option label="12个月" :value="12"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="备注" size="small">
            <el-input v-model="pushInfor.remark"></el-input>
          </el-form-item>
          <el-form-item label="通知范围" size="small">
            <el-radio-group v-model="pushInfor.notify" @change="changeNotify">
              <el-radio :label="0">业主和成员</el-radio>
              <el-radio :label="1">业主</el-radio>
              <el-radio :label="2">自定义</el-radio>
            </el-radio-group>
            <!-- 通知范围人员添加 -->
            <el-button type="primary" size="small" @click="showAddUsers" v-if="pushInfor.notify==2">添 加</el-button>
          </el-form-item>
          <el-form-item label="自定义人员" size="small" v-if="pushInfor.notify==2">
            <el-input type="textarea" :rows="2" v-model="houseUsers" :disabled="true"></el-input>
          </el-form-item>
          
          <el-table ref="multipleTable" :data="inforList" highlight-current-row style="width: 100%;">
            <el-table-column prop="name" label="缴费项">
              <template slot-scope="scope">
                <el-select v-model="scope.row.optionName" placeholder="请选择类型" size="small" @change="changeSelect(scope.row)">
                  <el-option v-for="(item,index) in houseFixed" :label="item.costName" :value="item.costName" :key="index" :disabled="item.disabled"></el-option>
                </el-select>
              </template>
            </el-table-column>
            <el-table-column label="费用">
              <template slot-scope="scope">
                <el-input size="small" v-model="scope.row.cost"></el-input>
              </template>
            </el-table-column>
            <!-- <el-table-column label="操作" width="80">
              <template slot-scope="scope">
                <el-button type="danger" size="small" @click="deleteRow(scope.$index, inforList)">删 除</el-button>
              </template>
            </el-table-column> -->
          </el-table>
          <!-- <el-button type="primary" size="small" @click="addList">添 加</el-button> -->
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button @click="addDialog = false">取 消</el-button>
          <el-button type="primary" @click="pushData">确 定</el-button>
        </span>
    </el-dialog>
    <!-- 房间列表 -->
    <el-dialog title="房间列表" :visible.sync="houseDialog" :close-on-click-modal="false">
      <houseListModule @choiseHouseInfo="getChoiseHouseInfo" :choisedStatus="1"></houseListModule>
    </el-dialog>
    <!-- 自定义人员选择 -->
    <el-dialog title="自定义人员选择" :visible.sync="usersDialog">
      <el-table :data="formData1" style="width: 100%" stripe @selection-change="handleSelectionChange1">
        <el-table-column type="selection" width="55"></el-table-column>
        <el-table-column prop="name" label="姓名"></el-table-column>
        <el-table-column prop="nickname" label="昵称"></el-table-column>
        <el-table-column prop="phone" label="手机号"></el-table-column>
        <el-table-column prop="sectionName" label="区域名称"></el-table-column>
        <el-table-column prop="houseName" label="房间名称"></el-table-column>
      </el-table>
      <paging1 @changePage = handleCurrentPage :get-total='total1'></paging1>
      <div slot="footer" class="dialog-footer">
        <el-button size="medium " @click="usersDialog = false">取 消</el-button>
        <el-button size="medium " @click="addbindUserForConfig">确 定</el-button>
      </div>
    </el-dialog>
    <!-- 详情  -->
    <el-dialog class="gudinfeiyon_define" title="详情" :visible.sync="defineDialog" :close-on-click-modal="false">
      <el-form class="form_inline" style="margin-bottom:20px;" v-for="(item,index) in defineData" :key="index" label-width="100px">
        <el-form-item label="费用项名称:" size="small">
          <el-input v-model="item.optionName"></el-input>
        </el-form-item>
        <el-form-item label="数量:" size="small">
          <el-input v-model="item.num"></el-input>
        </el-form-item>
        <el-form-item label="单价:" size="small">
          <el-input v-model="item.price"></el-input>
        </el-form-item>
        <el-form-item label="每月需缴纳:" size="small">
          <el-input v-model="item.cost"></el-input>
        </el-form-item>
      </el-form>
    </el-dialog>
  </section>
</template>
<script>
import paging from "../paging"
import paging1 from "../paging"
import houseListModule from "../houseListModule"
import {xqSelectList,orgTree,propertyCostList,toSelectUsers,houseFixedFeeInfoSelect,propertySaveCost  } from '../../url/api';
export default {
  data(){
    return{
      updateDialog:false,
      defineDialog:false,
      houseDialog:false,
      addDialog:false,
      usersDialog:false,
      inforList:[{
        cost:'',
        optionName:'',
      }],
      option1:[],
      xqTree:[],
      houseUsers:'',//选择中的人员id
      houseUsersArr:[],//选择中的人员id
      isAddorUpdate:1,//1添加、2修改
      formSearch:{},
      formData: [],//数据
      formUpdate:{},//修改表单
      total: 0,//数据总数
      total1: 0,//数据总数
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
      defineData:[],
      pushInfor:{
        notify:0
      },//添加表单提交
      houseInfor:{},
      seach:{
        current:1,
        size:10,
      },
      houseFixed:[],
      formData1:[]//可选人员信息列表
    }
  },
  methods:{
    pushData(){//表单提交
      this.pushInfor.houseId = this.houseInfor.id
      this.pushInfor.xqId = this.houseInfor.xqId
      this.pushInfor.details = this.inforList
      if(!this.inforList[0].optionName||!this.inforList[0].cost){
        this.$message("请将缴费项填写完整")
        return
      }
      if(this.pushInfor.notify==2){
        if(this.pushInfor.houseUsers.length==0){
          this.$message("请选择自定义人员")
          return
        }
      }else{
        this.pushInfor.houseUsers = []
      }
      let params = this.pushInfor
      console.log(params)
      propertySaveCost(params).then(res=>{
        console.log(res)
        if(res.data.code ==200){
          this.$message("添加成功")
          this.getlist()
        }else{
          this.$message("添加失败")
        }
      })
      this.addDialog = false
    },
    showAddUsers(){//获取可选用户
      this.usersDialog=true
      toSelectUsers(this.seach).then(res=>{
        console.log(res)
        if(res.data.code == 200){
          this.formData1=res.data.data.records
          this.total1 = res.data.data.total
        }
      })
    },
    addList(){//添加
      let obj = {
        cost:'',
        optionName:'',
      }
      this.inforList.push(obj)
    },
    updateShowBox(row){//修改东西弹窗
      this.updateDialog= true
      console.log(row)
      let params ={
        houseId:row.id
      }
    },
    getlist(){
      let params =this.formSearch
      console.log(this.formSearch)
      propertyCostList(params).then((res)=>{
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
            return item
          })
        }
      })

    },
    changeNotify(val){//通知推送权限改变，判断自定义用户选择
      
    },
    handleCurrentPage(val){//页码改变
      this.formSearch.current=val
      this.getList()
    },
    getChoiseHouseInfo(val){//接受房间模板数据
      console.log(val)
      this.houseDialog = false
      this.houseInfor = val
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
    handleSelectionChange1(val,self) {//选择可选人员
      console.log(val,self)
      this.houseUsersArr = val
    },
    addbindUserForConfig(){//可选人员提交
      this.houseUsers = ''
      this.pushInfor.houseUsers=[]
      this.houseUsersArr.forEach(item=>{
        this.houseUsers=item.name||item.phone+','+this.houseUsers
        this.pushInfor.houseUsers.push(item.id)
      })
      this.usersDialog = false
    },
    deleteRow(index, rows) {//缴费项删除
      rows.splice(index, 1);
    },
    changeSelect(val){//缴费项选择
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
    paging,
    paging1,
    houseListModule
  }
}
</script>
<style scoped>

</style>


