webpackJsonp([24],{"+lJA":function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var o=a("prc4"),l=a("qKdJ"),r={data:function(){return{option1:[],deleBatch:[],isGetFather:!1,formSearch:{houseType:1,current:1,size:10},formSearch1:{type:1,current:1,size:10},formPush:{userType:2,sex:1,addUser:1,getCall:1},formData:[],formData1:[],formUpdate:{},total:0,total1:0,pages:0,addDialog:!1,updateDialog:!1,dataTree:[],defaultProps:{children:"children",label:"label"},defaultProps2:{children:"children",label:"name",value:"id",expandTrigger:"hover",checkStrictly:!0},xqTree:[],rules:{phone:[{required:!0,message:"该项不能为空"}],ubicellJyh:[{required:!0,message:"该项不能为空"}],addUser:[{required:!0,message:"该项不能为空",trigger:"change"}],getCall:[{required:!0,message:"该项不能为空",trigger:"change"}],xqId:[{required:!0,message:"该项不能为空",trigger:"change"}],houseId:[{required:!0,message:"该项不能为空",trigger:"change"}]}}},methods:{confirmPhone:function(e){var t=this,a={phone:e,xqId:this.formSearch.xqId};console.log(e),Object(l.R)(a).then(function(e){if(console.log(e),200==e.data.code&&e.data.data)for(var a in e.data.data)t.formPush[a]=e.data.data[a],console.log(e.data.data[a])})},gethouseLIst:function(){var e=this;Object(l._95)(this.formSearch1).then(function(t){console.log(t),200==t.data.code?(e.formData1=t.data.data.records.filter(function(t){return t.gmtModified&&(t.gmtModified=e.$root.getDateArray(t.gmtModified)[9]),t}),e.total1=t.data.data.total,e.pages=t.data.pages):e.$message(t.data.msg)})},handleCurrentPage1:function(e){this.formSearch1.current=e,this.gethouseLIst()},getlist:function(){var e=this;Object(l._185)(this.formSearch).then(function(t){console.log(t),200==t.data.code?(e.formData=t.data.data.records.filter(function(t){return t.gmtCreate&&(t.gmtCreate=e.$root.getDateArray(t.gmtCreate)[9]),t}),e.total=t.data.data.total,e.pages=t.data.pages):e.$message(t.data.msg)})},getInit:function(){var e=this;this.getlist(),this.gethouseLIst();Object(l._115)({name:"",status:1}).then(function(t){console.log(t),200==t.data.code&&(e.dataTree=t.data.data)});Object(l._191)({}).then(function(t){console.log(t),200==t.data.code&&(e.xqTree=t.data.data,0!=e.xqTree.length&&(e.formSearch.xqId=e.xqTree[0].id))})},addList:function(e){var t=this;this.$refs[e].validate(function(e){if(!e)return console.log("error submit!!"),!1;Object(l.x)(t.formPush).then(function(e){console.log(e),200==e.data.code?(t.$message({message:"添加成功",type:"success"}),t.getList()):t.$message("添加失败")}),t.addDialog=!1})},updateList:function(){var e=this;console.log(this.formUpdate),Object(l._180)(this.formUpdate).then(function(t){console.log(t),200==t.data.code&&(e.$message({message:"修改成功",type:"warning"}),e.getInit())}),this.updateDialog=!1},deleInfor:function(e){var t=this,a=[];e?a.push(e):0!=this.deleBatch.length&&this.deleBatch.filter(function(e){return a.push(e.id),e}),this.$confirm("确认删除吗？").then(function(e){Object(l._34)(a).then(function(e){console.log(e),200==e.data.code&&(t.$message("删除成功"),t.getInit())})}).catch(function(e){})},handleCurrentPage:function(e){this.formSearch.current=e,this.getInit()},checkTreeInfor:function(e,t){t.checkedKeys.length>1?this.$message("只能选择一个组织"):(this.formPush.orgId=t.checkedKeys[0],this.formUpdate.orgId=t.checkedKeys[0])},handleSelectionChange:function(e){this.deleBatch=e,console.log(this.deleBatch)},updateShowBox:function(e){this.formUpdate={addUser:e.addUser,address:e.address,houseId:e.houseId,getCall:e.getCall,email:e.email,age:e.age,name:e.name,idNumber:e.idNumber,id:e.id},this.updateDialog=!0,console.log(this.formUpdate)},zuzhiChange1:function(e){0!=e.length?(console.log(e),this.formSearch1.orgId=this.$refs.cascader1.getCheckedNodes()[0].data.id,this.formSearch.orgId=this.$refs.cascader1.getCheckedNodes()[0].data.id):(this.formSearch.orgId="",this.formSearch1.orgId=""),this.gethouseLIst(this.formSearch1)},handleChange:function(e){var t=this;0!=e.length?(console.log(e),this.formSearch1.orgId=this.$refs.cascader.getCheckedNodes()[0].data.id,this.formSearch.orgId=this.$refs.cascader.getCheckedNodes()[0].data.id):(this.formSearch.orgId="",this.formSearch1.orgId=""),Object(l._185)(this.formSearch).then(function(e){console.log(e),200==e.data.code?(t.formData=e.data.data.records.filter(function(e){return e.gmtCreate&&(e.gmtCreate=t.$root.getDateArray(e.gmtCreate)[9]),e}),t.total=e.data.data.total,t.pages=e.data.pages):t.$message(e.data.msg)})}},mounted:function(){this.getInit()},components:{paging:o.a}},s={render:function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("section",{staticClass:"modlude"},[a("el-form",{staticClass:"form_inline",attrs:{inline:!0,model:e.formSearch,"label-width":"80px"}},[a("el-form-item",{attrs:{label:"所属组织",size:"small"}},[a("el-cascader",{ref:"cascader",attrs:{options:e.dataTree,props:e.defaultProps2,clearable:""},on:{change:e.handleChange},model:{value:e.option1,callback:function(t){e.option1=t},expression:"option1"}})],1),e._v(" "),a("el-form-item",{attrs:{label:"房间名称",size:"small"}},[a("el-input",{attrs:{placeholder:"请输入房间名称"},model:{value:e.formSearch.houseName,callback:function(t){e.$set(e.formSearch,"houseName",t)},expression:"formSearch.houseName"}})],1),e._v(" "),a("el-form-item",{attrs:{label:"身份证",size:"small"}},[a("el-input",{attrs:{placeholder:"请输入身份证"},model:{value:e.formSearch.idNumber,callback:function(t){e.$set(e.formSearch,"idNumber",t)},expression:"formSearch.idNumber"}})],1),e._v(" "),a("el-form-item",{attrs:{label:"姓名",size:"small"}},[a("el-input",{attrs:{placeholder:"请输入姓名"},model:{value:e.formSearch.name,callback:function(t){e.$set(e.formSearch,"name",t)},expression:"formSearch.name"}})],1),e._v(" "),a("el-form-item",{attrs:{label:"选择小区",size:"small",prop:"xqId"}},[a("el-select",{attrs:{placeholder:"请选择小区"},on:{change:function(t){e.formSearch1.xqId=e.formSearch.xqId}},model:{value:e.formSearch.xqId,callback:function(t){e.$set(e.formSearch,"xqId",t)},expression:"formSearch.xqId"}},e._l(e.xqTree,function(e){return a("el-option",{key:e.id,attrs:{label:e.name,value:e.id}})}),1)],1),e._v(" "),a("el-form-item",{attrs:{label:"昵称",size:"small"}},[a("el-input",{attrs:{placeholder:"请输入昵称"},model:{value:e.formSearch.nickName,callback:function(t){e.$set(e.formSearch,"nickName",t)},expression:"formSearch.nickName"}})],1),e._v(" "),a("el-form-item",{attrs:{label:"手机号",size:"small"}},[a("el-input",{attrs:{placeholder:"请输入手机号"},model:{value:e.formSearch.phone,callback:function(t){e.$set(e.formSearch,"phone",t)},expression:"formSearch.phone"}})],1),e._v(" "),a("el-form-item",{attrs:{label:"区域名称",size:"small"}},[a("el-input",{attrs:{placeholder:"请输入区域名称"},model:{value:e.formSearch.sectionName,callback:function(t){e.$set(e.formSearch,"sectionName",t)},expression:"formSearch.sectionName"}})],1),e._v(" "),a("el-form-item",[a("el-button",{attrs:{size:"small"},on:{click:e.getInit}},[e._v("查 询")])],1),e._v(" "),a("el-form-item",[a("el-button",{attrs:{size:"small"},on:{click:function(t){e.addDialog=!0}}},[e._v("添 加")])],1),e._v(" "),a("el-form-item",[a("el-button",{attrs:{size:"small",type:"danger"},on:{click:function(t){return e.deleInfor(!1)}}},[e._v("批量删除")])],1)],1),e._v(" "),a("el-table",{staticStyle:{width:"100%"},attrs:{data:e.formData,stripe:""},on:{"selection-change":e.handleSelectionChange}},[a("el-table-column",{attrs:{type:"selection",width:"55"}}),e._v(" "),a("el-table-column",{attrs:{prop:"name",label:"成员名称"}}),e._v(" "),a("el-table-column",{attrs:{prop:"nickName",label:"昵称"}}),e._v(" "),a("el-table-column",{attrs:{prop:"ubicellJyh",label:"家园号"}}),e._v(" "),a("el-table-column",{attrs:{prop:"phone",label:"手机号"}}),e._v(" "),a("el-table-column",{attrs:{prop:"sectionName",label:"区域"}}),e._v(" "),a("el-table-column",{attrs:{prop:"xqName",label:"小区名称"}}),e._v(" "),a("el-table-column",{attrs:{prop:"houseName",label:"房间"}}),e._v(" "),a("el-table-column",{attrs:{label:"添加成员权限"},scopedSlots:e._u([{key:"default",fn:function(t){return[e._v("\n          "+e._s(1==t.row.addUser?"是":"否")+"\n\t\t\t\t")]}}])}),e._v(" "),a("el-table-column",{attrs:{label:"接听对讲权限"},scopedSlots:e._u([{key:"default",fn:function(t){return[e._v("\n          "+e._s(1==t.row.getCall?"是":"否")+"\n\t\t\t\t")]}}])}),e._v(" "),a("el-table-column",{attrs:{prop:"gmtCreate",label:"录入时间"}}),e._v(" "),a("el-table-column",{attrs:{label:"操作",fixed:"right",width:"250"},scopedSlots:e._u([{key:"default",fn:function(t){return[a("el-button",{attrs:{type:"warning",size:"small"},on:{click:function(a){return e.updateShowBox(t.row)}}},[e._v("修 改")]),e._v(" "),a("el-button",{attrs:{type:"danger",size:"small"},on:{click:function(a){return e.deleInfor(t.row.id)}}},[e._v("删 除")])]}}])})],1),e._v(" "),a("paging",{attrs:{"get-total":e.total},on:{changePage:e.handleCurrentPage}}),e._v(" "),a("el-dialog",{attrs:{title:"新增",visible:e.addDialog,"close-on-click-modal":!1},on:{"update:visible":function(t){e.addDialog=t}}},[a("div",{staticClass:"cont_box_left"},[a("el-form",{ref:"addList",attrs:{"label-position":"right","label-width":"100px",model:e.formPush,rules:e.rules}},[a("el-form-item",{attrs:{label:"姓名"}},[a("el-input",{model:{value:e.formPush.name,callback:function(t){e.$set(e.formPush,"name",t)},expression:"formPush.name"}})],1),e._v(" "),a("el-form-item",{attrs:{label:"手机号码",prop:"phone"}},[a("el-input",{on:{blur:function(t){return e.confirmPhone(e.formPush.phone)}},model:{value:e.formPush.phone,callback:function(t){e.$set(e.formPush,"phone",t)},expression:"formPush.phone"}})],1),e._v(" "),a("el-form-item",{attrs:{label:"身份证"}},[a("el-input",{model:{value:e.formPush.idNumber,callback:function(t){e.$set(e.formPush,"idNumber",t)},expression:"formPush.idNumber"}})],1),e._v(" "),a("el-form-item",{attrs:{label:"住址"}},[a("el-input",{model:{value:e.formPush.address,callback:function(t){e.$set(e.formPush,"address",t)},expression:"formPush.address"}})],1),e._v(" "),a("el-form-item",{attrs:{label:"邮箱"}},[a("el-input",{model:{value:e.formPush.email,callback:function(t){e.$set(e.formPush,"email",t)},expression:"formPush.email"}})],1),e._v(" "),a("el-form-item",{attrs:{label:"年龄"}},[a("el-input",{model:{value:e.formPush.age,callback:function(t){e.$set(e.formPush,"age",t)},expression:"formPush.age"}})],1),e._v(" "),a("el-form-item",{attrs:{label:"性别"}},[a("el-radio",{attrs:{label:1},model:{value:e.formPush.sex,callback:function(t){e.$set(e.formPush,"sex",t)},expression:"formPush.sex"}},[e._v("男")]),e._v(" "),a("el-radio",{attrs:{label:2},model:{value:e.formPush.sex,callback:function(t){e.$set(e.formPush,"sex",t)},expression:"formPush.sex"}},[e._v("女")]),e._v(" "),a("el-radio",{attrs:{label:3},model:{value:e.formPush.sex,callback:function(t){e.$set(e.formPush,"sex",t)},expression:"formPush.sex"}},[e._v("未知")])],1),e._v(" "),a("el-form-item",[a("el-form",{staticClass:"form_inline",attrs:{inline:!0,model:e.formSearch1}},[a("el-form-item",{attrs:{label:"所属组织",size:"small",prop:"orgId"}},[a("el-cascader",{ref:"cascader1",attrs:{options:e.dataTree,props:e.defaultProps2,clearable:""},on:{change:e.zuzhiChange1},model:{value:e.option1,callback:function(t){e.option1=t},expression:"option1"}})],1),e._v(" "),a("el-form-item",{attrs:{label:"选择小区",size:"small"}},[a("el-select",{attrs:{placeholder:"请选择小区",disabled:!e.formSearch1.orgId},on:{change:function(t){e.formSearch.xqId=e.formSearch1.xqId}},model:{value:e.formSearch1.xqId,callback:function(t){e.$set(e.formSearch1,"xqId",t)},expression:"formSearch1.xqId"}},e._l(e.xqTree,function(e){return a("el-option",{key:e.id,attrs:{label:e.name,value:e.id}})}),1)],1),e._v(" "),a("el-form-item",{attrs:{label:"房间类型",size:"small"}},[a("el-select",{attrs:{placeholder:"请选择房间类型"},model:{value:e.formSearch1.type,callback:function(t){e.$set(e.formSearch1,"type",t)},expression:"formSearch1.type"}},[a("el-option",{attrs:{label:"物业中心",value:1}}),e._v(" "),a("el-option",{attrs:{label:"业主房间",value:2}})],1)],1),e._v(" "),a("el-form-item",[a("el-button",{attrs:{size:"small"},on:{click:e.gethouseLIst}},[e._v("查 询")])],1)],1),e._v(" "),a("el-table",{staticStyle:{width:"100%"},attrs:{data:e.formData1}},[a("el-table-column",{attrs:{width:"25"},scopedSlots:e._u([{key:"default",fn:function(t){return[a("el-radio",{staticStyle:{color:"transparent"},attrs:{label:t.row.id},on:{change:function(a){e.isGetFather=!0,e.formPush.xqId=t.row.xqId}},model:{value:e.formPush.houseId,callback:function(t){e.$set(e.formPush,"houseId",t)},expression:"formPush.houseId"}})]}}])}),e._v(" "),a("el-table-column",{attrs:{prop:"name",label:"房间名称"}}),e._v(" "),a("el-table-column",{attrs:{prop:"houseNum",label:"房间号"}}),e._v(" "),a("el-table-column",{attrs:{prop:"sectionName",label:"区域名称"}})],1),e._v(" "),a("div",{staticClass:"pagination"},[a("el-pagination",{attrs:{layout:"prev, pager, next","prev-text":"上一页","next-text":"下一页","page-size":10,total:e.total1},on:{"current-change":e.handleCurrentPage1}})],1)],1)],1)],1),e._v(" "),a("div",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[a("el-button",{attrs:{size:"medium "},on:{click:function(t){e.addDialog=!1}}},[e._v("取 消")]),e._v(" "),a("el-button",{attrs:{size:"medium "},on:{click:function(t){return e.addList("addList")}}},[e._v("新 增")])],1)]),e._v(" "),a("el-dialog",{attrs:{title:"修改",visible:e.updateDialog,"close-on-click-modal":!1},on:{"update:visible":function(t){e.updateDialog=t}}},[a("div",{staticClass:"cont_box_left"},[a("el-form",{ref:"formUpdate",attrs:{"label-position":"right","label-width":"100px",model:e.formUpdate}},[a("el-form-item",{attrs:{label:"姓名"}},[a("el-input",{model:{value:e.formUpdate.name,callback:function(t){e.$set(e.formUpdate,"name",t)},expression:"formUpdate.name"}})],1),e._v(" "),a("el-form-item",{attrs:{label:"身份证"}},[a("el-input",{model:{value:e.formUpdate.idNumber,callback:function(t){e.$set(e.formUpdate,"idNumber",t)},expression:"formUpdate.idNumber"}})],1),e._v(" "),a("el-form-item",{attrs:{label:"住址"}},[a("el-input",{model:{value:e.formUpdate.address,callback:function(t){e.$set(e.formUpdate,"address",t)},expression:"formUpdate.address"}})],1),e._v(" "),a("el-form-item",{attrs:{label:"邮箱"}},[a("el-input",{model:{value:e.formUpdate.email,callback:function(t){e.$set(e.formUpdate,"email",t)},expression:"formUpdate.email"}})],1),e._v(" "),a("el-form-item",{attrs:{label:"年龄"}},[a("el-input",{model:{value:e.formUpdate.age,callback:function(t){e.$set(e.formUpdate,"age",t)},expression:"formUpdate.age"}})],1)],1)],1),e._v(" "),a("div",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[a("el-button",{attrs:{size:"medium"},on:{click:function(t){e.updateDialog=!1}}},[e._v("取 消")]),e._v(" "),a("el-button",{attrs:{size:"medium"},on:{click:e.updateList}},[e._v("确定")])],1)])],1)},staticRenderFns:[]};var n=a("VU/8")(r,s,!1,function(e){a("kvAK")},"data-v-c261be9e",null);t.default=n.exports},kvAK:function(e,t){}});
//# sourceMappingURL=24.1402b2d02b54da3ccfaf.js.map