<template>
   <div class="header">
       <div class="header__content">
           <div @click="goToCompany" class="header__logo">LOGO</div>
           <div class="header__nav" :class="{ active: page == '' }"><a class="header__link" @click="goToCompany">Firmaer</a></div>
           <div class="header__nav" :class="{ active: page == 'statistics' }"><a class="header__link" @click="goToStatistics">Statestikker</a></div>
           <div class="header__nav" :class="{ active: page == 'overview' }"><a class="header__link" @click="goToOverview">Oversigt</a></div>
       </div>
   </div>
</template>

<script>
export default{
    name: 'Header',
    methods:{
        goToCompany(){
            this.$store.commit("SET_PAGE", "");
            this.$router.push("/");
        },
        goToStatistics(){
            this.$store.commit("SET_PAGE", "statistics");
            this.$router.push("/statistics");
        },
        goToOverview(){
            this.$store.commit("SET_PAGE", "overview");
            this.$router.push("/overview");
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