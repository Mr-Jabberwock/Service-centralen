<template>
   <div>
       <div class="header">
           <div class="logo">LOGO</div>
           <div>Firmaer</div>
           <div>Statestikker</div>
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
.header{
    width: 100%;
    height: 50px;
    background-color: black;
    opacity: 70%;

    display: flex;

    .logo{
        margin-left: 10px;
        margin-top: 0;
    }

    
}

    @media only screen and (max-width: 786){

    }
</style>