<!--
///////////////////////////////////////////////////
//     WEB-APP - ProfileComponent component      //
///////////////////////////////////////////////////
TEMPLATE
1. Show the detailed information of the user: Name, Last name, Username, password, email and Favourite genre. Read only.
2. A button allows user to go back

SCRIPT
1. Import the required object router from router and ref from Vue
1b.Import the User type from the web-app
2. Define the following variables: form, username, password, repassword, nameRules, passwordRules, rePasswordRules that will be used in the template section
3. Define the function "validate" that force user to provide valid inputs
4. Define the function "goUserCustomisation" that force the browser to navigate to the userCustomisation page (use the object router)
-->
<script setup lang="ts">
//1. Import the required object router from router and ref from Vue
import router from '@/router';
import { ref } from 'vue'
import { useUserStore } from '@/stores/user'

//2. Define the following variables: userStore, form, username, password, repassword, nameRules, passwordRules, rePasswordRules that will be used in the template section
const form = ref()
const password = ref('')
const userStore = useUserStore()
const show1 = ref(false)
const show2 = ref(false)

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
const rePasswordRules = {
  required: function(value) {
    if (!value) {
      return 'Password is required.';
    }
    return true;
  },
  equal: function(v) {
    if (v !== password.value) {
      return 'Password is incorrect (Both need to be the same).';
    }
    return true;
  }
}
const nameRules = 
  function (value) {
    if (!value) {
        return 'Name is required'
      } else if (value.length > 10) {
        return 'Username must be less than 10 characters.'
      } else {
        return true
      }
    }
 

//3. Define the function "validate" that force user to provide valid inputs
async function validate() {
  const { valid } = await form.value.validate()
  if (valid) {
    //alert('Form is valid - To be removed')
    goUserCustomisation()
  }
}

//4. Define the function "goProfileCustomisation" that force the browser to navigate to the profileCustomisation page (use the object router)
function goUserCustomisation() {
  router.push("/userCustomisation")
}
</script>

<template>
  <v-form ref="form" @submit.prevent>
    <!--1. Show the detailed information of the user: Name, Last name, Username, password, email and Favourite genre. Read only.-->
    <v-text-field 
      label="Username" 
      type="username" 
      hint="Enter your username to sing-up" 
      v-model="userStore.user.username"
      :rules="[nameRules]"
    ></v-text-field>

    <v-text-field 
      label="Password" 
      hint="Enter your password to sign-up"
      v-model="password" 
      :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
      :rules="[passwordRules.required, passwordRules.min, passwordRules.max]"
      :type="show1 ? 'text' : 'password'"
      @click:append="show1 = !show1"        
    ></v-text-field>

    <v-text-field 
      label="Re-enter password" 
      hint="Re-enter your password to sing-up" 
      v-model="userStore.user.password" 
      :rules="[rePasswordRules.required, rePasswordRules.equal]"
      :append-icon="show2 ? 'mdi-eye' : 'mdi-eye-off'"
      :type="show2 ? 'text' : 'password'"
      @click:append="show2 = !show2" 
    ></v-text-field>
    
    
    <!--2. A button allows user to validate (and, just in the mock, go to profileCustomisation page)-->
    <v-btn :disabled="false" append-icon="mdi-account-circle" prepend-icon="mdi-login" class="text-none mb-4"
      color="deep-purple-lighten-1" size="x-large" text="Sign up to your account" type="submit" @click="validate" border
      block>
    </v-btn>

  </v-form>
</template>