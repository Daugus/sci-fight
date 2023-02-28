<script lang="ts">
export default {
  data() {
    return {
      index: 0,
    };
  },
  computed: {
    currentCharacter() {
      return characters[this.index];
    },
  },
  mounted() {},
  methods: {
    menosUno() {
      if (characters.length < this.index) {
        this.index = characters.length;
      }
    },
    previous() {
      this.index = this.index - 1 < 0 ? characters.length - 1 : this.index - 1;
    },
    next() {
      this.index = this.index + 1 >= characters.length ? 0 : this.index + 1;
    },
  },
  watch: {},
};
</script>

<template>
  <!-- Fondo -->
  <img
    class="w-[49%]"
    src="/src/img/assets/character_selector.png"
  />

  <!-- Selección de personaje -->
  <div class="character-container absolute mx-3 my-2">
    <!-- Cambio de personaje -->
    <div class="flex w-full justify-between text-center align-middle leading-none">
      <!-- Boton: Cambiar personaje (derecha) -->
      <button
        class="jupiter-crash z-50 w-6"
        @click="next"
      >
        <img
          class="rotate-x-180"
          src="/src/img/assets/button_arrow.png"
        />
      </button>

      <!-- Nombre personaje -->
      <span class="jupiter-crash capitalize">{{ currentCharacter.name }}</span>

      <!-- Boton: Cambiar personaje (izquierda) -->
      <button
        class="jupiter-crash z-50 w-6"
        @click="previous"
      >
        <img src="/src/img/assets/button_arrow.png" />
      </button>
    </div>

    <!-- Sprite personaje seleccionado -->
    <div class="flex justify-center align-middle">
      <div :class="['sprite', `${currentCharacter.name}-idle`]"></div>
    </div>
  </div>

  <!-- Stats personaje -->
  <div class="stats-container absolute flex items-center justify-center p-6 align-middle">
    <MenuCharacterStats :character="currentCharacter"></MenuCharacterStats>
    <img
      class="z-50 w-[100%]"
      src="/src/img/assets/stats_graphic.png"
    />
  </div>
</template>

<style lang="scss">
.character-container {
  inset: 8% 75% 60.5% 11%;
}

.stats-container {
  // background-color: rgba(0, 0, 255, 0.5);
  inset: 57% 75% 5.5% 6.1%;
}
</style>
