<template>
  <section class="form_view">
    <div class="form_view_box">
      <div class="form_view_box_item">
        <!-- 面包屑导航 -->
        <div class="nav_route">
          <div class="nav_route_div"></div>
          <div class="nav_route_box">
            
            <div v-for="item in $route.matched" :key="item.path" v-if="item.name">       
              <span><span v-if="item.name!='home'" style="margin:0 4px;">-</span>{{ item.name }}</span>
            </div>
          </div>
        </div>
        <div class="nav_black"></div>
        <transition name="fade" mode="out-in">
          <router-view></router-view>
        </transition>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  data(){
    return{

    }
  },
  mounted(){
    console.log(this.$route.matched)
  }
}
</script>

<style>
.form_view {
    height: 100%;
    background: #04121f;
    box-sizing: border-box;
    padding-left: 170px;
    padding-top: 10px;
}
.nav_black{
  background: #04121f;
  height:10px;
}
.form_view_box{
  height: 100%;
  background: url('../assets/img/bgm.png')no-repeat;
}
.form_view_box_item{
  height: 100%;
  background: rgba(11, 31, 52, 0.8);
      overflow: hidden;
    overflow-y: scroll;
}
.form_view_box_item::-webkit-scrollbar {
    display: none;
}
.nav_route{
  height:60px;
  border-radius:5px;
  padding:0 40px;
  background: #0c2038;
  color: #539df9;
  font-size:14px;
  overflow: hidden;
  position: relative;
}
.nav_route_div{
  position: absolute;
  height:100%;
  width:40px;
  left:0px;
  top:0px;
  background: #0c2038;
  z-index: 11;
}
.nav_route_box{
  position: absolute;
  height:100%;
  display: flex;
  align-items: center;
  left:28px;
  top:0px;
  z-index: 10;
}
.nav_route span{
  display: inline-block;
}
</style>