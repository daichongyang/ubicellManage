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
        <el-form-item label="交易渠道" size="small">
          <el-select v-model="formSearch.channel">
            <el-option label="线上" :value="1"></el-option>
            <el-option label="线下" :value="2"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="收入支出" size="small">
          <el-select v-model="formSearch.inOut">
            <el-option label="支出" :value="0"></el-option>
            <el-option label="收入" :value="1"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="开始时间" size="small">
          <el-date-picker
            v-model="formSearch.startTime"
            type="datetime"
            value-format="timestamp">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="结束时间" size="small">
          <el-date-picker
            v-model="formSearch.endTime"
            type="datetime"
            value-format="timestamp">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="房间名称" size="small">
          <el-input v-model="formSearch.houseName"></el-input>
        </el-form-item>
        <el-form-item label="区域名称" size="small">
          <el-input v-model="formSearch.sectionName"></el-input>
        </el-form-item>
      <el-form-item>
        <el-button size="small" @click="getlist">查 询</el-button>
        <el-button type="primary" size="small" @click="addDialog=true">添 加</el-button>
        <!-- <el-button size="small" type="danger" @click="deleInfor(false)">批量删除</el-button> -->
      </el-form-item>
    </el-form>
    <el-table :data="formData" style="width: 100%" ref="table" stripe @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55"></el-table-column>
      <el-table-column prop="houseName" label="房间" ></el-table-column>
      <el-table-column prop="xqName"label="小区名称"></el-table-column>
      <el-table-column prop="sectionName"label="区域名称"></el-table-column>
      <el-table-column prop="amount"label="交易金额"></el-table-column>
      <el-table-column prop=""label="交易渠道">
        <template slot-scope="scope">
          {{scope.row.channel==1?"线上":"线下"}}
        </template>
      </el-table-column>
      <el-table-column prop=""label="收入支出">
        <template slot-scope="scope">
          {{scope.row.inOut==0?"支出":"收入"}}
        </template>
      </el-table-column>
      <el-table-column prop=""label="交易时间">
        <template slot-scope="scope" v-if="scope.row.payTime">
          {{$root.getDateArray(Number(scope.row.payTime))[9]}}
        </template>
      </el-table-column>
      <el-table-column prop="payUser"label="充值人"></el-table-column>
      <el-table-column prop="remark"label="备注"></el-table-column>
      <el-table-column label="操作" fixed="right" width="100px">
				<template slot-scope="scope">
            <el-button size="mini" type="primary" @click.native="refillPrint(scope.row)">打印收据</el-button>
				</template>
			</el-table-column>
    </el-table>
    <paging @changePage = handleCurrentPage :get-total='total'></paging>
    <!-- 添加 -->
    <el-dialog title="添加" :visible.sync="addDialog" :close-on-click-modal="false">
        <el-form class="form_inline" label-width="110px" :model="pushInfor" :rules="rules"  ref='addList'>
          <el-form-item label="房间" size="small" prop="houseId">
            <el-input v-model="houseInfor.name" :disabled="true"></el-input>
            <el-button type="primary" size="small" @click="houseDialog=true">添 加</el-button>
          </el-form-item>
          <el-form-item label="卡类型" size="small" prop="cardId">
            <el-select v-model="pushInfor.cardId">
              <el-option :label="item.name" :value="item.cardId" v-for="(item,index) in cardIds" :key="index"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="总额" size="small" prop="amount">
            <el-input v-model="pushInfor.amount"></el-input>
          </el-form-item>
          <el-form-item label="备注" size="small">
            <el-input v-model="pushInfor.remark"></el-input>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button @click="addDialog = false">取 消</el-button>
          <el-button type="primary" @click="pushData('addList')">确 定</el-button>
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
      <el-form class="form_inline" style="margin-bottom:20px;">
        <el-form-item label="小区:" size="small">
          <el-input v-model="defineInfor.optionName"></el-input>
        </el-form-item>
        <el-form-item label="房间:" size="small">
          <el-input v-model="defineInfor.num"></el-input>
        </el-form-item>
        <el-form-item label="年份:" size="small">
          <el-input v-model="defineInfor.price"></el-input>
        </el-form-item>
        <el-form-item label="周期:" size="small">
          <el-input v-model="defineInfor.cost"></el-input>
        </el-form-item>
        <el-form-item label="备注:" size="small">
          <el-input v-model="defineInfor.cost"></el-input>
        </el-form-item>
        <div style="margin:20px 0; text-align:center;">缴费明细</div>
        <el-form-item label="空调费:" size="small">
          <el-input v-model="defineInfor.cost"></el-input>
        </el-form-item>   
        <el-form-item label="通知权限:" size="small">
          <el-input v-model="defineInfor.cost"></el-input>
        </el-form-item>   
        <el-form-item label="总费用:" size="small">
          <el-input v-model="defineInfor.cost"></el-input>
        </el-form-item>   
        <el-form-item label="创建时间:" size="small">
          <el-input v-model="defineInfor.cost"></el-input>
        </el-form-item>   
        <el-form-item label="支付状态:" size="small">
          <el-input v-model="defineInfor.cost"></el-input>
        </el-form-item>   
        <el-form-item label="通知用户:" size="small">
          <el-input type="textarea" :rows="2" v-model="houseUsers" :disabled="true"></el-input>
        </el-form-item>
      </el-form>
    </el-dialog>
  </section>
