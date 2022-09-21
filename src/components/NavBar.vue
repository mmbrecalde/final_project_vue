<template>
  <nav>
    <!--Toolbar-->
      <v-toolbar 
      app
      color="teal-darken-3"
      image="https://picsum.photos/1920/1080?random">
      
    <!--Toolbar Image-->
      <template v-slot:image>
        <v-img
          gradient="to top right, rgba(19,84,122,.8), rgba(128,208,199,.8)"
        ></v-img>
      </template>

    <!--Toolbar Contents-->
    <v-app-bar-nav-icon @click.stop="drawer = !drawer" v-if="user.loggedIn"></v-app-bar-nav-icon>
      <v-toolbar-title >
        <span class="font-weight-light">Activity </span>
        <span>Compilation</span>
      </v-toolbar-title>
      <v-spacer></v-spacer>

      <div v-if="user.loggedIn">
        <v-btn @click.prevent="signOut" href="/" prepend-icon="mdi-logout-variant">
          Logout
        </v-btn>
      </div>
      
      <div v-else>
        <v-btn router :to="loginUrl" prepend-icon="mdi-login-variant">
          Login
        </v-btn>
        <v-btn router :to="registerUrl" prepend-icon="mdi-account-plus-outline">
          Register
        </v-btn>
      </div>
    </v-toolbar>

    <!--Nav Drawer-->
    <v-navigation-drawer 
     app 
     v-model="drawer"
     color="black"
     v-if="user.loggedIn"
     >

    <!--Nav Drawer Profile List Item-->
        <v-list>
          <v-list-item
            prepend-avatar="https://static.vecteezy.com/system/resources/previews/000/439/863/original/vector-users-icon.jpg"
            :title="user.data.displayName"
            :subtitle="user.data.email"
            class="my-5"
          ></v-list-item>
        </v-list>

      <v-divider></v-divider>

    <!--Nav Drawer Link List Item-->
       <v-list-item
          class="my-2"
          v-for="item in items"
          :key="item.title"
          router 
          :to="item.path" :prepend-icon="item.icon"
            active-color="teal">
          <v-list-item-title>{{ item.title }}</v-list-item-title>
          
        </v-list-item>
      
     </v-navigation-drawer>

  </nav>
</template>

<script>
import { useStore } from "vuex";
import { useRouter } from "vue-router";
import { computed } from "vue";
import { auth } from '../firebase'

export default {
  data() {
    return {
      admin: false,
      drawer: false,
      loginUrl: '/login',
      registerUrl: '/register',
      items: [
        { title: 'Home', icon: 'mdi-home-account', path: '/about'},
        { title: 'Simple Calculator', icon: 'mdi-calculator', path: '/basicMath'},
        { title: 'String Manipulation', icon: 'mdi-text', path: '/stringApp'},
        { title: 'Vuetify', icon: 'mdi-vuetify', path: '/vuetify'},
        { title: 'Quiz', icon: 'mdi-book-open', path: '/quiz'},
        { title: 'Quiz Results', icon: 'mdi-check-circle', path: '/quizHistory'},
        { title: 'Creator', icon: 'mdi-account-circle-outline', path: '/AboutMe'},
        { title: 'About', icon: 'mdi-help', path: '/about'},
      ],
      rail: false,
    }
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
  },
  mounted() {
    this.admin = DataService.isAdmin();
  },
};
</script>