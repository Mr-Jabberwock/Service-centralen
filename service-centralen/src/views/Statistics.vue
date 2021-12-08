<template>
    <div>
        <Header />
        <h1>Statistics</h1>
        <div class="numbercharts">
            <BarCharts search="number" />
            <PieChart />
        </div>
        <div class="yearcharts">
            <BarCharts search="year" />
            <PieChart search=false />
        </div>
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
