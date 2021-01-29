<template>
  <section class="form_content">
    <el-form :inline="true" :model="formSearch" class="form_inline">
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
    </el-form>
    <el-form :inline="true" :model="formSearch">
      <el-form-item label="小区名称" size="small">
        <el-input v-model="formSearch.name" placeholder="请输入小区名称"></el-input>
      </el-form-item>
      <el-form-item v-if="$root.btnControl.find(item=>item=='view')">
        <el-button size="small" @click="getInit">查 询</el-button>
      </el-form-item>
      <el-form-item v-if="$root.btnControl.find(item=>item=='add')">
        <el-button size="small" @click="addDialog=true,address='',initAmap()">添 加</el-button>
      </el-form-item>
    </el-form>
    <el-table :data="formData" style="width: 100%" stripe>
      <el-table-column prop="name" label="小区名称"></el-table-column>
      <el-table-column prop="orgName" label="所属组织"></el-table-column>
      <el-table-column prop="address" label="地址"></el-table-column>
      <el-table-column prop="status" label="状态">
				<template slot-scope="scope">
          <span :class="{aa:scope.row.status==2,green:scope.row.status==1,red:scope.row.status==0}">
            {{scope.row.status==0?"未通过":scope.row.status==1?"正常":"冻结"}}
          </span>
				</template>
      </el-table-column>
      <el-table-column prop="creator" label="创建人员" width="180"></el-table-column>
      <el-table-column prop="gmtCreate"label="创建时间"width="180"></el-table-column>
      <el-table-column label="操作" fixed="right" width=250>
				<template slot-scope="scope">
					<el-button type="warning" size="small" @click="updateShowBox(scope.row)" v-if="$root.btnControl.find(item=>item=='edit')">修 改</el-button>
					<el-button type="danger" size="small" @click="deleInfor(scope.row.id)" v-if="$root.btnControl.find(item=>item=='delete')">删 除</el-button>
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
        <el-form label-position="right" label-width="100px" :model="formPush" ref='formPush'>
          <el-form-item label="小区名称">
            <el-input v-model="formPush.name"></el-input>
          </el-form-item>
          <el-form-item label="地址">
            <el-input v-model="address" id="tipinput"></el-input>
          </el-form-item>
          <div id="container"></div>
          <el-form-item label="开启地图定位">
            <el-radio-group v-model="formPush.isShow">
              <el-radio :label="1">是</el-radio>
              <el-radio :label="0">否</el-radio>
            </el-radio-group>
          </el-form-item>
        </el-form>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button size="medium " @click="addDialog = false">取 消</el-button>
        <el-button size="medium " @click="addList">新 增</el-button>
      </div>
    </el-dialog>
    
    <!-- 修改 -->
    <el-dialog title="修改" :visible.sync="updateDialog" :close-on-click-modal="false">
      <div class="cont_box_left">
        <el-tree
          v-if="updateDialog"
          :data="dataTree"
          check-strictly
          show-checkbox
          node-key="id"
          default-expand-all
          :default-checked-keys="formUpdate.orgId"
          @check="checkTreeInfor"
          :props="defaultProps"
          ref="tree">
        </el-tree>
      </div>
        <el-form label-position="right" label-width="100px">
          <el-form-item label="地址">
            <el-input v-model="address" id="tipinput"></el-input>
          </el-form-item>
          <div id="containerUpdata"></div>
          <el-form-item label="开启地图定位">
            <el-radio-group v-model="formUpdate.isShow">
              <el-radio :label="1">是</el-radio>
              <el-radio :label="0">否</el-radio>
            </el-radio-group>
          </el-form-item>
        </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button size="medium" @click="updateDialog = false">取 消</el-button>
        <el-button size="medium" @click="updateList">确定</el-button>
      </div>
    </el-dialog>
  </section>
</template>

