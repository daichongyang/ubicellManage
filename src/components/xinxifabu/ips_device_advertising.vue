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
      <el-form-item label="选择小区" size="small" prop="xqId">
        <el-select v-model="formSearch.xqId" placeholder="请选择小区" @change="formSearch1.xqId=formSearch.xqId">
          <el-option v-for="item in xqTree" :label="item.name" :value="item.id" :key="item.id"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="照片或视频" size="small">
        <el-input v-model="formSearch.title" placeholder="请输入照片或视频"></el-input>
      </el-form-item>
      <el-form-item label="时间" size="small">
        <el-date-picker
          v-model="formSearch.startTime"
          type="datetime"
          value-format="timestamp"
          placeholder="开始时间">
        </el-date-picker>
        <span style="color:#a1d6f4;"> - </span>
        <el-date-picker
          v-model="formSearch.endTime"
          type="datetime"
          value-format="timestamp"
          placeholder="结束时间">
        </el-date-picker>
      </el-form-item>
      <el-form-item label="发送状态">
        <el-radio v-model="formPush.isDel" :label="1">已删除</el-radio>
        <el-radio v-model="formPush.isDel" :label="0">投放中</el-radio>
      </el-form-item>
      <el-form-item>
        <el-button size="small" @click="getlist">查 询</el-button>
      </el-form-item>
      <el-form-item>
        <el-button size="small" @click="addDialog=true">添 加</el-button>
      </el-form-item>
    </el-form>
    <el-table ref="multipleTable" :data="formData" style="width: 100%" stripe @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55"></el-table-column>
      <el-table-column prop="title" label="标题"></el-table-column>
      <el-table-column prop="gmtCreate" label="发送时间"></el-table-column>
      <el-table-column label="发送状态">
        <template slot-scope="scope">
          {{scope.row.isDel==1?"已删除":"投放中"}}
				</template>
      </el-table-column>
      <el-table-column label="操作" fixed="right" width=250>
				<template slot-scope="scope">
					<el-button type="danger" size="small" @click="deleInfor(scope.row.id)">删 除</el-button>
					<el-button type="primary" size="small" @click="updateShowBox(scope.row)">详 情</el-button>
        </template>
			</el-table-column>
    </el-table>

    <paging @changePage = handleCurrentPage :get-total='total'></paging>

    <!-- 添加 -->
    <el-dialog title="新增" :visible.sync="addDialog" :close-on-click-modal="false">
      <div class="cont_box_left">
        <el-form label-position="right" label-width="110px" :model="formPush" :rules="rules"  ref='addList'>
        <el-form-item label="选择小区" size="small">
          <el-select v-model="formPush.xqId" placeholder="请选择小区">
            <el-option v-for="item in xqTree" :label="item.name" :value="item.id" :key="item.id"></el-option>
          </el-select>
        </el-form-item>
          <el-form-item label="标题">
            <el-input v-model="formPush.title"></el-input>
          </el-form-item>
          <el-form-item label="门禁设备">
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
          <el-form-item label="图片" size="small">
            <el-upload
              ref="addUpdata"
              class="avatar-uploader"
              :action="uploadToRealPath"
              :headers='headers'
              :show-file-list="false"
              :on-success="handleAvatarSuccess1"
              :on-remove="handleRemove">
              <img v-if="imageUrl" :src="imageUrl" class="avatar">              
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload> 
          </el-form-item>
          <el-form-item label="视频" size="small">
            <el-upload
              ref="addUpdata"
              class="avatar-uploader"
              :action="uploadToRealPath"
              :headers='headers'
              :show-file-list="false"
              :on-success="handleAvatarSuccess2"
              :on-remove="handleRemove">
              <video v-if="videoUrl" :src="videoUrl" class="avatar"></video>
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload> 
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
        <el-form label-position="right" :rules="rules" label-width="110px" :model="formUpdate" ref='formUpdate'>
          <el-form-item label="标题">
            <el-input v-model="formUpdate.title"></el-input>
          </el-form-item>
          <el-form-item label="门禁设备">
            <el-input
              :disabled="true"
              style="width:250px;"
              type="textarea"
              :autosize="{ minRows: 2, maxRows: 4}"
              placeholder=""
              v-model="devListt">
            </el-input>          
          </el-form-item>
          <el-form-item label="图片" size="small">
          <el-image fit='cover' style="width:120px;height:120px;" :src='formUpdate.imgAddress'></el-image>
          </el-form-item>
          <el-form-item label="视频" size="small">
            <video :src="formUpdate.videoAddress" class="avatar"></video>
          </el-form-item>
        </el-form>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button size="medium" @click="updateDialog = false">取 消</el-button>
      </div>
    </el-dialog>
   <!-- 选择设备 -->
    <el-dialog title="选择设备" :visible.sync="devDialog" :close-on-click-modal="false">
      <div class="cont_box_right">
        <acsdev @selected="selected" :xq-id='xqId' :push-select="pushSelect" :huixian-select="devList"></acsdev>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button size="medium" @click="pushSelect = 1,devDialog = false">确 定</el-button>
        <el-button size="medium" @click="devDialog = false">取 消</el-button>
      </div>
    </el-dialog>
  </section>  
</template>

