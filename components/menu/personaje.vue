<script lang="ts">
export default {
  data() {
    return {
      index: 0,
    };
  },
  computed: {
    current() {
      return characters[this.index];
    },
    imagen() {
      return `/src/img/characters/${this.current.name}.png`;
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
      this.index = this.index - 1 === 0 ? characters.length - 1 : this.index - 1;
    },
    mas() {
      this.index = this.index + 1 >= characters.length ? 0 : this.index + 1;
    },
  },
  watch: {},
};
</script>

<template>
  <div class="flex justify-center">
    <button
      class="mt-20"
      @click="menos"
    >
      -
    </button>
    <img
      :src="imagen"
      alt=""
    />
    <button
      class="mt-20 h-10"
      @click="mas"
    >
      +
    </button>
  </div>
</template>

<style lang="scss"></style>
