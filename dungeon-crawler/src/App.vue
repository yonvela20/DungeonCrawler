<template>
  <div v-if="login">
    <v-app class="grey lighten-4">
      <Navbar/>
      <v-content class="mx-4 mb-4">
        <router-view></router-view>
      </v-content>
    </v-app>
  </div>

  <div v-else>
    <v-app class="grey lighten-4">
      <v-content class="mx-4 mb-4">
        <v-container fill-height class="my-5">
          <v-form class="px-3" ref="form">
            <v-text-field v-model="user" label="Usuario" prepend-icon="person"></v-text-field>
            <v-text-field v-model="pass" label="Contraseña" prepend-icon="vpn_key"></v-text-field>
            <v-btn flat class="success mx-0 mt-3" @click="submit">Login</v-btn>
          </v-form>
        </v-container>
        <div v-for="user in usuarios" :key="user.nombre">
          <p>{{user.nombre}}</p>
          <p>{{user.pass}}</p>
        </div>
      </v-content>
    </v-app>
  </div>
</template>

<script>
import Navbar from "./components/Navbar";
import db from "@/fb";

export default {
  name: "App",
  components: {
    Navbar
  },

  data() {
    return {
      usuarios: [],
      login: false,
      user: "",
      pass: "",
      queryUser: false,
      queryPass: false
    };
  },
  methods: {
    submit() {
      this.login = true;
      router.push("/");
      //this.chkLogin(this.user, this.pass);
    },

    /**
     * TODO: Implementar un login que cuando detecte un usuario y contraseña correctos ponga this.login a true
     * y rediriga la página a localhost:8080 otra vez para poder ver así la aplicación en cuestión.
     * PERO NO VAAAAAAAAAAAASDJHAFLKAJDLAKSJF
     */
    chkLogin(usuario, password) {
      var userRef = db.collection("usuarios");

      var queryUser = userRef
        .where("nombre", "==", usuario)
        .get()
        .then(snapshotUser => {
          snapshotUser.forEach(doc => {
            console.log("query usuario", doc.id, "=>", doc.data());

            //return true;
          });
        });

      var queryPass = userRef
        .where("pass", "==", password)
        .get()
        .then(snapshotPass => {
          snapshotPass.forEach(doc => {
            console.log("query password", doc.id, "=>", doc.data());

            //return true;
          });
        });

      console.log(this.snapshotUser, this.snapshotPass);
    }
  },

  computed: {},

  created() {
    db.collection("usuarios").onSnapshot(res => {
      const changes = res.docChanges();

      changes.forEach(change => {
        if (change.type === "added") {
          this.usuarios.push({
            ...change.doc.data(),
            id: change.doc.id
          });
        }
      });
    });
  }
};
</script>

<style>
/* Vaina para quitar los spinButtons */
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  /* display: none; <- Crashes Chrome on hover */
  -webkit-appearance: none;
  margin: 0; /* <-- Apparently some margin are still there even though it's hidden */
}

input[type="number"] {
  -moz-appearance: textfield; /* Firefox */
}
</style>

