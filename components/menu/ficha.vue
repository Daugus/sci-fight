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
      console.log(currentCharacter);
    },
  },
  watch: {},
};
</script>

<template>
  <div class="align- m-5 flex flex-col justify-center align-middle">
    <div class="">{{ currentCharacter.name.toUpperCase() }}</div>
    <div :class="['flex', 'p-2', rotar && 'rotate-x-180']">
      <div>
        <MenuPersonaje @getCurrentCharacter="getCurrentCharacter" />
      </div>
      <div class="col rotate-x-180 m-2 justify-center p-2 align-middle">
        <MenuEstadistica
          :character="currentCharacter"
          :estadistica="{ name: 'attack', value: currentCharacter.attack.damage * 1.9 }"
          :color-fondo="colorFondo"
        ></MenuEstadistica>
        <MenuEstadistica
          :character="currentCharacter"
          :estadistica="{ name: 'health', value: (currentCharacter.health * 100) / 180 }"
          :color-fondo="colorFondo"
        >
          vida
        </MenuEstadistica>
        <MenuEstadistica
          :character="currentCharacter"
          :estadistica="{ name: 'speed', value: currentCharacter.speed.space / currentCharacter.speed.time }"
          :color-fondo="colorFondo"
        >
          velocidad
        </MenuEstadistica>
      </div>
    </div>
  </div>
</template>

<style lang="scss"></style>
