<template>
  <section class="modlude">
    <el-form :inline="true" :model="formSearch" class="form_inline">
      <el-form-item label="选择小区" size="small">
        <el-select v-model="formSearch.xqId" placeholder="请选择小区" @change="getlist">
          <el-option v-for="(item,index) in xqTree" :label="item.name" :value="item.id" :key="index"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button size="small" @click="getlist">查 询</el-button>
        <el-button type="primary" size="small" @click="addDialog=true">添 加</el-button>
      </el-form-item>
    </el-form>
    <div class="nav_options" style="margin-bottom:20px;">
      <div class="nav_option" :class="{nav_option_active:isActive == item.cardId}" @click="changeList(item)" v-for="(item,index) in formData" :key="index">
        <span>{{item.cardName}}</span>
      </div>
    </div>
    <el-row :gutter="20">
      <el-col :span="4" v-for="(item,index) in cardList" :key="index" style="margin-bottom:20px;">
        <el-card shadow="always">
          <div style="position:relative;"> 
            金额：<span style="font-size:30px;">{{item}}</span>（元）
            <el-button class="aaa" type="danger" size="mini" icon="el-icon-delete" @click="deleteCard(index)"></el-button>
          </div>
        </el-card>
      </el-col>
    </el-row>
    <div style="text-align:center;margin-top:20px;">
      <el-button @click="changeData">保存</el-button>
    </div>
    <!-- 添加 -->
    <el-dialog title="添加" :visible.sync="addDialog" :close-on-click-modal="false">
      <el-form class="form_inline" label-width="110px">
        <el-form-item label="充值面额" size="small">
          <el-input v-model="cost"></el-input>
        </el-form-item>
        <!-- <span slot="footer" class="dialog-footer"> -->
          <el-button @click="addDialog = false" size="small">取 消</el-button>
          <el-button type="primary" @click="addCard" size="small">确 定</el-button>
        <!-- </span> -->
        </el-form>
    </el-dialog>
  </section>
</template>

<script>
import {refillCardList,xqSelectList,refillupdateCard} from "../../url/api"
export default {
  data(){
    return{
      cost:'',
      costs:[],
      addDialog:false,
      isActive:1,
      xqTree:[],
      formSearch:{
        xqId:''
      },
      formData:[],
      cardList:[],//每个类型卡片的列表
      addOrDeleteData:{
        cardId:'',
        costs:[],
        xqId:''
      }
    }
  },
  methods:{
    changeList(item){
      this.isActive = item.cardId
      this.cardList = item.costs
    },
    deleteCard(index){//删除
      this.cardList.splice(index,1)
    },
    addCard(){    // 添加
      this.cardList.unshift(this.cost)
      this.addDialog = false
    },
    changeData(){//更新卡片
      if(this.cardList.length==0){
        return
      }
      this.cardList.forEach(item=>{
        this.addOrDeleteData.costs.push(item)
      })
      this.addOrDeleteData.cardId = this.isActive
      let params = this.addOrDeleteData
      refillupdateCard(params).then(res=>{
        console.log(res)
        if(res.data.code == 200){
          this.$message("保存成功")
          this.getlist()
        }else{
          this.$message("保存失败")
        }
      })
    },
    getlist(){//充值卡列表
      this.addOrDeleteData.costs = []
      this.addOrDeleteData.xqId = this.formSearch.xqId
      refillCardList(this.formSearch).then(res=>{
        console.log(res)
        if(res.data.code == 200){
          this.formData = res.data.data
          this.isActive = this.formData[0].cardId
          this.cardList = this.formData[0].costs
        }
      })
    },
    getInit(){
        xqSelectList({}).then((ress)=>{//小区选择列表
          console.log(ress)
          if(ress.data.code == 200){
            this.xqTree = ress.data.data
            this.formSearch.xqId = this.xqTree[0].id
            this.getlist()
          }
        })
    }
  },
  mounted(){
    this.getInit()
  }
}
</script>

<style scoped>
  @import '../../assets/mySelf.css';
  .aaa{
    position: absolute;
    bottom:0px;
    right:0px;
  }
</style>