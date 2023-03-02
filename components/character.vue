<script lang="ts">
import { PropType } from 'vue';
import { Character, state } from '~~/utils/types';

export default {
  data() {
    return {
      attack: false,
      position: 20,
      // distance: '1%',
      rightPressed: false,
      leftPressed: false,
      currentIntervalRight: setEmptyInterval(),
      currentIntervalLeft: setEmptyInterval(),
      state: 'idle' as state,
    };
  },
  props: {
    character: { required: true, type: Object as PropType<Character> },

    playerNumber: { required: true, type: Number },

    damagedPlayer: { required: true, type: Number },

    controls: {
      required: true,
      type: Object as PropType<{
        attack: string;
        right: string;
        left: string;
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
    document.addEventListener('keyup', this.keyUp);
    document.addEventListener('keydown', this.keyDown);

    this.state = 'appear';
    setTimeout(() => (this.state = 'idle'), this.character.appear);
  },
  methods: {
    getRect(attackRect: DOMRect, playerNumber: number) {
      const receiverPlayerNumber = playerNumber === 1 ? 2 : 1;

      const playerRect = document.querySelector(`#player-${receiverPlayerNumber}`)!.getBoundingClientRect();

      if (attackRect.x + attackRect.width >= playerRect!.x && attackRect.x <= playerRect.x + playerRect.width)
        this.$emit('damagePlayer', {
          receiver: receiverPlayerNumber,
          damage: this.character.attack.damage,
        });
    },
    keyUp(event: KeyboardEvent) {
      if (this.state === 'death') return;

      switch (event.key.toLowerCase()) {
        case this.controls.attack:
          if (this.state === 'attack') return;
          // Activar ataque
          this.attack = true;
          this.state = 'attack';

          clearInterval(this.currentIntervalRight);
          clearInterval(this.currentIntervalLeft);

          setTimeout(() => {
            this.attack = false;

            this.state = 'idle';
          }, this.character.attack.durationMs);

          break;
        case this.controls.left:
          this.leftPressed = false;
          break;
        case this.controls.right:
          this.rightPressed = false;
          break;
      }
    },
    keyDown(event: KeyboardEvent) {
      if (this.state === 'death' || this.state === 'hit') return;

      switch (event.key.toLowerCase()) {
        case this.controls.left:
          this.leftPressed = true;
          break;
        case this.controls.right:
          this.rightPressed = true;
          break;
      }
    },
    // funciones para mover los divs
    moveLeft() {
      if (!this.rightPressed && this.position > 1 && !this.attack) {
        this.position -= this.movement;
      }
    },
    moveRight() {
      const { right } = document.querySelector(`#player-1`)!.getBoundingClientRect();
      const { left } = document.querySelector(`#player-2`)!.getBoundingClientRect();

      if (!this.leftPressed && this.position < 99 - this.width && !this.attack) {
        if (this.playerNumber === 1 && right >= left) return;
        else if (this.playerNumber === 2 && left <= right) return;

        this.position += this.movement;
      }
    },
  },
  watch: {
    rightPressed: function () {
      clearInterval(this.currentIntervalRight);

      if (this.attack || this.state === 'death') return;

      if (this.rightPressed) {
        if (this.state !== 'hit') this.state = 'move';
        this.currentIntervalRight = setImmediateInterval(this.moveRight, 10);
      } else {
        if (this.state !== 'hit') this.state = 'idle';
      }
    },
    leftPressed: function () {
      clearInterval(this.currentIntervalLeft);

      if (this.attack || this.state === 'death') return;

      if (this.leftPressed) {
        if (this.state !== 'hit') this.state = 'move';
        this.currentIntervalLeft = setImmediateInterval(this.moveLeft, 10);
      } else {
        if (this.state !== 'hit') this.state = 'idle';
      }
    },
    damagedPlayer: function () {
      if (this.playerNumber !== this.damagedPlayer || this.state === 'death') return;

      this.leftPressed = true;
      this.state = 'hit';
      this.currentIntervalLeft = setImmediateInterval(this.moveLeft, 10);

      setTimeout(() => {
        this.leftPressed = false;
        this.state = 'idle';
        clearInterval(this.currentIntervalLeft);
      }, 500);
    },
    winner: function () {
      if (this.winner.playerNumber !== this.playerNumber) this.state = 'death';
    },
  },
};
</script>

<template>
  <div
    :class="['player', state === 'hit' && 'damaged', attack && 'z-50', playerNumber === 2 && 'rotate-x-180']"
    :id="id"
  >
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
