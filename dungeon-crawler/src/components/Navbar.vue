<template>
  <nav>
    <v-snackbar v-model="snackbar_add" :timeout="4000" top color="success">
      <span>Has añadido un nuevo personaje</span>
      <v-btn flat color="white" @click="snackbar_add = false">Cerrar</v-btn>
    </v-snackbar>

    <v-toolbar flat app>
      <v-toolbar-side-icon class="grey--text" @click="drawer = !drawer"></v-toolbar-side-icon>
      <v-toolbar-title class="text-uppercase grey--text">
        <span class="font-weight-light">Dungeon</span>
        <span>Crawler</span>
      </v-toolbar-title>
      <v-spacer></v-spacer>

      <!-- dropdown menu -->
      <v-menu offset-y>
        <v-btn flat slot="activator" color="grey">
          <v-icon left>expand_more</v-icon>
          <span>Menu</span>
        </v-btn>
        <v-list>
          <v-list-tile v-for="link in links" :key="link.text" router :to="link.route">
            <v-list-tile-title>{{link.text}}</v-list-tile-title>
          </v-list-tile>
        </v-list>
      </v-menu>

      <v-btn flat color="grey" @click="logout">
        <span>Salir</span>
        <v-icon right>exit_to_app</v-icon>
      </v-btn>
    </v-toolbar>

    <v-navigation-drawer app v-model="drawer" class="primary">
      <v-layout column align-center>
        <v-flex class="mt-5">
          <v-avatar size="100">
            <img src="/prueba/avatar-4.png">
          </v-avatar>
          <p class="white--text subheading mt-1">{{usuario}}</p>
        </v-flex>
        <v-flex class="mt-4 mb-3">
          <Popup @projectAdded="snackbar_add = true"/>
        </v-flex>
        <v-flex class="mt-4 mb-3">
          <PopupBlog/>
        </v-flex>
      </v-layout>
      <v-list>
        <v-list-tile v-for="link in links" :key="link.text" router :to="link.route">
          <v-list-tile-action>
            <v-icon class="white--text">{{link.icon}}</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title class="white--text">{{link.text}}</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>
  </nav>
</template>

<script>
import Popup from "./Popup.vue";
import PopupBlog from "./PopupBlog.vue";
import { db, auth } from "@/fb";

export default {
  components: {
    Popup,
    PopupBlog
  },
  data() {
    return {
      usuario: "",
      drawer: false,
      links: [
        { icon: "dashboard", text: "Dashboard", route: "/" },
        { icon: "person", text: "Equipo", route: "/team" },
        { icon: "folder", text: "Mis posts", route: "/my-blog-entries" },
        { icon: "layers", text: "Blog", route: "/blog" },
        { icon: "person_pin", text: "Social", route: "/social" }
      ],
      snackbar_add: false
    };
  },

  methods: {
    logout() {
      window.localStorage.clear();

      auth.signOut().then(() => {
        this.$router.replace("login");
      });
    }
  },
  computed: {},

  beforeCreate() {},

  created() {
    /*     var uid = window.localStorage.getItem("uid");
    var usersRef = db.collection("usuarios").doc(uid);

    usersRef.get().then(function(doc) {
      if (doc.exists) {
        var nombre = doc.data().nombre;
        window.localStorage.setItem("nombre", nombre);
      } else {
        console.log("error");
      }
    }); */

    this.usuario = window.localStorage.getItem("nombre");
  }
};
</script>