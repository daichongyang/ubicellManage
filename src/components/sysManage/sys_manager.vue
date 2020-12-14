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
          <el-form-item label="账号" size="small" prop="account">
            <el-input v-model="formSearch.account" placeholder="请输入账号"></el-input>
          </el-form-item>
          <el-form-item label="邮箱" size="small">
            <el-input v-model="formSearch.email" placeholder="请输入邮箱"></el-input>
          </el-form-item>
          <el-form-item label="号码" size="small">
            <el-input v-model="formSearch.mobile" placeholder="请输入号码"></el-input>
          </el-form-item>
          <el-form-item label="密码" size="small">
            <el-input v-model="formSearch.password" placeholder="请输入密码"></el-input>
          </el-form-item>
          <el-form-item label="民族" size="small">
            <el-input v-model="formSearch.nation" placeholder="请输入民族"></el-input>
          </el-form-item>
      <el-form-item>
        <el-button size="medium " @click="getlist">查 询</el-button>
        <el-button size="medium " @click="addDialog = true,imageUrl = ''">新 增</el-button>
      </el-form-item>
    </el-form>
    <el-table :data="formData" style="width: 100%" stripe>
      <el-table-column prop="account" label="账号"></el-table-column>
      <el-table-column prop="name" label="名称"></el-table-column>
      <el-table-column prop="avatar" label="头像" width="100">
				<template slot-scope="scope">
          <el-image style="width: 70px; height: 70px" :src="scope.row.avatar" fit="cover"></el-image>
				</template>
      </el-table-column>
      <el-table-column prop="email" label="邮箱"></el-table-column>
      <el-table-column prop="mobile" label="号码"></el-table-column>
      <el-table-column label="性别">
				<template slot-scope="scope">
          {{scope.row.sex=='W'?"女":scope.row.sex=='M'?"男":'未知'}}
				</template>
      </el-table-column>
      <el-table-column prop="nation" label="民族"></el-table-column>
      <el-table-column prop="orgName" label="组织名称"></el-table-column>
      <el-table-column label="状态">
				<template slot-scope="scope">
          {{scope.row.status==1?"启用":'禁用'}}
				</template>
      </el-table-column>
      <el-table-column label="操作" fixed="right" width=250>
				<template slot-scope="scope">
					<el-button size="small" @click="showRole(scope.row)">角色绑定</el-button>
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
          <el-form-item label="账号" size="small" prop="account">
            <el-input v-model="formPush.account"></el-input>
          </el-form-item>
          <el-form-item label="头像" size="small">
            <el-upload
              ref="addUpdata"
              class="avatar-uploader"
              action="/intellmanagerV3.0/upload/file/upload"
              :show-file-list="false"
              :headers='headers'
              :on-change="onChange"
              :on-success="handleAvatarSuccess">
              <img v-if="imageUrl" :src="imageUrl" class="avatar">
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
          </el-form-item>
          <el-form-item label="邮箱" size="small"> 
            <el-input v-model="formPush.email"></el-input>
          </el-form-item>
          <el-form-item label="号码" size="small">
            <el-input v-model="formPush.mobile"></el-input>
          </el-form-item>
          <el-form-item label="密码" size="small" prop="password">
            <el-input v-model="formPush.password"></el-input>
          </el-form-item>
          <el-form-item label="民族" size="small">
            <el-input v-model="formPush.nation"></el-input>
          </el-form-item>
          <el-form-item label="所属组织" size="small" prop="orgId">
            <el-cascader
                ref="cascader"
                v-model="option1"
                :options="dataTree"
                :props="defaultProps2"
                @change="handleChange1"
                clearable
              >
              </el-cascader>
          </el-form-item> 
          <el-form-item label="性别" size="small" prop="sex">
            <el-radio v-model="formPush.sex" :label="'W'">女</el-radio>
            <el-radio v-model="formPush.sex" :label="'M'">男</el-radio>
            <el-radio v-model="formPush.sex" :label="'N'">未知</el-radio>
          </el-form-item>
          <el-form-item label="是否启用" size="small" prop="status">
            <el-radio v-model="formPush.status" :label="true">启用</el-radio>
            <el-radio v-model="formPush.status" :label="false">禁用</el-radio>
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
          <el-form-item label="头像" size="small">
            <el-upload
              ref="uupdata"
              class="avatar-uploader"
              action="/intellmanagerV3.0/upload/file/upload"
              :show-file-list="false"
              :headers='headers'
              :on-change="onChange"
              :on-success="handleAvatarSuccess1">
              <img v-if="imageUrl" :src="imageUrl" class="avatar">
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
          </el-form-item>
          <el-form-item label="名称" size="small">
            <el-input v-model="formUpdate.name"></el-input>
          </el-form-item>
          <el-form-item label="邮箱" size="small">
            <el-input v-model="formUpdate.email"></el-input>
          </el-form-item>
          <el-form-item label="号码" size="small">
            <el-input v-model="formUpdate.mobile"></el-input>
          </el-form-item>
          <el-form-item label="民族" size="small">
            <el-input v-model="formUpdate.nation"></el-input>
          </el-form-item> 
          <el-form-item label="性别" size="small" prop="sex">
            <el-radio v-model="formUpdate.sex" label="W">女</el-radio>
            <el-radio v-model="formUpdate.sex" label="M">男</el-radio>
            <el-radio v-model="formUpdate.sex" label="N">未知</el-radio>
          </el-form-item>
          <el-form-item label="是否启用" size="small" prop="status">
            <el-radio v-model="formUpdate.status" :label="true">启用</el-radio>
            <el-radio v-model="formUpdate.status" :label="false">禁用</el-radio>
          </el-form-item>
        </el-form>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button size="medium " @click="updateDialog = false">取 消</el-button>
        <el-button size="medium " @click="updateList('formUpdate')">修 改</el-button>
      </div>
    </el-dialog>
    <!-- 角色绑定 -->
    <el-dialog title="角色绑定" :visible.sync="dialog">
      <div class="cont_box_right">
        <el-form label-position="right" label-width="90px" :model="bindRole" ref='bindRole'>
          <el-form-item label="角色" size="small">
            <el-tree
              :data="menuList"
              :props='defaultProps'
              :check-strictly="checkStrictly"
              show-checkbox
              :default-expanded-keys="showmenuList"
              :default-checked-keys="showmenuList"
              @check="handleCheckChange"
              node-key="id"
              ref="rightsTree"
            >
            </el-tree>
          </el-form-item>
        </el-form>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button size="medium " @click="dialog = false">取 消</el-button>
        <el-button size="medium " @click="bindroleManage()">绑 定</el-button>
      </div>
    </el-dialog>
    </section>
