<script lang="ts">
import { Character } from '~~/utils/types';

export default {
  data() {
    const jsonP1 = localStorage.getItem('characterP1');
    const jsonP2 = localStorage.getItem('characterP2');
    const stageLs = localStorage.getItem('stage');

    if (!jsonP1 || !jsonP2 || !stageLs) window.location.replace('/');

    const stage = parseInt(stageLs!);
    return {
      // carga datos de localStorage
      stageNum: stage,
      stage: `url(/src/img/stages/${stage}/stage.gif)`,
      floor: `url(/src/img/stages/${stage}/floor.png)`,
      characterP1: JSON.parse(jsonP1!) as Character,
      characterP2: JSON.parse(jsonP2!) as Character,

      attack: { receiver: 0, damage: 0 },
      winner: {} as { characterName: string; playerNumber: number },
    };
  },
  methods: {
    damagePlayer(attack: { receiver: number; damage: number }) {
      this.attack = attack;
    },
    // emit de player number, que se envia cuando se muere uno de los personajes
    // playerNumber es el numero del personaje con vida <= 0
    endGame(playerNumber: number) {
      // pongo dead en true para que se muestre el div de ganador
      // compruebo que el jugador 1 se ha muerto, si es asi doy valor a los datos para mostrarlos
      this.winner =
        playerNumber === 1 ? { characterName: this.characterP2.name, playerNumber: 2 } : { characterName: this.characterP1.name, playerNumber: 1 };

      // quitar los listener para que al acabarse la partida no se puedan mover
      window.addEventListener('keyup', (e) => e.stopImmediatePropagation(), true);
      window.addEventListener('keydown', (e) => e.stopImmediatePropagation(), true);
    },
  },
  mounted() {
    document.body.classList.add('overflow-hidden');

    localStorage.removeItem('characterP1');
    localStorage.removeItem('characterP2');

    // suena la musica dependiendo del escenario seleccionado
    // const audio = new Audio(`/src/audio/stages/${this.stageNum}/stage.mp3`);
    // audio.loop = true;
    // audio.play();
  },
};
</script>

<template>
  <div
    v-if="'playerNumber' in winner"
    class="max-w-screen absolute z-50 flex max-h-screen justify-center bg-red-600 align-middle"
  >
    <p>THE WINNER IS {{ winner.characterName.toUpperCase() }} (P{{ winner.playerNumber }})</p>
    <!-- <NuxtLink
      to="/"
      class="absolute top-10 w-80 rounded-lg bg-red-600 p-2 text-center"
    >
      BACK TO THE MENU
    </NuxtLink> -->
  </div>

  <div class="stage">
    <div class="relative flex h-[12rem] w-full items-center justify-between text-center align-middle">
      <ArenaHealthBar
        :player-number="1"
        :character="characterP1"
        :enemy="characterP2"
        :attack="attack"
        :ended="'playerNumber' in winner"
        @endGame="endGame"
      />

      <ArenaHealthBar
        :player-number="2"
        :character="characterP2"
        :enemy="characterP1"
        :attack="attack"
        :ended="'playerNumber' in winner"
        @endGame="endGame"
      />
    </div>

    <!-- Suelo -->
    <div :class="['floor', stageNum !== 1 && 'bg-repeat-x']"></div>
  </div>

  <Character
    :character="characterP1"
    :player-number="1"
    :controls="{ attack: 'w', parry: 's', left: 'a', right: 'd' }"
    :winner="winner"
    @damagePlayer="damagePlayer"
  />

  <Character
    :character="characterP2"
    :player-number="2"
    :controls="{ attack: 'arrowup', parry: 'arrowdown', right: 'arrowleft', left: 'arrowright' }"
    :winner="winner"
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
