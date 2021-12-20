<template>
    <div class="newOffer">
        <h2>Tilføj tilbud</h2>

        <div class="newOffer__searchfield">
            <h2>Title</h2>
            <input v-model="title" type="text">
        </div>

        <div class="newOffer__dates">
            <div>
                <h2>Fra:</h2>
                <input v-model="fromDate" type="date">
            </div>
            <div>
                <h2>Til:</h2>
                <input v-model="toDate" type="date">
            </div>
        </div>

        <div class="newOffer__description">
            <h2>Beskrivelse</h2>
            <textarea v-model="description" class="description__text"/>
        </div>
        <button v-on:click="saveOffer()">Gem</button>
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
            toDate: ""
        }
    },
    methods:{

        saveOffer(){
            var offer = {Title: this.title, Description: this.description}//fromDate: this.fromDate, toDate: this.toDate
            this.$store.dispatch("CREATE_OFFER", offer)
        }
       
    }
}
</script>

<style lang="scss">
@import "../assets/styles/createOffer";
</style>