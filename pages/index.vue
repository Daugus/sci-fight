<script lang="ts">
import { assertNuxtCompatibility } from '@nuxt/kit';
import { AutomaticPrefetchPlugin } from 'webpack';

export default {
  data() {
    // carga los últimos usados, si no están guardados se carga el primero
    const characterP1Index = localStorage.getItem('characterP1Index');
    const characterP2Index = localStorage.getItem('characterP2Index');

    return {
      characters: [characterP1Index ? parseInt(characterP1Index) : 0, characterP2Index ? parseInt(characterP2Index) : 0],
    };
  },
};
</script>

<template>
  <div class="background absolute inset-0 -z-50"></div>
  <div class="flex h-screen w-screen flex-col justify-center overflow-hidden align-middle">
    <div class="custom-shadow relative flex w-full justify-between">
      <!-- Seleccion personaje: Player 1 -->
      <MenuCharacterSelection
        :rotate="false"
        :controls="{
          previous: 'a',
          next: 'd',
        }"
        :playerNumber="1"
        :characterIndex="characters[0]"
      />

      <!-- Seleccion personaje: Player 2 -->
      <MenuCharacterSelection
        :rotate="true"
        :controls="{
          previous: 'arrowright',
          next: 'arrowleft',
        }"
        :playerNumber="2"
        :characterIndex="characters[1]"
      />

      <!-- Seleccion de mapa -->
      <MenuStageSelection
        :controls="{
          previous: 'n',
          next: 'm',
        }"
      />

      <MenuButtonStart button=" "></MenuButtonStart>
    </div>
  </div>
</template>

<style lang="scss">
.background {
  background: rgb(37, 37, 37);
  background: linear-gradient(0deg, #252525 0%, #353535 100%);
}

.custom-shadow {
  filter: drop-shadow(0 0 0.5rem black);
}
</style>
