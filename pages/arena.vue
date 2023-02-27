<script lang="ts">
export default {
  data() {
    return {
      stage: '',
      floor: '',
    };
  },
  mounted() {
    // Generar un escenario aleatorio
    let random = Math.floor(Math.random() * (4 - 1) + 1);
    this.stage = `url(/src/img/stages/${random}.gif)`;
    this.floor = `url(/src/img/stages/${random}.png)`;
  },
};
</script>

<template>
  <div class="stage">
    <div class="floor"></div>
  </div>
  <Character
    :player-number="1"
    :controls="{ attack: 'w', left: 'a', right: 'd' }"
    color="red"
  />
  <Character
    :player-number="2"
    :controls="{ attack: 'arrowup', right: 'arrowleft', left: 'arrowright' }"
    color="blue"
  />
</template>

<style lang="scss">
.stage {
  width: 100vw;
  height: 100vh;
  background-image: v-bind(stage);
  background-size: cover;
  background-repeat: no-repeat;
  background-position: bottom;

  .floor {
    width: 100vw;
    height: 10vh;
    position: absolute;
    bottom: 0;

    background-image: v-bind(floor);
    background-size: 20%;
  }
}
</style>
