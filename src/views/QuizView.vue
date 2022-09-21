<template>
    <div id="app">
        <quiz @quiz-completed="handleQuizCompleted" :key="quizKey" />
        <custom-modal v-show="showModal"
            :score="score" @reload="updateQuiz" @close="showModal = false"/>
    </div>
</template>
  
<script>
import CustomModal from "../components/CustomModal.vue";
import Quiz from "../components/Quiz.vue";
export default {
    components: { Quiz, CustomModal },
    name: "App",
    data() {
        return {
            quizKey: 0,
            showModal: false,
            score: {
                allQuestions: 0,
                answeredQuestions: 0,
                correctlyAnsweredQuestions: 0,
            },
        };
    },
    methods: {
        handleQuizCompleted(score) {
            this.score = score;
            this.showModal = true;
        },
        updateQuiz() {
            this.showModal = false;
            this.quizKey++;
        },
    },
};
</script>
  