<!--
//////////////////////////////////////////////
//     WEB-APP - search - index.vue page    //
//////////////////////////////////////////////
TEMPLATE
1. Load header and lateral "bar menues"
2. Load the SearchComponent component that allows to set the query string to search films in the database
3. Load the FilmListComponent component, which provides the array of films that match with the "film" passed as parameter.

SCRIPT

-->

<script lang="ts" setup>
//1. Import the required methods ref and onMounted from vue
import { ref, onMounted } from 'vue'

//2. Define and initialise variables 
const items = ['Title', 'Genre', 'Actor', 'Year', 'Director', 'Rated Age']
const parameter = ref('Title')
const input = ref('')
const showNoResult = ref(false)
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
        if (films.value.length === 0)
            showNoResult.value = true
        else
            showNoResult.value = false
    }
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
    <!--1. Load header and lateral "bar menues"  -->
    <PostHeaderBarComponent />
    <LateralMenuComponent />

    <!--
  1.-Select the query parameter (i.e., Title, Genre, Director, Year, Age rating)
  2.-getSearchResult. Once user click to search, it is compounded the query string and the request to REST API in back-app is called
  3.-Show the film list in a single FilmListComponent  
  -->
    <!--1.-Select the query parameter (i.e., Title, Genre, Director, Year, Age rating)-->
    <!--
    <v-row justify="center" class="mt-4">
        <v-col cols="1" class="d-flex align-center">
            <v-tooltip interactive>
                <template v-slot:activator="{ props }">
                    <v-btn icon="mdi-information-outline" variant="text" v-bind="props" />
                </template>

<div style="max-width: 350px;">
    <a class="text-primary font-weight-medium"> Learn how to search in What2Watch:</a><br>
    For title, actor or director, just introduce a text string and click the magnify glasses to
    search.<br><br>
    To search by genres, write any of the following: Action, Comedy, Documentary, Drama, Fantasy,
    Horror,
    Romance.<br><br>
    Rated age is the content rating systems for films and television. To search by rated age, write any
    of the
    following: <br>
    - PG-13 warns that some material may be inappropriate for children under 13.<br>
    - R means content is unsuitable for those under 17 without an accompanying parent or guardian.<br>
    - TV-14 suggests content is unsuitable for children under 14.<br>
    - TV-MA indicates content designed for adults.
</div>
</v-tooltip>
</v-col>
-->
    <v-row justify="center" class="mt-4">
        <!-- Parameter select -->
        <v-col cols="2" class="d-flex align-center">
            <v-select v-model="parameter" :items="items" return-object density="comfortable" rounded variant="solo"
                hide-details single-line style="max-width: 150px;" @update:modelValue="input = ''" />
        </v-col>

        <!-- Search input (depends on parameter) -->
        <v-col cols="3" class="d-flex align-center">
            <v-text-field v-if="['Title', 'Year', 'Director', 'Actor'].includes(parameter)" :loading="loading"
                append-inner-icon="mdi-magnify" class="md-1" density="comfortable" v-model="input" type="text"
                placeholder="Search What2Watch" variant="solo" hide-details single-line style="max-width: 350px;"
                rounded @click:append-inner="getSearchResult()" />

            <v-select v-else-if="parameter === 'Genre'" v-model="input"
                :items="['Action', 'Comedy', 'Documentary', 'Drama', 'Fantasy', 'Horror', 'Romance']"
                append-inner-icon="mdi-magnify" @click:append-inner="getSearchResult()" return-object
                density="comfortable" rounded variant="solo" hide-details single-line style="max-width: 150px;" />

            <v-select v-else v-model="input" :items="['PG-13', 'R', 'TV-14', 'TV-MA']" append-inner-icon="mdi-magnify"
                @click:append-inner="getSearchResult()" return-object density="comfortable" rounded variant="solo"
                hide-details single-line style="max-width: 150px;" />
        </v-col>
           <v-col cols="1" class="d-flex align-center">
            <v-tooltip interactive>
                <template v-slot:activator="{ props }">
                    <v-btn icon="mdi-information-outline" variant="text" v-bind="props" />
                </template>

                <div style="max-width: 350px;">
                    <a class="text-primary font-weight-medium"> Learn how to search in What2Watch:</a><br>
                    For title, actor or director, just introduce a text string and click the magnify glasses to
                    search.<br><br>
                    To search by genres, write any of the following: Action, Comedy, Documentary, Drama, Fantasy,
                    Horror,
                    Romance.<br><br>
                    Rated age is the content rating systems for films and television. To search by rated age, write any
                    of the
                    following: <br>
                    - PG-13 warns that some material may be inappropriate for children under 13.<br>
                    - R means content is unsuitable for those under 17 without an accompanying parent or guardian.<br>
                    - TV-14 suggests content is unsuitable for children under 14.<br>
                    - TV-MA indicates content designed for adults.
                </div>
            </v-tooltip>
        </v-col>    
    </v-row>


    <!--4.-Show the film list in a single FilmListComponent, if results exist -->
    <FilmListComponent v-if="films && films.length" title="Search results" :films="films"> </FilmListComponent>
    <!-- Show a card if films array is empty -->
    <v-card v-if="showNoResult" class="ma-4 pa-1 text-center" color="secondary" elevation="2">
        <v-card-title class="text-h6">
            No results found
        </v-card-title>
        <v-card-subtitle>
            Try another search term or parameter.
        </v-card-subtitle>
    </v-card>
</template>