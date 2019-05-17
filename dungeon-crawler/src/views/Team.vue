<template>
  <div class="team">
    <div>
      <Navbar/>
    </div>
    <h1 class="subheading grey--text">Your team</h1>

    <v-container class="my-5">
      <v-layout row wrap>
        <v-flex xs12 sm6 md4 lg3 v-for="personaje in personajes" :key="personaje.nombre">
          <v-card flat class="text-xs-center ma-3">
            <v-responsive class="pt-4">
              <v-avatar size="100" class="grey lighten-2">
                <img :src="'/'+personaje.raza+'.png'">
              </v-avatar>
            </v-responsive>
            <v-card-text>
              <div class="subheading">Nombre: {{personaje.nombre}}</div>
              <div class="grey--text">Raza: {{personaje.raza}}</div>
              <div class="grey--text">Fuerza: {{personaje.fue}}</div>
              <div class="grey--text">Constitución: {{personaje.con}}</div>
              <div class="grey--text">Destreza: {{personaje.des}}</div>
              <div class="grey--text">Inteligencia: {{personaje.int}}</div>
              <div class="grey--text">Sabiduría: {{personaje.sab}}</div>
              <div class="grey--text">Carisma: {{personaje.car}}</div>
            </v-card-text>
            <!-- <v-card-actions>
              <v-btn flat color="grey">
                <v-icon small left>message</v-icon>
                <span>Message</span>
              </v-btn>
            </v-card-actions>-->
          </v-card>
        </v-flex>
      </v-layout>
    </v-container>
  </div>
</template>

<script>
import { db } from "@/fb";
import Navbar from "../components/Navbar";

export default {
  components: {
    Navbar
  },
  data() {
    return {
      personajes: []
    };
  },

  created() {
    db.collection("personajes").onSnapshot(res => {
      const changes = res.docChanges();

      changes.forEach(change => {
        if (change.type === "added") {
          this.personajes.push({
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
