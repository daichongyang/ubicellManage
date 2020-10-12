<template>
  <section>
    <div class="content">
      <!-- 报警报修 -->
      <div class="cont_box">
        <div class="cont_box_header" :style="{background:'url('+images[7]+')no-repeat'}">
          <div class="cont_box_header_mone">
            <span class="blue"></span>
            <span>更多</span>
          </div>
        </div>
        <div class="show_bjwx">

          <div class="show_bjwx_li" style="margin-left:8px;">
            <div class="bjwx_item1">
              <div class="bjwx_item1_infor">
                <div class="bjwx_item1_infor_box">
                  <div>22</div>
                  日报警量
                </div>
              </div>
            </div>
            <div class="bjwx_item2">
              <div class="bjwx_item2_infor">
                <div class="bjwx_item2_infor_box">
                  周报警量
                </div>
              </div>
            </div>
            <div class="bjwx_item3">
              <div class="bjwx_item2_infor">
                <div class="bjwx_item2_infor_box">
                  月报警量
                </div>
              </div>
            </div>
          </div>
          
          <div class="show_bjwx_li">
            <div class="bjwx_item1 bbjwx_item1">
              <div class="bjwx_item1_infor">
                <div class="bjwx_item1_infor_box" style="color:#1fc9f3">
                  <div>22</div>
                  日保修量
                </div>
              </div>
            </div>
            <div class="bjwx_item2 bbjwx_item2">
              <div class="bjwx_item2_infor">
                <div class="bjwx_item2_infor_box" style="color:#256dc6">
                  周保修量
                </div>
              </div>
            </div>
            <div class="bjwx_item3 bbjwx_item3">
              <div class="bjwx_item2_infor">
                <div class="bjwx_item2_infor_box" style="color:#256dc6">
                  月保修量
                </div>
              </div>
            </div>
          </div>

          <div class="show_bjwx_li">
            <div class="bjwx_item1 cbjwx_item1">
              <div class="bjwx_item1_infor">
                <div class="bjwx_item1_infor_box" style="color:#1bd385">
                  <div>22</div>
                  日维修量
                </div>
              </div>
            </div>
            <div class="bjwx_item2 cbjwx_item2">
              <div class="bjwx_item2_infor">
                <div class="bjwx_item2_infor_box" style="color:#149e64">
                  周维修量
                </div>
              </div>
            </div>
            <div class="bjwx_item3 cbjwx_item3">
              <div class="bjwx_item2_infor">
                <div class="bjwx_item2_infor_box" style="color:#149e64">
                  月维修量
                </div>
              </div>
            </div>
          </div>

        </div>
        <!--  -->
        <div class="bjwx_albel">
          <span>均维修时长： 2.2h</span>
        </div>
        <!--  -->
        <div class="bjwx_ti">报警记录</div>
        <div class="bjwx_albel2">
          <span>可疑人员进入</span>
          <span>更多</span>
          <span class="blue red"></span>
        </div>
        <div class="bjwx_albel2">
          <span>设备电量低</span>
          <span>更多</span>
          <span class="blue red"></span>
        </div>
        <div class="bjwx_albel2">
          <span>水位过高预警</span>
          <span>更多</span>
          <span class="blue red"></span>
        </div>
      </div>
        <!-- 进出入 -->
      <div class="cont_box">
        <div class="cont_box_header" :style="{background:'url('+images[5]+')no-repeat'}">
          <div class="cont_box_header_mone">
            <span class="blue"></span>
            <span>更多</span>
          </div>
        </div>
        <div class="change_option">
          <select name="" class="change_select">
            <option value="1">一天</option>
            <option value="2">2天</option>
          </select>
        </div>
        <div class="zd_albel2">
          <div class="zd_albel2_item1">
            <img src="../assets/img/index/fanzaijiayuanht_jcr_3.png" alt="">
            <span class="zd_albel2_span">
              进来次数
            </span>
            <span>
              132
            </span>
          </div>
          <div class="zd_albel2_item2">
            <img src="../assets/img/index/fanzaijiayuanht_jcr_4.png" alt="">
            <span class="zd_albel2_span">
              出去次数
            </span>
            <span>
              132
            </span>
          </div>
          <div class="zd_albel2_item3">
            <img src="../assets/img/index/fanzaijiayuanht_jcr_5.png" alt="">
            <span class="zd_albel2_span">
              进出总数
            </span>
            <span>
              264
            </span>
          </div>
        </div>
        <div class="jcr_tupian">
          <div>
            <div>
              <img src="../assets/img/index/fanzaijiayuanht_jcr_6.png" alt="">
            </div>
            <div class="jcr_tupian_text">进出方式类型比例</div>
          </div>
          <div>
            <div>
              <img src="../assets/img/index/fanzaijiayuanht_jcr_6.png" alt="">
            </div>
            <div class="jcr_tupian_text">进出人员类型比例</div>
          </div>
        </div>
      </div>
        <!-- 对讲 -->
      <div class="cont_box">
        <div class="cont_box_header"  :style="{background:'url('+images[6]+')no-repeat'}">
          <div class="cont_box_header_mone">
            <span class="blue"></span>
            <span>更多</span>
          </div>
        </div>
        <div class="zd_albel2">
          <div class="zd_albel2_item1">
            <img src="../assets/img/index/fanzaijiayuanht_dj_2.png" alt="">
            <span class="zd_albel2_span">
              日均数
            </span>
            <span>
              132
            </span>
          </div>
          <div class="zd_albel2_item1">
            <img src="../assets/img/index/fanzaijiayuanht_dj_3.png" alt="">
            <span class="zd_albel2_span">
              月均数
            </span>
            <span>
              132
            </span>
          </div>
          <div class="zd_albel2_item3">
            <img src="../assets/img/index/fanzaijiayuanht_dj_4.png" alt="">
            <span class="zd_albel2_span">
              累计次数
            </span>
            <span>
              264
            </span>
          </div>
        </div>
        <div class="zd_t">对讲发起类型比率</div>
        <div class="zd_albel2">
          <div class="zd_albel2_item1">
            <img src="../assets/img/index/fanzaijiayuanht_dj_5.png" alt="">
            <span class="zd_albel2_span">
            手机
            </span>
            <span>
              64%
            </span>
          </div>
          <div class="zd_albel2_item1">
            <img src="../assets/img/index/fanzaijiayuanht_dj_6.png" alt="">
            <span class="zd_albel2_span">
              室内机
            </span>
            <span>
              132
            </span>
          </div>
          <div class="zd_albel2_item1">
            <img src="../assets/img/index/fanzaijiayuanht_dj_7.png" alt="">
            <span class="zd_albel2_span">
              门口机
            </span>
            <span>
              264
            </span>
          </div>
        </div>
      </div>
    </div>
    <div class="content">
      <!-- 项目/用户 -->
      <div class="cont_box">
        <div class="cont_box_header" :style="{background:'url('+images[0]+')no-repeat'}">
          <div class="cont_box_header_mone">
            <span class="blue"></span>
            <span>更多</span>
          </div>
        </div>

        <div class="cont_des">
          <div class="cont_des_item1">
            <div class="cont_des_item1_one">
              <p></p>
              <p></p>
            </div>
            <div class="cont_des_item1_tow">
              <p>
                <span>男</span>
                <span>38%</span>
              </p>
              <p>
                <span>女</span>
                <span>38%</span>
              </p>
            </div>
          </div>

          <div class="cont_des_item2">
            <div class="cont_des_item2_one">
              <p></p>
              <p></p>
              <p></p>
            </div>
            <div class="cont_des_item2_tow">
              <p>
                <span>业主</span>
                <span>55</span>
              </p>
              <p>
                <span>租客</span>
                <span>137</span>
              </p>
              <p>
                <span>访客</span>
                <span>25</span>
              </p>
            </div>
          </div>
          <div class="cont_des_item3">
            <div>房间数量</div>
            <div></div>
            <div>4893</div>
          </div>
          <div class="cont_des_item4">
            <div>入住</div>
            <div></div>
            <div>98</div>
          </div>
          <div class="cont_des_item5">
            <div>空置</div>
            <div></div>
            <div>46</div>
          </div>

          <div class="cont_des_item4 cont_des_item6">
            <div>搬入</div>
            <div></div>
            <div>46</div>
          </div>
          <div class="cont_des_item5">
            <div>搬出</div>
            <div></div>
            <div>46</div>
          </div>
        </div>
      </div>
      <!-- 账单 -->
      <div class="cont_box">
        <div class="cont_box_header" :style="{background:'url('+images[1]+')no-repeat'}">
          <div class="cont_box_header_mone">
            <span class="blue"></span>
            <span>更多</span>
          </div>
        </div>
        <div class="change_option">
          <select name="" class="change_select">
            <option value="1">一天</option>
            <option value="2">2天</option>
          </select>
        </div>
        <div class="echart_box">
          <div class="echart_item">
              <div id="echarts1"></div>
              <div class="echarts1Infor" :style="{color:echarts1Infor.color}">
                <span>{{echarts1Infor.value1}}</span>
                <span>{{echarts1Infor.name1}}</span>
              </div>
          </div>
          <div class="echart_item2">
              <div id="echarts2"></div>
              <div class="echarts1Infor" style="color:#1aaf6f">
                <span>{{echarts2Infor.value1}}</span>
                <span>{{echarts2Infor.name1}}</span>
              </div>
          </div>
        </div>
      </div>
      <!-- 资产/设备 -->
      <div class="cont_box">
        <div class="cont_box_header" :style="{background:'url('+images[2]+')no-repeat'}">
          <div class="cont_box_header_mone">
            <span class="blue"></span>
            <span>更多</span>
          </div>
        </div>
        <div class="zc_apart">
          <div class="zc_apart_header">
            <img src="@/assets/img/index/fanzaijiayuanht_zc_2.png" alt="">
            <span style="margin: 0 6px 0 3px">资产总数</span>
            <span>688</span>
          </div>
          <div class="zc_des">
            <div class="zc_des_li">
              <div>165</div>
              <div>一</div>
              <div>电脑</div>
            </div>
            <div class="zc_des_li">
              <div>165</div>
              <div>一</div>
              <div>办公桌</div>
            </div>
            <div class="zc_des_li">
              <div>165</div>
              <div>一</div>
              <div>保安服</div>
            </div>
          </div>
        </div>
        <div class="sb_apart">
          <div class="sb_apart_header">
            <span style="margin-right:10px;">设备总数量</span>
            <span>8385</span>
          </div>
          <div class="echart_sb">
            <div id="echart_sb"></div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import echarts from 'echarts'
