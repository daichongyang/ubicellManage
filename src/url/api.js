import axios from 'axios';

let config = {
    headers: { 'Content-Type': 'multipart/form-data' }
}
let config1 = {
    transformRequest: [function(params) { //表单提交配置
        // Do whatever you want to transform the data
        let ret = ''
        for (let it in params) {
            ret += encodeURIComponent(it) + '=' + encodeURIComponent(params[it]) + '&'
        }
        return ret
    }],
    headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
    }
}
const instance = axios.create({
        withCredentials: true
    })
    // 图片上传
export const uploadToRealPath = "/intellmanagerV3.0/upload/uploadfile"
    // export const uploadToRealPath = (params) => { return instance.post(`/intellmanagerV3.0/upload/uploadfile`, params, config) }

export const login = (params) => { return axios.post('/intellmanagerV3.0/anno/token', params) } //获取认证token
export const sysLogList = (params) => { return axios.post('/intellmanagerV3.0/log/list/sys/page', params) } //查询系统日志分页列表
export const menuList = (params) => { return axios.post('/intellmanagerV3.0/menu/tree', params) } //查询系统所有的菜单

export const orgTree = (params) => { return axios.post('/intellmanagerV3.0/org/tree', params) } //查询所有组织列表
export const saveTree = (params) => { return axios.post('/intellmanagerV3.0/org/tree/save', params) } //添加组织树
export const updateTree = (params) => { return axios.post('/intellmanagerV3.0/org/tree/update', params) } //修改组织树
export const deleteTree = (params) => { return axios.post('/intellmanagerV3.0/org/tree/delete', params) } //删除组织

export const xqList = (params) => { return axios.post('/intellmanagerV3.0/xq/list/page', params) } //查询小区分页列表
export const xqAddList = (params) => { return axios.post('/intellmanagerV3.0/xq/add', params) } //添加新小区
export const xqDeleteList = (params) => { return axios.post('/intellmanagerV3.0/xq/delete', params) } //删除小区操作
export const xqUpdateList = (params) => { return axios.post('/intellmanagerV3.0/xq/update', params) } //修改小区信息
export const xqSelectList = (params) => { return axios.post('/intellmanagerV3.0/xq/list/select', params) } //查询小区列表

export const sectionList = (params) => { return axios.post('/intellmanagerV3.0/section/list/page', params) } //查询区域分页列表
export const sectionAddList = (params) => { return axios.post('/intellmanagerV3.0/section/add', params) } //添加区域
export const sectionDeleteList = (params) => { return axios.post('/intellmanagerV3.0/section/delete', params) } //删除区域
export const sectionUpdateList = (params) => { return axios.post('/intellmanagerV3.0/section/update', params) } //修改区域

export const houseaddList = (params) => { return axios.post('/intellmanagerV3.0/house/add', params) } //添加房间
export const housedeleteList = (params) => { return axios.post('/intellmanagerV3.0/house/delete', params) } //删除房间
export const houseList = (params) => { return axios.post('/intellmanagerV3.0/house/list/page', params) } //查询房间分页列表
export const houseupdateList = (params) => { return axios.post('/intellmanagerV3.0/house/update', params) } //修改房间

export const advertAddlist = (params) => { return axios.post('/intellmanagerV3.0/advert/advchant/addlist', params) } //添加广告信息
export const advertDeletelist = (params) => { return axios.post('/intellmanagerV3.0/advert/advchant/deletelist', params) } //删除广告信息
export const advertUpdatelist = (params) => { return axios.post('/intellmanagerV3.0/advert/advchant/updatelist', params) } //修改广告信息
export const advertList = (params) => { return axios.post('/intellmanagerV3.0/advert/advchant/list', params) } //获取所有广告（后台）

export const recommendList = (params) => { return axios.post('/intellmanagerV3.0/recommend/shop/getRecommend/ShopData', params) } //查询推荐商家列表
export const recommendaddList = (params) => { return axios.post('/intellmanagerV3.0/recommend/shop/getRecommend/add', params) } //添加推荐商家
export const recommenddeleteList = (params) => { return axios.post('/intellmanagerV3.0/recommend/shop/getRecommend/delete', params) } //删除推荐商家信息
export const recommendupdaList = (params) => { return axios.post('/intellmanagerV3.0/recommend/shop/getRecommend/upda', params) } //修改推荐商家

