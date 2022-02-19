<template>
  <v-row>
    <v-col>
      <email-template />
    </v-col>
  </v-row>
  <v-row>
    <v-col>
      <receivers />
    </v-col>
  </v-row>
  <v-row>
    <v-col>
      <send-button />
    </v-col>
  </v-row>
  <v-row>
    <v-btn @click="test()">Test</v-btn>
  </v-row>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import EmailTemplate from "@/components/EmailSender/EmailTemplate.vue";
import Receivers from "@/components/EmailSender/Receivers.vue";
import SendButton from "@/components/EmailSender/SendButton.vue";
import http from "@/plugins/http";

export default defineComponent({
  name: "EmailSender",

  components: {
    EmailTemplate,
    Receivers,
    SendButton,
  },

  computed: {},

  methods: {
    test() {
      http
        .get("test", {
          headers: {
            "Content-Type": "application/json",
          },
        })
        .then(function (response) {
          console.log(response);
        })
        .catch(function (error) {
          console.log(error);
        });
    },
  },
});
</script>
