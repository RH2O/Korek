<template>

<div class="container">

<RouterLink to="/">
  <button class="element my-5 p-2"><i class="fa-solid fa-arrow-left"></i> Back</button>
</RouterLink>

<div class="row" v-if="!loadingStatus">
  <div class="col-lg-6 my-4">
    <img :src="country.flags?.svg" height="200"  class="img-fluid" alt="Belgian Flag">
  </div>

  <div class="col-lg-6 py-5">
    <h3 class="px-2">{{ country?.name?.common}}</h3>
    <div class="row d-flex justify-content-between px-2 py-5">
      <div class="col-lg-6 mb-5">
        <p><span>Native Name:</span> {{country.name?.official }}</p>
        <p><span>Population:</span> {{country.population}}</p>
        <p><span>Region:</span> {{country.region}}</p>
        <p><span>Rub Region:</span> {{country.subregion}}</p>
        <p>Capital: {{country?.capital[0]}}</p>
      </div>
      <div class="col-lg-6">
        <p><span>Top Level Domain:</span> {{country?.tld[0]}}</p>
        <div class="my-2">
          <span>Currencies:
            <span v-for="(cur,key) in country.currencies" :key="key">{{key}}</span>
          </span>
        </div>
        <span>Languages:
          <span v-for="lang in country.languages" :key="lang">{{lang}},</span>
        </span>
      </div>
    </div>
    <div class="borders px-2">
      <span>Border Countries:</span>
       <ul>
        <RouterLink v-for="(bord,i) in borders" :key="`border_${i}_${$route.fullPath}`" :to="`/countries/${bord.cca3}`">
          <li>
            {{ bord.name.common}}
          </li>
        </RouterLink>
       </ul>
    </div>
  </div>

</div>

</div>

</template>

<script>
// import axios from 'axios';
export default {
    data() {
        return {
            loadingStatus: false,
            country: {},
            borders: {},
        };
    },
    methods: {
        fetchData() {
            this.loadingStatus = true;
            var countryId = this.$route.params.id;
            // alert(countryId)
            let url = `https://restcountries.com/v3.1/alpha/${countryId}`;
            return axios
                .get(url)
                .then((res) => {
                console.log(res.data);
                this.country = res.data ? res.data[0] : null;
                this.loadingStatus = false;
                this.fetchBorders()
            });
        },

        fetchBorders() {
            this.loadingStatus = true;
            let codes = this.country.borders;
            let codesString = '';
            
            if (Array.isArray(codes) && codes.length > 0) {
                codesString = codes.join(',');
            }else{
              this.loadingStatus = false;
              return true;
            }
                        
            let url = `https://restcountries.com/v3.1/alpha?codes=${codesString}`;
            // alert(url);
            return axios
                .get(url)
                .then((res) => {
                console.log(res.data);
                this.borders = res.data ? res.data : null;
                this.loadingStatus = false;
            });
        },
    },
    created() {
        this.fetchData();
    },

    watch: {
    $route(to, from) {
      // Force re-render when the route changes
      this.$forceUpdate();
    },
  },
}
</script>


<style scoped>


.borders{
  display: flex;
  justify-content: space-evenly;
}

ul{
  list-style-type: none;
  display: flex;
  justify-content: space-around;
  padding: 0;
  /* padding-top: 10px; */
}

ul li{

  text-decoration: none;
  /* display: flex; */
  padding: 4px 15px;
  /* margin-inline: 8px ; */
  margin-bottom: 5px;
  font-size: 14px;
  list-style-type: none;
  margin-inline: 2px;
}

.borders span {
  /* float: left; */
  /* display: flex; */
}

@media screen and (max-width:600px) {

.borders{
  display: block;
}

.borders span {
  float: none;
  margin-bottom: 10px;
}

ul li {
  float: none;
}

ul{
    padding-top: 20px;
}

}

button{
  border-radius: 4px;
  border: none;
  outline: none;
  padding: 2px 20px;
}

span{
  font-weight: 500;
  font-size: 16px;
}

</style>
