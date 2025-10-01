<!--
///////////////////////////////////////////////////
//     WEB-APP - LoginComponent component      //
///////////////////////////////////////////////////
TEMPLATE
    1. Provide free text field for the user to introduce his username and password
    2. A button allows user to be logged in in the web application, and then goes to the home page
    3. A button allows user to go forgotpassword page

SCRIPT
1. Import the required object router from router and ref from Vue
2. Define the following variables: form, username, password, repassword, nameRules, passwordRules, rePasswordRules that will be used in the template section
3. Define the function "validate". This function handles the event onClick of the "Log in to home page" button. It forces the user to provide valid inputs, and also to get the actual user data from database.
4. Define the function "goHome" that force the browser to navigate to the home page (use the object router)
-->
<script setup lang="ts">
//1. Import the required object router from router and ref from Vue
import router from '@/router';
import { ref } from 'vue'
import { useUserStore } from '@/stores/user'

//2. Define the following variables: form and show1 that will be used in the template section
const form = ref()
const show1 = ref(false)
const userStore = useUserStore() //Define and initialise the user data (it gets the basic information, Id, username and password, to facilitate the login and simulate the session)

//3. Define the rule function 
const passwordRules = {
  required: function(value) {
    if (!value) {
      return 'Password is required.';
    }
    return true;
  },
  min: function(v) {
    if (v.length < 5) {
      return 'Password must be longer than 5 characters.';
    }
    return true;
  },
  max: function(v) {
    if (v.length > 20) {
      return 'Password must be shorter than 20 characters.';
    }
    return true;
  }
}

const nameRules = [
  function (value) {
    if (!value) {
        return 'Name is required'
      } else if (value.length > 10) {
        return 'Username must be less than 10 characters.'
      } else {
        return true
      }
    }
 ];

//3. Define the function "validate". This function handles the event onClick of the "Log in to home page" button. It forces the user to provide valid inputs and also to get the actual user data from database.
async function validate() {
  const { valid } = await form.value.validate()
  //if (valid) alert('Form is valid - To be removed')
  if (valid) {
    // login. Get the user's data from MongoDB
    await userStore.login()
    // and then
    goHome()
  }  
}

//4. Define the function "goHome" that force the browser to navigate to the profileCustomisation page (use the object router)
function goHome() {
  router.push("/home")
}
</script>


<template>
  <v-form ref="form" @submit.prevent>
    <!--1. Provide free text field for the user to introduce his username and password -->
    <v-text-field outline label="Username" hint="Enter your username to access this website" type="username"
      v-model="userStore.user.username" :rules="nameRules">
    </v-text-field>

    <v-text-field 
      outline 
      label="Password" 
      hint="Enter your password to access this website" 
      v-model="userStore.user.password" 
      :rules="[passwordRules.required, passwordRules.min, passwordRules.max]"
      :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
      :type="show1 ? 'text' : 'password'"
      @click:append="show1 = !show1"        
      >
    </v-text-field>

    <!--2. A button allows user to be logged in and then goes to the home page (in the mock, it goes directly to the home page)-->
    <v-btn :disabled="false" append-icon="mdi-account-circle" prepend-icon="mdi-login" class="text-none mb-4"
      color="deep-purple-lighten-1" size="x-large" text="Log in to your account" type="submit" @click="validate" border
      block>
    </v-btn>
    <!--3. A button allows user to go forgotpassword-->
    <v-btn prepend-icon="mdi-lock" class="text-none mb-4" color="deep-purple-lighten-2" size="large"
      text="Forgot password?" border block to="/forgotpassword">
    </v-btn>
  </v-form>
</template>