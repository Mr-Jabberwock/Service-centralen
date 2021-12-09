<template>
    <div class="statistics">
        <Header />
        <h1>Statistics</h1>
        <div class="statistics__wrapper">
            <div class="numbercharts">
                <BarCharts search="number" />
                <PieChart />
            </div>
            <div class="yearcharts">
                <BarCharts search="year" />
                <PieChart search=false />
            </div>
        </div>
        <!-- <Footer class="footer" /> -->
    </div>
</template>

<script>
import Header from '../components/Header.vue'
import BarCharts from '../components/BarCharts.vue'
import PieChart from '../components/PieChart.vue'
// import Footer from "../components/Footer.vue"

export default {
    name:"Statistics",
    components: {
        Header,
        BarCharts,
        PieChart
        // ,
        // Footer
    },
    created(){
        if(this.$store.getters.getPage == "statistics"){
            document.body.style.backgroundPositionY = "260px"
        }
    }
}

</script>
