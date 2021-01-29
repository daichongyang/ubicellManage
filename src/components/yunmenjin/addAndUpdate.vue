<template>
    <div>
      <el-dialog :title="isAddorUpdate==1?'添加':'修改'" :visible.sync="controlDialog" :show-close='false'>
        <div class="cont_box_right">
          <el-form label-position="right" :rules="rules" label-width="90px" :model="pushform" ref='pushform'>
            <el-form-item label="选择小区" size="small" prop="xqId" v-if="isAddorUpdate==1||isActive==6">
              <el-select v-model="pushform.xqId" placeholder="请选择小区">
                <el-option v-for="item in xqTree" :label="item.name" :value="item.id" :key="item.id"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="设备名称" v-if="isActive!==6" prop="name">
              <el-input v-model="pushform.name"></el-input>
            </el-form-item>
            <el-form-item label="设备密码" v-if="isActive==4||isActive==2">
              <el-input v-model="pushform.devPass"></el-input>
            </el-form-item>
            <el-form-item label="devSn" v-if="isActive==1||isActive==7">
              <el-input v-model="pushform.devSn"></el-input>
            </el-form-item>
            <el-form-item label="ncu序列号" v-if="isActive==1||isActive==7">
              <el-input v-model="pushform.ncuSn"></el-input>
            </el-form-item>
            <el-form-item label="楼层" v-if="isActive==3||isActive==4||isActive==5">
              <el-input v-model="pushform.floor"></el-input>
            </el-form-item>
            <el-form-item label="门栋编号" v-if="isActive==1||isActive==7">
              <el-input v-model="pushform.doorkeySign" placeholder="门栋编号（1-128）"></el-input>
            </el-form-item>
            <el-form-item label="门口机类型" size="small" v-if="isActive==3||isActive==4||isActive==5">
              <el-select v-model="pushform.embedType" placeholder="请选择门口机类型">
                <el-option label="单元门口机" :value="1"></el-option>
                <el-option label="围墙机" :value="2"></el-option>
              </el-select>
            </el-form-item>
            <div v-if="(isActive==3||isActive==4||isActive==5)&&pushform.embedType==1">
              <!-- 面包屑 -->
              <div class="show_father">
                <div class="show_father_box"> 
                  <div style="cursor: pointer;" v-for="(item,index) in fatherName" :key="index" @click="clickmbx(item.id)">
                    <span>{{item.name}} </span>
                    <span v-if="index!=fatherName.length-1" style="margin-right:10px;"> → </span>
                  </div>
                </div>
                <el-button size="small" @click="fatherName=[{id:0,name:'首级'}],clickmbx(0)">清楚记录</el-button>
              </div>
              <el-form :inline="true" :model="formSearch1" class="form_inline">
                <el-form-item label="所属组织" size="small" prop="orgId">
                <el-cascader
                    ref="cascader1"
                    v-model="option1"
                    :options="dataTree"
                    :props="defaultProps2"
                    @change="handleChange1"
                    clearable
                  >
                  </el-cascader>
                </el-form-item>
                <el-form-item label="选择小区" size="small" prop="xqId">
                  <el-select v-model="formSearch1.xqId" placeholder="请选择小区">
                    <el-option v-for="item in xqTree" :label="item.name" :value="item.id" :key="item.id"></el-option>
                  </el-select>
                </el-form-item>
                <el-form-item>
                  <el-button size="small" @click="getsectionList">查 询</el-button>
                </el-form-item>
              </el-form>
              <!-- 区域列表 -->
              <el-table :data="formData1" style="width: 100%">
                <el-table-column width="25">
                  <template slot-scope="scope">
                    <el-radio @change='pname = scope.row.name,isGetFather = true' v-model="pushform.sectionId" :label="scope.row.id" style="color:transparent;"></el-radio>
                  </template>
                </el-table-column>
                <el-table-column>
                  <template slot-scope="scope">
                    <div style="cursor: pointer;" @click="handleSelectionChange(scope.row)">{{scope.row.name}}</div>
                  </template>
                </el-table-column>
                <el-table-column prop="remark" label="备注"></el-table-column>
                <el-table-column prop="gmtModified" label="创建时间" width="180"></el-table-column>
                <el-table-column prop="pname"label="父级区域"width="180"></el-table-column>
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
            </div>
            <!-- 选择房间 -->
            <div v-if="isActive==2">
              <el-form :inline="true" :model="formSearch2" class="form_inline">
                <el-form-item label="所属组织" size="small" prop="orgId">
                <el-cascader
                    ref="cascader2"
                    v-model="option1"
                    :options="dataTree"
                    :props="defaultProps2"
                    @change="handleChange2"
                    clearable
                  >
                  </el-cascader>
                </el-form-item>
                <el-form-item label="选择小区" size="small">
                  <el-select v-model="formSearch2.xqId" placeholder="请选择小区">
                    <el-option v-for="item in xqTree" :label="item.name" :value="item.id" :key="item.id"></el-option>
                  </el-select>
                </el-form-item>
                <el-form-item>
                  <el-button size="small" @click="gethouseList">查 询</el-button>
                </el-form-item>
              </el-form>
            <el-table :data="formData2" style="width: 100%">
              <el-table-column width="25">
                <template slot-scope="scope">
                  <el-radio v-model="pushform.houseId" :label="scope.row.id" style="color:transparent;"></el-radio>
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
                @current-change="handleCurrentPage2"
                :page-size="10" 
                :total="total2">
              </el-pagination>
            </div>        
            </div>
            <!-- 商汤人脸机列表 -->
            <div v-if="isActive==6">
              <el-table :data="formData3" style="width: 100%">
                <el-table-column width="25">
                  <template slot-scope="scope">
                    <el-radio v-model="inforShangtan" :label="Object.assign(scope.row.device_type,scope.row.device)" style="color:transparent;"></el-radio>
                  </template>
                </el-table-column>
                <el-table-column label="设备名称">
                  <template slot-scope="scope">
                    {{scope.row.device.name}}
                  </template>
                </el-table-column>
                <el-table-column label="在线状态">
                  <template slot-scope="scope">
                    {{scope.row.device.status==1?"在线":"离线"}}
                  </template>
                </el-table-column>
              </el-table>
              <!-- <div class="pagination">
                <el-pagination
                  layout="prev, pager, next"
                  prev-text="上一页"
                  next-text="下一页"
                  @current-change="handleCurrentPage3"
                  :page-size="10" 
                  :total="total3">
                </el-pagination>
              </div>  -->
            </div>
          </el-form>
        </div>
        <div slot="footer" class="dialog-footer">
          <el-button size="medium " @click="cancel">取 消</el-button> 
          <el-button size="medium " @click="changeList('pushform')" v-if="isAddorUpdate == 1">新 增</el-button>
          <el-button size="medium " @click="changeList('pushform')" v-else>修 改</el-button>
        </div>
      </el-dialog>
    </div>
