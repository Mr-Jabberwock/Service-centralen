<template>
<div>
    <input v-model="searchYear" type="text" v-on:keyup.enter="companiesByYear" />
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
        width: 1100,
        height: 400
      },
      searchYear: ""
    };
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

                if(i == companies.length -1){
                    for(var j = 0; j < result.length; j++){
                        //var percentage = (result[j].amount / total) * 100;
                        this.data.push([result[j].address, result[j].amount])
                      
                    }
                }
            }
            console.log(total)
            console.log(this.data)
        }
    }
}

</script>