<template> 
  <section>
    <div id="container"></div> 
        <!-- 首页模块 -->
    <index-mod class="modelue_cont"></index-mod>
        <!-- 上面数字显示 -->
    <div class="show_des_infor">
      <div class="show_des_infor_item">
        <div>82471</div>
        <div>用户总数</div>
      </div>
      <div class="show_des_infor_item">
        <div>12</div>
        <div>项目总数</div>
      </div>
      <div class="show_des_infor_item">
        <div>10</div>
        <div>综合体</div>
      </div>
      <div class="show_des_infor_item">
        <div>15</div>
        <div>租赁</div>
      </div>
      <div class="show_des_infor_item">
        <div>20</div>
        <div>社区</div>
      </div>
      <div class="show_des_infor_item">
        <div>12</div>
        <div>写字楼</div>
      </div>
    </div>
  </section>
</template>


<script>
  const {log} = console
  import indexMod from './indexMod.vue'
  import Amap from '../assets/js/initmap'
  import {xqSelectList} from "../url/api"
  export default {
    data() {
      return {
        infor:{},
        vueMap:{},
        xqSelectInfor:[],
        options:{
          hideWithoutStyle:false,//是否隐藏设定区域外的楼块
          areas:[{ //围栏1
                //visible:false,//是否可见
                rejectTexture:true,//是否屏蔽自定义地图的纹理
                color1: 'ff4c99f8',//楼顶颜色
                color2: 'ff134872',//楼面颜色
                path: [[116.473606,39.995997],[116.473005,39.995482],[116.472442,39.994971],[116.472267,39.994801],[116.471307,39.995442],[116.471242,39.995446],[116.471163,39.995403],[116.4703,39.994639],[116.469916,39.994315],[116.469194,39.993719],[116.469032,39.993863],[116.468815,39.994108],[116.468625,39.994355],[116.468471,39.99466],[116.468421,39.994811],[116.468366,39.995156],[116.468306,39.996157],[116.468308,39.996557],[116.468483,39.996884],[116.468834,39.997188],[116.469481,39.997764],[116.470511,39.998708],[116.471404,39.999517],[116.471553,39.999568],[116.471713,39.999563],[116.471929,39.999463],[116.473228,39.998584],[116.474008,39.998046],[116.474541,39.997674],[116.474541,39.997576],[116.474604,39.997049],[116.474586,39.996895],[116.474179,39.996516],[116.473585,39.995997],[116.473606,39.995997]]
          }, { //围栏2
                color1: 'ff99ff00',
                color2: 'ff134872',
                path: [[116.474609,39.993478],[116.474489,39.993495],[116.473693,39.994009],[116.472898,39.994546],[116.472837,39.9946],[116.4728,39.994653],[116.472779,39.994745],[116.47282,39.994815],[116.47491,39.99655],[116.475041,39.996607],[116.47525,39.996643],[116.475715,39.996686],[116.475947,39.996688],[116.476103,39.996658],[116.477228,39.995932],[116.477261,39.995833],[116.477264,39.995729],[116.477205,39.995625],[116.47642,39.994899],[116.474854,39.993558],[116.47469,39.99348],[116.474609,39.993478]]
          }]
        }
      }
    },
    methods:{
      addMarker(map) {
          let _this = this
          this.xqSelectInfor.forEach(item => {
            if(item.isShow){
              let marker = new AMap.Marker({
                  map: map,
                  position: [item.longitude,item.latitude],
              });
              marker.setMap(map);

                // 设置鼠标划过点标记显示的文字提示
                marker.setTitle(item.name);

                // 设置label标签
                // label默认蓝框白底左上角显示，样式className为：amap-marker-label
                marker.setLabel({
                    offset: new AMap.Pixel(0, 0),  //设置文本标注偏移量
                    content: "<div class='info' style='padding-bottom:20px;font-size:12px;padding:10px 10px;background:rgba(0,0,0,0);border:1px solid #63D7D6;color:#63D7D6;border-radius:5px;'>"+item.name, //设置文本标注内容
                    direction: 'top' //设置文本标注方位
                });
                marker.name=item.name
                marker.latitude=item.latitude
                marker.longitude=item.longitude
                marker.id=item.id
                marker.on('click', _this.goCommunityListMap);
            }

          });
          // let html = '<div class="tuxing_box2" style="position:relative;padding-bottom:20px;font-size:12px;min-height:100px;width:140px;padding:10px 10px;background:rgba(5,28,58,0.5);  border:1px solid #19dcf3;color:#19dcf3;border-radius:5px;">'+
          //             '<div class="radio radio_right"></div>'+
          //             '<div style="position:relative;"><h5>金生幼儿园</h5><span id="xiangqng" style="cursor: pointer;position:absolute;top:0;right:0;">详情</span></div>'+
          //             '<div>'+
          //               '<span>  华东区-深圳市-南山区 </span>'+
          //             '</div>'+
          //             '<div>'+
          //               '<span> 用户：34000 </span>'+
          //             '</div>'+
          //             '<div>'+
          //               '<span>日均：1311</span>'+
          //             '</div>'+
          //             '<div>'+
          //               '<span>34℃ 湿度69% PM2.5 10%</span>'+
          //             '</div>'+
  
          //             '<div style="position: absolute;bottom: 0px;margin: 0px auto;height: 0px;width: 100%;clear: both;text-align: center;">'+
          //               '<img style="z-index: 104;position: relative;" src="https://webapi.amap.com/images/sharp.png">'+
          //             '</div>'+
          //           '</div>'
          // var infoWindow = new AMap.InfoWindow({
          //     isCustom: true,  //使用自定义窗体
          //     content: html,
          //     offset: new AMap.Pixel(16, -45)
          // });

          // map.clearMap();
          // var marker = new AMap.Marker({  
          //     map: map,
          //     position: [114.035927,22.557357]
          // });
          // //鼠标点击marker弹出自定义的信息窗体
          // AMap.event.addListener(marker, 'click', function () {
          //     infoWindow.open(map, marker.getPosition());
          // });
          // infoWindow.open(map, marker.getPosition());
      },
      initAmap(){
        let _this = this
      // 初始化地图
        Amap.init().then((Amap)=>{
          // 用于标记楼快
              let buildingLayer = new AMap.Buildings({zIndex:130,merge:false,sort:false,zooms:[17,20]});
              buildingLayer.setStyle(_this.options);
              const map = new AMap.Map('container', {
                resizeEnable: true,
                rotateEnable:true,
                pitchEnable:true,
                zoom: 10,
                pitch:50,//视角偏移量
                rotation:-5,
                viewMode:'3D',//开启3D视图,默认为关闭
                buildingAnimation:true,//楼块出现是否带动画
                expandZoomRange:true,
                zooms:[3,20],
                features:['bg','point','road'],
                mapStyle:'amap://styles/dark',
                center:[114.035927,22.557357],
                layers:[
                  new AMap.TileLayer(),
                  buildingLayer,
                ]
            });
            _this.vueMap = map
            // map.addControl(new AMap.Scale())
            new AMap.Polygon({
                bubble:true,
                fillOpacity:0.4,
                strokeWeight:1,
                path:_this.options.areas[0].path,
                map:map
            })
            new AMap.Polygon({
                bubble:true,
                fillColor:'green',
                fillOpacity:0.2,
                strokeWeight:1,
                path:_this.options.areas[1].path,
                map:map
            })
            xqSelectList({}).then(res=>{//查询小区列表
              console.log(res)
              if(res.data.code == 200){
                _this.xqSelectInfor = res.data.data
                 _this.addMarker(map)
              }
            })
           
        })
      },
    getxqSelectList() {
      xqSelectList({}).then(res=>{
        console.log(res)
        if(res.data.code == 200){
          this.xqSelectInfor = res.data.data
          // this.addMarker()
        }
      })
    },
      goCommunityListMap(e) {//小区地图信息和列表信息
      // console.log(e)
        let params = {
          latitude:e.target.latitude,
          longitude:e.target.longitude,
          name:e.target.name,
          xqId:e.target.id
        }
        console.log(params)
        sessionStorage.setItem('mapInfor',JSON.stringify(params))
      },
    },
    mounted(){
      // this.getxqSelectList()
      this.initAmap()
      // console.log(this.menus)
    },
    components:{
      indexMod
    }
  };
</script>
<style scoped>
  #container {
    width:100%; 
    height: 100%;
  }
  .modelue_cont {
    position: absolute;
    top: 0;
    right: 10px;
    width: 950px;
    height: 100%;
    overflow: hidden;
    overflow-y: scroll;
    z-index: 200;
    display: flex;
}
.amap-marker-label{
  background-color: rgba(0, 0, 0, 0) !important;
}
.modelue_cont::-webkit-scrollbar {
    display: none
}
.show_des_infor {
    position: absolute;
    top: 10px;
    left: 280px;
    width: 510px;
    z-index: 100;
    background: rgba(12, 41, 66, 0.8);
    color: #9fe7ff;
    text-align: center;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 16px 0;
}

.show_des_infor_item {
    min-width: 80px;
    border-left: 1px solid transparent;
    border-image: -webkit-linear-gradient(#082339, #9fe7ff) 1;
    border-image: linear-gradient(#082339, #9fe7ff) 1;
}

.show_des_infor_item:first-child {
    border: 0;
}

.show_des_infor_item div:nth-child(1) {
    font-size: 30px;
    line-height: 30px;
}

.show_des_infor_item div:nth-child(2) {
    font-size: 14px;
}
</style>
