<script lang="ts">
export default {
  data() {
    //crear el intervalo para que sean de tipo timer
    // let timerIzquierdaP1 = setInterval(() => '');
    // clearInterval(timerIzquierdaP1);

    // let timerDerechaP1 = setInterval(() => '');
    // clearInterval(timerDerechaP1);

    // let timerizquierdaP2 = setInterval(() => '');
    // clearInterval(timerizquierdaP2);

    // let timerDerechaP2 = setInterval(() => '');
    // clearInterval(timerDerechaP2);

    return {
      // attackP1: true,
      // attackP2: false,
      // characterP1: quasar,
      // characterP2: quasar,
      // positionP1: 0,
      // positionP2: 0,
      // distanceP1: '1%',
      // distanceP2: '1%',
      // dPressed: false,
      // rightPressed: false,
      // aPressed: false,
      // leftPressed: false,
      // currentIntervalIzqP1: timerIzquierdaP1,
      // currentIntervalIzqP2: timerizquierdaP2,
      // currentIntervalDerP1: timerDerechaP1,
      // currentIntervalDerP2: timerDerechaP2,
    };
  },
  mounted() {
    // // Animacion "Appear"
    // this.spriteW = '183px';
    // this.spriteH = '140px';
    // this.spriteMW = '-732px';
    // this.animation = 'animation .4s steps(4) infinite';
    // this.sprite = 'url(' + new URL(`/src/img/characters/quasar/appear.png`, import.meta.url) + ')';
    // // Animacion "Idle"
    // setTimeout(() => {
    //   this.spriteW = '135px';
    //   this.spriteH = '140px';
    //   this.spriteMW = '-675px';
    //   this.animation = 'animation .5s steps(5) infinite';
    //   this.sprite = 'url(' + new URL(`/src/img/characters/quasar/idle.png`, import.meta.url) + ')';
    // }, 900);
    // document.body.classList.add('overflow-hidden');
    // // Añadir eventListener al documento para poder usar el teclado fisico
    // document.addEventListener('keyup', this.keyUp);
    // document.addEventListener('keydown', this.keyDown);
  },
  methods: {
    // keyUp(event: KeyboardEvent) {
    //   // hacer el switch case de las teclas para que se puedan leer
    //   // ademas setear el componente a clase para que pare
    //   switch (event.key.toLowerCase()) {
    //     case 'w':
    //       // Activar ataque
    //       this.attackP1 = true;
    //       // setTimeout(() => {
    //       //   // Cambiar sprite
    //       //   this.spriteW = '443px';
    //       //   this.spriteH = '140px';
    //       //   this.spriteMW = '-3544px';
    //       //   this.animation = 'animation .8s steps(8) infinite';
    //       //   this.sprite = 'url(' + new URL(`/src/img/characters/quasar/attack.png`, import.meta.url) + ')';
    //       // }, 100);
    //       setTimeout(() => {
    //         // Desactivar ataque
    //         this.attackP1 = false;
    //       }, 800);
    //       // Cambiar sprite
    //       //   this.spriteW = '135px';
    //       //   this.spriteH = '140px';
    //       //   this.spriteMW = '-675px';
    //       //   this.animation = 'animation .5s steps(5) infinite';
    //       //   this.sprite = 'url(' + new URL(`/src/img/characters/quasar/idle.png`, import.meta.url) + ')';
    //       // }, 800);
    //       break;
    //     case 'a':
    //       this.aPressed = false;
    //       break;
    //     case 'd':
    //       this.dPressed = false;
    //       break;
    //     case 'arrowup':
    //       this.attackP2 = true;
    //       setTimeout(() => {
    //         // Desactivar ataque
    //         this.attackP2 = false;
    //       }, 800);
    //       break;
    //     case 'arrowleft':
    //       this.leftPressed = false;
    //       break;
    //     case 'arrowright':
    //       this.rightPressed = false;
    //       break;
    //   }
    // },
    // keyDown(event: KeyboardEvent) {
    //   //switch para que se muevan los divs
    //   switch (event.key.toLowerCase()) {
    //     case 'a':
    //       this.aPressed = true;
    //       break;
    //     case 'd':
    //       this.dPressed = true;
    //       break;
    //     case 'arrowleft':
    //       this.leftPressed = true;
    //       break;
    //     case 'arrowright':
    //       this.rightPressed = true;
    //       break;
    //   }
    // },
    // // funciones para mover los divs
    // moveLeftP1() {
    //   if (!this.dPressed && this.positionP1 > 1) {
    //     this.positionP1 -= this.movementP1;
    //     this.distanceP1 = `${this.positionP1 - this.movementP1}%`;
    //   }
    // },
    // moveRightP1() {
    //   if (!this.aPressed && this.positionP1 < 99 - this.widthP1) {
    //     this.positionP1 += this.movementP1;
    //     this.distanceP1 = `${this.positionP1 + this.movementP1}%`;
    //   }
    // },
    // moveLeftP2() {
    //   if (!this.rightPressed && this.positionP2 < 99 - this.widthP2) {
    //     this.positionP2 += this.movementP2;
    //     this.distanceP2 = `${this.positionP2 + this.movementP2}%`;
    //   }
    // },
    // moveRightP2() {
    //   if (!this.leftPressed && this.positionP2 > 1) {
    //     this.positionP2 -= this.movementP2;
    //     this.distanceP2 = `${this.positionP2 - this.movementP2}%`;
    //   }
    // },
    // getRect(attackRect: DOMRect, playerNumber: number) {
    //   const receiverPlayerNumber = playerNumber === 1 ? 2 : 1;
    //   const playerRect = document.querySelector(`#player${receiverPlayerNumber}`)!.getBoundingClientRect();
    //   const intersect = attackRect.x + attackRect.width >= playerRect!.x && attackRect.x <= playerRect.x + playerRect.width;
    // },
  },
  computed: {
    // movementP1() {
    //   return this.characterP1.speed.space / 250;
    // },
    // movementP2() {
    //   return this.characterP2.speed.space / 250;
    // },
    // widthP1() {
    //   return (this.characterP1.hitbox.width / screen.width) * 100;
    // },
    // widthP2() {
    //   return (this.characterP2.hitbox.width / screen.width) * 100;
    // },
    // widthPxP1() {
    //   return `${this.characterP1.hitbox.width}px`;
    // },
    // widthPxP2() {
    //   return `${this.characterP2.hitbox.width}px`;
    // },
  },
  // crear el watch para que las funciones de movimiento se ejecuten constantemente mientras este pulsado
  watch: {
    // dPressed: function () {
    //   clearInterval(this.currentIntervalIzqP1);
    //   if (this.dPressed) {
    //     this.moveRightP1();
    //     this.currentIntervalIzqP1 = setInterval(this.moveRightP1, 10);
    //   }
    // },
    // aPressed: function () {
    //   clearInterval(this.currentIntervalDerP1);
    //   if (this.aPressed) {
    //     this.moveLeftP1();
    //     this.currentIntervalDerP1 = setInterval(this.moveLeftP1, 10);
    //   }
    // },
    // rightPressed: function () {
    //   clearInterval(this.currentIntervalIzqP2);
    //   if (this.rightPressed) {
    //     this.moveRightP2();
    //     this.currentIntervalIzqP2 = setInterval(this.moveRightP2, 10);
    //   }
    // },
    // leftPressed: function () {
    //   clearInterval(this.currentIntervalDerP2);
    //   if (this.leftPressed) {
    //     this.moveLeftP2();
    //     this.currentIntervalDerP2 = setInterval(this.moveLeftP2, 10);
    //   }
    // },
  },
};
</script>

<template>
  <Character :player-number="1" />
  <Character :player-number="2" />

  <!-- <div
    class="player"
    id="player1"
  >
    Player 1

    <CharacterAttack
      :player-number="1"
      @getRect="getRect"
      v-if="attackP1 === true"
    />
  </div> -->

  <!-- <div
    class="player"
    id="player2"
  >
    Player 2
    <CharacterAttack
      :player-number="2"
      @getRect="getRect"
      v-if="attackP2 === true"
    />
  </div> -->
</template>

<style lang="scss"></style>
