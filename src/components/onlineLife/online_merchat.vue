<template>
  <section>
    <div class="nav_options">
      <div class="nav_option" :class="{nav_option_active:isActive == 1}" @click="isActive=1">
        <span>商家信息管理</span>
      </div>
      <div class="nav_option" :class="{nav_option_active:isActive == 2}" @click="isActive=2">
        <span>推荐商家管理</span>
      </div>
      <div class="nav_option" :class="{nav_option_active:isActive == 3}" @click="isActive=3">
        <span>商家广告管理</span>
      </div>
    </div>
    <div class="modoule_online">
      <onlineshopadvert v-if="isActive==1"></onlineshopadvert>
      <onlineshopintrdouce v-else-if="isActive==2"></onlineshopintrdouce>
      <onlineshopinfo v-else="isActive==3"></onlineshopinfo>
    </div>

  </section>  
</template>

<script>
import onlineshopadvert from './online_shop_advert';
import onlineshopinfo from './online_shop_info';
import onlineshopintrdouce from './online_shop_intrdouce';
export default {
  data(){
    return{
      isActive:1
    }
  },
  methods:{

  },
  mounted(){

  },
  components:{
    onlineshopadvert,
    onlineshopinfo,
    onlineshopintrdouce,
  }
}
</script>
<style scoped>
 .modoule_online{
   padding:0 40px;
 }
</style>