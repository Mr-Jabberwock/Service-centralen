<template>
<div>
    <Header />
    <div class="import-filter">
        <div class="import-filter__picker">
            <label class="upload-label">
                Upload fil
                <input type="file" @change="uploadFile" />
            </label>
            
        </div>
        <div class="import-filter__filters">
            <select class="import-filter__categories" v-model="filter" @change="filterResults">
                <option>Største</option>
                <option>Mindste</option>
                <option>Røde</option>
            </select>
            <select class="import-filter__years" v-model="searchYear" @change="sortByYear">
                <option>2021</option>
                <option>2020</option>
                <option>2019</option>
                <option>2018</option>
                <option>2017</option>
                <option>2016</option>
            </select>
            <input type="text" v-model="search" v-on:input="searchFilter"/>
        </div>
    </div>
    <transition name="pop" appear>
        <div >
            <CompanyDetails :class="[{visible: companyOpen}]" @closeCompanyDetails="companyOpen = false"></CompanyDetails>
        </div>
    </transition>
    <transition name="fade" appear>
        <div class="modal-overlay" 
            v-show="companyOpen" 
            @click="companyOpen = false">
        </div>
    </transition>    
    <ul  class="company">
         <li v-for="company in toBeShown" :key="company.invoice" @click="openCompany(company)">
            <div class="company__details"
                 :class="[company.price < company.year2 && company.year2 < company.year1 ? 'red' : 'green',
                 company.price < company.year2 ? 'yellow' : 'green']"
                  
            >
                <p>Comapny {{company.address}}  </p>
                <p> {{company.price}}</p>
            </div>
        </li>
    </ul>
    <div class="bottom-image">
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
           filter: "Største",
           companyOpen: false,
           searchYear: 2021,
           search: ""
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
                    result.push({ invoice: el.invoice, date: el.date, companyId: el.companyId, address: el.address, price: 0, year2: 0, year1: 0, years:[]
                    })
                }
                    
                const year = el.date.toString().trim().substring(6,10);
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
                    
                    var exists = result[elementPos].years.some( x => x.year === year)
                    //console.log("year: ", year);

                    if(!exists){
                        result[elementPos].years.push({year: year, amount:el.price})
                        console.log("exists: ", exists);
                    }
                    else{
                        let index = result[elementPos].years.findIndex(x => x.year == year);
                        result[elementPos].years[index].amount += el.price;
                    }
                    //console.log(result[elementPos].years);

                    // if(Object.entries(result.years).length === 0){
                    //     console.log("years is empty!");
                    //     result[elementPos].years[year] = el.price;
                    // }
                    // else{
                    //     console.log("years is not empty!");
                    //     if(!(year in result.years)){
                    //         result[elementPos].years[year] = el.price.price;
                    //     }
                    //     else{
                    //         result[elementPos].years.year += el.price;
                    //     }
                    // }
                }


            }
            

            this.companies = result 

            this.filterResults();

            
       },
       filterResults(){
           if(this.filter == "Mindste"){
               this.companies.sort((a,b) => a.price - b.price);
           }
           if(this.filter == "Største"){
               this.companies.sort((a,b) => b.price - a.price);
           }
           if(this.filter == "Røde"){
               this.companies.sort((a) =>{
                   if(a.price < a.year2 && a.year2 < a.year1) return -1
               })
           }
         
       },
       searchFilter(){
           console.log(this.companies.filter(comapny => {
               comapny.address.includes(this.search)
           }))
       }
   }
}
</script>

<style lang="scss">
@import "../assets/styles/companies";
</style>