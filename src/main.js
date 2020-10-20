// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui'
import { Loading, Message, MessageBox } from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css';
import VueRouter from 'vue-router'
import axios from 'axios';
import md5 from 'js-md5';
import base64 from 'js-base64';
import { getDateArray } from './assets/js/util';
import store from './assets/js/store';

// Vue.$getDateArray = getDateArray
Vue.config.productionTip = false
Vue.use(ElementUI)

Vue.use(VueRouter)
    // 捕捉异常信息
Vue.config.errorHandler = function(err, vm, info) {
    // `info` 是 Vue 特定的错误信息，比如错误所在的生命周期钩子
    // 只在 2.2.0+ 可用
    let msg = `错误发生在：${info}中，具体信息：${err.stack}`
    console.log(msg)
}
let token;
let dataBase64 = base64.Base64
const CancelToken = axios.CancelToken;
const source = CancelToken.source();
router.beforeEach((to, from, next) => {
    // console.log(to)
    if (to.meta.id) {
        // console.log(sessionStorage.getItem('tenantCode') + ":" + to.meta.id + ":dist")
        token = sessionStorage.getItem('tenantCode') + ":" + to.meta.id + ":dist"
    }
    // console.log(sessionStorage.getItem('token'))
    axios.interceptors.request.use(
        config => {
            if (sessionStorage.getItem('Authorization')) { // 判断是否存在token，如果存在的话，则每个http header都加上token
                config.headers.Authorization = sessionStorage.getItem('Authorization');
            }
            return config;
        },
        err => {
            return Promise.reject(err);
        });
    if (to.path == '/login') {
        sessionStorage.removeItem('Authorization');
    }
    let user = sessionStorage.getItem('Authorization');

    if (!user && to.path != '/login') {
        next({ path: '/login' })
    } else {
        next()
    }
})
new Vue({
        el: '#app',
        router,
        store,
        data: () => {
            return {
                getDateArray: getDateArray
            }
        },
        components: { App },
        template: '<App/>'
    })
    // 添加请求拦截器
axios.interceptors.request.use(function(config) {
    let data = ''
    let arrdata = []
        // config.cancelToken = source.token;
    if (token) {
        config.headers.token = dataBase64.encode(token)
        sessionStorage.setItem('token', dataBase64.encode(token))
        console.log(dataBase64.encode(token))
    }
    // if (config.method == 'post') {
    //     for (let item in config.data) {
    //         arrdata.push(item)
    //     }
    //     // 字典排序
    //     let newarr = arrdata.sort()

    //     for (let i = 0; i < newarr.length; i++) {
    //         data += newarr[i] + ':' + config.data[newarr[i]] + ","
    //     }
    //     data = "{" + data.substr(0, data.length - 1) + "}"

    //     let dataMd5 = md5(data).toUpperCase() + ":" + new Date().getTime()

    //     let dataBase64 = base64.Base64

    //     data = dataBase64.encode(dataMd5)

    //     console.log(data, dataMd5.toUpperCase(), config.data)

    //     config.url = config.url + "?a=" + data
    // }
    // console.log(eval('(' + data + ')'))
    // 在发送请求之前做些什么
    return config;
}, function(error) {
    Message.error({
            message: '网络不给力,请稍后再试'
        })
        // 对请求错误做些什么
    return Promise.reject(error);
});
let _this = this

// 添加响应拦截器
axios.interceptors.response.use(function(config) {
    // console.log(config)
    // 响应成功关闭loading
    if (config.data.code == -1 || config.data.code == 40000 || config.data.code == 40001 || config.data.code == 40002 || config.data.code == 40003 || config.data.code == 40004 || config.data.code == 40005) {
        // MessageBox.alert('登录信息已过期，请重新登录', '提示', {
        //     confirmButtonText: '确定',
        //     callback: action => {
        //         router.push({
        //             path: '/login',
        //             // query: { redirect: router.currentRoute.fullPath } //登录后再跳回此页面时要做的配置
        //         })
        //     }
        // });
        // source.cancel(); // 取消其他正在进行的请求
        router.push({
            path: '/login',
        })
    }
    if (config.data.code != 200) {
        Message.error(config.data.msg)
        return
    }

    return config;
}, function(error) {
    Message.error({
            message: '网络不给力,请稍后再试'
        })
        // 对请求错误做些什么
    return Promise.reject(error);
});