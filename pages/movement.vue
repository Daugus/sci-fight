<script lang="ts">
export default {
  data() {
    let timerP1 = setInterval(() => '');
    clearInterval(timerP1);

    let timerP2 = setInterval(() => '');
    clearInterval(timerP2);

    return {
      attack: false,
      character: characters[1],
      positionP1: 0,
      positionP2: 0,
      distanceP1: '0px',
      distanceP2: '0px',
      dPressed: false,
      aPressed: false,
      rightPressed: false,
      leftPressed: false,
      currentIntervalP1: timerP1,
      currentIntervalP2: timerP2,
    };
  },
  mounted() {
    // Añadir eventListener al documento para poder usar el teclado fisico
    document.addEventListener('keyup', this.keyUp);
    document.addEventListener('keydown', this.keyDown);
  },
  methods: {
    keyUp(event: KeyboardEvent) {
      // if (/^[a-z]{1}$/.test(event.key) === false) return;
      switch (event.key) {
        case 'w':
          this.attack = true;

          setTimeout(() => {
            this.attack = false;
          }, 500);
          break;
        case 'a':
          this.aPressed = false;
          break;
        case 'd':
          this.dPressed = false;
          break;
        case 'ArrowLeft':
          this.leftPressed = false;
          break;
        case 'ArrowRight':
          this.rightPressed = false;
          break;
        default:
          break;
      }
    },
    keyDown(event: KeyboardEvent) {
      switch (event.key) {
        case 'a':
          this.aPressed = true;
          break;
        case 'd':
          this.dPressed = true;
          break;
        case 'ArrowLeft':
          this.leftPressed = true;
          break;
        case 'ArrowRight':
          this.rightPressed = true;
          break;
      }
    },
    moveLeftP1() {
      this.positionP1 -= this.character.speed / 30;
      this.distanceP1 = `${this.positionP1 - this.character.speed / 30}px`;
    },
    moveRightP1() {
      this.positionP1 += this.character.speed / 30;
      this.distanceP1 = `${this.positionP1 + this.character.speed / 30}px`;
    },
    moveLeftP2() {
      this.positionP2 += this.character.speed / 30;
      this.distanceP2 = `${this.positionP2 + this.character.speed / 30}px`;
    },
    moveRightP2() {
      this.positionP2 -= this.character.speed / 30;
      this.distanceP2 = `${this.positionP2 - this.character.speed / 30}px`;
    },
  },
  watch: {
    dPressed: function () {
      clearInterval(this.currentIntervalP1);

      if (this.dPressed) {
        this.moveRightP1();
        this.currentIntervalP1 = setInterval(this.moveRightP1, 10);
      }
    },
    aPressed: function () {
      clearInterval(this.currentIntervalP1);

      if (this.aPressed) {
        this.moveLeftP1();
        this.currentIntervalP1 = setInterval(this.moveLeftP1, 10);
      }
    },
    rightPressed: function () {
      clearInterval(this.currentIntervalP2);

      if (this.rightPressed) {
        this.moveRightP2();
        this.currentIntervalP2 = setInterval(this.moveRightP2, 10);
      }
    },
    leftPressed: function () {
      clearInterval(this.currentIntervalP2);

      if (this.leftPressed) {
        this.moveLeftP2();
        this.currentIntervalP2 = setInterval(this.moveLeftP2, 10);
      }
    },
  },
};
</script>

<template>
  <div
    class="player"
    id="player1"
  >
    Player 1
    <div
      class="attack"
      v-if="attack === true"
    >
      Attack
    </div>
  </div>
  <div
    class="player"
    id="player2"
  >
    Player 2
    <div
      class="attack"
      v-if="attack === true"
    >
      Attack
    </div>
  </div>
</template>

<style lang="scss">
.player {
  width: 135px;
  height: 140px;
  position: absolute;
  bottom: 0;

  .attack {
    width: 443px;
    height: 70px;
    background-color: rgba(0, 255, 0, 0.5);
    position: absolute;
    bottom: 0;
  }
}

#player1 {
  background-color: red;
  left: v-bind(distanceP1);
}

#player2 {
  background-color: blue;
  right: v-bind(distanceP2);
}
</style>
