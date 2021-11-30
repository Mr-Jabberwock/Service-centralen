<template>
   <div class="header">
       <div class="header__content">
           <div class="logo">LOGO</div>
           <div><router-link to="/">Firmaer</router-link></div>
           <div><router-link to="/statistics">Statestikker</router-link></div>
           <div>Oversigt</div>
       </div>
   </div>
</template>

<script>
export default{
    name: 'Header'
}
</script>

<style lang="scss">
@import "../assets/styles/header";
</style>