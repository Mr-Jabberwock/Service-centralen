<template>
<div>
    <Header />
    <overview-table />
    <Footer class="footer" />
</div>
</template>

<script>
import Header from '../components/Header.vue'
import OverviewTable from '../components/OverviewTable.vue'
import Footer from "../components/Footer.vue"
export default{
    name: 'Overview',
    components:{
        Header,
        OverviewTable,
        Footer
    }
}
</script>