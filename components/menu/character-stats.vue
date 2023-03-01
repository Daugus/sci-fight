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
  <div class="graph-container absolute flex">
    <div
      class="statform transition-all"
      :style="`background-color: ${character.color}`"
    ></div>
  </div>
</template>

<style lang="scss">
.graph-container {
  width: 87%;
  height: 95%;

  .statform {
    width: 100%;
    height: 100%;
    clip-path: polygon(50% v-bind(attack), v-bind(speed), v-bind(health));
    filter: drop-shadow(0 0 0.2rem rgba(255, 255, 255, 0.1));
  }
}
</style>
