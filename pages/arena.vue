<script lang="ts">
export default {
  data() {
    return {
      stage: '',
      currentCharacter: astraeus,
      otro: galvus,
      p1Health: 0,
      p2Health: 0,
    };
  },
  mounted() {
    // Generar un escenario aleatorio
    let random = Math.floor(Math.random() * (4 - 1) + 1);
    this.stage = `url(/src/img/stages/${random}.gif)`;
    this.p1Health = this.currentCharacter.health;
    this.p2Health = this.otro.health;
  },
  methods: {},
};
</script>

<template>
  <div class="stage">
    <div class="absolute top-8 flex w-full items-center justify-center space-x-5 bg-slate-500 px-11 text-center align-middle">
      <HealthBar
        :character="currentCharacter"
        :currentHealth="p1Health"
      ></HealthBar>
      <img
        class="h-9"
        src="\src\img\assets\stats_health.png "
      />
      <HealthBar
        :currentHealth="p2Health"
        :character="otro"
      ></HealthBar>
    </div>
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

  // .floor {
  //   width: 100vw;
  //   height: 10vh;
  //   position: absolute;
  //   bottom: 0;

  //   background-image: v-bind(floor);
  //   background-size: 20%;
  // }
}
</style>
