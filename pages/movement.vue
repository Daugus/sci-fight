<script lang="ts">
export default {
  data() {
    return {
      attack: false,
    };
  },
  mounted() {
    // Añadir eventListener al documento para poder usar el teclado fisico
    document.addEventListener('keyup', this.pressedKey);
  },
  methods: {
    pressedKey(event: KeyboardEvent) {
      console.log(event);
      if (/^[a-z]{1}$/.test(event.key) === false) return;
      switch (event.key) {
        case 'w':
          this.attack = true;
          setTimeout(() => {
            this.attack = false;
          }, 500);
          break;

        default:
          break;
      }
    },
  },
};
</script>

<template>
  <div id="player">
    Player 1
    <div
      id="attack"
      v-if="attack === true"
    >
      Attack
    </div>
  </div>
</template>

<style lang="scss">
#player {
  width: 135px;
  height: 140px;
  background-color: red;
  position: absolute;
  bottom: 0;

  #attack {
    width: 443px;
    height: 70px;
    background-color: rgba(0, 255, 0, 0.5);
    position: absolute;
    bottom: 0;
  }
}
</style>
