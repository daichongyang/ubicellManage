<template>
  <section class="modlude">
    <div class="iot_smart_box" v-for="item in configInfor" :key="item.id">
      <h3 class="main_name">{{item.main.mainName}}</h3>
      <el-row class="iot_smart_btn">
        <!-- <el-button type="primary">拷贝此工程创建新工程</el-button> -->
        <el-button type="warning" @click="pushpushThisConfig(item.id)">推送更新</el-button>
        <el-button type="danger" @click="deletedelProjectConfig(item.id)">删除工程</el-button>
      </el-row>
      <!--  -->
      <div class="iot_smart_module">
        <div>全局参数</div>
        <div class="module_cont" v-if="item.globalParam">
          <div class="module_cont_json">
            <el-row :gutter="20">
              <el-col :span="4"><span>运行模式：</span><span  class="color_active">{{item.globalParam.workPattern==0?"自动":item.globalParam.workPattern==1?"远程":"本地"}}</span></el-col>
              <el-col :span="4"><span>使用协议：</span><span class="color_active">{{item.globalParam.protocolVersion}}</span></el-col>
            </el-row>
          </div>
        </div>
        <div style="color:#999;" v-else>暂无数据</div>
      </div>
      <div class="iot_smart_module">
        <div>工程参数</div>
        <div class="module_cont" v-if="item.projectParam">
          <div class="module_cont_json">
            <el-row :gutter="20">
              <el-col :span="4"><span>工程描述：</span><span  class="color_active">{{item.projectParam.describer}}</span></el-col>
              <el-col :span="4"><span>群组备注：</span><span class="color_active">{{item.projectParam.groupRemark}}</span></el-col>
              <el-col :span="4"><span>用户名：</span><span class="color_active">{{item.projectParam.userName}}</span></el-col>
              <el-col :span="4"><span>密码：</span><span class="color_active">{{item.projectParam.userPass}}</span></el-col>
              <el-col :span="4"><span>服务器：</span><span class="color_active">{{item.projectParam.serverHost}}</span></el-col>
              <el-col :span="4"><span>端口：</span><span class="color_active">{{item.projectParam.serverPort}}</span></el-col>
            </el-row>
            <el-row :gutter="20">
              <el-col :span="4"><span>子网ID：</span><span  class="color_active">{{item.projectParam.subnetId}}</span></el-col>
              <el-col :span="4"><span>设备ID：</span><span class="color_active">{{item.projectParam.devId}}</span></el-col>
            </el-row>
          </div>
        </div>
        <div style="color:#999;" v-else>暂无数据</div>
      </div>
      <div class="iot_smart_module">
        <div>用户列表 
          <el-button type="danger" size="small" style="float:right;margin-left:20px;" @click="deletedelModule">删除</el-button>
          <el-button type="primary" size="small" style="float:right;" @click="addDialog=true">添加</el-button>
        </div>
        <div class="module_cont" v-if="item.users">
          <el-table :data="item.users" style="width: 100%">
            <el-table-column prop="nickname" label="昵称"></el-table-column>
            <el-table-column prop="phone" label="手机号"></el-table-column>
            <el-table-column prop="showName" label="家园号"></el-table-column>
          </el-table>
        </div>
        <div style="color:#999;" v-else>暂无数据</div>
      </div>
      <!--  -->
      <div class="iot_smart_module">
        <div>场景列表  
          <el-select v-model="screensType" placeholder="请选择" size="small">
            <el-option label="激活图片" :value="1"></el-option>
            <el-option label="未激活图片" :value="2"></el-option>
          </el-select>
        </div>
        <div class="module_cont" v-if="item.screens">
            <div class="module_cont_screens">
              <div class="module_cont_screens_item" v-for="scItem in item.screens" :key="scItem.id">
                <div>
                  <img :src="scItem.img" alt="" v-if="screensType==1">
                  <img :src="scItem.imgoff" alt="" v-if="screensType==2">
                </div>
                <div style="margin-top:10px;">
                  <el-input size="small" v-model="scItem.name" placeholder="请输入内容" :value="scItem.name"></el-input>
                </div>
                <div class="module_cont_screens_bot">
                  <el-button type="primary" size="mini" @click="changesetNameToEntity(scItem)">保存</el-button>
                  <el-button type="danger" size="mini" @click="deletedelDeviceOne(scItem.id,scItem.typeCode)">删除</el-button>
                </div>
              </div>
            </div>
        </div>
        <div style="color:#999;" v-else>暂无数据</div>
      </div>
      <!--  -->
      <div class="iot_smart_module">
        <div>Room列表  
          <el-button type="warning" size="small">修改名称</el-button>
        </div>
        <div class="module_cont" v-if="item.zones">
          <div class="module_cont_room">
            <div class="room_name" v-for="zmItem in item.zones" :key="zmItem.id">
              <h4 style="margin-bottom:20px;text-align:center;">{{zmItem.name}}</h4>
            
              <div class="" v-for="zmmoItem in zmItem.modules" :key="zmmoItem.id">
                <div class="iot_smart_module">
                  <div>{{zmmoItem.name}}  
                    <!-- <el-button type="warning" size="small">修改配置</el-button> -->
                    <el-button type="danger" size="small" style="float:right;" @click="deletedelModule(zmmoItem.roomId,zmmoItem.typeCode)">删除全部</el-button>
                  </div>
                  <div class="module_cont" v-if="zmmoItem.devices">
                      <div class="module_cont_screens">
                        <div class="module_cont_screens_item" v-for="zmmoItemItem in zmmoItem.devices" :key="zmmoItemItem.id">
                          <div>
                            <img :src="zmmoItemItem.img" alt="">
                          </div>
                          <div style="margin-top:10px;">
                            <el-input size="small" v-model="zmmoItemItem.name" placeholder="请输入内容" :value="zmmoItemItem.name"></el-input>
                          </div>
                          <div class="module_cont_screens_bot">
                            <el-button type="primary" size="mini" @click="changesetNameToEntity(zmmoItemItem,zmmoItem.typeCode)">保存</el-button>
                            <el-button type="danger" size="mini" @click="deletedelDeviceOne(zmmoItemItem.id,zmmoItem.typeCode)">删除</el-button>
                          </div>
                        </div>
                      </div>
                  </div>
                  <div style="color:#999;" v-else>暂无数据</div>
                </div>
              </div>
            </div>
            
          </div>
        </div>
        <div style="color:#999;" v-else>暂无数据</div>
      </div>
    </div>
    <!-- 添加 -->
    <el-dialog title="新增用户" :visible.sync="addDialog" @selection-change="handleSelectionChange">
      <el-table :data="formData" style="width: 100%" stripe>
        <el-table-column prop="name" label="姓名"></el-table-column>
        <el-table-column prop="nickname" label="昵称"></el-table-column>
        <el-table-column prop="phone" label="手机号"></el-table-column>
        <el-table-column prop="sectionName" label="区域名称"></el-table-column>
        <el-table-column prop="houseName" label="房间名称"></el-table-column>
      </el-table>
      <paging @changePage = handleCurrentPage :get-total='total'></paging>
      <div slot="footer" class="dialog-footer">
        <el-button size="medium " @click="addDialog = false">取 消</el-button>
        <el-button size="medium " @click="addList('addList')">新 增</el-button>
      </div>
    </el-dialog>
  </section>
