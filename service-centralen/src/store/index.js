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
    offer: {},
    companies: []
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
      state.offers = offers;
    },
    SET_OFFER(state, offer){
      state.offer = offer
      state.offers.push(offer);
    },
    CREATE_COMPANY(state, company){
      state.companies.push(company)
    },
    SET_COMPANIES(state, companies){
      state.companies = companies.data;
    },
    DELETE_OFFER(state, id){
      let obj = state.offers.findIndex((obj => obj.id == id));
      state.offers.splice(obj, 1)

    },
    UPDATE_OFFER(state, offer){
      let obj = state.offers.findIndex((obj => obj.id == offer.id));
      state.offers[obj].Title = offer.Title;
      state.offers[obj].Description = offer.Description;
      state.offers[obj].FromDate = offer.FromDate;
      state.offers[obj].ToDate = offer.ToDate;
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
       .then(() =>{
         state.commit("SET_OFFER", offer);
       })
       .catch((error) =>{
        console.log(error);
      });
    },
    UPDATE_OFFER(state, offer){
      axios.put('https://service-centralen.herokuapp.com/offers/' + offer.id, offer).then(() =>{
        state.commit("UPDATE_OFFER", offer);
      })
      .catch((error) =>{
        console.log(error)
      })
    },
    DELETE_OFFER(state, id){
      axios.delete('https://service-centralen.herokuapp.com/offers/' + id).then(() =>{
      state.commit("DELETE_OFFER", id)
      })
      .catch((error) =>{
        console.log(error)
      })
    },
    CREATE_COMPANY(state, company){
      axios.post('https://service-centralen.herokuapp.com/companies', company).then(()=>{
        state.commit("CREATE_COMPANY", company);
      })
      .catch((error) =>{
        console.log(error)
      })
    },
    GET_COMPANIES(state){
      axios.get('https://service-centralen.herokuapp.com/companies').then((res) =>{
        state.commit("SET_COMPANIES", res);
      })
      .catch((error) =>{
        console.log(error)
      })
    },
    UPDATE_COMPANY(state, company){
      axios.put('https://service-centralen.herokuapp.com/companies/' + company.id, {offers: company.offer}).then(()=>{
        state.commit("UPDATE_COMPANY", company);
      })
      .catch((error) =>{
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
    },
    getCompanies(state){
      return state.companies;
    }
  }
})
