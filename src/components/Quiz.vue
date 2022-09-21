<template>
        <div v-if="user.loggedIn">
            <div v-show="!admin">
                <v-card
                    class="mx-auto my-12"
                    elevation="5"
                    max-width="800" 
                >

                    <v-img
                        class="align-end text-white"
                        height="200"
                        src="https://th.bing.com/th/id/OIP.zlCtlTZMsPFFkifitjJBsQHaEo?pid=ImgDet&rs=1"
                        cover
                        gradient="to top right, rgba(19,84,122,.8), rgba(128,208,199,.8)"
                    >
                        <v-card-title>General Information Technology</v-card-title>
                    </v-img>

                    <v-card-subtitle class="pt-4">
                        Open | Due Sep 05 at 6:30pm | 20 pts | 20 Questions | Score: {{ correctAnswers }}/10
                    </v-card-subtitle>

                    <v-card-text>
                        <div class="text-justify">A quiz that consists of general questions on Information Technology that would help you enhance your knowledge.</div>
                    </v-card-text>

                    <div class="px-4">
                        <v-btn 
                            :disabled="!start" 
                            variant="text" 
                            @click="load(0)" 
                            class="mt-5"
                            color="teal"
                            :loading="loadingbtn[0]"
                        >
                            TAKE QUIZ
                        </v-btn>
                    </div>

                    <v-divider></v-divider>

                    <v-container justify="center">
                        <v-row dense>
                            <v-container>
                                <div v-show="!loading">

                                    <v-row no-gutters justify="center" style="text-align:center">
                                        <v-col>
                                            <v-sheet class="pa-2 ma-2">
                                                <h2>Question {{ index + 1 }} of {{ questions.length }}</h2>
                                            </v-sheet>
                                        </v-col>
                                    </v-row>

                                </div>
                            </v-container>
                            <v-divider></v-divider>

                            <h4 v-html="loading ? 'Click TAKE QUIZ to begin' : currentQuestion.question"
                                style="width:100%; text-align: center;"></h4>
                                
                            <!-- Only first question is displayed -->
                            <v-divider class="mx-4"></v-divider>

                            <form id="formBtn" class="d-flex flex-column pa-6 w-100" v-if="currentQuestion">
                                <v-row no-gutters justify="center" style="text-align:center">
                                    <v-col v-for="answer in currentQuestion.answers">
                                        <v-sheet class="pa-2 ma-2">
                                            <button :index="currentQuestion.key" :key="answer" v-html="answer"
                                                @click.prevent="handleClick" type="button"
                                                class="btn btn-secondary w-100 h-100"></button>
                                        </v-sheet>
                                    </v-col>
                                </v-row>

                            </form>

                        </v-row>
                    </v-container>
                </v-card>
            </div>

            <div v-show="admin">
                <v-card class="mx-auto mt-6 bg-info" width="25%" title="Sorry" text="Admin cannot play">
                </v-card>
            </div>
            
        </div>

        <div v-else>
            <v-card class="mx-auto mt-6 bg-info" max-width="25%" variant="outlined">
                <v-card-item color="white">
                    <div>
                        <div class="text-overline mb-1">
                            YOU ARE NOT LOGGED IN!
                        </div>
                        <div class="text-caption mb-3">Please login if you already have an account, otherwise create one
                            now.</div>
                    </div>
                </v-card-item>
            </v-card>
        </div>
</template>
  
<script>
import axios from 'axios';
import { useStore } from "vuex";
import { useRouter } from "vue-router";
import { computed, toDisplayString } from "vue";
import { auth } from '../firebase'
import DataService from "../services/DataService";

//Assets
import ImageSrc from '../assets/images/quiz.jpg'

