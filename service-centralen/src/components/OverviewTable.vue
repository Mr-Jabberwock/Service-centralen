<template>
<div>

    {{invoices}}

</div>
</template>

<script>
export default{
    name: 'OverviewTable',
    computed:{
        invoices(){
            let invoices = this.$store.getters.getCompanyPurchases
            const result = [];
            for(var i = 0; i < invoices.length; i++){
                var el = invoices[i];
                if(!result.some(company => company.companyId === el.companyId)){
                    result.push({ companyId: el.companyId, address: el.address})
                }
                
                    
                if(result.some(company => company.companyId === el.companyId)){
                    let currentYear = el.date.toString().trim().substring(6,10);

                    if(!result.some(year => year.date.toString().trim().substring(6,10) == currentYear)){
                        console.log(currentYear)
                    }
                    let index = result.map((x) => {return x.companyId; }).indexOf(el.companyId);
                    result[index].amount += el.price;
                }
            }

            return result;
        }
    }
}
</script>