webpackJsonp([63],{MTdO:function(e,t){},Oe7n:function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r=a("prc4"),l=a("qKdJ"),o={data:function(){return{option1:[],xqTree:[],isAddorUpdate:1,formSearch:{current:1,size:10},formData:[],formUpdate:{},total:0,dataTree:[],defaultProps2:{children:"children",label:"name",value:"id",expandTrigger:"hover",checkStrictly:!0}}},methods:{getlist:function(){var e=this;Object(l._44)(this.formSearch).then(function(t){console.log(t),200==t.data.code?(e.formData=t.data.data.records.filter(function(t){return t.callDate&&(t.callDate=e.$root.getDateArray(t.callDate)[9]),t}),e.total=t.data.data.total):e.$message(t.data.msg)})},getInit:function(){var e=this;this.getlist(),Object(l._135)({}).then(function(t){console.log(t),200==t.data.code&&(e.xqTree=t.data.data,e.formSearch.xqId=e.xqTree[0].id||"")});Object(l._73)({name:"",status:1}).then(function(t){console.log(t),200==t.data.code&&(e.dataTree=t.data.data)})},handleCurrentPage:function(e){this.formSearch.current=e,this.getInit()},handleChange:function(e){var t=this;0!=e.length?(console.log(e),this.formSearch.orgId=this.$refs.cascader.getCheckedNodes()[0].data.id):this.formSearch.orgId="",Object(l._44)(this.formSearch).then(function(e){console.log(e),200==e.data.code?(t.formData=e.data.data.records.filter(function(e){return e.gmtCreate&&(e.gmtCreate=t.$root.getDateArray(e.gmtCreate)[9]),e}),t.total=e.data.data.total):t.$message(e.data.msg)})}},mounted:function(){this.getInit()},components:{paging:r.a}},n={render:function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("section",{staticClass:"modlude"},[a("el-form",{staticClass:"form_inline",attrs:{inline:!0,model:e.formSearch,"label-width":"100px"}},[a("el-form-item",{attrs:{label:"所属组织",size:"small"}},[a("el-cascader",{ref:"cascader",attrs:{options:e.dataTree,props:e.defaultProps2,clearable:""},on:{change:e.handleChange},model:{value:e.option1,callback:function(t){e.option1=t},expression:"option1"}})],1),e._v(" "),a("el-form-item",{attrs:{label:"选择小区",size:"small"}},[a("el-select",{attrs:{placeholder:"请选择小区"},model:{value:e.formSearch.xqId,callback:function(t){e.$set(e.formSearch,"xqId",t)},expression:"formSearch.xqId"}},e._l(e.xqTree,function(e,t){return a("el-option",{key:t,attrs:{label:e.name,value:e.id}})}),1)],1),e._v(" "),a("el-form-item",{attrs:{label:"物业单类型",size:"small"}},[a("el-select",{attrs:{placeholder:"请选择物业单类型"},model:{value:e.formSearch.type,callback:function(t){e.$set(e.formSearch,"type",t)},expression:"formSearch.type"}},[a("el-option",{attrs:{label:"物业报修",value:1}}),e._v(" "),a("el-option",{attrs:{label:"物业缴费",value:2}}),e._v(" "),a("el-option",{attrs:{label:"在线申请",value:3}}),e._v(" "),a("el-option",{attrs:{label:"投诉建议",value:4}}),e._v(" "),a("el-option",{attrs:{label:"停车场",value:5}})],1)],1),e._v(" "),a("el-form-item",{attrs:{label:"操作时间",size:"small"}},[a("el-date-picker",{attrs:{type:"datetime","value-format":"timestamp",placeholder:"操作时间"},model:{value:e.formSearch.opertime,callback:function(t){e.$set(e.formSearch,"opertime",t)},expression:"formSearch.opertime"}})],1),e._v(" "),a("el-form-item",[a("el-button",{attrs:{size:"small"},on:{click:e.getlist}},[e._v("查 询")])],1)],1),e._v(" "),a("el-table",{staticStyle:{width:"100%"},attrs:{data:e.formData,stripe:""}},[a("el-table-column",{attrs:{prop:"nickname",label:"用户昵称"}}),e._v(" "),a("el-table-column",{attrs:{prop:"phone",label:"手机号"}}),e._v(" "),a("el-table-column",{attrs:{prop:"adesc",label:"操作详情"}}),e._v(" "),a("el-table-column",{attrs:{prop:"",label:"操作时间"},scopedSlots:e._u([{key:"default",fn:function(t){return t.row.gmtCreate?[e._v("\n          "+e._s(e.$root.getDateArray(t.row.gmtCreate)[9])+"\n        ")]:void 0}}],null,!0)}),e._v(" "),a("el-table-column",{attrs:{label:"类型"},scopedSlots:e._u([{key:"default",fn:function(t){return[e._v("\n\t\t\t\t\t"+e._s(1==t.row.type?"物业报修":2==t.row.type?"物业缴费":3==t.row.type?"在线申请":4==t.row.type?"投诉建议":"停车场")+"\n\t\t\t\t")]}}])})],1),e._v(" "),a("paging",{attrs:{"get-total":e.total},on:{changePage:e.handleCurrentPage}})],1)},staticRenderFns:[]};var s=a("VU/8")(o,n,!1,function(e){a("MTdO")},"data-v-11a4ec9a",null);t.default=s.exports}});
//# sourceMappingURL=63.fb56d08eb1d2becada8f.js.map