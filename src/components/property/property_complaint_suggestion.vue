<template>
  <section class="modlude">
    <el-form :inline="true" :model="formSearch" class="form_inline" label-width="80px">
      <el-form-item label="选择小区" size="small" prop="xqId">
        <el-select v-model="formPush.xqId" placeholder="请选择小区">
          <el-option v-for="item in xqTree" :label="item.name" :value="item.id" :key="item.id"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="用户昵称" size="small">
        <el-input v-model="formSearch.nickname" placeholder="请输入用户昵称"></el-input>
      </el-form-item>
      <el-form-item label="手机号码" size="small">
        <el-input v-model="formSearch.phone" placeholder="请输入用户手机号码"></el-input>
      </el-form-item>
      <el-form-item label="标题" size="small">
        <el-input v-model="formSearch.title" placeholder="请输入标题"></el-input>
      </el-form-item>
      <el-form-item label="内容" size="small">
        <el-input v-model="formSearch.desc" placeholder="请输入内容"></el-input>
      </el-form-item>
      <el-form-item label="是否回复" size="small">
        <el-select v-model="formSearch.status" placeholder="请选择状态">
          <el-option label="未回复" :value="0"></el-option>
          <el-option label="已回复" :value="1"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="回复时间" size="small">
        <el-date-picker
          v-model="formSearch.replyTime"
          type="datetime"
          placeholder="回复时间">
        </el-date-picker>
      </el-form-item>
      <el-form-item>
        <el-button size="small" @click="getlist">查 询</el-button>
      </el-form-item>
      <el-form-item>
        <el-button size="small" type="danger" @click="updateDialog=true,replyType = 2">批量回复</el-button>
      </el-form-item>
    </el-form>
    <el-table :data="formData" style="width: 100%" stripe @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55"></el-table-column>
      <el-table-column prop="nickname" label="用户昵称"></el-table-column>
      <el-table-column prop="phone" label="用户手机号码"></el-table-column>
      <el-table-column prop="title"label="标题"></el-table-column>
      <el-table-column prop="desc"label="内容"></el-table-column>
      <el-table-column label="图片">
        <template slot-scope="scope" v-if="scope.row.pictures">
          <div style="display:flex;cursor: pointer;" @click="checkImg(scope.row.pictures.split(','))">
           <img v-for="item in scope.row.pictures.split(',')" :src="item" alt="" style="height:35px;">
          </div>
        </template>
      </el-table-column>
      <el-table-column prop="gmtCreate"label="提交时间" width=150>>
        <template slot-scope="scope" v-if="scope.row.gmtCreate">
          {{$root.getDateArray(scope.row.gmtCreate)[9]}}
        </template>
      </el-table-column>
      <el-table-column prop="reply"label="回复"></el-table-column>
      <el-table-column prop="replyTime"label="回复时间" width=150>>
        <template slot-scope="scope" v-if="scope.row.replyTime">
          {{$root.getDateArray(scope.row.replyTime)[9]}}
        </template>
      </el-table-column>
      <el-table-column prop="" label="状态">
        <template slot-scope="scope">
          <div>
             {{scope.row.status==0?'未回复':scope.row.status==1?'已审核未派单':scope.row.status==2?'已派单':scope.row.status==3?'已完成':scope.row.status==4?'已取消':scope.row.status==5?'投诉':scope.row.status==6?'关单':'关单审核结束'}}
          </div>
        </template>
      </el-table-column>
      <el-table-column label="操作" fixed="right" width=300>
				<template slot-scope="scope">
					<el-button type="warning" size="small" @click="updateShowBox(scope.row),replyType = 1">回 复</el-button>
          <el-button v-if="scope.row.status==0||scope.row.status==1" size="small" @click="addDialog=true,paidangid=scope.row.id,typeId = scope.row.typeId">派 单</el-button>			
          <el-button type="primary" size="small" @click="getclosedate(scope.row)" v-if="scope.row.status!=6&&scope.row.status!=7&&scope.row.status!=0&&scope.row.status!=1">关 单</el-button>
          <el-button type="primary" size="small" @click="getcheckdate(scope.row,1)" v-if="scope.row.closestale=1">审核通过</el-button>
          <el-button type="primary" size="small" @click="getcheckdate(scope.row,0)" v-if="scope.row.closestale=1">审核不通过</el-button>
				</template>
			</el-table-column>
    </el-table>
    <paging @changePage = handleCurrentPage :get-total='total'></paging>
    <!-- 添加 -->
    <el-dialog title="回复" :visible.sync="updateDialog" :close-on-click-modal="false">
      <div class="cont_box_right">
        <el-form label-position="right" :rules="rules" label-width="85px" :model="formPush"> 
          <el-form-item label="回复内容" size="small" prop="adesc">
            <el-input type="textarea" v-model="reply" :rows="2" placeholder="请输入内容"></el-input>
          </el-form-item>
        </el-form>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button size="medium " @click="updateDialog = false">取 消</el-button>
        <el-button size="medium " @click="deleInfor()">回 复</el-button>
      </div> 
    </el-dialog>
    <!-- 派 单 -->
    <el-dialog title="派 单" :visible.sync="addDialog" :close-on-click-modal="false">
      <propertyMaintenance @pushSelect="pushSelect" :typeId="typeId"></propertyMaintenance>
      <div slot="footer" class="dialog-footer">
        <el-button size="medium " @click="addDialog = false">取 消</el-button>
        <el-button size="medium " @click="addList">派 单</el-button>
      </div>
    </el-dialog>
    <!-- 查看多张图片 -->
    <el-dialog title="图片查看" :visible.sync="showimgs">
      <div class="cont_box_right">
        <el-image v-for="(item,index) in showImage" :key="index" style="width: 200px;" :src="item" fit="cover"></el-image>
      </div>
    </el-dialog>
  </section>  
