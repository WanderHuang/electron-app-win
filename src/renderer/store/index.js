import Vue from 'vue'
import Vuex from 'vuex'

import modules from './modules'

Vue.use(Vuex)

export default new Vuex.Store({
  state: { // 全局状态
    token: null
  },
  getters: {
    getToken: state => state.token
  },
  mutations: {
    setToken (state, val) {
      state.token = val
    }
  },
  modules,
  strict: process.env.NODE_ENV !== 'production'
})
