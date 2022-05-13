<template>
<div class="overview">
    <div class="overview__content">
        <table class="overview__table">
            <thead class="overview__head">
                <tr>
                    <th class="head-address"> Address ID</th>
                    <th class="year" v-for="year in allYears" :key="year" >
                        {{year}}
                    </th>
                </tr>
            </thead>
            <tbody class="overview__body">
                <tr class="address" v-for="address in invoices" :key="address">
                    <td class="address__id">{{address.companyId}}</td>
                    <td class="spend" v-for="amount in address.spend" :key="amount.year">
                        {{amount.amount}}
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
    <!-- {{invoices}}
    {{allYears}} -->

</div>
</template>

<script>
export default{
    name: 'OverviewTable',
    // data(){
    //     return{

    //     }
    // },
    computed:{
        invoices(){
            let invoices = this.$store.getters.getCompanyPurchases;
            const result = [];
            let year = "";
            //iterate through invoices
            for(var i = 0; i < invoices.length; i++){
                var el = invoices[i];
                 //if the result array does not contain the current companyId
                if(!result.some(company => company.companyId === el.companyId)){
                    result.push({ companyId: el.companyId, spend:[]});
                }
                //Get the year from the invoice sales date
                if(year != el.date.toString().trim().substring(6,10)){
                    year = el.date.toString().trim().substring(6,10);
                }

                const elementPos = result.map((x) => {return x.companyId; }).indexOf(el.companyId);  
                //if the result array contains the current companyId
                if(result.some(company => company.companyId === el.companyId)){
                    let currentYear = el.date.toString().trim().substring(6,10);
                    //if the year does not exist for that company id, add it 
                    if(!result[elementPos].spend.some(x => x.year == currentYear)){
                        result[elementPos].spend.push({year: currentYear, amount: el.price});
                    }
                    else{
                        //if the year does exist, sum up the price
                        let index = result[elementPos].spend.map((x) => {return x.year}).indexOf(currentYear);
                        result[elementPos].spend[index].amount += el.price;
                    }
                }
            }
            return result;
        },
        allYears(){
            let invoices = this.$store.getters.getCompanyPurchases;
            const years = [];
            //iterate through the invoices, to get a list of the years that has invoices
            invoices.forEach(element => {
                let year = element.date.toString().trim().substring(6,10);
                if(!years.some(x => x === year)){
                    years.push(year);
                }
            });
            console.log("years", years);
            return years;
        }
    }
}
</script>