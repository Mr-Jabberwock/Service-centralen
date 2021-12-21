<template>
<div>
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
</div>
</template>

<script>
import Header from "../components/Header.vue"
import CreateOffer from "../components/CreateOffer.vue"
export default{
    name: "Offer", 
    components:{
        Header,
        CreateOffer
    },
    data(){
        return{
          companyOpen: false
        }
    },
    methods:{
        openCreateNew(){
             this.companyOpen = true;
        },
        updateOffer(){
            this.$store.dispatch('UPDATE_OFFER', {id: '61bef77eb60e891fecb6b231', Title: 'Spytstægte nudler', Description: 'Med sur sød sovs'} )
        },
        deleteOffer(){
            this.$store.dispatch('DELETE_OFFER', '61bef77eb60e891fecb6b231')
        }
    }
}
</script>

