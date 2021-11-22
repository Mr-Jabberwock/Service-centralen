import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    companyPurchases: []
  },
  mutations: {
    SET_COMPANY_PURCHASES(state, payload){
      state.companyPurchases = payload
      console.log(state.companyPurchases)

    }
  },
  actions: {
    setCompanyPurchases(state){

      state.commit("SET_COMPANY_PURCHASES", ["howdy"])
       
    }
  },
  modules: {
  }
})
