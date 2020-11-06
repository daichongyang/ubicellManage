import Vue from 'vue'
import Router from 'vue-router'
// import HelloWorld from '@/components/HelloWorld'
const login = () =>
    import ('@/components/login');
const home = () =>
    import ('@/components/home');
const index = () =>
    import ('@/components/index');
const formApart = () =>
    import ('@/components/form_apart');
const img_receipt_print = () =>
    import ('@/components/img_receipt_print');
// 用户中心
const manager_org = () =>
    import ('@/components/manager/manager_org');
const manager_station = () =>
    import ('@/components/manager/manager_station');
const manager_manager = () =>
    import ('@/components/manager/manager_manager');
// 右侧下拉部分
const personalCenter = () =>
    import ('@/components/extraOptions/personalCenter');
const messageCenter = () =>
    import ('@/components/extraOptions/messageCenter');
const middleMoudle = () =>
    import ('@/components/extraOptions/middleMoudle');
const payConfiguration = () =>
    import ('@/components/extraOptions/payConfiguration');
const zhbb = () =>
    import ('@/components/extraOptions/zhbb');
const dbsx = () =>
    import ('@/components/extraOptions/dbsx');
const dcjl = () =>
    import ('@/components/extraOptions/dcjl');
const xtrz = () =>
    import ('@/components/extraOptions/xtrz');
const common_config = () =>
    import ('@/components/extraOptions/common_config');
const zhangdan_config = () =>
    import ('@/components/extraOptions/zhangdan_config');

const houseUserLogList = () =>
    import ('@/components/extraOptions/houseUserLogList');
// 收费管理
const charging_config_price = () =>
    import ('@/components/shoufeiManage/charging_config_price');
const gudinfeiyon_config = () =>
    import ('@/components/shoufeiManage/gudinfeiyon_config');
const charging_bill = () =>
    import ('@/components/shoufeiManage/charging_bill');
const charging_meter_reading = () =>
    import ('@/components/shoufeiManage/charging_meter_reading');
// 系统配置
const sys_log = () =>
    import ('@/components/sysManage/sys_log');
const sys_role = () =>
    import ('@/components/sysManage/sys_role');
const sys_manager = () =>
    import ('@/components/sysManage/sys_manager');

// 基础配置
const xq_info = () =>
    import ('@/components/configuration/xq_info');
const base_section = () =>
    import ('@/components/configuration/base_section');
const base_house = () =>
    import ('@/components/configuration/base_house');
// 在线生活
// const online_merchat = () =>
//     import ('@/components/onlineLife/online_merchat');
// const online_shop_info = () =>
//     import ('@/components/onlineLife/online_shop_info');
// const online_shop_intrdouce = () =>
//     import ('@/components/onlineLife/online_shop_intrdouce');
// const online_shop_advert = () =>
//     import ('@/components/onlineLife/online_shop_advert');

// 云门禁
const acs_dev1 = () =>
    import ('@/components/yunmenjin/acs_dev1');
const acs_dev = () =>
    import ('@/components/yunmenjin/acs_dev');
const deviceInfor = () =>
    import ('@/components/yunmenjin/deviceInfor');
const addAndUpdate = () =>
    import ('@/components/yunmenjin/addAndUpdate');
const acs_door_open = () =>
    import ('@/components/yunmenjin/acs_door_open');
const acs_auth_inout_log = () =>
    import ('@/components/yunmenjin/acs_auth_inout_log');
const acs_auth_init = () =>
    import ('@/components/yunmenjin/acs_auth_init');
const acs_auth_user = () =>
    import ('@/components/yunmenjin/acs_auth_user');
const acs_auth_temp = () =>
    import ('@/components/yunmenjin/acs_auth_temp');
const acs_auth_entity = () =>
    import ('@/components/yunmenjin/acs_auth_entity');
const acs_auth_temp_log = () =>
    import ('@/components/yunmenjin/acs_auth_temp_log');

// 管家中心
const house_user_seneschal_owner = () =>
    import ('@/components/yezhuManage/house_user_seneschal_owner');
