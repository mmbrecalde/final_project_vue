<template>
        <v-card 
            class="mx-auto my-12"
            elevation="5"
            max-width="800" 
        >

        <v-img
            class="align-end text-white"
            height="200"
            src="https://blog.hubspot.com/hubfs/google-quiz.jpg"
            cover
            gradient="to top right, rgba(19,84,122,.8), rgba(128,208,199,.8)"
        >
            <v-card-title>Quiz Attempts</v-card-title>
        </v-img>

            <v-list :class="{ active: index == currentIndex }" v-for="(history, index) in List" :key="index">
                <v-list-item @click="setActiveHistory(history, index)">{{history.timeTaken}}
                </v-list-item>
            </v-list>
        
        <v-divider></v-divider>

        <v-card-title>Details</v-card-title>
            <div v-if="currentHistory">
                <QuizDetails :history="currentHistory" @refreshList="refreshList" />
            </div>
        </v-card>
</template>
  
<script>

import DataService from "../services/DataService";
import QuizDetails from "./QuizDetails.vue";
import { database } from "../firebase";

export default {
    components: { QuizDetails: QuizDetails },
    data() {
        return {
            admin: false,
            List: [],
            currentHistory: null,
            currentIndex: -1,
            historyClicked: false,
        };
    },
    methods: {
        onDataChange(items) {
            let _history = [];

            if (this.admin) {
                items.forEach((item) => {
                    let userID = item.key;
                    const dbRef = database.ref("Users/" + userID + "/History");
                    dbRef.on('value', (snapshot) => {
                        snapshot.forEach((list) => {
                            let key = list.key
                            let data = list.val()
                            _history.push({
                                userID: userID,
                                key: key,
                                averageScore: data.averageScore,
                                timeTaken: data.timeTaken,
                                timeFinished: data.timeFinished,
                            });
                        })
                    })
                });
                this.List = _history;
            } else {

                items.forEach((item) => {
                    let key = item.key;
                    let data = item.val();
                    _history.push({
                        userID: "0",
                        key: key,
                        averageScore: data.averageScore,
                        timeTaken: data.timeTaken,
                        timeFinished: data.timeFinished,
                    });
                });
                this.List = _history;
            }
        },
        refreshList() {
            this.currentHistory = null;
            this.currentIndex = -1;
            this.historyClicked = false;
        },
        setActiveHistory(history, index) {
            this.currentHistory = history;
            this.currentIndex = index;
        },
    },
    mounted() {
        this.admin = DataService.isAdmin();
        DataService.getAll().on("value", this.onDataChange);
    },
    beforeUnmount() {
        DataService.getAll().off("value", this.onDataChange);
    }
};
</script>
  
<style>
.list {
    text-align: left;
    max-width: 750px;
    margin: auto;
}
</style>