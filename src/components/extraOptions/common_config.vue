<template>
  <section class="modlude">
    <div class="nav_options" style="margin-bottom:20px;">
      <div class="nav_option" :class="{nav_option_active:isActive == 1}" @click="isActive=1">
        <span>支付配置</span>
      </div>
      <div class="nav_option" :class="{nav_option_active:isActive == 2}" @click="gozhangdan_config">
        <span>账单配置</span>
      </div>
      <div class="nav_option" :class="{nav_option_active:isActive == 3}" @click="isActive=3">
        <span>考勤配置</span>
      </div>
      <div class="nav_option" :class="{nav_option_active:isActive == 4}" @click="isActive=4">
        <span>保修类型配置</span>
      </div>
      <div class="nav_option" :class="{nav_option_active:isActive == 5}" @click="isActive=5">
        <span>在线申请配置</span>
      </div>
      <div class="nav_option" :class="{nav_option_active:isActive == 6}" @click="isActive=6">
        <span>内容可见范围配置</span>
      </div>
      <div class="nav_option" :class="{nav_option_active:isActive == 7}" @click="goshuidianmeiConfig">
        <span>水电煤配置</span>
      </div>
    </div>
    <p class="margintop"></p>
    <el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
      <span class="config_tittle">支付</span>
      <el-button size="mini" style="float:right;" @click="show1=false">编辑支付</el-button>
      <el-divider></el-divider>
        <el-form label-position="left" label-width="150px" v-if="show1"> 
          <el-form-item label="支付方式：" size="small">
            <div class="check_div"><span style="color:#1fc9f3">{{payType.type1?"微信":payType.type2?"支付宝":"银行卡"}}</span></div>
          </el-form-item>
          <el-form-item label="手续费承担方：" size="small">
            <div class="check_div"><span style="color:#1fc9f3">{{precedureType.type1?"收款方":"支付方"}}</span></div>
          </el-form-item>
          <el-form-item label="支付密码使用方式：" size="small">
            <div class="check_div"><span style="color:#1fc9f3">{{payPassType.type1?"作废账单":payPassType.type2?"账单修改":"退款"}}</span></div>
          </el-form-item>
        </el-form>
        <el-form label-position="left" label-width="150px" v-else> 
          <el-form-item label="支付方式：" size="small">
            <div class="check_div"><el-checkbox v-model="payType.type1" @change="payType.type2=false,payType.type3=false">微信</el-checkbox></div>
            <div class="check_div"><el-checkbox v-model="payType.type2" @change="payType.type1=false,payType.type3=false">支付宝</el-checkbox></div>
            <div class="check_div"><el-checkbox v-model="payType.type3" @change="payType.type1=false,payType.type2=false">银行卡</el-checkbox></div>
          </el-form-item>
          <el-form-item label="手续费承担方：" size="small">
            <div class="check_div"><el-checkbox v-model="precedureType.type1" @change="precedureType.type2=false">收款方</el-checkbox></div>
            <div class="check_div"><el-checkbox v-model="precedureType.type2" @change="precedureType.type1=false">支付方</el-checkbox></div>
          </el-form-item>
          <el-form-item label="支付密码使用方式：" size="small">
            <div class="check_div"><el-checkbox v-model="payPassType.type1" @change="payPassType.type2=false,payPassType.type3=false">作废账单</el-checkbox></div>
            <div class="check_div"><el-checkbox v-model="payPassType.type2" @change="payPassType.type1=false,payPassType.type3=false">账单修改</el-checkbox></div>
            <div class="check_div"><el-checkbox v-model="payPassType.type3" @change="payPassType.type1=false,payPassType.type2=false">退款</el-checkbox></div>
          </el-form-item>
          <div class="pay_save">
            <el-button size="medium" style="margin-right:30px;" @click="show1=true">保存</el-button>
            <el-button size="medium" style="margin-left:30px" @click="show1=true">取消</el-button>
          </div>
        </el-form>
        
        <div class="pay_cont">
          <!-- 支付账单 -->
          <div class="pay_left">
            <span class="config_tittle">支付账单</span>
            <el-button size="mini" style="float:right;" @click="show2=false">编辑支付账单</el-button>
            <el-divider></el-divider>
            <!--  -->
            <div class="pay_config_cont">
              <div class="pay_config_cont_background pay_config_cont_left">
                <div>选择报表</div>
                <el-tree default-expand-all show-checkbox node-key="id" :default-checked-keys="[5]" :data="data" :props="defaultProps" @node-click="handleNodeClick"></el-tree>
              </div>
              <div class="pay_config_cont_background pay_config_cont_right" v-if="show2">
                <span class="config_tittle">楼盘一收费标准</span>
                <el-divider></el-divider>
                <el-form label-position="left" label-width="82px"> 
                  <el-form-item label="收费日：" size="small">
                    <div>
                      <span style="color:#1fc9f3">每月 8号</span>
                    </div>
                  </el-form-item>
                  <el-form-item label="固定费用：" size="small">
                    <div class="gudinfei">
                      <span style="color:#1fc9f3">物业费：234元/月</span>
                    </div>                  
                    <div class="gudinfei">
                      <span style="color:#1fc9f3">其他费：293元/月</span>
                    </div>
                  </el-form-item>
                  <el-form-item label="单价：" size="small" style="margin-top:40px;">
                    <div class="gudinfei">
                      <span style="color:#1fc9f3">水费 5元/吨</span>
                    </div>
                    <div class="gudinfei">
                      <span style="color:#1fc9f3">电费 3元/度</span>
                    </div>
                  </el-form-item>
                </el-form>
              </div>
              <div class="pay_config_cont_background pay_config_cont_right" v-else> 
                <span class="config_tittle">楼盘一收费标准</span>
                <el-divider></el-divider>
                <el-form label-position="left" label-width="82px"> 
                  <el-form-item label="收费日：" size="small">
                    <div>
                      <span>每月</span>
                        <el-select v-model="selected.value" placeholder="请选择">
                          <el-option
                            v-for="item in options"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                          </el-option>
                        </el-select>
                    </div>
                  </el-form-item>
                  <el-form-item label="固定费用：" size="small">
                    <div class="gudinfei">
                      <el-select v-model="selected.value" placeholder="请选择">
                        <el-option
                          v-for="item in options"
                          :key="item.value"
                          :label="item.label"
                          :value="item.value">
                        </el-option>
                      </el-select>
                      <span>-</span>
                      <input type="text" class="common_input">
                      <span>元/月</span>
                    </div>                  
                    <div class="gudinfei">
                      <el-select v-model="selected.value" placeholder="请选择">
                        <el-option
                          v-for="item in options"
                          :key="item.value"
                          :label="item.label"
                          :value="item.value">
                        </el-option>
                      </el-select>
                      <span>-</span>
                      <input type="text" class="common_input">
                      <span>元/月</span>
                    </div>
                    <div class="gudinfei">
                        <el-button type="primary" icon="el-icon-plus">添加</el-button>
                    </div>
                  </el-form-item>
                  <el-form-item label="单价：" size="small" style="margin-top:40px;">
                    <div class="gudinfei">
                      <el-select v-model="selected.value" placeholder="请选择">
                        <el-option
                          v-for="item in options"
                          :key="item.value"
                          :label="item.label"
                          :value="item.value">
                        </el-option>
                      </el-select>
                      <span>-</span>
                      <input type="text" class="common_input">
                      <span>元/吨</span>
                    </div>                  
                    <div class="gudinfei">
                      <el-select v-model="selected.value" placeholder="请选择">
                        <el-option
                          v-for="item in options"
                          :key="item.value"
                          :label="item.label"
                          :value="item.value">
                        </el-option>
                      </el-select>
                      <span>-</span>
                      <input type="text" class="common_input">
                      <span>元/吨</span>
                    </div>
                    <div class="gudinfei">
                      <el-button type="primary" icon="el-icon-plus">添加</el-button>
                    </div>
                  </el-form-item>
                </el-form>
                <div class="pay_config_cont_bottom">
                  <el-button size="small" @click="show2=true">保存</el-button>
                  <el-button size="small" @click="show2=true">取消</el-button>
                </div>
              </div>
            </div>
          </div>
          <!-- 预缴费 -->
          <div class="pay_right">
            <span class="config_tittle">预缴费</span>
            <el-button size="mini" style="float:right;" @click="show3=false">编辑预缴费</el-button>
            <el-divider></el-divider>
            <div class="pay_config_cont">
              <div class="pay_config_cont_background pay_config_cont_left">
                <div>选择报表</div>
                <el-tree default-expand-all show-checkbox node-key="id" :default-checked-keys="[5]" :data="data" :props="defaultProps" @node-click="handleNodeClick"></el-tree>
              </div>
              <div class="pay_config_cont_background pay_config_cont_right" v-if="show3">
                <span class="config_tittle">楼盘一收费标准</span>
                <el-divider></el-divider>
                <el-form label-position="left" label-width="97px"> 
                  <el-form-item label="预缴费类型：" size="small">
                    <div class="">
                      <span style="color:#1fc9f3">**费</span>
                    </div>
                  </el-form-item>
                  <el-form-item label="缴费卡：" size="small">
                    <div class="">
                      <span style="color:#1fc9f3">面额 100元 （购买价 90元）</span>
                    </div>
                  </el-form-item>
                </el-form>
              </div>
              <div class="pay_config_cont_background pay_config_cont_right" v-else>
                <span class="config_tittle">楼盘一收费标准</span>
                <el-divider></el-divider>
                <el-form label-position="left" label-width="97px"> 
                  <el-form-item label="预缴费类型：" size="small">
                    <div>
                        <el-select v-model="selected.value" placeholder="选择预缴费类型">
                          <el-option
                            v-for="item in options"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                          </el-option>
                        </el-select>
                    </div>
                  </el-form-item>
                  <el-form-item label="" size="small">
                    <div class="gudinfei">
                      <span>缴费卡面额：</span>
                      <input type="text" class="common_input">
                      <span>元</span>
                      <span style="margin-left:18px;"></span>
                      <span>购买价：</span>
                      <input type="text" class="common_input">
                      <span>元</span>
                    </div>                  
                    <div class="gudinfei">
                      <span>缴费卡面额：</span>
                      <input type="text" class="common_input">
                      <span>元</span>
                      <span style="margin-left:18px;"></span>
                      <span>购买价：</span>
                      <input type="text" class="common_input">
                      <span>元</span>
                    </div>
                    <div class="gudinfei">
                        <el-button type="primary" icon="el-icon-plus">添加缴费卡面额</el-button>
                    </div>
                  </el-form-item>
                  <el-divider></el-divider>
                  <el-button type="primary" icon="el-icon-plus">添加预缴费类型</el-button>
                </el-form>
                <div class="pay_config_cont_bottom">
                  <el-button size="small" @click="show3=true">保存</el-button>
                  <el-button size="small" @click="show3=true">取消</el-button>
                </div>
              </div>
            </div>
          </div>
        </div>
    </el-col>

  </section>
