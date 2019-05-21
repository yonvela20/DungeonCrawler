<template>
  <div class="login">
    <v-container class="my-5">
      <v-content class="mx-4 mb-4">
        <v-container fill-height class="my-5">
          <v-form class="px-3" ref="form">
            <v-text-field v-model="user" label="Usuario" prepend-icon="person"></v-text-field>
            <v-text-field type="password" v-model="pass" label="Contraseña" prepend-icon="vpn_key"></v-text-field>
            <v-btn flat class="success mx-0 mt-3" @click="login">Login</v-btn>
          </v-form>
        </v-container>
        <p>
          <router-link to="/signup">New here? Create an account</router-link>
        </p>
      </v-content>
    </v-container>
  </div>
</template>

<script>
import format from "date-fns/format";
import { db, auth } from "@/fb";

export default {
  data() {
    return {
      user: "",
      pass: ""
    };
  },
  methods: {
    login() {
      auth
        .signInWithEmailAndPassword(this.user, this.pass)
        .then(user => {
          auth.onAuthStateChanged(user => {
            if (user) {
              window.localStorage.setItem("uid", user.uid);

              var uid = window.localStorage.getItem("uid");
              var usersRef = db.collection("usuarios").doc(uid);

              usersRef.get().then(function(doc) {
                if (doc.exists) {
                  var nombre = doc.data().nombre;
                  window.localStorage.setItem("nombre", nombre);
                } else {
                  console.log("error");
                }
              });
            }
          });
          this.$router.replace("/dashboard");
          //this.$router.go();
        })
        .catch(err => {
          alert(err.message);
        });
    }
  },

  computed: {}
};
</script>
