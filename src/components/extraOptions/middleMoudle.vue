<template>
  <section>
    <div class="nav_options">
      <div class="nav_option" :class="{nav_option_active:isActive == 1}" @click="isActive=1">
        <span>支付配置</span>
      </div>
      <div class="nav_option" :class="{nav_option_active:isActive == 2}" @click="isActive=2">
        <span>账单配置</span>
      </div>
      <div class="nav_option" :class="{nav_option_active:isActive == 3}" @click="isActive=3">
        <span>考勤配置</span>
      </div>
      <div class="nav_option" :class="{nav_option_active:isActive == 4}" @click="isActive=4">
        <span>报修类型配置</span>
      </div>
      <div class="nav_option" :class="{nav_option_active:isActive == 5}" @click="isActive=5">
        <span>在线申请配置</span> 
      </div>
      <div class="nav_option" :class="{nav_option_active:isActive == 6}" @click="isActive=6">
        <span>内容可见范围配置</span> 
      </div>
    </div>

    <div class="pay_contant">
      <div class="pay_contant_one">
        <div class="pay_contant_option">
          支付
        </div>
      </div>
    </div>

  </section>  
</template>

<script>
export default {
  data(){
    return{
      isActive:1
    }
  },
  methods:{

  },
  mounted(){

  }
}
</script>

<style scoped>
  .pay_contant{
    padding:0 40px;
  }
</style>