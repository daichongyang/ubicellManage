<template>  
  <section class="modlude">
    <el-form :inline="true" :model="formSearch" class="form_inline" label-width="80px">
      <el-form-item label="选择小区" size="small">
        <el-select v-model="formSearch.xqId" placeholder="请选择小区">
          <el-option v-for="(item,index) in xqTree" :label="item.name" :value="item.id" :key="index"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="分类" size="small">
        <el-select v-model="formSearch.classify" placeholder="分类">
          <el-option label="外卖店" :value="1"></el-option>
          <el-option label="小件速递店" :value="2"></el-option>
          <el-option label="房屋租售" :value="3"></el-option>
          <el-option label="家政店" :value="4"></el-option>
          <el-option label="洗衣店" :value="5"></el-option>
          <el-option label="快递店" :value="6"></el-option>
          <el-option label="搬家店" :value="7"></el-option>
          <el-option label="周边商圈" :value="8"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="商品名称" size="small">
        <el-input v-model="formSearch.goodsName" placeholder="请输入商品名称"></el-input>
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
      <el-table-column prop="goodsName" label="商品名称"></el-table-column>
      <el-table-column prop="shopName" label="商家名称"></el-table-column>
      <el-table-column prop="classify" label="分类">
        <template slot-scope="scope">
          {{scope.row.classify==1?"外卖店":scope.row.classify==2?"小件速递店":scope.row.classify==3?"房屋租售":scope.row.classify==4?"家政店":scope.row.classify==5?"洗衣店":scope.row.classify==6?"快递店":scope.row.classify==7?"搬家店":"周边商圈"}}
        </template>
      </el-table-column>
      <el-table-column prop="cname" label="创建人员"></el-table-column>
      <el-table-column prop="" label="创建时间" width="150">
        <template slot-scope="scope" v-if="scope.row.gmtCreate">
          {{$root.getDateArray(scope.row.gmtCreate)[9]}}
        </template>
      </el-table-column>
      <el-table-column label="操作" fixed="right" width=200>
				<template slot-scope="scope">
					<el-button type="warning" size="small" @click="updateShowBox(scope.row)">修 改</el-button>
					<el-button type="danger" size="small" @click="deleInfor(scope.row.id)">删 除</el-button>
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
          <el-form-item label="商品名称" size="small" prop="goodsName">
            <el-input v-model="formPush.goodsName"></el-input>
          </el-form-item>
          <!-- <el-form-item label="商家类型" size="small">
            <el-select @change="changeShopId" v-model="shopId" placeholder="请选择商家类型">
              <el-option label="全部" :value="''"></el-option>
              <el-option v-for="(item,index) in lishopinfo" :label="item.name" :value="item.id" :key="index"></el-option>
            </el-select>
          </el-form-item> -->
          <el-form-item label="商家名称" size="small" prop="fkShopId">
            <el-select v-model="formPush.fkShopId" placeholder="请选择商家名称">
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
          <el-form-item label="商品名称" size="small" prop="goodsName">
            <el-input v-model="formUpdate.goodsName"></el-input>
          </el-form-item>
          <el-form-item label="商家名称" size="small" prop="fkShopId">
            <el-select v-model="formPush.fkShopId" placeholder="请选择商家名称">
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
    </section>
</template>

<script>
import paging from "../paging"
import {getgenreid,getlishopinfo,pmtypePhone,shopgoodsList,addShopgoodsList,updateShopgoodsList,deleletShopgoodsList,xqSelectList,orgTree } from '../../url/api';
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
        goodsName:[{ required: true, message: '该项不能为空'}],
        address:[{ required: true, message: '该项不能为空'}],
        phone:[{ required: true, message: '该项不能为空'}],
        fkShopId:[{ required: true, message: '该项不能为空',trigger: 'change'}],
        genreId:[{ required: true, message: '该项不能为空',trigger: 'change'}],
        xqId:[{ required: true, message: '该项不能为空',trigger: 'change'}],
        shopId:[{ required: true, message: '该项不能为空',trigger: 'change'}],
      },
      lishopinfo:[],
      shopId:'',
      imageUrl:'',
      genreid:[]
    }
  },
  methods:{
    changeShopId(){
      // this.formPush.shopId = ''
      // this.formUpdate.shopId = ''
      // console.log(val)
      let params = {
        genreId:2
      }
      getgenreid(params).then((res)=>{//添加时查询商家名称
        console.log(res)
        if(res.data.code == 200){
          this.genreid = res.data.data
          if(res.data.data){
            this.formPush.fkShopId = res.data.data[0].id
            // this.formUpdate.shopId = res.data.data[0].id
          }

        }
      })
    },
    getlist(){
      shopgoodsList(this.formSearch).then((res)=>{
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
          if(this.xqTree.length!=0){
            this.formSearch.xqId = this.xqTree[0].id
          }
        }
      })
      // getlishopinfo({}).then((res)=>{//查询所有的商家类型
      //   console.log(res)
      //   if(res.data.code == 200){
      //     this.lishopinfo = res.data.data
      //   }
      // })
      let getgenreidp = {
        genreId:2
      }
      getgenreid(getgenreidp).then((res)=>{//添加时查询商家名称
        console.log(res)
        if(res.data.code == 200){
          this.genreid= res.data.data
          this.formPush.fkShopId = res.data.data[0].id
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
          addShopgoodsList(this.formPush).then((res)=>{
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
          updateShopgoodsList(params).then((res)=>{
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
        xqId:item.xqId,
        goodsName:item.goodsName,
        fkShopId:item.fkShopId
      }

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
        deleletShopgoodsList(arrId).then((res)=>{
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

</style>