export default {
    setup() {
        const admin = DataService.isAdmin();
        const Image = ImageSrc;
        const store = useStore()
        const router = useRouter()
        auth.onAuthStateChanged(user => {
            store.dispatch("fetchUser", user);
        });
        const user = computed(() => {
            return store.getters.user;
        });
        const signOut = async () => {
            await store.dispatch('logOut')
            router.push('/login')
        }
        return { user, signOut, Image, admin }
    },
    data() {
        return {
            timeTake: "",
            History: {
                averageScore: "",
                timeTaken: "",
                timeFinished: "",
            },
            start: true,
            loadingbtn: [],
            questions: [],
            loading: true,
            index: 0,
            value: 50,
        };
    },
    computed: {
        currentQuestion() {
            if (this.questions !== []) {
                return this.questions[this.index];
            }
            return null;
        },
        correctAnswers() {
            if (this.questions && this.questions.length > 0) {
                let streakCounter = 0;
                this.questions.forEach(function (question) {
                    if (!question.rightAnswer) {
                        return;
                    } else if (question.rightAnswer === true) {
                        streakCounter++;
                    }
                });
                return streakCounter;
            } else {
                return "--";
            }
        },
        quizCompleted() {
            if (this.questions.length === 0) {
                return false;
            }
            // Check if all questions have been answered 
            let questionsAnswered = 0;
            this.questions.forEach(function (question) {
                question.rightAnswer !== null ? questionsAnswered++ : null;
            });
            return questionsAnswered === this.questions.length;
        },
        score() {
            if (this.questions !== []) {
                return {
                    allQuestions: this.questions.length,
                    answeredQuestions: this.questions.reduce((count, currentQuestion) => {
                        if (currentQuestion.userAnswer) {
                            // userAnswer is set when user has answered a question, no matter if right or wrong
                            count++;
                        }
                        return count;
                    }, 0),
                    correctlyAnsweredQuestions: this.questions.reduce(
                        (count, currentQuestion) => {
                            if (currentQuestion.rightAnswer) {
                                // rightAnswer is true, if user answered correctly
                                count++;
                            }
                            return count;
                        },
                        0
                    ),
                };
            } else {
                return {
                    allQuestions: 0,
                    answeredQuestions: 0,
                    correctlyAnsweredQuestions: 0,
                };
            }
        },
    },
    watch: {
        quizCompleted(completed) {
            completed &&
                setTimeout(() => {
                    this.saveHistory();
                    this.$emit("quiz-completed", this.score);
                }, 2000);
        },
    },
    methods: {
        saveHistory() {
            const today = new Date();
            var data = {
                averageScore: Math.floor(
                    (this.score.correctlyAnsweredQuestions / this.score.allQuestions) *
                    100
                ) + "%",
                timeTaken: this.timeTake,
                timeFinished: today.toGMTString(),
            };
            DataService.create(data)
                .then(() => {
                    this.submitted = true;
                })
                .catch(e => {
                    console.log(e);
                });
        },

        newHistory() {
            this.submitted = false;
            this.History = {
                averageScore: 0,
                timeTaken: "",
                timeFinished: "",
            };
        },

        load(i) {
            const taken = new Date()
            this.loadingbtn[i] = true
            if (i == 1) {
                setTimeout(() => (this.loadingbtn[i] = false), 1000)
            } else {
                setTimeout(() => (this.loadingbtn[i] = false, this.timeTake = taken.toGMTString(), this.fetchQuestions(), this.start = false), 2000)
            }
        },
        async fetchQuestions() {
            this.loading = true;

            //fetching questions from api
            let index = 0; //To identify single answer
                    let { data } = await axios.get('https://opentdb.com/api.php?amount=10&category=18&difficulty=easy&type=multiple')
                    let questions = data.results.map((question) => {
                        question.answers = [
                            question.correct_answer,
                            ...question.incorrect_answers,
                        ];
                        //shuffle above array
                        for (let i = question.answers.length - 1; i > 0; i--) {
                            const j = Math.floor(Math.random() * (i + 1));
                            [question.answers[i], question.answers[j]] = [
                                question.answers[j],
                                question.answers[i],
                            ];
                        }
                        //add right answers and key
                        question.rightAnswer = null;
                        question.key = index;
                        index++;
                        return question;


                    });

                    this.questions = questions;
                    this.loading = false;

        },
        handleClick(e) {
            let index = e.target.getAttribute("index");
            let pollutedUserAnswer = e.target.innerHTML; // innerHTML is polluted with decoded HTML entities e.g ' from &#039;
            /* Clear from pollution with ' */
            let userAnswer = pollutedUserAnswer.replace(/'/, "&#039;");
            //set answer
            this.questions[index].userAnswer = userAnswer;
            /* Set class "clicked" on button with userAnswer -> for CSS Styles; Disable other sibling buttons */
            e.target.classList.add("clicked");
            let allButtons = document.querySelectorAll(`[index="${index}"]`);
            for (let i = 0; i < allButtons.length; i++) {
                if (allButtons[i] === e.target) continue;
                allButtons[i].setAttribute("disabled", "");
            }
            this.checkCorrectAnswer(e, index);
        },
        checkCorrectAnswer(e, index) {
            let question = this.questions[index];
            if (question.userAnswer) {
                if (this.index < this.questions.length - 1) {
                    setTimeout(
                        function () {
                            this.index += 1;
                        }.bind(this),
                        2000
                    );
                }
                if (question.userAnswer === question.correct_answer) {
                    /* Set class on Button if user answered right, to celebrate right answer with animation joyfulButton */
                    e.target.classList.add("rightAnswer");
                    /* Set rightAnswer on question to true, computed property can track a streak out of 20 questions */
                    this.questions[index].rightAnswer = true;
                } else {
                    /* Mark users answer as wrong answer */
                    this.heart--
                    e.target.classList.add("wrongAnswer");
                    this.questions[index].rightAnswer = false;
                    /* Show right Answer */
                    let correctAnswer = this.questions[index].correct_answer;
                    let allButtons = document.querySelectorAll(`[index="${index}"]`);
                    allButtons.forEach(function (button) {
                        if (button.innerHTML === correctAnswer) {
                            button.classList.add("showRightAnswer");
                        }
                    });
                }
            }
        },
    },
};
</script>
  
<style scoped>
#formBtn button {
    font-size: 1rem;
    box-sizing: border-box;
    padding: 1rem;
    margin: 0.5rem;
    background-color: grey;
    color: white;
    border: none;
    border-radius: 5rem;
}