const house_user_seneschal_sub = () =>
    import ('@/components/yezhuManage/house_user_seneschal_sub');
const house_user_householder_owner = () =>
    import ('@/components/yezhuManage/house_user_householder_owner');
const house_user_householder_sub = () =>
    import ('@/components/yezhuManage/house_user_householder_sub');

// 对讲
const intercom_line_config = () =>
    import ('@/components/duijiang/intercom_line_config');
const intercom_number_config = () =>
    import ('@/components/duijiang/intercom_number_config');
const intercom_number_list = () =>
    import ('@/components/duijiang/intercom_number_list');
const intercom_log = () =>
    import ('@/components/duijiang/intercom_log');

// 传统对讲
const intercom_tradition_door_log = () =>
    import ('@/components/duijiang/intercom_tradition_door_log');
const intercom_tradition_alarm_log = () =>
    import ('@/components/duijiang/intercom_tradition_alarm_log');
const intercom_tradition_call_log = () =>
    import ('@/components/duijiang/intercom_tradition_call_log');
const intercom_tradition_server_monitor = () =>
    import ('@/components/duijiang/intercom_tradition_server_monitor');
const intercom_tradition_server_accout = () =>
    import ('@/components/duijiang/intercom_tradition_server_accout');
const intercom_tradition_host = () =>
    import ('@/components/duijiang/intercom_tradition_host');
const intercom_tradition_server = () =>
    import ('@/components/duijiang/intercom_tradition_server');

// 云智能系统
const iot_project_param = () =>
    import ('@/components/yunzhineng/iot_project_param');
const iot_hardware = () =>
    import ('@/components/yunzhineng/iot_hardware');
const iot_global_param = () =>
    import ('@/components/yunzhineng/iot_global_param');
const iot_smart_home = () =>
    import ('@/components/yunzhineng/iot_smart_home');
const iot_smart_home1 = () =>
    import ('@/components/yunzhineng/iot_smart_home1');
const iot_security_user = () =>
    import ('@/components/yunzhineng/iot_security_user');
const iot_security_monitor_device = () =>
    import ('@/components/yunzhineng/iot_security_monitor_device');
const iot_security_alarm = () =>
    import ('@/components/yunzhineng/iot_security_alarm');

// 物业服务
const property_type = () =>
    import ('@/components/property/property_type');
const property_maintenance = () =>
    import ('@/components/property/property_maintenance');
const property_maintenance2 = () =>
    import ('@/components/property/property_maintenance2');
const property_steward = () =>
    import ('@/components/property/property_steward');
const property_repair = () =>
    import ('@/components/property/property_repair');
const property_online_facilities = () =>
    import ('@/components/property/property_online_facilities');
const property_online_affairs = () =>
    import ('@/components/property/property_online_affairs');
const property_complaint_suggestion = () =>
    import ('@/components/property/property_complaint_suggestion');
const property_log = () =>
    import ('@/components/property/property_log');
// 社区服务

const addFangwuxuncha = () =>
    import ('@/components/shequfuwu/addFangwuxuncha');
const community_disputea = () =>
    import ('@/components/shequfuwu/community_dispute');
const fangwuxuncha1 = () =>
    import ('@/components/shequfuwu/fangwuxuncha1');
const fangwuxunchaDetaul = () =>
    import ('@/components/shequfuwu/fangwuxunchaDetaul');
const fwxcErr = () =>
    import ('@/components/shequfuwu/fwxcErr');
const fwxcPhone = () =>
    import ('@/components/shequfuwu/fwxcPhone');
const community_food_safety = () =>
    import ('@/components/shequfuwu/community_food_safety');
const community_dispute_details = () =>
    import ('@/components/shequfuwu/community_dispute_details');
const community_spread = () =>
    import ('@/components/shequfuwu/community_spread');

// 工作协作
const work_assistance = () =>
    import ('@/components/shequfuwu/work_assistance');
const suSongJindu = () =>
    import ('@/components/shequfuwu/suSongJindu');


