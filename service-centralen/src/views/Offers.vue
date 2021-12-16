<template>
<div>
    <Header />
  <button v-on:click="openCreateNew">Ny</button>

   <transition name="pop" appear>
        <div class="modal" role="dialog">
            <CompanyDetails :class="[{visible: companyOpen}]" @closeCompanyDetails="companyOpen = false"></CompanyDetails>
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
import CompanyDetails from "../components/CompanyDetails.vue"
export default{
    name: "Offer", 
    components:{
        Header,
        CompanyDetails
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

