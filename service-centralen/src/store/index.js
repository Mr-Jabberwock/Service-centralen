import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    companyPurchases: [],
    companyObj: {},
    page:"company",
    offers: []
  },
  mutations: {
    SET_COMPANY_PURCHASES(state, payload){
      state.companyPurchases = payload;
    },
    SET_COMPANY_OBJECT(state, res){
      state.companyObj = res;
    },
    SET_PAGE(state, res){
      state.page = res;
    },
    SET_OFFERS(state, offers){
      console.log(offers)
      state.offers = offers;
    }
  },
  actions: {
    GET_OFFERS(state){
      axios.get('https://guarded-plateau-77693.herokuapp.com/api/offers').then((response) => {
        state.commit("SET_OFFERS", response.data)
      })
    }
  },
  modules: {
  },
  getters: {
    getCompanyObj(state){
      return state.companyObj;
    },
    getCompanyPurchases(state){
      return state.companyPurchases;
    },
    getPage(state){
      return state.page;
    }
  }
})
