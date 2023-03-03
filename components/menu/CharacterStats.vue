<script lang="ts">
import { Character } from '~~/utils/types';

export default {
  data() {
    return {
      color: '',
    };
  },
  props: {
    character: { required: true, type: Object as PropType<Character> },
  },
  computed: {
    attack() {
      let percentage = 100 - (this.character.attack.damage * 100) / 40;
      return `${percentage - percentage / 2}%`;
    },
    speed() {
      let speed = this.character.speed.space / this.character.speed.time / 2 + 50;
      let rest = 100 - speed;
      return `${rest}% ${speed}%`;
    },
    health() {
      return `${(this.character.health * 100) / 140}% ${(this.character.health * 100) / 140}%`;
    },
  },
};
</script>

<template>
  <div class="graph-container absolute flex h-[95%] w-[87%]">
    <div
      class="statform h-full w-full brightness-110 transition-all"
      :style="`background-color: ${character.color}`"
    ></div>
  </div>
</template>

<style lang="scss">
.statform {
  clip-path: polygon(50% v-bind(attack), v-bind(speed), v-bind(health));
}
</style>