export const getAcDevlist = (params) => { return axios.post('/intellmanagerV3.0/door/getAcDevlist', params) } //门禁设备查询
export const addAcDevlist = (params) => { return axios.post('/intellmanagerV3.0/door/addAcDevlist', params) } //门禁设备添加
export const delAcDevlist = (params) => { return axios.post('/intellmanagerV3.0/door/delAcDevlist', params) } //删除门禁设备
export const updateDoorDev = (params) => { return axios.post('/intellmanagerV3.0/door/updateDoorDev', params) } //更新设备信息
export const getAllDevSetting = (params) => { return axios.post('/intellmanagerV3.0/door/getAllDevSetting/' + params.xqId) } //获取所有门禁设备类型
export const getDevSetting = (params) => { return axios.post('/intellmanagerV3.0/door/getDevSetting/' + params.xqId) } //获取已勾选的门禁设备类型
export const editDevSetting = (params) => { return axios.post('/intellmanagerV3.0/door/editDevSetting', params) } //勾选or取消勾选门禁设备类型

export const adduserhouselist = (params) => { return axios.post('/intellmanagerV3.0/house/user/add', params) } //添加房间用户
export const deleteuserhouselist = (params) => { return axios.post('/intellmanagerV3.0/house/user/delete', params) } //删除房间单个用户
export const userhouselist = (params) => { return axios.post('/intellmanagerV3.0/house/user/list/owner/page', params) } //查询房间业主/成员分页列表
export const updateuserhouselist = (params) => { return axios.post('/intellmanagerV3.0/house/user/update', params) } //修改房间用户

export const getHwDevs = (params) => { return axios.post('/intellmanagerV3.0/door/getHwDevs/' + params.xqId) } //获取霍尼门禁列表
export const openHwDev = (params) => { return axios.post('/intellmanagerV3.0/door/openHwDev/' + params.account + "/" + params.xqId + "/" + params.id + "/" + params.name) } //霍尼门禁远程开门
export const remoteOpenDoor = (params) => { return axios.post('/intellmanagerV3.0/door/remoteOpenDoor/' + params.account + "/" + params.devId) } //v远程开门
export const getAcDoorOperLog = (params) => { return axios.post('/intellmanagerV3.0/door/getAcDoorOperLog', params) } //门禁日志查询
export const getStDevs = (params) => { return axios.post('/intellmanagerV3.0/door/getStDevs', params) } //获取商汤人脸机列表
export const freshHwLevels = (params) => { return axios.post('/intellmanagerV3.0/door/freshHwLevels/' + params) } //刷新霍尼门禁权限列表

export const getGatewaySetting = (params) => { return axios.post('/intellmanagerV3.0/cloudCall/getGatewaySetting', params) } //获取voip线路
export const addGatewaySetting = (params) => { return axios.post('/intellmanagerV3.0/cloudCall/addGatewaySetting', params) } //增加voip线路
export const delGatewaySetting = (params) => { return axios.post('/intellmanagerV3.0/cloudCall/delGatewaySetting/' + params) } //删除voip线路
export const setHouseCallNum = (params) => { return axios.post('/intellmanagerV3.0/cloudCall/setHouseCallNum/' + params) } //一键配置对讲号
export const updateCallState = (params) => { return axios.post('/intellmanagerV3.0/cloudCall/updateCallState/' + params.id + '/' + params.callState) } //启用/停用区域对讲号
export const updateHouseCallState = (params) => { return axios.post('/intellmanagerV3.0/cloudCall/updateHouseCallState/' + params.id + '/' + params.callState) } //启用/停用房间对讲号
export const updateSectionNo = (params) => { return axios.post('/intellmanagerV3.0/cloudCall/updateSectionNo/' + params.id + '/' + params.sectionNo) } //配置区域代号
export const setOneHouseCallNum = (params) => { return axios.post('/intellmanagerV3.0/cloudCall/setOneHouseCallNum/' + params.id + '/' + params.callNum) } //配置房间对讲号
export const callHistory = (params) => { return axios.post('/intellmanagerV3.0/cloudCall/callHistory', params) } //对讲日志
export const getSectionHouseList = (params) => { return axios.post('/intellmanagerV3.0/cloudCall/getSectionHouseList', params) } //对讲获取区域/房间列表

export const authAddManager = (params) => { return axios.post('/intellmanagerV3.0/auth/manager/add', params) } //添加管理员
export const authDeleteManager = (params) => { return axios.post('/intellmanagerV3.0auth/manager/delete', params) } //删除管理员
export const authManagerList = (params) => { return axios.post('/intellmanagerV3.0/auth/manager/list/page', params) } //查询管理员分页列表
export const authUpdateManager = (params) => { return axios.post('/intellmanagerV3.0/auth/manager/update', params) } //修改管理员信息