<script>
import paging from '../paging'
import acsdev from "./xinxiacs_dev1"
import { getVillageAD,saveVillage,deleteVillage,orgTree,xqSelectList,houseList } from '../../url/api';
export default {
  data(){
    return{
      uploadToRealPath:'/intellmanagerV3.0/upload/file/upload',
      headers:{
        Authorization:sessionStorage.getItem('Authorization'),
        token:sessionStorage.getItem('token')
      },
      imageUrl: '',
      videoUrl: '',
      devDialog:false,
      pushSelect:0,
      allSelect:[],
      option1:[],
      devListt:'',
      deleBatch:[],
      isGetFather:false,//是否选中
      formSearch:{//查询条件
        current:1,
        size: 10
      },
      formSearch1:{
        current:1,
        size: 10
      },
      formPush:{},//表单提交
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
        label: 'label'
      },
      defaultProps2: {
        children: 'children',
        label: 'name',
        value: 'id',
        expandTrigger: 'hover',checkStrictly: true
      },
      xqTree:[],//小区列表
      devList:[],
      rules: {
        phone:[{ required: true, message: '该项不能为空'}],
        ubicellJyh:[{ required: true, message: '该项不能为空'}],
        addUser:[{ required: true, message: '该项不能为空',trigger: 'change'}],
        getCall:[{ required: true, message: '该项不能为空',trigger: 'change'}],
        xqId:[{ required: true, message: '该项不能为空',trigger: 'change'}],
        houseId:[{ required: true, message: '该项不能为空',trigger: 'change'}],
        userType:[{ required: true, message: '该项不能为空',trigger: 'change'}],
      },
      xqId:'',
    }
  },
  methods:{
    nextt(){
      this.devDialog =true
      this.$nextTick(()=>{
        this.xqId = this.formPush.xqId||this.xqTree[0].id
        this.devList =this.formPush.devIds
        console.log(this.formPush.devIds)
      })
    },
    handleAvatarSuccess1(res, file,fileList) {
      console.log(res, file)
      this.formPush.imgAddress = res.data[0];
      this.imageUrl = URL.createObjectURL(file.raw);
      console.log(this.formPush.imgAddress)
    },
    handleAvatarSuccess2(res, file,fileList) {
      console.log(res, file)
      this.formPush.videoAddress = res.data[0];
      this.videoUrl = URL.createObjectURL(file.raw);
    },
    handleRemove(file, fileList) {
      console.log(file, fileList);
      this.fileList = fileList
    },
    selected(arrobj){//选中的设备
      this.pushSelect = 0
      if(arrobj.length!=0){
        this.devListt = ''
        this.formPush.devIds = []
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
          this.formPush.devIds.push(item.id)
          // this.devList.push(obj)
          this.devListt =this.devListt + item.name + "，"
          return item
        })
        this.devListt = this.devListt.substring(0,this.devListt.length-1)
      }

      console.log(arrobj)
      this.devDialog =false
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
      getVillageAD(this.formSearch).then((res)=>{//查询房间业主/成员分页列表
        console.log(res)
        if(res.data.code == 200){
          this.formData = res.data.data.records.filter((item)=>{
            if(item.gmtCreate){
              item.gmtCreate = this.$root.getDateArray(item.gmtCreate)[9]
            }
            return item
          })
          this.$nextTick(()=>{
            this.total =res.data.data.total
            // this.toggleSelection(this.allSelect)
          })
        }else{
          this.$message(res.data.msg);
        }
      })
    },
    getInit(){//初始化列表
      this.getlist()
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
          }
        }
      })
    },
    addList(addList){//添加
    
      this.$refs[addList].validate((valid) => {
        if (valid) {

          saveVillage(this.formPush).then((res)=>{
            console.log(res)
            if(res.data.code == 200){
              this.getlist()
              this.$message({
                message: '添加成功',
                type: 'success'
              })
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
      updategetVillageAD(this.formUpdate).then((res)=>{
        console.log(res)
        if(res.data.code == 200){
          this.$message({
            message: '修改成功',
            type: 'warning'
          });
          this.getInit()
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
        deleteVillage(ids).then((res)=>{
          console.log(res)
          if(res.data.code == 200){
            this.$message('删除成功');
            this.getInit()
          }
        })
      })
      .catch(_ => {});
    },
    toggleSelection(rows) {//回显
      console.log(rows,this.formData)
      if (rows) {
      let objs = []
      for(let i = 0;i<rows.length; i++){
        console.log(this.formData.find(item=>item.id==rows[i].id))
        if(this.formData.find(item=>item.id==rows[i].id)){
          
          objs.push(this.formData[0])
        }
      } 
      console.log(objs)
      console.log(objs[0]==this.formData[0])
        objs.forEach(row => {
          this.$refs.multipleTable.toggleRowSelection(row);
        });
      } else {
        this.$refs.multipleTable.clearSelection();
      }
    },
    handleSelectionChange(val,self) {//多选
      this.deleBatch = val
      let obj = {}
      let aa = val.find(item=>item.id == self.id) 
      console.log(aa)
      if(aa){
        this.allSelect = [...this.allSelect,...val]
        this.allSelect = this.allSelect.reduce((cur,next) => {
            obj[next.id] ? "" : obj[next.id] = true && cur.push(next);
            return cur;
        },[])
      }else{
        this.allSelect = this.allSelect.filter((item)=>{
          return item.id!=self.id
        })
      }
      console.log(this.allSelect)
      // this.deleBatch = this.allSelect
      // console.log(this.deleBatch)
    },
    handleCurrentPage(val){//页码改变
      this.formSearch.current=val
      this.getInit()
      
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
      this.devListt= ''
      item.nodeList.forEach(item=>{
        this.devListt =this.devListt + item.devName + "，"
      })
      this.devListt = this.devListt.substring(0,this.devListt.length-1)
      this.formUpdate = {
        videoAddress:item.videoAddress,
        title:item.title,
        imgAddress:item.imgAddress,
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
      getVillageAD(this.formSearch).then((res)=>{
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
    paging,
    acsdev
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
  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
</style>