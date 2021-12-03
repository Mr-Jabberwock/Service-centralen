<template>
    <div>
        <Header />
        <h1>Statistics</h1>
        <BarCharts />
        <button @click="logCompanyPurchases">Companies</button>
        <PieChart :data="chartData" :options="chartOptions"></PieChart>
    </div>
</template>

<script>
import Header from '../components/Header.vue'
import BarCharts from '../components/BarCharts.vue'
import PieChart from '../PieChart.js'


export default {
    name:"Statistics",
    components: {
        Header,
        BarCharts,
        PieChart
    },
    data(){
        return{
            chartOptions: {
                hoverBorderWidth: 20
            },
            chartData: {
                hoverBackgroundColor: "red",
                hoverBorderWidth: 10,
                labels: this.companiesTotalAmount.address,
                datasets: [
                {
                    label: "Pie Chart",
                    backgroundColor: ['#1E9600', '#99C802', '#FFF200', '#F89403'],
                    data: this.companiesTotalAmount.amount
                }
                ]
            }
        }
    },
    methods:{
        logCompanyPurchases(){
            console.log(this.companiesTotalAmount);
        }
    },
    computed:{
        companyPurchases(){
            return this.$store.getters.getCompanyPurchases; 
        },
        companiesTotalAmount(){
            let companies = this.$store.getters.getCompanyPurchases;

            let result = [];

            for(var i = 0; i < companies.length; i++){
                var el = companies[i];
                if(!result.some(company => company.companyId === el.companyId)){
                    result.push({ companyId: el.companyId, address: el.address, amount: 0})
                }
                if(result.some(company => company.companyId === el.companyId)){
                    let index = result.map((x) => {return x.companyId; }).indexOf(el.companyId);
                    result[index].amount += el.price;
                }
            }

            return result;
        }
    }
}

</script>
