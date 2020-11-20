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
        <el-button size="small" @click="addDialog=true">新 增</el-button>
      </el-form-item>
      <el-form-item>
        <el-button size="small" type="danger" @click="deleInfor(false)">批量删除</el-button>
      </el-form-item>
    </el-form>
    <el-table :data="formData" style="width: 100%" stripe @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55"></el-table-column>
      <el-table-column prop="shopName" label="商家名称"></el-table-column>
      <el-table-column prop="manager" label="操作人员"></el-table-column>
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
					<el-button type="warning" size="small" @click="updateShowBox(scope.row)">修 改</el-button>
					<el-button type="danger" size="small" @click="deleInfor(scope.row.id)">删 除</el-button>
					<el-button type="primary" size="small" @click="details(scope.row)">查看详情</el-button>
        </template>
			</el-table-column>
    </el-table>
    <paging @changePage = handleCurrentPage :get-total='total'></paging>

    <!-- 添加 -->
    <el-dialog title="新增" :visible.sync="addDialog" :close-on-click-modal="false">
      <div class="cont_box_right">
        <el-form label-position="right" :rules="rules" label-width="85px" :model="formPush" ref='addList'> 
          <el-form-item label="选择小区" size="small" prop="xqId">
            <el-select v-model="formPush.xqId" placeholder="请选择小区" @change="changeShopId">
              <el-option v-for="(item,index) in xqTree" :label="item.name" :value="item.id" :key="index"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="商家类型" size="small">
            <el-select @change="changeShopId(formPush.xqId)" v-model="shopId" placeholder="请选择商家类型">
              <el-option v-for="(item,index) in lishopinfo" :label="item.name" :value="item.id" :key="index"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="商家名称" size="small" prop="shopId">
            <el-select v-model="formPush.shopId" placeholder="请选择商家名称">
              <el-option v-for="(item,index) in genreid" :label="item.shopName" :value="item.id" :key="index"></el-option>
            </el-select>
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
          <el-form-item label="选择小区" size="small" prop="xqId">
            <el-select v-model="formUpdate.xqId" placeholder="请选择小区" @change="changeShopId">
              <el-option v-for="(item,index) in xqTree" :label="item.name" :value="item.id" :key="index"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="商家类型" size="small">
            <el-select @change="changeShopId(formUpdate.xqId)" v-model="shopId" placeholder="请选择商家类型">
              <el-option v-for="(item,index) in lishopinfo" :label="item.name" :value="item.id" :key="index"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="商家名称" size="small" prop="shopId">
            <el-select v-model="formUpdate.shopId" placeholder="请选择商家名称">
              <el-option v-for="(item,index) in genreid" :label="item.shopName" :value="item.id" :key="index"></el-option>
            </el-select>
          </el-form-item>
        </el-form>
      </div>

      <div slot="footer" class="dialog-footer">
        <el-button size="medium " @click="updateDialog = false">取 消</el-button>
        <el-button size="medium " @click="updateList('formUpdate')">修 改</el-button>
      </div>
    </el-dialog>
    <!-- 详情 -->
    <el-dialog title="详情" :visible.sync="detailsDialog">
      <div class="cont_box_right">
        <el-form label-position="right" :rules="rules" label-width="85px" :model="formUpdate" ref='formUpdate'> 
          <el-form-item label="商家名称" size="small" prop="shopName">
            <el-input v-model="formUpdate.shopName"></el-input>
          </el-form-item>
          <el-form-item label="商家头像" size="small">
            <el-upload
              :disabled="true"
              class="avatar-uploader"
              :action="uploadToRealPath"
              :show-file-list="false">
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
          <el-form-item label="商家类型" size="small">
            <el-select v-model="formUpdate.genreId" placeholder="请选择商家类型" prop="genreId">
              <el-option label="全部" :value="''"></el-option>
              <el-option v-for="(item,index) in lishopinfo" :label="item.name" :value="item.id" :key="index"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="商家距离" size="small">
            <el-input v-model="formUpdate.distance" placeholder="单位（km）"></el-input>
          </el-form-item>
          <el-form-item label="简介" size="small">
            <el-input v-model="formUpdate.intro"></el-input>
          </el-form-item>
          <el-form-item label="备注、公告" size="small" prop="adesc">
            <el-input type="textarea" v-model="formUpdate.remark" :rows="2" placeholder="请输入内容"></el-input>
          </el-form-item>
          <el-form-item label="图片" size="small" prop="picture">
            <el-upload
              ref="Updata"
              :disabled="true"
              :action="uploadToRealPath"
              list-type="picture-card"
              :file-list="fileList">
              <i class="el-icon-plus"></i>
            </el-upload> 
          </el-form-item>
        </el-form>
      </div>

      <div slot="footer" class="dialog-footer">
        <el-button size="medium " @click="detailsDialog = false">关 闭</el-button>
      </div>
    </el-dialog>
    </section>
