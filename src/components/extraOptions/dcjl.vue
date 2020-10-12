<template>
  <section class="modlude">
    <!-- 导航栏 -->
    <p class="margintop"></p>
    <el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
      <el-form :inline="true" class="gridContt">
        <el-form :inline="true">
          <el-form-item size="small" label="下载类型">
          <el-select v-model="checkInfor.value" placeholder="请选择">
            <el-option label="类型1" :value="1"></el-option>
            <el-option label="类型2" :value="2"></el-option>
          </el-select>
          </el-form-item>
          <el-form-item size="small" label="导出类型">
            <el-select v-model="checkInfor.value1" placeholder="请选择">
              <el-option label="类型1" :value="1"></el-option>
              <el-option label="类型2" :value="2"></el-option>
            </el-select>
          </el-form-item>
        <el-form-item size="small" label="导出时间">
            <el-date-picker
              v-model="checkInfor.liveStartTime"
              type="date"
              value-format="timestamp"
              placeholder="开始日期">
            </el-date-picker>
          </el-form-item>
          <el-form-item size="small" label="-">
            <el-date-picker
              v-model="checkInfor.liveEndTime	"
              type="date"
              value-format="timestamp"
              placeholder="结束时间">
            </el-date-picker>
          </el-form-item>
          <el-form-item size="small" label="操作人员">
            <el-input placeholder="操作人员" v-model="checkInfor.nativePlace" size='small'></el-input>
          </el-form-item>
          <el-form-item size="small" label="操作人员角色">
            <el-input placeholder="操作人员角色" v-model="checkInfor.nativePlace" size='small'></el-input>
          </el-form-item>

        </el-form>
      </el-form>
        <el-form class="marginTop20" :inline="true">
          <el-form-item label="查询结果" class="margin0">
            <el-button type="primary" size='small'>报表导出</el-button>
            <el-button type="primary" size='small' @click="getList">查询</el-button>
            <el-button type="primary" size='small' @click="reloadCon">重置</el-button>
          </el-form-item>
        </el-form>
    </el-col>

    <!-- 列表部分 -->
    <el-table :data="inforList" highlight-current-row v-loading="listLoading" @selection-change="selsChange" style="width: 100%;">
			<el-table-column class="ccc" type="selection" width="55" label="全选">
			</el-table-column>  
			<el-table-column prop="name" label="内容">
			</el-table-column>
			<el-table-column prop="sex" label="导出时间">
			</el-table-column>
			<el-table-column prop="duty" label="操作人">
			</el-table-column>
			<el-table-column prop="department" label="操作人角色">
			</el-table-column>
			<el-table-column label="操作" fixed="right" width=400>
				<template slot-scope="scope">
          <el-button size="small" >查看</el-button>
          <el-button size="small" >下载</el-button>
          <!-- <el-button size="small" >{{scope.row.isContactt}}</el-button> -->
				</template>
			</el-table-column>
		</el-table>
    <!-- 批量删除，下标页码 -->
		<el-col :span="24" class="paginationt">
			<el-pagination layout="prev, pager, next" @current-change="handleCurrentChange" :page-size="10" :page-count="total" class="pagination">
			</el-pagination>
		</el-col>
  </section>
