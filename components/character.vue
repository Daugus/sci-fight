<script lang="ts">
import { PropType } from 'vue';

export default {
  data() {
    return {
      attack: false,
      character: quasar,
      position: 0,
      distance: '1%',
      rightPressed: false,
      leftPressed: false,
      currentIntervalLeft: setEmptyInterval(),
      currentIntervalRight: setEmptyInterval(),
      movementDirection: 1,
    };
  },
  props: {
    playerNumber: { required: true, type: Number },
    color: { required: true, type: String },
    controls: { required: true, type: Object as PropType<{ attack: string; right: string; left: string }> },
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
  },
  mounted() {
    // if (this.playerNumber === 2) this.distance = '90%';

    document.addEventListener('keyup', this.keyUp);
    document.addEventListener('keydown', this.keyDown);
  },
  methods: {
    getRect(attackRect: DOMRect, playerNumber: number) {
      const receiverPlayerNumber = playerNumber === 1 ? 2 : 1;

      const playerRect = document.querySelector(`#player-${receiverPlayerNumber}`)!.getBoundingClientRect();

      const intersect = attackRect.x + attackRect.width >= playerRect!.x && attackRect.x <= playerRect.x + playerRect.width;
    },
    keyUp(event: KeyboardEvent) {
      switch (event.key.toLowerCase()) {
        case this.controls.attack:
          // Activar ataque
          this.attack = true;

          setTimeout(() => (this.attack = false), 800);
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
      if (!this.rightPressed && this.position > 1) {
        this.position -= this.movement;
        this.distance = `${this.position - this.movement}%`;
      }
    },
    moveRight() {
      if (!this.leftPressed && this.position < 99 - this.width) {
        this.position += this.movement;
        this.distance = `${this.position + this.movement}%`;
      }
    },
  },
  watch: {
    rightPressed: function () {
      clearInterval(this.currentIntervalLeft);

      if (this.rightPressed) this.currentIntervalLeft = setImmediateInterval(this.moveRight, 10);
    },
    leftPressed: function () {
      clearInterval(this.currentIntervalRight);

      if (this.leftPressed) this.currentIntervalRight = setImmediateInterval(this.moveLeft, 10);
    },
  },
};
</script>

<template>
  <div
    :class="['player', playerNumber === 2 && 'rotate-x-180']"
    :id="`player-${playerNumber}`"
  >
    Player {{ playerNumber }}

    <CharacterAttack
      :player-number="playerNumber"
      @getRect="getRect"
      v-if="attack === true"
    />
  </div>
</template>

<style lang="scss">
.player {
  position: absolute;
  bottom: 0;

  height: 140px;

  width: v-bind(widthPx);
  background-color: v-bind(color);
}

#player-1 {
  left: v-bind(distance);
}

#player-2 {
  right: v-bind(distance);
}
</style>