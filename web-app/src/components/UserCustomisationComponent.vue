<!--
/////////////////////////////////////////////////////////////
//     WEB-APP - UserCustomisationComponent component      //
/////////////////////////////////////////////////////////////
TEMPLATE
1. It allows user to introduce the rest of his/her personal data (i.e., Name, Last name, email) as well as introduce the favourite film's genres.
Note that Username, password are already provided to the user, based on the information provided during the signup process.  
2. A button allows user to go back
3. A button allows user to save the changes in the database. A Vue snackbar component is loaded. It is a small message that informs the user that the rating has been done 
and dissapears automatically after a certaing amount of time 

SCRIPT
1. Import the required userUserStore, object router from router and ref from Vue
1b.Import the User type from the web-app
2. Define the following variables
2b. Define the array of users variable, which will be passed/injected as parameters in the call to ProfileComponent method, so it can be used in the template section 
3. Define the function "validate
4. Define the function "goBack" that force the browser to navigate to the previous URL (use the object router)
5. Define the function "save" to save the updates of the user's data in database.
-->
<script setup lang="ts">
//1. Import the required object router from router and ref and shallowRef from Vue
import router from '@/router';
import { ref } from 'vue'
import { useUserStore } from '@/stores/user'

//1b.Import the User type from the web-app
import type { User } from '@/types/models/user';
import type { GenreSelection } from '@/types/models/genre';

//2. Define the following variables:
const form = ref()
const genres = ['Action', 'Comedy', 'Documentary', 'Drama', 'Fantasy', 'Romance', 'Horror']
const firstName = ref('')
const lastName = ref('')
const eMail = ref('')
const show1 = ref(false)
const selectedGenres = ref([])
let snackbar = ref(false)
const text = ref('Your personal data and preferences have been already saved. Please, click back to come back to the previous page.')
const timeout = ref(2000)
const userStore = useUserStore()

//2b. Define the array of users variable, which will be passed/injected as parameters in the call to ProfileComponent method, so it can be used in the template section
defineProps<{
  user: User,
}>()

//3. Define the function "validate" that force user to provide valid inputs
const rules = {
  required: value => !!value || 'Required.',
  min: v => v.length >= 3 || 'Min 3 characters',
}

const emailRules = [
  function (value) {
    if (!value) {
      return 'E-mail is required.'
    }
    if (!value.includes('@')) {
      return 'E-mail requires an @.';
    }
    const parts = value.split('@');
    if (parts.length !== 2 || parts[0].length === 0) {
      return false;
    }
    if (!parts[1].includes('.')) {
      return false;
    }
  }
]

const selectRules = [
  function (value) {
    if (!value || value.length === 0) {
      return 'Item is required.';
    } else {
      return true;
    }
  },
  function (value) {
    if (value && value.length > 3 && value.length < 3) {
      return 'Select 3 items';
    } else {
      return true;
    }
  }
]

async function validate() {
  const { valid } = await form.value.validate()
  if (valid) {
    //Initialise the snackbar control
    snackbar.value = true
    saveUserData()
  }
}

//4. Define the function goBack that force the browser to navigate to the previous URL (use the object router)
function goBack() {
  router.back()
}

//5. Define the function "save" to save the updates of the user's data in database. 
async function saveUserData() {
  await userStore.login()
  router.push("/home")
}
</script>

<template>
  <v-sheet class=" text-center mx-auto" elevation="2" px-2 text-body-2height="450" width="97%" rounded>
    <v-container>
      <v-form ref="form" @submit.prevent>
        <p class="text-h4 text-center"> User Customization <br></p>
        <p class="text-h8 text-center">These are your details in What2Whatch</p>
        <p class="text-h8 text-center">Please, note that the username and password cannot be changed as that is the main
          reference of the user in What2Whatch. If you need to reset your passwork, email info@what2watch.com with
          the subject forgot password to reset your password</p>
        <!--1. Show the detailed information of the user and allows user to change : Name, Last name, Username, password, email and Favourite genre. -->
        <v-row>
          <v-col>
            <v-text-field label="Name" hint="Enter your first name" v-model="firstName" :rules="[rules.required, rules.min]"
              density="compact"></v-text-field>
          </v-col>
          <v-col>
            <v-text-field label="Last name" hint="Enter your last name" v-model="lastName" :rules="[rules.required, rules.min]"
              density="compact"></v-text-field>
          </v-col>
        </v-row>

        <v-row>
          <v-col>
            <v-text-field label="Username" :model-value="user.username" readonly density="compact">
            </v-text-field>
          </v-col>
          <v-col>
            <v-text-field :model-value="user.password" readonly :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
              :rules="[rules.required, rules.min]" :type="show1 ? 'text' : 'password'" label="Password"
              @click:append="show1 = !show1" density="compact"></v-text-field>
          </v-col>

          <v-col>
            <v-text-field label="Email" hint="Enter your email address" v-model="eMail" :rules="emailRules"
              density="compact">
            </v-text-field>
          </v-col>
        </v-row>
        <v-row>
          <v-col>
            <v-select v-model="selectedGenres" :items="genres" label="Favourite genres" multiple chips closable-chips
              hint="Pick your favorite genres (please, select 3 genres)" persistent-hint :rules="selectRules">
            </v-select>
          </v-col>
        </v-row>

        <v-spacer></v-spacer>
        <v-row>
          <!--2. Shows the button to Back and Save. 
                2a. Save button: onSave click, it calls the save method that saves the user data in the database
                2b.- Back button: onBack click it calls the goBack method that allows user to back to the home (or search) page-->
          <v-col cols="2" offset="3">
            <v-btn prepend-icon="mdi-arrow-left-circle" class="text-none mb-4" color="deep-purple-lighten-2"
              size="x-large" text="Back" border @click="goBack"></v-btn>
          </v-col>
          <v-col cols="2" offset="2">
            <v-btn
              :disabled="firstName === '' || lastName === '' || eMail === '' || selectedGenres.length === 0 || selectedGenres.length > 3 || selectedGenres.length < 3"
              prepend-icon="mdi-check-circle" class="text-none mb-4" color="deep-purple-lighten-1" size="x-large"
              text="Save" border @click="validate" variant="flat"></v-btn>

            <!--2c.-A Vue snackbar component is loaded. It is a small message that informs the user that the rating has been done 
                    and dissapears automatically after a certaing amount of time-->
            <v-snackbar v-model="snackbar" :timeout="timeout">
              {{ text }}

              <template v-slot:actions>
                <v-btn color="blue" variant="text" @click="snackbar = false">
                  Close
                </v-btn>
              </template>


            </v-snackbar>
          </v-col>
        </v-row>

      </v-form>
    </v-container>
  </v-sheet>
</template>