<template>
  <section>
    <!-- <div class="navTabsMenu">
      <ul class="tabsMenu">
        <li @click="getList()">
          <span class="txt">诉状及相关资料凭证</span>
        </li>
        <li class="current" >
          <span class="txt">诉讼进度记录</span>
        </li>
      </ul>
    </div> -->
      <div class="eleContract">
        <el-row>
          <el-col>
            <div class="chayueleft">
              <!-- 添加图片 -->
              <div class="eleContractContent">
                <el-steps :active="active" align-center style="margin-top:20px;">
                  <el-step></el-step>
                  <el-step></el-step>
                  <el-step></el-step>
                  <el-step></el-step>
                  <el-step></el-step>
                  <el-step></el-step>
                  <el-step></el-step>
                  <el-step></el-step>
                  <el-step></el-step>
                  <el-step></el-step>
                </el-steps>
                <div class="showSteps">
                  <div class="step_item">
                    <div>事项：<b>会议发起</b> </div>
                    <div>时间：2019.10.21  14:32:12</div>
                    <div>记录员：李经理</div>
                    <div style="margin-top:10px;"> <el-checkbox v-model="checked"></el-checkbox>已发送通知至李经理、总经理、总裁，待审批</div>
                    <div class="posit" v-if="false">
                      <img :src="images[0]" alt="" class="step_img">
                      <button class="yulan">预览</button>
                      <button class="xiazai">下载</button>
                    </div>
                  </div>
                  <div class="step_item">
                    <div>事项：<b>审核批准</b></div>
                    <div>时间：2019.10.21  15:30:00</div>
                    <div>记录人：系统记录</div>
                    <div style="margin-top:10px;"> <el-checkbox v-model="checked"></el-checkbox>已发送通知至与会人员：李经理、王律师、法务文员</div>
                    <div class="posit" v-if="false">
                      <img :src="images[0]" alt="" class="step_img">
                      <button class="yulan">预览</button>
                      <button class="xiazai">下载</button>
                    </div>
                  </div>
                  <!-- <div class="step_item">
                    <div>事项：<b>诉状审批</b></div>
                    <div>状态：审批通过</div>
                    <div>时间：2019.10.21  15:33:00</div>
                    <div>审批人：管理处负责人</div>
                    <div class="posit" v-if="false">
                      <img :src="images[0]" alt="" class="step_img">
                      <button class="yulan">预览</button>
                      <button class="xiazai">下载</button>
                    </div>
                  </div>
                  <div class="step_item">
                    <div>事项：<b>诉状审批</b></div>
                    <div>状态：审批通过</div>
                    <div>时间：2019.10.21  15:33:00</div>
                    <div>审批人：房产局审批</div>
                    <div class="posit" v-if="false">
                      <img :src="images[0]" alt="" class="step_img">
                      <button class="yulan">预览</button>
                      <button class="xiazai">下载</button>
                    </div>
                  </div>
                  <div class="step_item">
                    <div>事项：<b>快递寄送至法院</b></div>
                    <div>时间：2019.10.21  15:30:00</div>
                    <div>记录员：李经理</div>
                    <div class="posit" v-if="false">
                      <img :src="images[0]" alt="" class="step_img">
                      <button class="yulan">预览</button>
                      <button class="xiazai">下载</button>
                    </div>
                  </div>
                  <div class="step_item">
                    <div>事项：<b>确定开庭时间为2019年11月1日下午14：00</b></div>
                    <div>时间：2019.10.21  15:30:00</div>
                    <div>记录员：李经理</div>
                    <div> <el-checkbox v-model="checked"></el-checkbox>已发送通知至李经理、王律师、被告王刚</div>
                    <div class="posit" v-if="false">
                      <img :src="images[0]" alt="" class="step_img">
                      <button class="yulan">预览</button>
                      <button class="xiazai">下载</button>
                    </div>
                  </div>
                  <div class="step_item">
                    <div>事项：<b>收到判决结果</b></div>
                    <div>时间：2019.10.21  15:30:00</div>
                    <div>记录员：李经理</div>
                    <div> <el-checkbox v-model="checked"></el-checkbox>已发送通知至李经理、王律师、被告王刚、法务文员</div>
                    <div class="posit" v-if="false">
                      <img :src="images[0]" alt="" class="step_img">
                      <button class="yulan">预览</button>
                      <button class="xiazai">下载</button>
                    </div>
                    
                  </div>
                  <div class="step_item">
                    <div>事项：<b>执行申请</b></div>
                    <div>时间：2019.10.21  15:33:00</div>
                    <div>申请人：总部法务文员</div>
                    <div class="posit" v-if="false">
                      <img :src="images[0]" alt="" class="step_img">
                      <button class="yulan">预览</button>
                      <button class="xiazai">下载</button>
                    </div>
                  </div>
                  <div class="step_item">
                    <div>事项：<b>执行审批</b></div>
                    <div>时间：2019.10.21  15:30:00</div>
                    <div>审批人：法务主管</div>
                    <div class="posit" v-if="false">
                      <img :src="images[0]" alt="" class="step_img">
                      <button class="yulan">预览</button>
                      <button class="xiazai">下载</button>
                    </div>
                  </div> -->
                  <div class="step_item">
                    <div>事项：</div>
                    <div>
                      <el-input
                        type="textarea"
                        style="width:100%;"
                        maxlength='500'
                        placeholder="多行输入">
                      </el-input>
                    </div>
                    <div>资料凭证：</div>
                    <div>
                      <el-upload
                        class="avatar-uploader"
                        action="https://jsonplaceholder.typicode.com/posts/"
                        :show-file-list="false"
                        :on-success="handleAvatarSuccess"
                        :before-upload="beforeAvatarUpload">
                        <img v-if="imageUrl" :src="imageUrl" class="avatar">
                        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                      </el-upload>
                    </div>
                    <div>发送通知：</div>
                    <div style="width:65%;border:1px solid #e5e5e5;padding:5px;min-height:50px;color:#999;font-size:12px;position:relative;"> <el-button size="mini" style="position:absolute;bottom:0px;right:-88px;">选择人员</el-button></div>
                    <div><el-button size="mini" style="margin-top:10px;">保存并发布</el-button></div>
                  </div>
                  <!-- <div class="step_item"> 
                    <el-button type="primary" icon="el-icon-plus" size='medium'>新增节点</el-button>
                  </div> -->
                </div>
              </div>
            </div>
          </el-col>
        </el-row>
      </div>
  </section>
