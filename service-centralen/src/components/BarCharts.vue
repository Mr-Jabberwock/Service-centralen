<template>
 <div class="barchart">
     <div class="barchart__header">
         <div class="barchart-header__content">
            <h3 v-if="search === 'number'" class="barchart-header__text">Omsætning i bestemt adresse</h3>
            <h3 v-if="search === 'year'" class="barchart-header__text">Omsætning i bestemt år</h3>
            <input class="barchart-header__input" v-if="search === 'number'" type="text" v-model="searchAddress" v-on:keyup.enter="computeByCustomerAddress "/>
            <input class="barchart-header__input" v-if="search === 'year'" type="text" v-model="searchYear" v-on:keyup.enter="computeByYear "/>
         </div>
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
            searchAddress: "",
            searchYear: "",
            customerStatistic: [],
            total: 0,
            options: {
                title: "",
                width: 600,
                height: 400,
                backgroundColor: { fill:'transparent' }
            }
        }

    },
    props:{
        search: String
    },
    created() {
        if(this.search === 'number'){
            this.customerStatistic = [['Spend', 'Year', { role: 'style' }],
                                    ['0', 0, 'black']]
        }
        if(this.search === 'year'){
            this.customerStatistic = [['Spend', 'Address', { role: 'style' }],
                    ['0', 0, 'black']]
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
        computeByCustomerAddress(){
            if(this.searchAddress == ""){
                return this.customerStatistic = [['Spend', 'Year', { role: 'style' }],
                                ['0', 0, 'black']];
            }
            const result = [];
            let chartArray = [];
            let total = 0;

            for(var i = 0; i < this.invoices.length; i++){
                var el = this.invoices[i];
                const year = el.date.toString().trim().substring(6,10);
                if(el.address == this.searchAddress){
                    this.options.title = el.address + " omsætning pr. år";
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

            }

            console.log("array",result[0]);
            for(let j = 0; j < 10; j++){
                if(result[j] != null){
                    chartArray.push([result[j].year, result[j].price, '#6B58E2'])
                }
            }
            chartArray.reverse();
            console.log("ChartArray: ", chartArray);
            chartArray.unshift(['Spend', 'Year', { role: 'style' }]);
            this.customerStatistic = chartArray;
        },
        computeByYear(){
            let chartArray = [];
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
                    this.options.title = "Omsætning i år " + this.searchYear;
                    if(!result.some(company => company.companyId === el.companyId)){
                    result.push({ companyId: el.companyId, address: el.address, amount: 0})
                    }
                    if(result.some(company => company.companyId === el.companyId)){
                        let index = result.map((x) => {return x.companyId; }).indexOf(el.companyId);
                        result[index].amount += el.price;
                    }
                }
            }
            result.sort(function(a, b) {return a.amount - b.amount});
            for(let j = 0; j < 10; j++){
                if(result[j] != null){
                    chartArray.push([result[j].address, result[j].amount, '#6B58E2'])
                }
            }
            chartArray.reverse();
            console.log("ChartArray: ", chartArray);
            chartArray.unshift(['Spend', 'Address', { role: 'style' }]);
            this.customerStatistic = chartArray;
            console.log(this.searchYear, chartArray)
        }
    }
}

</script>

<style lang="scss">
@import "../assets/styles/barCharts";
</style>

