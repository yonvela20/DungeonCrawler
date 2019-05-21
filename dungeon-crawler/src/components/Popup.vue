<template>
  <v-dialog max-width="600px" v-model="dialog">
    <v-btn flat slot="activator" class="success">Añadir un nuevo personaje</v-btn>
    <v-card ref="card">
      <v-card-title>
        <h2>Añadir un nuevo personaje</h2>
      </v-card-title>
      <v-card-text>
        <v-form class="px-3" ref="form">
          <v-text-field label="Nombre" v-model="nombre" prepend-icon="folder" :rules="inputRules"></v-text-field>
          <v-text-field
            label="Duenyo"
            readonly
            v-model="duenyo"
            prepend-icon="person"
            :rules="inputRules"
          >{{duenyo}}</v-text-field>
          <v-text-field
            v-model="con"
            type="number"
            label="Constitución"
            append-outer-icon="add"
            @click:append-outer="con++"
            prepend-icon="remove"
            @click:prepend="con--"
          ></v-text-field>

          <v-text-field
            v-model="des"
            type="number"
            label="Destreza"
            append-outer-icon="add"
            @click:append-outer="des++"
            prepend-icon="remove"
            @click:prepend="des--"
          ></v-text-field>

          <v-text-field
            v-model="fue"
            type="number"
            label="Fuerza"
            append-outer-icon="add"
            @click:append-outer="fue++"
            prepend-icon="remove"
            @click:prepend="fue--"
          ></v-text-field>

          <v-text-field
            v-model="int"
            type="number"
            label="Inteligencia"
            append-outer-icon="add"
            @click:append-outer="int++"
            prepend-icon="remove"
            @click:prepend="int--"
          ></v-text-field>

          <v-text-field
            v-model="sab"
            type="number"
            label="Sabiduría"
            append-outer-icon="add"
            @click:append-outer="sab++"
            prepend-icon="remove"
            @click:prepend="sab--"
          ></v-text-field>

          <v-text-field
            v-model="car"
            type="number"
            label="Carisma"
            append-outer-icon="add"
            @click:append-outer="car++"
            prepend-icon="remove"
            @click:prepend="car--"
          ></v-text-field>

          <v-container id="razas-picker" grid-list-xl>
            <v-layout row wrap>
              <v-flex xs12 sm4>
                <span>Razas</span>

                <v-overflow-btn v-model="raza" :items="razas" label="Raza" target="#razas-picker"></v-overflow-btn>
              </v-flex>
            </v-layout>
          </v-container>

          <v-spacer></v-spacer>

          <v-btn flat class="success mx-0 mt-3" @click="submit" :loading="loading">Añadir personaje</v-btn>
        </v-form>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script>
import format from "date-fns/format";
import { db } from "@/fb";

export default {
  data() {
    return {
      nombre: "",
      raza: "",
      duenyo: window.localStorage.getItem("nombre"),
      con: 0,
      des: 0,
      fue: 0,
      int: 0,
      sab: 0,
      car: 0,
      razas: [
        "elfo",
        "humano",
        "enano",
        "mediano",
        "orco",
        "semielfo",
        "semiorco"
      ],
      inputRules: [v => v.length >= 3 || "Minimum Length is 3 characters"],
      loading: false,
      dialog: false
    };
  },
  methods: {
    submit() {
      if (this.$refs.form.validate()) {
        //console.log(this.title, this.content);
        this.loading = true;

        const personaje = {
          nombre: this.nombre,
          raza: this.raza,
          duenyo: this.duenyo,
          con: this.con,
          des: this.des,
          fue: this.fue,
          int: this.int,
          sab: this.sab,
          car: this.car
        };

        db.collection("personajes")
          .add(personaje)
          .then(() => {
            //console.log("Added to db");
            this.loading = false;
            this.dialog = false;
            this.$emit("projectAdded");

            this.nombre = null;
            //this.raza = null;
            this.duenyo = null;
            (this.con = 0),
              (this.des = 0),
              (this.fue = 0),
              (this.int = 0),
              (this.sab = 0),
              (this.car = 0);
          });
      }
    }
  },

  computed: {}
};
</script>
