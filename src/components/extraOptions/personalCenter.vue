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
        <span class="nav_option_bj_item" @click="updateDialog=true">编辑个人信息</span>
      </div>
    </div>
    <!-- 个人信息 -->
    <div class="person_infor" v-if="isActive==1">
      <div class="person_infor_item">
        <span>姓名：</span>
        <span class="person_infor_item_active">{{formUpdate.name}}</span>
      </div>
      <div class="person_infor_item">
        <span>角色：</span>
        <span class="person_infor_item_active">普通管理员</span>
      </div>
      <div class="person_infor_item">
        <span>电话：</span>
        <span class="person_infor_item_active">{{formUpdate.mobile}}</span>
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
          <div class="photo_img" :style="'background:url('+formUpdate.avatar+')no-repeat'"></div>
        </div>
        <div style="text-align:center;">
          <el-button size="small" @click="updateDialog=true">修改头像</el-button>
        </div>
      </div>
    </div>
    <!-- 账号安全 -->
    <div class="acount_save" v-else>
      <div class="acount_save_div">
        <span>登录密码：</span>
        <span class="acount_save_span">********</span>
        <el-button size="small" @click="passwordDialog=true">修改登录密码</el-button>
      </div>
      <div class="acount_save_div">
        <span>支付密码：</span>
        <span class="acount_save_span">********</span>
        <el-button size="small">修改支付密码</el-button>
      </div>
    </div>
    <!-- 修改登录密码 -->
    <el-dialog title="修改登录密码" :visible.sync="passwordDialog" :close-on-click-modal="false">
      <div class="cont_box_right">
        <el-form label-position="right" label-width="80px">
          <el-form-item label="旧密码" size="small">
            <el-input v-model="passwordData.oldPassword"></el-input>
          </el-form-item>
          <el-form-item label="新密码" size="small">
            <el-input v-model="passwordData.firstNewPassword"></el-input>
          </el-form-item>
          <el-form-item label="确认密码" size="small">
            <el-input v-model="passwordData.secondNewPassword"></el-input>
          </el-form-item>
        </el-form>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button size="medium " @click="passwordDialog = false">取 消</el-button>
        <el-button size="medium " @click="updatePassword">修 改</el-button>
      </div>
    </el-dialog>
    <el-dialog title="修改" :visible.sync="updateDialog" :close-on-click-modal="false">
      <div class="cont_box_right">
        <el-form label-position="right" label-width="80px" :model="formUpdate" ref='formUpdate'>
          <el-form-item label="头像" size="small">
            <el-upload
              ref="uupdata"
              class="avatar-uploader"
              action="/intellmanagerV3.0/upload/file/upload"
              :show-file-list="false"
              :headers='headers'
              :on-change="onChange"
              :on-success="handleAvatarSuccess">
              <img v-if="imageUrl" :src="imageUrl" class="avatar">
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
          </el-form-item>
          <el-form-item label="名称" size="small">
            <el-input v-model="formUpdate.name"></el-input>
          </el-form-item>
          <el-form-item label="邮箱" size="small">
            <el-input v-model="formUpdate.email"></el-input>
          </el-form-item>
          <el-form-item label="号码" size="small">
            <el-input v-model="formUpdate.mobile"></el-input>
          </el-form-item>
          <el-form-item label="民族" size="small">
            <el-input v-model="formUpdate.nation"></el-input>
          </el-form-item> 
          <el-form-item label="性别" size="small" prop="sex">
            <el-radio v-model="formUpdate.sex" label="W">女</el-radio>
            <el-radio v-model="formUpdate.sex" label="M">男</el-radio>
            <el-radio v-model="formUpdate.sex" label="N">未知</el-radio>
          </el-form-item>
        </el-form>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button size="medium " @click="updateDialog = false">取 消</el-button>
        <el-button size="medium " @click="updateList('formUpdate')">修 改</el-button>
      </div>
    </el-dialog>
  </section>  
</template>

<script>
import {authUpdateManager,authManagerInfo,authManagerPassword} from "../../url/api"
export default {
  data(){
    return{
      isActive:1,
      headers:{
        Authorization:sessionStorage.getItem('Authorization'),
        token:sessionStorage.getItem('token')
      },
      imageUrl:'',
      updateDialog:false,
      passwordDialog:false,
      formUpdate:{
        avatar:''
      },
      passwordData:{}
    }
  },
  methods:{
    updatePassword(){//修改登录密码
      let params = this.passwordData
      if(params.firstNewPassword!=params.secondNewPassword){
        this.$message("两次输入的密码不一致")
        return
      }
      authManagerPassword(params).then(res=>{
        console.log(res)
        if(res.data.code == 200){
          this.$message("修改成功")
          this.passwordDialog= false
          this.$router.push({
            path:'/login'
          })
        }else{
          this.$message("修改失败")
        }
      })
    },
    getlist(){//获取管理信息
      authManagerInfo().then(res=>{
        console.log(res)
        if(res.data.code == 200){
          this.formUpdate = res.data.data
        }
      })
    },
    updateList(){//修改
        let params = {
          avatar:this.formUpdate.avatar,
          email:this.formUpdate.email,
          id:this.formUpdate.id,
          mobile:this.formUpdate.mobile,
          name:this.formUpdate.name,
          nation:this.formUpdate.nation,
          sex:this.formUpdate.sex,
          status:this.formUpdate.status,
        }
        authUpdateManager(params).then((res)=>{
          console.log(res)
          if(res.data.code == 200){
            this.$message({
              message: '修改成功',
              type: 'warning'
            });
            this.getlist()
          }
        })

      this.updateDialog =false
    },
    updateShowBox(item){//修改东西弹窗
      this.formUpdate = JSON.parse(JSON.stringify(item));
      this.updateDialog = true
      this.imageUrl = item.avatar

      console.log(this.formUpdate)
    },
    handleAvatarSuccess(res, file) {//添加头像上传成功
      console.log(res, file)
      this.imageUrl = URL.createObjectURL(file.raw);
      if(res.code == 200){
        this.formUpdate.avatar = res.data[0]
      }
    },
    onChange(file, fileList){
      console.log(file, fileList)
      this.imageUrl = URL.createObjectURL(file.raw);
    },
  },
  mounted(){
    this.getlist()
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