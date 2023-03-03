<script lang="ts">
import { Character } from '~~/utils/types';

export default {
  emits: ['getRect'],
  data() {
    return { index: 0 };
  },
  props: {
    character: { required: true, type: Object as PropType<Character> },
    playerNumber: { required: true, type: Number },
    delays: { required: true, type: Object as PropType<number[]> },
  },
  mounted() {
    // Ataque
    const hurtbox = document.querySelector(`#attackP${this.playerNumber}`)!;

    const rect = hurtbox.getBoundingClientRect();
    this.attack(rect);
  },
  computed: {
    width() {
      return `${this.character.attack.hitbox.width}px`;
    },
  },
  methods: {
    // timeout que no ejecuta nada
    setDelayTimeout: (ms: number) => new Promise((res) => setTimeout(res, ms)),

    async attack(rect: DOMRect) {
      for (const [i, delay] of this.delays.entries()) {
        await this.setDelayTimeout(delay);

        this.$emit(`getRect`, rect, this.playerNumber, i === this.delays.length - 1);
      }
    },
  },
};
</script>

<template>
  <div
    class="attack z-20"
    :id="`attackP${playerNumber}`"
  ></div>
</template>

<style lang="scss">
.attack {
  width: v-bind(width);
  height: 70px;
  position: absolute;
  bottom: 0;
}
</style>
