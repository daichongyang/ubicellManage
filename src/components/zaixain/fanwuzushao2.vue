<template>  
  <section class="modlude">
    <el-table :data="formData" style="width: 100%" stripe @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55"></el-table-column>
      <el-table-column prop="nickname" label="用户名"></el-table-column>
      <el-table-column prop="isVerify" label="是否点赞">
        <template slot-scope="scope">
          {{scope.row.isPraise==0?"未点赞":scope.row.isPraise==1?"已点赞":"已取消"}}
        </template>
      </el-table-column>
      <el-table-column prop="" label="创建时间" width="150">
        <template slot-scope="scope" v-if="scope.row.gmtCreate">
          {{$root.getDateArray(scope.row.gmtCreate)[9]}}
        </template>
      </el-table-column>
      <el-table-column label="操作" fixed="right" width=100>
				<!-- <template slot-scope="scope">
					<el-button type="danger" size="small" @click="deleInfor(scope.row.id)">删 除</el-button>
        </template> -->
			</el-table-column>
    </el-table>
    <paging @changePage = handleCurrentPage :get-total='total'></paging>
    </section>
</template>

<script>
import paging from "../paging"
import {getgenreid,getlishopinfo,dianzanHouell,xqSelectList,orgTree } from '../../url/api';
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
    getlist(){
      this.formSearch.hsId = this.$route.query.hsId
      dianzanHouell(this.formSearch).then((res)=>{
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
      // xqSelectList({}).then((res)=>{//小区选择列表
      //   console.log(res)
      //   if(res.data.code == 200){
      //     this.xqTree = res.data.data
      //     if(this.xqTree.length!=0){
      //       this.formSearch.xqId = this.xqTree[0].id
      //     }
      //   }
      // })
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
          addhouellList(this.formPush).then((res)=>{
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
          updatehouellList(params).then((res)=>{
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
        delelethouellList(arrId).then((res)=>{
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
