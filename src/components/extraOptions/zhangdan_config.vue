<template>
  <section class="modlude">
    <div class="nav_options" style="margin-bottom:20px;">
      <div class="nav_option" :class="{nav_option_active:isActive == 1}" @click="gocommon_config">
        <span>支付配置</span>
      </div>
      <div class="nav_option" :class="{nav_option_active:isActive == 2}" @click="isActive=2">
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
      <!-- <div class="nav_option" :class="{nav_option_active:isActive == 7}" @click="goshuidianmeiConfig">
        <span>水电煤配置</span>
      </div> -->
    </div>
    <div class="equi">
      <div class="content">
        <div class="contItem">
          <div class="contText">
            <span class="circlee"></span>
            <span class="itemText">账单项目配置</span>
          </div>
        </div>
        <div class="dialogBox" v-for="itt in inforlist" :key="itt.billsType">
          <div class="boxLeft">
            {{itt.billsType}}
          </div>
          <div class="boxRight">
            <el-form :inline="true" style="padding-top:20px;">
              <el-checkbox-group v-model="isUsableList">
                <el-form-item style="margin-left:20px;">
                  <el-checkbox v-for="item in itt.configVos" :label="item.pkId" :key="item.pkId">{{item.item}}</el-checkbox>
                </el-form-item>
              </el-checkbox-group>
            </el-form>
          </div>
          <div style="clear:both"></div>
        </div>
      </div>
      <div style="text-align:center;margin-top:20px;">
        <el-button @click="update">保存</el-button>
      </div>
        <div class="contItem">
          <div class="contText">
            <span class="circlee"></span>
            <span class="itemText">记账本-记账本项目配置</span>
            <!-- <el-button size="mini" @click="showadd">添加记账本子项目</el-button> -->
          </div>
        </div>
        <div class="dialogBox" v-for="itt in tallyConfigList" :key="itt.groupId">
          <div class="boxLeft">
            {{itt.billsType}}
          </div>
          <div class="boxRight">
            <el-form :inline="true" style="padding-top:20px;">
              <el-checkbox-group v-model="tallyConfig">
                <el-form-item style="margin-left:20px;">
                  <el-checkbox v-for="item in itt.configVos" :label="item.pkId" :key="item.pkId">{{item.item}}</el-checkbox>
                </el-form-item>
              </el-checkbox-group>
            </el-form>
          </div>
          <div style="clear:both"></div>
        </div>
        <div style="text-align:center;margin:20px 0;">
          <el-button @click="update2">保存</el-button>
        </div>
    </div>
   <!-- 添加记账 -->
    <el-dialog title="添加记账" :visible.sync="addFormVisible" :close-on-click-modal="false">
      <el-form class="renterinfoClass" label-width="128px">
        <el-form-item label="所属主项目">
          <el-select v-model="addForm.groupId" placeholder="请选择" style="width:220px;">
            <el-option v-for="item in tallyConfigList" :key="item.groupId" :label="item.superName" :value="item.groupId"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="子项目名称">
          <el-input v-model="addForm.name" placeholder="请选择" style="width:220px;"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click.native="addFormVisible = false">取消</el-button>
        <el-button   type="primary" @click.native="add">提交</el-button>
      </div>
    </el-dialog>
  </section>
