<template>
  <div class="login">
    <v-container class="my-5">
      <v-content class="mx-4 mb-4">
        <v-container fill-height class="my-5">
          <v-form class="px-3" ref="form">
            <v-text-field
              v-model="email"
              label="e-mail (con esto se hará login)"
              prepend-icon="person"
            ></v-text-field>
            <v-text-field v-model="nombre" label="Nombre de usuario" prepend-icon="person"></v-text-field>
            <v-text-field type="password" v-model="pass" label="Contraseña" prepend-icon="vpn_key"></v-text-field>
            <v-text-field
              type="password"
              v-model="confirmPass"
              label="Confirmar contraseña"
              prepend-icon="vpn_key"
            ></v-text-field>
            <v-btn flat class="success mx-0 mt-3" @click="signUp">Sign up!</v-btn>
          </v-form>
        </v-container>
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
      nombre: "",
      email: "",
      pass: "",
      confirmPass: ""
    };
  },
  methods: {
    signUp() {
      const userAdded = {
        nombre: this.nombre,
        pass: this.pass,
        activo: true,
        email: this.email
      };

      if (this.pass === this.confirmPass) {
        auth
          .createUserWithEmailAndPassword(this.email, this.pass)
          .then(user => {
            auth.onAuthStateChanged(user => {
              db.collection("usuarios")
                .doc(user.uid)
                .set(userAdded)
                .then(() => {
                  console.log("Usuario añadido??????");
                });
            });
          })
          .then(this.$router.replace("/login"))
          .catch(err => {
            alert(err.message);
          });
      } else {
        alert("Las contraseñas no coinciden");
      }
    }
  },
  computed: {}
};
</script>
