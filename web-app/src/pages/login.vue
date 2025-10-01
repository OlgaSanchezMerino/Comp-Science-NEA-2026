<!--
//////////////////////////////////////////////
//     WEB-APP - login.vue page             //
//////////////////////////////////////////////
TEMPLATE
1. Load header "bar menu"
2. Load the LogInComponent component that allows the user to access the login page

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
          title="Log-in to What2Watch"
          subtitle="Please, introduce your user name and your password to log-in to What2Watch"
          width="600"
          height="366">
          <LogInComponent/>
        </v-card>
      </v-col>
    </v-row>
  </v-container>  
</template>

<script lang="ts" setup>
// 
</script>