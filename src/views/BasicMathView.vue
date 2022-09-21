<template>
  <v-card
    class="mx-auto my-12 px-3"
    max-width="374"
    elevation="5"
  >
  
    <v-card-title class="my-5"><h2>Simple Calculator</h2></v-card-title>

    <v-text-field label="Enter the First Number" v-model="fnum"></v-text-field>
    <v-text-field label="Enter the Second Number" v-model="snum"></v-text-field>

    <v-card-actions class="mx-auto">
      <v-row class="px-1">
        <v-btn-toggle
          color="teal-darken-3"
          v-model="toggle_one"
          mandatory
        >
          <v-btn
            @click="add()">
            <v-icon>mdi-plus</v-icon>
          </v-btn>

          <v-btn
            @click="subtract()">
            <v-icon>mdi-minus</v-icon>
          </v-btn>

          <v-btn
            @click="multiply()">
            X
          </v-btn>

          <v-btn
            @click="divide()">
            /
          </v-btn>

          <v-btn
            @click="average()">
            AVE
          </v-btn>
        </v-btn-toggle>
      </v-row>
    </v-card-actions><br>

    <v-divider class="mx-4"></v-divider>

    <v-card-title>Result</v-card-title>

    <v-card-text>
        <v-chip color="teal">{{result}}</v-chip>
    </v-card-text>
    
  </v-card>  

</template>

<script setup>
  import {ref} from 'vue'

  const fnum=ref(0)
  const snum=ref(0)
  const result=ref(0)
  const toggle_one=ref(0)

  function add(){
    result.value = parseInt(fnum.value) + parseInt(snum.value)
  }

  function subtract(){
    result.value = parseInt(fnum.value) - parseInt(snum.value)
  }

  function divide(){
    result.value = parseInt(fnum.value) / parseInt(snum.value)
  }

  function multiply(){
    result.value = parseInt(fnum.value) * parseInt(snum.value)
  }

  function average(){
    result.value = (parseInt(fnum.value) + parseInt(snum.value))/2
  }
</script>


