webpackJsonp([67],{"Hy/B":function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var l=a("mvHQ"),o=a.n(l),r=a("prc4"),s=a("qKdJ"),m={data:function(){return{checkStrictly:!1,bindRole:{},showmenuList:[],menuList:[],option1:[],xqTree:[],isAddorUpdate:1,formSearch:{current:1,size:10},formData:[],formUpdate:{},total:0,pages:0,addDialog:!1,updateDialog:!1,dialog:!1,formPush:{},dataTree:[],defaultProps:{children:"data",label:"name"},defaultProps2:{children:"children",label:"name",value:"id",expandTrigger:"hover",checkStrictly:!0},rules:{account:[{required:!0,message:"该项不能为空"}],orgId:[{required:!0,message:"该项不能为空",trigger:"blur"}],xqId:[{required:!0,message:"该项不能为空",trigger:"blur"}]},imageUrl:""}},methods:{getlist:function(){var e=this;Object(s._54)(this.formSearch).then(function(t){console.log(t),200==t.data.code?(e.formData=t.data.data.records.filter(function(t){return t.gmtCreate&&(t.gmtCreate=e.$root.getDateArray(t.gmtCreate)[9]),t}),e.total=t.data.data.total):e.$message(t.data.msg)})},getInit:function(){var e=this;this.getlist(),Object(s._191)({}).then(function(t){console.log(t),200==t.data.code&&(e.xqTree=t.data.data)});Object(s._115)({name:"",status:1}).then(function(t){console.log(t),200==t.data.code&&(e.dataTree=t.data.data)})},handleChange:function(e){0!=e.length?(console.log(e),this.formSearch.orgId=this.$refs.cascader.getCheckedNodes()[0].data.id):this.formSearch.orgId=""},handleChange1:function(e){0!=e.length?(console.log(e),this.formPush.orgId=this.$refs.cascader.getCheckedNodes()[0].data.id):this.formPush.orgId=""},addList:function(e){var t=this;this.$refs[e].validate(function(e){if(!e)return console.log("error submit!!"),!1;Object(s.f)(t.formPush).then(function(e){console.log(e),200==e.data.code?(t.getInit(),t.$message({message:"添加成功",type:"success"})):t.$message("添加失败:"+e.data.msg)}),t.addDialog=!1})},updateList:function(e){var t=this;this.$refs[e].validate(function(e){if(!e)return console.log("error submit!!"),!1;t.formUpdate.gmtCreate&&delete t.formUpdate.gmtCreate;var a=t.formUpdate;Object(s._160)(a).then(function(e){console.log(e),200==e.data.code&&(t.$message({message:"修改成功",type:"warning"}),t.getInit())}),t.updateDialog=!1})},updateShowBox:function(e){this.formUpdate=JSON.parse(o()(e)),this.updateDialog=!0,console.log(this.formUpdate)},deleInfor:function(e){var t=this,a=[e];this.$confirm("确认删除吗？").then(function(e){Object(s._5)(a).then(function(e){console.log(e),200==e.data.code?(t.$message("删除成功"),t.getlist()):t.$message(e.data.msg)})}).catch(function(e){})},handleCurrentPage:function(e){this.formSearch.current=e,this.getList()}},mounted:function(){this.getInit()},components:{paging:r.a}},i={render:function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("section",{staticClass:"modlude"},[a("el-form",{staticClass:"form_inline",attrs:{inline:!0,model:e.formSearch}},[a("el-form-item",{attrs:{label:"选择小区",size:"small"}},[a("el-select",{attrs:{placeholder:"请选择小区"},model:{value:e.formSearch.xqId,callback:function(t){e.$set(e.formSearch,"xqId",t)},expression:"formSearch.xqId"}},e._l(e.xqTree,function(e,t){return a("el-option",{key:t,attrs:{label:e.name,value:e.id}})}),1)],1),e._v(" "),a("el-form-item",{attrs:{label:"时间",size:"small"}},[a("el-date-picker",{attrs:{type:"datetime",placeholder:"开始时间"},model:{value:e.formSearch.startTime,callback:function(t){e.$set(e.formSearch,"startTime",t)},expression:"formSearch.startTime"}}),e._v(" "),a("span",{staticStyle:{color:"#a1d6f4"}},[e._v(" - ")]),e._v(" "),a("el-date-picker",{attrs:{type:"datetime",placeholder:"结束时间"},model:{value:e.formSearch.endTime,callback:function(t){e.$set(e.formSearch,"endTime",t)},expression:"formSearch.endTime"}})],1),e._v(" "),a("el-form-item",{attrs:{label:"BUS接口",size:"small"}},[a("el-input",{attrs:{placeholder:"请输入BUS接口"},model:{value:e.formSearch.busInter,callback:function(t){e.$set(e.formSearch,"busInter",t)},expression:"formSearch.busInter"}})],1),e._v(" "),a("el-form-item",{attrs:{label:"名称",size:"small"}},[a("el-input",{attrs:{placeholder:"请输入名称"},model:{value:e.formSearch.name,callback:function(t){e.$set(e.formSearch,"name",t)},expression:"formSearch.name"}})],1),e._v(" "),a("el-form-item",{attrs:{label:"产品编码",size:"small"}},[a("el-input",{attrs:{placeholder:"请输入产品编码"},model:{value:e.formSearch.code,callback:function(t){e.$set(e.formSearch,"code",t)},expression:"formSearch.code"}})],1),e._v(" "),a("el-form-item",{attrs:{label:"MAC地址",size:"small"}},[a("el-input",{attrs:{placeholder:"请输入MAC地址"},model:{value:e.formSearch.mac,callback:function(t){e.$set(e.formSearch,"mac",t)},expression:"formSearch.mac"}})],1),e._v(" "),a("el-form-item",{attrs:{label:"制造商",size:"small"}},[a("el-input",{attrs:{placeholder:"请输入制造商"},model:{value:e.formSearch.makeCompany,callback:function(t){e.$set(e.formSearch,"makeCompany",t)},expression:"formSearch.makeCompany"}})],1),e._v(" "),a("el-form-item",{attrs:{label:"产品型号",size:"small"}},[a("el-input",{attrs:{placeholder:"请输入产品型号"},model:{value:e.formSearch.patternNo,callback:function(t){e.$set(e.formSearch,"patternNo",t)},expression:"formSearch.patternNo"}})],1),e._v(" "),a("el-form-item",{attrs:{label:"机身号码",size:"small"}},[a("el-input",{attrs:{placeholder:"请输入机身号码"},model:{value:e.formSearch.wareNo,callback:function(t){e.$set(e.formSearch,"wareNo",t)},expression:"formSearch.wareNo"}})],1),e._v(" "),a("el-form-item",[a("el-button",{attrs:{size:"medium "},on:{click:e.getlist}},[e._v("查 询")]),e._v(" "),a("el-button",{attrs:{size:"medium "},on:{click:function(t){e.addDialog=!0,e.imageUrl=""}}},[e._v("新 增")])],1)],1),e._v(" "),a("el-table",{staticStyle:{width:"100%"},attrs:{data:e.formData,stripe:""}},[a("el-table-column",{attrs:{prop:"name",label:"名称"}}),e._v(" "),a("el-table-column",{attrs:{prop:"xqName",label:"小区名称"}}),e._v(" "),a("el-table-column",{attrs:{prop:"makeCompany",label:"制造商"}}),e._v(" "),a("el-table-column",{attrs:{prop:"busInter",label:"BUS接口"}}),e._v(" "),a("el-table-column",{attrs:{prop:"code",label:"产品编码"}}),e._v(" "),a("el-table-column",{attrs:{prop:"groupNo",label:"产品批号"}}),e._v(" "),a("el-table-column",{attrs:{prop:"mac",label:"MAC地址"}}),e._v(" "),a("el-table-column",{attrs:{prop:"patternNo",label:"产品型号"}}),e._v(" "),a("el-table-column",{attrs:{prop:"storeRemark",label:"入库备注"}}),e._v(" "),a("el-table-column",{attrs:{prop:"storeTime",label:"入库时间"},scopedSlots:e._u([{key:"default",fn:function(t){return[e._v("\n          "+e._s(e.$root.getDateArray(t.row.storeTime)[9])+"\n        ")]}}])}),e._v(" "),a("el-table-column",{attrs:{prop:"storeUser",label:"入库员"}}),e._v(" "),a("el-table-column",{attrs:{prop:"wareNo",label:"机身号码"}}),e._v(" "),a("el-table-column",{attrs:{prop:"gmtCreate",label:"生产时间"}}),e._v(" "),a("el-table-column",{attrs:{label:"操作",fixed:"right",width:"250"},scopedSlots:e._u([{key:"default",fn:function(t){return[a("el-button",{attrs:{type:"warning",size:"small"},on:{click:function(a){return e.updateShowBox(t.row)}}},[e._v("修 改")]),e._v(" "),a("el-button",{attrs:{type:"danger",size:"small"},on:{click:function(a){return e.deleInfor(t.row.id)}}},[e._v("删 除")])]}}])})],1),e._v(" "),a("paging",{attrs:{"get-total":e.total},on:{changePage:e.handleCurrentPage}}),e._v(" "),a("el-dialog",{attrs:{title:"新增",visible:e.addDialog,"close-on-click-modal":!1},on:{"update:visible":function(t){e.addDialog=t}}},[a("div",{staticClass:"cont_box_right"},[a("el-form",{ref:"addList",attrs:{"label-position":"right",rules:e.rules,"label-width":"80px",model:e.formPush}},[a("el-form-item",{attrs:{label:"选择小区",size:"small",prop:"xqId"}},[a("el-select",{attrs:{placeholder:"请选择小区"},model:{value:e.formPush.xqId,callback:function(t){e.$set(e.formPush,"xqId",t)},expression:"formPush.xqId"}},e._l(e.xqTree,function(e,t){return a("el-option",{key:t,attrs:{label:e.name,value:e.id}})}),1)],1),e._v(" "),a("el-form-item",{attrs:{label:"产品名称",size:"small"}},[a("el-input",{model:{value:e.formPush.name,callback:function(t){e.$set(e.formPush,"name",t)},expression:"formPush.name"}})],1),e._v(" "),a("el-form-item",{attrs:{label:"BUS接口",size:"small"}},[a("el-input",{model:{value:e.formPush.busInter,callback:function(t){e.$set(e.formPush,"busInter",t)},expression:"formPush.busInter"}})],1),e._v(" "),a("el-form-item",{attrs:{label:"产品编码",size:"small"}},[a("el-input",{model:{value:e.formPush.code,callback:function(t){e.$set(e.formPush,"code",t)},expression:"formPush.code"}})],1),e._v(" "),a("el-form-item",{attrs:{label:"产品批号",size:"small"}},[a("el-input",{model:{value:e.formPush.groupNo,callback:function(t){e.$set(e.formPush,"groupNo",t)},expression:"formPush.groupNo"}})],1),e._v(" "),a("el-form-item",{attrs:{label:"MAC地址",size:"small"}},[a("el-input",{model:{value:e.formPush.mac,callback:function(t){e.$set(e.formPush,"mac",t)},expression:"formPush.mac"}})],1),e._v(" "),a("el-form-item",{attrs:{label:"制造商",size:"small"}},[a("el-input",{model:{value:e.formPush.makeCompany,callback:function(t){e.$set(e.formPush,"makeCompany",t)},expression:"formPush.makeCompany"}})],1),e._v(" "),a("el-form-item",{attrs:{label:"产品型号",size:"small"}},[a("el-input",{model:{value:e.formPush.patternNo,callback:function(t){e.$set(e.formPush,"patternNo",t)},expression:"formPush.patternNo"}})],1),e._v(" "),a("el-form-item",{attrs:{label:"民族",size:"small"}},[a("el-input",{model:{value:e.formPush.storeRemark,callback:function(t){e.$set(e.formPush,"storeRemark",t)},expression:"formPush.storeRemark"}})],1),e._v(" "),a("el-form-item",{attrs:{label:"入库时间",size:"small"}},[a("el-date-picker",{attrs:{type:"datetime","value-format":"timestamp",placeholder:"入库时间"},model:{value:e.formPush.storeTime,callback:function(t){e.$set(e.formPush,"storeTime",t)},expression:"formPush.storeTime"}})],1),e._v(" "),a("el-form-item",{attrs:{label:"入库员",size:"small"}},[a("el-input",{model:{value:e.formPush.storeUser,callback:function(t){e.$set(e.formPush,"storeUser",t)},expression:"formPush.storeUser"}})],1),e._v(" "),a("el-form-item",{attrs:{label:"机身号码",size:"small"}},[a("el-input",{model:{value:e.formPush.wareNo,callback:function(t){e.$set(e.formPush,"wareNo",t)},expression:"formPush.wareNo"}})],1)],1)],1),e._v(" "),a("div",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[a("el-button",{attrs:{size:"medium "},on:{click:function(t){e.addDialog=!1}}},[e._v("取 消")]),e._v(" "),a("el-button",{attrs:{size:"medium "},on:{click:function(t){return e.addList("addList")}}},[e._v("新 增")])],1)]),e._v(" "),a("el-dialog",{attrs:{title:"修改",visible:e.updateDialog,"close-on-click-modal":!1},on:{"update:visible":function(t){e.updateDialog=t}}},[a("div",{staticClass:"cont_box_right"},[a("el-form",{ref:"formUpdate",attrs:{"label-position":"right",rules:e.rules,"label-width":"80px",model:e.formUpdate}},[a("el-form-item",{attrs:{label:"选择小区",size:"small",prop:"xqId"}},[a("el-select",{attrs:{placeholder:"请选择小区"},model:{value:e.formUpdate.xqId,callback:function(t){e.$set(e.formUpdate,"xqId",t)},expression:"formUpdate.xqId"}},e._l(e.xqTree,function(e,t){return a("el-option",{key:t,attrs:{label:e.name,value:e.id}})}),1)],1),e._v(" "),a("el-form-item",{attrs:{label:"产品名称",size:"small"}},[a("el-input",{model:{value:e.formUpdate.name,callback:function(t){e.$set(e.formUpdate,"name",t)},expression:"formUpdate.name"}})],1),e._v(" "),a("el-form-item",{attrs:{label:"BUS接口",size:"small"}},[a("el-input",{model:{value:e.formUpdate.busInter,callback:function(t){e.$set(e.formUpdate,"busInter",t)},expression:"formUpdate.busInter"}})],1),e._v(" "),a("el-form-item",{attrs:{label:"产品编码",size:"small"}},[a("el-input",{model:{value:e.formUpdate.code,callback:function(t){e.$set(e.formUpdate,"code",t)},expression:"formUpdate.code"}})],1),e._v(" "),a("el-form-item",{attrs:{label:"产品批号",size:"small"}},[a("el-input",{model:{value:e.formUpdate.groupNo,callback:function(t){e.$set(e.formUpdate,"groupNo",t)},expression:"formUpdate.groupNo"}})],1),e._v(" "),a("el-form-item",{attrs:{label:"MAC地址",size:"small"}},[a("el-input",{model:{value:e.formUpdate.mac,callback:function(t){e.$set(e.formUpdate,"mac",t)},expression:"formUpdate.mac"}})],1),e._v(" "),a("el-form-item",{attrs:{label:"制造商",size:"small"}},[a("el-input",{model:{value:e.formUpdate.makeCompany,callback:function(t){e.$set(e.formUpdate,"makeCompany",t)},expression:"formUpdate.makeCompany"}})],1),e._v(" "),a("el-form-item",{attrs:{label:"产品型号",size:"small"}},[a("el-input",{model:{value:e.formUpdate.patternNo,callback:function(t){e.$set(e.formUpdate,"patternNo",t)},expression:"formUpdate.patternNo"}})],1),e._v(" "),a("el-form-item",{attrs:{label:"民族",size:"small"}},[a("el-input",{model:{value:e.formUpdate.storeRemark,callback:function(t){e.$set(e.formUpdate,"storeRemark",t)},expression:"formUpdate.storeRemark"}})],1),e._v(" "),a("el-form-item",{attrs:{label:"入库时间",size:"small"}},[a("el-date-picker",{attrs:{type:"datetime","value-format":"timestamp",placeholder:"入库时间"},model:{value:e.formUpdate.storeTime,callback:function(t){e.$set(e.formUpdate,"storeTime",t)},expression:"formUpdate.storeTime"}})],1),e._v(" "),a("el-form-item",{attrs:{label:"入库员",size:"small"}},[a("el-input",{model:{value:e.formUpdate.storeUser,callback:function(t){e.$set(e.formUpdate,"storeUser",t)},expression:"formUpdate.storeUser"}})],1),e._v(" "),a("el-form-item",{attrs:{label:"机身号码",size:"small"}},[a("el-input",{model:{value:e.formUpdate.wareNo,callback:function(t){e.$set(e.formUpdate,"wareNo",t)},expression:"formUpdate.wareNo"}})],1)],1)],1),e._v(" "),a("div",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[a("el-button",{attrs:{size:"medium "},on:{click:function(t){e.updateDialog=!1}}},[e._v("取 消")]),e._v(" "),a("el-button",{attrs:{size:"medium "},on:{click:function(t){return e.updateList("formUpdate")}}},[e._v("修 改")])],1)])],1)},staticRenderFns:[]};var n=a("VU/8")(m,i,!1,function(e){a("OBvM")},"data-v-282ae6d6",null);t.default=n.exports},OBvM:function(e,t){}});
//# sourceMappingURL=67.474325a4d612c5d46b44.js.map