export const getIntercomOpenLog = (params) => { return axios.post('/intellmanagerV3.0/interocm/getIntercomOpenLog', params) } //传统开门日志
export const getIntercomEmgLog = (params) => { return axios.post('/intellmanagerV3.0/interocm/getIntercomEmgLog', params) } //传统报警日志
export const getIntercomCallHistory = (params) => { return axios.post('/intellmanagerV3.0/interocm/getIntercomCallHistory', params) } //传统对讲日志
export const getIntercomDevSipInfo = (params) => { return axios.post('/intellmanagerV3.0/interocm/getIntercomDevSipInfo', params) } //传统-主机/媒体实时状态
export const getIntercomSipInfo = (params) => { return axios.post('/intellmanagerV3.0/interocm/getIntercomSipInfo', params) } //传统--媒体服务器账号
export const getIntercomDevInfo = (params) => { return axios.post('/intellmanagerV3.0/interocm/getIntercomDevInfo', params) } //传统-主机账号
export const updateIntercomDevInfo = (params) => { return axios.post('/intellmanagerV3.0/interocm/updateIntercomDevInfo/' + params.id + '/' + params.mainphoneIp + '/' + params.transferIp + '/' + params.isEnable) } //传统-修改主机账号

export const getSiphostInfoList = (params) => { return axios.post('/intellmanagerV3.0/interocm/getSiphostInfo', params) } //传统对讲获取媒体服务器参数
export const addSiphostInfo = (params) => { return axios.post('/intellmanagerV3.0/interocm/addSiphostInfo', params) } //传统对讲新增媒体服务器参数
export const updateSiphostInfo = (params) => { return axios.post('/intellmanagerV3.0/interocm/updateSiphostInfo', params) } //传统对讲修改媒体服务器参数
export const delSiphostInfo = (params) => { return axios.post('/intellmanagerV3.0/interocm/delSiphostInfo/' + params.id) } //传统对讲删除媒体服务器参数

export const roletreeList = (managerId) => { return axios.post('/intellmanagerV3.0/role/tree') } //查询系统角色树状列表
export const addroletreeList = (params) => { return axios.post('/intellmanagerV3.0/role/add', params) } //添加角色
export const updateroletreeList = (params) => { return axios.post('/intellmanagerV3.0/role/update', params) } //修改角色信息
export const deleteroletreeList = (params) => { return axios.post('/intellmanagerV3.0/role/delete', params) } //删除角色
export const bindmenu = (params) => { return axios.post('/intellmanagerV3.0/role/bind/menu', params) } //角色绑定菜单
export const bindmenuroleId = (roleId) => { return axios.post('/intellmanagerV3.0/role/menu/' + roleId) } //管理员角色回显
export const managerrole = (managerId) => { return axios.post('/intellmanagerV3.0/auth/manager/role/' + managerId) } //角色菜单回显
export const bindmanagerrole = (params) => { return axios.post('/intellmanagerV3.0/auth/manager/bind/role', params) } //管理员绑定角色

export const getHardwareDevice = (params) => { return axios.post('/intellmanagerV3.0/iot/getHardwareDevice', params) } //获取iot网关列表
export const addHardwareDevice = (params) => { return axios.post('/intellmanagerV3.0/iot/addHardwareDevice', params) } //增加iot网关
export const updateHardwareDevice = (params) => { return axios.post('/intellmanagerV3.0/iot/updateHardwareDevice', params) } //更新iot网关
export const delHardwareDevice = (idStr) => { return axios.post('/intellmanagerV3.0/iot/delHardwareDevice/' + idStr[0]) } //删除iot网关

export const getProjectParam = (params) => { return axios.post('/intellmanagerV3.0/iot/getProjectParam', params) } //获取iot网关工程参数列表
export const updateProjectParam = (params) => { return axios.post('/intellmanagerV3.0/iot/updateProjectParam', params) } //更新iot网关工程参数
export const addProjectParam = (params) => { return axios.post('/intellmanagerV3.0/iot/addProjectParam', params) } //增加iot网关工程参数
export const delProjectParam = (idStr) => { return axios.post('/intellmanagerV3.0/iot/delProjectParam/' + idStr[0]) } //删除iot网关工程参数

