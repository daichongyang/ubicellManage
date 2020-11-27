import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)
const state = {
    count: 10,
    name: '起飞',
    menuList: [],
    masterId: '',
    roleId: '',
    loginData: {}
}
const mutations = {
    increment() { //提交的方法
        state.count++
            console.log(state.count, state.name)
    },
    getLoginData() { //将登陆信息存储到本地
        let strData = JSON.stringify(state.loginData)
        sessionStorage('loginData', strData)
    }
}
const getters = { //设置的计算
    doneTodosCount: state => {
        console.log(state)
    }
}
const actions = { //Action 函数接受一个与 store 实例具有相同方法和属性的 context 对象，因此你可以调用 context.commit 提交一个 mutation，或者通过 context.state 和 context.getters 来获取 state 和 getters。
    increment(context) {
        context.commit('increment')
    }
}
export default new Vuex.Store({
    state,
    mutations,
    getters,
    actions
})