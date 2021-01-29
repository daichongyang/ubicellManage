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
      <el-form-item label="概述" size="small">
        <el-input v-model="formSearch.title" placeholder="请输入概述"></el-input>
      </el-form-item>
      <el-form-item label="报修类型" size="small">
        <el-select v-model="formSearch.typeId" placeholder="请选择报修类型">
          <el-option label="全部" :value="''"></el-option>
          <el-option v-for="(item,index) in getnamr" :label="item.name" :value="item.id" :key="index"></el-option>
        </el-select>  
      </el-form-item>
      <el-form-item label="用户名" size="small">
        <el-input v-model="formSearch.nickname" placeholder="请输入用户名"></el-input>
      </el-form-item>
      <el-form-item label="审核人员" size="small">
        <el-input v-model="formSearch.manager" placeholder="请输入审核人员"></el-input>
      </el-form-item>
      <el-form-item label="费用" size="small">
        <el-input v-model="formSearch.pushCount" placeholder="请输入费用"></el-input>
      </el-form-item>
      <el-form-item label="目前状态" size="small">
        <el-select v-model="formSearch.status" placeholder="请选择目前状态">
          <el-option label="全部" :value="''"></el-option>
          <el-option label="未审核" :value="0"></el-option>
          <el-option label="已审核" :value="1"></el-option>
          <el-option label="已派单" :value="2"></el-option>
          <el-option label="已完成" :value="3"></el-option>
          <el-option label="已取消" :value="4"></el-option>
          <el-option label="投诉" :value="5"></el-option>
        </el-select>    
      </el-form-item>
      <el-form-item label="申请时间" size="small">
        <el-date-picker
          v-model="formSearch.checkTime"
          type="datetime"
          value-format="timestamp"
          placeholder="申请时间">
        </el-date-picker>
      </el-form-item>
      <el-form-item label="派单时间" size="small">
        <el-date-picker
          v-model="formSearch.opertime"
          type="datetime"
          value-format="timestamp"
          placeholder="派单时间">
        </el-date-picker>
      </el-form-item>
      <el-form-item>
        <el-button size="small" @click="getlist">查 询</el-button>
      </el-form-item>
      <el-form-item>
        <el-button size="small" type="warning" @click="getupdatedata">确认完成</el-button>
      </el-form-item>
      <el-form-item>
        <el-button size="small" type="danger" @click="delRepairComment(1)">删除评论</el-button>
      </el-form-item>
      <el-form-item>
        <el-button size="small" type="danger" @click="delRepairComment(2)">删除评论和评分</el-button>
      </el-form-item>

    </el-form>
    <el-table :data="formData" style="width: 100%" stripe @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55"></el-table-column>
      <el-table-column prop="title" label="概述"></el-table-column>
      <el-table-column prop="desc" label="报修描述"></el-table-column>
      <el-table-column prop="typeName" label="类型"></el-table-column>
      <el-table-column prop="nickname" label="申请人用户名"></el-table-column>
      <el-table-column prop="assess" label="评价信息"></el-table-column>
      <el-table-column prop="level" label="评分"></el-table-column>
      <el-table-column prop="address" label="申请地址"></el-table-column>
      <el-table-column prop="" label="图片">
        <template slot-scope="scope">
          <img :src="scope.row.picture" alt="" style="height:35px;cursor: pointer;" @click="checkImg(scope.row.picture)">
        </template>
      </el-table-column>
      <el-table-column prop="" label="创建时间">
        <template slot-scope="scope">
          {{$root.getDateArray(scope.row.gmtCreate)[9]}}
        </template>
      </el-table-column>
      <el-table-column prop="manager" label="审核人员"></el-table-column>
      <el-table-column prop="" label="预约时间">
        <template slot-scope="scope">
          {{$root.getDateArray(scope.row.appointmentTime)[9]}}
        </template>
      </el-table-column>
      <el-table-column prop="" label="服务类型">
        <template slot-scope="scope">
          <div>
             {{scope.row.typeService==0?'工区保修':'室内保修'}}
          </div>
        </template>
      </el-table-column>
      <el-table-column prop="" label="状态">
        <template slot-scope="scope">
          <div :class="{red:scope.row.status==5}">
             {{scope.row.status==0?'未审核':scope.row.status==1?'已审核未派单':scope.row.status==2?'已派单':scope.row.status==3?'已完成':scope.row.status==4?'已取消':scope.row.status==5?'投诉':scope.row.status==6?'关单':'关单审核结束'}}
          </div>
        </template>
      </el-table-column>
      <el-table-column label="操作" fixed="right" width=300>
				<template slot-scope="scope">
          <el-button v-if="scope.row.status==0||scope.row.status==1" size="small" @click="addDialog=true,paidangid=scope.row.id,typeId = scope.row.typeId">派 单</el-button>			
          <el-button type="primary" size="small" @click="getclosedate(scope.row)" v-if="scope.row.status!=6&&scope.row.status!=7&&scope.row.status!=0&&scope.row.status!=1">关 单</el-button>
          <el-button type="primary" size="small" @click="getcheckdate(scope.row,1)" v-if="scope.row.closestale=1">审核通过</el-button>
          <el-button type="primary" size="small" @click="getcheckdate(scope.row,0)" v-if="scope.row.closestale=1">审核不通过</el-button>
				</template>
			</el-table-column>
    </el-table>
    <paging @changePage = handleCurrentPage :get-total='total'></paging>

    <!-- 添加 -->
    <el-dialog title="派 单" :visible.sync="addDialog" :close-on-click-modal="false">
      <propertyMaintenance @pushSelect="pushSelect" :typeId="typeId"></propertyMaintenance>
      <div slot="footer" class="dialog-footer">
        <el-button size="medium " @click="addDialog = false">取 消</el-button>
        <el-button size="medium " @click="addList">派 单</el-button>
      </div>
    </el-dialog>
    <!-- 修改 -->
    <el-dialog title="修改" :visible.sync="detailsDialog">
      
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
        <el-button size="medium " @click="detailsDialog = false">取 消</el-button>
        <el-button size="medium " @click="updateList('formUpdate')">修 改</el-button>
      </div>
    </el-dialog>
    <!-- 查看多张图片 -->
    <el-dialog title="图片查看" :visible.sync="showimgs">
      <div class="cont_box_right">
        <el-image style="width: 200px;" :src="showImage" fit="cover"></el-image>
      </div>
    </el-dialog>
    </section>
