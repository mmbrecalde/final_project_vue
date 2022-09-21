<template>
    <v-card
      class="mx-auto my-12"
      max-width="800"
      elevation="5"
    >
    
    <v-img
        class="align-end text-white"
        height="200"
        src="https://imgix.cosmicjs.com/e0ba62d0-1f9d-11eb-9446-a99141d2db14-vuetify.png?w=1200&auto=format1"
        cover
        gradient="to top right, rgba(19,84,122,.8), rgba(128,208,199,.8)"
      >
        <v-card-title>Research on Vuetify</v-card-title>
      </v-img>

      <v-card-text>
        <p class="text-h4 text--primary mb-1">
          vue·ti·fy
        </p>
        <p>Vue JS UI Framework</p><br>
        <div class="text--primary text-justify">
          Vuetify is a complete UI framework built on top of Vue.js. The goal of the project is to provide developers with the tools they need to build rich and engaging user experiences. Unlike other frameworks, Vuetify is designed from the ground up to be easy to learn and rewarding to master with hundreds of carefully crafted components from the Material Design specification.
        </div>
      </v-card-text>
      <v-card-actions>
        <v-btn
          text
          color="teal accent-4"
          @click="reveal = true"
        >
          Learn More
        </v-btn>
      </v-card-actions>
  
      <v-expand-transition>
        <v-card
          v-if="reveal"
          class="transition-fast-in-fast-out v-card--reveal"
          style="height: 100%;"
        >
          <v-card-text class="pb-0">
            <p class="text-h4 text--primary mb-2">
              More Information
            </p>
            <p class="text-justify">Vuetify takes a mobile first approach to design which means your application just works out of the box—whether it’s on a phone, tablet, or desktop computer.
  
  If you are an experienced developer and want to compare Vuetify to other libraries/frameworks, check out our Vue Framework Comparison Chart. Since its initial release in 2014, Vue.js has grown to be one of the most popular JavaScript frameworks in the world. One of the reasons for this popularity is the wide use of components which enable developers to create concise modules to be used and re-used throughout their application. UI Libraries are collections of these modules that implement a specific style guideline and provide the necessary tools to build expansive web applications.
  Read more at https://vuetifyjs.com/en/</p>
  
  <br>
          </v-card-text>
          <v-card-actions>
            <v-btn
              text
              color="inidigo accent-4"
              @click="reveal = false"
            >
              Close
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-expand-transition>
    </v-card>
  </template>
  
  <script>
    export default {
      data: () => ({
        reveal: false,
      }),
    }
  </script>
  
  <style>
  .v-card--reveal {
    bottom: 0;
    opacity: 1 !important;
    position: absolute;
    width: 100%;
  }
  </style>