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
        <template slot-scope="scope" v-if="scope.row.picture">
          <div style="display:flex;">
           <img v-for="item in scope.row.picture.split(',')" :src="item" alt="" style="height:35px;">
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
      <el-table-column label="操作" fixed="right" width=150>
				<template slot-scope="scope">
					<el-button type="warning" size="small" @click="updateShowBox(scope.row),replyType = 1">回 复</el-button>
					<!-- <el-button type="warning" size="small" @click="updateShowBox(scope.row)">查看详情</el-button> -->
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
  </section>  
</template>

<script>
import paging from "../paging"
import { getAdviceData,addPropertyTypeList,updatePropertyTypeList,addReply,xqSelectList,orgTree } from '../../url/api';
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
      imageUrl:''
    }
  },
  methods:{
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
    addList(addList){//添加树状图node节点
      this.$refs[addList].validate((valid) => {
        if (valid) {
          addPropertyTypeList(this.formPush).then((res)=>{
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
      this.getList()
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