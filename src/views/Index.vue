<template>

<div class="container">

  <div class="row d-flex justify-content-between mt-5">
    
    <div class="col-lg-6 mb-4">
      <div class="search-container ml-5 mr-4">
        <i class="fas fa-search search-icon"></i>
        <input type="text" class="search-input" placeholder="Search for a country...." v-model="searchKey" @input="fetchData()">
      </div>
    </div>
  
    <div class="col-lg-6 d-flex justify-content-lg-end">
      <div class="select">
        <select class=" element" id="inlineFormCustomSelectPref" v-model="region" @change="fetchData(region)">
            <option selected value="0">Filter by region</option>
            <option value="africa">Africa</option>
            <option value="america">America</option>
            <option value="asia">Asia</option>
            <option value="europe">Europe</option>
            <option value="oceania">Oceania</option>
        </select>
      </div>
    </div>

  </div>

  <div class="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 row-cols-xl-4 mt-5">
    
    
    <div class="col mb-4" v-for="country in countries">
      <RouterLink :to="`/countries/${country.cca3}`">
        <div class="card p-0 element" style="width: 90%;">
          <img class="card-img-top" :src="country.flags.png" height="170" width="100%" alt="Card image cap">
          <div class="card-body">
            <h4>{{country.name.common}}</h4>
            <p class="card-text"><span>population:</span> {{country.population}}</p>
            <p class="card-text"><span>region:</span> {{country.region}}</p>
            <p class="card-text"><span>capital:</span> {{ country.capital ? country.capital[0] : 'Not available' }}</p>
          </div>
        </div>
      </RouterLink>
    </div>


  </div>

</div>

</template>


<script>
// import axios from 'axios';
export default {
  data(){
    return{
      loadingStatus:false,
      countries:{},
      region:0,
      searchKey:null,
    }
  },
  methods:{

		fetchData() {

			this.loadingStatus = true;

			let url = "https://restcountries.com/v3.1/all";

      if(this.region != null && this.region != 0){
        url = `https://restcountries.com/v3.1/region/${this.region}`;
      }

      if(this.searchKey != null && this.searchKey != ""){
        url = `https://restcountries.com/v3.1/name/${this.searchKey}`;
      }
      
			return axios
				.get(url)
				.then((res) => {
					console.log(res.data);
          this.countries = res.data;
					this.loadingStatus = false;
				});
		},

  },
  created(){
    
  },
  mounted(){
    this.fetchData();
  }
}
</script>


<style scoped>


*{
  font-size: 14px;
}

h4{
  font-weight: 800;
}

.search-form{
  position: relative;
}

.search-button{
  background-color: transparent;
  border: none;
  outline: none;
  position: absolute;
  left: 5px;
  
}

input{
border: none;
outline: none;
padding: 10px 20px;
border-radius: 5px;  
}

select{
  padding: 10px 20px;
  border-radius: 5px;
  border: none;
  outline: none;
  margin-left: 10px;
}

select option{
padding: 5px;
margin: 20px;
}


.search-container {
    position: relative;
    display: inline-block;
    padding-left: 10px;
    width: 100%;
  }

  .search-icon {
    position: absolute;
    top: 50%;
    left: 25px;
    transform: translateY(-50%);
  }

  .search-input {
    padding-left: 40px; 
    border-radius: 5px;
    width: 80%;
  }

  #options{

    background-color: red;


  }

</style>
