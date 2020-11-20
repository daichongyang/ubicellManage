<template>  
  <section class="modlude">
    <el-form :inline="true" :model="formSearch" class="form_inline">
      <!-- <el-form-item label="所属组织" size="small">
        <el-cascader
            ref="cascader"
            v-model="option1"
            :options="dataTree"
            :props="defaultProps2"
            @change="handleChange"
            clearable
          >
          </el-cascader>
      </el-form-item> -->
      <el-form-item label="选择小区" size="small">
        <el-select v-model="formSearch.xqId" placeholder="请选择小区">
          <el-option v-for="(item,index) in xqTree" :label="item.name" :value="item.id" :key="index"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="时间" size="small">
        <el-date-picker
          v-model="formSearch.startTime"
          type="datetime"
          placeholder="开始时间">
        </el-date-picker>
        <span style="color:#a1d6f4;"> - </span>
        <el-date-picker
          v-model="formSearch.endTime"
          type="datetime"
          placeholder="结束时间">
        </el-date-picker>
      </el-form-item>
      <el-form-item label="BUS接口" size="small">
        <el-input v-model="formSearch.busInter" placeholder="请输入BUS接口"></el-input>
      </el-form-item>
      <el-form-item label="名称" size="small">
        <el-input v-model="formSearch.name" placeholder="请输入名称"></el-input>
      </el-form-item>
      <el-form-item label="产品编码" size="small">
        <el-input v-model="formSearch.code" placeholder="请输入产品编码"></el-input>
      </el-form-item>
      <el-form-item label="MAC地址" size="small">
        <el-input v-model="formSearch.mac" placeholder="请输入MAC地址"></el-input>
      </el-form-item>
      <el-form-item label="制造商" size="small">
        <el-input v-model="formSearch.makeCompany" placeholder="请输入制造商"></el-input>
      </el-form-item>
      <el-form-item label="产品型号" size="small">
        <el-input v-model="formSearch.patternNo" placeholder="请输入产品型号"></el-input>
      </el-form-item>
      <el-form-item label="机身号码" size="small">
        <el-input v-model="formSearch.wareNo" placeholder="请输入机身号码"></el-input>
      </el-form-item>
     
      <el-form-item>
        <el-button size="medium " @click="getlist">查 询</el-button>
        <el-button size="medium " @click="addDialog = true,imageUrl = ''">新 增</el-button>
      </el-form-item>
    </el-form>
    <el-table :data="formData" style="width: 100%" stripe>
      <el-table-column prop="name" label="名称"></el-table-column>
      <el-table-column prop="xqName" label="小区名称"></el-table-column>
      <el-table-column prop="makeCompany" label="制造商"></el-table-column>
      <el-table-column prop="busInter" label="BUS接口"></el-table-column>
      <el-table-column prop="code" label="产品编码"></el-table-column>
      <el-table-column prop="groupNo" label="产品批号"></el-table-column>
      <el-table-column prop="mac" label="MAC地址"></el-table-column>
      <el-table-column prop="patternNo" label="产品型号"></el-table-column>
      <el-table-column prop="storeRemark" label="入库备注"></el-table-column>
      <el-table-column prop="storeTime" label="入库时间">
        <template slot-scope="scope">
          {{$root.getDateArray(scope.row.storeTime)[9]}}
        </template>
      </el-table-column>
      <el-table-column prop="storeUser" label="入库员"></el-table-column>
      <el-table-column prop="wareNo" label="机身号码"></el-table-column>
      <el-table-column prop="gmtCreate" label="生产时间"></el-table-column>
      <el-table-column label="操作" fixed="right" width=250>
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
        <el-form label-position="right" :rules="rules" label-width="80px" :model="formPush" ref='addList'> 
          <el-form-item label="选择小区" size="small" prop="xqId">
            <el-select v-model="formPush.xqId" placeholder="请选择小区">
              <el-option v-for="(item,index) in xqTree" :label="item.name" :value="item.id" :key="index"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="产品名称" size="small">
            <el-input v-model="formPush.name"></el-input>
          </el-form-item>
          <el-form-item label="BUS接口" size="small">
            <el-input v-model="formPush.busInter"></el-input>
          </el-form-item>
          <el-form-item label="产品编码" size="small">
            <el-input v-model="formPush.code"></el-input>
          </el-form-item>
          <el-form-item label="产品批号" size="small">
            <el-input v-model="formPush.groupNo"></el-input>
          </el-form-item>
          <el-form-item label="MAC地址" size="small">
            <el-input v-model="formPush.mac"></el-input>
          </el-form-item>
          <el-form-item label="制造商" size="small">
            <el-input v-model="formPush.makeCompany"></el-input>
          </el-form-item>
          <el-form-item label="产品型号" size="small">
            <el-input v-model="formPush.patternNo"></el-input>
          </el-form-item>
          <el-form-item label="民族" size="small">
            <el-input v-model="formPush.storeRemark"></el-input>
          </el-form-item>
          <el-form-item label="入库时间" size="small">
            <el-date-picker
              v-model="formPush.storeTime"
              type="datetime"
              value-format="timestamp"
              placeholder="入库时间">
            </el-date-picker>
          </el-form-item> 

          <el-form-item label="入库员" size="small">
            <el-input v-model="formPush.storeUser"></el-input>
          </el-form-item>
          <el-form-item label="机身号码" size="small">
            <el-input v-model="formPush.wareNo"></el-input>
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
        <el-form label-position="right" :rules="rules" label-width="80px" :model="formUpdate" ref='formUpdate'> 
          <el-form-item label="选择小区" size="small" prop="xqId">
            <el-select v-model="formUpdate.xqId" placeholder="请选择小区">
              <el-option v-for="(item,index) in xqTree" :label="item.name" :value="item.id" :key="index"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="产品名称" size="small">
            <el-input v-model="formUpdate.name"></el-input>
          </el-form-item>
          <el-form-item label="BUS接口" size="small">
            <el-input v-model="formUpdate.busInter"></el-input>
          </el-form-item>
          <el-form-item label="产品编码" size="small">
            <el-input v-model="formUpdate.code"></el-input>
          </el-form-item>
          <el-form-item label="产品批号" size="small">
            <el-input v-model="formUpdate.groupNo"></el-input>
          </el-form-item>
          <el-form-item label="MAC地址" size="small">
            <el-input v-model="formUpdate.mac"></el-input>
          </el-form-item>
          <el-form-item label="制造商" size="small">
            <el-input v-model="formUpdate.makeCompany"></el-input>
          </el-form-item>
          <el-form-item label="产品型号" size="small">
            <el-input v-model="formUpdate.patternNo"></el-input>
          </el-form-item>
          <el-form-item label="民族" size="small">
            <el-input v-model="formUpdate.storeRemark"></el-input>
          </el-form-item>
          <el-form-item label="入库时间" size="small">
            <el-date-picker
              v-model="formUpdate.storeTime"
              type="datetime"
              value-format="timestamp"
              placeholder="入库时间">
            </el-date-picker>
          </el-form-item> 

          <el-form-item label="入库员" size="small">
            <el-input v-model="formUpdate.storeUser"></el-input>
          </el-form-item>
          <el-form-item label="机身号码" size="small">
            <el-input v-model="formUpdate.wareNo"></el-input>
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
import { getHardwareDevice,addHardwareDevice,updateHardwareDevice,delHardwareDevice,xqSelectList,orgTree } from '../../url/api';
export default {
  data(){
    return{
      checkStrictly:false,
      bindRole:{},
      showmenuList:[],
      menuList:[],
      option1:[],
      xqTree:[],
      isAddorUpdate:1,//1添加、2修改
      formSearch:{
        current:1,
        size:10
      },
      formData: [],//数据
      formUpdate:{},//修改表单
      total: 0,//数据总数
      pages:0,//页面总数
      addDialog:false,
      updateDialog:false,
      dialog:false,
      formPush:{},
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
        account:[{ required: true, message: '该项不能为空'}],
        orgId:[{ required: true, message: '该项不能为空',trigger: 'blur'}],
        xqId:[{ required: true, message: '该项不能为空',trigger: 'blur'}],
      },
      imageUrl:''
    }
  },
  methods:{
    getlist(){
      getHardwareDevice(this.formSearch).then((res)=>{
        console.log(res)
        if(res.data.code == 200){
          this.formData = res.data.data.records.filter((item)=>{
            if(item.gmtCreate){
              item.gmtCreate = this.$root.getDateArray(item.gmtCreate)[9]
              // item.storeTime = this.$root.getDateArray(item.storeTime)[9]
            }
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
    handleChange(value){
      if(value.length!=0){
        console.log(value)
        this.formSearch.orgId=this.$refs.cascader.getCheckedNodes()[0].data.id
      }else{
        this.formSearch.orgId = ''
      }
    },
    handleChange1(value){
      if(value.length!=0){
        console.log(value)
        this.formPush.orgId=this.$refs.cascader.getCheckedNodes()[0].data.id
      }else{
        this.formPush.orgId = ''
      }
    },
    addList(addList){//添加树状图node节点
      this.$refs[addList].validate((valid) => {
        if (valid) {
          addHardwareDevice(this.formPush).then((res)=>{
            console.log(res)
            if(res.data.code == 200){
              this.getInit()
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
          if(this.formUpdate.gmtCreate){
            delete this.formUpdate.gmtCreate
          }
          let params = this.formUpdate
          updateHardwareDevice(params).then((res)=>{
            console.log(res)
            if(res.data.code == 200){
              this.$message({
                message: '修改成功',
                type: 'warning'
              });
              this.getInit()
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
      this.formUpdate = JSON.parse(JSON.stringify(item));
      this.updateDialog = true
      console.log(this.formUpdate)
    },
    deleInfor(id){
      let params = [id]
      this.$confirm('确认删除吗？')
      .then(_ => {
        delHardwareDevice(params).then((res)=>{
          console.log(res)
          if(res.data.code == 200){
            this.$message('删除成功');
            this.getlist()
          }else{
            this.$message(res.data.msg);
          }
        })
      })
      .catch(_ => {});

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
