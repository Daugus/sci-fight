<script lang="ts">
export default {
  data() {
    //crear el intervalo para que sean de tipo timer
    let timerIzquierdaP1 = setInterval(() => '');
    clearInterval(timerIzquierdaP1);

    let timerDerechaP1 = setInterval(() => '');
    clearInterval(timerDerechaP1);

    let timerizquierdaP2 = setInterval(() => '');
    clearInterval(timerizquierdaP2);

    let timerDerechaP2 = setInterval(() => '');
    clearInterval(timerDerechaP2);

    return {
      attack: false,
      characterP1: characters[1],
      characterP2: characters[1],
      positionP1: 0,
      positionP2: 0,
      distanceP1: '0px',
      distanceP2: '0px',
      dPressed: false,
      aPressed: false,
      rightPressed: false,
      leftPressed: false,
      currentIntervalIzqP1: timerIzquierdaP1,
      currentIntervalDerP1: timerDerechaP1,
      currentIntervalIzqP2: timerizquierdaP2,
      currentIntervalDerP2: timerDerechaP2,
    };
  },
  mounted() {
    // Añadir eventListener al documento para poder usar el teclado fisico
    document.addEventListener('keyup', this.keyUp);
    document.addEventListener('keydown', this.keyDown);
    document.body.classList.add('overflow-hidden');
  },
  methods: {
    keyUp(event: KeyboardEvent) {
      // hacer el switch case de las teclas para que se puedan leer
      // ademas setear el componente a clase para que pare
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
      //switch para que se muevan los divs
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
    // funciones para mover los divs
    moveLeftP1() {
      if (!this.dPressed && this.positionP1 > 1) {
        this.positionP1 -= this.movementP1;
        this.distanceP1 = `${this.positionP1 - this.movementP1}%`;
      }
    },
    moveRightP1() {
      if (!this.aPressed && this.positionP1 < 99 - this.widthP1) {
        this.positionP1 += this.movementP1;
        this.distanceP1 = `${this.positionP1 + this.movementP1}%`;
      }
    },
    moveLeftP2() {
      if (!this.rightPressed && this.positionP2 < 99 - this.widthP2) {
        this.positionP2 += this.movementP2;
        this.distanceP2 = `${this.positionP2 + this.movementP2}%`;
      }
    },
    moveRightP2() {
      if (!this.leftPressed && this.positionP2 > 1) {
        this.positionP2 -= this.movementP2;
        this.distanceP2 = `${this.positionP2 - this.movementP2}%`;
      }
    },
  },
  computed: {
    movementP1() {
      return this.characterP1.speed / 250;
    },
    movementP2() {
      return this.characterP2.speed / 250;
    },
    widthP1() {
      return (this.characterP1.hitbox.width / screen.width) * 100;
    },
    widthP2() {
      return (this.characterP2.hitbox.width / screen.width) * 100;
    },
    widthPxP1() {
      return `${this.characterP1.hitbox.width}px`;
    },
    widthPxP2() {
      return `${this.characterP2.hitbox.width}px`;
    },
  },
  // crear el watch para que las funciones de movimiento se ejecuten constantemente mientras este pulsado
  watch: {
    dPressed: function () {
      clearInterval(this.currentIntervalIzqP1);

      if (this.dPressed) {
        this.moveRightP1();
        this.currentIntervalIzqP1 = setInterval(this.moveRightP1, 10);
      }
    },
    aPressed: function () {
      clearInterval(this.currentIntervalDerP1);

      if (this.aPressed) {
        this.moveLeftP1();
        this.currentIntervalDerP1 = setInterval(this.moveLeftP1, 10);
      }
    },
    rightPressed: function () {
      clearInterval(this.currentIntervalIzqP2);

      if (this.rightPressed) {
        this.moveRightP2();
        this.currentIntervalIzqP2 = setInterval(this.moveRightP2, 10);
      }
    },
    leftPressed: function () {
      clearInterval(this.currentIntervalDerP2);

      if (this.leftPressed) {
        this.moveLeftP2();
        this.currentIntervalDerP2 = setInterval(this.moveLeftP2, 10);
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
  width: v-bind(widthPxP1);
  height: 140px;
  background-color: red;
  left: v-bind(distanceP1);
}

#player2 {
  transform: rotateY(180deg);
  width: v-bind(widthPxP2);
  height: 140px;

  background-color: blue;
  right: v-bind(distanceP2);
}
</style>
