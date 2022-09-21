<template>
    <v-card
    class="mx-auto my-12"
      elevation="5"
      max-width="800" 
    >
  
    <v-img
        class="align-end text-white"
        height="200"
        src="https://th.bing.com/th/id/OIP.Ve8s2wOzcP0qpU37-wQKlAHaEK?pid=ImgDet&rs=1"
        cover
        gradient="to top right, rgba(19,84,122,.8), rgba(128,208,199,.8)"
      >
        <v-card-title>About the Application</v-card-title>
      </v-img>

      <v-card-text>
        <div class="my-3 text-subtitle-1">
          CIT 501 • Final Project
        </div>
  
        <div class="text-justify">This application is a quiz application. The questions here are fetched from an API called Open Trivia Database. The developer used Vuetify for its aesthetics. The quiz is all about the general information technology which would help the user to enhance his/her knowledge about information technology topics.</div>
      </v-card-text>
  
      <v-divider class="mx-4"></v-divider>
  
      <v-card-title>Other Information</v-card-title>
  
      <v-card-text>
        <v-chip-group
          color="teal accent-2 white--text"
          column
        >
          <v-chip
              @click="show1 = !show1"
          >Vuetify</v-chip>
  
          <v-chip
              @click="show2 = !show2"
          >Open Trivia Database</v-chip>
  
          <v-chip
              @click="show3 = !show3"
          >Vue.js</v-chip>
  
          <v-expand-transition>
          <div v-show="show1" class="text-justify">
  
              <v-card-text>
                  Vuetify is a complete UI framework built on top of Vue.js. The goal of the project is to provide developers with the tools they need to build rich and engaging user experiences. Unlike other frameworks, Vuetify is designed from the ground up to be easy to learn and rewarding to master with hundreds of carefully crafted components from the Material Design specification.
              </v-card-text>
          </div>
          </v-expand-transition>
  
          <v-expand-transition>
          <div v-show="show2" class="text-justify">
  
              <v-card-text>
                The Open Trivia Database provides a completely free JSON API for use in programming projects. Use of this API does not require a API Key, just generate the URL below use it in your own application to retrieve trivia questions.
                All data provided by the API is available under the Creative Commons Attribution-ShareAlike 4.0 International License. 
              </v-card-text>
          </div>
          </v-expand-transition>
  
          <v-expand-transition>
          <div v-show="show3" class="text-justify">
  
              <v-card-text>
                Vue is an independent, community-driven project. It was created by Evan You in 2014 as a personal side project. Today, Vue is actively maintained by a team of both full-time and volunteer members from all around the world, where Evan serves as the project lead. You can learn more about the story of Vue in this documentary.
                Vue's development is primarily funded through sponsorships and we have been financially sustainable since 2016. If you or your business benefit from Vue, consider sponsoring us to support Vue's development!
              </v-card-text>
          </div>
          </v-expand-transition>
  
        </v-chip-group>
      </v-card-text>
  
    </v-card>
  </template>
  
  <script>
  import {ref} from 'vue'
  
  const selection = ref(1)
  </script>
  
  