<template>
<div>
    <Header />
    <div>
        <input type="file" @change="uploadedFile" />
    </div>
    <transition name="pop" appear>
        <div >
            <CompanyDetails :class="[{visible: companyOpen}]"></CompanyDetails>
        </div>
    </transition>
    <transition name="fade" appear>
        <div class="modal-overlay" 
            v-show="companyOpen" 
            @click="companyOpen= false">
        </div>
    </transition>
    <ul :style="gridStyle" class="company">
        <li v-for="company in toBeShown" :key="company" class="company__details" @click="openCompany(company)">
            <p>Company {{company.company}}</p>
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
import CompanyDetails from "../components/CompanyDetails.vue"
export default{
   name: 'Companies',
   data(){
       return{
           companies: [],
           currentPage: 1,
           file: "",
           companyOpen: false
       }
   },
   components: {
      Header,
      CompanyDetails
   },
   computed: {
       toBeShown(){
           return this.companies.slice(0, this.currentPage * 4)
       }
   },
   methods: {
       openCompany(obj){
           this.companyOpen = true;
           this.$store.commit("SET_COMPANY_OBJECT", obj);
           console.log(obj);
       },
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

</style>