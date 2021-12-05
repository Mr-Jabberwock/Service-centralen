<template>
   <div class="header">
       <div class="header__content">
           <div class="header__logo">LOGO</div>
           <div class="header__nav" :class="{ active: page == 'company' }"><a class="header__link" @click="goToCompany">Firmaer</a></div>
           <div class="header__nav" :class="{ active: page == 'statistics' }"><a class="header__link" @click="goToStatistics">Statestikker</a></div>
           <div class="header__nav" :class="{ active: page == 'overview' }"><a class="header__link">Oversigt</a></div>
       </div>
   </div>
</template>

<script>
export default{
    name: 'Header',
    methods:{
        goToCompany(){
            this.$store.commit("SET_PAGE", "/");
            this.$router.push("/");
        },
        goToStatistics(){
            this.$store.commit("SET_PAGE", "/statistics");
            console.log(window.location.href);
            this.$router.push("/statistics");
        }
    },
    computed:{
        page(){
            return this.$store.getters.getPage;
        }
    }
}
</script>

<style lang="scss">
@import "../assets/styles/header";
</style>