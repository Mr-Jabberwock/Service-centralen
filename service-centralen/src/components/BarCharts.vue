<template>
 <div>
     {{total}}
     <input type="text" v-model="searchNumber" v-on:keyup.enter="computeByCustomerNumber "/>
     <div class="barchart">
        
            <ul class="barchart__sidebar">
                    <li style="height: 20%">{{total}}</li>
                    <li style="height: 20%">{{total / 100 * 80}}</li>
                    <li style="height: 20%">{{total / 100 * 60}}</li>
                    <li style="height: 20%">{{total / 100 * 40}}</li>
                    <li style="height: 20%">{{total / 100 * 20}}</li>
                    <li style="height: 0%">0</li>

            </ul>
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
    
     </div>
 </div>
</template>

<script>
export default {
    name:"BarCharts",
    data(){
        return{
          invoices: this.$store.getters.getCompanyPurchases,
          searchNumber: "",
          customerStatistic: "",
          total: 0
        }

    },
    computed:{
        customerStatistics(){
            return this.customerStatistic
        }
    },
    methods: {
        computeByCustomerNumber(){
            const result = [];
            let total = 0;
            for(var i = 0; i < this.invoices.length; i++){
                var el = this.invoices[i];
                const year = el.date.toString().trim().substring(6,10);
                if(el.companyId == this.searchNumber){
                    if(!result.some(invoice => invoice.year == year)){
                        result.push({year: year, price: el.price, percentage: 0 })
                    }
                    const elementPos = result.map((x) => {return x.year; }).indexOf(year);

                    if(result.some(invoice => invoice.year == year)){
                        result[elementPos].price += el.price
                        total += el.price;
                    }


                }

                this.total = total;

                if(i == this.invoices.length -1){
                    
                    for(var j = 0; j < result.length; j++){
                        var percentage = (result[j].price / total) * 100;
                        result[j].percentage = percentage.toFixed(0)
                    }
                }
            }
            this.customerStatistic = result
        }
    }
}
</script>

<style lang="scss">
@import "../assets/styles/barCharts";
</style>