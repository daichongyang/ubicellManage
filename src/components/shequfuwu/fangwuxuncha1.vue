<template>
  <section>
    <p class="margintop"></p>
    <div class="equi">
      <el-form :inline="true" class="gridContt">
        <el-form :inline="true">
          <el-form-item label="巡查员名称" class="getNm">
            <el-input placeholder="输入巡查员姓名" v-model="checkInfor.houseName" size='small'></el-input>
          </el-form-item>
          <el-form-item label="电话号码">
            <el-input placeholder="输入电话号码" v-model="checkInfor.tenant" size='small'></el-input>
          </el-form-item>
          <el-form-item label="巡查点"  class="margin0">
            <el-input placeholder="路" size='small' style="width:150px;"></el-input>
            -
            <el-input placeholder="街" size='small' style="width:150px;"></el-input>
            -
            <el-input placeholder="巷" size='small' style="width:150px;"></el-input>
            -
            <el-input placeholder="号" size='small' style="width:150px;"></el-input>
            -
            <el-input placeholder="之" size='small' style="width:150px;"></el-input>
            
          </el-form-item>
          <el-form-item label="承租人"  class="margin0">
            <el-input placeholder="输入承租人姓名" v-model="checkInfor.creatorName" size='small'></el-input>
          </el-form-item>
          <el-form-item label="承租人联系方式"  class="margin0">
            <el-input placeholder="输入承租人联系方式" v-model="checkInfor.creatorName" size='small'></el-input>
          </el-form-item>
          <el-form-item label="楼宇档案码"  class="margin0">
            <el-input placeholder="输入数字" v-model="checkInfor.creatorName" size='small'></el-input>
          </el-form-item>
          <el-form-item label="旧门牌"  class="margin0">
            <el-input placeholder="输入数字" v-model="checkInfor.creatorName" size='small'></el-input>
          </el-form-item>
            <el-form>
              <el-form-item label="巡查状态" class="margin0">
                <el-radio-group class="width333" v-model="checkInfor.leaseStatus">
                  <el-radio label="1">正常 </el-radio >
                  <el-radio label="2">异常未上报 </el-radio >
                  <el-radio label="2">异常已上报 </el-radio >
                </el-radio-group>
              </el-form-item>
            </el-form>
            <el-form>
            <el-form-item size="small" label="时间">
                <el-date-picker
                  v-model="checkInfor.startTime"
                  type="datetime"
                  placeholder="开始日期">
                </el-date-picker>
              </el-form-item>
              <el-form-item size="small" label="至">
                <el-date-picker
                  v-model="checkInfor.endTime"
                  type="datetime"
                  placeholder="结束时间">
                </el-date-picker>
              </el-form-item>
            </el-form>
          <el-form-item style="float:right;">
            <el-button type="primary" size='medium' @click="getList(checkInfor.status),checkInfor.current=1,isDel=checkInfor.isDel">查询</el-button>
          </el-form-item>
          <el-form-item style="float:right;">
            <el-button type="primary" size='medium' @click="reloadCon">重置</el-button>
          </el-form-item>
        </el-form>
        <el-form :inline="true" style="margin-top:20px;">
          <el-form-item>
            <el-button type="primary" size='small'>导出</el-button>
          </el-form-item>
        </el-form>
      </el-form>
      <!-- 导航栏 -->
      <el-table :data="inforList" style="width: 100%;" @row-click="changeDev">
        <el-table-column prop="houseName" label="巡查任务">
        </el-table-column>
        <el-table-column prop="tenant" label="路线" width="250">
        </el-table-column>
        <el-table-column prop="phone" label="巡查时间" width="250">
        </el-table-column>
        <el-table-column prop="contractTypeName" label="状态">
        </el-table-column>
        <el-table-column prop="xcy" label="巡查员">
        </el-table-column>
        <el-table-column label="操作" fixed="right" width=350>
          <template slot-scope="scope">
            <el-button size="small" v-if="scope.row.status==1">处理进度</el-button>
            <el-button size="small" v-if="scope.row.status==2">发布整改通知</el-button>
            <el-button size="small" v-if="scope.row.status==3">查看整改通知</el-button>
            <el-button size="small" @click="goDetual">查看详情</el-button>
          </template>
        </el-table-column>
      </el-table>
      <!-- 批量删除，下标页码 -->
      <el-col :span="24" class="paginationt">
        <el-pagination layout="prev, pager, next" @current-change="handleCurrentChange" :page-size="10" :page-count="total" class="pagination">
        </el-pagination>
      </el-col>

    </div>
  </section>
</template>
<script>
export default {
  data(){
    return{
      total:1,
      isDel:0,//控制删除按钮
      canchoe:0,//控制是结算还是退房，0表示退房。1表示结算
      allmoney:0,//退还金额
      allmoney2:0,//退还金额
      checked:true,
      tuifan:false,
      tuifan2:false,
      tuifan3:false,
      tuifan4:false,
      tuifan5:false,
      cost:'',//其它费用的金额
      other1:[],//其它费用的
      updataVisible:false,
      selectArr:[],
      listLoading:false,
      sels: [],//列表选中列
      checkList:[],
      inforList:[
        {
          houseName:'教育路巡查',
          tenant:'九耀坊巷005号-九耀坊巷006号-......',
          phone:'2019.12.02  19:40-20:54（周一）',
          xcy:'李本本，张慧慧',
          contractTypeName:'异常需整改/通知审核中',
          status:1,
        },
        {
          houseName:'教育路巡查',
          tenant:'009号-012号-013号-015号......',
          phone:'2019.11.30  19:40-20:54（周日）',
          xcy:'李本本，张慧慧',
          contractTypeName:'异常需整改/未发通知',
          status:2,
        },
        {
          houseName:'教育路巡查',
          tenant:'009号-012号-013号-015号......',
          phone:'2018.11.29  19:40-20:54（周五）',
          startEnd:'16：30-11：30',
          rentCost:'未巡查',
          xcy:'李本本，张慧慧',
          contractTypeName:'异常需整改/已发整改',
          status:3,
        }
        
      ],
      checkInfor:{
        status:0,
        size:10,
        current:1//当前页数
      },//条件查询
      addForm:{ //备注操作
        usableTime : new Date(),
        costVos:[],
        badDebtCost:0,
      },
      indexArr:[],
      indexArr1:[],
      houseTemplate:{
        items:[],
      },
      houseTemplate1:{
        items:[],
      },
      houseTemplate2:{
        items:[],
      },
      leaseId:'',
      sureTF:{
        costVos:[],
        leaseId:'',
        isSend:1
      },
      billsConfi:[]
    }
  },
  methods:{
    goDetual(){
      this.$router.push({
        path:'./fangwuxunchaDetaul'
      })
    }
  },
  mounted(){
  }
}
</script>
<style scoped>
.equi{
  padding:20px;
}
.zwmx{
  border:1px solid #dadada;
  padding-top:10px;
}
.zwmx p{
  padding:0px 10px;
}
.zwmx .grat{
  background:#dadada;
}
.gridContt{
  line-height:30px;
  margin-top:10px;
}
.tishi{
  border:1px solid #dadada;
  background:rgb(255, 253, 245);
  padding:20px;
  display:flex;
}
.el-form-item{
  margin-bottom:0px;
}
</style>