</template>
<script>
// import {billsConfig,billsConfigUpdate,tallyConfig,tallyConfigUpdate,tallyConfigSave} from '../../api/api'
export default {
  data(){
    return{
      isActive:2,
      addFormVisible:false,
      inforlist:[],
      isUsableList:[],
      tallyConfigList:[],
      tallyConfig:[],
      addForm:{},
      data1:{"msg":"success","code":200,"data":[{"billsType":1,"configVos":[{"pkId":1,"id":11,"item":"租金补差","billGroup":1,"isUsable":1},{"pkId":2,"id":12,"item":"租金涨价","billGroup":1,"isUsable":1},{"pkId":3,"id":13,"item":"房租手动添加","billGroup":1,"isUsable":1},{"pkId":4,"id":14,"item":"临时租金","billGroup":1,"isUsable":1}]},{"billsType":2,"configVos":[{"pkId":5,"id":16,"item":"门卡押金","billGroup":2,"isUsable":1},{"pkId":6,"id":17,"item":"钥匙押金","billGroup":2,"isUsable":1},{"pkId":7,"id":18,"item":"家具押金","billGroup":2,"isUsable":1},{"pkId":8,"id":19,"item":"家电押金","billGroup":2,"isUsable":1},{"pkId":9,"id":20,"item":"水电押金","billGroup":2,"isUsable":1},{"pkId":10,"id":21,"item":"电卡押金","billGroup":2,"isUsable":1},{"pkId":11,"id":22,"item":"水卡押金","billGroup":2,"isUsable":1},{"pkId":12,"id":23,"item":"燃气卡押金","billGroup":2,"isUsable":1},{"pkId":13,"id":24,"item":"其它押金","billGroup":2,"isUsable":1}]},{"billsType":3,"configVos":[{"pkId":14,"id":25,"item":"水费","billGroup":3,"isUsable":1},{"pkId":15,"id":26,"item":"电费","billGroup":3,"isUsable":1},{"pkId":16,"id":27,"item":"煤气费","billGroup":3,"isUsable":1},{"pkId":17,"id":28,"item":"网络费","billGroup":3,"isUsable":1},{"pkId":18,"id":29,"item":"供暖费","billGroup":3,"isUsable":1},{"pkId":19,"id":30,"item":"空调费","billGroup":3,"isUsable":1},{"pkId":20,"id":31,"item":"燃气费","billGroup":3,"isUsable":1},{"pkId":21,"id":32,"item":"热水费","billGroup":3,"isUsable":1},{"pkId":22,"id":33,"item":"冷水费","billGroup":3,"isUsable":1},{"pkId":23,"id":34,"item":"电卡充值","billGroup":3,"isUsable":1}]},{"billsType":4,"configVos":[{"pkId":24,"id":35,"item":"管理费","billGroup":4,"isUsable":1},{"pkId":25,"id":36,"item":"物业费","billGroup":4,"isUsable":1},{"pkId":26,"id":37,"item":"垃圾费","billGroup":4,"isUsable":1},{"pkId":27,"id":38,"item":"有线电视费","billGroup":4,"isUsable":1},{"pkId":28,"id":39,"item":"保洁费","billGroup":4,"isUsable":1},{"pkId":29,"id":40,"item":"卫生费","billGroup":4,"isUsable":1},{"pkId":30,"id":41,"item":"服务费","billGroup":4,"isUsable":1},{"pkId":31,"id":42,"item":"照明费","billGroup":4,"isUsable":1},{"pkId":32,"id":43,"item":"电梯费","billGroup":4,"isUsable":1},{"pkId":33,"id":44,"item":"排污费","billGroup":4,"isUsable":1}]},{"billsType":5,"configVos":[{"pkId":34,"id":45,"item":"家电维修","billGroup":5,"isUsable":1},{"pkId":35,"id":46,"item":"房屋维修","billGroup":5,"isUsable":1},{"pkId":36,"id":47,"item":"公共区域维修","billGroup":5,"isUsable":1}]},{"billsType":6,"configVos":[{"pkId":37,"id":48,"item":"门卡工本费","billGroup":6,"isUsable":1},{"pkId":38,"id":49,"item":"电卡工本费","billGroup":6,"isUsable":1},{"pkId":39,"id":50,"item":"床上用品费","billGroup":6,"isUsable":1},{"pkId":40,"id":51,"item":"税收","billGroup":6,"isUsable":1},{"pkId":41,"id":53,"item":"车位费","billGroup":6,"isUsable":1},{"pkId":42,"id":54,"item":"公摊费","billGroup":6,"isUsable":1},{"pkId":43,"id":55,"item":"电瓶车充电费","billGroup":6,"isUsable":1},{"pkId":44,"id":56,"item":"其它杂费","billGroup":6,"isUsable":1}]},{"billsType":7,"configVos":[{"pkId":45,"id":58,"item":"预收水费","billGroup":7,"isUsable":1},{"pkId":46,"id":59,"item":"预收煤气费","billGroup":7,"isUsable":1},{"pkId":47,"id":60,"item":"预收燃气费","billGroup":7,"isUsable":1},{"pkId":48,"id":61,"item":"预收网费","billGroup":7,"isUsable":1},{"pkId":49,"id":62,"item":"预收供暖费","billGroup":7,"isUsable":1},{"pkId":50,"id":63,"item":"预收其它费用","billGroup":7,"isUsable":1},{"pkId":51,"id":64,"item":"预收电费","billGroup":7,"isUsable":1}]},{"billsType":8,"configVos":[{"pkId":52,"id":65,"item":"pos刷卡手续费","billGroup":8,"isUsable":1},{"pkId":53,"id":66,"item":"利息","billGroup":8,"isUsable":1},{"pkId":55,"id":68,"item":"换房费","billGroup":8,"isUsable":1},{"pkId":56,"id":69,"item":"分期手续费","billGroup":8,"isUsable":1}]},{"billsType":9,"configVos":[{"pkId":57,"id":70,"item":"赔偿金","billGroup":9,"isUsable":1},{"pkId":58,"id":71,"item":"违约金","billGroup":9,"isUsable":1}]},{"billsType":10,"configVos":[{"pkId":59,"id":72,"item":"家具租赁费","billGroup":10,"isUsable":1},{"pkId":60,"id":73,"item":"电器租赁费","billGroup":10,"isUsable":1}]},{"billsType":13,"configVos":[{"pkId":61,"id":74,"item":"杂项","billGroup":13,"isUsable":1},{"pkId":62,"id":75,"item":"水费押金","billGroup":13,"isUsable":1}]}]},
      data2:{"msg":"success","code":200,"data":[{"billsType":16,"configVos":[{"pkId":73,"id":88,"item":"维修费","billGroup":16,"isUsable":1},{"pkId":74,"id":89,"item":"保养费","billGroup":16,"isUsable":1}]},{"billsType":17,"configVos":[{"pkId":75,"id":90,"item":"装修费","billGroup":17,"isUsable":1}]},{"billsType":18,"configVos":[{"pkId":76,"id":92,"item":"供冷费","billGroup":18,"isUsable":1},{"pkId":325,"id":91,"item":"供暖费","billGroup":18,"isUsable":1}]},{"billsType":20,"configVos":[{"pkId":77,"id":93,"item":"分期放款","billGroup":20,"isUsable":1},{"pkId":78,"id":94,"item":"分期手续费","billGroup":20,"isUsable":1},{"pkId":79,"id":95,"item":"分期滞纳金","billGroup":20,"isUsable":1},{"pkId":80,"id":96,"item":"分期保证金","billGroup":20,"isUsable":1},{"pkId":81,"id":97,"item":"分期买回","billGroup":20,"isUsable":1}]},{"billsType":14,"configVos":[{"pkId":63,"id":78,"item":"管理费","billGroup":14,"isUsable":1},{"pkId":64,"id":79,"item":"电梯费","billGroup":14,"isUsable":1},{"pkId":65,"id":80,"item":"财务费","billGroup":14,"isUsable":1},{"pkId":66,"id":81,"item":"电费","billGroup":14,"isUsable":1},{"pkId":67,"id":82,"item":"水费","billGroup":14,"isUsable":1},{"pkId":68,"id":83,"item":"煤气费","billGroup":14,"isUsable":1},{"pkId":69,"id":84,"item":"网络费","billGroup":14,"isUsable":1}]},{"billsType":15,"configVos":[{"pkId":70,"id":85,"item":"广告费","billGroup":15,"isUsable":1},{"pkId":71,"id":86,"item":"公关费","billGroup":15,"isUsable":1},{"pkId":72,"id":87,"item":"物料费","billGroup":15,"isUsable":1}]}]},
    }
  },
  methods:{
    gocommon_config(){
      this.$router.push({
        path:'./common_config'
      })
    },
    goshuidianmeiConfig(){
      this.$router.push({
        path:'./shuidianmeiConfig'
      })
    },
    showadd(){
      this.addFormVisible=true
    },
    add(){
      this.addFormVisible=false
      let params=this.addForm
      tallyConfigSave(params).then(res=>{
        console.log(res)
        if(res.data.code===200){
          this.getList()
        }
      })
    },
    update2(){
      let params={
        arr:this.tallyConfig,
        type:2
      }
      console.log(params)
      billsConfigUpdate(params).then(res=>{
        console.log(res)
        if(res.data.code===200){
          alert('保存成功')
        }
      })
    },
    update(){
      let params={
        arr:this.isUsableList,
        type:1
      }
      console.log(params)
      billsConfigUpdate(params).then(res=>{
        console.log(res)
        if(res.data.code===200){
          alert('保存成功')
        }
      })
    },
    getList(){
        let res = this.data1
        let _this=this
        console.log(res)
        if(res.code===200){
          
          this.inforlist=res.data.filter(function(item){
            if(item.billsType===1){
              item.billsType='租金'
            }else if(item.billsType===2){
              item.billsType='其它押金'
            }else if(item.billsType===3){
              item.billsType='水电煤暖网'
            }else if(item.billsType===4){
              item.billsType='服务收费'
            }else if(item.billsType===5){
              item.billsType='维修费用'
            }else if(item.billsType===6){
              item.billsType='杂费'
            }else if(item.billsType===7){
              item.billsType='预收费'
            }else if(item.billsType===8){
              item.billsType='手续费'
            }else if(item.billsType===9){
              item.billsType='违约赔偿'
            }else if(item.billsType===10){
              item.billsType='租赁费用'
            }else if(item.billsType===11){
              item.billsType='退房费用'
            }else if(item.billsType===12){
              item.billsType='定金'
            }else if(item.billsType===13){
              item.billsType='其他类'
            }
            for(let i = 0 ; i < item.configVos.length ; i++){
              if(item.configVos[i].isUsable===1){
                _this.isUsableList.push(item.configVos[i].pkId)
              }
            }
            return item
          })
        }

        let ress = this.data2
        console.log(ress)
        if(ress.code===200){
          this.tallyConfigList=ress.data.filter(function(item){
            if(item.billsType===14){
              item.billsType='运营收支'
            }else if(item.billsType===15){
              item.billsType='广告公关'
            }else if(item.billsType===16){
              item.billsType='维修保养'
            }else if(item.billsType===17){
              item.billsType='物业装修'
            }else if(item.billsType===18){
              item.billsType='供暖/供冷'
            }else if(item.billsType===19){
              item.billsType='杂费'
            }else if(item.billsType===20){
              item.billsType='金融相关'
            }else if(item.billsType===21){
              item.billsType='其他类'
            }
            for(let i = 0 ; i < item.configVos.length ; i++){
              if(item.configVos[i].isUsable===1){
                _this.tallyConfig.push(item.configVos[i].pkId)
              }
            }
            return item
          })
        }
    }
  },
  mounted(){
    this.getList()
  }
}
</script>
<style scoped>
@import '../../assets/mySelf.css';
.equi{
  padding:20px;
}
</style>


