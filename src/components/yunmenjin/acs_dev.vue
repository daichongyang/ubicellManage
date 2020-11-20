<template>
  <section>
    <div class="nav_options">
      <div class="nav_option" v-for="item in getDevNameList" :key="item.type" :class="{nav_option_active:isActive == item.type}" @click="isActive=item.type">
        <span>{{item.name}}</span>
      </div>
      <!-- <div class="nav_option" :class="{nav_option_active:isActive == 1}" @click="isActive=1">
        <span>云门禁控制器</span>
      </div>
      <div class="nav_option" :class="{nav_option_active:isActive == 2}" @click="isActive=2">
        <span>对讲机</span>
      </div>
      <div class="nav_option" :class="{nav_option_active:isActive == 3}" @click="isActive=3">
        <span>门口机</span>
      </div>
      <div class="nav_option" :class="{nav_option_active:isActive == 4}" @click="isActive=4">
        <span>IP门口机</span>
      </div>
      <div class="nav_option" :class="{nav_option_active:isActive == 5}" @click="isActive=5">
        <span>dnake门口机</span>
      </div>
      <div class="nav_option" :class="{nav_option_active:isActive == 7}" @click="isActive=7">
        <span>白名单ncu</span>
      </div>
      <div class="nav_option" :class="{nav_option_active:isActive == 8}" @click="isActive=8">
        <span>霍尼门禁权限</span>
      </div>
      <div class="nav_option" :class="{nav_option_active:isActive == 6}" @click="isActive=6">
        <span>商汤人脸机</span>
      </div> -->
      <div class="nav_option_right" style="float:right;">
        <el-button size = "small" @click="addDialog=true">新增设备类型</el-button>
      </div>
    </div>
    <div class="modoule_online">
      <deviceInfor :top-active="isActive" @changeXqid="getInit"></deviceInfor>
    </div>
    <el-dialog title="新增" :visible.sync="addDialog" :close-on-click-modal="false">
      <div class="cont_box_right">
        <el-form label-position="right" :rules="rules" label-width="80px" :model="formPush" ref='addList'> 
          <el-form-item label="选择小区" size="small" prop="xqId">
            <el-select v-model="formPush.xqId" placeholder="请选择小区" :disabled="true">
              <el-option v-for="(item,index) in xqTree" :label="item.name" :value="item.id" :key="index"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="设备类型" size="small" prop="xqId">
            <el-checkbox :indeterminate="isIndeterminate" v-model="checkAll" @change="handleCheckAllChange">全选</el-checkbox>
            <div style="margin: 15px 0;"></div>
            <el-checkbox-group v-model="getDevList" @change="handlegetDevListChange">
              <el-checkbox v-for="item in devTypeList" :label="item.id" :key="item.id">{{item.name}}</el-checkbox>
            </el-checkbox-group>
          </el-form-item>

        </el-form>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button size="medium " @click="addDialog = false">取 消</el-button>
        <el-button size="medium " @click="geteditDevSetting">新 增</el-button>
      </div>
    </el-dialog>
  </section>  
</template>

<script>
import deviceInfor from './deviceInfor';
import {getAllDevSetting,xqSelectList,getDevSetting,editDevSetting }from '../../url/api'
export default {
  data(){
    return{
      isActive: 1,
      formPush:{},
      addDialog:false,
      xqTree:[],
      isIndeterminate: true,
      devTypeList:[],
      getDevNameList:[],
      getDevList:[],
      allDevList:[],
      checkAll:false,
      rules: {
        name:[{ required: true, message: '该项不能为空'}],
        type:[{ required: true, message: '该项不能为空',trigger: 'blur'}],
        xqId:[{ required: true, message: '该项不能为空',trigger: 'blur'}],
      },
    }
  },
  methods:{
      handleCheckAllChange(val) {
        this.getDevList = val ? this.allDevList : [];
        this.isIndeterminate = false;
        console.log(val)
      },
      handlegetDevListChange(value) {
        console.log(value)
        let checkedCount = value.length;
        this.checkAll = checkedCount === this.devTypeList.length;
        this.isIndeterminate = checkedCount > 0 && checkedCount < this.devTypeList.length;
      },
      geteditDevSetting(){//勾选or取消勾选门禁设备类型
        let params = {
          xqId:this.formPush.xqId,
          ids:this.getDevList
        }
        editDevSetting(params).then((res)=>{
          console.log(res)
          if(res.data.code == 200){
            this.$message("操作成功")
            this.getgetDevSetting(this.formPush.xqId)
          }
        })
        this.addDialog=false
      },
      getdevTypeList(xqId){//获取所有门禁设备类型
        let params = {
          xqId:xqId
        }
        getAllDevSetting(params).then((res)=>{
          console.log(res)
          if(res.data.code == 200){
            this.devTypeList = res.data.data
            res.data.data.forEach(element => {
              this.allDevList.push(element.id)
            });
          }
        })
      },
      getgetDevSetting(xqId){//获取已勾选的门禁设备类型
        
        let params = {
          xqId:xqId||this.formPush.xqId
        }
        this.formPush.xqId = xqId
        this.getDevList = []
        getDevSetting(params).then((res)=>{
          console.log(res)
          if(res.data.code == 200){
            this.getDevNameList = res.data.data
            this.isActive= this.getDevNameList[0].type||1
            res.data.data.forEach(element => {
              this.getDevList.push(element.id)
            });
          }
        })
      },
      getInit(xqId){
          this.getdevTypeList(xqId)
          this.getgetDevSetting(xqId)
      }
  },
  mounted(){
      xqSelectList({}).then((ress)=>{//小区选择列表
        console.log(ress)
        if(ress.data.code == 200){
          this.xqTree = ress.data.data
          this.formPush.xqId = this.xqTree[0].id
          this.getdevTypeList(this.formPush.xqId)
          this.getgetDevSetting(this.formPush.xqId)
        }
      })

  },
  components:{
    deviceInfor
  }
}
</script>
<style scoped>
 .modoule_online{
   padding:0 40px;
 }
</style>