</template>

<script>
import propertyMaintenance from "./property_maintenance2"
import paging from "../paging"
import { getAdviceData,addPropertyTypeList,updatePropertyTypeList,addReply,xqSelectList,orgTree,closedate } from '../../url/api';
export default {
  data(){
    return{
      checkStrictly:false,
      showimgs:false,
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
      rules: {
        name:[{ required: true, message: '该项不能为空'}],
        type:[{ required: true, message: '该项不能为空',trigger: 'blur'}],
        xqId:[{ required: true, message: '该项不能为空',trigger: 'blur'}],
      },
      pselect:[],
      typeId:'',
      showImage:[]
    }
  },
  methods:{
    pushSelect(val){//选中派单人员
      console.log(val)
      this.pselect = val
    },
    getcheckdate(row,status){//审核关单
      let params = {
        id:row.id,
        status:status,
        type:1
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
        type:1
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
    getlist(){
      getAdviceData(this.formSearch).then((res)=>{
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
   addList(){//添加树状图node节点
      if(this.pselect.length!=1){
        this.$message("指派的派单人员需要唯一")
        return
      }
      let params = {
        id:this.paidangid,
        manId:this.pselect[0].id,
        type:1,// 0:保修保养1:投诉建议
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
      }
      this.updateDialog = true
      console.log(this.formUpdate)
    },
    deleInfor(){//删除
      if(this.replyType == 1){
        let params ={
          ids:[this.formUpdate.id],
          reply:this.reply,
        }
        addReply(params).then((res)=>{
          console.log(res)
          if(res.data.code == 200){
            this.$message('操作成功');
            this.getlist()
          }
        })
      }else{
        let arrId = []
        if(this.deleBatch.length!=0){
          this.deleBatch.filter((item)=>{
            arrId.push(item.id)
            return item
          })
        }
        let params ={
          ids:arrId,
          reply:this.reply,
        }
        addReply(params).then((res)=>{
          console.log(res)
          if(res.data.code == 200){
            this.$message('操作成功');
            this.getlist()
          }
        })
      }
      this.updateDialog = false
    },

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