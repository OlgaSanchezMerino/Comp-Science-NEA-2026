<!--
///////////////////////////////////////////////////
//     WEB-APP - ProfileComponent component      //
///////////////////////////////////////////////////
TEMPLATE
1. Show the Vuetify Select component with the option to search, that will be the key of the pair (key, value) in the query string
2. Text-field to allow user to write a free text that will be the value of the pair (key, value) in the query string.

SCRIPT
1. Import the required object router from router and ref from Vue
2. Define the following variables
3. loadData and loadFilms
4. Define the function "showSearchResult" that compose the querystring and look for films that match that criteria
-->
<script setup lang="ts">
//1. Import the required methods ref and onMounted from vue
import { ref, onMounted } from 'vue'

//2. Define and initialise variables 
const items = ['Title', 'Genre', 'Actor', 'Year', 'Director', 'Rated Age']
const parameter = ref('Title')
const input = ref('')
const loading = ref(false)
const films = ref([])

//3. loadData calls loadFilms and loadUsers that load the films with first genre Fantasy, Drama and Action, as well as the users array.
async function loadFilms(str) {
  let response;
  switch (parameter.value) {
    case 'Title':
      response = await fetch("http://localhost:5000/films?" + "t=" + str)
      break;
    case "Genre":
      response = await fetch("http://localhost:5000/films?" + "g=" + str)
      break;
    case "Actor":
      response = await fetch("http://localhost:5000/films?" + "a=" + str)
      break;
    case "Year":
      response = await fetch("http://localhost:5000/films?" + "y=" + str)
      break;
    case "Director":
      response = await fetch("http://localhost:5000/films?" + "d=" + str)
      break;
    case "Rated Age":
      response = await fetch("http://localhost:5000/films?" + "r=" + str)
      break;
  }

  if (response) {
    const data = await response.json()
    films.value = data
  }
  //else -> A message should be shown to the user, informing no results were found for that search

}

//4.- getSerarchResult
async function getSearchResult() {
  /*
    0.- Show preliminary message in the field-text control
    1.- loadFilms. It is a method that search the films that match the criteria
  */

  /*  0.- Show preliminary message in the field-text control*/
  loading.value = true
  const str = input.value
  input.value = 'Wait for it...'
  //1.- loadFilms. It is a method that search the films that match the criteria, and update the global variable, films
  await loadFilms(str)

  loading.value = false
  input.value = str
}

</script>

<template>
  <!--
  1.-Select the query parameter (i.e., Title, Genre, Director, Year, Age rating)
  2.-Introduce free-text in the edit box (i.e., text-field component)
  3.-getSearchResult. Once user click to search, it is compounded the query string and the request to REST API in back-app is called
  4.-Show the film list in a single FilmListComponent  
  -->
  <!--1.-Select the query parameter (i.e., Title, Genre, Director, Year, Age rating)-->
  <v-row justify="center">
    <v-col cols="2" offset="2" class="mt-4" height="10" width="80%" rounded>
      <!--1. Show the Vuetify Select component with the option to search, that will be the key of the pair (key, value) in the query string-->
      <v-select v-model="parameter" :items="items" return-object density="comfortable" rounded variant="solo"
        hide-details single-line style="max-width: 150px;"></v-select>

    </v-col>
    <!--2.-Introduce free-text in the edit box (i.e., text-field component)
        3.-getSearchResult
          3.1.-Compound the query string. Once the user click on the search button, the query string needs to be created ("parameter=value")
          3.2.-Request to REST API in back-app, to collect from Mongo Atlas the films that meet the criteria
    -->
    <v-col cols="6" class="mt-4" height="10" width="80%" rounded>
      <!--2. Text-field to allow user to write a free text that will be the value of the pair (key, value) in the query string.-->
      <v-text-field :loading="loading" append-inner-icon="mdi-magnify" class="md-1" density="comfortable"
        v-model="input" type="text" placeholder="Search What2Watch" variant="solo" hide-details single-line
        style="max-width: 350px;" rounded @click:append-inner="getSearchResult()">
      </v-text-field>
    </v-col>
  </v-row>

  <!--4.-Show the film list in a single FilmListComponent -->
  <FilmListComponent v-if="films && films.length" title="Search results" :films="films"> </FilmListComponent>
</template>
