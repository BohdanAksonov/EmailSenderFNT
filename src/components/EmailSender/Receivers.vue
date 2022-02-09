<template>
  <v-row justify="center" align="center" class="ma-5">
    <v-col lg="9" md="9" sm="12">
      <v-card :elevation="elevation">
        <v-card-title>{{ cardTitle }}</v-card-title>
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
            variant="contained"
            color="secondary"
            @click="previewButtonClick()"
            >Preview</v-btn
          >
          <v-btn
            :disabled="receiversFiles.length !== 1"
            right
            @click="readFile()"
            variant="contained"
            color="success"
            >Read Receivers</v-btn
          >
        </v-card-actions>
      </v-card>
    </v-col>
  </v-row>
  <v-row justify="center" align="center" class="ma-5" v-show="showReceivers">
    <v-col lg="9" md="9" sm="12">
      <v-card :elevation="elevation">
        <v-card-title color="primary"
          >Preview
          <v-spacer></v-spacer>
          <v-btn
            variant="text"
            icon
            size="x-small"
            @click="previewButtonClick()"
          >
            <v-icon>mdi-window-close</v-icon>
          </v-btn></v-card-title
        >
        <v-card-text
          class="overflow-x-auto overflow-y-auto"
          style="height: 300px"
        >
          <div v-if="showReceivers">
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
          </div>
          <div v-else>
            <h1>Something went wrong!</h1>
          </div>
        </v-card-text>
      </v-card>

      <file-options
        :fileOptionsDialog="fileOptionsDialog"
        @closeFileOptionsDialog="closeFileOptionsDialogEvent($event)"
      />
    </v-col>
  </v-row>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import store from "@/store";
import ReceiverModel from "@/models/ReceiverModel";
import FileOptions from "./FileOptions.vue";

export default defineComponent({
  name: "Receivers",
  components: {
    FileOptions,
  },

  data() {
    return {
      elevation: 15,
      receiversFiles: new Array<File>(),
      cardTitle: "Receivers",
      fileOptionsDialog: false,
      delimiter: "",
      endFileChars: ["\r", ""],
    };
  },

  methods: {
    readFile() {
      if (this.receiversFiles.length !== 1) {
        alert("No File Chosen");
      }

      if (this.delimiter === "") {
        this.fileOptionsDialog = true;
      } else {
        var reader = new FileReader();
        reader.readAsText(this.receiversFiles[0]);
        reader.onload = (e) => {
          if (store.getters.getReceivers.length > 0) {
            store.dispatch("addReceivers", new Array<ReceiverModel>());
          }
          var readerResult = reader.result as string;
          var lines = readerResult.split(/[\n]+/);
          var receivers = new Array<ReceiverModel>();
          lines.forEach((element) => {
            var items = element.split(this.delimiter);

            if (items.length === 2) {
              var receiver = new ReceiverModel(
                items[0].trim(),
                items[1].trim()
              );
              receivers.push(receiver);
            } else if (
              items.length === 1 &&
              this.endFileChars.includes(items[0])
            ) {
              return;
            } else {
              alert("Wrong delimiter or file.");
              this.delimiter = "";

              throw new Error("Wrong delimiter or file.");
            }
          });
          store.dispatch("addReceivers", receivers);
        };
      }
    },

    closeFileOptionsDialogEvent(value: string) {
      this.fileOptionsDialog = false;
      if (value !== undefined && value !== "") {
        this.delimiter = value;
        this.readFile();
      } else {
        alert("Wrong delimiter");
      }
    },

    previewButtonClick() {
      store.dispatch("updateShowReceivers", !store.getters.getShowReceivers);
    },
  },

  computed: {
    isPreviewReceiversButtonDisable(): boolean {
      return (
        this.receiversFiles.length !== 1 ||
        store.getters.getReceivers.length === 0
      );
    },

    receivers(): Array<ReceiverModel> {
      return store.getters.getReceivers;
    },

    showReceivers(): boolean {
      return store.getters.getShowReceivers;
    },
  },

  watch: {
    receiversFiles(value: Array<File>) {
      if (value.length === 0) {
        store.dispatch("addReceivers", new Array<ReceiverModel>());
        this.delimiter = "";
        store.dispatch("updateShowReceivers", !store.getters.getShowReceivers);
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
  background-color: #4f3c3c
</style>
