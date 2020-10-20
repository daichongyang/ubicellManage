import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)
const state = {
    count: 10,
    nickname: '',
    menuList: [],
    masterId: '',
    roleId: ''
}
const mutations = {
    increment() {
        state.count++
            console.log(state.count)
    }
}
export default new Vuex.Store({
    state: state,
    mutations: mutations
})