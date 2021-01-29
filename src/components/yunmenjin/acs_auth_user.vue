<template>
  <section class="form_content">
    <el-form :inline="true" :model="formSearch" class="form_inline">
      <el-form-item label="所属组织" size="small">
       <el-cascader
          ref="cascader"
          v-model="option1"
          :options="zuzhiTree"
          :props="defaultProps2"
          @change="zuzhiChange"
          clearable
         >
        </el-cascader>
      </el-form-item>
    </el-form>
    <el-form :inline="true" :model="formSearch">
      <el-form-item label="选择小区" size="small" prop="xqId">
        <el-select v-model="formSearch.xqId" placeholder="请选择小区">
          <el-option v-for="item in xqTree" :label="item.name" :value="item.id" :key="item.id"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button size="small" @click="getlist">查 询</el-button>
      </el-form-item>
      <!-- <el-form-item>
        <el-button size="small" type="danger" @click="deleInfor(false)">批量删除</el-button>
      </el-form-item> -->
      <el-form-item>
        <el-button size="small" type="primary" @click="restoreUser">一键还原</el-button>
      </el-form-item>
      <el-form-item>
        <el-button size="small" type="warning" @click="updateShowBox(false)">统一分配</el-button>
      </el-form-item>
    </el-form>
    <!-- 表格 -->
    <el-table :data="formData" @selection-change="handleSelectionChange" style="width: 100%">
      <el-table-column type="selection" width="55"></el-table-column>
      <el-table-column prop="userName" label="名称"></el-table-column>
      <el-table-column prop="phone" label="手机号码"></el-table-column>
      <el-table-column prop="houseName" label="房间名称"></el-table-column>
      <el-table-column prop="houseNum" label="房间号"></el-table-column>
      <el-table-column prop="xqName" label="小区名称"></el-table-column>
      <el-table-column label="用户类型">
        <template slot-scope="scope">
          {{scope.row.userType==2?"业主":"成员"}}
        </template>
      </el-table-column>
      <el-table-column label="操作" fixed="right" width=250>
				<template slot-scope="scope">
					<el-button type="warning" size="small" @click="updateShowBox1(scope.row)">修改权限</el-button>
					<!-- <el-button type="danger" size="small" @click="deleInfor(scope.row.id)">删 除</el-button> -->
				</template>
			</el-table-column>
    </el-table>
    <paging @changePage ="handleCurrentPage" :get-total='total'></paging>

    <!-- 统一分配 -->
    <el-dialog title="统一分配" :visible.sync="addDialog" :close-on-click-modal="false">
      <div class="cont_box_right">
        <el-form label-position="right" :rules="rules" label-width="160px" :model="formPush" ref='addList'>
          <el-form-item label="有效开始时间" size="small" prop="startTime">
            <el-date-picker
              v-model="formPush.startTime"
              type="datetime"
              value-format="timestamp"
              placeholder="开始时间">
            </el-date-picker>
          </el-form-item>
          <el-form-item label="有效结束时间" size="small" prop="endTime">
            <el-date-picker
              v-model="formPush.endTime"
              type="datetime"
              value-format="timestamp"
              placeholder="结束时间">
            </el-date-picker>
          </el-form-item>
          <el-form-item label="门禁设备">
          <el-input
            :disabled="true"
            style="width:300px;"
            type="textarea"
            :autosize="{ minRows: 2, maxRows: 4}"
            placeholder=""
            v-model="devListt">
          </el-input>
            <el-button size="small" @click="nextt">选 择</el-button>
          </el-form-item>
          <!-- <el-form-item label="有效时段控制分配类型" size="small">
            <el-select v-model="formPush.applyType">
              <el-option label="业主/成员统一分配" :value="1"></el-option>
              <el-option label="业主/成员各自分配" :value="2"></el-option>
            </el-select>
          </el-form-item> -->
          <el-form-item v-if="formPush.ownerDurationType" :label="formPush.applyType==1?'有效时段控制类型':'业主有效时段控制类型'" size="small">
            <el-select v-model="formPush.ownerDurationType" @change="changeItem">
              <el-option label="每天" :value="1"></el-option>
              <el-option label="工作日" :value="2"></el-option>
              <el-option label="自定义" :value="3"></el-option>
            </el-select>
          </el-form-item>
          <section v-for="(iitem,iindex) in ownerNodesInfor.ownerNodes" :key="iindex">
              <el-form-item 
              :label="formPush.ownerDurationType==1?'每天'
              :formPush.ownerDurationType==2?'工作日'
              :iindex==0?'星期一'
              :iindex==1?'星期二'
              :iindex==2?'星期三'
              :iindex==3?'星期四'
              :iindex==4?'星期五'
              :iindex==5?'星期六':'星期天'" size="small">
              <el-button size="small" @click="addItem(iindex)">添 加</el-button>
            </el-form-item>
            <!-- 添加业主有效时间 -->
            <el-form-item size="small" v-for="(item,index) in iitem.chailder" :key="index">
              <div>
                <span style="color:#a1d6f4;">有效时间：</span>
                <el-time-picker
                  v-model="item.startTime"
                  value-format="timestamp"
                  placeholder="开始时间">
                </el-time-picker>
                <span style="color:#a1d6f4;"> - </span>
                <el-time-picker
                  v-model="item.endTime"
                  value-format="timestamp"
                  placeholder="结束时间">
                </el-time-picker>
                <span style="color:#a1d6f4;">
                  设备控制类型: 网络开门
                </span>
                <el-button type="text" @click="delItem(item,iindex)">删 除</el-button>
              </div>
            </el-form-item>
          </section>
          <!----------------------------------------------------->
          <section v-if="formPush.memberDurationType">
            <el-form-item label="成员有效时段控制类型" size="small">
              <el-select v-model="formPush.memberDurationType" @change="changeItem2">
                <el-option label="每天" :value="1"></el-option>
                <el-option label="工作日" :value="2"></el-option>
                <el-option label="自定义" :value="3"></el-option>
              </el-select>
            </el-form-item>
            <section v-for="(iitem,iindex) in memberNodesInfor.memberNodes" :key="iindex">
              <el-form-item 
              :label="formPush.memberDurationType==1?'每天'
              :formPush.memberDurationType==2?'工作日'
              :iindex==0?'星期一'
              :iindex==1?'星期二'
              :iindex==2?'星期三'
              :iindex==3?'星期四'
              :iindex==4?'星期五'
              :iindex==5?'星期六':'星期天'" size="small">
                <el-button size="small" @click="addItem2(iindex)">添 加</el-button>
              </el-form-item>
              <!-- 添加成员有效时间 -->
              <el-form-item size="small" v-for="(item,index) in iitem.chailder" :key="index">
                <div>
                  <span style="color:#a1d6f4;">有效时间：</span>
                  <el-time-picker
                    v-model="item.startTime"
                    value-format="timestamp"
                    placeholder="开始时间">
                  </el-time-picker>
                  <span style="color:#a1d6f4;"> - </span>
                  <el-time-picker
                    v-model="item.endTime"
                    value-format="timestamp"
                    placeholder="结束时间">
                  </el-time-picker>
                  <span style="color:#a1d6f4;">
                    设备控制类型: 网络开门
                  </span>
                  <el-button type="text" @click="delItem2(item,iindex)">删 除</el-button>
                </div>
              </el-form-item>
            </section>
          </section>
          <!----------------------------------------------------->
        </el-form>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button size="medium " @click="addList('addList')">确 定</el-button>
        <el-button size="medium " @click="addDialog = false">取 消</el-button>
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
  let startTime = new Date(new Date().toLocaleDateString()).getTime()
  let endTime = new Date(new Date().toLocaleDateString()).getTime()+24*60*60*1000-1