</template>

<script>
import paging from "../paging"
import { authManagerList,authAddManager,authUpdateManager,authDeleteManager,xqSelectList,orgTree,managerrole,bindmanagerrole,roletreeList } from '../../url/api';
export default {
  data(){
    return{
      headers:{
        Authorization:sessionStorage.getItem('Authorization'),
        token:sessionStorage.getItem('token')
      },
      checkStrictly:false,//控制子集和父级的关系
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
      formUpdate:{

      },//修改表单
      total: 0,//数据总数
      pages:0,//页面总数
      addDialog:false,
      updateDialog:false,
      dialog:false,
      formPush:{
        sex:"M",
        status:true,
        orgId:[]
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
        account:[{ required: true, message: '该项不能为空'}],
        password:[{ required: true, message: '该项不能为空'}],
        orgId:[{ required: true, message: '该项不能为空'}],
        sex:[{ required: true, message: '该项不能为空',trigger: 'change'}],
        status:[{ required: true, message: '该项不能为空',trigger: 'change'}],
      },
      imageUrl:''
    }
  },
  methods:{
    getlist(){
      authManagerList(this.formSearch).then((res)=>{
        console.log(res)
        if(res.data.code == 200){
          this.formData = res.data.data.records.filter((item)=>{
            if(item.gmtCreate){
              item.gmtCreate = this.$root.getDateArray(item.gmtCreate)[9]
            }
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
    updataImg(type){//感觉type区分是添加还是修改图片
     
      if(this.imageUrl){
         
        if(type == 1){
          this.$nextTick(function () {
          　　this.$refs.addUpdata.submit();
          })
        }else{
          this.$nextTick(function () {
          　　this.$refs.uupdata.submit();
          })
        }
      }else{
        this.$message("请选择图片")
      }
    },
    addList(addList){//添加树状图node节点
      this.$refs[addList].validate((valid) => {
        if (valid) {
          authAddManager(this.formPush).then((res)=>{
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
          let params = {
            avatar:this.formUpdate.avatar,
            email:this.formUpdate.email,
            id:this.formUpdate.id,
            mobile:this.formUpdate.mobile,
            name:this.formUpdate.name,
            nation:this.formUpdate.nation,
            sex:this.formUpdate.sex,
            status:this.formUpdate.status
          }
          authUpdateManager(params).then((res)=>{
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
      this.formUpdate = JSON.parse(JSON.stringify(item));
      this.updateDialog = true
      this.imageUrl = item.avatar

      console.log(this.formUpdate)
    },
    deleInfor(id){
      let params = [id]
      this.$confirm('确认删除吗？')
      .then(_ => {
        authDeleteManager(params).then((res)=>{
          console.log(res)
          if(res.data.code == 200){
            this.$message('删除成功');
            this.getlist()
          }else{
            this.$message(res.data.msg);
          }
        })
      })
      .catch(_ => {});

    },
    bindroleManage(){
      
      bindmanagerrole(this.bindRole).then((res)=>{
        console.log(res)
        if(res.data.code == 200){
          this.$message('绑定成功');
        }else{
          this.$message(res.data.msg);
        }
        this.dialog = false
      })
    },
    showRole(obj){//角色绑定
      this.dialog = true
      this.checkStrictly = true
      this.bindRole.managerId = obj.id
      roletreeList(obj.id).then((res)=>{//权限选择列表
        console.log(res)
        if(res.data.code == 200){
          this.menuList = res.data.data
          managerrole(obj.id).then((ress)=>{
            console.log(ress)
            if(ress.data.code == 200){
              this.showmenuList = ress.data.data
              this.bindRole.roleIds = ress.data.data
              this.$nextTick(() => {
                this.$refs.rightsTree.setCheckedKeys(this.showmenuList);
                this.checkStrictly = false
              });

              }
          })
        }
      })
    },
    handleAvatarSuccess(res, file) {//添加头像上传成功
      console.log(res, file)
      this.imageUrl = URL.createObjectURL(file.raw);
      if(res.code == 200){
        this.formPush.avatar = res.data[0]
      }
    },
    handleAvatarSuccess1(res, file) {//修改头像上传成功
      console.log(res, file)
      this.imageUrl = URL.createObjectURL(file.raw);
      if(res.code == 200){
        this.formUpdate.avatar = res.data[0]
      }
    },
    onChange(file, fileList){
      console.log(file, fileList)
      this.imageUrl = URL.createObjectURL(file.raw);
    },
    handleCheckChange(checkedNodes, obj ) {//树状图选中
      console.log(obj);
      this.bindRole.roleIds = []
      obj.checkedNodes.forEach((item)=>{
        if(!item.data){
          this.bindRole.roleIds.push(item.id)
        }
      })
      // this.bindRole.roleIds = this.$refs.rightsTree.getCheckedKeys()
      // this.bindRole.roleIds = this.$refs.rightsTree.getCheckedKeys().concat(this.$refs.rightsTree.getHalfCheckedKeys())
      console.log(this.bindRole.roleIds);
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
  .avatar-uploader-icon{
    line-height: 178px !important;
  }
</style>
