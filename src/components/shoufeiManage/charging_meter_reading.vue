<template>
  <section class="modlude">
    <el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
      <el-form :inline="true" class="gridContt">
        <el-form :inline="true">
          <el-form-item size="small" label="公寓/小区">
            <el-select
              size="small"
              v-model="checkInfor.apartmentId"
              placeholder="输入公寓/小区名"
              @change="checkInfor.current=1,getList"
            >
              <el-option
                v-for="item in selectArr"
                :key="item.apartmentId"
                :label="item.name"
                :value="item.apartmentId"
              ></el-option>
            </el-select>
          </el-form-item>
          <!-- <el-form-item size="small" label="查询类型">
            <el-select size='small' v-model="checkInfor.handle" placeholder="选择查询类型" >
              <el-option v-for="item in selectArr" :key="item.apartmentId" :label="item.name" :value="item.apartmentId"></el-option>
              <el-option label="未审核" :value="0"></el-option>
              <el-option label="已审核" :value="1"></el-option>
              <el-option label="所有" :value="2"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="手机号">
            <el-input placeholder="输入手机号" v-model="checkInfor.phone" size='small'></el-input>
          </el-form-item>-->
        </el-form>
        <el-form class="button">
          <el-form-item>
            <el-button type="primary" size="medium" @click="gocharging_config_price">配置单价</el-button>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" size="medium" @click="getList">查询</el-button>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" size="medium" @click="reloadCon">重置</el-button>
          </el-form-item>
        </el-form>
      </el-form>
      <!-- <el-form class="marginTop20" :inline="true">
        <el-button type="primary" @click="showBill">生成账单</el-button>
      </el-form> -->
    </el-col>

    <!-- 列表部分 -->
    <el-table
      :data="inforList"
      highlight-current-row
      v-loading="listLoading"
      @selection-change="selsChange"
      style="width: 100%;"
    >
      <el-table-column class="ccc" type="selection" width="55" label="全选"></el-table-column>
      <el-table-column prop="name" label="门牌号"></el-table-column>
      <el-table-column prop="tenant" label="承租人"></el-table-column>
      <el-table-column prop label="类型">
        <template slot-scope="scope">
          <div
            style="line-height:40px;"
            v-if="scope.row.handwritten"
          >{{scope.row.handwritten[0].devType==1?"冷水表":(scope.row.handwritten[0].devType==2?"电表":"热水表")}}</div>
          <div
            style="line-height:40px;"
            v-if="scope.row.handwritten"
          >{{scope.row.handwritten[1].devType==1?"冷水表":(scope.row.handwritten[1].devType==2?"电表":"热水表")}}</div>
          <div
            style="line-height:40px;"
            v-if="scope.row.handwritten"
          >{{scope.row.handwritten[2].devType==1?"冷水表":(scope.row.handwritten[2].devType==2?"电表":"热水表")}}</div>
        </template>
      </el-table-column>
      <el-table-column prop="typeName" label="上次度数">
        <template slot-scope="scope">
          <el-input
            v-model="scope.row.handwritten[0].lastNum"
            palceholder="请输入"
            style="width:100px;"
          ></el-input>
          <el-input
            v-model="scope.row.handwritten[1].lastNum"
            palceholder="请输入"
            style="width:100px;"
          ></el-input>
          <el-input
            v-model="scope.row.handwritten[2].lastNum"
            palceholder="请输入"
            style="width:100px;"
          ></el-input>
        </template>
      </el-table-column>
      <el-table-column prop="createTime" label="本次度数">
        <template slot-scope="scope">
          <el-input
            @change="changeInput(item,$event)"
            v-for="item in scope.row.handwritten"
            :value="item.nowNum"
            :key="item.nowNum"
            palceholder="请输入"
            style="width:100px;"
          ></el-input>
          <!-- <el-input v-model="scope.row.currentNum[1]" palceholder="请输入" style="width:100px;"></el-input>
          <el-input v-model="scope.row.currentNum[2]" palceholder="请输入" style="width:100px;"></el-input>-->
        </template>
      </el-table-column>
      <el-table-column prop="promiseMan" label="用量" width="100">
        <template slot-scope="scope">
          <div
            style="line-height:40px;"
          >{{(scope.row.handwritten[0].nowNum == null || scope.row.handwritten[0].lastNum == null) ? 0:(scope.row.handwritten[0].nowNum-scope.row.handwritten[0].lastNum).toFixed(2)}}
          </div>
          <div
            style="line-height:40px;"
          >{{(scope.row.handwritten[1].nowNum == null || scope.row.handwritten[1].lastNum == null) ? 0:(scope.row.handwritten[1].nowNum-scope.row.handwritten[1].lastNum).toFixed(2)}}</div>
          <div
            style="line-height:40px;"
          >{{(scope.row.handwritten[2].nowNum == null || scope.row.handwritten[2].lastNum == null) ? 0:(scope.row.handwritten[2].nowNum-scope.row.handwritten[2].lastNum).toFixed(2)}}</div>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <div style="line-height:40px;"><el-button v-if="scope.row.handwritten[0].isAuto==1" size="small" @click="checkNum(scope.row.houseId,scope.row.leaseId,scope.row.handwritten[0])">更新读数</el-button></div>
          <div style="line-height:40px;"><el-button v-if="scope.row.handwritten[1].isAuto==1" size="small" @click="checkNum(scope.row.houseId,scope.row.leaseId,scope.row.handwritten[1])">更新读数</el-button></div>
          <div style="line-height:40px;"><el-button v-if="scope.row.handwritten[2].isAuto==1" size="small" @click="checkNum(scope.row.houseId,scope.row.leaseId,scope.row.handwritten[2])">更新读数</el-button></div>
        </template>
      </el-table-column>
      <el-table-column prop="lastTime" label="上次抄表时间">
        <template slot-scope="scope">
          <div style="line-height:40px;">{{scope.row.handwritten[0].lastTimee}}</div>
          <div style="line-height:40px;">{{scope.row.handwritten[1].lastTimee}}</div>
          <div style="line-height:40px;">{{scope.row.handwritten[2].lastTimee}}</div>
        </template>
      </el-table-column>
      <el-table-column prop="latestTime" label="表类型">
        <template slot-scope="scope">
          <div
            :class="{'green':scope.row.handwritten[0].isAuto==1}"
            style="line-height:40px;"
          >{{scope.row.handwritten[0].isAuto==0?'手抄表':'智能表'}}</div>
          <div
            :class="{'green':scope.row.handwritten[1].isAuto==1}"
            style="line-height:40px;"
          >{{scope.row.handwritten[1].isAuto==0?'手抄表':'智能表'}}</div>
          <div
            :class="{'green':scope.row.handwritten[2].isAuto==1}"
            style="line-height:40px;"
          >{{scope.row.handwritten[2].isAuto==0?'手抄表':'智能表'}}</div>
        </template>
      </el-table-column>
      <el-table-column prop="rentCost" label="抄表状态">
        <template slot-scope="scope">
          <div
            :class="{'green':scope.row.handwritten[0].status==1,'red':scope.row.handwritten[0].status==0}"
            style="line-height:40px;"
          >{{scope.row.handwritten[0].status == 0 ? "本月未抄" : "本月已抄"}}</div>
          <div
            :class="{'green':scope.row.handwritten[1].status==1,'red':scope.row.handwritten[1].status==0}"
            style="line-height:40px;"
          >{{scope.row.handwritten[1].status == 0 ? "本月未抄" : "本月已抄"}}</div>
          <div
            :class="{'green':scope.row.handwritten[2].status==1,'red':scope.row.handwritten[2].status==0}"
            style="line-height:40px;"
          >{{scope.row.handwritten[2].status == 0 ? "本月未抄" : "本月已抄"}}</div>
        </template>
      </el-table-column>
      <!-- <el-table-column label="操作" fixed="right" width=250>
				<template slot-scope="scope">
					<el-button size="small" @click="updateInfor(scope.row)">保存</el-button>
				</template>
      </el-table-column>-->
    </el-table>
    <!-- 生成账单 -->
    <el-dialog title="生成账单" :visible.sync="addFormVisible" :close-on-click-modal="false">
      <el-form :model="addForm" label-width="110px" ref="addForm">
        <el-form-item size="small" label="账单生成方式">
          <el-select size="small" v-model="addForm.createType" placeholder="请选择账单生成方式">
            <el-option label="跟随账期" :value="0"></el-option>
            <el-option label="指定支付日期" :value="1"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="账单支付时间" v-if="addForm.createType == 1">
          <el-date-picker v-model="addForm.payTime" type="date" value-format="timestamp"></el-date-picker>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click.native="addFormVisible = false">取消</el-button>
        <el-button type="primary" @click.native="updateInfor">提交</el-button>
      </div>
    </el-dialog>
    <el-dialog :visible.sync="addFormVisible1">
      <span>有表用量为0，是否继续</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="addFormVisible1 = false">取 消</el-button>
        <el-button type="primary" @click="addFormVisible = true,addFormVisible1 = false">确 定</el-button>
      </span>
    </el-dialog>
    <el-dialog :visible.sync="addFormVisible2">
      <span>有表用量小于0</span>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="addFormVisible = false">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 批量删除，下标页码 -->
    <el-col :span="24" class="paginationt">
      <el-pagination
        layout="prev, pager, next"
        @current-change="handleCurrentChange"
        :page-size="10"
        :page-count="total"
        class="pagination"
      ></el-pagination>
    </el-col>
  </section>
