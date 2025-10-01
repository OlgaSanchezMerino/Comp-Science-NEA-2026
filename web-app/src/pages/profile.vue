<!--
//////////////////////////////////////////////
//     WEB-APP - profile.vue page    //
//////////////////////////////////////////////
TEMPLATE
1. Load header and lateral "bar menues"
2. Load the ProfileComponent component that allows to show the user's details from the database

SCRIPT
1. Define and initialise variables films and users
2. onMounted event handler to load the data that are specified in loadData function
3. loadData calls loadUsers that load the users array.
-->

<script lang="ts" setup>
//1. Import the required objects router from router
import { ref, onMounted } from 'vue'
import { useUserStore } from '@/stores/user'

//2. Define and initialise variables films and users
const userStore = useUserStore()

/*
//2. Define and initialise variables films and users
const users = ref([]) //users will allocate the users from DB.json

//3. onMounted event handler to load the data that are specified in loadData function
// onMounted and onBeforeMounted are event handlers that can be captured before the components are loaded in the web page. Similarly onDestroyed/onBeforeDestroyed after the components are loaded.
//The load of the data needs to be done during onMounted event, to allow the page to be loaded quickly, while the application fetch the data, and the data are showed in the screen.
onMounted(loadData)

//4. loadData calls loadUsers that load the users array.
async function loadData() {
  loadUsers()
}

async function loadUsers() {
  //Fetch users
  const response = await fetch("http://localhost:5000/users")
  const data = await response.json()
  users.value = data
}
*/  
</script>
<template>
  <!--1. Load header and lateral "bar menues"-->
  <PostHeaderBarComponent />
  <LateralMenuComponent />
  <br>
  
  <!--2. Load ProfileComponent component, which provides the data of the specific user-->
  <!--<ProfileComponent  v-if="users && users.length" :user="users.find(u => u.username == 'username_1')"></ProfileComponent>-->
  <ProfileComponent  v-if="userStore.user" :user="userStore.user"></ProfileComponent>

</template>