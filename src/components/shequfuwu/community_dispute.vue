<template>
  <section>
    <el-form :inline="true" :model="formSearch" class="form_inline">
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
      <el-form-item label="标题" size="small">
        <el-input v-model="formSearch.a" placeholder="请输入内容"></el-input>
      </el-form-item>
      <el-form-item label="报修类型" size="small">
        <el-input v-model="formSearch.c" placeholder="请输入内容"></el-input>
      </el-form-item>
      <el-form-item label="申请人昵称" size="small">
        <el-input v-model="formSearch.aa" placeholder="请输入内容"></el-input>
      </el-form-item>
      <el-form-item label="申请时间" size="small">
        <el-input v-model="formSearch.aa" placeholder="请输入内容"></el-input>
      </el-form-item>
      <el-form-item label="审核人员" size="small">
        <el-input v-model="formSearch.aa" placeholder="请输入内容"></el-input>
      </el-form-item>
      <el-form-item label="派单时间" size="small">
        <el-input v-model="formSearch.aa" placeholder="请输入内容"></el-input>
      </el-form-item>
    </el-form>
    <el-form :inline="true" :model="formSearch">
      <el-form-item label="费用" size="small">
        <el-input v-model="formSearch.name" placeholder=""></el-input>
      </el-form-item>
      <el-form-item label="目前状态" size="small">
        <el-input v-model="formSearch.name" placeholder=""></el-input>
      </el-form-item>
      <el-form-item>
        <el-button size="small" @click="getlist">查 询</el-button>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" icon="el-icon-plus" size='medium'>新增矛盾纠纷</el-button>
      </el-form-item>

    </el-form>
    <el-table :data="formData" style="width: 100%" stripe>
      <el-table-column prop="item1" label="标题"></el-table-column>
      <el-table-column prop="item2" label="概述"></el-table-column>
      <el-table-column prop="item3" label="类型"></el-table-column>
      <el-table-column prop="item4"label="申请人昵称"></el-table-column>
      <el-table-column prop="item5"label="申请地址"></el-table-column>
      <el-table-column prop="item6"label="申请时间"></el-table-column>
      <el-table-column prop="item9"label="审核人员"></el-table-column>
      <el-table-column prop="item10"label="状态"></el-table-column>
      <el-table-column prop="item11"label="派单时间"></el-table-column>
      <el-table-column label="操作" fixed="right" width=250>
				<template slot-scope="scope">
					<el-button type="warning" size="small" @click="updateShowBox(scope.row)">下 发</el-button>
					<el-button type="warning" size="small"  @click="godetails">查看详情</el-button>
				</template>
			</el-table-column>
    </el-table>
    <paging @changePage = handleCurrentPage :get-total='total'></paging>
    
  </section>  
</template>

<script>
import paging from "../paging"
import { xqList,xqAddList,xqUpdateList,xqDeleteList,orgTree } from '../../url/api';
export default {
  data(){
    return{
      option1:[],
      formSearch:{//查询条件
        current:1,
        size: 10
      },
      formPush:{},//表单提交
      formData: [
        {
          item1:"让人发发发",
          item2:"发放",
          item3:"水电",
          item4:"韦宗进	",
          item5:"25栋展箱",
          item6:"2020-08-10 17:24:50",
          item7:"adminky",
          item8:"",
          item9:"adminky",
          item10:"进行中",
          item11:"2020-07-22 19:32:59",
        },
        {
          item1:"我还是睡觉",
          item2:"水电不行",
          item3:"水电",
          item4:"韦宗进	",
          item5:"夏测试区域夏房间",
          item6:"2020-08-10 17:24:50",
          item7:"adminky",
          item8:"",
          item9:"adminky",
          item10:"进行中",
          item11:"2020-07-22 19:32:59",
        },
        {
          item1:"测试图片",
          item2:"发放",
          item3:"水电",
          item4:"韦宗进	",
          item5:"25栋展箱",
          item6:"2020-08-10 17:24:50",
          item7:"adminky",
          item8:"",
          item9:"adminky",
          item10:"进行中",
          item11:"2020-07-22 19:32:59",
        },
        {
          item1:"测试",
          item2:"我去问他",
          item3:"水电",
          item4:"韦宗进	",
          item5:"25栋展箱",
          item6:"2020-08-10 17:24:50",
          item7:"adminky",
          item8:"",
          item9:"adminky",
          item10:"进行中",
          item11:"2020-07-22 19:32:59",
        },
        {
          item1:"让人阿萨德群翁发发发",
          item2:"测试一下",
          item3:"水电",
          item4:"韦宗进	",
          item5:"25栋展箱",
          item6:"2020-08-10 17:24:50",
          item7:"adminky",
          item8:"",
          item9:"adminky",
          item10:"已完成",
          item11:"2020-07-22 19:32:59",
        },
        {
          item1:"测试v3.0",
          item2:"发阿打发放",
          item3:"水电",
          item4:"韦宗进	",
          item5:"25栋展箱",
          item6:"2020-08-10 17:24:50",
          item7:"adminky",
          item8:"",
          item9:"adminky",
          item10:"已完成",
          item11:"2020-07-22 19:32:59",
        },
      ],//数据
      formUpdate:{},//修改表单
      total: 0,//数据总数
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
    }
  },
  methods:{
    godetails(){
      this.$router.push({
        path:'./community_dispute_details'
      })
    },
    getInit(){//初始化列表
      xqList(this.formSearch).then((res)=>{
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
      let org_tree={
            label:'',
            status:1
          }
      orgTree(org_tree).then((res)=>{
        console.log(res)
        if(res.data.code == 200){
          this.dataTree = res.data.data
        }
      })
    },
    addList(){//添加
      if(!this.formPush.orgId){
        this.$message('请选择所属组织');
        return;
      }
      if(!this.formPush.name){
        this.$message('请填写小区名称');
        return;
      }
      xqAddList(this.formPush).then((res)=>{
        console.log(res)
        if(res.data.code == 200){
          this.$message({
            message: '添加成功',
            type: 'success'
          });
          this.getlist()
        }else{
          this.$message('添加失败')
        }
        this.addDialog = false
      })
    },
    updateList(){//修改
    console.log(this.formUpdate)
      if(!this.formUpdate.orgId){
        this.$message('请选择所属组织');
        return;
      }
      if(!this.formUpdate.id){
        this.$message('请填写小区名称');
        return;
      }
      xqUpdateList(this.formUpdate).then((res)=>{
        console.log(res)
        if(res.data.code == 200){
          this.$message({
            message: '修改成功',
            type: 'warning'
          });
          this.getlist()
        }
      })
      this.updateDialog = false
    },
    deleInfor(ids){//删除
      let arrId = []
      if(ids){
        arrId.push(ids)
      }
      this.$confirm('确认删除吗？')
      .then(_ => {
        xqDeleteList(arrId).then((res)=>{
          console.log(res)
          if(res.data.code == 200){
            this.$message('删除成功');
            this.getlist()
          }
        })
      })
      .catch(_ => {});
    },
    handleCurrentPage(val){//页码改变
      this.formSearch.current=val
      this.getlist()
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
      this.formUpdate = {}
      this.updateDialog = true
      this.formUpdate.orgId = [item.orgId];
      this.formUpdate.id = item.id;
      console.log(this.formUpdate)
    },
    handleChange(value){
      if(value.length!=0){
        console.log(value)
        this.formSearch.orgId=this.$refs.cascader.getCheckedNodes()[0].data.id
      }else{
        this.formSearch.orgId = ''
      }
      xqList(this.formSearch).then((res)=>{
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
    // this.getInit()
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