<template>
<div class="offers">
    <Header />
  <button v-on:click="openCreateNew">Ny</button>
  <button v-on:click="updateOffer">Opdater</button>
  <button v-on:click="deleteOffer">Slet</button>

   <transition name="pop" appear>
        <div class="modal" role="dialog">
            <CreateOffer :class="[{visible: companyOpen}]" @closeCompanyDetails="companyOpen = false"></CreateOffer>
        </div>
    </transition>
    <transition name="fade" appear>
        <div class="modal-overlay" 
            v-show="companyOpen" 
            @click="companyOpen = false">
        </div>
    </transition>
   <transition name="Pop" appear>
        <div class="modal" role="dialog">
            <EditOffer :class="[{visible: editOpen}]" @closeEditOffer="editOpen = false"></EditOffer>
        </div>
    </transition>
    <transition name="fade" appear>
        <div class="modal-overlay" 
            v-show="editOpen" 
            @click="editOpen = false">
        </div>
    </transition> 
    <table class="offers__table">
        <thead>
            <tr>
                <th>
                    Company ID
                </th>
                <th>
                    Title
                </th>
                <th>
                    Description
                </th>
                <th>
                    Companies
                </th>
                <th>
                </th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="offer in offers" :key="offer" @click="openEditModal(offer)">
                <td>
                    <p>
                        {{offer.CompanyId}}
                    </p>
                </td>
                <td>
                    <p>
                        {{offer.Title}}
                    </p>
                </td>
                <td>
                    <p>
                        {{offer.Description}}
                    </p>
                </td>
                <td>
                    <p v-for="company in offer.companies" :key="company">
                        <span>  {{company.Address}} </span>                     
                    </p> 
                </td>
                <td>
                    <img  @click="openEditModal(offer)" src="../assets/img/pencil.svg">
                    <p class="offers__delete" @click="deleteOffer(offer._id)"> &#x2715;</p>
                </td>
            </tr>
        </tbody>
    </table>

</div>
</template>

<script>
import Header from "../components/Header.vue"
import CreateOffer from "../components/CreateOffer.vue"
import EditOffer from "../components/EditOffer.vue"
export default{
    name: "Offer", 
    components:{
        Header,
        CreateOffer,
        EditOffer
    },
    data(){
        return{
          companyOpen: false,
          editOpen: false
        }
    },
    methods:{
        openCreateNew(){
             this.companyOpen = true;
        },
        openEditModal(offer){
            this.$store.commit("SET_OFFER", offer);
            this.editOpen = true;
        },
        updateOffer(){
            this.$store.dispatch('UPDATE_OFFER', {id: '61bef77eb60e891fecb6b231', Title: 'Spytstægte nudler', Description: 'Med sur sød sovs'} )
        },
        deleteOffer(id){
            this.$store.dispatch('DELETE_OFFER', id)
        }
    },
    computed:{
        offers(){
            console.log(this.$store.getters.getOffers);
            return this.$store.getters.getOffers;
        }
    },
    mounted(){
        this.$store.dispatch('GET_OFFERS');
    }
}
</script>