</template>

<script>
import paging from "../paging"
import propertyMaintenance from "./property_maintenance2"
import { delRepairComment,pmtypeUpdaData,getupdatedata,getgetnamr,getRepairData,addPropertyTypeList,updatePropertyTypeList,deletePropertyTypeList,xqSelectList,orgTree,checkdate,closedate } from '../../url/api';
export default {
  data(){
    return{
      option1:[],
      showImage:'',
      xqTree:[],
      getnamr:[],
      isAddorUpdate:1,//1添加、2修改
      formSearch:{
        current:1,
        size:10
      },
      typeId:'',
      paidangid:'',
      formData: [],//数据
      deleBatch: [],//删除数据
      formUpdate:{},//修改表单
      total: 0,//数据总数
      pages:0,//页面总数
      showimgs:false,
      addDialog:false,
      updateDialog:false,
      detailsDialog:false,
      dialog:false,
      formPush:{},
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
      pselect:[],
      rules: {
        name:[{ required: true, message: '该项不能为空'}],
        type:[{ required: true, message: '该项不能为空',trigger: 'blur'}],
        xqId:[{ required: true, message: '该项不能为空',trigger: 'blur'}],
      },
      imageUrl:''
    }
  },
  methods:{
    getcheckdate(row,status){//审核关单
      let params = {
        id:row.id,
        status:status,
        type:0
      }
      checkdate(params).then(res=>{
        console.log(res)
        if(res.data.code == 200){
          this.getlist()
          this.$message("审核成功")
        }else{
          this.$message("审核失败")
        }
      })
    },
    getclosedate(row){//报修关单
      let params ={
        ids: [row.id],
        type:0
      }
      this.$confirm("确定要关单吗？")
      .then(_ => {
        closedate(params).then(res=>{
          console.log(res)
          if(res.data.code == 200){
            this.getlist()
            this.$message("关单成功")
          }else{
            this.$message("关单失败")
          }
        })
      })
      .catch(_ => {});
    },
    pushSelect(val){//选中派单人员
      console.log(val)
      this.pselect = val
    },
    delRepairComment(operType){
      let arrId = ''
      if(this.deleBatch.length!=0){
        this.deleBatch.forEach((item)=>{
          arrId = item.id+"_"+arrId
        })
      }else{
        this.$message("请选择要删除的对象")
        return
      }
      let params = {
        idStr:arrId,
        operType:operType
      }
      let text = operType==1?"确定要删除评论吗？":"确定要删除评论与评分吗？"
      this.$confirm(text)
      .then(_ => {
        delRepairComment(params).then((res)=>{
          console.log(res)
          if(res.data.code == 200){
            this.$message('删除成功');
            this.getlist()
          }else{
            this.$message('删除失败');
          }
        })
      })
      .catch(_ => {});
    },
    getlist(){
      getRepairData(this.formSearch).then((res)=>{
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
    getupdatedata(){//确定完成
      let arrId = []
      if(this.deleBatch.length!=0){
        this.deleBatch.forEach((item)=>{
          arrId.push(item.id)
          if(item.status!=1){
            this.$message("选中的对象中存在非派单状态")
            return false
          }
        })
      }else{
        this.$message("请选择要更改对象")
        return
      }
      this.$confirm('确认更改为完成状态吗？')
      .then(_ => {
        getupdatedata(arrId).then((res)=>{
          console.log(res)
          if(res.data.code == 200){
            this.$message('更改成功');
            this.getlist()
          }
        })
      })
      .catch(_ => {});
    },
    getInit(){
      this.getlist()
      getgetnamr({}).then((res)=>{//获取物业类型名称
        console.log(res)
        if(res.data.code == 200){
          this.getnamr = res.data.data
        }
      })
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
    addList(){//添加树状图node节点
      if(this.pselect.length!=1){
        this.$message("指派的派单人员需要唯一")
        return
      }
      let params = {
        id:this.paidangid,
        manId:this.pselect[0].id,
        type:0,// 0:保修保养1:投诉建议
      }
      pmtypeUpdaData(params).then((res)=>{
        console.log(res)
        if(res.data.code == 200){
          this.getlist()
          this.$message({
            message: '派单成功',
            type: 'success'
          });
          
        }else{
          this.$message('派单失败:'+res.data.msg)
        }
      })
      this.addDialog = false
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
    //   deleInfor(ids){//删除
    //   let arrId = []
    //   if(ids){
    //     arrId.push(ids)
    //   }
    //   if(this.deleBatch.length!=0){
    //     this.deleBatch.filter((item)=>{
    //       arrId.push(item.id)
    //       return item
    //     })
    //   }
    //   this.$confirm('确认删除吗？')
    //   .then(_ => {
    //     deletePropertyTypeList(arrId).then((res)=>{
    //       console.log(res)
    //       if(res.data.code == 200){
    //         this.$message('删除成功');
    //         this.getInit()
    //       }
    //     })
    //   })
    //   .catch(_ => {});
    // },
    handleSelectionChange(val,self) {//多选
      this.deleBatch = val
      console.log(this.deleBatch)
    },
    handleCurrentPage(val){//页码改变
      this.formSearch.current=val
      this.getlist()
    },
    checkImg(item){//点击查看多张图片
      this.showImage=item
      this.showimgs=true
    }
  },
  mounted(){
    this.getInit()
  },
  components:{
    paging,
    propertyMaintenance
  }
}
</script>
<style scoped>

</style>