</template>
<script>
// import {getDateArray} from '../../util/util'
// import {getYqfkPerson, deptaddList, selectOffice,locationHouse,deptupdateList,deptdeleteList} from '../../api/api'
export default {
  data(){
    return{
      selected:{},
      show1:true,//显示和隐藏编辑支付方式
      show2:true,//显示和隐藏编辑支付方式
      show3:true,//显示和隐藏编辑支付方式
      isActive:1,
      payType:{//选择支付方式
        type1:true,
        type2:false,
        type3:false,
      },
      precedureType:{//选择手续费承担方
        type1:false,
        type2:true,
      },
      payPassType:{//支付密码使用方式
        type1:true,
        type2:false,
        type3:false,
      },
      defaultProps: {
        children: 'children',
        label: 'label'
      },
      options: [{
          value: '8号',
          label: '8号'
        }, {
          value: '选项2',
          label: '双皮奶'
        }, {
          value: '选项3',
          label: '蚵仔煎'
        }, {
          value: '选项4',
          label: '龙须面'
        }, {
          value: '选项5',
          label: '北京烤鸭'
        }],
      data: [{
          label: '华东区',
          id:1,
          children: [{
            label: '全部',
            id:13,
          },
          {
            label: '深圳市',
            children:[
              {
                label:'楼盘一',
                id:5
              },
              {
                label:'楼盘二',
                id:11,
              },
              {
                label:'楼盘三',
                id:12,
              },
            ],
          },
          {
            label: '东莞市',
            id:2,
          },
          {
            label: '广州市',
            id:3,
          },
          {
            label: '汕头市',
            id:4,
          },
          ]
        }, {
          label: '华南区',
          id:6,
        }, {
          label: '华中区',
          id:7,
        }, {
          label: '华北区',
          id:8,
        }, {
          label: '西北区',
          id:9,
        }, {
          label: '东北区',
          id:10,
        }
        ]
    }
  },
  methods:{
    handleNodeClick(data) {
      console.log(data);
    },
    gozhangdan_config(){
      this.$router.push({
        path:'./zhangdan_config'
      })
    },
    goshuidianmeiConfig(){
      this.$router.push({
        path:'./shuidianmeiConfig'
      })
    },
  },
  mounted(){

  }
}
</script>
<style scoped>
.check_div{
  display: inline-block;
  width:160px;
}
.pay_save{
  display: flex;
  align-items: center;
  justify-content: center;
  width:502px;
}
.pay_cont{
  margin-top: 70px;
  display: flex;
  justify-content: space-between;
  margin-bottom:10px;
}
.config_tittle{
  color:#1fc9f3;
}
.pay_left{
  flex: 1;
  margin-right:20px;
}
.pay_right{
  flex: 1;
  margin-left:20px;
}
.pay_config_cont{
  display: flex;
  justify-content: space-between;
}
.pay_config_cont_background{
  background: rgba(23, 61, 100, 0.4);
  border-radius:5px;
  height:600px;
  padding:18px;
  box-sizing: border-box;
  position: relative;
}
.pay_config_cont_left{
  width:222px;
  margin-right:10px;
}
.pay_config_cont_right{
  flex: 1;
  min-width:460px;
}
.pay_config_cont_background .el-tree{
  background: rgba(0, 0, 0, 0);
}
.common_input{
  width:60px;
  padding:0 10px;
  box-sizing: border-box;
}
.gudinfei{
  margin-bottom:15px;
}
.pay_config_cont_bottom{
  position:absolute;
  bottom:35px;
  left:0;
  width:100%;
  display: flex;
  justify-content: center;
}
.pay_config_cont_bottom button{
  margin:0 20px;
}
</style>


