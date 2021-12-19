<template>
<div>
    <Header />
  <button v-on:click="openCreateNew">Ny</button>

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
        }
    }
}
</script>

