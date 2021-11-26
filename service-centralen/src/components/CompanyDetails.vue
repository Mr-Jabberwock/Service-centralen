<template>
    <div class="details">
        <div class="details__wrapper">

            <section class="details__header">
                <div class="close" style="cursor:pointer;" @click="closeModal">
                    &#x2715;
                </div>
                <div class="details__id">
                    {{choosenCompany.companyId}}
                </div>
                <div class="details__info">
                    {{choosenCompany.address}}
                </div>
            </section>
            <section class="details__content">
                <table>
                    <!-- <thead>
                        <tr>

                        </tr>
                    </thead> -->
                    <tbody>
                        <tr v-for="year in choosenCompany.years" :key="year.year">
                            <th class="year">
                                {{year.year}}
                            </th>
                            <td class="spend">
                                {{year.amount}}
                            </td>
                        </tr>
                    </tbody>
                </table>
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