export const getHdlGlobalParam = (params) => { return axios.post('/intellmanagerV3.0/iot/getHdlGlobalParam', params) } //获取hdl全局参数
export const addHdlGlobalParam = (params) => { return axios.post('/intellmanagerV3.0/iot/addHdlGlobalParam', params) } //增加hdl全局参数
export const updateHdlGlobalParam = (params) => { return axios.post('/intellmanagerV3.0/iot/updateHdlGlobalParam', params) } //更新hdl全局参数
export const delHdlGlobalParam = (idStr) => { return axios.post('/intellmanagerV3.0/iot/delHdlGlobalParam/' + idStr[0]) } //删除hdl全局参数

export const getIotDetailData = (params) => { return axios.post('/intellmanagerV3.0/iot/getIotDetailData/' + params.mainId + '/' + params.mainType) } //获取智能家庭数据
export const getOnePasscardDetail = (params) => { return axios.post('/intellmanagerV3.0/housePasscard/getOnePasscardDetail/' + params.passcardId) } //获取单个用户通行证数据
export const getHousePasscard = (params) => { return axios.post('/intellmanagerV3.0/housePasscard/getHousePasscard/' + params.houseId) } //获取某个房间通行证数据
export const housePasscardGetSectionHouse = (params) => { return axios.post('/intellmanagerV3.0/housePasscard/getSectionHouse', params) } //获取区域/房间
export const getAcPasscardUsers = (params) => { return axios.post('/intellmanagerV3.0/housePasscard/getAcPasscardUsers', params) } //获取业主成员列表
export const updateSectionHousePasscard = (params) => { return axios.post('/intellmanagerV3.0/housePasscard/updateSectionHousePasscard', params) } //统一修改多个区域/多个房间通行证/多个用户通行证

export const exportTemplateHouse = '/intellmanagerV3.0/export/template/house' //导出房间模板
    // export const exportTemplateHouse = (params) => { return axios.post('/intellmanagerV3.0/export/template/house', params) } //导出房间模板
export const exportHouse = (params) => { return axios.post('/intellmanagerV3.0/export/house', params) } //导出房间信息
export const importHouse = (params) => { return axios.post('/intellmanagerV3.0/import/house/' + params.xqId + '/' + params.houseType) } //导入房间信息
export const importUser = (params) => { return axios.post('/intellmanagerV3.0/import/user/' + params.xqId + '/' + params.userType) } //导入业主物业用户模板
    // export const exportUser = (params) => { return axios.post('/intellmanagerV3.0/export/template/user', params) } //导出业主/成员模板
export const exportUser = '/intellmanagerV3.0/export/template/user' //导出业主/成员模板

export const temporaryPasscard = (params) => { return axios.post('/intellmanagerV3.0/housePasscard/temporaryPasscard', params) } //临时授权/实体卡授权
export const restoreUsersPasscard = (params) => { return axios.post('/intellmanagerV3.0/housePasscard/restoreUsersPasscard', params) } //一键还原用户通行证
export const recallCard = (params) => { return axios.post('/intellmanagerV3.0/housePasscard/recallCard', params) } //回收卡片数据
export const getCardPasscardDetail = (params) => { return axios.post('/intellmanagerV3.0/housePasscard/getCardPasscardDetail', params) } //获取卡片通行证数据
export const showPasscardRecords = (params) => { return axios.post('/intellmanagerV3.0/housePasscard/showPasscardRecords', params) } //用户通行证/临时授权/实体卡授权记录查询
export const blackWhiteCards = (params) => { return axios.post('/intellmanagerV3.0/housePasscard/blackWhiteRecallCards', params) } //白名单/黑名单/回收操作
export const getCodeSection = (params) => { return axios.post('/intellmanagerV3.0/housePasscard/getCodeSection/' + params.xqId) } //获取发卡秘钥，扇区

export const getPropertyTypeList = (params) => { return axios.post('/intellmanagerV3.0/pmapply/type/pmtype/getPropertyTypeList', params) } //查询物业类型管理
export const addPropertyTypeList = (params) => { return axios.post('/intellmanagerV3.0/pmapply/type/pmtype/addPropertyTypeList', params) } //添加物业类型管理
export const updatePropertyTypeList = (params) => { return axios.post('/intellmanagerV3.0/pmapply/type/pmtype/updatePropertyTypeList', params) } //修改物业类型管理
export const deletePropertyTypeList = (params) => { return axios.post('/intellmanagerV3.0/pmapply/type/pmtype/deletePropertyTypeList', params) } //删除物业类型管理

