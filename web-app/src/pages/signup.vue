<!--
//////////////////////////////////////
//     WEB-APP - signup.vue page    //
//////////////////////////////////////
TEMPLATE
1. Load header "bar menu"
2. Load the SignUpComponent component that allows the user to access the sign up page

SCRIPT
N/A
-->
<script lang="ts" setup>
// 
</script>

<template>
  <PreHeaderBarComponent/>
  <v-container>
    <v-row>
      <v-col class="d-flex justify-center pa-2 position-relative rounded-lg ma-2">
        <v-card
          class="py-5 font-weight-black"
          prepend-icon="mdi-movie-search"
          title="Sign-up to What2Watch"
          subtitle="Please, introduce your personal account details to sign-up to What2Watch"
          width="600"
          height="390">
          <SignUpComponent/>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>