<template>
  <section class="modlude">
    <el-form :inline="true" :model="formSearch" class="form_inline" label-width="100px">
      <el-form-item label="选择小区" size="small" prop="xqId">
        <el-select v-model="formPush.xqId" placeholder="请选择小区">
          <el-option v-for="item in xqTree" :label="item.name" :value="item.id" :key="item.id"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="用户昵称" size="small">
        <el-input v-model="formSearch.nickname" placeholder="请输入用户昵称"></el-input>
      </el-form-item>
      <el-form-item label="手机号" size="small">
        <el-input v-model="formSearch.phone" placeholder="请输入手机号"></el-input>
      </el-form-item>
      <el-form-item label="用户家园号" size="small">
        <el-input v-model="formSearch.systemJyh" placeholder="请输入用户家园号"></el-input>
      </el-form-item>
      <el-form-item label="状态" size="small">
        <el-select v-model="formSearch.status" placeholder="请选择状态">
          <el-option label="未审核" :value="0"></el-option>
          <el-option label="已审核" :value="1"></el-option>
          <el-option label="不通过" :value="2"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="家庭事务类型" size="small">
        <el-select v-model="formSearch.typeId" placeholder="请选择类型">
          <el-option v-for="item in propertyTypeList" :key="item.id" :label="item.name" :value="item.id"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="创建时间" size="small">
        <el-date-picker
          v-model="formSearch.createTime"
          type="datetime"
          value-format="timestamp"
          placeholder="创建时间">
        </el-date-picker>
      </el-form-item>
      <el-form-item label="开始时间" size="small">
        <el-date-picker
          v-model="formSearch.startTime"
          type="datetime"
          value-format="timestamp"
          placeholder="开始时间">
        </el-date-picker>
      </el-form-item>
      <el-form-item label="结束时间" size="small">
        <el-date-picker
          v-model="formSearch.endTime"
          type="datetime"
          value-format="timestamp"
          placeholder="结束时间">
        </el-date-picker>
      </el-form-item>
      <el-form-item>
        <el-button size="small" @click="getlist">查 询</el-button>
      </el-form-item>
      <el-form-item>
        <el-button size="small" @click="deleInfor(false,1)">批量审核通过</el-button>
      </el-form-item>
      <el-form-item>
        <el-button size="small" type="danger" @click="deleInfor(false,2)">批量审核不通过</el-button>
      </el-form-item>
    </el-form>
    <el-table :data="formData" style="width: 100%" stripe @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55"></el-table-column>
      <el-table-column prop="nickname" label="用户昵称"></el-table-column>
      <el-table-column prop="phone" label="用户手机号"></el-table-column>
      <el-table-column prop="systemJyh"label="用户家园号"></el-table-column>
      <el-table-column prop="housename"label="房间"></el-table-column>
      <el-table-column prop="typeName"label="类型"></el-table-column>
      <el-table-column prop="item7"label="详情"></el-table-column>
      <el-table-column prop="checkTime"label="申请时间" width="150">
        <template slot-scope="scope" v-if="scope.row.checkTime">
          {{$root.getDateArray(scope.row.checkTime)[9]}}
        </template>
      </el-table-column>
      <el-table-column prop="startTime"label="开始时间" width="150">
        <template slot-scope="scope" v-if="scope.row.startTime">
          {{$root.getDateArray(scope.row.startTime)[9]}}
        </template>
      </el-table-column>
      <el-table-column prop="endTime"label="结束时间" width="150">
        <template slot-scope="scope" v-if="scope.row.endTime">
          {{$root.getDateArray(scope.row.endTime)[9]}}
        </template>
      </el-table-column>
      <el-table-column prop="status"label="状态">
        <template slot-scope="scope">
					{{scope.row.status==0?"未审核":scope.row.status==1?"已审核":"不通过"}}
				</template>
      </el-table-column>
      <el-table-column label="操作" fixed="right" width=300>
				<template slot-scope="scope">
					<el-button type="warning" size="small" @click="deleInfor(scope.row.id,1)">审核</el-button>
					<el-button type="danger" size="small" @click="deleInfor(scope.row.id,2)">未通过</el-button>
					<!-- <el-button type="danger" size="small" @click="deleInfor(scope.row.id)">查看详情</el-button> -->
				</template>
			</el-table-column>
    </el-table>
    <paging @changePage = handleCurrentPage :get-total='total'></paging>
    
  </section>  
