<template>
  <section>
    <div class="nav_options">
      <div class="nav_option" v-for="item in getDevNameList" :key="item.id" :class="{nav_option_active:isActive == item.type}" @click="getlist(item.type),isActive=item.type">
        <span>{{item.name}}</span>
      </div>
    </div>
    <div class="modoule_online">
  <section>
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
      </el-form-item>
      <el-form-item label="选择小区" size="small">
        <el-select v-model="formSearch.xqId" placeholder="请选择小区">
          <el-option v-for="(item,index) in xqTree" :label="item.name" :value="item.id" :key="index"></el-option>
        </el-select>
      </el-form-item> -->
      <el-form-item label="设备名称" size="small">
        <el-input v-model="formSearch.name" placeholder="设备名称"></el-input>
      </el-form-item>
      <el-form-item label="勾选状态" size="small">
        <el-radio-group v-model="formSearch.lookType" @change='changeRadio'>
          <el-radio :label="0">所有</el-radio>
          <el-radio :label="1">已勾选</el-radio>
          <el-radio :label="2">未勾选</el-radio>
        </el-radio-group>
      </el-form-item>
    </el-form>
    <el-form :inline="true">
      <el-form-item>
        <el-button size="small" @click="getlist(formSearch.devType)">查 询</el-button>
      </el-form-item>
    </el-form>
    <!-- ncu设备 -->
    <el-table ref="multipleTable" :data="formData" @select-all="selectAll"  @select="handleSelectionChange" style="width: 100%" stripe v-if="formSearch.devType == 1">
      <el-table-column type="selection" width="55"></el-table-column>
      <el-table-column :key="Math.random()" prop="name" label="设备名称"></el-table-column>
      <el-table-column :key="Math.random()" prop="xqName" label="小区名称"></el-table-column>
      <el-table-column :key="Math.random()" prop="devSn" label="devSn"></el-table-column>
      <el-table-column :key="Math.random()" prop="ncuSn" label="ncu序列号"></el-table-column>
      <el-table-column :key="Math.random()" prop="doorkeySign" label="门栋编号"></el-table-column>
      <el-table-column :key="Math.random()" label="状态">
				<template slot-scope="scope">
          {{scope.row.devState==1?'在线':'离线'}}
				</template>
			</el-table-column>
    </el-table>
    <!-- 对讲 -->
    <el-table ref="multipleTable" :data="formData" @select-all="selectAll"  @select="handleSelectionChange" style="width: 100%" stripe v-else-if="formSearch.devType == 2">
      <el-table-column type="selection" width="55"></el-table-column>
      <el-table-column :key="Math.random()" prop="name" label="设备名称"></el-table-column>
      <el-table-column :key="Math.random()" prop="xqName" label="小区名称"></el-table-column>
      <el-table-column :key="Math.random()" prop="devSn" label="devSn"></el-table-column>
      <el-table-column :key="Math.random()" prop="loginPass" label="设备登录密码"></el-table-column>
      <el-table-column :key="Math.random()" prop="devPass" label="设备操作密码"></el-table-column>
      <el-table-column :key="Math.random()" label="状态">
				<template slot-scope="scope">
          {{scope.row.devState==1?'在线':'离线'}}
				</template>
			</el-table-column>
    </el-table>
    <!-- 全屏门口机 -->
    <el-table ref="multipleTable" :data="formData" @select-all="selectAll"  @select="handleSelectionChange" style="width: 100%" stripe v-else-if="formSearch.devType == 3">
      <el-table-column type="selection" width="55"></el-table-column>
      <el-table-column :key="Math.random()" prop="name" label="设备名称"></el-table-column>
      <el-table-column :key="Math.random()" prop="xqName" label="小区名称"></el-table-column>
      <el-table-column :key="Math.random()" prop="sectionName" label="区域名称"></el-table-column>
      <el-table-column :key="Math.random()" label="门口机类型">
        <template slot-scope="scope">
          {{scope.row.embedType==1?'单元门口机':'围墙机'}}
				</template>
      </el-table-column>
      <el-table-column :key="Math.random()" prop="loginPass" label="设备登录密码"></el-table-column>
      <el-table-column :key="Math.random()" prop="floor" label="楼层"></el-table-column>
      <el-table-column :key="Math.random()" label="状态">
				<template slot-scope="scope">
          {{scope.row.devState==1?'在线':'离线'}}
				</template>
			</el-table-column>
    </el-table>
    <!-- dnake门口机 -->
    <el-table ref="multipleTable" :data="formData" @select-all="selectAll"  @select="handleSelectionChange" style="width: 100%" stripe v-else-if="formSearch.devType == 5">
      <el-table-column type="selection" width="55"></el-table-column>
      <el-table-column :key="Math.random()" prop="name" label="设备名称"></el-table-column>
      <el-table-column :key="Math.random()" prop="xqName" label="小区名称"></el-table-column>
      <el-table-column :key="Math.random()" prop="sectionName" label="区域名称"></el-table-column>
      <el-table-column :key="Math.random()" label="门口机类型">
        <template slot-scope="scope">
          {{scope.row.embedType==1?'单元门口机':'围墙机'}}
				</template>
      </el-table-column>
      <el-table-column :key="Math.random()" prop="loginPass" label="设备登录密码"></el-table-column>
      <el-table-column :key="Math.random()" prop="floor" label="楼层"></el-table-column>
      <el-table-column :key="Math.random()" label="状态">
				<template slot-scope="scope">
          {{scope.row.devState==1?'在线':'离线'}}
				</template>
			</el-table-column>
    </el-table>
    <!-- ip门口机 -->
    <el-table ref="multipleTable" :data="formData" @select-all="selectAll"  @select="handleSelectionChange" style="width: 100%" stripe v-else-if="formSearch.devType == 4">
      <el-table-column type="selection" width="55"></el-table-column>
      <el-table-column :key="Math.random()" prop="name" label="设备名称"></el-table-column>
      <el-table-column :key="Math.random()" prop="xqName" label="小区名称"></el-table-column>
      <el-table-column :key="Math.random()" prop="sectionName" label="区域名称"></el-table-column>
      <el-table-column :key="Math.random()" label="是否在线">
        <template slot-scope="scope">
          {{scope.row.isCon==1?'已连接':'未连接'}}
				</template>
      </el-table-column>
      <el-table-column :key="Math.random()" label="门口机类型">
        <template slot-scope="scope">
          {{scope.row.embedType==1?'单元门口机':'围墙机'}}
				</template>
      </el-table-column>
      <el-table-column :key="Math.random()" prop="loginPass" label="设备登录密码"></el-table-column>
      <el-table-column :key="Math.random()" prop="devPass" label="设备操作密码"></el-table-column>
      <el-table-column :key="Math.random()" prop="floor" label="楼层"></el-table-column>
      <el-table-column :key="Math.random()" label="状态">
				<template slot-scope="scope">
          {{scope.row.devState==1?'在线':'离线'}}
				</template>
			</el-table-column>
    </el-table>
    <!-- 商汤人脸机 -->
    <el-table ref="multipleTable" :data="formData" @select-all="selectAll"  @select="handleSelectionChange" style="width: 100%" stripe v-else-if="formSearch.devType == 6">
      <el-table-column type="selection" width="55"></el-table-column>
      <el-table-column :key="Math.random()" prop="name" label="设备名称"></el-table-column>
      <el-table-column :key="Math.random()" prop="xqName" label="小区名称"></el-table-column>
    </el-table>
    <!-- ncu白名单 -->
    <el-table ref="multipleTable" :data="formData" @select-all="selectAll"  @select="handleSelectionChange" style="width: 100%" stripe v-else-if="formSearch.devType == 7">
      <el-table-column type="selection" width="55"></el-table-column>
      <el-table-column :key="Math.random()" prop="name" label="设备名称"></el-table-column>
      <el-table-column :key="Math.random()" prop="xqName" label="小区名称"></el-table-column>
      <el-table-column :key="Math.random()" prop="devSn" label="devSn"></el-table-column>
      <el-table-column :key="Math.random()" prop="ncuSn" label="ncu序列号"></el-table-column>
      <el-table-column :key="Math.random()" prop="doorkeySign" label="门栋编号"></el-table-column>
      <el-table-column :key="Math.random()" label="状态">
				<template slot-scope="scope">
          {{scope.row.devState==1?'在线':'离线'}}
				</template>
			</el-table-column>
    </el-table>
    <!-- 霍尼 -->
    <el-table ref="multipleTable" :data="formData" @select-all="selectAll"  @select="handleSelectionChange" style="width: 100%" stripe v-else>
      <el-table-column type="selection" width="55"></el-table-column>
      <el-table-column :key="Math.random()" prop="AccessLevelName" label="权限名称"></el-table-column>
      <el-table-column :key="Math.random()" prop="AccessLevelID" label="权限id"></el-table-column>
    </el-table>
    <paging @changePage = handleCurrentPage :get-total='total'></paging>

  </section>  

    </div>

  </section>  
