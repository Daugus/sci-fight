<script lang="ts"></script>

<template>
  <div class="idle"></div>
</template>

<style lang="scss">
.idle {
  width: 118px;
  height: 107px;
  background: url('/src/img/characters/astraeus/idle.png');
  background-repeat: no-repeat;
  background-size: cover;
  margin: 0;
  padding: 0;

  animation: idle 0.75s steps(5) infinite;
}

@keyframes idle {
  0% {
    background-position: 0px;
  }
  100% {
    background-position: -590px;
  }
}
</style>
