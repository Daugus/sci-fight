<script lang="ts">
export default {
  data() {
    return {
      // Generar un escenario aleatorio
      stage: `url(/src/img/stages/${Math.floor(Math.random() * (4 - 1) + 1)}.gif)`,
      currentCharacter: astraeus,
      otro: galvus,
      p1Health: 0,
      p2Health: 0,
      attack: { receiver: 0, damage: 0 },
    };
  },
  methods: {
    damagePlayer(attack: { receiver: number; damage: number }) {
      this.attack = attack;
    },
  },
  // mounted() {
  //   this.p1Health = this.currentCharacter.health;
  //   this.p2Health = this.otro.health;
  // },
};
</script>

<template>
  <div class="stage">
    <div class="absolute top-8 flex w-full items-center justify-center space-x-5 px-11 text-center align-middle">
      <HealthBar
        :player-number="1"
        :character="currentCharacter"
        :attack="attack"
      ></HealthBar>
      <img
        class="h-9"
        src="/src/img/assets/stats_health.png"
      />
      <HealthBar
        :player-number="2"
        :character="otro"
        :attack="attack"
      ></HealthBar>
    </div>
  </div>
  <Character
    :player-number="1"
    :controls="{ attack: 'w', parry: 's', left: 'a', right: 'd' }"
    color="red"
    @damagePlayer="damagePlayer"
  />
  <Character
    :player-number="2"
    :controls="{ attack: 'arrowup', parry: 'arrowdown', right: 'arrowleft', left: 'arrowright' }"
    color="blue"
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
  background-position: center;
}
</style>
