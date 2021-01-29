<template>  
  <section class="modlude">
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
      <el-form-item label="创建时间" size="small">
        <el-date-picker
          v-model="formSearch.gmtCreate"
          type="datetime"
          value-format="timestamp"
          placeholder="创建时间">
        </el-date-picker>
      </el-form-item>
      <el-form-item label="类型名称" size="small">
        <el-input v-model="formSearch.name" placeholder="请输入类型名称"></el-input>
      </el-form-item>
      <el-form-item label="类型分类" size="small">
        <el-select v-model="formSearch.type" placeholder="请选择类型分类">
          <el-option label="全部" :value="''"></el-option>
          <el-option label="报修类型" :value="1"></el-option>
          <el-option label="物业缴费类型" :value="2"></el-option>
          <el-option label="家庭事务类型" :value="3"></el-option>
        </el-select>    
      </el-form-item>
      <el-form-item label="创建人员" size="small">
        <el-input v-model="formSearch.crname" placeholder="请输入创建人员"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button size="small" @click="getlist">查 询</el-button>
      </el-form-item>
      <el-form-item>
        <el-button size="small" @click="addDialog=true">新 增</el-button>
      </el-form-item>
      <el-form-item>
        <el-button size="small" type="danger" @click="deleInfor(false)">批量删除</el-button>
      </el-form-item>
    </el-form>
    <el-table :data="formData" style="width: 100%" stripe @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55"></el-table-column>
      <el-table-column prop="name" label="类型名称"></el-table-column>
      <el-table-column label="类型分类">
        <template slot-scope="scope">
          {{scope.row.type==1?'报修类型':scope.row.type==2?'物业缴费类型':'家庭事务类型'}}
        </template>
      </el-table-column>
      <el-table-column prop="crname" label="创建人员"></el-table-column>
      <el-table-column prop="" label="创建时间">
        <template slot-scope="scope">
          {{$root.getDateArray(scope.row.gmtCreate)[9]}}
        </template>
      </el-table-column>
      <el-table-column label="操作" fixed="right" width=250>
				<template slot-scope="scope">
					<el-button type="warning" size="small" @click="updateShowBox(scope.row)">修 改</el-button>
					<el-button type="danger" size="small" @click="deleInfor(scope.row.id)">删 除</el-button>
				</template>
			</el-table-column>
    </el-table>
    <paging @changePage = handleCurrentPage :get-total='total'></paging>

    <!-- 添加 -->
    <el-dialog title="新增" :visible.sync="addDialog" :close-on-click-modal="false">
      <div class="cont_box_right">
        <el-form label-position="right" :rules="rules" label-width="80px" :model="formPush" ref='addList'> 
          <el-form-item label="选择小区" size="small" prop="xqId">
            <el-select v-model="formPush.xqId" placeholder="请选择小区">
              <el-option v-for="(item,index) in xqTree" :label="item.name" :value="item.id" :key="index"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="类型名称" size="small" prop="name">
            <el-input v-model="formPush.name"></el-input>
          </el-form-item>
          <el-form-item label="类型分类" size="small" prop="type">
            <el-select v-model="formPush.type" placeholder="请选择类型分类">
              <el-option label="报修类型" :value="1"></el-option>
              <el-option label="物业缴费类型" :value="2"></el-option>
              <el-option label="家庭事务类型" :value="3"></el-option>
            </el-select>      
          </el-form-item>
          <el-form-item label="服务类型" size="small" v-if="formPush.type==1">
            <el-select v-model="formPush.servicetype" placeholder="请选择服务类型">
              <el-option label="公区保修" :value="0"></el-option>
              <el-option label="室内保修" :value="1"></el-option>
              <el-option label="通用" :value="2"></el-option>
            </el-select>      
          </el-form-item>
        </el-form>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button size="medium " @click="addDialog = false">取 消</el-button>
        <el-button size="medium " @click="addList('addList')">新 增</el-button>
      </div>
    </el-dialog>
    <!-- 修改 -->
    <el-dialog title="修改" :visible.sync="updateDialog" :close-on-click-modal="false">
      <div class="cont_box_right">
        <el-form label-position="right" :rules="rules" label-width="80px" :model="formUpdate" ref='formUpdate'> 
          <el-form-item label="类型名称" size="small" prop="name">
            <el-input v-model="formUpdate.name"></el-input>
          </el-form-item>
          <el-form-item label="类型分类" size="small" prop="type">
            <el-select v-model="formUpdate.type" placeholder="请选择类型分类">
              <el-option label="报修类型" :value="1"></el-option>
              <el-option label="物业缴费类型" :value="2"></el-option>
              <el-option label="家庭事务类型" :value="3"></el-option>
            </el-select>      
          </el-form-item>
          <el-form-item label="服务类型" size="small" v-if="formUpdate.type==1">
            <el-select v-model="formUpdate.servicetype" placeholder="请选择服务类型">
              <el-option label="公区保修" :value="0"></el-option>
              <el-option label="室内保修" :value="1"></el-option>
              <el-option label="通用" :value="2"></el-option>
            </el-select>      
          </el-form-item>
          <!-- <el-form-item label="入库时间" size="small">
            <el-date-picker
              v-model="formUpdate.storeTime"
              type="datetime"
              value-format="timestamp"
              placeholder="入库时间">
            </el-date-picker>
          </el-form-item>  -->
        </el-form>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button size="medium " @click="updateDialog = false">取 消</el-button>
        <el-button size="medium " @click="updateList('formUpdate')">修 改</el-button>
      </div>
    </el-dialog>
    </section>
</template>

<script>
import paging from "../paging"
import { getPropertyTypeList,addPropertyTypeList,updatePropertyTypeList,deletePropertyTypeList,xqSelectList,orgTree } from '../../url/api';
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
        type:1
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
    getlist(){
      getPropertyTypeList(this.formSearch).then((res)=>{
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
      if(this.formPush.type == 1){
        if(!this.formPush.servicetype&&this.formPush.servicetype!=0){
          this.$message("请选择服务类型")
          return
        }
      }else{
        this.formPush.servicetype = null
      }
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
      if(this.formUpdate.type == 1){
        if(!this.formUpdate.servicetype&&this.formUpdate.servicetype!=0){
          this.$message("请选择服务类型")
          return
        }
      }else{
        this.formUpdate.servicetype = null
      }
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
        servicetype:item.servicetype,
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
            arrId.push(item.id)
            return item
          })
        }
      }
      this.$confirm('确认删除吗？')
      .then(_ => {
        deletePropertyTypeList(arrId).then((res)=>{
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

</style>
