<script lang="ts">
import { Character } from '~~/utils/types';

export default {
  data() {
    const jsonP1 = localStorage.getItem('characterP1');
    const jsonP2 = localStorage.getItem('characterP2');
    const stageLs = localStorage.getItem('stage');

    if (!jsonP1 || !jsonP2 || !stageLs) window.location.replace('/');

    const stage = parseInt(stageLs!);

    // const audio = new Audio(`/src/audio/stages/${stage}/stage.mp3`);

    return {
      stageNum: stage,
      stage: `url(/src/img/stages/${stage}/stage.gif)`,
      floor: `url(/src/img/stages/${stage}/floor.png)`,
      characterP1: JSON.parse(jsonP1!) as Character,
      characterP2: JSON.parse(jsonP2!) as Character,
      attack: { receiver: 0, damage: 0 },
      winner: {} as { characterName: string; playerNumber: number },
      damagedPlayer: { receiver: 0, sendBack: false } as { receiver: number; sendBack: boolean },
      countdown: 5,
      addListeners: false,

      parrying: [false, false],
      canParry: [true, true],
      attacking: [false, false],
      canAttack: [true, true],

      audio: new Audio(`/src/audio/stages/1/menu2.mp3`),
    };
  },
  methods: {
    damagePlayer(attack: { receiver: number; damage: number; sendBack: boolean }) {
      this.attack = attack;

      this.damagedPlayer = { receiver: attack.receiver, sendBack: attack.sendBack };
      setTimeout(() => {
        this.damagedPlayer = { receiver: 0, sendBack: false };
      }, 500);
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

    getParrying({ player, parry }: { player: number; parry: boolean }) {
      this.parrying[player - 1] = parry;
      this.canParry[player - 1] = false;
    },
    enableParry(player: number) {
      this.canParry[player - 1] = true;
    },

    getAttacking({ player, attack }: { player: number; attack: boolean }) {
      this.attacking[player - 1] = attack;
      this.canAttack[player - 1] = false;
    },
    enableAttack(player: number) {
      this.canAttack[player - 1] = true;
    },
    reload() {
      window.location.reload();
    },
  },
  mounted() {
    document.body.classList.add('overflow-hidden');
    const countdownIterval = setInterval(() => {
      this.countdown--;
      if (this.countdown === 0) {
        this.addListeners = true;
      } else if (this.countdown < 0) {
        clearInterval(countdownIterval);
      }
    }, 1000);

    this.audio.volume = 0.5;
    this.audio.loop = true;

    autoplay(this.audio);
  },
};
</script>

<template>
  <div
    v-if="'playerNumber' in winner"
    class="max-w-screen absolute z-50 flex max-h-screen flex-col justify-center align-middle"
  >
    <p class="win jupiter-crash text-9xl">{{ winner.characterName.toUpperCase() }} WINS</p>
    <div class="flex h-full w-full justify-between px-20">
      <button
        class="jupiter-crash option text-4xl"
        @click="reload()"
      >
        Figth again
      </button>
      <a
        class="jupiter-crash option text-4xl"
        href="/"
      >
        Back to menu
      </a>
    </div>
  </div>

  <div
    v-if="countdown >= 0"
    class="max-w-screen absolute z-50 flex max-h-screen justify-center align-middle"
  >
    <p class="win jupiter-crash text-9xl">
      {{ countdown > 0 ? countdown : 'SCI-FIGHT' }}
    </p>
  </div>

  <div class="stage">
    <div class="relative top-16 flex w-full justify-between">
      <ArenaStatusBar
        :player-number="1"
        :character="characterP1"
        :enemy="characterP2"
        :attack="attack"
        :ended="'playerNumber' in winner"
        :player-parry="parrying[0]"
        :player-attack="attacking[0]"
        @enable-parry="enableParry"
        @enable-attack="enableAttack"
        @end-game="endGame"
      />

      <ArenaStatusBar
        :player-number="2"
        :character="characterP2"
        :enemy="characterP1"
        :attack="attack"
        :ended="'playerNumber' in winner"
        :player-parry="parrying[1]"
        :player-attack="attacking[1]"
        @enable-parry="enableParry"
        @enable-attack="enableAttack"
        @end-game="endGame"
      />
    </div>

    <!-- Suelo -->
    <div :class="['floor', stageNum !== 1 && 'bg-repeat-x']"></div>
  </div>

  <Character
    :character="characterP1"
    :enemy-parried="parrying[1]"
    :player-number="1"
    :controls="{ attack: 'w', parry: 's', backward: 'a', forward: 'd' }"
    :winner="winner"
    :damaged-player="damagedPlayer"
    :add-listeners="addListeners"
    :can-parry="canParry[0]"
    :can-attack="canAttack[0]"
    @damage-player="damagePlayer"
    @get-parrying="getParrying"
    @get-attacking="getAttacking"
  />

  <Character
    :character="characterP2"
    :enemy-parried="parrying[0]"
    :player-number="2"
    :controls="{ attack: 'arrowup', parry: 'arrowdown', forward: 'arrowleft', backward: 'arrowright' }"
    :winner="winner"
    :damaged-player="damagedPlayer"
    :add-listeners="addListeners"
    :can-parry="canParry[1]"
    :can-attack="canAttack[1]"
    @damage-player="damagePlayer"
    @get-attacking="getAttacking"
    @get-parrying="getParrying"
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

.win {
  color: #ffc42e;
  -webkit-text-stroke: 2px #ff7d01;
  filter: drop-shadow(0 0 0.2rem #ff7d01);
}

.option {
  color: #ffc42e;
  -webkit-text-stroke: 1px #ff7d01;
  filter: drop-shadow(0 0 0.2rem #ff7d01);
  filter: grayscale(1);
  opacity: 0.25;
  transition: all ease-in-out 0.1s;

  &:hover {
    filter: grayscale(0);
    opacity: 1;
    transform: scale(1.2);
  }
}
</style>
