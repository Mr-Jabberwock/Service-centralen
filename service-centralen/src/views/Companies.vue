<template>
<div>
    <Header />
    <div>
        <input type="file" @change="uploadFile" />
        <select v-model="filter" @change="filterResults">
            <option>Største</option>
            <option>Mindste</option>
            <option>Røde</option>
        </select>
        <select v-model="searchYear" @change="sortByYear">
            <option>2021</option>
            <option>2020</option>
            <option>2019</option>
            <option>2018</option>
            <option>2017</option>
            <option>2016</option>
        </select>
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
    <ul  class="company">
        <li v-for="company in toBeShown" :key="company.invoice" @click="openCompany(company)">
            <div class="company__details"
                 :class="[company.price < company.year2 && company.year2 < company.year1 ? 'red' : 'green', company.price < company.year2 ? 'yellow' : 'green']"
                  
            >
                <p>Comapny {{company.address}}  </p>
                <p> {{company.price}}</p>
            </div>
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
           invoices: [],
           companies: [],
           filteredCompanies: [],
           currentPage: 1,
           file: "",
           companyOpen: false,
           filter: "",
           searchYear: 2021
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
       uploadFile(event){
           this.file = event.target.files[0]
           const reader = new FileReader();
           reader.onload = (e) => {
                /* Parse data. XLSX is an imported library */
                const binaryStr = e.target.result;
                const wordBook = XLSX.read(binaryStr, { type: 'binary' });
                
                /* Get first worksheet */
                const workSheetNames = wordBook.SheetNames[0];
                const workSheet = wordBook.Sheets[workSheetNames];
                /* Convert array of arrays */
                const data = XLSX.utils.sheet_to_json(workSheet, { header: 1 });
                
                var objs = data.map(function(x) { 
                    return { 
                        invoice: x[0], 
                        date: x[1],
                        companyId: x[2], 
                        address: x[3],
                        price: x[4] 
                    }; 
                });
                
                this.invoices = objs;

                
                this.sortByYear();  

            }  
           reader.readAsBinaryString(this.file);
        
       },
       sortByYear(){

            const result = [];

             for(var i = 0; i < this.invoices.length; i++){
                var el = this.invoices[i];
                if(!result.some(invoice => invoice.companyId === el.companyId)){
                    result.push({ invoice: el.invoice, date: el.date, companyId: el.companyId, address: el.address, price: 0, year2: 0, year1: 0 })
                }
                    
                const year = el.date.toString().substring(6,10);
                const elementPos = result.map((x) => {return x.companyId; }).indexOf(el.companyId);
                if(result.some(invoice => invoice.companyId === el.companyId)){
                    if(this.searchYear == parseInt(year)){
                        result[elementPos].price += el.price
                    }

                    if(this.searchYear -1 === parseInt(year)){
                        result[elementPos].year2 += el.price
                    }

                    if(this.searchYear -2 === parseInt(year)){
                        result[elementPos].year1 += el.price
                    }
                }        
            }

            this.companies = result 

            
       },

       filterResults(){
         
       }
   }
}
</script>

<style lang="scss">

</style>