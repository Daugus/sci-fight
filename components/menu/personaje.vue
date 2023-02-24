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
  <div class="mt-40 flex justify-center bg-white">
    <div class="relative mt-12 flex w-20 justify-center bg-slate-500">
      <div :class="['sprite', `${current.name}-idle`]"></div>
    </div>
  </div>
  <button
    class="h-5 w-5"
    @click="menos"
  >
    -
  </button>
  <button
    class="h-5 w-5"
    @click="mas"
  >
    +
  </button>
</template>

<style lang="scss"></style>
