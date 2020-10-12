<template>  
  <section class="modlude">
    <el-form :inline="true" :model="formSearch" class="form_inline" label-width="80px">
      <el-form-item label="所属组织" size="small">
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
      </el-form-item>
      <el-form-item label="标题" size="small">
        <el-input v-model="formSearch.title" placeholder="请输入标题"></el-input>
      </el-form-item>
      <el-form-item label="申请费用" size="small">
        <el-input v-model="formSearch.total" placeholder="请输入申请费用"></el-input>
      </el-form-item>
      <el-form-item label="用户昵称" size="small">
        <el-input v-model="formSearch.nickname" placeholder="请输入用户昵称"></el-input>
      </el-form-item>
      <el-form-item label="手机号" size="small">
        <el-input v-model="formSearch.phone" placeholder="请输入手机号"></el-input>
      </el-form-item>
      <el-form-item label="费用/价格" size="small">
        <el-input v-model="formSearch.price" placeholder="请输入费用/价格"></el-input>
      </el-form-item>
      <el-form-item label="申请理由" size="small">
        <el-input v-model="formSearch.reason" placeholder="请输入申请理由"></el-input>
      </el-form-item>
      <el-form-item label="状态" size="small">
        <el-select v-model="formSearch.status" placeholder="请选择状态">
          <el-option label="全部" :value="''"></el-option>
          <el-option label="正在申请" :value="0"></el-option>
          <el-option label="申请成功" :value="1"></el-option>
          <el-option label="未通过审核" :value="2"></el-option>
          <el-option label="已取消" :value="3"></el-option>
          <el-option label="申请时没有支付" :value="4"></el-option>
        </el-select>    
      </el-form-item>
      <el-form-item label="创建人员" size="small">
        <el-input v-model="formSearch.cname" placeholder="请输入创建人员"></el-input>
      </el-form-item>
      <el-form-item label="创建时间" size="small">
        <el-date-picker
          v-model="formSearch.createTime"
          type="datetime"
          value-format="timestamp"
          placeholder="创建时间">
        </el-date-picker>
      </el-form-item>
      <el-form-item label="审核时间" size="small">
        <el-date-picker
          v-model="formSearch.checkTime"
          type="datetime"
          value-format="timestamp"
          placeholder="审核时间">
        </el-date-picker>
      </el-form-item>
      <el-form-item label="申请时间" size="small">
        <el-date-picker
          v-model="formSearch.screateTime"
          type="datetime"
          value-format="timestamp"
          placeholder="申请时间">
        </el-date-picker>
      </el-form-item>
      <el-form-item label="操作时间" size="small">
        <el-date-picker
          v-model="formSearch.operTime"
          type="datetime"
          value-format="timestamp"
          placeholder="操作时间">
        </el-date-picker>
      </el-form-item>
      <el-form-item label="使用时间" size="small">
        <el-date-picker
          v-model="formSearch.time"
          type="datetime"
          value-format="timestamp"
          placeholder="使用时间">
        </el-date-picker>
      </el-form-item>
      <el-form-item label="开始时间" size="small">
        <el-date-picker
          v-model="formSearch.startTime"
          type="datetime"
          value-format="timestamp"
          placeholder="开始时间">
        </el-date-picker>
      </el-form-item>
      <el-form-item label="结束时间" size="small">
        <el-date-picker
          v-model="formSearch.endTime"
          type="datetime"
          value-format="timestamp"
          placeholder="结束时间">
        </el-date-picker>
      </el-form-item>
      <el-form-item>
        <el-button size="small" @click="getInit">查 询</el-button>
      </el-form-item>
      <el-form-item>
        <el-button size="small" @click="addDialog=true">新 增</el-button>
      </el-form-item>
      <el-form-item>
        <el-button size="small" type="danger" @click="deleInfor(false)">批量删除</el-button>
      </el-form-item>
    </el-form>
    <el-table :data="formData" style="width: 100%" stripe @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55"></el-table-column>
      <el-table-column prop="title" label="标题"></el-table-column>
      <el-table-column label="图片">
        <template slot-scope="scope" v-if="scope.row.picture">
          <div style="display:flex;">
           <img v-for="item in scope.row.picture.split(',')" :src="item" alt="" style="height:35px;">
          </div>
        </template>
      </el-table-column>
      <el-table-column prop="adesc" label="详细"></el-table-column>
      <el-table-column prop="time" label="时间"></el-table-column>
      <el-table-column prop="price" label="价格(元/小时)"></el-table-column>
      <el-table-column prop="cname" label="创建人"></el-table-column>
      <el-table-column prop="" label="创建时间">
        <template slot-scope="scope">
          {{$root.getDateArray(scope.row.createTime)[9]}}
        </template>
      </el-table-column>
      <el-table-column label="操作" fixed="right" width=250>
				<template slot-scope="scope">
					<el-button type="warning" size="small" @click="updateShowBox(scope.row)">修 改</el-button>
					<el-button type="danger" size="small" @click="deleInfor(scope.row.id)">删 除</el-button>
          <el-button size="small " @click="applyInfos=scope.row.applyInfos,yuyueDialog = true">预约明细</el-button>
				</template>
			</el-table-column>
    </el-table>
    <paging @changePage = handleCurrentPage :get-total='total'></paging>

    <!-- 添加 -->
    <el-dialog title="新增" :visible.sync="addDialog" :close-on-click-modal="false">
      <div class="cont_box_right">
        <el-form label-position="right" :rules="rules" label-width="85px" :model="formPush" ref='addList'> 
          <el-form-item label="选择小区" size="small" prop="xqId">
            <el-select v-model="formPush.xqId" placeholder="请选择小区">
              <el-option v-for="(item,index) in xqTree" :label="item.name" :value="item.id" :key="index"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="标题" size="small" prop="title">
            <el-input v-model="formPush.title"></el-input>
          </el-form-item>
          <el-form-item label="费用/价格" size="small" prop="price">
            <el-input v-model.number="formPush.price"></el-input>
          </el-form-item>
          <el-form-item label="使用时间" size="small" prop="time">
            <el-input v-model="formPush.time"></el-input>
          </el-form-item>
          <el-form-item label="详情" size="small" prop="adesc">
            <el-input type="textarea" v-model="formPush.adesc" :rows="2" placeholder="请输入内容"></el-input>
          </el-form-item>
          <el-form-item label="图片" size="small" prop="picture">
            <el-upload
              ref="addUpdata"
              :action="uploadToRealPath"
              list-type="picture-card"
              :headers='headers'
              :auto-upload="false"
              :on-change="onChange"
              :on-success="handleAvatarSuccess1"
              :on-remove="handleRemove">
              <i class="el-icon-plus"></i>
            </el-upload> 
            <el-dialog :visible.sync="dialogVisible">
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
    <el-dialog title="修改" :visible.sync="updateDialog" :close-on-click-modal="false">
      <div class="cont_box_right">
        <el-form label-position="right" :rules="rules" label-width="85px" :model="formUpdate" ref='formUpdate'> 
          <!-- <el-form-item label="选择小区" size="small" prop="xqId">
            <el-select v-model="formUpdate.xqId" placeholder="请选择小区">
              <el-option v-for="(item,index) in xqTree" :label="item.name" :value="item.id" :key="index"></el-option>
            </el-select>
          </el-form-item> -->
          <el-form-item label="标题" size="small" prop="title">
            <el-input v-model="formUpdate.title"></el-input>
          </el-form-item>
          <el-form-item label="费用/价格" size="small" prop="price">
            <el-input v-model.number="formUpdate.price"></el-input>
          </el-form-item>
          <el-form-item label="使用时间" size="small" prop="time">
            <el-input v-model="formUpdate.time"></el-input>
          </el-form-item>
          <el-form-item label="详情" size="small" prop="adesc">
            <el-input type="textarea" v-model="formUpdate.adesc" :rows="2" placeholder="请输入内容"></el-input>
          </el-form-item>
          <el-form-item label="图片" size="small" prop="picture">
            <el-upload
              ref="Updata"
              :action="uploadToRealPath"
              list-type="picture-card"
              :headers='headers'
              :auto-upload="false"
              :on-change="onChange"
              :file-list="fileList"
              :on-success="handleAvatarSuccess2"
              :on-remove="handleRemove">
              <i class="el-icon-plus"></i>
            </el-upload> 
            <el-dialog :visible.sync="dialogVisible">
              <img width="100%" :src="dialogImageUrl" alt="">
            </el-dialog>
          </el-form-item>
        </el-form>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button size="medium " @click="updateDialog = false">取 消</el-button>
        <el-button size="medium " @click="updateList('formUpdate')">修 改</el-button>
        
      </div>
    </el-dialog>
    <!-- 预约明细 -->
    <el-dialog title="预约明细" :visible.sync="yuyueDialog">
      <div class="cont_box_right">
        <el-table :data="applyInfos" style="width: 100%">
          <el-table-column prop="nickname" label="用户昵称"></el-table-column>
          <el-table-column prop="systemJyh" label="用户家园号"></el-table-column>
          <el-table-column prop="phone" label="用户手机号	"></el-table-column>
          <el-table-column prop="houseId" label="房间"></el-table-column>
          <el-table-column prop="reason" label="申请理由"></el-table-column>
          <el-table-column prop="price" label="支付费用(元)"></el-table-column>
          <el-table-column prop="screateTime" label="申请时间"></el-table-column>
          <el-table-column prop="startTime" label="开始时间"></el-table-column>
          <el-table-column prop="endTime" label="结束时间"></el-table-column>
          <el-table-column prop="checkManagerId" label="审核人员"></el-table-column>
          <el-table-column prop="checkTime" label="审核时间"></el-table-column>
          <el-table-column prop="status" label="状态">
            <template slot-scope="scope">
              {{scope.row.status==0?'正在申请':scope.row.status==1?'申请成功':scope.row.status==2?'未通过审核':scope.row.status==3?'已取消':"申请时没有支付"}}
            </template>
          </el-table-column>
          <el-table-column label="操作" fixed="right" width=160>
            <template slot-scope="scope" v-if="scope.row.status==2">
              <el-button type="warning" size="small" @click="checkApplyInfo(scope.row,1)">通 过</el-button>
              <el-button type="danger" size="small" @click="checkApplyInfo(scope.row,2)">拒 绝</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button size="medium " @click="yuyueDialog = false">关 闭</el-button>
      </div>
    </el-dialog>
    </section>
