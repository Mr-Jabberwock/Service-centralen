<template>
 <div class="barchart-wrapper">
     <div class="chart-header">
        <h2 class="chart-header__text">Individuelle</h2>
        <input type="text" v-model="searchNumber" v-on:keyup.enter="computeByCustomerNumber "/>
     </div>
     <!-- {{total}} -->
     <!-- <div class="barchart">
            <p class="y-axis__text">indtægt</p>
            <ul class="barchart__sidebar">
                    <li style="height: 20%">{{total}}</li>
                    <li style="height: 20%">{{total / 100 * 80}}</li>
                    <li style="height: 20%">{{total / 100 * 60}}</li>
                    <li style="height: 20%">{{total / 100 * 40}}</li>
                    <li style="height: 20%">{{total / 100 * 20}}</li>
                    <li style="height: 0%">0</li>

            </ul>
            <div class="x-axis">
             <ul class="barcontainer">
                 <div class="barContainer__bars"  v-for="element in customerStatistics" :key="element.year">
                     <li class='bar' :style="{height: element.percentage + '%'}" scope="row" > 
                        <div >{{element.price}}</div>
                     </li>
                     <li class="year">
                         <div>{{element.year}}</div>
                     </li>
                 </div>
             </ul>
             <p class="x-axis__text">år</p>
            </div>
    
     </div> -->
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
            customerStatistic: [['Spend', 'Year', { role: 'style' }],
                                ['0', 0, 'black']],
            total: 0,
            options: {
                title: "Individuelle",
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
        computeByCustomerNumber(){
            const result = [];
            let chartArray = [['Spend', 'Year', { role: 'style' }]];
            let total = 0;
            for(var i = 0; i < this.invoices.length; i++){
                var el = this.invoices[i];
                const year = el.date.toString().trim().substring(6,10);
                if(el.companyId == this.searchNumber){
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
        }
    }
}

</script>

<style lang="scss">
@import "../assets/styles/barCharts";
</style>

