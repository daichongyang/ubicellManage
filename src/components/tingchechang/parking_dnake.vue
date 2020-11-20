<template>
  <section class="modlude">
    <el-form :inline="true" :model="formSearch" class="form_inline" label-width="100px">
      <el-form-item label="选择小区" size="small" prop="xqId">
        <el-select v-model="formSearch.xqId" placeholder="请选择小区">
          <el-option v-for="item in xqTree" :label="item.name" :value="item.id" :key="item.id"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button size="small" @click="getlist">查 询</el-button>
      </el-form-item>
    </el-form>
    <el-table :data="formData" style="width: 100%" stripe @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55"></el-table-column>
      <el-table-column prop="parkName" label="停车场名称"></el-table-column>
      <el-table-column prop="placeCount" label="临时车入场开闸方式"></el-table-column>
      <el-table-column prop="tmpCarInOpenMode" label="临时车进场模式"></el-table-column>
      <el-table-column prop="tmpCarOutOpenMode" label="临时车出场模式"></el-table-column>
      <el-table-column prop="mthCarInOpenMode" label="月租车进场模式"></el-table-column>
      <el-table-column prop="sfGateName" label="入场收费口名"></el-table-column>
      <el-table-column prop="gateName" label="通道名称"></el-table-column>
      <el-table-column prop="ipAddr" label="控制器 IP"></el-table-column>
      <el-table-column prop="addr" label="控制器编号地址"></el-table-column>
      <el-table-column prop="ledNo" label="LED屏编号"></el-table-column>
      <!-- <el-table-column prop="account"label="类型">
        <template slot-scope="scope">
          {{scope.row.status==0?'普通停车区':scope.row.status==1?'6格立体停车场':"9格立体停车场"}}
        </template>
      </el-table-column>
      <el-table-column prop=""label="创建时间" width=150>>
        <template slot-scope="scope" v-if="scope.row.gmtCreate">
          {{$root.getDateArray(scope.row.gmtCreate)[9]}}
        </template>
      </el-table-column>
      <el-table-column prop=""label="更新时间" width=150>
        <template slot-scope="scope" v-if="scope.row.gmtUpdate">
          {{$root.getDateArray(scope.row.gmtUpdate)[9]}}
        </template>
      </el-table-column> -->
    </el-table>
    <paging @changePage = handleCurrentPage :get-total='total' :moduleInfor="moduleInfor"></paging>
  </section>  
</template>

<script>
import paging from "../paging"
import { carParkSummaryData,getParkInfo,delCar,addPropertyTypeList,updatePropertyTypeList,addReply,xqSelectList,orgTree } from '../../url/api';
export default {
  data(){
    return{
      checkStrictly:false,
      bindRole:{},
      showmenuList:[],
      menuList:[],
      option1:[],
      xqTree:[],
      isAddorUpdate:1,//1添加、2修改
      formSearch:{
        xqId:''
      },
      formData: [],//数据
      deleBatch: [],//删除数据
      formUpdate:{},//修改表单
      total: 0,//数据总数
      pages:0,//页面总数
      addDialog:false,
      updateDialog:false,
      dialog:false,
      replyType:1,//1。单个回复 2.批量回复
      formPush:{
      },
      dataTree:[],
      defaultProps: {//树状图key定义
        children: 'data',
        label: 'name'
      },
      defaultProps2: {
        children: 'children',
        label: 'name',
        value: 'id',
        expandTrigger: 'hover',checkStrictly: true
      },
      reply:'',
      moduleInfor:{},
      rules: {
        name:[{ required: true, message: '该项不能为空'}],
        type:[{ required: true, message: '该项不能为空',trigger: 'blur'}],
        xqId:[{ required: true, message: '该项不能为空',trigger: 'blur'}],
      },
      imageUrl:''
    }
  },
  methods:{
    getlist(){
      // carParkSummaryData(this.formSearch).then((res)=>{
      //   console.log(res)
      //   if(res.data.code == 200){
      //     this.moduleInfor = {
      //       name:'parking_keytop_info',
      //       freeSpaceNum:res.data.data.freeSpaceNum,
      //       totalSpaceNum:res.data.data.totalSpaceNum,
      //     }
      //   }else{
      //     this.$message(res.data.msg);
      //   }
      // })
      getParkInfo(this.formSearch).then((res)=>{
        console.log(res)
        if(res.data.code == 200){
          this.formData = res.data.data.filter((item)=>{
            return item
          })
        }else{
          this.$message(res.data.msg);
        }
      })
    },
    getInit(){
      xqSelectList({}).then((res)=>{//小区选择列表
        console.log(res)
        if(res.data.code == 200){
          this.xqTree = res.data.data
          this.formSearch.xqId = this.xqTree[0].id
          this.getlist()
        }
      })
      let org_tree={
        name:'',
        status:1
      }
      orgTree(org_tree).then((res)=>{//获取组织列表
        console.log(res)
        if(res.data.code == 200){
          this.dataTree = res.data.data
        }
      })
    },
    addList(addList){//添加树状图node节点
      this.$refs[addList].validate((valid) => {
        if (valid) {
          addPropertyTypeList(this.formPush).then((res)=>{
            console.log(res)
            if(res.data.code == 200){
              this.getlist()
              this.$message({
                message: '添加成功',
                type: 'success'
              });
              
            }else{
              this.$message('添加失败:'+res.data.msg)
            }
          })
          this.addDialog = false
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
    updateList(formName){//修改
      this.$refs[formName].validate((valid) => {
        if (valid) {
          if(this.formUpdate.gmtCreate){
            delete this.formUpdate.gmtCreate
          }
          let params = this.formUpdate
          updatePropertyTypeList(params).then((res)=>{
            console.log(res)
            if(res.data.code == 200){
              this.$message({
                message: '修改成功',
                type: 'warning'
              });
              this.getlist()
            }
          })
        } else {
          console.log('error submit!!');
          return false;
        }
        this.updateDialog =false
      });
    },
    updateShowBox(item){//修改东西弹窗
      // this.formUpdate = JSON.parse(JSON.stringify(item));
      this.formUpdate = {
        id:item.id,
      }
      this.updateDialog = true
      console.log(this.formUpdate)
    },
   deleInfor(ids){//删除
      let arrId = []
      if(ids){
        arrId.push(ids)
      }else{
        if(this.deleBatch.length!=0){
          this.deleBatch.filter((item)=>{
            arrId.push(item.carId)
            return item
          })
        }
      }
      this.$confirm('确认删除吗？')
      .then(_ => {
        delCar(arrId).then((res)=>{
          console.log(res)
          if(res.data.code == 200){
            this.$message('删除成功');
            this.getlist()
          }
        })
      })
      .catch(_ => {});
    },

    handleSelectionChange(val,self) {//多选
      this.deleBatch = val
      console.log(this.deleBatch)
    },
    handleCurrentPage(val){//页码改变
      this.formSearch.current=val
      this.getlist()
    },
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
  .cont_box{
    width:100%;
    display: flex;
  }
  .cont_box_left,.cont_box_right{
    flex:1;
    background: transparent ;
    padding:10px;
  }
  .cont_box_left{
    margin-right:10px;
  }
  .margin10{
    margin-bottom:10px;
  }
  .marginRight{
    margin-bottom:10px;
    border-bottom: 1px solid #eee;
  }
  .cont_box_right .el-form-item{
    margin-bottom:20px;
  }

</style>