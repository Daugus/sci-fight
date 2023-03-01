<script lang="ts">
const playSound = function () {
  let element = document.createElement('div');
  element.setAttribute('style', 'display: none');
  element.innerHTML = `
    <audio autoplay loop>
      <source src="/src/audio/stages/stage-menu.mp3" type="audio/mpeg">
      
    </audio>
  `;
  document.appendChild(element);
  document.removeEventListener('click', playSound);
};
</script>

<template>
  <audio
    autoplay
    loop
  >
    <source
      src="/src/audio/stages/stage-menu.mp3"
      type="audio/mpeg"
    />
  </audio>
</template>

<style lang="scss"></style>
