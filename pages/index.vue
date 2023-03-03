<script lang="ts">
export default {
  data() {
    // carga los últimos usados, si no están guardados se carga el primero
    const characterP1Index = localStorage.getItem('characterP1Index');
    const characterP2Index = localStorage.getItem('characterP2Index');

    return {
      characters: [characterP1Index ? parseInt(characterP1Index) : 0, characterP2Index ? parseInt(characterP2Index) : 0],
    };
  },
  mounted() {
    const audio = new Audio('/src/audio/stages/stage-menu.mp3');
    audio.volume = 0.5;
    audio.loop = true;
    audio.play();

    // let playing = false;

    // if (!playing) {
    //   audio.play();
    //   playing = true;
    // }
  },
};
</script>

<template>
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

      <MenuButtonStart button=" "></MenuButtonStart>
    </div>
  </div>
</template>
