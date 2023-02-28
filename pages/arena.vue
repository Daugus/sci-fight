<script lang="ts">
export default {
  data() {
    return {
      // Generar un escenario aleatorio
      stage: `url(/src/img/stages/${randomNumber(1, 3)}.gif)`,
      characterP1: characters[randomNumber(0, 3)],
      characterP2: characters[randomNumber(0, 3)],
      attack: { receiver: 0, damage: 0 },
      floor: 'url(/src/img/stages/floor.png)',
    };
  },
  methods: {
    damagePlayer(attack: { receiver: number; damage: number }) {
      this.attack = attack;
    },
  },
  mounted() {
    document.body.classList.add('overflow-hidden');
  },
};
</script>

<template>
  <div class="stage">
    <div class="absolute top-8 flex w-full items-center justify-center space-x-5 px-11 text-center align-middle">
      <HealthBar
        :player-number="1"
        :character="characterP1"
        :attack="attack"
      ></HealthBar>
      <img
        class="h-9"
        src="/src/img/assets/stats_health.png"
      />
      <HealthBar
        :player-number="2"
        :character="characterP2"
        :attack="attack"
      ></HealthBar>
    </div>

    <!-- suelo -->
    <div class="floor"></div>
  </div>

  <Character
    :character="characterP1"
    :player-number="1"
    :controls="{ attack: 'w', parry: 's', left: 'a', right: 'd' }"
    @damagePlayer="damagePlayer"
  />

  <Character
    :character="characterP2"
    :player-number="2"
    :controls="{ attack: 'arrowup', parry: 'arrowdown', right: 'arrowleft', left: 'arrowright' }"
    @damagePlayer="damagePlayer"
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
