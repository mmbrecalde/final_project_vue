<template>
    <div v-if="user.loggedIn">
        <div v-if="currentHisto">

            <v-form class="m-3">
                  <!-- score -->
                  <v-card-text
                    class="text-center mb-5"
                  >
 
                    <v-progress-circular 
                      v-model="currentHisto.averageScore"
                      color="teal"
                      :readonly="!admin"
                      :width="10"
                      :size="100"
                    >
                      <h1>{{currentHisto.averageScore}}</h1>
                    </v-progress-circular>                  
                  </v-card-text>

                <div v-show="admin">
                    <v-text-field label="User ID" readonly v-model="currentHisto.userID"></v-text-field>
                </div>


                <v-text-field label="Average Score" :readonly="!admin" v-model="currentHisto.averageScore">
                </v-text-field>

                <v-text-field label="Date & Time Started" readonly v-model="currentHisto.timeTaken">
                </v-text-field>
                <v-text-field label="Date & Time Ended" readonly v-model="currentHisto.timeFinished">
                </v-text-field>
            </v-form>

            <div v-show="admin">
                <div class="d-flex justify-center mb-5">
                    <v-btn type="submit" color="success" @click="updateHistory">Update</v-btn>
                    <v-btn type="submit" color="error" class="ml-5" @click="deleteHistory">Delete</v-btn>
                </div>
            </div>
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
import DataService from "../services/DataService";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
import { computed } from "vue";
import { auth } from '../firebase'

export default {
    props: ["history"],
    data() {
        return {
            admin: false,
            currentHisto: null,
        };
    },
    watch: {
        history: function (history) {
            this.currentHisto = { ...history };
        },
    },
    methods: {
        updateHistory() {
            const data = {
                averageScore: this.currentHisto.averageScore,
                timeTaken: this.currentHisto.timeTaken,
                timeFinished: this.currentHisto.timeFinished,
            };
            if (this.admin) {
                DataService.update(this.currentHisto.userID, this.currentHisto.key, data)
                    .then(() => {
                        alert("Data was updated successfully!");
                    })
                    .catch((e) => {
                        console.log(e);
                    });
            } else {
                DataService.update("0", this.currentHisto.key, data)
                    .then(() => {
                        alert("Data was updated successfully!");
                    })
                    .catch((e) => {
                        console.log(e);
                    });
            }

        },
        deleteHistory() {
            DataService.delete(this.currentHisto.userID, this.currentHisto.key)
                .then(() => {
                    this.$emit("refreshList");
                })
                .catch((e) => {
                    console.log(e);
                });
        },
    },
    mounted() {
        this.admin = DataService.isAdmin();
        this.currentHisto = { ...this.history }
    },
    setup() {

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
        return { user, signOut }
    }
};
</script>