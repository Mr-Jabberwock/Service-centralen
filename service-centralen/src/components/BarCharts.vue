<template>
 <div class="barchart-wrapper">
     <div class="chart-header">
        <input v-if="search === 'number'" type="text" v-model="searchNumber" v-on:keyup.enter="computeByCustomerNumber "/>
        <input v-if="search === 'year'" type="text" v-model="searchYear" v-on:keyup.enter="computeByYear "/>
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
    name:"BarCharts",
    components: {
        GChart
    },
    data(){
        return{
            currrentInvoices: this.invoices,
            searchNumber: "",
            searchYear: "",
            customerStatistic: [['Spend', 'Year', { role: 'style' }],
                                ['0', 0, 'black']],
            total: 0,
            options: {
                title: "",
                width: 1100,
                height: 400
            }
        }

    },
    props:{
        search: String
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
        computeByCustomerNumber(){
            if(this.searchNumber == ""){
                return this.customerStatistic = [['Spend', 'Year', { role: 'style' }],
                                ['0', 0, 'black']];
            }
            const result = [];
            let chartArray = [['Spend', 'Year', { role: 'style' }]];
            let total = 0;
            for(var i = 0; i < this.invoices.length; i++){
                var el = this.invoices[i];
                const year = el.date.toString().trim().substring(6,10);
                if(el.companyId == this.searchNumber){
                    this.options.title = el.companyId + " omsætning pr. år";
                    if(!result.some(invoice => invoice.year == year)){
                        result.push({year: year, price: el.price})
                    }
                    const elementPos = result.map((x) => {return x.year; }).indexOf(year);

                    if(result.some(invoice => invoice.year == year)){
                        result[elementPos].price += el.price
                        total += el.price;
                    }


                }

                this.total = total;

                // if(i == this.invoices.length -1){
                    
                //     for(var j = 0; j < result.length; j++){
                //         var percentage = (result[j].price / total) * 100;
                //         result[j].percentage = percentage.toFixed(0)
                //     }
                // }
            }
            result.forEach(element => {
                chartArray.push([element.year, element.price, '#6B58E2'])
            });
            this.customerStatistic = chartArray;
        },
        computeByYear(){
            let chartArray = [['Spend', 'Address', { role: 'style' }]];
            let companies = this.invoices;
            if(this.searchYear == ""){
                return this.customerStatistic = [['Spend', 'Address', { role: 'style' }],
                                ['0', 0, 'black']];
            }
            let result = [];
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
            }
            for(var j = 0; j < result.length; j++){
                console.log([result[j].address, result[j].amount, '#6B58E2'])
                chartArray.push([result[j].address, result[j].amount, '#6B58E2'])
                
            }
            this.customerStatistic = chartArray;
            console.log(chartArray)
        }
    }
}

</script>

<style lang="scss">
@import "../assets/styles/barCharts";
</style>

