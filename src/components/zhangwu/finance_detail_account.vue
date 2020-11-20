<template>
  <section class="modlude">
    <!-- <p class="margintop"></p> -->
      <el-form :inline="true" class="gridContt">
        <el-form :inline="true">
          <el-form-item size="small" label="支付方式">
            <el-select size='small' v-model="checkInfor.paymentType" placeholder="输入支付方式" >
              <el-option label="线上" value=0></el-option>
              <el-option label="现金" value=1></el-option>
              <el-option label="支付宝转账" value=2></el-option>
              <el-option label="微信转账" value=3></el-option>
              <el-option label="银行转账 " value=4></el-option>
              <el-option label="POS刷卡" value=5></el-option>
              <el-option label="其它" value=6></el-option>
              <el-option label="对私银行卡转账" value=7></el-option>
            </el-select>
          </el-form-item>
          <el-form-item size="small" label="进出账">
            <el-select size='small' v-model="checkInfor.inOut" placeholder="输入进出账" >
              <el-option label="出账" value=0></el-option>
              <el-option label="进账" value=1></el-option>
            </el-select>
          </el-form-item>
          <el-form-item  size="small" label="编号">
            <el-input placeholder="输入编号" v-model="checkInfor.receiptNumber" size='small'></el-input>
          </el-form-item>
          </el-form>
          <el-form :inline="true">
          <el-form-item size="small" label="交易时间">
            <el-date-picker 
              v-model="checkInfor.startTime"
              type="date"
              :picker-options="pickerOptions0"
              placeholder="开始日期">
            </el-date-picker>
          </el-form-item>
          <el-form-item size="small" label="-">
            <el-date-picker
              v-model="checkInfor.endTime"
              type="date"
              :picker-options="pickerOptions0"
              placeholder="结束时间">
            </el-date-picker>
          </el-form-item>
          <!-- <el-form-item size="small" label="公寓/小区">
            <el-select size='small' v-model="checkInfor.apartmentId" placeholder="输入公寓/小区名" >
              <el-option v-for="item in selectArr" :key="item.apartmentId" :label="item.name" :value="item.apartmentId"></el-option>
            </el-select>
          </el-form-item> -->
          </el-form>
          <el-form :inline="true">
          <el-form-item size="small" label="核销时间">
            <el-date-picker
              v-model="checkInfor.verifyEndTime" 
              type="date"
              value-format="timestamp"
              placeholder="开始日期">
            </el-date-picker>
          </el-form-item>
          <el-form-item size="small" label="-">
            <el-date-picker
              v-model="checkInfor.verifyStartTime"
              type="date"
              value-format="timestamp"
              placeholder="结束时间">
            </el-date-picker>
          </el-form-item>
          <!-- <el-form-item  size="small" label="房间号">
            <el-input placeholder="输入房间号" v-model="checkInfor.houseNumber" size='small'></el-input>
          </el-form-item>
          <el-form-item  size="small" label="承租人">
            <el-input placeholder="输入承租人" v-model="checkInfor.tenant" size='small'></el-input>
          </el-form-item> -->
          <el-form-item  size="small" label="核销人员">
            <el-input placeholder="输入核销人员" v-model="checkInfor.verify" size='small'></el-input>
          </el-form-item>
          <el-form-item size="small" label="是否核销">
            <el-select size='small' v-model="checkInfor.verifyStatus" placeholder="是否核销" >
              <el-option label="未核销" value=0></el-option>
              <el-option label="已核销" value=1></el-option>
            </el-select>
          </el-form-item>
          <!-- <el-form-item size="small" label="明细类型">
            <el-select size='small' v-model="checkInfor.billsType" placeholder="明细类型" >
              <el-option label="全部" value=0></el-option>
              <el-option label="租约" value=1></el-option>
              <el-option label="定金" value=2></el-option>
              <el-option label="记账本" value=3></el-option>
            </el-select>
          </el-form-item> -->
        </el-form>

      </el-form>
      <el-form :inline="true">
        <el-form-item size='small' label="交易项目">
          <el-select  size='small' v-model="checkInfor.levelItem" placeholder="交易项目" @change="changeSelect($event,2)">
            <el-option label="全部" :value="0"></el-option>
            <el-option v-for="item in itemsele1" :key="item.costId" :label="item.item" :value="item.costId"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item size='small' label="">
          <el-select size='small'  v-model="checkInfor.levelGroup" placeholder="交易项目" @change="changeSelect($event,3)" :disabled="checkInfor.levelItem == 0">
            <el-option label="全部" :value="0"></el-option> 
            <el-option v-for="item in itemsele2" :key="item.costId" :label="item.item" :value="item.costId"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item size='small' label="">
          <el-select size='small'  v-model="checkInfor.levelCost" placeholder="交易项目" :disabled="checkInfor.levelGroup == 0">
            <el-option label="全部" :value="0"></el-option>
            <el-option v-for="item in itemsele3" :key="item.costId" :label="item.item" :value="item.costId"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
        <el-form class="marginTop20" :inline="true">
          <el-form-item class="margin0">
            <el-button type="primary" size='medium'>报表导出</el-button>
            <el-button type="primary" size='medium' @click="getList">查询</el-button>
            <el-button type="primary" size='medium' @click="reloadCon">重置</el-button>
          </el-form-item>
          <!-- <el-form-item class="margin0">
            <el-button type="primary" size='small' icon="el-icon-plus" @click.native="addFormVisible=true">添加保修</el-button>
          </el-form-item> -->
        </el-form>
    
    <div class="statistics">
      <span class="s-inner">
        <i></i>
        进出账合计
        <span class="num">352.52</span>
        元
        <span class="gray">（542 笔，待核销107笔）</span>
      </span>
      <span class="s-inner">
        <i></i>
        进账合计
        <span class="num">598.30</span>
        元
        <span class="gray">（490 笔，待核销66笔）</span>
      </span>
      <span class="s-inner">
        <i></i>
        出账合计
        <span class="num">-245.78</span>
        元
        <span class="gray"> （52 笔，待核销41笔）</span>
      </span>
    </div>
    <div style="margin-left:10px;" class="radioBtns">
      <el-radio v-model="checkInfor.type" label="0" @change="changeStyle"><span class="title">汇总</span><span class="gray">流水以原始进出账形式进行显示</span></el-radio>
      <el-radio v-model="checkInfor.type" label="1" @change="changeStyle"><span class="title">明细</span><span class="gray">流水以账单对应关系进行分项显示</span></el-radio>
    </div>
    <!-- 列表部分 -->
    <el-table :data="inforList" highlight-current-row v-loading="listLoading" @selection-change="selsChange" style="width: 100%;">
			<el-table-column class="ccc" type="selection" width="55" label="全选">
			</el-table-column>  
			<el-table-column prop="inOut" label="进出账">
			</el-table-column>
			<el-table-column prop="owner" label="姓名">
			</el-table-column>
			<el-table-column prop="billType" label="类型">
			</el-table-column>
			<el-table-column prop="billsItem" label="项目" width="200">
			</el-table-column>
			<el-table-column prop="amount" label="金额">
			</el-table-column>
			<el-table-column prop="paymentType" label="方式">
			</el-table-column>
			<el-table-column prop="billTime" label="收支日期" width="200">
			</el-table-column>
			<el-table-column prop="trader" label="交易人">
			</el-table-column>
			<!-- <el-table-column prop="officeName" label="所属分店">
			</el-table-column> -->
			<el-table-column prop="verifyStatus" label="状态">
        <template slot-scope="scope">{{scope.row.verifyStatus==0?'未核销':'已核销'}}</template>
			</el-table-column>
			<el-table-column prop="receiptNumber" label="编号">
			</el-table-column>
			<el-table-column label="操作" fixed="right" width=250>
				<template slot-scope="scope">
					<el-button size="small" @click="changeItem(scope.$index, scope.row,2)">详情</el-button>
          <el-button v-if="scope.row.type!=3" size="small" @click="goaccountDetail(scope.$index, scope.row,1)">查看</el-button>
					<!-- <el-button type="danger" size="small" @click="delcat(scope.$index, scope.row)">删除</el-button> -->
				</template>
			</el-table-column>
		</el-table>
    <!-- 批量删除，下标页码 -->
		<el-col :span="24" class="paginationt">
			<el-pagination layout="prev, pager, next" @current-change="handleCurrentChange" :page-size="10" :page-count="total" class="pagination">
			</el-pagination>
		</el-col>
    <el-button type="primary" @click="sverifybusine" style="margin-left:20px;margin-bottom:20px;">批量核销</el-button>

    <!-- 交易详情 -->
    <el-dialog title="交易详情" :visible.sync="addFormVisible" :close-on-click-modal="false" center>
      <span class="sNumber">{{detailInfor.receiptNumber}}</span>
      <el-row class="manageCash">
        <el-col :span="12">
          <span style="font-size: 24px;color: #f56336;">{{detailInfor.amount}}</span>
          <br>
          <span>{{detailInfor.inOut}}(元)</span>
        </el-col>
        <el-col :span="12">
          <span>{{detailInfor.billTime}}  {{detailInfor.paymentType}}</span>
          <br>
          <span>{{detailInfor.owner}}</span>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="4">交易类型：</el-col>
        <el-col :span="20">{{detailInfor.billType}}</el-col>
      </el-row>
      <el-row>
        <el-col :span="4">交易项目：</el-col>
        <el-col :span="20">
          <div v-for="item in billsItemDetail" :key="item">{{item}}</div>
          <!-- {{detailInfor.billsItemDetail}} -->
          
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="4">交易人：</el-col>
        <el-col :span="20">{{detailInfor.tenant}}</el-col>
      </el-row>
      <el-row>
        <el-col :span="4">交易状态：</el-col>
        <el-col :span="20">{{detailInfor.verifyStatus}}</el-col>
      </el-row>
      <el-row>
        <el-col :span="4">凭证编号：</el-col>
        <el-col :span="20">{{detailInfor.receiptNumber}}</el-col>
      </el-row>
      <el-row>
        <el-col :span="4">凭证图片：</el-col>
        <el-col :span="20">
          <img :src="detailInfor.picture" alt="">
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="4">备注：</el-col>
        <el-col :span="20">{{detailInfor.receiptRemark}}</el-col>
      </el-row>
      <el-row>
        <el-col :span="4">创建时间：</el-col>
        <el-col :span="20">{{detailInfor.creatTime}}</el-col>
      </el-row>
      <div slot="footer" class="dialog-footer">
        <el-button @click.native="sverifybusine" v-if="detailInfor.verifyStatus==0">核销</el-button>
        <el-button @click.native="addFormVisible = false">取消</el-button>
      </div>
    </el-dialog>
  </section>
