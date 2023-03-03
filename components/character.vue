<script lang="ts">
import { Character, state } from '~~/utils/types';

export default {
  emits: ['damagePlayer', 'getParrying', 'getAttacking'],
  data() {
    return {
      attack: false,
      position: 20,
      forwardPressed: false,
      backwardPressed: false,
      currentIntervalForward: setEmptyInterval(),
      currentIntervalBackward: setEmptyInterval(),
      characterState: 'idle' as state,
      parry: false,
      sendBack: false,
    };
  },
  props: {
    character: { required: true, type: Object as PropType<Character> },
    playerNumber: { required: true, type: Number },
    enemyParried: { required: true, type: Boolean },
    damagedPlayer: { required: true, type: Object as PropType<{ receiver: number; sendBack: boolean }> },
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

    canParry: {
      required: true,
      type: Boolean,
    },

    canAttack: {
      required: true,
      type: Boolean,
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
    fetchSprites() {
      return `${['hit', 'idle', 'move', 'attack', 'death']
        .map((sprite) => `url('/src/img/characters/${this.character.name}/${sprite}.png')`)
        .join(', ')}, url('/src/img/abilities/protect.png')`;
    },
  },
  mounted() {
    this.characterState = 'appear';
    setTimeout(() => (this.characterState = 'idle'), this.character.appear);
  },
  methods: {
    getRect(attackRect: DOMRect, playerNumber: number, sendBack: boolean) {
      const receiverPlayerNumber = playerNumber === 1 ? 2 : 1;

      const playerRect = document.querySelector(`#player-${receiverPlayerNumber}`)!.getBoundingClientRect();

      if (attackRect.x + attackRect.width >= playerRect!.x && attackRect.x <= playerRect.x + playerRect.width)
        if (!this.enemyParried) {
          this.$emit('damagePlayer', {
            receiver: receiverPlayerNumber,
            damage: this.character.attack.damage,
            sendBack: sendBack,
          });
        }
    },
    keyUp(event: KeyboardEvent) {
      if (this.characterState === 'death' || this.characterState === 'hit' || this.characterState === 'attack') return;

      switch (event.key.toLowerCase()) {
        case this.controls.attack:
          if (this.parry || !this.canAttack) return;

          // Activar ataque
          this.attack = true;
          this.characterState = 'attack';

          clearInterval(this.currentIntervalForward);
          clearInterval(this.currentIntervalBackward);

          setTimeout(() => {
            this.attack = false;

            this.characterState = 'idle';
          }, this.character.attack.durationMs);

          break;
        case this.controls.backward:
          this.backwardPressed = false;
          break;
        case this.controls.forward:
          this.forwardPressed = false;
          break;
        case this.controls.parry:
          if (this.parry || !this.canParry) return;

          this.parry = true;

          setTimeout(() => {
            this.parry = false;
          }, 500);
          break;
      }
    },
    keyDown(event: KeyboardEvent) {
      if (this.characterState === 'death' || this.characterState === 'hit' || this.parry) return;

      switch (event.key.toLowerCase()) {
        case this.controls.backward:
          this.backwardPressed = true;
          break;
        case this.controls.forward:
          this.forwardPressed = true;
          break;
      }
    },
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
      const audio = new Audio(`/src/audio/${this.character.name}/${this.characterState}.mp3`);
      audio.play();
    },
  },
  watch: {
    forwardPressed: function () {
      clearInterval(this.currentIntervalForward);

      if (this.attack || this.characterState === 'death') return;

      if (this.forwardPressed) {
        if (this.characterState !== 'hit') this.characterState = 'move';
        this.currentIntervalForward = setImmediateInterval(this.moveForward, 10);
      } else {
        if (this.characterState !== 'hit') this.characterState = 'idle';
      }
    },
    backwardPressed: function () {
      clearInterval(this.currentIntervalBackward);

      if (this.attack || this.characterState === 'death') return;

      if (this.backwardPressed) {
        if (this.characterState !== 'hit') this.characterState = 'move';
        this.currentIntervalBackward = setImmediateInterval(this.moveBackward, 10);
      } else {
        if (this.characterState !== 'hit') this.characterState = 'idle';
      }
    },
    damagedPlayer: function () {
      const correctPlayer = this.playerNumber === this.damagedPlayer.receiver;

      if (!correctPlayer || this.characterState === 'death') return;

      this.characterState = 'hit';
      this.backwardPressed = false;
      this.forwardPressed = false;
      clearInterval(this.currentIntervalBackward);
      clearInterval(this.currentIntervalForward);

      if (!this.damagedPlayer.sendBack) return;

      this.sendBack = true;
      this.currentIntervalBackward = setImmediateInterval(this.moveBackward, 10);

      setTimeout(() => {
        clearInterval(this.currentIntervalBackward);
        this.characterState = 'playerNumber' in this.winner && this.winner.playerNumber !== this.playerNumber ? 'death' : 'idle';
        this.sendBack = false;
      }, 500);
    },
    winner: function () {
      if (this.winner.playerNumber !== this.playerNumber) this.characterState = 'death';
    },
    characterState: function () {
      switch (this.characterState) {
        case 'appear':
        case 'attack':
        case 'hit':
        case 'death':
          this.playAudio();
          break;
      }
    },
    parry: function () {
      this.$emit('getParrying', { player: this.playerNumber, parry: this.parry });
    },
    attack: function () {
      this.$emit('getAttacking', { player: this.playerNumber, attack: this.attack });
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
    :class="['player', characterState === 'hit' && sendBack && 'damaged', attack && 'z-50', playerNumber === 2 && 'rotate-x-180']"
    :id="id"
  >
    <div
      :class="`protect ${character.name}`"
      v-if="parry"
    ></div>

    <div :class="['sprite', `${character.name}-${characterState}`]"></div>

    <CharacterAttack
      :character="character"
      :player-number="playerNumber"
      :delays="character.attack.delayMsList"
      @getRect="getRect"
      v-if="attack === true"
    />
  </div>

  <div id="fetch-sprites"></div>
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

#fetch-sprites {
  background-image: v-bind(fetchSprites);
}
</style>
