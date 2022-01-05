<template>
  <start />
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import Start from '../components/Start.vue';

export default defineComponent({
  name: 'Home',

  components: {
    Start,
  },
});
</script>
