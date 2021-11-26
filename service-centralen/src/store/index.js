import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    companyPurchases: [],
    companyObj: {}
  },
  mutations: {
    SET_COMPANY_PURCHASES(state, payload){
      state.companyPurchases = payload
      console.log(state.companyPurchases)

    },
    SET_COMPANY_OBJECT(state, res){
      state.companyObj = res
    }
  },
  actions: {
    setCompanyPurchases(state){

      state.commit("SET_COMPANY_PURCHASES", ["howdy"])
       
    }
  },
  modules: {
  },
  getters: {
    getCompanyObj(state){
      return state.companyObj;
    }
  }
})
