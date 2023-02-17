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
  <!-- <div class="stage h-screen w-full"></div> -->
  <Character />
</template>

<style lang="scss">
.stage {
  background-image: url('src/img/stages/fondo.png');
  background-repeat: no-repeat;
  background-size: cover;
  background-position: bottom;
}
</style>
