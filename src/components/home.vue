<template>

  <el-container class="">
    <section class="outer">
      <el-header style="height: 100px;">
        <div class="header_infor" ref="headerback" :style="{backgroundImage:'url('+background1+')'}">
          <!-- <div class="header_left">
            <div class="header_left_infor disflex">
              <img src="@/assets/img/header_map_icon.png" alt="">
              <span class="active_color" @click="showGroup = !showGroup">集团</span>
              <div class="group_ul" v-if="showGroup">
                <div class="group_ul_li">
                  <div class="group_ul_li_item">华东区华东区华东区</div>
                  <div class="group_ul_li_item">华东区</div>
                  <div class="group_ul_li_item">华东区</div>
                  <div class="group_ul_li_item">华东区</div>
                  <div class="group_ul_li_item">华东区</div>
                  <div class="group_ul_li_item">华东区</div>
                  <div class="group_ul_li_item">华东区</div>
                  <div class="group_ul_li_item">华东区</div>
                  <div class="group_ul_li_item">华东区</div>
                  <div class="group_ul_li_item">华东区</div>
                  <div class="group_ul_li_item">华东区</div>  
                  <div class="group_ul_li_item">华东区</div>
                </div>
              </div>
            </div>
          </div> -->
          <div class="header_right">
            <div class="header_right_item3 disflex" @click="showNavlist = !showNavlist">
              <el-avatar icon="el-icon-user-solid"></el-avatar>
              <span>{{userName}}</span>
              <div class="group_ul" v-if="showNavlist">
                <div class="group_ul_li">
                  <div class="group_ul_li_item" @click="$router.push('/personalCenter')">个人中心</div>
                  <div class="group_ul_li_item" @click="$router.push('/dbsx')">待办事项</div>
                  <div class="group_ul_li_item" @click="$router.push('/common_config')">通用配置</div>
                  <div class="group_ul_li_item" @click="$router.push('/zhbb')">综合报表</div>
                  <div class="group_ul_li_item" @click="$router.push('/dcjl')">导出记录</div>
                  <div class="group_ul_li_item" @click="$router.push('/xtrz')">系统日志</div>
                  <div class="group_ul_li_item">帮助</div>
                  <div class="group_ul_li_item" @click="$router.push('/login')">切换账号</div>
                  <div class="group_ul_li_item" @click="$router.push('/login')">退出登录</div>
                </div>
              </div>
            </div>
            <div class="header_right_item2 disflex" @click="$router.push('/messageCenter')">
              <img src="@/assets/img/index/fanzaijiayuanht_xx_1.png" alt="">
              <span>消息</span>
            </div>
            <!-- <div class="header_right_item1">
              <input type="text" placeholder="搜索">
              <img src="@/assets/img/index/fanzaijiayuanht_ss_1.png" alt="">
            </div> -->
          </div>
        </div>
        <!-- 回到首页 -->
        <div class="go_index" @click="$router.push('./index')"></div>
      </el-header>

        <el-container class="container">
          <el-aside width="160px" style="background-color: rgb(238, 241, 246)">
            <!-- 用于遮蔽滚动条 -->
            <el-menu default-active="100" class="el-menu-vertical-demo" :collapse="true">
              <!-- 一级 -->
              <el-submenu :index="index1.toString()" v-for="(item,index1) in menus" :key="index1">
                <template slot="title">
                  <div class="left_nav">
                    <div class="left_nav_img"><img class="" :src="images[index1]" alt=""></div>
                    <span class="nav_li_name">{{item.name}}</span>
                    <span class="nav_li_jt"></span>
                  </div>
                </template>
                <!-- 二级 -->
                <section v-for="(itemChildren,index2) in item.children" :key="index2">
                  <el-submenu :index="index1.toString()+'-'+index2.toString()" v-if="itemChildren.children">
                  <template slot="title">
                    <div class="left_nav">
                      <div class="nav_li_name_div">{{itemChildren.name}}</div>
                    </div>
                  </template>
                  <!-- 三级 -->
                  <section v-for="(itemChildrenChildren,index3) in itemChildren.children" :key="index3">
                    <el-submenu :index="index1.toString()+'-'+index2.toString()+'-'+index3.toString()" v-if="itemChildrenChildren.children">
                      <template slot="title">
                        <div class="left_nav">
                          <div class="nav_li_name_div">{{itemChildrenChildren.name}}</div>
                        </div>
                      </template>
                      <el-menu-item-group>
                        <el-menu-item @click="showForm = true,$router.push('/'+children4.description)" :index="index1.toString()+'-'+index2.toString()+'-'+index3.toString()+'-'+index4.toString()" v-for="(children4,index4) in itemChildrenChildren.children" :key="index4">{{children4.name}}</el-menu-item>
                      </el-menu-item-group>
                    </el-submenu>
                    <!-- 四级 -->
                    <el-menu-item-group v-else>
                      <el-menu-item :index="index1.toString()+'-'+index2.toString()+'-'+index3.toString()" @click="showForm = true,$router.push('/'+itemChildrenChildren.description)">{{itemChildrenChildren.name}}</el-menu-item>
                    </el-menu-item-group>
                  </section>

                  <!-- <el-menu-item-group>
                    <el-menu-item @click="showForm = true,$router.push('/'+children3.description)" :index="index1.toString()+'-'+index2.toString()+'-'+index3.toString()" v-for="(children3,index3) in itemChildren.children" :key="index3">{{children3.name}}</el-menu-item>
                  </el-menu-item-group> -->
                  </el-submenu>
                  <el-menu-item-group v-else>
                    <el-menu-item :index="index1.toString()+'-'+index2.toString()" @click="showForm = true,$router.push('/'+itemChildren.description)">{{itemChildren.name}}</el-menu-item>
                  </el-menu-item-group>
                </section>

              </el-submenu>
            </el-menu>
          </el-aside>
          <!-- 内容展示 -->
          <el-main class="contant">
            <!-- 地图 -->
            <router-view class="contant_view"></router-view>

          </el-main>
    
        </el-container>
    </section>
  </el-container>
