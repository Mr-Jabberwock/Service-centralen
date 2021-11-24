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
    <ul  class="company">
        <li v-for="company in toBeShown" :key="company.invoice" >
            <div class="company__details"
                 :class="company.price > company.year2 ? 'yellow' : 'green'"
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
export default{
   name: 'Companies',
   data(){
       return{
           invoices: [],
           companies: [],
           filteredCompanies: [],
           currentPage: 1,
           file: "",
           filter: "",
           searchYear: 2021
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

                const result = [];
                for(var i = 0; i < this.invoices.length; i++){
                    var el = this.invoices[i];
                    if(!result.some(invoice => invoice.companyId === el.companyId)){
                        result.push({ invoice: el.invoice, date: el.date, companyId: el.companyId, address: el.address, price: 0, year2: 0, year1: 0 })
                    }
                    
                    const year = el.date.toString().substring(6,10);
                    const elementPos = result.map((x) => {return x.companyId; }).indexOf(el.companyId);
                    if(result.some(invoice => invoice.companyId === el.companyId)){
                        result[elementPos].price += el.price

                        if(this.searchYear -1 === parseInt(year)){
                            result[elementPos].year2 += el.price
                        }

                        if(this.searchYear -2 === parseInt(year)){
                            result[elementPos].year1 += el.price
                        }
                    }
                }

                console.log(result)

                this.companies = result   

            }  
           reader.readAsBinaryString(this.file);
        
       },
       sortByYear(){

            const result = [];

             for(var i = 0; i < this.invoices.length; i++){
                var el = this.invoices[i];
                if(!result.some(invoice => invoice.companyId === el.companyId)){
                    result.push({ invoice: el.invoice, date: el.date, companyId: el.companyId, address: el.address, price: 0 })
                }
                    
                const year = el.date.toString().substring(6,10);
                const elementPos = result.map((x) => {return x.companyId; }).indexOf(el.companyId);
                if(result.some(invoice => invoice.companyId === el.companyId)){
                    if(this.searchYear == year){
                        result[elementPos].price += el.price
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
        
    }
}

.green{
    background-color: green;
}

.yellow{
    background-color: yellow;
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