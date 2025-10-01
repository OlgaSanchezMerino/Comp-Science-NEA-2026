<!--
////////////////////////////////////////////////////////
//     WEB-APP - LateralMenuComponent component      //
////////////////////////////////////////////////////////
TEMPLATE
1. Load the Vuetify navigation-drawer component that contains Vuetify list component which includes the
icons that lead into the following menu options: Home, Search, My Reviews, My Profile 
BEsides that, an avatar and identification of the user is showed.

SCRIPT
//1. Import the useUserStore library
//2. Create the userStore object
-->
<script setup lang="ts">
//1. Import the useUserStore library
import { useUserStore } from '@/stores/user'
//2. Create the userStore object
const userStore = useUserStore()

</script>

<template>
  <v-navigation-drawer
    expand-on-hover
    rail>
    <v-list>
      <v-list-item
        prepend-avatar="@/assets/Avatar.png"
        :subtitle= "userStore.user.username"
        title="Profile"
      ></v-list-item>
    </v-list>

    <v-divider></v-divider>

    <v-list density="compact" nav>
      <v-list-item prepend-icon="mdi-home" title="Home" value="Home" to="/home"></v-list-item>
      <v-list-item prepend-icon="mdi-magnify" title="Search" value="Search" to="/search"></v-list-item>
      <v-list-item prepend-icon="mdi-pen" title="My Reviews" value="My Reviews" to="/review"></v-list-item>
      <v-list-item prepend-icon="mdi-account" title="My Profile" value="My Profile" to="/profile"></v-list-item>
    </v-list>
  </v-navigation-drawer>
</template>