<script lang="ts">
export default {
  data() {
    return {};
  },
  mounted() {
    // Añadir eventListener al documento para poder usar el teclado fisico
    document.addEventListener('keyup', () => {
      this.pressedKey;
    });
  },
  methods: {
    pressedKey(event: any) {
      if (/^[a-z]{1}$/.test(`${event.key}`) === false) return;
      let key = `${event.key}`;
      if (key === 'e') {
        // document.getElementById('attack').classList.add('visible');
        console.log('Ataque realizado');
      }
    },
  },
};
</script>

<template>
  <div id="player">
    Player 1
    <div id="attack">Attack</div>
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
    visibility: hidden;
  }
}

.visible {
  visibility: visible;
}
</style>
