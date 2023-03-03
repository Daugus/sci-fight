<script lang="ts">
import { PropType } from 'vue';
import { Character, state } from '~~/utils/types';

export default {
  emits: ['damagePlayer', 'getParry'],
  data() {
    return {
      attack: false,
      position: 20,
      forwardPressed: false,
      backwardPressed: false,
      currentIntervalForward: setEmptyInterval(),
      currentIntervalBackward: setEmptyInterval(),
      state: 'idle' as state,
      parry: false,
    };
  },
  props: {
    character: { required: true, type: Object as PropType<Character> },
    playerNumber: { required: true, type: Number },
    enemyParried: { required: true, type: Boolean },
    damagedPlayer: { required: true, type: Number },
    addListeners: { required: true, type: Boolean },

    controls: {
      required: true,
      type: Object as PropType<{
        attack: string;
        forward: string;
        backward: string;
        parry: string;
      }>,
    },

    winner: {
      required: true,
      type: Object as PropType<{
        characterName: string;
        playerNumber: number;
      }>,
    },
  },
  computed: {
    movement() {
      return this.character.speed.space / 250;
    },
    width() {
      return (this.character.hitbox.width / screen.width) * 100;
    },
    widthPx() {
      return `${this.character.hitbox.width}px`;
    },
    heightPx() {
      return `${this.character.hitbox.height}px`;
    },
    id() {
      return `player-${this.playerNumber}`;
    },
    distance() {
      return `${this.position}%`;
    },
  },
  mounted() {
    this.state = 'appear';
    setTimeout(() => (this.state = 'idle'), this.character.appear);
  },
  methods: {
    getRect(attackRect: DOMRect, playerNumber: number) {
      const receiverPlayerNumber = playerNumber === 1 ? 2 : 1;

      const playerRect = document.querySelector(`#player-${receiverPlayerNumber}`)!.getBoundingClientRect();

      if (attackRect.x + attackRect.width >= playerRect!.x && attackRect.x <= playerRect.x + playerRect.width)
        if (!this.enemyParried) {
          this.$emit('damagePlayer', {
            receiver: receiverPlayerNumber,
            damage: this.character.attack.damage,
          });
        }
    },
    keyUp(event: KeyboardEvent) {
      if (this.state === 'death' || this.state === 'hit' || this.state === 'attack' || this.parry) return;

      switch (event.key.toLowerCase()) {
        case this.controls.attack:
          // Activar ataque
          this.attack = true;
          this.state = 'attack';

          clearInterval(this.currentIntervalForward);
          clearInterval(this.currentIntervalBackward);

          setTimeout(() => {
            this.attack = false;

            this.state = 'idle';
          }, this.character.attack.durationMs);

          break;
        case this.controls.backward:
          this.backwardPressed = false;
          break;
        case this.controls.forward:
          this.forwardPressed = false;
          break;
        case this.controls.parry:
          this.parry = true;

          setTimeout(() => {
            this.parry = false;
          }, 500);
          break;
      }
    },
    keyDown(event: KeyboardEvent) {
      if (this.state === 'death' || this.state === 'hit' || this.parry) return;

      switch (event.key.toLowerCase()) {
        case this.controls.backward:
          this.backwardPressed = true;
          break;
        case this.controls.forward:
          this.forwardPressed = true;
          break;
      }
    },
    // funciones para mover los divs
    moveBackward() {
      if (!this.forwardPressed && this.position > 1 && !this.attack) {
        this.position -= this.movement;
      }
    },
    moveForward() {
      const { right } = document.querySelector(`#player-1`)!.getBoundingClientRect();
      const { left } = document.querySelector(`#player-2`)!.getBoundingClientRect();

      if (!this.backwardPressed && this.position < 99 - this.width && !this.attack) {
        if (this.playerNumber === 1 && right >= left) return;
        else if (this.playerNumber === 2 && left <= right) return;

        this.position += this.movement;
      }
    },
    playAudio() {
      const audio = new Audio(`/src/audio/${this.character.name}/${this.state}.mp3`);
      audio.play();
    },
  },
  watch: {
    forwardPressed: function () {
      clearInterval(this.currentIntervalForward);

      if (this.attack || this.state === 'death') return;

      if (this.forwardPressed) {
        if (this.state !== 'hit') this.state = 'move';
        this.currentIntervalForward = setImmediateInterval(this.moveForward, 10);
      } else {
        if (this.state !== 'hit') this.state = 'idle';
      }
    },
    backwardPressed: function () {
      clearInterval(this.currentIntervalBackward);

      if (this.attack || this.state === 'death') return;

      if (this.backwardPressed) {
        if (this.state !== 'hit') this.state = 'move';
        this.currentIntervalBackward = setImmediateInterval(this.moveBackward, 10);
      } else {
        if (this.state !== 'hit') this.state = 'idle';
      }
    },
    damagedPlayer: function () {
      if (this.playerNumber !== this.damagedPlayer || this.state === 'death') return;

      this.backwardPressed = false;
      this.forwardPressed = false;
      clearInterval(this.currentIntervalBackward);
      clearInterval(this.currentIntervalForward);

      this.state = 'hit';
      this.currentIntervalBackward = setImmediateInterval(this.moveBackward, 10);

      setTimeout(() => {
        clearInterval(this.currentIntervalBackward);
        this.state = 'playerNumber' in this.winner && this.winner.playerNumber !== this.playerNumber ? 'death' : 'idle';
      }, 500);
    },
    winner: function () {
      if (this.winner.playerNumber !== this.playerNumber) this.state = 'death';
    },
    state: function () {
      switch (this.state) {
        case 'appear':
        case 'attack':
        case 'hit':
        case 'death':
          this.playAudio();
          break;
      }
    },
    parry: function () {
      this.$emit('getParry', { player: this.playerNumber, parry: this.parry });
    },
    addListeners: function () {
      document.addEventListener('keyup', this.keyUp);
      document.addEventListener('keydown', this.keyDown);
    },
  },
};
</script>

<template>
  <div
    :class="['player', state === 'hit' && 'damaged', attack && 'z-50', playerNumber === 2 && 'rotate-x-180']"
    :id="id"
  >
    <div
      :class="`protect ${character.name}`"
      v-if="parry"
    ></div>

    <div :class="['sprite', `${character.name}-${state}`]"></div>

    <CharacterAttack
      :character="character"
      :player-number="playerNumber"
      :delays="character.attack.delayMsList"
      @getRect="getRect"
      v-if="attack === true"
    />
  </div>
</template>

<style lang="scss">
.player {
  position: absolute;
  bottom: calc(10vh - 3px);

  height: v-bind(heightPx);
  width: v-bind(widthPx);
}

.player .sprite {
  left: 50%;
  transform: translateX(-50%);
}

.damaged {
  animation: damaged 500ms ease-in forwards;
}

@keyframes damaged {
  0% {
    transform: translateY(-0px);
  }

  50% {
    transform: translateY(-150px);
  }

  100% {
    transform: translateY(-0px);
  }
}

#player-1 {
  left: v-bind(distance);
}

#player-2 {
  right: v-bind(distance);
}
</style>
