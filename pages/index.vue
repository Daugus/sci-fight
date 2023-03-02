<script lang="ts">
export default {
  data() {
    return {
      characters: [astraeus, astraeus],
    };
  },
};
</script>

<template>
  <div class="flex h-screen w-screen flex-col justify-center overflow-hidden align-middle">
    <div class="relative flex w-full justify-between">
      <!-- Seleccion de mapa -->
      <MenuStageSelection />

      <!-- Seleccion personaje: Player 1 -->
      <MenuCharacterSelection
        :rotate="false"
        :controls="{
          left: 'a',
          right: 'd',
        }"
        :playerNumber="1"
      />

      <!-- Seleccion personaje: Player 2 -->
      <MenuCharacterSelection
        :rotate="true"
        :controls="{
          left: 'arrowright',
          right: 'arrowleft',
        }"
        :playerNumber="2"
      />

      <!-- TODO: PASAR MAPA -->
      <NuxtLink
        to="/arena"
        class="absolute bottom-10 mx-auto w-screen text-center"
      >
        Jugar
      </NuxtLink>
    </div>
  </div>
</template>
