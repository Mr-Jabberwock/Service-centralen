<template>
    <div class="editOffer">
        <h2>Rediger tilbud</h2>
        <div class="editOffer__searchfield">
            <h2>Title</h2>
            <input v-model="title" type="text">
        </div>
        {{offer.Title}}
        <div class="editOffer__dates">
            <div>
                <h2>Fra:</h2>
                <input v-model="fromDate" type="date">
            </div>
            <div>
                <h2>Til:</h2>
                <input v-model="toDate" type="date">
            </div>
        </div>

        <div class="editOffer__description">
            <h2>Beskrivelse</h2>
            <textarea v-model="description" class="description__text"/>
        </div>
        <button class="saveButton" v-on:click="saveOffer()">Gem</button>
    </div>
</template>
<script>
export default{
    name: "CreateOffer",
    data(){
        return{
            title: this.offer.Title,
            description: this.offer.Description,
            fromDate: this.offer.FromDate,
            toDate: this.offer.ToDate
        }
    },
    props: {
        offer: Object
    },
    methods:{
        saveOffer(){
            var offer = {id: this.offer._id, Title: this.title, Description: this.description, FromDate: this.fromDate, ToDate: this.toDate}
            this.$store.dispatch("UPDATE_OFFER", offer)
            this.$emit("saved")
        }
       
    }
}
</script>

<style lang="scss">
@import "../assets/styles/editOffer";
</style>