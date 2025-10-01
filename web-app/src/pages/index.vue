<!--
//////////////////////////////////////////////
//     WEB-APP - index.vue page   (CURRENT) //
//////////////////////////////////////////////
TEMPLATE
1. Load header "bar menu"
2. Load the IndexComponent component that allows the user to access the welcome page of the application

SCRIPT
N/A
-->
<template>
  <PreHeaderBarComponent/>
  <v-container>
    <v-row>
      <v-col class="d-flex justify-center pa-2 position-relative rounded-lg ma-2">
        <v-card
          class="py-5 font-weight-black"
          prepend-icon="mdi-movie-search"
          title="Welcome to What2Watch"
          subtitle="The #1 films rating website"
          width="600"
          height="300">
          <IndexComponent/>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts" setup>
  // 

</script>
