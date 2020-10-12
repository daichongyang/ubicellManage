<template>
  <section>
    <!-- 导航栏 -->
    <div class="nav_options">
      <div class="nav_option " @click="getList(0)">
        <span>巡查详情</span>
      </div>
      <div class="nav_option " @click="getList(1)">
        <span>照片及电子签名凭证</span>
      </div>
      <div class="nav_option nav_option_active" @click="getList(2)">
        <span>异常处理进度</span>
      </div>
    </div>
    <div style="padding:10px 20px;">
      <div style="margin:15px 0 5px 0;">实际巡查路线</div>
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
                <el-col :span="8" style="text-align:center;">教育路九耀坊巷005号-101</el-col>
                <el-col :span="8" style="text-align:center;">巡查时间：2019.12.02  19:10:13</el-col>
                <el-col :span="8" style="text-align:center;">
                  巡查状态：异常
                  <!-- <el-row>
                    <el-col :span="12" style="text-align:center;">
                      
                    </el-col>
                  </el-row> -->
                </el-col>
              </el-row>
              <!-- 添加图片 -->
              <div class="eleContractContent">
                <el-steps :active="active" align-center style="margin-top:20px;">
                  <el-step></el-step>
                  <el-step></el-step>
                  <el-step></el-step>
                </el-steps>
                <div class="showSteps">
                  <div class="step_item">
                    <div style="margin:10px;"><b>提交报事</b> </div>
                    <div>2019.12.03 10:21:13</div>
                  </div>
                  <div class="step_item">
                    <div style="margin:10px;"><b>房产局已受理</b></div>
                    <div>2019.12.03 10:30:13</div>
                  </div>
                  <div class="step_item">
                    <el-button type="primary" icon="el-icon-plus" size='medium'>新增处理结果</el-button>
                  </div>
                </div>
              </div>
            </div>
          </el-col>
        </el-row>
      </div>
      <!-- <div class="eleContract">
        <el-row>
          <el-col>
            <div class="chayueleft">
              <el-row class="yuyuetop">
                <el-col :span="8">教育路九耀坊巷005号-102</el-col>
                <el-col :span="8">巡查时间：2019.12.02  19:10:13</el-col>
                <el-col :span="8">
                  <el-row>
                    <el-col :span="12" style="text-align:center;">
                      巡查状态：异常
                    </el-col>

                  </el-row>
                </el-col>
              </el-row>
            </div>
          </el-col>
        </el-row>
      </div> -->
  </section>
</template>

<script>
export default {
  data(){
    return{
      active:1
    }
  },
  methods:{
    getList(item){
      if(item == 0){
        this.$router.push({
          path:'./fangwuxunchaDetaul'
        })
      }else if(item == 1){
        this.$router.push({
          path:'./fwxcPhone'
        })
      }
    }
  },
  mounted(){

  }
}
</script>

<style scoped>
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
  .showSteps{
    display:flex;
    margin-top:10px;
  }
  .step_item{
    width:33.33%;
    text-align: center;
  }
  .step_img{
    width:60%;
    margin-top:10px;
  }
  
</style>