#formBtn button:hover:enabled {
    align-self: center;
    cursor: pointer;
}

#formBtn button:focus {
    outline: none;
}

#formBtn button.clicked {
    pointer-events: none;
}

#formBtn button.rightAnswer {
    animation: flashButton;
    animation-duration: 700ms;
    animation-delay: 200ms;
    animation-iteration-count: 3;
    animation-timing-function: ease-in-out;
    color: white;
    background: green;
}

#formBtn button.wrongAnswer {
    color: white;
    background: red
}

#formBtn button.showRightAnswer {
    animation: flashButton;
    animation-duration: 700ms;
    animation-delay: 200ms;
    animation-iteration-count: 2;
    animation-timing-function: ease-in-out;
    color: white;
    background: green
}

.custom-loader {
    animation: loader 1s infinite;
    display: flex;
}

@-moz-keyframes loader {
    from {
        transform: rotate(0);
    }

    to {
        transform: rotate(360deg);
    }
}

@-webkit-keyframes loader {
    from {
        transform: rotate(0);
    }

    to {
        transform: rotate(360deg);
    }
}

@-o-keyframes loader {
    from {
        transform: rotate(0);
    }

    to {
        transform: rotate(360deg);
    }
}

@keyframes loader {
    from {
        transform: rotate(0);
    }

    to {
        transform: rotate(360deg);
    }
}
</style>