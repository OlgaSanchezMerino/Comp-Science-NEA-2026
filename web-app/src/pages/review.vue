<!--
//////////////////////////////////////
//     WEB-APP - review.vue page    //
//////////////////////////////////////
TEMPLATE
1. Load header header bar menu and lateral menu components
2. Load the ReviewComponent component that allows the user to access the sign up page

SCRIPT
1. Import the required methods ref and onMounted from vue
2. Define and initialise variables films and users
3. onMounted event handler to load the data that are specified in loadData function
4. loadData calls loadReviews that load the reviews of a user.
-->
<script lang="ts" setup>
//1. Import the required methods ref and onMounted from vue
import { ref, onMounted } from 'vue'
//import { useUserStore } from '@/stores/user'

//2. Define and initialise variables films and users
const reviewsData = ref([])
//const userStore = useUserStore()
const showNoResult = ref(false)

//3. onMounted event handler to load the data that are specified in loadData function
// onMounted and onBeforeMounted are event handlers that can be captured before the components are loaded in the web page. Similarly onDestroyed/onBeforeDestroyed after the components are loaded.
//The load of the data needs to be done during onMounted event, to allow the page to be loaded quickly, while the application fetch the data, and the data are showed in the screen.
onMounted(loadData)

//4. loadData calls loadReviews that load the reviews of a user
async function loadData() {
  loadReviews()
}

async function loadReviews() {
  //Fetch Reviews
  const response = await fetch("http://localhost:5000/reviews")
  if (response) {
    const data = await response.json()
    reviewsData.value = data
    if (reviewsData.value.length === 0)
      showNoResult.value = true
    else
      showNoResult.value = false
  }
}

//Get Genre from review
//Update UserPreferences 
//check if genre is in favgenres
//if it is in fav genres then favgenres[genre]+1
//else favgenres[genre]=1
//Then sort fav genres by value descending and return top three

</script>

<template>
  <PostHeaderBarComponent />
  <LateralMenuComponent />
  <br>
  <ReviewComponent v-if="reviewsData && reviewsData.length" :reviews="reviewsData"> </ReviewComponent>

  <!-- Show a card if reviewsData array is empty -->
  <v-card v-if="showNoResult" class="ma-4 pa-1 text-center" color="secondary" elevation="2">
    <v-card-title class="text-h6">
      No results found
    </v-card-title>
    <v-card-subtitle>
      Try another search term or parameter.
    </v-card-subtitle>
  </v-card>
</template>