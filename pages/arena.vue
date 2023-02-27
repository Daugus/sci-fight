<script lang="ts">
export default {
  data() {
    return {
      // Generar un escenario aleatorio
      stage: `url(/src/img/stages/${Math.floor(Math.random() * (4 - 1) + 1)}.gif)`,
    };
  },
};
</script>

<template>
  <div class="stage"></div>
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
  background-position: center;
}
</style>
