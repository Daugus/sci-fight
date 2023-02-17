<script lang="ts"></script>

<template>
  <div class="appear"></div>
</template>

<style lang="scss">
.appear {
  width: 1102.75px;
  height: 982px;
  background: url('/src/img/characters/astraeus/appear.png');
  background-repeat: no-repeat;
  background-size: cover;
  margin: 0;
  padding: 0;

  animation: appear 1s steps(8) infinite;
}

@keyframes appear {
  0% {
    background-position: 0px;
  }
  100% {
    background-position: -8822px;
  }
}
</style>
