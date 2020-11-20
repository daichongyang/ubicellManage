<template>
  <section class="modlude">
    <el-form :inline="true" :model="formSearch">
      <el-form-item label="选择小区" size="small">
        <el-select v-model="formSearch.xqId" placeholder="请选择小区">
          <el-option v-for="(item,index) in xqTree" :label="item.name" :value="item.id" :key="index"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="商家名称" size="small">
        <el-select v-model="formSearch.shopId" placeholder="请选择商家名称">
          <el-option v-for="(item,index) in genreid" :label="item.shopName" :value="item.id" :key="index"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="留言人昵称" size="small">
        <el-input v-model="formSearch.nickname" placeholder="请输入留言人昵称"></el-input>
      </el-form-item>
      <el-form-item label="留言人电话" size="small">
        <el-input v-model="formSearch.phone" placeholder="请输入留言人电话"></el-input>
      </el-form-item>
      <el-form-item label="留言" size="small">
        <el-input v-model="formSearch.content" placeholder="请输入留言"></el-input>
      </el-form-item>
      <el-form-item label="留言时间" size="small">
        <el-date-picker
          v-model="formSearch.leaveTime"
          type="datetime"
          value-format="timestamp"
          placeholder="留言时间">
        </el-date-picker>
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
      <el-table-column prop="nickname" label="留言人昵称"></el-table-column>
      <el-table-column prop="phone"label="留言人电话"></el-table-column>
      <el-table-column prop="content"label="留言"></el-table-column>
      <el-table-column prop="rating"label="评分"></el-table-column>
      <el-table-column prop="shopName"label="商家名称"></el-table-column>
      <el-table-column prop=""label="留言时间">
        <template slot-scope="scope" v-if="scope.row.leaveTime">
          {{$root.getDateArray(scope.row.leaveTime)[9]}}
        </template>
      </el-table-column>

      <el-table-column label="操作" fixed="right" width=250>
				<template slot-scope="scope">
					<el-button type="danger" size="small" @click="deleInfor(scope.row.id)">删 除</el-button>
					<el-button size="small" @click="updateShowBox(scope.row)">查看详情</el-button>
				</template>
			</el-table-column>
    </el-table>
    <paging @changePage = handleCurrentPage :get-total='total'></paging>

    <!-- 添加 -->
    <el-dialog title="新增" :visible.sync="addDialog" :close-on-click-modal="false">
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
    <el-dialog title="详情" :visible.sync="updateDialog" :close-on-click-modal="false">
      <div class="cont_box_right">
        <el-form label-position="right" :rules="rules" label-width="90px" :model="formUpdate" ref='formUpdate'> 
          <el-form-item label="留言人昵称" size="small">
            <el-input v-model="formUpdate.nickname"></el-input>
          </el-form-item>
          <el-form-item label="留言人电话" size="small">
            <el-input v-model="formUpdate.phone"></el-input>
          </el-form-item>
          <el-form-item label="留言信息" size="small">
            <el-input v-model="formUpdate.content"></el-input>
          </el-form-item>
          <el-form-item label="留言方" size="small">
            <el-input v-model="formUpdate.fromSystemjyh"></el-input>
          </el-form-item>
          <el-form-item label="留言时间" size="small">
            <el-input v-model="$root.getDateArray(formUpdate.leaveTime)[9]"></el-input>
          </el-form-item>
          <el-form-item label="评星" size="small">
            <el-input v-model="formUpdate.rating"></el-input>
          </el-form-item>
          <el-form-item label="商家名称" size="small">
            <el-input v-model="formUpdate.shopName"></el-input>
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
import paging from '../paging'
import { getgenreid ,shopMessageList,addShoptype,updateShoptype,deleteShopMessage,orgTree,xqSelectList,houseList } from '../../url/api';
export default {
  data(){
    return{
      option1:[],
      deleBatch:[],
      isGetFather:false,//是否选中
      formSearch:{//查询条件
        classify:5,
        xqId:'',
        current:1,
        size: 10
      },
      formPush:{
      },//表单提交
      formData: [],//数据
      formUpdate:{
      },//修改表单
      total: 0,//数据总数
      pages:0,//页面总数
      addDialog:false,
      updateDialog:false,
      dataTree:[],
      genreid:[],
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
      shopMessageList(this.formSearch).then((res)=>{//查询房间业主/成员分页列表
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
      let getgenreidp = {
        genreId:4
      }
      getgenreid(getgenreidp).then((res)=>{//添加时查询商家名称
        console.log(res)
        if(res.data.code == 200){
          this.genreid= res.data.data
          // this.formPush.formSearch = res.data.data[0].id
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
              this.getlist()
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
          this.getlist()
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
        deleteShopMessage(arrId).then((res)=>{
          console.log(res)
          if(res.data.code == 200){
            this.$message('删除成功');
            this.getlist()
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
      this.formUpdate = {
        id:item.id,
        content:item.content,
        fromSystemjyh:item.fromSystemjyh,
        leaveTime:item.leaveTime,
        nickname:item.nickname,
        phone:item.phone,
        picture:item.picture,
        rating:item.rating,
        shopName:item.shopName,
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
