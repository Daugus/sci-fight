<script lang="ts">
export default {
  data() {
    return {
      characterList: characters,
    };
  },
  mounted() {},
  methods: {
    toggleFullscreen() {
      if (document.fullscreenElement) return;
      document.documentElement.requestFullscreen();
    },
  },
};
</script>

<template>
  <div class="stage flex h-screen w-full items-center justify-center">
    <button
      @click="toggleFullscreen"
      id="fs"
    >
      fs
    </button>
    <ul class="text-white">
      <li
        v-for="(c, i) in characterList"
        :key="c.name"
      >
        {{ c.name }}
      </li>
    </ul>
  </div>
</template>

<style lang="scss">
.stage {
  background-image: url('/img/fondo.png');
  background-repeat: no-repeat;
  background-size: cover;
  background-position: 0;
}
</style>
