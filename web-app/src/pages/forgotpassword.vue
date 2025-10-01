<!--
//////////////////////////////////////////////
//     WEB-APP - forgotPassword.vue page    //
//////////////////////////////////////////////
TEMPLATE
1. Load header "bar menu"
2. Load the ForgotPasswordComponent component that provides the user indication on how to reset his/her password

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
          title="Reset your password to What2Watch"
          subtitle="This page provides you indication to reset your password"
          width="700"
          height="280"
        >
          <ForgotPasswordComponent/>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts" setup>
// 

</script>
