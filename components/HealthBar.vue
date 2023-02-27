<script lang="ts">
import { PropType } from 'vue';
import Character from '~~/utils/types';
export default {
  data() {
    return {};
  },
  props: {
    character: { required: true, type: Object as PropType<Character> },
    currentHealth: { required: true, type: Number },
  },
  computed: {
    charactersCurrentHealth() {
      return (this.currentHealth / this.character.health) * 100;
    },
  },
};
// character.health
</script>

<template>
  <div class="flex h-6 w-full overflow-visible bg-red-600">
    <div
      :class="['h-full', 'transition-all']"
      :style="`width: ${charactersCurrentHealth}%; background-color: ${character.color}`"
    ></div>
  </div>
</template>

<style lang="scss"></style>
