<template>
  <section class="modlude">
     <el-form :inline="true" :model="formSearch" class="form_inline" label-width="80px">
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
      <el-form-item label="房间名称" size="small">
        <el-input v-model="formSearch.houseName" placeholder="请输入房间名称"></el-input>
      </el-form-item>
      <el-form-item label="身份证" size="small">
        <el-input v-model="formSearch.idNumber" placeholder="请输入身份证"></el-input>
      </el-form-item>
      <el-form-item label="姓名" size="small">
        <el-input v-model="formSearch.name" placeholder="请输入姓名"></el-input>
      </el-form-item>
      <el-form-item label="选择小区" size="small" prop="xqId">
        <el-select v-model="formSearch.xqId" placeholder="请选择小区"  @change="formSearch1.xqId=formSearch.xqId">
          <el-option v-for="item in xqTree" :label="item.name" :value="item.id" :key="item.id"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="昵称" size="small">
        <el-input v-model="formSearch.nickName" placeholder="请输入昵称"></el-input>
      </el-form-item>
      <el-form-item label="手机号" size="small">
        <el-input v-model="formSearch.phone" placeholder="请输入手机号"></el-input>
      </el-form-item>
      <el-form-item label="区域名称" size="small">
        <el-input v-model="formSearch.sectionName" placeholder="请输入区域名称"></el-input>
      </el-form-item>
      <el-form-item v-if="$root.btnControl.find(item=>item=='view')">
        <el-button size="small" @click="getlist">查 询</el-button>
      </el-form-item>
      <el-form-item v-if="$root.btnControl.find(item=>item=='add')">
        <el-button size="small" @click="addDialog=true">添 加</el-button>
      </el-form-item>
      <el-form-item v-if="$root.btnControl.find(item=>item=='delete')">
        <el-button size="small" type="danger" @click="deleInfor(false)">批量删除</el-button>
      </el-form-item>
      <el-form-item v-if="$root.btnControl.find(item=>item=='delete')">
        <el-button size="small" type="danger" @click="deleInfor1(false)">删除主管和成员</el-button>
      </el-form-item>
    </el-form>
    <el-table :data="formData" style="width: 100%" stripe @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55"></el-table-column>
      <el-table-column prop="name" label="主管名称"></el-table-column>
      <el-table-column prop="nickName" label="昵称"></el-table-column>
      <!-- <el-table-column prop="ubicellJyh" label="家园号" ></el-table-column> -->
      <el-table-column prop="phone"label="手机号"></el-table-column>
      <el-table-column prop="sectionName"label="区域"></el-table-column>
      <el-table-column prop="xqName"label="小区名称"></el-table-column>
      <el-table-column prop="houseName"label="房间"></el-table-column>
      <el-table-column label="添加成员权限">
        <template slot-scope="scope">
          {{scope.row.addUser==1?"是":"否"}}
				</template>
      </el-table-column>
      <el-table-column label="接听对讲权限">
        <template slot-scope="scope">
          {{scope.row.getCall==1?"是":"否"}}
				</template>
      </el-table-column>
      <el-table-column prop="gmtCreate"label="录入时间"></el-table-column>
      <el-table-column label="操作" fixed="right" width=250>
				<template slot-scope="scope">
					<el-button type="warning" size="small" @click="updateShowBox(scope.row)" v-if="$root.btnControl.find(item=>item=='edit')">修 改</el-button>
					<el-button type="danger" size="small" @click="deleInfor(scope.row.id)" v-if="$root.btnControl.find(item=>item=='delete')">删 除</el-button>
				</template>
			</el-table-column>
    </el-table>
    <paging @changePage = handleCurrentPage :get-total='total'></paging>

    <!-- 添加 -->
        <el-dialog title="新增" :visible.sync="addDialog" :close-on-click-modal="false">
      <div class="cont_box_left">
        <el-form label-position="right" label-width="100px" :model="formPush" :rules="rules"  ref='addList'>
          <el-form-item label="姓名" prop="name">
            <el-input v-model="formPush.name"></el-input>
          </el-form-item>
          <el-form-item label="手机号码" prop="phone">
            <el-input v-model="formPush.phone" @blur="confirmPhone(formPush.phone)"></el-input>
          </el-form-item>
          <el-form-item label="身份证">
            <el-input v-model="formPush.idNumber"></el-input>
          </el-form-item>
          <!-- <el-form-item label="家园号">
            <el-input v-model="formPush.ubicellJyh"></el-input>
          </el-form-item> -->
          <el-form-item label="住址">
            <el-input v-model="formPush.address"></el-input>
          </el-form-item>
          <el-form-item label="邮箱">
            <el-input v-model="formPush.email"></el-input>
          </el-form-item>
          <el-form-item label="年龄">
            <el-input v-model="formPush.age"></el-input>
          </el-form-item>
          <!-- <el-form-item label="选择小区" size="small" prop="xqId">
            <el-select v-model="formPush.xqId" placeholder="请选择小区"  @change="formSearch.xqId=formSearch1.xqId">
              <el-option v-for="item in xqTree" :label="item.name" :value="item.id" :key="item.id"></el-option>
            </el-select>
          </el-form-item> -->
          <el-form-item label="性别">
            <el-radio v-model="formPush.sex" :label="1">男</el-radio>
            <el-radio v-model="formPush.sex" :label="2">女</el-radio>
            <el-radio v-model="formPush.sex" :label="3">未知</el-radio>
          </el-form-item>
          <el-form-item label="添加成员权限">
            <el-radio v-model="formPush.addUser" :label="0">没有</el-radio>
            <el-radio v-model="formPush.addUser" :label="1">有</el-radio>
          </el-form-item>
          <el-form-item label="接听对讲权限">
            <el-radio v-model="formPush.getCall" :label="0">没有</el-radio>
            <el-radio v-model="formPush.getCall" :label="1">有</el-radio>
          </el-form-item>
            <el-form-item>
              <el-form :inline="true" :model="formSearch1" class="form_inline">
                <el-form-item label="所属组织" size="small" prop="orgId">
                <el-cascader
                    ref="cascader1"
                    v-model="option1"
                    :options="dataTree"
                    :props="defaultProps2"
                    @change="zuzhiChange1"
                    clearable
                  >
                  </el-cascader>
                </el-form-item>
                <el-form-item label="选择小区" size="small">
                  <el-select v-model="formSearch1.xqId" placeholder="请选择小区"  @change="formSearch.xqId=formSearch1.xqId">
                    <el-option v-for="item in xqTree" :label="item.name" :value="item.id" :key="item.id"></el-option>
                  </el-select>
                </el-form-item>
                <el-form-item label="房间类型" size="small">
                  <el-select v-model="formSearch1.type" placeholder="请选择房间类型">
                    <el-option label="物业中心" :value="1"></el-option>
                    <el-option label="业主房间" :value="2"></el-option>
                  </el-select>
                </el-form-item>
                <el-form-item>
                  <el-button size="small" @click="gethouseLIst">查 询</el-button>
                </el-form-item>
              </el-form>
            <el-table :data="formData1" style="width: 100%">
              <el-table-column width="25">
                <template slot-scope="scope">
                  <el-radio @change='isGetFather = true,formPush.xqId = scope.row.xqId' v-model="formPush.houseId" :label="scope.row.id" style="color:transparent;"></el-radio>
                </template>
              </el-table-column>
              <el-table-column prop="name" label="房间名称"></el-table-column>
              <el-table-column prop="houseNum" label="房间号" ></el-table-column>
              <el-table-column prop="sectionName"label="区域名称"></el-table-column>
            </el-table>
            <div class="pagination">
              <el-pagination
                layout="prev, pager, next"
                prev-text="上一页"
                next-text="下一页"
                @current-change="handleCurrentPage1"
                :page-size="10" 
                :total="total1">
              </el-pagination>
            </div>
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
      <div class="cont_box_left">
        <el-form label-position="right" label-width="100px" :rules="rules" :model="formUpdate" ref='formUpdate'>
          <el-form-item label="姓名" prop="name">
            <el-input v-model="formUpdate.name"></el-input>
          </el-form-item>
          <el-form-item label="身份证">
            <el-input v-model="formUpdate.idNumber"></el-input>
          </el-form-item>
          <el-form-item label="住址">
            <el-input v-model="formUpdate.address"></el-input>
          </el-form-item>
          <el-form-item label="邮箱">
            <el-input v-model="formUpdate.email"></el-input>
          </el-form-item>
          <el-form-item label="年龄">
            <el-input v-model="formUpdate.age"></el-input>
          </el-form-item>
          <el-form-item label="添加成员权限" prop="addUser">
            <el-radio v-model="formUpdate.addUser" :label="0">没有</el-radio>
            <el-radio v-model="formUpdate.addUser" :label="1">有</el-radio>
          </el-form-item>
          <el-form-item label="接听对讲权限" prop="getCall">
            <el-radio v-model="formUpdate.getCall" :label="0">没有</el-radio>
            <el-radio v-model="formUpdate.getCall" :label="1">有</el-radio>
          </el-form-item>
            <el-form-item>
              <el-form :inline="true" :model="formSearch1" class="form_inline" :rules="rules">
                <el-form-item label="所属组织" size="small" prop="orgId">
                <el-cascader
                    ref="cascader1"
                    v-model="option1"
                    :options="dataTree"
                    :props="defaultProps2"
                    @change="zuzhiChange1"
                    clearable
                  >
                  </el-cascader>
                </el-form-item>
                <el-form-item label="选择小区" size="small">
                  <el-select v-model="formSearch1.xqId" placeholder="请选择小区"  @change="formSearch.xqId=formSearch1.xqId" :disabled="!formSearch1.orgId">
                    <el-option v-for="item in xqTree" :label="item.name" :value="item.id" :key="item.id"></el-option>
                  </el-select>
                </el-form-item>

                <el-form-item>
                  <el-button size="small" @click="gethouseLIst">查 询</el-button>
                </el-form-item>
              </el-form>
            <el-table :data="formData1" style="width: 100%">
              <el-table-column width="25">
                <template slot-scope="scope">
                  <el-radio @change='isGetFather = true' v-model="formUpdate.houseId" :label="scope.row.id" style="color:transparent;"></el-radio>
                </template>
              </el-table-column>
              <el-table-column prop="name" label="房间名称"></el-table-column>
              <el-table-column prop="houseNum" label="房间号" ></el-table-column>
              <el-table-column prop="sectionName"label="区域名称"></el-table-column>
            </el-table>
            <div class="pagination">
              <el-pagination
                layout="prev, pager, next"
                prev-text="上一页"
                next-text="下一页"
                @current-change="handleCurrentPage1"
                :page-size="10" 
                :page-count="total1">
              </el-pagination>
            </div>
          </el-form-item>
        </el-form>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button size="medium" @click="updateDialog = false">取 消</el-button>
        <el-button size="medium" @click="updateList">确定</el-button>
      </div>
    </el-dialog>
  </section>  
