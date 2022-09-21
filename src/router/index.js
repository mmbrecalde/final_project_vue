import { createRouter, createWebHistory } from "vue-router";
import BasicMathView from "../views/BasicMathView.vue";
import StringAppView from "../views/StringAppView.vue";
import HomeView from "../views/DashboardView.vue";
import QuizView from "../views/QuizView.vue";
import VuetifyView from "../views/VuetifyView.vue";
import AboutWebsiteView from "../views/AboutWebsiteView.vue";
import AboutMeView from "../views/AboutMeView.vue";
import LoginView from "../views/LoginView.vue";
import RegisterView from "../views/RegisterView.vue";
import QuizHistoryView from "../views/QuizHistoryView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomeView,
    },
    {
      path: "/stringApp",
      name: "StringAppView",
      component: StringAppView,
    },
    {
      path: "/basicMath",
      name: "basicMath",
      component: BasicMathView,
    },
    {
      path: "/quiz",
      name: "quiz",
      component: QuizView,
    },
    {
      path: "/vuetify",
      name: "vuetify",
      component: VuetifyView,
    },
    {
      path: "/AboutMe",
      name: "AboutMe",
      component: AboutMeView,
    },
    {
      path: "/about",
      name: "website",
      component: AboutWebsiteView,
    },
    {
      path: "/login",
      name: "login",
      component: LoginView,
    },
    {
      path: "/register",
      name: "register",
      component: RegisterView,
    },
    {
      path: "/quizHistory",
      name: "Quiz History",
      component: QuizHistoryView,
    },
  ],
});

export default router;
