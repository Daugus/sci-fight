<script lang="ts">
export default {
  data() {
    return {};
  },
  props: {},
  computed: {},
  mounted() {},
  methods: {},
  watch: {},
};
</script>

<template>
  <div class="p-8 text-center">
    <h1 class="p-4">SCI-FIGHT</h1>

    <!-- Selección de personajes -->
    <div class="flex justify-around overflow-hidden p-2">
      <MenuFicha :rotar="false"></MenuFicha>
      <div class="mt-16">
        <p class="mt-4">daño</p>
        <p class="mt-4">vida</p>
        <p class="mt-4">velocidad</p>
      </div>
      <MenuFicha :rotar="true"></MenuFicha>
    </div>

    <div class="flex justify-around">
      <div class="m-2 p-2">
        <img
          src="/src/img/wad.png"
          alt=""
        />
      </div>
      <div class="m-2 p-2">
        <img
          src="/src/img/flechas.png"
          alt=""
        />
      </div>
    </div>
    <div class="mt-10 mb-10">
      <button class="w-96 rounded bg-green-300 p-2 shadow-xl">Jugar</button>
    </div>
  </div>
</template>

<style lang="scss"></style>
