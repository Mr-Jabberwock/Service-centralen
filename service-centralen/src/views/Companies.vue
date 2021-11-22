<template>
<div>
    <Header />
    <div>
        <input type="file" @change="uploadedFile" />
    </div>
    <ul :style="gridStyle" class="company">
        <li v-for="company in toBeShown" :key="company" class="company__details">
            <p>Comapny {{company.company}}</p>
            <p> {{company.amount}}</p>
        </li>
    </ul>
    <div>
        <button class="load-button" @click="increasePage">Indlæs 8 mere</button>
    </div>
</div>
</template>

<script>
import Header from "../components/Header.vue"
import XLSX from "xlsx"
export default{
   name: 'Companies',
   data(){
       return{
           companies: [],
           currentPage: 1,
           file: ""
       }
   },
   components: {
      Header
   },
   computed: {
       toBeShown(){
           return this.companies.slice(0, this.currentPage * 4)
       }
   },
   methods: {
       increasePage(){
           this.currentPage++
       },
       uploadedFile(event){
           this.file = event.target.files[0]
           const reader = new FileReader();
           reader.onload = (e) => {
                /* Parse data */
                const bstr = e.target.result;
                const wb = XLSX.read(bstr, { type: 'binary' });
                
                /* Get first worksheet */
                const wsname = wb.SheetNames[0];
                const ws = wb.Sheets[wsname];
                /* Convert array of arrays */
                const data = XLSX.utils.sheet_to_json(ws, { header: 1 });
                
                var objs = data.map(function(x) { 
                    return { 
                        company: x[0], 
                        amount: x[1] 
                    }; 
                });
                console.log(objs);
                this.companies = objs

            }  
           reader.readAsBinaryString(this.file);
        
       }
   }
}
</script>

<style lang="scss">

.company{
    display: flex;
    flex-direction: column;
    padding-left: 0px;
    .company__details{
        width: 80%;
        height: 50px;
        margin-top: 20px;
        margin-left: 10%;

        display: flex;
        background-color: red;
    }
}

.load-button{
    width: 80%;
    height: 50px;
}

@media only screen and (min-width: 1000px){
    .company{
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        gap: 50px 0px;
        
    }

    .load-button{
        width: 90%;
        margin-top: 100px;
    }

}

</style>