</template>

<script>

export default {
  data(){
    return{
       checher:"1",
       checher1:1,
       active:9,
       checked:true,
       imageUrl: '',
       images:[
					require('../../assets/zjian.png'),
					require('../../assets/房间2.png'),
					require('../../assets/房间3.png'),
					require('../../assets/nav4.png'),
					require('../../assets/nav5.png'),
					require('../../assets/nav6.png'),
					require('../../assets/nav7.png'),
					require('../../assets/nav8.png'),
					require('../../assets/nav9.png'),
				],
    }
  },
  methods:{
    getList(){
      this.$router.push({
        path:'./suSongDetauls'
      })
    },
    handleAvatarSuccess(res, file) {
      this.imageUrl = URL.createObjectURL(file.raw);
    },
    beforeAvatarUpload(file) {
      const isJPG = file.type === 'image/jpeg';
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isJPG) {
        this.$message.error('上传头像图片只能是 JPG 格式!');
      }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!');
      }
      return isJPG && isLt2M;
    }
  }
}
</script>

<style scoped>
  @import '../../assets/manage.css';
  .posit{
    position:relative;
    margin-top:10px;
  }
  .yulan{ 
    width:40%;
    position:absolute;
    bottom:10px;
    left:10px;
  }
  .xiazai{
    width:40%;
    position:absolute;
    bottom:10px;
    right:10px;
  }
  .eleContract{
    margin-top:20px;
  }
  .showSteps{
    display:flex;
    margin-top:10px;
  }
  .step_item{
    width:10%;
  }
  .step_img{
    width:100%;
  }
.avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 160px;
    height: 160px;
    line-height: 160px;
    text-align: center;
  }
  .avatar {
    width: 160px;
    height: 160px;
    display: block;
  }
</style>