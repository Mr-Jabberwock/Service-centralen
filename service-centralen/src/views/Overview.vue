<template>
<div>
    <Header />
    <overview-table />
</div>
</template>

<script>
import Header from '../components/Header.vue'
import OverviewTable from '../components/OverviewTable.vue'
export default{
    name: 'Overview',
    components:{
        Header,
        OverviewTable
    }
}
</script>