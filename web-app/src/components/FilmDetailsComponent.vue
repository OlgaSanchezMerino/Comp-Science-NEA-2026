<!--
///////////////////////////////////////////////////////
//     WEB-APP - FilmDetailsComponent component      //
///////////////////////////////////////////////////////
TEMPLATE
1. Show the information of the film and the rating function. Additionally, buttons to Save and Back to the home (or search) page are provided
1a. Show the information of the film: Title, Director, Year, Genre (array), rated, Actors (array)
1b. Show the rating function. It calls the Vue rating component which is set up with 5 levels showed with stars that user can select to provide a rating of the film. 
2. Shows the button to Back and Save. 
2a. Save button is initially disabled as the rating is zero. onSave click, it calls the save method that saves the rating in the review database
2b.- Back button is initially enabled. onBack click it calls the goBack method that allows user to back to the home (or search) page
2c.-A Vue snackbar component is loaded. It is a small message that informs the user that the rating has been done 
and dissapears automatically after a certaing amount of time

SCRIPT
1. Import the required object router from router
1b.Import the Film, Review, User and GenreSelection types from the web-app
2. Define the following variables: rating, snackbar, text and timeout that will be used in the template section
3. Define the array of films variable, which will be passed/injected as parameters in the call to FilmDetailsComponent method, 
As it needs to be used in the script section, it needs to be defined the props variable that will get the value of the parameter
4. Define the function goBack that force the browser to navigate to the previous URL (use the object router)
5. Save the rating and the user's genre in database. 
-->
<script lang="ts" setup>
//1. Import the required object router from router and ref from Vue
import router from '@/router';
import { ref } from 'vue'
import { useUserStore } from '@/stores/user'

//1b.Import the Film and Review types from the web-app
import type { Film } from '@/types/models/film';
import type { Review } from '@/types/models/review';
import type { User } from '@/types/models/user';
import type { GenreSelection } from '@/types/models/genre';
import { useScrollStrategies } from 'vuetify/lib/components/VOverlay/scrollStrategies.mjs';

//2. Define the rating variable that will be used in the Template section (Vue rating component) to allocate the content of the rating provided by the user
const rating = ref(0)
let snackbar = ref(false)
const text = ref('You review has been already saved. Please, click back to come back to the previous page.')
const timeout = ref(2000)
const userStore = useUserStore()

//3. Define the array of films variable, which will be passed/injected as parameters in the call to FilmDetailsComponent method, 
//As it needs to be used in the script section, it needs to be defined the props variable that will get the value of the parameter
const props = defineProps<{
    film: Film,
}>()

//4. Define the function goBack that force the browser to navigate to the previous URL (use the object router)
function goBack() {
    router.back()
}

/*
5. Save the rating and the user's genre in database.*/
//5.1 It allows to save the rating of the film in the reviews table of the what2watch databe of MongoDB. 
// Additionally, the genre of that movie is saved in the user attribute, favGenres. 
// Save methods is called on Save button click.
async function saveReview() {
    //Create a review object (of the Type Review) and initialise it calling the constructor with the corresponding parametres
    //Note that some parameters came from the FilmDetailsComponent parameters (props)
    const review: Review = {
        //user: "68408ff70fa7ba7414dcb363", //session.userId // TODO change this to get from session
        user: userStore.user._id,
        film: props.film._id,
        rating: rating.value,
    }
    await fetch("http://localhost:5000/reviews", {
        method: "POST",
        body: JSON.stringify(review),
        headers: { "Content-Type": "application/json" }
    })

    //In the back-app, the review REST API,
    //Add Review. Create a review object with parameter and insert it in the MongoDB 
    //Update (PATCH) the user's favGenres in the user table of MongoDB
    //Once the review has been added and the user has been updated in the DB, we need to refresh the userStore
    userStore.refreshFavGenres() // userStore.syncrhonizeFavGenres()

    //Initialise the rating again to zero and snackbar control
    rating.value = 0
    snackbar.value = true 
}
</script>

