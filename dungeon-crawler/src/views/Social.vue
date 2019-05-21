<template>
  <div class="dashboard">
    <div>
      <Navbar/>
    </div>
    <h1 class="subheading grey--text">Social</h1>
    <v-text-field append-icon="search" label="Filter" single-line hide-details v-model="search"></v-text-field>
    <v-spacer></v-spacer>
    <br>
    <v-container class="my-5">
      <v-layout row wrap>
        <v-flex xs12 sm6 md4 lg3 v-for="user in filteredValues" :key="user.nombre">
          <v-card flat class="text-xs-center ma-3">
            <v-responsive class="pt-4">
              <v-avatar size="100" class="grey lighten-2">
                <img src="/elfo.png">
              </v-avatar>
            </v-responsive>
            <v-card-text>
              <div class="subheading">Usuario: {{user.nombre}}</div>
            </v-card-text>
            <v-card-actions>
              <v-btn flat color="grey" @click="addFriend">
                <v-icon small left>person_add</v-icon>
                <span>Añadir a amigos</span>
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-flex>
      </v-layout>
    </v-container>
  </div>
</template>

<script>
import { db, auth } from "@/fb";
import Navbar from "../components/Navbar";

export default {
  components: {
    Navbar
  },
  data() {
    return {
      usuarios: [],
      search: ""
    };
  },

  methods: {
    addFriend() {
      console.log("e");
    }
  },

  computed: {
    filteredValues: function() {
      return this.usuarios.filter(usuarios => {
        return usuarios.nombre.match(this.search);
      });
    }
  },

  created() {
    db.collection("usuarios").onSnapshot(res => {
      const changes = res.docChanges();

      changes.forEach(change => {
        if (change.type === "added") {
          this.usuarios.push({
            ...change.doc.data(),
            id: change.doc.id
          });
        } else if (change.type === "removed") {
          this.$router.go();
        }
      });
    });
  }
};
</script>

<style>
</style>

