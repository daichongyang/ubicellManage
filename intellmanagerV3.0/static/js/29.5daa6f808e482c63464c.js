webpackJsonp([29],{"U+8p":function(e,t){},k21P:function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var l=a("prc4"),o=a("qKdJ"),r={data:function(){return{option1:[],xqTree:[],formSearch:{current:1,size:10},formData:[],formUpdate:{},total:0,dataTree:[],defaultProps2:{children:"children",label:"label",value:"id",expandTrigger:"hover",checkStrictly:!0}}},methods:{getlist:function(){var e=this;Object(o._62)(this.formSearch).then(function(t){console.log(t),200==t.data.code?(e.formData=t.data.data.records.filter(function(t){return t.callDate&&(t.callDate=e.$root.getDateArray(t.callDate)[9]),t}),e.total=t.data.data.total):e.$message(t.data.msg)})},getInit:function(){var e=this;this.getlist(),Object(o._196)({}).then(function(t){console.log(t),200==t.data.code&&(e.xqTree=t.data.data)});Object(o._115)({name:"",status:1}).then(function(t){console.log(t),200==t.data.code&&(e.dataTree=t.data.data)})},handleCurrentPage:function(e){this.formSearch.current=e,this.getlist()},handleChange:function(e){var t=this;0!=e.length?(console.log(e),this.formSearch.orgId=this.$refs.cascader.getCheckedNodes()[0].data.id):this.formSearch.orgId="",Object(o._62)(this.formSearch).then(function(e){console.log(e),200==e.data.code?(t.formData=e.data.data.records.filter(function(e){return e.gmtCreate&&(e.gmtCreate=t.$root.getDateArray(e.gmtCreate)[9]),e}),t.total=e.data.data.total):t.$message(e.data.msg)})}},mounted:function(){this.getInit()},components:{paging:l.a}},s={render:function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("section",{staticClass:"modlude"},[a("el-form",{staticClass:"form_inline",attrs:{inline:!0,model:e.formSearch}},[a("el-form-item",{attrs:{label:"所属组织",size:"small"}},[a("el-cascader",{ref:"cascader",attrs:{options:e.dataTree,props:e.defaultProps2,clearable:""},on:{change:e.handleChange},model:{value:e.option1,callback:function(t){e.option1=t},expression:"option1"}})],1),e._v(" "),a("el-form-item",{attrs:{label:"主机账号",size:"small"}},[a("el-input",{attrs:{placeholder:"请输入主机账号"},model:{value:e.formSearch.account,callback:function(t){e.$set(e.formSearch,"account",t)},expression:"formSearch.account"}})],1),e._v(" "),a("el-form-item",{attrs:{label:"主机ip",size:"small"}},[a("el-input",{attrs:{placeholder:"请输入主机ip"},model:{value:e.formSearch.devIp,callback:function(t){e.$set(e.formSearch,"devIp",t)},expression:"formSearch.devIp"}})],1),e._v(" "),a("el-form-item",{attrs:{label:"房间名称",size:"small"}},[a("el-input",{attrs:{placeholder:"请输入房间名称"},model:{value:e.formSearch.houseName,callback:function(t){e.$set(e.formSearch,"houseName",t)},expression:"formSearch.houseName"}})],1),e._v(" "),a("el-form-item",{attrs:{label:"房间所在区域",size:"small"}},[a("el-input",{attrs:{placeholder:"请输入房间所在区域"},model:{value:e.formSearch.houseSection,callback:function(t){e.$set(e.formSearch,"houseSection",t)},expression:"formSearch.houseSection"}})],1),e._v(" "),a("el-form-item",{attrs:{label:"房间类型",size:"small"}},[a("el-select",{model:{value:e.formSearch.type,callback:function(t){e.$set(e.formSearch,"type",t)},expression:"formSearch.type"}},[a("el-option",{attrs:{label:"管家中心",value:1}}),e._v(" "),a("el-option",{attrs:{label:"业主中心",value:2}})],1)],1),e._v(" "),a("el-form-item",{attrs:{label:"主机设备类型",size:"small"}},[a("el-select",{model:{value:e.formSearch.devType,callback:function(t){e.$set(e.formSearch,"devType",t)},expression:"formSearch.devType"}},[a("el-option",{attrs:{label:"7500",value:1}})],1)],1),e._v(" "),a("el-form-item",[a("el-button",{attrs:{size:"small"},on:{click:e.getlist}},[e._v("查 询")])],1)],1),e._v(" "),a("el-table",{staticStyle:{width:"100%"},attrs:{data:e.formData,stripe:""}},[a("el-table-column",{attrs:{prop:"xqName",label:"小区名称"}}),e._v(" "),a("el-table-column",{attrs:{prop:"account",label:"主机账号"}}),e._v(" "),a("el-table-column",{attrs:{prop:"devIp",label:"主机 ip"}}),e._v(" "),a("el-table-column",{attrs:{prop:"nickname",label:"昵称"}}),e._v(" "),a("el-table-column",{attrs:{prop:"devPort",label:"主机端口号"}}),e._v(" "),a("el-table-column",{attrs:{prop:"houseName",label:"房间名称"}}),e._v(" "),a("el-table-column",{attrs:{prop:"houseNum",label:"房间号"}}),e._v(" "),a("el-table-column",{attrs:{prop:"phone",label:"手机号"}}),e._v(" "),a("el-table-column",{attrs:{prop:"transferIp",label:"转换服务器ip"}}),e._v(" "),a("el-table-column",{attrs:{label:"主机状态"},scopedSlots:e._u([{key:"default",fn:function(t){return[e._v("\n        "+e._s(0==t.row.devState?"初始状态":1==t.row.devState?"tcp 连接成功":2==t.row.devState?"tcp连接不成功":3==t.row.devState?"注册成功":"注册不成功")+"\n      ")]}}])}),e._v(" "),a("el-table-column",{attrs:{label:"媒体状态"},scopedSlots:e._u([{key:"default",fn:function(t){return[e._v("\n        "+e._s(0==t.row.sipState?"初始状态":1==t.row.sipState?"没有连接":2==t.row.sipState?"连接不成功":3==t.row.sipState?"没有注册":4==t.row.sipState?"注册成功":"注册不成功")+"\n      ")]}}])}),e._v(" "),a("el-table-column",{attrs:{prop:"devLastRecv",label:"主机最后接收命令时间"}}),e._v(" "),a("el-table-column",{attrs:{prop:"devLastSend",label:"主机最后发送命令时间"}}),e._v(" "),a("el-table-column",{attrs:{prop:"sipLastRecv",label:"sip最后接收命令时间"}}),e._v(" "),a("el-table-column",{attrs:{prop:"sipLastSend",label:"sip最后发送命令时间"}})],1),e._v(" "),a("paging",{attrs:{"get-total":e.total},on:{changePage:e.handleCurrentPage}})],1)},staticRenderFns:[]};var n=a("VU/8")(r,s,!1,function(e){a("U+8p")},"data-v-7d7a969f",null);t.default=n.exports}});
//# sourceMappingURL=29.5daa6f808e482c63464c.js.map