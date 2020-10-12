<template>
  <section>
    <div class="pagination">
      <span class="total">
        <span> 总条数：{{total}} 条</span>
        <span style="margin-left:20px;" v-if="moduleData.name=='parking_keytop_record'">  总额：{{moduleData.allMoney}}</span>
        <span style="margin-left:20px;" v-if="moduleData.name=='parking_keytop_info'">  空余车位数：{{moduleData.freeSpaceNum}} 总车位数：{{moduleData.totalSpaceNum}}</span>
      </span>
      <el-pagination
        layout="prev, pager, next"
        prev-text="上一页"
        next-text="下一页"
        @current-change="handleCurrentPage"
        :page-size="10" 
        :total="total">
      </el-pagination>
    </div>
  </section>
</template>

<script>
export default {
  props:['getTotal','moduleInfor'],
  data(){
    return{
      total:0,
      money:0,
      moduleData:{},
    }
  },
  watch:{
    getTotal(val){
      console.log(val)
      this.total = val
    },
    moduleInfor(val){
      console.log(val)
      this.moduleData = val
    },
  },
  methods:{
    handleCurrentPage(val){//页码房间列表
      this.$emit('changePage',val)
    },
  }
}
</script>

<style>

</style>