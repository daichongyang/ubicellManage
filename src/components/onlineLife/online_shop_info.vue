<template>
  <section>
    <el-form :inline="true" :model="formSearch" class="gridContt">
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
      <el-form-item label="小区名称" size="small">
        <el-input v-model="formPush.name" placeholder="请输入内容"></el-input>
      </el-form-item>
      <el-form-item label="餐饮类型" size="small">
        <el-input v-model="formPush.name" placeholder="请输入内容"></el-input>
      </el-form-item>
      <el-form-item label="名称" size="small">
        <el-input v-model="formPush.name" placeholder="请输入内容"></el-input>
      </el-form-item>
      <el-form-item label="简介" size="small">
        <el-input v-model="formPush.name" placeholder="请输入内容"></el-input>
      </el-form-item>
      <el-form-item label="联系方式" size="small">
        <el-input v-model="formPush.name" placeholder="请输入内容"></el-input>
      </el-form-item>
      <el-form-item label="地址" size="small">
        <el-input v-model="formPush.name" placeholder="请输入内容"></el-input>
      </el-form-item>
      <el-form-item label="距离" size="small">
        <el-input v-model="formPush.name" placeholder="请输入内容"></el-input>
      </el-form-item>
      <el-form-item label="状态" size="small">
        <el-input v-model="formPush.name" placeholder="请输入内容"></el-input>
      </el-form-item>
      <el-form-item label="用户昵称" size="small">
        <el-input v-model="formPush.name" placeholder="请输入内容"></el-input>
      </el-form-item>
      <el-form-item label="用户家园号" size="small">
        <el-input v-model="formPush.name" placeholder="请输入内容"></el-input>
      </el-form-item>
      <el-form-item label="创建人员" size="small">
        <el-input v-model="formPush.name" placeholder="请输入内容"></el-input>
      </el-form-item>
      <el-form-item label="创建时间" size="small">
        <el-input v-model="formPush.name" placeholder="请输入内容"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button size="small" @click="getInit">查 询</el-button>
      </el-form-item>
      <el-form-item>
        <el-button size="small" @click="addDialog=true">添 加</el-button>
      </el-form-item>
    </el-form>
    <!-- <el-table :data="formData" style="width: 100%" stripe>
      <el-table-column prop="name" label="小区名称"></el-table-column>
      <el-table-column prop="orgName" label="所属组织"></el-table-column>
      <el-table-column prop="creator" label="创建人员" width="180"></el-table-column>
      <el-table-column prop="gmtCreate"label="创建时间"width="180"></el-table-column>
      <el-table-column label="操作" fixed="right" width=250>
				<template slot-scope="scope">
					<el-button type="warning" size="small" @click="updateShowBox(scope.row)">修 改</el-button>
					<el-button type="danger" size="small" @click="deleInfor(scope.row.id)">删 除</el-button>
				</template>
			</el-table-column>
    </el-table> -->
    <el-table :data="formData" style="width: 100%" stripe>
      <el-table-column prop="item1" label="编号"></el-table-column>
      <el-table-column prop="item2" label="名称"></el-table-column>
      <el-table-column prop="item3" label="简介"></el-table-column>
      <el-table-column prop="item4"label="距离"></el-table-column>
      <el-table-column prop="item5"label="联系方式"></el-table-column>
      <el-table-column prop="item6"label="地址"></el-table-column>
      <el-table-column prop="item7"label="类型"></el-table-column>
      <el-table-column prop="item8"label="状态"></el-table-column>
      <el-table-column prop="item9"label="创建时间"></el-table-column>
      <el-table-column label="操作" fixed="right" width=250>
				<template slot-scope="scope">
					<el-button type="warning" size="small" @click="updateShowBox(scope.row)">修 改</el-button>
					<el-button type="danger" size="small" @click="deleInfor(scope.row.id)">营 业</el-button>
					<el-button type="danger" size="small" @click="deleInfor(scope.row.id)">查看详情</el-button>
				</template>
			</el-table-column>
    </el-table>
    <paging @changePage = handleCurrentPage :get-total='total'></paging>

    <!-- 添加 -->
    <el-dialog title="新增" :visible.sync="addDialog">
      <div class="cont_box_left">
        <el-tree
          :data="dataTree"
          check-strictly
          show-checkbox
          node-key="id"
          default-expand-all
          @check="checkTreeInfor"
          :props="defaultProps"
          ref="tree">
        </el-tree>
      </div>
      <div class="cont_box_right">
        <el-form label-position="right" label-width="80px" :model="formPush" ref='formPush'>
          <el-form-item label="小区名称">
            <el-input v-model="formPush.name"></el-input>
          </el-form-item>
        </el-form>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button size="medium " @click="addDialog = false">取 消</el-button>
        <el-button size="medium " @click="addList">新 增</el-button>
      </div>
    </el-dialog>
    
    <!-- 修改 -->
    <el-dialog title="修改" :visible.sync="updateDialog">
      
      <div class="cont_box_left">
        <el-tree
          v-if="updateDialog"
          :data="dataTree"
          check-strictly
          show-checkbox
          node-key="id"
          default-expand-all
          :default-checked-keys="formUpdate.orgId"
          @check="checkTreeInfor"
          :props="defaultProps"
          ref="tree">
        </el-tree>
      </div>
      <!-- <div class="cont_box_right">
        <el-form label-position="right" label-width="80px" :model="formUpdate" ref='formPush'>
          <el-form-item label="小区名称">
            <el-input v-model="formUpdate.name"></el-input>
          </el-form-item>
        </el-form>
      </div> -->
      <div slot="footer" class="dialog-footer">
        <el-button size="medium" @click="updateDialog = false">取 消</el-button>
        <el-button size="medium" @click="updateList">确定</el-button>
      </div>
    </el-dialog>
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
          item1:"75",
          item2:"小件速桊",
          item3:"商品",
          item4:"2.0km",
          item5:"13000000007",
          item6:"深圳南山",
          item7:"小件速递",
          item8:"停业中",
          item9:"2020-06-15 16:57:56",
        },
        {
          item1:"74",
          item2:"万达广场	",
          item3:"商场",
          item4:"7.1km",
          item5:"13000000006",
          item6:"深圳南山",
          item7:"商圈",
          item8:"营业中",
          item9:"2020-06-15 16:57:56",
        },
        {
          item1:"73",
          item2:"万象城	",
          item3:"商场",
          item4:"7.1km",
          item5:"13000000005",
          item6:"深圳南山",
          item7:"商圈",
          item8:"营业中",
          item9:"2020-06-15 16:52:58",
        },
        {
          item1:"72",
          item2:"安心搬家	",
          item3:"搬家服务",
          item4:"7.1km",
          item5:"13000000004",
          item6:"深圳罗湖",
          item7:"搬家",
          item8:"停业中",
          item9:"2020-06-15 16:10:56",
        },
        {
          item1:"71",
          item2:"快递代收	",
          item3:"商场",
          item4:"7.1km",
          item5:"13000000006",
          item6:"深圳南山",
          item7:"快递",
          item8:"营业中",
          item9:"2020-06-15 16:09:39",
        },
        {
          item1:"70",
          item2:"清清洗衣	",
          item3:"洗衣服务",
          item4:"7.1km",
          item5:"13000000006",
          item6:"深圳南山",
          item7:"洗衣",
          item8:"营业中",
          item9:"2020-06-15 16:57:56",
        },
        {
          item1:"69",
          item2:"LDK家政	",
          item3:"家政服务",
          item4:"2.1km",
          item5:"13000000006",
          item6:"深圳南山",
          item7:"家政",
          item8:"营业中",
          item9:"2020-06-15 16:57:56",
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
          this.getInit()
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
          this.getInit()
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
            this.getInit()
          }
        })
      })
      .catch(_ => {});
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