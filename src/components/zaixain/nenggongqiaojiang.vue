<template>  
  <section class="modlude">
    <el-form :inline="true" :model="formSearch" class="form_inline" label-width="80px">
      <el-form-item label="选择小区" size="small">
        <el-select v-model="formSearch.xqId" placeholder="请选择小区">
          <el-option v-for="(item,index) in xqTree" :label="item.name" :value="item.id" :key="index"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="审核状态" size="small">
        <el-select v-model="formSearch.isVerify	" placeholder="审核状态">
          <el-option label="未审核" :value="0"></el-option>
          <el-option label="审核通过" :value="1"></el-option>
          <el-option label="不通过" :value="2"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="类型" size="small">
        <el-select v-model="formSearch.typeId	" placeholder="类型">
          <el-option label="能工巧匠" :value="0"></el-option>
          <el-option label="求助" :value="1"></el-option>

        </el-select>
      </el-form-item>
      <el-form-item label="手机号" size="small">
        <el-input v-model="formSearch.phone" placeholder="请输入手机号"></el-input>
      </el-form-item>
      <el-form-item label="用户名" size="small">
        <el-input v-model="formSearch.nickname" placeholder="请输入用户名"></el-input>
      </el-form-item>
      <el-form-item label="审核人员" size="small">
        <el-input v-model="formSearch.verifier" placeholder="请输入审核人员"></el-input>
      </el-form-item>
      <el-form-item label="标题" size="small">
        <el-input v-model="formSearch.title" placeholder="请输入标题"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button size="small" @click="getlist">查 询</el-button>
      </el-form-item>
      <el-form-item>
        <el-button size="small" type="danger" @click="deleInfor(false)">批量删除</el-button>
      </el-form-item>
    </el-form>
    <el-table :data="formData" style="width: 100%" stripe @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55"></el-table-column>
      <el-table-column prop="nickname" label="用户名"></el-table-column>
      <el-table-column prop="phone" label="手机号"></el-table-column>
      <el-table-column prop="title" label="标题"></el-table-column>
      <el-table-column prop="verifier	" label="审核人员"></el-table-column>
      <el-table-column prop="isVerify" label="审核状态">
        <template slot-scope="scope">
          {{scope.row.isVerify==0?"未审核":scope.row.isVerify==1?"审核通过":"不通过"}}
        </template>
      </el-table-column>
      <el-table-column prop="typeId" label="类型">
        <template slot-scope="scope">
          {{scope.row.typeId==0?"能工巧匠":"求助"}}
        </template>
      </el-table-column>
      <el-table-column prop="" label="审核时间" width="150">
        <template slot-scope="scope" v-if="scope.row.gmtVerify">
          {{$root.getDateArray(scope.row.gmtVerify)[9]}}
        </template>
      </el-table-column>
      <el-table-column prop="" label="申请时间" width="150">
        <template slot-scope="scope" v-if="scope.row.gmtCreate">
          {{$root.getDateArray(scope.row.gmtCreate)[9]}}
        </template>
      </el-table-column>
      <el-table-column label="操作" fixed="right" width=400>
				<template slot-scope="scope">
					<el-button  size="small" @click="shengeCraftsman(scope.row)">{{scope.row.isVerify==1?"重新审核":"审核通过"}}</el-button>
					<el-button  size="small" @click="gopinglun(scope.row.id)">查看评论</el-button>
					<el-button  size="small" @click="godianping(scope.row.id)">查看点赞</el-button>
					<el-button  size="small" @click="updateShowBox(scope.row),detailsDialog=false">查看详情</el-button>
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
    <el-dialog title="详情" :visible.sync="updateDialog" :close-on-click-modal="false">
      <div class="cont_box_right">
        <el-form label-position="right" :rules="rules" label-width="85px" :model="formUpdate" ref='formUpdate'> 
          <el-form-item label="用户名" size="small">
            <el-input v-model="formUpdate.nickname"></el-input>
          </el-form-item>
          <el-form-item label="手机号" size="small">
            <el-input v-model="formUpdate.phone"></el-input>
          </el-form-item>
          <el-form-item label="标题" size="small">
            <el-input v-model="formUpdate.title"></el-input>
          </el-form-item>
          <el-form-item label="动态详情" size="small">
            <el-input v-model="formUpdate.descDetail"></el-input>
          </el-form-item>
          <el-form-item label="申请时间" size="small">
            <el-input v-model="$root.getDateArray(formUpdate.gmtCreate)[9]"></el-input>
          </el-form-item>
          <el-form-item label="审核人员" size="small">
            <el-input v-model="formUpdate.verifier"></el-input>
          </el-form-item>
          <el-form-item label="审核时间" size="small">
            <el-input v-model="$root.getDateArray(formUpdate.gmtVerify)[9]"></el-input>
          </el-form-item>
          <el-form-item label="审核状态" size="small">
            <el-input v-model="formUpdate.isVerify==0?'未审核':formUpdate.isVerify==1?'审核通过':'不通过'"></el-input>
          </el-form-item>
          <el-form-item label="出租状态" size="small">
            <el-input v-model="formUpdate.typeId==0?'出租':formUpdate.typeId==1?'求租':'购置'"></el-input>
          </el-form-item>
          <el-form-item label="图片" size="small">
            <el-image style="width: 100px; height: 100px" :src="formUpdate.picture" fit="contain"></el-image>
          </el-form-item>
        </el-form>
      </div>

      <div slot="footer" class="dialog-footer">
        <el-button size="medium " @click="updateDialog = false">关 闭</el-button>
      </div>
    </el-dialog>
    </section>
