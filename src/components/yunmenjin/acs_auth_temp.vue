<template>  
  <section class="modlude acsAuthTemp">
    <el-form :model="formPush" class="form_inline" label-width="80px" :rules="rules">
      <!-- <el-form-item label="所属组织" size="small">
        <el-cascader
            ref="cascader"
            v-model="option1"
            :options="dataTree"
            :props="defaultProps2"
            @change="handleChange"
            clearable
          >
          </el-cascader>
      </el-form-item>  -->
          <el-form-item label="选择小区" size="small" prop="xqId">
            <el-select v-model="formPush.xqId" placeholder="请选择小区">
              <el-option v-for="item in xqTree" :label="item.name" :value="item.id" :key="item.id"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="姓名" size="small" prop="account">
            <el-input v-model="formPush.name" placeholder="请输入姓名"></el-input>
          </el-form-item>
          <el-form-item label="手机号" size="small" prop="phone">
            <el-input v-model="formPush.phone" placeholder="请输入手机号"></el-input>
          </el-form-item>
          <el-form-item label="身份证号" size="small">
            <el-input v-model="formPush.idNumber" placeholder="请输入身份证号"></el-input>
          </el-form-item>
          <el-form-item label="年龄" size="small">
            <el-input v-model="formPush.age" placeholder="请输入年龄"></el-input>
          </el-form-item>
          <el-form-item label="性别" size="small">
            <el-radio v-model="formPush.sex" :label="1">男</el-radio>
            <el-radio v-model="formPush.sex" :label="2">女</el-radio>
          </el-form-item>
          <el-form-item label="开始时间" size="small" prop="startTime">
            <el-date-picker
              v-model="formPush.startTime"
              type="datetime"
              value-format="timestamp"
              placeholder="开始时间">
            </el-date-picker>
          </el-form-item>
          <el-form-item label="结束时间" size="small" prop="endTime">
            <el-date-picker
              v-model="formPush.endTime"
              type="datetime"
              value-format="timestamp"
              placeholder="结束时间">
            </el-date-picker>
          </el-form-item>
          <el-form-item label="公司" size="small">
            <el-input v-model="formPush.company" placeholder="请输入公司"></el-input>
          </el-form-item>
          <el-form-item label="楼层" size="small" prop="floor">
            <el-input v-model.number="formPush.floor" placeholder="请输入楼层"></el-input>
          </el-form-item>
          <el-form-item label="部门" size="small">
            <el-input v-model="formPush.department" placeholder="请输入部门"></el-input>
          </el-form-item>
          <el-form-item label="邮箱" size="small">
            <el-input v-model="formPush.email" placeholder="请输入邮箱"></el-input>
          </el-form-item>
          <el-form-item label="家庭住址" size="small">
            <el-input v-model="formPush.address" placeholder="请输入家庭住址"></el-input>
          </el-form-item>
          <el-form-item label="事由" size="small">
            <el-input v-model="formPush.remark" placeholder="请输入事由"></el-input>
          </el-form-item>
          <el-form-item label="使用次数" size="small">
            <el-input v-model="formPush.sumCount" placeholder="请输入使用次数"></el-input>
            <span>次数范围1~100(0表示不限制次数)</span>
          </el-form-item>
          <el-form-item label="门禁设备" prop="devList">
          <el-input
            :disabled="true"
            style="width:250px;"
            type="textarea"
            :autosize="{ minRows: 2, maxRows: 4}"
            placeholder=""
            v-model="devListt">
          </el-input>
            <el-button size="small" @click="nextt">选 择</el-button>
          </el-form-item>
      <el-form-item>
        <el-button size="medium " @click="temporary">授 权</el-button>
      </el-form-item>
    </el-form>

    <!-- 添加 -->
    <el-dialog title="临时二维码授权" :visible.sync="addDialog" :close-on-click-modal="false">
      <div class="cont_box_right shouquan">
        <div>授权时间：{{shouquan.operationTime}}</div>
        <div>有效期：{{shouquan.duration}}</div>
        <div style="margin:10px 0;text-align:center;">
          <div class="qrcode" ref="qrCodeUrl"></div>
        </div>
        <div>权限：{{shouquan.devList}}</div>

      </div>
      <div slot="footer" class="dialog-footer">
        <el-button size="medium " @click="addDialog = false">关 闭</el-button>
        <!-- <el-button size="medium " @click="updataImg(1)">新 增</el-button> -->
      </div>
    </el-dialog>
    <!-- 选择设备 -->
    <el-dialog title="选择设备" :visible.sync="updateDialog" :close-on-click-modal="false">
      <div class="cont_box_right">
        <acsdev @selected="selected" :xq-id='xqId' :push-select="pushSelect" :huixian-select="devList"></acsdev>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button size="medium" @click="pushSelect = 1,updateDialog = false">确 定</el-button>
        <el-button size="medium" @click="updateDialog = false">取 消</el-button>
      </div>
    </el-dialog>
    </section>
</template>

