<template>
     <v-card
       class="mx-auto my-12 px-3"
       max-width="374"
       elevation="5"
     >
     
       <v-card-title class="my-5"><h2>String Manipulation</h2></v-card-title>
   
       <v-text-field label="Type any Word" v-model="word"></v-text-field>
   
       <v-card-actions>
         <v-btn
           color="teal lighten-2"
           text
           @click="answer"
         >
           Answer
         </v-btn>
       </v-card-actions><br>
   
       <v-divider class="mx-4"></v-divider>
   
       <v-card-title>Results</v-card-title>
   
       <v-card-text>
         <v-chip-group
           color="teal accent-2 white--text"
           column
         >
           <v-chip>Vowels: {{vowels}}</v-chip>
           <v-chip>Consonants: {{consonants}}</v-chip>
           <v-chip>Numbers: {{numbers}}</v-chip>
           <v-chip>Convert: {{convert}}</v-chip>
   
         </v-chip-group>
       </v-card-text>
       
     </v-card>  
   
   </template>
   
   <script setup>
   import {ref} from 'vue'
   
   const word = ref('')
   const vowels = ref(0)
   const numbers = ref(0)
   const consonants = ref(0)
   const convert = ref('')
   
   function answer() {
        vowels.value = word.value.match(/[aeiou]/gi).length;
        consonants.value = word.value.match(/[bcdfghjklmnpqrstvwxyz]/gi).length;
        numbers.value = word.value.match(/[0-9]/ig).length;
        convert.value = word.value.replace(/[aeiouAEIOU]/ig,'*');
   }
   
   </script>
   