// 在线生活
import online_shop_info from '@/components/zaixain/shangjiaxingxiguanli'
import online_shop_intrdouce from '@/components/zaixain/tijianshangjia'
import online_shop_advert from '@/components/zaixain/shangjiaguanggao'
import online_small_express_goods from '@/components/zaixain/shangpinguanli'
import online_small_express_order from '@/components/zaixain/sudidanguanli'
import online_house_sell from '@/components/zaixain/fanwuzushao'
import fanwuzushao1 from '@/components/zaixain/fanwuzushao1'
import fanwuzushao2 from '@/components/zaixain/fanwuzushao2'
import online_artist from '@/components/zaixain/nenggongqiaojiang'
import nenggongqiaojiang1 from '@/components/zaixain/nenggongqiaojiang1'
import nenggongqiaojiang2 from '@/components/zaixain/nenggongqiaojiang2'
import online_housekeep_service from '@/components/zaixain/jiazheng'
import online_housekeep_msg from '@/components/zaixain/jiazhengliuyan'
import online_laundry_service from '@/components/zaixain/xiyi'
import online_laundry_msg from '@/components/zaixain/xiyiliuyan'
import online_business_service from '@/components/zaixain/shangquan'
import online_business_msg from '@/components/zaixain/shangquanliuyan'
import online_move_house_msg from '@/components/zaixain/banjia'
import online_package_msg from '@/components/zaixain/kuaidi'

// 舆情管理
import consensus_management from '@/components/other/consensus_management'

// 财务
import finance_detail_account from '@/components/zhangwu/finance_detail_account'
import finance_report from '@/components/zhangwu/finance_report'
import finance_tally from '@/components/zhangwu/finance_tally'
import finance_runing_account from '@/components/zhangwu/finance_runing_account'

//信息发布
import ips_property from '@/components/xinxifabu/ips_property'
import ips_app_advertising from '@/components/xinxifabu/ips_app_advertising'
import ips_device_advertising from '@/components/xinxifabu/ips_device_advertising'
import xinxiacs_dev1 from '@/components/xinxifabu/xinxiacs_dev1'

// 停车场
import parking_keytop_info from '@/components/tingchechang/parking_keytop_info'
import parking_keytop_record from '@/components/tingchechang/parking_keytop_record'
import parking_dnake from '@/components/tingchechang/parking_dnake'
import parking_dnake_space from '@/components/tingchechang/parking_dnake_space'
import parking_dnake_record from '@/components/tingchechang/parking_dnake_record'
import parking_dnake_payment_record from '@/components/tingchechang/parking_dnake_payment_record'
import parking_dnake_payment_statistics from '@/components/tingchechang/parking_dnake_payment_statistics'
import parking_dnake_reservation from '@/components/tingchechang/parking_dnake_reservation'
import parking_dnake_rental_fee from '@/components/tingchechang/parking_dnake_rental_fee'

// 社区动态
import community_dynamics from '@/components/community_dynamics/community_dynamics'
import community_dynamics1 from '@/components/community_dynamics/community_dynamics1'
import community_dynamics2 from '@/components/community_dynamics/community_dynamics2'

// 兴趣部落系统
import interest_tribe from '@/components/xingqubuluo/interest_tribe'
import interest_tribe_post1 from '@/components/xingqubuluo/interest_tribe_post1'
import interest_tribe_post2 from '@/components/xingqubuluo/interest_tribe_post2'
import interest_tribe_post from '@/components/xingqubuluo/interest_tribe_post'
// import interest_tribe_post1 from '@/components/xingqubuluo/interest_tribe_post1'
// import interest_tribe_post2 from '@/components/xingqubuluo/interest_tribe_post2'

// 

Vue.use(Router)

