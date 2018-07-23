/**
 * @Author: houshengwei
 * @Date:   2018/07/23
 * @Last modified by:   houshengwei
 * @Last modified time: 2018/07/23
 */

import Vue from 'vue'
import App from './App.vue'
import store from './store'
import VueRouter from 'vue-router'
import routes from './routes'

import storeManager from 'store.manager'
import ruleList from './store/ruleList'

Vue.use(VueRouter)
const router = new VueRouter({
  routes
})

const manager = storeManager.start(ruleList, store)
router.beforeEach((to, from, next) => {
  let url = to.fullPath

  manager.updateStore(url)
  next()
})


new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
