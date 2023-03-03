<script lang="ts">
export default {
  data() {
    // carga los últimos usados, si no están guardados se carga el primero
    const characterP1Index = localStorage.getItem('characterP1Index');
    const characterP2Index = localStorage.getItem('characterP2Index');
    const audio = new Audio('/src/audio/menu/ambient.mp3');

    return {
      characters: [characterP1Index ? parseInt(characterP1Index) : 0, characterP2Index ? parseInt(characterP2Index) : 0],
      audio: audio,
    };
  },
  mounted() {
    this.audio.volume = 0.5;
    this.audio.loop = true;
    this.audio.play();
  },
  methods: {
    pauseAudio() {
      this.audio.pause();
    },
  },
};
</script>

<template>
  <div class="fondo absolute inset-0 -z-50 bg-red-500"></div>
  <div class="flex h-screen w-screen flex-col justify-center overflow-hidden align-middle">
    <div class="relative flex w-full justify-between">
      <!-- Seleccion personaje: Player 1 -->
      <MenuCharacterSelection
        :rotate="false"
        :controls="{
          left: 'a',
          right: 'd',
        }"
        :playerNumber="1"
        :characterIndex="characters[0]"
      />

      <!-- Seleccion personaje: Player 2 -->
      <MenuCharacterSelection
        :rotate="true"
        :controls="{
          left: 'arrowright',
          right: 'arrowleft',
        }"
        :playerNumber="2"
        :characterIndex="characters[1]"
      />

      <!-- Seleccion de mapa -->
      <MenuStageSelection
        :controls="{
          left: 'n',
          right: 'm',
        }"
      />

      <MenuButtonStart
        button=" "
        @pauseAudio="pauseAudio"
      ></MenuButtonStart>
    </div>
  </div>
</template>
