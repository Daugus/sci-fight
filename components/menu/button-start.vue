<script lang="ts">
import { emit } from 'process';

export default {
  props: {
    button: { required: true, type: String },
  },
  mounted() {
    document.addEventListener('keydown', this.keyUp);
  },
  methods: {
    keyUp(event: KeyboardEvent) {
      if (event.key === this.button) this.play();
    },
    play() {
      setTimeout(() => {
        window.location.replace('/arena');
      }, 100);
      this.$emit('pauseAudio', true);
    },
  },
};
</script>

<template>
  <div class="play absolute z-50 flex justify-center pb-2 text-center align-middle">
    <button
      class="jupiter-crash h-full w-full text-5xl text-[]"
      @click="play"
    >
      Jugar
    </button>
  </div>
</template>

<style lang="scss">
.play {
  inset: 88.6% 38.85% 2% 38.85%;

  button {
    color: white;
    transition: all ease-in-out 0.5s;

    &:hover {
      color: #ffc42e;
      -webkit-text-stroke: 1px #ff7d01;
      filter: drop-shadow(0 0 0.1rem #ff7d01);
    }
  }
}
</style>
