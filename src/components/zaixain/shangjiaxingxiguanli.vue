<template>  
  <section class="modlude">
    <el-form :inline="true" :model="formSearch" class="form_inline" label-width="80px">

      <el-form-item label="选择小区" size="small">
        <el-select v-model="formSearch.xqId" placeholder="请选择小区">
          <el-option v-for="(item,index) in xqTree" :label="item.name" :value="item.id" :key="index"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="商家类型" size="small">
        <el-select v-model="formSearch.genreId" placeholder="请选择商家类型">
          <el-option label="全部" :value="''"></el-option>
          <el-option v-for="(item,index) in lishopinfo" :label="item.name" :value="item.id" :key="index"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="商家名称" size="small">
        <el-input v-model="formSearch.shopName" placeholder="请输入商家名称"></el-input>
      </el-form-item>
      <el-form-item label="简介" size="small">
        <el-input v-model="formSearch.intro" placeholder="请输入简介"></el-input>
      </el-form-item>
      <el-form-item label="联系方式" size="small">
        <el-input v-model="formSearch.phone" placeholder="请输入联系方式"></el-input>
      </el-form-item>
      <el-form-item label="地址" size="small">
        <el-input v-model="formSearch.phone" placeholder="请输入地址"></el-input>
      </el-form-item>
      <el-form-item label="距离" size="small">
        <el-input v-model="formSearch.distance" placeholder="请输入距离"></el-input>
      </el-form-item>
      <el-form-item label="用户昵称" size="small">
        <el-input v-model="formSearch.username" placeholder="请输入用户昵称"></el-input>
      </el-form-item>
      <el-form-item label="状态" size="small">
        <el-select v-model="formSearch.status" placeholder="请选择状态">
          <el-option label="全部" :value="''"></el-option>
          <el-option label="营业中" :value="0"></el-option>
          <el-option label="停业中" :value="1"></el-option>
          <el-option label="删除" :value="2"></el-option>
        </el-select>    
      </el-form-item>
      <el-form-item label="创建人员" size="small">
        <el-input v-model="formSearch.creator" placeholder="请输入创建人员"></el-input>
      </el-form-item>
      <el-form-item label="创建时间" size="small">
        <el-date-picker
          v-model="formSearch.gmtCreate"
          type="datetime"
          value-format="timestamp"
          placeholder="创建时间">
        </el-date-picker>
      </el-form-item>
      <el-form-item>
        <el-button size="small" @click="getlist">查 询</el-button>
      </el-form-item>
      <el-form-item>
        <el-button size="small" @click="addDialog=true,checkList=[],formPush.shopImage=''">新 增</el-button>
      </el-form-item>
      <el-form-item>
        <el-button size="small" type="danger" @click="deleInfor(false)">批量删除</el-button>
      </el-form-item>
    </el-form>
    <el-table :data="formData" style="width: 100%" stripe @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55"></el-table-column>
      <el-table-column prop="shopName" label="商家昵称"></el-table-column>
      <el-table-column prop="intro" label="简介"></el-table-column>
      <el-table-column prop="distance" label="距离"></el-table-column>
      <el-table-column prop="phone" label="联系方式"></el-table-column>
      <el-table-column prop="address" label="地址"></el-table-column>
      <el-table-column prop="genre" label="类型"></el-table-column>
      <el-table-column prop="status" label="状态">
        <template slot-scope="scope">
					{{scope.row.status==0?"营业":scope.row.status==1?"停业":"删除"}}
				</template>
      </el-table-column>
      <el-table-column prop="" label="创建时间">
        <template slot-scope="scope" v-if="scope.row.gmtCreate">
          {{$root.getDateArray(scope.row.gmtCreate)[9]}}
        </template>
      </el-table-column>
      <el-table-column label="操作" fixed="right" width=320>
				<template slot-scope="scope">
          <el-button size="small" @click="updshopinfo(scope.row.id)">{{scope.row.status==0?"停业":scope.row.status==1?"营业":"错误"}}</el-button>
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
          <el-form-item label="商家名称" size="small" prop="shopName">
            <el-input v-model="formPush.shopName"></el-input>
          </el-form-item>
          <el-form-item label="商家头像" size="small" prop="shopName">
            <el-upload
              class="avatar-uploader"
              :action="uploadToRealPath"
              :show-file-list="false"
              :on-success="handleAvatarSuccess">
              <img v-if="imageUrl" :src="imageUrl" class="avatar">
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
          </el-form-item>
          <el-form-item label="商家电话" size="small" prop="phone">
            <el-input v-model="formPush.phone"></el-input>
          </el-form-item>
          <el-form-item label="地址" size="small" prop="address">
            <el-input v-model="formPush.address"></el-input>
          </el-form-item>
          <el-form-item label="商家类型" size="small" prop="genreId">
            <el-select v-model="formPush.genreId" placeholder="请选择商家类型" @change="getshoptype(formPush.genreId,formPush.xqId)">
              <el-option v-for="(item,index) in lishopinfo" :label="item.name" :value="item.id" :key="index"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="服务类型" size="small" v-if="formPush.genreId&&formPush.genreId==1||formPush.genreId==3||formPush.genreId==4||formPush.genreId==5||formPush.genreId==8">
            <el-checkbox-group v-model="checkList">
              <el-checkbox v-for="item in shoptype" :key="item.id" :label="item.id" :value="item.id">{{item.name}}</el-checkbox>
            </el-checkbox-group>          
          </el-form-item>
          <el-form-item label="起送金额" size="small" v-if="formPush.genreId==2">
            <el-input v-model="formPush.deliveryMoney" placeholder="请输入起送金额"></el-input>
          </el-form-item>
          <el-form-item label="商家距离" size="small" prop="distance">
            <el-input v-model="formPush.distance" placeholder="单位（km）"></el-input>
          </el-form-item>
          <el-form-item label="简介" size="small" prop="intro">
            <el-input v-model="formPush.intro"></el-input>
          </el-form-item>
          <el-form-item label="备注、公告" size="small" prop="remark">
            <el-input type="textarea" v-model="formPush.remark" :rows="2" placeholder="请输入内容"></el-input>
          </el-form-item>
          <el-form-item label="宣传图片" size="small" prop="picture">
            <el-upload
              ref="addUpdata"
              :action="uploadToRealPath"
              list-type="picture-card"
              :headers='headers'
              :auto-upload="false"
              :on-change="onChange"
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
    <el-dialog :title="detailsDialog?'修改':'详情'" :visible.sync="updateDialog" :close-on-click-modal="false">
      <div class="cont_box_right">
        <el-form label-position="right" :rules="rules" label-width="85px" :model="formUpdate" ref='formUpdate'> 
          <el-form-item label="商家名称" size="small" prop="shopName">
            <el-input v-model="formUpdate.shopName"></el-input>
          </el-form-item>
          <el-form-item label="商家头像" size="small">
            <el-upload
              class="avatar-uploader"
              :action="uploadToRealPath"
              :show-file-list="false"
              :on-success="handleAvatarSuccess">
              <img v-if="imageUrl" :src="imageUrl" class="avatar">
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
          </el-form-item>
          <el-form-item label="商家电话" size="small" prop="phone">
            <el-input v-model="formUpdate.phone"></el-input>
          </el-form-item>
          <el-form-item label="地址" size="small" prop="address">
            <el-input v-model="formUpdate.address"></el-input>
          </el-form-item>
          <el-form-item label="商家类型" size="small" prop="genreId">
            <el-select v-model="formUpdate.genreId" placeholder="请选择商家类型" @change="getshoptype(formUpdate.genreId,formUpdate.xqId)">
              <el-option v-for="(item,index) in lishopinfo" :label="item.name" :value="item.id" :key="index"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="服务类型" size="small" v-if="formUpdate.genreId&&formUpdate.genreId==1||formUpdate.genreId==3||formUpdate.genreId==4||formUpdate.genreId==5||formUpdate.genreId==8">
            <el-checkbox-group v-model="checkList">
              <el-checkbox v-for="item in shoptype" :key="item.id" :label="item.id" :value="item.id">{{item.name}}</el-checkbox>
            </el-checkbox-group>          
          </el-form-item>
          <el-form-item label="起送金额" size="small" v-if="formUpdate.genreId==2">
            <el-input v-model="formUpdate.deliveryMoney" placeholder="请输入起送金额"></el-input>
          </el-form-item>
          <el-form-item label="商家距离" size="small" prop="distance">
            <el-input v-model="formUpdate.distance" placeholder="单位（km）"></el-input>
          </el-form-item>
          <el-form-item label="简介" size="small" prop="intro">
            <el-input v-model="formUpdate.intro"></el-input>
          </el-form-item>
          <el-form-item label="备注、公告" size="small" prop="remark">
            <el-input type="textarea" v-model="formUpdate.remark" :rows="2" placeholder="请输入内容"></el-input>
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
import {getshoptype,getlishopinfo,pmtypePhone,updshopinfo, merchantList,addshopinfo,updateMerchantList,deleteMerchantList,xqSelectList,orgTree } from '../../url/api';
export default {
  data(){
    return{
      checkStrictly:false,
      bindRole:{},
      showmenuList:[],
      checkList:[],
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
      pictrueNum:0,
      formPush:{
        deliveryMoney:0
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
        shopName:[{ required: true, message: '该项不能为空'}],
        address:[{ required: true, message: '该项不能为空'}],
        phone:[{ required: true, message: '该项不能为空'}],
        distance:[{ required: true, message: '该项不能为空'}],
        intro:[{ required: true, message: '该项不能为空'}],
        remark:[{ required: true, message: '该项不能为空'}],
        genreId:[{ required: true, message: '该项不能为空',trigger: 'change'}],
        xqId:[{ required: true, message: '该项不能为空',trigger: 'change'}],
      },
      dialogImageUrl:'',
      imageUrl:'',
      dialogVisible:false,
      fileList: [],
      shoptype:[],
      lishopinfo:[]
    }
  },
  methods:{
    updshopinfo(id){//在线生活商家管理修改商家状态
      let params ={
        id:id
      }
      updshopinfo(params).then((res)=>{
        console.log(res)
        if(res.data.code == 200){
            this.getlist()
            this.$message({
              message: '修改成功',
              type: 'success'
            });
        }else{
            this.$message({
              message: '修改失败',
            });  
        }
      })
    },
    onChange(file, fileList){
      console.log(file, fileList)
      this.dialogImageUrl = URL.createObjectURL(file.raw);
      this.fileList = fileList
    },
    getlist(){
      merchantList(this.formSearch).then((res)=>{
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

    handleRemove(file, fileList) {
      console.log(file, fileList);
      this.fileList = fileList
    },
    getshoptype(genreId,xqId){//商家信息添加时调用
      let params = {
        xqId:xqId,
        classify:genreId
      }
      getshoptype(params).then(res=>{
        console.log(res)
        if(res.data.code == 200){
          this.shoptype = res.data.data
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
        console.log(this.checkList)
        this.formPush.subdivide = ''
        this.checkList.forEach(item=>{
          this.formPush.subdivide = item+","+this.formPush.subdivide
        })
        if(this.formPush.genreId==2||this.formPush.genreId==6||this.formPush.genreId==7){
          this.formPush.subdivide=''
        }else{
          this.formPush.deliveryMoney=0
          if(!this.formPush.subdivide){
            this.$message("请选择服务类型")
            return
          }
        }
        if(!this.formPush.shopImage){
          this.$message("请上传头像")
          return 
        }
        console.log(this.formPush)
        this.$refs[addList].validate((valid) => {
          if (valid) {
            if(this.fileList.length == 0){
              let params =  {
                phone:this.formPush.phone
              }
              pmtypePhone(params).then((ress)=>{
                console.log(ress)
                if(ress.data.code == 200){
                  addshopinfo(this.formPush).then((res)=>{
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
                }else{
                  this.$message(ress.data.msg)
                }
              })
            
            }else{
              this.formPush.picture = ''
              this.pictrueNum=0
              this.$nextTick(function () {//提交图片
              　　this.$refs.addUpdata.submit();
              })
            }
            this.addDialog = false
          } else {
            console.log('error submit!!');
            return false;
          }
        });


    },
    updateList(formName){//修改
       this.formUpdate.subdivide = ''
        this.checkList.forEach(item=>{
          this.formUpdate.subdivide = item+","+this.formUpdate.subdivide
        })
        if(this.formUpdate.genreId==2||this.formUpdate.genreId==6||this.formUpdate.genreId==7){
          this.formUpdate.subdivide=''
        }else{
          this.formUpdate.deliveryMoney=0
          if(!this.formUpdate.subdivide){
            this.$message("请选择服务类型")
            return
          }
        }
      this.$refs[formName].validate((valid) => {
        if (valid) {
            this.formUpdate.picture = ''
            console.log(this.fileList)
            this.fileList.forEach(item=>{
              if(item.response){
                type = true
                 this.formUpdate.picture = item.response.data[0]+","+this.formUpdate.picture
              }else{
                this.formUpdate.picture = item.url+","+this.formUpdate.picture
                
              }
            })
            let params = this.formUpdate
            updateMerchantList(params).then((res)=>{
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
      this.formPush.shopImage = res.data[0]
    },
    handleAvatarSuccess1(res, file) {
      console.log(res, file)
      this.pictrueNum++;
      this.formPush.picture = res.data[0]+","+this.formPush.picture
      if(this.pictrueNum == this.fileList.length){
        addshopinfo(this.formPush).then((res)=>{
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
      }
    },
    handleAvatarSuccess2(res, file,fileList) {
      console.log(res, file,fileList)
      this.fileList= fileList
      // let params = this.formUpdate
      // updateMerchantList(params).then((res)=>{
      //   console.log(res)
      //   if(res.data.code == 200){
      //     this.$message({
      //       message: '修改成功',
      //       type: 'warning'
      //     });
      //     this.getlist()
      //   }
      // })
      
    },
    updateShowBox(item){//修改东西弹窗
      this.fileList= []
      // this.formUpdate = JSON.parse(JSON.stringify(item));
      this.formUpdate = {
        id:item.id,
        shopName:item.shopName,
        remark:item.remark,
        phone:item.phone,
        intro:item.intro,
        distance:item.distance,
        genreId:item.genreId,
        address:item.address,
        picture:item.picture,
        shopImage:item.shopImage,
        deliveryMoney:item.deliveryMoney,
        xqId:item.xqId
      }
      if(item.subdivideid){

        let aa = item.subdivideid.substr(0,item.subdivideid.length-1).split(",").filter(iitem=>{
          iitem = Number(iitem)
          this.checkList.push(iitem)
          return iitem
        })
        console.log(this.checkList)
      }
      
      this.getshoptype(this.formUpdate.genreId,this.formUpdate.xqId)
      this.imageUrl = item.shopImage
      this.updateDialog = true
      if(item.picture){
        item.picture.split(',').forEach(item=>{
          let obj = {
            url:item,
          }
          if(item){
            this.fileList.push(obj)
          }
          
        })
        
      }
      console.log(this.formUpdate,item)
      
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
        deleteMerchantList(arrId).then((res)=>{
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