export const getmaintenanceMan = (params) => { return axios.post('/intellmanagerV3.0/pmapply/type/pmtype/getmaintenanceMan', params) } //查询所有维修人员
export const addMaintenanceMan = (params) => { return axios.post('/intellmanagerV3.0/pmapply/type/pmtype/addMaintenanceMan', params) } //添加维修人员
export const updataModifyMaintenanceManById = (params) => { return axios.post('/intellmanagerV3.0/pmapply/type/pmtype/modifyMaintenanceManById', params) } //修改维修人员管理
export const delMaintenanceMan = (params) => { return axios.post('/intellmanagerV3.0/pmapply/type/pmtype/delMaintenanceMan', params) } //   (传id和角色类型 0:管家 1:维修人员)
export const pmtypePhone = (params) => { return axios.post('/intellmanagerV3.0/pmapply/type/pmtype/phone', params) } //校验手机号是否注册

export const getRepairData = (params) => { return axios.post('/intellmanagerV3.0/PmRepair/info/pmtype/repairData', params) } //查询保修
export const getgetnamr = (params) => { return axios.post('/intellmanagerV3.0/pmapply/type/pmtype/getnamr', params) } //获取物业类型名称
export const getupdatedata = (params) => { return axios.post('/intellmanagerV3.0/PmRepair/info/pmtype/getupdatedata', params) } //确定完成
export const pmtypeUpdaData = (params) => { return axios.post('/intellmanagerV3.0/PmRepair/info/pmtype/updaData', params) } //确派单派维修人员定完成
export const delRepairComment = (params) => { return axios.post('/intellmanagerV3.0/PmRepair/info/pmtype/delRepairComment', params) } //删除评论（operType=1）或者删除评论和评分（operType=2）
export const getPropertyLog = (params) => { return axios.post('/intellmanagerV3.0/PmRepair/info/pmtype/getPropertyLog', params) } //物业查询日志

export const addPropertyTypeList1 = (params) => { return axios.post('/intellmanagerV3.0/pmOnlineApply/pmOnlineApply/addPropertyTypeList', params) } //添加公共设备类型
export const getOnlineApplyData = (params) => { return axios.post('/intellmanagerV3.0/pmOnlineApply/pmOnlineApply/getOnlineApplyData', params) } //添加公共设备类型
export const updaAppylById = (params) => { return axios.post('/intellmanagerV3.0/pmOnlineApply/pmOnlineApply/updaAppylById', params) } //修改公共设备类型
export const delAppylById = (params) => { return axios.post('/intellmanagerV3.0/pmOnlineApply/pmOnlineApply/delAppylById', params) } //删除公共设备类型
export const checkApplyInfo = (params) => { return axios.post('/intellmanagerV3.0/pmOnlineApply/pmOnlineApply/checkApplyInfo', params) } //判断status是否为0,0:未审核 1;通过 2;未通过

export const getwuyeApplyData = (params) => { return axios.post('/intellmanagerV3.0/pmOnlineApply/pmOnlineApply/getwuyeApplyData', params) } //家庭事务列表
export const checkHouseWork = (params) => { return axios.post('/intellmanagerV3.0/pmOnlineApply/pmOnlineApply/checkHouseWork', params) } //审核家庭事务管理（传id（数组多个）和status状态 0:未审核 1:已审核 2:审核不通过 不能空
export const propertyType = (params) => { return axios.post('/intellmanagerV3.0/pmapply/type/pmtype/propertyType', params) } //家庭事务类型

export const getAdviceData = (params) => { return axios.post('/intellmanagerV3.0/pmOnlineApply/pmOnlineApply/getAdviceData', params) } //查询投诉建议内容
export const addReply = (params) => { return axios.post('/intellmanagerV3.0/pmOnlineApply/pmOnlineApply/addReply', params) } //统一回复投诉建议里面的回复（传id（数组多个）和reply回复内容 不能空）

export const merchantList = (params) => { return axios.post('/intellmanagerV3.0/shop/info/merchant/list', params) } // 查询商家信息管理列表
export const addshopinfo = (params) => { return axios.post('/intellmanagerV3.0/shop/info/merchant/addshopinfo', params) } // 添加商家信息
export const deleteMerchantList = (params) => { return axios.post('/intellmanagerV3.0/shop/info/merchant/delete', params) } // 删除商家信息
export const updateMerchantList = (params) => { return axios.post('/intellmanagerV3.0/shop/info/merchant/update', params) } // 修改商家信息(还需要传一个 id)
export const getlishopinfo = (params) => { return axios.post('/intellmanagerV3.0/shop/info/merchant/getlishopinfo', params) } // 查询所有的商家类型
export const updshopinfo = (params) => { return axios.post('/intellmanagerV3.0/shop/info/merchant/updshopinfo', params) } // 在线生活商家管理修改商家状态(营业/停业)

