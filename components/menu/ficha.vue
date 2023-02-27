<script lang="ts">
import Character from '~~/utils/types';

export default {
  data() {
    return {
      currentCharacter: astraeus,
    };
  },
  props: {
    colorFondo: String,
    rotar: Boolean,
  },
  computed: {},
  mounted() {},
  methods: {
    getCurrentCharacter(currentCharacter: Character) {
      this.currentCharacter = currentCharacter;
    },
  },
  watch: {},
};
</script>

<template>
  <div class="flex flex-col justify-center align-middle">
    <div class="">{{ currentCharacter.name.toUpperCase() }}</div>
    <div :class="['flex', 'h-full', rotar && 'rotate-x-180']">
      <!-- Sprite personaje -->
      <MenuPersonaje @getCurrentCharacter="getCurrentCharacter" />
      <div class="rotate-x-180 flex h-full flex-col justify-center gap-11">
        <!-- Daño -->
        <MenuEstadistica
          :character="currentCharacter"
          :estadistica="{ name: 'attack', value: currentCharacter.attack.damage * 1.9 }"
          :color-fondo="colorFondo"
        ></MenuEstadistica>

        <!-- Vida -->
        <MenuEstadistica
          :character="currentCharacter"
          :estadistica="{ name: 'health', value: (currentCharacter.health * 100) / 180 }"
          :color-fondo="colorFondo"
        ></MenuEstadistica>

        <!-- Velocidad -->
        <MenuEstadistica
          :character="currentCharacter"
          :estadistica="{ name: 'speed', value: currentCharacter.speed.space / currentCharacter.speed.time }"
          :color-fondo="colorFondo"
        ></MenuEstadistica>
      </div>
    </div>
  </div>
</template>

<style lang="scss"></style>
