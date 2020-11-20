<template>
  <section class="form_content">
    <el-form :inline="true" :model="formSearch" class="form_inline">
      <el-form-item label="所属组织" size="small">
       <el-cascader
          ref="cascader"
          v-model="option1"
          :options="zuzhiTree"
          :props="defaultProps2"
          @change="zuzhiChange"
          clearable
         >
        </el-cascader>
      </el-form-item>
      <el-form-item label="选择小区" size="small" prop="xqId">
        <el-select v-model="formSearch.xqId" placeholder="请选择小区">
          <el-option v-for="item in xqTree" :label="item.name" :value="item.id" :key="item.id"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="房号" size="small">
        <el-input v-model="formSearch.houseNum" placeholder="请输入房号"></el-input>
      </el-form-item>
      <el-form-item label="房间名称" size="small">
        <el-input v-model="formSearch.name" placeholder="请输入房间名称"></el-input>
      </el-form-item>
    </el-form>
    <el-form :inline="true" :model="formSearch">
      <el-form-item label="区域名称" size="small">
        <el-input v-model="formSearch.sectionName" placeholder="请输入区域名称"></el-input>
      </el-form-item>
      <el-form-item label="房间类型" size="small">
        <el-select v-model="formSearch.type" placeholder="请选择房间类型">
          <el-option label="物业中心" value="1"></el-option>
          <el-option label="业主房间" value="2"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button size="small" @click="getlist">查 询</el-button>
      </el-form-item>
      <el-form-item>
        <el-button size="small" @click="addDialog=true">添 加</el-button>
      </el-form-item>
    </el-form>
    <!-- 表格 -->
    <el-table :data="formData" style="width: 100%" ref="table">
      <el-table-column prop="name" label="房间名称"></el-table-column>
      <el-table-column prop="houseNum" label="房间号" ></el-table-column>
      <el-table-column prop="floor" label="楼层" ></el-table-column>
      <el-table-column prop="sectionName"label="区域名称"></el-table-column>
      <el-table-column prop="xqName"label="小区名称"></el-table-column>
      <el-table-column prop="type"label="房间类型">
        <template slot-scope="scope">
          {{scope.row.type==1?"物业中心":"业主房间"}}
        </template>
      </el-table-column>
      <el-table-column label="操作" fixed="right" width='250'>
				<template slot-scope="scope">
					<el-button type="warning" size="small" @click="updateShowBox(scope.row)">修 改</el-button>
					<el-button type="danger" size="small" @click="deleInfor(scope.row.id)">删 除</el-button>
				</template>
			</el-table-column>
    </el-table>
    <paging @changePage = handleCurrentPage :get-total='total'></paging>

      <div class="export_template">
        <el-button size="small" @click="exportTemplate" type="primary" round>导出模板</el-button>
        <el-button size="small" @click="getLabel" type="warning" round>导出数据</el-button>
        <el-button size="small" @click="showImport=true" type="success" round>导入数据</el-button>
      </div>

    <!-- 添加 -->
    <el-dialog title="新增" :visible.sync="addDialog" :close-on-click-modal="false">
      <div class="cont_box_right">
        <!-- 面包屑 -->
        <div class="show_father">
          <div class="show_father_box"> 
            <div style="cursor: pointer;" v-for="(item,index) in fatherName" :key="index" @click="clickmbx(item.id)">
              <span>{{item.name}} </span>
              <span v-if="index!=fatherName.length-1" style="margin-right:10px;"> → </span>
            </div>
          </div>
          <el-button size="small" @click="fatherName=[{id:0,name:'首级'}],clickmbx(0)">清楚记录</el-button>
        </div>
        <el-form :inline="true" :model="formPush" class="form_inline" :rules="rules"  ref='addList' label-width="80px">
          <el-form-item label="所属组织" size="small">
          <el-cascader
              ref="cascader"
              v-model="option1"
              :options="zuzhiTree"
              :props="defaultProps2"
              @change="zuzhiChange1"
              clearable
            >
            </el-cascader>
          </el-form-item>
          <el-form-item label="选择小区" size="small">
            <el-select v-model="formSearch1.xqId" placeholder="请选择小区">
              <el-option v-for="item in xqTree" :label="item.name" :value="item.id" :key="item.id"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-button size="small" @click="getsectionList">查 询</el-button>
          </el-form-item>
        <el-table :data="formData1" style="width: 100%">
          <el-table-column width="25">
            <template slot-scope="scope">
              <el-radio @change='pname = scope.row.name,formPush.xqId = scope.row.xqId,isGetFather = true' v-model="formPush.sectionId" :label="scope.row.id" style="color:transparent;"></el-radio>
            </template>
          </el-table-column>
          <el-table-column>
            <template slot-scope="scope">
              <div style="cursor: pointer;" @click="handleSelectionChange(scope.row)">{{scope.row.name}}</div>
            </template>
          </el-table-column>
          <el-table-column prop="remark" label="备注"></el-table-column>
          <el-table-column prop="gmtModified" label="创建时间" width="180"></el-table-column>
          <el-table-column prop="pname"label="父级区域"width="180"></el-table-column>
        </el-table>
        <div class="pagination">
          <el-pagination
            layout="prev, pager, next"
            prev-text="上一页"
            next-text="下一页"
            @current-change="handleCurrentPage1"
            :page-size="10" 
            :total="total1">
          </el-pagination>  
        </div>
          <el-form-item label="房号" prop="houseNum" size="small">
            <el-input v-model="formPush.houseNum"></el-input>
          </el-form-item>
          <el-form-item label="房间名称" prop="name" size="small">
            <el-input v-model="formPush.name"></el-input>
          </el-form-item>
          <el-form-item label="楼层" prop="floor" size="small">
            <el-input v-model.number="formPush.floor"></el-input>
          </el-form-item>
          <el-form-item label="房间类型" size="small">
            <el-select v-model="formPush.type">
              <el-option label="物业中心" :value="1"></el-option>
              <el-option label="业主房间" :value="2"></el-option>
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
        <!-- 面包屑 -->
        <div class="show_father">
          <div class="show_father_box"> 
            <div style="cursor: pointer;" v-for="(item,index) in fatherName" :key="index" @click="clickmbx(item.id)">
              <span>{{item.name}} </span>
              <span v-if="index!=fatherName.length-1" style="margin-right:10px;"> → </span>
            </div>
          </div>
          <el-button size="small" @click="fatherName=[{id:0,name:'首级'}],clickmbx(0)">清楚记录</el-button>
        </div>
        <el-form :inline="true" :model="formUpdate" class="form_inline" ref='addList' :rules="rules">
          <!-- <el-form-item label="所属组织" size="small">
          <el-cascader
              ref="cascader"
              v-model="option1"
              :options="zuzhiTree"
              :props="defaultProps2"
              @change="zuzhiChange1"
              clearable
            >
            </el-cascader>
          </el-form-item>
          <el-form-item label="选择小区" size="small">
            <el-select v-model="formSearch1.xqId" placeholder="请选择小区">
              <el-option v-for="item in xqTree" :label="item.name" :value="item.id" :key="item.id"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item> -->
            <el-button size="small" @click="getsectionList">查 询</el-button>
          </el-form-item>
        </el-form>
        <el-form :inline="true" :model="formSearch1" >
          <el-form-item label="当前选中的区域">
            <el-input v-model="pname"></el-input>
          </el-form-item>
        </el-form>
        <el-table :data="formData1" style="width: 100%">
          <el-table-column width="25">
            <template slot-scope="scope">
              <el-radio @change='pname = scope.row.name,isGetFather = true' v-model="formUpdate.sectionId" :label="scope.row.id" style="color:transparent;"></el-radio>
            </template>
          </el-table-column>
          <el-table-column>
            <template slot-scope="scope">
              <div style="cursor: pointer;" @click="handleSelectionChange(scope.row)">{{scope.row.name}}</div>
            </template>
          </el-table-column>
          <el-table-column prop="remark" label="备注"></el-table-column>
          <el-table-column prop="gmtModified" label="创建时间" width="180"></el-table-column>
          <el-table-column prop="pname"label="父级区域"width="180"></el-table-column>
        </el-table>
        <div class="pagination">
          <el-pagination
            layout="prev, pager, next"
            prev-text="上一页"
            next-text="下一页"
            @current-change="handleCurrentPage1"
            :page-size="10" 
            :total="total1">
          </el-pagination>
        </div>
        <el-form label-position="right" label-width="80px" :model="formUpdate" :rules="rules">
          <el-form-item label="房号" prop="houseNum" size="small">
            <el-input v-model="formUpdate.houseNum"></el-input>
          </el-form-item>
          <el-form-item label="房间名称" prop="name" size="small">
            <el-input v-model="formUpdate.name"></el-input>
          </el-form-item>
          <el-form-item label="楼层" prop="floor" size="small">
            <el-input v-model.number="formUpdate.floor"></el-input>
          </el-form-item>
          <el-form-item label="房间类型" size="small">
            <el-select v-model="formUpdate.type">
              <el-option label="物业中心" :value="1"></el-option>
              <el-option label="业主房间" :value="2"></el-option>
            </el-select>
          </el-form-item>
        </el-form>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button size="medium" @click="updateDialog = false">取 消</el-button>
        <el-button size="medium" @click="updateList">确定</el-button>
      </div>
    </el-dialog>
    <!-- 导入数据 -->
    <el-dialog title="导入" :visible.sync="showImport">
      <el-form :model="ExportImportInfor" class="form_inline">
        <el-form-item label="选择小区" size="small" prop="xqId">
          <el-select v-model="ExportImportInfor.xqId" placeholder="请选择小区">
            <el-option v-for="item in xqTree" :label="item.name" :value="item.id" :key="item.id"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="房间类型" size="small">
          <el-select v-model="ExportImportInfor.type">
            <el-option label="物业中心" :value="1"></el-option>
            <el-option label="业主房间" :value="2"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item size="small">
          <el-upload
            class="upload-demo"
            :headers='headers'
            name="importFile"
            :action="'/intellmanagerV3.0/import/house/'+ExportImportInfor.xqId+'/'+ExportImportInfor.type"
            :on-success="handleAvatarSuccess"
            :on-remove="handleRemove"
            :limit="1">
            <el-button size="small" type="text">点击上传</el-button>
          </el-upload>
        </el-form-item>
        <el-form-item>
          <!-- <el-button size="small" @click="showImport=false">取 消</el-button> -->
          <!-- <el-button size="small" @click="addDialog=true">确 定</el-button> -->
        </el-form-item>
      </el-form>
    </el-dialog>
    <!-- 导出数据 -->
    <el-dialog title="导出" :visible.sync="showExport">
      <el-form :model="ExportImportInfor" class="form_inline">
        <el-form-item label="导出字段" size="small" prop="xqId">
          <el-checkbox :indeterminate="isIndeterminate" v-model="checkAll" @change="handleCheckAllChange">全选</el-checkbox>
          <div style="margin: 15px 0;"></div>
          <el-checkbox-group v-model="ExportImportInfor.get" @change="handleCheckedCitiesChange">
            <el-checkbox v-for="item in labelValues" :label="item" :key="item">{{item}}</el-checkbox>
          </el-checkbox-group>
        </el-form-item>
        <el-form-item label="房间类型" size="small">
          <el-select v-model="ExportImportInfor.type">
            <el-option label="物业中心" :value="1"></el-option>
            <el-option label="业主房间" :value="2"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item size="small">
          <el-upload
            class="upload-demo"
            :headers='headers'
            :data="ExportImportInfor"
            name="importFile"
            action="/intellmanagerV3.0/intellmanagerV3.0/iot/upLoadJsonFile"
            :on-success="handleAvatarSuccess"
            :on-remove="handleRemove"
            :limit="1">
            <el-button size="small" type="text" @click="getdata(data,2)">点击上传</el-button>
          </el-upload>
        </el-form-item>
        <el-form-item>
          <el-button size="small" @click="showExport=false">取 消</el-button>
          <el-button size="small" @click="addDialog=true">确 定</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
    
  </section>