import acsdev from "./acs_dev1"
import paging from "../paging"
import { getAcPasscardUsers,updateSectionHousePasscard,sectionDeleteList,xqSelectList,orgTree,getOnePasscardDetail } from '../../url/api';
export default {
  data(){
    return{
      devListt:'',
      devList:[],
      huixianSelect:[],//回显通行证信息设备
      option1:[],
      xqId:'',
      pushSelect:0,//控制是否提交勾选的东西
      isApplyToUser:false,
      memberNodesInfor:{
        memberNodes:[
          {
            chailder:[
              {
                startTime:startTime,
                endTime:endTime,
                week:''
              }
            ],
          }
        ]
      },//成员有效期列表
      ownerNodesInfor:{
        ownerNodes:[
          {
            chailder:[
              {
                startTime:startTime,
                endTime:endTime,
                week:''
              }
            ],
          }
        ]//业主有效期列表（修改单个用户通行证时设置该值）
      },
      deleBatch:[],//批量删除
      formSearch:{//查询条件
        current:1,
        xqId:"",
        size: 10
      },
      fatherName:[
        {id:0,name:'首级'}
      ],//用于修改pid和相关操作,//子区域的父级
      formPush:{
        applyType:1,
        startTime:startTime,
        ownerDurationType:1,
        memberDurationType:1,
        applyHouseType:1,
        ownerNodes:[],
        isApplyToUser:0,
        memberNodes	:[],
      },//表单提交
      formData: [],//数据
      formUpdate:{},//修改表单
      total: 0,//数据总数
      pages:0,//页面总数
      addDialog:false,
      updateDialog:false,
      zuzhiTree:[],
      xqTree:[],
      dataTree:[],
      defaultProps: {//树状图key定义
        children: 'children',
        label: 'name'
      },
      defaultProps2: {
        children: 'children',
        label: 'name',
        value: 'id',
        expandTrigger: 'hover',checkStrictly: true,
      },
      rules: {
        name:[{ required: true, message: '该项不能为空'}],
        xqId:[{ required: true, message: '该项不能为空',trigger: 'blur'}],
        startTime:[{ required: true, message: '该项不能为空',trigger: 'blur'}],
        endTime:[{ required: true, message: '该项不能为空',trigger: 'blur'}],
        applyType:[{ required: true, message: '该项不能为空',trigger: 'blur'}],
      },
    }
  },
  methods:{
    nextt(){
      this.updateDialog =true
      this.$nextTick(()=>{
        this.xqId = this.formPush.xqId
        this.devList =this.formPush.devList
        console.log(this.formPush.devList)
      })
    },
    getlist(){
        getAcPasscardUsers(this.formSearch).then((res)=>{
        console.log(res)
        if(res.data.code == 200){
          this.formData = res.data.data.records.filter((item)=>{
            if(item.gmtModified){
              item.gmtModified = this.$root.getDateArray(item.gmtModified)[9]
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

      let org_tree1={}
      xqSelectList(org_tree1).then((res)=>{//小区选择列表
        console.log(res)
        if(res.data.code == 200){
          this.xqTree = res.data.data
          this.formSearch.xqId = this.xqTree[0].id||""
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
          this.zuzhiTree = res.data.data
        }
      })
    },
    addList(addList){//添加
      if(!this.devListt){
        this.$message("请选择设备")
        return
      }
      // this.formPush.pid = this.formSearch.pid
      this.formPush.ownerNodes = []
      if(this.ownerNodesInfor.ownerNodes.length!=0){//业主有效期列表
        for(let i = 0;i < this.ownerNodesInfor.ownerNodes.length ;i++){
          if(this.ownerNodesInfor.ownerNodes[i].chailder.length!=0){
            for(let j = 0;j < this.ownerNodesInfor.ownerNodes[i].chailder.length ;j++){
              console.log(this.ownerNodesInfor.ownerNodes[i].chailder)
              this.formPush.ownerNodes.push(this.ownerNodesInfor.ownerNodes[i].chailder[j])
            }
          }
        }
      }
      // if(this.memberNodesInfor.memberNodes.length!=0){//成员有效期列表
      //   for(let i = 0;i < this.memberNodesInfor.memberNodes.length ;i++){
      //     if(this.memberNodesInfor.memberNodes[i].chailder.length!=0){
      //       for(let j = 0;j < this.memberNodesInfor.memberNodes[i].chailder.length ;j++){
      //         this.formPush.memberNodes.push(this.memberNodesInfor.memberNodes[i].chailder[j])
      //       }
      //     }
      //   }
      // }
      if(this.isApplyToUser){
        this.formPush.isApplyToUser = 1
      }else{
        this.formPush.isApplyToUser = 2
      }
      
      console.log(this.formPush)
      this.$refs[addList].validate((valid) => {
        if (valid) {
          updateSectionHousePasscard(this.formPush).then((res)=>{
            console.log(res)
            if(res.data.code == 200){
              this.$message({
                message: '授权成功',
                type: 'success'
              });
              this.getlist()
            }else{
              this.$message('授权失败')
            }
          })
          this.addDialog = false
        } else {
          console.log('error submit!!');
          return false;
        }
      });
        
    },
    selected(arrobj){//选中的设备
      this.pushSelect = 0
      if(arrobj.length!=0){
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
    changeItem(obj){//根据选择不同的类型来改变
      console.log(obj)
      if(obj == 1||obj==2){
        this.ownerNodesInfor.ownerNodes = [
          {
            chailder:[
              {
                startTime:startTime,
                endTime:endTime,
                week:''
              }
            ],
          }
        ]
      }else{
        this.ownerNodesInfor.ownerNodes = []
        for(let i = 0 ; i<7; i++){
          let aa = {
            chailder:[
              {
                startTime:startTime,
                endTime:endTime,
                week:i+1
              }
            ],
          }
          this.ownerNodesInfor.ownerNodes.push(aa)
        }
      }
    },
    changeItem2(obj){
      if(obj == 1||obj==2){
        this.memberNodesInfor.memberNodes = [
          {
            chailder:[
              {
                startTime:startTime,
                endTime:endTime,
                week:''
              }
            ],
          }
        ]
      }else{
        this.memberNodesInfor.memberNodes = []
        for(let i = 0 ; i<7; i++){
          let aa = {
            chailder:[
              {
                startTime:startTime,
                endTime:endTime,
                week:''
              }
            ],
          }
          this.memberNodesInfor.memberNodes.push(aa)
        }
      }
    },
    addItem(iindex){//添加有效时段
      let obj = {
          startTime:startTime,
          endTime:endTime,
          week:this.formPush.ownerDurationType == 3?iindex+1:''
        }
      this.ownerNodesInfor.ownerNodes[iindex].chailder.push(obj)
    },
    addItem2(iindex){//添加有效时段
      let obj = {
          startTime:startTime,
          endTime:endTime,
          week:this.formPush.memberDurationType == 3?iindex+1:''
        }
      this.memberNodesInfor.memberNodes[iindex].chailder.push(obj)
    },
    delItem(obj,index){//删除有效时段
      this.ownerNodesInfor.ownerNodes[index].chailder = this.ownerNodesInfor.ownerNodes[index].chailder.filter((item)=>{
        return item != obj
      })
    },
    delItem2(obj,index){//删除有效时段
      this.memberNodesInfor.memberNodes[index].chailder = this.memberNodesInfor.memberNodes[index].chailder.filter((item)=>{
        return item != obj
      })
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
        sectionDeleteList(arrId).then((res)=>{
          console.log(res)
          if(res.data.code == 200){
            this.$message('删除成功');
            this.getlist()
          }
        })
      })
      .catch(_ => {});
    },
    handleCurrentPage(val){//页码改变
      this.formSearch.current=val
      this.getlist()
    },
    updateShowBox(item){//统一分配弹框
      console.log(this.deleBatch)
      this.devListt = ''
      this.formPush.devList = []
      this.formPush.passcardIds = []
      if(item){
        this.deleBatch= []
        console.log(item)
        this.formPush.passcardIds = [item.passcardId]
        this.formPush.xqId = item.xqId
        this.deleBatch.push(item)
        this.addDialog = true
        return
      }
      if(this.deleBatch.length==0){
        this.$message("请选择配置对象")
        return
      }else{
        this.deleBatch.filter((item)=>{
         console.log(this.deleBatch.find((n) => n.xqId == item.xqId)) 
          for(let i= 0;i<this.deleBatch.length;i++){
            if(this.deleBatch[i].xqId == item.xqId&&this.deleBatch[i].id!=item.id){
              this.$message("请选择小区相同的区域")
              return 
            }
          }
          this.formPush.passcardIds.push(item.passcardId)
          return item
        })
        this.formPush.xqId = this.deleBatch[0].xqId
      }
      this.addDialog = true
      
    },
    updateShowBox1(item){
      this.devListt = ''
      let params = {
        passcardId:item.passcardId
      }
      getOnePasscardDetail(params).then((res)=>{
        console.log(res)
        if(res.data.code == 200){
          this.formPush = res.data.data
          this.formPush.devList = this.formPush.devList.filter((item)=>{
          this.devListt =this.devListt + item.name + "，"
          return item
        })
        this.devListt = this.devListt.substring(0,this.devListt.length-1)
        }else{
          this.$message(res.data.msg);
        }
        this.addDialog = true
      })
    },
    zuzhiChange(value){//改变组织
      if(value.length!=0){
        console.log(value)
        this.formSearch.orgId=this.$refs.cascader.getCheckedNodes()[0].data.id
      }else{
        this.formSearch.orgId = ''
      }
      getAcPasscardUsers(this.formSearch).then((res)=>{
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
    restoreUser(){//一键还原
      let params = {
        passcardIds:[]
      }
      if(this.deleBatch.length==0){
        this.$message("请选择还原的对象")
        return
      }
      this.deleBatch.filter((item)=>{
        params.passcardIds.push(item.passcardId)
        return item
      })
      this.$confirm('确认要还原已勾选对象吗？')
      .then(_ => {
        restoreUsersPasscard(params).then((res)=>{
          console.log(res)
          if(res.data.code == 200){
            this.$message({
              message: '还原成功',
              type: 'success'
            });
          }else{
            this.$message(res.data.msg);
          }
        })
      })
      .catch(_ => {});

    },
    handleSelectionChange(val) {//多选
      
      this.deleBatch = val
      console.log(this.deleBatch)
    },
    handleclick(event){//点击表格
    this.fatherName = this.fatherName.filter((item)=>{
      return item.id!=event.id
    })
    this.fatherName.push(event)

      this.formSearch.pid = event.id
      console.log(this.fatherName,event)
      
      getAcPasscardUsers(this.formSearch).then((res)=>{
        console.log(res)
        if(res.data.code == 200){
          this.formData = res.data.data.records.filter((item)=>{
            if(item.gmtModified){
              item.gmtModified = this.$root.getDateArray(item.gmtModified)[9]
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

  },
  mounted(){
    this.getInit()
  },
  components:{
    acsdev,
    paging
  }
}
</script>
<style scoped>
@import "../../assets/css/common.css";
</style>