</template>

<script>
import { addAcDevlist,updateDoorDev,orgTree,xqSelectList,houseList,getStDevs,sectionList  } from '../../url/api';
export default {
  props:['fatherActive','fatherInfor','fatherControlDialog','fatherIsAddorUpdate'],
  data(){
    return{
      option1:[],
      dataTree:[],
      controlDialog:false,//控制显示
      isActive:1,//选中的是哪个模块1规则ncu,2对讲机,3全屏门口机,4IP门口机,6商汤人脸机,7白名单ncu,8霍尼门禁权限
      isAddorUpdate:1,//1：添加，2：修改
      pushform:{
        floor:1
      },//推送表单信息给父级
      orgTree:[],//组织数据
      xqTree:[],//小区树
      defaultProps: {//组织树状图key定义
        children: 'children',
        label: 'label'
      },
      defaultProps2: {
        children: 'children',
        label: 'name',
        value: 'id',
        expandTrigger: 'hover',checkStrictly: true
      },
      refreshList:true,//刷新列表
      rules: {//表单验证规则
        name:[{ required: true, message: '该项不能为空'}],
        xqId:[{ required: true, message: '该项不能为空',trigger: 'change'}],
        orgId:[{ required: true, message: '该项不能为空'}],
      },
      fatherName:[{id:0,name:'首级'}],//选择区域是用到的面包屑
      formData1:[],//区域信息
      formSearch1:{//区域查询条件
        current:1,
        pid:0,
        size: 10
      },
      total1:0,//区域数据个数
      formData2:[],//房间列表信息
      formSearch2:{//房间列表信息查询条件
        current:1,
        size: 10
      },
      total2:0,//房间列表信息数据个数
      formData3:[],
      inforShangtan:{}
    }
  },

  methods:{
    initInfor(){
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
      this.gethouseList()
    },
    handleSelectionChange(event){//点击表格
    this.fatherName = this.fatherName.filter((item)=>{
      return item.id!=event.id
    })
    this.fatherName.push(event)

      this.formSearch1.pid = event.id
      console.log(this.fatherName,event)
      
      sectionList(this.formSearch1).then((res)=>{
        console.log(res)
        if(res.data.code == 200){
          this.formData1 = res.data.data.records.filter((item)=>{
            if(item.gmtModified){
              item.gmtModified = this.$root.getDateArray(item.gmtModified)[9]
            }
            return item
          })
          this.total1 = res.data.data.total
        }else{
          this.$message(res.data.msg);
        }
      })
    },
    clickmbx(event){//点击面包屑
      console.log(event)
      this.formSearch1.pid = event
      sectionList(this.formSearch1).then((res)=>{
        console.log(res)
        if(res.data.code == 200){
          this.formData1 = res.data.data.records.filter((item)=>{
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
    getsectionList(){
      sectionList(this.formSearch1).then((res)=>{//区域列表
        console.log(res)
        if(res.data.code == 200){
          this.formData1 = res.data.data.records.filter((item)=>{
            if(item.gmtModified){
              item.gmtModified = this.$root.getDateArray(item.gmtModified)[9]
            }
            return item
          })
          this.total1 = res.data.data.total
        }else{
          this.$message(res.data.msg);
        }
      })
    },
    handleCurrentPage1(val){//页码区域改变
      this.formSearch1.current=val
      this.getsectionList()
    },
    handleCurrentPage2(val){//页码房间列表
      this.formSearch2.current=val
      this.gethouseList()
    },
    handleCurrentPage3(val){//页码商汤人脸机列表
      this.formSearch3.current=val
        getStDevs().then((res)=>{//获取商汤人脸机列表
          console.log(res)
          if(res.data.code == 200){
            this.formData3 = res.data.data.records
          }
        })
    },
    gethouseList(){
      houseList(this.formSearch2).then((res)=>{//房间列表
        console.log(res)
        if(res.data.code == 200){
          this.formData2 = res.data.data.records.filter((item)=>{
            if(item.gmtModified){
              item.gmtModified = this.$root.getDateArray(item.gmtModified)[9]
            }
            return item
          })
          this.total2 = res.data.data.total
        }else{
          this.$message(res.data.msg);
        }
      })
    },
    cancel(){//隐藏弹框
      this.controlDialog = false
      this.$emit('cancelControlDialog', this.controlDialog);
      console.log(this.controlDialog)
    },
    changeList(pushform){//添加或者修改
      
      this.pushform.devType = this.isActive
      console.log(this.inforShangtan,this.pushform)
      if((this.isActive==3||this.isActive==4||this.isActive==5)&&this.pushform.embedType==1){
        
        if(!this.pushform.sectionId){
          this.$message("请选择区域")
          return
        }
      }else{
          this.pushform.sectionId = ''
      }
      if(this.pushform.devType==6){
        this.pushform.deviceGroup={
          active:this.inforShangtan.active,
          companyId:this.inforShangtan.company_id,
          active:this.inforShangtan.active,
          createAt:this.inforShangtan.create_at,
          description:this.inforShangtan.description,
          devId:this.inforShangtan.id,
          direction:this.inforShangtan.direction,
          groupCount:this.inforShangtan.group_count,
          groupStaff:this.inforShangtan.group_staff,
          groupVisitor:this.inforShangtan.group_visitor,
          groups:this.inforShangtan.groups,
          info:this.inforShangtan.info,
          ip:this.inforShangtan.ip,
          isDelete:this.inforShangtan.is_delete,
          location:this.inforShangtan.location,
          name:this.inforShangtan.name,
          sn:this.inforShangtan.sn,
          softwareVersion:this.inforShangtan.software_version,
          status:this.inforShangtan.status,
          typeId:this.inforShangtan.type_id,
          updateAt:this.inforShangtan.update_at,
          updatetime:this.inforShangtan.updatetime
        }
      }
      
      if(this.pushform.doorkeySign&&(this.pushform.doorkeySign>128||this.pushform.doorkeySign<1)){
        this.$message('门栋编号在1-128之间')
        return
      }
      this.$refs[pushform].validate((valid) => {
        if (valid) {
          if(this.isAddorUpdate == 1){
            addAcDevlist(this.pushform).then((res)=>{
              console.log(res)
              if(res.data.code == 200){
                this.$message({
                  message: '添加成功',
                  type: 'success'
                });
                this.$emit('refreshList',this.refreshList)
              }else{
                this.$message('添加失败')
              }
            })
          }else{
            updateDoorDev(this.pushform).then((res)=>{
              console.log(res)
              if(res.data.code == 200){
                this.$message({
                  message: '修改成功',
                  type: 'success'
                });
                this.$emit('refreshList',this.refreshList)
              }else{
                this.$message('修改失败')
              }
            })
          }
          this.controlDialog = false
          this.$emit('cancelControlDialog', this.controlDialog);
          this.initInfor()
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
    watchOrgTree(data,ev) {//监听组织树状图勾选
      // console.log(ev);
      if(ev.checkedKeys.length>1){
        this.$message('只能选择一个组织');
      }else{
        this.pushform.orgId = ev.checkedKeys[0]
      }
    },
    handleChange1(value){
      if(value.length!=0){
        console.log(value)
        this.formSearch1.orgId=this.$refs.cascader1.getCheckedNodes()[0].data.id
      }else{
        this.formSearch1.orgId = ''
      }
    },
    handleChange2(value){
      if(value.length!=0){
        console.log(value)
        this.formSearch2.orgId=this.$refs.cascader2.getCheckedNodes()[0].data.id
      }else{
        this.formSearch2.orgId = ''
      }
    },
  },
　watch: {
　　// 监听父组件传参变化重新赋值
    fatherControlDialog (val) {
      this.controlDialog = val
　　 },
    fatherIsAddorUpdate (val) {
      this.isAddorUpdate = val
　　 },
    fatherInfor (val) {//修改时候的传值
      console.log(val)
      this.pushform = val
　　 },
    fatherActive (val) {
      if(this.isActive!=val){//判断是否切换模块
        this.pushform = {}
      }
      this.isActive = val
      if(this.isActive==6){
        getStDevs().then((res)=>{//获取商汤人脸机列表
          console.log(res)
          if(res.data.code == 200){
            this.formData3 = res.data.data.records
          }
        })
      }

　　 },
　},
  mounted(){
    this.initInfor()

    // this.pushform = this.fatherInfor
  }
}
</script>

<style scoped>

</style>