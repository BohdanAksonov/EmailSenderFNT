<template>
  <div class="drawer">
    <v-navigation-drawer
      class="navigation-drawer"
      v-model="drawer"
      app
      v-model:mini-variant="mini"
    >
      <v-divider></v-divider>

      <v-list nav dense="compact" flat>
        <v-list-item-group v-model="model" active-class="border">
          <v-list-item
            :prepend-icon="item.icon"
            :title="item.title"
            v-for="item in navigationItems"
            :key="item.id"
            :to="item.to"
          ></v-list-item>
        </v-list-item-group>
      </v-list>
    </v-navigation-drawer>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";

export default defineComponent({
  name: "Drawer",

  props: {
    drawer: {
      type: Boolean,
      required: true,
    },
  },

  data() {
    return {
      navigationItems: [
        {
          id: 1,
          title: "EMAIL SENDER",
          to: "/email-sender",
          icon: "mdi-email",
        },
        {
          id: 1,
          title: "TEMPLATE MAPPER",
          to: "/template-mapper",
          icon: "mdi-card-bulleted-settings",
        },
      ],
      mini: true,
      model: 1,
    };
  },
});
</script>
