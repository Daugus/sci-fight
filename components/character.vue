<script lang="ts">
export default {
  data() {
    let timerIzquierda = setInterval(() => '');
    clearInterval(timerIzquierda);

    let timerDerecha = setInterval(() => '');
    clearInterval(timerDerecha);

    return {
      attack: false,
      character: quasar,
      position: 0,
      distance: '1%',
      rightPressed: false,
      leftPressed: false,
      currentIntervalLeft: timerIzquierda,
      currentIntervalRight: timerDerecha,
    };
  },
  props: {
    playerNumber: Number,
  },
  computed: {
    key() {
      let up = '';
      let left = '';
      let right = '';

      if (this.playerNumber === 1) {
        up = 'w';
        left = 'a';
        right = 'a';
      } else if (this.playerNumber === 2) {
        up = 'arrowup';
        left = 'learrowft';
        right = 'rigarrowht';
      }

      return { up, left, right };
    },
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
    document.addEventListener('keyup', this.keyUp);
    document.addEventListener('keydown', this.keyDown);
  },
  methods: {
    getRect(attackRect: DOMRect, playerNumber: number) {
      const receiverPlayerNumber = playerNumber === 1 ? 2 : 1;

      const playerRect = document.querySelector(`#player${receiverPlayerNumber}`)!.getBoundingClientRect();

      const intersect = attackRect.x + attackRect.width >= playerRect!.x && attackRect.x <= playerRect.x + playerRect.width;
    },

    keyUp(event: KeyboardEvent) {
      // hacer el switch case de las teclas para que se puedan leer
      // ademas setear el componente a clase para que pare
      switch (event.key.toLowerCase()) {
        case this.key.up:
          // Activar ataque
          this.attack = true;

          setTimeout(() => (this.attack = false), 800);
          break;
        case this.key.left:
          this.leftPressed = false;
          break;
        case this.key.right:
          this.rightPressed = false;
          break;
      }
    },
    keyDown(event: KeyboardEvent) {
      //switch para que se muevan los divs
      switch (event.key.toLowerCase()) {
        case this.key.left:
          this.leftPressed = true;
          break;
        case this.key.right:
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

      // if (this.rightPressed) {
      //   this.moveRight();
      //   this.currentIntervalLeft = setInterval(this.moveRight, 10);
      // }
    },
    leftPressed: function () {
      clearInterval(this.currentIntervalRight);

      if (this.leftPressed) this.currentIntervalRight = setImmediateInterval(this.moveLeft, 10);

      // if (this.leftPressed) {
      //   this.moveLeft();
      //   this.currentIntervalRight = setInterval(this.moveLeft, 10);
      // }
    },
  },
};
</script>

<template>
  <div
    class="player"
    :id="`player${playerNumber}`"
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

  .attack {
    width: 443px;
    height: 70px;
    background-color: rgba(0, 255, 0, 0.5);
    position: absolute;
    bottom: 0;
  }
}

#player1 {
  width: v-bind(widthPx);
  background-color: red;
  left: v-bind(distance);
}

// #player2 {
//   transform: rotateY(180deg);
//   width: v-bind(widthPxP2);

//   background-color: blue;
//   right: v-bind(distanceP2);
// }
</style>
