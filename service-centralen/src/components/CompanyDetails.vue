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
        <div class="offer">
            <select class="offerSelection" @change="offerElected" v-model="selectedOffer">
            <option  v-for="offer in offers" :key="offer.companyId">
                  {{offer.Title}}
            </option>
            </select>
            <div class="offerMenu" v-for="offer in selectedOffers" :key="offer">
                <p>{{offer }}</p>
                <button v-on:click="removeOffer(offer)">X</button>
            </div>
        </div>
        <div class="sendMail">
            <button class="sendMail__button" v-on:click="openEmailWindow">Gem</button>
        </div>
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
            showEmail: false,
            selectedOffer: "",
            selectedOffers: []
        }
    },
    computed: {
        choosenCompany(){
            return this.$store.getters.getCompanyObj
        },
        offers(){
            return this.$store.getters.getOffers
        }
    },
    mounted(){
    //console.log()
       this.$store.dispatch("GET_COMPANIES")
    },
    methods: {
        closeModal(){
            this.$emit("closeCompanyDetails");
        },
        sendEmail(){
            window.open(this.outputUrl);
            //
            let companyId = ""
            this.$store.getters.getCompanies.forEach(element => {
                if(element.CompanyId == this.choosenCompany.companyId){
                    companyId = element.id
                }
            });
            let offerIds = []

            this.offers.forEach(element => {
                if(this.selectedOffers.includes(element.Title) ){
                   offerIds.push(element._id);
                }
            });   

            const updatedCompany = {id: companyId, offer: offerIds}


            this.$store.dispatch("UPDATE_COMPANY", updatedCompany)
        },
        offerElected(){
           if(!this.selectedOffers.includes(this.selectedOffer)){
               this.selectedOffers.push(this.selectedOffer);
           }
        },
        removeOffer(offer){
            this.selectedOffers.forEach(element =>{
                var index = this.selectedOffers.indexOf(offer)
                if(offer == element){
                    this.selectedOffers.splice(index, 1)
                }
            })
        },
        openEmailWindow(){
            this.showEmail = true;
            let body = "Vi vil gerne tilbyde jer følgende tilbud:"
            this.selectedOffers.forEach(element =>{
                body += "\n " + element
            })
            this.email.body = body;
            

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

<style lang="scss">
@import "../assets/styles/companyDetails";
</style>