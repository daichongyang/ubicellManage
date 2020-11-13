<template>
  <section class="modlude">
    <el-form :inline="true" :model="formSearch" class="form_inline">
      <!-- <el-form-item label="服务类型" size="small">
        <el-select v-model="formSearch.classify" placeholder="服务类型">
          <el-option label="外卖店" :value="1"></el-option>
          <el-option label="小件速递店" :value="2"></el-option>
          <el-option label="房屋租售" :value="3"></el-option>
          <el-option label="家政店" :value="4"></el-option>
          <el-option label="洗衣店" :value="5"></el-option>
          <el-option label="快递店" :value="6"></el-option>
          <el-option label="搬家店" :value="7"></el-option>
          <el-option label="周边商圈" :value="8"></el-option>
        </el-select>
      </el-form-item> -->
      <el-form-item label="选择小区" size="small">
        <el-select v-model="formSearch.xqId" placeholder="请选择小区">
          <el-option v-for="(item,index) in xqTree" :label="item.name" :value="item.id" :key="index"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="创建时间" size="small">
        <el-date-picker
          v-model="formSearch.gmtCreate"
          type="datetime"
          value-format="timestamp"
          placeholder="创建时间">
        </el-date-picker>
      </el-form-item>
      <el-form-item label="创建人员" size="small">
        <el-input v-model="formSearch.name" placeholder="请输入创建人员"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button size="small" @click="getInit">查 询</el-button>
      </el-form-item>
      <el-form-item>
        <el-button size="small" @click="addDialog=true">添 加</el-button>
      </el-form-item>
      <el-form-item>
        <el-button size="small" type="danger" @click="deleInfor(false)">批量删除</el-button>
      </el-form-item>
    </el-form>	
    <el-table :data="formData" style="width: 100%" stripe @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55"></el-table-column>
      <el-table-column prop="name" label="服务类型"></el-table-column>
      <el-table-column prop="cname" label="创建人员"></el-table-column>
      <el-table-column prop=""label="创建时间">
        <template slot-scope="scope" v-if="scope.row.gmtCreate">
          {{$root.getDateArray(scope.row.gmtCreate)[9]}}
        </template>
      </el-table-column>
     
      <el-table-column label="操作" fixed="right" width=250>
				<template slot-scope="scope">
					<el-button type="warning" size="small" @click="updateShowBox(scope.row)">修 改</el-button>
				
					<el-button type="danger" size="small" @click="deleInfor(scope.row.id)">删除</el-button>
				</template>
			</el-table-column>
    </el-table>
    <paging @changePage = handleCurrentPage :get-total='total'></paging>

    <!-- 添加 -->
    <el-dialog title="新增" :visible.sync="addDialog" :close-on-click-modal="false">
      <div class="cont_box_right">
        <el-form label-position="right" label-width="80px" :model="formPush" ref='formPush' :rules="rules">
          <el-form-item label="选择小区" size="small" prop="xqId">
            <el-select v-model="formPush.xqId" placeholder="请选择小区">
              <el-option v-for="item in xqTree" :label="item.name" :value="item.id" :key="item.id"></el-option>
            </el-select>
          </el-form-item>
          <!-- <el-form-item label="服务类型" size="small" prop="classify">
            <el-select v-model="formPush.classify" placeholder="服务类型">
              <el-option label="外卖店" :value="1"></el-option>
              <el-option label="小件速递店" :value="2"></el-option>
              <el-option label="房屋租售" :value="3"></el-option>
              <el-option label="家政店" :value="4"></el-option>
              <el-option label="洗衣店" :value="5"></el-option>
              <el-option label="快递店" :value="6"></el-option>
              <el-option label="搬家店" :value="7"></el-option>
              <el-option label="周边商圈" :value="8"></el-option>
            </el-select>
          </el-form-item> -->
          <el-form-item label="服务名称" prop="name">
            <el-input v-model="formPush.name"></el-input>
          </el-form-item>
        </el-form>
      </div>

      <div slot="footer" class="dialog-footer">
        <el-button size="medium " @click="addDialog = false">取 消</el-button>
        <el-button size="medium " @click="addList('formPush')">新 增</el-button>
      </div>
    </el-dialog>

    <!-- 修改 -->
    <el-dialog title="修改" :visible.sync="updateDialog" :close-on-click-modal="false">
      <div class="cont_box_right">
        <el-form label-position="right" label-width="80px" :model="formUpdate" ref='formUpdate' :rules="rules">
          <!-- <el-form-item label="服务类型" size="small" prop="classify">
            <el-select v-model="formUpdate.classify" placeholder="服务类型">
              <el-option label="外卖店" :value="1"></el-option>
              <el-option label="小件速递店" :value="2"></el-option>
              <el-option label="房屋租售" :value="3"></el-option>
              <el-option label="家政店" :value="4"></el-option>
              <el-option label="洗衣店" :value="5"></el-option>
              <el-option label="快递店" :value="6"></el-option>
              <el-option label="搬家店" :value="7"></el-option>
              <el-option label="周边商圈" :value="8"></el-option>
            </el-select>
          </el-form-item> -->
          <el-form-item label="服务名称" prop="name">
            <el-input v-model="formUpdate.name"></el-input>
          </el-form-item>
        </el-form>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button size="medium" @click="updateDialog = false">取 消</el-button>
        <el-button size="medium" @click="updateList('formUpdate')">确定</el-button>
      </div>
    </el-dialog>
  </section>
