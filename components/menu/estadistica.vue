<script lang="ts">
import { PropType } from 'vue';
import Character from '~~/utils/types';
export default {
  data() {
    return {};
  },
  props: {
    estadistica: { required: true, type: Object as PropType<{ name: string; value: number }> },
    character: { required: true, type: Object as PropType<Character> },
  },
  computed: {},
};
</script>

<template>
  <div class="row m-2 w-64 p-2">
    <div class="mb-4 h-2.5 w-full rounded-full">
      <div
        :class="['h-2.5', 'rounded-full', 'transition-all']"
        :style="`width: ${estadistica.value}%; background-color: ${character.color}`"
      ></div>
    </div>
  </div>
</template>

<style lang="scss"></style>
