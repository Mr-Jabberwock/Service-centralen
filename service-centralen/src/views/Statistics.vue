<template>
    <div>
        <Header />
        <h1>Statistics</h1>
        <BarCharts />
    </div>
</template>

<script>
import Header from '../components/Header.vue'
import BarCharts from '../components/BarCharts.vue'

export default {
    name:"Statistics",
    components: {
        Header,
        BarCharts
    }
}
</script>
