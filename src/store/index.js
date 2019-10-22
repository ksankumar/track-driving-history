/**
 * index.js Created by sandy on 3/25/2019
 */
import Vue from 'vue'
import Vuex from 'vuex'
import modules from './modules'

Vue.use(Vuex)
export default new Vuex.Store({
  modules,
  state: {},
  mutations: {},
  getters: {}
})
