<template>
    <div class="newOffer">
        <h2>Tilføj tilbud</h2>

        <div class="newOffer__searchfield">
            <h2>Title</h2>
            <div>
                <input v-model="title" type="text">
                <p>*</p>
            </div>
        </div>

        <div class="dates">
            <div class="dates__from">
                <h2>Fra:</h2>
                <div>
                    <input v-model="fromDate" type="date">
                    <p>*</p>
                </div>
            </div>
            <div class="dates__to">
                <h2>Til:</h2>
                <div>
                    <input v-model="toDate" type="date">
                    <p>*</p>
                </div>
            </div>
        </div>

        <div class="newOffer__description">
            <h2>Beskrivelse</h2>
            <textarea v-model="description" class="description__text"/>
        </div>
        <div class="submit">
            <button class="submit__button" v-on:click="saveOffer()">Gem</button>
        </div>
        <p class="newOffer__warning" v-if="!everythingFilled">Udfyld felterne med den røde stjerne</p>

    </div>
</template>

<script>
export default{
    name: "CreateOffer",
    data(){
        return{
            title: "",
            description: "",
            fromDate: "",
            toDate: "",
            everythingFilled: true
        }
    },
    methods:{

        saveOffer(){
            var offer = {Title: this.title, Description: this.description, FromDate: this.fromDate, ToDate: this.toDate}//
            
            if(this.title != "" && this.fromDate != "" && this.toDate != ""){
                this.$store.dispatch("CREATE_OFFER", offer)
                this.$emit("closeCreate")
            }else{
                this.everythingFilled = false;
            }
        }
       
    }
}
</script>

<style lang="scss">
@import "../assets/styles/createOffer";
</style>