import { createApp, VueElement } from "vue";
import App from "./App.vue";
import router from "./router";
import vuetify from "./plugins/vuetify";
import { loadFonts } from "./plugins/webfontloader";
import store from "./store";
import "./assets/main.css";
import VueSweetalert2 from 'vue-sweetalert2';

loadFonts();

createApp(App).use(router).use(store).use(vuetify).mount("#app");