export const ShopDataList = (params) => { return axios.post('/intellmanagerV3.0/shop/info/getRecommend/ShopData', params) } // 获取推荐商家信息
export const addrecommList = (params) => { return axios.post('/intellmanagerV3.0/shop/info/getRecommend/addrecomm', params) } // 添加推荐商家
export const updatecommendList = (params) => { return axios.post('/intellmanagerV3.0/shop/info/getRecommend/updatecommend', params) } // 修改推荐商家
export const deleteRecommend = (params) => { return axios.post('/intellmanagerV3.0/shop/info/getRecommend/delete', params) } // 删除推荐商家信息
export const getgenreid = (params) => { return axios.post('/intellmanagerV3.0/shop/info/merchant/getgenreid', params) } // 查询商家名称（genreId字段）
export const shopgetdeaie = (params) => { return axios.post('/intellmanagerV3.0/shop/info/getRecommend/shopgetdeaie', params) } // 获取推荐商家信息查看详情

export const advchantList = (params) => { return axios.post('/intellmanagerV3.0/shop/info/advchant/list', params) } // 获取所欲广告（后台）
export const addAdvchantList = (params) => { return axios.post('/intellmanagerV3.0/shop/info/advchant/addlist', params) } // 添加广告信息
export const deleteAdvchantList = (params) => { return axios.post('/intellmanagerV3.0/shop/info/advchant/deletelist', params) } // 删除广告信息
export const updateAdvchantList = (params) => { return axios.post('/intellmanagerV3.0/shop/info/advchant/updatelist', params) } // 修改广告信息

export const shopgoodsList = (params) => { return axios.post('/intellmanagerV3.0/shop/info/shopgoods/list', params) } // 在线生活小计速冻查询商品列表
export const addShopgoodsList = (params) => { return axios.post('/intellmanagerV3.0/shop/info/shopgoods/addlist', params) } // 在线生活小计速冻添加商品列表
export const updateShopgoodsList = (params) => { return axios.post('/intellmanagerV3.0/shop/info/shopgoods/updalist', params) } // 在线生活小计速冻修改商品列表（还需要传一个
export const deleletShopgoodsList = (params) => { return axios.post('/intellmanagerV3.0/shop/info/shopgoods/updadelelst', params) } // 删除小件速冻的商品管理

export const getsmallSmaItempress = (params) => { return axios.post('/intellmanagerV3.0/shop/info/SmaItempress/getsmall', params) } // 查询小件速冻里面速递单管理
export const updexpressinfo = (params) => { return axios.post('/intellmanagerV3.0/shop/info/SmaItempress/updexpressinfo', params) } // 在线生活接单或完成小件速递单操作(接单/完成)

export const houellList = (params) => { return axios.post('/intellmanagerV3.0/house/sell//Houell/list', params) } // 房屋租售（后台）
export const houelldelectlist = (params) => { return axios.post('/intellmanagerV3.0/house/sell/Houell/delectlist', params) } // 房屋租售（后台）
export const shenheHouell = (params) => { return axios.post('/intellmanagerV3.0/house/sell/Houell/updatelist', params) } // 修改审核状态
export const pinglunHouell = (params) => { return axios.post('/intellmanagerV3.0/house/sell/comment/houselist', params) } // 房屋租售（后台）在线生活查看评论
export const dianzanHouell = (params) => { return axios.post('/intellmanagerV3.0/house/sell/Houell/listaddst', params) } // 社区动态-用户点赞查看（后台）
export const deletePinglunHouell = (params) => { return axios.post('/intellmanagerV3.0/house/sell/comment/delete', params) } // 房屋租售（后台）在线生活删除动态评论

