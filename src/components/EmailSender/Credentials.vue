<template>
  <div class="text-center">
    <v-dialog v-model="credentialsDialog">
      <v-card>
        <v-card-text>
          <v-text-field
            v-model="from"
            label="From"
            required
            density="comfortable"
          ></v-text-field>
          <v-text-field
            v-model="subject"
            label="Subject"
            required
            density="comfortable"
          ></v-text-field>
          <v-text-field
            v-model="emailAddress"
            label="Email Address"
            required
            density="comfortable"
          ></v-text-field>
          <v-text-field
            v-model="password"
            :append-icon="show ? 'mdi-eye' : 'mdi-eye-off'"
            :type="show ? 'text' : 'password'"
            label="Password"
            @click:append="show = !show"
            required
            density="comfortable"
          ></v-text-field>
        </v-card-text>
        <v-card-actions>
          <v-btn
            color="primary"
            :disabled="isSendButtonDisable"
            block
            @click="onClick()"
            >Send</v-btn
          >
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import CredentialDialogModel from "@/models/CredentialDialogModel";
import CredentialModel from "@/models/CredentialModel";
import CryptoHelper from "@/helpers/cryptoHelper";

export default defineComponent({
  name: "Credentials",

  props: {
    credentialsDialog: {
      type: Boolean,
      require: true,
    },
  },

  emits: ["closeCredentialsDialog"],

  data() {
    return {
      emailAddress: "",
      password: "",
      show: false,
      subject: "",
      from: "",
    };
  },

  methods: {
    onClick() {
      let credentialModel = new CredentialModel(
        CryptoHelper.encrypt(this.emailAddress),
        CryptoHelper.encrypt(this.password)
      );

      let credentialDialogModel = new CredentialDialogModel(
        credentialModel,
        this.subject,
        this.from
      );

      this.$emit("closeCredentialsDialog", credentialDialogModel);
    },
  },

  computed: {
    isSendButtonDisable(): boolean {
      return (
        this.emailAddress === "" ||
        this.password === "" ||
        this.subject === "" ||
        this.from === ""
      );
    },
  },
});
</script>

<style></style>
