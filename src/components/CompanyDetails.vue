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
            <div class="offer__selection">
                <select class="offerSelection" @change="offerElected" v-model="selectedOffer">
                    <option v-bind:value="{title: offer.Title, description: offer.Description, fromDate: offer.FromDate, toDate: offer.ToDate}"  v-for="offer in offers" :key="offer.companyId">
                        {{offer.Title}}
                    </option>
                </select>
                <div class="offer-menu" v-for="offer in selectedOffers" :key="offer.Title">
                    <div class="offer-menu__title">
                        <p>{{offer.title}}</p>
                        <p class="delete-item" v-on:click="removeOffer(offer)"> X</p>
                    </diV>
                    <div class="offer-menu__description">
                         <p>{{offer.description}}</p>
                    </diV>
                    <div class="offer-menu__dates">
                         <p>Fra: {{offer.fromDate}}</p>
                         <p>Til: {{offer.toDate}}</p>
                    </diV>
                </div>
            </div>

            <div class="offer__list">
                 <div v-for="offer in companyOffers" :key="offer._id">
                        {{offer.Title}}
                 </div>
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
                    <form class="email-modal__form">
                    <label class="email-modal__label" for="target-email-id">Email</label>
                    <input
                        class="email-modal__input"
                        name="target-email-id"
                        placeholder="email@email.com"
                        type="email"
                        v-model="emailId"
                        v-on:keyup="updateOutputUrl"
                    />
                    <label class="email-modal__label" for="subject">Subject</label>
                    <input
                        class="email-modal__input"
                        name="subject"
                        placeholder="subject"
                        type="text"
                        v-model="email.subject"
                        v-on:keyup="updateOutputUrl"
                    />
                    <label class="email-modal__label" for="body">Body</label>
                    <textarea
                        class="email-modal__textarea"
                        name="body"
                        placeholder="Body"
                        type="text"
                        v-model="email.body"
                        v-on:keyup="updateOutputUrl"
                    ></textarea>
                    <input type="hidden" id="final-link-to-copy" :value="outputUrl" />
                    </form>
                    <button class="email-modal__button--send" @click="sendEmail">Send email</button>
                    <button class="email-modal__button--cancel" @click="showEmail = false">Cancel</button>
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
            selectedOffers: [],
            companyOffers: []
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
       this.$store.dispatch("GET_COMPANIES");

        var companies = this.$store.getters.getCompanies;
        //iterate through companies
        for(var i = 0; i < companies.length; i++){
            //find the current company
            if(companies[i].CompanyId == this.choosenCompany.companyId){
                //get the offers from said company
                this.companyOffers = companies[i].offers;
            }
        }
       
    },
    methods: {
        closeModal(){
            this.$emit("closeCompanyDetails");
        },
        sendEmail(){
            window.open(this.outputUrl);
            //iterate through the companies
            let companyId = ""
            this.$store.getters.getCompanies.forEach(element => {
                //find the company where the id matches that of the chosen company
                if(element.CompanyId == this.choosenCompany.companyId){
                    //set the id from that database
                    companyId = element.id
                }
            });
            let offerIds = []
            //iterate through the offers
            this.offers.forEach(element => {
                //if it finds the offers in the slected offers array, tag da ID'et og tilføj det til offer id arrayet
                //this is to get the ids for the database update
                if(this.selectedOffers.filter(e => e.title === element.Title).length > 0 ){
                   offerIds.push(element._id);
                }
                //if it finds the offer in the company offers array, ad this to the offer ids as well
                //this is so that the old data won't be overwritten in the update
                if(this.companyOffers.filter(e => e.Title === element.Title).length > 0 ){
                    offerIds.push(element._id);
                }
            });   

            const updatedCompany = {id: companyId, offer: offerIds}
            this.$store.dispatch("UPDATE_COMPANY", updatedCompany)
        },
        offerElected(){
           //check that the selected offer hasn't already been given
           if(!this.selectedOffers.includes(this.selectedOffer)){
               this.selectedOffers.push(this.selectedOffer);
           }
        },
        removeOffer(offer){
            //remove an offer from the selected offers array
            this.selectedOffers.forEach(element =>{
                var index = this.selectedOffers.indexOf(offer)
                if(offer == element){
                    this.selectedOffers.splice(index, 1)
                }
            })
        },
        openEmailWindow(){
            //create the email body and title
            this.showEmail = true;
            let title = "Vi har et tilbud til jer"
            let body = "Vi vil gerne tilbyde jer følgende tilbud:"
            //iterate through the selected offers and add them to the email body
            this.selectedOffers.forEach(element =>{
                body += "\n " + element.title + "\n    " + element.description + "\n fra: " + element.fromDate+ " til: " + element.toDate+ "\n"
            })
            this.email.body = body;
            this.email.subject = title;
            

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