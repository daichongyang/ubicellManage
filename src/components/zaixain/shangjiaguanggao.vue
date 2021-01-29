<template>  
  <section class="modlude">
    <el-form :inline="true" :model="formSearch" class="form_inline" label-width="80px">

      <el-form-item label="选择小区" size="small">
        <el-select v-model="formSearch.xqId" placeholder="请选择小区">
          <el-option v-for="(item,index) in xqTree" :label="item.name" :value="item.id" :key="index"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button size="small" @click="getlist">查 询</el-button>
      </el-form-item>
      <el-form-item>
        <el-button size="small" @click="addDialog=true,imageUrl='',imageUrl3=''">新 增</el-button>
      </el-form-item>
      <el-form-item>
        <el-button size="small" type="danger" @click="deleInfor(false)">批量删除</el-button>
      </el-form-item>
    </el-form>
    <el-table :data="formData" style="width: 100%" stripe @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55"></el-table-column>
      <el-table-column prop="url" label="超链接"></el-table-column>
      <el-table-column prop="advertType" label="类型">
        <template slot-scope="scope">
					{{scope.row.advertType==1?"只有图片":scope.row.advertType==2?"图片带超连接":"图片带详情介绍"}}
				</template>
      </el-table-column>
      <el-table-column prop="bmanager" label="操作人员"></el-table-column>
      <el-table-column prop="" label="添加时间">
        <template slot-scope="scope" v-if="scope.row.gmtCreate">
          {{$root.getDateArray(scope.row.gmtCreate)[9]}}
        </template>
      </el-table-column>
      <el-table-column prop="" label="修改时间">
        <template slot-scope="scope" v-if="scope.row.gmtModified">
          {{$root.getDateArray(scope.row.gmtModified)[9]}}
        </template>
      </el-table-column>
      <el-table-column label="操作" fixed="right" width=250>
				<template slot-scope="scope">
					<el-button type="warning" size="small" @click="updateShowBox(scope.row),detailsDialog = true">修 改</el-button>
					<el-button type="danger" size="small" @click="deleInfor(scope.row.id)">删 除</el-button>
					<el-button type="primary" size="small" @click="updateShowBox(scope.row),detailsDialog=false">查看详情</el-button>
        </template>
			</el-table-column>
    </el-table>
    <paging @changePage = handleCurrentPage :get-total='total'></paging>

    <!-- 添加 -->
    <el-dialog title="新增" :visible.sync="addDialog" :close-on-click-modal="false">
      <div class="cont_box_right">
        <el-form label-position="right" :rules="rules" label-width="85px" :model="formPush" ref='addList'> 
          <el-form-item label="选择小区" size="small" prop="xqId">
            <el-select v-model="formPush.xqId" placeholder="请选择小区">
              <el-option v-for="(item,index) in xqTree" :label="item.name" :value="item.id" :key="index"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="广告类型" size="small">
            <el-select v-model="formPush.advertType" placeholder="请选择广告类型" prop="advertType">
              <el-option label="只有图片" :value="1"></el-option>
              <el-option label="图片带超连接" :value="2"></el-option>
              <el-option label="图片带详情介绍" :value="3"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="广告图片" size="small" prop="mapPicture">
            <el-upload
              class="avatar-uploader"
              :action="uploadToRealPath"
              :show-file-list="false"
              :on-success="handleAvatarSuccess">
              <img v-if="imageUrl" :src="imageUrl" class="avatar">
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
          </el-form-item>
          <el-form-item label="链接地址" size="small" v-if="formPush.advertType!=1">
            <el-input v-model="formPush.url"></el-input>
          </el-form-item>
          <el-form-item label="商家名称" size="small" v-if="formPush.advertType==3">
            <el-input v-model="formPush.areaName"></el-input>
          </el-form-item>
          <el-form-item label="简介图片" size="small" v-if="formPush.advertType==3">
            <el-upload
              class="avatar-uploader"
              :action="uploadToRealPath"
              :show-file-list="false"
              :on-success="handleAvatarSuccess3">
              <img v-if="imageUrl3" :src="imageUrl3" class="avatar">
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
          </el-form-item>
          <el-form-item label="商家电话" size="small" v-if="formPush.advertType==3">
            <el-input v-model="formPush.phone"></el-input>
          </el-form-item>
          <el-form-item label="地址" size="small" v-if="formPush.advertType==3">
            <el-input v-model="formPush.address" type="textarea" :autosize="{ minRows: 2, maxRows: 4}"></el-input>
          </el-form-item>
          <el-form-item label="简介" size="small" v-if="formPush.advertType==3">
            <el-input v-model="formPush.intro" type="textarea" :autosize="{ minRows: 2, maxRows: 4}"></el-input>
          </el-form-item>
          <el-form-item label="宣传图片" size="small" prop="picture" v-if="formPush.advertType==3">
            <el-upload
              ref="addUpdata"
              :action="uploadToRealPath"
              list-type="picture-card"
              :headers='headers'
              :on-success="handleAvatarSuccess1"
              :on-remove="handleRemove">
              <i class="el-icon-plus"></i>
            </el-upload> 
            <el-dialog :visible.sync="dialogVisible">
              <img width="100%" :src="dialogImageUrl" alt="">
            </el-dialog>         
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
        <el-form label-position="right" :rules="rules" label-width="85px" :model="formUpdate" ref='formUpdate'> 
          <el-form-item label="广告类型" size="small">
            <el-select v-model="formUpdate.advertType" placeholder="请选择广告类型" prop="advertType">
              <el-option label="只有图片" :value="1"></el-option>
              <el-option label="图片带超连接" :value="2"></el-option>
              <el-option label="图片带详情介绍" :value="3"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="广告图片" size="small" prop="mapPicture">
            <el-upload
              class="avatar-uploader"
              :action="uploadToRealPath"
              :show-file-list="false"
              :on-success="handleAvatarSuccess">
              <img v-if="imageUrl" :src="imageUrl" class="avatar">
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
          </el-form-item>
          <el-form-item label="链接地址" size="small" v-if="formUpdate.advertType!=1">
            <el-input v-model="formUpdate.url"></el-input>
          </el-form-item>
          <el-form-item label="商家名称" size="small" v-if="formUpdate.advertType==3">
            <el-input v-model="formUpdate.areaName"></el-input>
          </el-form-item>
          <el-form-item label="简介图片" size="small" v-if="formUpdate.advertType==3">
            <el-upload
              class="avatar-uploader"
              :action="uploadToRealPath"
              :show-file-list="false"
              :on-success="handleAvatarSuccess3">
              <img v-if="imageUrl3" :src="imageUrl3" class="avatar">
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
          </el-form-item>
          <el-form-item label="商家电话" size="small" v-if="formUpdate.advertType==3">
            <el-input v-model="formUpdate.phone"></el-input>
          </el-form-item>
          <el-form-item label="地址" size="small" v-if="formUpdate.advertType==3">
            <el-input v-model="formUpdate.address"></el-input>
          </el-form-item>
          <el-form-item label="简介" size="small" v-if="formUpdate.advertType==3">
            <el-input v-model="formUpdate.intro" type="textarea" :autosize="{ minRows: 2, maxRows: 4}"></el-input>
          </el-form-item>
          <el-form-item label="图片" size="small" prop="picture">
            <el-upload
              ref="Updata"
              :action="uploadToRealPath"
              list-type="picture-card"
              :headers='headers'
              :file-list="fileList"
              :on-success="handleAvatarSuccess2"
              :on-remove="handleRemove">
              <i class="el-icon-plus"></i>
            </el-upload> 
            <el-dialog :visible.sync="dialogVisible">
              <img width="100%" :src="dialogImageUrl" alt="">
            </el-dialog>
          </el-form-item>
        </el-form>
      </div>

      <div slot="footer" class="dialog-footer">
        <el-button size="medium " @click="updateDialog = false">取 消</el-button>
        <el-button v-if="detailsDialog" size="medium " @click="updateList('formUpdate')">修 改</el-button>
      </div>
    </el-dialog>
    </section>