</template>

<script>
import paging from '../paging'
import { shoptypeList,addShoptype,updateShoptype,deleteShoptype,orgTree,xqSelectList,houseList } from '../../url/api';
export default {
  data(){
    return{
      option1:[],
      deleBatch:[],
      isGetFather:false,//是否选中
      formSearch:{//查询条件
        classify:8,
        xqId:'',
        current:1,
        size: 10
      },
      formPush:{
        classify:8
      },//表单提交
      formData: [],//数据
      formUpdate:{
        classify:8
      },//修改表单
      total: 0,//数据总数
      pages:0,//页面总数
      addDialog:false,
      updateDialog:false,
      dataTree:[],
      defaultProps: {//树状图key定义
        children: 'children',
        label: 'label'
      },
      xqTree:[],//小区列表
      rules: {
        name:[{ required: true, message: '该项不能为空'}],
        ubicellJyh:[{ required: true, message: '该项不能为空'}],
        addUser:[{ required: true, message: '该项不能为空',trigger: 'change'}],
        getCall:[{ required: true, message: '该项不能为空',trigger: 'change'}],
        xqId:[{ required: true, message: '该项不能为空',trigger: 'change'}],
        classify:[{ required: true, message: '该项不能为空',trigger: 'change'}],
      },
    }
  },
  methods:{
    getlist(){
      shoptypeList(this.formSearch).then((res)=>{//查询房间业主/成员分页列表
        console.log(res)
        if(res.data.code == 200){
          this.formData = res.data.data.records.filter((item)=>{
            return item
          })
          this.total = res.data.data.total
          this.pages = res.data.pages
        }else{
          this.$message(res.data.msg);
        }
      })
    },
    getInit(){//初始化列表
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
            this.getlist()
          }
        }
      })
    },
    addList(addList){//添加
      this.$refs[addList].validate((valid) => {
        if (valid) {
          addShoptype(this.formPush).then((res)=>{
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
      updateShoptype(this.formUpdate).then((res)=>{
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
        deleteShoptype(arrId).then((res)=>{
          console.log(res)
          if(res.data.code == 200){
            this.$message('删除成功');
            this.getInit()
          }
        })
      })
      .catch(_ => {});
    },
    handleSelectionChange(val) {//多选
      this.deleBatch = val
      console.log(this.deleBatch)
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
      this.formUpdate = {
        classify:parseInt(item.classify),
        name:item.name,
        id:item.id
      }
      this.updateDialog = true
      console.log(this.formUpdate)
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
