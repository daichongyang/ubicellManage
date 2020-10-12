<template>
  <section>
    <!-- 导航栏 -->
    <div class="nav_options">
      <div class="nav_option nav_option_active" @click="getList(0)">
        <span>巡查详情</span>
      </div>
      <div class="nav_option" @click="getList(1)">
        <span>照片及电子签名凭证</span>
      </div>
      <div class="nav_option" @click="getList(2)">
        <span>异常处理进度</span>
      </div>
    </div>
    <div style="overflow:hidden;">
      <div class="leftConten">
        <div class="basicInfo">
          <div class="title">巡查任务</div>
          <div class="basicInfoContent">
            <el-row class="line">
              <el-col :span='14'>
                <el-row>
                  <el-col :span='7'>巡查任务：</el-col>
                  <el-col :span='7'>教育路巡查</el-col>
                </el-row>
              </el-col>
              <el-col :span='10'>
                <el-row>
                  <el-col :span='8'>巡查时间：</el-col>
                  <el-col :span='16'>周一/周三/周五 循环  16:30-23:00</el-col>
                </el-row>
              </el-col>
            </el-row>
            <el-row class="line">
              <el-col :span='24'>
                <el-row>
                  <el-col :span='4'>巡查路线：</el-col>
                  <el-col :span='20'>九耀坊巷005号(101-102-103-104-105-106-107-108-109-110-201-201=203-204-205-206-207-208-209-
                       210-301-302-303-304-305-306-307-308-309-310)-九耀坊巷006号(101-102-103-104-105-106-107-
                       108-109-110-201-201=203-204-205-206-207-208-209-210-301-302-303-304-305-306-307-308-309-
                       310）</el-col>
                </el-row>
              </el-col>
            </el-row>
            <el-row class="line">
              <el-col :span='14'>
                <el-row>
                  <el-col :span='7'>巡查人员：</el-col>
                  <el-col :span='7'>李本本，张慧慧</el-col>
                </el-row>
              </el-col>
              <el-col :span='10'>
                <el-row>
                  <el-col :span='10'>巡查人员手机号：</el-col>
                  <el-col :span='14'>176XXXXXX77</el-col>
                </el-row>
              </el-col>
            </el-row>
            <el-row class="line">
              <el-col :span='14'>
                <el-row>
                  <el-col :span='7'>备注:</el-col>
                  <el-col :span='16'>教育路XX大厦向左转，再直走20米，再右转30米</el-col>
                </el-row>
              </el-col>
            </el-row>
          </div>
        </div>
      </div>
      <div class="rightContent">
        <div class="leaseRoomInfo" :style="{backgroundImage:'url('+imageMap+')'}">
          <!-- <img :src="imageMap" alt="" class="imageMap"> -->
        </div>
      </div>
    </div>
    <!-- 打开地图 -->
    <div class="openMap">
      <div style="margin:5px 0;">实际巡查路线</div>
      <div class="baidumap" id="allmap"></div>
    </div>
    <div style="padding:0 20px;">
      <div style="margin:15px 0 5px 0;">巡查情况记录表</div>
      <el-form :inline="true">
        <el-form-item>
          <el-input placeholder="路" size='small' style="width:150px;"></el-input>
          -
          <el-input placeholder="街" size='small' style="width:150px;"></el-input>
          -
          <el-input placeholder="巷" size='small' style="width:150px;"></el-input>
          -
          <el-input placeholder="号" size='small' style="width:150px;"></el-input>
          -
          <el-input placeholder="之" size='small' style="width:150px;"></el-input>
        </el-form-item>
        <el-form-item label="继承人">
          <el-input placeholder="输入承租人姓名" size='small' style="width:150px;"></el-input>
        </el-form-item>
        <el-form-item label="承租人联系方式">
          <el-input placeholder="输入承租人联系方式" size='small' style="width:150px;"></el-input>
        </el-form-item>
          <el-form-item style="float:right;">
            <el-button type="primary" size='medium'>查询</el-button>
          </el-form-item>
          <el-form-item style="float:right;">
            <el-button type="primary" size='medium'>重置</el-button>
          </el-form-item>
      </el-form>
    </div>

      <div class="eleContract">
        <el-row>
          <el-col>
            <div class="chayueleft">
              <el-row class="yuyuetop">
                <el-col :span="8">教育路九耀坊巷005号-101</el-col>
                <el-col :span="8">巡查时间：2019.12.02  19:10:13</el-col>
                <el-col :span="8">
                  <el-row>
                    <el-col :span="6" style="text-align:center;">
                      巡查状态：异常
                    </el-col>
                    <el-col :span="6" style="text-align:center;">
                      手动添加巡查表
                    </el-col>
                    <el-col :span="12" style="text-align:right;maring-left:20px;">
                      <el-button size="small">照片及签名</el-button>
                      <el-button size="small">导出</el-button>
                    </el-col>
                  </el-row>
                </el-col>
              </el-row>

              <!-- 添加图片 -->
              <div class="eleContractContent">
              <el-row class="line">
                <el-col :span='8'>
                  <el-row>
                    <el-col :span='6'>房屋地址：</el-col>
                    <el-col :span='14'>教育路九耀坊巷005号-101</el-col>
                  </el-row>
                </el-col>
                <el-col :span='8'>
                  <el-row>
                    <el-col :span='6'>面积：</el-col>
                    <el-col :span='14'>44.58㎡</el-col>
                  </el-row>
                </el-col>
                <el-col :span='8'>
                  <el-row>
                    <el-col :span='6'>产别：</el-col>
                    <el-col :span='14'>公产</el-col>
                  </el-row>
                </el-col>
              </el-row>
              <el-row class="line">
                <el-col :span='8'>
                  <el-row>
                    <el-col :span='6'>单元档案码：</el-col>
                    <el-col :span='14'>XXXXXXXXXX</el-col>
                  </el-row>
                </el-col>
                <el-col :span='8'>
                  <el-row>
                    <el-col :span='6'>安全等级：</el-col>
                    <el-col :span='14'>一般</el-col>
                  </el-row>
                </el-col>
                <el-col :span='8'>
                  <el-row>
                    <el-col :span='6'>结构层数：</el-col>
                    <el-col :span='14'>A7</el-col>
                  </el-row>
                </el-col>
              </el-row>
              <el-row class="line">
                <el-col :span='8'>
                  <el-row>
                    <el-col :span='6'>使用性质：</el-col>
                    <el-col :span='14'>住宅</el-col>
                  </el-row>
                </el-col>
                <el-col :span='8'>
                  <el-row>
                    <el-col :span='6'>承租人：</el-col>
                    <el-col :span='14'>杨阳洋</el-col>
                  </el-row>
                </el-col>
                <el-col :span='8'>
                  <el-row>
                    <el-col :span='6'>联系电话：</el-col>
                    <el-col :span='14'>176xxxxxx99</el-col>
                  </el-row>
                </el-col>
              </el-row>
              <el-row class="line">
                <el-col :span='8'>
                  <el-row>
                    <el-col :span='15'>房屋结构及设备检查情况：</el-col>
        
                  </el-row>
                </el-col>
                <el-col :span='8'>
                  <el-row>
                    <el-col :span='16'>房屋使用情况：</el-col>
                    
                  </el-row>
                </el-col>
              </el-row>
              <el-row class="line">
                <el-col :span='8'>
                  <el-row>
                    <el-col :span='15'>有白蚁</el-col>
                  </el-row>
                </el-col>
                <el-col :span='8'>
                  <el-row>
                    <el-col :span='16'>暂未发现违规行为</el-col>
                  </el-row>
                </el-col>
              </el-row>
              <el-row class="line">
                <el-col :span='8'>
                  <el-row>
                    <el-col :span='6'>异常是否上报：</el-col>
                    <el-col :span='14'>是</el-col>
                  </el-row>
                </el-col>
              </el-row>

              </div>
            </div>
          </el-col>
        </el-row>
      </div>
      <div class="eleContract">
        <el-row>
          <el-col>
            <div class="chayueleft">
              <el-row class="yuyuetop">
                <el-col :span="8">教育路九耀坊巷005号-101</el-col>
                <el-col :span="8">巡查时间：2019.12.02  19:10:13</el-col>
                <el-col :span="8">
                  <el-row>
                    <el-col :span="6" style="text-align:center;">
                      巡查状态：异常
                    </el-col>
                    <el-col :span="6" style="text-align:center;">
                      <el-button size="small">发送整改通知</el-button>
                    </el-col>
                    <el-col :span="12" style="text-align:right;maring-left:20px;">
                      <el-button size="small">上报</el-button>
                      <el-button size="small">导出</el-button>
                    </el-col>
                  </el-row>
                </el-col>
              </el-row>

              <!-- 添加图片 -->
              <div class="eleContractContent">
              <el-row class="line">
                <el-col :span='8'>
                  <el-row>
                    <el-col :span='6'>房屋地址：</el-col>
                    <el-col :span='14'>教育路九耀坊巷005号-101</el-col>
                  </el-row>
                </el-col>
                <el-col :span='8'>
                  <el-row>
                    <el-col :span='6'>面积：</el-col>
                    <el-col :span='14'>44.58㎡</el-col>
                  </el-row>
                </el-col>
                <el-col :span='8'>
                  <el-row>
                    <el-col :span='6'>产别：</el-col>
                    <el-col :span='14'>公产</el-col>
                  </el-row>
                </el-col>
              </el-row>
              <el-row class="line">
                <el-col :span='8'>
                  <el-row>
                    <el-col :span='6'>单元档案码：</el-col>
                    <el-col :span='14'>XXXXXXXXXX</el-col>
                  </el-row>
                </el-col>
                <el-col :span='8'>
                  <el-row>
                    <el-col :span='6'>安全等级：</el-col>
                    <el-col :span='14'>一般</el-col>
                  </el-row>
                </el-col>
                <el-col :span='8'>
                  <el-row>
                    <el-col :span='6'>结构层数：</el-col>
                    <el-col :span='14'>A7</el-col>
                  </el-row>
                </el-col>
              </el-row>
              <el-row class="line">
                <el-col :span='8'>
                  <el-row>
                    <el-col :span='6'>使用性质：</el-col>
                    <el-col :span='14'>住宅</el-col>
                  </el-row>
                </el-col>
                <el-col :span='8'>
                  <el-row>
                    <el-col :span='6'>承租人：</el-col>
                    <el-col :span='14'>杨阳洋</el-col>
                  </el-row>
                </el-col>
                <el-col :span='8'>
                  <el-row>
                    <el-col :span='6'>联系电话：</el-col>
                    <el-col :span='14'>176xxxxxx99</el-col>
                  </el-row>
                </el-col>
              </el-row>
              <el-row class="line">
                <el-col :span='8'>
                  <el-row>
                    <el-col :span='15'>房屋结构及设备检查情况：</el-col>
        
                  </el-row>
                </el-col>
                <el-col :span='8'>
                  <el-row>
                    <el-col :span='16'>房屋使用情况：</el-col>
                    
                  </el-row>
                </el-col>
              </el-row>
              <el-row class="line">
                <el-col :span='8'>
                  <el-row>
                    <el-col :span='15'>有白蚁</el-col>
                  </el-row>
                </el-col>
                <el-col :span='8'>
                  <el-row>
                    <el-col :span='16'>暂未发现违规行为</el-col>
                  </el-row>
                </el-col>
              </el-row>
              <el-row class="line">
                <el-col :span='8'>
                  <el-row>
                    <el-col :span='6'>异常是否上报：</el-col>
                    <el-col :span='14'>是</el-col>
                  </el-row>
                </el-col>
              </el-row>

              </div>
            </div>
          </el-col>
        </el-row>
      </div>
  </section>
</template>

<script>
import BaiduMap  from '../../map.js'
export default {
  data(){
    return{
      contractInfor:{},
      fileList2:[],
      dialogVisible:false,
      imageMap:require('../../assets/ditutu.png')
    }
  },
  methods:{
    getList(item){
      if(item == 1){
        this.$router.push({
          path:'./fwxcPhone'
        })
      }else if(item == 2){
        this.$router.push({
          path:'./fwxcErr'
        })
      }
    }
  },
  mounted(){
    var th = this
    BaiduMap.init().then((BMap) => {
      this.$nextTick(function () {
        // 创建Map实例
        var map = new BMap.Map("allmap");
        map.centerAndZoom(new BMap.Point(116.404, 39.915), 14);  // 初始化地图,设置中心点坐标和地图级别
        var transit = new BMap.DrivingRoute(map, {
        renderOptions: {
          map: map,
          panel: "r-result",
          enableDragging : true //起终点可进行拖拽
        },  
      });
      transit.search("福田站","科苑北");

        th.searchMap=map
				// // 初始化地图,设置中心点坐标，
				var point = new BMap.Point(); // 创建点坐标，汉得公司的经纬度坐标
            map.addEventListener("click",function(e){
              console.log(e.point)
              th.addApartt.longitude=e.point.lng
              th.addApartt.latitude=e.point.lat
            });
        // // 定位
        var geolocation = new BMap.Geolocation();
        geolocation.getCurrentPosition(function(r){
          if(this.getStatus() == BMAP_STATUS_SUCCESS){
            var mk = new BMap.Marker(r.point);
            map.addOverlay(mk);
            map.panTo(r.point);
	            //添加地图类型控件
              map.addControl(new BMap.MapTypeControl({
                mapTypes:[
                    BMAP_NORMAL_MAP,
                    BMAP_HYBRID_MAP
                ]}));	
          }
          else {
            alert('failed'+this.getStatus());
          }        
        });
				map.enableScrollWheelZoom();
			})
    })
  }
}
</script>

<style scoped>
@import '../../assets/manage.css';
@import '../../assets/home.css';
.openMap{
  margin-top:20px;
  margin-bottom:20px;
  padding-left:20px;
  padding-right:20px;
}
.steps_box{
  margin-top:20px;
}
.steps_content{
  display: flex;
  margin-top:10px;
}
.yuyuetop{
  background:#d3dce6;
}
.eleContract{
  padding:0 20px;
  margin-bottom:20px;
}
.eleContract .el-row{
  display: flex;
  align-items: center;
}
.eleContractContent{
  border:1px solid #d3dce6;
}
.leaseRoomInfo{
  height:200px;
  background-size: cover;
  background-repeat: no-repeat;
  margin-right:20px;
}
</style>