</template>

<script>
import paging from "../paging"
import {checkApplyInfo,getOnlineApplyData,addPropertyTypeList1,updaAppylById,delAppylById,xqSelectList,orgTree } from '../../url/api';
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
      applyInfos:{},
      formData: [],//数据
      deleBatch: [],//删除数据
      formUpdate:{},//修改表单
      total: 0,//数据总数
      pages:0,//页面总数
      addDialog:false,
      updateDialog:false,
      yuyueDialog:false,
      pictrueNum:0,
      formPush:{},
      uploadToRealPath:'/intellmanagerV3.0/upload/file/upload',
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
      headers:{
        Authorization:sessionStorage.getItem('Authorization'),
        token:sessionStorage.getItem('token')
      },
      rules: {
        adesc:[{ required: true, message: '该项不能为空'}],
        price:[{ required: true, message: '该项不能为空'},{ type: 'number', message: '必须为数字值'}],
        title:[{ required: true, message: '该项不能为空'}],
        time:[{ required: true, message: '该项不能为空'}],
        xqId:[{ required: true, message: '该项不能为空',trigger: 'blur'}],
      },
      dialogImageUrl:'',
      dialogVisible:false,
      fileList: []
    }
  },
  methods:{
    // uploadToRealPath(){
    //   return '/intellmanagerV3.0/upload/uploadfile'
    // },
    checkApplyInfo(obj,type){//预约明细审核
      let params = {
        id:obj.id,
        type:type,
      }
      checkApplyInfo(params).then((res)=>{
        console.log(res)
        if(res.data.code == 200){
          this.getlist()
          this.$message({
            message: '操作成功',
            type: 'success'
          });
          this.getlist()
        }else{
          this.$message('添加失败:'+res.data.msg)
        }
        this.yuyueDialog =false
      })
    },
    onChange(file, fileList){
      console.log(file, fileList)
      this.dialogImageUrl = URL.createObjectURL(file.raw);
      this.fileList = fileList
    },
    getlist(){
      getOnlineApplyData(this.formSearch).then((res)=>{
        console.log(res)
        if(res.data.code == 200){
          this.formData = res.data.data.records.filter((item)=>{
            return item
          })
          this.total = res.data.data.total
        }else{
          this.$message(res.data.msg);
        }
      })
    },

    handleRemove(file, fileList) {
      console.log(file, fileList);
      this.fileList = fileList
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
            if(this.fileList.length == 0){
            addPropertyTypeList1(this.formPush).then((res)=>{
              console.log(res)
              if(res.data.code == 200){
                this.getlist()
                this.$message({
                  message: '添加成功',
                  type: 'success'
                });
                
              }else{
                this.$message('添加失败:'+res.data.msg)
              }
            })
            
            }else{
              this.formPush.picture = ''
              this.pictrueNum=0
              this.$nextTick(function () {//提交图片
              　　this.$refs.addUpdata.submit();
              })
            }
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
         
          if(this.fileList.length == 0){
            this.formUpdate.picture = ""
            let params = this.formUpdate
            updaAppylById(params).then((res)=>{
              console.log(res)
              if(res.data.code == 200){
                this.$message({
                  message: '修改成功',
                  type: 'warning'
                });
                this.getlist()
              }
            })
          
          }else{
            this.formUpdate.picture = ''
            console.log(this.fileList)
            let type = false
            this.fileList.forEach(item=>{
              if(item.response){
                type = true
                 this.formUpdate.picture = item.response.data[0]+","+this.formUpdate.picture
              }else{
                this.formUpdate.picture = item.url+","+this.formUpdate.picture
              }
            })
            if(type){
              this.pictrueNum=0
              this.$nextTick(function () {//提交图片
              　　this.$refs.Updata.submit();
              })
            }else{
              let params = this.formUpdate
              updaAppylById(params).then((res)=>{
                console.log(res)
                if(res.data.code == 200){
                  this.$message({
                    message: '修改成功',
                    type: 'warning'
                  });
                  this.getlist()
                }
              })
            }

          }

        } else {
          console.log('error submit!!');
          return false;
        }
        this.updateDialog =false
      });
    },
    handleAvatarSuccess1(res, file) {
      console.log(res, file)
      this.pictrueNum++;
      this.formPush.picture = res.data[0]+","+this.formPush.picture
      if(this.pictrueNum == this.fileList.length){
        addPropertyTypeList1(this.formPush).then((res)=>{
          console.log(res)
          if(res.data.code == 200){
            this.getlist()
            this.$message({
              message: '添加成功',
              type: 'success'
            });
            
          }else{
            this.$message('添加失败:'+res.data.msg)
          }
        })
      }
    },
    handleAvatarSuccess2(res, file) {
      console.log(res, file)
      let params = this.formUpdate
      updaAppylById(params).then((res)=>{
        console.log(res)
        if(res.data.code == 200){
          this.$message({
            message: '修改成功',
            type: 'warning'
          });
          this.getlist()
        }
      })
      
    },
    updateShowBox(item){//修改东西弹窗
      this.fileList= []
      // this.formUpdate = JSON.parse(JSON.stringify(item));
      this.formUpdate = {
        id:item.id,
        adesc:item.adesc,
        price:item.price,
        time:item.time,
        title:item.title,
        picture:item.picture,
      }
      this.updateDialog = true
      if(item.picture){
        item.picture.split(',').forEach(item=>{
          let obj = {
            url:item
          }
          if(item){
            this.fileList.push(obj)
          }
          
        })
        
      }
      console.log(this.formUpdate,this.fileList)
      
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
        delAppylById(arrId).then((res)=>{
          console.log(res)
          if(res.data.code == 200){
            this.$message('删除成功');
            this.getInit()
          }
        })
      })
      .catch(_ => {});
    },
    handleSelectionChange(val,self) {//多选
      this.deleBatch = val
      // let obj = {}
      // let aa = val.find(item=>item.id == self.id) 
      // console.log(aa)
      // if(aa){
      //   this.allSelect = [...this.allSelect,...val]
      //   this.allSelect = this.allSelect.reduce((cur,next) => {
      //       obj[next.id] ? "" : obj[next.id] = true && cur.push(next);
      //       return cur;
      //   },[])
      // }else{
      //   this.allSelect = this.allSelect.filter((item)=>{
      //     return item.id!=self.id
      //   })
      // }
      console.log(this.deleBatch)
      // this.deleBatch = this.allSelect
      // console.log(this.deleBatch)
    },
    handleCurrentPage(val){//页码改变
      this.formSearch.current=val
      this.getList()
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

</style>
