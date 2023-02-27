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
  <div>
    <div class="flex h-56 justify-center overflow-hidden align-middle">
      <!-- Boton: Cambiar personaje (izquierda) -->
      <button
        class="z-50 w-16"
        @click="previous"
      >
        -
      </button>

      <!-- Sprite personaje seleccionado -->
      <div class="relative flex w-52 justify-center">
        <div :class="['sprite', `${currentCharacter.name}-idle`]"></div>
      </div>

      <!-- Boton: Cambiar personaje (derecha) -->
      <button
        class="z-50 w-16"
        @click="next"
      >
        +
      </button>
    </div>
  </div>
</template>

<style lang="scss"></style>