</template>

<script>
import paging from '../paging'
import { userhouselist,adduserhouselist,updateuserhouselist,deleteuserhouselist,orgTree,xqSelectList,houseList,userdeleteAll,confirmPhone } from '../../url/api';
export default {
  data(){
    return{
      option1:[],
      deleBatch:[],
      isGetFather:false,//是否选中
      formSearch:{//查询条件
        houseType:1,//房间类型 1管家房间 2业主房间
        userType:1,//1是只查业主/查全部成员不传
        current:1,
        xqId:'',
        size: 10
      },
      formSearch1:{
        type:1,
        current:1,
        size: 10
      },
      formPush:{
        name:'',
        idNumber:'',
        address:'',
        email:'',
        age:'',
        userType:1,
        sex:1,
        addUser:1,
        getCall:1,
      },//表单提交
      formData: [],//数据
      formData1: [],//数据
      formUpdate:{},//修改表单
      total: 0,//数据总数
      total1: 0,//数据总数
      pages:0,//页面总数
      addDialog:false,
      updateDialog:false,
      dataTree:[],
      defaultProps: {//树状图key定义
        children: 'children',
        label: 'name'
      },
      defaultProps2: {
        children: 'children',
        label: 'name',
        value: 'id',
        expandTrigger: 'hover',checkStrictly: true
      },
      xqTree:[],//小区列表
      rules: {
        phone:[{ required: true, message: '该项不能为空'}],
        name:[{ required: true, message: '该项不能为空'}],
        ubicellJyh:[{ required: true, message: '该项不能为空'}],
        addUser:[{ required: true, message: '该项不能为空',trigger: 'change'}],
        getCall:[{ required: true, message: '该项不能为空',trigger: 'change'}],
        xqId:[{ required: true, message: '该项不能为空',trigger: 'change'}],
        houseId:[{ required: true, message: '该项不能为空',trigger: 'change'}],
      },
    }
  },
  methods:{
    confirmPhone(phone){
      let params ={
        phone:phone,
        xqId:this.formSearch.xqId
      }
      console.log(phone)
      confirmPhone(params).then(res=>{
        console.log(res)
        if(res.data.code == 200){
          if(res.data.data){
            for(let ii in res.data.data){
              this.formPush[ii] = res.data.data[ii]
              console.log(res.data.data[ii])
            }
          }
          
        }
      })
    },
    gethouseLIst(){
      houseList(this.formSearch1).then((res)=>{//房间列表
        console.log(res)
        if(res.data.code == 200){
          this.formData1 = res.data.data.records.filter((item)=>{
            if(item.gmtModified){
              item.gmtModified = this.$root.getDateArray(item.gmtModified)[9]
            }
            return item
          })
          this.total1 = res.data.data.total
          this.pages = res.data.pages
        }else{
          this.$message(res.data.msg);
        }
      })
    },
    handleCurrentPage1(val){//页码房间列表
      this.formSearch1.current=val
      this.gethouseLIst()
    },
    getlist(){
      userhouselist(this.formSearch).then((res)=>{//查询房间业主/成员分页列表
        console.log(res)
        if(res.data.code == 200){
          this.formData = res.data.data.records.filter((item)=>{
            if(item.gmtCreate){
              item.gmtCreate = this.$root.getDateArray(item.gmtCreate)[9]
            }
            return item
          })
          this.total = res.data.data.total
          this.pages = res.data.pages
        }else{
          this.$message(res.data.msg);
        }
      })
    },
    getInit(){//初始化列表
      
      this.gethouseLIst()
      let org_tree={
            name:'',
            status:1
          }
      orgTree(org_tree).then((res)=>{//组织列表
        console.log(res)
        if(res.data.code == 200){
          this.dataTree = res.data.data
        }
      })
      let org_tree1={}
      xqSelectList(org_tree1).then((res)=>{//小区选择列表
        console.log(res)
        if(res.data.code == 200){
          this.xqTree = res.data.data
          if(this.xqTree.length!=0){
            this.formSearch.xqId = this.xqTree[0].id
            this.getlist()
          }
        }
      })
    },
    addList(addList){//添加
    if(!this.formPush.houseId){
        this.$message("请选择房间")
        return
      }
      this.$refs[addList].validate((valid) => {
        if (valid) {
          adduserhouselist(this.formPush).then((res)=>{
            console.log(res)
            if(res.data.code == 200){
              this.$message({
                message: '添加成功',
                type: 'success'
              });
              this.getlist()
            }else{
              this.$message('添加失败')
            }
          })
          this.addDialog = false
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
    updateList(){//修改
    console.log(this.formUpdate)
      if(!this.formUpdate.houseId){
        this.$message("请选择房间")
        return
      }
      updateuserhouselist(this.formUpdate).then((res)=>{
        console.log(res)
        if(res.data.code == 200){
          this.$message({
            message: '修改成功',
            type: 'warning'
          });
          this.getlist()
        }
      })
      this.updateDialog = false
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
        deleteuserhouselist(arrId).then((res)=>{
          console.log(res)
          if(res.data.code == 200){
            this.$message('删除成功');
            this.getlist()
          }
        })
      })
      .catch(_ => {});
    },
    deleInfor1(ids){//删除
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
      this.$confirm('确认删除主管和成员吗？')
      .then(_ => {
        userdeleteAll(arrId).then((res)=>{
          console.log(res)
          if(res.data.code == 200){
            this.$message('删除成功');
            this.getlist()
          }
        })
      })
      .catch(_ => {});
    },
    handleSelectionChange(val) {//多选
      this.deleBatch = val
      console.log(this.deleBatch)
    },
    handleCurrentPage(val){//页码改变
      this.formSearch.current=val
      this.getlist()
    },
    checkTreeInfor(data,ev) {//监听树状图勾选
      // console.log(ev);
      if(ev.checkedKeys.length>1){
        this.$message('只能选择一个组织');
      }else{
        this.formPush.orgId = ev.checkedKeys[0]
        this.formUpdate.orgId = ev.checkedKeys[0]
      }
    },
    updateShowBox(item){//修改东西弹窗
      this.formUpdate = {
        addUser:item.addUser,
        address:item.address,
        houseId:item.houseId,
        getCall:item.getCall,
        email:item.email,
        age:item.age,
        name:item.name,
        idNumber:item.idNumber,
        id:item.id
      }
      this.updateDialog = true
      console.log(this.formUpdate)
    },
    zuzhiChange1(value){//改变组织
      if(value.length!=0){
        console.log(value)
        this.formSearch1.orgId=this.$refs.cascader1.getCheckedNodes()[0].data.id
        this.formSearch.orgId=this.$refs.cascader1.getCheckedNodes()[0].data.id
      }else{
        this.formSearch.orgId = ''
        this.formSearch1.orgId = ''
      }
      this.gethouseLIst(this.formSearch1)
    },    
    handleChange(value){
      if(value.length!=0){
        console.log(value)
        this.formSearch1.orgId=this.$refs.cascader.getCheckedNodes()[0].data.id
        this.formSearch.orgId=this.$refs.cascader.getCheckedNodes()[0].data.id
      }else{
        this.formSearch.orgId = ''
        this.formSearch1.orgId = ''
      }
      userhouselist(this.formSearch).then((res)=>{
        console.log(res)
        if(res.data.code == 200){
          this.formData = res.data.data.records.filter((item)=>{
            if(item.gmtCreate){
              item.gmtCreate = this.$root.getDateArray(item.gmtCreate)[9]
            }
            return item
          })
          this.total = res.data.data.total
          this.pages = res.data.pages
        }else{
          this.$message(res.data.msg);
        }
      })
    }
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