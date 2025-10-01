<!--
////////////////////////////////////////////////////
//     WEB-APP - userCustomisation.vue page    //
////////////////////////////////////////////////////
TEMPLATE
1. Load header and lateral "bar menues"
2. Load the profileCustomisationComponent component that allows to set the user's details in the database

SCRIPT
1. Import the required userStore, ref and onMounted from vue
2. Define and initialise userStore object
3. onMounted event handler to load the data that are specified in loadData function
4. loadData calls loadUsers that load the users array.
-->
<template>
  <!--1. Load header and lateral "bar menues"-->
  <PreHeaderBarComponent/>
  <br>
  
  <!--2. Load ProfileCustomisationComponent component, which provides the data of the specific user-->
  <UserCustomisationComponent v-if="userStore.user" :user="userStore.user"></UserCustomisationComponent>

</template>

<script lang="ts" setup>
//1. Import the required userStore, ref and onMounted from vue
import { ref, onMounted } from 'vue'
import { useUserStore } from '@/stores/user'

//2. Define and initialise variables films and users
const userStore = useUserStore()

</script>