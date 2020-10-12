<template>
<section>
  <div class="steps_box">
    <el-steps :active="active" align-center>
      <el-step title=" "></el-step>
      <el-step title=" "></el-step>
      <el-step title=" "></el-step>
      <el-step title=" "></el-step>
      <el-step title=" "></el-step>
      <el-step title=" "></el-step>
    </el-steps>
    <div class="steps_content">
      <el-form class="elfff">
        <el-form-item>
          <el-input placeholder="输入承租人姓名" value="教育路九耀坊巷005号" size='small'></el-input>
        </el-form-item>
      </el-form>
      <el-form class="elfff">
        <el-form-item>
          <el-input placeholder="输入承租人姓名" value="教育路九耀坊巷007号" size='small' @focus="changeShow" @blur="changeShow"></el-input>
        </el-form-item>
        <el-form-item v-if="show">
          <el-input
            type="textarea"
            class="input_are"
            maxlength='500'
            :autosize="{ minRows: 4, maxRows: 4}"
            placeholder="多行输入"
            value="101-102-103-104-105-106-107-108-109-110-201-202-203-204-205-206-207-208-209-210-301-302-304"
          >
          </el-input>

          <el-button class="choiseHose" size='small'>选择房间号</el-button>
          <el-input
            type="textarea"
            maxlength='500'
            placeholder="多行输入"
            :autosize="{ minRows: 3, maxRows: 4}"
            value="位置备注：教育路XX大厦向左转，再直走20米，再右转30米"
          >
          </el-input>
        </el-form-item>

      </el-form>
      <el-form class="elfff">
        <el-form-item>
          <el-button type="primary" icon="el-icon-plus" size='medium'>新增巡查地址</el-button>
        </el-form-item>
      </el-form>
      <el-form class="elfff">
        <el-form-item>
          <el-button type="primary" icon="el-icon-plus" size='medium'>新增巡查地址</el-button>
        </el-form-item>
      </el-form>
      <el-form class="elfff">
        <el-form-item>
          <el-button type="primary" icon="el-icon-plus" size='medium'>新增巡查地址</el-button>
        </el-form-item>
      </el-form>
      <el-form class="elfff">
        <el-form-item>
          <el-button type="primary" icon="el-icon-plus" size='medium'>新增巡查地址</el-button>
        </el-form-item>
      </el-form>
    </div>

    <!-- 打开地图 -->
    <div class="openMap">
      <div class="baidumap" id="container"></div>
    </div>
  </div>
  <el-form :inline="true" style="margin-bottom:10px;">
    <el-form-item  size="small" label="巡检时间段:" style="margin-left:60px;">
  <el-time-select
    placeholder="起始时间"
    v-model="startTime"
    :picker-options="{
      start: '08:30',
      step: '00:15',
      end: '18:30'
    }">
  </el-time-select>
  <el-time-select
    placeholder="结束时间"
    v-model="endTime"
    :picker-options="{
      start: '08:30',
      step: '00:15',
      end: '18:30',
      minTime: startTime
    }">
  </el-time-select>
    </el-form-item>
  </el-form>
  <el-form style="margin-bottom:10px;">
      <el-radio-group class="width333" v-model="choised">
        <el-form-item label="巡检日期:" size="small" style="margin-left:60px;display:flex;margin-bottom:10px;">
          <el-radio :label="1">
            <el-date-picker
              v-model="ddd"
              type="datetime"
              placeholder="选择日期">
            </el-date-picker>
          </el-radio >

        </el-form-item>
        <el-form-item style="margin-left:130px;display:flex;">
          <el-radio :label="2"> 每周循环</el-radio >
          <el-button :type="choiseDate == 1?'primary':''" size='medium' @click="changeDate(1)">周一</el-button>
          <el-button :type="choiseDate == 2?'primary':''" size='medium' @click="changeDate(2)">周二</el-button>
          <el-button :type="choiseDate == 3?'primary':''" size='medium' @click="changeDate(3)">周三</el-button>
          <el-button :type="choiseDate == 4?'primary':''" size='medium' @click="changeDate(4)">周四</el-button>
          <el-button :type="choiseDate == 5?'primary':''" size='medium' @click="changeDate(5)">周五</el-button>
          <el-button :type="choiseDate == 6?'primary':''"  size='medium' @click="changeDate(6)">周六</el-button>
          <el-button :type="choiseDate == 7?'primary':''"  size='medium' @click="changeDate(7)">周日</el-button>
        </el-form-item>
      </el-radio-group>
  </el-form>
    <el-form :inline="true">
    <el-form-item label="巡检人员：" style="margin-left:60px;">
      <el-input
        type="textarea"
        style="width:680px;"
        maxlength='500'
        :autosize="{ minRows: 4, maxRows: 4}"
        placeholder="多行输入">
      </el-input>
    </el-form-item>
    <el-form-item label="">
      <el-button size='small'>选择巡检人员</el-button>
    </el-form-item>
  </el-form>
  <el-form>
    <el-form-item label="" style="margin-left:60px;display:flex;margin-bottom:10px;">
      <el-radio> 保存同时发送巡检任务通知给巡检人员</el-radio >
    </el-form-item>
  </el-form>
  <el-form>
    <el-form-item label="" style="text-align:center;margin-bottom:20px;">
      <el-button>保存</el-button>
    </el-form-item>
  </el-form>
</section>


</template>

<script>
import Amap from '../../assets/js/initmap'
export default {
  data(){
    return{
      active:1,
      show:false,
      startTime:'',
      endTime:'',
      choiseDate:'',
      ddd:'',
      choised:1
    }
  },
  methods:{
    changeShow(){
      console.log(111)
      this.show = !this.show
    },
    changeDate(item){//更换日期
      this.choiseDate = item
    },
      initAmap(){
      let _this = this
    // 初始化地图
      Amap.init().then((Amap)=>{
        let buildingLayer = new AMap.Buildings({zIndex:130,merge:false,sort:false,zooms:[17,20]});
        buildingLayer.setStyle(_this.options);
        var map = new AMap.Map("container", {
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
                center:[116.472268,39.995693],
                layers:[
                  new AMap.TileLayer(),
                  buildingLayer,
                ]
        });
        this.addMarker(map)
      })
    },
  },
  mounted(){
    this.initAmap()
  }
}
</script>

<style scoped>
.openMap{
  margin-top:20px;
  margin-bottom:20px;
}
.baidumap{
  height:330px;
  width:100%;
}
.steps_box{
  margin-top:20px;
}
.steps_content{
  display: flex;
  margin-top:10px;
}
.elfff{
  max-width: 16.6667%;
  flex-basis: 16.6667%;
}
.elfff .el-form-item{
  padding-left: 8%;
  padding-right: 8%;
  text-align: center;
}
.input_are{
  position:relative;
  margin-bottom:20px;
}
.choiseHose{
  position:absolute;
  bottom:100px;
  right:-100px;
}
</style>