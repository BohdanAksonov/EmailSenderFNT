<template>
  <v-row justify="center" align="center" class="ma-5">
    <v-col cols="auto" lg="5" md="5">
      <v-card>
        <v-card-title>EMAIL TEMPLATE</v-card-title>
        <v-card-text>
          <v-file-input
            show-size
            small-chips
            label="Select file with template"
            density="default"
            v-model="templateFiles"
            accept=".htm"
            color="info"
            prepend-icon="mdi-camera"
          ></v-file-input>
        </v-card-text>
        <v-card-actions class="justify-end">
          <v-btn
            :disabled="isPreviewButtonDisable"
            right
            variant="outlined"
            color="secondary"
            @click="showTemplateContent = !showTemplateContent"
            >Preview</v-btn
          >

          <v-btn
            :disabled="templateFiles.length !== 1"
            right
            @click="readFile(fileType.template)"
            variant="outlined"
            color="success"
            >Read template</v-btn
          >
        </v-card-actions>
      </v-card>
    </v-col>
  </v-row>

  <v-row justify="center" align="center" class="ma-5">
    <v-col cols="auto" lg="5" md="5">
      <v-card v-show="showTemplateContent">
        <v-card-title color="primary">Preview</v-card-title>
        <v-card-text
          class="overflow-x-auto overflow-y-auto"
          style="max-height: 400px"
        >
          <div v-html="templateContent"></div>
        </v-card-text>
        <v-card-actions class="justify-end">
          <v-btn
            variant="outlined"
            color="warning"
            @click="showTemplateContent = false"
            >Close</v-btn
          >
        </v-card-actions>
      </v-card>
    </v-col>
  </v-row>

  <v-row justify="center" align="center" class="ma-5">
    <v-col cols="auto" lg="5" md="5">
      <v-card>
        <v-card-title>RECEIVERS</v-card-title>
        <br />
        <v-card-text>
          <v-file-input
            show-size
            small-chips
            label="Select file with receivers"
            density="comfortable"
            v-model="receiversFiles"
            accept=".csv"
            color="info"
          >
          </v-file-input>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            :disabled="isPreviewReceiversButtonDisable"
            right
            variant="outlined"
            color="secondary"
            @click="showReceiversContent = !showReceiversContent"
            >Preview</v-btn
          >
          <v-btn
            :disabled="receiversFiles.length !== 1"
            right
            @click="readFile(fileType.receiver)"
            variant="outlined"
            color="success"
            >Read Receivers</v-btn
          >
        </v-card-actions>
      </v-card>
    </v-col>
  </v-row>

  <v-row justify="center" align="center" class="ma-5">
    <v-col cols="auto" lg="5" md="5">
      <v-card v-show="showReceiversContent">
        <v-card-title color="primary">Preview</v-card-title>
        <v-card-text class="overflow-x-auto" style="max-height: 400px">
          <table>
            <thead>
              <tr>
                <th>Full name</th>
                <th>Email</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(receiver, index) in receivers" :key="index">
                <td>{{ receiver.name }}</td>
                <td>{{ receiver.emailaddress }}</td>
              </tr>
            </tbody>
          </table>
        </v-card-text>
        <v-card-actions class="justify-end">
          <v-btn
            variant="outlined"
            color="warning"
            @click="showReceiversContent = false"
            >Close</v-btn
          >
        </v-card-actions>
      </v-card>
    </v-col>
  </v-row>

  <v-row justify="center" align="center">
    <v-col cols="auto" lg="5" md="5">
      <div v-if="!sentToApi">
        <v-btn
          block
          variant="outlined"
          color="primary"
          :disabled="isSendButtonDisable"
          @click="send()"
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
</template>

<script lang="ts">
import { defineComponent } from "vue";
import FileType from "@/enum/FileTypes";
import ReceiverModel from "@/models/ReceiverModel";
import http from "@/plugins/http";
import SendEmailPayloadModel from "@/models/SendEmailPayloadModel";

export default defineComponent({
  name: "Start",

  data() {
    return {
      templateFiles: new Array<File>(),
      templateContent: "",
      receiversFiles: new Array<File>(),
      fileType: FileType,
      showTemplateContent: false,
      showReceiversContent: false,
      receivers: new Array<ReceiverModel>(),
      sentToApi: false,
    };
  },
  methods: {
    readFile(filetype: FileType) {
      if (this.templateFiles.length !== 1 && this.receiversFiles.length !== 1) {
        alert("No File Chosen");
      } else {
        var reader = new FileReader();

        reader.readAsText(
          filetype === FileType.template
            ? this.templateFiles[0]
            : this.receiversFiles[0]
        );

        reader.onload = (e) => {
          if (filetype === FileType.template) {
            this.templateContent = reader.result as string;
          } else {
            if (this.receivers.length > 0) {
              this.receivers = new Array<ReceiverModel>();
            }

            var readerResult = reader.result as string;
            var lines = readerResult.split(/[\n]+/);

            lines.forEach((element) => {
              var items = element.split(";");
              if (items.length === 2) {
                var receiver = new ReceiverModel(
                  items[0].trim(),
                  items[1].trim()
                );
                this.receivers.push(receiver);
              }
            });
          }
        };
      }
    },

    send() {
      this.sentToApi = true;

      let requestPayload = new SendEmailPayloadModel(
        this.receivers,
        btoa(this.templateContent),
        "test subject"
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
        .finally(()=>{
          this.sentToApi = false;
        });
    },
  },
  computed: {
    isPreviewButtonDisable(): boolean {
      return this.templateFiles.length !== 1 || this.templateContent === "";
    },

    isPreviewReceiversButtonDisable(): boolean {
      return this.receiversFiles.length !== 1 || this.receivers.length === 0;
    },

    isSendButtonDisable(): boolean {
      return this.templateFiles.length !== 1 || this.receivers.length === 0;
    },
  },
  watch: {
    templateFiles(value: Array<File>) {
      if (value.length === 0) {
        this.templateContent = "";
      }
    },

    receiversFiles(value: Array<File>) {
      if (value.length === 0) {
        this.receivers = new Array<ReceiverModel>();
      }
    },
  },
});
</script>
<style lang="sass" scoped>
table
  font-family: Roboto, sans-serif
  border-collapse: collapse
  width: 100%

td, th
  border: 1px solid #dddddd
  text-align: left
  padding: 8px

tr:nth-child(even)
  background-color: #616161

.progress
  left: 50%
</style>
