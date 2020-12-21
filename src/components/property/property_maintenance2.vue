<template>  
  <section class="modlude">
    <el-form :inline="true" :model="formSearch" class="form_inline" label-width="90px">
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
      <el-form-item label="类型" size="small" prop="typeId">
        <el-select v-model="formSearch.typeId" placeholder="请选择类型">
          <el-option v-for="(item,index) in typeIds" :label="item.name" :value="item.id" :key="index"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="姓名" size="small">
        <el-input v-model="formSearch.name" placeholder="请输入姓名"></el-input>
      </el-form-item>
      <el-form-item label="性别" size="small">
        <el-select v-model="formSearch.sex" placeholder="请选择性别">
          <el-option label="男" :value="0"></el-option>
          <el-option label="女" :value="1"></el-option>
        </el-select>    
      </el-form-item>
      <el-form-item label="手机号码" size="small" prop="phone">
        <el-input v-model="formSearch.phone" placeholder="请输入手机号码"></el-input>
      </el-form-item>
      <el-form-item label="年龄" size="small">
        <el-input v-model="formSearch.age" placeholder="请输入年龄"></el-input>
      </el-form-item>
      <el-form-item label="公司" size="small">
        <el-input v-model="formSearch.company" placeholder="请输入公司"></el-input>
      </el-form-item>
      <el-form-item label="部门" size="small">
        <el-input v-model="formSearch.department" placeholder="请输入部门"></el-input>
      </el-form-item>
      <el-form-item label="身份证" size="small">
        <el-input v-model="formSearch.identity" placeholder="请输入身份证"></el-input>
      </el-form-item>
      <el-form-item label="录入时间" size="small">
        <el-date-picker
          v-model="formSearch.createTime"
          type="datetime"
          value-format="timestamp"
          placeholder="请选择录入时间">
        </el-date-picker>
      </el-form-item>
      <el-form-item>
        <el-button size="small" @click="getlist">查 询</el-button>
      </el-form-item>
    </el-form>
    <el-table :data="formData" style="width: 100%" stripe @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55"></el-table-column>
      <el-table-column prop="name" label="姓名"></el-table-column>
      <el-table-column prop="" label="性别">
        <template slot-scope="scope">
          {{scope.row.sex==1?"女":'男'}}
        </template>
      </el-table-column>
      <el-table-column prop="phone" label="手机号"></el-table-column>
      <el-table-column prop="company" label="公司"></el-table-column>
      <el-table-column prop="department" label="部门"></el-table-column>
      <el-table-column prop="address" label="地址"></el-table-column>
      <el-table-column prop="email" label="邮箱"></el-table-column>
      <el-table-column prop="remark" label="备注"></el-table-column>
      <el-table-column prop="cname" label="操作人员"></el-table-column>
      <el-table-column prop="" label="录入时间" width="150">
        <template slot-scope="scope">
          {{$root.getDateArray(scope.row.gmtCreate)[9]}}
        </template>
      </el-table-column>
      <!-- <el-table-column label="操作" fixed="right" width=250>
				<template slot-scope="scope">
					<el-button type="warning" size="small" @click="updateShowBox(scope.row)">修 改</el-button>
					<el-button type="danger" size="small" @click="deleInfor(scope.row.id)">删 除</el-button>
				</template>
			</el-table-column> -->
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
          <el-form-item label="姓名" size="small">
            <el-input v-model="formPush.name"></el-input>
          </el-form-item>
          <el-form-item label="手机号码" size="small" prop="phone">
            <el-input v-model="formPush.phone" placeholder="请输入已注册手机号"></el-input>
          </el-form-item>
          <el-form-item label="地址" size="small">
            <el-input v-model="formPush.address"></el-input>
          </el-form-item>
          <el-form-item label="年龄" size="small">
            <el-input v-model="formPush.age"></el-input>
          </el-form-item>
          <el-form-item label="公司" size="small">
            <el-input v-model="formPush.company"></el-input>
          </el-form-item>
          <el-form-item label="部门" size="small">
            <el-input v-model="formPush.department"></el-input>
          </el-form-item>
          <el-form-item label="邮箱" size="small">
            <el-input v-model="formPush.email"></el-input>
          </el-form-item>
          <el-form-item label="身份证" size="small">
            <el-input v-model="formPush.identity"></el-input>
          </el-form-item>
          <el-form-item label="备注" size="small">
            <el-input v-model="formPush.remark"></el-input>
          </el-form-item>
          <el-form-item label="性别" size="small">
            <el-radio v-model="formPush.sex" :label="0">男</el-radio>
            <el-radio v-model="formPush.sex" :label="1">女</el-radio>
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
          <el-form-item label="姓名" size="small">
            <el-input v-model="formUpdate.name"></el-input>
          </el-form-item>
          <el-form-item label="手机号码" size="small" prop="phone">
            <el-input v-model="formUpdate.phone" placeholder="请输入已注册手机号"></el-input>
          </el-form-item>
          <el-form-item label="地址" size="small">
            <el-input v-model="formUpdate.address"></el-input>
          </el-form-item>
          <el-form-item label="年龄" size="small">
            <el-input v-model="formUpdate.age"></el-input>
          </el-form-item>
          <el-form-item label="公司" size="small">
            <el-input v-model="formUpdate.company"></el-input>
          </el-form-item>
          <el-form-item label="部门" size="small">
            <el-input v-model="formUpdate.department"></el-input>
          </el-form-item>
          <el-form-item label="邮箱" size="small">
            <el-input v-model="formUpdate.email"></el-input>
          </el-form-item>
          <el-form-item label="身份证" size="small">
            <el-input v-model="formUpdate.identity"></el-input>
          </el-form-item>
          <el-form-item label="备注" size="small">
            <el-input v-model="formUpdate.remark"></el-input>
          </el-form-item>
          <el-form-item label="性别" size="small">
            <el-radio v-model="formUpdate.sex" :label="0">男</el-radio>
            <el-radio v-model="formUpdate.sex" :label="1">女</el-radio>
          </el-form-item>
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
import { getmaintenanceMan,addMaintenanceMan,updataModifyMaintenanceManById,delMaintenanceMan,xqSelectList,orgTree,pmtypePhone,getpropertytype } from '../../url/api';
export default {
  props:['typeId'],
  data(){
    return{
      typeIds:[],
      checkStrictly:false,
      bindRole:{},
      showmenuList:[],
      menuList:[],
      option1:[],
      xqTree:[],
      isAddorUpdate:1,//1添加、2修改
      formSearch:{
        typeId:'',
        roleType:1,
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
        roleType:1,
        sex:0
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
        phone:[{ required: true, message: '该项不能为空'}],
        roleType:[{ required: true, message: '该项不能为空',trigger: 'blur'}],
        xqId:[{ required: true, message: '该项不能为空',trigger: 'blur'}],
      },
      imageUrl:''
    }
  },
  methods:{
    getGetpropertytype(){//添加维修人员查询物业类型管理
      getpropertytype().then(res=>{
        console.log(res)
        if(res.data.code == 200){
          this.typeIds = res.data.data
        }
      })
    },
    getlist(){
      getmaintenanceMan(this.formSearch).then((res)=>{
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
      this.formSearch.typeId= this.typeId
      this.getlist()
      this.getGetpropertytype()
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
      
      this.$refs[addList].validate((valid) => {
        if (valid) {
          let params =  {
            phone:this.formPush.phone
          }
          pmtypePhone(params).then((ress)=>{
            console.log(ress)
            if(ress.data.code == 200){
              addMaintenanceMan(this.formPush).then((res)=>{
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
            }else{
              this.$message(ress.data.msg)
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
          let params =  {
            phone:this.formUpdate.phone
          }
          pmtypePhone(params).then((ress)=>{
            console.log(ress)
            if(ress.data.code == 200){
              if(this.formUpdate.gmtCreate){
                  delete this.formUpdate.gmtCreate
              }
              let params = this.formUpdate
              updataModifyMaintenanceManById(params).then((res)=>{
                console.log(res)
                if(res.data.code == 200){
                  this.getlist()
                  this.$message({
                    message: '修改成功',
                    type: 'success'
                  });
                  
                }else{
                  this.$message('修改失败:'+res.data.msg)
                }
              })
            }else{
              this.$message(ress.data.msg)
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
        address:item.address,
        name:item.name,
        phone:item.phone,
        age:item.age,
        company:item.company,
        department:item.department,
        email:item.email,
        id:item.id,
        identity:item.identity,
        remark:item.remark,
        roleType:item.roleType,
        sex:item.sex,
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
        let params = {
          ids:arrId,
          roleType:1
        }
        delMaintenanceMan(params).then((res)=>{
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
      this.$emit('pushSelect',val)
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
