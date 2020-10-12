<template>
  <section class="form_content">
    <el-form :inline="true" :model="formSearch" class="form_inline">
      <el-form-item label="选择位置" size="mini">
        <el-select v-model="formSearch.region" placeholder="活动区域">
          <el-option label="区域一" value="shanghai"></el-option>
          <el-option label="区域二" value="beijing"></el-option>
        </el-select>
        <span style="color:#a1d6f4;"> - </span>
        <el-select v-model="formSearch.region" placeholder="活动区域">
          <el-option label="区域一" value="shanghai"></el-option>
          <el-option label="区域二" value="beijing"></el-option>
        </el-select>
        <span style="color:#a1d6f4;"> - </span>
        <el-select v-model="formSearch.region" placeholder="活动区域">
          <el-option label="区域一" value="shanghai"></el-option>
          <el-option label="区域二" value="beijing"></el-option>
        </el-select>
      </el-form-item>
    </el-form>
    <el-form :inline="true" :model="formSearch">
      <el-form-item label="审批人" size="small">
        <el-input v-model="formSearch.user" placeholder="审批人"></el-input>
      </el-form-item>
      <el-form-item label="活动区域" size="small">
        <el-select v-model="formSearch.region" placeholder="活动区域">
          <el-option label="区域一" value="shanghai"></el-option>
          <el-option label="区域二" value="beijing"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="导出时间" size="small">
        <el-date-picker
          v-model="formSearch.value1"
          type="datetime"
          value-format="timestamp"
          placeholder="开始时间">
        </el-date-picker>
        <span style="color:#a1d6f4;"> - </span>
        <el-date-picker
          v-model="formSearch.value2"
          type="datetime"
          value-format="timestamp"
          placeholder="结束时间">
        </el-date-picker>
      </el-form-item>
      <el-form-item>
        <el-button size="small" @click="">查询</el-button>
      </el-form-item>
      <el-form-item>
        <el-button size="small" @click="">查询</el-button>
      </el-form-item>
    </el-form>
    <el-table
      :data="tableData"
      stripe
      style="width: 100%">
      <el-table-column
        prop="date"
        label="日期"
        width="180">
      </el-table-column>
      <el-table-column
        prop="name"
        label="姓名"
        width="180">
      </el-table-column>
      <el-table-column
        prop="address"
        label="地址">
      </el-table-column>
    </el-table>
    <div class="pagination">
      <el-pagination
        layout="prev, pager, next"
        prev-text="上一页"
        next-text="下一页"
        :total="500">
      </el-pagination>
    </div>

  </section>
</template>

<script>
export default {
  data(){
    return{
      formSearch:{},//查询
      formPush:{},//提交
      tableData: [{
          date: '2016-05-02',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-04',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1517 弄'
        }, {
          date: '2016-05-01',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1519 弄'
        }, {
          date: '2016-05-03',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1516 弄'
        }]
    }
  },
  methods:{

  }
}
</script>

<style>

</style>