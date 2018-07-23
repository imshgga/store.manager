/**
 * @Author: houshengwei
 * @Date:   2018/07/23
 * @Last modified by:   houshengwei
 * @Last modified time: 2018/07/23
 */

import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    globalAPI: 'this is global state'
  },
  mutations: {
    updateGlobalAPI (state, payload) {
      state.globalAPI = payload
    }
  },
  getters: {
    getGlobalAPI (state) {
      return state.globalAPI || ''
    }
  }
});

export default store
