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
  <div class="stats-container flex w-64 flex-col justify-center align-middle">
    <div class="flex h-6 w-full overflow-visible">
      <div
        :class="['h-full', 'transition-all']"
        :style="`width: ${estadistica.value}%; background-color: ${character.color}`"
      ></div>
      <img
        class="z-50"
        src="/src/img/assets/stats_splitter.png"
      />
    </div>
  </div>
</template>

<style lang="scss">
.stats-container > div {
  position: relative;

  & > div {
    position: absolute;
    overflow: visible;
  }
}
</style>
