<!--
////////////////////////////////////////////
//     WEB-APP - search -  [id].vue page     //
////////////////////////////////////////////
TEMPLATE
1. Load header and lateral "bar menues"
2. Load the FilmDetailsComponent component
3. Setup the circular progress to show the preliminary

SCRIPT
1. Import the required data types from libraries: ref and onMounted from vue
1b.Import the Film type from the web-app
2. Define and initialise variables film and {id}
3. onMounted event handler to load the data that are specified in loadData function
4. loadData calls loadFilm loads the the detailed data of the specific film that match with the specific {id} 
-->

<template>
  <!--1. Load header and lateral "bar menues"-->
  <PostHeaderBarComponent />
  <LateralMenuComponent />
  <br>

  <!--2. Load the FilmDetailsComponent component, which provides the details of a specific film that match with the "film" passed as parameter.
  v-if avoid the FilmDetailsComponent component to show anything until the "film" object has been initialised (before was null and would generate an error)
  -->
  <FilmDetailsComponent v-if="film" :film="film"></FilmDetailsComponent>

  <!--3. Setup the circular progress animated gif to show the preliminary status of the images while those are loaded-->
  <v-progress-circular indeterminate v-else></v-progress-circular>
</template>

<script setup lang="ts">

//1. Import the required data types from libraries: ref and onMounted from vue
import { ref, onMounted } from 'vue'

//film will allocate the details a the specific filtered film
const film = ref(null)
//{id} variable is defined and initialised with the value provided in the url query param that is invoked when the user click on a film, in the FilmListComponent (goToFilm() method). 
// useRoute method is used to get the url. useRoute is a Vue native method that can be used when using {} variables.
// Note, the id needs to be indicated with {} nomenclature, to indicate vue that comes from the selection performed in the index.vue page. 
const { id } = useRoute().params

//3. onMounted event handler to load the detailed data of the specific film that match with the specific {id} 
// onMounted and onBeforeMounted are event handlers that can be captured before the components are loaded in the web page. Similarly onDestroyed/onBeforeDestroyed after the components are loaded.
//The load of the data needs to be done during onMounted event, to allow the page to be loaded quickly, while the application fetch the data, and the data are showed in the screen.
//Skeletons are used to occupy space in the GUI, while application fetch data. Once data are loaded, the component replace skeleton with the data, without movement in the GUI.   
onMounted(loadData)

//4. loadData calls loadFilm that loads the the detailed data of the specific film that match with the specific {id} 
async function loadData() {
  loadFilm()
}

async function loadFilm() {
  //Fetch the specific film details. Note: delays on the request and response are managed by web-app using async and await
  //"async" is stablished in the function, while "await" is indicated in the fetch method. 
  const response = await fetch("http://localhost:5000/films/" + id)
  const data = await response.json()
  //Initialise the film object with the details of the film that match with the identification
  film.value = data
}

</script>