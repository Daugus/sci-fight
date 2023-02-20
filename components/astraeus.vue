<script lang="ts">
export default {
  data() {
    return {
      width: '',
      maxWidth: '',
      height: '',
      animation: '',
      sprite: '',
    };
  },
  methods: {
    appear() {
      this.width = '486px';
      this.height = '500px';
      this.maxWidth = '-3888px';
      this.animation = 'animation .8s steps(8) infinite';
      this.sprite = 'url(' + new URL(`/src/img/characters/astraeus/appear.png`, import.meta.url) + ')';
    },
    idle() {
      this.width = '113px';
      this.height = '201px';
      this.maxWidth = '-565px';
      this.animation = 'animation .5s steps(5) infinite';
      this.sprite = 'url(' + new URL(`/src/img/characters/astraeus/idle.png`, import.meta.url) + ')';
    },
    move() {
      this.width = '113px';
      this.height = '201px';
      this.maxWidth = '-565px';
      this.animation = 'animation .5s steps(5) infinite';
      this.sprite = 'url(' + new URL(`/src/img/characters/astraeus/move.png`, import.meta.url) + ')';
    },
    attack() {
      this.width = '477px';
      this.height = '220px';
      this.maxWidth = '-3816px';
      this.animation = 'animation .8s steps(8) infinite';
      this.sprite = 'url(' + new URL(`/src/img/characters/astraeus/attack.png`, import.meta.url) + ')';
    },
    hit() {
      this.width = '113px';
      this.height = '201px';
      this.maxWidth = '-565px';
      this.animation = 'animation .5s steps(5) infinite';
      this.sprite = 'url(' + new URL(`/src/img/characters/astraeus/hit.png`, import.meta.url) + ')';
    },
    death() {
      this.width = '113px';
      this.height = '286px';
      this.maxWidth = '-678px';
      this.animation = 'animation .6s steps(6) infinite';
      this.sprite = 'url(' + new URL(`/src/img/characters/astraeus/death.png`, import.meta.url) + ')';
    },
  },
};
</script>

<template>
  <section class="stage">
    <div class="hitbox">
      <div class="character"></div>
    </div>
  </section>

  <section class="actions">
    <button @click.prevent="appear()">Appear</button>
    <button @click.prevent="idle()">Idle</button>
    <button @click.prevent="move()">Move</button>
    <button @click.prevent="attack()">Attack</button>
    <button @click.prevent="hit()">Hit</button>
    <button @click.prevent="death()">Death</button>
  </section>
</template>

<style lang="scss">
.actions {
  position: absolute;
  bottom: 5%;
  display: flex;
  gap: 2rem;

  button {
    border: 1px solid black;
    padding: 0.5rem 1rem;

    &:hover {
      background-color: lightgray;
    }
  }
}

.stage {
  width: 600px;
  height: 600px;
  display: flex;
  justify-content: center;
  align-items: flex-end;
  padding-bottom: 4.5%;

  background-image: url('src/img/stages/fondo.png');
  background-repeat: no-repeat;
  background-position: bottom;
}

.hitbox {
  width: v-bind(width);
  height: v-bind(height);

  display: flex;
  justify-content: center;
  align-items: center;
  transform: scale(1);

  .character {
    position: relative;
    z-index: 11;
    width: 100%;
    height: 100%;
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
    background-position: v-bind(maxWidth);
  }
}
</style>
