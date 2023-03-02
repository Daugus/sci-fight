<script lang="ts">
export default {
  data() {
    return {
      index: 0,
    };
  },
  props: {
    rotate: { required: true, type: Boolean },
    controls: { required: true, type: Object as PropType<{ left: string; right: string }> },
    playerNumber: { required: true, type: Number },
  },
  mounted() {
    document.addEventListener('keydown', this.keyUp);
  },
  computed: {
    currentCharacter() {
      const character = characters[this.index];
      localStorage.setItem(`characterP${this.playerNumber}`, JSON.stringify(character));
      return character;
    },
    currentCharacterColor() {
      return characters[this.index].color;
    },
  },
  methods: {
    previous() {
      this.index = this.index - 1 < 0 ? characters.length - 1 : this.index - 1;
    },
    next() {
      this.index = this.index + 1 >= characters.length ? 0 : this.index + 1;
    },
    keyUp(event: KeyboardEvent) {
      switch (event.key.toLowerCase()) {
        case this.controls.left:
          this.previous();
          break;
        case this.controls.right:
          this.next();
          break;
      }
    },
  },
};
</script>

<template>
  <!-- Fondo -->
  <img
    :class="['w-[49%]', rotate && 'rotate-x-180']"
    src="/src/img/assets/character_selector.png"
  />

  <!-- Selección de personaje -->
  <div :class="['absolute', 'mx-3', 'my-2', 'flex', 'flex-col', `character-container-player-${rotate ? 2 : 1}`]">
    <!-- Cambio de personaje -->
    <div class="flex w-full justify-between text-center align-middle leading-none">
      <!-- Boton: Cambiar personaje (derecha) -->
      <button
        class="z-50 w-6"
        @click="next"
      >
        <img
          class="rotate-x-180"
          src="/src/img/assets/button_arrow.png"
        />
      </button>

      <!-- Nombre personaje -->
      <span class="jupiter-crash z-50 capitalize">{{ currentCharacter.name }}</span>

      <!-- Boton: Cambiar personaje (izquierda) -->
      <button
        class="z-50 w-6"
        @click="previous"
      >
        <img src="/src/img/assets/button_arrow.png" />
      </button>
    </div>

    <!-- Sprite personaje seleccionado -->
    <div :class="['flex', 'justify-center', 'align-middle']">
      <div :class="['sprite', `${currentCharacter.name}-idle`, rotate && 'rotate-x-180']"></div>
    </div>
  </div>

  <!-- Stats personaje -->
  <div :class="['absolute', 'flex', 'items-center', 'justify-center', 'p-6', 'align-middle', `stats-container-player-${rotate ? 2 : 1}`]">
    <MenuCharacterStats :character="currentCharacter" />
    <img
      class="z-50 w-[100%]"
      src="/src/img/assets/stats_graphic.png"
    />
  </div>

  <!-- Controles -->
  <div :class="['absolute', 'controls', `player-${rotate ? 2 : 1}`]"></div>
</template>

<style lang="scss">
.controls {
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
}

.player-1 {
  inset: 10% 53% 67% 28.5%;
  background-image: url('/src/img/assets/player1_controls.png');
}

.player-2 {
  inset: 10% 28.5% 67% 53%;
  background-image: url('/src/img/assets/player2_controls.png');
}

span {
  scale: 1.25;
  -webkit-text-stroke: 1px black;
  color: #363636;
  filter: drop-shadow(0 0 0.2rem rgba(255, 255, 255, 0.25));
}

button {
  filter: drop-shadow(0 0 0.2rem rgba(255, 255, 255, 0.1));
}

.stage .sprite {
  left: initial;
  transform: initial;
}

.character-container-player-1 {
  inset: 8% 75% 60.5% 11%;
}

.character-container-player-2 {
  inset: 8% 11% 60.5% 75%;
}

.stats-container-player-1 {
  inset: 57% 75% 5.5% 6.1%;
}

.stats-container-player-2 {
  inset: 57% 6.1% 5.5% 75%;
}
</style>