</template>

<script>
import {toSelectUsers,bindUserForConfig,delProjectConfig,pushThisConfig,setNameToEntity,getIotDetailData,delDeviceOne,delModule} from "../../url/api"
export default {
  data(){
    return{
      screensType:1,
      devicesType:1,
      total:0,
      addDialog:false,
      dataInfor:JSON.parse(this.$route.query.configInfor) ,
      configInfor:[],
      formData:[],
      seach:{
        current:1,
        size:10,
      }
    }
  },
  methods:{
    showAddUsers(){
      this.addDialog = true
      toSelectUsers(this.seach).then(res=>{//获取可选用户
        console.log(res)
        if(res.data.code == 200){
          this.formData=res.data.data
          this.total = res.data.data.total
        }
      })
    },
    deletedelDeviceOne(id,typeCode){//删除单个设备
      // this.$confirm('确认删除吗？')
      // .then(_ => {
        let parmas={
          id:id,
          typeCode:typeCode,
        }
        this.$confirm('确定要删除吗?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
          }).then(() => {
          delDeviceOne(parmas).then((res)=>{//
            console.log(res)
            if(res.data.code == 200){
              this.getList()
              this.$message("删除成功")
            }else{
              this.$message("删除失败")
            }
          })
          }).catch(() => {});

    },
    deletedelModule(id,typeCode){//删除房间module
      let parmas={
        roomId:id,
        typeCode:typeCode,
      }
        this.$confirm('确定要删除吗?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
          }).then(() => {
          delModule(parmas).then((res)=>{//
            console.log(res)
            if(res.data.code == 200){
              this.getList()
              this.$message("删除成功")
            }else{
              this.$message("删除失败")
            }
          })
          }).catch(() => {});
    },
    getList(){
      let params = this.dataInfor
      getIotDetailData(params).then((res)=>{//获取智能家庭数据.
        console.log(res)
        if(res.data.code == 200){
          this.configInfor = res.data.data
        }else{
          this.$message(res.data.msg);
        }
      })
    },
    changesetNameToEntity(obj,typeCode){//编辑设备名称
      console.log(obj)
      let params = {
        tempId:obj.id,
        tempImgName:obj.name,
        tempTypeCode:typeCode||obj.typeCode,
      }
      setNameToEntity(params).then(res=>{
        console.log(res)
        if(res.data.code == 200){
          this.getList()
          this.$message("操作成功")
        }else{
          this.$message("操作失败")
        }
      })
    },
    deletedelProjectConfig(id){//删除工程配置
      let params = {
        projectConfigId:id
      }
      delProjectConfig(params).then(res=>{
        console.log(res)
        if(res.data.code == 200){
          this.$message("删除成功")
          this.$router.go(-1)
        }else{
          this.$message("删除失败")
        }
      })
    },
    pushpushThisConfig(id){//推送更新至用户
    console.log(id)
      let params = {
        configId:id
      }
      pushThisConfig(params).then(res=>{
        console.log(res)
        if(res.data.code == 200){
          this.$message("推送成功")
        }else{
          this.$message("推送失败")
        }
      })
    },
    handleCurrentPage(val){//页码改变
      this.seach.current=val
      this.showAddUsers()
    },
  },
  mounted(){
    this.getList()
    console.log(JSON.parse(this.$route.query.configInfor) )
  }
}
</script>

<style scoped>
.iot_smart_box{
  margin-top:10px;
}
.main_name{
  text-align: center;
  margin-bottom:20px;
}
.iot_smart_btn{
  margin-bottom:20px;
}
.iot_smart_module{
  margin-bottom:20px;
}
.module_cont{
  margin-top:10px;
}
.color_active{
  color:#19dcf3;
}
.module_cont_json{
  background: rgba(12, 41, 66, 0.8);
  padding:20px 10px;
}
.module_cont_screens_item{
  display: inline-block;
  width:190px;
  margin-right:20px;
  margin-bottom:20px;
}
.module_cont_screens_item img{
  display: block;
  width:50px;
  height:50px;
  margin:0 auto;
}
.module_cont_screens_bot{
  display: flex;
  justify-content: space-around;
  margin-top:10px;
}
</style>