export const craftsmanList = (params) => { return axios.post('/intellmanagerV3.0/craftsman/info/Houell/getlist', params) } // 获取能工巧匠里面查询全部
export const shengeCraftsman = (params) => { return axios.post('/intellmanagerV3.0/craftsman/info/Houell/updatelist', params) } // 能工巧匠-信息管理-审核状态
export const deleteCraftsman = (params) => { return axios.post('/intellmanagerV3.0/craftsman/info/craftsmanInfo/delete', params) } // 能工巧匠-信息管理-审核状态
export const pinglunCraftsman = (params) => { return axios.post('/intellmanagerV3.0/craftsman/info/craftsman/list', params) } // 在线生活能工巧匠查询查看评论
export const deletepinglunCraftsman = (params) => { return axios.post('/intellmanagerV3.0/craftsman/info/comment/delete', params) } // 在线生活能工巧匠删除评论
export const praisecraftsman = (params) => { return axios.post('/intellmanagerV3.0/craftsman/info/praise/list', params) } // 管理员获取用户动态对应点赞信息 能工巧匠-用户点赞

export const shoptypeList = (params) => { return axios.post('/intellmanagerV3.0/shop/type/shoptype/list', params) } // 查询家政服务管理
export const addShoptype = (params) => { return axios.post('/intellmanagerV3.0/shop/type/shoptype/addshopinfo', params) } // 家政服务管理添加家政
export const updateShoptype = (params) => { return axios.post('/intellmanagerV3.0/shop/type/shoptype/update', params) } // 家政服务管理修改(还需传值一个id)
export const deleteShoptype = (params) => { return axios.post('/intellmanagerV3.0/shop/type/shoptype/delete', params) } // 删除家政细分管理

export const shopMessageList = (params) => { return axios.post('/intellmanagerV3.0/shop/type/shopMessage/getlist', params) } // 查询留言信息
export const deleteShopMessage = (params) => { return axios.post('/intellmanagerV3.0/shop/type/shopMessage/delete', params) } // 删除留言信息

export const getMessage = (params) => { return axios.post('/intellmanagerV3.0/Message/getMessage', params) } // 获取通知列表
export const addMessage = (params) => { return axios.post('/intellmanagerV3.0/Message/addMessage', params) } // 发送或保存通知
export const editMessage = (params) => { return axios.post('/intellmanagerV3.0/Message/editMessage', params) } // 编辑通知(status=2的才可编辑)
export const delMessage = (params) => { return axios.post('/intellmanagerV3.0/Message/delMessage', params) } // 删除通知(status=2的才可删除)
export const getAllHouseUser = (params) => { return axios.post('/intellmanagerV3.0/Message/getAllHouseUser', params) } // 发送通知时获取所有区域、房间、人员。设备则只选择devType=3 或者 5的门口机设备
export const recallMessage = (params) => { return axios.post('/intellmanagerV3.0/Message/recallMessage/' + params) } // 撤回已发出的通知(status=1的可以撤回)
export const sendMessage = (params) => { return axios.post('/intellmanagerV3.0/Message/sendMessage/' + params) } // 立即发送已保存的通知(即status=2的可以立即发送)
export const getOneHouseUser = (params) => { return axios.post('/intellmanagerV3.0/Message/getOneHouseUser/' + params) } // 获取单个房间的用户列表

export const getVillageAD = (params) => { return axios.post('/intellmanagerV3.0/Message/getVillageAD', params) } // 获取小区广告
export const saveVillage = (params) => { return axios.post('/intellmanagerV3.0/Message/saveVillage', params) } // 发送小区广告
export const deleteVillage = (params) => { return axios.post('/intellmanagerV3.0/Message/deleteVillage/' + params) } // 删除小区广告，通过id

export const toTenementAD = (params) => { return axios.post('/intellmanagerV3.0/Message/toTenementAD', params) } // 获取物业app广告
export const updatePicture = (params) => { return axios.post('/intellmanagerV3.0/Message/updatePicture', params) } // 更新物业app广告

export const carInfo = (params) => { return axios.post('/intellmanagerV3.0/app/park/carInfo', params) } // 查询车辆信息列表
export const delCar = (params) => { return axios.post('/intellmanagerV3.0/app/park/delCar', params) } // 删除车辆信息

export const carParkSummaryData = (params) => { return axios.post('/intellmanagerV3.0/ketopCar/carParkSummaryData', params) } // 停车场车位统计
export const carParkSummaryInfo = (params) => { return axios.post('/intellmanagerV3.0/ketopCar/carParkSummaryInfo', params) } // 停车场各车场详情
export const carParkRecords = (params) => { return axios.post('/intellmanagerV3.0/ketopCar/carParkRecords', params) } // 停车记录
export const carParkRecordsFee = (params) => { return axios.post('/intellmanagerV3.0/ketopCar/carParkRecordsFee', params) } // 停车记录对应的停车费金额

