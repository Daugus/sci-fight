<script lang="ts">
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
    play: () => window.location.replace('/arena'),
  },
};
</script>

<template>
  <button
    class="absolute bottom-12 z-30 mx-auto w-screen text-center"
    @click="play"
  >
    Jugar
  </button>
</template>
