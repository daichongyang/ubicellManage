<template>
  <section class="modlude">
    <!-- 导航栏 -->
    <p class="margintop"></p>
    <el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
      <el-form :inline="true" class="gridContt" label-width="80px">
        <el-form-item label="选择小区" size="small">
          <el-select v-model="checkInfor.xqId" placeholder="请选择小区">
            <el-option v-for="(item,index) in xqTree" :label="item.name" :value="item.id" :key="index"></el-option>
          </el-select>
        </el-form-item>
          <el-form-item size="small" label="导出类型">
            <el-select v-model="checkInfor.state" placeholder="请选择">
              <el-option label="成功" :value="0"></el-option>
              <el-option label="失败" :value="1"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item size="small" label="账号">
            <el-input placeholder="请输入账号" v-model="checkInfor.account" size='small'></el-input>
          </el-form-item>
          <el-form-item size="small" label="导入时间">
            <el-date-picker
              v-model="checkInfor.gmtCreate"
              type="date"
              value-format="timestamp"
              placeholder="开始日期">
            </el-date-picker>
          </el-form-item>
          <!-- <el-form-item size="small" label="-">
            <el-date-picker
              v-model="checkInfor.liveEndTime	"
              type="date"
              value-format="timestamp"
              placeholder="结束时间">
            </el-date-picker>
          </el-form-item> -->
      </el-form>
        <el-form class="marginTop20" :inline="true">
          <el-form-item label="查询结果" class="margin0">
            <el-button type="primary" size='small' @click="getList">查询</el-button>
          </el-form-item>
        </el-form>
    </el-col>

    <!-- 列表部分 -->
    <el-table :data="inforList" style="width: 100%;">
    <!-- <el-table :data="inforList" highlight-current-row v-loading="listLoading" @selection-change="selsChange" style="width: 100%;"> -->
			<!-- <el-table-column class="ccc" type="selection" width="55" label="全选">
			</el-table-column>   -->
			<el-table-column prop="account" label="账号">
			</el-table-column>
			<el-table-column prop="" label="导入类型">
        <template slot-scope="scope">
          <div>{{scope.row.menuCode=='house_user'?'房间类型':''}}</div>
        </template>
			</el-table-column>
			<el-table-column prop="" label="导入时间">
        <template slot-scope="scope">
          <div v-if="scope.row.gmtCreate">{{$root.getDateArray(scope.row.gmtCreate)[9]}}</div>
        </template>
			</el-table-column>
			<el-table-column prop="remark" label="操作结果">
			</el-table-column>
			<el-table-column prop="" label="状态">
        <template slot-scope="scope">
          {{scope.row.state==0?'成功':'失败'}}
        </template>
			</el-table-column>
			<el-table-column label="操作" fixed="right" width=100>
				<template slot-scope="scope">
          <el-button size="small" @click="gohouseUserLogList(scope.row)">详情</el-button>
				</template>
			</el-table-column>
		</el-table>
    <paging @changePage = handleCurrentPage :get-total='total'></paging>
  </section>
</template>
<script>
import paging from "../paging"
import {getImportList,xqSelectList} from '../../url/api'
export default {
  data(){
    return{
      headIcon:'',
      isActive:1,
      remark:'',//修改备注
      total:0,
      xqTree:[],
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
      inforList:[],
      checkInfor:{//条件查询
        current:1,
        size:10
      },
      updataForm:{},
      addForm:{},
      params:{}
    }
  },
  methods:{
    gohouseUserLogList(obj){
      if(obj.menuCode=='house_user'){
        this.$router.push({//房间到出入记录
          path:'/houseUserLogList',
          query:{
            sectionId:obj.id
          }
        })
      }

    },
    getinit(){
      this.getlist()
      xqSelectList({}).then((res)=>{//小区选择列表
        console.log(res)
        if(res.data.code == 200){
          this.xqTree = res.data.data
        }
      })
    },
    getList(){//获取列表
      let params=this.checkInfor
      console.log(params)
      getImportList(params).then(res=>{
        console.log(res)
        if(res.data.code===200){
          this.inforList=res.data.data.records.filter(function(item){
            return item
          })
          this.total=res.data.data.total
        }
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
          this.getlist();
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
          this.getlist()
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
            this.getlist()
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
			this.getlist();
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
    },
    handleCurrentPage(val){//页码改变
      this.checkList.current=val
      this.getlist()
    },
  },
  mounted(){
    this.getinit()
  },
  components:{
    paging
  }
}
</script>
<style scoped>
.gridContt{
  line-height:30px;
}

</style>


