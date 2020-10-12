<template>
  <section>
    <div class="nav_options">
      <div class="nav_option" :class="{nav_option_active:isActive == 1}" @click="isActive=1">
        <span>个人信息</span>
      </div>
      <div class="nav_option" :class="{nav_option_active:isActive == 2}" @click="isActive=2">
        <span>账号安全</span>
      </div>
      <div class="nav_option nav_option_bj">
        <span class="nav_option_bj_item">编辑个人信息</span>
      </div>
    </div>
    <!-- 个人信息 -->
    <div class="person_infor" v-if="isActive==1">
      <div class="person_infor_item">
        <span>姓名：</span>
        <span class="person_infor_item_active">小可爱</span>
      </div>
      <div class="person_infor_item">
        <span>角色：</span>
        <span class="person_infor_item_active">普通管理员</span>
      </div>
      <div class="person_infor_item">
        <span>电话：</span>
        <span class="person_infor_item_active">18773258767</span>
      </div>
      <div class="person_infor_item">
        <span>证件号码：</span>
        <span class="person_infor_item_active">18773258767</span>
      </div>
      <div class="person_infor_item">
        <span>平台使用协议：</span>
        <el-button size="small ">查看</el-button>
        <el-button size="small ">下载</el-button>
      </div>
      <div class="person_infor_item">
        <span>使用有效期：</span>
        <span class="person_infor_item_active">2020/06/30 -- 2023/03/30</span>
        <button class="person_btn">续费</button>
      </div>
      <div class="person_infor_item" style="margin-top:60px;">
        <span>物业收款信息：</span>
        <span class="person_infor_item_active">银行：中国工商银行</span>
      </div>
      <div class="person_infor_item">
        <span></span>
        <span class="person_infor_item_active">户主：泛在社区</span>
      </div>
      <div class="person_infor_item">
        <span></span>
        <span class="person_infor_item_active">开户行：深圳布吉银行</span>
      </div>
      <div class="person_infor_item">
        <span></span>
        <img src="../../assets/img/header_search_icon.png" alt="">
        <img src="../../assets/img/header_search_icon.png" alt="">
        <el-button size="small " style="margin-left:20px;">打印</el-button>
        <el-button size="small ">保存</el-button>
      </div>
      <!-- 头像信息 -->
      <div class="photo">
        <div class="photo_img_div">
          <div class="photo_img"></div>
        </div>
        <div style="text-align:center;">
          <el-button size="small">修改头像</el-button>
        </div>
      </div>
    </div>
    <!-- 账号安全 -->
    <div class="acount_save" v-else>
      <div class="acount_save_div">
        <span>登录密码：</span>
        <span class="acount_save_span">********</span>
        <el-button size="small">修改登录密码</el-button>
      </div>
      <div class="acount_save_div">
        <span>支付密码：</span>
        <span class="acount_save_span">********</span>
        <el-button size="small">修改支付密码</el-button>
      </div>
    </div>
  </section>  
</template>

<script>
export default {
  data(){
    return{
      isActive:1,
    }
  },
  methods:{
    changeNav(){
  
    }
  },
  mouted(){

  }
}
</script>

<style scoped>
  .photo{
    position:absolute;
    top:50px;
    left:1111px;
    width:104px;
  }
  .photo_img_div{
    width:106px;
    height:106px;
    border:1px solid #1fc9f3;
    box-sizing: border-box;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-bottom: 10px;
  }
  .photo_img{
    width:100px;
    height:100px;
    background:url('../../assets/img/header_search_icon.png')no-repeat;
    background-size: cover;
  }
  .nav_option_bj{
    position:absolute;
    right:40px;
    top:0;
  }
  .nav_option_bj_item{
    border:1px solid #a1d6f4;
    color:#a1d6f4;
    padding:2px 2px;
    font-size: 14px;
  }
  .person_infor{
    margin-top: 54px;
    position: relative;
  }
  .person_infor_item{
    color: #a1d6f4;
    font-size: 14px;
    margin-bottom:30px;
    display: flex;
    align-items: center;
  }
  .person_infor_item span:nth-child(1){
    text-align: right;
    display: inline-block;
    width:460px;
    margin-right:10px;
  }
  .person_infor_item_active{
    color:#1fc9f3;
    margin-right: 10px;
  }
  .person_btn{
    background:transparent;
    border:1px solid #d57c4b;
    padding:5px 10px;
    color:#d57c4b;
    border-radius: 2px;
    cursor: pointer;
  }
  .acount_save{
    margin-top:88px;
  }
  .acount_save_div{
    display: flex;
    justify-content: center;
    align-items: center;
    color:#a1d6f4;
    margin-bottom:20px;
  }
  .acount_save_span{
    margin:0 20px;
    color:#1fc9f3;
  }
</style>