</template>
<script>
// import { getDateArray } from "../../util/util";
// import {
//   handwrittenList,
//   selectApartment,
//   handwrittenGenerate,
//   getPowerNumberByHouseId
// } from "../../url/api";
export default {
  data() {
    return {
      aaa: "",
      headIcon: "",
      dushuNum: "",
      dushu: false,
      total: 1,
      addFormVisible: false,
      addFormVisible1: false,
      addFormVisible2: false,
      listLoading: false,
      sels: [], //列表选中列
      checkList: [],
      inforList: [],
      selectArr: [], //公寓下拉列表
      checkInfor: {
        //条件查询
        current: 1,
        size: 10,
        apartmentId: ""
      },
      //生成账单
      addForm: {},
      updataForm: {}
    };
  },
  methods: {
    reloadCon() {
      location.reload();
    },
    // 获取实时智能水电表度数
    checkNum(houseId,leaseId,row) {
      console.log(row);
      let params = {
        houseId: houseId,
        type: row.devType
      };
      console.log(params);
      getPowerNumberByHouseId(params).then(res => {
        console.log(res);
        if (res.data.code === 200) {
          row.nowNum = res.data.data;
        }else{
          alert("更新失败")
        }
      });
    },
    // 生成账单弹窗
    showBill() {
      console.log(this.sels)
      let _this = this;
      if(this.sels.length == 0){
        alert("请勾选您要生成账单的房间")
        return
      }
      let objj = this.sels.filter(function(item) {
        for (let i = 0; i < item.handwritten.length; i++) {
          if (item.handwritten[i].nowNum - item.handwritten[i].lastNum == 0) {
            _this.addFormVisible1 = true;
            return;
          }
          if (item.handwritten[i].nowNum) {
            if (item.handwritten[i].nowNum - item.handwritten[i].lastNum < 0) {
              _this.addFormVisible2 = true;
              return;
            }
          }
        }

        return item;
      });
      _this.addFormVisible = true;
    },
    gocharging_config_price() {
      this.$router.push({
        path: "/charging_config_price"
      });
    },
    changeInput(row, e) {
      console.log(row);
      console.log(e);
      row.nowNum = e;
    },
    updateInfor() {
      //生成账单
      let _this = this;
      let params = [];
      let objj = this.sels.filter(function(item) {
        for (let i = 0; i < item.handwritten.length; i++) {
          let obj = {
            createType: _this.addForm.createType,
            payTime: _this.addForm.payTime,
            devType: item.handwritten[i].devType,
            endNum: item.handwritten[i].nowNum,
            startNum: item.handwritten[i].lastNum,
            startTime: item.handwritten[i].lastTime,
            houseId: item.houseId,
            leaseId: item.leaseId
          };
          params.push(obj);
        }
        return item;
      });
      console.log(params);
      if (params.length == 0) {
        alert("请勾选需要生成账单的水电表");
        return;
      }
      handwrittenGenerate(params)
        .then(res => {
          console.log(res);
          this.addFormVisible = false;
          if (res.data.code === 200) {
            alert("生成账单成功");
            this.getList();
          } else if (res.data.code == 109) {
            alert(res.data.msg);
          } else {
            alert("生成账单失败");
          }
        })
        .catch(err => {
          alert("请求失败");
        });
    },
    getApartmentList() {

    },
    getList() {
      //获取列表
      let params = this.checkInfor;
      console.log(params);
      handwrittenList(params).then(res => {
        console.log(res);
        if (res.data.code === 200) {
          this.inforList = res.data.data.records.filter(function(item) {
            for (let i = 0; i < item.handwritten.length; i++) {
              if (item.handwritten[i].lastTime) {
                item.handwritten[i].lastTimee = getDateArray(
                  item.handwritten[i].lastTime
                )[16];
              }
              if (item.handwritten[i].lastNum) {
                item.handwritten[i].lastNum = item.handwritten[
                  i
                ].lastNum.toFixed(2);
              }
              if (item.handwritten[i].nowNum) {
                item.handwritten[i].nowNum = item.handwritten[i].nowNum.toFixed(
                  2
                );
              }
            }
            return item;
          });
          this.total = res.data.data.pages;
        }
      });
    },
    changeItem(index, row) {
      //修改
    },
    handleCurrentChange(val) {
      this.checkInfor.current = val;
      this.getList();
    },
    selsChange: function(sels) {
      // 当选择项发生变化时会触发该事件
      this.sels = sels.filter(function(sel) {
        if (sel.isExist !== 1) {
          return sel;
        }
      });
    }
  },
  mounted() {

  }
};
</script>
<style scoped>
@import "../../assets/manage.css";
.gridContt {
  line-height: 30px;
}
.green {
  color: #41cac0;
}
.red {
  color: red;
}
</style>


