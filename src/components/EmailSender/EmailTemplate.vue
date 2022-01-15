<template>
  <v-row justify="center" align="center" class="ma-5">
    <v-col lg="9" md="9" sm="12">
  <v-card :elevation="elevation">
    <v-card-title>{{ cardTitle }}</v-card-title>
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
        variant="contained"
        color="secondary"
        @click="previewButtonClick()"
        >Preview</v-btn
      >

      <v-btn
        :disabled="templateFiles.length !== 1"
        right
        @click="readFile(fileType.template)"
        variant="contained"
        color="success"
        >Read template</v-btn
      >
    </v-card-actions>
  </v-card>
  </v-col>
  </v-row>
  <v-row
    justify="center"
    align="center"
    class="ma-5"
    v-show="showTemplateContent"
  >
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
      </v-btn>
    </v-card-title>
    <v-card-text class="overflow-x-auto overflow-y-auto" style="height: 300px">
      <div class="templatePreview" v-if="showTemplateContent" v-html="templateContent"></div>
      <div v-else>
        <h1>Something went wrong!</h1>
      </div>
    </v-card-text>
  </v-card>
  </v-col></v-row 
  >
</template>

<script lang="ts">
import { defineComponent } from "vue";
import FileType from "@/enum/FileTypes";
import store from "@/store";

export default defineComponent({
  name: "EmailTemplate",

  data() {
    return {
      elevation: 15,
      templateFiles: new Array<File>(),
      fileType: FileType,
      cardTitle: "Email Template",
    };
  },

  methods: {
    readFile(filetype: FileType) {
      if (this.templateFiles.length !== 1) {
        alert("No File Chosen");
      } else {
        var reader = new FileReader();

        reader.readAsText(this.templateFiles[0]);

        reader.onload = (e) => {
          if (filetype === FileType.template) {
            var result = reader.result as string;

            store.dispatch("addTemplate", result.replace(/(\r\n|\r|\n)/, ""));
          }
        };
      }
    },

    previewButtonClick() {
      store.dispatch(
        "updateShowTemplateContent",
        !store.getters.getShowTemplateContent
      );
    },
  },

  watch: {
    templateFiles(value: Array<File>) {
      if (value.length === 0) {
        store.dispatch("addTemplate", "");
      }
    },
  },

  computed: {
    isPreviewButtonDisable(): boolean {
      return (
        this.templateFiles.length !== 1 ||
        store.getters.getTemplateContent === ""
      );
    },

    templateContent(): string {
      return store.getters.getTemplateContent;
    },

    showTemplateContent(): boolean {
      return store.getters.getShowTemplateContent;
    },
  },
});
</script>

<style lang="sass" scoped>
.templatePreview
  background-color: #ffffff !important
  color: #000000 !important
</style>
