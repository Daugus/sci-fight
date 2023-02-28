<script lang="ts">
export default {
  data() {
    return {
      // Generar un escenario aleatorio
      stage: `url(/src/img/stages/${Math.floor(Math.random() * (4 - 1) + 1)}.gif)`,
      characterP1: astraeus,
      characterP2: galvus,
      p1Health: 0,
      p2Health: 0,
      attack: { receiver: 0, damage: 0 },
      floor: 'url(/src/img/stages/floor.png)',
      dead: false,
      winner: '',
      winnerNumber: 0,
    };
  },
  methods: {
    damagePlayer(attack: { receiver: number; damage: number }) {
      this.attack = attack;
    },
    //emit de player number, que se envia cuando se muere uno de los personajes
    endGame(playerNumber: number) {
      //playerNumber es el numero del personaje con vida <= 0
      this.dead = true;
      //pongo dead en true para que se muestre el div de ganador
      if (playerNumber === 1) {
        //compruebo que el jugador 1 se ha muerto, si es asi doy valor a los datos para mostrarlos
        this.winner = this.characterP2.name;
        this.winnerNumber = 2;
      } else {
        this.winner = this.characterP1.name;
        this.winnerNumber = 1;
      }
      // quitar los listener para que al acabarse la partida no se puedan mover
      window.addEventListener('keyup', (e) => e.stopImmediatePropagation(), true);
      window.addEventListener('keydown', (e) => e.stopImmediatePropagation(), true);
    },
  },
  mounted() {
    // Generar un escenario aleatorio
    let random = Math.floor(Math.random() * (4 - 1) + 1);
    this.stage = `url(/src/img/stages/${random}.gif)`;

    document.body.classList.add('overflow-hidden');

    this.p1Health = this.characterP1.health;
    this.p2Health = this.characterP2.health;
  },
};
</script>

<template>
  <!-- div para mostrar mensaje de ganar -->
  <div
    v-if="dead === true"
    class="max-w-screen absolute z-50 flex max-h-screen justify-center bg-red-600 align-middle"
  >
    <p>THE WINNER IS {{ winner.toUpperCase() }}(P{{ winnerNumber }})</p>
  </div>
  <div class="stage">
    <div class="absolute top-8 flex w-full items-center justify-center space-x-5 px-11 text-center align-middle">
      <HealthBar
        :player-number="1"
        :character="characterP1"
        :attack="attack"
        @endGame="endGame"
      ></HealthBar>
      <img
        class="h-9"
        src="/src/img/assets/stats_health.png"
      />
      <HealthBar
        :player-number="2"
        :character="characterP2"
        :attack="attack"
        @endGame="endGame"
      ></HealthBar>
    </div>

    <!-- suelo -->
    <div class="floor"></div>
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
