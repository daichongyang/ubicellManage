webpackJsonp([29],{PFMR:function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var o=a("mvHQ"),s=a.n(o),r=a("prc4"),l=a("qKdJ"),i={data:function(){return{option1:[],xqTree:[],isAddorUpdate:1,formSearch:{current:1,size:10},formData:[],formUpdate:{},total:0,pages:0,addDialog:!1,updateDialog:!1,formPush:{},dataTree:[],defaultProps2:{children:"children",label:"name",value:"id",expandTrigger:"hover",checkStrictly:!0},rules:{account:[{required:!0,message:"该项不能为空"}],orgId:[{required:!0,message:"该项不能为空",trigger:"change"}],sex:[{required:!0,message:"该项不能为空",trigger:"change"}],status:[{required:!0,message:"该项不能为空",trigger:"change"}]},imageUrl:""}},methods:{getlist:function(){var e=this;Object(l._57)(this.formSearch).then(function(t){console.log(t),200==t.data.code?(e.formData=t.data.data.records.filter(function(t){return t.gmtCreate&&(t.gmtCreate=e.$root.getDateArray(t.gmtCreate)[9]),t}),e.total=t.data.data.total):e.$message(t.data.msg)})},getInit:function(){var e=this;this.getlist(),Object(l._154)({}).then(function(t){console.log(t),200==t.data.code&&(e.xqTree=t.data.data)});Object(l._87)({name:"",status:1}).then(function(t){console.log(t),200==t.data.code&&(e.dataTree=t.data.data)})},handleChange:function(e){0!=e.length?(console.log(e),this.formSearch.orgId=this.$refs.cascader.getCheckedNodes()[0].data.id):this.formSearch.orgId=""},handleChange1:function(e){0!=e.length?(console.log(e),this.formPush.orgId=this.$refs.cascader.getCheckedNodes()[0].data.id):this.formPush.orgId=""},addList:function(e){var t=this;this.$refs[e].validate(function(e){if(!e)return console.log("error submit!!"),!1;Object(l.q)(t.formPush).then(function(e){console.log(e),200==e.data.code?(t.getInit(),t.$message({message:"添加成功",type:"success"})):t.$message("添加失败:"+e.data.msg)}),t.addDialog=!1})},updateList:function(e){var t=this;this.$refs[e].validate(function(e){if(!e)return console.log("error submit!!"),!1;var a=t.formUpdate;Object(l._141)(a).then(function(e){console.log(e),200==e.data.code&&(t.$message({message:"修改成功",type:"warning"}),t.getInit())}),t.updateDialog=!1})},updateShowBox:function(e){this.formUpdate=JSON.parse(s()(e)),delete this.formUpdate.gmtCreate,this.updateDialog=!0,console.log(this.formUpdate)},deleInfor:function(e){var t=this,a={id:e};this.$confirm("确认删除吗？").then(function(e){Object(l._1)(a).then(function(e){console.log(e),200==e.data.code?(t.$message("删除成功"),t.getInit()):t.$message(e.data.msg)})}).catch(function(e){})},handleAvatarSuccess:function(e,t){console.log(e,t),this.imageUrl=URL.createObjectURL(t.raw),200==e.code&&(this.formPush.avatar=e.data[0])},handleCurrentPage:function(e){this.formSearch.current=e,this.getList()}},mounted:function(){this.getInit()},components:{paging:r.a}},n={render:function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("section",{staticClass:"modlude"},[a("el-form",{staticClass:"form_inline",attrs:{inline:!0,model:e.formSearch}},[a("el-form-item",{attrs:{label:"所属组织",size:"small"}},[a("el-cascader",{ref:"cascader",attrs:{options:e.dataTree,props:e.defaultProps2,clearable:""},on:{change:e.handleChange},model:{value:e.option1,callback:function(t){e.option1=t},expression:"option1"}})],1),e._v(" "),a("el-form-item",{attrs:{label:"选择小区",size:"small"}},[a("el-select",{attrs:{placeholder:"请选择小区"},model:{value:e.formSearch.xqId,callback:function(t){e.$set(e.formSearch,"xqId",t)},expression:"formSearch.xqId"}},e._l(e.xqTree,function(e,t){return a("el-option",{key:t,attrs:{label:e.name,value:e.id}})}),1)],1),e._v(" "),a("el-form-item",{attrs:{label:"dns地址",size:"small"}},[a("el-input",{attrs:{placeholder:"请输入dns地址"},model:{value:e.formSearch.sipDns,callback:function(t){e.$set(e.formSearch,"sipDns",t)},expression:"formSearch.sipDns"}})],1),e._v(" "),a("el-form-item",{attrs:{label:"端口",size:"small"}},[a("el-input",{attrs:{placeholder:"请输入端口"},model:{value:e.formSearch.sipPort,callback:function(t){e.$set(e.formSearch,"sipPort",t)},expression:"formSearch.sipPort"}})],1),e._v(" "),a("el-form-item",{attrs:{label:"sip代理地址",size:"small"}},[a("el-input",{attrs:{placeholder:"请输入sip代理地址"},model:{value:e.formSearch.sipProxy,callback:function(t){e.$set(e.formSearch,"sipProxy",t)},expression:"formSearch.sipProxy"}})],1),e._v(" "),a("el-form-item",{attrs:{label:"服务器域名",size:"small"}},[a("el-input",{attrs:{placeholder:"请输入服务器域名"},model:{value:e.formSearch.sipServerDomain,callback:function(t){e.$set(e.formSearch,"sipServerDomain",t)},expression:"formSearch.sipServerDomain"}})],1),e._v(" "),a("el-form-item",[a("el-button",{attrs:{size:"medium "},on:{click:e.getlist}},[e._v("查 询")]),e._v(" "),a("el-button",{attrs:{size:"medium "},on:{click:function(t){e.addDialog=!0}}},[e._v("新 增")])],1)],1),e._v(" "),a("el-table",{staticStyle:{width:"100%"},attrs:{data:e.formData,stripe:""}},[a("el-table-column",{attrs:{prop:"sipDns",label:"dns地址"}}),e._v(" "),a("el-table-column",{attrs:{prop:"sipPort",label:"端口"}}),e._v(" "),a("el-table-column",{attrs:{prop:"sipProxy",label:"sip代理地址"}}),e._v(" "),a("el-table-column",{attrs:{prop:"sipServerDomain",label:"服务器域名"}}),e._v(" "),a("el-table-column",{attrs:{label:"操作",fixed:"right",width:"250"},scopedSlots:e._u([{key:"default",fn:function(t){return[a("el-button",{attrs:{type:"warning",size:"small"},on:{click:function(a){return e.updateShowBox(t.row)}}},[e._v("修 改")]),e._v(" "),a("el-button",{attrs:{type:"danger",size:"small"},on:{click:function(a){return e.deleInfor(t.row.id)}}},[e._v("删 除")])]}}])})],1),e._v(" "),a("paging",{attrs:{"get-total":e.total},on:{changePage:e.handleCurrentPage}}),e._v(" "),a("el-dialog",{attrs:{title:"新增",visible:e.addDialog,"close-on-click-modal":!1},on:{"update:visible":function(t){e.addDialog=t}}},[a("div",{staticClass:"cont_box_right"},[a("el-form",{ref:"addList",attrs:{"label-position":"right",rules:e.rules,"label-width":"90px",model:e.formPush}},[a("el-form-item",{attrs:{label:"dns地址",size:"small"}},[a("el-input",{model:{value:e.formPush.sipDns,callback:function(t){e.$set(e.formPush,"sipDns",t)},expression:"formPush.sipDns"}})],1),e._v(" "),a("el-form-item",{attrs:{label:"端口",size:"small"}},[a("el-input",{model:{value:e.formPush.sipPort,callback:function(t){e.$set(e.formPush,"sipPort",t)},expression:"formPush.sipPort"}})],1),e._v(" "),a("el-form-item",{attrs:{label:"sip代理地址",size:"small"}},[a("el-input",{model:{value:e.formPush.sipProxy,callback:function(t){e.$set(e.formPush,"sipProxy",t)},expression:"formPush.sipProxy"}})],1),e._v(" "),a("el-form-item",{attrs:{label:"服务器域名",size:"small"}},[a("el-input",{model:{value:e.formPush.sipServerDomain,callback:function(t){e.$set(e.formPush,"sipServerDomain",t)},expression:"formPush.sipServerDomain"}})],1),e._v(" "),a("el-form-item",{attrs:{label:"选择小区",size:"small"}},[a("el-select",{attrs:{placeholder:"请选择小区"},model:{value:e.formPush.xqId,callback:function(t){e.$set(e.formPush,"xqId",t)},expression:"formPush.xqId"}},e._l(e.xqTree,function(e,t){return a("el-option",{key:t,attrs:{label:e.name,value:e.id}})}),1)],1)],1)],1),e._v(" "),a("div",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[a("el-button",{attrs:{size:"medium "},on:{click:function(t){e.addDialog=!1}}},[e._v("取 消")]),e._v(" "),a("el-button",{attrs:{size:"medium "},on:{click:function(t){return e.addList("addList")}}},[e._v("新 增")])],1)]),e._v(" "),a("el-dialog",{attrs:{title:"修改",visible:e.updateDialog,"close-on-click-modal":!1},on:{"update:visible":function(t){e.updateDialog=t}}},[a("div",{staticClass:"cont_box_right"},[a("el-form",{ref:"formUpdate",attrs:{"label-position":"right",rules:e.rules,"label-width":"90px",model:e.formPush}},[a("el-form-item",{attrs:{label:"dns地址",size:"small"}},[a("el-input",{model:{value:e.formUpdate.sipDns,callback:function(t){e.$set(e.formUpdate,"sipDns",t)},expression:"formUpdate.sipDns"}})],1),e._v(" "),a("el-form-item",{attrs:{label:"端口",size:"small"}},[a("el-input",{model:{value:e.formUpdate.sipPort,callback:function(t){e.$set(e.formUpdate,"sipPort",t)},expression:"formUpdate.sipPort"}})],1),e._v(" "),a("el-form-item",{attrs:{label:"sip代理地址",size:"small"}},[a("el-input",{model:{value:e.formUpdate.sipProxy,callback:function(t){e.$set(e.formUpdate,"sipProxy",t)},expression:"formUpdate.sipProxy"}})],1),e._v(" "),a("el-form-item",{attrs:{label:"服务器域名",size:"small"}},[a("el-input",{model:{value:e.formUpdate.sipServerDomain,callback:function(t){e.$set(e.formUpdate,"sipServerDomain",t)},expression:"formUpdate.sipServerDomain"}})],1),e._v(" "),a("el-form-item",{attrs:{label:"选择小区",size:"small"}},[a("el-select",{attrs:{placeholder:"请选择小区"},model:{value:e.formUpdate.xqId,callback:function(t){e.$set(e.formUpdate,"xqId",t)},expression:"formUpdate.xqId"}},e._l(e.xqTree,function(e,t){return a("el-option",{key:t,attrs:{label:e.name,value:e.id}})}),1)],1)],1)],1),e._v(" "),a("div",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[a("el-button",{attrs:{size:"medium "},on:{click:function(t){e.updateDialog=!1}}},[e._v("取 消")]),e._v(" "),a("el-button",{attrs:{size:"medium "},on:{click:function(t){return e.updateList("formUpdate")}}},[e._v("修 改")])],1)])],1)},staticRenderFns:[]};var c=a("VU/8")(i,n,!1,function(e){a("c4ee")},"data-v-7ec3e264",null);t.default=c.exports},c4ee:function(e,t){}});
//# sourceMappingURL=29.cfe37c3bb87d8aadbf46.js.map