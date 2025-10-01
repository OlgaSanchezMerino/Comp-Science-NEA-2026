<!--
///////////////////////////////////////////////////
//     WEB-APP - ForgotPasswordComponent component      //
///////////////////////////////////////////////////
TEMPLATE
    1. A button allows user to go to login page
    2. A button allows user to go to sign up forgotpassword page
-->
<template>

  <v-card-text class="bg-surface-light pt-4">
    Please, email info@what2watch.com with the subject forgot password to reset your password.
  </v-card-text>

  <v-btn append-icon="mdi-account-circle" prepend-icon="mdi-login" class="text-none mb-4" color="deep-purple-lighten-2"
    size="x-large" text="Log in to your account" border block to="/login">
  </v-btn>
  <v-divider></v-divider>
  
  <v-btn append-icon="mdi-account-circle" prepend-icon="mdi-check-circle" class="text-none mb-4"
    color="deep-purple-lighten-2" size="x-large" text="Sign up" border block to="/signup">
  </v-btn>
</template>