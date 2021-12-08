<template>
    <div>
        <Header />
        <h1>Statistics</h1>
        <BarCharts search="number" />
        <BarCharts search="year" />
        <PieChart />
        <PieChart search=false />
    </div>
</template>

<script>
import Header from '../components/Header.vue'
import BarCharts from '../components/BarCharts.vue'
import PieChart from '../components/PieChart.vue'


export default {
    name:"Statistics",
    components: {
        Header,
        BarCharts,
        PieChart
    }
}

</script>