</template>
<script>
// import {getDateArray} from '../../util/util'
// import {getYqfkPerson, deptaddList, selectOffice,locationHouse,deptupdateList,deptdeleteList} from '../../api/api'
export default {
  data(){
    return{
      headIcon:'',
      isActive:1,
      remark:'',//修改备注
      total:1,
      selectArr:[],
      addFormVisible:false,
      addFormVisible1:false,
      updataVisible:false,
      listLoading:false,
      sels: [],//列表选中列
      locationHouseList:[],//区域层级列表
      selectOfficeList:[],//分店下拉列表
      temListtList:[],//房间模板列表
      checkList:[],
      houseAssign:{
        houseIds:[],//房间id
        officeId:''
      },
      inforList:[
        {
          name:'英达斯瑞公园总人员报表',
          sex:'2020.06.12 12:12:10',
          duty:'李经理',
          department:'总经理',
          isSplite:'010101',
          temperature:'个',
          health:'130',
          isCross:'2号仓库',
          isContact:'审核通过/未领用',
          isContactt:"领用"
        },
        {
          name:'英达斯瑞公园总人员报表',
          sex:'2020.06.12 12:12:10',
          duty:'李经理',
          department:'总经理',
          isSplite:'010101',
          temperature:'个',
          health:'30',
          isCross:'3号仓库',
          isContact:'未审核',
          isContactt:"审核通过"
        },
        {
          name:'英达斯瑞公园总人员报表',
          sex:'2020.06.12 12:12:10',
          duty:'李经理',
          department:'总经理',
          isSplite:'010101',
          temperature:'个',
          health:'10',
          isCross:'4号仓库',
          isContact:'审核通过/未领用',
          isContactt:"领用"
        }
      ],
      checkInfor:{
        current:1,
        size:10,
        type:1
      },//条件查询
      updataForm:{},
      addForm:{},
      params:{}
    }
  },
  methods:{
    reloadCon(){
      location.reload()
    },
    getList1(item){
      if(item == 1){
        this.$router.push({
          path:'./jcrManage'
        })
      }else if(item == 2){
        this.$router.push({
          path:'./txzsq'
        })
      }
    },
    changexianmu(officeId){
      this.houseAssign.officeId=officeId
    },
    getList(){//获取列表
      let params=this.checkInfor
      console.log(params)
      getYqfkPerson(params).then(res=>{
        console.log(res)
        // if(res.data.code===200){
        //   this.inforList=res.data.data.filter(function(item){
        //     if(item.isRent===0){
        //       item.isRentName='否'
        //     }else if(item.isRent===1){
        //       item.isRentName='是'
        //     }
        //     return item
        //   })
        //   this.total=res.data.data.pages
        // }
      })
    },
    changeItem(){//修改

      let params ={
        address:this.updataForm.address,
        name:this.updataForm.name,
        officeId:this.updataForm.officeId,
        phone:this.updataForm.phone,
        privateAccount:this.updataForm.privateAccount,
        publicAccount:this.updataForm.publicAccount,
      } 
      console.log(params)
      deptupdateList(params).then(res => {
        console.log(res)
        if(res.data.code == 200){
          this.getList();
        }else{
          alert(res.data.msg)
        }
      }).catch(err => {
          alert("网络请求失败")
        })
      this.addFormVisible1 = false

    },
    showTc(){
      // this.addFormVisible=true
    },
    pushInfor(){//添加
      if(!this.addForm.name){
        alert('请输入公司名称')
        return
      }
      let params=this.addForm
      console.log(params)
      deptaddList(params).then(res=>{
        console.log(res)
        this.addFormVisible=false
        if(res.data.code===200){
          this.getList()
        }else{
          alert(res.data.msg)
        }
      })
    },
    deleteInfor (row) { // 删除
      let params = row.officeId
      console.log(params)
      this.$confirm('确定要删除该条信息吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'success'
      }).then(() => {
        deptdeleteList(params).then(res => {
          console.log(res)
          if (res.data.code === 200) {
            this.getList()
            this.$message({
              type: 'success',
              message: '操作成功'
            })
          } else {
            alert('删除失败')
          }
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消'
        })
      })
    },
    handleCurrentChange(val){
      this.checkInfor.current = val;
			this.getList();
    },
    selsChange: function (sels) {// 当选择项发生变化时会触发该事件
      this.houseAssign.houseIds=[]
      console.log(sels)
      if(sels.length!==0){
        for(let i = 0 ; i < sels.length ; i++){
          this.houseAssign.houseIds.push(sels[i].houseId)
        }       
      }
      console.log( this.houseAssign.houseIds)
      this.sels=sels.filter(function (sel) {
        if(sel.isExist!==1){
            return sel
        }
      })
    } 
  },
  mounted(){
    this.getList()
  }
}
</script>
<style scoped>
.gridContt{
  line-height:30px;
}

</style>