</template>

<script>
const cityOptions = ['上海', '北京', '广州', '深圳'];
import paging from "../paging"
import { sectionList,houseaddList,houseupdateList,housedeleteList,orgTree,houseList,xqSelectList,exportTemplateHouse,exportHouse,importHouse } from '../../url/api';
export default {
  data(){
    var checkAge = (rule, value, callback) => {
      setTimeout(() => {
        if (!Number.isInteger(value)) {
          callback(new Error('请输入数字值'));
        } else {
              callback();
            }
      }, 500);
    };
    return{
      headers:{
        Authorization:sessionStorage.getItem('Authorization'),
        token:sessionStorage.getItem('token')
      },
      isIndeterminate: true,//全选，全部选
      checkAll: false,
      checkedCities: ['上海', '北京'],
      cities: cityOptions,
      option1:[],
      showImport:false,//控制导入弹框
      showExport:false,//控制导出弹框
      ExportImportInfor:{
        get:[]
      },//导入导出信息
      pname:'',//当前选中的父级
      isGetFather:false,//是否已经选中父级
      fatherId:0,
      formSearch:{//查询条件
        current:1,
        xqId:'',
        size: 10
      },
      formSearch1:{//区域查询条件
        current:1,
        pid:0,
        size: 10
      },
      fatherName:[
        {id:0,name:'首级'}
      ],//用于修改pid和相关操作,//子区域的父级
      formPush:{
        floor:0,
        type:2
      },//表单提交
      formData: [],//数据
      formData1: [],//区域数据
      formUpdate:{},//修改表单
      total: 0,//数据总数
      pages:0,//页面总数
      total1: 0,//数据总数
      pages1:0,//页面总数
      addDialog:false,
      updateDialog:false,
      zuzhiTree:[],
      xqTree:[],
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
      labelValues:[],//表头数据
      rules: {
        name:[{ required: true, message: '该项不能为空'}],
        houseNum:[{ required: true, message: '该项不能为空'}],
        xqId:[{ required: true, message: '该项不能为空',trigger: 'change'}],
        orgId:[{ required: true, message: '该项不能为空'}],
        floor:[
            { validator: checkAge, trigger: 'blur' }
          ]
      },
    }
  },
  methods:{
    getlist(){
      // this.formSearch.xqId = this.xqTree\[0\]\.id||""
      houseList(this.formSearch).then((res)=>{//房间列表
        console.log(res)
        if(res.data.code == 200){
          this.formData = res.data.data.records.filter((item)=>{
            if(item.gmtModified){
              item.gmtModified = this.$root.getDateArray(item.gmtModified)[9]
            }
            return item
          })
          this.total = res.data.data.total
          this.pages = res.data.pages
        }else{
          this.$message(res.data.msg);
        }
      })
    },
    getsectionList(){
      sectionList(this.formSearch1).then((res)=>{//区域列表
        console.log(res)
        if(res.data.code == 200){
          this.formData1 = res.data.data.records.filter((item)=>{
            if(item.gmtModified){
              item.gmtModified = this.$root.getDateArray(item.gmtModified)[9]
            }
            return item
          })
          this.total1 = res.data.data.total
          this.pages1 = res.data.pages
        }else{
          this.$message(res.data.msg);
        }
      })
    },
    getInit(){//初始化列表
      
      this.getsectionList()
      let org_tree={
        name:'',
        status:1
      }
      orgTree(org_tree).then((res)=>{//获取组织列表
        console.log(res)
        if(res.data.code == 200){
          this.zuzhiTree = res.data.data
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
      if(this.formSearch1.xqId){
        this.formPush.xqId = this.formSearch1.xqId
      }
      console.log(this.formPush)
      this.$refs.addList.validate((valid) => {
        console.log(valid)
        if (valid) {
          console.log(this.formPush)
          houseaddList(this.formPush).then((res)=>{
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
      houseupdateList(this.formUpdate).then((res)=>{
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
        housedeleteList(arrId).then((res)=>{
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
    handleCurrentPage1(val){//页码区域改变
      this.formSearch1.current=val
      this.getsectionList()
    },
    checkTreeInfor(data,ev) {//监听树状图勾选
      // console.log(ev);
      if(ev.checkedKeys.length>1){
        this.$message('只能选择一个组织');
      }else{
        this.formPush.xqId = ev.checkedKeys[0]
        this.formUpdate.xqId = ev.checkedKeys[0]
      }
    },
    updateShowBox(item){//修改东西弹窗
    
      this.formSearch1={//区域查询条件
        current:1,
        pid:0,
        size: 10,
        xqId:item.xqId
      },
     this.pname = item.sectionName
     this.formUpdate={
       houseNum:item.houseNum,
       name:item.name,
       sectionId:item.sectionId,
       type:item.type,
       floor:item.floor,
       id:item.id
     }
     console.log(this.formUpdate)
      this.getsectionList()
      this.updateDialog = true;
      this.total1 = 0;
      this.fatherName = [{id:0,name:'首级'}]
    },
    zuzhiChange(value){//改变组织
      if(value.length!=0){
        console.log(value)
        this.formSearch.orgId=this.$refs.cascader.getCheckedNodes()[0].data.id
      }else{
        this.formSearch.orgId = ''
      }
      this.getlist(this.formSearch)
    },
    zuzhiChange1(value){//改变组织
      if(value.length!=0){
        console.log(value)
        this.formSearch1.orgId=this.$refs.cascader.getCheckedNodes()[0].data.id
      }else{
        this.formSearch1.orgId = ''
      }
      this.getsectionList(this.formSearch1)
      let org_tree1={
        orgId:this.formSearch1.orgId
      }
      xqSelectList(org_tree1).then((res)=>{//小区选择列表
        console.log(res)
        if(res.data.code == 200){
          this.xqTree = res.data.data
          if(this.xqTree.length!=0){
            this.formSearch.xqId = this.xqTree[0].id
          }
        }
      })
    },
    handleSelectionChange(event){//点击表格
    this.fatherName = this.fatherName.filter((item)=>{
      return item.id!=event.id
    })
    this.fatherName.push(event)

      this.formSearch1.pid = event.id
      console.log(this.fatherName,event)
      
      sectionList(this.formSearch1).then((res)=>{
        console.log(res)
        if(res.data.code == 200){
          this.formData1 = res.data.data.records.filter((item)=>{
            if(item.gmtModified){
              item.gmtModified = this.$root.getDateArray(item.gmtModified)[9]
            }
            return item
          })
          this.total = res.data.data.total
          this.pages = res.data.pages
        }else{
          this.$message(res.data.msg);
        }
      })
    },
    clickmbx(event){//点击面包屑
      console.log(event)
      this.formSearch1.pid = event
      sectionList(this.formSearch1).then((res)=>{
        console.log(res)
        if(res.data.code == 200){
          this.formData1 = res.data.data.records.filter((item)=>{
            if(item.gmtModified){
              item.gmtModified = this.$root.getDateArray(item.gmtModified)[9]
            }
            return item
          })
          this.total = res.data.data.total
          this.pages = res.data.pages
        }else{
          this.$message(res.data.msg);
        }
      })
    },
    handleAvatarSuccess(file,fileList) {
      console.log(file,fileList);
      if(file.code !=200){
        this.$message(file.code);
      }
    },
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    handleCheckAllChange(val) {
      this.checkedCities = val ? cityOptions : [];
      this.isIndeterminate = false;
    },
    handleCheckedCitiesChange(value) {
      let checkedCount = value.length;
      this.checkAll = checkedCount === this.cities.length;
      this.isIndeterminate = checkedCount > 0 && checkedCount < this.cities.length;
    },
    getLabel(){//获取表头所有label
      this.showExport=true
      this.$refs.table.$children.forEach(obj => {
        if(obj.label&&obj.label!="操作"){
          this.labelValues.push(obj.label)
        }
      })
      console.log(this.labelValues)
    },
    importInfor(){//导入信息
      importHouse().then((res)=>{
        console.log(res)
        if(res.data.code == 200){
          this.$message({
            message: '导出成功',
            type: 'success'
          });
        }
      })
    },
    exportTemplate(){//导出模板
    window.self.location=exportTemplateHouse
      // exportTemplateHouse().then((res)=>{
      //   console.log(res)
      //   if(res.data.code == 200){
      //     this.$message({
      //       message: '导出成功',
      //       type: 'success'
      //     });
      //   }
      // })
    },
    exportInfor(){//导出数据
      exportHouse().then((res)=>{
        console.log(res)
        if(res.data.code == 200){
          this.$message({
            message: '导出成功',
            type: 'success'
          });
        }
      })
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
.table_row{
  color: #a1d6f4;
  width: 100%;
  font-size: 16px;
}
.show_father{
  height:50px;
  color:#a1d6f4;
  border:1px solid #a1d6f4;
  padding:0 10px;
  display: flex;
  align-items: center;
  margin-bottom:20px;
  position:relative;
}
.show_father_box{
  display: flex;
  align-items: center;
  flex: 1;
}
.pagination{
  margin-bottom:10px;
}
</style>