export default new Router({
    routes: [{
            path: '/login',
            name: 'login',
            component: login
        }, {
            path: '/',
            name: '',
            component: home,
            children: [{
                    path: '/index',
                    name: 'index',
                    component: index,
                },

                {
                    path: '/formApart',
                    name: '',
                    component: formApart,
                    children: [{
                            path: '/online_package_msg',
                            name: '快递留言管理',
                            component: online_package_msg,
                            meta: {
                                id: 70
                            }
                        },
                        {
                            path: '/parking_keytop_record',
                            name: '停车记录',
                            component: parking_keytop_record,
                            meta: {
                                id: 98
                            }
                        },
                        {
                            path: '/parking_dnake',
                            name: '停车场信息',
                            component: parking_dnake,
                            meta: {
                                id: 99
                            }
                        },
                        {
                            path: '/parking_dnake_space',
                            name: '车位信息',
                            component: parking_dnake_space,
                            meta: {
                                id: 100
                            }
                        },
                        {
                            path: '/parking_dnake_record',
                            name: '停车记录',
                            component: parking_dnake_record,
                            meta: {
                                id: 100
                            }
                        },
                        {
                            path: '/parking_dnake_payment_record',
                            name: '线上缴费记录',
                            component: parking_dnake_payment_record,
                            meta: {
                                id: 103
                            }
                        },
                        {
                            path: '/parking_dnake_payment_statistics',
                            name: '线上缴费统计',
                            component: parking_dnake_payment_statistics,
                            meta: {
                                id: 104
                            }
                        },
                        {
                            path: '/parking_dnake_reservation',
                            name: '访客预约记录',
                            component: parking_dnake_reservation,
                            meta: {
                                id: 105
                            }
                        },
                        {
                            path: '/parking_dnake_rental_fee',
                            name: '月租费设置',
                            component: parking_dnake_rental_fee,
                            meta: {
                                id: 105
                            }
                        },
                        {
                            path: '/parking_keytop_info',
                            name: '停车场信息',
                            component: parking_keytop_info,
                            meta: {
                                id: 97
                            }
                        },
                        {
                            path: '/xinxiacs_dev1',
                            name: '',
                            component: xinxiacs_dev1,
                        },
                        {
                            path: '/ips_device_advertising',
                            name: '小区广告',
                            component: ips_device_advertising,
                            meta: {
                                id: 92
                            }
                        },
                        {
                            path: '/ips_app_advertising',
                            name: 'APP广告',
                            component: ips_app_advertising,
                            meta: {
                                id: 92
                            }
                        },
                        {
                            path: '/ips_property',
                            name: '物业通知',
                            component: ips_property,
                            meta: {
                                id: 91
                            }
                        },
                        {
                            path: '/consensus_management',
                            name: '舆情管理',
                            component: consensus_management
                        },
                        {
                            path: '/fanwuzushao1',
                            name: '动态评论',
                            component: fanwuzushao1
                        },
                        {
                            path: '/fanwuzushao2',
                            name: '用户点赞',
                            component: fanwuzushao2
                        },
                        {
                            path: '/nenggongqiaojiang1',
                            name: '动态评论',
                            component: nenggongqiaojiang1
                        },
                        {
                            path: '/nenggongqiaojiang2',
                            name: '用户点赞',
                            component: nenggongqiaojiang2
                        },
                        {
                            path: '/community_spread',
                            name: '打传实战',
                            component: community_spread
                        },
                        {
                            path: '/finance_tally',
                            name: "记账本",
                            component: finance_tally,
                            meta: {
                                id: 94
                            }
                        },
                        {
                            path: '/finance_runing_account',
                            name: "流水账单",
                            component: finance_runing_account,
                            meta: {
                                id: 94
                            }
                        },
                        {
                            path: '/finance_report ',
                            name: "水电煤网报表",
                            component: finance_report,
                            meta: {
                                id: 93
                            }
                        },
                        {
                            path: '/finance_detail_account',
                            name: '流水明细',
                            component: finance_detail_account,
                            meta: {
                                id: 92
                            }
                        },
                        {
                            path: '/dbsx',
                            name: '待办事项',
                            component: dbsx,
                            meta: {

                            }
                        },
                        {
                            path: '/common_config',
                            name: '通用配置',
                            component: common_config,
                            meta: {

                            }
                        },
                        {
                            path: '/zhangdan_config',
                            name: '账单配置',
                            component: zhangdan_config,
                            meta: {

                            }
                        },
                        {
                            path: '/charging_config_price',
                            name: '单价配置',
                            component: charging_config_price,
                            meta: {
                                id: 147
                            }
                        },
                        {
                            path: '/gudinfeiyon_config',
                            name: '单价配置',
                            component: gudinfeiyon_config,
                            meta: {
                                id: 147
                            }
                        },
                        {
                            path: '/charging_meter_reading',
                            name: '水电煤抄表',
                            component: charging_meter_reading,
                            meta: {
                                id: 154
                            }
                        },
                        {
                            path: '/charging_bill',
                            name: '账单列表',
                            component: charging_bill,
                            meta: {
                                id: 143
                            }
                        },
                        {
                            path: '/dcjl',
                            name: '导出入记录',
                            component: dcjl,
                            meta: {

                            }
                        },
                        {
                            path: '/houseUserLogList',
                            name: '房间导出入记录',
                            component: houseUserLogList,
                            meta: {

                            }
                        },
                        {
                            path: '/xtrz',
                            name: '系统日志',
                            component: xtrz,
                            meta: {

                            }
                        },
                        {
                            path: '/online_move_house_msg',
                            name: '搬家留言管理',
                            component: online_move_house_msg,
                            meta: {
                                id: 68
                            }
                        },
                        {
                            path: '/online_business_msg',
                            name: '商圈留言管理',
                            component: online_business_msg,
                            meta: {
                                id: 66
                            }
                        },
                        {
                            path: '/online_business_service',
                            name: '商圈服务管理',
                            component: online_business_service,
                            meta: {
                                id: 65
                            }
                        },
                        {
                            path: '/online_laundry_msg',
                            name: '洗衣留言管理',
                            component: online_laundry_msg,
                            meta: {
                                id: 63
                            }
                        },
                        {
                            path: '/online_laundry_service',
                            name: '洗衣服务管理',
                            component: online_laundry_service,
                            meta: {
                                id: 62
                            }
                        },
                        {
                            path: '/online_housekeep_msg',
                            name: "家政留言管理",
                            component: online_housekeep_msg,
                            meta: {
                                id: 60
                            }
                        },
                        {
                            path: '/online_housekeep_service',
                            name: '家政服务管理',
                            component: online_housekeep_service,
                            meta: {
                                id: 59
                            }
                        },
                        {
                            path: '/online_artist',
                            name: '能工巧匠',
                            component: online_artist,
                            meta: {
                                id: 57
                            }
                        },
                        {
                            path: '/online_house_sell',
                            name: '房屋租售',
                            component: online_house_sell,
                            meta: {
                                id: 56
                            }
                        },
                        {
                            path: '/online_small_express_order',
                            name: '速递单管理',
                            component: online_small_express_order,
                            meta: {
                                id: 55
                            }
                        },
                        {
                            path: '/online_small_express_goods',
                            name: '商品管理',
                            component: online_small_express_goods,
                            meta: {
                                id: 54
                            }
                        },
                        // {
                        //     path: '/online_shop_advert',
                        //     name: '商家广告管理',
                        //     component: online_shop_advert
                        // },
                        // {
                        //     path: '/online_shop_intrdouce',
                        //     name: '推荐商家管理',
                        //     component: online_shop_intrdouce
                        // },
                        // {
                        //     path: '/online_shop_info',
                        //     name: '商家信息管理',
                        //     component: online_shop_info
                        // },
                        {
                            path: '/community_dynamics',
                            name: '社区动态管理',
                            component: community_dynamics,
                            meta: {
                                id: 150
                            }
                        },
                        {
                            path: '/community_dynamics1',
                            name: '社区动态评论',
                            component: community_dynamics1,
                            meta: {
                                id: 150
                            }
                        },
                        {
                            path: '/community_dynamics2',
                            name: '社区动态点赞',
                            component: community_dynamics2,
                            meta: {
                                id: 150
                            }
                        },
                        {
                            path: '/interest_tribe',
                            name: '兴趣部落管理',
                            component: interest_tribe,
                            meta: {
                                id: 152
                            }
                        },
                        {
                            path: '/interest_tribe_post1',
                            name: '帖子信息评论',
                            component: interest_tribe_post1,
                            meta: {
                                id: 153
                            }
                        },
                        {
                            path: '/interest_tribe_post2',
                            name: '帖子信息点赞',
                            component: interest_tribe_post2,
                            meta: {
                                id: 153
                            }
                        },
                        {
                            path: '/interest_tribe_post',
                            name: '帖子信息',
                            component: interest_tribe_post,
                            meta: {
                                id: 153
                            }
                        },
                        {
                            path: '/property_type',
                            name: '物业类型管理',
                            component: property_type,
                            meta: {
                                id: 73
                            }
                        },
                        {
                            path: '/community_food_safety',
                            name: "食品安全",
                            component: community_food_safety,
                            meta: {

                            }
                        },
                        {
                            path: '/fwxcPhone',
                            name: "照片及电子签名凭证",
                            component: fwxcPhone,
                            meta: {

                            }
                        },
                        {
                            path: '/fwxcErr',
                            name: "异常处理进度",
                            component: fwxcErr,
                            meta: {

                            }
                        },
                        {
                            path: '/work_assistance',
                            name: "工作协助",
                            component: work_assistance,
                            meta: {

                            }
                        },
                        {
                            path: '/suSongJindu',
                            name: "详情查看",
                            component: suSongJindu,
                            meta: {

                            }
                        },
                        {
                            path: '/zhbb',
                            name: "综合报表",
                            component: zhbb,
                            meta: {

                            }
                        },
                        {
                            path: '/fangwuxunchaDetaul',
                            name: "巡查记录详情",
                            component: fangwuxunchaDetaul,
                            meta: {

                            }
                        },
                        {
                            path: '/community_dispute',
                            name: "矛盾纠纷",
                            component: community_disputea,
                            meta: {

                            }
                        },
                        {
                            path: '/community_dispute_details',
                            name: "处理详情",
                            component: community_dispute_details,
                            meta: {

                            }
                        },
                        {
                            path: '/fangwuxuncha1',
                            name: "巡查记录",
                            component: fangwuxuncha1,
                            meta: {

                            }
                        },
                        {
                            path: '/addFangwuxuncha',
                            name: "新增巡查任务",
                            component: addFangwuxuncha,
                            meta: {

                            }
                        },
                        {
                            path: '/property_repair',
                            name: "保修保养",
                            component: property_repair,
                            meta: {
                                id: 76
                            }
                        },
                        {
                            path: '/property_log',
                            name: "物业日志",
                            component: property_log,
                            meta: {
                                id: 71
                            }
                        },
                        {
                            path: '/property_complaint_suggestion',
                            name: "投诉建议",
                            component: property_complaint_suggestion,
                            meta: {
                                id: '80'
                            }
                        },
                        {
                            path: '/property_online_facilities',
                            name: "公共设施",
                            component: property_online_facilities,
                            meta: {
                                id: '78'
                            }
                        },
                        {
                            path: '/property_online_affairs',
                            name: "家庭事务",
                            component: property_online_affairs,
                            meta: {
                                id: '79'
                            }
                        },
                        {
                            path: '/property_maintenance2',
                            name: "维修人员录入",
                            component: property_maintenance2,
                            meta: {
                                id: '74'
                            }
                        },
                        {
                            path: '/property_maintenance',
                            name: "维修人员录入",
                            component: property_maintenance,
                            meta: {
                                id: 74
                            }
                        },
                        {
                            path: '/property_steward',
                            name: "APP管家录入",
                            component: property_steward,
                            meta: {
                                id: 75
                            }
                        },
                        {
                            path: '/acs_dev',
                            name: '初始化设备',
                            component: acs_dev,
                            meta: {
                                id: 15
                            }
                        },
                        {
                            path: '/acs_dev1',
                            name: '可选设备',
                            component: acs_dev1,
                            meta: {
                                id: 15
                            }
                        },
                        {
                            path: '/acs_auth_init',
                            name: '初始化权限',
                            component: acs_auth_init,
                            meta: {
                                id: 18
                            }
                        },
                        {
                            path: '/acs_auth_user',
                            name: '业主成员权限',
                            component: acs_auth_user,
                            meta: {
                                id: 19
                            }
                        },
                        {
                            path: '/acs_auth_temp',
                            name: "临时授权",
                            component: acs_auth_temp,
                            meta: {
                                id: 25
                            }
                        },
                        {
                            path: '/acs_auth_entity',
                            name: "实体卡授权",
                            component: acs_auth_entity,
                            meta: {
                                id: 27
                            }
                        },
                        {
                            path: '/acs_auth_temp_log',
                            name: "授权查看",
                            component: acs_auth_temp_log,
                            meta: {
                                id: 27
                            }
                        },
                        {
                            path: '/iot_smart_home',
                            name: '智能家庭',
                            component: iot_smart_home,
                            meta: {
                                id: 135
                            }
                        },
                        {
                            path: '/iot_security_user',
                            name: '用户管理',
                            component: iot_security_user,
                            meta: {
                                id: 137
                            }
                        },
                        {
                            path: '/iot_security_alarm',
                            name: '推送记录',
                            component: iot_security_alarm,
                            meta: {
                                id: 140
                            }
                        },
                        {
                            path: '/iot_security_monitor_device',
                            name: '监控设备',
                            component: iot_security_monitor_device,
                            meta: {
                                id: 139
                            }
                        },
                        {
                            path: '/iot_smart_home1',
                            name: '智能家庭详情',
                            component: iot_smart_home1,
                            meta: {}
                        },
                        {
                            path: '/iot_global_param',
                            name: '全局参数',
                            component: iot_global_param,
                            meta: {
                                id: 134
                            }
                        },
                        {
                            path: '/iot_hardware',
                            name: '硬件入库',
                            component: iot_hardware,
                            meta: {
                                id: 132
                            }
                        },
                        {
                            path: '/iot_project_param',
                            name: '工程参数',
                            component: iot_project_param,
                            meta: {
                                id: 133
                            }
                        },
                        {
                            path: '/sys_role',
                            name: '角色管理',
                            component: sys_role,
                            meta: {
                                id: 50
                            }
                        },
                        {
                            path: '/intercom_tradition_host',
                            name: '主机参数',
                            component: intercom_tradition_host,
                            meta: {
                                id: 33
                            }
                        },
                        {
                            path: '/intercom_tradition_server',
                            name: '媒体服务器参数',
                            component: intercom_tradition_server,
                            meta: {
                                id: 34
                            }
                        },
                        {
                            path: '/intercom_tradition_server_accout',
                            name: '媒体服务器账号',
                            component: intercom_tradition_server_accout,
                            meta: {
                                id: 35
                            }
                        },
                        {
                            path: '/intercom_tradition_server_monitor',
                            name: '主机状态实时监控',
                            component: intercom_tradition_server_monitor,
                            meta: {
                                id: 36
                            }
                        },
                        {
                            path: '/intercom_tradition_alarm_log',
                            name: '报警日志',
                            component: intercom_tradition_alarm_log,
                            meta: {
                                id: 38
                            }
                        },
                        {
                            path: '/intercom_tradition_call_log',
                            name: '通话日志',
                            component: intercom_tradition_call_log,
                            meta: {
                                id: 37
                            }
                        },
                        {
                            path: '/intercom_tradition_door_log',
                            name: '开门日志',
                            component: intercom_tradition_door_log,
                            meta: {
                                id: 39
                            }
                        },
                        {
                            path: '/sys_log',
                            name: '系统日志',
                            component: sys_log,
                            meta: {
                                id: 51
                            }
                        },
                        {
                            path: '/sys_manager',
                            name: '管理员管理',
                            component: sys_manager,
                            meta: {
                                id: 49
                            }
                        },
                        {
                            path: '/intercom_log',
                            name: '对讲日志',
                            component: intercom_log,
                            meta: {
                                id: 40
                            }
                        },
                        {
                            path: '/intercom_number_config',
                            name: '对讲号配置',
                            component: intercom_number_config,
                            meta: {
                                id: 30
                            }
                        },
                        {
                            path: '/intercom_number_list',
                            name: '对讲号查看',
                            component: intercom_number_list,
                            meta: {
                                id: 31
                            }
                        },
                        {
                            path: '/intercom_line_config',
                            name: '线路配置',
                            component: intercom_line_config,
                            meta: {
                                id: 41
                            }
                        },
                        {
                            path: '/acs_door_open',
                            name: '远程开门',
                            component: acs_door_open,
                            meta: {
                                id: 16
                            }
                        },
                        {
                            path: '/acs_auth_inout_log',
                            name: '门禁日志',
                            component: acs_auth_inout_log,
                            meta: {
                                id: 28
                            }
                        },
                        {
                            path: '/house_user_householder_owner',
                            name: '业主信息',
                            component: house_user_householder_owner,
                            meta: {
                                id: 46
                            }
                        },
                        {
                            path: '/house_user_householder_sub',
                            name: '成员信息',
                            component: house_user_householder_sub,
                            meta: {
                                id: 47
                            }
                        },
                        {
                            path: '/house_user_seneschal_owner',
                            name: '物业主管',
                            component: house_user_seneschal_owner,
                            meta: {
                                id: 43
                            }
                        },
                        {
                            path: '/house_user_seneschal_sub',
                            name: '物业成员',
                            component: house_user_seneschal_sub,
                            meta: {
                                id: 44
                            }
                        },
                        {
                            path: '/addAndUpdate',
                            name: '云门禁添加和修改',
                            component: addAndUpdate,
                        },
                        {
                            path: '/manager_org',
                            name: '组织管理',
                            component: manager_org,
                            meta: {
                                id: 2
                            }
                        },
                        {
                            path: '/deviceInfor',
                            name: 'ncu设备',
                            component: deviceInfor,
                        },
                        {
                            path: '/manager_station',
                            name: '岗位管理',
                            component: manager_station,
                            meta: {
                                id: 3
                            }
                        },
                        {
                            path: '/manager_manager',
                            name: '用户管理',
                            component: manager_manager,
                            meta: {
                                id: 4
                            }
                        },
                        {
                            path: '/personalCenter',
                            name: '个人中心',
                            component: personalCenter,
                        },
                        {
                            path: '/messageCenter',
                            name: '消息中心',
                            component: messageCenter,
                        },
                        {
                            path: '/xq_info',
                            name: '小区管理',
                            component: xq_info,
                            meta: {
                                id: 8
                            }
                        },
                        {
                            path: '/base_house',
                            name: '房号管理',
                            component: base_house,
                            meta: {
                                id: 7
                            }
                        },
                        {
                            path: '/base_section',
                            name: '区域管理',
                            component: base_section,
                            meta: {
                                id: 6
                            }
                        },
                        {
                            path: '/online_shop_info',
                            name: '商家信息管理',
                            component: online_shop_info,
                            meta: {
                                id: 11
                            }
                        },
                        {
                            path: '/online_shop_intrdouce',
                            name: '推荐商家管理',
                            component: online_shop_intrdouce,
                            meta: {
                                id: 12
                            }
                        },
                        {
                            path: '/online_shop_advert',
                            name: '商家广告管理',
                            component: online_shop_advert,
                            meta: {
                                id: 13
                            }
                        },
                        {
                            path: '/img_receipt_print',
                            name: '打印',
                            component: img_receipt_print,
                        },
                        {
                            path: '/middleMoudle',
                            name: '',
                            component: middleMoudle,
                            children: [{
                                path: '/payConfiguration',
                                name: '支付配置',
                                component: payConfiguration,
                            }, ]
                        },

                    ]
                }

            ]
        }

    ]
})