<template>
    <v-sheet class=" text-center mx-auto" elevation="2" px-2 text-body-2height="450" width="97%" rounded>
        <v-container>
            <!--1. Show the information of the film and the rating function. Additionally, buttons to Save and Back to the home (or search) page are provided -->
            <p class="text-h4 text-center"> Details of the selected film <br></p>
            <p class="text-h8 text-center">These are the details for the selected film in What2Whatch</p>
            <!--1a. Show the information of the film: Title, Director, Year, Genre (array), rated, Actors (array)-->
            <v-row no-gutters>
                <v-col>
                    <v-sheet class="pa-2 ma-2"> 
                        <v-text-field label="Title" :model-value="film.title" readonly density="compact"></v-text-field> 
                    </v-sheet>
                </v-col>
                <v-col>
                    <v-sheet class="pa-2 ma-2"> 
                        <v-text-field label="Director" :model-value="film.director" readonly density="compact"></v-text-field> 
                    </v-sheet>
                </v-col>
            </v-row>
            <v-row no-gutters>
                <v-col>
                    <v-sheet class="pa-2 ma-2"> 
                        <v-text-field label="Year" :model-value="film.year" readonly density="compact"></v-text-field> 
                    </v-sheet>
                </v-col>
                <v-col>
                    <v-sheet class="pa-2 ma-2"> 
                        <v-text-field label="Genre" :model-value="film.genre.join(', ')" readonly density="compact"></v-text-field>
                    </v-sheet>
                </v-col>
                <v-col>
                    <v-sheet class="pa-2 ma-2"> <v-text-field label="Rated" :model-value="film.rated" readonly density="compact"></v-text-field> 
                    </v-sheet>
                </v-col>
            </v-row>
            <v-row no-gutters>
                <v-col>
                    <v-sheet class="pa-2 ma-2"> 
                        <v-text-field label="Actors" :model-value="film.actors.join(', ')" readonly density="compact"></v-text-field> 
                    </v-sheet>
                </v-col>
            </v-row>
            <v-spacer></v-spacer>

            <!--1b. Show the rating function. It calls the Vue rating component, which is set up with 5 levels showed, with stars, that user can select to provide a rating of the film.
                The selection value is stored in the variable rating that was defined in the script-->
            <v-row>
                <v-col>
                    <v-sheet class="pa-4 ma-2 text-center" elevation="1" px-2 text-body-2 width="97%">
                        <v-rating v-model="rating" :item-labels="['Awfull', '', '', '', 'Great']" class="ma-1" size="large" item-label-position="top"></v-rating>
                    </v-sheet>
                </v-col>
            </v-row>

            <!--2. Shows the button to Back and Save. 
                2a. Save button is initially disabled as the rating is zero. onSave click, it calls the save method that saves the rating in the review database
                2b.- Back button is initially enabled. onBack click it calls the goBack method that allows user to back to the home (or search) page-->
            <v-row no-gutters>
                <v-col cols="2" offset="3">
                    <v-btn prepend-icon="mdi-arrow-left-circle" class="text-none mb-4" color="deep-purple-lighten-2" size="x-large" text="Back" border @click="goBack"></v-btn>
                </v-col>
                <v-col cols="2" offset="2">
                    <v-btn :disabled="rating === 0" prepend-icon="mdi-check-circle" class="text-none mb-4"
                        color="deep-purple-lighten-1" size="x-large" text="Save" border @click="saveReview"
                        variant="flat"></v-btn>
                    <!--2c.-A Vue snackbar component is loaded. It is a small message that informs the user that the rating has been done 
                    and dissapears automatically after a certaing amount of time-->
                    <v-snackbar v-model="snackbar" :timeout="timeout">
                        {{ text }}
                        <template v-slot:actions>
                            <v-btn color="blue" variant="text" @click="snackbar = false">
                                Close
                            </v-btn>
                        </template>
                    </v-snackbar>
                </v-col>
            </v-row>
        </v-container>
    </v-sheet>
</template>