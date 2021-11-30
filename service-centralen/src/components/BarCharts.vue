<template>
 <div><input type="text" v-model="searchNumber" v-on:keyup.enter="computeByCustomerNumber "/></div>
</template>

<script>
export default {
    name:"BarCharts",
    data(){
        return{
          invoices: this.$store.getters.getCompanyPurchases,
          searchNumber: ""
        }

    },
    computed:{
        customerStatistics(){
            return this.invoices
        }
    },
    methods: {
        computeByCustomerNumber(){
            const result = [];
            for(var i = 0; i < this.invoices.length; i++){
                var el = this.invoices[i];
                const year = el.date.toString().trim().substring(6,10);
                if(el.companyId == this.searchNumber){
                    if(!result.some(invoice => invoice.year == year)){
                        result.push({year: year, price: el.price })
                    }
                    const elementPos = result.map((x) => {return x.year; }).indexOf(year);

                    if(result.some(invoice => invoice.year == year)){
                        result[elementPos].price += el.price

                    }


                }
            }
            console.log(result)
        }
    }
}
</script>