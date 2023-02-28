<script lang="ts">
export default {
  data() {
    return {
      // Generar un escenario aleatorio
      stageNum: 3,
      stage: ``,
      floor: ``,
      currentCharacter: astraeus,
      otro: galvus,
      p1Health: 0,
      p2Health: 0,
      attack: { receiver: 0, damage: 0 },
    };
  },
  // props: {
  //   stageNum: Number,
  // },
  methods: {
    damagePlayer(attack: { receiver: number; damage: number }) {
      this.attack = attack;
    },
  },
  mounted() {
    this.stage = `url(/src/img/stages/${this.stageNum}/stage.gif)`;
    this.floor = `url(/src/img/stages/${this.stageNum}/floor.png)`;

    document.body.classList.add('overflow-hidden');

    this.p1Health = this.currentCharacter.health;
    this.p2Health = this.otro.health;
  },
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

    <!-- Suelo -->
    <div :class="['floor', stageNum !== 1 && 'bg-repeat-x']"></div>
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

  .floor {
    width: 100vw;
    height: 10vh;
    position: absolute;
    bottom: 0;

    background-image: v-bind(floor);
    background-size: 4%;
  }
}
</style>
