<template>
<div class="offers">
    <Header />
    <div class="new-offer">
        <button class="new-offer__button" v-on:click="openCreateNew">Ny</button>
    </div>
   <transition name="pop" appear>
        <div class="modal" role="dialog">
            <CreateOffer v-on:closeCreate="closeCreate" :class="[{visible: createOpen}]" @closeCreateOffer="createOpen = false"></CreateOffer>
        </div>
    </transition>
    <transition name="fade" appear>
        <div class="modal-overlay" 
            v-show="createOpen" 
            @click="createOpen = false">
        </div>
    </transition>
   <transition name="Pop" appear>
        <div class="modal" role="dialog">
            <EditOffer v-on:saved="editSaved" :key="componentKey" :class="[{visible: editOpen}]" :offer="chosenOffer" @closeEditOffer="editOpen = false"></EditOffer>
        </div>
    </transition>
    <transition name="fade" appear>
        <div class="modal-overlay" 
            v-show="editOpen" 
            @click="closeEdit">
        </div>
    </transition> 
    <table class="offers__table">
        <thead class="offers__head">
            <tr >
                <th>
                    Titel
                </th>
                <th>
                    Beskrivelse
                </th>
                <th>
                    Fra
                </th>
                <th>
                    Til
                </th>
                <th>
                </th>
            </tr>
        </thead>
        <tbody class="offers__body">
            <tr v-for="offer in offers" :key="offer.Title">
                <td class="body-title">
                    <p>
                        {{offer.Title}}
                    </p>
                </td>
                <td class="body-description">
                    <p>
                        {{offer.Description}}
                    </p>
                </td>
                <td class="body-fromdate">
                    <p>
                        {{offer.FromDate}}
                    </p>
                </td>
                <td class="body-todate">
                    <p>
                        {{offer.ToDate}}
                    </p>
                </td>
               <!-- <td>
                    <p v-for="company in offer.companies" :key="company">
                        <span>  {{company.Address}} </span>                     
                    </p> 
                </td>-->
                <td class="table__edit-delete">
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
          createOpen: false,
          editOpen: false,
          chosenOffer: {},
          componentKey: 0
        }
    },
    methods:{
        openCreateNew(){
             this.createOpen = true;
        },
        openEditModal(offer){
            this.chosenOffer = offer
            this.componentKey = 1;
            //this.$store.commit("SET_OFFER", offer);
            this.editOpen = true;
        },
        updateOffer(){
            this.$store.dispatch('UPDATE_OFFER', {id: '61bef77eb60e891fecb6b231', Title: 'Spytstægte nudler', Description: 'Med sur sød sovs'} )
        },
        deleteOffer(id){
            this.$store.dispatch('DELETE_OFFER', id)
        },
        editSaved(){
            this.editOpen = false;
            this.componentKey = 2;
        },
        closeEdit(){
            this.editOpen = false;
            this.componentKey = 2;
        },
        closeCreate(){
            this.createOpen = false;
        }
    },
    computed:{
        offers(){
            return this.$store.getters.getOffers;
        }
    },
    mounted(){
        this.$store.dispatch('GET_OFFERS');
    }
}
</script>

<style lang="scss">
@import "../assets/styles/offers";
</style>