</template>

<script>
import paging from "../paging"
import {getlishopinfo, advchantList,addAdvchantList,updateAdvchantList,deleteAdvchantList,xqSelectList,orgTree } from '../../url/api';
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
        xqId:'',
        current:1,
        size:10
      },
      applyInfos:{},
      formData: [],//数据
      deleBatch: [],//删除数据
      formUpdate:{},//修改表单
      total: 0,//数据总数
      pages:0,//页面总数
      addDialog:false,
      updateDialog:false,
      detailsDialog:false,
      formPush:{
        advertType:1
      },
      uploadToRealPath:'/intellmanagerV3.0/upload/file/upload',
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
      headers:{
        Authorization:sessionStorage.getItem('Authorization'),
        token:sessionStorage.getItem('token')
      },
      rules: {
        areaName:[{ required: true, message: '该项不能为空'}],
        address:[{ required: true, message: '该项不能为空'}],
        mapPicture:[{ required: true, message: '该项不能为空'}],
        advertType:[{ required: true, message: '该项不能为空',trigger: 'change'}],
        xqId:[{ required: true, message: '该项不能为空',trigger: 'change'}],
      },
      dialogImageUrl:'',
      imageUrl:'',
      imageUrl3:'',
      dialogVisible:false,
      fileList: [],
      lishopinfo:[]
    }
  },
  methods:{
    getlist(){
      advchantList(this.formSearch).then((res)=>{
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
      
      xqSelectList({}).then((res)=>{//小区选择列表
        console.log(res)
        if(res.data.code == 200){
          this.xqTree = res.data.data
          if(res.data.data){
            this.formSearch.xqId = res.data.data[0].id
            this.getlist()
          }
        }
      })
      getlishopinfo({}).then((res)=>{//查询所有的商家类型
        console.log(res)
        if(res.data.code == 200){
          this.lishopinfo = res.data.data
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
            this.formPush.areaImage = ''
            this.fileList.forEach(item=>{
              this.formPush.areaImage = item.response.data[0]+","+this.formPush.areaImage
            })
            addAdvchantList(this.formPush).then((res)=>{
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
            this.formUpdate.areaImage = ''
            this.fileList.forEach(item=>{
              if(item.response){
                this.formUpdate.areaImage = item.response.data[0]+","+this.formPush.areaImage
              }else{
                this.formUpdate.areaImage = item.url+","+this.formPush.areaImage
              }
              
            })
          let params = this.formUpdate
          updateAdvchantList(params).then((res)=>{
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
    handleAvatarSuccess(res, file) {
      console.log(res, file)
      this.imageUrl = URL.createObjectURL(file.raw);
      this.formPush.mapPicture = res.data[0]
    },
    handleAvatarSuccess3(res, file) {
      console.log(res, file)
      this.imageUrl3 = URL.createObjectURL(file.raw);
      this.formPush.areaPic = res.data[0]
    },

    handleAvatarSuccess1(res, file,fileList) {//添加多个
      console.log(res, file,fileList)
      this.fileList = fileList
    },
    handleAvatarSuccess2(res, file) {//修改多个
      console.log(res, file)
      this.fileList = fileList
      
    },
    handleRemove(file, fileList) {
      console.log(file, fileList);
      this.fileList = fileList
    },
    updateShowBox(item){//修改东西弹窗
      this.fileList= []
      // this.formUpdate = JSON.parse(JSON.stringify(item));
      this.formUpdate = {
        id:item.id,
        areaName:item.areaName,
        address:item.address,
        advertType:item.advertType,
        areaImage:item.areaImage,
        areaPic:item.areaPic,
        intro:item.intro,
        phone:item.phone,
        url:item.url,
        mapPicture:item.mapPicture,
        xqId:item.xqId,
      }
      this.imageUrl = item.mapPicture
      this.imageUrl3 = item.areaPic
      this.updateDialog = true
      if(item.areaImage){
        item.areaImage.split(',').forEach(item=>{
          let obj = {
            url:item
          }
          if(item){
            this.fileList.push(obj)
          }
          
        })
        
      }
      console.log(this.formUpdate,this.fileList)
      
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
        deleteAdvchantList(arrId).then((res)=>{
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
      console.log(this.deleBatch)
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
