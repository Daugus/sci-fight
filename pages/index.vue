<script setup>
definePageMeta({ key: (route) => route.fullPath });
</script>

<template>
  <div class="flex h-screen w-screen flex-col justify-center overflow-hidden align-middle">
    <div class="relative flex w-full justify-between">
      <MenuCharacterSelection
        :rotate="false"
        :controls="{
          left: 'a',
          right: 'd',
        }"
      />
      <MenuCharacterSelection
        :rotate="true"
        :controls="{
          left: 'arrowleft',
          right: 'arrowright',
        }"
      />
    </div>
  </div>
</template>
