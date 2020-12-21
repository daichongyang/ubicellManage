<template>
  <div class="login">
  <el-form :model="ruleForm2" :rules="rules2" ref="ruleForm2" label-position="left" label-width="0px" class="demo-ruleForm login-container">
    <h3 class="title">系统登录</h3>
    <el-form-item prop="account">
      <el-input type="text" v-model="ruleForm2.account" auto-complete="off" placeholder="账号"></el-input>
    </el-form-item>
    <el-form-item style="margin-top:20px;" prop="checkPass">
      <el-input type="password" v-model="ruleForm2.password" auto-complete="off" placeholder="密码" @keyup.enter.native="handleSubmit2"></el-input>
    </el-form-item>
    <!-- <el-form-item style="margin-top:20px;" prop="checkPass">
      <el-select v-model="ruleForm2.grantType" placeholder="授权类型">
        <el-option
          v-for="item in grantType"
          :key="item.value"
          :label="item.label"
          :value="item.value">
        </el-option>
      </el-select>
    </el-form-item> -->
    <el-checkbox v-model="checked" @change="changeChe" class="remember">记住密码</el-checkbox>
    <el-form-item style="width:100%;">
      <el-button type="primary" style="width:100%;" @click.native.prevent="handleSubmit2" :loading="logining">登录</el-button>
      <!-- <el-button style="width:100%;margin-top:20px;margin-left:0;" @click.native.prevent="handleReset2">入住宝宝在线公寓合作伙伴</el-button> -->
    </el-form-item>

  </el-form>

  </div>
</template>

<script>
  import { login } from '../url/api';
  import Store from "../assets/js/store"
  import {mapMutations,mapActions } from 'vuex'
  export default {
    data() {
      return {
        logining: false,
        ruleForm2: {
          account: localStorage.getItem("phone") ||'',
          password: localStorage.getItem("password") ||'',
          grantType:'password'
        },
        rules2: {
          phone: [
            { required: true, message: '请输入账号', trigger: 'blur' },
            //{ validator: validaePass }
          ],
          password: [
            { required: true, message: '请输入密码', trigger: 'blur' },
            //{ validator: validaePass2 }
          ]
        },
        grantType:[//授权类型
          {
            value: 'captcha',
            label: 'captcha'
          },
          {
            value: 'refresh_token',
            label: 'refresh_token'
          },
          {
            value: 'password',
            label: 'password'
          },
        ],
        checked:eval(localStorage.getItem("checked"))||false
      };
    },
    methods: {
      // 记住密码
      changeChe(e){
        console.log(e)
        localStorage.setItem('checked',e)
      },
      handleReset2() {
        this.$router.push({
          path:'/login1'
        })
      },
      handleSubmit2(ev) {
        this.logining = true;
        let params = this.ruleForm2
        let che = eval(localStorage.getItem("checked"))
        if(che){
          localStorage.setItem('phone',this.ruleForm2.account)
          localStorage.setItem('password',this.ruleForm2.password)
        }else{
          localStorage.clear('phone')
          localStorage.clear('password')
        }
        console.log()
        login(params).then(res=>{
          // this.logining = false;
          console.log(res)
          if(res.status===200){
            let token = res.data.data.token || 1
            let menus = res.data.data.menus
            let userId = res.data.data.userId
            let tenantCode = res.data.data.tenantCode
            let backgroundImg = res.data.data.img
            localStorage.setItem('phone',this.ruleForm2.account)
            sessionStorage.setItem('userId',userId)
            sessionStorage.setItem('name',res.data.data.name)
            sessionStorage.setItem('Authorization',token)
            sessionStorage.setItem('tenantCode',tenantCode)
            sessionStorage.setItem('backgroundImg',backgroundImg)
            sessionStorage.setItem('menus',JSON.stringify(menus))
            if(this.$route.query.redirect){
              this.$router.push({
                path: this.$route.query.redirect,
              });
            }else{
              // this.$router.push({
              //   path: '/acs_auth_inout_log',
              // });
              this.$router.push({
                path: '/index',
              });
            }
            //  location.reload()//用于控制路由中menuList的显示
          }else{
            this.$message({
              message: res.data.msg,
              type: 'error'
            });
          }
        }).catch((error) => {
          console.log(error)
          // alert('登录失败')
           this.logining = false;
        })
      },
      ...mapMutations({
        getNewData:"increment"
      }),
      ...mapActions({
        getActions:"increment"
      })
    },
    mounted(){
      this.getActions()
      // this.getNewData()
      // Store.commit('increment')
      console.log(Store.state)
    }
  }

</script>

<style lang="scss" scoped>
  .login{
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .login-container {
    /*box-shadow: 0 0px 8px 0 rgba(0, 0, 0, 0.06), 0 1px 0px 0 rgba(0, 0, 0, 0.02);*/
    -webkit-border-radius: 5px;
    border-radius: 5px;
    -moz-border-radius: 5px;
    background-clip: padding-box;
    width: 350px;
    padding: 35px 35px 15px 35px;
    background: #fff;
    border: 1px solid #eaeaea;
    // box-shadow: 0 0 25px #cac6c6;
    .title {
      margin: 0px auto 40px auto;
      text-align: center;
      color: #505458;
    }
    .remember {
      margin: 0px 0px 35px 0px;
    }
  }
</style>