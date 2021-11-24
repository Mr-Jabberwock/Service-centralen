<template>
    <div class="details">
        <div class="details__wrapper">

            <section class="details__header">
                <div class="details__id">
                </div>
                <div class="details__info">
                    {{choosenCompany.name}}
                    {{choosenCompany.amount}}
                </div>
            </section>
            <section class="details__content">
                <table>
                    <thead>
                        <tr>

                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <th class="year">

                            </th>
                            <td class="spend">

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
    }
}
</script>