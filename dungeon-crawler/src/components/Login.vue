<template>
  <div class="login">
    <h1 class="subheading grey--text">Login</h1>
    <v-container class="my-5">
      <v-form class="px-3" ref="form">
        <v-text-field label="Usuario" v-model="nombre" prepend-icon="person" :rules="inputRules"></v-text-field>
        <v-text-field
          label="Contraseña"
          v-model="pass"
          prepend-icon="vpn_key"
          type="password"
          :rules="inputRules"
        ></v-text-field>
        <v-spacer></v-spacer>
        <v-btn flat class="success mx-0 mt-3" @click="submit" :loading="loading">Login</v-btn>
      </v-form>
    </v-container>
  </div>
</template>

<script>
import format from "date-fns/format";
import db from "@/fb";

export default {
  data() {
    return {};
  },
  methods: {
    submit() {}
  },

  computed: {}
};
</script>
