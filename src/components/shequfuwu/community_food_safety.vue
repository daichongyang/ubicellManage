<template>
  <section>
      <!-- 导航栏 -->
    <div class="nav_options">
      <div class="nav_option" :class="{nav_option_active:checkInfor.status == 2}" @click="checkInfor.status=2">
        <span>食品安全</span>
      </div>
      <div class="nav_option" :class="{nav_option_active:checkInfor.status == 0}" @click="checkInfor.status=0">
        <span>当前巡查任务</span>
      </div>
      <!-- <div class="nav_option" :class="{nav_option_active:checkInfor.status == 1}" @click="checkInfor.status=1">
        <span>历史巡查任务</span>
      </div> -->
    </div>
    <div class="equi">
    <el-form :inline="true" :model="formSearch" class="gridContt" v-if="checkInfor.status==2">
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
      <el-form-item label="小区名称" size="small">
        <el-input v-model="checkInfor.name" placeholder="请输入内容"></el-input>
      </el-form-item>
      <el-form-item label="餐饮类型" size="small">
        <el-input v-model="checkInfor.name" placeholder="请输入内容"></el-input>
      </el-form-item>
      <el-form-item label="名称" size="small">
        <el-input v-model="checkInfor.name" placeholder="请输入内容"></el-input>
      </el-form-item>
      <el-form-item label="简介" size="small">
        <el-input v-model="checkInfor.name" placeholder="请输入内容"></el-input>
      </el-form-item>
      <el-form-item label="联系方式" size="small">
        <el-input v-model="checkInfor.name" placeholder="请输入内容"></el-input>
      </el-form-item>
      <el-form-item label="地址" size="small">
        <el-input v-model="checkInfor.name" placeholder="请输入内容"></el-input>
      </el-form-item>
      <el-form-item label="距离" size="small">
        <el-input v-model="checkInfor.name" placeholder="请输入内容"></el-input>
      </el-form-item>
      <el-form-item label="状态" size="small">
        <el-input v-model="checkInfor.name" placeholder="请输入内容"></el-input>
      </el-form-item>
      <el-form-item label="用户昵称" size="small">
        <el-input v-model="checkInfor.name" placeholder="请输入内容"></el-input>
      </el-form-item>
      <el-form-item label="用户家园号" size="small">
        <el-input v-model="checkInfor.name" placeholder="请输入内容"></el-input>
      </el-form-item>
      <el-form-item label="创建人员" size="small">
        <el-input v-model="checkInfor.name" placeholder="请输入内容"></el-input>
      </el-form-item>
      <el-form-item label="创建时间" size="small">
        <el-input v-model="checkInfor.name" placeholder="请输入内容"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button size="small" @click="getInit">查 询</el-button>
      </el-form-item>
      <el-form-item>
        <el-button size="small" @click="addDialog=true">添 加</el-button>
      </el-form-item>
    </el-form>
      <el-form :inline="true" class="gridContt" v-if="checkInfor.status!=2">
        <el-form :inline="true">
          <el-form-item label="巡查员名称" class="getNm" v-if="checkInfor.status!=2">
            <el-input placeholder="输入巡查员姓名" v-model="checkInfor.houseName" size='small'></el-input>
          </el-form-item>
          <el-form-item label="电话号码" v-if="checkInfor.status!=2">
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
          <el-form-item label="承租人"  class="margin0" v-if="checkInfor.status!=2">
            <el-input placeholder="输入承租人姓名" v-model="checkInfor.creatorName" size='small'></el-input>
          </el-form-item>
          <el-form-item label="承租人联系方式"  class="margin0" v-if="checkInfor.status!=2">
            <el-input placeholder="输入承租人联系方式" v-model="checkInfor.creatorName" size='small'></el-input>
          </el-form-item>
          <el-form-item label="楼宇档案码"  class="margin0" v-if="checkInfor.status!=2">
            <el-input placeholder="输入数字" v-model="checkInfor.creatorName" size='small'></el-input>
          </el-form-item>
          <el-form-item label="旧门牌"  class="margin0" v-if="checkInfor.status!=2">
            <el-input placeholder="输入数字" v-model="checkInfor.creatorName" size='small'></el-input>
          </el-form-item>
            <el-form>
              <el-form-item label="状态" class="margin0" v-if="checkInfor.status!=2">
                <el-radio-group class="width333" v-model="checkInfor.leaseStatus">
                  <el-radio label="1">启用中 </el-radio >
                  <el-radio label="2">停用 </el-radio >
                  <el-radio label="2">过期 </el-radio >
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
            <el-button type="primary" size='medium' @click="">重置</el-button>
          </el-form-item>
        </el-form>
        <el-form :inline="true" style="margin-top:20px;">
          <el-form-item>
            <el-button type="primary" icon="el-icon-plus" size='medium' @click="goRenterRegister">新增巡查任务</el-button>
          </el-form-item>
        </el-form>
      </el-form>

      <el-table :data="inforList" style="width: 100%;"  v-show="checkInfor.status!=2  ">
        <el-table-column prop="houseName" label="巡查任务">
        </el-table-column>
        <el-table-column prop="tenant" label="路线" width="250">
        </el-table-column>
        <el-table-column prop="phone" label="日期" width="250">
        </el-table-column>
        <el-table-column prop="startEnd" label="时间段">
        </el-table-column>
        <el-table-column prop="rentCost" label="最近巡查时间">
        </el-table-column>
        <el-table-column prop="xcy" label="巡查员">
        </el-table-column>
        <el-table-column prop="contractTypeName" label="状态">
        </el-table-column>
        <el-table-column label="操作" fixed="right" width=350>
          <template slot-scope="scope">
            <el-button size="small" v-if="scope.row.status !=1">停用</el-button>
            <el-button size="small" v-if="scope.row.status !=1">修改</el-button>
            <el-button size="small">详情</el-button>
            <el-button size="small" @click="goPage2">巡查记录</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-table :data="formData" style="width: 100%;" v-show="checkInfor.status==2">
      <el-table-column prop="item1" label="编号"></el-table-column>
      <el-table-column prop="item2" label="名称"></el-table-column>
      <el-table-column prop="item3" label="简介"></el-table-column>
      <el-table-column prop="item4"label="距离"></el-table-column>
      <el-table-column prop="item5"label="联系方式"></el-table-column>
      <el-table-column prop="item6"label="地址"></el-table-column>
      <el-table-column prop="item7"label="类型"></el-table-column>
      <el-table-column prop="item8"label="状态"></el-table-column>
      <el-table-column prop="item9"label="创建时间"></el-table-column>
      <el-table-column label="操作" fixed="right" width=350>
				<template slot-scope="scope">
					<el-button type="warning" size="small" @click="updateShowBox(scope.row)">修 改</el-button>
					<el-button type="" size="small" @click="deleInfor(scope.row.id)">营 业</el-button>
					<el-button type="" size="small" @click="deleInfor(scope.row.id)">查看详情</el-button>
          <el-button size="small" @click="goPage2">巡查记录</el-button>
				</template>
			</el-table-column>
      </el-table>
      <!-- 批量删除，下标页码 -->
      <el-col :span="24" class="paginationt">
        <el-pagination layout="prev, pager, next" @current-change="" :page-size="10" :page-count="total" class="pagination">
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
          phone:'周一/周三/周五 循环',
          startEnd:'16：30-11：30',
          rentCost:'2019.12.02',
          xcy:'李本本，张慧慧',
          contractTypeName:'启用中',
          status:0,
          fbr:'杨经理',
          rwlx:'月度任务'
        },
        {
          houseName:'北京街道巡查',
          tenant:'009号-012号-013号-015号......',
          phone:'2019.12.04',
          startEnd:'16：30-11：30',
          rentCost:'未巡查',
          xcy:'刘小小，周粥',
          contractTypeName:'启用中',
          status:0,
           fbr:'杨经理',
          rwlx:'月度任务'
        }
        
      ],
      inforList1:[
        {
          houseName:'教育路巡查',
          tenant:'九耀坊巷005号-九耀坊巷006号-......',
          phone:'周一/周三/周五 循环',
          startEnd:'16：30-11：30',
          rentCost:'2019.12.02',
          xcy:'李本本，张慧慧',
          contractTypeName:'启用中',
          status:0,
          fbr:'杨经理',
          rwlx:'月度任务'
        },
        {
          houseName:'北京街道巡查',
          tenant:'009号-012号-013号-015号......',
          phone:'2019.12.04',
          startEnd:'16：30-11：30',
          rentCost:'未巡查',
          xcy:'刘小小，周粥',
          contractTypeName:'启用中',
          status:0,
           fbr:'杨经理',
          rwlx:'月度任务'
        }
        
      ],
      formData: [
        {
          item1:"75",
          item2:"喜羊羊",
          item3:"羊肉火锅",
          item4:"2.0km",
          item5:"13000000007",
          item6:"深圳南山",
          item7:"小件速递",
          item8:"停业中",
          item9:"2020-06-15 16:57:56",
        },
        {
          item1:"74",
          item2:"八合里	",
          item3:"牛肉火锅",
          item4:"7.1km",
          item5:"13000000006",
          item6:"深圳南山",
          item7:"商圈",
          item8:"营业中",
          item9:"2020-06-15 16:57:56",
        },
        {
          item1:"73",
          item2:"润园四季	",
          item3:"椰子鸡火锅",
          item4:"7.1km",
          item5:"13000000005",
          item6:"深圳南山",
          item7:"商圈",
          item8:"营业中",
          item9:"2020-06-15 16:52:58",
        },
        {
          item1:"72",
          item2:"小龙坎	",
          item3:"麻辣火锅",
          item4:"7.1km",
          item5:"13000000004",
          item6:"深圳罗湖",
          item7:"搬家",
          item8:"停业中",
          item9:"2020-06-15 16:10:56",
        },
        {
          item1:"71",
          item2:"木屋烧烤	",
          item3:"烧烤，串串",
          item4:"7.1km",
          item5:"13000000006",
          item6:"深圳南山",
          item7:"快递",
          item8:"营业中",
          item9:"2020-06-15 16:09:39",
        },
        {
          item1:"70",
          item2:"麦当劳	",
          item3:"汉堡，速食",
          item4:"7.1km",
          item5:"13000000006",
          item6:"深圳南山",
          item7:"洗衣",
          item8:"营业中",
          item9:"2020-06-15 16:57:56",
        },
        {
          item1:"69",
          item2:"老西安	",
          item3:"西安菜，面条",
          item4:"2.1km",
          item5:"13000000006",
          item6:"深圳南山",
          item7:"家政",
          item8:"营业中",
          item9:"2020-06-15 16:57:56",
        },
      ],//数据
      checkInfor:{
        status:2,
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
    getList(status){
      this.checkInfor.status = status
      if(status == 1){
        this.inforList[0].contractTypeName = "停用"
        this.inforList[1].contractTypeName = "过期"
        this.inforList[1].phone = "2019.11.27"
        this.inforList[1].status = 1

      }else if(status ==1){
        this.inforList[0].contractTypeName = "启用中"
        this.inforList[1].contractTypeName = "启用中"
        this.inforList[1].phone = "2019.12.04"
        this.inforList[1].status = 0

      }else{
        this.inforList[1].status = 2
      }
    },
    goPage2(){
      this.$router.push({
        path:'./fangwuxuncha1'
      })
    },
    goRenterRegister(){
      this.$router.push({
        path:'./addFangwuxuncha'
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

</style>


