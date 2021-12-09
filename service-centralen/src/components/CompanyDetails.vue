<template>
    <div class="details">
        <div class="details__wrapper">
            <div class="details__close" style="cursor:pointer;" @click="closeModal">
                &#x2715;
            </div>
            <section class="details__header">
                <div class="details__id">
                    <h1 class="details__id-text">{{choosenCompany.companyId}}</h1>
                </div>
                <div class="details__info">
                    <h1 class="details__address">{{choosenCompany.address}}</h1>
                </div>
            </section>
            <section class="details__content">
                <table class="details__data">
                    <thead class="details__head">
                        <tr>
                            <th class="year" v-for="year in choosenCompany.years" :key="year.year" >
                                {{year.year}}
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td class="spend" v-for="year in choosenCompany.years" :key="year.year">
                                {{year.amount}}
                            </td>
                        </tr>
                    </tbody>
                </table>
                <div class="last-payment">
                    <h2 class="last-payment__text">Sidste handel: {{choosenCompany.date}}</h2>
                </div>
            </section>
        </div>
    </div>
</template>
<script>
export default {
    name:'CompanyDetails',
    data(){
        return{

        }
    },
    computed: {
        choosenCompany(){
            return this.$store.getters.getCompanyObj
        }
    },
    methods: {
        closeModal(){
            this.$emit("closeCompanyDetails");
        }
    }
}
</script>