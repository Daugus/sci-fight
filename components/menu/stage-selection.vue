<script lang="ts">
export default {
  data() {
    const random = randomNumber(1, 3);
    return {
      index: random,
    };
  },
  computed: {
    stage() {
      return `/src/img/stages/${this.index}/stage.gif`;
    },
  },
  mounted() {},
  methods: {
    previous() {
      this.index = this.index - 1 < 1 ? 3 : this.index - 1;
      console.log(this.index);
      console.log(this.stage);
    },
    next() {
      this.index = this.index + 1 > 3 ? 1 : this.index + 1;
      console.log(this.index);
      console.log(this.stage);
    },
  },
  watch: {
    index: function () {},
  },
};
</script>

<template>
  <!-- Contenedor selector -->
  <img
    class="absolute left-1/2 bottom-0 z-10 w-[35%] -translate-x-1/2"
    src="/src/img/assets/stage_selector.png"
  />

  <!-- Seleccion de stage -->
  <div class="stage-preview absolute bottom-10 flex justify-center text-center align-middle">
    <div class="absolute flex h-full w-full justify-between px-6">
      <!-- Boton: Cambiar stage (derecha) -->
      <button
        class="z-50 w-6"
        @click="next"
      >
        <img
          class="abs rotate-x-180"
          src="/src/img/assets/button_arrow.png"
        />
      </button>

      <!-- Boton: Cambiar stage (izquierda) -->
      <button
        class="z-50 w-6"
        @click="previous"
      >
        <img src="/src/img/assets/button_arrow.png" />
      </button>
    </div>

    <!-- Preview stage -->
    <img
      class="h-full w-full"
      :src="stage"
    />
  </div>

  <!-- Fondo selector character -->
  <div class="stage-background absolute top-[-63%] -z-10">
    <img
      class="h-full w-full scale-95 bg-bottom"
      :src="stage"
    />
  </div>
</template>

<style lang="scss">
.stage-preview {
  inset: 54% 34% 7.5% 34%;
}

.stage-background {
  clip-path: polygon(10.7% 55.5%, 10.7% 85.5%, 25.2% 85.5%, 25.2% 55.5%, 74.8% 55.5%, 74.8% 85.5%, 89.3% 85.5%, 89.3% 55.5%);
}

button img {
  filter: drop-shadow(0 0 0.2rem rgba(255, 255, 255, 0.1));
}
</style>
