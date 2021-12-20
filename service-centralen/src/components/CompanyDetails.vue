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
        <button @click="showEmail = true">Send offer</button>
        <transition name="email-fade" appear>
            <div class="email-overlay" 
                v-if="showEmail" 
                @click="showEmail = false"></div>
        </transition>
        <transition name="email-pop" appear>
            <div class="email-modal" 
                v-if="showEmail" >              
                    <form>
                    <label for="target-email-id">Target Email ID</label>
                    <input
                        name="target-email-id"
                        placeholder="Target Email ID"
                        type="email"
                        v-model="emailId"
                        v-on:keyup="updateOutputUrl"
                    />
                    <label for="subject">Subject</label>
                    <input
                        name="subject"
                        placeholder="Subject"
                        type="text"
                        v-model="email.subject"
                        v-on:keyup="updateOutputUrl"
                    />
                    <label for="body">Body</label>
                    <textarea
                        name="body"
                        placeholder="Body"
                        type="text"
                        v-model="email.body"
                        v-on:keyup="updateOutputUrl"
                    ></textarea>
                    <input type="hidden" id="final-link-to-copy" :value="outputUrl" />
                    </form>
                    <button @click="sendEmail">Send email</button>
                    <button @click="showEmail = false">Cancel</button>
                </div>
        </transition>
    </div>
</template>
<script>

export default {
    name:'CompanyDetails',
    data(){
        return{
            outputUrl: "Type something",
            emailId: "",
            email: {
                subject: "",
                body: ""
            },
            showEmail: false
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
        },
        sendEmail(){
            window.open(this.outputUrl);
        },
        updateOutputUrl() {
            this.outputUrl = "mailto:" + this.emailId;
            const emailKeys = Object.keys(this.email);
            const remaining = emailKeys.filter(
                (key) => this.email[key].trim().length > 0
            );
            if (remaining.length > 0) {
                this.outputUrl += "?";
            }
            this.outputUrl += remaining
                .map((key) => `${key}=${encodeURI(this.email[key].trim())}`)
                .join("&");
        }
    },
    created() {
        this.updateOutputUrl();
    }
}
</script>