</template>

<script>
import paging from "../paging"
import {getgenreid,shopgetdeaie,getlishopinfo,pmtypePhone,ShopDataList,addrecommList,updatecommendList,deleteRecommend,xqSelectList,orgTree } from '../../url/api';
export default {
  data(){
    return{
      checkStrictly:false,
      bindRole:{},
      showmenuList:[],
      menuList:[],
      option1:[],
      fileList:[],
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
      formPush:{},
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
      rules: {
        shopName:[{ required: true, message: '该项不能为空'}],
        address:[{ required: true, message: '该项不能为空'}],
        phone:[{ required: true, message: '该项不能为空'}],
        genreId:[{ required: true, message: '该项不能为空',trigger: 'change'}],
        xqId:[{ required: true, message: '该项不能为空',trigger: 'change'}],
        shopId:[{ required: true, message: '该项不能为空',trigger: 'blur'}],
      },
      lishopinfo:[],
      shopId:'',
      imageUrl:'',
      genreid:[]
    }
  },
  methods:{
    // changeShopId(){
    //   let params = {
    //     genreId:2,
    //     xqId:this.formPush.xqId
    //   }
    //   getgenreid(params).then((res)=>{//添加时查询商家名称
    //     console.log(res)
    //     if(res.data.code == 200){
    //       this.genreid = res.data.data
    //       if(res.data.data){
    //         this.formPush.fkShopId = res.data.data[0].id
    //       }

    //     }
    //   })
    // },
    details(item){//查看详情
      let params = {
        id:item.shopId
      }
      shopgetdeaie(params).then((res)=>{//添加时查询商家名称
        console.log(res)
        if(res.data.code == 200){
      this.fileList= []
      // this.formUpdate = JSON.parse(JSON.stringify(item));
      this.formUpdate = {
        id:item.id,
        shopName:item.shopName,
        remark:item.remark,
        phone:item.phone,
        intro:item.intro,
        distance:item.distance,
        genreId:item.id,
        address:item.address,
        picture:item.picture,
        shopImage:item.shopImage,
      }
      this.imageUrl = item.shopImage
      if(item.picture){
        item.picture.split(',').forEach(item=>{
          let obj = {
            url:item
          }
          if(item){
            this.fileList.push(obj)
          }
          
        })
        
      }
        this.detailsDialog = true
        // this.updateShowBox(res.data.data)
        }
      })
    },
    changeShopId(xqId){
      this.formPush.shopId = ''
      this.formUpdate.shopId = ''
      console.log(xqId)
      let params = {
        genreId:this.shopId,
        xqId:xqId,
      }
      getgenreid(params).then((res)=>{//添加时查询商家名称
        console.log(res)
        if(res.data.code == 200){
          this.genreid = res.data.data
          if(res.data.data){
            this.formPush.shopId = res.data.data[0].id
            // this.formUpdate.shopId = res.data.data[0].id
          }

        }
      })
    },
    getlist(){
      ShopDataList(this.formSearch).then((res)=>{
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
          if(this.xqTree.length!=0){
            this.formSearch.xqId = this.xqTree[0].id
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
      getgenreid({}).then((res)=>{//添加时查询商家名称
        console.log(res)
        if(res.data.code == 200){
          this.genreid= res.data.data
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
          addrecommList(this.formPush).then((res)=>{
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
          let params = this.formUpdate
          updatecommendList(params).then((res)=>{
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
      console.log(item)
      this.formUpdate = {
        id:item.id,
        xqId:item.xqId,
        shopId:parseInt(item.shopId)
      }
      let params = {
        genreId:item.genreId,
        xqId:item.xqId,
      }
      getgenreid(params).then((res)=>{//添加时查询商家名称
        console.log(res)
        if(res.data.code == 200){
          this.genreid = res.data.data
        }
      })
      // this.changeShopId(item.shopId)
      this.shopId = item.genreId
      this.updateDialog = true
      
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
        deleteRecommend(arrId).then((res)=>{
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
