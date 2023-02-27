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
  watch: {
    index() {
      this.$emit('getCurrentCharacter', this.currentCharacter);
    },
  },
};
</script>

<template>
  <div class="character-selector"></div>

  <div>
    <div class="flex h-56 justify-center px-[6rem] align-middle">
      <!-- Sprite personaje seleccionado -->
      <div class="relative flex w-40 justify-center">
        <div :class="['sprite', `${currentCharacter.name}-idle`]"></div>
      </div>
    </div>
  </div>

  <div class="absolute z-50 flex justify-center bg-red-500 text-center align-middle">
    <!-- Boton: Cambiar personaje (derecha) -->
    <button
      class="z-50 w-8"
      @click="next"
    >
      +
    </button>

    <!-- Boton: Cambiar personaje (izquierda) -->
    <button
      class="z-50 w-8"
      @click="previous"
    >
      -
    </button>
  </div>
</template>

<style lang="scss"></style>