export default {
  data(){
    let datas = {
        xdata: [2016, 2017, 2018, 2019],
        dataArr: [139.1, 121.3, 80.0, 61.5]
    }

    let maxYdata = [];
    for (let i = 0; i < datas.dataArr.length; i++) {
        maxYdata.push(100)
    };
    return{
      images:[
        require('../assets/img/index/fanzaijiayuanht_xmyh_1.png'),
        require('../assets/img/index/fanzaijiayuanht_zd_1.png'),
        require('../assets/img/index/fanzaijiayuanht_zc_1.png'),
        require('../assets/img/index/fanzaijiayuanht_tcc_1.png'),
        require('../assets/img/index/fanzaijiayuanht_ny_1.png'),
        require('../assets/img/index/fanzaijiayuanht_jcr_1.png'),
        require('../assets/img/index/fanzaijiayuanht_dj_1.png'),
        require('../assets/img/index/fanzaijiayuanht_bx_1.png'),
      ],
      echarts1Infor:{//财务管理点击信息
        value1:100,
        name1:'总账单/万',
        color:'#17c0e4'
      },
      echarts2Infor:{//财务管理点击信息
        value1:100,
        name1:'预计未来收入/万',
      },
      option1:{
        series: [
          {
            name: '面积模式',
            type: 'pie',
            radius: [30, 50],
            center: ['50%', '50%'],
            hoverAnimation:false,//禁止触摸放大
            labelLine: {
              show: false
            },
            data: [
              {
                value: 34,
                name: '吴际帅\n牛亚莉',
                itemStyle: {
                  color: new echarts.graphic.LinearGradient(0, 1, 0, 0, [{
                      offset: 0,
                      color: '#a8184b'
                  }, {
                      offset: 1,
                      color: '#a5455a'
                  }])
                },
              },
              {
                value: 52,
                name: 'rose2',
                itemStyle: {
                    color: "transparent"
                }
              }
            ]
        },
        {
          name: '面积模式',
          type: 'pie',
          radius: [34, 46],
          center: ['50%', '50%'],
          hoverAnimation:false,//禁止触摸放大
          labelLine: {
            show: false
          },
          data: [
            {
              value: 34,
              name: '吴际帅\n牛亚莉',
              itemStyle: {
                  color: "transparent"
              }
            },
            {
              value: 52,
              name: '',
              itemStyle: {
                  color: new echarts.graphic.LinearGradient(0, 1, 0, 0, [{
                      offset: 0,
                      color: '#093656'
                  }, {
                      offset: 1,
                      color: '#15b2d9'
                  }])
              },
            }]
          }
        ]
      },
      option2:{
        series: [
          {
            name: '面积模式',
            type: 'pie',
            radius: [35, 48],
            center: ['50%', '50%'],
            hoverAnimation:false,//禁止触摸放大
            labelLine: {
              show: false
            },
            data: [
              {
                value: 34,
                name: '吴际帅\n牛亚莉',
                itemStyle: {
                  color: new echarts.graphic.LinearGradient(0, 1, 0, 0, [{
                      offset: 0,
                      color: '#04342a'
                  }, {
                      offset: 1,
                      color: '#1aaf6f'
                  }])
                },
              }
            ]
          }
        ]
      },
      option3:{
        title: {
            textStyle: {
                fontSize: 14
            }
        },
        tooltip: { // 提示框组件
            trigger: 'axis',
            show: true,
            backgroundColor:'#051b37',
            borderWidth:'1',
            borderColor:'#19dcf3',
            padding: [
                5, // 上
                10, // 右
                5,  // 下
                10, // 左
            ],
            textStyle:{
                color:"#19dcf3",
                fontSize :12
            },
            axisPointer: { // 坐标轴指示器，坐标轴触发有效
                type: '' // 默认为直线，可选为：'line' | 'shadow'
            },
            formatter: function(params) {
                return params[0].name + "年" + params[0].data + datas.company+"<br/>love";
            }
        },
        grid: {
            left: '0%',
            right: '0%',
            bottom: '10%',
            top: '10%',
            containLabel: true,
            show: false // 网格边框是否显示，上和右边框 
        },
        xAxis: {
            type: 'category',
            boundaryGap: true, // 坐标轴两边留白
            axisLabel: {
                color: '#1c4e8b',
                fontSize: 12,
                formatter: function(params) {
                    for (var i = 0;i < datas.xdata.length; i++) {
                            return '{a|' + params + '}\n{b|(' + params + ')}';
                    }
                    console.log(params)
                },
                rich: {//设置label样式
                    a: {
                        color: '#1c4e8b',
                        lineHeight: 10
                    },
                    b: {
                        height: 10,
                        color:'#149e64',
                        fontSize:12
                    },
                }   
            },
            axisLine: {
                show: true,
                lineStyle: {
                    color: 'transparent',
                }
            },
            data: datas.xdata
        },
        yAxis: [{
            name: "数量",
            nameTextStyle:{
                fontSize: 12,
                color:"#1c4e8b"
            },
            type: 'value',
            axisLine: {
                show: false
            },
            axisTick: {
                show: false,
            },
            axisLabel: {
                color: '#1c4e8b',
                fontSize: 12,
                // margin: 25,
                formatter: '{value}'
            },
            splitLine:{
              show:true,
              lineStyle:{
                  type:"dashed",
                  color:'#1c4e8b'
              }
            },
        }, {
            name: "",
            type: 'value',
            axisLine: {
                show: false,
                lineStyle: {
                    color: '#94a1a9',
                }
            },
            axisTick: {
                show: false,
            },
            axisLabel: {
              show: false,
            },
            splitLine:{
              show:false,
            
            },
        }, ],
        series: [{
            name: '',
            type: 'bar',
            stack: '1',
            zlevel: 2,
            barGap: '50%',
            barWidth: '70%',
            barCategoryGap: "50%",
            color: 'transparent',
          
            itemStyle: {
                normal: {
                    color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                        offset: 0,
                        color: "#187cb1"
                    }, {
                        offset: 1,
                        color: '#05111f'
                    }]),
                    label: {
                        show: false,
                    }

                }
            },
            data: datas.dataArr
        }, {
            name: '',
            type: 'bar',
            barGap: '-100%',
            yAxisIndex: 1,
            zlevel: 1,
            itemStyle: {
                normal: {
                    color: '#062041',
                    borderWidth: 0,
                    shadowBlur: {
                        shadowColor: 'rgba(61, 69, 79,0.31)',
                        shadowBlur: 10,
                        shadowOffsetX: 0,
                        shadowOffsetY: 2,
                    },
                }
            },
            barWidth: '70%',
            data: maxYdata
        }]
      }
    }
  },
  methods:{
    drawEcharts1(){//账单
      let myChart = echarts.init(document.getElementById('echarts1'))
      myChart.on('click',(param)=>{
        if(param.dataIndex == 0){
          this.echarts1Infor.color = '#a8184b'
        }else{
          this.echarts1Infor.color = '#15b2d9'
        }
        this.echarts1Infor.value1 = param.value
        this.echarts1Infor.name1 = param.name
      })
      myChart.setOption(this.option1);
    },
    drawEcharts2(){
      let myChart = echarts.init(document.getElementById('echarts2'))
      myChart.setOption(this.option2);
    },
    drawEcharts3(){//设备总数
      let myChart = echarts.init(document.getElementById('echart_sb'))
      myChart.setOption(this.option3);
    }
  },
  mounted(){
    this.drawEcharts1()
    this.drawEcharts2()
    this.drawEcharts3()

  }
}
</script>

<style scoped>
  @import '../assets/css/indexMod.css';
  .cont_box_header{
    background: url('../assets/img/index/fanzaijiayuanht_xmyh_1.png')no-repeat;
  }
</style>