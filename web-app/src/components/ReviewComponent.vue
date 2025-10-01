<!--
////////////////////////////////////////////////////
//     WEB-APP - reviewComponent.vue component    //
////////////////////////////////////////////////////
TEMPLATE
1. Show the detailed information of the user: Name, Last name, Username, password, email and Favourite genre. Read only.
2. A button allows user to go back

SCRIPT
1. Import the required object router from router and ref from Vue
1b.Import the Review type from the web-app
2. Define the following variables: 
3. Define the array of reviews variable, which will be passed/injected as parameters in the call to ReviewComponent method, so it can be used in the template section 
-->

<script setup lang="ts">
import type { Review } from '@/types/models/review';
import { ref } from 'vue'

//Inject the array of reviews structures, so it can be used in the template section
defineProps<{
    reviews: Review[],
}>()


</script>

<template>
    <v-sheet class="d-flex justify-center flex-wrap text-center mx-auto px-4" elevation="4" height="480"
        width="100%" rounded>
        <v-container>
            <p class="text-h4 text-center"> My Activity <br></p>
            <p class="text-h8 text-center">This is your activity in What2Whatch</p>
            <v-table fixed-header class="border-md" height="270" density="compact"  >
                <thead>
                    <tr>
                        <th class="text-left text-body-1">Date</th>
                        <th class="text-left text-body-1">Title</th>
                        <th class="text-left text-body-1">Genre</th>
                        <th class="text-left text-body-1">Rating</th>                       
                    </tr>
                </thead>
                <tbody class="text-left text-black text-body-2">
                    <tr v-for="review in reviews" :key="review._id">

                        <td>{{ new Date(review.createdAt).toLocaleDateString()}}</td>
                        <td>{{ review.film.title }}</td>
                        <td>{{ review.user.favGenres[0].genre }}</td>
                        <td>{{ review.rating }}</td>
                    </tr>
                </tbody>
            </v-table>
        </v-container>
    </v-sheet>
</template>