</template>

  <script>
  const {log} = console
  // import indexMod from './indexMod.vue'
  export default {
    data() {
      return {
        userName:sessionStorage.getItem('name')||'小可爱',
        infor:{},
        menus:[],
        showGroup:false,//显示集团内容
        showNavlist:false,//右上角列表
        groupOptions:[],//
        showForm:false,
        phone:localStorage.getItem('phone'),
        images:[
					require('../assets/img/index/fanzaijiayuanht_tb_1.png'),
					require('../assets/img/index/fanzaijiayuanht_tb_3.png'),
					require('../assets/img/index/fanzaijiayuanht_tb_4.png'),
					require('../assets/img/index/fanzaijiayuanht_tb_5.png'),
					require('../assets/img/index/fanzaijiayuanht_tb_6.png'),
					require('../assets/img/index/fanzaijiayuanht_tb_7.png'),
					require('../assets/img/index/fanzaijiayuanht_tb_8.png'),
					require('../assets/img/index/fanzaijiayuanht_tb_9.png'),
					require('../assets/img/index/fanzaijiayuanht_tb_10.png'),
					require('../assets/img/index/fanzaijiayuanht_tb_11.png'),
					require('../assets/img/index/fanzaijiayuanht_tb_11.png'),
        ],
        backgroundb:[
          // require('../assets/img/index/fanzaijiayuanht_3.png'),//四川绵阳
          // require('../assets/img/index/fanzaijiayuanht_5.png'),//金深幼儿园
          // require('../assets/img/index/fanzaijiayuanht_1.png'),//泛在
        ],
        background1:""
      }
    },
    methods:{
      handleGroup(value) {
        console.log(value);
      }

    },
    mounted(){
      let tenantCode = sessionStorage.getItem('tenantCode')
      this.background1 = 	require('../assets/img/index/fanzaijiayuanht_'+tenantCode+'.png')
      this.menus = JSON.parse(sessionStorage.getItem('menus'))
      // if(this.phone == 18888888888){
      //   this.background1 = this.backgroundb[0]
      // }else if(userId=='0029'){
      //   this.background1 = this.backgroundb[1]
      // }else{
      //   this.background1 = this.backgroundb[2]
      // }
      // console.log(this.phone)
      console.log(this.menus)
    },
  };
</script>

<style scoped>
  @import "../assets/css/home.css";
  .nav_li_name_div{
    font-size: 14px;
    color: #3f90f3;
    width: 150px;
    cursor: pointer;
    -webkit-transition: border-color .3s, background-color .3s, color .3s;
    transition: border-color .3s, background-color .3s, color .3s;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    padding-left: 0px !important;
    text-align: center;
  }
</style>
