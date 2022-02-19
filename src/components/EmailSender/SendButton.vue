<template>
  <v-row justify="center" align="center" class="ma-5">
    <v-col lg="9" md="9" sm="12">
      <div v-if="!sentToApi">
        <v-btn
          block
          variant="outlined"
          color="primary"
          :disabled="isSendButtonDisable"
          @click="credentialsDialog = true"
          >Send</v-btn
        >
      </div>
      <div v-else>
        <v-progress-circular
          indeterminate
          color="primary"
          class="progress"
        ></v-progress-circular>
      </div>
    </v-col>
  </v-row>
  <credentials
    :credentialsDialog="credentialsDialog"
    @closeCredentialsDialog="closeCredentialsDialogEvent($event)"
  />
</template>

<script lang="ts">
import { defineComponent } from "vue";
import SendEmailPayloadModel from "@/models/SendEmailPayloadModel";
import http from "@/plugins/http";
import store from "@/store";
import ReceiverModel from "@/models/ReceiverModel";
import Credentials from "@/components/EmailSender/Credentials.vue";
import CredentialDialogModel from "@/models/CredentialDialogModel";
import CryptoHelper from "@/helpers/cryptoHelper";

export default defineComponent({
  name: "SendButton",
  components: {
    Credentials,
  },
  data() {
    return {
      sentToApi: false,
      credentialsDialog: false,
    };
  },

  methods: {
    closeCredentialsDialogEvent(model: CredentialDialogModel) {
      this.credentialsDialog = false;
      this.sendToApi(model);
    },

    sendToApi(model: CredentialDialogModel) {
      this.sentToApi = true;
      let requestPayload = new SendEmailPayloadModel(
        this.receivers,
        btoa(this.templateContent),
        model.subject,
        model.credential,
        model.from
      );

      http
        .post("send-email", JSON.stringify(requestPayload), {
          headers: {
            "Content-Type": "application/json",
          },
        })
        .then(function (response) {
          console.log(response);
        })
        .catch(function (error) {
          console.log(error);
        })
        .finally(() => {
          this.sentToApi = false;
        });
    },
  },

  computed: {
    isSendButtonDisable(): boolean {
      return this.templateContent === "" || this.receivers.length === 0;
    },

    receivers(): Array<ReceiverModel> {
      return store.getters.getReceivers;
    },

    templateContent(): string {
      return store.getters.getTemplateContent;
    },
  },
});
</script>

<style lang="sass" scoped>
.progress
  left: 50%
</style>
