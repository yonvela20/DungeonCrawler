<template>
  <div>
    <v-app class="grey lighten-4">
      <v-content class="mx-4 mb-4">
        <router-view></router-view>
      </v-content>
    </v-app>
  </div>
</template>

<script>
import Navbar from "./components/Navbar";

export default {
  name: "App",
  components: {
    Navbar
  },

  data() {
    return {};
  },
  methods: {},

  computed: {}
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

