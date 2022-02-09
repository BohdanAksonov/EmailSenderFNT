<template>
  <div class="text-center">
    <v-dialog v-model="fileOptionsDialog">
      <v-card>
        <v-card-text>
          <v-radio-group v-model="delimiter" mandatory>
            <v-radio label="Semicolon" value=";"></v-radio>
            <v-radio label="Comma" value=","></v-radio>
          </v-radio-group>
        </v-card-text>
        <v-card-actions>
          <v-btn color="primary" block @click="onClick()">Select delimiter</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "FileOptions",
  props: {
    fileOptionsDialog: {
      type: Boolean,
      require: true,
    },
  },
  emits: ["closeFileOptionsDialog"],
  data() {
    return {
      delimiter: ";",
    };
  },

  methods: {
    onClick() {
      this.$emit("closeFileOptionsDialog", this.delimiter);
    },
  },
});
</script>

<style></style>
