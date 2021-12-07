<template>
<div>
    <button v-on:click="companiesTotalAmount"> Click ME</button>
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
      }
    };
   },
    methods:{
        companiesTotalAmount(){
            let companies = this.$store.getters.getCompanyPurchases;

            let result = [];
            let total = 0;
            for(var i = 0; i < companies.length; i++){
                var el = companies[i];
                if(!result.some(company => company.companyId === el.companyId)){
                    result.push({ companyId: el.companyId, address: el.address, amount: 0, ancle: 0})
                }
                if(result.some(company => company.companyId === el.companyId)){
                    let index = result.map((x) => {return x.companyId; }).indexOf(el.companyId);
                    result[index].amount += el.price;
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
        }
    }
}

</script>