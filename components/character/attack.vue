<script lang="ts">
import { Character } from '~~/utils/types';

export default {
  data() {
    return { index: 0 };
  },
  props: {
    character: { required: true, type: Object as PropType<Character> },
    playerNumber: { required: true, type: Number },
  },
  mounted() {
    const hurtbox = document.querySelector(`#attackP${this.playerNumber}`);

    if (!hurtbox) return;

    const rect = hurtbox.getBoundingClientRect();
    this.$emit(`getRect`, rect, this.playerNumber);
  },
  computed: {
    width() {
      return `${this.character.attack.hitbox.width}px`;
    },
  },
};
</script>

<template>
  <div
    class="attack z-20"
    :id="`attackP${playerNumber}`"
  >
    Attack {{ playerNumber }}
  </div>
</template>

<style lang="scss">
.attack {
  width: v-bind(width);
  height: 70px;
  background-color: rgba(0, 255, 0, 0.5);
  position: absolute;
  bottom: 0;
}
</style>
