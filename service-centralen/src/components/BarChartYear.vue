<template>
 <div class="barchart-wrapper">
     <div class="chart-header">
        <h2 class="chart-header__text">Omsætning pr år</h2>
        <input type="text" v-model="searchYear" v-on:keyup.enter="computeByYear "/>
     </div>
    <GChart
      type="ColumnChart"
      :options="options"
      :data="customerStatistics"
    /> 
 </div>
</template>

<script>
import { GChart } from "vue-google-charts";
export default {
    name:"BarChartYear",
    components: {
        GChart
    },
    data(){
        return{
            currrentInvoices: this.invoices,
            searchYear: "",
            customerStatistic: [['Spend', 'Address', { role: 'style' }],
                                ['0', 0, 'black']],
            total: 0,
            options: {
                title: "",
                width: 1100,
                height: 400
            }
        }

    },
    computed:{
        customerStatistics(){
            return this.customerStatistic
        },
        invoices(){
            return this.$store.getters.getCompanyPurchases
        }
    },
    methods: {
        computeByYear(){
            let chartArray = [['Spend', 'Year', { role: 'style' }]];
            let companies = this.invoices;
            if(this.searchYear == ""){
                return this.customerStatistic = [['Spend', 'Address', { role: 'style' }],
                                ['0', 0, 'black']];
            }
            let result = [];
            let total = 0;
            for(var i = 0; i < companies.length; i++){
                var el = companies[i];
                 const year = el.date.toString().trim().substring(6,10);
                if(year == this.searchYear){
                    if(!result.some(company => company.companyId === el.companyId)){
                    result.push({ companyId: el.companyId, address: el.address, amount: 0})
                    }
                    if(result.some(company => company.companyId === el.companyId)){
                        let index = result.map((x) => {return x.companyId; }).indexOf(el.companyId);
                        result[index].amount += el.price;
                    }
                }
                
                total += el.price
            }
            for(var j = 0; j < result.length; j++){
                //var percentage = (result[j].amount / total) * 100;
                chartArray.push([result[j].address, result[j].amount, '#6B58E2'])
                
            }
            this.customerStatistic = chartArray;
            console.log(total)
            console.log(this.customerStatistic)
        }
    }
}

</script>

<style lang="scss">
@import "../assets/styles/barCharts";
</style>

