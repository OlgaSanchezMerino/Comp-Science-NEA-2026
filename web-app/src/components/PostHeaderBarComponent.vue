<!--
////////////////////////////////////////////////////////
//     WEB-APP - PostHeaderBarComponent component      //
////////////////////////////////////////////////////////
TEMPLATE
1. Load the Vuetify app-bar component that has an image that lead to /home once it is clicked
Note that there should be only one HeaderBarComponent which should be managed by the user session.
If the user is not logged in, the link should take the user to login, while once the user is logged in,
the link should take the user to home.

SCRIPT
N/A-->
<template>
 <v-app-bar height="40">
   <router-link to="/home">
     <img src="@/assets/clapper02.png" height="40">
   </router-link>
  </v-app-bar>
</template>
