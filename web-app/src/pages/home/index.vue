<!--
////////////////////////////////////////////
//     WEB-APP - home - index.vue page    //
////////////////////////////////////////////
TEMPLATE
1. Load header and lateral "bar menues"
2. Load the PreferencesComponent component that provides detail information about the favourite genres of the user and shows a diagram of preferences
3. Load the FilmListComponent component, which provides the array of films that match with the "film" passed as parameter.

SCRIPT
1. Import the required objects ref and onMounted from vue
2. Define and initialise variables films and users
3. onMounted event handler to load the data that are specified in loadData function
4. loadData calls loadFilms and loadUsers that load the films with first genre Fantasy, Drama and Action, as well as the users array.
-->
<template>
  <!--{{userStore.user}}-->
    
  <!--1. Load header and lateral "bar menues"-->
  <PostHeaderBarComponent />
  <LateralMenuComponent />
  <br>

  <!--2. Load the PreferencesComponent component, which provides detailed information about the favourite genres that match with the "favGenres" array passed as parameter.
  v-if avoid the component to show anything until the "users" array has been loaded and the object is not "null" (before was null and would generate an error)
  -->
  <!--<PreferencesComponent v-if="userStore.user" :genres="userStore.user.favGenres"></PreferencesComponent>-->
  <PreferencesComponent v-if="userStore.user" :genres="userStore.user.favGenres"></PreferencesComponent>
  <!--3. Load the FilmListComponent component, which provides the array of films that match with the "film" passed as parameter.
  v-if avoid the component to show anything until the "film" array has been initialised (before was null and would generate an error)-->
  <FilmListComponent v-for="(filmList,idx) in films" :title="userStore.user.favGenres[idx].genre" :films="filmList"></FilmListComponent>
   
</template>

<script setup lang="ts">
//1. Import the required methods ref and onMounted from vue
import { ref, onMounted } from 'vue'
import { useUserStore } from '@/stores/user'


//2. Define and initialise variables films and users
const films = ref([])
const userStore = useUserStore()

//3. onMounted event handler to load the data that are specified in loadData function
// onMounted and onBeforeMounted are event handlers that can be captured before the components are loaded in the web page. Similarly onDestroyed/onBeforeDestroyed after the components are loaded.
//The load of the data needs to be done during onMounted event, to allow the page to be loaded quickly, while the application fetch the data, and the data are showed in the screen.
onMounted(loadData)

//4. loadData calls loadFilms and loadUsers that load the films with first genre Fantasy, Drama and Action, as well as the users array.
async function loadData() {
  loadAllFilms()
}

async function loadAllFilms(){
  for(const fav of userStore.user.favGenres){
    const response = await fetch("http://localhost:5000/films-favourites?g="+fav.genre)
    const data = await response.json()
    films.value.push(data)
  }
}

</script>