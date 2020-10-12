<template>
  <section class="modlude">
    <el-form :inline="true" :model="formSearch" class="form_inline" label-width="90px">
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
      </el-form-item> -->
      <el-form-item label="选择小区" size="small" prop="xqId">
        <el-select v-model="formSearch.xqId" placeholder="请选择小区" @change="formSearch1.xqId=formSearch.xqId">
          <el-option v-for="item in xqTree" :label="item.name" :value="item.id" :key="item.id"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="getlist">查询</el-button>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="addData">添加图片</el-button>
      </el-form-item>
      <el-form-item>
        <el-button type="primary">添加视频</el-button>
      </el-form-item>
    </el-form>
    <div class="app_advertise">
      <div class="app_advertise_item" v-for="(item,index) in formData" :key="index" @click="getItem(index)">
        <div>位置{{index+1}}</div>
        <div class="app_advertise_item_l">
            <el-image v-if="item.id" style="width:178px;height:178px;" :src="item.address"></el-image>
            <el-upload
              v-else
              ref="addUpdata"
              class="avatar-uploader"
              :action="uploadToRealPath"
              :headers='headers'
              :show-file-list="false"
              :on-success="handleAvatarSuccess1"
              >
              <img v-if="imageUrl1" :src="imageUrl1" class="avatar">              
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload> 
        </div>
        <div>
          <el-button type="text" @click="upData(index)">上移</el-button>
          <el-button type="text" @click="downData(index)">下移</el-button>
          <el-button type="text" @click="upCharu(index)">向上插入</el-button>
          <el-button type="text" @click="downCharu(index)">向下插入</el-button>
          <el-button type="text" @click="deleteVillage(index)">删除</el-button>
        </div>
      </div>
    </div>
    <div style="margin-top:20px;text-align:center;"><el-button type="primary" @click="saveData">保 存</el-button></div>
  </section>
</template>

<script>
import { toTenementAD,updatePicture,orgTree,xqSelectList } from '../../url/api';
export default {
  data(){
    return{
      option1:[],
      uploadToRealPath:'/intellmanagerV3.0/upload/file/upload',
      headers:{
        Authorization:sessionStorage.getItem('Authorization'),
        token:sessionStorage.getItem('token')
      },
      formData:[],
      formSearch:{},
      formPush:{
        delIds:[],
        pictureNodes:[],
      },
      xqTree:[],
      dataTree:[],
      formSearch:{//查询条件
        orgId:'',
        xqId: ''
      },
      imageUrl:'',
      indexBianhao:0,
      imageUrl1:'',
      defaultProps2: {
        children: 'children',
        label: 'name',
        value: 'id',
        expandTrigger: 'hover',checkStrictly: true
      },
      picArr:[]
    }
  },
  methods:{
    getItem(index){
      console.log(index)
      this.indexBianhao = index
    },
    deleteVillage(index){//删除
      this.formData.splice(index,1)
    },
    getlist(){
      let params = this.formSearch
      toTenementAD(params).then((res)=>{//
        console.log(res)
        if(res.data.code == 200){
          this.formData = res.data.data.filter((item)=>{
            return item
          })
        }else{
          this.$message(res.data.msg);
        }
      })
    },
    initData(){
      // let org_tree={
      //       name:'',
      //       status:1
      //     }
      // orgTree(org_tree).then((res)=>{//组织列表
      //   console.log(res)
      //   if(res.data.code == 200){
      //     this.dataTree = res.data.data
      //     this.formSearch.orgId= this.dataTree[0].id
      //   }
      // })
      let org_tree1={}
      xqSelectList(org_tree1).then((res)=>{//小区选择列表
        console.log(res)
        if(res.data.code == 200){
          this.xqTree = res.data.data
          if(this.xqTree.length!=0){
            this.formSearch.xqId = this.xqTree[0].id
            this.formPush.xqId = this.xqTree[0].id
            this.getlist()
          }
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
    upData(index){//上移
      if(index!=0){
        let obj1 = {
          address:''
        }
        let obj2 = {
          address:''
        }
        obj1.address=this.formData[index].address
        obj2.address=this.formData[index-1].address

        this.formData[index].address = obj2.address
        this.formData[index-1].address = obj1.address

      }
    },
    downData(index){//下移
      if(index != this.formData.length-1){
        let obj1 = {
          address:''
        }
        let obj2 = {
          address:''
        }
        obj1.address=this.formData[index].address
        obj2.address=this.formData[index+1].address

        this.formData[index].address = obj2.address
        this.formData[index+1].address = obj1.address
      }
    },
    upCharu(){//插入

    },
    downCharu(){//插入

    },
    addData(){//添加
      let obj = {
        address:''
      }
      this.formData.push(obj)
      // indexbianhao = this.formData.length-1
    },
    saveData(){
      let obj=[]
      this.formData.forEach(item=>{
        if(item.address){
          let itemObj = {
            address:item.address
          }
          obj.push(itemObj)
        }

      })
      this.formPush.pictureNodes=obj
      updatePicture(this.formPush).then((res)=>{
        console.log(res)
        if(res.data.code == 200){
          this.getlist()
          this.picArr = []
          this.$message({
            message: '添加成功',
            type: 'success'
          })
        }else{
          this.$message('添加失败')
        }
      })
    },
    handleAvatarSuccess1(res, file,fileList) {
      console.log(res, file,fileList)
      this.imageUrl = res.data[0];
      this.imageUrl1=URL.createObjectURL(file.raw);
      this.formData[this.indexBianhao].address = this.imageUrl
      console.log(this.formData,this.indexBianhao)
    },
  },
  mounted(){
    this.initData()
  }
}
</script>

<style scoped>
  .app_advertise{
    border:1px solid #1fc9f3;
  }
  .app_advertise_item{
    display:flex;
    align-items: center;
    justify-content: center;
    border-top:1px solid #1fc9f3;
  }
  .app_advertise_item:first-child{
    border:0px
  }
  .app_advertise_item_l{
    margin:10px 20px;
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