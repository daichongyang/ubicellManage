webpackJsonp([44],{"4wOg":function(e,t){},NQok:function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var l=a("prc4"),r=a("qKdJ"),o={data:function(){return{option1:[],xqTree:[],isAddorUpdate:1,formSearch:{type:1,current:1,size:10},formData:[],formUpdate:{},total:0,dataTree:[],defaultProps2:{children:"children",label:"name",value:"id",expandTrigger:"hover",checkStrictly:!0}}},methods:{getlist:function(){var e=this;Object(r.D)(this.formSearch).then(function(t){console.log(t),200==t.data.code?(e.formData=t.data.data.records.filter(function(t){return t.callDate&&(t.callDate=e.$root.getDateArray(t.callDate)[9]),t}),e.total=t.data.data.total):e.$message(t.data.msg)})},getInit:function(){var e=this;this.getlist(),Object(r._135)({}).then(function(t){console.log(t),200==t.data.code&&(e.xqTree=t.data.data,e.formSearch.xqId=e.xqTree[0].id||"")});Object(r._73)({name:"",status:1}).then(function(t){console.log(t),200==t.data.code&&(e.dataTree=t.data.data)})},handleCurrentPage:function(e){this.formSearch.current=e,this.getInit()},handleChange:function(e){var t=this;0!=e.length?(console.log(e),this.formSearch.orgId=this.$refs.cascader.getCheckedNodes()[0].data.id):this.formSearch.orgId="",Object(r.D)(this.formSearch).then(function(e){console.log(e),200==e.data.code?(t.formData=e.data.data.records.filter(function(e){return e.gmtCreate&&(e.gmtCreate=t.$root.getDateArray(e.gmtCreate)[9]),e}),t.total=e.data.data.total):t.$message(e.data.msg)})}},mounted:function(){this.getInit()},components:{paging:l.a}},c={render:function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("section",{staticClass:"modlude"},[a("el-form",{staticClass:"form_inline",attrs:{inline:!0,model:e.formSearch,"label-width":"100px"}},[a("el-form-item",{attrs:{label:"所属组织",size:"small"}},[a("el-cascader",{ref:"cascader",attrs:{options:e.dataTree,props:e.defaultProps2,clearable:""},on:{change:e.handleChange},model:{value:e.option1,callback:function(t){e.option1=t},expression:"option1"}})],1),e._v(" "),a("el-form-item",{attrs:{label:"选择小区",size:"small"}},[a("el-select",{attrs:{placeholder:"请选择小区"},model:{value:e.formSearch.xqId,callback:function(t){e.$set(e.formSearch,"xqId",t)},expression:"formSearch.xqId"}},e._l(e.xqTree,function(e,t){return a("el-option",{key:t,attrs:{label:e.name,value:e.id}})}),1)],1),e._v(" "),a("el-form-item",{attrs:{label:"主叫设备名",size:"small"}},[a("el-input",{attrs:{placeholder:"请输入主叫设备名"},model:{value:e.formSearch.callerDevice,callback:function(t){e.$set(e.formSearch,"callerDevice",t)},expression:"formSearch.callerDevice"}})],1),e._v(" "),a("el-form-item",{attrs:{label:"主叫所在区域",size:"small"}},[a("el-input",{attrs:{placeholder:"请输入主叫所在区域"},model:{value:e.formSearch.callerSection,callback:function(t){e.$set(e.formSearch,"callerSection",t)},expression:"formSearch.callerSection"}})],1),e._v(" "),a("el-form-item",{attrs:{label:"被叫房间名称",size:"small"}},[a("el-input",{attrs:{placeholder:"请输入被叫房间名称"},model:{value:e.formSearch.houseName,callback:function(t){e.$set(e.formSearch,"houseName",t)},expression:"formSearch.houseName"}})],1),e._v(" "),a("el-form-item",{attrs:{label:"被叫房间所在区域",size:"small"}},[a("el-input",{attrs:{placeholder:"请输入被叫房间所在区域"},model:{value:e.formSearch.houseSection,callback:function(t){e.$set(e.formSearch,"houseSection",t)},expression:"formSearch.houseSection"}})],1),e._v(" "),a("el-form-item",{attrs:{label:"主叫手机号",size:"small"}},[a("el-input",{attrs:{placeholder:"请输入手机号"},model:{value:e.formSearch.phone,callback:function(t){e.$set(e.formSearch,"phone",t)},expression:"formSearch.phone"}})],1),e._v(" "),a("el-form-item",{attrs:{label:"呼叫类型",size:"small"}},[a("el-select",{attrs:{placeholder:"请选择呼叫类型"},model:{value:e.formSearch.type,callback:function(t){e.$set(e.formSearch,"type",t)},expression:"formSearch.type"}},[a("el-option",{attrs:{label:"门口机和对讲机呼叫记录",value:1}}),e._v(" "),a("el-option",{attrs:{label:"个人呼叫房间",value:2}})],1)],1),e._v(" "),a("el-form-item",{attrs:{label:"呼叫时间",size:"small"}},[a("el-date-picker",{attrs:{type:"datetime","value-format":"timestamp",placeholder:"开始时间"},model:{value:e.formSearch.startTime,callback:function(t){e.$set(e.formSearch,"startTime",t)},expression:"formSearch.startTime"}}),e._v(" "),a("span",{staticStyle:{color:"#a1d6f4"}},[e._v(" - ")]),e._v(" "),a("el-date-picker",{attrs:{type:"datetime","value-format":"timestamp",placeholder:"结束时间"},model:{value:e.formSearch.endTime,callback:function(t){e.$set(e.formSearch,"endTime",t)},expression:"formSearch.endTime"}})],1),e._v(" "),a("el-form-item",[a("el-button",{attrs:{size:"small"},on:{click:e.getlist}},[e._v("查 询")])],1)],1),e._v(" "),a("el-table",{staticStyle:{width:"100%"},attrs:{data:e.formData,stripe:""}},[a("el-table-column",{attrs:{prop:"callerDevice",label:"主叫设备名"}}),e._v(" "),a("el-table-column",{attrs:{prop:"callerName",label:"呼叫者姓名"}}),e._v(" "),a("el-table-column",{attrs:{prop:"callerSection",label:"主叫设备区域名"}}),e._v(" "),a("el-table-column",{attrs:{prop:"companydst",label:"呼叫号"}}),e._v(" "),a("el-table-column",{attrs:{prop:"houseName",label:"房间名"}}),e._v(" "),a("el-table-column",{attrs:{prop:"houseSection",label:"房间区域名"}}),e._v(" "),a("el-table-column",{attrs:{prop:"phone",label:"手机号"}}),e._v(" "),a("el-table-column",{attrs:{prop:"talkTime",label:"通话时长"}}),e._v(" "),a("el-table-column",{attrs:{prop:"callDate",label:"呼叫时间"}}),e._v(" "),a("el-table-column",{attrs:{label:"类型"},scopedSlots:e._u([{key:"default",fn:function(t){return[e._v("\n\t\t\t\t\t"+e._s(1==t.row.type?"门口机和对讲机呼叫记录":"个人呼叫房间")+"\n\t\t\t\t")]}}])})],1),e._v(" "),a("paging",{attrs:{"get-total":e.total},on:{changePage:e.handleCurrentPage}})],1)},staticRenderFns:[]};var n=a("VU/8")(o,c,!1,function(e){a("4wOg")},"data-v-47a7e17c",null);t.default=n.exports}});
//# sourceMappingURL=44.b97981a8c04e45949b62.js.map