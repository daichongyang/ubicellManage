<template>
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
      </el-form-item> -->
      <el-form-item label="选择小区" size="small">
        <el-select v-model="formSearch.xqId" placeholder="请选择小区">
          <el-option v-for="(item,index) in xqTree" :label="item.name" :value="item.id" :key="index"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="设备名称" size="small">
        <el-input v-model="formSearch.name" placeholder="设备名称"></el-input>
      </el-form-item>
    </el-form>
    <el-form :inline="true">
      <el-form-item>
        <el-button size="small" @click="getlist">查 询</el-button>
      </el-form-item>
      <el-form-item>
        <el-button size="small" v-if="formSearch.devType != 8" @click.native="dialog=true,isAddorUpdate=1">添 加</el-button>
      </el-form-item>
    </el-form>
    <!-- ncu设备 -->
    <el-table :data="formData" style="width: 100%" stripe v-if="formSearch.devType == 1">
      <el-table-column :key="Math.random()" prop="name" label="设备名称"></el-table-column>
      <el-table-column :key="Math.random()" prop="xqName" label="小区名称"></el-table-column>
      <el-table-column :key="Math.random()" prop="devSn" label="控制单元序列号"></el-table-column>
      <el-table-column :key="Math.random()" prop="ncuSn" label="网络控制器序列号"></el-table-column>
      <el-table-column :key="Math.random()" prop="doorkeySign" label="门栋编号"></el-table-column>
      <el-table-column :key="Math.random()" label="状态">
				<template slot-scope="scope">
          {{scope.row.devState==1?'在线':'离线'}}
				</template>
			</el-table-column>
      <el-table-column :key="Math.random()" label="操作" fixed="right" width=250>
				<template slot-scope="scope">
					<el-button type="warning" size="small" @click="updateShowBox(scope.row,formSearch.devType)">修 改</el-button>
					<el-button type="danger" size="small" @click="deleInfor(scope.row.id)">删 除</el-button>
					<el-button type="success" size="small" @click="opendoor(scope.row)">远程开门</el-button>
				</template>
			</el-table-column>
    </el-table>
    <!-- 对讲 -->
    <el-table :data="formData" style="width: 100%" stripe v-if="formSearch.devType == 2">
      <el-table-column :key="Math.random()" prop="name" label="设备名称"></el-table-column>
      <el-table-column :key="Math.random()" prop="xqName" label="小区名称"></el-table-column>
      <el-table-column :key="Math.random()" prop="devSn" label="控制单元序列号"></el-table-column>
      <el-table-column :key="Math.random()" prop="loginPass" label="设备登录密码"></el-table-column>
      <el-table-column :key="Math.random()" prop="devPass" label="设备操作密码"></el-table-column>
      <el-table-column :key="Math.random()" label="状态">
				<template slot-scope="scope">
          {{scope.row.devState==1?'在线':'离线'}}
				</template>
			</el-table-column>
      <el-table-column :key="Math.random()" label="操作" fixed="right" width=250>
				<template slot-scope="scope">
					<el-button type="warning" size="small" @click="updateShowBox(scope.row,formSearch.devType)">修 改</el-button>
					<el-button type="danger" size="small" @click="deleInfor(scope.row.id)">删 除</el-button>
					<el-button type="success" size="small" @click="opendoor(scope.row)">远程开门</el-button>
				</template>
			</el-table-column>
    </el-table>
    <!-- 全屏门口机 -->
    <el-table :data="formData" style="width: 100%" stripe v-if="formSearch.devType == 3">
      <el-table-column :key="Math.random()" prop="name" label="设备名称"></el-table-column>
      <el-table-column :key="Math.random()" prop="xqName" label="小区名称"></el-table-column>
      <el-table-column :key="Math.random()" prop="sectionName" label="区域名称"></el-table-column>
      <el-table-column :key="Math.random()" label="门口机类型">
        <template slot-scope="scope">
          {{scope.row.embedType==1?'单元门口机':'围墙机'}}
				</template>
      </el-table-column>
      <el-table-column :key="Math.random()" prop="devSn" label="设备登录名"></el-table-column>
      <el-table-column :key="Math.random()" prop="loginPass" label="设备登录密码"></el-table-column>
      <el-table-column :key="Math.random()" prop="floor" label="楼层"></el-table-column>
      <el-table-column :key="Math.random()" label="状态">
				<template slot-scope="scope">
          {{scope.row.devState==1?'在线':'离线'}}
				</template>
			</el-table-column>
      <el-table-column :key="Math.random()" label="操作" fixed="right" width=250>
				<template slot-scope="scope">
					<el-button type="warning" size="small" @click="updateShowBox(scope.row,formSearch.devType)">修 改</el-button>
					<el-button type="danger" size="small" @click="deleInfor(scope.row.id)">删 除</el-button>
					<el-button type="success" size="small" @click="opendoor(scope.row)">远程开门</el-button>
				</template>
			</el-table-column>
    </el-table>
    <!-- dnake门口机 -->
    <el-table :data="formData" style="width: 100%" stripe v-if="formSearch.devType == 5">
      <el-table-column :key="Math.random()" prop="name" label="设备名称"></el-table-column>
      <el-table-column :key="Math.random()" prop="xqName" label="小区名称"></el-table-column>
      <el-table-column :key="Math.random()" prop="sectionName" label="区域名称"></el-table-column>
      <el-table-column :key="Math.random()" label="门口机类型">
        <template slot-scope="scope">
          {{scope.row.embedType==1?'单元门口机':'围墙机'}}
				</template>
      </el-table-column>
      <el-table-column :key="Math.random()" prop="devSn" label="设备登录名"></el-table-column>
      <el-table-column :key="Math.random()" prop="loginPass" label="设备登录密码"></el-table-column>
      <el-table-column :key="Math.random()" prop="floor" label="楼层"></el-table-column>
      <el-table-column :key="Math.random()" label="状态">
				<template slot-scope="scope">
          {{scope.row.devState==1?'在线':'离线'}}
				</template>
			</el-table-column>
      <el-table-column :key="Math.random()" label="操作" fixed="right" width=250>
				<template slot-scope="scope">
					<el-button type="warning" size="small" @click="updateShowBox(scope.row,formSearch.devType)">修 改</el-button>
					<el-button type="danger" size="small" @click="deleInfor(scope.row.id)">删 除</el-button>
					<el-button type="success" size="small" @click="opendoor(scope.row)">远程开门</el-button>
				</template>
			</el-table-column>
    </el-table>
    <!-- ip门口机 -->
    <el-table :data="formData" style="width: 100%" stripe v-if="formSearch.devType == 4">
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
      <el-table-column :key="Math.random()" prop="devSn" label="设备登录名"></el-table-column>
      <el-table-column :key="Math.random()" prop="loginPass" label="设备登录密码"></el-table-column>
      <el-table-column :key="Math.random()" prop="devPass" label="设备操作密码"></el-table-column>
      <el-table-column :key="Math.random()" prop="floor" label="楼层"></el-table-column>
      <el-table-column :key="Math.random()" label="状态">
				<template slot-scope="scope">
          {{scope.row.devState==1?'在线':'离线'}}
				</template>
			</el-table-column>
      <el-table-column :key="Math.random()" label="操作" fixed="right" width=250>
				<template slot-scope="scope">
					<el-button type="warning" size="small" @click="updateShowBox(scope.row,formSearch.devType)">修 改</el-button>
					<el-button type="danger" size="small" @click="deleInfor(scope.row.id)">删 除</el-button>
					<el-button type="success" size="small" @click="opendoor(scope.row)">远程开门</el-button>
				</template>
			</el-table-column>
    </el-table>
    <!-- 商汤人脸机 -->
    <el-table :data="formData" style="width: 100%" stripe v-if="formSearch.devType == 6">
      <el-table-column :key="Math.random()" prop="name" label="设备名称"></el-table-column>
      <el-table-column :key="Math.random()" prop="xqName" label="小区名称"></el-table-column>
      <el-table-column :key="Math.random()" label="操作" fixed="right" width=250>
				<template slot-scope="scope">
					<el-button type="danger" size="small" @click="deleInfor(scope.row.id)">删 除</el-button>
					<el-button type="success" size="small" @click="opendoor(scope.row)">远程开门</el-button>
				</template>
			</el-table-column>
    </el-table>
    <!-- ncu白名单 -->
    <el-table :data="formData" style="width: 100%" stripe v-if="formSearch.devType == 7">
      <el-table-column :key="Math.random()" prop="name" label="设备名称"></el-table-column>
      <el-table-column :key="Math.random()" prop="xqName" label="小区名称"></el-table-column>
      <el-table-column :key="Math.random()" prop="devSn" label="控制单元序列号"></el-table-column>
      <el-table-column :key="Math.random()" prop="ncuSn" label="网络控制器序列号"></el-table-column>
      <el-table-column :key="Math.random()" prop="doorkeySign" label="门栋编号"></el-table-column>
      <el-table-column :key="Math.random()" label="状态">
				<template slot-scope="scope">
          {{scope.row.devState==1?'在线':'离线'}}
				</template>
			</el-table-column>
      <el-table-column :key="Math.random()" label="操作" fixed="right" width=250>
				<template slot-scope="scope">
					<el-button type="warning" size="small" @click="updateShowBox(scope.row,formSearch.devType)">修 改</el-button>
					<el-button type="danger" size="small" @click="deleInfor(scope.row.id)">删 除</el-button>
					<el-button type="success" size="small" @click="opendoor(scope.row)">远程开门</el-button>
				</template>
			</el-table-column>
    </el-table>
    <!-- 霍尼 -->
    <el-table :data="formData" style="width: 100%" stripe v-if="formSearch.devType == 8">
      <el-table-column :key="Math.random()" prop="AccessLevelName" label="权限名称"></el-table-column>
      <el-table-column :key="Math.random()" prop="AccessLevelID" label="权限id"></el-table-column>
    </el-table>
    <paging @changePage = handleCurrentPage :get-total='total'></paging>

    <addAndUpdate :father-infor='formUpdate' :father-is-addor-update='isAddorUpdate' :father-active="formSearch.devType" :father-control-dialog="dialog" @cancelControlDialog="cancelControlDialog" @refreshList="refreshList"></addAndUpdate>
  </section>  