</template>
<script>
import paging from "../paging"
import paging1 from "../paging"
import houseListModule from "../houseListModule"
import {xqSelectList,orgTree,refillList,refillcardType,refillSave ,deleteproperty,refillPrint } from '../../url/api';
export default {
  data(){
    return{
      updateDialog:false,
      defineDialog:false,
      houseDialog:false,
      addDialog:false,
      usersDialog:false,
      cardIds:[],
      inforList:[{
        cost:'',
        optionName:'',
      }],
      option1:[],
      xqTree:[],
      houseUsers:'',//选择中的人员id
      houseUsersArr:[],//选择中的人员id
      isAddorUpdate:1,//1添加、2修改
      formSearch:{
        xqId:'',
        size:10,
        current:1
      },
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
      },//添加表单提交
      houseInfor:{},
      defineInfor:{},
      seach:{
        current:1,
        size:10,
      },
      houseFixed:[],
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
      TotalAmount:'',//物业缴费账单总额
      formData1:[]//可选人员信息列表
    }
  },
  methods:{

    refillPrint(row){//打印收据
      let params = {
        id:row.id
      }
      refillPrint(params).then(res=>{
        console.log(res)
        if(res.data.code == 200){
          // this.TotalAmount = res.data.data
          this.$router.push({
            path:'/img_receipt_print',
            query:{
              printInfor:res.data.data
            }
          })
        }
      })
    },
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
      this.$confirm('确认删除吗？')
      .then(_ => {
        deleteproperty(arrId).then((res)=>{
          console.log(res)
          if(res.data.code == 200){
            this.$message('删除成功');
            this.getlist()
          }
        })
      })
      .catch(_ => {});
    },
    pushData(addList){//表单提交
      this.$refs[addList].validate((valid) => {
        if (valid) {
          
          let params = this.pushInfor
          console.log(params)
          refillSave(params).then(res=>{
            console.log(res)
            if(res.data.code ==200){
              this.$message("添加成功")
              this.getlist()
            }else{
              this.$message("添加失败")
            }
          })
          this.addDialog = false
        } else {
          console.log('error submit!!');
          return false;
        }
      });
  
    },
    addList(){//添加
      let obj = {
        cost:'',
        optionName:'',
      }
      this.inforList.push(obj)
    },
    updateShowBox(row){//修改东西弹窗
      this.defineDialog= true
      console.log(row)
      this.defineInfor = row
    },
    getlist(){
      let params =this.formSearch
      console.log(this.formSearch)
      refillList(params).then((res)=>{
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
    changeNotify(val){//通知推送权限改变，判断自定义用户选择
      
    },
    handleCurrentPage(val){//页码改变
      this.formSearch.current=val
      this.getlist()
    },
    getChoiseHouseInfo(val){//接受房间模板数据
      console.log(val)
      this.houseDialog = false
      this.houseInfor = val
      this.pushInfor.houseId = this.houseInfor.id
      let params = {
        houseId:val.id
      }
      refillcardType(params).then(res=>{
        console.log(res)
        if(res.data.code == 200){
          this.cardIds = res.data.data
        }
      })
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