<script>
import paging from "../paging"
import QRCode from 'qrcodejs2'
import acsdev from "./acs_dev1"
import { temporaryPasscard,authManagerList,authAddManager,authUpdateManager,authDeleteManager,xqSelectList,orgTree,managerrole,bindmanagerrole,roletreeList } from '../../url/api';
export default {
  data(){
    var checkAge = (rule, value, callback) => {
      setTimeout(() => {
        if (!Number.isInteger(value)) {
          callback(new Error('请输入数字值'));
        } 
      }, 500);
    };
    return{
      headers:{
        Authorization:sessionStorage.getItem('Authorization'),
        token:sessionStorage.getItem('token')
      },
      devListt:'',
      xqId:'',
      devList:[],
      pushSelect:0,//控制是否提交勾选的东西
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
      formUpdate:{},//修改表单
      total: 0,//数据总数
      pages:0,//页面总数
      addDialog:false,
      updateDialog:false,
      dialog:false,
      formPush:{
        sumCount:0,
        floor:'',
        sex:1,
        type:2,
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
      shouquan:{},
      rules: {
        devList:[{ type: 'array',required: true, message: '该项不能为空',trigger: 'change'}],
        phone:[{ required: true, message: '该项不能为空'}],
        xqId:[{ required: true, message: '该项不能为空',trigger: 'blur'}],
        startTime:[{ required: true, message: '该项不能为空',trigger: 'blur'}],
        endTime:[{ required: true, message: '该项不能为空',trigger: 'blur'}],
        status:[{ required: true, message: '该项不能为空',trigger: 'change'}],
        floor:[
            { validator: checkAge, trigger: 'blur' }
          ]
      },
      imageUrl:''
    }
  },
  methods:{
    creatQrCode(pass) {
        var qrcode = new QRCode(this.$refs.qrCodeUrl, {
            text: pass, // 需要转换为二维码的内容
            width: 200,
            height: 200,
            colorDark: '#000000',
            colorLight: '#ffffff',
            correctLevel: QRCode.CorrectLevel.H
        })
    },
    temporary(){//授权
      temporaryPasscard(this.formPush).then((res)=>{
        console.log(res)
        if(res.data.code == 200){
          this.$message({
            message: '授权成功',
            type: 'success'
          });
          this.shouquan = res.data.data
          this.addDialog = true
          setTimeout(()=>{
            this.creatQrCode(this.shouquan.pass);
          },1000)
          
        }else{
          this.$message('授权失败:'+res.data.msg)
        }
      })
    },
    nextt(){
      this.updateDialog =true
      this.$nextTick(()=>{
        this.xqId = this.formPush.xqId
        this.devList =this.formPush.devList
        console.log(this.formPush.devList)
      })
    },
    selected(arrobj){//选中的设备
      this.pushSelect = 0
      if(arrobj.length!=0){
        this.devListt = ''
        this.formPush.devList = []
        arrobj = arrobj.filter((item)=>{
          let obj ={
            devSn:item.devSn||'',
            devType:item.devType||'',
            doorkeySign:item.doorkeySign||'',
            id:item.id||'',
            name:item.name||'',
            ncuSn:item.ncuSn||'',
            viceDevice:item.viceDevice||'',
          }
          this.formPush.devList.push(obj)
          this.devListt =this.devListt + item.name + "，"
          return item
        })
        this.devListt = this.devListt.substring(0,this.devListt.length-1)
      }


      console.log(arrobj)
      this.updateDialog =false
    },
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
          this.formPush.xqId = this.xqTree[0].id||''
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
          authAddManager(this.formPush).then((res)=>{
            console.log(res)
            if(res.data.code == 200){
              this.getInit()
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
              this.getInit()
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
            this.getInit()
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
    showRole(obj){
      this.dialog = true
      this.checkStrictly = true
      this.bindRole.managerId = obj.id
      managerrole(obj.id).then((res)=>{
        console.log(res)
        if(res.data.code == 200){
          this.showmenuList = res.data.data
          this.$nextTick(() => {
            this.$refs.rightsTree.setCheckedKeys(this.showmenuList);
            this.checkStrictly = false
          });

          }
      })
    },
    updataImg(type){//感觉type区分是添加还是修改图片
      if(type == 1){
        this.$nextTick(function () {
        　　this.$refs.addUpdata.submit();
        })
      }else{
        this.$nextTick(function () {
        　　this.$refs.Updata.submit();
        })
      }

    },
    handleAvatarSuccess(res, file) {//添加头像上传成功
      console.log(res, file)
      this.imageUrl = URL.createObjectURL(file.raw);
      if(res.code == 200){
        this.formPush.avatar = res.data[0]
        this.addList('addList')
      }
    },
    onChange(file, fileList){
      console.log(file, fileList)
      this.imageUrl = URL.createObjectURL(file.raw);
    },
    handleCheckChange(checkedNodes, obj ) {//树状图选中
      console.log(obj);
      this.bindRole.roleIds = this.$refs.rightsTree.getCheckedKeys().concat(this.$refs.rightsTree.getHalfCheckedKeys())
      console.log(this.$refs.rightsTree.getCheckedKeys().concat(this.$refs.rightsTree.getHalfCheckedKeys()),"dfdff");
    },
    handleCurrentPage(val){//页码改变
      this.formSearch.current=val
      this.getList()
    },
  },
  mounted(){
    this.getInit()
  },
  components:{
    paging,
    acsdev
  }
}
</script>
<style scoped>
.acsAuthTemp{
  width:400px;
  margin:0 auto;
}

  .cont_box{
    width:100%;
    display: flex;
  }
  .cont_box_left,.cont_box_right{
    flex:1;
    /* background: transparent ; */
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
  .shouquan{
    text-align: center;
    color:black;
    background: #fff;
    padding:50px 0;
  }
  .qrcode{
    display: inline-block;
  }
</style>
