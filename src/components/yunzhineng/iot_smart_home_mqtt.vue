<template>
  <section>
    <el-form :inline="true" class="form_inline">
      <el-form-item>
        <el-button size="small" type="danger" @click="deleInfor(false)">批量删除</el-button>
      </el-form-item>
    </el-form>
    <el-table :data="formData" style="width: 100%" stripe @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55"></el-table-column>
      <el-table-column prop="cmd" label="指令"></el-table-column>
      <el-table-column prop="dataPoint" label="KNX数据点类型" width="100"></el-table-column>
      <el-table-column prop="groupAddress" label="KNX组地址" width="100"></el-table-column>
      <el-table-column prop="remark" label="备注"></el-table-column>
      <el-table-column prop="" label="创建时间">
        <template slot-scope="scope">
          {{$root.getDateArray(scope.row.gmtCreate)[9]}}
        </template>
      </el-table-column>
      <el-table-column label="操作" fixed="right" width=150>
				<template slot-scope="scope">
					<el-button type="primary" size="small" @click="updateInfor(scope.row)">编辑</el-button>
				</template>
			</el-table-column>
    </el-table>
    <paging v-if="type_cc==1" @changePage = handleCurrentPage :get-total='total'></paging>
    <div style="overflow:hidden;padding:20px 0;">
      <el-button v-if="type_cc==1" type="primary" size="small" @click="screensDialog=true">新增</el-button>
      <el-button v-else type="primary" size="small" @click="zonesDialog=true">新增</el-button>
    </div>
    <!-- 添加mqtt房间设备指令集 -->
    <el-dialog title="添加mqtt房间设备指令集" :visible.sync="zonesDialog">
      <el-form class="form_inline" label-width="90px">
        <el-form-item label="指令" size="small">
          <el-input size="small" v-model="zonespushMqttInfor.cmd" placeholder="请输入指令"></el-input>
        </el-form-item>
        <el-form-item label="KNX组地址" size="small">
          <el-input size="small" v-model="zonespushMqttInfor.groupAddress" placeholder="请输入KNX组地址"></el-input>
        </el-form-item>
        <el-form-item label="操作" size="small">
          <el-input size="small" v-model="zonespushMqttInfor.remark" placeholder="请输入操作"></el-input>
        </el-form-item>
      <el-form-item label="数据点类型" size="small">
        <el-select v-model="zonespushMqttInfor.dataPoint" placeholder="请选择数据点类型">
          <el-option label="bit" value="bit"></el-option>
          <el-option label="1byte" value="1byte"></el-option>
          <el-option label="2byte" value="2byte"></el-option>
          <el-option label="3byte" value="3byte"></el-option>
          <el-option label="4byte" value="4byte"></el-option>
          <el-option label="6byte" value="6byte"></el-option>
          <el-option label="Nbyte" value="Nbyte"></el-option>
        </el-select>
      </el-form-item>
        <el-form-item>
          <el-button size="small" @click="zonesDialog=false">取消</el-button>
          <el-button size="small" @click="getaddHdlMqttDeviceCmd">确定</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
    <!-- 添加mqtt场景指令集 -->
    <el-dialog title="添加mqtt场景指令集" :visible.sync="screensDialog">
      <el-form class="form_inline" label-width="90px">
        <el-form-item label="指令" size="small">
          <el-input size="small" v-model="screenspushMqttInfor.cmd" placeholder="请输入指令"></el-input>
        </el-form-item>
        <el-form-item label="KNX组地址" size="small">
          <el-input size="small" v-model="screenspushMqttInfor.groupAddress" placeholder="请输入KNX组地址"></el-input>
        </el-form-item>
      <el-form-item label="数据点类型" size="small">
        <el-select v-model="screenspushMqttInfor.dataPoint" placeholder="请选择数据点类型">
          <el-option label="bit" value="bit"></el-option>
          <el-option label="1byte" value="1byte"></el-option>
          <el-option label="2byte" value="2byte"></el-option>
          <el-option label="3byte" value="3byte"></el-option>
          <el-option label="4byte" value="4byte"></el-option>
          <el-option label="6byte" value="6byte"></el-option>
          <el-option label="Nbyte" value="Nbyte"></el-option>
        </el-select>
      </el-form-item>
        <el-form-item label="备注" size="small">
          <el-input size="small" v-model="screenspushMqttInfor.remark" placeholder="请输入备注"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button size="small" @click="screensDialog=false">取消</el-button>
          <el-button size="small" @click="getaddHdlMqttScreenCmd">确定</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
    <!-- 修改 -->
    <el-dialog :title="type_cc==1?'修改场景mqtt':'修改房间mqtt'" :visible.sync="upInforDialog">
      <el-form class="form_inline" label-width="90px">
        <el-form-item label="指令" size="small">
          <el-input size="small" v-model="upInfor.cmd" placeholder="请输入指令"></el-input>
        </el-form-item>
        <el-form-item label="KNX组地址" size="small">
          <el-input size="small" v-model="upInfor.groupAddress" placeholder="请输入KNX组地址"></el-input>
        </el-form-item>
        <el-form-item label="操作" size="small">
          <el-input size="small" v-model="upInfor.remark" placeholder="请输入操作"></el-input>
        </el-form-item>
      <el-form-item label="数据点类型" size="small">
        <el-select v-model="upInfor.dataPoint" placeholder="请选择数据点类型">
          <el-option label="bit" value="bit"></el-option>
          <el-option label="1byte" value="1byte"></el-option>
          <el-option label="2byte" value="2byte"></el-option>
          <el-option label="3byte" value="3byte"></el-option>
          <el-option label="4byte" value="4byte"></el-option>
          <el-option label="6byte" value="6byte"></el-option>
          <el-option label="Nbyte" value="Nbyte"></el-option>
        </el-select>
      </el-form-item>
        <el-form-item>
          <el-button size="small" @click="upInforDialog=false">取消</el-button>
          <el-button size="small" @click="editMqqt">确定</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </section>
