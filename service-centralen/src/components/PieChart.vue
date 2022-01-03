<template>
<div class="piechart">
    <div class="piechart__header">
        <div class="piechart-header__content">
            <h3 class="piechart-header__text"  v-show="search === false">Opdeling af adresser overordnet</h3>
            <h3 class="piechart-header__text" v-show="search !== false">Opdeling af adresser i bestemt år</h3>
            <input class="piechart-header__input" v-show="search !== false" v-model="searchYear" type="text" v-on:keyup.enter="companiesByYear" />
        </div>
    </div>
    <GChart
      type="PieChart"
      :options="options"
      :data="data"
    />  
</div>
</template>

<script>
import { GChart } from "vue-google-charts";
export default{
    name: 'PieChart',
    components: {
    GChart
    },
    data() {
    return {
        data: [
          ['Daily Routine', 'Hours per Day'],   
        ],
        options: {
            width: 600,
            height: 400,
            backgroundColor: { fill:'transparent' }
        },
        searchYear: ""
    };
   },
   props:{
      search: Boolean
   },
   computed:{
       allCompanies(){
           return this.$store.getters.getCompanyPurchases;
       }
   },
    methods:{
        companiesByYear(){
            this.data = [['Daily Routine', 'Hours per Day']]
            let companies = this.allCompanies;

            let result = [];
            let total = 0;
            for(var i = 0; i < companies.length; i++){
                var el = companies[i];
                 const year = el.date.toString().trim().substring(6,10);
                if(year == this.searchYear){
                    if(!result.some(company => company.companyId === el.companyId)){
                    result.push({ companyId: el.companyId, address: el.address, amount: 0, ancle: 0})
                    }
                    if(result.some(company => company.companyId === el.companyId)){
                        let index = result.map((x) => {return x.companyId; }).indexOf(el.companyId);
                        result[index].amount += el.price;
                    }
                }
                
                total += el.price
            }
            result.sort(function(a, b) {return a.amount - b.amount});
            for(var j = 0; j < 10; j++){
                //var percentage = (result[j].amount / total) * 100;
                this.data.push([result[j].address, result[j].amount])
                
            }
            console.log(total)
            console.log(this.data)
        },
        computedTotalAmounts(){
            
            let companies = this.$store.getters.getCompanyPurchases;

            let result = [];
            for(var i = 0; i < companies.length; i++){
                var el = companies[i];
                if(!result.some(company => company.companyId === el.companyId)){
                    result.push({ companyId: el.companyId, address: el.address, amount: 0})
                    }
                if(result.some(company => company.companyId === el.companyId)){
                    let index = result.map((x) => {return x.companyId; }).indexOf(el.companyId);
                    result[index].amount += el.price;
                }
            }
            result.sort(function(a, b) {return a.amount - b.amount});
            for(var j = 0; j < 10; j++){
                this.data.push([result[j].address, result[j].amount])
            }
        }
    },
    created(){
        if(this.search == false){
            this.computedTotalAmounts();
        }
    }
}

</script>
<style lang="scss">
@import "../assets/styles/pieCharts";
</style>