<script>
import paging from "../paging"
import Amap from '../../assets/js/initmap'
import { xqList,xqAddList,xqUpdateList,xqDeleteList,orgTree } from '../../url/api';
export default {
  data(){
    return{
      radio:"1",
      option1:[],
      formSearch:{//查询条件
        current:1,
        size: 10
      },
      address:"",
      formPush:{
        isShow:0
      },//表单提交
      formData: [],//数据
      formUpdate:{
        isShow:0
      },//修改表单
      total: 0,//数据总数
      pages:0,//页面总数
      addDialog:false,
      updateDialog:false,
      dataTree:[],
      defaultProps: {//树状图key定义
        children: 'children',
        label: 'name'
      },
      defaultProps2: {
        children: 'children',
        label: 'name',
        value: 'id',
        expandTrigger: 'hover',
        checkStrictly: true
      },
    }
  },
  methods:{
    initAmap(){
      let _this = this
    // 初始化地图
      Amap.init().then((Amap)=>{
          const map = new AMap.Map('container', {
            resizeEnable: true,
            rotateEnable:true,
            pitchEnable:true,
            zoom: 17,
            pitch:50,//视角偏移量
            rotation:-5,
            viewMode:'3D',//开启3D视图,默认为关闭
            buildingAnimation:true,//楼块出现是否带动画
            expandZoomRange:true,
            zooms:[3,20],
            features:['bg','point','road'],
            mapStyle:'amap://styles/dark',
            center:[114.035927,22.557357],
        });
        map.on('click', function(e) {
          console.log(e);
           map.clearMap();
          _this.formPush.latitude = e.lnglat.lat
          _this.formPush.longitude = e.lnglat.lng
          var marker = new AMap.Marker({
              map: map,
              position: [e.lnglat.lng,e.lnglat.lat]
          });
        });
        var autoOptions = {
            input: "tipinput"
        };
        var auto = new AMap.Autocomplete(autoOptions);
        var placeSearch = new AMap.PlaceSearch({
            map: map
        });  //构造地点查询类
        AMap.event.addListener(auto, "select", select);//注册监听，当选中某条记录时会触发
        function select(e) {
            console.log(e)
            _this.formPush.latitude = e.poi.location.lat
            _this.formPush.longitude = e.poi.location.lng
            _this.formPush.address = e.poi.name
            placeSearch.setCity(e.poi.adcode);
            placeSearch.search(e.poi.name);  //关键字查询查询
        }
      })
    },
    initAmap1(item){//修改
      let _this = this
      let center=[item.longitude||114.0359574343264,item.latitude||22.557678]
    // 初始化地图
      Amap.init().then((Amap)=>{
          const map = new AMap.Map('containerUpdata', {
            resizeEnable: true,
            rotateEnable:true,
            pitchEnable:true,
            zoom: 17,
            pitch:50,//视角偏移量
            rotation:-5,
            viewMode:'3D',//开启3D视图,默认为关闭
            buildingAnimation:true,//楼块出现是否带动画
            expandZoomRange:true,
            zooms:[3,20],
            features:['bg','point','road'],
            mapStyle:'amap://styles/dark',
            center:center,
        });
        var marker1 = new AMap.Marker({
            map: map,
            position: center
        });
        map.on('click', function(e) {
          console.log(e);
           map.clearMap();
          _this.formUpdate.latitude = e.lnglat.lat
          _this.formUpdate.longitude = e.lnglat.lng
          var marker = new AMap.Marker({
              map: map,
              position: [e.lnglat.lng,e.lnglat.lat]
          });
        });
        var autoOptions = {
            input: "tipinput"
        };
        var auto = new AMap.Autocomplete(autoOptions);
        var placeSearch = new AMap.PlaceSearch({
            map: map
        });  //构造地点查询类
        AMap.event.addListener(auto, "select", select);//注册监听，当选中某条记录时会触发
        function select(e) {
            console.log(e)
            _this.formUpdate.latitude = e.poi.location.lat
            _this.formUpdate.longitude = e.poi.location.lng
            _this.formUpdate.address = e.poi.name
            placeSearch.setCity(e.poi.adcode);
            placeSearch.search(e.poi.name);  //关键字查询查询
        }
      })
    },
    getInit(){//初始化列表
      xqList(this.formSearch).then((res)=>{
        console.log(res)
        if(res.data.code == 200){
          this.formData = res.data.data.records.filter((item)=>{
            if(item.gmtCreate){
              item.gmtCreate = this.$root.getDateArray(item.gmtCreate)[9]
            }
            return item
          })
          this.total = res.data.data.total
          this.pages = res.data.pages
        }else{
          this.$message(res.data.msg);
        }
      })
      let org_tree={
            name:'',
            status:1
          }
      orgTree(org_tree).then((res)=>{
        console.log(res)
        if(res.data.code == 200){
          this.dataTree = res.data.data
        }
      })
    },
    addList(){//添加
      if(!this.formPush.orgId){
        this.$message('请选择所属组织');
        return;
      }
      if(!this.formPush.name){
        this.$message('请填写小区名称');
        return;
      }
      if(this.formPush.isShow&&!this.formPush.latitude){
        this.$message('请设置经纬度');
        return
      }
      xqAddList(this.formPush).then((res)=>{
        console.log(res)
        if(res.data.code == 200){
          this.$message({
            message: '添加成功',
            type: 'success'
          });
          this.getInit()
        }else{
          this.$message('添加失败')
        }
        this.addDialog = false
      })
    },
    updateList(){//修改
    
      if(!this.formUpdate.orgId){
        this.$message('请选择所属组织');
        return;
      }
      if(!this.formUpdate.id){
        this.$message('请填写小区名称');
        return;
      }
      this.formUpdate.orgId=this.formUpdate.orgId[0]
      
      console.log(this.formUpdate.orgId)
      if(this.formUpdate.isShow&&!this.formUpdate.latitude){
        this.$message('请设置经纬度');
        return
      }
      console.log(this.formUpdate)
      xqUpdateList(this.formUpdate).then((res)=>{
        console.log(res)
        if(res.data.code == 200){
          this.$message({
            message: '修改成功',
            type: 'warning'
          });
          this.getInit()
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
        xqDeleteList(arrId).then((res)=>{
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
      this.getInit()
    },
    checkTreeInfor(data,ev) {//监听树状图勾选
      // console.log(ev);
      if(ev.checkedKeys.length>1){
        this.$message('只能选择一个组织');
      }else{
        this.formPush.orgId = ev.checkedKeys[0]
        this.formUpdate.orgId = [ev.checkedKeys[0]]
      }
    },
    updateShowBox(item){//修改东西弹窗
    console.log(item)
      // this.formUpdate = {}
      this.updateDialog = true
      this.formUpdate.orgId = [item.orgId];
      this.formUpdate.id = item.id;
      this.formUpdate.address= this.address = item.address
      this.formUpdate.isShow = item.isShow?1:0
      this.formUpdate.latitude = item.latitude
      this.formUpdate.longitude = item.longitude
      console.log(this.formUpdate)
      this.initAmap1(item)
    },
    handleChange(value){
      if(value.length!=0){
        console.log(value)
        this.formSearch.orgId=this.$refs.cascader.getCheckedNodes()[0].data.id
      }else{
        this.formSearch.orgId = ''
      }
      xqList(this.formSearch).then((res)=>{
        console.log(res)
        if(res.data.code == 200){
          this.formData = res.data.data.records.filter((item)=>{
            if(item.gmtCreate){
              item.gmtCreate = this.$root.getDateArray(item.gmtCreate)[9]
            }
            return item
          })
          this.total = res.data.data.total
          this.pages = res.data.pages
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
    paging
  }
}
</script>
<style scoped>
  #container {
    width:100%; 
    height: 300px;
  }
  #containerUpdata {
    width:100%; 
    height: 300px;
  }
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
