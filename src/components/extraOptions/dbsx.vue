<template>
  <section class="modlude">
    <div class="dbsx_box">
      <!--  -->
      <div class="dbsx_item">
        
        <div class="dbsx_item_top"><h4>人员管理</h4><div class="dbsx_item_right"></div></div>
        <div class="dbsx_item_infor">
          <span class="dbsx_item_infor_span"><span class="diandian"></span> 审核</span>
          <span>10位新增工作人员信息待审核</span>
        </div>
        <div class="dbsx_item_infor">
          <span class="dbsx_item_infor_span"><span class="diandian"></span> 考勤</span>
          <span>11位工作人员考勤待确认</span>
        </div>
      </div>
      <!--  -->
      <div class="dbsx_item">
        <div class="dbsx_item_top"><h4>权限管理</h4></div>
        <div class="dbsx_item_infor">
          <span class="dbsx_item_infor_span"><span class="diandian"></span>权限分配</span>
          <span>2为工作人员权限待分配</span>
        </div>
      </div>
      <!--  -->
      <div class="dbsx_item">
        <div class="dbsx_item_top"><h4>资源管理</h4></div>
        <div class="dbsx_item_infor">
          <span class="dbsx_item_infor_span"><span class="diandian"></span>领用</span>
          <span>2条领用待处理</span>
        </div>
        <div class="dbsx_item_infor">
          <span class="dbsx_item_infor_span"><span class="diandian"></span>核验</span>
          <span>3条处理待核验</span>
        </div>
      </div>
      <!--  -->
      <div class="dbsx_item">
        <div class="dbsx_item_top"><h4>智能设施</h4></div>
        <div class="dbsx_item_infor">
          <span class="dbsx_item_infor_span"><span class="diandian"></span>设备异常</span>
          <span>5个智能设施异常</span>
        </div>
        <div class="dbsx_item_infor">
          <span class="dbsx_item_infor_span"><span class="diandian"></span>配置</span>
          <span>6个智能设施待配置</span>
        </div>
      </div>
      <!--  -->
      <div class="dbsx_item">
        <div class="dbsx_item_top"><h4>场馆</h4></div>
        <div class="dbsx_item_infor">
          <span class="dbsx_item_infor_span"><span class="diandian"></span>照片</span>
          <span>2个场馆照片待上传</span>
        </div>
        <div class="dbsx_item_infor">
          <span class="dbsx_item_infor_span"><span class="diandian"></span>配置</span>
          <span>2个场馆未配置</span>
        </div>
      </div>
      <!--  -->
      <div class="dbsx_item">
        <div class="dbsx_item_top"><h4>线上服务</h4></div>
        <div class="dbsx_item_infor">
          <span class="dbsx_item_infor_span"><span class="diandian"></span>报修</span>
          <span>2个报修待处理</span>
        </div>
        <div class="dbsx_item_infor">
          <span class="dbsx_item_infor_span"><span class="diandian"></span>投诉建议</span>
          <span>2个投诉建议待处理</span>
        </div>
        <div class="dbsx_item_infor">
          <span class="dbsx_item_infor_span"><span class="diandian"></span>工作任务</span>
          <span>2个工作任务待处理</span>
        </div>
      </div>
      <!--  -->
      <div class="dbsx_item">
        <div class="dbsx_item_top"><h4>信息发布</h4></div>
        <div class="dbsx_item_infor">
          <span class="dbsx_item_infor_span"><span class="diandian"></span>广播</span>
          <span>5条预约广播待播放</span>
        </div>
        <div class="dbsx_item_infor">
          <span class="dbsx_item_infor_span"><span class="diandian"></span>报警</span>
          <span>5条报警信息待处理</span>
        </div>
      </div>
      <!--  -->
      <div class="dbsx_item">
        <div class="dbsx_item_top"><h4>账单管理</h4></div>
        <div class="dbsx_item_infor">
          <span class="dbsx_item_infor_span"><span class="diandian"></span>待支付</span>
          <span>2条账单待支付</span>
        </div>
        <div class="dbsx_item_infor">
          <span class="dbsx_item_infor_span"><span class="diandian"></span>昨日支付</span>
          <span>昨日新增30条账单</span>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {

}
</script>

<style scoped>
.dbsx_box{
  margin-top:20px;
}
.dbsx_item{
  background:#fff;
  display: inline-block;
  margin-right:2%;
  box-sizing: border-box;
  width:32%;
  font-size:12px;
  position:relative;
  min-height:150px;
  margin-bottom:10px;
  border-radius:5px;
  float:left;
  background:rgba(18, 57, 103, 0.5);
  overflow: hidden;
}
.dbsx_item:nth-child(3n){
  margin-right:0px;
}
.dbsx_item_top{
  margin-bottom:10px;
  color:#1fc9f3;
  display:flex;
  align-items: center;
  justify-content: space-between;
  height:50px;
  padding-right:20px;
  padding-left:24px;
  box-sizing:border-box;
  background-image: linear-gradient(to right, #0f3969, #0b2b4f);
}
.dbsx_item:nth-child(2n) .dbsx_item_top{
  background-image: linear-gradient(to right, #104b6e, #0a3550);
}
.dbsx_item_right{
  width:10px;
  height:10px;
  border-radius:50%;
  background: #db4040;
}
.diandian{
  display: inline-block;
  width:2px;
  height:2px;
  border-radius: 50%;
  background: #999999;
  margin-right:4px;
  background:#a1d6f4;
  margin-left:24px;
}
.dbsx_item_infor{
  display:flex;
  align-items: center;

}
.dbsx_item_infor_span{
  display:flex;
  align-items: center;
  margin-right:20px;
  margin-bottom:5px;
}
</style>