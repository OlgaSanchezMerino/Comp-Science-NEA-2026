<!--
///////////////////////////////////////////////////
//     WEB-APP - AppFooter component      //
///////////////////////////////////////////////////
TEMPLATE
    1. It loads a Vuetify footer component which shows the What2Watch icon, the date and the copyright of the website 
-->
<template>
  <v-footer app height="40">
    <div class="text-caption text-disabled" style="position: absolute; left: 16px;">
      <v-icon color="green-darken-2" icon="mdi-movie-search" size="large"></v-icon>
    </div>

    <div class="text-caption text-disabled" style="position: absolute; right: 16px;">
      &copy; {{ (new Date()).getFullYear() }} <span class="d-none d-sm-inline-block">What2Watch, LLC</span>
    </div>
  </v-footer>
</template>
