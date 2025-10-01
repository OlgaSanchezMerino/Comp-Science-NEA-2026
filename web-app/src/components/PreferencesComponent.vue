<!--
///////////////////////////////////////////////////////
//     WEB-APP - PreferencesComponent component      //
///////////////////////////////////////////////////////
TEMPLATE
1. Shows Preferred Genres and Diagram of Preferences, in the two columns of the same row
1a. Preferred Genres. Load the detail information about the favourite genres of the user in a table that shows Genre/Number of rating/Percentage
1b. Diagram of Preferences. At the moment, only loads an image that shows a mock of a pie chart.
The pie chart have three attributes Fantasy, Action and Drama which have the corresponding percentages associated 50.0%, 25.0% and 25.0% resepectively.

SCRIPT
1. Import the required data type GenreSelection
2. Define the array of the genres which will be passed/injected as a parameter in the call to PreferencesComponent method, so it can be used in the template section
-->
<script setup lang="ts">
//1. Import the required data type GenreSelection
import type { GenreSelection } from '@/types/models/genre';
//const model = ref(null)

//2. Define the array of the genres which will be passed/injected as a parameter in the call to PreferencesComponent method, so it can be used in the template section
defineProps<{
  genres: GenreSelection[],
}>()
</script>

<template>
  <!--1. Shows Preferred Genres and Diagram of Preferences, in the two columns of the same row    -->  
  <v-row>
    <!--1a. Preferred Genres. Load the detail information about the favourite genres of the user in a table that shows Genre/Number of rating/Percentage-->   
    <v-col>
      <v-sheet class="d-flex align-center justify-center flex-wrap text-center mx-auto px-4" elevation="4" height="240"
        width="90%" rounded>
        <v-container>
          <p class="text-h4 text-center"> Preferred Genres <br></p>
          <v-table class="border-md" height="170" fixed-header density="compact">
            <thead>
              <tr>
                <th class="text-center text-body-1"> Genre </th>
                <th class="text-center text-body-1"> Number of ratings </th>
                <th class="text-center text-body-1"> Percentage </th>
              </tr>
            </thead>
            <tbody class="text-center text-black text-body-2">
              <tr v-for="genre in genres" :key="genre.genre">
                <td>{{ genre.genre }}</td>
                <td>{{ genre.numRating }}</td>
                <td>{{ genre.percentage.toFixed(2) }}</td>
              </tr>
            </tbody>
          </v-table>
        </v-container>
      </v-sheet>
    </v-col>

    <!--1b. Diagram of Preferences. At the moment, only loads an image that shows a mock of a pie chart.
    The pie chart have three attributes Fantasy, Action and Drama which have the corresponding percentages associated 50.0%, 25.0% and 25.0% resepectively.
    -->  
    <v-col>
      <v-sheet class="d-flex align-center justify-center flex-wrap text-center mx-auto px-4" elevation="4" height="240"
        max-width="800" width="90%" rounded>
        <p class="text-h4 text-center"> Diagram of Preferences <br></p>
        <v-sheet class="d-flex align-center justify-center flex-wrap text-center mx-auto px-4" elevation="4"
          height="180" width="100%" rounded>
          <v-img height="180" width="100" aspect-ratio="3" src="@/assets/Pie chart 50 25 25 example.png"></v-img>
        </v-sheet>
      </v-sheet>
    </v-col>
  </v-row>
</template>