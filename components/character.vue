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
      dPressed: false,
      aPressed: false,
      currentIntervalIzq: timerIzquierda,
      currentIntervalDer: timerDerecha,
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
        case 'w':
          // Activar ataque
          this.attack = true;

          // setTimeout(() => {
          //   // Cambiar sprite
          //   this.spriteW = '443px';
          //   this.spriteH = '140px';
          //   this.spriteMW = '-3544px';
          //   this.animation = 'animation .8s steps(8) infinite';
          //   this.sprite = 'url(' + new URL(`/src/img/characters/quasar/attack.png`, import.meta.url) + ')';
          // }, 100);

          setTimeout(() => {
            // Desactivar ataque
            this.attack = false;
          }, 800);

          // Cambiar sprite
          //   this.spriteW = '135px';
          //   this.spriteH = '140px';
          //   this.spriteMW = '-675px';
          //   this.animation = 'animation .5s steps(5) infinite';
          //   this.sprite = 'url(' + new URL(`/src/img/characters/quasar/idle.png`, import.meta.url) + ')';
          // }, 800);
          break;
        case this.key.left:
          this.aPressed = false;
          break;
        case this.key.right:
          this.dPressed = false;
          break;
      }
    },
    keyDown(event: KeyboardEvent) {
      //switch para que se muevan los divs
      switch (event.key.toLowerCase()) {
        case this.key.left:
          this.aPressed = true;
          break;
        case this.key.right:
          this.dPressed = true;
          break;
      }
    },
    // funciones para mover los divs
    moveLeft() {
      if (!this.dPressed && this.position > 1) {
        this.position -= this.movement;
        this.distance = `${this.position - this.movement}%`;
      }
    },
    moveRight() {
      if (!this.aPressed && this.position < 99 - this.width) {
        this.position += this.movement;
        this.distance = `${this.position + this.movement}%`;
      }
    },
  },
  watch: {},
};
</script>

<template>
  <div
    class="player"
    :id="`player${playerNumber}`"
  >
    Player 1

    <CharacterAttack
      :player-number="1"
      @getRect="getRect"
      v-if="attack === true"
    />
  </div>
</template>

<style lang="scss"></style>
