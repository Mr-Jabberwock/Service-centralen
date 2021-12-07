<template>
    <div>
        <Header />
        <h1>Statistics</h1>
        <BarCharts />
        <PieChart />
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
