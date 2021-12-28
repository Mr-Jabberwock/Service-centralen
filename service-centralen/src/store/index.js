import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    companyPurchases: [],
    companyObj: {},
    page:"company",
    offers: [],
    offer: {}
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
      //console.log(offers)
      state.offers = offers;
    },
    SET_OFFER(state, offer){
      state.offer = offer
    }
  },
  actions: {
    GET_OFFERS(state){
      axios.get('https://service-centralen.herokuapp.com/offers')
      .then((response) => {
        state.commit("SET_OFFERS", response.data)
      })
    },
    CREATE_OFFER(state, offer){
       axios.post('https://service-centralen.herokuapp.com/offers', offer)
       .then((res) =>{
         console.log(res)
         state.commit("SET_OFFER", offer);
       })
       .catch(function (error) {
        console.log(error);
      });
    },
    UPDATE_OFFER(state, offer){
      axios.put('https://service-centralen.herokuapp.com/offers/' + offer.id, offer).then((res) =>{
        console.log(res)
        state.commit("UPDATE_OFFER", offer);
      })
      .catch(function (error) {
        console.log(error)
      })
    },
    DELETE_OFFER(state, id){
      axios.delete('https://service-centralen.herokuapp.com/offers/' + id).then((res) =>{
      console.log(res)  
      state.commit("DELETE_OFFER", id)
      })
      .catch(function (error){
        console.log(error)
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
    },
    getOffers(state){
      return state.offers;
    },
    getOffer(state){
      return state.offer;
    }
  }
})
