<template>
<div>
    <Header />
    <ul :style="gridStyle" class="company">
        <li v-for="company in companies" :key="company" class="company__details">
            <p>Comapny {{company.company}}</p>
        </li>
    </ul>
</div>
</template>

<script>
import Header from "../components/Header.vue"
export default{
   name: 'Companies',
   data(){
       return{
           companies: [
               {company: "comapny 1"},
               {company: "comapny 2"},
               {company: "comapny 3"},
               {company: "comapny 4"},
               {company: "comapny 5"},
               {company: "comapny 6"},
               {company: "comapny 7"},
               {company: "comapny 8"}
           ]
       }
   },
   components: {
      Header
   }
}
</script>

<style lang="scss">

.company{
    display: flex;
    flex-direction: column;
    padding-left: 0px;
    .company__details{
        width: 80%;
        height: 50px;
        margin-top: 20px;
        margin-left: 10%;

        display: flex;
        background-color: red;
    }
}

@media only screen and (min-width: 1000px){
    .company{
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        gap: 50px 0px;
        
    }

}

</style>