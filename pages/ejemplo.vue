<script lang="ts">
import characters from '../utils/characters';

export default {
  data() {
    return {
      characterList: characters,
    };
  },
};
</script>

<template>
  <div class="stage h-screen w-full">sdfas</div>
</template>

<style lang="scss">
.stage {
  background-image: url('/img/fondo.png');
  background-repeat: no-repeat;
  background-size: cover;
  background-position: 0;
}
</style>
