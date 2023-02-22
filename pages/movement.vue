<script lang="ts">
export default {
  data() {
    return {
      attack: false,

      spriteW: '',
      spriteMW: '',
      spriteH: '',
      animation: '',
      sprite: '',
    };
  },
  mounted() {
    // Animacion "Appear"
    this.spriteW = '198.2px';
    this.spriteH = '176px';
    this.spriteMW = '-1784px';
    this.animation = 'animation .9s steps(9) infinite';
    this.sprite = 'url(' + new URL(`/src/img/characters/vespera/appear.png`, import.meta.url) + ')';

    // Animacion "Idle"
    setTimeout(() => {
      this.spriteW = '192px';
      this.spriteH = '176px';
      this.spriteMW = '-1153px';
      this.animation = 'animation .6s steps(6) infinite';
      this.sprite = 'url(' + new URL(`/src/img/characters/vespera/idle.png`, import.meta.url) + ')';
    }, 900);

    // Añadir eventListener al documento para poder usar el teclado fisico
    document.addEventListener('keyup', this.pressedKey);
  },
  methods: {
    pressedKey(event: KeyboardEvent) {
      switch (event.key) {
        case 'w':
          // Activar ataque
          this.attack = true;

          setTimeout(() => {
            // Cambiar sprite
            this.spriteW = '624px';
            this.spriteH = '220px';
            this.spriteMW = '-3125px';
            this.animation = 'animation .5s steps(5) infinite';
            this.sprite = 'url(' + new URL(`/src/img/characters/vespera/attack.png`, import.meta.url) + ')';
          }, 100);

          setTimeout(() => {
            // Desactivar ataque
            this.attack = false;

            // Cambiar sprite
            this.spriteW = '192px';
            this.spriteH = '176px';
            this.spriteMW = '-1153px';
            this.animation = 'animation .6s steps(6) infinite';
            this.sprite = 'url(' + new URL(`/src/img/characters/vespera/idle.png`, import.meta.url) + ')';
          }, 600);
          break;

        // case 'ArrowUp':
        //   this.attack = true;
        //   setTimeout(() => {
        //     this.attack = false;
        //   }, 500);
        //   break;

        default:
          break;
      }
    },
  },
};
</script>

<template>
  <div id="player">
    <div id="sprite"></div>
    <div id="hitbox"></div>
    <div
      id="attack"
      v-if="attack === true"
    ></div>
  </div>
</template>

<style lang="scss">
#player {
  width: fit-content;
  height: fit-content;
  display: flex;
  justify-content: center;
  align-items: flex-end;
  position: absolute;
  bottom: 0;

  #hitbox {
    width: 192px;
    height: 176px;
    background-color: rgba(255, 0, 0, 0.5);
    position: absolute;
  }

  #attack {
    width: v-bind(spriteW);
    height: 50px;
    background-color: rgba(0, 255, 0, 0.5);
    position: absolute;
  }

  #sprite {
    z-index: 11;

    width: v-bind(spriteW);
    height: v-bind(spriteH);

    display: flex;
    justify-content: center;
    align-items: center;

    background: v-bind(sprite);
    background-repeat: no-repeat;
    background-size: cover;
    animation: v-bind(animation);
  }
}

@keyframes animation {
  0% {
    background-position: 0px;
  }
  100% {
    background-position: v-bind(spriteMW);
  }
}
</style>