</template>

<script>
import { getAcDevlist,addAcDevlist,updateDoorDev,delAcDevlist,orgTree,xqSelectList,remoteOpenDoor,freshHwLevels } from '../../url/api';
import addAndUpdate from './addAndUpdate'
import paging from '../paging'
export default {
  props:['topActive'],
  data(){
    return{
      option1:[],
      xqTree:[],
      isAddorUpdate:1,//1添加、2修改
      formSearch:{//查询条件
        devType:1,
        lookType:0,
        current:1,
        size: 10
      },
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
        xqId:[{ required: true, message: '该项不能为空',trigger: 'change'}],
        orgId:[{ required: true, message: '该项不能为空',trigger: 'blur'}],
      },
    }
  },
  watch:{
    topActive(val){//tabel切换
      console.log(val)
      if(this.formSearch.devType!=val){

        this.formSearch.devType = val

        if(this.formSearch.devType == 8){

        freshHwLevels(this.formSearch.xqId).then((res)=>{//刷新霍尼门禁权限列表

          console.log(res)
          
          if(res.data.code == 200){

            this.formData = res.data.data

          }

        })

        }else{

          this.getlist()
        
        }
        
      }
      

    }
  },
  methods:{
    opendoor(obj){//远程开门
      let params = {
        devId:obj.id,
        account:localStorage.getItem('phone')
      }
      this.$confirm('确认远程开门吗？')
      .then(_ => {
        remoteOpenDoor(params).then((res)=>{
          console.log(res)
          if(res.data.code == 200){
            this.$message({
              message: '远程开门成功',
              type: 'success'
            });
          }else{
            this.$message(res.data.msg);
          }
        })
      })
      .catch(_ => {});
    },
    cancelControlDialog(obj){//关闭添加修改子组件
      this.dialog= false
    },
    refreshList(obj){//刷新列表
      console.log(obj)
      if(obj==true){
        this.getlist()
      }
    },
    getlist(){
      if(this.formSearch.devType == 8){

        freshHwLevels(this.xqTree[0].id).then((res)=>{//刷新霍尼门禁权限列表

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
              this.total = res.data.data.total
            }else{
              this.$message(res.data.msg);
            }
          })
        
        }

    },
    getInit(){//初始化列表
      this.getlist()
      xqSelectList({}).then((res)=>{//小区选择列表
        console.log(res)
        if(res.data.code == 200){
          this.xqTree = res.data.data
          this.formSearch.xqId = this.xqTree[0].id
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
    deleInfor(ids){//删除
      let arrId = []
      if(ids){
        arrId.push(ids)
      }
      this.$confirm('确认删除吗？')
      .then(_ => {
        delAcDevlist(arrId).then((res)=>{
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
      this.getlist()
    },
    updateShowBox(item,index){//修改东西弹窗
      this.formSearch.devType = index
      this.dialog = true
      this.isAddorUpdate = 2
      this.formUpdate = {
        id:item.id,
        name:item.name,
        devSn:item.devSn,
        devType:item.devType,
        xqId:item.xqId,
        doorkeySign:item.doorkeySign,
        sectionId:item.sectionId,
        houseId:item.houseId,
        embedType:item.embedType,
        floor:item.floor,
        ncuSn:item.ncuSn
      }
      console.log(this.formUpdate)
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
  },
  components:{
    addAndUpdate,
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