<template>
  <section>
    <el-form :inline="true" :model="formSearch" class="form_inline">
    </el-form>
    <el-form :inline="true" :model="formSearch">
      <el-form-item label="商家名称" size="small">
        <el-input v-model="formSearch.areaName" placeholder="请输入商家名称"></el-input>
      </el-form-item>
      <el-form-item label="选择小区" size="small">
        <el-select v-model="formSearch.xqId" placeholder="请选择小区">
          <el-option v-for="(item,index) in xqTree" :label="item.name" :value="item.id" :key="index"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="广告类型" size="small">
        <el-select v-model="formSearch.advertType" placeholder="请选择广告类型">
          <el-option label="只有图片" value="1"></el-option>
          <el-option label="图片带超连接" value="2"></el-option>
          <el-option label="图片带详情介绍" value="3"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button size="small" @click="getlist">查 询</el-button>
      </el-form-item>
      <el-form-item>
        <el-button size="small" @click="addDialog=true">添 加</el-button>
      </el-form-item>
    </el-form>
    <el-table :data="formData" style="width: 100%" stripe>
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
    </el-table>
    <paging @changePage = handleCurrentPage :get-total='total'></paging>

    <!-- 添加 -->
    <el-dialog title="新增" :visible.sync="addDialog">
      <div class="cont_box_right">
        <el-form label-position="right" :rules="rules" label-width="80px" :model="formPush" ref='addList'>
          <el-form-item label="广告类型" size="small" prop="advertType">
            <el-select v-model="formPush.advertType" placeholder="请选择广告类型">
              <el-option label="只有图片" value="1"></el-option>
              <el-option label="图片带超连接" value="2"></el-option>
              <el-option label="图片带详情介绍" value="3"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="网址链接" v-if="formPush.advertType == 2">
            <el-input v-model="formPush.url"></el-input>
          </el-form-item>
          <el-form-item label="商家名称" v-if="formPush.advertType == 3">
            <el-input v-model="formPush.areaName"></el-input>
          </el-form-item>
          <el-form-item label="电话" v-if="formPush.advertType == 3">
            <el-input v-model="formPush.phone"></el-input>
          </el-form-item>
          <el-form-item label="地址" v-if="formPush.advertType == 3">
            <el-input v-model="formPush.address"></el-input>
          </el-form-item>
          <el-form-item label="选择小区" size="small" prop="xqId">
            <el-select v-model="formPush.xqId" placeholder="请选择小区">
              <el-option v-for="item in xqTree" :label="item.name" :value="item.id" :key="item.id"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="简介" v-if="formPush.advertType == 3">
            <el-input v-model="formPush.intro" type="textarea" :autosize="{ minRows: 2, maxRows: 4}"></el-input>
          </el-form-item>
          <el-form-item label="简介图片" v-if="formPush.advertType == 3">
          <el-upload
            action="/intellmanagerV3.0/upload/file/upload"
            list-type="picture-card"
            :on-preview="handlePictureCardPreview"
            :on-remove="handlePicRemove">
            <i class="el-icon-plus"></i>
          </el-upload>
          <el-dialog :visible.sync="picDialog">
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
    <el-dialog title="修改" :visible.sync="updateDialog">
      <div class="cont_box_right">
        <el-form label-position="right" :rules="rules" label-width="80px" :model="formUpdate" ref='addList'>
          <el-form-item label="商家名称">
            <el-input v-model="formUpdate.areaName"></el-input>
          </el-form-item>
          <el-form-item label="电话">
            <el-input v-model="formUpdate.phone"></el-input>
          </el-form-item>
          <el-form-item label="地址">
            <el-input v-model="formUpdate.address"></el-input>
          </el-form-item>
          <el-form-item label="选择小区" size="small" prop="xqId">
            <el-select v-model="formUpdate.xqId" placeholder="请选择小区">
              <el-option v-for="item in xqTree" :label="item.name" :value="item.id" :key="item.id"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="广告类型" size="small" prop="advertType">
            <el-select v-model="formUpdate.advertType" placeholder="请选择广告类型">
              <el-option label="只有图片" value="1"></el-option>
              <el-option label="图片带超连接" value="2"></el-option>
              <el-option label="图片带详情介绍" value="3"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="简介">
            <el-input v-model="formUpdate.intro" type="textarea" :autosize="{ minRows: 2, maxRows: 4}"></el-input>
          </el-form-item>
          <el-form-item label="简介图片">
          <el-upload
            action="/intellmanagerV3.0/upload/file/upload"
            list-type="picture-card"
            :on-preview="handlePictureCardPreview"
            :on-remove="handlePicRemove">
            <i class="el-icon-plus"></i>
          </el-upload>
          <el-dialog :visible.sync="picDialog">
            <img width="100%" :src="dialogImageUrl" alt="">
          </el-dialog>
          </el-form-item>
        </el-form>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button size="medium" @click="updateDialog = false">取 消</el-button>
        <el-button size="medium" @click="updateList">确定</el-button>
      </div>
    </el-dialog>
  </section>  
</template>

<script>
import paging from '../paging'
import { xqSelectList,advertAddlist,advertUpdatelist,advertDeletelist,advertList } from '../../url/api';
export default {
  data(){
    return{
      option1:[],
      dialogImageUrl:'',
      picDialog:false,
      xqTree:[],
      formSearch:{//查询条件
        xqId:'',
        current:1,
        size: 10
      },
      formPush:{
        mapPicture:'abc'
      },//表单提交
      formData: [],//数据
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
      rules:{
        xqId:[{ required: true, message: '该项不能为空'}],
        advertType:[{ required: true, message: '该项不能为空',trigger: 'change'}],
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
    getlist(){
      advertList(this.formSearch).then((ress)=>{//列表
        console.log(ress)
        if(ress.data.code == 200){
        this.formData = ress.data.data.records.filter((item)=>{
          if(item.gmtModified){
            item.gmtModified = this.$root.getDateArray(item.gmtModified)[9]
          }
          return item
        })
        this.total = ress.data.total
        this.pages = ress.data.pages
        }
      })
    },
    getInit(){//初始化列表
        let org_tree1={}
      xqSelectList(org_tree1).then((res)=>{//小区选择列表
        console.log(res)
        if(res.data.code == 200){
          this.xqTree = res.data.data
          this.formSearch.xqId = this.xqTree[0].id||""
          this.getlist()
        }
      })
    },
    addList(addList){//添加
      this.$refs[addList].validate((valid) => {
        if (valid) {
          advertAddlist(this.formPush).then((res)=>{
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
      if(!this.formUpdate.orgId){
        this.$message('请选择所属组织');
        return;
      }
      if(!this.formUpdate.id){
        this.$message('请填写小区名称');
        return;
      }
      advertUpdatelist(this.formUpdate).then((res)=>{
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
        advertDeletelist(arrId).then((res)=>{
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
    updateShowBox(item){//修改东西弹窗
      this.formUpdate = {}
      this.updateDialog = true
      this.formUpdate.orgId = [item.orgId];
      this.formUpdate.id = item.id;
      console.log(this.formUpdate)
    },
    handlePicRemove(file, fileList) {
      console.log(file, fileList);
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.picDialog = true;
    }
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