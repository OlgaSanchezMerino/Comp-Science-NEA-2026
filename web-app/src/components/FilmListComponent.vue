<!--
////////////////////////////////////////////////////
//     WEB-APP - FilmListComponent component      //
////////////////////////////////////////////////////
TEMPLATE
1. Shows a list of films in a Vue slide group component
  1a. Load a Vue slide-group component that is used to display pseudo paginated information and that will allow to allocate the films in a horizontal carrusel mode.
  1b. Load as much Vue slide-group-items component as films in the films array
  1c. Creates a Vue card component within every Vue slide-group-items component
  1d. Shows the information of every film object in the Vue card element. Note goToFilm is set to handler the onClick event

SCRIPT
1. Import the required objects ref from vue, and router from router
1b.Import the Film type from the web-app
3. Define the array of films and the title variables, which will be passed/injected as parameters in the call to FilmListComponent method, so it can be used in the template section
4. Define the function goToFilm(film:Film) that force the browser to navigate into a new URL that is built to show the page with the datailed information of a specific film
-->
<script setup lang="ts">
//1. Import the required objects ref from vue, and router from router
import { ref } from 'vue'
import router from '@/router';
//1b.Import the Film type from the web-app
import type { Film } from '@/types/models/film';

//2. Define the model variable that will require in the Template section to allocate the content of the 
//const model = ref(null)

//3. Define the parameters that will received from the call: array of films and the title variables, which will be passed/injected as parameters in the call to FilmListComponent method, so it can be used in the template section
defineProps<{
  films: Film[],
  title: string,
}>()

//4. goToFilm(film:Film) function
//It calls the home/id page, in which the detailed information of the film is showed as well as the rating function. 
//It is based on a specifc mechanism of the Vue framework. It is performed pushing a new URL into the browser with the "entity._id".
//It forces the browser to navigate into a new URL. The new URL concatenates strings for the base URL, plus the identificator of the film
//It works for both, router.push("/home/"+ film.id) and router.push("/search/"+ film.id)  
function goToFilm(film: Film) {
  const url = window.location.href.split("/")
  router.push("/"+ url[3] + "/"+ film._id)
}
</script>

<template>
  <v-row>
    <p><br></p>
  </v-row>
  <!--1. Shows a list of films in a Vue slide group component-->
  <v-sheet class="mx-auto align-center justify-center flex-wrap px-2 text-body-2" elevation="4" height="300" width="97%"
    rounded>
    <p class="text-h4 text-left"> {{ title }} films ({{ films.length }})</p>
    <!--1a. Load a Vue slide group component that will allow to allocate the films in a carrusel mode-->
    <v-slide-group v-model="model" class="mx-auto" width="400" show-arrows>
      <!--1b. Load as much Vue slide-group-items elements as films in the films array, and shows the information of every of them in a Vue card element -->
      <v-slide-group-item v-for="film in films" :key="film.title">
        <!--1c. Shows the information of every of them in a Vue card element. Note goToFilm is set to handler the onClick event -->
        <v-card @click="goToFilm(film)" class="mx-auto" color="grey-lighten-1" height="210" width="150">

          <div class="pa-2 align-self-start">
            <v-scale-transition>
              <v-img :src="film.images?film.images[0] : ''" cover height="100">
                <template v-slot:placeholder>
                  <div class="d-flex align-center justify-center fill-height">
                    <v-progress-circular color="grey-lighten-4" indeterminate></v-progress-circular>
                  </div>
                </template>
              </v-img><br>              
            </v-scale-transition>
            <v-card-tile> Title: {{ film.title }} </v-card-tile><br>
            <v-card-subtile> Year: {{ film.year }} </v-card-subtile><br>
            <v-card-subtile> Rating: {{ film.imdbRating }} </v-card-subtile>
          </div>
        </v-card>
      </v-slide-group-item>
    </v-slide-group>
  </v-sheet>
</template>