<template>
  <section class="modlude">
    <div class="nav_options" style="margin-bottom:20px;">
      <div class="nav_option" :class="{nav_option_active:isActive == 1}" @click="isActive=1">
        <span>人员报表</span>
      </div>
      <div class="nav_option" :class="{nav_option_active:isActive == 2}" @click="isActive=2">
        <span>权限报表</span>
      </div>
      <div class="nav_option" :class="{nav_option_active:isActive == 3}" @click="isActive=3">
        <span>资源报表</span>
      </div>
      <div class="nav_option" :class="{nav_option_active:isActive == 4}" @click="isActive=4">
        <span>智能设施报表</span>
      </div>
      <div class="nav_option" :class="{nav_option_active:isActive == 5}" @click="isActive=5">
        <span>园区场馆报表</span>
      </div>
      <div class="nav_option" :class="{nav_option_active:isActive == 6}" @click="isActive=6">
        <span>线上服务报表</span>
      </div>
      <div class="nav_option" :class="{nav_option_active:isActive == 7}" @click="isActive=7">
        <span>信息发布报表</span>
      </div>
      <div class="nav_option" :class="{nav_option_active:isActive == 8}" @click="isActive=8">
        <span>账单管理报表</span>
      </div>
      <div class="nav_option" :class="{nav_option_active:isActive == 9}" @click="isActive=9">
        <span>社区服务报表</span>
      </div>
      <div class="nav_option" :class="{nav_option_active:isActive == 10}" @click="isActive=10">
        <span>日常办公报表</span>
      </div>
    </div>
    <p class="margintop"></p>
    <el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
      <div class="zhbb_box" v-if="isActive != 9">
        <!--  -->
        <div class="zhbb_item">
          <div class="zhbb_item_top">总人员报表</div>
          <div class="zhbb_item_bot">
            <el-button size="small">查看</el-button>
            <el-button size="small">下载</el-button>
          </div>
        </div>
        <!--  -->
        <div class="zhbb_item">
          <div class="zhbb_item_top">APP用户报表</div>
          <div class="zhbb_item_bot">
            <el-button size="small">查看</el-button>
            <el-button size="small">下载</el-button>
          </div>
        </div>
        <!--  -->
        <div class="zhbb_item">
          <div class="zhbb_item_top">工作人员报表</div>
          <div class="zhbb_item_bot">
            <el-button size="small">查看</el-button>
            <el-button size="small">下载</el-button>
          </div>
        </div>
        <!--  -->
        <div class="zhbb_item">
          <div class="zhbb_item_top">游客报表</div>
          <div class="zhbb_item_bot">
            <el-button size="small">查看</el-button>
            <el-button size="small">下载</el-button>
          </div>
        </div>
        <!--  -->
        <div class="zhbb_item">
          <div class="zhbb_item_top">危险人员报表</div>
          <div class="zhbb_item_bot">
            <el-button size="small">查看</el-button>
            <el-button size="small">下载</el-button>
          </div>
        </div>
      </div>
      <div class="zhbb_box" v-if="isActive == 9">
        <!--  -->
        <div class="zhbb_item">
          <div class="zhbb_item_top">食品安全报表</div>
          <div class="zhbb_item_bot">
            <el-button size="small">查看</el-button>
            <el-button size="small">下载</el-button>
          </div>
        </div>
        <!--  -->
        <div class="zhbb_item">
          <div class="zhbb_item_top">打传报表</div>
          <div class="zhbb_item_bot">
            <el-button size="small">查看</el-button>
            <el-button size="small">下载</el-button>
          </div>
        </div>
        <!--  -->
        <div class="zhbb_item">
          <div class="zhbb_item_top">矛盾纠纷报表</div>
          <div class="zhbb_item_bot">
            <el-button size="small">查看</el-button>
            <el-button size="small">下载</el-button>
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
      isActive:1,
    }
  },
  methods:{

  },
  mounted(){

  }
}
</script>
<style scoped>
h4{
  margin-top:10px;
}
.gridContt{
  line-height:30px;
}
.zhbb_item{
  display: inline-block;
  margin-right:20px;
  border-radius:5px;
  font-size:12px;
  height:165px;
  width:158px;
  position:relative;
  text-align: center;
  background-image: linear-gradient(to bottom, #124876, #123052);
}
.zhbb_item:nth-child(2n){
    background-image: linear-gradient(to bottom, #11597c, #0a2e4b);
}
.zhbb_item_bot{
  position:absolute;
  bottom:20px;
  left:0;
  width:100%;
}
.zhbb_item_top{
  font-size:16px;
  margin-top:28px;
}

</style>