export const getParkInfo = (params) => { return axios.post('/intellmanagerV3.0/dnakeCar/getParkInfo', params) } // 停车场信息
export const parkingSpaceInfo = (params) => { return axios.post('/intellmanagerV3.0/dnakeCar/parkingSpaceInfo', params) } // 查询停车场车位信息
export const carRecords = (params) => { return axios.post('/intellmanagerV3.0/dnakeCar/carRecords', params) } // 查询停车场车辆记录
export const onlinePayRecords = (params) => { return axios.post('/intellmanagerV3.0/dnakeCar/onlinePayRecords', params) } // 线上缴费查询
export const onlinePayRecordsSum = (params) => { return axios.post('/intellmanagerV3.0/dnakeCar/onlinePayRecordsSum', params) } // 线上缴费统计
export const visitorBookRecords = (params) => { return axios.post('/intellmanagerV3.0/dnakeCar/visitorBookRecords', params) } // 访客预约记录
export const visitorAdd = (params) => { return axios.post('/intellmanagerV3.0/dnakeCar/visitorAdd', params) } // 访客预约
export const visitorDel = (params) => { return axios.post('/intellmanagerV3.0/dnakeCar/visitorDel/' + params.cph + "/" + params.xqId) } // 访客取消
export const getCarMonthFee = (params) => { return axios.post('/intellmanagerV3.0/dnakeCar/getCarMonthFee/' + params.xqid) } // 获取月租费
export const addMonthFee = (params) => { return axios.post('/intellmanagerV3.0/dnakeCar/addMonthFee', params) } // 添加月租费
export const updateMonthFee = (params) => { return axios.post('/intellmanagerV3.0/dnakeCar/updateMonthFee', params) } // 月租车月费用编辑

export const ysUserList = (params) => { return axios.post('/intellmanagerV3.0/ys/user/list', params) } // 获取用户信息，查看设备信息
export const ysaccountList = (params) => { return axios.post('/intellmanagerV3.0/ys/account/get', params) } // 获取用户对应的设备信息
export const ysalarmpushList = (params) => { return axios.post('/intellmanagerV3.0/ys/alarm/push/list', params) } // 获取推送记录
export const deleteysalarmpush = (params) => { return axios.post('/intellmanagerV3.0/ys/alarm/push/delete/' + params.idStr) } // 移除记录
export const yslocaldeviceList = (params) => { return axios.post('/intellmanagerV3.0/ys/local/device/list', params) } // 获取本地设备信息
export const ysdeviceList = (params) => { return axios.post('/intellmanagerV3.0/ys/device/list', params) } // 获取萤石设备列表
export const ysadddevice = (params) => { return axios.post('/intellmanagerV3.0/ys/device/add', params) } // 管理员添加设备
export const ysdeletedevice = (params) => { return axios.post('/intellmanagerV3.0/ys/manager/delete/' + params.arrDevice) } // 管理员删除设备
export const ysaupdatedevice = (params) => { return axios.post('/intellmanagerV3.0/ys/device/name/update', params, config1) } // 设备名称修改

export const iotUpLoadJsonFile = (params) => { return axios.post('/intellmanagerV3.0/iot/upLoadJsonFile', params) } // 上传工程配置文件并解析存储(mainId 区域或房间id, mainType 1区域2房间)
export const delProjectConfig = (params) => { return axios.post('/intellmanagerV3.0/iot/delProjectConfig/' + params.projectConfigId) } // 删除工程配置(mainId 区域或房间id, mainType 1区域2房间)
export const pushThisConfig = (params) => { return axios.post('/intellmanagerV3.0/iot/pushThisConfig/' + params.configId) } // 推送更新至用户
export const setNameToEntity = (params) => { return axios.post('/intellmanagerV3.0/iot/setNameToEntity', params) } // 设置iot中设备/房间的名称
export const delDeviceOne = (params) => { return axios.post('/intellmanagerV3.0/iot/delDevice/' + params.typeCode + "/" + params.id) } // 删除单个设备
export const delModule = (params) => { return axios.post('/intellmanagerV3.0/iot/delModule/' + params.roomId + "/" + params.typeCode) } // 删除房间module
export const bindUserForConfig = (params) => { return axios.post('/intellmanagerV3.0/iot/bindUserForConfig', params) } // 添加用户
export const toSelectUsers = (params) => { return axios.post('/intellmanagerV3.0/iot/toSelectUsers', params) } // 获取可选用户