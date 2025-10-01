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
2. Define the following variables: rating, snackbar, text and timeout that will be used in the template section
3. Define the array of users variable, which will be passed/injected as parameters in the call to ProfileComponent method, so it can be used in the template section 
As it needs to be used in the script section, it needs to be defined the props variable that will get the value of the parameter
4. Define the function goBack that force the browser to navigate to the previous URL (use the object router)
5. Save the rating and the user's genre in database. 
-->
<script setup lang="ts">
//1. Import the required object router from router and ref from Vue
import router from '@/router';
import { ref } from 'vue'
//1b.Import the User type from the web-app
import type { User } from '@/types/models/user';

//2. Define the following variables: show1 (to show the password) and rules (to validate the email entry) that will be used in the template section
//const model = ref(null)
const show1 = ref(false)

const rules = {
  required: value => !!value || 'Required.',
  min: v => v.length >= 8 || 'Min 8 characters',
  emailMatch: () => (`The email and password you entered don't match`),
}

//3. Define the array of users variable, which will be passed/injected as parameters in the call to ProfileComponent method, so it can be used in the template section
defineProps<{
  user: User,
}>()

//4. Define the function goBack that force the browser to navigate to the previous URL (use the object router)
function goBack() {
  router.back()
}
</script>

<template>
  <v-sheet class=" text-center mx-auto" elevation="2" px-2 text-body-2height="450" width="97%" rounded>
    <v-container>
      <p class="text-h4 text-center"> Personal details of the user <br></p>
      <p class="text-h8 text-center">These are your details in What2Whatch</p>
      <!--1. Show the detailed information of the user: Name, Last name, Username, password, email and Favourite genre. Additionally, a button allows user to go back. -->
      <v-row>
        <v-col>
          <v-text-field label="Name" :model-value="user.name" readonly density="compact"></v-text-field>
        </v-col>
        <v-col>
          <v-text-field label="Last name" :model-value="user.lastname" readonly density="compact"></v-text-field>
        </v-col>
      </v-row>

      <v-row>          
        <v-col>          
          <v-text-field 
            label="Username"        
            :model-value="user.username"           
            readonly 
            density="compact">
          </v-text-field>
        </v-col>

        <v-col>
          <v-text-field
            :model-value="user.password"
            :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
            :rules="[rules.required, rules.min]"
            :type="show1 ? 'text' : 'password'"
            @click:append="show1 = !show1"            
            label="Password"
            readonly 
            density="compact"
          ></v-text-field>
        </v-col>          

        <v-col>          
          <v-text-field 
            label="Email"           
            :model-value="user.email"               
            readonly 
            density="compact">
          </v-text-field>
        </v-col>
      </v-row>

      <v-row>              
        <v-col>          
          <v-text-field 
            label="Favourite genre" 
            :model-value="user.favGenres[0].genre + ', ' + user.favGenres[1].genre + ', ' + user.favGenres[2].genre"           
            readonly 
            density="compact">
          </v-text-field>
        </v-col>
      </v-row>          
      <!--2. A button allows user to go back-->
      <v-spacer></v-spacer>
      <v-row>
        <v-col>
          <v-btn prepend-icon="mdi-arrow-left-circle" class="text-none mb-4" color="deep-purple-lighten-2"
            size="x-large" text="Back" border @click="goBack"></v-btn>
        </v-col>
      </v-row>
    </v-container>
  </v-sheet>
</template>

<!--
  <script setup lang="ts">
import router from '@/router';
import type { Film } from '@/types/models/film';
import { ref } from 'vue'
const model = ref(null)

  const form = ref()
  const selectedGenres = ref([])

  const genres = ['Action', 'Comedy', 'Documentary', 'Drama', 'Fantasy','Romance','Horror']
  const firstName = ref('')
  const lastName = ref('')
  const eMail = ref('')
  const nameRules = ref([
    value => {    
      if (value) return true
      return 'Name is required.'
    },
    value => {
      if (value?.length <= 10) return true
      return 'Name must be less than 10 characters.'
    },
  ])
  const selectRules = ref([
    v => !!v || 'Item is required',
    v => !!v && v.length<=3 || 'Select only 3 items'
  ])  
  
  const emailRules = [
    value => {
      if (value) return true
      return 'E-mail is required.'
    },
    value => {
      if (/.+@.+\..+/.test(value)) return true
      return 'E-mail must be valid.'
    },
  ]
  async function validate () {
    const { valid } = await form.value.validate()
    if (valid) alert('Form is valid - To be removed')
  }  
</script>
  -->
      <!-- <v-row no-gutters>
        <v-col>
          <v-sheet class="pa-2 ma-2"> <v-text-field label="Name" :model-value="user.name" readonly
              density="compact"></v-text-field> </v-sheet>
        </v-col>
        <v-col>
          <v-sheet class="pa-2 ma-2"> <v-text-field label="Last name" :model-value="user.lastname" readonly
              density="compact"></v-text-field> </v-sheet>
        </v-col>
      </v-row>

      <v-row no-gutters>
        <v-col>
          <v-sheet class="pa-2 ma-2"> <v-text-field label="Username" :model-value="user.username" readonly
              density="compact"></v-text-field> </v-sheet>
        </v-col>
        <v-col>
          <v-sheet class="pa-2 ma-2"> <v-text-field label="Password" :model-value="user.password" readonly
              density="compact"></v-text-field> </v-sheet>
        </v-col>
        <v-col>
          <v-sheet class="pa-2 ma-2"> <v-text-field label="email" :model-value="user.email" readonly
              density="compact"></v-text-field> </v-sheet>
        </v-col>        
      </v-row>
        
      <v-row no-gutters>
        <v-col>
          <v-sheet class="pa-2 ma-2"> <v-text-field label="Favourite genre" :model-value="user.favGenres[0].genre" readonly
              density="compact"></v-text-field></v-sheet>
        </v-col>
      </v-row> -->