</template>

<script>
import { getAcDevlist,orgTree,xqSelectList,freshHwLevels,getDevSetting } from '../../url/api';
import addAndUpdate from './addAndUpdate'
import paging from '../paging'
export default {
  props:['xqId','pushSelect','huixianSelect'],
  data(){
    return{
      radio:1,
      isActive:1,
      allSelect:[],//已勾选的所有数据
      selected:[],
      unselected:[],
      option1:[],
      xqTree:[],
      isAddorUpdate:1,//1添加、2修改
      formSearch:{//查询条件
        devType:1,
        devIds:[],
        lookType:0,
        current:1,
        size: 10
      },
      getDevNameList:[],
      formData: [],//数据
      formUpdate:{},//修改表单
      total: 0,//数据总数
      pages:0,//页面总数
      dialog:false,
      dataTree:[],
      defaultProps2: {
        children: 'children',
        label: 'name',
        value: 'id',
        expandTrigger: 'hover',checkStrictly: true
      },
      rules: {
        name:[{ required: true, message: '该项不能为空'}],
        xqId:[{ required: true, message: '该项不能为空',trigger: 'blur'}],
        orgId:[{ required: true, message: '该项不能为空',trigger: 'blur'}],
      },
    }
  },
  watch:{
    xqId(val){
      console.log(val)
      this.formSearch.xqId = val || ""
      this.getgetDevSetting(this.formSearch.xqId)
    },
    pushSelect(val){
      console.log(val)
      if(val){
        this.pushFather()
      }
      
    },
    huixianSelect(val){//回显
      console.log(val)
      this.allSelect=val||[]
    }
  },
  methods:{
      getgetDevSetting(xqId){//获取已勾选的门禁设备类型
        let params = {
          xqId:xqId
        }
        getDevSetting(params).then((res)=>{
          console.log(res)
          if(res.data.code == 200){
            this.getDevNameList = res.data.data
            this.isActive= this.getDevNameList[0].type||1
            this.getlist(this.isActive)
          }
        })
      },
    pushFather(){
      this.$emit('selected',this.selected)
    },
    getlist(devType){
      this.formSearch.devType = devType
      if(this.formSearch.devType == 8){

        freshHwLevels(this.formSearch.xqId).then((res)=>{//刷新霍尼门禁权限列表

          console.log(res)
          
          if(res.data.code == 200){

            this.formData = res.data.data
          }

        })

        }else{
          getAcDevlist(this.formSearch).then((res)=>{
            console.log(res)
            if(res.data.code == 200){
              this.formData = res.data.data.records.filter((item)=>{
                if(item.gmtCreate){
                  item.gmtCreate = this.$root.getDateArray(item.gmtCreate)[9]
                }
                return item
              })
                this.$nextTick(()=>{
                  this.toggleSelection(this.allSelect)
                })
              this.total = res.data.data.total
            }else{
              this.$message(res.data.msg);
            }
          })
        
        }

    },
    getInit(){//初始化列表
      // this.getlist(1)
      // xqSelectList({}).then((res)=>{//小区选择列表
      //   console.log(res)
      //   if(res.data.code == 200){
      //     this.xqTree = res.data.data
      //     this.formSearch.xqId = this.xqTree[0].id
      //   }
      // })
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
    changeRadio(val){//展示勾选状态
      console.log(val)
      this.formSearch.devIds = []
      this.allSelect.forEach(item=>{
        this.formSearch.devIds.push(item.id)
      })
      this.getlist(this.formSearch.devType)
    },
    toggleSelection(rows) {//回显
      // console.log(rows)
      if (rows) {
      let objs = []
      for(let i = 0;i<rows.length; i++){

        if(this.formData.find(item=>item.id==rows[i].id)){//检测是否在当前源数据中存在
          
          objs.push(this.formData.find(item=>item.id==rows[i].id))
        }
      } 
      console.log(objs)
        objs.forEach(row => {//回显到列表中
          this.$refs.multipleTable.toggleRowSelection(row);
        });
        // this.getlist(1)
      } else {
        this.$refs.multipleTable.clearSelection();
      }
    },
    handleSelectionChange(val,self) {//多选
      let obj = {}
      let aa = val.find(item=>item.id == self.id) //判断当前选中的是否在选中集合里面
      console.log(aa)
      if(aa){
        // console.log(this.allSelect,val)
        this.allSelect = this.allSelect.concat(val)
        this.allSelect = this.allSelect.reduce((cur,next) => {//去重
            obj[next.id] ? "" : obj[next.id] = true && cur.push(next);
            return cur;
        },[])
      }else{
        this.allSelect = this.allSelect.filter((item)=>{
          return item.id!=self.id
        })
      }
      console.log(this.allSelect)
      this.selected = this.allSelect;
    },
    selectAll(val){//监听全选，全不选
      console.log(val)
      if(val.length==0){
        this.allSelect = this.allSelect.filter(item=>{//求数组差集
          return !this.formData.some(ele=>ele.id==item.id)
        })
      }else{
        let obj = {}  
        this.allSelect = this.allSelect.concat(val)
        this.allSelect = this.allSelect.reduce((cur,next) => {//去重
            obj[next.id] ? "" : obj[next.id] = true && cur.push(next);
            return cur;
        },[])
      }
      console.log(this.allSelect)
      this.selected = this.allSelect;
    },
    handleCurrentPage(val){//页码改变
      this.formSearch.current=val
      this.getlist(this.formSearch.devType)
    },
    handleChange(value){
      if(value.length!=0){
        console.log(value)
        this.formSearch.orgId=this.$refs.cascader.getCheckedNodes()[0].data.id
      }else{
        this.formSearch.orgId = ''
      }
      getAcDevlist(this.formSearch).then((res)=>{
        console.log(res)
        if(res.data.code == 200){
          this.formData = res.data.data.records.filter((item)=>{
            if(item.gmtCreate){
              item.gmtCreate = this.$root.getDateArray(item.gmtCreate)[9]
            }
            return item
          })
          this.total = res.data.data.total
        }else{
          this.$message(res.data.msg);
        }
      })
    }
  },
  mounted(){
    this.getInit()
      this.$nextTick(()=>{
        setTimeout(()=>{
          this.toggleSelection(this.allSelect)
        },1000)
        
      })
  },
  components:{
    paging
  }
}
</script>
<style scoped>
 .modoule_online{
   padding:0 40px;
 }
</style>