</template>

<script>
import paging from "../paging"
import { getwuyeApplyData,propertyType,addPropertyTypeList,updatePropertyTypeList,checkHouseWork,xqSelectList,orgTree } from '../../url/api';
export default {
  data(){
    return{
      checkStrictly:false,
      bindRole:{},
      propertyTypeList:[],
      showmenuList:[],
      menuList:[],
      option1:[],
      xqTree:[],
      isAddorUpdate:1,//1添加、2修改
      formSearch:{
        current:1,
        size:10
      },
      formData: [],//数据
      deleBatch: [],//删除数据
      formUpdate:{},//修改表单
      total: 0,//数据总数
      pages:0,//页面总数
      addDialog:false,
      updateDialog:false,
      dialog:false,
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
      rules: {
        name:[{ required: true, message: '该项不能为空'}],
        type:[{ required: true, message: '该项不能为空',trigger: 'blur'}],
        xqId:[{ required: true, message: '该项不能为空',trigger: 'blur'}],
      },
      imageUrl:''
    }
  },
  methods:{
    checkHouseWork(){//审核

      checkHouseWork().then(res=>{
        if(res.data.code == 200){
          this.formData = res.data.data.records.filter((item)=>{
            return item
          })
          this.total = res.data.data.total
        }else{
          this.$message(res.data.msg);
        }
      })
    },
    getlist(){
      getwuyeApplyData(this.formSearch).then((res)=>{
        console.log(res)
        if(res.data.code == 200){
          this.formData = res.data.data.records.filter((item)=>{
            return item
          })
          this.total = res.data.data.total
        }else{
          this.$message(res.data.msg);
        }
      })
    },
    getInit(){
      this.getlist()
      xqSelectList({}).then((res)=>{//小区选择列表
        console.log(res)
        if(res.data.code == 200){
          this.xqTree = res.data.data
          this.formPush.xqId = this.xqTree[0].id||''
        }
      })
      propertyType({}).then((res)=>{//家庭事务类型
        console.log(res)
        if(res.data.code == 200){
          this.propertyTypeList = res.data.data
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
    handleChange(value){
      if(value.length!=0){
        console.log(value)
        this.formSearch.orgId=this.$refs.cascader.getCheckedNodes()[0].data.id
      }else{
        this.formSearch.orgId = ''
      }
    },
    handleChange1(value){
      if(value.length!=0){
        console.log(value)
        this.formPush.orgId=this.$refs.cascader.getCheckedNodes()[0].data.id
      }else{
        this.formPush.orgId = ''
      }
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
        name:item.name,
        type:item.type,
      }
      this.updateDialog = true
      console.log(this.formUpdate)
    },
      deleInfor(ids,status){//删除
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
      this.$confirm('确定操作吗？')
      .then(_ => {
        let params ={
          ids:arrId,
          status:status,
        }
        checkHouseWork(params).then((res)=>{
          console.log(res)
          if(res.data.code == 200){
            this.$message('操作成功');
            this.getlist()
          }
        })
      })
      .catch(_ => {});
    },
    handleSelectionChange(val,self) {//多选
      this.deleBatch = val
      // let obj = {}
      // let aa = val.find(item=>item.id == self.id) 
      // console.log(aa)
      // if(aa){
      //   this.allSelect = [...this.allSelect,...val]
      //   this.allSelect = this.allSelect.reduce((cur,next) => {
      //       obj[next.id] ? "" : obj[next.id] = true && cur.push(next);
      //       return cur;
      //   },[])
      // }else{
      //   this.allSelect = this.allSelect.filter((item)=>{
      //     return item.id!=self.id
      //   })
      // }
      console.log(this.deleBatch)
      // this.deleBatch = this.allSelect
      // console.log(this.deleBatch)
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