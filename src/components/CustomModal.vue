<template>
    <transition name="modal">
      <div class="modal-mask">
        <div class="modal-wrapper">
          <div class="modal-container">

            <div class="modal-body">
              <h1><strong>
                  {{
                    Math.floor(
                      (score.correctlyAnsweredQuestions / score.allQuestions) *
                        100
                    )
                  }}
                  % </strong></h1> TOTAL CORRECT ANSWERS
            </div>
  
            <div class="modal-footer">
              <v-btn
                id="play-again"
                class="align-center"
                variant="text"
                color="grey"
                @click="$emit('reload')"
              >
                NEW ATTEMPT
            </v-btn>
            <v-btn
                id="play-again"
                class="align-center"
                variant="text"
                color="grey"
                @click="$emit('reload')"
              >
                CLOSE
            </v-btn>
            </div>
          </div>
        </div>
      </div>
    </transition>
  </template>
  
  <script>
  export default {
    props: {
      score: Object,
    },
  };
  </script>
  
  <style scoped>
  .modal-mask {
    position: fixed;
    z-index: 9998;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    display: table;
    transition: opacity 0.3s ease;
  }
  .modal-wrapper {
    display: table-cell;
    vertical-align: middle;
  }
  .modal-container {
    width: 300px;
    max-width: 650px;
    margin: 0px auto;
    padding: 20px 30px;
    background-color: white;
    border-radius: 6px;
    box-shadow: black;
    transition: all 0.3s ease;
  }
  .modal-header {
    text-align: center;
  }
  .modal-body {
    display: flex;
    text-align: center;
    flex-direction: column;
    line-height: 2rem;
    padding-bottom: 30px;
    font-size: large;
  }
  .modal-body > * {
    margin: 1rem 0;
    padding: 0.25rem 0.5rem;
  }
  .modal-footer {
    display: flex;
    justify-content: center;
  }
  /*
   Modal Transition
   */
  .modal-enter {
    opacity: 0;
  }
  .modal-leave-active {
    opacity: 0;
  }
  .modal-enter .modal-container,
  .modal-leave-active .modal-container {
    -webkit-transform: scale(1.1);
    transform: scale(1.1);
  }
  .button-footer {
    padding: 1rem 2rem;
    border-radius: 20px;
    border: none;
  }
  .anchor-footer {
    color: black;
    text-decoration: none;
    cursor: default;
  }
  .button-footer:active,
  .button-footer:focus {
    outline: none;
  }
  .button-footer:hover {
    transform: scale(1.02);
  }
  .highlight {
    color: orange;
    border-radius: 4px;
    background-color: rgba(187, 0, 47, 0.3);
    padding: 0.25rem 0.5rem;
  }
  #score {
    background-color: rgb(15,83,126);
    border-radius: 5px;
    box-shadow: 2px 3px 9px rgb(153, 24, 24);
  }
  #chooseCategory {
    text-align: center;
  }
  </style>