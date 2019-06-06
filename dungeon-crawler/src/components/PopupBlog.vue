<template>
  <v-dialog max-width="600px" v-model="dialog">
    <v-btn flat slot="activator" class="success">Nuevo Post</v-btn>
    <v-card ref="card">
      <v-card-title>
        <h2>Añadir una nueva entrada</h2>
      </v-card-title>
      <v-card-text>
        <v-form class="px-3" ref="form">
          <v-spacer></v-spacer>

          <v-text-field label="Título" v-model="titulo" :rules="inputRules"></v-text-field>
          <v-textarea label="Contenido" v-model="contenido" :rules="inputRules"></v-textarea>
          <v-btn flat class="success mx-0 mt-3" @click="submit" :loading="loading">Añadir entrada</v-btn>
        </v-form>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script>
import { db } from "@/fb";

export default {
  data() {
    return {
      titulo: "",
      contenido: "",
      autor: window.localStorage.getItem("nombre"),
      like: 1,
      dislike: 0,
      inputRules: [
        v =>
          (v.length >= 3 && v.length <= 140) || "Minimum Length is 3 characters"
      ],
      loading: false,
      dialog: false
    };
  },
  methods: {
    submit() {
      if (this.$refs.form.validate()) {
        //console.log(this.title, this.content);
        this.loading = true;

        const blog = {
          titulo: this.titulo,
          contenido: this.contenido,
          autor: this.autor,
          like: this.like,
          dislike: this.dislike
        };

        db.collection("blog")
          .add(blog)
          .then(() => {
            //console.log("Added to db");
            this.loading = false;
            this.dialog = false;

            this.titulo = null;
            this.contenido = null;
          });
      }
    }
  },

  computed: {}
};
</script>
