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
  <div class="flex scale-150 flex-col justify-center gap-6 overflow-hidden py-12 text-center align-middle">
    <!-- Cambiar por un logo  -->
    <h1>SCI-FIGHT</h1>

    <!-- Selección de personajes -->
    <div class="flex justify-around">
      <!-- Jugador 1 -->
      <MenuFicha :rotar="false"></MenuFicha>

      <!-- Indicadores de estadisticas -->
      <div class="mt-[2rem] flex w-16 flex-col justify-center gap-2 align-middle">
        <!-- Daño -->
        <img src="/src/img/assets/stats_damage.png" />
        <!-- Vida -->
        <img src="/src/img/assets/stats_health.png" />
        <!-- Velocidad -->
        <img src="/src/img/assets/stats_speed.png" />
      </div>

      <!-- Jugador 2 -->
      <MenuFicha :rotar="true"></MenuFicha>
    </div>

    <!-- Controles -->
    <!-- <div class="flex justify-around"> -->
    <!-- Jugador 1 -->
    <!-- <div class="">
        <img src="/src/img/assets/player1_controls.png" />
      </div> -->
    <!-- Jugador 2 -->
    <!-- <div class="">
        <img src="/src/img/assets/player2_controls.png" />
      </div>
    </div> -->

    <!-- Boton: Jugar -->
    <button class="mx-96 bg-black p-2 text-white">Jugar</button>
  </div>
</template>

<style lang="scss"></style>
