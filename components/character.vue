<script lang="ts">
import { PropType } from 'vue';
import { Character, state } from '~~/utils/types';

export default {
  data() {
    return {
      attack: false,
      position: 0,
      distance: '1%',
      rightPressed: false,
      leftPressed: false,
      currentIntervalLeft: setEmptyInterval(),
      currentIntervalRight: setEmptyInterval(),
      state: 'idle' as state,
      parry: false,
    };
  },
  props: {
    character: { required: true, type: Object as PropType<Character> },

    playerNumber: { required: true, type: Number },

    enemyParried: { required: true, type: Boolean },

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
  },
  mounted() {
    document.addEventListener('keyup', this.keyUp);
    document.addEventListener('keydown', this.keyDown);
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
      if (this.state === 'death' || this.parry) return;

      switch (event.key.toLowerCase()) {
        case this.controls.attack:
          if (this.state === 'attack') return;

          // Activar ataque
          this.attack = true;
          this.state = 'attack';

          clearInterval(this.currentIntervalLeft);
          clearInterval(this.currentIntervalRight);

          setTimeout(() => {
            this.attack = false;

            if (this.state !== 'death') this.state = 'idle';
          }, this.character.attack.durationMs);

          break;
        case this.controls.left:
          this.leftPressed = false;
          break;
        case this.controls.right:
          this.rightPressed = false;
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
      if (this.state === 'death' || this.parry) return;

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
        this.distance = `${this.position - this.movement}%`;
      }
    },
    moveRight() {
      const { right } = document.querySelector(`#player-1`)!.getBoundingClientRect();
      const { left } = document.querySelector(`#player-2`)!.getBoundingClientRect();

      if (!this.leftPressed && this.position < 99 - this.width && !this.attack) {
        if (this.playerNumber === 1 && right >= left) return;
        if (this.playerNumber === 2 && left <= right) return;

        this.position += this.movement;
        this.distance = `${this.position + this.movement}%`;
      }
    },
  },
  watch: {
    rightPressed: function () {
      clearInterval(this.currentIntervalLeft);

      if (this.attack) return;

      if (this.rightPressed) {
        this.state = 'move';
        this.currentIntervalLeft = setImmediateInterval(this.moveRight, 10);
      } else {
        this.state = 'idle';
      }
    },
    leftPressed: function () {
      clearInterval(this.currentIntervalRight);

      if (this.attack) return;

      if (this.leftPressed) {
        this.state = 'move';
        this.currentIntervalRight = setImmediateInterval(this.moveLeft, 10);
      } else {
        this.state = 'idle';
      }
    },
    winner: function () {
      if (this.winner.playerNumber !== this.playerNumber) this.state = 'death';
    },
    state: function () {
      switch (this.state) {
        case 'appear':
          const appear = new Audio(`/src/audio/${this.character.name}/appear.mp3`);
          appear.play();
          break;
        case 'attack':
          const attack = new Audio(`/src/audio/${this.character.name}/attack.mp3`);
          attack.play();
          break;
        case 'hit':
          const hit = new Audio(`/src/audio/${this.character.name}/hit.mp3`);
          hit.play();
          break;
        case 'death':
          const death = new Audio(`/src/audio/${this.character.name}/death.mp3`);
          death.play();
          break;
      }
    },
    parry: function () {
      this.$emit('getParry', { player: this.playerNumber, parry: this.parry });
    },
  },
};
</script>

<template>
  <div
    :class="['player', attack && 'z-50', playerNumber === 2 && 'rotate-x-180']"
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

#player-1 {
  left: v-bind(distance);
}

#player-2 {
  right: v-bind(distance);
}
</style>
