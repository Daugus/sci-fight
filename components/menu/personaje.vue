<script lang="ts">
import { Astraeus } from '~~/.nuxt/components';

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
    menos() {
      this.index = this.index - 1 < 0 ? characters.length - 1 : this.index - 1;
    },
    mas() {
      this.index = this.index + 1 >= characters.length ? 0 : this.index + 1;
    },
  },
  watch: {
    index() {
      this.$emit('getCurrentCharacter', this.currentCharacter);
      this.$emit('getCurrentCharacterName', this.currentCharacter.name);
    },
  },
};
</script>

<template>
  <div>
    <div class="mt-40 flex justify-center bg-white align-middle">
      <button
        class="z-50 h-5 w-5"
        @click="menos"
      >
        -
      </button>
      <div class="relative mt-12 flex w-52 justify-center bg-slate-500">
        <div :class="['sprite', `${currentCharacter.name}-idle`]"></div>
      </div>
      <button
        class="z-50 h-5 w-5"
        @click="mas"
      >
        +
      </button>
    </div>
  </div>
</template>

<style lang="scss"></style>