</template>
<script>
// import {getDateArray} from '../../util/util'
// import {businessList, selectApartment, addProperty,businessverify,itemSelect} from '../../api/api'
export default {
  data(){
    return{
      billsItemDetail:'',
      headIcon:'',
      total:1,
      addFormVisible:false,
      updataVisible:false,
      listLoading:false,
      sels: [],//列表选中列
      checkList:[],
      inforList:[
            {
                        "type":1,
                        "inOut":1,
                        "owner":"阮莎",
                        "billType":"游客流水",
                        "billsItem":"停车费",
                        "billsItemDetail":"停车费",
                        "amount":"0.01",
                        "paymentType":"支付宝转账",
                        "billTime":'2019-12-31 17:48:58',
                        "trader":null,
                        "officeName":"侠盗飞车",
                        "verifyStatus":0,
                        "receiptNumber":"ZY201912311749098633",
                        "picture":"",
                        "receiptRemark":"",
                        "leaseId":285,
                        "billsId":2596
                    },
                    {
                        "type":1,
                        "inOut":1,
                        "owner":"阮莎",
                        "billType":"游客流水",
                        "billsItem":"停车费",
                        "billsItemDetail":"停车费",
                        "amount":"2.00",
                        "paymentType":"支付宝转账",
                        "billTime":'2019-12-31 17:48:58',
                        "trader":null,
                        "officeName":"侠盗飞车",
                        "verifyStatus":0,
                        "receiptNumber":"ZY201912311749098633",
                        "picture":"",
                        "receiptRemark":"",
                        "leaseId":285,
                        "billsId":2596
                    },
                    {
                        "type":1,
                        "inOut":1,
                        "owner":"阮莎",
                        "billType":"游客流水",
                        "billsItem":"停车费",
                        "billsItemDetail":"停车费",
                        "amount":"0.01",
                        "paymentType":"线上",
                        "billTime":'2019-12-31 17:41:32',
                        "trader":null,
                        "officeName":"侠盗飞车",
                        "verifyStatus":0,
                        "receiptNumber":"ZY201912311747433892",
                        "picture":"",
                        "receiptRemark":"",
                        "leaseId":285,
                        "billsId":2595
                    },
                    {
                        "type":1,
                        "inOut":1,
                        "owner":"阮莎",
                        "billType":"游客流水",
                        "billsItem":"停车费",
                        "billsItemDetail":"停车费",
                        "amount":"0.01",
                        "paymentType":"现金",
                        "billTime":'2019-12-31 17:40:55',
                        "trader":null,
                        "officeName":"侠盗飞车",
                        "verifyStatus":0,
                        "receiptNumber":"ZY201912311747006104",
                        "picture":"",
                        "receiptRemark":"",
                        "leaseId":285,
                        "billsId":2594
                    },
                    {
                        "type":1,
                        "inOut":1,
                        "owner":"阮莎",
                        "billType":"游客流水",
                        "billsItem":"停车费",
                        "billsItemDetail":"停车费",
                        "amount":"2.00",
                        "paymentType":"现金",
                        "billTime":'2019-12-31 17:40:55',
                        "trader":null,
                        "officeName":"侠盗飞车",
                        "verifyStatus":0,
                        "receiptNumber":"ZY201912311747006104",
                        "picture":"",
                        "receiptRemark":"",
                        "leaseId":285,
                        "billsId":2594
                    },
                    {
                        "type":1,
                        "inOut":1,
                        "owner":"阮莎",
                        "billType":"游客流水",
                        "billsItem":"停车费",
                        "billsItemDetail":"停车费",
                        "amount":"0.01",
                        "paymentType":"线上",
                        "billTime":'2019-12-31 17:36:18',
                        "trader":null,
                        "officeName":"侠盗飞车",
                        "verifyStatus":0,
                        "receiptNumber":"ZY201912311742447927",
                        "picture":"",
                        "receiptRemark":"",
                        "leaseId":285,
                        "billsId":2593
                    },
                    {
                        "type":1,
                        "inOut":1,
                        "owner":"阮莎",
                        "billType":"游客流水",
                        "billsItem":"停车费",
                        "billsItemDetail":"停车费",
                        "amount":"2.00",
                        "paymentType":"线上",
                        "billTime":"2019-12-31 17:36:18",
                        "trader":null,
                        "officeName":"侠盗飞车",
                        "verifyStatus":0,
                        "receiptNumber":"ZY201912311742447927",
                        "picture":"",
                        "receiptRemark":"",
                        "leaseId":285,
                        "billsId":2593
                    },
                    {
                        "type":1,
                        "inOut":1,
                        "owner":"阮莎",
                        "billType":"游客流水",
                        "billsItem":"停车费",
                        "billsItemDetail":"停车费",
                        "amount":"2.00",
                        "paymentType":"线上",
                        "billTime":"2019-12-31 17:28:40",
                        "trader":null,
                        "officeName":"侠盗飞车",
                        "verifyStatus":0,
                        "receiptNumber":"ZY201912311735034517",
                        "picture":"",
                        "receiptRemark":"",
                        "leaseId":285,
                        "billsId":2591
                    },
                    {
                        "type":1,
                        "inOut":1,
                        "owner":"阮莎",
                        "billType":"游客流水",
                        "billsItem":"停车费",
                        "billsItemDetail":"停车费",
                        "amount":"2.00",
                        "paymentType":"线上",
                        "billTime":"2019-12-31 17:28:40",
                        "trader":null,
                        "officeName":"侠盗飞车",
                        "verifyStatus":0,
                        "receiptNumber":"ZY201912311735034517",
                        "picture":"",
                        "receiptRemark":"",
                        "leaseId":285,
                        "billsId":2592
                    },
                    {
                        "type":1,
                        "inOut":1,
                        "owner":"阮莎",
                        "billType":"游客流水",
                        "billsItem":"停车费",
                        "billsItemDetail":"停车费",
                        "amount":"0.01",
                        "paymentType":"线上",
                        "billTime":"2019-12-31 17:28:40",
                        "trader":null,
                        "officeName":"侠盗飞车",
                        "verifyStatus":0,
                        "receiptNumber":"ZY201912311735034517",
                        "picture":"",
                        "receiptRemark":"",
                        "leaseId":285,
                        "billsId":2591
                    }
      ],
      selectArr:[],//公寓下拉列表
      checkInfor:{
        levelItem:0,//交易项目一级菜单
        levelGroup:0,//交易项目二级菜单
        levelCost:0,//交易项目三级菜单
        apartmentId:'',
        type:'0',
        current:1,
        size:10
      },//条件查询
      addForm:{ //管理员添加人员
        managerId: 1,
        name: "",
        type: "",
        apartmentId: '',
      },
      itemsele1:[],//交易流水报表-交易项目下拉列表
      itemsele2:[],//交易流水报表-交易项目下拉列表
      itemsele3:[],//交易流水报表-交易项目下拉列表
      itemobj:{
        costId:0
      },
      infor:{},
      updataForm:{},
      pickerOptions0:{
        disabledDate(time) {
          return time.getTime() > Date.now() - 8.64e6
        },
      },
      detailInfor:{}
    }
  },
  methods:{
    //交易流水报表-交易项目下拉列表
    changeSelect(costId,level){
      let params = {
        costId: costId,
        level: level
      }
      console.log(params)
      itemSelect(params).then(res => {
        console.log(res)
        if(res.data.code == 200){
          if(level == 2){
            this.itemsele2 = []
            this.checkInfor.levelGroup = 0
            this.checkInfor.levelCost = 0
            this.itemsele2 = res.data.data

          }else if(level == 3){
            this.itemsele3 = []
            this.checkInfor.levelCost = 0
            this.itemsele3 = res.data.data
            if(costId == 0){ 
              this.checkInfor.levelCost = 0
            }
          }else{
            // this.itemsele3 = res.data.data
          }
        }else{
          alert(res.data.msg)
        }

      })
    },
    sverifybusine(){//核销
      let params=this.sels
      this.addFormVisible = false
      console.log(this.sels)
      businessverify(params).then(res=>{
        console.log(res)
        if(res.data.code===200){

        }else{
          alert("核销失败")
        }
      })
    },
    reloadCon(){
      location.reload()
    },
    addList(){
      this.addForm.apartmentId=this.checkInfor.apartmentId
      let params=this.addForm
      this.addFormVisible=false
      console.log(params)
      addProperty(params).then(res=>{
        console.log(res)
        if(res.data.code===200){
          alert('添加成功')
        }
      })
    },
    getApartmentList(){
      selectApartment().then(res=>{//公寓列表
        console.log(res)
        this.selectArr=res.data.data
        // this.checkInfor.apartmentId=res.data.data[0].apartmentId
        this.getlist()
      })
    },
    changeStyle(){
      this.checkInfor.current=1
      this.getlist()
    },
    getList(){//获取列表
      let params=this.checkInfor
      console.log(params)
      businessList(params).then(res=>{
        console.log(res)
        if(res.data.code===200){
          this.infor=res.data.data.records[0]||{}
          if(res.data.data.records.length !== 0){
            this.inforList=res.data.data.records[0].billVO.filter(function(item){
            if(item.billsItemDetail){
              item.billsItemDetail=item.billsItemDetail.replace(/\_/g,'/')
            }
            if(item.inOut===0){
              item.inOut='出账'
            }else if(item.inOut===1){
              item.inOut='进账'
            }
            item.billTime=getDateArray(item.billTime)[9]
            return item
          })
          }else{
            this.inforList = []
          }
          this.total=res.data.data.pages
        }
      })
    },
    changeItem(index ,row){//详情
      this.sels=[]
      this.addFormVisible=true
      this.detailInfor=row
      let obj = {
        orderNumber: row.receiptNumber,
        type: row.type
      }
      this.sels.push(obj)
      this.billsItemDetail=row.billsItemDetail.split('/')
    },
    goaccountDetail(index ,row){//查看财务
      if(row.type===1){
        this.$router.push({
          path:'/accountDetail',
          query:{
            leaseId:row.leaseId,
          }
        })
      }else if(row.type===2){
        this.$router.push({
          path:'/bookingList',
          query:{
            leaseId:row.leaseId,
          }
        })
      }else if(row.type===3){
        this.$router.push({
          path:'/tallyConfig',
          query:{
            leaseId:row.leaseId,
          }
        })
      }

    },
    handleCurrentChange(val){
      this.checkInfor.current=val
      this.getlist()
    },
    selsChange: function (sels) {// 当选择项发生变化时会触发该事件
      this.sels=[]
      console.log(sels)
      let _this=this
      let selss=sels.filter(function (sel) {
        if(sel.isExist!==1){
          let obj = {
            orderNumber: sel.receiptNumber,
            type: sel.type
          }
          _this.sels.push(obj)
            return sel
        }
      })
      console.log(this.sels)
    } 
  },
  mounted(){
    // let elAlbel=document.getElementsByClassName('el-form-item__label')
    // for (var i = 0; i < elAlbel.length; i++) {
    //   elAlbel[i].style.float='left'
    // }
    // this.getApartmentList()
    // let params = {
    //   costId: 0,
    //   level: 1
    // }
    // itemSelect(params).then(res => {
    //   console.log(res)
    //   if(res.data.code == 200){
    //     this.itemsele1 = res.data.data 
    //   }else{
    //     alert(res.data.msg)
    //   }
    // })
          this.inforList=this.inforList.filter(function(item){
            if(item.billsItemDetail){
              item.billsItemDetail=item.billsItemDetail.replace(/\_/g,'/')
            }
            if(item.inOut===0){
              item.inOut='出账'
            }else if(item.inOut===1){
              item.inOut='进账'
            }
            return item
          })
  }
}
</script>
<style scoped>
@import '../../assets/manage.css';
.gridContt{
  line-height:30px;
}
.el-dialog__header{
  border-bottom: 1px solid #ddd;
}
.manageCash{
  background: #fffdf5;
  border: 1px solid #fff7e5;
  color: #646464;
  padding: 15px;
  margin-bottom: 15px;
}
</style>
<style>
.sNumber {
    position: absolute;
    top: 25px;
    left: 25px;
    color: #999;
}
</style>