</template>

<script>
import paging from "../paging"
import {editHdlMqttDeviceCmd,editHdlMqttScreenCmd,getHdlMqttScreenCmds,getHdlMqttDeviceCmds,addHdlMqttDeviceCmd,addHdlMqttScreenCmd,delHdlMqttDeviceCmd,delHdlMqttScreenCmd} from "../../url/api"
export default {
  props:['mqttInfor',"typeObj"],
  data(){
    return{
      formData:[],
      deleBatch:[],
      total:0,
      zonesSeach:{
        current:1,
        size:10
      },
      screensSeach:{
        current:1,
        size:10
      },
      upInforDialog:false,
      isRoot:true,//修改时当前是否为房间
      upInfor:{},//修改
      zonespushMqttInfor:{},
      screenspushMqttInfor:{},
      zonesDialog:false,
      screensDialog:false,
      mqttobj:this.mqttInfor,
      type_cc:this.typeObj
    }
  },
  watch:{
    mqttInfor(val){//接受mqtt信息，用于展示
      console.log(val)
      this.mqttobj = val
      if(this.type_cc == 1){
        this.getgetHdlMqttScreenCmds()
      }else{
        this.getgetHdlMqttDeviceCmds()
      }
    },
    typeObj(val){
      console.log(val)
      this.type_cc = val
      if(val == 1){
        // this.getgetHdlMqttScreenCmds()
      }else{
        // this.getgetHdlMqttDeviceCmds()
      }
    }
  },
  methods:{
    updateInfor(row){
      this.upInfor={
        cmd:row.cmd,
        dataPoint:row.dataPoint,
        groupAddress:row.groupAddress,
        remark:row.remark,
        id:row.id
      }
      this.upInforDialog = true
    },
    editMqqt(){
      console.log(this.isRoot)
      if(this.type_cc==1){
        this.getEditHdlMqttScreenCmd()
      }else{
        this.getEditHdlMqttDeviceCmd()
      }
    },
    getEditHdlMqttScreenCmd(){//修改mqtt场景设备
      let params = this.upInfor
      this.upInforDialog=false
      editHdlMqttScreenCmd(params).then(res=>{
        console.log(res)
        if(res.data.code == 200){
          this.$message("修改成功")
          this.getgetHdlMqttScreenCmds()
        }else{
          this.$message("修改失败")
        }
      })
    },
    getEditHdlMqttDeviceCmd(){//修改mqtt房间设备
      let params = this.upInfor
      this.upInforDialog=false
      editHdlMqttDeviceCmd(params).then(res=>{
        console.log(res)
        if(res.data.code == 200){
          this.$message("修改成功")
          this.getgetHdlMqttDeviceCmds()
        }else{
          this.$message("修改失败")
        }
      })
    },
    handleCurrentPage(val){//页码改变
      
      if(this.type_cc == 1){
        this.screensSeach.current=val
        this.getgetHdlMqttScreenCmds()
      }else{
        this.zonesSeach.current=val
        this.getgetHdlMqttDeviceCmds()
      }
    },
    getaddHdlMqttDeviceCmd(){//添加mqtt房间设备指令集
      this.zonesDialog=false
      let params = this.zonespushMqttInfor
      params.xqId = this.mqttobj.xqId
      params.moduleId = this.mqttobj.moduleId
      params.deviceId = this.mqttobj.id
      addHdlMqttDeviceCmd(params).then(res=>{
        if(res.data.code == 200){
          this.$message("添加mqtt房间设备指令集成功")
          this.getgetHdlMqttDeviceCmds()
        }else{
          this.$message("添加mqtt房间设备指令集失败")
        }
      })
    },
    getaddHdlMqttScreenCmd(){//添加mqtt场景指令集
      this.screensDialog = false
      let params = this.screenspushMqttInfor
      params.xqId = this.mqttobj.xqId
      params.screenId = this.mqttobj.id
      addHdlMqttScreenCmd(params).then(res=>{
        if(res.data.code == 200){
          this.$message("添加mqtt场景指令集成功")
          this.getgetHdlMqttScreenCmds()
        }else{
          this.$message("添加mqtt场景指令集失败")
        }
      })
    },
    getgetHdlMqttScreenCmds(){//mqtt场景指令集
      this.screensSeach.screenId = this.mqttobj.id;
      let params = this.screensSeach
      console.log(params,this.type_cc)
      getHdlMqttScreenCmds(params).then(res=>{
        console.log(res)
        if(res.data.code == 200){
          this.formData = res.data.data.records
          this.total = res.data.data.total||0
        }
      })
    },
    getgetHdlMqttDeviceCmds(){//mqtt房间设备指令集
      this.zonesSeach.deviceId=this.mqttobj.id
      this.zonesSeach.moduleId=this.mqttobj.moduleId
      let params = this.zonesSeach
      console.log(params,this.type_cc)
      getHdlMqttDeviceCmds(params).then(res=>{
        console.log(res)
        if(res.data.code == 200){
          this.formData = res.data.data
          // this.total = res.data.data.length||0
        }
      })
    },
    deleInfor(ids){
      let arrId =[]
      if(ids){
        arrId.push(ids)
      }else{
        if(this.deleBatch.length!=0){
          this.deleBatch.forEach((item)=>{
            arrId.push(item.id)
          })
        }
      }
      this.$confirm('确认删除吗？')
      .then(_ => {
          let parmas=arrId
          console.log(parmas)
        if(this.type_cc == 1){
          delHdlMqttScreenCmd(parmas).then((res)=>{
            console.log(res)
            if(res.data.code == 200){
              this.$message('删除成功');
              this.getgetHdlMqttScreenCmds()
            }
          })
        }else{
        delHdlMqttDeviceCmd(parmas).then((res)=>{
          console.log(res)
          if(res.data.code == 200){
            this.$message('删除成功');
            this.getgetHdlMqttDeviceCmds()
          }
        })
        }

      })
      .catch(_ => {});

    },
    handleSelectionChange(val,self) {//多选
      console.log(val,self)
      this.deleBatch = val
    },
    getlist(){
      
    }
  },
  mounted(){
      if(this.type_cc == 1){
        this.getgetHdlMqttScreenCmds()
      }else{
        this.getgetHdlMqttDeviceCmds()
      }
      console.log(this.mqttInfor,this.typeObj)
  },
  components:{
    paging
  }
}
</script>

<style>

</style>