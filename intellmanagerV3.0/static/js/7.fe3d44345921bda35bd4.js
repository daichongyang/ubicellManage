webpackJsonp([7],{EpOy:function(t,e,r){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var o=r("mvHQ"),a=r.n(o),i=r("RRo+"),s=r.n(i),n=r("prc4"),l=r("MJLE"),h=r.n(l),u=r("fl5R"),d=r("qKdJ"),c={data:function(){return{headers:{Authorization:sessionStorage.getItem("Authorization"),token:sessionStorage.getItem("token")},devListt:"",xqId:"",devList:[],pushSelect:0,checkStrictly:!1,bindRole:{},showmenuList:[],menuList:[],option1:[],xqTree:[],isAddorUpdate:1,formSearch:{current:1,size:10},formData:[],formUpdate:{},total:0,pages:0,addDialog:!1,updateDialog:!1,dialog:!1,formPush:{sumCount:0,floor:"",sex:1,type:2},dataTree:[],defaultProps:{children:"data",label:"name"},defaultProps2:{children:"children",label:"name",value:"id",expandTrigger:"hover",checkStrictly:!0},shouquan:{},rules:{devList:[{type:"array",required:!0,message:"该项不能为空",trigger:"change"}],phone:[{required:!0,message:"该项不能为空"}],xqId:[{required:!0,message:"该项不能为空",trigger:"blur"}],startTime:[{required:!0,message:"该项不能为空",trigger:"blur"}],endTime:[{required:!0,message:"该项不能为空",trigger:"blur"}],status:[{required:!0,message:"该项不能为空",trigger:"change"}],floor:[{validator:function(t,e,r){setTimeout(function(){s()(e)||r(new Error("请输入数字值"))},500)},trigger:"blur"}]},imageUrl:"",qrcode:null}},methods:{creatQrCode:function(t){if(this.qrcode)return this.qrcode.clear(),void this.qrcode.makeCode(t);this.qrcode=new h.a(this.$refs.qrCodeUrl,{text:t,width:200,height:200,colorDark:"#000000",colorLight:"#ffffff",correctLevel:h.a.CorrectLevel.H})},temporary:function(){var t=this;Object(d._149)(this.formPush).then(function(e){console.log(e),200==e.data.code?(t.$message({message:"授权成功",type:"success"}),t.shouquan=e.data.data,t.addDialog=!0,setTimeout(function(){t.creatQrCode(t.shouquan.pass)},1e3)):t.$message("授权失败:"+e.data.msg)})},nextt:function(){var t=this;this.updateDialog=!0,this.$nextTick(function(){t.xqId=t.formPush.xqId,t.devList=t.formPush.devList,console.log(t.formPush.devList)})},selected:function(t){var e=this;this.pushSelect=0,0!=t.length&&(this.devListt="",this.formPush.devList=[],t=t.filter(function(t){var r={devSn:t.devSn||"",devType:t.devType||"",doorkeySign:t.doorkeySign||"",id:t.id||"",name:t.name||"",ncuSn:t.ncuSn||"",viceDevice:t.viceDevice||""};return e.formPush.devList.push(r),e.devListt=e.devListt+t.name+"，",t}),this.devListt=this.devListt.substring(0,this.devListt.length-1)),console.log(t),this.updateDialog=!1},getlist:function(){var t=this;Object(d.B)(this.formSearch).then(function(e){console.log(e),200==e.data.code?(t.formData=e.data.data.records.filter(function(e){return e.gmtCreate&&(e.gmtCreate=t.$root.getDateArray(e.gmtCreate)[9]),e}),t.total=e.data.data.total):t.$message(e.data.msg)})},getInit:function(){var t=this;this.getlist(),Object(d._191)({}).then(function(e){console.log(e),200==e.data.code&&(t.xqTree=e.data.data,t.formPush.xqId=t.xqTree[0].id||"")});Object(d._115)({name:"",status:1}).then(function(e){console.log(e),200==e.data.code&&(t.dataTree=e.data.data)})},handleChange:function(t){0!=t.length?(console.log(t),this.formSearch.orgId=this.$refs.cascader.getCheckedNodes()[0].data.id):this.formSearch.orgId=""},handleChange1:function(t){0!=t.length?(console.log(t),this.formPush.orgId=this.$refs.cascader.getCheckedNodes()[0].data.id):this.formPush.orgId=""},addList:function(t){var e=this;this.$refs[t].validate(function(t){if(!t)return console.log("error submit!!"),!1;Object(d.z)(e.formPush).then(function(t){console.log(t),200==t.data.code?(e.getInit(),e.$message({message:"添加成功",type:"success"})):e.$message("添加失败:"+t.data.msg)}),e.addDialog=!1})},updateList:function(t){var e=this;this.$refs[t].validate(function(t){if(!t)return console.log("error submit!!"),!1;var r={avatar:e.formUpdate.avatar,email:e.formUpdate.email,id:e.formUpdate.id,mobile:e.formUpdate.mobile,name:e.formUpdate.name,nation:e.formUpdate.nation,sex:e.formUpdate.sex,status:e.formUpdate.status};Object(d.C)(r).then(function(t){console.log(t),200==t.data.code&&(e.$message({message:"修改成功",type:"warning"}),e.getInit())}),e.updateDialog=!1})},updateShowBox:function(t){this.formUpdate=JSON.parse(a()(t)),this.updateDialog=!0,this.imageUrl=t.avatar,console.log(this.formUpdate)},deleInfor:function(t){var e=this,r=[t];this.$confirm("确认删除吗？").then(function(t){Object(d.A)(r).then(function(t){console.log(t),200==t.data.code?(e.$message("删除成功"),e.getInit()):e.$message(t.data.msg)})}).catch(function(t){})},bindroleManage:function(){var t=this;Object(d.E)(this.bindRole).then(function(e){console.log(e),200==e.data.code?t.$message("绑定成功"):t.$message(e.data.msg),t.dialog=!1})},showRole:function(t){var e=this;this.dialog=!0,this.checkStrictly=!0,this.bindRole.managerId=t.id,Object(d._108)(t.id).then(function(t){console.log(t),200==t.data.code&&(e.showmenuList=t.data.data,e.$nextTick(function(){e.$refs.rightsTree.setCheckedKeys(e.showmenuList),e.checkStrictly=!1}))})},updataImg:function(t){1==t?this.$nextTick(function(){this.$refs.addUpdata.submit()}):this.$nextTick(function(){this.$refs.Updata.submit()})},handleAvatarSuccess:function(t,e){console.log(t,e),this.imageUrl=URL.createObjectURL(e.raw),200==t.code&&(this.formPush.avatar=t.data[0],this.addList("addList"))},onChange:function(t,e){console.log(t,e),this.imageUrl=URL.createObjectURL(t.raw)},handleCheckChange:function(t,e){console.log(e),this.bindRole.roleIds=this.$refs.rightsTree.getCheckedKeys().concat(this.$refs.rightsTree.getHalfCheckedKeys()),console.log(this.$refs.rightsTree.getCheckedKeys().concat(this.$refs.rightsTree.getHalfCheckedKeys()),"dfdff")},handleCurrentPage:function(t){this.formSearch.current=t,this.getList()}},mounted:function(){this.getInit()},components:{paging:n.a,acsdev:u.default}},f={render:function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("section",{staticClass:"modlude acsAuthTemp"},[r("el-form",{staticClass:"form_inline",attrs:{model:t.formPush,"label-width":"80px",rules:t.rules}},[r("el-form-item",{attrs:{label:"选择小区",size:"small",prop:"xqId"}},[r("el-select",{attrs:{placeholder:"请选择小区"},model:{value:t.formPush.xqId,callback:function(e){t.$set(t.formPush,"xqId",e)},expression:"formPush.xqId"}},t._l(t.xqTree,function(t){return r("el-option",{key:t.id,attrs:{label:t.name,value:t.id}})}),1)],1),t._v(" "),r("el-form-item",{attrs:{label:"姓名",size:"small",prop:"account"}},[r("el-input",{attrs:{placeholder:"请输入姓名"},model:{value:t.formPush.name,callback:function(e){t.$set(t.formPush,"name",e)},expression:"formPush.name"}})],1),t._v(" "),r("el-form-item",{attrs:{label:"手机号",size:"small",prop:"phone"}},[r("el-input",{attrs:{placeholder:"请输入手机号"},model:{value:t.formPush.phone,callback:function(e){t.$set(t.formPush,"phone",e)},expression:"formPush.phone"}})],1),t._v(" "),r("el-form-item",{attrs:{label:"身份证号",size:"small"}},[r("el-input",{attrs:{placeholder:"请输入身份证号"},model:{value:t.formPush.idNumber,callback:function(e){t.$set(t.formPush,"idNumber",e)},expression:"formPush.idNumber"}})],1),t._v(" "),r("el-form-item",{attrs:{label:"年龄",size:"small"}},[r("el-input",{attrs:{placeholder:"请输入年龄"},model:{value:t.formPush.age,callback:function(e){t.$set(t.formPush,"age",e)},expression:"formPush.age"}})],1),t._v(" "),r("el-form-item",{attrs:{label:"性别",size:"small"}},[r("el-radio",{attrs:{label:1},model:{value:t.formPush.sex,callback:function(e){t.$set(t.formPush,"sex",e)},expression:"formPush.sex"}},[t._v("男")]),t._v(" "),r("el-radio",{attrs:{label:2},model:{value:t.formPush.sex,callback:function(e){t.$set(t.formPush,"sex",e)},expression:"formPush.sex"}},[t._v("女")])],1),t._v(" "),r("el-form-item",{attrs:{label:"开始时间",size:"small",prop:"startTime"}},[r("el-date-picker",{attrs:{type:"datetime","value-format":"timestamp",placeholder:"开始时间"},model:{value:t.formPush.startTime,callback:function(e){t.$set(t.formPush,"startTime",e)},expression:"formPush.startTime"}})],1),t._v(" "),r("el-form-item",{attrs:{label:"结束时间",size:"small",prop:"endTime"}},[r("el-date-picker",{attrs:{type:"datetime","value-format":"timestamp",placeholder:"结束时间"},model:{value:t.formPush.endTime,callback:function(e){t.$set(t.formPush,"endTime",e)},expression:"formPush.endTime"}})],1),t._v(" "),r("el-form-item",{attrs:{label:"公司",size:"small"}},[r("el-input",{attrs:{placeholder:"请输入公司"},model:{value:t.formPush.company,callback:function(e){t.$set(t.formPush,"company",e)},expression:"formPush.company"}})],1),t._v(" "),r("el-form-item",{attrs:{label:"楼层",size:"small",prop:"floor"}},[r("el-input",{attrs:{placeholder:"请输入楼层"},model:{value:t.formPush.floor,callback:function(e){t.$set(t.formPush,"floor",t._n(e))},expression:"formPush.floor"}})],1),t._v(" "),r("el-form-item",{attrs:{label:"部门",size:"small"}},[r("el-input",{attrs:{placeholder:"请输入部门"},model:{value:t.formPush.department,callback:function(e){t.$set(t.formPush,"department",e)},expression:"formPush.department"}})],1),t._v(" "),r("el-form-item",{attrs:{label:"邮箱",size:"small"}},[r("el-input",{attrs:{placeholder:"请输入邮箱"},model:{value:t.formPush.email,callback:function(e){t.$set(t.formPush,"email",e)},expression:"formPush.email"}})],1),t._v(" "),r("el-form-item",{attrs:{label:"家庭住址",size:"small"}},[r("el-input",{attrs:{placeholder:"请输入家庭住址"},model:{value:t.formPush.address,callback:function(e){t.$set(t.formPush,"address",e)},expression:"formPush.address"}})],1),t._v(" "),r("el-form-item",{attrs:{label:"事由",size:"small"}},[r("el-input",{attrs:{placeholder:"请输入事由"},model:{value:t.formPush.remark,callback:function(e){t.$set(t.formPush,"remark",e)},expression:"formPush.remark"}})],1),t._v(" "),r("el-form-item",{attrs:{label:"使用次数",size:"small"}},[r("el-input",{attrs:{placeholder:"请输入使用次数"},model:{value:t.formPush.sumCount,callback:function(e){t.$set(t.formPush,"sumCount",e)},expression:"formPush.sumCount"}}),t._v(" "),r("span",[t._v("次数范围1~100(0表示不限制次数)")])],1),t._v(" "),r("el-form-item",{attrs:{label:"门禁设备",prop:"devList"}},[r("el-input",{staticStyle:{width:"250px"},attrs:{disabled:!0,type:"textarea",autosize:{minRows:2,maxRows:4},placeholder:""},model:{value:t.devListt,callback:function(e){t.devListt=e},expression:"devListt"}}),t._v(" "),r("el-button",{attrs:{size:"small"},on:{click:t.nextt}},[t._v("选 择")])],1),t._v(" "),r("el-form-item",[r("el-button",{attrs:{size:"medium "},on:{click:t.temporary}},[t._v("授 权")])],1)],1),t._v(" "),r("el-dialog",{attrs:{title:"临时二维码授权",visible:t.addDialog,"close-on-click-modal":!1},on:{"update:visible":function(e){t.addDialog=e}}},[r("div",{staticClass:"cont_box_right shouquan"},[r("div",[t._v("授权时间："+t._s(t.shouquan.operationTime))]),t._v(" "),r("div",[t._v("有效期："+t._s(t.shouquan.duration))]),t._v(" "),r("div",{staticStyle:{margin:"10px 0","text-align":"center"}},[r("div",{ref:"qrCodeUrl",staticClass:"qrcode"})]),t._v(" "),r("div",[t._v("权限："+t._s(t.shouquan.devList))])]),t._v(" "),r("div",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[r("el-button",{attrs:{size:"medium "},on:{click:function(e){t.addDialog=!1}}},[t._v("关 闭")])],1)]),t._v(" "),r("el-dialog",{attrs:{title:"选择设备",visible:t.updateDialog,"close-on-click-modal":!1},on:{"update:visible":function(e){t.updateDialog=e}}},[r("div",{staticClass:"cont_box_right"},[r("acsdev",{attrs:{"xq-id":t.xqId,"push-select":t.pushSelect,"huixian-select":t.devList},on:{selected:t.selected}})],1),t._v(" "),r("div",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[r("el-button",{attrs:{size:"medium"},on:{click:function(e){t.pushSelect=1,t.updateDialog=!1}}},[t._v("确 定")]),t._v(" "),r("el-button",{attrs:{size:"medium"},on:{click:function(e){t.updateDialog=!1}}},[t._v("取 消")])],1)])],1)},staticRenderFns:[]};var m=r("VU/8")(c,f,!1,function(t){r("fpEW")},"data-v-dafafd90",null);e.default=m.exports},MJLE:function(t,e,r){var o,a;a=function(){function t(t){this.mode=r.MODE_8BIT_BYTE,this.data=t,this.parsedData=[];for(var e=0,o=this.data.length;e<o;e++){var a=[],i=this.data.charCodeAt(e);i>65536?(a[0]=240|(1835008&i)>>>18,a[1]=128|(258048&i)>>>12,a[2]=128|(4032&i)>>>6,a[3]=128|63&i):i>2048?(a[0]=224|(61440&i)>>>12,a[1]=128|(4032&i)>>>6,a[2]=128|63&i):i>128?(a[0]=192|(1984&i)>>>6,a[1]=128|63&i):a[0]=i,this.parsedData.push(a)}this.parsedData=Array.prototype.concat.apply([],this.parsedData),this.parsedData.length!=this.data.length&&(this.parsedData.unshift(191),this.parsedData.unshift(187),this.parsedData.unshift(239))}function e(t,e){this.typeNumber=t,this.errorCorrectLevel=e,this.modules=null,this.moduleCount=0,this.dataCache=null,this.dataList=[]}t.prototype={getLength:function(t){return this.parsedData.length},write:function(t){for(var e=0,r=this.parsedData.length;e<r;e++)t.put(this.parsedData[e],8)}},e.prototype={addData:function(e){var r=new t(e);this.dataList.push(r),this.dataCache=null},isDark:function(t,e){if(t<0||this.moduleCount<=t||e<0||this.moduleCount<=e)throw new Error(t+","+e);return this.modules[t][e]},getModuleCount:function(){return this.moduleCount},make:function(){this.makeImpl(!1,this.getBestMaskPattern())},makeImpl:function(t,r){this.moduleCount=4*this.typeNumber+17,this.modules=new Array(this.moduleCount);for(var o=0;o<this.moduleCount;o++){this.modules[o]=new Array(this.moduleCount);for(var a=0;a<this.moduleCount;a++)this.modules[o][a]=null}this.setupPositionProbePattern(0,0),this.setupPositionProbePattern(this.moduleCount-7,0),this.setupPositionProbePattern(0,this.moduleCount-7),this.setupPositionAdjustPattern(),this.setupTimingPattern(),this.setupTypeInfo(t,r),this.typeNumber>=7&&this.setupTypeNumber(t),null==this.dataCache&&(this.dataCache=e.createData(this.typeNumber,this.errorCorrectLevel,this.dataList)),this.mapData(this.dataCache,r)},setupPositionProbePattern:function(t,e){for(var r=-1;r<=7;r++)if(!(t+r<=-1||this.moduleCount<=t+r))for(var o=-1;o<=7;o++)e+o<=-1||this.moduleCount<=e+o||(this.modules[t+r][e+o]=0<=r&&r<=6&&(0==o||6==o)||0<=o&&o<=6&&(0==r||6==r)||2<=r&&r<=4&&2<=o&&o<=4)},getBestMaskPattern:function(){for(var t=0,e=0,r=0;r<8;r++){this.makeImpl(!0,r);var o=f.getLostPoint(this);(0==r||t>o)&&(t=o,e=r)}return e},createMovieClip:function(t,e,r){var o=t.createEmptyMovieClip(e,r);this.make();for(var a=0;a<this.modules.length;a++)for(var i=1*a,s=0;s<this.modules[a].length;s++){var n=1*s;this.modules[a][s]&&(o.beginFill(0,100),o.moveTo(n,i),o.lineTo(n+1,i),o.lineTo(n+1,i+1),o.lineTo(n,i+1),o.endFill())}return o},setupTimingPattern:function(){for(var t=8;t<this.moduleCount-8;t++)null==this.modules[t][6]&&(this.modules[t][6]=t%2==0);for(var e=8;e<this.moduleCount-8;e++)null==this.modules[6][e]&&(this.modules[6][e]=e%2==0)},setupPositionAdjustPattern:function(){for(var t=f.getPatternPosition(this.typeNumber),e=0;e<t.length;e++)for(var r=0;r<t.length;r++){var o=t[e],a=t[r];if(null==this.modules[o][a])for(var i=-2;i<=2;i++)for(var s=-2;s<=2;s++)this.modules[o+i][a+s]=-2==i||2==i||-2==s||2==s||0==i&&0==s}},setupTypeNumber:function(t){for(var e=f.getBCHTypeNumber(this.typeNumber),r=0;r<18;r++){var o=!t&&1==(e>>r&1);this.modules[Math.floor(r/3)][r%3+this.moduleCount-8-3]=o}for(r=0;r<18;r++){o=!t&&1==(e>>r&1);this.modules[r%3+this.moduleCount-8-3][Math.floor(r/3)]=o}},setupTypeInfo:function(t,e){for(var r=this.errorCorrectLevel<<3|e,o=f.getBCHTypeInfo(r),a=0;a<15;a++){var i=!t&&1==(o>>a&1);a<6?this.modules[a][8]=i:a<8?this.modules[a+1][8]=i:this.modules[this.moduleCount-15+a][8]=i}for(a=0;a<15;a++){i=!t&&1==(o>>a&1);a<8?this.modules[8][this.moduleCount-a-1]=i:a<9?this.modules[8][15-a-1+1]=i:this.modules[8][15-a-1]=i}this.modules[this.moduleCount-8][8]=!t},mapData:function(t,e){for(var r=-1,o=this.moduleCount-1,a=7,i=0,s=this.moduleCount-1;s>0;s-=2)for(6==s&&s--;;){for(var n=0;n<2;n++)if(null==this.modules[o][s-n]){var l=!1;i<t.length&&(l=1==(t[i]>>>a&1)),f.getMask(e,o,s-n)&&(l=!l),this.modules[o][s-n]=l,-1==--a&&(i++,a=7)}if((o+=r)<0||this.moduleCount<=o){o-=r,r=-r;break}}}},e.PAD0=236,e.PAD1=17,e.createData=function(t,r,o){for(var a=v.getRSBlocks(t,r),i=new _,s=0;s<o.length;s++){var n=o[s];i.put(n.mode,4),i.put(n.getLength(),f.getLengthInBits(n.mode,t)),n.write(i)}var l=0;for(s=0;s<a.length;s++)l+=a[s].dataCount;if(i.getLengthInBits()>8*l)throw new Error("code length overflow. ("+i.getLengthInBits()+">"+8*l+")");for(i.getLengthInBits()+4<=8*l&&i.put(0,4);i.getLengthInBits()%8!=0;)i.putBit(!1);for(;!(i.getLengthInBits()>=8*l||(i.put(e.PAD0,8),i.getLengthInBits()>=8*l));)i.put(e.PAD1,8);return e.createBytes(i,a)},e.createBytes=function(t,e){for(var r=0,o=0,a=0,i=new Array(e.length),s=new Array(e.length),n=0;n<e.length;n++){var l=e[n].dataCount,h=e[n].totalCount-l;o=Math.max(o,l),a=Math.max(a,h),i[n]=new Array(l);for(var u=0;u<i[n].length;u++)i[n][u]=255&t.buffer[u+r];r+=l;var d=f.getErrorCorrectPolynomial(h),c=new p(i[n],d.getLength()-1).mod(d);s[n]=new Array(d.getLength()-1);for(u=0;u<s[n].length;u++){var m=u+c.getLength()-s[n].length;s[n][u]=m>=0?c.get(m):0}}var g=0;for(u=0;u<e.length;u++)g+=e[u].totalCount;var v=new Array(g),_=0;for(u=0;u<o;u++)for(n=0;n<e.length;n++)u<i[n].length&&(v[_++]=i[n][u]);for(u=0;u<a;u++)for(n=0;n<e.length;n++)u<s[n].length&&(v[_++]=s[n][u]);return v};for(var r={MODE_NUMBER:1,MODE_ALPHA_NUM:2,MODE_8BIT_BYTE:4,MODE_KANJI:8},a={L:1,M:0,Q:3,H:2},i=0,s=1,n=2,l=3,h=4,u=5,d=6,c=7,f={PATTERN_POSITION_TABLE:[[],[6,18],[6,22],[6,26],[6,30],[6,34],[6,22,38],[6,24,42],[6,26,46],[6,28,50],[6,30,54],[6,32,58],[6,34,62],[6,26,46,66],[6,26,48,70],[6,26,50,74],[6,30,54,78],[6,30,56,82],[6,30,58,86],[6,34,62,90],[6,28,50,72,94],[6,26,50,74,98],[6,30,54,78,102],[6,28,54,80,106],[6,32,58,84,110],[6,30,58,86,114],[6,34,62,90,118],[6,26,50,74,98,122],[6,30,54,78,102,126],[6,26,52,78,104,130],[6,30,56,82,108,134],[6,34,60,86,112,138],[6,30,58,86,114,142],[6,34,62,90,118,146],[6,30,54,78,102,126,150],[6,24,50,76,102,128,154],[6,28,54,80,106,132,158],[6,32,58,84,110,136,162],[6,26,54,82,110,138,166],[6,30,58,86,114,142,170]],G15:1335,G18:7973,G15_MASK:21522,getBCHTypeInfo:function(t){for(var e=t<<10;f.getBCHDigit(e)-f.getBCHDigit(f.G15)>=0;)e^=f.G15<<f.getBCHDigit(e)-f.getBCHDigit(f.G15);return(t<<10|e)^f.G15_MASK},getBCHTypeNumber:function(t){for(var e=t<<12;f.getBCHDigit(e)-f.getBCHDigit(f.G18)>=0;)e^=f.G18<<f.getBCHDigit(e)-f.getBCHDigit(f.G18);return t<<12|e},getBCHDigit:function(t){for(var e=0;0!=t;)e++,t>>>=1;return e},getPatternPosition:function(t){return f.PATTERN_POSITION_TABLE[t-1]},getMask:function(t,e,r){switch(t){case i:return(e+r)%2==0;case s:return e%2==0;case n:return r%3==0;case l:return(e+r)%3==0;case h:return(Math.floor(e/2)+Math.floor(r/3))%2==0;case u:return e*r%2+e*r%3==0;case d:return(e*r%2+e*r%3)%2==0;case c:return(e*r%3+(e+r)%2)%2==0;default:throw new Error("bad maskPattern:"+t)}},getErrorCorrectPolynomial:function(t){for(var e=new p([1],0),r=0;r<t;r++)e=e.multiply(new p([1,m.gexp(r)],0));return e},getLengthInBits:function(t,e){if(1<=e&&e<10)switch(t){case r.MODE_NUMBER:return 10;case r.MODE_ALPHA_NUM:return 9;case r.MODE_8BIT_BYTE:case r.MODE_KANJI:return 8;default:throw new Error("mode:"+t)}else if(e<27)switch(t){case r.MODE_NUMBER:return 12;case r.MODE_ALPHA_NUM:return 11;case r.MODE_8BIT_BYTE:return 16;case r.MODE_KANJI:return 10;default:throw new Error("mode:"+t)}else{if(!(e<41))throw new Error("type:"+e);switch(t){case r.MODE_NUMBER:return 14;case r.MODE_ALPHA_NUM:return 13;case r.MODE_8BIT_BYTE:return 16;case r.MODE_KANJI:return 12;default:throw new Error("mode:"+t)}}},getLostPoint:function(t){for(var e=t.getModuleCount(),r=0,o=0;o<e;o++)for(var a=0;a<e;a++){for(var i=0,s=t.isDark(o,a),n=-1;n<=1;n++)if(!(o+n<0||e<=o+n))for(var l=-1;l<=1;l++)a+l<0||e<=a+l||0==n&&0==l||s==t.isDark(o+n,a+l)&&i++;i>5&&(r+=3+i-5)}for(o=0;o<e-1;o++)for(a=0;a<e-1;a++){var h=0;t.isDark(o,a)&&h++,t.isDark(o+1,a)&&h++,t.isDark(o,a+1)&&h++,t.isDark(o+1,a+1)&&h++,0!=h&&4!=h||(r+=3)}for(o=0;o<e;o++)for(a=0;a<e-6;a++)t.isDark(o,a)&&!t.isDark(o,a+1)&&t.isDark(o,a+2)&&t.isDark(o,a+3)&&t.isDark(o,a+4)&&!t.isDark(o,a+5)&&t.isDark(o,a+6)&&(r+=40);for(a=0;a<e;a++)for(o=0;o<e-6;o++)t.isDark(o,a)&&!t.isDark(o+1,a)&&t.isDark(o+2,a)&&t.isDark(o+3,a)&&t.isDark(o+4,a)&&!t.isDark(o+5,a)&&t.isDark(o+6,a)&&(r+=40);var u=0;for(a=0;a<e;a++)for(o=0;o<e;o++)t.isDark(o,a)&&u++;return r+=10*(Math.abs(100*u/e/e-50)/5)}},m={glog:function(t){if(t<1)throw new Error("glog("+t+")");return m.LOG_TABLE[t]},gexp:function(t){for(;t<0;)t+=255;for(;t>=256;)t-=255;return m.EXP_TABLE[t]},EXP_TABLE:new Array(256),LOG_TABLE:new Array(256)},g=0;g<8;g++)m.EXP_TABLE[g]=1<<g;for(g=8;g<256;g++)m.EXP_TABLE[g]=m.EXP_TABLE[g-4]^m.EXP_TABLE[g-5]^m.EXP_TABLE[g-6]^m.EXP_TABLE[g-8];for(g=0;g<255;g++)m.LOG_TABLE[m.EXP_TABLE[g]]=g;function p(t,e){if(void 0==t.length)throw new Error(t.length+"/"+e);for(var r=0;r<t.length&&0==t[r];)r++;this.num=new Array(t.length-r+e);for(var o=0;o<t.length-r;o++)this.num[o]=t[o+r]}function v(t,e){this.totalCount=t,this.dataCount=e}function _(){this.buffer=[],this.length=0}p.prototype={get:function(t){return this.num[t]},getLength:function(){return this.num.length},multiply:function(t){for(var e=new Array(this.getLength()+t.getLength()-1),r=0;r<this.getLength();r++)for(var o=0;o<t.getLength();o++)e[r+o]^=m.gexp(m.glog(this.get(r))+m.glog(t.get(o)));return new p(e,0)},mod:function(t){if(this.getLength()-t.getLength()<0)return this;for(var e=m.glog(this.get(0))-m.glog(t.get(0)),r=new Array(this.getLength()),o=0;o<this.getLength();o++)r[o]=this.get(o);for(o=0;o<t.getLength();o++)r[o]^=m.gexp(m.glog(t.get(o))+e);return new p(r,0).mod(t)}},v.RS_BLOCK_TABLE=[[1,26,19],[1,26,16],[1,26,13],[1,26,9],[1,44,34],[1,44,28],[1,44,22],[1,44,16],[1,70,55],[1,70,44],[2,35,17],[2,35,13],[1,100,80],[2,50,32],[2,50,24],[4,25,9],[1,134,108],[2,67,43],[2,33,15,2,34,16],[2,33,11,2,34,12],[2,86,68],[4,43,27],[4,43,19],[4,43,15],[2,98,78],[4,49,31],[2,32,14,4,33,15],[4,39,13,1,40,14],[2,121,97],[2,60,38,2,61,39],[4,40,18,2,41,19],[4,40,14,2,41,15],[2,146,116],[3,58,36,2,59,37],[4,36,16,4,37,17],[4,36,12,4,37,13],[2,86,68,2,87,69],[4,69,43,1,70,44],[6,43,19,2,44,20],[6,43,15,2,44,16],[4,101,81],[1,80,50,4,81,51],[4,50,22,4,51,23],[3,36,12,8,37,13],[2,116,92,2,117,93],[6,58,36,2,59,37],[4,46,20,6,47,21],[7,42,14,4,43,15],[4,133,107],[8,59,37,1,60,38],[8,44,20,4,45,21],[12,33,11,4,34,12],[3,145,115,1,146,116],[4,64,40,5,65,41],[11,36,16,5,37,17],[11,36,12,5,37,13],[5,109,87,1,110,88],[5,65,41,5,66,42],[5,54,24,7,55,25],[11,36,12],[5,122,98,1,123,99],[7,73,45,3,74,46],[15,43,19,2,44,20],[3,45,15,13,46,16],[1,135,107,5,136,108],[10,74,46,1,75,47],[1,50,22,15,51,23],[2,42,14,17,43,15],[5,150,120,1,151,121],[9,69,43,4,70,44],[17,50,22,1,51,23],[2,42,14,19,43,15],[3,141,113,4,142,114],[3,70,44,11,71,45],[17,47,21,4,48,22],[9,39,13,16,40,14],[3,135,107,5,136,108],[3,67,41,13,68,42],[15,54,24,5,55,25],[15,43,15,10,44,16],[4,144,116,4,145,117],[17,68,42],[17,50,22,6,51,23],[19,46,16,6,47,17],[2,139,111,7,140,112],[17,74,46],[7,54,24,16,55,25],[34,37,13],[4,151,121,5,152,122],[4,75,47,14,76,48],[11,54,24,14,55,25],[16,45,15,14,46,16],[6,147,117,4,148,118],[6,73,45,14,74,46],[11,54,24,16,55,25],[30,46,16,2,47,17],[8,132,106,4,133,107],[8,75,47,13,76,48],[7,54,24,22,55,25],[22,45,15,13,46,16],[10,142,114,2,143,115],[19,74,46,4,75,47],[28,50,22,6,51,23],[33,46,16,4,47,17],[8,152,122,4,153,123],[22,73,45,3,74,46],[8,53,23,26,54,24],[12,45,15,28,46,16],[3,147,117,10,148,118],[3,73,45,23,74,46],[4,54,24,31,55,25],[11,45,15,31,46,16],[7,146,116,7,147,117],[21,73,45,7,74,46],[1,53,23,37,54,24],[19,45,15,26,46,16],[5,145,115,10,146,116],[19,75,47,10,76,48],[15,54,24,25,55,25],[23,45,15,25,46,16],[13,145,115,3,146,116],[2,74,46,29,75,47],[42,54,24,1,55,25],[23,45,15,28,46,16],[17,145,115],[10,74,46,23,75,47],[10,54,24,35,55,25],[19,45,15,35,46,16],[17,145,115,1,146,116],[14,74,46,21,75,47],[29,54,24,19,55,25],[11,45,15,46,46,16],[13,145,115,6,146,116],[14,74,46,23,75,47],[44,54,24,7,55,25],[59,46,16,1,47,17],[12,151,121,7,152,122],[12,75,47,26,76,48],[39,54,24,14,55,25],[22,45,15,41,46,16],[6,151,121,14,152,122],[6,75,47,34,76,48],[46,54,24,10,55,25],[2,45,15,64,46,16],[17,152,122,4,153,123],[29,74,46,14,75,47],[49,54,24,10,55,25],[24,45,15,46,46,16],[4,152,122,18,153,123],[13,74,46,32,75,47],[48,54,24,14,55,25],[42,45,15,32,46,16],[20,147,117,4,148,118],[40,75,47,7,76,48],[43,54,24,22,55,25],[10,45,15,67,46,16],[19,148,118,6,149,119],[18,75,47,31,76,48],[34,54,24,34,55,25],[20,45,15,61,46,16]],v.getRSBlocks=function(t,e){var r=v.getRsBlockTable(t,e);if(void 0==r)throw new Error("bad rs block @ typeNumber:"+t+"/errorCorrectLevel:"+e);for(var o=r.length/3,a=[],i=0;i<o;i++)for(var s=r[3*i+0],n=r[3*i+1],l=r[3*i+2],h=0;h<s;h++)a.push(new v(n,l));return a},v.getRsBlockTable=function(t,e){switch(e){case a.L:return v.RS_BLOCK_TABLE[4*(t-1)+0];case a.M:return v.RS_BLOCK_TABLE[4*(t-1)+1];case a.Q:return v.RS_BLOCK_TABLE[4*(t-1)+2];case a.H:return v.RS_BLOCK_TABLE[4*(t-1)+3];default:return}},_.prototype={get:function(t){var e=Math.floor(t/8);return 1==(this.buffer[e]>>>7-t%8&1)},put:function(t,e){for(var r=0;r<e;r++)this.putBit(1==(t>>>e-r-1&1))},getLengthInBits:function(){return this.length},putBit:function(t){var e=Math.floor(this.length/8);this.buffer.length<=e&&this.buffer.push(0),t&&(this.buffer[e]|=128>>>this.length%8),this.length++}};var b=[[17,14,11,7],[32,26,20,14],[53,42,32,24],[78,62,46,34],[106,84,60,44],[134,106,74,58],[154,122,86,64],[192,152,108,84],[230,180,130,98],[271,213,151,119],[321,251,177,137],[367,287,203,155],[425,331,241,177],[458,362,258,194],[520,412,292,220],[586,450,322,250],[644,504,364,280],[718,560,394,310],[792,624,442,338],[858,666,482,382],[929,711,509,403],[1003,779,565,439],[1091,857,611,461],[1171,911,661,511],[1273,997,715,535],[1367,1059,751,593],[1465,1125,805,625],[1528,1190,868,658],[1628,1264,908,698],[1732,1370,982,742],[1840,1452,1030,790],[1952,1538,1112,842],[2068,1628,1168,898],[2188,1722,1228,958],[2303,1809,1283,983],[2431,1911,1351,1051],[2563,1989,1423,1093],[2699,2099,1499,1139],[2809,2213,1579,1219],[2953,2331,1663,1273]];function C(){var t=!1,e=navigator.userAgent;if(/android/i.test(e)){t=!0;var r=e.toString().match(/android ([0-9]\.[0-9])/i);r&&r[1]&&(t=parseFloat(r[1]))}return t}var P=function(){var t=function(t,e){this._el=t,this._htOption=e};return t.prototype.draw=function(t){var e=this._htOption,r=this._el,o=t.getModuleCount();Math.floor(e.width/o),Math.floor(e.height/o);function a(t,e){var r=document.createElementNS("http://www.w3.org/2000/svg",t);for(var o in e)e.hasOwnProperty(o)&&r.setAttribute(o,e[o]);return r}this.clear();var i=a("svg",{viewBox:"0 0 "+String(o)+" "+String(o),width:"100%",height:"100%",fill:e.colorLight});i.setAttributeNS("http://www.w3.org/2000/xmlns/","xmlns:xlink","http://www.w3.org/1999/xlink"),r.appendChild(i),i.appendChild(a("rect",{fill:e.colorLight,width:"100%",height:"100%"})),i.appendChild(a("rect",{fill:e.colorDark,width:"1",height:"1",id:"template"}));for(var s=0;s<o;s++)for(var n=0;n<o;n++)if(t.isDark(s,n)){var l=a("use",{x:String(n),y:String(s)});l.setAttributeNS("http://www.w3.org/1999/xlink","href","#template"),i.appendChild(l)}},t.prototype.clear=function(){for(;this._el.hasChildNodes();)this._el.removeChild(this._el.lastChild)},t}(),k="svg"===document.documentElement.tagName.toLowerCase()?P:"undefined"==typeof CanvasRenderingContext2D?function(){var t=function(t,e){this._el=t,this._htOption=e};return t.prototype.draw=function(t){for(var e=this._htOption,r=this._el,o=t.getModuleCount(),a=Math.floor(e.width/o),i=Math.floor(e.height/o),s=['<table style="border:0;border-collapse:collapse;">'],n=0;n<o;n++){s.push("<tr>");for(var l=0;l<o;l++)s.push('<td style="border:0;border-collapse:collapse;padding:0;margin:0;width:'+a+"px;height:"+i+"px;background-color:"+(t.isDark(n,l)?e.colorDark:e.colorLight)+';"></td>');s.push("</tr>")}s.push("</table>"),r.innerHTML=s.join("");var h=r.childNodes[0],u=(e.width-h.offsetWidth)/2,d=(e.height-h.offsetHeight)/2;u>0&&d>0&&(h.style.margin=d+"px "+u+"px")},t.prototype.clear=function(){this._el.innerHTML=""},t}():function(){function t(){this._elImage.src=this._elCanvas.toDataURL("image/png"),this._elImage.style.display="block",this._elCanvas.style.display="none"}if(this._android&&this._android<=2.1){var e=1/window.devicePixelRatio,r=CanvasRenderingContext2D.prototype.drawImage;CanvasRenderingContext2D.prototype.drawImage=function(t,o,a,i,s,n,l,h,u){if("nodeName"in t&&/img/i.test(t.nodeName))for(var d=arguments.length-1;d>=1;d--)arguments[d]=arguments[d]*e;else void 0===h&&(arguments[1]*=e,arguments[2]*=e,arguments[3]*=e,arguments[4]*=e);r.apply(this,arguments)}}var o=function(t,e){this._bIsPainted=!1,this._android=C(),this._htOption=e,this._elCanvas=document.createElement("canvas"),this._elCanvas.width=e.width,this._elCanvas.height=e.height,t.appendChild(this._elCanvas),this._el=t,this._oContext=this._elCanvas.getContext("2d"),this._bIsPainted=!1,this._elImage=document.createElement("img"),this._elImage.alt="Scan me!",this._elImage.style.display="none",this._el.appendChild(this._elImage),this._bSupportDataURI=null};return o.prototype.draw=function(t){var e=this._elImage,r=this._oContext,o=this._htOption,a=t.getModuleCount(),i=o.width/a,s=o.height/a,n=Math.round(i),l=Math.round(s);e.style.display="none",this.clear();for(var h=0;h<a;h++)for(var u=0;u<a;u++){var d=t.isDark(h,u),c=u*i,f=h*s;r.strokeStyle=d?o.colorDark:o.colorLight,r.lineWidth=1,r.fillStyle=d?o.colorDark:o.colorLight,r.fillRect(c,f,i,s),r.strokeRect(Math.floor(c)+.5,Math.floor(f)+.5,n,l),r.strokeRect(Math.ceil(c)-.5,Math.ceil(f)-.5,n,l)}this._bIsPainted=!0},o.prototype.makeImage=function(){this._bIsPainted&&function(t,e){var r=this;if(r._fFail=e,r._fSuccess=t,null===r._bSupportDataURI){var o=document.createElement("img"),a=function(){r._bSupportDataURI=!1,r._fFail&&r._fFail.call(r)};return o.onabort=a,o.onerror=a,o.onload=function(){r._bSupportDataURI=!0,r._fSuccess&&r._fSuccess.call(r)},void(o.src="data:image/gif;base64,iVBORw0KGgoAAAANSUhEUgAAAAUAAAAFCAYAAACNbyblAAAAHElEQVQI12P4//8/w38GIAXDIBKE0DHxgljNBAAO9TXL0Y4OHwAAAABJRU5ErkJggg==")}!0===r._bSupportDataURI&&r._fSuccess?r._fSuccess.call(r):!1===r._bSupportDataURI&&r._fFail&&r._fFail.call(r)}.call(this,t)},o.prototype.isPainted=function(){return this._bIsPainted},o.prototype.clear=function(){this._oContext.clearRect(0,0,this._elCanvas.width,this._elCanvas.height),this._bIsPainted=!1},o.prototype.round=function(t){return t?Math.floor(1e3*t)/1e3:t},o}();function L(t,e){for(var r=1,o=function(t){var e=encodeURI(t).toString().replace(/\%[0-9a-fA-F]{2}/g,"a");return e.length+(e.length!=t?3:0)}(t),i=0,s=b.length;i<=s;i++){var n=0;switch(e){case a.L:n=b[i][0];break;case a.M:n=b[i][1];break;case a.Q:n=b[i][2];break;case a.H:n=b[i][3]}if(o<=n)break;r++}if(r>b.length)throw new Error("Too long data");return r}return(o=function(t,e){if(this._htOption={width:256,height:256,typeNumber:4,colorDark:"#000000",colorLight:"#ffffff",correctLevel:a.H},"string"==typeof e&&(e={text:e}),e)for(var r in e)this._htOption[r]=e[r];"string"==typeof t&&(t=document.getElementById(t)),this._htOption.useSVG&&(k=P),this._android=C(),this._el=t,this._oQRCode=null,this._oDrawing=new k(this._el,this._htOption),this._htOption.text&&this.makeCode(this._htOption.text)}).prototype.makeCode=function(t){this._oQRCode=new e(L(t,this._htOption.correctLevel),this._htOption.correctLevel),this._oQRCode.addData(t),this._oQRCode.make(),this._el.title=t,this._oDrawing.draw(this._oQRCode),this.makeImage()},o.prototype.makeImage=function(){"function"==typeof this._oDrawing.makeImage&&(!this._android||this._android>=3)&&this._oDrawing.makeImage()},o.prototype.clear=function(){this._oDrawing.clear()},o.CorrectLevel=a,o},t.exports=a()},fpEW:function(t,e){}});
//# sourceMappingURL=7.fe3d44345921bda35bd4.js.map