<template>
<div class="companies">
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
                <option v-for="year in years" :key="year">{{year}}</option>
                
            </select>
            <input class="import-filter__search" type="text" v-model="search" v-on:input="searchFilter"/>
        </div>
    </div>
    <transition name="pop" appear>
        <div class="modal" role="dialog">
            <CompanyDetails :key="componentKey" :class="[{visible: companyOpen}]" @closeCompanyDetails="companyOpen = false"></CompanyDetails>
        </div>
    </transition>
    <transition name="fade" appear>
        <div class="modal-overlay" 
            v-show="companyOpen" 
            @click="companyOpen = false">
        </div>
    </transition>    
    <div class="company-view">
        <ul  class="company">
         <li v-for="company in toBeShown" :key="company.invoice" @click="openCompany(company)">
            <div class="company__details"
                 :class="[company.price < company.year2 && company.year2 < company.year1 ? 'red' : 'green',
                 company.price < company.year2 ? 'yellow' : 'green']"
                  
            >
                <p class="company__address">Firma {{company.address}}  </p>
                <p class="company__amount"> {{company.price}}</p>
            </div>
        </li>
        
    </ul>
    <div class="show-more">
        <button class="load-button" @click="increasePage">Indlæs 4 mere</button>
    </div>
    
    </div>

</div>
</template>

<script>
import Header from "../components/Header.vue"
import XLSX from "xlsx"
import CompanyDetails from "../components/CompanyDetails.vue"
// import Footer from "../components/Footer.vue"
export default{
   name: 'Companies',
   data(){
       return{
           invoices: this.$store.getters.getCompanyPurchases,
           companies: [],
           filteredCompanies: [],
           currentPage: 1,
           file: "",
           filter: "Største",
           companyOpen: false,
           searchYear: "2021",
           search: "",
           years: [],
           componentKey: 0
       }
   },
   components: {
      Header,
      CompanyDetails
    //   ,
    //   Footer
   },
   computed: {
       toBeShown(){
           //return the calculated amount of entries to be shown
           return this.companies.slice(0, this.currentPage * 4)
       }
   },
    created(){
    if(this.$store.getters.getPage == ""){
        document.body.style.backgroundPositionY = "200px"
    }

    //sort by year as a default
    this.sortByYear();
   
    },
   methods: {
       openCompany(obj){
           this.$store.commit("SET_COMPANY_OBJECT", obj);
           this.$store.dispatch("GET_COMPANIES");
           this.companyOpen = true;
           
           this.componentKey += 1;
       },
       increasePage(){
           //increase amount of entries shown
           this.currentPage++
       },
       uploadFile(event){
           this.file = event.target.files[0]
           const reader = new FileReader();
           reader.onload = (e) => {
                //Parse data. XLSX is an imported library 
                const binaryStr = e.target.result;
                const wordBook = XLSX.read(binaryStr, { type: 'binary' });
                
                // Get first worksheet 
                const workSheetNames = wordBook.SheetNames[0];
                const workSheet = wordBook.Sheets[workSheetNames];

                // Convert array of arrays 
                const data = XLSX.utils.sheet_to_json(workSheet, { header: 1 });
                
                //convert array of arrays to array of objects
                var objs = data.map((x) => { 
                    return { 
                        invoice: x[0], 
                        date: x[1],
                        companyId: x[2], 
                        address: x[3],
                        price: x[4] 
                    }; 
                });
                
                this.invoices = objs;
                this.$store.commit("SET_COMPANY_PURCHASES", objs);
                this.$store.dispatch("GET_OFFERS")
                
                //sort by year as a default
                this.sortByYear();  

            }  
           reader.readAsBinaryString(this.file);
        
       },
       sortByYear(){

            const result = [];
             //iterate throught invoices
             for(var i = 0; i < this.invoices.length; i++){
                var el = this.invoices[i];
                //if the company id is new, add it to the result array
                if(!result.some(invoice => invoice.companyId === el.companyId)){
                    result.push({ invoice: el.invoice, date: el.date, companyId: el.companyId, address: el.address, price: 0, year2: 0, year1: 0, years:[]
                    })
                }
                
                //get the year from the date of each invoice
                const year = el.date.toString().trim().substring(6,10);
                //if the is new add it to the years array
                if(!this.years.some(searchYear => year === searchYear)){
                    this.years.push(year)
                }
                
                //get the element position
                const elementPos = result.map((x) => {return x.companyId; }).indexOf(el.companyId);
                //if the company id already exists in the result array, add to the sum of the respective years
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
                    }
                    else{
                        let index = result[elementPos].years.findIndex(x => x.year == year);
                        result[elementPos].years[index].amount += el.price;
                    }
                }
                
            }

            var companies = this.$store.getters.getCompanies;
            //Insert the unique companies into the Strapi database
            result.forEach((element) =>{
                if(!companies.filter(e => e.CompanyId == element.companyId.toString()).length > 0){
                    this.$store.dispatch("CREATE_COMPANY", {CompanyId: element.companyId.toString(), Address: element.address })
                }
                element.years.reverse()
               //
            })

            //set the companies for iteration
            this.companies = result;
            
            //set a filter on the results. The default is to filter by largest entries
            this.filterResults();

            
       },
       filterResults(){
           //filter by smallest entries
           if(this.filter == "Mindste"){
               this.companies.sort((a,b) => a.price - b.price);
           }
           //filter by largest
           if(this.filter == "Største"){
               this.companies.sort((a,b) => b.price - a.price);
           }
           //filter by red entries
           if(this.filter == "Røde"){
               this.companies.sort((a) =>{
                   if(a.price < a.year2 && a.year2 < a.year1) return -1
               })
           }
         
       },
       searchFilter(){
           //start out by sorting by out the invoice entries
           this.sortByYear();
           //search entries by address
           this.companies = this.companies.filter(company => {
              return company.address.includes(this.search)
           })
       }
   }
}
</script>

<style lang="scss">
@import "../assets/styles/companies";
</style>