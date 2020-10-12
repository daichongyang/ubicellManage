<template>
  <section>
    <!-- 导航栏 -->
    <div class="nav_options">
      <div class="nav_option " @click="getList(0)">
        <span>巡查详情</span>
      </div>
      <div class="nav_option nav_option_active" @click="getList(1)">
        <span>照片及电子签名凭证</span>
      </div>
      <div class="nav_option" @click="getList(2)">
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
        <el-form-item label="承租人">
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
                <el-col :span="8">教育路九耀坊巷005号-102</el-col>
                <el-col :span="8">巡查时间：2019.12.02  19:10:13</el-col>
                <el-col :span="8">
                  <el-row>
                    <el-col :span="12" style="text-align:center;">
                      巡查状态：异常
                    </el-col>
                    <el-col :span="12" style="text-align:right;maring-left:20px;">
                      <el-button size="small">导出</el-button>
                    </el-col>
                  </el-row>
                </el-col>
              </el-row>

              <!-- 添加图片 -->
              <div class="eleContractContent">
                <el-form>
                  <el-form-item>
                    <el-upload
                      action="/api/upload/uploadfile"
                      list-type="picture-card"
                      :file-list="fileList2"
                      :on-preview="handlePictureCardPreview"
                      :on-remove="handleRemove1">
                      <i class="el-icon-plus"></i>
                    </el-upload>
                    <el-dialog :visible.sync="dialogVisible">
                      <img width="100%" :src="dialogImageUrl" alt="">
                    </el-dialog>
                  </el-form-item>
                </el-form>

              </div>
            </div>
          </el-col>
        </el-row>
      </div>
      <div class="eleContract">
        <el-row>
          <el-col>
            <div class="chayueleft">
              <el-row class="yuyuetop">
                <el-col :span="8">教育路九耀坊巷005号-101</el-col>
                <el-col :span="8">巡查时间：2019.12.02  19:18:07</el-col>
                <el-col :span="8">
                  <el-row>
                    <el-col :span="12" style="text-align:center;">
                      巡查状态：正常
                    </el-col>
                    <el-col :span="12" style="text-align:right;maring-left:20px;">
                      <el-button size="small">导出</el-button>
                    </el-col>
                  </el-row>
                </el-col>
              </el-row>

              <!-- 添加图片 -->
              <div class="eleContractContent">
                <el-form>
                  <el-form-item>
                    <el-upload
                      action="/api/upload/uploadfile"
                      list-type="picture-card"
                      :file-list="fileList2"
                      :on-preview="handlePictureCardPreview"
                      :on-remove="handleRemove1">
                      <i class="el-icon-plus"></i>
                    </el-upload>
                    <el-dialog :visible.sync="dialogVisible">
                      <img width="100%" :src="dialogImageUrl" alt="">
                    </el-dialog>
                  </el-form-item>
                </el-form>

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
      fileList2:[],
             images:[
					require('../../assets/带水印照片.jpg'),
					require('../../assets/房间1.png'),
					require('../../assets/房间2.png'),
					require('../../assets/房间3.png'),
					require('../../assets/签名.png'),
					require('../../assets/nav5.png'),
					require('../../assets/nav6.png'),
					require('../../assets/nav7.png'),
					require('../../assets/nav8.png'),
					require('../../assets/nav9.png'),
        ],
        pushImg1:'',
        dialogImageUrl:'',
        dialogVisible:false
    }
  },
  methods:{
    getList(item){
      if(item == 0){
        this.$router.push({
          path:'./fangwuxunchaDetaul'
        })
      }else if(item == 2){
        this.$router.push({
          path:'./fwxcErr'
        })
      }
    },
    handleRemove1(){

    },
      handlePictureCardPreview(file) {
        this.dialogImageUrl = file.url;
        this.dialogVisible = true;
      }
  },
  mounted(){
    
    for(let i = 0 ;i<5;i++){
      let obj ={
        name:"a"+i,
        url:this.images[i]
      }
      this.fileList2.push(obj)
    }
  }
}
</script>

<style>
.eleContract{
  padding:0 20px;
  margin-bottom:20px;
}
.eleContract .el-row{
  display: flex;
  align-items: center;
}
.eleContractContent{
  border:1px solid #a1d6f4;
}
</style>