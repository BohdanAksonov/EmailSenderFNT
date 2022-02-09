<template>
  <v-app>
    <v-app-bar absolute>
      <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>
    </v-app-bar>
    <Drawer :drawer="drawer" />

    <v-main>
      <v-container fluid>
        <router-view />
      </v-container>
    </v-main>
  </v-app>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import Drawer from "@/components/Drawer.vue";
import store from "@/store/index";

export default defineComponent({
  name: "App",

  components: {
    Drawer,
  },

  data() {
    return {
      drawer: true,
    };
  },
});
</script>