</template>

<script>
import paging from "../paging"
import {getgenreid,getlishopinfo,shengeCraftsman,deleteCraftsman,craftsmanList,xqSelectList,orgTree } from '../../url/api';
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
    gopinglun(id){//查看评论
      this.$router.push({
        path:'./nenggongqiaojiang1',
        query:{
          fkId:id
        }
      })
    },
    godianping(id){//查看点赞
      this.$router.push({
        path:'./nenggongqiaojiang2',
        query:{
          fkId:id
        }
      })
    },
    shengeCraftsman(item){// 修改审核状态
      let params = {
        id:item.id,
        isVerify:item.isVerify==1?2:1
      }
      shengeCraftsman(params).then((res)=>{
          console.log(res)
          if(res.data.code == 200){
            this.getlist()
            this.$message({
              message: '操作成功',
              type: 'success'
            });
            
          }else{
            this.$message('操作失败:'+res.data.msg)
          }
        })
    },
    getlist(){
      craftsmanList(this.formSearch).then((res)=>{
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
      // let getgenreidp = {
      //   genreId:2
      // }
      // getgenreid(getgenreidp).then((res)=>{//添加时查询商家名称
      //   console.log(res)
      //   if(res.data.code == 200){
      //     this.genreid= res.data.data
      //     this.formPush.fkShopId = res.data.data[0].id
      //   }
      // })
      // let org_tree={
      //   name:'',
      //   status:1
      // }
      // orgTree(org_tree).then((res)=>{//获取组织列表
      //   console.log(res)
      //   if(res.data.code == 200){
      //     this.dataTree = res.data.data
      //   }
      // })
    },
    addList(addList){//添加树状图node节点
      this.$refs[addList].validate((valid) => {
        if (valid) {
          addcraftsmanList(this.formPush).then((res)=>{
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
          updatecraftsmanList(params).then((res)=>{
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
        descDetail:item.descDetail,
        gmtCreate:item.gmtCreate,
        gmtVerify:item.gmtVerify,
        isVerify:item.isVerify,
        nickname:item.nickname,
        phone:item.phone,
        picture:item.picture,
        title:item.title,
        typeId:item.typeId,
        verifier:item.verifier,
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
        deleteCraftsman(arrId).then((res)=>{
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
